<template>
  <el-dialog :title="title || '编辑邮箱'" :model-value="visible" @close="emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="100px">
      <p v-if="tips">{{ tips }}</p>
      <el-form-item label="推广邮箱：" prop="email" required>
        <el-input v-model="form.email" disabled />
      </el-form-item>
      <el-form-item label="使用人：" prop="owner" required>
        <DeptMember
          class="form-item"
          v-model="form.owner"
          placeholder="请选择"
          :searchChildDept="false"
        />
      </el-form-item>
      <el-form-item label="邮箱组：" prop="emailGroup">
        <el-select v-model="form.emailGroup" placeholder="请选择邮箱组" clearable filterable>
          <el-option
            v-for="item in emailGroup"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="5"
          :maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi, platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const props = defineProps<{
    visible: boolean;
    emailInfo: string;
    isHideSaveTips: boolean;
    title: string;
    tips: string;
  }>();

  const emit = defineEmits<{
    (event: 'close', val: boolean): void;
  }>();

  const formRef = ref();
  const form = ref({
    owner: '',
    remark: '',
    id: '',
    email: '',
    emailGroup: '',
  });
  // 延迟设置form值，解决el-select的值先展示ID再展示name的问题
  setTimeout(() => {
    form.value = { ...props.emailInfo };
  }, 500);

  const rules = ref({
    owner: [{ required: true, message: '请选择使用人', trigger: ['blur'] }],
    emailGroup: [{ required: true, message: '请选择邮箱分组', trigger: ['blur'] }],
  });

  const saveLoading = ref(false);
  const handleSave = async () => {
    const valid = await formRef.value.validate();
    if (valid) {
      await metaApi.luteosMetaEmailAccountSaveEmail(form.value).finally(() => {
        saveLoading.value = false;
      });
      if (!props.isHideSaveTips) {
        ElMessage.success('保存成功');
      }
      emit('close', true);
    }
  };
  const emailGroup = ref([]);
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['email_group'],
    });
    emailGroup.value = (res.dictMap && res.dictMap.email_group) || [];
  };
  queryDictMap();
</script>

<style scoped lang="scss"></style>
