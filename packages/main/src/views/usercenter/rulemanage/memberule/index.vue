<template>
  <div class="card card-flush py-4">
    <div v-loading="ruleLoading" class="card-body pt-8 px-20">
      <el-form
        ref="formRef"
        :rules="rules"
        hide-required-asterisk
        :model="form"
        label-position="left"
        label-width="120px"
      >
        <template v-for="(rule, idx) in form.memberLevelRules" :key="rule.levelCode">
          <div class="row mb-7">
            <div class="col-md-10 offset-md-2">
              <h2>{{ `${rule.name}会员${rule.nameEn} Member` }}</h2>
            </div>
          </div>
          <el-form-item label="权益入口：">
            <div class="d-flex gap-4">
              <span>{{ rule.expression }}</span>
              <el-form-item
                v-if="rule.expressionType === RuleMemberExpressionType.订单金额"
                :rules="expressionValueRules(idx)"
                :prop="`memberLevelRules[${idx}].expressionValue`"
              >
                <el-input-number
                  class="w-250px text-start-input-number"
                  v-model="form.memberLevelRules![idx].expressionValue"
                  :precision="0"
                  :controls="false"
                  placeholder="请输入金额"
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item
            label="会员折扣："
            :rules="discountRules(idx)"
            :prop="`memberLevelRules[${idx}].discount`"
          >
            <div class="d-flex gap-4">
              <el-input-number
                class="w-100px text-start-input-number"
                v-model="form.memberLevelRules![idx].discount"
                :precision="0"
                :controls="false"
                placeholder="请输入折扣"
              />
              <span>%</span>
            </div>
          </el-form-item>
          <div class="mb-9"></div>
        </template>
        <div class="d-flex flex-row justify-content-end">
          <el-button @click="handleCancel" text>取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="memberule">
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormItemRule, FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { ruleApi, RuleApi } from '@/api/index';
  import { RuleMemberExpressionType, RuleMemberLevel, RuleMemberLevelCode } from '@/types/api';

  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    memberLevelRules: [
      {
        required: true,
        message: '规则不能为空',
        type: 'array',
        min: 1,
      },
    ],
  });
  const form = reactive<RuleApi.LuteosRuleUpdateMemberLevelRules.RequestBody>({
    memberLevelRules: [
      {
        expression: '完成注册',
        level: RuleMemberLevel.铜牌,
        levelCode: RuleMemberLevelCode.Bronze,
        name: RuleMemberLevel[RuleMemberLevel.铜牌],
        nameEn: 'Bronze',
      },
      {
        expression: '完成第一次购买',
        expressionType: RuleMemberExpressionType.订单数量,
        expressionValue: 1,
        level: RuleMemberLevel.银牌,
        levelCode: RuleMemberLevelCode.Silver,
        name: RuleMemberLevel[RuleMemberLevel.银牌],
        nameEn: 'Silver',
      },
      {
        expression: '完成第二次购买',
        expressionType: RuleMemberExpressionType.订单数量,
        expressionValue: 2,
        level: RuleMemberLevel.黄金,
        levelCode: RuleMemberLevelCode.Gold,
        name: RuleMemberLevel[RuleMemberLevel.黄金],
        nameEn: 'Gold',
      },
      {
        expression: '付款订单金额累计满$',
        expressionType: RuleMemberExpressionType.订单金额,
        level: RuleMemberLevel.铂金,
        levelCode: RuleMemberLevelCode.Platinum,
        name: RuleMemberLevel[RuleMemberLevel.铂金],
        nameEn: 'Platinum',
      },
      {
        expression: '付款订单金额累计满$',
        expressionType: RuleMemberExpressionType.订单金额,
        level: RuleMemberLevel.钻石,
        levelCode: RuleMemberLevelCode.Diamond,
        name: RuleMemberLevel[RuleMemberLevel.钻石],
        nameEn: 'Diamond',
      },
    ],
  });
  const expressionValueRules = (idx: number) =>
    [
      {
        required: true,
        message: '请输入金额',
      },
      {
        type: 'integer',
        min: 0,
        message: '金额不能小于0',
      },
      {
        type: 'integer',
        max: 9999999,
        message: '金额不能大于9999999',
      },
      {
        validator(_, val: number, callback) {
          const existed = form.memberLevelRules?.some(
            (item, _idx) => item.expressionValue === val && idx !== _idx
          );
          if (existed) return callback('不同等级不能设置相同金额');
          return true;
        },
      },
    ] as FormItemRule[];

  const discountRules = (idx: number) =>
    [
      {
        required: true,
        message: '请输入折扣',
      },
      {
        type: 'integer',
        min: 0,
        message: '折扣不能低于0%',
      },
      {
        type: 'integer',
        max: 100,
        message: '折扣不能超过100%',
      },
      {
        validator(_, val: number, callback) {
          const existed = form.memberLevelRules?.some(
            (item, _idx) => item.discount === val && idx !== _idx
          );
          if (existed) return callback('不同等级不能设置相同折扣');
          return true;
        },
      },
    ] as FormItemRule[];

  const {
    loading: ruleLoading,
    data: ruleData,
    refresh: refreshRule,
  } = useRequest(ruleApi.luteosRuleQueryMemberLevelRules);

  watchEffect(() => {
    const rule = ruleData.value;
    if (rule?.memberLevelRules?.length) {
      Object.assign(form, {
        memberLevelRules: form.memberLevelRules?.map((item) => {
          const existed = rule.memberLevelRules?.find(
            (existedItem) => existedItem.levelCode === item.levelCode
          );
          return {
            ...item,
            ...existed,
            expression: item.expression,
            name: item.name,
            nameEn: item.nameEn,
          };
        }),
      });
    }
  });

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      await ruleApi.luteosRuleUpdateMemberLevelRules({
        ...form,
      });

      swal.success('保存成功');

      resetForm();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    resetForm();
  };

  const resetForm = () => {
    formRef.value?.resetFields();
    refreshRule();
  };
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
</style>
