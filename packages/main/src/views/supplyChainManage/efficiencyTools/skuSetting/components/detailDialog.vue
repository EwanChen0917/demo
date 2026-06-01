<template>
  <el-dialog
    :title="mode === 'edit' ? '编辑' : '新增'"
    v-model="visibility"
    width="400px"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-form-item v-if="mode === 'add'" label="产品SKU/产品名称：" prop="skuCode">
        <el-select
          v-model="form.skuCode"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="产品SKU名称/SKU/SPU"
          :remote-method="remoteMethod"
          :loading="loading"
          style="width: 100%"
          @clear="skuList = []"
        >
          <el-option
            v-for="item in skuList"
            :key="item.skuCode"
            :label="item.productTitle"
            :value="item.skuCode"
          />
        </el-select>
      </el-form-item>
      <template v-else>
        <el-form-item label="产品SKU：">
          {{ form.skuCode }}
        </el-form-item>
        <el-form-item label="产品名称：">
          {{ productTitle }}
        </el-form-item>
      </template>
      <el-form-item label="整箱数量：" prop="qtyBox">
        <NumberInput v-model="form.qtyBox" :precision="0" :min="1" :max="999999" disabled />
      </el-form-item>
      <el-form-item label="默认头程配送方式：" prop="logisticMethod">
        <el-select
          style="width: 100%"
          v-model="form.logisticMethod"
          placeholder="默认头程配送方式"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="person of logisticMethodList"
            :key="person.code"
            :label="person.name"
            :value="person.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="计划：" prop="plannerCode">
        <el-select
          style="width: 100%"
          v-model="form.plannerCode"
          placeholder="计划"
          filterable
          clearable
          :teleported="false"
          disabled
        >
          <el-option
            v-for="person of plannerList"
            :key="person.value"
            :label="person.label"
            :value="person.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    logisticMethodList: any[];
    plannerList: any[];
  }>();
  const productTitle = ref('');
  const visibility = ref(false);
  const form = ref({
    logisticMethod: '',
    plannerCode: '',
    qtyBox: undefined,
    skuCode: '',
  });
  const formRef = ref();
  const rules = reactive({
    logisticMethod: [{ required: true, message: '' }],
    // plannerCode: [{ required: true, message: '' }],
    // qtyBox: [{ required: true, message: '' }],
    skuCode: [{ required: true, message: '' }],
  });
  const skuList = ref<any>([]);
  const loading = ref(false);
  const remoteMethod = async (query: string) => {
    if (query.trim()) {
      loading.value = true;
      skuList.value = [];
      const res: any = await productApi
        .luteosProductSkuQueryProductSkuList({
          keyWord: query,
          pageSize: 30,
          pageNum: 1,
        })
        .finally(() => {
          loading.value = false;
        });
      if (res) {
        skuList.value = res.productSkuBeanList || [];
      }
    }
  };

  const emits = defineEmits(['success']);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpSpSkuConfigSaveOrUpdate(form.value);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const mode = ref('add');
  const open = (row?) => {
    if (row) {
      form.value = {
        logisticMethod: row.logisticMethod,
        plannerCode: row.plannerCode,
        qtyBox: row.qtyBox,
        skuCode: row.skuCode,
      };
      productTitle.value = row.productName;
      mode.value = 'edit';
    } else {
      mode.value = 'add';
    }
    visibility.value = true;
  };
  const close = () => {
    formRef.value?.resetFields();
    nextTick(() => {
      form.value = {
        logisticMethod: '',
        plannerCode: '',
        qtyBox: undefined,
        skuCode: '',
      };
      visibility.value = false;
    });
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
