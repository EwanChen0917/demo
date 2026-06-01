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
        @change="searchData"
        v-model="searchParams.keyword"
        placeholder="预测单号"
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
            searchData();
          }
        "
      />
    </p>
    <template #filters></template>
    <el-table border max-height="500px" :data="dataList" class-name="table-row-dashed">
      <el-table-column prop="code" label="预测单号">
        <template #default="{ row }">
          <div>
            <span>{{ row.code || '-' }}</span>
            <Copy :content="row.code" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="snapTime" label="存档时间" />
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                disabled: !row.downUrl,
                text: true,
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
  import { ref } from 'vue';

  const visibility = ref(false);
  const dataList = ref<any[]>([]);
  const handleActions = (item: any) => {
    const { key, row } = item;
    if (key === 'download') {
      urlDownload(row.downUrl);
    }
  };
  const searchParams = ref<any>({
    keyword: '',
    startTime: '',
    endTime: '',
  });
  const time = ref<any>([]);
  const forecastType = ref();
  const historyType = ref('');
  const open = async (type) => {
    if (type === 'retail') {
      historyType.value = type;
      await getRetailDataList();
    } else {
      forecastType.value = type;
      await getDataList();
    }
    visibility.value = true;
  };
  const searchData = async () => {
    historyType.value === 'retail' ? getRetailDataList() : getDataList();
  };
  const getDataList = async () => {
    const res = await erpApi.luteosErpSaleForecastV2SnapHistory({
      ...searchParams.value,
      type: forecastType.value,
    });
    dataList.value = res.itemList as [];
  };
  // 零售渠道 数据
  const getRetailDataList = async () => {
    const res = await erpApi.luteosErpRetailSaleForecastSnapHistory({
      ...searchParams.value,
    });
    dataList.value = res.itemList as [];
  };
  const close = () => {
    dataList.value = [];
    visibility.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
