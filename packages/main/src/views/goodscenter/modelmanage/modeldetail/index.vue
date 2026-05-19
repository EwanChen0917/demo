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
                      <h2>型号：{{ modelName }}</h2>
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
                      <el-form-item label="型号名称：" prop="modelName">
                        <el-input v-model="form.modelName" />
                      </el-form-item>
                      <el-form-item label="描述：">
                        <el-input
                          type="textarea"
                          v-model="form.modelRemark"
                          maxlength="50"
                          placeholder="请输入描述(50字以内)"
                        />
                      </el-form-item>
                      <el-form-item label="关联产品：">
                        <div class="pb-3">
                          <el-button type="primary" size="small" @click="handleBindGoods">
                            选择产品
                          </el-button>
                        </div>

                        <el-table :data="form.productBeanList" row-key="productSpu">
                          <el-table-column label="产品信息">
                            <template #default="scope">
                              <div class="d-flex align-items-center">
                                <el-avatar
                                  shape="square"
                                  :size="50"
                                  fit="cover"
                                  :src="scope.row.productImage"
                                />
                                <div class="ms-5">
                                  <span class="text-gray-800 fs-5 fw-bold">
                                    {{ scope.row.name }}
                                  </span>
                                </div>
                              </div>
                            </template>
                          </el-table-column>
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
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end pe-4">
            <!-- <LuteButton text="取消" type="secondary" @click="handleCancel" />
            <LuteButton
              text="保存"
              type="primary"
              wait-text="保存中"
              :loading="modelSaveLoading"
              @click="handleSaveSubmit"
            /> -->
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="modelSaveLoading" @click="handleSaveSubmit">
              保存
            </el-button>
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
</template>

<script setup lang="ts" name="modeldetail">
  import { ElMessage, ElForm, ElFormItem } from 'element-plus';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules } from 'element-plus';

  import LuteButton from '@/packages/button';

  import { ProductApi, productApi, ProductContracts } from '@/api';
  import { ProductBean } from '@/api/product/data-contracts';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import * as swal from '@/utils/swal';

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductContracts.ModelBean & { productBeanList: ProductContracts.ProductBean[] }
  >({
    modelCode: '',
    /** 型号描述 */
    modelRemark: '',
    /** 型号名称 */
    modelName: '',
    /** 产品数量 */
    productCount: 0,
    productBeanList: [],
  });

  const route = useRoute();

  const code = decryptByBase64(route.query.code as string);
  const { modelName } = route.query;
  const searchInfo = sessionStorage.getItem('modelSearchInfo') ?? '{}';

  // 型号详情
  const { data: detailInfo, refresh } = useRequest(productApi.luteosProductModelQueryModelDetail, {
    defaultParams: [
      {
        modelCode: code!,
      },
    ],
  });

  watchEffect(() => {
    const model = detailInfo.value;
    if (model?.modelBean) {
      const { modelBean } = model;
      form.modelCode = modelBean.modelCode;
      form.modelName = modelBean.modelName;
      form.modelRemark = modelBean.modelRemark;
    }
    if (model?.productBeanList) {
      const { productBeanList } = model;
      form.productBeanList = productBeanList;
    }
  });

  const rules = reactive<FormRules>({
    modelName: [
      {
        required: true,
        message: '请填写型号名称',
      },
    ],
  });

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'modellist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  // 型号信息变更
  const modelSaveLoading = ref(false);
  const handleSaveSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        modelSaveLoading.value = true;
        const { modelCode, modelName, modelRemark } = form;
        const params = {
          modelCode,
          modelName,
          modelRemark,
        };
        const productSpuList = [];
        if (form.productBeanList && form.productBeanList.length > 0) {
          form.productBeanList.forEach((item) => {
            productSpuList.push(item.productSpu);
          });
          params.productSpuList = productSpuList;
        }
        await productApi.luteosProductModelSaveOrUpdateModel(params);

        // FIXME 修改交互
        ElMessage.success({
          message: '保存成功',
          duration: 5 * 1000,
        });
      } catch (e) {
        // do nothing
      } finally {
        modelSaveLoading.value = false;
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

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.productBeanList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 取消操作
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/modellist');
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('modelSearchInfo')) sessionStorage.removeItem('modelSearchInfo');
  });
</script>

<style lang="scss" scoped>
  .bg_f9f9f9 {
    background-color: #f9f9f9;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  // :deep(.btn-primary){}

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
