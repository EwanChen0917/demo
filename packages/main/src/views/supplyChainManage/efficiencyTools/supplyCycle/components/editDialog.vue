<template>
  <el-dialog :title="title" v-model="visibility" width="800px" :before-close="close">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      :validate-on-rule-change="false"
      label-position="top"
    >
      <el-row :gutter="20">
        <template v-if="form.code">
          <el-col :span="12" :offset="0">
            <el-form-item label="总供应周期（天）">
              <Num :modelValue="totalCycle" disabled :precision="0" suffixIcon>
                <template #suffix>天</template>
              </Num>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="总供应周期（周）">
              <Num :modelValue="Math.floor(totalCycle / 7)" disabled :precision="0" suffixIcon>
                <template #suffix>周</template>
              </Num>
            </el-form-item>
          </el-col>
        </template>
        <template v-else>
          <el-col :span="12" :offset="0">
            <el-form-item label="选择供应链SKU" prop="supplySku">
              <el-select
                style="width: 100%"
                v-model="form.supplySku"
                clearable
                filterable
                @change="handleChange"
              >
                <el-option
                  v-for="item in dickbook.supplySkuList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="选择渠道" prop="channel">
              <el-select
                style="width: 100%"
                v-model="form.channel"
                filterable
                @change="handleChange"
              >
                <el-option
                  v-for="item in dickbook.plan_cycle_channel"
                  :key="item.value"
                  :label="item.desc"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="选择国家" prop="country">
              <el-select
                style="width: 100%"
                v-model="form.country"
                filterable
                @change="handleChange"
              >
                <el-option
                  v-for="item in dickbook.countryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="选择在线商品编码" prop="originalPlatformMark">
              <el-select
                v-loading="selectLoading"
                style="width: 100%"
                v-model="form.originalPlatformMark"
                filterable
              >
                <el-option
                  v-for="item in originalPlatformMarkList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </template>

        <el-col :span="12" :offset="0">
          <el-form-item label="供应商交期">
            <Num
              v-model="form.supplierHandleOverDay"
              :precision="0"
              :min="0"
              :max="99999"
              suffixIcon
            >
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="订单处理时间">
            <Num v-model="form.orderHandleOverDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="国内运输时间">
            <Num v-model="form.domesticShipDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="验货+入库时间">
            <Num v-model="form.qcHandleDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="海外物流时间">
            <Num v-model="form.seaOverDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="接收上架时间">
            <Num v-model="form.receiveListingDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="周转+安全库存">
            <Num v-model="form.trunOverDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>天</template>
            </Num>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span>
        <el-button :disabled="saveLoading" @click="close">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import { erpApi } from '@/api';

  defineProps({
    dickbook: {
      type: Object,
      default() {
        return {
          plan_cycle_channel: [],
          countryList: [],
          supplySkuList: [],
        };
      },
    },
  });
  const visibility = ref(false);
  const title = computed(() => {
    return `${form.value.code ? '编辑' : '新增'}供应周期`;
  });
  const form = ref({
    channel: '',
    code: '',
    country: '',
    domesticShipDay: 0,
    orderHandleOverDay: 0,
    originalPlatformMark: '',
    qcHandleDay: 0,
    receiveListingDay: 0,
    seaOverDay: 0,
    supplierHandleOverDay: 0,
    supplySku: '',
    trunOverDay: 0,
  });
  const formRef = ref<FormInstance>();
  const rules = ref({
    channel: [{ required: true, message: '请输入' }],
    supplySku: [{ required: true, message: '请输入' }],
    country: [{ required: true, message: '请输入' }],
    originalPlatformMark: [{ required: true, message: '请输入' }],
  });
  const totalCycle = computed(() => {
    return (
      form.value.domesticShipDay +
      form.value.orderHandleOverDay +
      form.value.qcHandleDay +
      form.value.receiveListingDay +
      form.value.seaOverDay +
      form.value.supplierHandleOverDay +
      form.value.trunOverDay
    );
  });
  const originalPlatformMarkList = ref<any[]>([]);
  const selectLoading = ref(false);
  const queryPlatfromSkuIdentify = async () => {
    selectLoading.value = true;
    // const res = await productApi
    //   .luteosProductQueryPlatfromSkuIdentify({
    //     channel: form.value.channel,
    //     country: form.value.country,
    //     supplySku: form.value.supplySku,
    //   })
    const res = await erpApi
      .luteosErpPlanSupplyCycleQueryPlatfromSkuIdentify({
        channel: form.value.channel,
        country: form.value.country,
        supplySku: form.value.supplySku,
      })
      .finally(() => {
        selectLoading.value = false;
      });
    originalPlatformMarkList.value = (res as []) || [];
  };
  const handleChange = () => {
    form.value.originalPlatformMark = '';
    if (form.value.channel && form.value.country && form.value.supplySku) {
      queryPlatfromSkuIdentify();
    }
  };
  const saveLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      await erpApi.luteosErpPlanSupplyCycleSave(form.value).finally(() => {
        saveLoading.value = false;
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  const open = (data?) => {
    if (data) {
      form.value = data;
    }
    visibility.value = true;
  };
  const close = () => {
    form.value = {
      channel: '',
      code: '',
      country: '',
      domesticShipDay: 0,
      orderHandleOverDay: 0,
      originalPlatformMark: '',
      qcHandleDay: 0,
      receiveListingDay: 0,
      seaOverDay: 0,
      supplierHandleOverDay: 0,
      supplySku: '',
      trunOverDay: 0,
    };
    formRef.value?.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
