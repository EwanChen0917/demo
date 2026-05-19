<template>
  <el-form
    :model="formModel"
    ref="formRef"
    :rules="rules"
    label-width="160px"
    label-position="top"
    scroll-to-error
    style="width: 100%"
    :disabled="mode === 'detail'"
    @submit.prevent
  >
    <el-row :gutter="24">
      <el-col :lg="24" :md="24" :sm="24" :offset="0">
        <div class="rule-info-container">
          <el-form-item label="规则名称" prop="name" class="custom-form-item">
            <el-input
              style="width: 100%"
              v-model="formModel.name"
              word-limit="10"
              maxlength="10"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
          </el-form-item>
          <el-form-item label="规则状态" class="custom-form-item" prop="status">
            <el-radio-group v-model="formModel.status" style="width: 100%">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级" class="custom-form-item" prop="priority">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="formModel.priority" :precision="0" :min="0" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label="生效时间" prop="effectiveTimeBegin" class="custom-form-item">
            <el-date-picker
              v-model="formModel.effectiveTimeBegin"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="规则描述" prop="description" class="custom-form-item">
            <el-input
              class="w-300px"
              v-model="formModel.description"
              word-limit="500"
              maxlength="500"
              show-word-limit
              placeholder="请输入"
              clearabled
              style="width: 100%"
            />
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 0 !important; background: white">
      <div class="dynamic-form-container">
        <!-- 左侧：字段选择 -->
        <div class="left-panel" v-if="!isDetail">
          <div class="title">基础信息</div>
          <div v-for="field in baseFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>

          <div class="title">仓库物流</div>
          <div v-for="field in warehouseFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>

          <div class="title">订单</div>
          <div v-for="field in orderFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>
          <div class="title">Shopify</div>
          <div v-for="field in shopifyFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>
        </div>
        <!-- 右侧：动态表单 -->
        <div class="right-panel">
          <div class="formItem">已选条件({{ visibleFields.length }}项)</div>
          <el-form
            :model="formModel"
            :rules="dynamicRules"
            :inline="false"
            ref="conditionFormRef"
            class="right-form"
            label-width="190px"
            :disabled="isDetail"
            @submit.prevent
          >
            <div v-if="baseFieldsMap.length">
              <span>基础信息</span>
              <el-form-item
                v-for="field in baseFieldsMap"
                :key="field.key"
                :label="field.label"
                :show-message="false"
              >
                <div v-if="field.key === 'orderPlatform'" class="select-prepend">
                  <el-select
                    v-model="formModel[field.key].operator"
                    style="width: 60px"
                    :validate-event="false"
                  >
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      :validate-event="true"
                      clearable
                      filterable
                      collapse-tags
                      collapse-tags-tooltip
                      class="rule-inner-select"
                      :max-collapse-tags="10"
                      allow-selected-option-wrap
                      multiple
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :options="channelOptions"
                    />
                  </el-form-item>
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div>
                <div v-else-if="field.key === 'orderStore'" class="select-prepend">
                  <el-select v-model="formModel[field.key].operator" style="width: 60px">
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      clearable
                      filterable
                      collapse-tags
                      collapse-tags-tooltip
                      class="rule-inner-select"
                      :max-collapse-tags="10"
                      allow-selected-option-wrap
                      multiple
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :options="shopOptions"
                    />
                  </el-form-item>
                  <!-- disabled="field.disabled" -->
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div>
                <!-- <div v-else-if="field.key === 'orderCountry'" class="select-prepend">
                  <el-select v-model="formModel[field.key].operator" style="width: 60px">
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      clearable
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      class="rule-inner-select"
                      :max-collapse-tags="3"
                      filterable
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :options="countryOptions"
                    />
                  </el-form-item>
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div> -->
              </el-form-item>
            </div>
            <div v-if="warehouseFieldsMap.length">
              <span>物流信息</span>
              <el-form-item
                v-for="field in warehouseFieldsMap"
                :key="field.key"
                :label="field.label"
              >
                <div v-if="field.key === 'receiverCountry'" class="select-prepend">
                  <el-select v-model="formModel[field.key].operator" style="width: 60px">
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      clearable
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="10"
                      allow-selected-option-wrap
                      filterable
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :options="countryOptions"
                      class="rule-inner-select"
                    />
                  </el-form-item>
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div>
                <div
                  v-else-if="field.key === 'receiverProvince' || field.key === 'receiverCity'"
                  class="flex-container"
                >
                  <div class="tips full-row">
                    支持批量复制不同分项按逗号分隔，按回车键(enter)或点击鼠标完成输入
                  </div>
                  <div class="d-flex select-prepend formItem full-row">
                    <el-select
                      v-model="formModel[field.key].operator"
                      default-first-option
                      style="width: 60px"
                    >
                      <el-option value="in" label="属于" />
                      <el-option value="!intersection" label="不属于" />
                    </el-select>
                    <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                      <renderTagInput
                        v-model="formModel[field.key].rightSides"
                        :disabled="isDetail"
                      />
                    </el-form-item>

                    <span class="tips padl15 noshrink">
                      <el-checkbox-group v-model="formModel[field.key].configs">
                        <el-checkbox label="不区分大小写" value="IN_CASE_SENSITIVE" />
                      </el-checkbox-group>
                    </span>
                  </div>
                </div>
                <div v-else-if="field.key === 'receiverCode'" class="select-prepend">
                  <renderPostCode v-model="formModel[field.key]" :disabled="isDetail" />
                </div>
                <div v-else-if="field.key === 'receiverPhone'">
                  <el-select v-model="formModel[field.key].rightSides" style="width: 160px">
                    <el-option value="2" label="其中一项不为空" />
                    <el-option value="1" label="全部不为空" />
                    <el-option value="0" label="全部为空" />
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div v-if="orderFieldsMap.length">
              <span>订单</span>
              <el-form-item
                v-for="field in orderFieldsMap"
                :key="field.key"
                :label="field.label"
                :prop="`${field.key}.rightSides`"
              >
                <div v-if="field.key === 'orderMSKU'" class="select-prepend">
                  <renderTagInput v-model="formModel[field.key].rightSides" :disabled="isDetail" />
                </div>
                <div v-else-if="field.key === 'blacklistFlag'" class="select-prepend">
                  <el-radio-group v-model="formModel[field.key].rightSides[0].value">
                    <el-radio value="1">是</el-radio>
                    <el-radio value="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div v-else-if="field.key === 'orderIOSS'" class="select-prepend">
                  <el-radio-group v-model="formModel[field.key].rightSides">
                    <el-radio value="1">是</el-radio>
                    <el-radio value="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div v-else-if="field.key === 'orderDeliveryTime'" class="select-prepend">
                  <DoubleInput v-model="formModel[field.key].rightSides as any" />
                </div>
              </el-form-item>
            </div>
            <div v-if="shopifyFieldsMap.length">
              <span>shopify</span>
              <el-form-item
                v-for="field in shopifyFieldsMap"
                :key="field.key"
                :label="field.label"
                :prop="field.key !== 'tagList' ? `${field.key}.rightSides` : ''"
              >
                <div v-if="field.key === 'orderRiskMark'">
                  <el-select
                    v-model="formModel[field.key].rightSides"
                    style="width: 260px"
                    multiple
                    clearable
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="10"
                    allow-selected-option-wrap
                  >
                    <el-option
                      v-for="item in orderRiskOptions"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                    />
                  </el-select>
                </div>
                <div v-else-if="field.key === 'CODOrder'" class="select-prepend">
                  <el-radio-group v-model="formModel[field.key].rightSides[0].value">
                    <el-radio value="true">是</el-radio>
                    <el-radio value="false">否</el-radio>
                  </el-radio-group>
                </div>
                <div v-else-if="field.key === 'tagList'" class="select-prepend">
                  <el-select v-model="formModel[field.key].operator" style="width: 60px">
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      clearable
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="10"
                      allow-selected-option-wrap
                      filterable
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :options="labelOptions"
                      class="rule-inner-select"
                    />
                  </el-form-item>
                </div>
              </el-form-item>
            </div>
            <div>
              <span>设定动作</span>
              <el-form-item
                label="生成自发货"
                class="custom-form-item-other"
                label-width="190px"
                :prop="`actionParams.autoAccept`"
              >
                <el-radio-group style="width: 100%" v-model="formModel.actionParams.autoAccept">
                  <el-radio :value="0">自动生成自发货</el-radio>
                  <el-radio :value="1">不生成自发货</el-radio>
                  <el-radio :value="2">手动生成自发货</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="关联订单标签" label-width="190px">
                <div class="d-flex align-items-center">
                  <el-button type="text" @click="handleClickChoosenTag">选择标签</el-button>
                  <el-space
                    wrap
                    style="margin-left: 8px"
                    v-if="formModel.actionParams.lableList?.length"
                  >
                    <el-tag
                      v-for="tag in formModel.actionParams.lableList as any"
                      :key="tag.labelCode || tag"
                      type="info"
                    >
                      {{ typeof tag === 'string' ? tag : tag.name }}
                    </el-tag>
                  </el-space>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save" :disabled="isDetail">
        确定
      </el-button>
    </el-space>
  </div>
  <SelfFulTagDialog
    ref="selfFulTagDialogRef"
    :tag-list="orderTagOptions"
    :selected-ids="formModel.actionParams.lableList 
      ? (Array.isArray(formModel.actionParams.lableList) 
          ? formModel.actionParams.lableList.map((item: any) => typeof item === 'string' ? item : item.labelCode)
          : [])
      : []"
    @confirm="handleConfirmTags"
  />
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import DoubleInput from './components/doubleInput.vue';
  import TagInput from './components/tagInput.vue';
  import { useBaseSelfFulFillmentOptions } from './hooks/useBaseSelfFulFillmentOptions';
  import { useBaseSelfFulFillmentConfig } from './hooks/useBaseSelfFulFillmentConfig';
  import renderPostCode from '../renderCom/renderPostCode.vue';
  import { useBaseSelfFulFillmentdata } from './hooks/useBaseSelfFulFillmentData';
  import { useRouter, useRoute } from 'vue-router';
  import renderTagInput from '../renderCom/renderTagInput.vue';
  import {
    QuestionFilled,
    InfoFilled,
    CaretTop,
    CaretBottom,
    Plus,
    Minus,
  } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import SelfFulTagDialog, { type SelectedTag } from './components/selfFulTagDialog.vue';
  const { orderRiskOptions, channelOptions, shopOptions, countryOptions, labelOptions } =
    useBaseSelfFulFillmentOptions();
  const {
    baseFields,
    warehouseFields,
    orderFields,
    shopifyFields,
    formModel,
    rules,
    visibleFields,
    baseFieldsMap,
    warehouseFieldsMap,
    orderFieldsMap,
    shopifyFieldsMap,
    selectedFields,
    dynamicRules,
  } = useBaseSelfFulFillmentConfig();
  const { customSave, customGetDetail } = useBaseSelfFulFillmentdata();
  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  interface RuleActionsProps {
    mode: 'add' | 'detail' | 'edit';
  }
  const props = defineProps<RuleActionsProps>();
  const isEdit = computed(() => props.mode === 'edit');
  const ruleType = parseInt(route.query.ruleType as string);

  const activeNames = ref([]);
  const replaceArr = ref([[]]);
  const formRef = ref(null);
  const conditionFormRef = ref(null);
  const isDetail = computed(() => props.mode === 'detail');
  // 处理回车键
  const handleEnter = (key?, field?) => {
    // 已选择的选项
    const selectedItems = ref<any[]>([]);
    const tmpArr = JSON.parse(JSON.stringify(formModel[key].rightSides));
    // 按逗号分割输入内容
    let items = <any>[];
    tmpArr?.forEach((val) => {
      if (typeof val === 'string') {
        const arr = val
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item);
        items = items.concat(arr);
      } else {
        if (val.value) {
          items.push(val.value);
        }
      }
    });
    // 添加到已选择列表
    items?.forEach((item) => {
      // 检查是否已存在
      if (!selectedItems.value.some((selected) => selected.value === item)) {
        const option = field.options.find((opt) => opt.label === item) || {
          value: item,
          label: item,
        };
        selectedItems.value.push(option);
      }
    });

    formModel[key].rightSides = selectedItems.value.filter((item) => typeof item === 'object');
  };
  // 处理输入框失去焦点
  const handleBlur = (key?, field?) => {
    handleEnter(key, field);
  };

  // 更新表单时触发
  const updateForm = () => {
    console.log('已更新字段:', selectedFields);
  };

  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'orderRule',
    });
  };

  const saveLoading = ref(false);
  const init = async () => {
    const res: any = await omsApi.omsRuleQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    res.conditions = res.conditions;
    res.actionParams = res.actionParams;
    const req = customGetDetail(res);
    if (!req) return;
    Object.keys(selectedFields).forEach((key) => {
      // 如果回显数据中有该字段，且字段有有效数据，则设置为选中
      if (req[key] && req[key].rightSides !== undefined) {
        const rightSides = req[key].rightSides;
        // 判断是否有有效数据
        const hasData = Array.isArray(rightSides)
          ? rightSides.length > 0
          : rightSides !== null && rightSides !== undefined && rightSides !== '';
        if (hasData) {
          selectedFields[key] = true;
        }
      }
    });
    Object.assign(formModel, req);
    // 如果 lableList 是 code 数组（字符串数组），自动补充 name
    if (req.actionParams?.lableList && Array.isArray(req.actionParams.lableList)) {
      const lableList = req.actionParams.lableList;
      // 检查是否是字符串数组（只有 code，没有 name）
      const isCodeArray = lableList.length > 0 && typeof lableList[0] === 'string';
      if (isCodeArray) {
        // 异步补充 name，不阻塞页面渲染
        enrichLabelListWithNames(lableList as string[]).then((enrichedList) => {
          if (formModel.actionParams?.lableList) {
            formModel.actionParams.lableList = enrichedList as any;
          }
        });
      }
    }
  };
  const save = async () => {
    try {
      const valid = await Promise.all([
        formRef.value?.validate().catch(() => false),
        conditionFormRef.value?.validate().catch(() => false),
      ]);

      if (!valid.every((e) => e)) {
        ElMessage.error('请正确填写必填项');
        return;
      }
      const req = customSave(formModel, selectedFields);
      if (!req.conditions.length) {
        ElMessage.error('请正确填写必填项');
        return;
      }
      if (!isEdit.value) {
        await omsApi.omsRuleAdd(req);
      } else {
        await omsApi.omsRuleUpdate(req);
      }

      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    } catch (e) {
      console.log(`e`, e);
    } finally {
      saveLoading.value = false;
    }
  };

  const selfFulTagDialogRef = ref<InstanceType<typeof SelfFulTagDialog>>();
  //打开关联订单标签弹窗
  const handleClickChoosenTag = () => {
    // 如果 lableList 是对象数组，提取 labelCode 数组；如果是字符串数组，直接使用
    const labelCodes = Array.isArray(formModel.actionParams.lableList)
      ? formModel.actionParams.lableList.map((item: any) =>
          typeof item === 'string' ? item : item.labelCode
        )
      : [];
    selfFulTagDialogRef.value?.open(labelCodes);
  };

  const orderTagOptions = ref<{ id: string | number; name: string; color?: string }[]>([
    { id: 'urgent', name: '紧急', color: '#f56c6c' },
    { id: 'vip', name: 'VIP', color: '#e6a23c' },
    { id: 'gift', name: '礼品', color: '#67c23a' },
  ]);

  const handleConfirmTags = (selectedTags: SelectedTag[]) => {
    if (!formModel.actionParams.lableList) return;
    // 存储包含 labelCode 和 name 的对象数组
    formModel.actionParams.lableList = selectedTags as any;
    console.log(`formModel.actionParams.lableList`, formModel.actionParams.lableList);
  };

  /**
   * 将 labelCode 数组转换为包含 name 的 SelectedTag 数组
   * 用于数据回填时，根据 code 补充 name
   */
  const enrichLabelListWithNames = async (labelCodes: string[]): Promise<SelectedTag[]> => {
    if (!Array.isArray(labelCodes) || labelCodes.length === 0) {
      return [];
    }

    try {
      // 获取标签列表
      const res = await omsApi.omsCommonSysQueryLabelList({
        pageNum: 1,
        pageSize: 100,
        module: 'oms_order',
      });
      const labelList = (res as any)?.result || (Array.isArray(res) ? res : []);
      return labelCodes
        .map((code) => {
          const label = labelList.find((item: any) => item.labelCode === code);
          return label
            ? {
                labelCode: code,
                name: label.name || code,
              }
            : {
                labelCode: code,
                name: code, // 如果找不到，使用 code 作为 name
              };
        })
        .filter((item) => item.labelCode); // 过滤掉无效的项
    } catch (error) {
      // 如果请求失败，返回只有 code 的对象数组
      return labelCodes.map((code) => ({
        labelCode: code,
        name: code,
      }));
    }
  };

  onMounted(() => {
    if (isEdit.value) {
      init();
    } else {
      if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
        init();
      }
    }
  });
