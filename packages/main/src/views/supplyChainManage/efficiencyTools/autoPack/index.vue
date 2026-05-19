<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <!--    <template #search>
      <el-input v-model="search.keyword" placeholder="" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>-->
    <template #filters>
      <DeptMember v-model="search.creator" placeholder="创建人" />
      <el-date-picker
        v-model="search.time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD"
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="cartonSizeDialogRef?.open()">箱规设置</el-button>
      <el-button type="primary" @click="cupCountDialogRef?.open()">模杯计算件数</el-button>
      <el-button type="primary" @click="importDialogRef?.open()">添加自动装箱</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.fileRecordList"
      class-name="table-row-dashed"
    >
      <el-table-column prop="recordCode" min-width="180px" label="单据编码" />
      <el-table-column prop="createTime" min-width="140px" label="创建时间" />
      <el-table-column prop="creator" min-width="120px" label="创建人" />
      <el-table-column prop="statusDesc" min-width="100px" label="状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="下载" width="240" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '上传文件',
                key: 'importPath',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '装箱清单',
                key: 'resultPath',
                type: 'primary',
                permissionCode: '',
                hide: row?.status !== 2,
                row,
              },
              {
                label: '失败原因',
                key: 'resultPath',
                type: 'primary',
                permissionCode: '',
                hide: row?.status !== 0,
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
  <CartonSizeDialog ref="cartonSizeDialogRef" @success="refreshList" />
  <CupCountDialog ref="cupCountDialogRef" />
  <ImportDialog ref="importDialogRef" @success="refreshList" />
</template>

<script setup lang="ts" name="autoPack">
import dayjs from 'dayjs';
  import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import CartonSizeDialog from '@/views/supplyChainManage/efficiencyTools/autoPack/components/cartonSizeDialog.vue';
  import CupCountDialog from '@/views/supplyChainManage/efficiencyTools/autoPack/components/cupCountDialog.vue';
  import ImportDialog from '@/views/supplyChainManage/efficiencyTools/autoPack/components/importDialog.vue';
  import { download } from '@/utils/download';
  import { openWindow } from '@/utils';

  const PAGE_SIZE = 10;

  const statusColorMap = ref({
    0: 'red',
    1: '',
    2: 'green',
  });

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
    PlatformApi.PlatformFileRecordQueryFileRecordList.RequestQuery,
    PlatformApi.PlatformFileRecordQueryFileRecordList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      creator: undefined,
      time: undefined,
      searchAllCreator: true,
      moduleCode: 'plan_auto_pack',
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      return {
        ...omit(searchData, 'time'),
        createTimeStart: searchData?.time
          ? dayjs(searchData?.time[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        createTimeEnd: searchData?.time
          ? dayjs(searchData?.time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformFileRecordQueryFileRecordList,
  });

  const cartonSizeDialogRef = ref();
  const cupCountDialogRef = ref();
  const importDialogRef = ref();

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'importPath') {
      const isConfirmed = await swal.confirm('确认下载上传文件？');
      if (!isConfirmed) return;
      download(
        row?.importPath,
        row?.extraInfo ? JSON.parse(row?.extraInfo)?.importFileName : '上传文件'
      );
    }
    if (key === 'resultPath') {
      const name = row?.status === 2 ? '装箱清单' : '失败原因';
      const isConfirmed = await swal.confirm(`确认下载${name} ？`);
      if (!isConfirmed) return;
      // download(row?.resultPath, name);
      openWindow(row?.resultPath);
    }
  };
</script>

<style scoped lang="scss"></style>
