<template>
  <el-dialog
    :title="`${form.menuCode ? '编辑' : '新增'}菜单${form.menuCode ? '#' + form.menuCode : ''}`"
    v-model="visibility"
    width="600px"
    @open="getMenuTree"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="上级菜单" prop="parentCode">
            <el-tree-select
              :loading="loading"
              clearable
              node-key="menuCode"
              style="width: 100%"
              v-model="form.parentCode"
              :data="treeData"
              check-strictly
              :render-after-expand="false"
              popper-class="picker-cat-tree-select"
              placeholder="默认不选为根节点下"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="menu">菜单</el-radio>
              <el-radio label="button">按钮</el-radio>
              <el-radio label="url">跳转</el-radio>
              <el-radio label="iframe">内嵌</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0" v-if="['menu', 'iframe'].includes(form.menuType)">
          <el-form-item label="菜单图标" prop="icon">
            <el-popover
              width="580"
              placement="bottom-start"
              trigger="click"
              popper-class="choose-menu-icon-popover"
              ref="iconPopover"
              @hide="() => (iconSearch = '')"
            >
              <div class="icon-box">
                <el-input
                  v-model="iconSearch"
                  placeholder="请输入图标名称"
                  size="small"
                  clearable
                  style="margin-bottom: 10px"
                />

                <div class="icon-container">
                  <div
                    class="icon-wrapper"
                    @click="
                      () => {
                        form.icon = item.iconCode;
                        iconPopover?.hide();
                      }
                    "
                    v-for="item of iconsFilter"
                    :key="item.iconCode"
                  >
                    <div class="icon-item">
                      <i
                        :class="[
                          item.iconCode,
                          item.iconCode.includes('Root') ? 'Root-menuicon' : 'iconfont',
                        ]"
                      ></i>
                      {{ item.title }}
                    </div>
                  </div>
                </div>
              </div>

              <template #reference>
                <div class="icon-select el-select__wrapper" :class="form.icon ? 'selected' : ''">
                  <span class="result">
                    <template v-if="form.icon">
                      <i
                        :class="[
                          form.icon,
                          form.icon.includes('Root') ? 'Root-menuicon' : 'iconfont',
                        ]"
                      ></i>
                      {{ icons.find((item) => item.iconCode === form.icon)?.title || form.icon }}
                    </template>
                    <template v-else>
                      <span class="el-select__placeholder is-transparent">请选择图标</span>
                    </template>
                  </span>

                  <span class="operation">
                    <el-icon class="close" @click="form.icon = ''"><CircleCloseFilled /></el-icon>
                    <el-icon class="arrow el-select__caret"><ArrowDown /></el-icon>
                  </span>
                </div>
              </template>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="form.menuType === 'url' ? 24 : 12" :offset="0">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="form.menuType === 'url' ? 24 : 12" :offset="0">
          <el-form-item label="菜单简称" prop="shortName">
            <el-input v-model="form.shortName" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0" v-if="form.menuType === 'url'">
          <el-form-item label="跳转路径" prop="redirect">
            <el-input v-model="form.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0" v-else>
          <el-form-item label="路由名称" prop="componentName">
            <el-input v-model="form.componentName" />
          </el-form-item>
        </el-col>
        <!-- 与跳转路径公用一个key -->
        <el-col :span="24" :offset="0" v-if="form.menuType === 'iframe'">
          <el-form-item label="内嵌链接" prop="redirect">
            <el-input v-model="form.redirect" />
          </el-form-item>
        </el-col>
        <!-- TODO 临时需要，按钮开放链接, 非必填 -->
        <el-col :span="24" :offset="0" v-if="form.menuType === 'button'">
          <el-form-item label="链接" prop="redirect" :required="false" :rules="{ required: false }">
            <el-input v-model="form.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="菜单排序" prop="sort">
            <NumberInput v-model="form.sort" :min="0" :precision="0" />
          </el-form-item>
        </el-col>
        <!--        <el-col :span="12" :offset="0">
          <el-form-item label="菜单状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>-->
        <!--        <el-col :span="24" :offset="0">
          <el-form-item label="角色权限" prop="description">
            <el-select
              style="width: 100%"
              collapse-tags
              v-model="form.roleCodeList"
              multiple
              filterable
              clearable
            >
              <el-option
                v-for="item in roleCodeList"
                :key="item.roleCode"
                :label="item.roleName"
                :value="item.roleCode"
              />
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="24" :offset="0">
          <el-form-item label="菜单描述" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="3" />
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

  const treeData = ref([]);
  const visibility = ref(false);
  const formRef = ref();
  const props = defineProps<{
    platform: string;
  }>();
  const iconPopover = ref();
  // 在iconfont F12页面执行以下代码获取图标数据
  // const arr = document.querySelectorAll('.icon-item');
  // const icons = Array.from(arr).map((item) => {
  //   const title = item.querySelector('.icon-name').innerText;
  //   const iconCode = item.querySelector('.icon-code.icon-code-show').innerText;
  //   return {
  //     title,
  //     iconCode,
  //   };
  // });
  const iconSearch = ref('');
  const iconsFilter = computed(() => {
    return icons.value.filter((item) => item.title.includes(iconSearch.value));
  });
  const icons = ref<any>([]);
  const initIconsData = async () => {
    fetch('https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/icon/iconInfo-menu.json')
      .then((res) => res.json())
      .then((res) => {
        icons.value = res;
      });
  };
  initIconsData();
  interface Imenu {
    shortName?: string;
    description?: string;
    icon?: string;
    menuCode: string;
    menuType: string;
    name: '';
    parentCode: string;
    componentName?: string;
    redirect?: string;
    sort?: number;
    status?: 0 | 1;
    disabled?: boolean;
    value?: string;
    label?: string;
    children?: Imenu[];
    roleCodeList?: [];
  }

  const form = ref<Imenu>({
    parentCode: '',
    menuType: 'menu',
    name: '',
    icon: '',
    sort: 1,
    status: 1,
    componentName: '',
    redirect: '',
    description: '',
    menuCode: '',
    roleCodeList: [],
    shortName: '',
  });
  const rules = ref({
    name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    redirect: [
      { required: true, message: '请输入跳转路径', trigger: 'blur' },
      { type: 'url', message: '请输入合法url链接' },
    ],
  });
  const loading = ref(false);
  const getMenuTree = async () => {
    try {
      loading.value = true;
      const res = await platformApi.platformMenuQueryMenuTree({
        platform: props.platform,
        filterStatus: 0,
      });
      if (res) {
        const data = res.menuList as [];
        deepTree(data);
        treeData.value = data;
      }
    } finally {
      loading.value = false;
    }
  };
  const deepTree = (data: Imenu[]) => {
    data.forEach((item: Imenu) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.name;
      item.value = item.menuCode;
      item.disabled = item.menuType === 'button';
    });
  };

  async function open(mode: 'add', menu?: any): Promise<void>;
  async function open(mode: 'edit', menu: any): Promise<void>;
  async function open(mode: 'add' | 'edit', menu?: any): Promise<void> {
    if (mode === 'add') {
      form.value.parentCode = '';
      form.value.menuType = 'menu';
      form.value.name = '';
      form.value.icon = '';
      form.value.sort = 1;
      if (menu) {
        form.value.parentCode = menu.menuCode;
      }
    } else {
      const res: any = await platformApi.platformMenuQueryMenuDetail({
        menuCode: menu.menuCode,
      });
      form.value.parentCode = res.parentCode || '';
      form.value.menuType = res.menuType || '';
      form.value.name = res.name || '';
      form.value.icon = res.icon || '';
      form.value.sort = res.sort;
      form.value.status = res.status as 0 | 1;
      form.value.componentName = res.componentName;
      form.value.description = res.description;
      form.value.menuCode = res.menuCode;
      form.value.roleCodeList = res.roleCodeList;
      form.value.redirect = res.redirect;
      form.value.shortName = res.shortName;
    }
    visibility.value = true;
  }

  const close = () => {
    visibility.value = false;
    form.value.parentCode = '';
    form.value.menuType = '';
    form.value.name = '';
    form.value.icon = '';
    form.value.sort = 1;
    form.value.status = 1;
    form.value.componentName = '';
    form.value.redirect = '';
    form.value.description = '';
    form.value.menuCode = '';
    form.value.roleCodeList = [];
    form.value.shortName = '';
    nextTick(() => {
      formRef.value.resetFields();
    });
  };
  const save = async () => {
    const validate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (validate) {
      await platformApi.platformMenuSaveMenu({
        ...form.value,
        parentCode: form.value.parentCode ? form.value.parentCode : 'M00000',
        platform: props.platform,
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const roleCodeList = ref<any[]>([]);
  const initRoleCodeList = async () => {
    const res = await platformApi.platformRoleQueryRoleList();
    roleCodeList.value = res.roleList as [];
  };
  const emits = defineEmits<{
    (event: 'success'): void;
  }>();
  initRoleCodeList();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .icon-select {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color, var(--bs-light)) inset;
    .result {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      i {
        font-size: 18px;
      }
    }
    .operation {
      color: #a1a5b7;
      .close {
        display: none;
      }
    }
    &.selected:hover {
      .close {
        display: block;
      }
      .arrow {
        display: none;
      }
    }
  }
</style>

<style lang="scss">
  .choose-menu-icon-popover.el-popover.el-popper {
    .icon-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      max-height: 300px;
      overflow: auto;
      .icon-item {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;
        padding: 4px 8px;
        font-size: 12px;
        &:hover {
          background-color: #f5f7fa;
        }
        i {
          font-size: 18px;
        }
      }
    }
  }
</style>
