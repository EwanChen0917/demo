<template>
  <el-form
    label-width="170"
    label-position="top"
    require-asterisk-position="right"
    class="detail-form"
  >
    <CustomCard :loading="loading" title="单号信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="领用单号">
            <span>{{ form?.baseInfo?.code || '-' }}</span>
            <Copy :content="form?.baseInfo?.code || ''" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="OA申请单号">
            <span>{{ form?.baseInfo?.erpCode || '-' }}</span>
            <Copy :content="form?.baseInfo?.erpCode || ''" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="仓配系统销售单号">
            <span>{{ form?.baseInfo?.systemSaleCode || '-' }}</span>
            <Copy :content="form?.baseInfo?.systemSaleCode || ''" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间">{{ form?.baseInfo?.createTime || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售出库单号">
            <span>{{ form?.baseInfo?.systemCode || '-' }}</span>
            <Copy :content="form?.baseInfo?.systemCode || ''" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运单号">{{ form?.baseInfo?.waybillNo || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="仓配系统销售出库单号">
            {{ form?.baseInfo?.woCode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出库时间">{{ form?.baseInfo?.outTime || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="跟踪单号">
            <!-- <div class="text-break">{{ form?.baseInfo?.trackingNum || '-' }}</div> -->
            <span v-if="form?.baseInfo?.trackNumList?.length > 0">
              <span v-for="(item, index) in form?.baseInfo?.trackNumList" :key="item">
                <span class="link" @click="openExternalLink(item, form?.baseInfo)">{{ item }}</span>
                <span v-if="index !== form?.baseInfo?.trackNumList?.length - 1">
                  {{ ' , ' }}
                </span>
              </span>
            </span>
            <span v-else>-</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="仓配系统">{{ form?.baseInfo?.thirdSytem || '-' }}</el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="物流渠道/快递:">
            <div class="text-break">{{ form?.baseInfo?.freightForwardingChannelDesc || '-' }}</div>
          </el-form-item>
        </el-col>
         -->
        <!-- <el-col :span="16">
          <el-form-item label="备注:">
            <div class="text-break">{{ form?.baseInfo?.remark || '-' }}</div>
          </el-form-item>
        </el-col> -->
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="领用信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="领用人">{{ form?.baseInfo?.requisitioner || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="领用部门">
            {{ form?.baseInfo?.requisitionDept || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="领用类型">
            {{ form?.baseInfo?.requisitionType || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否为品牌周边产品" label-width="180">
            <template #label>
              <div class="d-flex align-items-center gap-2">
                是否为品牌周边产品:
                <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 600px">
                      品牌周边涉及产品有：2023 Cozy Case、2023 Momcozy Cozy Holiday Box、2024
                      Momcozy Village Supply
                      Box、母乳喂养周礼盒、品牌日礼盒、圆领T恤、行李箱、针织袋、挎包、冰箱贴、品牌手册、疗愈宝典、专家联名的母乳喂养成长指南等
                    </div>
                  </template>
                  <el-icon size="16" color="var(--el-color-primary)">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
            {{ form.baseInfo.isOutSide ? '是' : '否' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="领用场景">
            {{ form?.baseInfo?.requisitionScene || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市场大区">{{ form?.baseInfo?.marketRegion || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户名称">{{ form?.baseInfo?.customerName || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6" v-if="form?.baseInfo?.channelApproveName">
          <el-form-item label="渠道审批人">
            {{ form?.baseInfo?.channelApproveName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计划审批人">{{ form?.baseInfo?.plannerName || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6" v-if="form?.baseInfo?.gtmApproveName">
          <el-form-item label="GTM审批人">
            {{ form?.baseInfo?.gtmApproveName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单异常是否钉钉通知">
            {{ form.baseInfo.noticeFlag ? '是' : '否' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="领用用途">{{ form?.baseInfo?.requisitionUse || '-' }}</el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="收货信息">
      <el-row :gutter="16">
        <!-- <el-col :span="6">
          <el-form-item label="客户名称:">
            {{ form?.receiveInfo?.customerDesc || '-' }}
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="收件人">
            {{ form?.receiveInfo?.name || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话">
            {{ form?.receiveInfo?.phone || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- TODO: 手机号 -->
          <el-form-item label="手机号">
            {{ form?.receiveInfo?.mobile || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱">
            {{ form?.receiveInfo?.email || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮编">
            {{ form?.receiveInfo?.zipcode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="国家/地区">
            {{ form?.receiveInfo?.countryDesc || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="省/州">
            {{ form?.receiveInfo?.province || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="城市">
            {{ form?.receiveInfo?.city || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区/县">{{ form?.receiveInfo?.area || '-' }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="街道">
            <div class="text-break">{{ form?.receiveInfo?.address || '-' }}</div>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="门牌号">
            {{ form?.receiveInfo?.houseNumber || '-' }}
          </el-form-item>
        </el-col>

        <!-- <el-col :span="6">
          <el-form-item label="邮编:">{{ form?.customerInfo?.receiveZipCode || '-' }}</el-form-item>
        </el-col> -->
        <el-col :span="24">
          <el-form-item label="详细地址">
            <div class="text-break">{{ form?.receiveInfo?.address2 || '-' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
    <CustomCard :loading="loading" title="产品信息">
      <el-table border :data="form?.itemInfoList">
        <el-table-column label="序号" type="index" width="50" />
        <template v-if="isWithoutSku">
          <el-table-column label="物品名称" prop="itemName" min-width="250" />
          <el-table-column label="物料属性" prop="itemProperties" min-width="200" />
        </template>
        <template v-else>
          <el-table-column label="产品名称" prop="productName" min-width="250" />
          <el-table-column label="产品SKU" prop="skuCode" min-width="150" />
          <el-table-column label="供应链SKU" prop="productSku" min-width="150" />
        </template>
        <el-table-column label="发货方式" prop="deliveryDesc" min-width="100" />
        <el-table-column label="发货仓库" prop="warehouseDesc" min-width="160" />
        <el-table-column label="发货数量" prop="qty" min-width="80" />
        <el-table-column v-if="!isWithoutSku" label="销售单价" prop="salePrice" min-width="80" />
        <el-table-column v-if="!isWithoutSku" label="物流承运商" prop="spName" min-width="100" />
        <el-table-column label="配送方式" prop="shippingDesc" min-width="200" />
      </el-table>
    </CustomCard>
    <!-- TODO: 订单信息 -->
    <CustomCard :loading="loading" title="订单信息">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="卖家账号">
            {{ form?.odoExtraInfo?.shopCode || '-' }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="运费">
            {{ form?.odoExtraInfo?.shipAmount || 0 }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易额">
            {{ form?.odoExtraInfo?.actualAmount || 0 }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货币类型">
            {{ form?.odoExtraInfo?.currencyCode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="参考单号">
            {{ form?.baseInfo?.refCode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="唛头">
            {{ form?.baseInfo?.shippingMark || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款时间">
            {{ form?.baseInfo?.createTime || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户CRM来源单号">
            {{ form?.baseInfo?.sourceCode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form?.baseInfo?.status === 700 || form?.baseInfo?.status === 400">
          <el-form-item label="物流费用">
            {{ form?.baseInfo?.logisticsFee || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单备注">
            {{ form?.baseInfo?.remark || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件">
            <div class="w-100" v-for="item in form?.orderAttachmentList" :key="item.id">
              <el-link
                type="primary"
                underline="never"
                @click="
                  () => {
                    download(item?.fileUrl, item?.fileName);
                  }
                "
              >
                {{ item?.fileName }}
              </el-link>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </CustomCard>
  </el-form>
</template>

<script setup lang="ts" name="requisitionDetail">
  import { erpApi } from '@/api';
  import { download } from '@/utils/download';

  const route = useRoute();
  const form = ref({
    baseInfo: {
      code: '',
      erpCode: '',
      systemCode: '',
      thirdSytem: '',
      systemSaleCode: '',
      trackOrderCode: '',
      createTime: '',
      outTime: '',
      freightForwardingChannelDesc: '',
      remark: '',
      requisitioner: '',
      requisitionDept: '',
      requisitionType: '',
      requisitionUse: '',
      isOutSide: false,
      shippingMark: '',
      sellerAccount: '',
      trackingNum: '',
      woCode: '',
      sourceCode: '', // 用户CRM来源单号
    },
    receiveInfo: {
      name: '',
      phone: '',
      mobile: '',
      countryDesc: '',
      province: '',
      email: '',
      zipcode: '',
      city: '',
      area: '',
      address: '',
      houseNumber: '',
      address2: '',
    },
    itemInfoList: [],
    odoExtraInfo: {
      shopCode: 'lingyong',
      shipAmount: '',
      actualAmount: 0,
      currencyCode: 'USD',
    },
  });

  // 打开物流跟踪地址
  async function openExternalLink(val?: any, row?: any) {
    const url = row.trackMainUrl + val;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  const loading = ref(false);
  const queryDetail = async (code?: string) => {
    loading.value = true;
    const res = await erpApi
      .luteosErpOdoQueryCommonDetail({
        code: code || (route.query?.code as string),
      })
      .finally(() => {
        loading.value = false;
      });
    form.value = res;
  };
  // queryDetail();
  defineExpose({
    init: queryDetail,
  });
  const isWithoutSku = computed(() => {
    return form.value.baseInfo.requisitionType === '无SKU领用';
  });
</script>

<style scoped lang="scss">
  .detail-form {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    :deep(.el-form-item__label) {
      margin-bottom: 0;
    }
  }
  .link {
    cursor: pointer;
    color: #02b96b;
  }
  :global(.el-form-item__content) {
    line-height: 32px;
  }
</style>
