<template>
  <el-dialog width="1350px" :title="title" v-model="visible" @close="handleClose" align-center>
    <el-form ref="formRef" :model="form">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="form?.orderChangeDetailList"
        row-key="erpCode"
        max-height="60vh"
      >
        <el-table-column label="订单号" prop="erpCode" min-width="130px" />
        <el-table-column label="产品信息" min-width="190px">
          <template #default="{ row }">
            <div class="product-list">
              <div class="product-item" v-for="item in row?.itemInfoList" :key="item?.id">
                <div class="product-img">
                  <img v-if="item?.productImageUrl" :src="item?.productImageUrl" alt="" />
                  <img v-else src="@/assets/images/system/empty.png" alt="" />
                  <img
                    v-if="item?.inventory < item?.num"
                    class="outStock"
                    :src="getImg('outStock')"
                    alt=""
                  />
                </div>
                <div>
                  <div class="product-title">
                    <OverflowTooltip :content="item?.productName" :line="1" :font-size="12" />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">产品SKU：</span>
                    {{ item?.skuCode }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="!isOmsOrder" label="发货方式" width="144">
          <template #default="{ row }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="item in row?.itemInfoList"
              :key="item?.id"
            >
              <OverflowTooltip :content="item?.deliveryDesc" :line="1" :font-size="12" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="仓库" min-width="150">
          <template #default="{ row }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="item in row?.itemInfoList"
              :key="item?.id"
            >
              <OverflowTooltip :content="item?.warehouseDesc" :line="1" :font-size="12" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU" min-width="210">
          <template #default="{ row, $index }">
            <div
              v-for="(item, index) in row?.itemInfoList"
              :key="item?.id"
              class="info-item"
              style="padding-top: 10px"
            >
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].supplySku`"
                :rules="[{ required: true, message: '请选择供应链SKU', trigger: 'change' }]"
              >
                <!-- <el-select
                  style="width: 140px"
                  v-model="item.supplySku"
                  filterable
                  :placeholder="!row.warehouseCode ? '请先选择仓库' : '请选择'"
                  @change="handleSupplySkuChange($event, item, item.supplySkuItemList)"
                >
                  <el-option
                    v-for="supplySku in item.supplySkuItemList"
                    :key="supplySku.supplySku"
                    :label="supplySku.supplySku"
                    :value="supplySku.supplySku"
                  />
                </el-select> -->
                {{ item.supplySku }}
                <el-button
                  size="small"
                  type="primary"
                  @click="handleAddSku(item)"
                  style="margin-left: 16px"
                >
                  换货
                </el-button>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存" prop="inventory" width="60">
          <template #default="{ row }">
            <div class="info-item" v-for="item in row?.itemInfoList" :key="item?.id">
              {{ item?.inventory || 0 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量 (件)" width="100">
          <template #default="{ row, $index }">
            <div class="info-item" v-for="(item, index) in row?.itemInfoList" :key="item?.id">
              <!-- {{ item.num }} -->
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].num`"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'change' },
                  {
                    // 自定义校验器
                    validator: (rule, value, callback) => {
                      if (!value) {
                        return callback(new Error('请输入正整数'));
                      }
                      // 正则校验：必须是 1-9 开头，后面跟 0-9，确保是大于 0 的整数
                      if (!/^[1-9]\d*$/.test(value)) {
                        callback(new Error('请输入正整数'));
                      } else {
                        callback();
                      }
                    },
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input placeholder="请输入正整数" v-model="item.num" maxlength="10" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物流渠道" min-width="150px">
          <template #default="{ row }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="item in row?.itemInfoList"
              :key="item?.id"
            >
              <OverflowTooltip :content="item?.shippingDesc" :line="1" :font-size="12" />
              <div class="text-warning fontcolor d-flex flex-align timeicon">
                <i class="iconfont icon-shijian" style="font-size: 12px"></i>
                预估时效：{{
                  isOmsOrder
                    ? item?.timeliness
                    : item?.shippingList?.find((v) => v.value === item.shippingCode)?.params
                        ?.timeliness
                }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row, $index }">
            <div class="info-item" v-for="(item, index) in row?.itemInfoList" :key="item?.id">
              <!--              <el-link type="danger" @click="handleDelete(row, $index, index)">删除</el-link>-->
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'danger',
                    permissionCode: '',
                    row,
                    rowIndex: $index,
                    index,
                  },
                  {
                    label: '应用到所有',
                    key: 'apply',
                    type: 'primary',
                    permissionCode: '',
                    row,
                    rowIndex: $index,
                    index,
                  },
                ]"
                @click="handleActions"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
  <SupplyProductSelectDialog
    ref="supplyProductSelectDialogRef"
    @success="handleProductSelectSuccess"
    :showdetail="true"
  />
