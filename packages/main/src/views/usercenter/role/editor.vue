<template>
  <div class="role-editor">
    <div class="header">
      <div class="title">
        {{ pageTitle }}
        <!-- <span v-if="roleCode && mode !== 'copy'" class="code">#{{ roleCode }}</span> -->
      </div>
    </div>

    <div class="content">
      <BaseForm ref="baseFormRef" :form="form" :rules="rules" />

      <PermissionSettings
        ref="permissionRef"
        :platform-list="platformList"
        :platform-loading="platformLoading"
        :selected-platform-list="selectedPlatformList"
        :active-platform="activePlatform"
        :menu-tree="menuTree"
        :menu-loading="menuLoading"
        :tree-props="treeProps"
        :platform-indeterminate="platformIndeterminate"
        :find-platform-desc="findPlatformDesc"
        @toggle-platform="togglePlatform"
        @platform-check="handlePlatformCheck"
        @tree-check="handleTreeCheck"
        @refresh-tree="refreshTree"
      />

      <UpdateLogs
        :logs="updateLogs"
        :loading="logsLoading"
        :has-more="logHasMore"
        :loading-more="logLoadingMore"
        :page="logPage"
        :page-size="logPageSize"
        @load-more="loadMoreLogs"
      />
    </div>
    <div class="footer-actions">
      <el-button @click="goBack">返回列表</el-button>
      <el-button type="primary" :loading="saving" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="roleCopy">
  import { ElMessage } from 'element-plus';
  import { castArray, isEmpty, isNil } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import dayjs from 'dayjs';
  import BaseForm from './components/BaseForm.vue';
  import PermissionSettings from './components/PermissionSettings.vue';
  import UpdateLogs from './components/UpdateLogs.vue';
  import {
    fetchPlatformList,
    fetchRoleMenu,
    fetchRoleDetail,
    fetchUpdateLogs,
    saveRoleMenuV2,
  } from './api';

  const router = useRouter();
  const route = useRoute();

  const mode = computed(() => {
    if (route.name === 'roleCopy') return 'copy';
    if (route.name === 'roleAdd') return 'add';
    return 'edit';
  });
  const roleCode = computed(() => (route.query.roleCode ? String(route.query.roleCode) : ''));

  const pageTitle = computed(() => {
    if (mode.value === 'add') return '新增角色';
    if (mode.value === 'copy') return '复制角色';
    return '编辑角色';
  });

  const baseFormRef = ref();
  const formRef = computed(() => baseFormRef.value?.formRef);
  const form = reactive({
    roleName: '',
    desc: '',
  });
  const rules = {
    roleName: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => {
          if (value && value.length > 50) callback(new Error('最多50个字符'));
          else callback();
        },
        trigger: 'blur',
      },
    ],
    desc: [
      { required: true, message: '请输入角色说明', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => {
          if (value && value.length > 200) callback(new Error('最多200个字符'));
          else callback();
        },
        trigger: 'blur',
      },
    ],
  };

  const platformLoading = ref(false);
  const platformList = ref([]);
  const selectedPlatformList = ref([]);
  const activePlatform = ref('');

  const menuTreeByPlatform = reactive({});
  const checkedKeysByPlatform = reactive({});
  const originCheckedKeysByPlatform = reactive({});
  const menuNameMapByPlatform = reactive({});
  const platformForceAllChecked = reactive({});
  const permissionRef = ref();
  const treeRef = computed(() => permissionRef.value?.treeRef);
  const menuLoading = ref(false);
  const isApplyingTreeChecked = ref(false);

  const updateLogs = ref([]);
  const logsLoading = ref(false);
  const logPage = ref(1);
  const logPageSize = ref(10);
  const logHasMore = ref(true);
  const logLoadingMore = ref(false);
  const saving = ref(false);

  const treeProps = {
    label: 'name',
    children: 'children',
  };

  const menuTree = computed(() => {
    return menuTreeByPlatform[activePlatform.value] || [];
  });

  const collectLeafMenuCodes = (nodes = [], acc = []) => {
    nodes.forEach((item) => {
      if (item.children && item.children.length) {
        collectLeafMenuCodes(item.children, acc);
      } else if (item.menuCode) {
        acc.push(item.menuCode);
      }
    });
    return acc;
  };

  const getLeafCodesByPlatform = (platform) => {
    return collectLeafMenuCodes(menuTreeByPlatform[platform] || []);
  };
  const getLeafCheckedKeys = (platform) => {
    const leafSet = new Set(getLeafCodesByPlatform(platform));
    return (checkedKeysByPlatform[platform] || []).filter((key) => leafSet.has(key));
  };

  const getCheckedLeafCount = (platform, leafCodes = getLeafCodesByPlatform(platform)) => {
    const checkedSet = new Set(checkedKeysByPlatform[platform] || []);
    return leafCodes.reduce((sum, code) => (checkedSet.has(code) ? sum + 1 : sum), 0);
  };

  const platformIndeterminate = (platform) => {
    if (!selectedPlatformList.value.includes(platform)) return false;
    const leafCodes = getLeafCodesByPlatform(platform);
    if (!leafCodes.length) return false;
    const checkedLeafCount = getCheckedLeafCount(platform, leafCodes);
    return checkedLeafCount > 0 && checkedLeafCount < leafCodes.length;
  };

  const applyCheckedKeysToTree = (keys) => {
    if (!treeRef.value) return;
    isApplyingTreeChecked.value = true;
    nextTick(() => {
      treeRef.value?.setCheckedKeys(keys, false);
      isApplyingTreeChecked.value = false;
    });
  };

  const setPlatformAllChecked = (platform) => {
    const leafCodes = getLeafCodesByPlatform(platform);
    checkedKeysByPlatform[platform] = leafCodes.length ? [...leafCodes] : [];
    if (activePlatform.value === platform) {
      if (treeRef.value) {
        applyCheckedKeysToTree(checkedKeysByPlatform[platform]);
      } else {
        nextTick(() => {
          applyCheckedKeysToTree(checkedKeysByPlatform[platform]);
        });
      }
    }
  };

  const findPlatformDesc = (platform) => {
    const target = platformList.value.find((item) => item.value === platform);
    return target?.desc || platform || '--';
  };

  const goBack = () => {
    router.push('/role');
  };

  const loadPlatformList = async () => {
    platformLoading.value = true;
    try {
      const list = await fetchPlatformList();
      platformList.value = (list || []).map((item) => ({
        ...item,
        value: item?.value ?? item?.platform ?? '',
        desc: item?.desc ?? item?.platformDesc ?? item?.label ?? item?.name ?? '',
      }));
      if (
        mode.value === 'add' &&
        !selectedPlatformList.value.length &&
        platformList.value.length &&
        !activePlatform.value
      ) {
        activePlatform.value = platformList.value[0].value;
      }
    } finally {
      platformLoading.value = false;
    }
  };

  const loadRoleDetail = async () => {
    if (!roleCode.value || mode.value === 'add') return;
    const detail = await fetchRoleDetail(roleCode.value);
    form.roleName = mode.value === 'copy' ? `${detail.roleName || ''}_副本` : detail.roleName || '';
    form.desc = detail.desc || '';
    const normalizePlatformValue = (item) => {
      if (isNil(item)) return '';
      if (typeof item === 'string') return item;
      return item?.platform ?? item?.value ?? '';
    };
    const platformListRaw = castArray(detail.selectedPlatformList || detail.platformList || []);
    const platformListFromDetail = platformListRaw
      .map((item) => normalizePlatformValue(item))
      .filter((item) => !isNil(item) && item !== '');
    const fallbackPlatform = normalizePlatformValue(detail.platform);
    const nextPlatforms = !isEmpty(platformListFromDetail)
      ? platformListFromDetail
      : isEmpty(fallbackPlatform)
      ? []
      : [fallbackPlatform];
    if (!isEmpty(nextPlatforms)) {
      selectedPlatformList.value = nextPlatforms;
      activePlatform.value = nextPlatforms[0];
    } else {
      activePlatform.value = '';
    }
    const platformKey = detail?.platform || activePlatform.value;
    if (!isEmpty(detail?.menuList) && platformKey) {
      menuTreeByPlatform[platformKey] = detail.menuList || [];
      checkedKeysByPlatform[platformKey] = detail?.checkedMenuList
        ? [...detail.checkedMenuList]
        : [];
      originCheckedKeysByPlatform[platformKey] = detail?.checkedMenuList
        ? [...detail.checkedMenuList]
        : [];
      menuNameMapByPlatform[platformKey] = buildMenuNameMap(menuTreeByPlatform[platformKey]);
    }
  };

  const ensureTreeChecked = () => {
    nextTick(() => {
      if (!treeRef.value || !activePlatform.value) return;
      const keys = getLeafCheckedKeys(activePlatform.value);
      applyCheckedKeysToTree(keys);
    });
  };

  const applyMenuResult = (platform, res) => {
    menuTreeByPlatform[platform] = res?.menuList || [];
    checkedKeysByPlatform[platform] = res?.checkedMenuList ? [...res.checkedMenuList] : [];
    originCheckedKeysByPlatform[platform] = res?.checkedMenuList ? [...res.checkedMenuList] : [];
    menuNameMapByPlatform[platform] = buildMenuNameMap(menuTreeByPlatform[platform]);
  };

  const loadMenuTree = async (platform, { force } = { force: false }) => {
    if (!platform) return;
    if (menuTreeByPlatform[platform] && !force) {
      const shouldForceAll = !!platformForceAllChecked[platform];
      if (shouldForceAll) {
        setPlatformAllChecked(platform);
        delete platformForceAllChecked[platform];
      }
      if (!shouldForceAll) {
        ensureTreeChecked();
      }
      syncPlatformSelection(platform);
      return;
    }
    menuLoading.value = true;
    try {
      const res = await fetchRoleMenu({
        platform,
        roleCode: roleCode.value,
        isNew: mode.value === 'add',
      });
      applyMenuResult(platform, res);
      const shouldForceAll = !!platformForceAllChecked[platform];
      if (shouldForceAll) {
        setPlatformAllChecked(platform);
        delete platformForceAllChecked[platform];
      } else {
        ensureTreeChecked();
      }
      syncPlatformSelection(platform);
    } finally {
      menuLoading.value = false;
    }
  };

  const ensureSelectedPlatformMenusLoaded = async () => {
    const pending = selectedPlatformList.value.filter((platform) => !menuTreeByPlatform[platform]);
    if (!pending.length) return;
    const currentActive = activePlatform.value;
    for (const platform of pending) {
      const res = await fetchRoleMenu({
        platform,
        roleCode: roleCode.value,
        isNew: mode.value === 'add',
      });
      applyMenuResult(platform, res);
    }
    activePlatform.value = currentActive;
  };

  const persistCurrentChecked = () => {
    if (!treeRef.value || !activePlatform.value) return;
    const checked = treeRef.value.getCheckedKeys();
    const half = treeRef.value.getHalfCheckedKeys();
    checkedKeysByPlatform[activePlatform.value] = Array.from(new Set([...checked, ...half]));
  };

  const togglePlatform = (platform) => {
    if (!platform) return;
    permissionInteracted.value = true;
    persistCurrentChecked();
    activePlatform.value = platform;
    loadMenuTree(platform);
  };

  const syncPlatformSelection = (platform) => {
    const leafCodes = getLeafCodesByPlatform(platform);
    if (!leafCodes.length) return;
    const checkedLeafCount = getCheckedLeafCount(platform, leafCodes);
    const alreadySelected = selectedPlatformList.value.includes(platform);
    if (checkedLeafCount === 0 && alreadySelected) {
      selectedPlatformList.value = selectedPlatformList.value.filter((item) => item !== platform);
    } else if (checkedLeafCount > 0 && !alreadySelected) {
      selectedPlatformList.value.push(platform);
    }
  };

  const handlePlatformCheck = (platform, checked) => {
    permissionInteracted.value = true;
    if (checked) {
      if (!selectedPlatformList.value.includes(platform)) {
        selectedPlatformList.value.push(platform);
      }
      platformForceAllChecked[platform] = true;
      activePlatform.value = platform;
      loadMenuTree(platform);
    } else {
      // 仅移除选中状态，不切换焦点平台，保留缓存以便快速恢复
      persistCurrentChecked();
      selectedPlatformList.value = selectedPlatformList.value.filter((item) => item !== platform);
      checkedKeysByPlatform[platform] = [];
      if (activePlatform.value === platform && treeRef.value) {
        nextTick(() => {
          treeRef.value?.setCheckedKeys([], false);
        });
      }
    }
  };

  const handleTreeCheck = () => {
    if (!activePlatform.value || !treeRef.value || isApplyingTreeChecked.value) return;
    permissionInteracted.value = true;
    const checked = treeRef.value.getCheckedKeys();
    const half = treeRef.value.getHalfCheckedKeys();
    checkedKeysByPlatform[activePlatform.value] = Array.from(new Set([...checked, ...half]));
    syncPlatformSelection(activePlatform.value);
  };

  const refreshTree = () => {
    if (!activePlatform.value) return;
    loadMenuTree(activePlatform.value, { force: true });
  };

  const buildMenuNameMap = (nodes = [], acc = {}) => {
    nodes.forEach((item) => {
      if (item.menuCode) acc[item.menuCode] = item.name || item.menuCode;
      if (item.children && item.children.length) {
        buildMenuNameMap(item.children, acc);
      }
    });
    return acc;
  };

  const loadLogs = async ({ reset } = { reset: true }) => {
    if (reset) {
      logPage.value = 1;
      logHasMore.value = true;
      updateLogs.value = [];
      logsLoading.value = true;
    } else {
      logLoadingMore.value = true;
    }
    try {
      const res = await fetchUpdateLogs({
        page: logPage.value,
        pageSize: logPageSize.value,
        roleCode: roleCode.value || undefined,
      });
      const list = Array.isArray(res) ? res : res?.list || [];
      const total = typeof res?.total === 'number' ? res.total : undefined;
      const hasMore =
        typeof res?.hasMore === 'boolean'
          ? res.hasMore
          : total != null
          ? logPage.value * logPageSize.value < total
          : list.length >= logPageSize.value;
      updateLogs.value = reset ? list : [...updateLogs.value, ...list];
      logHasMore.value = hasMore;
    } finally {
      logsLoading.value = false;
      logLoadingMore.value = false;
    }
  };

  const loadMoreLogs = async () => {
    if (!logHasMore.value || logLoadingMore.value) return;
    logPage.value += 1;
    await loadLogs({ reset: false });
  };

  const validateEmptyRole = () => {
    if (!selectedPlatformList.value.length) return false;
    const total = selectedPlatformList.value.reduce((sum, platform) => {
      const keys = checkedKeysByPlatform[platform] || [];
      return sum + keys.length;
    }, 0);
    return total === 0;
  };

  const emptyWarned = ref(false);
  const emptyCheckReady = ref(false);
  const permissionInteracted = ref(false);
  watchEffect(() => {
    if (
      !emptyCheckReady.value ||
      !permissionInteracted.value ||
      platformLoading.value ||
      menuLoading.value
    )
      return;
    const availablePlatforms = platformList.value.map((item) => item.value);
    const selectedPlatforms = selectedPlatformList.value;
    const totalChecked = selectedPlatforms.reduce((sum, platform) => {
      const keys = checkedKeysByPlatform[platform] || [];
      return sum + keys.length;
    }, 0);

    const allPlatformsUnchecked = availablePlatforms.length > 0 && selectedPlatforms.length === 0;
    const hasSelectedButEmpty = selectedPlatforms.length > 0 && totalChecked === 0;
    const shouldWarn = allPlatformsUnchecked || hasSelectedButEmpty;

    if (shouldWarn && !emptyWarned.value) {
      ElMessage.warning(
        `您创建的角色「${form.roleName || '未命名角色'}」还未关联任何页面权限，请确认是否需要空角色`
      );
      emptyWarned.value = true;
    }

    if (!shouldWarn) {
      emptyWarned.value = false;
    }
  });

  const getDiffByPlatform = () => {
    const results = [];
    const platformListCopy = [...selectedPlatformList.value];
    platformListCopy.forEach((platform) => {
      const origin = new Set(originCheckedKeysByPlatform[platform] || []);
      const current = new Set(checkedKeysByPlatform[platform] || []);
      const added = [];
      const removed = [];
      current.forEach((item) => {
        if (!origin.has(item)) added.push(item);
      });
      origin.forEach((item) => {
        if (!current.has(item)) removed.push(item);
      });
      results.push({
        platform,
        added,
        removed,
      });
    });
    return results;
  };

  const formatLogTags = (platform, codes = []) => {
    const nameMap = menuNameMapByPlatform[platform] || {};
    const platformLabel = findPlatformDesc(platform);
    return codes.map((code) => `【${platformLabel}-${nameMap[code] || code}】`);
  };

  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => false);
    if (!valid) return;
    persistCurrentChecked();
    await ensureSelectedPlatformMenusLoaded();
    if (!selectedPlatformList.value.length) {
      const confirmed = await swal.confirm(
        `您还未选择任何平台，将创建一个未关联平台的角色，确认继续吗？`
      );
      if (!confirmed) return;
    } else if (validateEmptyRole()) {
      const confirmed = await swal.confirm(
        `您创建的角色「${
          form.roleName || '未命名角色'
        }」还未关联任何页面权限，确定要创建一个空角色吗？`
      );
      if (!confirmed) return;
    }
    saving.value = true;
    try {
      const diffs = getDiffByPlatform();
      const platformCheckedMenuList = selectedPlatformList.value.map((platform) => ({
        platform,
        checkedMenuList: checkedKeysByPlatform[platform] || [],
      }));
      const res = await saveRoleMenuV2({
        roleCode: mode.value === 'edit' ? roleCode.value : undefined,
        srcRoleCode: mode.value === 'copy' ? roleCode.value : undefined,
        roleName: form.roleName,
        desc: form.desc,
        platformCheckedMenuList,
      });
      const targetRoleCode = mode.value === 'edit' ? roleCode.value : res?.roleCode || '';
      platformCheckedMenuList.forEach(({ platform, checkedMenuList }) => {
        originCheckedKeysByPlatform[platform] = [...checkedMenuList];
      });
      if (diffs.length) {
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const logEntry = {
          time: now,
          operator: '当前用户',
          avatar: '',
          added: diffs.flatMap((item) => formatLogTags(item.platform, item.added)),
          removed: diffs.flatMap((item) => formatLogTags(item.platform, item.removed)),
        };
        updateLogs.value = [logEntry, ...updateLogs.value].slice(0, 100);
      }
      ElMessage.success('保存成功');
      router.push('/role');
    } catch (err) {
      // ElMessage.error('保存失败，请稍后重试');
    } finally {
      saving.value = false;
    }
  };

  const init = async () => {
    if (mode.value === 'edit') {
      loadLogs();
    }
    await loadPlatformList();
    await loadRoleDetail();
    if (activePlatform.value) {
      await loadMenuTree(activePlatform.value);
    }
    await ensureSelectedPlatformMenusLoaded();
    emptyCheckReady.value = true;
  };

  onMounted(() => {
    init();
  });
</script>

<style scoped lang="scss">
  .role-editor {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 24px;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-top: 4px;
      .title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;

        .code {
          color: var(--el-color-info);
          font-size: 13px;
        }
      }
    }

    .content {
      display: grid;
      grid-template-columns: 380px 1fr 380px;
      gap: 12px;
      height: 100%;
      min-height: 0;
    }

    .column {
      background: #fff;
      border: 1px solid #ebeef5;
      border-radius: 8px;
      padding: 12px 12px 16px;
      min-height: 600px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }

    .section-title {
      font-weight: 600;
      margin-bottom: 12px;
    }
    .footer-actions {
      margin-top: auto;
      display: flex;
      align-items: center;
      padding-bottom: 12px;
    }
  }
</style>
