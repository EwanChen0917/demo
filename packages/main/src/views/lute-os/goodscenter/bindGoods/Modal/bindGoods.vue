<template>
  <el-dialog :model-value="visible" @close="handleCancel" width="75%" top="1vh" @open="runQuery">
    <template #title><h2>选择产品</h2></template>
    <slot></slot>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input v-model="search.keyWord" placeholder="产品名称/产品SPU">
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
            <CategoryCascader
              v-model="search.categoryCode"
              placeholder="选择分类"
              :emitPath="false"
              @change="
                (val) => {
                  search.level = val.level;
                }
              "
            />
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button class="button" type="primary" @click="runQuery">查询</el-button>
          </el-space>
        </div>
      </div>
      <!--      <div class="card-header align-items-center gap-2 gap-md-5">
              <div class="card-title w-100">
                <el-form inline :model="form" ref="formRef" class="d-flex flex-wrap w-100">
                  <el-select
                    v-for="i in 5"
                    :key="i"
                    class="me-3 mb-3"
                    v-model="form[`categoryCode${i}`]"
                    :placeholder="placeholderMap[i]"
                    clearable
                    :teleported="false"
                    @change="
                      (val) => {
                        handelChange(val, i);
                      }
                    "
                  >
                    <el-option
                      v-for="item in optionsMap[`options${i}`]"
                      :key="item.categoryCode"
                      :label="item.categoryName || ''"
                      :value="item.categoryCode!"
                    />
                  </el-select>
                </el-form>
              </div>
            </div>-->
      <div class="card-body pt-0">
        <el-table
          max-height="400px"
          ref="tableRef"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData?.productBeanList"
          row-key="productSpu"
          @selection-change="handleSelectionChange"
        >
          <el-table-column width="55" align="center" v-if="selectOne">
            <template #default="{ row }">
              <el-radio
                v-model="selectedKey"
                :label="row.productSpu"
                :disabled="row.productSpu && selectedRow?.productSpu === row.productSpu"
                @change="
                  (val) => {
                    handleRowChange(val, row);
                  }
                "
              >
                {{}}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column v-else type="selection" width="55" reserve-selection />
          <el-table-column label="产品信息" width="350">
            <template #default="scope">
              <div class="d-flex align-items-center pe-5">
                <KeenImagePreview :src="scope.row.productImage" />
                <div class="ms-5 fs-5">
                  <div class="text-gray-800 fw-bold">
                    {{ scope.row.name }}
                  </div>
                  <div>{{ scope.row.productSpu }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU数量" min-width="120">
            <template #default="scope">
              <span>
                {{ scope.row.productSkuCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="stateName" label="产品状态" min-width="120">
            <template #default="scope">
              <span class="badge" :class="statusColorMap[scope.row.state]">
                {{ scope.row.stateDesc }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="categoryLevel" label="分类" min-width="200" />
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import CategoryCascader from '@/views/lute-os/goodscenter/components/categoryCascader.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      selectedKey?: string;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      brandCode?: string;
    }>(),
    {
      selectOne: false,
      confirmText: '关联产品',
    }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const statusColorMap = reactive({
    0: 'badge-light-primary',
    1: 'badge-light-info',
    2: 'badge-light-success',
    3: 'badge-light-danger',
  });
  const PAGE_SIZE = 10;
  console.log('selectedRows111', props.selectedRows);
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductQueryProductList.RequestQuery,
    ProductApi.LuteosProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyWord: undefined,
      categoryCode: undefined,
      level: undefined,
      brandCode: props.brandCode,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductQueryProductList,
  });

  const currentRow = ref();
  const selectedKey = ref();

  const handleRowChange = (_, row) => {
    currentRow.value = row;
  };

  const setSelectedRows = async () => {
    await nextTick();
    if (props.selectedRows && props.selectedRows.length > 0) {
      props.selectedRows.forEach((row) => {
        tableRef.value!.toggleRowSelection(row);
      });
    }
    if (props.selectedRow) {
      currentRow.value = props.selectedRow;
      selectedKey.value = props.selectedKey;
      console.log('selectedKey', selectedKey.value);
    }
  };
  setSelectedRows();
  // 勾选产品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    // console.log('selectedlist', list)
    totalList.value = list;
  };

  // 选择产品
  const handleSave = () => {
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个产品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择产品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    tableRef.value?.clearSelection();
    emit('close');
  };

  /* watch(
    () => props.visible,
    (val) => {
      if (val) {
        resetSearch();
        setSelectedRows();
      }
    }
  ); */

  const open = () => {
    resetSearch();
    runQuery();
  };

  defineExpose({
    open,
  });

  /* const getOptions = async (categoryCode: string, level: number) => {
const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
categoryCode,
});
optionsMap[`options${level}`] = res.categoryLevelBeanList;
};
getOptions('', 1); */
</script>

<style scoped lang="scss"></style>
