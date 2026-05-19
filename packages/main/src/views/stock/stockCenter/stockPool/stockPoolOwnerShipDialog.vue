<template>
  <el-dialog
    :title="props.type === 'add' ? '新增分配池货权' : '编辑分配池货权'"
    v-model="visibility"
    destroy-on-close
    width="800px"
    height="600px"
  >
    <el-form ref="poolOwnerShipForm" label-width="120px" :rules="rules" :model="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="分配池编码">
            <el-input disabled v-model="form.poolCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配池名称">
            <el-input disabled v-model="form.poolName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="货权条件" prop="authorityType">
            <el-select v-model="form.authorityType" clearable>
              <el-option value="CHANNEL" label="渠道" />
              <!-- <el-option value="REGION" label="区域"></el-option> -->
              <el-option value="COUNTRY" label="国家" />
              <el-option value="SITE" label="站点" />
              <el-option value="SALESMAN" label="业务员" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" clearable :options="statusMap" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 100px">
        <el-col :span="12">
          <el-form-item label="渠道" prop="channelCode" v-if="form.authorityType === 'CHANNEL'">
            <!-- <ProductChannelSelect2
              v-model="form.channelCode"
              clearable
              class="w-200px"
              placeholder="请选择渠道"
            /> -->
            <el-select v-model="form.channelCode" clearable :options="channelList" filterable />
          </el-form-item>
          <el-form-item label="区域" prop="regionCode" v-if="form.authorityType === 'REGION'">
            <el-select v-model="form.regionCode" />
          </el-form-item>
          <el-form-item label="国家" prop="countryCode" v-if="form.authorityType === 'COUNTRY'">
            <!-- <CountrySelect
              v-model="form.countryCode"
              placeholder="请选择国家"
              clearable
              filterable
              class="w-200px"
            /> -->
            <el-select v-model="form.countryCode" clearable :options="countryList" filterable />
          </el-form-item>
          <el-form-item label="站点" prop="siteCode" v-if="form.authorityType === 'SITE'">
            <el-select v-model="form.siteCode" clearable :options="siteList" filterable />
          </el-form-item>
          <el-form-item label="业务员" prop="salesmanCode" v-if="form.authorityType === 'SALESMAN'">
            <!-- <DeptMember
              v-model="form.salesmanCode"
              placeholder="请选择运营人员"
              deptId="65717209"
              clearable
              class="w-200px operatorSelect"
              multiple
            /> -->
            <el-select-v2
              collapse-tags
              collapse-tags-tooltip
              multiple
              :item-height="54"
              :multiple-limit="3"
              v-model="form.salesmanCode"
              clearable
              :options="salesmanList"
              filterable
            >
              <template #default="{ item }">
                <div class="d-flex align-items-center gap-3 px-3">
                  <el-avatar class="flex-shrink-0" :src="item.avatar || getImg()" :size="35" />
                  <div class="d-flex flex-column h-100">
                    <div style="line-height: 20px">{{ item.name }}</div>
                    <div style="line-height: 20px" class="fs-7 text-gray-500">{{ item.title }}</div>
                  </div>
                </div>
              </template>
              <template #label="{ label, value }">
                <el-space>
                  <el-avatar
                    :src="
                      salesmanList?.find((item) => item.memberCode === value || getImg())?.avatar
                    "
                    :size="20"
                  />
                  <span>{{ label }}</span>
                </el-space>
              </template>
            </el-select-v2>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClickCancel">取消</el-button>
      <el-button @click="handleClickSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cisApi } from '@/api';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { statusMap } from '../config/pool';
  import { usePoolOwnerShipData } from '../hooks/usePoolOwnerShipData';

  const { siteList, channelList, countryList, salesmanList, findNamesByValues, regionList } =
    usePoolOwnerShipData();
  const visibility = ref(false);
  const emit = defineEmits<{
    success: [];
  }>();
  const open = (rowData?: any) => {
    visibility.value = true;
    if (rowData && rowData.id) {
      // 编辑态，回填数据
      form.id = rowData.id;
      form.authorityType = rowData.authorityType;
      form.status = rowData.status;
      form.version = rowData.version;
      // 根据不同的货权类型回填对应的字段
      // eslint-disable-next-line default-case
      switch (rowData.authorityType) {
        case 'CHANNEL':
          form.channelCode = rowData.channelCode;
          break;
        case 'REGION':
          form.regionCode = rowData.regionCode;
          break;
        case 'COUNTRY':
          form.countryCode = rowData.countryCode;
          break;
        case 'SITE':
          form.siteCode = rowData.siteCode;
          break;
        case 'SALESMAN':
          form.salesmanCode = rowData.salesmanCode;
          break;
      }
    } else {
      // 新增态，重置表单
      resetForm();
    }
  };
  const props = defineProps<{
    poolCode: string;
    poolName: string;
    type: 'add' | 'edit';
  }>();
  const form = reactive({
    id: undefined,
    version: 0,
    poolCode: '',
    poolName: '',
    authorityType: 'CHANNEL',
    status: 1,
    channelCode: '',
    countryCode: '',
    regionCode: '',
    salesmanCode: '',
    siteCode: '',
    warehouseTypes: '',
  });
  // 动态校验规则
  const rules = computed<FormRules>(() => {
    const baseRules: FormRules = {
      authorityType: [{ required: true, message: '请选择货权条件', trigger: 'change' }],
      status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    };
    // 根据选择的货权条件，动态添加对应的必填校验
    // eslint-disable-next-line default-case
    switch (form.authorityType) {
      case 'CHANNEL':
        baseRules.channelCode = [{ required: true, message: '请选择渠道', trigger: 'change' }];
        break;
      case 'REGION':
        baseRules.regionCode = [{ required: true, message: '请选择区域', trigger: 'change' }];
        break;
      case 'COUNTRY':
        baseRules.countryCode = [{ required: true, message: '请选择国家', trigger: 'change' }];
        break;
      case 'SITE':
        baseRules.siteCode = [{ required: true, message: '请选择站点', trigger: 'change' }];
        break;
      case 'SALESMAN':
        baseRules.salesmanCode = [{ required: true, message: '请选择业务员', trigger: 'change' }];
        break;
    }
    return baseRules;
  });
  const poolOwnerShipForm = ref<FormInstance>();
  const loading = ref(false);
  const getImg = () => {
    return new URL(`@/assets/images/icon/defaultAvatar.png`, import.meta.url).href;
  };
  const resetForm = () => {
    form.id = undefined;
    form.authorityType = 'CHANNEL';
    form.status = 1;
    form.channelCode = '';
    form.countryCode = '';
    form.regionCode = '';
    form.salesmanCode = '';
    form.siteCode = '';
  };
  const handleClickCancel = () => {
    visibility.value = false;
    resetForm();
  };
  watch(
    () => props.poolCode,
    (newVal) => {
      if (newVal) {
        form.poolCode = newVal;
      }
    },
    { immediate: true }
  );
  watch(
    () => props.poolName,
    (newVal) => {
      if (newVal) {
        form.poolName = newVal;
      }
    },
    { immediate: true }
  );
  const handleClickSave = async () => {
    if (!poolOwnerShipForm.value) return;
    try {
      loading.value = true;
      const valid = await poolOwnerShipForm.value.validate().catch(() => {
        return false;
      });
      if (!valid) return;
      const params = buildParams();
      // console.log(`params`, params);
      // return;
      if (props.type === 'add') {
        await cisApi.cisPoolAuthoritySave(params);
        ElMessage.success('新增成功');
      } else if (props.type === 'edit') {
        params.id = form.id;
        params.version = form.version;
        await cisApi.cisPoolAuthoritySave(params);
        ElMessage.success('编辑成功');
      }
      handleClickCancel();
      // 通知父组件刷新列表
      emit('success');
    } catch (e) {
      // console.log(e);
      /** empty */
    } finally {
      loading.value = false;
    }
  };
  const buildParams = () => {
    const baseParams = {
      id: form.id,
      version: undefined as any,
      poolCode: form.poolCode,
      authorityType: form.authorityType,
      status: form.status,
    };
    switch (form.authorityType) {
      case 'CHANNEL':
        return {
          ...baseParams,
          channelCode: form.channelCode,
          channelName: findNamesByValues(channelList.value, form.channelCode).join(','),
        };
      case 'REGION':
        return {
          ...baseParams,
          regionCode: form.regionCode,
          regionName: findNamesByValues(regionList.value, form.regionCode).join(','),
        };
      case 'COUNTRY':
        return {
          ...baseParams,
          countryCode: form.countryCode,
          countryName: findNamesByValues(countryList.value, form.countryCode).join(','),
        };
      case 'SITE':
        return {
          ...baseParams,
          siteCode: form.siteCode,
          siteName: findNamesByValues(siteList.value, form.siteCode).join(','),
        };
      case 'SALESMAN':
        return {
          ...baseParams,
          salesmanCode: form.salesmanCode.join(','),
          salesmanName: findNamesByValues(salesmanList.value, form.salesmanCode).join(','),
        };
      default:
        return baseParams;
    }
  };
  onMounted(() => {});
  defineExpose({
    open,
  });
</script>

<style></style>
