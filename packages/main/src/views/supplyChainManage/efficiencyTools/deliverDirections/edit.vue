<template>
  <KeenCard>
    <h4 class="title">
      {{ `指令信息#${detailData.baseInfo.commandCode}` }}
    </h4>
    <el-form ref="formRef" :model="detailData" label-width="130px" scroll-to-error>
      <el-row :gutter="40">
        <el-col :span="8" :offset="0">
          <el-form-item label="产品SKU：">
            {{ detailData.baseInfo.skuCode }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="产品名称：">
            {{ detailData.baseInfo.productName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item
            label="发货方式："
            prop="baseInfo.shipMethod"
            :rules="[{ required: true, trigger: 'change', message: '请选择发货方式' }]"
          >
            <el-select v-model="detailData.baseInfo.shipMethod" filterable>
              <el-option label="中仓发货" value="1" />
              <el-option label="工厂直发" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item
            label="预计发货数量："
            prop="baseInfo.estimateQty"
            :rules="[{ required: true, type: 'number', min: 1, message: '请输入预计发货数量' }]"
          >
            <NumberInput :precision="0" :min="1" v-model="detailData.baseInfo.estimateQty" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item
            label="物流方式："
            prop="baseInfo.logisticMethod"
            :rules="[{ required: true, trigger: 'change', message: '请选择物流方式' }]"
          >
            <el-select v-model="detailData.baseInfo.logisticMethod" filterable>
              <el-option
                v-for="item in planTurnOverLogisticsList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="预计发货时间：">
            {{ detailData.baseInfo.estimateShipDate }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="预计到货时间：">
            {{ detailData.baseInfo.estimateArriveDate }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="在线商品编码：">
            {{ detailData.baseInfo.originalPlatformMark }}
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="渠道：">{{ detailData.baseInfo.channelDesc }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="站点：">{{ detailData.baseInfo.siteDesc }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="计划：">{{ detailData.baseInfo.planer }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="运营：">{{ detailData.baseInfo.operator }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </KeenCard>
  <KeenCard>
    <h4 class="title">产品明细</h4>
    <p>
      <el-button type="primary" plain @click="addProduct">添加产品</el-button>
    </p>
    <vxe-table :data="detailData.itemInfoList" min-height="100px" border="inner">
      <vxe-column field="supplySku" title="供应链SKU" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="maxEstimateQty" title="最大发货量" />
      <vxe-column field="inventory" title="中仓库存" />
      <vxe-column title="预计发货数量">
        <template #default="{ row }">
          <Num :precision="0" v-model="row.estimateQty" :min="1" :max="row.maxEstimateQty" />
        </template>
      </vxe-column>
      <vxe-column title="操作" width="60px">
        <template #default="{ $rowIndex }">
          <el-button link type="danger" @click="remove($rowIndex)">删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
  <AddProductDialog
    :selected="detailData.itemInfoList"
    ref="addProductDialogRef"
    :skuCode="detailData.baseInfo.skuCode"
    @select="handleSelected"
  />
</template>

<script setup lang="ts" name="deliverDirectionsEdit">
  import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';
  import Num from '@/components/NumberInput/index.vue';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import AddProductDialog from './components/addProductDialog.vue';

  const { closeTabAndRefresh } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const detailData = ref<any>({
    baseInfo: {},
    shippingInfoList: [],
    itemInfoList: [],
  });
  const loading = ref(false);
  const planTurnOverLogisticsList = ref<any[]>([]);
  const getPlanTurnOverLogisticsList = async () => {
    const { planTurnOverLogisticsList: planTurnOverLogisticsListData }: any =
      await erpApi.luteosErpPlanTurnoverLogisticsQueryList();
    planTurnOverLogisticsList.value = planTurnOverLogisticsListData;
  };
  getPlanTurnOverLogisticsList();
  const getDetailData = async () => {
    loading.value = true;
    const res: any = await erpApi
      .luteosErpPlanShipCommandV2QueryDetail({
        commandCode: route.query.code as string,
      })
      .finally(() => {
        loading.value = false;
      });
    detailData.value = res as any;
    await addProductDialogRef.value.initDataList(res.baseInfo.skuCode as string);
  };
  const addProductDialogRef = ref();
  const addProduct = () => {
    addProductDialogRef.value?.open();
  };
  const handleSelected = (rows) => {
    const oldList = detailData.value.itemInfoList;
    const newList = rows.map((item: any) => {
      const same: any = oldList.find((old: any) => {
        return old.supplySku === item.supplySku;
      });
      const obj = {
        supplySku: same ? same.supplySku : item.supplySku,
        estimateQty: same ? same.estimateQty : 1,
        maxEstimateQty: same ? same.maxEstimateQty : item.maxQty,
        inventory: same ? same.inventory : item.inventory,
        skuCode: same ? same.skuCode : item.skuCode,
      };
      return obj;
    });
    detailData.value.itemInfoList = newList;
  };
  const remove = (index) => {
    detailData.value.itemInfoList.splice(index, 1);
  };
  const saveLoading = ref(false);
  const cancel = () => {
    router.push({
      name: 'deliverDirections',
    });
  };
  const formRef = ref();
  const save = async () => {
    const valid = formRef.value?.validate().catch(() => false);
    if (valid) {
      await erpApi.luteosErpPlanShipCommandV2Modify({
        ...detailData.value,
      });
      ElMessage.success('操作成功');
      closeTabAndRefresh('deliverDirections');
      cancel();
    }
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  h4.title {
    margin: 6px 0 18px;
  }
</style>
