<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="编号/订单号/客户名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 120px"
        v-model="search.creator"
        placeholder="更新人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of creatorList"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        class="button"
        @click="handleAdd"
        type="primary"
        v-permission="'boxSupportToolsChooseOrderPacking'"
      >
        选择订单装箱
      </el-button>

      <el-button
        type="primary"
        v-permission="'boxSupportToolsUploadOrderPackage'"
        @click="uploadOrderPackage"
        class="import-btn"
      >
        上传订单装箱
      </el-button>
      <ExportBtn
        :service="erpApi.luteosErpPackageDownloadList"
        :params="{
          ...search,
          downLoadSync: true,
          pageNum: pagination.current.value,
          pageSize: pagination.pageSize.value,
        }"
        :plain="false"
      >
        导出
      </ExportBtn>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.orderList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column :width="50" label="序号">
        <template #default="{ $index }">
          {{ pageSize * (current - 1) + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column :width="140" prop="recordCode" label="编号" />
      <el-table-column :width="240" prop="recordName" label="自定义名称" />
      <el-table-column prop="typeDesc" label="类型" />
      <el-table-column prop="referenceCode" label="参考单号" :min-width="240" />
      <el-table-column :width="240" prop="orderCodeList" label="订单号">
        <template #default="{ row }">
          <template v-if="row?.orderCodeList?.length">
            <div v-for="item in row.orderCodeList" :key="item">
              {{ item }}
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="hasPackageFileDesc" label="装箱单文件" />
      <el-table-column prop="hasPackageMarkDesc" label="箱唛文件" />
      <el-table-column prop="hasPalletFileDesc" label="打托单文件" />
      <el-table-column prop="hasPalletMarkDesc" label="托唛文件" />
      <el-table-column prop="hasBolFileDesc" label="BOL（提单）文件" />
      <el-table-column prop="hasOperationPackageDesc" label="运营装箱单" />
      <el-table-column prop="hasInboundDesc" label="入库单" />
      <el-table-column prop="creatorName" label="更新人" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" fixed="right" min-width="120px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
                packageType: row.type,
                permissionCode: 'boxSupportToolsDetail',
              },
              {
                label: '编辑',
                key: 'update',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
                packageType: row.type,
                permissionCode: 'boxSupportToolsUpdate',
              },
              {
                label: '编辑自定义名称',
                key: 'coustomName',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
                recordName: row.recordName,
                permissionCode: 'boxSupportToolsCoustomName',
              },
              {
                label: '下载文件',
                key: 'downloadFile',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
                permissionCode: 'boxSupportToolsDownloadFile',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'primary',
                text: true,
                recordCode: row.recordCode,
                permissionCode: 'boxSupportToolsDelete',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="logistics_config_import"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @close="batchUpdate"
    @get-custom-template="getTemplate"
    @custom-upload="customUpload"
  />
  <SelectOrderDialog :visible="visible" @close="closeDialog" />
  <UploadOrderPackageDialog :visible="uploadOrderPackageVisible" @close="closeDialog" />
</template>

<script lang="ts" setup name="boxSupportTools">
  import { ElMessage, ElMessageBox, ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi, memberApi } from '@/api/index';
  import { urlDownload } from '@/utils/download';
  import SelectOrderDialog from '@/views/productTools/logisticsTools/boxSupportTools/components/SelectOrderDialog/index.vue';
  import UploadOrderPackageDialog from '@/views/productTools/logisticsTools/boxSupportTools/components/UploadOrderPackageDialog/index.vue';
  import { useCache } from '@/hooks/web/useCache';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';

  onMounted(() => {
    getCreatorList();
  });
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const uploadVisible = ref(false);
  const visible = ref(false);
  const uploadOrderPackageVisible = ref(false);
  const creatorList: any = ref([]);
  const router = useRouter();
  const {
    search,
    // searchData,
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
    refreshList,
    resetSearch,
    runQuery,
    pagination,
  } = useList<
    ErpApi.LuteosErpPackageQueryList.RequestBody,
    ErpApi.LuteosErpPackageQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      creator: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPackageQueryList,
  });
  const { wsCache } = useCache('localStorage');
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const handleAdd = () => {
    visible.value = true;
  };
  const closeDialog = (reload: boolean | { path: string; query: any }) => {
    if (typeof reload === 'boolean' && reload) {
      refreshList();
    }
    uploadOrderPackageVisible.value = false;
    visible.value = false;
    if (typeof reload === 'object') {
      // 关闭弹窗后跳转到指定页面
      setTimeout(() => router.push(reload), 300);
    }
  };
  const batchUpdate = (reload: boolean) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };
  const handleActions = (operate: {
    key: 'view' | 'update' | 'delete' | 'coustomName' | 'downloadFile';
    recordCode: string;
    recordName?: string;
    packageType: 1 | 2;
  }) => {
    const { key, recordCode, recordName, packageType } = operate;
    switch (key) {
      case 'delete':
        ElMessageBox.confirm('确定删除此项数据吗？', '提示', {
          type: 'warning',
        }).then(() => {
          sureDelete(recordCode);
        });
        break;
      case 'downloadFile':
        downloadFileFn(recordCode);
        break;
      case 'coustomName':
        changeCoustomName(recordCode, recordName ?? '');
        break;

      case 'update':
        wsCache.set('recordCode', recordCode);
        wsCache.set('packageType', packageType);
        router.push({
          path:
            packageType === 1
              ? '/boxSupportTools/selectOrderPacking'
              : '/boxSupportTools/combinePack',
          query: { recordCode, packageType, viewType: 'update' },
        });
        break;
      case 'view':
        router.push({
          path:
            packageType === 1
              ? '/boxSupportTools/selectOrderPacking'
              : '/boxSupportTools/combinePack',
          query: { recordCode, packageType, viewType: 'view' },
        });
        break;
      default:
        break;
    }
  };
  const changeCoustomName = (recordCode: string, recordName: string) => {
    ElMessageBox.prompt(`箱单文件编码为：${recordName}，请填写自定义名称`, '提示', {
      inputValue: '',
      inputPlaceholder: '请输入自定义名称',
    }).then(async (res) => {
      const { value } = res;
      if (value) {
        await erpApi.luteosErpPackageUpdatePalletPackageName({
          recordCode,
          recordName: value,
        });
        ElMessage.success('修改成功');
        refreshList();
      }
    });
  };
  const downloadFileFn = async (recordCode: string) => {
    const res = await erpApi.luteosErpPackageDownloadZipFile({
      recordCode,
    });
    if (res.appCode) {
      const isConfirmed = await swal.confirm({
        title: '提交成功，具体请前往下载中心查看',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
      });
      if (!isConfirmed) return;
      openWindow('/downloadmanage');
    }
  };
  const sureDelete = async (recordCode: string) => {
    const res = await erpApi.luteosErpPackageDeleteZipPackage({
      recordCode,
    });
    if (res) {
      ElMessage.success('删除成功');
      refreshList();
    }
  };
  const getTemplate = async () => {
    const res = await erpApi.luteosErpBaseLogisticsConfigImportTemplateUrl();
    urlDownload(res as string);
  };
  const customUpload = async (fileList: any[]) => {
    const res = await erpApi.luteosErpBaseLogisticsConfigImport({
      fileName: fileList[0].name,
      ossKey: fileList[0].ossKey,
    });
    if (res) {
      refreshList();
      uploadVisible.value = false;
      ElMessage.success('导入成功');
    }
  };
  const uploadOrderPackage = () => {
    uploadOrderPackageVisible.value = true;
  };
</script>

<style scoped lang="scss"></style>
