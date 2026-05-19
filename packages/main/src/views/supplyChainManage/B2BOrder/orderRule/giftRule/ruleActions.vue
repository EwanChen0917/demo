<template>
  <el-form
    :model="formModel"
    ref="formRef"
    label-width="160px"
    label-position="top"
    :rules="rules"
    scroll-to-error
    style="width: 100%"
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
        :schema="schema"
        ref="editLayoutRef"
        :isDetail="mode === 'detail'"
      >
        <template #actions>
          <span>设定动作</span>
          <el-form-item label="赠送方式" label-width="190px" inline required>
            <el-radio-group
              v-model="formModel.actionParams.giftType"
              :disabled="mode === 'detail'"
              @change="handleChange"
            >
              <el-radio value="ONCE">单次赠送</el-radio>
              <!-- <el-radio value="LOOP">循环赠送</el-radio>
              <el-radio value="LADDER">阶梯赠送</el-radio>
              <el-radio value="RANDOM">随机赠送</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <div
            v-if="
              formModel.actionParams.giftType === 'ONCE' ||
              formModel.actionParams.giftType === 'LOOP'
            "
          >
            <el-form-item label="触发条件" label-width="190px" inline required>
              当
              <el-select
                class="marl4"
                collapse-tags
                :max-collapse-tags="10"
                collapse-tags-tooltip
                v-model="formModel.actionParams.conditionGiftList[0].calcField"
                style="width: 150px"
                :disabled="mode === 'detail'"
              >
                <el-option value="TOTAL_VALID_QUANTITY" label="订单总数量" />
                <el-option value="TOTAL_AMOUNT" label="订单售价(不含税)" />
              </el-select>
              满
              <el-input-number
                v-model="formModel.actionParams.conditionGiftList[0].value"
                step-strictly
                :min="1"
                :max="1000000000"
                controls-position="right"
                size="default"
                maxlength="20"
                class="mar4"
                placeholder="请输入"
                style="width: 100px"
                @click.stop.prevent
                :disabled="mode === 'detail'"
              />
              送一组赠品
            </el-form-item>
            <el-form-item
              v-if="formModel.actionParams.giftType === 'LOOP'"
              label="赠送限制"
              label-width="190px"
              inline
              required
            >
              超过
              <el-input-number
                v-model="formModel.actionParams.b"
                step-strictly
                :min="1"
                :max="1000000000"
                controls-position="right"
                size="default"
                maxlength="20"
                class="mar4"
                placeholder="请输入"
                style="width: 100px"
                @click.stop.prevent
              >
                <template #suffix>
                  <span>次</span>
                </template>
              </el-input-number>
              送一组赠品
            </el-form-item>
            <el-form-item label=" 赠品组" label-width="190px" inline required>
              <renderProduct
                v-model="formModel.actionParams.conditionGiftList[0].giftPools[0]"
                :quantity="true"
                splitProduct
                append-to-body
                :disabled="mode === 'detail'"
              />
            </el-form-item>
          </div>
          <div v-if="formModel.actionParams.giftType === 'LADDER'">
            <el-form-item label="赠送限制" label-width="190px" inline required>
              <el-radio-group
                v-model="formModel.actionParams.limit"
                :disabled="mode === 'detail'"
                @change="handleChange"
              >
                <el-radio :value="1">所有规则叠加赠送</el-radio>
                <el-radio :value="2">按最高规则赠送</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="阶梯规则"
              label-width="190px"
              inline
              required
              class="flex-container"
              style
            >
              <div v-for="(item, index) in giftGroupArr" :key="item" class="w-100 formItem">
                <div class="w-100 card1">
                  规则{{ index + 1 }} : 当
                  <el-select
                    class="marl4"
                    collapse-tags
                    :max-collapse-tags="10"
                    collapse-tags-tooltip
                    v-model="formModel.actionParams.a"
                    style="width: 150px"
                  >
                    <el-option :value="1" label="订单总数量" />
                    <el-option :value="2" label="订单售价(不含税)" />
                  </el-select>
                  满
                  <el-input-number
                    v-model="formModel.actionParams.b"
                    step-strictly
                    :min="1"
                    :max="1000000000"
                    controls-position="right"
                    size="default"
                    maxlength="20"
                    class="mar4"
                    placeholder="请输入"
                    style="width: 100px"
                    @click.stop.prevent
                  />
                  送一组赠品
                  <span class="delete" @click="handleDelete(index)" v-if="giftGroupArr.length > 1">
                    移除
                  </span>
                </div>
                <div class="w-100">
                  <el-form-item label=" 赠品组" label-width="65px" inline required>
                    <renderProduct />
                  </el-form-item>
                </div>
              </div>
              <div>
                <el-button @click="handleAdd" v-if="giftGroupArr.length < 5">
                  添加阶梯规则
                </el-button>
                <span class="mergetip">
                  最多添加5个阶梯规则，不同阶梯规则必须保持一致为【订单总数量】或【订单售价（不含税）】，填写数量必须按规则依次递增
                </span>
              </div>
            </el-form-item>
          </div>
        </template>
      </EditLayout>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submitForm" :disabled="mode === 'detail'" type="primary">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import EditLayout from '../components/EditLayout.vue';
  import { useRoute } from 'vue-router';
  import { useRuleData } from './hooks/useRuleData';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  import renderProduct from '../renderCom/renderProduct.vue';

  const { formModel, schema, conditionList } = useRuleData();
  const { closeTabAndRefresh, closeCurrentTab } = useTabs();

  const rules = reactive({
    name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择规则状态', trigger: 'blur' }],
    priority: [{ required: true, message: '请输入优先级', trigger: 'blur' }],
    effectiveTimeBegin: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
    description: [{ required: false, message: '请输入规则描述', trigger: 'blur' }],
    warehouseArr: [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
    'actionParams.warehouseList': [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
  });

  const editLayoutRef = ref<any>(null);
  const route = useRoute();
  interface RuleActionsProps {
    mode: 'add' | 'detail' | 'edit';
  }
  const props = defineProps<RuleActionsProps>();
  // const isEdit = computed(() => props.mode === 'edit');
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  const formRef = ref<any>(null);
  const saveLoading = ref(false);

  const router = useRouter();
  const cancel = () => {
    closeCurrentTab();
    router.push({
      name: 'orderRule',
    });
  };

  const handleChange = (val) => {
    console.log('handleChange');
  };

  const giftGroupArr = ref([{ radioVal: '', inputVal: '', productVal: '', index: Math.random() }]);
  const handleAdd = () => {
    giftGroupArr.value.push({ radioVal: '', inputVal: '', productVal: '', index: Math.random() });
  };
  const handleDelete = (index) => {
    // console.log(index);
    giftGroupArr.value.splice(index, 1);
  };

  const areArraysEqualIgnoringOrder = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value) => arr2.includes(value));
  };
  // 提交数据
  const submitForm = async () => {
    saveLoading.value = true;
    try {
      // console.log(formModel);
      if (!editLayoutRef.value) return;
      const valid = await formRef.value?.validate();
      if (!valid) return;
      const result = await editLayoutRef.value.submitForm();
      if (!result.result) return;
      // console.log(currentKey.value, currentKey.value.length);
      if (!formModel.actionParams?.conditionGiftList[0]?.value) {
        ElMessage.warning('请输入数量');
        return;
      }
      if (formModel.actionParams?.conditionGiftList?.[0].giftPools[0].length === 0) {
        ElMessage.warning('请添加产品');
        return;
      }
      const params = cloneDeep(formModel);
      params.conditions = result.data;
      const channelListCondition = params?.conditions?.findIndex((item) => {
        // console.log(item, item?.leftSide);
        return item?.leftSide?.ref === 'order.channelList';
      });
      console.log(channelListCondition);
      if (channelListCondition < 0) {
        ElMessage.warning('请选择一个订单平台');
        return;
      } else {
        params.conditions[channelListCondition].rightSides = [
          params.conditions[channelListCondition].rightSides,
        ];
      }
      // console.log(params);
      // return;
      // for (let index = 0; index < params.conditions.length; index++) {
      //   const con = params.conditions[index];
      //   if (con?.leftSide?.ref === 'order.orderTimeMarket') {
      //     const threeVal = con?.rightSides.pop();
      //     // const threeVal = con?.rightSides[2];
      //     // console.log('threeVal', threeVal);
      //     if (threeVal) {
      //       let numCondition = {
      //         operator: 'range',
      //         leftSide: {
      //           name: '日期的数值',
      //           innerType: 'long',
      //           ref: 'order.orderTimeMarketNum',
      //         },
      //         rightSides: [
      //           {
      //             subOp: '>=',
      //             value: '0',
      //           },
      //           {
      //             subOp: '<=',
      //             value: threeVal.value,
      //           },
      //         ],
      //       };
      //       params.conditions.push(numCondition);
      //       break;
      //     }
      //   }
      // }
      // console.log('params ', params);
      if (isEdit.value) {
        await omsApi.omsRuleUpdate(params as any);
      } else {
        await omsApi.omsRuleAdd(params as any);
      }
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    } catch (error) {
      console.log(`error`, error);
    } finally {
      saveLoading.value = false;
    }
  };
  // 回显数据
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
      // console.log('key', key);
      if (key === 'orderPrice') {
        console.log(formModel[key], res[key]);
      }
    });
    const params = res;
    const numCondition = params?.conditions?.find((item) => {
      // console.log(item, item?.leftSide);
      return item?.leftSide?.ref === 'order.orderTimeMarketNum';
    });
    // console.log(numCondition);
    for (let index = 0; index < params.conditions.length; index++) {
      const con = params.conditions[index];
      // if (con?.leftSide?.ref === 'order.orderTimeMarket') {
      //   con.rightSides.push({
      //     value: numCondition?.rightSides?.[1].value,
      //     desc: '前N名付款的订单',
      //   });
      // }
      if (con?.leftSide?.ref === 'order.channelList') {
        con.rightSides = con.rightSides[0];
      }
    }
    // const channelListCondition = params?.conditions?.findIndex((item) => {
    //   // console.log(item, item?.leftSide);
    //   return item?.leftSide?.ref === 'order.channelList';
    // });
    // console.log(channelListCondition);
    // if (channelListCondition < 0) {
    //   ElMessage.warning('请选择一个订单平台');
    //   return;
    // } else {
    //   params.conditions[channelListCondition].rightSides = [
    //     params.conditions[channelListCondition].rightSides,
    //   ];
    // }
    // console.log(`formModel`, formModel);
  };
  onMounted(() => {
    // console.log(`ruleActions onMounted`, isEdit.value);
    if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
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
  .shipping {
    width: 100%;
    border: 1px solid #e5e6eb;
    border-radius: 4px;
    padding: 15px 0;
    display: flex;
    max-height: 360px;
    gap: 16px;
    &-left {
      width: 45%;
      overflow: auto;
      flex-shrink: 0;
    }
    &-right {
      width: 55%;
      padding-right: 10px;
      &-title {
        color: #1d2129;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        // font-weight: 600;
        line-height: 26px;
        padding-left: 10px;
      }
      &-item {
        line-height: 26px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #4e5969;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .flex-container {
    width: 100%;
    display: flex;
    :deep(> .el-form-item__content) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      // border: 1px solid #dadde2;
      // border-radius: 4px;
      // padding: 12px 8px;
    }
    .delete {
      float: right;
      padding: 0 10px;
      color: #02b96b;
    }
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
    border: 1px solid #dadde2;
    border-radius: 4px;
    padding: 12px 8px;
  }

  .w100 {
    width: 100%;
  }

  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }
  .mergetip {
    padding-left: 20px;
    line-height: 20px;
    margin-bottom: 12px;
    color: #999999;
    font-size: 12px;
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
