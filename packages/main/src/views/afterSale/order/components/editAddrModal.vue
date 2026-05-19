<template>
  <el-dialog
    title="修改地址"
    v-model="visible"
    @close="visible = false"
    width="700"
    class="editAddrModal"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="167px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="Street address :" prop="streetAddress">
            <!-- :site="form.site" -->
            <el-input
              maxlength="255"
              show-word-limit
              v-model="form.streetAddress"
              placeholder="Please enter your Street address"
              clearable
            />
          </el-form-item>
          <el-form-item label="Apartment, suite, etc :" prop="apartmentSuiteEtc :">
            <el-input
              maxlength="255"
              show-word-limit
              v-model="form.apartmentSuiteEtc"
              placeholder="Please enter your Apartment, suite, etc"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="City :" prop="city">
            <el-input
              maxlength="100"
              show-word-limit
              v-model="form.city"
              placeholder="Please enter your City"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="Country :" prop="country">
            <el-select
              v-model="form.country"
              placeholder="Please select your Country"
              clearable
              filterable
              :teleported="false"
              @change="handleCountryChange"
            >
              <el-option
                v-for="item in countryList"
                :value="item?.countryCode"
                :label="`${item?.countryNameEn}(${item?.countryCode})`"
                :key="item?.countryCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="Province/State :" prop="province">
            <!-- <el-input  maxlength="255" show-word-limit
              v-model="form.province"
              placeholder="Please select your Province/State"
              clearable
            /> -->
            <el-select
              v-model="form.province"
              placeholder="Please select your Province/State"
              clearable
              filterable
              :teleported="false"
            >
              <el-option
                v-for="item in provinceList"
                :value="item?.provinceCode"
                :label="item?.provinceCode"
                :key="item?.provinceCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="Postal Code :" prop="postalCode">
            <el-input
              show-word-limit
              maxlength="30"
              v-model="form.postalCode"
              placeholder="Please enter your Postal Code"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  // import useList from '@/hooks/list/useList';
  import { afterSaleApi, platformApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    address: '',
    streetAddress: '',
    apartmentSuiteEtc: '',
    city: '',
    country: '',
    province: '',
    postalCode: '',
  });

  const rules = reactive({
    streetAddress: [
      {
        required: true,
        message: 'Please enter your Street address',
        trigger: ['blur', 'change'],
      },
    ],
    apartmentSuiteEtc: [
      {
        required: false,
        message: 'Please enter your Apartment, suite, etc',
        trigger: ['blur', 'change'],
      },
    ],
    city: [
      {
        required: true,
        message: 'Please enter your City',
        trigger: ['change', 'blur'],
      },
    ],
    country: [
      {
        required: true,
        message: 'Please select your Country',
        trigger: ['change', 'blur'],
      },
    ],
    province: [
      {
        required: false,
        message: 'Please select your Province/State',
        trigger: ['change', 'blur'],
      },
    ],
    postalCode: [
      {
        required: true,
        message: 'Please enter your Postal Code',
        trigger: ['change', 'blur'],
      },
    ],
  });
  const countryList: any = ref([]);
  const queryCountryList = async () => {
    const res = await platformApi.platformV1CountryQueryCountryList({
      channel: 'amazon',
    });
    if (res.countryList) {
      countryList.value = res.countryList;
    }
  };
  const provinceList: any = ref([]);
  const queryProvinceList = async () => {
    if (!form.value.country) {
      return;
    }
    const res = await platformApi.platformV1ProvinceQueryProvinceList({
      countryCode: form.value.country,
    });
    if (res.provinceList) {
      provinceList.value = res.provinceList;
    }
  };
  const changeProvinceRequired = (item) => {
    // console.log('changeProvinceRequired', item);
    for (let i = 0; i < countryList.value.length; i += 1) {
      const item2 = countryList.value[i];
      if (item2.countryCode === item) {
        rules.province[0].required = item2.provinceRequired;
        // if (form.value.province) {
        // formRef.value.clearValidate('province');
        // }
        break;
      }
      // else if (i === countryList.value.length - 1) {
      //   rules.province[0].required = item2.provinceRequired;
      // }
    }
  };
  const handleCountryChange = async (item) => {
    changeProvinceRequired(item);
    form.value.province = '';
    await queryProvinceList();
  };
  const open = async (item) => {
    form.value = item;
    visible.value = true;
    await queryCountryList();
    changeProvinceRequired(item.country);
    await queryProvinceList();
  };
  const close = () => {
    visible.value = false;
    // resetData();
  };
  // 确定按钮状态
  const loading = ref(false);
  const save = async () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
    await afterSaleApi.luteosAfterSaleReplacementEditAddress({ ...form.value });
    loading.value = false;
    ElMessage.success('修改地址成功');
    emits('success');
    close();
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped>
  :global(.keen-ui .editAddrModal .el-dialog__body) {
    height: 540px;
  }
</style>
