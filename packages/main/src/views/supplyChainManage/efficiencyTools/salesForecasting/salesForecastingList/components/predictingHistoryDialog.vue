<template>
  <el-dialog
    title="预测历史"
    v-model="visibility"
    width="800px"
    align-center
    append-to-body
    :before-close="close"
  >
    <p style="display: flex; align-items: center; gap: 10px">
      <el-input
        size="small"
        style="width: 200px"
        @change="getDataList"
        v-model="searchParams.keyword"
        placeholder="预测审核单号"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-date-picker
        size="small"
        unlink-panels
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD"
        @change="
          (dateArr) => {
            searchParams.startTime = dateArr ? dateArr[0] : '';
            searchParams.endTime = dateArr ? dateArr[1] : '';
            getDataList();
          }
        "
      />
    </p>
    <el-table
      v-loading="loading"
      border
      max-height="500px"
      :data="dataList"
      class-name="table-row-dashed"
    >
      <el-table-column prop="code" label="预测审核单号">
        <template #default="{ row }">
          <div>
            <span>{{ row.code || '-' }}</span>
            <Copy :content="row.code" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="optrator" label="操作人">
        <template #default="{ row }">
          <el-tag round type="info">
            <SvgIcon icon="fullUser" class="me-1" />
            <span>{{ row.optrator || '-' }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                text: true,
                disabled: !row.downloadUrl,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer></template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';

  const visibility = ref(false);
  const dataList = ref<any[]>([]);
  const handleActions = (item: any) => {
    const { key, row } = item;
    if (key === 'download') {
      urlDownload(row.downloadUrl);
    }
  };
  const searchParams = ref<any>({
    keyword: '',
    startTime: '',
    endTime: '',
    channel: '',
    country: '',
    onlineSkuCode: '',
    id: '',
  });
  const queryType = ref<string | undefined>();
  const time = ref<any>([]);
  const open = async (row, type?: string) => {
    searchParams.value = {
      keyword: '',
      startTime: '',
      endTime: '',
      channel: row.channel,
      country: row.country,
      onlineSkuCode: row.onlineSkuCode,
      id: row.id,
    };
    queryType.value = type;
    await getDataList(row);
    visibility.value = true;
  };
  const loading = ref(false);
  const getDataList = async (row) => {
    loading.value = true;
    const api =
      queryType.value === 'retail'
        ? erpApi.luteosErpRetailSaleForecastAuditHistory
        : erpApi.luteosErpSaleForecastV2AuditHistory;

    const res = await api({ ...searchParams.value }).finally(() => {
      loading.value = false;
    });
    dataList.value = res.auditHistoryList as [];
  };
  const close = () => {
    dataList.value = [];
    searchParams.value = {
      keyword: '',
      startTime: '',
      endTime: '',
      channel: '',
      country: '',
      onlineSkuCode: '',
    };
    visibility.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
