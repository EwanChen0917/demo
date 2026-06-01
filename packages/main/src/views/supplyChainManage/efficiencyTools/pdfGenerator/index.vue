<template>
  <div class="shop-performance">
    <KeenList
      @refresh="refreshList"
      @reset-search="reset"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <!-- <div class="date-picker-prepend" style="display: flex">
         <el-select v-model="search.searchType" class="w-100px">
            <el-option
              v-for="(val, key) in searchTypeMap"
              :value="Number(key)"
              :label="val"
              :key="key"
            />
          </el-select> -->
        <el-input
          class="w-200px"
          v-model="search.fileName"
          placeholder="文件名"
          clearable
          suffix-icon="search"
        />
        <!-- </div> -->
        <el-select
          v-model="search.fileType"
          placeholder="文件类型"
          :clearable="true"
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in riskList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <div class="date-picker-prepend">
          <el-select v-model="search.timeType" style="width: 100px">
            <el-option
              v-for="(val, key) in searchTimeTypeMap"
              :value="Number(key)"
              :label="val"
              :key="key"
            />
          </el-select>
          <el-date-picker
            v-model="time"
            class="w-225px"
            type="daterange"
            @change="handleChangeTime"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </div> -->
        <el-date-picker
          class="w-120"
          style="width: 250px"
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="上传开始时间"
          end-placeholder="上传结束时间"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date()]"
          @change="handleChangeTime"
        />
      </template>
      <template #search-actions>
        <div class="status-card d-flex flex-wrap gap-2">
          <!-- <el-upload
            class="upload-demo"
            drag
            :action="oss.host"
            :data="ossData"
            ref="uploaderRef"
            multiple
            :auto-upload="true"
            style="width: 95%"
            :before-upload="onBeforeUpdate"
            accept=".xml,.pdf"
            v-loading="loading"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              <em>点击选择文件</em>
              或拖拽到此处
            </div>
            <template #tip>
              <div class="el-upload__tip">
                <div>1.支持PDF和XML格式文件上传，单个文件最大50M</div>
                <div>2.支持多选文件</div>
              </div>
            </template>
          </el-upload> -->
        </div>
      </template>
      <template #buttons>
        <el-button type="primary" @click="handleImport">上传文件</el-button>
        <!-- <el-button
          type="primary"
          :loading="buttonTwoLoading"
          @click="handleClickBtns(2)"
          :disabled="!checkList.length"
        >
          标记为已处理
        </el-button> -->
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList"
        row-key="code"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="40" /> -->
        <!-- <el-table-column label="文件名" prop="fileName" min-width="220" /> -->
        <el-table-column label="文件名" prop="fileName" min-width="220">
          <template #default="{ row }">
            <OverflowTooltip :content="row?.fileName" :line="1" :font-size="12" />
          </template>
        </el-table-column>
        <el-table-column label="文件类型" prop="fileType" min-width="100" />
        <el-table-column label="大小" prop="fileSizeDesc" min-width="120" />
        <el-table-column label="上传时问" prop="uploadTime" min-width="170" />
        <el-table-column label="URL链接" prop="url" min-width="300">
          <template #default="{ row }">
            <!-- {{ row.url }} -->
            <el-link type="primary" :href="row.url" target="_blank" style="max-width: 290px">
              <OverflowTooltip :content="row?.url" :line="1" :font-size="12" />
            </el-link>
            <Copy :content="row.url" />
          </template>
        </el-table-column>
        <el-table-column label="链接生成时间" prop="createTime" min-width="170" />
        <el-table-column label="操作人" prop="operatorName" min-width="100" />
        <!-- <el-table-column label="备注" prop="remark">
          <template #default="{ row }">
            <div style="display: flex; align-items: flex-end">
              <OverflowTooltip :content="row.remark" :line="2" />
              <i class="iconfont icon-bianji" @click="handleOpenDialog(row, 3)"></i>
            </div>
            <span v-if="row.noHandlerReason" style="color: #bec0bf">无需处理的原因：</span>
            <OverflowTooltip :content="row.noHandlerReason" :line="2" />
          </template>
        </el-table-column> -->
        <el-table-column label="操作" fixed="right" min-width="140">
          <template #default="scope">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  row: scope.row,
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
    <!-- <ResultDialog ref="ResultDialogRef" @success="refreshList"></ResultDialog> -->
    <ImportDialog ref="importDialogRef" @success="refreshList" />
  </div>
</template>

<script setup lang="ts" name="pdfGenerator">
  import useList from '@/hooks/list/useList';
  // import ResultDialog from './components/ResultDialog.vue';
  import { amazonApi, AmazonApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import ImportDialog from './components/importDialog.vue';
  import * as swal from '@/utils/swal';

  const route = useRoute();

  const importDialogRef = ref();
  const handleImport = () => {
    importDialogRef.value.open();
  };

  const statusTag = {
    0: 'red',
    1: 'yellow',
    2: 'green',
    3: 'blue',
  };

  // const ResultDialogRef = ref();

  const time: any = ref([]);
  const PAGE_SIZE = 10;

  const riskList = [
    { label: 'pdf', value: 'pdf' },
    { label: 'xml', value: 'xml' },
  ];

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
  } = useList<
    AmazonApi.LuteosAmazonFileQueryList.RequestQuery,
    AmazonApi.LuteosAmazonFileQueryList.ResponseBody
  >({
    searchDefaults: {
      fileName: undefined,
      uploadStart: undefined,
      uploadEnd: undefined,
      fileType: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: amazonApi.luteosAmazonFileQueryList,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    // console.log('item', item);
    if (key === 'log') {
      // console.log(item.row, item.row.productSpu);
      // logDialogRef.value?.open(item.row);
    } else if (key === 'delete') {
      const isConfirmed = await swal.confirm(`确认删除该数据吗？删除后,数据从记录中移除`);
      // return;
      if (isConfirmed) {
        await amazonApi.luteosAmazonFileDelete({
          codes: [row.code],
        });
        ElMessage.success('删除成功');
        refreshList();
      }
    }
  };

  // const statisticsInfo = ref({});
  // const getStateStatisticsList = async () => {
  //   let res: any = await shopApi.luteosShopPerformanceStateStatistics();
  //   statisticsInfo.value = res;
  // };
  // getStateStatisticsList();

  const reset = () => {
    time.value = [];
    resetSearch();
  };

  const checkList = ref([]);
  const handleSelectionChange = (list) => {
    checkList.value = list.map((item) => item.code);
  };

  onMounted(() => {
    // 钉钉待办查看详情 展示当前数据
    if (route.query) {
      search.code = route.query?.code;
    }
  });

  const handleChangeTime = (value) => {
    if (value?.length) {
      search.uploadStart = value[0];
      search.uploadEnd = value[1];
      return;
    }
    search.uploadStart = undefined;
    search.uploadEnd = undefined;
  };

  const handleStatusClick = (item) => {
    if (item.key == 3) {
      search.willExpire = true;
      search.status = undefined;
      return;
    }
    search.status = item.key;
    search.willExpire = undefined;
  };

  const dialogType = ref(-1);
  const handleOpenDialog = (row, type) => {
    dialogType.value = type;
    ResultDialogRef.value?.open(row);
  };
</script>

<style scoped lang="scss">
  .icon-bianji {
    cursor: pointer;
    margin-left: 2px;
    &:hover {
      color: var(--el-color-primary);
    }
  }

  .span-break {
    word-break: break-all;
  }

  .shop-performance {
    min-width: 360px;
  }
</style>
