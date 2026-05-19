<template>
  <div class="card card-flush py-4">
    <div class="card-body p-0">
      <KeenList>
        <template #search>
          <el-date-picker
            class="w-100"
            v-model="search.operateTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :popper-options="{ placement: 'bottom-start' }"
          />
        </template>
        <template #buttons>
          <el-button class="button" type="primary" @click="refreshList">查询</el-button>
          <el-button
            class="button"
            type="primary"
            plain
            @click="
              handleExport({
                // codeList,
                ...searchData,
                pageNum: current,
                pageSize,
              })
            "
            :loading="exportLoading"
          >
            导出
          </el-button>
        </template>
        <el-table ref="tableRef" v-loading="listLoading" :data="listData?.suckRecordList">
          <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
          <el-table-column prop="operateTime" label="使用时间" />
          <el-table-column label="使用时长（校正前）">
            <template #default="scope">
              {{ scope.row.operateDuration ? `${scope.row.operateDuration}min` : '/' }}
            </template>
          </el-table-column>
          <el-table-column label="使用时长（校正后）">
            <template #default="scope">
              {{ scope.row.operateDurationCheck ? `${scope.row.operateDurationCheck}min` : '/' }}
            </template>
          </el-table-column>
          <el-table-column label="吸奶量（校正前）">
            <template #default="scope">
              {{ scope.row.capacity ? `${scope.row.capacity}ml` : '/' }}
            </template>
          </el-table-column>
          <el-table-column label="吸奶量（校正后）">
            <template #default="scope">
              {{ scope.row.capacityCheck ? `${scope.row.capacityCheck}ml` : '/' }}
            </template>
          </el-table-column>
          <el-table-column prop="mode" label="模式" />
          <el-table-column label="左/右键">
            <template #default="scope">{{ DevicePosition[scope.row.position] }}</template>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs';
  import { pick } from 'lodash-es';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { deviceApi, DeviceApi } from '@/api/index';
  import { DevicePosition } from '@/types/api';
  import useExport from '@/hooks/list/useExport';

  const props = defineProps<{
    deviceCode: string;
    uid: string;
  }>();

  const {
    search,
    searchData,
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
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    DeviceApi.LuteosDeviceQuerySuckRecordList.RequestQuery & {
      operateTime?: [string, string];
    },
    DeviceApi.LuteosDeviceQuerySuckRecordList.ResponseBody
  >({
    searchDefaults: {
      deviceCode: props.deviceCode,
      uid: props.uid,
      operateTime: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { operateTime } = searchData;
      return {
        ...pick(searchData, ['deviceCode', 'uid']),
        operateTimeStart: operateTime?.[0]
          ? dayjs(operateTime?.[0]).startOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        operateTimeEnd: operateTime?.[1]
          ? dayjs(operateTime?.[1]).endOf('date').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      };
    },
    service: deviceApi.luteosDeviceQuerySuckRecordList,
  });

  const { handleExport, exportLoading } = useExport(deviceApi.luteosDeviceExportSuckRecordList);
</script>
