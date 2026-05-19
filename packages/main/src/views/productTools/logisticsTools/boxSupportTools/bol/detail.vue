<template>
  <div id="bol-detail" :class="{ 'start-pdf': startPdf }">
    <table>
      <tr>
        <td colspan="9">
          <div>
            <span :style="{ fontWeight: 700, fontSize: '20px' }">
              SUPPLEMENT TO THE BILL OF LADING
            </span>
            <span
              :style="{
                verticalAlign: 'top',
              }"
            >
              Page
            </span>
            <span
              :style="{
                verticalAlign: 'top',
                textDecoration: 'underline',
              }"
            >
              2 OF 2
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="8" :style="{ textAlign: 'end', borderRight: 'none' }">Bill of Lading No:</td>
        <td :style="{ borderLeft: 'none' }">
          <input
            :style="{ width: '100%' }"
            v-model="bolLadingBillItemBean.referenceCode2"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <th :style="{ backgroundColor: '#000', color: '#fff', fontSize: '15px' }" colspan="9">
          CUSTOMER ORDER INFORMATION
        </th>
      </tr>
      <tr>
        <th class="tableBanner" colspan="4">Customer Order Number</th>
        <th class="tableBanner"># PKGS</th>
        <th class="tableBanner">Weight</th>
        <th class="tableBanner">Pallet/Slip(Circle One)</th>
        <th class="tableBanner" colspan="2">Additional Shipper Info</th>
      </tr>
      <tbody>
        <tr v-for="(item, index) in bolLadingBillItemBean.detailList" :key="index">
          <td colspan="4">
            <input :style="{ width: '100%' }" type="text" v-model="item.referenceCode" />
          </td>
          <td>
            <input type="text" v-model="item.totalPackageCount" />
          </td>
          <td>
            <input type="text" v-model="item.totalWeight" />
          </td>
          <td>{{ item.type }}</td>
          <td>
            <input :style="{ fontWeight: 600 }" type="text" v-model="item.volume" />
          </td>
          <td :style="{ fontWeight: 600 }" :rowspan="item.count || 1">
            {{ item.mixPalletNumber }}
          </td>
        </tr>
        <tr>
          <td colspan="4">PAGE SUBTOTAL</td>
          <td>{{ totalQty }}</td>
          <td>{{ totalWeight }}</td>
          <td></td>
          <td :style="{ fontWeight: 600 }">
            {{ totalPalletQty }}
          </td>
          <td></td>
        </tr>
        <tr>
          <th :style="{ backgroundColor: '#000', color: '#fff', fontSize: '15px' }" colspan="9">
            CARRIER INFORMATION
          </th>
        </tr>
        <tr>
          <th class="tableBanner" colspan="2">Handling Unit</th>
          <th class="tableBanner" colspan="2">PACKAGE</th>
          <th class="tableBanner" rowspan="2">WEIGHT</th>
          <th class="tableBanner" rowspan="2">H.M(X)</th>
          <th class="tableBanner" rowspan="2">Commondity Description</th>
          <th class="tableBanner" colspan="2">LTL ONLY</th>
        </tr>
        <tr>
          <th class="tableBanner">QTY</th>
          <th class="tableBanner">TYPE</th>
          <th class="tableBanner">QTY</th>
          <th class="tableBanner">TYPE</th>
          <th class="tableBanner" colspan="1">NMFC #</th>
          <th class="tableBanner" colspan="1">CLASS</th>
        </tr>
        <tr v-for="(item, index) in bolLadingBillItemBean.bolDetailCarrierInfoList" :key="index">
          <td>
            <input :style="{ fontWeight: 600 }" type="text" v-model="item.palletQty" />
          </td>
          <td>{{ item.type }}</td>
          <td><input type="text" v-model="item.totalQty" /></td>
          <td>{{ item.ptype }}</td>
          <td><input type="text" v-model="item.totalWeight" /></td>
          <td><input type="text" v-model="item.hmx" /></td>
          <td><input type="text" v-model="item.description" /></td>
          <td><input type="text" v-model="item.nmfc" /></td>
          <td colspan="1"><input type="text" v-model="item.ltlClass" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
  import Decimal from 'decimal.js';
  import type { BolLadingBillItemBean } from '@/api/erp/data-contracts';

  const props = defineProps<{
    bolLadingBillItemBean: BolLadingBillItemBean;
    startPdf: boolean;
  }>();
  const totalQty = computed(() => {
    return (
      props.bolLadingBillItemBean.detailList
        ?.reduce((acc, item) => {
          return acc.plus(Number(item.totalPackageCount) || 0);
        }, new Decimal(0))
        .toNumber() || 0
    );
  });

  const totalWeight = computed(() => {
    return (
      props.bolLadingBillItemBean.detailList
        ?.reduce((acc, item) => {
          return acc.plus(Number(item.totalWeight) || 0);
        }, new Decimal(0))
        .toNumber() || 0
    );
  });
  const totalPalletQty = computed(() => {
    return (
      props.bolLadingBillItemBean.detailList
        ?.reduce((acc, item) => {
          return acc.plus(Number(item.volume) || 0);
        }, new Decimal(0))
        .toNumber() || 0
    );
  });
  watchEffect(() => {
    if (!props.bolLadingBillItemBean.bolDetailCarrierInfoList) {
      return;
    }
    props.bolLadingBillItemBean.bolDetailCarrierInfoList[0].totalWeight = totalWeight.value;
    props.bolLadingBillItemBean.bolDetailCarrierInfoList[0].totalQty = totalQty.value;
    props.bolLadingBillItemBean.bolDetailCarrierInfoList[0].palletQty = totalPalletQty.value;
  });
</script>

<style lang="scss" scoped>
  #bol-detail {
    width: 800px;
    font-size: 12px;
    line-height: 1.5;
    &.start-pdf {
      border: none;
      padding-top: 30px;
      transform: scale(0.9);
      input {
        border: none;
        background: #fff;
        text-align: center;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      th,
      td {
        border: 1px solid #000;
        padding: 5px;
        text-align: center;
      }
      th {
        font-size: 14px;
      }
      .tableBanner {
        background-color: #c8c8fa;
        font-weight: bold;
      }
      input {
        width: 100%;
        background: #e3fafa;
        border: 1px solid transparent;
        &:focus {
          outline: none;
          border: 1px solid #666;
        }
      }
    }
    .bol-detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      div {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
