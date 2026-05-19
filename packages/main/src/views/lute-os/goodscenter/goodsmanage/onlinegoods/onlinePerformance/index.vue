<template>
  <div class="search-card">
    <!--    <el-icon v-if="isResult" class="backBtn" :size="backSize" @click="back"><Back /></el-icon>-->
    <div class="search-item">
      <div class="d-flex mb-10 gap-2 w-100" :class="{ 'mt-20': true }">
        <ProductChannelSelect style="width: 33%" v-model="form.channel" clearable />
        <CountrySelect style="width: 33%" v-model="form.site" clearable placeholder="站点" />
        <ProductShopSelect
          style="width: 33%"
          v-model="form.shop"
          clearable
          :platform="form.channel"
          :site="form.site"
        />
      </div>
      <el-form ref="formRef" :model="form" class="w-100">
        <el-form-item
          prop="keyword"
          :rules="[{ required: true, message: '请输入店铺SKU/ASIN', trigger: ['blur', 'change'] }]"
        >
          <div class="d-flex w-100 gap-2">
            <el-input
              style="width: 100%"
              size="large"
              v-model="form.keyword"
              placeholder="请输入店铺SKU/ASIN"
              clearable
              @blur="search"
            />
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-table :data="listData" :show-header="false" v-if="isResult" :highlight-current-row="true">
        <el-table-column>
          <template #default="{ row }">
            <div class="result-item" @click="toDetail(row)">
              <el-row>
                <el-col :span="8">
                  店铺SKU：
                  <span :class="{ 'text-danger': form.keyword === row?.sellerSku }">
                    {{ row?.sellerSku }}
                  </span>
                </el-col>
                <el-col :span="6">
                  ASIN：
                  <span :class="{ 'text-danger': form.keyword === row?.asin }">
                    {{ row?.asin }}
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  渠道：
                  <span :class="{ 'text-danger': form.keyword === row?.channel }">
                    {{ row?.channel }}
                  </span>
                </el-col>
                <el-col :span="6">
                  站点：
                  <span :class="{ 'text-danger': form.site === row?.site }">{{ row?.site }}</span>
                </el-col>
                <el-col :span="10">
                  店铺：
                  <span :class="{ 'text-danger': form.shop === row?.shop }">{{ row?.shop }}</span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup name="onlineGoodsPerformance">
  import { productApi, ProductApi } from '@/api/index';
  import { Back } from '@element-plus/icons-vue';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { openWindow } from '@/utils';

  const formRef = ref();
  const form = ref({
    keyword: '',
  });

  const loading = ref(false);
  const router = useRouter();

  const backSize = ref(Math.min(Math.max((2 / 100) * document.body.offsetWidth, 25), 35));
  window.addEventListener('resize', () => {
    backSize.value = Math.min(Math.max((2 / 100) * document.body.offsetWidth, 25), 35);
  });

  const isResult = ref(false);

  const listData = ref([]);
  const search = async () => {
    const isValid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (isValid) {
      try {
        loading.value = true;
        const res = await productApi.luteosProductShowSearch(form.value);
        listData.value = res?.items;
        isResult.value = true;
      } finally {
        loading.value = false;
      }
    }
  };

  const toDetail = (row) => {
    const path = router.resolve({
      path: '/onlineGoodsPerformance/detail',
      query: {
        skuCode: row.skuCode,
        site: row.site,
        channel: row.channel,
        shop: row.shop,
        asin: row.asin,
        sellerSku: row.sellerSku,
      },
    });
    openWindow(path.href);
  };

  const back = () => {
    isResult.value = false;
  };
</script>

<style scoped lang="scss">
  .link {
    color: #1989fa;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .msku-link {
    color: #1989fa;
    cursor: pointer;
  }

  .good-info {
    display: flex;
    flex-direction: row;
    padding: 30px 0 20px 25px;
    background: #fff;
  }

  .search-card {
    position: relative;
    background-color: #ffffff;
    height: 80vh;
    display: flex;
    justify-content: center;
    .search-item {
      width: 65%;
      max-width: 900px;
      min-width: 600px;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .backBtn {
      position: absolute;
      top: 25px;
      left: 25px;
      border-radius: 50%;
      border: 1px solid var(--bs-gray);
      padding: 5px;
      color: var(--bs-gray);
      &:hover {
        color: var(--bs-primary);
        border-color: var(--bs-primary);
        cursor: pointer;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
  }

  .result-item {
    padding: 0 10px;
  }
</style>
