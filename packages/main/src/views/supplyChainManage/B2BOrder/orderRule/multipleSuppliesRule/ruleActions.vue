<template>
  <el-form
    :model="form"
    ref="formRef"
    :rules="rules"
    label-width="100px"
    scroll-to-error
    style="width: 100%"
  >
    <KeenCard title="基础信息">
      <el-form-item label="产品集名称" prop="name">
        <el-input
          maxlength="100"
          show-word-limit
          v-model="form.name"
          :placeholder="holderText"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">启用</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </KeenCard>
    <KeenCard title="产品信息">
      <p>
        <el-button type="primary" @click="handleBindGoods">添加产品</el-button>
      </p>
      <div class="table-list py-4">
        <el-table :data="form.itemList" row-key="productSpu" :height="354">
          <el-table-column label="序号" width="60">
            <template #default="{ row, $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="产品信息" min-width="150">
            <template #default="scope">
              <div class="d-flex align-items-center pe-5">
                <KeenImagePreview :src="scope.row.productImage || scope.row.productImageUrl" />
                <div class="ms-5 fs-5">
                  <div class="product-item">
                    {{ scope.row.skuName || scope.row.productTitle || scope.row.prodName }}
                  </div>
                  <div class="d-flex justify-content-between fs-7">
                    <span class="me-5">{{ scope.row.productSku || scope.row.supplySku }}</span>
                    <!-- <span>{{ scope.row.skuCode }}</span> -->
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" fixed="right" v-if="!isDetail">
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '删除',
                    key: 'del',
                    type: 'danger',
                    plain: true,
                    index: scope.$index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
          <!--          <el-table-column label="费用占比" v-else>
                      <template #default="{ row }">
                        {{ row.skuProportion ? row.skuProportion + '%' : '' }}
                      </template>
                    </el-table-column>-->
        </el-table>
      </div>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.itemList"
    :selected-row="form.itemList[0]"
    confirm-text="确认"
    type="sku"
  />
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  // import { QuestionFilled } from '@element-plus/icons-vue';
  import { omit, difference } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import { useTabs } from '@/hooks/tabs';
  import BindSku from '../components/bindSku.vue';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const ruleType = parseInt(route.query.ruleType as string);

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    console.log('🚀 ~ val:', val);
    if (reload) {
      const oldList = form.value.itemList;
      val.forEach((item) => {
        const same = oldList.find((old) => {
          if (
            route.fullPath?.includes('/skurelationnew') ||
            route.fullPath?.includes('/loselist')
          ) {
            return old.skuCode === item.skuCode;
          }
          return old.productSku === item.productSku;
        });
        if (same) {
          item.skuQty = same.skuQty ? same.skuQty : 1;
          item.price = same.price ? same.price : 0;
          item.currency = same.currency ? same.currency : '';
        } else item.skuQty = 1;
        if (item.productTitle) {
          item.prodName = item.productTitle;
        }
        if (item.productImage) {
          item.productImageUrl = item.productImage;
        }
        if (item.productSku) {
          item.supplySku = item.productSku;
        }
        // item.productImageUrl = item.productImage;
        // item.supplySku = item.productSku;
      });
      form.value.itemList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };
  const isDetail = computed(() => {
    return route.fullPath.includes('/detail');
  });

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      form.value.itemList.splice(index, 1);
    }
  };
  // 表单模型
  const form = ref({
    name: '',
    status: 1,
    sceneCode: 'multiple_supplie',
    itemList: [],
  });

  // 校验规则
  const rules = {
    name: [{ required: true, message: '请输入产品集名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  };

  const initField = async () => {
    // if (!ruleType) {
    //   ElMessage.warning('规则参数错误');
    //   return;
    // }
    // const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
    //   type: ruleType,
    // });
    // form.value.conditionList = res.conditionList.map((item) => {
    //   return {
    //     ...item,
    //     value: item.type === 1 ? [] : '',
    //   };
    // });
    // form.value.outParamList = res.outParamList.map((item) => {
    //   return {
    //     ...item,
    //     value: item.type === 1 ? [] : '',
    //   };
    // });
    // console.log('form.value.outParamList', form.value.outParamList);
  };
  // initField();
  const getDetailData = async () => {
    // const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
    //   code: route.query.code || (route.params?.code as string),
    // });
    const res: any = await omsApi.omsRuleMultipleSuppliesQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    form.value = res;
    console.log('详情返回', res);
    if (res?.itemList?.length > 0) {
      res?.itemList.forEach((item) => {
        if (item.prodName) {
          item.productTitle = item.prodName;
        }
        if (item.productImageUrl) {
          item.productImage = item.productImageUrl;
        }
        if (item.supplySku) {
          item.productSku = item.supplySku;
        }
      });
    }
    // form.value = res;
    // 修复编辑 不生效bug
    // form.value.id = res.id;
  };
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
    getDetailData();
  } else {
    initField();
  }
  // const rules = reactive({
  //   'baseInfo.name': [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  // });
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'orderRule',
    });
  };
  const formRef = ref<any>();
  const conditionFormRef = ref<any>();
  const saveLoading = ref(false);
  const save = async () => {
    // console.log('参数:', form.value);
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      conditionFormRef.value?.validate().catch(() => false),
    ]);
    // console.log('valid', valid);
    const falseArr = valid.filter((item) => item === false);
    if (falseArr.length > 0) {
      return;
    }
    console.log('表单', form.value);
    const param = JSON.parse(JSON.stringify(form.value));
    // console.log('组装参数', param);
    // return;
    if (valid) {
      // const params = {
      //   baseInfo:
      //     route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
      //   conditionList: form.value.conditionList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      //   outParamList: form.value.outParamList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      // };
      // return;
      if (!isEdit.value) {
        await omsApi.omsRuleMultipleSuppliesAdd(param);
      } else {
        await omsApi.omsRuleMultipleSuppliesUpdate(param);
      }
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    }
  };
