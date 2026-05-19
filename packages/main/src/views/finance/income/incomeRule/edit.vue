<template>
  <el-config-provider size="small">
    <KeenCard title="单据类型">
      <el-select
        v-model="ruleTypeValue"
        :disabled="ruleTypeDisabled"
        @change="changeRuleType"
        placeholder="单据类型"
      >
        <el-option
          v-for="(item, index) in billTypeMap"
          :value="item.value"
          :label="item.name"
          :key="index"
        />
      </el-select>
    </KeenCard>
    <KeenCard title="数据源配置">
      <el-form ref="formRef" :model="form" label-width="0" scroll-to-error>
        <el-space>
          <el-button type="primary" @click="addRow" size="small">添加行</el-button>
          <el-button type="primary" @click="batchAdd" :disabled="!curColumn">批量填充</el-button>
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
        </el-space>
        <el-table
          :data="form?.incomeRuleDetailShopBeans"
          @cell-mouse-enter="handleMouseEnter"
          @cell-mouse-leave="handleMouseLeave"
          @cell-click="handleCellClick"
          class="mt-4"
        >
          <el-table-column type="index" label="序号">
            <template #default="{ $index }">
              <el-form-item>
                {{ $index + 1 }}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="店铺" prop="shop" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.shop`"
                :rules="[{ required: true, message: '请选择店铺' }]"
              >
                <ProductShopSelectFinance
                  style="width: 100%"
                  v-model="row.shop"
                  placeholder="店铺名称"
                  teleported
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数据源" min-width="150" prop="settleFile.dataSource">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-select
                  style="width: 120px"
                  v-model="row.settleFile.dataSource"
                  @change="handleChange($index, row.settleFile.dataSource, 1)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(val, key) in dataTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="结算数据" min-width="150" prop="settleFile.filePath">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.settleFile.filePath`"
                :rules="[{ required: true, message: '请选择' }]"
                v-if="row.settleFile.dataSource === dataSourceType.库表"
              >
                <el-select
                  style="width: 120px"
                  v-model="row.settleFile.filePath"
                  @change="changeFilePath($index, row.settleFile.filePath, 1)"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in incomeRuleTable"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.settleFile.filePath`"
                :rules="[{ required: true, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.settleFile.filePath" placeholder="请输入文件路径" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="页签名" min-width="150" prop="settleFile.sheetName">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-input
                  v-model="row.settleFile.sheetName"
                  :disabled="row.settleFile.dataSource === dataSourceType.库表"
                  placeholder="请输入页签名"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="结算列名行标识" min-width="150" prop="settleFile.excelHeadRules">
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
            <template #default="{ row, $index }">
              <el-form-item v-if="row.settleFile.dataSource === dataSourceType.库表">
                <el-input
                  v-model="row.settleFile.excelHeadRules"
                  :disabled="row.settleFile.dataSource === dataSourceType.库表"
                  placeholder="示例：A = Data"
                />
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.settleFile.excelHeadRules`"
                :rules="[{ required: true, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.settleFile.excelHeadRules" placeholder="示例：A = Data" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数据剔除" min-width="150" prop="filterDataConditions">
            <template #default="{ row, $index }">
              <div class="d-flex justify-content-between align-items-center">
                <div class="text-break fs-7">
                  <OverflowTooltip :content="getShowData(row?.filterDataConditions)" :line="2" />
                </div>
                <el-link
                  type="primary"
                  :icon="Setting"
                  :underline="false"
                  :disabled="!row?.shop"
                  @click="setCondition(row, $index)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="数据源" min-width="150" prop="infoFile1.dataSource">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-select
                  style="width: 120px"
                  v-model="row.infoFile1.dataSource"
                  @change="handleChange($index, row.infoFile1.dataSource, 2)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(val, key) in dataTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="信息数据一" min-width="150" prop="infoFile1.filePath">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile1.filePath`"
                :rules="[{ required: selectedFirst, message: '请选择' }]"
                v-if="row.infoFile1.dataSource === dataSourceType.库表"
              >
                <el-select
                  style="width: 120px"
                  v-model="row.infoFile1.filePath"
                  @change="changeFilePath($index, row.infoFile1.filePath, 2)"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in incomeRuleTable"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile1.filePath`"
                :rules="[{ required: selectedFirst, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.infoFile1.filePath" placeholder="请输入文件路径" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="页签名" min-width="150" prop="infoFile1.sheetName">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-input
                  v-model="row.infoFile1.sheetName"
                  :disabled="row.infoFile1.dataSource === dataSourceType.库表"
                  placeholder="请输入页签名"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="信一列名行标识" min-width="150" prop="infoFile1.excelHeadRules">
            <template #default="{ row, $index }">
              <el-form-item v-if="row.infoFile1.dataSource === dataSourceType.库表">
                <el-input
                  v-model="row.infoFile1.excelHeadRules"
                  :disabled="row.infoFile1.dataSource === dataSourceType.库表"
                  placeholder="示例：A = Data"
                />
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile1.excelHeadRules`"
                :rules="[{ required: selectedFirst, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.infoFile1.excelHeadRules" placeholder="示例：A = Data" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="数据源" min-width="150" prop="infoFile2.dataSource">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-select
                  style="width: 120px"
                  v-model="row.infoFile2.dataSource"
                  @change="handleChange($index, row.infoFile2.dataSource, 3)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(val, key) in dataTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="信息数据二" min-width="150" prop="infoFile2.filePath">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile2.filePath`"
                :rules="[{ required: selectedSecond, message: '请选择' }]"
                v-if="row.infoFile2.dataSource === dataSourceType.库表"
              >
                <el-select
                  style="width: 120px"
                  v-model="row.infoFile2.filePath"
                  @change="changeFilePath($index, row.infoFile2.filePath, 3)"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in incomeRuleTable"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile2.filePath`"
                :rules="[{ required: selectedSecond, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.infoFile2.filePath" placeholder="请输入文件路径" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="页签名" min-width="150" prop="infoFile2.sheetName">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-input
                  v-model="row.infoFile2.sheetName"
                  :disabled="row.infoFile2.dataSource === dataSourceType.库表"
                  placeholder="请输入页签名"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="信二列名行标识" min-width="150" prop="infoFile2.excelHeadRules">
            <template #default="{ row, $index }">
              <el-form-item v-if="row.infoFile2.dataSource === dataSourceType.库表">
                <el-input
                  v-model="row.infoFile2.excelHeadRules"
                  :disabled="row.infoFile2.dataSource === dataSourceType.库表"
                  placeholder="示例：A = Data"
                />
              </el-form-item>
              <el-form-item
                :prop="`incomeRuleDetailShopBeans.${$index}.infoFile2.excelHeadRules`"
                :rules="[{ required: selectedSecond, message: '请输入' }]"
                v-else
              >
                <el-input v-model="row.infoFile2.excelHeadRules" placeholder="示例：A = Data" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row, $index }">
              <el-form-item>
                <el-link
                  type="danger"
                  :disabled="$index === 0"
                  :underline="false"
                  @click="form.incomeRuleDetailShopBeans.splice($index, 1)"
                >
                  删除
                </el-link>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-checkbox v-model="showSecond" label="第二表关联" />
          <div v-if="showSecond">
            <div>
              <el-form-item style="display: inline-block">
                <el-checkbox
                  v-model="form.firstIncomeRuleRelevanceBean.matchMore"
                  :true-value="1"
                  :false-value="0"
                  label="取多条关联数据"
                />
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="`勾选后，如源数据（结算数据）匹配到信息数据一的N (N>1) 条数据，则源数据的一行复制成N行，以实现和匹配到的结果数据一一对应`"
                >
                  <QuestionFilled
                    class="question-icon"
                    style="margin-top: -3px; margin-left: 5px"
                  />
                </el-tooltip>
              </el-form-item>
              <el-form-item style="display: inline-block; margin-left: 20px">
                <el-checkbox
                  v-model="form.firstIncomeRuleRelevanceBean.firstMatch"
                  :true-value="1"
                  :false-value="0"
                  @change="changeFirstMatch(1)"
                  label="优先匹配"
                />
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="`信息一数据存在“优先列名”值相同的行的情况下，则仅匹配该行数据`"
                >
                  <QuestionFilled
                    class="question-icon"
                    style="margin-top: -3px; margin-left: 5px"
                  />
                </el-tooltip>
              </el-form-item>
            </div>
            <div class="relation-list">
              <el-form-item>
                <el-select v-model="form.firstIncomeRuleRelevanceBean.leftFileType" disabled>
                  <el-option
                    v-for="(val, key) in fileTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`firstIncomeRuleRelevanceBean.leftFileValue[0]`"
                :rules="[
                  {
                    required: showSecond,
                    message: getSelectShow(form.firstIncomeRuleRelevanceBean.leftFileType)
                      ? '请选择'
                      : '请输入',
                  },
                ]"
              >
                <DataFieldSelect
                  placeholder="列名（必录）"
                  v-model="form.firstIncomeRuleRelevanceBean.leftFileValue[0]"
                  :fileType="form.firstIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="getSelectShow(form.firstIncomeRuleRelevanceBean.leftFileType) && updateShow"
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.leftFileValue[0]"
                  placeholder="列名（必录）"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item>
                <DataFieldSelect
                  placeholder="列名"
                  v-model="form.firstIncomeRuleRelevanceBean.leftFileValue[1]"
                  :fileType="form.firstIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="getSelectShow(form.firstIncomeRuleRelevanceBean.leftFileType) && updateShow"
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.leftFileValue[1]"
                  placeholder="列名"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item v-if="form.firstIncomeRuleRelevanceBean.firstMatch">
                <DataFieldSelect
                  placeholder="优先列名"
                  v-model="form.firstIncomeRuleRelevanceBean.firstMatchColumnName[0]"
                  :fileType="form.firstIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="getSelectShow(form.firstIncomeRuleRelevanceBean.leftFileType) && updateShow"
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.firstMatchColumnName[0]"
                  placeholder="优先列名"
                  clearable
                  v-else
                />
              </el-form-item>
            </div>
            <div class="relation-list">
              <el-form-item>
                <el-select v-model="form.firstIncomeRuleRelevanceBean.rightFileType" disabled>
                  <el-option
                    v-for="(val, key) in fileTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`firstIncomeRuleRelevanceBean.rightFileValue[0]`"
                :rules="[
                  {
                    required: showSecond,
                    message: getSelectShow(form.firstIncomeRuleRelevanceBean.rightFileType)
                      ? '请选择'
                      : '请输入',
                  },
                ]"
              >
                <DataFieldSelect
                  placeholder="列名（必录）"
                  v-model="form.firstIncomeRuleRelevanceBean.rightFileValue[0]"
                  :fileType="form.firstIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.firstIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.rightFileValue[0]"
                  placeholder="列名（必录）"
                  v-else
                />
              </el-form-item>
              <el-form-item>
                <DataFieldSelect
                  placeholder="列名"
                  v-model="form.firstIncomeRuleRelevanceBean.rightFileValue[1]"
                  :fileType="form.firstIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.firstIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.rightFileValue[1]"
                  placeholder="列名"
                  v-else
                />
              </el-form-item>
              <el-form-item v-if="form.firstIncomeRuleRelevanceBean.firstMatch">
                <DataFieldSelect
                  placeholder="优先列名"
                  v-model="form.firstIncomeRuleRelevanceBean.firstMatchColumnName[1]"
                  :fileType="form.firstIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.firstIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.firstIncomeRuleRelevanceBean.firstMatchColumnName[1]"
                  placeholder="优先列名"
                  v-else
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div>
          <el-checkbox v-model="showThird" label="第三表关联" />
          <div v-if="showThird">
            <div>
              <el-form-item style="display: inline-block">
                <el-checkbox
                  v-model="form.secondIncomeRuleRelevanceBean.matchMore"
                  :true-value="1"
                  :false-value="0"
                  label="取多条关联数据"
                />
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="`勾选后，如源数据（结算数据和信息数据一组合的宽表）匹配到信息数据一的N (N>1) 条数据，则源数据的一行复制成N行，以实现和匹配到的结果数据一一对应`"
                >
                  <QuestionFilled
                    class="question-icon"
                    style="margin-top: -3px; margin-left: 5px"
                  />
                </el-tooltip>
              </el-form-item>
              <el-form-item style="display: inline-block; margin-left: 20px">
                <el-checkbox
                  v-model="form.secondIncomeRuleRelevanceBean.firstMatch"
                  :true-value="1"
                  :false-value="0"
                  @change="changeFirstMatch(2)"
                  label="优先匹配"
                />
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="`信息二数据存在“优先列名”值相同的行的情况下，则仅匹配该行数据`"
                >
                  <QuestionFilled
                    class="question-icon"
                    style="margin-top: -3px; margin-left: 5px"
                  />
                </el-tooltip>
              </el-form-item>
            </div>
            <div class="relation-list">
              <el-form-item>
                <el-select
                  v-model="form.secondIncomeRuleRelevanceBean.leftFileType"
                  placeholder="选择数据"
                >
                  <el-option :value="fileType.结算数据" label="结算数据" />
                  <el-option :value="fileType.信息数据一" label="信息数据一" />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`secondIncomeRuleRelevanceBean.leftFileValue[0]`"
                :rules="[
                  {
                    required: showThird,
                    message: getSelectShow(form.secondIncomeRuleRelevanceBean.leftFileType)
                      ? '请选择'
                      : '请输入',
                  },
                ]"
              >
                <DataFieldSelect
                  placeholder="列名（必录）"
                  v-model="form.secondIncomeRuleRelevanceBean.leftFileValue[0]"
                  :fileType="form.secondIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.leftFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.leftFileValue[0]"
                  placeholder="列名（必录）"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item>
                <DataFieldSelect
                  placeholder="列名"
                  v-model="form.secondIncomeRuleRelevanceBean.leftFileValue[1]"
                  :fileType="form.secondIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.leftFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.leftFileValue[1]"
                  placeholder="列名"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item v-if="form.secondIncomeRuleRelevanceBean.firstMatch">
                <DataFieldSelect
                  placeholder="优先列名"
                  v-model="form.secondIncomeRuleRelevanceBean.firstMatchColumnName[0]"
                  :fileType="form.secondIncomeRuleRelevanceBean.leftFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.leftFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.firstMatchColumnName[0]"
                  placeholder="优先列名"
                  clearable
                  v-else
                />
              </el-form-item>
            </div>
            <div class="relation-list">
              <el-form-item>
                <el-select v-model="form.secondIncomeRuleRelevanceBean.rightFileType" disabled>
                  <el-option
                    v-for="(val, key) in fileTypeMap"
                    :value="key"
                    :label="val"
                    :key="key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`secondIncomeRuleRelevanceBean.rightFileValue[0]`"
                :rules="[
                  {
                    required: showThird,
                    message: getSelectShow(form.secondIncomeRuleRelevanceBean.rightFileType)
                      ? '请选择'
                      : '请输入',
                  },
                ]"
              >
                <DataFieldSelect
                  placeholder="列名（必录）"
                  v-model="form.secondIncomeRuleRelevanceBean.rightFileValue[0]"
                  :fileType="form.secondIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.rightFileValue[0]"
                  placeholder="列名（必录）"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item>
                <DataFieldSelect
                  placeholder="列名"
                  v-model="form.secondIncomeRuleRelevanceBean.rightFileValue[1]"
                  :fileType="form.secondIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.rightFileValue[1]"
                  placeholder="列名"
                  clearable
                  v-else
                />
              </el-form-item>
              <el-form-item v-if="form.secondIncomeRuleRelevanceBean.firstMatch">
                <DataFieldSelect
                  placeholder="优先列名"
                  v-model="form.secondIncomeRuleRelevanceBean.firstMatchColumnName[1]"
                  :fileType="form.secondIncomeRuleRelevanceBean.rightFileType"
                  :fileData="form.incomeRuleDetailShopBeans[0]"
                  v-if="
                    getSelectShow(form.secondIncomeRuleRelevanceBean.rightFileType) && updateShow
                  "
                />
                <el-input
                  v-model.trim="form.secondIncomeRuleRelevanceBean.firstMatchColumnName[1]"
                  placeholder="优先列名"
                  clearable
                  v-else
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div>
          <el-checkbox v-model="showDict" label="业务字典关联" />
          <div v-if="showDict">
            <div v-for="(item, index) in form?.dictIncomeRuleRelevanceBeans" :key="index">
              <div class="relation-list">
                <el-form-item
                  :prop="`dictIncomeRuleRelevanceBeans[${index}].leftFileType`"
                  :rules="[{ required: showDict, message: '请选择' }]"
                >
                  <el-select
                    v-model="item.leftFileType"
                    @change="item.leftFileValue[0] = ''"
                    placeholder="选择数据"
                  >
                    <el-option
                      v-for="(val, key) in fileTypeMap"
                      :value="key"
                      :label="val"
                      :key="key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :prop="`dictIncomeRuleRelevanceBeans[${index}].leftFileValue[0]`"
                  :rules="[
                    {
                      required: showDict,
                      message: getSelectShow(item.leftFileType) ? '请选择' : '请输入',
                    },
                  ]"
                >
                  <DataFieldSelect
                    placeholder="列名（必录）"
                    v-model="item.leftFileValue[0]"
                    :fileType="item.leftFileType"
                    :fileData="form.incomeRuleDetailShopBeans[0]"
                    v-if="getSelectShow(item.leftFileType) && updateShow"
                  />
                  <el-input
                    v-model.trim="item.leftFileValue[0]"
                    placeholder="列名（必录）"
                    clearable
                    v-else
                  />
                </el-form-item>
                <el-form-item />
              </div>
              <div class="relation-list">
                <el-form-item
                  :prop="`dictIncomeRuleRelevanceBeans[${index}].rightFileCode`"
                  :rules="[{ required: showDict, message: '请选择' }]"
                >
                  <el-select
                    v-model="item.rightFileCode"
                    placeholder="选择业务字典"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="dict in dictList"
                      :value="dict?.code"
                      :label="dict?.name"
                      :key="dict?.id"
                      :disabled="
                        form?.dictIncomeRuleRelevanceBeans?.find(
                          (k) => k?.rightFileCode === dict?.code
                        )
                      "
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :prop="`dictIncomeRuleRelevanceBeans[${index}].rightFileValue[0]`"
                  :rules="[{ required: showDict, message: '请选择' }]"
                >
                  <el-select v-model="item.rightFileValue[0]" placeholder="选择字段">
                    <el-option
                      v-for="(val, key) in dictValueTypeMap"
                      :value="key"
                      :label="val"
                      :key="key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-space>
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="
                        form.dictIncomeRuleRelevanceBeans?.push({
                          leftFileValue: [''],
                          rightFileValue: [''],
                          rightFileType: fileType.业务字典,
                        })
                      "
                    >
                      添加
                    </el-link>
                    <el-link
                      type="danger"
                      :underline="false"
                      v-if="form.dictIncomeRuleRelevanceBeans?.length > 1"
                      @click="form.dictIncomeRuleRelevanceBeans.splice(index, 1)"
                    >
                      删除
                    </el-link>
                  </el-space>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </KeenCard>
    <KeenCard title="单据字段取值配置">
      <el-form ref="ruleFormRef" :model="form" label-width="160px" scroll-to-error>
        <el-form-item label="规则识别码：">
          <el-input
            style="margin-right: 38px"
            v-model="form.ruleCode"
            :disabled="route?.query?.ruleCode"
            placeholder="可自动生成"
          />
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
            <div class="rule-content">{{ getShowRule(item) }}</div>
            <el-link
              type="primary"
              :underline="false"
              @click="setConditionAndValue(item, index, 1)"
            >
              设置
            </el-link>
          </div>
        </el-form-item>
      </el-form>
    </KeenCard>
    <KeenCard title="汇总校验字段取值配置" v-if="form?.shopIncomeRuleFiledMappingBaseBeans?.length">
      <el-form ref="ruleFormRef2" :model="form" label-width="160px" scroll-to-error>
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
            <!-- <el-input disabled :value="getShowRule(item)" /> -->
            <div class="rule-content">{{ getShowRule(item) }}</div>
            <el-link
              type="primary"
              :underline="false"
              @click="setConditionAndValue(item, index, 2)"
            >
              设置
            </el-link>
          </div>
        </el-form-item>
      </el-form>
    </KeenCard>
    <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!formDisabled">
      <el-space>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
      </el-space>
    </div>
  </el-config-provider>
  <ConditionDialog ref="conditionDialogRef" @success="handleConditionSuccess" />
  <ConditionAndValueDialog
    ref="conditionAndValueDialogRef"
    @success="handleConditionAndValueSuccess"
  />
