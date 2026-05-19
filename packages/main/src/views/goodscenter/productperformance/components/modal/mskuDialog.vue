<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="80%" align-center>
    <template #title>
      <GoodsInfo
        :src="skuInfo.productImageUrl"
        :title="skuInfo.productTitle"
        :subtitle="skuInfo.skuCode"
        copy-subtitle
        :url="`/skulist/detail?code=${skuInfo.skuCode}`"
        :openNewPage="true"
      />
    </template>
    <KeenList>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="skuInfo.onlineProductList"
        row-key="skuCode"
      >
        <el-table-column label="渠道" prop="channel" min-width="100" />
        <el-table-column label="站点" prop="site" min-width="100" />
        <el-table-column label="店铺" prop="shop" min-width="120" />
        <el-table-column label="店铺SKU" prop="msku" min-width="180">
          <template #default="{ row }">
            <div class="msku-link">
              <span @click="openMskuDetail(row)">
                {{ row.msku }}
              </span>
              <i
                v-if="row.msku"
                class="fas fa-copy text-hover-primary cursor-pointer"
                @click.stop="copyFn(row.msku, '')"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="链接" prop="productLink" min-width="100">
          <template #default="{ row }">
            <div class="link" @click="openUrl(row.productLink)">
              {{ row.productLink }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="scope">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: 'MSKU销售表现',
                  key: 'msku',
                  type: 'primary',
                  row: scope.row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </KeenList>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { openWindow } from '@/utils';
  import { copyFn } from '@/utils/copyFn';
  import { encryptByBase64 } from '@/utils/aesTils';
  import router from '@/router';

  defineProps<{
    visible: boolean;
    skuInfo: object;
  }>();

  const openMskuDetail = (row) => {
    if (['amazon', 'shopify', 'walmart'].includes(row.channel)) {
      openWindow(`/${row.channel}Online?keyword=${row.msku}&tab=child`);
    } else {
      openWindow(`/productOnline?keyword=${row.msku}&channel=${row.channel}&tab=child`);
    }
  };

  const openUrl = (url) => {
    if (url) {
      openWindow(url);
    }
  };

  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'msku') {
      router.push({
        name: 'mskuperformance',
        query: {
          code: row.msku,
          row: encryptByBase64(
            JSON.stringify({
              ...row,
            })
          ),
        },
      });
    }
  };
</script>

<style scoped lang="scss">
  .link {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #1989fa;
    cursor: pointer;
  }
  .msku-link {
    color: #1989fa;
    cursor: pointer;
  }
  .fa-copy {
    margin-left: 8px;
  }
</style>
