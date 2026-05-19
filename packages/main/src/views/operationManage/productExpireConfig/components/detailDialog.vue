<template>
  <el-dialog :title="title" width="500px" v-model="visibility" :before-close="close">
    <el-form :model="formData" ref="form" :rules="rules" label-width="110px" scroll-to-error>
      <el-form-item label="商品层级：" prop="configType">
        <el-select :disabled="mode === 'edit'" style="width: 100%" v-model="formData.configType">
          <el-option
            v-for="item in configTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="formData.configType" prop="goodsSn">
        <el-input :disabled="mode === 'edit'" v-model="formData.goodsSn" maxlength="100" />
      </el-form-item>
      <el-form-item label="提醒时间点：" prop="remindDays">
        <div style="display: flex">
          <span style="margin-right: 12px">订单完成后</span>
          <Num
            style="flex: 1"
            :min="0"
            :max="99999"
            v-model="formData.remindDays"
            :precision="0"
            prefixIcon
            suffixIcon
          >
            <template #suffix>天</template>
          </Num>
        </div>
      </el-form-item>
      <el-form-item label="持续时间：" prop="durationDays">
        <Num :min="1" :max="99999" v-model="formData.durationDays" :precision="0" suffixIcon>
          <template #suffix>天</template>
        </Num>
      </el-form-item>
      <el-form-item label="跳转链接：" prop="link">
        <el-input v-model="formData.link" maxlength="255" />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button :disabled="loading" @click="close">取消</el-button>
        <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Num from '@/components/NumberInput/index.vue';
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const visibility = ref(false);
  const configTypeList = ref<any[]>([
    {
      label: '品类',
      value: '层级',
    },
    {
      label: 'SPU',
      value: 'SPU',
    },
    {
      label: 'SKU',
      value: 'SKU',
    },
  ]);
  const mode = ref('add');
  const form = ref();
  const formData = ref<any>({
    configType: 'SPU',
    durationDays: undefined,
    goodsSn: '',
    recordCode: '',
    remindDays: undefined,
    status: '',
    link: '',
    title: '',
  });
  const rules = ref({
    configType: [{ required: true, message: '请选择商品层级' }],
    durationDays: [{ required: true, message: '请输入持续时间天数' }],
    goodsSn: [{ required: true, message: '请输入商品类别/spu/sku' }],
    // recordCode: [{ required: true, message: '必填' }],
    remindDays: [{ required: true, message: '请输入提醒时间天数' }],
    status: [{ required: true, message: '请选择策略状态' }],
    link: [{ required: true, message: '请输入跳转链接' }],
  });
  const title = ref('添加策略');
  const open = async (recordCode = '') => {
    if (!recordCode) {
      mode.value = 'add';
      title.value = '添加策略';
      visibility.value = true;
    } else {
      title.value = '编辑策略';
      mode.value = 'edit';
      const res = await productApi.luteosProductExpireConfigInfo({
        recordCode,
      });
      formData.value.configType = res.configType;
      formData.value.durationDays = res.durationDays;
      formData.value.goodsSn = res.goodsSn;
      formData.value.recordCode = res.recordCode;
      formData.value.remindDays = res.remindDays;
      formData.value.status = res.status;
      formData.value.link = res.link;
      visibility.value = true;
    }
  };
  const loading = ref(false);
  const save = async () => {
    const valid = await form.value.validate();
    if (valid) {
      loading.value = true;
      const fn =
        mode.value === 'add'
          ? productApi.luteosProductExpireConfigSave
          : productApi.luteosProductExpireConfigUpdate;

      await fn(formData.value).finally(() => {
        loading.value = false;
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value.clearValidate();
    formData.value = {
      configType: 'SPU',
      durationDays: undefined,
      goodsSn: '',
      recordCode: '',
      remindDays: undefined,
      status: '',
      link: '',
      title: '',
    };
    visibility.value = false;
  };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
