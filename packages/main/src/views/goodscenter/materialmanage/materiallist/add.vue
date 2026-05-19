<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="150">
    <KeenFlex>
      <template #auto>
        <KeenCard title="物料图片" style="margin-bottom: 0 !important">
          <div class="text-center">
            <KeenImageUpload
              v-model="form.materielImage"
              directory="product/goods"
              tooltip="更改物料图片"
            />
          </div>
        </KeenCard>
        <KeenCard title="物料类型">
          <el-select v-model="form.materielType" class="w-100" filterable clearable>
            <el-option
              v-for="item in materielTypeMap"
              :key="item.value"
              :label="item.desc"
              :value="parseInt(item.value)"
            />
          </el-select>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent" @tab-change="tabChange">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <div class="mw-800px px-7">
                <el-form-item label="物料编码：" prop="materielCode">
                  <el-input
                    v-model="form.materielCode"
                    placeholder="请输入物料编码"
                    suffix-icon="el-icon-date"
                    :disabled="isEdit"
                  />
                </el-form-item>
                <el-form-item label="物料中文名：" prop="materielName">
                  <el-input
                    v-model="form.materielName"
                    placeholder="请输入物料中文名"
                    suffix-icon="el-icon-date"
                  />
                </el-form-item>
                <el-form-item label="物料英文名：" prop="materielNameEn">
                  <el-input
                    v-model="form.materielNameEn"
                    placeholder="请输入物料英文名"
                    suffix-icon="el-icon-date"
                  />
                </el-form-item>
                <el-form-item label="物料描述：">
                  <el-input
                    v-model="form.description"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 10 }"
                    placeholder="请输入物料描述"
                  />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="规格信息" :name="1" lazy>
            <KeenCard title="规格信息">
              <SpecificationsInfo ref="specificationsInfoFormRef" v-model:form="form.productSpec" />
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="供应商信息" :name="2" lazy>
            <KeenCard title="供应商信息">
              <PurchaseInfo ref="purchaseInfoFormRef" v-model:form="form.productPurchase" />
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="报关/清关信息" :name="3" lazy>
            <KeenCard title="清关信息">
              <DeclareInfo
                ref="declareInfoFormRef"
                v-model:form="form.productDeclare"
                hide-sensitive
              />
            </KeenCard>
            <KeenCard title="报关信息">
              <ClearanceInfo ref="clearanceInfoFormRef" v-model:form="form.productClearance" />
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </template>
    </KeenFlex>
  </el-form>

  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="checkForm(2)">保存</el-button>
    </el-space>
  </div>
  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.skuList"
  />
</template>

