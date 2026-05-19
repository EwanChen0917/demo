<template>
  <el-dialog v-model="visible" title="审批拒绝" width="500px" @close="handleCancel">
    <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="具体拒绝原因" prop="reason">
        <el-input
          type="textarea"
          v-model="form.reason"
          :maxlength="1000"
          show-word-limit
          placeholder="请输入拒绝原因"
          :rows="7"
          :autosize="true"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="danger" @click="handleSubmit" :loading="props.loading">拒绝</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue'

const visible = ref(false)
const formRef = ref()
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const form = reactive({
  reason: ''
})

const emit = defineEmits(['submit'])
const rules = {
  reason: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
}
function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

async function handleSubmit() {
  if (!(await formRef.value.validate())) return;
  emit('submit', { ...form })
  close()
}

function handleCancel() {
  close()
}

defineExpose({ open })
</script>
