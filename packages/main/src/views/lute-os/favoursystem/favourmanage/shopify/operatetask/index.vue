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
      <el-cascader
        :options="labelOptions"
        v-model="search.markTag"
        clearable
        filterable
        :show-all-levels="true"
        placeholder="折扣标识"
        :props="{
          emitPath: false,
          expandTrigger: 'hover',
          multiple: false,
          checkStrictly: true,
          label: 'name',
          value: 'labelCode',
          children: 'childInfoList',
        }"
      />
      <el-select
        style="width: 120px"
        v-model="search.discountType"
        placeholder="折扣类型"
        clearable
      >
        <el-option :value="1" label="全站折扣" />
        <el-option :value="2" label="单品折扣" />
        <el-option :value="3" label="分类页折扣" />
      </el-select>
      <el-select style="width: 120px" v-model="search.taskType" clearable placeholder="任务类型">
        <el-option :value="1" label="新建" />
        <el-option :value="2" label="延期" />
        <el-option :value="4" label="大促配置" />
        <el-option :value="5" label="大促后配置" />
      </el-select>
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
      <DeptMember
        style="width: 120px"
        deptCode="red_station_operator"
        v-model="search.operateCode"
        clearable
        filterable
        placeholder="运营人员"
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="handleOneKeyCancel" v-if="showCancel">
        取消
      </el-button>
      <el-button class="button" type="primary" @click="handleOneKeyEdit" v-else>一键编辑</el-button>
      <el-button
        class="button"
        type="primary"
        @click="handleOneKeySave"
        :disabled="isDisabledOneKeySave"
      >
        保存编辑
      </el-button>
      <el-button type="primary" @click="configVisible = true">配置大促</el-button>
      <ExportBtn :ignore-app-code="true" :service="metaApi.luteosMetaExportMetaMarkStationTask" :params="search">
        导出
      </ExportBtn>
    </template>
    <Table
      ref="tableRef"
      :listData="listData?.taskList"
      :listLoading="listLoading"
      @refresh="runQuery"
      @selection-change="handleSelectionChange"
    />

    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="checkBeforeSizeChange"
      @current-change="checkBeforeCurrentChange"
    />
    <div class="batch-wrap" v-if="selections.length">
      <el-button class="button" type="primary" @click="batchHandleType(5, '生效')">
        批量生效
      </el-button>
      <el-button class="button" type="primary" @click="batchHandleType(10, '关停')">
        批量关停
      </el-button>
      <el-button class="button" type="primary" @click="batchHandleType(11, '作废')">
        批量作废
      </el-button>
      <el-button class="button" @click="cancelSelect">取消</el-button>
    </div>
  </KeenList>
  <SetConfig v-if="configVisible" :visible="configVisible" @close="configVisible = false" />
</template>

