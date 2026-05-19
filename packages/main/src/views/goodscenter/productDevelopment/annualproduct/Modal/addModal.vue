<template>
  <el-dialog :model-value="visible" :title="title" width="60%" top="10vh" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="eleFormRef" label-width="200" label-position="left">
      <div v-if="form.type === 5">
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="form.productName" suffix-icon="el-icon-date" />
        </el-form-item>
        <el-form-item label="品牌：" prop="brand">
          <el-select v-model="form.brand" placeholder="请选择品牌" filterable>
            <el-option
              v-for="item in brandList"
              :label="item.brandName"
              :value="item.brandCode"
              :key="item.brandCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="四级分类：" prop="categoryFourCode">
          <el-select
            v-model="form.categoryFourCode"
            placeholder="请选择四级分类"
            filterable
            clearable
          >
            <el-option
              v-for="item in categoryListLevel4"
              :label="item.categoryName"
              :value="item.categoryCode"
              :key="item.categoryCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品级别：">
          <el-select v-model="form.productLevel" placeholder="请选择产品级别" :isValidate="false">
            <el-option label="S" value="S" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="开发方式：">
          <el-select
            v-model="form.productProperty"
            placeholder="请选择开发方式"
            :isValidate="false"
          >
            <el-option label="自研" value="自研" />
            <el-option label="半自研" value="半自研" />
            <el-option label="组合套装" value="组合套装" />
            <el-option label="联合开发" value="联合开发" />
            <el-option label="选品" value="选品" />
            <el-option label="选款改款" value="选款改款" />
            <el-option label="预研" value="预研" />
            <el-option label="转预研" value="转预研" />
            <el-option label="新品延伸" value="新品延伸" />
            <el-option label="老品拓款" value="老品拓款" />
            <el-option label="老品优化" value="老品优化" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品定位：">
          <el-input v-model="form.productPosition" placeholder="请输入产品定位" />
        </el-form-item>
        <el-form-item label="是否年规：">
          <el-select v-model="form.planFlag" placeholder="请选择产品级别" disabled>
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="年规年份" prop="planYear">
          <el-date-picker
            v-model="form.planYear"
            type="year"
            value-format="YYYY"
            format="YYYY"
            placeholder="请选择年规年份"
          />
        </el-form-item>
        <el-form-item label="售价：">
          <el-input v-model="form.price" placeholder="请输入售价" />
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="form.status" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="产品品线：" prop="productLineCode">
          <ProductLineSelect
            v-model="form.productLineCode"
            placeholder="请选择产品品线"
            clearable
          />
        </el-form-item>

        <!-- <el-form-item label="五级分类：">
          <el-space>
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
        </el-form-item> -->
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
        <el-form-item label="GTM：">
          <el-select v-model="form.gtm" placeholder="请选择GTM" filterable>
            <el-option
              v-for="item in gtmList"
              :label="item.name"
              :value="item.memberCode"
              :key="item.memberCode"
            />
          </el-select>
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
        <el-form-item label="产品经理：" prop="productOwnerCode">
          <OperatorSelect
            v-model="form.productOwnerCode"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="7"
          />
        </el-form-item>
        <el-form-item label="项目经理：" prop="projectOwner">
          <OperatorSelect
            v-model="form.projectOwner"
            :operatorType="2"
            placeholder="项目经理"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="7"
          />
        </el-form-item>
        <!-- <el-form-item label="年规时间：">
          <span>{{ form.planTime || '-' }}</span>
        </el-form-item> -->
        <el-form-item label="预计立项启动时间：" prop="projStartEstDate">
          <el-date-picker
            type="date"
            v-model="form.projStartEstDate"
            placeholder="请选择预计立项启动时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际立项启动时间：" prop="projStartActDate">
          <el-date-picker
            type="date"
            v-model="form.projStartActDate"
            placeholder="请选择实际立项启动时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="预计charter时间：" prop="charterEstDate">
          <el-date-picker
            type="date"
            v-model="form.charterEstDate"
            placeholder="请选择预计charter时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际charter时间：" prop="charterActDate">
          <el-date-picker
            type="date"
            v-model="form.charterActDate"
            placeholder="请选择实际charter时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="预计计划评审时间：" prop="planRevEstDate">
          <el-date-picker
            type="date"
            v-model="form.planRevEstDate"
            placeholder="请选择预计计划评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际计划评审时间：" prop="planRevActDate">
          <el-date-picker
            type="date"
            v-model="form.planRevActDate"
            placeholder="请选择实际计划评审时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
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
        <el-form-item label="预计可获得性决策时间：" prop="decisionEstDate">
          <el-date-picker
            type="date"
            v-model="form.decisionEstDate"
            placeholder="请选择预计可获得性决策时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="实际可获得性决策时间：" prop="decisionActDate">
          <el-date-picker
            type="date"
            v-model="form.decisionActDate"
            placeholder="请选择实际可获得性决策时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="品牌：">
          <span>{{ form.brandName || '-' }}</span>
        </el-form-item>
        <el-form-item label="四级分类：">
          <span>{{ form.fourCategoryName || '-' }}</span>
        </el-form-item>
        <el-form-item label="产品定位：">
          <span>{{ form.productPosition || '-' }}</span>
        </el-form-item>
        <el-form-item label="售价：">
          <span>{{ form.price || '-' }}</span>
        </el-form-item>
        <el-form-item label="GTM：">
          <span>{{ form.gtmName || '-' }}</span>
        </el-form-item>
        <el-form-item label="状态：">
          <span>{{ form.status || '-' }}</span>
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
        <el-form-item label="预计立项启动时间：">
          <span>{{ form.projStartEstDate || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际立项启动时间：">
          <span>{{ form.projStartActDate || '-' }}</span>
        </el-form-item>
        <el-form-item label="预计charter时间：">
          <span>{{ form.charterEstDate || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际charter时间：">
          <span>{{ form.charterActDate || '-' }}</span>
        </el-form-item>
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
        <el-form-item label="预计可获得性决策时间：">
          <span>{{ form.decisionEstDate || '-' }}</span>
        </el-form-item>
        <el-form-item label="实际可获得性决策时间：">
          <span>{{ form.decisionActDate || '-' }}</span>
        </el-form-item>
      </div>
      <el-form-item label="更新类型：" prop="updateTypeList" v-if="form.type === 1">
        <el-select
          v-model="form.updateTypeList"
          placeholder="请选择更新类型"
          filterable
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="3"
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

      <el-form-item
        v-if="form.updateTypeList?.includes(5)"
        label="预计中仓入库时间:"
        prop="planStockTime"
      >
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

      <el-form-item
        v-if="form.updateTypeList?.includes(3)"
        label="实际中仓入库时间:"
        prop="stockTime"
      >
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

      <template v-if="form.updateTypeList?.includes(1)">
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

      <el-form-item
        v-if="form.updateTypeList?.includes(2)"
        label="实际上架时间:"
        prop="actualListingTime"
      >
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
      <div v-if="form.type === 5">
        <el-form-item
          label="MPC目标-首单交付数量："
          prop="firstDeliveryQuantity"
          :rules="[{ pattern: integerRule, message: '请输入数字', trigger: ['blur', 'change'] }]"
        >
          <el-input v-model="form.firstDeliveryQuantity" clearable />
        </el-form-item>
        <el-form-item
          label="MPC-首单交付计划："
          prop="firstDeliveryPlan"
          :rules="[{ pattern: integerRule, message: '请输入数字', trigger: ['blur', 'change'] }]"
        >
          <el-input v-model="form.firstDeliveryPlan" clearable />
        </el-form-item>
      </div>
      <el-form-item label="GMV目标：">
        <el-input v-model="form.gmvGoal" clearable v-if="form.type === 5">
          <template #suffix>万</template>
        </el-input>
        <span v-else>{{ form.gmvGoal ? `${form.gmvGoal}万` : '-' }}</span>
      </el-form-item>
      <el-form-item label="毛利率目标：">
        <el-input-number
          v-if="form.type === 5"
          v-model="form.profitRateGoal"
          :min="0"
          :controls="false"
          class="w-100 text-left-input"
        >
          <template #suffix>%</template>
        </el-input-number>
        <span v-else>{{ form.profitRateGoal ? `${form.profitRateGoal}%` : '-' }}</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark" v-if="form.type === 5">
        <el-input type="textarea" v-model="form.remark" :rows="3" />
      </el-form-item>
      <el-form-item
        label="附件/图片："
        prop="fileList"
        v-if="[1, 3, 5].includes(form.type)"
        :rules="[
          {
            required: form.updateTypeList?.includes(2) || form.updateTypeList?.includes(3),
            message: '请上传附件/图片',
            trigger: 'change',
          },
        ]"
      >
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
  import { productApi, memberApi } from '@/api';
  import { CategoryLevelBean, Product, BrandBean } from '@/api/product/data-contracts';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import { integerRule } from '@/utils/rulesRegExp';

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
      label: '预计中仓入库时间',
      value: 5,
    },
    {
      label: '实际中仓入库时间',
      value: 3,
    },
    {
      label: '预计上架时间',
      value: 1,
    },
    {
      label: '实际上架时间',
      value: 2,
    },
  ];
  rules.value = {
    productName: {
      required: true,
      message: '请输入产品名称',
      trigger: ['blur', 'change'],
    },
    brand: {
      required: true,
      message: '请选择品牌',
      trigger: ['blur', 'change'],
    },

    productLineCode: {
      required: true,
      message: '请选择产品品线',
      trigger: ['blur', 'change'],
    },
    planYear: {
      required: true,
      message: '请选择年规年份',
      trigger: ['blur', 'change'],
    },
    // 产品经理
    productOwnerCode: {
      required: true,
      message: '请选择产品经理',
      trigger: ['blur', 'change'],
    },
    // 项目经理
    projectOwner: {
      required: true,
      message: '请选择项目经理',
      trigger: ['blur', 'change'],
    },

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
    updateTypeList: {
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
    eleFormRef.value
      ?.validate()
      ?.then((res) => {
        res && emit('submit');
      })
      .catch(() => false);
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

  const brandList = ref<BrandBean[]>([]);
  const queryBrandList = async () => {
    const res = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 100,
    });
    brandList.value = res?.brandBeanList || [];
  };
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQueryMemberListByTitle({
      title: 'gtm',
    });
    gtmList.value = res?.memberList || [];
  };
  const categoryListLevel4 = ref<CategoryLevelBean[]>([]);
  // 获取分类列表
  const queryCategoryList = async (code: any = undefined, level: number = 1) => {
    const res = await productApi.luteosProductCategoryQueryCategoryListByParam({
      categoryName: '',
      pageNum: 1,
      pageSize: 1000,
      status: 1,
      categoryCode: code,
      level: level,
    });
    categoryListLevel4.value = res?.categoryBeanList || [];
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
      props.form.productOwnerCode = props.form.productOwnerCode?.split('、') || [];
      props.form.projectOwner = props.form.projectOwner?.split('、') || [];
      queryCategoryList(undefined, 4);
      queryBrandList();
      queryGtmList();
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
  .text-left-input {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
</style>
