<template>
  <div class="page_wrap" ref="pageWrapRef">
    <el-tabs v-model="reportTopicCode" tab-position="top" @tab-click="updateReportList">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.model"
        :label="item.desc"
        :name="item.model"
      />
    </el-tabs>

    <div class="report-list">
      <div
        class="report-item"
        v-for="report in reportList"
        :key="report.modelCode"
        :style="{ width: reportListWidth }"
      >
        <div class="report-group-title">{{ report.modelDesc }}</div>
        <div class="d-flex flex-wrap" style="gap: 16px">
          <div
            v-for="(item, index) in report.reportBeanList"
            :key="index"
            @click="handleContentClick(item)"
            class="report-card"
            :class="{ lock: item.authType === 2, download: item.linkType === 3 }"
          >
<!--            <KeenImagePreview :src="item.image" class="report-img" :size="32" />-->
            <svg width="32" height="32" class="report-img" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#02B96B"/>
              <path d="M24 24V22.6462H8.12214V24H24ZM12.0305 10.7077H8V21.4154H12.0305V10.7077ZM18.0153 8H13.9847V21.4154H18.0153V8ZM24 14.0308H19.9695V21.4154H24V14.0308Z" fill="white"/>
            </svg>
            <div class="report-card-content">
              <span class="report-title">
                <overflow-tooltip :content="item.title" effect="light" :line="1" :font-size="12" color="#1E2226"/>
              </span>
              <span class="report-content">
                <overflow-tooltip :content="item.desc || '-'" effect="light"  :line="2" :font-size="12" color="#8A9099"/>
              </span>
            </div>
            <!-- <span class="view-btn" v-if="item.authType === 2">申请权限</span> -->
            <!--          <el-button v-if="item.authType === 2" type="primary" plain size="small">申请权限</el-button>-->
            <img
              v-if="item.newFlag"
              src="@/assets/images/icon/new.svg"
              class="tag-overflow"
              alt=""
            />
            <!--          <span v-if="item.newFlag" class="tag-overflow">New</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-drawer title="自定义数据报表" v-model="reportDrawer" direction="rtl">
    <div class="demo-drawer__content">
      <el-form :model="applyForm" ref="applyFormRef" label-width="100px">
        <el-form-item label="申请人">
          <el-input v-model="userInfo.name" disabled />
        </el-form-item>
        <el-form-item
          label="需求详情"
          prop="requirementDetails"
          :rules="[{ required: true, message: '请输入需求详情', trigger: ['blur'] }]"
        >
          <el-input v-model="applyForm.requirementDetails" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item
          label="用途"
          prop="useToDesc"
          :rules="[{ required: true, message: '请输入用途', trigger: ['blur'] }]"
        >
          <el-input v-model="applyForm.useToDesc" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-button @click="cancelForm" class="cancel-btn">取 消</el-button>
        <el-button type="primary" @click="saveReport">提交申请</el-button>
      </div>
    </div>
  </el-drawer>

  <el-drawer title="查看数据" v-model="applyAuthDrawer" direction="rtl">
    <div class="demo-drawer__content">
      <el-form :model="applyForm" ref="applyFormRef" label-width="120px">
        <el-form-item label="申请人">
          <el-input v-model="userInfo.name" disabled />
        </el-form-item>
        <el-form-item label="数据报表名称">
          <el-input v-model="curReport.title" disabled />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="applyForm.remark" type="textarea" :rows="5" />
        </el-form-item>
      </el-form>
      <div class="drawer__footer">
        <el-button @click="cancelApplyForm" class="cancel-btn">取 消</el-button>
        <el-button type="primary" @click="saveApply">提 交</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="datamarketReport">
  import { openWindow } from '@/utils';
  import { datamarketApi, commonApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import axios from 'axios';
  import * as swal from '@/utils/swal';
  import { useResizeObserver } from '@vueuse/core';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const tabList = computed(() => {
    const list = [];
    if (modelList.value?.length > 1) {
      list.push({ desc: '所有报表', model: '' });
    }
    list.push(...modelList.value);
    return list;
  });

  const reportTopicCode = ref('');
  const labelCode = ref('');

  // 查询报表
  const reportList = ref([]);
  const queryReportList = () => {
    datamarketApi
      .luteosDatamarketReportQueryDataMarketPage({
        pageNum: 1,
        pageSize: 1000,
        reportTopicCode: reportTopicCode.value,
        labelCode: labelCode.value,
      })
      .then((res) => {
        reportList.value = res.reportList || [];
      });
  };

  const updateReportList = () => {
    nextTick(() => {
      queryReportList();
    });
  };

  //   查询板块
  const modelList = ref([]);
  const queryModelList = () => {
    commonApi
      .luteosCommonMaterialQueryMaterialModelList({
        scene: 'data_market',
      })
      .then((res) => {
        modelList.value = res?.modelList || [];
        if (res?.modelList?.length === 1) {
          reportTopicCode.value = res?.modelList[0].model;
        }
        queryReportList();
      });
  };
  queryModelList();

  const handleContentClick = (item) => {
    if (item.authType === 2) {
      applyAuth(item);
    } else {
      redirectUrl(item);
    }
  };

  const route = useRoute();
  const router = useRouter();
  const user = useStore();

  const redirectUrl = async (item) => {
    const url = item.redirectUrl;
    if (url) {
      // 下载类型
      if (item?.linkType === 3) {
        try {
          const fetchInfo = url?.split('POST')[url?.split('POST')?.length - 1];
          const fetchUrl = fetchInfo?.split('--row')[0]?.trim();
          const fetchParams = JSON.parse(fetchInfo?.split('--row')[1]?.trim());
          // console.log(fetchUrl, fetchParams);
          const res = await axios.post(fetchUrl, fetchParams, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const resData = res?.data;
          if (resData?.code && resData?.code !== '200') {
            ElMessage.error(resData?.message);
            return;
          }
          const isExportConfirm = await swal.exportConfirm();
          if (!isExportConfirm) return;

          await nextTick();
          const path = router.resolve({
            path: '/downloadmanage',
            query: {
              app_code: resData?.result?.appCode,
              module_code: resData?.result?.moduleCode,
              record_type: 2,
            },
          });
          openWindow(path.href);
        } catch (e) {
          ElMessage.warning(`下载失败${e.message},请联系系统管理员`);
        }
      } else if (item?.linkType === 1 && url?.startsWith(window.location.origin)) {
        router.push(url?.split(window.location.origin)[1]);
      } else {
        openWindow(url);
      }
    } else if (item.reportCode) {
      openWindow(`/dynamicTableData?reportCode=${item.reportCode}`);
    } else {
      ElMessage.warning('报表未发布');
    }
  };

  // 自定义报表权限相关
  const reportDrawer = ref(false);
  const applyForm = ref({
    requirementDetails: '',
    useToDesc: '',
    remark: '',
  });
  const applyFormRef = ref();

  const cancelForm = () => {
    applyFormRef.value.resetFields();
    reportDrawer.value = false;
  };
  // 提交报表申请
  const saveReport = async () => {
    const valid = await applyFormRef.value?.validate().catch(() => false);
    if (valid) {
      datamarketApi
        .luteosDatamarketReportApplyForReport({
          currentMemberCode: userInfo.memberCode,
          requirementDetails: applyForm.value.requirementDetails,
          useToDesc: applyForm.value.useToDesc,
        })
        .then(() => {
          ElMessage.success('提交成功');
          reportDrawer.value = false;
          queryReportList();
        });
    }
  };
  //   申请权限相关逻辑
  const curReport = ref({});
  const applyAuthDrawer = ref(false);
  const applyAuth = (row) => {
    curReport.value = row;
    applyAuthDrawer.value = true;
  };
  // 取消申请
  const cancelApplyForm = () => {
    applyFormRef.value.resetFields();
    applyAuthDrawer.value = false;
  };

  // 提交申请权限
  const saveApply = async () => {
    const valid = await applyFormRef.value?.validate().catch(() => false);
    if (valid) {
      datamarketApi
        .luteosDatamarketReportApplyForAuth({
          currentMemberCode: userInfo.memberCode,
          remark: applyForm.value.remark,
          reportCode: curReport.value.reportCode,
        })
        .then(() => {
          ElMessage.success('提交成功');
          applyAuthDrawer.value = false;
          queryReportList();
        });
    }
  };

  const pageWrapRef = ref(null);
  const reportListWidth = ref('auto');
  onMounted(async () => {
    await nextTick();
    useResizeObserver(pageWrapRef.value, () => {
      const itemWidth = 380 + 16;
      const max = Math.floor((pageWrapRef.value.offsetWidth - 32) / itemWidth);
      reportListWidth.value = `${max * itemWidth}px`;
    });
  });
</script>

<style scoped lang="scss">
  .layout-content {
    background-color: #f9f9f9 !important;
  }

  .page_wrap {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  .report-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    .report-item {
      padding: 20px 0;

      .report-group-title {
        margin-bottom: 8px;

        color: #1E2226;

        /* 重要/Medium 16 */
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
      }

      .report-card {
        width: 380px;
        height: 128px;
        background: #ffffff;
        padding: 20px;
        box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: transform 0.3s ease;
        font-size: 16px !important;
        position: relative;
        border-radius: 12px;
        border: 1px solid #dfe2e6;
        display: flex;
        gap: 16px;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
          //box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.1);
        }

        .report-img {
          width: 32px;
          height: 32px;
          min-width: 32px !important;
          min-height: 32px !important;
          margin: auto 0;
          border-radius: 8px;
        }

        .report-card-content {
          min-height: 88px;
          padding: 10px 0;
          flex: 1;
        }
      }
    }
  }

  .lock {
    background: url('@/assets/images/icon/lock.svg') no-repeat 270px 90px;
    background-color: #ffffff;
    background-size: 5%;
  }

  .download {
    background: url('@/assets/images/icon/download.svg') no-repeat 270px 90px;
    background-color: #ffffff;
    background-size: 5%;
  }

  .col-xl-3 {
    width: 20% !important;
    position: relative;
    min-width: 300px;
    cursor: pointer;
  }

  .col-border {
    border-radius: 5px;
  }

  .tag-overflow {
    border-radius: 3px;
    position: absolute;
    right: 0;
    top: 0;
    width: 32px;
    height: 16px;
    font-size: 12px;
  }

  .report-model {
    margin-bottom: -10px;
    margin-top: 20px;
  }

  .report-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    color: #1E2226;
    margin-bottom: 4px;

    /* 重要/Regular 16 */
    font-family: "PingFang SC";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }

  .report-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;

    color: #8A9099;

    /* 较弱/Regular 12 */
    font-family: "PingFang SC";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }

  .view-btn-wrap {
    margin-left: -10px;
    margin-bottom: 20px;
    padding-bottom: 0;

    .el-button {
      width: 80px;
      height: 28px;
    }
  }

  .report-mask {
    position: absolute;
    top: 0;
    left: 15px;
    right: 15px;
    bottom: 0;
    background: #3b3737;
    opacity: 0.1;
    border-radius: 8px;
    cursor: pointer;
  }

  .drawer__footer {
    position: absolute;
    right: 20px;
  }

  .cancel-btn {
    margin-right: 10px;
  }

  .card-header {
    padding-left: 1.5rem;
  }
</style>
