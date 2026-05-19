<template>
  <el-dialog title="参与大促" :model-value="visible" @close="emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="大促主题" prop="taskPromotionCode">
        <el-select v-model="form.taskPromotionCode" placeholder="请选择大促名称">
          <el-option
            v-for="item in taskPromotionList"
            :label="item.name"
            :value="item.taskPromotionCode"
            :key="item.taskPromotionCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="大促后折扣力度" prop="taskPromotionEndDiscount">
        <el-autocomplete
          v-model="form.taskPromotionEndDiscount"
          :fetch-suggestions="queryDiscountSearch"
          placeholder="请填写大促后折扣力度"
        />
        <!-- <el-input v-model="form.taskPromotionEndDiscount" placeholder="请输入大促后折扣力度" /> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { queryDiscountSearch } from '@/utils/global';

  const props = defineProps<{
    visible: boolean;
    taskCodeList: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const formRef = ref(null);
  const form = ref({
    taskPromotionCode: '',
    taskCodeList: props.taskCodeList,
    taskPromotionEndDiscount: '',
  });

  const rules = reactive({
    taskPromotionCode: [{ required: true, message: '请选择大促名称', trigger: 'blur' }],
    taskPromotionEndDiscount: [
      { required: true, message: '请输入大促后折扣力度', trigger: 'blur' },
    ],
  });

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    await metaApi.luteosMetaJoinMarkPromotion(form.value);
    ElMessage.success('参与大促成功');
    emit('save');
  };

  const taskPromotionList = ref([]);
  const queryMarkTaskPromotionList = async () => {
    const res = await metaApi.luteosMetaTaskPromotionQueryMarkTaskPromotionList();
    taskPromotionList.value = res?.taskPromotionList;
  };
  queryMarkTaskPromotionList();
</script>

<style scoped lang="scss"></style>
