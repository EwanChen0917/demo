<template>
  <el-dialog :model-value="visible" title="选择关联的分类" @close="$emit('close')">
    <el-form :model="form" :rules="rules" ref="formRef" inline>
      <el-form-item>
        <el-select
          v-model="form.categoryCode1"
          placeholder="一级分类"
          clearable
          @change="
            (val) => {
              handelChange(val, 1);
            }
          "
        >
          <el-option
            v-for="item in optionsMap.options1"
            :key="item.categoryCode"
            :label="item.categoryName || ''"
            :value="item.categoryCode!"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.categoryCode2"
          placeholder="二级分类"
          clearable
          @change="
            (val) => {
              handelChange(val, 2);
            }
          "
        >
          <el-option
            v-for="item in optionsMap.options2"
            :key="item.categoryCode"
            :label="item.categoryName || ''"
            :value="item.categoryCode!"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.categoryCode3"
          placeholder="三级分类"
          clearable
          @change="
            (val) => {
              handelChange(val, 3);
            }
          "
        >
          <el-option
            v-for="item in optionsMap.options3"
            :key="item.categoryCode"
            :label="item.categoryName || ''"
            :value="item.categoryCode!"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="form.categoryCode4"
          placeholder="四级分类"
          clearable
          @change="
            (val) => {
              handelChange(val, 4);
            }
          "
        >
          <el-option
            v-for="item in optionsMap.options4"
            :key="item.categoryCode"
            :label="item.categoryName || ''"
            :value="item.categoryCode!"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="categoryCode5">
        <el-select v-model="form.categoryCode5" placeholder="五级分类" clearable>
          <el-option
            v-for="item in optionsMap.options5"
            :key="item.categoryCode"
            :label="item.categoryName || ''"
            :value="item.categoryCode!"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import type { FormInstance, FormRules } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive({
    categoryCode1: '',
    categoryCode2: '',
    categoryCode3: '',
    categoryCode4: '',
    categoryCode5: '',
  });
  const rules = reactive<FormRules>({
    categoryCode5: [
      {
        required: true,
        message: '请选择五级分类',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const handleConfirm = () => {
    formRef.value.validate().then((flag) => {
      if (flag) {
        emit('close', true, form.categoryCode5);
      }
    });
  };
  const optionsMap = reactive({
    options1: [],
    options2: [],
    options3: [],
    options4: [],
    options5: [],
  });
  const getOptions = async (categoryCode: string, level: number) => {
    const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
      categoryCode,
    });
    optionsMap[`options${level}`] = res.categoryLevelBeanList;
  };
  getOptions('', 1);

  const handelChange = (val: string, level: number) => {
    // 选项改变时，清空深层级备选项和已选中数据
    for (let i = level + 1; i <= 5; i += 1) {
      optionsMap[`options${i}`] = [];
      form[`categoryCode${i}`] = '';
    }
    if (val) getOptions(val, level + 1);
  };

  const handleCancel = () => {
    emit('close');
  };
</script>

<style scoped lang="scss"></style>
