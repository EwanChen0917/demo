<template>
  <div class="singlebox-wrapper">
    <div class="singlebox-boxcount">
      <span>箱子数量：{{ singleBoxTotalCount }} 箱子总重量：{{ `${singleBoxTotalWeight}kg` }}</span>
    </div>
    <el-form ref="boxDialogRef" :model="localData">
      <el-table ref="" :data="localData" max-height="400" align="center">
        <el-table-column type="index" width="50" fixed="left" label="序号" align="center" />
        <el-table-column label="图片" align="center" min-width="100">
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
        <el-table-column label="产品名称/产品SKU" align="center" min-width="150">
          <template #default="{ row }">
            <span>{{ row.productName }} / {{ row.skuCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU" prop="supplySku" align="center" min-width="150" />
        <el-table-column label="已装箱/调拨量" align="center" min-width="150">
          <template #default="{ row }">
            <component :is="boxSpan(row)" />
            <span>/{{ row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每箱商品数量"
          class-name="custom-cell"
          min-width="120"
          align="center"
        >
          <template #default="{ row, $index }">
            <div class="input-grid">
              <el-form-item
                :rules="quantityRules"
                :prop="`[${$index}]cartonList.${boxIndex}.boxNum`"
                v-for="(item, boxIndex) in row.cartonList"
              >
                <el-input
                  v-model.number="item.boxNum"
                  v-number-format="{ percision: 0 }"
                  size="small"
                  placeholder="数量"
                  style="width: 120px; margin-bottom: 10px"
                />
              </el-form-item>
            </div>
            <div class="add_count">
              <el-button type="primary" text @click="handleClickAdd(row)">
                添加其他箱子配置
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="箱子数量" class-name="custom-cell" min-width="120" align="center">
          <template #default="{ row, $index }">
            <div class="input-grid">
              <el-form-item
                v-for="(item, boxIndex) in row.cartonList"
                :rules="boxNumberRules"
                :prop="`[${$index}]cartonList.${boxIndex}.perProductBoxCount`"
              >
                <el-input
                  v-model.number="item.perProductBoxCount"
                  v-number-format="{ percision: 0 }"
                  size="small"
                  placeholder="数量"
                  style="width: 120px; margin-bottom: 10px"
                />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="箱子重量(Kg)"
          class-name="custom-cell"
          min-width="120"
          align="center"
        >
          <template #default="{ row }">
            <div class="input-grid">
              <div
                v-for="(item, boxIndex) in row.cartonList"
                :key="boxIndex"
                class="input-grid-row"
              >
                <el-input
                  v-model="item.roughWeight"
                  v-number-format="{ percision: 2 }"
                  size="small"
                  placeholder="重量"
                  style="width: 120px"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="箱子尺寸(cm)" class-name="custom-cell" min-width="180">
          <template #default="{ row }">
            <div class="input-grid">
              <div v-for="(_, index) in row.cartonList" class="input-grid-row">
                <SizeInput
                  v-model:width="row.cartonList[index].wide"
                  v-model:height="row.cartonList[index].high"
                  v-model:length="row.cartonList[index].length"
                />
                <i
                  class="iconfont icon-guanbi boxrow-delete"
                  @click="handleClickDelete(index, row)"
                ></i>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { FormItemRule, type FormRules } from 'element-plus';
  import { baseBox, boxOptions, unBoxProduct } from '../type';
  import SizeInput from './sizeInput.vue';
  import { boxNumberRules } from '../utils';
  import { useBoxForm } from '../hooks/useBoxForm';

  const emit = defineEmits(['change']);
  const { boxDialogRef, boxSpan, checkParamsValidatorCustom } = useBoxForm();
  const props = defineProps<{
    data: unBoxProduct[];
  }>();
  const statsContainer = ref(false);
  const localData = ref<unBoxProduct[]>(cloneDeep(props.data) || []);
  const boxForm = reactive<boxOptions[]>([]);
  const quantityRules: FormItemRule[] = [
    { required: true, message: '请输入每箱商品数量', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value && value !== 0) {
          callback(new Error('请输入每箱商品数量'));
        } else if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
          callback(new Error('每箱数量必须为正整数'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ];
  const handleClickAdd = (row: unBoxProduct) => {
    if (!row.cartonList || !row.cartonList.length) {
      row.cartonList = [
        {
          perProductBoxCount: 1,
          boxNum: 1,
          roughWeight: null,
          length: null,
          wide: null,
          high: null,
        },
      ];
    } else {
      row.cartonList.push({
        perProductBoxCount: 1,
        boxNum: 1,
        roughWeight: null,
        length: null,
        wide: null,
        high: null,
      });
    }
  };
  watch(
    () => props.data,
    () => {
      if (props.data && props.data.length > 0) {
        localData.value = cloneDeep(props.data);
      }
    },
    { deep: true }
  );
  /**
   * 删除指定列
   * @param index 删除的index
   * @param row 删除的row
   */
  const handleClickDelete = (index, row) => {
    if (!row.cartonList || !row.cartonList.length || index === undefined) return;
    // 使用 splice 方法删除指定索引的元素，splice 会修改原数组
    row.cartonList.splice(index, 1);
  };
  /**
   * 校验表单是否合规
   */
  const checkBoxValidator = async () => {
    try {
      return await checkParamsValidatorCustom(localData.value);
    } catch (error) {
      return {
        validatorRes: false,
        errMsg: [error instanceof Error ? error.message : String(error)],
      };
    }
  };

  /**
   * 检查表格内各项数据是否合规
   */
  const getBoxList = () => {
    let boxIndex = 0;
    if (!localData.value?.length) return { result: [] };
    // 双重遍历，将所有的商品中的所有箱子配置信息找出，并按顺序拼接成准备提交用的新数组
    const result = localData.value
      .map((e: unBoxProduct) => {
        if (e.cartonList) {
          const res = (e.cartonList as baseBox[])
            .map((i, index) => {
              const quantity = i.perProductBoxCount || 0;
              boxIndex += 1;
              return Array.from({ length: quantity }, () => ({
                boxNo: boxIndex,
                skuCode: e.skuCode,
                supplySku: e.supplySku,
                roughWeight: i.roughWeight || 0,
                length: i.length || 0,
                wide: i.wide || 0,
                high: i.high || 0,
                boxIndex: index,
                boxNum: i.boxNum || 0,
              }));
            })
            .flat();
          return res;
        }
        return [];
      })
      .flat() as boxOptions[];
    return {
      result: localData.value,
      submitData: result,
      type: 'single',
    };
  };

  /**
   * single模式下计算箱子总数
   */
  const singleBoxTotalCount = computed(() => {
    if (!localData.value || !localData.value.length) return '-';
    const count = localData.value?.reduce((acc, current) => {
      const boxCount = current.cartonList?.reduce((boxAcc, boxCurrent: any) => {
        return boxAcc + (boxCurrent.perProductBoxCount || 0);
      }, 0);
      return acc + (boxCount || 0);
    }, 0);
    return count;
  });
  /**
   * single模式下，计算箱子总重
   */
  const singleBoxTotalWeight = computed(() => {
    if (!localData.value || !localData.value.length) return '-';
    const weight = localData.value?.reduce((acc, current) => {
      const boxWeight = current.cartonList?.reduce((boxAcc: number, boxCurrent: baseBox) => {
        return boxAcc + (boxCurrent.perProductBoxCount || 0) * (boxCurrent.roughWeight || 0);
      }, 0);
      return acc + (boxWeight || 0);
    }, 0);
    return weight.toFixed(6);
  });
  onMounted(() => {
    statsContainer.value = true;
  });
  defineExpose({ checkBoxValidator, getBoxList, localData });
</script>

<style scoped lang="scss">
  .singlebox-wrapper {
    padding-top: 42px;
    position: relative;
  }
  .singlebox-boxcount {
    position: absolute;
    left: 270px;
    top: 0px;
    height: 32px;
    line-height: 32px;
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
      height: 42px;
      margin-bottom: 1.75rem;
      align-items: flex-start;
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

  .boxrow-delete {
    margin-left: 2px;
  }
</style>
