<template>
  <div class="allbox-wrapper">
    <el-table ref="" :data="localData">
      <el-table-column label="图片" width="100">
        <template #default="{ row }">
          <el-image
            v-if="row.productImageUrl"
            :src="row.productImageUrl"
            style="width: 50px; height: 50px"
            fit="cover"
          />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称/产品SKU">
        <template #default="{ row }">
          <span>{{ row.productName || '-' }} / {{ row.skuCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU" prop="supplySku" />
      <el-table-column label="已装箱/调拨量" align="center">
        <template #default="{ row }">
          <span>{{ row.quantity || '-' }} /{{ row.quantity || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="allbox-footer">
      <el-form-item label="箱子重量(kg)">
        <el-input style="width: 165px" v-model="form.weight" v-number-format="{ percision: 2 }" />
      </el-form-item>
      <el-form-item label="箱子尺寸(cm)">
        <SizeInput
          v-model:length="form.length"
          v-model:height="form.height"
          v-model:width="form.width"
        />
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep, template } from 'lodash-es';
  import { boxOptions, unBoxProduct } from '../type';
  import SizeInput from './sizeInput.vue';

  const props = defineProps<{
    data: unBoxProduct[];
    type: 'all';
  }>();
  const localData = ref<unBoxProduct[]>(props.data);
  const form = ref({
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
  });
  watchEffect(() => {
    if (props.data && props.data.length > 0) {
      localData.value = cloneDeep(props.data);
    }
  });
  const isInitialized = ref(true);
  // 判断是否需要恢复数据
  const restoreFromOptions = () => {
    if (!isInitialized.value) return;
    if (props.type === 'all' && props.data && props.data.length) {
      const firstBox = props.data[0]?.cartonList?.[0];
      if (firstBox) {
        form.value = {
          width: firstBox.wide || 0,
          height: firstBox.high || 0,
          length: firstBox.length || 0,
          weight: firstBox.roughWeight || 0,
        };
      }
    }
  };
  // 返回提交用的数组，数据格式已经处理好
  const getBoxList = () => {
    if (!localData.value?.length) {
      return { result: [], type: 'all' };
    }
    const boxNo = 1;
    const res = localData.value.map((product: unBoxProduct) => ({
      boxNo: 1,
      boxIndex: 1,
      skuCode: product.skuCode,
      supplySku: product.supplySku,
      // 保留产品SKU信息
      boxNum: product.quantity || 0,
      roughWeight: form.value.weight || 0,
      length: form.value.length || 0,
      wide: form.value.width || 0,
      high: form.value.height || 0,
    }));
    const allFrom = cloneDeep(localData.value);
    allFrom.forEach((e) => {
      e.cartonList = [
        {
          boxNo: 1,
          boxIndex: 1,
          boxNum: e.quantity || 0,
          skuCode: e.skuCode,
          supplySku: e.supplySku,
          roughWeight: form.value.weight || 0,
          length: form.value.length || 0,
          wide: form.value.width || 0,
          high: form.value.height || 0,
        },
      ];
    });
    return {
      result: allFrom,
      submitData: res,
      type: 'all',
    };
  };
  // 返回回显用的数组，数据格式已经处理成unboxProduct类型
  const checkBoxValidator = async () => {
    return {
      validatorRes: true,
      errMsg: [''],
    };
  };
  onMounted(() => {
    restoreFromOptions();
  });
  defineExpose({
    checkBoxValidator,
    getBoxList,
  });
</script>

<style scoped lang="scss">
  .allbox-wrapper {
    padding-top: 42px;
  }
  .input-grid {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 100%;

    &-row {
      display: flex;
      gap: 2px;
      margin-bottom: 10px;
    }
  }

  .add_count {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // 使用 :deep() 穿透 Element Plus 样式
  :deep(.custom-cell) {
    .cell {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      vertical-align: top;
    }
  }

  // 让表格行高度自适应内容
  :deep(.el-table__body-wrapper) {
    .el-table__row {
      height: auto;
      min-height: 60px; // 设置最小行高

      td {
        height: auto;
        vertical-align: top;
        padding: 8px 0; // 给单元格一些内边距
      }
    }
  }

  // 确保表格本身也适应内容
  :deep(.el-table) {
    .el-table__body {
      tr {
        height: auto;
      }
    }
  }
  .allbox-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
  }
</style>
