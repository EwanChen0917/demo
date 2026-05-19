<template>
  <el-form
    :model="form"
    :disabled="mode === 'detail'"
    :rules="formRules"
    ref="formRef"
    label-position="top"
  >
    <KeenCard title="入库信息">
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
              @change="formRef.clearValidate('sourceCode')"
            >
              <el-option
                v-for="person of dickBook.oms_other_in_bound_operation_type"
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
                v-for="person of dickBook.oms_other_in_bound_inventory_type"
                :key="person.value"
                :label="person.desc"
                :value="person.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <!-- 是否需要质检 -->
          <el-form-item label="是否需要质检" prop="qualityInspection">
            <el-radio-group v-model="form.qualityInspection">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <!-- 来源单号 -->
          <el-form-item
            label="来源单号"
            prop="sourceCode"
            :rules="{
              required: form.operationType === '截单失败',
              trigger: ['change', 'blur'],
              validator: (rule, value, callback) => {
                if (rule.required && !value?.trim()) {
                  callback(new Error('请输入来源单号'));
                } else {
                  callback();
                }
              },
            }"
          >
            <el-input
              v-model="form.sourceCode"
              placeholder="请输入来源单号"
              maxlength="50"
              show-word-limit
            />
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
          v-if="mode === 'add'"
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
        :cell-config="{ minheight: 120 }"
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
        <vxe-table-column field="skuCode" title="产品SKU" min-width="150px" />
        <vxe-table-column field="boxes" title="箱数" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item prop="boxes">
              <el-input
                v-model.number="form.itemList[$rowIndex].boxes"
                v-number-format="{ percision: 0 }"
                placeholder="请输入箱数"
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="inboundGoodQuantity" title="入库良品量" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0">
              <NumberInput
                v-model="form.itemList[$rowIndex].inboundGoodQuantity"
                :min="0"
                :precision="0"
                :disabled="allowGoodEdit"
                placeholder="请输入"
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column field="inboundDefectiveQuantity" title="入库次品量" min-width="150px">
          <template #default="{ row, $rowIndex }">
            <el-form-item style="margin: 0">
              <NumberInput
                v-model="form.itemList[$rowIndex].inboundDefectiveQuantity"
                :min="0"
                :precision="0"
                :disabled="allowBadEdit"
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
  <!-- <AddProductDialog
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :selectedRows="form.itemList"
    :warehouseCode="form.warehouseCode"
    @close="handleBindGoodsClose"
  /> -->
  <SkuDialog
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :selectedRows="form.itemList"
    :warehouseCode="form.warehouseCode"
    @close="handleBindGoodsClose"
    :multiple="false"
    :columnsConfig="{
      availableInventory: false,
      poolCodeName: false,
      warehouseMapName: false,
    }"
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
  import { useOmsBase } from '../hooks/useOmsBase';
  import { baseAddInboundType, baseAddOutboundType, baseSkuStockType } from '../type';
  import AddProductDialog from '../components/addProductDialog.vue';
  import SkuDialog from '../components/skuDialog.vue';

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
    operationType: '',
    remark: '',
    inventoryType: '',
    warehouseCode: '',
    qualityInspection: 1,
    sourceCode: '',
  });
  const formRules = ref({
    warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
    operationType: [{ required: true, message: '请选择操作类型', trigger: 'change' }],
    inventoryType: [{ required: true, message: '请选择库存类型', trigger: 'change' }],
    qualityInspection: [{ required: true, message: '请选择是否需要质检', trigger: 'change' }],
  });
  const userMap = computed(() => {
    return [
      {
        label: userInfo.name,
        value: userInfo.memberCode,
      },
    ];
  });
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
        // 选择良品入库：清空次品量
        itemList.forEach((item: baseAddInboundType) => {
          if (item.inboundDefectiveQuantity && item.inboundDefectiveQuantity > 0) {
            clearCount++;
          }
          item.inboundDefectiveQuantity = 0;
        });
        clearType = '入库次品量';
      } else if (newType === 'bad') {
        // 选择次品入库：清空良品量
        itemList.forEach((item: baseAddInboundType) => {
          if (item.inboundGoodQuantity && item.inboundGoodQuantity > 0) {
            clearCount++;
          }
          item.inboundGoodQuantity = 0;
        });
        clearType = '入库良品量';
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
  /**
   * 控制添加产品按钮的禁用状态
   * 只有当人库信息中的仓库字段填写后，才允许添加产品
   * @returns {boolean} true-可点击 false-禁用
   */
  const isAddProductEnabled = computed(() => {
    // 校验仓库字段是否已填写
    const hasWarehouse = !!form.value.warehouseCode;
    return hasWarehouse;
  });
  const saveLoading = ref(false);
  const bindGoodsVisible = ref(false);
  const addProduct = async () => {
    bindGoodsVisible.value = true;
  };
  const allowGoodEdit = computed(() => {
    return form.value.inventoryType === 'bad';
  });

  /**
   * 控制次品量输入框的禁用状态
   * 当库存类型为'良品入库'(normal)时，禁用次品量输入
   */
  const allowBadEdit = computed(() => {
    return form.value.inventoryType === 'normal';
  });
  /**
   * 校验规则：
   * 1. 产品入库数量至少有一项大于0
   *
   * @returns {boolean} 校验是否通过
   */
  const validateSubmitData = (): boolean => {
    const { inventoryType, itemList } = form.value;
    // 1. 校验库存类型与入库数量的一致性
    const invalidItems: string[] = [];
    itemList.forEach((item: baseAddInboundType, index: number) => {
      const goodQty = item.inboundGoodQuantity || 0;
      const badQty = item.inboundDefectiveQuantity || 0;
      if (goodQty <= 0 && badQty <= 0) {
        invalidItems.push(`（序号${index + 1}）产品需填写至少一项入库量`);
      }
      // 良品入库模式：不允许有次品量
      if (inventoryType === 'normal' && badQty > 0) {
        invalidItems.push(`（序号${index + 1}）产品存在次品入库量`);
      }
      // 次品入库模式：不允许有良品量
      if (inventoryType === 'bad' && goodQty > 0) {
        invalidItems.push(`（序号${index + 1}）产品存在良品入库量`);
      }
    });
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
  /**
   * 处理产品选择弹窗关闭事件
   * 将选中的 baseSkuStockType 转换为 baseSkuAddType 格式并更新到表单
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
      const oldList = form.value.itemList as baseAddInboundType[];
      const newList: baseAddInboundType[] = [];

      val.forEach((item: baseSkuStockType) => {
        // 查找是否已存在相同的 SKU（保留用户已填写的数据）
        const existingItem = oldList.find((old) => old.id === item.id);
        // 转换数据格式
        const convertedItem: baseAddInboundType = {
          id: item.id,
          skuCode: item.skuCode,
          supplySku: item.supplySku,
          productName: item.skuName || item.skuCode,
          poolCode: item.poolCode,
          goodQuantity: item.availableQuantity || 0,
          // 如果已存在则保留原值，否则初始化为 0
          inboundGoodQuantity: existingItem?.inboundGoodQuantity || 0,
          inboundDefectiveQuantity: existingItem?.inboundDefectiveQuantity || 0,
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
      const res = await omsApi.omsInboundOrderQueryDetail({
        id: (route.query.code as any) || 0,
      });
      form.value = cloneDeep(res);
    } catch (e) {}
  };
  const save = async () => {
    try {
      // 校验表单
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
      // 提交数据
      saveLoading.value = true;
      const submitData = cloneDeep(form.value);
      submitData.itemList = submitData.itemList.map(({ id, ...rest }) => rest);
      await omsApi.omsInboundOrderSubmit({
        ...submitData,
      });
      ElMessage.success('操作成功');
      if (props.mode === 'add') {
        closeTabAndRefresh('otherInboundAdd');
      } else {
        closeTabAndRefresh('otherInboundDetail');
      }
      router.push({ name: 'otherInbound' });
    } catch (error) {
      console.error('保存失败:', error);
      ElMessage.error('保存失败，请检查表单信息');
    } finally {
      saveLoading.value = false;
    }
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
