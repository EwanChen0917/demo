<template>
  <el-form
    class="notification-detail-page"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="120px"
    scroll-to-error
    :scroll-into-view-options="{ block: 'center' }"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" :maxlength="30" placeholder="请输入通知标题" />
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="form.author" :maxlength="15" placeholder="请输入作者" />
    </el-form-item>
    <el-form-item label="封面" class="cover-form-item" prop="coverPath">
      <KeenImageUpload
        :modelValue="form.coverUrl || ''"
        @upload-success="
          ({ ossKey }) => {
            form.coverUrl = ossKey;
            form.coverPath = ossKey;
          }
        "
        directory="ai/notification"
        :sizeLimit="2 * 1024 * 1024"
      />
      <div class="info">推荐尺寸144px*96px；支持.jpg,.jpeg,.png类型文件，2M以内</div>
    </el-form-item>
    <el-form-item label="通知内容" prop="content">
      <NoticeEditor v-model="form.content" ref="noticeEditorRef" />
    </el-form-item>
    <!-- 附件 -->
    <el-form-item v-if="!!form.attachmentList" label="附件" prop="attachmentList">
      <KeenFileUpload
        v-model="fileList"
        directory="ai/notification"
        accept=".doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip"
        :size-limit="50 * 1024 * 1024"
        multiple
        :limit="5"
        :showOperate="false"
        @success="
          (ossKey) => {
            form.attachmentList![form.attachmentList!.length - 1].fileKey = ossKey;
          }
        "
      >
        <div class="btn-upload">
          <el-button :disabled="fileList.length >= 5" type="primary" size="small">
            选择文件
          </el-button>
          <div class="info">支持.doc,.docx.,pdf,xls,xlsx,.ppt,.pptx,.zip类型文件，50M以内</div>
        </div>
      </KeenFileUpload>
    </el-form-item>
    <el-form-item label="分类" prop="labelCode">
      <el-space>
        <el-select
          v-model="form.labelCode"
          placeholder="请选择分类"
          clearable
          filterable
          value-on-clear=""
        >
          <el-option
            v-for="label in allLabel"
            :key="label.labelCode"
            :label="label.name"
            :value="label.labelCode"
          />
        </el-select>
        <el-button type="primary" icon="plus" @click="addLabelModalRef?.open">新建分类</el-button>
      </el-space>
    </el-form-item>
    <el-form-item label="发送范围" prop="deptIdList">
      <el-tree-select
        ref="catTreeSelectRef"
        placeholder="请选择部门"
        v-model="form.deptIdList"
        :data="deptTree"
        multiple
        filterable
        clearable
        check-strictly
        popper-class="picker-cat-tree-select"
        highlight-current
      />
    </el-form-item>
    <el-form-item label="" prop="isTop">
      <el-checkbox :true-value="1" :false-value="0" v-model="form.isTop">设为置顶通知</el-checkbox>
    </el-form-item>
    <el-form-item v-if="form.state !== State.publish" label="" prop="scheduled">
      <el-checkbox
        :true-value="1"
        :false-value="0"
        v-model="form.scheduled"
        @change="form.scheduledTime = ''"
      >
        定时发送
      </el-checkbox>
    </el-form-item>
    <el-form-item label="" prop="scheduledTime" v-if="form.scheduled">
      <el-date-picker
        v-model="form.scheduledTime"
        type="datetime"
        placeholder="请选择发送时间"
        time-format="HH:mm"
        value-format="YYYY-MM-DD HH:mm"
        :disabled-date="(data: Date) => dayjs().isAfter(data, 'm')"
      />
    </el-form-item>
    <el-form-item label="弹窗跳转链接" prop="detailUrl">
      <el-input v-model="form.detailUrl" placeholder="请输入跳转链接" />
    </el-form-item>
    <div class="footer">
      <el-button
        :loading="loading === State.pending"
        :disabled="loading !== -1"
        v-if="form.scheduled"
        type="primary"
        @click="save(State.pending)"
      >
        保存
      </el-button>
      <el-button
        :loading="loading === State.publish"
        :disabled="loading !== -1"
        v-else
        type="primary"
        @click="save(State.publish)"
      >
        发布
      </el-button>
      <el-button
        :loading="loading === State.draft"
        :disabled="loading !== -1"
        v-if="form.state !== State.publish"
        type="info"
        @click="save(State.draft)"
      >
        存草稿
      </el-button>
    </div>
  </el-form>
  <AddLabelModal ref="addLabelModalRef" @success="updateAllLabel" />
</template>

