<template>
  <el-form
    ref="formDocumentsRef"
    :style="{
      marginBottom: '24px',
    }"
    :model="formDocuments"
    label-position="top"
    require-asterisk-position="right"
    scroll-to-error
    v-if="Number(status) > 200 || mode === 'detail'"
  >
    <CustomCard :loading="loading" title="关联单据信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="展销会单号">
            <span>{{ formDocuments?.exhibitionOrderInfoaddBean?.exhibitionCode || '-' }}</span>
            <Copy
              v-if="formDocuments?.exhibitionOrderInfoaddBean?.exhibitionCode"
              :content="formDocuments.exhibitionOrderInfoaddBean.exhibitionCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="OA申请单号">
            <span>{{ formDocuments?.exhibitionOrderInfoaddBean?.oaCode || '-' }}</span>
            <Copy
              v-if="formDocuments?.exhibitionOrderInfoaddBean?.oaCode"
              :content="formDocuments.exhibitionOrderInfoaddBean.oaCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="B2B订单号" label-width="120">
            <template v-if="mode === 'detail'">
              <span>
                {{ formDocuments?.exhibitionOrderInfoaddBean?.b2bOrderCode || '-' }}
              </span>
              <Copy
                v-if="formDocuments?.exhibitionOrderInfoaddBean?.b2bOrderCode"
                :content="formDocuments.exhibitionOrderInfoaddBean.b2bOrderCode"
              />
            </template>
            <el-input
              v-model="formDocuments.exhibitionOrderInfoaddBean.b2bOrderCode"
              placeholder="多张订单号，用逗号隔开"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="调拨单号"
            prop="exhibitionOrderInfoaddBean.transferOrderCode"
            :rules="[{ required: true, message: '请输入调拨单号', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail'">
              {{ formDocuments?.exhibitionOrderInfoaddBean?.transferOrderCode || '-' }}
            </span>
            <el-input
              v-model="formDocuments.exhibitionOrderInfoaddBean.transferOrderCode"
              placeholder="多张订单号，用逗号隔开"
              :maxlength="300"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海外仓入库单号">
            <span v-if="mode === 'detail'">
              {{ formDocuments?.exhibitionOrderInfoaddBean?.inboundCode || '-' }}
            </span>
            <el-input
              v-model="formDocuments.exhibitionOrderInfoaddBean.inboundCode"
              placeholder="多张订单号，用逗号隔开"
              :maxlength="300"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="海外仓出库单号">
            <span v-if="mode === 'detail'">
              {{ formDocuments?.exhibitionOrderInfoaddBean?.outboundCode || '-' }}
            </span>
            <el-input
              v-model="formDocuments.exhibitionOrderInfoaddBean.outboundCode"
              placeholder="多张订单号，用逗号隔开"
              :maxlength="300"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="其他单号">
            <span v-if="mode === 'detail'">
              {{ formDocuments?.exhibitionOrderInfoaddBean?.otherOrderCode || '-' }}
            </span>
            <el-input
              v-model="formDocuments.exhibitionOrderInfoaddBean.otherOrderCode"
              placeholder="多张订单号，用逗号隔开"
              :maxlength="300"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
  </el-form>
  <el-form
    ref="formRef"
    class="add-form"
    :model="form"
    label-position="top"
    require-asterisk-position="right"
    scroll-to-error
  >
    <CustomCard :loading="loading" title="申请信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item
            prop="approvalInfo.applicator"
            label="展销会申请人"
            :rules="[{ required: true, message: '请选择展销会申请人', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.approvalInfo?.applicatorName || '-' }}
            </span>
            <DeptMember
              v-model="form.approvalInfo.applicator"
              teleported
              placeholder="展销会申请人"
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="展会时间"
            prop="approvalInfo.exhibitionStartDate"
            :rules="[
              { required: true, message: '请选择展会开始日期和结束日期', trigger: 'change' },
            ]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.approvalInfo?.exhibitionStartDate || '-' }}~{{
                form?.approvalInfo?.exhibitionEndDate || '-'
              }}
            </span>
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="-"
              start-placeholder="展会开始日期"
              end-placeholder="展会结束日期"
              value-format="YYYY-MM-DD"
              @change="changeTime"
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="参展人员出国时间" label-width="220">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.approvalInfo?.abroadDate || '-' }}
            </span>
            <el-date-picker
              v-model="form.approvalInfo.abroadDate"
              type="date"
              :disabled-date="
                (date) =>
                  ableStartTime
                    ? dayjs(date).isAfter(dayjs(ableEndTime))
                    : dayjs(date).isBefore(Date.now(), 'date') // 禁止选择过去的日期
              "
              placeholder="请选择时间"
              value-format="YYYY-MM-DD"
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="申请说明"
            prop="approvalInfo.purpose"
            :rules="[{ required: true, message: '请输入申请说明', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.approvalInfo?.purpose || '-' }}
            </span>
            <el-input
              v-model="form.approvalInfo.purpose"
              placeholder="请简要描述您的申请原因/展会说明"
              :rows="2"
              type="textarea"
              :maxlength="300"
              show-word-limit
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.approvalInfo?.remark || '-' }}
            </span>
            <el-input
              v-model="form.approvalInfo.remark"
              placeholder="填写发货流程及时效说明"
              :rows="2"
              type="textarea"
              :maxlength="300"
              show-word-limit
              clearable
              v-else
            />
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="收货信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item
            label="收件人"
            prop="receiveInfo.receiverName"
            :rules="[{ required: true, message: '请输入收件人', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.receiverName || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.receiverName" :maxlength="50" clearable v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.phone || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.phone" clearable :maxlength="64" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.mobile || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.mobile" clearable :maxlength="64" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="邮箱"
            prop="receiveInfo.email"
            :rules="[
              {
                required: false,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '请输入符合标准邮箱格式',
                trigger: 'blur',
              },
            ]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.email || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.email" :maxlength="50" clearable v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮编">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.postalCode || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.postalCode" :maxlength="50" clearable v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="国家/地区"
            prop="receiveInfo.country"
            :rules="[
              {
                required: true,
                message: '请选择国家/地区',
                trigger: ['change', 'blur'],
              },
            ]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.country || '-' }}
            </span>
            <CountrySelect
              placeholder="请选择"
              teleported
              v-model="form.receiveInfo.country"
              @change="handleCountryChange"
              v-else
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="省/州">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.province || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.province" clearable :maxlength="200" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="城市"
            prop="receiveInfo.city"
            :rules="[{ required: true, message: '请输入城市', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.city || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.city" clearable :maxlength="200" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区/县">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.district || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.district" clearable :maxlength="200" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="街道">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.street || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.street" clearable :maxlength="300" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门牌">
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.houseNumber || '-' }}
            </span>
            <el-input v-model="form.receiveInfo.houseNumber" clearable :maxlength="50" v-else />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="详细地址"
            prop="receiveInfo.detailedAddress"
            :rules="[{ required: true, message: '请输入详细地址', trigger: 'change' }]"
          >
            <span v-if="mode === 'detail' || mode === 'associated'">
              {{ form?.receiveInfo?.detailedAddress || '-' }}
            </span>
            <el-input
              v-model="form.receiveInfo.detailedAddress"
              clearable
              :maxlength="200"
              v-else
            />
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="产品信息">
      <div class="info-operation">
        <el-button
          :disabled="!form.receiveInfo.country"
          size="small"
          plain
          type="primary"
          @click="productDialogVisible = true"
          v-if="mode === 'add' || mode === 'edit'"
        >
          <template v-if="!form.receiveInfo.country">请先选择国家/地区</template>
          <template v-else>
            <el-icon class="Root-tyicon icon-Root-tyjia"></el-icon>
            <span>添加产品</span>
          </template>
        </el-button>
      </div>
      <el-table border :data="form?.itemList">
        <el-table-column type="index" label="序号" min-width="50" />
        <el-table-column label="产品名称" prop="productName" min-width="226" />
        <el-table-column label="供应链SKU" prop="productSku" min-width="250">
          <template #header>供应链SKU</template>
          <template #default="{ row, $index }">
            <el-form-item class="table-form-item" :prop="`itemList[${$index}].productSku`">
              <span>{{ row.productSku }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="qty" min-width="238">
          <template #header>
            数量
            <span class="text-danger">*</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              class="table-form-item"
              :prop="`itemList[${$index}].qty`"
              :rules="[{ required: true, message: '请填写数量', trigger: 'change' }]"
            >
              <div v-if="mode === 'add' || mode === 'edit'">
                <span v-if="!row.inventory">暂无库存</span>
                <NumberInput
                  v-else
                  v-model="row.qty"
                  :precision="0"
                  :min="1"
                  :max="row.inventory"
                  controls-position="right"
                />
              </div>
              <div v-else>
                {{ row.qty }}
              </div>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="60px"
          v-if="mode === 'add' || mode === 'edit'"
        >
          <template #default="{ row, $index }">
            <div>
              <el-link type="danger" @click="remove($index)" underline="never">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </CustomCard>
    <CustomCard :loading="loading" title="附件信息">
      <el-row>
        <el-form-item label="附件" v-if="mode === 'detail' || mode === 'associated'">
          <div class="w-100" v-for="item in form?.attachmentList" :key="item.key">
            <el-link
              type="primary"
              underline="never"
              @click="
                () => {
                  download(item?.url, item?.attachmentName);
                }
              "
            >
              {{ item?.attachmentName }}
            </el-link>
          </div>
        </el-form-item>
        <el-form-item label="" v-else>
          <KeenFileUpload
            accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
            class="packing-upload"
            directory="erp/order/attachment"
            ref="uploadRef"
            :sizeLimit="10 * 1024 * 1024"
            v-model="fileList"
            :limit="5"
          >
            <el-button plain type="primary" size="small">
              <el-icon class="Root-tyicon icon-Root-tyshangchuanwenjian"></el-icon>
              <span>添加附件</span>
            </el-button>
            <div v-if="fileList.length === 0" class="ms-5 text-gray-500">
              <span>支持上传图片/PDF/EXCEL/WORD文件</span>
            </div>
          </KeenFileUpload>
        </el-form-item>
      </el-row>
    </CustomCard>
  </el-form>
  <div
    class="card-footer d-flex justify-content-end py-6 px-9"
    v-if="mode !== 'detail' && !isDrawer"
  >
    <el-space>
      <el-button @click="cancel" text>取消</el-button>
      <el-button
        type="primary"
        :disabled="saveLoading"
        @click="save(false)"
        v-if="mode === 'add' || mode === 'edit'"
      >
        保存
      </el-button>
      <el-button
        type="primary"
        :loading="saveLoading"
        @click="save(true)"
        v-if="mode === 'add' || mode === 'edit'"
      >
        提交申请
      </el-button>
      <!-- 编辑关联单据 待调拨状态-->
      <el-button
        type="primary"
        :disabled="saveLoading"
        @click="saveDocuments(1)"
        v-if="status == '300'"
      >
        暂存
      </el-button>
      <el-button
        type="primary"
        :loading="saveLoading"
        @click="saveDocuments(2)"
        v-if="status == '300'"
      >
        已填完所有单据
      </el-button>
      <!-- 编辑关联单据 已完成状态-->
      <el-button
        type="primary"
        :loading="saveLoading"
        @click="saveDocuments(3)"
        v-if="status == '400'"
      >
        保存
      </el-button>
    </el-space>
  </div>
  <ProductDialog
    :country="form.receiveInfo.country"
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemList"
    confirm-text="确认"
    type="supplierSku"
    isRequisition
  />
</template>

<script setup lang="ts" name="requisitionAddApply">
  import { erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage, FormInstance } from 'element-plus';
  import type { ExhibitionOrderAddReq, ExhibitionOrderMappingReq } from '@/api/erp/data-contracts';
  import ProductDialog from '@/views/supplyChainManage/requisition/components/productDialog.vue';
  import { nextTick } from 'vue';
  import { download } from '@/utils/download';
  import dayjs from 'dayjs';

  interface Props {
    isDrawer?: boolean;
    mode?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    isDrawer: false,
    mode: 'add',
  });
  const route = useRoute();
  const router = useRouter();
  const fileList = ref([]);
  const time = ref<any>([]);
  const form = ref<Required<ExhibitionOrderAddReq>>({
    approvalInfo: {
      abroadDate: '',
      applicator: '',
      applicatorName: '',
      exhibitionEndDate: '',
      exhibitionStartDate: '',
      purpose: '',
      remark: '',
    },
    isPush: false,
    attachmentList: [
      // {
      //   attachmentName: '',
      //   key: '',
      //   url: '',
      // },
    ],
    // exhibitionOrderInfoaddBean: {
    // b2bOrderCode: '',
    // exhibitionCode: '',
    // inboundCode: '',
    // oaCode: '',
    // otherOrderCode: '',
    // outboundCode: '',
    // status: 0,
    // transferOrderCode: '',
    // },
    itemList: undefined,
    receiveInfo: {
      city: '',
      country: '',
      detailedAddress: '',
      district: '',
      email: '',
      houseNumber: '',
      mobile: '',
      phone: '',
      postalCode: '',
      province: '',
      receiverName: '',
      street: '',
    },
  });
  // ExhibitionOrderInfoAddBean
  const formDocuments = ref<Required<ExhibitionOrderMappingReq>>({
    actionType: 1, // 操作类型 1-暂存 2-完成所有单据 3-保存
    exhibitionOrderInfoaddBean: {
      b2bOrderCode: '',
      exhibitionCode: '',
      inboundCode: '',
      oaCode: '',
      otherOrderCode: '',
      outboundCode: '',
      transferOrderCode: '',
    },
  });
  const status = defineModel<any>(); // 展销会申请数据状态
  const ableStartTime = ref();
  const ableEndTime = ref();
  // 修改展会时间
  const changeTime = (dateArr) => {
    form.value.approvalInfo.exhibitionStartDate = dateArr ? dateArr[0] : '';
    form.value.approvalInfo.exhibitionEndDate = dateArr ? dateArr[1] : '';
    ableStartTime.value = dateArr ? dateArr[0] : '';
    ableEndTime.value = dateArr ? dateArr[1] : '';
    // 如果参展人员出国时间不在展会时间期间，清空字段
    const { abroadDate } = form.value.approvalInfo;
    if (
      abroadDate &&
      (dayjs(abroadDate).isBefore(dayjs(ableStartTime.value)) ||
        dayjs(abroadDate).isAfter(dayjs(ableEndTime.value)))
    ) {
      form.value.approvalInfo.abroadDate = '';
    }
  };

  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    if (selected) {
      const oldList = form.value.itemList;
      const newList = list.filter(Boolean).map((item: any) => {
        const same: any = oldList?.find((old: any) => {
          return old.productSku === item.productSku;
        });
        const obj = {
          productName: same ? same.productName : item.productTitle,
          inventory: item.inventory,
          qty: same ? same.qty : '',
          productSku: same ? same.productSku : item.productSku,
          skuCode: same ? same.skuCode : item.skuCode,
        };
        return obj;
      });
      form.value.itemList = newList;
      productDialogVisible.value = false;
    } else {
      productDialogVisible.value = false;
    }
  };
  const loading = ref(false);
  const queryDetail = async (code = route.query?.code as string) => {
    if (!code) return;
    loading.value = true;
    const res = await erpApi
      .luteosErpExhibitionQueryDetail({
        exhibitionCode: code as string,
      })
      .finally(() => {
        loading.value = false;
      });

    form.value.approvalInfo = {
      abroadDate: res?.approvalInfo?.abroadDate,
      applicator: res?.approvalInfo?.applicator,
      applicatorName: res?.approvalInfo?.applicatorName,
      exhibitionEndDate: res?.approvalInfo?.exhibitionEndDate,
      exhibitionStartDate: res?.approvalInfo?.exhibitionStartDate,
      purpose: res?.approvalInfo?.purpose,
      remark: res?.approvalInfo?.remark,
    };
    form.value.orderInfo = res?.orderInfo; // 存在则是编辑，无是新增
    time.value = [
      form.value.approvalInfo.exhibitionStartDate,
      form.value.approvalInfo.exhibitionEndDate,
    ];
    ableStartTime.value = time.value ? time.value[0] : '';
    ableEndTime.value = time.value ? time.value[1] : '';
    form.value.itemList = res?.itemList;
    form.value.itemList = form.value.itemList.map((item) => {
      item.inventory = 99999999;
      return item;
    });
    form.value.attachmentList = res?.attachmentList;
    fileList.value.length = 0;
    res.attachmentList?.forEach((item) => {
      fileList.value.push({
        percentage: 100,
        name: item?.attachmentName,
        ossKey: item?.key,
        status: 'success',
      });
    });
    form.value.receiveInfo = res?.receiveInfo;
    status.value = res?.orderInfo?.status;
    if (Number(status.value) > 200 || props.mode === 'detail') {
      formDocuments.value.exhibitionOrderInfoaddBean = res?.orderInfo;
    }
  };
  // nextTick(() => {
  //   queryDetail();
  // });
  const handleCountryChange = (val: string) => {
    form.value.itemList = [];
  };

  const saveLoading = ref(false);
  const formRef = ref<FormInstance>();
  const formDocumentsRef = ref<FormInstance>();

  // 新增，编辑
  const save = async (isSubmit = false) => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return false;
    try {
      saveLoading.value = true;
      if (fileList.value.length > 0) {
        form.value.attachmentList = fileList.value.map((item) => {
          return {
            key: item.ossKey,
            attachmentName: item.name,
          };
        });
      } else form.value.attachmentList = [];
      form.value.isPush = isSubmit; // 是否提交申请
      const res = await erpApi.luteosErpExhibitionSaveOrUpdate({ ...form.value });
      const text = isSubmit ? '提交成功' : '保存成功';
      ElMessage.success(text);
      if (!props.isDrawer) {
        router.go(-1);
      }
      return true;
    } finally {
      saveLoading.value = false;
    }
  };

  // 编辑关联单据
  const saveDocuments = async (isSubmit = 1) => {
    const valid = await formDocumentsRef.value?.validate();
    if (!valid) return false;
    try {
      saveLoading.value = true;
      formDocuments.value.actionType = isSubmit;

      const res = await erpApi.luteosErpExhibitionHandleMapping({ ...formDocuments.value });
      const text = isSubmit === 3 ? '保存成功' : '提交成功';
      ElMessage.success(text);
      if (!props.isDrawer) {
        router.go(-1);
      }
      return true;
    } finally {
      saveLoading.value = false;
    }
  };
  defineExpose({
    init: queryDetail,
    handleSave: save,
    handleSaveDocuments: saveDocuments,
  });
  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      router.go(-1);
    }
  };
  // 移除产品信息
  const remove = (index: number) => {
    form.value.itemList.splice(index, 1);
  };
</script>

<style scoped lang="scss">
  .add-form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
  :deep(.el-date-editor) {
    --el-date-editor-width: 100%;
  }
  .table-form-item {
    margin: 0;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
    }
  }
  .info-operation {
    margin-bottom: 12px;
  }

  .tips {
    color: #8492a6;
    font-size: 12px;
  }
</style>
