<template>
  <div class="user-add-page">
    <el-tabs v-model="activeTab" class="user-add-tabs">
      <el-tab-pane :label="baseTabLabel" name="base">
        <el-form
          :model="form"
          :disabled="isBaseFormDisabled"
          :rules="formRules"
          ref="formRef"
          label-position="top"
        >
          <KeenCard title="用户信息">
            <el-row :gutter="20" style="max-width: 800px">
              <el-col :span="24" :offset="0">
                <el-form-item label="用户名称" prop="name">
                  <el-input
                    v-model="form.name"
                    placeholder="用户名称"
                    maxlength="50"
                    show-word-limit
                    :disabled="isBaseFormDisabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item label="用户类型" prop="userType">
                  <div class="type-inline">
                    <el-select
                      v-model="form.userType"
                      placeholder="请选择用户类型"
                      clearable
                      filterable
                      class="type-select"
                      @change="handleUserTypeChange"
                      :disabled="isUserTypeLocked"
                    >
                      <el-option
                        v-for="item in accountSourceSelectableOptions"
                        :key="item.value"
                        :label="item.desc"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0" v-if="isOverseas">
                <el-form-item label="登录账号" prop="loginAccount" :required="isOverseas">
                  <el-input
                    v-model.trim="form.loginAccount"
                    placeholder="请输入登录账号"
                    maxlength="50"
                    show-word-limit
                    :disabled="isUserTypeLocked"
                    inputmode="email"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0" v-if="isOverseas">
                <el-form-item prop="password">
                  <template #label>
                    <span v-if="isPasswordRequired" class="required-mark">*</span>
                    <span>{{ passwordLabel }}</span>
                  </template>
                  <div class="password-field">
                    <el-input
                      ref="passwordInputRef"
                      :model-value="passwordDisplayValue"
                      @update:model-value="updatePassword"
                      type="password"
                      placeholder="请输入密码"
                      maxlength="20"
                      show-word-limit
                      show-password
                      :disabled="isEdit && !isPasswordEditing"
                    />
                    <el-button
                      v-if="isEdit"
                      type="primary"
                      @click="enablePasswordEdit"
                      :disabled="isPasswordEditing"
                    >
                      修改密码
                    </el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0" v-if="isOverseas && isPasswordEditing">
                <el-form-item prop="confirmPassword">
                  <template #label>
                    <span v-if="isPasswordEditing" class="required-mark">*</span>
                    <span>再次输入密码</span>
                  </template>
                  <el-input
                    v-model="form.confirmPassword"
                    type="password"
                    placeholder="再次输入密码"
                    maxlength="20"
                    show-word-limit
                    show-password
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item prop="deptIdList">
                  <template #label>
                    <span v-if="isOverseas" class="required-mark">*</span>
                    <span>用户所属部门</span>
                  </template>
                  <el-tree-select
                    v-loading="deptLoading"
                    check-strictly
                    clearable
                    node-key="deptId"
                    collapse-tags
                    :multiple="isInternalUser"
                    collapse-tags-tooltip
                    v-model="deptIdValue"
                    :data="treeData"
                    popper-class="picker-cat-tree-select"
                    :render-after-expand="false"
                    placeholder="请选择所属部门"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item label="手机号码" prop="contact">
                  <el-input
                    v-model.trim="form.contact"
                    placeholder="请输入手机号码"
                    maxlength="20"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item label="用户职位" prop="title" :required="isOverseas">
                  <el-input
                    v-model="form.title"
                    placeholder="用户职位"
                    maxlength="50"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item label="用户说明" prop="remark">
                  <el-input
                    v-model="form.remark"
                    type="textarea"
                    :rows="4"
                    maxlength="200"
                    show-word-limit
                    placeholder="用户说明"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="0">
                <el-form-item label="是否展示【切换系统】按钮" prop="unDefaultSystemFlag">
                  <el-radio-group v-model="form.unDefaultSystemFlag">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </KeenCard>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="关联角色权限" name="roles">
        <role-bind-panel
          ref="roleBindPanelRef"
          :selected-role-codes="selectedRoleCodes"
          :selected-role-list="selectedRoleList"
          :selected-role-name-map="selectedRoleNameMap"
          @update:selected-role-codes="(val) => (selectedRoleCodes = val)"
          @update:selected-role-name-map="(val) => (selectedRoleNameMap = val)"
          @preview="handlePreview"
        />
      </el-tab-pane>
    </el-tabs>
    <div class="card-footer d-flex py-6 px-9" v-if="mode !== 'detail'">
      <el-space>
        <el-button :disabled="saveLoading" @click="cancel">返回列表</el-button>
        <el-button type="primary" :loading="saveLoading" @click="save">
          {{ isEdit ? '保存' : '创建用户' }}
        </el-button>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts" name="userListEdit">
  import { platformApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { castArray, isEmpty, isNil, omitBy } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  import RoleBindPanel from './components/roleBindPanel.vue';
  import { createUserFormValidators } from './validators';
  import { fetchAccountSourceDict, fetchDeptTree, createUser, fetchUserDetail } from './api';
  const { closeTabAndRefresh } = useTabs();
  const props = defineProps({
    mode: {
      type: String,
      default: 'add',
    },
  });
  const mode = computed(() => (route.query?.mode ? String(route.query.mode) : props.mode));
  const baseTabLabel = computed(() => (mode.value === 'edit' ? '编辑用户' : '新增用户'));
  const route = useRoute();
  const activeTab = ref(mode.value === 'edit' ? 'roles' : 'base');
  const router = useRouter();
  const formRef = ref();
  const accountSourceOptions = ref([]);
  const accountSourceSelectableOptions = computed(() => {
    const enabledDescs = new Set(['外部员工', '海外客服']);
    return accountSourceOptions.value.map((item) => ({
      ...item,
      disabled: !enabledDescs.has(item.desc),
    }));
  });
  const overseasValue = computed(() => {
    const target = accountSourceOptions.value.find((item) => item.desc === '海外客服');
    return target?.value ?? '';
  });
  const externalValue = computed(() => {
    const target = accountSourceOptions.value.find((item) => item.desc === '外部员工');
    return target?.value ?? '';
  });
  const internalValue = computed(() => {
    const target = accountSourceOptions.value.find((item) => item.desc === '内部员工');
    return target?.value ?? '';
  });
  const isEdit = computed(() => mode.value === 'edit');
  const isUserTypeLocked = computed(() => mode.value === 'detail' || isEdit.value);
  const form = ref({
    confirmPassword: '',
    accountCode: '',
    name: '',
    userType: '',
    loginAccount: '',
    password: '',
    deptIdList: [],
    contact: '',
    title: '',
    remark: '',
    unDefaultSystemFlag: '',
    roleList: [],
  });
  const isOverseas = computed(
    () =>
      form.value.userType === '5' ||
      (overseasValue.value !== '' && form.value.userType === overseasValue.value)
  );
  const isExternal = computed(
    () =>
      form.value.userType === '3' ||
      (externalValue.value !== '' && form.value.userType === externalValue.value)
  );
  const isInternalUser = computed(
    () =>
      form.value.userType === '0' ||
      (internalValue.value !== '' && form.value.userType === internalValue.value)
  );
  const normalizeDeptId = (value) => (isNil(value) || value === '' ? undefined : Number(value));
  const getDeptIdList = () =>
    castArray(form.value.deptIdList)
      .map((item) => normalizeDeptId(item))
      .filter((item) => !isNil(item));
  const deptIdValue = computed({
    get: () => (isInternalUser.value ? getDeptIdList() : getDeptIdList()[0] ?? ''),
    set: (value) => {
      if (isInternalUser.value) {
        form.value.deptIdList = castArray(value)
          .map((item) => normalizeDeptId(item))
          .filter((item) => !isNil(item));
        return;
      }
      const normalized = normalizeDeptId(value);
      form.value.deptIdList = isNil(normalized) ? [] : [normalized];
    },
  });

  const isBaseFormDisabled = computed(
    () => mode.value === 'detail' || (isEdit.value && !isOverseas.value && !isExternal.value)
  );
  const isPasswordEditing = ref(false);
  const isPasswordRequired = computed(
    () => isOverseas.value && (!isEdit.value || isPasswordEditing.value)
  );
  const passwordLabel = computed(() => (isPasswordEditing.value ? '请输入密码' : '密码'));
  const passwordDisplayValue = computed(() =>
    isEdit.value && !isPasswordEditing.value ? '********' : form.value.password
  );
  const passwordInputRef = ref();
  const updatePassword = (value) => {
    if (isEdit.value && !isPasswordEditing.value) return;
    form.value.password = value;
  };
  const selectedRoleCodes = ref([]);
  const selectedRoleList = ref([]);
  const selectedRoleNameMap = ref({});
  const roleBindPanelRef = ref();
  const {
    validateLoginAccount,
    validatePassword,
    validateConfirmPassword,
    validateDeptIdList,
    validateTitle,
  } = createUserFormValidators({
    isUserTypeLocked,
    isOverseas,
    isPasswordRequired,
    isPasswordEditing,
    form,
  });
  const formRules = ref({
    name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
    loginAccount: [
      {
        validator: validateLoginAccount,
        trigger: 'blur',
      },
    ],
    password: [
      {
        validator: validatePassword,
        trigger: 'blur',
      },
    ],
    confirmPassword: [
      {
        validator: validateConfirmPassword,
        trigger: 'blur',
      },
    ],
    deptIdList: [
      {
        validator: validateDeptIdList,
        trigger: 'change',
      },
    ],
    contact: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      {
        pattern: /^\d+$/,
        message: '仅限数字',
        trigger: 'blur',
      },
    ],
    title: [
      {
        validator: validateTitle,
        trigger: 'blur',
      },
    ],
    remark: [{ max: 200, message: '长度不能超过200', trigger: 'blur' }],
    roleList: [{ required: true, type: 'array', message: '该项必填', trigger: 'change' }],
    unDefaultSystemFlag: [{ required: true, message: '请选择是否展示', trigger: 'change' }],
  });
  const deptLoading = ref(false);
  const treeData = ref();
  const querySubDeptList = async () => {
    const res = await fetchDeptTree();
    const data = res?.deptInfoList || [];
    deepTree(data);
    treeData.value = data;
  };
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.deptName;
      item.value = item.deptId;
    });
  };
  querySubDeptList();
  const roleList = ref([]);
  const initRoleList = async () => {
    const res = await platformApi.platformRoleQueryRoleList({});

    roleList.value = res.roleList;
  };
  const initAccountSource = async () => {
    const res = await fetchAccountSourceDict();
    accountSourceOptions.value = res?.dictMap?.account_source || [];
  };
  const loadDetail = async () => {
    const accountCode = route.query?.accountCode;
    if (!accountCode || !isEdit.value) return;
    const res = await fetchUserDetail(accountCode);
    if (!res) return;
    form.value.accountCode = String(accountCode);
    form.value.name = res.name || '';
    form.value.userType = !isNil(res.source) ? String(res.source) : '';
    form.value.loginAccount = res.account || '';
    const deptIds =
      res.deptList
        ?.map((item) => (item?.value != null ? Number(item.value) : undefined))
        .filter((item) => !isNil(item)) || [];
    form.value.deptIdList = isExternal.value ? deptIds.slice(0, 1) : deptIds;
    form.value.contact = res.phone || '';
    form.value.title = res.position || '';
    form.value.remark = res.remark || '';
    // AccountDetailResp 未返回 password / unDefaultSystemFlag，保持前端默认值
    isPasswordEditing.value = false;
    form.value.password = '';
    form.value.confirmPassword = '';
    form.value.unDefaultSystemFlag = !isNil(res.unDefaultSystemFlag)
      ? Number(res.unDefaultSystemFlag)
      : 0;
    selectedRoleList.value = res.roleList || [];
    selectedRoleCodes.value =
      selectedRoleList.value.map((item) => item.value).filter(Boolean) || [];
    selectedRoleNameMap.value = selectedRoleList.value.reduce((acc, item) => {
      if (item?.value && item?.desc) acc[item.value] = item.desc;
      return acc;
    }, {});
  };
  initRoleList();
  initAccountSource();
  loadDetail();
  const cancel = () => {
    router.push({
      name: 'userList',
    });
  };
  const handleUserTypeChange = (val) => {
    form.value.userType = val;
    formRef.value?.clearValidate?.();
    const deptIdList = getDeptIdList();
    if (isExternal.value && deptIdList.length > 1) {
      form.value.deptIdList = deptIdList.slice(0, 1);
    }
    if (!isOverseas.value) {
      isPasswordEditing.value = false;
      form.value.password = '';
      form.value.confirmPassword = '';
    }
  };
  const enablePasswordEdit = () => {
    isPasswordEditing.value = true;
    form.value.password = '';
    form.value.confirmPassword = '';
    nextTick(() => {
      formRef.value?.clearValidate?.(['password', 'confirmPassword']);
      passwordInputRef.value?.focus?.();
    });
  };
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false;
    });
    if (!valid) {
      activeTab.value = 'base';
      return;
    }
    if (valid) {
      saveLoading.value = true;
      const deptIdListRaw = getDeptIdList();
      const deptIdList = isExternal.value ? deptIdListRaw.slice(0, 1) : deptIdListRaw;
      const payload = omitBy(
        {
          accountCode: isEdit.value ? form.value.accountCode : undefined,
          account: form.value.loginAccount,
          accountType: form.value.userType ? Number(form.value.userType) : undefined,
          deptIdList: deptIdList?.length ? deptIdList.map((item) => Number(item)) : undefined,
          mobile: form.value.contact,
          name: form.value.name,
          password: isEdit.value && !isPasswordEditing.value ? undefined : form.value.password,
          remark: form.value.remark,
          roleList: selectedRoleCodes.value,
          title: form.value.title,
          unDefaultSystemFlag: Number(form.value.unDefaultSystemFlag) || 0,
        },
        (value) => isNil(value) || value === ''
      );
      const res = await createUser(payload).finally(() => {
        saveLoading.value = false;
      });
      if (res) {
        ElMessage.success('操作成功');
        closeTabAndRefresh('userList');
        router.push({
          name: 'userList',
        });
      }
    }
  };
  const handlePreview = () => {};

  watch(
    () => activeTab.value,
    (tab) => {
      if (tab === 'roles') {
        roleBindPanelRef.value?.syncSelection?.();
      }
    }
  );
</script>

<style scoped lang="scss">
  .user-add-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    height: 100%;
    :deep(.el-form) {
      height: 100%;
    }
    :deep(.el-tabs__content) {
      flex: 1;
    }
  }
  .user-add-tabs {
    background: transparent;
    flex: 1;
    :deep(.el-tab-pane) {
      height: 100%;
      .card {
        height: 100% !important;
      }
    }
  }
  .type-inline {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    .type-select {
      flex: 1;
      min-width: 0;
    }
    .tooltip-icon {
      font-size: 14px;
      color: #999;
      margin-left: 4px;
      cursor: pointer;
    }
    :deep(.el-radio) {
      margin-right: 0;
    }
  }
  .card-footer {
    background: #fff;
    border-top: 1px solid #f0f0f0;
    flex-shrink: 0;
    padding: 24px 36px;
    z-index: 10;
  }
  .role-panel-placeholder {
    padding: 32px;
    text-align: center;
    color: #999;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
  }
  .required-mark {
    color: var(--el-color-danger);
    margin-right: 4px;
  }
  .password-field {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    :deep(.el-input) {
      width: 100%;
    }
  }
</style>
