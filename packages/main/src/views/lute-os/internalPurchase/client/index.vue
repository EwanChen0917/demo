<template>
  <!--  <div class="parent-ball">
    <div class="child-ball"></div>
  </div>-->
  <div class="internal-container" ref="containerRef">
    <header class="internal-header">
      <div class="d-flex align-items-center" style="column-gap: 24px">
        <div class="d-flex align-items-center" style="column-gap: 12px">
          <el-input
            style="width: 350px"
            v-model="search.keyword"
            placeholder="产品名称/供应链SKU"
            clearable
          >
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-select
            style="width: 230px"
            v-model="search.productType"
            placeholder="产品分类"
            clearable
          >
            <el-option label="在售品" :value="1" />
            <el-option label="清仓品" :value="2" />
          </el-select>
        </div>
        <el-checkbox v-model="search.hasStock" @change="handleStockChange" label="仅看有货" />
        <purchaseTips />
      </div>
      <div class="d-flex operator-btns">
        <el-tooltip content="内购自提、反馈群" placement="bottom">
          <div class="group-entry" @click="showGroupDialog = true">
            <SvgIcon icon="dingtalkicon" class="group-icon" />
          </div>
        </el-tooltip>
        <el-button
          @click="toOrderCenter"
          @mouseenter="orderDetailIcon = 'orderDetailHover'"
          @mouseleave="orderDetailIcon = 'orderDetail'"
          @mousedown="orderDetailIcon = 'orderDetailActive'"
          @mouseup="orderDetailIcon = 'orderDetail'"
        >
          <template #icon>
            <SvgIcon :icon="orderDetailIcon" class="svg-icon svg-icon-3" />
          </template>
          <span class="ms-1">我的订单</span>
        </el-button>
        <el-button
          @click="toShoppingCart"
          @mouseenter="shoppingCartIcon = 'shoppingCartHover'"
          @mouseleave="shoppingCartIcon = 'shoppingCart'"
          @mousedown="shoppingCartIcon = 'shoppingCartActive'"
          @mouseup="shoppingCartIcon = 'shoppingCart'"
        >
          <template #icon>
            <el-badge :value="cartCount" type="danger" id="cartIcon" style="font-style: normal">
              <SvgIcon :icon="shoppingCartIcon" class="svg-icon svg-icon-2" />
              <!--              <SvgIcon icon="shoppingCart" class="svg-icon svg-icon-2 text-primary" />-->
            </el-badge>
          </template>
          <span class="ms-1">购物车</span>
        </el-button>
        <GroupDialog v-model="showGroupDialog" />
      </div>
    </header>
    <el-tabs class="mt-3" v-model="curTab" @tab-change="handleTabChange">
      <el-tab-pane label="综合" name="complex" />
      <el-tab-pane name="stock">
        <template #label>
          库存
          <span
            class="caret-wrapper"
            :class="{
              ascend: search.stockOrderBy === 'asc',
              descend: search.stockOrderBy === 'desc',
            }"
          >
            <i
              class="sort-caret ascending"
              :class="{ 'asc-actived': search.stockOrderBy === 'asc' }"
              @click="search.stockOrderBy = 'asc'"
            ></i>
            <i
              class="sort-caret descending"
              :class="{ 'desc-actived': search.stockOrderBy === 'desc' }"
              @click="search.stockOrderBy = 'desc'"
            ></i>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="价格" name="price">
        <template #label>
          价格
          <span class="caret-wrapper">
            <i
              class="sort-caret ascending"
              :class="{ 'asc-actived': search.priceOrderBy === 'asc' }"
              @click="search.priceOrderBy = 'asc'"
            ></i>
            <i
              class="sort-caret descending"
              :class="{ 'desc-actived': search.priceOrderBy === 'desc' }"
              @click="search.priceOrderBy = 'desc'"
            ></i>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul
      v-infinite-scroll="queryList"
      class="internal-list"
      style="overflow: auto"
      infinite-scroll-distance="100"
      v-loading="listLoading"
    >
      <li v-for="item in mallProductList" :key="item.productSku" class="internal-list-item">
        <div v-if="!item?.remainingStock" class="overlay">
          <div class="empty">无货</div>
        </div>
        <div class="position-relative user-select-none">
          <img :src="item.imageUrl" class="product-img" alt="" />
        </div>
        <div class="product-title" :class="{ 'no-stock-color': !item?.remainingStock }">
          <OverflowTooltip :content="item?.productTitle" :line="2" />
        </div>
        <div class="product-sku" :class="{ 'no-stock-color': !item?.remainingStock }">
          {{ item?.productSku }}
        </div>
        <div class="product-stock" :class="{ 'no-stock-color': !item?.remainingStock }">
          <span>库存:</span>
          <span class="stock">{{ item?.remainingStock || 0 }}</span>
        </div>
        <div class="product-labels" v-if="item?.productType ?? false">
          <Tag :color="item?.productType === 1 ? 'green' : 'purple'">
            {{ item?.productType === 1 ? '在售品' : '清仓品' }}
          </Tag>
        </div>
        <div class="product-bottom">
          <div class="price" :class="{ 'no-stock-color': !item?.remainingStock }">
            ¥{{ item?.price }}
          </div>
          <!--          <div class="add-cart cursor-pointer" @click="addCart(item)">
            <SvgIcon icon="addToCart" class="svg-icon svg-icon-2" />
          </div>-->
          <div class="d-flex align-items-end">
            <div
              class="product-detail cursor-pointer"
              :class="{ 'no-stock-color': !item?.remainingStock }"
              @click="toDetail(item?.productUrl)"
            >
              详情
            </div>
            <div
              class="add-cart cursor-pointer"
              :class="{ 'no-stock-btn': !item?.remainingStock }"
              @click="
                (e) => {
                  addCart(item, e);
                }
              "
            >
              <SvgIcon icon="addToCart" class="svg-icon svg-icon-3" />
            </div>
          </div>
        </div>
        <!--        <div class="product-icon" id="productIcon"></div>-->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="internalPurchase">
  // import { platformApi } from '@/api';
  import { productApi, ProductApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import useList from '@/views/lute-os/hooks/list/useList';
  import PurchaseTips from '../components/purchaseTips.vue';
  import GroupDialog from '../components/groupDialog.vue';
  const router = useRouter();

  const curTab = ref('complex');
  const PAGE_SIZE = 16;
  const totalPages = ref(0);
  const lock = ref(false);
  const mallProductList = ref([]);

  const lastPage = ref(0);
  const {
    search,
    // searchData,
    pagination: { current },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductMallUserQueryProductList.RequestBody,
    ProductApi.LuteosProductMallUserQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      priceOrderBy: undefined,
      stockOrderBy: undefined,
      hasStock: false,
      productType: undefined,
      // labelCodeList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMallUserQueryProductList,
    interceptSearchData: (searchData) => {
      return {
        ...searchData,
        hasStock: searchData.hasStock ? 1 : 0,
      };
    },
    onSuccess: (res) => {
      if (!lock.value) mallProductList.value = [];
      res?.mallProductList?.forEach((item) => {
        if (mallProductList.value?.find((k) => k.productSku === item?.productSku)) return;
        if (item?.productSku) mallProductList.value.push(item);
      });
      // mallProductList.value = mallProductList.value.concat(res?.mallProductList);
      totalPages.value = res?.pages;
      lock.value = false;
    },
  });

  const queryList = async () => {
    if (current.value < totalPages.value && totalPages.value > 1 && !lock.value) {
      current.value += 1;
      lock.value = true;
    }
  };

  const handleStockChange = () => {
    mallProductList.value = [];
  };

  // 查询购物车数量
  const cartCount = ref(0);
  const shopCartList = ref([]);
  const queryCartCount = async () => {
    const res = await productApi.luteosProductMallUserQueryCartCount();
    cartCount.value = res?.cartProductCount;
    const data = await productApi.luteosProductMallUserQueryShoppingCartList({
      pageNum: 1,
      pageSize: 100,
    });
    shopCartList.value = data?.shopCartList;
  };

  const toDetail = (url) => {
    if (!url) {
      ElMessage.warning('暂无详情链接');
      return;
    }
    openWindow(url);
  };

  const handleTabChange = (val) => {
    switch (val) {
      case 'complex':
        search.priceOrderBy = undefined;
        search.stockOrderBy = undefined;
        break;
      case 'stock':
        search.priceOrderBy = undefined;
        search.stockOrderBy = 'desc';
        break;
      case 'price':
        search.stockOrderBy = undefined;
        search.priceOrderBy = 'desc';
        break;
      default:
        break;
    }
  };

  const addResult = ref(true);
  // 加入购物车
  const addCart = async (item, e) => {
    if (!item.remainingStock) return;
    if (shopCartList.value?.length >= 100) {
      ElMessage.warning('购物车已满，请先结算~');
      return;
    }
    if (
      shopCartList.value?.find((k) => k.productSku === item.productSku)?.quantity >=
      item?.remainingStock
    ) {
      ElMessage.closeAll();
      ElMessage.warning('购物车加购数量已达到最大库存量');
      return;
    }
    // queryCartCount();
    animateToCart(e);
    try {
      await productApi.luteosProductMallUserOperateShoppingCart({
        quantity: 1,
        operateType: 'add_shopping_cart',
        productSku: item.productSku,
      });
      addResult.value = true;
    } catch (e) {
      ElMessage.closeAll();
      ElMessage.warning(e?.message);
      addResult.value = false;
      /* setTimeout(() => {
        cartCount.value -= 1;
      }, 800); */
    }
  };

  const orderDetailIcon = ref('orderDetail');
  const shoppingCartIcon = ref('shoppingCart');

  const toOrderCenter = () => {
    router.push('/internalPurchase/orderCenter');
  };

  const toShoppingCart = () => {
    router.push('/shoppingCart/index');
  };

  const showGroupDialog = ref(false);

  // 加入购物车动画
  const cartIcon = ref(null);
  const targetElement = ref(null);

  const containerRef = ref(null);
  const animateToCart = async (e) => {
    // if (!isAnimating.value) {
    cartIcon.value = document.getElementById('cartIcon')?.querySelector('sup');
    targetElement.value = e.target?.querySelector('svg') || e.target;
    // isAnimating.value = true;
    const start = targetElement.value?.getBoundingClientRect();
    const end = cartIcon.value?.getBoundingClientRect();

    const parentDiv = document.createElement('div');
    const childDiv = document.createElement('div');
    // document.body.appendChild(parentDiv);
    containerRef.value?.appendChild(parentDiv);
    parentDiv.appendChild(childDiv);
    await nextTick();
    parentDiv.style.setProperty('--translateX', `${end.left - start.left}px`);
    parentDiv.style.setProperty('--left', `${start.left + start.width / 2}px`);
    parentDiv.style.setProperty('--top', `${start.top}px`);
    // parentDiv.setAttribute('class', 'parent-ball');
    parentDiv.className = 'parent-ball';
    childDiv.style.setProperty('--translateY', `${end.top - start.top}px`);
    // childDiv.setAttribute('class', 'child-ball');
    childDiv.className = 'child-ball';
    setTimeout(() => {
      cartCount.value += addResult.value ? 1 : 0;
      parentDiv.remove();
    }, 800);
  };

  // const labelCodeList = ref([]);
  // const getLabelCodeList = async () => {
  //   const res = await platformApi.platformLabelQueryLabelList({
  //     module: 'mall_product',
  //     pageNum: 1,
  //     pageSize: 500,
  //     status: 1,
  //   });
  //   labelCodeList.value = res?.labelInfoList || [];
  // };

  onMounted(() => {
    // getLabelCodeList();
  });

  onActivated(() => {
    queryCartCount();
    // getLabelCodeList();
    current.value = 1;
  });
