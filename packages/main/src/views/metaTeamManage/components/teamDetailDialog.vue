<template>
  <el-dialog width="800px" title="详情" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" label-position="left">
      <el-form-item label="团队名称" prop="teamName">
        <span>{{ form?.teamName }}</span>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <span>{{ form?.leader }}</span>
      </el-form-item>
      <el-form-item label="关联成员" prop="members">
        <span>{{ form?.members }}</span>
      </el-form-item>
      <el-form-item label="关联产品标签" prop="label">
        <span>{{ form?.label }}</span>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <span>{{ form?.remark }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const formRef = ref();

  const form = ref({
    teamName: '',
    leader: '',
    members: [],
    label: '',
    remark: '',
  });

  // const operatorOptions = ref([]);
  const open = (data) => {
    // operatorOptions.value = options;
    if (data) {
      form.value.teamName = data?.teamName;
      form.value.leader = data?.leaderList?.map((item) => item.name)?.join('、');
      form.value.label = data?.labelList?.map((item) => item.tagName)?.join('、');
      form.value.members = data?.memberList?.map((item) => item.name)?.join('、');
      form.value.remark = data?.remark;
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
