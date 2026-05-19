<template>
  <el-dialog
    width="1200px"
    :title="title"
    v-model="visible"
    :close-on-click-modal="false"
    @close="visible = false"
    align-center
  >
    <template #header>
      <div class="dialog-header">
        <span class="el-dialog__title" style="font-size: 14px">订单拆单</span>
        <ItemLabel label="订单号" :value="erpCode" />
      </div>
    </template>
    <div class="sub-orders" v-loading="listLoading">
      <div v-for="(item, index) in itemInfoList" :key="index">
        <div v-if="index === 1" class="sub-num">
          <span class="num">拆分订单数：{{ itemInfoList?.length }}</span>
          <el-link type="success" :underline="false" @click="prev">
            <span class="prev">重新拆分</span>
          </el-link>
        </div>
        <el-table
          :ref="(el) => setTableRef(el, index)"
          :data="item"
          max-height="800"
          border
          :row-key="(row) => row.id || row.supplySku + index"
          @selection-change="(list) => handleSelectionChange(list, index)"
        >
          <el-table-column type="selection" width="28" v-if="!flag" reserve-selection />
          <el-table-column prop="productName" label="产品名称" min-width="200">
            <template #default="{ row }">
              <OverflowTooltip :content="row?.productName" :line="2" v-if="row?.gift !== 1" />
              <template v-else>
                <div class="product">
                  <OverflowTooltip :content="row?.productName" :line="2" />
                </div>
                <img class="giftStock" :src="getImg('giftStock')" alt="" />
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="skuCode" label="产品SKU" min-width="100" />
          <el-table-column v-if="!isOmsOrder" prop="deliveryDesc" label="发货方式" min-width="90" />
          <el-table-column prop="warehouseDesc" label="仓库" min-width="150" />
          <el-table-column prop="supplySku" label="供应链SKU" min-width="150" />
          <el-table-column prop="shippingDesc" label="物流渠道" min-width="150" />
          <el-table-column prop="weight" label="单个产品重量" min-width="150" >
            <template #default="{ row }">
             <template v-if="row.weight">
                {{ row.weight }} g
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="volume" label="单个产品体积" min-width="150" >
            <template #default="{ row }">
             <template v-if="row.volume">
                {{ row.volume }} cm³
              </template>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="inventory" label="库存" min-width="80" />
          <el-table-column label="全部库存详情" min-width="100">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '明细',
                    key: 'detail',
                    type: 'primary',
                    row: row,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
          <el-table-column prop="num" label="数量（件）" min-width="120">
            <template #default="{ row }">
              <div>{{ row.num }}</div>
              <div
                v-if="statistics[`${row.warehouseCode}-${row.supplySku}`] > row?.inventory"
                class="error-num"
              >
                <i class="iconfont icon-zhuyizhuangtai-xianxing"></i>
                <span>件数大于库存</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="拆分量" min-width="100">
            <template #default="{ row, $index }">
              <NumberInput
                v-if="flag && selectedRows.includes(row)"
                placeholder="请输入"
                v-model="row.separateNum"
                :key="$index"
                :min="1"
                :max="row.num - 1"
                :precision="0"
              />
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="sub-btns" v-if="flag && curIndex === index">
          <el-button
            @click="
              flag = false;
              tableRefs = [];
            "
          >
            取消
          </el-button>
          <el-button type="primary" @click="confirm" v-loading="listLoading">拆分</el-button>
        </div>
        <div class="sub-btns" v-else>
          <el-button
            @click="separate"
            v-if="itemInfoList[index].length > 1"
            :disabled="
              curIndex !== index ||
              selectedRows.length === itemInfoList[curIndex].length ||
              selectedRows.length === 0
            "
          >
            单独订单
          </el-button>
          <el-button
            @click="separateByNum(false)"
            :disabled="curIndex !== index || selectedRows.length === 0"
          >
            按数量拆分
          </el-button>
          <el-button
            @click="separateByNum(true)"
            :disabled="curIndex !== index || selectedRows.length === 0"
          >
            按数量均分
          </el-button>
        </div>

        <!--      <vxe-table
          :data="item"
          max-height="800px"
          border="inner"
          :ref="setRef"
          :scroll-y="{ enabled: true, gt: 30 }"
          @checkbox-change="handleSelectionChange(index)"
          @checkbox-all="handleSelectionChange(index)"
          :row-style="tableRowStyle"
        >
          <vxe-column type="checkbox" width="60" v-if="!flag" />
          <vxe-column type="seq" title="序号" width="60" />
          <vxe-column field="productName" title="产品名称" minWidth="200" />
          <vxe-column field="skuCode" title="产品SKU" minWidth="100" />
          <vxe-column field="suggestPrice" title="建议售价" minWidth="80" />
          <vxe-column field="postalPrice" title="报价" minWidth="80" />
          <vxe-column field="taxRateDesc" width="100" title="税率" />
          <vxe-column field="priceTaxAmount" width="100" title="税额" />
          <vxe-column field="taxPrice" title="销售单价（含税）" minWidth="150" />
          <vxe-column field="price" title="销售单价（不含税）" minWidth="150" />
          <vxe-column field="deliveryDesc" title="发货方式" minWidth="80" />
          <vxe-column field="warehouseDesc" title="仓库" minWidth="150" />
          <vxe-column field="supplySku" title="供应链SKU" minWidth="150" />
          <vxe-column field="shippingDesc" title="配送方式" minWidth="150" />
          <vxe-column field="inventory" title="库存" minWidth="80" />
          <vxe-column field="num" title="数量" minWidth="80" />
          <vxe-column title="操作" minWidth="100">
            <template #default="{ row, $index }">
              <NumberInput
                v-if="flag && selectedRows.includes(row)"
                placeholder="请输入数量"
                v-model="row.separateNum"
                :key="$index"
                :min="1"
                :max="row.num - 1"
                :precision="0"
              />
              <span v-else>-</span>
            </template>
          </vxe-column>
        </vxe-table>-->
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading" :disabled="flag">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <StockDetailDialog
    :searchErpQuotation="true"
    v-if="stockDetailDialog"
    :visible="stockDetailDialog"
    @close="handleProductDialogClose"
    confirm-text="确认"
    title="全部可用库存"
    :sub-title="subTitle"
    type="supplierSku"
    :sku="selectSku"
    :teleported="true"
  />
