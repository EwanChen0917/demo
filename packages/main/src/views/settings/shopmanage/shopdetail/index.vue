<template>
  <KeenCard title="店铺详情">
    <div class="p-3 pt-0 position-relative">
      <h5 class="title">店铺信息</h5>
      <el-form
        v-model="form.shopCommonInfoResp"
        label-position="top"
        inline
        class="mb-9 text-gray-600"
      >
        <el-form-item label="店铺名称">{{ form?.shopCommonInfoResp.name }}</el-form-item>
        <el-form-item label="平台">{{ form?.shopCommonInfoResp.platformDesc }}</el-form-item>
        <el-form-item label="站点">{{ form?.shopCommonInfoResp.site }}</el-form-item>
        <el-form-item label="店铺状态">
          <div>
            <span class="badge" :class="statusColorMap[form?.shopCommonInfoResp.errorStatus]">
              {{ errorStatusMap[form?.shopCommonInfoResp.errorStatus] }}
            </span>
          </div>
        </el-form-item>
        <el-form-item label="授权状态">
          <div>
            <span class="badge" :class="statusColorMap[form?.shopCommonInfoResp.authStatus]">
              {{ authStatusMap[form?.shopCommonInfoResp.authStatus] }}
            </span>
          </div>
        </el-form-item>
      </el-form>

      <h5 class="title">账号信息</h5>
      <el-form
        v-model="form.shopAccountInfoResp"
        label-position="top"
        inline
        class="mb-9 text-gray-600"
      >
        <el-form-item label="注册手机">
          {{ form?.shopAccountInfoResp.registerPhoneNumber }}
        </el-form-item>
        <el-form-item label="注册邮箱">{{ form?.shopAccountInfoResp.registerEmail }}</el-form-item>
        <el-form-item label="卖家Id">{{ form?.shopAccountInfoResp.sellerId }}</el-form-item>
        <el-form-item label="注册公司名称">
          {{ form?.shopAccountInfoResp.registerCompanyName }}
        </el-form-item>
        <el-form-item label="注册公司地址" class="w-100">
          {{ form?.shopAccountInfoResp.registerCompanyAddress }}
        </el-form-item>
      </el-form>
      <h5 class="title">经营信息</h5>
      <el-form
        v-model="form.shopBusinessInfoResp"
        label-position="top"
        inline
        class="mb-9 text-gray-600"
      >
        <el-form-item label="公司名称">
          {{ form?.shopBusinessInfoResp.companyName }}
        </el-form-item>
        <el-form-item label="统一信用代码">
          {{ form?.shopBusinessInfoResp.unifiedSocialCreditCode }}
        </el-form-item>
        <el-form-item label="法人">
          {{ form?.shopBusinessInfoResp.companyLegalPerson }}
        </el-form-item>
        <el-form-item label="注册公司名称">
          {{ form?.shopBusinessInfoResp.registerCompanyName }}
        </el-form-item>
        <el-form-item label="经营地址" class="w-100">
          {{ form?.shopBusinessInfoResp.address }}
        </el-form-item>
      </el-form>
      <h5 class="title">财务信息</h5>
      <el-form
        v-model="form.shopFinanceInfoResp"
        label-position="top"
        inline
        class="mb-9 text-gray-600"
      >
        <el-form-item label="收款账号">
          {{ form?.shopFinanceInfoResp.receivingAccount }}
        </el-form-item>
        <el-form-item label="收款账号银行识别码">
          {{ form?.shopFinanceInfoResp.receivingAccountBankIdentificationCode }}
        </el-form-item>
        <el-form-item label="信用卡">{{ form?.shopFinanceInfoResp.creditCardNumber }}</el-form-item>
        <el-form-item label="信用卡持卡人姓名">
          {{ form?.shopFinanceInfoResp.creditCardHolder }}
        </el-form-item>
      </el-form>
      <h5 class="title">备注</h5>
      <div class="text-gray-600">{{ form?.shopCommonInfoResp.remark }}</div>
    </div>
  </KeenCard>
</template>

<script setup lang="ts">
  import { ShopApi, shopApi } from '@/api';

  const route = useRoute();
  const code = route.query.code as string;
  const authStatusMap = reactive({
    0: '未授权',
    1: '已授权',
    2: '异常',
  });

  const errorStatusMap = reactive({
    1: '正常',
    2: '异常',
  });

  const statusColorMap = reactive({
    0: 'badge-light-info',
    1: 'badge-light-success',
    2: 'badge-light-danger',
  });

  const form = reactive<ShopApi.LuteosShopQueryShopDetail.ResponseBody>({
    /** 店铺账号信息 */
    shopAccountInfoResp: {},
    /** 店铺经营信息 */
    shopBusinessInfoResp: {},
    /** 店铺基本信息 */
    shopCommonInfoResp: {},
    /** 店铺财务信息 */
    shopFinanceInfoResp: {},
  });
  const getDetailInfo = async () => {
    const res = await shopApi.luteosShopQueryShopDetail({
      shopCode: code,
    });
    Object.keys(form).forEach((key) => {
      form[key] = res[key];
    });
  };
  getDetailInfo();

  const router = useRouter();
  const searchInfo = sessionStorage.getItem('shopSearchInfo') ?? '{}';
  const goBack = () => {
    router.push({
      name: 'shoplist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };
</script>

<style scoped lang="scss">
  .el-form--inline.el-form--label-top .el-form-item {
    width: 20%;
    margin-right: 0;
    margin-bottom: 7px;
  }

  :deep(.el-form-item__content) {
    line-height: unset;
  }

  .title {
    display: inline-block;

    &::before {
      content: '';
      width: 5px;
      height: 15px;
      background-color: var(--bs-primary);
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      left: 0;
    }
  }
</style>
