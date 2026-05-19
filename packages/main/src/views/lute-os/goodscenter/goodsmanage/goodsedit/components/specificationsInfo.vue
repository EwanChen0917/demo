<template>
  <el-form
    ref="formRef"
    :model="props"
    :rules="rules"
    label-width="120"
    label-position="left"
    scroll-to-error
  >
    <KeenCard
      v-for="(item, index) in props.productSpecList?.filter((item) => item.activeFlag)"
      :key="item.skuCode"
      :title="item.skuCode"
    >
      <div class="mx-7 mw-800px">
        <el-form-item
          label="毛重："
          :prop="'productSpecList.' + index + '.productWeight'"
          :rules="rules.productWeight"
        >
          <el-space>
            <el-input v-model="item.productWeight" placeholder="请输入毛重" />
            kg
          </el-space>
        </el-form-item>
        <el-form-item
          :prop="'productSpecList.' + index + '.productNetWeight'"
          label="净重："
          :rules="rules.productNetWeight"
        >
          <el-space>
            <el-input v-model="item.productNetWeight" placeholder="请输入净重" />
            kg
          </el-space>
        </el-form-item>
        <el-form-item label="包装尺寸：" required>
          <div class="d-flex align-items-center w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productLength'"
                :rules="rules.productNetWeight"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productLength" placeholder="长" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productWidth'"
                :rules="rules.productWidth"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productWidth" placeholder="宽" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productHeight'"
                :rules="rules.productHeight"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productHeight" placeholder="高" />
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="productNetWeight" label="净尺寸：">
          <div class="d-flex w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productNetLength'"
                :rules="rules.productNetLength"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productNetLength" placeholder="长" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productNetWidth'"
                :rules="rules.productNetWidth"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productNetWidth" placeholder="宽" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.productNetHeight'"
                :rules="rules.productNetHeight"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.productNetHeight" placeholder="高" />
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="productNetWeight" label="箱规：">
          <div class="d-flex w-100 flex-wrap row-gap-5">
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.cartonLength'"
                :rules="rules.cartonLength"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.cartonLength" placeholder="长" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.cartonWidth'"
                :rules="rules.cartonWidth"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.cartonWidth" placeholder="宽" />
                  cm
                </el-space>
              </el-form-item>
            </div>
            <div class="me-3">*</div>
            <div class="d-flex">
              <el-form-item
                :prop="'productSpecList.' + index + '.cartonHeight'"
                :rules="rules.cartonHeight"
              >
                <el-space class="w-125px">
                  <el-input v-model="item.cartonHeight" placeholder="高" />
                  cm
                </el-space>
              </el-form-item>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          :prop="'productSpecList.' + index + '.cartonWeight'"
          :rules="rules.cartonWeight"
          label="单箱重量："
        >
          <el-space>
            <el-input v-model="item.cartonWeight" placeholder="请输入单箱重量" />
            kg
          </el-space>
        </el-form-item>
        <el-form-item
          :prop="'productSpecList.' + index + '.cartonNum'"
          :rules="rules.cartonNum"
          label="单箱数量："
        >
          <el-space>
            <NumberInput v-model="item.cartonNum" placeholder="请输入单箱数量" :precision="0" />
            套
          </el-space>
        </el-form-item>
      </div>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { priceRule } from '@/utils/rulesRegExp';

  const props = defineProps<{
    productSpecList: any;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();

  const specRule = {
    pattern: priceRule,
    message: '请输入数字',
  };
  const rules = reactive<FormRules>({
    productWeight: [
      {
        required: true,
        message: '请输入毛重',
        trigger: ['blur', 'change'],
      },
      specRule,
    ],
    productLength: [
      {
        required: true,
        message: '请输入长度',
        trigger: ['blur', 'change'],
      },
      specRule,
    ],
    productWidth: [
      {
        required: true,
        message: '请输入宽度',
        trigger: ['blur', 'change'],
      },
      specRule,
    ],
    productHeight: [
      {
        required: true,
        message: '请输入高度',
        trigger: ['blur', 'change'],
      },
      specRule,
    ],
    productNetWeight: [specRule],
    productNetLength: [specRule],
    productNetWidth: [specRule],
    productNetHeight: [specRule],
    cartonLength: [specRule],
    cartonWidth: [specRule],
    cartonHeight: [specRule],
    cartonWeight: [specRule],
  });

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
