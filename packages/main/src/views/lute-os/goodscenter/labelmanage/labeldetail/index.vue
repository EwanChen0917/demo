<template>
  <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
    <div
      class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework h-100 bg_f9f9f9"
    >
      <div class="form d-flex flex-column flex-lg-row w-md-100">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div class="tab-content">
            <div class="tab-pane fade show active">
              <div class="d-flex flex-column gap-7 gap-lg-10">
                <div class="card card-flush py-4">
                  <div class="card-header" style="align-items: center">
                    <div class="card-title">
                      <h2>标签：{{ tagName }} {{ form?.tagCode }}</h2>
                    </div>
                  </div>
                  <div class="card-body pt-0">
                    <el-form
                      :model="form"
                      :rules="rules"
                      ref="formRef"
                      label-width="100"
                      label-position="right"
                    >
                      <el-form-item label="标签名称：" prop="tagName">
                        <el-input v-model="form.tagName" />
                      </el-form-item>
                      <el-form-item label="描述：">
                        <el-input
                          type="textarea"
                          v-model="form.tagRemark"
                          maxlength="50"
                          placeholder="请输入描述(50字以内)"
                        />
                      </el-form-item>
                      <el-form-item label="关联分类：" v-if="isCategoryTag">
                        <el-button type="primary" size="small" @click="handleBindCategory">
                          选择分类
                        </el-button>

                        <el-table
                          :data="form.categoryLevelList"
                          row-key="categoryCode"
                          :tree-props="{
                            hasChildren: 'hasChildren',
                            children: 'null', // 设置不展示树结构
                          }"
                        >
                          <el-table-column prop="categoryName" label="分类名称" />
                          <el-table-column label="分类等级">
                            <template #default="scope">
                              <span>{{ LEVEL_NAMES[scope.row.level - 1] }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作">
                            <template #default="scope">
                              <KeenActions
                                :actions="[
                                  {
                                    label: '取消关联',
                                    key: 'del',
                                    type: 'danger',
                                    plain: true,
                                    index: scope.$index,
                                  },
                                ]"
                                @click="handleCategoryActions"
                              />
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>

                      <el-form-item label="关联产品：" v-else>
                        <el-button v-if="isSku" type="primary" size="small" @click="handleBindSku">
                          选择产品SKU
                        </el-button>
                        <el-button v-else type="primary" size="small" @click="handleBindGoods">
                          选择产品
                        </el-button>

                        <el-table :data="form.productBeanList" row-key="productSpu">
                          <el-table-column label="产品信息">
                            <template #default="{ row }">
                              <GoodsInfo :title="row.name" :src="row.productImage" />
                            </template>
                          </el-table-column>
                          <el-table-column prop="skuCode" label="SKU" v-if="isSku" />
                          <el-table-column prop="productSpu" label="SPU" />
                          <el-table-column prop="categoryLevel" label="分类" min-width="160" />
                          <el-table-column label="操作">
                            <template #default="scope">
                              <KeenActions
                                :actions="[
                                  {
                                    label: '取消关联',
                                    key: 'del',
                                    type: 'danger',
                                    plain: true,
                                    index: scope.$index,
                                  },
                                ]"
                                @click="handleActions"
                              />
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="card-footer d-flex justify-content-center py-6 px-9">
                    <el-space>
                      <el-button size="small" @click="goBack">取消</el-button>
                      <el-button
                        type="primary"
                        size="small"
                        @click="handleSaveSubmit"
                        :loading="tagSaveLoading"
                      >
                        保存
                      </el-button>
                    </el-space>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.productBeanList"
  />
  <BindSku
    v-if="bindSkuVisible"
    :visible="bindSkuVisible"
    :selected-rows="form.productBeanList"
    @close="handleSkuGoodsClose"
  />
  <BindCategory
    v-if="bindCategoryVisible"
    :visible="bindCategoryVisible"
    :tagCode="form?.tagCode"
    :selected-rows="form.categoryLevelList"
    @close="handleBindCategoryClose"
  />
</template>

