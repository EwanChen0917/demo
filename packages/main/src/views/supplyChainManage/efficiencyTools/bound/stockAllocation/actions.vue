<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    :rules="formRules"
    ref="formRef"
    label-position="top"
  >
    <KeenCard title="基础信息">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="仓库" prop="inventoryAllot.warehouseCode">
            <el-select
              style="width: 100%"
              v-model="form.inventoryAllot.warehouseCode"
              placeholder="请选择仓库"
              filterable
              clearable
            >
              <el-option
                v-for="person of warehouseMap"
                :key="person.warehouseCode"
                :label="person.warehouseName"
                :value="person.warehouseCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="调出分配池" prop="inventoryAllot.outPoolCode">
            <el-select
              :disabled="disabledPoolChoosen"
              style="width: 100%"
              v-model="form.inventoryAllot.outPoolCode"
              placeholder="请选择调出分配池"
              filterable
              clearable
              :teleported="false"
              @change="handleChangeOut"
            >
              <el-option
                v-for="person of poolMapByWareHouse"
                :key="person.poolCode"
                :label="`${person.poolName}-${person.poolCode}`"
                :value="person.poolCode"
                :disabled="person.poolCode === form.inventoryAllot.inPoolCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="调入分配池" prop="inventoryAllot.inPoolCode">
            <el-select
              style="width: 100%"
              v-model="form.inventoryAllot.inPoolCode"
              placeholder="请选择调入分配池"
              filterable
              @change="handleChangeIn"
              clearable
              :teleported="false"
              :disabled="disabledPoolChoosen"
            >
              <el-option
                v-for="person of poolMapByWareHouse"
                :key="person.poolCode"
                :label="`${person.poolName}-${person.poolCode}`"
                :value="person.poolCode"
                :disabled="person.poolCode === form.inventoryAllot.outPoolCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="备注">
            <el-input
              v-model.number="form.inventoryAllot.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <p>
        <el-button
          type="primary"
          size="default"
          :disabled="!isAddProductEnabled"
          @click="addProduct"
        >
          添加产品
        </el-button>
      </p>
      <vxe-table empty-text="暂未添加产品" :data="form.itemList" min-height="80px">
        <vxe-table-column type="seq" title="序号" width="80px" align="center" />
        <vxe-table-column field="productName" title="产品名称/供应链SKU" min-width="200px">
          <template #default="{ row }">
            <div style="line-height: 1.5">
              <div style="font-weight: 600; color: #303133; margin-bottom: 4px">
                {{ row.productName }}
              </div>
              <div
                style="font-size: 12px; color: #909399; font-family: Consolas, Monaco, monospace"
              >
                供应链SKU: {{ row.supplySku }}
              </div>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="skuCode" title="产品SKU" />
        <vxe-table-column field="availableQuantity" title="良品可用量" min-width="100px">
          <template #default="{ row }">
            <span>{{ row.availableQuantity || 0 }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="outboundDefectiveQuantity" title="分配数量" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0">
              <NumberInput
                v-model="row.allotQty"
                :min="0"
                :max="mode === 'add' ? row.availableQuantity || 0 : Infinity"
                :precision="0"
                placeholder="请输入"
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="remark" title="备注" min-width="180px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0" :prop="`itemList.${$rowIndex}.remark`">
              <el-input
                v-model="row.remark"
                type="textarea"
                :rows="2"
                placeholder="请输入备注"
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="" title="操作" fixed="right" width="80px">
          <template #default="{ $rowIndex }">
            <el-button type="danger" link @click="form.itemList.splice($rowIndex, 1)">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="mode !== 'detail'">
    <el-space>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
  <skuDialog
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :selectedRows="form.itemList"
    @close="handleBindGoodsClose"
    :warehouseCode="form.inventoryAllot.warehouseCode"
    :poolCode="form.inventoryAllot.outPoolCode"
    :warehouseMapName="warehouseMapName"
    :poolCodeName="form.inventoryAllot.outPoolName"
    confirmText="确认"
  />
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import NumberInput from '@/components/NumberInput/index.vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  import { InventoryAllotAddReq } from '@/api/oms/data-contracts';
  import { poolStatus, useOmsBase } from '../hooks/useOmsBase';
  import {
    baseAddStockAllocationInfoType,
    baseEditItemStockAllocation,
    baseSkuInventoryType,
  } from '../type';
  import skuDialog from '../components/skuDialog.vue';

  const {
    warehouseMap,
    dickBook,
    poolMap,
    getPoolMap,
    poolMapByWareHouse,
    getPoolMapByWareHouse,
    getWarehouseMap,
  } = useOmsBase();
  const { closeTabAndRefresh } = useTabs();

  /**
   * 创建 poolCode -> poolName 的索引 Map
   */
  const poolMapIndex = computed(() => {
    const map = new Map<string, string>();
    poolMap.value?.forEach((item) => {
      map.set(item.poolCode, item.poolName);
    });
    return map;
  });
  const warehouseMapIndex = computed(() => {
    const map = new Map<string, string>();
    warehouseMap.value?.forEach((item) => {
      map.set(item.warehouseCode, item.warehouseName);
    });
    return map;
  });
  const warehouseMapName = computed(() => {
    const warehouseCode = form.value.inventoryAllot.warehouseCode || '';
    return warehouseCode ? warehouseMapIndex.value.get(warehouseCode) || '' : '';
  });
  const disabledPoolChoosen = computed(() => {
    return !form.value.inventoryAllot.warehouseCode || getPoolLoading.value;
  });
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const router = useRouter();
  const route = useRoute();
  const formRef = ref();
  const form = ref<baseAddStockAllocationInfoType>({
    inventoryAllot: {
      inPoolCode: '',
      inPoolName: '',
      outPoolCode: '',
      outPoolName: '',
      remark: '',
      warehouseCode: '',
    },
    itemList: [],
  });
  const getPoolLoading = ref(false);
  const formRules = ref({
    'inventoryAllot.warehouseCode': [{ required: true, message: '请选择仓库', trigger: 'change' }],
    'inventoryAllot.inPoolCode': [
      { required: true, message: '请选择调入分配池', trigger: 'change' },
    ],
    'inventoryAllot.outPoolCode': [
      { required: true, message: '请选择调出分配池', trigger: 'change' },
    ],
  });

  /**
   * 控制添加产品按钮的禁用状态
   * 只有当选取了商品和调出分配池，才允许添加产品
   * @returns {boolean} true-可点击 false-禁用
   */
  const isAddProductEnabled = computed(() => {
    // 校验仓库字段是否已填写
    const hasWarehouse =
      !!form.value.inventoryAllot.warehouseCode && !!form.value.inventoryAllot.outPoolCode;
    return hasWarehouse;
  });
  watch(
    () => [
      form.value.inventoryAllot.warehouseCode,
      form.value.inventoryAllot.inPoolCode,
      form.value.inventoryAllot.outPoolCode,
    ],
    (newValues, oldValues) => {
      // 判断是否有字段发生变化(排除初始化的情况)
      if (props.mode !== 'add') return;
      const hasChanged = newValues.some((newVal, index) => {
        return oldValues[index] !== undefined && newVal !== oldValues[index];
      });
      if (hasChanged && form.value.itemList.length > 0) {
        ElMessage.warning('检测到仓库或分配池变更,已清空产品列表');
        form.value.itemList = [];
      }
    }
  );
  watch(
    () => form.value.inventoryAllot.warehouseCode,
    async (newV, oldV) => {
      try {
        if (newV && newV !== oldV) {
          if (props.mode === 'add') {
            form.value.inventoryAllot.outPoolCode = '';
          }

          getPoolLoading.value = true;
          getPoolMapByWareHouse({
            warehouseCode: newV,
            status: 1,
          });
          console.log(`执行了一次`);
        }
      } catch (e) {
      } finally {
        getPoolLoading.value = false;
      }
    }
  );
  /**
   * 校验规则：
   * 1. 每行产品都至少有一个分配数量
   * 2. 分配数量不能超过可用库存
   *
   * @returns {boolean} 校验是否通过
   */
  const validateSubmitData = (): boolean => {
    const { itemList } = form.value;
    const invalidItems: string[] = [];

    itemList.forEach((item: baseEditItemStockAllocation, index: number) => {
      const goodQty = item.allotQty || 0;
      // 检查是否至少有一个分配数量大于0
      if (goodQty <= 0) {
        invalidItems.push(`（序号${index + 1}）产品需填写至少一个分配量`);
      }
      // 校验分配数量不超过可用库存
      if (goodQty > (Number(item.allotQty) || 0)) {
        invalidItems.push(
          `${item.productName || item.skuCode}（序号${index + 1}）分配数量超过可用库存`
        );
      }
    });

    // 3. 如果有不符合规则的数据，给出详细提示
    if (invalidItems.length > 0) {
      ElMessage.error({
        message: `数据校验失败：\n${invalidItems.join('\n')}`,
        duration: 5000,
        dangerouslyUseHTMLString: false,
      });
      return false;
    }

    return true;
  };
  const saveLoading = ref(false);
  const save = async () => {
    try {
      // 校验表单必填项
      const valid = await formRef.value?.validate();
      if (!valid) {
        ElMessage.warning('请完善必填信息');
        return;
      }
      // 校验产品列表
      if (!form.value.itemList || form.value.itemList.length === 0) {
        ElMessage.warning('请添加产品');
        return;
      }
      if (!validateSubmitData()) {
        return;
      }
      // 第四步：提交数据
      saveLoading.value = true;
      const submitData = cloneDeep(form.value);
      console.log(`submitData`, submitData);
      submitData.itemList = submitData?.itemList?.map((e) => {
        return {
          allotQty: e.allotQty,
          availableQty: e.availableQuantity,
          remark: e.remark,
          skuCode: e.skuCode,
          supplySku: e.supplySku,
        };
      });
      console.log(`submitData`, submitData);
      await omsApi.omsInventoryAllotSubmit(submitData as InventoryAllotAddReq);
      ElMessage.success('操作成功');
      if (props.mode === 'add') {
        closeTabAndRefresh('stockAllocationOrderAdd');
      } else {
        closeTabAndRefresh('stockAllocationOrderDetail');
      }
      router.push({ name: 'stockAllocationOrder' });
    } catch (error) {
      console.error('保存失败:', error);
      ElMessage.error('保存失败，请检查表单信息');
    } finally {
      saveLoading.value = false;
    }
  };
  const bindGoodsVisible = ref(false);
  const addProduct = async () => {
    bindGoodsVisible.value = true;
  };
  /**
   * 处理调入分配池变更
   * 使用索引 Map 实现 O(1) 查找，同步更新对应的 poolName
   */
  const handleChangeIn = (poolCode: string) => {
    form.value.inventoryAllot.inPoolName = poolCode ? poolMapIndex.value.get(poolCode) || '' : '';
  };

  /**
   * 处理调出分配池变更
   * 使用索引 Map 实现 O(1) 查找，同步更新对应的 poolName
   */
  const handleChangeOut = (poolCode: string) => {
    form.value.inventoryAllot.outPoolName = poolCode ? poolMapIndex.value.get(poolCode) || '' : '';
  };

  /**
   * 处理产品选择弹窗关闭事件
   * 将选中的 baseSkuStockType 转换为 baseAddOutboundType 格式并更新到表单
   * @param reload - 是否确认选择
   * @param val - 选中的 SKU 列表（baseSkuStockType[]）
   */
  const handleBindGoodsClose = async (reload: boolean, val?: baseSkuInventoryType[]) => {
    // 用户点击取消，直接关闭弹窗
    if (!reload) {
      bindGoodsVisible.value = false;
      return;
    }
    // 用户点击确认
    if (reload) {
      // 如果传入空数组，清空产品列表
      if (!val || val.length === 0) {
        form.value.itemList = [];
        ElMessage.success('已清空产品列表');
        bindGoodsVisible.value = false;
        return;
      }
      // 以对话框选中的列表为准，转换数据格式
      const oldList = form.value.itemList as baseEditItemStockAllocation[];
      const newList: baseEditItemStockAllocation[] = [];
      val.forEach((item: baseSkuInventoryType) => {
        // 查找是否已存在相同的 SKU（保留用户已填写的数据）
        const existingItem = oldList.find((old) => old.supplySku === item.supplySku);
        // 转换数据格式
        const convertedItem: baseEditItemStockAllocation = {
          skuCode: item.skuCode ? item.skuCode : '',
          supplySku: item.supplySku ? item.supplySku : '',
          availableQuantity: item.availableInventory || item.availableQuantity || 0,
          // 如果已存在则保留原值，否则初始化为 0
          allotQty: existingItem?.allotQty || undefined,
          remark: existingItem?.remark || '',
          productName: item.productTitle || item.skuCode,
        };
        newList.push(convertedItem);
      });
      // 直接替换为新列表（以对话框选中的为准）
      form.value.itemList = newList;
      ElMessage.success(`已更新产品列表，当前共 ${newList.length} 个产品`);
    }
    // 关闭弹窗
    bindGoodsVisible.value = false;
  };
  // 初始化数据,detail模式下
  const getDetail = async () => {
    try {
      const res = await omsApi.omsInventoryAllotQueryDetail({
        allotCoe: (route.query.code as any) || 0,
      });
      form.value = cloneDeep(res as baseAddStockAllocationInfoType);
      form.value.itemList.forEach((element) => {
        element.availableQuantity = element.availableQty;
      });
    } catch (e) {}
  };
  onMounted(() => {
    if (props.mode === 'detail') {
      getDetail();
    }
    getWarehouseMap('ALL');
    getPoolMap(poolStatus.enable);
  });
</script>

<style scoped lang="scss">
  .form-table-item {
    &.el-form-item {
      margin: 0 0 6px 0;
    }

    :deep(.el-form-item__error) {
      display: none;
    }

    :deep(.el-form-item__content) {
      margin: 0 !important;
    }
  }

  :deep(.vxe-table .vxe-table--body-wrapper .multi) {
    vertical-align: top;
    line-height: 44px;

    .el-form-item__error {
      display: none;
    }
  }

  .cell-container {
    min-height: 44px;
    line-height: 44px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
