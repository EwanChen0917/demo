<template>
  <KeenList>
    <h3>{{ title }}</h3>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="160px"
      class="mw-900px p-5"
      label-position="top"
    >
      <el-form-item
        v-for="item in options"
        :key="item.label"
        :label="item.label"
        :value="item.label"
        :prop="item.label"
      >
        <el-input
          v-if="item.labelType === 'TextField'"
          v-model="form[item.label]"
          placeholder="请输入"
          clearable
          :disabled="item.label === '店铺账号' && route.query.type == 0"
        />
        <el-select
          v-if="item.labelType === 'DDSelectField'"
          v-model="form[item.label]"
          placeholder="请选择"
          clearable
          filterable
          :multiple="item.selectType"
        >
          <el-option
            v-for="option in item.optionList"
            :key="option.value"
            :label="option.desc"
            :value="option.value"
          />
        </el-select>
        <el-tree-select
          v-if="item.labelType === 'DepartmentField'"
          ref="catTreeSelectRef"
          placeholder="请选择部门"
          v-model="form[item.label]"
          :data="deptTree"
          filterable
          clearable
          check-strictly
          popper-class="picker-cat-tree-select"
          highlight-current
        />
        <KeenFileUpload
          v-if="item.labelType === 'DDAttachment' && route.query.type"
          v-model="form[item.label]"
          directory="shop"
          ref="uploadRef"
          :limit="null"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-select
          v-if="item.labelType === 'RpeBusinessFiled'"
          v-model="form[item.label]"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="business in businessList"
            :key="business.name"
            :label="business.name"
            :value="business.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submit" v-loading="loading">提交</el-button>
      </el-space>
    </div>
  </KeenList>
</template>

<script setup lang="ts" name="shopDelApply">
  import { memberApi, platformApi, dingApi, shopApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const titleMap = {
    1: '新增渠道店铺绑定',
    2: '店铺公司申请',
    0: '店铺回收流程',
    3: '店铺公司注销流程',
  };

  const title = computed(() => titleMap[route.query?.type]);

  const route = useRoute();
  const router = useRouter();
  const form = ref({});
  const formRef = ref();
  const rules = ref({});

  const applyInfo = ref({});
  const options = ref([]);
  const attachmentKey = ref();
  const queryOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['shop_oa_code'],
    });
    applyInfo.value = res.dictMap.shop_oa_code[route.query?.type];
    options.value = applyInfo.value?.extInfo?.labelList;
    options.value?.forEach((item) => {
      if (item.required)
        rules.value[item.label] = [
          { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] },
        ];
      if (item.labelType === 'DDAttachment') {
        attachmentKey.value = item.label;
      }
    });
    console.log(form.value);
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res?.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    console.log('deptTree', deptTree.value);
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const loading = ref(false);
  const submit = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      loading.value = true;
      const content = {};
      const attachmentList = [];
      for (const key in form.value) {
        if (key === attachmentKey.value) {
          console.log(form.value[key]);
          form.value[key]?.forEach((item) => {
            attachmentList.push({
              fileName: item?.name,
              ossKey: item?.ossKey,
              componentName: key,
            });
          });
        } else if (form.value[key]) {
          content[key] = Array.isArray(form.value[key])
            ? JSON.stringify(form.value[key])
            : form.value[key];
        }
      }
      await dingApi.luteosPlatformOaSubmitDingOaAndRecord({
        configCode: applyInfo.value.value,
        creator: userInfo.memberCode,
        itemCode: ['0', '3'].includes(route.query?.type)
          ? route.query?.code
          : generateRandomString(),
        itemName: applyInfo.value.desc,
        workflowSubject: applyInfo.value.desc,
        itemType: applyInfo.value.remark,
        workflowType: 1,
        approveReq: {
          approveContent: content,
          approveAttachmentBeans: attachmentList,
        },
      });
      ElMessage.success('提交成功');
      closeTabAndRefresh(route.query.type < 3 ? '/shoplist' : '/operatingManagement');
      router.push(route.query.type < 3 ? '/shoplist' : '/operatingManagement');
    } finally {
      loading.value = false;
    }
  };

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    router.push(route.query.type < 3 ? '/shoplist' : '/operatingManagement');
  };

  const businessList = ref([]);
  const queryBusinessList = async () => {
    const res = await shopApi.luteosShopBusinessQueryList({
      pageNum: 1,
      pageSize: 500,
      bigStatus: 1,
    });
    businessList.value = res.recordList;
  };
  // queryBusinessList();

  onMounted(async () => {
    form.value = {};
    rules.value = {};
    await queryOptions();
    formRef.value?.resetFields();
  });

  onActivated(() => {
    if (route.query.type == 0 && route.query.code) {
      form.value['店铺账号'] = route.query.code;
    }
    if (route.query.type == 3 && route.query.shopList) {
      form.value['关联店铺'] = JSON.parse(decryptByBase64(route.query.shopList))?.join(',');
    }
    if (route.query.type == 3 && route.query.name) {
      form.value['公司名称'] = route.query.name;
    }
    queryBusinessList();
  });

  onDeactivated(() => {
    formRef.value?.resetFields();
  });
</script>

<style scoped lang="scss"></style>
0
