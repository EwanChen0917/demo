<template>
  <div class="w-100 d-flex flex-column justify-content-between">
    <KeenList hideActions>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.shopCartList"
        row-key="cartCode"
        class-name="table-row-dashed"
      >
        <el-table-column width="40">
          <template #header>
            <el-checkbox
              v-model="listData.checked"
              :indeterminate="listData?.shopCartList?.filter((item) => item.checked)?.length > 0"
              @change="handleCheckAllChange"
            />
          </template>
          <template #default="{ row }">
            <el-tooltip
              placement="top"
              effect="light"
              :disabled="
                (!selectedRows?.length && row?.limitedNum !== 0) ||
                (row?.limitedNum !== 0 &&
                  row.productType === selectedRows?.[0]?.productType &&
                  row.price * selectedRows?.[0]?.price !== 0 &&
                  !(
                    selectedRows?.[0]?.productType === 2 &&
                    ((selectedRows?.[0].brandCode === 'Comfelie' &&
                      row?.brandCode !== 'Comfelie') ||
                      (selectedRows?.[0].brandCode !== 'Comfelie' && row?.brandCode === 'Comfelie'))
                  ))
              "
            >
              <template #content>
                <div v-if="row?.limitedNum === 0">已达当月限购上限</div>
                <div v-else>
                  <div v-if="row.productType !== selectedRows?.[0]?.productType">
                    在售品与清仓品不能同时下单
                  </div>
                  <div v-if="row.price * selectedRows?.[0]?.price === 0">
                    0元品与非0元品不能同时下单
                  </div>
                  <div
                    v-if="
                      selectedRows?.[0]?.productType === 2 &&
                      ((selectedRows?.[0].brandCode === 'Comfelie' &&
                        row?.brandCode !== 'Comfelie') ||
                        (selectedRows?.[0].brandCode !== 'Comfelie' &&
                          row?.brandCode === 'Comfelie'))
                    "
                  >
                    Comfelie清仓品不能和其他品牌同时下单
                  </div>
                </div>
              </template>
              <el-checkbox
                v-model="row.checked"
                :disabled="
                  !(
                    ![2, 3].includes(row.productStatus) &&
                    (totalNum === 0 ||
                      (row?.price === 0 && totalPrice === 0) ||
                      (row?.price > 0 && totalPrice > 0)) &&
                    (row?.limitedNum > 0 || row?.limitedNum === null) &&
                    (selectedRows?.length
                      ? row?.productType === selectedRows?.[0]?.productType
                      : true) &&
                    (selectedRows?.[0]?.productType === 2 &&
                    selectedRows?.[0].brandCode === 'Comfelie'
                      ? row?.brandCode === selectedRows?.[0].brandCode
                      : true) &&
                    (selectedRows?.[0]?.productType === 2 &&
                    selectedRows?.[0].brandCode !== 'Comfelie'
                      ? row?.brandCode !== 'Comfelie'
                      : true)
                  )
                "
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="内购产品信息" min-width="280">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.imageUrl"
              :title="row.productName"
              :subtitle="row.productSku"
              :disabled="[2, 3].includes(row.productStatus)"
              :disabled-title="row.productStatus === 3 ? '下架' : '无货'"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌" prop="brandName" />
        <!--        <el-table-column label="产品标签" min-width="120">
          <template #default="{ row }">
            <div class="d-flex gap-3 flex-wrap">
              <Tag v-for="item in row?.labelNameList" :key="item">
                {{ item }}
              </Tag>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column label="价格" prop="price" min-width="100">
          <template #default="{ row }">
            <span :class="{ 'is-disabled': [2, 3].includes(row.productStatus) }">
              ¥{{ row?.price }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="库存" prop="remainingStock" min-width="100">
          <template #default="{ row }">
            <span :class="{ 'is-disabled': [2, 3].includes(row.productStatus) }">
              {{ row?.remainingStock }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品分类" min-width="90">
          <template #default="{ row }">
            <Tag v-if="row?.productType" :color="productTypeColorMap[Number(row.productType)]">
              {{ productTypeLabelMap[Number(row.productType)] || row.productType }}
            </Tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="quantity" min-width="140">
          <template #default="{ row }">
            <span v-if="row?.limitedNum === 0" class="is-disabled">已达当月限购上限</span>
            <div class="d-flex flex-wrap" v-else-if="![2, 3].includes(row.productStatus)">
              <el-input-number
                size="small"
                v-model="row.quantity"
                :min="1"
                :max="
                  row?.limitedNum === null
                    ? row.remainingStock
                    : Math.min(row?.limitedNum, row.remainingStock)
                "
                :precision="0"
                @change="
                  (val) => {
                    handleQuantityChange(val, row);
                  }
                "
              />
              <div v-if="row?.limitedNum !== null" class="ms-2 fs-8">
                (限购{{ row?.limitedNum }}件)
              </div>
            </div>
            <span v-else class="is-disabled">{{ row?.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                /*{
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  permissionCode: '',
                  row,
                },*/
                {
                  label: '删除',
                  key: 'delete',
                  type: 'danger',
                  permissionCode: '',
                  row,
                  $index,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />-->
    </KeenList>
    <div class="cart-total">
      <div>
        已选
        <span class="number">{{ totalNum }}</span>
        件产品合计：
        <span class="number">¥{{ totalPrice?.toFixed(2) }}</span>
      </div>
      <el-button type="primary" @click="settle">结算</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="shoppingCart">
    import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { encryptByBase64 } from '@/utils/aesTils';

  const router = useRouter();

  const PAGE_SIZE = 100;
  const productTypeLabelMap: Record<number, string> = {
    1: '在售品',
    2: '清仓品',
  };
  const productTypeColorMap: Record<number, string> = {
    1: 'green',
    2: 'purple',
  };

  const timerMap = ref({});

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
    tableRef,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductMallUserQueryShoppingCartList.RequestQuery,
    ProductApi.LuteosProductMallUserQueryShoppingCartList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMallUserQueryShoppingCartList,
    onSuccess: (res) => {
      res?.shopCartList?.forEach((item) => {
        const min =
          item?.limitedNum > 0
            ? Math.min(item?.limitedNum, item?.remainingStock)
            : item?.remainingStock;
        if (item?.quantity > min && item?.remainStock > 0) {
          item.quantity = min;
          handleQuantityChange(min, item);
        }
        timerMap.value[item.cartCode] = null;
        item.checked = false;
      });
      listData.value.ckecked = null;
    },
  });

  const selectedRows = computed(() => {
    return listData.value?.shopCartList?.filter((item) => item.checked) || [];
  });
  const totalNum = computed(() => {
    return selectedRows.value?.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  });

  const totalPrice = computed(() => {
    return selectedRows.value?.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  });

  const handleQuantityChange = async (val, row) => {
    if (!val) row.quantity = 1;
    if (timerMap.value[row.cartCode]) {
      clearTimeout(timerMap.value[row.cartCode]);
    }
    timerMap.value[row.cartCode] = setTimeout(async () => {
      await productApi.luteosProductMallUserOperateShoppingCart({
        cartCode: row?.cartCode,
        quantity: val,
        operateType: 'update_shopping_cart',
      });
    }, 500);
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row, $index } = item;
    if (key === 'delete') {
      const isConfirmed = await swal.confirm('确定要删除吗？');
      if (!isConfirmed) return;
      await productApi.luteosProductMallUserOperateShoppingCart({
        operateType: 'delete',
        cartCode: row.cartCode,
      });
      ElMessage.success('删除成功');
      listData.value?.shopCartList?.splice($index, 1);
      tableRef.value?.toggleRowSelection(row, false);
    }
  };

  const validList = computed(() => {
    return listData.value?.shopCartList?.filter(
      (item) => ![2, 3].includes(item?.productStatus) && item?.limitedNum > 0
    );
  });

  const handleCheckAllChange = (val) => {
    try {
      if (
        val &&
        validList.value?.some((item) => item.productType !== validList.value?.[0]?.productType)
      ) {
        throw new Error('在售品和清仓品不能同时下单');
      }
      if (
        val &&
        validList.value?.some(
          (item) =>
            item.productType === 2 &&
            ((item.brandCode === 'Comfelie' && validList.value?.[0]?.brandCode !== 'Comfelie') ||
              (item.brandCode !== 'Comfelie' && validList.value?.[0]?.brandCode === 'Comfelie'))
        )
      ) {
        throw new Error('Comfelie清仓品不能和其他品牌同时下单');
      }
      listData.value?.shopCartList
        ?.filter((item) => ![2, 3].includes(item?.productStatus) && item?.limitedNum !== 0)
        ?.forEach((item) => {
          item.checked = val;
        });
    } catch (e) {
      ElMessage.warning(e.message);
      listData.value.checked = false;
    }
  };

  const settle = () => {
    if (totalNum.value === 0) {
      ElMessage.warning('您还没有选择商品喔');
      return;
    }
    router.push({
      path: '/shoppingCart/settlement',
      query: {
        list: encryptByBase64(JSON.stringify(selectedRows.value)),
      },
    });
  };
</script>

<style scoped lang="scss">
  .cart-total {
    width: 100%;
    bottom: 80px;
    height: 72px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    column-gap: 24px;
    padding-right: 24px;
    color: #000000;
    text-align: right;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    .number {
      color: #000000;
      text-align: right;
      font-family: 'DIN';
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }
  }

  .is-disabled {
    color: #00000040 !important;
    font-family: 'DIN';
    font-style: normal;
    font-weight: 500;
  }

  :deep(.el-input--small) {
    height: 22px !important;
  }
  :deep(.el-input-number) {
    width: 90px;
    height: 24px !important;
    border: 1px solid #d9d9d9;
    border-radius: 2px;

    .el-input__wrapper {
      background: #fff;
      padding: 0 30px !important;
      box-shadow: unset;
      min-height: unset;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      width: 24px;
      background: #fff;
    }
    .el-input-number__increase:hover ~ .el-input:not(.is-disabled) .el-input__wrapper,
    .el-input-number__decrease:hover ~ .el-input:not(.is-disabled) .el-input__wrapper {
      box-shadow: unset;
    }
  }
</style>
