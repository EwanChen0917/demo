<template>
  <el-dialog
    title="装箱单发票合同下载记录"
    v-model="visible"
    width="1000px"
    @close="visible = false"
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.contractNoList"
          placeholder="合同协议号(多个可用逗号分隔)"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-date-picker
          v-model="search.createDate"
          type="daterange"
          @change="runQuery"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="报关单创建开始日期"
          end-placeholder="报关单创建结束日期"
          class="w-310px"
        />
      </template>
      <template #buttons>
        <!-- <el-button class="button" type="primary" @click="runQuery">查询</el-button> -->
        <el-button type="primary" :loading="exportLoading" @click="handleExport">导出</el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.resultList"
        row-key="id"
        @selection-change="handleSelectionChange"
        max-height="60vh"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column prop="contractNo" label="合同协议号" />
        <el-table-column prop="createDate" label="创建时间" />
        <el-table-column prop="creatorName" label="创建人" />
        <el-table-column prop="receiptFileList" label="回执文件" min-width="150px">
          <template #default="{ row }">
            <div v-for="(item, index) in row.receiptFileList" :key="index" class="word-text">
              <el-link
                type="primary"
                :underline="false"
                @click="download(item.receiptFilePath, item.name)"
              >
                {{ item.name }}
              </el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '下载报关单',
                  key: 'download',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  disabled: row.creatorName !== userInfo.name,
                  row: row,
                },
              ]"
              @click="handleActions"
            />
            <KeenFileUpload
              v-model="row.receiptFileList"
              :showFileList="false"
              :limit="10"
              :multiple="true"
              accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
              :showOperate="false"
              @success="handleUploadSuccess"
              directory="erp/customsClearance/warehouse"
              ref="uploadRef"
            >
              <el-link type="primary" :underline="false" @click="getData(row)">上传</el-link>
            </KeenFileUpload>
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
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { useRouter } from 'vue-router';
  import { type ErpApi, erpApi } from '@/api/index';
  import { useRequest } from 'vue-request';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import { download, urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';

  const router = useRouter();
  const route = useRoute();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const PAGE_SIZE = 10;
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpCustomsQueryGenerateRecordList.RequestQuery,
    ErpApi.LuteosErpCustomsQueryGenerateRecordList.ResponseBody
  >({
    searchDefaults: {
      contractNoList: undefined,
      createDate: undefined,
      createDateStart: undefined,
      createDateEnd: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { createDate } = searchData;
      return {
        ...omit(searchData, 'createDate'),
        createDateStart: createDate ? createDate[0] : undefined,
        createDateEnd: createDate ? createDate[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpCustomsQueryGenerateRecordList,
    serviceManual: false,
  });

  const visible = ref(false);
  const emits = defineEmits<{
    (success: string);
  }>();
  const open = () => {
    search.contractNoList = '';
    search.createDate = null;
    visible.value = true;
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'download') {
      // 下载报关单
      // download(row.receiptFilePath, row.receiptFileName);
      const res = await erpApi.luteosErpCustomsExportSingleCustomsFile({
        contractNo: row.contractNo,
      });
      if (res) {
        urlDownload(res as string);
      } else {
        ElMessage.error(`文件异常，无法下载`);
      }
    } else if (key === 'upload') {
      // 上传附件
      const param = {
        contractNo: row.contractNo,
        receiptKey: '',
      };
      await erpApi.luteosErpCustomsImportReceipt(param);
    } else if (key === 'delete') {
      // 删除
      const isConfirmed = await swal.confirm('确定要删除吗？');
      if (!isConfirmed) return;
      const res = await erpApi.luteosErpCustomsDeleteOwnSingleCustomsFile({
        contractNo: row.contractNo,
      });
      if (res) {
        ElMessage.success('删除成功');
        emits('success');
        refreshList();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    }
  };
  const contractNo = ref('');
  const id = ref('');
  const getData = (row) => {
    contractNo.value = row.contractNo;
    id.value = row.id;
  };
  // 上传
  const update = ref(true);
  const handleUploadSuccess = async (key) => {
    if (key && update.value) {
      update.value = false;
      const find = listData.value?.resultList?.find((res) => {
        return res.id == id.value;
      });

      if (find) {
        const receiptKeyList = find.receiptFileList.map((item) => {
          return {
            fileName: item.name,
            receiptKey: item.ossKey,
          };
        });
        const param = {
          contractNo: contractNo.value,
          receiptKeyList,
        };

        const res = await erpApi.luteosErpCustomsImportReceipt(param);
        ElMessage.success('上传成功');
        setTimeout(() => {
          update.value = true;
        }, 1000);
        refreshList();
      }
    }
  };
  defineExpose({
    open,
  });
  const tableRef = ref(null);
  const rpaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    rpaCodeList.value = list.map((item) => item.id);
  };
  // 批量导出
  const handleExport = async () => {
    if (rpaCodeList.value.length) {
      const isConfirmed = await swal.confirm('确定要导出吗？');
      if (!isConfirmed) return;
      const { createDate } = search;
      exportRun({
        contractNoList: search.contractNoList ? search.contractNoList : undefined,
        createDateStart: createDate ? createDate[0] : undefined,
        createDateEnd: createDate ? createDate[1] : undefined,
        idList: rpaCodeList.value.length ? rpaCodeList.value : undefined,
        type: 2,
      });
    } else {
      ElMessage.error(`请勾选导出的数据`);
    }
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    // 导出没接口文档
    erpApi.luteosErpCustomsExportBatchCustomsFile,
    {
      manual: true,
      async onSuccess(d) {
        tableRef.value?.clearSelection();
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: d?.appCode,
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
</script>

<style scoped lang="scss">
  .word-text {
    word-break: break-all;
  }
  :deep(.el-link__inner) {
    font-size: 12px;
  }
</style>
