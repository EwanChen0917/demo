<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入策略名称" />
      </el-form-item>
      <el-form-item label="渠道" prop="channel">
        <el-select v-model="form.channel" multiple clearable>
          <el-option value="amazon" label="Amazon" />
          <el-option value="shopify" label="Shopify" />
          <el-option value="walmart" label="Walmart" />
          <el-option value="tiktok" label="TikTok" />
          <el-option value="mercadocbt" label="Mercadocbt" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动填写日期" prop="dateRange">
        <el-date-picker
          v-model="form.dateRange"
          placeholder="请选择日期"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          type="daterange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="活动预测对应周" prop="week">
        <el-date-picker
          style="width: 100%"
          v-model="form.week"
          type="week"
          format="YYYY年第ww周"
          value-format="YYYY-MM-DD"
          placeholder="请选择周"
        />
      </el-form-item>
      <el-form-item label="活动时间" prop="timeRange">
        <el-date-picker
          v-model="form.timeRange"
          placeholder="请选择日期"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          type="daterange"
          value-format="YYYY-MM-DD"
          @change="
            (dateArr) => {
              form.actStartDate = dateArr ? dateArr[0] : '';
              form.actEndDate = dateArr ? dateArr[1] : '';
            }
          "
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();
  const form = ref<any>({
    name: '',
    channel: [],
    dateRange: '',
    timeRange: [],
    actStartDate: '',
    actEndDate: '',
    week: '',
    status: 0,
  });

  const rules = reactive({
    name: [{ required: true, message: '请输入活动名称', trigger: ['blur', 'change'] }],
    channel: [{ required: true, message: '请选择活动渠道', trigger: 'change' }],
    dateRange: [{ required: true, message: '请选择活动填写日期', trigger: 'change' }],
    timeRange: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
    week: [{ required: true, message: '请选择活动预测对应周', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpPlanPsfaiSaveOrUpdate({
        ...omit(form.value, ['timeRange']),
        dateRange: form.value.dateRange.join('_'),
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      title.value = '编辑活动预测';
      form.value = { ...row };
      form.value.dateRange = row?.dateRange?.split('_');
      form.value.timeRange = [row?.actStartDate, row?.actEndDate];
    } else {
      title.value = '新增活动预测';
      form.value = {
        name: '',
        channel: [],
        dateRange: '',
        timeRange: [],
        actStartDate: '',
        actEndDate: '',
        week: '',
        status: 0,
      };
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
