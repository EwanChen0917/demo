<template>
  <div class="d-flex w-100 gap-5 flex-wrap">
    <div style="width: 900px; flex-grow: 1">
      <KeenCard title="产品信息" class="w-100 h-400px">
        <div class="d-flex">
          <KeenImagePreview
            :src="detailInfo.imageUrl"
            :src-list="[detailInfo.imageUrl]"
            size="150"
          />
          <div class="w-75">
            <el-form label-width="120">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="产品名称：">
                    <span>{{ detailInfo?.productName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              <el-row v-if="isAmazon">
                <el-col :span="12">
                  <el-form-item label="ASIN：">
                    <span>{{ detailInfo?.asin }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="父ASIN：">
                    <span>{{ detailInfo?.parentAsin }}</span>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="SPU：">
                    <span>{{ detailInfo?.spuCode }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="SKU：">
                    <span>{{ detailInfo?.skuCode }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="规格信息：">
                    <span>{{ detailInfo?.specificationDesc }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分类：">
                    <span>{{ detailInfo?.categoryDesc }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="品线：">
                    <span>{{ detailInfo?.productLineName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品经理：">
                    <span>{{ detailInfo?.manegerName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </KeenCard>
      <KeenCard title="销售信息" :margin-bottom="0" class="w-100" style="height: 760px">
        <el-space>
          <el-select v-model="lastTime" @change="handleLastTimeChange" clearable>
            <el-option label="最近7天" :value="1" />
            <el-option label="最近30天" :value="2" />
          </el-select>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            @change="handleDateChange"
            :disabled-date="(date) => dayjs(date).isAfter(dayjs(), 'date')"
          />
          <el-button type="primary" @click="queryStatisticsDetail">查询</el-button>
        </el-space>
        <SaleChart v-if="statisticsDetailInfo?.sales?.length" :data="statisticsDetailInfo.sales" />
        <div v-else class="empty w-100 h-600px d-flex align-items-center justify-content-center">
          <span>暂无数据</span>
        </div>
      </KeenCard>
    </div>
    <!--    <div class="d-flex flex-wrap w-400px" style="flex-grow: 1">
      <KeenCard v-if="isAmazon" class="w-100 h-400px">
        <el-tabs v-model="curCategory">
          <el-tab-pane label="大类排名" name="bigCategory" />
          <el-tab-pane label="小类排名" name="smallCategory" />
        </el-tabs>
        <RankChart
          v-if="
            (curCategory === 'bigCategory' && statisticsDetailInfo?.bigCategoryTop?.length) ||
            (curCategory === 'smallCategory' && statisticsDetailInfo?.samllCategoryTop?.length)
          "
          :data="
            curCategory === 'bigCategory'
              ? statisticsDetailInfo.bigCategoryTop
              : statisticsDetailInfo.samllCategoryTop
          "
        />
        <div v-else class="empty w-100 h-300px d-flex align-items-center justify-content-center">
          <span>暂无数据</span>
        </div>
      </KeenCard>
      <KeenCard v-if="isAmazon" :margin-bottom="0" class="w-100" style="height: 760px">
        <el-tabs v-model="curType">
          <el-tab-pane label="市占" name="marketShare">
            <el-table :data="currentMarketShareList" style="width: 100%">
              <el-table-column prop="time" label="时间" />
              <el-table-column prop="desc" label="市占" />
            </el-table>
            <KeenPagination
              v-if="marketShareList.length"
              :current="marketShareCurrent"
              :page-size="marketSharePageSize"
              :page-size-option="[5, 10]"
              :pager-count="5"
              :total="marketShareList.length"
              @size-change="handleMarketShareSizeChange"
              @current-change="handleMarketShareCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="评分" name="score">
            <el-table :data="currentScoreList" style="width: 100%">
              <el-table-column prop="time" label="时间" />
              <el-table-column prop="desc" label="评分" />
            </el-table>
            <KeenPagination
              v-if="scoreList.length"
              :current="scoreCurrent"
              :page-size="scorePageSize"
              :page-size-option="[5, 10]"
              :pager-count="5"
              :total="scoreList.length"
              @size-change="handleScoreSizeChange"
              @current-change="handleScoreCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </KeenCard>
    </div>-->
  </div>
</template>

<script setup lang="ts" name="productShadowDetail">
  import RankChart from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/onlinePerformance/components/rankChart.vue';
  import { productApi } from '@/api';
  import dayjs from 'dayjs';
  import SaleChart from '@/views/lute-os/goodscenter/goodsmanage/onlinegoods/onlinePerformance/components/saleChart.vue';
  import { decryptByBase64 } from '@/utils/aesTils';

  const PAGE_SIZE = 10;

  const route = useRoute();
  const lastTime = ref(1);
  const date = ref([]);
  const startTime = ref(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
  const endTime = ref(dayjs().format('YYYY-MM-DD'));
  const handleLastTimeChange = (val) => {
    if (val) {
      date.value = [];
      startTime.value =
        val === 2
          ? dayjs().subtract(1, 'month').format('YYYY-MM-DD')
          : dayjs().subtract(1, 'week').format('YYYY-MM-DD');
      endTime.value = dayjs().format('YYYY-MM-DD');
      queryStatisticsDetail();
    }
  };

  const detailInfo = JSON.parse(decryptByBase64(route.query.info));
  const { skuCode } = detailInfo;
  /* const queryDetailInfo = async () => {
    const res = await productApi.luteosProductShowSearchDetail({
      skuCode,
    });
    detailInfo.value = res?.baseInfo;
  }; */

  const curCategory = ref('bigCategory');
  const curType = ref('marketShare');
  const statisticsDetailInfo = ref({});
  const marketShareList = ref([]);
  const scoreList = ref([]);
  const queryStatisticsDetail = async () => {
    const res = await productApi.luteosProductShadowSearchStatisticsDetail({
      skuCode,
      startTime: startTime.value,
      endTime: endTime.value,
    });
    statisticsDetailInfo.value = res;
    marketShareList.value = res?.marketShare;
    scoreList.value = res?.score;
  };

  const marketSharePageSize = ref(PAGE_SIZE);
  const scorePageSize = ref(PAGE_SIZE);
  const marketShareCurrent = ref(1);
  const scoreCurrent = ref(1);

  // 计算当前页数据
  const currentMarketShareList = computed(() => {
    const startIndex = (marketShareCurrent.value - 1) * marketSharePageSize.value;
    return marketShareList.value.slice(startIndex, startIndex + marketSharePageSize.value);
  });
  const currentScoreList = computed(() => {
    const startIndex = (scoreCurrent.value - 1) * scorePageSize.value;
    return scoreList.value.slice(startIndex, startIndex + scorePageSize.value);
  });

  const handleMarketShareSizeChange = (val) => {
    marketShareCurrent.value = 1;
    marketSharePageSize.value = val;
  };

  const handleScoreSizeChange = (val) => {
    scoreCurrent.value = 1;
    scorePageSize.value = val;
  };

  const handleMarketShareCurrentChange = (val) => {
    marketShareCurrent.value = val;
  };
  const handleScoreCurrentChange = (val) => {
    scoreCurrent.value = val;
  };

  const handleDateChange = (val) => {
    if (val && val.length) {
      lastTime.value = '';
      startTime.value = val[0];
      endTime.value = val[1];
      queryStatisticsDetail();
    } else {
      lastTime.value = 1;
      handleLastTimeChange(1);
    }
  };
  const isAmazon = computed(() => {
    return detailInfo.value?.channel === 'amazon';
  });

  onMounted(() => {
    queryStatisticsDetail();
  });
</script>

<style scoped lang="scss">
  .el-form-item {
    margin-bottom: 0;
  }
</style>
