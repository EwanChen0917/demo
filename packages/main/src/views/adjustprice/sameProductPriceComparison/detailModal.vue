<template>
  <el-dialog
    v-model="visible"
    :title="`详情：${currentSiteName}/${currentRow?.supplySku}`"
    width="900px"
  >
    <el-table :data="list" empty-text="暂未售卖">
      <el-table-column prop="platformSku" label="店铺SKU">
        <template #default="{ row }">
          <div>{{ row.platformSku }}</div>
          <div>
            <el-link v-if="row.productUrl" type="primary" :href="row.productUrl" target="_blank">
              <el-icon><Link /></el-icon>
              链接
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="shop" label="店铺" />
      <el-table-column prop="site" label="站点" />
      <el-table-column prop="listPrice" label="原价">
        <template #default="{ row }">
          {{ row.listPrice ? `${row.listPrice} ${row.currency || ''}` : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="promotionPrice" label="促销价">
        <template #default="{ row }">
          {{ row.promotionPrice ? `${row.promotionPrice} ${row.currency || ''}` : '-' }}
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { Link } from '@element-plus/icons-vue';

  const visible = ref(false);
  const list = ref([]);
  const currentRow = ref(null);
  const currentSite = ref('');
  const currentSiteName = ref('');

  const showModal = ({ site, siteName, row }) => {
    visible.value = true;
    list.value = [];
    currentRow.value = row;
    currentSite.value = site;
    currentSiteName.value = siteName;
    productApi
      .luteosProductMultiPriceQueryPriceDetail({
        platform: site,
        code: row.code,
      })
      .then((res) => {
        list.value = res || [];
      });
  };

  defineExpose({
    showModal,
  });
</script>

<style scoped lang="scss"></style>
