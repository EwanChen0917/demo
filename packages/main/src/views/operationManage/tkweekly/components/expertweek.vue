<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="reset"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="达人名称/挂链商品/商品名称/SPU"
        style="width: 300px"
        clearable
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-date-picker
        v-model="week"
        value-format="YYYY-MM-DD"
        format="YYYY年第ww周"
        @change="handleWeekChange"
        type="week"
        placeholder="统计周数"
      />
      <el-date-picker
        v-model="videoMonth"
        @change="handleVideoMonthChange"
        type="month"
        placeholder="上线月份"
        :disabled-date="disabledDate"
      />
      <el-date-picker
        v-model="videoWeek"
        value-format="YYYY-MM-DD"
        format="YYYY年第ww周"
        @change="handleVideoWeekChange"
        type="week"
        placeholder="上线周数"
        :disabled-date="disabledDate"
      />
      <DeptMember
        style="width: 175px"
        v-model="search.memberCodeList"
        deptCode="promotor"
        placeholder="团队推广成员"
        clearable
        multiple
      />
    </template>
    <template #buttons>
      <ExportBtn
        :service="productApi.luteosProductTiktokExportTiktokAffiliateAccountsSpuList"
        :params="search"
      >
        导出
      </ExportBtn>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.affiliateAccountsSpuList">
      <el-table-column label="上线时间" prop="videoTime" min-width="160px" />
      <el-table-column label="上线周数" prop="videoWeek" />
      <el-table-column label="年/季/月" prop="videoWeek" min-width="100px">
        <template #default="{ row }">
          <div>{{ row.videoYear }}年</div>
          <div>第{{ row.videoQuarter }}季度</div>
          <div>{{ row.videoMonth }}月</div>
        </template>
      </el-table-column>

      <el-table-column label="达人信息" prop="creatorName" min-width="160px">
        <template #default="{ row }">
          <GoodsInfo hide-image :title="row.creatorName" :subtitle="row.creatorId" />
        </template>
      </el-table-column>
      <el-table-column label="上线文案" prop="videoInfo" min-width="200px">
        <template #default="{ row }">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :content="row?.videoInfo"
            :disabled="row?.videoInfo?.length < 5"
          >
            <template #content>
              <div style="max-width: 700px">
                {{ row?.videoInfo }}
              </div>
            </template>
            <div class="elli">{{ row?.videoInfo || '--' }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="上线链接" prop="videoLink" min-width="200px" />
      <el-table-column label="挂链商品" prop="productName" min-width="200px">
        <template #default="{ row }">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :content="row?.productName"
            :disabled="row?.productName?.length < 5"
          >
            <template #content>
              <div style="max-width: 700px">
                {{ row?.productName }}
              </div>
            </template>
            <div class="elli">{{ row?.productName || '--' }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" min-width="220">
        <template #default="{ row }">
          <GoodsInfo
            :title="row.spuName"
            :subtitle="row.spu"
            hide-image
            copy-title
            copy-subtitle
            :url="`/goodslist/detail?code=${row.spu}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="团队推广成员" prop="promotionalMemberName" min-width="200px" />
      <el-table-column label="曝光量" prop="vv" />
      <el-table-column label="互动" min-width="120px">
        <template #default="{ row }">
          <div class="fs-7">点赞量：{{ row.likes }}</div>
          <div class="fs-7">评论量：{{ row.comments }}</div>
          <div class="fs-7">分享量：{{ row.shares }}</div>
        </template>
      </el-table-column>
      <el-table-column label="互动率" prop="interactionRateStr" />
      <el-table-column label="新增粉丝量" prop="newFollowers" />
      <el-table-column label="商品曝光量" prop="productImpressions" min-width="150px" />
      <el-table-column label="商品点击量" prop="productClicks" />
      <el-table-column label="购买数量" prop="buyers" />
      <el-table-column label="下单数量" prop="orders" />
      <el-table-column label="单品销量" prop="unitSales" />
      <el-table-column label="视频收益金额($)" prop="videoRevenue" min-width="120px" />
      <el-table-column label="GPM($)" prop="gpm" />
      <el-table-column label="CTR" prop="ctrStr" />
      <el-table-column label="视频完播率" prop="videoFinishRateStr" min-width="120px" />
      <el-table-column label="CO rate" prop="coRateStr" />
      <el-table-column label="统计时间" prop="startDate" min-width="140px">
        <template #default="{ row }">
          <div class="fs-7">开始：{{ row.startDate }}</div>
          <div class="fs-7">结束：{{ row.endDate }}</div>
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

<script lang="ts" setup>
  import { ElTable as ElTableType, ElTooltip } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';

  const PAGE_SIZE = 10;
  const videoYear = ref();
  const videoMonth = ref();
  const videoWeek = ref();
  const week = ref();
  const handleVideoMonthChange = (val) => {
    if (val) {
      search.videoYear = new Date(val).getFullYear();
      search.videoMonth = new Date(val).getMonth() + 1;
    } else {
      search.videoYear = undefined;
      search.videoMonth = undefined;
    }
  };

  const getWeekNumber = (d) => {
    // 将日期复制到一个新的Date对象中，这样我们就不会修改原始日期
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // 0是周日，这里设置为周一作为一周的开始
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // 获取一年的第一周，这周至少有4天在新的一年中
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // 计算两个日期之间的差，得到周数，向下取整
    const weekNo = Math.ceil(((d - startOfYear) / 86400000 + 1) / 7);
    return weekNo;
  };
  const handleWeekChange = (val) => {
    if (val) {
      search.week = getWeekNumber(new Date(val));
    } else {
      search.week = undefined;
    }
  };
  const handleVideoWeekChange = (val) => {
    if (val) {
      search.videoWeek = getWeekNumber(new Date(val));
    } else {
      search.videoWeek = undefined;
    }
  };
  const disabledDate = (time) => {
    if (videoYear.value) {
      return time.getFullYear() !== videoYear.value.getFullYear();
    }
  };

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    ProductApi.LuteosProductTiktokQueryTiktokAffiliateAccountsSpuList.RequestQuery,
    ProductApi.LuteosProductTiktokQueryTiktokAffiliateAccountsSpuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      videoYear: undefined,
      videoQuarter: undefined,
      videoMonth: undefined,
      videoWeek: undefined,
      year: undefined,
      quarter: undefined,
      month: undefined,
      week: undefined,
      memberCodeList: [],
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTiktokQueryTiktokAffiliateAccountsSpuList,
  });
  const reset = () => {
    resetSearch();
    videoYear.value = '';
    videoMonth.value = '';
    videoWeek.value = '';
    week.value = '';
  };
</script>

<style scoped lang="scss">
  .elli {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
