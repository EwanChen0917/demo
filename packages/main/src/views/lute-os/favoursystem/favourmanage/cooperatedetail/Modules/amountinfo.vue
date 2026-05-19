<template>
  <div class="agency-page">
    <div class="amount-total">
      <span class="amount-title">
        总引入金额
        <el-tooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top-start"
          effect="light"
          content="总引⼊⾦额=亚⻢逊引⼊⾦额+独⽴站引⼊⾦额+TK⼩店引⼊⾦额"
        >
          <QuestionFilled class="question-icon" />
        </el-tooltip>
      </span>
      <span class="amount-currency">
        {{ amountInfo.totalImportAmount }} {{ amountInfo.currencyCode }}
      </span>
    </div>
    <KeenCard title="亚马逊折扣码" class="card-title">
      <div class="btn-wrap">
        <el-button type="primary" size="small" @click="applyCode('amazon')" class="btn-apply">
          申请亚马逊折扣码
        </el-button>
      </div>
      <AmazonCollectCode
        :listData="amountInfo.amazonMetaMarkList"
        @refresh="queryImportAmountList"
      />
      <div class="mt-20">
        <span class="amount-title">亚马逊引入金额</span>
        <span class="amount-currency">
          {{ amountInfo.totalAmazonImportAmount }} {{ amountInfo.currencyCode }}
        </span>
      </div>
    </KeenCard>
    <KeenCard title="独立站扣码" class="card-title">
      <div class="btn-wrap">
        <el-button type="primary" size="small" @click="applyCode('station')" class="btn-apply">
          申请独立站折扣码
        </el-button>
      </div>
      <ShopifyCollectCode
        :listData="amountInfo.shopifyMetaMarkList"
        @refresh="queryImportAmountList"
      />
      <div class="mt-20">
        <span class="amount-title">独立站引入金额</span>
        <span class="amount-currency">
          {{ amountInfo.totalShopifyImportAmount }} {{ amountInfo.currencyCode }}
        </span>
      </div>
    </KeenCard>
    <KeenCard title="TK小店" class="card-title">
      <div class="mt-20">
        <span class="amount-title">TK小店引入金额</span>
        <el-input v-model="amountInfo.totalTiktokAmount" class="amount-input">
          <template #append>{{ amountInfo.currencyCode }}</template>
        </el-input>
      </div>
      <div class="flex-right">
        <div>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </KeenCard>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { metaApi } from '@/api/index';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { ElMessage } from 'element-plus';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import AmazonCollectCode from '../components/amazoncollectcode.vue';
  import ShopifyCollectCode from '../components/shopifycollectcode.vue';

  const route = useRoute();
  const router = useRouter();

  const props = defineProps<{
    projectDetail: Object;
  }>();

  const amountInfo = ref({
    amazonMetaMarkList: [],
    shopifyMetaMarkList: [],
    totalImportAmount: '',
    totalAmazonImportAmount: '',
    totalShopifyImportAmount: '',
    totalTiktokAmount: '',
    currencyCode: '',
  });
  const projectCode = route.query.projectCode as string;
  const queryImportAmountList = async () => {
    amountInfo.value = await metaApi.luteosMetaProjectQueryImportAmountList({
      pageNum: 1,
      pageSize: 500,
      projectCode,
    });
  };
  queryImportAmountList();
  const applyCode = (type) => {
    router.push({
      name: type === 'amazon' ? 'amazonaddcollectcode' : 'shopifyaddcollectcode',
      query: {
        code: encryptByBase64(props.projectDetail.userCode),
        projectCode: encryptByBase64(projectCode),
      },
    });
  };
  const save = async () => {
    const regex = /^\d+(\.\d+)?$/;
    if (!regex.test(amountInfo.value.totalTiktokAmount)) {
      ElMessage.warning('请输⼊数字');
    } else {
      await metaApi.luteosMetaSaveProjectTkAmount({
        projectCode,
        tkAmount: amountInfo.value.totalTiktokAmount,
      });
      ElMessage.success('保存成功');
      queryImportAmountList();
    }
  };
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .card-title {
    :deep(.card-header) {
      padding-left: 0 !important;
    }
    :deep(.card-body) {
      padding-left: 0 !important;
    }
  }
  .question-icon {
    width: 15px;
    width: 15px;
    margin-top: -2px;
    cursor: pointer;
  }
  .amount-total {
    margin-bottom: 10px;
    height: 40px;
    border-bottom: 1px dashed #ccc;
  }
  .mt-20 {
    margin-top: 20px !important;
  }
  .btn-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .btn-apply {
    margin-top: -38px;
  }
  .amount-title {
    font-size: 14px;
    color: #3e97ff;
    font-weight: 600;
    margin-right: 8px;
  }
  .amount-currency {
    font-size: 14px;
    font-weight: 500;
  }
  .amount-input {
    width: 250px;
  }
  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
</style>
