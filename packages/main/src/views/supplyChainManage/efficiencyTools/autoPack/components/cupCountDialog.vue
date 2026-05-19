<template>
  <el-dialog title="模杯计算件数" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form">
      <el-table :data="form.countList">
        <el-table-column label="模杯" prop="desc">
          <template #default="{ row }">
            <el-form-item>
              <span>{{ row?.desc }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template #default="{ row, $index }">
            <el-form-item label-width="0" :rules="rules.value" :prop="`countList.${$index}.value`">
              <el-input v-model="row.value" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { integerRule } from '@/utils/rulesRegExp';
  import { ElMessage } from 'element-plus';

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    countList: [],
  });

  const rules = ref({
    value: [
      { required: true, message: '请输入数量', trigger: 'blur' },
      {
        pattern: integerRule,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await platformApi.platformDictSaveBatch({
        code: 'plan_auto_pack_cup_count',
        dictItemList: form.value.countList,
        name: '模具装箱',
      });
      ElMessage.success('保存成功');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const queryCuoCount = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['plan_auto_pack_cup_count'],
    });
    form.value.countList = res?.dictMap?.plan_auto_pack_cup_count || [];
  };

  const open = () => {
    queryCuoCount();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__row) {
    .el-table__cell {
      padding-bottom: 0;
    }
  }
</style>
