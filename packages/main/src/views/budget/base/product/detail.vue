<template>
  <el-dialog title="详情" v-model="visibility" width="800px" :before-close="close">
    <el-form :model="form" ref="formRef" class="form-data" label-width="180px">
      <div class="d-flex">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0" v-for="(item, index) in basicList" :key="index">
            <el-form-item :label="`${item.label}：`">
              <span class="text-style">{{ form[item.key] || '-' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  const visibility = ref(false);
  const form = ref({});
  const basicList = [
    { label: '产品SKU', key: 'skuCode' },
    { label: '产品SKU名称', key: 'skuName' },
    { label: '品牌', key: 'brandName' },
    { label: '一级分类名称', key: 'categoryNameLevel1' },
    { label: '二级分类名称', key: 'categoryNameLevel2' },
    { label: '三级分类名称', key: 'categoryNameLevel3' },
    { label: '四级分类名称', key: 'categoryNameLevel4' },
    { label: '五级分类名称', key: 'categoryNameLevel5' },
    { label: 'SPU编码', key: 'spuCode' },
    { label: 'SPU名称', key: 'spuName' },
    { label: 'GTM名称', key: 'productLineMarketName' },
    { label: 'GTM品线', key: 'productLineMarketGroup' },
    { label: '产品经理', key: 'skuDeveloperName' },
    { label: '产品SKU建议零售价', key: 'skuSuggestPrice' },
    { label: '产品品线', key: 'productLine' },
    { label: '产品SKU上架时间', key: 'skuListingTime' },
    { label: '产品状态', key: 'skuStateDesc' },
    { label: '产品SPU上架时间', key: 'spuListingTime' },
  ];
  const close = () => {
    visibility.value = false;
  };

  const getProductDetail = async (skuCode) => {
    const res = await financeSystemApi.financeBasicQueryProductDetail({
      skuCode: skuCode,
    });
    form.value = res;
  };

  const open = (skuCode) => {
    getProductDetail(skuCode);
    visibility.value = true;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
