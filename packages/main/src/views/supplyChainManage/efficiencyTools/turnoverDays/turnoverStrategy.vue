<template>
  <KeenList @refresh="refreshList">
    <template #buttons>
      <el-button type="primary" @click="router.push({ name: 'turnoverStrategyTemplate' })">
        新增策略
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="code"
      class-name="table-row-dashed"
    >
      <!--      <el-table-column prop="code" label="策略编码" />-->
      <el-table-column prop="name" label="模板名称" />
      <el-table-column label="渠道">
        <template #default="{ row }">
          <span>{{ row?.channel?.join(',') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先级" prop="priority" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <Tag :color="row.status === 0 ? 'green' : 'red'">
            {{ row?.status === 0 ? '启用' : '禁用' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="策略描述" min-width="180">
        <template #default="{ row }">
          <div>
            周转预警：{{ row.softMinDay }}≤周转天数≤{{ row.softMaxDay }}，周转预警范围={{
              row.warningWeek
            }}W， 发货指令生成规则：发货指令生成范围={{
              row.flag === 1 ? '总供应周期' : row.shippingCommandWeek
            }}，安全周转最小天数 = {{ row.softDay }}天，生成方式 = 预警按
            <strong>到货时间</strong>
            自动生成发货指令，自动匹配物流方式
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row,
              },
              {
                label: '启用',
                key: 'enable',
                type: 'primary',
                row,
                permissionCode: '',
                hide: row?.status === 0,
              },
              {
                label: '禁用',
                key: 'disable',
                type: 'danger',
                row,
                permissionCode: '',
                hide: row?.status === 1,
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
    <!-- <TurnoverStrategyDialog ref="turnoverStrategyDialogRef" @success="runQuery" /> -->
    <!--  <DetailDialog ref="detailDialogRef" @success="runQuery" /> -->
  </KeenList>
</template>

<script lang="ts" setup name="turnoverStrategy">
  import { erpApi, ErpApi, memberApi, platformApi, dataApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  // import { cloneDeep } from 'lodash-es';
  // import TurnoverStrategyDialog from './components/turnoverStrategyDialog.vue';
  // import DetailDialog from './components/detailDialog.vue';

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
    ErpApi.LuteosErpPlanTurnoverStrategyTemplateQueryList.RequestQuery,
    ErpApi.LuteosErpPlanTurnoverStrategyTemplateQueryList.ResponseBody
  >({
    searchDefaults: {},
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanTurnoverStrategyTemplateQueryList,
  });
  const getCreatorList = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberMap({
      operatorDepartmentCode: ['supply_operator_dept', 'supply_planer_dept'],
    });
    return {
      supply_operator_dept: res.supply_operator_dept.map((item) => {
        return {
          label: item.name,
          value: item.memberCode,
        };
      }),
      supply_planer_dept: res.supply_planer_dept.map((item) => {
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
      dictCodes: ['sales_forecast_channel'],
    });
    const countryList = await getCountryList();
    dickbook.value = { ...res.dictMap, countryList, ...memeberList };
  };
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      router.push({
        name: 'turnoverStrategyTemplate',
        query: {
          code: row?.code,
        },
      });
    } else if (key === 'enable') {
      const isConfirmed = await swal.confirm('确定要启用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanTurnoverStrategyTemplateChangeStatus({
        id: row?.id,
        code: row?.code,
        status: 0,
      });
      ElMessage.success('启用成功');
      refreshList();
    } else if (key === 'disable') {
      const isConfirmed = await swal.confirm('确定要禁用吗？');
      if (!isConfirmed) return;
      await erpApi.luteosErpPlanTurnoverStrategyTemplateChangeStatus({
        id: row?.id,
        code: row?.code,
        status: 1,
      });
      ElMessage.success('禁用成功');
      refreshList();
    }
  };

  const goBack = () => {
    router.push({
      name: 'turnoverDays',
    });
  };
  onMounted(() => {
    initDickbook();
  });
  // const turnoverStrategyDialogRef = ref();
</script>

<style scoped lang="scss"></style>
