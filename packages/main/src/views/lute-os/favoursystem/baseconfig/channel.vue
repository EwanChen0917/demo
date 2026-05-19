<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="渠道名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="addChannel">新增渠道</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.channelList">
      <el-table-column label="渠道名称" prop="name" />
      <el-table-column label="渠道编码" prop="channelCode" />
      <el-table-column label="渠道描述" prop="desc" min-width="150px" />
      <el-table-column label="渠道链接" prop="channelLink">
        <template #default="{ row }">
          <div style="font-size: 12px">
            <template v-if="row.channelLink">
              <a target="_blank" :href="row.channelLink" style="margin-right: 4px">
                {{ row.channelLink }}
              </a>
              <i
                class="fas fa-copy text-hover-primary cursor-pointer"
                @click.stop="copyFn(row.channelLink, '')"
              ></i>
            </template>
            <template v-else>-</template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间信息">
        <template #default="{ row }">
          <div>
            <div>
              <span>创建时间&nbsp;</span>
              <span>{{ row.createTime }}</span>
            </div>
            <div>
              <span>更新时间&nbsp;</span>
              <span>{{ row.updateTime }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60px">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                row: row,
                type: 'primary',
              },
              {
                label: '查看',
                key: 'view',
                row: row,
                type: 'primary',
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
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      :before-close="closeDialog"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="100px"
        :disabled="disabledForm"
      >
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input
            v-model.trim="form.channelCode"
            placeholder="请输入渠道编码"
            clearable
            maxlength="100"
            :disabled="dialogType === 'edit'"
          />
        </el-form-item>
        <el-form-item label="渠道名称" prop="name">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入渠道名称"
            clearable
            maxlength="100"
          />
        </el-form-item>
        <el-form-item label="渠道描述" prop="desc">
          <el-input
            type="textarea"
            :rows="5"
            v-model.trim="form.desc"
            placeholder="请输入渠道描述"
            clearable
            maxlength="500"
          />
        </el-form-item>
        <el-form-item label="渠道链接" prop="channelLink">
          <el-input
            v-model.trim="form.channelLink"
            placeholder="请输入渠道链接"
            clearable
            maxlength="500"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            @click="confirm"
            :disabled="disabledForm"
            :loading="submitLoading"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </KeenList>
</template>

<script lang="ts" setup name="favourchannel">
    import { ElTable as ElTableType, ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { metaApi, MetaApi } from '@/api/index';
  import { copyFn } from '@/utils/copyFn';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    MetaApi.LuteosMetaQueryChannelList.RequestQuery,
    MetaApi.LuteosMetaQueryChannelList.ResponseBody
  >({
    searchDefaults: {
      channelCode: undefined,
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaQueryChannelList,
  });
  const dialogVisible = ref(false);
  const form = ref({});
  const formRef = ref();
  const rules = {
    name: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入渠道描述', trigger: 'blur' }],
    channelCode: [{ required: true, message: '请输入渠道编码', trigger: 'blur' }],
    channelLink: [{ required: true, message: '请输入渠道链接', trigger: 'blur' }],
  };
  const dialogType = ref('add');
  const dialogTitle = computed(() => {
    if (dialogType.value === 'add') {
      return '新增渠道';
    }
    if (dialogType.value === 'edit') {
      return '编辑渠道';
    }
    return '查看渠道';
  });
  const disabledForm = computed(() => dialogType.value === 'view');
  const addChannel = () => {
    dialogType.value = 'add';
    dialogVisible.value = true;
  };
  const handleActions = (command: any) => {
    const { key, row } = command;
    switch (key) {
      case 'edit':
      case 'view':
        dialogVisible.value = true;
        form.value = {
          ...row,
        };
        dialogType.value = key;
        break;
      default:
        break;
    }
  };
  const submitLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      submitLoading.value = true;
      const res = await metaApi.luteosMetaSaveChannelInfo(form.value).finally(() => {
        submitLoading.value = false;
      });
      submitLoading.value = false;
      if (res) {
        ElMessage.success('操作成功');
        dialogVisible.value = false;
        runQuery();
        closeDialog();
      }
    }
  };
  const closeDialog = () => {
    form.value = {
      name: '',
      channelLink: '',
      channelCode: '',
      desc: '',
    };
    formRef.value?.clearValidate();
    dialogVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
