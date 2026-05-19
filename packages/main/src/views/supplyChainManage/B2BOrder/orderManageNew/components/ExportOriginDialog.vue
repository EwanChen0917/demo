<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false" align-center>
    <el-form ref="formRef" :model="form" label-width="100px" label-position="top">
      <el-form-item label="客户名称">
        <el-radio label="babylist" v-model="form.customerName" />
      </el-form-item>

      <el-form-item
        label="创建时间"
        prop="dateRange"
        :rules="[{ required: true, message: '请选择创建时间', trigger: ['change', 'blur'] }]"
      >
        <el-date-picker
          v-model="form.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD HH:mm:ss"
          @clear="ediDownload = false"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">导出</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import dayjs from 'dayjs';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus/es';

  const router = useRouter();

  const visible = ref(false);
  const title = ref('导出原平台订单');

  const formRef = ref();
  const form = ref({
    customerName: 'babylist', // 客户名称
    dateRange: [],
  });

  const ediDownload = ref<boolean>(false);
  const customerOptions = ref([{ value: 'babylist', label: 'babylist' }]); // 客户列表 后面可能会增加？

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const queryRes = await omsApi.omsEdiQueryList({
        pageNum: 1,
        pageSize: 10,
        startTime: form.value.dateRange?.[0],
        endTime: dayjs(form.value.dateRange?.[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      });
      if (queryRes?.total > 0) {
        const res = await omsApi.omsEdiDownload({
          pageNum: 1,
          pageSize: 10,
          startTime: form.value.dateRange?.[0],
          endTime: form.value.dateRange?.[1],
        });
        visible.value = false;
        const isConfirmed = await swal.confirm({
          title: '导出成功，具体请前往下载中心查看',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });
        if (isConfirmed) {
          router.push({
            path: '/downloadmanage',
            query: {
              app_code: res?.appCode,
              module_code: res?.moduleCode,
              record_type: 2,
            },
          });
        }
      } else {
        ElMessage.warning('暂无可导出数据');
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const open = () => {
    visible.value = true;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
