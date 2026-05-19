<template>
  <el-dialog title="配置映射表" width="75%" :model-value="visible" @close="handleClose">
    <!-- <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="100px">
      <el-form-item prop="site" label="国家站点">
        <CountrySelect
          class="w-100"
          v-model="form.site"
          clearable
          placeholder="请选择国家"
          :scene="1"
          @change="handleQueryOperator"
        />
      </el-form-item>
      <el-form-item prop="productSpu" label="产品">
        <el-select
          v-model="form.productSpu"
          :teleported="false"
          placeholder="请选择产品"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          @change="handleQueryOperator"
        >
          <el-option
            v-for="item in spuList"
            :key="item.productSpu"
            :label="item.name"
            :value="item.productSpu"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="operatorList" label="运营人员">
        <el-select
          v-model="form.operatorList"
          :teleported="false"
          placeholder="请选择运营"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in operatorList"
            :key="item.operator"
            :label="item.operatorName"
            :value="item.operator"
           />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
    </template> -->
    <KeenList>
      <template #search>
        <el-space wrap>
          <CountrySelect
            class="w-120px"
            v-model="search.site"
            clearable
            placeholder="请选择国家"
            :scene="1"
          />

          <el-select
            v-model="search.productSpu"
            :teleported="false"
            placeholder="请选择产品"
            clearable
            filterable
            :filter-method="filterProductSpu"
          >
            <el-option
              v-for="item in filterSpuList"
              :key="item.productSpu"
              :label="item.name"
              :value="item.productSpu"
            >
              {{ `${item.name} (${item.productSpu})` }}
            </el-option>
          </el-select>

          <el-select
            class="operator-select"
            v-model="search.operator"
            :teleported="false"
            placeholder="请选择运营"
            multiple
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option
              v-for="item in operatorList"
              :key="item.memberCode"
              :label="item.name"
              :value="item.memberCode"
            />
          </el-select>
        </el-space>
      </template>
      <template #buttons>
        <el-button size="small" class="button" type="primary" @click="runQuery">查询</el-button>
        <el-button size="small" class="button" type="primary" @click="resetSearch">重置</el-button>
        <el-button
          v-permission="'configMapEdit:edit'"
          :disabled="listData?.resultList?.length === 0"
          size="small"
          class="button"
          type="primary"
          @click="toggleEdit"
        >
          {{ isEdit ? '取消编辑' : '一键编辑' }}
        </el-button>
        <el-button
          v-permission="'configMapEdit:save'"
          :disabled="!isEdit"
          size="small"
          class="button"
          type="primary"
          @click="saveEdit"
        >
          保存编辑
        </el-button>
      </template>
      <el-table
        class="form-table"
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.resultList"
        highlight-current-row
        max-height="55vh"
      >
        <el-table-column prop="countryName" label="国家站点" min-width="180px" />
        <el-table-column prop="spuName" label="产品名称" min-width="180px" />
        <el-table-column prop="spuCode" label="产品SPU" min-width="180px" />
        <el-table-column prop="operator" label="负责运营人员" min-width="180px">
          <template #default="{ row }">
            <div v-if="!isEdit">
              {{ getOperatorStr(row) }}
            </div>
            <el-select
              v-else
              class="operator-select"
              v-model="row.newOperatorList"
              placeholder="请选择运营"
              multiple
              clearable
              filterable
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="item in operateorList"
                :key="item.operator"
                :label="item.operatorName"
                :value="item.operator"
              />
            </el-select>
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
  </el-dialog>
</template>

