<template>
  <keenList :loading="listLoading" @refresh="runQuery">
    <template #search>
      <el-form v-model="search" label-width="100px">
        <el-row>
          <!-- <el-col :span="6">
            <el-form-item label="货权条件">
              <el-select v-model="search.authorityType" clearable>
                <el-option value="CHANNEL" label="渠道"></el-option>
                <el-option value="REGION" label="区域"></el-option>
                <el-option value="COUNTRY" label="国家"></el-option>
                <el-option value="SITE" label="站点"></el-option>
                <el-option value="SALESMAN" label="业务员"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="search.status" clearable>
                <el-option
                  v-for="item in poolStatusMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分配池编码">
              <el-input v-model="search.poolCode" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分配池名称">
              <el-input v-model="form.poolName" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #filters></template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleClickAdd">新增</el-button>
      <el-button class="button" type="primary" @click="handleClickSearch">查询</el-button>
    </template>
    <el-table :data="listData?.list" row-key="id" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column label="货权条件" min-width="260" prop="authorityTypeDesc" />
      <el-table-column label="具体值" min-width="600" prop="detail">
        <template #default="scope">
          <!-- <span v-if="search.authorityType === 'CHANNEL'" type="success">
            {{ scope.row.channelName }}
          </span>
          <span v-if="search.authorityType === 'REGION'" type="success">
            {{ scope.row.regionName }}
          </span>
          <span v-if="search.authorityType === 'COUNTRY'" type="success">
            {{ scope.row.countryName }}
          </span>
          <span v-if="search.authorityType === 'SITE'" type="success">
            {{ scope.row.siteName }}
          </span>
          <span v-if="search.authorityType === 'SALESMAN'" type="success">
            {{ scope.row.salesmanName }}
          </span> -->
          <span v-if="mapping[scope.row?.authorityType as string]">
            {{ scope.row[mapping[scope.row?.authorityType as string]] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200" prop="statusDesc" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleClickEnable(scope.row)">启用</el-button>
          <el-button type="text" size="small" @click="handleClickDisable(scope.row)">
            禁用
          </el-button>
          <!-- <el-button type="text" size="small" @click="handleClickDelete(scope.row)">删除</el-button> -->
          <el-button type="text" size="small" @click="handleClickEdit(scope.row)">编辑</el-button>
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
  </keenList>
  <StockPoolOwnerShipDialog
    ref="ownerShipDialogRef"
    :poolCode="search.poolCode"
    :poolName="form.poolName"
    :type="type"
    @success="refreshList"
  />
</template>

<script lang="ts" setup name="stockPoolOwnerManagement">
  import { CisApi, cisApi } from '@/api';
  // import { useRoute } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  // import * as swal from '@/utils/swal';
  import StockPoolOwnerShipDialog from './stockPoolOwnerShipDialog.vue';
  import { poolStatusMap } from '../config/pool';

  const route = useRoute();
  const form = reactive({
    poolName: '',
  });
  // const router = useRouter();
  const type = ref<'add' | 'edit'>('add');
  const ownerShipDialogRef = ref<any>(null);
  const handleClickAdd = () => {
    if (!ownerShipDialogRef.value) return;
    ownerShipDialogRef.value.open();
  };
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
    runQuery,
    // resetSearch,
  } = useList<
    CisApi.CisPoolAuthorityQueryList.RequestBody,
    CisApi.CisPoolAuthorityQueryList.ResponseBody
  >({
    searchDefaults: {
      poolCode: route.query.poolCode as string,
      authorityType: undefined, // 'CHANNEL',
      status: undefined,
    },
    pageSize: 10,
    pageNum: 1,
    service: cisApi.cisPoolAuthorityQueryList,
  });
  const mapping = {
    CHANNEL: 'channelName',
    REGION: 'regionName',
    COUNTRY: 'countryName',
    SITE: 'siteName',
    SALESMAN: 'salesmanName',
  };
  const handleSelectionChange = () => {};
  const getPoolData = async (poolCode: string) => {
    const res = (await cisApi.cisPoolDetail(poolCode)) as any;
    if (res && res.poolDetail) {
      search.poolCode = res.poolDetail.poolCode;
      form.poolName = res.poolDetail.poolName;
    }
  };
  const handleClickSearch = () => {
    runQuery();
  };
  const handleClickEnable = async (row: any) => {
    if (!row.id) return;
    await cisApi.cisPoolAuthorityEnable(row.id);
    ElMessage.success('启用成功');
    refreshList();
  };
  const handleClickDisable = async (row: any) => {
    if (!row.id) return;
    await cisApi.cisPoolAuthorityDisable(row.id);
    ElMessage.success('禁用成功');
    refreshList();
  };
  // const handleClickDelete = async (row: any) => {
  //   if (!row.id) return;
  //   const isConfirmed = await swal.confirm('确定要删除吗？');
  //   if (!isConfirmed) return;
  //   await cisApi.cisPoolAuthorityDelete(row.id);
  //   ElMessage.success('删除成功');
  //   refreshList();
  // };
  const handleClickEdit = (row: any) => {
    if (!row.id) return;
    type.value = 'edit';
    ownerShipDialogRef.value.open(row);
  };

  onMounted(() => {
    const poolCode = route.query.poolCode as string;
    if (poolCode) {
      getPoolData(poolCode);
    }
  });
  onActivated(() => {
    runQuery();
  });
</script>

<style lang="scss" scoped>
  :deep(.el-form-item__label) {
    // height: 0px;
    height: 32px;
    line-height: 32px;
    // flex-direction: column;
  }

  :deep(.el-form-item) {
    margin-bottom: 0px;
  }
</style>
