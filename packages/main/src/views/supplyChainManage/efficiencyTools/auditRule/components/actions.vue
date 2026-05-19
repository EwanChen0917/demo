<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :lg="7" :md="12" :sm="24" :offset="0">
        <KeenCard title="审核流信息">
          <el-form-item label="审核流名称" prop="baseInfo.name">
            <el-input v-model="form.baseInfo.name" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.baseInfo.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="form.baseInfo.priority" :precision="0" :min="0" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
          <!-- 审核方式下拉框，系统审核、钉钉审核 -->
          <el-form-item label="审核方式" prop="baseInfo.auditType">
            <el-select v-model="form.baseInfo.auditType">
              <el-option label="系统审核" :value="1" />
              <el-option label="钉钉审核" :value="2" v-if="form.baseInfo.type !== 3" />
            </el-select>
          </el-form-item>

          <!--          <el-form-item label="单据类型" v-if="form.baseInfo.type !== 3">
            <el-select v-model="form.baseInfo.type" style="width: 100%" @change="initField">
              <el-option :value="2" label="申购单" />
              <el-option :value="3" label="销售预测" />
            </el-select>
          </el-form-item>-->
        </KeenCard>
        <KeenCard title="选择条件">
          <el-form
            :model="form"
            ref="conditionFormRef"
            label-position="left"
            label-width="150px"
            scroll-to-error
          >
            <el-form-item
              v-for="(item, index) of form.conditionList"
              :key="item.nameCode"
              :prop="`conditionList[${index}].value`"
              :rules="item.status === 0 ? [{ required: true, message: '请选择' }] : []"
            >
              <template #label>
                <div>
                  <el-checkbox
                    v-model="item.status"
                    :true-label="0"
                    :false-label="1"
                    :indeterminate="false"
                    @change="handleCheckChange(item, index)"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </div>
              </template>
              <template v-if="item.selectValueListIsTree">
                <el-cascader
                  style="width: 100%"
                  :options="item.selectValueList"
                  v-model="item.value"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  @change="(val) => handleSelectChange(val, item)"
                  :show-all-levels="false"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'desc',
                    children: 'childrenList',
                    multiple: item.type === 1,
                    checkStrictly: item?.checkStrictly,
                    emitPath: false,
                  }"
                />
              </template>
              <el-select
                v-else
                style="width: 100%"
                v-model="item.value"
                :multiple="item.type === 1"
                :max-collapse-tags="2"
                collapse-tags
                collapse-tags-tooltip
                clearable
                filterable
                @change="(val) => handleSelectChange(val, item)"
              >
                <el-option
                  v-for="option in item.selectValueList"
                  :key="option.value"
                  :label="option.desc"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </KeenCard>
      </el-col>
      <el-col :lg="17" :md="12" :sm="24" :offset="0">
        <KeenCard
          title="审核节点设置"
          style="min-height: 700px"
          v-if="form.baseInfo.auditType === 1"
        >
          <div style="display: flex" v-for="(item, index) of form.nodeList" :key="index">
            <div style="flex: 1">
              <el-form-item
                label="节点名称"
                :prop="`nodeList[${index}].name`"
                :rules="[{ required: true, trigger: 'blur', message: '节点名称不能为空' }]"
              >
                <el-input style="min-width: 50px" v-model="item.name" />
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item
                label="审核类型"
                :prop="`nodeList[${index}].type`"
                :rules="[{ required: true, trigger: 'change', message: '请选择审核类型' }]"
              >
                <el-select style="width: 100%" v-model="item.type">
                  <el-option label="会签" :value="0" />
                  <el-option label="或签" :value="1" />
                </el-select>
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item
                label="审核人"
                :prop="`nodeList[${index}].operators`"
                :rules="[
                  {
                    required: true,
                    type: item.type === 1 ? 'array' : undefined,
                    trigger: 'change',
                    message: '请选择审核人',
                  },
                ]"
              >
                <el-select
                  style="width: 100%"
                  v-model="item.operators"
                  :multiple="item.type === 1"
                  clearable
                  filterable
                  :max-collapse-tags="2"
                  collapse-tags
                  collapse-tags-tooltip
                >
                  <el-option
                    v-for="item in operatorList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div style="flex: 1" v-if="form.baseInfo.type === 3">
              <el-form-item
                label="审核方式"
                :prop="`nodeList[${index}].auto`"
                :rules="[{ required: true, trigger: 'change', message: '请选择审核方式' }]"
              >
                <el-select style="width: 100%" v-model="item.auto">
                  <el-option label="手动审核" :value="0" />
                  <el-option label="自动审核" :value="1" />
                </el-select>
              </el-form-item>
            </div>
            <div style="flex-basis: 100px; margin-left: 20px; line-height: 44px">
              <el-button type="primary" link @click="add" v-if="index === form.nodeList.length - 1">
                新增
              </el-button>
              <el-button type="danger" link v-if="index !== 0" @click="remove(index)">
                删除
              </el-button>
            </div>
          </div>
        </KeenCard>
        <KeenCard title="钉钉审核" style="min-height: 700px" v-else />
      </el-col>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { erpApi, memberApi, workflowApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();

  const form = ref<any>({
    baseInfo: {
      code: '',
      name: '',
      priority: 0,
      status: 0,
      type: route.query?.type ? parseInt(route.query?.type, 10) : 2,
      auditType: 1, // 1系统审核 2钉钉审核
    },
    nodeList: [
      {
        name: '',
        operators: [],
        auto: 0,
        sort: 0,
        type: 0,
      },
    ],
    conditionList: [],
  });
  const initField = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: route.query?.type || form.value.baseInfo.type,
    });
    form.value.conditionList = res.conditionList.map((item) => {
      console.log(item.type, item.value);
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    console.log(form.value.conditionList);
  };
  // initField();
  const getDetailData = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
      code: route.query.code as string,
    });
    const nodeListRes = res.nodeList.map((item) => {
      return {
        ...item,
        operators: item.type === 0 ? item.operators?.[0] : item.operators, // 会签 操作人单选
      };
    });
    form.value = {
      ...res,
      nodeList: [...nodeListRes],
    };
    console.log(form.value, 'form.value');
  };

  if (route.query.code) {
    getDetailData();
  } else {
    initField();
  }

  const rules = reactive({
    'baseInfo.name': [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
    'baseInfo.auditType': [{ required: true, message: '请选择审核方式', trigger: 'change' }],
  });
  const operatorList = ref<any[]>([]);
  const getOperatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getOperatorList();
  const add = () => {
    form.value.nodeList.push({
      name: '',
      operators: [],
      auto: 0,
      sort: 0,
      type: 0,
    });
  };
  const remove = (index: number) => {
    form.value.nodeList.splice(index, 1);
  };
  const router = useRouter();
  const cancel = () => {
    closeTabAndRefresh(form.value.baseInfo.type == 2 ? 'auditRule' : 'salesForecastingSetting');
    router.push({
      name: form.value.baseInfo.type == 2 ? 'auditRule' : 'salesForecastingSetting',
    });
  };
  const formRef = ref<any>();
  const conditionFormRef = ref<any>();
  const saveLoading = ref(false);
  const save = async () => {
    const {
      nodeList,
      baseInfo: { auditType },
    } = form.value;
    const nodeListResult =
      auditType === 2
        ? [
            {
              name: '钉钉审核',
              operators: [],
              auto: 0,
              sort: 0,
              type: 0,
            },
          ]
        : nodeList.map((item) => {
            return {
              ...item,
              operators: item.type === 0 ? [item.operators] : item.operators, // 会签 操作人单选
            };
          });
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      conditionFormRef.value?.validate().catch(() => false),
    ]);
    if (valid) {
      await erpApi.luteosErpBaseFlowSaveOrUpdate({ ...form.value, nodeList: nodeListResult });
      ElMessage.success('操作成功');
      cancel();
    }
  };

  const handleCheckChange = (item, index) => {
    if (item.status === 1) {
      item.value = [];
      conditionFormRef.value.resetFields([`conditionList[${index}].value`]);
    }
  };

  const handleSelectChange = (val, item) => {
    item.status = val?.length ? 0 : 1;
  };
</script>

<style scoped lang="scss">
  :deep(.el-cascader) {
    min-width: unset !important;
  }
</style>
