<template>
  <el-form :model="form" :rules="editTemplate ? formRules : []" :validate-on-rule-change="false" ref="formRef"
    label-position="left" scroll-to-error>
    <KeenCard title="基础信息" marginBottom="0" paddingY="0">
      <el-row :gutter="20" span="24">
        <el-col :span="8">
          <el-form-item label="模板名称：" prop="name" v-if="editTemplate">
            <el-input v-model="form.name" placeholder="模板名称" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="模板名称：" prop="strategyTemplateName" v-else>
            <el-input v-model="form.strategyTemplateName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道：" prop="channel">
            <el-select v-model="form.channel" clearable :disabled="!editTemplate" @change="handleChangeChannel">
              <el-option label="Amazon" value="amazon"></el-option>
              <el-option label="Shopify" value="shopify"></el-option>
              <el-option label="Walmart" value="walmart"></el-option>
              <el-option label="TikTok" value="tiktok"></el-option>
              <el-option label="Mercadocbt" value="mercadocbt"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品线：" prop="productLine">
            <ProductLineSelect v-model="form.productLine" multiple clearable :max-collapse-tags="3"
              :disabled="!editTemplate" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="优先级：" prop="priority">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="form.priority" :precision="0" :min="0" placeholder="请输入"
                :disabled="!editTemplate" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status" :disabled="!editTemplate">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="周转预警" marginBottom="0" paddingY="0">
      <el-form-item :label="`${editTemplate ? '策略：' : '模板详情'}`">
        <!-- <p v-if="editTemplate"><el-radio :value="true">安全周转天数</el-radio></p> -->
        <div style="width: 100%" class="form-detail">
          <vxe-table min-height="68px" style="margin-bottom: 20px" :data="[{ nane: '' }]">
            <vxe-column width="70%" title="安全周转天数">
              <template #default>
                <div style="display: flex; align-items: center">
                  <el-form-item :show-message="false" prop="softMinDay" style="flex: 1; margin: 0">
                    <Num v-model="form.softMinDay" :precision="0" :min="0" :max="9999" suffixIcon
                      @change="form.softMaxDay = undefined">
                      <template #suffix>D</template>
                    </Num>
                  </el-form-item>
                  <span style="flex-basis: 90px; white-space: nowrap; margin: 0 20px">
                    ≤ 周转天数 ≤
                  </span>
                  <el-form-item :show-message="false" prop="softMaxDay" style="flex: 1; margin: 0">
                    <Num v-model="form.softMaxDay" :precision="0" :min="form.softMinDay" :max="99999" suffixIcon>
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
        </div>
      </el-form-item>
    </KeenCard>
    <KeenCard marginBottom="0" paddingY="4">
      <h5 class="d-flex align-items-center">
        发货指令生成规则
        <el-tooltip content="生成方式：预警按到货时间自动生成发货指令，自动生成预计发货数量" effect="light" placement="top">
          <el-icon size="18" color="#3e97ff">
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </h5>
      <el-row :gutter="10" align="middle">
        <el-col :span="10">
          <el-form-item label="发货指令生成周数">
            <el-radio-group v-model="form.shippingCommandWeekFlag" @change="form.shippingCommandWeek = undefined">
              <el-radio :label="1">总供应周期</el-radio>
              <el-radio :label="0">自定义</el-radio>
            </el-radio-group>
            <el-form-item prop="shippingCommandWeek" :show-message="false"
              :rules="[{ required: form.shippingCommandWeekFlag === 0 }]">
              <Num style="width: 100px; margin-left: 8px" v-model="form.shippingCommandWeek" :precision="0" :min="0"
                :max="99999" suffixIcon>
                <template #suffix>W</template>
              </Num>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物流策略" prop="autoChangeLogistics">
            <el-radio-group v-model="form.autoChangeLogistics">
              <el-radio :label="0">按到货时间自动调整</el-radio>
              <el-radio :label="1">按默认</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安全周转最小天数" prop="softDay" :show-message="false" v-if="form.autoChangeLogistics === 1">
            <Num style="width: 100px" v-model="form.softDay" :precision="0" :min="0" :max="99999" suffixIcon>
              <template #suffix>D</template>
            </Num>
          </el-form-item>
        </el-col>
        <el-col v-if="form.autoChangeLogistics === 0">
          <el-form-item>
            <el-table :data="form.logisticMethodSoftDayTuple">
              <el-table-column type="index" label="序号" width="50" align="center" />
              <el-table-column label="物流方式">
                <template #default="{ row, $index }">
                  <span v-if="$index === 0">默认</span>
                  <el-form-item :prop="`logisticMethodSoftDayTuple[${$index}].code`" v-else>
                    <el-select v-model="row.code" placeholder="请选择物流方式" filterable remote no-data-text="无匹配数据"
                      :remote-method="filterLogisticType" :loading="logisticTypeLoading" @focus="filterLogisticType('')"
                      @change="handleLogisticsTypeChange(row, $index)">
                      <el-option v-for="item in filteredLogisticTypeList" :key="item.code" :label="item.name"
                        :value="item.code" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="softMinDay" label="安全周转最小天数">
                <template #default="{ row, $index }">
                  <el-form-item :prop="`logisticMethodSoftDayTuple[${$index}].softDay`" :show-message="false">
                    <Num v-model="row.softDay" :precision="0" :min="1" :max="99999" suffixIcon>
                      <template #suffix>D</template>
                    </Num>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="{ row, $index }">
                  <el-form-item>
                    <el-space gap="8">
                      <el-button type="text" size="small" @click="handleAdd(row, $index)">
                        新增
                      </el-button>
                      <el-button v-if="$index !== 0" type="text" style="color: var(--bs-danger)" size="small"
                        @click="handleDelete(row, $index)">
                        删除
                      </el-button>
                    </el-space>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="预计发货数量" marginBottom="0" paddingY="0">
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
            <el-option v-for="(val, key) in limitQtyTypeMap" :key="key" :label="val" :value="parseInt(key)" />
          </el-select>
          *
          <el-form-item label-width="0" prop="limitQtyTypeValue">
            <el-input v-model="form.limitQtyTypeValue" style="width: 150px" placeholder="请输入">
              <template #append>%</template>
            </el-input>
          </el-form-item>
        </el-space>
      </el-form-item>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-4 px-9" style="background-color: var(--bs-white)">
    <el-space>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="turnoverStrategyTemplate">
