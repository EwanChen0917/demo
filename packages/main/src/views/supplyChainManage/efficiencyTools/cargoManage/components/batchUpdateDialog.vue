<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-input type="textarea" :placeholder="realPlaceHolder" v-model="orderList" :rows="5" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :disabled="!orderList?.length">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      title?: string;
    }>(),
    {
      placeholder: '单号',
      title: '批量更新',
    }
  );
  const realPlaceHolder = computed(() => {
    return props.title == '推送调拨单'
      ? `一行一项，回车换行，请勿输入空行，最多输入50条；\n条数较多时调用接口耗时更久，请耐心等待;\n传入参数支持调拨单号，FBA货件号;\n已同步兴运计划单的数据再次推送时会更新为最新的调拨单数据。`
      : `请输入${
          props.placeholder
        }，用逗号分隔。例如: 123,456 \n${'已生成的计划单将同步发货单最新信息'}`;
  });
  const emits = defineEmits<{
    (event: 'success', val): void;
  }>();

  const visible = ref(false);
  const orderList = ref([]);

  const save = async () => {
    emits('success', props.title == '推送调拨单' ? orderList.value : orderList.value?.split(','));
  };

  const open = () => {
    visible.value = true;
    orderList.value = [];
  };

  const close = () => {
    visible.value = false;
  };

  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss"></style>
