<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    clearable
    filterable
    :multiple="multiple"
    :teleported="teleported"
  >
    <template #label="{ label, value }">
      <el-space>
        <el-avatar
          :src="memberOptions?.find((item) => item.memberCode === value)?.avatar || getImg()"
          :size="20"
        />
        <span>{{ label }}</span>
      </el-space>
    </template>
    <el-option
      v-for="item in memberOptions"
      :key="item.memberCode"
      :label="item.name || ''"
      :value="item.memberCode!"
    >
      <el-space>
        <el-avatar :src="item.avatar || getImg()" :size="20" />
        <span>{{ item.name }}</span>
      </el-space>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
  import { pdtApi } from '@/api/index';
  // 员工类型 1-产品经理 2-项目经理
  const props = withDefaults(
    defineProps<{
      operatorType?: 1 | 2;
      teleported?: boolean;
      placeholder?: string;
      multiple?: boolean;
    }>(),
    {
      operatorType: 1,
      teleported: false,
      placeholder: '产品经理',
      multiple: false,
    }
  );
  const value = ref();
  const memberOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: props.operatorType,
    });
    memberOptions.value = res.memberList as [];
  };
  getOperatorOptions();
  const getImg = () => {
    return new URL(`@/assets/images/icon/defaultAvatar.png`, import.meta.url).href;
  };
</script>

<style scoped lang="scss"></style>
