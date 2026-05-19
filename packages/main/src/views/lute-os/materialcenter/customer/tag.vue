<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.labelName" placeholder="标签名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-select
        v-model="searchCreatorList"
        clearable
        filterable
        multiple
        placeholder="创建人"
        style="width: 250px; margin-left: 10px"
        @change="(val) => (search.creatorList = val.join(','))"
      >
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
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="handleAddTag">新建标签</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.fccLabelLevelList"
      @selection-change="handleSelectionChange"
      row-key="labelCode"
      class-name="table-row-dashed"
      default-expand-all
      :tree-props="{
        hasChildren: 'hasChildren',
        children: 'childInfoList',
      }"
      :expand-row-keys="expandRowKeys"
    >
      <el-table-column type="selection" width="60" align="left" />
      <el-table-column prop="name" label="标签名称" />
      <el-table-column prop="level" label="标签等级">
        <template #default="scope">{{ scope.row.level }}级</template>
      </el-table-column>
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="150" fixed="right">
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
  />
</template>

<script lang="ts" setup name="materialcenterCustomerTag">
    import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { fccApi, FccApi, memberApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import Tag from '@/components/Tag/index.vue';
  import TagModal from './Modal/tagModal.vue';

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
    FccApi.LuteosFccTagQueryFccLabelLevelList.RequestQuery,
    FccApi.LuteosFccTagQueryFccLabelLevelList.ResponseBody
  >({
    searchDefaults: {
      labelName: undefined,
      creatorList: undefined,
      labelType: 'fc_material',
    },
    pageSize: PAGE_SIZE,
    service: fccApi.luteosFccTagQueryFccLabelLevelList,
  });
  const searchCreatorList = ref([]);
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
      curRow.value = row;
      curRow.value.labelName = row.name;
    }
  };

  const handleAddTag = () => {
    tagVisible.value = true;
    curRow.value = {};
  };

  const reset = () => {
    resetSearch();
    searchCreatorList.value = [];
  };

  const tagVisible = ref(false);
  const closeModalRedact = (reload) => {
    if (reload) {
      runQuery();
    }
    tagVisible.value = false;
  };

  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };
</script>

<style scoped lang="scss">
  .batch-delete {
    justify-content: flex-end;
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
