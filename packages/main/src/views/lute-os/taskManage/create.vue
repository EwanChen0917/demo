<template>
  <div class="detail-container">
    <FixedStatusBar
      :statusColorMap="statusColorMap"
      :computedStatus="computedStatus"
      @create="submit"
      @create-save="save"
      @cancel="router.back()"
      :saveLoading="saveLoading"
    />
    <KeenCard class="p-10 py-10 detail-card">
      <header class="d-flex justify-content-between">
        <div class="d-flex gap-2 align-items-center"></div>
        <el-space></el-space>
      </header>
      <div class="task-detail mt-5">
        <div class="detail-left" ref="detailLeftRef">
          <!-- v-if="[3, 5, 6, 7].includes(taskDetail?.approvalStatus)" -->
          <el-form label-width="376px" label-position="left">
            <div class="title" style="margin-bottom: 4px">任务信息</div>
            <div class="desc">
              <span>里程碑说明：任务周期大于30天时，将自动启用里程碑填写</span>
              <span>周报说明：周报开启后，每周四将通过钉钉定时向执行人发送周报填写待办</span>
            </div>
            <div class="milestones" style="margin-top: 6px; margin-bottom: 24px">
              <el-table
                :data="taskInfoRows"
                style="width: 100%"
                :span-method="taskInfoSpanMethod"
                :header-cell-style="{ background: '#e2eef8', color: '#333' }"
                :row-class-name="taskInfoRowClass"
              >
                <!-- 任务标题 列 -->
                <el-table-column align="center">
                  <template #header>
                    <span class="required-label">任务标题</span>
                  </template>
                  <template #default="{ row, $index }">
                    <!-- 普通数据行 -->
                    <template v-if="$index === 0">
                      <el-input
                        v-model="taskDetail.name"
                        borderless
                        style="color: red; width: 100%"
                        type="textarea"
                        autosize
                      />
                      <!-- <span v-else>{{ row.title }}</span> -->
                    </template>
                    <!-- “任务详情” 表头行 -->
                    <template v-else-if="$index === 1">
                      <span class="cell required-label" style="color: #141414">任务详情</span>
                    </template>
                    <!-- 任务详情内容行 -->
                    <template v-else-if="$index === 2">
                      <el-input
                        v-model="taskDetail.detail"
                        type="textarea"
                        autosize
                        borderless
                        style="color: red; width: 100%"
                      />
                    </template>
                  </template>
                </el-table-column>
                <!-- 里程碑 -->
                <el-table-column prop="milestone" width="100" align="center">
                  <template #header>
                    <span class="required-label">里程碑</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <el-select v-model="taskDetail.useMilestone" :disabled="useMilestoneDisabled">
                        <el-option :value="1" label="启用" />
                        <el-option :value="0" label="不启用" />
                      </el-select>
                    </template>
                  </template>
                </el-table-column>
                <!-- 周报 -->
                <el-table-column prop="weeklyReport" width="100" align="center">
                  <template #header>
                    <span class="required-label">周报</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <el-select v-model="taskDetail.useWeeklyReport">
                        <el-option :value="1" label="启用" />
                        <el-option :value="0" label="不启用" />
                      </el-select>
                    </template>
                  </template>
                </el-table-column>
                <!-- 任务来源 列 -->
                <el-table-column prop="source" width="100" align="center">
                  <template #header>
                    <span class="required-label">任务来源</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <el-select
                        id="sourceSelectRef"
                        ref="sourceSelectRef"
                        style="width: 160px"
                        v-model="taskDetail.source"
                        placeholder="请选择任务来源"
                      >
                        <el-option :value="1" label="日常反馈" />
                        <el-option :value="2" label="重点会议" />
                        <el-option :value="3" label="CEO指示" />
                      </el-select>
                    </template>
                  </template>
                </el-table-column>
                <!-- 任务类别 列 -->
                <el-table-column prop="category" width="100" align="center">
                  <template #header>
                    <span class="required-label">任务类别</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <el-select
                        id="categorySelectRef"
                        ref="categorySelectRef"
                        style="width: 160px"
                        v-model="taskDetail.taskCategoryCode"
                        filterable
                        placeholder="请选择任务类别"
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
                    </template>
                  </template>
                </el-table-column>
                <!-- 执行者 列 -->
                <el-table-column prop="handler" width="130" align="center">
                  <template #header>
                    <span class="required-label">执行者</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <DeptMember
                        v-model="taskDetail.handler"
                        @change="handleChange"
                        teleported
                        ref="handlerSelectRef"
                      />
                    </template>
                  </template>
                </el-table-column>
                <!-- 任务完成确认人 列 -->
                <el-table-column prop="acceptor" width="150" align="center">
                  <template #header>
                    <span class="required-label">任务完成确认人</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <DeptMember
                        v-model="taskDetail.acceptor"
                        teleported
                        :filterSelf="
                          taskDetail.creator === taskDetail.handler &&
                          taskDetail.creator !== '' &&
                          taskDetail.handler !== ''
                        "
                        :selfMemberCode="userInfo?.memberCode"
                      />
                    </template>
                  </template>
                </el-table-column>
                <!-- 创建人 列 -->
                <el-table-column prop="creator" width="150" align="center">
                  <template #header>
                    <span class="required-label">创建人</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <div class="cell-with-avatar">
                        <el-avatar :src="userInfo?.avatar" size="20" />
                        <span style="margin-left: 4px; color: #000">
                          {{ userInfo?.name }}
                        </span>
                      </div>
                    </template>
                  </template>
                </el-table-column>
                <!-- 截止时间 列 -->
                <el-table-column prop="deadline" align="center" width="150">
                  <template #header>
                    <span class="required-label">截止时间</span>
                  </template>
                  <template #default="{ row, $index }">
                    <template v-if="$index === 0">
                      <el-date-picker
                        v-model="taskDetail.endTime"
                        value-format="YYYY-MM-DD"
                        type="date"
                        placeholder="请选择"
                        style="width: 100%"
                        @change="handleTimeChange"
                      />
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
                      {{ row?.reviewStartDate }}至{{ row?.reviewEndDate }}
                    </template>
                  </el-table-column>
                  <el-table-column label="进展简述" prop="description" align="center">
                    <template #default="{ row }">
                      <el-input
                        v-if="row?.allowEdit"
                        type="textarea"
                        v-model="row.description"
                        placeholder="请输入"
                        :rows="3"
                      />
                      <span v-else>{{ row?.description }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="当周进展" prop="reviewContent" align="center">
                    <template #header>当周进展</template>
                    <template #default="{ row }">
                      <el-input
                        v-if="row?.allowEdit"
                        type="textarea"
                        v-model="row.reviewContent"
                        placeholder="请输入"
                        :rows="3"
                      />
                      <span v-else>{{ row?.reviewContent }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="下周计划" prop="planContent" align="center">
                    <template #header>下周计划</template>
                    <template #default="{ row }">
                      <el-input
                        v-if="row?.allowEdit"
                        type="textarea"
                        v-model="row.planContent"
                        placeholder="请输入"
                        :rows="3"
                      />
                      <span v-else>{{ row?.planContent || '--' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="交付物" prop="deliverable">
                    <template #default="{ row }">
                      <el-input
                        v-if="row?.allowEdit"
                        type="textarea"
                        v-model="row.deliverable"
                        placeholder="请输入"
                        :rows="3"
                      />
                      <span v-else>{{ row?.deliverable || '--' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="交付物链接" prop="deliverableUrl">
                    <template #default="{ row }">
                      <a :href="row?.deliverableUrl" target="_blank">{{ row?.deliverableUrl }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column label="提交日期" prop="submitDate" align="center" />
                  <el-table-column label="操作" width="60" align="center">
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
                    v-if="taskDetail?.approvalStatus !== 9 && !taskDetail?.subTaskList.some(t => t.isEditing)"
                    type="primary"
                    @click="addEditableRow"
                    style="max-height: 32px"
                  >
                    添加子任务
                  </el-button>
                  <el-button
                    v-if="taskDetail?.approvalStatus !== 9 && taskDetail?.subTaskList.some(t => t.isEditing)"
                    type="primary"
                    @click="saveSubTask"
                    style="max-height: 32px"
                  >
                    保存子任务
                  </el-button>
                </template>
                <el-table
                  :data="taskDetail?.subTaskList"
                  class="mt-3"
                  style="width: max-content"
                  ref="subTaskTableRef"
                >
                  <!-- 子任务标题 -->
                  <el-table-column label="子任务标题" align="center" width="180" fixed="left">
                    <template #header>
                      <span class="required-label">子任务标题</span>
                    </template>
                    <template #default="{ row }">
                      <el-input
                        v-if="row.isEditing"
                        v-model="row.name"
                        placeholder="请输入标题"
                        size="small"
                        style="width: 160px"
                      />
                      <template v-else>{{ row.name }}</template>
                    </template>
                  </el-table-column>
                  <!-- 任务状态 -->
                  <el-table-column label="任务状态" align="center">
                    <template #default="{ row }">
                      <span>{{ row.statusDesc }}</span>
                    </template>
                  </el-table-column>
                  <!-- 任务类别 -->
                  <el-table-column label="任务类别" align="center" width="150">
                    <template #header>
                      <span class="required-label">任务类别</span>
                    </template>
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
                      <template v-else>{{ row.taskCategoryName }}</template>
                    </template>
                  </el-table-column>

                  <!-- 任务来源 -->
                  <el-table-column label="任务来源" align="center" width="150">
                    <template #header>
                      <span class="required-label">任务来源</span>
                    </template>
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
                  <!-- 是否启用里程碑 -->
                  <el-table-column label="里程碑" prop="useMilestone" width="120" align="center">
                    <template #header>
                      <div style="width: 100%" class="required-label">
                        <span class="mr-2">里程碑</span>
                        <el-tooltip
                          content="任务周期大于30天时，将自动启用里程碑填写"
                          placement="top"
                        >
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
                  <el-table-column label="周报" prop="useWeeklyReport" width="120" align="center">
                    <template #header>
                      <div style="width: 100%" class="required-label">
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
                      <el-select v-model="row.useWeeklyReport" v-if="row.isEditing">
                        <el-option :value="1" label="启用" />
                        <el-option :value="0" label="不启用" />
                      </el-select>
                      <span v-else>{{ row.useWeeklyReport ? '启用' : '不启用' }}</span>
                    </template>
                  </el-table-column>
                  <!-- 执行人 -->
                  <el-table-column label="共同执行人" align="center" width="180">
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
                                  <el-avatar
                                    :src="item.avatar"
                                    :size="20"
                                    style="margin-right: 4px"
                                  />
                                  <span>{{ item.name }}</span>
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
                    <template #header>
                      <span class="required-label">执行者</span>
                    </template>
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
                  <el-table-column label="任务完成确认人" align="center" width="130">
                    <template #header>
                      <span class="required-label">任务完成确认人</span>
                    </template>
                    <template #default="{ row }">
                      <DeptMember
                        v-if="row.isEditing"
                        v-model="row.acceptor"
                        placeholder="选择确认人"
                        style="width: 120px"
                        teleported
                        :filterSelf="
                          taskDetail.creator === row.handler &&
                          taskDetail.creator !== '' &&
                          row.handler !== ''
                        "
                        :selfMemberCode="userInfo?.memberCode"
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
                    <template #header>
                      <span class="required-label">创建人</span>
                    </template>
                    <template #default="{ row }">
                      <div class="cell-with-avatar">
                        <el-avatar :src="row.creatorAvatar" :size="20" />
                        <span class="ml-1">{{ row.creatorName }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <!-- 截止时间 -->
                  <el-table-column label="截止时间" align="center" width="120">
                    <template #header>
                      <span class="required-label">截止时间</span>
                    </template>
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
                    <template #header>
                      <span class="required-label">任务详情说明</span>
                    </template>
                    <template #default="{ row }">
                      <el-input
                        v-model="row.detail"
                        type="textarea"
                        autosize
                        v-if="row.isEditing"
                      />
                      <!-- <template v-else>{{ row.detail }}</template> -->
                      <EllipsisExpandable :text="row.detail" :line-clamp="2" v-else />
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
              </el-form-item>
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
                :content="`${item.name}${
                  item.type === 1 ? '，创建者' : item.type === 2 ? '，执行者' : ''
                }`"
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
              <!-- <KeenFileUpload
              v-if="taskDetail?.attachmentList"
              v-model="taskDetail.attachmentList"
              directory="tasksManage"
              :limit="null"
              multiple
              showOperate
              :uploadListStyle="{
                width: '80%',
              }"
              @change="handleFileChange"
            >
              <el-icon style="top: 3px" size="16">
                <Upload />
              </el-icon>
            </KeenFileUpload> -->
              <KeenFileUpload
                v-model="taskDetail.attachmentList"
                accept=".xlsx,.xls"
                directory="tasksManage"
                :limit="null"
                multiple
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
                    <span class="cursor-pointer me-6">下载附件</span>
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
    </KeenCard>
  </div>
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

<script setup lang="ts" name="taskManageCreate">
  import { memberApi, platformApi } from '@/api';
  import { Plus, QuestionFilled, Upload, Close } from '@element-plus/icons-vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import dayjs from 'dayjs';
  import { useStore } from '@/store/modules/useStore';
  import CreateDialog from '@/views/lute-os/taskManage/components/createDialog.vue';
  import FixedStatusBar from '@/views/lute-os/taskManage/components/fixedStatusBar.vue';
  import EllipsisExpandable from '@/views/lute-os/taskManage/components/ellipsisExpandable.vue';
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

  const taskDetail = ref({
    name: '',
    source: '',
    taskCategoryCode: '',
    taskCategoryName: '',
    handler: '',
    acceptor: '',
    creator: userInfo?.memberCode,
    deadline: '',
    detail: '',
    memberList: [],
    attachmentList: [],
    dingLink: '',
    useMilestone: 1,
    useWeeklyReport: 1,
    milestoneList: [],
    taskReportList: [],
    taskCategoryList: [],
    sourceList: [],
    approvalStatus: 1,
    approvalStatusDesc: '',
    approvalStatusColor: '',
    subTaskList: [],
    taskCode: '',
    taskCodeList: [],
  }); // 当前用于内容区切换展示
  const buttonAuth = ref(null);
  const taskInfoRows = computed(() => {
    const detail = taskDetail.value || {};
    const firstRow = {
      title: detail.name || '',
      source: detail.source || '',
      useMilestone: detail.useMilestone,
      useWeeklyReport: detail.useWeeklyReport,
      taskCategoryCode: detail.taskCategoryCode || '',
      taskCategoryName: detail.taskCategoryName || '',
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
      deadline: detail.endTime || '',
    };
    return [firstRow, { isDetailHeader: true }, { detail: detail.detail || '' }];
  });
  const editing = ref(false);
  const isEdit = computed(() => {
    return (
      ((taskDetail.value?.approvalStatus === 1 || taskDetail.value?.approvalStatus === 4) &&
        isCreator.value) ||
      editing.value
    );
  });

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
        return { rowspan: 1, colspan: 9 };
      } else {
        return { rowspan: 0, colspan: 0 };
      }
    }
    // “任务详情” 内容行
    if (rowIndex === 2) {
      if (columnIndex === 0) {
        return { rowspan: 1, colspan: 9 };
      } else {
        return { rowspan: 0, colspan: 0 };
      }
    }
    return { rowspan: 1, colspan: 1 };
  }
  const handleAddLocalTask = (localTask) => {
    taskDetail.value.subTaskList.push(localTask);
  };
  const handleSaveLocalTask = (localTask) => {
    taskDetail.value.subTaskList.push(localTask);
  };
  const selectValue = ref([]);
  const addShow = ref(false);
  const memberSelectRef = ref();
  const handleAdd = () => {
    selectValue.value = taskDetail.value.memberList?.map((item) => item.memberCode);
    addShow.value = true;
    memberSelectRef.value?.focus();
  };

  function formatSubTaskDisplayFields(task) {
    // 任务类别
    const category = categoryOptions.value.find(
      (i) => i.taskCategoryCode === task.taskCategoryCode
    );
    task.taskCategoryName = category?.taskCategoryName || '';

    // 任务来源
    task.sourceDesc =
      task.source === 1
        ? '日常反馈'
        : task.source === 2
        ? '重点会议'
        : task.source === 3
        ? 'CEO 指示'
        : '';

    // 执行者（handler）
    const handlerInfo = operatorOptions.value.find((i) => i.memberCode === task.handler);
    console.log('handlerInfo', handlerInfo);
    task.handlerName = handlerInfo?.name || '';
    task.handlerAvatar = handlerInfo?.avatar || '';

    // 确认人（acceptor）
    const acceptorInfo = operatorOptions.value.find((i) => i.memberCode === task.acceptor);
    task.acceptorName = acceptorInfo?.name || '';
    task.acceptorAvatar = acceptorInfo?.avatar || '';

    task.memberList = (task.memberList || []).map((member) => {
      const memberCode = typeof member === 'string' ? member : member.memberCode;
      const fullInfo = operatorOptions.value.find((i) => i.memberCode === memberCode);
      return {
        memberCode,
        name: fullInfo?.name || '',
        avatar: fullInfo?.avatar || '',
      };
    });
    console.log('task', task);
  }
  const checkSubTask = () => {
    const editingRows = taskDetail.value.subTaskList.filter((t) => t.isEditing);
    const scrollToFirstInvalidRow = (predicate) => {
      const index = editingRows.findIndex(predicate);
      if (index !== -1) {
        const rowEl = subTaskTableRef.value?.$el?.querySelectorAll('.el-table__body tbody > tr')[
          index
        ];
        rowEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    if (taskDetail.value.subTaskList.length > 0) {
      if (editingRows.length > 0) {
        // 有正在编辑的行才需要校验并弹窗
        if (editingRows.some((t) => t.name === '')) {
          ElMessage.warning('请先填写子任务标题');
          scrollToFirstInvalidRow((t) => t.name === '');
          return false;
        }
        if (editingRows.some((t) => t.taskCategoryCode === '')) {
          ElMessage.warning('请先选择任务类别');
          scrollToFirstInvalidRow((t) => t.taskCategoryCode === '');
          return false;
        }
        if (editingRows.some((t) => t.source === '')) {
          ElMessage.warning('请先选择任务来源');
          scrollToFirstInvalidRow((t) => t.source === '');
          return false;
        }
        if (editingRows.some((t) => t.handler === '')) {
          ElMessage.warning('请先选择执行人');
          scrollToFirstInvalidRow((t) => t.handler === '');
          return false;
        }
        if (editingRows.some((t) => t.acceptor === '')) {
          ElMessage.warning('请先选择确认人');
          scrollToFirstInvalidRow((t) => t.acceptor === '');
          return false;
        }
        if (editingRows.some((t) => t.endTime === '')) {
          ElMessage.warning('请先选择截止时间');
          scrollToFirstInvalidRow((t) => t.endTime === '');
          return false;
        }
        if (editingRows.some((t) => t.detail === '')) {
          ElMessage.warning('请先填写任务详情');
          scrollToFirstInvalidRow((t) => t.detail === '');
          return false;
        }
      }
    }
    return true;
  };
  const saveSubTask = async () => {
    if (!checkSubTask()) return;
    // 清除编辑状态
    taskDetail.value.subTaskList.forEach((t) => {
      if (t.isEditing) formatSubTaskDisplayFields(t);
      t.isEditing = false;
    });
  };
  async function addEditableRow() {
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
      const tableWrapper = subTaskTableRef.value.$el.querySelector('.el-table__body-wrapper');
      if (tableWrapper) {
        tableWrapper.scrollTo({
          top: tableWrapper.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  }

  // ③ 删除行
  function removeRow(index: number) {
    taskDetail.value.subTaskList.splice(index, 1);
  }
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
  const handlerSelectRef = ref();

  // const handleChange = (val) => {
  //   memberList.value = memberList.value.filter((item) => item.type !== 2);
  //   if (val) {
  //     const isExistInfo = memberList.value.find((item) => item.memberCode === val);
  //     if (isExistInfo) isExistInfo.type = 2;
  //     else {
  //       const operator = operatorOptions.value?.find((item) => item.memberCode === val);
  //       memberList.value.push({
  //         name: operator?.name,
  //         avatar: operator?.avatar,
  //         memberCode: operator?.memberCode,
  //         type: 2,
  //       });
  //     }
  //   }
  // };

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
  onDeactivated(() => {
    const el = document.querySelector('.el-main');
    if (el && el._originOverflow !== undefined) {
      el.style.overflow = el._originOverflow;
    }
  });
  const submitReport = async (item) => {
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
    } finally {
      item.loading = false;
    }
  };

  const nameInputRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    if (!taskDetail.value?.name) {
      ElMessage.warning('请输入任务标题');
      return;
    }
    if (!taskDetail.value?.handler) {
      ElMessage.warning('请选择执行者');
      return;
    }
    if (!taskDetail.value?.acceptor) {
      ElMessage.warning('请选择任务完成确认人');
      return;
    }
    // 校验子任务标题
    if (taskDetail.value.subTaskList.some((item) => !item.name)) {
      ElMessage.warning('请填写子任务标题');
      return;
    }
    // 校验子任务类别
    if (taskDetail.value.subTaskList.some((item) => !item.taskCategoryCode)) {
      ElMessage.warning('请选择子任务类别');
      return;
    }
    // 校验子任务来源
    if (taskDetail.value.subTaskList.some((item) => !item.source)) {
      ElMessage.warning('请选择子任务来源');
      return;
    }
    // 校验子任务执行者
    if (taskDetail.value.subTaskList.some((item) => !item.handler)) {
      ElMessage.warning('请选择子任务执行者');
      return;
    }
    // 校验子任务完成确认人
    if (taskDetail.value.subTaskList.some((item) => !item.acceptor)) {
      ElMessage.warning('请选择子任务完成确认人');
      return;
    }
    // 校验子任务截止时间
    if (taskDetail.value.subTaskList.some((item) => !item.endTime)) {
      ElMessage.warning('请选择子任务截止时间');
      return;
    }
    // 校验子任务详情
    if (taskDetail.value.subTaskList.some((item) => !item.detail)) {
      ElMessage.warning('请填写子任务详情');
      return;
    }
    saveLoading.value = true;
    try {
      const res = await platformApi.platformTaskSaveTask({
        ...taskDetail.value,
        operateType: 'save',
        calendarLinkList: taskDetail.value.dingLink?.split(',') || [],
        memberCodeList: Array.from(
          new Set(taskDetail.value.memberList.map((item) => item.memberCode || item))
        ),
        attachmentList: taskDetail.value.attachmentList?.map((item) => {
          return {
            fileName: item?.name || item?.fileName,
            fileKey: item?.ossKey || item?.fileKey,
          };
        }),
      });
      if (res?.taskCode) {
        const subTaskRes = await Promise.all(
          taskDetail.value.subTaskList
            .filter((task) => task.name && task.taskCategoryCode && task.handler)
            .map((task) => {
              return platformApi.platformTaskSaveTask({
                ...task,
                parentTaskCode: res?.taskCode,
                operateType: 'save',
                memberCodeList: Array.from(
                  new Set(task.memberList.map((item) => item.memberCode || item))
                ),
                attachmentList: task.attachmentList?.map((item) => {
                  return {
                    fileName: item?.name || item?.fileName,
                    fileKey: item?.ossKey || item?.fileKey,
                  };
                }),
                calendarLinkList: task.dingLink?.split(',') || [],
              });
            })
        );
        if (subTaskRes.every((item) => item.taskCode)) {
          ElMessage.success('保存成功');
          taskDetail.value = {
            name: '',
            source: '',
            taskCategoryCode: '',
            taskCategoryName: '',
            handler: '',
            acceptor: '',
            creator: userInfo?.memberCode,
            deadline: '',
            detail: '',
            memberList: [],
            attachmentList: [],
            dingLink: '',
            useMilestone: 1,
            useWeeklyReport: 1,
            milestoneList: [],
            taskReportList: [],
            taskCategoryList: [],
            sourceList: [],
            approvalStatus: 1,
            approvalStatusDesc: '',
            approvalStatusColor: '',
            subTaskList: [],
            taskCode: '',
            taskCodeList: [],
          };
          router.back();
        }
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const timeSelectRef = ref();
  const subTaskTableRef = ref();
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
    if (!taskDetail.value?.handler) {
      ElMessage.warning('请选择执行者');
      return;
    }
    if (!taskDetail.value?.acceptor) {
      ElMessage.warning('请选择任务完成确认人');
      return;
    }
    if (!taskDetail.value?.source) {
      ElMessage.warning('请选择任务来源');
      return;
    }
    if (!taskDetail.value?.taskCategoryCode) {
      ElMessage.warning('请选择任务类别');
      return;
    }
    // 校验子任务的填写状况
    if (!checkSubTask()) return;

    const isConfirmed = await swal.confirm(
      '任务发起后将向对应责任人发起钉钉待办通知，审批通过后进入正式开启状态'
    );
    if (!isConfirmed) return;
    try {
      saveLoading.value = true;
      const res = await platformApi.platformTaskSaveTask({
        ...taskDetail.value,
        operateType: 'approve',
        memberCodeList: Array.from(
          new Set(taskDetail.value.memberList?.map((item) => item.memberCode || item))
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
      if (res.taskCode) {
        const subTaskRes = await Promise.all(
          taskDetail.value.subTaskList
            .filter((task) => task.name && task.taskCategoryCode && task.handler)
            .map((task) => {
              return platformApi.platformTaskSaveTask({
                ...task,
                parentTaskCode: res?.taskCode,
                operateType: 'approve',
                memberCodeList: Array.from(
                  new Set(task.memberList.map((item) => item.memberCode || item))
                ),
                attachmentList: task.attachmentList?.map((item) => {
                  return {
                    fileName: item?.name || item?.fileName,
                    fileKey: item?.ossKey || item?.fileKey,
                  };
                }),
                calendarLinkList: task.dingLink?.split(',') || [],
              });
            })
        );
        console.log(subTaskRes, 'subTaskRes-创建成功');
        if (subTaskRes.every((item) => item.taskCode)) {
          ElMessage.success('保存成功');
          taskDetail.value = {
            name: '',
            source: '',
            taskCategoryCode: '',
            taskCategoryName: '',
            handler: '',
            acceptor: '',
            creator: userInfo?.memberCode,
            deadline: '',
            detail: '',
            memberList: [],
            attachmentList: [],
            dingLink: '',
            useMilestone: 1,
            useWeeklyReport: 1,
            milestoneList: [],
            taskReportList: [],
            taskCategoryList: [],
            sourceList: [],
            approvalStatus: 1,
            approvalStatusDesc: '',
            approvalStatusColor: '',
            subTaskList: [],
            taskCode: '',
            taskCodeList: [],
          };
          router.back();
        }
      }
    } finally {
      saveLoading.value = false;
    }
  };
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
  const deleteFile = (file) => {
    const idx = taskDetail.value.attachmentList.findIndex(
      (item) => (item.ossKey || item.fileKey) === (file.ossKey || file.fileKey)
    );
    if (idx !== -1) {
      taskDetail.value.attachmentList.splice(idx, 1);
    }
  };
  // 保存里程碑信息
  const saveMilestone = async () => {
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
  const taskInfoRowClass = (row) => {
    return row.rowIndex === 1 ? 'task-detail-header-row' : '';
  };
  // 任务执行者变化时，自动设置完成确认人
  watch(
    () => taskDetail.value.handler,
    (val) => {
      if (taskDetail.value.creator !== val && taskDetail.value.handler !== undefined) {
        taskDetail.value.acceptor = userInfo?.memberCode;
      }
      if (taskDetail.value.creator === val && taskDetail.value.acceptor === val) {
        taskDetail.value.acceptor = '';
      }
    }
  );
  watch(
    () => taskDetail.value.subTaskList.map((task) => task.handler),
    (handlers, oldHandlers) => {
      taskDetail.value.subTaskList.forEach((task, idx) => {
        const val = handlers[idx];
        if (taskDetail.value.creator !== val && val !== undefined && val !== '') {
          task.acceptor = userInfo?.memberCode;
        }
        if (taskDetail.value.creator === val && task.acceptor === val) {
          task.acceptor = '';
        }
      });
    },
    { deep: true }
  );

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
    max-height: 77vh;

    .detail-card {
      max-height: 77vh;
    }

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
        overflow-y: scroll;
        max-height: 67vh;

        .desc {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: #999;
          margin-bottom: 10px;
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
            max-width: 260px;
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
          background-color: #fff;
          // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          padding-bottom: 5px;
          border-bottom: 1px solid var(--bs-border-color);
          top: 0;
          right: 0;
        }

        //width: 30%;
        // flex: 3;
        position: sticky;
        top: 0;
        right: 0;
        max-height: 65vh;

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

  :deep(.el-table__header) {
    .el-table__cell {
      background-color: rgba(244, 244, 244, 1);
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      color: rgba(89, 89, 89, 1);
      padding: 10px 0;
    }
  }

  // :deep(.el-main) {
  //   overflow: hidden !important;
  // }

</style>
