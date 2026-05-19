<template>
  <el-dialog
    v-model="visible"
    title="添加评论"
    width="600px"
    align-center
    destroy-on-close
    @close="handleCancel"
  >
    <el-form label-width="80px">
      <el-form-item label="评论内容">
        <el-input
          v-model="comment"
          type="textarea"
          :maxlength="1000"
          show-word-limit
          placeholder="请输入评论内容"
          :autosize="true"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit">添加</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
const visible = ref(false)
const comment = ref('')

const emit = defineEmits(['submit'])

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function handleSubmit() {
  if (comment.value.trim()) {
    emit('submit', comment.value)
    comment.value = ''
    close()
  }
}

function handleCancel() {
  comment.value = ''
  close()
}

// 暴露 open 方法供外部调用
defineExpose({ open })
</script>
