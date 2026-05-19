<template>
  <el-dialog :model-value="visible" @close="$emit('close')" title="提醒">
    <div class="mb-5">请选择需要提醒的内容及提醒人</div>
    <el-form ref="remindForm" :model="form" class="w-100" :rules="rules">
      <el-form-item prop="noticeType">
        <el-radio-group v-model="form.noticeType" @change="handleNoticeTypeChange">
          <el-radio :label="1">1.提醒填写采购信息</el-radio>
          <el-radio :label="2">2.提醒填写报关信息</el-radio>
          <el-radio :label="3">3.提醒填写清关信息</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="type">
        <el-select
          placeholder="请选择提醒人/部门"
          v-model="form.type"
          @change="handleTypeChange"
          class="w-100"
        >
          <el-option label="提醒部门（部门所有人都收到提醒）" :value="1" />
          <el-option label="提醒指定人（仅指定人收到提醒）" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item prop="userIdList" v-if="form.type">
        <el-select
          :placeholder="form.type === 1 ? '请选择提醒部门' : '请选择提醒人'"
          v-model="form.userIdList"
          class="w-100"
          multiple
          clearable
          filterable
          :options="Object.entries(userMap).map((item) => ({ value: item[0], label: item[1] }))"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" v-loading="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ProductSkuNotifyReq } from '@/api/product/data-contracts';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';

  const LOGISTICS_DEP = '551022831';

  const props = defineProps<{
    visible: boolean;
    skuCodes: string[];
  }>();

  watch(
    () => props.visible,
    () => {
      if (props.visible) {
        remindForm.value?.resetFields();
      }
    }
  );

  const remindForm = ref<FormInstance>();
  const form = reactive<ProductSkuNotifyReq>({
    /** 部门或人员名称 */
    name: '',
    /**
     * 通知类型：1：采购，2：报关，3：清关
     * @format int32
     */
    noticeType: '',
    /** SKU名称集合 */
    skuCodeNames: [],
    /** 产品SKU集合 */
    skuCodes: [],
    /**
     * 通知类型：1：部门，2：人员
     * @format int32
     */
    type: '',
    /** 部门或人员ID */
    userIdList: [],
  });
  const rules = reactive<FormRules>({
    noticeType: [{ required: true, message: '请选择提醒类型', trigger: 'change' }],
    type: [{ required: true, message: '请选择提醒人/部门', trigger: 'change' }],
    userIdList: [{ required: true, message: '请选择提醒人/部门', trigger: 'change' }],
  });

  const handleNoticeTypeChange = (noticeType) => {
    if (noticeType === 3 && form.type === 1 && form.userIdList.length === 0) {
      form.userIdList.push(LOGISTICS_DEP);
    }
  };

  const userMap = ref({});
  const handleTypeChange = async (type) => {
    form.userIdList = [];
    userMap.value = await productApi.luteosProductSkuQueryDeptOrMember({
      type,
    });
    if (type === 1 && form.noticeType === 3 && form.userIdList.length === 0) {
      form.userIdList.push(LOGISTICS_DEP);
    }
  };
  const loading = ref<boolean>(false);
  const handleSave = async () => {
    console.log(props.skuCodes);
    try {
      const valid = await remindForm.value.validate();
      if (valid) {
        loading.value = true;
        await productApi.luteosProductSkuSaveWorkflowRecord({
          noticeType: form.noticeType,
          type: form.type,
          userIdList: form.userIdList,
          skuCodes: props.skuCodes,
        });
        ElMessage.success('已发起提醒');
      }
    } finally {
      loading.value = false;
    }
  };
</script>

<style scoped lang="scss"></style>
