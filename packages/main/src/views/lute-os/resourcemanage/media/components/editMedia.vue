<template>
  <el-dialog title="编辑媒体基本资料" :model-value="visible" @close="$emit('close')" align-center>
    <el-form :model="form" ref="formRef" label-width="150px">
      <el-form-item
        prop="mediaType"
        label="媒体类型"
        :rules="[{ required: true, message: '请选择媒体类型', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.mediaType"
          placeholder="请选择媒体类型"
          clearable
          filterable
          style="width: 400px"
        >
          <el-option
            v-for="item in dictMap.media_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="contentType"
        label="内容类型"
        :rules="[{ required: true, message: '请选择内容类型', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.contentType"
          placeholder="请选择内容类型"
          clearable
          filterable
          style="width: 400px"
        >
          <el-option
            v-for="item in dictMap.content_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords" label="媒体关键词">
        <el-input v-model="form.keywords" clearable />
      </el-form-item>
      <el-form-item prop="keywords" label="主要流量国家">
        <el-select
          v-model="form.mainCountry"
          :teleported="false"
          clearable
          filterable
          placeholder="请选择主要流量国家"
          style="width: 400px"
        >
          <el-option
            v-for="item in dictMap.product_site"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="monthFlow" label="月流量">
        <el-input v-model="form.monthFlow" clearable />
      </el-form-item>
      <el-form-item prop="monthlyVisitorCount" label="月独立访客量">
        <el-input v-model="form.monthlyVisitorCount" clearable />
      </el-form-item>
      <el-form-item prop="globalRank" label="媒体全球排名">
        <el-input v-model="form.globalRank" clearable />
      </el-form-item>
      <el-form-item prop="countryRank" label="媒体国家排名">
        <el-input v-model="form.countryRank" clearable />
      </el-form-item>
      <el-form-item prop="categoryRank" label="媒体类目排名">
        <el-input v-model="form.categoryRank" clearable />
      </el-form-item>
      <el-form-item prop="mediaDr" label="媒体DR">
        <el-input v-model="form.mediaDr" clearable />
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="form.remark" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { mediaApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    dictMap: Object;
    info: Object;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    mediaCode: '',
    categoryRank: '',
    countryRank: '',
    globalRank: '',
    mainCountry: '',
    mediaDr: '',
    monthFlow: '',
    monthlyVisitorCount: '',
    remark: '',
    keywords: '',
    mediaType: '',
    contentType: '',
  });

  form.value = { ...props.info };

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await mediaApi.luteosMediaOperateMedia({
        detail: {
          categoryRank: form.value.categoryRank,
          countryRank: form.value.countryRank,
          globalRank: form.value.globalRank,
          mainCountry: form.value.mainCountry,
          mediaDr: form.value.mediaDr,
          monthFlow: form.value.monthFlow,
          monthlyVisitorCount: form.value.monthlyVisitorCount,
          remark: form.value.remark,
          contentType: form.value.contentType,
          keywords: form.value.keywords,
          mediaType: form.value.mediaType,
        },
        mediaCode: form.value.mediaCode,
        operateType: 1,
      });
      ElMessage.success('编辑成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>

<style scoped lang="scss">
  .dialog-footer {
    :deep(.el-button) {
      margin-right: 10px;
    }
  }
</style>