<script setup lang="ts" name="addmaterial">
  import type { FormInstance, FormRules } from 'element-plus';
  import { platformApi, ProductApi, productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import ClearanceInfo from '@/views/goodscenter/components/clearanceInfo.vue';
  import SpecificationsInfo from '../../components/specificationsInfo.vue';
  import PurchaseInfo from '../../components/purchaseInfo.vue';
  import DeclareInfo from '../../components/declareInfo.vue';

  const approveStatusMap = {
    0: 'badge-light-info',
    1: 'badge-light-warning',
    2: 'badge-light-success',
    3: 'badge-light-danger',
  };

  const route = useRoute();
  let query = route.query || {};
  // const materielCode = query?.code as string;
  const isEdit = ref<boolean>(true);
  const showCancel = ref<boolean>(true);
  const tabCurrent = ref(0);
  // 表单定义
  const formRef = ref<FormInstance>();
  const specificationsInfoFormRef = ref<FormInstance>();
  const productLevelFormRef = ref<FormInstance>();
  const purchaseInfoFormRef = ref<FormInstance>();
  const declareInfoFormRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductMaterielSaveMateriel.RequestBody>({
    /** 分类编码 */
    categoryCode: '',
    /** 物料描述 */
    description: '',
    /** 物料编码 */
    materielCode: '',
    /** 物料图片 */
    materielImage: '',
    /** 物料中文名称 */
    materielName: '',
    /** 物料英文名称 */
    materielNameEn: '',
    /**
     * 物料类型 see MaterielTypeEnum
     * @format int32
     */
    materielType: '',
    /**
     * 操作类型 1：保存草稿 2：提交
     * @format int32
     */
    operateType: '',
    /** 申报信息 */
    productDeclare: {},
    /** 报关信息 */
    productClearance: {},
    /** 供应商信息：供应商信息 */
    productPurchase: {},
    productSpec: {
      qualityCheck: 0,
      productLevel: 0,
    },
    /** 产品sku集合 */
    skuList: [],
    skuCodeList: [],
    /**
     * 状态 0-草稿 1-已提交
     * @format int32
     */
    state: '',
  });
  const rules = reactive<FormRules>({
    materielCode: [
      {
        required: true,
        message: '请输入物料编码',
        trigger: ['blur', 'change'],
      },
    ],
    materielName: [
      {
        required: true,
        message: '请输入物料中文名',
        trigger: ['blur', 'change'],
      },
    ],
    materielNameEn: [
      {
        required: true,
        message: '请输入物料英文名',
        trigger: ['blur', 'change'],
      },
    ],
    description: [
      {
        max: 500,
        message: '请输入500个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 获取物料详情信息
  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductMaterielQueryDetail({
      materielCode: code,
      operationType: 'update',
    });
    Object.keys(form).forEach((key) => {
      form[key] = res[key];
    });
    console.log('form', form);
    form.categoryCode = [];
    let parent = res?.productCategory;
    for (let i = 1; i <= 5; i += 1) {
      form.categoryCode.push(parent?.categoryCode);
      parent = parent?.productCategory;
    }
  };
  /* watchEffect(() => {
if (materielCode) {
getDetailInfo(materielCode);
}
}); */

  const tabsStatusMap = {
    0: {
      selected: true,
      valid: false,
    },
    1: {
      selected: false,
      valid: false,
    },
    2: {
      selected: false,
      valid: false,
    },
    3: {
      selected: false,
      valid: false,
    },
  };
  const tabChange = (name) => {
    tabsStatusMap[name].selected = true;
  };

  const saveLoading = ref<boolean>(false);
  const checkItem = async (tab) => {
    console.log('tab', tab);
    try {
      if (tab === 0) {
        await formRef.value?.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        });
      }
      if (tab === 1) {
        ['productWeight', 'productLength', 'productWidth', 'productHeight'].forEach((item) => {
          if (!priceRuleFixed4.exec(form.productSpec[item])) {
            throw new Error('error');
          }
        });
        ['productNetWeight', 'productNetLength', 'productNetWidth', 'productNetHeight'].forEach(
          (item) => {
            if (form.productSpec[item] && !priceRuleFixed4.exec(form.productSpec[item])) {
              throw new Error('error');
            }
          }
        );
      } else if (tab === 2) {
        if (
          !form.productPurchase.supplierCode ||
          !form.productPurchase.purchaseCurrencyCode ||
          !priceRuleFixed4.exec(form.productPurchase.purchasePrice) ||
          !form.productPurchase.purchaseCurrencyCode
        ) {
          throw new Error('error');
        }
      } else if (tab === 3) {
        if (
          !priceRuleFixed4.exec(form.productDeclare.declarePrice) ||
          !form.productDeclare.declareName ||
          !form.productDeclare.declareNameEn ||
          !form.productDeclare.productMaterialIngredient
        ) {
          throw new Error('error');
        }
      }
    } catch (e) {
      return false;
    }
    return true;
  };
  const checkForm = async (operateType) => {
    if (operateType === 1) {
      // 保存草稿只需校验物料编码字段
      const validSome = ['materielCode'];
      formRef.value.validateField(validSome, (val) => {
        if (val) handleSaveSubmit(operateType);
        else tabCurrent.value = 0;
      });
    } else {
      // 先判断当前选项卡是否通过校验
      switch (tabCurrent.value) {
        case 0:
          tabsStatusMap[tabCurrent.value].valid = await formRef.value?.validate().catch(() => {
            return false; // 校验失败返回 false，不继续执行
          });
          break;
        case 1: {
          tabsStatusMap[tabCurrent.value].valid =
            await specificationsInfoFormRef.value.formRef.validate();
          break;
        }
        case 2:
          tabsStatusMap[tabCurrent.value].valid =
            await purchaseInfoFormRef.value.formRef.validate();
          break;
        case 3:
          tabsStatusMap[tabCurrent.value].valid = await declareInfoFormRef.value.formRef.validate();
          break;
        default:
          break;
      }
      console.log('tabsStatusMap', tabsStatusMap);
      for (let i = 0; i <= 3; i += 1) {
        // 校验尚未被点击过的选项卡
        if (!tabsStatusMap[i].valid) {
          if (!(await checkItem(i))) {
            tabCurrent.value = i;
            return;
          }
          tabsStatusMap[i].valid = true;
        }
        if (!tabsStatusMap[i].valid) {
          tabCurrent.value = i;
          return;
        }
      }
      handleSaveSubmit(operateType);
    }
  };
  const handleSaveSubmit = async (operateType) => {
    try {
      saveLoading.value = true;
      const data = {
        ...form,
        operateType,
        categoryCode: form.categoryCode[4],
      };
      const skuCodeList = [];
      if (form.skuList && form.skuList.length > 0) {
        form.skuList.forEach((item) => {
          skuCodeList.push(item.productSku);
        });
        data.skuCodeList = skuCodeList;
      }

      if (specificationsInfoFormRef.value) {
        data.productSpec = specificationsInfoFormRef.value.form;
      }
      if (purchaseInfoFormRef.value) {
        data.productPurchase = purchaseInfoFormRef.value.form;
      }
      if (declareInfoFormRef.value) {
        data.productDeclare = declareInfoFormRef.value.form;
      }
      const res = await productApi.luteosProductMaterielSaveMateriel(data);
      swal.success(operateType === 1 ? '保存成功' : '提交成功');
      isEdit.value = true;
      getDetailInfo(res?.materielCode || form.materielCode);
    } catch (e) {
      console.log(e);
    } finally {
      saveLoading.value = false;
    }
  };

  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    // window.close();
    router.push({
      name: 'materiallist',
    });
  };

  const resetForm = () => {
    if (formRef.value) formRef.value.resetFields();
    form.categoryCode = '';
    form.description = '';
    form.materielCode = '';
    form.materielImage = '';
    form.materielName = '';
    form.materielNameEn = '';
    form.materielType = '';
    form.operateType = '';
    form.skuCodeList = [];
    form.skuList = [];
    form.state = '';
    form.productType = 1;
    form.productLevelNew = '';
    form.productDeclare = {};
    form.productPurchase = {
      purchaseCurrencyCode: 'CNY',
    };
    form.productSpec = {
      productLevel: 0,
      qualityCheck: 0,
    };
    if (specificationsInfoFormRef.value) specificationsInfoFormRef.value.formRef.resetFields();
    if (productLevelFormRef.value) productLevelFormRef.value.formRef.resetFields();
    if (purchaseInfoFormRef.value) purchaseInfoFormRef.value.formRef.resetFields();
    if (declareInfoFormRef.value) declareInfoFormRef.value.formRef.resetFields();
  };

  const router = useRouter();
  // 监听路由变化
  watch(
    () => router.currentRoute.value.path,
    () => {
      query = router.currentRoute.value.query;
      if (!query.code) {
        isEdit.value = false;
        resetForm();
        tabCurrent.value = 0;
      } else {
        isEdit.value = true;
        getDetailInfo(query.code);
      }
      showCancel.value = !!query.code;
    },
    { immediate: true, deep: true }
  );

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.unbindConfirm();
      if (!isConfirmed) return;
      form.skuList.splice(index, 1);
    }
  };

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.skuList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  const materielTypeMap = ref();
  const queryMaterielType = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['materiel_type'],
    });
    materielTypeMap.value = res?.dictMap?.materiel_type || [];
  };
  queryMaterielType();

  onUnmounted(() => {
    if (sessionStorage.getItem('goodsSearchInfo')) sessionStorage.removeItem('goodsSearchInfo');
  });
</script>

<style scoped lang="scss"></style>
