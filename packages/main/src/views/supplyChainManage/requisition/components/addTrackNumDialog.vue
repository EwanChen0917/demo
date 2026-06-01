<template>
  <el-dialog title="上传跟踪号" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="120px">
      <div v-for="(item, index) in form.trackList" :key="index" class="d-flex gap-3 mb-3">
        <div class="flex-grow-1">
          <el-form-item
            label="物流渠道/快递:"
            :prop="`trackList[${index}].freightForwardingChannelCode`"
            :rules="[{ required: true, message: '请输入物流渠道/快递', trigger: 'change' }]"
          >
            <el-input v-model="item.freightForwardingChannelCode" clearable />
          </el-form-item>
          <el-form-item
            label="跟踪号:"
            :prop="`trackList[${index}].trackingNum`"
            :rules="[{ required: true, message: '请输入跟踪号', trigger: 'change' }]"
          >
            <el-input v-model="item.trackingNum" clearable />
          </el-form-item>
        </div>
        <div class="d-flex align-items-center">
          <el-button type="primary" link @click="form.trackList.push({})">添加</el-button>
          <el-button
            type="danger"
            link
            @click="form.trackList.splice(index, 1)"
            :disabled="form.trackList?.length <= 1"
          >
            删除
          </el-button>
        </div>
      </div>
      <el-form-item label="运单号:">
        <el-input v-model="form.waybillNo" clearable />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits<{
    (e: 'success', val): void;
  }>();

  const visible = ref(false);
  const code = ref();
  const formRef = ref(null);
  const form = ref({
    trackList: [],
    waybillNo: '',
  });
  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpOdoV2UploadTrackNum({
        trackList: form.value.trackList?.filter((item) => item),
        waybillNo: form.value.waybillNo,
        code: code.value,
        type: 1,
      });
      ElMessage.success('保存成功');
      emits('success', form.value.trackList);
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (curCode, list, waybillNo) => {
    code.value = curCode;
    form.value.trackList = list ?? [{}];
    form.value.waybillNo = waybillNo;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
