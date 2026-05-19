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
              v-show="shouldShowCondition(item)"
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
                  :label="option.desc + '-' + option.value"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </KeenCard>
      </el-col>
      <el-col :lg="17" :md="12" :sm="24" :offset="0">
        <KeenCard title="审核流信息" style="min-height: 700px">
          <div style="display: flex" v-for="(item, index) of form.nodeList" :key="index">
            <div style="flex: 1">
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
                label="来源类型"
                :prop="`nodeList[${index}].sourceType`"
                :rules="[{ required: true, trigger: 'blur', message: '来源类型不能为空' }]"
              >
                <el-select
                  style="width: 100%"
                  v-model="item.sourceType"
                  clearable
                  filterable
                  @change="handleSourceTypeChange(item, index)"
                >
                  <el-option
                    v-for="sourceType in AUDIT_SETTING_DEMAND_SOURCE_TYPE"
                    :key="sourceType.value"
                    :label="sourceType.label"
                    :value="sourceType.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <!-- 来源值 -->
            <div style="flex: 1">
              <el-form-item
                label="来源值"
                :prop="`nodeList[${index}].sourceValue`"
                :rules="
                  item.sourceType === 'fixed'
                    ? [{ required: true, message: '请选择员工', trigger: 'change' }]
                    : []
                "
              >
                <!-- 固定员工可多选成员 -->
                <el-select
                  v-if="item.sourceType === 'fixed'"
                  v-model="item.sourceValue"
                  multiple
                  placeholder="请选择员工"
                  style="width: 100%"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="op in operatorList"
                    :key="op.value"
                    :label="op.label"
                    :value="op.value"
                  />
                </el-select>
                <!-- 其他类型只读输入 -->
                <el-input
                  v-else-if="item.sourceType === 'manager'"
                  v-model="item.sourceValue"
                  :disabled="true"
                  placeholder="由系统自动判定"
                />
                <el-cascader
                  v-if="item.sourceType === 'dept_manager'"
                  v-model="item.sourceValue"
                  :props="cascaderProps"
                  style="width: 100%"
                  clearable
                  placeholder="请选择所属部门"
                  separator=" / "
                />
                <!-- <el-input
                  v-else
                  v-model="item.sourceValue"
                  :disabled="true"
                  placeholder="请选择来源类型"
                /> -->
              </el-form-item>
            </div>
            <div style="flex: 1" v-if="false">
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
                  clearable
                  filterable
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
            <div style="flex-basis: 100px; margin-left: 40px; line-height: 44px">
              <el-button type="primary" link @click="add" v-if="index === form.nodeList.length - 1">
                新增
              </el-button>
              <el-button type="danger" link v-if="index !== 0" @click="remove(index)">
                删除
              </el-button>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-end py-6 px-9">
            <el-space>
              <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
              <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
            </el-space>
          </div>
        </KeenCard>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { platformApi, memberApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, reactive } from 'vue';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { AUDIT_SETTING_DEMAND_SOURCE_TYPE } from '../constant';
  const initField = async () => {
    const res: any = await platformApi.platformFlowQueryTemplate({
      type: 101,
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
  initField();
  const route = useRoute();
  const getDetailData = async () => {
    const [detailRes, deptRes] = await Promise.all([
      platformApi.platformFlowQueryDetail({ code: route.query.code as string }),
      memberApi.luteosMemberQueryDeptTree({ deptId: null }),
    ]);
    form.value = detailRes;
    deptTreeData.value = deptRes.deptInfoList;
    form.value.nodeList.forEach((item: any) => {
      if (item.sourceType === 'dept_manager' && Array.isArray(item.deptInfos)) {
        const path = [...item.deptInfos].reverse().map((d: { deptId: number }) => d.deptId);
        item.sourceValue = path;
      } else if (item.sourceType === 'fixed') {
        item.sourceValue = item.operators;
      }
    });
  };

  if (route.query.code) {
    getDetailData();
  } else {
    initField();
  }
  const deptTreeData = ref([]);

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: level < 2 ? item.children?.map((subItem) => mapNode(subItem, level + 1)) : [],
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
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
  const form = ref<any>({
    baseInfo: {
      code: '',
      name: '',
      priority: 0,
      status: 0,
      type: 101,
    },
    nodeList: [
      {
        name: '',
        operators: [],
        sort: 0,
        type: 0,
        sourceType: '',
        sourceValue: [],
      },
    ],
    conditionList: [],
  });
  const rules = reactive({
    'baseInfo.name': [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
  });
  const cascaderProps = {
    expandTrigger: 'hover' as const,
    label: 'deptName',
    value: 'deptId',
    multiple: false,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node, resolve) {
      const { value } = node;
      querySubDeptList(value).then((res) => {
        resolve(res);
      });
    },
  };

  const shouldShowCondition = (item) => {
    // 如果是需求资源类型，需要检查需求状态
    if (item.name === '需求资源类型') {
      const statusItem = form.value.conditionList.find((status) => status.name === '需求状态');
      if (!statusItem || !statusItem.value) return false;

      const checkValue = (val) => {
        const numVal = Number(val);
        return numVal >= 21 && numVal <= 30;
      };

      if (Array.isArray(statusItem.value)) {
        return statusItem.value.some(checkValue);
      }

      return checkValue(statusItem.value);
    }
    return true; // 其他条件都显示
  };
  const querySubDeptList = async (parentId) => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId });
    return res.deptInfoList;
  };
  const operatorList = ref<any[]>([]);
  const add = () => {
    form.value.nodeList.push({
      name: '',
      operators: [],
      sort: 0,
      type: 1,
      sourceType: 'fixed',
      sourceValue: [],
    });
  };
  const handleSourceTypeChange = (item, index) => {
    if (item.sourceType === 'fixed') {
      item.sourceValue = '请选择员工';
    } else if (item.sourceType === 'dept_manager') {
      item.sourceValue = '';
    } else {
      item.sourceValue = '由系统自动判定';
    }
  };
  const remove = (index: number) => {
    form.value.nodeList.splice(index, 1);
  };
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'demandAuditSetting',
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
    if (valid.every(Boolean)) {
      // 过滤条件列表，只保留满足条件的项
      const filteredConditionList = form.value.conditionList.filter((item) => {
        // 如果是需求资源类型，需要检查需求状态
        if (item.name === '需求资源类型') {
          const statusItem = form.value.conditionList.find((status) => status.name === '需求状态');
          if (!statusItem || !statusItem.value) return false;

          const checkValue = (val) => {
            const numVal = Number(val);
            return numVal >= 21 && numVal <= 30;
          };

          if (Array.isArray(statusItem.value)) {
            return statusItem.value.some(checkValue);
          }

          return checkValue(statusItem.value);
        }
        return true;
      });

      // 创建提交数据的副本
      const submitData = {
        ...form.value,
        conditionList: filteredConditionList,
        nodeList: form.value.nodeList.map((item) => {
          if (item.sourceType === 'fixed') {
            item.operators = item.sourceValue;
            console.log(item.sourceValue.join(','));
            item.sourceValue = item.sourceValue.at(-1);
          } else if (item.sourceType === 'dept_manager') {
            item.sourceValue = item.sourceValue.at(-1);
          } else {
            item.sourceValue = '';
          }
          return item;
        }),
      };
      await platformApi.platformFlowSaveOrUpdate(submitData);
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

<style scoped lang="scss"></style>
