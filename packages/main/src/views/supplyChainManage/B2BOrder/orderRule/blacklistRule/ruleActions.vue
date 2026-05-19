<template>
  <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" scroll-to-error>
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :offset="0">
        <KeenCard title="黑名单规则">
          <el-form-item label="类型">
            <el-radio-group v-model="form.type">
              <el-radio value="姓名">姓名</el-radio>
              <el-radio value="邮箱">邮箱</el-radio>
              <el-radio value="电话">电话</el-radio>
              <el-radio value="地址">地址</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="黑名单内容" prop="content">
            <el-input
              maxlength="255"
              show-word-limit
              v-model="form.content"
              :placeholder="holderText"
              clearable
            />
            <div class="tips">{{ tipText }}</div>
          </el-form-item>
          <el-form-item label="匹配方式">
            <el-radio-group v-model="form.matchMethod">
              <el-radio value="EXACT">精确</el-radio>
              <el-radio value="LIKE">模糊</el-radio>
              <el-radio value="WILDCARD">“%”通配符匹配</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="拉黑原因" prop="blockedReason">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.blockedReason"
              word-limit="1000"
              maxlength="1000"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
            <div class="tips">请详细描述加入黑名单的原因，便于后续查证</div>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
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
  import { omsApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  // import { QuestionFilled } from '@element-plus/icons-vue';
  // import { omit, difference } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  // const ruleType = parseInt(route.query.ruleType as string);

  // 表单模型
  const form = ref({
    type: '姓名',
    content: '',
    matchMethod: 'EXACT',
    status: 1,
    sceneCode: 'blacklist',
    blockedReason: '',
  });

  // 校验规则
  const rules = {
    type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
    matchMethod: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    blockedReason: [{ required: true, message: '请输入拉黑原因', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  };

  const holderText = ref('');
  const tipText = ref('');
  watch(
    () => form.value.type,
    (type) => {
      if (type === '姓名') {
        holderText.value = '请输入买家姓名全称';
        tipText.value = '不区分大小写，自动清除前后空格，建议精确匹配';
      } else if (type === '邮箱') {
        holderText.value = '请输入买家邮箱';
        tipText.value = '不区分大小写，自动清除前后空格，建议精确匹配，例如：example@gerpgo.com';
      } else if (type === '电话') {
        holderText.value = '请输入买家手机号或电话';
        tipText.value = '不区分大小写，自动清除前后空格，建议精确匹配';
      } else if (type === '地址') {
        holderText.value = '请输入买家地址';
        tipText.value =
          '输入地址关键词，建议模糊匹配，除关键词之外用通配符%表示其他任意字符例如：设置“%ABC 123%ABC 123%”，则***ABC 123***ABC 123***符合设置';
      }
    },
    { immediate: true }
  );
  const initField = async () => {
    // if (!ruleType) {
    //   ElMessage.warning('规则参数错误');
    //   return;
    // }
    // const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
    //   type: ruleType,
    // });
    // form.value.conditionList = res.conditionList.map((item) => {
    //   return {
    //     ...item,
    //     value: item.type === 1 ? [] : '',
    //   };
    // });
    // form.value.outParamList = res.outParamList.map((item) => {
    //   return {
    //     ...item,
    //     value: item.type === 1 ? [] : '',
    //   };
    // });
    // console.log('form.value.outParamList', form.value.outParamList);
  };
  // initField();
  const getDetailData = async () => {
    // const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
    //   code: route.query.code || (route.params?.code as string),
    // });
    const res: any = await omsApi.omsRuleBlacklistQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    form.value = res;
    console.log('详情返回', res);
    // form.value = res;
    // 修复编辑 不生效bug
    // form.value.id = res.id;
  };
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
    getDetailData();
  } else {
    initField();
  }
  // const rules = reactive({
  //   'baseInfo.name': [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  // });
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
    // console.log('参数:', form.value);
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      conditionFormRef.value?.validate().catch(() => false),
    ]);
    // console.log('valid', valid);
    const falseArr = valid.filter((item) => item === false);
    if (falseArr.length > 0) {
      return;
    }
    console.log('表单', form.value);
    const param = JSON.parse(JSON.stringify(form.value));
    // console.log('组装参数', param);
    // return;
    if (valid) {
      // const params = {
      //   baseInfo:
      //     route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
      //   conditionList: form.value.conditionList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      //   outParamList: form.value.outParamList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      // };
      // return;
      if (!isEdit.value) {
        await omsApi.omsRuleBlacklistAdd(param);
      } else {
        await omsApi.omsRuleBlacklistUpdate(param);
      }
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    }
    // return;
    // if (valid) {
    //   const params = {
    //     baseInfo:
    //       route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
    //     conditionList: form.value.conditionList?.map((item) => {
    //       return omit(item, 'selectValueList');
    //     }),
    //     outParamList: form.value.outParamList?.map((item) => {
    //       return omit(item, 'selectValueList');
    //     }),
    //   };
    //   await erpApi.luteosErpBaseFlowSaveOrUpdate(params);
    //   ElMessage.success('操作成功');
    //   closeTabAndRefresh('orderRule');
    //   cancel();
    // }
  };
</script>

<style scoped lang="scss">
  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
    font-size: 12px;
  }
</style>
