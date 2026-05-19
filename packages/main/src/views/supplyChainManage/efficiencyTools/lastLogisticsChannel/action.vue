<template>
  <el-form
    :model="form"
    ref="formRef"
    :rules="rules"
    label-width="140px"
    label-position="top"
    :disabled="mode === 'detail'"
  >
    <el-tabs
      v-model="activeTab"
      tab-position="top"
      @tab-click="handleTabClick"
      class="sticky tab-box"
    >
      <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.id" />
    </el-tabs>
    <div class="tabwrap">
      <el-row :gutter="40" class="wrap1 pb6" id="baseInfo">
        <el-col :span="24">
          <h5 class="mode-title">基本信息</h5>
        </el-col>
        <el-col :span="6">
          <el-form-item label="渠道名称" prop="channelName">
            <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="渠道编码" prop="channelCode">
            <el-input v-model="form.channelCode" placeholder="请输入渠道编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="渠道类型" prop="channelType">
            <el-select v-model="form.channelType" placeholder="请选择渠道类型">
              <el-option
                v-for="item in lastLogisticsChannelTypeEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务商" prop="supplierCode">
            <el-select v-model="form.supplierCode" placeholder="请选择服务商">
              <el-option label="amazon" value="amazon" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="限重(KG)" style="width: 100%">
            <div class="d-flex align-items-center justify-content-center" style="width: 100%">
              <el-input-number
                v-model="form.weightLimitMin"
                placeholder="最小限重"
                :controls="false"
                :precision="3"
                style="flex: 1"
              />
              <span style="margin: 0 8px">~</span>
              <el-input-number
                v-model="form.weightLimitMax"
                placeholder="最大限重"
                :controls="false"
                :precision="3"
                style="flex: 1"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否COD" prop="isCod">
            <el-radio-group v-model="form.isCod">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="轨迹查询网址" prop="trackingWebsite">
            <el-input v-model="form.trackingWebsite" placeholder="请输入轨迹查询网址" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option
                v-for="item in lastLogisticsChannelStatusEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否对接" prop="isConnectApi">
            <el-radio-group v-model="form.isConnectApi">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计算材积重" prop="isVolumeWeight">
            <el-radio-group v-model="form.isVolumeWeight">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="材积系数" prop="volumeWeightCoefficient">
            <el-input-number
              v-model="form.volumeWeightCoefficient"
              placeholder="请输入材积系数"
              :controls="false"
              :precision="0"
              :min="1"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发货仓库" prop="warehouseCode">
            <WarehouseSelect
              v-model="form.warehouseCode"
              placeholder="请选择发货仓库"
              valueKey="warehouseCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="称重差异合理区间(克)">
            <div class="d-flex align-items-center justify-content-center" style="width: 100%">
              <el-input-number
                v-model="form.weightToleranceMin"
                placeholder="最小称重差异"
                :controls="false"
                :min="0"
                :max="form.weightToleranceMax || undefined"
                style="flex: 1"
              />

              <span style="margin: 0 8px">~</span>

              <el-input-number
                v-model="form.weightToleranceMax"
                placeholder="最大称重差异"
                :controls="false"
                :min="form.weightToleranceMin || 0"
                style="flex: 1"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务水平" prop="serviceLevel">
            <el-input v-model="form.serviceLevel" placeholder="请输入服务水平" />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="mb20">
          <b>产品属性限制</b>
          <el-checkbox-group v-model="form.goodsAttributeLimit">
            <el-checkbox
              v-for="item in lastLogisticsChannelProductAttributesEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-checkbox-group>
        </el-col>
        <el-col :span="24">
          <b>尺寸限制</b>
          <el-row :gutter="20">
            <el-col
              :span="6"
              v-for="item in [
                {
                  id: 'perimeter',
                  label: '周长范围',
                  value: 'perimeter',
                },
                {
                  id: 'girth',
                  label: '围长范围',
                  value: 'girth',
                },
                {
                  id: 'length',
                  label: '尺寸范围/长',
                  value: 'length',
                },
                {
                  id: 'width',
                  label: '尺寸范围/宽',
                  value: 'width',
                },
                {
                  id: 'height',
                  label: '尺寸范围/高',
                  value: 'height',
                },
              ]"
              :key="item.id"
            >
              <el-form-item :label="item.label">
                <el-space>
                  <el-input-number
                    v-model="form[`${item.value}Min`]"
                    :placeholder="`最小${item.label}`"
                    style="width: 46%"
                    :controls="false"
                  >
                    <template #suffix>cm</template>
                  </el-input-number>
                  <span>~</span>
                  <el-input-number
                    v-model="form[`${item.value}Max`]"
                    :placeholder="`最大${item.label}`"
                    style="width: 50%"
                    :controls="false"
                  >
                    <template #suffix>cm</template>
                  </el-input-number>
                </el-space>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="围长范围">
                <el-space>
                  <el-input-number
                    v-model="form.girthMin"
                    placeholder="最小围长"
                    style="width: 50%"
                    :controls="false"
                  />
                  <span>~</span>
                  <el-input-number
                    v-model="form.girthMax"
                    placeholder="最大围长"
                    style="width: 50%"
                    :controls="false"
                  />
                </el-space>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="尺寸范围/长">
                <el-space>
                  <el-input-number
                    v-model="form.lengthMin"
                    placeholder="最小长"
                    style="width: 46%"
                    :controls="false"
                  />
                  <span>~</span>
                  <el-input-number
                    v-model="form.lengthMax"
                    placeholder="最大长"
                    style="width: 50%"
                    :controls="false"
                  />
                </el-space>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="尺寸范围/宽">
                <el-space>
                  <el-input-number
                    v-model="form.widthMin"
                    placeholder="最小宽"
                    style="width: 46%"
                    :controls="false"
                  />
                  <span>~</span>
                  <el-input-number
                    v-model="form.widthMax"
                    placeholder="最大宽"
                    style="width: 50%"
                    :controls="false"
                  />
                </el-space>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尺寸范围/高">
                <el-space>
                  <el-input-number
                    v-model="form.heightMin"
                    placeholder="最小高"
                    style="width: 46%"
                    :controls="false"
                  />
                  <span>~</span>
                  <el-input-number
                    v-model="form.heightMax"
                    placeholder="最大高"
                    style="width: 50%"
                    :controls="false"
                  />
                </el-space>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20" class="wrap1" id="deliveryRange" v-if="mode !== 'add'">
        <el-col :span="24">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mode-title mb-0">配送范围</h5>
            <div>
              <el-button type="primary" size="small" @click="importDeliveryRange">导入</el-button>
              <el-button type="danger" size="small" @click="deleteDeliveryRange">删除</el-button>
            </div>
          </div>
          <el-table
            :data="form.deliveryRangeList"
            border
            row-key="id"
            @selection-change="handleDeliveryRangeSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" type="index" width="55" />
            <el-table-column label="编码" prop="code" />
            <el-table-column label="类型" prop="type" />
            <el-table-column label="名称" prop="name" />
            <el-table-column label="邮编" prop="postcode" />
            <el-table-column label="分区" prop="partition" />
            <el-table-column label="是否偏远" prop="isRemote" />
            <el-table-column label="时效" prop="time" />
            <el-table-column label="创建人" prop="creator" />
            <el-table-column label="创建时间" prop="createTime" />
          </el-table>
        </el-col>
      </el-row> -->
      <el-row :gutter="20" class="wrap1" id="priceRule" v-if="mode !== 'add'">
        <el-col :span="24" class="mb20">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mode-title mb-0">计费协议</h5>
            <!-- <div>
              <el-button type="primary" size="small" @click="() => {}">新增</el-button>
              <el-button type="danger" size="small" @click="() => {}">作废</el-button>
            </div> -->
          </div>
          <el-table
            :data="form.billingAgreementList"
            row-key="id"
            @selection-change="handlePriceRuleSelectionChange"
          >
            <!-- <el-table-column type="selection" width="55" /> -->
            <el-table-column label="序号" type="index" width="55" />
            <el-table-column label="协议名称" prop="name" />
            <el-table-column label="是否充值预付" prop="isPrepaidDesc" min-width="100" />
            <el-table-column label="账单币种" prop="currency" min-width="100" />
            <el-table-column label="有效期" prop="effectiveDateStart" min-width="130">
              <template #default="{ row }">
                {{ row.effectiveDateStart }} ~ {{ row.effectiveDateEnd }}
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="statusDesc" min-width="100" />
            <el-table-column label="创建人" prop="creator" />
            <el-table-column label="创建时间" prop="createTime" min-width="120" />
            <el-table-column label="修改人" prop="updator" />
            <el-table-column label="修改时间" prop="updateTime" min-width="120" />
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <KeenActions
                  :actions="[{ label: '费用配置', key: 'feeConfig', type: 'primary', row: row }]"
                  @click="handlePriceRuleActions"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </el-form>
  <div class="d-flex justify-content-center footer fixed" v-if="mode !== 'detail'">
    <el-button type="primary" :loading="saveLoading" @click="handleSave">保存</el-button>
    <el-button
      :disabled="saveLoading"
      @click="
        () => {
          router.push({
            name: 'lastLogisticsChannel',
          });
        }
      "
    >
      取消
    </el-button>
  </div>
  <FeeConfigDialog ref="feeConfigDialogRef" />