<script lang="ts" setup name="LuteAssistantNotificationDetail">
  import { memberApi, aiApi, type MemberContracts, type AiContracts } from '@/api';
  import dayjs from 'dayjs';
  import { ElMessage, FormInstance } from 'element-plus';
  import NoticeEditor from './components/NoticeEditor.vue';
  import useAllLable from './hooks/useAllLable';
  import AddLabelModal from './modal/addLabel.vue';
  import { State } from './constant';

  const router = useRouter();
  const route = useRoute();
  const form = reactive<AiContracts.NotifySaveReq>({
    title: '', // 默认字符串为空
    content: '', // 默认字符串为空
    attachmentList: undefined, // 默认数组为空
    coverPath: '', // 默认字符串为空
    isTop: 0, // 默认数字为0
    scheduled: 0, // 默认布尔值为false
    scheduledTime: undefined, // 默认时间为null
    detailUrl: '', // 默认字符串为空
    labelCode: '', // 默认字符串为空
    author: '', // 默认字符串为空
    deptIdList: [], // 默认数组为空
  });
  const rules = ref({
    title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
    author: [{ required: true, message: '请添加作者', trigger: 'blur' }],
    deptIdList: [{ required: true, message: '请选择发送部门', trigger: 'change' }],
    scheduledTime: [{ required: true, message: '请选择发布时间', trigger: 'change' }],
  });
  const fileList = ref<
    {
      name: string;
      ossKey: string;
      size: number;
    }[]
  >([]);
  watch(fileList, (newState) => {
    nextTick(() => {
      console.log(newState);
      form.attachmentList = newState.map((item) => ({
        fileName: item.name,
        fileSize: String(item.size),
        fileKey: item.ossKey,
      }));
    });
  });
  const addLabelModalRef = ref<InstanceType<typeof AddLabelModal>>();
  const noticeEditorRef = ref<InstanceType<typeof NoticeEditor>>();
  if (route.query.notifyCode) {
    aiApi.luteosAiNotifyDetail({ notifyCode: route.query.notifyCode as string }).then((res) => {
      Object.assign(form, res);
      if (form.state === State.publish) {
        form.scheduled = 0;
        form.scheduledTime = undefined;
      }
      fileList.value =
        res.attachmentList?.map((item) => ({
          name: item.fileName,
          ossKey: item.fileKey,
          size: Number(item.fileSize),
        })) || [];
      noticeEditorRef.value?.setContent(res.content || '');
    });
  } else {
    form.attachmentList = [];
  }
  const formRef = ref<FormInstance>();
  const loading = ref(-1); // -1表示未加载，0表示草稿，1表示发布，2表示待发布,对应的按钮进入loading状态
  const save = async (state: number) => {
    if (state !== State.draft) {
      const result = await formRef.value?.validate();
      if (!result) return;
    }
    loading.value = state;
    const res = await aiApi.luteosAiNotifySaveOrUpdate({ ...form, state }).finally(() => {
      loading.value = -1;
    });
    const tip =
      state === State.draft ? '存草稿' : state === State.publish ? '发布成功' : '保存成功';
    ElMessage.success(tip);
    router.replace({ name: 'LuteAssistantNotification' });
  };

  const deptTreeData = ref<MemberContracts.DeptInfoBean[]>([]);
  const queryDeptTree = async () => {
    const res = await memberApi.luteosMemberQueryDeptTree();
    deptTreeData.value = res.deptInfoList || [];
  };
  queryDeptTree();
  const deptTree = computed(() => {
    const mapNode = (item, level = 1) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    return deptTreeData.value?.map((item) => mapNode(item));
  });
  const { allLabel, updateAllLabel } = useAllLable();

  onActivated(() => {
    if (!route.query.notifyCode) {
      // 新建模式：重置表单，清除上次编辑/新建的残留数据
      Object.assign(form, {
        title: '',
        content: '',
        attachmentList: [],
        coverPath: '',
        isTop: 0,
        scheduled: 0,
        scheduledTime: undefined,
        detailUrl: '',
        labelCode: '',
        author: '',
        deptIdList: [],
        notifyCode: undefined,
        state: undefined,
      });
      fileList.value = [];
      formRef.value?.clearValidate();
    }
    // initTinymce 内部会先销毁旧实例再重建，init 回调自动从 v-model 读取 form.content
    noticeEditorRef.value?.initTinymce();
  });
</script>

<style lang="scss" scoped>
  .notification-detail-page {
    background-color: #fff;
    padding: 24px 16px;
    .footer {
      display: flex;
      justify-content: center;
      gap: 8px;
    }
    .cover-form-item {
      :deep(.el-form-item__content) {
        align-items: start;
        flex-direction: column;
      }
    }
    .info {
      color: #999;
      font-size: 12px;
      margin-top: -2px;
      line-height: 2;
    }
    .el-select {
      width: 301px;
    }
  }
</style>
