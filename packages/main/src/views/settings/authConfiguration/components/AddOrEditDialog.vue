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
      :hide-required-asterisk="detailType"
      :class="{ 'detail-form': detailType }"
      require-asterisk-position="right"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="sub-title">基础信息</div>
        </el-col>
        <template v-if="!detailType">
          <el-col :span="12">
            <el-form-item label="平台编码" prop="platformCode">
              <el-input
                :disabled="localType == 'edit'"
                v-model="localFormData.platformCode"
                placeholder="请输入"
              />
              <span class="form-tip" v-if="localType == 'edit'">平台编码创建后不可修改</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台名称" prop="platformName">
              <el-input
                :disabled="localType == 'edit'"
                v-model="localFormData.platformName"
                placeholder="请输入"
              />
              <span class="form-tip" v-if="localType == 'edit'">平台名称创建后不可修改</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用编码" prop="appCode">
              <el-input
                :disabled="localType == 'edit'"
                v-model="localFormData.appCode"
                placeholder="请输入"
              />
              <span class="form-tip" v-if="localType == 'edit'">应用编码创建后不可修改</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用名称" prop="appName">
              <el-input v-model="localFormData.appName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="鉴权类型" prop="authType">
              <el-select v-model="localFormData.authType">
                <el-option :value="1" label="固定秘钥" />
                <el-option :value="2" label="OAuth动态Token" />
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="detailType">
          <el-col :span="8">
            <div class="detail-item">
              <span>平台编码</span>
              <span>{{ localFormData.platformCode || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>平台名称</span>
              <span>{{ localFormData.platformName || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>应用编码</span>
              <span>{{ localFormData.appCode || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>应用名称</span>
              <span>{{ localFormData.appName || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>鉴权类型</span>
              <Tag
                v-if="localFormData.authType"
                :color="localFormData.authType === 1 ? 'gray' : 'blue'"
              >
                {{ authTypeMap[localFormData?.authType] }}
              </Tag>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>状态</span>
              <Tag v-if="localFormData.status" :color="localFormData.status == 1 ? 'green' : 'red'">
                {{ statusMap[localFormData?.status] }}
              </Tag>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-item">
              <span>创建时间</span>
              <span>{{ localFormData.createTime || '-' }}</span>
            </div>
          </el-col>
        </template>
        <el-col :span="24">
          <div class="sub-title">鉴权配置</div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="client ID" prop="clientId">
            <span v-if="detailType">{{ localFormData.clientId || '-' }}</span>
            <el-input v-if="!detailType" v-model="localFormData.clientId" placeholder="请输入客户端ID" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="client Secret" prop="clientSecret">
            <span v-if="detailType" style="font-size: 6px">
              {{ getSecretValue(localFormData.clientSecret) }}
            </span>
            <el-input
              v-if="!detailType"
              type="password"
              show-password
              v-model="localFormData.clientSecret"
              placeholder="请输入客户端密钥"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <div class="sub-title">API配置</div>
        </el-col>
        <template v-if="!detailType">
          <el-col :span="12">
            <el-form-item label="API基础URL" prop="apiBaseUrl">
              <el-input v-model="localFormData.apiBaseUrl" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授权URL" prop="authUrl">
              <el-input v-model="localFormData.authUrl" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </template>
        <template v-if="detailType">
          <el-col :span="24">
            <div class="detail-item">
              <span>API基础URL</span>
              <span>{{ localFormData.apiBaseUrl || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="detail-item">
              <span>授权URL</span>
              <span>{{ localFormData.authUrl || '-' }}</span>
            </div>
          </el-col>
        </template>
        <el-col :span="24">
          <el-form-item label="Token获取URL" prop="tokenUrl">
            <span v-if="detailType">{{ localFormData.tokenUrl || '-' }}</span>
            <el-input v-if="!detailType" v-model="localFormData.tokenUrl" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <div class="sub-title">扩展配置</div>
        </el-col>
        <template v-if="!detailType">
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
            <span class="form-tip">平台特有配置，JSON格式，以平台编码为key</span>
          </el-col>

          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="localFormData.status">
                <el-radio :value="1">启用</el-radio>
                <el-radio :value="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="detailType">
          <div class="ext-info" v-if="localFormData.extInfo">
            <pre class="pre-text">{{ formattedJson(localFormData.extInfo) }}</pre>
          </div>
          <span v-else style="padding-left: 10px">-</span>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">
        {{ detailType ? '编辑' : '保存' }}
      </el-button>
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
    apiBaseUrl?: string;
    appCode?: string;
    appName?: string;
    authType?: number;
    authUrl?: string;
    clientId?: string;
    clientSecret?: string;
    extInfo?: string;
    platformCode?: string;
    platformName?: string;
    tokenUrl?: string;
    createTime?: string;
  }

  const emit = defineEmits<{
    (event: 'success', formData: formType): void;
  }>();

  const localFormData = ref<formType>({});

  const dialogTitle = computed(() =>
    localFormData.value?.id ? (detailType.value ? '平台配置详情' : '编辑平台配置') : '新增平台配置'
  );

  const authTypeMap = {
    1: '固定秘钥',
    2: 'OAuth动态Token',
  };

  const statusMap = {
    1: '启用',
    2: '禁用',
  };

  const rules = {
    platformCode: [{ required: true, message: '请输入平台编码', trigger: 'blur' }],
    platformName: [{ required: true, message: '请输入平台名称', trigger: 'blur' }],
    appCode: [{ required: true, message: '请输入应用编码', trigger: 'blur' }],
    appName: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    authType: [{ required: true, message: '请选择鉴权类型', trigger: 'change' }],
    clientId: [{ required: true, message: '请输入客户端ID', trigger: 'blur' }],
    clientSecret: [{ required: true, message: '请输入客户端密钥', trigger: 'blur' }],
    apiBaseUrl: [{ required: true, message: '请输入API基础URL', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  };

  const visible = ref(false);
  const open = async (type, id?: number) => {
    localFormData.value = { status: 1 };
    localType.value = type;
    if (id) {
      // 请求详情接口
      let result: formType = await platformApi.platformChannelConfigQueryDetail({ id });
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

  const getSecretValue = (value) => {
    if (!value) return '-';
    return '●'.repeat(value.length);
  };

  // 编辑 和新增
  const saveLoading = ref(false);
  const ruleFormRef = ref();
  const localType = ref('');
  const detailType = computed(() => localType.value == 'detail');
  const save = async () => {
    if (localType.value == 'detail') {
      localType.value = 'edit';
      return;
    }
    if (ruleFormRef.value && ruleFormRef.value.validate) {
      const valid = await ruleFormRef.value.validate((valid) => valid);
      if (valid) {
        // 请求接口
        saveLoading.value = true;
        // 处理状态为已处理或者无需处理 需要额外调用更新待办接口
        try {
          localFormData.value.extInfo = localFormData.value.extInfo || undefined;
          await platformApi.platformChannelConfigSaveOrUpdate(localFormData.value);
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
  .sub-title {
    font-size: 14px;
    color: var(---N8, #666);
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 10px;
  }

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

  .detail-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
    > span:nth-child(1) {
      color: #6b7280;
      line-height: 32px;
    }
    > span:nth-child(2) {
      line-height: 16px;
    }
    :deep(.status-tag) {
      width: min-content;
    }
  }

  .ext-info {
    width: 100%;
    padding: 12px;
    background-color: #f9fafb;
    border-radius: 4px;
    .pre-text {
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 14px;
      line-height: 1.5rem;
      --tw-text-opacity: 1;
    }
  }

  .detail-form {
    :deep(.el-form-item) {
      .el-form-item__label {
        color: #6b7280;
        font-size: 14px;
      }
      .el-form-item__content {
        line-height: 16px;
      }
    }
  }
</style>
