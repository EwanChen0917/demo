<template>
  <KeenList @resetSearch="reset" @refresh="runQuery">
    <template #search>
      <el-input v-model="search.approveCode" placeholder="审批编号" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="meetingTime"
        type="datetimerange"
        value-format="YYYY-MM-DD HH:mm"
        format="YYYY-MM-DD HH:mm"
        start-placeholder="会议开始时间"
        end-placeholder="会议结束时间"
        :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        time-format="HH:mm"
        @change="
              (t:any) => {
                search.meetingStartTime = t ? t[0] : '';
                search.meetingEndTime = t ? t[1] : ''
              }
            "
      />
      <el-select
        style="width: 140px"
        v-model="search.status"
        placeholder="请选择状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="审批中" value="1" />
        <el-option label="已完成" value="2" />
        <el-option label="已撤销" value="3" />
        <el-option label="已驳回" value="4" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="add">新建申请</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="list"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="approveCode" label="审批编号" min-width="220px" />
      <el-table-column prop="statusDesc" label="审批状态" min-width="140px">
        <template #default="{ row }">
          <Tag :color="stateColor[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="部门" min-width="200px">
        <template #default="{ row }">
          {{ row.deptList.map((item) => item.deptName).join('、') }}
        </template>
      </el-table-column>
      <el-table-column prop="entertainTime" label="招待时间" min-width="220px" />
      <el-table-column prop="meetingRoom" label="预定会议室" min-width="220px">
        <template #default="{ row }">
          {{ row.meetingRoom || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="会议时间" min-width="280px">
        <template #default="{ row }">
          {{ row.meetingStartTime ? row.meetingStartTime + ' - ' + row.meetingEndTime : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="joinNumStr" label="参与人数" min-width="180px" />
      <el-table-column prop="entertainTypeDesc" label="招待类型" min-width="180px">
        <template #default="{ row }">
          {{
            row.entertainTypeList &&
            row.entertainTypeList.map((item) => item.entertainTypeDesc).join('、')
          }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="payFileName" label="付款凭证" width="280px">
        <template #default="{ row }">
          <KeenFileUpload
            disabled
            ref="upload"
            v-model="row.payFileList"
            directory="externalReception"
            limit="9"
            :multiple="true"
            :isPublic="true"
            :showOperate="true"
            class="file-upload"
            accept=".jpg,.png,.jpeg"
          />
        </template>
      </el-table-column> -->
      <el-table-column prop="remark" label="备注" min-width="180px" />
      <el-table-column label="操作" width="60px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                workflowCode: row.workflowCode,
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
</template>

<script lang="ts" setup name="externalReception">
    import { PlatformApi, platformApi, processApi, ProcessApi } from '@/api/index';
  import useList from '@/views/lute-os/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';

  const router = useRouter();
  const meetingTime = ref<any[]>([]);
  const PAGE_SIZE = 10;
  const list = computed(() => {
    return (
      listData?.value?.entertainList?.map((item) => {
        return {
          ...item,
          payFileList: item.payFileList.map((i) => {
            return {
              ossKey: i.fileUrl,
              name: i.payFileName,
            };
          }),
        };
      }) || []
    );
  });
  const reset = () => {
    resetSearch();
    meetingTime.value = [];
  };
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
    resetSearch,
    refreshList,
    runQuery,
    // selectedKeys,
  } = useList<
    PlatformApi.PlatformEntertainQueryEntertainList.RequestBody,
    PlatformApi.PlatformEntertainQueryEntertainList.ResponseBody
  >({
    searchDefaults: {
      meetingEndTime: undefined,
      meetingStartTime: undefined,
      selectType: 'mine',
      approveCode: '',
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformEntertainQueryEntertainList,
  });
  const stateColor = ref({
    1: 'blue',
    2: 'green',
    3: 'gray',
    4: 'red',
  });
  const handleActions = (item) => {
    const { key, workflowCode } = item;
    if (key === 'view') {
      const path = router.resolve({
        name: 'externalReceptionDetail',
        query: {
          code: workflowCode,
          itemType: 22,
        },
      });
      router.push(path.href);
    }
  };

  const add = () => {
    router.push({ name: 'externalReceptionAdd' });
  };
</script>

<style scoped lang="scss">
  :deep(.el-table-fixed-column--left) {
    background-color: white !important;
  }

  :deep(.el-table-fixed-column--right) {
    background-color: white !important;
  }

  :deep(.el-upload-list--text) {
    max-width: 200px;
  }
  :deep(.upload-wrap) {
    display: none;
  }
  .status-tag {
    border: none;
    height: 28px;
  }
  :deep(.el-table__cell) {
    position: static !important;
  }
</style>
