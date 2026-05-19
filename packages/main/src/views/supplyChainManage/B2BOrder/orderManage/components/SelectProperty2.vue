<template>
  <el-dialog
    class="property-dialog"
    :title="title"
    :width="width"
    align-center
    v-model="visibility"
    :show-close="true"
    :appendToBody="true"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    :modal="false"
    @open="handelOpen"
    :style="dialogStyle"
  >
    <CustomFieldsGroup
      ref="customFieldsGroupRef"
      :property-list-prop="cloneDeep(propertyListProp)"
      :gap="gap"
    />
    <template #footer>
      <el-button @click="customFieldsGroupRef?.reset" class="cancel-btn left">恢复默认</el-button>
      <el-button @click="close" class="cancel-btn">取消</el-button>
      <el-button type="primary" @click="save" class="comfirm-btn" :loading="saveLoading">
        保存并应用
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  const props = defineProps<{
    title: string; // 弹窗标题
    bindClass?: string; // 位置绑定到 对应元素
    width?: number; // 弹窗宽度
    propertyListProp: any; // 对象数组
    moduleType?: string; // 自定义moduleType
    conditionCode?: string; // 自定义条件编码
  }>();

  const route = useRoute();

  const gap = ref(17);
  let bodyWidth;
  if (props?.width) {
    bodyWidth = props.width - 40;
  } else {
    bodyWidth = 440;
  }
  const col = Math.floor(bodyWidth / 128);
  gap.value = Math.floor((bodyWidth % 128) / (col - 1));

  const visibility = ref(false);
  const customFieldsGroupRef = ref(null);

  const dialogStyle = reactive<any>({ top: 'unset', right: 'unset' });
  const handelOpen = () => {
    // 初始化位置
    // const customcol = document.querySelector('.custom-col');
    // console.log(customcol, customcol?.offsetTop);
    setTimeout(() => {
      // console.log(localProperty.value);
      if (props?.propertyListProp[0] && props.bindClass) {
        const customcol: any = document.querySelector(`.${props.bindClass}` ?? '.custom-col');
        const position = customcol?.getBoundingClientRect();
        // 视口高度
        const { clientHeight, clientWidth } = document.body;
        // console.log(clientWidth);
        dialogStyle.position = 'absolute';
        dialogStyle.right = '20px';
        // dialogStyle.right = `${clientWidth - position.right}px`;
        if (clientHeight - position.top + 26 < 480) {
          dialogStyle.top = `unset`;
          dialogStyle.bottom = `${clientHeight - position.top + 6}px`;
        } else {
          dialogStyle.top = `${position.top + 26}px`;
          dialogStyle.bottom = `unset`;
        }
      }
    }, 10);
  };

  // 保存自定义字段
  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      const res = await platformApi.platformSearchSaveCondition({
        platform: 'lute_erp',
        moduleType: props?.moduleType,
        itemType: route?.name,
        conditionCode: props.conditionCode || undefined,
        searchCondition: JSON.stringify(customFieldsGroupRef.value?.getResult()),
      });
      ElMessage.success('保存成功');
      emits('success');
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

<style lang="scss"></style>
