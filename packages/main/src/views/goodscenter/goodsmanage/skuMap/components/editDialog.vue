<template>
  <el-dialog width="900px" title="编辑SKU关系" v-model="visible" @close="visible = false">
    <el-form label-width="100px">
      <el-form-item label="店铺SKU：">
        <span>{{ form?.sellerSku }}</span>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺账号：">
            <span>{{ form?.userAccount }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="站点：">
            <span>{{ form?.site }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="仓库：">
        <WarehouseSelect v-model="form.warehouseCode" />
      </el-form-item>
    </el-form>
    <div class="d-flex justify-content-end">
      <el-button type="primary" size="small" @click="bindVisible = true">选择供应链SKU</el-button>
    </div>
    <el-table :data="form.skuList">
      <el-table-column label="供应链SKU" min-width="200">
        <template #default="{ row }">
          <div>{{ row?.productTitle }}</div>
          <div>
            {{ row?.productSku }}
            <Copy :content="row?.productSku" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template #default="{ row }">
          <el-input v-model="row.productSkuQty" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="建议零售价">
        <template #default="{ row }">
          <span class="me-2">{{ row?.price }}</span>
          <span>{{ row?.currency }}</span>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <BindSku
    v-if="bindVisible"
    :visible="bindVisible"
    type="supplierSku"
    selectOne
    confirmText="确定"
    @close="handleBindSkuClose"
    :selected-rows="form.skuList"
  />
</template>

<script setup lang="ts">
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { ElMessage } from 'element-plus';
  import { productApi } from '@/api';

  const emit = defineEmits(['save']);

  const visible = ref(false);
  const bindVisible = ref(false);

  const form = ref({
    skuList: [],
  });

  // 保存选择的SKU
  const handleBindSkuClose = async (reload = false, val) => {
    if (reload) {
      form.value.skuList = val
        ? [
            {
              ...val,
              productSkuQty: 1,
            },
          ]
        : [];
      bindVisible.value = false;
    } else {
      bindVisible.value = false;
    }
  };

  const save = async () => {
    if (!form.value?.skuList?.length) {
      ElMessage.warning('请选择供应链SKU');
      return;
    }
    if (!form.value?.skuList[0]?.productSkuQty) {
      ElMessage.error('请输入数量');
      return;
    }
    await productApi.luteosProductSkuMappingUpdate({
      ...form.value,
      productSku: form.value.skuList?.[0]?.productSku,
      productSkuQty: form.value.skuList?.[0]?.productSkuQty,
    });
    ElMessage.success('保存成功');
    emit('save');
    visible.value = false;
  };

  const open = (row) => {
    form.value = row;
    if (row?.productSku) {
      form.value.skuList = [
        {
          productSku: row?.productSku,
          productSkuQty: row?.productSkuQty,
          price: row?.price,
          currency: row?.currency,
          productTitle: row?.productTitle,
        },
      ];
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
