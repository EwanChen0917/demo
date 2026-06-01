<template>
  <el-dialog
    width="1500px"
    title="物流下单"
    v-model="visible"
    @close="visible = false"
    align-center
    @click="handleClickMain"
  >
    <div class="form-item">
      <div class="form-title">产品信息</div>
      <el-table :data="productList" v-loading="tableLoading">
        <el-table-column prop="productName" label="产品名称" width="160px" />
        <el-table-column prop="skuCode" label="供应链SKU" width="120px" />
        <el-table-column prop="specialAttributes" width="190px">
          <template #header>
            <span class="red">*</span>
            物流属性
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ getSpecialName(row.specialAttributes) }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-select
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.specialAttributes"
              filterable
              collapse-tags
              collapse-tags-tooltip
              multiple
              :max-collapse-tags="1"
              @blur="handleRule(row, column)"
            >
              <el-option
                v-for="item in specialPropertyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click.stop
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="declareCnName" width="120px">
          <template #header>
            <span class="red">*</span>
            申报中文名
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.declareCnName }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.declareCnName"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
              autosize
              type="textarea"
            />
          </template>
        </el-table-column>
        <el-table-column prop="declareEnName" width="150px">
          <template #header>
            <span class="red">*</span>
            申报英文名
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.declareEnName }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.declareEnName"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
              autosize
              type="textarea"
            />
          </template>
        </el-table-column>
        <el-table-column prop="declareQuantity" width="120px">
          <template #header>
            <span class="red">*</span>
            申报数量
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.declareQuantity }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.declareQuantity"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="declarePrice" width="120px">
          <template #header>
            <span class="red">*</span>
            申报单价
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.declarePrice }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.declarePrice"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="currency" label="币种" width="120px">
          <template #default="{ row }">
            {{ row.currency || 'USD' }}
          </template>
        </el-table-column>
        <el-table-column prop="weight" width="120px">
          <template #header>
            <span class="red">*</span>
            申报重量
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.weight }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.weight"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="length">
          <template #header>
            <span class="red">*</span>
            长(cm)
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.length }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.length"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="width">
          <template #header>
            <span class="red">*</span>
            宽(cm)
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.width }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.width"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="height">
          <template #header>
            <span class="red">*</span>
            高(cm)
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.height }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.height"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="hsCode" width="120px">
          <template #header>
            <span class="red">*</span>
            海关编码
          </template>
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.hsCode }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.hsCode"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="hsTariffRate" label="海关税率(%)" width="120px">
          <template #default="{ row, $index, column }">
            <div v-if="editing != `${$index}-${column.property}`">
              <span>{{ row.hsTariffRate }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.hsTariffRate"
              @blur="handleRule(row, column)"
              @change="handleRule(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="明细备注" width="120px">
          <template #default="{ row, $index, column }">
            <div v-if="editing !== `${$index}-${column.property}`">
              <span>{{ row.remark }}</span>
              <i class="iconfont icon-bianji" @click.stop="handleClick($index, column)"></i>
            </div>
            <el-input
              @click.stop
              v-if="editing == `${$index}-${column.property}`"
              v-model="row.remark"
              @blur="editing = ''"
              @change="editing = ''"
            />
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="附件" width="100px">
          <template #default="{ row }">
            <el-link
              class="file-link"
              type="primary"
              :underline="false"
              @click.stop="download(row.extraInfo, row.fileName)"
            >
              <OverflowTooltip :content="row.fileName" :line="2" color="#02B96B" />
              <el-icon v-if="row.fileName" class="delete-icon" @click.stop="removeFile(row)">
                <Delete />
              </el-icon>
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80px">
          <template #default="{ row }">
            <div class="action-btn">
              <span @click.stop="handleActions(row)">上传附件</span>
              <!-- <span class="btn-update" @click="handleActions(row, 'update')">更新SKU信息</span> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="form-item">
      <div class="form-title">收件人信息</div>
      <el-form ref="ruleFormRef" class="info-form" :model="formModel" :rules="formRules">
        <el-form-item
          v-for="item in formList"
          :label="`${item.label}：`"
          :key="item.prop"
          :prop="item.prop"
          :class="{ 'form-address': item.prop == 'address' }"
        >
          <template #label>
            {{ item.label }}
            <el-tooltip v-if="item.tips" :content="item.tips" placement="top">
              <i class="iconfont icon-xianxingtubiaoxunwen"></i>
            </el-tooltip>
          </template>
          <el-input
            v-if="item.type == 'input'"
            v-model="formModel[item.prop]"
            :maxlength="item.limit"
            :show-word-limit="item.limit"
            placeholder="请输入"
          />
          <el-select
            v-else-if="item.type == 'select'"
            placeholder="请选择"
            v-model="formModel[item.prop]"
            filterable
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click.stop="visible = false">取消</el-button>
        <el-button type="primary" @click.stop="handleOrderAgain" :loading="saveLoading">
          重新下单
        </el-button>
      </div>
    </template>
  </el-dialog>
  <KeenFileUpload
    v-model="fileList"
    directory="tms/selfLogistics"
    :showOperate="false"
    :showFileList="false"
    @success="onUploadSuccess"
  >
    <el-link type="primary" :underline="false" class="row-btn" />
  </KeenFileUpload>
</template>

<script setup lang="ts">
  import { erpApi, tmsApi, dataApi, productApi, omsApi } from '@/api/index';
  import { download } from '@/utils/download';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { debounce } from 'lodash-es';

  const emits = defineEmits<{
    (e: 'submit'): void;
  }>();

  const visible = ref(false);
  const formModel = ref({});
  const productList = ref<any>([]);
  const allInfo = ref({});
  const fileList = ref<Array<any>>([]);
  const uploadRowFbaId = ref('');
  const editing = ref('');
  const ruleFormRef = ref();
  const saveLoading = ref(false);

  const countryOptions: any = ref([]);
  const queryCountry = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryOptions.value = res?.countryList?.map((item) => {
      return {
        label: `${item.countryCode} - ${item.countryName}`,
        value: item.countryCode,
      };
    });

    formList.value.map((item) => {
      if (item.prop == 'countryCode') {
        item.options = countryOptions.value;
      }
    });
  };

  const handleClick = ($index, column) => {
    if (editing.value) return;
    editing.value = `${$index}-${column.property}`;
  };

  const specialPropertyOptions: any = ref([]);
  const querySpecialProperty = async () => {
    // 启用状态 0-禁用 1-启用
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageNum: 1,
      pageSize: 100,
    });
    specialPropertyOptions.value = res?.sensitiveTypeBeanList?.map((item) => {
      return {
        label: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };

  const getSpecialName = computed(() => (value) => {
    if (!value) return '';
    if (typeof value === 'string') value = value.split(',');
    const specialName = value?.reduce((str, val, index) => {
      const matchLabel = specialPropertyOptions.value.find((item) => item.value == val)?.label;
      if (!matchLabel) return str;
      let name = matchLabel;
      if (index < value.length - 1) name = `${matchLabel},`;
      return (str += name);
    }, '');
    return specialName;
  });

  const handleClickMain = () => {
    !editStatus.value && (editing.value = '');
  };

  const formRules = reactive({
    receiverName: [{ required: true, message: '请输入收件人', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    province: [{ required: false, message: '请选择省/州', trigger: 'blur' }],
    city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    address1: [{ required: true, message: '请输入详细地址1', trigger: 'blur' }],
    zipcode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  });
  // --- 定义一个函数来更新规则 ---
  const updateProvinceRule = (isRequired = false) => {
    // console.log('isRequired', isRequired);
    // 修改 province 自身的 required 规则
    // formRules.province[0].required = isRequired;
    // 如果需要，也可以同时修改其他相关字段，例如 county
    // formRules.county[0].required = isRequired; // 示例：省/州必填时，区/县也必填
  };

  watch(
    () => formModel.value.countryCode,
    (newCountryCode) => {
      if (newCountryCode !== 'SG') {
        //  国家=SG-新加坡，去掉“省州”必填校验
        updateProvinceRule(true);
        // 可以在这里添加更多逻辑，比如使 county 也变为必填
        // formRules.province[0].required = true;
      } else {
        updateProvinceRule(false);
        // formRules.province[0].required = false;
      }
    },
    { immediate: true }
  ); // immediate: true 确保在组件初始化时也执行一次
  const initFormList = [
    { label: '收件人', prop: 'receiverName', type: 'input' },
    { label: '国家/地区', prop: 'countryCode', type: 'select', options: countryOptions.value },
    { label: '省/州', prop: 'province', type: 'input' },
    { label: '城市', prop: 'city', type: 'input' },
    { label: '区/县', prop: 'county', type: 'input' },
    { label: '详细地址1', prop: 'address1', type: 'input' },
    { label: '详细地址2', prop: 'address2', type: 'input' },
    { label: '门牌号', prop: 'houseNumber', type: 'input' },
    { label: '邮编', prop: 'zipcode', type: 'input' },
    { label: '电话', prop: 'phone', type: 'input' },
    { label: '邮箱', prop: 'email', type: 'input' },
    { label: '寄件税号', prop: 'senderTaxId', type: 'input' },
    { label: '收件人税号', prop: 'receiverTaxId', type: 'input' },
    {
      label: '短地址',
      prop: 'shortAddress',
      type: 'input',
      tips: '根据沙特政府要求，于2026年1月1日开始，所有运输到沙特的包裹必须要有国家地址（短地址）',
      limit: 50,
    },
  ];

  const formList: any = ref(initFormList);

  const open = async (params) => {
    visible.value = true;
    editing.value = '';
    productList.value = [];
    setTimeout(() => {
      queryCountry();
      querySpecialProperty();
      getDetail(params);
    }, 100);
  };

  const tableLoading = ref(false);
  const getDetail = async (params) => {
    tableLoading.value = true;
    const res: any = await tmsApi.tmsLogisticsOrderOrderDetail(params);
    allInfo.value = res;
    formModel.value = res.receiver || {};
    productList.value = res.declareItemList || [];
    productList.value.map((item) => {
      if (typeof item.specialAttributes === 'string')
        item.specialAttributes = item.specialAttributes.split(',');
      return item;
    });
    ruleFormRef.value?.resetFields();
    tableLoading.value = false;
    saveLoading.value = false;
    fileList.value = [];
  };

  const handleActions = (row) => {
    // 上传
    uploadRowFbaId.value = row.id;
    document.querySelector('.row-btn')?.click();
  };

  const productPropertyRuleMap = {
    specialAttributes: /^.+$/,
    declareCnName: /^.+$/s,
    declareEnName: /^.+$/s,
    declareQuantity: /^\d+$/,
    declarePrice: /^\d+(\.\d+)?$/,
    weight: /^\d+(\.\d+)?$/,
    length: /^\d+(\.\d+)?$/,
    width: /^\d+(\.\d+)?$/,
    height: /^\d+(\.\d+)?$/,
    hsCode: /^\d{6,12}$/,
    hsTariffRate: /^(\d+(\.\d+)?)?$/,
  };

  const labelRowTitle = {
    declarePrice: '申报单价',
    declareQuantity: '申报数量',
    weight: '申报重量',
    hsTariffRate: '海关税率',
    declareCnName: '申报中文名',
    declareEnName: '申报英文名',
    hsCode: '海关编码',
    specialAttributes: '物流属性',
    length: '长',
    width: '宽',
    height: '高',
  };

  const editStatus = ref(false);
  const handleRule = debounce((row, column) => {
    editStatus.value = true;
    const result = handlInputChange(row, column);
    if (result) editStatus.value = false;
  });

  const handlInputChange = (row, column) => {
    // labelRowTitle里 除海关税率外其余必填
    if (column.property == 'hsTariffRate' && !row[column.property]) {
      editing.value = '';
      return true;
    }
    if (column.property !== 'hsTariffRate' && !row[column.property]) {
      ElMessage.warning(`${labelRowTitle[column.property]}为必填 请继续填写内容`);
      return false;
    }
    // 有值但正则不匹配
    if (
      [
        'declarePrice',
        'declareQuantity',
        'weight',
        'hsTariffRate',
        'declareCnName',
        'declareEnName',
        'hsCode',
        'specialAttributes',
        'length',
        'width',
        'height',
      ].includes(column.property) &&
      row[column.property]
    ) {
      if (!productPropertyRuleMap[column.property].test(row[column.property])) {
        if (column.property == 'hsCode') ElMessage.warning(`海关编码请填写正确的格式，长度为6-12`);
        else ElMessage.warning(`${labelRowTitle[column.property]}请填写正确的格式`);
      } else {
        editing.value = '';
      }
    }

    return productPropertyRuleMap[column.property]
      ? productPropertyRuleMap[column.property].test(row[column.property]) && row[column.property]
      : true;
  };

  const onUploadSuccess = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      try {
        ElMessage.success('上传成功');
        productList.value.map((item: any) => {
          if (item.id == uploadRowFbaId.value) {
            item.extraInfo = fileList.value[0].ossKey;
            item.fileName = fileList.value[0].name;
          }
          return item;
        });
        // refreshList();
      } catch (error) {
        ElMessage.error('上传失败，请重试');
        return;
      } finally {
        fileList.value = [];
        uploadRowFbaId.value = '';
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };

  const removeFile = async (row) => {
    try {
      const confirmed = await swal.confirm('确认删除附件吗？');
      if (!confirmed) return;
      swal.success('删除成功');
      productList.value.map((item: any) => {
        if (item.id == row.id) {
          item.extraInfo = '';
          item.fileName = '';
        }
        return item;
      });
    } catch (error) {}
  };

  const handleOrderAgain = async () => {
    const validate = await ruleFormRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    const tableValidate = productList.value.every((item) =>
      Object.keys(productPropertyRuleMap).every((key) => handlInputChange(item, { property: key }))
    );
    console.log(3333, tableValidate, '000');
    if (validate && tableValidate) {
      console.log('请求接口');
      await productList.value.map((item) => {
        if (typeof item.specialAttributes !== 'string')
          item.specialAttributes = item.specialAttributes.join(',');
        return item;
      });
      // 推送
      saveLoading.value = true;
      const params = {
        ...allInfo.value,
        declareItemList: productList.value,
        receiver: formModel.value,
      };
      try {
        const res = await omsApi.omsFulfillmentOrderReOrderLogistics(params);
        res && ElMessage.success('重新下单成功');
        visible.value = false;
        saveLoading.value = false;
        emits('submit');
      } catch (err) {
      } finally {
        saveLoading.value = false;
      }
    }
  };

  const close = () => {
    visible.value = false;
    saveLoading.value = false;
  };

  const closeLoading = () => {
    saveLoading.value = false;
  };

  defineExpose({
    open,
    close,
    closeLoading,
  });
</script>

<style scoped lang="scss">
  .el-form {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    :deep(.el-form-item) {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 20px);
        align-items: flex-start;
        line-height: 38px;
      }
      .el-form-item__label::before {
        content: none;
      }
    }
  }
  .info-form {
    grid-template-columns: repeat(5, 1fr);
  }
  .form-label {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 13px;
    padding: 0 12px 0 0;
    margin: 0;
  }
  .form-sku {
    display: flex;
    align-items: center;
    .form-image {
      border: 1px solid #ededed;
      border-radius: 4px;
      padding: 3px;
      text-align: center;
      line-height: 60px;
      margin-right: 5px;
    }
    .form-text {
      line-height: 20px;
      font-size: 12px;
      color: #999;
      margin: 0;
      .sku-text {
        color: #3f4254;
      }
    }
    img {
      width: 50px;
      height: 50px;
      background-color: blue;
    }
  }
  .form-item {
    margin-bottom: 20px;
    :deep(.el-table__row) {
      .el-select {
        width: 160px;
        .el-select__wrapper {
          width: 160px;
        }
      }
      .cell {
        display: flex;
        align-items: center;
        min-height: 32px;
      }
    }
    .icon-bianji {
      margin-left: 2px;
      &:hover {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
  }
  .form-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #1f1f1f;
    font-size: 14px;
    margin-bottom: 10px;
    .title-tip {
      color: var(--el-color-primary);
      font-size: 12px;
      margin: 0 5px;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 3px;
      height: 15px;
      background: var(--el-color-primary);
      border-radius: 4px;
      margin-right: 7px;
    }
  }
  .double-item {
    display: flex;
    align-items: center;
    color: #666;
    border: 1px solid #dedede;
    border-right: none;
    height: 32px;
    border-radius: 6px;
    padding-left: 10px;
    margin-bottom: 10px;
    :deep(.el-input) {
      flex: 1;
      .el-input__wrapper {
        box-shadow: none;
        border: 1px solid #dedede;
        border-left: none;
        border-radius: 0 6px 6px 0;
      }
    }
  }
  .double-item:last-child {
    margin-bottom: 0;
  }
  .end-unit-item {
    border-right: 1px solid #dedede;
    padding-right: 10px;
    :deep(.el-input__wrapper) {
      border-right: none !important;
      border-radius: 0 !important;
    }
  }
  .action-btn {
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
    > span:hover {
      color: var(--el-color-primary-light-3);
      text-decoration: underline;
      cursor: pointer;
    }
    .btn-update {
      margin-left: 8px;
    }
  }
  .red {
    color: var(--el-color-danger);
  }
</style>
