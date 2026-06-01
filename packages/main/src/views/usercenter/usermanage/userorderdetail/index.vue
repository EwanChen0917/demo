<template>
  <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
    <div class="row g-5 g-xl-10 mb-xl-10">
      <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <div class="card card-flush h-md-100">
          <div class="card-header pt-5">
            <h3 class="card-title text-gray-800">订单信息（#{{ orderDetail.orderId }}）</h3>
            <div class="status-desc">
              <span class="status_completed3" v-if="orderDetail.financialStatusDesc">
                <span class="scale_txt">{{ orderDetail.financialStatusDesc }}</span>
              </span>
              <span class="status_completed3" v-if="orderDetail.fulfillmentStatusDesc">
                <span class="scale_txt">{{ orderDetail.fulfillmentStatusDesc }}</span>
              </span>
            </div>
          </div>
          <div class="card-body pt-5">
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">平台</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ orderDetail.platform }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">付款状态</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.financialStatusDesc }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">发货状态</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.fulfillmentStatusDesc }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">下单时间</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.purchaseTime }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">付款时间</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.paymentTime }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">支付方式</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.paymentMethod }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">物流方式</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ orderDetail.shippingTitle }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <div class="card card-flush bg-color">
          <div class="card-header pt-5">
            <h3 class="card-title text-gray-800">收件人信息</h3>
          </div>
          <div class="card-body pt-5">
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">收货人姓名</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ receiverInfo.firstName }}{{ receiverInfo.lastName }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">邮箱</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.email }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">公司</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.company }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">地址1</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.address1 }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">地址2</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.address2 }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">城市</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.city }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">省</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.province }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">国家</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.country }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">邮编</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ receiverInfo.zipCode }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <div class="card card-flush bg-color">
          <div class="card-header pt-5">
            <h3 class="card-title text-gray-800">账单地址信息</h3>
          </div>
          <div class="card-body pt-5">
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">姓名</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">
                  {{ billAddress.firstName }}{{ billAddress.lastName }}
                </span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">邮箱</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.email }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">公司</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.company }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">地址1</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.address1 }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">地址2</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.address2 }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">城市</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.city }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">省</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.province }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">国家</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.country }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="d-flex flex-stack">
              <div class="text-gray-700 fw-semibold fs-6 me-2">邮编</div>
              <div class="d-flex align-items-senter">
                <span class="text-gray-800 fw-semibold fs-6 me-2">{{ billAddress.zipCode }}</span>
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-flush">
      <div class="card-body pt-0">
        <h3 class="pro-title">商品信息</h3>
        <el-table ref="tableRef" :data="orderItems">
          <el-table-column prop="image" label="商品图片" align="center" headerAlign="center">
            <template #default="scope">
              <img v-if="scope.row.image" class="logo-img" :src="scope.row.image" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" align="center" headerAlign="center" />
          <el-table-column prop="sku" label="SKU" align="center" headerAlign="center">
            <template #default="scope">
              {{ scope.row.sku || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="unitPrice" label="单价" align="center" headerAlign="center">
            <template #default="scope">
              {{ scope.row.unitPrice + ' ' + orderDetail.currency }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" align="center" headerAlign="center" />
          <el-table-column prop="subtotal" label="小计" align="center" headerAlign="center" />
        </el-table>
        <div class="split-line-wrap">
          <div class="my-3 split-line"></div>
          <!-- <h3 class="pro-title">金额信息</h3> -->
        </div>
        <div class="footer-wrap">
          <div class="d-flex my-flex-stack">
            <div class="text-gray-600 fw-semibold fs-9 w-50 text-xl-center">商品总额</div>
            <div class="w-50 text-xl-center">
              <span class="fw-semibold text-gray-600 fs-9">
                {{ orderDetail.subtotalPrice + ' ' + orderDetail.currency }}
              </span>
            </div>
          </div>
          <div class="separator separator-dashed my-3"></div>
          <div class="d-flex my-flex-stack">
            <div class="text-gray-600 fw-semibold fs-9 w-50 text-xl-center">运费</div>
            <div class="w-50 text-xl-center">
              <span class="fw-semibold text-gray-600 fs-9">
                {{ orderDetail.shippingPrice + ' ' + orderDetail.currency }}
              </span>
            </div>
          </div>
          <div class="separator separator-dashed my-3"></div>
          <div class="d-flex my-flex-stack">
            <div class="text-gray-600 fw-semibold fs-9 w-50 text-xl-center">优惠</div>
            <div class="w-50 text-xl-center">
              <span class="fw-semibold text-gray-600 fs-9">
                -{{ orderDetail.discountPrice + ' ' + orderDetail.currency }}
              </span>
            </div>
          </div>
          <div class="separator separator-dashed my-3"></div>
          <div class="d-flex my-flex-stack">
            <div class="text-gray-900 fs-6 fw-bold w-50 text-xl-center">订单金额</div>
            <div class="w-50 text-xl-center">
              <span class="text-gray-900 fw-bold fs-6 me-2">
                {{ orderDetail.totalPrice + ' ' + orderDetail.currency }}
              </span>
            </div>
          </div>
          <div class="separator separator-dashed my-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="userorderdetail">
import { Edit } from '@element-plus/icons-vue';
  import { userApi } from '@/api/index';

  const route = useRoute();
  const orderDetail = ref({});
  const receiverInfo = ref({});
  const billAddress = ref({});
  const orderItems = ref([]);

  onMounted(() => {
    queryOrderDetail();
  });

  const queryOrderDetail = async () => {
    const res: any = await userApi.luteosUserQueryOrderDetail({ orderId: route.query.orderId });
    console.log(res);
    orderDetail.value = res;
    receiverInfo.value = res.receiverInfo || {};
    billAddress.value = res.billAddress || {};
    orderItems.value = res.orderItems || [];
  };
</script>

<style lang="scss" scoped>
  .app-main {
    background: #f9f9f9 !important;
  }

  .table-wrap {
    background: #fff;
    min-height: 500px;
    padding-top: 30px;
  }
  .table-title {
    font-weight: 500;
    font-size: 1.275rem;
    color: #181c32;
    margin-left: 2rem;
  }

  .footer-wrap {
    float: right;
    z-index: 100;
    width: calc((100% - 25rem) * 0.4);
    margin-right: 12px;
    margin-bottom: 10px;
    margin-top: -2px;
  }

  .split-line-wrap {
    padding: 0 2.25rem;
    margin-top: -1.25rem;
  }
  .split-line {
    border: 1px dashed #f4f4f4 !important;
  }

  .my-flex-stack {
    height: 56px;
    line-height: 56px;
  }
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .badge-wrap {
    height: 36px;
    line-height: 36px;
    margin-right: 20px;
  }
  .badge-wrap-next {
    margin-left: 10px;
    cursor: pointer;
  }
  .badge-wrap-pre {
    cursor: pointer;
  }
  .is-disabled {
    cursor: not-allowed;
  }
  .bg-color {
    background: #fff;
  }
  .logo-img {
    width: 100px;
    height: 100px;
  }
  .status_completed3 {
    height: 25px;
    margin-top: 15px;
  }
  .status-desc {
    height: 50px;
    line-height: 55px;
  }
  .pro-title {
    font-weight: 500;
    font-size: 1.275rem;
    color: #3f4254;
    display: flex;
    margin: 0.5rem;
    margin-top: 2rem;
  }
</style>
