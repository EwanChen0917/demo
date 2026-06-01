<template>
  <KeenCard>
    <el-form ref="formRef" :model="formData" class="mb-4" :rules="rules">
      <el-row gutter="20" style="margin-left: -12px">
        <el-col :span="4" v-if="isEdit">
          <el-form-item label="单据编号:">
            <b style="margin-right: 10px">
              {{ formData.adjustmentCode }}
            </b>
            <el-tag :type="tagStatusColorMap[formData.syncStatus]">
              {{ formData.syncStatusDesc }}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="isEdit ? 4 : 6">
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="formData.createTime"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海外三方仓:" prop="warehouseCode">
            <WarehouseSelect
              v-model="formData.warehouseCode"
              @change-warehouse-code="changeWarehouseCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="创建人:">
            <el-input v-model="formData.creatorName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注">
            <el-input
              v-model="formData.remark"
              type="textarea"
              maxlength="100"
              show-word-limit
              :line="1"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="d-flex justify-content-between align-items-center">
        <h4>调整商品明细</h4>
        <div>
          <el-button type="primary" :disabled="disableUpdateTikTokStock" @click="updateTikTokStock">
            更新TT即时库存
          </el-button>
          <el-button type="primary" :disabled="!formData.warehouseCode" @click="openSkuSelectModal">
            + 添加调整明细
          </el-button>
        </div>
      </div>
      <!-- 调整商品明细 -->
      <el-table :data="formData?.wrapperDetailList" max-height="62vh">
        <el-table-column>
          <template #default="{ row, $index }">
            <el-row :gutter="10" align="middle">
              <el-col :span="6">
                <el-form-item label="供应商sku:" :prop="`wrapperDetailList.${$index}.supplySku`">
                  <span>{{ row?.supplySku }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="seller sku:" :prop="`wrapperDetailList.${$index}.sellerSku`">
                  <OverflowTooltip :content="row?.sellerSku" :line="1" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="库存数量:" :prop="`wrapperDetailList.${$index}.totalStock`">
                  <span>{{ row?.totalStock }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="店铺:"
                  label-width="100"
                  :prop="`wrapperDetailList[${$index}].shopNameList`"
                  :rules="[
                    {
                      required: true,
                      message: '请选择店铺',
                      trigger: 'change',
                    },
                  ]"
                >
                  <el-select
                    v-model="row.shopNameList"
                    placeholder="请选择店铺"
                    multiple
                    filterable
                    :options="row.availableShops || []"
                    :props="{
                      label: 'shopName',
                      value: 'shopName',
                    }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-button size="small" type="text" @click="removeRow($index)">删除</el-button>
                  <el-button
                    size="small"
                    type="text"
                    @click="confirmRow($index)"
                    style="margin-left: 0; padding-left: 0"
                    :disabled="row.shopNameList.length === 0"
                  >
                    确认
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-table
              v-loading="row?.skuIdLoading"
              :data="row?.detailList || []"
              style="width: 100%"
            >
              <el-table-column label="SKU ID" prop="skuId" />
              <el-table-column label="店铺名称" prop="shopName" />
              <el-table-column label="Seller SKU" prop="sellerSku" />
              <el-table-column label="商品名称" prop="productName">
                <template #default="{ row }">
                  <OverflowTooltip :content="row.productName" :line="2" />
                </template>
              </el-table-column>
              <el-table-column label="当前库存" prop="availableStock" />
              <el-table-column label="预占库存" prop="committedStock" />
              <el-table-column label="可调整数量" prop="adjustmentQty">
                <template #default="{ row }">
                  <el-input
                    v-model.number="row.adjustmentQty"
                    type="number"
                    placeholder="可调整数量"
                    style="width: 100%"
                    :min="(row.committedStock || 0) - (row.availableStock || 0)"
                    @change="
                      (val) => {
                        const availableStock = +row.availableStock || 0;
                        const committedStock = +row.committedStock || 0;
                        const minValue = committedStock - availableStock;
                        let adjustmentQty = +val || 0;

                        // 如果输入值小于最小值，则设置为最小值
                        if (adjustmentQty < minValue) {
                          adjustmentQty = minValue;
                          row.adjustmentQty = minValue;
                          ElMessage.warning(`调整后数量须≥预占库存!`);
                        }

                        row.afterAdjustmentStock = availableStock + adjustmentQty;
                      }
                    "
                  />
                </template>
              </el-table-column>
              <el-table-column label="调整后库存" prop="afterAdjustmentStock">
                <template #header>
                  <el-tooltip
                    content="调整后库存>=预占库存，否则无法同步TikTok后台"
                    placement="top"
                  >
                    <span>
                      调整后库存
                      <el-icon><warning /></el-icon>
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template #default="{ $index }">
                  <el-button
                    type="text"
                    @click="removeShopRow(row, $index)"
                    v-if="row.syncStatus !== 10"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="同步状态" prop="syncStatus" width="100" v-if="isEdit">
                <template #default="{ row }">
                  <el-tag :type="detailTagStatustMap[row.syncStatus]">
                    {{ row.syncStatusDesc }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="告警信息"
                prop="sysErrorMsg"
                width="140"
                v-if="isEdit && [30, 40].includes(formData.syncStatus ?? -1)"
              >
                <template #default="{ row }">
                  <OverflowTooltip :content="row.sysErrorMsg" :line="2" />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </KeenCard>

  <div class="card-footer d-flex justify-content-end">
    <el-space>
      <el-button
        :disabled="saveLoading"
        type="primary"
        plain
        @click="save('draft')"
        v-if="!isEdit || formData.syncStatus === 0"
      >
        保存草稿
      </el-button>
      <el-button type="primary" :loading="saveLoading" @click="save('save')">确认调整</el-button>
    </el-space>
  </div>
  <selectSkuDialog
    ref="selectSkuDialogRef"
    :selectedRows="formData.wrapperDetailList"
    @select-sku="selectSku"
  />
</template>

<script setup lang="ts" name="tiktokStockAdd">
  import { ElMessage, FormInstance } from 'element-plus';
  import dayjs from 'dayjs';
  import { erpApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import { cloneDeep } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';
  import { tagStatusColorMap, detailTagStatustMap } from './components/tagStatusMap';
  import WarehouseSelect from './components/warehouseSelect.vue';
  import selectSkuDialog from './components/selectSkuDialog.vue';

  const { closeTabAndRefresh } = useTabs();
  interface WrapperDetail {
    supplySku: string;
    sellerSku: string;
    totalStock: number;
    shopNameList: string[];
    detailList: Detail[];
    skuIdLoading?: boolean;
    availableShops?: string[];
    shopLoading?: boolean;
  }

  interface Detail {
    skuId: string;
    shopName: string;
    sellerSku: string;
    productName: string;
    availableStock: number;
    committedStock: number;
    adjustmentQty: number;
    afterAdjustmentStock: number;
    syncStatus?: number;
    syncStatusDesc?: string;
    sysErrorMsg?: string;
  }

  interface FormData {
    adjustmentCode: string;
    createTime: string;
    warehouseCode: string;
    warehouseName: string;
    creatorName: string;
    creator: string | number | null;
    remark: string;
    wrapperDetailList: WrapperDetail[];
    syncStatus?: number;
    syncStatusDesc?: string;
  }

  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const { query } = route;

  const props = defineProps({
    mode: {
      type: String,
      default: 'add',
    },
  });

  const rules = {
    warehouseCode: [{ required: true, message: '请选择海外三方仓', trigger: ['blur', 'change'] }],
    wrapperDetailList: [
      {
        type: 'array',
        required: true,
        message: '请添加至少一条调整明细',
        trigger: 'blur',
      },
    ],
  };

  const formRef = ref<FormInstance>();

  const formData = ref<FormData>({
    adjustmentCode: '',
    createTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    warehouseCode: '',
    warehouseName: '',
    creatorName: store.userInfo.name,
    creator: store.userInfo.memberCode,
    remark: '',
    wrapperDetailList: [],
    syncStatus: 0,
    syncStatusDesc: '',
  });

  const selectSkuDialogRef = ref();
  const saveLoading = ref<boolean>(false);

  // 是否是编辑模式
  const isEdit = computed(() => props.mode === 'edit');

  // 更新实时库存按钮是否禁用
  const disableUpdateTikTokStock = computed(() => {
    // formData.value.wrapperDetailList为空或不存在detailList的数据
    const row =
      !formData.value.wrapperDetailList.length ||
      formData.value.wrapperDetailList.find((row) => !row.detailList || !row.detailList?.length);
    return row;
  });

  const changeWarehouseCode = (warehouse) => {
    formData.value.warehouseName = warehouse.warehouseDesc;
  };

  // 编辑查询详情
  const queryDetail = async (id) => {
    if (!id) return;
    const res = await erpApi.luteosErpTiktokStockAdjustmentDetail(id);
    const { adjustmentBean, wrapperDetailList } = res;
    formData.value = { ...adjustmentBean, wrapperDetailList };
    nextTick(() => {
      formData.value.wrapperDetailList.forEach((row) => {
        return {
          ...row,
          availableShops: getShopListBySupplySku(row.supplySku, row.sellerSku, row),
        };
      });
    });
  };

  queryDetail(query.id);

  const openSkuSelectModal = () => {
    // 打开SKU选择弹窗
    selectSkuDialogRef.value.open({
      warehouseCode: formData.value.warehouseCode,
      warehouseName: formData.value.warehouseName,
    });
  };

  // 处理SKU选中
  const selectSku = (sku) => {
    sku.forEach((item) => {
      const exitIndex = formData.value.wrapperDetailList.findIndex(
        (row) => row.supplySku === item.supplySku && row.sellerSku === item.sellerSku
      );
      const exitItem = formData.value.wrapperDetailList[exitIndex];
      if (exitIndex !== -1) {
        // 替换表单中这一项，shopNameList保留
        formData.value.wrapperDetailList.splice(exitIndex, 1, {
          ...item,
          detailList: cloneDeep(exitItem.detailList),
          shopNameList: exitItem.shopNameList,
        });
      } else {
        formData.value.wrapperDetailList.push({ ...item, shopNameList: [] });
      }
    });
    nextTick(() => {
      formData.value.wrapperDetailList.forEach((row) => {
        return {
          ...row,
          availableShops:
            row.availableShops || getShopListBySupplySku(row.supplySku, row.sellerSku, row),
        };
      });
    });
  };

  const getShopListBySupplySku = async (supplySku, sellerSku, row) => {
    const res = await erpApi.luteosErpTiktokStockAdjustmentQuerySkuShopInfo({
      supplySku,
      sellerSku,
    });
    row.availableShops = res.recordList || [];
  };
  // TODO: 实现更新TT即时库存的方法
  const updateTikTokStock = async () => {
    try {
      const queryList = formData.value.wrapperDetailList.reduce((acc, item) => {
        const shopDetails = item.detailList?.map((shop) => ({
          shopName: shop.shopName,
          skuId: shop.skuId,
        }));
        return [...acc, ...shopDetails];
      }, []);

      const res = await erpApi.luteosErpTiktokStockAdjustmentQueryStock({
        queryList,
      });
      const { recordList } = res;
      formData.value.wrapperDetailList.forEach((row) => {
        row.detailList.forEach((detail) => {
          const shopDetail = recordList.find(
            (item) => item.shopName === detail.shopName && item.skuId === detail.skuId
          );
          if (shopDetail) {
            detail.availableStock = shopDetail.availableStock;
            detail.committedStock = shopDetail.committedStock;
          }
        });
      });
      ElMessage.success('TT即时库存更新成功');
    } catch (error) {}
  };

  // 根据sku、店铺数据获取skuid
  const confirmRow = async (index) => {
    try {
      const { shopNameList, supplySku, sellerSku } = formData.value.wrapperDetailList[index];
      formData.value.wrapperDetailList[index].skuIdLoading = true;
      const res = await erpApi.luteosErpTiktokStockAdjustmentQuerySkuIdInfo({
        supplySku,
        shopNameList,
        sellerSku,
        warehouseCode: formData.value.warehouseCode,
      });
      const { recordList } = res;
      if (recordList.length > 0) {
        formData.value.wrapperDetailList[index].detailList = recordList;
      }
    } finally {
      formData.value.wrapperDetailList[index].skuIdLoading = false;
    }
  };

  // 删除商品明细行
  const removeRow = (index) => {
    formData.value.wrapperDetailList.splice(index, 1);
  };

  // 删除店铺行
  const removeShopRow = (currentRow, index) => {
    currentRow.detailList.splice(index, 1);
    currentRow.shopNameList.splice(index, 1);
  };

  const save = async (mode) => {
    try {
      const valid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!valid) {
        ElMessage.error('请填写完整的表单信息');
        return;
      }
      // 如果wrapperDetailList存在detailList为空的数据，则提示
      // const detailListEmpty = formData.value.wrapperDetailList.find(
      //   (item) => !item.detailList || item.detailList.length === 0
      // );
      // if (detailListEmpty && mode === 'save') {
      //   ElMessage.warning(`${detailListEmpty.sellerSku}的明细为空,请确认`);
      //   return;
      // }
      // 过滤wrapperDetailList中detailList为空的数据
      formData.value.wrapperDetailList = formData.value.wrapperDetailList.filter(
        (item) => item.detailList && item.detailList.length > 0
      );
      saveLoading.value = true;

      await erpApi.luteosErpTiktokStockAdjustmentSaveOrUpdate({
        ...formData.value,
        operationType: mode === 'save' ? 1 : 0,
      });
      ElMessage.success(`${mode === 'save' ? '确认调整' : '保存草稿'}成功`);
      // 新增模式重置表单
      if (!isEdit.value) {
        formData.value = {
          adjustmentCode: '',
          createTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          warehouseCode: '',
          warehouseName: '',
          creatorName: store.userInfo.name,
          creator: store.userInfo.memberCode,
          remark: '',
          wrapperDetailList: [],
          syncStatus: 0,
          syncStatusDesc: '',
        };
        formRef.value?.resetFields();
      }
      closeTabAndRefresh('tiktokStock');
      router.push({
        name: 'tiktokStock',
      });
    } catch (error) {
    } finally {
      saveLoading.value = false;
    }
  };
</script>

<style scoped>
  ::v-deep(.el-form-item__content) {
    line-height: 32px !important;
  }
</style>
