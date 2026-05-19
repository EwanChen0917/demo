<template>
  <KeenToolbarActions>
    <el-button type="primary" size="small" @click="handleEdit" v-permission="'agencyedit'">
      编辑
    </el-button>
  </KeenToolbarActions>
  <div class="my-flex">
    <KeenFlex>
      <KeenFlex>
        <template #auto>
          <div class="card">
            <div class="card-body pt-15">
              <div class="d-flex flex-center flex-column mb-5">
                <div class="symbol symbol-100px symbol-circle mb-7">
                  <EleAvator
                    :url="detail.avatar"
                    isHandleError="true"
                    :name="detail.cooperateBy"
                    :styleObj="{ width: '100px', height: '100px' }"
                  />
                </div>
                <div class="fw-bold flex_center mb_2">
                  <span class="line_normal text-center">{{ detail.agcName }}</span>
                </div>
                <div class="fs-8 text-gray-400 text-center">
                  <Tag
                    size="large"
                    color="blue"
                    style="margin-right: 5px; margin-top: 5px"
                    v-for="item in detail.tags"
                    :key="item"
                  >
                    {{ getLabelDesc(item) }}
                  </Tag>
                </div>
              </div>
              <div class="separator separator-dashed my-3"></div>
              <div class="collapse show">
                <div class="py-5 fs-6">
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">资源链接</span>
                  </div>
                  <div class="fs-8 text-gray-400">
                    <el-link
                      class="line_normal"
                      v-if="detail.resourceLink"
                      type="primary"
                      :href="detail.resourceLink"
                      target="_blank"
                    >
                      {{ detail.resourceLink }}
                    </el-link>
                    <span v-else>暂无信息</span>
                  </div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">资源分类</span>
                  </div>
                  <div class="fs-8 text-gray-400">
                    <span>{{ detail.firstCategoryName || '--' }}</span>
                    <span>-{{ detail.secondCategoryName || '--' }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">一句话简介</span>
                  </div>
                  <div class="fs-8 text-gray-400">{{ detail.intro || '暂无信息' }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">联系邮箱</span>
                  </div>
                  <div class="fs-8 text-gray-400">{{ detail.contactEmail || '暂无信息' }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">联系方式</span>
                  </div>
                  <div class="fs-8 text-gray-400">{{ detail.contactPhone || '暂无信息' }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">国家/地区</span>
                  </div>
                  <div class="fs-8 text-gray-400">{{ detail.cr || '暂无信息' }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">介绍附件</span>
                  </div>
                  <div class="fs-8 text-gray-400">
                    <template v-if="detail.attachments && detail.attachments.length">
                      <Tag
                        color="black"
                        v-for="file of detail.attachments"
                        :key="file.fileName"
                        class="file-tag"
                        @click="download(file.filePath, file.fileName)"
                      >
                        <el-icon>
                          <Document />
                        </el-icon>
                        {{ file.fileName }}
                      </Tag>
                    </template>
                    <span v-else>暂无信息</span>
                  </div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">补充说明</span>
                  </div>
                  <div class="fs-8 text-gray-400">{{ detail.extExplain || '暂无信息' }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #fluid>
          <detailCard title="资源评估" class="card-wrap">
            <span class="fw-bold flex_center mb_2">报价评估</span>
            <span class="fs-8 text-gray-400 d-block">{{ detail.valuation || '--' }}</span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">过往合作事项</span>
            <span class="fs-8 text-gray-400 d-block">
              {{ detail.historyContent || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">专业评估</span>
            <span class="fs-8 text-gray-400 d-block">
              评分：
              <el-rate
                v-if="detail.professionalScore"
                v-model="detail.professionalScore"
                disabled
                allow-half
              />
              <span v-else>--</span>
            </span>
            <span class="fs-8 text-gray-400 d-block">
              评价：
              {{ detail.professionalScoreComment || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">服务响应评估</span>
            <span class="fs-8 text-gray-400 d-block">
              评分：
              <el-rate
                v-if="detail.serviceScore"
                v-model="detail.serviceScore"
                disabled
                allow-half
              />
              <span v-else>--</span>
            </span>
            <span class="fs-8 text-gray-400 d-block">
              评价：
              {{ detail.serviceScoreComment || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">合作关系评估</span>
            <span class="fs-8 text-gray-400 d-block">
              评分：
              <el-rate
                v-if="detail.cooperateScore"
                v-model="detail.cooperateScore"
                disabled
                allow-half
                text-color="#ff9900"
              />
              <span v-else>--</span>
            </span>
            <span class="fs-8 text-gray-400 d-block">
              评价：
              {{ detail.cooperateScoreComment || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">人群画像评估评估</span>
            <span class="fs-8 text-gray-400 d-block">
              {{ detail.crowdPortraitComment || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>

            <span class="fw-bold flex_center mb_2">其他合作建议</span>
            <span class="fs-8 text-gray-400 d-block">
              {{ detail.suggest || '--' }}
            </span>
            <div class="separator separator-dashed my-3"></div>
          </detailCard>
          <detailCard title="操作日志" class="card-wrap operate-log">
            <div v-for="(item, index) in showOperateLogs" :key="index">
              <span class="primary-color">{{ item.createTime + ' ' }}</span>
              <span class="primary-color fw-bold">{{ item.operator + ' ' }}</span>
              <span class="fs-8 text-muted">{{ item.content + ' ' }}</span>
              <div class="separator separator-dashed my-3"></div>
            </div>
            <div class="pagination" v-if="operateLogs.length">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="operateLogs.length"
                @current-change="currentChange"
                @prev-click="currentChange"
                @next-click="currentChange"
              />
            </div>
            <div v-else>暂无数据</div>
          </detailCard>
        </template>
      </KeenFlex>
      <!-- 订单列表 -->
    </KeenFlex>
  </div>
</template>

<script setup lang="ts" name="agencydetail">
  import { metaApi, platformApi } from '@/api/index';
  import Tag from '@/components/Tag/index.vue';
  import { download } from '@/utils/download';
  import { Document } from '@element-plus/icons-vue';

  const route = useRoute();
  const router = useRouter();
  const detail = ref({});
  const searchInfo = sessionStorage.getItem('agencySearchInfo') ?? '{}';
  const agcCode = route.query.code;

  onMounted(() => {
    queryDetail();
    queryOperateLogs();
  });

  const queryDetail = async () => {
    const res: any = await metaApi.luteosMetaAgencyInfo({ code: agcCode || '' });
    detail.value = res || {};
  };

  const operateLogs = ref([]);
  const showOperateLogs = ref([]);
  const queryOperateLogs = () => {
    metaApi
      .luteosMetaAgencyOperationLogList({
        agcCode,
      })
      .then((res) => {
        operateLogs.value = res || [];
        showOperateLogs.value = operateLogs.value.slice(0, 6);
      });
  };

  const labelOptions = ref([]);
  const queryLabelList = () => {
    platformApi
      .platformLabelQueryLabelList({
        module: 'agency',
        pageNum: 1,
        pageSize: 100,
        status: 1,
      })
      .then((res) => {
        if (+res.code === 200) {
          labelOptions.value = res.labelInfoList;
        }
      });
  };
  queryLabelList();

  const getLabelDesc = (val) => {
    return (labelOptions.value.find((item: any) => item.labelCode === val) || {}).name || '';
  };

  const currentChange = (val) => {
    showOperateLogs.value = operateLogs.value.slice((val - 1) * 6, val * 6);
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('agencySearchInfo')) sessionStorage.removeItem('agencySearchInfo');
  });

  const goBack = () => {
    router.push({
      name: 'agencylist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  const handleEdit = () => {
    router.push(`/agency/edit?code=${route.query.code}`);
  };
</script>

<style scoped lang="scss">
  .my-flex {
    :deep(.flex-lg-row-auto) {
      background: #ffffff;
    }
  }

  .line_normal {
    display: block;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-center {
    text-align: center;
  }

  .card-wrap {
    :deep(.card-content) {
      overflow: hidden;
      padding-left: 2rem !important;
    }

    :deep(.el-rate__decimal) {
      color: #f7ba2a;
    }

    .separator {
      width: 120%;
      margin-left: -30px;
    }

    margin-bottom: 0;
  }

  .operate-log {
    margin-top: -10px;
  }

  .file-tag {
    margin-right: 5px;
  }

  .mt-5 {
    margin-top: 2rem !important;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .primary-color {
    color: #3e97ff;
  }
</style>
