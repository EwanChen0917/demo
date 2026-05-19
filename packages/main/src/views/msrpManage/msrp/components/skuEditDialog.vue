<template>
  <el-dialog
    width="1550px"
    title="编辑"
    v-model="visible"
    class="ui-dialog"
    @close="visible = false"
  >
    <div>
      <div class="batch-operation" v-if="form.list?.length">
        <div class="title">
          <span>批量填充区</span>
          <span class="info">（此操作将填充所有产品折扣信息）</span>
        </div>
        <el-form :mode="{}" label-position="top">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="MSRP全渠道-线上">
                <NumberInput
                  placeholder="请输入MSRP全渠道-线上"
                  v-model="msrp"
                  :precision="2"
                  :max="9999999999.99999"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="平销红线价">
                <NumberInput
                  placeholder="请输入平销红线价"
                  v-model="normalRedlinePrice"
                  :precision="2"
                  :max="9999999999.99999"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="小促红线价">
                <NumberInput
                  placeholder="请输入小促红线价"
                  v-model="smallPromotionRedlinePrice"
                  :precision="2"
                  :max="9999999999.99999"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="大促红线价">
                <NumberInput
                  placeholder="请输入大促红线价"
                  v-model="bigPromotionRedlinePrice"
                  :precision="2"
                  :max="9999999999.99999"
                />
              </el-form-item>
            </el-col>
            <!-- <CurrencySelect style="width: 140px" v-model="currencyCode" />
                <NumberInput
                  placeholder="请输入"
                  style="width: 120px; margin-left: 45px"
                  v-model="msrpVc"
                  :precision="2"
                  :max="9999999999.99999"
                />
                <CurrencySelect style="width: 140px" v-model="currencyCodeVc" /> -->
          </el-row>
          <div style="width: 100px">
            <el-button type="primary" plain @click="cover" size="small">全部填充</el-button>
          </div>
        </el-form>
      </div>
      <el-form ref="formRef" :model="form">
        <el-table :data="form.list" default-expand-all border row-key="code">
          <el-table-column label="产品信息" min-width="300">
            <template #default="{ row }">
              <OverflowTooltip :content="row?.skuName" />
              <div class="el-form-bottom">{{ row?.skuCode }}</div>
            </template>
          </el-table-column>
          <el-table-column label="国家" prop="countryCode" min-width="80" />
          <el-table-column label="币种" prop="channelName" min-width="185">
            <template #default="{ row, $index }">
              <el-space class="pe-3">
                <el-form-item
                  label-width="0"
                  :prop="`list['${$index}'].currencyCode`"
                  :rules="[{ required: true, message: '请选择币种', trigger: 'change' }]"
                >
                  <CurrencySelect
                    v-model="row.currencyCode"
                    class="currencySelect"
                    disabled
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
          <el-table-column label="MSRP（全渠道）" min-width="150">
            <template #header>
              <div>
                MSRP（全渠道）
                <span style="color: var(--bs-danger)">*</span>
              </div>
            </template>
            <template #default="{ row, $index }">
              <el-space>
                <el-form-item
                  class="table-form-item"
                  :prop="`list['${$index}'].minSalePrice`"
                  :rules="[{ required: true, message: '请输入MSRP', trigger: 'change' }]"
                >
                  <NumberInput
                    style="width: 120px"
                    placeholder="请输入"
                    v-model="row.minSalePrice"
                    :precision="2"
                    :max="999999999"
                    @change="
                      (val) => {
                        handlePriceChange(val, row);
                      }
                    "
                  />
                </el-form-item>
                <!-- <el-form-item
                  class="table-form-item"
                  :prop="`list['${$index}'].currencyCode`"
                  :rules="[{ required: true, message: '请选择币种', trigger: 'change' }]"
                >
                  <CurrencySelect style="width: 140px" v-model="row.currencyCode" />
                </el-form-item> -->
                <!-- <NumberInput
                  placeholder="请输入"
                  style="width: 120px"
                  v-model="row.minSalePrice"
                  :precision="2"
                />
                <CurrencySelect style="width: 140px" v-model="row.currencyCode" /> -->
              </el-space>
            </template>
          </el-table-column>
          <el-table-column label="平销红线价/折扣率" prop="channelName" min-width="225">
            <template #default="{ row, $index }">
              <el-space class="pe-3">
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.normalRedlinePrice"
                    @blur="
                      (e) => {
                        handleRedlinePriceBlur(e, row, 'normalRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].normalRedlinePrice`"
                  :rules="rules.normalRedlinePrice"
                >
                  <NumberInput
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.normalRedlinePrice"
                    :precision="2"
                    :max="9999999999.99999"
                    @change="
                      (val) => {
                        handleRedlinePriceChange(val, row, 'normalRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <!-- ///// 百分比 /// -->
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.normalRedlineDiscountRate"
                    size="small"
                    @blur="
                      (e) => {
                        handleRedlineRateBlur(e, row, 'normalRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].normalRedlineDiscountRate`"
                  :rules="rules.normalRedlinePrice"
                >
                  <el-input
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.normalRedlineDiscountRate"
                    size="small"
                    :precision="2"
                    :max="100"
                    @change="
                      (val) => {
                        handleRedlineRateChange(val, row, 'normalRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-space>
            </template>
          </el-table-column>
          <el-table-column label="小促红线价/折扣率" prop="channelName" min-width="225">
            <template #default="{ row, $index }">
              <el-space class="pe-3">
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.smallPromotionRedlinePrice"
                    @blur="
                      (e) => {
                        handleRedlinePriceBlur(e, row, 'smallPromotionRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].smallPromotionRedlinePrice`"
                  :rules="rules.normalRedlinePrice"
                >
                  <NumberInput
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.smallPromotionRedlinePrice"
                    :precision="2"
                    :max="9999999999.99999"
                    @change="
                      (val) => {
                        handleRedlinePriceChange(val, row, 'smallPromotionRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <!-- ///// 百分比 /// -->
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.smallPromotionRedlineDiscountRate"
                    size="small"
                    @blur="
                      (e) => {
                        handleRedlineRateBlur(e, row, 'smallPromotionRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].smallPromotionRedlineDiscountRate`"
                  :rules="rules.normalRedlinePrice"
                >
                  <el-input
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.smallPromotionRedlineDiscountRate"
                    size="small"
                    :precision="2"
                    :max="100"
                    @change="
                      (val) => {
                        handleRedlineRateChange(val, row, 'smallPromotionRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-space>
            </template>
          </el-table-column>
          <el-table-column label="大促红线价/折扣率" prop="channelName" min-width="225">
            <template #default="{ row, $index }">
              <el-space class="pe-3">
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.bigPromotionRedlinePrice"
                    @blur="
                      (e) => {
                        handleRedlinePriceBlur(e, row, 'bigPromotionRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].bigPromotionRedlinePrice`"
                  :rules="rules.normalRedlinePrice"
                >
                  <NumberInput
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.bigPromotionRedlinePrice"
                    :precision="2"
                    :max="9999999999.99999"
                    @change="
                      (val) => {
                        handleRedlinePriceChange(val, row, 'bigPromotionRedlinePrice');
                      }
                    "
                  />
                </el-form-item>
                <!-- ///// 大促红线价 百分比 /// -->
                <el-form-item v-if="row.productType === 1" label-width="0">
                  <el-input
                    placeholder="请输入"
                    style="width: 100px"
                    v-model="row.bigPromotionRedlineDiscountRate"
                    size="small"
                    @blur="
                      (e) => {
                        handleRedlineRateBlur(e, row, 'bigPromotionRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-else
                  label-width="0"
                  :prop="`list['${$index}'].bigPromotionRedlineDiscountRate`"
                  :rules="rules.normalRedlinePrice"
                >
                  <el-input
                    style="width: 100px"
                    placeholder="请输入"
                    v-model="row.bigPromotionRedlineDiscountRate"
                    size="small"
                    :precision="2"
                    :max="100"
                    @change="
                      (val) => {
                        handleRedlineRateChange(val, row, 'bigPromotionRedlineDiscountRate');
                      }
                    "
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-space>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="100">
            <template #default="{ row, $index }">
              <div v-if="row?.isNew" class="operate-button del-button" @click="delItem(row, $index)">
                <el-icon size="12">
                  <Minus color="#ffffff" />
                </el-icon>
              </div>
              <div v-else class="operate-button add-button" @click="addItem(row, $index)">
                <el-icon size="12">
                  <Plus color="#ffffff" />
                </el-icon>
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
        <el-button @click="visible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, dataApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    list: [{}] as any[],
  });
  const msrp = ref();
  const normalRedlinePrice = ref();
  const smallPromotionRedlinePrice = ref();
  const bigPromotionRedlinePrice = ref();
  const currencyCode = ref('');
  const currencyCodeVc = ref('');

  const rules = reactive({
    spuCode: [
      {
        required: true,
        message: '请选择商品',
        trigger: 'change',
      },
    ],
    countryCode: [
      {
        required: true,
        message: '请选择国家',
        trigger: 'change',
      },
    ],
    // channelList: [
    //   {
    //     required: true,
    //     message: '请选择渠道',
    //     trigger: 'change',
    //   },
    // ],
    minSalePrice: [
      {
        required: true,
        message: '请输入MSRP',
        trigger: ['change', 'blur'],
      },
    ],
    normalRedlinePrice: [
      {
        required: true,
        message: '请输入',
        trigger: ['change', 'blur'],
      },
    ],
    minVcSalePrice: [
      {
        required: false,
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
        required: false,
        message: '请选择币种',
        trigger: 'change',
      },
    ],
  });
  const handleCurrencyChange = (val, row) => {
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.currencyCode = val;
      });
    }
  };

  const handlePriceChange = (val, cur) => {
    // console.log('handlePriceChange : ', val, cur);
    const row = form.value.list[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur.minSalePrice = 1;
    }
    const arr = [
      'normalRedlineDiscountRate',
      'smallPromotionRedlineDiscountRate',
      'bigPromotionRedlineDiscountRate',
    ];
    arr.map((type) => {
      const key = type.replace('DiscountRate', 'Price');
      // 延伸计算 ,通过 促销率 ==>  促销价格
      if (cur.minSalePrice > 0 && cur[key]) {
        cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
        // handleRedlinePriceChange(cur[key], cur, key, true);
      }
      if (cur.minSalePrice > 0 && cur[type]) {
        cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
        // handleRedlinePriceChange(cur[key], cur, key, true);
      }
    });
  };
  const regex = /^\d{1,10}(\.\d{1,2})?$/;
  // 动态计算
  // watchEffect(
  //   () => {
  //     // 动态计算
  //     console.log('动态计算', form.value?.list);
  //     if (form.value?.list) {
  //       const row = form.value?.list;
  //       console.log(row, 'row--');
  //       row?.forEach((sku) => {
  //         console.log(sku, 'sku');
  //       });
  //     }
  //   },
  //   { flush: 'post' }
  // );
  // v-model="row.priceRange"
  // 动态计算  MSRP * （1-折扣率）=红线价
  const handleRedlinePriceBlur = (e, row, type: any) => {
    // console.log('handleRedlinePriceBlur ---', e.target.value);
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      // sku.minSalePrice = e.target.value;
      sku[type] = e.target.value;
    });
  };
  const handleRedlinePriceChange = (val, cur, type: any, repeat?) => {
    console.log('handleRedlinePriceChange ---', type);
    console.log(val, cur);
    const row = form.value.list[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur[type] = 1;
    }
    const key = type.replace('Price', 'DiscountRate');
    // 延伸计算 , 通过 促销价格 ==>  促销率
    if (cur.minSalePrice > 0 && !repeat) {
      cur[key] = (((cur.minSalePrice - cur[type]) / cur.minSalePrice) * 100).toFixed(2);
      // handleRedlineRateChange(cur[key], cur, key, true);
    }
  };
  const regex2 = /^\d{1,2}(\.\d{1,2})?$/;
  const handleRedlineRateBlur = (e, cur, type: any) => {
    // console.log('handleRedlineRateBlur rrr', type);
    // console.log(e, e.target.value, cur);
    const row = form.value.list[0];
    if (!regex2.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数,范围为0到100');
      if (cur.productType === 1) {
        cur[type] = '';
      } else {
        cur[type] = 1;
      }
      return;
    }
    if (cur.productType === 1) {
      cur?.skuBeanList?.forEach((sku) => {
        // sku.minSalePrice = e.target.value;
        sku[type] = e.target.value;
      });
    }
  };
  // 百分比变化
  const handleRedlineRateChange = (val, cur, type: any, repeat?) => {
    // console.log('handleRedlineRateChange');
    // console.log(val, cur, type);
    const row = form.value.list[0];
    console.log(row, 'row');
    if (!regex2.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数,范围为0到100');
      cur[type] = 1;
      // if (cur.productType === 1) {
      //   cur[type] = '';
      // } else {
      //   cur[type] = 1;
      // }
      return;
    }
    const key = type.replace('DiscountRate', 'Price');
    // 延伸计算 ,通过 促销率 ==>  促销价格
    if (cur.minSalePrice > 0 && !repeat) {
      cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
      // handleRedlinePriceChange(cur[key], cur, key, true);
    }
  };

  const cover = () => {
    if (
      !(
        msrp.value > 0 &&
        normalRedlinePrice.value > 0 &&
        smallPromotionRedlinePrice.value > 0 &&
        bigPromotionRedlinePrice.value > 0
      )
    ) {
      ElMessage.warning('请填写MSRP全渠道-线上、平销红线价、小促红线价、大促红线价');
      return;
    }
    if (
      !(
        msrp.value * 1 >= normalRedlinePrice.value * 1 &&
        normalRedlinePrice.value * 1 >= smallPromotionRedlinePrice.value * 1 &&
        smallPromotionRedlinePrice.value * 1 >= bigPromotionRedlinePrice.value * 1
      )
    ) {
      ElMessage.warning('价格需要满足MSRP > 平销红线价 > 小促红线价 > 大促红线价，请核实');
      return;
    }
    form.value.list.forEach((item) => {
      item.minSalePrice = msrp.value;
      item.normalRedlinePrice = normalRedlinePrice.value;
      item.smallPromotionRedlinePrice = smallPromotionRedlinePrice.value;
      item.bigPromotionRedlinePrice = bigPromotionRedlinePrice.value;

      item.normalRedlineDiscountRate = (
        ((msrp.value - normalRedlinePrice.value) / msrp.value) *
        100
      ).toFixed(2);
      item.smallPromotionRedlineDiscountRate = (
        ((msrp.value - smallPromotionRedlinePrice.value) / msrp.value) *
        100
      ).toFixed(2);
      item.bigPromotionRedlineDiscountRate = (
        ((msrp.value - bigPromotionRedlinePrice.value) / msrp.value) *
        100
      ).toFixed(2);

      // item.minVcSalePrice = msrpVc.value;
      // item.currencyCode = currencyCode.value;
      // item.currencyCodeVc = currencyCodeVc.value;
    });
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const params = form.value?.list;
      let data = form.value;
      let isOk = true;
      if (data?.list?.length > 0) {
        for (let i = 0; i < data?.list?.length; i++) {
          const sku = data?.list[i];
          if (
            !(
              sku.minSalePrice * 1 >= sku.normalRedlinePrice * 1 &&
              sku.normalRedlinePrice * 1 >= sku.smallPromotionRedlinePrice * 1 &&
              sku.smallPromotionRedlinePrice * 1 >= sku.bigPromotionRedlinePrice * 1
            )
          ) {
            isOk = false;
            break;
          }
        }
      }
      if (!isOk) {
        ElMessage.warning('价格需要满足MSRP > 平销红线价 > 小促红线价 > 大促红线价，请核实');
        return;
      }
      const res: any = await productApi.luteosProductMsrpSaveSku({
        skuSaveBeanList: form.value?.list,
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

  const queryDetail = async (code) => {
    const res = await productApi.luteosProductMsrpQuerySkuDetail({
      code,
    });
    form.value.list = res?.skuDetailBeanList;
  };

  const channelList = computed(() => {
    return form.value.list?.map((item) => item.channelCode) || [];
  });

  const addItem = (row, index) => {
    form.value.list.splice(index + 1, 0, {
      skuCode: row.skuCode,
      skuName: row.skuName,
      countryCode: '',
      productType: row.productType,
      oldChannel: row.channelCode,
      isNew: true,
    });
  };

  const delItem = (row, index) => {
    form.value.list?.splice(index, 1);
  };

  const open = (code) => {
    queryDetail(code);
    getSiteOptions();
    msrp.value = '';
    normalRedlinePrice.value = '';
    smallPromotionRedlinePrice.value = '';
    bigPromotionRedlinePrice.value = '';
    currencyCode.value = '';
    // msrpVc.value = '';
    currencyCodeVc.value = '';
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
  .batch-operation {
    background-color: #fff;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 24px;
    .title {
      color: #1e2226;

      /* 较弱/Medium 12 */
      font-family: 'PingFang SC Medium';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 166.667% */
      margin-bottom: 12px;
    }
    .info {
      color: var(---C5, #ff9f22);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
  }
  .currencySelect {
    min-width: 115px !important;
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
  .el-form-bottom {
    margin-bottom: 1.75rem;
  }
</style>
