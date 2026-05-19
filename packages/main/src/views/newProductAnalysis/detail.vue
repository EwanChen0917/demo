<template>
  <Screen v-if="screening" />
  <div v-else>
    <ManualbackIcon v-if="showDeedBack" @close="showDeedBack = false" />

    <div class="flow-top">
      <div class="flow-title">
        {{ detailInfo?.detail?.name }}工作流
        <span v-if="detailInfo?.detail.status === 2">- 过程回顾</span>
      </div>
      <span class="flow-top-tag" :class="detailInfo?.state?.status">
        {{ detailInfo?.detail?.statusDesc }}
      </span>
      <el-progress v-if="detailInfo?.detail.status !== 2" :percentage="totalProgress" />
      <div class="times">
        <span>
          <el-tooltip content="开始时间" placement="top">
            <i class="iconfont icon-shijian"></i>
          </el-tooltip>
          {{ detailInfo?.detail?.beginTime }}
        </span>
        <span>
          <el-tooltip content="已运行时长" placement="top">
            <i class="Root-tyicon icon-Root-tyshuju"></i>
          </el-tooltip>
          {{
            secondsToDigitalFormat(
              dayjs(
                detailInfo?.state?.status === 'running'
                  ? dayjs()
                  : detailInfo?.state?.status === 'failed'
                  ? detailInfo?.state?.finishedAt
                  : detailInfo?.detail?.endTime
              )?.diff(detailInfo?.detail?.beginTime, 'second')
            )
          }}
        </span>
        <span class="divider"></span>
        <span class="page-share" @click="handlePageShare">
          <i class="Root-tyicon icon-Root-tyfenxiang"></i>
          分享
        </span>
        <el-button
          v-if="detailInfo?.state?.status === 'failed'"
          type="primary"
          size="small"
          :loading="loading"
          @click="retry"
        >
          重试
        </el-button>
      </div>
    </div>

    <!-- NEW TWO-COLUMN LAYOUT (Merged Left + Middle) -->
    <div class="three-column-layout">
      <!-- Merged Left + Middle Panel -->
      <div class="merged-left-middle-column" :class="{ fullscreen: isMiddleFullscreen }">
        <!-- Expand Button (shown when left panel collapsed, inside merged column) -->
        <div v-if="leftPanelCollapsed" class="expand-left-button" @click="handleExpandLeftPanel">
          <el-tooltip content="展开AI工作流" placement="top" :disabled="showExpandTip">
            <i class="iconfont icon-zhankai1"></i>
          </el-tooltip>

          <!-- 首次收起提示 -->
          <div v-if="showExpandTip" class="expand-tip">
            <div class="expand-tip-content">
              <span class="expand-tip-text">点击展开AI工作流</span>
              <i class="iconfont icon-guanbi expand-tip-close" @click.stop="closeExpandTip"></i>
            </div>
            <div class="expand-tip-arrow"></div>
          </div>
        </div>
        <!-- Left Navigation Panel -->
        <div class="left-navigation-panel" :class="{ collapsed: leftPanelCollapsed }">
          <div v-show="!leftPanelCollapsed" class="workflow-menu">
            <div class="workflow-header">
              <div class="workflow-title">AI工作流</div>
              <div class="left-toggle-button" @click="leftPanelCollapsed = !leftPanelCollapsed">
                <el-tooltip content="收起AI工作流" placement="top">
                  <i class="iconfont icon-shouqi"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="workflow-content" v-if="detailInfo?.workflowNodes?.length">
              <div
                v-for="(node, index) in detailInfo?.workflowNodes"
                :key="node?.data?.title"
                class="workflow-node"
              >
                <template v-if="!node.data.title?.includes('证据链')">
                  <div
                    class="node-header"
                    :class="{ disabled: node?.nodeInfo?.status === 'pending' }"
                    @click="handleClick(node)"
                  >
                    <div class="node-header-content">
                      <!-- <span @click.stop="handleClickCollpase(node)" class="node-icon-bg" :style="getNodeIconStyle(node?.data?.title)"></span> -->
                      <i
                        v-if="!hideIndex[node.id]"
                        @click.stop="handleClickCollpase(node)"
                        class="Root-tyicon icon-Root-tysanjiaojiantou-xia"
                      ></i>
                      <i
                        v-if="hideIndex[node.id]"
                        @click.stop="handleClickCollpase(node)"
                        class="Root-tyicon icon-Root-tysanjiaojiantou-you"
                      ></i>
                      <span
                        class="node-title"
                        :class="{ 'active-node': node?.data?.title === curTab }"
                      >
                        {{ node?.data?.title }}
                      </span>
                      <span
                        v-if="['succeeded', 'failed'].includes(node?.nodeInfo?.status)"
                        class="status-icon"
                        :class="node?.nodeInfo?.status"
                      ></span>
                    </div>
                  </div>
                  <div class="node-children" :class="{ 'node-children-hide': hideIndex[node.id] }">
                    <!-- @click.stop="selectChildNode(index, childIndex, child)" -->
                    <div
                      v-for="(child, childIndex) in node.children"
                      :key="childIndex"
                      class="node-child-item"
                      :class="child.status"
                    >
                      <span class="child-title" :title="child?.data.title">
                        {{ child?.data.title }}
                      </span>
                      <i
                        v-if="child?.status === 'running'"
                        class="Root-tyicon icon-Root-tyjiazai child-status-icon"
                      ></i>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <Empty v-else description="正在获取数据" />
          </div>
        </div>

        <!-- Middle Flow Chart Panel -->
        <div class="middle-flow-chart-panel">
          <div class="flow-chart-container">
            <div
              class="flow-chart-header"
              :style="{ 'padding-left': leftPanelCollapsed ? '30px' : 0 }"
            >
              <!-- <span class="header-left">{{ curTab }} - 思考过程</span> -->
              <span class="header-left">
                <span
                  class="left-tab"
                  :class="{ 'active-tab': leftTab == item.value }"
                  v-for="item in leftTabsList"
                  :key="item.value"
                  @click="leftTab = item.value"
                >
                  {{ item.label }}
                </span>
              </span>
              <div class="header-actions">
                <el-tooltip
                  v-if="!isMiddleFullscreen"
                  content="全屏查看"
                  :placement="showRightExpandTip ? 'bottom' : 'top'"
                >
                  <i
                    @click="toggleMiddleFullscreen"
                    class="iconfont icon-quanping cursor-pointer header-icon"
                  ></i>
                </el-tooltip>
                <el-tooltip v-else content="退出全屏" placement="top">
                  <i
                    @click="toggleMiddleFullscreen"
                    class="iconfont icon-shouqiquanping cursor-pointer header-icon"
                  ></i>
                </el-tooltip>

                <div v-if="rightPanelCollapsed && !isMiddleFullscreen" class="divider"></div>

                <template v-if="rightPanelCollapsed && !isMiddleFullscreen">
                  <div class="expand-right-trigger">
                    <el-tooltip
                      content="展开右侧边栏"
                      placement="top"
                      :disabled="showRightExpandTip"
                    >
                      <i
                        @click="handleOpenRightPanel"
                        class="Root-tyicon icon-Root-tybtnRightBar cursor-pointer header-icon"
                      ></i>
                    </el-tooltip>

                    <!-- 首次关闭右侧栏提示 -->
                    <div v-if="showRightExpandTip" class="expand-tip expand-tip-right">
                      <div class="expand-tip-content">
                        <span class="expand-tip-text">点击显示右侧栏</span>
                        <i
                          class="iconfont icon-guanbi expand-tip-close"
                          @click.stop="closeRightExpandTip"
                        ></i>
                      </div>
                      <div class="expand-tip-arrow"></div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <FlowChart
              v-if="leftTab == 'inference'"
              ref="flowChartRef"
              :data="flowInfo"
              :async="isAsync"
            />
            <template v-else>
              <!-- v-if="totalProgress < 100" -->
              <div
                v-if="
                  totalProgress < 100 ||
                  !chainOfEvidenceReportsList?.length
                "
                class="conclusions-outline"
              >
                <div class="conclusions-empty">
                  <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                  <span v-if="totalProgress < 100">分析完成后可查看，敬请期待~</span>
                  <span v-else>请直接查看右侧文件列表，了解相关节点内容~</span>
                </div>
              </div>
              <ConclusionsSummary
                v-else
                :data="chainOfEvidenceReportsList"
                :title="chainOfEvidenceReportsTitle"
                :tab="curTab"
                :isUserClick="isUserClickFlag"
                :instanceCode="instanceCode"
                :emptyDataClick="emptyDataClick"
                :filePhasedResults="detailInfo.filePhasedResults"
                @node-active-change="curTab = $event"
                @load-node-data="handleLoadNodeData"
                @click-change="isUserClickFlag = $event"
              />
            </template>
          </div>
        </div>
      </div>

      <!-- Drag Resize Handle -->
      <!-- <el-tooltip content="调整面板大小" placement="right"> -->
      <div
        v-if="!rightPanelCollapsed"
        class="resize-handle"
        @mousedown="startResize"
        @mouseenter="isHoveringHandle = true"
        @mouseleave="isHoveringHandle = false"
        :class="{ hovering: isHoveringHandle, dragging: isDragging }"
      ></div>
      <!-- </el-tooltip> -->
      <!-- Right Tabbed Panel -->
      <div
        v-if="!rightPanelCollapsed"
        class="right-column"
        :class="{ fullscreen: isRightFullscreen }"
        :style="{ width: rightPanelWidth + 'px' }"
      >
        <div class="tab-header">
          <el-tabs v-model="activeTab" class="custom-tabs">
            <el-tab-pane v-if="detailInfo?.detail?.status === 2" label="分析报告" name="ppt" />
            <el-tab-pane
              label="文件"
              name="document"
              v-if="detailInfo?.filePhasedResults.length > 0"
            />
            <el-tab-pane label="浏览器" name="browser" />
          </el-tabs>
          <div class="tab-actions">
            <el-tooltip v-if="!isRightFullscreen" content="全屏查看" placement="top">
              <i
                @click="toggleFullscreen"
                class="iconfont icon-quanping cursor-pointer header-icon"
              ></i>
            </el-tooltip>
            <el-tooltip v-else content="退出全屏" placement="top">
              <i
                @click="toggleFullscreen"
                class="iconfont icon-shouqiquanping cursor-pointer header-icon"
              ></i>
            </el-tooltip>
            <div v-if="!isRightFullscreen" class="divider"></div>
            <el-tooltip v-if="!isRightFullscreen" content="关闭" placement="top">
              <i
                @click="closeRightPanel"
                class="iconfont icon-guanbi cursor-pointer header-icon"
              ></i>
            </el-tooltip>
          </div>
        </div>
        <div class="tab-content">
          <div v-if="activeTab === 'browser'" class="browser-tab-content">
            <!-- <BrowserSearchHistory
            v-if="!showBrowserResult"
            @record-click="handleBrowserRecordClick"
          /> -->
            <BrowserSearchResult
              :search-title="selectedSearchRecord?.title"
              :resultList="detailInfo?.browserPhasedResults"
              :instanceCode="instanceCode"
              @back="handleBrowserBack"
            />
          </div>
          <div v-else-if="activeTab === 'document'" class="document-tab-content">
            <FileList
              v-if="!showFileViewer"
              :fileList="detailInfo?.filePhasedResults"
              :instanceCode="instanceCode"
              @file-click="handleFileClick"
            />
            <FileViewer
              v-else
              :document-title="selectedFile?.name"
              :node-execution-id="selectedFile?.nodeExecutionId"
              :ext="selectedFile?.ext"
              :instanceCode="instanceCode"
              @back="handleFileBack"
            />
          </div>

          <div v-else-if="activeTab === 'ppt'" class="ppt-content">
            <div class="ppt-content-header">
              <div class="title">{{ title }}</div>
              <div class="right">
                <div class="menu-item" @click="handleExportPPTX(slides)">
                  <el-tooltip content="下载" placement="top">
                    <i class="iconfont icon-xiazai"></i>
                  </el-tooltip>
                </div>
                <div class="menu-item" @click="sharePPT">
                  <el-tooltip content="分享" placement="top">
                    <i class="Root-tyicon icon-Root-tyfenxiang"></i>
                  </el-tooltip>
                </div>
                <div class="menu-item" @click="toEdit">
                  <el-tooltip content="编辑" placement="top">
                    <i class="iconfont icon-bianji"></i>
                  </el-tooltip>
                </div>
                <Divider type="vertical" style="height: 16px" />
                <el-tooltip content="演示" placement="top">
                  <div class="menu-item-play" @click="enterScreeningFromStart()">
                    <i class="Root-tyicon icon-Root-tyyanshi"></i>
                    <span class="play">演示</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <div class="slides" v-loading="pptLoading">
              <ThumbnailSlide
                class="slide-item"
                v-for="item in slides"
                :key="item.id"
                :slide="item"
                :size="slideWidth"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="newProductAnalysisDetail">
  import { newProductApi } from '@/api';
  import dayjs from 'dayjs';
  import { secondsToDigitalFormat } from '@/utils/time';
  import { ElMessage, ElNotification } from 'element-plus';
  import ManualbackIcon from '@/views/newProductAnalysis/components/manualbackIcon.vue';
  import { storeToRefs } from 'pinia';
  import { useScreenStore, useSlidesStore } from '@/store/modules';
  import { onMounted } from 'vue';
  import { useStore } from '@/store/modules/useStore';
  import Divider from '@/components/PPTist/components/Divider.vue';
  import useExport from '@/components/PPTist/hooks/useExport';
  import useScreening from '@/components/PPTist/hooks/useScreening';
  import { copyFn } from '@/utils/copyFn';
  import FlowChart from './components/FlowChart/index.vue';
  import ConclusionsSummary from './components/ConclusionsSummary/index.vue';
  import BrowserSearchResult from './components/BrowserSearchResult.vue';
  import FileList from './components/FileList.vue';
  import FileViewer from './components/FileViewer.vue';
  import { useReport } from './hooks/useReport';
  import Empty from './components/Empty.vue';
  // import MarkdownViewer from './components/MarkdownViewer.vue';

  const { report } = useReport();
  const slidesStore = useSlidesStore();
  // const { title } = storeToRefs(slidesStore);
  const { screening } = storeToRefs(useScreenStore());
  const router = useRouter();
  const { exportPPTX, exporting } = useExport();
  const { enterScreening, enterScreeningFromStart } = useScreening();

  const store = useStore();

  const colorMap = {
    succeeded: '#02B96B',
    running: '#258DFF',
    pending: 'var(---N6)',
    failed: '#f53f3f',
    stoped: '#f53f3f',
  };

  const bgColorMap = {
    succeeded: '#eff9f6',
    running: '#eff8ff',
    pending: '#ebebeb',
    failed: '#fef2f2',
    exception: '#fff7ee',
  };

  const iconMap = {
    succeeded: 'icon-chenggongzhuangtai',
    running: 'icon-shujutongbu1',
    pending: 'icon-shijian',
    failed: 'icon-cuowuzhuangtai',
    exception: 'icon-zhuyizhuangtai',
  };

  // AI工作流节点标题到图标文件名的映射
  const titleToIconMap: Record<string, string> = {
    IRB市场分析: 'shichangfenxi',
    IRB用户分析: 'yonghufenxi',
    IRB竞品综合分析: 'jingpinfenxi',
    IRB产品定位策略: 'chanpindingweicelue',
    IRB营销4P策略: 'yingxiao4pcelue',
    IRB整合营销策略: 'zhengheyingxiaocelue',
    用户购买转化: 'yonghugoumaizhuanhua',
    新品分析报告生成: 'baogaoshengcheng',
  };

  // 根据节点标题获取图标样式
  const getNodeIconStyle = (title: string) => {
    // 提取标题的核心部分（去除可能的编号前缀）
    const cleanTitle = title?.replace(/^\d+[.-]\s*/, '') || '';

    // 查找匹配的图标名称
    const iconName = titleToIconMap[cleanTitle] || 'baogaoshengcheng';

    if (iconName) {
      const iconPath = new URL(`./assets/images/icon-flow-${iconName}.png`, import.meta.url).href;
      return {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        backgroundImage: `url(${iconPath})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        flexShrink: 0,
      };
    }
  };

  const route = useRoute();
  const detailInfo = ref();
  const instanceCode = route.query?.instanceCode as string;
  const isCompleted = route.query?.isCompleted as string;
  const showDeedBack = ref(true);

  const curTab = ref();
  const timer = ref<ReturnType<typeof setTimeout> | null>(null);
  const slides = ref([]);
  const title = ref('');
  const projectId = ref();
  const isDetailTabActive = ref(true);
  let hasActivatedOnce = false;
  const clearDetailTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
  };
  const queryDetail = async (first = false) => {
    clearDetailTimer();

    const res = await newProductApi.luteosAiNpoProjectState({
      instanceCode,
    });

    if (!isDetailTabActive.value) return;

    detailInfo.value = res;
    // 重置左侧收缩展开状态
    hideIndex.value = {};
    if (detailInfo.value?.detail?.status === 2) {
      // 提取项目ID
      const previewUrl = detailInfo.value?.filePhasedResults?.[0]?.previewUrl;
      projectId.value = previewUrl ? previewUrl.match(/\/(\d+)\/?$/)?.[1] : null;

      // 在 title 设置完成后再切换 tab，确保埋点能获取到正确的 title
      activeTab.value = 'ppt';
      queryPPT();
    }
    detailInfo.value?.workflowNodes?.forEach((item, index) => {
      const childNodeList = detailInfo.value?.nodeExecutions?.filter((node) =>
        node?.name?.includes(item?.data?.title)
      );

      if (childNodeList?.length > 0) {
        if (childNodeList?.find((node) => node?.status === 'failed')) {
          item.nodeInfo = { status: 'failed', statusDesc: '运行失败' };
        } else if (childNodeList?.find((node) => node?.status === 'running')) {
          item.nodeInfo = { status: 'running', statusDesc: '运行中' };
        } else {
          item.nodeInfo = { status: 'succeeded', statusDesc: '已完成' };
        }
      } else {
        item.nodeInfo = { status: 'pending', statusDesc: '等待中' };
      }

      // 将nodeExecutions子节点的 status 写入workflowNodes[index].children[i].status
      item.children?.forEach((child, i) => {
        const childNode = detailInfo.value?.nodeExecutions?.find(
          (node) => node?.nodeId === child?.id
        );
        if (childNode) {
          child.status = childNode?.status;
        }
      });

      // 证据链的节点隐藏且子节点调整到上一个节点的children内
      if (item.data.title.includes('证据链')) {
        const isExist = detailInfo.value?.workflowNodes[index - 1]?.children.some(
          (existItem) => existItem.id === item.children[0].id
        );
        if (!isExist) {
          detailInfo.value?.workflowNodes[index - 1]?.children.push(item.children[0]);
        }
      }
    });

    if (first && detailInfo.value?.nodeExecutions?.length > 0) {
      // 判断工作流状态，决定默认点击哪个节点
      if (detailInfo.value?.detail?.status === 2) {
        // 工作流已完成，点击第一个有证据链的节点
        initializeNodeList();
        preloadAllCompletedNodes();
      } else {
        // 工作流进行中，点击正在运行的节点
        const runningNode = detailInfo.value?.workflowNodes?.find(
          (item) => item?.nodeInfo?.status === 'running'
        );
        if (runningNode) {
          curTab.value = runningNode?.data?.title?.replace('证据链', '');
          handleClick(runningNode, false); // 自动点击，不上报埋点
        } else {
          // 如果没有正在运行的节点，点击最后一个有数据的节点
          const lastTab =
            detailInfo.value?.nodeExecutions[detailInfo.value?.nodeExecutions?.length - 1];
          curTab.value = lastTab?.name?.split('-')[0]?.replace('证据链', '');
          handleClick(
            detailInfo.value?.workflowNodes?.find((item) => item?.data?.title === curTab.value),
            false // 自动点击，不上报埋点
          );
        }
      }
    }

    if (res?.state?.status === 'running' || !res?.state) {
      timer.value = setTimeout(() => {
        queryDetail();

        if (res?.detail?.status === 4) {
          gettingStateNew();
        }
      }, 10000);
    }
  };
  const gettingStateNew = async () => {
    const res = await newProductApi.luteosAiNpoProjectGettingDataState({
      instanceCode,
    });

    // console.log('数据获取中新加的接口GettingDataState res ====>', res);
  };

  onActivated(() => {
    isDetailTabActive.value = true;
    if (
      hasActivatedOnce &&
      (!detailInfo.value ||
        detailInfo.value?.state?.status === 'running' ||
        !detailInfo.value?.state)
    ) {
      queryDetail();
    }
    hasActivatedOnce = true;
    queryPPT();
  });

  onDeactivated(() => {
    isDetailTabActive.value = false;
    clearDetailTimer();
  });

  const resultInfo = ref();
  const flowInfo = ref();
  const isAsync = ref(false);
  const flowChartRef = ref(); // FlowChart 组件引用
  const currentRawFlowData = ref(); // 存储当前的原始 flowData，用于状态更新

  // 转换后端数据格式为 FlowChart 组件所需格式
  const transformFlowData = (rawData: any) => {
    if (!rawData?.nodes || !Array.isArray(rawData.nodes)) {
      return { nodes: [], edges: [] };
    }

    // console.log('原始数据 rawData:', rawData);

    const allNodes = rawData.nodes;
    const transformedNodes: any[] = [];

    allNodes.forEach((parentNode, index) => {
      // 根据 parentNode.data?.label 查找对应的 nodeExecutions 项获取 status
      const matchedExecution = detailInfo.value?.nodeExecutions?.find((execution) => {
        if (execution?.name.includes('-'))
          return execution?.name.split('-')[1] === parentNode.data?.title;
        return execution?.name === parentNode.data?.title;
      });
      const nodeStatus = matchedExecution?.status;

      // 构建节点
      const newNode = {
        id: parentNode.id,
        data: {
          title: parentNode.data?.title,
          // icon: parentNode.data?.icon,
          iconBg: parentNode.data?.iconBg || '#3b82f6',
          status: nodeStatus,
          items: parentNode.data.items,
        },
      };

      transformedNodes.push(newNode);
    });

    return {
      nodes: transformedNodes,
      edges: rawData.edges,
    };
  };

  const chainOfEvidenceReportsList = ref<any[]>([]);
  const chainOfEvidenceReportsTitle = ref('');
  const isUserClickFlag = ref(false); // 用于区分是否是用户点击导致的节点切换
  const emptyDataClick = ref(false); // 用于标记是否点击了空数据的节点
  const handleClick = async (item, isUserClick = true, setActive = true) => {
    if (!item || item.nodeInfo?.status === 'pending') return;
    isUserClickFlag.value = isUserClick;
    const existingNode = chainOfEvidenceReportsList.value.find((n) => n.nodeId === item.id);
    if(existingNode && !existingNode.data && existingNode.nodeExecutions?.length && !isUserClick) return;
    if(existingNode && !existingNode.data && isUserClick) {
      emptyDataClick.value = true; // 点击了有数据的节点，重置标记
      curTab.value = item?.data?.title.replace('证据链', '');
      return;
    }
    if (existingNode && existingNode.data) {
      if (setActive) {
        curTab.value = item?.data?.title.replace('证据链', '');
        chainOfEvidenceReportsTitle.value = item.data.title;
      }

      // 恢复缓存的推理路径数据
      resultInfo.value = existingNode.nodeExecutions;
      const rawFlowData = existingNode.processJson ? JSON.parse(existingNode.processJson) : null;
      currentRawFlowData.value = rawFlowData;
      if (rawFlowData) {
        flowInfo.value = transformFlowData(rawFlowData);
      } else {
        flowInfo.value = null;
      }

      if (isUserClick) {
        if(leftTab.value === 'conclusions') {
          emptyDataClick.value = existingNode && !existingNode?.data; // 点击了有数据的节点，重置标记
          nextTick(() => {
            const summaryContainer = document.querySelector('.conclusion-summary');
            const targetEl = document.getElementById(`node-${item.id}`);
            if (summaryContainer && targetEl) {
              const top = targetEl.offsetTop - 82;
              summaryContainer.scrollTo({ top });
            }
          });
        }
        report('click_node_card', {
          node_name: item?.data?.title,
          task_id: instanceCode,
        });
      }
      return;
    }

    isAsync.value = item?.nodeInfo?.status === 'running';
    if (setActive) {
      curTab.value = item?.data?.title.replace('证据链', '');
    }

    const res = await newProductApi.luteosAiNpoProjectNodeState({
      instanceCode,
      nodeTitlePrefix: item?.data?.title?.split('-')?.[0],
    });

    resultInfo.value = res?.nodeExecutions;

    const existingNodeIndex = chainOfEvidenceReportsList.value.findIndex(
      (n) => n.nodeId === item.id
    );
    if (existingNodeIndex > -1) {
      // 存储推理路径数据到缓存中
      chainOfEvidenceReportsList.value[existingNodeIndex].nodeExecutions = res?.nodeExecutions;
      chainOfEvidenceReportsList.value[existingNodeIndex].processJson = res?.processJson;

      if (res?.conclusionResult) {
        !curTab.value && (curTab.value = item?.data?.title.replace('证据链', ''));
        chainOfEvidenceReportsList.value[existingNodeIndex].data = res.conclusionResult;
      }else {
        if(existingNodeIndex + 1 == chainOfEvidenceReportsList.value.length && !curTab.value) {
          curTab.value = item?.data?.title.replace('证据链', '');
          emptyDataClick.value = true;
        }
      }
    }

    chainOfEvidenceReportsTitle.value = item.data.title;

    const rawFlowData = res?.processJson ? JSON.parse(res.processJson) : null;
    currentRawFlowData.value = rawFlowData;
    if (rawFlowData) {
      flowInfo.value = transformFlowData(rawFlowData);
    } else {
      flowInfo.value = null;
    }

    if (isUserClick) {
      nextTick(() => {
        if (leftTab.value === 'conclusions') {
          const summaryContainer = document.querySelector('.conclusion-summary');
          const targetEl = document.getElementById(`node-${item.id}`);
          if (summaryContainer && targetEl) {
            const top = targetEl.offsetTop - 82;
            summaryContainer.scrollTo({ top });
          }
        }
      });
      report('click_node_card', {
        node_name: item?.data?.title,
        task_id: instanceCode,
      });
    }
  };

  const handleLoadNodeData = (nodeId: string) => {
    const nodeToLoad = detailInfo.value.workflowNodes.find((n) => n.id === nodeId);
    if (nodeToLoad) {
      handleClick(nodeToLoad, false);
    }
  };

  const initializeNodeList = () => {
    if (!detailInfo.value?.workflowNodes) return;
    const nodes = detailInfo.value.workflowNodes
      .filter((node) => !node.data.title.includes('证据链') && node.nodeInfo?.status !== 'pending')
      .map((node) => ({
        title: node.data.title,
        nodeId: node.id,
        data: null, // Initially no data
      }));
    chainOfEvidenceReportsList.value = nodes;
  };

  const preloadAllCompletedNodes = async () => {
    if (!detailInfo.value?.workflowNodes) return;
    const nodesToLoad = detailInfo.value.workflowNodes.filter(
      (node) => node?.nodeInfo?.status === 'succeeded' && !node.data.title.includes('证据链')
    );
    for (const node of nodesToLoad) {
      await handleClick(node, false, false); // 预加载
    }
  };

  // 左侧收缩 展开逻辑
  const hideIndex = ref<{ [key: string]: boolean }>({});
  const handleClickCollpase = (node) => {
    hideIndex.value[node.id] = !hideIndex.value[node.id];
  };

  // Load node children (auto-expand all nodes)
  const loadNodeChildren = async (index: number, node: any) => {
    if (node?.nodeInfo?.status === 'pending') return;

    // Load child nodes if not already loaded
    if (!nodeChildren.value[index]) {
      isAsync.value = node?.nodeInfo?.status === 'running';
      curTab.value = node?.data?.title?.replace('证据链', '');
      const res = await newProductApi.luteosAiNpoProjectNodeState({
        instanceCode,
        nodeTitlePrefix: node?.data?.title?.split('-')?.[0],
      });
      nodeChildren.value[index] = res?.nodeExecutions || [];

      // 转换数据格式后再赋值给 flowInfo
      const rawFlowData = res?.processJson ? JSON.parse(res?.processJson) : null;
      // console.log('=== rawFlowData ===', rawFlowData);

      // 存储原始 flowData
      currentRawFlowData.value = rawFlowData;

      if (rawFlowData) {
        flowInfo.value = transformFlowData(rawFlowData);
      } else {
        flowInfo.value = null;
      }
    }
  };

  // Auto-load all node children on mount
  const autoLoadAllNodes = async () => {
    if (!detailInfo.value?.workflowNodes) return;

    for (let i = 0; i < detailInfo.value.workflowNodes.length; i++) {
      const node = detailInfo.value.workflowNodes[i];
      if (node?.nodeInfo?.status !== 'pending') {
        await loadNodeChildren(i, node);
      }
    }
  };

  // Select child node
  const selectChildNode = async (parentIndex: number, childIndex: number, child: any) => {
    // 获取被点击子节点的父节点
    const parentNode = detailInfo.value?.workflowNodes?.[parentIndex];
    const parentNodeTitle = parentNode?.data?.title;

    // 检查当前中间栏显示的节点是否是被点击子节点的父节点
    const isCurrentParent = curTab.value === parentNodeTitle;

    if (!isCurrentParent) {
      // 如果不是当前父节点，先切换到对应的父节点（非用户主动点击，不上报埋点）
      await handleClick(parentNode, false);

      // 等待 Vue 响应式更新和 FlowChart 组件渲染完成
      await nextTick();
    }

    // 设置激活的子节点
    activeChildNode.value = `${parentIndex}-${childIndex}`;

    // 根据 child.data.title 滚动到中间栏对应的节点并居中
    const nodeTitle = child?.data?.title;
    if (nodeTitle && flowChartRef.value) {
      // 如果刚刚切换了父节点，添加小延迟确保渲染完成
      if (!isCurrentParent) {
        setTimeout(() => {
          if (flowChartRef.value) {
            flowChartRef.value.scrollToNode(nodeTitle);
          }
        }, 200);
      } else {
        // 当前父节点，直接滚动
        nextTick(() => {
          flowChartRef.value.scrollToNode(nodeTitle);
        });
      }
    }

    // 只上报子节点的点击埋点
    report('click_node_card', {
      node_name: child?.data?.title,
      task_id: instanceCode,
    });
  };

  const totalProgress = computed(() => {
    return (
      Math.round(
        (detailInfo.value?.nodeExecutions?.filter((item) =>
          detailInfo.value?.workflowNodes?.find(
            (k) => k?.id === item?.nodeId && item?.status !== 'running'
          )
        )?.length /
          detailInfo.value?.workflowNodes?.length) *
          100
      ) || 0
    );
  });

  const pptLoading = ref(false);
  const queryPPT = async () => {
    if (projectId.value) {
      try {
        pptLoading.value = true;
        slidesStore.setProjectId(projectId.value);
        const pptInfo = await newProductApi.luteosAiNpoProjectGetPptInfo({
          projectId: projectId.value,
        });
        const pptData = pptInfo?.data;
        slides.value = pptData?.slides || [];
        title.value = pptData?.title;

        slidesStore.setProjectId(projectId.value);
        slidesStore.setSlides(slides.value);
        slidesStore.setTitle(title.value);
      } finally {
        pptLoading.value = false;
      }
    }
  };

  const handleItemClick = (item: any) => {
    queryPPT(item?.id);
  };

  // 失败重试
  const loading = ref(false);
  const retry = async () => {
    try {
      loading.value = true;
      const res = await newProductApi.luteosAiNpoWorkflowRun({
        instanceCode,
        mode: 1,
        inputs: detailInfo.value?.detail?.inputVariables,
      });
      setTimeout(() => {
        queryDetail(true);
        loading.value = false;
      }, 1000);
    } catch (e) {
      loading.value = false;
    }

    report('click_retry_workflow', {
      task_id: instanceCode,
    });
  };

  const nodeListRef = ref();
  const nodeListTop = ref(0);

  onMounted(async () => {
    nodeListTop.value = nodeListRef.value?.getBoundingClientRect().top;

    setTimeout(() => {
      if (detailInfo.value?.state?.status === 'running') {
        report('page_view_workflow_running', {
          task_id: instanceCode,
        });
      }
    }, 1000);
  });

  const pptHeight = computed(() => {
    return document.body.clientHeight - nodeListTop.value;
  });

  // Two-column layout state management (merged left + middle)
  const leftPanelCollapsed = ref(false);
  const rightPanelCollapsed = ref(false);
  const rightPanelWidth = ref(500);
  const activeTab = ref('document');
  const activeMenuItem = ref('0');
  const isHoveringHandle = ref(false);
  const isDragging = ref(false);
  const dragStartX = ref(0);
  const dragStartWidth = ref(0);
  const activeChildNode = ref<string>('');
  const nodeChildren = ref<Record<number, any[]>>({});
  const leftTab = ref('conclusions');
  const leftTabsList = [
    { label: '结论概要', value: 'conclusions' },
    { label: '推理路径', value: 'inference' },
  ];

  // 展开左侧栏提示状态管理
  const showExpandTip = ref(false);
  const EXPAND_TIP_STORAGE_KEY = 'workflow_expand_tip_dismissed';

  // 展开右侧栏提示状态管理
  const showRightExpandTip = ref(false);
  const RIGHT_EXPAND_TIP_STORAGE_KEY = 'right_panel_expand_tip_dismissed';

  // 检查是否已经关闭过提示
  const hasSeenExpandTip = () => {
    return localStorage.getItem(EXPAND_TIP_STORAGE_KEY) === 'true';
  };

  const hasSeenRightExpandTip = () => {
    return localStorage.getItem(RIGHT_EXPAND_TIP_STORAGE_KEY) === 'true';
  };

  // 关闭提示
  const closeExpandTip = () => {
    showExpandTip.value = false;
    localStorage.setItem(EXPAND_TIP_STORAGE_KEY, 'true');
  };

  const closeRightExpandTip = () => {
    showRightExpandTip.value = false;
    localStorage.setItem(RIGHT_EXPAND_TIP_STORAGE_KEY, 'true');
  };

  // 监听左侧栏折叠状态
  watch(leftPanelCollapsed, (newVal) => {
    if (newVal && !hasSeenExpandTip()) {
      // 首次收起时显示提示
      showExpandTip.value = true;
    }
  });

  // 监听右侧栏折叠状态
  watch(rightPanelCollapsed, (newVal) => {
    if (newVal) {
      // 关闭右侧栏时，如果当前在 ppt tab，上报停留时长
      if (activeTab.value === 'ppt') {
        reportPptDuration();
      }

      // 首次关闭时显示提示
      if (!hasSeenRightExpandTip()) {
        showRightExpandTip.value = true;
      }
    } else {
      // 打开右侧栏时，如果当前在 ppt tab，重新触发查看埋点并记录开始时间
      if (activeTab.value === 'ppt') {
        report('page_view_result', {
          task_id: instanceCode,
          file_type: 'ppt',
          file_name: title.value,
        });
        pptTabStartTime.value = Date.now();
      }
    }
  });

  // PPT tab 停留时长统计
  const pptTabStartTime = ref<number>(0);
  const reportPptDuration = () => {
    if (pptTabStartTime.value > 0) {
      const duration = Date.now() - pptTabStartTime.value;
      report('analysis_result_stay_duration', {
        task_id: instanceCode,
        file_name: title.value,
        duration_s: Math.round(duration / 1000),
      });
      pptTabStartTime.value = 0;
    }
  };

  // 监听 PPT tab 显示，统计埋点和停留时长
  watch(activeTab, (newVal, oldVal) => {
    // 当切换到 ppt tab 时
    if (newVal === 'ppt') {
      // 上报页面查看埋点
      report('page_view_result', {
        task_id: instanceCode,
        file_type: 'ppt',
        file_name: title.value,
      });
      // 记录进入时间
      pptTabStartTime.value = Date.now();
    }
    // 当从 ppt tab 切换到其他 tab 时
    else if (oldVal === 'ppt') {
      // 上报停留时长
      reportPptDuration();
    }
  });

  // Fullscreen state management
  const isMiddleFullscreen = ref(false);
  const isRightFullscreen = ref(false);
  const savedRightPanelCollapsed = ref(false);

  // Browser tab state
  const showBrowserResult = ref(false);
  const selectedSearchRecord = ref<any>(null);

  const handleBrowserRecordClick = (record: any) => {
    selectedSearchRecord.value = record;
    showBrowserResult.value = true;
  };

  const handleBrowserBack = () => {
    showBrowserResult.value = false;
    selectedSearchRecord.value = null;
  };

  const toEdit = () => {
    const { memberCode } = store.userInfo;
    const creator = detailInfo.value?.detail?.creator;
    // const superAdmin = store.userInfo.superAdmin;

    if (memberCode !== creator) {
      ElMessage({ message: '暂无权限', type: 'warning', grouping: true });
      return;
    }

    if (slides.value?.length) {
      slidesStore.updateSlideIndex(0);
      router.push({
        path: '/newProductAnalysis/ppt',
        query: {
          projectId: projectId.value,
        },
      });
    } else {
      ElMessage.warning('ppt内容生成异常，暂时无法编辑');
    }
  };

  const sharePPT = () => {
    const path = router.resolve({
      name: 'newProductAnalysisPPT',
      query: { shareId: projectId.value },
    });
    copyFn(`${window.location.origin}${path.href}`, '链接');

    report('click_share_result', {
      task_id: instanceCode,
      file_name: title.value,
    });
  };

  const handleExportPPTX = (slides) => {
    exportPPTX(slides, false, false);

    report('click_download_report', {
      task_id: instanceCode,
      file_name: title.value,
    });
  };

  // File tab state
  const showFileViewer = ref(false);
  const selectedFile = ref<any>(null);

  const handleFileClick = async (file: any) => {
    if (file.ext?.includes('html')) {
      // 打开ppt
      if (file.previewUrl) {
        window.open(file.previewUrl);
      } else {
        ElMessage({
          message: '当前链接不可用，请稍后再试',
          grouping: true,
          type: 'warning',
        });
      }

      return;
    }

    selectedFile.value = file;
    showFileViewer.value = true;
  };

  const handleFileBack = () => {
    showFileViewer.value = false;
    selectedFile.value = null;
  };

  // Drag resize functionality
  const startResize = (e: MouseEvent) => {
    isDragging.value = true;
    dragStartX.value = e.clientX;
    dragStartWidth.value = rightPanelWidth.value;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    e.preventDefault();
  };

  const handleResize = (e: MouseEvent) => {
    if (!isDragging.value) return;
    const containerWidth = document.querySelector('.three-column-layout')?.clientWidth || 0;
    const deltaX = dragStartX.value - e.clientX;
    const newWidth = Math.max(500, Math.min(containerWidth - 810, dragStartWidth.value + deltaX));
    rightPanelWidth.value = newWidth;
  };

  const stopResize = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  const toggleFullscreen = () => {
    if (isRightFullscreen.value) {
      // 退出右侧栏全屏
      isRightFullscreen.value = false;
    } else {
      // 进入右侧栏全屏
      isRightFullscreen.value = true;
    }
  };

  const closeRightPanel = () => {
    rightPanelCollapsed.value = true;
  };

  const handleOpenRightPanel = () => {
    rightPanelCollapsed.value = false;
    // 点击展开按钮后，立即隐藏提示并记录
    if (showRightExpandTip.value) {
      closeRightExpandTip();
    }
  };

  const handleExpandLeftPanel = () => {
    leftPanelCollapsed.value = false;
    // 点击展开按钮后，立即隐藏提示并记录
    if (showExpandTip.value) {
      closeExpandTip();
    }
  };

  const toggleMiddleFullscreen = () => {
    if (isMiddleFullscreen.value) {
      // 退出中间栏全屏
      isMiddleFullscreen.value = false;
      rightPanelCollapsed.value = savedRightPanelCollapsed.value;
    } else {
      // 进入中间栏全屏
      isMiddleFullscreen.value = true;
      savedRightPanelCollapsed.value = rightPanelCollapsed.value;
      rightPanelCollapsed.value = true;
    }
  };

  // 监听 detailInfo.nodeExecutions 的变化，实时更新 FlowChart 节点状态
  watch(
    () => detailInfo.value?.nodeExecutions,
    (newExecutions) => {
      // 只有在当前有 flowChartRef 且有显示的流程图时才更新
      if (flowChartRef.value && flowInfo.value) {

        // 构建标题到状态的映射
        const nodeStatusMap: Record<string, string> = {};
        newExecutions?.forEach((execution) => {
          if (execution?.name) {
            // 处理带 '-' 的名称，提取真实标题
            const title = execution.name.includes('-')
              ? execution.name.split('-')[1]
              : execution.name;
            if (title && execution.status) {
              nodeStatusMap[title] = execution.status;
            }
          }
        });

        // 调用 FlowChart 的 updateNodeStatus 方法只更新状态
        flowChartRef.value.updateNodeStatus(nodeStatusMap);
      }
    },
    { deep: true }
  );

  const slideWidth = ref(400);
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    queryDetail(true);

    // 创建 ResizeObserver 来监听元素尺寸变化
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.classList.contains('ppt-content')) {
          slideWidth.value = entry.contentRect.width || 400;
        }
      }
    });

    // 观察 ppt-content 元素
    const pptElement = document.querySelector('.ppt-content');
    if (pptElement) {
      resizeObserver.observe(pptElement);
    }
  });

  // 监听 screening 状态变化，当退出全屏时重新计算 slideWidth
  watch(screening, (newScreening) => {
    if (!newScreening) {
      // 当 screening 变为 false 时（退出全屏）
      nextTick(() => {
        const pptElement = document.querySelector('.ppt-content');
        if (pptElement && resizeObserver) {
          resizeObserver.observe(pptElement);
          slideWidth.value = pptElement.clientWidth || 400;
        }
      });
    }
  });

  // 监听 tab 切换，当切换到 ppt tab 时重新获取元素并观察
  watch(activeTab, (newTab) => {
    if (newTab === 'ppt') {
      nextTick(() => {
        const pptElement = document.querySelector('.ppt-content');
        if (pptElement && resizeObserver) {
          resizeObserver.observe(pptElement);
          slideWidth.value = pptElement.clientWidth || 400;
        }
      });
    }
  });

  onActivated(() => {
    if (detailInfo.value?.state?.status === 'running') {
      report('page_view_workflow_running', {
        task_id: instanceCode,
      });
    }
  });

  // 组件卸载前，如果还在 ppt tab，上报停留时长
  onBeforeUnmount(() => {
    isDetailTabActive.value = false;
    clearDetailTimer();

    if (activeTab.value === 'ppt') {
      reportPptDuration();
    }

    // 清理 ResizeObserver
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

  // 工作流分享
  const handlePageShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    ElNotification({
      title: '成功',
      message: '链接已复制，请分享',
      type: 'success',
      duration: 2000,
    });

    report('click_share_workflow', {
      task_id: instanceCode,
    });
  };
</script>

 <style scoped lang="scss">
  .header-icon {
    font-size: 16px;
    color: var(---N8);
  }
  /* Flow Top Styles */
  .flow-top {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background-color: #ffffff;
    // margin-bottom: 16px;

    .flow-top-tag {
      padding: 0 6px;
      line-height: 20px;
      border-radius: 4px;
      color: var(---N9, #262626);
      background: var(---N2, #f4f5f5);
      &.failed {
        color: var(---C7);
        background: var(---l7, #ffeeeb);
      }
      &.running {
        color: var(---C2, #258dff);
        background: var(---l2, #e8f4ff);
      }
      &.succeeded {
        color: var(---C4, var(---C4, #02b96b));
        background: var(---l4, #f0fff6);
      }
    }

    .flow-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: var(---N9);
      letter-spacing: 1px;
    }

    :deep(.el-progress) {
      width: 255px;
      flex-shrink: 0;

      .el-progress-bar__outer {
        height: 6px !important;
      }

      .el-progress-bar__inner {
        height: 6px !important;
      }
    }

    .times {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left: auto;
      font-size: 12px;
      color: var(---N6);

      span {
        display: flex;
        align-items: center;
        gap: 4px;

        icon-Root,
        .Root-tyicon {
          font-size: 16px;
        }
      }
    }
    .page-share {
      cursor: pointer;
      color: var(---N8);
      .iconfont,
      .Root-tyicon {
        font-size: 16px;
      }
    }
  }

  .icon-chenggongzhuangtai {
    color: var(--el-color-primary);
  }

  .icon-cuowuzhuangtai {
    color: var(--el-color-danger);
  }

  .icon-zhuyizhuangtai {
    color: var(--el-color-warning);
  }

  .icon-shujutongbu1 {
    color: #258dff;
  }

  /* Common divider style */
  .divider {
    width: 1px;
    height: 16px;
    background-color: var(---N3);
    margin: 0 4px;
  }

  /* Two-Column Layout Styles (Merged Left + Middle) */
  .three-column-layout {
    display: flex;
    width: 100%;
    height: calc(100vh - 145px);
    background-color: var(---N1);
    position: relative;
    gap: 0;
    padding: 16px;
  }

  /* Merged Left + Middle Column */
  .merged-left-middle-column {
    flex: 1;
    display: flex;
    gap: 0;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2000;
      border-radius: 0;
    }

    /* Expand Button (shown when left panel collapsed, inside merged column) */
    .expand-left-button {
      position: absolute;
      top: 14px;
      left: 20px;
      z-index: 200;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      color: var(---N8);
      .iconfont,
      .Root-tyicon {
        font-size: 18px;
      }
    }
  }

  @keyframes slideInTop {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 通用提示框样式 */
  .expand-tip {
    .expand-tip-content {
      background: rgba(0, 0, 0, 0.75);
      color: #ffffff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 8px;

      .expand-tip-text {
        line-height: 20px;
      }

      .expand-tip-close {
        font-size: 12px;
        cursor: pointer;
        transition: opacity 0.2s;
        flex-shrink: 0;

        &:hover {
          opacity: 1;
        }
      }
    }

    .expand-tip-arrow {
      position: absolute;
      width: 0;
      height: 0;
    }

    /* 上方提示框（箭头向下） */
    &:not(.expand-tip-right) {
      position: absolute;
      bottom: calc(100% + 12px);
      left: -8px;
      z-index: 300;
      animation: slideInTop 0.3s ease-out;

      .expand-tip-arrow {
        left: 14px;
        bottom: -6px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(0, 0, 0, 0.75);
      }
    }

    /* 右侧提示框（箭头向右） */
    &.expand-tip-right {
      position: absolute;
      bottom: calc(100% + 12px);
      right: -8px;
      z-index: 300;
      animation: slideInTop 0.3s ease-out;

      .expand-tip-arrow {
        right: 8px;
        bottom: -6px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(0, 0, 0, 0.75);
      }
    }
  }

  /* Left Navigation Panel (inside merged column) */
  .left-navigation-panel {
    width: 220px;
    flex-shrink: 0;
    border-right: 1px solid #e4e7ed;
    border-top-left-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.collapsed {
      width: 0;
      border-right: none;
    }

    .workflow-menu {
      height: 100%;
      display: flex;
      flex-direction: column;

      .workflow-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 10px;
        line-height: 24px;
        font-size: 16px;
        font-weight: 600;
        font-family: 'PingFang SC';
        letter-spacing: 1px;
        flex-shrink: 0;
        background-color: #ffffff;
        z-index: 1;
      }

      .workflow-title {
        flex: 1;
      }

      .left-toggle-button {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(---N8);
        background-color: transparent;
        border-radius: 4px;
        transition: all 0.2s;
        flex-shrink: 0;
        icon-Root,
        .Root-tyicon {
          font-size: 16px;
          color: var(---N8);
        }
      }

      .workflow-content {
        flex: 1;
        overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .workflow-node {
        margin-bottom: 4px;
        .node-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          transition: all 0.2s;
          user-select: none;
          cursor: pointer;

          &.disabled {
            .node-title {
              opacity: 0.5;
            }
          }

          .node-header-content {
            display: flex;
            align-items: center;
            // justify-content: flex-start;
            gap: 8px;
            flex: 1;

            .status-icon {
              margin-left: auto;
              width: 18px;
              height: 18px;
              background-size: cover;
              &.succeeded {
                background-image: url('@/views/newProductAnalysis/assets/images/icon-succeeded.png');
              }
              &.failed {
                background-image: url('@/views/newProductAnalysis/assets/images/icon-failed.png');
              }
            }

            .node-title {
              font-size: 13px;
              color: var(---N9);
              font-weight: 600; // TODO 500 貌似无明显效果,待UI确定
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 130px;
              // &.succeeded {
              //   color: var(--el-color-primary);
              // }
              &.active-node {
                color: var(--el-color-primary);
              }
            }
          }
        }

        .node-children {
          overflow: hidden;
          position: relative;
          padding-left: 16px;

          /* Vertical line aligned with parent icon */
          &::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: var(---N3);
          }

          .node-child-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 16px 8px 28px;
            // cursor: pointer;
            transition: all 0.2s;
            position: relative;

            &.running {
              .child-title {
                color: var(---N9);
              }
            }

            &.succeeded {
              .child-title {
                color: var(---N9);
              }
            }

            .child-title {
              font-size: 12px;
              color: var(---N6);
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .child-status-icon {
              font-size: 14px;
              color: var(--el-color-primary);
              animation: rotate-loading 1s linear infinite;
            }
          }
        }
        .node-children-hide {
          animation: hide-children 1.4s ease infinite;
        }
        @keyframes hide-children {
          0% {
            display: none;
          }
          100% {
            display: none;
          }
        }
      }
    }
  }

  /* Middle Flow Chart Panel (inside merged column) */
  .middle-flow-chart-panel {
    flex: 1;
    padding: 16px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .flow-chart-container {
      height: 100%;
      min-width: 500px;
      display: flex;
      flex-direction: column;

      .flow-chart-header {
        font-size: 16px;
        font-family: 'PingFang SC';
        height: 40px;
        line-height: 40px;
        color: var(---N9);
        margin-bottom: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-left {
          letter-spacing: 1px;
          .left-tab {
            padding: 6px 12px;
            font-size: 14px;
            border-radius: 24px;
            &:hover {
              cursor: pointer;
            }
          }
          .active-tab {
            background: var(---P1, #f0fff6);
            color: var(---P6, var(---P6, #02b96b));
            font-weight: 600;
          }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;

          .expand-right-trigger {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .conclusions-outline {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        .conclusions-empty {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(---N6, var(---N6, #8a8f8d));
          font-size: 14px;
        }
      }

      .vue-flow {
        flex: 1;
        border: 1px solid #e4e7ed;
        border-radius: 10px;
        background-color: #f5f7fa;
      }
    }
  }

  /* Drag Resize Handle */
  .resize-handle {
    position: relative;
    width: 12px;
    flex-shrink: 0;
    cursor: col-resize;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      width: 2px;
      height: 95%;
      background-color: transparent;
      transition: background-color 0.2s;
      border-radius: 1px;
    }

    &.hovering::before {
      background-color: var(--el-color-primary);
    }

    &.dragging::before {
      background-color: var(--el-color-primary);
    }
  }

  /* Right Tabbed Panel */
  .right-column {
    min-width: 500px;
    flex-shrink: 0;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw !important;
      min-width: unset;
      height: 100vh;
      z-index: 2000;
      border-radius: 0;
    }

    .tab-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;

      .custom-tabs {
        flex: 1;

        :deep(.el-tabs__header) {
          margin-bottom: 0;
          border-bottom: none;
          padding-left: 0 !important;
        }

        :deep(.el-tabs__nav-wrap::after) {
          display: none;
        }

        :deep(.el-tabs__nav) {
          border: none;
        }

        :deep(.el-tabs__item) {
          border: none;
          padding: 6px 12px;
          height: auto;
          line-height: 20px;
          font-size: 14px;
          color: var(---N9);
          border-radius: 20px;
          transition: all 0.3s;
          // margin-right: 8px;

          &:hover {
            background-color: #f5f7fa;
            color: var(---N9);
          }

          &.is-active {
            background-color: #f0fff6;
            color: var(--el-color-primary);
            font-weight: 600;
          }
        }

        :deep(.el-tabs__active-bar) {
          display: none;
        }
      }

      .tab-actions {
        display: flex;
        align-items: center;
        gap: 8px;

        .expand-right-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .el-button {
          width: 28px;
          height: 28px;

          &:hover {
            background-color: #e4e7ed;
          }
        }
      }
    }

    .tab-content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .browser-tab-content,
      .document-tab-content {
        padding: 0px 20px 20px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .placeholder-content {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 48px;
        color: #c0c4cc;
        font-weight: bold;
        border-radius: 10px;
        border: 1px solid var(--N3, #ededed);
        margin: 0 20px 16px;
      }

      .ppt-content {
        padding: 10px 20px 18px 20px;
        overflow: hidden;
        &-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .title {
            color: $N9;
            font-family: 'PingFang SC Medium';
            font-size: 13px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 169.231% */
          }

          .right {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;

            .menu-item {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 28px;
              height: 28px;
              line-height: 28px;
              font-size: 16px;
              border-radius: 5.25px;
              cursor: pointer;

              icon-Root,
              .Root-tyicon {
                color: #666;
              }
              .disabled {
                color: $N4;
                cursor: not-allowed;
              }

              .text {
                width: 18px;
                text-align: center;
                font-size: 17px;
              }
              .ai {
                background: linear-gradient(270deg, #d897fd, #33bcfc);
                background-clip: text;
                color: transparent;
                font-weight: 700;
              }

              &:hover {
                background-color: #f1f1f1;
              }
            }
            .menu-item-play {
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 5px 16px;
              border-radius: 20px;
              background-color: $N2;
              cursor: pointer;
              line-height: 22px; /* 169.231% */

              .play {
                color: $N9;
                /* 常规/Regular 13 */
                font-family: 'PingFang SC';
                font-size: 13px;
                font-style: normal;
                font-weight: 400;
              }
            }
          }
        }
        .icon-bianji {
          color: $N8;
          cursor: pointer;
        }
        .slides {
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: calc(100% - 32px);
          overflow: auto;
          .slide-item {
            border-radius: 10px;
            flex-shrink: 0;
          }
        }
      }
    }
  }
  @keyframes rotate-loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
