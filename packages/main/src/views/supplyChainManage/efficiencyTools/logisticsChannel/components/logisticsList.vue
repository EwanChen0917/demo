<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
    :selected-num="totalList?.length"
  >
    <template #search>
      <el-select
        v-model="channelType"
        placeholder="物流渠道"
        style="width: 120px"
        @change="changeChannelType"
      >
        <el-option label="物流方式" value="transportId" />
        <el-option label="物流渠道名称" value="channelName" />
        <el-option label="物流渠道编码" value="channelCode" />
        <el-option label="物流商对应渠道名称" value="supplierChannelName" />
        <el-option label="目的国家" value="destCountry" />
      </el-select>
      <template v-if="['transportId', 'destCountry'].includes(channelType)">
        <TransportSelect
          v-if="channelType === 'transportId'"
          v-model="search.firstLogTransport"
          clearable
          class="w-form-item"
        />
        <CountrySelect
          v-if="channelType === 'destCountry'"
          v-model="search.destCountry"
          clearable
          class="w-form-item"
        />
      </template>
      <template v-else>
        <el-input
          v-model="search[channelType]"
          placeholder="批量搜索用空格或','隔开"
          clearable
          class="w-form-item"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
    </template>
    <template #filters>
      <el-select v-model="search.status" class="w-80px" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addChannel">新增</el-button>
      <el-button type="primary" @click="handleImport" :disabled="!props.supplier?.supplierCode">
        渠道批量导入
      </el-button>
      <el-button type="primary" @click="handleExport">渠道报价导出</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      :row-class-name="tableRowClassName"
      :row-key="(row) => row.id"
      @selection-change="handleSelectionChange"
      @row-click="(row) => handleRowClick(row)"
    >
      <el-table-column type="selection" min-width="30" reserve-selection />
      <el-table-column prop="channelCode" label="渠道编码" min-width="100" />
      <el-table-column prop="channelName" label="物流渠道名称" min-width="130">
        <!-- <template #default="{ row }">
          <OverflowTooltip
            :content="row.channelName"
            :line="2"
            :color="currentChannelRow.id === row.id ? 'var(--el-color-primary)' : ''"
          />
        </template> -->
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template #default="{ row }">
          <div style="display: flex; gap: 5px; color: var(--el-color-primary)">
            <span @click.stop="handleEdit(row)">编辑</span>
            <span @click.stop="handleUse(row)">
              {{ row.status === 1 ? '禁用' : '启用' }}
            </span>
            <span @click.stop="logDialogRef.open(row.id)">日志</span>
          </div>
          <!-- <el-dropdown>
            <el-button type="primary" link>
              操作
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleEdit(row)">编辑</el-dropdown-item>
                <el-dropdown-item @click="handleUse(row)">
                  {{ row.status === 1 ? '禁用' : '启用' }}
                </el-dropdown-item>
                <el-dropdown-item @click="logDialogRef.open(row.id)">日志</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      size="small"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <ImportModal
    ref="importRef"
    title="渠道批量导入"
    :supplierCode="props.supplier?.supplierCode"
    @success="refreshList"
  />
  <LogDialog ref="logDialogRef" />
</template>

