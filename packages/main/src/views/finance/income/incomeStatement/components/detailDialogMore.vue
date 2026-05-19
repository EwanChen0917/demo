<template>
  <el-dialog width="1200px" title="多店铺对比详情" v-model="visible" @close="visible = false" align-center>
    <el-input v-model="search.keyword" placeholder="店铺名称" class="w-350px" clearable>
      <template #prefix>
        <SvgIconSearch />
      </template>
    </el-input>
    <el-date-picker v-model="search.monthTime" value-format="YYYYMM" :clearable="false" type="month" />
    <el-radio-group v-model="search.normalStatus" class="select-but">
      <el-radio-button label="全部" :value="''" />
      <el-radio-button label="仅显示异常" :value="1" />
    </el-radio-group>
    <div class="card-box" v-for="(item, index) in shopListData.recordList" :key="index"
      v-if="shopListData?.recordList?.length">
      <div class="card-title">{{ item.platform }}</div>
      <el-row :gutter="20">
        <el-col :md="8" :sm="12" :xs="12" v-for="(child, i) in item.shopCompareList" :key="i">
          <div class="custom-block" :class="{ 'red-bg': !child.normal }">
            <div><span class="text1">{{ child?.shop }}</span>
              <span class="stauts-text">
                <Tag color="green" v-if="child.normal">正常</Tag>
                <Tag color="red" v-else>异常</Tag>
              </span>
            </div>
            <div class="content-list content-title"><span>结算总金额</span><span>明细汇总</span><span>差异</span><span>币种</span>
            </div>
            <div class="content-list content-value">
              <span>{{ child.totalSettlementAmount }}</span>
              <span>{{ child.totalItemAmount }}</span>
              <span :class="{ 'red': !child.normal }">{{ child.differAmount }}</span>
              <span>{{ child?.currencyCode }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-empty description="暂无数据" v-else />
  </el-dialog>
</template>

<script setup lang="ts">
import { FinanceSystemApi, financeSystemApi } from '@/api';
const visible = ref(false);

const search = ref({ keyword: '', monthTime: '', normalStatus: '' });//normalStatus 正常店铺状态: 0-正常 1-异常

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth()).toString().padStart(2, '0');
  return `${year}${month}`;
};
const shopListData = ref({})
const getShopListData = async () => {
  const res = await financeSystemApi.financeIncomeStatementOrderQueryShopCompareList(search.value);
  if (res) {
    shopListData.value = res
  }
};

watch(search.value, () => {
  getShopListData()
});
const open = () => {
  visible.value = true;
  search.value.monthTime = formatDate(new Date())
  search.value.keyword = ''
  search.value.normalStatus = ''
  //获取店铺对比数据
  getShopListData()
};

defineExpose({
  open,
});
</script>

<style scoped lang="scss">
.w-350px {
  margin-right: 10px;
}

.card-box {
  margin-top: 10px;
}

.select-but {
  float: right;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  background-color: #F5F5F5;
  padding: 10px;
  border-radius: 4px;
}

.custom-block {
  background-color: #F5F5F5;
  padding: 8px;
  border-radius: 4px;
  border-left: 5px solid var(--bs-success);
  margin: 10px 0px;
  line-height: 30px;

  .text1 {
    font-size: 16px;
  }

  .stauts-text {
    float: right;
  }

  .content-list {
    display: inline-block;
    width: 100%;

    span {
      display: inline-block;
      width: calc((100% - 35px)/3);
      text-align: left;
    }

    span:last-child {
      width: 35px;
    }
  }

  .content-title {
    color: var(---N6, #999);
  }

  .content-value {
    color: var(---N9, #1F1F1F);
  }

  .red {
    color: var(--bs-danger)
  }
}

.red-bg {
  border-left: 5px solid #f56c6c;
  background-color: rgba(245, 108, 108, .15);
}
</style>
