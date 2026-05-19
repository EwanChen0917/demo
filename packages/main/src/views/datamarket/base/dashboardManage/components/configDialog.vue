/** * 管理配置弹窗 * @author: zhangli * @date: 2026-02-06 */
<template>
  <el-dialog
    v-model="visible"
    :title="`管理配置 - ${rowData?.reportCode}`"
    width="70%"
    @close="cancel"
  >
    <div class="d-flex align-items-center justify-content-between mb-4 gap-2">
      <el-input
        v-model="search.keyword"
        placeholder="请输入配置编码，Enter键查询"
        clearable
        @keyup.enter="runQuery"
        @blur="runQuery"
      />
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增配置
      </el-button>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="listData" max-height="400px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="configCode" label="配置编码" />
      <el-table-column prop="configDesc" label="配置描述" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                row: row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog
    v-model="childVisible"
    :title="`${childDialogType === 'add' ? '新增配置' : '编辑配置'}`"
    width="60%"
    @close="() => cancel('child')"
    class="custom-dialog"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" label-position="top">
      <el-row :gutter="20" style="height: 500px; overflow: auto">
        <el-col :span="12">
          <el-form-item label="看板编码" prop="reportCode">
            <el-input v-model="form.reportCode" placeholder="请输入看板编码" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="配置编码" prop="configCode">
            <el-input v-model="form.configCode" placeholder="请输入配置编码" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="配置描述" prop="configDesc">
            <el-input v-model="form.configDesc" placeholder="请输入配置描述" />
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          v-for="item in [
            {
              label: '日查询配置JSON',
              key: 'configDay',
              placeholder: '请输入日查询配置JSON',
            },
            {
              label: '周查询配置JSON',
              key: 'configWeek',
              placeholder: '请输入周查询配置JSON',
            },
            {
              label: '月查询配置JSON',
              key: 'configMonth',
              placeholder: '请输入月查询配置JSON',
            },
            {
              label: '季查询配置JSON',
              key: 'configQuarter',
              placeholder: '请输入季查询配置JSON',
            },
            {
              label: '年查询配置JSON',
              key: 'configYear',
              placeholder: '请输入年查询配置JSON',
            },
          ]"
          :key="item.key"
        >
          <el-form-item :label="item.label" :prop="item.key">
            <div class="target-data-container">
              <CodeEditor
                v-model:content="form[item.key]"
                :ref="(el) => onSetRef(item.key, el)"
                @blur="() => handleFieldBlur(item.key)"
              />
            </div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="周查询配置JSON" prop="configWeek">
            <el-input
              type="textarea"
              v-model="form.configWeek"
              placeholder="请输入周查询配置JSON"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="月查询配置JSON" prop="configMonth">
            <el-input
              type="textarea"
              v-model="form.configMonth"
              placeholder="请输入月查询配置JSON"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="季查询配置JSON" prop="configQuarter">
            <el-input
              type="textarea"
              v-model="form.configQuarter"
              placeholder="请输入季度查询配置JSON"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="年查询配置JSON" prop="configYear">
            <el-input
              type="textarea"
              v-model="form.configYear"
              placeholder="请输入年查询配置JSON"
            />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="cancel('child')">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { useRequest } from 'vue-request';
  import { biApi, BiApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import CodeEditor from './codeViwer.vue';

  const visible = ref(false);
  const childVisible = ref(false);
  const childDialogType = ref<'add' | 'edit'>('add'); // 新增、编辑
  const search = ref({
    keyword: '',
  });
  const tableRef = ref();
  const editorRef = ref();
  const form = ref({
    reportCode: '',
    configCode: '',
    configDesc: undefined,
    configDay: undefined,
    configWeek: undefined,
    configMonth: undefined,
    configQuarter: undefined,
    configYear: undefined,
    id: undefined,
  });
  const formRef = ref();

  const validateJson = (rule: any, value: any, callback: any) => {
    if (value && !elMap[rule.field]?.isJsonValid()) {
      callback(new Error('请输入合法的JSON格式'));
    } else {
      callback();
    }
  };
  const rules = ref({
    reportCode: [{ required: true, message: '请输入看板编码', trigger: 'blur' }],
    configCode: [{ required: true, message: '请输入配置编码', trigger: 'blur' }],
    configDay: [{ validator: validateJson, trigger: ['blur', 'change'] }],
    configWeek: [{ validator: validateJson, trigger: ['blur', 'change'] }],
    configMonth: [{ validator: validateJson, trigger: ['blur', 'change'] }],
    configQuarter: [{ validator: validateJson, trigger: ['blur', 'change'] }],
    configYear: [{ validator: validateJson, trigger: ['blur', 'change'] }],
  });
  const {
    loading: loading,
    data: listData,
    run,
  } = useRequest(biApi.biReportConfigs, {
    manual: true,
  });
  const runQuery = () => {
    if (!rowData.value?.reportCode) return;
    return run({
      keyword: search.value.keyword,
      reportCode: rowData.value.reportCode,
    });
  };
  const rowData = ref<any>();
  const open = (row?: any) => {
    visible.value = true;
    rowData.value = row || {};
    nextTick(() => {
      runQuery();
    });
  };
  const handleAdd = () => {
    childVisible.value = true;
    childDialogType.value = 'add';
    form.value = {
      reportCode: rowData.value.reportCode,
      configDay: undefined,
      configWeek: undefined,
      configMonth: undefined,
      configQuarter: undefined,
      configYear: undefined,
      configCode: '',
      configDesc: undefined,
      id: undefined,
    };
  };
  const handleActions = async (item: any) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        childVisible.value = true;
        childDialogType.value = 'edit';
        form.value = cloneDeep(row || {});
        break;
      case 'delete':
        const isConfirmed = await swal.confirm('确定删除该配置吗？');
        if (!isConfirmed) return;
        await biApi.biReportConfigDelete(row.id);
        ElMessage.success('删除成功');
        runQuery();
        break;
    }
  };
  const elMap = {};
  const onSetRef = (key, el) => {
    elMap[key] = el;
  };
  const handleFieldBlur = (key: string) => {
    formRef.value?.validateField([key]);
  };
  const handleSubmit = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const url =
            childDialogType.value === 'add' ? biApi.biReportConfigAdd : biApi.biReportConfigUpdate;
          await url({ ...form.value });
          ElMessage.success('保存成功');
          cancel('child');
          runQuery();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cancel = (type?: string) => {
    if (type === 'child') {
      childVisible.value = false;
      formRef.value?.resetFields();
    } else {
      visible.value = false;
      visible.value = false;
      formRef.value?.clearValidate();
    }
  };
  defineExpose({
    open,
  });
</script>
<style scoped lang="scss">
  .target-data-container {
    width: 100%;
    text-align: left;

    .no-data {
      padding: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: rgb(153, 153, 153);
      font-size: 12px;
    }
  }
</style>
