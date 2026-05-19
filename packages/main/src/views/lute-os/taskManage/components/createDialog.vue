<template>
  <el-dialog
    class="w-650px custom-dialog"
    v-model="visible"
    align-center
    @close="visible = false"
    @click="addShow = false"
  >
    <template #header>
      <div class="header-title">创建任务</div>
    </template>
    <div class="dialog-body">
      <el-form label-width="280px" label-position="left">
        <el-form-item label="任务标题" label-position="top" required>
          <template #label>
            <div class="form-item-label">
              <span class="title">任务标题</span>
            </div>
          </template>
          <el-input
            id="nameInputRef"
            ref="nameInputRef"
            type="textarea"
            v-model="form.name"
            :rows="4"
            placeholder="输入标题以新建任务"
          />
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="责任人" label-width="100" required>
              <template #label>
                <div class="form-item-label">
                  <img class="icon" src="@/assets/svgs/avatar.svg" alt="" />
                  <span>执行者</span>
                </div>
              </template>
              <DeptMember
                style="width: 120px"
                id="handlerSelectRef"
                ref="handlerSelectRef"
                v-model="form.handler"
                @change="handleChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态" label-width="100">
              <template #label>
                <div class="form-item-label">
                  <span>任务状态</span>
                </div>
              </template>
              未开始
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="截止时间" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/clock.svg" alt="" />
              <span>截止时间</span>
            </div>
          </template>
          <el-date-picker
            style="width: 160px"
            id="timeSelectRef"
            ref="timeSelectRef"
            v-model="form.endTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择截止时间"
            clearable
            @change="handleTimeChange"
            :disabled-date="
              (date) =>
                ableStartTime
                  ? dayjs(date).isBefore(dayjs(ableStartTime)) ||
                    dayjs(date).isAfter(dayjs(ableEndTime))
                  : dayjs(date).isBefore(Date.now(), 'date') // 禁止选择过去的日期
            "
          />
        </el-form-item>
        <el-form-item label="任务完成确认人" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/avatar.svg" alt="" />
              <span>任务完成确认人</span>
            </div>
          </template>
          <DeptMember style="width: 160px" v-model="form.acceptor" :clearable="false" />
        </el-form-item>
        <el-form-item label="任务类别" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/category.svg" alt="" />
              <span>任务类别</span>
            </div>
          </template>
          <el-select
            id="categorySelectRef"
            ref="categorySelectRef"
            style="width: 160px"
            v-model="form.taskCategoryCode"
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
        </el-form-item>
        <el-form-item label="任务来源" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/source.svg" alt="" />
              <span>任务来源</span>
            </div>
          </template>
          <el-select
            id="sourceSelectRef"
            ref="sourceSelectRef"
            style="width: 160px"
            v-model="form.source"
            placeholder="请选择任务来源"
          >
            <el-option :value="1" label="日常反馈" />
            <el-option :value="2" label="重点会议" />
            <el-option :value="3" label="CEO指示" />
          </el-select>
        </el-form-item>
        <el-form-item label="里程碑" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/milestone.svg" alt="" />
              <span>里程碑</span>
            </div>
          </template>
          <div class="d-flex align-items-center flex-wrap" style="gap: 16px">
            <el-select
              style="width: 160px"
              v-model="form.useMilestone"
              :disabled="useMilestoneDisabled"
            >
              <el-option :value="1" label="启用" />
              <el-option :value="0" label="不启用" />
            </el-select>
            <div class="tips">注：任务周期大于30天时，将自动启用里程碑填写</div>
          </div>
        </el-form-item>
        <el-form-item label="周报" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/weekReport.svg" alt="" />
              <span>周报</span>
            </div>
          </template>
          <div class="d-flex align-items-center flex-wrap" style="gap: 16px">
            <el-select style="width: 160px" v-model="form.useWeeklyReport">
              <el-option :value="1" label="启用" />
              <el-option :value="0" label="不启用" />
            </el-select>
            <div class="tips">注：周报开启后，每周四将通过钉钉定时向执行人发送周报填写待办</div>
          </div>
        </el-form-item>
        <el-form-item label="任务详情说明" required>
          <template #label>
            <div class="form-item-label">
              <img class="icon" src="@/assets/svgs/detail.svg" alt="" />
              <span>任务详情说明</span>
            </div>
          </template>
          <!--            <div v-if="isEdit" id="editorRef">-->
          <el-input
            id="editorRef"
            ref="editorRef"
            type="textarea"
            :rows="4"
            v-model="form.detail"
            clearable
          />
        </el-form-item>
      </el-form>

      <!--      <el-row>
        <el-col :span="12">
          <div>
            责任人：
            <DeptMember
              id="handlerSelectRef"
              ref="handlerSelectRef"
              v-model="form.handler"
              size="small"
              @change="handleChange"
            />
          </div>
        </el-col>
        <el-col :span="12">
          任务：未开始
          &lt;!&ndash;          <el-select v-model="form.status" size="small">
            <el-option :value="0" label="未开始" />
          </el-select>&ndash;&gt;
        </el-col>
      </el-row>-->
      <!--      <el-row>
        &lt;!&ndash;        <el-col>&ndash;&gt;
        &lt;!&ndash;          时间：&ndash;&gt;
        &lt;!&ndash;          <el-date-picker&ndash;&gt;
        &lt;!&ndash;            style="width: 160px"&ndash;&gt;
        &lt;!&ndash;            id="timeSelectRef"&ndash;&gt;
        &lt;!&ndash;            ref="timeSelectRef"&ndash;&gt;
        &lt;!&ndash;            v-model="form.endTime"&ndash;&gt;
        &lt;!&ndash;            type="date"&ndash;&gt;
        &lt;!&ndash;            value-format="YYYY-MM-DD"&ndash;&gt;
        &lt;!&ndash;            clearable&ndash;&gt;
        &lt;!&ndash;            placeholder="请选择"&ndash;&gt;
        &lt;!&ndash;            size="small"&ndash;&gt;
        &lt;!&ndash;            @change="handleTimeChange"&ndash;&gt;
        &lt;!&ndash;            :disabled-date="&ndash;&gt;
        &lt;!&ndash;              (date) =>&ndash;&gt;
        &lt;!&ndash;                ableStartTime&ndash;&gt;
        &lt;!&ndash;                  ? dayjs(date).isBefore(dayjs(ableStartTime)) ||&ndash;&gt;
        &lt;!&ndash;                    dayjs(date).isAfter(dayjs(ableEndTime))&ndash;&gt;
        &lt;!&ndash;                  : false&ndash;&gt;
        &lt;!&ndash;            "&ndash;&gt;
        &lt;!&ndash;          />&ndash;&gt;
        &lt;!&ndash;        </el-col>&ndash;&gt;
        <el-col>
          任务完成确认人：
          <DeptMember v-model="form.acceptor" size="small" :clearable="false" />
        </el-col>
        <el-col>
          任务来源：
          <el-select v-model="form.source" size="small">
            <el-option :value="1" label="日常反馈" />
            <el-option :value="2" label="重点会议" />
            <el-option :value="3" label="CEO指示" />
          </el-select>
        </el-col>
        <el-col>
          里程碑：
          <el-select
            size="small"
            style="width: 160px"
            v-model="form.useMilestone"
            :disabled="useMilestoneDisabled"
          >
            <el-option :value="1" label="启用" />
            <el-option :value="0" label="不启用" />
          </el-select>
        </el-col>
        <el-col>
          周报：
          <el-select size="small" style="width: 160px" v-model="form.useWeeklyReport">
            <el-option :value="1" label="启用" />
            <el-option :value="0" label="不启用" />
          </el-select>
        </el-col>
      </el-row>
      <div class="line mt-5"></div>
      <el-row>
        <el-col>
          任务详情说明
          <el-input
            id="editorRef"
            type="textarea"
            v-model="form.detail"
            :rows="4"
            placeholder="请输入任务详情说明"
          />
          &lt;!&ndash;            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              mode="default"
            />
            <Editor
              style="height: 200px; overflow-y: hidden"
              v-model="form.detail"
              :defaultConfig="editorConfig"
              mode="default"
              @on-created="handleCreated"
            />&ndash;&gt;
        </el-col>
      </el-row>-->
      <div class="line"></div>
      <el-row>
        <el-col style="height: unset">
          <div class="d-flex gap-3 align-items-center">
            <span>共同执行人</span>
            <span class="text-gray-500">{{ memberList?.length }}</span>
            <el-tooltip content="共同执行人将会收到任务更新通知" placement="top">
              <QuestionFilled style="height: 16px; width: 16px" />
            </el-tooltip>
          </div>
          <div class="d-flex gap-3 align-items-center">
            <el-tooltip
              v-for="(item, index) in memberList"
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
                />
                <el-button size="small" class="w-100" type="primary" @click="handleConfirm">
                  确认
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col>
          <div class="d-flex">
            <div class="flex-shrink-0">添加附件：</div>
            <KeenFileUpload
              accept=".xlsx,.xls"
              class="packing-upload"
              v-model="form.attachmentList"
              directory="tasksManage"
              ref="uploadRef"
              :limit="null"
              multiple
              showOperate
            >
              <el-icon style="top: 2px">
                <Upload />
              </el-icon>
            </KeenFileUpload>
          </div>
        </el-col>
      </el-row>
      <!--      <div class="line"></div>
      <el-row>
        <el-col>
          关联日程：
          <el-input
            type="textarea"
            :rows="4"
            size="small"
            v-model="form.dingLink"
            placeholder="钉钉日程链接（多个用,分隔）"
            clearable
          />
        </el-col>
      </el-row>-->
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-button size="small" type="primary" @click="submit" v-if="!props.isCreate">发起任务</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { Close, Plus, QuestionFilled, Upload } from '@element-plus/icons-vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus'; // 引入 css
  import { platformApi } from '@/api';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const { userInfo } = useStore();
  const visible = ref(false);
  const title = ref('创建任务');
  const emit = defineEmits(['submit', 'updateCategory', 'add-local-task', 'save-local-task', 'success']);
  const props = defineProps({
    isCreate: {
      type: Boolean,
      default: false,
    },
  });
  const form = ref({
    status: 1,
    source: '',
    time: [],
    useMilestone: 0,
    useWeeklyReport: 1,
    dingLink: '',
    handler: '',
    detail: '',
    attachmentList: [],
  });

  const memberList = ref([
    {
      avatar: userInfo?.avatar,
      name: userInfo?.name,
      memberCode: userInfo?.memberCode,
      type: 1,
    },
  ]);

  const disabledList = computed(() => {
    return memberList.value.filter((item) => item.type === 1 || item.type === 2);
  });

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  const nameInputRef = ref();
  const handlerSelectRef = ref();
  const timeSelectRef = ref();
  const sourceSelectRef = ref();
  const categorySelectRef = ref();
  const buildLocalTask = () => {
    const handlerMember =
        operatorOptions.value.find((m) => m.memberCode === form.value.handler) || {};
      const creatorMember = {
        name: userInfo.name,
        avatar: userInfo.avatar,
        memberCode: userInfo.memberCode,
      };
      const acceptorMember =
        operatorOptions.value.find(
          (m) => m.memberCode === (form.value.acceptor || userInfo.memberCode)
        ) || creatorMember;
      const taskCategory = categoryOptions.value.find(
        (item) => item.taskCategoryCode === form.value.taskCategoryCode
      );
      const sourceDesc = (() => {
        switch (form.value.source) {
          case 1:
            return '日常反馈';
          case 2:
            return '重点会议';
          case 3:
            return 'CEO指示';
          default:
            return '';
        }
      })();
      const localTask = {
        ...form.value,
        acceptor: userInfo?.memberCode,
        calendarLinkList: form.value.dingLink?.split(',') || [],
        memberCodeList: Array.from(new Set(memberList.value?.map((item) => item.memberCode))),
        approvalStatusDesc: '未开始',
        approvalStatus: 1,
        sourceDesc: sourceDesc,
        taskCategoryName: taskCategory?.taskCategoryName,
        handlerName: handlerMember?.name,
        handlerAvatar: handlerMember?.avatar,
        acceptorName: acceptorMember?.name,
        acceptorAvatar: acceptorMember?.avatar,
        creatorName: creatorMember?.name,
        creatorAvatar: creatorMember?.avatar,
        attachmentList: form.value.attachmentList?.map((item) => {
          return {
            fileName: item?.name || item?.fileName,
            fileKey: item?.ossKey || item?.fileKey,
          };
        }),
      };
    return localTask;
  };
  const submit = async () => {
    if (!form.value?.name) {
      nameInputRef.value?.focus();
      document.getElementById('nameInputRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务标题');
      return;
    }
    if (!form.value?.handler) {
      handlerSelectRef.value?.focus();
      document.getElementById('handlerSelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务负责人');
      return;
    }
    if (!form.value?.endTime) {
      timeSelectRef.value?.focus();
      document.getElementById('timeSelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务时间');
      return;
    }
    if (!form.value?.source) {
      sourceSelectRef.value?.focus();
      document.getElementById('sourceSelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务来源');
      return;
    }
    if (!form.value?.taskCategoryCode) {
      categorySelectRef.value?.focus();
      document.getElementById('categorySelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务类别');
      return;
    }
    if (!form.value?.detail || form.value?.detail === '<p><br></p>') {
      editorRef.value?.focus();
      document.getElementById('editorRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务详情说明');
      return;
    }
    const isConfirmed = await swal.confirm(
      '任务发起后将向对应责任人发起钉钉待办通知，审批通过后进入正式开启状态'
    );
    if (!isConfirmed) return;
    if (props.isCreate) {
      const localTask = buildLocalTask();
      emit('add-local-task', localTask);
      visible.value = false;
      return;
    } else {
      const res = await platformApi.platformTaskSaveTask({
        ...form.value,
        operateType: 'approve',
        /* startTime: form.value.time?.[0],
      endTime: form.value.time?.[1], */
        calendarLinkList: form.value.dingLink?.split(',') || [],
        memberCodeList: Array.from(new Set(memberList.value?.map((item) => item.memberCode))),
        attachmentList: form.value.attachmentList?.map((item) => {
          return {
            fileName: item?.name || item?.fileName,
            fileKey: item?.ossKey || item?.fileKey,
          };
        }),
      });
      ElMessage.success('发起成功');
      emit('success');
      visible.value = false;
    }
  };

  const save = async () => {
    if (!form.value?.name) {
      nameInputRef.value?.focus();
      document.getElementById('nameInputRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请输入任务标题');
      return;
    }
    if (!form.value?.handler) {
      handlerSelectRef.value?.focus();
      document.getElementById('handlerSelectRef')?.scrollIntoView({ behavior: 'smooth' });
      ElMessage.warning('请选择任务负责人');
      return;
    }
    if (props.isCreate) {
      const localTask = buildLocalTask();
      emit('save-local-task', localTask);
      visible.value = false;
      return;
    } else {
      const res = await platformApi.platformTaskSaveTask({
        ...form.value,
        operateType: 'save',
        acceptor: userInfo?.memberCode,
        /* startTime: form.value.time?.[0],
      endTime: form.value.time?.[1], */
        calendarLinkList: form.value.dingLink?.split(',') || [],
        memberCodeList: Array.from(new Set(memberList.value?.map((item) => item.memberCode))),
        attachmentList: form.value.attachmentList?.map((item) => {
          return {
            fileName: item?.name || item?.fileName,
            fileKey: item?.ossKey || item?.fileKey,
          };
        }),
      });
      form.value.taskCode = res?.taskCode;
      ElMessage.success('保存成功');
      emit('success');
    }
  };

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };

  const categoryOptions = ref<any[]>([]);
  const getCategoryOptions = async () => {
    const res = await platformApi.platformTaskGetTaskCategoryList();
    categoryOptions.value = res.taskCategoryList || [];
  };
  getCategoryOptions();

  const handleChange = (val) => {
    memberList.value = memberList.value.filter((item) => item.type !== 2);
    if (val) {
      const isExistInfo = memberList.value.find((item) => item.memberCode === val);
      if (isExistInfo) isExistInfo.type = 2;
      else {
        const operator = operatorOptions.value?.find((item) => item.memberCode === val);
        memberList.value.push({
          name: operator?.name,
          avatar: operator?.avatar,
          memberCode: operator?.memberCode,
          type: 2,
        });
      }
    }
  };

  const selectValue = ref([]);
  const addShow = ref(false);
  const memberSelectRef = ref();
  const handleAdd = () => {
    selectValue.value = memberList.value.map((item) => item.memberCode);
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
    memberList.value?.splice(index, 1);
  };

  const handleConfirm = () => {
    console.log(selectValue.value);
    memberList.value = selectValue.value.map((val) => {
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

  const toolbarConfig = {
    excludeKeys: ['group-image', 'group-video', 'insertLink'],
  };
  const editorConfig = { placeholder: '请输入内容...' };

  // 组件销毁时，也及时销毁编辑器
  /* onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  }); */

  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  const useMilestoneDisabled = ref(false);
  const handleTimeChange = (val) => {
    useMilestoneDisabled.value = false;
    if (val) {
      if (dayjs(val).diff(dayjs(), 'day') > 30) {
        form.value.useMilestone = 1;
        useMilestoneDisabled.value = true;
        ElMessage.warning('任务周期大于30天，已自动启用里程碑');
      }
    }
  };

  const taskCategory = ref();
  const createTaskCategory = async () => {
    const res = await platformApi.platformTaskAddCategory({
      name: taskCategory.value,
    });
    ElMessage.success('创建成功');
    categoryOptions.value.push({
      taskCategoryCode: res.taskCategoryCode,
      taskCategoryName: taskCategory.value,
    });
    form.value.taskCategoryCode = res.taskCategoryCode;
    taskCategory.value = '';
    categorySelectRef.value.blur();
    emit('updateCategory');
  };

  // const getDraft = async () => {
  //   const res = await platformApi.platformTaskDetail();
  //   if (res) {
  //     form.value = res;
  //     form.value.time = [res?.startTime, res?.endTime];
  //     form.value.dingLink = res?.calendarLinkList?.join(',');
  //     form.value.detail = res?.detail ?? '';
  //     memberList.value = res?.memberList?.length
  //       ? res?.memberList?.map((item) => {
  //           return {
  //             name: item?.memberName,
  //             avatar: item?.avatar,
  //             memberCode: item?.memberCode,
  //             type:
  //               item?.memberCode === userInfo?.memberCode
  //                 ? 1
  //                 : item?.memberCode === res?.handler
  //                 ? 2
  //                 : null,
  //           };
  //         })
  //       : [
  //           {
  //             avatar: userInfo?.avatar,
  //             name: userInfo?.name,
  //             memberCode: userInfo?.memberCode,
  //             type: 1,
  //           },
  //         ];
  //   }
  // };

  const uploadRef = ref();
  const ableStartTime = ref();
  const ableEndTime = ref();

  const open = (parentTaskCode, startTime, endTime) => {
    ableStartTime.value = startTime;
    ableEndTime.value = endTime;
    form.value = {
      status: 1,
      source: '',
      time: [],
      useMilestone: 0,
      useWeeklyReport: 1,
      dingLink: '',
      handler: '',
      detail: '',
      attachmentList: [],
      acceptor: userInfo?.memberCode,
      parentTaskCode,
      taskCategoryCode: '',
    };
    memberList.value = [
      {
        avatar: userInfo?.avatar,
        name: userInfo?.name,
        memberCode: userInfo?.memberCode,
        type: 1,
      },
    ];
    form.value.dingLink = '';
    form.value.attachmentList = [];
    uploadRef.value?.clearFile();
    getOperatorOptions();
    // getDraft();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .dialog-body {
    max-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: var(--bs-scrollbar-color) transparent;
    z-index: 999;
    .title {
      color: #000000;
      /* &::before {
        content: '*';
        color: var(--el-color-danger);
        margin-right: 4px;
        font-size: var(--el-form-label-font-size);
      }*/
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
  .line {
    border-top: 1px solid var(--bs-border-color);
  }
  .el-col {
    //height: 44px;
    line-height: 44px;
  }
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
    bottom: -100px;
    left: 36px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  .avatar-bg {
    width: 28px;
    height: 28px;
    padding: 2px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
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
  :deep(.el-form-item--label-top .el-form-item__label) {
    display: inline-flex;
  }
</style>
