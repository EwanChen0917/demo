<template>
  <el-popover
    popper-class="rt_el_pop"
    :offset="0"
    :hide-after="0"
    placement="bottom-end"
    :width="350"
    :visible="visible"
    trigger="manual"
    ref="popRef"
  >
    <div class="h-xl-100">
      <div class="px-7 py-5">
        <div class="fs-4 text-dark fw-bold">筛选条件</div>
      </div>
      <div class="py-5 h-xl-100">
        <div
          style="
            height: calc(100% - 100px);
            overflow-y: auto;
            padding-left: 1.75rem;
            padding-right: 1rem;
            margin-right: 0.75rem;
          "
        >
          <el-form :model="form" label-position="top">
            <el-form-item label="分类：">
              <CategoryCascader
                ref="categoryCascaderRef"
                style="width: 100%"
                v-model="form.categoryCode"
              />
            </el-form-item>
          </el-form>
        </div>
        <div
          class="d-flex justify-content-end"
          style="padding-left: 1.75rem; padding-right: 1.75rem; padding-top: 1.75rem"
        >
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="submitFn">确定</el-button>
        </div>
      </div>
    </div>
    <template #reference>
      <el-button type="primary" @click="visible = !visible">筛选</el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const form = ref({
    categoryCode: [],
  });
  const emits = defineEmits<{ (event: 'confirmSeach', val: any) }>();
  const visible = ref(false);
  const popRef = ref();
  const categoryCascaderRef = ref();
  const reset = () => {
    categoryCascaderRef.value.clear();
    form.value.categoryCode = [];
    emits('confirmSeach', form.value);
    visible.value = false;
  };
  const submitFn = () => {
    emits('confirmSeach', form.value);
    visible.value = false;
  };
</script>

<style scoped lang="scss"></style>
