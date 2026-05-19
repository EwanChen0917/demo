<template>
  <el-dialog
    width="1200px"
    title="批量编辑"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-form v-loading="loading" ref="formRef" :model="form" :rules="rules">
      <el-table
        :data="form.list"
        row-key="code"
        default-expand-all
        max-height="65vh"
        :tree-props="{
          children: 'skuBeanList',
        }"
      >
        <el-table-column label="产品信息" min-width="200">
          <template #default="{ row }">
            <div v-if="row?.productType === 1">
              <div>{{ row?.spuName }}</div>
              <div>{{ row?.spuCode }}</div>
            </div>
            <div v-if="row?.productType === 2">
              <div>{{ row?.skuName }}</div>
              <div>{{ row?.skuCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="countryCode" width="150px">
          <template #default="{ row, $index }">
            {{ row.countryCode }}
            <!-- <el-form-item label-width="0" :prop="getProp(row, $index, 'countryCode')"
            :rules="rules.countryCode">
              <el-select
                v-model="row.countryCode"
                placeholder="请选择国家"
                filterable
              >
                <el-option
                  v-for="item in countryMap"
                  :key="item.countryCode"
                  :label="item.countryCode + ' - ' + item.countryName"
                  :value="item.countryCode"
                />
              </el-select>
            </el-form-item> -->
          </template>
        </el-table-column>
        <!-- <el-table-column label="渠道" prop="channelName" width="130">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="getProp(row, $index, 'channelCode')"
              :rules="rules.channelCode"
            >
              <ProductChannelSelect
                v-model="row.channelCode"
                v-if="row?.isNew"
                :filters="row?.disableChannels"
                clearable
                teleported
                size="small"
              />
              <div v-else-if="row?.productType === 2">{{ row?.channelName }}</div>
              <div v-else>--</div>
            </el-form-item>
          </template>
        </el-table-column> -->
        <el-table-column label="全渠道（线上）*" prop="msrp" width="320px">
          <template #header>
            <div>
              全渠道（线上）
              <span style="color: var(--bs-danger)">*</span>
            </div>
          </template>
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item v-if="row.productType === 1 && row?.maxSalePrice" label-width="0">
                <el-input
                  placeholder="请输入"
                  style="width: 120px"
                  v-model="row.priceRange"
                  @blur="
                    (e) => {
                      handlePriceBlur(e, row);
                    }
                  "
                />
              </el-form-item>
              <el-form-item
                v-else
                label-width="0"
                :prop="getProp(row, $index, 'minSalePrice')"
                :rules="rules.minSalePrice"
              >
                <NumberInput
                  style="width: 120px"
                  placeholder="请输入"
                  v-model="row.minSalePrice"
                  :precision="4"
                  :max="9999999999.99999"
                  @change="
                    (val) => {
                      handlePriceChange(val, row);
                    }
                  "
                />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="getProp(row, $index, 'currencyCode')"
                :rules="rules.currencyCode"
              >
                <CurrencySelect
                  style="width: 140px"
                  v-model="row.currencyCode"
                  @change="
                    (val) => {
                      handleCurrencyChange(val, row);
                    }
                  "
                />
              </el-form-item>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="亚马逊-VC" width="320px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item v-if="row.productType === 1 && row?.maxVcSalePrice" label-width="0">
                <el-input
                  placeholder="请输入"
                  style="width: 120px; margin-left: 7px"
                  v-model="row.priceVcRange"
                  @blur="
                    (e) => {
                      handlePriceVcBlur(e, row);
                    }
                  "
                />
              </el-form-item>
              <!-- :prop="getProp(row, $index, 'minVcSalePrice')"
                :rules="rules.minVcSalePrice" -->
              <el-form-item v-else label-width="0">
                <NumberInput
                  style="width: 120px"
                  placeholder="请输入"
                  v-model="row.minVcSalePrice"
                  :precision="4"
                  :max="9999999999.99999"
                  @change="
                    (val) => {
                      handlePriceVCChange(val, row);
                    }
                  "
                />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="
                  row.productType === 2
                    ? getProp(row, $index, 'currencyCodeVc')
                    : 'list[0].currencyCodeVc'
                "
                :rules="[
                  {
                    required:
                      (row.productType === 2 && Number(row.minVcSalePrice) > 0) ||
                      (row.productType === 1 && row.priceVcRange),
                    message: '请选择币种',
                    trigger: 'change',
                  },
                ]"
              >
                <CurrencySelect
                  style="width: 140px"
                  v-model="row.currencyCodeVc"
                  @change="
                    (val) => {
                      handleCurrencyVcChange(val, row);
                    }
                  "
                />
              </el-form-item>
            </el-space>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="80">
          <template #default="{ row, $index }">
            <div v-if="row?.isNew" class="operate-button del-button" @click="delItem(row, $index)">
              <el-icon size="12">
                <Minus color="#ffffff" />
              </el-icon>
            </div>
            <div
              v-else-if="row?.productType === 2"
              class="operate-button add-button"
              @click="addItem(row)"
            >
              <el-icon size="12">
                <Plus color="#ffffff" />
              </el-icon>
            </div>
          </template>
        </el-table-column> -->
        <!--        <template #append v-if="form.list?.length">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-danger">全部填充</div>
            <div class="text-danger">！此操作将填充所有产品折扣信息</div>
            <div class="d-flex">
              <el-space style="width: 280px">
                <NumberInput
                  size="small"
                  placeholder="请输入"
                  style="width: 120px"
                  v-model="msrp"
                  :precision="4"
                />
                <CurrencySelect  style="width: 140px" v-model="currencyCode" />
              </el-space>
              <div style="width: 80px">
                <el-button type="primary" @click="cover">确认</el-button>
              </div>
            </div>
          </div>
        </template>-->
      </el-table>
      <div
        v-if="form.list?.length"
        class="d-flex justify-content-between align-items-center mt-2 mb-2"
      >
        <div class="text-danger">全部填充</div>
        <div class="text-danger">！此操作将填充所有产品折扣信息</div>
        <div class="d-flex">
          <el-space style="width: 320px">
            <NumberInput
              size="small"
              placeholder="请输入"
              style="width: 120px"
              v-model="msrp"
              :precision="4"
            />
            <CurrencySelect style="width: 140px" v-model="currencyCode" />
          </el-space>
          <el-space style="width: 310px">
            <NumberInput
              size="small"
              placeholder="请输入"
              style="width: 120px"
              v-model="msrpVc"
              :precision="4"
            />
            <CurrencySelect style="width: 140px" v-model="currencyCodeVc" />
          </el-space>
          <div style="width: 80px">
            <el-button type="primary" @click="cover">确认</el-button>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, dataApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { Plus, Minus } from '@element-plus/icons-vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    list: [{}] as any[],
  });

  const rules = reactive({
    countryCode: [
      {
        required: true,
        message: '请选择国家',
        trigger: 'change',
      },
    ],
    minSalePrice: [
      {
        required: true,
        message: '请输入MSRP',
        trigger: ['change', 'blur'],
      },
    ],
    minVcSalePrice: [
      {
        required: true,
        message: '请输入MSRP',
        trigger: ['change', 'blur'],
      },
    ],
    currencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: 'change',
      },
    ],
    currencyCodeVc: [
      {
        required: true,
        message: '请选择币种',
        trigger: 'change',
      },
    ],
  });

  const msrp = ref('');
  const currencyCode = ref('');
  const msrpVc = ref('');
  const currencyCodeVc = ref('');

  const regex = /^\d{1,10}(\.\d{1,4})?$/;
  const handlePriceBlur = (e, row) => {
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      sku.minSalePrice = e.target.value;
    });
  };
  const handlePriceVcBlur = (e, row) => {
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      sku.minVcSalePrice = e.target.value;
    });
  };

  const handlePriceChange = (val, row) => {
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      row.minSalePrice = 1;
    }
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.minSalePrice = val;
      });
    } else {
      const parent = form.value.list?.findIndex((item) => item.spuCode === row?.spuCode);
      let min = form.value.list[parent]?.skuBeanList?.[0]?.minSalePrice || 0;
      let max = form.value.list[parent]?.skuBeanList?.[0]?.minSalePrice || 0;
      form.value.list[parent]?.skuBeanList?.forEach((sku) => {
        if (sku.minSalePrice && sku.minSalePrice < min) {
          min = sku.minSalePrice;
        }
        if (sku.minSalePrice && sku.minSalePrice > max) {
          max = sku.minSalePrice;
        }
      });
      form.value.list[parent].priceRange = min === max ? min : `${min}-${max}`;
      form.value.list[parent].minSalePrice = min;
      form.value.list[parent].maxSalePrice = max;
    }
  };
  const handlePriceVCChange = (val, row) => {
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      row.minVcSalePrice = 1;
    }
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.minVcSalePrice = val;
      });
    } else {
      const parent = form.value.list?.findIndex((item) => item.spuCode === row?.spuCode);
      let min = form.value.list[parent]?.skuBeanList?.[0]?.minVcSalePrice || 0;
      let max = form.value.list[parent]?.skuBeanList?.[0]?.minVcSalePrice || 0;
      form.value.list[parent]?.skuBeanList?.forEach((sku) => {
        if (sku.minVcSalePrice && sku.minVcSalePrice < min) {
          min = sku.minVcSalePrice;
        }
        if (sku.minVcSalePrice && sku.minVcSalePrice > max) {
          max = sku.minVcSalePrice;
        }
      });
      form.value.list[parent].priceVcRange = min === max ? min : `${min}-${max}`;
      form.value.list[parent].minVcSalePrice = min;
      form.value.list[parent].maxVcSalePrice = max;
    }
  };

  const cover = () => {
    if (!msrp.value || !currencyCode.value) {
      ElMessage.warning('请填写MSRP和币种');
      return;
    }
    if (!msrpVc.value || !currencyCodeVc.value) {
      ElMessage.warning('请填写MSRP和币种');
      return;
    }
    form.value.list.forEach((item) => {
      item.minSalePrice = msrp.value;
      item.minVcSalePrice = msrpVc.value;
      item.maxSalePrice = msrp.value;
      item.maxVcSalePrice = msrpVc.value;
      item.priceRange = msrp.value;
      item.priceVcRange = msrpVc.value;
      item.currencyCode = currencyCode.value;
      item.currencyCodeVc = currencyCodeVc.value;
      item?.skuBeanList?.forEach((sku) => {
        sku.minSalePrice = msrp.value;
        sku.minVcSalePrice = msrpVc.value;
        sku.currencyCode = currencyCode.value;
        sku.currencyCodeVc = currencyCodeVc.value;
      });
    });
  };

  const handleCurrencyChange = (val, row) => {
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.currencyCode = val;
      });
    }
  };
  const handleCurrencyVcChange = (val, row) => {
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.currencyCodeVc = val;
      });
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res: any = await productApi.luteosProductMsrpBatchSave({
        saveBeanList: form.value?.list,
      });
      if (res.tip) {
        ElMessage.warning(res.tip);
      } else {
        ElMessage.success('保存成功');
      }
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const loading = ref(false);
  const queryDetail = async (codeList) => {
    try {
      loading.value = true;
      const res = await productApi.luteosProductMsrpQueryBatchEditList({
        codeList,
      });
      form.value.list =
        res?.resultList?.map((item) => {
          item.priceRange = `${item.minSalePrice}-${item.maxSalePrice}`;
          item.priceVcRange = `${item.minVcSalePrice}-${item.maxVcSalePrice}`;
          return item;
        }) || [];
    } finally {
      loading.value = false;
    }
  };

  const getChannelList = (skuCode) => {
    return (
      form.value.list[0]?.skuBeanList
        ?.filter((item) => item.skuCode === skuCode)
        ?.map((item) => item.channelCode) || []
    );
  };

  const addItem = (row) => {
    const parent = form.value.list?.find((item) => item.spuCode === row?.spuCode);
    const index = parent?.skuBeanList?.findIndex((item) => item.code === row?.code);
    parent?.skuBeanList?.splice(index + 1, 0, {
      spuCode: row.spuCode,
      skuCode: row.skuCode,
      skuName: row.skuName,
      countryCode: '',
      productType: row.productType,
      disableChannels: getChannelList(row.skuCode),
      isNew: true,
    });
  };

  const delItem = (row, $index) => {
    const index = form.value?.list?.findIndex((item) => item.spuCode === row?.spuCode);
    let beforeLength = 0;
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        beforeLength += form.value?.list[i]?.skuBeanList?.length + 1;
      }
    }
    form.value?.list?.[index]?.skuBeanList?.splice($index - beforeLength - 1, 1);
  };

  const getProp = (row, $index, field) => {
    if (row?.productType === 1) return '';
    const index = form.value?.list?.findIndex((item) => item.spuCode === row?.spuCode);
    let beforeLength = 0;
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        beforeLength += form.value?.list[i]?.skuBeanList?.length + 1;
      }
    }
    return `list.${index}.skuBeanList.${$index - beforeLength - 1}.${field}`;
  };

  const open = (codeList) => {
    getSiteOptions();
    msrp.value = '';
    currencyCode.value = '';
    msrpVc.value = '';
    currencyCodeVc.value = '';
    queryDetail(codeList);
    visible.value = true;
  };
  const countryMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
      // scene: props.scene,
    });
    countryMap.value = res?.countryList || [];
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
    }
  }
  .operate-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .add-button {
    background: var(--el-color-primary);
    &:hover {
      background: var(--el-color-primary-light-3);
    }
  }

  .del-button {
    background: var(--el-color-danger);
    &:hover {
      background: var(--el-color-danger-light-3);
    }
  }
</style>
