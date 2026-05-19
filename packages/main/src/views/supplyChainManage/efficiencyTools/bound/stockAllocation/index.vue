<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="handleReset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input style="width: 280px" v-model="search.allotCode" placeholder="库存分配单号">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 400px"
        v-model="search.warehouseCodes"
        placeholder="仓库"
        filterable
        clearable
        collapse-tags
        collapse-tags-tooltip
        :max-collapse-tags="1"
        multiple
        :teleported="false"
      >
        <el-option
          v-for="person of warehouseMap"
          :key="person.warehouseCode"
          :label="person.warehouseName"
          :value="person.warehouseCode"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.inPoolCode"
        placeholder="调入分配池"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of poolMap"
          :key="person.poolCode"
          :label="`${person.poolName}-${person.poolCode}`"
          :value="person.poolCode"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.outPoolCode"
        placeholder="调出分配池"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of poolMap"
          :key="person.poolCode"
          :label="`${person.poolName}-${person.poolCode}`"
          :value="person.poolCode"
        />
      </el-select>
      <el-select
        style="width: 200px"
        v-model="search.creators"
        placeholder="创建人"
        filterable
        multiple
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of memberList"
          :key="person.memberCode"
          :label="person.name"
          :value="person.memberCode"
        />
      </el-select>

      <el-date-picker
        class="w-180"
        v-model="createTime"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间-开始"
        end-placeholder="创建时间-结束"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        :default-time="[new Date(0, 0, 0), new Date(0, 0, 0)]"
        @change="handleTimeChange"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增库存分配单</el-button>
    </template>
    <vxe-table
      max-height="800px"
      border="inner"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="allotCode" title="库存分配单号" min-width="250" />
      <vxe-column field="warehouseName" title="仓库" min-width="250" />
      <vxe-column field="outPoolName" title="调出分配池" min-width="250">
        <template #default="{ row }">{{ row.outPoolName }} - {{ row.outPoolCode }}</template>
      </vxe-column>
      <vxe-column field="inPoolName" title="调入分配池" min-width="250">
        <template #default="{ row }">{{ row.inPoolName }} - {{ row.inPoolCode }}</template>
      </vxe-column>
      <vxe-column field="remark" title="备注" min-width="190">
        <template #default="{ row }">
          <OverflowTooltip :content="row.remark" :line="2" />
        </template>
      </vxe-column>
      <vxe-column field="creatorName" title="创建人" min-width="120" />
      <vxe-column title="创建时间" min-width="200">
        <template #default="{ row }">
          {{ row.createTime ? dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
        </template>
      </vxe-column>
      <vxe-column title="操作" min-width="100" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
</template>

<script lang="ts" setup name="stockAllocationOrder">
  import { omsApi, OmsApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import dayjs from 'dayjs';
  import { useOmsBase } from '../hooks/useOmsBase';
  import BoundSelect from '../components/boundSelect.vue';

  const { memberList, initMember, getPoolMap, poolMap, warehouseMap, getWarehouseMap } =
    useOmsBase();
  const createTime = ref([]);
  const router = useRouter();
  const PAGE_SIZE = 10;
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    OmsApi.OmsInventoryAllotQueryList.RequestBody,
    OmsApi.OmsInventoryAllotQueryList.ResponseBody
  >({
    searchDefaults: {
      allotCode: undefined,
      creators: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
      inPoolCode: undefined,
      outPoolCode: undefined,
      warehouseCodes: undefined,
    },
    pageSize: PAGE_SIZE,
    service: omsApi.omsInventoryAllotQueryList,
  });
  const handleReset = () => {
    createTime.value = [];
    resetSearch();
  };
  const handleTimeChange = (val) => {
    if (val) {
      search.createTimeStart = val[0] || '';
      search.createTimeEnd = val[1] || '';
    } else {
      search.createTimeStart = undefined;
      search.createTimeEnd = undefined;
    }
  };

  const add = () => {
    const path = router.resolve({
      name: 'stockAllocationOrderAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'stockAllocationOrderDetail',
        query: { code: row.allotCode },
      });
      router.push(path.href);
    } else if (key === 'cancel') {
      cancel(row, '作废');
    }
  };
  const cancel = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await omsApi.omsInboundOrderCancel({
        id: row.id,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  onMounted(() => {
    initMember();
    getWarehouseMap('ALL');
    getPoolMap();
  });
  onActivated(() => {
    refreshList();
  });
</script>

<style scoped lang="scss">
  :deep(.vxe-table--scroll-y-top-corner) {
    width: 0px;
  }
  :deep(.remark-tooltip) {
    max-width: 400px;
    word-break: break-all; /* 可选：强制换行 */
  }
</style>
