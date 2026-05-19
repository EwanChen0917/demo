<template>
  <KeenCard>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="0" scroll-to-error>
      <el-space style="margin-bottom: 10px">
        <el-button v-if="!isEdit" type="primary" @click="bindGoodsVisible = true">
          添加产品
        </el-button>
        <span class="ms-3">客户名称：</span>
        <el-select v-model="customerCode" filterable placeholder="客户名称">
          <el-option
            v-for="item in customerList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-space>
      <el-table :data="form.cartonSizeList" row-key="skuCode">
        <el-table-column label="产品SKU" prop="skuCode" min-width="140">
          <template #default="{ row }">
            <el-form-item>
              <span>{{ row.skuCode }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="productName" min-width="160">
          <template #default="{ row }">
            <el-form-item>
              <span>{{ row.productName }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="箱规（cm）" min-width="200">
          <template #default="{ row, $index }">
            <div class="d-flex align-items-center gap-2">
              <el-form-item :prop="'cartonSizeList.' + $index + '.length'" :rules="rules.length">
                <el-input v-model="row.length" placeholder="长" />
              </el-form-item>
              <span class="mb-5">*</span>
              <el-form-item :prop="'cartonSizeList.' + $index + '.width'" :rules="rules.width">
                <el-input v-model="row.width" placeholder="宽" />
              </el-form-item>
              <span class="mb-5">*</span>
              <el-form-item :prop="'cartonSizeList.' + $index + '.height'" :rules="rules.height">
                <el-input v-model="row.height" placeholder="高" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出库类型" min-width="160">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'cartonSizeList.' + $index + '.outStockType'"
              :rules="rules.outStockType"
            >
              <el-select v-model="row.outStockType" placeholder="请选择">
                <el-option label="按件出库" :value="0" />
                <el-option label="按箱出库" :value="1" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="件数" min-width="160">
          <template #default="{ row, $index }">
            <el-form-item :prop="'cartonSizeList.' + $index + '.qty'" :rules="rules.qty">
              <el-input v-model="row.qty" placeholder="请输入" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!isEdit">
          <template #default="{ $index }">
            <el-link :underline="false" type="danger" @click="del($index)">移除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-button @click="router.go(-1)">取消</el-button>
    <el-button type="primary" :disabled="form.cartonSizeList.length === 0" @click="save">
      确定
    </el-button>
  </div>
  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    confirmText="确定"
    :selected-rows="form.cartonSizeList"
  />
</template>

<script setup lang="ts" name="cartonSizeAdd">
  import { erpApi } from '@/api';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { ElMessage, FormRules } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const props = defineProps<{
    mode: string;
  }>();

  const isEdit = computed(() => props.mode === 'edit');

  const router = useRouter();

  const customerCode = ref('');
  const customerList = ref<string[]>([]);

  const formRef = ref();
  const form = ref({
    cartonSizeList: [],
  });

  const cartonSizeInfo = window.sessionStorage.getItem('cartonSizeInfo');
  if (cartonSizeInfo) {
    form.value.cartonSizeList.push(JSON.parse(cartonSizeInfo));
    customerCode.value = JSON.parse(cartonSizeInfo)?.customerCode;
  }

  const rules = reactive<FormRules>({
    length: [{ required: true, message: '请输入长度', trigger: 'blur' }],
    width: [{ required: true, message: '请输入宽度', trigger: 'blur' }],
    height: [{ required: true, message: '请输入高度', trigger: 'blur' }],
    outStockType: [{ required: true, message: '请选择出库类型', trigger: 'change' }],
    qty: [{ required: true, message: '请输入件数', trigger: 'blur' }],
  });

  // 选择商品
  const bindGoodsVisible = ref(false);

  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.cartonSizeList = val.map((item) => {
        return {
          skuCode: item.skuCode,
          productName: item.productTitle,
          length: item.length,
          width: item.width,
          height: item.height,
          qty: item.qty,
        };
      });
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  const del = (index) => {
    form.value.cartonSizeList.splice(index, 1);
  };

  const save = async () => {
    if (!customerCode.value) {
      ElMessage.warning('请先选择客户');
      return;
    }
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    await erpApi.luteosErpCartonSizeSave({
      cartonSizeList: form.value.cartonSizeList?.map((item) => {
        return {
          ...item,
          customerCode: customerCode.value,
        };
      }),
    });
    ElMessage.success('新增成功');
    closeTabAndRefresh('cartonSize');
    router.push('/cartonSize');
  };

  const queryCustomerList = async () => {
    const res = await erpApi.luteosErpBaseB2BClientQueryList({
      pageNum: 1,
      pageSize: 500,
      status: 0,
    });
    customerList.value = res?.recordList || [];
  };
  queryCustomerList();
</script>

<style scoped lang="scss"></style>
