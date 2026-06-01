<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="供应商名称/供应商编号/SKU/PO单/需求提货批号/供应商提货批号"
        clearable
        style="width: 450px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间开始"
        end-placeholder="创建时间结束"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (val) => {
            search.startCreateTime = val?.[0] ?? undefined;
            search.endCreateTime =
              dayjs(val?.[1]).endOf('D').format('YYYY-MM-DD HH:mm:ss') ?? undefined;
          }
        "
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option
          v-for="(label, value) in PoOrderStatusMap"
          :key="value"
          :label="label"
          :value="value"
        />
      </el-select>
    </template>

    <template #buttons>
      <el-button type="primary" @click="importRef.open()" class="import-btn">导入</el-button>
      <el-button type="primary" @click="router.push('/pickupPlan/add')">新增</el-button>
      <ExportBtn
        :service="erpApi.luteosErpPlanPickupExportFile"
        :params="{
          ...search,
          startCreateTime: time && time[0] ? time[0] : undefined,
          endCreateTime:
            time && time[1] ? dayjs(time[1]).endOf('D').format('YYYY-MM-DD HH:mm:ss') : undefined,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column prop="supplierPickupCode" label="供应商提货批号" min-width="130" fixed />
      <el-table-column prop="supplierCode" label="供应商编码" min-width="100" />
      <el-table-column prop="supplierName" label="供应商名称" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row.supplierName" :line="2" />
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" label="状态" min-width="110">
        <template #default="{ row }">
          <Tag v-if="row.status" :color="statusColor[row.status]">
            {{ PoOrderStatusMap[row.status] }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="需求关联PO" min-width="150">
        <template #default="{ row }">
          <OverflowTooltip :content="row.orderNumber" :line="2" />
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" label="需求关联SKU" min-width="120" />
      <el-table-column prop="requireQuantity" label="需求总数量" min-width="100" />
      <el-table-column prop="replyQuantity" label="回复总数量" min-width="100" />
      <el-table-column prop="replySentQuantity" label="回复已发总数量" min-width="120" />
      <el-table-column prop="replyNotSentQuantity" label="回复未发总数量" min-width="120" />
      <el-table-column prop="creatorName" label="创建人" min-width="100" />
      <el-table-column prop="createTime" label="创建时间" min-width="120" />
      <el-table-column prop="updaterName" label="修改人" min-width="100" />
      <el-table-column prop="updateTime" label="修改时间" min-width="120" />
      <el-table-column prop="code" label="计划提货批号" min-width="130" fixed="right">
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="
              () => {
                router.push(
                  `/pickupPlan/allDetail?planCode=${row.code}&supplierCode=${row.supplierCode}`
                );
              }
            "
          >
            {{ row?.code }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row,
              },
              // {
              //   label: '编辑',
              //   key: 'edit',
              //   type: 'primary',
              //   hide: row.status !== '0',
              //   row,
              // },
              {
                label: '推送供应商',
                key: 'push',
                type: 'primary',
                hide: row.status !== '0',
                row,
              },
              // {
              //   label: '计划确认',
              //   key: 'planConfirm',
              //   type: 'primary',
              //   hide: row.status !== '2', // 待采购确认
              //   row,
              // },
              {
                label: '关闭',
                key: 'close',
                type: 'danger',
                hide: !['2', '3'].includes(row.status),
                row,
                permissionCode: 'pickupClose',
              },
              {
                label: '删除',
                key: 'delete',
                type: 'error',
                hide: row.status !== '0',
                row,
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
  <ImportDialog ref="importRef" />
  <!-- <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @get-custom-template="getCustomTemplate"
    @close="close"
    @custom-upload="customUpload"
  /> -->
</template>

<script setup lang="ts" name="pickupPlan">
  import { ref } from 'vue';
  import { ElTable as ElTableType } from 'element-plus';
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import dayjs from 'dayjs';
  import ImportDialog from './components/importDialog.vue';
  import { PoOrderStatusMap } from './enum';

  const statusColor = {
    '0': 'gray',
    '1': 'yellow',
    '2': 'yellow',
    '3': 'green',
    '4': 'red',
  };

  const router = useRouter();
  const PAGE_SIZE = 10;
  const time = ref<any>([]);

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const importRef = ref();

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
    ErpApi.LuteosErpPlanPickupQueryList.RequestQuery,
    ErpApi.LuteosErpPlanPickupQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: undefined,
      startCreateTime: undefined,
      endCreateTime: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanPickupQueryList,
  });

  const reset = () => {
    time.value = [];
    resetSearch();
  };
  const handleActions = async ({ key, row }) => {
    switch (key) {
      case 'push':
      case 'delete':
        if (key === 'delete') {
          const isConfirmed = await swal.confirm(`确定要删除数据吗？`);
          if (!isConfirmed) return;
          await erpApi.luteosErpPlanPickupDelete({
            itemId: row.itemId,
          });
          refreshList();
        }
        if (key === 'push') {
          const isSendRelation = await swal.confirm({
            title: '是否推送该提货批号所关联的PO单？',
            confirmButtonText: '是',
            cancelButtonText: '否',
          });

          await erpApi.luteosErpPlanPickupPushSupplier({
            itemId: row.itemId,
            isSendRelation,
            supplierPickupCodeList: [row.supplierPickupCode],
          });
          refreshList();
        }
        break;
      case 'detail':
      case 'planConfirm':
        router.push(
          `/pickupPlan/detail?itemId=${row.itemId}&status=${row.status}&supplierPickupCode=${row.supplierPickupCode}`
        );
        break;
      case 'close':
        const isConfirmed = await swal.confirm(`确定要关闭该提货批号吗？`);
        if (!isConfirmed) return;
        await erpApi.luteosErpPlanPickupClose({
          itemId: row.itemId,
        });
        refreshList();

        break;
      default:
        break;
    }
  };
</script>

<style scoped lang="scss">
  .quantity-error {
    position: absolute;
    left: 12px;
    bottom: -10px;
  }
  .question-icon {
    width: 15px;
    height: 15px;
    margin-left: 2px;
    color: var(--bs-success);
  }
</style>
