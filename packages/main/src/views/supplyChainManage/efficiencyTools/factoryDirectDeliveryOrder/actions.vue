<template>
  <el-form :model="form" ref="formRef" label-width="150px" :rules="rules">
    <KeenCard title="基础信息" position="start">
      <el-row v-if="!isAdd">
        <el-col :span="8">
          <el-form-item label="头程工厂直发工单号">
            <overflow-tooltip :content="form.code" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <span>{{ form.statusName }}</span>
            <!-- <el-select v-model="form.status" disabled>
              <el-option
                v-for="item in srmOrderStatusMap"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="提货供应商" prop="supplierCode">
            <SrmSupplier
              ref="srmSupplierRef"
              v-model="form.supplierCode"
              v-if="isAdd"
              @change="handleSupplierCodeChange"
            />
            <overflow-tooltip v-else :content="form.supplierName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货方式" prop="pickupMethod">
            <el-select
              v-model="form.pickupMethod"
              placeholder="请选择提货方式"
              filterable
              clearable
              v-if="isEdit"
            >
              <el-option
                v-for="item in deliveryTypeMap"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
            <span v-else>
              {{ deliveryTypeMap.find((item) => item.value === form.pickupMethod)?.label || '-' }}
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否需要出口退税" prop="exportTaxRebate">
            <el-select
              v-model="form.exportTaxRebate"
              placeholder="请选择是否需要出口退税"
              clearable
              v-if="isEdit"
            >
              <el-option
                v-for="item in isExportTaxMap"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
            <span v-else>
              {{ isExportTaxMap.find((item) => item.value === form.exportTaxRebate)?.label || '-' }}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否需要商检" prop="businessInspection">
            <el-select
              v-model="form.businessInspection"
              placeholder="请选择是否需要商检"
              clearable
              v-if="isEdit"
            >
              <el-option
                v-for="item in businessInspectionMap"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
            <span v-else>
              {{
                businessInspectionMap.find((item) => item.value === form.businessInspection)
                  ?.label || '-'
              }}
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货时间" prop="deliveryDate">
            <template v-if="isEdit">
              <el-date-picker
                v-model="form.deliveryDate"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabledMinutes="disabledMinutes"
                @change="handleTimeChange"
                class="b2bdate"
                style="width: 180px"
                clearable
                :teleported="true"
                :show-now="false"
                placeholder="请选择"
                :disabled="!isEdit"
              />
              <el-time-select
                class="timeSelect"
                v-model="form.deliveryTime"
                style="width: 70px"
                start="00:00"
                step="00:30"
                end="23:30"
                :clearable="false"
                placeholder="请选择时间"
                :disabled="!isEdit"
              />
            </template>
            <span v-else>{{ form.deliveryDate }} {{ form.deliveryTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货地址" prop="pickupAddress">
            <el-input
              v-model="form.pickupAddress"
              placeholder="请输入提货地址"
              clearable
              maxlength="200"
              show-word-limit
              word-limit-position="outside"
              type="textarea"
              v-if="isEdit"
            />
            <overflow-tooltip v-else :content="form.pickupAddress" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-if="mode === 'detail'">
          <el-form-item label="物流是否提货" prop="logisticsPickup">
            <template v-if="isEdit">
              <el-select
                v-model="form.logisticsPickup"
                placeholder="请选择物流是否提货"
                clearable
                :disabled="!isEdit"
              >
                <el-option label="是" value="Y" />
                <el-option label="否" value="N" />
              </el-select>
            </template>
            <span v-else>{{ form.logisticsPickup === 'Y' ? '是' : '否' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商联系人" prop="supplierContact">
            <el-input
              v-model="form.supplierContact"
              placeholder="请输入供应商联系人"
              clearable
              maxlength="200"
              show-word-limit
              type="textarea"
              word-limit-position="outside"
              rows="3"
              v-if="isEdit"
            />
            <overflow-tooltip v-else :content="form.supplierContact">
              {{ form.supplierContact }}
            </overflow-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商联系电话" prop="supplierContactPhone">
            <el-input
              v-model="form.supplierContactPhone"
              placeholder="请输入供应商联系电话"
              clearable
              maxlength="200"
              show-word-limit
              type="textarea"
              word-limit-position="outside"
              :rows="3"
              v-if="isEdit"
            />
            <overflow-tooltip v-else :content="form.supplierContactPhone" />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="SRM发货单">
      <el-button
        type="primary"
        @click="handleSelectSRMOrder"
        style="margin-bottom: 10px"
        :disabled="!isEdit || srmOrderDisabled"
      >
        选择SRM送货单
      </el-button>
      <SRMorderTable :data="form.directFactoryWorkOrderDeliveryList" />
    </KeenCard>
    <KeenCard title="积加调拨单">
      <el-form-item label="提货明细附件" required label-position="top">
        <div class="import-header">
          <KeenFileUpload
            :showOperate="false"
            class="packing-upload"
            directory="oms/directFactoryWork/transfer"
            accept=".xlsx,.xls"
            ref="uploadRef"
            v-model="form.attachmentList"
            :limit="1"
            style="width: 440px"
            @success="handleUploadSuccess"
            @change="handleUploadChange"
            :disabled="!isEdit && !isRelate"
          >
            <el-button size="default" style="margin-right: 10px" :disabled="!isEdit && !isRelate">
              <template #icon>
                <i class="iconfont icon-shangchuan1"></i>
              </template>
              <template #default>上传附件</template>
            </el-button>
            <template #file="{ file }">
              <div class="custom-file-item">
                <img :src="file.url" class="el-upload-list__item-thumbnail" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </span>
                </span>
              </div>
            </template>
          </KeenFileUpload>
          <el-button
            type="primary"
            class="downloadBtn"
            text
            @click="downloadTemplate"
            :loading="downloadLoading"
            v-if="props.mode !== 'detail'"
            :disabled="!isEdit"
          >
            <i class="iconfont icon-xiazai"></i>
            下载模板
          </el-button>
        </div>
        <div style="margin-top: 4px">
          <div class="w-100" v-for="item in form?.attachmentList" :key="item.id">
            <el-link
              type="primary"
              :underline="false"
              @click="
                () => {
                  download(item?.fileUrl, item?.fileName);
                }
              "
            >
              {{ item?.fileName }}
            </el-link>
          </div>
        </div>
        <div v-if="form.attachmentList.length === 0" class="uploadtip">
          <span>请上传xlsx,xls 等格式文件，建议大小不超过5MB,系统会自动解析积加调拨单</span>
        </div>
      </el-form-item>
      <TransFerOrderTable :data="form.directFactoryWorkOrderTransferList" />
    </KeenCard>
    <KeenCard title="日志">
      <SRMlog :data="form.logList" />
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">返回</el-button>
      <el-button
        type="primary"
        @click="submitData"
        :loading="loading"
        v-if="props.mode !== 'detail' || isRelate"
        :disabled="canSubmit?.length > 0"
      >
        确定
      </el-button>
    </el-space>
  </div>
  <SRMorderDialog
    ref="srmOrderDialogRef"
    @success="handleSelectSRMOrderSuccess"
    @close="showSrmDialog = false"
    v-model="showSrmDialog"
    v-if="showSrmDialog"
    :code="form.code"
    :mode="props.mode"
    :supplierCode="form.supplierCode"
    :confirmData="form.directFactoryWorkOrderDeliveryList"
    :supplierName="supplierName"
  />
</template>

<script lang="ts" setup>
  import { nextTick } from 'vue';

  import { download, urlDownload } from '@/utils/download';
  import { omsApi } from '@/api';

  import { useRoute } from 'vue-router';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage, FormInstance } from 'element-plus';
  import { DirectFactoryWorkOrderAddReq } from '@/api/oms/data-contracts';
  import type { UploadUserFile } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import SrmSupplier from './components/srmSupplier.vue';
  import SRMlog from './components/SRMlog.vue';
  import SRMorderDialog from './components/SRMorderDialog.vue';
  import TransFerOrderTable from './components/TransFerOrderTable.vue';
  import SRMorderTable from './components/SRMorderTable.vue';
  import { useFactoryConfig } from './hooks/useFactoryConfig';
  import { DirectFactoryWorkOrderDelivery } from '.';

  const route = useRoute();
  interface Props {
    mode: 'add' | 'detail' | 'edit';
  }
  type UploadFileType = UploadUserFile & {
    ossKey?: string;
  };
  // const { srmOrderStatusMap } = useFactoryConfig();
  const props = defineProps<Props>();
  const formRef = ref<FormInstance>();

  const rules = {
    supplierCode: [{ required: true, message: '请选择提货供应商', trigger: 'change' }],
    pickupMethod: [{ required: true, message: '请选择提货方式', trigger: 'change' }],
    exportTaxRebate: [{ required: true, message: '请选择是否需要出口退税', trigger: 'change' }],
    businessInspection: [{ required: true, message: '请选择是否需要商检', trigger: 'change' }],
    deliveryDate: [{ required: true, message: '请选择提货时间', trigger: 'change' }],
    pickupAddress: [{ required: true, message: '请输入提货地址', trigger: 'change' }],
    supplierContact: [{ required: true, message: '请输入供应商联系人', trigger: 'change' }],
    supplierContactPhone: [{ required: true, message: '请输入供应商联系电话', trigger: 'change' }],
  };
  const { deliveryTypeMap, isExportTaxMap, businessInspectionMap } = useFactoryConfig();
  const form = ref<DirectFactoryWorkOrderAddReq>({
    supplierCode: '',
    status: '',
    warehouseCode: '',
    exportTaxRebate: 'Y',
    pickupAddress: '见附件',
    pickupMethod: 'logistics',
    deliveryDate: '',
    deliveryTime: '00:00',
    businessInspection: 'N',
    address: '',
    supplierContact: '见附件',
    supplierContactPhone: '见附件',
    directFactoryWorkOrderDeliveryList: [],
    directFactoryWorkOrderTransferList: [],
    attachmentList: [],
    logList: [],
    code: '',
  });
  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    try {
      downloadLoading.value = true;
      const res = await omsApi.omsDirectFactoryWorkOrderDownTransferyTemplate();
      urlDownload(res as string);
    } finally {
      downloadLoading.value = false;
    }
  };
  // 提货时间间隔
  const disabledMinutes = (hour) => {
    // 保留 0 分（整点）和 30 分（半点），禁用其他所有分钟
    const allowedMinutes = [0, 30];
    const disabled = [];

    for (let i = 0; i < 60; i++) {
      if (!allowedMinutes.includes(i)) {
        disabled.push(i);
      }
    }
    return disabled;
  };
  const { closeTabAndRefresh } = useTabs();
  // 供应商名称（label）
  const supplierName = ref('');
  // 供应商组件 ref
  const srmSupplierRef = ref();

  const loading = ref(false);
  const handleTimeChange = () => {};
  const showSrmDialog = ref(false);
  const srmOrderDialogRef = ref();
  const isEdit = computed(() => {
    return props.mode === 'edit' || props.mode === 'add';
  });
  const isRelate = computed(() => {
    return route.query.type === 'relate' && props.mode === 'detail';
  });
  const handleSelectSRMOrder = () => {
    showSrmDialog.value = true;

    // 只在编辑态且第一次打开弹窗时（supplierName 为空）主动查询供应商名称
    if (!isAdd.value && !supplierName.value && form.value.supplierCode) {
      nextTick(() => {
        setTimeout(() => {
          const matched = srmSupplierRef.value?.getMatchedSupplier();
          if (matched) {
            supplierName.value = matched.name;
          }
        }, 100);
      });
    }

    nextTick(() => {
      if (!srmOrderDialogRef.value) return;
      srmOrderDialogRef.value?.open();
    });
  };
  // 禁用选择SRM送货单
  const srmOrderDisabled = computed(() => {
    return !form.value.supplierCode;
  });
  // 非新建模式下的一些禁用
  const isAdd = computed(() => {
    return props.mode === 'add';
  });
  const handleSelectSRMOrderSuccess = async (data: DirectFactoryWorkOrderDelivery[]) => {
    if (!data.length) return;
    const paramslist = data.map((item) => item.deliveryBillCode);
    const res = await omsApi.omsDirectFactoryWorkOrderQueryDeliveryItemList(paramslist);
    // form.value.directFactoryWorkOrderDeliveryList = [...data] as any;
    form.value.directFactoryWorkOrderDeliveryList = res as any;
  };
  const canSubmit: any = ref([]);
  const handleUploadSuccess = async (data: any, file: any) => {
    loading.value = true;
    try {
      const res = (await omsApi.omsDirectFactoryWorkOrderAddUpload({
        fileName: file.name,
        fileUrl: file.url,
        ossKey: file.ossKey,
      })) as any;
      if (!res.businessData.length) {
        form.value.directFactoryWorkOrderTransferList = [];
        return;
      }
      canSubmit.value = res.businessData.filter((item) => item.result !== null);
      if (canSubmit.value?.length > 0) {
        ElMessage.warning('导入积加调拨单失败,请检查失败原因');
      }
      form.value.directFactoryWorkOrderTransferList = [...res.businessData];
    } catch (error) {
      form.value.directFactoryWorkOrderTransferList = [];
    } finally {
      loading.value = false;
    }
  };
  const handleUploadChange = (file) => {
    if (file.length === 0) {
      form.value.directFactoryWorkOrderTransferList = [];
    }
  };

  // 监听附件列表变化（当删除文件时自动触发）
  watch(
    () => form.value.attachmentList,
    (newVal, oldVal) => {
      if (oldVal === undefined || oldVal.length === 0) {
        return;
      }
      // 如果新值长度小于旧值，说明删除了文件
      if (newVal && oldVal && newVal.length < oldVal.length) {
        form.value.directFactoryWorkOrderTransferList = [];
      }
      // 如果列表为空
      if (!newVal || newVal.length === 0) {
        form.value.directFactoryWorkOrderTransferList = [];
      }
    },
    { deep: true }
  );

  const getDetailData = async (id: string) => {
    const res = await omsApi.omsDirectFactoryWorkOrderQueryDetail({
      id: parseInt(id),
    });
    form.value = res as any;
    if (!form.value?.deliveryTime) {
      form.value.deliveryTime = '00:00';
    }
    const arr = form.value.deliveryDate?.split(' ');
    // console.log(arr);
    if (arr?.length > 0) {
      form.value.deliveryDate = arr[0];
      form.value.deliveryTime = arr[1];
    }
  };
  const handleSupplierCodeChange = (data: { code: string | undefined; name: string }) => {
    // 更新供应商名称
    supplierName.value = data.name;
    // 清空已选择的 SRM 送货单
    form.value.directFactoryWorkOrderDeliveryList = [];
  };
  const cancel = () => {
    if (props.mode === 'add') {
      closeTabAndRefresh('factoryDirectDeliveryAdd');
    } else if (props.mode === 'edit') {
      closeTabAndRefresh('factoryDirectDeliveryEdit');
    } else if (props.mode === 'detail') {
      closeTabAndRefresh('factoryDirectDeliveryDetail');
    }
  };
  const transformAttachmentList = (files: UploadFileType[]): any[] => {
    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }
    return files
      .filter((file) => (file?.name || file.fileName) && file?.ossKey) // 过滤无效数据
      .map((file) => ({
        fileName: file.name || file.fileName!,
        fileUrl: file.ossKey!, // ossKey 作为文件唯一标识，后端可根据此获取完整URL
      }));
  };

  const submitData = async () => {
    if (loading.value) return;
    const vaild = await formRef.value?.validate();
    if (!vaild) return;

    if (form.value?.directFactoryWorkOrderDeliveryList?.length === 0) {
      ElMessage.error('请选择SRM送货单');
      return;
    }

    if (form.value?.directFactoryWorkOrderTransferList?.length === 0) {
      ElMessage.error('无调拨单无法提交');
      return;
    }
    if (form.value?.attachmentList?.length === 0) {
      ElMessage.error('请上传提货明细附件');
      return;
    }

    try {
      loading.value = true;
      const { code, status, ...params } = cloneDeep(form.value);
      const submitParams = props.mode === 'add' ? params : { ...params, code, status };
      submitParams.attachmentList = transformAttachmentList(submitParams.attachmentList as any);
      submitParams.deliveryDate = `${submitParams.deliveryDate} ${submitParams.deliveryTime}`;
      if (props.mode === 'add') {
        await omsApi.omsDirectFactoryWorkOrderAdd({
          ...submitParams,
        });
        ElMessage.success('新增成功');
      } else if (props.mode === 'edit' || (props.mode === 'detail' && isRelate.value)) {
        await omsApi.omsDirectFactoryWorkOrderUpdate({
          ...submitParams,
        });
        ElMessage.success(props.mode === 'edit' ? '编辑成功' : '关联成功');
      }
      cancel();
    } catch (e) {
      /** empty */
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    if (props.mode === 'detail' || props.mode === 'edit') {
      const id = route.query.id as string;
      if (!id) return;
      getDetailData(id);
    }
  });
</script>

<style lang="scss" scoped>
  :deep(.timeSelect.el-select) {
    min-width: 100px;
  }
  .import-header {
    width: 100%;
    display: flex;
    gap: 12px;
    :deep(.upload-container) {
      width: 440px !important;
    }
    .downloadBtn {
      position: relative;
      margin-top: 2px;
      left: -340px;
    }
  }
  .uploadtip {
    width: 100%;
  }
</style>
