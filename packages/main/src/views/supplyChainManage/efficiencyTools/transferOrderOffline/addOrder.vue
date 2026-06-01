<template>
  <el-form ref="formRef" :model="form" :rules="formRules" label-width="150" scroll-to-error>
    <KeenCard title="基本信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="调出仓库" prop="warehouseCode">
            <warehouseSelect
              placeholder="调出仓库"
              v-model="form.warehouseCode"
              :options="outWarehouseMap"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入仓库" prop="arrivalWarehouseCode">
            <warehouseSelect
              placeholder="调入仓库"
              v-model="form.arrivalWarehouseCode"
              :options="inWarehouseMap"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物流方式" prop="shippingMethod">
            <el-select
              v-model="transport"
              value-key="id"
              placeholder="请选择物流方式"
              clearable
              filterable
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="1"
              @change="
                (val) => {
                  form.shippingMethod = val?.transportName || '';
                  volumeWeightCoefficient = val.volumeWeightCoefficient;
                }
              "
            >
              <el-option
                v-for="item in logisticsTransportList"
                :key="item.id"
                :label="item.transportName"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预计出库日期" prop="executorDate">
            <el-date-picker
              v-model="form.executorDate"
              type="date"
              placeholder="请选择预计出库日期"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :disabled-date="disabledExecutorDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计出运日期" prop="expectShipmentDate">
            <el-date-picker
              v-model="form.expectShipmentDate"
              type="date"
              placeholder="请选择预计出运日期"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :disabled-date="disabledShipmentDate"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计抵达日期" prop="deliveryDate">
            <el-date-picker
              v-model="form.deliveryDate"
              type="date"
              placeholder="请选择预计出运日期"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :disabled-date="disabledArrivaldDate"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="附件">
            <KeenFileUpload
              accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
              class="packing-upload"
              directory="oms/transfer/attachment"
              ref="uploadRef"
              :sizeLimit="104857600"
              v-model="fileList"
              :limit="20"
            >
              <el-button icon="plus" type="primary" size="small" />
            </KeenFileUpload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" :rows="4" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品明细">
      <el-row style="margin-bottom: 10px">
        <el-button
          type="primary"
          @click="handleBindGoods"
          class="choose-sku"
          :disabled="disabledAddSku"
        >
          添加产品
        </el-button>
      </el-row>
      <el-table :data="productList" border style="width: 100%" max-height="400">
        <el-table-column type="index" width="50" fixed="left" label="序号" align="center" />
        <el-table-column label="图片" width="80" align="center">
          <template #default="{ row }">
            <el-image
              v-if="row.productImageUrl"
              :src="row.productImageUrl"
              style="width: 50px; height: 50px"
              fit="cover"
              :preview-src-list="[row.productImageUrl]"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称/产品SKU" min-width="150">
          <template #default="{ row }">
            <div>
              <div style="font-weight: bold">{{ row.productTitle }} / {{ row.skuCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="supplySku" label="供应链SKU" width="120" />
        <el-table-column prop="productTypeDesc" label="产品类型" width="100" />
        <el-table-column prop="declareNameEn" label="英文报关名" min-width="120" />
        <el-table-column prop="availableInventory" label="可调拨量" width="100" align="right">
          <template #default="{ row }">
            <div>
              <div style="font-weight: bold">{{ row.availableInventory || 0 }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cartonNum" label="单箱数量" width="120" align="right">
          <template #default="{ row }">
            <el-input-number
              v-model="row.cartonNum"
              :min="1"
              :step="1"
              :precision="0"
              :controls="false"
              style="width: 100%"
            />
          </template>
        </el-table-column>
        <el-table-column label="调拨箱数" width="100" align="right">
          <template #default="{ row }">
            <div style="font-weight: bold">
              {{ row.cartonNum > 0 ? ((row.quantity || 0) / row.cartonNum).toFixed(0) : '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="调拨数量" width="120" align="right">
          <template #default="{ row }">
            <el-input-number
              v-model="row.quantity"
              :min="1"
              :step="1"
              :precision="0"
              :controls="false"
              style="width: 100%"
              @change="(value) => handleQuantityChange(value, row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="volumeM3" label="体积m³" width="100" align="right">
          <template #default="{ row }">
            {{ calcTotal(row).volume }}
            <!-- {{ calculateVolume(row.productLength, row.productWidth, row.productHeight) }} -->
          </template>
        </el-table-column>
        <el-table-column prop="actualWeightKg" label="实物重kg" width="100" align="right">
          <template #default="{ row }">
            <span>{{ row.productWeight || '-' }} KG</span>
          </template>
        </el-table-column>
        <el-table-column prop="volumeWeightKg" label="体积重kg" width="100" align="right">
          <template #default="{ row }">
            {{ calcTotal(row).volumeWeight }}
            <!-- {{ calculateVolumeWeight(calculateVolume(row.productLength, row.productWidth, row.productHeight) }} -->
          </template>
        </el-table-column>
        <el-table-column label="总体积m³" width="100" align="right">
          <template #default="{ row }">
            {{ calcTotal(row).totalVolume }}
            <!-- {{
              calculateTotalVolume(
                row.productLength,
                row.productWidth,
                row.productHeight,
                row.quantity
              )
            }} -->
          </template>
        </el-table-column>
        <el-table-column label="总实物重kg" width="100" align="right">
          <template #default="{ row }">
            {{ calcTotal(row).totalWeight }}
            <!-- {{ calculateTotalVolumeWeight(row.productWeight, row.quantity) }} -->
          </template>
        </el-table-column>
        <el-table-column label="总体积重kg" width="100" align="right">
          <template #default="{ row }">
            {{ calcTotal(row).totalVolumeWeight }}
            <!-- {{
              calculateTotalVolumeWeightByCoefficient(
                calculateVolumeWeight(
                  calculateVolume(row.productLength, row.productWidth, row.productHeight)
                ),
                row.quantity
              )
            }} -->
          </template>
        </el-table-column>
        <el-table-column prop="boxWeightKg" label="单箱重量kg" width="120" align="right">
          <template #default="{ row }">
            <span>{{ row.cartonWeight || '-' }} KG</span>
          </template>
        </el-table-column>
        <el-table-column prop="boxSizeCm" label="外箱尺寸cm" width="200" align="right">
          <template #default="{ row }">
            <el-space>
              <span>{{ row?.cartonLength || '-' }} cm</span>
              *
              <span>{{ row?.cartonWidth || '-' }} cm</span>
              *
              <span>{{ row?.cartonHeight || '-' }} cm</span>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="明细备注" min-width="150">
          <template #default="{ row }">
            <el-input
              v-model="row.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注"
              maxlength="500"
              show-word-limit
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              link
              icon="Delete"
              :disabled="productList.length <= 1"
              @click="handleDeleteProduct($index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <div class="add-order-footer">
      <el-button
        type="primary"
        @click="handleSubmit"
        class="choose-sku"
        :disabled="productList.length < 1"
      >
        提交
      </el-button>
    </div>
  </el-form>
  <SkuDialog
    v-if="bindGoodsVisible"
    :warehouse-code="form.warehouseCode"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productList"
    confirm-text="确认"
    type="sku"
  />
</template>

<script lang="ts" setup name="transferOrderOfflineAdd">
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import type { UploadUserFile } from 'element-plus';
  import { omsApi, OmsApi } from '@/api';
  import { useTabs } from '@/hooks/tabs';
  import router from '@/router';
  import { useTransOrderOptions } from './hooks/useTransOrderOptions';
  import {
    calculateVolume,
    calculateVolumeWeight,
    calculateTotalVolume,
    calculateTotalVolumeWeight,
    calculateTotalVolumeWeightByCoefficient,
  } from './utils';
  import SkuDialog from './components/skuDialog.vue';
  import warehouseSelect from './components/warehouseSelect.vue';

  interface addFomrItemList {
    supplySku?: string;
    skuCode?: string;
    productTitle?: string;
    productImageUrl?: string | null;
    productTitleEn?: string;
    productType?: number;
    productTypeDesc?: string;
    productStatus?: number;
    productWeight?: number;
    productLength?: number;
    productWidth?: number;
    productHeight?: number;
    cartonNum?: number | null;
    cartonLength?: number;
    cartonWidth?: number | null;
    cartonHeight?: number | null;
    declareName?: string;
    declareNameEn?: string;
    availableInventory?: number | null;
  }
  // 文件类型定义
  type UploadFileType = UploadUserFile & {
    ossKey?: string;
  };

  // 附件项类型定义
  interface AttachmentItem {
    fileName: string;
    fileUrl: string;
  }
  // 最终提交对象的结构
  interface addOmsformType
    extends Omit<
      OmsApi.OmsTransferSave.RequestBody,
      'warehouseCode' | 'arrivalWarehouseCode' | 'itemList'
    > {
    warehouseCode: string;
    arrivalWarehouseCode: string[] | string;
    itemList: addFomrItemList[];
  }
  const transport = ref();
  const fileList = ref<UploadFileType[]>([]);
  const formRef = ref<any>(null);
  // 产品明细数据
  const productList = ref<any[]>([]);
  // 体积系数
  const volumeWeightCoefficient = ref(1);
  const { closeTabAndRefresh } = useTabs();
  const form = ref<addOmsformType>({
    warehouseCode: '',
    arrivalWarehouseCode: [],
    shippingMethod: '',
    executorDate: '',
    expectShipmentDate: '',
    remark: '',
    itemList: [],
    attachmentList: [],
  });
  // 监听到仓库切换就立马清空数据，需要用户重新选择
  watch(
    () => form.value.warehouseCode,
    (newv, oldv) => {
      if (!oldv || oldv === newv) return;
      form.value.itemList = [];
      productList.value = [];
    }
  );
  // 自定义验证器：出运日期验证
  const validateShipmentDate = (_rule: any, value: string, callback: any) => {
    if (!value || !form.value.executorDate) {
      callback();
      return;
    }
    const shipmentDate = new Date(value).getTime();
    const executorDate = new Date(form.value.executorDate).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // 出运日期必须 >= 出库日期 - 1天
    if (shipmentDate < executorDate - oneDayInMs) {
      callback(new Error('预计出运日期不能早于预计出库日期的前一天'));
    } else {
      callback();
    }
  };
  // 自定义验证器：抵达日期验证
  const validateArrivalDate = (_rule: any, value: string, callback: any) => {
    if (!value || !form.value.expectShipmentDate) {
      callback();
      return;
    }
    const shipmentDate = new Date(value).getTime();
    const executorDate = new Date(form.value.expectShipmentDate).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // 出运日期必须 >= 出库日期 - 1天
    if (shipmentDate < executorDate - oneDayInMs) {
      callback(new Error('预计抵达日期不能早于预计出运日期的前一天'));
    } else {
      callback();
    }
  };
  // 表单验证规则
  const formRules = {
    warehouseCode: [{ required: true, message: '调出仓库字段不能为空', trigger: 'change' }],
    arrivalWarehouseCode: [{ required: true, message: '调入仓库字段不能为空', trigger: 'change' }],
    shippingMethod: [{ required: true, message: '物流方式字段不能为空', trigger: 'change' }],
    executorDate: [{ required: true, message: '请选择预计出库日期', trigger: 'blur' }],
    expectShipmentDate: [
      { required: true, message: '请选择预计出运日期', trigger: 'blur' },
      { validator: validateShipmentDate, trigger: 'blur' },
    ],
    deliveryDate: [
      { required: true, message: '请选择预计抵达日期', trigger: 'blur' },
      { validator: validateArrivalDate, trigger: 'blur' },
    ],
  };
  // 只有在选中了调出仓的情况下才允许点击添加商品
  const disabledAddSku = computed(() => {
    return !form.value.warehouseCode;
  });
  const { inWarehouseMap, outWarehouseMap, logisticsTransportList } = useTransOrderOptions();
  // ===================== 以下是箱子相关逻辑 =====================
  const calcTotal = (row) => {
    const volume = calculateVolume(row.productLength, row.productWidth, row.productHeight);
    const volumeWeight = calculateVolumeWeight(volume, volumeWeightCoefficient.value);
    const totalVolume = calculateTotalVolume(
      row.productLength,
      row.productWidth,
      row.productHeight,
      row.quantity
    );
    const totalWeight = calculateTotalVolumeWeight(row.productWeight, row.quantity);
    const totalVolumeWeight = calculateTotalVolumeWeightByCoefficient(volumeWeight, row.quantity);

    return {
      volume,
      volumeWeight,
      totalVolume,
      totalWeight,
      totalVolumeWeight,
    };
  };

  // /**
  //  * 计算体积重kg
  //  * @param weight 实物重kg
  //  * @returns 体积重，保留2位小数
  //  */
  // const calculateVolumeWeight = (weight: number | null | undefined | string): string => {
  //   // 边界处理：如果实物重无效，返回 '-'
  //   const validWeight = Number(weight) || 0;
  //   const coefficient = volumeWeightCoefficient.value || 1;
  //   if (validWeight === 0) {
  //     return '-';
  //   }
  //   // 体积重 = 实物重 / 体积系数
  //   const volumeWeight = validWeight / coefficient;
  //   return `${volumeWeight.toFixed(2)} KG`;
  // };

  // /**
  //  * 计算总实物重
  //  * @param weight 实物重kg
  //  * @param quantity 调拨数量
  //  * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
  //  * @returns 总体积重，保留2位小数
  //  */
  // const calculateTotalVolumeWeight = (
  //   weight: number | null | undefined,
  //   quantity: number | null | undefined,
  //   forSubmit = false
  // ): string | number => {
  //   // 边界处理：如果任一参数无效，返回 '-' 或 0
  //   const validWeight = Number(weight) || 0;
  //   const validQuantity = Number(quantity) || 0;

  //   if (validWeight === 0 || validQuantity === 0) {
  //     return forSubmit ? 0 : '-';
  //   }

  //   const total = validWeight * validQuantity;
  //   return forSubmit ? Number(total.toFixed(2)) : `${total.toFixed(2)} KG`;
  // };

  // /**
  //  * 计算总体积m³
  //  * @param length 产品长度
  //  * @param width 产品宽度
  //  * @param height 产品高度
  //  * @param quantity 调拨数量
  //  * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
  //  * @returns 总体积，保留4位小数
  //  */
  // const calculateTotalVolume = (
  //   length: number | null | undefined,
  //   width: number | null | undefined,
  //   height: number | null | undefined,
  //   quantity: number | null | undefined,
  //   forSubmit = false
  // ): string | number => {
  //   // 边界处理：如果任一参数无效，返回 '-' 或 0
  //   const validLength = Number(length) || 0;
  //   const validWidth = Number(width) || 0;
  //   const validHeight = Number(height) || 0;
  //   const validQuantity = Number(quantity) || 0;

  //   if (validLength === 0 || validWidth === 0 || validHeight === 0 || validQuantity === 0) {
  //     return forSubmit ? 0 : '-';
  //   }

  //   // 计算单个产品体积（假设尺寸单位是cm，转换为m³）
  //   const singleVolume = (validLength * validWidth * validHeight) / 1000000;
  //   const totalVolume = singleVolume * validQuantity;
  //   return forSubmit ? Number(totalVolume.toFixed(4)) : totalVolume.toFixed(4);
  // };

  // /**
  //  * 计算总体积重
  //  * @param weight 实物重kg
  //  * @param quantity 调拨数量
  //  * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
  //  * @returns 总体积重，保留2位小数
  //  */
  // const calculateTotalVolumeWeightByCoefficient = (
  //   weight: number | null | undefined | string,
  //   quantity: number | null | undefined,
  //   forSubmit = false
  // ): string | number => {
  //   // 边界处理：如果任一参数无效，返回 '-' 或 0
  //   const validWeight = Number(weight) || 0;
  //   const validQuantity = Number(quantity) || 0;
  //   const coefficient = volumeWeightCoefficient.value || 1;
  //   if (validWeight === 0 || validQuantity === 0 || coefficient === 0) {
  //     return forSubmit ? 0 : '-';
  //   }
  //   // 单个产品的体积重 = 实物重 / 体积系数
  //   const singleVolumeWeight = validWeight / coefficient;
  //   const totalVolumeWeight = singleVolumeWeight * validQuantity;
  //   return forSubmit ? Number(totalVolumeWeight.toFixed(2)) : `${totalVolumeWeight.toFixed(2)} KG`;
  // };
  // ===================== 其余逻辑 =====================
  /**
   * 处理调拨数量变化的校验
   * @param value 输入的调拨数量
   * @param row 当前行数据
   */
  const handleQuantityChange = (value: number | null | undefined, row: any) => {
    // 确保是正整数
    if (value !== null && value !== undefined) {
      // 如果不是正整数，清空并提示
      if (!Number.isInteger(value) || value <= 0) {
        row.quantity = null;
        ElMessage.warning('调拨数量必须为正整数');
        return;
      }
      // 检查是否超过可调拨量
      const availableInventory = Number(row.availableInventory) || 0;
      if (value > availableInventory) {
        row.quantity = null;
        ElMessage.warning(`调拨数量不能大于可调拨量（${availableInventory}）`);
      }
    }
  };
  // 预计出库日期不能晚于当前时间
  const disabledExecutorDate = (time: Date) => {
    const nowDate = new Date().setHours(23, 59, 59, 999);
    return time.getTime() < nowDate;
  };
  // 禁用预计出运日期早于预计出库日期的日期（允许提前一天）
  const disabledShipmentDate = (time: Date) => {
    const nowDate = new Date().setHours(23, 59, 59, 999);
    if (time.getTime() < nowDate) {
      return true;
    }
    if (!form.value.executorDate) {
      return false;
    }
    // 计算出库日期的前一天
    const executorDate = new Date(form.value.executorDate);
    const oneDayBefore = new Date(executorDate.getTime() - 24 * 60 * 60 * 1000);
    // 禁用早于（出库日期-1天）的所有日期
    return time.getTime() < oneDayBefore.getTime();
  };
  // 禁用预计抵达日期，必须晚于预计出运日期（允许提前一天）
  const disabledArrivaldDate = (time: Date) => {
    const nowDate = new Date().setHours(23, 59, 59, 999);
    if (time.getTime() < nowDate) {
      return true;
    }
    if (!form.value.expectShipmentDate) return false;
    const executorDate = new Date(form.value.expectShipmentDate);
    const oneDayBefore = new Date(executorDate.getTime() - 24 * 60 * 60 * 1000);

    return time.getTime() < oneDayBefore.getTime();
  };
  /**
   * 转换附件列表格式
   * @param files 上传组件的文件列表
   * @returns 符合接口要求的附件列表
   * @description 将上传组件的文件数据转换为接口所需的 { fileName, fileUrl } 格式
   */
  const transformAttachmentList = (files: UploadFileType[]): AttachmentItem[] => {
    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }

    return files
      .filter((file) => file?.name && file?.ossKey) // 过滤无效数据
      .map((file) => ({
        fileName: file.name!,
        fileUrl: file.ossKey!, // ossKey 作为文件唯一标识，后端可根据此获取完整URL
      }));
  };

  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  /**
   * 用户关闭产品对话框事件
   * @param _reload 是否用户点击了同意
   * @param val 产品列表
   */
  const handleBindGoodsClose = (_reload = false, val) => {
    if (_reload) {
      // 使用中转变量同步选择的产品数据
      const selectedProducts = val || [];
      productList.value = selectedProducts;
    }
    bindGoodsVisible.value = false;
  };

  // 删除产品
  const handleDeleteProduct = (index: number) => {
    productList.value.splice(index, 1);
  };
  // 校验箱子格式,找出未有调拨量的产品并抛出错误
  const boxParamsCheck = (): boolean => {
    if (!productList.value || productList.value.length === 0) return false;
    const unValidBoxList: string[] = [];
    productList.value.forEach((item, index) => {
      const { quantity } = item;
      const { cartonNum } = item;
      if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
        unValidBoxList.push(`（序号${index + 1})产品未有调拨量`);
      }
      if (!cartonNum || cartonNum <= 0 || !Number.isInteger(cartonNum)) {
        unValidBoxList.push(`(序号${index + 1})产品未有单箱数量`);
      }
    });
    if (unValidBoxList.length > 0) {
      ElMessage({
        type: 'warning',
        message: h(
          'div',
          unValidBoxList.map((t, i) => [i ? h('br') : null, t])
        ),
        duration: 5000,
      });
      return false;
    }
    return true;
  };
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (saveLoading.value) return;
    // 等待表单验证完成

    const valid = await formRef.value?.validate().catch(() => false);
    if (!valid) return;
    // 业务逻辑校验：出库时间不能晚于出运时间
    if (form.value.executorDate && form.value.expectShipmentDate) {
      const executorDate = new Date(form.value.executorDate).getTime();
      const shipmentDate = new Date(form.value.expectShipmentDate).getTime();
      if (executorDate > shipmentDate) {
        ElMessage.error('预计出运日期不能早于预计出库日期，请重新选择');
        return;
      }
    }
    if (form.value.expectShipmentDate && form.value.deliveryDate) {
      const executorDate = new Date(form.value.expectShipmentDate).getTime();
      const shipmentDate = new Date(form.value.deliveryDate).getTime();
      if (executorDate > shipmentDate) {
        ElMessage.error('预计抵达日期不能早于预计出运日期，请重新选择');
        return;
      }
    }
    if (!boxParamsCheck()) {
      return;
    }
    try {
      saveLoading.value = true;
      // 深拷贝 form 对象
      const formData: any = cloneDeep(form.value);
      // 处理仓库代码，如果是数组则转换为逗号分隔的字符串
      if (Array.isArray(formData.warehouseCode)) {
        formData.warehouseCode = formData.warehouseCode.join(',');
      }
      if (Array.isArray(formData.arrivalWarehouseCode)) {
        formData.arrivalWarehouseCode = formData.arrivalWarehouseCode.join(',');
      }
      // 转换附件列表格式
      formData.attachmentList = transformAttachmentList(fileList.value);
      // 直接从 productList 转换数据，确保使用最新的编辑数据
      if (productList.value.length > 0) {
        formData.itemList = productList.value.map((item) => {
          return {
            availableQuantity: item.availableInventory || 0,
            cartonNum: item.cartonNum || 1,
            declareNameEn: item.declareNameEn || '',
            productImageUrl: item.productImageUrl || item.productImage || '',
            productName: item.productTitle || '',
            quantity: item.quantity || 0,
            remark: item.remark || '',
            skuCode: item.skuCode || '',
            supplySku: item.supplySku || item.productSku || '',
            cartonHeight: item.cartonHeight || 0,
            cartonLength: item.cartonLength || 0,
            cartonWidth: item.cartonWidth || 0,
            cartonWeight: item.cartonWeight || 0,
            volumeTotal: calculateTotalVolume(
              item.productLength,
              item.productWidth,
              item.productHeight,
              item.quantity,
              true
            ),
            volumeWeightTotal: calculateTotalVolumeWeightByCoefficient(
              item.productWeight,
              item.quantity,
              volumeWeightCoefficient.value
            ),
            weightTotal: calculateTotalVolumeWeight(item.productWeight, item.quantity, true),
          };
        });
      }
      const res = await omsApi.omsTransferSave(formData);
      closeTabAndRefresh('transferOrderOfflineAdd');
      router.push({ name: 'transferOrderOffline' });
    } catch (error) {
      console.error('请求失败:', error);
    } finally {
      saveLoading.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .add-order-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
