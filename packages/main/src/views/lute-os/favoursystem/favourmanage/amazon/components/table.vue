<template>
  <el-table
    ref="tableRef"
    v-loading="listLoading"
    :data="listData"
    row-key="taskCode"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" min-width="40" align="center" reserve-selection />
    <el-table-column label="折扣码信息" min-width="180px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">折扣码&nbsp;</span>
            <span class="fw-semibold text-success">{{ scope.row.markCode }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">到期&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.markCodeEndTime || '--' }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="商品信息" min-width="180px">
      <template #default="scope">
        <div v-if="scope.row.productInfoList && scope.row.productInfoList.length">
          <template v-for="(item, index) in scope.row.productInfoList" :key="index">
            <div class="fw-semibold text-gray-600 fs-9 pe-10">
              <div>{{ item.productName || '--' }}</div>
            </div>
          </template>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="店铺信息" min-width="180px">
      <template #default="scope">
        <div class="w-175px">
          <div>{{ scope.row.platformCode }}</div>
          <div>{{ scope.row.siteCode }}</div>
          <ElTooltip
            v-if="scope.row?.taskAttributionLink"
            popper-class="action_tool_tip"
            placement="top"
            effect="light"
            :disabled="scope.row.taskAttributionLink?.length < 12"
            :content="scope.row.taskAttributionLink"
          >
            <div class="over_elli">{{ scope.row.taskAttributionLink }}</div>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="折扣信息" min-width="180px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">折扣力度</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.taskDiscount }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">追踪编码</span>
            <ElTooltip
              v-if="scope.row?.scopetaskTrackingCode"
              popper-class="action_tool_tip"
              placement="top"
              effect="light"
              :disabled="scope.row.scopetaskTrackingCode.length < 10"
              :content="scope.row.taskTrackingCode"
            >
              <span
                class="fw-semibold text-gray-600 over_elli"
                style="display: inline-block; width: 100px; vertical-align: middle"
              >
                {{ scope.row.taskTrackingCode }}
              </span>
            </ElTooltip>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="任务状态" min-width="120px">
      <template #default="scope">
        <div v-if="statusObj[scope.row.status]">
          <Tag :color="statusObj[scope.row.status].color" :key="item">
            {{ statusObj[scope.row.status].text }}
          </Tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="人员信息" min-width="100px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">推广&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.creatorName }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">运营&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.operatorName }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="时间信息" min-width="190px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">创建&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.createTime }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-9">更新&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.updateTime }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="运营备注" min-width="100px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600 fs-9">
          <ElTooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :disabled="!scope.row.operateRemark"
            :content="scope.row.operateRemark"
          >
            <div class="over_elli">{{ scope.row.operateRemark || '--' }}</div>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="推广备注" min-width="100px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600 fs-9">
          <ElTooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top"
            effect="light"
            :disabled="!scope.row.remark"
            :content="scope.row.remark"
          >
            <div class="over_elli">{{ scope.row.remark || '--' }}</div>
          </ElTooltip>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="120px" fixed="right">
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
              hide: !row.editFlag,
            },
            {
              label: '取消',
              key: 'cancel',
              type: 'primary',
              text: true,
              row: row,
              hide: ![1].includes(row.status),
            },
            {
              label: '延长',
              key: 'delay',
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
  <EditModal
    v-if="redactVisible"
    :visible="redactVisible"
    :title="modelTitle"
    :info="curRow"
    @close-modal="closeModalRedact"
  />
</template>

<script lang="ts" setup>
  import { ElMessage, ElTooltip } from 'element-plus';
  import Tag from '@/components/Tag/index.vue';
  import * as swal from '@/utils/swal';
  import { metaApi } from '@/api/index';
  import EditModal from '../Modal/transfer.vue';

  defineProps<{
    listData: Array<Object>;
    listLoading: Boolean;
  }>();
  const emit = defineEmits<{
    (event: 'refresh', reload?: boolean): void;
    (event: 'selectionChange', val?: any): void;
  }>();

  //   折扣码状态配置
  const statusObj = ref({
    1: {
      text: '待办',
      color: 'yellow',
    },
    2: {
      text: '已完成',
      color: 'blue',
    },
    3: {
      text: '取消',
      color: 'purple',
    },
  });
  //   按钮操作
  const modelTitle = ref('');
  const redactVisible = ref(false);
  const curRow = ref();
  const handleActions = async (operation) => {
    const { key, row } = operation;
    // 判断是否有可以操作延长
    if (key === 'delay' && !row.postPoneFlag) {
      ElMessage.warning('推广暂未申请延长该折扣码');
      return;
    }
    if (['edit', 'delay'].includes(key)) {
      modelTitle.value = key === 'delay' ? '延长折扣码' : '编辑折扣码';
      curRow.value = {
        ...row,
        type: key,
      };
      redactVisible.value = true;
    } else if (key === 'cancel') {
      const isConfirmed = await swal.confirm({
        text: '确定设置成取消吗？',
        icon: 'error',
      });
      if (!isConfirmed) return;
      metaApi
        .luteosMetaHandleMetaMarkTask({
          handleType: 1,
          remark: '-',
          taskCode: row.taskCode,
          metaMarkCode: row.metaMarkCode,
          platformCode: row.platformCode,
          siteCode: row.siteCode,
        })
        .then(() => {
          ElMessage.success('操作成功！');
          emit('refresh');
        });
    }
  };
  const closeModalRedact = (r?: 'reload') => {
    if (r === 'reload') {
      emit('refresh');
      redactVisible.value = false;
    } else {
      redactVisible.value = false;
    }
  };
  const handleSelectionChange = (list) => {
    emit('selectionChange', list);
  };

  const tableRef = ref('');
  const clearSelection = () => {
    tableRef.value.clearSelection();
  };

  defineExpose({
    clearSelection,
  });
</script>

<style scoped lang="scss"></style>
