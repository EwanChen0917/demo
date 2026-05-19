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
          <el-form-item label="合并方式" label-width="190px" inline required>
            <el-radio-group
              v-model="formModel.actionParams.checkInventory"
              :disabled="mode === 'detail'"
            >
              <el-radio :value="1">合并订单</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="mergetip">
            合单维度设置（系统自动筛选合单维度完全相同的订单为“可合单”的单据）
          </div>
          <el-form-item label="默认维度" label-width="190px" inline required>
            <el-checkbox-group v-model="formModel.actionParams.checked" disabled>
              <el-checkbox :value="1">订单平台</el-checkbox>
              <el-checkbox :value="2">订单店铺</el-checkbox>
              <el-checkbox :value="3">收件人信息（姓名、电话、邮箱）</el-checkbox>
              <el-checkbox :value="4">
                收件地址信息（国家、省/州、城市、区/县、详细地址）
              </el-checkbox>
              <el-checkbox :value="5">发货仓库</el-checkbox>
              <el-checkbox :value="6">物流渠道</el-checkbox>
              <el-checkbox :value="7">物流渠道</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="可选维度" label-width="190px" inline required>
            <el-checkbox-group v-model="formModel.actionParams.canCheck">
              <el-checkbox :value="7">订单站点</el-checkbox>
              <el-checkbox :value="8">买家姓名</el-checkbox>
              <el-checkbox :value="9">买家邮箱</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
      </EditLayout>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submitForm" :disabled="mode === 'detail'">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import EditLayout from '../components/EditLayout.vue';
  import { useRoute } from 'vue-router';
  import { useMergeRuleData } from './hooks/useMergeRuleData';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  const { formModel, schema, conditionList } = useMergeRuleData();
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

  const areArraysEqualIgnoringOrder = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value) => arr2.includes(value));
  };
  // 提交数据
  const submitForm = async () => {
    saveLoading.value = true;
    try {
      if (!editLayoutRef.value) return;
      const valid = await formRef.value?.validate();
      if (!valid) return;
      const result = await editLayoutRef.value.submitForm();
      if (!result.result) return;
      // console.log(currentKey.value, currentKey.value.length);
      if (currentKey.value.length === 0) {
        ElMessage.warning('请选择发货仓');
        return;
      }
      // formModel.actionParams.warehouseList = checkedKeys.value;
      if (formModel.actionParams.warehouseList.length === 0) {
        ElMessage.warning('请选择物流渠道');
        return;
      }
      if (currentKey.value.length !== formModel.actionParams.warehouseList.length) {
        ElMessage.warning('发货仓与物流渠道不匹配');
        return;
      }
      const warehouseArr = currentKey.value.map((item) => item.warehouseCode);
      const shippingArr = formModel.actionParams.warehouseList.map(
        (item: any) => item.warehouseCode
      );
      if (!areArraysEqualIgnoringOrder(warehouseArr, shippingArr)) {
        ElMessage.warning('发货仓与物流渠道不匹配');
        return;
      }
      const params = cloneDeep(formModel);
      params.conditions = result.data;
      // console.log('params ', params, currentKey.value);
      const sortArr = currentKey.value.map((item) => {
        const index = params.actionParams.warehouseList.findIndex(
          (item2: any) => item2.warehouseCode === item.warehouseCode
        );
        return params.actionParams.warehouseList[index];
      });
      // console.log('sortArr ', sortArr);
      params.actionParams.warehouseList = sortArr;
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

  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }
  .mergetip {
    padding-left: 124px;
    line-height: 20px;
    margin-bottom: 12px;
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
