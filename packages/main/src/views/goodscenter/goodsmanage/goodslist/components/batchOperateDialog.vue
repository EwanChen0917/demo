<template>
  <el-dialog :title="title" v-model="visible" class="goods-batch-operator" @close="visible = false">
    <el-radio-group v-model="operateType">
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_update_pro_manager" class="w-150px">更新产品经理</el-radio>
        <OperatorSelect
          v-show="operateType === 'batch_update_pro_manager'"
          v-model="productManager"
          placeholder="请选择产品经理"
        />
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_update_gtm_manager" class="w-150px">更新GTM经理</el-radio>
        <DeptMember
          v-show="operateType === 'batch_update_gtm_manager'"
          v-model="gtmManager"
          placeholder="请选择GTM经理"
          title="gtm"
          clearable
          filterable
        />
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_update_planner_manager" class="w-150px">更新计划专员</el-radio>
        <DeptMember
          v-show="operateType === 'batch_update_planner_manager'"
          v-model="planner"
          :multipleLimit="20"
          placeholder="计划专员"
          deptCode="supply_planer_dept"
          clearable
        />
      </div>
      <div class="d-flex w-100 mb-3 gap-20">
        <el-radio label="batch_rel_label" class="w-150px">关联SPU标签</el-radio>
        <ProductTagSelect
          v-show="operateType === 'batch_rel_label'"
          v-model="tagCodeList"
          tagType="spu"
          placeholder="请选择标签"
          multiple
          clearable
          filterable
        />
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
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

  const operateType = ref('batch_update_pro_manager');
  const productManager = ref('');
  const planner = ref('');
  const gtmManager = ref('');
  const tagCodeList = ref([]);

  const selectedList = ref([]);
  const saveLoading = ref(false);
  const save = async () => {
    if (operateType.value === 'batch_update_pro_manager' && !productManager.value) {
      ElMessage.warning('请选择产品经理');
      return;
    }
    if (operateType.value === 'batch_update_gtm_manager' && !gtmManager.value) {
      ElMessage.warning('请选择GTM经理');
      return;
    }
    if (operateType.value === 'batch_rel_label' && !tagCodeList.value.length) {
      ElMessage.warning('请选择SPU标签');
      return;
    }
    if (operateType.value === 'batch_update_planner_manager' && !planner.value) {
      ElMessage.warning('请选择计划专员');
      return;
    }
    try {
      saveLoading.value = true;
      await productApi.luteosProductBatchOperateProduct({
        operateType: operateType.value,
        productManager: productManager.value,
        planner: Array.isArray(planner.value)
          ? planner.value
              .filter(Boolean)
              .map(String)
              .map((s) => s.trim())
              .filter(Boolean)
              .join(',')
          : (planner.value ?? '').toString().trim(),
        gtmManager: gtmManager.value,
        tagCodeList: tagCodeList.value,
        productSpuList: selectedList.value?.map((item) => item.productSpu),
      });
      ElMessage.success('操作成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (spuList: any[]) => {
    operateType.value = 'batch_update_pro_manager';
    productManager.value = '';
    planner.value = '';
    gtmManager.value = '';
    tagCodeList.value = [];
    selectedList.value = spuList;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .goods-batch-operator {
    .el-select {
      width: 230px;
    }
    .el-dialog__body {
      min-height: 400px !important;
    }
  }
</style>
