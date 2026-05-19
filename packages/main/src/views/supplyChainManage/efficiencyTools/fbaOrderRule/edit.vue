<template>
  <div class="rule-edit" v-loading="ruleEditLoading">
    <el-form
      :model="formData"
      ref="formRef"
      label-width="120px"
      label-position="right"
      scroll-to-error
      :inline="true"
      :rules="rules"
    >
      <el-form-item label="规则名称:" prop="ruleName">
        <el-input v-model="formData.ruleName" />
      </el-form-item>
      <el-form-item label="消息推送:" prop="pushType">
        <el-select
          v-model="formData.pushType"
          placeholder="请选择消息推送方式"
          style="width: 200px"
        >
          <el-option value="DING_TALK" label="钉钉" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="formData.status" placeholder="请选择" style="width: 200px">
          <el-option :value="1" label="开启" />
          <el-option :value="0" label="关闭" />
        </el-select>
      </el-form-item>
      <KeenCard title="监控设置">
        <template class="flex">
          <el-form-item label="订单类型:" prop="orderType">
            <el-select
              v-model="formData.orderType"
              placeholder="请选择订单类型"
              style="width: 200px"
            >
              <el-option :value="0" label="FBA货件" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态:" prop="platformStatus">
            <!-- <el-select
              v-model="formData.platformStatus"
              placeholder="请选择订单状态"
              style="width: 200px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              multiple
              filterable
            >
              <el-option
                v-for="item in statusList"
                :value="item"
                :label="item"
                :key="item"
              />
            </el-select> -->
            <el-select
              style="width: 200px"
              placeholder="请选择订单状态"
              v-model="formData.platformStatus"
              clearable
              multiple
              filterable
              collapse-tags
              collapse-tags-tooltip
              :options="statusList.map(item=>{
                return {
                  label: item,
                  value: item
                }
              })"
            />
          </el-form-item>
          <el-form-item label="目的仓库:" prop="targetWarehouse">
            <el-select
              v-model="formData.targetWarehouse"
              placeholder="请选择目的仓库"
              style="width: 200px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              multiple
              filterable
            >
              <el-option
                v-for="item in targetHouseList"
                :value="item.value"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </template>
        <template class="flex">
          <el-form-item label="时间参数:" prop="timeParam">
            <el-select
              v-model="formData.timeParam"
              placeholder="请选择时间参数"
              style="width: 200px"
            >
              <el-option value="CREATE_TIME" label="创建日期" />
            </el-select>
          </el-form-item>
          <el-form-item label="超期时间(天):" prop="timeoutDay">
            <el-input-number v-model="formData.timeoutDay" style="width: 200px" :min="1" />
          </el-form-item>
          <el-form-item label="通知时限(天):" prop="notificationDeadline">
            <el-input-number
              v-model="formData.notificationDeadline"
              style="width: 200px"
              :min="1"
            />
          </el-form-item>
        </template>
        <template class="flex">
          <el-form-item label="关联单据:" prop="relationOrderType">
            <el-select
              v-model="formData.relationOrderType"
              placeholder="请选择关联单据"
              @change="handleRelateDocuChange"
              style="width: 200px"
              clearable
            >
              <el-option :value="1" label="发货单" />
            </el-select>
          </el-form-item>
          <el-form-item label="关联订单状态:" prop="relationOrderStatus">
            <el-select
              v-model="formData.relationOrderStatus"
              placeholder="请选择关联订单状态"
              style="width: 200px"
              :disabled="statusMethodDisabled"
              clearable
              collapse-tags
              collapse-tags-tooltip
              multiple
            >
              <el-option
                v-for="item in relateOrderStatus"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="物流方式:" prop="relationLogisticsMethod">
            <el-select
              v-model="formData.relationLogisticsMethod"
              placeholder="请选择物流方式"
              style="width: 200px"
              :disabled="statusMethodDisabled"
              clearable
              multiple
              collapse-tags
              collapse-tags-tooltip
              filterable
            >
              <el-option
                v-for="item in logisticsMethodList"
                :value="item.value"
                :label="item.desc"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </template>
        <template class="flex">
          <el-form-item label="通知人:" prop="notifierType">
            <el-select
              v-model="formData.notifierType"
              placeholder="请选择通知人类型"
              style="width: 200px"
            >
              <el-option value="SKU_SALES" label="SKU销售负责人" />
            </el-select>
          </el-form-item>
          <el-form-item label="通知信息:" prop="notificationMessageType">
            <el-select
              v-model="formData.notificationMessageType"
              placeholder="请选择通知信息"
              style="width: 200px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              multiple
            >
              <el-option
                v-for="item in notifyInfoList"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </template>
        <template class="flex">
          <el-form-item label="通知时间:" prop="notificationTime">
            <el-select
              v-model="formData.notificationTime"
              placeholder="请选择通知时间"
              style="width: 200px"
              clearable
              collapse-tags
              collapse-tags-tooltip
              multiple
              filterable
            >
              <el-option
                v-for="item in new Array(24).fill(1).map((_, index) => {
                  return { label: `${index + 1}.`, value: `${index + 1}` };
                })"
                :value="item.value"
                :label="item.label"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="通知周期:" prop="notificationCycle">
            <el-select
              v-model="formData.notificationCycle"
              placeholder="请选择通知周期"
              style="width: 200px"
              clearable
            >
              <el-option
                v-for="item in cycleList"
                :value="item.value"
                :key="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </template>
        <!-- 通知预览 需要拼接通知信息的内容 -->
        <el-form-item label="通知预览:" prop="notificationMessage" class="flex">
          <el-input
            v-model="formData.notificationMessage"
            style="width: 700px"
            :rows="7"
            :maxlength="1000"
            type="textarea"
            placeholder="请输入"
            :show-word-limit="true"
            resize="none"
          />
        </el-form-item>
      </KeenCard>
      <div class="btn-wrap">
        <el-button @click="goBackOrder">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="fbaOrderRuleEdit">
  import { FormInstance, FormRules, ElMessage } from 'element-plus';
  import { shopApi, erpApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import {
    statusList,
    cycleList,
    relateOrderStatus,
    notifyInfoList,
    ruleForm, // formData对象结构
    targetType,
    notifyType,
    notifyInfoType,
  } from './type';

  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    getRuleInfo();
    getTargetHouseData();
    getLogisticsMethod();
    formData.value.notificationMessage = defaultPreview;
  });

  // 目的仓库
  const targetHouseList = ref<Array<targetType>>([]);
  const getTargetHouseData = async () => {
    const res = await shopApi.luteosShopSelectEcShopList({});
    targetHouseList.value = res;
  };

  // 物流方式
  const logisticsMethodList = ref<Array<targetType>>([]);
  const getLogisticsMethod = async () => {
    const res: any[] = await erpApi.luteosErpInventoryFbaShipmentMonitorTransportType();
    logisticsMethodList.value = res?.map((item) => {
      return { desc: item.smName, value: item.smCode };
    });
  };

  const handleStr = [
    'platformStatus',
    'targetWarehouse',
    'relationOrderStatus',
    'relationLogisticsMethod',
    'notificationMessageType',
    'notificationTime',
  ];

  // 请求规则详情接口
  const ruleEditLoading = ref(false);
  const { ruleId } = route.query;
  const getRuleInfo = async () => {
    if (ruleId) {
      // 编辑
      try {
        // ruleEditLoading.value = true;
        const result = await erpApi.luteosErpInventoryFbaShipmentMonitorDetail({ ruleId });
        // 赋值接口数据
        const ruleMessage: any = {
          pushType: result.pushType,
          ruleId: result.ruleId,
          ruleName: result.ruleName,
          status: result.status,
          ...result.monitorRule,
          ...result.monitorNotification,
        };
        // 将多选数据处理为数组格式
        handleStr.forEach((item) => {
          if (ruleMessage[item]) ruleMessage[item] = String(ruleMessage[item]).split(',');
          if (!ruleMessage[item]) ruleMessage[item] = [];
        });
        // 关联单据有值 放开对关联订单状态、物流方式的编辑
        if (ruleMessage.relationOrderType) statusMethodDisabled.value = false;

        // 最后赋值给表单
        formData.value = cloneDeep(ruleMessage);
      } finally {
        // ruleEditLoading.value = false;
      }
    } else {
      // 新增 恢复默认值
      formData.value = {
        orderType: 0,
        status: 1,
        notifierType: 'SKU_SALES',
        timeParam: 'CREATE_TIME',
        pushType: 'DING_TALK',
      };
    }
  };

  // 表单数据
  const formData = ref<ruleForm>({
    orderType: 0,
    status: 1,
    notifierType: 'SKU_SALES',
    timeParam: 'CREATE_TIME',
    pushType: 'DING_TALK',
  });

  // 预览的初始数据
  const defaultPreview = `@${
    notifyType[formData.value.notifierType as string]
  } \n你有一个超时订单，请处理: \n`;

  const rules = ref<FormRules<ruleForm>>({
    ruleName: [{ required: true, message: '请输入规则名称', trigger: ['blur'] }],
    orderType: [{ required: true, message: '请选择订单类型', trigger: ['blur', 'change'] }],
    timeParam: [{ required: true, message: '请选择时间参数', trigger: ['change'] }],
    notifierType: [{ required: true, message: '请选择通知人类型', trigger: ['change'] }],
    notificationTime: [{ required: true, message: '请选择通知时间', trigger: ['blur', 'change'] }],
    timeoutDay: [{ required: true, message: '请输入超期时间', trigger: ['blur'] }],
    notificationDeadline: [{ required: true, message: '请输入通知时限', trigger: ['blur'] }],
  });

  // 监听通知信息类型  对预览信息进行处理
  watch(
    () => formData.value.notificationMessageType,
    (newval: string[]) => {
      formData.value.notificationMessage = defaultPreview;
      if (!newval.length) return;
      // 通知信息类型有值
      const notifyList: Array<notifyInfoType> = [];
      newval.forEach((type) => {
        const infoObj = notifyInfoList.find((info) => type == info.value);
        notifyList.push(infoObj as notifyInfoType);
      });
      // 确保按照顺序显示字段
      notifyList
        .sort((a: notifyInfoType, b: notifyInfoType) => (a.key as number) - (b.key as number))
        .forEach((info) => {
          formData.value.notificationMessage += `【${info?.label}】\n`;
        });
    }
  );

  /** *
   * 关联单据逻辑
   */
  let statusMethodDisabled = ref(true);
  // 关联单据change
  const handleRelateDocuChange = (value: string): void => {
    // 关联单据是否有值，影响关联订单状态和物流方式是否可选，数据是否清空
    statusMethodDisabled.value = !value;
    if (!value) {
      formData.value.relationOrderStatus = [];
      formData.value.relationLogisticsMethod = [];
    }
  };

  /**
   * 功能按钮逻辑 取消 保存
   */
  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  // 取消
  const goBackOrder = () => {
    router.push({ name: 'fbaOrderRule' });
  };

  // 保存
  const submitFn = async () => {
    await formRef.value?.validate(async (valid) => {
      if (valid) {
        const params: any = cloneDeep(formData.value);
        // 对数组格式的数据进行,拼接
        for (const key in params) {
          if (typeof params[key] === 'object' && params[key]) params[key] = params[key].join(',');
        }
        try {
          saveLoading.value = true;
          await erpApi.luteosErpInventoryFbaShipmentMonitorSave(params);
          ElMessage.success('保存成功');
          setTimeout(() => {
            // 保存成功后跳回原页面 传递刷新标识
            router.push({
              name: 'fbaOrderRule',
              params: {
                refresh: 'true',
              },
            });
          }, 500);
        } finally {
          saveLoading.value = false;
        }
      }
    });
  };
</script>

<style lang="scss" scoped>
  .rule-edit {
    background-color: #fff;
    padding: 40px;
    :deep(.el-select__selection) {
      flex-wrap: nowrap;
    }
    :deep(.el-input-number) {
      .el-input__wrapper {
        padding: 1px 11px;
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        display: none;
      }
      .el-input__inner {
        text-align: left;
      }
    }
    .btn-wrap {
      width: 100%;
      text-align: center;
    }
    .flex {
      display: flex;
    }
  }
</style>
