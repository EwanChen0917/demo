<template>
  <el-dialog title="设置" v-model="visible" align-center>
    <div class="info-alert">
      <i class="iconfont icon-xinxizhuangtai"></i>
      <div>
        <div>统计时间内广告点击量最大值：{{ maxClicks }}，最小值：{{ minClicks }}；</div>
        <div>
          基于个人预设的点击量范围，筛选统计时间内全量广告并计算点击量中位数，用于千人千面的四象限划分。该范围为持久化配置，不受筛选操作影响。
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form ref="formRef" :model="form" label-width="0" inline :rules="formRules">
        <el-form-item>
          <label class="label" for="clicksStart">点击量范围设置</label>
        </el-form-item>
        <el-form-item prop="clicksStart">
          <el-input id="clicksStart" v-model="form.clicksStart" placeholder="最小值" />
        </el-form-item>
        <el-form-item>
          <span>-</span>
        </el-form-item>
        <el-form-item prop="clicksEnd">
          <el-input v-model="form.clicksEnd" placeholder="最大值" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { biApi } from '@/api';
  import { type FormInstance } from 'element-plus';

  defineProps<{
    maxClicks?: number;
    minClicks?: number;
  }>();

  const emit = defineEmits<{
    confirm: [];
  }>();

  const visible = ref(false);

  const form = reactive({
    clicksEnd: undefined,
    clicksStart: undefined,
  });

  const open = (payload = {}) => {
    Object.assign(form, payload);
    visible.value = true;
  };
  defineExpose({
    open,
  });

  const formRules = {
    clicksStart: [
      { required: true, message: '请输入点击量范围', trigger: 'blur' },
      { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
    ],
    clicksEnd: [
      { required: true, message: '请输入点击量范围', trigger: 'blur' },
      { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (form.clicksStart !== undefined && value !== undefined) {
            if (Number(value) < Number(form.clicksStart)) {
              callback(new Error('最大值应大于最小值'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        },
        trigger: 'blur',
      },
    ],
  };
  const formRef = useTemplateRef<FormInstance>('formRef');
  const handleConfirm = async () => {
    const valid = await formRef.value?.validate();
    if (!valid) return;
    await biApi.biAdSaveClicksScope({
      clicksEnd: form.clicksEnd,
      clicksStart: form.clicksStart,
    });
    visible.value = false;
    emit('confirm');
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped lang="scss">
  .info-alert {
    background: var(---l2, #e8f4ff);
    border-radius: 6px;
    color: var(---N9, #262626);
    padding: 8px 16px;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    align-items: start;
    column-gap: 6px;
    .icon-xinxizhuangtai {
      font-size: 16px;
      color: var(---C2, #258dff);
    }
  }
  .main-content {
    margin-top: 30px;
    .el-form--inline {
      :deep(.el-form-item) {
        margin-right: 10px;
      }
    }
    .label {
      display: flex;
      align-items: center;
      column-gap: 14px;
      color: var(---N9, #262626);

      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
      // 不换行
      white-space: nowrap;
    }
  }
</style>
