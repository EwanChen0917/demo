<template>
  <KeenList :selected-num="0" :selected-list="selectedList" @resetSearch="handleReset" @refresh="fetchList" @clearAll="handleReset">
    <template #search-actions>
      <el-button type="primary" size="small" @click="openCreate">新增映射</el-button>
    </template>
    <template #filters>
      <DeptCascaderTwoLevel v-model="search.deptId" placeholder="一级组织" :check-strictly="true" style="width: 220px" />
    </template>
    <template #default="{ tableHeight }">
      <el-table v-loading="listLoading" :data="listData" :height="tableHeight">
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column label="一级组织" prop="deptName" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.deptName || '--' }}</template>
        </el-table-column>
        <el-table-column label="部门长" prop="deptOwnerName" min-width="120">
          <template #default="{ row }">{{ row.deptOwnerName || '--' }}</template>
        </el-table-column>
        <el-table-column label="数字化业务代表" prop="bpMemberName" min-width="140">
          <template #default="{ row }">{{ row.bpMemberName || '--' }}</template>
        </el-table-column>
        <el-table-column label="业务中台代表" prop="midPlatformMemberName" min-width="140">
          <template #default="{ row }">{{ row.midPlatformMemberName || '--' }}</template>
        </el-table-column>
        <el-table-column label="数字化BP" prop="bpOwnerName" min-width="120">
          <template #default="{ row }">{{ row.bpOwnerName || '--' }}</template>
        </el-table-column>
        <el-table-column label="业务领域" prop="bizDomainList" min-width="220">
          <template #default="{ row }">
            <template v-if="row.bizDomainList?.length">
              <el-tag v-for="d in row.bizDomainList" :key="d" size="small" style="margin: 2px 4px 2px 0">
                {{ BIZ_DOMAIN_MAP[d] || d }}
              </el-tag>
            </template>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="170" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDisable(row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @current-change="fetchList"
          @size-change="onSizeChange"
        />
      </div>
    </template>
  </KeenList>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogMode === 'edit' ? '编辑组织映射' : '新增组织映射'"
    width="560px"
    align-center
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="一级组织" prop="deptId">
        <DeptCascaderTwoLevel v-model="formDeptIdStr" placeholder="可选一级或二级部门" :check-strictly="true" />
      </el-form-item>
      <el-form-item label="数字化业务代表" prop="bpMember">
        <DeptMember v-model="form.bpMember" placeholder="请选择业务代表" teleported />
      </el-form-item>
      <el-form-item label="业务中台代表" prop="midPlatformMember">
        <DeptMember v-model="form.midPlatformMember" placeholder="请选择业务中台代表" teleported />
      </el-form-item>
      <el-form-item label="数字化BP" prop="bpOwner">
        <DeptMember v-model="form.bpOwner" placeholder="请选择数字化BP" teleported />
      </el-form-item>
      <el-form-item label="业务领域" prop="bizDomainList">
        <el-select v-model="form.bizDomainList" multiple collapse-tags placeholder="请选择业务领域" style="width: 100%" teleported popper-class="dept-mapping-select-popper">
          <el-option v-for="opt in BIZ_DOMAIN_OPTIONS" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="demandLeadDeptMappingList">
  import { computed, reactive, ref, watch } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance } from 'element-plus';
  import KeenList from '@/components/KeenList/index.vue';
  import DeptCascaderTwoLevel from '@/views/lute-os/components/DeptCascaderTwoLevel/index.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import { leadValueApi, type LeadDeptMappingItem, type LeadDeptMappingSaveReq } from '@/api/leadValueApi';

  const BIZ_DOMAIN_OPTIONS = [
    { label: '营销', value: 'marketing' },
    { label: '服务', value: 'service' },
    { label: '产研', value: 'rnd' },
    { label: '供应链', value: 'supply_chain' },
    { label: '财务', value: 'finance' },
    { label: '人力', value: 'hr' },
    { label: '其他', value: 'other' },
  ];
  const BIZ_DOMAIN_MAP: Record<string, string> = Object.fromEntries(
    BIZ_DOMAIN_OPTIONS.map((o) => [o.value, o.label])
  );

  const search = ref<{ deptId: string | null }>({ deptId: null });

  const listData = ref<LeadDeptMappingItem[]>([]);
  const listLoading = ref(false);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const total = ref(0);

  const selectedList = computed(() => {
    const result: Array<{ key: string; label: string; value: string }> = [];
    if (search.value.deptId) result.push({ key: 'deptId', label: '一级组织', value: String(search.value.deptId) });
    return result;
  });

  async function fetchList() {
    listLoading.value = true;
    try {
      const resp = await leadValueApi.deptMappingList({
        deptId: search.value.deptId ? Number(search.value.deptId) : null,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      });
      listData.value = resp?.records || [];
      total.value = resp?.total || 0;
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '加载失败');
    } finally {
      listLoading.value = false;
    }
  }

  function onSizeChange(size: number) {
    pageSize.value = size;
    currentPage.value = 1;
    fetchList();
  }

  function handleReset() {
    search.value = { deptId: null };
    currentPage.value = 1;
    fetchList();
  }

  watch(
    () => search.value.deptId,
    () => {
      currentPage.value = 1;
      fetchList();
    }
  );

  fetchList();

  const dialogVisible = ref(false);
  const dialogMode = ref<'create' | 'edit'>('create');
  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  const form = reactive<LeadDeptMappingSaveReq>({
    id: null,
    deptId: 0,
    bpMember: '',
    midPlatformMember: '',
    bpOwner: '',
    bizDomainList: [],
  });

  const formDeptIdStr = computed({
    get: () => (form.deptId ? String(form.deptId) : null),
    set: (val: string | null) => {
      form.deptId = val ? Number(val) : 0;
    },
  });

  const rules = {
    deptId: [{ required: true, message: '请选择一级组织', trigger: 'change' }],
    bpOwner: [{ required: true, message: '请选择数字化BP', trigger: 'change' }],
  };

  function openCreate() {
    dialogMode.value = 'create';
    form.id = null;
    form.deptId = 0;
    form.bpMember = '';
    form.midPlatformMember = '';
    form.bpOwner = '';
    form.bizDomainList = [];
    dialogVisible.value = true;
  }

  function openEdit(row: LeadDeptMappingItem) {
    dialogMode.value = 'edit';
    form.id = row.id;
    form.deptId = row.deptId;
    form.bpMember = row.bpMember || '';
    form.midPlatformMember = row.midPlatformMember || '';
    form.bpOwner = row.bpOwner || '';
    form.bizDomainList = row.bizDomainList ? [...row.bizDomainList] : [];
    dialogVisible.value = true;
  }

  async function handleSave() {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid) => {
      if (!valid) return;
      saveLoading.value = true;
      try {
        await leadValueApi.deptMappingSave({ ...form });
        ElMessage.success('保存成功');
        dialogVisible.value = false;
        fetchList();
      } catch (err: unknown) {
        ElMessage.error((err as { message?: string })?.message || '保存失败');
      } finally {
        saveLoading.value = false;
      }
    });
  }

  async function handleDisable(row: LeadDeptMappingItem) {
    try {
      await ElMessageBox.confirm(`确认禁用「${row.deptName || row.deptId}」的映射？禁用后列表中将不再展示。`, '禁用确认', {
        confirmButtonText: '确认禁用',
        cancelButtonText: '取消',
        type: 'warning',
      });
    } catch {
      return;
    }
    try {
      await leadValueApi.deptMappingDelete(row.id);
      ElMessage.success('已禁用');
      fetchList();
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '禁用失败');
    }
  }
</script>

<style scoped lang="scss">
  .pagination-bar {
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px;
  }
</style>

<style>
  .dept-mapping-select-popper {
    z-index: 3000 !important;
  }
</style>
