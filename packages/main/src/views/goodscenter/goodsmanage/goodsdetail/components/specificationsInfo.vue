<template>
  <el-form ref="formRef" :model="props" label-width="120" label-position="left" scroll-to-error>
    <KeenCard
      v-for="(item, index) in props.productSpecList?.filter((item) => item.activeFlag)"
      :key="item.skuCode"
      :title="item.skuCode"
    >
      <div class="mx-7 mw-800px">
        <el-form-item label="毛重：" :prop="'productSpecList.' + index + '.productWeight'">
          <el-space>
            <span>{{ item.productWeight }}</span>
            kg
          </el-space>
        </el-form-item>
        <el-form-item :prop="'productSpecList.' + index + '.productNetWeight'" label="净重：">
          <el-space>
            <span>{{ item.productNetWeight }}</span>
            kg
          </el-space>
        </el-form-item>
        <el-form-item label="包装尺寸：">
          <div class="d-flex align-items-center w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productLength'">
                <el-space class="w-125px">
                  <span>{{ item.productLength }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productWidth'">
                <el-space class="w-125px">
                  <span>{{ item.productWidth }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productHeight'">
                <el-space class="w-125px">
                  <span>{{ item.productHeight }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="productNetWeight" label="净尺寸：">
          <div class="d-flex w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productNetLength'">
                <el-space class="w-125px">
                  <span>{{ item.productNetLength }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productNetWidth'">
                <el-space class="w-125px">
                  <span>{{ item.productNetWidth }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item :prop="'productSpecList.' + index + '.productNetHeight'">
                <el-space class="w-125px">
                  <span>{{ item.productNetHeight }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="productNetWeight" label="箱规：">
          <div class="d-flex w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item prop="cartonLength">
                <el-space class="w-125px">
                  <span>{{ item.cartonLength }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item prop="cartonWidth">
                <el-space class="w-125px">
                  <span>{{ item.cartonWidth }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item prop="cartonHeight">
                <el-space class="w-125px">
                  <span>{{ item.cartonHeight }}</span>
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="cartonWeight" label="单箱重量：">
          <el-space>
            <span>{{ item.cartonWeight }}</span>
            kg
          </el-space>
        </el-form-item>
        <el-form-item prop="cartonNum" label="单箱数量：">
          <el-space>
            <span>{{ item.cartonNum }}</span>
            套
          </el-space>
        </el-form-item>
      </div>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance } from 'element-plus';

  const props = defineProps<{
    productSpecList: any;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();

  defineExpose({
    productSpecList: props.productSpecList,
    formRef,
  });
</script>

<style scoped lang="scss">
  .not-required::before {
    content: '*';
    color: #ffffff;
    margin-right: 4px;
  }
</style>
