<template>
  <el-dialog
    width="900px"
    title="新增"
    v-model="visible"
    @close="visible = false"
    align-center
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="125px"
      label-position="right"
      :rules="rules"
      scroll-to-error
    >
      <el-row>
        <el-col :md="8" :sm="8">
          <el-form-item label="FBAID号：" prop="fbaId">
            <el-input v-model="form.fbaId" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8" v-if="form.shippingOrderNo">
          <el-form-item label="发货单号：">
            <!-- fbaid 为空时，发货单号有值禁用 -->
            <el-input v-model="form.shippingOrderNo" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="目的地国家：">
            <CountrySelect v-model="form.destinationCountry" placeholder="请选择目的地国家" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="发货周：">
            <el-input v-model="form.shippingWeek" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="发货日期：">
            <el-date-picker
              v-model="form.shippingDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="签收周：">
            <el-input v-model="form.receiptWeek" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="签收日期：">
            <el-date-picker
              v-model="form.receiptDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="时效：">
            <el-input v-model="form.actualDuration" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="参考时效(天)：">
            <el-input v-model="form.referenceDuration" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否查验：">
            <el-select v-model="form.isInspected" placeholder="请选择" clearable>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否延误：">
            <el-select v-model="form.isDelay" placeholder="请选择" clearable disabled>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="16" :sm="16">
          <el-form-item label="查验类型&延误原因：" label-width="180px">
            <el-input v-model="form.delayReason" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流跟踪单号：">
            <el-input v-model="form.trackingNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="转运详情：">
            <el-input v-model="form.transferInfo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流状态：" prop="shipStatus">
            <el-select v-model="form.shipStatus" placeholder="请输入" clearable>
              <el-option :value="1" label="正常在途" />
              <el-option :value="2" label="出口查验-未放行" />
              <el-option :value="3" label="进口查验-未放行" />
              <el-option :value="4" label="已签收" />
              <el-option :value="5" label="延误风险" />
              <el-option :value="6" label="丢件" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流商：">
            <el-input v-model="form.logisticsProvider" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流渠道：">
            <el-input v-model="form.transportChannel" placeholder="请输入" clearable />
            <!--            <ProductChannelSelect v-model="form.transportChannel" placeholder="请输入" clearable />-->
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流方式：">
            <el-select v-model="form.transportType" clearable filterable>
              <el-option
                v-for="item in shippingTypeBeanList"
                :key="item?.transportType"
                :value="item?.transportType"
                :label="item?.transportTypeDesc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="VAT号：">
            <el-input v-model="form.vatNo" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否递延：">
            <el-select v-model="form.isDeliveryDelay" placeholder="请选择" clearable>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="IEN：">
            <el-input v-model="form.ienNo" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <!--        <el-col :md="8" :sm="8">
          <el-form-item label="单价：">
            <el-input v-model="form.unitPrice" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="运费：">
            <el-input v-model="form.shippingFee" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="计费重：">
            <el-input v-model="form.billingWeight" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const props = defineProps<{
    shippingTypeBeanList: any[];
  }>();

  const visible = ref(false);

  const form = ref({});
  const formRef = ref(null);
  const rules = reactive({
    fbaId: [{ required: true, message: '请输入FBAID号', trigger: ['change', 'blur'] }],
    shipStatus: [{ required: true, message: '请选择物流状态', trigger: 'change' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpV2FirstLogisticsSave(form.value);
      ElMessage.success('新增成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    if (row) {
      // 差异看板没有 fbaId 的数据，需要传发货单号
      form.value = {
        shippingOrderNo: row.shippingOrderNo,
      };
    } else {
      form.value = {};
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
