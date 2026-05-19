<template>
  <el-dialog
    width="1300px"
    title="预校验库存"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-form ref="formRef" :model="form">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="form?.orderList"
        row-key="erpCode"
        max-height="60vh"
      >
        <el-table-column label="订单号" prop="erpCode" min-width="130px">
          <template #default="{ row }">
            <el-link
              type="primary"
              style="font-size: 12px"
              :underline="false"
              @click="toEdit(row?.erpCode)"
            >
              {{ row?.erpCode }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="产品信息" min-width="200px">
          <template #default="{ row }">
            <div class="product-list">
              <div class="product-item" v-for="item in row?.itemList" :key="item?.id">
                <div class="product-img">
                  <img v-if="item?.productImageUrl" :src="item?.productImageUrl" alt="" />
                  <img v-else src="@/assets/images/system/empty.png" alt="" />
                  <img
                    v-if="item?.inventory < item?.num"
                    class="outStock"
                    :src="getImg('outStock')"
                    alt=""
                  />
                </div>
                <div>
                  <div class="product-title">
                    <OverflowTooltip :content="item?.productName" :line="1" :font-size="12" />
                  </div>
                  <div class="product-sku">
                    <span class="item-label">产品SKU：</span>
                    {{ item?.skuCode }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应链SKU" min-width="140">
          <template #default="{ row }">
            <div v-for="item in row?.itemList" :key="item?.id" class="info-item">
              {{ item?.supplySku }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="订单数量">
          <template #default="{ row }">
            <div class="info-item" v-for="item in row?.itemList" :key="item?.id">
              {{ item?.num }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="缺货数量">
          <template #default="{ row }">
            <div class="info-item" v-for="item in row?.itemList" :key="item?.id">
              {{ item?.outOfStockQty }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { CommonRespErpOrderPreCheckInventoryResp } from '@/api/erp/data-contracts';
  import { ElMessage } from 'element-plus';

  const router = useRouter();

  const visible = ref(false);

  const form = ref<CommonRespErpOrderPreCheckInventoryResp>({});
  const formRef = ref();

  const listLoading = ref(false);
  const queryList = async (erpCodeList) => {
    try {
      listLoading.value = true;
      form.value = await erpApi.luteosErpOrderPreCheckInventory({
        erpCodeList,
      });
      if (form.value?.orderList?.length) {
        visible.value = true;
      } else {
        ElMessage.success('所选择订单sku均无缺货');
      }
    } finally {
      listLoading.value = false;
    }
  };

  const toEdit = (erpCode) => {
    const path = router.resolve({
      name: 'B2BOrderEdit',
      query: { code: erpCode },
    });
    router.push(path.href);
  };

  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };

  const open = (codeList) => {
    queryList(codeList);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .product-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    //gap: 18px;
    .product-item + .product-item {
      margin-top: 18px;
    }

    .product-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .product-img {
        position: relative;

        img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }

        .outStock {
          width: 16px;
          position: absolute;
          top: -12px;
          right: -2px;
        }
      }

      .product-title {
        margin-bottom: 2px;
      }
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 60px;

    & + & {
      margin-top: 18px;
    }
  }

  .item-label {
    flex-shrink: 0;
    color: #999999;
  }

  .timeicon {
    height: 20px;
    line-height: 20px;
    margin-top: 2px;
    font-size: 12px;
  }

  :deep(.el-table__cell:has(.el-form-item)) {
    padding-bottom: 0;
  }
</style>
