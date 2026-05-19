<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
    <el-row :gutter="20">
      <el-col :lg="7" :md="12" :sm="24" :offset="0">
        <KeenCard title="审核流信息">
          <el-form-item label="审核流名称：" prop="baseInfo.name">
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
        <KeenCard title="审核流信息" style="min-height: 700px">
          <div style="display: flex" v-for="(item, index) of form.nodeList" :key="index">
            <div style="flex: 1">
              <el-form-item
                label="节点名称："
                :prop="`nodeList[${index}].name`"
                :rules="[{ required: true, trigger: 'blur', message: '节点名称不能为空' }]"
              >
                <span>{{ item.name }}</span>
              </el-form-item>
            </div>
            <div style="flex: 1">
              <el-form-item
                label="审核人："
                :prop="`nodeList[${index}].operators`"
                :rules="[
                  { required: true, type: 'array', trigger: 'change', message: '请选择审核人' },
                ]"
              >
                <span v-for="(operator, idx) in item.operatorNames" :key="operator">
                  {{ operator }}
                  <span v-if="idx !== item.operators.length - 1">、</span>
                </span>
              </el-form-item>
            </div>
          </div>
        </KeenCard>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts" name="quotationSettingDetail">
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
      type: 0,
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
      name: 'quotationSetting',
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

  const getDeepDesc = (arr, val) => {
    if (!Array.isArray(arr) || val == null) {
      // 输入校验，确保arr是数组，val不是null或undefined
      return '';
    }

    // 使用更现代的JavaScript语法和循环
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
