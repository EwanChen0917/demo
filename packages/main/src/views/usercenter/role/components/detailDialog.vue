<template>
  <el-dialog
    :title="`${form.roleCode ? '编辑' : '新增'}角色${form.roleCode ? '#' + form.roleCode : ''}`"
    v-model="visibility"
    width="600px"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="所属平台" prop="platform">
            <el-select v-model="form.platform" clearable filterable>
              <el-option
                v-for="item in sysList"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" maxlength="255" />
          </el-form-item>
          <el-form-item label="角色说明" prop="desc">
            <el-input type="textarea" :rows="3" v-model="form.desc" maxlength="255" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';

  const visibility = ref(false);
  const formRef = ref();
  interface IRole {
    platform?: string;
    roleName: string;
    roleCode?: string;
    desc?: string;
  }
  const form = ref<IRole>({
    platform: '',
    roleName: '',
    roleCode: '',
    desc: '',
  });
  const rules = ref({
    platform: [{ required: true, message: '请选择所属平台', trigger: 'change' }],
    roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入角色说明', trigger: 'blur' }],
  });
  const sysList = ref<any[]>([]);
  const querySysMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['menu_module'],
    });
    sysList.value = res?.dictMap?.menu_module || [];
  };
  querySysMap();
  const copyMenuRole = ref('');
  function open(mode: 'add'): void;
  function open(mode: 'edit', menu: any): void;
  function open(mode: 'add' | 'edit' | 'copy', menu?: any, copyRole?: string): void {
    if (mode === 'add') {
      form.value.platform = '';
      form.value.roleName = '';
      form.value.roleCode = '';
      form.value.desc = '';
      copyMenuRole.value = '';
    }
    if (mode === 'edit') {
      form.value.platform = menu.platform;
      form.value.roleName = menu.roleName;
      form.value.roleCode = menu.roleCode;
      form.value.desc = menu.desc;
    }
    if (mode === 'copy') {
      form.value.platform = menu.platform;
      form.value.roleName = menu.roleName;
      form.value.desc = menu.desc;
      copyMenuRole.value = copyRole as string;
    }
    visibility.value = true;
  }
  const close = () => {
    visibility.value = false;
    form.value.roleName = '';
    form.value.roleCode = '';
    form.value.platform = '';
    form.value.desc = '';
    nextTick(() => {
      formRef.value.resetFields();
    });
  };
  const save = async () => {
    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validate) {
      await platformApi.platformRoleSaveRole({
        ...form.value,
        copyMenuRole: copyMenuRole.value || '',
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  // const roleCodeList = ref<any[]>([]);
  // const initRoleCodeList = async () => {
  //   const res = await platformApi.platformRoleQueryRoleList();
  //   roleCodeList.value = res.roleList as [];
  // };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
