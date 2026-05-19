<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" scroll-to-error>
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
        </KeenCard>
        <KeenCard title="选择条件">
          <el-form
            :model="form"
            ref="conditionFormRef"
            label-position="left"
            label-width="120px"
            scroll-to-error
          >
            <el-form-item
              v-for="(item, index) of form.conditionList"
              :key="item.nameCode"
              :prop="`conditionList[${index}].value`"
              :rules="item.status === 0 ? [{ required: true, message: '请选择' }] : []"
              label-width="120px"
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
                    checkStrictly: true,
                    emitPath: false,
                  }"
                />
              </template>
              <el-select
                v-else
                style="width: 100%"
                v-model="item.value"
                :multiple="item.type === 1"
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
        <KeenCard title="审核流信息" style="min-height: 700px">
          <div style="display: flex" v-for="(item, index) of form.nodeList" :key="item.index">
            <div style="flex: 0.7">
              <el-form-item
                label="节点名称"
                :prop="`nodeList[${index}].name`"
                :rules="[{ required: true, trigger: 'blur', message: '节点名称不能为空' }]"
              >
                <el-input v-model="item.name" />
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item
                label="审核人"
                :prop="`nodeList[${index}].operators`"
                :rules="[
                  { required: true, type: 'array', trigger: 'change', message: '请选择审核人' },
                ]"
              >
                <el-select
                  style="width: 100%"
                  v-model="item.operators"
                  multiple
                  collapse-tags-tooltip
                  :max-collapse-tags="2"
                  collapse-tags
                  clearable
                  filterable
                  :options="operatorList"
                />
              </el-form-item>
            </div>
            <div
              style="flex: 0.7"
              v-if="
                form.conditionList?.[0]?.value.includes('1') ||
                form.conditionList?.[0]?.value.includes('3')
              "
            >
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
            <div style="flex: 0.7">
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
            <div style="flex-basis: 100px; margin-left: 40px; line-height: 44px">
              <el-tooltip content="向上插入行" placement="top">
                <i
                  class="iconfont icon-jiantouxiangshang"
                  style="margin-right: 10px"
                  @click="upAdd(index)"
                ></i>
              </el-tooltip>
              <el-tooltip content="向下插入行" placement="top">
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
          </div>
        </KeenCard>
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
  import { erpApi, memberApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { omit } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const initField = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: 1,
    });
    form.value.conditionList = res.conditionList.map((item) => {
      // console.log(item.type, item.value);
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    // console.log(form.value.conditionList);
  };
  const route = useRoute();
  const getDetailData = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
      code: route.query.code as string,
    });
    form.value = res;
  };
  if (route.query.code) {
    getDetailData();
  } else {
    initField();
  }
  const form = ref<any>({
    baseInfo: {
      code: '',
      name: '',
      priority: 0,
      status: 0,
      type: 1,
    },
    nodeList: [
      {
        name: '',
        operators: [],
        index: Math.random(),
        sort: 0,
        type: 0,
        auto: 0,
      },
    ],
    conditionList: [],
  });
  const rules = reactive({
    'baseInfo.name': [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
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
  // const add = () => {
  //   form.value.nodeList.push({
  //     name: '',
  //     operators: [],
  //     sort: 0,
  //     type: 0,
  //     auto: 0,
  //   });
  // };
  const upAdd = (index: any) => {
    form.value.nodeList.splice(index, 0, {
      name: '',
      index: Math.random(),
      operators: [],
      sort: 0,
      type: 0,
      auto: 0,
    });
    // console.log(form.value);
  };
  const downAdd = (index: any) => {
    form.value.nodeList.splice(index + 1, 0, {
      name: '',
      index: Math.random(),
      operators: [],
      sort: 0,
      type: 0,
      auto: 0,
    });
  };
  const remove = (index: number) => {
    form.value.nodeList.splice(index, 1);
  };
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'orderRule',
    });
  };
  const formRef = ref<any>();
  const conditionFormRef = ref<any>();
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      conditionFormRef.value?.validate().catch(() => false),
    ]);
    const trueArr = valid.filter((item) => item === true);
    if (trueArr.length === valid.length) {
      const params = {
        baseInfo: form.value.baseInfo,
        conditionList: form.value.conditionList?.map((item) => {
          return omit(item, 'selectValueList');
        }),
        nodeList: form.value.nodeList?.map((item) => {
          return omit(item, 'selectValueList');
        }),
      };
      await erpApi.luteosErpBaseFlowSaveOrUpdate(params);
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
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

<style scoped lang="scss"></style>
