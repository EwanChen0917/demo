<template>
  <div
    class="common-area"
    :style="{
      width: '100%',
      height: startPdf ? '571px' : 'auto',
      padding: '7px 11px',
      fontFamily: 'SimHei, sans-serif',
      fontSize: '14px',
      lineHeight: '1.2',
    }"
  >
    <div
      class="area-header"
      :style="{
        height: '172px',
        display: 'flex',
        gap: '15px',
        marginBottom: '5px',
      }"
    >
      <div
        class="outer-border"
        :style="{
          flex: 1,
          border: '1px solid #8f8f8f',
          padding: '12px 14px',
          height: '100%',
        }"
      >
        <div
          class="inner-border"
          :style="{
            border: '1px solid #000',
            padding: '8px 8px',
            height: '100%',
          }"
        >
          <label
            :style="{
              fontSize: '14px',
              fontWeight: 700,
            }"
          >
            Ship From Address:
          </label>
          <div :style="{ fontSize: '12px', letterSpacing: '0.5px', }" v-if="startPdf">{{ item.shipFromAddress }}</div>
          <el-input
            :style="{ fontSize: '12px' }"
            v-else
            type="textarea"
            :rows="5"
            v-model="item.shipFromAddress"
            @input="$emit('update:shipFromAddress', item.shipFromAddress)"
          />
        </div>
      </div>
      <div
        class="outer-border"
        :style="{
          flex: 1,
          border: '1px solid #8f8f8f',
          padding: '12px 14px',
          height: '100%',
        }"
      >
        <div
          class="inner-border"
          :style="{
            border: '1px solid #000',
            padding: '8px 8px',
            height: '100%',
          }"
        >
          <label
            :style="{
              fontSize: '14px',
              fontWeight: 700,
            }"
            for=""
          >
            Ship To
            <br />
            Address:
          </label>
          <div :style="{ fontSize: '12px', letterSpacing: '0.5px', }" v-if="startPdf">{{ item.shipToAddress }}</div>
          <el-input
            :style="{ fontSize: '12px' }"
            v-else
            type="textarea"
            :rows="5"
            v-model="item.shipToAddress"
            @input="$emit('update:shipToAddress', item.shipToAddress)"
          />
        </div>
      </div>
    </div>
    <div
      class="outer-border"
      :style="{
        border: '1px solid #8f8f8f',
        padding: '8px 14px',
        height: startPdf ? '370px' : 'auto',
      }"
    >
      <div
        class="inner-border"
        :style="{
          border: '1px solid #000',
          padding: '4px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: startPdf ? '15px' : 0,
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label class="label" :style="{ flex: 'none' }" for="">Purchase Order Number:</label>
          <div v-if="startPdf" :style="{ fontWeight: 700, textAlign: 'center', flex: 1 }">
            {{ item.poCode }}
          </div>
          <el-input v-else type="text" v-model="item.poCode" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label class="label" :style="{ flex: 'none' }" for="">SRN/ASN Number:</label>
          <div v-if="startPdf" class="context" :style="{ textAlign: 'right', flex: 1 }">
            {{ item.orderCode }}
          </div>
          <el-input v-else v-model="item.orderCode" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">Vendor SKU:</label>
          <div v-if="startPdf" class="context" :style="{ textAlign: 'right', flex: 1 }">
            {{ item.vendorSku }}
          </div>
          <el-input v-else v-model="item.vendorSku" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">Customer SKU:</label>
          <div v-if="startPdf" class="context" :style="{ textAlign: 'right', flex: 1 }">
            {{ item.customerSku }}
          </div>
          <el-input v-else v-model="item.customerSku" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">Description:</label>
          <div
            v-if="startPdf"
            class="context"
            :style="{
              textAlign: 'right',
              flex: 1,
              fontSize: '12px',
              wordBreak: 'break-all',
              whiteSpace: 'break-spaces',
            }"
          >
            {{ item.description }}
          </div>
          <el-input v-else v-model="item.description" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">QTY:</label>
          <div
            v-if="startPdf"
            class="context"
            :style="{ textAlign: 'center', flex: 1, fontWeight: 700 }"
          >
            {{ item.qty }}
          </div>
          <el-input v-else v-model="item.qty" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">Carton Count:</label>
          <div :style="{ fontSize: '14px', flex: 1, textAlign: 'center' }">
            {{ item.boxNumber }} OF {{ item.totalBoxQty }}
          </div>
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">Mixed Carton:</label>
          <div :style="{ fontWeight: 600, fontSize: '16px', flex: 1, textAlign: 'center' }">
            {{ item.mixedCarton }}
          </div>
        </div>
        <div
          :style="{
            height: '70px',
            textAlign: 'center',
          }"
        >
          <img
            v-if="item.eanCode"
            ref="barcodeRef"
            :id="`barcode-${startPdf}-${index}`"
            style="width: 260px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import JsBarcode from 'jsbarcode';
  import { PackageMarkData } from '@/api/erp/data-contracts';

  const props = defineProps<{
    item: PackageMarkData;
    index: number;
    startPdf: boolean;
    shipFromAddress?: string;
    shipToAddress?: string;
  }>();
  defineEmits<{
    (event: 'update:shipFromAddress', data?: string): void;
    (event: 'update:shipToAddress', data?: string): void;
  }>();

  const barcodeRef = ref<Element | null>(null);
  const generateBarcode = async (value: string) => {
    JsBarcode(`#barcode-${props.startPdf}-${props.index}`, value, {
      format: props.item.codeType === 'ean' ? 'EAN13' : 'UPC',
      font: 'SimHei',
      displayValue: true,
      fontOptions: 'bold',
      width: 3,
      height: 40,
    });
  };
  watch(
    () => props.item.eanCode,
    (newValue) => {
      if (newValue) {
        nextTick(() => {
          if (barcodeRef.value) {
            generateBarcode(newValue);
          }
        });
      }
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .common-area {
    :deep(.el-input__wrapper) {
      --el-input-bg-color: #e3fafa;
    }
    :deep(.el-textarea__inner) {
      --el-input-bg-color: #e3fafa;
    }
  }
</style>
