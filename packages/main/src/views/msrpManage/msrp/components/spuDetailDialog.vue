<template>
  <el-drawer
    :size="1200"
    class="custom-drawer"
    title="详情"
    :append-to-body="true"
    v-model="visible"
    @close="visible = false"
  >
    <el-table :data="form.list" row-key="code" default-expand-all>
      <el-table-column type="expand" width="30">
        <template #expand="{ expanded }">
          <i class="iconfont icon-xiangxia icon-expand" :class="expanded ? 'row-open' : ''"></i>
        </template>
        <template #default="{ row }">
          <div class="expand-container">
            <el-table :data="row?.skuBeanList">
              <el-table-column label="产品名称/产品SKU" min-width="300">
                <template #default="{ row }">
                  <div v-if="row?.skuCode">
                    <span class="product-name">
                      {{ row?.skuName }}
                    </span>
                    <Copy v-if="row?.skuName" :content="row.skuName" />
                    <div>
                      <span>{{ row?.skuCode }}</span>
                      <Copy v-if="row?.skuCode" :content="row.skuCode" />
                    </div>
                  </div>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <el-table-column label="国家" prop="countryCode" min-width="80">
                <template #default="{ row }">
                  <el-tag type="info">
                    {{ row.countryCode }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="币种" prop="currencyCode" min-width="120">
                <template #default="{ row }">
                  <div>
                    {{
                      row?.currencyName
                        ? `${row?.currencyCode}【${row?.currencyName}】`
                        : `${row?.currencyCode}`
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="MSRP（全渠道）" min-width="120">
                <template #default="{ row }">
                  <div class="d-flex">
                    <div class="d-flex">
                      <div>{{ row?.minSalePrice }}</div>
                      <!-- <div class="fs-7 text-gray-600">{{ row?.currencyCode }}</div> -->
                      <div
                        style="padding: 0 2px"
                        v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
                      >
                        -
                      </div>
                    </div>
                    <div
                      v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
                      class="d-flex gap-2"
                    >
                      <div>{{ row?.maxSalePrice }}</div>
                      <div
                        class="fs-7 text-gray-600"
                        v-if="row?.minSalePrice !== null && row?.minSalePrice !== ''"
                      >
                        <!-- {{ row?.currencyCode }} -->
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="平销红线价（折扣率）" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%">
                    <div class="d-flex price">
                      {{ row?.normalRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex percent">
                      {{
                        row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小促红线价（折扣率）" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%">
                    <div class="d-flex price">
                      {{ row?.smallPromotionRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex percent">
                      {{
                        row?.smallPromotionRedlineDiscountRate
                          ? `${row?.smallPromotionRedlineDiscountRate}%`
                          : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="大促红线价（折扣率）" min-width="150">
                <template #default="{ row }">
                  <div style="width: 100%">
                    <div class="d-flex price">
                      {{ row?.bigPromotionRedlinePrice ?? '' }}
                    </div>
                    <div class="d-flex percent">
                      {{
                        row?.bigPromotionRedlineDiscountRate
                          ? `${row?.bigPromotionRedlineDiscountRate}%`
                          : ''
                      }}
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品信息" min-width="300">
        <template #default="{ row }">
          <div>
            <div class="product-name">
              <span>{{ row?.spuName }}</span>
              <Copy v-if="row?.spuName" :content="row.spuName" />
            </div>
            <div>
              <span>{{ row?.spuCode }}</span>
              <Copy v-if="row?.spuCode" :content="row.spuCode" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="国家" prop="countryCode" min-width="80">
        <template #default="{ row }">
          <el-tag type="info">
            {{ row.countryCode }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="币种" prop="currencyCode" min-width="120">
        <template #default="{ row }">
          <div>
            {{
              row?.currencyName
                ? `${row?.currencyCode}【${row?.currencyName ?? ''}】`
                : `${row?.currencyCode}`
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="MSRP（全渠道）" prop="msrp" width="120">
        <template #default="{ row }">
          <div class="d-flex">
            <div class="d-flex gap-2">
              <div>{{ row?.minSalePrice }}</div>
              <!-- <div class="fs-7 text-gray-600">{{ row?.currencyCode }}</div> -->
              <div v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice">-</div>
            </div>
            <div
              v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
              class="d-flex gap-2"
            >
              <div>{{ row?.maxSalePrice }}</div>
              <!-- <div class="fs-7 text-gray-600">{{ row?.currencyCode }}</div> -->
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="亚马逊-VC" width="180px">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <div>{{ row?.minVcSalePrice }}</div>
            <div class="fs-7 text-gray-600">{{ row?.currencyCodeVc }}</div>
            <div v-if="row?.maxVcSalePrice && row?.maxVcSalePrice !== row?.minVcSalePrice">-</div>
          </div>
          <div
            v-if="row?.maxVcSalePrice && row?.maxVcSalePrice !== row?.minVcSalePrice"
            class="d-flex gap-2"
          >
            <div>{{ row?.maxVcSalePrice }}</div>
            <div class="fs-7 text-gray-600">{{ row?.currencyCodeVc }}</div>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="平销红线价（折扣率）" min-width="150">
        <template #default="{ row }">
          <div style="width: 100%">
            <div class="d-flex center price">{{ row?.normalRedlinePrice ?? '' }}</div>
            <div class="d-flex center percent">
              {{ row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : '' }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小促红线价（折扣率）" min-width="150">
        <template #default="{ row }">
          <div style="width: 100%">
            <div class="d-flex center price">{{ row?.smallPromotionRedlinePrice ?? '' }}</div>
            <div class="d-flex center percent">
              {{
                row?.smallPromotionRedlineDiscountRate
                  ? `${row?.smallPromotionRedlineDiscountRate}%`
                  : ''
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大促红线价（折扣率）" min-width="150">
        <template #default="{ row }">
          <div style="width: 100%">
            <div class="d-flex center price">{{ row?.bigPromotionRedlinePrice ?? '' }}</div>
            <div class="d-flex center percent">
              {{
                row?.bigPromotionRedlineDiscountRate
                  ? `${row?.bigPromotionRedlineDiscountRate}%`
                  : ''
              }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const visible = ref(false);
  const form = ref({
    list: [{}] as any[],
  });

  const queryDetail = async (code) => {
    const res = await productApi.luteosProductMsrpQuerySpuDetail({
      code,
    });
    form.value.list = [res?.spuDetailBean] || [];
  };

  const open = (spu) => {
    queryDetail(spu);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-table__expanded-cell) {
    background-color: #f5f7fa !important;
    padding: 8px !important;
  }

  .icon-expand {
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: #1e2226;
    transform: rotate(-90deg);

    &.row-open {
      transform: rotate(0deg);
    }
  }
  .expand-container {
    padding-left: 16px;
    .product-name {
      font-weight: 400;
      font-size: 12px;
    }
    .el-table {
      border-radius: 8px;
      border: 1px solid #dfe2e6;
      border-bottom: none;
      --el-table-border: 1px solid #dfe2e6;
      --el-table-border-color: #dfe2e6;
      --el-table-header-bg-color: #f5f7fa;
      --el-table-bg-color: #f5f7fa;
      --el-table-tr-bg-color: #f5f7fa;
    }
  }
  .product-name {
    font-family: 'PingFang SC Medium';
    font-size: 14px;
  }
  .price {
    font-size: 12px;
    font-family: 'PingFang SC Medium';
    font-weight: 500;
    color: #1e2226;
  }
  .percent {
    font-size: 12px;
    color: #8a9099;
  }
</style>
