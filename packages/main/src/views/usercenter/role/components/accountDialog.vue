<template>
  <el-dialog title="设置权限" v-model="visibility" width="600px" :before-close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" maxlength="255" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="用户设置" prop="deptList">
            <div style="width: 100%; padding-top: 10px">
              <el-tree-v2
                :height="500"
                v-if="visibility"
                :data="form.deptList"
                :default-expand-all="true"
                ref="menuTreeRef"
                empty-text="加载中，请稍候"
                node-key="id"
                :props="{
                  children: 'children',
                }"
              >
                <template #default="{ data }">
                  <template v-if="data.roleAccountBean && data.roleAccountBean.name">
                    <el-checkbox v-model="data.roleAccountBean.checked" :indeterminate="false">
                      {{ data.roleAccountBean.name }}
                    </el-checkbox>
                  </template>
                  <template v-else>
                    {{ data.deptName }}
                  </template>
                </template>
              </el-tree-v2>
            </div>
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
  import { uuid } from '@/utils/aesTils';

  const visibility = ref(false);
  const formRef = ref();
  const form = ref<any>({
    roleCode: '',
    roleName: '',
    deptList: [],
  });
  const rules = ref({
    // roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  });
  const menuTree = ref<any[]>([]);
  const menuTreeRef = ref();
  async function open(role: any) {
    form.value.roleCode = role.roleCode;
    form.value.roleName = role.roleName;
    const res: any = await platformApi.platformRoleQueryRoleAccount({
      roleCode: form.value.roleCode,
    });
    visibility.value = true;

    const tree = res.deptList;
    createTreeId(tree);
    form.value.deptList = tree;
    // nextTick(() => {
    //   res.checkedMenuList.forEach((item) => {
    //     menuTreeRef.value.setChecked(item, true, false);
    //   });
    // });
  }
  const close = () => {
    visibility.value = false;
    form.value.roleName = '';
    form.value.roleCode = '';
    nextTick(() => {
      formRef.value.resetFields();
    });
  };
  const save = async () => {
    await platformApi.platformRoleSaveRoleAccount({
      roleCode: form.value.roleCode,
      deptList: form.value.deptList,
    });
    ElMessage.success('操作成功');
    emits('success');
    close();
  };
  const getMenuChecked = (treeList: []) => {
    let result: any[] = [];
    // eslint-disable-next-line consistent-return
    treeList.forEach((element: any) => {
      if (element.checked) {
        result.push(element.menuCode);
        if (element.children && element.children.length > 0) {
          const childResult = getMenuChecked(element.children);
          result = [...result, ...childResult];
        }
      }
    });
    return result;
  };
  const createTreeId = (treeList: []) => {
    treeList.forEach((item: any) => {
      item.id = uuid();
      if (item.children && item.children.length > 0) {
        createTreeId(item.children);
      }
    });
  };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
