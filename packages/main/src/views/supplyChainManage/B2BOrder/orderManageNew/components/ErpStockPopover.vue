<template>
  <el-popover
    trigger="click"
    ref="erpPopoverRef"
    placement="bottom-start"
    :offset="10"
    :show-arrow="false"
  >
    <!-- :visible="visible" -->
    <template #default>
      <div class="stock-list" :style="{ width: `${inputWidth}px` }">
        <el-form
          label-position="top"
          :rules="rules"
          ref="formRef"
          :model="search"
          hide-required-asterisk
          :teleported="false"
          style="padding-bottom: 13px"
        >
          <el-form-item label="ERP库存可用量" prop="inputWithSelect">
            <el-input
              class="searchInput"
              v-model="search.skuKey"
              placeholder="供应链SKU"
              clearable
              validate-event="false"
              @change="handleBlur3"
              @blur="handleBlur3"
            >
              <template #prepend>
                <!-- <el-form-item label="" prop="warehouseCode"> -->
                <el-select
                  :teleported="false"
                  v-model="search.warehouseCode"
                  style="width: 100px !important"
                  placeholder="发货仓库"
                  collapse-tags
                  @change="handleSelectChange"
                  :style="{ width: `${selectWidth}px` }"
                >
                  <el-option
                    v-for="warehouse of warehouseMap"
                    :key="warehouse.value"
                    :label="warehouse.desc"
                    :value="warehouse.value"
                  />
                </el-select>
                <!-- </el-form-item> -->
              </template>
              <template #suffix>
                <i class="iconfont icon-sousuo"></i>
              </template>
              <template #append>
                <batchSearchPopover
                  ref="batchSearchRef3"
                  @search="handleBatchSearch3"
                  @clear="handleBatchClear3"
                  :offset="11"
                  :teleported="false"
                />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="footerbtn">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleQueryStock">确定</el-button>
        </div>
      </div>
    </template>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import batchSearchPopover from './BatchSearchPopover.vue';

  const emit = defineEmits<{
    (e: 'click', key: string): void;
    (e: 'stock', key: any): void;
  }>();

  const props = defineProps<{
    name: string; // 按钮名称
    options: any; // 操作列表
    loading?: boolean; // 操作列表
    warehouseMap?: any; // 发货仓库
    queryStockRef?: any; // 发货仓库
  }>();
  const formRef: any = ref({});
  const search: any = ref({
    skuKey: undefined,
    skuKeys: [],
    warehouseCode: undefined,
  });

  const rules = reactive({
    // skuKey: [
    //   {
    //     required: true,
    //     message: '请选择发货仓库和输入供应链SKU',
    //     trigger: ['blur', 'change'],
    //   },
    // ],
    // warehouseCode: [
    //   {
    //     required: true,
    //     message: '请选择发货仓库',
    //     trigger: ['blur', 'change'],
    //   },
    // ],
    inputWithSelect: [
      {
        validator: (rule, value, callback) => {
          if (!search.value.warehouseCode) {
            callback(new Error('请选择发货仓库和输入供应链SKU'));
          } else if (!(search.value.skuKey || search.value.skuKeys.length > 0)) {
            console.log(search.value.skuKey, search.value.skuKeys);
            callback(new Error('请选择发货仓库和输入供应链SKU'));
          } else {
            callback();
          }
        },
        // trigger: 'blur',
        trigger: ['blur', 'change'],
      },
    ],
  });
  const batchSearchRef3 = ref();
  const visible = ref(false);
  const inputWidth = ref<number>(362);
  const selectWidth = ref<number>(100);
  const handleSelectChange = (e) => {
    formRef.value.validateField('inputWithSelect');
    if (e) {
      inputWidth.value = 362;
      nextTick(() => {
        const ele: any = document.querySelector('.stock-list .el-select__placeholder span');
        const width: any = Math.ceil(ele?.getBoundingClientRect()?.width);
        // console.log(width);
        if (width) {
          selectWidth.value = width + 45;
          inputWidth.value = selectWidth.value + 247 + 15;
        }
      });
    } else {
      inputWidth.value = 362;
    }
  };

  const handleBlur3 = (e) => {
    if (e.target?.value) {
      search.value.skuKeys = [];
      batchSearchRef3.value?.clear();
    }
  };

  const erpPopoverRef = ref();
  const handleClose = async () => {
    // console.log(erpPopoverRef.value);
    erpPopoverRef.value?.hide();
    // document.body.click();
  };
  // const queryStockRef = ref();
  const handleQueryStock = async () => {
    // console.log('handleQueryStock', search.value.skuKey, search.value.skuKeys.length);1
    if (!search.value.skuKey && search.value.skuKeys?.length === 0) {
      ElMessage.warning('请输入供应链SKU');
      return;
    }
    if (!search.value.warehouseCode) {
      ElMessage.warning('请选择发货仓');
      formRef.value?.validateField(['warehouseCode']);
      return;
    }
    const isValid = await formRef.value?.validate().catch(() => false);
    console.log('isValid', isValid);
    if (!isValid) return;
    let arr: any;
    if (search.value.skuKey) {
      arr = [search.value.skuKey];
      search.value.skuKeys = [];
    } else {
      arr = search.value.skuKeys;
    }
    const param = { supplySkuList: arr, warehouseCode: search.value.warehouseCode };
    console.log(param);
    visible.value = false;
    props.queryStockRef?.open(param);
  };

  const handleBatchClear3 = (val) => {
    search.value.skuKeys = [];
  };
  const handleBatchSearch3 = (val) => {
    search.value.skuKey = undefined;
    const str = val?.replace(/\n/g, ',');
    const arr = str.split(',').filter((item) => item.length > 0);
    console.log(arr);
    if (arr.length === 0) {
      ElMessage.warning('请输入供应链SKU');
      return;
    }
    search.value.skuKeys = arr;
    handleQueryStock();
  };
  const open = () => {
    visible.value = !visible.value;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.is-error) {
    // 错误全包 select
    .el-select__wrapper {
      box-shadow: 0 0 0 1px #f53f3f inset !important;
    }
    .el-textarea__inner {
      box-shadow: none !important;
    }
  }
  .el-form-item {
    .el-select {
      min-width: 100px !important;
      width: 100%;
    }
  }
  .stock-list {
    padding: 16px 20px;
    padding-bottom: 0;
    width: 560px;
    height: 168px;
    :deep(.el-form-item__label) {
      font-size: 13px !important;
      color: #666666 !important;
    }
    .searchInput {
      width: 100%;
    }
    :deep(.searchInput .el-input__wrapper) {
      position: relative;
      left: -1px;
    }
    :deep(.searchInput .el-input-group__append) {
      position: relative;
      left: -1px;
    }
  }
  .footerbtn {
    padding: 10px 0px;
    border-top: solid 1px #f5f5f5;
    text-align: right;
  }
  // :deep(.el-space) {
  //   padding-right: 20px;
  //   .el-space__item {
  //     width: 4px;
  //     // margin-right: 6px !important;
  //   }
  //   .el-space__item:nth-child(1) {
  //     float: left;
  //   }
  //   .el-button {
  //     width: 44px !important;
  //     display: inherit !important;
  //   }
  //   .el-button:not(.el-button--primary) {
  //     position: relative;
  //     left: -41px;
  //   }
  // }
</style>
