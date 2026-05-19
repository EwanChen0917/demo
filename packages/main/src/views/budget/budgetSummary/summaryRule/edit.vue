<template>
  <el-config-provider size="small">
    <el-form ref="formRef" :model="form" label-width="0" scroll-to-error>
      <KeenCard title="汇总表模板">
        <el-form-item
          prop="ruleName"
          :rules="[{ required: true, message: '请输入汇总表模板', trigger: 'blur' }]"
        >
          <el-input v-model="form.ruleName" class="w-300px" placeholder="请输入汇总表模板" />
        </el-form-item>
      </KeenCard>
      <KeenCard title="数据源配置">
        <el-space>
          <el-button type="primary" @click="addRow" size="small">新增行</el-button>
          <el-button type="primary" @click="addColumn" size="small">新增列名</el-button>
          <el-button type="danger" @click="deleteColumn" size="small">删除空白列名</el-button>
        </el-space>
        <el-table
          :data="form?.budgetSummaryInfoList"
          @cell-mouse-enter="handleMouseEnter"
          @cell-mouse-leave="handleMouseLeave"
          class="mt-4"
          v-if="tableShow"
        >
          <el-table-column type="index" label="序号" fixed="left">
            <template #default="{ $index }">
              <el-form-item>
                {{ $index + 1 }}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数据类型" prop="dataType" width="150" fixed="left">
            <template #default="{ row, $index }">
              <el-form-item>
                <!-- 数据类型: master-主数据 salver-附表 db-库表 -->
                <el-select v-model="row.dataType" placeholder="请选择" :disabled="$index == 0">
                  <el-option label="主数据" value="master" v-if="$index == 0" />
                  <el-option label="附表" value="salver" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数据源" width="235" prop="budgetTemplateCode" fixed="left">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`budgetSummaryInfoList.${$index}.budgetTemplateCode`"
                :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
              >
                <el-select
                  v-model="row.budgetTemplateCode"
                  @change="handleChange($index, row)"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in templateList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="item.name"
            :prop="item.key"
            v-for="(item, index) in columnData"
            :key="index"
            width="180"
          >
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`budgetSummaryInfoList.${$index}.${item.key}`"
                :rules="[
                   { required: $index == 0, message: '请选择列名', trigger: ['change', 'blur'] },
                   {
                      validator: (rule: any, value: any, callback: any) => {
                        let findIndex = mainDatalist.findIndex(item=>item.key===value)
                        if (findIndex===-1&&$index == 0) {
                          callback(new Error('列名不存在'))
                        } else {
                          callback()
                        }
                      },
                      trigger: 'blur',
                      },
                  ]"
              >
                <!-- 主数据选择指标 -->
                <el-select
                  v-model="row[item.key]"
                  @change="
                    (val) =>
                      (row[item.keyName] = mainDatalist.find((res) => {
                        return res.key === val;
                      })?.value)
                  "
                  placeholder="请选择"
                  clearable
                  v-if="$index === 0"
                >
                  <el-option
                    v-for="item in mainDatalist"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
                <!-- 附表选择数据源对应模版字段 -->
                <DataFieldSelect
                  v-model="row[item.key]"
                  @change="(val) => (row[item.keyName] = val)"
                  :code="row.budgetTemplateCode"
                  placeholder="请选择"
                  v-else
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-link
                  type="danger"
                  :disabled="$index === 0"
                  underline="never"
                  @click="deleteRow(row, $index)"
                >
                  删除
                </el-link>
              </el-form-item>
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
            :name="index == 0 ? '汇总表字段取值配置' : item.budgetTemplateName"
          >
            <div class="mt-4" v-if="tableValue == '汇总表字段取值配置'">
              <el-space>
                <el-button type="primary" @click="addFieldRow" size="small">新增指标</el-button>
                <div class="tip-red">
                  提示：因涉及取数引用，指标名称不允许修改；如需调整，需删除，重新新增指标，进行配置！！！
                </div>
              </el-space>
              <div class="mt-4">
                <el-input
                  v-model.trim="fieldSearchName"
                  placeholder="搜索指标"
                  class="w-350px"
                  clearable
                  @keyup.enter="searchFieldNameList"
                  @blur="searchFieldNameList"
                  @clear="searchFieldNameList"
                >
                  <template #prefix>
                    <SvgIconSearch />
                  </template>
                </el-input>
              </div>
              <el-form-item label-width="110px" label="规则识别码：" disabled class="mt-4">
                <el-input v-model="form.ruleCode" disabled placeholder="可自动生成" />
              </el-form-item>
              <div class="table-box">
                <ul class="table-header table-tr">
                  <li v-for="(item, index) in fieldTitleData" :key="index">
                    {{ item.name }}
                  </li>
                </ul>
                <div
                  class="table-tr no-data"
                  v-if="form?.budgetSummaryRuleFiledMappingBaseBeans.length == 0"
                >
                  请新增指标
                </div>
                <div
                  class="table-tr no-data"
                  v-if="
                    filedMappingBaseBeans.length == 0 &&
                    form?.budgetSummaryRuleFiledMappingBaseBeans.length !== 0
                  "
                >
                  暂未搜到相关数据
                </div>
                <draggable
                  :list="filedMappingBaseBeans"
                  ghost-class="ghost"
                  chosen-class="chosenClass"
                  animation="300"
                  :sort="filedMappingBaseBeans.length > 1"
                  handle=".drag-handle"
                  item-key="lineNum"
                  style="max-height: 600px; overflow-y: auto"
                  @end="removed"
                >
                  <template #item="{ element, index }">
                    <ul
                      class="table-tr"
                      :class="{ highlight: highlightNum === element.lineNum }"
                      @click="getHighlight(element)"
                    >
                      <li>
                        <el-form-item>
                          {{ element.fieldName }}
                        </el-form-item>
                      </li>
                      <li>
                        <div class="rule-content">
                          {{ getShowRule(element) }}
                        </div>
                      </li>
                      <li>
                        <el-link
                          type="primary"
                          underline="never"
                          style="margin-top: 15px"
                          @click="setConditionAndValue(element, index)"
                        >
                          设置
                        </el-link>
                      </li>
                      <li>
                        <el-checkbox
                          v-model="element.sharedBoundary"
                          true-value="after"
                          false-value="before"
                          size="large"
                          label=""
                          style="margin-top: 6px"
                          @change="sharedBoundaryChange(element)"
                        />
                      </li>
                      <li width="150px">
                        <ElTooltip
                          popper-class="action_tool_tip"
                          placement="top"
                          effect="light"
                          content="移动"
                        >
                          <div
                            @click="getHighlight(element)"
                            @mousedown="getHighlight(element)"
                            style="margin-top: 5px"
                            class="me-4 action-button btn btn-sm btn-icon btn-light btn-active-light-primary drag-icon drag-handle"
                            v-if="fieldSearchName == ''"
                          >
                            <SvgIcon
                              @click="getHighlight(element)"
                              @mousedown="getHighlight(element)"
                              icon="drag"
                              class="svg-icon svg-icon-4"
                            />
                          </div>
                        </ElTooltip>
                        <el-link
                          type="danger"
                          :disabled="element.disabled"
                          underline="never"
                          style="margin-top: 15px"
                          @click="deleteRowFiledMappingBaseBeans(index, element)"
                        >
                          删除
                        </el-link>
                      </li>
                    </ul>
                  </template>
                </draggable>
              </div>
            </div>
            <!-- 附表取值配置 -->
            <TableValueSetList
              ref="tableValueSetRef"
              :tableValueSetData="tableValueSetData"
              @success="handleConditionSuccess"
              @changeSubYearmonth="changeSubYearmonth"
              v-if="tableValue !== '汇总表字段取值配置' && tableValue"
            />
          </el-tab-pane>
        </el-tabs>
      </KeenCard>
    </el-form>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
      </el-space>
    </div>
    <!-- 取数规则设置 -->
  </el-config-provider>
  <ConditionAndValueDialog
    ref="conditionAndValueDialogRef"
    @success="handleConditionAndValueSuccess"
    @changeSubYearmonth="changeSubYearmonth"
  />
  <!-- 新增指标 -->
  <AddFieldDialog ref="addFieldDialogRef" @success="addFieldRowData" />
