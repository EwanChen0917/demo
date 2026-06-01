<template>
  <div class="mixbox-wrapper">
    <el-form ref="boxDialogRef" :model="formModel">
      <el-table ref="tableRef" :data="displayColumns">
        <el-table-column width="50" fixed="left" label="序号" align="center">
          <template #default="{ row, $index }">
            <span v-if="row._rowType !== 'fake'">{{ $index + 1 }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="100">
          <template #default="{ row }">
            <template v-if="row._rowType === 'data'">
              <el-image
                v-if="row.productImageUrl"
                :src="row.productImageUrl"
                style="width: 50px; height: 50px"
                fit="cover"
              />
              <span v-else>-</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="产品名称/产品SKU" prop="productName" min-width="150">
          <template #default="{ row }">
            <template v-if="row._rowType === 'data'">
              <span>{{ row.productName }} / {{ row.skuCode }}</span>
            </template>
            <template v-else-if="row._rowType === 'fake'"></template>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU" prop="supplySku" min-width="150">
          <template #default="{ row }">
            <template v-if="row._rowType === 'data'">
              <span>{{ row.supplySku }}</span>
            </template>
            <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-weight'">
              <div class="d-flex custrom-comment">
                <span>箱子重量(KG):</span>
              </div>
            </template>
            <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-spec'">
              <div class="d-flex custrom-comment boxsize-comment">
                <span>箱子尺寸(CM):</span>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="已装箱/调拨量" min-width="180">
          <template #default="{ row }">
            <template v-if="row._rowType === 'data'">
              <component :is="boxSpan(row)" />
              <span>/{{ row.quantity }}</span>
            </template>
            <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-weight'">
              <div>
                <span>
                  {{ `总重量: ${(totalWeight || 0).toFixed(2)} kg` }}
                </span>
              </div>
            </template>
            <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-spec'">
              <div class="d-flex flex-column justify-content-center">
                <div
                  v-for="(template, index) in sizeTemplates"
                  :key="template.id"
                  class="d-flex custrom-box-cell"
                >
                  <SizeInput
                    v-model:length="template.length"
                    v-model:width="template.width"
                    v-model:height="template.height"
                  />
                </div>
                <el-button
                  text
                  @click="addSizeTemplate"
                  style="width: 90px; height: 40px"
                  type="primary"
                >
                  添加箱子尺寸
                </el-button>
              </div>
            </template>
          </template>
        </el-table-column>
        <template v-if="boxes.length > 0">
          <el-table-column
            v-for="(box, index) in boxes"
            :key="box.index"
            :label="`箱子${index + 1}`"
            min-width="150"
          >
            <template #default="{ row, $index }">
              <template v-if="row._rowType === 'data'">
                <el-form-item>
                  <el-input
                    v-model="row.cartonList[box.index].boxNum"
                    @change="handleQuantityChange()"
                    size="small"
                    v-number-format="{ percision: 0 }"
                    placeholder="每箱商品数量"
                    style="width: 120px"
                  />
                </el-form-item>
              </template>
              <!-- 箱子重量-->
              <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-weight'">
                <el-form-item>
                  <el-input
                    v-model="box.weight"
                    size="small"
                    placeholder="重量"
                    v-number-format="{ percision: 2 }"
                    @change="handleWeightChange(box.index)"
                    style="width: 120px; margin-bottom: 10px"
                  />
                </el-form-item>
              </template>
              <!-- 箱子尺寸选择器-->
              <template v-else-if="row._rowType === 'fake' && row._rowIndex === 'fake-spec'">
                <el-form-item :prop="`boxes.${box.index}.selectedSizeTemplateId`">
                  <div class="d-flex flex-column">
                    <el-radio-group
                      class="d-flex flex-column align-items-start"
                      v-model="box.selectedSizeTemplateId"
                      @change="handleSizeSelect(box.index)"
                    >
                      <el-radio
                        v-for="template in sizeTemplates"
                        :key="template.id"
                        :value="template.id"
                        class="custrom-box-cell"
                      >
                        {{ `箱子${index + 1}` }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  /**
   * 本文件内3个数组，
   * 分别是外部传来的localdata，这个是放到table里做显示用的,最终数据也会回填到它上
   * sizeTemplates,盒子的配置信息，用于循环
   * boxes，盒子的映射数组。最终将把数据回填到localdata里，这里是一层中专用，不然不好同步
   *
   */
  import { cloneDeep } from 'lodash-es';
  import { ElInput } from 'element-plus';
  import {
    mixBoxRecallOptions,
    mixRecallOptions,
    mixTemplateRecallOptions,
    unBoxProduct,
  } from '../type';
  import SizeInput from './sizeInput.vue';
  import { useBoxForm } from '../hooks/useBoxForm';
  //= ==========父子交互定义============
  const props = defineProps<{
    data: unBoxProduct[];
    boxNum: number;
    options?: mixRecallOptions;
  }>();
  //= ==========数据定义============

  // 箱子尺寸的列表,用于存储箱子尺寸的模板
  const sizeTemplates = ref<mixTemplateRecallOptions[]>([]);
  const localData = ref<unBoxProduct[]>(cloneDeep(props.data));
  const tableRef = ref();
  const boxes = ref<mixBoxRecallOptions[]>([]);
  const { boxDialogRef, boxValidator, boxSpan, completelyBox, checkParamsValidatorCustom } =
    useBoxForm();
  const isInitialized = ref(false);
  const formModel = reactive({
    products: localData,
    boxes,
  });

  //= ==========初始化逻辑============
  /**
   * 初始化箱子状态
   * @param count
   */
  const initializeBoxes = (count: number) => {
    boxes.value = Array.from({ length: count }, (_, index) => ({
      index,
      weight: null,
      selectedSizeTemplateId: null,
    }));
  };
  /**
   * 根据箱子来初始化商品的箱子选项
   */
  const initializeProductBoxOptions = () => {
    localData.value.forEach((product) => {
      if (!product.cartonList || product.cartonList.length !== boxes.value.length) {
        product.cartonList = Array.from({ length: boxes.value.length }, () => ({
          boxNum: null,
          roughWeight: null,
          length: null,
          wide: null,
          high: null,
        }));
      }
    });
  };
  //= ==========箱子计算属性============
  /**
   * 额外表格列，加入了两列虚假列用来显示其他内容
   */
  const displayColumns = computed(() => {
    return [
      ...localData.value.map((row) => ({ ...row, _rowType: 'data' })),
      { _rowType: 'fake', _rowIndex: 'fake-weight', ...localData.value[0] },
      { _rowType: 'fake', _rowIndex: 'fake-spec', ...localData.value[0] },
    ];
  });
  /**
   * 拼装好的临时数组，储存箱子的一切信息，包括选中的尺寸。重量以及数量
   */
  const boxesWithSize = computed(() => {
    return boxes.value.map((box) => ({
      ...box,
      size: box.selectedSizeTemplateId
        ? sizeTemplates.value.find((e) => e.id === box.selectedSizeTemplateId) || null
        : null,
    }));
  });
  /**
   * 计算已装箱数量
   */
  const calculateBoxedQuantity = (row: unBoxProduct) => {
    if (!row.cartonList || row.cartonList.length === 0) {
      return 0;
    }
    return row.cartonList.reduce((sum, box) => {
      return sum + (Number(box.boxNum) || 0);
    }, 0);
  };
  /**
   * 计算总重量
   */
  const totalWeight = computed(() => {
    if (!boxesWithSize.value || !boxesWithSize.value.length) {
      return 0;
    }
    return boxesWithSize.value.reduce((sum, box) => {
      return sum + (Number(box.weight) || 0);
    }, 0);
  });
  //= ==========页面事件触发============
  /**
   * 底部推入箱子模板
   */
  const addSizeTemplate = () => {
    const newId = `templateId-${Date.now()}`;
    sizeTemplates.value.push({
      id: newId,
      name: '',
      length: 0,
      width: 0,
      height: 0,
    });
  };
  /**
   * 箱子列选中尺寸事件
   * @param index 选中的箱子index
   */
  const handleSizeSelect = (index: number) => {
    syncBoxToProduct(index);
  };
  /**
   * 重量输入事件
   * @param index
   */
  const handleWeightChange = (index: number) => {
    syncBoxToProduct(index);
  };
  /**
   * 数量变化事件
   */
  const handleQuantityChange = () => {};
  //= ==========同步器============
  /**
   * 将其他数组的数据同步到指定的产品列
   * @param boxIndex 箱子索引，注意这里的索引其实是通用，此处的索引是针对boxesWithSize和cartonList的索引
   */
  const syncBoxToProduct = (boxIndex: number) => {
    const box = boxesWithSize.value[boxIndex];
    localData.value.forEach((product: unBoxProduct) => {
      if (!product.cartonList || !product.cartonList[boxIndex]) return;
      const boxOptions = product.cartonList[boxIndex];
      boxOptions.roughWeight = box.weight;
      if (box.size) {
        boxOptions.length = box.size.length;
        boxOptions.wide = box.size.width;
        boxOptions.high = box.size.height;
      } else {
        boxOptions.length = null;
        boxOptions.wide = null;
        boxOptions.high = null;
      }
    });
  };
  //= ==========回填相关============
  /**
   * 从options中恢复箱子信息
   */
  const restoreFromOptions = () => {
    if (!props.options) return;
    // 1. 先恢复尺寸模板
    if (props.options.templateBox?.length) {
      sizeTemplates.value = cloneDeep(props.options.templateBox);
    }
    // 2. 再恢复 boxes（不要在这里同步，等 cartonList 初始化后再同步）
    if (props.options.box?.length) {
      boxes.value = cloneDeep(props.options.box);
    }
    // 注意：不在这里调用 syncAllBoxToProducts，
    // 因为此时 cartonList 可能还没初始化
  };

  //= ==========监听器============
  /**
   * 监听箱子数量变化
   */
  watch(
    () => props.boxNum,
    (newCount: number) => {
      const count = Number(newCount) || 0;
      if (count > 0) {
        initializeBoxes(count);
        initializeProductBoxOptions();
      }
    },
    { immediate: true }
  );
  /**
   * 监听prop.data变化
   */
  watch(
    [() => props.data, () => props.options], // 同时监听两个
    ([newData, newOptions]) => {
      if (!newData || !newData.length) return;
      localData.value = cloneDeep(newData);
      if (newOptions && !isInitialized.value) {
        // 有配置：先恢复 boxes 和 templates，再初始化 cartonList
        restoreFromOptions();
        isInitialized.value = true;
        // 恢复后需要重新初始化商品的 cartonList
        nextTick(() => {
          initializeProductBoxOptions();
        });
      } else if (!isInitialized.value) {
        // 无配置：正常初始化
        initializeProductBoxOptions();
        isInitialized.value = true;
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  watch(
    () => sizeTemplates.value,
    () => {
      syncBoxToProduct(0);
    },
    { deep: true }
  );
  //= ==========校验相关============
  /**
   * 生成提交用的箱子数组
   */
  const getBoxList = () => {
    let boxIndex = 1;
    // 外层遍历箱子（纵轴）
    const result = boxes.value.flatMap((box) => {
      const currentBoxNo = boxIndex++; // 箱子维度递增
      // 内层遍历商品（横轴）
      return localData.value.map((product: unBoxProduct) => {
        const boxOption = product.cartonList?.[box.index];
        return {
          boxNo: currentBoxNo, // 全局箱子序号
          boxIndex: box.index || 0, // 箱子在数组中的索引
          skuCode: product.skuCode, // 商品信息
          supplySku: product.supplySku,
          // 箱子级别的信息（同一个箱子，所有商品共享）
          roughWeight: box.weight || 0,
          length: boxOption?.length || 0,
          wide: boxOption?.wide || 0,
          high: boxOption?.high || 0,
          // 商品在该箱中的数量（每个商品不同）
          boxNum: boxOption?.boxNum || 0,
        };
      });
    });
    return {
      result: localData.value,
      submitData: result,
      type: 'mix',
      options: {
        box: boxes.value,
        templateBox: sizeTemplates.value,
      },
    };
  };
  /**
   * 父组件校验子组件用
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

  defineExpose({
    checkBoxValidator,
    getBoxList,
  });
  onMounted(() => {});
</script>

<style scoped lang="scss">
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

  // 汇总行样式 - 与主表格保持一致
  :deep(.el-table__footer) {
    .el-table__cell {
      padding: 12px 0 !important;
      text-align: center;
      vertical-align: middle;

      .cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
      }
    }
  }
  :deep(.sizeinput-left) {
    .el-input__wrapper {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  :deep(.sizeinput-center) {
    .el-input__wrapper {
      border-radius: 0;
    }
  }

  :deep(.sizeinput-right) {
    .el-input__wrapper {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .custrom-box-cell {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .custrom-comment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    margin-right: 20px;
  }
  .boxsize-comment {
    height: 32px;
  }
  .mixbox-wrapper {
    padding-top: 42px;
  }
</style>
