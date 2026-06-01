<template>
  <el-drawer
    class="container"
    v-model="visible"
    size="50%"
    :modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <h4>
        自动生成箱唛
        <span class="ps-1">参考单号:</span>
        {{ listData?.refNo }}
      </h4>
    </template>
    <el-row v-if="listData" :gutter="20">
      <el-col :span="16" class="ship-to ps-6">
        <template
          v-for="item in [
            { label: '收件人', prop: 'name' },
            { label: '买家地址', prop: 'address' },
            { label: '省/州', prop: 'province' },
            { label: '买家邮编', prop: 'zipcode' },
            { label: '城市', prop: 'city' },
            { label: 'CARTONS', prop: 'cartons' },
          ]"
          :key="item.prop"
        >
          <div class="d-flex align-items-center">
            <b style="flex: 0.4; padding-right: 4px">{{ item.label }}:</b>
            <el-input style="flex: 1" v-model="listData.shipTo[item.prop]" size="small" />
          </div>
        </template>
      </el-col>
      <el-col :span="8" class="d-flex align-items-center mt-4 mb-4">
        <b style="padding-right: 6px">shipFrom:</b>
        <el-input type="textarea" size="small" v-model="listData.shipFrom" :rows="6" />
      </el-col>
    </el-row>

    <el-table
      :data="listData?.packageLineList"
      ref="tableRef"
      max-height="600"
      stripe
      v-loading="listLoading"
    >
      <el-table-column type="index" label="序号" width="40" fixed />
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
    <template #footer>
      <el-space class="mb-4">
        <el-tooltip content="上传后会根据已填写的商品编码覆盖装箱数据" raw-content placement="top">
          <el-button
            type="primary"
            @click="confirm"
            :disabled="!listData?.packageLineList?.length"
            :loading="confirmLoading"
          >
            确认上传装箱信息（覆盖）
          </el-button>
        </el-tooltip>
      </el-space>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { erpApi } from '@/api/index';
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
      const res = await erpApi.luteosErpWarehouseOrderAssemblePackageList({
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
  const confirmLoading = ref(false);
  const confirm = async () => {
    // 确认上传装箱信息逻辑、
    const isConfirmed = await swal.confirm({
      title: '确认按当前页面信息生成标签并覆盖已填写数据?',
      icon: 'success',
    });
    if (!isConfirmed) return;
    confirmLoading.value = true;
    const res = await erpApi.luteosErpWarehouseOrderShippingMarkGenerate(listData.value);
    confirmLoading.value = false;
    emit('confirmUpload', res?.result);
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .ship-to {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
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

<style lang="scss">
  .el-drawer {
    padding: 0;
    .el-drawer__header {
      margin-bottom: 0 !important;
    }
    .el-drawer__body {
      padding: 12px;
    }
    .el-drawer__footer {
      text-align: left;
    }
  }
</style>
