<template>
  <el-dialog width="80%" v-model="visible" @close="handleClose" :close-on-click-modal="false">
    <template #header>
      <el-space>
        <span class="el-dialog__title" style="font-size: 14px">编辑装箱清单</span>
      </el-space>
    </template>
    <div class="table-wrapper">
      <div style="margin-bottom: 10px; display: flex; align-items: center" class="table-select">
        <el-select
          v-model="packType"
          placeholder="选择装箱方式"
          style="width: 240px; margin-right: 10px"
          @change="handleChangePackType"
        >
          <el-option
            v-for="item in boxTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-if="packType === 'single'" class="editpack-boxcount" id="single-palace">
          <!-- <span>
            箱子数量：{{ singleBoxTotalCount }} 箱子总重量：{{ `${singleBoxTotalWeight}kg` }}
          </span> -->
        </div>
        <div v-if="packType === 'mix'">
          <el-form-item label="箱子数量：" class="editpack-boxcount">
            <el-input v-model="tempBoxCount" @blur="handleChangeBoxCount" />
          </el-form-item>
        </div>
        <div v-if="packType === 'all'" class="editpack-boxcount">
          <span>箱子数量：1</span>
        </div>
      </div>
      <div style="height: 400px">
        <component
          :is="currentComponent"
          :data="localData"
          :box-num="form.boxNum"
          :options="options"
          :type="type"
          ref="boxTable"
        />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { TransferOrderCartonBean, TransferOrderItemBean } from '@/api/oms/data-contracts';
  import { ElMessage } from 'element-plus';
  import { baseBox, boxOptions, mixRecallOptions, unBoxProduct } from '../type';
  import TableSingle from './tableSingle.vue';
  import TableMix from './tableMix.vue';
  import TableAll from './tableAll.vue';

  const props = defineProps<{
    data: TransferOrderItemBean[];
    type: 'single' | 'mix' | 'all';
    options?: mixRecallOptions;
  }>();

  const boxTable = ref<any>(null);
  const localData = ref<unBoxProduct[]>();
  const visible = ref(false);

  const emit = defineEmits(['success']);
  const packType = ref('single');
  const cartonBoxList = ref<boxOptions[]>([]);
  const boxTypeOptions = [
    { label: '每箱一个SKU (原厂包装)', value: 'single' },
    { label: '每箱不止一个SKU (混装)', value: 'mix' },
    { label: '所有商品装于一个箱子', value: 'all' },
  ];

  const form = ref({
    boxNum: 0,
  });
  const tempBoxCount = ref(0);
  /**
   * 更改装箱模式，每次都需要重置表单数据
   * @param val
   */
  const handleChangePackType = (val: any) => {
    tempBoxCount.value = 0;
    handleChangeBoxCount();
    if (localData.value) {
      localData.value.forEach((e) => {
        e.cartonList = [];
      });
    }
  };
  /**
   * mix模式下生效，更改箱子数量
   * @param val
   */
  const handleChangeBoxCount = (val?: any) => {
    // 确保 val 是数字类型
    const numVal = Number(tempBoxCount.value) || 0;
    if (packType.value !== 'mix') return;
    if (!localData.value || !localData.value.length) return;
    // 计算出指定的数量和当前配置内的数量差多少，多则新增，少则减少
    localData.value.forEach((item) => {
      const length = item.cartonList?.length || 0;
      const diff = numVal - length;
      if (diff > 0) {
        if (!item.cartonList) {
          item.cartonList = [];
        }
        for (let i = 0; i < diff; i++) {
          item.cartonList?.push({
            boxNum: null,
          });
        }
      } else if (diff < 0) {
        if (!item.cartonList) {
          item.cartonList = [];
        }
        // 修复：slice 需要赋值回去
        item.cartonList = item.cartonList.slice(0, numVal);
      } else if (numVal === 0) {
        item.cartonList = [];
      }
    });
    form.value.boxNum = numVal;
  };
  /**
   * 三种表格
   */
  const currentComponent = computed(() => {
    const map = {
      single: TableSingle,
      mix: TableMix,
      all: TableAll,
    };
    return map[packType.value];
  });
  watch(
    () => props.data,
    () => {
      if (props.data && props.data.length > 0) {
        localData.value = rebuildBoxDataByList(cloneDeep(props.data)) || [];
      }
    },
    { deep: true }
  );
  const open = () => {
    visible.value = true;
    packType.value = props.type;
  };
  /**
   * 根据后端返回的数据重建商品的箱子数组
   * @param list 后端返回的商品列表（每个商品包含 cartonList）
   * @returns 重建后的商品数据
   */
  const rebuildBoxDataByList = (list: TransferOrderItemBean[]): unBoxProduct[] | undefined => {
    if (!list || !list.length) return;
    // 直接映射，目测后端已经处理好了
    const result: unBoxProduct[] = list.map((item: TransferOrderItemBean) => {
      return {
        // 商品基本信息
        skuCode: item.skuCode,
        supplySku: item.supplySku,
        productName: item.productName,
        productImageUrl: item.productImageUrl,
        availableQuantity: item.availableQuantity,
        quantity: item.quantity,
        productWidth: item.productWidth,
        productLength: item.productLength,
        productHeight: item.productHeight,
        // ... 其他商品字段
        // 箱子列表（保留 id）
        cartonList:
          item.cartonList?.map((carton: TransferOrderCartonBean | any) => ({
            id: carton.id, // 保留箱子ID
            boxNum: carton.boxNum || 0,
            perProductBoxCount: carton.perProductBoxCount || 1,
            roughWeight: carton.roughWeight,
            length: carton.length,
            wide: carton.wide,
            high: carton.high,
          })) || [],
      };
    });
    return result;
  };
  /**
   * 确认事件，将数据组装后发给父组件
   */
  const handleConfirm = async () => {
    if (!boxTable.value) return;
    boxTable.value.getBoxList();
    const finalRes = await boxTable.value.checkBoxValidator();
    if (finalRes.validatorRes) {
      const { submitData, result, options = {}, type = 'single' } = boxTable.value.getBoxList();
      cartonBoxList.value = result;
      emit('success', {
        result,
        submitData,
        options,
        type,
      });
      handleClose();
    } else {
      ElMessage({
        type: 'warning',
        message: h(
          'div',
          finalRes.errMsg.map((t, i) => [i ? h('br') : null, t])
        ),
        duration: 5000,
      });
    }
  };
  /**
   * 关闭事件，重置所有数据
   */
  const handleClose = () => {
    localData.value = rebuildBoxDataByList(cloneDeep(props.data)) || [];
    form.value.boxNum = 0;
    packType.value = 'single';
    visible.value = false;
  };
  defineExpose({ open, handleClose });
</script>

<style scoped lang="scss">
  .table-wrapper {
    position: relative;
  }
  .table-select {
    position: absolute;
    top: 0px;
    z-index: 200;
  }
  .editpack-boxcount {
    height: 100%;
    display: flex;
    margin-bottom: 0px;
    align-items: center;
  }
</style>
