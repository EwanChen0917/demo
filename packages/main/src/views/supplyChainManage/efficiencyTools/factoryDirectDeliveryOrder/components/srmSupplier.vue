<template>
  <el-select
    :model-value="modelValue"
    @update:model-value="handleChange"
    placeholder="请选择供应商"
    :disabled="disabled"
    :loading="loading"
    filterable
    clearable
    :filter-method="handleFilter"
  >
    <el-option
      v-for="item in filteredList"
      :key="item.id"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import { omsApi } from '@/api';
  import { debounce } from 'lodash-es';

  interface SupplierOption {
    id: string; // 唯一标识，用于 key
    label: string;
    value: string;
  }

  interface Props {
    /** v-model 绑定的供应商代码 */
    modelValue?: string;
    /** 供应商列表数据源（可选，如果不传则自动请求） */
    supplierList?: SupplierOption[];
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否自动加载数据，默认 true */
    autoLoad?: boolean;
  }

  interface ChangeData {
    code: string | undefined;
    name: string;
  }

  interface Emits {
    (e: 'update:modelValue', value: string | undefined): void;
    (e: 'change', data: ChangeData): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    supplierList: undefined,
    disabled: false,
    autoLoad: true,
  });

  const emit = defineEmits<Emits>();

  // 内部供应商列表
  const innerSupplierList = ref<SupplierOption[]>([]);
  // 过滤后的供应商列表
  const filteredList = ref<SupplierOption[]>([]);
  // 加载状态
  const loading = ref(false);
  // 当前搜索关键词
  const currentQuery = ref('');

  /**
   * 获取实际使用的供应商列表
   * 优先使用传入的 supplierList，否则使用内部加载的列表
   */
  const getSupplierList = () => {
    return props.supplierList !== undefined ? props.supplierList : innerSupplierList.value;
  };

  /**
   * 请求供应商列表数据
   */
  const fetchSupplierList = async () => {
    // 如果传入了 supplierList 或不需要自动加载，则不请求
    if (props.supplierList !== undefined || !props.autoLoad) {
      return;
    }
    const supplierName = '';
    try {
      loading.value = true;
      const res = (await omsApi.omsDirectFactoryWorkOrderQuerySupplierList({
        supplierName,
      })) as any;
      // 手动生成唯一 ID，确保 key 唯一性
      innerSupplierList.value = (res || [])
        .filter((item: any) => item.supplierCode)
        .map((item: any, index: number) => ({
          id: `supplier-${index}-${item.supplierCode || 'unknown'}`, // 唯一 ID
          label: `${item.supplierName}-${item.toElsAccount}`,
          value: item.supplierCode,
        }));
      // 显示所有数据
      filteredList.value = innerSupplierList.value;
    } catch (error) {
      innerSupplierList.value = [];
      filteredList.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * 实际执行过滤的方法
   * @param query 搜索关键词
   */
  const performFilter = (query: string) => {
    const list = getSupplierList();

    if (!query || !query.trim()) {
      // 清空时显示所有数据
      filteredList.value = list || [];
      return;
    }

    const keyword = query.trim().toLowerCase();
    const filtered = (list || []).filter((item) => {
      return (
        item.label?.toLowerCase().includes(keyword) || item.value?.toLowerCase().includes(keyword)
      );
    });

    // 显示所有过滤后的数据
    filteredList.value = filtered;
  };

  /**
   * 防抖的过滤方法
   * 延迟 200ms 执行，优化响应速度
   */
  const debouncedFilter = debounce((query: string) => {
    performFilter(query);
  }, 200);

  /**
   * 供应商过滤方法（供 el-select 调用）
   * @param query 搜索关键词
   */
  const handleFilter = (query: string) => {
    currentQuery.value = query;

    // 如果是清空操作，立即执行，不使用防抖
    if (!query || !query.trim()) {
      performFilter(query);
      // 取消待执行的防抖任务
      debouncedFilter.cancel();
      return;
    }

    // 其他情况使用防抖优化
    debouncedFilter(query);
  };

  /**
   * 处理值变化
   * @param value 新的供应商代码
   */
  const handleChange = (value: string | undefined) => {
    emit('update:modelValue', value);

    // 查找对应的供应商名称
    const list = getSupplierList();
    const supplier = list.find((item) => item.value === value);

    emit('change', {
      code: value,
      name: supplier?.label || '',
    });
  };

  // 监听外部传入的 supplierList 变化
  watch(
    () => props.supplierList,
    (newList) => {
      if (newList !== undefined) {
        // 显示所有数据
        filteredList.value = newList;
      }
    },
    { immediate: true, deep: true }
  );

  // 监听内部 supplierList 变化
  watch(
    () => innerSupplierList.value,
    (newList) => {
      // 只有在没有传入外部 supplierList 时才更新
      if (props.supplierList === undefined) {
        // 显示所有数据
        filteredList.value = newList;
      }
    },
    { deep: true }
  );

  // 组件挂载时自动加载数据
  onMounted(() => {
    fetchSupplierList();
  });

  // 组件卸载时取消防抖任务，避免内存泄漏
  onUnmounted(() => {
    debouncedFilter.cancel();
  });

  // 暴露刷新方法，供父组件手动调用
  // 获取当前匹配的供应商信息
  const getMatchedSupplier = (): ChangeData | null => {
    if (!props.modelValue) {
      return null; // 没有传入 code
    }

    const list = getSupplierList();
    if (!list || list.length === 0) {
      return null; // 列表还没加载
    }

    // 查找匹配的供应商
    const matched = list.find((item) => item.value === props.modelValue);

    if (matched) {
      return {
        code: matched.value,
        name: matched.label,
      };
    }

    return null; // 未找到匹配项
  };

  // 暴露方法供父组件调用
  defineExpose({
    refresh: fetchSupplierList,
    getMatchedSupplier, // 新增：获取匹配的供应商信息
  });
</script>

<style scoped lang="scss">
  // 组件样式可根据需要添加
</style>
