<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
      :rules="rules"
    >
      <el-form-item label="产品类型：" prop="">
        <span>SKU</span>
      </el-form-item>
      <el-form-item label="SKU：" prop="onLineProductList">
        <el-button type="primary" @click="bindGoodsVisible = true" size="small" :disabled="isEdit">
          选择商品
        </el-button>
      </el-form-item>
      <KeenCard title="已选择商品" class="my-card">
        <el-table ref="tableRef" :data="form.onLineProductList">
          <el-table-column label="SKU" min-width="150">
            <template #default="{ row }">
              <div>
                {{ row?.skuCode }}
                <Copy :content="row.skuCode" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="productTitle" min-width="180" />
          <el-table-column label="品线" prop="productLineName" />
          <el-table-column label="状态" prop="stateDesc" />
          <el-table-column label="MSRP" prop="msrp" min-width="120">
            <template #header>
              <div class="d-flex align-items-center gap-1">
                <span>MSRP</span>
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="`仅供参考，取自US的MSRP`"
                >
                  <QuestionFilled class="question-icon" />
                </el-tooltip>
              </div>
            </template>
            <template #default="{ row }">
              <div>{{ row.msrp }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="80" v-if="!isEdit">
            <template #default="{ row, $index }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    row: row,
                    index: $index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </KeenCard>
      <KeenCard title="监控设置" class="my-card">
        <el-form-item label="参考价" prop="monitorList" :rules="rules.monitorList">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            content="参考价：调价、促销计划、MSRP；监控参考的价格，作为基准"
          >
            <QuestionFilled
              class="question-icon"
              style="margin-top: -1px; margin-left: -60px; margin-right: 40px"
            />
          </el-tooltip>
          <el-select
            v-model="form.monitorList"
            filterable
            placeholder="参考价"
            class="price-type"
            @change="handleMonitorChange"
            clearable
            multiple
          >
            <el-option label="全选" value="all" />
            <el-option
              v-for="monitor in monitorList"
              :key="monitor.priceType"
              :label="monitor.priceTypeDesc"
              :value="monitor.priceType"
            />
          </el-select>
        </el-form-item>
        <div class="d-flex">
          <div class="config-txt">
            配置
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
            >
              <template #content>
                <div>折扣率预警值%：1 - 百分比</div>
                <div>实际折扣率%：（参考价 - 当前页面售价） / 参考价</div>
                <div>浮动范围：当 实际折扣率 - 预警值 > 浮动范围时 ，则触发 通知</div>
              </template>
              <QuestionFilled class="question-icon" style="margin-top: -1px; margin-left: 5px" />
            </el-tooltip>
          </div>
          <el-table
            ref="tableRef"
            :data="form?.sellerMonitorList"
            row-key="priceTypeDesc"
            class="monitor-table"
          >
            <el-table-column label="参考价" prop="priceTypeDesc" min-width="100" />
            <el-table-column label="预警" prop="rate" min-width="300">
              <template #default="{ $index }">
                <el-form-item
                  label=""
                  :prop="`sellerMonitorList[${$index}].rate`"
                  :rules="rules.rate"
                >
                  <el-input
                    placeholder="请输入数字"
                    v-model="form.sellerMonitorList[$index].rate"
                    style="width: 300px"
                  >
                    <template #prepend>小于</template>
                    <template #append>
                      <span>预警值</span>
                      <span>
                        {{
                          form.sellerMonitorList[$index].rate &&
                          form.sellerMonitorList[$index].rate <= 100
                            ? parseFloat(100 - form.sellerMonitorList[$index].rate).toFixed(2) + '%'
                            : 'x%'
                        }}
                      </span>
                    </template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="通知设置" prop="floatingRate" min-width="450">
              <template #default="{ $index }">
                <el-form-item
                  label=""
                  :prop="`sellerMonitorList[${$index}].floatingRate`"
                  :rules="rules.floatingRate"
                >
                  <el-input
                    placeholder="请输入数字"
                    v-model="form.sellerMonitorList[$index].floatingRate"
                    style="width: 450px"
                  >
                    <template #prepend>与预警值的差额 大于</template>
                    <template #append>% 时触发预警通知</template>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="140">
              <template #default="{ row, $index }">
                <KeenActions
                  display-style="buttons"
                  :actions="[
                    {
                      label: '删除',
                      key: 'del',
                      type: 'danger',
                      row: row,
                      index: $index,
                    },
                  ]"
                  @click="handleConfigActions"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form-item label="状态" prop="monitorStatus" style="margin-left: 12px">
          <el-radio-group v-model="form.monitorStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </KeenCard>
      <div class="btn-wrap">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </div>
    </el-form>
  </div>
  <BindSku
    :visible="bindGoodsVisible"
    v-if="bindGoodsVisible"
    confirm-text="确定"
    @close="handleSkuGoodsClose"
    :selected-rows="form.onLineProductList"
  />
</template>

