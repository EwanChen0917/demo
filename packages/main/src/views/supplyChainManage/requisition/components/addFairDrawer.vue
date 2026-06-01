<template>
  <el-drawer
    v-model="visible"
    size="1200"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :append-to-body="true"
    class="custom-drawer"
    :before-close="onBeforeClose"
  >
    <AddDrawerContent
      ref="contentRef"
      v-model="status"
      isDrawer
      :mode="mode"
      @close="visible = false"
    />
    <template #footer>
      <div v-if="mode !== 'detail'">
        <el-button v-if="['add', 'edit'].includes(mode!)" type="primary" @click="handleSave(true)">
          提交
        </el-button>
        <!-- 编辑关联单据 待调拨状态-->
        <el-button
          type="primary"
          :disabled="!!saveLoading"
          :loading="!!saveLoading && saveLoading === 2"
          @click="saveDocuments(2)"
          v-if="status == '300'"
        >
          已填完所有单据
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
        <el-button v-if="['add', 'edit'].includes(mode!)" @click="handleSave(false)">
          保存草稿
        </el-button>
        <!-- 编辑关联单据 待调拨状态-->
        <el-button
          plain
          :disabled="!!saveLoading"
          :loading="!!saveLoading && saveLoading === 1"
          @click="saveDocuments(1)"
          v-if="status == '300'"
        >
          暂存
        </el-button>
        <!-- 编辑关联单据 已完成状态-->
        <el-button
          type="primary"
          :disabled="!!saveLoading"
          :loading="!!saveLoading && saveLoading === 3"
          @click="saveDocuments(3)"
          v-if="status == '400'"
        >
          保存
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
  import { ElMessageBox } from 'element-plus';
  import AddDrawerContent from '../addApply.vue';

  const emit = defineEmits(['success']);
  const visible = ref(false);
  const status = ref<any>('');
  const mode = ref<'add' | 'edit' | 'detail' | 'associated'>();
  const mode2Title = {
    add: '新增申请',
    edit: '编辑',
    detail: '展销会申请详情',
    associated: '关联单据',
  };
  const title = computed(() => {
    return mode2Title[mode.value || 'add'];
  });
  const contentRef = ref<InstanceType<typeof AddDrawerContent>>();
  const open = (payload: { mode: typeof mode.value; code?: string }) => {
    mode.value = payload.mode;
    status.value = '';
    visible.value = true;
    if (payload.code) {
      nextTick(() => {
        contentRef.value?.init(payload.code);
      });
    }
  };
  defineExpose({
    open,
  });

  const handleSave = async (isSubmit: boolean) => {
    const result = await contentRef.value?.handleSave(isSubmit);
    if (!isSubmit) return;
    visible.value = !result;
    if (result) {
      emit('success');
    }
  };
  const saveLoading = ref(0);
  const saveDocuments = async (isSubmit = 1) => {
    saveLoading.value = isSubmit;
    const result = await contentRef.value?.handleSaveDocuments(isSubmit).finally(() => {
      saveLoading.value = 0;
    });
    visible.value = !result;
    if (result) {
      emit('success');
    }
  };
  const onBeforeClose = async (done) => {
    if (mode.value === 'detail') {
      done(false);
      return;
    }
    const flag = await ElMessageBox.confirm('是否保存草稿？', '提示', {
      confirmButtonText: '保存并关闭',
      cancelButtonText: '取消',
    }).catch(() => false);
    if (flag && ['add', 'edit'].includes(mode.value!)) {
      await handleSave(false);
      emit('success');
    }
    done(false);
  };
</script>
