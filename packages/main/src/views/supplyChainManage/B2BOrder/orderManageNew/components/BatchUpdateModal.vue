<template>
  <el-dialog title="批量操作" :model-value="visible" @close="$emit('close')" align-center>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.desc"
        :style="sceneIndex !== index ? 'margin-bottom: 10px' : ''"
      >
        <KeenFileUpload
          ref="upload"
          v-model="item.fileList"
          directory="erp"
          :limit="item.desc === '上传订单附件' ? 10 : 1"
          :multiple="item.desc === '上传订单附件'"
          v-if="index === sceneIndex"
        >
          <el-radio :label="index" class="w-350px">{{ index + 1 }}.{{ item.desc }}</el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button
          style="margin-bottom: 10px"
          type="text"
          @click="getTemplate(index)"
          v-if="item.templateService && index === sceneIndex"
        >
          下载模板
        </el-button>
        <el-radio v-if="index !== sceneIndex" :label="index" class="w-50">
          {{ index + 1 }}.{{ item.desc }}
        </el-radio>
      </div>
      <div>
        <el-radio :label="sceneList.length" class="w-350px">4.查询原平台订单</el-radio>
      </div>
    </el-radio-group>
    <div v-if="sceneIndex === sceneList.length">
      <el-form ref="formRef" :model="form" label-width="100px">
        <el-form-item label="客户名称">
          <el-select v-model="form.customerName" placeholder="请选择客户">
            <el-option
              v-for="item in customerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
            @blur="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="handleSearch" size="small">查询</el-button> -->
          <el-button type="primary" @click="handleExport" size="small" v-if="ediDownload">
            导出平台订单详情附件
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          v-if="sceneIndex !== sceneList.length"
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { erpApi, omsApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage, FormInstance } from 'element-plus';
  import { checkPermission } from '@/utils/permission';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
    orderCodeList?: string[];
    params?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const sceneIndex = ref<number>(0);

  const sceneList = ref([]);

  if (checkPermission('orderAddUpload')) {
    sceneList.value.push({
      desc: '新增订单',
      service: omsApi.omsOrderAddUpload,
      templateService: omsApi.omsOrderAddDownTemplate,
      fileList: [],
    });
  }
  if (checkPermission('updateAddressUpload')) {
    sceneList.value.push({
      desc: `更改地址`,
      service: omsApi.omsOrderUpdateAddressUpload,
      templateService: omsApi.omsOrderDownUpdateAddressTemplate,
      fileList: [],
    });
  }
  if (checkPermission('orderAttachUpload')) {
    sceneList.value.push({
      desc: `上传订单附件`,
      service: omsApi.omsOrderOrderAttachUpload,
      fileList: [],
    });
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const router = useRouter();
  const confirmUpload = async () => {
    const itemScene = sceneList.value[sceneIndex.value];
    if (itemScene.desc === '上传订单附件' && !props.orderCodeList?.length) {
      ElMessage.warning('请先勾选订单');
      return;
    }
    fileList.value = itemScene.fileList;
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await itemScene
        .service(
          itemScene.desc === '上传订单附件'
            ? {
                attachmentInfoList: fileList.value.map((item) => ({
                  fileName: item.name,
                  fileUrl: item.ossKey,
                })),
                orderCodeList: props.orderCodeList,
              }
            : {
                fileName: fileList.value[0].name,
                ossKey: fileList.value[0].ossKey,
              }
        )
        .finally(() => {
          loading.value = false;
        });
      /* ElMessage.info(
`成功${res.succeededCount}条，失败${res.failedCount}条${
res.failedCount > 0 ? '，请到上传日志查看' : ''
}`
); */
      emit('close', true);
      ElMessage.success('上传成功');
      if (itemScene.desc !== '上传订单附件') {
        const isConfirmed = await swal.confirm({
          title: '文件已上传，是否去查看最终处理结果?',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (isConfirmed) {
          openWindow('/salesForecastingLog');
        }
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async (index) => {
    const res = await sceneList.value[index].templateService({
      codeList: props.orderCodeList,
      ...props.params,
    });
    urlDownload(res as string);
  };
  const formRef = ref<FormInstance>();
  const form = ref({
    customerName: 'babylist', // 客户名称
    dateRange: [],
  });

  const ediDownload = ref<boolean>(false);
  const customerOptions = ref([{ value: 'babylist', label: 'babylist' }]); // 客户列表 后面可能会增加？

  const handleSearch = async () => {
    await formRef.value?.validate(async (valid) => {
      if (!valid) return;
      try {
        const res = await omsApi.omsEdiQueryList({
          pageNum: 1,
          pageSize: 10,
          startTime: form.value.dateRange?.[0],
          endTime: dayjs(form.value.dateRange?.[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        });
        ediDownload.value = res.total > 0;
      } catch (error) {
        console.error('查询失败', error);
        ediDownload.value = false;
      }
    });
  };

  const handleExport = async () => {
    try {
      const [res, isConfirmed] = await Promise.all([
        omsApi.omsEdiDownload({
          pageNum: 1,
          pageSize: 10,
          startTime: form.value.dateRange?.[0],
          endTime: form.value.dateRange?.[1],
        }),
        swal.confirm({
          title: '导出成功，具体请前往下载中心查看',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        }),
      ]);
      if (!isConfirmed) return;
      openWindow('/downloadmanage');
    } catch (error) {
      console.error('导出失败', error);
      ediDownload.value = false;
    }
  };
</script>

<style scoped lang="scss"></style>
