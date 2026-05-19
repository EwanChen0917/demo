<template>
  <el-dialog
    title="SPU分析"
    v-model="visible"
    @close="close"
    width="80%"
    modal-class="spu-analysis-dialog"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <el-form-item label="SPU" prop="spuCode">
        <el-select
          v-model="formData.spuCode"
          placeholder="请选择SPU"
          clearable
          filterable
          @change="handleSpuChange"
          style="width: 250px"
        >
          <el-option
            v-for="item in spuList"
            :key="item.spuCode"
            :label="item.spuName + '-' + item.spuCode"
            :value="item.spuCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-date-picker
          v-model="formData.month"
          type="month"
          placeholder="请选择月份"
          format="YYYY-MM"
          value-format="YYYY-MM"
          style="width: 250px"
          @change="handleSpuChange"
        />
      </el-form-item>
      <el-form-item label="真实评分" prop="score">
        <el-input-number
          v-model="formData.score"
          :min="0"
          :max="5"
          :precision="1"
          :step="0.1"
          placeholder="请输入评分"
          style="width: 250px"
          :disabled="!isEditable"
        />
      </el-form-item>

      <el-form-item label="本月评分分析" prop="monthScore">
        <el-input
          v-model="formData.scoreAnalysis"
          type="textarea"
          :rows="6"
          placeholder="请输入本月评分分析"
          :disabled="!isEditable"
        />
      </el-form-item>

      <el-form-item label="实际卖点复盘" prop="review">
        <el-input
          v-model="formData.sellingPointsAnalysis"
          type="textarea"
          :rows="6"
          placeholder="请输入实际卖点复盘"
          :disabled="!isEditable"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { biApi } from '@/api';
  import dayjs from 'dayjs';

  const emit = defineEmits<{
    (e: 'reload'): void;
  }>();

  const visible = ref(false);
  const formRef = ref();
  const spuList = ref<any[]>([]);

  const isEditable = computed(() => {
    return formData.spuCode && formData.month;
  });

  // 表单数据
  const formData = reactive({
    spuCode: '',
    month: dayjs().format('YYYY-MM'),
    score: undefined,
    scoreAnalysis: '',
    sellingPointsAnalysis: '',
  });

  // 表单验证规则
  const formRules = {
    spuCode: [{ required: true, message: '请选择SPU', trigger: 'change' }],
    month: [{ required: true, message: '请选择月份', trigger: 'change' }],
    // score: [
    //   { required: true, message: '请输入评分', trigger: 'blur' }
    // ],
    // scoreAnalysis: [
    //   { required: true, message: '请输入本月评分', trigger: 'blur' }
    // ],
    // sellingPointsAnalysis: [
    //   { required: true, message: '请输入实际卖点复盘', trigger: 'blur' }
    // ]
  };

  // 打开弹窗方法
  const open = () => {
    visible.value = true;
    // 初始化SPU列表
    initSpuList();
  };

  // 初始化SPU列表
  const initSpuList = async () => {
    // 模拟获取SPU列表数据
    // 实际开发中这里应该是API调用
    const res = await biApi.biMpcQuerySpuAnalysisEnums();
    spuList.value = res?.spuList || [];
  };

  // SPU选择改变时的处理
  const handleSpuChange = async (val: any) => {
    // 清空选择时，重置其他字段
    formData.score = undefined;
    formData.scoreAnalysis = '';
    formData.sellingPointsAnalysis = '';
    if (!formData.spuCode || !formData.month) {
      return;
    }

    const res = await biApi.biMpcQuerySpuAnalysis({
      month: formData.month,
      spuCode: formData.spuCode,
    });
    formData.score = res.score;
    formData.scoreAnalysis = res.scoreAnalysis;
    formData.sellingPointsAnalysis = res.sellingPointsAnalysis;
  };

  // 关闭弹窗
  const close = () => {
    // 重置表单
    formData.month = dayjs().format('YYYY-MM');
    formData.score = undefined;
    formData.spuCode = '';
    formData.scoreAnalysis = '';
    formData.sellingPointsAnalysis = '';
    visible.value = false;
  };

  // 确定按钮
  const confirm = () => {
    // 表单验证
    formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        const spuName = spuList.value.find(
          (item: any) => item.spuCode === formData.spuCode
        )?.spuName;
        await biApi.biMpcSaveSpuAnalysis({
          /** 月份 */
          month: formData.month,
          /** 评分 */
          score: formData.score,
          /** 评分分析内容 */
          scoreAnalysis: formData.scoreAnalysis,
          /** 卖点分析内容 */
          sellingPointsAnalysis: formData.sellingPointsAnalysis,
          /** SPU编码 */
          spuCode: formData.spuCode,
          /** SPU名称 */
          spuName,
        });
        ElMessage.success('保存成功');
        emit('reload');
        close();
      } else {
        ElMessage.error('请完善表单信息');
      }
    });
  };

  // 暴露方法
  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .spu-analysis-dialog {
    .el-dialog__body {
      min-height: 650px !important;
    }
  }
</style>
