<template>
  <KeenFlex>
    <template #auto>
      <KeenCard>
        <div class="d-flex flex-center flex-column mb-5">
          <div class="symbol symbol-100px symbol-circle mb-7">
            <EleAvator
              :url="info.avatar"
              isHandleError="true"
              :name="info.channelAccount"
              :styleObj="{ width: '100px', height: '100px' }"
            />
          </div>
          <el-tooltip
            placement="top"
            effect="light"
            popper-class="action_tool_tip"
            :content="info.channelAccount"
            :disabled="info.channelAccount?.length < 20"
          >
            <div class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1 name_txt">
              {{ info.channelAccount }}
            </div>
          </el-tooltip>
          <div
            class="mb-9 d-flex gap-2 justify-content-center flex-wrap"
            v-if="labelNameList?.length"
          >
            <Tag size="small" color="green" v-for="(item, idx) in labelNameList" :key="idx">
              {{ item }}
            </Tag>
          </div>
          <div class="fs-7 text-gray-800 fw-bold mb-4 mt_8">各平台粉丝量</div>
          <div class="d-flex flex-wrap flex-center channel_wrap">
            <template v-if="info.channelList?.length > 0">
              <div
                v-for="(item, index) in info.channelList"
                :key="index"
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
                :class="{ 'mx-4': index == 1, 'cursor-pointer': item.channelHome }"
                @click="toChannelHome(item.channelHome)"
              >
                <div class="fs-4 fw-bold text-gray-700 text-center">
                  <span class="w-75px">{{ toThousands(item.fansNum) }}</span>
                  <!-- <span
                    class="svg-icon svg-icon-3"
                    :class="item.isRise ? 'svg-icon-success' : 'svg-icon-danger'"
                  >
                    <SvgIcon
                      :icon="item.isRise ? 'rise' : 'unRise'"
                      :class="item.isRise ? 'svg-icon-success' : 'svg-icon-danger'"
                    />
                  </span> -->
                </div>
                <div class="fw-semibold text-muted">{{ item.channelCode }}</div>
              </div>
            </template>
            <div class="fs-6 text-gray-400 name_txt" v-else>暂无数据</div>
          </div>
        </div>
        <div class="d-flex flex-stack fs-4 py-3">
          <div
            class="fw-bold rotate collapsible cursor-pointer"
            :class="showInfoFlag ? 'active' : 'collapsed'"
            @click="showDetail"
          >
            个人资料
            <span class="ms-2 rotate-180">
              <span class="svg-icon svg-icon-3">
                <SvgIcon icon="arrowDown" />
              </span>
            </span>
          </div>
          <span class="btn btn-sm btn-light-primary" @click="editInfo">编辑</span>
        </div>
        <div class="separator separator-dashed my-3"></div>
        <div v-if="showInfoFlag" class="collapse show">
          <div class="py-5 fs-6">
            <div class="fw-bold flex_center mb_2">
              <div class="wid_30">
                <SvgIcon icon="account" class="fn_18" />
              </div>
              <div class="line_normal">红人账号</div>
            </div>
            <template v-if="info.channelList?.length > 0">
              <div class="text-gray-600" v-for="(item, index) in info.channelList" :Key="index">
                <span class="text-gray-900">{{ item.channelCode }}</span>
                -
                {{ item.channelAccount }}
              </div>
            </template>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="special" class="fn_24" />
              </div>
              <span class="line_normal">红人类型</span>
            </div>
            <div class="text-gray-600">
              <template v-if="info.featureList?.length > 0">
                <div class="text-gray-600" v-for="(item, index) in info.featureList" :Key="index">
                  <span class="text-gray-900">{{ item.featureName }}</span>
                </div>
              </template>
              <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            </div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="email" class="fn_24" />
              </div>
              <span class="line_normal">红人邮箱</span>
            </div>
            <span v-if="info.email">{{ info.email }}</span>
            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="contact" class="fn_24 svg-icon-7" />
              </div>
              <span class="line_normal">联系方式</span>
            </div>
            <span v-if="info.contact">{{ info.contact }}</span>
            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="adress" class="fn_22" />
              </div>
              <span class="line_normal">通讯地址</span>
            </div>
            <div class="text-gray-600">
              <!-- <span v-if="info.country">{{ info.country }}</span> -->
              <div class="fs-8 text-gray-400">暂无信息</div>
            </div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="country" class="fn_18" />
              </div>
              <span class="line_normal">国家</span>
            </div>
            <span v-if="info.country">{{ info.country }}</span>
            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="time" class="fn_18" />
              </div>
              <span class="line_normal">日常size&更新时间</span>
            </div>
            <div v-if="info.dailySize">
              {{ info?.dailySize }}
            </div>
            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            <div v-if="info.dailySizeUpdateTime">
              {{ info?.dailySizeUpdateTime }}
            </div>

            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
            <div class="fw-bold flex_center mt-5 mb_2">
              <div class="wid_30">
                <SvgIcon icon="edit" class="fn_18" />
              </div>
              <span class="line_normal">录入人</span>
            </div>
            <span v-if="info.creatorName">{{ info.creatorName }}</span>
            <div class="fs-8 text-gray-400" v-else>暂无信息</div>
          </div>
        </div>
      </KeenCard>
    </template>
    <template #fluid>
      <div class="d-flex justify-content-between">
        <ul
          class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-4"
        >
          <li
            class="nav-item"
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(index)"
          >
            <span
              class="nav-link text-active-primary pb-4"
              :class="{ active: tabCurrent == index }"
            >
              {{ item }}
            </span>
          </li>
        </ul>
      </div>
      <div v-if="tabCurrent == 0">
        <Channel :userCode="userCode" @save="getUserInfo(userCode)"/>
      </div>
      <div v-if="tabCurrent == 1">
        <Cooperate />
      </div>

      <div v-if="tabCurrent == 2">
        <Log :userCode="userCode" />
      </div>
    </template>
  </KeenFlex>

  <EditInfoM
    v-if="editVisible"
    :visible="editVisible"
    :title="modalTitle"
    :info="info"
    @close-modal="editModalClose"
  />
  <SelectBrandDialog
    v-if="selectVisible"
    :visible="selectVisible"
    :brand-list="brandList"
    @close="selectVisible = false"
    @save="handleSave"
  />
