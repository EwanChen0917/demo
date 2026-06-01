<template>
  <el-dialog title="修改怀孕-哺乳阶段" v-model="visibility" width="600px" :before-close="close">
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item
            label="怀孕/哺乳阶段"
            prop="lactation"
            :rules="[
              {
                required: true,
                message: '请选择怀孕/哺乳阶段',
              },
            ]"
          >
            <el-select style="width: 100%" v-model="form.lactation">
              <el-option
                v-for="item in lactationStageList"
                :key="item.lactation"
                :label="item.stageNameCn"
                :value="item.lactation"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              confirm();
            }
          "
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { userApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const visibility = ref(false);
  const form = ref<any>({
    lactation: '',
  });
  const props = defineProps<{
    uid: string;
  }>();
  const formRef = ref();
  const open = () => {
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params = {
        ...form.value,
        uid: props.uid,
      };
      await userApi.luteosUserChangeLactationStage(params);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      lactation: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  const lactationStageList = ref<any[]>([]);
  onMounted(async () => {
    const res = await userApi.luteosUserStage();
    if (res) {
      lactationStageList.value = res.lactationStageList as [];
    }
  });
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
