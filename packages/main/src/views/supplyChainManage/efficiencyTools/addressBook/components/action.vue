<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="50%"
    :before-close="close"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      :disabled="mode === 'detail'"
    >
      <el-row gutter="40">
        <el-col :span="12">
          <el-form-item label="地址名称" prop="addressName">
            <el-input
              v-model="form.addressName"
              placeholder="请输入地址名称"
              maxlength="100"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址类型" prop="addressType">
            <el-select v-model="form.addressType" placeholder="请选择地址类型" clearable>
              <el-option
                v-for="item in AddressTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="form.companyName"
              placeholder="请输入公司名称"
              maxlength="100"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contacts">
            <el-input
              v-model="form.contacts"
              placeholder="请输入联系人"
              maxlength="30"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              maxlength="100"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库代码" prop="warehouseCode">
            <el-input
              v-model="form.warehouseCode"
              placeholder="请输入仓库代码"
              maxlength="30"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              maxlength="30"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家/地区" prop="countryCode">
            <CountrySelect
              v-model="form.countryCode"
              clearable
              teleported="true"
              placeholder="请选择国家/地区"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省/州" prop="state">
            <el-input
              v-model="form.state"
              placeholder="请输入省/州"
              maxlength="50"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市" prop="city">
            <el-input
              v-model="form.city"
              placeholder="请输入城市"
              maxlength="50"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="区/县" prop="district">
            <el-input
              v-model="form.district"
              placeholder="请输入区/县"
              maxlength="50"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="街道" prop="street">
            <el-input
              v-model="form.street"
              placeholder="请输入街道"
              maxlength="200"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编" prop="zipCode">
            <el-input
              v-model="form.zipCode"
              placeholder="请输入邮编"
              maxlength="50"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址1" prop="address1">
            <el-input
              v-model="form.address1"
              placeholder="请输入详细地址1"
              maxlength="200"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详细地址2" prop="address2">
            <el-input
              v-model="form.address2"
              placeholder="请输入详细地址2"
              maxlength="200"
              show-word-limit
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="mode !== 'add'">
          <el-form-item label="更新时间" prop="updateTime">
            <el-input v-model="form.updateTime" placeholder="请输入更新时间" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="mode !== 'add'">
          <el-form-item label="更新人" prop="updator">
            <el-input v-model="form.updator" placeholder="请输入更新时间" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { AddressTypeOptions } from '../enum';
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (event: 'save', reload?: boolean): void;
  }>();
  const mode = ref<'add' | 'edit' | 'detail'>('add');
  const form = ref({});
  const rules = ref({
    addressName: [{ required: true, message: '请输入地址名称', trigger: 'blur' }],
    addressType: [{ required: true, message: '请选择地址类型', trigger: 'blur' }],
    contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
    warehouseCode: [{ required: true, message: '请输入仓库代码', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请输入国家/地区', trigger: 'blur' }],
    state: [{ required: true, message: '请输入省/州', trigger: 'blur' }],
    city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    zipCode: [{ required: true, message: '请输入邮编', trigger: 'blur' }],
    address1: [{ required: true, message: '请输入详细地址1', trigger: 'blur' }],
  });
  const title = computed(() => {
    return mode.value === 'add'
      ? '添加收货地址'
      : mode.value === 'edit'
      ? '编辑收货地址'
      : '查看收货地址';
  });
  const visible = ref(false);
  const formRef = ref();
  const saveLoading = ref(false);
  const handleSubmit = () => {
    const api =
      mode.value === 'add'
        ? erpApi.luteosErpLogisticsAddressAdd
        : erpApi.luteosErpLogisticsAddressUpdate;
    formRef.value
      ?.validate(async (isValid) => {
        if (isValid) {
          saveLoading.value = true;
          await api({
            ...form.value,
          }).finally(() => {
            saveLoading.value = false;
          });
          ElMessage.success('操作成功');
          emit('save');
          formRef.value.resetFields();
          visible.value = false;
        }
      })
      .catch(() => false);
  };

  const open = (params: typeof mode.value, detail?: any) => {
    formRef.value?.resetFields();
    visible.value = true;
    mode.value = params;
    if (detail) {
      form.value = { ...detail };
    } else {
      form.value = {};
    }
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
