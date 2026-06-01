<template>
  <el-dialog title="新增兑换商品" :model-value="visible" @close="$emit('close')">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      require-asterisk-position="right"
    >
      <el-form-item prop="productType" label="商品类型" required>
        <el-select v-model="form.productType" class="w-250px">
          <el-option :value="PointProductType.独立站商品" label="独立站商品" />
          <el-option :value="PointProductType.亚马逊商品券" label="亚马逊商品券" />
        </el-select>
      </el-form-item>
      <template v-if="form.productType === PointProductType.独立站商品">
        <el-form-item label="商品" prop="skuCode" required>
          <div class="d-flex align-items-center">
            <KeenImageUpload v-model="form.productImage" directory="station/product" disabled />
            <div class="ms-5">
              <div class="text-gray-800 fs-5 lh-base">{{ form.productName }}</div>
              <div class="text-gray-800 fs-5 lh-base">{{ form.skuCode }}</div>
              <div class="text-gray-800 fs-5 lh-base">
                {{ form.price }}
                <span v-if="form.price">USD</span>
              </div>
              <!-- <div class="text-gray-800 fs-7 mt-2">{{ form.productSpu }}</div> -->
              <el-button class="mt-2" type="primary" @click="handleBindGoods">选择商品</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动图" prop="productImageNew" required>
          <KeenImageUpload
            v-model="form.productImageNew"
            directory="station/activity"
            tooltip="选择活动图片"
          />
        </el-form-item>
        <el-form-item label="商品总数" prop="productCount" required>
          <el-input-number
            class="w-250px text-start-input-number"
            v-model="form.productCount"
            :precision="0"
            :controls="false"
            placeholder="请输入数字"
          />
        </el-form-item>
      </template>
      <template v-else-if="form.productType === PointProductType.亚马逊商品券">
        <el-form-item label="商品名称" prop="productName" required>
          <el-input class="w-250px" v-model="form.productName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品图片" prop="productImage" required>
          <KeenImageUpload
            v-model="form.productImage"
            directory="station/product"
            tooltip="选择商品图片"
          />
        </el-form-item>
        <el-form-item label="活动图" prop="productImageNew" required>
          <KeenImageUpload
            v-model="form.productImageNew"
            directory="station/activity"
            tooltip="选择活动图片"
          />
        </el-form-item>
        <el-form-item label="券码文件" required prop="ticketFileList">
          <div class="d-flex gap-7 gap-lg-10 w-100">
            <div class="flex-row-fluid">
              <KeenFileUpload v-model="form.ticketFileList" directory="station/amazon">
                <el-button type="primary">选择表格文件</el-button>
              </KeenFileUpload>
            </div>
            <div class="flex-row-auto w-100px" v-loading="tplLoading">
              <el-link :href="tplData?.templateUrl">文件模板</el-link>
            </div>
          </div>
        </el-form-item>
      </template>
      <el-form-item label="每个用户限制数量" prop="userLimitCount" required>
        <el-input-number
          class="w-250px text-start-input-number"
          v-model="form.userLimitCount"
          :precision="0"
          :controls="false"
          placeholder="请输入数字"
        />
      </el-form-item>
      <el-form-item label="兑换积分" prop="exchangePoint" required>
        <el-input-number
          class="w-250px text-start-input-number"
          v-model="form.exchangePoint"
          :precision="0"
          :controls="false"
          placeholder="请输入数字"
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
      <el-form-item label="状态" prop="status" required>
        <el-radio-group v-model="form.status" class="ml-4">
          <el-radio :label="PointProductStatus.开启">开启</el-radio>
          <el-radio :label="PointProductStatus.关闭">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!--  <BizProductPicker
      :picked-key="form.productSpu"
      :visible="productPickerVisible"
      @close="handleProductPickerClose"
    />-->

  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    confirm-text="确认"
    :select-one="true"
    type="shopify"
  />
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request';
  import { omit, pick } from 'lodash-es';
  import type { FormInstance, FormRules, FormItemInstance, UploadUserFile } from 'element-plus';

  import { pointApi, PointApi, commonApi, CommonApi, ProductContracts } from '@/api/index';
  import { PointProductStatus, PointProductType, PointProductLevel } from '@/types/api';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'windowClose'): void;
  }>();

  const router = useRouter();

  // 表单定义
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
    skuCode: [
      {
        required: true,
        message: '请选择商品',
      },
    ],
    productImage: [
      {
        required: true,
        message: '请上传商品图片',
        validator(_, val, callback) {
          if (!val) {
            if (form.productType === PointProductType.独立站商品) {
              return callback('请选择商品');
            }
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
        trigger: ['change'],
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
    ticketFileList: [
      {
        required: true,
        message: '请上传券码文件',
      },
      {
        type: 'array',
        min: 1,
        message: '请上传券码文件',
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
    exchangePoint: undefined,
    minLevel: PointProductLevel.无限制,
    productCode: '',
    productCount: undefined,
    productImage: '',
    productImageNew: '',
    productName: '',
    productSpu: '',
    skuCode: '',
    productType: PointProductType.独立站商品,
    status: PointProductStatus.关闭,
    ticketFileName: '',
    ticketFileUrl: '',
    ticketTempCode: '',
    productId: '',
    variantsId: '',
    price: '',
    userLimitCount: undefined,
    ticketFileList: [],
  });
  watch(
    () => form.productType,
    (val) => {
      form.productName = '';
      form.productImage = '';
      form.productImageNew = '';
      form.price = '';
      if (val === PointProductType.亚马逊商品券) {
        form.productSpu = '';
        form.skuCode = '';
        form.productId = '';
        form.variantsId = '';
      } else if (val === PointProductType.独立站商品) {
        form.productCount = 0;
        form.ticketFileName = '';
        form.ticketFileUrl = '';
        form.ticketTempCode = '';
        form.ticketFileList = [];
      }
    }
  );

  // 选择商品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      console.log(val);

      const {
        sku: skuCode,
        productSpu,
        title: productName,
        productId,
        variantsId,
        price,
        image: productImage,
      } = val;
      Object.assign(form, {
        skuCode,
        productSpu,
        productName,
        productId,
        variantsId,
        price,
        productImage,
      });
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };
  /* const handleBindGoodsClose = (product: ProductContracts.ProductBean) => {
productPickerVisible.value = false;

if (product) {
const { productSpu, name: productName, productImage } = product;
Object.assign(form, {
productSpu,
productName,
productImage,
});
}
}; */

  // 券码模板
  const {
    loading: tplLoading,
    data: tplData,
    run: queryTpl,
  } = useRequest(commonApi.luteosCommonFileQueryImportTemplate, {
    manual: true,
  });
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        queryTpl({ importScene: 'amazon_ticket' });
      }
    }
  );

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      const omitFields: string[] = ['productCode', 'ticketFileList'];
      if (form.productType === PointProductType.亚马逊商品券) {
        omitFields.push('productSpu');

        // 导入
        const [ticketFile] = form.ticketFileList;
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
      } else if (form.productType === PointProductType.独立站商品) {
        omitFields.push('ticketFileName', 'ticketFileUrl', 'ticketTempCode');
      }

      const res = await pointApi.luteosPointProductSavePointProduct(omit(form, omitFields));
      const isConfirmed = await swal.confirm({
        title: '兑换商品创建成功，是否去查看详情?',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (isConfirmed) {
        router.push(`/pointsgoodslist/detail?code=${res?.productCode}`);
      }

      emit('close', true);
      resetForm();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    emit('close');
    resetForm();
  };

  // 重置
  const resetForm = () => {
    formRef.value!.resetFields();

    Object.assign(form, {
      productSpu: '',
      skuCode: '',
      productName: '',
      productImage: '',
      productImageNew: '',
      ticketFileName: '',
      ticketFileUrl: '',
      ticketTempCode: '',
      variantsId: '',
      productId: '',
      ticketFileList: [],
    });
  };
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
</style>
