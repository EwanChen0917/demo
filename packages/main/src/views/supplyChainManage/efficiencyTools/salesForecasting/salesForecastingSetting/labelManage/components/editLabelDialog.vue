<template>
  <el-dialog width="650px" :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="标签类型" prop="type">
        <el-select v-model="form.type" placeholder="标签类型" clearable>
          <el-option label="销量" :value="1" />
          <el-option label="预测" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签项" :rules="[{ required: true }]" />
      <el-table :data="form.tagItemList">
        <el-table-column label="ICON" min-width="150px">
          <template #default="{ row, $index }">
            <el-form-item
              class="mt-7"
              label-width="0"
              :prop="`tagItemList.${$index}.fullIconUrl`"
              :rules="rules.fullIconUrl"
            >
              <!--              {{ row.fullIconUrl }}-->
              <KeenImageUpload
                v-if="visible"
                v-model="row.fullIconUrl"
                directory="salesForecastingSetting/label"
                tooltip="更改图片"
                size="50"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="200px">
          <template #default="{ row, $index }">
            <el-form-item
              class="mt-7"
              label-width="0"
              :prop="`tagItemList.${$index}.name`"
              :rules="rules.tagName"
            >
              <el-input v-model="row.name" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '新增',
                  key: 'add',
                  type: 'primary',
                  row,
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  hide: form.tagItemList?.length === 1,
                  row,
                  index: $index,
                },
              ]"
              @click="handleActions"
            />
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
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();
  const form = ref({
    name: '',
    type: 1,
    tagItemList: [
      {
        name: '',
        fullIconUrl: '',
      },
    ],
    // status: 0,
  });

  const rules = reactive({
    name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
    tagItemCode: [{ required: true, message: '请选择标签项', trigger: 'change' }],
    type: [{ required: true, message: '请选择标签类型', trigger: 'change' }],
    tagName: [{ required: true, message: '请输入标签项名称', trigger: ['blur', 'change'] }],
    fullIconUrl: [{ required: true, message: '请选择ICON', trigger: ['blur', 'change'] }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpPlanPsftSaveOrUpdate({
        ...form.value,
        tagItemList: form.value.tagItemList?.map((item) => ({
          ...item,
          iconUrl: item.fullIconUrl?.startsWith('http') ? item.iconUrl : item.fullIconUrl,
        })),
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'add') {
      form.value.tagItemList.push({
        name: '',
        fullIconUrl: '',
      });
    } else if (key === 'del') {
      form.value.tagItemList.splice(index, 1);
    }
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      title.value = '编辑标签';
      form.value = { ...row };
    } else {
      title.value = '新增标签';
      form.value = {
        name: '',
        type: 1,
        tagItemList: [
          {
            name: '',
            fullIconUrl: '',
          },
        ],
      };
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
