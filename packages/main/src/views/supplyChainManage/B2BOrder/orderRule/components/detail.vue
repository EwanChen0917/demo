<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
    <el-row :gutter="20">
      <el-col :lg="7" :md="12" :sm="24" :offset="0">
        <KeenCard title="规则信息">
          <el-form-item label="规则名称：" prop="baseInfo.name">
            {{ form.baseInfo.name }}
          </el-form-item>
          <el-form-item label="状态：">
            <Tag :color="colorMap[form.baseInfo.status]">{{ form.baseInfo.statusDesc }}</Tag>
          </el-form-item>
          <el-form-item label="优先级：">
            <div class="w-100 d-flex gap-3 align-items-center justify-content-between">
              <span>{{ form.baseInfo.priority }}</span>
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
        </KeenCard>
        <KeenCard title="选择条件">
          <el-form-item
            v-for="item of form.conditionList?.filter((v) => v.status === 0)"
            :key="item.nameCode"
            :label="item.name + '：'"
            label-width="130px"
          >
            <span v-if="item.selectValueListIsTree">
              {{ getDesc(item.selectValueList, item.value, item.type) }}
            </span>
            <span v-else-if="item.type === 1">
              {{
                item?.selectValueList
                  ?.filter((v) => item.value?.includes(v.value))
                  ?.map((v) => v.desc)
                  ?.join('、')
              }}
            </span>
            <span v-else>
              {{ item.selectValueList?.find((v) => v.value === item.value)?.desc }}
            </span>
          </el-form-item>
        </KeenCard>
      </el-col>
      <el-col :lg="17" :md="12" :sm="24" :offset="0">
        <KeenCard title="触发动作" style="min-height: 700px">
          <el-form-item
            v-for="(item, index) of form.outParamList"
            :key="item.nameCode"
            :label="item.name"
            :prop="`outParamList[${index}].value`"
            :rules="[{ required: item?.mustSelect, message: '请选择', trigger: 'change' }]"
          >
            <span v-if="item?.type === 0">
              {{
                item.selectValueList?.find((option) => {
                  return option.value === item.value;
                })?.desc
              }}
            </span>
            <span v-if="item.type === 1">
              {{
                item?.selectValueList
                  ?.filter((v) => item.value?.includes(v.value))
                  ?.map((v) => v.desc)
                  ?.join('、')
              }}
            </span>
          </el-form-item>
        </KeenCard>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
  import { erpApi, memberApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  import { QuestionFilled } from '@element-plus/icons-vue';

  const colorMap = {
    0: 'green',
    1: 'gray',
  };
  const route = useRoute();
  const getDetailData = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
      code: route.query.code as string,
    });
    form.value = res;
  };
  getDetailData();
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
        sort: 0,
        type: 0,
      },
    ],
    conditionList: [],
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

  const getDesc = (list, value, type) => {
    // 多选
    const result = [];
    if (type === 1) {
      value?.forEach((item) => {
        result.push(getDeepDesc(list, item));
      });
    } else {
      result.push(getDeepDesc(list, value));
    }
    return result.join('、');
  };
  const handleData = (list, v) => {
    // item.selectValueList?.find((option) => {
    //   return option.value === item.value;
    // })?.desc
    const vSet = new Set(v);
    const result = list.filter((item) => vSet.has(item.value));
    console.log('result', result);
    let str = '';
    result.forEach((item, index) => {
      str += `${item.desc} ${index === result.length - 1 ? '' : ' ; '}`;
    });
    return str;
  };
  const getDeepDesc = (arr, val) => {
    if (!Array.isArray(arr) || val == null) {
      // 输入校验，确保arr是数组，val不是null或undefined
      return '';
    }

    for (const item of arr) {
      // 直接检查当前item是否包含目标值，避免不必要的递归
      if (item.value === val) {
        return item.desc;
      }

      // 仅当childrenList非空时才递归查找
      if (item.childrenList && item.childrenList.length > 0) {
        const desc = getDeepDesc(item.childrenList, val);
        if (desc) {
          return desc;
        }
      }
    }

    // 如果未找到匹配项，则返回空字符串，明确处理边界情况
    return '';
  };
</script>

<style scoped lang="scss"></style>
