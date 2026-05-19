<template>
  <KeenCard>
    <el-space>
      <el-tree-select
        ref="catTreeSelectRef"
        placeholder="请选择部门"
        v-model="deptId"
        :data="deptTree"
        filterable
        clearable
        check-strictly
        popper-class="picker-cat-tree-select"
        highlight-current
      />
      <el-select v-model="dimensions" style="width: 100px">
        <el-option value="week" label="周维度" />
        <el-option value="day" label="日维度" />
      </el-select>
      <el-date-picker
        v-if="dimensions === 'week'"
        v-model="week"
        type="week"
        placeholder="选择周期"
        value-format="YYYY-MM-DD"
        format="YYYY年第ww周"
        @change="handleWeekChange"
        :disabled-date="(date) => dayjs(date).isAfter(dayjs(), 'date')"
      />
      <el-date-picker
        v-if="dimensions === 'day'"
        v-model="date"
        type="date"
        placeholder="选择日期"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
        :disabled-date="(date) => dayjs(date).isAfter(dayjs(), 'date')"
      />
    </el-space>
  </KeenCard>
  <KeenCard title="关键指标" v-if="form.dailyInicatorBeanList?.length > 0">
    <div class="keyCard">
      <p v-for="(item, index) in form.dailyInicatorBeanList" :key="index">
        {{ item?.indicator }}：{{ item?.desc }}
      </p>
    </div>
    <!--    <div v-else class="report-content">暂无数据</div>-->
  </KeenCard>
  <KeenCard title="日报内容">
    <el-form label-position="top">
      <vue3-markdown-it class="report-content" :source="form?.todayWorkContext || '暂无数据'" />
      <el-form-item label="附件:" v-if="form.dailyAttachmentBeanList?.length > 0">
        <el-space :size="16">
          <el-link
            v-for="item in form.dailyAttachmentBeanList"
            :key="item.attachmentUrl"
            @click="downloadFile(item.attachmentUrl)"
            :underline="false"
            type="primary"
          >
            {{ item.attachmentName }}
          </el-link>
        </el-space>
      </el-form-item>
    </el-form>
  </KeenCard>
</template>

<script setup lang="ts" name="dailyReportCheck">
  import dayjs from 'dayjs';
  import { memberApi, dailyApi } from '@/api';
  import { DailyBean, DailySaveReq } from '@/api/daily/data-contracts';
  import { ElMessage } from 'element-plus';

  const selectTime = ref('lastWeek');
  const date = ref();
  const week = ref();
  const fileList = ref([]);
  const deptId = ref();
  const timeBegin = ref(dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD'));
  const timeEnd = ref(dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD'));

  const dimensions = ref('week');

  const timeMap = {
    today: '今日',
    yesterday: '昨日',
    lastWeek: '上周',
    lastMonth: '上月',
    lastYear: '去年',
  };
  const onChange = (time) => {
    date.value = '';
    week.value = '';
    selectTime.value = time;
    if (time === 'yesterday') {
      timeBegin.value = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      timeEnd.value = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    } else if (time === 'lastWeek') {
      timeBegin.value = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD');
      timeEnd.value = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD');
    }
    queryReport();
  };

  const handleWeekChange = (val) => {
    if (val) {
      selectTime.value = '';
      date.value = '';
      timeBegin.value = val;
      timeEnd.value = dayjs(val).add(6, 'day').format('YYYY-MM-DD');
      queryReport();
    }
  };

  const handleTimeChange = (val) => {
    if (val) {
      selectTime.value = '';
      week.value = '';
      timeBegin.value = val;
      timeEnd.value = val;
    } else {
      selectTime.value = 'lastWeek';
      timeBegin.value = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD');
      timeEnd.value = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD');
    }
    queryReport();
    console.log(val);
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    console.log('deptTree', deptTree.value);
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  const form = ref<DailyBean>({
    code: '',
    dailyAttachmentBeanList: [],
    status: 0,
    dailyInicatorBeanList: [],
    submitTime: '',
    todayWorkContext: '',
    tomorrowWorkContext: '',
  });

  const queryReport = async () => {
    if (!deptId.value) {
      ElMessage.warning('请先选择部门');
      return;
    }
    const res = await dailyApi.luteosDailyQuerySum({
      deptId: deptId.value,
      timeBegin: timeBegin.value,
      timeEnd: timeEnd.value,
    });
    form.value = res || {};
    res.dailyAttachmentBeanList?.forEach((item) => {
      fileList.value.length = 0;
      fileList.value.push({
        percentage: 100,
        name: item?.attachmentName,
        ossKey: item.attachmentUrl,
        status: 'success',
      });
    });
  };

  watch(
    () => deptId.value,
    () => {
      queryReport();
    }
  );

  const downloadFile = (url) => {
    if (url) {
      window.open(url);
    }
  };
</script>

<style scoped lang="scss">
  .keyCard {
    width: 100%;
    //height: 50px;
    border-radius: 5px;
    background: #f9f9f9;
    padding: 20px;
  }

  :deep(.el-check-tag) {
    padding: 14px 20px;
    font-weight: 500;
  }

  :deep(.el-input--small) {
    font-size: 13px;
  }

  .report-content {
    padding: 20px;
    background-color: #f9f9f9;
    margin-bottom: 10px;
  }
</style>
