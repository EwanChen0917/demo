<template>
  <div class="dynamic-form">
    <div
      v-for="item in formConfig"
      :key="item.key"
      class="form-item"
      :style="{ width: item.width || 'auto' }"
    >
      <!-- 带选择器的搜索框 -->
      <div v-if="item.type === FORM_FIELD_TYPES.SEARCH_WITH_SELECT" class="search-with-select">
        <el-input
          :model-value="formData[item.key]"
          :placeholder="getPlaceholder(item)"
          :clearable="getClearable(item)"
          :style="{ width: getInputWidth(item) }"
          @input="handleFieldChange(item.key, $event)"
          @clear="handleFieldChange(item.key, '')"
        >
          <template #prepend>
            <el-select
              :model-value="searchTypeMap[item.key]"
              :style="{ width: getSelectWidth(item) }"
              @change="handleSearchTypeChange(item.key, $event)"
            >
              <el-option
                v-for="option in getSearchTypes(item)"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append v-if="shouldShowBatchSearch(item)">
            <BatchSearchPopover @search="handleBatchSearch(item.key, $event)" />
          </template>
        </el-input>
      </div>

      <!-- 纯下拉选择器 -->
      <el-select
        v-else-if="item.type === FORM_FIELD_TYPES.SELECT"
        :model-value="formData[item.key]"
        :placeholder="getPlaceholder(item)"
        :clearable="getClearable(item)"
        :multiple="getMultiple(item)"
        :filterable="getFilterable(item)"
        :style="{ width: getWidth(item) }"
        @change="handleFieldChange(item.key, $event)"
      >
        <el-option
          v-for="option in getOptions(item)"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>

      <!-- 多选下拉搜索框 -->
      <el-select
        v-else-if="item.type === FORM_FIELD_TYPES.MULTI_SELECT"
        multiple
        :model-value="formData[item.key]"
        :options="getOptions(item)"
        :filterable="getFilterable(item)"
        :props="{
          label: getLabelProp(item),
          value: getValueProp(item),
        }"
        :remote-method="getRemoteMethod(item)"
        :style="{ width: getWidth(item) }"
        @change="handleFieldChange(item.key, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, computed } from 'vue';
  import BatchSearchPopover from '@/components/BatchSearchPopover/index.vue';

  // ==================== 常量定义 ====================
  const FORM_FIELD_TYPES = {
    SEARCH_WITH_SELECT: 'searchWithSelect',
    SELECT: 'select',
    MULTI_SELECT: 'multiSelect',
  } as const;

  // ==================== 类型定义 ====================
  export interface Option {
    label: string;
    value: string | number;
  }

  export interface SearchType {
    label: string;
    value: string;
  }

  export type FormFieldType = (typeof FORM_FIELD_TYPES)[keyof typeof FORM_FIELD_TYPES];

  export interface BaseFormItemConfig {
    key: string;
    type: FormFieldType;
    label?: string;
    placeholder?: string;
    width?: string;
    clearable?: boolean;
  }

  export interface SearchWithSelectConfig extends BaseFormItemConfig {
    type: typeof FORM_FIELD_TYPES.SEARCH_WITH_SELECT;
    searchTypes: SearchType[];
    inputWidth?: string;
    selectWidth?: string;
    showBatchSearch?: boolean;
    excludeBatchFields?: string[];
  }

  export interface SelectConfig extends BaseFormItemConfig {
    type: typeof FORM_FIELD_TYPES.SELECT;
    options: Option[];
    multiple?: boolean;
    filterable?: boolean;
  }

  export interface MultiSelectConfig extends BaseFormItemConfig {
    type: typeof FORM_FIELD_TYPES.MULTI_SELECT;
    options: Option[];
    filterable?: boolean;
    valueProp?: string;
    labelProp?: string;
    remoteMethod?: (query: string) => void;
  }

  export type FormItemConfig = SearchWithSelectConfig | SelectConfig | MultiSelectConfig;

  export interface DynamicFormProps {
    formConfig: FormItemConfig[];
    formData: Record<string, any>;
  }

  export interface DynamicFormEmits {
    (event: 'update:formData', value: Record<string, any>): void;
    (event: 'form-change', data: Record<string, any>): void;
  }

  // ==================== Props & Emits ====================
  const props = withDefaults(defineProps<DynamicFormProps>(), {
    formConfig: () => [],
    formData: () => ({}),
  });

  const emit = defineEmits<DynamicFormEmits>();

  // ==================== 响应式状态 ====================
  const searchTypeMap = reactive<Record<string, string>>({});

  // ==================== 计算属性 ====================
  const searchWithSelectConfigs = computed(() =>
    props.formConfig.filter(
      (item): item is SearchWithSelectConfig => item.type === FORM_FIELD_TYPES.SEARCH_WITH_SELECT
    )
  );

  // ==================== 方法 ====================
  /**
   * 初始化搜索类型映射
   */
  const initSearchTypeMap = (): void => {
    searchWithSelectConfigs.value.forEach((item) => {
      if (item.searchTypes?.length && !searchTypeMap[item.key]) {
        searchTypeMap[item.key] = item.searchTypes[0].value;
      }
    });
  };

  /**
   * 统一的事件处理函数
   */
  const emitFormChange = (newFormData: Record<string, any>): void => {
    emit('update:formData', newFormData);
    emit('form-change', newFormData);
  };

  /**
   * 处理字段值变化
   */
  const handleFieldChange = (key: string, value: any): void => {
    const newFormData = { ...props.formData };
    newFormData[key] = value;
    emitFormChange(newFormData);
  };

  /**
   * 处理搜索类型变化
   */
  const handleSearchTypeChange = (key: string, newType: string): void => {
    searchTypeMap[key] = newType;

    // 清空当前搜索值
    const newFormData = { ...props.formData };
    newFormData[key] = '';

    emitFormChange(newFormData);
  };

  /**
   * 处理批量搜索
   */
  const handleBatchSearch = (key: string, val: string): void => {
    const processedValue = val?.replace(/\n/g, ',');
    handleFieldChange(key, processedValue);
  };

  /**
   * 重置表单
   */
  const reset = (): void => {
    const newFormData = { ...props.formData };

    props.formConfig.forEach((item) => {
      if (item.type === FORM_FIELD_TYPES.MULTI_SELECT) {
        newFormData[item.key] = [];
      } else {
        newFormData[item.key] = '';
      }
    });

    emitFormChange(newFormData);
  };

  // ==================== 工具函数 ====================
  /**
   * 获取占位符
   */
  const getPlaceholder = (item: FormItemConfig): string => {
    return (
      item.placeholder ||
      (item.type === FORM_FIELD_TYPES.SEARCH_WITH_SELECT ? '请输入搜索内容' : '请选择')
    );
  };

  /**
   * 获取是否可清空
   */
  const getClearable = (item: FormItemConfig): boolean => {
    return item.clearable !== false;
  };

  /**
   * 获取宽度
   */
  const getWidth = (item: FormItemConfig): string => {
    return item.width || (item.type === FORM_FIELD_TYPES.SELECT ? '200px' : '300px');
  };

  /**
   * 获取输入框宽度
   */
  const getInputWidth = (item: SearchWithSelectConfig): string => {
    return item.inputWidth || '350px';
  };

  /**
   * 获取选择器宽度
   */
  const getSelectWidth = (item: SearchWithSelectConfig): string => {
    return item.selectWidth || '120px';
  };

  /**
   * 获取搜索类型选项
   */
  const getSearchTypes = (item: SearchWithSelectConfig): SearchType[] => {
    return item.searchTypes || [];
  };

  /**
   * 获取选项列表
   */
  const getOptions = (item: SelectConfig | MultiSelectConfig): Option[] => {
    return item.options || [];
  };

  /**
   * 获取是否多选
   */
  const getMultiple = (item: SelectConfig): boolean => {
    return item.multiple || false;
  };

  /**
   * 获取是否可搜索
   */
  const getFilterable = (item: SelectConfig | MultiSelectConfig): boolean => {
    return item.filterable !== false;
  };

  /**
   * 获取值属性名
   */
  const getValueProp = (item: MultiSelectConfig): string => {
    return item.valueProp || 'value';
  };

  /**
   * 获取标签属性名
   */
  const getLabelProp = (item: MultiSelectConfig): string => {
    return item.labelProp || 'label';
  };

  /**
   * 获取远程搜索方法
   */
  const getRemoteMethod = (item: MultiSelectConfig): ((query: string) => void) | undefined => {
    return item.remoteMethod;
  };

  /**
   * 判断是否显示批量搜索
   */
  const shouldShowBatchSearch = (item: SearchWithSelectConfig): boolean => {
    if (item.showBatchSearch === false) return false;
    if (!item.excludeBatchFields?.length) return true;
    return !item.excludeBatchFields.includes(searchTypeMap[item.key]);
  };

  // ==================== 生命周期 ====================
  // 初始化
  initSearchTypeMap();

  // 监听配置变化，重新初始化
  watch(
    () => props.formConfig,
    () => {
      initSearchTypeMap();
    },
    { deep: true }
  );

  // ==================== 暴露给外部 ====================
  defineExpose({
    reset,
    searchTypeMap: computed(() => searchTypeMap),
  });
</script>

<style scoped lang="scss">
  .dynamic-form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;

    .form-item {
      display: inline-block;
    }
  }
</style>
