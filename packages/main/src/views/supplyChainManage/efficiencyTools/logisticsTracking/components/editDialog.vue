<template>
  <el-dialog
    width="900px"
    title="修改"
    v-model="visible"
    @close="visible = false"
    destroy-on-close
    align-center
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" label-width="125px" label-position="right" :rules="rules">
      <el-row>
        <el-col :md="8" :sm="8">
          <el-form-item label="FBAID号：">
            <el-input v-model="form.fbaId" placeholder="请输入" disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="调拨单号：">
            <el-input
              v-model="form.transferOrderNo"
              placeholder="请输入"
              clearable
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="发货单号：">
            <el-input
              v-model="form.shippingOrderNo"
              placeholder="请输入"
              clearable
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :md="8" :sm="8">
          <el-form-item label="兴运计划单号：">
            <el-input v-model="form.logisticsPlanNo" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="兴运物流单号：">
            <el-input v-model="form.logisticsOrderNo" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col> -->
        <el-col :md="8" :sm="8">
          <el-form-item label="目的地国家：">
            <CountrySelect
              v-model="form.destinationCountry"
              placeholder="请选择目的地国家"
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="发货周：">
            <el-input v-model="form.shippingWeek" placeholder="请输入" clearable disabled />
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
              :disabled-date="
                (date) => (form.receiptDate ? date > new Date(form.receiptDate) : false)
              "
              :disabled="!isBusiness"
              @change="formRef.clearValidate('delayReason')"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="签收周：">
            <el-input v-model="form.receiptWeek" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item
            label="签收日期："
            prop="receiptDate"
            :rules="{
              required: form.shipStatus === 4,
              message: '已签收状态,签收日期不能为空',
              trigger: ['change', 'blur'],
            }"
          >
            <el-date-picker
              v-model="form.receiptDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
              :disabled-date="
                (date) => (form.shippingDate ? date < new Date(form.shippingDate) : false)
              "
              @change="
                (val) => {
                  formRef.clearValidate('delayReason');
                  formRef.validateField('shipStatus');
                }
              "
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="时效：" prop="actualDuration">
            <el-input v-model="form.actualDuration" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="参考时效(天)：" prop="referenceDuration">
            <el-input v-model="form.referenceDuration" placeholder="请输入" clearable disabled />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否查验：" prop="isInspected">
            <el-select
              v-model="form.isInspected"
              placeholder="请选择"
              clearable
              @change="formRef.clearValidate('delayReason')"
            >
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否延误：" prop="isDelay">
            <el-select v-model="form.isDelay" placeholder="请选择" clearable disabled>
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否递延：">
            <el-select
              v-model="form.isDeliveryDelay"
              placeholder="请选择"
              clearable
              :disabled="!isBusiness"
            >
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="16" :sm="16">
          <el-form-item
            label="查验类型&延误原因："
            label-width="180px"
            prop="delayReason"
            :rules="{
              required: delayReasonRequired,
              trigger: ['change', 'blur'],
              validator: (rule, value, callback) => {
                if (rule.required && (!value || value === '无')) {
                  callback(new Error('值不能为空或无'));
                } else {
                  callback();
                }
              },
            }"
          >
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
            <el-select
              v-model="form.shipStatus"
              placeholder="请输入"
              clearable
              @change="
                (val) => {
                  if (val !== 4) {
                    formRef.clearValidate('receiptDate');
                  }
                  if (![2, 3].includes(val)) {
                    formRef.clearValidate('delayReason');
                  }
                }
              "
            >
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
            <el-input
              v-model="form.logisticsProvider"
              placeholder="请输入"
              clearable
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流渠道：">
            <el-input
              v-model="form.transportChannel"
              placeholder="请输入"
              clearable
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="物流方式：">
            <el-select v-model="form.transportType" clearable filterable :disabled="!isBusiness">
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
          <el-form-item label="IEN：">
            <el-input v-model="form.ienNo" placeholder="请输入" clearable :disabled="!isBusiness" />
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="平台签收日期：">
            <el-date-picker
              v-model="form.latestReceiptDate"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD HH:mm:ss"
              clearable
              :disabled="!isBusiness"
            />
          </el-form-item>
        </el-col>
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
  import { cloneDeep } from 'lodash-es';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';
  import dayjs from 'dayjs';

  const emit = defineEmits(['success']);

  const props = defineProps<{
    shippingTypeBeanList: any[];
  }>();

  const visible = ref(false);
  const isBusiness = checkPermission('trackingBusinessAuth');
  const form = ref({});
  const formRef = ref();
  const rules = reactive({
    shipStatus: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请选择物流状态'));
          } else if (form.value.receiptDate && value !== 4) {
            callback(new Error('签收日期有值,状态应为已签收'));
          } else {
            callback();
          }
        },
      },
    ],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpV2FirstLogisticsUpdate(form.value);
      ElMessage.success('编辑成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const delayReasonRequired = computed(() => {
    const {
      isInspected,
      isDelay,
      isDeliveryDelay,
      shipStatus,
      shippingDate,
      receiptDate,
      referenceDuration,
    } = form.value;
    let dateFlag = false;
    if (shippingDate && receiptDate && referenceDuration) {
      const daysDifference = dayjs(receiptDate).diff(dayjs(shippingDate), 'day') - 1;
      dateFlag = daysDifference > +referenceDuration + 5;
    }
    return isInspected === 1 || isDelay === 1 || [2, 3].includes(shipStatus) || dateFlag;
  });
  const open = (data) => {
    form.value = cloneDeep(data);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
