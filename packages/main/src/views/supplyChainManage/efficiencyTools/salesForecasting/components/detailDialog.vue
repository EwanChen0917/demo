<template>
  <el-dialog title="预测详情" v-model="visibility" width="1000px" :before-close="close">
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-position="top">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item, index) of form.weekBeanList" :key="item.id">
          <el-form-item
            :label="item.showWeekDesc"
            :prop="`weekBeanList[${index}].value`"
            :rules="[
              {
                required: true,
                type: 'number',
                min: 0,
                message: '请输入预测数据',
              },
            ]"
          >
            <Num v-model="item.value" :min="0" :max="99999" :precision="0" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  defineProps({
    dickbook: {
      type: Object,
      default() {
        return {
          warehouse_channel: [],
        };
      },
    },
  });
  const visibility = ref(false);
  const form = ref<any>({
    weekBeanList: [],
  });
  const formRef = ref();
  const open = (data) => {
    form.value.weekBeanList = data;
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpSaleForecastSaveWeek({
        weekBeanList: form.value.weekBeanList,
      });
      ElMessage.success('操作成功');
      emits('success');
      // const path = router.resolve({
      //   name: 'salesForecastingDetail',
      // });
      // router.push(path.href);
      close();
    }
  };
  const close = () => {
    form.value = {
      weekBeanList: [],
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  onMounted(() => {});
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
