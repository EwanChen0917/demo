<template>
  <div class="voc-report">
    <KeenList
      :export-service="erpApi.luteosErpOrderOrderDownload"
      :customExportFields="[]"
      :selected-list="selectedList"
      @reset-search-by-key="resetSearchByKey"
      @clear-all="resetSearch"
      @reset-search="
        () => {
          dataSourceSelectRef?.resetSearch();
          resetSearch();
        }
      "
      @refresh="queryDataDetail"
    >
      <template #search>
        <el-date-picker
          class="time-picker"
          :model-value="[search.startDate, search.endDate]"
          type="daterange"
          placeholder="日期"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          :clearable="false"
          :style="{ width: '222px' }"
          :disabledDate="
            (data) => {
              const today = dayjs(dealTime);
              return today.isBefore(data);
            }
          "
          @update:model-value="
            (date) => {
              search.startDate = date[0];
              search.endDate = date[1];
            }
          "
        />
      </template>
      <template #filters>
        <DataSourceSelect
          ref="dataSourceSelectRef"
          @change="
              (value) => {
                search.dataSourceList = [];
                search.dataSourcePlatformList = [];
                search.dataTypeList = [];
                value.forEach((item) => {
                  if (item[0] && !search.dataSourceList!.includes(item[0])) {
                    search.dataSourceList!.push(item[0]);
                  }
                  if (item[1] && !search.dataSourcePlatformList!.includes(item[1])) {
                    search.dataSourcePlatformList!.push(item[1]);
                  }
                  if (item[2] && !search.dataTypeList!.includes(item[2])) {
                    search.dataTypeList!.push(item[2]);
                  }
                });
              }
            "
        />
        <LevelSelect
          @change="
              (value) => {
                search.level1List = [];
                search.level2List = [];
                value.forEach((item) => {
                  if (item[0] && !search.level1List!.includes(item[0])) {
                    search.level1List!.push(item[0]);
                  }
                  if (item[1] && !search.level2List!.includes(item[1])) {
                    search.level2List!.push(item[1]);
                  }
                });
              }
            "
        />
        <el-select
          v-model="search.skuModelNameVocList"
          placeholder="客服型号"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
        >
          <el-option
            v-for="name of dict.skuModelNameVocList"
            :key="name"
            :label="name"
            :value="name"
          />
        </el-select>

        <el-select
          v-model="search.platformList"
          placeholder="平台"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
        >
          <el-option
            v-for="platform of dict.platformList"
            :key="platform"
            :label="platform"
            :value="platform"
          />
        </el-select>

        <el-select
          v-model="search.channelList"
          placeholder="渠道"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
        >
          <el-option
            v-for="channel of dict.channelList"
            :key="channel"
            :label="channel"
            :value="channel"
          />
        </el-select>

        <el-select
          v-model="search.countryList"
          placeholder="国家"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
        >
          <el-option
            v-for="country of dict.countryList"
            :key="country"
            :label="country"
            :value="country"
          />
        </el-select>
      </template>
      <template #more-filter>
        <el-form-item label="SPU">
          <el-select
            ref="spuSelectRef"
            v-model="search.spuCodeList"
            placeholder="SPU"
            filterable
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :teleported="false"
          >
            <el-option v-for="spu of dict.spuCodeList" :key="spu" :label="spu" :value="spu" />
          </el-select>
        </el-form-item>
        <el-form-item label="SPU名称">
          <el-select
            ref="spuNameSelectRef"
            v-model="search.spuNameList"
            placeholder="SPU名称"
            filterable
            clearable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :teleported="false"
          >
            <el-option v-for="name of dict.spuNameList" :key="name" :label="name" :value="name" />
          </el-select>
        </el-form-item>
        <el-form-item label="GTM">
          <GTMSelect
            ref="gtmSelectRef"
            @change="
              (value) => {
                search.productLineMarketGroupList = [];
                search.productLineMarketNameList = [];
                value.forEach((item) => {
                  if (item[0] && !search.productLineMarketGroupList!.includes(item[0])) {
                    search.productLineMarketGroupList!.push(item[0]);
                  }
                  if (item[1] && !search.productLineMarketNameList!.includes(item[1])) {
                    search.productLineMarketNameList!.push(item[1]);
                  }
                });
              }
            "
          />
        </el-form-item>
        <el-form-item label="品线">
          <ProductLineSelect
            ref="productLineSelectRef"
            @change="
              (value) => {
                search.productLineList = [];
                search.skuDeveloperNameList = [];
                value.forEach((item) => {
                  if (item[0] && !search.productLineList!.includes(item[0])) {
                    search.productLineList!.push(item[0]);
                  }
                  if (item[1] && !search.skuDeveloperNameList!.includes(item[1])) {
                    search.skuDeveloperNameList!.push(item[1]);
                  }
                });
              }
            "
          />
        </el-form-item>
        <el-form-item label="品类">
          <CategorySelect
            ref="categorySelectRef"
            @change="
              (value) => {
                search.categoryNameLevel3List = [];
                search.categoryNameLevel4List = [];
                search.categoryNameLevel5List = [];
                value.forEach((item) => {
                  if (item[0] && !search.categoryNameLevel3List!.includes(item[0])) {
                    search.categoryNameLevel3List!.push(item[0]);
                  }
                  if (item[1] && !search.categoryNameLevel4List!.includes(item[1])) {
                    search.categoryNameLevel4List!.push(item[1]);
                  }
                  if (item[2] && !search.categoryNameLevel5List!.includes(item[2])) {
                    search.categoryNameLevel5List!.push(item[2]);
                  }
                });
              }
            "
          />
        </el-form-item>
      </template>
      <template #search-actions>
        <el-button type="primary" class="outline" @click="skip2VocDetail">VOC明细</el-button>
      </template>
      <template #default="{ tableHeight }">
        <div class="main-content" v-loading="loading">
          <el-scrollbar
            class="left"
            :style="{ height: tableHeight + 25 + 'px' }"
            :view-style="{ height: 'auto' }"
          >
            <div class="left-content">
              <CoreData />
              <VocTrendAnalysis />
              <LevelPart />
              <PlatformCountry />
              <DataSentiment />
            </div>
          </el-scrollbar>
          <el-scrollbar
            class="right"
            :style="{ height: tableHeight + 25 + 'px' }"
            :view-style="{ height: 'auto' }"
          >
            <AnalysisResult
              v-if="dataDetail.analysisResults?.length"
              :originAnalysisResults="dataDetail.analysisResults"
            />
          </el-scrollbar>
        </div>
      </template>
    </KeenList>
  </div>
