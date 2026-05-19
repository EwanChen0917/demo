<template>
  <el-dialog width="750px" title="修改地址" :model-value="visible" @close="visible = false">
    <h5>原地址</h5>
    <div class="addr-card">
      <div class="mb-1">
        {{ oldInfo?.provinceName }} {{ oldInfo?.cityName }} {{ oldInfo?.areaName }}
      </div>
      <div class="mb-1 fw-bold">{{ oldInfo?.address }}</div>
      <div class="mb-1 fw-bold">{{ oldInfo?.receiverName }} {{ oldInfo?.receiverPhone }}</div>
    </div>
    <h5>新地址</h5>
    <el-form
      :model="editInfo"
      ref="formRef"
      :rules="rules"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="收件地址" prop="addrCode">
        <el-cascader
          size="small"
          style="width: 100%"
          v-model="editInfo.addrCode"
          :options="areaOptions"
          :props="{
            label: 'name',
            value: 'code',
          }"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          size="small"
          v-model="editInfo.address"
          clearable
          show-word-limit
          :maxlength="100"
        />
      </el-form-item>
      <el-form-item label="收件人名" prop="receiverName">
        <el-input
          size="small"
          v-model="editInfo.receiverName"
          clearable
          show-word-limit
          :maxlength="20"
        />
      </el-form-item>
      <el-form-item label="收件人电话" prop="receiverPhone">
        <el-input size="small" v-model="editInfo.receiverPhone" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import areaOptions from '../../../../../public/area.js';

  const editInfo = ref({});
  const formRef = ref();
  const rules = reactive({
    addrCode: [{ required: true, message: '请输入收件地址' }],
    address: [{ required: true, message: '请输入详细地址' }],
    receiverName: [{ required: true, message: '请输入收件人名' }],
    receiverPhone: [
      { required: true, message: '请输入收件人电话' },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号',
      },
    ],
  });

  const visible = ref(false);
  const emit = defineEmits(['success']);

  const oldInfo = ref();
  const open = (row) => {
    oldInfo.value = row;
    editInfo.value = {
      addrCode: [row.provinceCode, row.cityCode, row.areaCode],
      address: row.address,
      receiverName: row.receiverName,
      receiverPhone: row.receiverPhone,
    };
    formRef.value?.resetFields();
    visible.value = true;
  };

  const submit = async () => {
    formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        try {
          const res = await productApi.luteosProductMallUserOperateOrder({
            address: {
              orderCode: oldInfo.value.orderCode,
              ...editInfo.value,
              provinceCode: editInfo.value?.addrCode[0],
              cityCode: editInfo.value?.addrCode[1],
              areaCode: editInfo.value?.addrCode[2],
            },
            operateType: 'update_addr',
          });
          ElMessage.success('修改成功');
          emit('success');
        } finally {
          visible.value = false;
        }
      }
    });
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .addr-card {
    border-radius: 8px;
    padding: 10px;
    background-color: rgba(238, 238, 238, 0.65);
    margin-bottom: 12px;
    font-size: 14px;
    font-family: 'PingFang SC';
    .edit {
      display: flex;
      column-gap: 8px;
      align-items: center;
      .el-icon {
        cursor: pointer;
      }
    }
  }
</style>
