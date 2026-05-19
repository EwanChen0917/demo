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
          :limit="item.desc === '上传订单附件' ? null : 1"
          :disabled="item.type !== 'upload'"
          v-if="index === sceneIndex"
        >
          <el-radio :label="index" class="w-350px">{{ index + 1 }}.{{ item.desc }}</el-radio>
          <el-button v-if="item.type === 'upload'" type="primary" size="small">选择文件</el-button>
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
    </el-radio-group>
    <template #footer>
      <el-space class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
        >
          确认
        </el-button>
      </el-space>
    </template>
  </el-dialog>
  <el-dialog title="转移" :model-value="transferVisible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="转移人" prop="transferCode">
        <DeptMember v-model="form.transferCode" placeholder="请选择转移对象" deptCode="meta_dept" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="transferVisible = false">取消</el-button>
        <el-button type="primary" @click="transfer" :loading="transferLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
  <el-dialog title="添加红人标签" :model-value="labelVisible" @close="labelVisible = false">
    <el-cascader
      v-model="labelCodeList"
      :props="labelProps"
      placeholder="红人标签"
      clearable
      collapse-tags
      collapse-tags-tooltip
    />
    <template #footer>
      <el-space class="dialog-footer">
        <el-button @click="labelVisible = false">取消</el-button>
        <el-button type="primary" @click="addLabel" :loading="addLoading">保存</el-button>
      </el-space>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi, platformApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
    userList?: string[];
    params?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'refresh'): void;
  }>();

  const form = ref({
    transferCode: '',
  });
  const formRef = ref();
  const rules = ref({
    transferCode: { required: true, message: '请选择转移对象', trigger: ['blur'] },
  });
  const labelProps = {
    lazy: true,
    multiple: true,
    async lazyLoad(node, resolve) {
      const { level, value } = node;
      const res = await metaApi.luteosMetaQueryLabelList({
        pageNum: 1,
        pageSize: 500,
        module: 'meta',
        labelCode: value,
      });
      const nodes = res?.labelInfoList?.map((item) => ({
        value: item.labelCode,
        label: item.name,
        leaf: level >= 1,
      }));
      resolve(nodes);
    },
  };

  const sceneIndex = ref<number>(0);

  const sceneList = ref([]);
  if (checkPermission('batchMark')) {
    sceneList.value.push({
      desc: '批量标记',
      type: 'batchMark',
    });
  }
  /* if (checkPermission('batchMetaUpdate')) {
    sceneList.value.push({
      desc: '批量【已建联】',
      type: 'batchBind',
    });
    sceneList.value.push({
      desc: '批量【未合作】',
      type: 'batchUnBind',
    });
  }
  if (checkPermission('batchMove')) {
    sceneList.value.push({
      desc: '批量转移',
      type: 'batchMove',
    });
  } */
  if (checkPermission('importMetaUser')) {
    sceneList.value.push({
      desc: '批量导入红人信息',
      type: 'upload',
      service: metaApi.luteosMetaImportMetaUser,
      templateService: metaApi.luteosMetaDownMetaTemplate,
      fileList: [],
    });
  }
  if (checkPermission('importMetaUserOrder')) {
    sceneList.value.push({
      desc: `批量导入红人发样信息`,
      type: 'upload',
      service: metaApi.luteosMetaImportMetaUserOrder,
      templateService: metaApi.luteosMetaDownLoadMetaOrderTemplate,
      fileList: [],
    });
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const router = useRouter();
  const labelVisible = ref(false);
  const transferVisible = ref(false);
  const labelCodeList = ref([]);
  const confirmUpload = async () => {
    const itemScene = sceneList.value[sceneIndex.value];
    const { type } = itemScene;
    if (type === 'upload') {
      fileList.value = itemScene.fileList;
      if (fileList.value.length && fileList.value[0].status === 'success') {
        loading.value = true;
        const res = await itemScene
          .service({
            fileName: fileList.value[0].name,
            ossKey: fileList.value[0].ossKey,
          })
          .finally(() => {
            loading.value = false;
          });
        emit('close', true);
        ElMessage.success('上传成功');
        const isConfirmed = await swal.confirm({
          text: '上传成功，是否去查看上传日志?',
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
      } else {
        ElMessage.error('请先选择文件');
      }
    } else if (!props.userList?.length) {
      ElMessage.warning('请先勾选红人');
    } else {
      // 批量标记
      if (type === 'batchMark') {
        labelVisible.value = true;
      }
      if (type === 'batchBind') {
        changeStatus(2);
      }
      if (type === 'batchUnBind') {
        changeStatus(3);
      }
      if (type === 'batchMove') {
        transferVisible.value = true;
      }
    }
  };
  const getTemplate = async (index) => {
    const res = await sceneList.value[index].templateService({});
    urlDownload(res as string);
  };

  const addLoading = ref(false);
  const addLabel = async () => {
    try {
      addLoading.value = true;
      await metaApi.luteosMetaOperateUser({
        userCodeList: props.userList,
        operateType: 4,
        labelCodeList: labelCodeList.value?.map((item) => item[1]),
      });
      ElMessage.success('添加成功');
      emit('close', true);
    } finally {
      labelVisible.value = false;
      addLoading.value = false;
    }
  };

  const changeStatus = async (status) => {
    await metaApi.luteosMetaOperateUser({
      userCodeList: props.userList,
      operateType: 10,
      status,
    });
    ElMessage.success('修改状态成功');
    emit('close', true);
  };
  const transferLoading = ref(false);
  const transfer = async () => {
    try {
      transferLoading.value = true;
      await metaApi.luteosMetaOperateUser({
        userCodeList: props.userList,
        operateType: 8,
        transferCode: form.value.transferCode,
      });
      ElMessage.success('转移成功');
      emit('close', true);
    } finally {
      transferVisible.value = false;
      transferLoading.value = false;
    }
  };
</script>

<style scoped lang="scss"></style>
