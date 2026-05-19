<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item label="父分类" prop="parentCategoryCode">
        <el-tree-select
          clearable
          node-key="categoryCode"
          style="width: 100%"
          v-model="form.parentCategoryCode"
          :data="treeData"
          check-strictly
          :render-after-expand="false"
          placeholder="请选择父级分类，不选默认为根节点"
        />
      </el-form-item>

      <el-form-item
        label="分类名称"
        prop="categoryName"
        :rules="[{ required: true, message: '分类名称不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input
          v-model="form.categoryName"
          placeholder="请输入分类名称"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { fccApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      info: any;
      scene: number;
    }>(),
    {
      visible: false,
    }
  );

  const formRef = ref();
  const form: any = ref({
    parentCategoryCode: '',
    categoryCode: '',
    categoryName: '',
  });

  form.value = { ...props.info };

  const title = computed(() => {
    if (props.info.categoryCode) {
      return '编辑分类';
    }
    return '新增分类';
  });

  const treeData = ref();
  const queryCategoryList = async () => {
    const res = await fccApi.luteosFccCategoryQueryFccCategoryList({
      pageNum: 1,
      pageSize: 1000,
      scene: props.scene,
    });
    const data = res.fileCategoryList;
    deepTree(res.fileCategoryList);
    treeData.value = data;
  };
  onMounted(() => {
    queryCategoryList();
  });

  const deepTree = (data) => {
    data.forEach((item) => {
      item.children = item.categoryBeanList;
      item.label = item.categoryName;
      item.value = item.categoryCode;
      if (item.categoryBeanList && item.categoryBeanList.length > 0) {
        deepTree(item.categoryBeanList);
      }
    });
  };

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        saveLoading.value = true;
        fccApi
          .luteosFccCategorySaveFccCategory({
            ...form.value,
            scene: +props.scene,
          })
          .then(() => {
            ElMessage.success('保存成功');
            formRef.value.resetFields();
            emit('closeModal', 'reload');
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
