<template>
  <el-popover
    placement="bottom-start"
    :offset="8"
    trigger="click"
    :show-arrow="false"
    popper-class="ticket-status-popover"
    teleported
    :visible="visible"
    @update:visible="(value) => emit('update:visible', value)"
  >
    <template #reference>
      <span class="ticket-status-popover__reference">
        <slot />
      </span>
    </template>
    <div class="ticket-status-popover__card" @click.stop @mousedown.stop>
      <div class="ticket-status-popover__table">
        <div class="ticket-status-popover__row ticket-status-popover__header">
          <div class="ticket-status-popover__cell is-id">工单ID</div>
          <div class="ticket-status-popover__cell is-status">状态</div>
          <div class="ticket-status-popover__cell is-executor">执行人</div>
          <div class="ticket-status-popover__cell is-suggestion">处理建议</div>
          <div class="ticket-status-popover__cell is-deadline">处理时限</div>
          <div class="ticket-status-popover__cell is-remark">备注</div>
          <div class="ticket-status-popover__cell is-creator">创建人</div>
          <div class="ticket-status-popover__cell is-action">操作</div>
        </div>
        <div
          v-for="(ticket, index) in normalizedTickets"
          :key="ticket.workOrderCode || ticket.status || index"
          class="ticket-status-popover__row"
        >
          <div class="ticket-status-popover__cell is-id">
            <el-tooltip :content="ticket.workOrderCode" placement="top">
              <span class="cell-ellipsis">{{ ticket.workOrderCode }}</span>
            </el-tooltip>
          </div>
          <div class="ticket-status-popover__cell is-status">
            <span :class="['status-tag', (statusClassMap as any)[ticket.status ?? '']]">
              {{ ticket.statusDesc }}
            </span>
          </div>
          <div class="ticket-status-popover__cell is-executor">
            <div class="executor">
              <img v-if="ticket.executorAvatar" :src="ticket.executorAvatar" alt="" />
              <span v-else class="executor-fallback">{{ ticket.executorName?.[0] }}</span>
              <span class="executor-name">{{ ticket.executorName }}</span>
            </div>
          </div>
          <div class="ticket-status-popover__cell is-suggestion">
            <div class="suggestion-list">
              <span
                v-for="item in getSuggestionMeta(ticket.solutionList).list"
                :key="item"
                class="suggestion-tag"
              >
                {{ item }}
              </span>
              <el-tooltip
                v-if="getSuggestionMeta(ticket.solutionList).extraCount"
                placement="top"
                :show-arrow="true"
                popper-class="ticket-suggestion-tooltip"
              >
                <template #content>
                  <div class="suggestion-tooltip-content">
                    {{ getSuggestionMeta(ticket.solutionList).tooltipText }}
                  </div>
                </template>
                <span class="suggestion-tag is-extra">
                  +{{ getSuggestionMeta(ticket.solutionList).extraCount }}
                </span>
              </el-tooltip>
            </div>
          </div>
          <div class="ticket-status-popover__cell is-deadline">
            {{ formatDeadline(ticket.deadlineTime) }}
            <el-tooltip content="已超时" placement="top">
              <el-icon v-if="checkIsOverdue(ticket)" class="overdue-icon">
                <WarningFilled />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="ticket-status-popover__cell is-remark">
            <OverflowTooltip :content="ticket.remark" :line="1" :font-size="12" />
          </div>
          <div class="ticket-status-popover__cell is-creator">
            <div class="creator">
              <img v-if="ticket.creatorAvatar" :src="ticket.creatorAvatar" alt="" />
              <span v-else class="creator-fallback">{{ ticket.creatorName?.[0] }}</span>
              <span class="creator-name">{{ ticket.creatorName }}</span>
            </div>
          </div>
          <div class="ticket-status-popover__cell is-action">
            <span class="action-text" @click.stop="emit('view-log', ticket)">
              日志
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
  import { isEmpty, mergeWith } from 'lodash-es';
  import { WarningFilled } from '@element-plus/icons-vue';
  import OverflowTooltip from '@/components/overflowTooltip/index.vue';
  import { formatDeadline } from '../../utils';
  import { SOLUTION_LABEL_MAP } from '../../constants';

  type TicketItem = {
    workOrderCode?: string;
    status?: string | number;
    statusDesc?: string;
    executorName?: string;
    executorAvatar?: string;
    solutionList?: string[];
    deadlineTime?: string;
    remark?: string;
    creatorName?: string;
    creatorAvatar?: string;
    isOverdue?: boolean;
    timeLimitFlag?: number;
  };

  const emit = defineEmits<{
    (e: 'view-log', ticket: TicketItem): void;
    (e: 'update:visible', value: boolean): void;
  }>();

  const props = defineProps<{
    tickets?: TicketItem[];
    fallbackTicket?: TicketItem;
    statusClassMap?: Record<string | number, string>;
    visible?: boolean;
  }>();

  const normalizedTickets = computed(() => {
    const baseTicket = props.fallbackTicket || {};
    const sourceTickets =
      (isEmpty(props.tickets) ? (isEmpty(baseTicket) ? [] : [baseTicket]) : props.tickets) || [];
    return sourceTickets.map((ticket) =>
      mergeWith({}, baseTicket, ticket, (_objValue, srcValue) => {
        if (Array.isArray(srcValue)) {
          return srcValue;
        }
        return undefined;
      })
    );
  });

  const normalizeSolutions = (solutions: any[] = []) =>
    solutions
      .map((item) => {
        if (item === undefined || item === null) return '';
        if (typeof item === 'object') return item.solutionDesc;
        return SOLUTION_LABEL_MAP[item] || item;
      })
      .filter(Boolean);

  const getSuggestionMeta = (solutions: (string | number)[] = []) => {
    const normalized = normalizeSolutions(solutions);
    return {
      list: normalized.slice(0, 2),
      extraCount: Math.max(normalized.length - 2, 0),
      tooltipText: normalized.join('、'),
    };
  };

  const checkIsOverdue = (ticket: TicketItem) => {
    return ticket?.timeLimitFlag === 1;
  };
