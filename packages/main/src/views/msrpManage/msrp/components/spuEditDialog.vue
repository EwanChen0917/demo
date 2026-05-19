<template>
  <el-dialog
    width="1550px"
    class="ui-dialog"
    title="编辑"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-form ref="formRef" :model="form">
      <el-table :data="form.list" default-expand-all row-key="code" max-height="65vh">
        <el-table-column type="expand" width="30">
          <template #expand="{ expanded }">
            <i class="iconfont icon-xiangxia icon-expand" :class="expanded ? 'row-open' : ''"></i>
          </template>
          <template #default="{ row }">
            <div class="expand-container">
              <el-table :data="row?.skuBeanList">
                <el-table-column label="产品名称/SPU" min-width="300">
                  <template #default="{ row }">
                    <div v-if="row?.skuCode">
                      <span class="product-name">
                        {{ row?.skuName }}
                      </span>
                      <Copy v-if="row?.skuName" :content="row.skuName" />
                      <div>
                        <span>{{ row?.skuCode }}</span>
                        <Copy v-if="row?.skuCode" :content="row.skuCode" />
                      </div>
                    </div>
                    <div v-else>--</div>
                  </template>
                </el-table-column>
                <el-table-column label="国家" prop="countryCode" min-width="80">
                  <template #default="{ row }">
                    <el-tag type="info">
                      {{ row.countryCode }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="币种" prop="currencyCode" min-width="150">
                  <template #default="{ row, $index }">
                    <el-space class="pe-3">
                      <el-form-item
                        label-width="0"
                        :prop="'list[0].skuBeanList.' + $index + '.currencyCode'"                       "
                        :rules="rules.currencyCode"
                      >
                        <CurrencySelect
                          style="width: 140px"
                          v-model="row.currencyCode"
                          class="currencySelect"
                          disabled
                        />
                      </el-form-item>
                    </el-space>
                  </template>
                </el-table-column>
                <el-table-column label="MSRP（全渠道）" min-width="150">
                  <template #header>
                    <div>
                      全渠道（线上）
                      <span style="color: var(--bs-danger)">*</span>
                    </div>
                  </template>
                  <template #default="{ row, $index }">
                    <el-space class="pe-3">
                      <el-form-item
                        class="table-form-item"
                        :prop="`list[0].skuBeanList[${$index}].minSalePrice`                        "
                        :rules="[{ required: true, message: '请输入MSRP', trigger: 'change' }]"
                      >
                        <NumberInput
                          style="width: 120px"
                          v-model="row.minSalePrice"
                          placeholder="请输入"
                          :precision="2"
                          :max="999999999"
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
                <el-table-column label="平销红线价（折扣率）" align="right" min-width="220">
                  <template #default="{ row, $index }">
                    <el-space class="pe-3">
                      <el-form-item
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].normalRedlinePrice`"
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
                      <el-form-item
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].normalRedlineDiscountRate`"
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
                <el-table-column label="小促红线价/折扣率" min-width="220">
                  <template #default="{ row, $index }">
                    <el-space class="pe-3">
                      <el-form-item
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].smallPromotionRedlinePrice`"
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
                      <!-- ///// 小促 百分比 /// -->
                      <el-form-item
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].smallPromotionRedlineDiscountRate`"
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
                              handleRedlineRateChange(
                                val,
                                row,
                                'smallPromotionRedlineDiscountRate'
                              );
                            }
                          "
                        >
                          <template #append>%</template>
                        </el-input>
                      </el-form-item>
                    </el-space>
                  </template>
                </el-table-column>
                <el-table-column label="大促红线价（折扣率）" min-width="220">
                  <template #default="{ row, $index }">
                    <el-space class="pe-3">
                      <el-form-item
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].bigPromotionRedlinePrice`"
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
                        label-width="0"
                        :prop="`list[0].skuBeanList[${$index}].bigPromotionRedlineDiscountRate`"
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
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品名称/SPU" min-width="290">
          <template #default="{ row }">
            <div>
              <div class="product-name">{{ row?.spuName }}</div>
              <div>{{ row?.spuCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="countryCode"  min-width="80">
          <template #default="{ row }">
            <el-tag type="info">
              {{ row.countryCode }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="channelName"  min-width="150">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                label-width="0"
                :prop="
                  row?.productType === 2
                    ? 'list[0].skuBeanList.' + ($index - 1) + '.currencyCode'
                    : 'list[0].currencyCode'
                "
                :rules="rules.currencyCode"
              >
                <CurrencySelect
                  style="width: 140px"
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
        <el-table-column label="MSRP（全渠道）" prop="msrp"  min-width="150">
          <template #header>
            <div>
              全渠道（线上）
              <span style="color: var(--bs-danger)">*</span>
            </div>
          </template>
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1 && row?.maxSalePrice"
                class="table-form-item"
                :prop="`list[${$index}].priceRange`"
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
                class="table-form-item"
                :prop="
                  $index == 0
                    ? `list[0].minSalePrice`
                    : `list[0].skuBeanList['${$index - 1}'].minSalePrice`
                "
                :rules="[{ required: true, message: '请输入MSRP', trigger: 'change' }]"
              >
                <NumberInput
                  style="width: 120px"
                  v-model="row.minSalePrice"
                  placeholder="请输入"
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
                :prop="
                  $index == 0
                    ? `list[0].currencyCode`
                    : `list[0].skuBeanList['${$index - 1}'].currencyCode`
                "
                :rules="[{ required: true, message: '请选择币种', trigger: 'change' }]"
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
              </el-form-item> -->
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="平销红线价/折扣率" prop="channelName" min-width="220">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`list[${$index}].normalRedlinePrice`"
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
                :prop="
                  $index == 0
                    ? `list[0].normalRedlinePrice`
                    : `list[0].skuBeanList['${$index - 1}'].normalRedlinePrice`
                "
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
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`list[${$index}].normalRedlineDiscountRate`"
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
                :prop="
                  $index == 0
                    ? `list[0].normalRedlineDiscountRate`
                    : `list[0].skuBeanList['${$index - 1}'].normalRedlineDiscountRate`
                "
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
        <el-table-column label="小促红线价/折扣率" prop="channelName" min-width="220">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`list[${$index}].smallPromotionRedlinePrice`"
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
                :prop="'list[0].skuBeanList.' + ($index - 1) + '.smallPromotionRedlinePrice'"
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
              <!-- ///// 小促 百分比 /// -->
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`list[${$index}].smallPromotionRedlineDiscountRate`"
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
                :prop="'list[0].skuBeanList.' + ($index - 1) + '.smallPromotionRedlineDiscountRate'"
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
        <el-table-column label="大促红线价/折扣率" prop="channelName" min-width="220">
          <template #default="{ row, $index }">
            <el-space class="pe-3">
              <el-form-item
                v-if="row.productType === 1"
                label-width="0"
                :prop="`list[${$index}].bigPromotionRedlinePrice`"
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
                :prop="'list[0].skuBeanList.' + ($index - 1) + '.bigPromotionRedlinePrice'"
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
                :prop="`list[${$index}].bigPromotionRedlineDiscountRate`"
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
                :prop="'list[0].skuBeanList.' + ($index - 1) + '.bigPromotionRedlineDiscountRate'"
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
        <!-- <el-table-column label="操作" width="80">
          <template #default="{ row, $index }">
            <div v-if="row?.isNew" class="operate-button del-button" @click="delItem(row, $index)">
              <el-icon size="12">
                <Minus color="#ffffff" />
              </el-icon>
            </div> -->
        <!-- <div
              v-else-if="row?.productType === 2"
              class="operate-button add-button"
              @click="addItem(row, $index)"
            >
              <el-icon size="12">
                <Plus color="#ffffff" />
              </el-icon>
            </div> -->
        <!-- </template>
        </el-table-column> -->
      </el-table>
      <!-- <div v-if="form.list?.length" class="d-flex justify-content-between align-items-center mt-2">
        <div class="text-danger">全部填充</div>
        <div class="text-danger">！此操作将填充所有产品折扣信息</div>
        <div class="d-flex">
          <el-space style="width: 320px">
            <NumberInput size="small" placeholder="请输入" style="width: 120px" v-model="msrp" :precision="2" />
            <CurrencySelect style="width: 140px" v-model="currencyCode" />
          </el-space>
          <el-space style="width: 310px">
            <NumberInput size="small" placeholder="请输入" style="width: 120px" v-model="msrpVc" :precision="2" />
            <CurrencySelect style="width: 140px" v-model="currencyCodeVc" />
          </el-space>
          <div style="width: 80px">
            <el-button type="primary" @click="cover" size="small">全部填充</el-button>
          </div>
        </div>
      </div> -->
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
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { Plus, Minus } from '@element-plus/icons-vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    list: [{}] as any[],
  });
  const msrp = ref('');
  const currencyCode = ref('');
  const msrpVc = ref('');
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

  const regex = /^\d{1,10}(\.\d{1,2})?$/;
  const handlePriceBlur = (e, row) => {
    console.log('handlePriceBlur -----', row);
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      // e.target.value = '';
      return;
    }
    // row.normalRedlinePrice = (e.target.value * (1 - row.normalRedlineDiscountRate / 100)).toFixed(
    //   2
    // );
    // (((row.minSalePrice - row[type]) / row.minSalePrice) * 100).toFixed(2);
    row?.skuBeanList?.forEach((sku) => {
      sku.minSalePrice = e.target.value;
      handlePriceChange(e.target.value, sku);
    });
  };

  const handlePriceChange = (val, cur) => {
    // console.log('handlePriceChange -----', val, cur);
    const row = form.value.list[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur.minSalePrice = 1;
    }
    let min = row?.skuBeanList?.[0]?.minSalePrice || 0;
    let max = row?.skuBeanList?.[0]?.minSalePrice || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku.minSalePrice && sku.minSalePrice * 1 < min) {
        min = sku.minSalePrice;
      }
      if (sku.minSalePrice && sku.minSalePrice * 1 > max) {
        max = sku.minSalePrice;
      }
      // 通过 总价 变化  ,计算 所有折扣
      // row[type] = min === max ? min : `${min}-${max}`;
      // const key = type.replace('DiscountRate', 'Price');
      // const key = 'normalRedlinePrice';
      // // 延伸计算 ,通过 促销率 ==>  促销价格
      // if (cur.minSalePrice > 0 && cur.normalRedlineDiscountRate) {
      //   cur[key] = (cur.minSalePrice * (1 - cur.normalRedlineDiscountRate / 100)).toFixed(2);
      //   handleRedlinePriceChange(cur[key], cur, key, true);
      // }
      // if (cur.minSalePrice > 0 && cur.normalRedlineDiscountRate) {
      //   cur[key] = (cur.minSalePrice * (1 - cur.normalRedlineDiscountRate / 100)).toFixed(2);
      //   handleRedlinePriceChange(cur[key], cur, key, true);
      // }

      //
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
    });
    row.priceRange = min * 1 === max * 1 ? min : `${min}-${max}`;
    row.minSalePrice = min;
    row.maxSalePrice = max;
  };

  // 动态计算  MSRP * （1-折扣率）=红线价
  const handleRedlinePriceBlur = (e, row, type: any, repeat?) => {
    // console.log('红线价 spu---', e, type);
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
    // console.log('handleRedlinePriceChange ---', type);
    // console.log(val, cur);
    const row = form.value.list[0];
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
    // console.log('折扣率 spu---', type);
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
    // console.log('handleRedlineRateChange sku--');
    // console.log(val, cur, type,);
    const row = form.value.list[0];
    if (!regex2.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数,范围为0到100');
      cur[type] = 1;
      // return;
    }
    let min = row?.skuBeanList?.[0][type] || 0;
    let max = row?.skuBeanList?.[0][type] || 0;
    row?.skuBeanList?.forEach((sku) => {
      if (sku[type] && sku[type] < min) {
        min = sku[type];
      }
      if (sku[type] && sku[type] > max) {
        max = sku[type];
      }
    });
    row[type] = min === max ? min : `${min}-${max}`;
    const key = type.replace('DiscountRate', 'Price');
    // 延伸计算 ,通过 促销率 ==>  促销价格
    if (cur.minSalePrice > 0 && !repeat) {
      cur[key] = (cur.minSalePrice * (1 - cur[type] / 100)).toFixed(2);
      handleRedlinePriceChange(cur[key], cur, key, true);
    }
    row[`min${type.charAt(0).toUpperCase()}${type.slice(1)}`] = min;
    row[`max${type.charAt(0).toUpperCase()}${type.slice(1)}`] = max;
  };

  const cover = () => {
    if (!msrp.value || !currencyCode.value) {
      ElMessage.warning('请填写MSRP和币种');
      return;
    }
    if (!msrpVc.value || !currencyCodeVc.value) {
      ElMessage.warning('请填写亚马逊-VCMSRP和币种');
      return;
    }
    form.value.list.forEach((item) => {
      item.minSalePrice = msrp.value;
      item.minVcSalePrice = msrpVc.value;
      item.currencyCode = currencyCode.value;
      item.currencyCodeVc = currencyCodeVc.value;
      item?.skuBeanList?.forEach((sku) => {
        sku.minSalePrice = msrp.value;
        sku.minVcSalePrice = msrpVc.value;
        sku.currencyCode = currencyCode.value;
        sku.currencyCodeVc = currencyCodeVc.value;
      });
    });
    form.value.list[0].minSalePrice = msrp.value;
    form.value.list[0].maxSalePrice = msrp.value;
    form.value.list[0].minVcSalePrice = msrpVc.value;
    form.value.list[0].maxVcSalePrice = msrpVc.value;
    form.value.list[0].priceRange = msrp.value;
    form.value.list[0].priceVCRange = msrpVc.value;
    form.value.list[0].currencyCode = currencyCode.value;
    form.value.list[0].currencyCodeVc = currencyCodeVc.value;
  };

  const handleCurrencyChange = (val, row) => {
    if (row?.productType === 1) {
      row?.skuBeanList?.forEach((sku) => {
        sku.currencyCode = val;
      });
    }
  };
  const handleCurrencyChangeVc = (val, row) => {
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
      const data = form.value?.list[0];
      let isOk = true;
      [
        'normalRedlineDiscountRate',
        'smallPromotionRedlineDiscountRate',
        'bigPromotionRedlineDiscountRate',
      ].forEach((key) => {
        data[key] = `${parseFloat(data[key])}`;
      });
      if (data?.skuBeanList?.length > 0) {
        for (let i = 0; i < data?.skuBeanList?.length; i++) {
          const sku = data?.skuBeanList[i];
          [
            'normalRedlineDiscountRate',
            'smallPromotionRedlineDiscountRate',
            'bigPromotionRedlineDiscountRate',
          ].forEach((key) => {
            sku[key] = `${parseFloat(sku[key])}`;
          });
          if (
            !(
              sku.minSalePrice * 1 >= sku.normalRedlinePrice * 1 &&
              sku.normalRedlinePrice * 1 >= sku.smallPromotionRedlinePrice * 1 &&
              sku.smallPromotionRedlinePrice * 1 >= sku.bigPromotionRedlinePrice * 1
            )
          ) {
            // console.log(
            //   sku.minSalePrice,
            //   sku.bigPromotionRedlinePrice,
            //   sku.smallPromotionRedlinePrice,
            //   sku.normalRedlinePrice
            // );
            isOk = false;
            // break;
          }
        }
      }
      if (!isOk) {
        ElMessage.warning('价格需要满足MSRP > 平销红线价 > 小促红线价 > 大促红线价，请核实');
        return;
      }
      const res: any = await productApi.luteosProductMsrpSaveSpu({
        spuSaveBean: form.value?.list[0],
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
    const res = await productApi.luteosProductMsrpQuerySpuDetail({
      code,
    });
    form.value.list =
      [
        {
          ...res?.spuDetailBean,
          maxSalePrice: res?.spuDetailBean?.maxSalePrice
            ? res?.spuDetailBean?.maxSalePrice
            : res?.spuDetailBean?.minSalePrice,
          priceRange: res?.spuDetailBean?.maxSalePrice
            ? `${res?.spuDetailBean?.minSalePrice}-${res?.spuDetailBean?.maxSalePrice}`
            : `${res?.spuDetailBean?.minSalePrice}`,
          // priceVCRange: `${res?.spuDetailBean?.minVcSalePrice}-${res?.spuDetailBean?.maxVcSalePrice}`,
        },
      ] || [];
    // console.log('返回', res);
    // console.log('form.value.list ', form.value.list);
  };

  const getChannelList = (skuCode) => {
    return (
      form.value.list[0]?.skuBeanList
        ?.filter((item) => item.skuCode === skuCode)
        ?.map((item) => item.channelCode) || []
    );
  };

  const addItem = (row, index) => {
    form.value.list[0]?.skuBeanList.splice(index, 0, {
      skuCode: row.skuCode,
      skuName: row.skuName,
      countryCode: row.countryCode,
      productType: row.productType,
      disableChannels: getChannelList(row.skuCode),
      isNew: true,
    });
  };

  const delItem = (row, index) => {
    form.value.list[0]?.skuBeanList.splice(index - 1, 1);
  };

  const open = (code) => {
    msrp.value = '';
    currencyCode.value = '';
    msrpVc.value = '';
    currencyCodeVc.value = '';
    queryDetail(code);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__expanded-cell) {
    background-color: #f5f7fa !important;
  }

  .icon-expand {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #1e2226;
    transform: rotate(-90deg);

    &.row-open {
      transform: rotate(0deg);
    }
  }
  .expand-container {
    padding-left: 16px;
    .product-name {
      font-weight: 400;
      font-size: 12px;
    }
    .el-table {
      border-radius: 8px;
      border: 1px solid #dfe2e6;
      border-bottom: none;
      --el-table-border: 1px solid #dfe2e6;
      --el-table-border-color: #dfe2e6;
      --el-table-header-bg-color: #f5f7fa;
      --el-table-bg-color: #f5f7fa;
      --el-table-tr-bg-color: #f5f7fa;
    }
  }
  .product-name {
    font-family: 'PingFang SC Medium';
    font-size: 14px;
  }
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
    }

    .currencySelect {
      min-width: 115px !important;
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

  .el-form-bottom {
    margin-bottom: 1.75rem;
  }
</style>
