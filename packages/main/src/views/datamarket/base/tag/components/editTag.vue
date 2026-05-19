<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <el-form :model="form" ref="formRef" label-width="150px">
      <el-form-item
        prop="tagName"
        label="标签名称："
        required
        :rules="[{ required: true, message: '请输入标签名称', trigger: ['blur'] }]"
      >
        <el-input v-model="form.tagName" placeholder="请输入标签名称" />
      </el-form-item>

      <el-form-item
        prop="reportCodeList"
        label="关联数据报表"
        :rules="[{ required: true, message: '请选择数据报表', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.reportCodeList"
          :options="reportList"
          multiple
          :props ="{label: 'title', value: 'reportCode'}"
          placeholder="选择数据报表（可多选）"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          style="width: 400px"
        />
      </el-form-item>
      <el-form-item
        prop="sort"
        label="排序"
        required
        :rules="[
          { required: true, message: '请输入排序', trigger: ['blur', 'change'] },
          {
            pattern: /^[0-9]\d*$/,
            message: '请输入大于0的整数',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.sort" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { datamarketApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    title: string;
    info: Object;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    tagName: '',
    sort: '',
    reportCodeList: [],
  });

  form.value = { ...props.info };
  setTimeout(() => {
    formRef.value?.clearValidate('reportCodeList');
  }, 100);

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const reportBeanList = [];
      form.value.reportCodeList.forEach((reportCode) => {
        const reportInfo: any =
          reportList.value.find((item: any) => item.reportCode === reportCode) || {};
        const data: any = {
          reportCode: reportInfo.reportCode,
          reportName: reportInfo.title,
        };
        reportInfo.reportCode && reportBeanList.push(data);
      });
      const data = {
        tagName: form.value.tagName,
        sort: form.value.sort,
        reportBeanList,
      };

      if (form.value.tagCode) {
        data.tagCode = form.value.tagCode;
      }
      await datamarketApi.luteosDatamarketTagOperationTag(data);
      ElMessage.success(form.value.tagCode ? '编辑成功' : '添加成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };

  const reportList = ref([]);
  const queryReportList = () => {
    datamarketApi
      .luteosDatamarketReportQueryDataMarketPage({
        pageNum: 1,
        pageSize: 100,
        reportStatus: form.value.tagCode ? 2 : 1,
      })
      .then((res) => {
        reportList.value = [];
        res.reportList?.forEach((item) => {
          reportList.value.push(...item.reportBeanList);
        });
      });
  };

  queryReportList();
</script>

<style scoped lang="scss">
  .dialog-footer {
    :deep(.el-button) {
      margin-right: 10px;
    }
  }
</style>
