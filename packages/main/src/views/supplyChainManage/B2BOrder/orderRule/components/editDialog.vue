<template>
  <el-dialog width="70%" title="绑定发货仓库" v-model="visible" @close="close">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="150px" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单类型" prop="orderType" required>
            <span>{{ form?.orderTypeDesc }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货方式" prop="deliveryType" required>
            <span>{{ form?.deliveryTypeDesc }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <KeenList @refresh="refreshList">
        <el-row v-if="isEdit">
          <el-col :span="6">
            <el-select
              style="width: 95%"
              v-model="filters.warehouseCode"
              placeholder="仓库"
              collapse-tags
              collapse-tags-tooltip
              max-collapse-tags="20"
              filterable
              clearable
            >
              <el-option
                v-for="item in warehouseList"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              style="width: 95%"
              v-model="filters.spCode"
              clearable
              filterable
              placeholder="承运商"
            >
              <el-option
                v-for="item of supplierList"
                :key="item.supplierCode"
                :label="item.supplierName"
                :value="item.supplierCode"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="filters.smCode"
              style="width: 95%"
              placeholder="配送方式"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="shipping of shippingMap"
                :key="shipping.value"
                :label="shipping.desc"
                :value="shipping.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <div class="d-flex">
          <el-table
            :show-header="false"
            v-if="isEdit"
            ref="tableRef"
            v-loading="listLoading"
            :data="
              listData?.warehouseShipList?.filter(
                (item) =>
                  (filters?.warehouseCode ? item.warehouseCode === filters.warehouseCode : true) &&
                  (filters?.spCode
                    ? item.spInfos?.some((sp) => sp.spCode === filters.spCode)
                    : true) &&
                  (filters?.smCode
                    ? item?.spInfos?.some((sm) =>
                        sm?.shipInfos?.some((sm) => sm.smCode === filters.smCode)
                      )
                    : true)
              )
            "
            row-key="warehouseCode"
          >
            <el-table-column width="40">
              <template #header>
                <el-checkbox
                  v-model="listData.checked"
                  :indeterminate="
                    listData?.warehouseShipList?.filter(
                      (item) =>
                        item.checked &&
                        (filters?.warehouseCode
                          ? item.warehouseCode === filters.warehouseCode
                          : true)
                    )?.length > 0 &&
                    listData?.warehouseShipList?.filter(
                      (item) =>
                        item.checked &&
                        (filters?.warehouseCode
                          ? item.warehouseCode === filters.warehouseCode
                          : true)
                    )?.length < listData?.warehouseShipList?.length
                  "
                  @change="
                    (val) => {
                      handleCheckAllChange(val, listData?.warehouseShipList);
                      listData?.warehouseShipList
                        ?.filter((item) =>
                          filters?.warehouseCode
                            ? item.warehouseCode === filters.warehouseCode
                            : true
                        )
                        ?.forEach((item) => {
                          handleCheckAllChange(val, item?.spInfos);
                          item?.spInfos?.forEach((spInfo) =>
                            handleCheckAllChange(val, spInfo?.shipInfos)
                          );
                        });
                    }
                  "
                />
              </template>
              <template #default="{ row }">
                <el-checkbox
                  v-model="row.checked"
                  :indeterminate="
                    row?.spInfos?.filter(
                      (item) =>
                        item.checked && (filters.spCode ? item.spCode === filters.spCode : true)
                    )?.length > 0 &&
                    row?.spInfos?.filter(
                      (item) =>
                        item.checked && (filters.spCode ? item.spCode === filters.spCode : true)
                    )?.length < row?.spInfos?.length
                  "
                  @change="
                    (val) => {
                      handleItemChange(_, listData?.warehouseShipList, listData, row);
                      row?.spInfos
                        ?.filter((item) =>
                          filters?.spCode ? item.spCode === filters.spCode : true
                        )
                        ?.forEach((item) => handleCheckAllChange(val, item?.shipInfos));
                    }
                  "
                />
              </template>
            </el-table-column>
            <el-table-column type="expand">
              <template #default="props">
                <div style="padding-left: 45px">
                  <el-table
                    :show-header="false"
                    :data="
                      props?.row?.spInfos?.filter((item) =>
                        filters?.spCode ? item.spCode === filters.spCode : true
                      )
                    "
                    row-key="spCode"
                  >
                    <!--                  <el-table-column type="selection" width="40" reserve-selection />-->
                    <el-table-column width="40">
                      <!--                    <template #header>
                <el-checkbox
                  v-model="props.row.checked"
                  :indeterminate="
                    props?.row?.spInfos?.filter((item) => item.checked)?.length > 0 &&
                    props?.row?.spInfos?.filter((item) => item.checked)?.length <
                      props?.row?.spInfos?.length
                  "
                  @change="(val) => handleCheckAllChange(val, props?.row?.spInfos)"
                />
              </template>-->
                      <template #default="{ row }">
                        <el-checkbox
                          v-model="row.checked"
                          :indeterminate="
                            row?.shipInfos?.filter(
                              (item) =>
                                item.checked &&
                                (filters.smCode ? item.smCode === filters.smCode : true)
                            )?.length > 0 &&
                            row?.shipInfos?.filter(
                              (item) =>
                                item.checked &&
                                (filters.smCode ? item.smCode === filters.smCode : true)
                            )?.length < row?.shipInfos?.length
                          "
                          @change="
                            (val) => {
                              handleItemChange(_, props?.row?.spInfos, props.row, row);
                              handleCheckAllChange(val, row?.shipInfos);
                            }
                          "
                        />
                      </template>
                    </el-table-column>
                    <el-table-column type="expand">
                      <template #default="props">
                        <div style="padding-left: 45px">
                          <el-table
                            :show-header="false"
                            :data="
                              props?.row?.shipInfos?.filter((item) =>
                                filters?.smCode ? item.smCode === filters.smCode : true
                              )
                            "
                            row-key="smCode"
                          >
                            <!--                          <el-table-column type="selection" width="40" reserve-selection />-->
                            <el-table-column width="40">
                              <!--                            <template #header>
                        <el-checkbox
                          v-model="props.row.checked"
                          :indeterminate="
                            props?.row?.shipInfos?.filter((item) => item.checked)?.length >
                              0 &&
                            props?.row?.shipInfos?.filter((item) => item.checked)?.length <
                              props?.row?.shipInfos?.length
                          "
                          @change="(val) => handleCheckAllChange(val, props?.row?.shipInfos)"
                        />
                      </template>-->
                              <template #default="{ row }">
                                <el-checkbox
                                  v-model="row.checked"
                                  @change="
                                    (_) =>
                                      handleItemChange(_, props?.row?.shipInfos, props.row, row)
                                  "
                                />
                              </template>
                            </el-table-column>
                            <el-table-column label="配送方式代码" prop="smCode" min-width="160" />
                            <el-table-column label="配送方式名称" prop="smNameCn" min-width="160" />
                          </el-table>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="承运商" prop="spName" />
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="warehouseName" label="仓库名称" />
          </el-table>
          <div v-else class="result" :class="{ 'mt-7': isEdit }" v-loading="listLoading">
            <div
              v-show="!listLoading"
              v-for="warehouse in listData?.warehouseShipList?.filter(
                (item) =>
                  item.checked ||
                  item.spInfos?.some(
                    (sp) => sp.checked || sp.shipInfos?.some((ship) => ship.checked)
                  )
              )"
              :key="warehouse?.warehouseCode"
            >
              <div
                class="cursor-pointer d-flex gap-1 align-items-center"
                @click="warehouse.hideFlag = !warehouse?.hideFlag"
              >
                <el-icon :class="warehouse.hideFlag ? 'expanded' : 'expand'">
                  <ArrowRight />
                </el-icon>
                {{ warehouse?.warehouseName }}
              </div>
              <div
                v-show="!warehouse?.hideFlag"
                class="ps-5"
                v-for="sp in warehouse?.spInfos?.filter(
                  (item) => item.checked || item?.shipInfos?.some((ship) => ship?.checked)
                )"
                :key="sp?.spCode"
              >
                <div
                  class="cursor-pointer d-flex gap-1 align-items-center"
                  @click="sp.hideFlag = !sp?.hideFlag"
                >
                  <el-icon :class="sp.hideFlag ? 'expanded' : 'expand'"><ArrowRight /></el-icon>
                  {{ sp?.spName }}
                </div>
                <div
                  v-show="!sp?.hideFlag"
                  class="ps-10"
                  v-for="ship in sp?.shipInfos?.filter((item) => item.checked)"
                  :key="ship?.smCode"
                >
                  {{ ship?.smNameCn }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
      </KeenList>
    </el-form>
    <template #footer v-if="isEdit">
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { dataApi, ErpApi, erpApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import * as swal from '@/utils/swal';
  import useList from '@/hooks/list/useList';
  import { ArrowRight } from '@element-plus/icons-vue';

  const emit = defineEmits(['success']);

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    orderType: '',
    orderTypeDesc: '',
    deliveryType: '',
    deliveryTypeDesc: '',
    countryList: [],
  });
  const rules = reactive({
    // 表单验证规则
    warehouseList: [{ required: true, message: '请选择仓库', trigger: 'change' }],
  });

  const PAGE_SIZE = 10;
  const tableRef = ref();
  const filters = ref({
    warehouseCode: '',
    smCode: '',
    spCode: '',
  });
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
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpOrderShipmentQueryWarehouseShipList.RequestBody,
    ErpApi.LuteosErpOrderShipmentQueryWarehouseShipList.ResponseBody
  >({
    searchDefaults: {
      deliveryType: 1,
      orderType: 1,
      smCode: undefined,
      spCode: undefined,
      warehouseCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpOrderShipmentQueryWarehouseShipList,
    onSuccess: (res) => {
      listData.value.ckecked = null;
    },
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    const isConfirmed = await swal.confirm('确认修改当前绑定的发货仓库？');
    if (!isConfirmed) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpOrderBindingOrderWarehouseAndShipReq({
        deliveryType: form.value.deliveryType,
        orderType: form.value.orderType,
        warehouseShipList: listData.value.warehouseShipList,
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const warehouseList = ref([]);
  const supplierList: any = ref([]);
  const getSupplierList = async () => {
    const res = await dataApi.luteosDataQueryShippingSupplierList();
    supplierList.value = res.shippingSupplierList;
  };

  // 配送方式
  const shippingMap = ref([]);
  const queryAllShipping = async () => {
    const res = await erpApi.luteosErpOrderShipmentOptionalQueryList();
    shippingMap.value = res || [];
  };

  const isEdit = ref(false);
  const open = (row, warehouseEnumList, flag) => {
    filters.value = {
      warehouseCode: '',
      smCode: '',
      spCode: '',
    };
    getSupplierList();
    queryAllShipping();
    search.deliveryType = row.deliveryType;
    search.orderType = row.orderType;
    runQuery();
    warehouseList.value = warehouseEnumList;
    form.value = { ...row };
    form.value.warehouseList = row.warehouseList?.map((item) => item.value);
    isEdit.value = flag;
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  // 切换全选状态
  const handleCheckAllChange = (val, list) => {
    list?.forEach((item) => {
      item.checked = val;
    });
  };

  const handleItemChange = (_, list, row, cur) => {
    console.log('cur', cur);
    row.checked = list?.every((item) => item.checked);
    if (cur?.shipInfos) handleCheckAllChange(cur.checked, cur.shipInfos);
    if (cur?.spInfos) handleCheckAllChange(cur.checked, cur.spInfos);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .result {
    width: 30%;
    min-width: 250px;
    color: #7e8299;
    .expand {
      transform: rotate(90deg);
      transition: transform var(--el-transition-duration-fast) ease-in-out;
    }
    .expanded {
      transform: rotate(0deg);
      transition: transform var(--el-transition-duration-fast) ease-in-out;
    }
  }
</style>
