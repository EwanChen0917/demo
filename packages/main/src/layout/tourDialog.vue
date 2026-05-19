<template>
  <el-dialog
    class="tour-dialog custom-dialog"
    v-model="visibility"
    width="1000px"
    center
    :before-close="close"
  >
    <!-- <div class="tour-image">
      <img :src="image" alt="" srcset="" />
    </div> -->
    <!-- <div class="tour-content">
      <div class="tour-title">
        {{ currentStep.title }}
        <div class="pagination">{{ step }}/{{ stepCount }}</div>
      </div>
      <div class="tour-desc" v-html="currentStep.desc"></div>
      <div class="tour-button">
        <el-button v-if="step > 1" @click="step -= 1">上一步</el-button>
        <el-button type="primary" @click="next">
          <template v-if="step === stepCount">立即体验</template>
          <template v-else>下一步</template>
        </el-button>
      </div>
    </div> -->

    <div class="tour-header">系统通知</div>
    <div class="tour-content">
      <div class="content-header">
        <div>各位同事好，</div>
       为进一步提升路特ERP系统的使用效率与操作体验，统一作业系统工作台，信息技术中心已于2026年1月20日对ERP系统菜单栏进行优化调整。现将相关事项公告如下：
      </div>
      <div v-for="(v, k) in detailMap" :key="k" class="content-box">
        <div class="content-title">{{ k }}</div>
        <div v-html="v" class="content-container"></div>
      </div>
      <div class="content-footer">
        <div>感谢大家的理解与配合！</div>
        <div>此致</div>
        <div>敬礼</div>
        <div>信息技术中心</div>
      </div>
    </div>
    <div class="tour-footer">
      <el-button type="primary" @click="close">知道了</el-button>
    </div>
  </el-dialog>
   <GuidelineTour ref="guidelineTour" :tour-config="{contentStyle: { width: '310px', letterSpacing: '1px', lineHeight: '24px' }}" :tour-steps-list="stepsList" />
</template>

