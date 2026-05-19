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
    popper-class="implementer-select"
    :size="size"
    :disabled="disabled"
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :max-collapse-tags="maxCollapseTags"
    :reserve-keyword="reserveKeyword"
    @change="handleChange"
    ref="selectRef"
  >
    <!--    <template #header v-if="multiple && selectAll">
      <div
        class="d-flex align-items-center gap-3 px-3 cursor-pointer select-all"
        @click="handleSelectAll"
      >
        <el-avatar class="flex-shrink-0" :src="getAllAvatar()" :size="35" />
        <div class="d-flex flex-column h-100">
          <div style="line-height: 20px">全部</div>
        </div>
      </div>
    </template>-->
    <template #default="{ item }">
      <div class="d-flex align-items-center gap-3 px-3">
        <el-avatar class="flex-shrink-0" :src="item.avatar || getImg()" :size="35" />
        <div class="d-flex flex-column h-100">
          <div style="line-height: 20px">{{ item.name }}</div>
          <div style="line-height: 20px" class="fs-7 text-gray-500">{{ item.title }}</div>
        </div>
      </div>
    </template>
    <template #label="{ label, value }">
      <el-space>
        <el-avatar :src="getAvatarByCode(value)" :size="20" />
        <span>{{ getNameByCode(label, value) }}</span>
      </el-space>
    </template>
  </el-select-v2>
  <!--  <el-select
    v-model="value"
    :placeholder="placeholder"
    filterable
    clearable
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item of operatorOptions"
      :label="item.name"
      :value="item.memberCode"
      :key="item.memberCode"
    />
  </el-select>-->
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  const props = withDefaults(
    defineProps<{
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
      demandMemberType?: number;
      source?: 'platformDemand' | 'custom';
      fetcher?: () => Promise<
        Array<{
          memberCode?: string;
          name?: string;
          avatar?: string;
          title?: string;
        }>
      >;
    }>(),
    {
      deptCode: 'all_dept',
      searchChildDept: true,
      teleported: false,
      clearable: true,
      disabled: false,
      reserveKeyword: false,
      preferNameWhenCodeNotFound: false,
      fallbackName: '',
      fallbackAvatar: '',
    }
  );

  const emit = defineEmits<{
    (e: 'change', val: string): void;
  }>();
  const selectRef = ref();
  const value = defineModel();
  const operatorOptions = ref<any[]>([]);
  const mapMembers = (members: any[] = []) =>
    members.map((item) => ({
      ...item,
      disabled: props.disabledList?.includes(item.memberCode),
    }));

  const loadOperatorOptions = async () => {
    try {
      let members: any[] = [];
      if (props.source === 'custom' && props.fetcher) {
        members = (await props.fetcher()) ?? [];
      } else {
        const res = await platformApi.platformDemandQueryMember({
          type: props.demandMemberType ?? 2,
        });
        members = res?.memberList ?? [];
      }
      if (props.filterSelf && props.selfMemberCode) {
        members = members.filter((item) => item.memberCode !== props.selfMemberCode);
      }
      operatorOptions.value = mapMembers(members);
    } catch (error) {
      console.error('Failed to fetch member options', error);
      operatorOptions.value = [];
    }
    if (props.selectAll && props.multiple) {
      operatorOptions.value?.unshift({
        memberCode: 'all',
        name: '全部',
        avatar: getAllAvatar(),
      });
    }
  };
  loadOperatorOptions();
  const getNameByCode = (defaultLabel: string, code: string) => {
    const option = operatorOptions.value.find((o) => o.memberCode === code);
    if (option) return option.name;
    if (props.preferNameWhenCodeNotFound) return props.fallbackName || defaultLabel;
    return defaultLabel;
  };

  const getAvatarByCode = (code: string) => {
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
    loadOperatorOptions();
  });
  watch(
    () => props.source,
    () => {
      loadOperatorOptions();
    }
  );
  watch(
    () => props.fetcher,
    () => {
      if (props.source === 'custom') {
        loadOperatorOptions();
      }
    }
  );
  const internalDisabled = ref(false);
  const disabled = computed(() => props.disabled || internalDisabled.value);

  const handleChange = (val) => {
    console.log('val', val);
    if (props.multiple && props.selectAll) {
      if (val?.length && val?.[val?.length - 1] === 'all') {
        emit('change', ['all']);
      } else {
        emit(
          'change',
          val?.filter((item) => item !== 'all')
        );
      }
    } else {
      if (!props.multiple) {
        internalDisabled.value = true;
        setTimeout(() => {
          internalDisabled.value = false;
        }, 0);
      }
      emit('change', val);
    }
  };

  const focus = () => {
    if (props.id) {
      document.getElementById(props.id)?.focus();
      // document.getElementById(props.id)?.click();
    }
  };

  const handleSelectAll = () => {
    emit(
      'change',
      operatorOptions.value?.map((item) => item.memberCode)
    );
    // value.value = operatorOptions.value?.map((item) => item.memberCode);
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