</template>

<script setup lang="ts" name="favourdetail">
  import { ElMessage, ElTooltip } from 'element-plus';
  import EleLetter from '@/components/EleAvator/letter.vue';
  import { toThousands } from '@/utils/toThousands';
  import { queryUserInfo, operateUser } from '@/apis/favourProject';
  import { decryptByBase64 } from '@/utils/aesTils';
  import ToolBar from '@/components/DetailToolBar/index.vue';
  import { metaApi, platformApi } from '@/api';
  import { MetaUserBrandBean } from '@/api/meta/data-contracts';
import SelectBrandDialog from '@/views/lute-os/favoursystem/favourmanage/square/components/selectBrandDialog.vue';
  import { openWindow } from '@/utils';
  import EditInfoM from './Modal/editInfo.vue';
  import Log from './part/log.vue';
  import Cooperate from './part/cooperate.vue';
  import Channel from './part/channel.vue';

  const state = reactive<{
    info: any;
    showInfoFlag: boolean;
    tabCurrent: number;
    dayCurrent: number;
    userCode: string;
    editVisible: boolean;
    modalTitle: string;
    rowStatus: number;
    confirmType: number;
  }>({
    info: {},
    showInfoFlag: true,
    tabCurrent: 0,
    dayCurrent: 0,
    userCode: '',
    editVisible: false,
    modalTitle: '',
    rowStatus: 0,
    confirmType: 0,
  });
  const {
    info,
    showInfoFlag,
    tabCurrent,
    dayCurrent,
    userCode,
    editVisible,
    modalTitle,
    rowStatus,
    confirmType,
  } = toRefs(state);

  const route = useRoute();

  const labelNameList = ref([]);
  const getUserInfo = (userCode: string) => {
    labelNameList.value = [];
    return queryUserInfo({ userCode }).then((res) => {
      if (res.code == 200) {
        info.value = { ...res.result };
        if (info.value?.labelList) {
          info.value?.labelList.forEach((item) => {
            if (item.childInfoList?.length > 0) {
              item.childInfoList.forEach((childItem) => {
                labelNameList.value.push(childItem.name);
              });
            } else labelNameList.value.push(item.name);
          });
        }
        if (route?.query?.edit) {
          editInfo();
        }
      }
    });
  };

  if (route?.query?.code) {
    tabCurrent.value = 1;
    const code = decryptByBase64(route.query.code as string);
    userCode.value = code;
    getUserInfo(userCode.value);
  }

  const showDetail = () => {
    showInfoFlag.value = !showInfoFlag.value;
  };
  const tabList = ['红人渠道表', '合作事项', '操作日志'];
  const changeTab = (index: number) => {
    if (tabCurrent.value != index) {
      tabCurrent.value = index;
    }
  };

  const dayChange = (index: number) => {
    if (dayCurrent.value != index) {
      dayCurrent.value = index;
    }
  };

  // 设置当前日程
  const setDayCurrent = () => {
    // const index = info.value.stokeList.findIndex((item: any) => item.isCurrent);
    // dayCurrent.value = index || 0;
  };
  setDayCurrent();
  const currentStorck = computed(() => {
    // const dayInfo = info.value.stokeList.find((item: any) => item.isCurrent);
    // return dayInfo.children || [];
  });

  const editInfo = () => {
    modalTitle.value = '编辑红人信息';
    editVisible.value = true;
  };

  const editModalClose = async (r?: 'reload') => {
    if (r == 'reload') {
      route.query.edit = false;
    }
    await getUserInfo(userCode.value);
    editVisible.value = false;
  };

  const selectVisible = ref<boolean>(false);
  const router = useRouter();

  const handleSave = async (val) => {
    await metaApi.luteosMetaOperateUser({
      operateType: 5,
      userCode: userCode.value,
      brandCodeList: [val],
    });
    ElMessage.success('添加合作品牌成功！');
    selectVisible.value = false;
    getUserInfo(userCode.value);
  };

  const currentChange = (val) => {
    // showOperateLogs.value = operateLogs.value.slice((val - 1) * 6, val * 6);
  };

  const brandList = ref<MetaUserBrandBean[]>([]);
  const getBrandList = async (operateType) => {
    const res = await metaApi.luteosMetaQueryBrandList({
      userCode: userCode.value,
      operateType,
    });
    brandList.value = res.brandList || [];
  };

  const goBack = () => {
    router.back();
  };

  const toChannelHome = (url) => {
    if (url) openWindow(url);
  };
</script>

<style scoped lang="scss">
  .bg_f9f9f9 {
    background-color: #f9f9f9;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .bg_fff {
    background-color: #fff;
  }

  .name_txt {
    width: 60%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tag_label {
    width: 70%;
    justify-content: center;
  }

  .mt_8 {
    margin-top: 8px;
  }

  .mr_10 {
    margin-right: 10px;
  }

  .nav-item {
    cursor: pointer;
  }

  .channel_wrap {
    min-height: 60px;
  }

  .plat_time {
    color: #a1a5b7;
    font-size: 0.95rem;
    align-self: flex-end;
  }

  .just_space {
    justify-content: space-between;
  }

  .storck_wrap {
    min-height: 300px;
  }

  .nav_btn_wrap {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