</template>

<script setup lang="ts" name="budgetSummaryRuleEdit">
  import draggable from 'vuedraggable';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import TableValueSetList from '@/views/budget/budgetSummary/summaryRule/components/tableValueSet.vue';
  import AddFieldDialog from '@/views/budget/budgetSummary/summaryRule/components/addFieldDialog.vue';
  import {
    logicTypeMap,
    codeMainType,
    fileType,
    sharedBoundaryType,
  } from '@/views/budget/budgetSummary/enum';
  import { financeSystemApi, budgetApi } from '@/api';
  import ConditionAndValueDialog from '@/views/budget/budgetSummary/summaryRule/components/conditionAndValueDialog.vue';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  import { uploadFileToOss } from './util';
  import { useStore } from '@/store/modules/useStore';
  import dayjs from 'dayjs';

  const store = useStore();
  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const fieldTitleData = [
    { name: '指标', prop: '1' },
    { name: '取数规则', prop: '2' },
    { name: '取数规则设置', prop: '3' },
    { name: '分摊后计算', prop: '3' },
    { name: '操作', prop: '4' },
  ];

  const form = ref({
    budgetSummaryInfoList: [
      {
        budgetSummaryInfoColumnList: [
          {
            budgetInfoCode: '',
            columnCode: '',
            columnName: '',
            sort: 0,
            key: 0,
          },
        ],
        budgetTemplateCode: '',
        budgetTemplateCodeOld: '',
        budgetTemplateName: '',
        budgetTemplateNameOld: '',
        chooseMonthType: 0,
        chooseMonthTypeDesc: '',
        code: '',
        dataType: 'master',
        dataTypeDesc: '主数据',
        name: '汇总表字段取值配置',
        monthColumn: '',
        monthFormat: '',
        ruleCode: '',
        sort: 0,
        fileType: fileType.主数据分摊前,
        subYearmonth: 0,
        subYearmonthColumns: '',
        tableName: '',
      },
    ],
    budgetSummaryRuleApportionMappingBeans: [
      //附表配置
      // {
      //   budgetSummaryRuleConditionBeanList: [//附表多行
      //     {
      //       budgetSummaryRuleApportionPickValueBeans: [//取值映射多行
      //         {
      //           conditionFormula: '',
      //           conditionGroupCode: '',
      //           fieldCode: '',
      //           id: 0,
      //           incomeRuleConditionBeans: [
      //             {
      //               columnName: '',
      //               dataSource: 0,
      //               fileType: 0,
      //               groupExp: '',
      //               leftParenthesis: '',
      //               logic: '',
      //               operator: '',
      //               rightParenthesis: '',
      //               sort: 0,
      //               value: '',
      //             },
      //           ],
      //           pickValueCode: '',
      //           ruleCode: '',
      //           sourceColumnCode: '',
      //           sourceColumnName: '',
      //           subYearmonth: 0,
      //           subYearmonthColumns: '',
      //           targetColums: [
      //             {
      //               columnCode: '',
      //               columnName: '',
      //             },
      //           ],
      //         },
      //       ],
      //       budgetSummaryRuleSubMonthBean: {
      //         monthColumn: '',
      //         monthFormat: '',
      //         subYearmonth: 0,
      //         subYearmonthColumns: '',
      //       },
      //       columnName: '',
      //       conditionFormula: '',
      //       conditionGroupCode: '',
      //       dataSource: 0,
      //       dictCode: '',
      //       fieldCode: '',
      //       fieldName: '',
      //       fileType: 0,
      //       id: 0,
      //       incomeRuleConditionBeans: [//通用条件
      //         {
      //           columnName: '',
      //           dataSource: 0,
      //           fileType: 0,
      //           groupExp: '',
      //           leftParenthesis: '',
      //           logic: '',
      //           operator: '',
      //           rightParenthesis: '',
      //           sort: 0,
      //           value: '',
      //         },
      //       ],
      //       value: '',//通用分摊
      //       valueFormula: '',
      //       valueFormula2: '',
      //       valueUsedColumns: [],//值用到的列
      //       valueType: 0,
      //     },
      //   ],
      //   budgetSummaryRuleSubMonthBean: {
      //     monthColumn: '',
      //     monthFormat: '',
      //     subYearmonth: 0,
      //     subYearmonthColumns: '',
      //   },
      //   fieldCode: '',
      //   fieldName: '',
      //   fileType: 0,
      //   sharedBoundary: '',
      //   sharedBoundaryDesc: '',
      //   sort: 0,
      //   templateCode: '',
      // },
    ],
    budgetSummaryRuleFiledMappingBaseBeans: [],
    createTime: '',
    remark: '',
    id: '',
    ruleCode: '',
    ruleName: '',
    status: 0,
    statusDesc: '',
    updateTime: '',
  });
  const formRef = ref(null);
  const fieldSearchName = ref();
  const filedMappingBaseBeans = ref([]);
  const columnData = ref([{ name: '列名', key: 'column_1', keyName: `column__1__name` }]);
  const tableValue = ref('汇总表字段取值配置');
  const mappingBeans = ref([]); //附表分摊
  const fileTypeNum = ref(1); //数据源sort
  const tableShow = ref(true); //表格刷新
  const mainDatalist = ref([]);
  const tableValueList = computed(() => {
    let arr =
      form.value?.budgetSummaryInfoList?.filter(
        (item) => item.budgetTemplateCode || item.dataType == 'master'
      ) || [];
    arr = arr.map((res, index) => {
      return {
        ...res,
        label: `${index == 0 ? '汇总表字段取值配置' : `附表-${res.budgetTemplateName}`}`,
      };
    });
    return arr;
  });

  const conditionAndValueDialogRef = ref(null);
  const addFieldDialogRef = ref(null);

  const highlightNum = ref();
  const getHighlight = (row) => {
    highlightNum.value = row.lineNum;
    // console.log(highlightNum.value);
  };

  // 查询数据源附表（预算模板）--对应列名
  const templateList = ref([]);
  const getTemplateList = async () => {
    const res = await budgetApi.financeBudgetSchemeTemplateQueryList({});
    templateList.value = res.recordList;
    if (templateList.value.length) {
      // localStorage.removeItem('budgetSummaryRuleFieldsList');
      // templateList.value.forEach((item) => {
      //   getListData(item.code, item.name);
      // });
    }
    tableShow.value = false;
    setTimeout(() => {
      tableShow.value = true;
    }, 1500);
    templateListData(); // 设置数据源是否可选
  };
  getTemplateList();
  const getListData = async (code, name) => {
    let budgetSummaryRuleFieldsList = [];
    let data = [];
    if (!code) {
      return;
    }
    const res = await budgetApi.financeBudgetSchemeTemplateQueryDetail({
      templateCode: code,
    });
    data = res.map((item) => {
      return { value: item.cellCnName, key: item.cellFieldName };
    });

    budgetSummaryRuleFieldsList.push({ code: code, name: name, data: data });
    let list = localStorage.getItem('budgetSummaryRuleFieldsList');
    list = JSON.parse(list);
    if (list && list.length) {
      let findIndex = list.findIndex((item) => item.code === code);
      if (findIndex === -1) {
        list = list.concat(budgetSummaryRuleFieldsList);
        localStorage.setItem('budgetSummaryRuleFieldsList', JSON.stringify(list));
      }
    } else {
      localStorage.setItem(
        'budgetSummaryRuleFieldsList',
        JSON.stringify(budgetSummaryRuleFieldsList)
      );
    }
  };
  //搜索指标
  const searchFieldNameList = () => {
    filedMappingBaseBeans.value = form.value.budgetSummaryRuleFiledMappingBaseBeans.filter(
      (res) => {
        return res.fieldName.includes(fieldSearchName.value);
      }
    );
  };
  //拖拽指标
  const removed = () => {
    form.value.budgetSummaryRuleFiledMappingBaseBeans = filedMappingBaseBeans.value;
  };

  // 查询详情
  const getDetail = async () => {
    if (!route?.query?.ruleCode) return;
    const res = await financeSystemApi.financeBudgetRuleQueryDetail({
      ruleCode: route?.query?.ruleCode,
    });
    form.value = res;
    // localStorage.removeItem('budgetSummaryRuleFieldsList'); //清空选择下拉本地数据
    //动态列名赋值回显
    columnData.value = [];
    form.value.budgetSummaryInfoList[0].budgetSummaryInfoColumnList.forEach((col) => {
      const num = Math.random().toString(36).substr(2, 10);
      columnData.value.push({
        name: '列名',
        key: `column__${num}`,
        keyName: `column__${num}__name`,
      });
    });

    fileTypeNum.value = form.value.budgetSummaryInfoList.length; //fileType起始值
    form.value.budgetSummaryInfoList.forEach((item, index) => {
      Reflect.set(item, 'budgetTemplateCodeOld', item.budgetTemplateCode); //记录原始值
      Reflect.set(item, 'budgetTemplateNameOld', item.budgetTemplateName); //记录原始值
      Reflect.set(item, 'fileType', index == 0 ? '1' : `${index + 1}`); //给budgetSummaryInfoList 数据源层级的sort, 汇总表字段取值映射 固定1, 勾选分摊后固定给0
      if (columnData.value?.length) {
        columnData.value.forEach((col, i) => {
          item[`${col.key}`] = item.budgetSummaryInfoColumnList[i]?.columnCode || '';
          item[`${col.key}__name`] = item.budgetSummaryInfoColumnList[i]?.columnName || '';
        });
      }
      getListData(item.budgetTemplateCode, item.budgetTemplateName); //列名下拉
    });
    form.value.budgetSummaryRuleFiledMappingBaseBeans.forEach((item, index) => {
      const num = Math.random().toString(36).substr(2, 10);
      Reflect.set(item, 'lineNum', num); //行唯一值
      Reflect.set(
        item,
        'fileType',
        item.sharedBoundary == sharedBoundaryType.分摊后
          ? fileType.主数据分摊后
          : fileType.主数据分摊前
      );
    });
    form.value.budgetSummaryRuleApportionMappingBeans.forEach((item, index) => {
      if (item?.budgetSummaryRuleConditionBeanList?.length) {
        item.budgetSummaryRuleConditionBeanList.forEach((row) => {
          if (row.value !== '') {
            let obj = JSON.parse(row.value);
            let objValue = {
              groupFields: obj.groupFields,
              weightField: {
                first: obj.weightField.split('###')[0],
                second: obj.weightField.split('###')[1],
                secondName: obj.weightField.split('###')[2],
              },
              isDefault: obj.isDefault,
              defaultAvgValue: obj.defaultAvgValue,
              isReverse: obj.isReverse,
            };
            row = Object.assign(row, objValue);
          }
        });
      }
    });
    tableValueSetData.value = form.value.budgetSummaryInfoList[0];
    tableValue.value = '汇总表字段取值配置';
    mappingBeans.value = form.value.budgetSummaryRuleApportionMappingBeans;
    filedMappingBaseBeans.value = form.value.budgetSummaryRuleFiledMappingBaseBeans;
    fieldSearchName.value = '';
    setMainDatalist(); // 主数据所有指标
    templateListData(); // 设置数据源是否可选
  };
  getDetail();
  // 添加行
  const addRow = () => {
    const num = Math.random().toString(36).substr(2, 10);
    fileTypeNum.value++;
    form.value.budgetSummaryInfoList.push({
      lineNum: `row_${num}`,
      fileType: `${fileTypeNum.value}`,
      dataType: 'salver',
      ruleCode: '',
      budgetTemplateCode: '',
      budgetTemplateCodeOld: '',
      budgetTemplateNameOld: '',
      budgetTemplateName: '',
      chooseMonthType: 0,
      budgetSummaryInfoColumnList: [],
      budgetSummaryRuleSubMonthBean: {
        monthFormat: '',
        monthColumn: '',
        monthColumnName: '',
        subYearmonth: 0, //拆分成一年12个月 0-否 1-是
      },
    });
    formRef.value?.clearValidate();
  };
  // 删除数据源配置行
  const deleteRow = async (row, index) => {
    if (row.budgetTemplateName && mappingBeans.value.length) {
      if (!haveEdit(index, row)) {
        deleteRowData(index);
        return;
      }
      const isConfirmed = await swal.confirm(
        `删除会导致【附表-${row.budgetTemplateName}】已配置列名、取值配置数据被清空，请确认是否继续？`
      );
      if (isConfirmed) {
        form.value.budgetSummaryInfoList.forEach((item, i) => {
          if (i > 0) {
            item.type = `附表${i}`;
          }
        });
        deleteRowData(index);
      }
    } else {
      deleteRowData(index);
    }
    formRef.value?.clearValidate();
  };
  const deleteRowData = (index) => {
    if (tableValue.value == form.value.budgetSummaryInfoList[index].budgetTemplateName) {
      tableValue.value = '汇总表字段取值配置';
    }
    form.value.budgetSummaryInfoList.splice(index, 1);
    if (mappingBeans.value.length) {
      mappingBeans.value.splice(index - 1, 1);
    }
    templateListData(); // 设置数据源是否可选
  };
  // 删除指标行
  const deleteRowFiledMappingBaseBeans = async (index, element) => {
    console.log('element', element);
    const fieldCode = filedMappingBaseBeans.value[index]?.fieldCode;
    const lineNum = filedMappingBaseBeans.value[index]?.lineNum;
    if (
      element?.budgetSummaryRuleConditionBeanList?.length ||
      element.sharedBoundary == sharedBoundaryType.分摊后
    ) {
      const isConfirmed = await swal.confirm(
        '删除“指标”会导致所有已配置列名相关的条件及公式等清空，请确认是否继续？'
      );
      if (isConfirmed) {
        filedMappingBaseBeans.value.splice(index, 1);
        // deleteRowFiledMappingBaseBeans_(lineNum);
        columnData.value.forEach((item) => {
          let row = form.value.budgetSummaryInfoList[0];
          if (row[item.key] == fieldCode) {
            row[item.key] = '';
            row[item.name] = '';
          }
        });
      }
    } else {
      filedMappingBaseBeans.value.splice(index, 1);
      // deleteRowFiledMappingBaseBeans_(lineNum);
    }

    setMainDatalist(); // 主数据所有指标
  };
  const deleteRowFiledMappingBaseBeans_ = (lineNum) => {
    let findIndex = form.value.budgetSummaryRuleFiledMappingBaseBeans.findIndex((res) => {
      return res.lineNum == lineNum;
    });
    form.value.budgetSummaryRuleFiledMappingBaseBeans.splice(findIndex, 1);
  };
  // 添加列名
  const addColumn = () => {
    const num = Math.random().toString(36).substr(2, 10);
    columnData.value.push({
      name: '列名',
      key: `column__${num}`,
      keyName: `column__${num}__name`,
    });
  };
  // 删除空白列名
  const deleteColumn = () => {
    columnData.value = columnData.value.filter((item) => {
      return form.value.budgetSummaryInfoList.find((res) => {
        return res[item.key];
      });
    });
    formRef.value?.clearValidate();
  };
  // 新增指标
  const addFieldRow = () => {
    if (!form.value.budgetSummaryInfoList[0].budgetTemplateCode) {
      ElMessage.warning('请先配置主数据数据源');
      return;
    }
    console.log(form.value.budgetSummaryInfoList[0].budgetTemplateCode, mainDatalist.value);
    addFieldDialogRef.value?.open(
      form.value.budgetSummaryInfoList[0].budgetTemplateCode,
      mainDatalist.value
    );
  };

  const addFieldList = (arr) => {
    arr.forEach((obj) => {
      const num = Math.random().toString(36).substr(2, 10);
      form.value.budgetSummaryRuleFiledMappingBaseBeans.push({
        lineNum: num,
        fieldName: obj.fieldName,
        fieldCode: obj.fieldCode,
        name: '',
        sharedBoundary: 'before',
        fileType: fileType.主数据分摊前, //给budgetSummaryInfoList 数据源层级的sort, 汇总表字段取值映射 固定1, 勾选分摊后固定给0
        sort: 1,
        templateCode: '',
        budgetSummaryRuleSubMonthBean: {
          monthColumn: '',
          monthFormat: '',
          subYearmonthColumns: '',
          subYearmonth: 0,
        },
      });
    });
  };
  const addFieldRowData = async (arr) => {
    await addFieldList(arr);
    setMainDatalist(); // 主数据所有指标
    filedMappingBaseBeans.value = form.value.budgetSummaryRuleFiledMappingBaseBeans;
    fieldSearchName.value = '';
  };
  const tableValueSetData = ref();
  // 点击tab页
  const handleTabClick = (pane) => {
    tableValueSetData.value = form.value?.budgetSummaryInfoList?.find(
      (res) => res.budgetTemplateName == pane?.props?.name
    );
    if (tableValueSetData.value && mappingBeans.value.length) {
      const index = form.value?.budgetSummaryInfoList?.findIndex((res) => {
        return res.budgetTemplateCode == tableValueSetData.value.budgetTemplateCode;
      });
      if (mappingBeans.value[index - 1]) {
        checkFieldNameclearData('附表列名', index - 1);
        tableValueSetData.value.budgetSummaryRuleConditionBeanList =
          mappingBeans.value[index - 1].budgetSummaryRuleConditionBeanList;
      }
    } else {
      tableValueSetData.value = form.value.budgetSummaryInfoList[0];
    }
    setMainDatalist(); // 主数据所有指标
    filedMappingBaseBeans.value = form.value.budgetSummaryRuleFiledMappingBaseBeans;
    fieldSearchName.value = '';
    console.log(tableValueSetData.value, 'tab页', tableValue.value);
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
    let name =
      sharedBoundary === sharedBoundaryType.分摊后
        ? codeMainType.汇总表名
        : tableValueSetData.value.budgetTemplateName;
    if (row.valueType === 10) {
      return `${name}"${columnName}"`;
    } else if (row.valueType === 11) {
      return `${name}"${columnName}" (${row?.value?.split('###')[0]}-${
        row?.value?.split('###')[1]
      })`;
    } else if (row.valueType === 12) {
      return `${name}"${columnName}" (${row?.value?.split('###')[0]}, ${
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
  // 去重
  const uniqueArray = (arr) => {
    const map = new Map();
    return arr.filter(
      (item) => !map.has(JSON.stringify(item)) && map.set(JSON.stringify(item), true)
    );
  };
  // 主数据所有指标

  const setMainDatalist = () => {
    mainDatalist.value = form.value.budgetSummaryRuleFiledMappingBaseBeans
      .filter((item) => {
        return item.fieldCode;
      })
      .map((res) => {
        return {
          key: res.fieldCode,
          value: res.fieldName,
        };
      });
    mainDatalist.value = uniqueArray(mainDatalist.value);
    console.log('主数据所有指标', mainDatalist.value);
    let list = localStorage.getItem('budgetSummaryRuleFieldsList');
    list = JSON.parse(list);
    if (list && list.length) {
      let findIndex = list.findIndex((item) => item.code === codeMainType.汇总表);
      if (findIndex > -1) {
        list[findIndex].data = mainDatalist.value;
      } else {
        list = list.concat([
          {
            code: codeMainType.汇总表,
            name: '汇总表字段取值配置',
            data: mainDatalist.value,
          },
        ]);
      }
      localStorage.setItem('budgetSummaryRuleFieldsList', JSON.stringify(list));
    }
    checkFieldNameclearData('主数据列名', 0);
  };
  // 取值配置-当前指标行
  const curIdx = ref();
  // 主数据设置条件和值
  const setConditionAndValue = (item, index) => {
    if (!form.value.budgetSummaryInfoList[0].budgetTemplateCode) {
      ElMessage.warning('请先配置主数据数据源');
      return;
    }
    if (!item.fieldCode) {
      ElMessage.warning('请先配置指标');
      return;
    }
    curIdx.value = index;
    tableValueSetData.value = form.value.budgetSummaryInfoList[0];
    setMainDatalist(); // 主数据所有指标
    conditionAndValueDialogRef.value?.open(
      cloneDeep(item),
      cloneDeep(form.value.budgetSummaryInfoList[0])
    );
  };

  // 取数规则设置成功回调
  const handleConditionAndValueSuccess = (row) => {
    filedMappingBaseBeans.value[curIdx.value].budgetSummaryRuleConditionBeanList = row;
    form.value.budgetSummaryRuleFiledMappingBaseBeans.forEach((res) => {
      if (res.lineNum == filedMappingBaseBeans.value[curIdx.value].lineNum) {
        res.budgetSummaryRuleConditionBeanList = row;
      }
    });
  };
  // 修改分摊后计算
  const sharedBoundaryChange = async (row) => {
    if (row.budgetSummaryRuleConditionBeanList?.length) {
      const isConfirmed = await swal.confirm(
        '修改“分摊后计算”会导致取该行的数规则设置清空，请确认是否继续？'
      );
      if (!isConfirmed) {
        ElMessage.info('已取消修改');
        // 设置为原来的值
        row.sharedBoundary = row.sharedBoundary == 'before' ? 'after' : 'before';

        return;
      } else {
        row.budgetSummaryRuleConditionBeanList = [];
      }
    }
    row.fileType = row.sharedBoundary == 'before' ? fileType.主数据分摊前 : fileType.主数据分摊后;
    form.value.budgetSummaryRuleFiledMappingBaseBeans.forEach((res) => {
      if (res.lineNum == row.lineNum) {
        res = row;
      }
    });
  };

  // 附表通用分摊设置
  const handleConditionSuccess = (row) => {
    const index = form.value.budgetSummaryInfoList.findIndex((res) => {
      return res.budgetTemplateCode == tableValueSetData.value.budgetTemplateCode;
    });
    mappingBeans.value[index - 1].fieldCode = tableValueSetData.value.budgetTemplateCode;
    mappingBeans.value[index - 1].fieldName = tableValueSetData.value.budgetTemplateCode;
    mappingBeans.value[index - 1].fileType = tableValueSetData.value.fileType;
    mappingBeans.value[index - 1].templateCode = tableValueSetData.value.budgetTemplateCode;
    mappingBeans.value[index - 1].budgetSummaryRuleConditionBeanList = row;
    mappingBeans.value[index - 1].sort = index + 1;
  };
  // 设置拆分月份成功回调
  const changeSubYearmonth = (type, subYearmonth) => {
    if (type == '主数据') {
      form.value.budgetSummaryRuleFiledMappingBaseBeans[
        curIdx.value
      ].budgetSummaryRuleSubMonthBean.subYearmonth = subYearmonth;
    } else {
      const index = form.value.budgetSummaryInfoList.findIndex((res) => {
        return res.budgetTemplateCode == tableValueSetData.value.budgetTemplateCode;
      });
      mappingBeans.value[index - 1].budgetSummaryRuleSubMonthBean = subYearmonth;
      form.value.budgetSummaryInfoList[index].budgetSummaryRuleSubMonthBean = subYearmonth;
    }
  };

  // 展示规则
  const getShowRule = (row) => {
    const result = [];
    row?.budgetSummaryRuleConditionBeanList?.forEach((item) => {
      if (item?.incomeRuleConditionBeans?.length) {
        result.push(
          `如果 ${getShowData(
            item?.incomeRuleConditionBeans,
            row.sharedBoundary
          )} 则 ${getShowValue(item, row.sharedBoundary)}`
        );
      } else result.push(getShowValue(item, row.sharedBoundary));
    });
    return result?.join('；');
  };

  // 保存
  const saveLoading = ref(false);
  const save = async () => {
    console.log(form.value);
    // checkFileType();
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      let budgetSummaryInfoList = form.value.budgetSummaryInfoList.map((item, index) => {
        checkFieldNameclearData('附表列名', index - 1);
        let columnList = [];
        columnData.value.forEach((column, i) => {
          columnList.push({
            columnCode: item[column.key],
            columnName: item[column.keyName],
            sort: i + 1,
          });
        });
        let chooseMonthType =
          mappingBeans.value[index - 1]?.budgetSummaryRuleSubMonthBean?.subYearmonth === 1 ? 1 : 0;
        return {
          budgetTemplateCode: item.budgetTemplateCode,
          budgetTemplateName: item.budgetTemplateName,
          dataType: item.dataType,
          fileType: item.fileType,
          chooseMonthType: chooseMonthType, //选择月份类型: 0-月字段 1-拆分月
          sort: index + 1, //排序
          budgetSummaryInfoColumnList: columnList,
          budgetSummaryRuleSubMonthBean:
            index > 0 ? mappingBeans.value[index - 1]?.budgetSummaryRuleSubMonthBean : null,
        };
      });
      // 加templateCode字段
      form.value.budgetSummaryRuleFiledMappingBaseBeans.forEach((res, i) => {
        res.fileType =
          res.sharedBoundary === sharedBoundaryType.分摊后
            ? fileType.主数据分摊后
            : fileType.主数据分摊前;
        res.sort = i + 1;
        Reflect.set(res, 'templateCode', form.value.budgetSummaryInfoList[0].budgetTemplateCode);
      });
      mappingBeans.value.forEach((res, index) => {
        res.sort = index + 1;
        Reflect.set(
          res,
          'templateCode',
          form.value.budgetSummaryInfoList[index + 1].budgetTemplateCode
        );
        //去除空行
        res.budgetSummaryRuleConditionBeanList = res.budgetSummaryRuleConditionBeanList.filter(
          (item) => {
            return (
              item.incomeRuleConditionBeans?.length ||
              item.value ||
              item.remark ||
              item.budgetSummaryRuleApportionPickValueBeans?.length
            );
          }
        );
      });
      let params = {
        budgetSummaryInfoList: budgetSummaryInfoList, //数据源配置
        budgetSummaryRuleApportionMappingBeans: mappingBeans.value, //附表分摊详情
        budgetSummaryRuleFiledMappingBaseBeans: form.value.budgetSummaryRuleFiledMappingBaseBeans, //数据映射规则(主数据)
        remark: form.value.ruleCode,
        ruleName: form.value.ruleName,
        ruleCode: form.value.ruleCode,
        id: form.value.id,
        status: form.value.status,
      };
      console.log('保存参数', params);
      const buildFile = async () => {
        const jsonString = JSON.stringify(params);
        const blob = new Blob([jsonString], { type: 'application/text' });
        const userName = store?.userInfo?.name;
        // 替换点文件名字中的特殊字符
        const fileName = `预算汇总规则_${userName}_${form.value.ruleCode}_${dayjs().format(
          'YYYYMMDDHHmmss'
        )}.json`.replace(/[\\/:*?"<>|]/g, '');
        const file = new File([blob], fileName, { type: 'application/text' });

        return { file, fileName };
      };

      const { fileName, file } = await buildFile();
      const { ossKey } = await uploadFileToOss({
        isSaveBudget: true,
        fileName,
        file,
        directory: '财务-预算汇算规则',
      });
      if (!ossKey) {
        return Promise.reject('保存失败');
      }

      await financeSystemApi.financeBudgetRuleSaveOrUpdateByOss({
        ossKey,
        fileName,
      });
      // await financeSystemApi.financeBudgetRuleSaveOrUpdate(param);
      ElMessage.success('保存成功');
      closeTab();
    } finally {
      saveLoading.value = false;
    }
  };

  //附表数据默认设置
  const getMappingBeansData = (index) => {
    if (!mappingBeans.value[index]) {
      const item = form.value.budgetSummaryInfoList[index];
      mappingBeans.value[index - 1] = {
        fieldCode: item.budgetTemplateCode,
        fieldName: item.budgetTemplateCode,
        fileType: item.fileType,
        templateCode: item.budgetTemplateCode,
        sort: index + 1,
        budgetSummaryRuleConditionBeanList: [
          //附表多行
          {
            dataSource: 1,
            fieldCode: item.budgetTemplateCode,
            fieldName: item.budgetTemplateCode,
            incomeRuleConditionBeans: [], //通用条件
            budgetSummaryRuleApportionPickValueBeans: [], //取值映射多行
            budgetSummaryRuleSubMonthBean: {
              monthFormat: '',
              monthColumn: '',
              monthColumnName: '',
              subYearmonth: 0, //拆分成一年12个月 0-否 1-是
            },
            valueFormula: '',
            value: '',
            groupFields: [
              {
                type: item.fileType,
                field: '',
                fieldName: '',
                addValue: false,
                compareType: '',
                compareValue: '',
              },
            ],
            weightField: {
              first: item.fileType,
              second: '',
              secondName: '',
            },
            isDefault: false, //当未匹配对应值时，需按条件值新增一行 ture&false
            defaultAvgValue: false, //当权重字段汇总为0时，取平均值 ture&false
            isReverse: false, //分摊取反数值 ture&false
          },
        ],
      };
    }
  };
  const clearSetData = (index, row) => {
    templateListData(); // 设置数据源是否可选
    //需要清除
    //清除列名
    columnData.value.forEach((item) => {
      if (form.value.budgetSummaryInfoList[index][item.key]) {
        form.value.budgetSummaryInfoList[index][item.key] = '';
        form.value.budgetSummaryInfoList[index][item.keyName] = '';
      }
    });
    if (row.dataType === 'master') {
      // 主数据配置
      form.value.budgetSummaryRuleFiledMappingBaseBeans = [];
      mainDatalist.value = [];
      let list = localStorage.getItem('budgetSummaryRuleFieldsList');
      list = JSON.parse(list);
      if (list && list.length) {
        let findIndex = list.findIndex((item) => item.code === codeMainType.汇总表);
        if (findIndex > -1) {
          list[findIndex].data = mainDatalist.value;
        }
        localStorage.setItem('budgetSummaryRuleFieldsList', JSON.stringify(list));
      }
    } else {
      //清除附表-取值配置
      mappingBeans.value[index - 1] = null;
    }

    // 设置tab-name
    row.budgetTemplateName = templateList.value.find(
      (res) => res.code == row.budgetTemplateCode
    )?.name;
    row.budgetTemplateCodeOld = row.budgetTemplateCode; //记录旧值
    row.budgetTemplateNameOld = row.budgetTemplateName; //记录旧值
    getListData(row.budgetTemplateCode, row.budgetTemplateName); //列名下拉
    // tab-name 被删除，默认到主表
    if (
      tableValueList.value.length > 0 &&
      !tableValueList.value.find((res) => {
        tableValue.value == res.budgetTemplateName;
      })
    ) {
      tableValue.value = '汇总表字段取值配置';
    }
    nextTick(() => {
      formRef.value?.clearValidate();
    });
  };
  const haveEdit = (index, row) => {
    let edit = false; //是否有配置
    if (columnData.value?.length) {
      columnData.value.forEach((col) => {
        if (form.value.budgetSummaryInfoList[index][`${col.key}`]) {
          edit = true;
        }
      });
    }
    if (row.dataType === 'master' && mainDatalist.value.length) {
      edit = true;
    } else {
      let data = mappingBeans.value[index - 1]?.budgetSummaryRuleSubMonthBean;
      let conditionBeanList = mappingBeans.value[index - 1]?.budgetSummaryRuleConditionBeanList;
      if (data?.subYearmonth) {
        edit = true;
      }
      if (conditionBeanList?.length) {
        conditionBeanList.forEach((item) => {
          if (
            item?.budgetSummaryRuleApportionPickValueBeans?.length ||
            item?.incomeRuleConditionBeans?.length ||
            item?.value
          ) {
            edit = true;
          }
        });
      }
    }
    return edit;
  };
  //修改数据，引用到的设置都清除
  const handleChange = async (index, row) => {
    if (row.budgetTemplateCodeOld && haveEdit(index, row)) {
      const isConfirmed = await swal.confirm(
        `修改“数据源”会导致${row.budgetTemplateNameOld}已配置列名、取值配置数据被清空，请确认是否继续？`
      );
      if (!isConfirmed) {
        ElMessage.info('已取消修改');
        // 设置为原来的值
        form.value.budgetSummaryInfoList[index].budgetTemplateCode = row.budgetTemplateCodeOld;
        form.value.budgetSummaryInfoList[index].budgetTemplateName = row.budgetTemplateNameOld;
        return;
      } else {
        clearSetData(index, row);
      }
    } else {
      clearSetData(index, row);
    }
    if (index > 0) {
      getMappingBeansData(index); //附表数据设置
    }
    if (index === 0) {
      setMainDatalist(); // 主数据所有指标
      filedMappingBaseBeans.value = form.value.budgetSummaryRuleFiledMappingBaseBeans;
      fieldSearchName.value = '';
    }
  };

  //数据源检查，不存在指标，列名清空
  const checkFieldNameclearData = (type, index) => {
    if (type == '主数据列名') {
      columnData.value.forEach((item) => {
        let row = form.value.budgetSummaryInfoList[0];
        if (row[item.key] && checkName(row[item.key])) {
          row[item.key] = '';
          row[item.name] = '';
        }
      });
    }
    if (type == '附表列名') {
      let conditionBeanList = mappingBeans.value[index]?.budgetSummaryRuleConditionBeanList;
      if (conditionBeanList?.length) {
        conditionBeanList.forEach((item) => {
          if (item?.groupFields?.length) {
            item?.groupFields?.forEach((res) => {
              if (res.field && checkName(res.field)) {
                res.field = '';
                res.fieldName = '';
                item.value = '';
              }
            });
          }
          if (item?.weightField?.second && checkName(item?.weightField?.second)) {
            item.weightField.second = '';
            item.weightField.secondName = '';
            item.value = '';
          }
          // const text = {
          //   groupFields: item.groupFields,
          //   weightField: `${item.weightField.first}###${item.weightField.second}###${item.weightField.secondName}`,
          //   isDefault: item.isDefault,
          //   defaultAvgValue: item.defaultAvgValue,
          //   isReverse: false, //分摊取反数值 ture&false
          // };
          // item.value = JSON.stringify(text);
          if (item?.budgetSummaryRuleApportionPickValueBeans?.length) {
            item.budgetSummaryRuleApportionPickValueBeans.forEach((row) => {
              if (row?.targetColums?.length) {
                if (row.targetColums[0].columnCode && checkName(row.targetColums[0].columnCode)) {
                  row.targetColums[0].columnCode = '';
                  row.targetColums[0].columnName = '';
                }
              }
            });
          }
        });
        // console.log('附表列名清除', conditionBeanList);
      }
    }
  };
  //指标是否存在
  const checkName = (key) => {
    let findIndex = mainDatalist.value.findIndex((res) => res.key === key);
    return findIndex === -1;
  };
  // 取消
  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    closeTab();
  };

  //返回列表
  const closeTab = () => {
    closeTabAndRefresh('budgetSummaryRule');
    router.push({
      name: 'budgetSummaryRule',
    });
  };

  // 鼠标移入
  const handleMouseEnter = (row, column, cell, event) => {
    if (column.label === '序号' || column.label === '操作') return;
    cell.classList.add('cell-hover');
  };
  // 鼠标移出
  const handleMouseLeave = (row, column, cell, event) => {
    if (column.label === '序号' || column.label === '操作') return;
    cell.classList.remove('cell-hover');
  };
  // 设置数据源是否可选
  const templateListData = () => {
    templateList.value.forEach((res) => {
      let find = form.value.budgetSummaryInfoList.find(
        (item) => item.budgetTemplateCode == res.code
      );
      if (find) {
        res.disabled = true;
      } else {
        res.disabled = false;
      }
    });
  };
