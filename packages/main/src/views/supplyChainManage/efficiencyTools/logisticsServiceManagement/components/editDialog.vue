<template>
  <el-drawer
    class="detail-drawer"
    v-model="visible"
    direction="rtl"
    :size="isFullscreen ? '100%' : 1200"
    :show-close="false"
    :close-on-click-modal="title.type === 'detail'"
    :close-on-press-escape="false"
    @opened="handleDrawerOpened"
    @closed="handleDrawerClosed"
    @close="handleDrawerBeforeClosed"
  >
    <template #header>
      <div class="detail-title">
        <div class="t1">{{ title.name }}</div>
      </div>
      <div class="header-actions">
        <SvgIcon v-if="isFullscreen" @click.stop="isFullscreen = false" icon="recoverscreen" />
        <SvgIcon v-else @click.stop="isFullscreen = true" icon="fullscreen" />
        <el-divider direction="vertical" :style="{ height: '10px' }" />
        <SvgIcon class="cursor-point" icon="close" @click.stop="handleDrawerBeforeClosed" />
      </div>
    </template>
    <el-form :model="form" label-width="130" label-position="right" ref="formRef">
      <div class="detail-title2">基本信息</div>
      <div class="tabwrap">
        <div class="wrap1">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="服务商名称:"
                :rules="[{ required: true, message: '请输入服务商名称', trigger: ['blur'] }]"
              >
                <span v-if="title.type === 'detail'">{{ form.supplierName || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.supplierName"
                  maxlength="50"
                  show-word-limit
                  placeholder="请输入服务商名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="shortName" label="服务商简称:">
                <span v-if="title.type === 'detail'">{{ form.shortName || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.shortName"
                  maxlength="20"
                  show-word-limit
                  placeholder="请输入服务商简称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务商编码:">
                <span v-if="title.type === 'detail'">{{ form.supplierCode || '-' }}</span>
                <el-input v-else v-model="form.supplierCode" disabled placeholder="系统生成" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="categoryDesc" label="服务商分类:">
                <span v-if="title.type === 'detail'">{{ form.categoryDesc || '-' }}</span>
                <el-select
                  v-model="form.category"
                  placeholder="请选择服务商分类"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in classifyList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="服务商状态:"
                :rules="[{ required: true, message: '请选择服务商状态', trigger: ['change'] }]"
              >
                <span v-if="title.type === 'detail'">{{ form.lifecycleStatusDesc || '-' }}</span>
                <el-select
                  v-model="form.lifecycleStatus"
                  placeholder="请选择服务商状态"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="serviceScope"
                label="服务范围:"
                :rules="[{ required: true, message: '请选择服务范围', trigger: ['change'] }]"
              >
                <span v-if="title.type === 'detail'">{{ form.serviceScopeText || '-' }}</span>
                <el-select
                  v-model="form.serviceScope"
                  placeholder="请选择服务范围"
                  clearable
                  multiple
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  v-else
                >
                  <el-option
                    v-for="item in rangeList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="systemIntegrationAbility"
                label="系统对接能力:"
                :rules="[{ required: true, message: '请选择系统对接能力', trigger: ['change'] }]"
              >
                <span v-if="title.type === 'detail'">
                  {{ form.systemIntegrationAbilityDesc || '-' }}
                </span>
                <el-select
                  v-model="form.systemIntegrationAbility"
                  placeholder="请选择系统对接能力"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in abilityList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="nature" label="服务商性质:">
                <span v-if="title.type === 'detail'">{{ form.natureDesc || '-' }}</span>
                <el-select
                  v-model="form.nature"
                  placeholder="请选择服务商性质"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in natureList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="legalPerson" label="法人:">
                <span v-if="title.type === 'detail'">{{ form.legalPerson || '-' }}</span>
                <el-input v-else v-model.trim="form.legalPerson" placeholder="请输入法人" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="establishedDate" label="成立日期:">
                <span v-if="title.type === 'detail'">{{ form.establishedDate || '-' }}</span>
                <el-date-picker
                  v-model="form.establishedDate"
                  type="date"
                  placeholder="成立日期"
                  value-format="YYYY-MM-DD"
                  format="YYYY-MM"
                  style="width: 100%"
                  v-else
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="registeredCapitalWan" label="注册资本(万元):">
                <span v-if="title.type === 'detail'">{{ form.registeredCapitalWan || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.registeredCapitalWan"
                  placeholder="请输入注册资本(万元)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="enterpriseScale" label="企业规模:">
                <span v-if="title.type === 'detail'">{{ form.enterpriseScaleDesc || '-' }}</span>
                <el-input v-else v-model.trim="form.enterpriseScale" placeholder="请输入企业规模" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="representativeClients" label="代表性客户:">
                <span v-if="title.type === 'detail'">{{ form.representativeClients || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.representativeClients"
                  placeholder="请输入代表性客户"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                prop="hasBadRecord"
                label="有不良记录:"
                :rules="[{ required: true, message: '请选择有不良记录', trigger: ['blur'] }]"
              >
                <span v-if="title.type === 'detail'">{{ form.hasBadRecordDesc || '-' }}</span>
                <el-radio-group v-model="form.hasBadRecord" v-else>
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="badRecordDesc" label="不良记录说明:">
                <span v-if="title.type === 'detail'">{{ form.badRecordDesc || '-' }}</span>
                <el-input
                  v-else
                  v-model="form.badRecordDesc"
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                  placeholder="请输入不良记录说明"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="companyAddress" label="公司地址:">
                <span v-if="title.type === 'detail'">{{ form.companyAddress || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.companyAddress"
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  placeholder="请输入公司地址"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="warehouseAddress" label="仓库地址:">
                <span v-if="title.type === 'detail'">{{ form.warehouseAddress || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.warehouseAddress"
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  placeholder="请输入仓库地址"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-title2">
        联系人信息
        <el-button
          class="button update"
          :disabled="false"
          type="primary"
          @click="batchUpdateVisible = true"
        >
          导入
        </el-button>
      </div>
      <div class="tabwrap w-100">
        <div class="wrap1">
          <el-table ref="tableRef" :data="form.contacts">
            <el-table-column label="联系人" prop="contactName" />
            <el-table-column label="联系电话" prop="contactPhone" />
            <el-table-column label="邮箱" prop="contactEmail" />
            <el-table-column label="默认联系人" prop="isDefaultDesc" />
            <el-table-column label="性别" prop="contactGenderDesc" />
            <el-table-column label="部门" prop="contactDepartment" />
            <el-table-column label="职位" prop="contactPosition" />
            <el-table-column label="备注" prop="remark" />
            <el-table-column label="操作" fixed="right" min-width="80">
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
        </div>
      </div>
      <div class="detail-title2">资质信息</div>
      <div class="tabwrap">
        <div class="wrap1">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:">
                <span v-if="title.type === 'detail'">
                  {{ form.unifiedSocialCreditCode || '-' }}
                </span>
                <el-input
                  v-else
                  v-model.trim="form.unifiedSocialCreditCode"
                  placeholder="请输入统一社会信用代码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="一般经营项目:">
                <span v-if="title.type === 'detail'">{{ form.generalBusinessScope || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.generalBusinessScope"
                  placeholder="请输入一般经营项目"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执牌资质:">
                <span v-if="title.type === 'detail'">{{ form.licensedQualification || '-' }}</span>
                <el-input
                  v-else
                  v-model.trim="form.licensedQualification"
                  placeholder="请输入执牌资质"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="货运代理等级:">
                <span v-if="title.type === 'detail'">
                  {{ form.freightForwardingLevelDesc || '-' }}
                </span>
                <el-select
                  v-model="form.freightForwardingLevel"
                  placeholder="请选择货运代理等级"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in freightList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="空运代理等级:">
                <span v-if="title.type === 'detail'">
                  {{ form.airFreightAgentLevelDesc || '-' }}
                </span>
                <el-select
                  v-model="form.airFreightAgentLevel"
                  placeholder="请选择空运代理等级"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in airLiftList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直接订舱权:">
                <span v-if="title.type === 'detail'">
                  {{ form.directBookingRightDesc || '-' }}
                </span>
                <el-select
                  v-model="form.directBookingRight"
                  placeholder="请选择直接订舱权"
                  clearable
                  filterable
                  v-else
                >
                  <el-option label="是" :value="1" />
                  <el-option label="否" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-title2">结算信息</div>
      <div class="tabwrap">
        <div class="wrap1">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="账单周期:">
                <span v-if="title.type === 'detail'">{{ form.billingCycleDesc || '-' }}</span>
                <el-input v-else v-model.trim="form.billingCycle" placeholder="请输入账单周期" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="账单币种:">
                <span v-if="title.type === 'detail'">{{ form.billingCurrency || '-' }}</span>
                <CurrencySelect v-model="form.billingCurrency" v-else />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算币种:">
                <span v-if="title.type === 'detail'">{{ form.settlementCurrency || '-' }}</span>
                <CurrencySelect v-model="form.settlementCurrency" v-else />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行:">
                <span v-if="title.type === 'detail'">{{ form.bankName || '-' }}</span>
                <el-input v-else v-model.trim="form.bankName" placeholder="请输入开户行" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行代码:">
                <span v-if="title.type === 'detail'">{{ form.bankCode || '-' }}</span>
                <el-input v-else v-model.trim="form.bankCode" placeholder="请输入银行代码" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户名:">
                <span v-if="title.type === 'detail'">{{ form.accountName || '-' }}</span>
                <el-input v-else v-model.trim="form.accountName" placeholder="请输入开户名" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票类型:">
                <span v-if="title.type === 'detail'">{{ form.invoiceTypeDesc || '-' }}</span>
                <el-select
                  v-model="form.invoiceType"
                  placeholder="请选择发票类型"
                  clearable
                  filterable
                  v-else
                >
                  <el-option
                    v-for="item in invoiceList"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <!-- <el-button
          v-if="title.type !== 'detail'"
          type="primary"
          @click="submitData"
          v-loading="submitLoading"
        >
          提交
        </el-button> -->
      </span>
    </template>
    <BatchImportModal
      ref="importModalRef"
      v-if="batchUpdateVisible"
      :visible="batchUpdateVisible"
      title="导入"
      :isCustomTemplate="true"
      :isCustomUpload="true"
      @get-custom-template="getCustomTemplate"
      @close="close"
      @custom-upload="customUpload"
    />
  </el-drawer>
</template>

<script setup lang="ts">
  import { tmsApi } from '@/api';
  import { ElMessage, FormInstance } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { urlDownload } from '@/utils/download';

  const props = defineProps<{
    title: {
      name?: string;
      type?: string;
    };
  }>();

  const emit = defineEmits(['success']);
  const isFullscreen = ref(false);
  const visible = ref(false);
  const submitLoading = ref(false);
  const classifyList = [
    { value: 'partner_coop', label: '合作供应商' },
    { value: 'strategic', label: '战略供应商' },
  ];
  const statusList = [
    { value: 'in_development', label: '开发中' },
    { value: 'intro_approval', label: '引入审批中' },
    { value: 'cooperating', label: '合作中' },
    { value: 'cooperation_suspended', label: '暂停合作' },
    { value: 'phased_out', label: '已淘汰' },
  ];
  const rangeList = [
    { value: 'air', label: '空运' },
    { value: 'sea', label: '海运' },
    { value: 'express', label: '快递' },
    { value: 'road', label: '陆运' },
    { value: 'fba', label: 'FBA' },
    { value: 'customs_declaration', label: '报关' },
    { value: 'customs_clearance', label: '清关' },
    { value: 'local_delivery', label: '本地派送' },
  ];
  const abilityList = [
    { value: 1, label: '自有研发团队' },
    { value: 2, label: '第三方研发团队' },
    { value: 3, label: '无' },
  ];
  const natureList = [
    { value: 1, label: '有限责任公司' },
    { value: 2, label: '股份有限公司' },
    { value: 3, label: '有限合伙企业' },
    { value: 4, label: '外商独资公司' },
    { value: 5, label: '个人独资企业' },
    { value: 6, label: '国有独资公司' },
    { value: 7, label: '其他' },
  ];
  const freightList = [
    { value: 1, label: '无' },
    { value: 2, label: '一级货运代理' },
    { value: 3, label: '二级货运代理' },
  ];
  const airLiftList = [
    { value: 1, label: '无' },
    { value: 2, label: '一级空运代理' },
    { value: 3, label: '二级空运代理' },
  ];
  const invoiceList = [
    { value: 1, label: '普通发票' },
    { value: 2, label: '增值税普通发票' },
    { value: 3, label: '增值税专用发票' },
    { value: 3, label: '形式发票' },
  ];

  // 表单定义
  const formRef = ref<FormInstance>();
  const initFormData = {
    supplierName: '',
    supplierCode: '',
  };
  const form = ref({ ...initFormData });
  const supplierId = ref();
  const importModalRef = ref();

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      supplierId.value = row.id;
      getSupplierDetail(row.id);
    } else {
      form.value = { ...initFormData };
    }
  };
  const getSupplierDetail = async (id) => {
    const res = await tmsApi.tmsLogisticsSupplierDetail({ id: id });
    form.value = { ...res.basic, ...res.qualification, ...res.settlement };
    form.value.contacts = res.contacts;
    if (form.value?.serviceScope?.length) {
      const text = form.value?.serviceScope.map((i) => i.desc);
      Reflect.set(form.value, 'serviceScopeText', text.join(','));
    }
  };
  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const getCustomTemplate = async () => {
    // 区域表导入模板
    const res = await tmsApi.tmsCommonFileQueryImportTemplate({
      importScene: 'logistics_supplier_contact_import',
    });
    return res?.templateUrl ? urlDownload(res?.templateUrl as string) : '';
  };
  // 关闭导入弹窗
  const close = (isConfirm: boolean) => {
    batchUpdateVisible.value = false;
    if (isConfirm) {
      setTimeout(() => {
        getSupplierDetail(supplierId.value);
      }, 1000);
    }
  };
  const customUpload = async (fileList) => {
    importModalRef.value.loading = true;
    try {
      const res = await tmsApi.tmsCommonFileImportData({
        fileName: fileList[0].name,
        key: fileList[0].ossKey,
        extInfo: supplierId.value,
        importScene: 'logistics_supplier_contact_import',
      });
      if (res) {
        ElMessage.success('导入成功');
        setTimeout(() => {
          getSupplierDetail(supplierId.value);
        }, 1000);
      }
    } finally {
      importModalRef.value.loading = false;
      batchUpdateVisible.value = false;
    }
  };
  // 新增|编辑
  const submitData = async () => {
    const validRes = await formRef?.value?.validate();
    if (!validRes) return;

    // try {
    //   submitLoading.value = true;
    //   if (props.title.type === 'add') {
    //     await tmsApi.luteosErpLogisticsSupplierAdd(form.value);
    //   } else {
    //     await tmsApi.luteosErpLogisticsSupplierUpdate({
    //       supplierCode: form.value.supplierCode,
    //       supplierName: form.value.supplierName,
    //       status: form.value.status,
    //       supplierType: form.value.supplierType,
    //     });
    //   }
    //   ElMessage.success('保存成功');
    //   emit('success');
    // } finally {
    //   visible.value = false;
    //   submitLoading.value = false;
    // }
  };
  const handleDrawerOpened = () => {};

  const handleDrawerClosed = () => {
    visible.value = false;
  };
  const handleActions = async (item) => {
    console.log(item);
    const { key, index, row } = item;
    if (key === 'del') {
      const isConfirmed = await swal.confirm(`确认删除吗？`);
      // return;
      if (isConfirmed) {
        await tmsApi.tmsLogisticsSupplierContactDelete({
          contactId: row.id,
          supplierId: supplierId.value,
        });
        ElMessage.success('删除成功');
        form.value.contacts.splice(index, 1);
      }
    }
  };
  const handleDrawerBeforeClosed = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .detail-title {
    height: 56px;
    background-color: #fff;
    line-height: 56px;
    padding: 0 20px;
    display: flex;
    color: #1f1f1f;
    .t1 {
      color: #1f1f1f;
      font-size: 16px;
      font-family: 'PingFang SC Medium';
    }
  }
  .detail-title2 {
    color: #1f1f1f;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    line-height: 24px;
    padding: 26px 20px 7px;
    background-color: white;
  }
  .wrap1 {
    padding-bottom: 14px;
    border-bottom: solid 1px #f5f5f5;
  }
  .tabwrap {
    padding: 0 20px;
    overflow: auto;
  }
  .header-actions {
    display: flex;
    align-items: center;
    color: var(---N9, #1f1f1f);
    font-size: 20px;
    cursor: pointer;
    .svg-icon {
      font-size: 20px;
      display: inline-flex;
      &:hover {
        color: var(---C4, #02b96b);
      }
      :deep(svg) {
        height: 1.45rem;
        width: 1.45rem;
      }
    }
    .cursor-point {
      margin-right: 20px;
    }
  }
  .update {
    float: right;
  }
  .w-100 {
    width: 100%;
  }
</style>

<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      padding: 0 !important;
      margin: 0 !important;
    }
    .el-drawer__body {
      padding: 0 !important;
    }
  }
</style>
