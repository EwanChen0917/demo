<template>
  <el-dialog
    class="addSkuModal"
    :title="title"
    :model-value="visible"
    @close="$emit('close')"
    width="700px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="店铺：" v-if="platformType === 1" prop="shop">
            <!-- :site="form.site" -->
            <ProductShopSelect
              v-model="form.shop"
              prop="shop"
              clearable
              platform="shopify"
              placeholder="请选择店铺"
            />
          </el-form-item>
          <el-form-item
            v-else
            label="渠道："
            prop="channel"
            :rules="[{ required: true, message: '请选择渠道' }]"
          >
            <ProductChannelSelect2
              placeholder="请选择渠道"
              v-model="form.channel"
              filterable
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <!-- <el-form-item v-if="!isAdd" label="站点：">
            <span>{{ form.siteName }}</span>
          </el-form-item> -->
          <el-form-item
            label="站点："
            prop="site"
            :rules="[{ required: true, message: '请选择站点' }]"
          >
            <ErpSiteSelect
              v-if="platformType === 1"
              channel="shopify"
              v-model="form.site"
              clearable
              filterable
              @change="handleChange"
              placeholder="请选择站点"
            />
            <!-- <ErpSiteSelect
              v-else
              :channel="form.channel"
              v-model="form.site"
              clearable
              filterable
              placeholder="请选择站点"
              @change="handleChange"
            /> -->
            <CountrySelect
              v-else
              v-model="form.site"
              placeholder="请选择站点"
              clearable
              filterable
            />
            <!-- <ProductSiteSelect v-else v-model="form.site" filterable @change="handleChange" /> -->
          </el-form-item>
          <el-form-item
            label="产品sku"
            prop="skuCode"
            v-if="platformType === 1"
            :rules="[{ required: true, message: '请选择产品sku' }]"
          >
            <el-select
              v-model="form.skuCode"
              placeholder="请选择产品sku"
              filterable
              :remote="true"
              :remote-method="getSkuList"
              clearable
            >
              <el-option
                v-for="item in skuList"
                :key="item.skuCode"
                :label="item.skuCode"
                :value="item.skuCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="0">
          <!-- <el-form-item label="店铺账号：" v-if="!isAdd">
          <span>{{ form?.userAccount || '暂无店铺账号，请联系系统管理员' }}</span>
        </el-form-item> -->
          <el-form-item label="运营人员：" prop="operator" required>
            <DeptMember
              v-model="form.operator"
              placeholder="请选择运营人员"
              deptId="65717209"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer v-if="!isDetail">
      <span class="dialog-footer">
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
  import {
    dataApi,
    memberApi,
    platformApi,
    PlatformApi,
    productApi,
    productOperationApi,
  } from '@/api/index';
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
    platformType?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  const route = useRoute();
  const onlineGoodsVisible = ref(false);
  const isAdd = computed(() => props.type === 'add');
  const isDetail = computed(() => props.type === 'detail');

  const skuList = ref<any[]>([]);
  const getSkuList = async (keyWord?: string) => {
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      pageNum: 1,
      pageSize: 100,
      keyWord: keyWord || '',
    });
    skuList.value = res?.productSkuBeanList || [];
  };
  getSkuList();

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
  // getDickBook();

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
    skuCode: '',
    msku: '',
  });
  const rules = reactive<FormRules>({
    shop: [
      {
        required: true,
        message: '请选择店铺',
        trigger: ['blur', 'change'],
      },
    ],
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
    operator: [
      {
        required: true,
        message: '请选择运营人员',
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

  const queryOperatorDetail = async () => {
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

  if (props.uniqueCode) queryOperatorDetail();
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

    const valid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        await productOperationApi.luteosOpetationPlatformSaveOrUpdate({
          ...form,
          platformType: props.platformType,
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
      left: 0;
    }

    .table-form-item .el-form-item__content {
      margin: 0 !important;
    }
  }
</style>

<style scoped>
  :global(.keen-ui .addSkuModal .el-dialog__body) {
    height: 540px;
  }
</style>
