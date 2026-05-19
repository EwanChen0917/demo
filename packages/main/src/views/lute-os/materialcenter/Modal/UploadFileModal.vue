<template>
  <el-dialog :model-value="visible" @close="handleClose" :title="title" align-center>
    <el-form :model="form" ref="formRef" class="form-data" label-position="left" scroll-to-error>
      <el-form-item
        v-if="operateType === 0"
        prop="fileList"
        :rules="[{ required: true, message: '文件不能为空', trigger: ['blur', 'change'] }]"
      >
        <KeenFileUpload
          ref="upload"
          v-model="form.fileList"
          directory="fileCenter"
          limit="5"
          :multiple="true"
          :isPublic="true"
          @success="handleUploadFileSuc"
          :showOperate="true"
          class="file-upload"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
      </el-form-item>
      <el-form-item
        prop="filePathCode"
        v-if="operateType === 0"
        :rules="[{ required: true, message: '选择文件路径不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-tree-select
          clearable
          node-key="fileCode"
          style="width: 100%"
          v-model="form.filePathCode"
          :data="folderList"
          :render-after-expand="true"
          check-strictly
          :props="{
            label: 'fileName',
            value: 'fileCode',
            children: 'children',
          }"
          placeholder="选择文件路径不能为空"
        />
      </el-form-item>
      <el-form-item
        prop="ownerList"
        v-if="[0, 1].includes(operateType)"
        :rules="[{ required: true, message: '选择可见范围不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-tree-select
          :v-loading="loading"
          clearable
          node-key="deptId"
          show-checkbox
          multiple
          style="width: 100%"
          v-model="form.ownerList"
          :data="treeData"
          :render-after-expand="false"
          placeholder="选择可见范围"
        />
      </el-form-item>
      <el-form-item
        v-if="[0, 2].includes(operateType)"
        prop="auth"
        :rules="[{ required: true, message: '选择文件权限不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.auth" placeholder="选择文件权限不能为空" style="width: 100%">
          <el-option :key="1" label="可查看和下载" :value="1" />
          <el-option :key="2" label="仅查看" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="[0, 3].includes(operateType)" prop="labelCodeList">
        <el-tree-select
          v-if="isShowTreeLabel"
          clearable
          filterable
          multiple
          show-checkbox
          collapse-tags
          node-key="labelCode"
          v-model="form.labelCodeList"
          :data="labelTreeData"
          :props="{
            label: 'name',
            value: 'labelCode',
            children: 'childInfoList',
          }"
          :render-after-expand="true"
          check-strictly
          placeholder="请选择文件标签"
        />
        <el-select
          v-else
          v-model="form.labelCodeList"
          clearable
          filterable
          multiple
          placeholder="请选择文件标签"
        >
          <el-option
            v-for="item in labelList"
            :key="item.labelCode"
            :label="item.labelName"
            :value="item.labelCode"
            :disabled="+item.status === 0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="[0, 4].includes(operateType)"
        prop="fileSource"
        :rules="[
          {
            pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: '请输入合法的素材来源',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.fileSource" placeholder="请输入素材来源" maxlength="500" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { fccApi } from '@/api/index';

  const props = defineProps<{
    visible: boolean;
    operateType: number;
    fileCode: string;
    auth: number;
    labelCodeList: Array<string>;
    labelList: Array<{ labelCode: string; labelName: string }>;
    fileSource: string;
    sceneInfo: Object;
    isShowTreeLabel: boolean;
    labelTreeData: Array<any>;
  }>();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', val?: any): void;
  }>();

  const title = computed(() => {
    const titleMap = {
      0: '上传文件',
      1: '修改可见范围',
      2: '修改文件权限',
      3: '编辑标签',
      4: '编辑素材来源',
    };
    return titleMap[props.operateType];
  });

  const form = ref({
    fileList: [],
    auth: props.auth || '',
    ownerList: [],
    labelCodeList: props.labelCodeList || [],
    fileSource: props.fileSource || '',
    filePathCode: '', // -1是默认根目录，需要设置一个值，不然交互上无法回显，保存后台的时候如果是根目录会保存为空
  });
  const formRef = ref();
  const handleSave = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      // 文件上传
      if (props.operateType === 0) {
        const fileList = [];
        let fileInfo = {};
        // 设置文件信息
        if (form.value?.fileList?.length) {
          form.value?.fileList.forEach((file: any) => {
            const fileName = file.name.split('.').slice(0, -1).join('.');
            const extType = file.name
              .split('.')
              [file.name.split('.').length - 1].toLocaleLowerCase();
            fileInfo = {
              extType,
              fileName: fileName.substring(0, 500),
              fileKey: file.ossKey,
              fileSize: file.size,
              thumbnailKey: ['jpg', 'jpeg', 'png'].includes(extType)
                ? file.ossKey
                : file.thumbnailKey,
            };
            fileList.push(fileInfo);
          });
        }

        emit('save', {
          labelCodeList: form.value.labelCodeList,
          fileReqs: fileList,
          auth: form.value.auth,
          ownerList: form.value.ownerList,
          fileSource: form.value.fileSource,
          filePathCode: form.value.filePathCode === '-1' ? '' : form.value.filePathCode,
        });
      } else if (props.operateType === 2) {
        emit('save', {
          auth: form.value.auth,
          fileCode: props.fileCode,
          operateType: props.operateType,
        });
      } else if (props.operateType === 1) {
        emit('save', {
          ownerList: form.value.ownerList,
          fileCode: props.fileCode,
          operateType: props.operateType,
        });
      } else if (props.operateType === 3) {
        const data = {
          labelCodeList: form.value.labelCodeList,
          fileCode: props.fileCode,
          operateType: props.operateType,
        };
        // 如果是树结构标签，更新标签时传设置
        if (props.isShowTreeLabel) {
          data.scene = 3;
          data.operateType = 5;
        }
        emit('save', data);
      } else if (props.operateType === 4) {
        emit('save', {
          fileSource: form.value.fileSource,
          fileCode: props.fileCode,
          operateType: props.operateType,
        });
      }
    }
  };
  const handleUploadFileSuc = () => {
    formRef.value.validateField('fileList');
  };

  const treeData = ref();
  const querySubDeptList = async () => {
    form.value.ownerList = [];
    const res = await fccApi.luteosFccCenterQueryDeptInfoList({ fileCode: props.fileCode || '' });
    const data = res.deptList;
    deepTree(res.deptList);
    treeData.value = data;
  };
  querySubDeptList();
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.deptName;
      item.value = item.deptId;

      if (item.check) {
        form.value.ownerList.push(item.deptId);
      }
    });
  };
  const handleClose = () => {
    emit('close');
    formRef.value.resetFields();
  };
  const removeFileType2 = (arr) => {
    // 过滤掉fileType等于2的项
    arr = arr.filter((item) => item.fileType !== 2);

    // 递归处理children数组
    arr.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        item.children = removeFileType2(item.children);
      }
    });

    return arr;
  };
  const folderList = ref([]);
  const queryAllFolder = () => {
    fccApi
      .luteosFccCenterFindAllFolder({ fileCode: '', scene: +props.sceneInfo.scene })
      .then((res) => {
        const list = removeFileType2(res.fccFolderDetails || []);
        const data: any = {
          fileName: props.sceneInfo.title,
          fileCode: '-1',
          fileType: 1,
          children: list,
        };
        folderList.value = [data];
      });
  };
  queryAllFolder();
</script>

<style scoped lang="scss">
  .file-upload {
    :deep(.el-upload-list--text) {
      min-width: 400px !important;
      max-width: 500px !important;
    }
  }
</style>
