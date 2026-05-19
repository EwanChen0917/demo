/** * 维度管理弹窗 */
<template>
  <el-dialog
    v-model="visible"
    :title="`管理维度 - ${rowData?.reportCode}`"
    width="70%"
    @close="cancel"
    align-center
  >
    <div class="d-flex align-items-center justify-content-between mb-4 gap-2">
      <el-input
        v-model="search.keyword"
        placeholder="请输入维度、维度名称，Enter键查询"
        clearable
        @keyup.enter="runQuery"
        @blur="runQuery"
      />
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增维度
      </el-button>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="listData" max-height="400px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="dimension" label="查询维度" />
      <!-- 创建时间、更新时间 -->
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
    :title="`${childDialogType === 'add' ? '新增看板维度' : '编辑看板维度'}`"
    width="60%"
    @close="() => cancel('child')"
    class="custom-dialog"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" label-position="top">
      <el-form-item label="看板编码" prop="reportCode">
        <el-input v-model="form.reportCode" placeholder="请输入看板编码" disabled />
      </el-form-item>
      <el-form-item label="查询维度" prop="dimension">
        <el-input v-model="form.dimension" placeholder="请输入查询维度" />
      </el-form-item>
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

  const visible = ref(false);
  const childVisible = ref(false);
  const childDialogType = ref<'add' | 'edit'>('add'); // 新增、编辑
  const tableRef = ref();
  const form = ref({
    reportCode: '',
    dimension: '',
    id: undefined,
  });
  const formRef = ref();
  const rules = ref({
    reportCode: [{ required: true, message: '请输入看板编码', trigger: 'blur' }],
    dimension: [{ required: true, message: '请输入查询维度', trigger: 'blur' }],
  });
  const search = ref({
    keyword: '',
  });
  const rowData = ref<any>();
  const {
    loading: loading,
    data: listData,
    run,
  } = useRequest(biApi.biReportDimensions, {
    manual: true,
  });
  const runQuery = () => {
    if (!rowData.value?.reportCode) return;
    return run({
      keyword: search.value.keyword,
      reportCode: rowData.value.reportCode,
    });
  };
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
      ...form.value,
      reportCode: rowData.value.reportCode,
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
        console.log(row);
        const isConfirmed = await swal.confirm('确定删除该维度吗？');
        if (!isConfirmed) return;
        await biApi.biReportDimensionDelete(row.id);
        ElMessage.success('删除成功');
        runQuery();
        break;
    }
  };
  const handleSubmit = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const url =
            childDialogType.value === 'add'
              ? biApi.biReportDimensionAdd
              : biApi.biReportDimensionUpdate;
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
      formRef.value?.clearValidate();
    }
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped></style>
