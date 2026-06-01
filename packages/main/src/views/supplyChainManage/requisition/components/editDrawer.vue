<template>
  <el-drawer
    v-model="visible"
    :size="1200"
    title="编辑领用"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :append-to-body="true"
    class="custom-drawer"
    :before-close="onBeforeClose"
  >
    <EditDrawerContent ref="contentRef" v-model="status" @close="visible = false" />
    <template #footer>
      <div>
        <el-button v-if="[0, 200].includes(status)" type="primary" @click="save(true)">
          提交申请
        </el-button>
        <el-button type="primary" :plain="[0, 200].includes(status)" @click="save()">
          {{ isError ? '提交仓库' : '汇总发起申请' }}
        </el-button>
        <el-button
          @click="
            onBeforeClose((flag) => {
              visible = flag;
            })
          "
        >
          取消
        </el-button>
        <el-button v-if="status === 0" @click="handleSave('draft')">保存草稿</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
  import { ElMessageBox } from 'element-plus';
  import EditDrawerContent from '../edit.vue';

  const emit = defineEmits(['success']);
  const visible = ref(false);
  const code = ref<string>();
  const status = ref<number>(-1);
  const isError = computed(() => {
    // 异常 5开头的均是异常
    return status.value >= 500 && status.value < 600;
  });
  const contentRef = ref<InstanceType<typeof EditDrawerContent>>();

  const open = (reordCode?: typeof code.value) => {
    status.value = -1;
    code.value = reordCode;
    visible.value = true;
    if (code.value) {
      nextTick(() => {
        contentRef.value?.init(code.value);
      });
    }
  };
  defineExpose({
    open,
  });
  type submitType = 'draft' | 'submit' | 'autoSubmit';
  const handleSave = async (action: submitType) => {
    const result = await contentRef.value?.handleSave(action);
    if (action === 'draft') return;
    visible.value = !result;
    if (result) {
      emit('success');
    }
  };
  const save = async (isAutoSubmit = false) => {
    const result = await contentRef.value?.save(isAutoSubmit);
    visible.value = !result;
    if (result) {
      emit('success');
    }
  };
  const onBeforeClose = async (done) => {
    const flag = await ElMessageBox.confirm('是否保存草稿？', '提示', {
      confirmButtonText: '保存并关闭',
      cancelButtonText: '取消',
    }).catch(() => false);
    if (flag) {
      await handleSave('draft');
      emit('success');
    }
    done(false);
  };
</script>
