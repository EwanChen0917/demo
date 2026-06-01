<template>
  <el-form ref="formRef" :model="form" label-width="150">
    <KeenCard title="基本信息">
      <el-row>
        <el-col :span="8">
          <el-form-item label="调拨单号">
            {{ form.code || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            {{ form.transferBigStatusDesc || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建人/创建时间">
            {{ form.creatorName || '-' }} / {{ form.createTime || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="调出仓库">
            {{ form.warehouseName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入仓库">
            {{ form.arrivalWarehouseName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物流方式">
            {{ form.shippingMethod || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预计出库日期">
            {{ form.executorDate || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际出库日期日期">
            {{ form.actualDeliveryDate || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调出仓出库单号">
            {{ form.outboundNo || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="调出仓出库单状态">
            {{ form.outboundStatusDesc || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计出运日期">
            {{ form.expectShipmentDate || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计抵达日期">
            {{ form.deliveryDate || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="物流跟踪号">
            {{ form.trackingNo || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="承运商">
            {{ form.carrierName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入仓入库单号">
            {{ form.inboundNo || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="调入仓库单状态">
            {{ form.inboundStatusDesc || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调入仓入库单箱唛">
            <div class="w-100" v-for="item in form?.inboundBoxAttachments" :key="item.id">
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
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="附件">
            <el-button type="primary" @click="uploadClick">上传附件</el-button>
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              v-if="allowEdit"
              type="textarea"
              :rows="3"
              maxlength="500"
              style="width: 400px"
            />
            <expandInput
              v-if="!allowEdit"
              v-model:value="form.remark"
              @confirm="handleConfirmRemark"
              :maxlength="500"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <keenCard>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="产品明细" name="productDetail">
          <ProductDetail :data="form.itemList" />
        </el-tab-pane>
        <el-tab-pane label="装箱清单" name="packingList">
          <div class="d-flex justify-content-between">
            <div style="margin-top: 10px; margin-bottom: 10px">
              <el-button
                type="primary"
                @click="handleClickAction('edit')"
                v-if="allowEdit"
                v-permission="'transferOrderOfflineEditBox'"
              >
                编辑装箱清单
              </el-button>
              <ExportBtn
                :service="omsApi.omsTransferExport"
                :params="{
                  code: form.code,
                  exportType: 1,
                }"
              >
                导出箱子信息（明细）
              </ExportBtn>
            </div>
            <div class="d-flex align-items-center gap-4" style="float: right">
              <span class="mr-4">合计：</span>
              <span class="mr-4">重量：{{ totalWeightKg.toFixed(4) }} kg</span>
              <span class="mr-4">体积：{{ totalVolumeM3.toFixed(4) }} m³</span>
              <span>体积重：{{ totalVolumetricWeightKg.toFixed(4) }} kg</span>
            </div>
          </div>
          <PackListDetail
            :data="form.itemList"
            :showData="submitData.cartonList"
            :type="boxType"
            :volumeWeightCoefficient="volumeWeightCoefficient"
            :isDetail="!allowEdit"
          />
        </el-tab-pane>
      </el-tabs>
    </keenCard>
    <keenCard title="操作日志">
      <el-table :data="form.operationLogBeans || []" border style="width: 700px">
        <el-table-column prop="createTime" label="操作时间" width="250" align="center" />
        <el-table-column prop="operator" label="操作人" width="150" align="center" />
        <el-table-column prop="operationTypeDesc" label="操作类型" align="center" />
      </el-table>
    </keenCard>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button
          type="primary"
          :loading="saveLoading"
          @click="submit"
          v-permission="'transferOrderOfflineSubmit'"
          v-if="allowEdit"
        >
          提交
        </el-button>
      </el-space>
    </div>
  </el-form>
  <EditPack
    ref="editPack"
    :data="form.itemList"
    @success="boxConfirm"
    :options="boxOptions"
    :type="boxType"
  />
  <TransferFileDialog
    :fileList="form.attachmentList"
    :visible="uploadDialog"
    @close="handleUploadClsoe"
    @confirm="handleUploadConfirm"
  />
</template>

<script lang="ts" setup name="transferOrderOfflineDetail">
  import { OmsApi, omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { download } from '@/utils/download';
  import { useTabs } from '@/hooks/tabs';
  import TransferDialog from '@/views/usercenter/userList/components/transferDialog.vue';
  import EditPack from './components/editPack.vue';
  import PackListDetail from './components/packListDetail.vue';
  import ProductDetail from './components/productDetail.vue';
  import { mixRecallOptions, boxSubmitOptions } from './type';
  import { BOXTYPEMAP, BOXTYPEMAPREVERSE, ORDER_STATUS } from './config';
  import expandInput from './components/expandInput.vue';
  import { useTransOrderOptions } from './hooks/useTransOrderOptions';
  import TransferFileDialog from './components/transferFileDialog.vue';

  interface FileItem {
    name: string;
    url: string;
  }
  const { logisticsTransportList } = useTransOrderOptions();
  const fileList = ref<FileItem[]>([]);
  const activeTab = ref('productDetail');
  const editPack = ref<any>(null);
  // 箱子配置表
  const boxOptions = ref<mixRecallOptions | undefined>(undefined);
  const boxType = ref<'single' | 'mix' | 'all'>('single');
  const { closeTabAndRefresh } = useTabs();

  const saveLoading = ref(false);
  const form = reactive<any>({
    attachmentList: [],
    actualDeliveryDate: '',
    arrivalWarehouseCode: '',
    arrivalWarehouseName: '',
    carrierCode: '',
    carrierName: '',
    code: '',
    createBy: '',
    createTime: '',
    creatorName: '',
    executorDate: '',
    inboundNo: '',
    inboundStatus: '',
    inboundStatusDesc: '',
    inboundBoxAttachments: '',
    remark: '',
    skuCode: '',
    supplySku: '',
    warehouseCode: '',
    warehouseName: '',
    itemList: [],
    operationLogBeans: [],
    transferBigStatus: 100,
  });
  const allowEdit = computed(() => {
    return form.transferBigStatus === ORDER_STATUS.PENDING_CONFIRMATION;
  });
  const submitData = reactive<boxSubmitOptions>({
    code: '',
    cartonList: [],
    remark: '',
  });
  const router = useRouter();
  const handleClickAction = async (action = 'edit') => {
    if (action === 'edit') {
      if (!editPack.value) return;
      editPack.value.open();
    }
  };
  // 获取路由参数
  const route = useRoute();
  const orderCode = computed(() => route.params.code);
  const volumeWeightCoefficient = ref<number>(1);
  // 动态获取当前正确的体积重系数
  const stop = watch(
    () => logisticsTransportList.value,
    (list) => {
      if (!list?.length || !form.shippingMethod || volumeWeightCoefficient.value !== 1) return;
      const logisticsTransport = list.find(
        (item: any) => item.transportCode === form.shippingMethod
      );
      if (logisticsTransport) {
        volumeWeightCoefficient.value = logisticsTransport.volumeWeightCoefficient;
        stop();
      }
    },
    { immediate: true }
  );
  //= =============================不允许编辑的情况下进行编辑附件相关逻辑====================================
  const uploadDialog = ref(false);
  const uploadLoading = ref(false);
  /**
   * 仅在不可编辑情况下打开弹窗允许用户编辑附件
   */
  const uploadClick = () => {
    uploadDialog.value = true;
  };
  const handleUploadClsoe = () => {
    uploadDialog.value = false;
  };
  //= =================================================================
  const getDataDetail = async () => {
    if (!orderCode.value) {
      ElMessage.error('缺少调拨单ID');
      return;
    }
    try {
      const res = await omsApi.omsTransferQueryDetail({
        code: orderCode.value as string, // 使用路由参数
      });
      Object.assign(form, res);
      form.attachmentList = res.attachmentList ?? [];
      submitData.code = res.code;
      submitData.id = res.id;
      boxType.value = res.encaseType ? BOXTYPEMAPREVERSE[res.encaseType] : 'single';
      submitData.cartonList = initSubmitDataBySingleBox(res.itemList);
      if (!logisticsTransportList.value) return;
      const logisticsTransport = logisticsTransportList.value.find(
        (item: any) => item.transportCode === res.shippingMethod
      );
      if (logisticsTransport) {
        volumeWeightCoefficient.value = logisticsTransport.volumeWeightCoefficient;
      }
    } catch (error) {
      ElMessage.error('获取详情失败');
    }
  };
  // 因为盒子被后端初始化了，所以如果用户什么都不点就直接点击提交，需要初始化一个提交数组
  const initSubmitDataBySingleBox = (itemlist) => {
    let data = [];
    if (!itemlist.length) {
      return data;
    }
    data = itemlist
      .map((item) => {
        const cartonList = item.cartonList.map((e) => {
          return {
            boxNo: e.boxNo,
            boxNum: e.boxNum,
            perProductBoxCount: e.perProductBoxCount,
            roughWeight: e.roughWeight,
            length: e.length,
            wide: e.wide,
            high: e.high,
            skuCode: item.skuCode,
            supplySku: item.supplySku,
          };
        });
        return cartonList;
      })
      .flat();
    return data;
  };
  /**
   * 装箱信息编辑成功回调，内含各种信息
   * @param data 包含有提交数据，当前的form表单
   */
  const boxConfirm = (data: any) => {
    boxOptions.value = data.options;
    boxType.value = data.type;
    if (data.result) {
      // 开始进行属性合并
      form.itemList = form.itemList.map((item: any, i: number) => {
        const patch = data.result[i];
        if (!patch) return item;
        const merged: any = { ...item };
        for (const k in patch) {
          if (k in item && patch[k] !== undefined) {
            merged[k] = patch[k];
          }
        }
        return merged;
      });
    }
    if (data.submitData) {
      submitData.cartonList = data.submitData;
    }
  };

  // 总重量 - 优化：合并循环，提高性能
  const totalWeightKg = computed(() => {
    if (!form.itemList?.length) return 0;

    const totalWeight = (form.itemList || []).reduce((sum: number, row: any) => {
      if (!row.cartonList?.length) return sum;

      const productFullWeight = row.cartonList.reduce((itemSum, itemRow) => {
        const itemWeight = Number(itemRow?.roughWeight) || 0;
        const perCount = Number(itemRow?.perProductBoxCount) || 1;
        return itemSum + itemWeight * perCount;
      }, 0);
      return sum + productFullWeight;
    }, 0);

    // 需要判断场景
    if (boxType.value === 'single') return totalWeight;

    return totalWeight / form.itemList.length;
  });

  // 总体积 - 优化：提前过滤无效数据
  const totalVolumeM3 = computed(() => {
    if (!form.itemList?.length) return 0;

    const totalVolume = (form.itemList || []).reduce((sum: number, row: any) => {
      if (!row.cartonList?.length) return sum;

      const productFullVolume = row.cartonList.reduce((itemSum, itemRow) => {
        const L = Number(itemRow?.length) || 0; // cm
        const W = Number(itemRow?.wide) || 0; // cm
        const H = Number(itemRow?.high) || 0; // cm
        const perCount = Number(itemRow?.perProductBoxCount) || 1;
        if (!L || !W || !H) return itemSum;
        const single = (L * W * H) / 1000000;
        return itemSum + single * perCount;
      }, 0);
      return sum + productFullVolume;
    }, 0);

    if (boxType.value === 'single') return totalVolume;

    return totalVolume / form.itemList.length;
  });
  // 总体积重
  const totalVolumetricWeightKg = computed(() => {
    const coeff = volumeWeightCoefficient.value;
    if (coeff && coeff > 0) {
      // 使用系数法：体积重 = 实物重 / 系数
      return totalVolumeM3.value / coeff;
    }
    return 0;
  });
  const submit = async () => {
    try {
      if (saveLoading.value) return;
      let params = {};
      params = {
        ...submitData,
        remark: form.remark,
        encaseType: BOXTYPEMAP[boxType.value] || 1,
      };
      saveLoading.value = true;
      await omsApi.omsTransferSubmit(params);
      ElMessage.success('提交成功');
      closeTabAndRefresh('transferOrderOfflineEdit');
      router.push({ name: 'transferOrderOffline' });

      // getDataDetail()
    } catch (e) {
      /** empty */
    } finally {
      saveLoading.value = false;
    }
  }; // 页面加载时获取详情
  // 附件提交详细
  const handleUploadConfirm = async (params: any[]) => {
    try {
      if (saveLoading.value) return;
      await omsApi.omsTransferUploadAttachment({
        code: form.code,
        attachmentList: params,
      });
      ElMessage.success('修改附件成功');
      getDataDetail();
      uploadDialog.value = false;
    } catch (e) {
      /** empty */
    } finally {
      saveLoading.value = false;
    }
  };
  const handleConfirmRemark = async () => {
    try {
      if (saveLoading.value) return;
      await omsApi.omsTransferRemark({
        code: form.code,
        remark: form.remark,
      });
      ElMessage.success('修改备注成功');
      getDataDetail();
    } catch (e) {
      /** empty */
    } finally {
      saveLoading.value = false;
    }
  };

  onMounted(() => {
    getDataDetail();
  });
</script>

<style scoped lang="scss">
  .form-text {
    line-height: 32px;
    color: #606266;
  }

  .file-item {
    margin-bottom: 4px;

    .file-link {
      color: #409eff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
