<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="100px">
      <el-form-item v-if="!props?.labelType" label="标签类型" required>
        <el-select
          v-model="form.labelType"
          placeholder="请选择标签类型"
          :disabled="props?.labelType"
        >
          <el-option label="系统标签" :value="1" />
          <el-option label="自定义标签" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="!props?.module" label="标签模块" prop="module">
        <el-select
          v-model="form.module"
          placeholder="请选择标签模块"
          filterable
          @change="handleModuleChange"
          :disabled="props?.module"
        >
          <el-option
            v-for="item in labelModelList"
            :key="item.module"
            :label="item.desc"
            :value="item.module"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="父级标签" v-if="!hideParent">
        <el-tree-select
          prop="parentLabelCode"
          :v-loading="loading"
          clearable
          node-key="labelCode"
          style="width: 100%"
          v-model="form.parentLabelCode"
          :data="treeData"
          :props="{ label: 'name', children: 'childInfoList' }"
          check-strictly
          :render-after-expand="false"
          :placeholder="form.module ? '请选择父级标签，不选则为一级标签' : '请先选择标签模块'"
        >
          <template #empty>
            {{ form.module ? '暂无数据' : '请先选择标签模块' }}
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="标签名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入标签名称"
          clearable
          maxlength="10"
          show-word-limit
          @change="(val) => (form.name = val.trim())"
        />
      </el-form-item>
      <el-form-item v-if="!hideSort" label="标签顺序" prop="sort">
        <NumberInput v-model="form.sort" placeholder="请输入标签顺序" clearable :precision="0" />
      </el-form-item>
      <el-form-item v-if="!hideStatus" label="标签状态" prop="status" required>
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启动</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
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
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const props = defineProps<{
    module?: string;
    labelType?: 1 | 2;
    hideParent?: boolean;
    hideSort?: boolean;
    hideStatus?: boolean;
  }>();

  const visible = ref(false);
  const loading = ref(false);
  const saveLoading = ref(false);
  const title = ref('');

  const formRef = ref(null);
  const form = ref({
    labelCode: '',
    parentLabelCode: '',
    labelType: props?.labelType ?? 1,
    module: props?.module ?? '',
    name: '',
    sort: '',
    status: 1,
  });

  const rules = reactive({
    name: [
      { required: true, message: '请输入标签名称', trigger: ['blur', 'change'] },
      {
        validator: (_, value, callback) => {
          if (!value?.trim()) {
            callback('请输入标签名称');
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
    module: [{ required: true, message: '请选择标签模块', trigger: ['blur', 'change'] }],
  });

  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await platformApi.platformLabelSaveLabelInfo(form.value);
      ElMessage.success('新增成功');
      visible.value = false;
      emit('success');
    } finally {
      saveLoading.value = false;
    }
  };

  const open = async (curTitle, row) => {
    visible.value = true;
    form.value.parentLabelCode = '';
    treeData.value = [];
    await formRef.value?.resetFields();
    if (row) {
      form.value.labelCode = row.labelCode;
      form.value.parentLabelCode = row.parentLabelCode;
      form.value.labelType = row.labelType;
      form.value.module = row.module;
      form.value.name = row.name;
      form.value.sort = row.sort;
      form.value.status = row.status;
      queryLabelList(form.value.module);
    }
    queryLabelModel();
    title.value = curTitle;
  };

  const labelModelList = ref([]);
  const queryLabelModel = async () => {
    const res = await platformApi.platformQueryLabelModelList();
    labelModelList.value = res?.labelModelList;
  };

  const treeData = ref([]);
  const queryLabelList = async (module) => {
    if (!module) return;
    loading.value = true;
    const res = await platformApi.platformLabelQueryLabelAllList({
      module,
    });
    treeData.value = res?.labelInfoList;
    loading.value = false;
  };

  const handleModuleChange = (val) => {
    if (val) queryLabelList(val);
    else {
      form.value.parentLabelCode = '';
      treeData.value = [];
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
