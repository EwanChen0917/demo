<template>
  <div class="conclusions-content">
    <div v-show="emptyData" class="conclusions-empty">
      <EmptyAnimation name="listEmpty" :width="128" :height="128" />
      <span>请直接查看右侧文件列表，了解相关节点内容~</span>
    </div>
    <div v-show="!emptyData" class="conclusion-summary" ref="contentSectionRef">
      <div class="catalogue">
        <el-tooltip content="目录" placement="top" v-if="catalogueIcon">
          <div class="catalogue-icon" @click.stop="catalogueIcon = !catalogueIcon">
            <img src="../../assets/images/catalogue.svg" />
          </div>
        </el-tooltip>
        <div v-else class="catalogue-content">
          <div class="content-header">目录</div>
          <div class="content-box">
            <div
              class="content-title"
              :class="{ 'content-title-active': activated == item.id }"
              v-for="item in tabs"
              :key="item.id"
              @click="handleClickCatalogue(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="summary-list" v-loading="loading">
        <template v-for="node in allNodesData" :key="node.nodeId">
          <div
            v-if="node.data"
            class="node-container"
            :id="'node-' + node.nodeId"
            :data-node-id="node.nodeId"
          >
            <div class="list-content-box">
              <div
                v-for="(item, title) in node.titleMap"
                :key="title"
                class="list-item"
                :id="node.nodeId + '-' + title"
              >
                <div class="list-title" v-if="item.children[0].chart_data?.chart_type">
                  <span class="title-icon"></span>
                  <span class="title">{{ title }}</span>
                  <EvidenceChain
                    v-if="
                      item.children.length == 1 &&
                      !echartsType.includes(item.children[0].chart_data?.chart_type)
                    "
                    :card-info="item.children[0]"
                    :showTitle="false"
                    @drawer-click="
                      evidenceChainDrawerRef?.open(item.children[0], item.module_name, node.data)
                    "
                  />
                </div>
                <div v-for="(content, index) in item.children" :key="index" class="list-content">
                  <ContentEcharts
                    v-if="echartsType.includes(content.chart_data?.chart_type)"
                    :option="content.chart_data"
                    :title="content.title"
                    :emptyDataClick="emptyDataClick"
                    :key="index"
                  />
                  <ContentTable
                    v-if="content.chart_data?.chart_type == 'table_chart'"
                    :table-data="content.chart_data"
                    :card-info="content"
                    :key="index"
                    :show-evide="item.children?.length > 1"
                    @drawer-click="
                      evidenceChainDrawerRef?.open(content, item.module_name, node.data)
                    "
                  />
                  <TextDrawerCard
                    v-if="
                      echartsType.includes(content.chart_data?.chart_type) ||
                      content.chart_data?.chart_type == 'text_chart'
                    "
                    :card-info="content"
                    :show-evide="
                      echartsType.includes(content.chart_data?.chart_type) ||
                      (item.children?.length > 1 &&
                        !echartsType.includes(content.chart_data?.chart_type))
                    "
                    :title="
                      echartsType.includes(content.chart_data?.chart_type)
                        ? '趋势分析'
                        : content.title
                    "
                    @drawer-click="
                      evidenceChainDrawerRef?.open(content, item.module_name, node.data)
                    "
                    :key="index"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <EvidenceChainDrawer ref="evidenceChainDrawerRef" :instanceCode="instanceCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import EvidenceChainDrawer from './evidenceChainDrawer.vue';
  import ContentEcharts from './contentEcharts.vue';
  import TextDrawerCard from './drawerCard.vue';
  import ContentTable from './contentTable.vue';
  import CardColorList from './cardColorList.vue';
  import EvidenceChain from './evidenceChain.vue';
  import { typeTitle, echartsType } from './data/custom';
  const catalogueIcon = ref(true);
  const evidenceChainDrawerRef = ref();

  const props = withDefaults(
    defineProps<{
      data: Array<any>;
      title: string;
      tab: string;
      instanceCode?: string;
      filePhasedResults?: Array<any>;
      isUserClick?: boolean;
      emptyDataClick?: boolean;
    }>(),
    {
      data: () => [],
      title: '',
      tab: '',
      instanceCode: '',
      filePhasedResults: () => [],
      isUserClick: false,
      emptyDataClick: false,
    }
  );

  const emit = defineEmits(['node-active-change', 'load-node-data', 'click-change']);

  const allNodesData = ref<any[]>([]);
  const loading = ref(false);
  const contentSectionRef = ref<HTMLElement | null>(null);
  const tabs = ref([]);
  const activated = ref('');
  let observer: IntersectionObserver | null = null;

  const processData = async (dataList: any[]) => {
    const processedNodes: any[] = [];
    const allTabs: any[] = [];

    for (const node of dataList) {
      const titleMap: any = {};
      if (node.data && !node.data.empty) {
        for (let key in typeTitle) {
          if (node.title.includes(key)) {
            let content = node.data.content;
            if (content) {
              const nodeTabs = content.map((item) => ({
                label: item.module_name,
                id: `${node.nodeId}-${item.module_name}`,
                nodeTitle: node.title,
              }));
              allTabs.push(...nodeTabs);

              content = await mergeDataSourcesByModuleName(content, typeTitle[key]);
              for (const item of content) {
                titleMap[item.module_name] = await getFileInfoByFileName(item);
              }
            }
            break;
          }
        }
      }
      processedNodes.push({
        ...node,
        titleMap,
      });
    }
    allNodesData.value = processedNodes;
    tabs.value = allTabs;
  };

  const emptyData = ref(false);
  watch(
    () => props.data,
    (newData) => {
      if (newData && newData.length > 0) {
        loading.value = true;
        if (!emptyData.value) {
          processData(newData).finally(() => {
            loading.value = false;
            nextTick(() => {
              setupIntersectionObserver();
            });
          });
        }
      }
    },
    { deep: true, immediate: true }
  );

  watch(
    () => props.emptyDataClick,
    (newVal) => {
      emptyData.value = newVal;
    },
    { immediate: true }
  );

  // 将数据来源新增到各自的对象内
  function mergeDataSourcesByModuleName(arr1, arr2) {
    // 遍历数组一，匹配 module_name
    return arr1.map((item) => {
      let objInfo = arr2.find((node) => node.module_name == item.module_name);
      return { ...item, data_sources: objInfo.data_sources };
    });
  }

  // 根据文件名拿到对应的文件信息
  const getFileInfoByFileName = (item) => {
    // 1. 不存在 data_sources 直接返回
    if (!item.data_sources) return item;

    // 2. 解析出完整的 data_sources 数组（文件对象 / 原字符串）
    const resolvedSources = item.data_sources.map((source) => {
      const fileNameWithoutExt = source.split('.')[0];
      const matchedFile = props.filePhasedResults.find((file) =>
        fileNameWithoutExt.includes(file.name)
      );
      return matchedFile || source;
    });

    // 3. 处理 children：给每个子项都加上 data_sources
    const processedChildren =
      item.children?.map((child) => ({
        ...child,
        data_sources: resolvedSources, // 子对象统一赋值
      })) || [];

    // 4. 返回新对象：自身 + 子项都带上 data_sources
    return {
      ...item,
      data_sources: resolvedSources, // 自身赋值
      children: processedChildren, // 处理后的子项
    };
  };

  const setupIntersectionObserver = () => {
    if (observer) {
      observer.disconnect();
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const nodeId = entry.target.getAttribute('data-node-id');
            const node = allNodesData.value.find((n) => n.nodeId === nodeId);
            // 如果是点击目录触发的滚动，并且当前进入视口的节点就是点击的目录对应的节点，则不更新高亮状态
            if (clickCatalogueFlag.value && clickCatalogueTitle.value == node.title) {
              clickCatalogueFlag.value = false;
              break;
            }
            if (
              !clickCatalogueFlag.value &&
              node &&
              ((props.isUserClick && props.tab === node.title) || !props.isUserClick)
            ) {
              // 触发父组件更新左侧导航高亮
              emit('node-active-change', node.title);
              // 同时更新组件内部目录的高亮状态
              if (node.titleMap) {
                const firstModule = Object.keys(node.titleMap)[0];
                if (firstModule) {
                  activated.value = `${node.nodeId}-${firstModule}`;
                }
              }

              if (!node.data) {
                emit('load-node-data', node.nodeId);
              }
              emit('click-change', false);
            }
          }
        }
      },
      {
        root: contentSectionRef.value,
        rootMargin: '-5% 0px -90% 0px', // Trigger when the node is at the very top of the scroll container
        threshold: 0,
      }
    );

    const nodeElements = document.querySelectorAll('.node-container');
    nodeElements.forEach((el) => {
      observer?.observe(el);
    });
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  // 目录点击滚动到对应位置
  const clickCatalogueFlag = ref(false);
  const clickCatalogueTitle = ref('');
  const handleClickCatalogue = (item: { label: string; id: string; nodeTitle: string }) => {
    const contentSection = document.querySelector('.conclusion-summary');
    const section = document.getElementById(item.id);
    if (section && contentSection) {
      const headerHeight = 82;
      const top = section.offsetTop - headerHeight;
      const targetNodeId = item.id.split('-')[0];
      const targetNode = allNodesData.value.find((node) => node.nodeId === targetNodeId);
      contentSection.scrollTo({ top, behavior: 'smooth' });
      let title =
        targetNode && targetNode.data?.content[0]?.module_name == item.id.split('-')[1]
          ? item.nodeTitle
          : targetNode?.title;
      activated.value = item.id;
      clickCatalogueFlag.value = true;
      clickCatalogueTitle.value = title;
      emit('node-active-change', title);
    }
  };

  // 页面点击隐藏弹出层
  const handleClickOutside = (e) => {
    const cataloguePopover = document.querySelector('.catalogue-content');
    const isClickInsideCustomer = cataloguePopover?.contains(e.target);
    if (!isClickInsideCustomer && !e.target.closest('.catalogue-icon')) {
      if (!catalogueIcon.value) catalogueIcon.value = !catalogueIcon.value;
    }
    const evidenceDrawer = document.querySelector('.evidence-chain');
    const isClickInsideEle = evidenceDrawer?.contains(e.target);
    if (!isClickInsideEle && !e.target.closest('.evidence')) {
      evidenceChainDrawerRef.value?.close();
    }
  };
