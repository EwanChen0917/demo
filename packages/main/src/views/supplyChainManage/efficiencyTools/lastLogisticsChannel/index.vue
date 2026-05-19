<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.channelName" placeholder="渠道名称" />
        <el-input v-model="search.channelCode" placeholder="渠道编码" clearable />
      </el-space>
    </template>
    <template #filters>
      <el-select v-model="search.channelType" placeholder="渠道类型" clearable>
        <el-option
          v-for="item in lastLogisticsChannelTypeEnum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.supplierCode" placeholder="服务商" clearable>
        <el-option label="amazon" value="amazon" />
      </el-select>
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option
          v-for="item in lastLogisticsChannelStatusEnum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="创建时间开始"
        end-placeholder="创建时间结束"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (val) => {
            search.createTimeStart = val?.[0] || '';
            search.createTimeEnd = val?.[1] || '';
          }
        "
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="addChannel">新增</el-button>
      <el-button class="button" type="primary" plain @click="importVisible = true">导入</el-button>
      <el-button class="button" type="primary" plain @click="handleImportArea">
        导入区域表
      </el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.recordList" row-key="id">
      <el-table-column prop="id" label="ID" width="80" fixed="left" />
      <el-table-column prop="channelName" label="渠道名称" min-width="100" fixed="left" />
      <el-table-column prop="channelCode" label="渠道编码" min-width="100" fixed="left" />
      <el-table-column prop="channelTypeDesc" label="渠道类型" min-width="100" />
      <el-table-column prop="supplierCode" label="服务商" min-width="100" />
      <el-table-column prop="weightLimitMax" label="限重上限" min-width="100" />
      <el-table-column prop="weightLimitMin" label="限重下限" min-width="100" />
      <el-table-column prop="isCod" label="是否COD" min-width="100">
        <template #default="{ row }">
          {{ row.isCod === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="trackingWebsite" label="轨迹查询网站" min-width="150">
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
            :href="row.trackingWebsite"
            target="_blank"
            v-if="row.trackingWebsite"
          >
            <OverflowTooltip :content="row.trackingWebsite" :line="2" color="#02B96B" />
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" label="状态" min-width="100" />
      <el-table-column prop="isConnectApi" label="是否对接" min-width="100">
        <template #default="{ row }">
          {{ row.isConnectApi === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="isVolumeWeight" label="计算材积重" min-width="100">
        <template #default="{ row }">
          {{ row.isVolumeWeight === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="volumeWeightCoefficient" label="材积系数" min-width="100" />
      <el-table-column prop="warehouseName" label="发货仓库" min-width="130" />
      <el-table-column prop="creator" label="创建人" min-width="100" />
      <el-table-column prop="createTime" label="创建时间" min-width="100" />
      <el-table-column prop="updator" label="修改人" min-width="100" />
      <el-table-column prop="updateTime" label="修改时间" min-width="100" />
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              { label: '编辑', key: 'edit', type: 'primary', row },
              { label: '详情', key: 'detail', type: 'primary', row },
              { label: '谷仓导入', key: 'upload', type: 'primary', row },
              // { label: '失效', key: 'invalid', type: 'danger', row, hide: +row.status === 0 },
              // { label: '生效', key: 'valid', type: 'primary', row, hide: +row.status === 1 },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      size="small"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <BatchImportModal
    ref="importModalRef"
    v-if="importVisible"
    :visible="importVisible"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @get-custom-template="getCustomTemplate"
    @close="close"
    @custom-upload="customUpload"
  />
</template>

<script setup lang="ts" name="lastLogisticsChannel">
  import useList from '@/hooks/list/useList';
  import { TmsApi, tmsApi } from '@/api';
  import { useRouter } from 'vue-router';
  import { lastLogisticsChannelTypeEnum, lastLogisticsChannelStatusEnum } from './components/enum';
  import { ElMessage } from 'element-plus';
  import { urlDownload } from '@/utils/download';

  const router = useRouter();
  const tableRef = ref();
  const time = ref<any>([]);
  const importVisible = ref(false);
  const importType = ref<'area' | 'channel' | 'gucang'>('channel');
  const importChannelDode = ref<number | undefined>(undefined);
  const importModalRef = ref();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    TmsApi.TmsErpLogisticsLastmileChannelQueryList.RequestBody,
    TmsApi.TmsErpLogisticsLastmileChannelQueryList.ResponseBody
  >({
    searchDefaults: {
      channelCode: undefined,
      channelName: undefined,
      channelType: undefined,
      supplierCode: undefined,
      status: undefined,
      createTimeStart: undefined,
      createTimeEnd: undefined,
    },
    pageSize: 10,
    service: tmsApi.tmsErpLogisticsLastmileChannelQueryList,
  });

  const addChannel = () => {
    router.push('/lastLogisticsChannel/add');
  };

  const handleImportArea = () => {
    importVisible.value = true;
    importType.value = 'area';
  };
  const getCustomTemplate = async () => {
    if (importType.value === 'area') {
      // 区域表导入模板
      const res = await tmsApi.tmsCommonFileQueryImportTemplate({
        importScene: 'logistics_lastmile_zone_import',
      });
      return res?.templateUrl ? urlDownload(res?.templateUrl as string) : '';
    } else if (importType.value === 'gucang') {
      // 谷仓导入模板
      const res = await tmsApi.tmsCommonFileQueryImportTemplate({
        importScene: 'logistics_lastmile_channel_gucang_price_import',
        extInfo: {
          channelCode: importChannelDode.value,
        },
      });
      return res?.templateUrl ? urlDownload(res?.templateUrl as string) : '';
    } else {
      // 渠道表导入模板
      const res = await tmsApi.tmsErpLogisticsLastmileChannelDownTemplate();
      return urlDownload(res as string);
    }
  };

  const customUpload = async (fileList) => {
    importModalRef.value.loading = true;
    try {
      let res;
      if (['area', 'gucang'].includes(importType.value)) {
        res = await tmsApi.tmsCommonFileImportData({
          fileName: fileList[0].name,
          key: fileList[0].ossKey,
          importScene:
            importType.value === 'gucang'
              ? 'logistics_lastmile_channel_gucang_price_import'
              : 'logistics_lastmile_zone_import',
          extInfo:
            importType.value === 'gucang'
              ? {
                  channelCode: importChannelDode.value,
                }
              : undefined,
        });
      } else {
        res = await tmsApi.tmsErpLogisticsLastmileChannelImport({
          fileName: fileList[0].name,
          ossKey: fileList[0].ossKey,
        });
      }
      if (res) {
        ElMessage.success('导入成功');
        refreshList();
      }
    } finally {
      importModalRef.value.loading = false;
      importVisible.value = false;
    }
  };
  // 关闭导入弹窗
  const close = (isConfirm: boolean) => {
    importVisible.value = false;
    if (isConfirm) {
      refreshList();
    }
  };
  const handleActions = (item) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
      case 'detail':
        const name = key === 'edit' ? 'lastLogisticsChannelEdit' : 'lastLogisticsChannelDetail';
        router.push({
          name,
          query: {
            channelId: row?.id,
          },
        });
        break;
      case 'valid':
        console.log(row);
        break;
      case 'invalid':
        console.log(row);
        break;
      case 'upload':
        importVisible.value = true;
        importType.value = 'gucang';
        importChannelDode.value = row?.channelCode;
        break;
    }
  };
  const reset = () => {
    time.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
