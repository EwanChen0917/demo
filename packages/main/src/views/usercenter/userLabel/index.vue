<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyWord" placeholder="标签关键字" class="w-375px">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select placeholder="标签类型" v-model="search.type" clearable>
        <el-option label="单选项" value="1" />
        <el-option label="多选项" value="2" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="createLabel">新增标签</el-button>
    </template>
    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.tags"
      max-height="900px"
    >
      <el-table-column prop="groupName" label="组名称" />
      <el-table-column
        prop="tagNames"
        :formatter="
          (_, _1, cellValue) => {
            return cellValue.join('、');
          }
        "
        label="标签值"
      />
      <el-table-column prop="typeDesc" label="类型" />
      <el-table-column prop="userNum" label="人数">
        <template #default="{ row }">
          <el-popover placement="bottom" width="240px" trigger="click" @show="getUserDetail(row)">
            <div>
              <el-table :data="row.tagUserNums" size="small" max-height="400px">
                <el-table-column prop="tagName" label="标签值名称" />
                <el-table-column prop="userNum" align="right" label="人数" />
              </el-table>
            </div>
            <template #reference>
              <el-button type="primary" link>{{ row.userNum }}</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" width="180px" label="创建时间" />
      <el-table-column label="操作" width="160px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '删除',
                key: 'remove',
                type: 'primary',
                text: true,
                row: row,
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
    <LabelDialog ref="labelDialogRef" @success="refreshList" />
  </KeenList>
</template>

<script lang="ts" setup name="userLabel">
  import { userApi, UserApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import LabelDialog from './components/labelDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<UserApi.LuteosUserTagQuery.RequestQuery, UserApi.LuteosUserTagQuery.ResponseBody>({
    searchDefaults: {
      keyWord: undefined,
      type: undefined,
    },
    pageSize: PAGE_SIZE,
    service: userApi.luteosUserTagQuery,
  });
  const handleActions = async (operation) => {
    const { key, row } = operation;
    const path = router.resolve({
      name: 'userLabelDetail',
      query: { code: row.groupCode },
    });
    switch (key) {
      case 'view':
        router.push(path.href);
        break;
      case 'remove':
        removeLabel(row);
        break;
      case 'edit':
        labelDialogRef.value?.open(row);
        break;
      default:
        break;
    }
  };
  const removeLabel = async (row) => {
    const res = await swal.confirm({
      // title: `确认${title}`,
      title: '请确认',
      html: `
      <p>确定要删除标签吗？删除后无法恢复！</p>
      `,
    });
    if (res) {
      await userApi.luteosUserTagRemoveTag({
        groupCode: row.groupCode,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };
  const labelDialogRef = ref();
  const createLabel = () => {
    labelDialogRef.value?.open();
  };
  const getUserDetail = async (row) => {
    row.tagUserNums = [];
    const res = await userApi.luteosUserTagQueryTagUserNum({
      groupCode: row.groupCode,
    });
    if (res) {
      row.tagUserNums = res.tagUserNums;
    }
  };
</script>

<style scoped lang="scss"></style>
