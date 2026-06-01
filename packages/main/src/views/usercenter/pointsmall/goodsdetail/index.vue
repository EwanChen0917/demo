<template>
  <el-form
    ref="formRef"
    :rules="rules"
    require-asterisk-position="right"
    :model="form"
    label-position="left"
    label-width="150px"
    scroll-to-error
  >
    <KeenFlex>
      <KeenFlex>
        <template #auto>
          <div class="card card-flush py-4" v-loading="productLoading">
            <div class="card-header">
              <div class="card-title">
                <h2>商品信息</h2>
              </div>
            </div>
            <div class="card-body text-center pt-0">
              <KeenImageUpload
                v-model="form.productImage"
                directory="station/product"
                tooltip="更改商品图片"
                :disabled="form.productType === PointProductType.独立站商品"
              />
              <template v-if="form.productType === PointProductType.独立站商品">
                <div class="text-gray-800 fs-5">{{ form.productName }}</div>
                <div class="text-gray-800 fs-5">{{ form.skuCode }}</div>
                <div class="text-gray-800 fs-5">
                  {{ form.price }}
                  <span v-if="form.price">USD</span>
                </div>
                <!-- <div class="text-gray-800 fs-7 mt-2">{{ form.productSpu }}</div> -->
              </template>
            </div>
          </div>
          <div class="card card-flush py-4" v-loading="productLoading">
            <div class="card-header">
              <div class="card-title">
                <h2>状态</h2>
              </div>
              <div class="card-toolbar">
                <div
                  class="rounded-circle w-15px h-15px"
                  :class="[form.status ? 'bg-success' : 'bg-light']"
                ></div>
              </div>
            </div>
            <div class="card-body pt-0">
              <el-select v-model="form.status" class="w-100">
                <el-option :value="PointProductStatus.开启" label="开启" />
                <el-option :value="PointProductStatus.关闭" label="关闭" />
              </el-select>
            </div>
          </div>
        </template>
        <template #fluid>
          <div class="card card-flush py-4" v-loading="productLoading">
            <div class="card-header">
              <div class="card-title"><h2>兑换规则</h2></div>
            </div>
            <div class="card-body pt-0 px-20">
              <el-form-item label="商品类型" prop="productType" required>
                <span class="fw-semibold text-muted">{{ PointProductType[form.productType] }}</span>
              </el-form-item>
              <el-form-item label="活动图" prop="productImageNew" required>
                <KeenImageUpload
                  v-model="form.productImageNew"
                  directory="station/activity"
                  tooltip="选择活动图片"
                />
              </el-form-item>
              <template v-if="form.productType === PointProductType.独立站商品">
                <el-form-item label="商品总数" prop="productCount" required>
                  <el-input-number
                    class="w-250px text-start-input-number"
                    v-model="form.productCount"
                    :precision="0"
                    :controls="false"
                    placeholder="请输入整数值"
                  />
                </el-form-item>
              </template>
              <template v-else-if="form.productType === PointProductType.亚马逊商品券">
                <el-form-item label="商品名称" prop="productName" required>
                  <el-input v-model="form.productName" placeholder="请输入商品名称" />
                </el-form-item>
                <el-form-item label="券码文件">
                  <div class="d-flex gap-7 gap-lg-10 w-100">
                    <div class="flex-row-auto w-250px">
                      <a
                        @click="handleExportAmazonTicket"
                        v-loading="exportLoading"
                        class="cursor-pointer ticket-file-name"
                      >
                        <el-tooltip effect="light" content="点击导出" placement="bottom-end">
                          <span>{{ form.ticketFileName }}</span>
                        </el-tooltip>
                      </a>
                    </div>
                    <div class="flex-row-fluid">
                      <KeenFileUpload v-model="form.ticketFileList" directory="station/amazon">
                        <el-button type="primary" @click="handleTicketUpload">重新上传</el-button>
                      </KeenFileUpload>
                    </div>
                  </div>
                </el-form-item>
              </template>
              <el-form-item label="剩余数量">
                <span class="fw-semibold text-muted">{{ productData?.remainCount }}</span>
              </el-form-item>
              <el-form-item label="每个用户限制数量" prop="userLimitCount" required>
                <el-input-number
                  class="w-250px text-start-input-number"
                  v-model="form.userLimitCount"
                  :precision="0"
                  :controls="false"
                  placeholder="请输入整数值"
                />
              </el-form-item>
              <el-form-item label="兑换积分" prop="exchangePoint" required>
                <el-input-number
                  class="w-250px text-start-input-number"
                  v-model="form.exchangePoint"
                  :precision="0"
                  :controls="false"
                  placeholder="请输入整数值"
                />
              </el-form-item>
              <el-form-item label="等级要求" prop="minLevel" required>
                <el-select v-model="form.minLevel" class="w-250px">
                  <el-option :value="PointProductLevel.无限制" label="无等级要求" />
                  <el-option :value="PointProductLevel.铜牌" label="铜牌会员以上" />
                  <el-option :value="PointProductLevel.银牌" label="银牌会员以上" />
                  <el-option :value="PointProductLevel.金牌" label="金牌会员以上" />
                  <el-option :value="PointProductLevel.铂金" label="铂金会员以上" />
                  <el-option :value="PointProductLevel.钻石" label="钻石会员以上" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </template>
      </KeenFlex>
      <UserDetails
        :product-code="code"
        :product-type="form.productType"
        @total-changed="handleUserCountChange"
      />
      <div class="d-flex flex-row justify-content-end">
        <el-button @click="handleCancel" text>取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </div>
    </KeenFlex>
  </el-form>
