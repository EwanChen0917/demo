<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        style="width: 290px"
        v-model="search.keyword"
        placeholder="客户名称/客户编码/CRM客户编码"
        clearable
        @input="handleBlur"
        @blur="handleBlur"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
        <template #append>
          <BatchSearchPopover
            ref="batchSearchRef2"
            @search="handleBatchSearch2"
            @clear="handleBatchClear2"
          />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-tree-select
        ref="catTreeSelectRef"
        placeholder="客户归属组织"
        v-model="search.organizationDeptId"
        :data="deptTree"
        filterable
        clearable
        popper-class="picker-cat-tree-select"
        highlight-current
      />
      <DeptMember
        v-model="search.developCode"
        placeholder="开发人员"
        style="width: 218px"
        multiple
      />
      <DeptMember
        v-model="search.maintainCode"
        placeholder="维护人员"
        style="width: 218px"
        multiple
      />
      <el-select
        style="width: 164px"
        v-model="search.type"
        placeholder="客户类型"
        filterable
        clearable
        :teleported="true"
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="person of dickbook.b2b_client_type"
          :key="person.value"
          :label="person.desc"
          :value="person.value"
        />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.isReverseTax"
        placeholder="是否反向征税"
        clearable
      >
        <el-option :value="0" label="否" />
        <el-option :value="1" label="是" />
      </el-select>
      <el-select
        v-if="store.userInfo.source !== 1"
        style="width: 150px"
        v-model="search.status"
        placeholder="状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option :value="0" label="合作" />
        <el-option :value="1" label="终止" />
      </el-select>
      <el-select
        style="width: 150px"
        v-model="search.creditFlag"
        placeholder="是否信用额度管理"
        clearable
      >
        <el-option :value="0" label="否" />
        <el-option :value="1" label="是" />
      </el-select>
      <el-select
        style="width: 150px"
        v-model="search.cashCreditFlag"
        placeholder="是否现金额度管理"
        clearable
      >
        <el-option :value="0" label="否" />
        <el-option :value="1" label="是" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="batchUpdateDialogRef?.open">批量更新用户</el-button>
      <el-button
        class="button"
        type="primary"
        @click="
          () => {
            actionType = 2;
            importUpdateDialogRef?.open();
          }
        "
      >
        更新产品贴标
      </el-button>
      <el-button
        class="button"
        type="primary"
        @click="
          () => {
            actionType = 1;
            importUpdateDialogRef?.open();
          }
        "
      >
        新增产品贴标
      </el-button>
      <el-button class="button" type="primary" @click="add">新增客户</el-button>
      <ExportBtn
        :plain="false"
        :service="erpApi.luteosErpBaseB2BClientInfoDownTemplate"
        :params="search"
        :sync="true"
      >
        导出
      </ExportBtn>
    </template>
    <vxe-table
      border="inner"
      max-height="900px"
      v-loading="listLoading"
      :data="listData?.recordList"
    >
      <vxe-column field="code" title="客户编码" />
      <vxe-column field="crmCustomerCode" title="CRM客户编码" />
      <vxe-column field="name" title="客户名称" />
      <vxe-column field="typeDesc" title="客户类型" />
      <vxe-column field="organizationDeptName" title="客户归属组织" />
      <vxe-column field="orderSaleTypeDesc" title="客户渠道">
        <template #default="{ row }">
          {{ row?.orderSaleTypeDesc?.join('、') }}
        </template>
      </vxe-column>
      <vxe-column field="developer" title="开发人员" />
      <vxe-column field="maintainter" title="维护人员" />
      <vxe-column field="isReverseTaxDesc" title="是否反向征税" />
      <vxe-column field="shipper" title="状态">
        <template #default="{ row }">
          <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="creditFlagDesc" title="是否信用额度管理" width="134" />
      <vxe-column field="cashCreditFlagDesc" title="是否现金额度管理" width="134" />
      <vxe-column title="操作">
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
                hide: [1].includes(+row.status),
              },
              {
                label: '新增',
                key: 'addLabel',
                type: 'primary',
                text: true,
                row: row,
              },
              {
                label: '终止',
                key: 'pause',
                type: 'primary',
                text: true,
                hide: ![0].includes(+row.status),
                row: row,
              },
              {
                label: '合作',
                key: 'continue',
                type: 'primary',
                text: true,
                row: row,
                hide: ![1].includes(+row.status),
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <ImportUpdateDialog
    :title="`${actionType === 1 ? '新增' : '更新'}产品贴标`"
    notice="上传用于生成需求建议，请认真检查文件数据"
    :downloadParams="search"
    type="label"
    ref="importUpdateDialogRef"
    :actionType="actionType"
    @success="refreshList"
  />
  <ImportUpdateDialog
    title="更新用户"
    notice="请注意标黄必填字段，未填写必填字段将上传失败"
    :downloadParams="search"
    type="batchUpdate"
    ref="batchUpdateDialogRef"
    @success="refreshList"
  />
  <AddLabelDialog ref="addLabelDialogRef" />
</template>

<script lang="ts" setup name="B2BCustomer">
  import { erpApi, ErpApi, memberApi, platformApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import AddLabelDialog from '@/views/supplyChainManage/B2BOrder/B2BCustomer/components/addLabelDialog.vue';
  import ImportUpdateDialog from './components/importUpdateDialog.vue';

  const actionType = ref('');
  const importUpdateDialogRef = ref();
  const batchUpdateDialogRef = ref();
  const store = useStore();
  const colorMap = {
    0: 'green',
    1: 'red',
  };
  const router = useRouter();
  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };
  const batchSearchRef2 = ref();
  const handleBlur = (e) => {
    if (e && e?.length >= 2) {
      search.customerKeys = undefined;
      batchSearchRef2.value?.clear();
    }
  };
  const addLabelDialogRef = ref(null);
  const handleBatchClear2 = (val) => {
    // console.log('handleBatchClear2');
    search.customerKeys = [];
  };
  const handleBatchSearch2 = (val) => {
    search.keyword = undefined;
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    // console.log(arr);
    if (arr.length === 0) {
      ElMessage.warning('请输入客户名称/客户编码/CRM客户编码');
      return;
    }
    search.customerKeys = arr;
  };

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
  } = useList<
    ErpApi.LuteosErpBaseB2BClientQueryList.RequestBody,
    ErpApi.LuteosErpBaseB2BClientQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: code,
      type: undefined,
      status: undefined,
      developCode: undefined,
      maintainCode: undefined,
      organizationDeptId: undefined,
      isReverseTax: undefined,
      creditFlag: undefined,
      cashCreditFlag: undefined,
      customerKeys: [], // 客户编码数组
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseB2BClientQueryList,
  });
  const dickbook: any = ref({
    b2b_client_type: [],
  });
  const initDickbook = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['b2b_client_type'],
    });
    dickbook.value.b2b_client_type = res.dictMap.b2b_client_type;
  };
  const add = () => {
    const path = router.resolve({
      name: 'B2BCustomerAdd',
    });
    router.push(path.href);
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'B2BCustomerDetail',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({
        name: 'B2BCustomerEdit',
        query: { code: row.code },
      });
      router.push(path.href);
    } else if (key === 'pause') {
      changeStatus(row, '终止');
    } else if (key === 'continue') {
      changeStatus(row, '合作');
    } else if (key === 'addLabel') {
      addLabelDialogRef.value?.open(row?.code);
    }
  };
  const changeStatus = async (row, title: string) => {
    const res = await swal.confirm({
      title: `确认${title}？`,
    });
    if (res) {
      await erpApi.luteosErpBaseB2BClientChangeStatus({
        code: row.code,
        status: row.status === 1 ? 0 : 1,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const deptTreeData = ref([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId: null });
    deptTreeData.value = res.deptInfoList;
  };
  queryDeptTree();

  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: level < 2 ? item.children?.map((subItem) => mapNode(subItem, level + 1)) : [],
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });

  onMounted(() => {
    initDickbook();
  });
</script>

<style scoped lang="scss">
  :deep(.el-descriptions__content),
  :deep(.el-descriptions__label) {
    color: #7e8299 !important;
    font-weight: normal !important;
  }
</style>
