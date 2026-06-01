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
        <template v-for="group in ruleGroups" :key="group.title">
          <div class="row mb-7">
            <div class="col-md-10 offset-md-2">
              <h2>{{ group.title }}</h2>
            </div>
          </div>
          <div
            v-for="rule in group.children"
            :key="rule.eventType"
            class="d-flex"
            :class="{
              'flex-column': group.children.length === 1,
              'gap-20': group.children.length > 1,
            }"
          >
            <el-form-item
              :label="`${group.children.length > 1 ? rule.ruleName : '状态'}：`"
              :rules="statusRules"
              :prop="`pointRules[${rule.idx}].status`"
            >
              <el-radio-group v-model="form.pointRules![rule.idx].status">
                <el-radio :label="RulePointStatus.开启">开启</el-radio>
                <el-radio :label="RulePointStatus.关闭">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="获得积分："
              :rules="pointRules"
              :prop="`pointRules[${rule.idx}].point`"
            >
              <el-input-number
                class="w-250px text-start-input-number"
                v-model="form.pointRules![rule.idx].point"
                :precision="0"
                :controls="false"
                placeholder="请输入整数值"
              />
              <span v-if="rule.eventType === RulePointEventType.下单" class="ms-8">* 订单金额</span>
              <span v-if="rule.eventType === RulePointEventType.忠实积分奖励" class="ms-8">
                （每一笔订单）
              </span>
            </el-form-item>
          </div>
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

<script lang="ts" setup name="pointrule">
  import { useRequest } from 'vue-request';
  import { groupBy, omit } from 'lodash-es';
  import type { FormInstance, FormItemRule, FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { ruleApi, RuleApi } from '@/api/index';
  import { RulePointEventType, RulePointStatus } from '@/types/api';

  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    pointRules: [
      {
        required: true,
        message: '规则不能为空',
        type: 'array',
        min: 1,
      },
    ],
  });
  const form = reactive<RuleApi.LuteosRuleUpdatePointRules.RequestBody>({
    pointRules: [],
  });
  const statusRules = reactive<FormItemRule[]>([
    {
      required: true,
      message: '请选择状态',
    },
  ]);

  const pointRules = reactive<FormItemRule[]>([
    {
      required: true,
      message: '积分不能为空',
    },
    {
      type: 'integer',
      min: 0,
      message: '积分不能小于0',
    },
    {
      type: 'integer',
      max: 9999999,
      message: '积分不能大于9999999',
    },
  ]);

  const {
    loading: ruleLoading,
    data: ruleData,
    refresh: refreshRule,
  } = useRequest(ruleApi.luteosRuleQueryPointRules);

  watchEffect(() => {
    const rule = ruleData.value;
    if (rule?.pointRules?.length) {
      Object.assign(form, {
        pointRules: rule.pointRules,
      });
    }
  });

  const ruleGroups = computed(() => {
    const eventTypeGroup = groupBy(
      form.pointRules?.map((item, idx) => {
        const isGroup = [
          RulePointEventType.Facebook,
          RulePointEventType.Instagram,
          RulePointEventType.Pinterest,
        ].includes(item.eventType!);

        return {
          ...item,
          ruleName: isGroup ? RulePointEventType[item.eventType!] : item.ruleName,
          idx,
          group: isGroup ? RulePointEventType.关注社媒 : item.eventType,
        };
      }),
      'group'
    );

    return Object.entries(eventTypeGroup)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([key, children]) => ({
        title: RulePointEventType[key],
        children: children.map((rule) => omit(rule, 'group')),
      }));
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

      await ruleApi.luteosRuleUpdatePointRules({
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
