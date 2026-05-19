<template>
  <table id="operation-package-order-invoice">
    <thead>
      <tr>
        <th
          colspan="11"
          :style="{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
          }"
        >
          COMMERCIAL INVOICE
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="5">1.SELLER/EXPORTER</td>
        <td colspan="4">3.INVOICE NO.</td>
        <td colspan="2">4.DATE</td>
      </tr>
      <tr>
        <td colspan="5"><input type="text" v-model="operationPackageOrderInvoice.seller" /></td>
        <td colspan="4"><input type="text" v-model="operationPackageOrderInvoice.invoiceNo" /></td>
        <td colspan="2"><input type="text" v-model="operationPackageOrderInvoice.signDate" /></td>
      </tr>
      <tr>
        <td rowspan="4" colspan="5">
          <textarea type="text" v-model="operationPackageOrderInvoice.sellerAddress"></textarea>
        </td>
        <td colspan="4">5.PO NO.</td>
        <td colspan="2">6.CURRENCY</td>
      </tr>
      <tr>
        <td colspan="4"><input type="text" v-model="operationPackageOrderInvoice.poCode" /></td>
        <td colspan="2"><input type="text" v-model="operationPackageOrderInvoice.currency" /></td>
      </tr>
      <tr>
        <td colspan="4">7.SHIPPING METHOD</td>
        <td colspan="2">8.PORT OF LOADING</td>
      </tr>
      <tr>
        <td colspan="4">
          <input type="text" v-model="operationPackageOrderInvoice.shippingMethod" />
        </td>
        <td colspan="2">
          <input type="text" v-model="operationPackageOrderInvoice.portOfLading" />
        </td>
      </tr>
      <tr>
        <td colspan="5">2.CONSIGNEE AND ADDRESS</td>
        <td colspan="4">9.PORT OF DISCHARGE</td>
        <td colspan="2">10.PLACE OF DELIVERY</td>
      </tr>
      <tr>
        <td colspan="5">
          <input type="text" v-model="operationPackageOrderInvoice.customerName" />
        </td>
        <td colspan="4">
          <input type="text" v-model="operationPackageOrderInvoice.portOfDischarge" />
        </td>
        <td colspan="2">
          <input type="text" v-model="operationPackageOrderInvoice.placeOfDelivery" />
        </td>
      </tr>
      <tr>
        <td colspan="5" rowspan="4">
          <textarea name="" id="" v-model="operationPackageOrderInvoice.customerAddress"></textarea>
        </td>
        <td colspan="4">11.PAYMENT METHOD</td>
        <td colspan="2">12.L/C NO.</td>
      </tr>
      <tr>
        <td colspan="4">
          <input type="text" v-model="operationPackageOrderInvoice.paymentMethod" />
        </td>
        <td colspan="2">
          <input type="text" v-model="operationPackageOrderInvoice.lcCode" />
        </td>
      </tr>
      <tr>
        <td colspan="6">13.PAYMENT TERM</td>
      </tr>
      <tr>
        <td colspan="6">
          <input type="text" v-model="operationPackageOrderInvoice.paymentTerm" />
        </td>
      </tr>
      <tr>
        <td colspan="11">
          THE FOLLOWING SIGNING PARTIES AGREE TO MAKE THE TRANSACTION ON THE TERMS AND CONDITIONS
          STATED BELOW:
        </td>
      </tr>
      <tr>
        <td colspan="1">14.MARKS/NO'S</td>
        <td colspan="3">15.SKU</td>
        <td colspan="2">16.DESCRIPTION OF GOODS</td>
        <td colspan="2">17.QUANTITY</td>
        <td colspan="2">18.UNIT PRICE</td>
        <td colspan="1">19.AMOUNT</td>
      </tr>
      <tr>
        <td :rowspan="operationPackageOrderInvoice.invoiceDetailList?.length">
          <textarea v-model="operationPackageOrderInvoice.invoiceDetailList![0].code"></textarea>
        </td>
        <td colspan="2">
          <input type="text" v-model="operationPackageOrderInvoice.invoiceDetailList![0].sku" />
        </td>
        <td colspan="3">
          <input
            type="text"
            v-model="operationPackageOrderInvoice.invoiceDetailList![0].productName"
          />
        </td>
        <td colspan="1">
          <input type="text" v-model="operationPackageOrderInvoice.invoiceDetailList![0].qty" />
        </td>
        <td colspan="1">PCS</td>
        <td colspan="2">
          <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
            $
            <input
              type="text"
              v-model="operationPackageOrderInvoice.invoiceDetailList![0].unitPrice"
            />
          </div>
        </td>
        <td>
          ${{
            (operationPackageOrderInvoice.invoiceDetailList![0].unitPrice || 0) *
            (operationPackageOrderInvoice.invoiceDetailList![0].qty || 0)
          }}
        </td>
      </tr>
      <template v-if="operationPackageOrderInvoice.invoiceDetailList?.length! > 1">
        <tr
          v-for="(item, idx) in operationPackageOrderInvoice.invoiceDetailList?.length! - 1"
          :key="idx"
        >
          <td colspan="2">
            <input
              type="text"
              v-model="operationPackageOrderInvoice.invoiceDetailList![item].sku"
            />
          </td>
          <td colspan="3">
            <input
              type="text"
              v-model="operationPackageOrderInvoice.invoiceDetailList![item].productName"
            />
          </td>
          <td colspan="1">
            <input
              type="text"
              v-model="operationPackageOrderInvoice.invoiceDetailList![item].qty"
            />
          </td>
          <td colspan="1">PCS</td>
          <td colspan="2">
            <div
              :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }"
            >
              $
              <input
                type="text"
                v-model="operationPackageOrderInvoice.invoiceDetailList![item].unitPrice"
              />
            </div>
          </td>
          <td>
            ${{
              (operationPackageOrderInvoice.invoiceDetailList![item].unitPrice || 0) *
              (operationPackageOrderInvoice.invoiceDetailList![item].qty || 0)
            }}
          </td>
        </tr>
      </template>
      <tr>
        <td colspan="8" :style="{ borderTop: 'none', borderBottom: 'none' }"></td>
        <td colspan="2">SUBTOTAL</td>
        <td>${{ toThousands(subtotal, 2) }}</td>
      </tr>
      <tr>
        <td colspan="8" :style="{ borderTop: 'none', borderBottom: 'none' }"></td>
        <td colspan="2">SHIPPING CHARGE</td>
        <td>
          $
          <input
            :style="{ width: '58px' }"
            type="text"
            v-model="operationPackageOrderInvoice.shippingCharge"
          />
        </td>
      </tr>
      <tr>
        <td colspan="8" :style="{ borderTop: 'none', borderBottom: 'none' }"></td>
        <td colspan="2">OTHER</td>
        <td>
          $
          <input
            :style="{ width: '58px' }"
            type="text"
            v-model="operationPackageOrderInvoice.other"
          />
        </td>
      </tr>
      <tr>
        <td colspan="8" :style="{ borderTop: 'none', borderBottom: 'none' }"></td>
        <td colspan="2">TOTAL VALUE</td>
        <td>$ {{ toThousands(totalValue, 2) }}</td>
      </tr>
      <tr>
        <td colspan="11">SAY TOTAL US DOLLAR {{ numberToWords(Number(totalValue)) }} ONLY.</td>
      </tr>
      <tr>
        <td colspan="11" :style="{ borderTop: 'none', borderBottom: 'none' }">
          TRADE TERM
          <input type="text" v-model="operationPackageOrderInvoice.tradeTerm" />
        </td>
      </tr>
      <tr>
        <td colspan="11" :style="{ borderTop: 'none', borderBottom: 'none' }">
          TOTAL QUANTITY:
          <input
            :style="{ width: '54px' }"
            type="text"
            v-model="operationPackageOrderInvoice.totalQty"
          />
          PCS IN
          <input
            :style="{ width: '54px' }"
            type="text"
            v-model="operationPackageOrderInvoice.totalPackageQty"
          />
          CTNS
        </td>
      </tr>
      <tr>
        <td colspan="11" :style="{ borderTop: 'none', borderBottom: 'none' }">
          TOTAL G.W.:
          <input
            :style="{ width: '54px' }"
            type="text"
            v-model="operationPackageOrderInvoice.totalGrossWeight"
          />
          KGS
        </td>
      </tr>
      <tr>
        <td colspan="11" :style="{ borderTop: 'none', borderBottom: 'none' }">
          COUNTRY OF ORIGIN: CHINA
        </td>
      </tr>
      <tr>
        <td colspan="11">
          <div>DECLARATION:</div>
          <div>
            1. We certify that this invoice is true and correct in all respects as to the price and
            description of the goods referred to herein.
          </div>
          <div>
            2. We certify that the goods described have been supplied in accordance with the order
            (see the PO No. above).
          </div>
          <div>3. We hereby certify that the above-mentioned goods are of China origin.</div>
        </td>
      </tr>
      <tr>
        <td
          colspan="7"
          :style="{ borderTop: 'none', borderBottom: 'none', borderRight: 'none' }"
        ></td>
        <td colspan="4" :style="{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none' }">
          EXPORTER:
        </td>
      </tr>
      <tr>
        <td
          colspan="7"
          :style="{ borderTop: 'none', borderBottom: 'none', borderRight: 'none' }"
        ></td>
        <td colspan="4" :style="{ borderTop: 'none', borderBottom: 'none', borderLeft: 'none' }">
          <input type="text" v-model="operationPackageOrderInvoice.exportor" />
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td
          colspan="7"
          :style="{ borderTop: 'none', borderBottom: 'none', borderRight: 'none' }"
        ></td>
        <td colspan="4" :style="{ borderTop: 'none', borderLeft: 'none' }">
          <input
            :style="{ textAlign: 'right' }"
            type="text"
            v-model="operationPackageOrderInvoice.signDate"
          />
        </td>
      </tr>
      <tr>
        <td colspan="7" :style="{ borderTop: 'none', borderRight: 'none' }"></td>
        <td colspan="3" :style="{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }">
          (Stamp & Signature)
        </td>
        <td :style="{ textAlign: 'right', borderTop: 'none', borderLeft: 'none' }">Date</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { OperationPackageOrderInvoiceBean } from '@/api/erp/data-contracts';
  import Decimal from 'decimal.js';
  import { toThousands } from '@/utils/toThousands';
  import numberToWords from '@/utils/numberToWords';
  import ExcelJS from 'exceljs';

  const props = defineProps<{
    operationPackageOrderInvoice: OperationPackageOrderInvoiceBean;
  }>();
  const subtotal = computed(() => {
    return props.operationPackageOrderInvoice.invoiceDetailList
      ?.reduce((acc, item) => acc + (item.unitPrice || 0) * (item.qty || 0), 0)
      .toFixed(2);
  });
  const totalValue = computed(() => {
    return new Decimal(subtotal.value || 0)
      .plus(props.operationPackageOrderInvoice.shippingCharge || 0)
      .plus(props.operationPackageOrderInvoice.other || 0)
      .toFixed(2);
  });
  const exportExcel = async (workbook: ExcelJS.Workbook) => {
    // 创建工作表
    const worksheet = workbook.addWorksheet('COMMERCIAL INVOICE', {
      views: [{ showGridLines: false }],
      pageSetup: {
        margins: {
          left: 0.52,
          right: 0.52,
          top: 0.52,
          bottom: 0.52,
          header: 0.51,
          footer: 0.51,
        },
        fitToPage: false,
        scale: 90,
        paperSize: 9,
        firstPageNumber: 1,
        horizontalCentered: true,
      },
    });
    setRowHeight(worksheet);
    setColumnWidth(worksheet);
    mergeCells(worksheet);
    // 设置默认值
    worksheet.eachRow((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = { name: 'Arial', size: 10 };
      });
    });
    setCellValue(worksheet, props.operationPackageOrderInvoice);
  };
  const setCellValue = (worksheet: ExcelJS.Worksheet, data: OperationPackageOrderInvoiceBean) => {
    const a1 = worksheet.getCell('A1');
    a1.value = 'COMMERCIAL INVOICE';
    a1.font = { name: 'Arial', size: 18, bold: true };
    a1.alignment = { vertical: 'middle', horizontal: 'center' };
    a1.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const a2 = worksheet.getCell('A2');
    a2.value = '1.SELLER/EXPORTER';
    a2.font = { name: 'Arial', size: 9 };
    a2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };

    const f2 = worksheet.getCell('F2');
    f2.value = '3.INVOICE NO.';
    f2.font = { name: 'Arial', size: 9 };
    f2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const j2 = worksheet.getCell('J2');
    j2.value = '4.DATE';
    j2.font = { name: 'Arial', size: 9 };
    j2.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const a3 = worksheet.getCell('A3');
    a3.value = data.seller;
    a3.font = { name: 'Arial', size: 10 };
    a3.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const f3 = worksheet.getCell('F3');
    f3.value = data.invoiceNo;
    f3.font = { name: 'Arial', size: 10 };
    f3.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const j3 = worksheet.getCell('J3');
    j3.value = data.signDate;
    j3.font = { name: 'Arial', size: 10 };
    j3.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const a4 = worksheet.getCell('A4');
    a4.value = data.sellerAddress;
    a4.font = { name: 'Arial', size: 10 };
    a4.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
    a4.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const f4 = worksheet.getCell('F4');
    f4.value = '5.PO NO.';
    f4.font = { name: 'Arial', size: 9 };
    f4.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const j4 = worksheet.getCell('J4');
    j4.value = '6.CURRENCY';
    j4.font = { name: 'Arial', size: 9 };
    j4.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const f5 = worksheet.getCell('F5');
    f5.value = data.poCode;
    f5.font = { name: 'Arial', size: 10 };
    f5.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const j5 = worksheet.getCell('J5');
    j5.value = data.currency;
    j5.font = { name: 'Arial', size: 10 };
    j5.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const f6 = worksheet.getCell('F6');
    f6.value = '7.SHIPPING METHOD';
    f6.font = { name: 'Arial', size: 9 };
    f6.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const j6 = worksheet.getCell('J6');
    j6.value = '8.PORT OF LOADING';
    j6.font = { name: 'Arial', size: 9 };
    j6.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const f7 = worksheet.getCell('F7');
    f7.value = data.shippingMethod;
    f7.font = { name: 'Arial', size: 10 };
    f7.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const j7 = worksheet.getCell('J7');
    j7.value = data.portOfLading;
    j7.font = { name: 'Arial', size: 10 };
    j7.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const a8 = worksheet.getCell('A8');
    a8.value = '2.CONSIGNEE AND ADDRESS';
    a8.font = { name: 'Arial', size: 9 };
    a8.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const f8 = worksheet.getCell('F8');
    f8.value = '9.PORT OF DISCHARGE';
    f8.font = { name: 'Arial', size: 9 };
    f8.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const j8 = worksheet.getCell('J8');
    j8.value = '10.PLACE OF DELIVERY';
    j8.font = { name: 'Arial', size: 9 };
    j8.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const a9 = worksheet.getCell('A9');
    a9.value = data.customerName;
    a9.font = { name: 'Arial', size: 10 };
    a9.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const f9 = worksheet.getCell('F9');
    f9.value = data.portOfDischarge;
    f9.font = { name: 'Arial', size: 10 };
    f9.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const j9 = worksheet.getCell('J9');
    j9.value = data.placeOfDelivery;
    j9.font = { name: 'Arial', size: 10 };
    j9.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const a10 = worksheet.getCell('A10');
    a10.value = data.customerAddress;
    a10.font = { name: 'Arial', size: 10 };
    a10.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
    a10.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const f10 = worksheet.getCell('F10');
    f10.value = '11.PAYMENT METHOD';
    f10.font = { name: 'Arial', size: 9 };
    f10.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const j10 = worksheet.getCell('J10');
    j10.value = '12.L/C NO.';
    j10.font = { name: 'Arial', size: 9 };
    j10.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const f11 = worksheet.getCell('F11');
    f11.value = data.paymentMethod;
    f11.font = { name: 'Arial', size: 10 };
    f11.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const j11 = worksheet.getCell('J11');
    j11.value = data.lcCode;
    j11.font = { name: 'Arial', size: 10 };
    j11.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const f12 = worksheet.getCell('F12');
    f12.value = '13.PAYMENT TERM';
    f12.font = { name: 'Arial', size: 9 };
    f12.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const f13 = worksheet.getCell('F13');
    f13.value = data.paymentTerm;
    f13.font = { name: 'Arial', size: 10 };
    f13.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const a14 = worksheet.getCell('A14');
    a14.value =
      'THE FOLLOWING SIGNING PARTIES AGREE TO MAKE THE TRANSACTION ON THE TERMS AND CONDITIONS STATED BELOW:';
    a14.font = { name: 'Arial', size: 8 };
    a14.alignment = { vertical: 'middle', horizontal: 'center' };
    a14.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    // table表格头
    const a15 = worksheet.getCell('A15');
    a15.value = "14.MARKS/NO'S.";
    a15.font = { name: 'Arial', size: 9 };
    a15.alignment = { vertical: 'middle', horizontal: 'center' };
    a15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const b15 = worksheet.getCell('B15');
    b15.value = '15.SKU';
    b15.alignment = { vertical: 'middle', horizontal: 'center' };
    b15.font = { name: 'Arial', size: 9 };
    b15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const e15 = worksheet.getCell('E15');
    e15.value = '16.DESCRIPTION OF GOODS';
    e15.alignment = { vertical: 'middle', horizontal: 'center' };
    e15.font = { name: 'Arial', size: 9 };
    e15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const g15 = worksheet.getCell('G15');
    g15.value = '17.QUANTITY';
    g15.font = { name: 'Arial', size: 9 };
    g15.alignment = { vertical: 'middle', horizontal: 'center' };
    g15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const i15 = worksheet.getCell('I15');
    i15.value = '18.UNIT PRICE';
    i15.font = { name: 'Arial', size: 9 };
    i15.alignment = { vertical: 'middle', horizontal: 'center' };
    i15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const k15 = worksheet.getCell('K15');
    k15.value = '19.AMOUNT';
    k15.font = { name: 'Arial', size: 9 };
    k15.alignment = { vertical: 'middle', horizontal: 'center' };
    k15.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    // table表格
    const itemCount = data.invoiceDetailList?.length || 1;
    // 第一列
    const a16 = worksheet.getRow(16).getCell('A');
    a16.value = data.invoiceDetailList![0].code || '';
    a16.font = { name: 'Arial', size: 10 };
    a16.alignment = { vertical: 'middle', horizontal: 'center' };
    a16.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    for (let i = 0; i < itemCount; i += 1) {
      const item = data.invoiceDetailList![i];
      const rowIndex = 16 + i;
      const b16 = worksheet.getRow(rowIndex).getCell('B');
      b16.value = item.sku || '';
      b16.font = { name: 'Arial', size: 10 };
      b16.alignment = { vertical: 'middle', horizontal: 'center' };
      b16.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
      const e16 = worksheet.getRow(rowIndex).getCell('E');
      e16.value = item.productName || '';
      e16.font = { name: 'Arial', size: 10 };
      e16.alignment = { vertical: 'middle', horizontal: 'center' };
      e16.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
      const g16 = worksheet.getRow(rowIndex).getCell('G');
      g16.value = item.qty || '';
      g16.font = { name: 'Arial', size: 10 };
      g16.alignment = { vertical: 'middle', horizontal: 'right' };
      g16.border = {
        left: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
      const h16 = worksheet.getRow(rowIndex).getCell('H');
      h16.value = 'PCS';
      h16.font = { name: 'Arial', size: 10 };
      h16.alignment = { vertical: 'middle', horizontal: 'center' };
      h16.border = {
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
      const i16 = worksheet.getRow(rowIndex).getCell('I');
      i16.value = item.unitPrice || 0;
      i16.numFmt = '$#,##0.00';
      i16.font = { name: 'Arial', size: 10 };
      i16.alignment = { vertical: 'middle', horizontal: 'center' };
      i16.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
      const k16 = worksheet.getRow(rowIndex).getCell('K');
      k16.value = {
        formula: `I${rowIndex}*G${rowIndex}`,
        result: (item.unitPrice || 0) * (item.qty || 0),
      };
      k16.numFmt = '$#,##0.00';
      k16.font = { name: 'Arial', size: 10 };
      k16.alignment = { vertical: 'middle', horizontal: 'center' };
      k16.border = {
        left: { style: 'thin' },
        right: { style: 'thin' },
        top: { style: 'thin' },
        bottom: { style: 'thin' },
      };
    }
    // 汇总行
    const i21 = worksheet.getRow(16 + itemCount).getCell('I');
    i21.value = 'SUBTOTAL';
    i21.font = { name: 'Arial', size: 9 };
    i21.alignment = { vertical: 'middle', horizontal: 'left' };
    i21.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const k21 = worksheet.getRow(16 + itemCount).getCell('K');
    k21.value = {
      formula: `SUM(K16:K${16 + itemCount - 1})`,
      result: subtotal.value,
    };
    k21.numFmt = '$#,##0.00';
    k21.font = { name: 'Arial', size: 10 };
    k21.alignment = { vertical: 'middle', horizontal: 'center' };
    k21.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    // 其他行
    const i22 = worksheet.getRow(17 + itemCount).getCell('I');
    i22.value = 'SHIPPING CHARGE';
    i22.font = { name: 'Arial', size: 9 };
    i22.alignment = { vertical: 'middle', horizontal: 'left' };
    i22.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const k22 = worksheet.getRow(17 + itemCount).getCell('K');
    k22.value = data.shippingCharge || 0;
    k22.numFmt = '$#,##0.00';
    k22.font = { name: 'Arial', size: 10 };
    k22.alignment = { vertical: 'middle', horizontal: 'center' };
    k22.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const i23 = worksheet.getRow(18 + itemCount).getCell('I');
    i23.value = 'OTHER';
    i23.font = { name: 'Arial', size: 9 };
    i23.alignment = { vertical: 'middle', horizontal: 'left' };
    i23.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const k23 = worksheet.getRow(18 + itemCount).getCell('K');
    k23.value = data.other || 0;
    k23.numFmt = '$#,##0.00';
    k23.font = { name: 'Arial', size: 10 };
    k23.alignment = { vertical: 'middle', horizontal: 'center' };
    k23.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const i24 = worksheet.getRow(19 + itemCount).getCell('I');
    i24.value = 'TOTAL VALUE';
    i24.font = { name: 'Arial', size: 10 };
    i24.alignment = { vertical: 'middle', horizontal: 'left' };
    i24.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const k24 = worksheet.getRow(19 + itemCount).getCell('K');
    k24.value = {
      formula: `SUM(K${16 + itemCount}:K${18 + itemCount})`,
      result: totalValue.value,
    };
    k24.numFmt = '$#,##0.00';
    k24.font = { name: 'Arial', size: 10 };
    k24.alignment = { vertical: 'middle', horizontal: 'center' };
    k24.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    // 其他行
    const a25 = worksheet.getRow(20 + itemCount).getCell('A');
    a25.value = `SAY TOTAL US DOLLAR ${numberToWords(
      Number(totalValue.value)
    ).toLocaleUpperCase()} ONLY.`;
    a25.font = { name: 'Arial', size: 10 };
    a25.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    a25.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const a26 = worksheet.getRow(21 + itemCount).getCell('A');
    a26.value = `TRADE TERM: ${data.tradeTerm || ''}`;
    a26.font = { name: 'Arial', size: 10 };
    a26.alignment = { vertical: 'middle', horizontal: 'left' };
    a26.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const a28 = worksheet.getRow(22 + itemCount).getCell('A');
    a28.value = `TOTAL QUANTITY: ${data.totalQty} PCS IN ${data.totalPackageQty} CTNS`;
    a28.font = { name: 'Arial', size: 10 };
    a28.alignment = { vertical: 'middle', horizontal: 'left' };
    a28.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const a29 = worksheet.getRow(23 + itemCount).getCell('A');
    a29.value = `TOTAL G.W.: ${data.totalGrossWeight} KGS`;
    a29.font = { name: 'Arial', size: 10 };
    a29.alignment = { vertical: 'middle', horizontal: 'left' };
    a29.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const a30 = worksheet.getRow(24 + itemCount).getCell('A');
    a30.value = 'COUNTRY OF ORIGIN: CHINA';
    a30.font = { name: 'Arial', size: 10 };
    a30.alignment = { vertical: 'middle', horizontal: 'left' };
    a30.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const a31 = worksheet.getRow(25 + itemCount).getCell('A');
    a31.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const k31 = worksheet.getRow(25 + itemCount).getCell('K');
    k31.border = {
      right: { style: 'thin' },
    };
    const a32 = worksheet.getRow(27 + itemCount).getCell('A');
    a32.value =
      'DECLARATION:\n1. We certify that this invoice is true and correct in all respects as to the price and description of the goods referred to herein.\n2. We certify that the goods described have been supplied in accordance with the order (see the PO No. above).\n3. We hereby certify that the above-mentioned goods are of China origin.';
    a32.font = { name: 'Arial', size: 9 };
    a32.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
    a32.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      top: { style: 'thin' },
    };
    const a33 = worksheet.getRow(29 + itemCount).getCell('A');
    a33.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    const h35 = worksheet.getRow(30 + itemCount).getCell('H');
    h35.value = 'EXPORTER:';
    h35.font = { name: 'Arial', size: 9 };
    h35.alignment = { vertical: 'middle', horizontal: 'left' };
    h35.border = {
      right: { style: 'thin' },
    };
    const k35 = worksheet.getRow(30 + itemCount).getCell('K');
    k35.border = {
      right: { style: 'thin' },
    };
    const h36 = worksheet.getRow(31 + itemCount).getCell('H');
    h36.value = data.exportor;
    h36.font = { name: 'Arial', size: 10 };
    h36.alignment = { vertical: 'middle', horizontal: 'left' };
    h36.border = {
      right: { style: 'thin' },
    };
    const h37 = worksheet.getRow(32 + itemCount).getCell('H');
    h37.border = {
      right: { style: 'thin' },
    };
    const h38 = worksheet.getRow(33 + itemCount).getCell('H');
    h38.value = data.signDate;
    h38.font = { name: 'Arial', size: 10 };
    h38.alignment = { vertical: 'middle', horizontal: 'right' };
    h38.border = {
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
    const h39 = worksheet.getRow(34 + itemCount).getCell('H');
    h39.value = '(Signature & Stamp)';
    h39.font = { name: 'Arial', size: 10, italic: true };
    h39.alignment = { vertical: 'bottom', horizontal: 'left' };
    const k39 = worksheet.getRow(34 + itemCount).getCell('K');
    k39.value = 'Date';
    k39.font = { name: 'Arial', size: 10, italic: true };
    k39.alignment = { vertical: 'bottom', horizontal: 'right' };
    k39.border = {
      right: { style: 'thin' },
    };
    const a40 = worksheet.getRow(35 + itemCount).getCell('A');
    a40.border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
    };
  };
  const setRowHeight = (worksheet: ExcelJS.Worksheet) => {
    const itemCount = props.operationPackageOrderInvoice.invoiceDetailList?.length || 1;
    let i = 0;
    worksheet.getRow((i += 1)).height = 56;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 20;
    // table表格头
    worksheet.getRow((i += 1)).height = 20;
    // table表格
    for (let j = 0; j < itemCount; j += 1) {
      worksheet.getRow((i += 1)).height = 20;
    }
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 18;
    worksheet.getRow((i += 1)).height = 24;
    worksheet.getRow((i += 1)).height = 12.75;
    worksheet.getRow((i += 1)).height = 12.75;
    worksheet.getRow((i += 1)).height = 12.75;
    worksheet.getRow((i += 1)).height = 12.75;
    worksheet.getRow((i += 1)).height = 12.75;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 52;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 27;
    worksheet.getRow((i += 1)).height = 15;
    worksheet.getRow((i += 1)).height = 15;
  };
  const setColumnWidth = (worksheet: ExcelJS.Worksheet) => {
    worksheet.getColumn(1).width = 13.66;
    worksheet.getColumn(2).width = 7.13;
    worksheet.getColumn(3).width = 10.38;
    worksheet.getColumn(4).width = 5.38;
    worksheet.getColumn(5).width = 12.63;
    worksheet.getColumn(6).width = 7.57;
    worksheet.getColumn(7).width = 10.08;
    worksheet.getColumn(8).width = 4.42;
    worksheet.getColumn(9).width = 3.52;
    worksheet.getColumn(10).width = 11.02;
    worksheet.getColumn(11).width = 15.02;
  };
  const mergeCells = (worksheet: ExcelJS.Worksheet) => {
    worksheet.mergeCells('A1:K1');

    worksheet.mergeCells('A2:E2');
    worksheet.mergeCells('F2:I2');
    worksheet.mergeCells('J2:K2');

    worksheet.mergeCells('A3:E3');
    worksheet.mergeCells('F3:I3');
    worksheet.mergeCells('J3:K3');

    worksheet.mergeCells('A4:E7');
    worksheet.mergeCells('F4:I4');
    worksheet.mergeCells('J4:K4');

    worksheet.mergeCells('F5:I5');
    worksheet.mergeCells('J5:K5');

    worksheet.mergeCells('F6:I6');
    worksheet.mergeCells('J6:K6');

    worksheet.mergeCells('F7:I7');
    worksheet.mergeCells('J7:K7');

    worksheet.mergeCells('A8:E8');
    worksheet.mergeCells('F8:I8');
    worksheet.mergeCells('J8:K8');

    worksheet.mergeCells('A9:E9');
    worksheet.mergeCells('F9:I9');
    worksheet.mergeCells('J9:K9');

    worksheet.mergeCells('A10:E13');
    worksheet.mergeCells('F10:I10');
    worksheet.mergeCells('J10:K10');

    worksheet.mergeCells('F11:I11');
    worksheet.mergeCells('J11:K11');

    worksheet.mergeCells('F12:K12');
    worksheet.mergeCells('F13:K13');
    worksheet.mergeCells('A14:K14');
    // table表格头
    worksheet.mergeCells('B15:D15');
    worksheet.mergeCells('E15:F15');
    worksheet.mergeCells('G15:H15');
    worksheet.mergeCells('I15:J15');
    // table表格
    const itemCount = props.operationPackageOrderInvoice.invoiceDetailList?.length || 1;
    // 第一列
    worksheet.mergeCells(`A16:A${15 + itemCount}`);
    for (let i = 0; i < itemCount; i += 1) {
      worksheet.mergeCells(`B${16 + i}:D${16 + i}`);
      worksheet.mergeCells(`E${16 + i}:F${16 + i}`);
      worksheet.mergeCells(`I${16 + i}:J${16 + i}`);
    }
    worksheet.mergeCells(`A${16 + itemCount}:A${19 + itemCount}`);
    worksheet.mergeCells(`I${16 + itemCount}:J${16 + itemCount}`);
    worksheet.mergeCells(`I${17 + itemCount}:J${17 + itemCount}`);
    worksheet.mergeCells(`I${18 + itemCount}:J${18 + itemCount}`);
    worksheet.mergeCells(`I${19 + itemCount}:J${19 + itemCount}`);
    worksheet.mergeCells(`A${20 + itemCount}:K${20 + itemCount}`);
    worksheet.mergeCells(`A${21 + itemCount}:K${21 + itemCount}`);
    worksheet.mergeCells(`A${22 + itemCount}:K${22 + itemCount}`);
    worksheet.mergeCells(`A${23 + itemCount}:K${23 + itemCount}`);
    worksheet.mergeCells(`A${24 + itemCount}:K${24 + itemCount}`);
    worksheet.mergeCells(`A${25 + itemCount}:K${25 + itemCount}`);
    worksheet.mergeCells(`A${26 + itemCount}:K${26 + itemCount}`);
    worksheet.mergeCells(`A${27 + itemCount}:K${27 + itemCount}`);
    worksheet.mergeCells(`A${28 + itemCount}:K${29 + itemCount}`);
    worksheet.mergeCells(`A${30 + itemCount}:G${34 + itemCount}`);
    worksheet.mergeCells(`H${31 + itemCount}:K${31 + itemCount}`);
    worksheet.mergeCells(`H${32 + itemCount}:K${32 + itemCount}`);
    worksheet.mergeCells(`H${33 + itemCount}:K${33 + itemCount}`);
    worksheet.mergeCells(`A${35 + itemCount}:K${35 + itemCount}`);
  };
  defineExpose({
    exportExcel,
  });
</script>

<style lang="scss" scoped>
  #operation-package-order-invoice {
    width: 800px;
  }
  table {
    th,
    td {
      border: 1px solid #ccc;
    }
  }
  input,
  textarea {
    width: 100%;
    max-width: 500px;
    background: #e3fafa;
    border: 1px solid transparent;
    &:focus {
      outline: none;
      border: 1px solid #666;
    }
  }
</style>
