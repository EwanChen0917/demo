<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" scroll-to-error>
    <el-row :gutter="20">
      <el-col :lg="7" :md="12" :sm="24" :offset="0">
        <KeenCard title="模板信息">
          <el-form-item label="模板名称" prop="baseInfo.name">
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
        <KeenCard>
          <div class="mw-800px" v-for="(child, idx) in form.childList" :key="idx">
            <div class="fs-6 fw-bold">{{ `运费配置#${idx + 1}` }}</div>
            <div class="d-flex">
              <div class="w-75">
                <el-form-item
                  v-for="(item, index) in child.conditionList"
                  :key="item.nameCode"
                  :prop="`childList[${idx}].conditionList[${index}].value`"
                  :rules="getRules(item)"
                  label-width="150px"
                  label-position="left"
                >
                  <template #label>
                    <div>
                      <el-checkbox
                        v-model="item.status"
                        :true-label="0"
                        :false-label="1"
                        :indeterminate="false"
                        :disabled="item.required"
                        @change="handleChildCheckChange(item, index, idx)"
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
                  <div class="d-flex gap-2" v-else-if="item.type === 3">
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
                <div style="flex-basis: 100px; margin-left: 40px; line-height: 44px">
                  <el-button
                    type="primary"
                    link
                    @click="addChild"
                    v-if="idx === form.childList.length - 1"
                  >
                    新增
                  </el-button>
                  <el-button
                    type="danger"
                    link
                    v-if="form.childList.length > 1"
                    @click="removeChild(idx)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
              <div>
                <el-form-item
                  label="运费"
                  :prop="`childList[${idx}].baseInfo.outInfo`"
                  :rules="[{ required: true, message: '请输入运费' }]"
                >
                  <el-input placeholder="请输入运费金额" v-model="child.baseInfo.outInfo" />
                </el-form-item>
              </div>
            </div>
          </div>
        </KeenCard>
        <!--        <KeenCard title="模板信息" style="min-height: 700px">-->
        <!--          <div style="display: flex" v-for="(item, index) of form.nodeList" :key="index">-->
        <!--            <div style="flex: 1">-->
        <!--              <el-form-item-->
        <!--                label="节点名称"-->
        <!--                :prop="`nodeList[${index}].name`"-->
        <!--                :rules="[{ required: true, trigger: 'blur', message: '节点名称不能为空' }]"-->
        <!--              >-->
        <!--                <el-input v-model="item.name" />-->
        <!--              </el-form-item>-->
        <!--            </div>-->
        <!--            <div style="flex: 1">-->
        <!--              <el-form-item-->
        <!--                label="审核人"-->
        <!--                :prop="`nodeList[${index}].operators`"-->
        <!--                :rules="[-->
        <!--                  { required: true, type: 'array', trigger: 'change', message: '请选择审核人' },-->
        <!--                ]"-->
        <!--              >-->
        <!--                <el-select-->
        <!--                  style="width: 100%"-->
        <!--                  v-model="item.operators"-->
        <!--                  multiple-->
        <!--                  clearable-->
        <!--                  filterable-->
        <!--                >-->
        <!--                  <el-option-->
        <!--                    v-for="item in operatorList"-->
        <!--                    :key="item.value"-->
        <!--                    :label="item.label"-->
        <!--                    :value="item.value"-->
        <!--                  />-->
        <!--                </el-select>-->
        <!--              </el-form-item>-->
        <!--            </div>-->
        <!--            <div style="flex-basis: 100px; margin-left: 40px; line-height: 44px">-->
        <!--              <el-button type="primary" link @click="add" v-if="index === form.nodeList.length - 1">-->
        <!--                新增-->
        <!--              </el-button>-->
        <!--              <el-button type="danger" link v-if="index !== 0" @click="remove(index)">-->
        <!--                删除-->
        <!--              </el-button>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </KeenCard>-->
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

  const initField = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: 5,
    });
    form.value.conditionList = res.conditionList.map((item) => {
      console.log(item.type, item.value);
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    form.value.childList = res?.childList?.map((child) => {
      return {
        ...child,
        conditionList: child.conditionList?.map((item) => {
          return {
            ...item,
            value: item.type === 1 || item.type === 3 ? [] : '',
            status: item.required ? 0 : 1,
          };
        }),
        baseInfo: {
          code: '',
          name: '',
          outInfo: '',
          priority: 0,
          status: 0,
          type: 5,
        },
      };
    });
    console.log(form.value.conditionList);
  };
  const route = useRoute();
  const getDetailData = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
      code: route.query.code as string,
    });
    form.value = {
      ...res,
      childList: res?.childList?.map((child) => {
        return {
          ...child,
          conditionList: child.conditionList?.map((item) => {
            return {
              ...item,
              value: item.type === 3 ? item.value?.split('-') : item.value,
              status: item.required ? 0 : item.status,
            };
          }),
        };
      }),
    };
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
      type: 5,
    },
    conditionList: [],
    childList: [
      {
        baseInfo: {
          code: '',
          name: '',
          outInfo: '',
          priority: 0,
          status: 0,
          type: 5,
        },
      },
    ],
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

  const addChild = () => {
    form.value.childList.push({
      conditionList: form.value.childList[0]?.conditionList?.map((item) => {
        return {
          ...item,
          value: item.type === 1 || item.type === 3 ? [] : '',
          status: item?.required ? 0 : 1,
        };
      }),
      baseInfo: {
        code: '',
        name: '',
        outInfo: '',
        priority: 0,
        status: 0,
        type: 5,
      },
    });
  };

  const removeChild = (index: number) => {
    form.value.childList.splice(index, 1);
  };
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'internalFreightRule',
    });
  };
  const formRef = ref<any>();
  const conditionFormRef = ref<any>();
  const saveLoading = ref(false);
  const save = async () => {
    const [valid1, valid2] = await Promise.all([formRef.value?.validate().then(() => true).catch(() => false), conditionFormRef.value?.validate().then(() => true).catch(() => false)]);
    if (valid1 && valid2) {
      const params = {
        baseInfo: form.value.baseInfo,
        conditionList: form.value.conditionList?.map((item) => {
          return omit(item, 'selectValueList');
        }),
        childList: form.value.childList?.map((child) => {
          return {
            ...child,
            baseInfo: child?.baseInfo ?? form.value?.baseInfo,
            conditionList: child.conditionList?.map((item) => {
              return omit(
                {
                  ...item,
                  value: item.type === 3 ? item.value?.join('-') : item.value,
                },
                'selectValueList'
              );
            }),
          };
        }),
      };
      await erpApi.luteosErpBaseFlowSaveOrUpdate(params);
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

  const handleChildCheckChange = (item, index, idx) => {
    if (item.status === 1) {
      item.value = [];
      formRef.value.resetFields([`childList[${idx}].conditionList[${index}].value`]);
    }
  };

  const handleSelectChange = (val, item) => {
    item.status = val?.length || val ? 0 : 1;
  };

  const getRules = (item) => {
    if (item.type === 3) {
      return [
        { required: item.status === 0, message: '请输入' },
        {
          validator: (rule, value, callback) => {
            if (value?.filter((v) => v)?.length === 1) {
              callback(new Error('请输入完整区间值'));
            } else if (value?.[0] > value?.[1]) {
              callback(new Error('第二个区间值应不小于第一个区间值'));
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
