<template>
  <!-- 分摊设置设置 -->
  <el-dialog
    width="1200px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="0" label-position="left">
      <el-config-provider size="small">
        <el-radio-group style="margin-top: 10px" v-model="splitType">
          <!-- --------------------------------------取占比额----分组依据字段---------------------------------------- -->
          <div
            class="set-item"
            style="margin-top: 10px"
            :class="{ ml185: index !== 0 }"
            v-for="(item, index) in form.groupFields"
          >
            <el-radio label="取占比额" :value="13" v-if="index == 0" />
            <div class="proportionGroup">
              <div class="name" v-if="index == 0">分组依据字段</div>
              <el-form-item
                :prop="`groupFields.${index}.type`"
                :rules="[
                  {
                    required: true,
                    message: '请选择数据',
                  },
                ]"
              >
                <el-select v-model="item.type" placeholder="选择数据" style="width: 180px">
                  <el-option :label="codeMainType.汇总表名" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="`groupFields.${index}.field`"
                :rules="[
                  {
                    required: true,
                    message: '请选择',
                  },
                ]"
              >
                <DataFieldSelect
                  style="width: 180px"
                  placeholder="请选择"
                  v-model="item.field"
                  @change="(val) => (item.fieldName = val)"
                  :code="codeMainType.汇总表"
                />
              </el-form-item>

              <!-- -------------------------------------- 添加值 -------------------------------------- -->
              <el-form-item
                :prop="`groupFields.${index}.compareType`"
                :rules="[{ required: item.addValue, message: '请选择操作符', trigger: 'change' }]"
                v-if="item.addValue"
              >
                <el-select
                  style="width: 120px"
                  v-model="item.compareType"
                  placeholder="请选择"
                  clearable
                  @change="(val) => handleOperatorChange(val, item)"
                >
                  <el-option label="包含" value="包含" />
                  <el-option label="不包含" value="不包含" />
                  <el-option label="等于" value="等于" />
                  <el-option label="不等于" value="不等于" />
                  <el-option label="为空" value="为空" />
                  <el-option label="不为空" value="不为空" />
                  <el-option label="大于" value="大于" />
                  <el-option label="小于" value="小于" />
                  <el-option label="大于等于" value="大于等于" />
                  <el-option label="小于等于" value="小于等于" />
                  <el-option label="IN" value="IN" />
                  <el-option label="NOT IN" value="NOT IN" />
                  <el-option label="以...开始" value="以...开始" />
                  <el-option label="以...结束" value="以...结束" />
                  <el-option label="属于当月" value="属于当月" />
                  <el-option label="不属于当月" value="不属于当月" />
                </el-select>
              </el-form-item>
              <el-form-item
                :prop="
                  ['为空', '不为空', '属于当月', '不属于当月'].includes(item?.compareType)
                    ? ''
                    : `groupFields.${index}.compareValue`
                "
                :rules="[{ required: item.addValue, message: '请输入值', trigger: 'change' }]"
                v-if="item.addValue"
              >
                <el-input
                  v-model="item.compareValue"
                  :placeholder="
                    ['IN', 'NOT IN'].includes(item?.compareType) ? '值1,值2,值3...' : '请输入'
                  "
                  :disabled="
                    ['为空', '不为空', '属于当月', '不属于当月'].includes(item?.compareType)
                  "
                  clearable
                />
              </el-form-item>
              <el-checkbox v-model="item.addValue" class="me-4">添加值</el-checkbox>

              <!-- --------------------------------------添加值-------------------------------------- -->
              <el-link type="primary" underline="never" @click="proportionGroupAdd">
                添加分组
              </el-link>
              <el-link
                type="danger"
                underline="never"
                @click="proportionGroupDelete(index)"
                v-if="index !== 0"
              >
                删除
              </el-link>
            </div>
          </div>

          <!-- --------------------------------------取占比额----分组依据字段---------------------------------------- -->
          <!-- --------------------------------------取占比额----权重字段字段---------------------------------------- -->
          <div class="set-item ml130" style="margin-top: 10px">
            <div class="name">权重字段</div>
            <el-form-item
              prop="weightField.first"
              :rules="[
                {
                  required: true,
                  message: '请选择数据',
                },
              ]"
            >
              <el-select
                v-model="form.weightField.first"
                placeholder="选择数据"
                style="width: 180px"
              >
                <el-option :label="codeMainType.汇总表名" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="weightField.second"
              :rules="[
                {
                  required: true,
                  message: '请选择',
                },
              ]"
            >
              <DataFieldSelect
                style="width: 180px"
                placeholder="请选择"
                v-model="form.weightField.second"
                :code="codeMainType.汇总表"
                @change="(val) => (form.weightField.secondName = val)"
              />
            </el-form-item>
            <el-checkbox v-model="form.isDefault" class="me-4">
              当未匹配对应值时，需按条件值新增一行
            </el-checkbox>
            <el-checkbox v-model="form.defaultAvgValue" class="me-4">
              当权重字段汇总为0时，取平均值
            </el-checkbox>
            <el-checkbox v-model="form.isReverse" class="me-4">分摊取反数值</el-checkbox>
          </div>

          <!-- --------------------------------------取占比额----权重字段---------------------------------------- -->
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
  import { codeMainType } from '@/views/budget/budgetSummary/enum';
  import { ElConfigProvider, ElMessage } from 'element-plus';
  import DataFieldSelect from '@/views/budget/budgetSummary/summaryRule/components/dataFieldSelect.vue';

  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const tableValueSetData = ref([]);
  const formRef = ref(null);
  const form = ref();
  const splitType = ref(13);
  const handleOperatorChange = (val, row) => {
    if (['为空', '不为空', '属于当月', '不属于当月'].includes(val)) {
      row.value = '';
    }
  };

  // 添加占比额--分组依据字段
  const proportionGroupAdd = () => {
    form.value.groupFields.push({
      type: '1',
      field: '',
      fieldName: '',
      addValue: false,
      compareType: '',
      compareValue: '',
    });
  };
  // 删除占比额--分组依据字段
  const proportionGroupDelete = (index) => {
    form.value.groupFields.splice(index, 1);
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
      // {
      //   "groupFields":[{
      //     "type": "来源类型: 数据源 1-N",
      //     "field": "{字段编码}",
      //     "fieldName": "{字段名}",
      //     "addValue": "添加值 ture&false",
      //     "compareType": "比较符: 同条件的",
      //     "compareValue": "比较值"
      //   }],
      //   "weightField":"权重字段, {字段来源}###{字段编码}###{字段名字}",
      //   "isDefault":"当未匹配对应值时，需按条件值新增一行 ture&false",
      //   "defaultAvgValue": "当权重字段汇总为0时，取平均值 ture&false"
      // }
      const text = {
        groupFields: form.value.groupFields,
        weightField: `${form.value.weightField.first}###${form.value.weightField.second}###${form.value.weightField.secondName}`,
        isDefault: form.value.isDefault,
        defaultAvgValue: form.value.defaultAvgValue,
        isReverse: form.value.isReverse,
      };
      form.value.valueType = 13;
      form.value.value = JSON.stringify(text);
      emit('success', form.value);
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row, obj) => {
    console.log(row, obj);
    title.value = `${obj?.budgetTemplateName} - 分摊设置设置`;
    tableValueSetData.value = obj;
    if (row.value !== '') {
      form.value = row;
    } else {
      form.value = {
        fieldCode: '',
        fieldName: '',
        fileType: '',
        valueFormula: '',
        value: '',
        groupFields: [
          {
            type: '1',
            field: '',
            fieldName: '',
            addValue: false,
            compareType: '',
            compareValue: '',
          },
        ],
        weightField: {
          first: '1',
          second: '',
          secondName: '',
        },
        isDefault: false, //当未匹配对应值时，需按条件值新增一行 ture&false
        defaultAvgValue: false, //当权重字段汇总为0时，取平均值 ture&false
        isReverse: false, //分摊取反数值 ture&false
      };
    }
    console.log(!row.value, row.value !== '');
    form.value.fieldCode = obj?.budgetTemplateCode;
    form.value.fieldName = obj?.budgetTemplateCode;
    formRef.value?.resetFields();
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
      margin-bottom: 18px;
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
