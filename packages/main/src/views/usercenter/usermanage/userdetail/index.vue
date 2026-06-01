<template>
  <KeenFlex>
    <KeenFlex>
      <template #auto>
        <div class="card">
          <div class="card-body pt-15">
            <div class="d-flex flex-center flex-column mb-5">
              <div class="symbol symbol-100px symbol-circle mb-7">
                <EleAvator
                  :url="userInfo.avatar"
                  isHandleError="true"
                  :name="userInfo.firstName"
                  :styleObj="{ width: '100px', height: '100px' }"
                />
              </div>
              <div class="fs-3 text-gray-800 fw-bold mb-1 name_txt">
                {{ userInfo.firstName + ' ' + userInfo.lastName }}
              </div>
            </div>
            <div class="separator separator-dashed my-3"></div>
            <div class="collapse show">
              <div class="py-5 fs-6">
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">用户ID</span>
                  <span class="text-gray-600">{{ userInfo.uid }}</span>
                </div>

                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">邮箱</span>
                  <span class="text-gray-600">{{ userInfo.email }}</span>
                </div>

                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">登录密码</span>
                  <span class="text-gray-600">
                    <span>******</span>
                    <el-icon size="16" class="text-hover-primary" @click="showEditPwdDialog">
                      <Edit />
                    </el-icon>
                  </span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">注册平台</span>
                  <span class="text-gray-600">{{ userInfo.registerChannelDesc }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">平台ID</span>
                  <span class="text-gray-600">{{ userInfo.registerChannel }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">注册时间</span>
                  <span class="text-gray-600">{{ userInfo.registerTime }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">国家</span>
                  <span class="text-gray-600">{{ userInfo.countryName }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">手机号码</span>
                  <span class="text-gray-600">{{ userInfo.phone }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">怀孕/哺乳阶段</span>
                  <span class="text-gray-600" style="display: flex; align-items: center">
                    {{ userInfo.lactationDesc }}
                    <el-icon size="16" class="text-hover-primary" @click="showEditLactationDialog">
                      <Edit />
                    </el-icon>
                  </span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">会员等级</span>
                  <span class="text-gray-600">{{ userInfo.memberLevel }}</span>
                </div>
                <div class="fw-bold flex_center mt-5 mb_2 my-flex">
                  <span class="line_normal">积分</span>
                  <span class="text-gray-600">{{ userInfo.memberPoint }}</span>
                </div>
                <div class="fw-bold flex_top mt-5 mb_2 my-flex">
                  <span class="line_normal">用户标签</span>
                  <span class="text-gray-600">
                    <template v-if="userInfo?.tagList?.length">
                      <div style="max-height: 250px; overflow: auto">
                        <div
                          style="margin-bottom: 8px"
                          v-for="item of userInfo.tagList"
                          :key="item.groupCode"
                        >
                          <el-tag
                            :title="`${item.groupName}:${item.tagName}`"
                            class="ml-2"
                            type="info"
                            closable
                            @close="handleClose(item)"
                          >
                            {{ item.groupName }} : {{ item.tagName }}
                          </el-tag>
                        </div>
                      </div>
                      <el-icon
                        size="16"
                        style="vertical-align: middle"
                        class="text-hover-primary"
                        @click="
                          () => {
                            selectTagDialogRef?.open();
                          }
                        "
                      >
                        <Edit />
                      </el-icon>
                    </template>
                    <template v-else>
                      无
                      <el-icon
                        style="vertical-align: middle"
                        size="16"
                        class="text-hover-primary"
                        @click="
                          () => {
                            selectTagDialogRef?.open();
                          }
                        "
                      >
                        <Edit />
                      </el-icon>
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BabyList />
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="收货地址" :name="0">
            <Addresstable v-if="tabCurrent === 0" />
          </el-tab-pane>
          <el-tab-pane label="积分记录" :name="1">
            <PointRecords v-if="tabCurrent === 1" />
          </el-tab-pane>
          <el-tab-pane label="优惠券/礼品卡" :name="2">
            <CouponList v-if="tabCurrent === 2" />
          </el-tab-pane>
          <el-tab-pane label="设备管理" :name="3">
            <Servicetable v-if="tabCurrent === 3" />
          </el-tab-pane>
          <!-- <el-tab-pane label="行为记录" :name="4">
            <ActionTable v-if="tabCurrent === 4" />
          </el-tab-pane> -->
        </el-tabs>
      </template>
    </KeenFlex>
    <!-- 订单列表 -->
    <Ordertable />
  </KeenFlex>
  <ModifyPwdModal :visible="modifyVisible" @close="modifyVisible = false" />
  <SelectTagDialog
    :uids="[route.query.uid as string]"
    ref="selectTagDialogRef"
    @success="queryUserDetail"
  />
  <ChangeLactationDialog
    :uid="(route.query.uid as string)"
    ref="changeLactationDialogRef"
    @success="queryUserDetail"
  />
</template>

<script setup lang="ts" name="userdetail">
  import { Edit } from '@element-plus/icons-vue';
  import { userApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import Addresstable from './table/addresstable/index.vue';
  import Servicetable from './table/servicetable/index.vue';
  import Ordertable from './table/ordertable/index.vue';
  import ActionTable from './table/actionTable/index.vue';
  import ModifyPwdModal from './modal/modifypwd.vue';
  import PointRecords from './components/pointRecords.vue';
  import CouponList from './components/couponList.vue';
  import BabyList from './components/babyList.vue';
  import SelectTagDialog from '../userlist/components/selectTagDialog.vue';
  import ChangeLactationDialog from './modal/changeLactationDialog.vue';

  const changeLactationDialogRef = ref();
  const selectTagDialogRef = ref();
  const route = useRoute();
  const router = useRouter();
  const tabCurrent = ref(0);
  const userInfo = ref({});
  const modifyVisible = ref(false);
  const searchInfo = sessionStorage.getItem('userSearchInfo') ?? '{}';

  const showEditPwdDialog = () => {
    modifyVisible.value = true;
  };
  const showEditLactationDialog = () => {
    changeLactationDialogRef.value.open();
  };
  onMounted(() => {
    queryUserDetail();
  });

  const queryUserDetail = async () => {
    const res = await userApi.luteosUserQueryUserInfo({ uid: route.query.uid || '' });
    userInfo.value = res;
  };
  onUnmounted(() => {
    if (sessionStorage.getItem('userSearchInfo')) sessionStorage.removeItem('userSearchInfo');
  });

  const goBack = () => {
    router.push({
      name: route.query.isSub && +route.query.isSub === 1 ? 'subscriberlist' : 'userlist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };
  const handleClose = async (tag) => {
    const res = await userApi.luteosUserClearUserTag({
      uid: route.query.uid,
      tagCode: tag.tagCode,
    });
    if (res) {
      ElMessage.success('操作成功');
      queryUserDetail();
    }
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

  .nav-item {
    cursor: pointer;
  }

  .my-flex {
    display: flex;
    justify-content: space-between;
  }

  .text-hover-primary {
    cursor: pointer;
  }

  :deep(.el-tag__content) {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
