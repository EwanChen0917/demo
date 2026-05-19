<template>
  <KeenList>
    <template #search>
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
      <el-input v-model.trim="search.receiverEmail" placeholder="红人邮箱" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model.trim="search.sendTime"
        type="date"
        placeholder="最近发送日期"
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
      <ExportBtn :ignore-app-code="true"
        ref="exportRef"
        :service="exportFn"
        :params="search"
        @before-export="beforeExport"
        manual
      >
        导出
      </ExportBtn>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.emailRepeatList" row-key="id">
      <el-table-column label="红人邮箱" prop="receiverEmail" min-width="200">
        <template #default="{ row }">
          {{ row.receiverEmail }}
          <Copy :content="row?.receiverEmail" />
        </template>
      </el-table-column>
      <el-table-column label="历史发件邮箱" prop="senderEmailList" min-width="200">
        <template #default="{ row }">
          <template v-if="row?.senderEmailList.length < 3">
            <div v-for="(item, index) in row?.senderEmailList" :key="index">
              {{ item }}
              <Copy :content="item" />
            </div>
          </template>
          <template v-else>
            <ElTooltip popper-class="action_tool_tip" placement="top" effect="light">
              <template #content>
                <div class="tool-content">
                  <div v-for="item in row?.senderEmailList" :key="item">
                    {{ item }}
                    <Copy :content="item" />
                    <br />
                  </div>
                </div>
              </template>
              <div>
                <div v-for="(item, index) in row?.senderEmailList" :key="index">
                  <div v-if="index < 2">
                    {{ item }}
                    <Copy :content="item" />
                  </div>
                  <div v-if="index === 2">...</div>
                </div>
              </div>
            </ElTooltip>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="邮件触达" prop="subject" min-width="100">
        <template #default="{ row }">
          <div>总触达：{{ row.repeatCount }}</div>
          <div>最近7天：{{ row.recentRepeatCount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="最近发送日期" prop="startDate" min-width="100" />
      <el-table-column label="标签" min-width="100">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-3">
            <Tag v-for="tag in row?.lableDescList" :key="tag">{{ tag }}</Tag>
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
              },
              {
                label: '往来邮件',
                key: 'history',
                type: 'primary',
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
  <EditTagDialog
    v-if="visible"
    :visible="visible"
    :receiver-email="curReceiverEmail"
    @close="visible = false"
    @save="handleSave"
  />
  <ExportDialog ref="exportDialogRef" @select="handleSelectExportType" />
</template>

<script setup lang="ts" name="emailTouch">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { MetaApi, metaApi } from '@/api';
  import { encryptByBase64 } from '@/utils/aesTils';
  import EditTagDialog from '@/views/lute-os/emailTouch/components/editTagDialog.vue';
  import ExportDialog from '@/views/lute-os/emailTouch/components/exportDialog.vue';

  const router = useRouter();
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
    MetaApi.LuteosMetaEmailQueryEmailRepeatList.RequestBody,
    MetaApi.LuteosMetaEmailQueryEmailRepeatList.ResponseBody
  >({
    searchDefaults: {
      sendEmail: undefined,
      receiverEmail: undefined,
      sendTime: undefined,
      tagCodeList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaEmailQueryEmailRepeatList,
  });

  const visible = ref(false);
  const curReceiverEmail = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'addLabel') {
      curReceiverEmail.value = row?.receiverEmail;
      visible.value = true;
    }
    if (key === 'history') {
      router.push({
        name: 'favourEmailHistory',
        query: {
          row: encryptByBase64(JSON.stringify(row)),
        },
      });
    }
  };

  const handleSave = () => {
    visible.value = false;
    refreshList();
    queryTag();
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
      exportFn.value = metaApi.luteosMetaEmailExportEmailRepeatList;
    } else {
      exportFn.value = metaApi.luteosMetaEmailExportRepeatSendEmail;
    }
    nextTick(() => {
      exportRef.value.confirmExport();
    });
  };
</script>

<style scoped lang="scss">
  .tool-content {
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
