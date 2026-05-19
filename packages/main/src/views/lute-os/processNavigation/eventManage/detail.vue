<template>
  <el-form
    :model="form"
    ref="formRef"
    label-width="140"
    label-position="left"
    :rules="rules"
    :disabled="isDetail"
    scroll-to-error
  >
    <KeenCard title="基础信息">
      <el-form-item label="事项分类" prop="topMatterName">
        <el-input class="input-width" v-model="form.topMatterName" disabled />
      </el-form-item>
      <el-form-item label="事项名称" prop="secondMatterName">
        <el-input
          class="input-width"
          v-model="form.secondMatterName"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" class="input-width">
          <el-option label="停用" :value="0" />
          <el-option label="启用" :value="1" />
        </el-select>
      </el-form-item>
    </KeenCard>

    <KeenCard title="审批类">
      <el-form-item
        :label="`事项审批流程(${index + 1})`"
        :prop="`matterItemList.${index}.processCode`"
        v-for="(_, index) of form.matterItemList"
        :key="index"
      >
        <!-- :rules="[{ required: true, message: '请选择事项审批流程' }]" -->
        <el-cascader
          :options="approveListGroupList"
          v-model="form.matterItemList[index].processCode"
          clearable
          filterable
          :show-all-levels="true"
          :props="{
            emitPath: false,
            expandTrigger: 'hover',
            multiple: false,
            checkStrictly: false,
            label: 'name',
            value: 'processCode',
            children: 'approveListItemList',
          }"
        />

        <span class="remove" @click="removeApprove(index)">
          <el-icon><Delete /></el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" @click="addApprove">继续添加事项审批</el-button>
    </KeenCard>

    <KeenCard title="文件类">
      <div class="file-wrap" v-for="(_, index) of form.matterFileList" :key="index">
        <el-form-item label="请添加文件链接" :prop="`matterFileList.${index}.fileUrl`">
          <el-input class="input-width" v-model="form.matterFileList[index].fileUrl" />
        </el-form-item>
        <el-form-item
          label="请添加文件名"
          :prop="`matterFileList.${index}.fileName`"
          class="file-name"
        >
          <el-input class="input-width" v-model="form.matterFileList[index].fileName" />
        </el-form-item>
        <span class="remove file-remove" @click="removeFileUrl(index)">
          <el-icon><Delete /></el-icon>
        </span>
      </div>
      <el-button type="primary" @click="addFileUrl">继续添加文件链接</el-button>
    </KeenCard>

    <KeenCard title="模板类">
      <div style="width: 600px">
        <el-form-item label="请上传文件">
          <KeenFileUpload
            ref="upload"
            v-model="fileList"
            directory="fileCenter"
            limit="100"
            accept=".xlsx,.xls,.pdf,.doc,.docx"
            :multiple="true"
          >
            <el-button type="primary" size="small">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
      </div>
    </KeenCard>
    <div class="form-save">
      <el-button @click="goBack">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">提交</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="detailEvent">
  import { processApi, workflowApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const form = ref({
    topMatterName: '',
    secondMatterName: '',
    code: '',
    matterFileList: [],
    matterTemplateList: [],
    matterItemList: [],
    status: '',
  });

  const fileList = ref([]);

  const fileItem = {
    fileName: '',
    fileUrl: '',
  };

  const approvalItem = {
    processCode: '',
  };

  const queryDetail = () => {
    processApi
      .luteosProcessNavigationMatterQueryDetail({
        code: route.query.code,
      })
      .then((res: any) => {
        form.value.code = res.code;
        form.value.topMatterName = res.topMatterName || '';
        form.value.secondMatterName = res.secondMatterName || '';
        form.value.status = res.status || 0;

        if (res.matterFileList && res.matterFileList.length) {
          form.value.matterFileList = res.matterFileList;
        }

        // 回显文件
        if (res.matterTemplateList && res.matterTemplateList.length) {
          res.matterTemplateList.forEach((item: any) => {
            fileList.value.push({
              percentage: 100,
              templateCode: item.templateCode,
              name: item.templateName,
              status: 'success',
              ossKey: item.templateUrl,
              sort: item.sort,
            });
          });
        }

        if (res.matterItemList && res.matterItemList.length) {
          form.value.matterItemList = res.matterItemList;
        }
      });
  };

  const approveListGroupList = ref([]);
  const initApproveListGroupList = async () => {
    const res = await workflowApi.luteosWorkflowApproveQueryAllList();
    approveListGroupList.value = (res.approveListGroupList as []).map((item) => {
      return {
        name: item.groupName,
        processCode: item.groupName,
        approveListItemList: item.approveListItemList,
      };
    });
  };

  initApproveListGroupList();

  const addApprove = () => {
    form.value.matterItemList?.push({ ...approvalItem });
  };
  const removeApprove = (index) => {
    form.value.matterItemList?.splice(index, 1);
  };

  const addFileUrl = () => {
    form.value.matterFileList?.push({ ...fileItem });
  };
  const removeFileUrl = (index) => {
    form.value.matterFileList?.splice(index, 1);
  };

  const formRef = ref();
  const saveLoading = ref(false);
  const save = () => {
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        let flag = false;
        const matterFileList = [];
        if (form.value.matterFileList && form.value.matterFileList.length) {
          form.value.matterFileList.forEach((item) => {
            if ((!item.fileName && item.fileUrl) || (item.fileName && !item.fileUrl)) {
              ElMessage.warning('请补充完文件类的完整信息');
              flag = true;
            } else if (item.fileName && item.fileUrl) {
              matterFileList.push(item);
            }
          });

          if (flag) {
            return;
          }
        }
        const matterTemplateList = [];
        if (fileList.value.length) {
          fileList.value.forEach((file) => {
            const fileName = file.name.split('.')[0];
            const data = {
              templateName: fileName,
              templateUrl: file.ossKey,
              templateCOde: file.templateCode,
              sort: file.sort,
            };
            if (!data.templateCOde) {
              delete data.templateCOde;
            }
            if (!data.sort) {
              delete data.sort;
            }
            matterTemplateList.push(data);
          });
        }

        const matterItemList = [];
        if (form.value.matterItemList && form.value.matterItemList.length) {
          form.value.matterItemList.forEach((item) => {
            if (item.processCode) {
              matterItemList.push(item);
            }
          });
        }
        saveLoading.value = true;
        processApi
          .luteosProcessNavigationMatterSave({
            code: form.value.code,
            matterFileList,
            matterItemList,
            matterTemplateList,
            name: form.value.secondMatterName,
            operateType: 2,
            status: form.value.status,
          })
          .then(() => {
            ElMessage.success('提交成功');
            goBack();
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const goBack = () => {
    router.go(-1);
  };

  onMounted(() => {
    queryDetail();
  });
</script>

<style scoped lang="scss">
  .input-width {
    width: 400px;
  }

  .remove {
    margin-left: 10px;
    cursor: pointer;
  }
  .file-wrap {
    display: flex;
  }
  .file-name {
    margin-left: 20px;
  }
  .file-remove {
    margin-top: 12px;
  }
  .form-save {
    text-align: center;
  }
</style>
