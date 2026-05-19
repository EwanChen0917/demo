<template>
  <el-drawer
    title="分类管理"
    v-model="props.visible"
    direction="rtl"
    size="40%"
    @closed="handleClose"
  >
    <KeenList>
      <template #buttons>
        <el-button class="button" type="primary" @click="categoryVisible = true">
          添加分类
        </el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.fileCategoryList"
        row-key="categoryCode"
        class-name="table-row-dashed"
        :tree-props="{
          hasChildren: 'hasChildren',
          children: 'categoryBeanList',
        }"
        :expand-row-keys="expandRowKeys"
        @expand-change="handleExpandChange"
      >
        <el-table-column prop="categoryName" label="分类名称" min-width="200px" />
        <el-table-column prop="level" label="层级">
          <template #default="scope">{{ scope.row.level }}级</template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建人" />
        <el-table-column label="操作">
          <template #default="scope">
            <KeenActions
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  text: true,
                  row: scope.row,
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'primary',
                  text: true,
                  row: scope.row,
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
    </KeenList>
  </el-drawer>

  <CategoryAddModal
    v-if="categoryVisible"
    :visible="categoryVisible"
    :info="formData"
    @close-modal="closeModalRedact"
    :scene="scene"
  />
</template>

<script lang="ts" setup>
    import { ElMessage } from 'element-plus';
  import { fccApi, FccApi } from '@/api/index';
  import useList from '@/views/lute-os/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import CategoryAddModal from './categoryAddModal.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      scene: number;
    }>(),
    {
      visible: false,
    }
  );

  const PAGE_SIZE = 10;
  const {
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    runQuery,
    listData,
    listLoading,
  } = useList<
    FccApi.LuteosFccCategoryQueryFccCategoryList.RequestQuery,
    FccApi.LuteosFccCategoryQueryFccCategoryList.ResponseBody
  >({
    searchDefaults: {
      scene: +props.scene,
    },
    pageSize: PAGE_SIZE,
    service: fccApi.luteosFccCategoryQueryFccCategoryList,
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      formData.value = row;
      categoryVisible.value = true;
    } else if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await fccApi.luteosFccCategoryDeleteFccCategory({
        categoryCode: row.categoryCode,
      });
      ElMessage.success('删除成功');
      runQuery();
    }
  };
  const formData = ref({});

  const categoryVisible = ref(false);
  const closeModalRedact = (reload) => {
    formData.value = {};
    if (reload) {
      runQuery();
    }
    categoryVisible.value = false;
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();
  const handleClose = () => {
    emit('closeModal');
  };

  onMounted(() => {
    runQuery();
  });
</script>

<style scoped lang="scss"></style>
