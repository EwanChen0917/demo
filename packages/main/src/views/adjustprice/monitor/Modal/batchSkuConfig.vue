<template>
  <el-dialog title="批量配置" :model-value="visible" @close="handleClose" width="70%">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
      :rules="rules"
    >
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
        <el-form-item label="状态：" prop="monitorStatus">
          <el-radio-group v-model="form.monitorStatus">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </KeenCard>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { priceApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      rpaCodeList: Array<string>;
    }>(),
    {
      visible: false,
    }
  );

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

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      const params = {
        monitorList: form.value.sellerMonitorList,
        monitorStatus: form.value.monitorStatus,
        rpaCodeList: props.rpaCodeList,
      };
      await priceApi
        .luteosPriceSaveMonitorRole({
          ...params,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      emit('close', true);
    }
  };
  const emit = defineEmits<{
    (event: 'close', r?: boolean): void;
  }>();

  const handleClose = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .title {
    height: 44px;
    line-height: 44px;
  }
  .operate {
    margin: 0 30px;
  }
  .price-type {
    width: 400px !important;
  }
  .operation {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 1px 0 0 0 var(--el-input-border-color) inset,
      0 1px 0 0 var(--el-input-border-color) inset, 0 -1px 0 0 var(--el-input-border-color) inset;
    background: #f5f7fa;
    width: 68px;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }
  .suggest-item {
    margin-left: -32px;
  }
  .monitor-table {
    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
    .monitor-table-suggest {
      :deep(.el-form-item__content) {
        margin-left: 120px !important;
      }
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