</script>

<style scoped lang="scss">
  .internal-container {
    width: 100%;
    min-width: 800px;
    //padding: 16px 24px;
    padding: 16px 0;
    background-color: #ffffff;
    .internal-header {
      width: 100%;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      :deep(.el-input),
      :deep(.el-select) {
        --el-input-height: 40px;
        --el-component-size: 40px;
      }
      :deep(.el-input__wrapper),
      :deep(.el-select__wrapper) {
        height: 40px !important;
        box-sizing: border-box;
      }
      :deep(.el-checkbox__label) {
        color: #000000d9;
        font-family: 'PingFang SC Regular';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
      }
    }

    :deep(.el-tabs__header) {
      padding-left: 32px;
    }

    ul {
      padding: 16px 0 16px 23px;
    }

    .internal-list {
      width: 100%;
      list-style: none;
      height: calc(100vh - 240px);
      display: flex;
      flex-wrap: wrap;
      row-gap: 16px;
      column-gap: 12px;

      &-item {
        width: 218px;
        height: 350px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #fff;
        padding: 10px;
        position: relative;
        box-shadow: 0 4px 16px 0 #e7e9f4;
        border: 1px solid transparent;

        // 无货遮罩
        .overlay {
          position: absolute;
          width: 198px;
          height: 148px;
          background-color: #ffffff;
          opacity: 0.7;
          z-index: 999;
          border-radius: 8px;
          .empty {
            background-color: rgba(0, 0, 0, 0.75);
            width: 65px;
            height: 65px;
            margin: 41.78px auto;
            fill: #00000099;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            color: #ffffff;
            font-family: 'PingFang SC Regular';
            font-size: 16.26px;
            font-style: normal;
            font-weight: 500;
            line-height: 25.55px;
          }
        }

        .product-img {
          width: 198px;
          height: 148px;
          border-radius: 5px;
        }
        .product-stock {
          color: #00000073;
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px;
          margin-top: 4px;
          .stock {
            font-family: 'DIN';
          }
        }
        .product-title {
          width: 100%;
          color: #000000d9;
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          font-weight: 550;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 8px;
        }
        .product-sku {
          width: 100%;
          color: #00000073;
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          margin-top: 4px;
        }
        .product-labels {
          /*display: flex;
          gap: 5px;
          margin-top: 10px;*/
          margin-top: 10px;
          max-width: 100%; /* Adjust the width as needed */
          display: block; /* Ensures the container takes full width */
          overflow: hidden; /* Hide overflow */
          text-overflow: ellipsis; /* Add ellipsis at the end if text is too long */
          white-space: nowrap; /* Prevents the tags from wrapping onto multiple lines */
        }
        .product-bottom {
          width: 198px;
          position: absolute;
          bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: end;
          .price {
            color: #262626;
            font-family: 'DIN';
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
          }
          .product-detail {
            height: 24px;
            display: inline-flex;
            padding: 4px 10px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border: 1px solid #4372ff;
            color: #4372ff;
            font-family: 'DIN';
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px;
            border-radius: 2px 0 0 2px;
          }

          .add-cart {
            height: 24px;
            display: inline-flex;
            padding: 4px 10px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 0 2px 2px 0;
            //border: 1px solid #ffa500;
            background: #4372ff;
            transition: background-color 0.3s ease;
            &:hover {
              background: #698eff;
            }
            &:active {
              background: #3c67e5;
            }
          }
          .no-stock-btn {
            background-color: #00000040;
            &:hover {
              background: #00000040;
            }
            &:active {
              background: #00000040;
            }
          }
        }
      }
      &-item:hover {
        border: 1px solid #4372ff;
      }
    }
  }

  .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 14px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
    .sort-caret {
      width: 0;
      height: 0;
      border: solid 5px transparent;
      position: absolute;
      left: 7px;
    }
    .sort-caret.ascending {
      border-bottom-color: var(--el-text-color-placeholder);
      top: -5px;
      &:hover {
        border-bottom-color: var(--el-color-primary);
      }
    }
    .sort-caret.descending {
      border-top-color: var(--el-text-color-placeholder);
      bottom: -3px;
      &:hover {
        border-top-color: var(--el-color-primary);
      }
    }
    .asc-actived {
      border-bottom-color: var(--el-color-primary) !important;
    }
    .desc-actived {
      border-top-color: var(--el-color-primary) !important;
    }
  }

  :deep(.parent-ball) {
    width: 10px;
    height: 10px;
    //background-color: blue;
    z-index: 999;
    position: fixed;
    left: var(--left);
    top: var(--top);
    animation: moveX 0.8s linear forwards;
  }
  :deep(.child-ball) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: moveY 0.8s cubic-bezier(0.66, 1.56, 1, 1) forwards;
  }
  @keyframes moveX {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(var(--translateX));
    }
  }
  @keyframes moveY {
    0% {
      transform: translateY(0);
      background-color: #3c67e5;
    }
    100% {
      transform: translateY(var(--translateY));
      background-color: #ff4b55;
    }
  }

  :deep(.el-badge__content--danger) {
    background-color: #ff4b55;
  }

  .operator-btns {
    .el-button {
      border: 1px solid #d9d9d9;
      background-color: #ffffff;
      height: 40px;
      color: #000000d9;
    }
    .el-button:hover {
      border: 1px solid #698eff;
      color: #698eff;
    }
    .el-button:active {
      border: 1px solid #3c67e5;
      color: #3c67e5;
    }
    .group-entry {
      width: 40px;
      height: 40px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: #ffffff;
      &:hover {
        border-color: #698eff;
        box-shadow: 0 4px 12px rgba(105, 142, 255, 0.25);
      }
      &:active {
        border-color: #3c67e5;
        box-shadow: 0 2px 8px rgba(60, 103, 229, 0.35);
      }
    }
    .group-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  /*.svg-icon {
    stroke: red;
    //color: red;
    //fill: red;
  }*/

  .no-stock-color {
    color: #00000040 !important;
    border-color: #00000040 !important;
  }

  :deep(.el-tabs__item) {
    font-family: 'PingFang SC Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }

  :deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    background-color: unset;
    border: 1.5px solid #d9d9d9;
    border-radius: 3px;
  }
  .el-tag {
    border-width: 0;
    margin-right: 5px;
  }
  :deep(.el-select__wrapper) {
    height: 40px;
  }
</style>
