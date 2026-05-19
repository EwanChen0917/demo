<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="站点" prop="siteCode">
        <el-input v-model="form.siteCode" disabled />
      </el-form-item>
      <el-form-item label="品线">
        <ElTooltip
          popper-class="action_tool_tip w-400px text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
          :content="lineName"
          :disabled="lineName?.length < 30"
        >
          <el-input v-model="lineName" disabled />
        </ElTooltip>
      </el-form-item>
      <el-form-item label="合作产品">
        <ElTooltip
          popper-class="action_tool_tip w-400px text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
          :content="productName"
          :disabled="productName?.length < 30"
        >
          <el-input v-model="productName" disabled />
        </ElTooltip>
      </el-form-item>
      <el-form-item label="折扣码" prop="markCode">
        <!-- 已完成不可编辑 -->
        <el-input v-model="form.markCode" :disabled="form.status === 2" />
      </el-form-item>
      <el-form-item label="折扣码生效时间" prop="effectiveTime">
        <el-date-picker
          v-model="form.effectiveTime"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="到期时间"
          type="datetimerange"
        />
      </el-form-item>
      <el-form-item label="折扣码生效时间所在时区" prop="markCodeTimeZone">
        <el-select v-model="form.markCodeTimeZone" clearable filterable placeholder="请选择时区">
          <el-option
            v-for="item in countryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="折扣力度" prop="taskDiscount">
        <el-input v-model="form.taskDiscount" />
      </el-form-item>
      <el-form-item label="追踪编码" prop="taskTrackingCode">
        <el-input v-model="form.taskTrackingCode" />
      </el-form-item>
      <el-form-item label="Atribution链接" prop="taskAttributionLink">
        <el-input v-model="form.taskAttributionLink" />
      </el-form-item>
      <el-form-item label="运营备注" prop="operateRemark">
        <el-input v-model="form.operateRemark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { metaApi } from '@/api/index';
  import { ElMessage, ElTooltip } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      info: any;
    }>(),
    {
      visible: false,
      title: '提示',
    }
  );
  const form = ref({
    effectiveTime: [],
    markCodeTimeZone: '',
    markCodeEndTime: '',
    markCodeStartTime: '',
    metaMarkCode: '',
    platformCode: '',
    siteCode: '',
    taskAttributionLink: '',
    taskCode: '',
    taskDiscount: '',
    taskDiscountDesc: '',
    taskTrackingCode: '',
    operateRemark: '',
    type: '',
    markCode: '',
  });

  form.value = { ...props.info };

  form.value.effectiveTime = [props.info.markCodeStartTime || '', props.info.markCodeEndTime || ''];
  const productName = computed(() => {
    const list =
      (form.value.productInfoList &&
        form.value.productInfoList.map((item) => {
          return item.productName;
        })) ||
      [];
    return list.join(',');
  });

  const lineName = computed(() => {
    const list =
      (form.value.productLineList &&
        form.value.productLineList.map((item) => {
          return item.lineName;
        })) ||
      [];
    return list.join(',');
  });

  const countryOptions = ref([
    { label: '东十二区', value: '+12' },
    { label: '东十一区', value: '+11' },
    { label: '东十区', value: '+10' },
    { label: '东九区', value: '+9' },
    { label: '东八区', value: '+8' },
    { label: '东七区', value: '+7' },
    { label: '东六区', value: '+6' },
    { label: '东五区', value: '+5' },
    { label: '东四区', value: '+4' },
    { label: '东三区', value: '+3' },
    { label: '东二区', value: '+2' },
    { label: '东一区', value: '+1' },
    { label: '中时区', value: '0' },
    { label: '西一区', value: '-1' },
    { label: '西二区', value: '-2' },
    { label: '西三区', value: '-3' },
    { label: '西四区', value: '-4' },
    { label: '西五区', value: '-5' },
    { label: '西六区', value: '-6' },
    { label: '西七区', value: '-7' },
    { label: '西八区', value: '-8' },
    { label: '西九区', value: '-9' },
    { label: '西十区', value: '-10' },
    { label: '西十一区', value: '-11' },
    { label: '西十二区', value: '-12' },
    { label: '西十三区', value: '-13' },
  ]);

  const rules = ref({
    taskDiscount: { required: true, message: '请输入折扣力度', trigger: ['blur', 'change'] },
  });

  const formRef = ref();
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const data: any = {
        markCodeEndTime: form.value.effectiveTime ? form.value.effectiveTime[1] : '',
        markCodeStartTime: form.value.effectiveTime ? form.value.effectiveTime[0] : '',
        markCodeTimeZone: form.value.markCodeTimeZone,
        taskAttributionLink: form.value.taskAttributionLink,
        taskCode: form.value.taskCode,
        taskDiscount: form.value.taskDiscount,
        taskDiscountDesc: form.value.taskDiscountDesc,
        taskTrackingCode: form.value.taskTrackingCode,
        metaMarkCode: form.value.metaMarkCode,
        platformCode: form.value.platformCode,
        siteCode: form.value.siteCode,
        operateRemark: form.value.operateRemark,
        markCode: form.value.markCode,
      };
      if (form.value.type === 'delay') {
        // 延长
        data.handleType = 3;
        metaApi.luteosMetaHandleMetaMarkTask(data).then((res) => {
          ElMessage.success('延长折扣码成功！');
          emit('closeModal', 'reload');
        });
      } else {
        metaApi.luteosMetaSaveMetaMarkTask(data).then(() => {
          ElMessage.success('修改信息成功！');
          emit('closeModal', 'reload');
        });
      }
    }
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