<script setup lang="ts">
    import { memberApi, metaApi, productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import type {
    MetaMarkTaskOperatorResp,
    MetaProductSiteConfigMappingBean,
  } from '@/api/meta/data-contracts';
  import type { DeptMemberListQueryResp } from '@/api/member/data-contracts';
  import type { ProductListQueryResp } from '@/api/product/data-contracts';
  import useList from '@/hooks/list/useList';

  const {
    search,
    resetSearch,
    // searchData,
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
    tableRef,
  } = useList({
    searchDefaults: {
      site: '',
      productSpu: '',
      operator: undefined,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryProductConfigMapping,
    onSuccess(data) {
      getSelectedOperator(data);
    },
  });

  runQuery();

  function getOperatorStr(row: MetaProductSiteConfigMappingBean) {
    if (!row.operatorList || row.operatorList.length === 0) return '--';
    return row.operatorList.map((item) => item.operatorName).join('、');
  }

  const operateorList = ref<MetaMarkTaskOperatorResp['operatorList']>([]);
  function loadOperator() {
    const row = listData.value?.resultList && listData.value?.resultList[0];
    if (!row) return;
    metaApi
      .luteosMetaQueryTaskOperators({
        site: row.countryCode!,
        productCode: row.spuCode!,
      })
      .then((res) => {
        operateorList.value = res.operatorList;
      });
  }

  function getSelectedOperator(data) {
    const list = data.resultList;
    if (!list || list.length === 0) return;
    list.forEach((item) => {
      item.newOperatorList = item.operatorList?.map((sitem) => sitem.operator);
    });
  }
  const isEdit = ref(false);
  function toggleEdit() {
    isEdit.value = !isEdit.value;

    if (isEdit.value && !operateorList.value?.length) {
      loadOperator();
    }
  }

  function saveEdit() {
    const list = listData.value?.resultList;
    const mappingBeanList = list?.map((item) => {
      return {
        site: item.countryCode,
        productSpu: item.spuCode,
        operatorList: item.newOperatorList,
      };
    });
    metaApi
      .luteosMetaBatchUpdateMapping({ mappingBeanList })
      .then((res) => {
        if (!res) {
          ElMessage.error('保存失败');
          return;
        }
        ElMessage.success('保存成功');
        isEdit.value = false;
        runQuery();
      })
      .catch((err) => {
        ElMessage.error(err.message);
      });
  }

  withDefaults(
    defineProps<{
      visible: boolean;
    }>(),
    {
      visible: false,
    }
  );
  // const form = ref({
  //   site: '',
  //   productSpu: '',
  //   operatorList: [],
  // });

  // const rules = ref({
  //   site: { required: true, message: '请选择国家站点', trigger: ['blur', 'change'] },
  //   productSpu: { required: true, message: '请选择产品', trigger: ['blur', 'change'] },
  //   operatorList: { required: true, message: '请选择运营人员', trigger: ['blur', 'change'] },
  // });

  const operatorList = ref<DeptMemberListQueryResp['memberList']>([]);

  const queryOperatorList = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'all_dept',
      })
      .then((res) => {
        operatorList.value = res.memberList || [];
      });
  };
  queryOperatorList();
  // const handleQueryOperator = () => {
  //   if (form.value.site && form.value.productSpu) {
  //     queryOperatorList();
  //   }
  // };

  const spuList = ref<ProductListQueryResp['productBeanList']>([]);
  const querySpuList = async () => {
    const res = await productApi.luteosProductQueryProductList({
      pageNum: 1,
      pageSize: 1000,
    });
    spuList.value = res?.productBeanList?.map((item) => {
      return {
        productSpu: item.productSpu,
        name: item.name,
      };
    });
  };
  querySpuList();

  const filterSpuList = ref<ProductListQueryResp['productBeanList']>([]);
  function filterProductSpu(query: string) {
    if (!query) {
      filterSpuList.value = spuList.value;
      return;
    }
    filterSpuList.value = spuList.value?.filter((item) => {
      return item.productSpu?.indexOf(query) !== -1 || item.name?.indexOf(query) !== -1;
    });
  }

  // const formRef = ref();
  // const submitFn = async () => {
  //   const valid = await formRef.value.validate();
  //   if (valid) {
  //     metaApi
  //       .luteosMetaHandleMetaMarkTask({
  //         markTaskOperatorMapping: form.value,
  //         handleType: 7,
  //       })
  //       .then(() => {
  //         formRef.value.resetFields();
  //         ElMessage.success('配置成功！');
  //         emit('closeModal', 'reload');
  //       });
  //   }
  // };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    // formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped>
  .operator-select {
    width: 180px;
  }

  .form-table {
    :deep(.cell) {
      overflow: visible;
    }
  }
</style>
