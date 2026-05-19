<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="isDetail ? [] : rules"
    label-width="120"
    label-position="left"
    scroll-to-error
  >
    <el-form-item label="毛重：" prop="productWeight">
      <el-space>
        <span v-if="isDetail">{{ form.productWeight }}</span>
        <el-input v-else v-model="form.productWeight" placeholder="请输入毛重" />
        kg
      </el-space>
    </el-form-item>
    <el-form-item prop="productNetWeight" label="净重：">
      <el-space>
        <span v-if="isDetail">{{ form.productNetWeight }}</span>
        <el-input v-else v-model="form.productNetWeight" placeholder="请输入净重" />
        kg
      </el-space>
    </el-form-item>
    <el-form-item label="包装尺寸：" :required="!isDetail">
      <div class="d-flex align-items-center w-100 flex-wrap row-gap-5" v-if="isDetail">
        <div class="d-flex">
          <el-form-item prop="productLength">
            <el-space>
              <span>{{ form.productLength }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productWidth">
            <el-space>
              <span>{{ form.productWidth }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productHeight">
            <el-space>
              <span>{{ form.productHeight }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
      <div class="d-flex align-items-center w-100 flex-wrap row-gap-5" v-else>
        <div class="d-flex">
          <el-form-item prop="productLength">
            <el-space class="w-125px">
              <el-input v-model="form.productLength" placeholder="长" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productWidth">
            <el-space class="w-125px">
              <el-input v-model="form.productWidth" placeholder="宽" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productHeight">
            <el-space class="w-125px">
              <el-input v-model="form.productHeight" placeholder="高" />
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
    </el-form-item>
    <el-form-item prop="productNetWeight" label="净尺寸：">
      <div class="d-flex w-100 flex-wrap row-gap-5" v-if="isDetail">
        <div class="d-flex">
          <el-form-item prop="productNetLength">
            <el-space>
              <span>{{ form.productNetLength }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productNetWidth">
            <el-space>
              <span>{{ form.productNetWidth }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productNetHeight">
            <el-space>
              <span>{{ form.productNetHeight }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
      <div class="d-flex w-100 flex-wrap row-gap-5" v-else>
        <div class="d-flex">
          <el-form-item prop="productNetLength">
            <el-space class="w-125px">
              <el-input v-model="form.productNetLength" placeholder="长" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productNetWidth">
            <el-space class="w-125px">
              <el-input v-model="form.productNetWidth" placeholder="宽" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="productNetHeight">
            <el-space class="w-125px">
              <el-input v-model="form.productNetHeight" placeholder="高" />
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
    </el-form-item>
    <el-form-item prop="productNetWeight" label="箱规：">
      <div class="d-flex w-100 flex-wrap row-gap-5" v-if="isDetail">
        <div class="d-flex">
          <el-form-item prop="cartonLength">
            <el-space>
              <span>{{ form.cartonLength }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="cartonWidth">
            <el-space>
              <span>{{ form.cartonWidth }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="mx-3">*</div>
        <div class="d-flex">
          <el-form-item prop="cartonHeight">
            <el-space>
              <span>{{ form.cartonHeight }}</span>
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
      <div class="d-flex w-100 flex-wrap row-gap-5" v-else>
        <div class="d-flex">
          <el-form-item prop="cartonLength">
            <el-space class="w-125px">
              <el-input v-model="form.cartonLength" placeholder="长" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="cartonWidth">
            <el-space class="w-125px">
              <el-input v-model="form.cartonWidth" placeholder="宽" />
              cm
            </el-space>
          </el-form-item>
        </div>
        <div class="me-3">*</div>
        <div class="d-flex">
          <el-form-item prop="cartonHeight">
            <el-space class="w-125px">
              <el-input v-model="form.cartonHeight" placeholder="高" />
              cm
            </el-space>
          </el-form-item>
        </div>
      </div>
    </el-form-item>
    <el-form-item prop="cartonWeight" label="单箱重量：">
      <el-space>
        <span v-if="isDetail">{{ form.cartonWeight }}</span>
        <el-input v-else v-model="form.cartonWeight" placeholder="请输入单箱重量" />
        kg
      </el-space>
    </el-form-item>
    <el-form-item prop="cartonNum" label="单箱数量：">
      <el-space>
        <span v-if="isDetail">{{ form.cartonNum }}</span>
        <NumberInput v-else v-model="form.cartonNum" placeholder="请输入单箱数量" :precision="0" />
        套
      </el-space>
    </el-form-item>
    <el-form-item label="物流属性：" prop="sensitiveTypeCodeList">
      <div v-if="isDetail">
        <span v-for="(sensitive, index) in form.sensitiveTypeCodeList" :key="sensitive">
          <span>
            {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
          </span>
          <span class="me-3" v-if="index !== form.sensitiveTypeCodeList.length - 1">,</span>
        </span>
      </div>

      <el-checkbox-group v-else v-model="form.sensitiveTypeCodeList">
        <el-checkbox v-for="item in sensitiveTypeList" :key="item.value" :label="item.value">
          {{ item.desc }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <!--    <template v-if="type === 'supplySku'">
      <el-form-item prop="productLevel" label="产品等级">
        <span v-if="isDetail">{{ levelMap[form.productLevel] }}</span>
        <el-select v-else v-model="form.productLevel" placeholder="请选择产品等级">
          <el-option
            v-for="(val, key) in levelMap"
            :key="key"
            :label="val"
            :value="parseInt(key)"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="qualityCheck" label="是否质检">
        <span v-if="isDetail">{{ form.qualityCheck === 1 ? '是' : '否' }}</span>
        <el-radio-group v-else v-model="form.qualityCheck">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>-->
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { productApi } from '@/api';

  const levelMap = {
    1: '正常',
    2: '淘汰',
    3: '侵权',
  };

  const props = defineProps<{
    form: any;
    mode?: 'detail | edit';
    type?: string;
  }>();

  const isDetail = computed(() => props.mode === 'detail');

  // 表单定义
  const formRef = ref<FormInstance>();

  const specRule = {
    pattern: priceRuleFixed4,
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
    productLevel: [
      {
        required: true,
        message: '请选择产品等级',
        trigger: ['blur', 'change'],
      },
    ],
    qualityCheck: [
      {
        required: true,
        message: '请选择是否质检',
        trigger: ['blur', 'change'],
      },
    ],
    sensitiveTypeCodeList: [
      { required: true, type: 'array', trigger: 'change', message: '请选择物流属性' },
    ],
  });

  const sensitiveTypeList = ref([]);
  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    sensitiveTypeList.value = res.sensitiveTypeBeanList.map((item) => {
      return {
        desc: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };
  querySensitiveTypeList();

  defineExpose({
    form: props.form,
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
