<template>
  <el-dialog title="设置权限" v-model="visibility" width="800px" :before-close="close">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" maxlength="255" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item :label="`角色权限(${platformDesc})`" prop="roleAccountBeanList">
            <div style="width: 100%; max-height: calc(100vh - 500px); overflow: auto">
              <el-tree
                v-if="visibility"
                class="tree-border"
                :data="menuTree"
                show-checkbox
                :default-expand-all="false"
                ref="menuTreeRef"
                node-key="menuCode"
                :check-strictly="false"
                empty-text="暂无数据"
                :props="{
                  label: 'name',
                  children: 'children',
                }"
                :default-expanded-keys="defaultExpandedKeys"
              >
                <template #default="{ node, data }">
                  <span
                    :class="{
                      'error-menu': errorList?.some((item) => item?.menuCode === data?.menuCode),
                    }"
                  >
                    {{ node?.label }}
                  </span>
                </template>
              </el-tree>
            </div>
          </el-form-item>
        </el-col>
        <el-form-item v-if="errorList?.length" label="异常菜单">
          <el-button
            type="primary"
            link
            v-for="item in errorList"
            :key="item?.menuCode"
            @click="defaultExpandedKeys = [item?.menuCode]"
          >
            {{ item?.name }}
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';
  import { platformApi } from '@/api';

  const platform = ref('lute_os');
  const platformDesc = ref('RPE');
  const visibility = ref(false);
  const formRef = ref();
  const form = ref<any>({
    roleCode: '',
    roleName: '',
    roleAccountBeanList: [],
  });
  const rules = ref({
    // roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  });
  const menuTree = ref<any[]>([]);
  const menuTreeRef = ref();

  const queryMenu = async () => {
    const res: any = await platformApi.platformRoleQueryMenu({
      roleCode: form.value.roleCode,
      platform: platform.value,
    });
    menuTree.value = res.menuList as [];
    visibility.value = true;
    getErrorNode(res.menuList);
    nextTick(() => {
      res.checkedMenuList.forEach((item) => {
        menuTreeRef.value.setChecked(item, true, false);
      });
    });
  };

  const defaultExpandedKeys = ref([]);
  const errorList = ref([]);
  // 获取异常菜单
  const getErrorNode = (nodes) => {
    for (const node of nodes) {
      if (node.checked && node?.children && node.children.length > 0) {
        if (node?.children?.every((child) => !child.checked)) {
          errorList.value.push({
            menuCode: node.menuCode,
            name: node.name,
          });
        }
        getErrorNode(node.children);
      }
    }
  };

  // 获取系统列表
  const sysList = ref([]);
  const querySysMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['menu_module'],
    });
    sysList.value = res?.dictMap?.menu_module;
  };

  async function open(role: any) {
    errorList.value = [];
    defaultExpandedKeys.value = [];
    form.value.roleCode = role.roleCode;
    form.value.roleName = role.roleName;
    platform.value = role.platform;
    platformDesc.value = role.platformDesc;
    queryMenu();
    querySysMap();
  }

  const close = () => {
    visibility.value = false;
    form.value.roleName = '';
    form.value.roleCode = '';
    nextTick(() => {
      formRef.value.resetFields();
    });
  };

  const saveLoading = ref(false);
  const save = async () => {
    try {
      saveLoading.value = true;
      const id = menuTreeRef.value.getCheckedKeys();
      console.log('子节点', id);
      const parentId = menuTreeRef.value.getHalfCheckedKeys();
      console.log('父节点', parentId);
      const menulist = id.concat(parentId);
      console.log('父子节点合并', menulist);
      await platformApi.platformRoleSaveRoleMenu({
        platform: platform.value,
        roleCode: form.value.roleCode,
        checkedMenuList: menulist,
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    } finally {
      saveLoading.value = false;
    }
  };

  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-tree-node__content) {
    height: 40px;
  }

  .error-menu {
    color: var(--el-color-danger);
  }
</style>
