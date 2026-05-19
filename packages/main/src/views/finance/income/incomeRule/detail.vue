<template>
  <el-config-provider size="small">
    <KeenCard title="单据类型">
      <el-select v-model="ruleTypeValue" disabled placeholder="单据类型">
        <el-option
          v-for="(item, index) in billTypeMapAll"
          :value="item.value"
          :label="item.name"
          :key="index"
        />
      </el-select>
    </KeenCard>
    <KeenCard title="数据源配置">
      <el-form ref="formRef" :model="form" label-width="0" scroll-to-error>
        <!--        <el-space>
          <el-button type="primary" @click="addRow" size="small">添加行</el-button>
          <div class="tip">
            路径提示：
            <div>
              1、文件路径必须是根目录“\\192.168.2.9\数据盘\销售端”下的，且根目录无需在路径中体现
            </div>
            <div>
              2、年月数值请分别用“YYYY”与“MM”表示。例如，Tiktok\conglin_VN_TT\2024-10\结算明细.xlxs
              表示为：Tiktok\conglin_VN_TT\YYYY-MM\结算明细.xlxs
            </div>
            <div>
              3、星号*为通配符，如Walmart\Joyjoz\2025-02\20250128-20250203.xlxs，可表示为：Walmart\Joyjoz\YYYY-MM\******-YYYYMM**.xlxs
            </div>
          </div>
        </el-space>-->
        <el-table :data="form?.incomeRuleDetailShopBeans">
          <el-table-column type="index" label="序号" width="70px" />
          <el-table-column label="店铺" prop="shop" min-width="150" />
          <el-table-column label="数据源" min-width="150" prop="settleFile.dataSource">
            <template #default="{ row }">
              <div v-if="row?.settleFile?.filePath">
                {{ row.settleFile.dataSource == '1' ? '库表' : '共享盘' }}
              </div>
              <div v-else></div>
            </template>
          </el-table-column>
          <el-table-column label="结算数据" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip
                  :content="getIncomeRuleTableName(row?.settleFile?.filePath)"
                  :line="2"
                  v-if="row?.settleFile?.dataSource == dataSourceType.库表"
                />
                <OverflowTooltip :content="row?.settleFile?.filePath" :line="2" v-else />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="页签名" prop="settleFile.sheetName" min-width="150" />
          <el-table-column label="结算列名行标识" min-width="150">
            <template #header>
              结算列名行标识
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`示例：A = Date，表示A列中值为Date的行表示为列名行。多条件需同时满足，可用逗号隔开，如A = Date，AJ=OrderId”。信一列名行标识、信二列名行标识填写亦如此`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
              </el-tooltip>
            </template>
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip :content="row?.settleFile?.excelHeadRules" :line="2" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数据剔除" min-width="150">
            <template #default="{ row }">
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-break fs-7">
                  <OverflowTooltip :content="getShowData(row?.filterDataConditions)" :line="2" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数据源" min-width="150" prop="infoFile1.dataSource">
            <template #default="{ row }">
              <div v-if="row?.infoFile1?.filePath">
                {{ row.infoFile1?.dataSource == '1' ? '库表' : '共享盘' }}
              </div>
              <div v-else></div>
            </template>
          </el-table-column>
          <el-table-column label="信息数据一" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip
                  :content="getIncomeRuleTableName(row?.infoFile1?.filePath)"
                  :line="2"
                  v-if="row?.infoFile1?.dataSource == dataSourceType.库表"
                />
                <OverflowTooltip :content="row?.infoFile1?.filePath" :line="2" v-else />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="页签名" prop="infoFile1.sheetName" min-width="150" />
          <el-table-column label="信一列名行标识" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip :content="row?.infoFile1?.excelHeadRules" :line="2" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数据源" min-width="150" prop="infoFile2.dataSource">
            <template #default="{ row }">
              <div v-if="row?.infoFile2?.filePath">
                {{ row.infoFile2?.dataSource == '1' ? '库表' : '共享盘' }}
              </div>
              <div v-else></div>
            </template>
          </el-table-column>
          <el-table-column label="信息数据二" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip
                  :content="getIncomeRuleTableName(row?.infoFile2?.filePath)"
                  :line="2"
                  v-if="row?.infoFile2?.dataSource == dataSourceType.库表"
                />
                <OverflowTooltip :content="row?.infoFile2?.filePath" :line="2" v-else />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="页签名" prop="infoFile2.sheetName" min-width="150" />
          <el-table-column label="信二列名行标识" min-width="150">
            <template #default="{ row }">
              <div class="fs-7">
                <OverflowTooltip :content="row?.infoFile2?.excelHeadRules" :line="2" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="showSecond">
          <div class="mb-2">第二表关联</div>
          <div>
            <el-form-item style="display: inline-block">
              <el-checkbox
                v-model="form.firstIncomeRuleRelevanceBean.matchMore"
                :true-value="1"
                disabled
                :false-value="0"
                label="取多条关联数据"
              />
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`勾选后，如源数据（结算数据）匹配到信息数据一的N (N>1) 条数据，则源数据的一行复制成N行，以实现和匹配到的结果数据一一对应`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
              </el-tooltip>
            </el-form-item>
            <el-form-item style="display: inline-block; margin-left: 20px">
              <el-checkbox
                v-model="form.firstIncomeRuleRelevanceBean.firstMatch"
                :true-value="1"
                disabled
                :false-value="0"
                label="优先匹配"
              />
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`信息一数据存在“优先列名”值相同的行的情况下，则仅匹配该行数据`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
              </el-tooltip>
            </el-form-item>
          </div>
          <div class="relation-list">
            <el-form-item>
              <div class="text-content">
                {{ fileTypeMap[form.firstIncomeRuleRelevanceBean.leftFileType] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.leftFileValue[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.leftFileValue[1] }}
              </div>
            </el-form-item>
            <el-form-item v-if="form.firstIncomeRuleRelevanceBean.firstMatch">
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.firstMatchColumnName[0] }}
              </div>
            </el-form-item>
          </div>
          <div class="relation-list">
            <el-form-item>
              <div class="text-content">
                {{ fileTypeMap[form.firstIncomeRuleRelevanceBean.rightFileType] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.rightFileValue[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.rightFileValue[1] }}
              </div>
            </el-form-item>
            <el-form-item v-if="form.firstIncomeRuleRelevanceBean.firstMatch">
              <div class="text-content">
                {{ form.firstIncomeRuleRelevanceBean.firstMatchColumnName[1] }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div v-if="showThird">
          <div class="mb-2">第三表关联</div>
          <div>
            <el-form-item style="display: inline-block">
              <el-checkbox
                v-model="form.secondIncomeRuleRelevanceBean.matchMore"
                :true-value="1"
                disabled
                :false-value="0"
                label="取多条关联数据"
              />
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`勾选后，如源数据（结算数据和信息数据一组合的宽表）匹配到信息数据一的N (N>1) 条数据，则源数据的一行复制成N行，以实现和匹配到的结果数据一一对应`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
              </el-tooltip>
            </el-form-item>
            <el-form-item style="display: inline-block; margin-left: 20px">
              <el-checkbox
                v-model="form.secondIncomeRuleRelevanceBean.firstMatch"
                :true-value="1"
                disabled
                :false-value="0"
                label="优先匹配"
              />
              <el-tooltip
                popper-class="action_tool_tip text-gray-600"
                placement="top-start"
                effect="light"
                :content="`信息二数据存在“优先列名”值相同的行的情况下，则仅匹配该行数据`"
              >
                <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
              </el-tooltip>
            </el-form-item>
          </div>
          <div class="relation-list">
            <el-form-item>
              <div class="text-content">
                {{ fileTypeMap[form.secondIncomeRuleRelevanceBean.leftFileType] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.leftFileValue[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.leftFileValue[1] }}
              </div>
            </el-form-item>
            <el-form-item v-if="form.secondIncomeRuleRelevanceBean.firstMatch">
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.firstMatchColumnName[0] }}
              </div>
            </el-form-item>
          </div>
          <div class="relation-list">
            <el-form-item>
              <div class="text-content">
                {{ fileTypeMap[form.secondIncomeRuleRelevanceBean.rightFileType] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.rightFileValue[0] }}
              </div>
            </el-form-item>
            <el-form-item>
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.rightFileValue[1] }}
              </div>
            </el-form-item>
            <el-form-item v-if="form.secondIncomeRuleRelevanceBean.firstMatch">
              <div class="text-content">
                {{ form.secondIncomeRuleRelevanceBean.firstMatchColumnName[1] }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div v-if="showDict">
          <div class="mb-2">业务字典关联</div>
          <div v-for="(item, index) in form?.dictIncomeRuleRelevanceBeans" :key="index">
            <div class="relation-list">
              <el-form-item>
                <div class="text-content">{{ fileTypeMap[item.leftFileType] }}</div>
              </el-form-item>
              <el-form-item>
                <div class="text-content">{{ item.leftFileValue[0] }}</div>
              </el-form-item>
              <el-form-item />
            </div>
            <div class="relation-list">
              <el-form-item>
                <div class="text-content">
                  {{ dictList?.find((dict) => dict.code === item.rightFileCode)?.name }}
                </div>
              </el-form-item>
              <el-form-item>
                <div class="text-content">{{ dictValueTypeMap[item.rightFileValue[0]] }}</div>
              </el-form-item>
              <el-form-item />
            </div>
          </div>
        </div>
      </el-form>
    </KeenCard>
    <KeenCard title="单据字段取值配置">
      <el-form ref="ruleFormRef" :model="form" label-width="160px" scroll-to-error>
        <el-form-item label="规则识别码：">
          <div class="text-content">{{ form.ruleCode }}</div>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in form.incomeRuleFiledMappingBaseBeans"
          :label="item?.fieldName?.replace('*', '')"
          :key="item?.fileCode"
          :prop="`incomeRuleFiledMappingBaseBeans[${index}].incomeRuleConditionBeanList`"
          :rules="[
            {
              required: item?.fieldName?.startsWith('*'),
              message: `请设置${item?.fieldName?.replace('*', '')}规则`,
            },
          ]"
        >
          <div class="rule-item">
            <div class="text-content">{{ getShowRule(item) }}</div>
          </div>
        </el-form-item>
      </el-form>
    </KeenCard>
    <KeenCard title="汇总校验字段取值配置" v-if="form.shopIncomeRuleFiledMappingBaseBeans?.length">
      <el-form ref="ruleFormRef" :model="form" label-width="160px" scroll-to-error>
        <el-form-item
          v-for="(item, index) in form.shopIncomeRuleFiledMappingBaseBeans"
          :label="item?.fieldName?.replace('*', '')"
          :key="item?.fileCode"
          :prop="`shopIncomeRuleFiledMappingBaseBeans[${index}].incomeRuleConditionBeanList`"
          :rules="[
            {
              required: item?.fieldName?.startsWith('*'),
              message: `请设置${item?.fieldName?.replace('*', '')}规则`,
            },
          ]"
        >
          <div class="rule-item">
            <div class="text-content">{{ getShowRule(item) }}</div>
          </div>
        </el-form-item>
      </el-form>
    </KeenCard>
  </el-config-provider>