</script>

<style lang="scss" scoped>
  .conclusions-content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 66px);
    width: 100%;
  }
  .conclusions-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(---N6, var(---N6, #8a8f8d));
    font-size: 14px;
  }
  .conclusion-summary {
    width: 100%;
    display: flex;
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    scrollbar-width: none;
    .catalogue {
      position: absolute;
      top: 60px;
      right: 0;
      z-index: 2007;
      .catalogue-icon {
        display: flex;
        width: 24px;
        height: 24px;
        padding: 6px 4px;
        justify-content: center;
        align-items: center;
        gap: 2px;
        border-radius: 6px 0 0 6px;
        border: 1px solid var(---N4, #e7e9e8);
        border-right: none;
        background: #fff;
        &:hover {
          cursor: pointer;
        }
        > img {
          width: 14px;
          height: 14px;
        }
      }
      .catalogue-content {
        display: flex;
        width: 228px;
        height: 326px;
        padding: 12px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        border-radius: 8px 0 0 8px;
        border: 1px solid var(---N3, #eff0f0);
        border-right: none;
        background: #fff;
        /* Shadow1 - 低层级阴影 */
        box-shadow: 0 2px 12px 0 rgba(6, 8, 27, 0.12);
        .content-header {
          color: var(---N9, var(---N9, #262626));
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px;
        }
        .content-box {
          width: calc(228px - 32px);
          height: calc(326px - 50px);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .content-title {
          display: flex;
          width: 196px;
          padding: 4px 8px;
          align-items: center;
          border-radius: 6px;
          overflow: hidden;
          color: var(---N9, var(---N9, #262626));
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          &:hover {
            background: var(---N1, #f8f8f8);
            cursor: pointer;
          }
        }
        .content-title-active {
          color: var(---P6, var(---P6, #02b96b));
          font-family: 'PingFang SC Medium';
          font-size: 13px;
          font-weight: 500;
          line-height: 22px; /* 169.231% */
        }
      }
    }
    .summary-list {
      width: 100%;
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      .node-container {
        width: 100%;
      }
      .list-content-box {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }
      .list-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
      .list-title {
        display: flex;
        align-items: center;
        gap: 8px;
        // align-self: stretch;
        width: 100%;
        .title-icon {
          width: 3px;
          height: 14px;
          border-radius: 15px;
          background: var(---P6, #02b96b);
        }
        .title {
          color: var(---N9, var(---N9, #262626));
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px;
        }
        :deep(.card-title) {
          justify-content: space-between;
          flex: 1;
        }
      }
      .list-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        // padding: 12px 16px;
        // border-radius: 8px;
        // border: 1px solid var(---N2, #f5f5f5);
        background: #fff;
      }
    }
  }
</style>
