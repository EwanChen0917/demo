<template>
  <div class="flow-chart-wrapper">
    <VueFlow
      ref="vueFlowRef"
      :nodes="showNodes"
      :edges="showEdges"
      :fit-view-on-init="true"
      :nodes-draggable="true"
      :zoom-on-scroll="true"
      :pan-on-scroll="false"
    >
      <Background pattern-color="black" :gap="12" style="opacity: 0.3" />
      <!-- 自定义节点模板 -->
      <template #node-custom="{ data }">
        <div class="custom-node">
          <!-- 左侧连接点（目标）- 第一个节点不显示 -->
          <Handle
            v-if="!data.isFirst"
            type="target"
            :position="Position.Left"
            :id="`${data.nodeId || ''}-target`"
          />
          <!-- 右侧连接点（源）- 最后一个节点不显示 -->
          <Handle
            v-if="!data.isLast"
            type="source"
            :position="Position.Right"
            :id="`${data.nodeId || ''}-source`"
          />
          <!-- 节点标题栏 -->
          <div class="node-header">
            <div class="header-left">
              <div class="node-icon" :style="{ backgroundColor: data.iconBg || '#258dff' }">
                <!-- <span v-if="data.icon" class="icon-text">{{ data.icon }}</span> -->
                <i
                  class="Root-tyicon"
                  :class="
                    workFlowChildMap[data.title]
                      ? workFlowChildMap[data.title]
                      : 'icon-Root-tyhuoqupingtaishuju'
                  "
                ></i>
              </div>
              <span class="node-title" :class="data.status">{{ data.title }}</span>
            </div>

            <div class="status-badge" :class="`status-${data.status}`">
              <template v-if="data.status === 'running'">
                <span>进行中</span>
              </template>
              <template v-else-if="data.status === 'succeeded'">
                <span>已完成</span>
              </template>
              <template v-else-if="data.status === 'failed'">
                <span>失败</span>
              </template>
            </div>
          </div>
          <!-- <div>状态：{{  data.status }}</div> -->
          <!-- 节点内容列表 -->
          <div v-if="data.items && data.items.length" class="node-content">
            <div
              v-for="(item, index) in data.items"
              :key="index"
              class="content-item"
              :class="data.status === 'succeeded' ? 'succeeded' : item.status"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <span class="item-number"></span>
              <span class="item-text">{{ typeof item === 'string' ? item : item.text }}</span>
              <span
                v-if="typeof item === 'object' && item.status === 'pending'"
                class="item-loading"
              ></span>
            </div>
          </div>
        </div>
      </template>
    </VueFlow>

    <!-- 缩放控制器 -->
    <div class="zoom-control">
      <el-select
        v-model="zoomValue"
        @change="handleZoomChange"
        size="small"
        popper-class="zoom-select-dropdown"
      >
        <!-- <el-option label="缩小" value="zoomOut" />
        <el-option label="放大" value="zoomIn" /> -->
        <el-option label="适应大小" value="fit" />
        <el-option label="50%" value="0.5" />
        <el-option label="100%" value="1" />
        <el-option label="150%" value="1.5" />
        <el-option label="200%" value="2" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MarkerType, VueFlow, useVueFlow, Position, Handle } from '@vue-flow/core';
  import type { Node, Edge, GraphNode } from '@vue-flow/core';
  import { Background } from '@vue-flow/background';
  import '@vue-flow/core/dist/style.css';

  // 自定义节点数据类型
  interface CustomNodeData {
    nodeId: string;
    title: string;
    icon?: string;
    iconBg?: string;
    status?: 'processing' | 'completed' | 'success' | 'failed';
    items: string[];
    isFirst: boolean;
    isLast: boolean;
  }

  // 原始数据类型
  interface RawNodeData {
    id?: string;
    data?: {
      title?: string;
      label?: string;
      icon?: string;
      iconBg?: string;
      status?: string;
      items?: string[];
    };
    title?: string;
    label?: string;
    icon?: string;
    iconBg?: string;
    status?: string;
    items?: string[];
  }

  interface RawEdgeData {
    id?: string;
    source: string;
    target: string;
    type?: string;
  }

  interface RawFlowData {
    nodes?: RawNodeData[];
    edges?: RawEdgeData[];
  }

  const props = defineProps<{
    data: RawFlowData | RawNodeData[] | RawNodeData;
    async?: boolean;
  }>();

  const workFlowChildMap: Record<string, string> = {
    // 用户分析
    数据获取: 'icon-Root-tyhuoqupingtaishuju',
    用户旅程分析: 'icon-Root-tychanpinyongyan',
    'VOC挖掘&用户洞察': 'icon-Root-tyVOCwajue',
    用户需求转化: 'icon-Root-tyyonghuxuqiuzhuanhua',
    用户购买转化: 'icon-Root-tyhuoqupingtaishuju', // 待处理
    用户分析报告: 'icon-Root-tyhuoqupingtaishuju', // 待处理

    // 竞品分析
    竞品功能参数分析: 'icon-Root-tyhuoqupingtaishuju', // 待处理
    竞品上架趋势及价格段布局: 'icon-Root-tyhuoqupingtaishuju', // 待处理
    竞品综合分析报告: 'icon-Root-tyzonghejingpinfenxi',

    // 市场分析
    搜索趋势分析: 'icon-Root-tyshuju',
    行业市场分析: 'icon-Root-tyshichangfenxi',
    亚马逊市场分析: 'icon-Root-tyyamaxun',
    市场分析报告生成: 'icon-Root-tyhuoqupingtaishuju', // 待处理

    // 营销策略生成
    竞对站外洞察与策略分析: 'icon-Root-tylutedingdan',
    营销卖点分析: 'icon-Root-tyyingxiaomaidianfenxi',
    营销策略生成: 'icon-Root-tydingweicelveshengcheng',

    // 营销4P策略生成
    // 竞品功能参数分析: 'icon-Root-tyhuoqupingtaishuju', // 重复
    竞品上架趋势及价位段布局分析: 'icon-Root-tyhuoqupingtaishuju', // 待处理
    // 'VOC挖掘&用户洞察': 'icon-Root-tyhuoqupingtaishuju', // 重复
    竞对站外洞察及策略建议: 'icon-Root-tylutedingdan',
    产品机会定位: 'icon-Root-tychanpinyanfa',
    营销4P策略报告生成: 'icon-Root-tydingweicelveshengcheng',
  };

  const {
    setViewport,
    zoomIn: vueFlowZoomIn,
    zoomOut: vueFlowZoomOut,
    fitView,
    getNode,
  } = useVueFlow();
  const vueFlowRef = ref();

  const nodes = ref<Node<CustomNodeData>[]>([]);
  const showNodes = ref<Node<CustomNodeData>[]>([]);
  const showEdges = ref<Edge[]>([]);
  const zoomValue = ref<string>('1'); // 默认 100%
  let index = 0;
  let timer: NodeJS.Timeout | null = null;

  // 计算垂直居中的 y 坐标
  const calculateCenterY = (): number => {
    const container = vueFlowRef.value?.$el;
    if (container) {
      const containerHeight = container.clientHeight;
      const nodeHeight = 150; // 节点的估算高度
      return (containerHeight - nodeHeight) / 2 - nodeHeight / 2;
    }
    return 150; // 降级默认值
  };

  // 处理缩放变化
  const handleZoomChange = (value: string) => {
    if (value === 'zoomIn') {
      vueFlowZoomIn();
      // 重置回100%显示
      nextTick(() => {
        zoomValue.value = '1';
      });
    } else if (value === 'zoomOut') {
      vueFlowZoomOut();
      // 重置回100%显示
      nextTick(() => {
        zoomValue.value = '1';
      });
    } else if (value === 'fit') {
      // 使用合适的 padding 确保所有节点完全显示，padding 值为像素
      fitView({
        includeHiddenNodes: false,
        minZoom: 0.3,
        duration: 600,
      });
      // 重置回100%显示
      // nextTick(() => {
      //   zoomValue.value = '1';
      // });
    } else {
      // 具体缩放比例 - 保持垂直居中
      const zoom = parseFloat(value);
      const centerY = calculateCenterY();
      setViewport({ x: 50, y: centerY, zoom });
    }
  };

  const getEdges = (id: string, source: string, target: string, type = 'smoothstep'): Edge => {
    return {
      id,
      source,
      target,
      type,
      animated: false,
      style: {
        stroke: '#ededed',
        strokeWidth: 2,
      },
    };
  };

  const edges = ref<Edge[]>([]);

  // 数据处理函数 - 必须在 watch 之前定义
  const processData = (
    rawData: RawFlowData | RawNodeData[] | RawNodeData
  ): { nodes: Node<CustomNodeData>[]; edges: Edge[] } => {
    let nodeData: RawNodeData[] = [];
    let edgeData: RawEdgeData[] = [];

    // 情况1: 标准格式 { nodes: [...], edges: [...] }
    if (
      rawData &&
      typeof rawData === 'object' &&
      'nodes' in rawData &&
      Array.isArray(rawData.nodes)
    ) {
      nodeData = rawData.nodes;
      edgeData = rawData.edges || [];
    }
    // 情况2: 直接是节点数组
    else if (Array.isArray(rawData)) {
      nodeData = rawData;
    }
    // 情况3: 单个节点对象
    else if (rawData && typeof rawData === 'object') {
      nodeData = [rawData as RawNodeData];
    }

    // 过滤掉无效节点，只保留有效的父节点
    const validNodes = nodeData.filter((node) => {
      // 确保节点有标题或标签
      const data = node.data || node;
      return data.title || data.label;
    });

    console.log('有效节点数量:', validNodes.length);

    // 处理节点数据
    const processedNodes: Node<CustomNodeData>[] = validNodes.map((node, idx) => {
      const nodeData = node.data || node;
      const nodeId = node.id || `node-${idx}`;
      const totalNodes = validNodes.length;

      return {
        id: nodeId,
        type: 'custom',
        position: { x: idx * 320 + 50, y: 50 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          nodeId, // 添加节点ID用于handle识别
          title: nodeData.title || nodeData.label || `节点 ${idx + 1}`,
          icon: nodeData.icon,
          iconBg: nodeData.iconBg || '#258DFF',
          status: nodeData.status as CustomNodeData['status'],
          items: Array.isArray(nodeData.items) ? nodeData.items : [],
          isFirst: idx === 0, // 标记第一个节点
          isLast: idx === totalNodes - 1, // 标记最后一个节点
        },
      };
    });

    // 处理边数据
    let processedEdges: Edge[] = [];

    // 如果有提供边数据，使用提供的
    if (edgeData && edgeData.length > 0) {
      processedEdges = edgeData
        .filter((edge) => edge.source && edge.target)
        .map((edge, idx) => {
          return getEdges(
            edge.id || `edge-${idx}`,
            edge.source,
            edge.target,
            edge.type || 'smoothstep'
          );
        });
    }
    // 否则自动生成边（只连接相邻的父节点）
    else if (processedNodes.length > 1) {
      processedEdges = processedNodes.slice(0, -1).map((node, idx) => {
        return getEdges(`auto-edge-${idx}`, node.id, processedNodes[idx + 1].id, 'smoothstep');
      });
    }

    console.log('生成的边数量:', processedEdges.length);

    return {
      nodes: processedNodes,
      edges: processedEdges,
    };
  };

  // 滚动到指定节点并居中
  const scrollToNode = (title: string) => {
    // 根据 title 查找对应的节点
    const targetNode = showNodes.value.find((node) => node.data?.title === title);
    if (!targetNode) {
      console.warn(`未找到标题为 "${title}" 的节点`);
      return;
    }

    // 获取容器尺寸
    const container = vueFlowRef.value?.$el;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 节点尺寸（根据实际样式调整）
    const nodeWidth = 284; // 260px + 12px padding * 2
    const nodeHeight = 150; // 估算高度

    // 计算使节点居中的视口位置
    // x: 容器宽度的一半 - 节点 x 坐标 - 节点宽度的一半
    // y: 容器高度的一半 - 节点 y 坐标 - 节点高度的一半
    const x = containerWidth / 2 - targetNode.position.x - nodeWidth / 2;
    const y = containerHeight / 2 - targetNode.position.y - nodeHeight / 2;

    // 使用当前缩放级别或默认为 1
    const currentZoom = parseFloat(zoomValue.value) || 1;

    // 平滑滚动到目标节点
    setViewport({ x, y, zoom: currentZoom }, { duration: 600 });
  };

  // 更新节点状态（只更新 status，不重新渲染整个画布）
  const updateNodeStatus = (nodeStatusMap: Record<string, string>) => {
    showNodes.value.forEach((node) => {
      const title = node.data?.title;
      if (title && nodeStatusMap[title]) {
        // 直接修改节点的 status 属性
        if (node.data) {
          node.data.status = nodeStatusMap[title] as CustomNodeData['status'];
        }
      }
    });
  };

  // 暴露方法给父组件
  defineExpose({
    scrollToNode,
    updateNodeStatus,
  });

  watch(
    () => props.data,
    (val) => {
      console.log('=== FlowChart 接收到的原始数据 ===');
      console.log(JSON.stringify(val, null, 2));

      index = 0;
      showNodes.value = [];
      showEdges.value = [];
      if (timer) clearInterval(timer);

      // 处理数据格式，兼容多种格式
      const processedData = processData(val);

      // console.log('=== 处理后的节点数据 ===');
      // console.log(JSON.stringify(processedData.nodes, null, 2));
      // console.log('=== 处理后的边数据 ===');
      // console.log(JSON.stringify(processedData.edges, null, 2));

      // // 详细检查每个节点的handle配置
      // processedData.nodes.forEach((node, idx) => {
      //   console.log(`节点${idx + 1} (${node.id}):`, {
      //     title: node.data?.title || '',
      //     isFirst: node.data?.isFirst || false,
      //     isLast: node.data?.isLast || false,
      //     shouldHaveLeftHandle: !node.data?.isFirst,
      //     shouldHaveRightHandle: !node.data?.isLast,
      //   });
      // });

      // // 详细检查每条边
      // processedData.edges.forEach((edge, idx) => {
      //   console.log(`边${idx + 1} (${edge.id}): ${edge.source} -> ${edge.target}`);
      // });

      if (processedData.nodes.length > 0) {
        nodes.value = processedData.nodes;
        edges.value = processedData.edges;

        if (props?.async) {
          timer = setInterval(() => {
            if (index >= nodes.value.length) {
              if (timer) clearInterval(timer);
              return;
            }
            showNodes.value.push(nodes.value[index]);
            // 修复：在添加节点后，检查是否有从前一个节点指向当前节点的边
            if (index > 0 && edges.value[index - 1]) {
              showEdges.value.push(edges.value[index - 1]);
            }
            index++;
          }, 1000);
        } else {
          showNodes.value = nodes.value;
          showEdges.value = edges.value;
        }

        // 延迟调整视口，确保节点渲染完成后垂直居中
        nextTick(() => {
          setTimeout(() => {
            const centerY = calculateCenterY();
            setViewport({ x: 50, y: centerY, zoom: 1 });
          }, 100);
        });
      } else {
        console.log('没有节点数据，显示默认提示');
        showNodes.value = [
          {
            id: 'default-1',
            type: 'custom',
            position: { x: 100, y: 100 },
            data: {
              nodeId: 'default-1',
              title: '暂无思考过程',
              status: 'completed',
              items: [],
              isFirst: true,
              isLast: true,
            },
          },
        ];
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style scoped lang="scss">
  .flow-chart-wrapper {
    width: 100%;
    height: 100%;
    min-height: 400px;
    background: #f5f7fa;
    border-radius: 10px;
    border: 1px solid var(---N3);
    position: relative; // 为缩放控制器定位
  }

  // 缩放控制器样式
  .zoom-control {
    position: absolute;
    bottom: 4px;
    left: 10px;
    z-index: 10;

    :deep(.el-select) {
      width: 80px;

      .el-input__wrapper {
        background: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 0 8px;
      }

      .el-input__inner {
        font-size: 13px;
        color: var(---N9);
      }
    }
  }

  :deep(.vue-flow__viewport) {
    // 确保视口正确显示
  }

  :deep(.vue-flow__handle) {
    z-index: -1;
    width: 2px !important;
    height: 8px !important;
    background: var(--el-color-primary) !important; // 主色调
    border: none !important;
    box-shadow: none !important;
  }

  :deep(.vue-flow__handle-right) {
    right: -2px !important; // 起点，居中对齐
    top: 26px !important; // 对齐标题栏中间（padding 14px + 图标高度36px/2 = 32px）
    border-radius: 0 2px 2px 0 !important; // 右上、右下圆角4px
    transform: translateY(-50%) !important; // 垂直居中
  }

  :deep(.vue-flow__handle-left) {
    left: -2px !important; // 终点，居中对齐
    top: 26px !important; // 对齐标题栏中间
    border-radius: 2px 0 0 2px !important; // 左上、左下圆角4px
    transform: translateY(-50%) !important; // 垂直居中
  }

  :deep(.vue-flow__edges) {
    z-index: -1 !important;
  }

  :deep(.vue-flow__edge-path) {
    stroke: #e5e7eb !important;
    stroke-width: 2px !important;

    // 连线绘制动画：从起点到终点的画线效果
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }

  :deep(.vue-flow__node) {
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    width: auto !important;
    height: auto !important;
  }

  :deep(.vue-flow__node-custom) {
    width: auto !important;
    height: auto !important;
  }

  // 自定义节点样式
  .custom-node {
    width: 260px;
    padding: 12px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(6, 8, 27, 0.12);
    overflow: hidden;
  }

  .node-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  .node-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #258dff !important;

    icon-Root,
    .Root-tyicon {
      font-size: 18px;
      color: #fff;
    }
  }

  .node-title {
    font-size: 13px;
    font-weight: 600;
    color: var(---N6);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &.succeeded,
    &.running {
      color: var(---N9);
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 0 4px;
    height: 20px;
    line-height: 20px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    flex-shrink: 0;

    &.status-running {
      background: #eff6ff;
      color: #3b82f6;
    }

    &.status-succeeded {
      background: #f0fdf4;
      color: var(--el-color-primary);
    }

    &.status-failed {
      background: #fef2f2;
      color: #ef4444;
    }
  }

  .status-icon.processing {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3b82f6;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .node-content {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    gap: 10px;
  }

  .content-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 8px;
    font-size: 12px;
    color: var(---N6);

    // 逐行显示动画
    opacity: 0;
    transform: translateX(-10px);
    animation: slideInItem 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;

    &.succeeded {
      color: var(---N9);
    }
    &.running {
      color: var(---N9);
    }
  }

  @keyframes slideInItem {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .item-number {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #dedede;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-text {
    flex: 1;
    font-weight: 400;
  }

  .item-loading {
    width: 14px;
    height: 14px;
    border: 2px solid #e5e7eb;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    margin-top: 3px;
    flex-shrink: 0;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
