<template>
  <el-dialog v-model="visible" width="60%" title="自动生成箱唛" :close-on-click-modal="false">
    <el-space class="mb-4">
      <el-tooltip content="上传后会根据已填写的商品编码覆盖装箱数据" raw-content placement="top">
        <el-button type="primary" @click="upload" :disabled="!listData?.packageLineList?.length">
          确认上传装箱信息（覆盖）
        </el-button>
      </el-tooltip>
    </el-space>

    <el-space class="d-flex mb-4" v-if="listData" :size="22">
      <div class="flex-item">
        <h6 class="mb-1">参考单号</h6>
        <div style="line-height: 32px">{{ listData?.refNo }}</div>
      </div>
      <template
        v-for="(item, idx) in [
          { label: '收件人', prop: 'name' },
          { label: '省/州', prop: 'province' },
          { label: '城市', prop: 'city' },
          { label: '买家地址', prop: 'address' },
          { label: '买家邮编', prop: 'zipcode' },
        ]"
        :key="item.prop"
      >
        <div class="flex-item">
          <h6 class="mb-1">{{ item.label }}</h6>
          <el-input v-model="listData.shipTo[item.prop]" size="small" />
        </div>
      </template>
    </el-space>
    <el-table
      :data="listData?.packageLineList"
      ref="tableRef"
      max-height="400"
      stripe
      v-loading="listLoading"
    >
      <el-table-column type="index" label="序号" width="60" fixed="'left'" />
      <el-table-column
        v-for="col in [
          {
            prop: 'productSku',
            label: '供应链SKU',
            minWidth: '150',
          },
          {
            prop: 'customerSkuCode',
            label: '客户SKU编码',
            minWidth: '150',
          },
          {
            prop: 'productNameEn',
            label: '客户产品名称(英文)',
            minWidth: '200',
          },
          {
            prop: 'quantity',
            label: '发货数量', // 要回填到装箱信息
            minWidth: '100',
          },
          {
            prop: 'mixBox',
            label: '混箱',
            minWidth: '100',
          },
        ]"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :min-width="col.minWidth"
      >
        <template #default="{ row, $index }">
          <div style="display: flex; margin-bottom: 8px">
            <template v-if="col.prop === 'mixBox'">
              <el-select v-model="row['mixBox']" placeholder="请选择" style="width: 120px">
                <el-option label="N" value="N" />
                <el-option label="Y" value="Y" />
              </el-select>
            </template>
            <div v-else>
              <el-input
                :key="$index"
                v-model="row[col.prop]"
                :placeholder="`${col.label}`"
                :type="col.prop === 'quantity' ? 'number' : 'text'"
              />
              <span v-show="col.prop === 'productSku'" class="tip">
                {{ !row.qtyBox ? '该商品暂未拆箱' : '' }}
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80" fixed="right">
        <template #default="{ $index }">
          <KeenActions
            :actions="[
              {
                label: '插入',
                key: 'insert',
                type: 'primary',
                index: $index,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'error',
                index: $index,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { erpApi, omsApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const emit = defineEmits<{
    (event: 'confirmUpload', data: any): void;
  }>();
  const route = useRoute();
  const listData = ref();
  const listLoading = ref(false);
  const visible = ref(false);
  const tableRef = ref();
  const saleCode = ref(''); // 销售订单号

  const getData = async () => {
    listLoading.value = true;
    try {
      const res = await omsApi.omsWarehouseOrderAssemblePackageList({
        code: route.query.code,
      });
      if (res?.packageLineList?.length) {
        res.packageLineList.forEach((item) => {
          if (!item.mixBox) {
            item.mixBox = 'N';
          }
        });
      }
      listData.value = res || [];
    } catch (error) {
      listData.value = [];
    } finally {
      listLoading.value = false;
    }
  };

  const open = (param) => {
    visible.value = true;
    saleCode.value = param;
    getData();
  };

  const handleActions = (action) => {
    const { key, index } = action;

    switch (key) {
      case 'insert':
        // 表格数据在当前index后新增一条空数据
        listData.value.packageLineList.splice(index + 1, 0, {
          productSku: '', // 供应链SKU
          customerSkuCode: '', // 客户SKU编码
          productName: '',
          productNameEn: '', // 客户产品名称(英文)
          quantity: 0, // 发货数量
          mixBox: 'N',
        });
        tableRef.value?.scrollTo({ row: index + 1 });
        break;
      case 'delete':
        listData.value.packageLineList.splice(index, 1);
        break;

      default:
        break;
    }
  };
  const upload = async () => {
    // 确认上传装箱信息逻辑、
    const isConfirmed = await swal.confirm({
      title: '确认按当前页面信息生成标签并覆盖已填写数据?',
      icon: 'success',
    });
    if (!isConfirmed) return;
    const res = await omsApi.omsWarehouseOrderShippingMarkGenerate(listData.value);
    emit('confirmUpload', res?.result);
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .el-dialog {
    .el-dialog__header {
      display: flex;
      justify-content: center;
    }
    .box-mark {
      width: 30%;
    }
  }
  .d-flex {
    padding-left: 12px;
    // :deep(.el-space__item) {
    //   flex: 1;
    // }
    h6 {
      line-height: 22px;
      font-size: 12px;
      color: var(--el-table-text-color);
    }
  }
  .actions-box {
    .action-btns {
      height: 32px;
    }
  }
  .tip {
    position: absolute;
    bottom: -2px;
    left: 12px;
    color: #ff8d3d;
    font-size: 12px;
  }
</style>