</template>

<script setup lang="ts" name="vocReportNew">
import { useTemplateRef } from 'vue';
  import { erpApi } from '@/api';
  import dayjs from 'dayjs';
  import { encryptByBase64 } from '@/utils/aesTils';
  import DataSourceSelect from './components/DataSourceSelect.vue';
  import { useState } from './hooks/useState';
  import CategorySelect from './components/CategorySelect.vue';
  import LevelSelect from './components/LevelSelect.vue';
  import CoreData from './parts/CoreData.vue';
  import VocTrendAnalysis from './parts/VocTrendAnalysis.vue';
  import AnalysisResult from './parts/AnalysisResult.vue';
  import LevelPart from './parts/LevelPart.vue';
  import PlatformCountry from './parts/PlatformCountry.vue';
  import DataSentiment from './parts/DataSentiment.vue';
  import GTMSelect from './components/GTMSelect.vue';
  import ProductLineSelect from './components/ProductLineSelect.vue';

  const { loading, initData, queryDataDetail, dict, search, dataDetail, dealTime, resetSearch } =
    useState();
  initData();
  provide('dict', dict);
  provide('search', search);
  provide('dataDetail', dataDetail);

  const time = ref<string[]>([]);
  watch(dealTime, (newTime) => {
    const start = dayjs(newTime).startOf('month').format('YYYY-MM-DD');
    time.value = [start, newTime];
  });
  const timeSearchType = ref<'date' | 'month' | 'year'>('date');
  const dataSourceSelectRef = useTemplateRef('dataSourceSelectRef');
  const spuSelectRef = useTemplateRef('spuSelectRef');
  const spuNameSelectRef = useTemplateRef('spuNameSelectRef');
  const gtmSelectRef = useTemplateRef('gtmSelectRef');
  const productLineSelectRef = useTemplateRef('productLineSelectRef');
  const categorySelectRef = useTemplateRef('categorySelectRef');
  const selectedList = computed(() => {
    return [
      {
        label: 'SPU',
        key: 'spu',
        value: spuSelectRef.value?.selectedLabel,
      },
      {
        label: 'SPU名称',
        key: 'spuName',
        value: spuNameSelectRef.value?.selectedLabel,
      },
      {
        label: 'GTM',
        key: 'gtm',
        value: gtmSelectRef.value?.getSelectedLabel(),
      },
      {
        label: '品线',
        key: 'productLineList',
        value: productLineSelectRef.value?.getSelectedLabel(),
      },
      {
        label: '品类',
        key: 'categoryList',
        value: categorySelectRef.value?.getSelectedLabel(),
      },
    ];
  });
  const resetSearchByKey = (key: string) => {
    if (key === 'spu') {
      search.value.spuCodeList = [];
    } else if (key === 'spuName') {
      search.value.spuNameList = [];
      spuNameSelectRef.value?.reset();
    } else if (key === 'gtm') {
      search.value.productLineMarketGroupList = [];
      search.value.productLineMarketNameList = [];
    } else if (key === 'productLineList') {
      search.value.productLineList = [];
    } else if (key === 'categoryList') {
      search.value.categoryNameLevel3List = [];
      search.value.categoryNameLevel4List = [];
      search.value.categoryNameLevel5List = [];
    }
  };
  const router = useRouter();
  const skip2VocDetail = () => {
    const biUrl = `https://finebi.luteos.com/webroot/decision/v5/design/report/d04e262881ae4e75b2ff4b0b92da220e/view`;
    router.push({
      name: 'frame',
      params: {
        menuCode: 'M2025073018402714630583',
        frameUrl: encryptByBase64(biUrl),
      },
    });
  };
