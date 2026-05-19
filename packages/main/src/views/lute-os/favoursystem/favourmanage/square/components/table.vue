<template>
  <el-table
    ref="tableRef"
    v-loading="listLoading"
    :data="listData"
    row-key="userCode"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="40" reserve-selection />
    <el-table-column label="红人信息" min-width="300px">
      <template #default="{ row }">
        <div class="avator_wrap">
          <div class="avator_left">
            <EleAvator :url="row.avatar" :isHandleError="true" :name="row.channelAccount" />
          </div>
          <div class="avator_right">
            <ElTooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top"
              effect="light"
              :content="row.channelAccount"
              :disabled="row.channelAccount.length <= 24"
            >
              <div>
                <span
                  class="avator_name over_elli fs-4 text-gray-800 text-hover-primary mb-1 cursor-pointer"
                  @click="
                    router.push({
                      path: '/square/detail',
                      query: { code: encryptByBase64(row.userCode), status: row.status },
                    })
                  "
                >
                  {{ row.channelAccount }}
                </span>
                <i
                  class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                  @click="copyFn(row.channelAccount, '账号')"
                ></i>
              </div>
            </ElTooltip>
            <ElTooltip
              popper-class="action_tool_tip"
              placement="top"
              effect="light"
              :content="row.email"
              :disabled="row.email.length <= 28"
            >
              <div class="avator_desc over_elli fs-9">
                {{ row.email }}
                <i
                  v-if="row.email"
                  class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                  @click="copyFn(row.email, '邮箱')"
                ></i>
              </div>
            </ElTooltip>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="国家" prop="country">
      <template #default="scope">
        <div class="symbol symbol-50px">
          <ElTooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :disabled="!scope.row.country"
            :content="scope.row.country"
          >
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.country || '--' }}</span>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="渠道" min-width="100px">
      <template #default="{ row }">
        <!--        <div>{{ row.channelList?.map((item) => item.channelCode)?.join(',') || '&#45;&#45;' }}</div>-->
        <el-space>
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            v-for="logo in row.channelCodeList"
            :key="logo"
            effect="light"
            placement="top"
            :content="logo"
          >
            <img :src="getImg(logo)" class="channel-img" />
          </el-tooltip>
        </el-space>
      </template>
    </el-table-column>
    <el-table-column label="粉丝总数" prop="fansNum" min-width="100px">
      <template #default="{ row }">
        <div class="fs-7">{{ row.fansNum?.toLocaleString() }}</div>
      </template>
    </el-table-column>
    <el-table-column label="粉丝总量级" prop="fansLevel" min-width="100px">
      <template #default="{ row }">
        <div class="fs-7">{{ row.fansLevel }}</div>
      </template>
    </el-table-column>
    <el-table-column label="红人类型" min-width="130px">
      <template #default="scope">
        <div v-if="scope.row.featureList && scope.row.featureList.length">
          <template v-for="(item, index) in scope.row.featureList" :key="index">
            <Tag color="blue" class="label-tag">
              {{ item.featureName }}
            </Tag>
          </template>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="红人标签" min-width="130px">
      <template #default="scope">
        <div v-if="scope.row.labelList && scope.row.labelList.length">
          <template v-for="(item, index) in scope.row.labelList" :key="index">
            <Tag color="purple" class="label-tag">
              {{ item.name }}
            </Tag>
          </template>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="品牌推广" prop="brandTeamStatus">
      <template #default="{ row }">
        <Tag :color="row.brandTeamStatus === '合作中' ? 'green' : 'gray'">
          {{ row.brandTeamStatus }}
        </Tag>
      </template>
    </el-table-column>
    <el-table-column label="GTM推广" prop="gtmTeamStatus">
      <template #default="{ row }">
        <Tag :color="row.gtmTeamStatus === '合作中' ? 'green' : 'gray'">
          {{ row.gtmTeamStatus }}
        </Tag>
      </template>
    </el-table-column>
    <el-table-column label="小店推广" prop="shopTeamStatus">
      <template #default="{ row }">
        <Tag :color="row.shopTeamStatus === '合作中' ? 'green' : 'gray'">
          {{ row.shopTeamStatus }}
        </Tag>
      </template>
    </el-table-column>
    <el-table-column label="Comfelie推广" prop="comfelieTeamStatus" min-width="120px">
      <template #default="{ row }">
        <Tag :color="row.comfelieTeamStatus === '合作中' ? 'green' : 'gray'">
          {{ row.comfelieTeamStatus }}
        </Tag>
      </template>
    </el-table-column>
    <el-table-column label="录入人">
      <template #default="{ row }">
        <UserAvator :name="row.creatorName" :url="row.creatorAvatar" :title="row.creatorTitle" />
      </template>
    </el-table-column>
    <el-table-column label="时间信息" min-width="190px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">录入&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.recordDate }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">更新&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.updateTime }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="备注" min-width="100px">
      <template #default="scope">
        <div
          class="fw-semibold text-gray-600 fs-7"
          v-if="scope.row.remarkList && scope.row.remarkList?.length > 0"
        >
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            v-for="(item, index) in scope.row.remarkList"
            :key="index"
            :content="item?.remark"
            :disabled="item?.remark?.length < 5"
          >
            <div class="over_elli" style="">{{ item?.remark || '--' }}</div>
          </el-tooltip>
        </div>
        <span v-else>--</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="100px" fixed="right">
      <template #default="{ row }">
        <KeenActions
          display-style="buttons"
          :actions="[
            {
              label: '创建合作',
              key: 'creatCooperation',
              type: 'primary',
              text: true,
              disabled: row.labelList.some(
                (item) =>
                  item.name === '黑名单' ||
                  (item.childInfoList && item.childInfoList.some((i) => i.name === '黑名单'))
              ),
              row,
            },
            {
              label: '新增发样',
              key: 'send',
              type: 'primary',
              text: true,
              disabled: row.labelList.some(
                (item) =>
                  item.name === '黑名单' ||
                  (item.childInfoList && item.childInfoList.some((i) => i.name === '黑名单'))
              ),
              row,
            },
            {
              label: '合并账号',
              key: 'merge',
              text: true,
              row,
            },
          ]"
          @click="handleActions"
        />
      </template>
    </el-table-column>
  </el-table>
  <TipsDialog
    v-if="tipsVisible"
    :visible="tipsVisible"
    @close="tipsVisible = false"
    :data="emptyData"
  />
  <BindGoods
    ref="bindGoodsRef"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    confirmText="确定"
  />
  <FirstCooperateDialog
    v-if="firstCooperateVisible"
    :visible="firstCooperateVisible"
    @close="firstCooperateVisible = false"
    @save="handleSave"
  />
  <ChannelSelectDialog
    v-if="channelSelectVisible"
    :visible="channelSelectVisible"
    @close="handleChannelClose"
  />
  <Merge v-model:visible="mergeVisible" :row="currentRow" @refresh="refresh" />
