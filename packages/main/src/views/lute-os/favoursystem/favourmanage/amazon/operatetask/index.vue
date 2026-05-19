<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="搜索折扣码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        style="width: 280px"
        v-model="effectiveTime"
        start-placeholder="折扣开始时间"
        end-placeholder="折扣结束时间"
        type="daterange"
        value-format="YYYY-MM-DD"
        @change="
          (dateArr) => {
            search.startTime = dateArr ? dateArr[0] : '';
            search.endTime = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-select
        style="width: 120px"
        v-model="search.taskStatus"
        clearable
        filterable
        placeholder="任务状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.taskType"
        clearable
        filterable
        placeholder="任务类型"
      >
        <el-option
          v-for="item in taskTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.operateCode"
        clearable
        filterable
        placeholder="运营人员"
      >
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
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleExport"
        v-if="selections.length"
        :loading="exportLoading"
      >
        导出
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleOneKeyEdit"
        :disabled="isDisabledOneKeyBtn"
      >
        一键编辑
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleOneKeySave"
        :disabled="isDisabledOneKeySave"
      >
        保存编辑
      </el-button>
      <KeenFileUpload
        ref="upload"
        v-model="fileList"
        directory="meta_mark_task"
        accept=".xlsx,.xls"
        limit="100"
        :showFileList="false"
        @success="handleUploadSuccess"
      >
        <el-button type="primary" :loading="importLoading" class="import-btn">导入</el-button>
      </KeenFileUpload>
      <el-button class="button" type="primary" @click="configMapVisible = true">
        配置映射表
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.taskList"
      ref="xTable"
      @selection-change="handleSelectionChange"
      max-height="65vh"
    >
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column
        label="折扣码信息"
        prop="platformCode"
        min-width="200px"
        :edit-render="{}"
        fixed
      >
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">折扣码&nbsp;</span>
              <el-input v-model="row.markCode" v-if="row.isEdit" />
              <span class="fw-semibold text-success" v-else>{{ row.markCode }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">店铺信息&nbsp;</span>
              <span class="fw-semibold text-gray-600">
                {{ row.platformCode + '-' + row.siteCode }}
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" min-width="180px">
        <template #default="{ row }">
          <div v-if="row.productLineList && row.productLineList.length">
            <template v-for="(item, index) in row.productLineList" :key="index">
              <div class="fw-semibold text-gray-600 fs-7 pe-10">
                <div>{{ item.lineName || '--' }}</div>
              </div>
            </template>
          </div>
          <div v-if="row.productInfoList && row.productInfoList.length">
            <template v-for="(item, index) in row.productInfoList" :key="index">
              <div class="fw-semibold text-gray-600 fs-7 pe-10">
                <div>{{ item.productName || '--' }}</div>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="推广备注" prop="remark" min-width="180px">
        <template #default="{ row }">
          <span class="fw-semibold text-gray-600">{{ row.remark || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" min-width="120px">
        <template #default="{ row }">
          <div v-if="statusObj[row.status]">
            <Tag size="large" :color="statusObj[row.status].color" :key="item">
              {{ statusObj[row.status].text }}
            </Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="任务类型" prop="taskTypeDesc" min-width="120px" />
      <el-table-column label="折扣码时间" min-width="220px">
        <template #default="{ row }">
          <div class="d-flex gap-2" style="flex-direction: column">
            <div>
              <span class="fw-semibold text-gray-600 fs-7">生效&nbsp;</span>
              <el-input
                v-model="row.markCodeStartTimeStr"
                v-if="row.isEdit"
                placeholder="生效时间"
              />
              <template v-else>
                <span class="fw-semibold text-gray-600">{{ row.markCodeStartTimeStr }}</span>
              </template>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">失效&nbsp;</span>
              <el-input v-model="row.markCodeEndTimeStr" v-if="row.isEdit" placeholder="失效时间" />
              <template v-else>
                <span class="fw-semibold text-gray-600">{{ row.markCodeEndTimeStr }}</span>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="追踪信息" min-width="200px">
        <template #default="{ row, $index }">
          <template v-if="row.isEdit">
            <div class="d-flex gap-4" style="flex-direction: column">
              <div>
                <span class="fw-semibold text-gray-600 fs-7">追踪编码&nbsp;</span>
                <div
                  class="d-flex gap-4"
                  style="margin-bottom: 4px"
                  v-for="(item, index) of row.tracklist"
                  :key="$index + '-' + index"
                >
                  <div>
                    <el-input
                      style="width: 120px"
                      v-model="item.taskTrackingCode"
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
                    <el-icon @click="add(row.tracklist)" v-if="index + 1 === row.tracklist.length">
                      <CirclePlus />
                    </el-icon>
                    <el-icon
                      v-if="item.id === '' && row.tracklist.length > 1"
                      @click="row.tracklist.splice(index, 1)"
                    >
                      <Remove />
                    </el-icon>
                  </div>
                </div>
              </div>
              <div class="d-flex" style="flex-direction: column; margin-bottom: 4px">
                <span class="fw-semibold text-gray-600 fs-7">链接&nbsp;</span>
                <el-input
                  style="width: 120px"
                  v-model="row.taskAttributionLink"
                  placeholder="链接"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="d-flex gap-2"
              style="flex-direction: column"
              v-if="row.trackInfoList && row.trackInfoList.length"
            >
              <div class="d-flex gap-4" v-for="(item, index) of row.trackInfoList" :key="index">
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
                <!-- <div style="flex: 1">
                  <span class="fw-semibold text-gray-600 fs-7">链接&nbsp;</span>

                  <ElTooltip
                    v-if="item.attributionLink"
                    popper-class="action_tool_tip"
                    placement="top"
                    effect="light"
                    :disabled="item.attributionLink && item.attributionLink?.length < 12"
                    :content="item.attributionLink"
                  >
                    <div
                      class="fw-semibold text-gray-600 over_elli"
                      style="display: inline-block; width: 100px; vertical-align: middle"
                    >
                      {{ item.attributionLink }}
                    </div>
                  </ElTooltip>
                  <div v-else>-</div>
                </div> -->
              </div>
              <div>
                <span class="fw-semibold text-gray-600 fs-7">链接&nbsp;</span>
                <span class="fw-semibold text-gray-600">{{ row.taskAttributionLink }}</span>
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="折扣力度" prop="taskDiscount" min-width="120px">
        <template #default="{ row }">
          <div>
            <el-input v-model="row.taskDiscount" v-if="row.isEdit" placeholder="折扣力度" />
            <span class="fw-semibold text-gray-600" v-else>{{ row.taskDiscount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="运营备注" prop="operateRemark" min-width="200px">
        <template #default="{ row }">
          <div>
            <el-input v-model="row.operateRemark" v-if="row.isEdit" placeholder="运营备注" />
            <span class="fw-semibold text-gray-600" v-else>{{ row.operateRemark || '--' }}</span>
          </div>
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
              <span class="fw-semibold text-gray-600 fs-7">创建&nbsp;</span>
              <span class="fw-semibold text-gray-600">{{ row.createTime }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新&nbsp;</span>
              <span class="fw-semibold text-gray-600">{{ row.updateTime }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '转办',
                key: 'transfer',
                type: 'primary',
                text: true,
                row: row,
                hide: !(row.status === 1 && row.operator === userInfo?.memberCode),
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
  <TransferModal
    v-if="transferVisible"
    :visible="transferVisible"
    :info="curRow"
    @close-modal="closeModalRedact"
  />
  <ConfigMapModal
    v-if="configMapVisible"
    :visible="configMapVisible"
    @close-modal="closeModalRedact"
  />
</template>

<script setup lang="ts" name="amazonoperatetask">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, commonApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useRequest } from 'vue-request';
  import { useStore } from '@/store/modules/useStore';
  import { openWindow } from '@/utils';
  import TransferModal from '../Modal/transfer.vue';
  import ConfigMapModal from '../Modal/configMap.vue';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const router = useRouter();
  const route = useRoute();
  const { query } = route;

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
    MetaApi.LuteosMetaQueryMetaMarkList.RequestQuery,
    MetaApi.LuteosMetaQueryMetaMarkList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channelCode: undefined,
      lineCode: undefined,
      taskStatus: 1,
      taskType: undefined,
      operateCode: undefined,
      startTime: undefined,
      endTime: undefined,
      platformCode: 'amazon',
      markCode: query.markCode,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryMetaMarkTaskList,
  });

  const effectiveTime = ref([]);

  const statusList = ref([
    { label: '待办', value: 1 },
    { label: '已完成', value: 2 },
    { label: '取消', value: 3 },
  ]);
  const taskTypeList = ref([
    { label: '新建', value: 1 },
    { label: '延期', value: 2 },
    { label: '重建', value: 3 },
  ]);
  const statusObj = ref({
    1: {
      text: '待办',
      color: 'yellow',
    },
    2: {
      text: '已完成',
      color: 'blue',
    },
    3: {
      text: '取消',
      color: 'purple',
    },
  });

  const selections = ref([]);
  const handleSelectionChange = (list) => {
    selections.value = list;
  };
  const handleExport = () => {
    const taskCodeList = [];
    selections.value.map((item: any) => {
      if (
        item.status === 1 &&
        item.taskType === 1 &&
        [item.operator].includes(userInfo?.memberCode)
      ) {
        taskCodeList.push(item.taskCode);
      }
    });
    if (!taskCodeList.length) {
      ElMessage.warning('请勾选：任务状态为待办，任务类型为新建且运营人员为本人的数据');
      return;
    }
    exportRun({
      taskCodeList,
      exportFlag: 1,
      taskStatus: 1,
      taskType: 1,
      platformCode: 'amazon',
    });
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    metaApi.luteosMetaExportMetaMarkTask,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  const creatorList = ref([]);
  const queryDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'red_operator' })
      .then((res: any) => {
        creatorList.value = res.memberList || [];
        creatorList.value.forEach((item: any) => {
          if (item.memberCode === userInfo.memberCode) {
            search.operateCode = item.memberCode;
          }
        });
      });
  };
  queryDeptMemberOption();

  const reset = () => {
    effectiveTime.value = [];
    resetSearch();
    creatorList.value.forEach((item: any) => {
      if (item.memberCode === userInfo.memberCode) {
        search.operateCode = item.memberCode;
      }
    });
  };
  const xTable = ref();
  const isDisabledOneKeyBtn = computed(() => {
    let count = 0;
    listData.value?.taskList?.forEach((row) => {
      if ([1, 2].includes(+row.status) && row.operator === userInfo?.memberCode) {
        count++;
      }
    });
    return count === 0;
  });
  const isDisabledOneKeySave = ref(true);
  const handleOneKeyEdit = () => {
    listData.value?.taskList?.forEach((row) => {
      if ([1, 2].includes(+row.status) && row.operator === userInfo?.memberCode) {
        row.tracklist =
          row.trackInfoList && row.trackInfoList.length
            ? row.trackInfoList.map((item) => {
                return {
                  taskAttributionLink: item.attributionLink,
                  taskTrackingCode: item.trackingCode,
                  id: item.id,
                };
              })
            : [
                {
                  taskAttributionLink: '',
                  taskTrackingCode: '',
                  id: '',
                },
              ];
        row.isEdit = true;
        isDisabledOneKeySave.value = false;
      }
    });
  };
  const handleOneKeySave = () => {
    const markTaskList = [];
    listData.value?.taskList?.forEach((row) => {
      if ([1, 2].includes(+row.status) && row.operator === userInfo?.memberCode && row.isEdit) {
        markTaskList.push({
          markCodeEndTimeStr: row.markCodeEndTimeStr,
          markCodeStartTimeStr: row.markCodeStartTimeStr,
          taskAttributionLink: row.taskAttributionLink,
          markCode: row.markCode,
          taskTrackingCode: row.taskTrackingCode,
          taskCode: row.taskCode,
          taskDiscount: row.taskDiscount,
          remark: row.operateRemark,
          trackList: row.tracklist.filter(
            (item) => item.taskTrackingCode || item.taskAttributionLink
          ),
        });
      }
    });
    if (markTaskList.length) {
      metaApi
        .luteosMetaHandleMetaMarkTask({
          markTaskList,
          handleType: 6,
          platformCode: 'amazon',
        })
        .then(() => {
          ElMessage.success('保存成功！');
          listData.value?.metaMarkList?.forEach((row) => {
            row.isEdit = true;
          });
          isDisabledOneKeySave.value = true;
          runQuery();
        });
    }
  };
  const curRow = ref({});
  const transferVisible = ref(false);
  const handleActions = (operation) => {
    const { key, row } = operation;
    curRow.value = row;
    if (key === 'transfer') {
      curRow.value.operator = userInfo?.memberCode;
      transferVisible.value = true;
    }
  };

  const configMapVisible = ref(false);
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
    transferVisible.value = false;
    configMapVisible.value = false;
  };

  // 文件上传
  const importLoading = ref(false);
  const fileList = ref<any[]>([]);
  const handleUploadSuccess = () => {
    // 获取文件信息
    const file = fileList.value[fileList.value.length - 1];
    importLoading.value = true;
    // 导入
    commonApi
      .luteosCommonFileImportData({
        fileName: file.name,
        importScene: 'meta_mark_task',
        key: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        runQuery();
        if (+res.failedCount > 0) {
          const isConfirmed = await swal.confirm({
            text: '有折扣码导入失败，具体请前往上传日志查看',
            icon: 'error',
            confirmButtonText: '去查看',
            cancelButtonText: '知道了',
          });
          if (!isConfirmed) return;
          openWindow('/salesForecastingLog');
        } else {
          ElMessage.success('导入成功');
        }
      })
      .finally(() => {
        importLoading.value = false;
      });
  };
  const add = (trackList: any[]) => {
    trackList.push({
      // taskAttributionLink: '',
      taskTrackingCode: '',
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
