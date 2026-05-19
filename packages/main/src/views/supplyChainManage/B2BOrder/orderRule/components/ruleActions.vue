<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" scroll-to-error>
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :offset="0">
        <KeenCard title="规则信息">
          <el-form-item label="规则名称" prop="baseInfo.name">
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
            label-width="150px"
            scroll-to-error
          >
            <el-form-item
              v-for="(item, index) of form.conditionList"
              :key="item.nameCode"
              :prop="`conditionList[${index}].value`"
              :rules="getRules(item)"
            >
              <!-- :rules="
                item.status === 0
                  ? [{ required: true, message: item.type === 7 ? '请输入' : '请选择' }]
                  : []
              " -->
              <template #label>
                <el-checkbox
                  v-model="item.status"
                  :true-label="0"
                  :false-label="1"
                  :indeterminate="false"
                  @change="handleCheckChange(item, index)"
                >
                  <div class="text-break">{{ item.name }}</div>
                </el-checkbox>
              </template>
              <el-input
                v-if="item.type === 7"
                v-model="item.value"
                placeholder="请输入"
                clearable
                maxlength="255"
                show-word-limit
                @change="(val) => handleSelectChange(val, item)"
              />
              <template v-else-if="item.selectValueListIsTree">
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
              <!--                  区间输入框-->
              <div class="d-flex gap-2" v-else-if="item.type === 8">
                <!-- {{ item }} -->
                <NumberInput
                  v-model="item.value[0]"
                  :precision="item.nameCode === '#skuCount' ? 0 : 2"
                  :min="0"
                  @change="(val) => handleSelectChange(val, item)"
                />
                -
                <NumberInput
                  v-model="item.value[1]"
                  :precision="item.nameCode === '#skuCount' ? 0 : 2"
                  :min="0"
                  @change="(val) => handleSelectChange(val, item)"
                />
                <!-- -- 整单毛重 -->
                <el-select
                  style="width: 100%"
                  v-model="item.value[2]"
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
              </div>
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
      <el-col :lg="16" :md="12" :sm="24" :offset="0">
        <KeenCard v-if="form?.baseInfo?.type === 9" title="触发动作" style="min-height: 700px">
          <el-form-item
            v-for="(item, index) of form.outParamList"
            :key="item.nameCode"
            :label="item.name"
            label-width="120"
            :prop="`outParamList[${index}].value`"
            :rules="index === 0 ? [{ required: true, message: '请选择', trigger: 'change' }] : []"
          >
            <el-select
              style="width: 400px"
              v-model="item.value"
              :multiple="item.type === 1"
              clearable
              filterable
              @change="(val) => handleOutParamChange(index)"
            >
              <el-option
                v-for="option in item.selectValueList"
                :key="option.value"
                :label="option.desc"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </KeenCard>
        <KeenCard v-else title="触发动作" style="min-height: 700px">
          <el-form-item
            v-for="(item, index) of form.outParamList"
            :key="item.nameCode"
            :label="item.name"
            label-width="120"
            :prop="`outParamList[${index}].value`"
            :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
          >
            <el-select
              style="width: 400px"
              v-model="item.value"
              :multiple="item.type === 1"
              clearable
              filterable
              @change="(val) => handleOutParamChange(index)"
            >
              <el-option
                v-for="option in item.selectValueList?.filter((optionItem) => {
                  if (index === 0) {
                    return optionItem;
                  } else if (index === 1) {
                    return optionItem?.filter1List?.includes(form.outParamList[0].value);
                  } else if (index === 2) {
                    return (
                      optionItem?.filter1List?.includes(form.outParamList[0].value) &&
                      optionItem?.filter2List?.includes(form.outParamList[1].value)
                    );
                  }
                })"
                :key="option.value"
                :label="option.desc"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
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
  import { omit, difference } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const ruleType = parseInt(route.query.ruleType as string);

  const initField = async () => {
    if (!ruleType) {
      ElMessage.warning('规则参数错误');
      return;
    }
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: ruleType,
    });
    form.value.conditionList = res.conditionList.map((item) => {
      // return {
      //   ...item,
      //   value: item.type === 1 ? [] : '',
      // };
      return {
        ...item,
        value: item.type === 1 || item.type === 8 ? [] : '',
      };
    });
    form.value.outParamList = res.outParamList.map((item) => {
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    console.log('form.value.outParamList', form.value.outParamList);
  };
  // initField();
  const getDetailData = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
      code: route.query.code || (route.params?.code as string),
    });
    // form.value = res;
    form.value = {
      ...res,
      conditionList: res.conditionList?.map((item) => {
        return {
          ...item,
          value: item.type === 8 ? (item.value ? item.value?.split('-') : [0, 0, '']) : item.value,
          status: item.required ? 0 : item.status,
        };
      }),
    };
    console.log(res);
  };

  if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
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
      type: ruleType,
    },
    outParamList: [
      {
        name: '',
        operators: [],
        sort: 0,
        type: 0,
      },
    ],
    conditionList: [],
  });
  const rules = reactive({
    'baseInfo.name': [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
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
    console.log(valid);
    const trueArr = valid.filter((item) => item === true);
    // console.log(trueArr.length, valid.length);
    if (trueArr.length === valid.length) {
      const params = {
        baseInfo:
          route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
        conditionList: form.value.conditionList?.map((item) => {
          // return omit(item, 'selectValueList');
          return omit(
            {
              ...item,
              value: item.type === 8 ? item.value?.join('-') : item.value,
            },
            'selectValueList'
          );
        }),
        outParamList: form.value.outParamList?.map((item) => {
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
    if (item.type === 8) {
      item.status = item.value?.length > 0 ? 0 : 1;
    } else {
      item.status = val?.length ? 0 : 1;
    }
    if (item.nameCode === '#deliveryType' && item.value) {
      const filter1List = form.value.outParamList[0].selectValueList?.find(
        (optionItem) => optionItem.value === form.value.outParamList[0].value
      )?.filter1List;
      if (difference(filter1List, item.value).length > 0) {
        form.value.outParamList[0].value = '';
        handleOutParamChange(0);
      }
    }
  };

  const handleOutParamChange = (index) => {
    for (let i = index + 1; i < form.value.outParamList.length; i++) {
      form.value.outParamList[i].value = '';
    }
  };
  const getRules = (item) => {
    if (item.type === 8) {
      return [
        { required: item.status === 0, message: '请输入' },
        {
          validator: (rule, value, callback) => {
            if (value?.filter((v) => v >= 0)?.length === 1) {
              callback(new Error('请输入完整区间值'));
            } else if (value?.[0] > value?.[1]) {
              callback(new Error('第二个区间值应不小于第一个区间值'));
            } else if (!value?.[2]) {
              if (item.status === 0) {
                callback(new Error('请选择单位'));
              } else {
                callback();
              }
            } else {
              callback();
            }
          },
          trigger: ['blur', 'change'],
        },
      ];
    }
    if (item.status === 0) {
      return [{ required: true, message: '请选择' }];
    }
    return [];
  };
</script>

<style scoped lang="scss"></style>
