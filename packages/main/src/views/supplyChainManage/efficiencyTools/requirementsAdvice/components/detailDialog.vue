<template>
  <el-dialog title="生成需求建议" v-model="visibility" width="600px" :before-close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="需求建议名称：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入需求建议名称"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24" :offset="0">
          <el-form-item label="销售预测：" prop="forecastSaleCode">
            <el-select
              style="width: 100%"
              v-model="form.forecastSaleCode"
              filterable
              placeholder="请选择销售预测"
            >
              <el-option
                v-for="item of forecastList"
                :key="item.code"
                :label="item.code"
                :value="(item.code as string)"
              />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="24" :offset="0">
          <el-form-item label="库存节点：" prop="inventoryNodeCode">
            <el-select
              style="width: 100%"
              v-model="form.inventoryNodeCode"
              filterable
              placeholder="请选择库存节点"
            >
              <el-option
                v-for="item of snapList"
                :key="item.snapshotDate"
                :label="item.snapshotDate"
                :value="(item.snapshotDate as string)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="需求策略：">
            <div style="line-height: 20px">
              <h6 class="mb-0">在线商品平台需求数量：</h6>
              <div>在线商品预测需求数量=∑总供应周期内的销售预测数量</div>
              <div>
                在线商品平台需求数量=在线商品预测需求数量-在线商品平台库存-在线商品平台在途库存
              </div>
              <h6 class="mb-0 mt-2">产品SKU平台需求数量：</h6>
              <div>产品SKU预测需求数量=∑总供应周期内的销售预测数量</div>
              <div>产品SKU平台需求数量=产品SKU预测需求数量-产品SKU平台库存-产品SKU平台在途库存</div>
              <h6 class="mb-0 mt-2">产品SKU需求建议数量：</h6>
              <div>
                产品SKU平台需求数量汇总=∑【（产品SKU平台需求数量＞0）+（在线商品平台需求数量＞0）】
              </div>
              <div>
                产品SKU需求建议数量=产品SKU平台需求数量汇总-产品SKU中仓库存-产品SKU中仓在途库存
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="注意：">建议需求数量以产品SKU纬度展示</el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span>
        <el-button :disabled="saveLoading" @click="close">取消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, ErpContracts } from '@/api';
  import { ElMessage } from 'element-plus';
  import { ref, reactive } from 'vue';

  const visibility = ref(false);
  const form = ref({
    // forecastSaleCode: '',
    inventoryNodeCode: '',
    name: '',
  });
  const formRef = ref();
  const rules = reactive({
    forecastSaleCode: [{ required: true, message: '请选择销售预测', trigger: 'change' }],
    inventoryNodeCode: [{ required: true, message: '请选择库存节点', trigger: 'change' }],
    name: [{ required: true, message: '请输入需求建议名称', trigger: 'blur' }],
  });
  // const forecastList = ref<ErpContracts.SalesForecastAllListQueryResp[]>([]);
  const snapList = ref<ErpContracts.InventorySnapQueryResp[]>([]);
  const initDataList = async () => {
    // forecastList.value = await erpApi.luteosErpSaleForecastQueryAllList();
    snapList.value = await erpApi.luteosErpInventoryQuertSnap();
  };
  const open = (data?) => {
    if (data) {
      console.log(data);
    }
    visibility.value = true;
  };
  const close = () => {
    form.value = {
      forecastSaleCode: '',
      inventoryNodeCode: '',
      name: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  initDataList();
  const saveLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      await erpApi.luteosErpRequirementSugguestSave(form.value);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
