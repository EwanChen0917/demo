<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="80px"
    class="create-tag-form"
    label-position="top"
  >
    <el-row :gutter="16">
      <!-- <el-col :span="12">
        <el-form-item label="标签颜色" prop="color" required>
          <div class="color-select-wrapper">
            <el-select
              v-model="form.color"
              placeholder="请选择颜色"
              style="width: 100%"
              :teleported="false"
              @change="handleColorChange"
            >
              <el-option
                v-for="option in colorOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
                <div class="color-option">
                  <div class="color-dot" :style="{ backgroundColor: option.value }"></div>
                  <span class="color-label">{{ option.label }}</span>
                </div>
              </el-option>
            </el-select>
            <span v-if="form.color" class="selected-color-dot" :style="{ backgroundColor: form.color }"></span>
          </div>
        </el-form-item>
      </el-col> -->
      <el-col :span="16">
        <el-form-item label="标签名称" prop="name" required>
          <el-input
            v-model="form.name"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
    <div class="form-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
import { platformApi } from '@/api';

  export interface CreateTagFormData {
    color: string;
    name: string;
  }

  const emit = defineEmits<{
    (event: 'confirm'): void;
    (event: 'cancel'): void;
  }>();

  const formRef = ref<FormInstance>();
  const form = reactive<CreateTagFormData>({
    color: '',
    name: '',
  });

  // 颜色选项配置
  const colorOptions = [
    {
      value: '#f56c6c',
      label: '表示问题很严重,需高度关注',
    },
    {
      value: '#e6a23c',
      label: '表示问题较严重,需引发关注',
    },
    {
      value: '#67c23a',
      label: '表示问题不大,无需太担心',
    },
  ];

  const rules: FormRules = {
    // color: [
    //   { required: true, message: '请选择标签颜色', trigger: 'change' },
    // ],
    name: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 1, max: 10, message: '标签名称长度为1-10个字符', trigger: 'blur' },
    ],
  };

  const handleColorChange = (value: string) => {
    form.color = value;
  };

  const handleCancel = () => {
    resetForm();
    emit('cancel');
  };

  const handleConfirm = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value.validate().catch(() => false);
    if(!valid)return
    const res = await platformApi.platformLabelSaveLabelInfo({
        name: form.name,
        labelType: 2,
        module: 'oms_order',
    });

      emit('confirm');
      resetForm();
    
  };

  const resetForm = () => {
    formRef.value?.resetFields();
    form.color = '';
    form.name = '';
  };

  defineExpose({
    resetForm,
  });
</script>

<style scoped lang="scss">
  .create-tag-form {
    width: 400px;
    padding: 16px;

    :deep(.el-form-item__label) {
      &::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .color-select-wrapper {
      position: relative;
      width: 100%;

      .selected-color-dot {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      }
    }

    // 使用 :deep() 穿透样式，因为 el-option 内容可能被 teleport 到外部
    :deep(.el-select-dropdown__item) {
      .color-option {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        .color-dot {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .color-label {
          font-size: 14px;
          color: #606266;
        }
      }
    }

    // 兼容直接使用的情况
    .color-option {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .color-dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .color-label {
        font-size: 14px;
        color: #606266;
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }
  }
</style>

<style lang="scss">
  // 全局样式，用于 el-select 下拉选项（可能被 teleport 到 body）
  .el-select-dropdown__item {
    .color-option {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .color-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .color-label {
        font-size: 12px;
        color: #606266;
      }
    }
  }
</style>

