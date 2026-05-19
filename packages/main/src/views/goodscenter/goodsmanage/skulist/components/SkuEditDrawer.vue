<template>
  <el-drawer
    v-model="visible"
    :size="1200"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :append-to-body="true"
    class="custom-drawer product-drawer"
    :show-close="false"
  >
    <template #header>
      <div class="drawer-header">
        <KeenImageUpload
          class="product-image"
          v-model="form.productImageList[0]"
          directory="product/goods"
          tooltip="更改产品图片"
          :size="88"
          :disabled="type === 'detail'"
          :options="{
            style: {
              border: '1px solid #02B96B !important',
            },
          }"
          :editOptions="{
            style: {
              backgroundColor: '#02B96B !important',
              bottom: '0',
              top: 'auto',
              transform: 'translate(-28px, -4px)',
            },
          }"
        />
        <div class="product-info">
          <div class="product-item">
            <div class="product-name-container">
              <span class="product-name" v-if="!flagObj['name']">
                {{ form.productTitle || '-' }}
              </span>
              <el-input class="w-400px" size="small" v-else v-model="form.productTitle" />
              <i
                v-if="type === 'edit' && !flagObj['name']"
                class="iconfont icon-bianji"
                @click="flagObj['name'] = true"
              ></i>
              <span
                v-if="flagObj['name']"
                class="product-name-divider"
                @click="flagObj['name'] = false"
              >
                <i class="Root-tyicon icon-Root-tyxuanze"></i>
              </span>
              <Tag v-if="form?.stateDesc" :color="colorMap[form?.state]">
                {{ form?.stateDesc }}
              </Tag>
            </div>
            <i
              class="Root-tyicon icon-Root-tyguanbi"
              @click="
                onBeforeClose((flag) => {
                  visible = flag;
                })
              "
            ></i>
          </div>
          <div class="product-item">
            <span class="product-spu">产品SPU</span>
            <span class="product-spu-value">
              <router-link
                :style="{ color: 'var(--P6, #02b96b)' }"
                target="_blank"
                v-if="form.productSpu"
                :to="`/goodslist/detail?code=${form.productSpu}`"
              >
                {{ form?.productSpu }}
              </router-link>
              <Copy :content="form?.productSpu" />
            </span>
            <span class="product-spu-divider"></span>
            <span class="product-spu">产品SKU</span>
            <span class="product-spu-value">
              {{ form?.skuCode || '-' }}
              <Copy :content="form?.skuCode" />
            </span>
            <span class="product-spu-divider"></span>
            <span class="product-name-en">英文名称</span>
            <span class="product-name-en-value" v-if="!flagObj['nameEn']">
              {{ form.productTitleEn || '-' }}
            </span>
            <el-input class="w-375px" size="small" v-else v-model="form.productTitleEn" />
            <i
              v-if="type === 'edit' && !flagObj['nameEn']"
              class="iconfont icon-bianji"
              @click="flagObj['nameEn'] = true"
            ></i>
            <span
              v-if="flagObj['nameEn']"
              class="product-name-divider"
              @click="flagObj['nameEn'] = false"
            >
              <i class="Root-tyicon icon-Root-tyxuanze"></i>
            </span>
          </div>
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane
              v-for="c of catalogList"
              :key="c.id"
              :label="c.name"
              :name="c.id"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
    <!-- <DetailDrawerContent ref="contentRef" @close="visible = false" /> -->
    <div class="drawer-content-wrapper sku-edit-content">
      <EditDrawerContent ref="contentRef" :isDetail="type === 'detail'" />
    </div>
    <template #footer v-if="type === 'edit'">
      <el-button type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
      <el-button
        :disabled="saveLoading"
        @click="
          onBeforeClose((flag) => {
            visible = flag;
          })
        "
      >
        取消
      </el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
  import * as swal from '@/utils/swal';
  import EditDrawerContent from '../editDrawerContent.vue';

  const visible = ref(false);
  const emit = defineEmits<{
    success: [];
  }>();

  const colorMap = {
    0: 'blue',
    1: 'purple',
    2: 'green',
    3: 'red',
  };
  const contentRef = ref<InstanceType<typeof EditDrawerContent>>();
  const type = ref<'detail' | 'edit'>('detail');
  const open = (payload: { code: string; type: typeof type.value }) => {
    type.value = payload.type;
    visible.value = true;
    activeTab.value = 'baseInfo'; // 重置活跃 Tab 为默认值
    flagObj.value = {};
    form.value = {
      productImageList: [],
      name: '',
      nameEn: '',
      productSpu: '',
      state: 0,
      stateDesc: '',
      skuList: [],
    };

    nextTick(async () => {
      const detailPromise = await contentRef.value?.init(payload.code);
      try {
        const res = detailPromise;
        // 规范化图片数据，防止 src 警告
        if (res) {
          res.productImageList = res.productImageList || [];
          form.value = res;
        }
      } catch (error) {
        console.error('获取详情数据失败:', error);
      }
      nextTick(() => {
        baseCatalogList
          .map((item) => document.getElementById(item.id))
          .forEach((el) => {
            if (el) {
              observer.observe(el);
            }
          });
      });
    });
  };
  defineExpose({
    open,
  });

  const flagObj = ref<any>({});
  const form = ref<any>({
    productImageList: [],
    name: '',
    nameEn: '',
    productSpu: '',
    state: 0,
    stateDesc: '',
    skuList: [],
  });
  const activeTab = ref('baseInfo');
  const saveLoading = ref(false);

  const handleSave = async () => {
    saveLoading.value = true;
    const result = await contentRef.value?.handleSave().finally(() => {
      saveLoading.value = false;
    });
    visible.value = !result;
    if (result) {
      emit('success');
    }
  };

  let clickedTabs = ''; // 记录已点击过的 Tab
  const handleTabClick = (tab: any) => {
    clickedTabs = tab.paneName; // 更新已点击过的 Tab
    const el = document.getElementById(tab.paneName);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const onIntersectionObserver = (entry: IntersectionObserverEntry[]) => {
    if (entry[0].isIntersecting) {
      // 处理进入视口的逻辑
      if (clickedTabs) return; // 如果是点击 Tab 导致的滚动，忽略 Intersection Observer 的更新
      activeTab.value = entry[0].target.id;
    } else {
      // 处理离开视口的逻辑（如果需要）
      if (clickedTabs === entry[0].target.id) {
        clickedTabs = ''; // 重置已点击过的 Tab
      }
    }
  };
  const observer = new IntersectionObserver(onIntersectionObserver, {
    root: document.querySelector('.drawer-content-wrapper'),
    rootMargin: '0px 0px -50% 0px',
  });
  const isProductGroup = computed(() => {
    return form.value.productType === 13;
  });
  const baseCatalogList = [
    { id: 'baseInfo', name: '基础信息' },
    { id: 'combinationInfo', name: '组合信息' },
    { id: 'declareInfo', name: '报关信息' },
    { id: 'clearanceInfo', name: '清关信息' },
    { id: 'materialInfo', name: '产品包装信息' },
    { id: 'hardwareInfo', name: '硬件参数信息' },
    { id: 'recycleInfo', name: '产品回收信息' },
    { id: 'shippingInfo', name: '装运信息' },
    { id: 'batteryInfo', name: '电池信息' },
    { id: 'certificationInfo', name: '认证信息' },
    { id: 'warrantyInfo', name: '质保信息' },
    { id: 'channelInfo', name: '渠道资料信息' },
    { id: 'saleCountryInfo', name: '在售国家信息' },
  ];
  const catalogList = computed(() => {
    let list = baseCatalogList;
    if (type.value === 'edit') {
      list = list.filter((c) => c.id !== 'saleCountryInfo');
    }
    if (!isProductGroup.value) {
      list = list.filter((c) => c.id !== 'combinationInfo');
    }
    return list;
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });
  const onBeforeClose = async (done) => {
    if (type.value === 'detail') {
      done(false);
      return;
    }
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return done();
    done(false);
  };
</script>

<style lang="scss" scoped>
  .drawer-header {
    display: flex;
    align-items: center;
    gap: 16px;
    :deep(.bi-pencil-fill.bi) {
      color: #ffffff;
    }
    .product-image {
      height: 88px;
    }
    .product-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // gap: 4px;
      .product-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        .product-name-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .product-name {
          color: var(--Grey-grey-10, #000);
          font-family: 'PingFang SC Medium';
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 28px;
        }
        .icon-bianji {
          color: #8a9099;
          &:hover {
            opacity: 0.8;
            cursor: pointer;
          }
        }
        .product-spu,
        .product-name-en {
          color: var(---N6, var(---N6, #8a9099));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .product-spu-value,
        .product-name-en-value {
          color: var(--Grey-grey-8, #626973);
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .product-name-en-value {
          color: var(--Grey-grey-8, #626973);
        }
        .product-spu-divider {
          width: 1px;
          height: 12px;
          background: #dfe2e6;
        }
        .icon-Root-tyguanbi {
          cursor: pointer;
          color: var(--Grey-grey-7, #8a9099);
          &:hover {
            opacity: 0.8;
          }
        }
        .product-name-divider {
          display: flex;
          width: 28px;
          height: 28px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border-radius: 4px;
          border: 1px solid var(---N4, #dfe2e6);
          color: var(---P6, #02b96b);
          &:hover {
            opacity: 0.8;
            cursor: pointer;
          }
        }
      }
      .product-item:nth-child(1) {
        justify-content: space-between;
      }
      .product-item:nth-child(2) {
        margin-top: 8px;
        line-height: 28px;
      }
    }
  }
  .drawer-content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>

<style lang="scss">
  .product-drawer.custom-drawer {
    .el-drawer__header {
      padding: 16px 20px 0 20px;
    }
  }
</style>
