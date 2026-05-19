<template>
  <el-dialog
    title="更换店铺/站点"
    v-model="visible"
    @close="visible = false"
    width="600"
    class="editShopModal"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="167px" label-position="left">
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="店铺/站点 :" prop="shopName">
            <el-select
              v-model="form.shopName"
              placeholder="请选择店铺/站点"
              clearable
              filterable
              :teleported="false"
              @change="handleShopNameChange"
            >
              <el-option
                v-for="item in shopList"
                :value="item?.shopName"
                :label="item?.shopName"
                :key="item?.shopName"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  // import useList from '@/hooks/list/useList';
  import { afterSaleApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    id: '',
    shopName: '',
  });

  const rules = reactive({
    shop: [
      {
        required: true,
        message: '请选择店铺/站点',
        trigger: ['change', 'blur'],
      },
    ],
  });
  const shopList: any = ref([]);
  const queryShopList = async (shopName) => {
    const res = await afterSaleApi.luteosAfterSaleReplacementQueryShop({
      channel: 'amazon',
      shopName,
    });
    if (res.result) {
      // console.log(res.result);
      shopList.value = res.result;
    }
  };

  const handleShopNameChange = async (item) => {};
  const open = async (item) => {
    console.log(item);
    form.value.shopName = item.shopName;
    form.value.id = item.id;
    visible.value = true;
    await queryShopList(item.shopName);
  };
  const close = () => {
    visible.value = false;
    // resetData();
  };
  // 确定按钮状态
  const loading = ref(false);
  const save = async () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    await afterSaleApi.luteosAfterSaleReplacementReplacementShop({ ...form.value });
    loading.value = false;
    ElMessage.success('更换店铺/站点成功');
    emits('success');
    close();
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped>
  :global(.keen-ui .editShopModal .el-dialog__body) {
    height: 340px;
  }
</style>
