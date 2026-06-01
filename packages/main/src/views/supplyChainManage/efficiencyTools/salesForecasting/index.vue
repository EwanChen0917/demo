<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="在线商品编码/产品名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <CountrySelect
        style="width: 120px"
        v-model="search.country"
        placeholder="站点"
        filterable
        clearable
      />
      <el-select
        style="width: 120px"
        v-model="search.channel"
        placeholder="渠道"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.sales_forecast_channel"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.operator"
        placeholder="运营"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.supply_operator_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.planer"
        placeholder="计划"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="person of dickbook.supply_planer_dept"
          :key="person.value"
          :label="person.label"
          :value="person.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <a
        href="https://bi.luteos.com/#/site-view/Tn8CZdBKg2/uAewcuWrf8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <el-button class="button" type="primary">销量统计</el-button>
      </a>
      <router-link to="/salesForecastingLog" target="_blank" v-permission="'salesForecastingLog'">
        <el-button class="button" type="primary">上传日志</el-button>
      </router-link>

      <el-button
        class="button"
        type="primary"
        @click="importDialogRef.open()"
        v-permission="'salesForecastingUpdate'"
      >
        批量更新
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="originalPlatformMark" label="在线商品编码" />
      <el-table-column prop="ecSku" label="供应链SKU" />
      <el-table-column prop="country" label="站点" />
      <el-table-column prop="channel" label="渠道" />
      <el-table-column prop="skuName" label="产品名称" />
      <el-table-column prop="categoryName" label="五级品类" />
      <el-table-column prop="planer" label="计划" />
      <el-table-column prop="operator" label="运营" />
      <el-table-column prop="statusDesc" label="状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>

      <el-table-column align="right" label="操作" width="140px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '预测详情',
                key: 'view',
                type: 'primary',
                text: true,
                row,
                permissionCode: 'salesForecastingDetail',
              },
              {
                label: '关闭',
                key: 'close',
                type: 'primary',
                text: true,
                hide: row.status === 1,
                row,
                permissionCode: 'salesForecastingChangeStatus',
              },
              {
                label: '开启',
                key: 'open',
                type: 'primary',
                text: true,
                hide: row.status === 0,
                row,
                permissionCode: 'salesForecastingChangeStatus',
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
    <ImportDialog ref="importDialogRef" @success="runQuery" />
    <DetailDialog ref="detailDialogRef" @success="runQuery" />
  </KeenList>
</template>

<script lang="ts" setup name="salesForecasting">
  import { erpApi, ErpApi, memberApi, platformApi, dataApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import { cloneDeep } from 'lodash-es';
  import ImportDialog from './components/importDialog.vue';
  import DetailDialog from './components/detailDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
  const statusColorMap = ref({
    0: 'green',
    1: 'red',
  });
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
    ErpApi.LuteosErpSaleForecastQueryList.RequestQuery,
    ErpApi.LuteosErpSaleForecastQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: '',
      operator: '',
      channel: '',
      planer: '',
      country: '',
      createTimeStart: '',
      createTimeEnd: '',
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSaleForecastQueryList,
  });
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept!.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
    };
  };
  const getCountryList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    return res.countryList!.map((item) => {
      return {
        label: item.countryName,
        value: item.countryCode,
      };
    });
  };
  const dickbook: any = ref({
    sales_forecast_channel: [],
    countryList: [],
    supply_operator_dept: [],
    supply_planer_dept: [],
  });
  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    const res = await platformApi.platformDict({
      dictCodes: ['sales_forecast_channel', 'supply_planer_dept', 'supply_operator_dept'],
    });
    const countryList = await getCountryList();
    dickbook.value = { ...res.dictMap, countryList, ...memeberList };
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'view') {
      detailDialogRef.value.open(cloneDeep(row.weekBeanList));
    } else if (key === 'open') {
      changeForecastStatus(row, 0);
    } else if (key === 'close') {
      changeForecastStatus(row, 1);
    }
  };
  const changeForecastStatus = async (row, targetStatus = 0) => {
    const text = targetStatus === 0 ? '开启' : '关闭';
    const res = await swal.confirm(`确认${text}?`);
    if (res) {
      await erpApi.luteosErpSaleForecastChangeStatus({
        id: row.id,
        status: targetStatus,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  onMounted(() => {
    initDickbook();
  });
  const detailDialogRef = ref();
  const importDialogRef = ref();
</script>

<style scoped lang="scss"></style>
