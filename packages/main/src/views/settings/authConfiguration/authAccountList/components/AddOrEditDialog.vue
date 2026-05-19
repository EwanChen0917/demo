<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    :close-on-click-modal="false"
    align-center
    @open="handleDialogOpen"
  >
    <el-form
      ref="ruleFormRef"
      :model="localFormData"
      :rules="rules"
      require-asterisk-position="right"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="账号名称" prop="accountName">
            <!--  -->
            <el-input
              :disabled="localType == 'edit'"
              v-model="localFormData.accountName"
              placeholder="请输入"
            />
            <span class="form-tip" v-if="localType == 'edit'">账号名称创建后不可修改</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="账号标识" prop="accountId">
            <el-input
              :disabled="localType == 'edit'"
              v-model="localFormData.accountId"
              placeholder="请输入"
            />
            <span class="form-tip" v-if="localType == 'edit'">账号标识创建后不可修改</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Access Token" prop="accessToken">
            <el-input
              :rows="5"
              type="textarea"
              v-model="localFormData.accessToken"
              placeholder="请输入访问令牌"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Refresh Token" prop="refreshToken">
            <el-input
              :rows="5"
              type="textarea"
              v-model="localFormData.refreshToken"
              placeholder="请输入刷新令牌"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="过期时间" prop="expiresTime">
            <el-date-picker
              v-model="localFormData.expiresTime"
              type="datetime"
              placeholder="请选择"
              value-format="YYYY-MM-DD HH:mm:ss"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="授权范围" prop="scope">
            <el-input v-model="localFormData.scope" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="localFormData.remark" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="扩展信息（JSON）" prop="extInfo" class="extInfo-item">
            <el-input
              v-model="localFormData.extInfo"
              :rows="7"
              placeholder="{“tiktok”: {“seller_id”: “xxx”, “warehouse_id”: “xxx”}}"
              show-word-limit
              type="textarea"
            />
          </el-form-item>
          <span class="form-tip">账号特有配置，JSON格式</span>
        </el-col>

        <el-col :span="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="localFormData.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  interface formType {
    id?: number;
    status?: number;
    extInfo?: string;
    remark?: string;
    scope?: string;
    expiresTime?: string;
    refreshToken?: string;
    accessToken?: string;
    accountId?: string;
    accountName?: string;
  }

  const props = withDefaults(
    defineProps<{
      appCode: string;
      platformCode: string;
    }>(),
    {
      appCode: '',
      platformCode: '',
    }
  );

  const emit = defineEmits<{
    (event: 'success', formData: formType): void;
  }>();

  const localFormData = ref<formType>({});

  const dialogTitle = computed(() => (localFormData.value?.id ? '编辑授权账号' : '新增授权账号'));

  const rules = {
    accountName: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
    accountId: [{ required: true, message: '请输入账号标识', trigger: 'blur' }],
    accessToken: [{ required: true, message: '请输入访问令牌', trigger: 'blur' }],
    refreshToken: [{ required: true, message: '请输入刷新令牌', trigger: 'blur' }],
    expiresTime: [{ required: true, message: '请选择过期时间', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  };

  const visible = ref(false);
  const open = async (type, id?: number) => {
    localFormData.value = { status: 1 };
    localType.value = type;
    if (id) {
      // 请求详情接口
      let result: formType = await platformApi.platformChannelAccountQueryDetail({ id });
      localFormData.value = cloneDeep(result) || {};
      localFormData.value.extInfo = localFormData.value.extInfo
        ? formattedJson(localFormData.value.extInfo)
        : '';
    }
    visible.value = true;
    ruleFormRef.value?.resetFields()
  };

  const close = () => {
    visible.value = false;
  };

  // JSON格式转换
  const formattedJson = (jsonValue) => {
    try {
      const jsonObj = JSON.parse(jsonValue);
      return JSON.stringify(jsonObj, null, 2).trim();
    } catch (error) {
      return `JSON解析失败`;
    }
  };

  // 编辑 和新增
  const saveLoading = ref(false);
  const ruleFormRef = ref();
  const localType = ref('');
  const save = async () => {
    if (ruleFormRef.value && ruleFormRef.value.validate) {
      const valid = await ruleFormRef.value.validate((valid) => valid);
      if (valid) {
        // 请求接口
        saveLoading.value = true;
        let params = {
          ...localFormData.value,
          appCode: props.appCode,
          platformCode: props.platformCode,
          extInfo: localFormData.value.extInfo || undefined,
        };
        // 处理状态为已处理或者无需处理 需要额外调用更新待办接口
        try {
          await platformApi.platformChannelAccountSaveOrUpdate(params);
          ElMessage.success('保存成功');
          emit('success', localFormData.value);
          close();
        } finally {
          saveLoading.value = false;
        }
      }
    }
  };

  // 每次打开dialog滚动恢复初始值
  const handleDialogOpen = () => {
    const dialogBodyEle = document.querySelector('.el-dialog__body');
    if (dialogBodyEle) {
      dialogBodyEle.scrollTop = 0;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .form-tip {
    font-size: 12px;
    color: #9ca3af;
  }

  :deep(.el-form-item) {
    flex-direction: column;
    .el-form-item__label {
      justify-content: flex-start;
      color: #1f1f1f;
    }
    .el-form-item__content {
      > span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .extInfo-item {
    margin-bottom: 0.35rem;
  }

</style>
