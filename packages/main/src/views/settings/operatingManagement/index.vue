<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="企业名称/企业统一信用代码/法人"
        class="w-275px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.property" placeholder="账号属性" clearable style="width: 120px">
        <el-option label="主号" :value="0" />
        <el-option label="小号" :value="1" />
        <el-option label="备用号" :value="2" />
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.bigStatus"
        placeholder="经营状态"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="正常" :value="1" />
        <el-option label="异常" :value="2" />
        <!-- <el-option label="开业" :value="1" />
        <el-option label="停业" :value="2" />
        <el-option label="清算" :value="3" />
        <el-option label="存续" :value="4" />
        <el-option label="在业" :value="5" />
        <el-option label="吊销" :value="6" />
        <el-option label="注销" :value="7" />
        <el-option label="迁出" :value="8" />
        <el-option label="迁入" :value="9" /> -->
      </el-select>
      <el-select
        style="width: 120px"
        v-model="search.character"
        placeholder="公司性质"
        filterable
        clearable
        :teleported="false"
      >
        <el-option label="自有" :value="0" />
        <el-option label="购买" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">新增</el-button>
    </template>
    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
      max-height="900px"
    >
      <el-table-column min-width="140px" prop="name" label="企业名称" />
      <el-table-column min-width="160px" prop="unifiedSocialCreditCode" label="企业统一信用代码" />
      <el-table-column prop="companyLegalPerson" min-width="140px" label="法人" />
      <el-table-column prop="characterDesc" min-width="100px" label="公司性质" />
      <el-table-column prop="shopNum" min-width="120px" label="关联店铺数量">
        <template #default="{ row }">
          <el-button v-if="row.shopNum > 0" link type="primary" @click="showShopDetail(row)">
            {{ row.shopNum }}
          </el-button>
          <span v-else>{{ row.shopNum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" min-width="100px" label="经营状态">
        <template #default="{ row }">
          <Tag :color="row.statusDesc?.startsWith('正常') ? 'green' : 'red'">
            {{ row.statusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="propertyDesc" min-width="100px" label="账号属性" />
      <el-table-column label="操作" min-width="120px" fixed="right">
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
                label: '注销',
                key: 'del',
                type: 'danger',
                hide: row.status === 7,
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
  </KeenList>
  <ShopDialog ref="shopDialogRef" />
</template>

<script lang="ts" setup name="operatingManagement">
  import { ShopApi, shopApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import { encryptByBase64 } from '@/utils/aesTils';
  import ShopDialog from './components/shopDialog.vue';

  const statusColorMap = {
    1: 'green',
    2: 'red',
  };
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
  } = useList<
    ShopApi.LuteosShopBusinessQueryList.RequestQuery,
    ShopApi.LuteosShopBusinessQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
      property: undefined,
      character: undefined,
      bigStatus: undefined,
    },
    pageSize: PAGE_SIZE,
    service: shopApi.luteosShopBusinessQueryList,
  });

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({ name: 'operatingManagementDetail', query: { code: row.code } });
      router.push(path.href);
    } else if (key === 'edit') {
      const path = router.resolve({ name: 'operatingManagementEdit', query: { code: row.code } });
      router.push(path.href);
    } else if (key === 'del') {
      router.push({
        path: '/shoplist/delApply',
        query: {
          type: 3,
          code: row.code,
          shopList: encryptByBase64(
            JSON.stringify(row.shopItemList?.map((item) => item.shopAccount))
          ),
          name: row.name,
        },
      });
    }
  };
  const add = () => {
    const path = router.resolve({ name: 'operatingManagementAdd' });
    router.push(path.href);
  };
  const shopDialogRef = ref();
  const showShopDetail = (code: string) => {
    shopDialogRef.value.open(code);
  };
</script>

<style scoped lang="scss"></style>
