<template>
  <KeenCard>
    <el-tabs v-model="activeTab">
      <el-tab-pane name="cooperate" label="合作费用">
        <CooperateFee />
      </el-tab-pane>
      <el-tab-pane name="apply" label="发起站外推广费用申请审批">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="200px"
          label-position="top"
        >
          <el-form-item label="合作事项id" prop="baseInfo.projectCode">
            <el-input v-model="form.baseInfo.projectCode" disabled />
          </el-form-item>
          <el-form-item label="红人账号id" prop="projectBaseInfo.meteChannelAccount">
            <el-input v-model="form.projectBaseInfo.meteChannelAccount" disabled />
          </el-form-item>
          <el-form-item label="二级部门" prop="baseInfo.secondDept">
            <el-select v-model="form.baseInfo.secondDept" clearable filterable>
              <el-option
                v-for="item in enums.secondDeptNameEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="付款事由" prop="baseInfo.reason">
            <el-input
              v-model="form.baseInfo.reason"
              type="textarea"
              placeholder="请输入付款事由"
              clearable
              :rows="5"
            />
          </el-form-item>
          <el-form-item label="品牌" prop="baseInfo.brand">
            <el-select v-model="form.baseInfo.brand" clearable filterable>
              <el-option
                v-for="item in enums.brandEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="广告账户" prop="baseInfo.advertisingAccount">
            <el-select
              v-model="form.baseInfo.advertisingAccount"
              placeholder="广告预充值必选广告账户，非充值则选无"
              clearable
              filterable
            >
              <el-option
                v-for="item in enums.advertisingAccountEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="费用类型" prop="baseInfo.feeType">
            <el-select v-model="form.baseInfo.feeType" clearable filterable>
              <el-option
                v-for="item in enums.feeTypeEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="推广付款类型" prop="baseInfo.promotionPaymentType">
            <el-select v-model="form.baseInfo.promotionPaymentType" clearable filterable>
              <el-option
                v-for="item in enums.promotionPaymentTypeEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="推广产品" props="itemList">
            <p class="tips">请选择该费用对应的品线，如无法区分到品线的，选择ALL</p>
            <el-table :data="form.itemList" :border="true" class="table-wrap">
              <el-table-column label="费用预算管理部门" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].feeAffiliationDept`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.feeAffiliationDept"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in enums.feeAffiliationDeptEnumList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.desc"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="对应销售部门" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].saleDept`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.saleDept"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in enums.saleDeptEnumList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.desc"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="对应销售人员" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].saleCode`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.saleCode"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in memberList"
                        :key="item.memberCode"
                        :value="item.memberCode"
                        :label="item.name"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="平台" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].platform`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.platform"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in enums.platformEnumList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.desc"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="店铺" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].shop`"
                    :rules="{ required: true, message: '请输出入', trigger: ['blur', 'change'] }"
                  >
                    <el-input v-model="scope.row.shop" clearable placeholder="必填" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="费用归属品线" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].feeProductLine`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.feeProductLine"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in enums.feeProductLineEnumList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.desc"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="产品名称" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].spuCode`"
                    :rules="{ required: true, message: '请选择', trigger: ['blur', 'change'] }"
                  >
                    <el-select
                      v-model="scope.row.spuCode"
                      placeholder="必选"
                      clearable
                      filterable
                      class="marin-l"
                    >
                      <el-option
                        v-for="item in productSpuList"
                        :key="item.productSpu"
                        :value="item.productSpu"
                        :label="item.name"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="金额" headerAlign="center">
                <template #default="scope">
                  <el-form-item
                    :prop="`itemList[${scope.$index}].amount`"
                    :rules="[{ required: true, message: '请输出入', trigger: ['blur', 'change'] }]"
                  >
                    <el-input
                      v-model="scope.row.amount"
                      type="number"
                      placeholder="必填，请输入数字"
                      @input="calTotalAmount"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" headerAlign="center" width="80px">
                <template #default="scope">
                  <div style="margin-left: 8px">
                    <KeenActions
                      :actions="[
                        {
                          label: '删除',
                          key: 'del',
                          type: 'primary',
                          text: true,
                          row: { ...scope.row, index: scope.$index },
                        },
                        {
                          label: '复制',
                          key: 'copy',
                          type: 'primary',
                          text: true,
                          row: scope.row,
                        },
                      ]"
                      @click="handleActions"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" :icon="Plus" size="small" class="add-pro" @click="addItem">
              增加推广产品
            </el-button>
          </el-form-item>
          <el-form-item label="总付款金额" prop="baseInfo.totalAmount">
            <el-input v-model="form.baseInfo.totalAmount" type="number" disabled />
          </el-form-item>
          <el-form-item label="我司支付单位" prop="baseInfo.payCompany">
            <el-select v-model="form.baseInfo.payCompany" clearable filterable>
              <el-option
                v-for="item in enums.payCompanyEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="货币单位" prop="baseInfo.currencyCode">
            <CurrencySelect v-model="form.baseInfo.currencyCode" />
          </el-form-item>
          <el-form-item label="汇率" prop="currencyRate">
            <el-input :value="currencyRate" disabled />
          </el-form-item>
          <el-form-item label="人民币总金额" prop="rmbTotalAmount">
            <el-input :value="rmbTotalAmount" disabled />
          </el-form-item>
          <el-form-item label="付款方式" prop="baseInfo.payType">
            <el-select v-model="form.baseInfo.payType" clearable filterable>
              <el-option
                v-for="item in enums.payTypeEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
            <p class="tips">
              请务必选择正确的付款方式：比如若支付给收款方的银行公户，请选择银行转账
            </p>
          </el-form-item>
          <el-form-item label="国家" prop="baseInfo.country">
            <CountrySelect v-model="form.baseInfo.country" clearable filterable />
          </el-form-item>
          <el-form-item label="支付日期" prop="baseInfo.payTime">
            <el-date-picker
              type="date"
              placeholder="请选择支付日期"
              value-format="YYYY-MM-DD HH:mm:ss"
              v-model="form.baseInfo.payTime"
              clearable
              filterable
            />
          </el-form-item>
          <el-form-item label="支付对象" prop="baseInfo.payObj">
            <el-input v-model="form.baseInfo.payObj" />
          </el-form-item>
          <el-form-item
            label="开户行支行"
            prop="baseInfo.payBank"
            :rules="[
              {
                required: +form.baseInfo.payType === 2,
                message: '请输入开户行支行',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input
              placeholder="请填写开户行（银行转账必填）"
              v-model="form.baseInfo.payBank"
              clearable
              filterable
            />
          </el-form-item>
          <el-form-item label="支付账户" prop="baseInfo.payAccount">
            <el-input
              placeholder="请填写收款电邮账户"
              v-model="form.baseInfo.payAccount"
              clearable
              filterable
            />
          </el-form-item>
          <el-form-item label="KOL推广渠道（必填）" prop="baseInfo.kolChannelType">
            <el-select v-model="form.baseInfo.kolChannelType" multiple clearable filterable>
              <el-option
                v-for="item in enums.kolChannelTypeEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="KOL上线链接（选填）" prop="">
            <el-input v-model="form.baseInfo.kolUpLink" clearable />
          </el-form-item>
          <el-form-item label="所属营销项目名称（选填）" prop="">
            <el-select
              v-model="form.baseInfo.projectType"
              placeholder="仅市场推广组更新，如无则不填"
              clearable
              filterable
            >
              <el-option
                v-for="item in enums.projectTypeEnumList"
                :key="item.value"
                :value="item.value"
                :label="item.desc"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="附件" prop="baseInfo.attList">
            <KeenFileUpload
              class="packing-upload"
              :multiple="true"
              v-model="attList"
              directory="erp/template"
              :limit="100"
              ref="uploadRef1"
            >
              <el-button type="primary" :icon="Plus" size="small">添加附件</el-button>
            </KeenFileUpload>
          </el-form-item>
          <!-- <el-form-item label="图片" prop="baseInfo.urlList">
            <Uploader v-model="urlList" :limit="9" /> -->
          <!-- <div
              v-for="(item, index) in 9"
              :key="index"
              :class="[
                'mr-20',
                form.baseInfo.urlList &&
                form.baseInfo.urlList[index] &&
                (!form.baseInfo.urlList[index].fileUrl ||
                  !form.baseInfo.urlList[index].fileUrl.includes('http')) &&
                isSaveDraft
                  ? 'mt-45'
                  : '',
              ]"
            >
              <div v-if="form.baseInfo.urlList && index < form.baseInfo.urlList.length">
                <KeenImageUpload
                  v-model="form.baseInfo.urlList[index].fileUrl"
                  directory="station/cooperate"
                  @upload-success="handleImgUploadSuc"
                />
              </div>
            </div> -->
          <!-- </el-form-item> -->
          <el-form-item label="备注" prop="baseInfo.remark">
            <el-input
              type="textarea"
              placeholder="请输入想对审批人说的话（选填）"
              :rows="5"
              v-model="form.baseInfo.remark"
            />
          </el-form-item>
          <el-form-item class="tips-txt-wrap">
            <div class="tips-txt">付airwallex请提供以下信息:</div>
            <div class="tips-txt">ACH routing number:</div>
            <div class="tips-txt">Bank Name:</div>
            <div class="tips-txt">swift code:</div>
            <div class="tips-txt">Account number:</div>
            <div class="tips-txt">Account name:</div>
            <div class="tips-txt">Address:</div>
            <div class="tips-txt">City: State:</div>
            <div class="tips-txt">Zip code:</div>
            <div class="tips-txt">Bank Address:</div>
            <div class="tips-txt">付款给国内个人麻烦提供对方身份证</div>
          </el-form-item>
        </el-form>
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <el-space>
            <el-button @click="save(true)" :loading="loading.draft">保存草稿</el-button>
            <el-button type="primary" @click="save(false)" :loading="loading.submit">
              提交
            </el-button>
          </el-space>
        </div>
      </el-tab-pane>
      <el-tab-pane name="list" label="站外推广费用申请审批明细">
        <KeenList>
          <el-table v-loading="listLoading" :data="listData?.recordList">
            <el-table-column label="年季" prop="quarterOfYear" min-width="120px" />
            <el-table-column label="年月" prop="monOfyear" />
            <el-table-column label="年周" prop="weekOfYear" min-width="200px" />
            <el-table-column label="排重" prop="num" />
            <!-- <el-table-column label="工单编号" prop="recordCode" min-width="200px" /> -->
            <el-table-column label="审批编号" prop="recordCode" min-width="200px" />
            <el-table-column label="工单主题" prop="subject" min-width="180px" />
            <el-table-column label="节点状态" prop="statusDesc" />
            <el-table-column label="OA完成时间" prop="finishTime" min-width="180px" />
            <el-table-column label="发起人姓名" prop="creator" min-width="100px" />
            <el-table-column label="发起人部门" prop="secondDeptName" min-width="120px" />
            <el-table-column label="支付日期（年月日）" prop="payYearMonDay" min-width="150px" />
            <el-table-column label="支付年月" prop="payYearMon" min-width="120px" />
            <el-table-column label="付款事由" prop="reason" min-width="150px" />
            <el-table-column label="品牌" prop="brandDesc" min-width="120px" />
            <el-table-column label="费用类型" prop="feeTypeDesc" min-width="120px" />
            <el-table-column
              label="推广付款类型"
              prop="promotionPaymentTypeDesc"
              min-width="120px"
            />
            <el-table-column
              label="费用预算管理部门"
              prop="feeAffiliationDeptDesc"
              min-width="200px"
            />
            <el-table-column label="对应销售部门" prop="saleDeptDesc" min-width="150px" />
            <el-table-column label="对应销售人员" prop="saler" min-width="120px" />
            <el-table-column label="店铺" prop="shop" min-width="120px" />
            <el-table-column label="费用归属品线" prop="feeProductLineDesc" min-width="150px" />
            <el-table-column label="产品名称" prop="productName" min-width="180px" />
            <el-table-column label="金额" prop="amount" />
            <el-table-column label="付款金额（人民币）" prop="payAmountRmb" min-width="140px" />
            <el-table-column label="付款金额（美元）" prop="payAmountUsd" min-width="140px" />
            <el-table-column label="总付款金额" prop="totalAmount" />
            <el-table-column label="我司支付单位" prop="payCompanyDesc" min-width="200px" />
            <el-table-column label="货币单位" prop="currencyDesc" min-width="120px" />
            <el-table-column label="人民币汇率" prop="rmbRate" min-width="100px" />
            <el-table-column label="美元汇率" prop="usdRate" min-width="100px" />
            <el-table-column label="付款方式" prop="payTypeDesc" min-width="100px" />
            <el-table-column label="国家" prop="countryDesc" min-width="100px" />
            <el-table-column label="所属地区" prop="localArea" min-width="100px" />
            <el-table-column label="支付账户" prop="payAccount" min-width="100px" />
            <el-table-column label="付款银行" prop="payBank" min-width="100px" />
            <el-table-column label="kol推广渠道" prop="kolChannelTypeDesc" min-width="120px" />
            <el-table-column label="kol上线链接" prop="kolUpLink" min-width="200px" />
            <el-table-column
              label="所属营销项目名称（选填）"
              prop="projectTypeDesc"
              min-width="180px"
            />
            <el-table-column label="备注" prop="remark" min-width="200px" />

            <el-table-column label="操作" min-width="180px" fixed="right">
              <template #default="{ row }">
                <KeenActions
                  display-style="buttons"
                  :actions="[
                    {
                      label: '再次提交',
                      key: 'resubmit',
                      type: 'primary',
                      text: true,
                      row: row,
                    },
                    {
                      label: '详情',
                      key: 'detail',
                      type: 'primary',
                      hide: !row?.workFlowCode,
                      row: row,
                    },
                  ]"
                  @click="handleSubmit"
                />
              </template>
            </el-table-column>
          </el-table>
          <KeenPagination
            :current="current"
            :page-size="pageSize"
            :page-size-option="pageSizeOption"
            :total="total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </KeenList>
      </el-tab-pane>
    </el-tabs>
  </KeenCard>
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs';
  import { ElMessage, FormRules } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import { metaApi, MetaApi, memberApi, productApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import CooperateFee from '../components/cooperatefee.vue';

  const props = defineProps<{
    projectCode: string;
    projectDetail: Object;
  }>();

  const activeTab = ref('cooperate');
  const formRef = ref();
  const form = ref({
    baseInfo: {},
    projectBaseInfo: {},
    itemList: [],
  });
  const enums = ref({});
  const rules = reactive<FormRules>({
    'baseInfo.projectCode': [{ required: true, message: '请输入合作事项id', trigger: ['blur'] }],
    'baseInfo.secondDept': [
      { required: true, message: '请选择二级部门', trigger: ['blur', 'change'] },
    ],
    'baseInfo.reason': [{ required: true, message: '请输入付款事由', trigger: ['blur', 'change'] }],
    'baseInfo.brand': [{ required: true, message: '请输入品牌', trigger: ['blur', 'change'] }],
    'baseInfo.advertisingAccount': [
      { required: true, message: '请选择广告账户', trigger: ['blur', 'change'] },
    ],
    'baseInfo.feeType': [
      { required: true, message: '请选择费用类型', trigger: ['blur', 'change'] },
    ],
    'baseInfo.promotionPaymentType': [
      { required: true, message: '请选择推广付款类型', trigger: ['blur', 'change'] },
    ],
    'baseInfo.totalAmount': [
      { required: true, message: '请输入总付款金额', trigger: ['blur', 'change'] },
    ],
    'baseInfo.payCompany': [
      { required: true, message: '请选择我司支付单位', trigger: ['blur', 'change'] },
    ],
    'baseInfo.currencyCode': [
      { required: true, message: '请选择货币单位', trigger: ['blur', 'change'] },
    ],
    'baseInfo.payType': [
      { required: true, message: '请选择付款方式', trigger: ['blur', 'change'] },
    ],
    'baseInfo.country': [{ required: true, message: '请选择国家', trigger: ['blur', 'change'] }],
    'baseInfo.payTime': [
      { required: true, message: '请选择支付日期', trigger: ['blur', 'change'] },
    ],
    'baseInfo.payObj': [{ required: true, message: '请输入支付对象', trigger: ['blur', 'change'] }],
    'baseInfo.payAccount': [
      { required: true, message: '请输入支付账户', trigger: ['blur', 'change'] },
    ],
    'baseInfo.kolChannelType': [
      { required: true, message: '请选择KOL推广渠道', trigger: ['blur', 'change'] },
    ],
  });
  // 新增产品字段
  const proItem = ref({
    feeAffiliationDept: '',
    amount: null,
    saleDept: '',
    shop: '',
    spuCode: '',
    saleCode: '',
    feeProductLine: '',
    platform: '',
  });
  const attList = ref([]);
  const isSaveDraft = ref(false);

  const querySampleOrderList = async () => {
    const res = await metaApi.luteosMetaV3SampleorderQueryList({
      projectCode: props?.projectCode,
      pageNum: 1,
      pageSize: 1,
    });
    return res.recordList || [];
  };
  //   设置默认值
  const setDefaultVal = async () => {
    const recordList: any = await querySampleOrderList();
    const recordInfo: any = recordList[0] || {};
    form.value.baseInfo.payCompany = String(1);
    form.value.baseInfo.advertisingAccount = String(1);
    form.value.baseInfo.country = recordInfo.buyerCountryCode;
    form.value.baseInfo.kolChannelType = props.projectDetail.kolChannelType || undefined;
    form.value.baseInfo.kolUpLink = props.projectDetail.kolUpLink;
    // 生成商品记录
    if (props.projectDetail?.productList && props.projectDetail?.productList.length) {
      form.value.itemList = [];
      props.projectDetail?.productList.forEach((item) => {
        const data: any = { ...proItem.value };
        data.spuCode = item.productCode;
        form.value.itemList.push(data);
      });
    }
  };
  // 汇率
  const currencyRate = computed(() => {
    if (
      form.value.baseInfo.currencyCode &&
      enums.value.rmbCurrencyEnumList &&
      enums.value.rmbCurrencyEnumList.length > 0
    ) {
      const rateInfo =
        enums.value.rmbCurrencyEnumList.find(
          (item) => item.desc === form.value.baseInfo.currencyCode
        ) || {};
      return rateInfo.value;
    }
    return '';
  });

  // 人名币总金额 = 汇率 * 总付款金额
  const rmbTotalAmount = computed(() => {
    if (
      form.value.baseInfo.totalAmount !== null &&
      form.value.baseInfo.totalAmount !== undefined &&
      enums.value.rmbCurrencyEnumList &&
      enums.value.rmbCurrencyEnumList.length > 0 &&
      currencyRate.value
    ) {
      return parseFloat(Number(form.value.baseInfo.totalAmount) * Number(currencyRate.value));
    }
    return '';
  });

  // 查询草稿
  const queryDart = async (query, newInfo = {}) => {
    const res = await metaApi.luteosMetaPprQueryDraftAndEnums(query);
    form.value.baseInfo = Object.assign(res.baseInfo || {}, newInfo);
    form.value.projectBaseInfo = res.projectBaseInfo || {};
    if (form.value.baseInfo.projectCode) {
      isSaveDraft.value = true;
    } else {
      setDefaultVal();
    }

    // 默认当前日期，没有保存草稿
    if (!form.value.baseInfo.payTime) {
      form.value.baseInfo.payTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }

    form.value.baseInfo.projectCode = props.projectCode;
    form.value.itemList = res.itemList || [];
    enums.value = res.enums || {};
    // 初始化产品
    if (!form.value.itemList || (form.value.itemList && !form.value.itemList.length)) {
      form.value.itemList = [];
      form.value.itemList.push({ ...proItem.value });
    }
    // 附件回显
    if (res.baseInfo && res.baseInfo.attList && res.baseInfo.attList.length) {
      res.baseInfo.attList.forEach((item) => {
        attList.value.push({
          name: item.fileName,
          ossKey: item.ossKey,
          status: 'success',
          percentage: 100,
        });
      });
    } else {
      attList.value = [];
    }
    // 初始化图片
    // if (form.value.baseInfo && form.value.baseInfo.urlList && form.value.baseInfo?.urlList.length) {
    //   urlList.value = form.value.baseInfo.urlList.map((item) => item.fileUrl);
    // }

    setTimeout(() => {
      formRef.value.clearValidate();
    }, 0);
  };

  onMounted(() => {
    queryDart({ projectCode: props?.projectCode });
  });

  // 销售人员
  const memberList = ref<any[]>([]);
  const getMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    memberList.value = res.memberList || [];
  };
  getMemberList();
  // 查询spu
  const spuList = ref([]);
  const querySpuList = async () => {
    const res = await productApi.luteosProductQueryProductList({
      pageNum: 1,
      pageSize: 1000,
    });
    spuList.value = res?.productBeanList?.map((item) => {
      return {
        productSpu: item.productSpu,
        name: item.name,
      };
    });
  };
  querySpuList();

  const productSpuList = computed(() => {
    let list = enums.value.otherProductEnumList || [];
    list = list.map((item) => {
      return {
        productSpu: item.value,
        name: item.desc,
      };
    });
    return [...spuList.value, ...list];
  });

  // 按钮操作
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'del') {
      form.value.itemList.splice(row.index, 1);
    } else if (key === 'copy') {
      const data: any = {
        feeAffiliationDept: row.feeAffiliationDept,
        amount: row.amount,
        saleDept: row.saleDept,
        shop: row.shop,
        spuCode: row.spuCode,
        saleCode: row.saleCode,
        feeProductLine: row.feeProductLine,
        platform: row.platform,
      };
      if (checkRequire(data, '请填写完整信息再继续操作复制')) {
        form.value.itemList.push(data);
      }
    }
    calTotalAmount();
  };

  const router = useRouter();
  function handleSubmit({ key, row }) {
    if (key === 'resubmit') resubmit(row);
    else if (key === 'detail')
      router.push({
        path: '/myEvents/detail',
        query: { code: row.workFlowCode },
      });
  }

  function resubmit(row) {
    queryDart(
      { projectCode: row.projectCode, code: row.code },
      {
        payTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        code: undefined,
      }
    );

    // form.value = data;
    activeTab.value = 'apply';
  }
  // 校验是否必填
  const checkRequire = (data: any, tips: string) => {
    if (
      !data.feeAffiliationDept ||
      !data.amount ||
      !data.saleDept ||
      !data.shop ||
      !data.spuCode ||
      !data.saleCode ||
      !data.feeProductLine ||
      !data.platform
    ) {
      if (tips) {
        ElMessage.error(tips);
      }
      return false;
    }
    return true;
  };
  // 新增产品
  const addItem = () => {
    if (form.value.itemList && !form.value.itemList.length) {
      form.value.itemList.push({ ...proItem.value });
      return;
    }
    if (
      checkRequire(form.value.itemList[form.value.itemList.length - 1], '请填写完整再增加推广产品')
    ) {
      form.value.itemList.push({ ...proItem.value });
    }
  };

  // 统计总金额
  const calTotalAmount = () => {
    if (!form.value.itemList || !form.value.itemList.length) {
      form.value.baseInfo.totalAmount = 0;
      return;
    }
    let totalAmount = 0;
    form.value.itemList.forEach((item) => {
      if (item.amount) {
        totalAmount += parseFloat(item.amount);
      }
    });
    form.value.baseInfo.totalAmount = totalAmount;
  };

  const loading = ref({
    draft: false,
    submit: false,
  });
  const loadingKey = ref('');

  const save = async (isDraft) => {
    if (isDraft) {
      loadingKey.value = 'draft';
      submit(isDraft);
      return;
    }

    loadingKey.value = 'submit';
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }

      submit(isDraft);
    });
  };

  const submit = async (isDraft) => {
    // 附件
    form.value.baseInfo.attList = attList.value.map((item) => {
      return {
        fileName: item.name,
        ossKey: item.ossKey,
      };
    });
    // 图片
    // form.value.baseInfo.urlList = [];
    // urlList.value.forEach((item) => {
    //   const data = {
    //     fileName: item,
    //     ossKey: item,
    //   };
    //   form.value.baseInfo.urlList.push(data);
    // });

    if (!isDraft && !form.value.itemList.length) {
      ElMessage.error('请添加推广产品');
      return;
    }
    const data: any = {
      baseInfo: { ...form.value.baseInfo },
      itemList: form.value.itemList,
      isDraft,
    };

    loading.value[loadingKey.value] = true;

    const res = await metaApi.luteosMetaPprSaveOrUpdate(data).finally(() => {
      loading.value[loadingKey.value] = false;
    });
    if (res) {
      ElMessage.success(isDraft ? '保存草稿成功' : '提交成功');
      if (!isDraft) {
        activeTab.value = 'list';
        refreshList();
      }
    }
  };

  const PAGE_SIZE = 10;

  const {
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
  } = useList<
    MetaApi.LuteosMetaPprQueryList.RequestQuery,
    MetaApi.LuteosMetaPprQueryList.ResponseBody
  >({
    searchDefaults: {
      projectCode: props?.projectCode,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaPprQueryList,
  });
</script>

<style scoped lang="scss">
  .tips {
    height: 30px;
    color: #c1b9b9;
    font-size: 13px;
    margin-bottom: 10px;
  }

  .tips-txt-wrap {
    margin-top: -10px;
  }

  .tips-txt {
    height: 20px;
    width: 100%;
    color: #c1b9b9;
    font-size: 13px;
  }

  .marin-l {
    margin-left: 5px;
  }

  .add-pro {
    margin-top: 10px;
  }

  .table-wrap {
    :deep(.el-table__body-wrapper) {
      border-bottom: 1px solid #f4f4f4;
    }

    :deep(.el-form-item__error) {
      position: absolute;
      margin-left: 10px;
      padding-top: 0px;
      top: 63px;
      left: 0px;
    }

    :deep(.el-table__body) {
      height: 120px;
    }

    :deep(.el-form-item__content) {
      margin-top: -10px;
      height: 80px;
    }
  }

  .mr-20 {
    margin-right: 20px;
  }

  .mt-45 {
    margin-top: -45px;
  }
</style>
