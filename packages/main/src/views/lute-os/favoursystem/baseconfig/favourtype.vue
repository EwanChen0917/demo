<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="类型名称" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="addType">新增类型</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.featureList">
      <el-table-column label="类型名称" prop="name" />
      <el-table-column label="类型编码" prop="featureCode" />
      <el-table-column label="类型描述" prop="desc" />
      <el-table-column label="操作" width="60px">
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
                label: '查看',
                key: 'view',
                row: row,
                type: 'primary',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      :before-close="closeDialog"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="100px"
        :disabled="disabledForm"
      >
        <el-form-item label="类型名称" prop="name">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入类型名称"
            clearable
            maxlength="100"
          />
        </el-form-item>
        <el-form-item label="类型描述" prop="desc">
          <el-input
            v-model.trim="form.desc"
            placeholder="请输入类型描述"
            clearable
            type="textarea"
            :rows="5"
            maxlength="500"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            @click="confirm"
            :disabled="disabledForm"
            :loading="submitLoading"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </KeenList>
</template>

<script lang="ts" setup name="favourtype">
    import { ElTable as ElTableType, ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { metaApi, MetaApi } from '@/api/index';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
  } = useList<
    MetaApi.LuteosMetaQueryFeatureList.RequestQuery,
    MetaApi.LuteosMetaQueryFeatureList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaQueryFeatureList,
  });
  const dialogVisible = ref(false);
  const form = ref({});
  const formRef = ref();
  const rules = {
    name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
    desc: [{ required: true, message: '请输入类型描述', trigger: 'blur' }],
  };
  const dialogType = ref('add');
  const dialogTitle = computed(() => {
    if (dialogType.value === 'add') {
      return '新增红人类型';
    }
    if (dialogType.value === 'edit') {
      return '编辑红人类型';
    }
    return '查看红人类型';
  });
  const disabledForm = computed(() => dialogType.value === 'view');
  const addType = () => {
    dialogType.value = 'add';
    dialogVisible.value = true;
  };
  const handleActions = (command: any) => {
    const { key, row } = command;
    switch (key) {
      case 'edit':
      case 'view':
        dialogVisible.value = true;
        form.value = {
          ...row,
        };
        dialogType.value = key;
        break;
      default:
        break;
    }
  };
  const submitLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      submitLoading.value = true;
      const res = await metaApi.luteosMetaSaveFeature(form.value).finally(() => {
        submitLoading.value = false;
      });
      if (res) {
        ElMessage.success('操作成功');
        dialogVisible.value = false;
        runQuery();
        closeDialog();
      }
    }
  };
  const closeDialog = () => {
    form.value = {
      name: '',
      desc: '',
    };
    formRef.value?.clearValidate();
    dialogVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
