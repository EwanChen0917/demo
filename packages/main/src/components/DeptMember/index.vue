<template>
  <el-select-v2
    ref="deptMemberSelectRef"
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
    @change="handleChange"
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
        <el-avatar
          :src="operatorOptions?.find((item) => item.memberCode === value)?.avatar || getImg()"
          :size="20"
        />
        <span>{{ label }}</span>
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
  import { memberApi } from '@/api';

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
      manual?: boolean;
      manualOptions?: any[];
    }>(),
    {
      deptCode: 'all_dept',
      searchChildDept: true,
      teleported: false,
      clearable: true,
      manual: false,
    }
  );

  const emit = defineEmits<{
    (e: 'change', val: string, item?: any): void;
  }>();

  const deptMemberSelectRef = ref();
  const value = ref();
  const operatorOptions = ref<any[]>([]);

  const getOperatorOptions = async () => {
    let res = {};
    if (props.title && props.title === 'GTM组负责人') {
      res = await memberApi.luteosMemberQueryGtmMemberList({
        operatorDepartmentCode: props.deptCode,
        searchChildDept: props.searchChildDept,
      });
    } else {
      res = props.title
        ? await memberApi.luteosMemberQueryMemberListByTitle({
            title: props.title,
          })
        : await memberApi.luteosMemberQueryDeptMemberList({
            operatorDepartmentCode: props.deptCode,
            deptId: props.deptId,
            searchChildDept: props.searchChildDept,
          });
    }
    operatorOptions.value = res.memberList?.map((item) => {
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
  const getLocalOperatorOptions = () => {
    operatorOptions.value = props.manualOptions ?? [];
  };
  if (!props.manual) {
    getOperatorOptions();
  } else {
    getLocalOperatorOptions();
  }

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
  watch(
    [() => props.manual, () => props.manualOptions],
    ([manual]) => {
      if (manual) {
        getLocalOperatorOptions();
      }
    },
    { immediate: true, deep: true }
  );
  const disabled = ref(false);
  const handleChange = (val) => {
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
        disabled.value = true;
        setTimeout(() => {
          disabled.value = false;
        }, 0);
      }
      if (typeof val === 'string') {
        emit(
          'change',
          val,
          operatorOptions.value?.find((item) => item.memberCode === val)
        );
      } else {
        emit(
          'change',
          val,
          operatorOptions.value?.filter((item) => val?.includes(item.memberCode))
        );
      }
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

  defineExpose({ focus, getSelectedLabel: () => deptMemberSelectRef.value?.selectedLabel });
</script>

<style scoped lang="scss">
  .select-all {
    padding: 4px 0;
  }

  .select-all:hover {
    background-color: var(--el-fill-color-light);
  }
</style>
