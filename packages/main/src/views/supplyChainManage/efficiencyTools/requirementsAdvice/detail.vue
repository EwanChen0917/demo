<template>
  <KeenCard style="margin: 0 !important" :title="`需求建议#${detailData.code}`" v-loading="loading">
    <KeenList
      @refresh="getDetailData"
      @reset-search="getDetailData"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="产品SKU/产品名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select v-model="search.plus" placeholder="需求建议数量" clearable>
          <el-option :value="-1" label="0" />
          <el-option :value="1" label="正数" />
          <el-option :value="0" label="负数" />
        </el-select>
        <DeptMember v-model="search.planer" placeholder="计划" deptCode="supply_planer_dept" />
      </template>
      <template #buttons>
        <!-- <el-button type="primary" @click="getDetailData">查询</el-button> -->
        <!--        <el-button type="primary" @click="addSubscription" :disabled="!selectedRows.length">
          新增申购单
        </el-button>-->
      </template>
    </KeenList>
    <vxe-table
      ref="tableRef"
      :data="detailData.rowList"
      max-height="800"
      border="inner"
      :scroll-y="{ enabled: true }"
      :checkbox-config="{ reserve: true }"
      @checkbox-change="handleSelectionChange"
      @checkbox-all="handleSelectionChange"
    >
      <vxe-column type="checkbox" width="55" />
      <vxe-column
        :key="column"
        :field="column"
        :title="column"
        v-for="column of detailData.colNameList"
        :min-width="columnWidth[column] || '120px'"
      >
        <template v-if="column === '产品SKU名称' || column === '供应链SKU'" #default="scope">
          <OverflowTooltip :content="scope.row[column]" :line="1" />
        </template>
        <template v-if="column === '建议需求数量'" #default="{ row }">
          <el-popover placement="bottom" width="400" trigger="hover">
            <template #reference>
              <el-text type="primary">{{ row[column] }}</el-text>
            </template>
            <div v-for="(value, key) in row.sugguestTips" :key="key" class="numberTip">
              <span class="label">{{ key }}：</span>
              <span class="value">{{ value }}</span>
            </div>
          </el-popover>
        </template>
      </vxe-column>
    </vxe-table>
    <!-- <el-table :data="detailData.rowList" max-height="800px">
      <el-table-column
        :key="column"
        :prop="column"
        :label="column"
        v-for="column of detailData.colNameList"
        :min-width="columnWidth[column] || '120px'"
      >
        <template v-if="column === '建议需求数量'" #default="{ row }">
          <el-popover placement="bottom" width="400" trigger="hover">
            <template #reference>
              <el-text type="primary">{{ row[column] }}</el-text>
            </template>
            <div v-for="(value, key) in row.sugguestTips" :key="key" class="numberTip">
              <span class="label">{{ key }}：</span>
              <span class="value">{{ value }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table> -->
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button type="primary" @click="router.push({ name: 'requirementsAdvice' })">
        返回
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="requirementsAdviceDetail">
import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';

  const search = reactive({
    keyword: '',
    plus: '',
    planer: '',
  });

  watch(search, () => {
    getDetailData();
  });

  const route = useRoute();
  const router = useRouter();
  const detailData = ref({ code: '', colNameList: [], rowList: [] });
  const columnWidth = {
    产品SKU: '180px',
    供应链SKU: '180px',
    产品SKU名称: '280px',
    当前需求周期: '200px',
  };
  const loading = ref(true);
  const getDetailData = async () => {
    const res = await erpApi
      .luteosErpRequirementSugguestQueryDetail({
        code: route.query.code as string,
        ...search,
      })
      .finally(() => {
        loading.value = false;
      });
    detailData.value = { ...(res as any) };
  };
  if (route.query.code) {
    getDetailData();
  }

  const tableRef = ref();
  const selectedRows = ref([]);
  const handleSelectionChange = () => {
    selectedRows.value = tableRef.value
      .getCheckboxRecords()
      .concat(tableRef.value.getCheckboxReserveRecords());
  };

  const addSubscription = () => {
    router.push({
      name: 'subscriptionAdd',
      params: {
        list: JSON.stringify(selectedRows.value),
      },
    });
  };
</script>

<style scoped lang="scss">
  .detail-wrapper {
    width: 800px;
    display: flex;
    font-size: 14px;
    margin-top: 14px;

    .content {
      flex: 1;
    }

    .label {
      flex-basis: 200px;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .el-step {
    margin-bottom: 20px;
  }

  :deep(.el-step.is-vertical .el-step__head) {
    width: 60px;

    .el-step__line {
      top: 52px;
      bottom: -14px;
      left: 24px;
    }

    .el-step__icon.is-icon {
      width: 50px;
    }
  }

  .numberTip {
    display: flex;
    justify-content: space-between;
    margin: 4px;
    // &:last-child {
    //   margin-bottom: 0;
    // }
    .label {
      flex-basis: 300px;
    }

    .value {
      text-align: right;
      flex-basis: 100px;
    }
  }
</style>
