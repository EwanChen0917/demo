<template>
  <div class="box-mark-area">
    <div id="dispatch_list_content" ref="pdfContainer">
      <div v-for="(item, index) in formData.respList" :key="item.id" class="pallet-mark-area-item">
        <CommonTemplate
          ref="formRef"
          v-model:shiFromAddress="shiFromAddress"
          v-model:shipToAddress="shipToAddress"
          :item="item"
          :index="index"
          :startPdf="false"
        />
      </div>
    </div>
    <div>
      <el-pagination
        small
        :pager-count="5"
        :total="paginationInfo.total"
        :pageSize="paginationInfo.pageSize"
        :v-model:current-page="paginationInfo.pageNum"
        @current-change="
          (value: number) => {
            savePalletMark();
            queryPalletDataByPage(value);
          }
        "
      />
    </div>
    <div class="pallet-mark-area-footer-btn">
      <!-- <el-button
        v-if="route?.query?.viewType !== 'view'"
        :loading="btnLoading"
        @click="clearPalletMark"
      >
        清除托唛
      </el-button> -->
      <el-button
        v-if="route?.query?.viewType !== 'view'"
        :loading="btnLoading"
        @click="sureMake()"
        type="primary"
      >
        确认并生成新托唛文件
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { PalletDataPageResp, PalletMarkDataBean } from '@/api/erp/data-contracts';
  import { type FormInstance } from 'element-plus';
  import { useCache } from '@/hooks/web/useCache';
  import CommonTemplate from '../template/CommonTemplate.vue';

  const emit = defineEmits<{
    (event: 'clearPalletMark'): void;
    (event: 'sureMark'): void;
  }>();

  const pdfContainer = ref<HTMLElement | null>(null);
  const formData = reactive<{ respList: PalletMarkDataBean[] }>({ respList: [] });
  const btnLoading = ref<boolean>(false);
  const formRef = ref<FormInstance>();

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const paginationInfo = reactive({
    pageNum: 1,
    pageSize: 1,
    total: 0,
  });
  /**
   * 获取托唛数据分页数据
   * @param pageNum 页码
   */
  const queryPalletDataByPage = async (pageNum = paginationInfo.pageNum) => {
    const res: PalletDataPageResp = await erpApi.luteosErpPackageQueryPalletMarkPage({
      pageSize: 1,
      pageNum,
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    if (res.respList?.length) {
      formData.respList = res.respList;
      paginationInfo.total = res.total!;
      paginationInfo.pageNum = pageNum!;
    }
  };
  (function init() {
    queryPalletDataByPage();
  })();

  /**
   * 确认托唛
   */
  const sureMake = async () => {
    // 保存当前托唛数据
    await savePalletMark();
    emit('sureMark');
  };
  /**
   * 保存当前页面托唛数据
   */
  const savePalletMark = async () => {
    await erpApi.luteosErpPackageSingleConfirmPalletMark({
      markData: formData.respList[0],
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
  };

  const shiFromAddress = ref('');
  const shipToAddress = ref('');
  const clearPalletMark = () => {
    formData.respList = [
      {
        skuDetailList: [],
      },
    ];
  };
  defineExpose({
    queryPalletDataByPage,
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
  #dispatch_list_content .pallet-mark-area-item {
    border: 1px solid #ebeef5;
  }
  .pallet-mark-area-item {
    height: auto;
    overflow-y: auto;
  }
  .pallet-mark-area-footer-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
