<template>
  <el-dialog width="65%" title="编辑" v-model="visible" @close="visible = false" align-center>
    <el-form :model="form" ref="formRef" label-width="120" style="max-height: 75vh">
      <el-form-item label="用户名">
        <el-input :disabled="!isExternal" v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled v-model="form.phone" />
      </el-form-item>
      <el-form-item label="企业邮箱">
        <el-input disabled v-model="form.email" />
      </el-form-item>
      <el-form-item label="角色">
        <div class="roleList">
          <el-checkbox-group v-model="form.roleList">
            <el-checkbox
              v-for="item in totalRoleList"
              :key="item.roleCode"
              :label="item.roleCode"
              :disabled="
                item.roleCode === 'R00000000' || (isMaster && item.roleCode === 'R00000001')
              "
            >
              {{ item?.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({});

  const isExternal = computed(() => form.value?.source === 3);
  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      await memberApi.luteosMemberUpdateUserInfo({
        accountCodeList: [form.value.accountCode],
        saveRoleCodeList: form.value.roleList,
        addRoleCodeList: [],
        deleteRoleCodeList: [],
        memberCode: (form.value.accountCode || '').replace(/^\d+-/, ''),
        name: form.value.name,
      });
      ElMessage.success('保存成功');
      emits('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const totalRoleList = ref([]);
  const isMaster = ref(false);
  const open = (row, roleList) => {
    form.value.accountCode = row?.accountCode;
    form.value.source = row?.source;
    form.value.name = row?.name;
    form.value.phone = row?.phone;
    form.value.email = row?.email;
    form.value.roleList = row?.roleList?.map((item) => item.value);
    isMaster.value = row?.isMaster;
    totalRoleList.value = roleList;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .roleList {
    overflow-y: scroll;
    max-height: 40vh;
  }
</style>
