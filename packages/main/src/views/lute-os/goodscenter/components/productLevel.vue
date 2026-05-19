<template>
  <el-form
    ref="formRef"
    :model="props.form"
    :rules="rules"
    label-width="150"
    label-position="left"
    class="px-7"
  >
    <el-form-item :label="productType + '等级：'" prop="productLevel">
      <span v-if="isDetail">{{ form.productLevelDesc }}</span>
      <el-select
        v-else
        v-model="props.form.productLevel"
        :placeholder="'请选择' + productType + '等级'"
        clearable
        :teleported="false"
      >
        <el-option
          v-for="(val, key) in levelMap"
          :key="key"
          :label="val || ''"
          :value="parseInt(key)"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否需要质检：" prop="qualityCheck">
      <span v-if="isDetail">{{ form.qualityCheckDesc }}</span>
      <el-radio-group v-else v-model="props.form.qualityCheck" class="ml-4">
        <el-radio :label="1">需要</el-radio>
        <el-radio :label="0">不需要</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';

  const levelMap = {
    0: '暂无',
    1: '正常',
    2: '淘汰',
    3: '侵权',
  };

  const props = withDefaults(
    defineProps<{
      form: any;
      productType: string;
      isDetail?: boolean;
    }>(),
    {
      productType: '产品',
    }
  );
  // 表单定义
  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    /* productLevel: [
{
required: true,
message: '请选择产品等级',
trigger: ['blur', 'change'],
},
],
qualityCheck: [
{
required: true,
message: '是否需要质检',
trigger: ['blur', 'change'],
},
], */
  });

  defineExpose({
    form: props.form,
    formRef,
  });
</script>

<style scoped lang="scss"></style>