</script>

<style scoped lang="scss">
  :global(.ticket-status-popover.el-popper) {
    --el-popover-bg-color: #ffffff !important;
    --el-bg-color-overlay: #ffffff !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
    background: #ffffff !important;
    background-color: #ffffff !important;
  }

  .ticket-status-popover__reference {
    display: inline-flex;
    align-items: center;
  }

  .ticket-status-popover__card {
    background: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 6px 36px rgba(6, 8, 27, 0.08);
  }

  .ticket-status-popover__table {
    border: 1px solid #f4f5f5;
    border-radius: 6px;
    overflow: hidden;
    min-width: 960px;
    max-height: 550px;
    overflow-y: auto;
  }

  .ticket-status-popover__row {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid #f4f5f5;
  }

  .ticket-status-popover__row:last-child {
    border-bottom: none;
  }

  .ticket-status-popover__header {
    background: #f8f8f8;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .ticket-status-popover__cell {
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 12px;
    line-height: 20px;
    color: #262626;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cell-ellipsis {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

	  .ticket-status-popover__header .ticket-status-popover__cell {
	    font-family: 'PingFang SC Medium', 'PingFang SC', sans-serif;
	    font-weight: 500;
	  }

  .ticket-status-popover__cell.is-id {
    width: 64px;
  }

  .ticket-status-popover__cell.is-status {
    width: 96px;
  }

  .ticket-status-popover__cell.is-executor {
    width: 96px;
  }

  .ticket-status-popover__cell.is-suggestion {
    width: 200px;
    padding-right: 24px;
  }

  .ticket-status-popover__cell.is-deadline {
    width: 148px;
    color: #262626;
  }

  .overdue-icon {
    margin-top: -2px;
    margin-left: 4px;
    font-size: 14px;
    color: #f53f3f;
    align-self: center;
  }

  .ticket-status-popover__cell.is-remark {
    width: 184px;
    align-items: flex-start;
    white-space: normal;
  }

  .ticket-status-popover__cell.is-creator {
    width: 96px;
  }

  .ticket-status-popover__cell.is-action {
    width: 56px;
  }

  .status-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
  }

  .status-tag.processing {
    border-color: #258DFF;
    color: #258DFF;
  }

  .status-tag.resolved {
    border-color: #02b96b;
    color: #02b96b;
  }

  .status-tag.no-need {
    border-color: #c5c5c5;
    color: #1f1f1f;
  }

  .executor {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .executor img,
  .executor-fallback {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f4f5f5;
    color: #8a8f8d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .executor-name {
    color: #262626;
  }

  .creator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .creator img,
  .creator-fallback {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f4f5f5;
    color: #8a8f8d;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .creator-name {
    color: #262626;
  }

  .suggestion-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .suggestion-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 6px;
    border-radius: 4px;
    background: #f5f5f5;
    color: #585a5a;
    font-size: 12px;
    line-height: 20px;
  }

  .suggestion-tag.is-extra {
    cursor: pointer;
  }

  .suggestion-tooltip-content {
    font-size: 12px;
    line-height: 20px;
    color: #f4f5f5;
  }

  :global(.ticket-suggestion-tooltip.el-popper) {
    background: #404040;
    border: none;
    border-radius: 4px;
    box-shadow: none;
    padding: 4px 8px;
  }

  :global(.ticket-suggestion-tooltip.el-popper .el-popper__arrow::before),
  :global(.ticket-suggestion-tooltip.el-popper .el-popper__arrow::after) {
    background: #404040;
    border-color: #404040;
  }

  .action-text {
    color: #02b96b;
    cursor: pointer;
  }
</style>