</script>

<style lang="scss" scoped>
  .voc-report {
    :deep(.actions) {
      display: none;
    }
    :deep(.list-table) {
      background: var(---N1, #f7f7f7);
    }
    :deep(.el-radio-group) {
      // font-family: 'PingFang SC', sans-serif;
      // --el-button-font-weight: 400;
      // --el-font-size-base: 12px;
      // .el-radio-button {
      //   --el-radio-button-checked-bg-color: var(---P6, #02b96b);
      //   --el-radio-button-checked-border-color: var(---P6, #02b96b);
      //   --el-color-primary: var(---P6, #02b96b);
      //   --el-border-color-extra-light: #fff;
      //   --el-button-bg-color: #fff;
      //   --el-font-weight-primary: 400;
      //   font-family: 'PingFang SC';
      // }
      // .el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) {
      //   & + .el-radio-button__inner {
      //     background-color: #fff;
      //     border-color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
      //     color: var(--el-radio-button-checked-bg-color, var(--el-color-primary));
      //     font-weight: 400;
      //     font-family: 'PingFang SC';
      //   }
      // }
    }
    :deep(.el-table) {
      --el-table-header-text-color: #666;
      --el-table-text-color: #1f1f1f;
      --el-table-border-color: transparent;

      thead {
        th {
          font-weight: 400;
        }
      }
    }
    :deep(.text-din) {
      font-family: 'DIN', sans-serif !important;
    }
  }
  .main-content {
    margin-top: 16px;
    display: flex;
    column-gap: 16px;
    .left {
      width: 0;
      flex: 1;
      background-color: #f5f5f5;
    }
    .left-content {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    .right {
      width: 412px;
      flex: none;
      border-radius: 10px;
      background-color: #fff;
    }
  }
  :deep(.el-cascader__tags) {
    top: 0;
    transform: translateY(0);

    .el-tag {
      max-width: 100px;
    }
  }
  .el-button--primary.outline {
    --el-button-bg-color: #fff;
    --el-button-text-color: var(--el-color-primary, #02b96b);
  }
</style>
