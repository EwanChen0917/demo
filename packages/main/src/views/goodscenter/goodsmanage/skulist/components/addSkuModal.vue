<template>
  <el-dialog
    class="addSkuModal"
    :title="title"
    :model-value="visible"
    @close="$emit('close')"
    width="1200px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item v-if="!isAdd" label="渠道：">
            <span>{{ form.channelName }}</span>
          </el-form-item>
          <el-form-item
            v-else
            label="渠道："
            prop="channel"
            :rules="[{ required: true, message: '请选择渠道' }]"
          >
            <ProductChannelSelect v-model="form.channel" filterable @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="站点：" v-if="isLose && detailInfo?.channel === 'shopify'">
            <ErpSiteSelect channel="shopify" v-model="form.site" filterable />
          </el-form-item>
          <el-form-item v-else-if="!isAdd" label="站点：">
            <span>{{ form.siteName }}</span>
          </el-form-item>
          <el-form-item
            v-else
            label="站点："
            prop="site"
            :rules="[{ required: true, message: '请选择站点' }]"
          >
            <ErpSiteSelect
              v-if="form.channel === 'shopify'"
              channel="shopify"
              v-model="form.site"
              filterable
              @change="handleChange"
            />
            <ProductSiteSelect v-else v-model="form.site" filterable @change="handleChange" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0" v-if="platformSku">
          <el-form-item label="店铺SKU：" prop="platformSku">
            <span>{{ platformSku }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="店铺账号：" v-if="!isAdd">
            <span>{{ form?.userAccount || '暂无店铺账号，请联系系统管理员' }}</span>
          </el-form-item>
          <el-form-item label="店铺账号：" prop="userAccount" v-else>
            <el-select
              v-model="form.userAccount"
              clearable
              filterable
              :no-data-text="!form.channel || !form.site ? '请先选择渠道、站点' : '暂无数据'"
            >
              <el-option v-for="item in shopList" :key="item" :value="item" :label="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="主销/跟卖：" v-if="isDetail">
            <span>{{ form?.saleTypeName }}</span>
          </el-form-item>
          <el-form-item
            v-else
            label="主销/跟卖："
            prop="saleType"
            :rules="[{ required: true, message: '请选择销售类型' }]"
          >
            <el-select
              :disabled="!!form.platformSku"
              v-model="form.saleType"
              clearable
              filterable
              @change="(val)=>{
                setName(val,dickbook?.product_saletype as [], 'saleTypeName')
              }"
            >
              <el-option
                v-for="item in dickbook?.product_saletype"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="渠道唯一标识：" v-if="!isAdd">
            <div>
              <div class="pb-3">{{ form?.saleSkuCode }}</div>
              <div class="text-gray-500 fs-7" style="margin-top: -20px">
                （亚马逊：子asin ；其他渠道：店铺SKU）
              </div>
            </div>
          </el-form-item>
          <el-form-item
            v-else-if="form.customizeSaleSku === 1"
            label="渠道唯一标识："
            prop="saleSkuCode"
          >
            <div class="d-flex align-items-start justify-content-between w-100 gap-2">
              <div class="flex-grow-1">
                <el-input
                  style="width: 100%"
                  placeholder="请输入或选择"
                  v-model="form.saleSkuCode"
                  clearable
                />
                <div class="text-gray-500 fs-7 ms-3">（亚马逊：子asin ；其他渠道：店铺SKU）</div>
              </div>
              <el-button
                type="primary"
                v-if="
                  ['amazon', 'shopify', 'walmart'].includes(form.channel) &&
                  (form.channel === 'amazon' || form.customizeSaleSku === 1) &&
                  !isLose
                "
                @click="selectOnlineGoods"
              >
                选择
              </el-button>
            </div>
          </el-form-item>
          <el-form-item v-else-if="form.customizeSaleSku === 2" label="渠道唯一标识：">
            <div class="d-flex align-items-start justify-content-between w-100 gap-2">
              <div class="flex-grow-1">
                <el-input
                  style="width: 100%"
                  placeholder="系统生成"
                  v-model="form.saleSkuCode"
                  disabled
                />
                <div class="text-gray-500 fs-7 ms-3">（亚马逊：子asin ；其他渠道：店铺SKU）</div>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0" v-if="form.channel !== 'amazon' && isAdd">
          <el-radio-group v-model="form.customizeSaleSku" @change="handleCustomizeSaleSkuChange">
            <el-radio :label="1">自定义店铺SKU</el-radio>
            <el-radio :label="2">系统生成店铺SKU</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12" :offset="0" v-if="form.channel === 'amazon'">
          <el-form-item label="店铺SKU：" :prop="isDetail ? '' : 'msku'">
            <div v-if="isDetail">{{ form?.msku }}</div>
            <div v-else class="d-flex align-items-start justify-content-between w-100 gap-2">
              <el-input
                style="width: 100%"
                placeholder="请输入或选择"
                v-model="form.msku"
                clearable
              />
              <el-button type="primary" @click="selectOnlineGoods">选择</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button v-if="!isDetail" type="primary" @click="handleBindGoods" class="choose-sku">
        选择供应链SKU
      </el-button>
      <div class="table-list py-4">
        <el-table :data="form.skuList" row-key="productSpu">
          <el-table-column label="产品信息" min-width="150">
            <template #default="scope">
              <div class="d-flex align-items-center pe-5">
                <KeenImagePreview :src="scope.row.productImage || scope.row.productImageUrl" />
                <div class="ms-5 fs-5">
                  <div class="text-gray-800 fw-bold">
                    {{ scope.row.skuName || scope.row.productTitle }}
                  </div>
                  <div class="d-flex justify-content-between fs-7">
                    <span class="me-5">{{ scope.row.skuCode }}</span>
                    <span>{{ scope.row.productSku }}</span>
                  </div>
                </div>
              </div>
              <!--              <div class="d-flex align-items-center">
                              <el-avatar
                                shape="square"
                                :size="50"
                                fit="cover"
                                :src="scope.row.productImageUrl || scope.row.productImage"
                              />
                              <div class="ms-5">
                                <span class="text-gray-800 fs-5 fw-bold">
                                  {{ scope.row.productTitle }}
                                </span>
                              </div>
                            </div>-->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="productSku" label="产品SKU" /> -->
          <el-table-column label="数量" prop="skuQty">
            <template #default="scope" v-if="!isDetail">
              <div style="padding-top: 20px">
                <el-form-item
                  class="table-form-item"
                  :prop="`skuList[${scope.$index}].skuQty`"
                  :rules="[
                    { required: true, message: '请输入数量', trigger: ['blur', 'change'] },
                    { pattern: /^[1-9]\d*$/, message: '请输入大于0的正整数', trigger: 'blur' },
                  ]"
                >
                  <el-input v-model="form.skuList[scope.$index].skuQty" />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productSku" label="建议销售价">
            <template #default="{ row }">
              {{ row.currency || '' }}
              {{ row.price?.toFixed(2) || '' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="right" fixed="right" v-if="!isDetail">
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    plain: true,
                    index: scope.$index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
          <!--          <el-table-column label="费用占比" v-else>
                      <template #default="{ row }">
                        {{ row.skuProportion ? row.skuProportion + '%' : '' }}
                      </template>
                    </el-table-column>-->
        </el-table>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer" v-if="!isDetail">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.skuList"
    :selected-row="form.skuList[0]"
    confirm-text="确认"
    type="sku"
  />
  <OnlineGoodsModal
    v-if="onlineGoodsVisible"
    :visible="onlineGoodsVisible"
    ref="onlineGoodsRef"
    @success="handleSuccess"
    @close="onlineGoodsVisible = false"
    :channel="form.channel"
    :shop-list="[form.userAccount]"
    :site="form.site"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { dataApi, memberApi, platformApi, PlatformApi, productApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/goodscenter/goodsmanage/skurelation/components/bindSku.vue';
  import { IDickbook } from '@/views/goodscenter/goodsmanage/skulist/data';
  import OnlineGoodsModal from '@/views/goodscenter/goodsmanage/skurelation/components/onlineGoodsModal.vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const props = defineProps<{
    uniqueCode?: string;
    visible: boolean;
    platformSku?: string;
    type?: 'detail' | 'add' | 'edit' | 'lose';
    title: string;
    detailInfo?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  const route = useRoute();
  const onlineGoodsVisible = ref(false);
  const isAdd = computed(() => props.type === 'add');
  const isDetail = computed(() => props.type === 'detail');
  const isLose = computed(() => props.type === 'lose');

  const dickbook = ref<IDickbook>({
    product_shop: [],
    shop_platform: [],
    product_channel: [],
    product_site: [],
    product_saletype: [],
    product_activity: [],
    supplier_list: [],
    currency_list: [],
    deptMember_list: [],
  });

  const getSupplierList = async () => {
    const res: any = await dataApi.luteosDataQuerySupplierBaseList();
    return res.supplierList.map((item) => {
      return {
        value: item.supplierCode,
        desc: item.supplierName,
      };
    });
  };
  // 获取币种options

  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    return (res.currencyList as []).map((currency: any) => {
      return {
        value: currency.currencyCode,
        desc: `${currency.currencyCode}【${currency.currencyName}】`,
      };
    });
  };
  const queryDeptMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      deptId: 65717209,
    });
    return res.memberList?.map((item) => {
      return {
        desc: item.name,
        value: item.memberCode,
      };
    });
  };

  const getDickBook = async () => {
    const res: PlatformApi.PlatformDict.ResponseBody = await platformApi.platformDict({
      dictCodes: [
        'product_shop',
        'shop_platform',
        'product_channel',
        'product_site',
        'product_saletype',
        'product_activity',
      ],
    });
    const supplierList = await getSupplierList();
    const currencyList = await getCurrencyOptions();
    const deptMemberList = await queryDeptMemberList();

    dickbook.value = {
      ...(res.dictMap as IDickbook),
      supplier_list: supplierList,
      currency_list: currencyList,
      deptMember_list: deptMemberList,
    };
  };
  getDickBook();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive({
    saleSkuCode: '',
    _id: '',
    platformSku: '',
    channel: '',
    channelName: '',
    operator: '',
    saleType: '01',
    saleTypeName: '',
    shop: '',
    shopName: '',
    site: '',
    siteName: '',
    skuProportion: '',
    skuQty: 0,
    skuList: [],
    relType: 0,
    userAccount: '',
    customizeSaleSku: 2,
    msku: '',
  });
  const rules = reactive<FormRules>({
    userAccount: [
      {
        required: true,
        message: '请选择店铺账号',
        trigger: ['blur', 'change'],
      },
    ],
    saleSkuCode: [
      {
        required: true,
        message: '请输入渠道唯一标识',
        trigger: ['change', 'blur'],
      },
    ],
    msku: [
      {
        required: true,
        message: '请输入或选择店铺SKU',
        trigger: ['change', 'blur'],
      },
    ],
  });

  const shopList = ref([]);
  const getShopList = async () => {
    const res = await productApi.luteosProductSkuQueryUserAccountList({
      channel: form.channel,
      site: form.site,
    });
    shopList.value = res?.userAccountList;
  };

  const querySkuRelationDetail = async () => {
    const res: any = await productApi.luteosProductSaleSkuQuerySaleSkuDetail({
      uniqueCode: props.uniqueCode!,
    });
    form.channel = res.channel;
    form.channelName = res.channelName;
    form.siteName = res.siteName;
    form.shop = res.shop;
    form.site = res.site;
    form.userAccount = res.userAccount;
    form.saleTypeName = res.saleTypeName;
    form.saleType = res.saleType;
    form.saleSkuCode = res.saleSkuCode;
    form.msku = res.msku;
    form.skuList = res.skuRelationList || [];
    getShopList();
  };

  if (props.uniqueCode) querySkuRelationDetail();
  if (props.detailInfo) {
    form.saleSkuCode = props.detailInfo?.saleSkuCode;
    form.saleType = '01';
    form.channel = props.detailInfo?.channel;
    form.channelName = props.detailInfo?.channelName;
    form.site = props.detailInfo?.site;
    // 优先取国家名称
    form.siteName = props.detailInfo?.countryName || props.detailInfo?.siteName;
    form.userAccount = props.detailInfo?.userAccount;
    form.msku = props.detailInfo?.msku;
    getShopList();
  }

  const handleSuccess = (val) => {
    if (form.channel === 'amazon') {
      form.saleSkuCode = val?.asin;
      form.msku = val?.msku;
    } else {
      form.saleSkuCode = val;
    }
    onlineGoodsVisible.value = false;
  };

  const handleCustomizeSaleSkuChange = (val) => {
    console.log(val);
    if (val === 2) {
      formRef.value.resetFields(['saleSkuCode']);
      form.saleSkuCode = '';
    }
  };

  const selectOnlineGoods = () => {
    if (!form.userAccount) {
      ElMessage.warning('请先选择店铺');
      return;
    }
    onlineGoodsVisible.value = true;
  };

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    console.log('🚀 ~ val:', val);
    if (reload) {
      const oldList = form.skuList;
      val.forEach((item) => {
        const same = oldList.find((old) => {
          if (
            route.fullPath?.includes('/skurelationnew') ||
            route.fullPath?.includes('/loselist')
          ) {
            return old.skuCode === item.skuCode;
          }
          return old.productSku === item.productSku;
        });
        if (same) {
          item.skuQty = same.skuQty ? same.skuQty : 1;
          item.price = same.price ? same.price : 0;
          item.currency = same.currency ? same.currency : '';
        } else item.skuQty = 1;
      });
      form.skuList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      form.skuList.splice(index, 1);
    }
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        if (!form.skuList.length) {
          ElMessage.warning({
            message: '至少选择一个SKU',
            duration: 3 * 1000,
          });
          return;
        }
        saveLoading.value = true;
        await productApi.luteosProductSaleSkuSaveSaleSkuRelation({
          ...form,
          uniqueCode: props.uniqueCode,
        });
        ElMessage.success('保存成功');
        emit('save');
      } finally {
        saveLoading.value = false;
      }
    }
  };

  const handleChange = () => {
    form.saleSkuCode = '';
    if (form.channel == 'amazon') {
      form.customizeSaleSku = 1;
    } else {
      form.customizeSaleSku = 2;
    }
    if (!form.channel || !form.site) return;
    form.userAccount = '';
    getShopList();
  };

  const setName = (val, list: [], name) => {
    const result: any = list.find((item: any) => item.value === val);
    form[name] = result ? result.desc : '';
  };
</script>

<style>
  .addSkuModal {
    .choose-sku {
      position: relative;
      left: 950px;
    }

    .table-form-item .el-form-item__content {
      margin: 0 !important;
    }
  }
</style>
