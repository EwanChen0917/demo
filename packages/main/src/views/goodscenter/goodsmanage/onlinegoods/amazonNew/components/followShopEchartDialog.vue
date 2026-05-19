<template>
  <el-dialog
    :title="props.title"
    v-model="visible"
    width="750"
    @close="
      visible = false;
      visible2 = false;
    "
    @opened="handleDialogOpened"
  >
    <!-- <div class="d-flex shopItem" v-for="(item, index) in shopArr" :key="index">
      <span class="left">店铺链接:</span>
      <a class="link" @click="toPath(item.url)">{{ item.shop }}</a>
    </div> -->
    <div class="content-detail">
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        @change="handleTimeChange"
        style="width: 320px"
        :clearable="false"
      />
      <!-- <el-select
        v-model="followType"
        v-if="search.type === 0 || search.type === 1"
        style="margin-left: 8px"
        @change="handleTypeChange"
      >
        <el-option :value="1" label="跟卖店铺数量" />
        <el-option :value="2" label="跟卖店铺趋势" />
      </el-select>
      <el-select
        v-model="search.shop"
        v-if="followType === 2"
        style="margin-left: 8px"
        @change="handleShopChange"
        filterable
        placeholder="请选择店铺"
      >
        <el-option v-for="item in shopArr" :value="item" :label="item" :key="item" />
      </el-select> -->
    </div>
    <div style="min-height: 406px">
      <SaleCharts
        v-if="visible2 && search.type === 4"
        :type="followType"
        :search="search"
        :data="dataArr"
      />
      <SaleCharts2
        v-if="visible2 && search.type === 1"
        :type="followType"
        :search="search"
        :data="dataArr"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import SaleCharts from './saleCharts.vue';
  // 新增异常趋势
  import SaleCharts2 from './saleCharts2.vue';

  const props = withDefaults(
    defineProps<{
      title: string;
    }>(),
    {
      title: '',
    }
  );
  const followType = ref(1);
  const dataArr = ref();
  // dataArr.value = [
  //   {
  //     dateTime: '2025-11-16',
  //     num: 3,
  //   },
  //   {
  //     dateTime: '2025-11-13',
  //     num: 2,
  //   },
  // ];
  const search = reactive({
    startTime: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    endTime: dayjs().format('YYYY-MM-DD'),
    type: 0,
    shop: '',
  });
  const time = ref([
    dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);

  const handleTimeChange = (val) => {
    if (val) {
      search.startTime = val[0] || '';
      search.endTime = val[1] || '';
    } else {
      search.startTime = '';
      search.startTime = '';
    }
    // console.log(search);
    if (isDateRangeMoreThan30Days(search.startTime, search.endTime)) {
      ElMessage.warning('统计日期不能超过30天,请重新选择');
    } else {
      dataArr.value = [];
      getData();
    }
    // getData();
  };

  function isDateRangeMoreThan30Days(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const duration = end.diff(start, 'day'); // 获取天数差异
    return duration > 30;
  }

  // type变化
  const handleTypeChange = (val) => {
    // console.log(val);
    search.shop = '';
    if (val === 1) {
      // search.shop = '';
      search.type = 0;
      getData();
    }
    // console.log(search);
  };
  // 店铺变化
  const handleShopChange = (val) => {
    // console.log(val);
    if (val) {
      search.shop = val;
      search.type = 1;
    } else {
      search.shop = '';
      search.type = 0;
    }
    // console.log(search);
    getData();
  };

  const visible = ref(false);
  const visible2 = ref(false);
  const handleDialogOpened = () => {
    visible2.value = true;
  };

  onMounted(async () => {
    // queryDict();
    // getData();
  });
  const itemData = ref();
  const shopArr: any = ref([]);
  const getData = async () => {
    const res = await productApi.luteosProductMonitorQueryChartData({
      ...search,
      id: itemData.value?.id,
      // id: 2897, // 测试
    });
    // res.chartInfoList = [];
    if (search.type === 1) {
      // dataArr.value = res.chartInfoList?.map((item) => {
      //   return { ...item, value: item.num, name: item.dateTime };
      // });
      dataArr.value = res.chartInfoList;
    } else {
      dataArr.value = res.chartInfoList?.map((item) => {
        return { ...item, value: item.num, name: item.dateTime };
      });
    }
    // console.log(dataArr.value);
    shopArr.value = res.shopList;
    // console.log('getData', res);
    return res;
    // console.log(shopArr.value);
  };
  const open = async (row, title?) => {
    // console.log(row, JSON.parse(row.hijackShop));
    // console.log('title ', title);
    shopArr.value = JSON.parse(row.hijackShop);
    itemData.value = row;
    // search.shop = '';
    followType.value = 1;
    if (title === '异常趋势') {
      search.type = 1;
    } else if (title === '跟卖趋势') {
      search.type = 0;
    } else if (title === '高退货趋势') {
      search.type = 2;
    } else if (title === '丢购物车趋势') {
      search.type = 3;
    } else if (title === '竞争力价格趋势') {
      search.type = 4;
      // search.type = 0;
    }
    // console.log('search.type ', search.type);
    // 每次重置15天
    search.startTime = dayjs().subtract(15, 'day').format('YYYY-MM-DD');
    search.endTime = dayjs().format('YYYY-MM-DD');
    time.value = [dayjs().subtract(15, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    const res = await getData();
    // if (res.chartInfoList?.length === 0) {
    //   ElMessage.warning('暂无数据，请稍后再试');
    // } else {
    visible.value = true;
    // }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .shopItem {
    height: 32px;
    line-height: 32px;
    .left {
      width: 130px;
    }
  }
  .content-detail {
    padding: 0px 0 10px 0;
  }
</style>