<script setup lang="ts">
  import { commonApi, memberApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
   import GuidelineTour from '@/components/GuidelineTour/index.vue';

  const visibility = ref(false);
  // const step = ref(1);
  // const image = computed(() => {
  //   return new URL(`./images/tour${step.value}.png`, import.meta.url).href;
  // });
  const queryOpenDialog = async () => {
    const res: any = await memberApi.luteosMemberQueryLastVersionSync({
      platform: 'lute_erp',
    });
    visibility.value = !res.isSync;
  };
  queryOpenDialog();
  const markRead = async () => {
    await memberApi.luteosMemberSyncLastVersion({
      platform: 'lute_erp',
    });
  };
  // const currentStep = computed(() => {
  //   return stepMap.value[step.value];
  // });

  const detailMap = ref({
    '一、调整内容说明': `1. 将原OS系统的功能整合到ERP中，包括【路小特】，【协同】（二级菜单包含【设计任务】、【流程管理】、【需求管理】菜单）；
2. 新增【营销】一级菜单，设二级菜单包括【用户管理】（MDP系统跳转），【红人营销】（红人系统）；
3. 新增【内容】一级菜单，原品牌舆情迁移至内容菜单；原OS上的【KMS】迁移至内容菜单，并更名为内容管理，原素材中心和知识库迁移至内容菜单；
4. 下线已被替代的菜单项。`,
    '二、影响范围': `1. 本次调整涉及 ERP 系统前端菜单展示； 
2. 用户原有账号权限保持不变，但菜单位置可能有所变化。`,
    '三、注意事项': `1. 调整完成后，如发现菜单路径变化，请以新菜单为准； 
2. 如在使用过程中遇到功能、菜单找不到的情况，可以点击右上角搜索按钮进行菜单搜索；
3. 如果发现进入菜单后显示权限异常等问题，请及时联系信息技术中心支持团队。`,
  });

  // const stepMap = ref({
  //   1: {
  //     title: 'B2B订单全新升级，阅读&操作双提效',
  //     desc: '本次更新将B2B订单表格字段重新进行关联性划分为订单明细、订单金额、发货信息、时间、操作5大模块，让表格信息层级更明确，提高信息的识别效率，同时也充分提升了空间利用率',
  //   },
  //   2: {
  //     title: '新增个性化表格配置及导出功能，实现订单表格界面的定制化展示',
  //     desc: '为满足不同岗位的个性化数据需求，我们对表格新增了自定义展示字段以及自定义导出字段的功能，实现订单表格界面的定制化展示，达到千人千面的效果',
  //   },
  //   3: {
  //     title: '智能划分异常订单状态，精准定位各类异常订单',
  //     desc: '点击单个异常标签，查看属于该模块下的异常订单，提升异常订单处理效率',
  //   },
  //   4: {
  //     title: '遮罩抽屉交互，订单详情浏览更高效',
  //     desc: '为了提高浏览效率，我们将之前旧版的新开页面改为了抽屉式的交互方式，同时对字段进行关联性划分，方便同事们快速浏览订单详情',
  //   },
  // });

  // const stepCount = computed(() => {
  //   return Object.entries(stepMap.value)?.length;
  // });

  // const next = () => {
  //   if (step.value < stepCount.value) {
  //     step.value += 1;
  //   } else {
  //     close();
  //   }
  // };
  const close = () => {
    visibility.value = false;
    // step.value = 1;
    guidelineTour.value?.open(9);
    markRead();
  };
  const store = useStore();
  watch(
    () => store.userInfo.syncRsult,
    (val) => {
      if (val) {
        visibility.value = true;
      }
    },
    { immediate: true }
  );


  const guidelineTour = ref();
  const stepsList = [
      {
        target: '.nav-search-icon',
        description: '点击放大镜图标可以快速进行菜单搜索～若出现权限问题可申请权限或联系信息技术中心。',
        placement: 'bottom-end',
        nextButtonProps: {
          children: '我知道了',
        },
      },
    ];
  

</script>

<style lang="scss">
  .tour-dialog {
    padding: 0 !important;
    border-radius: 26px;
    overflow: hidden;

    .el-dialog__header {
      padding: 0 !important;
      border: none !important;

      .el-dialog__title {
        display: none !important;
      }

      .el-dialog__headerbtn {
        top: 5px;
        right: 11px;

        .el-dialog__close {
          font-size: 18px;
        }
      }
    }

    .el-dialog__body {
      padding: 0 !important;
    }

    .tour-image {
      background-color: #ecf9f5;

      img {
        width: 100%;
        object-fit: cover;
        display: block;
      }
    }

    .tour-content {
      padding: 30px 40px 40px;
      background-color: #fff;

      .tour-title {
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;
        color: #1f1f1f;
        margin-bottom: 14px;
        position: relative;

        .pagination {
          position: absolute;
          right: 0;
          top: 4px;
          font-size: 12px;
          line-height: 20px;
          color: #666;
          background-color: #f5f5f5;
          border-radius: 10px;
          padding: 0 8px;
        }
      }

      .tour-desc {
        font-size: 16px;
        line-height: 24px;
        color: #666;
        margin-bottom: 42px;

        strong {
          color: #02b96b;
          font-weight: 400;
        }
      }

      .tour-button {
        text-align: right;

        .el-button {
          height: 40px;
          padding: 8px 16px;
          background-color: #fff;
          border-color: #dedede;

          &.el-button--primary {
            background-color: #02b96b;
            border-color: #02b96b;
            outline-color: #02b96b;

            &.is-plain {
              background-color: #fff;
              color: #02b96b;
            }
          }
        }
      }
    }
  }

  .custom-dialog {
    color: #1f1f1f;
    font-family: 'PingFang SC';
    .tour-header {
      height: 60px;
      padding: 16px 20px;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 28px;
    }
    .tour-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-self: stretch;
      background-color: #f0fff6;
      padding: 32px 40px;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05) inset;
      .content-header {
        font-family: 'PingFang SC Medium';
        font-size: 14px;
        font-style: normal;
        line-height: 22px;
      }
      .content-box {
        .content-title {
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          line-height: 22px;
        }
        .content-container {
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          color: #666;
          white-space: pre-wrap;
        }
      }
      .content-footer {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        color: #000;
      }
    }
    .tour-footer {
      display: flex;
      height: 90px;
      padding: 20px;
      justify-content: flex-end;
      align-items: center;
      align-self: stretch;
    }
  }
</style>
