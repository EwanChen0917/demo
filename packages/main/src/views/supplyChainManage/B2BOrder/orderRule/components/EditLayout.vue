<template>
  <div class="dynamic-form-container">
    <div class="left-panel" v-if="!isDetail">
      <div v-for="item in localSchema">
        <div class="title">{{ item.name }}</div>
        <div v-for="model in item.model" class="field-item">
          <el-checkbox v-model="model.show">
            {{ model.label }}
          </el-checkbox>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="form-item">已选条件{{ visibleFields.length }}项</div>
      <el-form
        ref="conditionFormRef"
        label-width="190px"
        :rules="dynamicRules"
        :model="localFormModel"
        @submit.prevent
      >
        <div v-for="condition in localSchema">
          <span v-if="condition.model.filter((item) => item.show).length">
            {{ condition.name }}
          </span>
          <div v-for="conditionItem in condition.model">
            <el-form-item
              v-if="conditionItem.show && !conditionItem.isCustom"
              :key="conditionItem.key"
              :label="conditionItem.label"
              required
            >
              <div v-if="conditionItem.headerTips" class="header-tips">
                支持批量复制不同分项按逗号分隔，
                <span style="font-weight: 700">按回车键(enter)或点击鼠标完成输入</span>
                (已填写 {{ localFormModel[conditionItem.key].rightSides?.length }} 项)
              </div>
              <div
                v-if="conditionItem.prepend"
                class="prepend-wrapper"
                :class="{
                  'product-wrapper': conditionItem.key == 'supplySku',
                  'product-cascader': conditionItem.key == 'categoryCode',
                }"
              >
                <renderPrepend
                  :disabled="isDetail"
                  v-model:operator="localFormModel[conditionItem.key].operator"
                  :operatorOptions="conditionItem.operatorOptions || []"
                />
                <el-form-item :prop="`${conditionItem.key}.rightSides`" style="flex: 1">
                  <component
                    :disabled="isDetail"
                    :prepend="true"
                    :is="conditionItem.type"
                    :maxCollapseTags="conditionItem.maxCollapseTags"
                    :options="conditionItem.options || []"
                    v-model="localFormModel[conditionItem.key].rightSides"
                  />
                  
                </el-form-item>
                <renderAppend
                  :disabled="isDetail"
                  v-model:modelValue="localFormModel[conditionItem.key].configs"
                  :value="conditionItem.appendOptions?.[0]?.value"
                  :label="conditionItem.appendOptions?.[0]?.label"
                  v-if="conditionItem.appendOptions"
                />
              </div>
              <div v-else class="prepend-wrapper">
                <el-form-item :prop="`${conditionItem.key}.rightSides`" style="flex: 1">
                  <component
                    :disabled="isDetail"
                    :is="conditionItem.type"
                    :options="conditionItem.options || []"
                    v-model="localFormModel[conditionItem.key].rightSides"
                  />
                  <renderAppend
                    :disabled="isDetail"
                    v-model:modelValue="localFormModel[conditionItem.key].configs"
                    :value="conditionItem.appendOptions?.[0]?.value"
                    :label="conditionItem.appendOptions?.[0]?.label"
                    v-if="conditionItem.appendOptions"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <slot
              v-if="conditionItem.show && conditionItem.isCustom"
              :name="`custom-${conditionItem.key}`"
              :model="conditionItem"
              :formModel="localFormModel"
            />
          </div>
        </div>
        <slot name="actions"></slot>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { cloneDeepWith } from 'lodash-es';
  import { configList } from '..';
  import renderPrepend from '../renderCom/renderPrepend.vue';
  import renderAppend from '../renderCom/renderAppend.vue';
  import { DeserializeData, SerializaData } from '../utils/serializeData';
  import { ElMessage } from 'element-plus';

  interface Props {
    schema: configList[];
    formModel?: any;
    isDetail?: boolean;
  }
  // const props = defineProps<Props>();
  const props = withDefaults(defineProps<Props>(), {
    isDetail: false,
  });
  const localFormModel = ref<any>(props.formModel || {});

  /**
   * 自定义克隆函数，跳过组件对象（type 字段），避免组件被响应式化
   * type 字段存储的是 Vue 组件，不应该被深拷贝
   */
  const cloneSchema = (schema: configList[]): configList[] => {
    return cloneDeepWith(schema, (value, key) => {
      // type 字段存储的是组件（可能是 markRaw 包装的），直接返回原引用，避免响应式化
      if (key === 'type') {
        return value;
      }
      // 其他情况使用默认克隆行为
      return undefined;
    });
  };

  // 创建本地 schema 副本，避免污染 props
  const localSchema = ref<configList[]>(cloneSchema(props.schema || []));

  // 初始化标志位，防止初始化过程中被 watch 干扰
  const isInitializing = ref(false);

  /**
   * 智能合并 schema，保留已有的 show 状态和用户操作
   * @param newSchema 新的 schema（可能包含更新的 options）
   * @param oldSchema 旧的 localSchema（包含用户设置的 show 状态）
   */
  const mergeSchema = (newSchema: configList[], oldSchema: configList[]): configList[] => {
    const merged = cloneSchema(newSchema);

    // 如果正在初始化，或者 oldSchema 为空，直接返回新 schema
    if (isInitializing.value || !oldSchema.length) {
      return merged;
    }

    // 合并 show 状态：保留用户已设置的 show 状态
    merged.forEach((newGroup, groupIndex) => {
      const oldGroup = oldSchema[groupIndex];
      if (!oldGroup) return;

      newGroup.model.forEach((newModel, modelIndex) => {
        const oldModel = oldGroup.model[modelIndex];
        if (oldModel && newModel.key === oldModel.key) {
          // 保留已有的 show 状态
          newModel.show = oldModel.show;
        }
      });
    });

    return merged;
  };

  // 监听外部 schema 变化，同步到内部（智能合并，保留 show 状态）
  watch(
    () => props.schema,
    (newVal) => {
      if (!newVal || !newVal.length) return;

      // 如果正在初始化，跳过自动更新，等待初始化完成
      if (isInitializing.value) {
        return;
      }

      // 智能合并：更新 options 等数据，但保留 show 状态
      const merged = mergeSchema(newVal, localSchema.value);
      localSchema.value = merged;
    },
    { deep: true, immediate: true }
  );

  // 监听外部 formModel 变化，同步到内部
  watch(
    () => props.formModel,
    (newVal) => {
      if (newVal) {
        localFormModel.value = newVal;
      }
    },
    { deep: true, immediate: true }
  );
  const visibleFields = computed(() => {
    return localSchema.value.flatMap((item) => item.model.filter((item) => item.show));
  });
  const conditionFormRef = ref<any>(null);
  const dynamicRules = computed(() => {
    const result: Record<string, any[]> = {};
    if (!localSchema.value.length) return result;
    localSchema.value.forEach((group) => {
      group.model.forEach((item) => {
        if (item.show && item.rules) {
          // 自定义字段使用 item.key 作为规则键名，普通字段使用 item.key.rightSides
          const ruleKey = item.isCustom ? item.key : `${item.key}.rightSides`;
          result[ruleKey] = item.rules;
        }
      });
    });
    return result;
  });
  //生成提交数据
  const submitForm = async () => {
    try {
      console.log(`localFormModel.value`, localFormModel.value);
      console.log(`localSchema`, localSchema.value);
      // 调用表单验证
      if (!visibleFields.value.length) {
        ElMessage.warning('请正确填写必填项');
        return {
          result: false,
          data: '',
        };
      }
      await conditionFormRef.value?.validate();
      console.log('校验通过', localFormModel.value);
      const result = SerializaData(localSchema.value, localFormModel.value);
      console.log(`result`, result);
      return {
        result: true,
        data: result,
      };
    } catch (error) {
      console.log('校验失败', error);
      return {
        result: false,
        data: error,
      };
    }
  };
  //回显提交数据
  const initForm = async (conditionList: any) => {
    if (!conditionList || !conditionList.length) return;
    // 设置初始化标志，防止 watch 干扰
    isInitializing.value = true;
    try {
      // 确保使用最新的 schema（包含远程 options）
      // 如果 props.schema 已更新但 localSchema 还没同步，先同步一次
      if (props.schema && props.schema.length) {
        const latestSchema = cloneSchema(props.schema);
        // 保留当前已有的 show 状态（如果有）
        const merged = mergeSchema(latestSchema, localSchema.value);
        localSchema.value = merged;
      }

      // 等待下一个 tick，确保 schema 已更新
      await nextTick();

      // 执行反序列化
      const { result, allModels } = DeserializeData(conditionList, localSchema.value);
      // console.log(`finally result`, result);
      // 更新表单数据
      Object.assign(localFormModel.value, result);

      // 设置 show 状态
      localSchema.value.forEach((item: any) => {
        item.model.forEach((model: any) => {
          if (allModels[model.key]) {
            model.show = true;
          }
        });
      });

      // console.log(`all init complete`);
    } finally {
      // 重置初始化标志
      isInitializing.value = false;
    }
  };

  defineExpose({
    submitForm,
    initForm,
  });
