<template>
  <el-tabs v-model="search.states" tab-position="top" @tab-change="tabChange">
    <el-tab-pane v-for="item in tabList" :key="item.key" :label="item.desc" :name="item.key" />
  </el-tabs>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="搜索通知标题" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.labelCodes"
        multiple
        collapse-tags
        :max-collapse-tags="1"
        placeholder="通知分类"
        clearable
      >
        <el-option
          v-for="item in allLabel"
          :key="item.labelCode"
          :label="item.labelName"
          :value="item.labelCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="handleActions({ key: 'create' })">
        发通知
      </el-button>
    </template>
    <ul class="list-section" v-loading="listLoading">
      <li class="list" v-for="item in listData?.notifyList" :key="item.notifyCode">
        <div class="d-flex align-items-center">
          <el-tag v-if="item.isTop" class="me-3" effect="dark" type="danger" size="small" round>
            置顶
          </el-tag>
          <div>
            <span class="text-gray-800 fs-4 fw-bold">{{ item?.title }}</span>
          </div>
        </div>
        <div class="notify-content fs-6 text-gray-800" v-html="item.content"></div>
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="d-flex align-items-center gap-6 fs-6 text-gray-600">
            <span v-if="item.labelCode">#{{ item.labelName }}#</span>
            <span>{{ item.author }}</span>
            <span v-if="search.states === State.draft">创建时间：{{ item.createTime }}</span>
            <span v-if="[State.publish, State.stock].includes(search.states || '')">
              发布时间：{{ item.publishTime }}
            </span>
            <span v-if="search.states === State.publish">更新时间：{{ item.updateTime }}</span>
            <el-tooltip
              v-if="item.state === State.pending"
              :content="item.scheduledTime"
              placement="top"
            >
              <div :style="{ cursor: 'pointer', display: 'flex', alignItems: 'center' }">
                <el-icon size="16"><AlarmClock /></el-icon>
              </div>
            </el-tooltip>
          </div>
          <div>
            <el-button
              text
              v-if="[State.draft, State.pending].includes(item.state!)"
              @click="handleActions({ key: 'publish', row: item })"
            >
              立即发布
            </el-button>
            <el-button text @click="handleActions({ key: 'edit', row: item })">编辑</el-button>
            <el-button
              text
              v-if="[State.publish].includes(item.state!)"
              type="danger"
              @click="handleActions({ key: 'stock', row: item })"
            >
              下架
            </el-button>
            <el-button
              text
              v-else
              type="danger"
              @click="handleActions({ key: 'delete', row: item })"
            >
              删除
            </el-button>
          </div>
        </div>
      </li>
    </ul>
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

<script lang="ts" setup name="LuteAssistantNotification">
    import { aiApi, type AiApi, type AiContracts } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { State } from './constant';

  const router = useRouter();
  const tabList = ref([
    { key: State.draft, desc: '草稿' },
    { key: State.publish, desc: '已发布' },
    { key: State.stock, desc: '已下架' },
    // { key: 3, desc: '定时发送' },
  ]);
  const searchDefaults = {
    keyword: undefined,
    labelCodes: undefined,
    states: 0,
  };
  const {
    runQuery,
    refreshList,
    search,
    listData,
    listLoading,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
  } = useList<AiApi.LuteosAiNotifyList.RequestQuery, AiApi.LuteosAiNotifyList.ResponseBody>({
    searchDefaults,
    interceptSearchData: (data) => {
      return {
        ...data,
        states: data.states === State.draft ? [State.draft, State.pending] : [data.states],
      };
    },
    service: aiApi.luteosAiNotifyList,
  });
  const handleActions = ({ key, row }: { key: string; row?: AiContracts.NotifyListBean }) => {
    switch (key) {
      // 新建
      case 'create':
        router.push({ name: 'LuteAssistantNotificationDetail' });
        break;
      case 'publish':
        aiApi
          .luteosAiNotifyState({
            notifyCode: row?.notifyCode || '',
            state: State.publish,
          })
          .then(() => {
            ElMessage.success('发布成功');
            refreshList();
          });
        break;
      case 'edit':
        router.push({
          name: 'LuteAssistantNotificationDetail',
          query: { notifyCode: row?.notifyCode },
        });
        break;
      case 'stock':
        aiApi
          .luteosAiNotifyState({
            notifyCode: row?.notifyCode || '',
            state: State.stock,
          })
          .then(() => {
            ElMessage.success('下架成功');
            refreshList();
          });
        break;
      case 'delete':
        handleDelete(row);
        break;
      default:
        break;
    }
  };
  const handleDelete = async (row?: AiContracts.NotifyListBean) => {
    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;
    await aiApi.luteosAiNotifyState({
      notifyCode: row?.notifyCode || '',
      state: State.delete,
    });
    ElMessage.success('删除成功');
    refreshList();
  };
  const tabChange = (val: number) => {
    searchDefaults.state = val;
  };

  const allLabel = ref<AiContracts.NotifyAllLabelBean[]>([]);
  aiApi.luteosAiNotifyAllLabel().then((res) => {
    allLabel.value = res.labelList || [];
  });
</script>

<style lang="scss" scoped>
  .list-section {
    padding: 0;
    list-style: none;
    .notify-content {
      // 两行 省略
      margin-top: 1em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      p {
        margin: 0;
      }
    }
    .list {
      padding: 18px 0 0;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
    }
  }
</style>
