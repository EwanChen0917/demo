<template>
  <KeenList>
    <template #search>
      <el-input
        style="margin-right: 8px"
        v-model.trim="search.emailKeyword"
        placeholder="发件邮箱/收件邮箱"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model.trim="search.nameKeyword" placeholder="提交人/邮箱使用人" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" placeholder="审核状态" filterable clearable>
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.emailAppealList" row-key="id">
      <el-table-column label="发件邮箱" prop="sendEmail" min-width="200">
        <template #default="{ row }">
          <div>
            {{ row?.sendEmail || '--' }}
            <Copy :content="row?.sendEmail" />
          </div>
          <div v-if="row.senderName">{{ row.senderName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="收件邮箱" prop="receiverEmail" min-width="230">
        <template #default="{ row }">
          <div>
            {{ row?.receiverEmail || '--' }}
            <Copy :content="row?.receiverEmail" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="邮件主题/发件时间" prop="subject" min-width="300">
        <template #default="{ row }">
          <div style="width: 290px">
            <OverflowTooltip :content="row.subject" :line="3" />
          </div>
          <div>{{ row.sendDate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="申诉原因" prop="reason" min-width="200">
        <template #default="{ row }">
          <div style="width: 190px">
            <OverflowTooltip :content="row.reason" :line="3" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提交人/提交日期" prop="sendEmail" min-width="150">
        <template #default="{ row }">
          <div>
            {{ row?.creatorName || '--' }}
          </div>
          <div>
            {{ row?.createTime || '--' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="100">
        <template #default="{ row }">
          <Tag :color="tagColor[row.status]">{{ row?.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column label="驳回原因" prop="approveReason" min-width="180">
        <template #default="{ row }">
          <div style="width: 170px">
            <OverflowTooltip :content="row.approveReason" :line="3" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '审核',
                key: 'approve',
                type: 'primary',
                row,
                hide: !row.approveType || row.approveType !== 'approve',
              },
              {
                label: '修改审核结果',
                key: 'approve',
                type: 'primary',
                row,
                hide: !row.approveType || row.approveType !== 'change',
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
  <el-dialog :title="appealTitle" :model-value="appealVisible" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="请选择审核结果" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="reason" v-if="form.status === 0">
        <el-input
          v-model="form.reason"
          type="textarea"
          :rows="5"
          :maxlength="100"
          show-word-limit
          placeholder="请输入驳回原因（非必填）"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">提交</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="appealManage">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { MetaApi, metaApi } from '@/api';
  import { ElMessage } from 'element-plus';

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
    MetaApi.LuteosMetaEmailQueryEmailAppealList.RequestBody,
    MetaApi.LuteosMetaEmailQueryEmailAppealList.ResponseBody
  >({
    searchDefaults: {
      emailKeyword: undefined,
      nameKeyword: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaEmailQueryEmailAppealList,
  });

  const tagColor = ref({
    1: 'purple',
    2: 'green',
    3: 'red',
    4: 'gray',
  });
  const statusList = ref([
    {
      value: 1,
      desc: '待审核',
    },
    {
      value: 2,
      desc: '已通过',
    },
    {
      value: 3,
      desc: '驳回',
    },
    {
      value: 4,
      desc: '已撤回',
    },
  ]);
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;

    if (key === 'approve') {
      form.value.reason = row.approveReason;
      form.value.appealCode = row.appealCode;
      appealTitle.value = row.approveType === 'approve' ? '审核' : '修改审核结果';
      appealVisible.value = true;
    }
  };
  const form = ref({
    status: '',
    reason: '',
    appealCode: '',
  });
  const appealVisible = ref(false);
  const appealTitle = ref('审核');
  const handleSave = async () => {
    const res = await metaApi.luteosMetaEmailOperateEmailAppeal({
      operateType: 'approve',
      reason: +form.value.status === 0 ? form.value.reason : '',
      appealCode: form.value.appealCode,
      status: form.value.status,
    });

    if (res) {
      ElMessage.success('操作成功');
      appealVisible.value = false;
      runQuery();
      form.value = {
        status: '',
        reason: '',
        appealCode: '',
      };
    }
  };
  const handleClose = () => {
    appealVisible.value = false;
    form.value = {
      status: '',
      reason: '',
      appealCode: '',
    };
  };
</script>

<style scoped lang="scss"></style>
