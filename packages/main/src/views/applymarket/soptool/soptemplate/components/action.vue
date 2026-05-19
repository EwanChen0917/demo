<template>
  <div class="packing-detail-page">
    <el-form
      ref="formRef"
      :model="form"
      :rules="formRule"
      label-width="100px"
      label-position="left"
    >
      <detailCard title="模板信息">
        <el-row :gutter="20" style="max-width: 800px">
          <el-col :span="24" :offset="0">
            <el-form-item label="模板名称" prop="templateName">
              <el-input
                style="max-width: 300px"
                v-model="form.templateName"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="模板描述" prop="templateDesc">
              <el-input
                type="textarea"
                rows="5"
                v-model="form.templateDesc"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </detailCard>
      <draggable
        :list="form.stepList"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        :sort="form.stepList.length > 1"
        handle=".card-header"
        item-key="_id"
      >
        <template #item="{ element, index }">
          <detailCard :title="`步骤${index + 1}`" :key="element._id">
            <template #operation v-if="form.stepList.length > 1">
              <el-button plain @click="handleRemove(index)">删除</el-button>
            </template>
            <el-row :gutter="20" style="max-width: 800px">
              <el-col :span="24">
                <el-form-item
                  label="标题"
                  :prop="`stepList[${index}].title`"
                  :rules="[{ required: true, message: '请填写标题' }]"
                >
                  <el-input v-model="element.title" maxlength="100" show-word-limit />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="描述"
                  :prop="`stepList[${index}].desc`"
                  :rules="[{ required: true, message: '请输入描述内容' }]"
                >
                  <el-input
                    type="textarea"
                    rows="5"
                    v-model="element.desc"
                    maxlength="500"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="示意图"
                  :prop="`stepList[${index}].image`"
                  :rules="[{ required: true, message: '请上传示意图' }]"
                >
                  <KeenImageUpload
                    @upload-success="formRef.validateField(`stepList[${index}].image`)"
                    v-model="element.image"
                    directory="sop/template"
                  >
                    <el-button type="primary">重新上传</el-button>
                  </KeenImageUpload>
                </el-form-item>
              </el-col>
            </el-row>
          </detailCard>
        </template>
      </draggable>
      <div v-if="form.stepList.length < 15">
        <el-button type="primary" @click="addStep">添加步骤</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  // import { SlickList, SlickItem } from 'vue-slicksort';
  import draggable from 'vuedraggable';
  import * as swal from '@/utils/swal';
  import { uuid } from '@/utils/aesTils';

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true,
    },
    formRule: { type: Object, required: true },
  });
  const emits = defineEmits(['update:modelValue']);
  const formRef = ref();
  const form = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });
  const addStep = () => {
    if (form.value.stepList.length < 15) {
      form.value.stepList.push({
        _id: uuid(),
        title: '',
        desc: '',
        image: '',
        stepCode: '',
        sort: 0,
      });
    }
  };
  const handleRemove = async (index) => {
    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;
    console.log(form.value.stepList.splice(index, 1));
  };
  defineExpose({
    formRef,
  });
</script>

<style scoped lang="scss"></style>
