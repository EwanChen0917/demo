<template>
  <div class="card-body pt-0 rt_card_body">
    <div class="ele_table_wrap">
      <div class="rt_ele_table_wrap">
        <!-- 表格 -->
        <el-table
          ref="innerTable"
          class="add_style"
          :data="tableData"
          :[heightProp]="maxHeight || '100%'"
          v-loading="tableLoading"
          :show-summary="needTotal"
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @expand-change="handleExpandChange"
          :row-key="rowKey"
        >
          <template v-for="(column, index) in columns" :key="index">
            <el-table-column
              v-if="column.type && ['selection', 'index'].includes(column.type)"
              :type="column.type"
              :width="column.width"
              :fixed="column.fixed"
              :align="column.align"
              :headerAlign="column.headerAlign"
              :reserve-selection="column.reserveSelection"
            />
            <el-table-column
              v-else
              :type="column.type ? column.type : ''"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :fixed="column.fixed"
              :min-width="column.minWidth"
              :align="column.align"
              :headerAlign="column.headerAlign"
              :show-overflow-tooltip="column.showOverflowTooltip"
            >
              <template #header v-if="column.renderHeader">
                <component :is="column.renderHeader" :row="column" />
              </template>

              <template #default="scope" v-if="column.type && column.type === 'slot'">
                <slot :name="column.prop" :row="scope.row"></slot>
              </template>
              <template #default="scope" v-else>
                <div>
                  <component :is="column.render" :row="scope.row" :scope="scope" />
                </div>
              </template>
            </el-table-column>
          </template>
          <template #empty>
            <div class="img_wrap">
              <div class="img_txt">暂无数据!</div>
            </div>
          </template>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="rt_pagin_wrap" v-if="isShowPagination">
        <el-pagination
          class="rt_ele_pagin"
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.size"
          layout="prev, pager, next"
          :pager-count="5"
          background
          :total="pageInfo.total"
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Table">
  import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue';

  const props = withDefaults(
    defineProps<{
      tableData: any[];
      columns: [];
      tableLoading: any;
      pageInfo?: any;
      isShowPagination?: boolean;
      needScroll?: boolean;
      needTotal?: boolean;
      getSummaries?: any;
      rowKey?: string;
      maxHeight?: number | string;
    }>(),
    {
      // 分页信息
      pageInfo: {
        currentPage: 1,
        size: 10,
        total: 0,
      },
      tableLoading: false,
      isShowPagination: true,
      needScroll: true,
      needTotal: false,
      rowKey: 'id',
      maxHeight: undefined,
    }
  );

  const ruleForm = ref<any>({});
  // 动态绑定属性 -- 直接绑定height在el-table上会导致表格出现滚动条，改为动态绑定属性
  const heightProp = ref('height');

  watch(
    () => props.needScroll,
    (val) => {
      if (!val) {
        heightProp.value = '';
      } else {
        heightProp.value = 'height';
      }
    },
    {
      immediate: true,
    }
  );

  // 验证的table数据一定要在form表单 form的对象里
  watch(
    () => props.tableData,
    () => {
      ruleForm.value.tableData = { ...props.tableData };
    },
    {
      immediate: true,
    }
  );
  // 事件声明
  const emit = defineEmits<{
    (event: 'selectionChange', data: any): void;
    (event: 'expandChange', data: any): void;
    (event: 'pageChange', type: string, data: number): void;
    (event: 'select', selection: any, row: any): void;
  }>();
  // 选择项发生变化时会触发该事件
  const handleSelectionChange = (val: any) => {
    emit('selectionChange', val);
  };

  // 手动勾选数据行的 Checkbox 时触发的事件
  const handleSelect = (selection: any, row: any) => {
    emit('select', selection, row);
  };

  // 页数改变
  const sizeChange = (size: number) => {
    emit('pageChange', 'pagesize', size);
  };
  // 页数切换
  const currentChange = (currentPage: number) => {
    emit('pageChange', 'curPage', currentPage);
  };

  const handleExpandChange = (data: any) => {
    emit('expandChange', data);
  };

  // ref节点声明
  const innerTable = ref();
  // 属性暴露
  defineExpose({ innerTable });
</script>

<style lang="scss" scoped>
  .card-body {
    background: #ffff;
    min-height: 70%;
  }

  .ele_table_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .rt_ele_table_wrap {
      flex: 1;
      overflow: hidden;

      ::v-deep(.el-table__body) {
        min-height: 1px;
      }
    }

    .search-wrap {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      margin-top: 20px;
      background: #fff;
    }

    .juse_for_rule {
      width: 100%;
      height: 100%;
      flex: 1;
      overflow: hidden;

      ::v-deep(.el-form-item) {
        font-size: 12px;
        font-weight: normal;
        margin-bottom: 0;
        padding-right: 0;
      }

      ::v-deep(.el-form-item__content) {
        font-size: 12px;
        margin-bottom: 0;
        font-weight: normal;
        line-height: normal;
      }
    }

    .rt_pagin_wrap {
      flex: 0 0 4.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .sieze_change_wrap {
        width: 70px;
      }
    }

    ::v-deep(.rt_ele_pagin.el-pagination button) {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.475rem;
      height: 2.5rem;
      min-width: 2.5rem;
      font-weight: 500;
      font-size: 1.075rem;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev) {
      background-color: #fff;
      padding: 0;
      margin: 0;
      margin-right: 0.5rem;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev:hover) {
      color: #3e97ff;
      background-color: #f4f6fa;
      border-color: transparent;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev:hover .el-icon) {
      color: #3e97ff;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev .el-icon) {
      color: #0b0b0c;
      font-size: 14px;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next) {
      background-color: #fff;
      padding: 0;
      margin: 0;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next .el-icon) {
      color: #0b0b0c;
      font-size: 14px;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next:hover) {
      color: #3e97ff;
      background-color: #f4f6fa;
      border-color: transparent;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next:hover .el-icon) {
      color: #3e97ff;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li) {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.475rem;
      height: 2.5rem;
      width: 2.7rem;
      font-weight: 500;
      font-size: 1.075rem;
      background-color: #fff;
      color: #5e6278;
      padding: 0;
      margin: 0;
      margin-right: 0.5rem;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li.is-active) {
      color: #fff !important;
      background-color: #3e97ff !important;
      cursor: pointer;
    }

    ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li:hover) {
      color: #3e97ff;
      background-color: #f4f6fa;
    }

    ::v-deep(.el-table__empty-text) {
      width: 100%;
      height: 100%;
      line-height: normal;
    }

    .img_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      > img {
        // height: 100%;
        // max-height: 340px;
        object-fit: contain;
      }

      .img_txt {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 50%;
        font-size: 14px;
        color: #626466;
      }
    }

    ::v-deep(.el-table__empty-block) {
      height: 450px !important;
    }
  }
</style>
