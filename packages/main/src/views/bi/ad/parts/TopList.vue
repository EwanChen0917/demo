<template>
  <BiCard title="TOP - List">
    <template #actions>
      <span class="operation">
        <el-radio-group v-model="type">
          <el-radio-button value="categoryTop10">品类</el-radio-button>
          <el-radio-button value="spuTop10">SPU</el-radio-button>
          <el-radio-button value="brandTop10">品牌</el-radio-button>
        </el-radio-group>
      </span>
    </template>
    <div class="top-list">
      <div class="top-list-section">
        <div class="top-title">广告花费 - Top10</div>
        <RankList :data="costTop10" :isShowValue="false">
          <template #img="{ item }">
            <div class="category-img">
              <el-image :src="item.imgUrl" :alt="item.category" fit="contain">
                <template #error>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
                <template #placeholder>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
              </el-image>
            </div>
          </template>
          <template #name="{ item }">
            <div class="item-label">
              <span>{{ item.name }}&nbsp;|&nbsp;</span>
              <span class="item-value font-din">{{ formatNumberObj(item.value) }}</span>
            </div>
          </template>
        </RankList>
      </div>
      <div class="top-list-section">
        <div class="top-title">Worst - ROAS - Top10</div>
        <RankList :data="worstRoasTop10" :isShowValue="false">
          <template #img="{ item }">
            <div class="category-img">
              <el-image :src="item.imgUrl" :alt="item.category" fit="contain">
                <template #error>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
                <template #placeholder>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
              </el-image>
            </div>
          </template>
          <template #name="{ item }">
            <div class="item-label">
              <span>{{ item.name }}&nbsp;|&nbsp;</span>
              <span class="item-value font-din">
                {{
                  Intl.NumberFormat('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.value)
                }}
              </span>
            </div>
          </template>
        </RankList>
      </div>
      <div class="top-list-section">
        <div class="top-title">Best - ROAS - Top10</div>
        <RankList :data="bestRoasTop10" :isShowValue="false">
          <template #img="{ item }">
            <div class="category-img">
              <el-image :src="item.imgUrl" :alt="item.category" fit="contain">
                <template #error>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
                <template #placeholder>
                  <el-image :src="defaultImgSrc" fit="contain" />
                </template>
              </el-image>
            </div>
          </template>
          <template #name="{ item }">
            <div class="item-label">
              <span>{{ item.name }}&nbsp;|&nbsp;</span>
              <span class="item-value font-din">
                {{
                  Intl.NumberFormat('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.value)
                }}
              </span>
            </div>
          </template>
        </RankList>
      </div>
    </div>
  </BiCard>
</template>

<script setup lang="ts">
  import BiCard from '@/views/bi/components/BiCard.vue';
  import { type BiContracts } from '@/api';
  import RankList from '@/views/bi/components/RankList.vue';
  import { formatNumberObj } from '../../utils/utils';

  const props = defineProps<{
    brandTop10?: BiContracts.AdBrandTopDO;
    categoryTop10?: BiContracts.AdCategoryTopDO;
    spuTop10?: BiContracts.AdSpuTopDO;
  }>();
  const type = ref<string>('categoryTop10');
  const data = computed(() => {
    return props[type.value] || {};
  });
  const nameMap = {
    categoryTop10: 'category',
    spuTop10: 'spuName',
    brandTop10: 'brand',
  };
  const costTop10 = computed(() => {
    const datas = data.value.costTop10 || [];
    const max = Math.max(...datas.map((x) => x.cost));
    return (data.value.costTop10 || []).map((item) => ({
      name: item[nameMap[type.value]],
      category: item.category,
      imgUrl: item.imgUrl,
      percent: ((item.cost || 0) / max) * 100,
      value: item.cost || 0,
      color: '#02B96B',
    }));
  });
  const worstRoasTop10 = computed(() => {
    const datas = data.value.worstRoasTop10 || [];
    const max = Math.max(...datas.map((x) => x.roas));
    return (data.value.worstRoasTop10 || []).map((item) => ({
      name: item[nameMap[type.value]],
      category: item.category,
      imgUrl: item.imgUrl,
      percent: ((item.roas || 0) / max) * 100,
      value: item.roas || 0,
      color: '#02B96B',
    }));
  });
  const bestRoasTop10 = computed(() => {
    const datas = data.value.bestRoasTop10 || [];
    const max = Math.max(...datas.map((x) => x.roas));
    return (data.value.bestRoasTop10 || []).map((item) => ({
      name: item[nameMap[type.value]],
      category: item.category,
      imgUrl: item.imgUrl,
      percent: ((item.roas || 0) / max) * 100,
      value: item.roas || 0,
      color: '#02B96B',
    }));
  });
  const defaultImgSrc = new URL('@/assets/images/system/default-img.png', import.meta.url).href;
</script>

<style scoped lang="scss">
  .operation {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
  }
  .top-list-section {
    margin: 0 30px;
  }
  .top-title {
    color: var(---N9, #1f1f1f);

    /* 常规/Medium 14 */
    font-family: 'PingFang SC Medium', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    margin-bottom: 20px;
  }
  .category-img {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    object-fit: cover;
    border: 0.5px solid var(---N3, #ededed);
    background: #f8f8f8;
    margin: 0 12px;
    overflow: hidden;
  }
  .top-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
</style>
