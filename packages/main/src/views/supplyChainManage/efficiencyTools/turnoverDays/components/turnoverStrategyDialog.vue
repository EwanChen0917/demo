<template>
  <el-dialog
    class="turnoverStrategy-dialog"
    :title="title"
    v-model="visibility"
    width="800px"
    :before-close="close"
  >
    <el-form
      :model="form"
      :rules="editTemplate ? formRules : []"
      :validate-on-rule-change="false"
      ref="formRef"
      label-width="140px"
      label-position="left"
      scroll-to-error
    >
      <el-col :span="24" :offset="0">
        <el-form-item label="模板名称：" v-if="editTemplate" prop="name">
          <el-input
            v-model="form.name"
            placeholder="模板名称"
            maxlength="100"
            show-word-limit
            :disabled="!editTemplate"
          />
        </el-form-item>
        <el-form-item label="渠道：" prop="channel">
          <el-select
            v-model="form.channel"
            multiple
            clearable
            :disabled="!editTemplate"
            :options="[
              { value: 'amazon', label: 'Amazon' },
              { value: 'shopify', label: 'Shopify' },
              { value: 'walmart', label: 'Walmart' },
              { value: 'tiktok', label: 'TikTok' },
              { value: 'mercadocbt', label: 'Mercadocbt' },
            ]"
          />
        </el-form-item>
        <el-form-item label="品线：" prop="productLine">
          <ProductLineSelect
            v-model="form.productLine"
            multiple
            clearable
            :max-collapse-tags="5"
            :disabled="!editTemplate"
          />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <div class="w-100 d-flex gap-3 align-items-center">
            <NumberInput
              v-model="form.priority"
              :precision="0"
              placeholder="请输入"
              :disabled="!editTemplate"
            />
            <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
              <el-icon size="18" color="#3e97ff">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status" :disabled="!editTemplate">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="`${editTemplate ? '策略：' : '模板详情'}`">
          <p v-if="editTemplate"><el-radio :value="true">安全周转天数</el-radio></p>
          <div style="width: 100%" class="form-detail">
            <h5>周转预警</h5>
            <vxe-table min-height="68px" style="margin-bottom: 20px" :data="[{ nane: '' }]">
              <vxe-column width="70%" title="安全周转天数">
                <template #default>
                  <div style="display: flex; align-items: center">
                    <el-form-item
                      :show-message="false"
                      prop="softMinDay"
                      style="flex: 1; margin: 0"
                    >
                      <Num
                        v-model="form.softMinDay"
                        :precision="0"
                        :min="0"
                        :max="9999"
                        suffixIcon
                        @change="form.softMaxDay = undefined"
                      >
                        <template #suffix>D</template>
                      </Num>
                    </el-form-item>
                    <span style="flex-basis: 90px; white-space: nowrap; margin: 0 20px">
                      ≤ 周转天数 ≤
                    </span>
                    <el-form-item
                      :show-message="false"
                      prop="softMaxDay"
                      style="flex: 1; margin: 0"
                    >
                      <Num
                        v-model="form.softMaxDay"
                        :precision="0"
                        :min="form.softMinDay"
                        :max="99999"
                        suffixIcon
                      >
                        <template #suffix>D</template>
                      </Num>
                    </el-form-item>
                  </div>
                </template>
              </vxe-column>
              <vxe-table-column title="周转预警周数">
                <template #default>
                  <el-form-item :show-message="false" prop="warningWeek" style="margin: 0">
                    <Num v-model="form.warningWeek" :precision="0" :min="0" :max="99999" suffixIcon>
                      <template #suffix>W</template>
                    </Num>
                  </el-form-item>
                </template>
              </vxe-table-column>
            </vxe-table>
            <h5>发货指令生成规则</h5>
            <el-form-item label="发货指令生成周数">
              <el-radio-group
                v-model="form.shippingCommandWeekFlag"
                @change="form.shippingCommandWeek = undefined"
              >
                <el-radio :label="1">总供应周期</el-radio>
                <el-radio :label="0">自定义</el-radio>
              </el-radio-group>
              <el-form-item
                prop="shippingCommandWeek"
                :show-message="false"
                :rules="[{ required: form.shippingCommandWeekFlag === 0 }]"
              >
                <Num
                  style="width: 100px; margin-left: 8px"
                  v-model="form.shippingCommandWeek"
                  :precision="0"
                  :min="0"
                  :max="99999"
                  suffixIcon
                >
                  <template #suffix>W</template>
                </Num>
              </el-form-item>
            </el-form-item>
            <el-form-item label="安全周转最小天数" prop="softDay" :show-message="false">
              <!-- :disabled="!editTemplate && !customer" -->
              <Num
                style="width: 100px"
                v-model="form.softDay"
                :precision="0"
                :min="0"
                :max="99999"
                suffixIcon
              >
                <template #suffix>D</template>
              </Num>
            </el-form-item>
            <el-form-item label="生成方式">
              预警按
              <strong>到货时间</strong>
              自动生成发货指令，自动生成预计发货数量
            </el-form-item>
            <h5>物流方式</h5>
            <el-form-item label="自动调整" prop="autoChangeLogistics">
              <el-radio-group v-model="form.autoChangeLogistics">
                <el-radio :label="0">按到货时间自动调整</el-radio>
                <el-radio :label="1">按默认</el-radio>
              </el-radio-group>
            </el-form-item>
            <h5>预计发货数量</h5>
            <el-form-item label="是否自动换算整箱" prop="autoChangeBox">
              <el-radio-group v-model="form.autoChangeBox">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否限制数量" prop="limitQty">
              <el-radio-group v-model="form.limitQty">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label-width="30">
              <el-space v-if="form.limitQty === 1">
                预计发货数量≥
                <el-select v-model="form.limitQtyType" style="width: 150px">
                  <el-option
                    v-for="(val, key) in limitQtyTypeMap"
                    :key="key"
                    :label="val"
                    :value="parseInt(key)"
                  />
                </el-select>
                *
                <el-form-item label-width="0" prop="limitQtyTypeValue">
                  <el-input
                    v-model="form.limitQtyTypeValue"
                    style="width: 150px"
                    placeholder="请输入"
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
              </el-space>
            </el-form-item>
          </div>
        </el-form-item>
      </el-col>
      <!--      <el-col :span="24" :offset="0" v-if="editTemplate">
        <el-form-item label="是否默认模板：">
          <el-checkbox
            v-model="form.isDefault"
            :true-label="1"
            :false-label="0"
            :indeterminate="false"
          />
        </el-form-item>
      </el-col>-->
    </el-form>
    <!-- v-if="editTemplate" -->
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <!-- <el-button type="primary" @click="cover">覆盖模板</el-button> -->
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import { useRouter } from 'vue-router';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { priceRule } from '@/utils/rulesRegExp';

  const limitQtyTypeMap = {
    1: '本周预测',
    2: '未来2周预测均值',
    3: '未来3周预测均值',
    4: '未来4周预测均值',
    5: '未来5周预测均值',
    6: '未来6周预测均值',
    7: '未来7周预测均值',
    8: '未来8周预测均值',
  };

  const props = defineProps({
    editTemplate: {
      type: Boolean,
      default: true,
    },
  });
  const visibility = ref(false);
  const form = ref<any>({
    code: '',
    name: '',
    shippingCommandWeekFlag: 0,
    generationType: '',
    isDefault: 0,
    isDefaultDesc: '',
    shippingCommandWeek: 0,
    softDay: 0,
    softMaxDay: 0,
    softMinDay: 0,
    warningWeek: 0,
    strategyTemplateCode: '',
    turnoverCode: '',
    channel: [],
    productLine: [],
    status: 0,
    autoChangeLogistics: 0,
    autoChangeBox: 1,
    limitQty: 0,
    limitQtyType: 1,
    limitQtyTypeValue: '',
    priority: '',
  });
  const formRef = ref();
  const formRules = reactive({
    strategyTemplateCode: [{ required: 'true', message: '请选择策略模板' }],
    name: [{ required: 'true', message: '请输入' }],
    softDay: [{ required: 'true', message: '请输入' }],
    softMinDay: [{ required: 'true', message: '请输入' }],
    softMaxDay: [{ required: 'true', message: '请输入' }],
    warningWeek: [{ required: 'true', message: '请输入' }],
    channel: [{ required: 'true', message: '请选择' }],
    productLine: [{ required: 'true', message: '请选择' }],
    status: [{ required: 'true', message: '请选择' }],
    autoChangeLogistics: [{ required: 'true', message: '请选择' }],
    limitQty: [{ required: 'true', message: '请选择' }],
    limitQtyType: [{ required: 'true', message: '请选择' }],
    limitQtyTypeValue: [
      { required: 'true', message: '请输入' },
      {
        pattern: priceRule,
        message: '请输入整数或1,2位小数',
      },
    ],
    priority: [{ required: 'true', message: '请输入' }],
  });
  const open = (row) => {
    if (row) form.value = cloneDeep(row);
    visibility.value = true;
  };
  const title = computed(() => {
    return props.editTemplate ? '编辑周转策略模板' : '周转策略';
  });
  const customer = ref(false);
  const template = ref('');
  const templateList = ref<any[]>([]);
  /* const initData = async () => {
    // 获取模板下拉选项
    templateList.value = (await erpApi.luteosErpPlanTurnoverStrategyTemplateQueryAllList()) as [];
    visibility.value = true;
  }; */
  const handleCustomChange = () => {
    const res = templateList.value.find((item) => item.code === template.value);
    if (res) {
      form.value.shippingCommandWeek = res.shippingCommandWeek;
      form.value.shippingCommandWeekFlag = res.shippingCommandWeekFlag;
      form.value.softDay = res.softDay;
      form.value.softMaxDay = res.softMaxDay;
      form.value.softMinDay = res.softMinDay;
      form.value.warningWeek = res.warningWeek;
      form.value.generationType = res.generationType;
    }
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const api = props.editTemplate
        ? erpApi.luteosErpPlanTurnoverStrategyTemplateSave
        : erpApi.luteosErpPlanTurnoverStrategySave;
      let params;
      if (props.editTemplate) {
        params = {
          ...form.value,
        };
      } else {
        params = {
          ...form.value,
          generationType: form.value.generationType,
          shippingCommandWeek: form.value.shippingCommandWeek,
          shippingCommandWeekFlag: form.value.shippingCommandWeekFlag,
          softDay: form.value.softDay,
          softMaxDay: form.value.softMaxDay,
          softMinDay: form.value.softMinDay,
          // strategyTemplateCode: customer.value ? '' : form.value.strategyTemplateCode,
          turnoverCode: form.value.turnoverCode,
          warningWeek: form.value.warningWeek,
        };
      }
      await api(params);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      code: '',
      name: '',
      shippingCommandWeekFlag: 0,
      generationType: '',
      isDefault: 0,
      isDefaultDesc: '',
      shippingCommandWeek: 0,
      softDay: 0,
      softMaxDay: 0,
      softMinDay: 0,
      warningWeek: 0,
      strategyTemplateCode: '',
      turnoverCode: '',
      channel: [],
      productLine: [],
      status: 0,
      autoChangeLogistics: 0,
      autoChangeBox: 1,
      limitQty: 0,
      limitQtyType: 1,
      limitQtyTypeValue: '',
      priority: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .turnoverStrategy-dialog {
    .form-detail {
      padding: 20px;
      width: 100%;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
    }
    h5 {
      margin-bottom: 10px;
    }
  }
</style>
