<template>
  <div class="card card-flush">
    <div class="card-body px-20 py-15">
      <div class="mb-15"><h3>编辑信息</h3></div>
      <el-form-item label="是否启用" prop="status">
        <el-checkbox v-model="form!.status" :true-value="1" :false-value="0" />
      </el-form-item>
      <el-form-item label="智能体岗位" prop="agentName" required>
        <el-input
          v-model="form!.agentName"
          placeholder="请填写智能体岗位信息，如法务咨询专员，15个字以内"
          :maxlength="15"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item label="智能体名称" prop="nickname" required>
        <el-input
          v-model="form!.nickname"
          placeholder="请填写智能体名称，中英文皆可，15个字以内"
          :maxlength="15"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item label="智能体简介" prop="description" required>
        <el-input
          type="textarea"
          :rows="1"
          v-model="form!.description"
          placeholder="请填写智能体简介，描述其核心能力与工作范围"
        />
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="智能体头像" prop="cover">
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--el-color-info-light-5)',
          }"
        >
          <KeenImageUpload
            v-model="form!.cover"
            directory="luteAssistant"
            tooltip="仅支持JPG/PNG格式，建议图片尺寸为126*126"
          />
          <div>仅支持JPG/PNG格式，建议图片尺寸为126*126</div>
        </div>
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="智能体logo" prop="logo">
        <KeenImageUpload v-model="form!.logo" directory="luteAssistant" tooltip="更改智能体logo" />
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="排序" prop="sort">
        <el-input-number
          :min="1"
          :step="1"
          step-strictly
          :controls="false"
          controls-position="right"
          v-model="form!.sort"
          placeholder="请输入智能体排序"
        />
      </el-form-item>
      <el-form-item label="智能体链接" class="difyUrl-label" prop="difyUrl" required>
        <el-input v-model="form!.difyUrl" placeholder="这是一串Roosync平台AI应用链接" clearable />
      </el-form-item>
      <el-form-item label="API密匙" prop="difyApiKey" required>
        <el-input v-model="form!.difyApiKey" placeholder="请填入对应智能体API密钥" clearable />
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="所属部门" prop="department" required>
        <el-input
          v-model="form!.department"
          placeholder="请填写智能体所属部门，15字以内"
          :maxlength="15"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item class="skills-label" label="主要技能" prop="skills" required>
        <el-table :show-header="false" :data="form!.skills">
          <el-table-column width="205" label="技能名称">
            <template #default="scope">
              <el-form-item
                :prop="`skills[${scope.$index}].name`"
                :rules="[{ required: true, message: '请输入技能名称' }]"
              >
                <el-input
                  v-model="form.skills[scope.$index].name"
                  placeholder="请输入技能名称"
                  s
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column width="175" prop="status" label="熟练度">
            <template #default="scope">
              <el-form-item
                :prop="`skills[${scope.$index}].status`"
                :rules="[{ required: true, message: '请选择熟练度' }]"
              >
                <el-select
                  v-model="form.skills[scope.$index].status"
                  placeholder="请选择熟练度"
                  class="text-start-input-number"
                >
                  <el-option :value="0" label="学习中" />
                  <el-option :value="1" label="已完成" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template #default="scope">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '新增',
                    key: 'add',
                    type: 'primary',
                    text: true,
                  },
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'danger',
                    text: true,
                    payload: scope,
                    hide: scope.$index === 0,
                  },
                ]"
                @click="handleKillActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        class="suggested-questions-label"
        label="开场问题"
        prop="suggestedQuestions"
        required
      >
        <el-table :show-header="false" :data="form!.suggestedQuestions">
          <el-table-column label="开场问题">
            <template #default="scope">
              <el-form-item
                :prop="`suggestedQuestions[${scope.$index}]`"
                :rules="[{ required: true, message: '请输入开场问题' }]"
              >
                <el-input
                  v-model="form.suggestedQuestions[scope.$index]"
                  placeholder="请输入开场问题，在用户开启对话前将展示在对话页面"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template #default="scope">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '新增',
                    key: 'add',
                    type: 'primary',
                    text: true,
                  },
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'danger',
                    text: true,
                    payload: scope,
                    hide: scope.$index === 0,
                  },
                ]"
                @click="handleQuesActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="是否联网" prop="networkEnable">
        <el-select v-model="form!.networkEnable" placeholder="请选择是否联网">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="是否深度思考" prop="thinkable">
        <el-select v-model="form!.thinkable" placeholder="请选择是否深度思考">
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="可见成员" prop="members">
        <el-tree-select
          clearable
          node-key="deptId"
          style="width: 100%"
          v-model="members"
          :data="membersData"
          :render-after-expand="true"
          multiple
          show-checkbox
          :props="{
            label: 'deptName',
            value: 'deptId',
            children: 'children',
          }"
          placeholder="可见成员"
        />
      </el-form-item>
      <el-form-item v-if="form.isSuperAdmin" label="管理员" prop="managerMembers">
        <el-tree-select
          clearable
          node-key="deptId"
          style="width: 100%"
          v-model="form.managerMembers"
          :data="managerMembersData"
          :render-after-expand="true"
          multiple
          show-checkbox
          :props="{
            label: 'deptName',
            value: 'deptId',
            children: 'children',
          }"
          placeholder="管理员"
        />
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { memberApi } from '@/api/index';
  import { useStore } from '@/store/modules/useStore';
  import { cloneDeep } from 'lodash-es';

  const props = withDefaults(
    defineProps<{
      form: any;
    }>(),
    {
      form: () => ({
        achievementExperiences: [
          {
            date: '2019-08-24',
            experienceCode: 'string',
            experienceDesc: 'string',
            experienceTitle: 'string',
            id: 0,
          },
        ],
        agentCode: 'string',
        agentName: 'string',
        applicableScopes: ['string'],
        courseExperiences: [
          {
            date: '2019-08-24',
            experienceCode: 'string',
            experienceDesc: 'string',
            experienceTitle: 'string',
            id: 0,
          },
        ],
        cover: 'string',
        createTime: '2019-08-24T14:15:22.123Z',
        department: 'string',
        description: 'string',
        difyApiKey: 'string',
        difyHost: 'dify.luteos.com',
        difyUrl: 'https://dify.luteos.com/app/ddba4d16-e1ef-4203-8e6c-202b79702dfe/workflow',
        id: 0,
        logo: 'string',
        managerMembers: ['string'],
        members: ['string'],
        networkEnable: 'string',
        nickname: 'string',
        scope: 'string',
        skills: [
          {
            name: '需求分析',
            status: 1,
          },
        ],
        status: 'string',
        suggestedQuestions: ['string'],
        thinkable: 'string',
      }),
    }
  );

  const members = computed({
    get: () => props.form.members,
    set: (val) => {
      if (val.includes('-1')) {
        props.form.members = ['-1'];
        props.form.scope = 'all';
      } else {
        props.form.scope = 'member';
        // 数组去重
        const uniqueMembers = Array.from(new Set(val));
        props.form.members = uniqueMembers;
      }
    },
  });
  const handleKillActions = ({ key, payload }) => {
    switch (key) {
      case 'add':
        props.form.skills.push({
          name: '',
          status: 0,
        });
        break;
      case 'delete':
        props.form.skills.splice(payload.$index, 1);
        break;
      default:
        break;
    }
  };
  const handleQuesActions = ({ key, payload }) => {
    switch (key) {
      case 'add':
        props.form.suggestedQuestions.push('');
        break;
      case 'delete':
        props.form.suggestedQuestions.splice(payload.$index, 1);
        break;
      default:
        break;
    }
  };

  const membersData = ref<any[]>([]);
  const managerMembersData = ref<any[]>([]);
  const deptIdAllList = ref<any[]>([]);
  async function queryViewScopeTree() {
    const res: any = await memberApi.luteosMemberQueryDeptMemberTree();
    membersData.value = cloneDeep([{ deptId: '-1', deptName: '全部' }, ...res.deptList]) || [];
    managerMembersData.value = cloneDeep(res.deptList) || [];
    deepTree(membersData.value, props.form.members);
    deepTree(managerMembersData.value, props.form.managerMembers);
  }
  const deepTree = (data, selectedKeys) => {
    data.forEach((item) => {
      item.type = item.deptId ? 1 : 2;
      if (item.type === 2) {
        item.deptId = item.roleAccountBean.sourceCode;
        item.deptName = item.roleAccountBean.name;
      }
      deptIdAllList.value.push(item);
      if (item.children && item.children.length > 0) {
        deepTree(item.children, selectedKeys);
      }
    });
  };
  queryViewScopeTree();
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
  .add-tag {
    margin-left: 20px;
  }
  .difyUrl-label {
    :deep(.el-input__inner::placeholder) {
      color: var(--el-color-primary);
    }
  }
  .suggested-questions-label,
  .skills-label {
    :deep(.el-form-item__label) {
      padding-top: 27px;
      align-items: start;
    }
  }
</style>
