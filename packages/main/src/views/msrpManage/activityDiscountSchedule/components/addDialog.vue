<template>
  <el-dialog
    width="1300px"
    :title="title"
    :close-on-click-modal="false"
    v-model="visible"
    @close="visible = false"
  >
    <el-form
      v-if="tick"
      :key="tick"
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
      scroll-to-error
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="国家" prop="countryCode">
            <CountrySelect
              v-model="form.countryCode"
              placeholder="国家"
              @change="handlerCountryChange"
              :disabled="disabledValue"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道" prop="channel">
            <ProductChannelSelect
              v-model="form.channel"
              placeholder="渠道"
              teleported
              @change="handlerChannelChange"
              :disabled="disabledValue"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="SPU" prop="spuCode">
            <div class="text-break me-2">{{ form?.spuCode }}</div>
            <el-button
              type="primary"
              :disabled="disabledValue"
              @click="select"
              v-if="!disabledEdit"
            >
              选择
            </el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="SKU" prop="skuCodeList">
            <el-select
              placeholder="请选择"
              v-model="form.skuCodeList"
              multiple
              clearable
              filterable
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="1"
              @change="handleSkuChange"
              :disabled="disabledValue"
              allowAll
            >
              <template #empty>
                <div class="text-center">{{ form?.spuCode ? '暂无SKU' : '请先选择SPU' }}</div>
              </template>
              <!-- <el-option label="所有SKU" value="all" v-if="skuList.length > 0" /> -->
              <el-option
                v-for="item in skuList"
                :key="item.code"
                :label="`${item.code}  ${item.name}`"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="促销名称" prop="activityName">
            <el-input
              v-model.trim="form.activityName"
              :disabled="disabledEdit"
              show-word-limit
              maxlength="15"
              placeholder="请输入促销名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="促销等级" prop="promotionLevel">
            <el-select
              v-model="form.promotionLevel"
              :disabled="disabledEdit"
              clearable
              placeholder="请选择促销等级"
            >
              <el-option
                v-for="item in levelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动时间" prop="queryDate">
            <el-date-picker
              v-model="form.queryDate"
              type="daterange"
              range-separator="-"
              start-placeholder="活动开始日期"
              end-placeholder="活动结束日期"
              value-format="YYYY-MM-DD"
              class="w-300px"
              :disabled-date="disabledDate"
              :disabled="disabledEdit"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动类型" prop="activityType">
            <el-select
              v-model="form.activityType"
              clearable
              filterable
              placeholder="请选择活动类型"
              :disabled="disabledEdit"
            >
              <el-option
                v-for="item in discountTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        style="margin-bottom: 30px"
        ref="tableRef"
        :data="form.saleInfoList"
        row-key="code"
        default-expand-all
        v-loading="loading"
        max-height="400px"
        border
        :tree-props="{
          children: 'skuItems',
        }"
      >
        <el-table-column label="产品信息" min-width="180" fixed>
          <template #default="{ row }">
            <div v-if="row?.productType === 1">
              <div>{{ row?.spuCode }}</div>
              <div>{{ row?.spuName }}</div>
            </div>
            <div v-else>
              <div>{{ row?.skuCode }}</div>
              <div>{{ row?.skuName }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="国家" prop="countryCode" width="80" />
        <el-table-column label="币种" width="120">
          <template #default="{ row }">
            <div v-if="row?.currency">{{ row?.currency }}【{{ row?.currencyDesc }}】</div>
          </template>
        </el-table-column>
        <el-table-column label="MSRP全渠道" width="100">
          <template #default="{ row }">
            <div>
              <div>{{ row?.msrp }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动价" width="120">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                row?.productType === 1
                  ? 'saleInfoList[0].activityPrice'
                  : `saleInfoList[0].skuItems[${$index - 1}].activityPrice`
              "
              :rules="getactivityPriceRule(row)"
            >
              <el-input
                size="small"
                placeholder="活动价"
                v-model.trim="row.activityPrice"
                :disabled="disabledEdit"
                @change="
                  (val) => {
                    handleParentChange(val, row, 'activityPrice');
                  }
                "
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="折扣率" width="120">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                row?.productType === 1
                  ? 'saleInfoList[0].discountRate'
                  : `saleInfoList[0].skuItems[${$index - 1}].discountRate`
              "
              :rules="getRateRule(row, 'discountRate')"
            >
              <el-input
                size="small"
                placeholder="折扣率"
                v-model.trim="row.discountRate"
                :disabled="disabledEdit"
                @change="
                  (val) => {
                    handleParentChange(val, row, 'discountRate');
                  }
                "
              >
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="目标销量" width="120">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                row?.productType === 1
                  ? 'saleInfoList[0].targetSales'
                  : `saleInfoList[0].skuItems[${$index - 1}].targetSales`
              "
              :rules="getTargetSalesRule(row)"
            >
              <el-input
                size="small"
                placeholder="目标销量"
                :disabled="disabledEdit"
                @change="
                  (val) => {
                    handleParentChange(val, row, 'targetSales');
                  }
                "
                v-model.trim="row.targetSales"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="原毛利率" width="120">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                row?.productType === 1
                  ? 'saleInfoList[0].originalProfitRate'
                  : `saleInfoList[0].skuItems[${$index - 1}].originalProfitRate`
              "
              :rules="getRateRule(row, 'originalProfitRate')"
            >
              <el-input
                size="small"
                placeholder="原毛利率"
                :disabled="disabledEdit"
                @change="
                  (val) => {
                    handleParentChange(val, row, 'originalProfitRate');
                  }
                "
                v-model.trim="row.originalProfitRate"
              >
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="活动毛利率" width="140">
          <template #default="{ row, $index }">
            <el-form-item
              label-width="0"
              :prop="
                row?.productType === 1
                  ? 'saleInfoList[0].activityProfitRate'
                  : `saleInfoList[0].skuItems[${$index - 1}].activityProfitRate`
              "
              :rules="getRateRule(row, 'activityProfitRate')"
            >
              <el-input
                size="small"
                placeholder="活动毛利率"
                :disabled="disabledEdit"
                @change="
                  (val) => {
                    handleParentChange(val, row, 'activityProfitRate');
                  }
                "
                v-model.trim="row.activityProfitRate"
              >
                <template #append>%</template>
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80" v-if="!disabledEdit">
          <template #default="{ $index }">
            <KeenActions
              :actions="[
                {
                  label: '删除',
                  key: 'delete',
                  index: $index,
                  underline: false,
                  type: 'danger',
                  hide: $index === 0,
                  disabled: form.saleInfoList[0]?.skuItems?.length === 1,
                },
              ]"
              @click="handleDelete"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false" v-if="disabledEdit">关闭</el-button>
        <el-button @click="visible = false" v-if="!disabledEdit">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading" v-if="!disabledEdit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <BindGoods
    ref="selectSpuDialogRef"
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-row="{ productSpu: form.spuCode }"
    :selected-key="form.spuCode"
    :country-code="form.countryCode"
    select-one
    confirmText="确认"
  />
</template>

<script setup lang="ts">
  import { memberApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import BindGoods from './bindGoods.vue';
  import { integerRule, priceRule } from '@/utils/rulesRegExp';
  import { DiscountTypeMap, DiscountType } from '@/views/msrpManage/activityDiscountSchedule/enum';
  import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';

  import {
    setValue,
    currencyOptions,
    rangeToValues,
    valuesToRange,
    buildWeekMonth,
    handleEmptyStringValue,
  } from '../util';
  import {
    getTargetSalesRule,
    getDiscountRateRule,
    getactivityPriceRule,
    getRateRule,
    getprofitRateRule,
    canEdit,
    scrollToToday,
  } from '../activity';
  import { discountTypeOptions } from '../enum';
  import * as swal from '@/utils/swal';

  const emit = defineEmits(['success']);
  const disabledDate = (time: Date) => {
    const today = dayjs().startOf('day').valueOf();
    // 禁用今天之前的日期
    if (time.getTime() < today) return true;

    // 如果已选开始日期，禁用开始日期+30天之后的日期
    // if (form.value.queryDate[0]) {
    //   const maxDate = dayjs(form.value.queryDate[0]).add(30, 'day').endOf('day').valueOf();
    //   if (time.getTime() > maxDate) return true;
    // }

    return false;
  };
  const visible = ref(false);
  const disabledValue = ref(false);
  const disabledEdit = ref(false);
  const levelList = ref([
    { name: '大促', code: 1 },
    { name: '小促', code: 2 },
    { name: '平促', code: 3 },
  ]);

  const formRef = ref();
  const form = ref({
    activityName: '',
    activityType: 0,
    channel: '',
    countryCode: '',
    endDate: '',
    promotionLevel: 0,
    skuItems: [
      {
        activityPrice: 0,
        activityProfitRate: 0,
        currency: '',
        discountRate: 0,
        msrp: 0,
        originalProfitRate: 0,
        skuCode: '',
        targetSales: 0,
      },
    ],
    spuCode: '',
    startDate: '',
    queryDate: ['', ''],
  });
  const rules = {
    queryDate: [
      {
        required: true,
        message: '请选择活动时间',
        trigger: 'change',
      },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (form.value.queryDate[0] == '') {
            callback(new Error('请选择活动时间'));
          }
          const maxDate = dayjs(form.value.queryDate[0]).add(30, 'day').endOf('day').valueOf();
          if (
            dayjs(form.value.queryDate[0]).add(30, 'day').isBefore(dayjs(form.value.queryDate[1]))
          ) {
            ElMessage.warning('活动时间跨度不能超过31天');
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
    spuCode: [
      {
        required: true,
        message: '请选择商品',
        trigger: 'change',
      },
    ],
    skuCodeList: [
      {
        required: true,
        message: '请选择SKU',
        trigger: 'change',
      },
    ],
    countryCode: [
      {
        required: true,
        message: '请选择国家',
        trigger: 'change',
      },
    ],
    channel: [
      {
        required: true,
        message: '请选择渠道',
        trigger: 'change',
      },
    ],
    activityName: [
      {
        required: true,
        message: '请输入促销名称',
        trigger: 'blur',
      },
    ],
    promotionLevel: [
      {
        required: true,
        message: '请选择促销等级',
        trigger: 'change',
      },
    ],
    activityType: [
      {
        required: true,
        message: '请选择活动类型',
        trigger: 'change',
      },
    ],
  };

  const allOperatorList = ref([]);
  const currentOperatorList = ref([]);

  const getOperatorList = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({
        operatorDepartmentCode: 'all_dept',
        deptId: 65717209,
        searchChildDept: true,
      })
      .then((res) => {
        allOperatorList.value = res.memberList;
      })
      .finally(() => {
        queryGtm();
      });
  };
  const loading = ref(false);

  const queryDetail = async (planCode) => {
    try {
      loading.value = true;
      const spuItem = await productApi
        .luteosProductPromotionPlanDetail({
          planCode: planCode,
        })
        .catch(() => {
          form.value.saleInfoList = [];
          loading.value = false;
        });

      form.value = {
        ...spuItem,
        skuItems: form.value.skuItems?.length ? form.value.skuItems : spuItem.skuItems, // 优先使用用户已输入的
        queryDate: [spuItem.startDate, spuItem.endDate],
        skuCodeList: [spuItem.skuCode],
        saleInfoList: [
          {
            spuCode: spuItem.spuCode,
            spuName: spuItem.spuName,
            countryCode: spuItem.countryCode,
            activityPrice: null,
            activityProfitRate: null,
            discountRate: null,
            originalProfitRate: null,
            targetSales: null,
            productType: 1,
            skuItems: [
              {
                activityPrice: spuItem.activityPrice,
                activityProfitRate: spuItem.activityProfitRate,
                currency: spuItem.currency,
                currencyDesc: spuItem.currencyDesc,
                countryCode: spuItem.countryCode,
                discountRate: spuItem.discountRate,
                msrp: spuItem.msrp,
                originalProfitRate: spuItem.originalProfitRate,
                skuCode: spuItem.skuCode,
                targetSales: spuItem.targetSales,
              },
            ],
          },
        ],
      };

      // setTimeout(() => {
      //   scrollToToday(tableRef.value, 400);
      // }, 2500);
    } finally {
      loading.value = false;
    }
  };
  // 选择商品
  const selectSpuDialogRef = ref();
  const bindGoodsVisible = ref(false);
  const select = async () => {
    bindGoodsVisible.value = true;
    await nextTick();
    selectSpuDialogRef.value?.open();
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.spuCode = val?.productSpu;
      form.value.spuName = val?.name;
      formRef.value?.validateField('spuCode');
      form.value.skuCodeList = [];
      form.value.saleInfoList = [];
      skuList.value = [];
      querySkuList();
    }
    bindGoodsVisible.value = false;
    queryGtm();
  };

  const skuList = ref([]);
  const querySkuList = async () => {
    if (!form.value.spuCode || !form.value.countryCode) return;
    const res = await productApi.luteosProductPromotionPlanQuerySkuList({
      spuCode: form.value.spuCode,
      countryCode: form.value.countryCode,
    });
    if (res?.msrpSkuPlanBeanList) {
      skuList.value = res?.msrpSkuPlanBeanList?.map((item) => {
        return {
          ...item,
          name: item.skuName,
          code: item.skuCode,
          productType: 2,
          countryCode: form.value.countryCode,
        };
      });
    }
    form.value.skuCodeList = [];
  };
  const handleSkuChange = (val) => {
    if (skuList.value.length == 0) return;
    if (val.includes('all')) {
      form.value.skuCodeList = skuList.value.map((res) => res.code);
    }
    const skuItems = skuList.value.filter((res) => {
      return form.value.skuCodeList.includes(res.code);
    });
    form.value.saleInfoList = [
      {
        spuCode: form.value.spuCode,
        spuName: form.value.spuName,
        countryCode: form.value.countryCode,
        activityPrice: null,
        activityProfitRate: null,
        discountRate: null,
        originalProfitRate: null,
        targetSales: null,
        productType: 1,
        skuItems: skuItems,
      },
    ];
  };
  const handleParentChange = (val, row, field) => {
    // 需要联动的项
    if (row?.productType === 1) {
      const subValue = parseFloat(val);
      if (!isNaN(subValue)) {
        row?.skuItems?.forEach((item) => {
          // 统一修改下面的sku折扣信息
          if (field === 'activityPrice') {
            item.activityPrice = subValue;
            item.discountRate = setValue(val, item, field, item.msrp) || '';
          }
          if (field === 'discountRate') {
            item.discountRate = subValue;
            item.activityPrice = setValue(val, item, field, item.msrp) || '';
          }
          if (field === 'activityProfitRate') {
            item.activityProfitRate = subValue;
          }
          if (field === 'originalProfitRate') {
            item.originalProfitRate = subValue;
          }
          if (field === 'targetSales') {
            item.targetSales = subValue;
          }
        });
      }
    } else {
      form.value.saleInfoList[0][field] = null;
      const subValue = parseFloat(val);
      if (!isNaN(subValue)) {
        // 活动价 = MSRP*（1-折扣率）
        if (field === 'activityPrice') {
          row.discountRate = setValue(val, row, field, row.msrp) || '';
        }
        if (field === 'discountRate') {
          row.activityPrice = setValue(val, row, field, row.msrp) || '';
        }
      }
    }
  };

  const queryGtm = () => {
    const { countryCode, channel, spuCode } = form.value || {};
    if (!countryCode || !channel || !spuCode) {
      return;
    }
    productApi
      .luteosProductMsrpQueryOperatorBySpuAndCountryAndChannel({
        channel,
        countryCode,
        spuCode,
      })
      .then((res) => {
        // if (res?.gtm) {
        //   form.value.gtm = res.gtm;
        // }
        const operatorList = res?.memberList || [];
        if (operatorList?.length >= 2) {
          currentOperatorList.value = operatorList;
        } else {
          // 如果当前的运营数量为0或1，则显示全部
          currentOperatorList.value = allOperatorList.value;
        }
        // 当前只有一个运营，则自动选择。如果有多个或者没有，则清空
        if (operatorList?.length === 1) {
          form.value.operator = operatorList?.[0]?.memberCode;
        } else {
          form.value.operator = '';
        }
      });
  };

  const correlationToParent = (spuItem, weekIdx, field) => {
    const values = spuItem.activeDiscountSkuBeanList
      .map((skuItem) => {
        return skuItem.skuItems[weekIdx][field];
      })
      .filter((x) => x !== null && x !== '' && x !== undefined && Number.isFinite(+x))
      .map((x) => +x);
    if (values.length) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      spuItem.skuItems[weekIdx][field] = min === max ? min : `${min}-${max}`;
    } else {
      spuItem.skuItems[weekIdx][field] = '';
    }
  };

  const correlation = (val, skuItem, field, skuSalePrice) => {
    if (!+skuSalePrice) {
      return;
    }
    let haveChange = false;
    if (field == 'activityPrice') {
      skuItem.discountRate = setValue(val, skuItem, field, skuSalePrice) || '';
      haveChange = true;
    }
    if (field == 'discountRate') {
      skuItem.activityPrice = setValue(val, skuItem, field, skuSalePrice) || '';
      haveChange = true;
    }
    return haveChange;
  };
  // 删除
  const handleDelete = (item) => {
    const { key, index } = item;
    if (key === 'delete') {
      form.value.saleInfoList[0].skuItems.splice(index - 1, 1);
      form.value.skuCodeList = form.value.saleInfoList[0].skuItems.map((res) => res.code);
    }
  };
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch((err) => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    if (!form.value?.saleInfoList[0]?.skuItems?.length) {
      ElMessage.warning('暂无可提交数据');
      return;
    }
    const params = {
      ...omit(form.value, ['queryDate', 'saleInfoList', 'skuCodeList']),
      startDate: form.value.queryDate[0],
      endDate: form.value.queryDate[1],
      skuItems: form.value.saleInfoList[0].skuItems,
    };
    console.log(params);
    // handleEmptyStringValue([params]);

    saveLoading.value = true;
    // 活动开始月份 =  T月，T+1月
    // sku+国家 维度，在当前活动时间范围内是否有其他审核通过的活动
    const monthValue = form.value.queryDate[0].slice(0, 7);
    const monthT = dayjs(new Date()).add(0, 'month').format('YYYY-MM');
    const monthT2 = dayjs(new Date()).add(1, 'month').format('YYYY-MM');
    // if (monthValue === monthT) {
    //   const isConfirmed = await swal.confirm(`提报当月活动需要经过OA审批，请确认是否提交OA审批？`);
    //   if (!isConfirmed) return;
    //   params.isOa = 1;
    // }
    if (monthValue === monthT || monthValue === monthT2) {
      const res1 = await productApi.luteosProductPromotionPlanCreateCheck(params).catch(() => {
        saveLoading.value = false;
      });
      if (res1?.skuCodeList?.length) {
        const isConfirmed = await swal.confirm(
          `sku：${res1?.skuCodeList.join(',')}当前促销计划需要经过OA审批，请确认是否提交活动申请？`
        );
        if (!isConfirmed) {
          saveLoading.value = false;
          return;
        }
        params.isOa = 1;
      }
    }

    if (form.value?.planCode) {
      const res2 = await productApi.luteosProductPromotionPlanUpdate(params).catch((err) => {
        saveLoading.value = false;
        if (err.includes('创建了其他活动')) {
          return;
        } else {
          emit('success');
          visible.value = false;
          ElMessage.success('编辑成功');
        }
      });
      if (res2 == true) {
        emit('success');
        saveLoading.value = false;
        visible.value = false;
        ElMessage.success('编辑成功');
      }
    } else {
      const res3 = await productApi.luteosProductPromotionPlanCreate(params).catch((err) => {
        saveLoading.value = false;
        if (err.includes('创建了其他活动')) {
          return;
        } else {
          emit('success');
          visible.value = false;
          ElMessage.success('保存成功');
        }
      });
      if (res3 == true) {
        emit('success');
        saveLoading.value = false;
        visible.value = false;
        ElMessage.success('保存成功');
      }
    }
  };

  const handlerCountryChange = () => {
    form.value.spuCode = '';
    form.value.skuCodeList = [];
    form.value.saleInfoList = [];
    skuList.value = [];
    querySkuList();
    // queryGtm();
  };

  const handlerChannelChange = () => {
    // queryGtm();
  };

  const tableRef = ref();
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };

  const tick = ref(0);
  watch(
    () => visible.value,
    () => {
      if (!visible.value) {
        setTimeout(() => {
          tick.value = 0;
        }, 100);
      }
    }
  );

  const addInitData = async (row, type) => {
    form.value.channel = row.channel;
    form.value.countryCode = row.countryCode;
    form.value.currency = row.currency;
    form.value.spuCode = row.spuCode;
    form.value.spuName = row.spuName;
    form.value.currencyDesc = row.currencyDesc;
    await querySkuList();
    if (type == 'sku') {
      form.value.skuCodeList = [row.skuCode];
      handleSkuChange([row.skuCode]);
    } else if (type == 'skuEdit') {
      form.value.skuCodeList = [row.skuCode];
      const skuItems = skuList.value.filter((res) => {
        return form.value.skuCodeList.includes(res.code);
      });
      form.value.saleInfoList = [
        {
          spuCode: form.value.spuCode,
          spuName: form.value.spuName,
          countryCode: form.value.countryCode,
          activityPrice: null,
          activityProfitRate: null,
          discountRate: null,
          originalProfitRate: null,
          targetSales: null,
          productType: 1,
          skuItems: skuItems.map((sku) => Object.assign(sku, form.value)),
        },
      ];
    } else {
      form.value.skuCodeList = row.spuPlanItemList.map((res) => res.skuCode);
      handleSkuChange(['all']); //默认全部sku
    }
  };
  // 表格字段关联校验
  const title = ref('新增SKU');
  const open = (name, planCode) => {
    console.log(name, planCode);
    title.value = name;
    disabledValue.value = false;
    disabledEdit.value = false;
    saveLoading.value = false;
    skuList.value = [];
    form.value = {
      activityName: '',
      activityType: null,
      channel: '',
      countryCode: '',
      endDate: '',
      promotionLevel: null,
      skuItems: [],
      spuCode: '',
      startDate: '',
      queryDate: ['', ''],
    };
    if (name === '添加活动') {
      //sku添加 planCode.skuCode 有值
      disabledValue.value = false;
      addInitData(planCode, planCode.skuCode ? 'sku' : 'spu');
    }
    if (name === '修改活动') {
      disabledValue.value = true;
      addInitData(planCode, 'skuEdit');
      queryDetail(planCode.planCode);
      setTimeout(() => {
        formRef.value?.clearValidate('skuCodeList');
      }, 500);
    }
    if (name === '详情') {
      disabledValue.value = true;
      disabledEdit.value = true;
      queryDetail(planCode);
    }
    formRef.value?.resetFields();
    // queryGtmList();
    // getOperatorList();
    visible.value = true;
    tick.value = Date.now();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    // min-height: 500px;
    .cell {
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-input-group__append) {
    padding: 0 5px;
  }

  :deep(.el-form-item__content) {
    line-height: 24px;
  }
  .el-input-group--append .el-input-group__append .el-select :deep(.el-select__wrapper) {
    box-shadow: none;
    min-height: 28px;
    padding: 2px 16px;
  }
  .link-icon {
    color: var(--el-color-primary);
    vertical-align: bottom;
    cursor: pointer;
  }
  .color-grey {
    color: #999;
  }
  :deep(.el-form-item--default .el-form-item__error) {
    padding-top: 1px;
  }
  :deep(.el-form-item) {
    margin-bottom: 25px;
  }
</style>