</template>

<script setup lang="ts" name="financeBillsRuleDetail">
  import { QuestionFilled, Setting } from '@element-plus/icons-vue';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import {
    fileType,
    fileTypeMap,
    logicTypeMap,
    dictValueTypeMap,
    setValueType,
    dataSourceType,
    ruleType,
    billTypeMapAll,
  } from '@/views/finance/income/incomeRule/enum';
  import { financeApi, financeSystemApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { dictRuleMap } from '@/views/finance/income/incomeRule/enum';

  const route = useRoute();
  const router = useRouter();
  const form = ref({
    incomeRuleDetailShopBeans: [
      {
        settleFile: {},
        infoFile1: {},
        infoFile2: {},
      },
    ],
    firstIncomeRuleRelevanceBean: {
      leftFileType: fileType.结算数据,
      rightFileType: fileType.信息数据一,
      leftFileValue: ['', ''],
      rightFileValue: ['', ''],
    },
    secondIncomeRuleRelevanceBean: {
      leftFileType: '',
      rightFileType: fileType.信息数据二,
      leftFileValue: ['', ''],
      rightFileValue: ['', ''],
    },
    dictIncomeRuleRelevanceBeans: [
      {
        leftFileValue: [''],
        rightFileType: fileType.业务字典,
        rightFileValue: [''],
      },
    ],
    ruleCode: '',
  });
  const formRef = ref(null);
  const ruleFormRef = ref(null);
  const showSecond = ref(false);
  const showThird = ref(false);
  const showDict = ref(false);
  const ruleTypeValue = ref(ruleType.结算单规则);
  const ruleTypePage = ref();
  const initData = () => {
    if (route.name === 'payBackRuleDetail') {
      ruleTypeValue.value = ruleType.收款单规则;
    } else if (route.name === 'financeBillsRule') {
      ruleTypePage.value = '单据推送';
    } else {
      ruleTypeValue.value = ruleType.结算单规则;
    }
  };
  initData();

  const incomeRuleTable = ref<any[]>([]);
  const getIncomeRuleTableOptions = async () => {
    const res = await financeSystemApi.financePlatformOrderQueryTableConfigs();
    incomeRuleTable.value = res as [];
  };
  getIncomeRuleTableOptions();

  // 查询详情
  const getDetail = async () => {
    if (!route?.query?.ruleCode) return;
    const res = await financeSystemApi.financeIncomeRuleQueryDetail({
      ruleCode: route?.query?.ruleCode,
    });
    form.value = res;
    form.value.incomeRuleDetailShopBeans = form.value.incomeRuleDetailShopBeans.map(
      (item, index) => {
        return {
          ...item,
          settleFile: {
            ...item.settleFile,
            excelHeadRules: item.settleFile?.excelHeadRules?.join(','),
          },
          infoFile1: {
            ...item.infoFile1,
            excelHeadRules: item.infoFile1?.excelHeadRules?.join(','),
          },
          infoFile2: {
            ...item.infoFile2,
            excelHeadRules: item.infoFile2?.excelHeadRules?.join(','),
          },
        };
      }
    );
    showSecond.value = !!form.value.firstIncomeRuleRelevanceBean?.leftFileType;
    showThird.value = !!form.value.secondIncomeRuleRelevanceBean?.leftFileType;
    showDict.value = form.value.dictIncomeRuleRelevanceBeans?.length > 0;
    ruleTypeValue.value = form.value.ruleType;
  };
  // 展示剔除数据
  const getShowData = (data) => {
    const list = [];
    data?.forEach((item, index) => {
      const { leftParenthesis, fileType, columnName, operator, value, rightParenthesis, logic } =
        item;
      list.push(
        `${leftParenthesis || ''}${fileTypeMap[fileType] || ''} ${
          columnName
            ? `"${
                item.dataSource == dataSourceType.库表
                  ? getIncomeRuleTableName(columnName)
                  : columnName
              }"`
            : ''
        } ${operator || ''} ${value || ''}${rightParenthesis || ''} ${
          index !== data?.length - 1 ? logicTypeMap[logic] : ''
        }`
      );
    });
    return list.join(' ');
  };

  const getShowValue = (row) => {
    if (row.valueType === 10) {
      return `${fileTypeMap[row?.fileType]}"${row?.columnName}"`;
    } else if (row.valueType === 11) {
      return `${fileTypeMap[row?.fileType]}"${row?.columnName}" (${row?.value?.split('###')[0]}-${
        row?.value?.split('###')[1]
      })`;
    } else if (row.valueType === 12) {
      return `${fileTypeMap[row?.fileType]}"${row?.columnName}" (${row?.value?.split('###')[0]}, ${
        row?.value?.split('###')[1]
      })`;
    } else if (row.valueType === 13) {
      // value传一个json字符串，{"groupFields":[1###字段名,1###字段名],"weightField":"1###字段名"}
      // 结算文件.商品总金额.qzbe(结算数据“订单号”,...，信息数据一“订单金额”)
      const obj = JSON.parse(row?.value);
      let text = '';
      obj.groupFields.forEach((item) => {
        text += `${fileTypeMap[item.split('###')[0]]}.${item.split('###')[1]}`;
      });
      return `${fileTypeMap[row?.fileType]}.${row?.columnName}.qzbe(${text},${
        fileTypeMap[obj.weightField.split('###')[0]]
      }.${obj.weightField.split('###')[1]})`;
    } else if (row.valueType === setValueType.取业务字典) {
      return `字典"${dictList.value?.find((item) => item.code === row?.dictCode)?.name}"${
        dictValueTypeMap[row?.value]
      }`;
    } else {
      return row?.value;
    }
  };

  // 库表显示name
  const getIncomeRuleTableName = (value) => {
    const find = incomeRuleTable.value.find((res) => {
      return res.code === value;
    });
    if (find) {
      return find.name;
    }
    return value;
  };

  const getShowRule = (row) => {
    const result = [];
    row?.incomeRuleConditionBeanList?.forEach((item) => {
      if (item?.incomeRuleConditionBeans?.length) {
        result.push(`如果 ${getShowData(item?.incomeRuleConditionBeans)} 则 ${getShowValue(item)}`);
      } else result.push(getShowValue(item));
    });
    return result?.join('；');
  };

  // 获取业务字典
  const dictList = ref([]);
  const getDictList = async () => {
    const res = await financeApi.luteosFinanceBusinessDictList({
      pageNum: 1,
      pageSize: 100,
    });
    dictList.value = res.list || [];
  };
  getDictList();

  // 获取规则字典
  const queryDictMap = async () => {
    if (!route?.query?.type) return;
    let code = dictRuleMap[route?.query?.type];
    const res = await financeSystemApi.financePlatformOrderQueryResultMapping(code);
    code.forEach((item, index) => {
      if (index == 0) {
        form.value.incomeRuleFiledMappingBaseBeans = res?.resultMappingList[item]?.sort((a, b) => {
          if (a?.sort === b?.sort) {
            return a.id - b.id;
          }
          return a.sort - b.sort;
        });
      }
      if (index == 1) {
        form.value.shopIncomeRuleFiledMappingBaseBeans = res?.resultMappingList[item]?.sort(
          (a, b) => {
            if (a?.sort === b?.sort) {
              return a.id - b.id;
            }
            return a.sort - b.sort;
          }
        );
      }
    });
  };
  queryDictMap();
  getDetail();
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

  .relation-list {
    display: flex;
    gap: 12px;
    width: 100%;
  }
  .relation-list .el-form-item:nth-child(1) {
    width: 20%;
    min-width: 120px;
  }

  .relation-list .el-form-item:nth-child(2) {
    width: 25%;
  }

  .relation-list .el-form-item:nth-child(3) {
    width: 25%;
  }
  .relation-list .el-form-item:nth-child(4) {
    width: 25%;
  }

  .rule-item {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
    .el-link {
      width: 30px;
    }
  }
  .text-content {
    width: 100%;
    display: inline-flex;
    align-items: center;
    color: var(--bs-card-color);
    font-size: 12px;
    background-color: var(--el-input-bg-color, var(--bs-gray-100));
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    padding: 1px 7px;
    min-height: 38px;
  }

  :deep(.el-form-item--small .el-form-item__label) {
    line-height: 40px;
  }
</style>
