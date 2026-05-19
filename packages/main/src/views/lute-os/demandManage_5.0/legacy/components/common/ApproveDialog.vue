<template>
  <el-dialog v-model="visible" title="审批通过" width="500px" align-center @close="handleCancel">
    <el-form :model="form" :rules="rules" label-width="150px" ref="formRef">
      <el-form-item label="选择需求执行人" prop="operatorList">
        <DeptMember
          v-model="form.operatorList"
          :maxCollapseTags="2"
          :teleported="true"
          multiple
          collapseTags
          clearable
          autoRefocusAfterChange
          deferRenderUntilOptionsLoaded
        />
      </el-form-item>
      <el-form-item label="预计开始时间" prop="planStartDate">
        <el-date-picker v-model="form.planStartDate" type="date" placeholder="选择时间" value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item label="预计完成时间" prop="planFinishDate">
        <el-date-picker v-model="form.planFinishDate" type="date" placeholder="选择时间" value-format="YYYY-MM-DD" :disabled-date="disablePlanFinishDate" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="handleSubmit" :loading="props.loading">确认</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
const visible = ref(false)
const formRef = ref()
const props = defineProps({
  userInfo: { type: Object, default: null },
  loading: {
    type: Boolean,
    default: false,
  },
})
const form = reactive({
  operatorList: [],
  planStartDate: '',
  planFinishDate: ''
})
const rules = {
  operatorList: [{ required: true, message: '请选择执行人', trigger: 'change' }]
}
function disablePlanFinishDate(date) {
  if (!form.planStartDate) return false;
  return date.getTime() < new Date(form.planStartDate).setHours(0,0,0,0)
}
const emit = defineEmits(['submit'])

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function handleSubmit() {
  formRef.value.validate(valid => {
    if (!valid) return
    emit('submit', { ...form })
    close()
  })
}

function handleCancel() {
  close()
}

defineExpose({ open })
</script>
