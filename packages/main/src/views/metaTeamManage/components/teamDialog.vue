<template>
  <el-dialog width="800px" :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" label-position="left">
      <el-form-item label="团队名称" prop="teamName">
        <el-input v-model="form.teamName" placeholder="请输入团队名称" clearable />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-select v-model="form.leader" placeholder="请选择负责人" filterable clearable multiple>
          <el-option
            v-for="item of operatorOptions"
            :label="item.name"
            :value="item.memberCode"
            :key="item.memberCode"
          />
        </el-select>
        <!--
        <DeptMember v-model="form.leader" placeholder="请选择负责人" filterable clearable />-->
      </el-form-item>
      <el-form-item label="关联成员" prop="members">
        <el-select v-model="form.members" placeholder="请选择成员" filterable clearable multiple>
          <el-option
            v-for="item of operatorOptions"
            :label="item.name"
            :value="item.memberCode"
            :key="item.memberCode"
          />
        </el-select>
        <!--        <DeptMember v-model="form.members" placeholder="请选择成员" filterable clearable multiple />-->
      </el-form-item>
      <el-form-item label="关联产品标签" prop="label">
        <el-select v-model="form.label" placeholder="请选择产品标签" filterable clearable>
          <el-option
            v-for="item in labelOptions"
            :label="item.tagName"
            :value="item.tagCode"
            :key="item.tagCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input
          type="textarea"
          placeholder="请输入描述（50字以内）"
          v-model="form.remark"
          clearable
          maxlength="50"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, productOperationApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const props = defineProps<{
    operatorOptions: any;
  }>();

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();

  const form = ref({
    teamName: '',
    leader: [],
    members: [],
    label: '',
    remark: '',
    teamCode: '',
  });

  const rules = ref({
    teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' }],
    leader: [{ required: true, message: '请选择团队负责人', trigger: 'change' }],
    members: [{ required: true, message: '请选择团队成员', trigger: 'change' }],
    // label: [{ required: true, message: '请选择产品标签', trigger: 'change' }],
  });

  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    await productOperationApi.luteosOperationTeamSaveTeamInfo({
      teamCode: form.value?.teamCode,
      teamName: form.value.teamName,
      leaderList: form.value.leader,
      memberList: form.value.members,
      labelList: form.value.label ? [form.value.label] : [],
      remark: form.value.remark,
      scene: 'meta',
    });
    ElMessage.success('保存成功');
    visible.value = false;
    emit('success');
  };

  // const operatorOptions = ref([]);
  const open = (data, type) => {
    visible.value = true;
    title.value = type;
    nextTick(() => {
      formRef.value?.resetFields();
      if (data) {
        form.value.teamCode = data?.teamCode || undefined;
        form.value.teamName = data?.teamName;
        form.value.leader = data.leaderList.map((item) => item.memberCode);
        // (data.leaderList && data.leaderList[0] && data.leaderList[0].memberCode) || undefined;
        form.value.label =
          (data.labelList && data.labelList[0] && data.labelList[0].tagCode) || undefined;
        form.value.members = data?.memberList?.map((item) => item.memberCode);
        form.value.remark = data?.remark;
      } else {
        form.value = {
          teamName: '',
          leader: '',
          members: [],
          label: '',
          remark: '',
          teamCode: '',
        };
      }
    });
  };

  const labelOptions = ref<any[]>([]);
  const queryLabelOptions = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      pageNum: 1,
      pageSize: 500,
    });
    labelOptions.value = res?.tagBeanList;
  };
  queryLabelOptions();

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
