<template>
  <el-form
    ref="formRef"
    label-width="180px"
    label-position="left"
    :model="form"
    :rules="rules"
    scroll-to-error
  >
    <div class="d-flex gap-5">
      <KeenCard class="w-50" title="基础信息">
        <el-form-item label="内购产品" prop="productSku">
          <template #label>
            <div class="d-flex align-items-center gap-2">
              内购产品
              <el-tooltip content="内购产品为供应链SKU维度" placement="top">
                <el-icon size="16" color="var(--el-color-primary)">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <span v-if="isEdit || isDetail">{{ form?.productTitle }}</span>

          <el-button
            v-else
            type="primary"
            size="small"
            @click="selectDialogRef?.open({ productSku: form.productSku })"
          >
            选择内购产品
          </el-button>
        </el-form-item>
        <el-form-item label="产品图">
          <KeenImageUpload
            v-model="form.imageUrl"
            directory="internal/goods"
            tooltip="更改产品图片"
            disabled
          />
        </el-form-item>
        <el-form-item label="产品中文名" prop="productTitle">
          {{ form?.productTitle }}
        </el-form-item>
        <el-form-item label="产品英文名" prop="productTitleEn">
          {{ form?.productTitleEn }}
        </el-form-item>
        <el-form-item label="供应链SKU">
          {{ form?.productSku }}
        </el-form-item>
        <el-form-item label="产品详情链接" prop="productUrl">
          <span>{{ form?.productUrl }}</span>
        </el-form-item>
        <el-form-item label="产品状态" v-if="isDetail || isEdit">
          <Tag v-if="form?.statusDesc" :color="statusColorMap[form?.status]">
            {{ form?.statusDesc }}
          </Tag>
        </el-form-item>
      </KeenCard>
      <KeenCard v-if="isDetail" class="w-50" title="商品信息">
        <el-form-item label="销售库存">
          <span>{{ form?.remainingStock }}</span>
        </el-form-item>
        <el-form-item label="产品售价" prop="price">
          <span>{{ form?.price }} CNY</span>
        </el-form-item>
        <el-form-item label="产品分类" prop="productType">
          <span>{{ form?.productType === 1 ? '在售品' : '清仓品' }}</span>
        </el-form-item>
        <el-form-item label="是否限购" prop="limitedFlag">
          <span>{{ form?.limitedFlag === 1 ? '限购' : '不限购' }}</span>
        </el-form-item>
        <el-form-item v-if="form.limitedFlag === 1" label="限购数量" prop="limitedNum">
          <span>{{ form?.limitedNum }}</span>
        </el-form-item>
        <!--        <el-form-item label="产品标签" prop="labelCodeList">
          <div class="d-flex gap-3 flex-wrap">
            <Tag v-for="item in form?.labelNameList" :key="item">{{ item }}</Tag>
          </div>
        </el-form-item>-->
      </KeenCard>
      <KeenCard v-else class="w-50" title="商品信息">
        <el-form-item label="销售库存" prop="remainingStock">
          <NumberInput
            v-model="form.remainingStock"
            placeholder="请输入"
            :precision="0"
            :min="1"
            :disabled="form?.status !== 0 && form?.status !== 3 && form?.status !== null"
          />
        </el-form-item>
        <el-form-item label="产品售价" prop="price">
          <NumberInput v-model="form.price" placeholder="请输入" :min="0" appendText="CNY" />
        </el-form-item>
        <el-form-item label="产品分类" prop="productType">
          <el-select v-model="form.productType" placeholder="请选择">
            <el-option label="在售品" :value="1" />
            <el-option label="清仓品" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否限购" prop="limitedFlag">
          <el-select v-model="form.limitedFlag" placeholder="请选择">
            <el-option label="限购" :value="1" />
            <el-option label="不限购" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.limitedFlag === 1" label="限购数量" prop="limitedNum">
          <NumberInput v-model="form.limitedNum" placeholder="请输入" :precision="0" clearable />
        </el-form-item>
        <!--        <el-form-item label="产品标签" prop="labelCodeList">
          <el-select v-model="form.labelCodeList" placeholder="产品标签" clearable multiple>
            <el-option
              v-for="item in labelCodeList"
              :key="item?.labelCode"
              :label="item?.name"
              :value="item?.labelCode"
            />
          </el-select>
        </el-form-item>-->
      </KeenCard>
    </div>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!isDetail">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
      <el-button v-if="form.status === 0" type="primary" @click="launch">上架</el-button>
      <el-button v-if="[1, 2].includes(form.status)" type="primary" @click="quit">下架</el-button>
      <el-button v-if="form.status === 3" type="primary" @click="launch">重新上架</el-button>
    </el-space>
  </div>
  <SelectDialog ref="selectDialogRef" @success="handleSelect" />
