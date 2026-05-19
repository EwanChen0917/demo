<template>
  <el-dialog width="1350px" title="批量换货" v-model="visible" @close="handleClose" align-center>
    <el-form ref="formRef" :model="form">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="form?.orderChangeDetailList"
        row-key="erpCode"
        max-height="60vh"
      >
        <el-table-column label="订单号" prop="erpCode" min-width="130px" />
        <el-table-column label="产品信息" min-width="200px">
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
        <el-table-column label="发货方式" width="144">
          <template #default="{ row, $index }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="(item, index) in row?.itemInfoList"
              :key="item?.id"
            >
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].deliveryCode`"
                :rules="[{ required: true, message: '请选择发货方式' }]"
              >
                <el-select
                  v-model="item.deliveryCode"
                  filterable
                  @change="handleDeliveryCodeChange($event, item, item.deliveryList)"
                  disabled
                >
                  <!-- checkisin -->
                  <el-option
                    v-for="delivery in item.deliveryList"
                    :key="delivery.deliveryCode"
                    :label="delivery.deliveryName"
                    :value="delivery.deliveryCode"
                  />
                </el-select>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="仓库" min-width="150">
          <template #default="{ row, $index }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="(item, index) in row?.itemInfoList"
              :key="item?.id"
            >
              <!--              <OverflowTooltip :content="item?.warehouseDesc" :line="1" :font-size="12" />-->
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].warehouseCode`"
                :rules="[{ required: true, message: '请选择仓库' }]"
              >
                <el-tooltip :content="item.warehouseDesc" placement="top">
                  <el-select
                    style="width: 150px"
                    v-model="item.warehouseCode"
                    filterable
                    :placeholder="
                      !item.deliveryCode && !item.warehouseCode ? '请先选择发货方式' : '请选择'
                    "
                    @change="handleWarehouseCodeChange($event, item, item.warehouseList)"
                    disabled
                  >
                    <el-option
                      v-for="warehouse in item.warehouseList"
                      :key="warehouse.warehouseCode"
                      :label="warehouse.warehouseName"
                      :value="warehouse.warehouseCode"
                    />
                  </el-select>
                </el-tooltip>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU" min-width="140">
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
                <el-tooltip :content="item?.supplySku" placement="top">
                  <el-select
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
                  </el-select>
                </el-tooltip>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存" prop="inventory" width="60">
          <template #default="{ row }">
            <div class="info-item" v-for="item in row?.itemInfoList" :key="item?.id">
              {{ item?.inventory }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量 (件)" width="100">
          <template #default="{ row, $index }">
            <div
              style="padding-top: 10px"
              class="info-item"
              v-for="(item, index) in row?.itemInfoList"
              :key="item?.id"
            >
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].num`"
                :rules="[
                  { required: true, message: '请输入数量' },
                  {
                    pattern: positiveIntegerRule,
                    message: '请输入正整数',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input v-model="item.num" disabled />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物流渠道" min-width="150px">
          <template #default="{ row, $index }">
            <div
              class="info-item"
              style="padding-top: 10px"
              v-for="(item, index) in row?.itemInfoList"
              :key="item?.id"
            >
              <!--              <OverflowTooltip :content="item?.shippingDesc" :line="1" :font-size="12" />-->
              <el-form-item
                class="table-form-item"
                :prop="`orderChangeDetailList[${$index}].itemInfoList[${index}].shippingCode`"
                :rules="[{ required: true, message: '请选择物流渠道' }]"
              >
                <el-tooltip :content="item?.shippingDesc" placement="top">
                  <el-select
                    v-model="item.shippingCode"
                    filterable
                    :placeholder="
                      !item.warehouseCode && !item.shippingCode ? '请先选择仓库' : '请选择'
                    "
                    disabled
                  >
                    <el-option
                      v-for="shipping in item.shippingList"
                      :key="shipping.value"
                      :label="shipping.desc"
                      :value="shipping.value"
                    />
                  </el-select>
                </el-tooltip>
                <div class="text-warning fontcolor d-flex flex-align timeicon">
                  <i class="iconfont icon-shijian" style="font-size: 12px"></i>
                  预估时效：{{
                    item?.shippingList?.find((v) => v.value === item.shippingCode)?.params
                      ?.timeliness
                  }}
                </div>
              </el-form-item>
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
        <!-- <el-button @click="cancel">重置</el-button> -->
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
</template>

<script setup lang="ts">
  import { erpApi, productApi, omsApi } from '@/api';
  import { positiveIntegerRule } from '@/utils/rulesRegExp';
  import { ElMessage } from 'element-plus';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';
  import * as swal from '@/utils/swal';
  import { OrderChangeSkuBatchToAuditResp } from '@/api/erp/data-contracts';
  import { cloneDeep } from 'lodash-es';

  const emit = defineEmits(['close']);

  const visible = ref(false);

  const form = ref<OrderChangeSkuBatchToAuditResp>({});
  const formRef = ref();

  const listLoading = ref(false);
  const queryList = async (orderCodeList) => {
    try {
      listLoading.value = true;
      form.value = await omsApi.omsOrderBatchChangeSkuList({
        orderCodeList,
      });

      if (form.value?.orderChangeDetailList?.length) {
        // 收集所有唯一的 skuCode
        const skuCodeSet = new Set<string>();
        const skuCountryMap = new Map<string, string>(); // skuCode -> countryCode

        form.value.orderChangeDetailList.forEach((item) => {
          item?.itemInfoList?.forEach((itemInfo) => {
            if (itemInfo?.skuCode) {
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
        if (skuCodeList.length > 0) {
          const paramsMap = new Map(); // skuCode -> params

          // 分批处理（避免请求体过大）
          const batchSize = 50;
          const batches = [];
          for (let i = 0; i < skuCodeList.length; i += batchSize) {
            batches.push(skuCodeList.slice(i, i + batchSize));
          }

          // 并发请求（控制并发数避免触发限流）
          const batchPromises = batches.map((batch) =>
            omsApi
              .omsOrderReferenceParamsBySkuCode({
                countryCode: skuCountryMap.get(batch[0]) || '', // 简化处理
                skuCodeList: batch,
                type: 1,
              })
              .catch((err) => {
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

          // 处理每个 itemInfo
          for (const item of form.value.orderChangeDetailList) {
            // 处理 inventory
            item?.itemInfoList?.forEach((itemInfo) => {
              itemInfo.inventory =
                itemInfo?.supplySkuItemList?.find(
                  (supplySku) => supplySku.supplySku === itemInfo.supplySku
                )?.inventory || 0;
            });

            // 应用预加载的参数
            for (const itemInfo of item?.itemInfoList || []) {
              const skuParams = paramsMap.get(itemInfo?.skuCode) || [];
              itemInfo.deliveryList = skuParams;

              const matchedDelivery = skuParams?.find(
                (k) => k.deliveryCode === itemInfo.deliveryCode
              );
              itemInfo.warehouseList = matchedDelivery?.warehouseList || [];

              const matchedWarehouse = itemInfo?.warehouseList?.find(
                (k) => k.warehouseCode === itemInfo.warehouseCode
              );
              itemInfo.shippingList = matchedWarehouse?.shippingList || [];
            }
          }
        }
      }
    } finally {
      listLoading.value = false;
    }
  };

  const handleActions = async (item) => {
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
    if (key === 'apply') {
      if (form.value?.orderChangeDetailList?.length === 1 && row?.itemInfoList?.length === 1) {
        ElMessage.warning('仅有一条记录，无法应用到下面的记录');
        return;
      }
      // console.log(key, row, rowIndex, index);
      if (rowIndex === form.value?.orderChangeDetailList?.length - 1) {
        ElMessage.warning('最后一条记录，无法应用到下面的记录');
        return;
      }
      if (
        !(
          row.itemInfoList[index].deliveryCode &&
          row.itemInfoList[index].warehouseCode &&
          row.itemInfoList[index].deliveryCode &&
          row.itemInfoList[index].supplySku &&
          row.itemInfoList[index].num &&
          row.itemInfoList[index].shippingCode
        )
      ) {
        ElMessage.warning('信息填写不完整');
        return;
      }
      // console.log('checkisin');
      // console.log('点击行信息', row);
      form.value.orderChangeDetailList.forEach((detail, idx) => {
        // console.log('detail', detail);
        if (idx === rowIndex && row.itemInfoList?.length > 1) {
          // console.log('一行多条信息', row.itemInfoList);
          for (let i = 0; i < row.itemInfoList.length; i += 1) {
            if (i > index && row.itemInfoList[i].skuCode === row.itemInfoList[index].skuCode) {
              // if (row.itemInfoList[i].skuCode === row.itemInfoList[index].skuCode) {
              // console.log('下一条赋值');
              const itemInfo = row.itemInfoList[i];
              const copyIdx = index;
              // itemInfo.deliveryCode = row.itemInfoList[copyIdx].deliveryCode;
              // handleDeliveryCodeChange(
              //   row.itemInfoList[copyIdx].deliveryCode,
              //   itemInfo,
              //   itemInfo.deliveryList
              // );
              // itemInfo.warehouseCode = row.itemInfoList[copyIdx].warehouseCode;
              // handleWarehouseCodeChange2(
              //   row.itemInfoList[copyIdx].warehouseCode,
              //   itemInfo,
              //   itemInfo.warehouseList
              // );
              const skuFilter = itemInfo.supplySkuItemList?.filter(
                (skuItem) => skuItem.supplySku === row.itemInfoList[copyIdx].supplySku
              );
              if (skuFilter?.length) {
                itemInfo.supplySku = row.itemInfoList[copyIdx].supplySku;
                handleSupplySkuChange(
                  row.itemInfoList[copyIdx].supplySku.supplySku,
                  itemInfo,
                  itemInfo.supplySkuItemList
                );
              } else {
                // console.log('没有匹配的supplySku');
              }
              // itemInfo.num = row.itemInfoList[copyIdx].num;
              // itemInfo.shippingCode = cloneDeep(row.itemInfoList[copyIdx].shippingCode);
              // itemInfo.shippingList = cloneDeep(row.itemInfoList[copyIdx].shippingList);
            }
          }
        }
        if (idx > rowIndex) {
          // console.log('下一单据赋值');
          // detail.itemInfoList = cloneDeep(row.itemInfoList);
          const copyIdx = index;
          detail.itemInfoList?.forEach((item2, idx2) => {
            // const deliveryFilter: any = item2.deliveryList?.filter(
            //   (delivery) => delivery.deliveryCode === row.itemInfoList[copyIdx].deliveryCode
            // );
            // if (deliveryFilter?.length > 0) {
            const deliveryFilter: any = item2.skuCode === row.itemInfoList[copyIdx].skuCode;
            if (deliveryFilter) {
              // console.log('更改行', item2);
              // console.log('更改行', item2);
              // item2.deliveryCode = row.itemInfoList[copyIdx].deliveryCode;
              // handleDeliveryCodeChange(
              //   row.itemInfoList[copyIdx].deliveryCode,
              //   item2,
              //   item2.deliveryList
              // );
              // item2.warehouseCode = row.itemInfoList[copyIdx].warehouseCode;
              // handleWarehouseCodeChange2(
              //   row.itemInfoList[copyIdx].warehouseCode,
              //   item2,
              //   item2.warehouseList
              // );
              const skuFilter = item2.supplySkuItemList?.filter(
                (skuItem) => skuItem.supplySku === row.itemInfoList[copyIdx].supplySku
              );
              if (skuFilter?.length) {
                item2.supplySku = row.itemInfoList[copyIdx].supplySku;
                handleSupplySkuChange(
                  row.itemInfoList[copyIdx].supplySku,
                  item2,
                  item2.supplySkuItemList
                );
              } else {
                // console.log('没有匹配的supplySku');
              }
              // item2.shippingCode = cloneDeep(row.itemInfoList[copyIdx].shippingCode);
              // item2.shippingList = cloneDeep(row.itemInfoList[copyIdx].shippingList);
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
  const cancel = async () => {
    form.value.orderChangeDetailList.forEach((detail, idx) => {
      detail.itemInfoList?.forEach((item2) => {
        item2.deliveryCode = '';
        item2.warehouseList = [];
        item2.warehouseCode = '';
        // item2.supplySku = '';
        // item2.num = undefined;
        item2.shippingCode = '';
        item2.shippingList = [];
      });
    });
  };

  // 发货方式改变
  const handleDeliveryCodeChange = (val: string, currentRow: any, currentDeliveryList) => {
    const result = currentDeliveryList.find((item) => item.deliveryCode === val);
    currentRow.warehouseList = result ? cloneDeep(result.warehouseList) : [];
    // 清空
    currentRow.warehouseCode = '';
    currentRow.shippingCode = '';
    currentRow.shippingList = [];
    //  currentRow.supplySku = '';
    currentRow.supplySkuItemList = [];
    currentRow.inventory = 0;
  };
  // 仓库发生改变
  const handleWarehouseCodeChange = async (val: string, currentRow: any, currentWarehouseList) => {
    // console.log(val, currentRow, currentWarehouseList);
    const result = currentWarehouseList.find((item) => item.warehouseCode === val);
    // console.log('仓库 ', result);
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    currentRow.shippingCode =
      currentRow.shippingList.length > 0 ? currentRow.shippingList[0].value : '';
    // currentRow.shippingCode = '';
    //  currentRow.supplySku = '';
    const res: any = await productApi.luteosProductSkuQuerySupplySkuList({
      deliverType: currentRow.deliveryCode,
      skuCode: currentRow.skuCode,
      warehouseCode: val,
    });
    if (res) {
      currentRow.supplySkuItemList = res.supplySkuItemList;
      currentRow.supplySku = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].supplySku
        : '';
      currentRow.inventory = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].inventory
        : 0;
    }
  };
  // 多条 sku ,不自动填充第一条
  const handleWarehouseCodeChange2 = async (val: string, currentRow: any, currentWarehouseList) => {
    // console.log(val, currentRow, currentWarehouseList);
    const result = currentWarehouseList.find((item) => item.warehouseCode === val);
    // console.log('仓库 ', result);
    currentRow.shippingList = result ? cloneDeep(result.shippingList) : [];
    currentRow.shippingCode =
      currentRow.shippingList.length > 0 ? currentRow.shippingList[0].value : '';
    // currentRow.shippingCode = '';
    //  currentRow.supplySku = '';
    const res: any = await productApi.luteosProductSkuQuerySupplySkuList({
      deliverType: currentRow.deliveryCode,
      skuCode: currentRow.skuCode,
      warehouseCode: val,
    });
    if (res) {
      currentRow.supplySkuItemList = res.supplySkuItemList;
      // console.log('supplySkuItemList', currentRow.supplySkuItemList.length);
      if (currentRow.supplySkuItemList.length === 1) {
        currentRow.supplySku = currentRow.supplySkuItemList[0]
          ? currentRow.supplySkuItemList[0].supplySku
          : '';
      } else if (currentRow.supplySkuItemList.length >= 1) {
        //  currentRow.supplySku = '';
      }
      // currentRow.supplySku = currentRow.supplySkuItemList[0]
      //   ? currentRow.supplySkuItemList[0].supplySku
      //   : '';
      currentRow.inventory = currentRow.supplySkuItemList[0]
        ? currentRow.supplySkuItemList[0].inventory
        : 0;
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
      const res = await omsApi.omsOrderBatchChangeSkuListToAudit(form.value);
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

  const open = (codeList) => {
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
    gap: 18px;
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
