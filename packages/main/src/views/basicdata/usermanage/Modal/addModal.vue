<template>
  <LuteModal
    v-model:visible="props.visible"
    title="Add a Customer"
    width="50%"
    cancelText="Discard"
    confirmText="Submit"
    @close="handleClose"
    @save="handleSubmit"
  >
    <template #body>
      <LuteForm :model="form" :rules="rules" ref="eleFormRef">
        <LuteFormItem label="Name" prop="name">
          <LuteInput v-model="form.name" inputStyle="solid" />
        </LuteFormItem>
        <LuteFormItem label="Activity zone">
          <LuteInput v-model="form.region" inputStyle="solid" />
        </LuteFormItem>
        <LuteFormItem label="Activity form">
          <LuteInput v-model="form.type" inputStyle="solid" />
        </LuteFormItem>
      </LuteForm>
    </template>
  </LuteModal>
</template>

<script setup lang="ts">
  import { LuteForm, LuteFormItem } from 'lute_quark';
  import LuteModal from '@/packages/modal';
  import LuteInput from '@/packages/input';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
    }>(),
    {
      visible: false,
      title: '提示'
    }
  );

  const state = reactive<{
    form: any;
    rules: any;
  }>({
    form: {
      name: 'Sean Bean12',
      region: 'sean@dellito.com',
      type: ''
    },
    rules: {}
  });

  const { form, rules } = toRefs(state);

  rules.value = {
    name: { required: true, message: 'Please input Activity name', trigger: ['blur', 'change'] }
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    emit('closeModal');
  };

  const handleSubmit = () => {};
</script>

<style lang="scss" scoped></style>
