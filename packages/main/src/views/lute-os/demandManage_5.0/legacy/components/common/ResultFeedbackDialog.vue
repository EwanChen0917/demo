<template>
  <el-dialog
    v-model="visible"
    title="结果反馈"
    width="600px"
    align-center
    destroy-on-close
    @close="handleCancel"
  >
    <el-form :model="form" :rules="rules" label-width="120px" ref="formRef">
      <el-form-item label="是否落地" prop="implementFlag">
        <el-select v-model="form.implementFlag" placeholder="请选择是否落地" @change="handleLandedChange">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>

      <!-- 落地为“是” -->
      <el-form-item v-if="form.implementFlag === 1" label="具体落地情况" prop="implementRemark">
        <el-input
          v-model="form.implementRemark"
          class="textarea-input"
          type="textarea"
          :maxlength="1000"
          show-word-limit
          placeholder="只要有至少一个结论落地应用，即可识别为是有落地应用的项目"
          :autosize="true"
        />
      </el-form-item>

      <!-- 落地为“否” -->
      <el-form-item v-if="form.implementFlag === 0" label="未落地原因" prop="implementRemark">
        <el-input
          v-model="form.implementRemark"
          type="textarea"
          :maxlength="1000"
          show-word-limit
          placeholder="请输入没有落地的具体原因"
          :autosize="true"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="success" @click="handleSubmit" :loading="props.loading">提交反馈</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const visible = ref(false)
const formRef = ref()
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const form = reactive({
  implementFlag: '',
  implementRemark: ''
})

const rules = {
  implementFlag: [{ required: true, message: '请选择是否落地', trigger: 'change' }]
}

const emit = defineEmits(['submit'])

function open(data = {}) {
  Object.assign(form, {
    ...data,
    implementFlag: '',
    implementRemark: ''
  })
  visible.value = true
}

function close() {
  visible.value = false
}

function handleSubmit() {
  formRef.value.validate((valid) => {
    if (!valid) return
    emit('submit', { ...form })
    ElMessage.success('提交成功')
    close()
  })
}

function handleCancel() {
  close()
}

function handleLandedChange() {
  form.implementRemark = ''
}

defineExpose({ open, close })
</script>
<style scoped>
:global(.textarea-input .el-textarea__inner) {
  height: auto !important;
}
</style>
