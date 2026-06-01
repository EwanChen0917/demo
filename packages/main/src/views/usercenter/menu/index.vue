<template>
  <el-tabs v-model="search.platform" tab-position="top" @tab-change="getMenuTree">
    <el-tab-pane v-for="item in sysList" :key="item.value" :label="item.desc" :name="item.value">
      <template #label>
        {{ item.desc }}
      </template>
    </el-tab-pane>
  </el-tabs>
  <KeenList
    @refresh="getMenuTree"
    @reset-search="getMenuTree"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="上级菜单Code"
        @keyup.enter="getMenuTree"
        @change="getMenuTree"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!-- <el-select
        @change="getMenuTree"
        style="width: 100px; margin-right: 12px"
        v-model="search.platform"
      >
        <el-option label="RPE" value="lute_os" />
        <el-option label="IOT" value="lute_iot" />
      </el-select> -->
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="add">添加菜单</el-button>
    </template>
    <p class="pt-3 ps-3">
      <el-button size="small" @click="menuTreeRef.setAllTreeExpand(true)" class="me-3">
        展开菜单
      </el-button>
      <el-button size="small" @click="menuTreeRef.clearTreeExpand()">折叠菜单</el-button>
    </p>
    <vxe-table
      v-loading="loading"
      border
      show-overflow
      :row-config="{ keyField: 'menuCode', isCurrent: true, isHover: true }"
      :data="menuList"
      :tree-config="{ transform: false, expandAll: false, reserve: true }"
      max-height="700px"
      ref="menuTreeRef"
    >
      <vxe-column field="name" title="菜单名称" min-width="240px" tree-node>
        <template #header>菜单名称</template>
      </vxe-column>
      <vxe-column field="icon" title="图标" width="60px" align="center">
        <template #default="{ row }">
          <SvgIcon v-if="row.icon" :icon="row.icon" className="tree-icon" />
        </template>
      </vxe-column>
      <vxe-column field="sort" title="排序" align="center" width="50px" />
      <vxe-column field="menuCode" title="当前菜单" min-width="160px">
        <template #default="{ row }">
          <span @click="copyFn(row.menuCode, `当前菜单 ${row.menuCode}`)">{{ row.menuCode }}</span>
        </template>
      </vxe-column>
      <vxe-column field="parentCode" title="上级菜单" min-width="160px" />
      <vxe-column field="menuType" title="节点类型" width="80px">
        <template #default="{ row }">
          <Tag :color="menuType[row.menuType]">{{ row.menuType }}</Tag>
        </template>
      </vxe-column>
      <vxe-column field="delStatus" title="删除状态" width="80px">
        <template #default="{ row }">
          <Tag :color="delColor[row.delStatus]">
            {{ row.delStatus === 1 ? '已删除' : '未删除' }}
          </Tag>
        </template>
      </vxe-column>
      <vxe-column field="componentName" title="路由名称" min-width="180px" />
      <vxe-column field="status" title="菜单状态" width="80px">
        <template #default="{ row }">
          <Tag :color="statusColor[row.status]">{{ row.status === 1 ? '显示' : '隐藏' }}</Tag>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="200px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                row: row,
                type: 'primary',
              },

              {
                label: '新增',
                key: 'add',
                row: row,
                hide: row.menuType === 'button',
                type: 'primary',
              },

              {
                label: '显示',
                key: 'enable',
                row: row,
                hide: row.status === 1,
                type: 'primary',
              },
              {
                label: '隐藏',
                key: 'disable',
                row: row,
                hide: row.status === 0,
                type: 'primary',
              },
              {
                label: '删除',
                key: 'remove',
                row: row,
                hide: row.delStatus === 1,
                type: 'primary',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
  </KeenList>
  <DetailDialog :platform="search.platform" ref="detailDialogRef" @success="getMenuTree" />
</template>

<script lang="ts" setup name="menu">
  import { platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { copyFn } from '@/utils/copyFn';
  import DetailDialog from './components/detailDialog.vue';

  const menuTreeRef = ref();

  const loading = ref(false);
  const search = reactive({
    keyword: '',
    platform: 'lute_erp',
  });
  const menuType = {
    menu: 'green',
    button: 'purple',
  };
  const statusColor = {
    0: 'yellow',
    1: 'blue',
  };
  const delColor = {
    0: 'gray',
    1: 'red',
  };

  const sysList = ref([]);
  const querySysMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['menu_module'],
    });
    sysList.value = res?.dictMap?.menu_module;
  };

  const menuList = ref([]);
  const getMenuTree = async () => {
    loading.value = true;
    menuList.value = [];
    const res: any = await platformApi
      .platformMenuQueryMenuTree({
        menuCode: search.keyword,
        platform: search.platform,
        filterStatus: 0,
      })
      .finally(() => {
        loading.value = false;
      });

    menuList.value = res.menuList;
  };
  const handleActions = (command: any) => {
    const { key, row } = command;
    switch (key) {
      case 'add':
        add(row);
        break;
      case 'edit':
        edit(row);
        break;
      case 'remove':
        remove(row);
        break;
      case 'enable':
        changeStatus(row);
        break;
      case 'disable':
        changeStatus(row);
        break;
      default:
        break;
    }
  };
  onMounted(() => {
    querySysMap();
    getMenuTree();
  });

  const detailDialogRef = ref();
  const add = (menu?) => {
    detailDialogRef.value.open('add', menu);
  };
  const edit = (menu) => {
    detailDialogRef.value.open('edit', menu);
  };
  const remove = async (row: any) => {
    const isConfirmed = await swal.confirm('请确认是否删除该菜单');
    if (!isConfirmed) return;
    await platformApi.platformMenuOperateMenu({
      actionType: 1,
      menuCode: row.menuCode,
    });
    ElMessage.success('操作成功');
    getMenuTree();
  };
  const changeStatus = async (row: any) => {
    const isConfirmed = await swal.confirm(`请确认是否${row.status === 1 ? '隐藏' : '显示'}该菜单`);
    if (!isConfirmed) return;
    await platformApi.platformMenuOperateMenu({
      actionType: row.status === 1 ? 2 : 3,
      menuCode: row.menuCode,
    });
    ElMessage.success('操作成功');
    getMenuTree();
  };
</script>

<style scoped lang="scss">
  :deep(.tree-icon.svg-icon svg) {
    width: 32px;
    height: 32px;
  }
</style>
