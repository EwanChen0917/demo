<template>
  <KeenList>
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="媒体名称/媒体关键词/RPA关键词"
        style="width: 275px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 140px"
        v-model="mainCountryList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="主要流量国家"
        @change="
          (val) => {
            search.mainCountryList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in dictMap.product_site"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="levelList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="媒体量级"
        @change="
          (val) => {
            search.levelList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in dictMap.media_level"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="mediaTypeList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="媒体类型"
        @change="
          (val) => {
            search.mediaTypeList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in dictMap.media_type"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="contentTypeList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="内容类型"
        @change="
          (val) => {
            search.contentTypeList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in dictMap.content_type"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="search.hasContact"
        clearable
        filterable
        placeholder="是否有联系方式"
        style="width: 150px"
      >
        <el-option label="有" :value="1" />
        <el-option label="无" :value="0" />
      </el-select>
      <el-select
        v-model="creatorList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="录入人"
        @change="
          (val) => {
            search.creatorList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in memberList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
      <el-date-picker
        v-model="effectiveTime"
        start-placeholder="录入开始时间"
        end-placeholder="录入结束时间"
        type="datetimerange"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : '';
            search.endTime = dateArr ? dateArr[1] : '';
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="handleBatchOperate">批量操作</el-button>
      <ExportBtn :ignore-app-code="true"
        :service="mediaApi.luteosMediaExport"
        :params="exportParams"
        v-permission="'mediaBatchExport'"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.resultList"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column prop="agcName" label="媒体信息" min-width="150">
        <template #default="scope">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            :content="scope.row.mediaName"
          >
            <div class="ellipsis media-name" @click="goToDetail(scope.row)">
              {{ scope.row.mediaName }}
            </div>
          </el-tooltip>
          <div class="ellipsis link">{{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="mainCountry" label="主要流量国家" />
      <el-table-column prop="monthTraffic" label="月流量" />
      <el-table-column prop="mediaLevelDesc" label="媒体量级" />
      <el-table-column prop="mediaTypeDesc" label="媒体类型" />
      <el-table-column prop="contentTypeDesc" label="内容类型" />
      <el-table-column prop="keywords" label="媒体关键词" />
      <el-table-column prop="hasContact" label="联系方式有无">
        <template #default="scope">
          <div>{{ scope.row.hasContact ? '有' : '无' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="人员信息" min-width="150">
        <template #default="scope">
          <div>录入：{{ scope.row.creatorDesc || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="时间信息" min-width="150">
        <template #default="scope">
          <div>录入 {{ scope.row.createTime || '--' }}</div>
          <div>更新 {{ scope.row.updateTime || '--' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="80" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '标记',
                key: 'tag',
                type: 'primary',
                text: true,
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
  <MarkTag
    v-if="markTagVisible"
    :visible="markTagVisible"
    :info="curMarkInfo"
    :dictMap="dictMap"
    @close="handleMarkClose"
  />
  <BatchOperate
    v-if="batchOperateVisible"
    :visible="batchOperateVisible"
    :dictMap="dictMap"
    :mediaCodeList="mediaCodeList"
    @close="handleBatchOperateClose"
  />
</template>

<script lang="ts" setup name="medialist">
    import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { mediaApi, MediaApi, platformApi, memberApi } from '@/api/index';
  import { openWindow } from '@/utils';
  import MarkTag from './components/markTag.vue';
  import BatchOperate from './components/batchOperate.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    // searchData,
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
  } = useList<
    MediaApi.LuteosMediaQueryMediaResourcesList.RequestQuery,
    MediaApi.LuteosMediaQueryMediaResourcesList.ResponseBody
  >({
    searchDefaults: {
      contentTypeList: undefined,
      creatorList: undefined,
      endTime: undefined,
      hasContact: undefined,
      keyword: undefined,
      levelList: undefined,
      mainCountryList: undefined,
      mediaTypeList: undefined,
      startTime: undefined,
    },
    pageSize: PAGE_SIZE,
    service: mediaApi.luteosMediaQueryMediaResourcesList,
  });

  const mainCountryList = ref([]);
  const levelList = ref([]);
  const mediaTypeList = ref([]);
  const contentTypeList = ref([]);
  const creatorList = ref([]);
  const effectiveTime = ref([]);
  const memberList = ref([]);
  const exportParams = computed(() => {
    return {
      mainCountryList: mainCountryList.value,
      levelList: levelList.value.length ? levelList.value : undefined,
      mediaTypeList: mediaTypeList.value.length ? mediaTypeList.value : undefined,
      contentTypeList: contentTypeList.value.length ? contentTypeList.value : undefined,
      creatorList: creatorList.value.length ? creatorList.value : undefined,
      mediaCodeList: mediaCodeList.value.length ? mediaCodeList.value : undefined,
      startTime: search.startTime,
      endTime: search.endTime,
      hasContact: search.hasContact,
      keyword: search.keyword,
    };
  });
  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'all_dept' })
      .then((res: any) => {
        memberList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  const product_site = ref([
    {
      value: 'US',
      desc: 'US',
    },
    {
      value: 'UK',
      desc: 'UK',
    },
    {
      value: 'DE',
      desc: 'DE',
    },
    {
      value: 'FR',
      desc: 'FR',
    },
    {
      value: 'IT',
      desc: 'IT',
    },
    {
      value: 'ES',
      desc: 'ES',
    },
    {
      value: 'AU',
      desc: 'AU',
    },
    {
      value: 'CA',
      desc: 'CA',
    },
    {
      value: 'unknown',
      desc: '其他',
    },
  ]);
  const dictMap = ref({});
  const getOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['media_level', 'media_type', 'content_type'],
    });
    dictMap.value = res.dictMap || {};
    dictMap.value.product_site = product_site.value;
  };
  getOptions();

  const selectMedias = ref([]);
  const mediaCodeList = ref([]);
  const handleSelectionChange = (list) => {
    mediaCodeList.value = list.map((item) => item.mediaCode);
  };

  const goToDetail = (row) => {
    openWindow(`mediadetail?code=${row.mediaCode}`);
  };

  const markTagVisible = ref(false);
  const curMarkInfo = ref({});
  const handleMarkClose = (reload) => {
    if (reload) {
      runQuery();
    }
    markTagVisible.value = false;
    curMarkInfo.value = {};
  };

  const batchOperateVisible = ref(false);
  const handleBatchOperateClose = (reload) => {
    if (reload) {
      runQuery();
    }
    batchOperateVisible.value = false;
  };

  const handleBatchOperate = () => {
    batchOperateVisible.value = true;
  };

  // 表格操作
  const handleActions = (item) => {
    const { key, row } = item;

    if (key === 'tag') {
      markTagVisible.value = true;
      curMarkInfo.value = {
        mediaType: row.mediaType,
        keywords: row.keywords,
        contentType: row.contentType,
        mediaCode: row.mediaCode,
      };
    }
  };

  const reset = () => {
    resetSearch();
    mainCountryList.value = [];
    levelList.value = [];
    mediaTypeList.value = [];
    contentTypeList.value = [];
    creatorList.value = [];
    effectiveTime.value = [];
  };
</script>

<style scoped lang="scss">
  .ellipsis {
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的文本 */
    text-overflow: ellipsis; /* 显示省略号 */
    max-width: 150px; /* 列内容的最大宽度，根据需要调整 */
  }
  .link {
    color: #3e97ff;
    cursor: pointer;
  }

  .tag-margin {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .ml {
    margin-left: 5px;
  }

  .media-name {
    cursor: pointer;
  }
</style>
