<template>
  <el-dialog
    class="addSkuModal"
    :title="title"
    :model-value="visible"
    :before-close="handleClose"
    width="1200px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item
            label="渠道："
            prop="channel"
            :rules="[{ required: true, message: '请选择渠道' }]"
          >
            <el-select
              :disabled="!!form.platformSku"
              v-model="form.channel"
              clearable
              filterable
              @change="(val)=>{
                setName(val,dickbook?.product_channel as [], 'channelName')
                getShopCode()
              }"
            >
              <el-option
                v-for="item in dickbook?.product_channel"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="店铺："
            prop="shop"
            :rules="[{ required: true, message: '请选择店铺' }]"
          >
            <el-select
              :disabled="!!form.platformSku"
              v-model="form.shop"
              clearable
              filterable
              @change="(val)=>{
                setName(val,dickbook?.product_shop as [], 'shopName')
                getShopCode()
              }"
            >
              <el-option
                v-for="item in dickbook?.product_shop"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="站点："
            prop="site"
            :rules="[{ required: true, message: '请选择站点' }]"
          >
            <el-select
              :disabled="!!form.platformSku"
              v-model="form.site"
              clearable
              filterable
              @change="(val)=>{
                setName(val,dickbook?.product_site as [], 'siteName')
                getShopCode()
              }"
            >
              <el-option
                v-for="item in dickbook?.product_site"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
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
          <el-form-item
            label="运营人："
            prop="operator"
            :rules="[{ required: true, message: '请选择运营人' }]"
          >
            <el-select v-model="form.operator" clearable filterable :disabled="!!form.platformSku">
              <el-option
                v-for="item in dickbook?.deptMember_list"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0" v-if="form.platformSku">
          <el-form-item label="店铺SKU：" prop="platformSku">
            <!--            <el-input :value="form.platformSku" disabled />-->
            <span>{{ form?.platformSku }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="店铺账号：" prop="userAccount">
            <span v-if="isEmpty" class="text-danger">暂无店铺账号，请联系系统管理员</span>
            <span v-else>{{ form?.userAccount }}</span>
            <!--            <el-input :value="form.userAccount" :disabled="!!form.platformSku" />-->
          </el-form-item>
        </el-col>
      </el-row>

      <el-button
        v-if="!form.platformSku"
        type="primary"
        @click="handleBindGoods"
        class="choose-sku-old"
      >
        选择产品SKU
      </el-button>
      <div class="table-list">
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
          <el-table-column label="数量" prop="quantity">
            <template #default="scope" v-if="!form.platformSku">
              <div style="padding-top: 20px">
                <el-form-item
                  class="table-form-item"
                  :prop="`skuList[${scope.$index}].quantity`"
                  :rules="[
                    { required: true, message: '请输入数量', trigger: ['blur', 'change'] },
                    { pattern: /^[1-9]\d*$/, message: '请输入大于0的正整数', trigger: 'blur' },
                  ]"
                >
                  <el-input v-model="form.skuList[scope.$index].quantity" />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productSku" label="建议销售价">
            <template #default="{ row }">
              <template v-if="row.price">
                {{ row.currency }}
                {{ row.price.toFixed(2) }}
              </template>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100px"
            align="right"
            fixed="right"
            v-if="!form.platformSku"
          >
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    disabled: scope.$index === 0 && props.type !== 'addPlatformSku',
                    plain: true,
                    index: scope.$index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
          <el-table-column label="费用占比" v-else>
            <template #default="{ row }">
              {{ row.skuProportion ? row.skuProportion + '%' : '' }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <template #footer v-if="!form.platformSku">
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleFormSubmit"
          :loading="saveLoading"
          :disabled="isEmpty"
        >
          保存
        </el-button>
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
    type="supplierSku"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi, ProductApi, memberApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { cloneDeep } from 'lodash-es';
  import { uuid } from '@/utils/aesTils';
  import { useStore } from '@/store/modules/useStore';
  import type { IDickbook } from '../data';

  const { userInfo } = useStore();

  const props = defineProps<{
    platformSku: string;
    dickbook: IDickbook;
    initData: any;
    type: string;
  }>();
  const title = ref('');
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save', reload: any): void;
  }>();
  const visible = ref(false);
  const open = async (params?) => {
    if (params) {
      form.platformSku = params.platformSku;
      form.channel = params.channel;
      form.channelName = params.channelName;
      form.operator = params.operator;
      form.saleType = params.saleType;
      form.saleTypeName = params.saleTypeName;
      form.shop = params.shop;
      form.shopName = params.shopName;
      form.site = params.site;
      form.siteName = params.siteName;
      form.skuProportion = params.skuProportion;
      form.quantity = params.quantity;
      form.relType = params.relType;
      if (params.platformSku) {
        title.value = '详情';
        await querySkuRelationDetail();
      } else {
        title.value = '新增';
        form._id = params._id;
        form.skuList = params.skuList;
        const same = props.dickbook?.deptMember_list?.find(
          (item) => item.value === userInfo.memberCode
        );
        if (same) form.operator = userInfo.memberCode;
      }
    }
    visible.value = true;
  };
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive({
    _id: '',
    platformSku: '',
    channel: '',
    channelName: '',
    operator: '',
    saleType: '',
    saleTypeName: '',
    shop: '',
    shopName: '',
    site: '',
    siteName: '',
    skuProportion: '',
    quantity: 0,
    skuList: [],
    relType: 0,
    userAccount: '',
  });
  const rules = reactive<FormRules>({
    platformSku: [
      {
        required: true,
        message: '请输入店铺SKU',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const querySkuRelationDetail = async () => {
    const res: any = await productApi.luteosProductSkuQueryPlatformSkuDetail({
      platformSku: form.platformSku,
      channel: form.channel,
      shop: form.shop,
      site: form.site,
      saleType: form.saleType,
      relType: form.relType,
    });
    // form.channel = res.channel;
    // form.operator = res.operator;
    // form.saleType = res.saleType;
    form.shop = res.shop;
    // form.site = res.site;
    form.userAccount = res.userAccount;
    form.skuList = res.skuRelationList || [];
    console.log(form);
    // console.log(res);
  };

  // 编辑场景回显数据
  // onMounted(async () => {
  //   form.platformSku = props.platformSku;
  //   if (form.platformSku) {
  //     querySkuRelationDetail();
  //   }
  // });

  const setName = (val, list: [], name) => {
    const result: any = list.find((item: any) => item.value === val);
    form[name] = result ? result.desc : '';
  };
  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      const oldList = form.skuList;
      val.forEach((item) => {
        const same = oldList.find((old) => {
          return old.skuCode === item.skuCode;
        });
        if (same) {
          item.quantity = same.quantity ? same.quantity : 1;
          item.price = same.price ? same.price : 0;
          item.currency = same.currency ? same.currency : '';
        } else item.quantity = 1;
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

        let skuList: any[] = [];
        let flag: any = false;
        form.skuList.forEach((item: any) => {
          if (!item.price) {
            ElMessage.warning({
              message: `sku（${item.skuCode}） 未填写建议销售价格`,
              duration: 3 * 1000,
            });
            skuList = [];
            flag = true;
            return;
          }
          skuList.push({
            quantity: +item.quantity,
            skuCode: item.skuCode,
            productSku: item.productSku,
            price: item.price,
            currency: item.currency,
          });
        });
        if (flag) {
          saveLoading.value = false;
          return;
        }
        form.quantity = form.skuList[0]?.quantity as number;
        emit('save', { ...cloneDeep(form), _id: form._id ? form._id : uuid() });
        saveLoading.value = false;
        handleClose();
      } finally {
        saveLoading.value = false;
      }
    }
  };
  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    form.userAccount = '';
    form.skuList = [];
    // emit('close');
    handleClose();
  };
  // 关闭弹窗
  const handleClose = () => {
    if (!formRef.value) return;
    visible.value = false;
    formRef.value.resetFields();
    form.platformSku = '';
    form.userAccount = '';
    form.skuList = [];
    // emit('close');
  };

  const isEmpty = ref<boolean>(false);
  const getShopCode = async () => {
    if (form.channel && form.shop && form.site) {
      isEmpty.value = false;
      const res = await productApi.luteosProductSkuQueryUserAccount({
        channel: form.channel,
        shop: form.shop,
        site: form.site,
      });
      if (res?.userAccount) form.userAccount = res?.userAccount;
      else {
        isEmpty.value = true;
      }
    } else {
      form.userAccount = '';
      isEmpty.value = false;
    }
  };
  defineExpose({
    open,
  });
</script>

<style>
  .addSkuModal {
    .choose-sku-old {
      position: relative;
      left: 1000px;
    }

    .table-form-item .el-form-item__content {
      margin: 0 !important;
    }
  }
</style>
