<template>
  <div class="daily-record">
    <div class="daily-record-inner">
      <Calendar
        v-model:selected-date="selectedDate"
        :marked-dates="[] || ['2025-8-7', '2025-8-8', '2025-8-9', '2025-8-10', '2025-8-11']"
      />
      <main class="cards-container">
        <div v-if="showList.length" class="cards-list">
          <article class="card-item" v-for="(log, index) in showList" :key="index">
            <!-- 卡片头部 -->
            <div class="card-item-header">
              <span class="card-item-title">{{ log.title }}</span>
              <span class="card-item-author">{{ log.creator }}</span>
            </div>
            <div class="card-item-memo">
              <div class="analysis-period">{{ log.createTime }}</div>
              <div class="card-item-actions">
                <el-button text size="small" icon="Edit" @click="editRow(log)" />
                <span class="gap">|</span>
                <el-button text size="small" icon="Delete" @click="deleteRow(log)" />
              </div>
            </div>
            <!-- 内容区域 - 使用 v-html 渲染富文本 -->
            <div class="w-e-text-container">
              <div data-slate-editor>
                <div class="card-item-content" v-html="log.content"></div>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="cards-empty">
          <div>
            <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
          </div>
          <div class="text-black">如何更好管理商品运营日志？</div>
          <div class="sub-tip">从这里开始记录运营计划</div>
        </div>
      </main>
      <footer>
        <el-button class="btn-add" size="small" plain @click="addRow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.66669 8H13.3334"
              stroke="#02B96B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 13.3332V2.6665"
              stroke="#02B96B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          创建日志
        </el-button>
      </footer>
    </div>
  </div>
  <add-daily-record-dialog ref="addDialog" />
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import AddDailyRecordDialog from './components/addDailyRecordDialog.vue';
  import Calendar from './components/calendar.vue';

  const selectedDate = ref(dayjs().format('YYYY-MM-DD'));
  const showList = computed(() => {
    const mockData = [] || [
      {
        title: '7月销售数据分析报告',
        creator: '张三',
        createTime: '2025-07-30 14:30:22',
        content:
          '<p>本月销售额同比增长15%，主要得益于新产品的推出和市场推广活动的成功。通过对各地区销售数据的深入分析，我们发现华东地区的增长最为显著，达到了25%的同比增长率。华北地区表现平稳，增长率为8%，而华南地区略有下降，需要进一步分析原因。</p><p>在产品类别方面，智能家居产品线表现突出，销售额占比达到35%，成为本月的主要增长点。传统家电产品线保持稳定，占总销售额的50%。建议下月继续加大市场投入，重点关注华东地区，并对华南地区的市场策略进行调整。同时，应进一步推广智能家居产品，提升其市场占有率。</p>',
      },
      {
        title: '产品开发进度更新',
        creator: '李四',
        createTime: '2025-07-29 10:15:47',
        content:
          '<p>新产品开发已完成80%，预计下月初可进行内测。目前核心功能模块已经完成开发和单元测试，正在进行集成测试阶段。用户界面设计已通过最终审核，开发团队正在按照设计稿进行最后的优化调整。</p><p>在开发过程中，我们遇到的技术难点主要集中在数据同步和性能优化方面。经过团队的共同努力，这些问题已基本解决，系统性能得到了显著提升。下一步计划是完成剩余20%的功能开发，并进行全面的系统测试。预计在内测阶段将邀请50名核心用户参与，收集反馈以进一步优化产品体验。</p>',
      },
      {
        title: '客户反馈汇总',
        creator: '王五',
        createTime: '2025-07-28 16:42:18',
        content:
          '<p>本周共收集到客户反馈32条，其中功能建议占60%，界面优化占30%，其他问题占10%。功能建议主要集中在增加自定义报表功能、优化数据导出格式以及提升移动端操作体验等方面。界面优化反馈主要涉及颜色搭配、字体大小和布局调整等细节。</p><p>已安排产品团队优先处理高频反馈问题，特别是关于数据导出格式和移动端体验的问题。技术团队也在积极研究自定义报表功能的实现方案。此外，我们建立了客户反馈跟踪机制，确保每条反馈都能得到及时响应和处理。下周一将召开专题会议，讨论各项反馈的处理优先级和实施方案。</p>',
      },
      {
        title: '团队周报',
        creator: '赵六',
        createTime: '2025-07-25 09:20:05',
        content:
          '<p>本周团队完成项目A的阶段性目标，主要包括系统架构优化和核心模块重构工作。项目B按计划推进中，目前已完成需求分析和初步设计阶段。团队成员工作积极性高，协作顺畅，项目进展符合预期。</p><p>本周新增2名成员，分别负责前端和测试工作，团队总人数达到12人。为帮助新成员快速融入团队，我们安排了为期两天的入职培训，内容包括项目介绍、技术栈讲解和开发流程说明。同时，为每位新成员指定了导师，确保他们能够快速上手工作。下周计划继续推进项目B的开发工作，并开始项目C的前期调研。</p>',
      },
    ];

    return mockData.slice(0, dayjs(selectedDate.value).date() % 3);
  });

  const addDialog = ref();
  const addRow = () => {
    ElMessage.warning('即将上线');
    // addDialog.value.open();
  };
  const editRow = (log) => {
    addDialog.value.open(log);
  };
  const deleteRow = async (log) => {
    const isConfirmed = await swal.confirm(`您确定要删除这条日志吗？`);
    if (!isConfirmed) return;
    ElMessage.success('删除成功');
  };
