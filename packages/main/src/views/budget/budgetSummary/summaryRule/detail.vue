<template>
  <el-config-provider size="small">
    <KeenCard title="汇总表模板">
      <el-input v-model="form.ruleName" disabled class="w-300px" placeholder="请输入汇总表模板" />
    </KeenCard>
    <KeenCard title="数据源配置">
      <el-table :data="form?.budgetSummaryInfoList" v-loading="detailLoading" class="mt-4">
        <el-table-column type="index" label="序号" fixed="left">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="数据类型" prop="dataType" width="150" fixed="left">
          <template #default="{ row, $index }">
            {{ row.dataType == 'master' ? '主数据' : '附表' }}
          </template>
        </el-table-column>
        <el-table-column
          label="数据源"
          width="150"
          prop="budgetTemplateName"
          fixed="left"
        ></el-table-column>
        <el-table-column
          :label="item.name"
          :prop="item.key"
          v-for="(item, index) in columnData"
          :key="index"
          width="150"
        >
          <template #default="{ row, $index }">
            {{ row[item.key] }}
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="取值配置">
      <el-tabs
        v-model="tableValue"
        @tab-click="handleTabClick"
        tab-position="top"
        class="budget-body-class"
      >
        <el-tab-pane
          v-for="(item, index) in tableValueList"
          :key="index"
          :label="item.label"
          :name="index == 0 ? '汇总表字段取值配置' : item.name"
        >
          <el-table
            :data="form?.budgetSummaryRuleFiledMappingBaseBeans"
            class="mt-4"
            v-if="tableValue == '汇总表字段取值配置'"
          >
            <el-table-column label="指标" width="220">
              <template #default="{ row, $index }">
                <div>{{ row.fieldName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="取数规则" min-width="450">
              <template #default="{ row, $index }">
                <div>
                  {{ getShowRule(row, row.sharedBoundary) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="取数规则设置" min-width="250">
              <template #default="{ row, $index }">
                <el-popover placement="top" :width="600" trigger="click">
                  <template #reference>
                    <el-link type="primary" underline="never">查看设置</el-link>
                  </template>
                  <el-checkbox
                    v-model="row.budgetSummaryRuleSubMonthBean.subYearmonth"
                    label="拆分月份"
                    class="ms-4 mt-4"
                    disabled
                    :true-value="1"
                    :false-value="0"
                    style="vertical-align: middle"
                    v-if="row.budgetSummaryRuleSubMonthBean.subYearmonth"
                  />
                  <el-table
                    :data="row.budgetSummaryRuleConditionBeanList"
                    row-key="id"
                    class="mt-4 current-table"
                  >
                    <el-table-column label="条件" width="300">
                      <template #default="{ row, $index }">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="text-break">
                            <OverflowTooltip
                              :content="
                                getShowData(row?.incomeRuleConditionBeans, row.sharedBoundary)
                              "
                            />
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="值" width="300">
                      <template #default="{ row, $index }">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="text-break">
                            <OverflowTooltip :content="getShowValue(row, row.sharedBoundary)" />
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="分摊后计算" width="150">
              <template #default="{ row }">
                <el-checkbox
                  v-model="row.sharedBoundary"
                  disabled
                  true-value="after"
                  false-value="before"
                  size="large"
                  label=""
                />
              </template>
            </el-table-column>
          </el-table>
          <div v-else>
            <el-popover placement="top" :width="600" trigger="click">
              <template #reference>
                <el-link
                  type="primary"
                  class="ms-4 mt-4"
                  underline="never"
                  v-if="tableValueSetData.budgetSummaryRuleSubMonthBean?.monthColumn"
                >
                  查看月份取值
                </el-link>
              </template>
              <el-table
                :data="[tableValueSetData.budgetSummaryRuleSubMonthBean]"
                row-key="id"
                class="mt-4 current-table"
              >
                <el-table-column label="数据源" min-width="200px">
                  <template #default="{ row, $index }">
                    <div>{{ tableValueSetData.budgetTemplateName }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="列名">
                  <template #default="{ row, $index }">
                    <div>{{ row.monthColumnName }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="月份格式" min-width="200px">
                  <template #default="{ row }">
                    <div>{{ row.monthFormat }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </el-popover>
            <el-checkbox
              v-model="tableValueSetData.budgetSummaryRuleSubMonthBean.subYearmonth"
              label="拆分月份"
              class="ms-4 mt-4"
              disabled
              :true-value="1"
              :false-value="0"
              style="vertical-align: sub"
              v-if="tableValueSetData.budgetSummaryRuleSubMonthBean.subYearmonth"
            />

            <el-table
              ref="tableRef"
              :data="tableValueSetData.budgetSummaryRuleConditionBeanList"
              row-key="id"
              class="mt-4 current-table"
            >
              <el-table-column type="index" label="行号" width="70px" />
              <el-table-column label="说明" width="300">
                <template #default="{ row }">
                  <OverflowTooltip :content="row.remark" />
                </template>
              </el-table-column>
              <el-table-column label="通用条件" min-width="250">
                <template #default="{ row, $index }">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="text-break">
                      <OverflowTooltip
                        :content="getShowData(row?.incomeRuleConditionBeans, 'before')"
                      />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="通用分摊" min-width="250">
                <template #default="{ row, $index }">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="text-break">
                      <OverflowTooltip :content="getShowValue(row, 'before')" />
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="取值映射" width="450">
                <template #default="{ row, $index }">
                  <el-popover placement="top" :width="600" trigger="click">
                    <template #reference>
                      <el-link type="primary" underline="never">查看设置</el-link>
                    </template>
                    <el-table
                      :data="row.budgetSummaryRuleApportionPickValueBeans"
                      row-key="id"
                      class="mt-4 current-table"
                    >
                      <el-table-column label="来源条件" width="300">
                        <template #default="{ row, $index }">
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="text-break">
                              <OverflowTooltip
                                :content="getShowData(row?.incomeRuleConditionBeans, 'before')"
                              />
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="来源值" width="120">
                        <template #default="{ row, $index }">
                          <div>{{ row.sourceColumnName }}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="目标值" width="120">
                        <template #default="{ row, $index }">
                          <div>{{ row?.targetColums?.map((res) => res.columnName).join(',') }}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </KeenCard>
  </el-config-provider>
</template>

<script setup lang="ts" name="budgetSummaryRuleDetail">
  import { ElConfigProvider } from 'element-plus';
  import {
    sharedBoundaryType,
    fileType,
    logicTypeMap,
    codeMainType,
  } from '@/views/budget/budgetSummary/enum';
  import { financeSystemApi } from '@/api';

  const route = useRoute();
  const tableValue = ref('汇总表字段取值配置');
  const tableValueSetData = ref();
  const columnData = ref([]);
  const form = ref({ ruleName: '' });
  const tableValueList = computed(() => {
    let arr =
      form.value?.budgetSummaryInfoList?.filter(
        (item) => item.budgetTemplateCode || item.dataType == 'master'
      ) || [];
    arr = arr.map((res, index) => {
      return {
        ...res,
        label: `${index == 0 ? '汇总表字段取值配置' : `附表-${res.name}`}`,
      };
    });
    return arr;
  });
  const detailLoading = ref(false);
  // 查询详情
  const getDetail = async () => {
    if (!route?.query?.ruleCode) return;
    detailLoading.value = true;
    const res = await financeSystemApi
      .financeBudgetRuleQueryDetail({
        ruleCode: route?.query?.ruleCode,
      })
      .catch((err) => {
        detailLoading.value = false;
      });
    form.value = res;
    //动态列名赋值回显
    form.value.budgetSummaryInfoList[0].budgetSummaryInfoColumnList.forEach((col) => {
      const num = Math.random().toString(36).substr(2, 10);
      columnData.value.push({
        name: '列名',
        key: `column__${num}`,
      });
    });
    form.value.budgetSummaryInfoList.forEach((item) => {
      if (columnData.value?.length) {
        columnData.value.forEach((col, i) => {
          item[`${col.key}`] = item.budgetSummaryInfoColumnList[i]?.columnName || '';
        });
      }
    });
    let list = localStorage.getItem('budgetSummaryRuleFieldsList');
    list = JSON.parse(list);
    form.value.budgetSummaryInfoList.forEach((row) => {
      row.name = list.find((res) => res.code == row.budgetTemplateCode)?.name;
    });
    tableValueSetData.value = form.value.budgetSummaryInfoList[0];
    detailLoading.value = false;
  };
  getDetail();
  // 点击tab页
  const handleTabClick = (pane) => {
    console.log(pane?.props?.name);
    if (pane?.props?.name == '汇总表字段取值配置') {
      tableValueSetData.value = form.value.budgetSummaryInfoList[0];
    } else {
      tableValueSetData.value = form.value.budgetSummaryInfoList.find(
        (res) => res.name == pane?.props?.name
      );
      let arr = form.value.budgetSummaryRuleApportionMappingBeans.filter((res) => {
        return res.fieldCode == tableValueSetData.value.budgetTemplateCode;
      });
      tableValueSetData.value.budgetSummaryRuleConditionBeanList =
        arr[0].budgetSummaryRuleConditionBeanList;
    }
  };

  // 展示规则
  const getShowRule = (row, sharedBoundary) => {
    const result = [];
    row?.budgetSummaryRuleConditionBeanList?.forEach((item) => {
      if (item?.incomeRuleConditionBeans?.length) {
        result.push(
          `如果 ${getShowData(
            item?.incomeRuleConditionBeans,
            row.sharedBoundary
          )} 则 ${getShowValue(item, sharedBoundary)}`
        );
      } else result.push(getShowValue(item, sharedBoundary));
    });
    return result?.join('；');
  };
  // 展示数据
  const getShowData = (data, sharedBoundary) => {
    const list = [];
    let name =
      sharedBoundary === sharedBoundaryType.分摊后
        ? codeMainType.汇总表名
        : tableValueSetData.value.budgetTemplateName;
    data?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      list.push(
        `${leftParenthesis || ''}${name} ${columnName ? `"${columnName}"` : ''} ${operator || ''} ${
          value || ''
        }${rightParenthesis || ''} ${index !== data?.length - 1 ? logicTypeMap[logic] : ''}`
      );
    });
    return list.join(' ');
  };

  const getShowValue = (row, sharedBoundary) => {
    let columnName = row?.columnName;
    let mainName =
      sharedBoundary === sharedBoundaryType.分摊后
        ? codeMainType.汇总表名
        : tableValueSetData.value.budgetTemplateName;
    if (row.valueType === 10) {
      return `${mainName}"${columnName}"`;
    } else if (row.valueType === 11) {
      return `${mainName}"${columnName}" (${row?.value?.split('###')[0]}-${
        row?.value?.split('###')[1]
      })`;
    } else if (row.valueType === 12) {
      return `${mainName}"${columnName}" (${row?.value?.split('###')[0]}, ${
        row?.value?.split('###')[1]
      })`;
    } else if (row.valueType === 13) {
      const obj = JSON.parse(row?.value);
      let text = '';
      obj.groupFields.forEach((item) => {
        text = text + `${name}.${item.fieldName}`;
      });
      return `qzbe(${text},${name}.${obj.weightField.split('###')[2]})`;
    } else {
      return row?.value;
    }
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    color: var(--el-color-primary);
  }
  .tip {
    font-size: 12px;
    color: #8c8c8c;
  }
  :deep(.el-form-item--small .el-form-item__label) {
    line-height: 40px;
  }
</style>
