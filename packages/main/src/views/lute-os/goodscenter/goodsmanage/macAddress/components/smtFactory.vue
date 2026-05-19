<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input
          v-model="search.keyword"
          placeholder="请输入供应商/工厂名称/工厂代码"
          clearable
          style="width: 300px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #buttons>
      <el-button type="primary" @click="smtFactoryVisible = true">新增</el-button>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.macFactoryList || []">
      <el-table-column type="selection" width="40" />
      <el-table-column label="工厂名称" prop="factoryName" min-width="150" />
      <el-table-column label="工厂代码" prop="factoryCode" min-width="100" />
      <el-table-column label="供应商" prop="supplierName" min-width="220" />
      <el-table-column label="生产项目" prop="project" min-width="100" />
      <el-table-column label="备注" prop="remark" min-width="100" />
      <el-table-column label="操作人" min-width="150px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建人：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.creatorName }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新人：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.operatorName }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="190px">
        <template #default="{ row }">
          <div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">创建时间：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.createTime }}</span>
            </div>
            <div>
              <span class="fw-semibold text-gray-600 fs-7">更新时间：</span>
              <span class="fw-semibold text-gray-600 fs-7">{{ row.updateTime }}</span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: scope.row,
              },
              {
                label: '删除',
                key: 'del',
                type: 'danger',
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
  <EditSmtFactory
    v-if="smtFactoryVisible"
    :visible="smtFactoryVisible"
    :info="formData"
    @close-modal="closeModalRedact"
  />
</template>

<script lang="ts" setup>
    import { ElTable as ElTableType, ElMessage } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import router from '@/router';
  import * as swal from '@/utils/swal';
  import EditSmtFactory from './Modal/editSmtFactory.vue';

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
    runQuery,
    resetSearch,
    listData,
    listLoading,
  } = useList<
    ProductApi.LuteosProductMacQueryList.RequestQuery,
    ProductApi.LuteosProductMacQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductMacQueryList,
  });

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      formData.value = row;
      smtFactoryVisible.value = true;
    }

    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;

      await productApi.luteosProductMacOperate({
        factoryCode: row.factoryCode,
        operateType: 'delete',
      });
      ElMessage.success('删除成功');
      runQuery();
    }
  };

  const formData = ref({});

  const smtFactoryVisible = ref(false);
  const closeModalRedact = (reload) => {
    formData.value = {};
    if (reload) {
      runQuery();
    }
    smtFactoryVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