</script>

<style scoped lang="scss">
  .daily-record {
    position: relative;
    background: #fff;
    border-radius: 10px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 82px;
      background: url(/src/assets/images/decisionAnalysis/analysis-header-bg.png) no-repeat top;
      background-size: cover;
      border-radius: 10px 10px 0 0;
      z-index: 1;
    }

    .daily-record-inner {
      position: relative;
      z-index: 2;
      min-height: 436px;

      main.cards-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow-y: auto;
        flex: 1;

        .cards-list {
          height: 100%;
        }

        .cards-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(---N6);
          font-size: 14px;
          margin-bottom: 30px;

          .text-black {
            color: var(---N9, #1f1f1f);
            text-align: center;
            /* 常规/Medium 14 */
            font-family: 'PingFang SC Medium';
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 157.143% */
          }

          .sub-tip {
            margin-top: 6px;
            font-size: 12px;
          }
        }

        article.card-item {
          padding: 10px 20px;
          transition: all 0.3s ease;
          border-radius: 0;

          .card-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            word-break: break-all;

            .card-item-title {
              font-size: 14px;
              font-weight: 600;
              color: #303133;
            }

            .card-item-author {
              font-size: 12px;
              color: var(---N6);
              word-break: keep-all;
            }
          }

          .card-item-memo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 20px;
            color: var(---N6);

            .analysis-period {
              font-size: 12px;
              color: var(---N6);
              font-weight: 400;
            }

            .card-item-actions {
              display: flex;
              align-items: center;
              gap: 6px;

              .gap {
                color: #d9d9d9;
              }

              :deep(.el-button) {
                color: var(---N6);
                font-weight: 400;
                padding: 0;

                &:hover {
                  color: var(--el-color-primary);
                }
              }
            }
          }

          [data-slate-editor] {
            padding: 0;

            :first-child {
              margin-top: 0;
              padding-top: 0;
            }
          }

          .card-item-content {
            color: #606266;
            word-break: break-all;

            * {
              line-height: 22px;
              font-size: 14px;
            }

            :deep(p) {
              color: var(---N8);
            }

            :deep(img) {
              max-width: 100%;
              height: auto !important;
            }
          }

          + .card-item {
            border-top: 1px solid #efefef;
          }
        }
      }

      footer {
        text-align: center;
        padding-bottom: 20px;

        .btn-add {
          height: 34px;
          padding: 0 16px;

          svg {
            margin-right: 6px;
          }
        }

        :deep(.el-button) {
          border: 1px solid var(--el-color-primary);
          color: var(--el-color-primary);

          &:hover {
            background: var(--el-color-primary-light-9);
          }
        }
      }
    }
  }
</style>
