<template>
  <el-form ref="formRef" label-width="200" :model="form" :rules="rules" scroll-to-error>
    <KeenCard
      v-for="(item, index) in form.detailList"
      :key="item?.baseInfo?.erpCode"
      :title="'订单' + (index + 1) + '&nbsp;&nbsp;#' + item?.baseInfo?.erpCode"
    >
      <template #operation>
        <el-button
          type="primary"
          v-if="form.detailList.length > 1"
          size="small"
          @click="delItem(index)"
        >
          关闭转单
        </el-button>
      </template>
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="Amazon店铺账号"
            :prop="`detailList.${index}.baseInfo.warehouseCode`"
            :rules="rules.warehouseCode"
          >
            <el-select
              v-if="item.shopParamList?.length > 0"
              v-model="item.baseInfo.warehouseCode"
              @change="
                (val) => {
                  handleWarehouseChange(val, item);
                }
              "
            >
              <el-option
                v-for="warehouse in item.shopParamList"
                :key="warehouse.warehouseCode"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseCode"
              />
            </el-select>
            <span v-else class="text-danger">无可用库存Amazon店铺,请关闭此转单</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="Amazon order id">
            <span>{{ item.baseInfo?.erpCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="服务等级"
            :prop="`detailList.${index}.serivceLevel`"
            :rules="rules.serivceLevel"
          >
            <el-select v-model="item.serivceLevel">
              <el-option value="Standard" label="Standard-标准配送" />
              <el-option value="Expedited" label="Expedited-加急配送" />
              <el-option value="Priority" label="Priority-优先配送" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="店铺账号">
            <span>{{ item.baseInfo?.shopAccount }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="易仓订单号">
            <span>{{ item.baseInfo?.orderCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="参考单号">
            <span>{{ item.baseInfo?.refNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="买家ID" v-if="type === '2'">
            <span>{{ item.receiveInfo?.buyerId }}</span>
          </el-form-item>
          <el-form-item label="红人账号" v-if="type === '0'">
            <span>{{ item.receiveInfo?.userChannel }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="买家姓名">
            <span>{{ item.receiveInfo?.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="货币类型">
            <span>{{ item.baseInfo?.currencyDesc }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="收件人国家或地址">
            <span>{{ item.receiveInfo?.countryCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item
            label="收件人省/州"
            :prop="`detailList.${index}.receiveInfo.province`"
            :rules="
              item.receiveInfo?.countryCode === 'US'
                ? rules['receiveInfo.province']
                : [
                    {
                      required: true,
                      message: '请输入收件人省/州',
                      trigger: 'blur',
                    },
                  ]
            "
          >
            <el-input v-model="item.receiveInfo.province" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12" :offset="0">
          <el-form-item label="城市">
            <span>{{ item.receiveInfo?.city }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table :data="item.itemInfoList">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="productName" min-width="240px" label="产品名称" />
        <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
        <el-table-column prop="suggestPrice" min-width="200px" label="建议售价" />
        <el-table-column prop="price" label="销售单价" />
        <el-table-column prop="ttSellerSku" label="TT销售SKU" width="220px" v-if="type === '2'" />
        <el-table-column prop="supplySku" label="供应链SKU" width="220px" />
        <el-table-column prop="sellerSku" label="Amazon发货SKU" width="220px">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                form.detailList[index] ? `detailList.${index}.itemInfoList.${$index}.sellerSku` : ''
              "
              :rules="rules.sellerSku"
            >
              <el-select
                v-model="row.sellerSku"
                v-if="
                  item.shopParamList
                    ?.find((v) => item.baseInfo.warehouseCode === v.warehouseCode)
                    ?.supplySkuList?.filter((v) => v.supplySku === row.supplySku)?.length > 0
                "
              >
                <el-option
                  v-for="sku in item.shopParamList
                    ?.find((v) => item.baseInfo.warehouseCode === v.warehouseCode)
                    ?.supplySkuList?.filter((v) => v.supplySku === row.supplySku)"
                  :key="sku.sellerSku"
                  :label="sku.sellerSku"
                  :value="sku.sellerSku"
                />
                <template #empty>
                  <div v-if="!item.baseInfo.warehouseCode">请先选择Amazon店铺账号</div>
                </template>
              </el-select>
              <span v-else class="text-danger">无发货sku，请关闭此转单</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="100px">
          <template #default="{ row }">
            <span>
              {{
                item.shopParamList
                  ?.find((v) => item.baseInfo.warehouseCode === v.warehouseCode)
                  ?.supplySkuList?.filter((v) => v.supplySku === row.supplySku)
                  ?.find((v) => v.sellerSku === row.sellerSku)?.inventory ||
                row.inventory ||
                0
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量" width="100px" />
        <el-table-column label="单位">
          <template #default="{ row }">
            <span>{{ row?.unitDesc || '件' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shippingDesc" min-width="100px" width="220px" label="配送方式" />
      </el-table>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="TTOrderToFBA">
  import { decryptByBase64 } from '@/utils/aesTils';
  import { erpApi, platformApi } from '@/api';
  import { ElMessage, FormRules } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const codeList = ref([]);
  const route = useRoute();
  const router = useRouter();
  const type = ref(route.query.type);
  const form = ref({
    detailList: [],
  });

  const rules = reactive<FormRules>({
    warehouseCode: [{ required: true, message: '请选择Amazon店铺账号', trigger: 'change' }],
    serivceLevel: [{ required: true, message: '请选择服务等级', trigger: 'change' }],
    sellerSku: [{ required: true, message: '请选择Amazon发货SKU', trigger: 'change' }],
    'receiveInfo.province': [
      { required: true, message: '请输入收件人省/州' },
      { pattern: /^[A-Z]{2}$/, message: '请输入正确的省/州二位码' },
    ],
  });

  const delItem = (index: number) => {
    form.value.detailList.splice(index, 1);
  };

  const queryBatchFba = async () => {
    const res = await erpApi.luteosErpOrderQueryBatchFba({ orderCodeList: codeList.value });
    form.value.detailList = res?.detailList?.map((item) => {
      item.baseInfo.warehouseCode = item?.shopParamList[0]?.warehouseCode;
      item.receiveInfo.province =
        provinceMap.value?.find((province) => province.desc === item.receiveInfo.province)?.value ||
        item.receiveInfo.province;
      handleWarehouseChange(item.baseInfo?.warehouseCode, item);
      return {
        ...item,
        serivceLevel: 'Expedited',
      };
    });
  };

  const provinceMap = ref([]);
  const queryProvinceMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['order_provice'],
    });
    provinceMap.value = res?.dictMap?.order_provice || [];
  };

  const formRef = ref('');
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    const isConfirmed = await swal.confirm('订单确定要全部转FBA配送吗？');
    if (!isConfirmed) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpOrderBatchToFba({
        detailList: form.value.detailList?.map((item) => {
          return {
            province: item.receiveInfo.province,
            erpCode: item.baseInfo.erpCode,
            serivceLevel: item.serivceLevel,
            warehouseCode: item.baseInfo.warehouseCode,
            itemList: item.itemInfoList.map((v) => {
              return {
                id: v.id,
                sellerSku: v.sellerSku,
              };
            }),
          };
        }),
      });
      ElMessage.success('操作成功');
      closeTabAndRefresh(type.value === '2' ? 'TTOrder' : 'samplesend');
      goBack();
    } finally {
      saveLoading.value = false;
    }
  };

  const handleWarehouseChange = (val, item) => {
    item.itemInfoList?.forEach((k) => {
      k.sellerSku = item.shopParamList
        ?.find((v) => val === v.warehouseCode)
        ?.supplySkuList?.filter((v) => v.supplySku === k.supplySku)[0]?.sellerSku;
    });
  };

  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      goBack();
    }
  };

  const goBack = () => {
    router.push({
      name: type.value === '2' ? 'TTOrder' : 'samplesend',
    });
  };

  onActivated(() => {
    codeList.value = JSON.parse(decryptByBase64(route.query.codeList));
    formRef.value?.resetFields();
    queryProvinceMap();
    queryBatchFba();
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__row .cell) {
    padding-bottom: 1.75rem;
  }
  :deep(.el-table__row .cell > .el-form-item) {
    margin-bottom: 0;
  }
</style>
