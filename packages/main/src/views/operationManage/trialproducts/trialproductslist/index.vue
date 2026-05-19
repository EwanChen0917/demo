<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyWord" placeholder="产品SKU名称/产品SKU">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <!--      <el-input v-model="search.productName" placeholder="商品名称">
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>-->
    </template>
    <template #filters>
      <!--      <el-input v-model="search.productCode" placeholder="商品SPU">
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>-->
      <el-select v-model="search.channelCode" placeholder="归属渠道" clearable :teleported="false">
        <el-option v-for="(val, key) in channelMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
      <el-select v-model="search.status" placeholder="状态" clearable :teleported="false">
        <el-option v-for="(val, key) in statusMap" :key="key" :label="val || ''" :value="key!" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd">新增试用商品</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.trialProducts"
      row-key="trialCode"
      class-name="table-row-dashed"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <!--      <el-table-column prop="productCode" label="SPU" />-->
      <el-table-column label="产品SKU信息" min-width="250">
        <template #default="scope">
          <GoodsInfo
            :src="scope.row.imageUrl"
            :title="scope.row.productName"
            :subtitle="scope.row.skuCode"
          />
        </template>
      </el-table-column>
      <el-table-column prop="channelCode" label="归属渠道">
        <template #default="scope">
          <span>{{ channelMap[scope.row.channelCode] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applicableUser" label="可申请对象">
        <template #default="{ row }">
          {{ row.applicableUser === 'all' ? '所有用户' : '完成任务用户' }}
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="试用数量" />
      <el-table-column prop="leftCount" label="剩余数量" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="endTime" label="结束时间" />
      <el-table-column label="状态">
        <template #default="scope">
          <span v-if="scope.row.status === 0" class="badge badge-light-info">
            {{ statusMap[scope.row.status] }}
          </span>
          <span v-else-if="scope.row.status == 1" class="badge badge-light-primary">
            {{ statusMap[scope.row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column label="操作">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                trialCode: scope.row.trialCode,
                channelCode: scope.row.channelCode,
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
  <AddModal v-if="addModalVisible" :visible="addModalVisible" @close="handleAddModalClose" />
</template>

<script lang="ts" setup name="trialproducts">
  import { ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { activityApi, ActivityApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import AddModal from './Modal/addTrialProducts.vue';

  const channelMap = reactive({
    shopify: '独立站',
    amazon: '亚马逊',
  });
  const statusMap = reactive({
    0: '关闭',
    1: '开启',
  });
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ActivityApi.LuteosActivityTrialQueryTrialProducts.RequestQuery,
    ActivityApi.LuteosActivityTrialQueryTrialProducts.ResponseBody
  >({
    searchDefaults: {
      productName: undefined,
      productCode: undefined,
      channelCode: undefined,
      status: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: activityApi.luteosActivityTrialQueryTrialProducts,
  });

  const route = useRoute();
  const router = useRouter();
  const { params } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  // 新增操作
  const addModalVisible = ref(false);
  const handleAdd = () => {
    addModalVisible.value = true;
  };
  const handleAddModalClose = (reload = false) => {
    addModalVisible.value = false;
    if (reload) {
      refreshList();
    }
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, trialCode, channelCode } = item;

    if (key === 'view') {
      sessionStorage.setItem('trialSearchInfo', JSON.stringify(search));
      router.push(
        `/trialproducts/detail?code=${encryptByBase64(trialCode)}&channelCode=${channelCode}`
      );
    }
  };
</script>

<style scoped lang="scss"></style>
