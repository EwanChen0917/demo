<template>
  <KeenList>
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="搜索折扣码/红人渠道账号/追踪码"
        clearable
        style="width: 300px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.channelCode" clearable filterable placeholder="红人渠道">
        <el-option
          v-for="item in channelList"
          :key="item.channelCode"
          :label="item.name"
          :value="item.channelCode"
        />
      </el-select>
      <el-select v-model="search.mappingStatus" clearable filterable placeholder="映射状态">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="search.creator" clearable filterable placeholder="推广人员">
        <el-option
          v-for="item in creatorList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="handleOneKeyEdit" :disabled="isEdit">
        一键编辑
      </el-button>
      <el-button class="button" type="primary" @click="handleOneKeySave" :disabled="!isEdit">
        保存编辑
      </el-button>
    </template>
    <el-table v-loading="listLoading" :data="listData?.mappingList" ref="xTable" max-height="65vh">
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column
        label="折扣码信息"
        prop="platformCode"
        min-width="150"
        :edit-render="{}"
        fixed
      >
        <template #default="{ row }">
          <div>
            <span class="fw-semibold text-gray-600 fs-7">折扣码&nbsp;</span>
            <span class="fw-semibold text-success">{{ row.markCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="平台" prop="platformName" min-width="100" />
      <el-table-column label="红人渠道" prop="channelCode" min-width="120">
        <template #default="{ row }">
          <div v-if="isEdit">
            <el-select v-model="row.channelCode" clearable filterable>
              <el-option
                v-for="item in channelList"
                :key="item.channelCode"
                :label="item.name"
                :value="item.channelCode"
              />
            </el-select>
          </div>
          <div v-else>
            {{ getAccountDesc(row.channelCode) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="红人渠道账号" prop="channelAccount" min-width="180">
        <template #default="{ row }">
          <div v-if="isEdit">
            <el-input style="width: 120px" v-model="row.channelAccount" />
          </div>
          <div v-else>
            {{ row.channelAccount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="映射状态" min-width="120px">
        <template #default="{ row }">
          <Tag :color="statusObj[row.mappingStatus] && statusObj[row.mappingStatus].color">
            {{ statusObj[row.mappingStatus].text }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="追踪码" min-width="200px">
        <template #default="{ row, $index }">
          <template v-if="isEdit">
            <div class="d-flex gap-4" style="flex-direction: column">
              <div>
                <span class="fw-semibold text-gray-600 fs-7">追踪编码&nbsp;</span>
                <div
                  class="d-flex gap-4"
                  style="margin-bottom: 4px"
                  v-for="(item, index) of row.trackingCodeList"
                  :key="$index + '-' + index"
                >
                  <div>
                    <el-input
                      style="width: 120px"
                      v-model="item.trackingCode"
                      placeholder="追踪编码"
                    />
                  </div>
                  <div
                    class="d-flex operation gap-2"
                    style="
                      flex-basis: 60px;
                      line-height: 40px;
                      align-items: center;
                      font-size: 18px;
                    "
                  >
                    <el-icon
                      @click="add(row.trackingCodeList)"
                      v-if="index + 1 === row.trackingCodeList.length"
                    >
                      <CirclePlus />
                    </el-icon>
                    <el-icon
                      v-if="item.id === '' && row.trackingCodeList.length > 1"
                      @click="row.trackingCodeList.splice(index, 1)"
                    >
                      <Remove />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="d-flex gap-2"
              style="flex-direction: column"
              v-if="row.trackingCodeList && row.trackingCodeList.length"
            >
              <div class="d-flex gap-4" v-for="(item, index) of row.trackingCodeList" :key="index">
                <div style="flex: 1">
                  <span class="fw-semibold text-gray-600 fs-7">追踪编码&nbsp;</span>
                  <ElTooltip
                    popper-class="action_tool_tip"
                    placement="top"
                    effect="light"
                    :disabled="item.trackingCode && item.trackingCode.length < 10"
                    :content="item.trackingCode"
                  >
                    <span
                      class="fw-semibold text-gray-600 over_elli"
                      style="display: inline-block; width: 100px; vertical-align: middle"
                    >
                      {{ item.trackingCode }}
                    </span>
                  </ElTooltip>
                </div>
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="人员信息" min-width="100px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">推广&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.creatorName }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">运营&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.operatorName }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间信息" min-width="190px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新人员&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.updatorName }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新时间&nbsp;</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.updateTime }}</span>
            </div>
          </div>
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

<script setup lang="ts" name="amazoncollectcodemap">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, commonApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';

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
  } = useList<
    MetaApi.LuteosMetaMappingQueryMetaMarkTrackingMapping.RequestQuery,
    MetaApi.LuteosMetaMappingQueryMetaMarkTrackingMapping.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channelCode: undefined,
      creator: undefined,
      mappingStatus: undefined,
    },
    pageSize: 10,
    service: metaApi.luteosMetaMappingQueryMetaMarkTrackingMapping,
  });

  const statusList = ref([
    { label: '有效', value: 1 },
    { label: '无效', value: 0 },
  ]);
  const statusObj = ref({
    1: {
      text: '有效',
      color: 'primary',
    },
    0: {
      text: '无效',
      color: 'purple',
    },
  });

  const getAccountDesc = (channelCode: string) => {
    const channel = channelList.value.find((item) => item.channelCode === channelCode);
    return channel?.name || '';
  };

  const creatorList = ref([]);
  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'all_dept',
      })
      .then((res: any) => {
        creatorList.value = res.memberList || [];
      });
  };
  queryDeptMemberOption();

  const channelList = ref([]);
  const queryChannelList = async () => {
    const res = await metaApi.luteosMetaQueryChannelList({
      pageNum: 1,
      pageSize: 100,
    });
    channelList.value = res.channelList || [];
  };
  queryChannelList();

  const reset = () => {};
  const isEdit = ref(false);
  const handleOneKeyEdit = () => {
    if (listData.value?.mappingList?.length) {
      isEdit.value = true;
    }
    listData.value?.mappingList?.forEach((row) => {
      row.trackingCodeList =
        row.trackingCodeList && row.trackingCodeList.length
          ? row.trackingCodeList.map((item) => {
              return {
                trackingCode: item.trackingCode,
                id: item.id,
              };
            })
          : [
              {
                trackingCode: '',
                id: '',
              },
            ];
    });
  };
  const handleOneKeySave = () => {
    const mappingList: any = [];
    listData.value?.mappingList?.forEach((row) => {
      const data: any = {
        channelAccount: row.channelAccount,
        channelCode: row.channelCode,
        mappingStatus: row.mappingStatus,
        markCode: row.markCode,
        markId: row.markId,
        platformCode: row.platformCode,
        trackingInfoBeanList:
          row.trackingCodeList?.filter((item) => item.trackingCode || item.id) || [],
      };
      mappingList.push(data);
    });
    if (mappingList.length) {
      metaApi
        .luteosMetaMappingUpdateMetaMarkTrackingMapping({
          updateMappingList: mappingList,
        })
        .then(() => {
          ElMessage.success('保存成功！');
          isEdit.value = false;
          runQuery();
        });
    }
  };

  const add = (trackingCodeList: any[]) => {
    trackingCodeList.push({
      trackingCode: '',
      id: '',
    });
  };
</script>

<style lang="scss" scoped>
  .batch-wrap {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .import-btn {
    background: #3e97ff !important;
  }

  .operation {
    .el-icon {
      cursor: pointer;
    }
  }
</style>
