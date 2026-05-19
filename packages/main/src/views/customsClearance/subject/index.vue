<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #buttons>
      <el-button type="primary" @click="add" v-permission="'customsClearanceSubjectAdd'">
        新增
      </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="listData?.resultList"
      ref="xTable"
      max-height="65vh"
      row-key="code"
    >
      <el-table-column label="是否默认使用">
        <template #default="{ row }">
          <Tag :color="row.isDefault == 1 ? 'blue' : 'gray'" class="tag-margin">
            {{ row.isDefault == 1 ? '是' : '否' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="交易币种" prop="transactionCurrency" />
      <el-table-column label="公司名称" prop="companyName" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="联系方式" prop="phone" />
      <el-table-column label="印章" prop="fileName">
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="download(row.url, row.fileName)"
            v-if="row.url"
          >
            {{ row.fileName }}
          </el-link>
          <span v-else>{{ row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="口岸编码" prop="customsCode" />
      <el-table-column label="生产销售单位" prop="producerSeller" />
      <el-table-column label="生产销售单位代码" prop="producerSellerCode" />
      <el-table-column label="境内发货人" prop="domesticConsignor" />
      <el-table-column label="境内发货人代码" prop="domesticConsignorCode" />
      <el-table-column label="境外收货人" prop="foreignConsignee" />
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
                permissionCode: 'customsClearanceSubjectEdit',
              },
              {
                label: '设置默认',
                key: 'updateDefault',
                type: 'primary',
                row: row,
                hide: row.isDefault == 1,
                permissionCode: 'customsClearanceSubjectDefault',
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
    <!-- 新增 -->
    <addDialog
      v-if="addDialogShow"
      :visibility="addDialogShow"
      :code="code"
      @close="addDialogShow = false"
      @success="runQuery"
    />
  </KeenList>
</template>

<script setup lang="ts" name="customsClearanceSubject">
  import { type ErpApi, erpApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { download } from '@/utils/download';
  import addDialog from './components/addDialog.vue';

  const router = useRouter();

  const addDialogShow = ref(false);
  const code = ref();
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
    refreshList,
  } = useList<
    ErpApi.LuteosErpCustomsQueryDeclarationEntity.RequestQuery,
    ErpApi.LuteosErpCustomsQueryDeclarationEntity.ResponseBody
  >({
    pageSize: 10,
    service: erpApi.luteosErpCustomsQueryDeclarationEntity,
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      code.value = row.code;
      addDialogShow.value = true;
    } else if (key == 'updateDefault') {
      updateDefault(row);
    }
  };
  const add = () => {
    code.value = '';
    addDialogShow.value = true;
  };
  const updateDefault = async (row) => {
    const isConfirm = await swal.confirm('确认设置默认吗？');
    if (!isConfirm) return;
    // isDefault  为1是默认  0 取消默认
    const isDefault = row.isDefault == 1 ? 0 : 1;
    const res = await erpApi
      .luteosErpCustomsUpdateDefault({ code: row?.code, isDefault })
      .catch(() => {
        runQuery();
      });
    if (res) {
      ElMessage.success('设置成功');
      runQuery();
    }
  };
</script>

<style lang="scss" scoped>
  .import-btn {
    background: #3e97ff !important;
  }
</style>
