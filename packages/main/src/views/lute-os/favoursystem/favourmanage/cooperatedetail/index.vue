<template>
  <div class="page_wrap">
    <div class="card mb-6 mb-xl-9">
      <div class="card-body pt-9 pb-0">
        <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div class="d-flex flex-wrap">
                <EleAvator
                  :url="projectDetail.userAvatar"
                  isHandleError="true"
                  :name="projectDetail.userName"
                  :styleObj="{ width: '50px', height: '50px' }"
                />
                <div class="user-info">
                  <span class="text-gray-800 fs-2 fw-bold me-3">{{ projectDetail.userName }}</span>
                  <span class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                    {{ projectDetail.email }}
                  </span>
                </div>
                <div v-for="(item,index) in statusList" :key="index" style="margin-right: 5px;">
                  <Tag
                    size="large"
                    :color="
                      (statusObj[item.status] && statusObj[item.status].color) ||
                      'gray'
                    "
                  >
                    {{ item.desc }}
                  </Tag>
                </div>
              </div>
            </div>
            <div class="d-flex flex-wrap justify-content-start">
              <div class="d-flex flex-wrap">
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <div class="d-flex align-items-center">
                    <div class="fs-6 text-gray-800 fw-bold">{{ projectDetail.memberName }}</div>
                  </div>
                  <div class="fw-semibold text-gray-400">合作人</div>
                </div>
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  v-if="projectDetail.startTime"
                >
                  <div class="d-flex align-items-center">
                    <div class="fs-6 text-gray-800 fw-bold">
                      {{ dealTime(projectDetail.startTime) }}
                    </div>
                  </div>
                  <div class="fw-semibold text-gray-400">开始时间</div>
                </div>
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                  v-if="projectDetail.endTime"
                >
                  <div class="d-flex align-items-center">
                    <div class="fs-6 text-gray-800 fw-bold">
                      {{ dealTime(projectDetail.endTime) }}
                    </div>
                  </div>
                  <div class="fw-semibold fs-6 text-gray-400">结束时间</div>
                </div>
              </div>
            </div>
            <div class="d-flex gap-4 align-items-center">
              <div>
                合作产品：
                <span>{{ productListDesc || '--' }}</span>
              </div>

              <Edit class="edit-icon" @click="handleBindGoods" />
            </div>
            <div v-if="cooperationEdit" class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作费用：
                <el-input
                  placeholder="请输入合作费用"
                  class="w-200px me-2"
                  v-model="cooperationCosts"
                />
                <CurrencySelect class="w-200px" v-model="cooperationCostsCurrency" />
              </div>
              <div>
                <el-button @click="cooperationEdit = false">取消</el-button>
                <el-button type="primary" @click="handleSaveCooperation">保存</el-button>
              </div>
            </div>
            <div v-else class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作费用：
                <span>{{ projectDetail?.cooperationCosts || '--' }}</span>
                <span class="text-gray-400">{{ projectDetail?.cooperationCostsCurrency }}</span>
              </div>
              <Edit class="edit-icon" @click="cooperationEdit = true" />
            </div>
            <div v-if="labelEdit" class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作标签：
                <el-cascader
                  v-model="labelCodeList"
                  :props="props"
                  clearable
                  collapse-tags
                  collapse-tags-tooltip
                />
              </div>
              <div>
                <el-button @click="labelEdit = false">取消</el-button>
                <el-button type="primary" @click="handleSaveLabel">保存</el-button>
              </div>
            </div>
            <div v-else class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作标签：
                <span
                  v-if="
                    projectDetail.labelList?.length &&
                    projectDetail.labelList[0]?.childInfoList?.length &&
                    projectDetail.labelList[0]?.childInfoList[0]?.childInfoList?.length
                  "
                >
                  <Tag
                    color="purple"
                    v-if="projectDetail?.labelList[0]?.childInfoList[0]?.childInfoList[0]?.name"
                  >
                    {{
                      projectDetail?.labelList[0]?.name +
                      ' / ' +
                      projectDetail?.labelList[0]?.childInfoList[0]?.name +
                      ' / ' +
                      projectDetail?.labelList[0]?.childInfoList[0]?.childInfoList[0]?.name
                    }}
                  </Tag>
                </span>
                <span v-else-if="projectDetail.labelList?.length">
                  <Tag color="purple" v-if="projectDetail?.labelList[0]?.childInfoList[0]?.name">
                    {{
                      projectDetail?.labelList[0]?.name +
                      ' / ' +
                      projectDetail?.labelList[0]?.childInfoList[0]?.name
                    }}
                  </Tag>
                  <Tag color="purple" v-else>
                    {{ projectDetail?.labelList[0]?.name }}
                  </Tag>
                </span>
                <span v-else>--</span>
              </div>
              <Edit class="edit-icon" @click="labelEdit = true" />
            </div>
            <div class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作品线：
                <span>{{ projectDetail?.projectLineStr || '--' }}</span>
              </div>
            </div>
            <div class="d-flex gap-4 align-items-center mt-3">
              <div>
                合作平台：
                <span>{{ channelListDesc }}</span>
              </div>

              <Edit class="edit-icon" @click="channelSelectVisible = true" />
            </div>
            <div class="d-flex gap-4 align-items-center mt-3">
              <div>
                是否团队内首次合作：
                <span v-if="projectDetail?.cooperationFirstFlag === 1">是</span>
                <span v-else-if="projectDetail?.cooperationFirstFlag === 0">否</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
          <div v-if="projectDetail.status === 2">
            <el-button type="primary" @click="editStatus">编辑合作事项状态</el-button>
          </div>
          <!--          <div
            class="form-save"
            v-if="projectDetail.finishAuth && [2].includes(projectDetail.status)"
          >
            <el-button type="primary" @click="endDialogVisible = true">完结合作</el-button>
          </div>-->
        </div>
        <div class="separator"></div>
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
          <li
            class="nav-item cursor-pointer"
            v-for="(item, index) in tabList"
            :key="index"
            @click="currentTab = index"
          >
            <span
              class="nav-link text-active-primary py-5 me-6"
              :class="{ active: currentTab == index }"
            >
              {{ item }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="row g-6 g-xl-9" v-if="currentTab === 0">
      <SampleSend :projectDetail="projectDetail" />
    </div>
    <div v-if="currentTab === 1">
      <Process :project-code="route.query.projectCode" :projectDetail="projectDetail" />
    </div>

    <div v-if="currentTab === 2">
      <!-- <Collectcode :projectDetail="projectDetail" /> -->
      <AmountInfo :projectDetail="projectDetail" />
    </div>

    <div v-if="currentTab === 3">
      <CooperateData
        :partnerDataList="projectDetail.partnerDataList"
        @refresh="queryDetail"
        @save="updateChannelList"
      />
    </div>

    <div v-if="currentTab === 4">
      <Feedback :projectDetail="projectDetail" />
    </div>
  </div>

  <EditStatusDialog ref="editStatusRef" @success="queryDetail" />

  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productBeanList"
    :brandCode="projectDetail.brandCode"
    confirmText="确认"
  />
  <ChannelSelectDialog
    v-if="channelSelectVisible"
    :visible="channelSelectVisible"
    @close="handleChannelClose"
    :selected-channels="channelList"
  />
</template>

<script setup lang="ts" name="cooperatedetail">
  import { metaApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import Tag from '@/components/Tag/index.vue';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import { Edit } from '@element-plus/icons-vue';
import EditStatusDialog from '@/views/lute-os/favoursystem/favourmanage/cooperatedetail/components/EditStatusDialog.vue';
  import SampleSend from './Modules/samplesend.vue';
  import Process from './Modules/process.vue';
  import CooperateData from './Modules/cooperatedata.vue';
  import Collectcode from './Modules/collectcode.vue';
  import Feedback from './Modules/feedback.vue';
  import AmountInfo from './Modules/amountinfo.vue';

  const route = useRoute();
  const tabList = ref(['合作寄样', '合作费⽤', '引⼊⾦额', '上线数据', '合作反馈']);
  const currentTab = ref(0);
  const statusObj = {
    2: {
      text: '进行中',
      color: 'purple',
    },
    5: {
      text: '顺利完结',
      color: 'green',
    },
  };

  const statusList = computed(() => {
    const list: any = []
    // 进行中，判断是否有子状态
    if (+projectDetail.value.status === 2) {
      if (projectDetail.value.shipStatus) {
        list.push({
          status: 2,
          desc: `${projectDetail.value.statusDesc}-${projectDetail.value.shipStatusDesc}`,
        })
      }
      if (projectDetail.value.publishStatus) {
        list.push({
          status: 2,
          desc: `${projectDetail.value.statusDesc}-${projectDetail.value.publishStatusDesc}`,
        })
      }
      if (projectDetail.value.payStatus) {
        list.push({
          status: 2,
          desc: `${projectDetail.value.statusDesc}-${projectDetail.value.payStatusDesc}`,
        })
      }
      // 为空，则展示进行中的状态，不展示子状态
      if (!list.length) {
        list.push({
          status: 2,
          desc: projectDetail.value.statusDesc,
        })
      }
      return list;
    }
    // 其余状态取后台返回
    return [{
      status: +projectDetail.value.status,
      desc: projectDetail.value.statusDesc,
    }];
  });

  const endDialogVisible = ref(false);
  const saveLoading = ref(false);
  const cooperationEdit = ref(false);
  const labelEdit = ref(false);
  const labelCodeList = ref([]);
  const cooperationCosts = ref();
  const cooperationCostsCurrency = ref();

  const form = ref({
    operateType: 4,
    projectCode: route.query.projectCode,
    finishReason: '',
    remark: '',
  });
  const formRef = ref();
  const save = () => {
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        metaApi
          .luteosMetaOperateMetaProject(form.value)
          .then((res) => {
            ElMessage.success('保存成功');
            endDialogVisible.value = false;
            form.value.finishReason = '';
            form.value.remark = '';
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const dealTime = (time: string) => {
    if (!time) return '';
    let str = '';
    const obj = {
      '01': '一月',
      '02': '二月',
      '03': '三月',
      '04': '四月',
      '05': '五月',
      '06': '六月',
      '07': '七月',
      '08': '八月',
      '09': '九月',
      '10': '十月',
      '11': '十一月',
      '12': '十二月',
    };
    const firstStr = time.split(' ')[0];
    str = `${obj[firstStr.slice(5, 7)]} ${firstStr.slice(8, 10)},${firstStr.slice(0, 4)}`;
    return str;
  };

  // 选择商品
  const bindGoodsVisible = ref(false);
  const productBeanList = ref([]);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      bindGoodsVisible.value = false;
      const spuCodeList: any = val.map((item) => item.productSpu);
      metaApi
        .luteosMetaOperateMetaProject({
          operateType: 1,
          projectCode: route.query.projectCode,
          spuCodeList,
        })
        .then(() => {
          productBeanList.value = val;
          projectDetail.value.productList = val;
          ElMessage.success('添加成功');
          queryDetail();
        });
    } else {
      bindGoodsVisible.value = false;
    }
  };

  const handleSaveCooperation = async () => {
    const res = await metaApi.luteosMetaOperateMetaProject({
      operateType: 6,
      projectCode: route.query.projectCode,
      cooperationCosts: cooperationCosts.value,
      cooperationCostsCurrency: cooperationCostsCurrency.value,
    });
    ElMessage.success('保存成功');
    cooperationEdit.value = false;
    queryDetail();
  };

  const handleSaveLabel = async () => {
    const res = await metaApi.luteosMetaOperateMetaProject({
      operateType: 7,
      projectCode: route.query.projectCode,
      labelCodeList: [labelCodeList.value[labelCodeList.value.length - 1]],
    });
    ElMessage.success('保存成功');
    labelEdit.value = false;
    queryDetail();
  };

  const productListDesc = computed(() => {
    if (productBeanList.value && productBeanList.value.length) {
      const list =
        productBeanList.value.map((item) => {
          return item.name;
        }) || [];
      return list.join('、');
    }
  });

  const channelSelectVisible = ref(false);
  const handleChannelClose = async (reload, list) => {
    if (reload) {
      await metaApi.luteosMetaUpdateProjectDetailChannel({
        channelList: list.map((item) => item.channelCode),
        projectCode: route.query.projectCode,
      });
      channelList.value = list;
    }
    channelSelectVisible.value = false;
  };

  const channelList = ref([]);
  const channelListDesc = computed(() => {
    if (channelList.value.length) {
      const list =
        channelList.value.map((item) => {
          return item.channelName || item.name;
        }) || [];
      return list.join('、');
    }
    return '--';
  });

  const updateChannelList = async (channels) => {
    const list = [...channels];
    channelList.value.forEach((item) => {
      if (!channels.includes(item.channelCode)) {
        list.push(item.channelCode);
      }
    });

    await metaApi.luteosMetaUpdateProjectDetailChannel({
      channelList: list,
      projectCode: route.query.projectCode,
    });
    queryDetail();
  };

  const projectDetail = ref({});
  const queryDetail = () => {
    metaApi
      .luteosMetaQueryMetaProjectDetail({
        projectCode: route.query.projectCode,
      })
      .then((res) => {
        projectDetail.value = res;
        labelCodeList.value = [
          res.labelList[0]?.labelCode,
          res.labelList[0]?.childInfoList[0]?.labelCode,
        ];
        if (projectDetail.value.productList && projectDetail.value.productList.length) {
          productBeanList.value = projectDetail.value.productList.map((item: any) => ({
            productSpu: `${item.productCode}`,
            name: `${item.productName}`,
          }));
        }
        channelList.value = res.channelList || [];
      });
  };

  const props = {
    lazy: true,
    checkStrictly: true,
    async lazyLoad(node, resolve) {
      const { level, value } = node;
      const res = await metaApi.luteosMetaQueryLabelList({
        pageNum: 1,
        pageSize: 500,
        module: 'project',
        labelCode: value,
      });
      const nodes = res?.labelInfoList?.map((item) => ({
        value: item.labelCode,
        label: item.name,
        leaf: level >= 2,
      }));
      resolve(nodes);
    },
  };

  const editStatusRef = ref(null);
  const editStatus = () => {
    editStatusRef.value.open({
      projectCode: route.query.projectCode,
    });
  };

  onMounted(() => {
    queryDetail();
  });
</script>

<style scoped lang="scss">
  .page_wrap {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
  }

  .user-info {
    margin-left: 10px;
    margin-right: 40px;
    margin-bottom: 20px;
  }

  .edit-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
</style>
