/** * 维度管理弹窗 */
<template>
  <el-dialog
    v-model="visible"
    :title="`管理维度 - ${rowData?.table}`"
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
      <el-table-column prop="dimension" label="维度" />
      <el-table-column prop="dimensionName" label="维度名称" />
      <el-table-column prop="dimensionAlias" label="维度别名" />
      <el-table-column prop="timeDimensionType" label="时间维度类型">
        <template #default="{ row }">
          <Tag
            v-if="row.timeDimensionType"
            :color="
              {
                year: 'blue',
                month: 'green',
                week: 'yellow',
                day: 'purple',
              }[row.timeDimensionType] || ''
            "
          >
            {{ row.timeDimensionType }}
          </Tag>
          <span v-else>--</span>
        </template>
      </el-table-column>
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
    :title="`${childDialogType === 'add' ? '新增维度' : '编辑维度'}`"
    width="60%"
    @close="() => cancel('child')"
    class="custom-dialog"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="表" prop="table">
            <el-input v-model="form.table" placeholder="请输入表" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="表名" prop="tableName">
            <el-input v-model="form.tableName" placeholder="请输入表名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维度" prop="dimension">
            <el-input v-model="form.dimension" placeholder="请输入维度" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维度名称" prop="dimensionName">
            <el-input v-model="form.dimensionName" placeholder="请输入维度名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维度别名" prop="dimensionAlias">
            <el-input v-model="form.dimensionAlias" placeholder="请输入维度别名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际查询维度" prop="queryDimension">
            <el-input v-model="form.queryDimension" placeholder="请输入实际查询维度" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联维度表" prop="relatedDimensionTable">
            <el-input v-model="form.relatedDimensionTable" placeholder="请输入关联维度表" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联维度表结果字段" prop="relatedDimensionTableField">
            <el-input
              v-model="form.relatedDimensionTableField"
              placeholder="请输入关联维度表结果字段"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 关联维度表查询字段 -->
          <el-form-item label="关联维度表查询字段" prop="relatedDimensionTableQueryField">
            <el-input
              v-model="form.relatedDimensionTableQueryField"
              placeholder="请输入关联维度表查询字段"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 关联维度表关联字段 -->
          <el-form-item label="关联维度表关联字段" prop="relatedDimensionTableRelatedField">
            <el-input
              v-model="form.relatedDimensionTableRelatedField"
              placeholder="请输入关联维度表关联字段"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 维度权限映射 -->
          <el-form-item label="维度权限映射" prop="dimensionPermissionMapping">
            <el-input v-model="form.dimensionPermissionMapping" placeholder="请输入维度权限映射" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 默认条件 -->
          <el-form-item label="默认条件" prop="defaultValue">
            <el-input v-model="form.defaultValue" placeholder="请输入默认条件" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 排序字段 -->
          <el-form-item label="排序字段" prop="orderBy">
            <el-input v-model="form.orderBy" placeholder="请输入排序字段" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 时间维度类型 -->
          <el-form-item label="时间维度类型" prop="timeDimensionType">
            <el-select v-model="form.timeDimensionType" placeholder="请选择时间维度类型">
              <el-option label="年" value="year" />
              <el-option label="季" value="quarter" />
              <el-option label="月" value="month" />
              <el-option label="周" value="week" />
              <el-option label="日" value="day" />
            </el-select>
          </el-form-item>
        </el-col>
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

  const visible = ref(false);
  const childVisible = ref(false);
  const childDialogType = ref<'add' | 'edit'>('add'); // 新增、编辑
  const tableRef = ref();
  const form = ref({
    table: '',
    tableName: '',
    dimension: '',
    dimensionName: '',
    dimensionAlias: '',
    queryDimension: '',
    relatedDimensionTable: '',
    relatedDimensionTableField: '',
    relatedDimensionTableQueryField: '',
    relatedDimensionTableRelatedField: '',
    dimensionPermissionMapping: undefined,
    defaultValue: undefined,
    orderBy: undefined,
    timeDimensionType: undefined,
  });
  const formRef = ref();
  const rules = ref({
    table: [{ required: true, message: '请输入表', trigger: 'blur' }],
    dimension: [{ required: true, message: '请输入维度', trigger: 'blur' }],
    dimensionName: [{ required: true, message: '请输入维度名称', trigger: 'blur' }],
  });
  const search = ref({
    keyword: '',
  });
  const rowData = ref<any>();
  const {
    loading: loading,
    data: listData,
    run,
  } = useRequest(biApi.biTableDimensions, {
    manual: true,
  });
  const runQuery = () => {
    if (!rowData.value?.table) return;
    return run({
      keyword: search.value.keyword,
      table: rowData.value.table,
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
    form.value = cloneDeep({
      ...rowData.value,
    });
  };
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        childVisible.value = true;
        childDialogType.value = 'edit';
        form.value = cloneDeep(row || {});
        break;
      case 'delete':
        const isConfirmed = await swal.confirm('确定删除该维度吗？');
        if (!isConfirmed) return;
        await biApi.biTableDimensionDelete(row.id);
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
              ? biApi.biTableDimensionAdd
              : biApi.biTableDimensionUpdate;
          await url({ ...form.value });
          ElMessage.success('操作成功');
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