<script setup lang="ts" name="labeldetail">
  import { ElMessage, ElForm, ElFormItem } from 'element-plus';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules } from 'element-plus';

  import { ProductApi, productApi, ProductContracts } from '@/api';
  import { ProductBean } from '@/api/product/data-contracts';
  import BindGoods from '@/views/lute-os/goodscenter/bindGoods/Modal/bindGoods.vue';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';
  import BindCategory from './Modal/bindCategory.vue';

  // 常量
  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductContracts.TagBean & { productBeanList: ProductContracts.ProductBean[] }
  >({
    tagCode: '',
    /** 标签描述 */
    tagRemark: '',
    /** 标签名称 */
    tagName: '',
    /** 产品数量 */
    productCount: 0,
    /** 产品类型 */
    tagType: '',
    productBeanList: [],
    categoryLevelList: [],
  });

  const route = useRoute();

  const code = decryptByBase64(route.query.code as string);
  const { tagName } = route.query;

  // 标签详情
  const { data: detailInfo, refresh } = useRequest(productApi.luteosProductTagQueryTagDetail, {
    defaultParams: [
      {
        tagCode: code!,
      },
    ],
  });

  watchEffect(() => {
    const tag = detailInfo.value;
    if (tag?.tagBean) {
      const { tagBean } = tag;
      form.tagCode = tagBean.tagCode;
      form.tagName = tagBean.tagName;
      form.tagRemark = tagBean.tagRemark;
      form.tagType = tagBean.tagType;
    }
    if (tag?.productBeanList) {
      const { productBeanList } = tag;
      form.productBeanList = productBeanList;
    }
    if (tag?.categoryLevelList) {
      const { categoryLevelList } = tag;
      form.categoryLevelList = categoryLevelList;
    }
  });

  const isSku = computed(() => {
    return form.tagType === 'sku';
  });

  const isCategoryTag = computed(() => {
    return form.tagType === 'category';
  });

  const rules = reactive<FormRules>({
    tagName: [
      {
        required: true,
        message: '填写标签名称',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'labellist',
    });
  };

  // 标签信息变更
  const tagSaveLoading = ref(false);
  const handleSaveSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        tagSaveLoading.value = true;
        const { tagCode, tagName, tagRemark, tagType } = form;
        const params = {
          tagCode,
          tagName,
          tagRemark,
          tagType,
        };
        const itemCodeList = [];
        if (form.productBeanList && form.productBeanList.length > 0) {
          form.productBeanList.forEach((item) => {
            itemCodeList.push(isSku.value ? item.skuCode : item.productSpu);
          });
          params.itemCodeList = itemCodeList;
        }

        if (form.categoryLevelList?.length) {
          form.categoryLevelList.forEach((item) => {
            itemCodeList.push(item.categoryCode);
          });
          params.itemCodeList = itemCodeList;
        }
        await productApi.luteosProductTagSaveOrUpdateTag(params);

        // FIXME 修改交互
        ElMessage.success({
          message: '保存成功',
          duration: 5 * 1000,
        });
      } catch (e) {
        // do nothing
      } finally {
        tagSaveLoading.value = false;
      }
    }
  };

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.unbindConfirm();
      if (!isConfirmed) return;
      form.productBeanList.splice(index, 1);
    }
  };

  const handleCategoryActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.unbindConfirm();
      if (!isConfirmed) return;
      form.categoryLevelList.splice(index, 1);
    }
  };

  // 选择产品
  const bindGoodsVisible = ref(false);
  const bindSkuVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  const handleBindSku = () => {
    bindSkuVisible.value = true;
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.productBeanList = val;
    }
    bindGoodsVisible.value = false;
  };
  const handleSkuGoodsClose = async (reload = false, val) => {
    console.log('val', val);
    if (reload) {
      form.productBeanList = val?.map((item) => {
        return {
          ...item,
          categoryLevel: item.categoryLevel || item.categoryNames,
          name: item.name || item.productTitle,
          productImage: item.productImage || item.productImageUrl,
        };
      });
    }
    bindSkuVisible.value = false;
  };
  const bindCategoryVisible = ref(false);
  const handleBindCategory = () => {
    bindCategoryVisible.value = true;
  };

  const handleBindCategoryClose = (reload, list) => {
    bindCategoryVisible.value = false;
    if (reload) {
      form.categoryLevelList = list;
    }
  };
</script>

<style lang="scss" scoped>
  .bg_f9f9f9 {
    background-color: #f9f9f9;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .common_status {
    width: 100px;
    padding: 10px 0;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;

    .scale_txt {
      font-size: 1.1rem !important;
    }
  }

  .ele_page_form {
    ::v-deep(.el-form-item .el-form-item__label) {
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--bs-gray-800);
    }

    ::v-deep(.el-form-item) {
      margin-bottom: 2.5rem;
    }

    ::v-deep(.el-input__inner) {
      color: #5e6278 !important;
    }

    ::v-deep(.el-form-item__error) {
      width: 100%;
      margin-top: 0.5rem;
      font-size: 0.95rem;
      font-weight: 400;
      color: #b02a37;
      letter-spacing: 1px;
    }
  }

  .ele_input {
    ::v-deep(.el-input__wrapper) {
      border-color: var(--bs-gray-100);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
      display: inline-flex;
      width: 100%;
      padding: 0.715rem 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.5;
      color: var(--bs-gray-700);
      background-color: #f9f9f9;
      background-clip: padding-box;
      border: 1px solid var(--bs-gray-300);
      appearance: none;
      border-radius: 0.475rem;
      height: auto;
      box-shadow: none;
    }

    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
    }
  }
</style>
