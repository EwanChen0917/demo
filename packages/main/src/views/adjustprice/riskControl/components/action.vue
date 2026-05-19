<template>
  <el-form
    :model="form"
    :validate-on-rule-change="false"
    ref="formRef"
    :rules="rules"
    label-width="120px"
    v-loading="loading"
  >
    <KeenCard title="规则监控">
      <div style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="24" v-for="(rule, index) of form.rulesMonitoring" :key="index">
            <el-form-item :label="`${ruleType[rule.ruleType]}：`">
              <el-row>
                <el-col :span="24">
                  <el-select v-model="rule.ruleMode" style="width: 160px">
                    <!-- <template v-for="item in options" :key="item.value">
                      <el-option
                        v-if="rule.ruleType === 4 ? item.value > 4 : item.value < 5"
                        :label="item.label"
                        :value="item.value"
                      />
                    </template> -->
                    <template v-if="rule.ruleType === 4">
                      <el-option label="不得低于" :value="3" />
                      <el-option label="不得高于" :value="4" />
                    </template>
                    <template v-else>
                      <el-option label="不得低于现售价" :value="1" />
                      <el-option label="不得高于现售价" :value="2" />
                    </template>
                  </el-select>
                  <el-select
                    v-if="rule.ruleType !== 4"
                    v-model="rule.ruleModeSymbol"
                    style="width: 70px; margin-left: 12px"
                  >
                    <el-option label="-" :value="1" />
                    <el-option label="+" :value="2" />
                  </el-select>
                  <Num
                    placeholder="数额"
                    style="display: inline-flex; width: 140px; margin-left: 12px"
                    v-model="rule.num"
                    :max="rule.ruleModeUnit === 1 ? 999999.99 : 100"
                    :min="0"
                  />
                  <template v-if="rule.ruleType === 4">
                    <span style="margin-left: 12px">%</span>
                  </template>
                  <template v-else>
                    <el-select
                      v-model="rule.ruleModeUnit"
                      style="width: 80px; margin-left: 12px"
                      @change="
                        () => {
                          rule.num = 0;
                        }
                      "
                    >
                      <el-option label="金额" :value="1" v-if="rule.ruleType !== 4" />
                      <el-option label="%" :value="2" />
                    </el-select>
                  </template>
                  <template v-if="rule.num as number > 0">
                    <template v-if="rule.ruleType === 4">
                      <span style="margin-left: 12px">
                        比例 {{ rule.ruleMode === 3 ? '须大于等于' : '须小于等于' }}
                        {{ rule.num }} %
                      </span>
                    </template>
                    <template v-else>
                      <span style="margin-left: 12px">
                        申请售价
                        {{ (rule.ruleMode as number) === 1 ? '须大于等于' : '须小于等于' }} 现在售价
                        <template v-if="rule.ruleModeUnit === 1">
                          {{ rule.ruleModeSymbol === 1 ? '-' : '+' }} {{ rule.num }}
                        </template>
                        <template v-else>
                          * {{ rule.ruleModeSymbol === 1 ? 100 - rule.num : 100 + rule.num }}%
                        </template>
                        <!--
                        {{ rule.ruleModeUnit === 2 ? '%' : '' }} -->
                      </span>
                    </template>
                  </template>
                  <template v-else>
                    <span style="margin-left: 12px">请先输入数额</span>
                  </template>
                </el-col>
                <el-col :span="24">
                  <el-radio-group style="margin-top: 12px" v-model="rule.status">
                    <el-radio :label="0">关闭</el-radio>
                    <el-radio :label="1">开启</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </KeenCard>
    <KeenCard title="过程监控">
      <div class="mw-600px px-7">
        <p>监控实际活动到期提醒，活动结束后是否恢复售价</p>
        <p>
          <el-radio-group v-model="form.processMonitoringStatus">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </p>
      </div>
    </KeenCard>
    <KeenCard title="结果监控">
      <div class="mw-600px px-7">
        <p>监控实际调价结果执行信息</p>
        <p>
          <el-radio-group v-model="form.resultMonitoringStatus">
            <el-radio :label="0">关闭</el-radio>
            <el-radio :label="1">开启</el-radio>
          </el-radio-group>
        </p>
      </div>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <!-- <el-button @click="handleCancel">取消</el-button> -->
      <el-button type="primary" :loading="saveLoading" @click="handleSaveSubmit">保存</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { priceApi, PriceContracts } from '@/api';
  import Num from '@/components/NumberInput/index.vue';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{ platform: number }>();
  const form = ref<PriceContracts.PriceRuleSaveReq>({
    platform: 1,
    processMonitoringStatus: 1,
    resultMonitoringStatus: 0,
    rulesMonitoring: [],
  });
  const ruleType = {
    1: '涨价规则',
    2: '降价规则',
    3: '秒杀规则',
    4: '比例规则',
  };
  const options = ref([
    {
      label: '不得低于现在售价',
      value: 1,
    },
    {
      label: '不得高于现在售价',
      value: 2,
    },
    {
      label: '不得低于',
      value: 3,
    },
    {
      label: '不得高于',
      value: 4,
    },
  ]);
  const rules = reactive({});
  const loading = ref(true);
  const saveLoading = ref(false);
  const initData = async () => {
    loading.value = true;
    const res = await priceApi
      .luteosPriceQueryPriceRule({
        platform: props.platform as number,
        selectType: 2,
      })
      .finally(() => {
        loading.value = false;
      });
    form.value = res;
  };
  initData();
  const handleCancel = () => {};
  const handleSaveSubmit = async () => {
    if (form.value.rulesMonitoring.some((item) => typeof item.num !== 'number')) {
      ElMessage.warning('请输入规则数值');
    } else {
      saveLoading.value = true;
      await priceApi.luteosPriceSavePriceRule(form.value).finally(() => {
        saveLoading.value = false;
      });
      ElMessage.success('操作成功');
      initData();
    }
  };
</script>

<style scoped lang="scss"></style>