</template>

<script lang="ts" setup name="pointsgoodsdetail">
  import { useRequest } from 'vue-request';
  import { omit, pick } from 'lodash-es';
  import type { FormInstance, FormRules, UploadUserFile } from 'element-plus';

  import useExport from '@/hooks/list/useExport';
  import * as swal from '@/utils/swal';
  import { pointApi, PointApi, commonApi, CommonApi } from '@/api/index';
  import { PointProductStatus, PointProductType, PointProductLevel } from '@/types/api';

  import UserDetails from './components/userDetails.vue';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;

  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    status: [
      {
        required: true,
        message: '请选择任务状态',
      },
    ],
    productType: [
      {
        required: true,
        message: '请选择商品类型',
      },
    ],
    productName: [
      {
        required: true,
        message: '请输入商品名称',
      },
      {
        max: 255,
        message: '商品名称长度不能超过255',
      },
    ],
    productImage: [
      {
        required: true,
        message: '请上传商品图片',
        validator(_, val, callback) {
          if (!val) {
            if (form.productType === PointProductType.亚马逊商品券) {
              return callback('请上传商品图片');
            }
          }
          return true;
        },
      },
    ],
    productImageNew: [
      {
        required: true,
        message: '请上传活动图片',
      },
    ],

    productCount: [
      {
        required: true,
        message: '请输入商品总数',
      },
      {
        type: 'integer',
        min: 0,
        message: '商品总数不能小于0',
      },
      {
        type: 'integer',
        max: 9999999,
        message: '商品总数不能大于9999999',
      },
    ],
    userLimitCount: [
      {
        required: true,
        message: '请输入每个用户限制数量',
      },
      {
        type: 'integer',
        min: 0,
        message: '每个用户限制数量不能小于0',
      },
      {
        type: 'integer',
        max: 9999999,
        message: '每个用户限制数量不能大于9999999',
      },
    ],
    exchangePoint: [
      {
        required: true,
        message: '请输入兑换积分',
      },
      {
        type: 'integer',
        min: 0,
        message: '兑换积分不能小于0',
      },
      {
        type: 'integer',
        max: 9999999,
        message: '兑换积分不能大于9999999',
      },
    ],
    minLevel: [
      {
        required: true,
        message: '请选择等级要求',
      },
    ],
  });
  const form = reactive<
    PointApi.LuteosPointProductSavePointProduct.RequestBody & {
      ticketFileList: (UploadUserFile & { ossKey?: string })[];
    }
  >({
    exchangePoint: 0,
    minLevel: 0,
    productCode: '',
    skuCode: '',
    productCount: 0,
    productImage: '',
    productImageNew: '',
    productName: '',
    productSpu: '',
    productType: PointProductType.独立站商品,
    status: PointProductStatus.关闭,
    ticketFileName: '',
    ticketFileUrl: '',
    ticketTempCode: '',
    userLimitCount: 1,
    ticketFileList: [],
    price: '',
    productId: '',
    variantsId: '',
  });
  const {
    loading: productLoading,
    data: productData,
    refresh: refreshProduct,
  } = useRequest(pointApi.luteosPointProductQueryPointProductDetail, {
    defaultParams: [
      {
        pointProductCode: code,
      },
    ],
  });
  watchEffect(() => {
    const product = productData.value;
    if (product?.productCode) {
      Object.assign(
        form,
        pick(product, [
          'productCode',
          'productName',
          'productSpu',
          'skuCode',
          'productImage',
          'productImageNew',
          'status',
          'productType',
          'productCount',
          'userLimitCount',
          'exchangePoint',
          'minLevel',
          'ticketFileName',
        ])
      );
    }
  });
  const handleUserCountChange = (val: number) => {
    // form.remainCount = form.productCount - val;
  };

  // 导出券码
  const { handleExport, exportLoading } = useExport(
    pointApi.luteosPointTicketExportUserTicketCode,
    {
      preventConfirm: true,
    }
  );
  const handleExportAmazonTicket = async () => {
    handleExport({
      pageNum: 1,
      pageSize: 50,
      productCode: form.productCode!,
    });
  };

  // 重新上传
  const ticketUploadConfirmed = ref(false);
  const handleTicketUpload = async (e: Event) => {
    if (!ticketUploadConfirmed.value) {
      e.stopPropagation();
      const btnEl = e.currentTarget as HTMLButtonElement;
      const confirmed = await swal.confirm(
        '若重新上传券码，上传成功后将以最新券码文件为准！原文件内未兑换的券码将不再发放，请确认是否重新上传'
      );
      if (!confirmed) return;
      ticketUploadConfirmed.value = true;
      btnEl?.click();
      return;
    }

    ticketUploadConfirmed.value = false;
  };
  watch(
    () => form.ticketFileList[0]?.ossKey,
    async () => {
      const ticketFile = form.ticketFileList[0];
      if (ticketFile?.ossKey) {
        try {
          const importRes = await commonApi.luteosCommonFileImportData({
            fileName: ticketFile.name,
            importScene: 'amazon_ticket',
            key: ticketFile.ossKey,
          });
          if (importRes?.failedCount) {
            swal.error('券码导入失败，请重新上传券码表格');
            form.ticketFileList = [];
            return;
          }

          form.ticketFileName = ticketFile.name;
          form.ticketFileUrl = ticketFile.ossKey;
          form.ticketTempCode = importRes?.recordCode;
          form.productCount = importRes?.succeededCount ?? 0;
        } catch (e) {
          // do nothing
        } finally {
          saveLoading.value = false;
        }
      } else {
        const product = productData.value;
        Object.assign(form, pick(product, ['productCount', 'ticketFileName']), {
          ticketFileUrl: '',
          ticketTempCode: '',
        });
      }
    }
  );

  // 返回
  const goBack = () => {
    router.push('/pointsgoodslist');
  };

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      const omitFields: string[] = ['ticketFileList'];
      if (form.productType === PointProductType.亚马逊商品券) {
        omitFields.push('productSpu');
        // 未重新上传图片
        if (form.productImage?.startsWith('http')) {
          omitFields.push('productImage');
        }
        // 未重新上传券码文件
        if (!form.ticketTempCode) {
          omitFields.push('ticketFileName', 'ticketFileUrl', 'ticketTempCode', 'productCount');
        }
      } else if (form.productType === PointProductType.独立站商品) {
        omitFields.push(
          // 'productSpu',
          // 'productName',
          'productImage',
          'ticketFileName',
          'ticketFileUrl',
          'ticketTempCode'
        );
      }
      await pointApi.luteosPointProductSavePointProduct(omit(form, omitFields));

      swal.success('保存成功');

      resetForm();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    resetForm();
  };

  const resetForm = () => {
    Object.assign(form, {
      ticketFileName: '',
      ticketFileUrl: '',
      ticketTempCode: '',
      ticketFileList: [],
    });

    refreshProduct();
  };
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }

  .ticket-file-name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
