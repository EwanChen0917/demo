<template>
  <el-dialog :model-value="visible" :title="title" width="50%" top="10vh" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="eleFormRef" label-width="200" label-position="left">
      <div v-if="form.type === 5">
        <el-form-item label="产品名称：">
          <el-space>
            <el-input v-model="form.productName" suffix-icon="el-icon-date" />
          </el-space>
        </el-form-item>
        <el-form-item label="产品级别：">
          <el-select v-model="form.productLevel" placeholder="请选择产品级别" :isValidate="false">
            <el-option label="S" value="S" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="form.productProperty" placeholder="请选择类型" :isValidate="false">
            <el-option label="自研" value="自研" />
            <el-option label="半自研" value="半自研" />
            <el-option label="组合套装" value="组合套装" />
            <el-option label="联合开发" value="联合开发" />
            <el-option label="选品" value="选品" />
            <el-option label="选款改款" value="选款改款" />
            <el-option label="预研" value="预研" />
            <el-option label="新品延伸" value="新品延伸" />
            <el-option label="老品拓款" value="老品拓款" />
            <el-option label="老品优化" value="老品优化" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否年规：">
          <el-select v-model="form.planFlag" placeholder="请选择产品级别" disabled>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品品线：" prop="productLineCode">
          <ProductLineSelect
            v-model="form.productLineCode"
            placeholder="请选择产品品线"
            clearable
          />
        </el-form-item>
        <el-form-item label="一级分类：">
          <el-select
            v-model="form.topCategoryCode"
            placeholder="请选择一级分类"
            filterable
            @change="getLeafCategoryList"
          >
            <el-option
              v-for="item in topCategoryList"
              :label="item.categoryName"
              :value="item.categoryCode"
              :key="item.categoryCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="五级分类：">
          <el-space>
            <!-- @change="getSpuInfo" -->
            <el-select
              v-model="form.productCategoryCode"
              placeholder="请选择五级分类"
              filterable
              style="width: 200px"
            >
              <el-option
                v-for="item in leafCategoryList"
                :label="item.categoryName"
                :value="item.categoryCode"
                :key="item.categoryCode"
              />
            </el-select>
            <el-link
              type="primary"
              :underline="false"
              @click="router.push(`/categorylist?type=add`)"
            >
              新增分类
            </el-link>
          </el-space>
        </el-form-item>
        <el-form-item label="关联SPU：">
          <el-space>
            <el-link
              type="primary"
              :underline="false"
              @click="router.push(`/goodslist/detail?code=${form?.productSpu}`)"
            >
              {{ form?.productSpu }}
            </el-link>
            <span>{{ form?.productName }}</span>
            <el-link type="primary" :underline="false" @click="bindSpu">关联SPU</el-link>
          </el-space>
        </el-form-item>
        <!-- <el-form-item label="关联SPU：" v-if="form.productCategoryCode">
          <el-space>
            <el-link
              type="primary"
              :underline="false"
              @click="router.push(`/goodslist/detail?code=${spuInfo?.productSpu}`)"
            >
              {{ spuInfo?.productSpu }}
            </el-link>
            <span>{{ spuInfo?.name }}</span>
          </el-space>
        </el-form-item> -->
        <el-form-item label="产品经理：">
          <OperatorSelect v-model="form.productOwnerCode" />
        </el-form-item>
        <el-form-item label="项目经理：">
          <OperatorSelect v-model="form.projectOwner" :operatorType="2" />
        </el-form-item>
        <!-- <el-form-item label="年规时间：">
          <span>{{ form.planTime || '-' }}</span>
        </el-form-item> -->
        <el-form-item label="预计概念评审时间：" prop="conceptReviewTime">
          <el-date-picker
            type="date"
            v-model="form.conceptReviewTime"
            placeholder="请选择预计概念评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="预计立项评审时间：">
          <el-date-picker
            type="date"
            v-model="form.projectReviewTime"
            placeholder="请选择预计立项评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="预计下单评审时间：">
          <el-date-picker
            type="date"
            v-model="form.orderReviewTime"
            placeholder="请选择预计下单评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际概念评审时间：">
          <el-date-picker
            type="date"
            v-model="form.actualConceptReviewTime"
            placeholder="请选择实际概念评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际立项评审时间：">
          <el-date-picker
            type="date"
            v-model="form.actualProjectReviewTime"
            placeholder="请选择实际立项评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际下单评审时间：">
          <el-date-picker
            type="date"
            v-model="form.actualOrderReviewTime"
            placeholder="请选择实际下单评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="一级分类：">
          <span>{{ form.productLineName || '-' }}</span>
        </el-form-item>
        <el-form-item label="五级分类：">
          <span>{{ form.productCategoryName || '-' }}</span>
        </el-form-item>
        <el-form-item label="产品经理：">
          <span>{{ form.productOwner || '-' }}</span>
        </el-form-item>
        <el-form-item label="项目经理：">
          <span>{{ form.projectOwnerName || '-' }}</span>
        </el-form-item>
        <!-- <el-form-item label="年规时间：">
          <span>{{ form.planTime || '-' }}</span>
        </el-form-item> -->
        <el-form-item label="预计概念评审时间：">
          <span>{{ form.conceptReviewTime || '-' }}</span>
        </el-form-item>
        <el-form-item label="预计立项评审时间：">
          <span>{{ form.projectReviewTime || '-' }}</span>
        </el-form-item>
        <el-form-item label="预计下单评审时间：">
          <span>{{ form.orderReviewTime || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际概念评审时间：">
          <span>{{ form.actualConceptReviewTime || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际立项评审时间：">
          <span>{{ form.actualProjectReviewTime || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际下单评审时间：">
          <span>{{ form.actualOrderReviewTime || '-' }}</span>
        </el-form-item>
      </div>
      <el-form-item label="更新类型：" prop="updateType" v-if="form.type === 1">
        <el-select
          v-model="form.updateType"
          placeholder="请选择更新类型"
          filterable
          style="width: 200px"
        >
          <el-option
            v-for="item in updateTypeOptions"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-else-if="form.type === 2">
        <el-form-item label="评分：" prop="star">
          <el-input v-model="form.star" style="width: 400px" />
        </el-form-item>
      </template>
      <template v-else-if="form.type === 3">
        <el-form-item label="取消原因：" prop="reason">
          <el-input v-model="form.reason" type="textarea" :rows="3" style="width: 400px" />
        </el-form-item>
      </template>
      <template v-if="form.updateType === 1">
        <el-form-item label="预计上架时间：" prop="listingTime">
          <el-date-picker
            type="date"
            v-model="form.listingTime"
            placeholder="请选择预计上架时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="更新原因:" prop="reason">
          <el-input v-model="form.reason" type="textarea" :rows="3" style="width: 400px" />
        </el-form-item>
      </template>
      <el-form-item v-else label="预计上架时间：">
        <span>{{ form.listingTime || '-' }}</span>
      </el-form-item>

      <el-form-item v-if="form.updateType === 2" label="实际上架时间:" prop="actualListingTime">
        <el-date-picker
          type="date"
          v-model="form.actualListingTime"
          placeholder="请选择实际上架时间"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item v-else label="实际上架时间：">
        <span>{{ form.actualListingTime || '-' }}</span>
      </el-form-item>

      <el-form-item v-if="form.updateType === 5" label="预计中仓入库时间:" prop="planStockTime">
        <el-date-picker
          type="date"
          v-model="form.planStockTime"
          placeholder="请选择预计中仓入库时间"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item v-else label="预计中仓入库时间：">
        <span>{{ form.planStockTime || '-' }}</span>
      </el-form-item>

      <el-form-item v-if="form.updateType === 3" label="实际中仓入库时间:" prop="stockTime">
        <el-date-picker
          type="date"
          v-model="form.stockTime"
          placeholder="请选择实际中仓入库时间"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item v-else label="实际中仓入库时间：">
        <span>{{ form.stockTime || '-' }}</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark" v-if="form.type === 5">
        <el-input type="textarea" v-model="form.remark" :rows="3" />
      </el-form-item>
      <el-form-item label="附件/图片：" prop="fileList" v-if="[1, 3, 5].includes(form.type)">
        <KeenFileUpload
          v-model="form.fileList"
          :multiple="true"
          limit="100"
          :showOperate="true"
          directory="annualproduct/files"
          @success="handleUploadSuccess"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
      </el-form-item>
    </el-form>
    <template #header>
      <p>
        <span class="primary-color fw-bold">#{{ form.productName }}&nbsp;&nbsp;</span>
        <span
          :class="['badge', getPropertyClass(form.productProperty), 'badge-status', 'fw-bold']"
          v-if="form.productProperty"
        >
          {{ form.productProperty }}
        </span>
        &nbsp;
        <span
          :class="['badge', getLevelClass(form.productLevel), 'badge-status', 'fw-bold']"
          v-if="form.productLevel"
        >
          {{ form.productLevel }}
        </span>
      </p>
    </template>
    <template #footer v-if="form.type !== 4">
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          {{ form.type === 5 ? '保存' : '申请' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <BindGoods
    :visible="bindVisible"
    selectOne
    confirmText="确定"
    @close="handleBindSpuClose"
    :selected-row="selectedRow"
    :selected-key="selectedKey"
  />
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { CategoryLevelBean, Product } from '@/api/product/data-contracts';
  import BindGoods from '@/views/lute-os/goodscenter/bindGoods/Modal/bindGoods.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      form: any;
    }>(),
    {
      visible: false,
      title: '提示',
      form: {},
    }
  );

  const router = useRouter();

  const state = reactive<{
    rules: any;
  }>({
    rules: {},
  });

  const { rules } = toRefs(state);
  const updateTypeOptions = [
    {
      label: '预计上架时间',
      value: 1,
    },
    {
      label: '实际上架时间',
      value: 2,
    },
    {
      label: '预计中仓入库时间',
      value: 5,
    },
    {
      label: '实际中仓入库时间',
      value: 3,
    },
  ];
  rules.value = {
    listingTime: {
      required: true,
      message: '请选择预计上架时间',
      trigger: ['blur', 'change'],
    },
    actualListingTime: {
      required: true,
      message: '请选择实际上架时间',
      trigger: ['blur', 'change'],
    },
    stockTime: {
      required: true,
      message: '请选择实际中仓入库时间',
      trigger: ['blur', 'change'],
    },
    planStockTime: {
      required: true,
      message: '请选择预计中仓入库时间',
      trigger: ['blur', 'change'],
    },
    updateType: {
      required: true,
      message: '请选择更新类型',
      trigger: ['blur', 'change'],
    },
    reason: { required: true, message: '请输入原因', trigger: ['blur', 'change'] },
    star: [
      { required: true, message: '请输入评分', trigger: ['blur', 'change'] },
      {
        pattern: /^(?:[1-4](\.\d)?|5(\.0)?)$/,
        message: '请输入正确评分：1-5',
        trigger: ['blur', 'change'],
      },
    ],
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
    (event: 'submit', r?: 'submit', val?: any): void;
  }>();

  const handleClose = () => {
    emit('closeModal');
  };

  const eleFormRef = ref();

  const handleSubmit = () => {
    eleFormRef.value.validate().then((res) => {
      res && emit('submit');
    });
  };

  const getPropertyClass = (property) => {
    const data: any = {
      选品: 'badge-light-primary',
      自研: 'badge-light-success',
      联合开发: 'badge-light-info',
    };

    return data[property] || 'badge-light-warning';
  };

  const getLevelClass = (level) => {
    const data: any = {
      'A/B': 'badge-light-primary',
      A: 'badge-light-warning',
      B: 'badge-light-info',
      C: 'badge-light-dark',
      S: 'badge-light-danger',
      待定: 'badge-light-secondary',
    };

    return data[level] || 'badge-light-success';
  };

  const topCategoryList = ref<CategoryLevelBean[]>([]);
  const leafCategoryList = ref<CategoryLevelBean[]>([]);
  const queryCategoryList = async (code: any = undefined) => {
    const res = await productApi.luteosProductCategoryQueryCategoryTopAndLeafLevelList({
      categoryCode: code,
    });
    if (code) {
      leafCategoryList.value = res?.categoryLevelBeanList;
    } else {
      topCategoryList.value = res?.categoryLevelBeanList;
    }
    console.log('leafCategoryList', leafCategoryList.value);
  };
  const getLeafCategoryList = (code) => {
    if (!code) leafCategoryList.value = [];
    else {
      queryCategoryList(code);
    }
  };

  const spuInfo = ref<Product>({});
  const getSpuInfo = async (code) => {
    if (code) {
      const res = await productApi.luteosProductQueryProductByCategory({
        categoryCode: code,
      });
      spuInfo.value = res?.product;
    }
  };

  const bindVisible = ref(false);
  const selectedRow = ref({});
  const selectedKey = ref();
  const bindSpu = () => {
    if (props.form?.productSpu) {
      selectedRow.value = { productSpu: props.form?.productSpu, name: props.form?.productName };
      selectedKey.value = props.form?.productSpu;
    }
    bindVisible.value = true;
  };

  const handleBindSpuClose = async (reload = false, val) => {
    if (reload) {
      props.form.productSpu = val?.productSpu;
      props.form.productName = val?.name;
      bindVisible.value = false;
    } else {
      bindVisible.value = false;
    }
  };

  const handleUploadSuccess = () => {
    // 设置文件信息
    if (props.form?.fileList?.length) {
      props.form?.fileList.forEach((file: any) => {
        file.fileName = file.name;
      });
    }
  };

  onMounted(() => {
    if (props.form.type === 5) {
      queryCategoryList();
      getLeafCategoryList(props.form?.topCategoryCode);
      // getSpuInfo(props.form?.productCategoryCode);
    }
  });
</script>

<style lang="scss" scoped>
  .primary-color {
    color: #3e97ff;
    font-weight: 600;
  }

  .fw-bold {
    font-size: 20px;
  }
</style>
