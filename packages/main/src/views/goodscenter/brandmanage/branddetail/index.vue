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
                      <h2>品牌：{{ brandName }}</h2>
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
                      <el-form-item label="品牌名称：" prop="brandName">
                        <el-input v-model="form.brandName" />
                      </el-form-item>
                      <el-form-item label="英文名称：">
                        <el-input v-model="form.brandNameEn" />
                      </el-form-item>
                      <el-form-item label="品牌logo：" prop="brandLogo">
                        <el-upload
                          ref="upload"
                          class="avatar-uploader"
                          :show-file-list="false"
                          :action="addressOss"
                          :data="dataOss"
                          :auto-upload="false"
                          limit="1"
                          :on-exceed="handleExceed"
                          :on-change="fileChange"
                          :on-remove="fileRemove"
                          :on-success="handleSuccess"
                          :on-error="handleError"
                          accept=".pdf,.png,.jpeg,.bmp,.jpg"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                      <el-form-item label="描述：">
                        <el-input
                          type="textarea"
                          v-model="form.brandDesc"
                          maxlength="50"
                          placeholder="请输入描述(50字以内)"
                        />
                      </el-form-item>
                      <el-form-item label="关联产品：">
                        <el-button type="primary" size="small" @click="handleBindGoods">
                          选择产品
                        </el-button>

                        <el-table :data="form.productBeanList" row-key="productSpu" class="py-4">
                          <el-table-column label="产品信息" min-width="200">
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
            <!--            <el-button @click="goBack">取消</el-button>
            <el-button type="primary" :loading="brandSaveLoading" @click="handleSaveSubmit">保存</el-button>-->
            <!-- <LuteButton text="取消" type="secondary" @click="handleCancel" />
            <LuteButton
              text="保存"
              type="primary"
              wait-text="保存中"
              :loading="brandSaveLoading"
              @click="handleSaveSubmit"
            /> -->
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" :loading="brandSaveLoading" @click="handleSaveSubmit">
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

<script setup lang="ts" name="branddetail">
  import { ElMessage, ElForm, ElFormItem, UploadUserFile } from 'element-plus';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules, UploadRawFile } from 'element-plus';
  import LuteButton from '@/packages/button';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import { platformApi, ProductApi, productApi, ProductContracts } from '@/api';
  import { ProductBean } from '@/api/product/data-contracts';
  import { Plus } from '@element-plus/icons-vue';
  import * as swal from '@/utils/swal';

  // 表单定义
  const imageUrl = ref('');
  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductContracts.BrandBean & { productBeanList: ProductContracts.ProductBean[] }
  >({
    brandCode: '',
    /** 品牌简码 */
    brandCodeAli: '',
    /** 品牌描述 */
    brandDesc: '',
    /** 品牌logo */
    brandLogo: '',
    /** 品牌名称 */
    brandName: '',
    /** 英文名称 */
    brandNameEn: '',
    /**
     * 产品数量
     * @format int64
     */
    brandProductCount: 0,
    productBeanList: [],
  });

  const route = useRoute();

  const code = decryptByBase64(route.query.code as string);
  const { brandName } = route.query;
  const searchInfo = sessionStorage.getItem('brandSearchInfo') ?? '{}';

  // 品牌详情
  const { data: detailInfo, refresh } = useRequest(productApi.luteosProductBrandQueryBrandDetail, {
    defaultParams: [
      {
        brandCode: code!,
      },
    ],
  });

  const oldLogo = ref();
  watchEffect(() => {
    const brand = detailInfo.value;
    if (brand?.brandBean) {
      const { brandBean } = brand;
      form.brandCode = brandBean.brandCode;
      form.brandName = brandBean.brandName;
      form.brandNameEn = brandBean.brandNameEn;
      form.brandDesc = brandBean.brandDesc;
      form.brandLogo = brandBean.brandLogo;
      oldLogo.value = brandBean.brandLogo;
      if (brandBean.brandLogo) {
        imageUrl.value = brandBean.brandLogo;
      }
    }
    if (brand?.productBeanList) {
      const { productBeanList } = brand;
      form.productBeanList = productBeanList;
    }
  });

  const rules = reactive<FormRules>({
    brandName: [
      {
        required: true,
        message: '请填写品牌名称',
        trigger: ['blur', 'change'],
      },
    ],
    brandLogo: [
      {
        required: true,
        message: '请选择品牌logo',
        trigger: 'change',
      },
    ],
  });

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'brandlist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  const upload = ref();
  const addressOss = ref<string>('');
  const dataOss = reactive({});
  const ossKey = ref<string>('');

  // 品牌信息变更
  const brandSaveLoading = ref(false);
  const handleSaveSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      if (form.brandLogo === oldLogo.value) {
        await toSave(false);
        return;
      }
      try {
        brandSaveLoading.value = true;
        const res = await platformApi.platformOssQueryOssTempPolicy({
          directory: 'product/brand',
          filename: form.brandLogo.name,
        });
        addressOss.value = res.host || '';
        ossKey.value = res.key || '';
        dataOss.key = res.key || '';
        dataOss.policy = res.policy || '';
        dataOss.signature = res.signature || '';
        dataOss.ossAccessKeyId = res.ossAccessKeyId || '';
        upload.value.submit();
      } catch (e) {
        brandSaveLoading.value = false;
      }
    }
  };
  // 图片上传成功
  const handleSuccess = async () => {
    await toSave(true);
  };
  // 调保存接口
  const toSave = async (isLogoChange = false) => {
    try {
      const { brandCode, brandName, brandNameEn, brandDesc } = form;
      const params = {
        brandCode,
        brandName,
        brandNameEn,
        brandDesc,
      };
      const productSpuList = [];
      if (isLogoChange) params.brandLogo = ossKey.value;
      if (form.productBeanList && form.productBeanList.length > 0) {
        form.productBeanList.forEach((item) => {
          productSpuList.push(item.productSpu);
        });
        params.productSpuList = productSpuList;
      }

      await productApi.luteosProductBrandSaveOrUpdateBrand(params);

      // FIXME 修改交互
      ElMessage.success({
        message: '保存成功',
        duration: 5 * 1000,
      });
    } catch (e) {
      // do nothing
    } finally {
      brandSaveLoading.value = false;
    }
  };
  // 图片上传失败
  const handleError = (res) => {
    console.log('handleError', res);
    ElMessage.error({
      message: '图片上传失败',
      duration: 5 * 1000,
    });
    brandSaveLoading.value = false;
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
  const fileChange = (file) => {
    if (file) {
      form.brandLogo = file;
      imageUrl.value = URL.createObjectURL(file.raw!);
      formRef.value.validateField('brandLogo');
    }
  };

  const handleExceed = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    upload.value!.handleStart(file);
  };
  const fileRemove = () => {
    form.brandLogo = '';
    imageUrl.value = '';
    formRef.value.validateField('brandLogo');
  };

  // 取消操作
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/brandlist');
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('brandSearchInfo')) sessionStorage.removeItem('brandSearchInfo');
  });
</script>

<style lang="scss" scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 6px;
    border: 1px dashed var(--el-border-color);
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color) !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .avatar:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
