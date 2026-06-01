<template>
  <el-dialog title="权限" v-model="visible" @close="visible = false">
    <el-tabs v-model="platform" tab-position="top" @tab-change="queryMenu">
      <el-tab-pane v-for="item in sysList" :key="item.value" :label="item.desc" :name="item.value">
        <template #label>
          {{ item.desc }}
        </template>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 450px; overflow: auto">
      <el-tree
        class="tree-border"
        :data="menuTree"
        :default-expand-all="false"
        ref="menuTreeRef"
        node-key="menuCode"
        :check-strictly="false"
        empty-text="暂无数据"
        :props="{
          label: 'name',
          children: 'children',
        }"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  const visible = ref(false);

  const save = async () => {};

  const accountCode = ref();
  const platform = ref('lute_erp');
  const menuTree = ref<any[]>([]);
  const menuTreeRef = ref();

  // 获取系统列表
  const sysList = ref([]);
  const querySysMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['menu_module'],
    });
    sysList.value = res?.dictMap?.menu_module;
  };

  const queryMenu = async () => {
    const res: any = await platformApi.platformMenuQueryMenuTree({
      accountCode: accountCode.value,
      platform: platform.value,
    });
    menuTree.value = res.menuList as [];
    nextTick(() => {
      res.checkedMenuList.forEach((item) => {
        menuTreeRef.value.setChecked(item, true, false);
      });
    });
  };

  const open = (code: string) => {
    visible.value = true;
    accountCode.value = code;
    querySysMap();
    queryMenu();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
