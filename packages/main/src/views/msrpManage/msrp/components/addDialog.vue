<template>
  <el-dialog width="1550px" title="新增" v-model="visible" @close="visible = false" align-center>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="SPU" prop="spuCode">
            <el-button size="small" type="primary" @click="select">选择</el-button>
            <div class="text-break me-2">{{ form?.spuCode }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form?.spuCode">
          <el-form-item label="产品名称">
            <div style="line-height: 38px">{{ form?.spuName }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="SKU" prop="skuCodeList">
            <el-select
              placeholder="请选择"
              v-model="form.skuCodeList"
              multiple
              allowAll
              clearable
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="5"
              @change="handleSkuChange"
            >
              <template #empty>
                <div class="text-center">{{ form?.spuCode ? '暂无SKU' : '请先选择SPU' }}</div>
              </template>
              <!-- <el-option label="所有SKU" value="all" v-if="skuList.length > 0" /> -->
              <el-option v-for="item in skuList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="国家" prop="countryCode">
            <CountrySelect
              v-model="form.countryCode"
              placeholder="国家"
              clearable
              @change="queryDetail"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="渠道" prop="channelList">
            <ProductChannelSelect
              v-model="form.channelList"
              placeholder="渠道"
              multiple
              clearable
              :max-collapse-tags="4"
              @change="queryDetail"
            />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-table
        :data="form?.saveBeanList"
        row-key="skuCode"
        default-expand-all
        :tree-props="{
          children: 'skuBeanList',
        }"
      >
        <el-table-column label="产品信息" width="400">
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
        <el-table-column label="国家" prop="countryCode" width="64px">
          <template #default="{ row }">
            <el-form-item label-width="0">
              {{ row?.countryCode }}
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="币种*" prop="channelName" width="164px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                label-width="0"
                :prop="
                  row?.productType === 2
                    ? 'saveBeanList[0].skuBeanList.' + ($index - 1) + '.currencyCode'
                    : 'saveBeanList[0].currencyCode'
                "
                :rules="rules.currencyCode"
              >
                <CurrencySelect
                  style="width: 100px"
                  v-model="row.currencyCode"
                  class="currencySelect"
                  size="small"
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
        <el-table-column label="MSRP（全渠道）*" prop="channelName" width="150px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].priceRange`"
                :rules="[{ required: true, message: '请输入MSRP', trigger: 'change' }]"
              >
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
                :prop="'saveBeanList[0].skuBeanList.' + ($index - 1) + '.minSalePrice'"
                :rules="rules.minSalePrice"
              >
                <NumberInput
                  style="width: 120px"
                  placeholder="请输入"
                  v-model="row.minSalePrice"
                  :precision="2"
                  :max="9999999999.99999"
                  @change="
                    (val) => {
                      handlePriceChange(val, row);
                    }
                  "
                />
              </el-form-item>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="平销红线价/折扣率" prop="channelName" width="232px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].normalRedlinePrice`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="'saveBeanList[0].skuBeanList.' + ($index - 1) + '.normalRedlinePrice'"
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
              <!-- ///// 平销百分比 /// -->
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].normalRedlineDiscountRate`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="'saveBeanList[0].skuBeanList.' + ($index - 1) + '.normalRedlineDiscountRate'"
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
        <el-table-column label="小促红线价/折扣率" prop="channelName" width="232px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].smallPromotionRedlinePrice`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="
                  'saveBeanList[0].skuBeanList.' + ($index - 1) + '.smallPromotionRedlinePrice'
                "
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
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].smallPromotionRedlineDiscountRate`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="
                  'saveBeanList[0].skuBeanList.' +
                  ($index - 1) +
                  '.smallPromotionRedlineDiscountRate'
                "
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
        <el-table-column label="大促红线价/折扣率" prop="channelName" width="232px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].bigPromotionRedlinePrice`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="'saveBeanList[0].skuBeanList.' + ($index - 1) + '.bigPromotionRedlinePrice'"
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
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`saveBeanList[${$index}].bigPromotionRedlineDiscountRate`"
                :rules="rules.normalRedlinePrice"
              >
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
                :prop="
                  'saveBeanList[0].skuBeanList.' + ($index - 1) + '.bigPromotionRedlineDiscountRate'
                "
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
        <!-- <el-table-column label="亚马逊-VC" width="320px">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item v-if="row.productType === 1" label-width="0">
                <el-input
                  placeholder="请输入"
                  style="width: 120px"
                  v-model="row.priceVcRange"
                  @blur="
                    (e) => {
                      handleVcPriceBlur(e, row);
                    }
                  "
                />
              </el-form-item>
              <el-form-item
                v-else
                label-width="0"
                :prop="'saveBeanList[0].skuBeanList.' + ($index - 1) + '.minVcSalePrice'"
                :rules="rules.minVcSalePrice"
              >
                <NumberInput
                  style="width: 120px"
                  placeholder="请输入"
                  v-model="row.minVcSalePrice"
                  :precision="4"
                  :max="9999999999.99999"
                  @change="
                    (val) => {
                      handleVcPriceChange(val, row);
                    }
                  "
                />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="
                  row?.productType === 2
                    ? 'saveBeanList[0].skuBeanList.' + ($index - 1) + '.currencyCodeVc'
                    : 'saveBeanList[0].currencyCodeVc'
                "
                :rules="[
                  {
                    required:
                      (row?.productType === 2 && Number(row.minVcSalePrice) > 0) ||
                      (row?.productType === 1 && row.priceVcRange),
                    message: '请选择币种',
                    trigger: 'change',
                  },
                ]"
              >
                <CurrencySelect
                  style="width: 140px"
                  v-model="row.currencyCodeVc"
                  size="small"
                  @change="
                    (val) => {
                      handleCurrencyVcChange(val, row);
                    }
                  "
                />
              </el-form-item>
            </el-space>
          </template>
        </el-table-column> -->
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <BindGoods
    ref="selectSpuDialogRef"
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-row="{ productSpu: form.spuCode }"
    :selected-key="form.spuCode"
    select-one
    confirmText="确认"
  />
