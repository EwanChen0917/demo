<template>
  <el-table ref="tableRef" v-loading="listLoading" :data="listData" row-key="metaMarkCode">
    <el-table-column type="selection" min-width="40" align="center" reserve-selection />
    <el-table-column label="折扣码信息" min-width="180px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">折扣码&nbsp;</span>
            <span class="fw-semibold text-success">{{ scope.row.markCode }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">折扣力度&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.taskDiscount || '--' }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="折扣码状态">
      <template #default="scope">
        <div>
          <Tag size="large" :color="statusObj[scope.row.status].color" :key="item">
            {{ statusObj[scope.row.status].text }}
          </Tag>
        </div>
      </template>
    </el-table-column>

    <!--    <el-table-column label="销售平台" prop="platformName" />-->

    <el-table-column label="商品信息" min-width="120px">
      <template #default="scope">
        <div v-if="scope.row.productInfoList && scope.row.productInfoList.length">
          <template v-for="(item, index) in scope.row.productInfoList" :key="index">
            <div class="fw-semibold text-gray-600 fs-7 pe-10">
              <div>{{ item.productName || '--' }}</div>
            </div>
          </template>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="折扣码时间" min-width="240px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">生效&nbsp;</span>
            <span class="fw-semibold text-gray-600">
              {{ scope.row.markCodeStartTimeStr || '--' }}
            </span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">生效北京时间&nbsp;</span>
            <span class="fw-semibold text-gray-600">
              {{ scope.row.bjMarkCodeStartTime || '--' }}
            </span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">失效&nbsp;</span>
            <span class="fw-semibold text-gray-600">
              {{ scope.row.markCodeEndTimeStr || '--' }}
            </span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">失效北京时间&nbsp;</span>
            <span class="fw-semibold text-gray-600">
              {{ scope.row.bjMarkCodeEndTime || '--' }}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="引入金额">
      <template #default="{ row }">
        <div>{{ row?.importAmount || '--' }} {{ row?.importAmountCurrency }}</div>
        <div>
          <span class="fw-semibold text-gray-600 fs-8">更新&nbsp;</span>
          {{ row?.importAmountTime || '--' }}
        </div>
      </template>
    </el-table-column>
    <!-- TODO: 添加追踪信息 -->
    <el-table-column label="追踪信息" min-width="140px">
      <template #default="{ row }">
        <template v-if="row.trackingList">
          <div v-for="item of row.trackingList" style="margin-bottom: 2px" :key="item.id">
            <div>
              <span class="fw-semibold text-gray-600 fs-8">追踪码&nbsp;</span>
              <span class="fw-semibold text-gray-600">{{ item.trackingCode }}</span>
            </div>
          </div>
        </template>
        <div>
          <span class="fw-semibold text-gray-600 fs-8">链接&nbsp;</span>
          <a target="_blank" href="item.attributionLink" class="fw-semibold text-gray-600">
            {{ row.taskAttributionLink || '--' }}
          </a>
        </div>
      </template>
    </el-table-column>
    <!-- <el-table-column label="Attribution链接" min-width="200px">
      <template #default="{ row }">
        <ElTooltip
          v-if="row?.taskAttributionLink"
          popper-class="action_tool_tip"
          placement="top"
          effect="light"
          :disabled="row.taskAttributionLink?.length < 12"
          :content="row.taskAttributionLink"
        >
          <div
            class="fw-semibold text-gray-600 over_elli"
            style="display: inline-block; width: 100px; vertical-align: middle"
          >
            {{ row.taskAttributionLink }}
          </div>
        </ElTooltip>
      </template>
    </el-table-column> -->
    <el-table-column label="人员信息" min-width="100px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">推广&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.creatorName || '--' }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">运营&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">
              {{ scope.row.taskOperatorName || '--' }}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="时间信息" min-width="190px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">创建&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.createTime }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-8">更新&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.updateTime }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="运营备注" min-width="100px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600 fs-7">
          <ElTooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :disabled="!scope.row.operateRemark"
            :content="scope.row.operateRemark"
          >
            <span class="over_elli">{{ scope.row.operateRemark || '--' }}</span>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="推广备注" min-width="100px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600 fs-7">
          <ElTooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :disabled="!scope.row.remark"
            :content="scope.row.remark"
          >
            <span class="over_elli">{{ scope.row.remark || '--' }}</span>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="180px" fixed="right">
      <template #default="{ row }">
        <KeenActions
          display-style="buttons"
          :actions="[
            {
              label: '编辑',
              key: 'edit',
              type: 'primary',
              text: true,
              row: row,
              hide: ![1].includes(row.status),
            },
            {
              label: '延期',
              key: 'postpone',
              type: 'primary',
              text: true,
              row: row,
              hide: ![2].includes(row.status),
            },
            {
              label: '重建',
              key: 'rebuild',
              type: 'primary',
              text: true,
              row: row,
              hide: ![3].includes(row.status),
            },
            {
              label: '取消',
              key: 'cancel',
              type: 'primary',
              text: true,
              row: row,
              hide: ![1, 2].includes(row.status),
            },
            {
              label: '转移',
              key: 'transfer',
              type: 'primary',
              text: true,
              hide: row.canTransfer === 0,
              row: row,
            },
            {
              label: '复制',
              key: 'copy',
              type: 'primary',
              text: true,
              row: row,
              hide: ![3, 4].includes(row.status),
            },
            {
              label: '查看',
              key: 'view',
              type: 'primary',
              text: true,
              row: row,
            },
          ]"
          @click="handleActions"
        />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="折扣码转移归属推广人员"
    v-model="transferDialogVisible"
    width="400px"
    :before-close="closeTransferDialog"
  >
    <el-select
      style="width: 100%"
      v-model="transferMemberCode"
      filterable
      placeholder="请选择转移对象"
    >
      <el-option
        v-for="item in creatorList"
        :key="item.memberCode"
        :label="item.name"
        :value="item.memberCode"
      />
    </el-select>
    <template #footer>
      <span>
        <el-button @click="closeTransferDialog">取消</el-button>
        <el-button type="primary" @click="submitTransferDialog">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { memberApi, metaApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElTooltip } from 'element-plus';
  import Tag from '@/components/Tag/index.vue';
  import { encryptByBase64 } from '@/utils/aesTils';
  import clipboard3 from 'vue-clipboard3';

  defineProps<{
    listData: Array<Object>;
    listLoading: Boolean;
  }>();
  const emit = defineEmits<{
    (event: 'refresh', reload?: boolean): void;
  }>();

  const route = useRoute();
  //   折扣码状态配置
  const statusObj = ref({
    0: {
      text: '未知',
      color: 'gray',
    },
    1: {
      text: '待生效',
      color: 'purple',
    },
    2: {
      text: '生效中',
      color: 'blue',
    },
    3: {
      text: '已到期',
      color: 'green',
    },
    4: {
      text: '已取消',
      color: 'red',
    },
    5: {
      text: '关停中',
      color: 'red',
    },
    6: {
      text: '已作废',
      color: 'gray',
    },
  });
  const router = useRouter();
  const { projectCode } = route.query;
  //   按钮操作
  const handleActions = async (operation) => {
    const { key, row } = operation;
    // 延迟
    if (key === 'delay') {
      const isConfirmed = await swal.confirm('是否申请延长该折扣码的有效时间？');
      if (!isConfirmed) return;
      metaApi
        .luteosMetaHandleMetaMark({
          handleType: 2,
          markCode: row.markCode,
          metaMarkCode: row.metaMarkCode,
        })
        .then(() => {
          emit('refresh');
        });
    }
    if (key === 'rebuild') {
      metaApi
        .luteosMetaHandleMetaMark({
          handleType: 9,
          markCode: row.markCode,
          metaMarkCode: row.metaMarkCode,
        })
        .then(() => {
          ElMessage.success('重建成功！');
          emit('refresh');
        });
    }

    if (key === 'postpone') {
      metaApi
        .luteosMetaHandleMetaMark({
          handleType: 2,
          markCode: row.markCode,
          metaMarkCode: row.metaMarkCode,
        })
        .then(() => {
          ElMessage.success('延期成功！');
          emit('refresh');
        });
    }
    // 转移
    if (key === 'transfer') {
      transferMetaMarkCode.value = row.metaMarkCode;
      transferDialogVisible.value = true;
    }
    // 编辑、取消、查看
    if (['edit', 'cancel', 'view', 'copy'].includes(key)) {
      row.fromType = key;
      router.push({
        name: 'amazonaddcollectcode',
        query: {
          row: encryptByBase64(JSON.stringify(row)),
          code: encryptByBase64(row.userCode),
          projectCode: projectCode ? encryptByBase64(projectCode) : '',
        },
      });
    } else if (key === 'task') {
      // 任务
      router.push({ name: 'amazonoperatetask', query: { markCode: row.markCode } });
    } else if (key === 'busy') {
      metaApi
        .luteosMetaHandleMetaMark({
          handleType: 4,
          metaMarkCode: row.metaMarkCode,
          markCode: row.markCode,
        })
        .then(() => {
          ElMessage.success('加急成功！');
          emit('refresh');
        });
    }
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
    } catch (error) {}
  };
  const transferMemberCode = ref('');
  const transferDialogVisible = ref(false);
  const transferMetaMarkCode = ref('');
  const closeTransferDialog = () => {
    transferDialogVisible.value = false;
    transferMemberCode.value = '';
  };
  const submitTransferDialog = async () => {
    if (!transferMemberCode.value) {
      ElMessage.warning('请先选择转移对象！');
    } else {
      const confirm = await swal.confirm('确认转移该折扣码推广归属人，该操作无法撤回');
      if (confirm) {
        const res = await metaApi.luteosMetaHandleMetaMark({
          metaMarkCode: transferMetaMarkCode.value,
          transfer: transferMemberCode.value,
          handleType: 8,
        });
        if (res) {
          ElMessage.success('折扣码转移成功！');
          closeTransferDialog();
          emit('refresh');
        }
      }
    }
  };
  const creatorList = ref<any[]>([]);

  const queryDeptMemberOption = () => {
    metaApi.luteosMetaQueryMarketMemberList().then((res: any) => {
      creatorList.value = res.memberBeanList || [];
    });
  };
  queryDeptMemberOption();
</script>

<style scoped lang="scss"></style>
