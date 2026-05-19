<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
      :rules="rules"
    >
      <KeenCard title="监控范围" class="my-card">
        <el-form-item label="监控类型：" prop="monitorType">
          <el-select
            v-model="form.monitorType"
            filterable
            placeholder="请选择监控类型"
            style="width: 200px"
          >
            <el-option :value="1" label="售价监控" />
            <!-- <el-option :value="2" label="成交价监控" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="规则类型：" prop="monitorType">
          <el-select
            v-model="form.productType"
            filterable
            placeholder="请选择规则类型"
            style="width: 200px"
          >
            <el-option :value="6" label="指定渠道" />
            <el-option :value="7" label="指定国家" />
            <!-- <el-option :value="8" label="指定店铺" />
          <el-option :value="9" label="指定msku" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="渠道：" prop="channel" :rules="rules.channel">
          <el-select
            v-model="form.channel"
            filterable
            placeholder="请选择渠道"
            style="width: 200px"
          >
            <el-option
              v-for="item in channelList"
              :key="item.value"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="国家："
          prop="countryCode"
          :rules="rules.countryCode"
          v-if="form.productType === 7"
        >
          <CountrySelect v-model="form.countryCode" placeholder="国家" clearable class="w-200px" />
        </el-form-item>
      </KeenCard>
      <!-- <el-form-item label="监控范围：" prop="monitorRange">
        <el-radio-group v-model="form.monitorRange" @change="changeMonitorRange" :disabled="isEdit">
          <el-radio label="全量商品" :value="1" />
          <el-radio label="特定商品" :value="0" />
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.monitorRange === 0" label="监控商品：" prop="onLineProductList">
        <el-button type="primary" @click="bindGoods" size="small" :disabled="isEdit">
          选择商品
        </el-button>
      </el-form-item> -->
      <!-- <KeenCard v-if="form.monitorRange === 0" title="已添加商品" class="my-card">
        <el-table ref="tableRef" :data="form.onLineProductList">
          <el-table-column label="店铺SKU" min-width="150">
            <template #default="{ row }">
              <div>
                {{ row?.msku }}
                <Copy :content="row.msku" />
              </div>
              <div v-if="row.parentAsin">
                {{ row?.parentAsin }}
                <Copy :content="row.parentAsin" />
              </div>
              <div v-if="row.asin">
                {{ row?.asin }}
                <Copy :content="row.asin" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="渠道信息" prop="channel" min-width="150px">
            <template #default="{ row }">
              <div>{{ row?.channel }}</div>
              <div>{{ row?.shop }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="statusDesc">
            <template #default="{ row }">
              <span v-if="row?.channel === 'amazon'">
                {{ row?.upStatusDesc }}
              </span>
              <span v-else>{{ row?.statusDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前售价" prop="currPrice">
            <template #default="{ row }">
              <span v-if="row?.currPrice">{{ row?.currPrice }} {{ row?.currency }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="MSRP" prop="msrpList">
            <template #default="{ row }">
              <div v-for="item in row.msrpList" :key="item.skuCode">
                <span>
                  {{ item.msrpPriceStr }}
                </span>
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="item.skuCode"
                >
                  <QuestionFilled
                    class="question-icon"
                    style="margin-top: -3px; margin-left: 4px"
                  />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="运营" prop="operatorName" />
          <el-table-column label="产品信息" min-width="250">
            <template #default="{ row }">
              <template v-if="row.productSkuList.length === 1">
                <template v-for="(item, index) in row.productSkuList" :key="index">
                  <OverflowTooltip :content="item.productTitle" :line="1" />
                  <template v-if="row.productSkuList.length === 1">
                    <div class="fs-7">{{ item.skuCode }} &nbsp; {{ item.productLineDesc }}</div>
                    <div class="fs-7" v-if="item.suggestPrice">
                      {{ item.suggestPrice }} {{ item.suggestCurrency }}
                    </div>
                  </template>
                </template>
              </template>
              <template v-else-if="row.productSkuList.length > 1">
                <ElTooltip popper-class="action_tool_tip" placement="top" effect="dark">
                  <template #content>
                    <div class="tool-content">
                      <div v-for="(item, index) in row.productSkuList" :key="index">
                        <div class="line" v-if="index !== 0"></div>
                        <div>{{ item.productTitle }}</div>
                        <div class="fs-7">{{ item.skuCode }} &nbsp; {{ item.productLineDesc }}</div>
                        <div class="fs-7" v-if="item.suggestPrice">
                          {{ item.suggestPrice }} {{ item.suggestCurrency }}
                        </div>
                      </div>
                    </div>
                  </template>
                  <div>
                    <div v-for="(item, index) in row.productSkuList" :key="index">
                      <div v-if="index < 2" class="product-title">{{ item.productTitle }}</div>
                      <div v-if="index === 1">...</div>
                    </div>
                  </div>
                </ElTooltip>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="140" v-if="!isEdit">
            <template #default="{ row, $index }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    row: row,
                    index: $index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </KeenCard> -->
      <KeenCard title="监控规则" class="my-card">
        <el-form-item label="参考价" prop="monitorList" :rules="rules.monitorList">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            content="参考价：调价、促销计划、MSRP；监控参考的价格，作为基准"
          >
            <QuestionFilled
              class="question-icon"
              style="margin-top: -1px; margin-left: -60px; margin-right: 40px"
            />
          </el-tooltip>
          <!-- <el-select
            v-model="form.monitorList"
            filterable
            placeholder="参考价"
            @change="handleMonitorChange"
            class="input-400"
            clearable
            :multiple="form.monitorRange === 0"
          >
            <el-option v-if="form.monitorRange === 0" label="全选" value="all" />
            <el-option
              v-for="monitor in monitorList"
              :key="monitor.priceType"
              :label="monitor.priceTypeDesc"
              :value="monitor.priceType"
            /> 
          </el-select> -->
          <!-- {{ form.monitorList }} -->
          <el-checkbox-group v-model="form.monitorList" @change="handleMonitorChange">
            <el-checkbox
              :label="item.priceType"
              v-for="item in monitorList"
              :key="item.priceType"
              :disabled="item.priceType === 'msrp'"
            >
              {{ item.priceTypeDesc }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="d-flex mb-3">
          <div class="config-txt">
            配置
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
            >
              <template #content>
                <div>折扣率预警值%：1 - 百分比</div>
                <div>实际折扣率%：（参考价 - 当前页面售价） / 参考价</div>
                <div>浮动范围：当 实际折扣率 - 预警值 > 浮动范围时 ，则触发 通知</div>
              </template>
              <QuestionFilled class="question-icon" style="margin-top: -1px; margin-left: 5px" />
            </el-tooltip>
          </div>
          <el-table
            ref="tableRef"
            :data="form.sellerMonitorList"
            row-key="priceTypeDesc"
            class="monitor-table"
          >
            <el-table-column label="参考价" prop="priceTypeDesc" min-width="120">
              <template #default="{ row }">
                <el-form-item>
                  {{ row?.priceTypeDesc }}
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="预警值" prop="rate" min-width="300">
              <template #default="{ row, $index }">
                <div class="d-flex monitor-table-suggest" v-if="row.priceType === 'suggest'">
                  <div class="title operation">小于</div>
                  <el-form-item
                    label=""
                    :prop="`sellerMonitorList[${$index}].priceType`"
                    :rules="rules.priceType"
                    class="suggest-item"
                  >
                    <el-select
                      v-model="form.sellerMonitorList[$index].priceType"
                      filterable
                      placeholder="监控类型"
                      class="price-type"
                    >
                      <el-option
                        v-for="price in priceTypeList"
                        :key="price.value"
                        :label="price.desc"
                        :value="price.value"
                      />
                    </el-select>
                  </el-form-item>
                  <div class="title" style="margin: 0 10px">*</div>
                  <el-form-item
                    label=""
                    :prop="`sellerMonitorList[${$index}].rate`"
                    :rules="rules.rate"
                    style="margin-left: -120px"
                  >
                    <el-input v-model="form.sellerMonitorList[$index].rate" class="rate-input">
                      <template #append>%</template>
                    </el-input>
                  </el-form-item>
                </div>
                <el-form-item
                  label=""
                  :prop="`sellerMonitorList[${$index}].rate`"
                  :rules="rules.rate"
                  v-else
                >
                  <el-input
                    placeholder="请输入数字"
                    v-model="form.sellerMonitorList[$index].rate"
                    style="width: 300px"
                  >
                    <template #prepend>小于</template>
                    <template #append>
                      <span>预警值</span>
                      <span>
                        {{
                          form.sellerMonitorList[$index].rate &&
                          form.sellerMonitorList[$index].rate <= 100
                            ? parseFloat(100 - form.sellerMonitorList[$index].rate).toFixed(2) + '%'
                            : 'x%'
                        }}
                      </span>
                    </template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column label="通知设置" prop="floatingRate" min-width="450">
              <template #default="{ row, $index }">
                <el-form-item
                  label=""
                  :prop="`sellerMonitorList[${$index}].floatingRate`"
                  :rules="rules.floatingRate"
                  v-if="row.priceType !== 'suggest'"
                >
                  <el-input
                    placeholder="请输入数字"
                    v-model="form.sellerMonitorList[$index].floatingRate"
                    style="width: 450px"
                  >
                    <template #prepend>与预警值的差额 大于</template>
                    <template #append>% 时触发预警通知</template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column label="异常等级" min-width="200">
              <template #default="{ row, $index }">
                <el-form-item>
                  <!-- {{ row }} -->
                  <el-select
                    v-model="form.sellerMonitorList[$index].monitorLevel"
                    filterable
                    placeholder="监控类型"
                    class="price-type1 w-200px"
                  >
                    <el-option
                      v-for="item in errorLevelList"
                      :key="item.value"
                      :label="item.desc"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="通知方式" min-width="140">
              <template #default="{ row, $index }">
                <el-form-item>
                  <el-select
                    v-model="form.sellerMonitorList[$index].notifyType"
                    filterable
                    placeholder="监控类型"
                    class="price-type1 w-200px"
                  >
                    <el-option
                      v-for="item in notifyTypeList"
                      :key="item.value"
                      :label="item.desc"
                      :value="item.value"
                    />
                  </el-select>
                  <!-- <el-checkbox
                    v-if="['MSRP', '调价活动'].includes(row.priceTypeDesc)"
                    v-model="row.notifyGroupDirect"
                    label="是否群内定向"
                    :true-value="1"
                    :false-value="0"
                  />
                  <span v-else>-</span> -->
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="120">
              <template #default="{ row, $index }">
                <el-form-item>
                  <KeenActions
                    display-style="buttons"
                    :actions="[
                      {
                        label: '添加',
                        key: 'add',
                        type: 'primary',
                        row: row,
                        index: $index,
                        hide:
                          !['MSRP', '促销计划'].includes(row.priceTypeDesc) ||
                          form.sellerMonitorList?.filter(
                            (item) => item.priceTypeDesc === row.priceTypeDesc
                          )?.length === 3,
                      },
                      {
                        label: '删除',
                        key: 'del',
                        type: 'danger',
                        row: row,
                        index: $index,
                        hide:
                          row.priceTypeDesc === 'MSRP' &&
                          form.sellerMonitorList?.filter((item) => item.priceTypeDesc === 'MSRP')
                            ?.length === 1,
                      },
                    ]"
                    @click="handleConfigActions"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <el-form-item label="状态" prop="monitorStatus" style="margin-left: 12px">
          <el-radio-group v-model="form.monitorStatus" style="margin-left: 18px">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </KeenCard>
      <KeenCard title="监控状态" class="my-card">
        <el-form-item label="状态" prop="monitorStatus" style="margin-left: 12px">
          <el-radio-group v-model="form.monitorStatus" style="margin-left: 18px">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </KeenCard>
      <div class="btn-wrap">
        <el-button @click="goBackOrder">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </div>
    </el-form>
  </div>
  <OnlineGoodsSelect
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :channel="form.channel"
    :selected-rows="form.onLineProductList"
  />
</template>

<script setup lang="ts" name="adjustpriceMonitorAdd">
  import { ElMessage } from 'element-plus';
  import { priceApi } from '@/api/index';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const code = route.query.code || '';
  const productType = route.query?.productType ? parseInt(route.query?.productType) : 1;
  const isEdit = ref(!!code);

  // 表单定义
  const form = ref({
    onLineProductList: [],
    sellerMonitorList: [],
    monitorList: ['msrp'],
    monitorStatus: 1,
    monitorType: 1,
    monitorRange: productType === 4 ? 1 : 0,
    productType: productType, //    5:店铺），6:渠道）7:国家）
    rpaCode: undefined,
    channel: '',
    countryCode: '',
    monitorLevel: 'A',
  });

  const rules = ref({
    channel: { required: true, message: '请选择渠道', trigger: ['blur', 'change'] },
    countryCode: { required: true, message: '请选择国家', trigger: ['blur', 'change'] },
    onLineProductList: [{ required: true, message: '请选择商品', trigger: ['blur', 'change'] }],
    monitorList: [
      { required: true, message: '请确认已配置相应的参考价，否则无法监控', trigger: ['blur'] },
    ],
    rate: [
      { required: true, message: '请输入数字', trigger: ['blur', 'change'] },
      {
        pattern: /^([0-9]\d?(\.\d{1,2})?|0\.[1-9]\d?|0\.0[1-9]|100(\.0{1,2})?)$/,
        message: '请输入0-100的数字，支持小数',
        trigger: ['blur', 'change'],
      },
    ],
    floatingRate: [
      { required: true, message: '请输入数字', trigger: ['blur', 'change'] },
      {
        pattern: /^([0-9]\d?(\.\d{1,2})?|0\.[1-9]\d?|0\.0[1-9]|100(\.0{1,2})?)$/,
        message: '请输入0-100的数字，支持小数',
        trigger: ['blur', 'change'],
      },
    ],
    priceType: { required: true, message: '请选择价格类型', trigger: ['blur', 'change'] },
  });

  const channel = ref('');
  const channelList = ref([
    {
      value: 'amazon',
      desc: 'amazon',
    },
    {
      value: 'walmart',
      desc: 'walmart',
    },
    {
      value: 'tiktok',
      desc: 'tiktok',
    },
    {
      value: 'shopify',
      desc: 'shopify',
    },
    {
      value: 'target',
      desc: 'target',
    },
    {
      value: 'shopee',
      desc: 'shopee',
    },
    {
      value: 'lazada',
      desc: 'lazada',
    },
  ]);
  const errorLevelList = ref([
    {
      value: 'A',
      desc: 'A',
    },
    {
      value: 'B',
      desc: 'B',
    },
    {
      value: 'C',
      desc: 'C',
    },
  ]);
  const notifyTypeList = ref([
    {
      value: 0,
      desc: '钉钉',
    },
    // {
    //   value: '1',
    //   desc: '邮件',
    // },
  ]);

  // 选择产品
  const bindGoodsVisible = ref(false);
  const onLineProductList = ref({
    amazon: [],
    shopify: [],
    walmart: [],
  });

  const bindGoods = () => {
    if (!form.value.channel) return ElMessage.warning('请选择渠道');
    bindGoodsVisible.value = true;
  };

  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      onLineProductList.value[form.value.channel] = val;
      form.value.onLineProductList = Object.values(onLineProductList.value).flat();
    }
    formRef.value.validateField('onLineProductList');
    bindGoodsVisible.value = false;
  };
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      form.value.onLineProductList.splice(index, 1);
    }
  };

  const handleConfigActions = async (item) => {
    const { key, index, row } = item;
    if (key === 'add') {
      console.log('sellerMonitorList', form.value.sellerMonitorList, row);
      form.value.sellerMonitorList.push({
        priceTypeDesc: row?.priceTypeDesc,
        priceType: row.priceType,
        rate: '',
        floatingRate: 0,
        roleCode: '',
        monitorType: 'error',
        notifyType: 0,
        sort: row.sort,
        monitorLevel: 'A',
      });
      // 排序展示
      form.value.sellerMonitorList = [...form.value.sellerMonitorList].sort(
        (a: any, b: any) => a.sort - b.sort
      );
      console.log('after', form.value.sellerMonitorList);
    }
    if (key === 'del') {
      form.value.sellerMonitorList.splice(index, 1);
      const findIndex = form.value.monitorList.findIndex((value) => row.priceType === value);
      const findIndex2 = form.value.sellerMonitorList.findIndex(
        (item: any) => row.priceType === item.priceType
      );
      if (findIndex2 >= 0) {
      } else {
        form.value.monitorList.splice(findIndex, 1);
      }
      // form.value.monitorList.splice(findIndex, 1);
    }
  };

  const priceTypeList = ref([
    {
      value: 'suggest',
      desc: '建议零售价',
    },
  ]);

  const monitorList = computed(() => {
    if (form.value.monitorRange === 1) {
      return [
        // {
        //   priceTypeDesc: '调价活动',
        //   monitorType: 'error',
        //   priceType: 'adjust',
        //   sort: 1,
        // },
        {
          priceTypeDesc: '促销计划',
          monitorType: 'error',
          priceType: 'discount',
          sort: 2,
        },
        {
          priceTypeDesc: 'MSRP',
          monitorType: 'error',
          priceType: 'msrp',
          sort: 3,
        },
      ];
    }
    return [
      // {
      //   priceTypeDesc: '调价活动',
      //   monitorType: 'error',
      //   priceType: 'adjust',
      //   sort: 1,
      // },
      {
        priceTypeDesc: '促销计划',
        monitorType: 'error',
        priceType: 'discount',
        sort: 2,
      },
      {
        priceTypeDesc: 'MSRP',
        monitorType: 'error',
        priceType: 'msrp',
        sort: 3,
      },
      // {
      //   priceTypeDesc: '建议零售价',
      //   monitorType: 'error',
      //   priceType: 'suggest',
      //   sort: 4,
      // },
    ];
  });

  /* const monitorList = ref([
    {
      priceTypeDesc: '调价活动',
      monitorType: 'error',
      priceType: 'adjust',
      sort: 1,
    },
    {
      priceTypeDesc: '促销计划',
      monitorType: 'error',
      priceType: 'discount',
      sort: 2,
    },
    {
      priceTypeDesc: 'MSRP',
      monitorType: 'error',
      priceType: 'msrp',
      sort: 3,
    },
    {
      priceTypeDesc: '建议零售价',
      monitorType: 'error',
      priceType: 'suggest',
      sort: 4,
    },
  ]); */
  const handleMonitorChange = () => {
    // console.log('handleMonitorChange');
    // 全选逻辑
    if (form.value.monitorList.includes('all')) {
      form.value.monitorList = monitorList.value.map((item) => item.priceType);
    }

    monitorList.value.forEach((item: any) => {
      if (form.value.monitorList.includes(item.priceType)) {
        const findData: any =
          form.value.sellerMonitorList.find((seller: any) => seller.priceType === item.priceType) ||
          {};
        //   没有数据的加对应的空数据
        if (!findData?.priceType) {
          if (form.value.monitorRange === 1) {
            form.value.sellerMonitorList = [];
          }
          form.value.sellerMonitorList.push({
            priceType: item.priceType,
            rate: '',
            floatingRate: '',
            roleCode: '',
            monitorType: 'error',
            sort: item.sort,
            priceTypeDesc: item.priceTypeDesc,
            notifyType: 0,
            monitorLevel: 'A',
          });
        }
      } else {
        // 删除已有的数据
        const index: any = form.value.sellerMonitorList.findIndex(
          (seller: any) => seller.priceType === item.priceType
        );
        if (index > -1) {
          form.value.sellerMonitorList.splice(index, 1);
        }
      }
    });
    // console.log('handleMonitorChange', form.value.sellerMonitorList);
    // 排序展示
    form.value.sellerMonitorList = [...form.value.sellerMonitorList].sort(
      (a: any, b: any) => a.sort - b.sort
    );
  };
  handleMonitorChange();

  const router = useRouter();
  const goBackOrder = () => {
    router.push({
      name: 'adjustpriceMonitor',
    });
  };

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = () => {
    if (form.value.monitorRange && !checkMonitor()) return;
    if (isEdit.value) {
      editFn();
    } else {
      addFn();
    }
  };

  const addFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      const params = {
        ...form.value,
        channel: form.value.channel,
        onLineProductList: form.value.onLineProductList.map((item) => {
          return {
            site: item.site,
            msku: item.msku,
            shop: item.shop,
            channel: item.channel,
          };
        }),
        monitorList: form.value.sellerMonitorList,
        // rpaCodeList: [code],
      };
      // delete params.monitorList;
      // console.log('form', form.value);
      // console.log(params);
      // return;
      await priceApi
        .luteosPriceSaveSellerSku({
          ...params,
          // productType,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      closeTabAndRefresh('adjustpriceMonitor');
      goBackOrder();
      /* setTimeout(() => {
        handleCancel();
      }, 1000); */
    }
  };

  const editFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      await priceApi
        .luteosPriceSaveMonitorRole({
          ...form.value,
          monitorList: form.value.sellerMonitorList,
          monitorStatus: form.value.monitorStatus,
          rpaCodeList: [code],
          // productType,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      closeTabAndRefresh('adjustpriceMonitor');
      goBackOrder();
      /* setTimeout(() => {
        handleCancel();
      }, 1000); */
    }
  };

  // 多个配置规则
  const checkMonitor = () => {
    const exitMap = {};
    form.value.sellerMonitorList?.forEach((item, index) => {
      const value = 100 - parseFloat(item.rate) + parseFloat(item.floatingRate);
      if (exitMap[value]) {
        exitMap[value].push(index + 1);
      } else {
        exitMap[value] = [index + 1];
      }
    });
    const tips = '第';
    const list = Object.values(exitMap)?.filter((item) => item.length > 1);
    if (list?.length > 0) {
      ElMessage.warning(
        `${tips}${list.map((item) => item.join(',')).join('、')}行规则间的监控阈值不可相同`
      );
      return false;
    }
    return true;
  };

  const queryMonitorDetail = async () => {
    if (code) {
      const res: any = await (productType === 4
        ? priceApi.luteosPriceQueryAllMskuMonitorDetail({
            rpaCode: code as string,
          })
        : priceApi.luteosPriceQueryAllMskuMonitorDetail({
            rpaCode: code as string,
          }));
      form.value = res;
      // 手动排序
      form.value.sellerMonitorList =
        res.monitorList?.map((item) => {
          item.sort = item.priceType == 'discount' ? 2 : 3;
          return item;
        }) || [];
      const proData: any = {
        msku: res.msku,
        msrpList: res.msrpList || [],
        currPrice: res.currPrice,
        currency: res.currency,
        channel: res.channel,
        shop: res.shop,
        suggestCurrency: res.suggestCurrency,
        suggestPrice: res.suggestPrice,
        productSkuList: res.productSkuList || [],
        operatorName: res.operatorName,
        statusDesc: res.productStatusDesc,
        upStatusDesc: res.productStatusDesc,
        asin: res.asin,
        parentAsin: res.parentAsin,
      };
      form.value.onLineProductList = [proData];
      if (productType === 4) {
        form.value.monitorStatus = res?.monitorStatus;
        form.value.monitorList = res.monitorList?.[0]?.priceType;
        form.value.monitorRange = 1;
      } else {
        form.value.monitorStatus = res.monitorStatus;
        form.value.monitorList = res.monitorList.map((item) => item.priceType);
        form.value.monitorRange = 0;
      }
      form.value.rpaCode = res.rpaCode;
      form.value.channel = res.channel;
      form.value.countryCode = res.countryCode;
      console.log('详情', form.value);
    }
  };
  queryMonitorDetail();

  const changeMonitorRange = () => {
    form.value.onLineProductList = [];
    form.value.monitorList = [];
    form.value.sellerMonitorList = [];
  };
</script>

<style lang="scss" scoped>
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .title {
    height: 32px;
    line-height: 32px;
  }
  .operation {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    width: 68px;
    padding: 0 20px;
    text-align: center;
    color: #909399;
    font-size: 14px;
    flex-shrink: 0;
  }
  .suggest-item {
    margin-left: -32px;
  }
  .price-type {
    //width: 200px !important;
    margin-left: -90px;
    :deep(.el-select__wrapper) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .input-400 {
    width: 490px !important;
  }
  .rate-input {
    width: 200px;
  }
  .my-card {
    :deep(.card-header) {
      padding-left: 0;
    }
    padding: 0 !important;
    margin-bottom: 0 !important;
  }
  .btn-wrap {
    width: 100%;
    text-align: center;
  }
  .product-title {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line {
    border: 1px dashed #eee;
    margin: 10px 0;
    opacity: 0.5;
  }
  .monitor-table {
    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
    .monitor-table-suggest {
      :deep(.el-form-item__content) {
        margin-left: 120px !important;
      }
    }
  }
  .config-txt {
    width: 120px;
    color: #3f4254;
    font-size: 1.075rem;
    padding-left: 22px;
  }
  .question-icon {
    width: 15px;
    height: 15px;
  }
</style>
