<template>
  <el-dialog title="批量操作选择" :model-value="visible" @close="$emit('close')" align-center>
    <el-form :model="form" ref="formRef">
      <el-form-item
        prop="markType"
        label=""
        :rules="[{ required: true, message: '请选择批量操作', trigger: ['blur', 'change'] }]"
      >
        <el-radio-group v-model="form.markType" @change="handleRadioChange">
          <el-radio :label="1" class="mark-type">批量标记媒体类型</el-radio>
          <el-radio :label="2" class="mark-type">批量标记媒体内容类型</el-radio>
          <el-radio :label="4" class="mark-type">批量导入媒体资源</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="mediaType"
        label=""
        v-if="form.markType === 1"
        :rules="[{ required: true, message: '请选择媒体类型', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.mediaType" placeholder="请选择媒体类型" clearable filterable>
          <el-option
            v-for="item in dictMap.media_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="contentType"
        label=""
        v-if="form.markType === 2"
        :rules="[{ required: true, message: '请选择媒体内容类型', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.contentType" placeholder="请选择媒体内容类型" clearable filterable>
          <el-option
            v-for="item in dictMap.content_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.markType === 4"
        prop="fileList"
        :rules="[{ required: true, message: '请上传文件', trigger: ['blur', 'change'] }]"
      >
        <KeenFileUpload
          ref="upload"
          v-model="form.fileList"
          :directory="importScene"
          accept=".xlsx,.xls"
          limit="100"
          @success="handleUploadSuccess"
        >
          <el-button type="primary" size="small">上传文件</el-button>
        </KeenFileUpload>
        <el-button class="download-url" type="text" @click="downloadUrl">下载模板</el-button>
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
  import { mediaApi, commonApi } from '@/api';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';

  const router = useRouter();

  const props = defineProps<{
    visible: boolean;
    dictMap: object;
    mediaCodeList: Array<string>;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    markType: '',
    mediaType: '',
    contentType: '',
    fileList: [],
  });

  const handleRadioChange = () => {};

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    // 提示勾选
    if ([1, 2, 3].includes(+form.value.markType)) {
      if (!props.mediaCodeList.length) {
        ElMessage.warning('请先在媒体资源列表左侧勾选要批量操作的对象');
        return;
      }
    }

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const data: any = {};
      if (+form.value.markType === 1) {
        data.markType = 1;
        data.operateType = 4;
        data.mediaType = form.value.mediaType;
        data.mediaCodeList = props.mediaCodeList;
        await mediaApi.luteosMediaOperateMedia(data);
        ElMessage.success('批量标记媒体类型成功');
      } else if (+form.value.markType === 2) {
        data.markType = 2;
        data.operateType = 4;
        data.contentType = form.value.contentType;
        data.mediaCodeList = props.mediaCodeList;
        await mediaApi.luteosMediaOperateMedia(data);
        ElMessage.success('批量标记媒体内容类型成功');
      } else if (+form.value.markType === 4) {
        handleImport();
      }
      emit('close', true);
    }
  };

  const importLoading = ref(false);
  const importScene = ref('media_resources');
  const handleUploadSuccess = () => {
    formRef.value?.clearValidate('fileList');
  };
  const handleImport = () => {
    // 获取文件信息
    const fileList = form.value?.fileList;
    const file = fileList[fileList.length - 1];
    // 导入
    commonApi
      .luteosCommonFileImportData({
        fileName: file.name,
        importScene: importScene.value,
        key: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        emit('close', true);
        if (+res.failedCount > 0) {
          const isConfirmed = await swal.confirm({
            text: '有媒体资源导入失败，具体请前往上传日志查看',
            icon: 'error',
            confirmButtonText: '去查看',
            cancelButtonText: '知道了',
          });
          if (!isConfirmed) return;
          openWindow('/salesForecastingLog');
        } else {
          ElMessage.success('导入成功');
        }
      });
  };

  const downloadUrl = async () => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: importScene.value,
    });
    urlDownload(res.templateUrl as string);
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>

<style scoped lang="scss">
  .dialog-footer {
    :deep(.el-button) {
      margin-right: 10px;
    }
  }
  .mark-type {
    width: 100%;
  }
  .download-url {
    position: absolute;
    left: 100px;
    top: 0px;
  }
</style>
