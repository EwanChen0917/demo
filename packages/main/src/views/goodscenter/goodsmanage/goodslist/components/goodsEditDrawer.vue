<template>
  <div class="product-edit-drawer">
    <el-drawer
    v-model="visible"
    size="1200px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    class="custom-drawer product-drawer"
    :show-close="false"
  >
  <template #header>
    <div class="drawer-header">
        <KeenImageUpload
            class="product-image"
            v-model="form.productImage"
            directory="product/goods"
            tooltip="更改产品图片"
            :size="88"
            :disabled="detailType"
            :options="{
              style: {
                border: '1px solid #02B96B !important',
              }
            }"
            :editOptions="{
              style: {
                backgroundColor: '#02B96B !important',
                bottom: '0',
                top: 'auto',
                transform: 'translate(-28px, -4px)'
              }
            }"
          />
          <div class="product-info">
            <div class="product-item">
                <div class="product-name-container">
                  <span class="product-name" v-if="!flagObj['name']">{{ form.name }}</span> 
                  <el-input size="small" class="w-275px" v-else v-model="form.name" />
                  <i v-if="!detailType && !flagObj['name']" class="iconfont icon-bianji" @click="flagObj['name'] = true"></i>
                  <span v-if="flagObj['name']" class="product-name-divider" @click="flagObj['name'] = false"><i class="Root-tyicon icon-Root-tyxuanze" ></i></span>
                  <Tag v-if="form?.stateDesc" :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
                </div>
                <i class="Root-tyicon icon-Root-tyguanbi" @click="detailType ? visible = false : contentRef?.cancel()"></i>
            </div>
            <div class="product-item">
                <span class="product-spu">产品SPU</span><span class="product-spu-value"> {{ form?.productSpu }} <Copy :content="form?.productSpu" /></span>
                <span class="product-spu-divider"></span>
                <span class="product-name-en">英文名称</span><span class="product-name-en-value" v-if="!flagObj['nameEn']">{{ form.nameEn }}</span> 
                <el-input class="w-375px" size="small" v-else v-model="form.nameEn" />
                <i v-if="!detailType && !flagObj['nameEn']" class="iconfont icon-bianji" @click="flagObj['nameEn'] = true"></i>
                <span v-if="flagObj['nameEn']" class="product-name-divider" @click="flagObj['nameEn'] = false"><i class="Root-tyicon icon-Root-tyxuanze" ></i></span>
            </div>
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane label="基础信息" name="baseInfo"></el-tab-pane>
                <el-tab-pane label="属性信息" name="attrInfo"></el-tab-pane>
                <el-tab-pane label="SKU信息" name="skuInfo"></el-tab-pane>
                <el-tab-pane label="其他信息" name="otherInfo"></el-tab-pane>
            </el-tabs>
          </div>
    </div>
  </template>
    <!-- <DetailDrawerContent ref="contentRef" @close="visible = false" /> -->
    <div v-loading="listLoading" class="drawer-content-wrapper">
      <EditDrawerContent
        ref="contentRef"
        v-if="showContent"
        :isDetail="detailType"
        @close="handleClose"
        @save="handleSave"
        @closeLoading="listLoading = false"
        @activeSectionChange="(id) => activeTab = id"
      />
    </div>
    <template #footer v-if="!detailType">
      <div>
        <el-space>
          <el-button
            v-if="[0, 3].includes(form.state)"
            type="primary"
            :loading="saveLoading"
            :disabled="saveLoading"
            @click="handleSubmit(1)"
          >
            {{ form.state === 0 ? '保存草稿' : '保存' }}
          </el-button>
          <el-button
            v-if="form.state === 0"
            type="primary"
            :loading="saveLoading"
            :disabled="saveLoading"
            @click="handleSubmit(2)"
          >
            确认提交
          </el-button>
          <el-button
            v-if="[1, 2].includes(form.state)"
            type="primary"
            :loading="saveLoading"
            :disabled="saveLoading"
            @click="handleSubmit(2)"
          >
            {{
              form?.skuList?.filter(
                (item) => !sqlSkuList?.map((i) => i.skuCode).includes(item.skuCode)
              )?.length > 0 ||
              form?.skuList?.filter(
                (item) =>
                  item.activeFlag !==
                  sqlSkuList?.find((i) => i.skuCode === item.skuCode)?.activeFlag
              )?.length > 0
                ? '确认提交'
                : '保存'
            }}
          </el-button>
          <el-button @click="contentRef?.cancel();">取消</el-button>
        </el-space>
      </div>
    </template>
  </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { ProductApi, productApi } from '@/api';
  import EditDrawerContent from '../../goodsedit/index.vue';

  const visible = ref(false);

  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

   const colorMap = {
    0: 'blue',
    1: 'purple',
    2: 'green',
    3: 'red',
  };
  const contentRef = ref<InstanceType<typeof EditDrawerContent>>();
    const detailType = ref<boolean>(false);
    const sqlSkuList = [];
  //   const contentRef = ref<InstanceType<typeof DetailDrawerContent>>();
  const open = (code: string, type: string) => {
    detailType.value = type === 'detail';
    visible.value = true;
    activeTab.value = 'baseInfo'; // 重置活跃 Tab 为默认值
    flagObj.value = {};
    showContent.value = false; // 先重置
    form.value = {
      productImage: '',
      name: '',
      nameEn: '',
      productSpu: '',
      state: 0,
      stateDesc: '',
      skuList: []
    };
    
    // 立即发起请求，不再等待 nextTick，并行化加载
    const detailPromise = productApi.luteosProductQueryDetail({
      productSpu: code,
      operationType: 'detail',
    });

    nextTick(async () => {
      showContent.value = true; // 在下一个 tick 中设为 true，确保组件能重新挂载
      
      // 重置滚动条位置到顶部
      const drawerBody = document.querySelector('.product-drawer .el-drawer__body');
      if (drawerBody) {
        drawerBody.scrollTop = 0;
      }

      try {
        listLoading.value = true;
        const res = await detailPromise;
        // 规范化图片数据，防止 src 警告
        if (res) {
          res.productImage = res.productImage || '';
          if (res.skuList) {
            res.skuList.forEach((sku: any) => {
              if (!sku.productImageList || !sku.productImageList.length) {
                sku.productImageList = ['', '', ''];
              } else {
                // 确保数组长度至少为3且没有 null/undefined
                for (let i = 0; i < 3; i++) {
                  sku.productImageList[i] = sku.productImageList[i] || '';
                }
              }
            });
          }
        }
        form.value = res;
        
        // 确保组件已挂载
        if (contentRef.value) {
          await contentRef.value.init(res);
        }
      } catch (error) {
        console.error('获取详情数据失败:', error);
      } finally {
        listLoading.value = false;
      }
    });
  };
  defineExpose({
    open,
  });

  const flagObj = ref<any>({})
  const form = ref<any>({
    productImage: '',
    name: '',
    nameEn: '',
    productSpu: '',
    state: 0,
    stateDesc: '',
    skuList: []
  })
  const activeTab = ref('baseInfo');
    const listLoading = ref(false);
    const showContent = ref(false);
    const saveLoading = ref(false);
  
  const handleSubmit = async (num: number) => {
    // 1. 第一步：立即改变状态，触发按钮 Loading 样式
    saveLoading.value = true;
    
    setTimeout(async () => {
      try {
        let params = {
          productImage: form.value.productImage,
          name: form.value.name,
          nameEn: form.value.nameEn,
        }
        // 调用子组件的提交逻辑
        await contentRef.value?.submit(num, params);
      } catch (error) {
        console.error('提交执行异常:', error);
        saveLoading.value = false;
      }
    }, 50);
  }

  const handleTabClick = (tab: any) => {
    contentRef.value?.scrollToSection(tab.paneName);
  };

  const handleSave = (success: boolean) => {
    saveLoading.value = false;
    if (success) {
      visible.value = false;
      emit('close');
    }  
  }

  const handleClose = () => {
    visible.value = false;
    saveLoading.value = false;
  }


</script>


<style lang="scss" scoped>
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
    .drawer-header {
      display: flex;
      align-items: center;
      gap: 16px;
      .bi-pencil-fill.bi {
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
            font-family: "PingFang SC Medium";
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
          .product-spu, .product-name-en {
            color: var(---N6, var(---N6, #8A9099));
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
          }
          .product-spu-value, .product-name-en-value {
            color: var(---P6, var(---P6, #02B96B));
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
            background: #DFE2E6;
          }
          .icon-Root-tyguanbi {
            cursor: pointer;
            color: var(--Grey-grey-7, #8A9099);
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
            border: 1px solid var(---N4, #DFE2E6);
            color:  var(---P6, #02B96B);
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
    
  }
}
</style>
