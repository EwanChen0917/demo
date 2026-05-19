<template>
  <el-form
    ref="formRef"
    :model="form"
    :label-position="labelPosition"
    label-width="150"
    scroll-to-error
  >
    <KeenFlex>
      <template #auto>
        <KeenCard title="产品图片" style="margin-bottom: 0 !important">
          <div class="text-center">
            <KeenImageUpload
              v-model="form.productImageUrl"
              directory="product/group"
              tooltip="更改产品图片"
              disabled
            />
          </div>
        </KeenCard>
        <KeenCard title="产品类型" style="margin-bottom: 0 !important">
          <el-form-item prop="brandCode" label-width="0">
            <span>{{ form?.brandCode }}</span>
          </el-form-item>
        </KeenCard>
        <KeenCard title="产品经理">
          <el-form-item prop="developLuteName" label-width="0">
            <span>{{ form?.developLuteName }}</span>
          </el-form-item>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <div class="mw-800px px-7">
                <el-form-item label="产品分类：" prop="categoryName">
                  <span>{{ categoryName ? categoryName.join(' / ') : '' }}</span>
                </el-form-item>
                <el-form-item label="产品SPU：" prop="groupProductSpu">
                  <span>{{ form?.groupProductSpu }}</span>
                </el-form-item>
                <el-form-item label="产品中文名：" prop="name">{{ form.name }}</el-form-item>
                <el-form-item label="产品英文名：" prop="nameEn">
                  {{ form?.nameEn }}
                </el-form-item>
                <el-form-item label="建议销售价：">
                  <div class="w-100 d-flex gap-2">
                    <span>{{ form?.suggestSellPrice }}</span>
                    <span class="text-gray-600">{{ form?.suggestPriceCurrencyCode }}</span>
                  </div>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </template>
    </KeenFlex>
    <KeenCard title="组合SKU信息">
      <div class="px-10">
        <el-table :data="form.groupSkuList">
          <el-table-column label="组合信息">
            <template #default="scope">
              <el-form-item v-if="Array.isArray(scope.row.skuList)" label-width="0">
                <el-row class="w-100" v-for="(item, index) in scope.row.skuList" :key="index">
                  <el-col :span="16">
                    <span>{{ item?.skuCode }}</span>
                  </el-col>
                  <el-col :span="8">
                    <div>{{ item?.qty }}</div>
                  </el-col>
                </el-row>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="组合产品SKU">
            <template #default="scope">
              <el-form-item label-width="0" class="pe-6">
                <span>{{ scope.row?.groupSkuCode }}</span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="SKU名称">
            <template #default="scope">
              <div class="pe-6 mw-550px">
                <el-form-item label-width="0">
                  {{ scope.row.name }}
                </el-form-item>
                <el-form-item label-width="0">
                  {{ scope.row.nameEn }}
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="组合SKU图片">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageUrl"
                  directory="product/group"
                  :size="skuImageSize"
                  disabled
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="建议销售价">
            <template #default="scope">
              <div class="w-100 d-flex gap-2">
                <span>{{ scope.row.suggestPrice }}</span>
                <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </KeenCard>
    <KeenCard title="其他信息">
      <el-form label-width="150" class="mw-600px px-7" label-position="left">
        <el-form-item label="品牌：">
          <span>{{ form?.brandName }}</span>
        </el-form-item>
        <el-form-item label="系列：">
          <span v-for="(item, index) in form.seriesCodeList" :key="item">
            <span class="me-3">
              {{ seriesOptions?.find((x) => x.seriesCode === item)?.seriesName }}
            </span>
            <span class="me-3" v-if="index !== form.seriesCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <el-form-item label="型号：">
          <span v-for="(item, index) in form.modelCodeList" :key="item">
            <span>
              {{ modelOptions?.find((x) => x.modelCode === item)?.modelName }}
            </span>
            <span class="me-3" v-if="index !== form.modelCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <el-form-item label="产品标签：">
          <span v-for="(item, index) in form.tagCodeList" :key="item">
            <span class="me-3">
              {{ tagOptions?.find((x) => x.tagCode === item)?.tagName }}
            </span>
            <span class="me-3" v-if="index !== form.tagCodeList.length - 1">,</span>
          </span>
        </el-form-item>
      </el-form>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="productgroupDetail">
import { productApi } from '@/api';
  import { ProductGroupDetailResp } from '@/api/product/data-contracts';

  const route = useRoute();
  const query = route.query || {};
  const tabCurrent = ref<boolean>(0);

  const offsetWidth = ref<number>(document.body.offsetWidth);
  window.onresize = () => {
    return (() => {
      offsetWidth.value = document.body.offsetWidth;
    })();
  };

  const skuImageSize = computed(() => {
    return offsetWidth.value > 975 ? offsetWidth.value / 20 : offsetWidth.value / 15;
  });

  const labelPosition = computed(() => {
    return offsetWidth.value > 1250 ? 'left' : 'top';
  });

  const form = reactive<ProductGroupDetailResp>({
    /** 品牌编码 */
    brandCode: '',
    /** 品牌名称 */
    brandName: '',
    /** 产品经理ID */
    developLuteId: '',
    /** 产品经理 */
    developLuteName: '',
    /** 组合产品SPU */
    groupProductSpu: '',
    /** 组合SKU信息 */
    groupSkuList: [],
    /**
     * 组合SPU ID
     * @format int64
     */
    id: '',
    /** 型号信息 */
    modelCodeList: [],
    /** 产品名称 */
    name: '',
    /** 产品名称英文 */
    nameEn: '',
    /** 分类信息 */
    productCategory: '',
    /** 产品图片 */
    productImageUrl: '',
    /** 系列信息 */
    seriesCodeList: [],
    /** 建议销售价币种编码 */
    suggestPriceCurrencyCode: '',
    /** 建议销售价格 */
    suggestSellPrice: '',
    /** 产品标签 */
    tagCodeList: [],
    /**
     * 产品类型
     * @format int32
     */
    type: '',
    /** 产品类型名称 */
    typeDesc: '',
  });

  const categoryName = reactive<string[]>([]);
  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductGroupQueryGroupDetail({
      groupProductSpu: code,
    });
    Object.keys(form).forEach((key) => {
      form[key] = res[key] ?? form[key];
    });
    let parent = res?.productCategory;
    for (let i = 1; i <= 5; i += 1) {
      categoryName.push(parent?.categoryName);
      parent = parent?.productCategory;
    }
  };

  getDetailInfo(query.code);

  // 获取其他信息options
  const brandOptions = ref([]);
  const modelOptions = ref([]);
  const seriesOptions = ref([]);
  const tagOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
    seriesOptions.value = res.seriesBeanList;
    tagOptions.value = res.tagBeanList;
  };
  getProductRelationList();
</script>

<style scoped lang="scss"></style>
