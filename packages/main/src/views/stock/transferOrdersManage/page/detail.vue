<template>
  <el-dialog
    v-model="drawerVisible"
    class="detail-dialog"
    :width="dialogWidth"
    title="调拨申请单"
    :show-close="true"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    @opened="handleDrawerOpened"
    @closed="handleDrawerClosed"
    @close="handleDrawerBeforeClosed"
  >
    <div class="dialog-layout">
      <div class="dialog-content" v-loading="detailLoading">
        <el-form :model="form" label-width="96px" label-position="left" class="base-form">
          <el-row :gutter="16">
            <el-col :span="8">
              <el-form-item label="单据编码：">
                <OverflowTooltip :content="form.code || '-'" :line="1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据状态：">
                <OverflowTooltip :content="billStatusLabel || '-'" :line="1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计划专员：">
                <DeptMember
                  v-model="form.productPlannerCode"
                  placeholder="请选择计划专员"
                  clearable
                  style="width: 100%"
                  :manual="true"
                  :manual-options="memberList"
                  :disabled="pageType !== TransferPlanOrderStatus.Add"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请数量：">
                <OverflowTooltip
                  :content="tableData.length ? String(applyQtySum) : '-'"
                  :line="1"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核数量：">
                <OverflowTooltip
                  :content="tableData.length ? String(auditQtySum) : '-'"
                  :line="1"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="sku数量：">
                <OverflowTooltip
                  :content="tableData.length ? String(skuCountSum) : '-'"
                  :line="1"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人：">
                <OverflowTooltip :content="form.createBy || '-'" :line="1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <OverflowTooltip :content="form.createTime || '-'" :line="1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核人：">
                <OverflowTooltip :content="form.auditBy || '-'" :line="1" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核时间：">
                <OverflowTooltip :content="form.auditTime || '-'" :line="1" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <EditProductTable
          class="edit-product-table"
          :model-value="tableData"
          :page-type="pageType"
          :warehouse-map="warehouseMap"
          :warehouse-name-map="warehouseNameMap"
          @update:model-value="handleTableModelValueUpdate"
          ref="editProductTableRef"
        >
          <template #actions>
            <el-button
              type="default"
              @click="handleImport"
              v-if="pageType === TransferPlanOrderStatus.PendingAudit"
            >
              导入
            </el-button>
            <el-button
              type="default"
              :loading="exportLoading"
              v-if="isDetailMode && form.code"
              @click="handleExport"
            >
              导出
            </el-button>
          </template>
        </EditProductTable>
      </div>
    </div>
    <TransferPlanOrderImportDialog ref="importDialogRef" @success="handleImportSuccess" />
    <template #footer>
      <div class="footer">
        <div class="btns">
          <el-button
            type="default"
            :loading="saveLoading"
            v-if="
              pageType === TransferPlanOrderStatus.Created ||
              pageType === TransferPlanOrderStatus.Add
            "
            @click="handleSave"
          >
            保存
          </el-button>
          <el-button
            type="primary"
            v-if="
              pageType === TransferPlanOrderStatus.Created ||
              pageType === TransferPlanOrderStatus.Add
            "
            @click="handleSubmit"
            :loading="submitLoding"
          >
            提交
          </el-button>
          <el-button
            type="success"
            v-if="isDetailMode && pageType === TransferPlanOrderStatus.PendingAudit"
            @click="handleAudit"
            :loading="submitLoding"
          >
            审核
          </el-button>
          <el-button
            type="danger"
            v-if="pageType === TransferPlanOrderStatus.Created"
            @click="handleVoid"
            :loading="submitLoding"
          >
            作废
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, useTemplateRef } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import type { TransferPlanOrderSaveReq } from '@/api/oms/data-contracts';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { useOmsBase } from '@/views/supplyChainManage/efficiencyTools/bound/hooks/useOmsBase';
  import EditProductTable, { type TransferOrderItemRow } from '../components/editProductTable.vue';
  import TransferPlanOrderImportDialog from '../components/transferPlanOrderImportDialog.vue';
  import { useTransOrderManage } from '../hooks/useTransferOrderManage';
  import { TransferPlanOrderStatus } from '../enums/transferPlanOrderStatus';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  type PageType =
    | 'add'
    | TransferPlanOrderStatus.Created
    | TransferPlanOrderStatus.PendingAudit
    | TransferPlanOrderStatus.Audited
    | TransferPlanOrderStatus.Void;
  const pageType = ref<PageType>(TransferPlanOrderStatus.Created);
  const isDetailMode = computed(() => pageType.value !== TransferPlanOrderStatus.Add);
  const currentCode = ref<string>('');
  const router = useRouter();

  interface TransferOrderDetailForm {
    code: string; // 单据编码
    createBy: string; // 创建人
    createTime: string; // 创建时间
    auditBy: string; // 审核人
    auditTime: string; // 审核时间
    productPlannerCode: string; // 计划专员
    items: TransferOrderItemRow[];
    status: string; // 单据状态
  }

  const drawerVisible = ref(false);
  const drawerWidth = ref<number | string>(1200);
  const dialogWidth = computed(() => {
    return typeof drawerWidth.value === 'number' ? `${drawerWidth.value}px` : drawerWidth.value;
  });

  interface WarehouseItem {
    warehouseCode: string;
    warehouseName: string;
  }

  const { warehouseMap: rawWarehouseMap, getWarehouseMap } = useOmsBase();
  const { abandonTransferPlanOrder, memberList, queryMemberList } = useTransOrderManage();
  const warehouseMap = computed<WarehouseItem[]>(() => {
    return (rawWarehouseMap.value || []) as WarehouseItem[];
  });
  const warehouseNameMap = computed(() => {
    const map = new Map<string, string>();
    warehouseMap.value.forEach((item) => {
      map.set(item.warehouseCode, item.warehouseName);
    });
    return map;
  });

  const form = reactive<TransferOrderDetailForm>({
    code: '',
    status: '',
    createBy: '',
    createTime: '',
    auditBy: '',
    auditTime: '',
    productPlannerCode: '',
    items: [],
  });

  const tableData = ref<TransferOrderItemRow[]>([]);
  const saveLoading = ref(false);
  const detailLoading = ref(false);
  const exportLoading = ref(false);
  const billStatus = ref<string>('');
  const billStatusLabel = ref<string>('');
  let lastDetailFetchToken = 0;
  const applyQtySum = computed(() => {
    return tableData.value.reduce((sum, row) => sum + (Number(row.applyQty) || 0), 0);
  });
  const auditQtySum = computed(() => {
    return tableData.value.reduce((sum, row) => sum + (Number(row.auditQty) || 0), 0);
  });
  const skuCountSum = computed(() => {
    return tableData.value.length;
  });

  const importDialogRef = useTemplateRef('importDialogRef');
  const editProductTableRef = useTemplateRef('editProductTableRef');
  const reset = () => {
    form.code = '';
    form.status = '';
    form.createBy = '';
    form.createTime = '';
    form.auditBy = '';
    form.auditTime = '';
    form.productPlannerCode = '';
    form.items = [];
    tableData.value = [];
    saveLoading.value = false;
    pageType.value = TransferPlanOrderStatus.Add;
    currentCode.value = '';
    billStatus.value = '';
    billStatusLabel.value = '';
  };

  const getData = async (code: string) => {
    if (!code) return;
    lastDetailFetchToken += 1;
    const fetchToken = lastDetailFetchToken;
    detailLoading.value = true;
    try {
      const res = await omsApi.omsTransferPlanQueryDetail({ code });
      if (fetchToken !== lastDetailFetchToken) return;
      const detail: any = res || {};
      form.code = detail?.code || code;
      form.createBy = detail?.createBy || '';
      form.createTime = detail?.createTime || '';
      form.auditBy = detail?.auditBy || '';
      form.auditTime = detail?.auditTime || '';
      form.status = detail?.status || '';
      form.productPlannerCode = detail?.productPlannerCode || '';
      billStatus.value = detail?.status || '';
      billStatusLabel.value = detail?.statusLabel || detail?.status || '';
      const items = await omsApi.omsTransferPlanQueryItemList({
        code,
        pageNum: 1,
        pageSize: 200,
      });
      const rows: TransferOrderItemRow[] = (items?.items || []).map((item) => ({
        supplySku: item?.supplySku || '',
        productName: item?.productName || '',
        applyQty: item?.applyQty ?? '',
        outStockQty: item?.outStockQty ?? '',
        auditQty: item?.auditQty ?? '',
        unsatisfiedReason: item?.unsatisfiedReason || '',
        msku: item?.msku || '',
        inWarehouseCode: item?.inWarehouseCode || '',
        outWarehouseCode: item?.outWarehouseCode || '',
        productSku: item?.productSku || '',
        jjTransferStatus: item?.jjTransferStatus || '',
        jjTransferCode: item?.jjTransferCode || '',
        itemId: item?.itemId,
        jjPushStatus: item?.jjPushStatus || '',
      }));
      tableData.value = rows;
      form.items = rows;
      if (!rows.length) {
        ElMessage.warning('该单据暂无明细数据');
      }
    } catch (e) {
      if (fetchToken !== lastDetailFetchToken) return;
      tableData.value = [];
      form.items = [];
      form.status = '';
      billStatusLabel.value = '';
    } finally {
      if (fetchToken === lastDetailFetchToken) {
        detailLoading.value = false;
      }
    }
  };
  const open = async (params?: { type?: PageType; code?: string }) => {
    const targetType: PageType = params?.type || TransferPlanOrderStatus.Add;
    pageType.value = targetType;
    currentCode.value = params?.code || '';
    drawerVisible.value = true;
    if (targetType !== TransferPlanOrderStatus.Add && currentCode.value) {
      await getData(currentCode.value);
    }
  };
  const close = () => {
    reset();
    drawerVisible.value = false;
  };
  const handleDrawerOpened = async () => {
    // 预留：抽接口后可在这里加载详情
    if (
      !rawWarehouseMap.value ||
      (Array.isArray(rawWarehouseMap.value) && rawWarehouseMap.value.length === 0)
    ) {
      await getWarehouseMap('ALL', {
        status: 1,
        centerWarehouse: 1,
      });
    }
  };
  const handleDrawerClosed = () => {
    // 关闭后重置滚动等（按需扩展）
    editProductTableRef.value?.reset();
  };

  const handleDrawerBeforeClosed = () => {
    reset();
  };
  const handleTableModelValueUpdate = (rows: TransferOrderItemRow[]) => {
    tableData.value = rows;
    form.items = rows;
  };
  const handleImport = () => {
    // if (isDetailMode.value) return;
    importDialogRef.value?.open({ type: 'detail', targetCode: form.code });
  };
  const handleImportSuccess = () => {
    getData(form.code);
    // 当前实现：导入后仅提示并保持弹窗关闭；如后端返回 businessData 可在这里回填 tableData
  };
  const handleExport = async () => {
    if (!isDetailMode.value) return;
    if (!form.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    try {
      if (exportLoading.value) return;
      const isConfirmed = await swal.confirm({
        title: '确认',
        text: '确定要导出吗？',
      });
      if (!isConfirmed) return;

      exportLoading.value = true;
      const res = await omsApi.omsTransferPlanExport({
        exportType: 2,
        planCode: form.code,
      } as any);

      const isConfirmedExport = await swal.confirm({
        icon: 'success',
        title: '导出成功，具体请前往下载中心查看',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmedExport) return;

      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: (res as any)?.appCode,
          module_code: (res as any)?.moduleCode,
          record_type: 2,
        },
      });
    } catch (e: any) {
      /** empty */
    } finally {
      exportLoading.value = false;
    }
  };

  type ValidateResult = { ok: true } | { ok: false; message: string };

  const validateForSave = (rows: TransferOrderItemRow[]): ValidateResult => {
    // if (pageType.value === TransferPlanOrderStatus.Add && !form.productPlannerCode) {
    //   return { ok: false, message: '请选择计划专员' };
    // }
    if (!rows.length) {
      return { ok: false, message: '请先添加明细行' };
    }
    return { ok: true };
  };

  const validateForSubmit = (rows: TransferOrderItemRow[]): ValidateResult => {
    // if (pageType.value === TransferPlanOrderStatus.Add && !form.productPlannerCode) {
    //   return { ok: false, message: '请选择计划专员' };
    // }

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const lineNo = i + 1;
      const applyQty = Number(row.applyQty);

      if (!row.inWarehouseCode) {
        return { ok: false, message: `第${lineNo}行：请选择调入仓` };
      }
      if (!Number.isFinite(applyQty) || applyQty <= 0 || !Number.isInteger(applyQty)) {
        return { ok: false, message: `第${lineNo}行：申请数量必须为正整数` };
      }
    }
    return { ok: true };
  };

  const validateForAudit = (rows: TransferOrderItemRow[]): ValidateResult => {
    if (!rows.length) {
      return { ok: false, message: '请先添加明细行' };
    }
    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const lineNo = i + 1;
      const auditQty = Number(row.auditQty);

      if (!Number.isFinite(auditQty) || auditQty < 0 || !Number.isInteger(auditQty)) {
        return { ok: false, message: `第${lineNo}行：审核数量必须为正整数` };
      }
    }
    return { ok: true };
  };

  const formatSaveReq = (rows: TransferOrderItemRow[]): TransferPlanOrderSaveReq => {
    return {
      code: form.code || undefined,
      productPlannerCode: form.productPlannerCode || undefined,
      items: rows.map((row) => ({
        supplySku: row.supplySku || undefined,
        productName: row.productName || undefined,
        productSku: row.productSku || undefined,
        msku: row.msku || undefined,
        outWarehouseCode: row.outWarehouseCode || undefined,
        inWarehouseCode: row.inWarehouseCode || undefined,
        applyQty: Number(row.applyQty) || 0,
        auditQty: Number(row.applyQty) || 0,
        itemId: row.itemId || undefined,
        jjPushStatus: row.jjPushStatus || undefined,
      })),
    };
  };

  const handleSave = async () => {
    if (saveLoading.value) return;
    const validateResult = validateForSave(tableData.value);
    if (!validateResult.ok) {
      ElMessage.warning(validateResult.message);
      return;
    }
    const req = formatSaveReq(tableData.value);

    try {
      saveLoading.value = true;
      await omsApi.omsTransferPlanSave(req);
      ElMessage.success('保存成功');
      emit('success');
      close();
    } catch (e) {
      /** empty */
    } finally {
      saveLoading.value = false;
    }
  };
  const submitLoding = ref(false);
  const handleSubmit = async () => {
    if (submitLoding.value) return;
    const validateResult = validateForSubmit(tableData.value);
    if (!validateResult.ok) {
      ElMessage.warning(validateResult.message);
      return;
    }
    try {
      submitLoding.value = true;
      await omsApi.omsTransferPlanSubmit({
        code: form.code || undefined,
        productPlannerCode: form.productPlannerCode || undefined,
        items: tableData.value.map((row) => ({
          supplySku: row.supplySku || undefined,
          productName: row.productName || undefined,
          productSku: row.productSku || undefined,
          msku: row.msku || undefined,
          outWarehouseCode: row.outWarehouseCode || undefined,
          inWarehouseCode: row.inWarehouseCode || undefined,
          applyQty: Number(row.applyQty),
          auditQty: Number(row.auditQty),
          unsatisfiedReason: row.unsatisfiedReason || undefined,
          itemId: row.itemId || undefined,
        })),
      });

      ElMessage.success('提交成功');
      emit('success');
      close();
    } catch {
      /** empty */
    } finally {
      submitLoding.value = false;
    }
  };

  const handleAudit = async () => {
    if (!form.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    const validateResult = validateForAudit(tableData.value);
    if (!validateResult.ok) {
      ElMessage.warning(validateResult.message);
      return;
    }
    try {
      submitLoding.value = true;
      await omsApi.omsTransferPlanAudit({
        code: form.code,
        items: tableData.value.map((row) => ({
          supplySku: row.supplySku || undefined,
          productName: row.productName || undefined,
          productSku: row.productSku || undefined,
          msku: row.msku || undefined,
          outWarehouseCode: row.outWarehouseCode || undefined,
          inWarehouseCode: row.inWarehouseCode || undefined,
          applyQty: Number(row.applyQty),
          auditQty: Number(row.auditQty),
          itemId: row.itemId || undefined,
          unsatisfiedReason: row.unsatisfiedReason || undefined,
        })),
      });
      ElMessage.success('审核成功');
      emit('success');
      close();
    } catch {
      /** empty */
    } finally {
      submitLoding.value = false;
    }
  };

  const handleVoid = async () => {
    if (!form.code) {
      ElMessage.warning('缺少单据编码');
      return;
    }
    if (
      form.status === TransferPlanOrderStatus.Void ||
      form.status === TransferPlanOrderStatus.Audited
    ) {
      ElMessage.warning('当前状态不支持作废');
      return;
    }
    try {
      submitLoding.value = true;
      const ok = await abandonTransferPlanOrder(form.code);
      if (!ok) return;
      ElMessage.success('作废成功');
      emit('success');
      close();
    } catch {
      /** empty */
    } finally {
      submitLoding.value = false;
    }
  };

  defineExpose({
    open,
    close,
    reset,
  });
  queryMemberList();
  getWarehouseMap('ALL', {
    status: 1,
    centerWarehouse: 1,
  });
</script>

<style scoped lang="scss">
  .iconfont {
    cursor: pointer;
  }

  .detail-dialog {
    :deep(.el-dialog__header) {
      padding: 0 !important;
      margin: 0 !important;
    }
    :deep(.el-dialog__body) {
      padding: 0 !important;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    :deep(.el-dialog__footer) {
      padding: 0 !important;
    }
  }

  .base-form {
    padding: 16px 20px 0;
    :deep(.el-form-item__label) {
      position: relative;
      padding-left: 12px;
    }
    :deep(.el-form-item__label)::before {
      content: '';
      width: 3px;
      height: 18px;
      border-radius: 2px;
      background: var(--el-color-primary);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .dialog-layout {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: calc(100vh - 320px - 32px);
  }

  .dialog-content {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .edit-product-table {
    flex: 1;
    min-height: 0;
  }

  .footer {
    padding: 12px 20px 16px;
    border-top: 1px solid #f5f5f5;
    background: #fff;
    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 8px !important;
  }
  :deep(.el-scrollbar__bar.is-vertical) {
    width: 8px !important;
  }
</style>
