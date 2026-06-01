<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form :model="form" ref="formRef" label-width="100px">
      <el-form-item label="汇总SKU" prop="skuCode">
        <el-select
          v-model="form.skuCode"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="请输入"
          :remote-method="(query) => remoteMethod(query)"
          :loading="loading"
          @clear="skuList = []"
        >
          <el-option
            v-for="item in skuList"
            :key="item.skuCode"
            :label="`${item.skuCode}[${item.productTitle}]`"
            :value="item.skuCode"
          />
        </el-select>
      </el-form-item>
      <template v-if="mode === 'online'">
        <el-form-item label="渠道" prop="channel">
          <ProductChannelSelect v-model="form.channel" clearable placeholder="渠道" />
        </el-form-item>
        <el-form-item label="站点" prop="site">
          <ErpSiteSelect v-model="form.site" clearable :channel="form.channel" />
        </el-form-item>
      </template>
      <template v-if="mode === 'retail'">
        <el-form-item label="客户名称" prop="customerCode">
          <CustomerSelect v-model="form.customerCode" clearable placeholder="客户名称" />
        </el-form-item>
        <el-form-item label="目的仓" prop="warehouseCode">
          <WarehouseSelect v-model="form.warehouseCode" clearable />
        </el-form-item>
      </template>

      <el-form-item label="子SKU" prop="childSkuCode">
        <el-select
          v-model="form.childSkuCode"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="请输入"
          :remote-method="(query) => childRemoteMethod(query)"
          :loading="childLoading"
          @clear="childSkuList = []"
          :multiple="mode === 'retail'"
        >
          <el-option
            v-for="item in childSkuList"
            :key="item.skuCode"
            :label="`${item.skuCode}[${item.productTitle}]`"
            :value="item.skuCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';
  import CustomerSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/customerSelect.vue';
  import WarehouseSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/warehouseSelect.vue';
  import { erpApi, productApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      mode?: string;
    }>(),
    {
      mode: 'online',
    }
  );
  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const form = ref({});
  const formRef = ref();

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const api =
        props.mode === 'retail'
          ? erpApi.luteosErpPlanPrsfssSaveOrUpdate
          : erpApi.luteosErpPlanPsfssSaveOrUpdate;
      const res = await api(form.value);
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (type, editTitle, data) => {
    // remoteMethod('');
    title.value = editTitle;
    if (type === 'edit') {
      form.value = cloneDeep(data);
      remoteMethod(data.skuCode);
      const childSku = props.mode === 'online' ? data.childSku : data.childSkuCode?.join(' ');
      childRemoteMethod(childSku);
    } else {
      form.value = {};
      remoteMethod('');
      childRemoteMethod('');
    }
    visible.value = true;
  };

  // sku查询
  const skuList = ref<any>([]);
  const loading = ref(false);
  const remoteMethod = async (query: string) => {
    loading.value = true;
    skuList.value = [];
    const res: any = await productApi
      .luteosProductSkuQueryProductSkuList({
        keyWord: query,
        pageSize: 100,
        pageNum: 1,
      })
      .finally(() => {
        loading.value = false;
      });
    if (res) {
      skuList.value = res.productSkuBeanList || [];
    }
  };
  // 子sku查询
  const childSkuList = ref<any>([]);
  const childLoading = ref(false);
  const childRemoteMethod = async (query: string) => {
    childLoading.value = true;
    childSkuList.value = [];
    const res: any = await productApi
      .luteosProductSkuQueryProductSkuList({
        keyWord: query,
        pageSize: 100,
        pageNum: 1,
      })
      .finally(() => {
        childLoading.value = false;
      });
    if (res) {
      childSkuList.value = res.productSkuBeanList || [];
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