</script>

<style scoped lang="scss">
  .table-list {
    max-height: 600px;
    .product-item {
      font-size: 14px;
    }
  }
  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .full-row {
    flex-grow: 1;
    flex-basis: 100%; /* 或者 width: 100%; */
  }

  .flex-row {
    display: flex; /* 接下来的行是弹性布局 */
  }

  .flex-row > div {
    flex: 1; /* 让子项也弹性分布 */
  }
  .formItem {
    margin-bottom: 12px;
  }
  .w100 {
    width: 100%;
  }
  .flex1 {
    flex: 1;
    align-items: center;
  }
  .noshrink {
    flex-shrink: 0;
  }
  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }
  .padl15 {
    padding-left: 15px;
  }
  .tips {
    font-size: 12px;
  }
  .marl4 {
    margin-left: 4px;
  }
  .mar4 {
    margin: 0 4px;
  }
  .padl6 {
    padding-left: 6px;
  }
  .padl10 {
    padding-left: 10px;
  }
  .padb20 {
    padding-bottom: 20px;
  }
  .dynamic-form-container {
    display: flex;
    height: calc(100vh - 281px);
    overflow: hidden;
    background: white;
    width: 1440px;
    margin: 0 auto;
    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }
    :deep(.el-radio__label) {
      font-size: 12px !important;
    }
    .demo-collapse {
      background: #e8f3ff;
      margin-bottom: 20px;
      .switch {
        padding-right: 5px;
      }
      .activeColor {
        color: #02b96b;
      }
      :deep(.el-collapse-item__header) {
        background-color: #e8f3ff;
      }
      :deep(.el-collapse-item__content) {
        background-color: #e8f3ff;
      }
      .bg {
        background-color: #e8f3ff;
      }
      .info-text {
        padding-left: 35px;
      }
    }
    .bg2 {
      background-color: #f7f8fa;
    }
    .houseNumber {
      padding: 16px;
      border-radius: 4px;
      // margin-bottom: 20px;
    }
    .lh32 {
      line-height: 32px;
    }
    .checkItem {
      display: flex;
      align-items: center;
      line-height: 32px;
      height: 32px;
      margin-bottom: 8px;
    }
    .line {
      line-height: 32px;
    }
  }

  .left-panel {
    width: 340px;
    background: white;
    padding: 10px 5px 10px 30px;
    border-right: 1px solid #dadde2;
    overflow-y: auto;

    .title {
      flex: 1;
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 5px;
      color: #1f1f1f;
    }
    :deep(.el-checkbox__label) {
      font-size: 12px !important;
    }
  }

  .right-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    :deep(.right-form .el-form-item) {
      display: flex !important;
    }
  }

  .field-item {
    margin-bottom: 5px;
    width: 50%;
    display: inline-block;
    font-size: 12px !important;
  }
</style>
