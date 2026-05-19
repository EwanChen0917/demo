<template>
  <div class="ele_table_wrap">
    <div class="rt_ele_table_wrap">
      <el-form ref="eleFormRuleRef" :model="ruleForm" :inline-message="true" class="juse_for_rule">
        <div></div>
        <!-- 表格 -->
        <el-table
          class="add_style"
          ref="innerTable"
          :data="tableData"
          v-loading="tableLoading"
          :[heightProp]="'100%'"
          :show-summary="needTotal"
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @expand-change="handleExpandChange"
          :row-key="rowKey"
          :expand-row-keys="expandRowKey"
        >
          <template v-for="(column, index) in columns" :key="index">
            <!-- 直接通过slot传递 -->
            <el-table-column
              v-if="column.type && column.type === 'slot'"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :fixed="column.fixed"
              :min-width="column.minWidth"
              :align="column.align || 'left'"
              :header-align="column.headerAlign || 'left'"
            >
              <template #header v-if="column.renderHeader">
                <component :is="column.renderHeader" :row="column" />
              </template>
              <template #default="scope">
                <slot :name="column.prop" :row="scope.row"></slot>
              </template>
            </el-table-column>
            <!-- 多选 -->
            <template v-else-if="column.type && column.type === 'selection'">
              <el-table-column
                type="selection"
                :width="column.width"
                :fixed="column.fixed"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || 'left'"
              />
            </template>
            <!-- 序号 -->
            <template v-else-if="column.type && column.type === 'index'">
              <el-table-column
                type="index"
                :width="column.width"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || 'left'"
                :label="column.label"
                :fixed="column.fixed"
              >
                <template #header v-if="column.renderHeader">
                  <component :is="column.renderHeader" :row="column" />
                </template>
              </el-table-column>
            </template>
            <!-- 展开 -->
            <template v-else-if="column.type && column.type === 'expand'">
              <el-table-column type="expand" :width="column.width">
                <template #default="scope">
                  <slot :name="column.prop" :row="scope.row"></slot>
                </template>
              </el-table-column>
            </template>
            <!-- 其他列 -->
            <template v-else>
              <el-table-column
                v-if="!column.render"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :fixed="column.fixed"
                :min-width="column.minWidth"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || 'left'"
              >
                <template #header v-if="column.renderHeader">
                  <component :is="column.renderHeader" :row="column" />
                </template>
              </el-table-column>
              <el-table-column
                v-else
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :fixed="column.fixed"
                :min-width="column.minWidth"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || 'left'"
                :show-overflow-tooltip="column.showOverflowTooltip"
              >
                <template #header v-if="column.renderHeader">
                  <component :is="column.renderHeader" :row="column" />
                </template>
                <template #default="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index + '.' + column.prop"
                    :rules="column.rules ? column.rules : []"
                  >
                    <component :is="column.render" :row="scope.row" :scope="scope" />
                  </el-form-item>
                </template>
              </el-table-column>
            </template>
          </template>
          <template #empty>
            <div class="img_wrap">
              <div class="img_txt">暂无数据!</div>
            </div>
          </template>
        </el-table>
      </el-form>
    </div>

    <!-- 分页 -->
    <div class="rt_pagin_wrap">
      <!-- <div class="sieze_change_wrap">
        <RtSelect
          :selectVal="pagSize"
          :optionList="sizeOptions"
          :clearable="false"
          size="default"
          @select-change="sizeSelectChange"
        />
      </div> -->
      <el-pagination
        v-if="needPaga"
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
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { baseStore } from '@/store/modules/baseStore';

  const baseInfo = baseStore();

  const { tableLoading } = storeToRefs(baseInfo);
  const props = withDefaults(
    defineProps<{
      tableData: any[];
      columns: tableColumnItf[];
      pageInfo?: any;
      needPaga?: boolean;
      needScroll?: boolean;
      needTotal?: boolean;
      getSummaries?: any;
      rowKey?: string;
      expandRowKey?: any;
      sizeOptions?: any;
    }>(),
    {
      pageInfo: {
        currentPage: 1,
        size: 10,
        total: 0,
      },
      needPaga: true,
      needScroll: true,
      needTotal: false,
      rowKey: 'id',
      expandRowKey: [],
      sizeOptions: [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
        { label: 40, value: 40 },
        { label: 50, value: 50 },
      ],
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

  const pagSize = ref(10);
  const sizeSelectChange = (val: number) => {
    emit('pagin', 'pagesize', val);
  };

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
  const emit = defineEmits<{
    (event: 'selectionChange', data: any): void;
    (event: 'expandChange', data: any): void;
    (event: 'pagin', type: string, data: number): void;
    (event: 'select', selection: any, row: any): void;
  }>();
  const handleSelectionChange = (val: any) => {
    emit('selectionChange', val);
  };
  const handleSelect = (selection: any, row: any) => {
    emit('select', selection, row);
  };
  const handleExpandChange = (row: any) => {
    emit('expandChange', row);
  };
  const sizeChange = (size: number) => {
    emit('pagin', 'pagesize', size);
  };
  const currentChange = (currentPage: number) => {
    emit('pagin', 'curPage', currentPage);
  };
  const innerTable = ref();
  const eleFormRuleRef = ref();
  defineExpose({ innerTable, eleFormRuleRef });
</script>

<style lang="scss" scoped>
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
