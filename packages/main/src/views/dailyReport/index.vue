<template>
  <el-tabs v-model="curTab">
    <el-tab-pane label="写日报" name="write">
      <KeenCard title="关键指标">
        <div class="keyCard">
          <p v-for="(item, index) in draftForm.dailyInicatorBeanList" :key="index">
            {{ item?.indicator }}：{{ item?.desc }}
          </p>
        </div>
      </KeenCard>
      <KeenCard>
        <el-form label-position="top">
          <el-form-item>
            <template #label>
              今日工作内容：
              <span class="text-gray-500">({{ today }})</span>
            </template>
            <el-input v-model="draftForm.todayWorkContext" type="textarea" rows="15" />
          </el-form-item>
          <el-form-item label="明日工作计划:">
            <el-input v-model="draftForm.tomorrowWorkContext" type="textarea" rows="15" />
          </el-form-item>
          <el-form-item label="附件:">
            <KeenFileUpload v-model="draftFileList" directory="dailyReport" :multiple="true">
              <el-button type="primary">选择文件</el-button>
            </KeenFileUpload>
          </el-form-item>
        </el-form>
      </KeenCard>
      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <div style="text-align: right">
          <div class="d-flex">
            <el-button type="primary" @click="submit(0)">保存草稿</el-button>
            <el-button type="primary" class="w-100px" :loading="saveLoading" @click="submit(1)">
              提交
            </el-button>
          </div>
          <div class="text-gray-500 mt-3">最近提交时间：{{ form?.submitTime }}</div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="查看日报" name="read">
      <KeenCard>
        <el-space>
          <!--      执行层-->
          <el-check-tag :checked="selectTime === 'today'" @click="onChange('today')" size="large">
            今日
          </el-check-tag>
          <el-check-tag
            :checked="selectTime === 'yesterday'"
            @click="onChange('yesterday')"
            type="info"
          >
            昨日
          </el-check-tag>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            size="small"
            value-format="YYYY-MM-DD"
            @change="handleTimeChange"
            :disabled-date="(date) => dayjs(date).isAfter(dayjs(), 'date')"
          />
        </el-space>
      </KeenCard>
      <KeenCard title="关键指标">
        <div class="keyCard">
          <p v-for="(item, index) in form.dailyInicatorBeanList" :key="index">
            {{ item?.indicator }}：{{ item?.desc }}
          </p>
        </div>
      </KeenCard>
      <KeenCard>
        <el-form label-position="top">
          <el-form-item>
            <template #label>
              {{ timeMap[selectTime]?.desc }}工作内容：
              <span class="text-gray-500">({{ timeMap[selectTime]?.time || date }})</span>
            </template>
            <el-input v-if="editFlag" v-model="form.todayWorkContext" type="textarea" rows="15" />
            <vue3-markdown-it
              v-else
              class="report-content"
              :source="form?.todayWorkContext || '暂无数据'"
            />
          </el-form-item>
          <el-form-item label="明日工作计划:">
            <el-input
              v-if="editFlag"
              v-model="form.tomorrowWorkContext"
              type="textarea"
              rows="15"
            />
            <vue3-markdown-it
              v-else
              class="report-content"
              :source="form?.tomorrowWorkContext || '暂无数据'"
            />
          </el-form-item>
          <el-form-item label="附件:">
            <KeenFileUpload
              v-if="editFlag"
              v-model="fileList"
              ref="uploadRef"
              directory="dailyReport"
              :multiple="true"
            >
              <el-button type="primary">选择文件</el-button>
            </KeenFileUpload>
            <el-space v-else :size="16">
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
      <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="selectTime === 'today'">
        <div style="text-align: right">
          <div class="d-flex justify-content-end">
            <el-button type="primary" v-if="!editFlag" @click="editFlag = true">编辑</el-button>
            <el-button v-if="editFlag" @click="editFlag = false">取消</el-button>
            <el-button
              v-if="editFlag"
              type="primary"
              class="w-100px"
              :loading="saveLoading"
              @click="submit(1)"
            >
              保存
            </el-button>
          </div>
          <div class="text-gray-500 mt-3">最近提交时间：{{ form?.submitTime }}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="dailyReport">
  import dayjs from 'dayjs';
  import { dailyApi } from '@/api';
  import { DailyBean, DailyInicatorBean, DailySaveReq } from '@/api/daily/data-contracts';
  import { ElMessage } from 'element-plus';

  const curTab = ref('write');
  const selectTime = ref('today');
  const date = ref();
  const fileList = ref([]);
  const draftFileList = ref([]);
  const editFlag = ref(false);

  const timeMap = {
    today: {
      time: dayjs().format('YYYY-MM-DD'),
      desc: '今日',
    },
    yesterday: {
      time: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      desc: '昨日',
    },
  };

  const today = dayjs().format('YYYY-MM-DD');

  const draftForm = ref<DailyBean>({
    code: '',
    dailyAttachmentBeanList: [],
    status: 0,
    dailyInicatorBeanList: [],
    submitTime: '',
    todayWorkContext: '',
    tomorrowWorkContext: '',
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
  const queryReport = async (time = undefined) => {
    const res = await dailyApi.luteosDailyQuery({
      time,
    });
    if (time) {
      form.value = res;
      fileList.value.length = 0;
      res.dailyAttachmentBeanList?.forEach((item) => {
        fileList.value.push({
          percentage: 100,
          name: item?.attachmentName,
          ossKey: item.attachmentUrl,
          status: 'success',
        });
      });
    } else {
      draftForm.value = res;
      draftFileList.value.length = 0;
      res.dailyAttachmentBeanList?.forEach((item) => {
        draftFileList.value.push({
          percentage: 100,
          name: item?.attachmentName,
          ossKey: item.attachmentUrl,
          status: 'success',
        });
      });
    }
  };
  queryReport();
  queryReport(today);
  const onChange = (time) => {
    date.value = '';
    selectTime.value = time;
    queryReport(timeMap[time].time);
    console.log(selectTime.value);
  };

  const handleTimeChange = (val) => {
    if (val) {
      selectTime.value = '';
      queryReport(val);
    } else {
      selectTime.value = 'today';
      queryReport(today);
    }
    console.log(val);
  };

  const saveLoading = ref(false);

  // 保存草稿
  const submit = async (status) => {
    if (curTab.value === 'write') {
      draftForm.value.status = status;
      draftForm.value.dailyAttachmentBeanList = draftFileList.value?.map((item) => ({
        attachmentName: item.name,
        attachmentUrl: item.ossKey,
      }));
      await dailyApi.luteosDailySave(draftForm.value);
      ElMessage.success('保存成功');
      if (status === 0) {
        queryReport();
      } else {
        curTab.value = 'read';
        queryReport(today);
      }
    } else {
      form.value.status = status;
      form.value.dailyAttachmentBeanList = fileList.value?.map((item) => ({
        attachmentName: item.name,
        attachmentUrl: item.ossKey,
      }));
      await dailyApi.luteosDailySave(form.value);
      ElMessage.success('保存成功');
      editFlag.value = false;
      queryReport(today);
    }

    // queryReport(today);
  };

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
    padding: 9.5px 20px;
    font-weight: 500;
  }

  :deep(.el-input--small) {
    font-size: 13px;
  }

  .report-content {
    width: 100%;
    padding: 20px;
    background-color: #f9f9f9;
    margin-bottom: 10px;
  }
</style>
