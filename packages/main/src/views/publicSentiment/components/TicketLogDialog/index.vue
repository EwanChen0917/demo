<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="660px"
    class="ticket-log-dialog"
    append-to-body
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="dialog-header">
        <div class="title">日志 {{ ticketId }}</div>
        <el-icon class="close-icon" @click="visible = false"><Close /></el-icon>
      </div>
    </template>
    <div class="dialog-body" v-loading="loading">
      <div v-if="!formattedLogs.length && !loading" class="log-empty">
        <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
        <div class="log-empty__text">暂无日志</div>
      </div>
      <div v-for="(log, index) in formattedLogs" :key="log.id" class="log-item">
        <div v-if="index < logs.length - 1" class="log-line"></div>
        <div class="log-header">
          <div class="log-avatar">
            <img v-if="log.avatar" :src="log.avatar" alt="" />
            <span v-else>{{ log.actorName?.[0] }}</span>
            <img class="log-status" :src="statusIconMap[log.type]" alt="" />
          </div>
          <div class="log-main">
            <div class="log-title">
              <span v-if="log.roleLabel" class="role">{{ log.roleLabel }}</span>
              <span class="action">{{ log.operatorName }} {{ log.title }}</span>
            </div>
          </div>
          <div class="log-time">{{ formatDeadline(log.time) }}</div>
        </div>
        <div v-if="log.contentHtml || log.contentText" class="log-card">
          <div v-if="log.rowsVNodes?.length" class="log-content log-richtext">
            <component :is="row" v-for="(row, rIndex) in log.rowsVNodes" :key="rIndex" />
          </div>
          <div
            v-else-if="log.contentHtml"
            class="log-content log-richtext"
            v-html="log.contentHtml"
          ></div>
          <div v-else class="log-content">{{ log.contentText }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button class="close-btn" @click="visible = false">关闭</el-button>
      <el-button v-if="canHandle" class="handle-btn" @click="handleHandleTicket">处理</el-button>
    </template>
  </el-dialog>
</template>

<script setup name="TicketLogDialog">
  import { h } from 'vue';
  import { Close, WarningFilled } from '@element-plus/icons-vue';
  import { ElIcon, ElTooltip } from 'element-plus';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import { formatDeadline } from '../../utils';

  const visible = defineModel({ type: Boolean, default: false });
  const emit = defineEmits(['view-ticket', 'handle-ticket']);
  const statusIconMap = {
    complete: new URL('../../assets/svgs/log-status-complete.svg', import.meta.url).href,
    transfer: new URL('../../assets/svgs/log-status-transfer.svg', import.meta.url).href,
    split: new URL('../../assets/svgs/log-status-split.svg', import.meta.url).href,
    processing: new URL('../../assets/svgs/log-status-processing.svg', import.meta.url).href,
  };

  const props = defineProps({
    ticketId: {
      type: String,
      default: '',
    },
    currentMemberCode: {
      type: String,
      default: '',
    },
    executorCode: {
      type: String,
      default: '',
    },
    timeLimitFlag: {
      type: Number,
      default: 0,
    },
    logs: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    manageRoleFlag: {
      type: Number,
      default: 0,
    },
  });

  const resolveLogType = (log) => {
    const operationTypeMap = {
      change_executor: 'transfer',
      split: 'split',
      finish: 'complete',
      undo: 'complete',
      save: 'complete',
    };
    return operationTypeMap[log?.operationType] || '';
  };

  const toPlainText = (value) => {
    if (typeof value !== 'string') return '';
    return value
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };
  const handleViewTicket = (ticketId) => {
    console.log('TicketLogDialog view-ticket:', ticketId);
    emit('view-ticket', ticketId);
  };

  const cleanContent = (value) => {
    if (!value) return '';
    return value.replace(/^['"`“”]|['"`“”]$/g, '').trim();
  };

  const buildStructuredContent = (raw, timeLimitFlag) => {
    const isOverTime = Number(timeLimitFlag) === 1;
    const normalized = cleanContent(raw || '');
    const parts = normalized
      .split(/<br\s*\/?>/gi)
      .map((line) => line.replace(/&nbsp;/g, ' ').trim())
      .filter(Boolean);

    const labelRegex = /^\s*([^：:]+)[：:]\s*(.+)\s*$/;
    const rows = [];
    const plainLines = [];

    parts.forEach((line) => {
      const match = line.match(labelRegex);
      if (match) {
        const [, label, value] = match;
        rows.push({
          label,
          value,
          isTime: label.includes('处理时限'),
          isOverTime,
        });
        plainLines.push(`${label}: ${value}`);
      } else {
        rows.push({
          label: '',
          value: line,
          isTime: false,
          isOverTime: false,
        });
        plainLines.push(line);
      }
    });

    return {
      rows,
      text: plainLines.join(' '),
    };
  };

  const formattedLogs = computed(() =>
    (props.logs || []).map((log) => {
      const rawContent = log?.itemContent || log?.detail?.description || log?.remark || '';
      const { rows: structuredRows, text: structuredText } = buildStructuredContent(
        rawContent,
        log?.timeLimitFlag ?? props.timeLimitFlag
      );
      const fallbackHtml = cleanContent(rawContent);
      const contentHtml = fallbackHtml;
      const contentText = structuredText || toPlainText(fallbackHtml);

      const rowsVNodes = structuredRows.map((row) => {
        return () =>
          h(
            'p',
            { class: 'log-row' },
            [
              row.label
                ? h(
                    'span',
                    {
                      class: 'log-label',
                      style: {
                        display: 'inline-block',
                        color: '#8a8f8d',
                        'white-space': 'nowrap',
                        'flex-shrink': '0',
                      },
                    },
                    `${row.label}：`
                  )
                : null,
              h('span', { class: 'log-value' }, [
                row.value ? h('span', { innerHTML: row.value }) : null,
                row.isTime && row.isOverTime
                  ? h(
                      ElTooltip,
                      { content: '已超时', placement: 'top' },
                      {
                        default: () =>
                          h(
                            ElIcon,
                            { class: 'overtime-icon' },
                            { default: () => h(WarningFilled) }
                          ),
                      }
                    )
                  : null,
              ]),
            ].filter(Boolean)
          );
      });

      const viewTicketId = log?.workOrderCode || '';
      const originTicketVNode = viewTicketId
        ? () =>
            h('p', { class: 'log-row' }, [
              h(
                'span',
                {
                  class: 'log-label',
                  style: {
                    display: 'inline-block',
                    color: '#8a8f8d',
                    'white-space': 'nowrap',
                    'flex-shrink': '0',
                  },
                },
                '原工单ID：'
              ),
              h('span', { class: 'log-value' }, [
                h('span', viewTicketId),
                h(
                  'span',
                  {
                    class: 'log-inline-link',
                    role: 'button',
                    tabindex: 0,
                    onClick: () => handleViewTicket(viewTicketId),
                    onKeydown: (event) => {
                      const key = event?.key;
                      if (key === 'Enter' || key === ' ') {
                        event.preventDefault();
                        handleViewTicket(viewTicketId);
                      }
                    },
                  },
                  ['查看', h('span', { class: 'log-inline-arrow' }, '>')]
                ),
              ]),
            ])
        : null;
      const roleLabel = log?.roleLabel || log?.tip || '';
      const title = log?.remark || log?.operationTypeDesc || log?.operationType || '更新';
      return {
        id:
          log?.id ??
          log?.serialCode ??
          `${log?.operator || log?.operatorCode || 'actor'}-${log?.operationType || 'log'}-${
            log?.createTime || log?.updateTime || ''
          }`,
        type: resolveLogType(log),
        title,
        operatorName: log?.operator || log?.operatorCode,
        roleLabel,
        time: log?.createTime || log?.updateTime,
        avatar: log?.operatorAvatar || '',
        contentHtml,
        contentText,
        rowsVNodes: originTicketVNode ? [originTicketVNode, ...rowsVNodes] : rowsVNodes,
        sourceTicketId: log?.originalWorkOrderCode || '',
        viewTicketId,
      };
    })
  );

  watch(
    () => props.logs,
    () => {
      console.log('TicketLogDialog logs:', formattedLogs.value);
    }
  );

  const canHandle = computed(() => {
    if (!props.currentMemberCode || !props.executorCode) return false;
    return props.currentMemberCode === props.executorCode;
  });

  const closeDialog = () => {
    visible.value = false;
  };

  const handleHandleTicket = () => {
    emit('handle-ticket', props.ticketId);
    // 等待处理弹框关闭动画结束后再关闭当前日志弹框，避免双弹框同时动画抖动
    setTimeout(() => closeDialog(), 320);
  };
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    color: var(--el-text-color-primary);
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  .close-icon {
    cursor: pointer;
    color: var(--el-text-color-placeholder);
  }

  .dialog-body {
    max-height: 440px;
    overflow-y: auto;
  }

  .log-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 260px;
    padding: 16px 0;
    color: var(--el-text-color-secondary);
  }

  .log-empty__text {
    margin-top: 8px;
    font-size: 12px;
    line-height: 20px;
  }

  :deep(.el-dialog) {
    border-radius: 12px;
    overflow: hidden;
    margin-top: 15vh !important;
  }

  .log-item {
    position: relative;
    padding-bottom: 16px;
  }

  .log-line {
    position: absolute;
    left: 14px;
    top: 30px;
    bottom: 0;
    width: 0;
    border-left: 1px dashed #e7e9e8;
  }

  .log-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .log-avatar {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--el-text-color-secondary);

    img:not(.log-status) {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .log-status {
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 14px;
    height: 14px;
    display: block;
    border-radius: 50%;
    pointer-events: none;
  }

  .log-main {
    flex: 1;
  }

  .log-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    line-height: 20px;
  }

  .log-title > * {
    white-space: nowrap;
  }

  .action {
    color: var(--el-text-color-secondary);
  }

  .source-tag {
    color: var(--el-color-success);
  }

  :deep(.log-inline-link) {
    margin-left: 8px;
    cursor: pointer;
    color: var(--el-color-success);
  }

  :deep(.log-inline-arrow) {
    margin-left: 4px;
  }

  .view-wrap {
    color: var(--el-text-color-secondary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .view-link {
    color: var(--el-color-success);
    cursor: pointer;
  }

  .view-arrow {
    font-size: 12px;
  }

  .log-time {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    line-height: 20px;
  }

  .log-card {
    margin-left: 42px;
    margin-top: 2px;
    background: #f8f8f8;
    border-radius: 6px;
    padding: 10px 14px 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
    line-height: 20px;
  }

  .log-content {
    color: var(--el-text-color-primary);
  }

  .log-richtext {
    display: table;
    border-collapse: separate;
    border-spacing: 0 2px;
  }

  :deep(.log-richtext) {
    font-size: 12px;
    line-height: 20px;
    color: #262626;
    .log-row {
      display: table-row;
    }
    .log-label,
    .log-value {
      display: table-cell;
      vertical-align: top;
    }
    .log-label {
      color: #8a8f8d;
      white-space: nowrap;
      padding-right: 4px;
      width: 60px;
      min-width: 60px;
      max-width: 60px;
      overflow: hidden;
      // text-overflow: ellipsis;
    }
    .log-value {
      color: #262626;
      width: 100%;
    }
    .time-limit {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .overtime-icon {
      color: #f53f3f;
      font-size: 13px;
      line-height: 1;
      margin-left: 6px;
      transform: translateY(2px);
    }
    img {
      max-width: 100%;
      height: auto;
    }
    p {
      margin: 0;
    }
  }

  .close-btn {
    height: 32px;
    padding: 0 16px;
  }

  .header-divider {
    height: 1px;
    background: #eff0f0;
    margin: 16px 20px 0;
  }

  .handle-btn {
    height: 32px;
    padding: 0 16px;
    background: var(--el-color-success);
    border-color: var(--el-color-success);
    color: #ffffff;
    margin-left: 12px;
  }
</style>