</template>

<script setup lang="ts" name="addInternal">
  import { ElMessage, FormRules } from 'element-plus';
  import * as swal from '@/utils/swal';
  // import { platformApi } from '@/api';
  import { productApi } from '@/api';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import SelectDialog from '@/views/lute-os/internalPurchase/components/selectDialog.vue';

  const statusColorMap = {
    1: 'green',
    2: 'purple',
    3: 'red',
  };

  const route = useRoute();
  const router = useRouter();

  const props = defineProps<{
    mode?: 'edit' | 'detail';
  }>();

  const isEdit = computed(() => props.mode === 'edit');
  const isDetail = computed(() => props.mode === 'detail');

  const formRef = ref();
  const form = ref({
    status: null,
  });
  const rules = reactive<FormRules>({
    remainingStock: [{ required: true, message: '请输入销售库存', trigger: ['blur', 'change'] }],
    productSku: [{ required: true, message: '请选择内购产品', trigger: ['blur', 'change'] }],
    totalStock: [{ required: true, message: '请输入总库存', trigger: ['blur', 'change'] }],
    price: [{ required: true, message: '请输入产品售价', trigger: ['blur', 'change'] }],
    // labelCodeList: [{ required: true, message: '请选择产品标签', trigger: ['blur', 'change'] }],
    limitedFlag: [{ required: true, message: '请选择是否限购', trigger: ['blur', 'change'] }],
    limitedNum: [{ required: true, message: '请输入限购数量', trigger: ['blur', 'change'] }],
    productType: [{ required: true, message: '请选择产品分类', trigger: ['blur', 'change'] }],
  });

  const skuList = ref([]);
  const queryList = async () => {
    const res = await productApi.luteosProductSupplySkuQuerySupplySkuList({
      productStatus: 1,
      productType: 1,
      pageNum: 1,
      pageSize: 100,
    });
    skuList.value = res?.supplySkuList;
  };
  queryList();

  const queryDetail = async () => {
    const res = await productApi.luteosProductMallQueryProductDetail({
      productSku: route.query.code,
    });
    form.value = res || {};
  };

  if (route.query?.code) {
    queryDetail();
  }

  const selectDialogRef = ref();

  const handleSelect = (val) => {
    form.value.imageUrl = val.productImage;
    form.value.productTitle = val.productTitle;
    form.value.productTitleEn = val.productTitleEn;
    form.value.productSku = val.productSku;
    form.value.productUrl = val.productUrl;
    formRef.value?.validateField('productSku');
  };

  const saveLoading = ref<boolean>(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductMallSaveProduct({
        ...form.value,
      });
      ElMessage.success('保存成功');
      router.push('/internalPurchase/goodsManage');
    } finally {
      saveLoading.value = false;
    }
  };

  const launch = async () => {
    const isConfirmed = await swal.confirm('确定上架吗？');
    if (isConfirmed) {
      await productApi.luteosProductMallOperateProduct({
        productSku: form.value.productSku,
        operateType: 'on_shelf',
      });
      ElMessage.success('上架成功');
      queryDetail();
    }
  };

  const quit = async () => {
    const isConfirmed = await swal.confirm('确定下架吗？');
    if (isConfirmed) {
      await productApi.luteosProductMallOperateProduct({
        productSku: form.value.productSku,
        operateType: 'off_shelf',
      });
      ElMessage.success('下架成功');
      queryDetail();
    }
  };

  const cancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    router.push('/internalPurchase/goodsManage');
  };

  // const labelCodeList = ref([]);
  // const getLabelCodeList = async () => {
  //   const res = await platformApi.platformLabelQueryLabelList({
  //     module: 'mall_product',
  //     pageNum: 1,
  //     pageSize: 500,
  //     status: 1,
  //   });
  //   labelCodeList.value = res?.labelInfoList || [];
  // };
  // getLabelCodeList();
</script>

<style scoped lang="scss"></style>
