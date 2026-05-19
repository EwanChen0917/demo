<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane v-for="tab in tabList" :key="tab.index" :label="tab.label" :name="tab.index">
      <KeenCard :title="tab.desc" class="card-wrap">
        <el-input
          v-if="tab.index !== 3"
          v-model="tab.content"
          type="textarea"
          placeholder="请输入"
          :rows="20"
          :disabled="!tab.isEdit"
        />
        <DeptMember
          v-else
          v-model="tab.content"
          :deptId="65717209"
          multiple
          placeholder="审核人"
          :searchChildDept="true"
          :disabled="!tab.isEdit"
          style="width: 100%"
        />
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <template v-if="tab.isEdit">
            <el-button @click="cancel(tab)">取消</el-button>
            <el-button type="primary" @click="save(tab)">保存</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="tab.isEdit = true">编辑</el-button>
          </template>
        </div>
      </KeenCard>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="emailHistoryBaseConfig">
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { metaApi } from '@/api';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const emailScene = 'email';
  const emailList = ref([]);
  const whiteEmailList = ref([]);
  const approveByList = ref([]);
  const activeTab = ref(1);
  const tabList = ref([
    {
      label: '屏蔽邮箱',
      desc: '不再记录收件邮箱或发件邮箱为以下邮箱的邮件内容',
      index: 1,
      content: '',
      isEdit: false,
    },
    {
      label: '白名单邮箱',
      desc: '以下邮箱不计算重复触达',
      index: 2,
      content: '',
      isEdit: false,
    },
    {
      label: '申诉配置',
      desc: '审核人',
      index: 3,
      content: [],
      isEdit: false,
    },
  ]);

  const queryBlackList = async () => {
    const res = await metaApi.luteosMetaEmailQueryEmailBlackList({
      scene: 'email',
      sceneList: 'email,approve_by',
    });
    emailList.value = res.emailList || [];
    whiteEmailList.value = res.whiteEmailList || [];
    approveByList.value = res.approveByList || [];
    tabList.value[0].content = emailList.value.join('\n');
    tabList.value[1].content = whiteEmailList.value.join('\n');
    tabList.value[2].content = approveByList.value;
  };
  queryBlackList();
  const save = async (tab) => {
    if (tab.index === 3) {
      const res = await metaApi.luteosMetaEmailSaveApproveConfig({
        approveByList: tab.content,
      });
      if (res) {
        ElMessage.success('保存成功');
        tab.isEdit = false;
        queryBlackList();
      }
      return;
    }
    if (tab.content) {
      tab.content = tab.content
        ?.split('\n')
        .filter((item) => item.trim())
        .join('\n');
      const illegalEmails = tab.content?.split('\n')?.filter((item) => {
        return !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}/.test(item);
      });

      if (illegalEmails?.length) {
        ElMessage.warning(`${illegalEmails?.join(',')}不是有效的邮箱地址，请重新输入`);
        return;
      }

      const res = await metaApi.luteosMetaEmailSaveEmailBlackList({
        type: tab.index,
        emailList: tab.content?.split('\n'),
        scene: emailScene,
      });
      if (res) {
        ElMessage.success('保存成功');
        queryBlackList();
        tab.isEdit = false;
      }
    } else {
      const res = await metaApi.luteosMetaEmailSaveEmailBlackList({
        type: tab.index,
        emailList: [],
        scene: emailScene,
      });
      if (res) {
        ElMessage.success('保存成功');
        queryBlackList();
        tab.isEdit = false;
      }
    }
  };

  const cancel = async (tab) => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    if (tab.index === 1) tab.content = emailList.value.join('\n');
    if (tab.index === 2) tab.content = whiteEmailList.value.join('\n');
    if (tab.index === 3) tab.content = approveByList.value;
    tab.isEdit = false;
  };
</script>

<style scoped lang="scss">
  .card-wrap {
    min-height: 600px;
  }
</style>
