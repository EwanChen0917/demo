<template>
  <el-dialog
    :model-value="visible"
    @close="close"
    width="500"
    height=""
    align-center
    v-bind="$attrs"
  >
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <KeenFileUpload
      :showOperate="false"
      class="packing-upload"
      directory="erp/order/attachment"
      ref="uploadRef"
      v-model="localList"
      :limit="null"
      style="width: 440px"
    >
      <el-button size="default">
        <template #icon>
          <i class="iconfont icon-shangchuan1"></i>
        </template>
        <template #default>上传附件</template>
      </el-button>
    </KeenFileUpload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClickCancel">{{ cancelText }}</el-button>
        <el-button @click="handleClickConfirm" type="primary">{{ confirmText }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  defineOptions({ inheritAttrs: false });

  interface Props {
    visible: boolean;
    fileList: any[];
    title?: string;
    confirmText?: string;
    cancelText?: string;
  }
  interface Emits {
    (event: 'close'): void;
    (event: 'confirm', value: any[]): void;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: '上传附件',
    confirmText: '确认',
    cancelText: '取消',
  });
  const localList = ref();

  const emit = defineEmits<Emits>();
  const uploadRef = ref();
  // watch(
  //   () => props.fileList,
  //   (newv, oldv) => {
  //     if (Array.isArray(newv) && newv.length) {
  //       localList.value = newv.map((e) => {
  //         return {
  //           name: e.name || e.fileName || '',
  //           suffix: e.suffix || (e.fileName || e.name || '').split('.').pop() || '',
  //           ossKey: e.fileUrl || e.ossKey,
  //         };
  //       });
  //     }
  //   },
  //   {
  //     immediate: true,
  //   }
  // );
  const close = () => {
    emit('close');
  };
  const handleClickCancel = () => {
    close();
  };
  const handleClickConfirm = () => {
    let params = [];
    params = localList.value.map((e) => {
      return {
        fileName: e.fileName || e.name || '',
        fileUrl: e.fileUrl || e.ossKey,
      };
    });
    emit('confirm', params);
  };
</script>

<style lang="scss"></style>
