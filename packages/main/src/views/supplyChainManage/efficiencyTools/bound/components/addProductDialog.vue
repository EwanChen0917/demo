<template>
  <el-dialog :model-value="visible" @close="$emit('close')" width="75%" top="1vh">
    <template #header><h2>添加产品</h2></template>
    <slot></slot>
    <div class="card card-flush">
      <div class="card-header align-items-center gap-2 gap-md-5">
        <div class="card-title">
          <el-space>
            <el-input
              v-model="keyword"
              placeholder="产品名称/产品SKU/供应链SKU"
              style="width: 500px"
              clearable
              @keyup.enter="requestList"
            >
              <template #suffix>
                <SvgIconSearch />
              </template>
            </el-input>
          </el-space>
        </div>
        <div class="card-toolbar">
          <el-space>
            <el-button class="button" type="primary" @click="requestList">查询</el-button>
            <el-button class="button" type="primary" @click="clear">清空</el-button>
          </el-space>
        </div>
      </div>
      <div class="card-body pt-0">
        <el-table
          max-height="400px"
          ref="tableRef"
          class-name="table-row-dashed"
          v-loading="listLoading"
          :data="listData"
          :row-key="(row) => row.supplySku"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" fixed reserve-selection />
          <el-table-column label="产品信息" min-width="350">
            <template #default="scope">
              <div class="sku">
                <div class="sku-content">
                  <div class="sku-content_title">
                    {{ scope.row.skuName }}
                  </div>
                  <div class="sku-content_smalltitle">sku:{{ scope.row.supplySku }}</div>
                </div>
                <div class="sku-footer">
                  <div>可用良品：{{ scope.row.availableQuantity }}</div>
                  <div>可用次品：{{ scope.row.unsellableQuantity }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="d-flex align-items-center justify-content-center mt-4">
          <el-button @click="nextRequest" :disabled="!pagination.hasNext" v-if="pagination.hasNext">
            下一页
          </el-button>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer-custom">
        <div>已选择{{ totalList?.length || 0 }}商品</div>
        <div>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">确定</el-button>
        </div>
      </div>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  /**
   * 使用锚点翻页的组件
   */
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { OmsApi, omsApi } from '@/api/index';
  import { QueryStockQueryReq, StockItem } from '@/api/oms/data-contracts';
  import { debounce } from 'lodash-es';

  type searchType = 'sku' | 'supplysku' | 'skuName';
  /**
   * 扩展 StockItem 类型，添加实际 API 返回的 id 字段
   * 因为 API 实际返回的数据包含 id，但 TypeScript 接口定义中缺少该字段
   */
  export interface StockItemWithId extends StockItem {
    id: any;
  }
  const props = defineProps<{
    visible: boolean;
    selectedRows: StockItemWithId[];
    selectOne?: boolean;
    warehouseCode?: string;
  }>();
  const searchType = ref<searchType>('sku');
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const PAGE_SIZE = 10;
  const listData = ref<any>([]);
  const listLoading = ref(false);
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const pagination = ref({
    hasNext: false,
    nextCursor: '',
    pageSize: PAGE_SIZE,
  });
  const keyword = ref<any>();
  const nextRequest = async () => {
    try {
      listLoading.value = true;
      const res = (await omsApi.omsCommonStockQueryStocks({
        keyword: keyword.value,
        warehouseCode: props.warehouseCode || '',
        pageSize: PAGE_SIZE,
        nextCursor: pagination.value.nextCursor,
      })) as any;
      pagination.value.nextCursor = res.nextCursor;
      pagination.value.hasNext = res.hasNext;
      if (res.items && res.items.length) {
        listData.value.push(...res.items);
      }
      setSelectedRows();
    } catch (e) {
      console.log(e);
    } finally {
      listLoading.value = false;
    }
  };
  const requestList = async () => {
    // 防御：避免重复请求
    if (listLoading.value) return;

    try {
      listLoading.value = true;
      const res = (await omsApi.omsCommonStockQueryStocks({
        keyword: keyword.value,
        warehouseCode: props.warehouseCode || '',
        pageSize: PAGE_SIZE,
      })) as any;
      pagination.value.nextCursor = res.nextCursor;
      pagination.value.hasNext = res.hasNext;
      listData.value = res.items || [];
    } catch (e) {
      console.log(e);
    } finally {
      listLoading.value = false;
    }
  };
  watch(
    keyword,
    debounce((newVal) => {
      if (!newVal) return;
      requestList();
    }, 300)
  );
  const clear = () => {
    keyword.value = '';
    requestList();
  };
  /**
   * SKU 输入框的双向绑定 computed
   * 实现字符串输入框与数组数据的自动转换
   * getter: 将 search.keyword 数组转换为逗号分隔的字符串显示
   * setter: 将输入的字符串自动分割为数组并同步到 search.keyword
   */
  // const skuInputValue = computed({
  //   get: () => {
  //     // 如果 keyword 是数组且有值，转换为逗号+空格分隔的字符串
  //     if (Array.isArray(keyword.value) && keyword.value.length > 0) {
  //       return keyword.value.join(', ');
  //     }
  //     return '';
  //   },
  //   set: (value: string) => {
  //     // 将输入的字符串转换为数组
  //     if (value && value.trim()) {
  //       // 支持多种分隔符：逗号（中英文）、空格、换行等
  //       // 自动过滤空值并去除每项的首尾空格
  //       const skuArray = value
  //         .split(/[,，\s\n]+/)
  //         .map((item: string) => item.trim())
  //         .filter((item: string) => item.length > 0);

  //       keyword.value = skuArray;
  //     } else {
  //       // 清空输入时，重置为空数组
  //       keyword.value = [];
  //     }
  //   },
  // });

  const currentRow = ref<any[]>([]);

  /**
   * 设置表格选中行
   * 需要等待数据加载完成后再设置选中状态
   */
  const setSelectedRows = async () => {
    await nextTick();
    if (!tableRef.value || !listData.value || !listData.value.length) return;
    if (props.selectedRows && props.selectedRows.length > 0) {
      // 清空之前的选中状态
      tableRef.value.clearSelection();
      // 遍历当前页数据，如果在已选列表中则设置为选中
      listData.value.forEach((item: any) => {
        const isSelected = props.selectedRows.some(
          (selectedRow) => selectedRow.supplySku === item.supplySku
        );
        if (isSelected) {
          tableRef.value!.toggleRowSelection(item, true);
        }
      });
    }
  };

  // 监听数据变化，数据加载完成后设置选中状态
  watch(
    () => listData.value,
    () => {
      setSelectedRows();
    },
    { immediate: true }
  );

  // 勾选商品
  const totalList = ref<StockItemWithId[]>();
  watch(
    () => props.visible,
    (visible) => {
      if (visible && props.selectedRows) {
        totalList.value = [...props.selectedRows];
      }
    },
    { immediate: true }
  );
  const handleSelectionChange = (list: StockItemWithId[]) => {
    // 获取当前表格数据中所有项的 supplySku 集合
    const currentDataSupplySkus = new Set(
      listData.value.map((item: StockItemWithId) => item.supplySku).filter(Boolean)
    );

    // 保留 totalList 中不在当前表格数据中的项（跨页/跨搜索的选中项）
    const preservedItems = (totalList.value || []).filter(
      (item: StockItemWithId) => item.supplySku && !currentDataSupplySkus.has(item.supplySku)
    );

    // 合并保留的项和当前表格选中的项，并去重
    const combined = [...preservedItems, ...list];
    const uniqueMap = new Map<string, StockItemWithId>();
    combined.forEach((item) => {
      if (item.supplySku) {
        uniqueMap.set(item.supplySku, item);
      }
    });

    totalList.value = Array.from(uniqueMap.values());
  };

  // 选择商品
  const handleSave = () => {
    console.log(totalList.value);
    // return
    // 单选
    if (props.selectOne) {
      if (!currentRow.value || currentRow.value?.length === 0) {
        ElMessage.warning({
          message: '请选择一个商品',
          duration: 5 * 1000,
        });
        return;
      }
      emit('close', true, currentRow.value);
    } else if (totalList.value && totalList.value.length) {
      emit('close', true, props.selectOne ? totalList.value[0] : totalList.value);
    } else {
      ElMessage.warning({
        message: '未选择商品',
        duration: 5 * 1000,
      });
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };
  onMounted(() => {
    requestList();
  });
  onDeactivated(() => {
    console.log(`弹窗实例被销毁`);
  });
</script>

<style scoped lang="scss">
  /**
   * 产品图片容器
   * 确保图片和占位符在单元格中垂直水平居中
   */
  .product-image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 5px 0;
  }

  /**
   * 产品图片样式
   * 固定宽高70px，圆角设计提升视觉效果
   */
  .product-image {
    width: 70px;
    height: 70px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    :deep(.el-image__inner) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /**
   * 图片加载失败状态
   * 提供友好的错误提示
   */
  .image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background-color: #f5f7fa;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    color: #909399;

    .error-text {
      font-size: 12px;
      margin-top: 4px;
      color: #f56c6c;
    }
  }

  /**
   * 无图片占位符
   * 提供清晰的无数据状态提示
   */
  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background-color: #fafafa;
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
    color: #c0c4cc;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
      border-color: #d0d0d0;
    }

    .placeholder-text {
      font-size: 12px;
      margin-top: 4px;
      color: #a8abb2;
    }
  }
  /**
   * SKU 产品信息展示区域
   * 使用 Grid 布局实现上下分区，美观展示产品信息和库存数据
   */
  .sku {
    display: grid;
    width: 100%;
    min-height: 70px;
    grid-template-rows: auto auto;
    gap: 8px;
    padding: 8px 0;

    /**
     * 产品内容区（标题和SKU）
     */
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 4px;

      &_title {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        line-height: 1.4;
        word-break: break-word;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &_smalltitle {
        font-size: 13px;
        color: #606266;
        font-family: 'Consolas', 'Monaco', monospace;
      }
    }

    /**
     * 底部库存信息区
     */
    &-footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      color: #909399;
      flex-wrap: wrap;

      > div {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        background-color: #f4f4f5;
        border-radius: 4px;
        white-space: nowrap;

        &:first-child {
          color: #67c23a;
          background-color: #f0f9ff;
          border: 1px solid #e1f3d8;
        }

        &:last-child {
          color: #e6a23c;
          background-color: #fdf6ec;
          border: 1px solid #faecd8;
        }
      }
    }
  }
  .dialog-footer-custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