</template>

<script setup lang="ts">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';
  import * as swal from '@/utils/swal';
  import { OrderChangeSkuBatchToAuditResp } from '@/api/erp/data-contracts';
  // import SupplyProductSelectDialog from '@/components/SupplyProductSelectDialog/index.vue';
  import SupplyProductSelectDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/SupplyProductSelectDialog.vue';
  import type { SupplySkuListBean } from '@/api/oms/data-contracts';

  const props = withDefaults(
    defineProps<{
      title: string;
    }>(),
    {
      title: '批量换货',
    }
  );
  const emit = defineEmits(['close']);

  const supplyProductSelectDialogRef = ref();
  const defaultWarehouseCode = ref<string>('');
  // 换 sku
  let changeSku;
  function handleAddSku(item) {
    console.log('换货前', item);
    changeSku = item;
    // const selectedProducts = giftList.value
    //   .filter((item) => item._originalProduct)
    //   .map((item) => item._originalProduct as SupplySkuListBean);
    // const selectedProducts = [item];
    const selectedProducts = [];
    // 仓库
    supplyProductSelectDialogRef.value?.open(selectedProducts, item?.warehouseCode ?? '');
  }
  function handleProductSelectSuccess(products: SupplySkuListBean[]) {
    if (!products || products.length === 0) {
      return;
    }
    console.log('确定要换 ', products[0]);
    changeSku.skuCode = products[0].skuCode;
    changeSku.supplySku = products[0].supplySku;
    changeSku.productName = products[0].productTitle;
    changeSku.productTitleEn = products[0].productTitleEn;
    changeSku.productImageUrl = products[0].productImageUrl;
    changeSku.inventory = products[0].availableInventory;
    console.log('换货后 sku', changeSku);
  }

  const visible = ref(false);

  const form = ref<OrderChangeSkuBatchToAuditResp>({});
  const formRef = ref();

  let queryService = null;
  let replaceService = null;
  let queryParamsService = null;
  const listLoading = ref(false);
  const queryList = async (orderCodeList) => {
    try {
      listLoading.value = true;
      form.value = await queryService({
        orderCodeList,
        codes: orderCodeList,
      });

      if (form.value?.orderChangeDetailList?.length) {
        // 收集所有唯一的 skuCode
        const skuCodeSet = new Set<string>();
        const skuCountryMap = new Map<string, string>(); // skuCode -> countryCode

        form.value.orderChangeDetailList.forEach((item) => {
          item?.itemInfoList?.forEach((itemInfo) => {
            if (itemInfo?.skuCode) {
              itemInfo.skuCodeBackup = itemInfo.skuCode;
              itemInfo.supplySkuBackup = itemInfo.supplySku;
              skuCodeSet.add(itemInfo.skuCode);
              // 保存 countryCode 用于请求（假设同一 skuCode 使用相同国家）
              if (item?.countryCode && !skuCountryMap.has(itemInfo.skuCode)) {
                skuCountryMap.set(itemInfo.skuCode, item.countryCode);
              }
            }
          });
        });

        // 批量请求所有参数（去重）
        const skuCodeList = Array.from(skuCodeSet);
        if (skuCodeList.length > 0 && !isOmsOrder.value) {
          const paramsMap = new Map(); // skuCode -> params

          // 分批处理（避免请求体过大）
          const batchSize = 50;
          const batches = [];
          for (let i = 0; i < skuCodeList.length; i += batchSize) {
            batches.push(skuCodeList.slice(i, i + batchSize));
          }

          // 并发请求（控制并发数避免触发限流）
          const batchPromises = batches.map((batch) =>
            queryParamsService({
              countryCode: skuCountryMap.get(batch[0]) || '', // 简化处理
              skuCodeList: batch,
              type: 1,
            }).catch((err) => {
              console.error(`Failed to fetch params for batch:`, batch, err);
              return { paramMap: {} }; // 返回空结果避免中断
            })
          );

          const results = await Promise.all(batchPromises);

          // 合并结果
          results.forEach((result) => {
            Object.entries(result?.paramMap || {}).forEach(([skuCode, params]) => {
              paramsMap.set(skuCode, params);
            });
          });
        }
        // 处理每个 itemInfo
        for (const item of form.value.orderChangeDetailList) {
          // 处理 inventory
          item?.itemInfoList?.forEach((itemInfo) => {
            itemInfo.inventory =
              itemInfo?.supplySkuItemList?.find(
                (supplySku) => supplySku.supplySku === itemInfo.supplySku
              )?.inventory || 0;
          });
        }
      }
    } finally {
      listLoading.value = false;
    }
  };

  const handleActions = async (item) => {
    console.log(item, 'item');
    const { key, row, rowIndex, index } = item;
    if (key === 'delete') {
      if (form.value?.orderChangeDetailList?.length === 1 && row?.itemInfoList?.length === 1) {
        ElMessage.warning('至少保留一条记录');
        return;
      }
      const isConfirmed = await swal.confirm('确定要删除吗？');
      if (!isConfirmed) return;
      if (row?.itemInfoList?.length > 1) {
        row?.itemInfoList?.splice(index, 1);
      } else {
        form.value?.orderChangeDetailList?.splice(rowIndex, 1);
      }
    }
    // console.log(key, row, rowIndex, index);
    console.log(row, 'row');
    console.log(rowIndex, 'rowIndex');
    console.log(index, 'index');
    if (key === 'apply') {
      if (form.value?.orderChangeDetailList?.length === 1 && row?.itemInfoList?.length === 1) {
        ElMessage.warning('仅有一条记录，无法应用到下面的记录');
        return;
      }
      console.log(form.value?.orderChangeDetailList);
      // if (rowIndex === form.value?.orderChangeDetailList?.length - 1) {
      //   ElMessage.warning('最后一条记录，无法应用到下面的记录');
      //   return;
      // }

      // if (
      //   !(
      //     row.itemInfoList[index].deliveryCode &&
      //     row.itemInfoList[index].warehouseCode &&
      //     row.itemInfoList[index].deliveryCode &&
      //     row.itemInfoList[index].supplySku &&
      //     row.itemInfoList[index].num &&
      //     row.itemInfoList[index].shippingCode
      //   )
      // ) {
      //   ElMessage.warning('信息填写不完整');
      //   return;
      // }
      // console.log('checkisin');
      console.log('点击行信息', row);
      form.value.orderChangeDetailList.forEach((detail, idx) => {
        console.log('detail--' + idx, detail);
        if (idx === rowIndex && row.itemInfoList?.length > 1) {
          console.log('一行多条信息', row.itemInfoList);
          for (let i = 0; i < row.itemInfoList.length; i += 1) {
            // console.log(row.itemInfoList[i].skuCode, row.itemInfoList[index].skuCode);
            // if (i > index && row.itemInfoList[i].skuCode === row.itemInfoList[index].skuCode) {
            if (
              i > index &&
              row.itemInfoList[i].skuCodeBackup === row.itemInfoList[index].skuCodeBackup
            ) {
              // if (row.itemInfoList[i].skuCode === row.itemInfoList[index].skuCode) {
              console.log('下一条赋值', i);
              const itemInfo = row.itemInfoList[i];
              const copyIdx = index;
              // const skuFilter = itemInfo.supplySkuItemList?.filter(
              //   (skuItem) => skuItem.supplySku === row.itemInfoList[copyIdx].supplySku
              // );
              // if (skuFilter?.length) {
              //   itemInfo.supplySku = row.itemInfoList[copyIdx].supplySku;
              //   handleSupplySkuChange(
              //     row.itemInfoList[copyIdx].supplySku.supplySku,
              //     itemInfo,
              //     itemInfo.supplySkuItemList
              //   );
              // } else {
              //   // console.log('没有匹配的supplySku');
              // }
              // itemInfo.num = row.itemInfoList[copyIdx].num;
              // itemInfo.shippingCode = cloneDeep(row.itemInfoList[copyIdx].shippingCode);
              // itemInfo.shippingList = cloneDeep(row.itemInfoList[copyIdx].shippingList);

              // changeSku.skuCode = products[0].skuCode;
              itemInfo.skuCode = row.itemInfoList[copyIdx].skuCode;
              itemInfo.supplySku = row.itemInfoList[copyIdx].supplySku;
              itemInfo.productName = row.itemInfoList[copyIdx].productName;
              itemInfo.productTitleEn = row.itemInfoList[copyIdx].productTitleEn;
              itemInfo.productImageUrl = row.itemInfoList[copyIdx].productImageUrl;
              itemInfo.inventory = row.itemInfoList[copyIdx].inventory;
            }
          }
        }
        if (idx > rowIndex) {
          console.log('下一单据赋值');
          // detail.itemInfoList = cloneDeep(row.itemInfoList);
          const copyIdx = index;
          detail.itemInfoList?.forEach((item2, idx2) => {
            // const deliveryFilter: any = item2.deliveryList?.filter(
            //   (delivery) => delivery.deliveryCode === row.itemInfoList[copyIdx].deliveryCode
            // );
            // if (deliveryFilter?.length > 0) {
            // const deliveryFilter: any = item2.skuCode === row.itemInfoList[copyIdx].skuCode;
            const deliveryFilter: any =
              item2.skuCodeBackup === row.itemInfoList[copyIdx].skuCodeBackup;
            if (deliveryFilter) {
              // console.log(item2, deliveryFilter);
              // const skuFilter = item2.supplySkuItemList?.filter(
              //   (skuItem) => skuItem.supplySku === row.itemInfoList[copyIdx].supplySku
              // );
              // if (skuFilter?.length) {
              //   item2.supplySku = row.itemInfoList[copyIdx].supplySku;
              //   handleSupplySkuChange(
              //     row.itemInfoList[copyIdx].supplySku,
              //     item2,
              //     item2.supplySkuItemList
              //   );
              // } else {
              //   // console.log('没有匹配的supplySku');
              // }
              // item2.shippingCode = cloneDeep(row.itemInfoList[copyIdx].shippingCode);
              // item2.shippingList = cloneDeep(row.itemInfoList[copyIdx].shippingList);

              item2.skuCode = row.itemInfoList[copyIdx].skuCode;
              item2.supplySku = row.itemInfoList[copyIdx].supplySku;
              item2.productName = row.itemInfoList[copyIdx].productName;
              item2.productTitleEn = row.itemInfoList[copyIdx].productTitleEn;
              item2.productImageUrl = row.itemInfoList[copyIdx].productImageUrl;
              item2.inventory = row.itemInfoList[copyIdx].inventory;
            } else {
              // console.log('deliveryCode 不匹配');
              // item2.deliveryCode = '';
              // item2.warehouseCode = '';
              // // item2.supplySku = '';
              // item2.shippingCode = '';
              // item2.shippingList = [];
            }
            // item2.num = row.itemInfoList[copyIdx].num;
          });
        }
      });
    }
  };

  // 供应链SKU改变
  const handleSupplySkuChange = async (val: string, currentRow: any, currentSupplySkuList) => {
    const result = currentSupplySkuList.find((item) => item.supplySku === val);
    currentRow.inventory = result ? result.inventory : 0;
  };

  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await replaceService(form.value);
      if (res?.failList?.length) {
        resultDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success('换货成功');
      }
      emit('close');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const handleClose = () => {
    // console.log('visible');
    visible.value = false;
    formRef.value?.clearValidate();
  };
  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };

  const isOmsOrder = ref(false);
  const open = (codeList, isOms = false) => {
    isOmsOrder.value = isOms;
    queryService = isOms
      ? omsApi.omsFulfillmentOrderQueryChangeSkuList
      : erpApi.luteosErpOrderBatchChangeSkuList;
    replaceService = isOms
      ? omsApi.omsFulfillmentOrderBatchChangeSku
      : erpApi.luteosErpOrderBatchChangeSkuListToAudit;
    queryParamsService = isOms
      ? omsApi.omsOrderReferenceParamsBySkuCode
      : erpApi.luteosErpOrderReferenceParamsBySkuCode;
    queryList(codeList);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .product-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    //gap: 18px;
    .product-item + .product-item {
      margin-top: 18px;
    }

    .product-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .product-img {
        position: relative;

        img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }

        .outStock {
          width: 16px;
          position: absolute;
          top: -12px;
          right: -2px;
        }
      }

      .product-title {
        margin-bottom: 2px;
      }
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 60px;

    & + & {
      margin-top: 18px;
    }
  }

  .item-label {
    flex-shrink: 0;
    color: #999999;
  }

  .timeicon {
    height: 20px;
    line-height: 20px;
    margin-top: 2px;
    font-size: 12px;
  }

  :deep(.el-table__cell:has(.el-form-item)) {
    padding-bottom: 0;
  }
</style>
