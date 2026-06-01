<template>
  <el-dialog
    title="下单"
    v-model="visible"
    @close="visible = false"
    width="1400"
    class="warehouOrderAdd"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="160px"
      :rules="rules"
      scroll-to-error
      :disabled="isDetail"
    >
      <KeenCard title="基础信息">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库仓" prop="warehouseCode1">
              <!-- <span>{{ form.warehouseCode }}</span> -->
              <span>{{ form.warehouseName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库单号" prop="warehouseCode1">
              <!-- <span>{{ detailInfo?.baseInfo?.code }}</span> -->
              <span>{{ form.code }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参考单号">
              <!-- <span>{{ detailInfo?.baseInfo?.saleCodeRefNum }}</span> -->
              <span>{{ form.refNo }}</span>
              <!-- <el-input v-model="form.referenceNo" maxlength="50" show-word-limit disabled /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售订单号" prop="warehouseCode1">
              <span>{{ form.erpCode }}</span>
              <!-- <span>{{ detailInfo?.baseInfo?.code }}</span> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售平台" prop="warehouseCode1">
              <span>{{ form.channel }}</span>
              <!-- <span>{{ detailInfo?.baseInfo?.code }}</span> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="VAT/EORI" prop="vat">
              <el-select v-model="form.vatValue" @change="handleVatChange" filterable clearable>
                <el-option
                  v-for="item in vatArr"
                  :value="item.value"
                  :label="item.desc"
                  :key="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买家指定配送开始时间" prop="warehouseCode1">
              <!-- :disabled-date="disabledStartDate" -->
              <el-date-picker
                v-model="form.buyerDeliveryStartTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="买家指定配送结束时间" prop="warehouseCode1">
              <el-date-picker
                v-model="form.buyerDeliveryEndTime"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <KeenCard title="收件人信息">
        <el-row>
          <el-col :span="8">
            <el-form-item label="收件人姓名" prop="name">
              <el-input v-model="form.name" maxlength="48" show-word-limit />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
                <el-form-item label="收件人姓" prop="">
                  <el-input v-model="form.lastName" maxlength="48" show-word-limit />
                </el-form-item>
              </el-col> -->
          <el-col :span="8">
            <el-form-item label="邮箱" prop="">
              <el-input v-model="form.email" maxlength="64" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" maxlength="20" show-word-limit />
              <!-- <div class="d-flex gap-2">
                    <el-input class="w-25" v-model="form.areaCode" />
                    <el-input v-model="form.phone" maxlength="20" show-word-limit />
                  </div> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobilePhone">
              <el-input v-model="form.mobilePhone" maxlength="20" show-word-limit />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
                <el-form-item label="分机号" prop="">
                  <el-input v-model="form.ext" maxlength="8" show-word-limit />
                </el-form-item>
              </el-col> -->
          <!-- <el-col :span="8">
                  <el-form-item label="公司" prop="">
                    <el-input v-model="form.company" maxlength="50" show-word-limit />
                  </el-form-item>
                </el-col> -->
          <el-col :span="8">
            <el-form-item label="收件人税号" prop="">
              <el-input v-model="form.taxId" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="国家/地区" prop="country">
                    <CountrySelect v-model="form.country" clearable placeholder="" maxlength="60" />
                  </el-form-item> -->
            <el-form-item label="国家/地区" prop="countryCode">
              <CountrySelect v-model="form.countryCode" clearable placeholder="" maxlength="60" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- :required="['US', 'AU'].includes(form.country)" -->
            <el-form-item label="省/州" prop="province">
              <el-input v-model="form.province" maxlength="20" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮编" prop="zipcode">
              <el-input v-model="form.zipcode" maxlength="20" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="city">
              <el-input v-model="form.city" maxlength="32" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区/县" prop="area">
              <el-input v-model="form.area" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="街道" prop="street">
              <el-input v-model="form.street" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="门牌号" prop="houseNumber">
              <el-input v-model="form.houseNumber" maxlength="32" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="详细地址1" prop="address">
              <template #label>
                <el-tooltip placement="top">
                  <template #content>
                    <div class="mw-600px">
                      <p>
                        市面上绝大部分物流服务商，不支持地址1超过50字符，超过的部分，要拆解到地址2。（地址1、地址2必填一个)
                      </p>
                    </div>
                  </template>
                  详细地址1
                </el-tooltip>
              </template>
              <el-input v-model="form.address" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8"></el-col> -->
          <el-col :span="16">
            <el-form-item label="详细地址2" prop="">
              <el-input v-model="form.address2" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="短地址" prop="shortAddress">
              <template #label>
                <span class="tips-label">
                  短地址
                  <el-tooltip content="当收件人国家为沙特阿拉伯时，短地址必填" placement="top">
                    <i class="iconfont icon-xianxingtubiaoxunwen"></i>
                  </el-tooltip>
                </span>
              </template>
              <el-input v-model="form.shortAddress" :maxlength="50" :show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <!-- <el-button type="primary" @click="save" :loading="loading">提交</el-button> -->
        <el-button type="primary" @click="submit" :loading="submitLoading">
          {{ submitLoading ? '提交中...' : '提交' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog title="更新物流跟踪号订单" ref="resultDialogRef" />
</template>

<script setup lang="ts" name="warehouseOrderNewAdd">
  import { omsApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  // import { Plus } from '@element-plus/icons-vue';
  // import GcSkuDialog from '@/views/supplyChainManage/efficiencyTools/warehouseOrderNew/components/GcSkuDialog.vue';
  // import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  // import AutoCreateMarkDialog from './AutoCreateMarkDialog.vue';
  // import BatchImportMark from './BatchImportMark.vue';

  const visible = ref(false);

  let code = '';
  const orderInfo: any = ref();
  const open = async (param) => {
    code = param.code;
    // form.value.saleCodeTrackNum = param.saleCodeTrackNum;
    // setTimeout(() => {
    //   formRef.value?.clearValidate();
    // }, 0);
    orderInfo.value = param;
    visible.value = true;
    await queryPushGcTransferSlipOrderEnums();
    // await queryShopList(item.shopName);
    queryPlaceOrder();
    queryVat();
  };
  const close = () => {
    visible.value = false;
    // resetData();
  };
  // 确定按钮状态
  const resultDialogRef = ref();
  const loading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 5000);
    const res = await omsApi.omsWarehouseOrderUpdateTrackingNum({
      trackingNum: form.value.saleCodeTrackNum,
      code: orderInfo.value?.code,
    });
    console.log(res);
    if (res?.failList?.length) {
      // resultDialogRef.value?.open(res?.failList, '更新物流跟踪号流失败订单');
      const content = res.failList
        .map((item) => {
          return `订单号：${item.orderCode}，失败原因：${item.message}`;
        })
        ?.join('\n');
      ElMessage.error(content);
    } else {
      ElMessage.success('更新物流跟踪号成功');
    }
    loading.value = false;
    close();
  };

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const props = defineProps<{
    code: string;
    mode?: string;
  }>();
  const isDetail = computed(() => props.mode === 'detail');
  // const code = route.query?.code;

  const router = useRouter();
  // 禁用开始时间：不能晚于结束时间
  const disabledStartDate = (time) => {
    // if (form.value.buyerDeliveryEndTime) {
    //   return time.getDate() > new Date(form.value.buyerDeliveryEndTime).getDate();
    // }
    return false;
  };

  // 禁用结束时间：不能早于开始时间
  const disabledEndDate = (time) => {
    // if (form.value.buyerDeliveryStartTime) {
    //   return time.getDate() < new Date(form.value.buyerDeliveryStartTime).getDate();
    // }
    return false;
  };

  const form: any = ref({
    warehouseCode: '',
    wpCode: '',
    referenceNo: code,
    recipientInfo: {},
    vatChangeInfo: {},
    deliveryService: {
      isOptionalBoard: 0,
      isSignature: 0,
      isInsurance: 0,
      distributionType: null,
      smCode: '',
      isTruck: null,
    },
    warehouseService: {
      isChangeLabel: 0,
      customerPackageRequirement: null,
      customerPackageType: 'PUBLIC',
      packingList: [],
      itemList: [],
    },
    otherInfo: {},
  });
  const formRef = ref();
  const rules = reactive({
    warehouseCode: [{ required: true, message: '请选择发货仓库', trigger: 'change' }],
    vat: [{ required: false, message: '请选择VAT/EORI', trigger: 'change' }],
    // recipientInfo: {
    name: [
      { required: true, message: '请输入收件人姓名', trigger: ['blur', 'change'] },
      {
        max: 48,
        message: '请输入48个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    phone: [{ required: true, message: '请输入电话', trigger: 'change' }],
    country: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    countryCode: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    address: [{ required: true, message: '请输入地址1', trigger: ['blur', 'change'] }],
    zipcode: [{ required: true, message: '请输入邮编', trigger: ['blur', 'change'] }],
    city: [{ required: true, message: '请输入城市', trigger: ['blur', 'change'] }],
    province: [{ required: false, message: '请选择省/州', trigger: 'change' }],
    // province: [
    //   {
    //     validator: (rule: any, value: any, callback: any) => {
    //       if (['US', 'AU'].includes(form.value.country) && !value) {
    //         callback(new Error('请输入省/州'));
    //       } else {
    //         callback();
    //       }
    //     },
    //     trigger: ['blur', 'change'],
    //   },
    // ],
    // },
  });

  const maps = ref({});
  const selectOptions = ref([]);

  const queryPushGcTransferSlipOrderEnums = async () => {
    const res = await omsApi.omsWarehouseOrderQueryPushGcTransferSlipOrderEnums({
      code: code,
    });
    maps.value = res?.dictMap;
    // selectOptions.value = maps.value['商品']?.map((sku) => ({
    //   label: sku.value,
    //   value: sku.value,
    // }));
  };

  const queryPlaceOrder = async () => {
    const res = await omsApi.omsWarehouseOrderQueryPlaceOrder({
      code: code,
    });
    // console.log('queryPlaceOrder', res);
    form.value = res;
    if (form.value.vat) {
      form.value.vatValue = `${form.value.vat}/${form.value.eori}`;
    } else {
      // 没有默认vat ,默认第一个
      if (vatArr.value?.length > 0) {
        // form.value.vatValue = vatArr.value[0].value;
        // handleVatChange(form.value.vatValue);
        // console.log(form.value.vat);
        // console.log(form.value.eori);
      }
    }
  };
  // queryPlaceOrder();
  // 获取vat
  const vatArr: any = ref([]);
  const queryVat = async () => {
    const res = await omsApi.omsCommonWarehouseQueryLogisticsWarehouseVat({
      code: code,
    });
    // console.log('queryVat', res);
    if (res?.recordList?.length > 0) {
      vatArr.value = res?.recordList?.map((item) => {
        return { desc: `${item.vat}/${item.eori}`, value: `${item.vat}/${item.eori}` };
      });
      form.value.vatValue = vatArr.value[0].value;
    }
  };
  // queryVat();
  const handleVatChange = async (val) => {
    // console.log('handleVatChange', val);
    if (val) {
      form.value.vat = val.split('/')[0];
      form.value.eori = val.split('/')[1];
    } else {
      form.value.vat = null;
      form.value.eori = null;
    }
  };

  const submitLoading = ref(false);
  const submit = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    const startT = form.value?.buyerDeliveryStartTime;
    const endT = form.value?.buyerDeliveryEndTime;
    if (startT && endT) {
      const tStart = new Date(startT).getTime();
      const tEnd = new Date(endT).getTime();
      if (Number.isFinite(tStart) && Number.isFinite(tEnd) && tEnd < tStart) {
        ElMessage.warning('买家指定配送结束时间不能早于买家指定配送开始时间，请修改后重试');
        // form.value.buyerDeliveryEndTime = null;
        return;
      }
    }
    // console.log('提交', form.value);
    // return;
    try {
      submitLoading.value = true;
      await omsApi.omsWarehouseOrderPlaceOrder({
        code: code,
        ...form.value,
      });
      ElMessage.success('下单成功');
      closeTabAndRefresh('warehouseOrderNew');
      router.push('/warehouseOrderNew');
      emit('success');
      close();
    } finally {
      submitLoading.value = false;
    }
  };
  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    router.push('/warehouseOrderNew');
  };

  // 返回详情
  const detailInfo = ref();
  const getDetailData = async () => {};

  const handleCountryChange = () => {
    if (['US', 'AU'].includes(form.value.country)) {
      formRef.value?.validateField('province');
    } else {
      formRef.value?.clearValidate(['province']);
    }
  };

  // onMounted(async () => {
  //   await Promise.all([getDetailData(), queryPushGcTransferSlipOrderEnums()]);
  // });

  // onActivated(async () => {
  //   await Promise.all([getDetailData(), queryPushGcTransferSlipOrderEnums()]);
  // });

  // onDeactivated(() => {
  //   formRef.value?.resetFields();
  // });

  const emit = defineEmits<{
    (success: string);
  }>();

  defineExpose({
    open,
  });
</script>

<style scoped>
  /* :deep(.keen-ui .warehouOrderAdd .el-dialog__body) {
    height: 940px;
  } */
  :global(.keen-ui .warehouOrderAdd .card) {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