</template>

<script setup lang="ts">
  import { memberApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import { Minus, Plus } from '@element-plus/icons-vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    spuCode: '',
    countryCode: '',
    channel: '',
    operator: '',
    gtm: '',
    channelList: ['all', 'amazon-vc'],
  });
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

  // 选择商品
  const selectSpuDialogRef = ref();
  const bindGoodsVisible = ref(false);
  const select = async () => {
    bindGoodsVisible.value = true;
    await nextTick();
    selectSpuDialogRef.value?.open();
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.spuCode = val?.productSpu;
      form.value.spuName = val?.name;
      formRef.value?.validateField('spuCode');
      // queryDetail();
      querySkuList();
    }
    bindGoodsVisible.value = false;
  };

  const regex = /^\d{1,10}(\.\d{1,2})?$/;
  const handlePriceBlur = (e, row) => {
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      sku.minSalePrice = e.target.value;
      handlePriceChange(e.target.value, sku);
    });
  };
  const handleVcPriceBlur = (e, row) => {
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      sku.minVcSalePrice = e.target.value;
    });
  };

  const handlePriceChange = (val, cur) => {
    // console.log('handlePriceChange', val, cur);
    const row = form.value.saveBeanList[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur.minSalePrice = 1;
    }
    let min = row?.skuBeanList?.[0]?.minSalePrice || 0;
    let max = row?.skuBeanList?.[0]?.minSalePrice || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku.minSalePrice && sku.minSalePrice < min) {
        min = sku.minSalePrice;
      }
      if (sku.minSalePrice && sku.minSalePrice > max) {
        max = sku.minSalePrice;
      }
    });
    row.priceRange = min === max ? min : `${min}-${max}`;
    row.minSalePrice = min;
    row.maxSalePrice = max;
    // 通过 总价 变化  ,计算 所有折扣
    // const arr = ['normalRedlinePrice', 'smallPromotionRedlinePrice', 'bigPromotionRedlinePrice'];
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
        handleRedlinePriceChange(cur[key], cur, key, true);
      }
      if (cur.minSalePrice > 0 && cur[type]) {
        cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
        handleRedlinePriceChange(cur[key], cur, key, true);
      }
    });
  };
  const handleVcPriceChange = (val, cur) => {
    const row = form.value.saveBeanList[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur.minVcSalePrice = 1;
    }
    let min = row?.skuBeanList?.[0]?.minVcSalePrice || 0;
    let max = row?.skuBeanList?.[0]?.minVcSalePrice || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku.minVcSalePrice && sku.minVcSalePrice < min) {
        min = sku.minVcSalePrice;
      }
      if (sku.minVcSalePrice && sku.minVcSalePrice > max) {
        max = sku.minVcSalePrice;
      }
    });
    row.priceVcRange = min === max ? min : `${min}-${max}`;
    row.minVcSalePrice = min;
    row.maxVcSalePrice = max;
  };
  // v-model="row.priceRange"
  // 动态计算  MSRP * （1-折扣率）=红线价
  const handleRedlinePriceBlur = (e, row, type: any, repeat?) => {
    // console.log('红线价 spu---', e, row, type);
    row.minSalePrice = row.priceRange;
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      e.target.value = '';
      return;
    }
    const key = type.replace('Price', 'DiscountRate');
    // 延伸计算 , 通过 促销价格 ==>  促销率
    if (row.minSalePrice > 0 && !repeat) {
      row[key] = (((row.minSalePrice - row[type]) / row.minSalePrice) * 100).toFixed(2);
      handleRedlineRateBlur({ target: { value: row[key] } }, row, key, true);
    }
    row?.skuBeanList?.forEach((sku) => {
      // sku.minSalePrice = e.target.value;
      sku[type] = e.target.value;
    });
  };
  const handleRedlinePriceChange = (val, cur, type: any, repeat?) => {
    // console.log('handleRedlinePriceChange ---');
    // console.log(val, cur);
    const row = form.value.saveBeanList[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur[type] = 1;
    }
    let min = row?.skuBeanList?.[0][type] || 0;
    let max = row?.skuBeanList?.[0][type] || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku[type] && sku[type] * 1 < min) {
        min = sku[type];
      }
      if (sku[type] && sku[type] * 1 > max) {
        max = sku[type];
      }
    });
    row[type] = min * 1 === max * 1 ? min : `${min}-${max}`;
    const key = type.replace('Price', 'DiscountRate');
    // 延伸计算 , 通过 促销价格 ==>  促销率
    if (cur.minSalePrice > 0 && !repeat) {
      cur[key] = (((cur.minSalePrice - cur[type]) / cur.minSalePrice) * 100).toFixed(2);
      handleRedlineRateChange(cur[key], cur, key, true);
    }
    row[`min${type.charAt(0).toUpperCase()}${type.slice(1)}`] = min;
    row[`max${type.charAt(0).toUpperCase()}${type.slice(1)}`] = max;
  };
  const regex2 = /^\d{1,2}(\.\d{1,2})?$/;
  const handleRedlineRateBlur = (e, cur, type: any, repeat?) => {
    // console.log('handleRedlineRateBlur rrr', type);
    // console.log(e, e.target.value, cur);
    const row = form.value.saveBeanList[0];
    if (!regex2.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数,范围为0到100');
      if (cur.productType === 1) {
        cur[type] = '';
      } else {
        cur[type] = 1;
      }
      // return;
    }
    const key = type.replace('DiscountRate', 'Price');
    // 延伸计算 , 通过 促销率 ==> 促销价格
    if (row.minSalePrice > 0 && !repeat) {
      row[key] = (row.minSalePrice * (1 - e.target.value / 100)).toFixed(2);
      handleRedlinePriceBlur({ target: { value: row[key] } }, row, key, true);
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
    const row = form.value.saveBeanList[0];
    if (!regex2.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数,范围为0到100');
      cur[type] = 1;
      // return;
    }
    let min = row?.skuBeanList?.[0][type] || 0;
    let max = row?.skuBeanList?.[0][type] || 0;
    row?.skuBeanList?.forEach((sku) => {
      if (sku[type] && sku[type] * 1 < min) {
        min = sku[type];
      }
      if (sku[type] && sku[type] * 1 > max) {
        max = sku[type];
      }
    });
    row[type] = min * 1 === max * 1 ? min : `${min}-${max}`;
    const key = type.replace('DiscountRate', 'Price');
    // 延伸计算 ,通过 促销率 ==>  促销价格
    if (cur.minSalePrice > 0 && !repeat) {
      cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
      handleRedlinePriceChange(cur[key], cur, key, true);
    }
    row[`min${type.charAt(0).toUpperCase()}${type.slice(1)}`] = min;
    row[`max${type.charAt(0).toUpperCase()}${type.slice(1)}`] = max;
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
    if (!form.value?.saveBeanList?.length) {
      ElMessage.warning('暂无可提交数据');
      return;
    }
    // console.log(form.value?.saveBeanList);
    let data = form.value?.saveBeanList[0];
    let isOk = true;
    // data.minSalePrice = '34.99-49.99';
    if (typeof data.minSalePrice === 'string' && data?.minSalePrice?.indexOf('-') > -1) {
      data.minSalePrice = data.minSalePrice.split('-')[0];
    }
    if (typeof data.maxSalePrice === 'string' && data?.maxSalePrice?.indexOf('-') > -1) {
      data.maxSalePrice = data.maxSalePrice.split('-')[1];
    }
    // return;
    if (data?.skuBeanList?.length > 0) {
      for (let i = 0; i < data?.skuBeanList?.length; i++) {
        const sku = data?.skuBeanList[i];
        if (
          !(
            sku.minSalePrice * 1 >= sku.bigPromotionRedlinePrice * 1 &&
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
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductMsrpSave({
        saveBeanList: form.value?.saveBeanList,
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const loading = ref(false);
  const queryDetail = async () => {
    form.value.channelList = ['all', 'amazon-vc'];
    if (!form.value?.spuCode || !form.value?.countryCode || !form.value?.skuCodeList?.length) {
      form.value.saveBeanList = [];
      return;
    }
    try {
      loading.value = true;
      const res = await productApi.luteosProductMsrpQuerySkuList({
        spuCode: form.value.spuCode,
        channelList: form.value.channelList,
        countryCode: form.value.countryCode,
        skuCodeList: form.value.skuCodeList,
      });
      console.log('返回', res);
      form.value.saveBeanList = res?.resultList?.map((item) => {
        return {
          ...item,
          priceRange: '',
          priceVcRange: '',
        };
      });
      console.log('form.value.saveBeanList ', form.value.saveBeanList);
    } finally {
      loading.value = false;
    }
  };

  const skuList = ref([]);
  const querySkuList = async () => {
    if (!form.value.spuCode) return;
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      keyWord: form.value.spuCode,
      pageNum: 1,
      pageSize: 100,
    });
    skuList.value = res?.productSkuBeanList?.map((item) => item.skuCode);
  };

  const handleSkuChange = (val) => {
    if (val.includes('all')) {
      form.value.skuCodeList = skuList.value;
    }
    queryDetail();
  };

  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };

  const open = () => {
    form.value = {
      spuCode: '',
      countryCode: '',
      channel: '',
      operator: '',
      gtm: '',
    };
    skuList.value = [];
    formRef.value?.resetFields();
    queryGtmList();
    visible.value = true;
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
    .currencySelect {
      min-width: 115px !important;
    }
  }

  :deep(.el-input-group__append) {
    padding: 0 5px;
  }

  :deep(.el-form-item__content) {
    line-height: 24px;
  }
  .text-break {
    margin-left: 30px;
  }
</style>
