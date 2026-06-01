<template>
  <div class="sale-force">
    <KeenList
      :resetBtnOptions="{ size: 'small' }"
      :customHeight="true"
      @reset-search="resetSearchData"
    >
      <template #search>
        <el-input size="small" v-model="search.keyword" placeholder="文件名称" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-date-picker
          size="small"
          unlink-panels
          style="width: 230px"
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="上传开始时间"
          end-placeholder="上传结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
          @change="
            (dateArr) => {
              search.createTimeStart = dateArr ? dateArr[0] : '';
              search.createTimeEnd = dateArr ? dateArr[1] : '';
            }
          "
        />
        <el-select
          size="small"
          style="width: 120px"
          v-model="search.status"
          placeholder="上传状态"
          filterable
          clearable
          :teleported="false"
        >
          <el-option label="上传中" :value="1" />
          <el-option label="上传成功" :value="2" />
          <el-option label="上传失败" :value="0" />
        </el-select>
        <el-select
          size="small"
          style="width: 120px"
          v-model="search.creator"
          placeholder="上传人"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="person of creatorList"
            :key="person.value"
            :label="person.label"
            :value="person.value"
          />
        </el-select>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.fileRecordList"
        row-key="productSku"
        class-name="table-row-dashed"
      >
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="moduleCode" label="文件类型">
          <template #default="{ row }">
            <div>{{ getFileTypeName(row.moduleCode) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="statusDesc" width="300px" label="上传状态">
          <template #default="{ row }">
            <el-tag effect="dark" :type="statusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="上传人" />
        <!-- <el-table-column prop="recordCode" min-width="120px" label="编码" /> -->
        <el-table-column prop="createTime" label="上传时间" />
        <!-- <el-table-column prop="platformName" min-width="100px" label="平台名称" /> -->
        <el-table-column label="操作" width="100px" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '下载',
                  key: 'download',
                  type: 'primary',
                  text: true,
                  hide: row.status === 1,
                  row,
                },
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
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
  </div>
</template>

<script lang="ts" setup name="salesForecastingLog">
  import { memberApi, PlatformApi, platformApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { urlDownload } from '@/utils/download';
  import Tag from '@/components/Tag/index.vue';

  const time: any = ref([]);
  const PAGE_SIZE = 10;
  const statusColorMap = ref({
    0: 'danger',
    1: 'normal',
    2: 'success',
  });
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    PlatformApi.PlatformFileRecordQueryFileRecordList.RequestQuery,
    PlatformApi.PlatformFileRecordQueryFileRecordList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      status: undefined,
      creator: '',
      moduleCodeList: '',
      createTimeStart: '',
      createTimeEnd: '',
      recordType: 1,
      platform: 'lute_erp',
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformFileRecordQueryFileRecordList,
  });
  const creatorList = ref<any[]>([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  const erpUploadModel = ref<any>([]);
  const getModuleCodeList = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['erp_upload_model'],
    });
    erpUploadModel.value = res.dictMap?.erp_upload_model;
    // search.moduleCodeList = res.dictMap?.erp_upload_model.map((item) => item.value).join(',');
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'download') {
      urlDownload(row.status === 0 ? row.resultPath || row.importPath : row.importPath);
    }
  };
  const getFileTypeName = computed(() => {
    return (value) => {
      return erpUploadModel.value.find((item) => item.value === value)?.desc || '-';
    };
  });

  const resetSearchData = () => {
    time.value = [];
    resetSearch();
  };

  onMounted(async () => {
    await getModuleCodeList();
    getCreatorList();
  });
</script>

<style scoped lang="scss">
  .sale-force {
    :deep(.head-tools) {
      display: none;
    }
  }
</style>