import { ref } from 'vue';
import { erpApi } from '@/api';
import { ElMessage } from 'element-plus';
import Num from '@/components/NumberInput/index.vue';
import { QuestionFilled } from '@element-plus/icons-vue';
import { priceRule } from '@/utils/rulesRegExp';
import { useTabs } from '@/hooks/tabs';

const { closeTabAndRefresh } = useTabs();
const route = useRoute();
const router = useRouter();
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

const editTemplate = route.query.turnoverCode ? false : true;
const form = ref<any>({
  code: '',
  name: '',
  strategyTemplateName: '',
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
  priority: 0,
  logisticMethodSoftDayTuple: [
    {
      code: '默认',
      name: '默认',
      site: '默认',
      softDay: 1,
    },
  ],
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
const logisticTypeList = ref<any>([]);
const filteredLogisticTypeList = ref<any>([]);
const logisticTypeLoading = ref(false);

const filterLogisticType = (query: string) => {
  logisticTypeLoading.value = true;
  if (query) {
    filteredLogisticTypeList.value = logisticTypeList.value.filter((item) => {
      const label = `${item.name}_${item.site}`.toLowerCase();
      return label.includes(query.toLowerCase());
    });
  } else {
    filteredLogisticTypeList.value = logisticTypeList.value;
  }
  console.log(`logisticTypeList`, logisticTypeList.value);
  console.log(`filteredLogisticTypeList`, filteredLogisticTypeList.value);
  logisticTypeLoading.value = false;
};

const getLogisticTypeList = async () => {
  const res = await erpApi.luteosErpPlanTurnoverLogisticsQueryList();
  logisticTypeList.value = res.planTurnOverLogisticsList || [];
};

const getDetailData = async () => {
  const res = editTemplate
    ? await erpApi.luteosErpPlanTurnoverStrategyTemplateQueryList({
      pageNum: 1,
      pageSize: 1,
      code: route.query.code,
    })
    : await erpApi.luteosErpPlanTurnoverQueryStrategyDetail({
      code: route.query.turnoverCode,
    });
  const detailData = editTemplate
    ? Array.isArray(res?.recordList)
      ? res.recordList[0] ?? {}
      : {}
    : res ?? {};
  form.value = {
    ...detailData,
    channel: detailData?.channel[0] || [],
    productLine: detailData?.productLine || [],
    logisticMethodSoftDayTuple:
      Array.isArray(detailData?.logisticMethodSoftDayTuple) &&
        detailData.logisticMethodSoftDayTuple.length > 0
        ? detailData.logisticMethodSoftDayTuple
        : [
          {
            code: '默认',
            name: '默认',
            site: '默认',
            softDay: detailData?.softDay ?? 1,
          },
        ],
  };
  if(form.value.channel && form.value.channel.length){
    console.log(`callback searchData`)
    getLogisticsMap(form.value.channel);
  
  }
  
};
onMounted(async () => {
  // await getLogisticTypeList();
  if (route.query.turnoverCode || route.query.code) {
    await getDetailData();
  }
});
const handleAdd = (row, index) => {
  form.value.logisticMethodSoftDayTuple.push({
    code: '',
    name: '',
    site: '',
    softDay: 1,
  });
};
const handleDelete = (row, index) => {
  form.value.logisticMethodSoftDayTuple.splice(index, 1);
};
const confirm = async () => {
  const valid = await formRef.value?.validate().catch(() => {
    return false; // 校验失败返回 false，不继续执行
  });
  if (valid) {
    const api = editTemplate
      ? erpApi.luteosErpPlanTurnoverStrategyTemplateSave
      : erpApi.luteosErpPlanTurnoverStrategySave;
    let params;
    if (editTemplate) {
      params = {
        ...form.value,
        channel: [form.value.channel],
      };
    } else {
      params = {
        ...form.value,
        channel: [form.value.channel],
        generationType: form.value.generationType,
        shippingCommandWeek: form.value.shippingCommandWeek,
        shippingCommandWeekFlag: form.value.shippingCommandWeekFlag,
        softMaxDay: form.value.softMaxDay,
        softMinDay: form.value.softMinDay,
        turnoverCode: route.query.turnoverCode, //自动备货-周转策略需要传
        warningWeek: form.value.warningWeek,
      };
    }
    await api({
      ...params,
      softDay:
        form.value.autoChangeLogistics === 1
          ? form.value.softDay
          : form.value.logisticMethodSoftDayTuple[0].softDay,
      logisticMethodSoftDayTuple:
        form.value.autoChangeLogistics === 1 ? [] : form.value.logisticMethodSoftDayTuple,
    });
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
    priority: 0,
  };
  formRef.value.resetFields();
  const pathName = route.query.turnoverCode ? 'turnoverDays' : 'turnoverStrategy';
  closeTabAndRefresh(pathName);
  router.push({
    name: pathName,
  });
};
const emits = defineEmits<{
  (ev: string);
}>();

// 物流方式去重校验：重复则清空并提示
const handleLogisticsTypeChange = (row, index) => {
  const val = row.code;
  if (!val) return;
  const duplicate = form.value.logisticMethodSoftDayTuple.some(
    (item, i) => i !== index && item.code === val
  );
  if (duplicate) {
    ElMessage.warning('物流方式不能重复');
    row.code = '';
  } else {
    const item = logisticTypeList.value.find((item) => item.code === val);
    row.name = item?.name;
    row.site = item?.site;
  }
};
//新增物流方式的相关逻辑
const handleChangeChannel = () => {
    //如果清空则需要清空表单内的所有物流方式
    form.value.logisticMethodSoftDayTuple.forEach(element => {
      element.code = ''
    });

  if(form.value.channel && form.value.channel.length){
    getLogisticsMap(form.value.channel);
  }
  logisticTypeList.value = []
}
const getLogisticsMap = async (channel?) => {
  const res = await erpApi.luteosErpPlanTurnoverQueryStockTimeList({
    channel,
    pageNum: 1,
    pageSize: 100,
  }) as any;
  logisticTypeList.value = res?.stockingTimeList?.map(item => {
    return {
      code: item.code,
      name: item.name + `_${item.stockSite}`,
    }
  })
  filteredLogisticTypeList.value = logisticTypeList.value;
}
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
