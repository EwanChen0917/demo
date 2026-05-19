<template>
  <el-popover
    v-model:visible="visibility"
    class="config-columns-popover"
    trigger="click"
    placement="bottom-end"
    width="480px"
  >
    <template #reference>
      <div class="config-columns-reference">
        <i class="iconfont icon-zidingyilieheziduan custom-col"></i>
        自定义列
      </div>
    </template>
    <div class="config-columns-panel">
      <slot name="header">
        <div class="dialog-header">
          <span class="dialog-title">{{ title }}</span>
          <i class="iconfont icon-guanbi dialog-close" @click="close"></i>
        </div>
      </slot>
      <div class="dialog-body">
        <CustomFieldsGroup
          ref="customFieldsGroupRef"
          :property-list-prop="cloneDeep(propertyListProp)"
        />
      </div>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button @click="customFieldsGroupRef?.reset" class="left">恢复默认</el-button>
          <el-button @click="close" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="save" class="comfirm-btn" :loading="saveLoading">
            保存并应用
          </el-button>
        </div>
      </slot>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    title: string; // 弹窗标题
    bindClass?: string; // 位置绑定到 对应元素
    width?: number; // 弹窗宽度
    propertyListProp: any; // 对象数组
    moduleType?: string; // 自定义moduleType
    conditionCode?: string; // 自定义条件编码
  }>();

  const emits = defineEmits<{
    success: [typeof props.propertyListProp];
  }>();

  const route = useRoute();
  const visibility = ref(false);
  const customFieldsGroupRef = useTemplateRef('customFieldsGroupRef');

  // 保存自定义字段
  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      // 所有未选中得字段
      const config = customFieldsGroupRef.value?.getResult();
      await platformApi.platformSearchSaveCondition({
        platform: 'lute_erp',
        moduleType: props?.moduleType,
        itemType: route?.name,
        conditionCode: props.conditionCode || undefined,
        searchCondition: JSON.stringify(config),
      });
      ElMessage.success('保存成功');
      emits('success', config);
      visibility.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const close = () => {
    visibility.value = false;
  };

  const open = () => {
    visibility.value = true;
  };
  defineExpose({ open });
</script>

<style lang="scss" scoped>
  .config-columns-reference {
    cursor: pointer;
    color: var(---N8, #666);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    display: flex;
    column-gap: 6px;
    &:hover {
      color: #02b96b;
    }
  }
  .config-columns-panel {
    width: 480px;
    box-sizing: border-box;
    padding: 0 20px;
    border-radius: 12px;
    background: #fff;

    /* Shadow3 - 高层级阴影 */
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
    .dialog-header {
      padding: 16px 0;
      color: var(---N9, #1f1f1f);

      /* 重要/Medium 16 */
      font-family: 'PingFang SC';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dialog-close {
        font-size: 20px;
        cursor: pointer;
        color: #999;
        &:hover {
          color: var(---N9, #1f1f1f);
        }
      }
    }
    .dialog-body {
      padding: 16px 0;
      border-top: 1px solid var(---N3, #ededed);
      border-bottom: 1px solid var(---N3, #ededed);
    }
    .dialog-footer {
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: start;
      .cancel-btn {
        margin-left: auto;
      }
    }
  }
</style>
