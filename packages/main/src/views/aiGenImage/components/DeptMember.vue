<template>
  <el-select-v2
    :id="id"
    v-model="value"
    :placeholder="placeholder"
    filterable
    :clearable="clearable"
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
    :options="operatorOptions"
    :props="{
      label: 'name',
      value: 'memberCode',
    }"
    :item-height="54"
    popper-class="implementer-select ai-image-dept-member-select"
    :size="size"
    :disabled="disabled"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :max-collapse-tags="maxCollapseTags"
    :reserve-keyword="reserveKeyword"
    @change="handleChange"
    ref="selectRef"
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
    <template #label="{ label, value: optionValue }">
      <el-space>
        <el-avatar :src="getAvatarByCode(optionValue)" :size="20" />
        <span>{{ getNameByCode(label, optionValue) }}</span>
      </el-space>
    </template>
  </el-select-v2>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';
  import type { AiGenImageMemberOption } from '../hooks/useDeptMemberOptions';

  type DeptMemberValue = string | string[] | undefined;

  const props = withDefaults(
    defineProps<{
      modelValue?: DeptMemberValue;
      id?: string;
      placeholder?: string;
      deptCode?: string;
      deptId?: string;
      searchChildDept?: boolean;
      teleported?: boolean;
      clearable?: boolean;
      multiple?: boolean;
      selectAll?: boolean;
      title?: string;
      multipleLimit?: number;
      maxCollapseTags?: number;
      disabledList?: string[];
      size?: '' | 'large' | 'default' | 'small';
      disabled?: boolean;
      filterSelf?: boolean;
      selfMemberCode?: string;
      reserveKeyword?: boolean;
      // 是否需要兜底离职成员
      preferNameWhenCodeNotFound?: boolean;
      fallbackName?: string;
      fallbackAvatar?: string;
      // 是否需要查询全部人员（包括离职人员）
      isQueryAll?: boolean;
    }>(),
    {
      deptCode: 'all_dept',
      searchChildDept: true,
      teleported: false,
      clearable: true,
      disabled: false,
      reserveKeyword: true,
      preferNameWhenCodeNotFound: false,
      fallbackName: '',
      fallbackAvatar: '',
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', val: DeptMemberValue): void;
    (e: 'change', val: DeptMemberValue): void;
  }>();
  const selectRef = ref();
  const value = computed<DeptMemberValue>({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  });
  const operatorOptions = ref<AiGenImageMemberOption[]>([]);

  interface MemberListResp {
    memberList?: AiGenImageMemberOption[];
  }

  const getOperatorOptions = async () => {
    const res = props.title
      ? ((await memberApi.luteosMemberQueryMemberListByTitle({
          title: props.title,
        })) as MemberListResp)
      : ((await memberApi.luteosMemberQueryDeptMemberList({
          operatorDepartmentCode: props.isQueryAll ? undefined : props.deptCode,
          deptId: props.deptId,
          searchChildDept: props.isQueryAll ? undefined : props.searchChildDept,
        })) as MemberListResp);
    const memberList =
      props.filterSelf && props.selfMemberCode
        ? (res.memberList ?? []).filter((item) => item.memberCode !== props.selfMemberCode)
        : res.memberList ?? [];
    operatorOptions.value = memberList.map((item) => {
      return {
        ...item,
        disabled: props.disabledList?.includes(item.memberCode),
      };
    });
    if (props.selectAll && props.multiple) {
      operatorOptions.value?.unshift({
        memberCode: 'all',
        name: '全部',
        avatar: getAllAvatar(),
      });
    }
  };
  getOperatorOptions();
  const getNameByCode = (defaultLabel: string | number, code?: string | number) => {
    const option = operatorOptions.value.find((o) => o.memberCode === code);
    if (option) return option.name;
    if (props.preferNameWhenCodeNotFound) return props.fallbackName || String(defaultLabel || '');
    return String(defaultLabel || '');
  };

  const getAvatarByCode = (code?: string | number) => {
    const option = operatorOptions.value.find((o) => o.memberCode === code);
    if (option) return option.avatar || getImg();
    if (props.preferNameWhenCodeNotFound) return props.fallbackAvatar || getImg();
    return getImg();
  };
  watch(
    () => props.disabledList,
    () => {
      operatorOptions.value = operatorOptions.value.map((item) => {
        return {
          ...item,
          disabled: props.disabledList?.includes(item.memberCode),
        };
      });
    }
  );
  watch([() => props.filterSelf, () => props.selfMemberCode], () => {
    getOperatorOptions();
  });
  const internalDisabled = ref(false);
  const disabled = computed(() => props.disabled || internalDisabled.value);

  const handleChange = (val: DeptMemberValue) => {
    if (props.multiple && props.selectAll) {
      if (Array.isArray(val) && val.length && val[val.length - 1] === 'all') {
        emit('update:modelValue', ['all']);
        emit('change', ['all']);
      } else {
        const nextValue = Array.isArray(val) ? val.filter((item) => item !== 'all') : [];
        emit('update:modelValue', nextValue);
        emit('change', nextValue);
      }
    } else {
      if (!props.multiple) {
        internalDisabled.value = true;
        setTimeout(() => {
          internalDisabled.value = false;
        }, 0);
      }
      emit('update:modelValue', val);
      emit('change', val);
    }
  };

  const focus = () => {
    if (props.id) {
      document.getElementById(props.id)?.focus();
      // document.getElementById(props.id)?.click();
    }
  };

  const getImg = () => {
    return new URL(`@/assets/images/icon/defaultAvatar.png`, import.meta.url).href;
  };

  const getAllAvatar = () => {
    return new URL(`@/assets/images/icon/all.svg`, import.meta.url).href;
  };

  defineExpose({ focus, selectRef });
</script>

<style scoped lang="scss">
  .select-all {
    padding: 4px 0;
  }
  .select-all:hover {
    background-color: var(--el-fill-color-light);
  }
</style>

<style lang="scss">
  .ai-image-dept-member-select {
    .el-select-dropdown__item .el-select-checkbox,
    .el-select-all__checkbox .el-select-checkbox {
      padding-right: 0 !important;
    }
  }
</style>
