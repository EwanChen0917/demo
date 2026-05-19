<template>
  <div class="card">
    <div class="card-header border-0 pt-5" style="background: #fff; padding-bottom: 20px">
      <div class="card-toolbar" v-if="false">
        <template v-if="!selectionData.length">
          <LuteButton btn-style="light" type="primary" text="Export">
            <span class="svg-icon svg-icon-2">
              <SvgIcon icon="export" />
            </span>
          </LuteButton>
          <LuteButton type="primary" text="Add Customer" @click="AddVisible = true" />
        </template>
        <div class="d-flex justify-content-end align-items-center" v-if="selectionData.length">
          <div class="fw-bold me-5">
            <span class="me-2" data-kt-customer-table-select="selected_count">
              {{ selectionData.length }}
            </span>
            条数据选中
          </div>
          <LuteButton type="danger" text="删除" @click="deleteVisible = true" />
        </div>
      </div>
      <div class="card-title" style="flex: 1; align-items: center; justify-content: space-between">
        <div class="d-flex position-relative my-1">
          <LuteInput
            v-model="filterForm.keyword"
            placeholder="搜索"
            type="text"
            :isValidate="false"
            inputStyle="solid"
            @keydown.enter="enterKeyFn"
            :isShowSearchIcon="true"
          />
        </div>
        <div class="d-flex justify-content-sm-end">
          <LuteSelect
            v-model="filterForm.rootDeptId"
            placeholder="请选择部门"
            @change="getTableData"
            :options="options"
            select-style="solid"
          />
          <!-- <LuteButton type="primary" text="查询" @click="getTableData" /> -->
          <el-button type="primary" @click="getTableData">查询</el-button>
        </div>
      </div>
    </div>
    <Table
      :tableData="tableData"
      :pageInfo="pageInfo"
      @page-change="pagin"
      @selection-change="selectionChange"
    />
  </div>
  <EleConfirm v-if="deleteVisible" :visible="deleteVisible" @close-modal="deleteModalClose" />
  <AddModal v-if="AddVisible" :visible="AddVisible" @close-modal="deleteModalAdd" />
</template>

<script setup lang="ts" name="usermanage">
import EleConfirm from '@/components/EleConfirm/index.vue';
  import { baseStore } from '@/store/modules/baseStore';
  import { useStore } from '@/store/modules/useStore';
  import LuteSelect from '@/packages/select';
  import LuteInput from '@/packages/input';
  import LuteButton from '@/packages/button';
  import { memberApi } from '@/api';
  import AddModal from './Modal/addModal.vue';
  import Table from './Table/index.vue';

  const baseStoreFn = baseStore(); /*  */
  const { setTableLoading } = baseStoreFn;
  const useStoreFn = useStore();
  const { userInfo } = useStoreFn;

  const state = reactive<{
    filterForm: any;
    pageInfo: pageInfoItf;
    tableData: any;
    selectionData: any;
    deleteVisible: boolean;
    AddVisible: boolean;
    options: optionItf[];
  }>({
    filterForm: {
      rootDeptId: '',
      keyword: '',
    },
    pageInfo: {
      currentPage: 1,
      size: 10,
      total: 0,
    },
    tableData: [],
    selectionData: [],
    deleteVisible: false,
    AddVisible: false,
    options: [],
  });
  const { filterForm, pageInfo, tableData, selectionData, deleteVisible, AddVisible, options } =
    toRefs(state);

  memberApi.luteosMemberQuerySubDeptList({ parentId: 1 }).then((res) => {
    const list = res?.deptInfoList || [];
    if (list.length > 0) {
      options.value = [];
      list.map((item: any) => {
        options.value.push({ label: item.deptName, value: item.deptId });
      });
    }
  });

  filterForm.value.rootDeptId = userInfo.rootDeptId;

  const selectionChange = (data: any) => {
    selectionData.value = [...data];
  };

  const getTableData = () => {
    const { currentPage, size } = pageInfo.value;
    const { keyword, rootDeptId } = filterForm.value;
    const data: any = {
      pageNum: currentPage,
      pageSize: size,
      keyword,
      rootDeptId,
    };
    setTableLoading(true);
    memberApi.luteosMemberQueryMemberList(data).then((res) => {
      tableData.value = [...(res?.memberList || [])];
      pageInfo.value.total = res?.total || 0;
      setTableLoading(false);
    });
  };

  getTableData();

  const pagin = (type: string, data: number) => {
    type === 'curPage' && (pageInfo.value.currentPage = data);
    type === 'pagesize' && ((pageInfo.value.currentPage = 1), (pageInfo.value.size = data));
    getTableData();
  };

  const enterKeyFn = (val: string) => {
    filterForm.value.keyword = val;
    getTableData();
  };
  const deleteModalClose = (r?: 'reload') => {
    if (r == 'reload') {
    }
    deleteVisible.value = false;
  };

  const deleteModalAdd = (r?: 'reload') => {
    if (r == 'reload') {
    }
    AddVisible.value = false;
  };

  const resetDept = () => {
    filterForm.value.rootDeptId = userInfo.rootDeptId;
  };

  const elePopRef = ref();
  const submitFn = () => {
    elePopRef.value.hide();
    getTableData();
  };
</script>

<style lang="scss" scoped>
  .wid_185 {
    width: 185px;
    flex: 0 0 185px;
  }

  .card-toolbar {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
  }
</style>