</script>

<css lang="scss" scoped>
.dynamic-form-container {
  display: flex;
  height: calc(100vh - 281px);
  overflow: hidden;
  background: white;
  width: 1440px;
  margin: 0 auto;

  :deep(.el-checkbox__label) {
    font-size: 12px !important;
  }

  :deep(.el-radio__label) {
    font-size: 12px !important;
  }

  .demo-collapse {
    background: #e8f3ff;
    margin-bottom: 20px;

    .switch {
      padding-right: 5px;
    }

    .activeColor {
      color: #02b96b;
    }

    :deep(.el-collapse-item__header) {
      background-color: #e8f3ff;
    }

    :deep(.el-collapse-item__content) {
      background-color: #e8f3ff;
    }

    .bg {
      background-color: #e8f3ff;
    }

    .info-text {
      padding-left: 35px;
    }
  }

  .bg2 {
    background-color: #f7f8fa;
  }

  .houseNumber {
    padding: 16px;
    border-radius: 4px;
    // margin-bottom: 20px;
  }

  .checkItem {
    display: flex;
    align-items: center;
    line-height: 32px;
    height: 32px;
    margin-bottom: 8px;
  }

  .line {
    line-height: 32px;
  }
}
.left-panel {
  width: 340px;
  background: white;
  padding: 10px 5px 10px 30px;
  border-right: 1px solid #dadde2;
  overflow-y: auto;

  .title {
    flex: 1;
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: #1f1f1f;
  }

  :deep(.el-checkbox__label) {
    font-size: 12px !important;
  }
}
.right-panel {
  flex: 1;
  padding: 20px;
  overflow-y: auto;

  :deep(.right-form .el-form-item) {
    display: flex !important;
  }

  .header-tips {
    padding-left: 10px;
    color: #808197;
    font-size: 12px;
    margin-bottom: 10px;
  }
}
.field-item {
  margin-bottom: 5px;
  width: 50%;
  display: inline-block;
  font-size: 12px !important;
}
.prepend-wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.product-wrapper {
  align-items: flex-start;
  .prepend-wrapper {
    .el-select__wrapper {
      border-radius: 6px;
      box-shadow: 0 0 0 1px var(--el-border-color);
    }
    .el-select__wrapper.is-hovering:not(.is-focused) {
      box-shadow: 0 0 0 1px var(--el-border-color);
    }
  }
}

.product-cascader {
  .el-input__wrapper {
    border-radius: 0 6px 6px 0;
  }
}
</css>
