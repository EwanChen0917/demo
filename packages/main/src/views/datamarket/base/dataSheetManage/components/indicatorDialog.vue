/** * 管理指标弹窗 */
<template>
  <el-dialog
    v-model="visible"
    :title="`管理指标 - ${rowData?.table}`"
    width="70%"
    @close="cancel"
    align-center
  >
    <div class="d-flex align-items-center justify-content-between mb-4 gap-2">
      <el-input
        v-model="search.keyword"
        placeholder="请输入指标、指标名称，Enter键查询"
        clearable
        @keyup.enter="runQuery"
        @blur="runQuery"
      />
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增指标
      </el-button>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="listData" max-height="400px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="metric" label="指标" min-width="120" />
      <el-table-column prop="metricName" label="指标名称" min-width="120" />
      <el-table-column prop="metricAlias" label="指标别名" min-width="120" />
      <el-table-column prop="calculateYoy" label="计算同比" min-width="80">
        <template #default="{ row }">
          <Tag :color="row.calculateYoy === 1 ? 'green' : 'blue'">
            {{ row.calculateYoy === 1 ? '是' : '否' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="calculateMom" label="计算环比" min-width="80">
        <template #default="{ row }">
          <Tag :color="row.calculateMom === 1 ? 'green' : 'blue'">
            {{ row.calculateMom === 1 ? '是' : '否' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="metricDataSource" label="数据来源" max-width="120" />
      <el-table-column prop="metricUpdateFrequency" label="更新频率" max-width="180" />
      <el-table-column label="操作" width="120">
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
    :title="`${childDialogType === 'add' ? '新增指标' : '编辑指标'}`"
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
          <el-form-item label="指标" prop="metric">
            <el-input v-model="form.metric" placeholder="请输入指标" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指标名称" prop="metricName">
            <el-input v-model="form.metricName" placeholder="请输入指标名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指标别名" prop="metricAlias">
            <el-input v-model="form.metricAlias" placeholder="请输入指标别名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 指标描述 -->
          <el-form-item label="指标描述" prop="metricDesc">
            <el-input v-model="form.metricDesc" placeholder="请输入指标描述" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据来源" prop="metricDataSource">
            <el-input v-model="form.metricDataSource" placeholder="请输入数据来源" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新频率" prop="metricUpdateFrequencyList">
            <el-select
              v-model="form.metricUpdateFrequencyList"
              multiple
              collapse-tags
              collapse-tags-tooltip
              placeholder="请选择更新频率"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="opt in METRIC_UPDATE_FREQUENCY_OPTIONS"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <!-- 计算计算方式 -->
          <el-form-item label="计算计算方式" prop="metricCalculate">
            <el-input v-model="form.metricCalculate" placeholder="请输入指标描述" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 是否计算同比 -->
          <el-form-item label="是否计算同比" prop="calculateYoy">
            <el-select v-model="form.calculateYoy" placeholder="请选择是否计算同比">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 是否计算环比 -->
          <el-form-item label="是否计算环比" prop="calculateMom">
            <el-select v-model="form.calculateMom" placeholder="请选择是否计算环比">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="0" />
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
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const METRIC_UPDATE_FREQUENCY_OPTIONS = [
    { label: '小时', value: '小时' },
    { label: '天', value: '天' },
    { label: '周', value: '周' },
    { label: '月', value: '月' },
  ] as const;

  function parseUpdateFrequencyToList(s: unknown): string[] {
    if (s == null || s === '') return [];
    if (Array.isArray(s)) return (s as string[]).filter(Boolean);
    const str = String(s);
    return str
      .split(/[，,]/)
      .map((x) => x.trim())
      .filter(Boolean);
  }

  const visible = ref(false);
  const childVisible = ref(false);
  const childDialogType = ref<'add' | 'edit'>('add'); // 新增、编辑
  const search = ref({
    keyword: '',
  });
  const tableRef = ref();
  const form = ref({
    table: '',
    tableName: '',
    metric: '',
    metricName: '',
    metricAlias: '',
    metricDesc: '',
    metricDataSource: '',
    metricUpdateFrequency: '',
    metricUpdateFrequencyList: [] as string[],
    metricCalculate: '',
    calculateYoy: undefined,
    calculateMom: undefined,
  });
  const formRef = ref();
  const rules = ref({
    table: [{ required: true, message: '请输入表', trigger: 'blur' }],
    metric: [{ required: true, message: '请输入指标', trigger: 'blur' }],
    metricName: [{ required: true, message: '请输入指标名称', trigger: 'blur' }],
    metricCalculate: [{ required: true, message: '请输入计算计算方式', trigger: 'blur' }],
  });
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
    form.value = cloneDeep({
      ...rowData.value,
      calculateYoy: 1,
      calculateMom: 1,
    });
    form.value.metricUpdateFrequencyList = parseUpdateFrequencyToList(
      form.value.metricUpdateFrequency
    );
  };
  const handleActions = async (item: any) => {
    const { key, row } = item;
    switch (key) {
      case 'edit':
        childVisible.value = true;
        childDialogType.value = 'edit';
        form.value = cloneDeep(row || {});
        form.value.metricUpdateFrequencyList = parseUpdateFrequencyToList(
          form.value.metricUpdateFrequency
        );
        break;
      case 'delete':
        const isConfirmed = await swal.confirm('确定删除该指标吗？');
        if (!isConfirmed) return;
        await biApi.biTableMetricDelete(row.id);
        swal.success('删除成功');
        runQuery();
        break;
    }
  };
  const {
    loading: loading,
    data: listData,
    run,
  } = useRequest(biApi.biTableMetrics, {
    manual: true,
  });
  const runQuery = () => {
    if (!rowData.value?.table) return;
    return run({
      keyword: search.value.keyword,
      table: rowData.value.table,
    });
  };
  const handleSubmit = () => {
    formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          const url =
            childDialogType.value === 'add' ? biApi.biTableMetricAdd : biApi.biTableMetricUpdate;
          const payload = { ...form.value };
          const list = payload.metricUpdateFrequencyList ?? [];
          delete (payload as { metricUpdateFrequencyList?: string[] }).metricUpdateFrequencyList;
          payload.metricUpdateFrequency = list.join('，');
          await url(payload);
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