<script setup lang="ts" name="shopifyoperatetask">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, commonApi, platformApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
import SetConfig from '@/views/lute-os/favoursystem/favourmanage/shopify/operatetask/components/setConfig.vue';
  import Table from './components/table.vue';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const route = useRoute();
  const router = useRouter();
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
    refreshList,
    resetSearch,
  } = useList<
    MetaApi.LuteosMetaQueryMetaMarkTaskList.RequestQuery,
    MetaApi.LuteosMetaQueryMetaMarkTaskList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      channelCode: undefined,
      lineCode: undefined,
      taskStatus: undefined,
      operateCode: undefined,
      startTime: undefined,
      endTime: undefined,
      taskType: undefined,
      platformCode: 'station',
      markCode: query.markCode,
      markTag: undefined,
      discountType: undefined,
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

  const reset = () => {
    effectiveTime.value = [];
    resetSearch();
  };

  const selections = ref([]);
  const handleSelectionChange = (list) => {
    selections.value = list;
  };

  // 批量生效
  const batchHandleType = async (type, title) => {
    const isConfirmed = await swal.confirm(`确定批量${title}吗？`);
    if (!isConfirmed) return;

    let illegalList = [];

    if (type === 5) {
      illegalList = selections.value?.filter(
        (item) => item.status !== 1 && !['关停中', '已作废'].includes(item.markTagDesc)
      );
      if (illegalList.length) {
        ElMessage.warning('请勾选任务状态为“待办”或折扣码标识为关停中或已作废的数据');
        return;
      }
    }
    if (type === 10 || type === 11) {
      illegalList = selections.value?.filter((item) => item.status !== 2);
      if (illegalList.length) {
        ElMessage.warning('请勾选任务状态为已完成的数据');
        return;
      }
    }

    await metaApi.luteosMetaHandleMetaMarkTask({
      handleType: type,
      taskCodeList: selections.value?.map((item) => item.taskCode),
    });
    ElMessage.success(`批量${title}成功`);
    cancelSelect();
    runQuery();
  };

  const isDisabledOneKeySave = ref(true);
  const showCancel = ref(false);
  const handleOneKeyEdit = () => {
    listData.value?.taskList?.forEach((row) => {
      if (row.status === 1 || ['关停中', '已作废'].includes(row.markTagDesc)) {
        row.isEdit = true;
        isDisabledOneKeySave.value = false;
      }
    });
    showCancel.value = true;
  };

  const handleOneKeyCancel = () => {
    listData.value?.taskList?.forEach((row) => {
      if (row.status === 1 || ['关停中', '已作废'].includes(row.markTagDesc)) {
        row.isEdit = false;
        isDisabledOneKeySave.value = true;
      }
    });
    refreshList();
    showCancel.value = false;
  };

  const handleOneKeySave = () => {
    const markTaskList = [];
    listData.value?.taskList?.forEach((row) => {
      if (row.status === 1 || (['关停中', '已作废'].includes(row.markTagDesc) && row.isEdit)) {
        markTaskList.push({
          markCodeEndTimeStr: row.markCodeEndTime,
          markCodeStartTimeStr: row.markCodeStartTime,
          markCode: row.markCode,
          taskCode: row.taskCode,
          taskDiscount: row.taskDiscount,
          taskPromotionDiscount: row.taskPromotionDiscount,
          taskPromotionEndDiscount: row.taskPromotionEndDiscount,
          remark: row.operateRemark,
        });
      }
    });
    if (markTaskList.length) {
      metaApi
        .luteosMetaHandleMetaMarkTask({
          markTaskList,
          handleType: 6,
          platformCode: 'station',
        })
        .then(() => {
          ElMessage.success('保存成功！');
          listData.value?.metaMarkList?.forEach((row) => {
            row.isEdit = true;
          });
          showCancel.value = false;
          isDisabledOneKeySave.value = true;
          runQuery();
        });
    }
  };

  const labelOptions = ref([]);
  const queryLabelOptions = async () => {
    const res = await platformApi.platformLabelQueryLabelAllList({
      module: 'mark_tag',
    });
    labelOptions.value = res?.labelInfoList || [];
  };
  queryLabelOptions();

  // 配置大促
  const configVisible = ref(false);

  // 取消操作
  const tableRef = ref('');
  const cancelSelect = () => {
    tableRef.value.clearSelection();
  };

  const checkBeforeSizeChange = async (val) => {
    if (showCancel.value) {
      const isConfirmed = await swal.confirm('未保存编辑的数据，将先保存再修改表格展示数据条数');
      if (isConfirmed) {
        handleOneKeySave();
        pageSize.value = val;
      }
    } else {
      pageSize.value = val;
    }
  };
  const checkBeforeCurrentChange = async (val) => {
    if (showCancel.value) {
      const isConfirmed = await swal.confirm('未保存编辑的数据，将先保存再跳转页面');
      if (isConfirmed) {
        handleOneKeySave();
        current.value = val;
      }
    } else {
      current.value = val;
    }
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
  :deep(.el-cascader) {
    width: 160px;
    min-width: 160px;
  }
</style>
