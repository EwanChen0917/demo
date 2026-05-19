<template>
  <el-form
    :model="formModel"
    ref="formRef"
    label-width="160px"
    label-position="top"
    :rules="commonHeaderRule"
    scroll-to-error
    style="width: 100%; height: calc(100vh - 90px - 71px); overflow: hidden"
    :disabled="mode === 'detail'"
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
      <EditLayout
        :formModel="conditionList"
        :schema="(schema as any)"
        ref="editLayoutRef"
        :isDetail="mode === 'detail'"
      >
        <template #custom-receiveCode="{ model, formModel }">
          <el-form-item :label="model.label" required prop="receiveCode">
            <renderPostCode v-model="formModel.receiveCode" />
          </el-form-item>
        </template>
        <template #actions>
          <span>设定动作</span>

          <div class="bd" v-for="(item, index) of formModel.actionParamsList" :key="index">
            <el-form-item
              label="执行动作"
              label-width="190px"
              inline
              required
              style="position: relative"
            >
              <el-radio-group
                v-model="item.splitShipped"
                :disabled="mode === 'detail'"
                @change="handleSplitShippedChange(item)"
              >
                <el-radio value="split_by_product">按产品划分</el-radio>
                <el-radio value="split_by_special_property">按属性划分</el-radio>
              </el-radio-group>
              <div style="flex-basis: 100px; line-height: 32px; position: absolute; right: 0px">
                <el-tooltip content="向上插入拆单动作" placement="top">
                  <i
                    class="iconfont icon-jiantouxiangshang"
                    style="margin-right: 10px"
                    @click="upAdd(index)"
                  ></i>
                </el-tooltip>
                <el-tooltip content="向下插入拆单动作" placement="top">
                  <i
                    class="iconfont icon-jiantouxiangxia"
                    style="margin-right: 10px"
                    @click="downAdd(index)"
                  ></i>
                </el-tooltip>
                <!-- <el-button type="primary" link @click="add" v-if="index === form.nodeList.length - 1">
                新增
              </el-button> -->
                <el-button type="danger" link v-if="index !== 0" @click="remove(index)">
                  删除
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="拆分方式" label-width="190px" inline required>
              <el-select
                v-model="item.splitActionType"
                :disabled="mode === 'detail'"
                v-if="item.splitShipped === 'split_by_product'"
              >
                <el-option v-for="(v, k) in splitActionOptions" :label="v" :value="k" />
              </el-select>
              <el-select v-model="item.splitActionType" :disabled="mode === 'detail'" v-else>
                <el-option v-for="(v, k) in splitActionOptions2" :label="v" :value="k" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="Object.keys(splitProductAdd).includes(item.splitActionType)"
              label="拆分产品"
              label-width="190px"
              inline
              required
              prop="skuList"
              :rules="[
                {
                  required: true,
                  validator: (_rule, value, callback) =>
                    skuListValidator(_rule, value, callback, item),
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <renderProduct
                v-model="item.skuList"
                :quantity="splitProductAdd[item.splitActionType]"
                splitProduct
                append-to-body
                :disabled="mode === 'detail'"
              />
            </el-form-item>
            <el-form-item
              label="拆分后动作"
              label-width="190px"
              inline
              v-if="
                item.splitShipped === 'split_by_product' &&
                item.splitActionType === 'select_product_split'
              "
            >
              <el-checkbox
                :value="1"
                v-model="item.virtualShipped"
                :true-label="1"
                :false-label="0"
                :disabled="mode === 'detail'"
              >
                拆分后子单进入"待发货"
              </el-checkbox>
            </el-form-item>
          </div>
        </template>
      </EditLayout>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submitForm" type="primary">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import EditLayout from '../components/EditLayout.vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    useSplitRuleData,
    splitActionOptions,
    splitActionOptions2,
    splitProductAdd,
  } from './hooks/useSplitRuleData';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  import { commonHeaderRule } from '../config';
  const { formModel, schema, conditionList } = useSplitRuleData();
  const { closeTabAndRefresh, closeCurrentTab } = useTabs();
  import renderPostCode from '@/views/supplyChainManage/B2BOrder/orderRule/renderCom/renderPostCode.vue';
  import renderProduct from '@/views/supplyChainManage/B2BOrder/orderRule/renderCom/renderProduct.vue';
  const editLayoutRef = ref<any>(null);
  const route = useRoute();
  const router = useRouter();
  interface RuleActionsProps {
    mode: 'add' | 'detail' | 'edit';
  }
  const props = defineProps<RuleActionsProps>();
  const isEdit = computed(() => props.mode === 'edit');
  const formRef = ref<any>(null);
  const saveLoading = ref(false);

  const skuListValidator = (_rule: any, value: any, callback: Function, item?) => {
    // console.log('skuListValidator', value, item);
    // value = formModel.actionParamsList.skuList;  // 改
    value = item?.skuList || [];
    if (!value || !Array.isArray(value) || !value.length) {
      callback(new Error('请选择订单产品'));
      return;
    }
    callback();
  };

  const upAdd = (index: any) => {
    formModel.actionParamsList.splice(index, 0, {
      splitShipped: 'split_by_product',
      splitActionType: 'each_product_num_split',
      skuList: [],
    });
    // console.log(form.value);
  };
  const downAdd = (index: any) => {
    formModel.actionParamsList.splice(index + 1, 0, {
      splitShipped: 'split_by_product',
      splitActionType: 'each_product_num_split',
      skuList: [],
    });
  };
  const remove = (index: number) => {
    formModel.actionParamsList.splice(index, 1);
  };
  const handleSplitShippedChange = (item) => {
    if (item.splitShipped === 'split_by_product') {
      item.splitActionType = 'each_product_num_split';
    } else if (item.splitShipped === 'split_by_special_property') {
      item.splitActionType = 'same_special_property_split';
    }
  };

  type splitSkuList = { sku: string; num?: string | number };
  const handleSplitChange = (actionParams) => {
    console.log('handleSplitChange', actionParams);

    if (
      !(
        actionParams.splitShipped === 'split_by_product' &&
        actionParams.splitActionType === 'select_product_split'
      )
    ) {
      // console.log('不虚拟发货', actionParams);
      actionParams.virtualShipped = 0;
    }
    if (Object.keys(splitProductAdd).includes(actionParams.splitActionType)) {
      switch (splitProductAdd[actionParams.splitActionType]) {
        case true:
          actionParams.skuList = actionParams.skuList.map((item: splitSkuList) => {
            return { sku: item.sku, num: item.num || 1 };
          });
          break;
        default:
          actionParams.skuList = actionParams.skuList.map((item: splitSkuList) => {
            return { sku: item.sku };
          });
          break;
      }
    } else {
      actionParams.skuList = [];
    }
  };

  const cancel = () => {
    closeCurrentTab();
    router.push({
      name: 'orderRule',
    });
  };
  //提交数据
  const submitForm = async () => {
    saveLoading.value = true;
    try {
      if (!editLayoutRef.value) return;
      const valid = await formRef.value?.validate();
      if (!valid) return;
      const result = await editLayoutRef.value.submitForm();
      if (!result.result) return;
      const params = cloneDeep(formModel);
      params.conditions = result.data;
      // handleSplitChange(params.actionParams);
      params.actionParamsList.map((item) => handleSplitChange(item));
      // console.log(params, 'params==');
      if (isEdit.value) {
        await omsApi.omsRuleUpdate(params as any);
      } else {
        await omsApi.omsRuleAdd(params as any);
      }
      ElMessage.success('操作成功');
      cancel();
    } catch (error) {
      console.log(`error`, error);
    } finally {
      saveLoading.value = false;
    }
  };
  //回显数据
  const initForm = async () => {
    const res: any = await omsApi.omsRuleQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    const conditions = res.conditions;
    if (!editLayoutRef.value) return;
    editLayoutRef.value.initForm(conditions);
    formModel.conditions = [];
    Object.keys(formModel).forEach((key: any) => {
      if (!res[key] && res[key] !== 0) return;
      formModel[key] = res[key];
    });
    console.log(`formModel`, formModel);
  };
  onMounted(() => {
    console.log(`ruleActions onMounted`, isEdit.value);
    if (isEdit.value || route.query.code || (route.params.type === 'copy' && route.params?.code)) {
      initForm();
    }
  });
</script>

<style lang="scss">
  .delay-condition-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;

    .delay-label {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-unit {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-formula {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
      margin-left: 8px;
    }

    .delay-operator {
      font-size: 16px;
      color: #606266;
      font-weight: 500;
      margin: 0 4px;
    }

    .delay-info-icon {
      cursor: pointer;
      margin-left: 4px;
    }
  }
</style>

<style scoped lang="scss">
  .bd {
    border: solid 1px #dfe2e6;
    width: 100%;
    border-radius: 4px;
    min-height: 100px;
    padding: 10px;
    margin: 10px;
  }
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
