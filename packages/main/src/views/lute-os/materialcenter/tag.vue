<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.labelName" placeholder="标签名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-tree-select
        :v-loading="loading"
        clearable
        node-key="categoryCode"
        style="width: 100%"
        v-model="search.categoryCode"
        :data="treeData"
        check-strictly
        :render-after-expand="false"
        placeholder="所属分类"
      />
      <el-select v-model="search.creator" clearable filterable placeholder="创建人">
        <el-option
          v-for="item in creatorList"
          :key="item.memberCode"
          :label="item.name"
          :value="item.memberCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="handleAddCategory">分类管理</el-button>
      <el-button class="button" type="primary" @click="handleAddTag">新建标签</el-button>
    </template>
    <div class="d-flex batch-delete">
      <el-space v-if="totalList?.length > 0" class="d-flex align-items-center">
        <div class="text-gray-600">
          已选择
          <span class="text-primary fw-bold">{{ totalList?.length }}</span>
          个标签
        </div>
        <el-button type="danger" @click="batchDel" size="small">删除</el-button>
      </el-space>
    </div>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.fccLabelList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="40" align="center" />
      <el-table-column prop="labelName" label="标签名称" />
      <el-table-column prop="categoryPath" label="所属分类" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <Tag v-if="scope.row.status === 1" color="blue" class="tag-margin">启用</Tag>
          <Tag v-else color="purple" class="tag-margin">禁用</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'primary',
                text: true,
                row: scope.row,
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

  <TagModal
    v-if="tagVisible"
    :visible="tagVisible"
    :info="curRow"
    @close-modal="closeModalRedact"
    :labelTypeInfo="labelTypeInfo"
  />

  <CategoryListModal
    v-if="categoryListVisible"
    :visible="categoryListVisible"
    @close-modal="handleCategoryModalClose"
    :scene="labelTypeInfo.scene"
  />
</template>

<script lang="ts" setup name="managerOfficeTag">
    import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { fccApi, FccApi, memberApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import Tag from '@/components/Tag/index.vue';
  import TagModal from './Modal/tagModal.vue';
  import CategoryListModal from './Modal/categoryListModal.vue';
  import { sceneList } from './config/index.ts';

  const route = useRoute();

  const labelInfo =
    sceneList.find((item) => {
      return route.name === item.tagComponentName;
    }) || {};

  const labelTypeInfo = ref({ ...labelInfo });

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    runQuery,
    resetSearch,
  } = useList<
    FccApi.LuteosFccTagQueryFccLabelList.RequestQuery,
    FccApi.LuteosFccTagQueryFccLabelList.ResponseBody
  >({
    searchDefaults: {
      labelName: undefined,
      categoryCode: undefined,
      creator: undefined,
      labelType: labelInfo.labelType,
    },
    pageSize: PAGE_SIZE,
    service: fccApi.luteosFccTagQueryFccLabelList,
  });

  const treeData = ref();
  const queryCategoryList = async () => {
    const res = await fccApi.luteosFccCategoryQueryFccCategoryList({ pageNum: 1, pageSize: 1000 });
    const data = res.fileCategoryList;
    deepTree(res.fileCategoryList);
    treeData.value = data;
  };
  queryCategoryList();
  const deepTree = (data) => {
    data.forEach((item) => {
      item.children = item.categoryBeanList;
      item.label = item.categoryName;
      item.value = item.categoryCode;
      if (item.categoryBeanList && item.categoryBeanList.length > 0) {
        deepTree(item.categoryBeanList);
      }
    });
  };

  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList || [];
  };
  getCreatorList();

  const curRow = ref({});

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;

    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await fccApi.luteosFccTagDeleteFccTag({
        labelCode: row.labelCode,
      });
      ElMessage.success('删除成功');
      runQuery();
    } else if (key === 'edit') {
      tagVisible.value = true;
      const labelList = [{ labelCode: row.labelCode, labelName: row.labelName }];
      curRow.value = row;
      curRow.value.labelList = labelList;
    }
  };

  const handleAddTag = () => {
    tagVisible.value = true;
    curRow.value = {};
  };

  const categoryListVisible = ref(false);
  const handleAddCategory = () => {
    categoryListVisible.value = true;
  };

  const tagVisible = ref(false);
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
    tagVisible.value = false;
  };

  const handleCategoryModalClose = () => {
    queryCategoryList();
    categoryListVisible.value = false;
  };

  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const batchDel = async () => {
    const isConfirmed = await swal.confirm('请确认是否要删除选中的标签？');
    if (!isConfirmed) return;
    fccApi
      .luteosFccTagDeleteFccTag({
        labelCodeList: totalList.value.map((item) => item.labelCode),
      })
      .then(() => {
        ElMessage.success('删除成功');
        runQuery();
      });
  };
</script>

<style scoped lang="scss">
  .batch-delete {
    justify-content: flex-end;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
