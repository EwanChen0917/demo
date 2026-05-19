<template>
  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="runQuery">
    <template #search>
      <el-input
        v-model="search.brandReq.keyWord"
        placeholder="需求标题/需求内容"
        clearable
        style="width: 180px"
      />
    </template>
    <template #filters>
      <DeptMember style="width: 180px" v-model="search.brandReq.creator" placeholder="需求提出人" />
      <!-- 推广产品 -->
      <el-select
        v-model="search.brandReq.productName"
        placeholder="推广产品"
        filterable
        style="width: 180px"
        clearable
      >
        <el-option
          v-for="item in productList"
          :key="item.productCode"
          :label="item.productTitle"
          :value="item.productTitle"
        />
      </el-select>
      <!-- 品牌 -->
      <el-select
        v-model="search.brandReq.brandCode"
        placeholder="品牌"
        style="width: 180px"
        filterable
        clearable
      >
        <el-option
          v-for="item in brandList"
          :key="item.brandCode"
          :label="item.brandName"
          :value="item.brandCode"
        />
      </el-select>
      <!-- 需求类型 -->
      <el-select
        v-model="search.brandReq.demandTypeList"
        multiple
        placeholder="需求类型"
        style="width: 180px"
        clearable
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option v-for="(value, key) in DemandTypeMap" :key="key" :label="value" :value="key" />
      </el-select>
      <!-- 合作类型 -->
      <CooperationSelect
        v-model="search.brandReq!.cooperationTypeList"
        placeholder="合作类型"
        style="width: 180px"
        multiple
        clearable
      />
      <!-- 投放国家 -->
      <CountrySelect
        v-model="search.brandReq!.countryCode"
        placeholder="投放国家"
        clearable
        style="width: 180px"
      />
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.demandBRList"
      class-name="table-row-dashed"
      @sort-change="onSortChange"
    >
      <el-table-column label="需求标题" prop="demandTitle" fixed="left" width="200">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandTitle" placement="top-start">
            <a @click="goToDetail(row)" type="primary" class="text-ellipsis">
              {{ row.demandTitle }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求创建人" prop="creatorName" width="120" />
      <el-table-column label="需求创建时间" prop="createTime" width="150" sortable="custom" />
      <el-table-column label="期望完成时间" prop="expectFinishTime" width="150" sortable="custom">
        <template #default="{ row }">
          {{ row.expectFinishTime || '--' }}
        </template>
      </el-table-column>
      <!-- 推广产品、产品品牌、意向资源、需求类型、合作类型、投放国家、预估预算 -->
      <el-table-column
        label="推广产品"
        prop="productNameList"
        width="150"
        class="d-flex flex-wrap gap-2"
      >
        <template #default="{ row }">
          <div
            v-if="row.productNameList && row.productNameList.length"
            class="d-flex flex-wrap gap-2"
          >
            <el-tag v-for="item in row.productNameList" :key="item" type="primary" size="small">
              {{ item }}
            </el-tag>
          </div>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品品牌"
        prop="brandCodeList"
        width="150"
        class="d-flex flex-wrap gap-2"
      >
        <template #default="{ row }">
          <div v-if="row.brandCodeList && row.brandCodeList.length" class="d-flex flex-wrap gap-2">
            <el-tag v-for="item in row.brandCodeList" :key="item" type="primary" size="small">
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="意向资源" prop="resourceType" width="390">
        <template #default="{ row }">
          <div v-if="row.intentionResource && row.intentionResource.length">
            <el-tag
              v-for="(item, index) in row.intentionResource"
              :key="index"
              :type="['primary', 'success', 'warning', 'danger', 'info'][index % 5]"
              class="mr-1 mb-1"
              size="small"
            >
              {{ item }}
            </el-tag>
          </div>
          <span v-else>
            <el-tag type="info" size="small">暂无</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" prop="demandTypeDesc" width="140">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-2 w-100">
            <template v-if="row.demandTypeList && row.demandTypeList.length">
              <el-tag
                v-for="(item, index) in row.demandTypeList"
                :key="item"
                type="primary"
                size="small"
              >
                {{ item.demandTypeDesc || '--' }}
              </el-tag>
            </template>
            <span v-else-if="row.demandTypeDesc">{{ row.demandTypeDesc }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合作类型" prop="cooperationTypeDesc" width="140">
        <template #default="{ row }">
          <div class="d-flex flex-wrap gap-2 w-100">
            <template v-if="row.cooperationTypeList && row.cooperationTypeList.length">
              <el-tag
                v-for="(item, index) in row.cooperationTypeList"
                :key="item"
                type="primary"
                size="small"
              >
                {{ item.cooperationTypeDesc || '--' }}
              </el-tag>
            </template>
            <span v-else-if="row.cooperationTypeDesc">{{ row.cooperationTypeDesc }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="投放国家" prop="countryCodeDesc" width="150" />
      <el-table-column label="预估预算" prop="estimatedBudget" width="150">
        <template #default="{ row }">
          <OverflowTooltip
            :content="`${row?.estimatedBudget + (' ' + (row.currencyCode || 'USD'))}`"
            :line="1"
          />
        </template>
      </el-table-column>
      <el-table-column label="需求状态" prop="status" width="100">
        <template #default="{ row }">
          <el-tag type="primary">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="需求附件" prop="demandFileList" width="180">
        <template #default="{ row }">
          <div v-if="Array.isArray(row.demandFileList) && row.demandFileList.length">
            <div v-for="file in row.demandFileList" :key="file.fileCode" style="margin-bottom: 4px">
              <el-tooltip effect="dark" :content="file.fileName" placement="top-start">
                <a
                  href="javascript:void(0);"
                  @click="handleFileClick(file)"
                  style="cursor: pointer; color: #3e97ff"
                >
                  {{ file.fileName }}
                </a>
              </el-tooltip>
            </div>
          </div>
          <span v-else>-</span>
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
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    :key="fileUrl"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
  <SurveyFeedback />
</template>

<script lang="ts" setup name="brandDemandApproveExecute">
  import { platformApi, productApi } from '@/api';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { download } from '@/utils/download';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  import {
    DemandTypeMap,
    CooperationTypeMap,
    CountryMap,
  } from '@/views/lute-os/brandDemandMange/constants';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  import CooperationSelect from '@/views/lute-os/brandDemandMange/components/CooperationSelect.vue';
  const router = useRouter();

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
  } = useList({
    searchDefaults: {
      demandModule: 'brand_research',
      menuTag: 'execute_approving',
      approveStageList: [2, 3],
      status: 21,
      orderField: '',
      orderType: '',
      brandReq: {
        keyWord: '',
        creator: '',
        productName: '',
        brandCode: '',
        demandTypeList: [],
        cooperationTypeList: [],
        countryCode: '',
      },
    },
    // eslint-disable-next-line no-shadow
    pageSize: PAGE_SIZE,
    service: platformApi.platformDemandV2List,
  });

  function goToDetail(row: any) {
    router.push({
      path: `/brand/demand/detail/${row.demandCode}`,
      query: { from: 'waitToApprove', scene: row.resourceType },
    });
  }
  const previewVisible = ref(false);
  const fileUrl = ref('');
  const fileName = ref('');
  function handleFileClick(file: any) {
    if (!file) return;
    if (file.previewWay === 2) {
      // 跳转外链
      window.open(file.fileUrl, '_blank');
    } else {
      // 内部文件，预览
      fileUrl.value = file.fileUrl;
      fileName.value = file.fileName;
      previewVisible.value = true;
    }
  }
  const orderFields = [
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'demand.create_time', label: 'createTime' },
    { field: 'ur.planStartDate', label: 'planStartDate' },
    { field: 'ur.plan_finish_date', label: 'planFinishDate' },
  ];
  function onSortChange({ prop, order }: { prop: string; order: string }) {
    const found = orderFields.find((f) => f.label === prop);
    if (found) {
      search.orderField = found.field;
      search.orderType = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : '';
    } else {
      search.orderField = '';
      search.orderType = '';
    }
  }
  const reset = () => {
    resetSearch();
    search.status = 21;
  };
  onActivated(() => {
    search.status = 21;
    runQuery();
  });
  const productList = ref<any[]>([]);
  const fetchProductList = async () => {
    const res = await platformApi.platformDemandQueryProductCnName();
    productList.value = res.productList;
    console.log(productList.value, 'productList');
  };
  fetchProductList();
  const brandList = ref<any[]>([]);
  const fetchBrandList = async () => {
    const res = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 1000,
    });
    brandList.value = res.brandBeanList;
  };
  fetchBrandList();
</script>

<style lang="scss" scoped>
  @import url('@/views/lute-os/demandManage/style.css'); /* Keep this import if it defines shared styles */
  .attachment-item {
    margin-bottom: 4px; /* Ensure spacing between multiple attachments */
  }
  .attachment-link {
    display: inline-flex;
    align-items: center;
    color: #3e97ff;
    text-decoration: none;
    .attachment-filename {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px; /* Adjust as needed */
    }
  }
</style>
