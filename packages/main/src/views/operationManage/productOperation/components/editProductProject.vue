<template>
  <el-dialog :title="title" :model-value="visible" width="800px" :before-close="close">
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-width="120px">
      <el-form-item
        label="项目名称"
        prop="projectName"
        :rules="[{ required: true, message: '请填写项目名称' }]"
      >
        <el-input
          v-model="form.projectName"
          placeholder="请填写项目名称"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="产品名称"
        prop="productCode"
        :rules="[{ required: true, message: '请选择产品' }]"
      >
        <span class="product-name" v-if="form.productName">{{ form.productName }}</span>
        <el-button type="primary" @click="bindGoodsVisible = true">选择产品</el-button>
      </el-form-item>
      <el-form-item
        label="开售日期"
        prop="saleStartDate"
        :rules="[{ required: true, message: '请选择开售日期' }]"
      >
        <el-date-picker
          v-model="form.saleStartDate"
          type="date"
          placeholder="请选择开售日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item
        label="目标销量"
        prop="targetSaleOneMonth"
        :rules="[{ required: true, message: '请填写推广第一个月' }]"
      >
        <el-input v-model="form.targetSaleOneMonth">
          <template #prepend>推广第一个月</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label=""
        prop="targetSaleTwoMonth"
        :rules="[{ required: true, message: '请填写推广第二个月' }]"
      >
        <el-input v-model="form.targetSaleTwoMonth">
          <template #prepend>推广第二个月</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label=""
        prop="targetSaleThreeMonth"
        :rules="[{ required: true, message: '请填写推广第三个月' }]"
      >
        <el-input v-model="form.targetSaleThreeMonth">
          <template #prepend>推广第三个月</template>
        </el-input>
      </el-form-item>
      <el-form-item
        label="产品定位"
        prop="productPositioning"
        :rules="[{ required: true, message: '请填写产品定位' }]"
        class="question-wrap"
      >
        <el-input
          v-model="form.productPositioning"
          placeholder="请填写"
          type="textarea"
          :rows="6"
          maxlength="500"
          show-word-limit
        />
        <ElTooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
        >
          <template #content>
            对内：对于公司内部而言，整体的品线布局中，本款产品的处于什么地位，对于品线的意义是什么。
            <br />
            对外：产品在消费者心中的位置，产品独特的价值是什么，创意是什么，让别人购买的理由是什么，在观众心中形成的认知是什么等。
          </template>
          <QuestionFilled class="question-icon" />
        </ElTooltip>
      </el-form-item>
      <el-form-item
        label="核心卖点"
        prop="coreSellingPoint"
        :rules="[{ required: true, message: '请填写核心卖点' }]"
        class="question-wrap"
      >
        <el-input
          v-model="form.coreSellingPoint"
          placeholder="请填写"
          type="textarea"
          :rows="6"
          maxlength="1000"
          show-word-limit
        />
        <ElTooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
          content="找出顾客最感兴趣的各种特征后，分析这一特征所产生的优点，找出这一优点能够带给顾客的利益，最后提出证据，需要跟产品经理同频输出。"
        >
          <QuestionFilled class="question-icon" />
        </ElTooltip>
      </el-form-item>
      <el-form-item
        label="次要卖点"
        prop="minorSellingPoint"
        :rules="[{ required: true, message: '请填写次要卖点' }]"
        class="question-wrap"
      >
        <el-input
          v-model="form.minorSellingPoint"
          placeholder="请填写"
          type="textarea"
          :rows="6"
          maxlength="1000"
          show-word-limit
        />
        <ElTooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
          content="次要卖点3-5个，遵循“人无我有,人有我优,人优我特,人特我精”原则。"
        >
          <QuestionFilled class="question-icon" />
        </ElTooltip>
      </el-form-item>
      <el-form-item
        label="定价策略"
        prop="pricingStrategy"
        :rules="[{ required: true, message: '请填写定价策略' }]"
        class="question-wrap"
      >
        <el-input
          v-model="form.pricingStrategy"
          placeholder="请填写"
          type="textarea"
          :rows="6"
          maxlength="1000"
          show-word-limit
        />
        <ElTooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
        >
          <template #content>
            成本导向定价：按商品单位成本加上一定比例的毛利，定出零售价。
            <br />
            竞争导向定价：是以市场上相互竞争的同类产品或服务的价格为依据的产品定价思路。其目标是促使企业在市场上获得一定的优势地位或谋取一定的生存空间。
            <br />
            需求导向定价：是企业以消费者对产品价值感知为出发点的定价思路。其目标是最大程度获取消费者理解和需求
          </template>
          <QuestionFilled class="question-icon" />
        </ElTooltip>
      </el-form-item>
      <el-form-item
        label="营销策略"
        prop="marketingPolicy"
        :rules="[{ required: true, message: '请填写营销策略' }]"
        class="question-wrap"
      >
        <el-input
          v-model="form.marketingPolicy"
          placeholder="请填写"
          type="textarea"
          :rows="3"
          maxlength="1000"
          show-word-limit
        />
        <ElTooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top"
          effect="light"
          trigger="hover"
        >
          <template #content>
            产品策略
            <br />
            价格策略
            <br />
            渠道策略
            <br />
            促销策略
          </template>
          <QuestionFilled class="question-icon" />
        </ElTooltip>
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :select-one="true"
    confirmText="确认"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { productOperationApi } from '@/api/index';
  import { ElMessage, ElTooltip } from 'element-plus';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      type: string;
      info: any;
    }>(),
    {
      visible: false,
      type: 'add',
    }
  );
  const form = ref<any>({
    coreSellingPoint: '',
    minorSellingPoint: '',
    productCode: '',
    pricingStrategy: '',
    productPositioning: '',
    projectCode: '',
    projectName: '',
    saleStartDate: '',
    targetSaleOneMonth: '',
    targetSaleThreeMonth: '',
    marketingPolicy: '',
  });
  form.value = { ...props.info };
  const isAdd = computed(() => {
    return props.type === 'add';
  });

  const title = computed(() => {
    return isAdd.value ? '新增产品项目' : '编辑产品项目';
  });

  // 选择商品
  const bindGoodsVisible = ref(false);
  const handleBindGoodsClose = (reload = false, val) => {
    if (reload) {
      form.value.productCode = val.productSpu;
      form.value.productName = val.name;
    }
    bindGoodsVisible.value = false;
    formRef.value.clearValidate(['productCode']);
  };

  const formRef = ref();
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params = {
        ...form.value,
      };

      if (isAdd.value) {
        delete params.projectCode;
      }
      await productOperationApi.luteosOpetationSaveOperationProject(params);
      ElMessage.success('操作成功');
      emits('save');
      close();
    }
  };
  const close = () => {
    formRef.value.resetFields();
    form.value.productCode = '';
    nextTick(() => {
      props.visible = false;
      emits('close');
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
</script>

<style scoped lang="scss">
  .product-name {
    margin: 0 10px;
  }
  .question-wrap {
    :deep(.el-form-item__label) {
      padding-right: 30px;
    }
  }
  .question-icon {
    width: 15px;
    height: 15px;
    position: absolute;
    left: -25px;
    top: 15px;
    cursor: pointer;
  }
</style>
