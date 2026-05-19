<template>
  <el-table
    ref="tableRef"
    v-loading="listLoading"
    :data="listData"
    row-key="taskCode"
    @selection-change="handleSelectionChange"
    max-height="65vh"
  >
    <el-table-column type="selection" min-width="40" align="center" reserve-selection />
    <el-table-column label="折扣码信息" min-width="180px" fixed>
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">折扣码&nbsp;</span>
            <el-input size="small" v-if="scope.row.isEdit" v-model="scope.row.markCode" />
            <span v-else class="fw-semibold text-success">{{ scope.row.markCode }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">折扣标识&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.markTagDesc || '--' }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="商品信息" min-width="180px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600 fs-7 pe-10">
          {{ scope.row?.discountTypeDesc || '--' }}
        </div>
        <div v-if="scope.row.productInfoList && scope.row.productInfoList.length">
          <template v-for="(item, index) in scope.row.productInfoList" :key="index">
            <div class="fw-semibold text-gray-600 fs-7 pe-10">
              <div>{{ item.productName || '--' }}</div>
            </div>
          </template>
        </div>
        <div v-else>--</div>
        <div v-if="scope.row.productLineList && scope.row.productLineList.length">
          <template v-for="(item, index) in scope.row.productLineList" :key="index">
            <div class="fw-semibold text-gray-600 fs-7 pe-10">
              <div>{{ item.lineName || '--' }}</div>
            </div>
          </template>
        </div>
        <div v-else>--</div>
      </template>
    </el-table-column>
    <el-table-column label="推广备注" min-width="100px">
      <template #default="scope">
        <div class="fw-semibold text-gray-600">
          {{ scope.row.remark || '--' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="任务类型" min-width="120px">
      <template #default="scope">
        <div v-if="taskTypeMap[scope.row.taskType]">
          <Tag :color="taskTypeMap[scope.row.taskType].color" :key="item">
            {{ scope.row.taskTypeDesc }}
          </Tag>
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

    <el-table-column label="折扣码时间" min-width="180px">
      <template #default="scope">
        <div>
          <span class="fw-semibold text-gray-600 fs-7">生效&nbsp;</span>
          <el-date-picker
            size="small"
            v-if="scope.row.isEdit"
            v-model="scope.row.markCodeStartTime"
            value-format="YYYY-MM-DD"
            placeholder="选择日期时间"
            style="width: 150px"
          />
          <span v-else class="fw-semibold text-gray-600">{{ scope.row.markCodeStartTime }}</span>
        </div>
        <div>
          <span class="fw-semibold text-gray-600 fs-7">失效&nbsp;</span>
          <el-date-picker
            size="small"
            v-if="scope.row.isEdit"
            v-model="scope.row.markCodeEndTime"
            value-format="YYYY-MM-DD"
            placeholder="选择日期时间"
            style="width: 150px"
          />
          <span v-else class="fw-semibold text-gray-600">{{ scope.row.markCodeEndTime }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="折扣力度" min-width="180px">
      <template #default="scope">
        <div class="fs-7">
          <div>
            日常
            <el-input size="small" v-if="scope.row.isEdit" v-model="scope.row.taskDiscount" />
            <span v-else>{{ scope.row.taskDiscount }}</span>
          </div>
          <div>
            大促
            <el-input
              size="small"
              v-if="scope.row.isEdit"
              v-model="scope.row.taskPromotionDiscount"
            />
            <span v-else>{{ scope.row.taskPromotionDiscount }}</span>
          </div>
          <div>
            大促后
            <el-input
              size="small"
              v-if="scope.row.isEdit"
              v-model="scope.row.taskPromotionEndDiscount"
            />
            <span v-else>{{ scope.row.taskPromotionEndDiscount }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="运营备注" min-width="100px">
      <template #default="scope">
        <el-input size="small" v-if="scope.row.isEdit" v-model="scope.row.operateRemark" />
        <div v-else class="fw-semibold text-gray-600">
          {{ scope.row.operateRemark || '--' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="人员信息" min-width="100px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">推广&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.creatorName }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">运营&nbsp;</span>
            <span class="fw-semibold text-gray-600 fs-7">{{ scope.row.operatorName }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="时间信息" min-width="190px">
      <template #default="scope">
        <div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">创建&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.createTime }}</span>
          </div>
          <div>
            <span class="fw-semibold text-gray-600 fs-7">更新&nbsp;</span>
            <span class="fw-semibold text-gray-600">{{ scope.row.updateTime }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" min-width="120px" fixed="right">
      <template #default="{ row }">
        <KeenActions
          display-style="buttons"
          :actions="[
            {
              label: '详情',
              key: 'detail',
              type: 'primary',
              text: true,
              row: row,
            },
            /*{
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
            },*/
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
  <DetailDialog
    v-if="detailVisible"
    :visible="detailVisible"
    :task-code="taskCode"
    @close="detailVisible = false"
  />
</template>

<script lang="ts" setup>
  import { ElMessage, ElTooltip } from 'element-plus';
  import Tag from '@/components/Tag/index.vue';
  import * as swal from '@/utils/swal';
  import { metaApi } from '@/api/index';
import DetailDialog from '@/views/lute-os/favoursystem/favourmanage/shopify/operatetask/components/detailDialog.vue';
  import EditModal from '../Modal/edit.vue';

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
  const taskTypeMap = {
    1: 'blue',
    2: 'red',
    4: 'purple',
    5: 'green',
  };
  //   按钮操作
  const modelTitle = ref('');
  const taskCode = ref('');
  const redactVisible = ref(false);
  const detailVisible = ref(false);
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
    } else if (key === 'detail') {
      taskCode.value = row.taskCode;
      detailVisible.value = true;
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
