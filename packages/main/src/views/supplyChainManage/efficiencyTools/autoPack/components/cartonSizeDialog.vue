<template>
  <el-dialog title="设置箱规" v-model="visible" @close="visible = false" align-center>
    <el-form ref="formRef" :model="form">
      <el-table ref="tableRef" :data="form?.sizeList" max-height="60vh">
        <el-table-column label="箱规">
          <template #default="{ row, $index }">
            <el-form-item label-width="0" :rules="rules.value" :prop="`sizeList.${$index}.value`">
              <el-input
                v-model="row.value"
                placeholder="请输入箱规"
                @change="
                  (val) => {
                    row.desc = val;
                  }
                "
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ $index }">
            <el-space>
              <el-link type="primary" :underline="false" @click="addSize()">添加</el-link>
              <el-link
                v-if="form?.sizeList?.length > 1"
                type="danger"
                :underline="false"
                @click="delSize($index)"
              >
                删除
              </el-link>
            </el-space>
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
  import * as swal from '@/utils/swal';

  const emit = defineEmits(['success']);

  const tableRef = ref();
  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    sizeList: [],
  });

  const rules = ref({
    value: [
      { required: true, message: '请输入箱规', trigger: 'blur' },
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
        code: 'plan_auto_pack_box_size',
        dictItemList: form.value.sizeList,
        name: '自动装箱箱规',
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const queryCartonSize = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['plan_auto_pack_box_size'],
    });
    form.value.sizeList = res?.dictMap?.plan_auto_pack_box_size || [];
  };

  const addSize = () => {
    form.value.sizeList?.push({
      value: '',
      desc: '',
      type: 2,
    });
    nextTick(() => {
      // 获取表格滚动容器
      const scrollWrapper = tableRef.value?.$el?.querySelector('.el-scrollbar__wrap');
      if (scrollWrapper) {
        // 滚动到底部
        scrollWrapper.scrollTo({
          top: scrollWrapper.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  };

  const delSize = async (index) => {
    const isConfirm = await swal.confirm('确定删除该箱规吗？');
    if (!isConfirm) return;
    form.value.sizeList?.splice(index, 1);
  };

  const open = () => {
    queryCartonSize();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