</script>

<style>
  .budget-body-class .el-tabs__header {
    padding-left: 0 !important;
  }
</style>

<style scoped lang="scss">
  .table-box {
    width: 100%;

    .table-header {
      height: 40px;
      font-size: 12px;
      font-family: 'PingFang SC Medium';
      font-weight: 600;
      background-color: var(---N1, #f7f7f7);
      border-bottom: var(--el-table-border);
      padding: 0;
      margin: 0;
    }
  }
  .table-tr {
    width: 100%;
    display: inline-block;
    clear: both;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #ebeef5;
    li {
      float: left;
      list-style-type: none;
      padding: 9px 12px;
    }

    li:first-child {
      width: 220px;
    }
    li:nth-child(2) {
      width: calc(100% - 620px);
    }
    li:nth-child(3) {
      width: 150px;
    }
    li:nth-child(4) {
      width: 150px;
    }
    li:nth-child(5) {
      width: 100px;
    }
  }
  .table-tr:hover {
    background: var(--el-color-primary-light-9);
  }
  .table-header:hover {
    background: var(---N1, #f7f7f7);
  }
  .chosenClass,
  .highlight,
  .ghost {
    background: var(--el-color-primary-light-9);
  }
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
    width: 30%;
  }

  .relation-list .el-form-item:nth-child(3) {
    width: 30%;
  }
  .relation-list .el-form-item:nth-child(4) {
    width: 20%;
  }

  .rule-item {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
    .rule-content {
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
    .el-link {
      width: 30px;
    }
  }

  :deep(.el-form-item--small .el-form-item__label) {
    line-height: 40px;
  }

  :deep(.cell-hover) {
    border: 1px solid var(--el-color-primary) !important;
    border-radius: 8px;
    cursor: pointer;
  }
  :deep(.cell-click) {
    border: 1px solid var(--el-color-primary) !important;
    border-radius: 8px;
    cursor: pointer;
  }
  :deep(.el-select--small .el-select__wrapper) {
    min-height: 32px;
  }
  .file-item-operation {
    display: flex;
    align-items: center;
    gap: 20px;
    .drag-handle {
      cursor: move;
      padding: 4px;
      font-size: 18px;
    }
  }
  .no-data {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: var(---N6, #999);
  }
  .tip-red {
    font-size: 12px;
    color: var(--el-color-danger);
  }
</style>
