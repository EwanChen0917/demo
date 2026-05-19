<template>
  <table id="operation-package-order" :style="{ border: '1px solid #ccc' }">
    <tr>
      <td colspan="15" :style="{ textAlign: 'center' }">
        <input type="text" v-model="operationPackageOrder.companyName" />
      </td>
    </tr>
    <tr>
      <td colspan="15" :style="{ textAlign: 'center', borderBottom: 'none' }">
        <div
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
          }"
        >
          Address:
          <input type="text" v-model="operationPackageOrder.packageAddress" />
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="15">
        <div :style="{ display: 'flex', justifyContent: 'center', gap: '6px' }">
          <div>
            Mobile/ Wechat/ Whatsapp:
            <input :style="{ width: '200px' }" type="text" v-model="operationPackageOrder.tel" />
          </div>
          <div>
            Email:
            <input :style="{ width: '200px' }" type="text" v-model="operationPackageOrder.email" />
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="15" :style="{ textAlign: 'center', borderTop: 'none' }">
        <div :style="{ fontSize: '2em', fontWeight: 700, padding: '.3em' }">PACKING LIST</div>
        <div :style="{ fontSize: '2em', fontWeight: 700, padding: '.3em' }">装箱单</div>
      </td>
    </tr>
    <tr>
      <td colspan="2">PL NO./箱单号</td>
      <td colspan="13">
        <input :style="{ width: '200px' }" type="text" v-model="operationPackageOrder.plNo" />
      </td>
    </tr>
    <tr>
      <td colspan="2">Sent By/发货人</td>
      <td colspan="5">
        <input type="text" v-model="operationPackageOrder.shipFromAddressBean!.sendTor" />
      </td>
      <td colspan="1">Sent To/收货人</td>
      <td colspan="7">
        <input type="text" v-model="operationPackageOrder.shipToAddressBean!.sendTor" />
      </td>
    </tr>
    <tr>
      <td colspan="2">Company/公司</td>
      <td colspan="5">
        <input type="text" v-model="operationPackageOrder.shipFromAddressBean!.company" />
      </td>
      <td colspan="1">Company/公司</td>
      <td colspan="7">
        <input type="text" v-model="operationPackageOrder.shipToAddressBean!.company" />
      </td>
    </tr>
    <tr>
      <td colspan="2">Name/联系人</td>
      <td colspan="5">
        <input type="text" v-model="operationPackageOrder.shipFromAddressBean!.name" />
      </td>
      <td colspan="1">Name/联系人</td>
      <td colspan="7">
        <input type="text" v-model="operationPackageOrder.shipToAddressBean!.name" />
      </td>
    </tr>
    <tr>
      <td colspan="2">Address/地址</td>
      <td colspan="5">
        <textarea v-model="operationPackageOrder.shipFromAddressBean!.address"></textarea>
      </td>
      <td colspan="1">Address/地址</td>
      <td colspan="7">
        <textarea v-model="operationPackageOrder.shipToAddressBean!.address"></textarea>
      </td>
    </tr>
    <tr>
      <td colspan="2">Tel/电话</td>
      <td colspan="5">
        <input type="text" v-model="operationPackageOrder.shipFromAddressBean!.tel" />
      </td>
      <td colspan="1">Tel/电话</td>
      <td colspan="7">
        <input type="text" v-model="operationPackageOrder.shipToAddressBean!.tel" />
      </td>
    </tr>
    <tr :style="{ textAlign: 'center' }">
      <th rowspan="2">
        Carton Number
        <br />
        箱号
      </th>
      <th rowspan="2">
        Description
        <br />
        货品
      </th>
      <th rowspan="2" width="125">
        Type/SKU
        <br />
        型号
      </th>
      <th rowspan="2">EAN/UPC</th>
      <th rowspan="2">
        HS Code
        <br />
        海关编码
      </th>
      <th rowspan="2">
        单箱数量
        <br />
        PCS/CTN
      </th>
      <th rowspan="2">
        CTNS
        <br />
        箱数
      </th>
      <th rowspan="2">
        TOTAL Qty (pcs)
        <br />
        总数量
      </th>
      <th colspan="5">CTN Info/ 装箱资料</th>
      <th rowspan="2">
        Total Weight
        <br />
        (kg) 总毛重
      </th>
      <th rowspan="2">MEAS (CMB)</th>
    </tr>
    <tr>
      <th>
        G.W/CTN(kg)
        <br />
        毛重
      </th>
      <th>
        N.W(kg)
        <br />
        净重
      </th>
      <th>
        Length
        <br />
        长度（CM）
      </th>
      <th>
        Width
        <br />
        宽度（CM）
      </th>
      <th>
        Height
        <br />
        高度（CM）
      </th>
    </tr>
    <tr
      :style="{ textAlign: 'center' }"
      v-for="(item, idx) in operationPackageOrder.skuDetailList"
      :key="idx"
    >
      <!-- 箱号 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <textarea v-model="item.boxArea"></textarea>
      </td>
      <!-- 货品 -->
      <td><input type="text" v-model="item.description" /></td>
      <!-- 型号 -->
      <td><input type="text" v-model="item.sku" /></td>
      <!-- EAN/UPC -->
      <td><input type="text" v-model="item.eanUpc" /></td>
      <!-- 海关编码 -->
      <td><input type="text" v-model="item.hsCode" /></td>
      <!-- 单箱数量 -->
      <td><input type="text" v-model="item.singleBoxCount" /></td>
      <!-- 总箱数 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.totalPackageQty" />
      </td>
      <!-- 总数量 -->
      <td>
        {{ (item.singleBoxCount || 0) * (item.totalPackageQty || 0) }}
      </td>
      <!-- 毛重 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.grossWeight" />
      </td>
      <!-- 净重 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.netWeight" />
      </td>
      <!-- 长度 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.length" />
      </td>
      <!-- 宽度 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.width" />
      </td>
      <!-- 高度 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        <input type="text" v-model="item.height" />
      </td>
      <!-- 总毛重 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        {{ (item.grossWeight || 0) * (item.totalPackageQty || 0) }}
      </td>
      <!-- 立方数 -->
      <td v-if="item.mergeCount" :rowspan="item.mergeCount">
        {{
          Number(
            ((Number(item.length || 0) * Number(item.width || 0) * Number(item.height || 0)) /
              1000000) *
              (item.totalPackageQty || 0)
          ).toFixed(2)
        }}
      </td>
    </tr>
    <tr :style="{ textAlign: 'center' }">
      <td></td>
      <td>Total/总计</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{ totalQty }}</td>
      <td>{{ totalPackageQty }}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{ totalGrossWeight }}</td>
      <td>{{ totalVolumes }}</td>
    </tr>
    <tr>
      <td></td>
      <td colspan="14">
        Date/日期:
        <input type="text" v-model="operationPackageOrder.signTime" />
      </td>
    </tr>
    <tr>
      <td colspan="14"></td>
      <td>Issued by/签发人:</td>
    </tr>
    <tr>
      <td colspan="14"></td>
      <td><input type="text" v-model="operationPackageOrder.signer" /></td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
  import { OperationPackageOrderV2Bean } from '@/api/erp/data-contracts';
  import ExcelJS from 'exceljs';

  const props = defineProps<{
    operationPackageOrder: OperationPackageOrderV2Bean;
  }>();
  const totalQty = computed(() => {
    return props.operationPackageOrder.skuDetailList?.reduce((acc, item) => {
      // 跳过被合并的行
      if (!item.mergeCount) {
        return acc;
      }
      return acc + (Number(item.totalPackageQty) || 0);
    }, 0);
  });
  const totalPackageQty = computed(() => {
    return props.operationPackageOrder.skuDetailList?.reduce((acc, item) => {
      // 跳过被合并的行
      if (!item.mergeCount) {
        return acc;
      }
      return (
        acc +
        Number(
          Number((Number(item.singleBoxCount) || 0) * (Number(item.totalPackageQty) || 0)).toFixed(
            2
          )
        )
      );
    }, 0);
  });
  // 小数加法存在精度问题，toFixed(2)解决
  const totalGrossWeight = computed(() => {
    return props.operationPackageOrder.skuDetailList
      ?.reduce((acc, item) => {
        // 跳过被合并的行
        if (!item.mergeCount) {
          return acc;
        }
        return Number(
          (
            acc + Number(Number((item.grossWeight || 0) * (item.totalPackageQty || 0)).toFixed(2))
          ).toFixed(2)
        );
      }, 0)
      .toFixed(2);
  });
  // 小数加法存在精度问题，toFixed(2)解决
  const totalVolumes = computed(() => {
    return props.operationPackageOrder.skuDetailList
      ?.reduce((acc, item) => {
        // 跳过被合并的行
        if (!item.mergeCount) {
          return acc;
        }
        return Number(
          (
            acc +
            Number(
              Number(
                ((Number(item.length || 0) * Number(item.width || 0) * Number(item.height || 0)) /
                  1000000) *
                  (item.totalPackageQty || 0)
              ).toFixed(2)
            )
          ).toFixed(2)
        );
      }, 0)
      .toFixed(2);
  });
  const exportExcel = async (workbook: ExcelJS.Workbook) => {
    // 创建工作表
    const worksheet = workbook.addWorksheet('PACKING LIST', {
      views: [{ showGridLines: true }],
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
    mergeCells(worksheet);
    setRowHeight(worksheet);
    setColumnWidth(worksheet);
    setCellValue(worksheet);
    const myBase64Image =
      'data:image/png;base64,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';
    const imageId2 = workbook.addImage({
      base64: myBase64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId2, {
      tl: { col: 0, row: 0 },
      ext: { width: 296, height: 38 },
      editAs: 'oneCell',
    });
    worksheet.eachRow((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  };
  const setCellValue = (worksheet: ExcelJS.Worksheet) => {
    const a1 = worksheet.getCell('A1');
    a1.value = props.operationPackageOrder.companyName;
    a1.font = { name: 'Times New Roman', size: 18, bold: true };
    a1.alignment = { vertical: 'middle', horizontal: 'center' };

    const a2 = worksheet.getCell('A2');
    a2.value = props.operationPackageOrder.packageAddress;
    a2.font = { name: 'Times New Roman', size: 12, bold: true };
    a2.alignment = { vertical: 'middle', horizontal: 'center' };

    const a3 = worksheet.getCell('A3');
    a3.value = `Mobile/ Wechat/ Whatsapp:${props.operationPackageOrder.tel}    Email:${props.operationPackageOrder.email}`;
    a3.font = { name: 'Times New Roman', size: 12 };
    a3.alignment = { vertical: 'middle', horizontal: 'center' };

    const a4 = worksheet.getCell('A4');
    a4.value = 'Packing List';
    a4.font = { name: 'Times New Roman', size: 18, bold: true };
    a4.alignment = { vertical: 'middle', horizontal: 'center' };
    // 5
    const a5 = worksheet.getCell('A5');
    a5.value = 'PL NO.';
    a5.font = { name: 'Times New Roman', size: 12, bold: true };
    a5.alignment = { vertical: 'middle', horizontal: 'center' };
    const c5 = worksheet.getCell('C5');
    c5.value = props.operationPackageOrder.plNo;
    c5.font = { name: 'Times New Roman', size: 12, bold: true };
    c5.alignment = { vertical: 'middle', horizontal: 'left' };
    // 6
    const a6 = worksheet.getCell('A6');
    a6.value = 'Sent By';
    a6.font = { name: 'Times New Roman', size: 12, bold: true };
    a6.alignment = { vertical: 'middle', horizontal: 'center' };
    const c6 = worksheet.getCell('C6');
    c6.value = props.operationPackageOrder.shipFromAddressBean?.sendTor;
    c6.font = { name: 'Times New Roman', size: 12, bold: true };
    c6.alignment = { vertical: 'middle', horizontal: 'center' };
    const h6 = worksheet.getCell('H6');
    h6.value = 'Sent To';
    h6.font = { name: 'Times New Roman', size: 12, bold: true };
    h6.alignment = { vertical: 'middle', horizontal: 'center' };
    const i6 = worksheet.getCell('I6');
    i6.value = props.operationPackageOrder.shipToAddressBean?.sendTor;
    i6.font = { name: 'Times New Roman', size: 12, bold: true };
    i6.alignment = { vertical: 'middle', horizontal: 'center' };
    // 7
    const a7 = worksheet.getCell('A7');
    a7.value = 'Company';
    a7.font = { name: 'Times New Roman', size: 12, bold: true };
    a7.alignment = { vertical: 'middle', horizontal: 'center' };
    const c7 = worksheet.getCell('C7');
    c7.value = props.operationPackageOrder.shipFromAddressBean?.company;
    c7.font = { name: 'Times New Roman', size: 12, bold: true };
    c7.alignment = { vertical: 'middle', horizontal: 'center' };
    const h7 = worksheet.getCell('H7');
    h7.value = 'Company';
    h7.font = { name: 'Times New Roman', size: 12, bold: true };
    h7.alignment = { vertical: 'middle', horizontal: 'center' };
    const i7 = worksheet.getCell('I7');
    i7.value = props.operationPackageOrder.shipToAddressBean?.company;
    i7.font = { name: 'Times New Roman', size: 12, bold: true };
    i7.alignment = { vertical: 'middle', horizontal: 'center' };
    // 8
    const a8 = worksheet.getCell('A8');
    a8.value = 'Name';
    a8.font = { name: 'Times New Roman', size: 12, bold: true };
    a8.alignment = { vertical: 'middle', horizontal: 'center' };
    const c8 = worksheet.getCell('C8');
    c8.value = props.operationPackageOrder.shipFromAddressBean?.name;
    c8.font = { name: 'Times New Roman', size: 12, bold: true };
    c8.alignment = { vertical: 'middle', horizontal: 'center' };
    const h8 = worksheet.getCell('H8');
    h8.value = 'Name';
    h8.font = { name: 'Times New Roman', size: 12, bold: true };
    h8.alignment = { vertical: 'middle', horizontal: 'center' };
    const i8 = worksheet.getCell('I8');
    i8.value = props.operationPackageOrder.shipToAddressBean?.name;
    i8.font = { name: 'Times New Roman', size: 12, bold: true };
    i8.alignment = { vertical: 'middle', horizontal: 'center' };
    // 9
    const a9 = worksheet.getCell('A9');
    a9.value = 'Address';
    a9.font = { name: 'Times New Roman', size: 12, bold: true };
    a9.alignment = { vertical: 'middle', horizontal: 'center' };
    const c9 = worksheet.getCell('C9');
    c9.value = props.operationPackageOrder.shipFromAddressBean?.address;
    c9.font = { name: 'Times New Roman', size: 12, bold: true };
    c9.alignment = { vertical: 'middle', horizontal: 'center' };
    const h9 = worksheet.getCell('H9');
    h9.value = 'Address';
    h9.font = { name: 'Times New Roman', size: 12, bold: true };
    h9.alignment = { vertical: 'middle', horizontal: 'center' };
    const i9 = worksheet.getCell('I9');
    i9.value = props.operationPackageOrder.shipToAddressBean?.address;
    i9.font = { name: 'Times New Roman', size: 12, bold: true };
    i9.alignment = { vertical: 'middle', horizontal: 'center' };
    // 11
    const a11 = worksheet.getCell('A11');
    a11.value = 'Tel';
    a11.font = { name: 'Times New Roman', size: 12, bold: true };
    a11.alignment = { vertical: 'middle', horizontal: 'center' };
    const c11 = worksheet.getCell('C11');
    c11.value = props.operationPackageOrder.shipFromAddressBean?.tel;
    c11.font = { name: 'Times New Roman', size: 12, bold: true };
    c11.alignment = { vertical: 'middle', horizontal: 'center' };
    const h11 = worksheet.getCell('H11');
    h11.value = 'Tel';
    h11.font = { name: 'Times New Roman', size: 12, bold: true };
    h11.alignment = { vertical: 'middle', horizontal: 'center' };
    const i11 = worksheet.getCell('I11');
    i11.value = props.operationPackageOrder.shipToAddressBean?.tel;
    i11.font = { name: 'Times New Roman', size: 12, bold: true };
    i11.alignment = { vertical: 'middle', horizontal: 'center' };
    // 12 表头
    const a12 = worksheet.getCell('A12');
    a12.value = 'Carton Number';
    a12.font = { name: 'Times New Roman', size: 14, bold: true };
    a12.alignment = { vertical: 'middle', horizontal: 'center' };
    const b12 = worksheet.getCell('B12');
    b12.value = 'Description';
    b12.font = { name: 'Times New Roman', size: 14, bold: true };
    b12.alignment = { vertical: 'middle', horizontal: 'center' };
    const c12 = worksheet.getCell('C12');
    c12.value = 'Type/SKU';
    c12.font = { name: 'Times New Roman', size: 14, bold: true };
    c12.alignment = { vertical: 'middle', horizontal: 'center' };
    const d12 = worksheet.getCell('D12');
    d12.value = 'EAN/UPC';
    d12.font = { name: 'Times New Roman', size: 14, bold: true };
    d12.alignment = { vertical: 'middle', horizontal: 'center' };
    const e12 = worksheet.getCell('E12');
    e12.value = 'HS Code';
    e12.font = { name: 'Times New Roman', size: 14, bold: true };
    e12.alignment = { vertical: 'middle', horizontal: 'center' };
    const f12 = worksheet.getCell('F12');
    f12.value = 'PCS/CTN';
    f12.font = { name: 'Times New Roman', size: 14, bold: true };
    f12.alignment = { vertical: 'middle', horizontal: 'center' };
    const g12 = worksheet.getCell('G12');
    g12.value = 'CTNS';
    g12.font = { name: 'Times New Roman', size: 14, bold: true };
    g12.alignment = { vertical: 'middle', horizontal: 'center' };
    const h12 = worksheet.getCell('H12');
    h12.value = 'TOTAL Qty (pcs)';
    h12.font = { name: 'Times New Roman', size: 14, bold: true };
    h12.alignment = { vertical: 'middle', horizontal: 'center' };
    const i12 = worksheet.getCell('I12');
    i12.value = 'CTN Info';
    i12.font = { name: 'Times New Roman', size: 14, bold: true };
    i12.alignment = { vertical: 'middle', horizontal: 'center' };
    const n12 = worksheet.getCell('N12');
    n12.value = 'Total Weight(kg)';
    n12.font = { name: 'Times New Roman', size: 14, bold: true };
    n12.alignment = { vertical: 'middle', horizontal: 'center' };
    const o12 = worksheet.getCell('O12');
    o12.value = 'MEAS(CMB)';
    o12.font = { name: 'Times New Roman', size: 14, bold: true };
    o12.alignment = { vertical: 'middle', horizontal: 'center' };
    // 13
    const i13 = worksheet.getCell('I13');
    i13.value = 'G.W/CTN(kg)';
    i13.font = { name: 'Times New Roman', size: 14, bold: true };
    i13.alignment = { vertical: 'middle', horizontal: 'center' };
    const j13 = worksheet.getCell('J13');
    j13.value = 'N.W(kg)';
    j13.font = { name: 'Times New Roman', size: 14, bold: true };
    j13.alignment = { vertical: 'middle', horizontal: 'center' };
    const k13 = worksheet.getCell('K13');
    k13.value = 'Length(CM)';
    k13.font = { name: 'Times New Roman', size: 14, bold: true };
    k13.alignment = { vertical: 'middle', horizontal: 'center' };
    const l13 = worksheet.getCell('L13');
    l13.value = 'Width(CM)';
    l13.font = { name: 'Times New Roman', size: 14, bold: true };
    l13.alignment = { vertical: 'middle', horizontal: 'center' };
    const m13 = worksheet.getCell('M13');
    m13.value = 'Height(CM)';
    m13.font = { name: 'Times New Roman', size: 14, bold: true };
    m13.alignment = { vertical: 'middle', horizontal: 'center' };
    // 表格body
    let mergeFirstRow = 1; // 最近一个合并的行
    props.operationPackageOrder.skuDetailList?.forEach((item, idx) => {
      if (item.mergeCount) {
        const a = worksheet.getCell(`A${idx + 14}`);
        a.value = item.boxArea;
        a.font = { name: 'Times New Roman', size: 12 };
        a.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      const b = worksheet.getCell(`B${idx + 14}`);
      b.value = item.description;
      b.font = { name: 'Times New Roman', size: 12 };
      b.alignment = { vertical: 'middle', horizontal: 'center' };

      const c = worksheet.getCell(`C${idx + 14}`);
      c.value = item.sku;
      c.font = { name: 'Times New Roman', size: 12 };
      c.alignment = { vertical: 'middle', horizontal: 'center' };

      const d = worksheet.getCell(`D${idx + 14}`);
      d.value = item.eanUpc;
      d.font = { name: 'Times New Roman', size: 12 };
      d.alignment = { vertical: 'middle', horizontal: 'center' };

      const e = worksheet.getCell(`E${idx + 14}`);
      e.value = item.hsCode;
      e.font = { name: 'Times New Roman', size: 12 };
      e.alignment = { vertical: 'middle', horizontal: 'center' };

      const f = worksheet.getCell(`F${idx + 14}`);
      f.value = item.singleBoxCount;
      f.font = { name: 'Times New Roman', size: 12 };
      f.alignment = { vertical: 'middle', horizontal: 'center' };

      if (item.mergeCount) {
        const g = worksheet.getCell(`G${idx + 14}`);
        g.value = item.totalPackageQty;
        g.font = { name: 'Times New Roman', size: 12 };
        g.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      const h = worksheet.getCell(`H${idx + 14}`);
      if (item.mergeCount) {
        mergeFirstRow = idx + 14;
      }
      h.value = {
        formula: `SUM(F${idx + 14} * G${mergeFirstRow})`,
      };
      h.font = { name: 'Times New Roman', size: 12 };
      h.alignment = { vertical: 'middle', horizontal: 'center' };
      if (item.mergeCount) {
        const i = worksheet.getCell(`I${idx + 14}`);
        i.value = item.grossWeight;
        i.font = { name: 'Times New Roman', size: 12 };
        i.alignment = { vertical: 'middle', horizontal: 'center' };

        const j = worksheet.getCell(`J${idx + 14}`);
        j.value = item.netWeight;
        j.font = { name: 'Times New Roman', size: 12 };
        j.alignment = { vertical: 'middle', horizontal: 'center' };

        const k = worksheet.getCell(`K${idx + 14}`);
        k.value = item.length;
        k.font = { name: 'Times New Roman', size: 12 };
        k.alignment = { vertical: 'middle', horizontal: 'center' };

        const l = worksheet.getCell(`L${idx + 14}`);
        l.value = item.width;
        l.font = { name: 'Times New Roman', size: 12 };
        l.alignment = { vertical: 'middle', horizontal: 'center' };

        const m = worksheet.getCell(`M${idx + 14}`);
        m.value = item.height;
        m.font = { name: 'Times New Roman', size: 12 };
        m.alignment = { vertical: 'middle', horizontal: 'center' };

        const n = worksheet.getCell(`N${idx + 14}`);
        n.value = {
          formula: `I${idx + 14} * G${idx + 14}`,
        };
        n.font = { name: 'Times New Roman', size: 12 };
        n.alignment = { vertical: 'middle', horizontal: 'center' };

        const o = worksheet.getCell(`O${idx + 14}`);
        o.value = {
          formula: `((K${idx + 14} * L${idx + 14} * M${idx + 14}) / 1000000) * G${idx + 14}`,
        };
        o.font = { name: 'Times New Roman', size: 12 };
        o.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
    const itemCount = props.operationPackageOrder.skuDetailList?.length || 0;
    // 汇总行
    const a = worksheet.getCell(`B${itemCount + 14}`);
    a.value = 'Total';
    a.font = { name: 'Times New Roman', size: 14, bold: false };
    a.alignment = { vertical: 'middle', horizontal: 'left' };
    const g = worksheet.getCell(`G${itemCount + 14}`);
    g.value = totalQty.value;
    g.font = { name: 'Times New Roman', size: 14, bold: false };
    g.alignment = { vertical: 'middle', horizontal: 'center' };
    const h = worksheet.getCell(`H${itemCount + 14}`);
    h.value = totalPackageQty.value;
    h.font = { name: 'Times New Roman', size: 14, bold: false };
    h.alignment = { vertical: 'middle', horizontal: 'center' };
    const n = worksheet.getCell(`N${itemCount + 14}`);
    n.value = totalGrossWeight.value;
    n.font = { name: 'Times New Roman', size: 14, bold: false };
    n.alignment = { vertical: 'middle', horizontal: 'center' };
    const o = worksheet.getCell(`O${itemCount + 14}`);
    o.value = totalVolumes.value;
    o.font = { name: 'Times New Roman', size: 14, bold: false };
    o.alignment = { vertical: 'middle', horizontal: 'center' };
    // 日期
    const b17 = worksheet.getCell(`B${itemCount + 15}`);
    b17.value = `Date:${props.operationPackageOrder.signTime}`;
    b17.font = { name: 'Times New Roman', size: 12, bold: true };
    b17.alignment = { vertical: 'middle', horizontal: 'left' };
    // 签发人
    const n18 = worksheet.getCell(`N${itemCount + 16}`);
    n18.value = 'Issued by:';
    n18.font = { name: 'Times New Roman', size: 12, bold: true };
    n18.alignment = { vertical: 'middle', horizontal: 'center' };
    const n19 = worksheet.getCell(`N${itemCount + 17}`);
    n19.value = props.operationPackageOrder.signer;
    n19.font = { name: 'Times New Roman', size: 12, bold: true };
    n19.alignment = { vertical: 'middle', horizontal: 'center' };
  };
  const setRowHeight = (worksheet: ExcelJS.Worksheet) => {
    // 设置行高
    worksheet.getRow(1).height = 45.25;
    worksheet.getRow(2).height = 36;
    worksheet.getRow(3).height = 18.5;
    worksheet.getRow(4).height = 62;
    worksheet.getRow(5).height = 27;
    worksheet.getRow(6).height = 27;
    worksheet.getRow(7).height = 27;
    worksheet.getRow(8).height = 27;
    worksheet.getRow(9).height = 27;
    worksheet.getRow(10).height = 27;
    worksheet.getRow(11).height = 27;
    worksheet.getRow(12).height = 61;
    worksheet.getRow(13).height = 61;
    const itemCount = props.operationPackageOrder.skuDetailList?.length || 1;
    for (let i = 0; i < itemCount; i += 1) {
      worksheet.getRow(i + 14).height = 61;
    }
    // 表格汇总列
    worksheet.getRow(itemCount + 14).height = 61;
    worksheet.getRow(itemCount + 15).height = 18;
    worksheet.getRow(itemCount + 16).height = 18;
    worksheet.getRow(itemCount + 17).height = 18;
  };
  const setColumnWidth = (worksheet: ExcelJS.Worksheet) => {
    // 设置列宽
    worksheet.getColumn(1).width = 14.12;
    worksheet.getColumn(2).width = 22.5;
    worksheet.getColumn(3).width = 16.37;
    worksheet.getColumn(4).width = 18.5;
    worksheet.getColumn(5).width = 18.5;
    worksheet.getColumn(6).width = 20.62;
    worksheet.getColumn(7).width = 20.62;
    worksheet.getColumn(8).width = 13.87;
    worksheet.getColumn(9).width = 19;
    worksheet.getColumn(10).width = 11;
    worksheet.getColumn(11).width = 13.62;
    worksheet.getColumn(12).width = 17;
    worksheet.getColumn(13).width = 17;
    worksheet.getColumn(14).width = 17;
    worksheet.getColumn(15).width = 13.5;
  };
  const mergeCells = (worksheet: ExcelJS.Worksheet) => {
    // 合并一系列单元格
    worksheet.mergeCells('A1:O1');
    worksheet.mergeCells('A2:O2');
    worksheet.mergeCells('A3:O3');
    worksheet.mergeCells('A4:O4');
    worksheet.mergeCells('A5:B5');
    worksheet.mergeCells('C5:O5');

    worksheet.mergeCells('A6:B6');
    worksheet.mergeCells('C6:G6');
    worksheet.mergeCells('I6:O6');

    worksheet.mergeCells('A7:B7');
    worksheet.mergeCells('C7:G7');
    worksheet.mergeCells('I7:O7');

    worksheet.mergeCells('A8:B8');
    worksheet.mergeCells('C8:G8');
    worksheet.mergeCells('I8:O8');

    worksheet.mergeCells('A9:B10');
    worksheet.mergeCells('C9:G10');
    worksheet.mergeCells('H9:H10');
    worksheet.mergeCells('I9:O10');

    worksheet.mergeCells('A11:B11');
    worksheet.mergeCells('C11:G11');
    worksheet.mergeCells('I11:O11');

    // 表格头
    worksheet.mergeCells('A12:A13');
    worksheet.mergeCells('B12:B13');
    worksheet.mergeCells('C12:C13');
    worksheet.mergeCells('D12:D13');
    worksheet.mergeCells('E12:E13');
    worksheet.mergeCells('F12:F13');
    worksheet.mergeCells('G12:G13');
    worksheet.mergeCells('H12:H13');
    worksheet.mergeCells('I12:M12');
    worksheet.mergeCells('N12:N13');
    worksheet.mergeCells('O12:O13');
    // 表格body
    // 0 14
    props.operationPackageOrder.skuDetailList?.forEach((item, idx) => {
      if (item.mergeCount) {
        worksheet.mergeCells(`A${idx + 14}:A${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`G${idx + 14}:G${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`I${idx + 14}:I${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`J${idx + 14}:J${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`K${idx + 14}:K${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`L${idx + 14}:L${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`M${idx + 14}:M${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`N${idx + 14}:N${idx + item.mergeCount + 13}`);
        worksheet.mergeCells(`O${idx + 14}:O${idx + item.mergeCount + 13}`);
      }
    });
    const itemCount = props.operationPackageOrder.skuDetailList?.length || 1;
    worksheet.mergeCells(`B${itemCount + 15}:O${itemCount + 15}`);
    worksheet.mergeCells(`N${itemCount + 16}:O${itemCount + 16}`);
    worksheet.mergeCells(`N${itemCount + 17}:O${itemCount + 17}`);
  };
  defineExpose({
    exportExcel,
  });
</script>

<style lang="scss" scoped>
  #operation-package-order {
    width: 1250px;
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
