<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="名称/型号">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.productMember"
        placeholder="产品经理"
        filterable
        clearable
        :teleported="false"
      >
        <el-option
          v-for="item in memberOptions"
          :key="item.memberCode"
          :label="item.name || ''"
          :value="item.memberCode!"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" @click="handleAdd" type="primary" v-permission="'packingadd'">
        新增包装SOP
      </el-button>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.packageList"
      row-key="packageCode"
      class-name="table-row-dashed"
    >
      <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
      <el-table-column label="SOP名称" prop="name" min-width="200px" />
      <el-table-column prop="model" label="型号" />
      <el-table-column prop="templateName" label="流程模板" />
      <el-table-column prop="productMemberName" label="产品经理" />
      <el-table-column prop="createTime" label="创建时间" width="180px" />
      <el-table-column label="操作" fixed="right" width="170px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                packageCode: row.packageCode,
                permissionCode: 'packingdetail',
              },
              {
                label: '删除',
                key: 'remove',
                type: 'danger',
                text: true,
                packageCode: row.packageCode,
                permissionCode: 'packingRemove',
              },
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                text: true,
                packageCode: row.packageCode,
                permissionCode: 'packingDownload',
              },
              {
                label: '发起审批',
                key: 'submit',
                type: 'primary',
                text: true,
                disabled: row.status === 3,
                packageCode: row.packageCode,
                permissionCode: 'packingApproval',
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
</template>

<script lang="ts" setup name="packinglist">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import useList from '@/hooks/list/useList';
  import { sopApi, pdtApi, PdtContracts, SOPApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';

  const PAGE_SIZE = 10;
  const router = useRouter();
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
    resetSearch,
    refreshList,
    runQuery,
    // selectedKeys,
  } = useList<
    SOPApi.LuteosSopQueryPackageList.RequestQuery,
    SOPApi.LuteosSopQueryPackageList.ResponseBody
  >({
    searchDefaults: {
      productMember: undefined,
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: sopApi.luteosSopQueryPackageList,
  });
  const memberOptions = ref<PdtContracts.MemberBean[]>([]);
  const getOperatorOptions = async () => {
    const res = await pdtApi.luteosPdtQueryOperatorList({
      operatorType: 1,
    });
    memberOptions.value = res.memberList as PdtContracts.MemberBean[];
  };
  getOperatorOptions();
  const route = useRoute();
  const handleAdd = () => {
    router.push(`/packinglist/add`);
  };

  const handleActions = (operate) => {
    const { key, packageCode } = operate;
    switch (key) {
      case 'view':
        router.push(`/packinglist/detail?packageCode=${packageCode}`);
        break;
      case 'download':
        download(packageCode);
        break;
      case 'submit':
        submit(packageCode);
        break;
      case 'remove':
        remove(packageCode);
        break;
      default:
        break;
    }
  };
  const download = async (packageCode: string) => {
    const res = await sopApi.luteosSopExportPackageInfo({ packageCode });
    const isConfirmed = await swal.confirm({
      title: '下载中，请前往下载任务中心查看。',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (!isConfirmed) return;
    router.push({
      path: '/downloadmanage',
      query: {
        app_code: res?.appCode,
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
    // urlDownload(res.fileUrl as string);
  };
  const remove = async (packageCode: string) => {
    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;
    await sopApi.luteosSopDeletePackage({ packageCode });
    ElMessage.success('删除成功');
    refreshList();
  };

  // 发起审批
  const submit = async (packageCode: string) => {
    const isConfirmed = await swal.confirm('确认发起审批吗');
    if (!isConfirmed) return;
    await sopApi.luteosSopSubmitPackage({ packageCode });
    ElMessage.success('发起审批成功');
    refreshList();
  };
</script>

<style scoped lang="scss">
  .logo-img {
    width: 100px;
    height: 100px;
  }
</style>
