<template>
  <div
    class="pallet-mark"
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
        height: '182px',
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
          padding: '6px 8px',
          height: '100%',
        }"
      >
        <div
          class="inner-border"
          :style="{
            border: '1px solid #000',
            padding: '6px 6px',
            height: '100%',
          }"
        >
          <label
            :style="{
              fontSize: '14px',
              fontWeight: 700,
            }"
          >
            Ship From
          </label>
          <div :style="{ fontSize: '12px', letterSpacing: '0.5px', }" v-if="startPdf">{{ item.fromAddress }}</div>
          <el-input
            :style="{ fontSize: '12px' }"
            v-else
            type="textarea"
            :rows="6"
            v-model="item.fromAddress"
            @input="$emit('update:shiFromAddress', item.fromAddress)"
          />
        </div>
      </div>
      <div
        class="outer-border"
        :style="{
          flex: 1,
          border: '1px solid #8f8f8f',
          padding: '6px 8px',
          height: '100%',
        }"
      >
        <div
          class="inner-border"
          :style="{
            border: '1px solid #000',
            padding: '6px 6px',
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
          </label>
          <div :style="{ fontSize: '12px', letterSpacing: '0.5px', }" v-if="startPdf">{{ item.shipAddress }}</div>
          <el-input
            :style="{ fontSize: '12px' }"
            v-else
            type="textarea"
            :rows="6"
            v-model="item.shipAddress"
            @input="$emit('update:shipToAddress', item.shipAddress)"
          />
        </div>
      </div>
    </div>
    <div
      class="outer-border"
      :style="{
        border: '1px solid #8f8f8f',
        padding: '8px 10px',
        height: startPdf ? '370px' : 'auto',
      }"
    >
      <div
        class="inner-border"
        :style="{
          border: '1px solid #000',
          padding: '10px 6px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: startPdf ? '10px' : 0,
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label class="label" :style="{ flex: 'none', fontWeight: 700 }" for="">
            PO Number #:
          </label>
          <div v-if="startPdf" :style="{ fontWeight: 700, textAlign: 'center', flex: 1 }">
            {{ item.orderCode }}
          </div>
          <el-input v-else type="text" v-model="item.orderCode" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label class="label" :style="{ flex: 'none', fontWeight: 700 }" for="">
            Reference Number #:
          </label>
          <div v-if="startPdf" class="context" :style="{ textAlign: 'right', flex: 1 }">
            {{ item.referenceCode }}
          </div>
          <el-input v-else v-model="item.referenceCode" />
        </div>
        <section :style="{ textAlign: 'center' }">
          <div :style="{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontWeight: 700 }">
            <span>SKU #:</span>
            <span>CARTONS:</span>
          </div>
          <div
            :style="{
              fontSize: '13px',
              transform:
                  (item.skuDetailList?.length || 0) > 8
                    ? `scale(${8 / item.skuDetailList!.length})`
                    : 'none'
            }"
          >
            <div
              v-for="(d, idx) in Math.max(8, item.skuDetailList?.length || 0)"
              :key="idx"
              :style="{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }"
            >
              <span>{{ item.skuDetailList![idx]?.sku || '-' }}</span>
              <span>{{ item.skuDetailList![idx]?.totalBoxCount || '-' }}</span>
            </div>
          </div>
        </section>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none' }" for="">TOTAL CARTONS:</label>
          <div
            v-if="startPdf"
            class="context"
            :style="{
              textAlign: 'center',
              fontWeight: 700,
              border: '1px solid #000',
              width: '104px',
              margin: 'auto',
            }"
          >
            {{ item.totalBoxQty }}
          </div>
          <el-input v-else v-model="item.totalBoxQty" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none', fontWeight: 700 }" for="">PALLET:</label>
          <div :style="{ fontSize: '14px', flex: 1, textAlign: 'center', fontWeight: 700 }">
            {{ item.palletNumber }} OF {{ item.totalPalletNumber }}
          </div>
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none', fontWeight: 700 }" for="">Mix Pallet:</label>
          <div :style="{ fontWeight: 700, fontSize: '16px', flex: 1, textAlign: 'center' }">
            {{ item.mixPallet }}
          </div>
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none', fontWeight: 700 }" for="">REF1:</label>
          <div
            v-if="startPdf"
            :style="{ fontWeight: 600, fontSize: '16px', flex: 1, textAlign: 'center' }"
          >
            {{ item.refNo1 }}
          </div>
          <el-input v-else v-model="item.refNo1" />
        </div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <label :style="{ flex: 'none', fontWeight: 700 }" for="">REF2:</label>
          <div
            v-if="startPdf"
            :style="{ fontWeight: 600, fontSize: '16px', flex: 1, textAlign: 'center' }"
          >
            {{ item.refNo2 }}
          </div>
          <el-input v-else v-model="item.refNo2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PalletMarkDataBean } from '@/api/erp/data-contracts';

  const props = defineProps<{
    item: PalletMarkDataBean;
    index: number;
    startPdf: boolean;
    shiFromAddress?: string;
    shipToAddress?: string;
  }>();
  defineEmits<{
    (event: 'update:shiFromAddress', data?: string): void;
    (event: 'update:shipToAddress', data?: string): void;
  }>();
</script>

<style lang="scss" scoped>
  .pallet-mark {
    :deep(.el-input__wrapper) {
      --el-input-bg-color: #e3fafa;
    }
    :deep(.el-textarea__inner) {
      --el-input-bg-color: #e3fafa;
    }
  }
</style>