</template>

<script setup lang="ts" name="financeBillsRuleEdit">
  import { QuestionFilled, Setting } from '@element-plus/icons-vue';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import ConditionDialog from '@/views/finance/income/incomeRule/components/conditionDialog.vue';
  import {
    fileType,
    fileTypeMap,
    dataTypeMap,
    logicTypeMap,
    dictValueTypeMap,
    setValueType,
    dataSourceType,
    ruleType,
    financeBillsRuleTypeMap,
    dictRuleMap,
  } from '@/views/finance/income/incomeRule/enum';
  import { financeApi, financeSystemApi, platformApi } from '@/api';
  import ConditionAndValueDialog from '@/views/finance/income/incomeRule/components/conditionAndValueDialog.vue';
  import DataFieldSelect from '@/views/finance/income/incomeRule/components/dataFieldSelect.vue';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  import { number } from 'echarts';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const form = ref({
    incomeRuleDetailShopBeans: [
      {
        lineNum: 1,
        shop: '',
        settleFile: { dataSource: dataSourceType.共享盘 },
        infoFile1: { dataSource: dataSourceType.共享盘 },
        infoFile2: { dataSource: dataSourceType.共享盘 },
        filterDataConditions: [],
      },
    ],
    firstIncomeRuleRelevanceBean: {
      leftFileType: fileType.结算数据,
      rightFileType: fileType.信息数据一,
      leftFileValue: ['', ''],
      rightFileValue: ['', ''],
      firstMatch: 0,
      firstMatchColumnName: ['', ''],
    },
    secondIncomeRuleRelevanceBean: {
      leftFileType: '',
      rightFileType: fileType.信息数据二,
      leftFileValue: ['', ''],
      rightFileValue: ['', ''],
      firstMatch: 0,
      firstMatchColumnName: ['', ''],
    },
    dictIncomeRuleRelevanceBeans: [
      {
        leftFileValue: [''],
        rightFileType: fileType.业务字典,
        rightFileValue: [''],
      },
    ],
    ruleCode: '',
    shopIncomeRuleFiledMappingBaseBeans: [],
  });
  const formRef = ref(null);
  const ruleFormRef = ref(null);
  const ruleFormRef2 = ref(null);
  const conditionDialogRef = ref(null);
  const conditionAndValueDialogRef = ref(null);
  const showSecond = ref(false);
  const showThird = ref(false);
  const showDict = ref(false);
  const billTypeMap = ref([
    { name: '收款单', value: ruleType.收款单规则 },
    { name: '收入结算单', value: ruleType.结算单规则 },
  ]);
  const ruleTypeValue = ref(ruleType.结算单规则);
  const ruleTypePage = ref();
  const ruleTypeDisabled = ref(true);

  const initData = () => {
    if (route.name === 'payBackRuleAdd' || route.name === 'payBackRuleEdit') {
      ruleTypeValue.value = ruleType.收款单规则;
      ruleTypePage.value = '收款单';
    } else if (route.name === 'financeBillsRuleAdd' || route.name === 'financeBillsRuleEdit') {
      ruleTypeValue.value = ruleType.平台入库明细;
      billTypeMap.value = financeBillsRuleTypeMap;
      ruleTypeDisabled.value = route.name !== 'financeBillsRuleAdd';
      ruleTypePage.value = '单据推送';
    } else {
      ruleTypeValue.value = ruleType.结算单规则;
      ruleTypePage.value = '结算单';
    }
  };
  initData();

  // 平台库存规则修改单据类型请求单据字段
  const changeRuleType = () => {
    queryDictMap();
  };

  const incomeRuleTable = ref<any[]>([]);
  // 查询库表对应的结算数据下拉
  const getIncomeRuleTableOptions = async () => {
    const res = await financeSystemApi.financePlatformOrderQueryTableConfigs();
    incomeRuleTable.value = res as [];
    localStorage.removeItem('incomeRuleQueryTableFieldsList');
    if (incomeRuleTable.value.length) {
      incomeRuleTable.value.forEach((item) => {
        getListData(item.code);
      });
    }
  };
  const getListData = async (filePath) => {
    const res = await financeSystemApi.financeIncomeRuleQueryTableFields({
      tableName: filePath,
    });
    let incomeRuleQueryTableFieldsList = [];
    incomeRuleQueryTableFieldsList.push({ filePath, data: res.recordList });
    let list = localStorage.getItem('incomeRuleQueryTableFieldsList');
    list = JSON.parse(list);
    if (list && list.length) {
      incomeRuleQueryTableFieldsList = incomeRuleQueryTableFieldsList.concat(list);
    }
    localStorage.setItem(
      'incomeRuleQueryTableFieldsList',
      JSON.stringify(incomeRuleQueryTableFieldsList)
    );
  };
  getIncomeRuleTableOptions();

  // 获取规则字典
  const queryDictMap = async () => {
    const code = dictRuleMap[ruleTypeValue.value];
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
    setCurrencyType(); // 新增收入规则，回款规则，后续其他规则可能不需要
    getDetail();
  };
  queryDictMap();
  // 新增收入规则，回款规则 包含币别的默认默认币别选项
  const setCurrencyType = () => {
    if (!route?.query?.ruleCode) {
      // 新增
      form.value?.incomeRuleFiledMappingBaseBeans?.forEach((item) => {
        if (item.fieldName.includes('币别')) {
          const incomeRuleFiledMappingBaseBeansArr = [
            {
              valueFormula: '',
              splitByLen: {
                first: 1,
                second: 'len',
              },
              splitByString: {
                first: '',
                second: '',
              },
              groupFields: [
                {
                  first: '',
                  second: '',
                },
              ],
              weightField: {
                first: '',
                second: '',
              },
              fileType: '',
              columnName: '',
              dictCode: '',
              value: '按店铺取“店铺映射关系”币别',
              calValue: '',
              valueType: 5,
              constValue: '按店铺取“店铺映射关系”币别',
              fieldCode: item.fieldCode,
              fieldName: item.fieldName,
            },
          ];
          Reflect.set(item, 'incomeRuleConditionBeanList', incomeRuleFiledMappingBaseBeansArr);
        }
      });
    }
  };

  // 查询详情
  const getDetail = async () => {
    if (!route?.query?.ruleCode) return;
    const res = await financeSystemApi.financeIncomeRuleQueryDetail({
      ruleCode: route?.query?.ruleCode,
    });
    console.log(res);
    form.value = {
      ...res,
      incomeRuleDetailShopBeans: res?.incomeRuleDetailShopBeans?.map((item) => {
        return {
          ...item,
          settleFile: {
            ...item.settleFile,
            excelHeadRules: item.settleFile?.excelHeadRules?.join(','),
            dataSource:
              item.settleFile?.dataSource !== null
                ? `${item.settleFile.dataSource}`
                : dataSourceType.共享盘,
            filePathOld: item.settleFile?.filePath,
          },
          infoFile1: {
            ...item.infoFile1,
            excelHeadRules: item.infoFile1?.excelHeadRules?.join(','),
            dataSource:
              item.infoFile1?.dataSource !== null
                ? `${item.infoFile1.dataSource}`
                : dataSourceType.共享盘,
            filePathOld: item.infoFile1?.filePath,
          },
          infoFile2: {
            ...item.infoFile2,
            excelHeadRules: item.infoFile2?.excelHeadRules?.join(','),
            dataSource:
              item.infoFile2?.dataSource !== null
                ? `${item.infoFile2.dataSource}`
                : dataSourceType.共享盘,
            filePathOld: item.infoFile2?.filePath,
          },
        };
      }),
    };
    showSecond.value = !!form.value.firstIncomeRuleRelevanceBean?.leftFileType;
    showThird.value = !!form.value.secondIncomeRuleRelevanceBean?.leftFileType;
    showDict.value = form.value.dictIncomeRuleRelevanceBeans?.length > 0;
    if (!form.value.firstIncomeRuleRelevanceBean.firstMatch) {
      form.value.firstIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    }
    if (!form.value.secondIncomeRuleRelevanceBean.firstMatch) {
      form.value.secondIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    }
    if (!showSecond.value) {
      form.value.firstIncomeRuleRelevanceBean.leftFileType = fileType.结算数据;
      form.value.firstIncomeRuleRelevanceBean.rightFileType = fileType.信息数据一;
    }
    if (!showThird.value) {
      form.value.secondIncomeRuleRelevanceBean.rightFileType = fileType.信息数据二;
    }
    // 无业务字典关联时，默认添加一行
    if (!showDict.value) {
      form.value.dictIncomeRuleRelevanceBeans.push({
        leftFileValue: [''],
        rightFileType: fileType.业务字典,
        rightFileValue: [''],
      });
    }
    ruleTypeValue.value = form.value.ruleType;
    console.log(form.value);
    updateShow.value = false;
    setTimeout(() => {
      updateShow.value = true;
    }, 200);
  };
  // 添加行
  const addRow = () => {
    const val = form.value.incomeRuleDetailShopBeans[0].settleFile.dataSource;
    const val1 = form.value.incomeRuleDetailShopBeans[0].infoFile1.dataSource;
    const val2 = form.value.incomeRuleDetailShopBeans[0].infoFile2.dataSource;
    const filePath =
      val == dataSourceType.库表 ? form.value.incomeRuleDetailShopBeans[0].settleFile.filePath : '';
    const filePath1 =
      val1 == dataSourceType.库表 ? form.value.incomeRuleDetailShopBeans[0].infoFile1.filePath : '';
    const filePath2 =
      val2 == dataSourceType.库表 ? form.value.incomeRuleDetailShopBeans[0].infoFile2.filePath : '';
    form.value.incomeRuleDetailShopBeans.push({
      lineNum: form.value.incomeRuleDetailShopBeans.length + 1,
      shop: '',
      settleFile: {
        dataSource: val,
        filePath,
        filePathOld: filePath,
      },
      infoFile1: { dataSource: val1, filePath: filePath1, filePathOld: filePath1 },
      infoFile2: { dataSource: val2, filePath: filePath2, filePathOld: filePath2 },
    });
    formRef.value?.clearValidate();
  };

  // 优先匹配取消勾选清空值
  const changeFirstMatch = (type) => {
    if (type == 1) {
      form.value.firstIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    } else {
      form.value.secondIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    }
  };

  // 数据剔除
  const curIdx = ref();
  const setCondition = (row, index) => {
    curIdx.value = index;
    conditionDialogRef.value?.open(
      cloneDeep(row),
      cloneDeep(form.value.incomeRuleDetailShopBeans[index])
    );
  };

  // 数据剔除成功回调
  const handleConditionSuccess = (row) => {
    form.value.incomeRuleDetailShopBeans[curIdx.value].filterDataConditions = row;
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
    let columnName = row?.columnName;
    if (row.dataSource == dataSourceType.库表) {
      columnName = getIncomeRuleTableName(row?.columnName);
    }
    if (row.valueType === 10) {
      return `${fileTypeMap[row?.fileType]}"${columnName}"`;
    }
    if (row.valueType === 11) {
      return `${fileTypeMap[row?.fileType]}"${columnName}" (${row?.value?.split('###')[0]}-${
        row?.value?.split('###')[1]
      })`;
    }
    if (row.valueType === 12) {
      return `${fileTypeMap[row?.fileType]}"${columnName}" (${row?.value?.split('###')[0]}, ${
        row?.value?.split('###')[1]
      })`;
    }
    if (row.valueType === 13) {
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
    }
    if (row.valueType === setValueType.取业务字典) {
      return `字典"${dictList.value?.find((item) => item.code === row?.dictCode)?.name}"${
        dictValueTypeMap[row?.value]
      }`;
    }
    return row?.value;
  };
  const setType = ref(1);
  // 设置条件和值
  const setConditionAndValue = (item, index, type) => {
    setType.value = type;
    curIdx.value = index;
    conditionAndValueDialogRef.value?.open(
      cloneDeep(item),
      cloneDeep(form.value.incomeRuleDetailShopBeans[0]),
      dictList.value
        ?.filter((k) =>
          form.value?.dictIncomeRuleRelevanceBeans?.some(
            (dict) =>
              dict?.rightFileCode === k?.code &&
              dict?.leftFileType &&
              dict?.leftFileValue?.[0] &&
              dict?.rightFileValue?.[0]
          )
        )
        ?.map((k) => {
          const info = form.value?.dictIncomeRuleRelevanceBeans?.find(
            (dict) => dict?.rightFileCode === k?.code
          );
          return {
            ...k,
            fileType: info?.leftFileType,
            columnName: info?.leftFileValue[0],
            value: info?.rightFileValue[0],
          };
        })
    );
  };

  // 设置条件和值成功回调
  const handleConditionAndValueSuccess = (row) => {
    if (setType.value == 1) {
      // 结算单字段配置
      form.value.incomeRuleFiledMappingBaseBeans[curIdx.value].incomeRuleConditionBeanList = row;
    } else {
      // 店铺字段配置
      form.value.shopIncomeRuleFiledMappingBaseBeans[curIdx.value].incomeRuleConditionBeanList =
        row;
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

  // 展示规则
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

  const selectedFirst = ref(false);
  const selectedSecond = ref(false);
  const checkFileType = () => {
    // 条件、值选择的文件类型，店铺信息对应的文件类型必填
    selectedFirst.value = false;
    selectedSecond.value = false;
    form.value?.incomeRuleFiledMappingBaseBeans?.forEach((item) => {
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.fileType === fileType.信息数据一 ||
            row?.incomeRuleConditionBeans?.some((rule) => rule?.fileType === fileType.信息数据一)
        )
      ) {
        selectedFirst.value = true;
      }
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.fileType === fileType.信息数据二 ||
            row?.incomeRuleConditionBeans?.some((rule) => rule?.fileType === fileType.信息数据二)
        )
      ) {
        selectedSecond.value = true;
      }
    });
    // 如果值选择了业务字典，业务字典关联必须勾选
    if (
      form.value?.incomeRuleFiledMappingBaseBeans?.some((item) =>
        item?.incomeRuleConditionBeanList?.some((row) => row?.valueType === setValueType.取业务字典)
      )
    ) {
      showDict.value = true;
    }
  };

  // 保存
  const saveLoading = ref(false);
  const save = async () => {
    console.log(form.value);
    checkFileType();

    const isValid = await Promise.all([
      formRef.value?.validate().catch(() => {
        false;
      }),
      ruleFormRef.value?.validate().catch(() => {
        false;
      }),
    ]);
    if (!isValid[0] || !isValid[1]) return;
    if (route.name === 'incomeRuleAdd' || route.name === 'incomeRuleEdit') {
      // 回款规则页面没有设置 ruleFormRef2
      const isValid2 = await ruleFormRef2.value?.validate().catch(() => {
        return false;
      });
      if (!isValid2) return;
    }
    if (!form.value.firstIncomeRuleRelevanceBean.leftFileValue[1] && showSecond.value) {
      form.value.firstIncomeRuleRelevanceBean.leftFileValue.splice(1, 1);
    }
    if (!form.value.firstIncomeRuleRelevanceBean.rightFileValue[1] && showSecond.value) {
      form.value.firstIncomeRuleRelevanceBean.rightFileValue.splice(1, 1);
    }
    if (!form.value.secondIncomeRuleRelevanceBean.leftFileValue[1] && showThird.value) {
      form.value.secondIncomeRuleRelevanceBean.leftFileValue.splice(1, 1);
    }
    if (!form.value.secondIncomeRuleRelevanceBean.rightFileValue[1] && showThird.value) {
      form.value.secondIncomeRuleRelevanceBean.rightFileValue.splice(1, 1);
    }
    if (!form.value.firstIncomeRuleRelevanceBean.firstMatch) {
      form.value.firstIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    }
    if (!form.value.secondIncomeRuleRelevanceBean.firstMatch) {
      form.value.secondIncomeRuleRelevanceBean.firstMatchColumnName = ['', ''];
    }
    try {
      saveLoading.value = true;
      await financeSystemApi.financeIncomeRuleSaveOrUpdate({
        ...form.value,
        ruleType: ruleTypeValue.value,
        incomeRuleDetailShopBeans: form.value.incomeRuleDetailShopBeans.map((item, index) => {
          return {
            ...item,
            lineNum: index + 1,
            settleFile: {
              ...item.settleFile,
              dataSource: Number(item.settleFile?.dataSource),
              filePath: item.settleFile?.filePath?.replace(/(?<!\\)\\(?!\\)/g, '\\\\')?.trim(),
              excelHeadRules: item.settleFile?.excelHeadRules
                ?.replace(/\s*=\s*/g, '=')
                ?.trim()
                ?.split(',')
                ?.filter((k) => k),
              extType: 'excel',
            },
            infoFile1: {
              ...item.infoFile1,
              dataSource: Number(item.infoFile1?.dataSource),
              filePath: item.infoFile1?.filePath?.replace(/(?<!\\)\\(?!\\)/g, '\\\\')?.trim(),
              excelHeadRules: item.infoFile1?.excelHeadRules
                ?.replace(/\s*=\s*/g, '=')
                ?.trim()
                ?.split(',')
                ?.filter((k) => k),
              extType: 'excel',
            },
            infoFile2: {
              ...item.infoFile2,
              dataSource: Number(item.infoFile2?.dataSource),
              filePath: item.infoFile2?.filePath?.replace(/(?<!\\)\\(?!\\)/g, '\\\\')?.trim(),
              excelHeadRules: item.infoFile2?.excelHeadRules
                ?.replace(/\s*=\s*/g, '=')
                ?.trim()
                ?.split(',')
                ?.filter((k) => k),
              extType: 'excel',
            },
          };
        }),
        firstIncomeRuleRelevanceBean: showSecond.value
          ? form.value.firstIncomeRuleRelevanceBean
          : {},
        secondIncomeRuleRelevanceBean: showThird.value
          ? form.value.secondIncomeRuleRelevanceBean
          : {},
        dictIncomeRuleRelevanceBeans: showDict.value ? form.value.dictIncomeRuleRelevanceBeans : [],
      });
      ElMessage.success('保存成功');
      closeTab();
    } finally {
      saveLoading.value = false;
    }
  };

  // 取消
  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    closeTab();
  };

  // 返回列表
  const closeTab = () => {
    if (ruleTypePage.value === '收款单') {
      closeTabAndRefresh('payBackRule');
      router.push({
        name: 'payBackRule',
      });
    } else if (ruleTypePage.value === '单据推送') {
      closeTabAndRefresh('financeBillsRule');
      router.push({
        name: 'financeBillsRule',
      });
    } else {
      closeTabAndRefresh('incomeRule');
      router.push({
        name: 'incomeRule',
      });
    }
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
  // 鼠标点击
  const curColumn = ref();
  const handleCellClick = (row, column, cell, event) => {
    if (column.label === '序号' || column.label === '操作') return;
    cell.classList.add('cell-click');
    curIdx.value = row?.lineNum - 1;
    curColumn.value = column?.property;
  };

  // 批量填充
  const batchAdd = () => {
    for (let i = curIdx.value + 1; i < form.value.incomeRuleDetailShopBeans.length; i++) {
      const property = curColumn.value?.split('.');
      if (property?.length > 1) {
        form.value.incomeRuleDetailShopBeans[i][property[0]][property[1]] =
          form.value.incomeRuleDetailShopBeans[curIdx.value][property[0]][property[1]];
      } else {
        form.value.incomeRuleDetailShopBeans[i][curColumn.value] =
          form.value.incomeRuleDetailShopBeans[curIdx.value][curColumn.value];
      }
    }
    curColumn.value = null;
  };

  document.addEventListener(
    'click',
    (e) => {
      if (e?.target?.innerText !== '批量填充') {
        curColumn.value = null;
      }
      const tdList = document.getElementsByClassName('el-table__cell');
      for (let i = 0; i < tdList.length; i++) {
        const td = tdList[i];
        if (td.classList.contains('cell-click')) {
          td.classList.remove('cell-click');
        }
      }
    },
    true
  );

  const haveEdit = (type) => {
    let edit = false; // 是否有配置
    form.value.incomeRuleDetailShopBeans.forEach((item) => {
      if (item?.filterDataConditions && item.filterDataConditions.length) {
        // 数据剔除
        const find = item.filterDataConditions.find((child) => {
          return child.fileType == `${type}`;
        });
        if (find) {
          edit = true;
        }
      }
      if (
        type == fileType.结算数据 &&
        (form.value.firstIncomeRuleRelevanceBean.leftFileValue[0] ||
          (form.value.secondIncomeRuleRelevanceBean.leftFileType == type &&
            form.value.secondIncomeRuleRelevanceBean.leftFileValue[0]))
      ) {
        edit = true;
      }
      if (
        type == fileType.信息数据一 &&
        (form.value.firstIncomeRuleRelevanceBean.rightFileValue[0] ||
          (form.value.secondIncomeRuleRelevanceBean.leftFileType == type &&
            form.value.secondIncomeRuleRelevanceBean.leftFileValue[0]))
      ) {
        edit = true;
      }
      if (
        type == fileType.信息数据二 &&
        form.value.secondIncomeRuleRelevanceBean.rightFileValue[0]
      ) {
        edit = true;
      }
    });
    form.value?.incomeRuleFiledMappingBaseBeans?.forEach((item) => {
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.valueType === 10 ||
            row?.valueType === 11 ||
            row?.valueType === 12 ||
            (row?.valueType === setValueType.计算 && row?.fileType !== fileType.业务字典) ||
            (row?.valueType === setValueType.文本 && row?.fileType !== fileType.业务字典)
        )
      ) {
        item?.incomeRuleConditionBeanList.forEach((r) => {
          if (
            type == r.fileType ||
            r?.incomeRuleConditionBeans?.some((child) => child.fileType == type)
          ) {
            edit = true;
          }
        });
      }
    });
    form.value?.shopIncomeRuleFiledMappingBaseBeans?.forEach((item) => {
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.valueType === 10 ||
            row?.valueType === 11 ||
            row?.valueType === 12 ||
            (row?.valueType === setValueType.计算 && row?.fileType !== fileType.业务字典) ||
            (row?.valueType === setValueType.文本 && row?.fileType !== fileType.业务字典)
        )
      ) {
        item?.incomeRuleConditionBeanList.forEach((r) => {
          if (
            type == r.fileType ||
            r?.incomeRuleConditionBeans?.some((child) => child.fileType == type)
          ) {
            edit = true;
          }
        });
      }
    });
    form.value.dictIncomeRuleRelevanceBeans.forEach((item) => {
      if (item.leftFileType == type && item.leftFileValue[0]) {
        edit = true;
      }
    });
    return edit;
  };

  const changeDataSource = (value, type, editType) => {
    form.value.incomeRuleDetailShopBeans.forEach((item) => {
      let arr = [];
      if (item?.filterDataConditions) {
        // 数据剔除
        arr = item.filterDataConditions.filter((child) => {
          return child.fileType !== `${type}`;
        });
        item.filterDataConditions = arr;
      }
      if (type == fileType.结算数据) {
        if (editType == '数据源') {
          item.settleFile.excelHeadRules = '';
          item.settleFile.filePath = '';
          item.settleFile.sheetName = '';
          item.settleFile.dataSource = value;
        } else {
          // 数据
          item.settleFile.filePath = value;
          item.settleFile.filePathOld = value;
        }
        form.value.firstIncomeRuleRelevanceBean.leftFileValue = ['', ''];
        if (form.value.secondIncomeRuleRelevanceBean.leftFileType == type) {
          form.value.secondIncomeRuleRelevanceBean.leftFileValue = ['', ''];
        }
      }
      if (type == fileType.信息数据一) {
        if (editType == '数据源') {
          item.infoFile1.excelHeadRules = '';
          item.infoFile1.filePath = '';
          item.infoFile1.sheetName = '';
          item.infoFile1.dataSource = value;
        } else {
          // 数据
          item.infoFile1.filePath = value;
          item.infoFile1.filePathOld = value;
        }
        form.value.firstIncomeRuleRelevanceBean.rightFileValue = ['', ''];
        if (form.value.secondIncomeRuleRelevanceBean.leftFileType == type) {
          form.value.secondIncomeRuleRelevanceBean.leftFileValue = ['', ''];
        }
      }
      if (type == fileType.信息数据二) {
        if (editType == '数据源') {
          item.infoFile2.excelHeadRules = '';
          item.infoFile2.filePath = '';
          item.infoFile2.sheetName = '';
          item.infoFile2.dataSource = value;
        } else {
          // 数据
          item.infoFile2.filePath = value;
          item.infoFile2.filePathOld = value;
        }
        form.value.secondIncomeRuleRelevanceBean.rightFileValue = ['', ''];
      }
    });
    form.value?.incomeRuleFiledMappingBaseBeans?.forEach((item) => {
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.valueType === 10 ||
            row?.valueType === 11 ||
            row?.valueType === 12 ||
            (row?.valueType === setValueType.计算 && row?.fileType !== fileType.业务字典) ||
            (row?.valueType === setValueType.文本 && row?.fileType !== fileType.业务字典)
        )
      ) {
        item?.incomeRuleConditionBeanList.forEach((r) => {
          if (
            type == r.fileType ||
            r?.incomeRuleConditionBeans?.some((child) => child.fileType == type)
          ) {
            item.incomeRuleConditionBeanList = [];
          }
        });
      }
    });
    form.value?.shopIncomeRuleFiledMappingBaseBeans?.forEach((item) => {
      if (
        item?.incomeRuleConditionBeanList?.some(
          (row) =>
            row?.valueType === 10 ||
            row?.valueType === 11 ||
            row?.valueType === 12 ||
            (row?.valueType === setValueType.计算 && row?.fileType !== fileType.业务字典) ||
            (row?.valueType === setValueType.文本 && row?.fileType !== fileType.业务字典)
        )
      ) {
        item?.incomeRuleConditionBeanList.forEach((r) => {
          if (
            type == r.fileType ||
            r?.incomeRuleConditionBeans?.some((child) => child.fileType == type)
          ) {
            item.incomeRuleConditionBeanList = [];
          }
        });
      }
    });
    form.value.dictIncomeRuleRelevanceBeans.forEach((item) => {
      if (item.leftFileType == type) {
        item.leftFileValue = [''];
      }
    });
    if (editType == '数据') {
      // 切换选择更新组件
      updateShow.value = false;
      setTimeout(() => {
        updateShow.value = true;
      }, 200);
    }
  };

  // 修改数据，引用到的设置都清除
  const handleChange = async (index, value, type) => {
    const edit = await haveEdit(type);
    if (!edit) {
      // 未有配置则不提示
      changeDataSource(value, type, '数据源');
      return;
    }
    const isConfirmed = await swal.confirm(
      '修改“数据源”会导致所有已配置列名相关的条件及公式等清空，请确认是否继续？'
    );
    if (!isConfirmed) {
      ElMessage.info('已取消修改');
      // 设置为原来的值
      switch (type) {
        case 1:
          form.value.incomeRuleDetailShopBeans[index].settleFile.dataSource =
            value == dataSourceType.共享盘 ? dataSourceType.库表 : dataSourceType.共享盘;
          break;
        case 2:
          form.value.incomeRuleDetailShopBeans[index].infoFile1.dataSource =
            value == dataSourceType.共享盘 ? dataSourceType.库表 : dataSourceType.共享盘;
          break;
        case 3:
          form.value.incomeRuleDetailShopBeans[index].infoFile2.dataSource =
            value == dataSourceType.共享盘 ? dataSourceType.库表 : dataSourceType.共享盘;
          break;
        default:
          break;
      }
    } else {
      changeDataSource(value, type, '数据源');
    }
  };
  const updateShow = ref(true); // 控制修改数据后选择组件更新
  // 修改数据表，引用到的设置都清除
  const changeFilePath = async (index, value, type) => {
    const edit = await haveEdit(type);
    if (!edit) {
      // 未有配置则不提示
      changeDataSource(value, type, '数据');
      return;
    }
    const isConfirmed1 = await swal.confirm(
      '修改“数据”会导致所有已配置列名相关的条件及公式等清空，请确认是否继续？'
    );
    if (!isConfirmed1) {
      ElMessage.info('已取消修改');
      // 设置为原来的值
      switch (type) {
        case 1:
          form.value.incomeRuleDetailShopBeans[index].settleFile.filePath =
            form.value.incomeRuleDetailShopBeans[index].settleFile.filePathOld;
          break;
        case 2:
          form.value.incomeRuleDetailShopBeans[index].infoFile1.filePath =
            form.value.incomeRuleDetailShopBeans[index].infoFile1.filePathOld;
          break;
        case 3:
          form.value.incomeRuleDetailShopBeans[index].infoFile2.filePath =
            form.value.incomeRuleDetailShopBeans[index].infoFile2.filePathOld;
          break;
        default:
          break;
      }
    } else {
      changeDataSource(value, type, '数据');
    }
  };

  // 根据数据源显示下拉选择或是输入框
  const getSelectShow = (type) => {
    const dataSet = form.value.incomeRuleDetailShopBeans[0];
    if (
      (type == fileType.结算数据 && dataSet?.settleFile.dataSource == dataSourceType.库表) ||
      (type == fileType.信息数据一 && dataSet?.infoFile1.dataSource == dataSourceType.库表) ||
      (type == fileType.信息数据二 && dataSet?.infoFile2.dataSource == dataSourceType.库表)
    ) {
      return true;
    }
    return false;
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
</style>
