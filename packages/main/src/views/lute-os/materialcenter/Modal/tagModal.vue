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
      <el-form-item
        label="标签分类"
        prop="categoryCode"
        :rules="[{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }]"
      >
        <el-tree-select
          :v-loading="loading"
          clearable
          node-key="categoryCode"
          style="width: 100%"
          v-model="form.categoryCode"
          :data="treeData"
          check-strictly
          :render-after-expand="false"
          placeholder="请选择分类"
        />
      </el-form-item>

      <template v-for="(item, index) in form.labelList" :key="index">
        <el-form-item
          :label="`标签名称${index + 1}`"
          :prop="`labelList[${index}].labelName`"
          :rules="[{ required: true, message: '标签名称不能为空', trigger: ['blur', 'change'] }]"
        >
          <div class="form-item">
            <el-input
              v-model="form.labelList[index].labelName"
              placeholder="请输入标签名称"
              style="width: 320px"
            />
            <el-button
              type="danger"
              @click="delLabel(index)"
              size="small"
              class="btn-wrap"
              v-if="form.labelList.length > 1"
            >
              -
            </el-button>
            <el-button
              type="primary"
              @click="addLabel"
              size="small"
              class="btn-wrap"
              v-if="index === form.labelList.length - 1"
            >
              +
            </el-button>
          </div>
        </el-form-item>
      </template>

      <el-form-item
        label="状态"
        prop="status"
        :rules="[{ required: true, message: '状态不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
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
      labelTypeInfo: object;
    }>(),
    {
      visible: false,
    }
  );
  const formRef = ref();
  const form: any = ref({
    categoryCode: '',
    labelCode: '',
    labelName: '',
    status: 1,
    labelList: [{ labelName: '' }],
  });

  form.value = { ...props.info };
  if (!form.value.labelList || form.value.labelList?.length === 0) {
    form.value.labelList = [];
    form.value.labelList.push({ labelName: '' });
  }

  const addLabel = () => {
    form.value.labelList.push({ labelName: '' });
  };

  const delLabel = (index) => {
    form.value.labelList.splice(index, 1);
  };

  const title = computed(() => {
    if (props.info.labelCode) {
      return '编辑标签';
    }
    return '新增标签';
  });

  const statusOptions = ref([
    {
      name: '启用',
      code: 1,
    },
    {
      name: '禁用',
      code: 0,
    },
  ]);

  const treeData = ref();
  const queryCategoryList = async () => {
    const res = await fccApi.luteosFccCategoryQueryFccCategoryList({
      pageNum: 1,
      pageSize: 1000,
      scene: props.labelTypeInfo.scene,
    });
    const data = res.fileCategoryList;
    deepTree(res.fileCategoryList);
    treeData.value = data;
  };
  queryCategoryList();
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
        const arrSet = new Set();
        form.value.labelList.forEach((item) => {
          arrSet.add(item.labelName);
        });

        if (arrSet.size !== form.value.labelList.length) {
          ElMessage.warning('标签名称不能重复!');
          return;
        }
        saveLoading.value = true;
        fccApi
          .luteosFccTagSaveFccTag({
            ...form.value,
            labelType: props.labelTypeInfo.labelType,
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

<style lang="scss" scoped>
  .form-item {
    display: flex;
  }
  .input-width {
    width: 380px;
  }
  .btn-wrap {
    margin-top: 5px;
    margin-left: 10px;
  }
</style>
