<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="visible = false"
    width="600"
    class="editShopModal"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="167px" label-position="left">
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="IOSS税号 :" prop="taxNo">
            <!-- <el-select
              v-model="form.shopName"
              placeholder="请选择IOSS税号"
              clearable
              filterable
              :teleported="false"
              @change="handleShopNameChange"
            >
              <el-option
                v-for="item in shopList"
                :value="item?.shopName"
                :label="item?.shopName"
                :key="item?.shopName"
              />
            </el-select> -->
            <el-input
              show-word-limit
              maxlength="100"
              v-model="form.taxNo"
              placeholder="请输入IOSS税号"
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
  import { omsApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';

  const visible = ref(false);

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    taxNo: '',
    taxArr: [],
  });

  const rules = reactive({
    taxNo: [
      {
        required: true,
        message: '请输入IOSS税号',
        trigger: ['change', 'blur'],
      },
    ],
  });
  // type:1 单独设置
  const title = ref('批量设置IOSS税号');
  const open = async (item, type) => {
    if (type === 1) {
      title.value = '设置IOSS税号';
      form.value.taxNo = item[0]?.iossNumber;
    }
    // form.value.taxNo = '';
    formRef.value?.clearValidate();
    form.value.taxArr = [];
    // console.log('item', item);
    form.value.taxArr = item;
    visible.value = true;
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
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      form.value.taxArr.forEach((item: any) => {
        item.iossNumber = form.value.taxNo;
        return item;
      });
      // console.log(form.value.taxArr);
      // return;
      await omsApi.omsRuleTaxReset({ updateList: form.value.taxArr });
      loading.value = false;
      ElMessage.success('更换IOSS税号成功');
      emits('success');
      close();
      form.value.taxNo = '';
      nextTick(() => {
        form.value.taxNo = '';
        formRef.value?.clearValidate();
      });
    }
  };
  const emits = defineEmits<{
    (success: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped>
  :global(.keen-ui .editShopModal .el-dialog__body) {
    height: 340px;
  }
</style>
