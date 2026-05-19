<template>
  <el-space class="svg-icon svg-icon-2 pe-9 mb-2 d-flex justify-content-end" :size="15">
    <el-tooltip content="撤消" effect="light" :offset="5">
      <el-link :underline="false" :disabled="historyIdx === 0" @click="prev">
        <SvgIcon icon="undo" :style="{ fill: historyIdx === 0 ? 'gray' : 'black' }" />
      </el-link>
    </el-tooltip>
    <el-tooltip content="重做" effect="light" :offset="5">
      <el-link :underline="false" :disabled="historyIdx === historyList.length - 1" @click="next">
        <SvgIcon
          icon="redo"
          :style="{ fill: historyIdx === historyList.length - 1 ? 'gray' : 'black' }"
        />
      </el-link>
    </el-tooltip>
  </el-space>
  <KeenCard
    v-for="(item, index) in itemInfoList"
    :title="index === 0 ? '订单#' + code : '拆分订单#' + index"
    :key="index"
  >
    <template #operation>
      <el-space v-if="flag && curIndex === index">
        <el-button
          @click="
            flag = false;
            tableRefs = [];
          "
        >
          取消
        </el-button>
        <el-button type="primary" @click="confirm">拆分</el-button>
      </el-space>
      <el-space v-else>
        <el-button
          type="primary"
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
          type="primary"
          @click="separateByNum(false)"
          :disabled="curIndex !== index || selectedRows.length === 0"
        >
          按数量拆分
        </el-button>
        <el-button
          type="primary"
          @click="separateByNum(true)"
          :disabled="curIndex !== index || selectedRows.length === 0"
        >
          按数量均分
        </el-button>
      </el-space>
    </template>
    <vxe-table
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
    </vxe-table>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave" v-loading="saveLoading" :disabled="flag">
        确定
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="B2BOrderNewSubOrder">
  import { erpApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const props = withDefaults(
    defineProps<{
      parent?: string;
    }>(),
    {
      parent: 'B2BOrder',
    }
  );

  const route = useRoute();
  const code = route.query.code as string;
  const itemInfoList = ref<any[]>([]);
  // 操作历史
  const historyIdx = ref(0);
  const historyList = ref([]);
  const statistics = ref({});
  const getDetailData = async () => {
    if (route.query.code) {
      const res: any = await omsApi.omsOrderQueryDetail({
        erpCode: code,
      });
      itemInfoList.value.push(res?.itemInfoList);
      historyList.value.push(cloneDeep(itemInfoList.value));
      resetStatistics();
    }
  };
  getDetailData();

  const tableRefs = ref([]);
  const selectedRows = ref([]);

  const setRef = (el) => {
    if (el) {
      tableRefs.value.push(el);
    }
  };

  const tableRowStyle = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
    if (statistics.value[`${row.warehouseCode}-${row.supplySku}`] > row.inventory) {
      return 'background-color: #ffb6c1';
    }
    console.log('statistics.value', statistics.value, row.inventory);
  };
  const curIndex = ref(0);
  const handleSelectionChange = (index) => {
    curIndex.value = index;
    tableRefs.value.forEach((item, idx) => {
      if (idx !== index) {
        item?.clearCheckboxRow();
        item?.clearCheckboxReserve();
      }
    });
    selectedRows.value = tableRefs.value[index]
      .getCheckboxRecords()
      .concat(tableRefs.value[index].getCheckboxReserveRecords());
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

  const confirm = () => {
    if (selectedRows.value?.filter((item) => !item.separateNum)?.length > 0) {
      ElMessage.warning('请先填写所有拆分数量');
      return;
    }
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
  };

  const router = useRouter();
  const saveLoading = ref(false);
  const handleSave = async () => {
    const isConfirmed = await swal.confirm('确定完成拆单?');
    if (!isConfirmed) return;

    saveLoading.value = true;
    try {
      await omsApi.omsOrderSubOrder({
        erpCode: code,
        itemInfoList: itemInfoList.value,
      });
      ElMessage.success('拆单成功');
      closeTabAndRefresh(props?.parent);
      router.push({ name: props?.parent });
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    resetTables();
    router.push({ name: props?.parent });
  };

  const resetTables = () => {
    tableRefs.value[curIndex.value]?.clearCheckboxRow();
    tableRefs.value[curIndex.value]?.clearCheckboxReserve();
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
</script>

<style scoped lang="scss"></style>
