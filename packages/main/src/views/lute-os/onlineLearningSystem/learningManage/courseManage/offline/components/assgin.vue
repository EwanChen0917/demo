<template>
  <el-dialog
    :title="type === 1 ? '必修指派' : '选修指派'"
    v-model="visibility"
    width="600px"
    :before-close="close"
  >
    <div class="dept-path">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span class="is-link" @click="setCurrentTreeByInit()">路特创新科技有限公司</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) of deptPath" :key="item.id">
          <span
            :class="{ 'is-link': index !== deptPath.length - 1 }"
            @click="setCurrentTree(item, index)"
          >
            {{ item.name }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>

      <span></span>
    </div>
    <div class="dept-container">
      <div class="dept-list">
        <div class="dept-item" v-for="item of currentTree" :key="item.id">
          <el-checkbox v-if="!!item.checked" :value="item.checked" disabled>
            {{ item.deptName || item.roleAccountBean.name }}
          </el-checkbox>
          <el-checkbox v-else v-model="item.selected" @change="select(item)">
            {{ item.deptName || item.roleAccountBean.name }}
          </el-checkbox>
          <el-button
            v-if="item.children && item.children.length"
            :disabled="!!item.selected"
            type="primary"
            link
            @click="showChildren(item)"
          >
            下级
          </el-button>
        </div>
      </div>
      <div class="selected-list">
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <el-tag
            v-for="item in selectedList"
            :key="item.id"
            :type="typeof item.id === 'number' ? 'primary' : 'success'"
            closable
            @close="unSelect(item)"
          >
            {{ item.name }}
          </el-tag>
        </div>
      </div>
    </div>
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
  import { studyApi } from '@/api';
  import { uuid } from '@/utils/aesTils';

  const props = defineProps<{
    type: number;
  }>();
  const visibility = ref(false);
  const formRef = ref();
  const route = useRoute();
  const form = ref<any>({
    courseCode: '',
    memberCodeList: [],
  });
  const rules = ref({
    // roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  });
  const currentTree = ref<any[]>([]);
  const deptPath = ref<any[]>([]);
  const showChildren = (item) => {
    deptPath.value.push({ name: item.deptName, id: item.deptId });
    currentTree.value = item.children;
  };
  const setCurrentTree = (item: any, index) => {
    deptPath.value.length = index + 1;
    currentTree.value = findTree(form.value.memberCodeList, item.id);
  };
  const setCurrentTreeByInit = () => {
    deptPath.value.length = 0;
    currentTree.value = form.value.memberCodeList;
  };
  const findTree = (data, id): any => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.deptId === id) {
        return item.children;
      }
      if (item.children && item.children.length) {
        const res = findTree(item.children, id);
        if (res) {
          return res;
        }
      }
    }
  };
  const selectedList = ref<any[]>([]);
  const select = (item: any) => {
    if (item.selected) {
      selectedList.value.push({
        name: item.deptName || item.roleAccountBean?.name,
        id: item.deptId || item.roleAccountBean?.sourceCode,
        type: item.deptId ? 1 : 2,
      });
    } else {
      selectedList.value = selectedList.value.filter((i) => {
        return i.id !== item.deptId && i.id !== item.roleAccountBean?.sourceCode;
      });
    }
  };
  const unSelect = (item) => {
    // 移出选池
    selectedList.value = selectedList.value.filter((i) => i.id !== item.id);
    updateTree(form.value.memberCodeList, item.id);
  };
  const updateTree = (data, id): any => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.deptId === id || item.roleAccountBean?.sourceCode === id) {
        item.selected = !item.selected;
      }
      if (item.children && item.children.length) {
        updateTree(item.children, id);
      }
    }
  };
  async function open() {
    form.value.courseCode = route.query.courseCode as string;
    const res: any = await studyApi.luteosStudyQueryAllAccount({
      courseCode: route.query.courseCode as string,
      type: 1,
    });
    visibility.value = true;

    const tree = res.deptList;
    createTreeId(tree);
    form.value.memberCodeList = tree;
    currentTree.value = tree;
    // nextTick(() => {
    //   res.checkedMenuList.forEach((item) => {
    //     menuTreeRef.value.setChecked(item, true, false);
    //   });
    // });
  }
  const close = () => {
    visibility.value = false;
    selectedList.value = [];
    nextTick(() => {
      // formRef.value.resetFields();
    });
  };
  const save = async () => {
    const deptIdList = selectedList.value.filter((i) => i.type === 1).map((i) => i.id);
    const memberCodeList = selectedList.value.filter((i) => i.type === 2).map((i) => i.id);
    console.log('deptIdList', deptIdList, 'memberCodeList', memberCodeList);
    // const selectedList = getMenuChecked(form.value.memberCodeList);
    await studyApi.luteosStudySaveStudyCourseMembers({
      courseCode: route.query.courseCode as string,
      memberCodeList,
      deptIdList,
      // memberCodeList: Array.from(new Set(selectedList)),
      type: props.type,
    });
    ElMessage.success('操作成功');
    emits('success');
    close();
  };
  const getMenuChecked = (treeList: []) => {
    let result: any[] = [];
    // eslint-disable-next-line consistent-return
    treeList.forEach((element: any) => {
      if (!element.children || element.children.length === 0) {
        if (element.roleAccountBean && element.roleAccountBean.selected) {
          result.push(element.roleAccountBean.sourceCode);
        }
      } else {
        const childResult = getMenuChecked(element.children);
        result = [...result, ...childResult];
      }
    });
    return result;
  };
  const createTreeId = (treeList: []) => {
    treeList.forEach((item: any) => {
      item.id = uuid();
      if (item.roleAccountBean && item.roleAccountBean.name) {
        item.roleAccountBean.selected = false;
      }
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

<style scoped lang="scss">
  .dept-path {
    margin-bottom: 20px;
  }
  .dept-container {
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;

    .dept-list {
      flex-basis: 50%;
      border: 1px solid #eee;
      height: 400px;
      overflow: auto;
    }
    .selected-list {
      padding: 12px;
      flex-basis: 50%;
      border: 1px solid #eee;
      display: flex;
      gap: 12px;
      line-height: 1;
      flex-wrap: wrap;
      justify-self: flex-start;
      align-items: flex-start;
      height: 400px;
      overflow: auto;
    }
  }
  .dept-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 2px 12px;
    border-radius: 12px;
    &:hover {
      background-color: #eee;
    }
    .el-checkbox {
      flex: 1;
    }
  }
  .is-link {
    color: #3e97ff;
    cursor: pointer;
  }
</style>
