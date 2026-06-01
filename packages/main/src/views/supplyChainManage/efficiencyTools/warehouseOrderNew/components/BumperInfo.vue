<template>
  <div>
    <KeenCard>
      <div class="d-flex justify-content-between align-center">
        <h5>提货单信息</h5>
        <div class="d-flex align-items-center justify-content-end">
          <el-tooltip content="1、数据源为谷仓订单数 2、数据实时更新" placement="top">
            <QuestionFilled class="question-icon cursor-pointer" />
          </el-tooltip>
          <el-tooltip content="刷新" placement="top">
            <i class="iconfont icon-shuaxinjiazai cursor-pointer" @click="emit('refresh')"></i>
          </el-tooltip>
        </div>
      </div>
      <vxe-table
        ref="deliveryOrderTableRef"
        auto-resize
        :data="deliveryOrderList"
        :loading="deliveryLoading"
      >
        <vxe-table-column field="attachmentName" title="附件名称" />
        <vxe-table-column field="updateTimeStr" title="更新时间" />
        <vxe-table-column title="操作">
          <template #default="{ row }">
            <el-link
              type="primary"
              :underline="false"
              @click="download(row.fileUrl, row.attachmentName)"
            >
              下载
            </el-link>
          </template>
        </vxe-table-column>
      </vxe-table>
    </KeenCard>
    <KeenCard title="装板明细">
      <vxe-table
        ref="bumperTableRef"
        auto-resize
        :data="bumperList"
        :loading="bumperLoading"
        height="420px"
      >
        <vxe-table-column type="seq" title="序号" width="50px" />
        <vxe-table-column field="palletNo" title="卡板号" />
        <vxe-table-column field="packageNoList" title="箱号" />
        <vxe-table-column field="packageQty" title="箱数量" />
        <vxe-table-column field="size" title="卡板尺寸（CM）" />
        <vxe-table-column field="weight" title="卡板重量（KG）" />
      </vxe-table>
      <KeenPagination
        :current="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-size-option="[10, 20, 50, 100]"
        :total="pagination.total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenCard>
  </div>
</template>
<script setup lang="ts" name="zbxx">
  import { ref } from 'vue';
  import { erpApi, omsApi } from '@/api';
  import { download } from '@/utils/download';

  const props = defineProps({
    orderCode: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits<{
    (event: 'refresh'): void;
  }>();
  const deliveryOrderTableRef = ref<any>(null);
  const bumperTableRef = ref<any>(null);

  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const deliveryOrderList = ref<any>([]);
  const handleCurrentChange = (val: number) => {
    pagination.value.pageNum = val;
  };
  const handlePageSizeChange = (val: number) => {
    pagination.value.pageSize = val;
  };

  // 提货信息
  const deliveryLoading = ref(false);
  const queryDeliveryOrderList = async () => {
    try {
      deliveryLoading.value = true;
      const res = await omsApi.omsWarehouseOrderQueryDeliveryOrderList({
        orderCode: props.orderCode,
      });
      deliveryOrderList.value = res?.recordList || [];
    } catch (error) {
      console.log(error);
    } finally {
      deliveryLoading.value = false;
    }
  };

  const bumperList = ref<any>([]);
  const bumperLoading = ref(false);
  const queryBumperList = async () => {
    try {
      bumperLoading.value = true;
      const res = await omsApi.omsWarehouseOrderQueryBumperList({
        orderCode: props.orderCode,
        pageNum: pagination.value.pageNum,
        pageSize: pagination.value.pageSize,
      });
      bumperList.value = res?.recordList || [];
      pagination.value.total = res?.total || 0;
    } catch (error) {
      console.log(error);
    } finally {
      bumperLoading.value = false;
    }
  };
  watch(
    () => props.orderCode,
    (orderCode) => {
      if (orderCode) {
        pagination.value.pageNum = 1;
        pagination.value.total = 0;
        queryDeliveryOrderList();
        queryBumperList();
      }
    },
    { immediate: true }
  );

  watch(
    () => [pagination.value.pageNum, pagination.value.pageSize],
    () => {
      if (props.orderCode) {
        queryBumperList();
      }
    }
  );

  defineExpose({
    queryDeliveryOrderList,
    queryBumperList,
  });
</script>
<style scoped lang="scss">
  .question-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    color: var(--bs-success);
  }
</style>
