<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="执行情况评分">
      <div style="height: 32px; display: flex; align-items: center;">{{ form.score }} 分</div> 
    </el-form-item>
    <el-form-item label="评分原因">
      <el-input v-model="form.scoreReason" type="textarea" placeholder="请输入评分原因" rows="4" :disabled="disabled" :autosize="true" />
    </el-form-item>
    <el-form-item label="落地情况">
      <span style="display: inline-flex; align-items: center; height: 32px;">{{ form.implementFlag === 1 ? '已落地' : '未落地' }}</span>
    </el-form-item>
    <el-form-item label="未落地原因">
      <el-input
        v-model="form.implementRemark"
        type="textarea"
        placeholder="请输入未落地原因"
        :disabled="disabled"
        :autosize="true"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
  import { reactive } from 'vue';
  import { useVModel } from '@vueuse/core';
  const props = defineProps({
    form: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const form = useVModel(props, 'form');
</script>