</script>

<style lang="scss" scoped>
  :deep(.el-select) {
    height: auto !important;
  }
  :deep(.el-select__selection) {
    height: auto !important;
  }
  .select-prepend {
    width: 100%;
    display: flex;
    align-items: stretch;
    :deep(.el-select__selection.is-collapse) {
      flex-wrap: wrap;
    }
    :deep(> .el-select) {
      min-width: 90px !important;

      .el-select__wrapper {
        height: 100%;
        min-height: 32px;
        border-radius: 6px 0 0 6px;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset;
      }

      .el-select__wrapper.is-hovering:not(.is-focused) {
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset;
      }
    }

    :deep(> .el-select:nth-child(2)) {
      flex: 1;

      .el-select__wrapper {
        height: auto;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }

    :deep(> .rule-inner-select) {
      flex: 1;

      .el-select__wrapper {
        height: auto;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }
  }
</style>

<style scoped lang="scss">
  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .full-row {
    flex-grow: 1;
    flex-basis: 100%;
    /* 或者 width: 100%; */
  }

  .flex-row {
    display: flex;
    /* 接下来的行是弹性布局 */
  }

  .flex-row > div {
    flex: 1;
    /* 让子项也弹性分布 */
  }

  .formItem {
    margin-bottom: 12px;
  }

  .w100 {
    width: 100%;
  }

  .flex1 {
    flex: 1;
    align-items: center;
  }

  .noshrink {
    flex-shrink: 0;
  }

  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }

  .padl15 {
    padding-left: 15px;
  }

  .tips {
    font-size: 12px;
  }

  .marl4 {
    margin-left: 4px;
  }

  .mar4 {
    margin: 0 4px;
  }

  .padl6 {
    padding-left: 6px;
  }

  .padl10 {
    padding-left: 10px;
  }

  .padb20 {
    padding-bottom: 20px;
  }

  .dynamic-form-container {
    display: flex;
    height: calc(100vh - 281px);
    overflow: hidden;
    background: white;
    width: 1440px;
    margin: 0 auto;

    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }

    :deep(.el-radio__label) {
      font-size: 12px !important;
    }

    .demo-collapse {
      background: #e8f3ff;
      margin-bottom: 20px;

      .switch {
        padding-right: 5px;
      }

      .activeColor {
        color: #02b96b;
      }

      :deep(.el-collapse-item__header) {
        background-color: #e8f3ff;
      }

      :deep(.el-collapse-item__content) {
        background-color: #e8f3ff;
      }

      .bg {
        background-color: #e8f3ff;
      }

      .info-text {
        padding-left: 35px;
      }
    }

    .bg2 {
      background-color: #f7f8fa;
    }

    .houseNumber {
      padding: 16px;
      border-radius: 4px;
      // margin-bottom: 20px;
    }

    .checkItem {
      display: flex;
      align-items: center;
      line-height: 32px;
      height: 32px;
      margin-bottom: 8px;
    }

    .line {
      line-height: 32px;
    }
  }

  .left-panel {
    width: 340px;
    background: white;
    padding: 10px 5px 10px 30px;
    border-right: 1px solid #dadde2;
    overflow-y: auto;

    .title {
      flex: 1;
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 5px;
      color: #1f1f1f;
    }

    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }
  }

  .right-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;

    :deep(.right-form .el-form-item) {
      display: flex !important;
    }
  }

  .field-item {
    margin-bottom: 5px;
    width: 50%;
    display: inline-block;
    font-size: 12px !important;
  }

  .custom-form-item {
    display: flex;
    flex-direction: column;
  }

  .rule-info-container {
    padding-top: 20px;
    display: flex;
    width: 100%;
    background: white;
    gap: 20px;
    justify-content: center;
    padding: 20px 30px;
  }
</style>