<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { checkPermission } from '@/utils/permission';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';
  import CountrySelect from '@/components/CountrySelect/index.vue';
  import TransportSelect from './TransportSelect.vue';
  import ImportModal from './ImportModal.vue';
  import LogDialog from './logDialog.vue';

  const props = defineProps<{
    supplier: {
      supplierCode: string;
      supplierName: string;
    };
  }>();
  const emit = defineEmits(['handleRowAction']);
  const router = useRouter();
  const PAGE_SIZE = 10;
  const channelType = ref('transportId');
  const tableRef = ref();
  const currentChannelRow = ref(); // 当前选中的渠道行
  const importRef = ref();
  const logDialogRef = ref();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpLogisticsChannelQueryList.RequestBody,
    ErpApi.LuteosErpLogisticsChannelQueryList.ResponseBody
  >({
    searchDefaults: {
      channelName: undefined,
      channelCode: undefined,
      status: 1,
      firstLogTransport: undefined,
      supplierCode: '',
      destCountry: undefined,
      supplierChannelName: undefined,
    },
    serviceManual: true,
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsChannelQueryList,
    onSuccess: (res) => {
      if (current.value === 1) {
        // 初次请求，有数据则默认选中第一个
        currentChannelRow.value = res?.recordList?.[0] ? { ...res.recordList[0] } : null;
        emit('handleRowAction', currentChannelRow.value, 'detail');
      }
    },
  });

  watch(
    () => props.supplier?.supplierCode,
    (newVal) => {
      if (newVal) {
        search.supplierCode = newVal;
      }
    }
  );
  watch(
    Object.keys(search).map((key) => () => (search as any)[key]),
    () => {
      totalList.value = [];
      tableRef.value?.clearSelection();
    }
  );

  const resetSearchFields = (keepChannelType = false) => {
    Object.keys(search).forEach((key) => {
      if (
        key !== 'supplierCode' &&
        key !== 'status' &&
        (!keepChannelType || key !== channelType.value)
      ) {
        (search as any)[key] = undefined;
      }
    });
  };

  // 切换渠道类型时保留当前类型字段和 status
  const changeChannelType = () => resetSearchFields(true);
  // 重置按钮清空所有非 supplierCode 字段
  const reset = () => resetSearchFields(false);
  // 选中表格行
  const handleRowClick = (row) => {
    if (currentChannelRow.value?.id !== row?.id) {
      currentChannelRow.value = { ...row };
      emit('handleRowAction', row, 'detail');
    }
  };

  const tableRowClassName = ({ row }: { row: any }) => {
    if (row?.id === currentChannelRow.value?.id) {
      return 'select-row';
    }

    return '';
  };
  // 渠道批量导入
  const handleImport = () => {
    importRef.value?.open();
  };
  // 渠道报价导出
  const handleExport = async () => {
    try {
      const confirmed = await swal.confirm('确认导出数据吗？');
      if (!confirmed) return;
      const res = await erpApi.luteosErpLogisticsChannelDownloadSelectTemplate({
        supplierCode: props.supplier.supplierCode,
        channelIds: totalList.value.length ? totalList.value.map((item) => item.id) : undefined,
      });
      if (res) {
        urlDownload(res as string);
        ElMessage.success('导出报价数据成功');
        totalList.value = [];
        tableRef.value?.clearSelection();
      } else {
        ElMessage.error('导出报价数据失败');
      }
    } catch (error) {}
  };
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    // 多选
    totalList.value = list;
  };

  const addChannel = () => {
    currentChannelRow.value = null;
    emit('handleRowAction', null, 'add');
  };

  // 编辑方法
  const handleEdit = (row?: any) => {
    currentChannelRow.value = row;
    emit('handleRowAction', row, 'edit');
  };

  // 启用/禁用方法
  const handleUse = async (row) => {
    const action = row.status === 1 ? '禁用' : '启用';
    const confirmRes = await ElMessageBox.confirm(
      `确认${action}物流渠道【${row.channelName}】吗?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    if (confirmRes) {
      await erpApi.luteosErpLogisticsChannelChangeStatus({ id: row.id, status: 1 - row.status });
      ElMessage.success(`${action}成功`);
      refreshList();
    }
  };

  const noPermission = () => {
    if (!checkPermission('firstChannel') && !checkPermission('selfChannel')) {
      router.push('/404');
    }
  };

  const setTableHeight = () => {
    const dialog = document.querySelector('.el-dialog');
    if (dialog?.querySelector('.el-table')) return;
    requestAnimationFrame(() => {
      const pageContainers = document.getElementsByClassName('logistics-page-container');
      let table;
      if (pageContainers.length > 0) {
        const listContainers = pageContainers[0].getElementsByClassName('list-container');
        if (listContainers.length > 1) {
          table = listContainers[1].getElementsByClassName('el-table')[0];
        }
      }
      if (table) {
        table.setAttribute(
          'style',
          `height: ${Math.max(window.innerHeight - table.getBoundingClientRect().top - 72, 350)}px`
        );
      }
    });
  };

  onMounted(() => {
    noPermission();
    setTableHeight();
    window.addEventListener('resize', setTableHeight);
  });

  onActivated(() => {
    noPermission();
  });
  defineExpose({
    refreshList,
  });
</script>

<style scoped lang="scss">
  .w-form-item {
    // width: 206px;
  }
</style>