</template>

<script setup lang="ts" name="lastLogisticsChannelAction">
  import { useRouter, useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import { TmsApi, tmsApi } from '@/api';
  import {
    lastLogisticsChannelTypeEnum,
    lastLogisticsChannelStatusEnum,
    lastLogisticsChannelProductAttributesEnum,
  } from './components/enum';
  import WarehouseSelect from '@/views/supplyChainManage/efficiencyTools/transferOrderManage/components/warehouseSelect.vue';
  import FeeConfigDialog from './components/feeConfigDialog.vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';

  const { closeTabAndRefresh } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const feeConfigDialogRef = ref();
  const props = defineProps({
    mode: {
      type: String,
      default: 'add',
    },
  });
  const form = ref({
    channelName: undefined,
    channelCode: undefined,
    channelType: undefined,
    supplierCode: undefined,
    weightLimitMin: undefined,
    weightLimitMax: undefined,
    isCod: 0,
    trackingWebsite: undefined,
    status: 1,
    isConnectApi: 0,
    isVolumeWeight: 0,
    volumeWeightCoefficient: undefined,
    warehouseCode: undefined,
    weightToleranceMin: undefined,
    weightToleranceMax: undefined,
    serviceLevel: undefined,
    goodsAttributeLimit: [],
    perimeterMin: undefined,
    perimeterMax: undefined,
    girthMin: undefined,
    girthMax: undefined,
    lengthMin: undefined,
    lengthMax: undefined,
    widthMin: undefined,
    widthMax: undefined,
    heightMin: undefined,
    heightMax: undefined,
    deliveryRangeList: [],
    billingAgreementList: [],
  });
  const formRef = ref();
  const activeTab = ref('baseInfo');
  const tabs = ref([
    { id: 'baseInfo', label: '基础信息' },
    // { id: 'deliveryRange', label: '配送范围', disabled: true },
    { id: 'priceRule', label: '计费协议' },
  ]);
  const rules = reactive({
    channelName: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
    channelCode: [{ required: true, message: '请输入渠道编码', trigger: 'blur' }],
    channelType: [{ required: true, message: '请选择渠道类型', trigger: 'blur' }],
    supplierCode: [{ required: true, message: '请选择服务商', trigger: 'blur' }],
    isCod: [{ required: true, message: '请选择是否COD', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    isConnectApi: [{ required: true, message: '请选择是否对接', trigger: 'blur' }],
    isVolumeWeight: [{ required: true, message: '请选择计算材积重', trigger: 'blur' }],
  });
  const saveLoading = ref(false);
  let contentSection = ref();
  onMounted(() => {
    contentSection.value = document.querySelector('.layout-right-main');
  });
  const handleTabClick = (tab: any) => {
    activeTab.value = tab.paneName;
    // 滚动到对应区域，需要减去头部高度
    const section = document.getElementById(tab.paneName);
    if (section) {
      const top = section.offsetTop - 99;
      contentSection.value?.scrollTo({ top, behavior: 'smooth' });
    }
  };
  const handlePriceRuleSelectionChange = (val: any) => {
    console.log(val, '-----');
  };
  const handlePriceRuleActions = (val: any) => {
    const { key, row } = val;
    switch (key) {
      case 'edit':
        console.log(row, '-----');
        break;
      case 'feeConfig':
        feeConfigDialogRef.value.open(row.billingAgreementConfigList);
        break;
      case 'detail':
        console.log(row, '-----');
        break;
    }
  };
  const handleSave = async () => {
    try {
      const valid = await formRef.value?.validate().catch(() => {
        return false;
      });
      if (!valid) return;
      saveLoading.value = true;
      await tmsApi.tmsErpLogisticsLastmileChannelSave({
        ...form.value,
      });
      ElMessage.success('保存成功');
      closeTabAndRefresh('lastLogisticsChannel');
      router.push({
        name: 'lastLogisticsChannel',
      });
    } finally {
      saveLoading.value = false;
    }
  };
  onMounted(() => {
    console.log(props.mode, '-----');

    if (props.mode === 'edit' || props.mode === 'detail') {
      tmsApi
        .tmsErpLogisticsLastmileChannelDetail({
          channelId: +(route.query?.channelId as string),
        })
        .then((res) => {
          form.value = cloneDeep(res || {});
        });
    }
    window.addEventListener('resize', () => {
      contentSection.value?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
</script>

<style scoped lang="scss">
  .sticky {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .tabwrap {
    padding: 20px 24px;
    overflow: auto;
    background-color: white;
  }
  .wrap1 {
    margin-bottom: 20px;
  }
  .mode-title {
    position: relative;
    padding-left: 6px;
    &::before {
      content: '';
      display: inline-block;
      width: 3px;
      height: 12px;
      background-color: #02b96b;
      border-radius: 15px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 6px;
    }
  }
  .fixed {
    position: fixed;
    width: 100%;
    background-color: white;
    bottom: 0;
    padding: 12px 0;
    box-shadow: 0px -3px 16px 0px rgba(0, 0, 0, 0.04);
    font-size: 13px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    align-items: center;
    height: 56px;
    z-index: 10;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  :deep(.el-input-number.is-center .el-input__inner) {
    text-align: left;
  }
</style>
