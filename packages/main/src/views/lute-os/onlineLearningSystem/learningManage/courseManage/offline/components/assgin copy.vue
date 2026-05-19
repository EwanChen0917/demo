<template>
  <el-dialog
    :title="type === 1 ? '必修指派' : '选修指派'"
    v-model="visibility"
    width="600px"
    :before-close="close"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <!-- <el-col :span="24" :offset="0">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" maxlength="255" disabled />
          </el-form-item>
        </el-col> -->
        <el-col :span="24" :offset="0">
          <el-form-item label="用户设置" prop="deptList">
            <div style="width: 100%; padding-top: 10px">
              <!-- {{ form.memberCodeList }} -->
              <el-tree-v2
                :height="500"
                v-if="visibility"
                :data="form.memberCodeList"
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
                    <el-checkbox
                      v-if="data.roleAccountBean.checked"
                      v-model="data.roleAccountBean.checked"
                      :indeterminate="false"
                      :true-label="true"
                      :false-label="false"
                      disabled
                    >
                      {{ data.roleAccountBean.name }}
                    </el-checkbox>
                    <el-checkbox
                      v-else
                      v-model="data.roleAccountBean.selected"
                      :indeterminate="false"
                      :true-label="true"
                      :false-label="false"
                    >
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
  const menuTree = ref<any[]>([]);
  const menuTreeRef = ref();
  async function open() {
    form.value.courseCode = route.query.courseCode as string;
    const res: any = await studyApi.luteosStudyQueryAllAccount({
      courseCode: route.query.courseCode as string,
    });
    visibility.value = true;

    const tree = res.deptList;
    createTreeId(tree);
    form.value.memberCodeList = tree;
    // nextTick(() => {
    //   res.checkedMenuList.forEach((item) => {
    //     menuTreeRef.value.setChecked(item, true, false);
    //   });
    // });
  }
  const close = () => {
    visibility.value = false;
    nextTick(() => {
      formRef.value.resetFields();
    });
  };
  const save = async () => {
    const selectedList = getMenuChecked(form.value.memberCodeList);
    await studyApi.luteosStudySaveStudyCourseMembers({
      courseCode: route.query.courseCode as string,
      memberCodeList: Array.from(new Set(selectedList)),
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

<style scoped lang="scss"></style>