</template>

<script setup lang="ts">
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';
  import { erpApi, omsApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  // import StockDetailDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/stockDetailDialog.vue';
  import StockDetailDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/stockDetailDialog.vue';

  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const subTitle = ref();

  const stockDetailDialog = ref(false);
  const selectSku = ref();
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      // selectSku.value = row;
      // console.log('明细', row, selectSku.value);
      subTitle.value = `${row.supplySku}`;
      stockDetailDialog.value = true;
    }
  };
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    stockDetailDialog.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isConfirmed = await swal.confirm('确定完成拆单?');
    if (!isConfirmed) return;

    saveLoading.value = true;
    try {
      await subService({
        erpCode: erpCode.value,
        itemInfoList: itemInfoList.value,
      });
      ElMessage.success('拆单成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const erpCode = ref('');
  let queryService = null;
  let subService = null;
  const itemInfoList = ref<any[]>([]);
  // 操作历史
  const historyIdx = ref(0);
  const historyList = ref([]);
  const statistics = ref({});

  const listLoading = ref(false);
  const getDetailData = async () => {
    itemInfoList.value = [];
    try {
      listLoading.value = true;
      const res: any = await queryService({
        erpCode: erpCode.value,
      });
      itemInfoList.value.push(res?.itemInfoList);
      historyList.value.push(cloneDeep(itemInfoList.value));
      resetStatistics();
    } finally {
      listLoading.value = false;
    }
  };

  const tableRefs = ref([]);
  const selectedRows = ref([]);

  const setTableRef = (el, index) => {
    tableRefs.value[index] = el;
  };

  const curIndex = ref(0);
  const handleSelectionChange = (list, index) => {
    curIndex.value = index;
    tableRefs.value.forEach((item, idx) => {
      if (idx !== index) {
        item?.clearSelection();
      }
    });
    selectedRows.value = list;
  };

  const separate = () => {
    // 全选了表格
    if (selectedRows.value?.length === itemInfoList.value[curIndex.value].length) {
      ElMessage.warning('请先取消全选');
      return;
    }
    itemInfoList.value.push(selectedRows.value);
    itemInfoList.value[curIndex.value] = itemInfoList.value[curIndex.value]?.filter(
      (item) => !selectedRows.value.includes(item)
    );
    resetTables();
    historyIdx.value += 1;
    historyList.value.splice(
      historyIdx.value,
      historyList.value.length - historyIdx.value,
      cloneDeep(itemInfoList.value)
    );
  };

  const flag = ref(false);
  const isAverage = ref(false);
  const separateByNum = (type) => {
    const invalidItem = selectedRows.value
      ?.filter((item) => item.num === 1)
      ?.map((item) => item.productName);
    if (invalidItem?.length > 0) {
      swal.error(`${invalidItem.join(',')} 数量为1，不可拆分`);
      return;
    }
    flag.value = true;
    isAverage.value = type;
  };

  const resetStatistics = () => {
    statistics.value = {};
    itemInfoList.value[0].forEach((item: any) => {
      if (item.warehouseCode && item.supplySku) {
        if (!statistics.value[`${item.warehouseCode}-${item.supplySku}`]) {
          statistics.value[`${item.warehouseCode}-${item.supplySku}`] = item.num || 0;
        } else {
          statistics.value[`${item.warehouseCode}-${item.supplySku}`] =
            statistics.value[`${item.warehouseCode}-${item.supplySku}`] + item.num || 0;
        }
      }
    });
  };

  const confirm = async () => {
    if (selectedRows.value?.filter((item) => !item.separateNum)?.length > 0) {
      ElMessage.warning('请先填写所有拆分数量');
      return;
    }
    listLoading.value = true;
    await nextTick();
    try {
      if (isAverage.value) {
        // 平均拆分
        const newList = [];
        selectedRows.value?.forEach((item) => {
          let index = 0;
          let total = item.num;
          item.num = item.separateNum;
          while (total - item.separateNum > 0) {
            if (newList[index] === undefined) newList[index] = [];
            newList[index].push({
              ...item,
              num: Math.min(total - item.separateNum, item.separateNum),
            });
            total -= item.separateNum;
            index += 1;
          }
        });
        itemInfoList.value = itemInfoList.value.concat(newList);
      } else {
        // 按数量拆分
        const newList = cloneDeep(selectedRows.value);
        newList.forEach((item) => {
          item.num = item?.separateNum;
        });
        itemInfoList.value.push(newList);
        selectedRows.value?.forEach((item) => {
          item.num -= item.separateNum;
        });
      }
      flag.value = false;
      // historyList.value.push(itemInfoList.value);
      resetTables();
      historyIdx.value += 1;
      historyList.value.splice(
        historyIdx.value,
        historyList.value.length - historyIdx.value,
        cloneDeep(itemInfoList.value)
      );
      console.log('itemInfoList.value', itemInfoList.value);
    } finally {
      listLoading.value = false;
    }
  };

  const resetTables = () => {
    tableRefs.value[curIndex.value]?.clearSelection();
    tableRefs.value = [];
    selectedRows.value = [];
  };

  const prev = () => {
    if (historyIdx.value > 0) {
      resetTables();
      historyIdx.value -= 1;
      itemInfoList.value = cloneDeep(historyList.value[historyIdx.value]);
    }
  };
  const next = () => {
    if (historyIdx.value < historyList.value.length - 1) {
      resetTables();
      historyIdx.value += 1;
      itemInfoList.value = cloneDeep(historyList.value[historyIdx.value]);
    }
  };

  const isOmsOrder = ref(false);
  const open = (code, isOms = false) => {
    isOmsOrder.value = isOms;
    queryService = isOms ? omsApi.omsOrderQueryDetail : erpApi.luteosErpOrderQueryDetail;
    subService = isOms ? omsApi.omsFulfillmentOrderSubOrder : erpApi.luteosErpOrderSubOrder;
    historyList.value = [];
    resetTables();
    erpCode.value = code;
    getDetailData();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .product {
    padding-left: 12px;
  }
  .giftStock {
    width: 20px;
    position: absolute;
    top: 3px;
    left: 1px;
  }
  .sub-orders {
    min-height: 300px;
  }

  .sub-btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .sub-num {
    margin-bottom: 16px;

    .num {
      color: var(---N9, #1f1f1f);
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }

    .prev {
      font-size: 12px;
      line-height: 22px;
      margin-left: 12px;
    }
  }

  .error-num,
  icon-Root,
  .Root-tyicon {
    color: var(---C5, #ff9f22);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .icon-zhuyizhuangtai-xianxing {
    margin-right: 2px;
  }
</style>
