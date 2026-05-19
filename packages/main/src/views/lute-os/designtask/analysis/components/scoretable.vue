<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="name" label="任务名称" min-width="100" />
    <el-table-column prop="taskTypeDesc" label="任务类型" min-width="120" />
    <el-table-column prop="contractCodeList" label="合同编号" min-width="150">
      <template #default="{ row }">
        <div>
          <template v-if="row.contractCodeList.length">
            <span
              v-for="(no, index) in row.contractCodeList"
              :key="index"
              class="contract-code-item"
            >
              <el-tooltip effect="dark" placement="top-start" :content="no">
                <span class="truncate">{{ no }}</span>
              </el-tooltip>
              <span v-if="index < row.contractCodeList.length - 1">、</span>
            </span>
          </template>
          <span v-else>--</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="levelDesc" label="项目等级" min-width="100" />
    <el-table-column prop="itemTag" label="项目名称" min-width="120" />
    <el-table-column prop="itemTypeDesc" label="项目类型" min-width="120" />
    <el-table-column prop="initiator" label="创建人" min-width="80" />
    <el-table-column prop="secondDeptName" label="二级部门" min-width="80" v-if="!itemType" />
    <el-table-column prop="designer" label="设计师" min-width="80" />
    <el-table-column label="时间" min-width="150">
      <template #default="scope">
        <div>提交 {{ scope.row.submitDate || '--' }}</div>
        <div>开始 {{ scope.row.startDate || '--' }}</div>
        <div>截止 {{ scope.row.endDate || '--' }}</div>
        <div>完成 {{ scope.row.finishDate || '--' }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="efficient" label="" min-width="100">
      <template #header>
        <span>能效</span>
        <el-tooltip
          popper-class="action_tool_tip text-gray-600"
          placement="top-start"
          effect="light"
          content="超前(-)|延期(+)|准时"
        >
          <QuestionFilled style="height: 15px; width: 15px" />
        </el-tooltip>
      </template>
      <template #default="scope">
        <div>
          {{
            scope.row.finishDate > scope.row.endDate
              ? `+${scope.row.efficient}`
              : scope.row.efficient
          }}天
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="statusDesc" label="任务状态" min-width="80" />
    <el-table-column prop="urgentDesc" label="加急状态" min-width="80" />
    <el-table-column prop="score" label="任务得分" min-width="120" />
    <el-table-column prop="acceptScore" label="任务评分" />
  </el-table>
</template>

<script lang="ts" setup>
  import { QuestionFilled } from '@element-plus/icons-vue';

  defineProps<{
    list: Array<any>;
    itemType: Number;
  }>();
</script>

<style lang="scss" scoped>
.contract-code-item {
  display: inline-flex;
  max-width: 150px;
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
