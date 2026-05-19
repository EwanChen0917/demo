<template>
  <KeenList>
    <template #search>
      <el-input
        style="margin-right: 8px"
        v-model.trim="search.receiverEmail"
        placeholder="收件邮箱"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        style="margin-right: 8px"
        v-model.trim="search.sendEmail"
        placeholder="发件邮箱"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model.trim="search.memberName" placeholder="使用人" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model.trim="search.sendTime"
        type="date"
        placeholder="发送日期"
        value-format="YYYY-MM-DD"
        :disabled-date="(time) => time > new Date()"
      />
      <el-select v-model="search.tagCodeList" placeholder="标签" filterable clearable multiple>
        <el-option
          v-for="item in tagList"
          :key="item.tagCode"
          :label="item.tagDesc"
          :value="item.tagCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button type="primary" @click="$router.push('/emailHistory/batchSearch')">
        批量查询
      </el-button>
      <ExportBtn :ignore-app-code="true"
        ref="exportRef"
        :service="exportFn"
        :params="search"
        @before-export="beforeExport"
        manual
      >
        导出
      </ExportBtn>
      <!-- <el-button plain type="primary">导出</el-button> -->
    </template>
    <!--    {{ listData?.metaEmailList }}-->
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.metaEmailList" row-key="id">
      <el-table-column label="收件邮箱" prop="receiverEmail" min-width="200">
        <template #default="{ row }">
          <div v-if="row?.receiverEmailList?.length === 1">
            {{ row?.receiverEmail || '--' }}
            <Copy :content="row?.receiverEmail" />
          </div>
          <OverflowTooltip v-else :content="row?.receiverEmailList?.join(',')" />
          <div v-if="row.receiverOwnerName">{{ row.receiverOwnerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="发件邮箱" prop="sendEmail" min-width="200">
        <template #default="{ row }">
          <div>
            {{ row?.sendEmail || '--' }}
            <Copy :content="row?.sendEmail" />
          </div>
          <div v-if="row.sendOwnerName">{{ row.sendOwnerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="邮件主题" prop="subject" min-width="180">
        <template #default="{ row }">
          <OverflowTooltip :content="row.subject" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="摘要" prop="snippet" min-width="200">
        <template #default="{ row }">
          <OverflowTooltip :content="row.snippet" :line="3" />
        </template>
      </el-table-column>
      <el-table-column label="发送日期" prop="sendDate" min-width="100" />
      <el-table-column label="备注" prop="remark" min-width="120">
        <template #default="{ row }">
          <Tag v-if="row.remark" :color="row.remark === '最近7天已发送' ? 'yellow' : 'gray'">
            {{ row.remark }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" min-width="100">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-3">
            <Tag v-for="item in row?.tagList" :key="item.tagCode">{{ item?.tagDesc }}</Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '添加标签',
                key: 'addLabel',
                type: 'primary',
                row,
                permissionCode: '',
              },
              {
                label: '邮件内容',
                key: 'content',
                type: 'primary',
                row,
                permissionCode: '',
                hide: !row.hasContent,
              },
              {
                label: '申诉',
                key: 'appeal',
                type: [0, 3, 4].includes(row.appealStatus) ? 'primary' : 'info',
                row,
                hide: ![0, 1, 3, 4].includes(row.appealStatus),
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
  <EmailContentDialog ref="emailContentDialogRef" />
  <EditTagDialog
    v-if="visible"
    :visible="visible"
    :message-id="curMessageId"
    :receiver-email="curReceiverEmail"
    @close="visible = false"
    @save="handleSave"
  />
  <ExportDialog ref="exportDialogRef" @select="handleSelectExportType" />
  <AppealDialog
    v-if="appealVisible"
    :visible="appealVisible"
    :appealData="appealData"
    :status="appealStatus"
    @close="handleAppealClose"
  />
</template>

<script setup lang="ts" name="emailHistory">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { MetaApi, metaApi } from '@/api';
  import EmailContentDialog from '@/views/lute-os/emailHistory/components/emailContentDialog.vue';
  import { ElMessage } from 'element-plus';
  import EditTagDialog from '@/views/lute-os/emailHistory/components/editTagDialog.vue';
  import ExportDialog from '@/views/lute-os/emailHistory/components/exportDialog.vue';
  import AppealDialog from '@/views/lute-os/emailHistory/components/appealDialog.vue';

  const PAGE_SIZE = 10;

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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    MetaApi.LuteosMetaEmailQueryEmailList.RequestBody,
    MetaApi.LuteosMetaEmailQueryEmailList.ResponseBody
  >({
    searchDefaults: {
      sendEmail: undefined,
      receiverEmail: undefined,
      sendTime: undefined,
      tagCodeList: undefined,
      memberName: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaEmailQueryEmailList,
  });

  const emailContentDialogRef = ref();
  const visible = ref(false);
  const curMessageId = ref();
  const curReceiverEmail = ref();
  const appealVisible = ref(false);
  const appealData = ref({});
  const appealStatus = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'addLabel') {
      curMessageId.value = row?.messageId;
      curReceiverEmail.value = row?.receiverEmail;
      visible.value = true;
    }
    if (key === 'content') {
      const res = await metaApi.luteosMetaEmailQueryEmailContent({
        messageId: row?.messageId,
      });
      if (res?.content) emailContentDialogRef.value?.open(res?.content);
      else ElMessage.warning('暂无内容');
    }
    if (key === 'appeal') {
      appealData.value = {
        messageId: row?.messageId,
        receiverEmail: row?.receiverEmail,
        email: row?.sendEmail,
        hasUser: row?.hasUser,
        reason: [0, 3, 4].includes(row.appealStatus) ? '' : row?.reason,
      };
      appealStatus.value = row.appealStatus;
      appealVisible.value = true;
    }
  };

  const handleAppealClose = (reload) => {
    if (reload) {
      refreshList();
    }
    appealVisible.value = false;
  };

  const handleSave = () => {
    visible.value = false;
    refreshList();
    queryTag();
    // tableRef.value.clearSelection();
  };

  const tagList = ref([]);
  const queryTag = async () => {
    const res = await metaApi.luteosMetaEmailQueryTag({});
    tagList.value = res?.tagList;
  };
  queryTag();
  const exportDialogRef = ref();

  const beforeExport = () => {
    exportDialogRef.value.open();
  };
  const exportRef = ref();
  const exportFn = ref<any>(metaApi.luteosMetaEmailExportEmail);
  const handleSelectExportType = (value) => {
    if (value === '1') {
      exportFn.value = metaApi.luteosMetaEmailExportEmail;
    } else {
      exportFn.value = metaApi.luteosMetaEmailExportRepeatSendEmail;
    }
    nextTick(() => {
      exportRef.value.confirmExport();
    });
  };
</script>

<style scoped lang="scss"></style>
