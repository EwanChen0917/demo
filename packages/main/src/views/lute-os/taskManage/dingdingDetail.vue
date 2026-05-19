<template>
  <div class="detail-container">
    <FixedStatusBar
      :statusColorMap="statusColorMap"
      :taskDetail="taskDetailAfter"
      :computedStatus="computedStatus"
      :editing="editing"
      @accept="accept"
      @reject="rejectDialogRef?.open(taskCode, 'confirm')"
      @save="save"
      @resubmit="submit"
      @change-task="changeTask"
      @submit-change="submitChange"
      @finish-task="changeStatus('approve_finish', null, '完成任务')"
      @accept-close="changeStatus('confirm_finish', 1, '接受关闭')"
      @reject-close="changeStatus('confirm_finish', 0, '拒绝关闭')"
      @change-handler-approve="changeStatus('apply_change', 1, '同意变更申请')"
      @change-handler-reject="changeStatus('apply_change', 0, '拒绝变更申请')"
      @view-before="viewBefore"
      @view-after="viewAfter"
      @reject-change="rejectDialogRef?.open(taskCode, 'approve_change')"
      @agree-change="agreeChange"
      @report-approve="changeStatus('task_report_apply', 1, '周报审批通过')"
      @report-reject="changeStatus('task_report_apply', 0, '周报审批拒绝')"
      @update-status="handleChangeStatus"
      @cancel="router.back()"
      @cancel-change="cancelChange"
      :showDiff="showDiff"
      :dingTalkAuth="true"
      :saveChangeLoading="saveChangeLoading"
    />
    <div class="task-detail mt-5">
      <div class="detail-left" ref="detailLeftRef">
        <!-- v-if="[3, 5, 6, 7].includes(taskDetail?.approvalStatus)" -->
        <template v-if="changeReasonDisplay">
          <div class="title required-label" style="padding: 0px 11.28px; margin-bottom: 24px">
            变更原因
          </div>
          <div class="reason-upload-row" style="margin-bottom: 16px" v-if="isEdit">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入变更原因"
              class="reason-textarea"
              show-word-limit
              v-model="taskDetail.changeReason"
              :maxlength="500"
            />
            <!-- 右侧上传 -->
            <div class="upload-area">
              <KeenFileUpload
                directory="tasksManage"
                :limit="1"
                :sizeLimit="157286400"
                v-model="taskDetail.changeFileList"
              >
                <div class="upload-slot-area">
                  <el-icon>
                    <UploadFilled />
                  </el-icon>
                  <div class="tip">
                    点击此处选择文件
                    <br />
                    请勿超过150MB
                  </div>
                </div>
              </KeenFileUpload>
            </div>
          </div>
          <div class="reason-upload-row" style="margin-bottom: 16px" v-else>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入变更原因"
              class="reason-textarea"
              disabled
              v-model="taskDetail.changeReason"
            />
            <div class="upload-area">
              <KeenFileUpload
                directory="tasksManage"
                :limit="1"
                v-model="taskDetail.changeFileList"
                disabled
                showOperate
              >
                <div class="upload-slot-area">
                  <el-icon>
                    <UploadFilled />
                  </el-icon>
                  <div class="tip">
                    点击此处选择文件
                    <br />
                    请勿超过150MB
                  </div>
                </div>
              </KeenFileUpload>
            </div>
          </div>
        </template>
        <el-form label-width="376px" label-position="left">
          <div class="title" style="padding: 0 11.28px; margin-bottom: 16px">任务信息</div>
          <div class="milestones" style="margin-top: 6px; margin-bottom: 24px">
            <el-table
              :data="taskInfoRows"
              style="width: 100%"
              :span-method="taskInfoSpanMethod"
              :header-cell-style="{ background: '#e2eef8', color: '#333' }"
              :row-class-name="taskInfoRowClass"
            >
              <!-- 任务标题 列 -->
              <el-table-column label="任务标题" align="left" width="200">
                <template #header>
                  <div style="text-align: center; width: 100%">任务标题</div>
                </template>
                <template #default="{ row, $index }">
                  <!-- 普通数据行 -->
                  <template v-if="$index === 0">
                    <el-input
                      v-model="taskDetail.name"
                      borderless
                      style="color: red; width: 100%"
                      v-if="isEdit"
                    />
                    <!-- <span v-else>{{ row.title }}</span> -->
                    <EllipsisExpandable v-else :text="taskDetail.name" :line-clamp="2" />
                  </template>
                  <!-- “任务详情” 表头行 -->
                  <template v-else-if="$index === 1">
                    <span class="cell" style="color: #141414; margin: auto">任务详情</span>
                  </template>
                  <!-- 任务详情内容行 -->
                  <template v-else-if="$index === 2">
                    <el-input
                      v-model="taskDetail.detail"
                      type="textarea"
                      autosize
                      borderless
                      style="color: red; width: 100%"
                      v-if="isEdit"
                    />
                    <span v-else style="margin-right: auto">{{ row.detail }}</span>
                  </template>
                </template>
              </el-table-column>
              <!-- 任务来源 列 -->
              <el-table-column label="任务来源" prop="source" width="100" align="center">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <el-select
                      id="sourceSelectRef"
                      ref="sourceSelectRef"
                      style="width: 160px"
                      v-model="taskDetail.source"
                      placeholder="请选择任务来源"
                      v-if="isEdit"
                    >
                      <el-option :value="1" label="日常反馈" />
                      <el-option :value="2" label="重点会议" />
                      <el-option :value="3" label="CEO指示" />
                    </el-select>
                    <span v-else>{{ taskDetail.sourceDesc }}</span>
                  </template>
                </template>
              </el-table-column>
              <!-- 任务类别 列 -->
              <el-table-column label="任务类别" prop="category" width="100" align="center">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <el-select
                      id="categorySelectRef"
                      ref="categorySelectRef"
                      style="width: 160px"
                      v-model="taskDetail.taskCategoryCode"
                      filterable
                      placeholder="请选择任务类别"
                      v-if="isEdit"
                    >
                      <el-option
                        v-for="item in categoryOptions"
                        :value="item.taskCategoryCode"
                        :label="item.taskCategoryName"
                        :key="item.taskCategoryCode"
                      />
                      <template #footer>
                        <div class="d-flex gap-2" v-permission="'taskCategoryAdd'">
                          <el-input
                            v-model="taskCategory"
                            size="small"
                            placeholder="创建任务类别"
                          />
                          <el-button
                            type="primary"
                            size="small"
                            @click="createTaskCategory"
                            :disabled="!taskCategory"
                          >
                            创建
                          </el-button>
                        </div>
                      </template>
                    </el-select>
                    <span v-else>{{ taskDetail.taskCategoryName }}</span>
                  </template>
                </template>
              </el-table-column>
              <!-- 执行者 列 -->
              <el-table-column label="执行者" prop="handler" width="100" align="center">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <DeptMember v-model="taskDetail.handler" v-if="handlerEdit" teleported />
                    <div class="cell-with-avatar" v-else>
                      <el-avatar :src="taskDetail.handlerAvatar" size="20" />
                      <span style="margin-left: 4px; color: #000">
                        {{ taskDetail.handlerName }}
                      </span>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <!-- 任务完成确认人 列 -->
              <el-table-column label="任务完成确认人" prop="acceptor" width="150" align="center">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <div class="cell-with-avatar">
                      <el-avatar :src="taskDetail.acceptorAvatar" size="20" />
                      <span style="margin-left: 4px; color: #000">
                        {{ taskDetail.acceptorName }}
                      </span>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <!-- 创建人 列 -->
              <el-table-column label="创建人" prop="creator" width="100" align="center">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <div class="cell-with-avatar">
                      <el-avatar :src="taskDetail.creatorAvatar" size="20" />
                      <span style="margin-left: 4px; color: #000">
                        {{ taskDetail.creatorName }}
                      </span>
                    </div>
                  </template>
                </template>
              </el-table-column>

              <!-- 截止时间 列 -->
              <el-table-column label="截止时间" prop="deadline" align="center" width="150">
                <template #default="{ row, $index }">
                  <template v-if="$index === 0">
                    <el-date-picker
                      v-model="taskDetail.endTime"
                      value-format="YYYY-MM-DD"
                      type="date"
                      placeholder="请选择"
                      style="width: 100%"
                      v-if="isEdit"
                    />
                    <span v-else>{{ taskDetail.endTime }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <template v-if="taskDetail.useMilestone">
            <div class="milestones" style="margin-top: 6px; margin-bottom: 16px">
              <div class="title" style="padding: 0 11.28px">任务里程碑</div>
              <el-link
                type="primary"
                :underline="false"
                v-if="taskDetail?.approvalStatus === 2 && isHandler"
              >
                <!-- <el-icon size="16">
                    <Plus />
                  </el-icon>
                  <span class="add" @click="addMilestone">添加</span> -->
                <el-button
                  type="primary"
                  size="small"
                  @click="addMilestone"
                  style="max-height: 32px"
                >
                  添加里程碑
                </el-button>
              </el-link>
            </div>
            <template v-if="(taskDetail?.approvalStatus === 2 && isHandler) || isEdit">
              <el-table :data="taskDetail?.milestoneList">
                <el-table-column label="序号" type="index" align="center" width="120" />
                <el-table-column align="left">
                  <template #header>
                    <div style="text-align: center; width: 100%">里程碑内容</div>
                  </template>
                  <template #default="{ row, $index }">
                    <el-input
                      :id="`editor${$index}`"
                      type="textarea"
                      :rows="3"
                      v-model="row.content"
                      @blur="saveMilestone"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="截止时间" prop="nodeTime" align="center" width="120">
                  <template #default="{ row, $index }">
                    <el-date-picker
                      :id="`nodeTime${$index}`"
                      v-model="row.nodeTime"
                      size="small"
                      type="date"
                      placeholder="请选择"
                      value-format="YYYY-MM-DD"
                      @change="saveMilestone"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="80">
                  <template #default="{ $index }">
                    <img
                      v-if="taskDetail?.milestoneList?.length > 1"
                      class="delete-icon"
                      src="@/assets/svgs/deleteOutlined.svg"
                      alt=""
                      @click="handleDeleteMilestone($index)"
                    />
                    <span v-else>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <template v-else>
              <el-table :data="taskDetail?.milestoneList">
                <el-table-column type="index" label="里程碑序号" align="center" width="110" />
                <el-table-column prop="content" label="里程碑内容" align="center">
                  <template #default="{ row }">
                    <EllipsisExpandable :text="row?.content" :line-clamp="4" />
                  </template>
                </el-table-column>
                <el-table-column prop="nodeTime" label="截止时间" align="center" width="150" />
              </el-table>
            </template>
          </template>
          <template
            v-if="
              taskDetail.useWeeklyReport &&
              [3, 5, 6, 7, 8, 9, 10].includes(taskDetail?.approvalStatus)
            "
          >
            <!--            <el-form-item label="周报记录" label-position="top" style="flex-direction: column">-->
            <div class="title" style="padding: 0 11.28px; margin-bottom: 16px">任务周报</div>
            <div class="report">
              <el-table :data="taskDetail?.taskReportList">
                <el-table-column label="汇报周期" width="120" align="center">
                  <template #default="{ row }">
                    <div
                      style="display: flex; flex-direction: column; gap: 4px; align-items: center"
                    >
                      <span>{{ row?.reviewStartDate }}</span>
                      <span>至</span>
                      <span>{{ row?.reviewEndDate }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="description" align="left">
                  <template #header>
                    <div style="text-align: center; width: 100%">进展简述</div>
                  </template>
                  <template #default="{ row }">
                    <el-input
                      v-if="row?.allowEdit"
                      type="textarea"
                      v-model="row.description"
                      placeholder="请输入"
                      :rows="3"
                    />
                    <EllipsisExpandable v-else :text="row?.description" :line-clamp="3" />
                  </template>
                </el-table-column>
                <el-table-column prop="reviewContent" align="left">
                  <template #header>
                    <div style="text-align: center; width: 100%">当周进展</div>
                  </template>
                  <template #default="{ row }">
                    <el-input
                      v-if="row?.allowEdit"
                      type="textarea"
                      v-model="row.reviewContent"
                      placeholder="请输入"
                      :rows="3"
                    />
                    <EllipsisExpandable v-else :text="row?.reviewContent" :line-clamp="3" />
                  </template>
                </el-table-column>
                <el-table-column label="下周计划" prop="planContent" align="left">
                  <template #header>
                    <div style="text-align: center; width: 100%">下周计划</div>
                  </template>
                  <template #default="{ row }">
                    <el-input
                      v-if="row?.allowEdit"
                      type="textarea"
                      v-model="row.planContent"
                      placeholder="请输入"
                      :rows="3"
                    />
                    <EllipsisExpandable v-else :text="row?.planContent" :line-clamp="3" />
                  </template>
                </el-table-column>
                <el-table-column label="交付物" prop="deliverable">
                  <template #default="{ row }">
                    <el-input
                      v-if="row?.allowEdit"
                      type="textarea"
                      v-model="row.deliverable"
                      placeholder="请输入"
                      autosize
                    />
                    <!-- <span v-else>{{ row?.deliverable || '--' }}</span> -->
                    <EllipsisExpandable v-else :text="row?.deliverable" :line-clamp="2" />
                  </template>
                </el-table-column>
                <el-table-column label="交付物链接" prop="deliverableUrl">
                  <template #default="{ row }">
                    <el-input
                      v-if="row?.allowEdit"
                      type="textarea"
                      v-model="row.deliverableUrl"
                      placeholder="请输入"
                      autosize
                    />
                    <div v-else class="w-100">
                      <a :href="row?.deliverableUrl" target="_blank">
                        <OverflowTooltip :content="row?.deliverableUrl" :line="2" />
                      </a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="提交日期" prop="submitDate" align="center" width="150" />
                <el-table-column label="操作" width="60" align="center" v-if="!editing">
                  <template #default="{ row }">
                    <el-button
                      v-if="row.allowEdit"
                      type="primary"
                      size="small"
                      @click="submitReport(row)"
                      v-loading="row.loading"
                    >
                      提交
                    </el-button>
                    <div v-else>-</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--            </el-form-item>-->
          </template>
          <template v-if="!taskDetail?.parentTaskCode">
            <el-form-item label-width="300px" label-position="top" style="flex-direction: column">
              <template #label>
                <span class="me-5 title">子任务</span>
                <!-- <el-link
                  >
                    <el-icon size="16">
                      <Plus />
                    </el-icon>
                    <span class="add">添加子任务</span>
                  </el-link> -->
                <el-button
                  v-if="taskDetail?.approvalStatus !== 9 && taskDetail?.approvalStatus !== 2"
                  type="primary"
                  @click="addEditableRow"
                  style="max-height: 32px"
                >
                  {{ taskDetail?.subTaskList?.some((item) => item.isEditing) ? '提交子任务' : '添加子任务' }}
                </el-button>
              </template>
            </el-form-item>

            <el-table
              :data="taskDetail?.subTaskList"
              class="mt-3"
              style="width: max-content"
              ref="subTaskTableRef"
            >
              <!-- 子任务标题 -->
              <el-table-column label="子任务标题" align="center" width="180" fixed="left">
                <template #default="{ row }">
                  <el-input
                    v-if="row.isEditing"
                    v-model="row.name"
                    placeholder="请输入标题"
                    size="small"
                    style="width: 160px"
                  />
                  <!-- <template v-else>{{ row.name }}</template> -->
                  <a
                    href="javascript:void(0);"
                    @click="handleTaskTitleClick(row)"
                    style="color: #3e97ff; text-decoration: none; cursor: pointer"
                    v-else
                  >
                    <OverflowTooltip :content="row?.name" :line="2" />
                  </a>
                </template>
              </el-table-column>
              <!-- 任务状态 -->
              <el-table-column label="任务状态" align="center">
                <template #default="{ row }">
                  <span>{{ row.statusDesc }}</span>
                </template>
              </el-table-column>

              <!-- 任务来源 -->
              <el-table-column label="任务来源" align="center" width="150">
                <template #default="{ row }">
                  <el-select
                    v-if="row.isEditing"
                    v-model="row.source"
                    placeholder="请选择"
                    size="small"
                    style="width: 120px; height: 44px"
                  >
                    <el-option :value="1" label="日常反馈" />
                    <el-option :value="2" label="重点会议" />
                    <el-option :value="3" label="CEO 指示" />
                  </el-select>
                  <template v-else>{{ row.sourceDesc }}</template>
                </template>
              </el-table-column>
              <el-table-column label="任务类别" align="center" width="150">
                <template #default="{ row }">
                  <el-select
                    id="categorySelectRef"
                    ref="categorySelectRef"
                    style="width: 160px"
                    v-model="row.taskCategoryCode"
                    filterable
                    placeholder="请选择任务类别"
                    v-if="row.isEditing"
                  >
                    <el-option
                      v-for="item in categoryOptions"
                      :value="item.taskCategoryCode"
                      :label="item.taskCategoryName"
                      :key="item.taskCategoryCode"
                    />
                    <template #footer>
                      <div class="d-flex gap-2" v-permission="'taskCategoryAdd'">
                        <el-input v-model="taskCategory" size="small" placeholder="创建任务类别" />
                        <el-button
                          type="primary"
                          size="small"
                          @click="createTaskCategory"
                          :disabled="!taskCategory"
                        >
                          创建
                        </el-button>
                      </div>
                    </template>
                  </el-select>
                  <template v-else>{{ row.taskCategoryName }}</template>
                </template>
              </el-table-column>
              <!-- 是否启用里程碑 -->
              <el-table-column label="里程碑" prop="useMilestone" width="100" align="center">
                <template #header>
                  <div style="width: 100%">
                    <span class="mr-2">里程碑</span>
                    <el-tooltip content="任务周期大于30天时，将自动启用里程碑填写" placement="top">
                      <QuestionFilled style="height: 16px; width: 16px; margin-top: -2px" />
                    </el-tooltip>
                  </div>
                </template>
                <template #default="{ row, $index }">
                  <el-select
                    style="width: 160px"
                    v-model="row.useMilestone"
                    :disabled="useMilestoneDisabled"
                    v-if="row.isEditing"
                  >
                    <el-option :value="1" label="启用" />
                    <el-option :value="0" label="不启用" />
                  </el-select>
                  <span v-else>{{ row.useMilestone ? '启用' : '不启用' }}</span>
                </template>
              </el-table-column>
              <!-- 是否启用周报  -->
              <el-table-column label="周报" prop="useWeeklyReport" width="100" align="center">
                <template #header>
                  <div style="width: 100%">
                    <span class="mr-2">周报</span>
                    <el-tooltip
                      content="周报开启后，每周四将通过钉钉定时向执行人发送周报填写待办"
                      placement="top"
                    >
                      <QuestionFilled style="height: 16px; width: 16px; margin-top: -2px" />
                    </el-tooltip>
                  </div>
                </template>
                <template #default="{ row, $index }">
                  <el-select
                    style="width: 160px"
                    v-model="row.useWeeklyReport"
                    v-if="row.isEditing"
                  >
                    <el-option :value="1" label="启用" />
                    <el-option :value="0" label="不启用" />
                  </el-select>
                  <span v-else>{{ row.useWeeklyReport ? '启用' : '不启用' }}</span>
                </template>
              </el-table-column>
              <!-- 执行人 -->
              <el-table-column label="共同执行人" align="center" width="150">
                <template #header>
                  <div style="width: 100%">
                    <span class="mr-2">共同执行人</span>
                    <span class="text-gray-500">{{ memberList?.length }}</span>
                    <el-tooltip content="共同执行人将会收到任务更新通知" placement="top">
                      <QuestionFilled style="height: 16px; width: 16px; margin-top: -2px" />
                    </el-tooltip>
                  </div>
                </template>
                <template #default="{ row }">
                  <div class="d-flex align-items-center w-100">
                    <div @click.stop style="width: 100%">
                      <DeptMember
                        id="memberSelectRef"
                        ref="memberSelectRef"
                        v-model="row.memberList"
                        multiple
                        :maxCollapseTags="3"
                        :clearable="false"
                        teleported
                        style="width: 100%"
                        :disabledList="disabledList?.map((item) => item.memberCode)"
                        v-if="row.isEditing"
                        autoRefocusAfterChange
                      />
                      <template v-else>
                        <div class="d-flex align-items-center flex-wrap justify-content-center">
                          <template v-for="(item, index) in row.memberList" :key="index">
                            <div
                              class="d-flex align-items-center"
                              style="margin-right: 6px; margin-bottom: 6px"
                            >
                              <el-avatar :src="item.avatar" :size="20" style="margin-right: 4px" />
                              <span>{{ item.memberName }}</span>
                              <span v-if="index < row.memberList.length - 1">、</span>
                            </div>
                          </template>
                        </div>
                      </template>
                      <!-- <el-button
                            size="small"
                            class="w-100"
                            type="primary"
                            @click="confirmAddMember(row)"
                          >
                            确认
                          </el-button> -->
                    </div>
                  </div>
                </template>
              </el-table-column>
              <!-- 执行者 -->
              <el-table-column label="执行者" align="center" width="120">
                <template #default="{ row }">
                  <DeptMember
                    v-if="row.isEditing"
                    v-model="row.handler"
                    placeholder="执行者"
                    style="width: 120px"
                    teleported
                  />
                  <template v-else>
                    <div class="cell-with-avatar">
                      <el-avatar :src="row.handlerAvatar" :size="20" />
                      <span class="ml-1">{{ row.handlerName }}</span>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <!-- 确认人 -->
              <el-table-column label="任务完成确认人" align="center" width="120">
                <template #default="{ row }">
                  <DeptMember
                    v-if="row.isEditing"
                    v-model="row.acceptor"
                    placeholder="选择确认人"
                    style="width: 120px"
                    teleported
                  />
                  <template v-else>
                    <div class="cell-with-avatar">
                      <el-avatar :src="row.acceptorAvatar" :size="20" />
                      <span class="ml-1">{{ row.acceptorName }}</span>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <!-- 创建人 -->
              <el-table-column label="创建人" align="center" width="120">
                <template #default="{ row }">
                  <div class="cell-with-avatar">
                    <el-avatar :src="row.creatorAvatar" :size="20" />
                    <span class="ml-1">{{ row.creatorName }}</span>
                  </div>
                </template>
              </el-table-column>
              <!-- 截止时间 -->
              <el-table-column label="截止时间" align="center" width="120">
                <template #default="{ row }">
                  <el-date-picker
                    v-if="row.isEditing"
                    v-model="row.endTime"
                    type="date"
                    size="small"
                    style="width: 130px; height: 44px"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择"
                  />
                  <template v-else>{{ row.endTime }}</template>
                </template>
              </el-table-column>
              <!-- 任务详情说明 -->
              <el-table-column label="任务详情说明" align="center" width="180">
                <template #default="{ row }">
                  <el-input v-model="row.detail" type="textarea" autosize v-if="row.isEditing" />
                  <EllipsisExpandable :text="row?.detail" :line-clamp="2" v-else />
                </template>
              </el-table-column>
              <!-- 操作列 -->
              <el-table-column label="操作" align="center" width="80" fixed="right">
                <template #default="{ row, $index }">
                  <el-button link type="danger" @click="removeRow($index)" v-if="row.isEditing">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form>
      </div>
      <div class="detail-right">
        <div class="detail-right-content">
          <div class="d-flex gap-3 align-items-center">
            <span class="title">共同执行人</span>
            <span class="text-gray-500" style="font-size: 16px">
              {{ taskDetail?.memberList?.length }}
            </span>
            <el-tooltip content="共同执行人将会收到任务更新通知" placement="top">
              <QuestionFilled style="height: 16px; width: 16px" />
            </el-tooltip>
          </div>
          <div class="d-flex gap-3 align-items-center mt-3 mb-5">
            <el-tooltip
              v-for="(item, index) in taskDetail?.memberList"
              :content="`${item.name}`"
              :key="item?.memberCode"
              placement="top"
            >
              <div
                class="avatar-bg"
                :class="{ 'avatar-bg-color': ![1, 2].includes(item?.type) }"
                @mouseenter="item.showClose = true"
                @mouseleave="item.showClose = false"
              >
                <el-avatar :src="item?.avatar" :size="24" />
                <div
                  class="close-icon"
                  v-if="![1, 2].includes(item?.type) && item.showClose"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  @click="removeMember(item, index)"
                >
                  <el-icon :size="8" color="#ffffff">
                    <Close />
                  </el-icon>
                </div>
              </div>
            </el-tooltip>
            <div class="position-relative z-index-3">
              <el-button
                class="addBtn"
                type="primary"
                :icon="Plus"
                circle
                @click.stop="handleAdd"
                v-if="isCreator || isHandler"
              />
              <div class="select-dialog" v-show="addShow" @click.stop>
                <DeptMember
                  id="memberSelectRef"
                  ref="memberSelectRef"
                  class="w-100"
                  v-model="selectValue"
                  multiple
                  :maxCollapseTags="3"
                  :clearable="false"
                  :disabledList="disabledList?.map((item) => item.memberCode)"
                  autoRefocusAfterChange
                  teleported
                />
                <el-button size="small" class="w-100" type="primary" @click="handleConfirm">
                  确认
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="attachment-container" style="margin-top: 16px">
          <div class="d-flex upload-area">
            <span class="flex-shrink-0 title align-self-center me-3">附件内容</span>
            <KeenFileUpload
              v-if="taskDetail?.attachmentList"
              v-model="taskDetail.attachmentList"
              directory="tasksManage"
              :limit="null"
              multiple
              @change="handleFileChange"
              :sizeLimit="157286400"
            >
              <el-button type="primary" size="small" style="max-height: 32px">上传附件</el-button>
            </KeenFileUpload>
          </div>

          <div class="attachment-list">
            <div
              v-for="file in taskDetail?.attachmentList"
              :key="file?.fileCode"
              class="attachment-item"
            >
              <div class="user-info-box d-flex justify-content-between">
                <div class="user-info d-flex align-items-center">
                  <div class="cell-with-avatar">
                    <el-avatar :src="file?.creatorAvatar" :size="20" />
                  </div>
                  <div class="user-name">
                    <span>{{ file?.creatorName }}</span>
                  </div>
                </div>
                <div style="color: #b7b7b7">
                  <span class="cursor-pointer me-6" @click="handleDownload(file)">下载附件</span>
                  <span class="cursor-pointer" @click="deleteFile(file)">删除</span>
                </div>
                <div class="date-info d-flex align-items-center" style="color: #b7b7b7">
                  <span>{{ file?.createTime || '' }}</span>
                </div>
              </div>
              <div class="file-name mt-3">
                <el-tooltip content="点击进行预览" placement="top">
                  <span @click="handlePreview(file)" class="file-name">
                    {{ getEllipsisFileName(file?.name) }}
                  </span>
                </el-tooltip>
              </div>
            </div>
          </div>
          <!--        <div class="line"></div>
        <div>关联日程</div>
        <el-input
          class="mt-3"
          v-if="isEdit"
          type="textarea"
          :rows="4"
          size="small"
          v-model="taskDetail.dingLink"
          placeholder="钉钉日程链接（多个用,分隔）"
          clearable
        />
        <el-link
          v-else
          class="text-break"
          v-for="(item, index) in taskDetail?.calendarLinkList"
          type="primary"
          :href="item"
          target="_blank"
          :key="index"
          :underline="false"
        >
          <OverflowTooltip :content="item" :line="1" />
        </el-link>-->
        </div>
      </div>
    </div>
  </div>
  <RejectDialog ref="rejectDialogRef" @reject="handleReject" />
  <CreateDialog ref="createDialogRef" @success="queryDetail" />
  <TaskReviseDialog ref="taskReviseDialogRef" @success="queryDetail" />
  <ReviseDetailDialog ref="reviseDetailDialogRef" @success="queryDetail" />
  <FilesPreview
    v-if="previewVisible"
    ref="filesPreviewRef"
    :fileUrl="fileUrl"
    :key="fileUrl"
    :fileName="fileName"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
</template>

<script setup lang="ts" name="taskManageDingding">
  import { memberApi, platformApi } from '@/api';
  import { Plus, QuestionFilled, Upload, Close } from '@element-plus/icons-vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import RejectDialog from '@/views/lute-os/taskManage/components/rejectDialog.vue';
  import dayjs from 'dayjs';
  import { useStore } from '@/store/modules/useStore';
  import CreateDialog from '@/views/lute-os/taskManage/components/createDialog.vue';
  import TaskReviseDialog from '@/views/lute-os/taskManage/components/taskReviseDialog.vue';
  import ReviseDetailDialog from '@/views/lute-os/taskManage/components/reviseDetailDialog.vue';
  import FixedStatusBar from '@/views/lute-os/taskManage/components/fixedStatusBar.vue';
  import EllipsisExpandable from '@/views/lute-os/taskManage/components/ellipsisExpandable.vue';
  import { openWindow } from '@/utils';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const { userInfo } = useStore();

  const statusColorMap = {
    1: 'blue',
    2: 'blue',
    3: 'green',
    4: 'red',
    5: 'blue',
    6: 'green',
    7: 'red',
    8: 'blue',
    9: 'green',
    10: 'red',
  };

  const createDialogRef = ref();
  const taskReviseDialogRef = ref();
  const reviseDetailDialogRef = ref();
  const route = useRoute();
  const router = useRouter();
  const taskCode = route.query?.taskCode;

  const taskDetail = ref({}); // 当前用于内容区切换展示
  const taskDetailAfter = ref({}); // 只存变更后
  const changeDetail = ref({
    changeReason: '',
    fileList: [],
  });
  const buttonAuth = ref(null);
  const queryDetail = async (showDiff = false) => {
    const res = await platformApi.platformTaskDetail({ taskCode, historyFlag: showDiff ? 1 : 0 });
    const detailData = {
      ...res,
      source: res?.source === -1 ? '' : res?.source,
      attachmentList: res?.attachmentList?.map((item) => ({
        ...item,
        ossKey: item.fileKey,
        name: item.fileName
      })),
      memberList: res?.memberList?.map((item) => {
        return {
          name: item?.memberName,
          avatar: item?.avatar,
          memberCode: item?.memberCode,
          addShow: false,
          type:
            item?.memberCode === res?.acceptor ? 1 : item?.memberCode === res?.handler ? 2 : null,
        };
      }),
      changeFileList: res.changeFileKey
        ? [
            {
              ossKey: res.changeFileKey,
              name: res.changeFileName,
            },
          ]
        : [],
      milestoneList: res?.milestoneList?.length
        ? res?.milestoneList
        : [{ nodeTime: '', content: '' }],
      taskReportList: res?.taskReportList?.map((item) => ({
        ...item,
        allowEdit:
          !item?.description &&
          !item?.reviewContent &&
          !item?.planContent &&
          !item?.deliverable &&
          !item?.deliverableUrl &&
          (res?.handler === userInfo?.memberCode ||
            res?.memberList?.some((item) => item.memberCode === userInfo?.memberCode)),
      })),
      dingLink: res?.calendarLinkList?.join(','),
    };

    if (showDiff) {
      taskDetail.value = detailData;
    } else {
      taskDetailAfter.value = detailData;
      console.log(taskDetailAfter.value, 'taskDetailAfter');
      buttonAuth.value = JSON.parse(JSON.stringify(res?.buttonAuth ?? {}));
      taskDetail.value = detailData;
    }
  };
  onMounted(() => {
    const el = document.querySelector('.el-main');
    if (el) {
      el._originOverflow = el.style.overflow;
      el.style.overflow = 'hidden';
    }
  });

  onUnmounted(() => {
    const el = document.querySelector('.el-main');
    if (el && el._originOverflow !== undefined) {
      el.style.overflow = el._originOverflow;
    }
  });
  queryDetail();
  const changeReasonDisplay = computed(() => {
    return (
      ((taskDetail?.value.approvalStatus === 3 || taskDetail?.value.approvalStatus === 5 || taskDetail?.value.approvalStatus === 7) &&
        taskDetail.value.changeReason) ||
      editing.value
    );
  });
  const taskInfoRows = computed(() => {
    const detail = taskDetail.value || {};
    const firstRow = {
      title: detail.name || '',
      source: detail.source || '',

      handler: {
        name: detail.handlerName || '',
        avatar: detail.handlerAvatar || '',
        memberCode: detail.handler,
      },
      acceptor: {
        name: detail.acceptorName || '',
        avatar: detail.acceptorAvatar || '',
        memberCode: detail.acceptor,
      },
      creator: {
        name: detail.creatorName || '',
        avatar: detail.creatorAvatar || '',
        memberCode: detail.creator,
      },
      newEndTime: detail.endTime || '',
    };
    return [firstRow, { isDetailHeader: true }, { detail: detail.detail || '' }];
  });
  const editing = ref(false);
  const handlerEdit = computed(() => {
    if (!taskDetail.value.handler) return true;
    return editing.value && canEditHandler.value;
  });
  const isEdit = computed(() => {
    return (
      ((taskDetail.value?.approvalStatus === 1 || taskDetail.value?.approvalStatus === 4) &&
        isCreator.value) ||
      editing.value
    );
  });
  const subTaskTableRef = ref();

  async function addEditableRow() {
    const editingRows = taskDetail.value.subTaskList.filter((t) => t.isEditing);
    const scrollToFirstInvalidRow = (predicate) => {
      const index = editingRows.findIndex(predicate);
      if (index !== -1) {
        const rowEl = subTaskTableRef.value?.$el?.querySelectorAll('.el-table__body tbody > tr')[
          index
        ];
        console.log(rowEl, 'rowEl');
        rowEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    if (taskDetail.value.subTaskList.length > 0) {
      if (editingRows.length > 0) {
        // 有正在编辑的行才需要校验并弹窗
        if (editingRows.some((t) => t.name === '')) {
          ElMessage.warning('请先填写任务标题');
          scrollToFirstInvalidRow((t) => t.name === '');
          return;
        }
        if (editingRows.some((t) => t.taskCategoryCode === '')) {
          ElMessage.warning('请先选择任务类别');
          scrollToFirstInvalidRow((t) => t.taskCategoryCode === '');
          return;
        }
        if (editingRows.some((t) => t.source === '')) {
          ElMessage.warning('请先选择任务来源');
          scrollToFirstInvalidRow((t) => t.source === '');
          return;
        }
        if (editingRows.some((t) => t.handler === '')) {
          ElMessage.warning('请先选择执行人');
          scrollToFirstInvalidRow((t) => t.handler === '');
          return;
        }
        if (editingRows.some((t) => t.acceptor === '')) {
          ElMessage.warning('请先选择确认人');
          scrollToFirstInvalidRow((t) => t.acceptor === '');
          return;
        }
        if (editingRows.some((t) => t.endTime === '')) {
          ElMessage.warning('请先选择截止时间');
          scrollToFirstInvalidRow((t) => t.endTime === '');
          return;
        }
        if (editingRows.some((t) => t.detail === '')) {
          ElMessage.warning('请先填写任务详情');
          scrollToFirstInvalidRow((t) => t.detail === '');
          return;
        }

        const isConfirmed = await swal.confirm(
          '任务发起后将向对应责任人发起钉钉待办通知，审批通过后进入正式开启状态'
        );
        if (!isConfirmed) return;

        await platformApi.platformTaskSaveTask({
          ...taskDetail.value.subTaskList.find((t) => t.isEditing),
          parentTaskCode: taskDetail.value.taskCode,
          operateType: 'approve',
          memberCodeList: Array.from(
            new Set(taskDetail.value.subTaskList.find((t) => t.isEditing)?.memberList)
          ),
        });
        const res = await platformApi.platformTaskDetail({ taskCode, historyFlag: 0 });
        // 只更新子任务列表
        taskDetail.value.subTaskList = res.subTaskList;
        ElMessage.success('添加成功');
        return;
      }
    }

    // 清除编辑状态
    taskDetail.value.subTaskList.forEach((t) => (t.isEditing = false));
    console.log('taskDetail.value.subTaskList', taskDetail.value.subTaskList);
    // 添加新子任务
    taskDetail.value.subTaskList.push({
      name: '',
      taskCategoryCode: '',
      source: '',
      handler: '',
      acceptor: '',
      creator: userInfo?.memberCode,
      creatorName: userInfo?.name,
      creatorAvatar: userInfo?.avatar,
      endTime: '',
      useMilestone: 1,
      useWeeklyReport: 1,
      detail: '',
      statusDesc: '未开始',
      memberList: [],
      isEditing: true,
    });
    nextTick(() => {
      const rows = subTaskTableRef.value?.$el?.querySelectorAll('.el-table__body-wrapper tbody tr');
      const lastRow = rows?.[rows.length - 1];
      if (lastRow) {
        lastRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // ③ 删除行
  function removeRow(index: number) {
    taskDetail.value.subTaskList.splice(index, 1);
  }
  const isCreator = computed(() => {
    return taskDetail.value?.creator === userInfo?.memberCode;
  });
  const isAcceptor = computed(() => {
    return taskDetail.value?.acceptor === userInfo?.memberCode;
  });
  const isHandler = computed(() => {
    return taskDetail.value?.handler === userInfo?.memberCode;
  });
  const computedStatus = computed(() => {
    return {
      isCreator: taskDetail.value?.creator === userInfo?.memberCode,
      isAcceptor: taskDetail.value?.acceptor === userInfo?.memberCode,
      isHandler: taskDetail.value?.handler === userInfo?.memberCode,
    };
  });
  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };
  getOperatorOptions();

  const categoryOptions = ref<any[]>([]);
  const getCategoryOptions = async () => {
    const res = await platformApi.platformTaskGetTaskCategoryList();
    categoryOptions.value = res.taskCategoryList || [];
  };
  getCategoryOptions();

  const disabledList = computed(() => {
    return taskDetail.value.memberList?.filter((item) => item.type === 1 || item.type === 2);
  });
  function taskInfoSpanMethod({ row, column, rowIndex, columnIndex }) {
    // “任务详情” 表头行
    if (rowIndex === 1) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: 7 };
      } else {
        return { rowspan: 0, colspan: 0 };
      }
    }
    // “任务详情” 内容行
    if (rowIndex === 2) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: 7 };
      } else {
        return { rowspan: 0, colspan: 0 };
      }
    }
    return { rowspan: 1, colspan: 1 };
  }
  const selectValue = ref([]);
  const addShow = ref(false);
  const memberSelectRef = ref();
  const handleAdd = () => {
    selectValue.value = taskDetail.value.memberList?.map((item) => item.memberCode);
    addShow.value = true;
    memberSelectRef.value?.focus();
  };

  const handleMouseEnter = (e) => {
    e.target.parentNode.style.backgroundColor = 'var(--bs-primary)';
  };
  const handleMouseLeave = (e) => {
    e.target.parentNode.style.backgroundColor = '';
  };

  const removeMember = async (item, index) => {
    const res = await platformApi.platformTaskOperate({
      taskCode,
      operateType: 'add_member',
      memberCodeList: [item?.memberCode],
      type: 0,
    });
    taskDetail.value.memberList.splice(index, 1);
  };

  const handleConfirm = async () => {
    const res = await platformApi.platformTaskOperate({
      taskCode,
      operateType: 'add_member',
      memberCodeList: selectValue.value,
      type: 1,
    });
    taskDetail.value.memberList = selectValue.value.map((val) => {
      const operator = operatorOptions.value?.find((item) => item.memberCode === val);
      return {
        name: operator?.name,
        avatar: operator?.avatar,
        memberCode: operator?.memberCode,
        type: disabledList.value?.find((item) => item.memberCode === val)?.type,
      };
    });
    addShow.value = false;
  };

  document.addEventListener('click', () => {
    addShow.value = false;
  });

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  const editorRefs = ref([]);

  const toolbarConfig = {
    excludeKeys: ['group-image', 'group-video', 'insertLink'],
  };
  const editorConfig = { placeholder: '请输入内容...' };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    editorRefs.value = [];
    editorRef.value = null;
  });

  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  const handleCreatedEditors = (editor, index) => {
    editorRefs.value[index] = editor; // 记录 editor 实例，重要！
  };

  const handleDeleteMilestone = (index) => {
    taskDetail.value.milestoneList.splice(index, 1);
    editorRefs.value[index] = null;
    saveMilestone();
  };

  const accept = async () => {
    if (taskDetail.value.useMilestone) {
      let emptyIndex = -1;
      let emptyTimeIndex = -1;
      for (let i = 0; i < taskDetail.value.milestoneList.length; i++) {
        if (!taskDetail.value.milestoneList[i].nodeTime) {
          emptyTimeIndex = i;
          break;
        }
        if (
          !taskDetail.value.milestoneList[i].content ||
          taskDetail.value.milestoneList[i].content === '<p><br></p>'
        ) {
          emptyIndex = i;
          break;
        }
      }
      if (emptyIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyIndex + 1}个里程碑内容`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`editor${emptyIndex}`)?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById(`editor${emptyIndex}`)?.focus();
        }, 300);
        return;
      }
      if (emptyTimeIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyTimeIndex + 1}个里程碑时间`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`nodeTime${emptyTimeIndex}`)?.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          document.getElementById(`nodeTime${emptyTimeIndex}`)?.focus();
        }, 300);
        return;
      }
    }
    await platformApi.platformTaskOperate({
      taskCode,
      operateType: 'confirm',
      type: 1,
      milestoneList: taskDetail.value?.milestoneList,
    });
    queryDetail();
    ElMessage.success('接收成功');
  };

  const changeStatus = async (operateType, type, tips) => {
    if (
      taskDetail.value?.useWeeklyReport &&
      operateType === 'approve_finish' &&
      !(
        taskDetail.value.day < 4 &&
        taskDetail.value?.taskReportList?.length === 1 &&
        dayjs().diff(taskDetail.value?.taskReportList?.[0]?.reviewStartDate, 'week') < 1
      ) &&
      taskDetail.value?.taskReportList?.some(
        (item) => !item?.description || !item?.reviewContent || !item?.planContent
      )
    ) {
      ElMessage.warning('请先将周报内容填写完整');
      return;
    }
    const isConfirmed = await swal.confirm(`确认${tips}吗？`);
    if (!isConfirmed) return;
    await platformApi.platformTaskOperate({
      taskCode,
      operateType,
      type,
    });
    ElMessage.success(`${tips}成功`);
    // router.push('/taskManage');
    queryDetail();
  };

  const detailLeftRef = ref();
  const addMilestone = () => {
    taskDetail.value.milestoneList.push({
      nodeTime: '',
      content: '',
    });
    nextTick(() => {
      if (detailLeftRef.value) {
        detailLeftRef.value.scrollTop = detailLeftRef.value.scrollHeight;
      }
    });
  };

  const submitReport = async (item) => {
    if (editing.value) return;
    if (!item?.description || !item?.reviewContent || !item?.planContent) {
      ElMessage.warning('请填写完整信息');
      return false;
    }
    try {
      item.loading = true;
      const res = await platformApi.platformTaskOperate({
        taskCode,
        operateType: 'task_report',
        taskReport: {
          reportCode: item?.reportCode ?? undefined,
          description: item?.description,
          reviewStartDate: dayjs(item?.reviewStartDate)?.format('YYYY-MM-DD'),
          reviewEndDate: dayjs(item?.reviewEndDate)?.format('YYYY-MM-DD'),
          reviewContent: item?.reviewContent,
          planStartDate: dayjs(item?.planStartDate)?.format('YYYY-MM-DD'),
          planEndDate: dayjs(item?.planEndDate)?.format('YYYY-MM-DD'),
          planContent: item?.planContent,
          deliverable: item?.deliverable,
          deliverableUrl: item?.deliverableUrl,
        },
      });
      ElMessage.success('提交成功');
      item.allowEdit = false;
      queryDetail();
    } finally {
      item.loading = false;
    }
  };

  const nameInputRef = ref();
  const save = async () => {
    if (!taskDetail.value?.name) {
      nameInputRef.value?.focus();
      document.getElementById('nameInputRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务标题');
      return;
    }
    // 如果存在还没保存的子任务，则先保存子任务
    if (taskDetail.value.subTaskList.some((t) => t.isEditing)) {
      await platformApi.platformTaskSaveTask({
        ...taskDetail.value.subTaskList.find((t) => t.isEditing),
        parentTaskCode: taskDetail.value.taskCode,
        memberCodeList: Array.from(
          new Set(taskDetail.value.subTaskList.find((t) => t.isEditing)?.memberList)
        ),
        operateType: 'save',
      });
    }
    await platformApi.platformTaskSaveTask({
      ...taskDetail.value,
      operateType: 'save',
      memberCodeList: Array.from(
        new Set(taskDetail.value?.memberList?.map((item) => item.memberCode))
      ),
      // startTime: taskDetail.value?.time?.[0],
      // endTime: taskDetail.value?.time?.[1],
      calendarLinkList: taskDetail.value?.dingLink?.split(',') || [],
      attachmentList: taskDetail.value?.attachmentList?.map((item) => {
        return {
          fileName: item?.name || item?.fileName,
          fileKey: item?.ossKey || item?.fileKey,
        };
      }),
    });
    queryDetail();
    ElMessage.success('保存成功');
  };

  const timeSelectRef = ref();
  const submit = async () => {
    if (!taskDetail.value?.name) {
      // nameInputRef.value?.focus();
      // document.getElementById('nameInputRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务标题');
      return;
    }
    if (!taskDetail.value?.endTime) {
      // timeSelectRef.value?.focus();
      // document.getElementById('timeSelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务时间');
      return;
    }
    if (!taskDetail.value?.detail || taskDetail.value?.detail === '<p><br></p>') {
      // editorRef.value?.focus();
      // document.getElementById('editorRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务详情说明');
      return;
    }
    const isConfirmed = await swal.confirm(
      '任务发起后将向对应责任人发起钉钉待办通知，审批通过后进入正式开启状态'
    );
    if (!isConfirmed) return;
    const res = await platformApi.platformTaskSaveTask({
      ...taskDetail.value,
      operateType: 'approve',
      memberCodeList: Array.from(
        new Set(taskDetail.value.memberList?.map((item) => item.memberCode))
      ),
      // startTime: taskDetail.value.time?.[0],
      // endTime: taskDetail.value.time?.[1],
      calendarLinkList: taskDetail.value.dingLink?.split(',') || [],
      attachmentList: taskDetail.value.attachmentList?.map((item) => {
        return {
          fileName: item?.name || item?.fileName,
          fileKey: item?.ossKey || item?.fileKey,
        };
      }),
    });
    ElMessage.success('发起成功');
    queryDetail();
    // router.push('/taskManage');
  };
  const showDiff = ref(false);
  const useMilestoneDisabled = ref(false);
  const handleTimeChange = (val) => {
    useMilestoneDisabled.value = false;
    if (val) {
      if (dayjs(val).diff(dayjs(), 'day') > 30) {
        taskDetail.value.useMilestone = 1;
        useMilestoneDisabled.value = true;
        ElMessage.warning('任务周期大于30天，已自动启用里程碑');
      }
    }
  };
  const handleChangeStatus = async (val) => {
    await platformApi.platformTaskOperate({
      taskCode: taskDetail.value.taskCode,
      operateType: 'update_status',
      status: val,
    });
    ElMessage.success('修改成功');
  };
  const viewBefore = () => {
    showDiff.value = !showDiff.value;
    queryDetail(showDiff.value);
  };
  const viewAfter = () => {
    showDiff.value = !showDiff.value;
    queryDetail(showDiff.value);
  };
  // 文件变化
  const timer = ref();
  const handleFileChange = async () => {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(async () => {
      const res = await platformApi.platformTaskOperate({
        taskCode,
        operateType: 'upload_file',
        attachmentList: taskDetail.value?.attachmentList
          ?.filter((item) => item?.ossKey)
          ?.map((item) => {
            return {
              fileName: item?.name || item?.fileName,
              fileKey: item?.ossKey || item?.fileKey,
            };
          }),
      });
      timer.value = null;
    }, 300);
    // 用户上传完成后才将上传人的名称和头像添加到附件列表中，否则会覆盖
    if (taskDetail.value.attachmentList.some((item) => item.creatorName === undefined)) {
      // 只改最新上传的附件
      taskDetail.value.attachmentList[taskDetail.value.attachmentList.length - 1].creatorName =
        userInfo?.name;
      taskDetail.value.attachmentList[taskDetail.value.attachmentList.length - 1].creatorAvatar =
        userInfo?.avatar;
      taskDetail.value.attachmentList[taskDetail.value.attachmentList.length - 1].creatorCode =
        userInfo?.memberCode;
      // 将上传时间添加到附件列表中
      taskDetail.value.attachmentList[taskDetail.value.attachmentList.length - 1].createTime =
        dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
  };
  // 文件预览
  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref(false);
  const handlePreview = async (file) => {
    const res: any = await platformApi.platformQueryUrl({ ossKey: file.ossKey || file.key });
    fileUrl.value = res.url || '';
    fileName.value = file.name;
    previewVisible.value = true;
  };
  const canEditHandler = ref(false);
  const changeTask = async () => {
    // changeDetail.value = await platformApi.platformTaskChangeDetail({ taskCode });
    editing.value = true;
    canEditHandler.value = isHandler.value || isCreator.value;
    const list = taskDetail.value?.taskReportList;
    if (list?.length) {
      list[0].allowEdit = true;
    }
    // taskReviseDialogRef.value?.open(taskDetail.value);
  };
  const cancelChange = () => {
    editing.value = false;
    canEditHandler.value = false;
    queryDetail();
  };
  const deleteFile = (file) => {
    const idx = taskDetail.value.attachmentList.findIndex(
      (item) => (item.ossKey || item.fileKey) === (file.ossKey || file.fileKey)
    );
    if (idx !== -1) {
      taskDetail.value.attachmentList.splice(idx, 1);
      handleFileChange();
    }
  };
  // 保存里程碑信息
  const saveMilestone = async () => {
    if (editing.value) return;
    const res = await platformApi.platformTaskOperate({
      taskCode,
      operateType: 'milestone',
      milestoneList: taskDetail.value?.milestoneList,
    });
  };
  const getEllipsisFileName = (
    fileName,
    {
      prefixLen = 15, // 前面保留几个字
      suffixLen = 2, // 后面保留几个字
      threshold = 45, // 超过多少字符开始省略
    } = {}
  ) => {
    if (!fileName) return '';
    const extIndex = fileName.lastIndexOf('.');
    const ext = extIndex !== -1 ? fileName.slice(extIndex) : '';
    const main = extIndex !== -1 ? fileName.slice(0, extIndex) : fileName;
    // 短的不省略
    if (main.length <= threshold) return fileName;
    return `${main.slice(0, prefixLen)}…${main.slice(-suffixLen)}${ext}`;
  };

  const rejectDialogRef = ref(null);
  const handleReject = () => {
    // router.push('/taskManage');
    queryDetail();
  };
  const agreeChange = async () => {
    try {
      await platformApi.platformTaskOperate({
        taskCode,
        operateType: 'approve_change',
        type: 1,
      });
      ElMessage.success(`变更成功`);
      queryDetail();
    } catch (error) {
      console.error(error);
    }
  };
  const saveChangeLoading = ref(false)
  const submitChange = async () => {
    if (!taskDetail.value.changeReason) {
      ElMessage.warning('请填写变更原因');
      return;
    }
    if (!taskDetail.value.taskCategoryCode) {
      ElMessage.warning('请选择任务类别');
      return;
    }
    if (!taskDetail.value.endTime) {
      ElMessage.warning('请选择截止时间');
      return;
    }
    if (taskDetail.value?.useMilestone) {
      let emptyIndex = -1;
      let emptyTimeIndex = -1;
      for (let i = 0; i < taskDetail.value.milestoneList.length; i++) {
        if (!taskDetail.value.milestoneList[i].nodeTime) {
          emptyTimeIndex = i;
          break;
        }
        if (
          !taskDetail.value.milestoneList[i].content ||
          taskDetail.value.milestoneList[i].content === '<p><br></p>'
        ) {
          emptyIndex = i;
          break;
        }
      }
      if (emptyIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyIndex + 1}个里程碑内容`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`editor${emptyIndex}`)?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById(`editor${emptyIndex}`)?.focus();
        }, 300);
        return;
      }
      if (emptyTimeIndex !== -1) {
        const isConfirmed = await swal.confirm({
          text: `请填写第${emptyTimeIndex + 1}个里程碑时间`,
          confirmButtonText: '去填写',
        });
        if (!isConfirmed) return;
        document.getElementById(`nodeTime${emptyTimeIndex}`)?.scrollIntoView({
          behavior: 'smooth',
        });
        setTimeout(() => {
          document.getElementById(`nodeTime${emptyTimeIndex}`)?.focus();
        }, 300);
        return;
      }
    }
    try {
      saveChangeLoading.value = true;
      // console.log(taskDetail.value.fileList, 'taskDetail');
      await platformApi.platformTaskChange({
        taskCode: taskDetail.value.taskCode,
        changeFileKey: taskDetail.value?.changeFileList?.[0]?.ossKey,
        changeFileName: taskDetail.value?.changeFileList?.[0]?.name,
        taskCategoryCode: taskDetail.value?.taskCategoryCode,
        detail: taskDetail.value?.detail,
        changeReason: taskDetail.value?.changeReason,
        reportList: taskDetail.value?.taskReportList,
        handler: taskDetail.value?.handler,
        name: taskDetail.value?.name,
        newEndTime: taskDetail.value?.endTime,
        source: taskDetail.value?.source,
        milestoneList: taskDetail.value?.milestoneList,
      });
      ElMessage.success('提交变更成功');
      editing.value = false;
      queryDetail();
    } catch (error) {
      console.error(error);
    } finally {
      saveChangeLoading.value = false;
    }
  };
  const handleDownload = async (file) => {
    const res: any = await platformApi.platformQueryUrl({ ossKey: file.ossKey || file.key });
    window.open(res.url || '', '_blank');
  };
  const taskInfoRowClass = (row) => {
    return row.rowIndex === 1 ? 'task-detail-header-row' : '';
  };

  const handleTaskTitleClick = (row) => {
    // router.push({
    //   path: '/taskManage/detail',
    //   query: {
    //     taskCode: row.taskCode,
    //   },
    // });
    const path = router.resolve({
      path: '/taskManage/detail',
      query: {
        taskCode: row.taskCode,
      },
    });
    openWindow(path.href);
  };
  const taskCategory = ref();
  const categorySelectRef = ref();
  const createTaskCategory = async () => {
    const res = await platformApi.platformTaskAddCategory({
      name: taskCategory.value,
    });
    ElMessage.success('创建成功');
    categoryOptions.value.push({
      taskCategoryCode: res.taskCategoryCode,
      taskCategoryName: taskCategory.value,
    });
    taskDetail.value.taskCategoryCode = res.taskCategoryCode;
    taskCategory.value = '';
    categorySelectRef.value.blur();
  };
</script>

<style scoped lang="scss">
  @use './base.scss';
  .detail-container {
    // max-height: 77vh;

    // .detail-card {
    //   max-height: 77vh;
    // }

    header {
      padding: 0 11.28px;

      .title {
        font-size: 16px;
        font-family: 'PingFang SC';
      }
    }

    .task-detail {
      display: flex;
      flex-wrap: wrap;
      // position: relative;
      //justify-content: space-between;
      gap: 20px;

      .detail-left {
        //width: 70%;
        flex: 7;
        min-width: 600px;
        padding-right: 20px;
        // overflow-y: scroll;
        // max-height: 100vh;
        @media (max-width: 620px) {
          padding: 0 11.28px;
        }
        .reason-upload-row {
          display: flex;
          align-items: stretch;
          width: 100%;
          height: 130px;
          // border: 1px solid #eee;
          box-shadow: 0 2px 8px 0 rgba(51, 60, 71, 0.08), 0 1.5px 5px 0 rgba(0, 0, 0, 0.03);
          border-radius: 7px;
          background: #fff;

          // 左侧textarea
          .reason-textarea {
            flex: 1 1 0;
            margin-right: 0;

            :deep(.el-textarea__inner) {
              height: 100%;
              box-sizing: border-box;
              resize: none;
            }
          }

          // 右侧上传
          .upload-area {
            min-width: 140px;
            max-width: 140px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #eee;
            padding: 0 12px;
            background: none;

            // KeenFileUpload 样式穿透
            :deep(.el-upload) {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: none;
              box-shadow: none;
              border: none;
              padding: 0;
            }

            .upload-slot-area {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;

              .el-icon {
                font-size: 32px;
                color: #bbb;
                margin-bottom: 6px;
              }

              .tip {
                font-size: 13px;
                color: #999;
                text-align: center;
                line-height: 1.3;
              }
            }
          }
        }

        //overflow: scroll;
        .milestones {
          display: flex;
          align-items: center;
        }

        .delete-icon {
          cursor: pointer;
        }

        .report {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          //border: var(--bs-border-color) solid 1px;
          border-radius: 5px;
          //padding: 0 5px;
          box-shadow: var(--bs-drawer-box-shadow);
        }

        .subTask-list {
          width: 100%;
          color: #3c3d40;
          border-radius: 12px;
          border: var(--bs-border-color) solid 1px;
          padding: 12px 24px;

          .subTask-item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;

            &-left {
              display: flex;
              align-items: center;
              gap: 20px;
            }

            &-right {
              display: flex;
              align-items: center;
              gap: 20px;
              //font-size: 14px;
            }
          }
        }

        .form-item-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 400;
          line-height: 22.4px;
          color: #979797;

          .icon {
            width: 16px;
            height: 16px;
          }
        }

        :deep(.el-form-item__label) {
          align-items: center;
        }

        :deep(.el-form-item__content) {
          color: #262626;
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 400;
          line-height: 22.4px;
        }

        .tips {
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 400;
          line-height: 16.8px;
          color: #8c8c8c;
        }
      }

      .detail-right {
        position: relative;
        flex: 2;

        .detail-right-content {
          position: sticky;
          z-index: 1;
          // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          border-bottom: 1px solid var(--bs-border-color);
          top: 0;
          right: 0;
        }
        @media (max-width: 620px) {
          padding: 0 11.28px;
        }
        //width: 30%;
        // flex: 3;
        position: sticky;
        top: 0;
        right: 0;
        max-height: 100vh;

        .attachment-container {
          :deep(.el-upload-list) {
            display: none;
          }

          .upload-area {
            padding-bottom: 15px;
            // border-bottom: 1px solid var(--bs-border-color);
          }

          .attachment-list {
            display: flex;
            flex-direction: column;
            padding-right: 15px;
            gap: 20px;
            overflow-y: auto;
            max-height: 53vh;

            .attachment-item {
              border-bottom: 1px solid #e2eef8;
              padding-bottom: 5px;

              .file-name {
                cursor: pointer;

                &:hover {
                  color: #007bff;
                }
              }
            }
          }
        }

        //min-width: 300px;
        .addBtn {
          margin: 2px;
          width: 24px !important;
          height: 24px;
        }

        .select-dialog {
          position: absolute;
          width: 280px;
          height: 460px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #ffffff;
          border-radius: 4px;
          padding: 16px;
          top: 36px;
          left: 20px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .avatar-bg {
          width: 28px;
          height: 28px;
          padding: 2px;
          border-radius: 50%;
          background-color: #ffffff;
          position: relative;

          &-color:hover {
            background-color: #a1a5b7;
          }

          .close-icon {
            position: absolute;
            background-color: #a1a5b7;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            right: 0;
            cursor: pointer;

            &:hover {
              background-color: var(--bs-primary);
            }
          }
        }
      }

      // .line {
      //   border-top: 1px solid var(--bs-border-color);
      //   margin-bottom: 1.25rem;
      // }
      .add {
        font-size: 16px;
        font-family: 'PingFang SC';
      }

      .title {
        font-family: 'PingFang SC';
        font-size: 16px;
        font-weight: 700;
        line-height: 22.4px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
        color: #3c3d40;
      }
    }
  }

  .check {
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(89, 89, 89, 1);
  }

  :deep(.el-table-fixed-column--left) {
    background-color: #f9f9f9 !important;
  }
  :deep(.el-table-fixed-column--right) {
    background-color: #f9f9f9 !important;
  }
</style>
