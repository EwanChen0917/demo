<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" clearable placeholder="编码/名称" style="width: 300px">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.gtmPlList"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="编码" prop="gtmPlCode" min-width="100" />
      <el-table-column label="名称" prop="name" min-width="150" />
      <el-table-column label="GTM经理" prop="listGtmName" min-width="200">
        <template #default="{ row }">
          <Tag color="blue" size="small" v-for="tag in row?.listGtmName" :key="tag" class="mr5">
            {{ tag }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="GTM助理" prop="listAssistantName" min-width="200">
        <template #default="{ row }">
          <Tag
            color="blue"
            size="small"
            v-for="tag in row?.listAssistantName"
            :key="tag"
            class="mr5"
          >
            {{ tag }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              {
                label: '关联经理',
                key: 'contact',
                type: 'primary',
                row: row,
              },
              {
                label: '关联助理',
                key: 'assitant',
                type: 'primary',
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
    <AddModel
      v-if="modelVisible"
      :gtmPlCode="gtmPlCode"
      :visible="modelVisible"
      :title="title"
      @close="handleModelClose"
    />
    <contactModel
      v-if="contactModelVisible"
      :gtmPlCode="gtmPlCode"
      :visible="contactModelVisible"
      :title="contactTitle"
      :typeText="typeText"
      @close="handleModelClose"
    />
    <assitantModel
      v-if="assitantModelVisible"
      :gtmPlCode="gtmPlCode"
      :visible="assitantModelVisible"
      :title="contactTitle"
      :typeText="typeText"
      @close="handleModelClose"
    />
  </KeenList>
</template>

<script setup lang="ts" name="financeGTM">
  import useList from '@/hooks/list/useList';
  import { gtmApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddModel from './components/addModel.vue';
  import contactModel from './components/contactModel.vue';
  import assitantModel from './components/assitantModel.vue';

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
  } = useList<gtmApi.LuteosGtmPlQueryList.RequestBody, gtmApi.LuteosGtmPlQueryList.ResponseBody>({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: gtmApi.luteosGtmPlQueryList,
  });
  const modelVisible = ref<boolean>(false);
  const title = ref('新增品线');
  const contactTitle = ref('管理GTM经理');
  const contactModelVisible = ref<boolean>(false);
  const assitantModelVisible = ref<boolean>(false);

  const gtmPlCode = ref('');
  const typeText = ref('经理');
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'contact') {
      gtmPlCode.value = row.gtmPlCode;
      contactTitle.value = `管理GTM经理-${row.name}`;
      contactModelVisible.value = true;
      typeText.value = '经理';
    } else if (key === 'assitant') {
      gtmPlCode.value = row.gtmPlCode;
      contactTitle.value = `管理GTM助理-${row.name}`;
      assitantModelVisible.value = true;
      typeText.value = '助理';
    } else {
      gtmPlCode.value = row.gtmPlCode;
      title.value = '编辑品线';
      modelVisible.value = true;
    }
  };

  const add = () => {
    gtmPlCode.value = '';
    title.value = '新增品线';
    modelVisible.value = true;
  };

  const handleModelClose = (reload = false) => {
    console.log(reload);
    if (reload) {
      refreshList();
    }
    contactModelVisible.value = false;
    modelVisible.value = false;
    assitantModelVisible.value = false;
  };
</script>

<style scoped lang="scss">
  .mr5 {
    margin-right: 5px;
  }
</style>
