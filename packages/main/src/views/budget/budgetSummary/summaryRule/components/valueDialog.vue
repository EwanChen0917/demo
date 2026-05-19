<template>
  <el-dialog
    width="1200px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="140px" label-position="left">
      <el-config-provider size="small">
        <el-radio-group v-model="valueType" @change="changeValueType">
          <el-form-item>
            <template #label>
              <el-radio label="取数据" :value="setValueType.取文件" />
            </template>
            <div>
              <div class="set-item">
                <el-form-item>
                  <el-select
                    style="width: 210px"
                    v-model="form.fileType"
                    placeholder="选择数据"
                    :disabled="
                      valueType !== setValueType.取文件 &&
                      valueType !== setValueType.计算 &&
                      valueType !== setValueType.文本
                    "
                  >
                    <el-option
                      v-for="(val, key) in tableValueList"
                      :value="val.fileType"
                      :label="val.name"
                      :key="key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  prop="columnCode"
                  :rules="[{ required: valueType === setValueType.取文件, message: '请选择' }]"
                >
                  <DataFieldSelect
                    placeholder="请选择"
                    style="width: 210px"
                    v-model="form.columnCode"
                    @change="(val) => (form.columnName = val)"
                    :code="tableValuecode"
                    :disabled="
                      valueType !== setValueType.取文件 &&
                      valueType !== setValueType.计算 &&
                      valueType !== setValueType.文本
                    "
                  />
                </el-form-item>

                <el-checkbox
                  v-model="isSplit"
                  :disabled="
                    valueType !== setValueType.取文件 &&
                    valueType !== setValueType.计算 &&
                    valueType !== setValueType.文本
                  "
                >
                  部分截取
                </el-checkbox>
                <el-link
                  type="primary"
                  underline="never"
                  :disabled="valueType !== setValueType.计算"
                  @click="handleAdd(form.fileType, form.columnCode, form.columnName)"
                >
                  添加至公式
                </el-link>
                <el-link
                  type="primary"
                  underline="never"
                  :disabled="valueType !== setValueType.文本"
                  @click="handleAdd(form.fileType, form.columnCode, form.columnName)"
                >
                  添加至文本
                </el-link>
              </div>
              <el-radio-group style="margin-top: 10px" v-model="splitType">
                <div class="set-item">
                  <el-radio
                    label="位数截取"
                    :value="1"
                    :disabled="
                      (valueType !== setValueType.取文件 &&
                        valueType !== setValueType.计算 &&
                        valueType !== setValueType.文本) ||
                      !isSplit
                    "
                  />
                  <el-form-item
                    prop="splitByLen.first"
                    :rules="[
                      {
                        required: valueType === setValueType.取文件 && isSplit && splitType === 1,
                        message: '请输入起始值',
                      },
                      { pattern: /\b(\d+|len|len-\d+)\b/g, message: '请按提示输入' },
                    ]"
                  >
                    <el-input
                      v-model="form.splitByLen.first"
                      placeholder="1"
                      style="width: 120px"
                      :disabled="
                        (valueType !== setValueType.取文件 &&
                          valueType !== setValueType.计算 &&
                          valueType !== setValueType.文本) ||
                        !isSplit ||
                        splitType !== 1
                      "
                    />
                  </el-form-item>
                  <div style="font-size: 12px">:</div>
                  <el-form-item
                    prop="splitByLen.second"
                    :rules="[
                      {
                        required: valueType === setValueType.取文件 && isSplit && splitType === 1,
                        message: '请输入结束值',
                      },
                    ]"
                  >
                    <el-input
                      v-model="form.splitByLen.second"
                      placeholder="len"
                      style="width: 120px"
                      :disabled="
                        (valueType !== setValueType.取文件 &&
                          valueType !== setValueType.计算 &&
                          valueType !== setValueType.文本) ||
                        !isSplit ||
                        splitType !== 1
                      "
                    />
                  </el-form-item>
                  <div class="tips pt-2">
                    提示：意为“起始值：结束值“，示例”FAD-564“需要取FAD，则设置为1:3或1：len-4。len为长度值
                  </div>
                </div>
                <div class="set-item" style="margin-top: 10px">
                  <el-radio
                    label="字符截断"
                    :value="2"
                    :disabled="
                      (valueType !== setValueType.取文件 &&
                        valueType !== setValueType.计算 &&
                        valueType !== setValueType.文本) ||
                      !isSplit
                    "
                  />
                  <el-form-item
                    prop="splitByString.first"
                    :rules="[
                      {
                        required:
                          (valueType === setValueType.取文件 ||
                            valueType === setValueType.计算 ||
                            valueType === setValueType.文本) &&
                          isSplit &&
                          splitType === 2,
                        message: '请输入字符',
                      },
                    ]"
                  >
                    <el-input
                      v-model="form.splitByString.first"
                      style="width: 120px"
                      placeholder="输入字符"
                      :disabled="
                        valueType == setValueType.取业务字典 ||
                        valueType == setValueType.固定值 ||
                        !isSplit ||
                        splitType !== 2
                      "
                    />
                  </el-form-item>
                  <el-form-item
                    prop="splitByString.second"
                    :rules="[
                      {
                        required:
                          (valueType === setValueType.取文件 ||
                            valueType === setValueType.计算 ||
                            valueType === setValueType.文本) &&
                          isSplit &&
                          splitType === 2,
                        message: '请输入序号',
                      },

                      { pattern: integerRule, message: '请输入整数' },
                    ]"
                  >
                    <el-input
                      v-model="form.splitByString.second"
                      style="width: 120px"
                      placeholder="输入序号"
                      :disabled="
                        valueType == setValueType.取业务字典 ||
                        valueType == setValueType.固定值 ||
                        !isSplit ||
                        splitType !== 2
                      "
                    />
                  </el-form-item>
                  <div class="tips pt-2">
                    提示：示例”FAD-564“需要取FAD，则设置为字符为“-”，序号为1
                  </div>
                </div>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item>
            <template #label>
              <el-radio
                label="固定值"
                :value="setValueType.固定值"
                :disabled="title?.includes('平台结算时间')"
              />
            </template>
            <el-space>
              <el-form-item
                prop="constValue"
                :rules="[
                  {
                    required: valueType === setValueType.固定值 && valueType !== setValueType.文本,
                    message: '请输入值',
                  },
                ]"
              >
                <el-input
                  style="width: 290px"
                  v-model="form.constValue"
                  placeholder="输入值"
                  maxlength="100"
                  show-word-limit
                  clearable
                  :disabled="valueType !== setValueType.固定值 && valueType !== setValueType.文本"
                />
              </el-form-item>
              <el-link
                type="primary"
                underline="never"
                :disabled="valueType !== setValueType.文本"
                @click="handleAddConst(form.constValue)"
              >
                添加至文本
              </el-link>
              <div class="tips">提示：如取值字段为基础资料，固定值填写其编码</div>
            </el-space>
          </el-form-item>
          <el-form-item>
            <template #label>
              <el-radio label="计算" :value="setValueType.计算" />
            </template>
            <div class="set-item" style="align-items: start">
              <div class="left">
                <el-form-item
                  prop="calValue"
                  :rules="[{ required: valueType === setValueType.计算, message: '请插入公式' },
                     {
                      validator:(rule: any, value: any, callback: any) => {
                        const pattern =  /^(?:(?!min|max)[\s\S])*(?:(?:min|max)\([^,]+,[^,]+\))+(?:(?!min|max)[\s\S])*$/;               
                        const cleanedValue = value.replace(/\.[^}]*}/g, '').replace(pattern, '');
                        if ((cleanedValue.includes('min')||cleanedValue.includes('max'))&&cleanedValue.length > 0) {
                          callback(new Error('公式有误，max/min的公式格式应为mxx(a,b)，请调整'))
                        } else {
                          callback()
                        }
                      },
                      trigger: 'blur',
                    }
                  ]"
                >
                  <el-input
                    ref="textareaRef"
                    type="textarea"
                    v-model="form.calValue"
                    :rows="10"
                    :disabled="valueType !== setValueType.计算"
                    @keydown="handleKeydown"
                    @blur="clearValueUsedColumns"
                  />
                </el-form-item>
              </div>
              <div class="right">
                <div class="keyboard">
                  <div
                    class="keyboard-btn"
                    :class="{ 'keyboard-btn-disabled': valueType !== setValueType.计算 }"
                    v-for="item in [
                      '+',
                      '-',
                      '*',
                      '/',
                      '(',
                      ')',
                      '月初',
                      '月末',
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      '.',
                      ',',
                      'max',
                      'min',
                      '汇率',
                    ]"
                    :key="item"
                    @click="
                      insert(
                        ['月初', '月末', '汇率'].includes(item) ? `{${item}}` : item,
                        setValueType.计算
                      )
                    "
                    :disabled="valueType !== setValueType.计算"
                  >
                    {{ item }}
                  </div>
                </div>
                <div class="tips pt-2">
                  提示：max(a,b)代表取a,b里面的最大值；min(a,b)代表取a,b里面的最小值
                  <div>汇率为固定取值，按预算年度取基准汇率中美元对应的人民币汇率</div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item style="width: 100%">
            <template #label>
              <el-radio label="文本" :value="setValueType.文本" />
            </template>
            <div class="set-item" style="align-items: start">
              <div class="left">
                <el-form-item
                  prop="calValueText"
                  :rules="[{ required: valueType === setValueType.文本, message: '请添加文本' }]"
                >
                  <el-input
                    ref="textareaRef2"
                    type="textarea"
                    v-model="form.calValueText"
                    :rows="10"
                    :disabled="valueType !== setValueType.文本"
                    @keydown="handleKeydown"
                  />
                </el-form-item>
              </div>
              <div class="right">
                <div class="keyboard">
                  <div
                    class="keyboard-btn"
                    :class="{ 'keyboard-btn-disabled': valueType !== setValueType.文本 }"
                    v-for="item in ['执行年', '执行月', '执行日']"
                    :key="item"
                    @click="
                      insert(
                        ['执行年', '执行月', '执行日'].includes(item) ? `{${item}}` : item,
                        setValueType.文本
                      )
                    "
                    :disabled="valueType !== setValueType.文本"
                  >
                    {{ item }}
                  </div>
                </div>
                <div class="tips pt-2">
                  提示：执行年、执行月代表取对应的数值，如“2025年9月”的执行年为2025、执行月为09；执行日代表取对应月份的最后一天，如“2025年9月”的执行日为30、“2025年10月”的执行日为31
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="title?.includes('币别')">
            <template #label>
              <el-radio label="按店铺取“店铺映射关系”币别" :value="setValueType.币别" />
            </template>
          </el-form-item>
        </el-radio-group>
      </el-config-provider>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import {
    codeMainType,
    setValueType,
    sharedBoundaryType,
  } from '@/views/budget/budgetSummary/enum';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import { integerRule } from '@/utils/rulesRegExp';
  import { financeSystemApi } from '@/api';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const tableValueList = ref([]);
  const tableValueName = ref(''); //公式匹配的name
  const tableValuecode = ref(''); //模版code
  const fileTypeValue = ref(''); //模版fileType
  const usedColumnsListData = ref([]); //选择列名下拉
  const formRef = ref(null);
  const form = ref({
    valueFormula: '',
    valueUsedColumns: [], //主表-添加公式-值用到的列id
    splitByLen: {
      first: 1,
      second: 'len',
    },
    splitByString: {
      first: '',
      second: '',
    },
    constValue: '',
    dictValue: '',
    calValue: '',
    calValueText: '',
  });
  const valueType = ref();
  const isSplit = ref(false);
  const splitType = ref(1);

  const changeValueType = (value) => {
    // formRef.value?.clearValidate();
  };

  // 添加
  const handleAdd = async (fileType, columnCode, columnName) => {
    if (!fileType || !columnName) {
      ElMessage.warning('请选择文件和列名');
      return;
    }
    await formRef.value.validateField(['splitByString.first', 'splitByString.second']);
    if (isSplit.value) {
      if (splitType.value === 1) {
        insert(
          `{${tableValueName.value}.${columnName}.wsjq(${form.value.splitByLen?.first}-${form.value.splitByLen?.second})}`,
          valueType.value
        );
        form.value.splitByLen.first = 1;
        form.value.splitByLen.second = 'len';
      } else if (splitType.value === 2) {
        insert(
          `{${tableValueName.value}.${columnName}.zfjd(${form.value.splitByString?.first},${form.value.splitByString?.second})}`,
          valueType.value
        );
        form.value.splitByString.first = '';
        form.value.splitByString.second = '';
      }
      isSplit.value = false;
      splitType.value = 1;
    } else {
      insert(`{${tableValueName.value}.${columnName}}`, valueType.value);
    }
    form.value.fileType = '';
    form.value.columnCode = '';
    form.value.columnName = '';
  };
  const clearValueUsedColumns = () => {
    if (form.value.calValue == '') {
      form.value.valueUsedColumns = [];
    }
    console.log('清除', form.value);
  };
  const handleOperatorChange = (val, row) => {
    if (['为空', '不为空', '属于当月', '不属于当月'].includes(val)) {
      row.value = '';
    }
  };

  // 添加固定值
  const handleAddConst = async (val) => {
    insert(`{固定值.${val}}`, valueType.value);
    form.value.constValue = '';
  };

  // 获取光标位置
  const textareaRef = ref(null);
  const textareaRef2 = ref(null);
  const insert = async (item, type) => {
    if (valueType.value === setValueType.计算 && type === setValueType.计算) {
      if (
        ['{月初}', '{月末}'].includes(item) &&
        (form.value.calValue?.includes('{月初}') || form.value.calValue?.includes('{月末}'))
      ) {
        ElMessage.warning('请勿重复插入日期');
        return;
      }
      const cursorPosition = textareaRef.value.ref.selectionStart;
      form.value.calValue =
        form.value.calValue.substring(0, cursorPosition) +
        item +
        form.value.calValue.substring(textareaRef.value.ref.selectionEnd);
      textareaRef.value.ref.focus();
    }
    if (valueType.value === setValueType.文本 && type === setValueType.文本) {
      const cursorPosition2 = textareaRef2.value.ref.selectionStart;
      form.value.calValueText =
        form.value.calValueText.substring(0, cursorPosition2) +
        `${form.value.calValueText ? '+' : ''}` +
        item +
        form.value.calValueText.substring(textareaRef2.value.ref.selectionEnd);
      textareaRef2.value.ref.focus();
    }
  };

  const handleKeydown = (event) => {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  // 确认
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      form.value.valueType = valueType.value;
      if (valueType.value === setValueType.取文件) {
        if (isSplit.value) {
          if (splitType.value === 1) {
            form.value.valueType = 11;
            form.value.value = `${form.value.splitByLen?.first}###${form.value.splitByLen?.second}`;
          } else if (splitType.value === 2) {
            form.value.valueType = 12;
            form.value.value = `${form.value.splitByString?.first}###${form.value.splitByString?.second}`;
          } else if (splitType.value === 3) {
            // value传一个json字符串，{"groupFields":[1###字段名,1###字段名],"weightField":"1###字段名"}
            // 结算文件.商品总金额.qzbe(结算数据“订单号”,...，信息数据一“订单金额”)
            const text = form.value.groupFields.map((i) => {
              return `${i.first}###${i.second}`;
            });
            const text1 = {
              groupFields: text,
              weightField: `${form.value.weightField.first}###${form.value.weightField.second}`,
            };
            form.value.valueType = 13;
            form.value.value = JSON.stringify(text1);
          }
        } else form.value.valueType = 10;
      }
      if (valueType.value === setValueType.固定值) {
        form.value.value = form.value.constValue;
      }
      if (valueType.value === setValueType.币别) {
        form.value.constValue = '按店铺取“店铺映射关系”币别';
        form.value.value = '按店铺取“店铺映射关系”币别';
      }

      if (valueType.value === setValueType.计算) {
        form.value.value = form.value.calValue;
        form.value.valueFormula = form.value.calValue
          ?.replace('{月初}', 'mon_start(null)')
          ?.replace('{月末}', 'mon_end(null)')
          ?.replace('{汇率}', " year_rate(#r_year_month, 'USD', 'toCNY')");
        // 替换所有主表数据
        await formatCalValue(fileTypeValue.value);
      }

      if (valueType.value === setValueType.文本) {
        form.value.value = form.value.calValueText;
        form.value.valueFormula = form.value.calValueText;
        // 替换所有结算数据
        await formatCalValue(fileTypeValue.value);
        await formatCalValue('固定值');
        form.value.valueFormula = form.value.valueFormula
          ?.replace('{执行日}', "date_format(mon_end($format_time), 'dd')")
          ?.replace('{执行月}', "date_format($format_time, 'MM')")
          ?.replace('{执行年}', "date_format($format_time, 'yyyy')");
      }
      emit('success', form.value);
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  //字段code
  const getFieldCode = (fieldName) => {
    let findCode = usedColumnsListData.value.find((item) => {
      return item.value == fieldName;
    });
    if (findCode) {
      return findCode.key;
    } else {
      return '';
    }
  };
  const formatCalValue = async (type) => {
    let regex = new RegExp(`\\{${tableValueName.value}\\.([^}]+)}`, 'g');
    if (type === '固定值') {
      regex = new RegExp(`\\{固定值\\.([^}]+)}`, 'g');
    }
    const list =
      valueType.value === setValueType.计算
        ? form.value.calValue?.match(regex)
        : form.value.calValueText?.match(regex);
    if (list?.length) {
      const promises = list.map(async (item) => {
        const param = {
          type: parseInt(type),
          fileType: parseInt(type),
          fieldName: getAfterFirstDot(item)?.replace('}', ''),
        };
        if (getAfterFirstDot(item).includes('wsjq')) {
          param.type = 11;
          param.fieldName = getAfterFirstDot(item)?.split('.wsjq')[0];
          param.dictType = getAfterFirstDot(item)
            ?.split('.wsjq')[1]
            ?.replace('(', '')
            ?.replace('-', '###')
            ?.replace(')}', '');
        }
        if (getAfterFirstDot(item).includes('zfjd')) {
          param.type = 12;
          param.fieldName = getAfterFirstDot(item)?.split('.zfjd')[0];
          param.dictType = getAfterFirstDot(item)
            ?.split('.zfjd')[1]
            ?.replace('(', '')
            ?.replace(',', '###')
            ?.replace(')}', '');
        }
        if (getAfterFirstDot(item).includes('qzbe')) {
          param.type = parseInt(type);
          param.fileType = parseInt(type);
          param.fieldName = getAfterFirstDot(item)
            ?.split('.qzbe')[1]
            .split(',')[0]
            ?.replace('(', '');
        }
        param.fieldName = getFieldCode(param.fieldName); //取code
        if (type === '固定值') {
          param.type = 3;
          param.fileType = undefined;
          param.fieldName = undefined;
          param.dictType = getAfterFirstDot(item)?.replace('}', '');
        }
        if (valueType.value === setValueType.计算) {
          const res = await financeSystemApi.financeIncomeRuleAssembleAvScriptKey(param);
          form.value.valueFormula = form.value.valueFormula.replace(item, res);
        }
        if (valueType.value === setValueType.文本) {
          const res2 = await financeSystemApi.financeIncomeRuleJoinText(param);
          form.value.valueFormula = form.value.valueFormula.replace(item, res2);
        }
        //添加公式用到的列处理 valueUsedColumns
        if (param.fieldName) {
          form.value.valueUsedColumns.push(param.fieldName);
          form.value.valueUsedColumns = [...new Set(form.value.valueUsedColumns)];
        }
      });
      await Promise.all(promises);
    }
  };
  const getAfterFirstDot = (str) => {
    // 找到第一个 "." 的索引
    const dotIndex = str.indexOf('.');
    // 若不存在 "."，返回空字符串（或根据需求返回原字符串）
    if (dotIndex === -1) {
      return ''; // 或 return str;
    }
    // 截取从 "." 后面一位开始到结尾的内容
    return str.slice(dotIndex + 1);
  };
  const getColumnsListData = (code) => {
    if (code) {
      let list = localStorage.getItem('budgetSummaryRuleFieldsList');
      list = JSON.parse(list);
      if (list && list.length) {
        let find = list.find((item) => {
          return item.code == code;
        });
        if (find) {
          usedColumnsListData.value = find.data;
        }
      }
    } else {
      usedColumnsListData.value = [];
    }
  };
  const open = (row, obj, list) => {
    console.log(row, obj, list);
    title.value = `${obj?.fieldName} - 值设置`;
    tableValueList.value = list;
    fileTypeValue.value = obj?.fileType;
    tableValueName.value =
      obj.sharedBoundary === sharedBoundaryType.分摊后
        ? codeMainType.汇总表名
        : obj.budgetTemplateName;
    tableValuecode.value =
      obj.sharedBoundary === sharedBoundaryType.分摊后
        ? codeMainType.汇总表
        : obj.budgetTemplateCode;
    getColumnsListData(tableValuecode.value);
    formRef.value?.resetFields();
    form.value = {
      valueFormula: row.valueFormula || '',
      valueUsedColumns: [],
      splitByLen: {
        first: row.splitByLen?.first || 1,
        second: row.splitByLen?.second || 'len',
      },
      splitByString: {
        first: row.splitByString?.first || '',
        second: row.splitByString?.second || '',
      },
      fileType: obj?.fileType,
      columnName: '',
      dictCode: '',
      value: row?.value,
      calValue: '',
      calValueText: '',
    };
    console.log(form.value);
    valueType.value = row?.valueType >= 10 ? setValueType.取文件 : row?.valueType;
    if (row?.valueType >= 10) {
      form.value.fileType = row?.fileType;
      form.value.columnCode = row?.columnCode;
      form.value.columnName = row?.columnName;
    }
    if (row?.valueType === setValueType.固定值) {
      form.value.constValue = row?.value;
    }
    if (row?.valueType === setValueType.计算) {
      form.value.calValue = row?.value || '';
    }
    if (row?.valueType === setValueType.文本) {
      form.value.calValueText = row?.value || '';
    }
    isSplit.value = row?.valueType > 10;
    splitType.value = row?.valueType === 12 ? 2 : 1;
    if (row?.valueType === 13) {
      splitType.value = 3;
    }
    if (row?.valueType === 11) {
      form.value.splitByLen = {
        first: row.value?.split('###')[0] || '',
        second: row.value?.split('###')[1] || '',
      };
    }
    if (row?.valueType === 12) {
      form.value.splitByString = {
        first: row.value?.split('###')[0] || '',
        second: row.value?.split('###')[1] || '',
      };
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .set-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    .left {
      width: 55%;
      margin-right: 20px;
    }
    .right {
      width: 45%;
    }
    .name {
      font-size: 12px;
    }
    .proportionGroup {
      width: 100%;
      display: contents;
    }
  }
  .ml130 {
    margin-left: 130px;
  }
  .ml185 {
    margin-left: 185px;
  }
  .tips {
    flex-grow: 1;
    color: #8492a6;
    font-size: 12px;
  }
  .keyboard {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 10px;
    &-btn {
      border: 1px solid #818181;
      width: 40px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      border-radius: 3px;
      cursor: pointer;
      &:not(&-disabled):hover {
        color: var(--el-color-primary-light-5);
        background-color: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary-light-5);
      }
    }
    &-btn-disabled {
      background-color: #f5f7fa;
      color: #8492a6;
      cursor: not-allowed;
    }
  }
  :deep(.el-form-item--label-left .el-form-item__label) {
    align-items: start;
  }
  :deep(.el-select--small .el-select__wrapper) {
    min-height: 32px;
  }
</style>
