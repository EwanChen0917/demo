<template>
  <div class="box-mark-area">
    <el-button
      type="primary"
      text
      :loading="syncLoading"
      class="sync-address-info"
      @click="syncAddressInfo"
    >
      同步地址信息
    </el-button>
    <div id="dispatch_list_content" ref="pdfContainer">
      <div
        v-for="(item, index) in formData.respList"
        :key="item.bilCode"
        class="box-mark-area-item"
      >
        <CommonTemplate
          ref="formRef"
          v-model:shipFromAddress="shipFromAddress"
          v-model:shipToAddress="shipToAddress"
          :item="item"
          :index="index"
          :startPdf="false"
        />
      </div>
    </div>
    <div>
      <el-pagination
        :total="paginationInfo.total"
        :pageSize="paginationInfo.pageSize"
        :pager-count="3"
        @current-change="
          (value) => {
            saveBoxMark();
            makeBoxMark(value);
          }
        "
      />
    </div>
    <div class="box-mark-area-footer-btn">
      <!-- <el-button :loading="btnLoading" @click="clearBoxMark">清除箱唛</el-button> -->
      <el-button :loading="btnLoading" @click="sureMake()" type="primary">
        确认并生成新箱唛文件
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { PackageMarkData, PackageMarkDataResp } from '@/api/erp/data-contracts';
  import { ElMessage, type FormInstance } from 'element-plus';
  import { useCache } from '@/hooks/web/useCache';
  import CommonTemplate from '@/views/productTools/logisticsTools/boxSupportTools/Template/common.vue';

  const pdfContainer = ref<HTMLElement | null>(null);
  const formData = reactive<{ respList: PackageMarkData[] }>({ respList: [] });
  const btnLoading = ref<boolean>(false);
  const formRef = ref<FormInstance>();

  const props = defineProps<{
    billCodeList: string[];
    fileType: 1 | 2;
  }>();
  const route = useRoute();
  const sureMake = async () => {
    // 保存当前箱唛数据
    await saveBoxMark();
    emit('sureMark');
  };
  const saveBoxMark = async () => {
    // 保存当前箱唛数据
    await erpApi.luteosErpPackageSingleConfirmPackageMark({
      markData: formData.respList[0],
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
  };
  const paginationInfo = reactive({
    pageNum: 1,
    pageSize: 1,
    total: 0,
  });
  // 获取箱唛分页数据
  const makeBoxMark = async (pageNum = 1) => {
    const res: PackageMarkDataResp = await erpApi.luteosErpPackageQueryMarkDataPage({
      pageSize: 1,
      pageNum,
      billCodeList: props.billCodeList,
    });
    if (res.respList?.length) {
      formData.respList = [...res.respList];
      shipFromAddress.value = res.respList[0].shipFromAddress || '';
      shipToAddress.value = res.respList[0].shipToAddress || '';
      paginationInfo.total = res.total;
      nextTick(() => {
        formData.respList.map((i, index) => {
          // generateBarcode(index, i.eanCode as string);
          return i;
        });
      });
    }
  };
  const emit = defineEmits<{
    (event: 'clearBoxMark'): void;
    (event: 'sureMark'): void;
  }>();
  const shipFromAddress = ref('');
  const shipToAddress = ref('');
  const { wsCache } = useCache('localStorage');
  const syncLoading = ref(false);
  const syncAddressInfo = () => {
    syncLoading.value = true;
    erpApi
      .luteosErpPackageBatchUpdateAddress({
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
        shiFromAddress: shipFromAddress.value,
        shipToAddress: shipToAddress.value,
      })
      .finally(() => {
        syncLoading.value = false;
      });
    ElMessage.success('同步成功');
  };
  const clearBoxMark = () => {
    formData.respList = [];
    emit('clearBoxMark');
  };
  defineExpose({
    makeBoxMark,
  });
</script>

<style scoped lang="scss">
  #dispatch_list_content,
  #pdf-area {
    width: 386px;
    background-color: #fff;
  }
  .box-mark-area {
    width: 386px;
    position: relative;
    .sync-address-info {
      position: absolute;
      right: 0;
      transform: translateY(-100%);
    }
  }
  #dispatch_list_content .box-mark-area {
    border: 1px solid #ebeef5;
  }
  .formRefArea {
    :deep(.el-input__wrapper) {
      background-color: none;
      box-shadow: none;
    }
    :deep(.el-form-item) {
      margin-bottom: 10px;
    }
    :deep(.el-form-item__error) {
      padding-top: 0;
    }
    :deep(.el-input__inner) {
      height: 20px;
    }
    :deep(.el-form-item__label) {
      height: 20px;
      line-height: 20px;
    }
    :deep(.el-form-item__content) {
      line-height: 20px;
    }
  }
  #dispatch_list_content .box-mark-area-item {
    border: 1px solid #ebeef5;
  }
  .box-mark-area-item {
    height: auto;
    overflow-y: auto;
  }
  .box-mark-area-footer-btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
