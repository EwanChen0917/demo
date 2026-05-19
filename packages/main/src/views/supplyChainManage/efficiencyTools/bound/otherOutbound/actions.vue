<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    :rules="formRules"
    ref="formRef"
    label-position="top"
  >
    <KeenCard title="出库信息">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <el-form-item label="仓库" prop="warehouseCode">
            <el-select
              style="width: 100%"
              v-model="form.warehouseCode"
              placeholder="请选择仓库"
              filterable
              clearable
              @clear="handleClear"
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
        <el-col :span="6" :offset="0">
          <el-form-item label="操作类型" prop="operationType">
            <el-select
              style="width: 100%"
              v-model="form.operationType"
              placeholder="请选择操作类型"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="person of dickBook.oms_other_out_bound_operation_type"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="出库方式">
            <el-select disabled style="width: 100%" v-model="form.outboundMethod" filterable>
              <el-option
                v-for="person of dickBook.oms_other_out_bound_outbound_method"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="创建人">
            <el-select disabled style="width: 100%" v-model="form.createBy" filterable>
              <el-option
                v-for="person of memberList"
                :key="person.memberCode"
                :label="person.name"
                :value="person.memberCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="库存类型" prop="inventoryType">
            <el-select
              style="width: 100%"
              v-model="form.inventoryType"
              placeholder="请选择库存类型"
              filterable
              clearable
            >
              <el-option
                v-for="person of dickBook.oms_other_out_bound_inventory_type"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row />
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
      <vxe-table
        empty-text="暂未添加产品"
        :data="form.itemList"
        min-height="80px"
        :cell-style="{ verticalAlign: 'top' }"
        show-footer
        :footer-data="footerData"
      >
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
        <vxe-table-column field="skuCode" title="产品SKU" min-width="100px" />
        <vxe-table-column field="goodQuantity" title="可用良品量" min-width="100px">
          <template #default="{ row }">
            <span>{{ row.goodQuantity || 0 }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="unsellableQuantity" title="可用次品量" min-width="100px">
          <template #default="{ row }">
            <span>{{ row.unsellableQuantity || 0 }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="outboundGoodQuantity" title="出库良品量" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0">
              <NumberInput
                v-model="row.outboundGoodQuantity"
                :min="0"
                :disabled="allowGoodEdit"
                :max="mode === 'add' ? row.goodQuantity || 0 : Infinity"
                :precision="0"
                placeholder="请输入"
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="outboundDefectiveQuantity" title="出库次品量" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0">
              <NumberInput
                v-model="row.outboundDefectiveQuantity"
                :min="0"
                :disabled="allowBadEdit"
                :max="mode === 'add' ? row.unsellableQuantity || 0 : Infinity"
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
                placeholder="请输入备注"
                maxlength="200"
                type="textarea"
                :rows="2"
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
  <AddProductDialog
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :selectedRows="form.itemList"
    @close="handleBindGoodsClose"
    :warehouseCode="form.warehouseCode"
  />
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import NumberInput from '@/components/NumberInput/index.vue';
  import { useTabs } from '@/hooks/tabs';
  import { useStore } from '@/store/modules/useStore';
  import { cloneDeep } from 'lodash-es';
  import { h } from 'vue';
  import { baseAddOutboundType, baseSkuStockType } from '../type';
  import { useOmsBase } from '../hooks/useOmsBase';
  import AddProductDialog from '../components/addProductDialog.vue';

  const { warehouseMap, dickBook, memberList, initMember, getWarehouseMap } = useOmsBase();
  const { closeTabAndRefresh } = useTabs();
  const { userInfo } = useStore();
  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const router = useRouter();
  const route = useRoute();
  const formRef = ref();
  const form: any = ref({
    itemList: [],
    createBy: props.mode === 'add' ? userInfo.memberCode : undefined,
    inventoryType: null,
    operationType: '',
    outboundMethod: 'FIFO',
    remark: '',
    warehouseCode: '',
  });

  const formRules = ref({
    warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
    operationType: [{ required: true, message: '请选择操作类型', trigger: 'change' }],
    inventoryType: [{ required: true, message: '请选择库存类型', trigger: 'change' }],
  });
  const userMap = computed(() => {
    return [
      {
        label: userInfo.name,
        value: userInfo.memberCode,
      },
    ];
  });

  /**
   * 控制添加产品按钮的禁用状态
   * 只有当出库信息中的仓库字段填写后，才允许添加产品
   * @returns {boolean} true-可点击 false-禁用
   */
  const isAddProductEnabled = computed(() => {
    // 校验仓库字段是否已填写
    const hasWarehouse = !!form.value.warehouseCode;
    return hasWarehouse;
  });
  /**
   * 控制良品量输入框的禁用状态
   * 当库存类型为'次品出库'(bad)时，禁用良品量输入
   */
  const allowGoodEdit = computed(() => {
    return form.value.inventoryType === 'bad';
  });

  /**
   * 控制次品量输入框的禁用状态
   * 当库存类型为'良品出库'(normal)时，禁用次品量输入
   */
  const allowBadEdit = computed(() => {
    return form.value.inventoryType === 'normal';
  });
  const footerData = computed(() => {
    const itemList = form.value.itemList || [];

    // 计算各列总和
    const totalGoodQuantity = itemList.reduce(
      (sum, item) => sum + (Number(item.goodQuantity) || 0),
      0
    );
    const totalUnsellableQuantity = itemList.reduce(
      (sum, item) => sum + (Number(item.unsellableQuantity) || 0),
      0
    );
    const totalOutboundGoodQuantity = itemList.reduce(
      (sum, item) => sum + (Number(item.outboundGoodQuantity) || 0),
      0
    );
    const totalOutboundDefectiveQuantity = itemList.reduce(
      (sum, item) => sum + (Number(item.outboundDefectiveQuantity) || 0),
      0
    );

    return [
      {
        skuCode: '合计', // 在产品名称列显示"合计"
        goodQuantity: totalGoodQuantity,
        unsellableQuantity: totalUnsellableQuantity,
        outboundGoodQuantity: totalOutboundGoodQuantity,
        outboundDefectiveQuantity: totalOutboundDefectiveQuantity,
      },
    ];
  });
  /*
   * - 选择'良品出库'(normal)时：清空所有产品的出库次品量
   * - 选择'次品出库'(bad)时：清空所有产品的出库良品量
   * - 清空前判断是否有数据，有数据则给予提示
   *
   */
  watch(
    () => form.value.inventoryType,
    (newType, oldType) => {
      // 首次初始化或未变化时不处理
      if (newType === oldType) return;
      const { itemList } = form.value;
      if (!itemList || itemList.length === 0) return;
      // 统计需要清理的数据量
      let clearCount = 0;
      let clearType = '';
      if (newType === 'normal') {
        // 选择良品出库：清空次品量
        itemList.forEach((item: baseAddOutboundType) => {
          if (item.outboundDefectiveQuantity && item.outboundDefectiveQuantity > 0) {
            clearCount++;
          }
          item.outboundDefectiveQuantity = 0;
        });
        clearType = '出库次品量';
      } else if (newType === 'bad') {
        // 选择次品出库：清空良品量
        itemList.forEach((item: baseAddOutboundType) => {
          if (item.outboundGoodQuantity && item.outboundGoodQuantity > 0) {
            clearCount++;
          }
          item.outboundGoodQuantity = 0;
        });
        clearType = '出库良品量';
      }
      // 给用户友好提示
      if (clearCount > 0) {
        ElMessage.info({
          message: `已切换库存类型，已自动清空 ${clearCount} 个产品的${clearType}`,
          duration: 3000,
        });
      }
    }
  );
  const handleClear = () => {
    if (props.mode === 'detail') return;
    form.value.itemList.splice(0);
  };
  watch(
    () => form.value.warehouseCode,
    (nv, ov) => {
      // 边界情况
      if (nv === ov || !nv) return;
      if (props.mode === 'detail') return;
      // 清空数组
      form.value.itemList.splice(0);
    }
  );
  /**
   * 校验规则：
   * 1. 库存类型与出库数量必须匹配
   *    - 良品出库(normal)：次品量必须为0或空
   *    - 次品出库(bad)：良品量必须为0或空
   * 2. 至少有一个产品的出库数量大于0
   * 3. 出库数量不能超过可用库存
   *
   * @returns {boolean} 校验是否通过
   */
  const validateSubmitData = (): boolean => {
    const { inventoryType, itemList } = form.value;
    // 1. 校验库存类型与出库数量的一致性
    const invalidItems: string[] = [];
    itemList.forEach((item: baseAddOutboundType, index: number) => {
      const goodQty = item.outboundGoodQuantity ?? 0;
      const badQty = item.outboundDefectiveQuantity ?? 0;
      // 检查是否至少有一个出库数量大于0
      if (goodQty <= 0 && badQty <= 0) {
        invalidItems.push(`（序号${index + 1}）产品需填写至少一项出库量`);
      }
      // 良品出库模式：不允许有次品量
      if (inventoryType === 'normal' && badQty > 0) {
        invalidItems.push(`（序号${index + 1}）产品存在次品出库量`);
      }
      // 次品出库模式：不允许有良品量
      if (inventoryType === 'bad' && goodQty > 0) {
        invalidItems.push(`（序号${index + 1}）产品存在良品出库量`);
      }
      // 校验出库数量不超过可用库存
      if (goodQty > (Number(item.goodQuantity) || 0)) {
        invalidItems.push(`（序号${index + 1}）产品良品出库量超过可用库存`);
      }
      if (badQty > (item.unsellableQuantity ?? 0)) {
        invalidItems.push(`（序号${index + 1}）产品次品出库量超过可用库存`);
      }
    });
    // 3. 如果有不符合规则的数据，给出详细提示
    if (invalidItems.length > 0) {
      ElMessage({
        type: 'warning',
        message: h(
          'div',
          invalidItems.map((t, i) => [i ? h('br') : null, t])
        ),
        duration: 5000,
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
      submitData.itemList = submitData.itemList.map(({ id, ...rest }) => rest);
      await omsApi.omsOutboundOrderSubmit({
        ...submitData,
      });
      ElMessage.success('操作成功');
      if (props.mode === 'add') {
        closeTabAndRefresh('otherOutboundAdd');
      } else {
        closeTabAndRefresh('otherOutboundDetail');
      }
      router.push({ name: 'otherOutbound' });
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
   * 处理产品选择弹窗关闭事件
   * 将选中的 baseSkuStockType 转换为 baseAddOutboundType 格式并更新到表单
   * @param reload - 是否确认选择
   * @param val - 选中的 SKU 列表（baseSkuStockType[]）
   */
  const handleBindGoodsClose = async (reload: boolean, val?: baseSkuStockType[]) => {
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
      const oldList = form.value.itemList as baseAddOutboundType[];
      const newList: baseAddOutboundType[] = [];

      val.forEach((item: baseSkuStockType) => {
        // 查找是否已存在相同的 SKU（保留用户已填写的数据）
        const existingItem = oldList.find((old) => old.id === item.id);
        // 转换数据格式
        const convertedItem: baseAddOutboundType = {
          id: item.id,
          skuCode: item.skuCode,
          supplySku: item.supplySku,
          productName: item.skuName || item.skuCode || item.productName,
          poolCode: item.poolCode,
          goodQuantity: item.availableQuantity ?? item.goodQuantity ?? 0,
          unsellableQuantity: item.unsellableQuantity ?? 0,
          // 如果已存在则保留原值，否则初始化为 0
          outboundGoodQuantity: existingItem?.outboundGoodQuantity ?? 0,
          outboundDefectiveQuantity: existingItem?.outboundDefectiveQuantity ?? 0,
          remark: existingItem?.remark || '',
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
      const res = await omsApi.omsOutboundOrderQueryDetail({
        id: (route.query.code as any) || 0,
      });
      form.value = cloneDeep(res);
    } catch (e) {}
  };
  onMounted(() => {
    if (props.mode === 'detail') {
      getDetail();
    }
    getWarehouseMap();
    initMember();
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
