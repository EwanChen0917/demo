<template>
  <el-drawer
    :size="1200"
    class="custom-drawer"
    title="详情"
    v-model="visible"
    @close="visible = false"
  >
    <el-form ref="formRef" :model="form">
      <el-table :data="form.list" default-expand-all row-key="code">
        <el-table-column label="产品信息" min-width="300">
          <template #default="{ row }">
            <div>
              <span>{{ row?.skuName }}</span>
              <Copy v-if="row?.skuName" :content="row.skuName" />
            </div>
            <div>
              <span>{{ row?.skuCode }}</span>
              <Copy v-if="row?.skuCode" :content="row.skuCode" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="countryCode">
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
        <el-table-column label="全渠道（线上）" prop="msrp" width="120">
          <template #default="{ row }">
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
          </template>
        </el-table-column>
        <!-- <el-table-column label="亚马逊-VC" prop="msrp" width="280px">
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
        <el-table-column label="平销红线价（折扣率）" prop="msrp" min-width="150">
          <template #default="{ row }">
            <div style="width: 100%">
              <div class="d-flex center">{{ `${row?.normalRedlinePrice ?? ''} ` }}</div>
              <div class="d-flex center">
                {{ row?.normalRedlineDiscountRate ? `${row?.normalRedlineDiscountRate}%` : '' }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小促红线价（折扣率）" prop="msrp" min-width="150">
          <template #default="{ row }">
            <div style="width: 100%">
              <div class="d-flex center">{{ `${row?.smallPromotionRedlinePrice ?? ''} ` }}</div>
              <div class="d-flex center">
                {{
                  row?.smallPromotionRedlineDiscountRate
                    ? `${row?.smallPromotionRedlineDiscountRate}%`
                    : ''
                }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="大促红线价（折扣率）" prop="msrp" min-width="150">
          <template #default="{ row }">
            <div style="width: 100%">
              <div class="d-flex center">{{ `${row?.bigPromotionRedlinePrice ?? ''} ` }}</div>
              <div class="d-flex center">
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
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    list: [{}] as any[],
  });

  const queryDetail = async (code) => {
    const res = await productApi.luteosProductMsrpQuerySkuDetail({
      code,
    });
    form.value.list = res?.skuDetailBeanList;
  };

  const open = (code) => {
    queryDetail(code);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .operate-button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