<script setup lang="ts" name="adjustpriceMonitorSkuConfig">
  import { ElMessage } from 'element-plus';
  import { priceApi } from '@/api/index';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';

  const route = useRoute();
  const code = route.query.code || '';
  const isEdit = ref(!!code);

  // 表单定义
  const form = ref({
    onLineProductList: [],
    sellerMonitorList: [],
    monitorStatus: 0,
    monitorList: [],
    rpaCode: undefined,
  });

  const rules = ref({
    onLineProductList: [{ required: true, message: '请选择商品', trigger: ['blur', 'change'] }],
    monitorList: [{ required: true, message: '请选择参考价', trigger: ['blur'] }],
    rate: [
      { required: true, message: '请输入数字', trigger: ['blur', 'change'] },
      {
        pattern: /^([0-9]\d?(\.\d{1,2})?|0\.[1-9]\d?|0\.0[1-9]|100(\.0{1,2})?)$/,
        message: '请输入0-100的数字，支持小数',
        trigger: ['blur', 'change'],
      },
    ],
    floatingRate: [
      { required: true, message: '请输入数字', trigger: ['blur', 'change'] },
      {
        pattern: /^([0-9]\d?(\.\d{1,2})?|0\.[1-9]\d?|0\.0[1-9]|100(\.0{1,2})?)$/,
        message: '请输入0-100的数字，支持小数',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 选择产品
  const bindGoodsVisible = ref<boolean>(false);
  const handleSkuGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.onLineProductList = val;
    }
    formRef.value.validateField('onLineProductList');
    bindGoodsVisible.value = false;
  };
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      form.value.onLineProductList.splice(index, 1);
    }
  };

  const handleConfigActions = async (item) => {
    const { key, index, row } = item;
    if (key === 'del') {
      form.value.sellerMonitorList.splice(index, 1);
      const findIndex = form.value.monitorList.findIndex((value) => row.priceType === value);
      form.value.monitorList.splice(findIndex, 1);
    }
  };
  const monitorList = ref([
    {
      priceTypeDesc: '调价活动',
      monitorType: 'error',
      priceType: 'adjust',
      sort: 1,
    },
    {
      priceTypeDesc: '促销计划',
      monitorType: 'error',
      priceType: 'discount',
      sort: 2,
    },
    {
      priceTypeDesc: '渠道售价（MSRP）',
      monitorType: 'error',
      priceType: 'msrp',
      sort: 3,
    },
  ]);
  const handleMonitorChange = () => {
    // 全选逻辑
    if (form.value.monitorList.includes('all')) {
      form.value.monitorList = monitorList.value.map((item) => item.priceType);
    }

    monitorList.value.forEach((item: any) => {
      if (form.value.monitorList.includes(item.priceType)) {
        const findData: any =
          form.value.sellerMonitorList.find((seller: any) => seller.priceType === item.priceType) ||
          {};
        //   没有数据的加对应的空数据
        if (!findData?.priceType) {
          form.value.sellerMonitorList.push({
            priceType: item.priceType,
            rate: '',
            floatingRate: '',
            roleCode: '',
            monitorType: 'error',
            sort: item.sort,
            priceTypeDesc: item.priceTypeDesc,
          });
        }
      } else {
        // 删除已有的数据
        const index: any = form.value.sellerMonitorList.findIndex(
          (seller: any) => seller.priceType === item.priceType
        );
        if (index > -1) {
          form.value.sellerMonitorList.splice(index, 1);
        }
      }
    });
    // 排序展示
    form.value.sellerMonitorList = [...form.value.sellerMonitorList].sort(
      (a: any, b: any) => a.sort - b.sort
    );
  };

  const router = useRouter();
  const handleCancel = () => {
    router.go(-1);
  };

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = () => {
    if (isEdit.value) {
      editFn();
    } else {
      addFn();
    }
  };
  const addFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      const params = {
        ...form.value,
        onLineProductList: form.value.onLineProductList.map((item) => {
          return {
            skuCode: item.skuCode,
          };
        }),
      };
      delete params.monitorList;
      await priceApi
        .luteosPriceSaveSellerSku({
          ...params,
          productType: 2,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      setTimeout(() => {
        handleCancel();
      }, 1000);
    }
  };
  const editFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      const params = {
        monitorList: form.value.sellerMonitorList,
        monitorStatus: form.value.monitorStatus,
        rpaCodeList: [code],
      };
      await priceApi
        .luteosPriceSaveMonitorRole({
          ...params,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      setTimeout(() => {
        handleCancel();
      }, 1000);
    }
  };
  const queryDetail = async () => {
    if (code) {
      const res: any = await priceApi.luteosPriceQuerySkuMonitorDetail({
        rpaCode: code,
      });
      form.value.sellerMonitorList = res.monitorList || [];
      form.value.monitorList = res.monitorList.map((item) => item.priceType);
      form.value.onLineProductList = [
        {
          productLineName: res.productLineName,
          stateDesc: res.productStatusDesc,
          productTitle: res.skuName,
          skuCode: res.skuCode,
          msrp: res.msrp,
        },
      ];
      form.value.monitorStatus = res.status;
      form.value.rpaCode = res.rpaCode;
    }
  };
  queryDetail();
</script>

<style lang="scss" scoped>
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .title {
    height: 44px;
    line-height: 44px;
  }
  .operation {
    margin-left: 30px;
  }
  .price-type {
    width: 400px !important;
  }
  .rate-input {
    width: 200px;
  }
  .my-card {
    :deep(.card-header) {
      padding-left: 0;
    }
  }
  .btn-wrap {
    width: 100%;
    text-align: center;
  }
  .product-title {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line {
    border: 1px dashed #eee;
    margin: 10px 0;
    opacity: 0.5;
  }
  .monitor-table {
    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
  }
  .config-txt {
    width: 120px;
    color: #3f4254;
    font-size: 1.075rem;
    margin-left: 22px;
  }
  .question-icon {
    width: 15px;
    height: 15px;
  }
</style>
