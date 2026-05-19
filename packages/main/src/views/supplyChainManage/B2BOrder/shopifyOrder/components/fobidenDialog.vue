<template>
  <el-dialog
    v-model="visible"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
  >
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <el-popover
          v-model:visible="createPopoverVisible"
          placement="bottom-end"
          :width="300"
          trigger="click"
          popper-class="create-reason-popover-popper"
        >
          <template #reference>
            <el-button type="text" @click.stop>创建禁止处理原因</el-button>
          </template>
          <div class="create-reason-popover">
            <el-input
              v-model="newReasonName"
              placeholder="请输入禁止处理原因"
              clearable
              maxlength="128"
              @keyup.enter="handleCreateReason"
            />
            <div class="popover-footer">
              <el-button size="small" @click="handleLabelCancel">取消</el-button>
              <el-button type="primary" size="small" @click="handleCreateReason">确认</el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </template>

    <div class="forbidden-content">
      <el-alert type="warning" :closable="false" style="margin-bottom: 16px; font-size: 12px">
        <template #default>
          若该单已推送至三方仓则无法对三方仓单据状态造成影响,请检查三方仓单据状态!
        </template>
      </el-alert>

      <div class="selected-info" style="margin-bottom: 16px">
        共选中 {{ selectedList.length }} 条数据,在下方选择禁止处理原因!
      </div>
      <div class="forbidden-reason">
        <el-scrollbar height="360">
          <el-radio-group v-model="form.reason" class="reason-radio-group">
            <el-radio
              v-for="item in reasonList"
              :key="item.value"
              :label="item.value"
              class="reason-radio"
            >
              <OverflowTooltip :content="item.label || '-'" :line="1" />
              <!-- {{ item.label }} -->
            </el-radio>
          </el-radio-group>
        </el-scrollbar>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { omsApi, platformApi } from '@/api';
  import { ElMessage, ElMessageBox } from 'element-plus';

  interface Props {
    title?: string;
    width?: string | number;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
  }

  interface ReasonItem {
    label: string;
    value: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '选择禁止处理原因',
    width: '500px',
    closeOnClickModal: false,
    closeOnPressEscape: true,
  });

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
    (event: 'create', reasonName: string): void;
  }>();

  const form = ref<{
    reason: string;
  }>({
    reason: '',
  });

  const visible = ref(false);
  const selectedList = ref([]);
  const confirmLoading = ref(false);
  const createPopoverVisible = ref(false);
  const newReasonName = ref('');
  // 禁止处理原因列表
  const reasonList = ref<ReasonItem[]>([]);
  const handleLabelCancel = () => {
    newReasonName.value = '';
    createPopoverVisible.value = false;
  };
  const open = (list: any) => {
    handleLabelGet();
    selectedList.value = list;
    form.value.reason = '';
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
    form.value.reason = '';
  };

  const handleClose = () => {
    close();
    emit('close');
  };

  const handleConfirm = async () => {
    if (!form.value.reason) {
      ElMessage.warning('请选择禁止处理原因');
      return;
    }

    if (!selectedList.value.length) return;
    const selectedCount = selectedList.value.length;
    try {
      confirmLoading.value = true;
      if (selectedCount > 1) {
        const res = await omsApi.omsFulfillmentOrderBatchFreeze({
          erpCodeList: selectedList.value,
          reason: form.value.reason,
        });
        const content = [
          ...(res.successList?.length
            ? res.successList.map((item) => `订单号：${item.orderCode}，禁止处理成功`)
            : []),
          ...(res.failList?.length
            ? res.failList.map((item) => `订单号：${item.orderCode}，禁止处理失败：${item.message}`)
            : []),
        ].join('\n');

        ElMessage[res.failList?.length ? 'warning' : 'success'](content);
      } else {
        const res = await omsApi.omsFulfillmentOrderFreeze({
          erpCode: selectedList.value[0],
          reason: form.value.reason,
        });
        ElMessage.success('禁止处理成功');
      }
      emit('success');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      confirmLoading.value = false;
    }
    close();
  };
  const handleLabelGet = async () => {
    const res = await platformApi.platformLabelQueryLabelList({
      name: undefined,
      module: 'order_Forbid_reason',
      pageNum: 1,
      pageSize: 1000,
    });
    if (res?.labelInfoList?.length) {
      reasonList.value = [...res.labelInfoList]
        .filter((item) => item != null)
        .sort((a, b) => {
          const timeA = a.createTime ?? a.updateTime;
          const timeB = b.createTime ?? b.updateTime;
          if (timeA == null && timeB == null) return 0;
          if (timeA == null) return 1;
          if (timeB == null) return -1;
          const numA = typeof timeA === 'number' ? timeA : Number(timeA);
          const numB = typeof timeB === 'number' ? timeB : Number(timeB);
          if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numB - numA;
          return String(timeB).localeCompare(String(timeA));
        })
        .map((e) => ({
          label: String(e.name ?? ''),
          value: String(e.labelCode ?? ''),
        })) as ReasonItem[];
    }
  };
  const handleCreateReason = async () => {
    const reasonName = newReasonName.value.trim();
    if (!reasonName) {
      ElMessage.warning('请输入禁止处理原因');
      return;
    }
    await platformApi.platformLabelSaveLabelInfo({
      labelType: 1,
      module: 'order_Forbid_reason',
      name: reasonName,
      status: 1,
    });
    ElMessage.success('添加标签成功');
    handleLabelCancel();
    handleLabelGet();
  };

  defineExpose({
    open,
    close,
  });
</script>

<style lang="scss" scoped>
  .dialog-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .dialog-title {
      font-size: 16px;
      font-weight: 500;
      margin-right: 20px;
    }
  }

  .forbidden-content {
    min-height: 200px;
  }

  .selected-info {
    color: #606266;
    font-size: 14px;
  }

  .reason-radio-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-right: 8px;
    .reason-radio {
      display: flex;

      white-space: normal;
      word-break: break-word;
      line-height: 1.5;
      padding: 8px 0;

      :deep(.el-radio__label) {
        padding-left: 8px;
      }
    }
  }
  .forbidden-reason {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 20px 0 20px 20px;
    max-height: 400px;
    overflow: hidden;
  }
</style>

<style lang="scss">
  .create-reason-popover-popper {
    .create-reason-popover {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .popover-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    }
  }
</style>
