<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="需求建议名称/需求建议编码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 140px"
        v-model="search.operator"
        placeholder="操作人"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item of creatorList"
          :key="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="time"
        style="width: 220px"
        type="daterange"
        range-separator="-"
        start-placeholder="上传开始时间"
        end-placeholder="上传结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.createTimeStart = dateArr ? dateArr[0] : '';
            search.createTimeEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="$router.push('/salesStatistics')">
        销量统计
      </el-button>
      <el-button class="button" type="primary" @click="$router.push('/centerInventory')">
        库存统计
      </el-button>

      <el-button
        class="button"
        type="primary"
        @click="detailDialogRef.open()"
        v-permission="'requirementsAdviceAdd'"
      >
        生成需求建议
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="name" label="需求建议名称" />
      <el-table-column prop="code" label="需求建议编码" />
      <el-table-column prop="createTime" label="生成时间" />
      <el-table-column prop="operator" label="操作人" />
      <!-- <el-table-column prop="forecastSaleCode" label="销售预测编码" /> -->
      <el-table-column prop="inventoryNodeCode" label="库存节点" />
      <el-table-column prop="currentWeekShowDesc" label="当前需求周数" />
      <el-table-column prop="statusDesc" label="生成状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                disabled: row.status !== 2,
                row: row,
                permissionCode: 'requirementsAdviceDetail',
              },
              {
                label: '下载',
                key: 'download',
                type: 'danger',
                text: true,
                hide: row.status !== 0 || !row.failFileUrl,
                row: row,
                permissionCode: 'requirementsAdviceDownload',
              },
              {
                label: '导出',
                key: 'export',
                type: 'primary',
                text: true,
                hide: row.status !== 2,
                row: row,
                permissionCode: 'requirementsAdviceExport',
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
  <DetailDialog ref="detailDialogRef" @success="refreshList" />
</template>

<script lang="ts" setup name="requirementsAdvice">
  import { erpApi, ErpApi, memberApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { urlDownload } from '@/utils/download';
  import useExport from '@/hooks/list/useExport';
  import DetailDialog from './components/detailDialog.vue';

  const time: any = ref([]);
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
    ErpApi.LuteosErpRequirementSugguestQueryList.RequestQuery,
    ErpApi.LuteosErpRequirementSugguestQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      operator: '',
      createTimeEnd: '',
      createTimeStart: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpRequirementSugguestQueryList,
  });
  const statusColorMap = ref({
    0: 'red',
    1: 'yellow',
    2: 'green',
  });
  const creatorList = ref<any[]>([]);
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
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      const path = router.resolve({
        name: 'requirementsAdviceDetail',
        query: {
          code: row.code,
        },
      });
      router.push(path.href);
    } else if (key === 'download') {
      urlDownload(row.failFileUrl);
    } else if (key === 'export') {
      handleExport({
        code: row.code,
      });
    }
  };
  const { handleExport, exportLoading } = useExport(
    erpApi.luteosErpRequirementSugguestExportDetail
  );
  onMounted(() => {
    getCreatorList();
  });
  const detailDialogRef = ref();
</script>

<style scoped lang="scss"></style>
