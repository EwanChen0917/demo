<template>
  <el-dialog
    v-model="visible"
    @close="close"
    width="800px"
    title="编辑库存映射"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px">
      <el-form-item label="库存地点" prop="stockCode">
        <el-input v-model="formModel.stockCode" placeholder="请输入库存地点" disabled />
      </el-form-item>
      <el-form-item label="仓库名称" prop="stockNameList">
        <el-select
          v-model="formModel.stockNameList"
          placeholder="请选择仓库名称"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in warehouseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="已选仓库" v-if="selectedTags.length > 0">
        <div class="tags-container">
          <el-tag
            v-for="tag in selectedTags"
            :key="tag.value"
            closable
            @close="handleRemoveTag(tag.value)"
          >
            {{ tag.label }}
          </el-tag>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit" :loading="saveLoading">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { cisApi } from '@/api';
  import { ElMessage, type FormInstance } from 'element-plus';
  import { useBaseOptions } from '../hooks/useBaseOptions';

  const { warehouseOptions } = useBaseOptions();
  const visible = ref(false);
  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  const formModel = ref({
    locationId: undefined,
    stockCode: '',
    shopAccount: '',
    stockNameList: [] as string[],
  });
  const emit = defineEmits(['success']);
  const rules = ref({
    stockNameList: [{ required: true, message: '请选择仓库名称', trigger: 'change' }],
  });

  const selectedTags = computed(() => {
    return warehouseOptions.value?.filter((item) =>
      formModel.value.stockNameList.includes(item.value)
    );
  });

  const handleRemoveTag = (value: string) => {
    const index = formModel.value.stockNameList.indexOf(value);
    if (index > -1) {
      formModel.value.stockNameList.splice(index, 1);
    }
  };

  const getWarehouseInfoByCode = (warehouseCodes: string[]) => {
    if (!warehouseCodes || warehouseCodes.length === 0) return [];
    return warehouseCodes
      .map((code) => {
        const warehouse = warehouseOptions.value?.find((item) => item.value === code);
        if (warehouse) {
          const [warehouseName] = warehouse.label.split('_');
          return {
            locationId: formModel.value.locationId,
            warehouseCode: code,
            warehouseName,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  const resetForm = () => {
    formModel.value = {
      locationId: undefined,
      stockCode: '',
      shopAccount: '',
      stockNameList: [],
    };
    formRef.value?.clearValidate();
  };

  const open = (row: any, shopAccount?: string) => {
    if (!row) return;
    resetForm();
    formModel.value.locationId = row.locationId;
    formModel.value.stockCode = row.name;
    formModel.value.shopAccount = shopAccount || row.shopAccount || row.userAccount || '';
    if (row.relationItemList && row.relationItemList.length > 0) {
      formModel.value.stockNameList = row.relationItemList.map((item: any) => item.warehouseCode);
    }
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
    resetForm();
  };

  const submit = async () => {
    if (saveLoading.value) return;
    try {
      const valid = await formRef.value?.validate().catch(() => {
        return false;
      });
      if (!valid) return;
      saveLoading.value = true;
      const warehouseInfoList = getWarehouseInfoByCode(formModel.value.stockNameList);
      if (warehouseInfoList.length === 0) {
        ElMessage.warning('请选择仓库名称');
        return;
      }
      await cisApi.cisInventoryShopifyLocationRelationQueryListSave({
        locationId: formModel.value.locationId,
        shopAccount: formModel.value.shopAccount,
        saveList: warehouseInfoList,
      });
      ElMessage.success('保存成功');
      emit('success');
      close();
    } catch (error) {
      ElMessage.error('保存失败');
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
    padding: 4px;
    width: 100%;
  }
</style>
