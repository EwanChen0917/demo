<template>
  <el-dialog :title="title" v-model="visible" class="sku-batch-operator" @close="close">
    <el-radio-group v-model="operateType">
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_update" :disabled="hasDiffState">
          <div class="d-flex w-100 align-items-center gap-20">
            <span :style="{ marginRight: hasDiffState ? '32px' : '0' }">批量更新SKU状态</span>
            <span v-if="hasDiffState">选择的SKU有多种状态，暂不支持批量更新状态</span>
          </div>
        </el-radio>
        <el-select v-if="operateType === 'batch_update' && !hasDiffState" v-model="status">
          <template v-if="skuCodeList[0]?.state === 1">
            <el-option :value="2" label="在销售" />
            <el-option :value="0" label="已取消" />
          </template>
          <el-option v-if="skuCodeList[0]?.state === 2" :value="3" label="清仓中" />
          <el-option v-if="skuCodeList[0]?.state === 3" :value="4" label="已退市" />
          <el-option v-if="skuCodeList[0]?.state === 4" :value="2" label="在销售" />
        </el-select>
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_update_pro_manager">批量更新产品经理</el-radio>
        <OperatorSelect
          v-show="operateType === 'batch_update_pro_manager'"
          v-model="memberCode"
          :teleported="true"
          placeholder="请选择产品经理"
        />
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_addTag">批量关联SKU标签</el-radio>
        <ProductTagSelect
          v-show="operateType === 'batch_addTag'"
          v-model="tagCodeList"
          tagType="sku"
          placeholder="请选择标签"
          multiple
          clearable
          filterable
        />
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_sendEccang">产品信息同步易仓</el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :disabled="!operateType" v-loading="saveLoading">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const operateType = ref(null);
  const memberCode = ref('');
  const skuCodeList = ref([]);
  const tagCodeList = ref([]);
  const status = ref('');

  const hasDiffState = computed(() => {
    return skuCodeList.value.some((item) => item.state !== skuCodeList.value[0].state);
  });

  const saveLoading = ref(false);
  const save = async () => {
    if (operateType.value === 'batch_update' && !(status.value >= 0)) {
      ElMessage.warning('请选择SKU状态');
      return;
    }
    if (operateType.value === 'batch_update_pro_manager' && !memberCode.value) {
      ElMessage.warning('请选择产品经理');
      return;
    }
    if (operateType.value === 'batch_addTag' && !tagCodeList.value.length) {
      ElMessage.warning('请选择标签');
      return;
    }
    try {
      saveLoading.value = true;
      await productApi.luteosProductSkuBatchOperate({
        operateType: operateType.value,
        memberCode: memberCode.value,
        status: status.value,
        tagCodeList: tagCodeList.value,
        skuCodeList: skuCodeList.value?.map((item) => item.skuCode),
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    } finally {
      saveLoading.value = false;
    }
  };

  const close = () => {
    operateType.value = null;
    memberCode.value = '';
    skuCodeList.value = [];
    tagCodeList.value = [];
    status.value = '';
    visible.value = false;
  };

  const open = (list) => {
    operateType.value = null;
    memberCode.value = '';
    skuCodeList.value = [];
    tagCodeList.value = [];
    status.value = '';
    visible.value = true;
    skuCodeList.value = list;
    console.log(hasDiffState.value, list);
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .sku-batch-operator {
    .el-select {
      width: 230px;
    }
    .el-dialog__body {
      min-height: 400px !important;
    }
  }
</style>