</template>

<script lang="ts" setup>
  import { metaApi, memberApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { encryptByBase64 } from '@/utils/aesTils';
  import { ElMessage, ElTooltip } from 'element-plus';
  import Tag from '@/components/Tag/index.vue';
  import clipboard3 from 'vue-clipboard3';
  import EleAvator from '@/components/EleAvator/index.vue';
  import TipsDialog from '@/views/lute-os/favoursystem/favourmanage/square/components/tipsDialog.vue';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import FirstCooperateDialog from '@/views/lute-os/favoursystem/favourmanage/square/components/firstCooperateDialog.vue';
  import Merge from './Merge.vue';

  defineProps<{
    listData: Array<Object>;
    listLoading: Boolean;
  }>();
  const emit = defineEmits<{
    (event: 'refresh', reload?: boolean): void;
    (event: 'selectionChange', reload?: boolean): void;
  }>();
  const tableRef = ref();

  const userCode = ref('');

  const tipsVisible = ref<boolean>(false);
  const emptyData = ref();
  const router = useRouter();
  const bindGoodsRef = ref(null);
  const channelList = ref([]);
  const channelSelectVisible = ref(false);
  const handleChannelClose = async (reload, list) => {
    if (reload) {
      channelList.value = list.map((item) => item.channelCode);
      handleBindGoods();
    }
    channelSelectVisible.value = false;
  };

  //   按钮操作
  const handleActions = async (operation) => {
    const { key, row } = operation;
    userCode.value = row.userCode;
    if (key === 'send') {
      router.push({
        path: '/samplesend/influencerSend',
        query: {
          userCode: row.userCode,
          account: row.channelAccount,
        },
      });
    } else if (key === 'creatCooperation') {
      // 判断1、该红人国家是否为空；2、邮箱地址、联系方式是否都为空 。（两者都为空则都提示，其中一个为空不提示）
      if (!row.country || (!row.email && !row.contact)) {
        emptyData.value = row;
        tipsVisible.value = true;
      } else {
        channelSelectVisible.value = true;
      }
    } else if (key === 'merge') {
      handleMerge(row);
    }
  };

  const mergeVisible = ref(false);
  const currentRow = ref(null);
  function handleMerge(row: any) {
    if (!row.email) {
      ElMessage.warning('红人无邮箱信息, 不可合并');
      return;
    }
    mergeVisible.value = true;
    currentRow.value = row;
  }

  // 勾选商品
  const handleSelectionChange = (list) => {
    emit('selectionChange', list);
  };

  // 复制操作
  const { toClipboard } = clipboard3();

  const copyFn = async (str: string, desc: string) => {
    try {
      await toClipboard(str);
      ElMessage({
        type: 'success',
        message: `复制${desc}成功`,
        duration: 1 * 1000,
      });
    } catch (error) {
      ElMessage({
        type: 'error',
        message: `复制${desc}失败`,
        duration: 1 * 1000,
      });
    }
  };

  // 选择商品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsRef.value?.open();
    bindGoodsVisible.value = true;
  };
  const spuCodeList = ref([]);
  const firstCooperateVisible = ref(false);
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      spuCodeList.value = val?.map((item) => item.productSpu);
      // firstCooperateVisible.value = true;
      handleSave();
    } else {
      bindGoodsVisible.value = false;
    }
  };

  const handleSave = async () => {
    try {
      const res = await metaApi.luteosMetaSaveMetaProject({
        channelList: channelList.value,
        userCode: userCode.value,
        spuCodeList: spuCodeList.value,
      });
      ElMessage.success('创建成功');
      if (res?.projectCode) {
        router.push({
          path: '/cooperate/detail',
          query: {
            projectCode: res.projectCode,
          },
        });
      }
    } finally {
      bindGoodsVisible.value = false;
      firstCooperateVisible.value = false;
    }
  };

  function refresh() {
    emit('refresh', true);
  }

  const getImg = (name) => {
    return new URL(`/src/assets/images/logos/${name}.svg`, import.meta.url).href;
  };

  const clearTable = () => {
    tableRef.value.clearSelection();
  };
  defineExpose({
    clearTable,
  });
</script>

<style scoped lang="scss">
  .label-tag {
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .channel-img {
    width: 20px;
    height: 20px;
  }
</style>
