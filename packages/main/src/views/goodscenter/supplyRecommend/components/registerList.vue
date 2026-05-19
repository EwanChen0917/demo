<template>
  <el-form ref="formRef" :model="form" label-width="150" scroll-to-error>
    <KeenCard title="注册信息">
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.companyName"
            label="公司注册名称:"
            :rules="[{ required: true, message: '请输入公司注册名称', trigger: 'blur' }]"
          >
            <el-input v-model.trim="form.basicInfo.companyName" placeholder="请输入公司注册名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="经营模式:"
            prop="basicInfo.businessModel"
            :rules="[{ required: true, message: '请选择经营模式', trigger: 'change' }]"
          >
            <el-select
              v-model="form.basicInfo.businessModel"
              placeholder="请选择经营模式"
              filterable
              clearable
            >
              <el-option
                v-for="item in businessModelList"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册地址:">
            <el-input
              v-model.trim="form.basicInfo.registeredAddress"
              placeholder="请输入注册地址"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商网址:">
            <el-input v-model.trim="form.basicInfo.website" placeholder="请输入供应商网址" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业性质:">
            <el-select
              v-model="form.basicInfo.enterpriseNature"
              placeholder="请选择企业性质"
              filterable
              clearable
            >
              <el-option
                v-for="item in companyTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总部地址:">
            <el-input
              v-model.trim="form.basicInfo.headquartersAddress"
              placeholder="请输入总部地址"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="成立时间:"
            prop="basicInfo.establishmentDate"
            :rules="[{ required: true, message: '请选择成立时间', trigger: 'change' }]"
          >
            <el-date-picker
              v-model="form.basicInfo.establishmentDate"
              type="date"
              placeholder="成立时间"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="注册资本（万）:"
            prop="basicInfo.registeredCapital"
            :rules="[{ required: true, message: '请输入注册资本', trigger: 'blur' }]"
          >
            <el-input
              v-model.trim="form.basicInfo.registeredCapital"
              placeholder="请输入注册资本"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实缴资本（万）:">
            <el-input
              v-model.trim="form.basicInfo.contributedCapital"
              placeholder="请输入实缴资本"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否上市:"
            label-width="180"
            prop="basicInfo.isListed"
            :rules="[{ required: true, message: '请选择是否上市', trigger: 'change' }]"
          >
            <el-radio-group v-model.trim="form.basicInfo.isListed">
              <el-radio :value="true">是</el-radio>
              <el-radio :value="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="厂家自评:">
            <el-input
              v-model.trim="form.basicInfo.selfEvaluation"
              :rows="3"
              type="textarea"
              placeholder="从行业情况、自身定位、产品细分、自身技术特点等进行简述"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="基本信息">
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.managementStaffCount"
            label="管理员工人数:"
            :rules="[{ required: true, message: '请输入管理员工人数', trigger: 'blur' }]"
          >
            <NumberInput
              v-model="form.basicInfo.managementStaffCount"
              :precision="0"
              :min="1"
              :max="999999999"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.staffCount"
            label="一线员工人数:"
            :rules="[{ required: true, message: '请输入一线员工人数', trigger: 'blur' }]"
          >
            <NumberInput
              v-model="form.basicInfo.staffCount"
              :precision="0"
              :min="1"
              :max="999999999"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.businessLicenseNumber"
            label="营业执照号码:"
            :rules="[{ required: true, message: '请输入营业执照号码', trigger: 'blur' }]"
          >
            <el-input
              v-model.trim="form.basicInfo.businessLicenseNumber"
              placeholder="请输入营业执照号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="一般纳税人企业:"
            prop="basicInfo.generalTaxpayer"
            :rules="[{ required: true, message: '请选择一般纳税人企业', trigger: 'change' }]"
          >
            <el-select v-model="form.basicInfo.generalTaxpayer" placeholder="请选择一般纳税人企业">
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="总经理:"
            prop="basicInfo.generalManager"
            :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
          >
            <el-input v-model.trim="form.basicInfo.generalManager" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label-width="0"
            label=""
            prop="basicInfo.managerEmail"
            :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              {
                required: true,
                message: '非法输入',
                trigger: ['blur', 'change'],
                pattern: emailRule,
              },
            ]"
          >
            <el-input v-model.trim="form.basicInfo.managerEmail" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label-width="0"
            label=""
            prop="basicInfo.managerPhone"
            :rules="[
              { required: true, message: '请输入手机', trigger: 'blur' },
              {
                required: true,
                message: '非法输入',
                trigger: ['blur', 'change'],
                pattern: phoneRule,
              },
            ]"
          >
            <el-input v-model.trim="form.basicInfo.managerPhone" placeholder="请输入手机" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="0" label="">
            <el-input
              v-model.trim="form.basicInfo.managerTelephone"
              placeholder="座机(区号-电话号码)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.industry"
            label="所属行业:"
            :rules="[{ required: true, message: '请选择所属行业', trigger: 'change' }]"
          >
            <el-select
              v-model="form.basicInfo.industry"
              placeholder="请选择所属行业"
              filterable
              clearable
            >
              <el-option v-for="item in industryList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="业务代表:"
            prop="basicInfo.businessRepresentative"
            :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
          >
            <el-input
              v-model.trim="form.basicInfo.businessRepresentative"
              placeholder="请输入名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label-width="0"
            label=""
            prop="basicInfo.representativeEmail"
            :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              {
                required: true,
                message: '非法输入',
                trigger: ['blur', 'change'],
                pattern: emailRule,
              },
            ]"
          >
            <el-input v-model.trim="form.basicInfo.representativeEmail" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label-width="0"
            label=""
            prop="basicInfo.representativePhone"
            :rules="[
              { required: true, message: '请输入手机', trigger: 'blur' },
              {
                required: true,
                message: '非法输入',
                trigger: ['blur', 'change'],
                pattern: phoneRule,
              },
            ]"
          >
            <el-input v-model.trim="form.basicInfo.representativePhone" placeholder="请输入手机" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="0" label="">
            <el-input
              v-model.trim="form.basicInfo.representativeTelephone"
              placeholder="座机(区号-电话号码)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="股权架构">
      <el-table class="mt-4" :data="form?.equityStructures">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="名字" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            名字
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`equityStructures[${$index}].shareholderName`"
              :rules="[{ required: true, message: '请输入名字', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.shareholderName" placeholder="请输入名字" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="出资额" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            出资额（万元）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`equityStructures[${$index}].investmentAmount`"
              :rules="[{ required: true, message: '请输入出资额', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.investmentAmount"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="占总股本比例（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            占总股本比例（%）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`equityStructures[${$index}].shareRatio`"
              :rules="[{ required: true, message: '请输入占总股本比例', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.shareRatio"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="表决比例（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            表决比例（%）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`equityStructures[${$index}].votingRatio`"
              :rules="[{ required: true, message: '请输入表决比例', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.votingRatio"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="{ row, $index }">
            <div>
              <el-button link type="primary" @click="addRow('equityStructures')" :underline="false">
                添加
              </el-button>
              <el-button
                link
                type="danger"
                @click="remove('equityStructures', $index)"
                :underline="false"
                v-if="$index > 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="体系认证情况">
      <el-table class="mt-4" :data="form?.certifications">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="认证证书" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证证书
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`certifications[${$index}].certificateName`"
              :rules="[{ required: true, message: '请输入认证证书', trigger: 'blur' }]"
            >
              <el-select
                v-model="row.certificateName"
                placeholder="请选择认证证书"
                filterable
                clearable
              >
                <el-option
                  v-for="item in certificateNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="认证情况" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证情况
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`certifications[${$index}].isCertified`"
              :rules="[{ required: true, message: '请选择是否认证情况', trigger: 'change' }]"
            >
              <el-select v-model="row.isCertified" placeholder="请选择是否认证情况">
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="认证编号" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            认证编号
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`certifications[${$index}].certificateNumber`"
              :rules="[{ required: true, message: '请输入认证编号', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.certificateNumber" placeholder="请输入认证编号" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="有效期" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            有效期
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`certifications[${$index}].expDate`"
              :rules="[{ required: true, message: '请选择有效期', trigger: 'blur' }]"
            >
              <el-date-picker
                v-model="row.expDate"
                type="daterange"
                @change="changeExpDate(row)"
                value-format="YYYY-MM-DD HH:mm:ss"
                range-separator="至"
                start-placeholder="有效期开始日期"
                end-placeholder="有效期结束日期"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="{ row, $index }">
            <div>
              <el-button link type="primary" @click="addRow('certifications')" :underline="false">
                添加
              </el-button>
              <el-button
                link
                type="danger"
                @click="remove('certifications', $index)"
                :underline="false"
                v-if="$index > 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="主要生产线">
      <el-table class="mt-4" :data="form?.productionLines">
        <el-table-column label="序号" width="100">
          <template #default="{ row, $index }">
            <div>产品线-{{ $index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column label="产品线" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            产品线
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`productionLines[${$index}].productLine`"
              :rules="[{ required: true, message: '请输入产品线名称', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.productLine" placeholder="请输入产品线名称" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="月产能/单位" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            月产能/单位
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`productionLines[${$index}].monthlyCapacity`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input
                v-model.trim="row.monthlyCapacity"
                placeholder="代理商/贸易商的月产能可以填‘无’"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="月出货量/单位" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            月出货量/单位
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`productionLines[${$index}].monthlyShipment`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.monthlyShipment" placeholder="请输入月出货量/单位" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="主要客户" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            主要客户
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`productionLines[${$index}].majorCustomers`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.majorCustomers" placeholder="多个客户请用‘/’分割" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="拟合作产品线" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            拟合作产品线
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`productionLines[${$index}].cooperationProductLine`"
              :rules="[{ required: true, message: '请选择是否拟合作产品线', trigger: 'change' }]"
            >
              <el-select v-model="row.cooperationProductLine" placeholder="请选择是否拟合作产品线">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="{ row, $index }">
            <div>
              <el-button link type="primary" @click="addRow('productionLines')" :underline="false">
                添加
              </el-button>
              <el-button
                link
                type="danger"
                @click="remove('productionLines', $index)"
                :underline="false"
                v-if="$index > 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="近三年营业额">
      <el-table class="mt-4" :data="form?.turnovers">
        <el-table-column label="年份" width="100">
          <template #default="{ row }">
            <el-input v-model.trim="row.year" placeholder="年份" disabled />
          </template>
        </el-table-column>
        <el-table-column label="营业额" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            营业额
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`turnovers[${$index}].turnover`"
              :rules="[{ required: true, message: '请输入营业额', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.turnover"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="币种" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            币种
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`turnovers[${$index}].currency`"
              :rules="[{ required: true, message: '请选择币种', trigger: 'change' }]"
            >
              <el-select
                v-model="row.currency"
                placeholder="请选择币种"
                filterable
                clearable
                @change="changeCurrency(row.currency, row)"
                style="min-width: 140px"
              >
                <el-option
                  v-for="item in currencyOptions"
                  :key="item.currencyCode"
                  :label="`${item.currencyCode}【${item.currencyName}】` || ''"
                  :value="item.currencyCode!"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="内销占比（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            内销占比（%）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`turnovers[${$index}].domesticSalesRatio`"
              :rules="[{ required: true, message: '请输入内销占比', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.domesticSalesRatio"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="外销占比（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            外销占比（%）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`turnovers[${$index}].exportSalesRatio`"
              :rules="[{ required: true, message: '请输入外销占比', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.exportSalesRatio"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="近三年主要客户">
      <el-table class="mt-4" :data="form?.majorCustomers">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="客户名" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            客户名
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`majorCustomers[${$index}].customerName`"
              :rules="[{ required: true, message: '请输入客户名', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.customerName" placeholder="请输入客户名" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="交易产品" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            交易产品
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`majorCustomers[${$index}].transactionProduct`"
              :rules="[{ required: true, message: '请输入交易产品', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.transactionProduct" placeholder="请输入交易产品" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="年出货量" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            年出货量
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`majorCustomers[${$index}].yearShipment`"
              :rules="[{ required: true, message: '请输入年出货量', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.yearShipment"
                :precision="0"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="销售金额(万)" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            销售金额(万)
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`majorCustomers[${$index}].salesAmount`"
              :rules="[{ required: true, message: '请输入销售金额', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.salesAmount"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="币种" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            币种
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`majorCustomers[${$index}].currency`"
              :rules="[{ required: true, message: '请选择币种', trigger: 'change' }]"
            >
              <el-select
                v-model="row.currency"
                placeholder="请选择币种"
                filterable
                clearable
                @change="changeCurrency(row.currency, row)"
                style="min-width: 140px"
              >
                <el-option
                  v-for="item in currencyOptions"
                  :key="item.currencyCode"
                  :label="`${item.currencyCode}【${item.currencyName}】` || ''"
                  :value="item.currencyCode!"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="{ row, $index }">
            <div>
              <el-button link type="primary" @click="addRow('majorCustomers')" :underline="false">
                添加
              </el-button>
              <el-button
                link
                type="danger"
                @click="remove('majorCustomers', $index)"
                :underline="false"
                v-if="$index > 2"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="竞争对手">
      <el-table class="mt-4" :data="form?.competitors">
        <el-table-column type="index" label="序号" min-width="65" />
        <el-table-column label="公司名（全称）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            公司名（全称）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`competitors[${$index}].companyName`"
              :rules="[{ required: true, message: '请输入公司名', trigger: 'blur' }]"
            >
              <el-input v-model.trim="row.companyName" placeholder="请输入公司名" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="所属国家或地区" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            所属国家或地区
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`competitors[${$index}].countryRegion`"
              :rules="[{ required: true, message: '请选择所属国家或地区', trigger: 'change' }]"
            >
              <el-select
                v-model="row.countryRegion"
                placeholder="请选择所属国家或地区"
                filterable
                clearable
              >
                <el-option
                  v-for="item in countryMap"
                  :key="item.value"
                  :label="item.countryCode + ' - ' + item.countryName"
                  :value="item.countryName"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="市场占有率（%）" min-width="150">
          <template #header>
            <span class="text-danger">*</span>
            市场占有率（%）
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="table-form-item"
              :prop="`competitors[${$index}].marketShare`"
              :rules="[{ required: true, message: '请输入市场占有率（%）', trigger: 'blur' }]"
            >
              <NumberInput
                v-model="row.marketShare"
                :precision="2"
                :min="1"
                :max="999999999"
                controls-position="right"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150px">
          <template #default="{ row, $index }">
            <div>
              <el-button link type="primary" @click="addRow('competitors')" :underline="false">
                添加
              </el-button>
              <el-button
                link
                type="danger"
                @click="remove('competitors', $index)"
                :underline="false"
                v-if="$index > 2"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>

    <KeenCard title="其他信息">
      <el-row>
        <el-col :span="8">
          <el-form-item
            prop="basicInfo.productionMethod"
            label="生产方式:"
            :rules="[{ required: true, message: '请选择生产方式', trigger: 'change' }]"
          >
            <el-radio-group v-model="form.basicInfo.productionMethod">
              <el-radio :value="0">自制</el-radio>
              <el-radio :value="1">代工</el-radio>
              <el-radio :value="2">不生产</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐状态:">
            {{ auditStatusMap[auditRecords?.auditStatus] || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核备注:">
            {{ auditRecords?.auditorRemark || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in form?.auditRecords">
        <el-col :span="8">
          <el-form-item label="推荐供应商:">
            {{ form.basicInfo.companyName || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐时间:">
            {{ item.auditTime || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推荐状态:">
            {{ auditStatusMap[item?.auditStatus] || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSave('draft')">保存</el-button>
      <el-button type="primary" :loading="saveLoadingSub" @click="handleSave('autoSubmit')">
        提交审核
      </el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { erpApi, dataApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import { nextTick } from 'vue';
  import { useTabs } from '@/hooks/tabs';
  import dayjs from 'dayjs';
  import { emailRule, phoneRule } from '@/utils/rulesRegExp';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const router = useRouter();
  const auditStatusMap = {
    INVITED: '待注册',
    REGISTERED: '待审核',
    APPROVED: '审核成功',
    REJECTED: '审核拒绝',
  };
  const businessModelList = [
    { name: '生产制造型', value: 1 },
    { name: '研发设计型', value: 2 },
    { name: '贸易经销型', value: 3 },
    { name: '集成服务型', value: 4 },
    { name: '劳务服务型', value: 5 },
    { name: '平台生态型', value: 6 },
  ];
  const companyTypeList = [
    { name: '国有企业', value: 1 },
    { name: '私营企业', value: 2 },
    { name: '外资企业', value: 3 },
    { name: '中外合资企业', value: 4 },
    { name: '公私合资企业', value: 5 },
  ];
  const industryList = [
    '制造业',
    '电力、热力、燃气及水生产和供应业',
    '建筑业',
    '批发和零售业',
    '交通运输、仓储和邮政业',
    '住宿和餐饮业',
    '信息传输、软件和信息技术服务业',
    '金融业',
    '房地产业',
    '租赁和商务服务业',
    '居民服务、修理和其他服务业',
    '教育',
    '卫生和社会工作',
    '文化、体育和娱乐业',
  ];
  const certificateNameList = [
    'ISO 9001',
    'ISO 14001',
    'ISO 45001',
    'CCC认证',
    '生产许可证',
    'CMMI',
    '企业信用等级',
    '高新技术企业',
    '守合同重信用',
    '海关AEO认证',
    'SA8000',
  ];
  const formRef = ref();
  const form = ref({
    basicInfo: {
      businessLicenseNumber: '',
      businessModel: '',
      businessRepresentative: '',
      companyName: '',
      enterpriseNature: '',
      establishmentDate: '',
      generalManager: '',
      generalTaxpayer: undefined,
      headquartersAddress: '',
      industry: '',
      inviteCode: '',
      isListed: undefined,
      managementStaffCount: undefined,
      managerEmail: '',
      managerPhone: '',
      managerTelephone: '',
      productionMethod: null,
      registeredAddress: '',
      registeredCapital: undefined,
      representativeEmail: '',
      representativePhone: undefined,
      representativeTelephone: '',
      selfEvaluation: '',
      staffCount: undefined,
      website: '',
    },
    certifications: [
      {
        certificateName: '',
        certificateNumber: '',
        isCertified: undefined,
        expDate: undefined,
        supplierCode: '',
      },
    ],
    competitors: [
      {
        companyName: '',
        countryRegion: '中国',
        marketShare: undefined,
        supplierCode: '',
      },
      {
        companyName: '',
        countryRegion: '中国',
        marketShare: undefined,
        supplierCode: '',
      },
      {
        companyName: '',
        countryRegion: '中国',
        marketShare: undefined,
        supplierCode: '',
      },
    ],
    equityStructures: [
      {
        investmentAmount: undefined,
        shareRatio: undefined,
        shareholderName: '',
        supplierCode: '',
        votingRatio: undefined,
      },
    ],
    majorCustomers: [
      {
        currency: 'CNY',
        yearShipment: undefined,
        customerName: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
      {
        currency: 'CNY',
        yearShipment: undefined,
        customerName: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
      {
        currency: 'CNY',
        yearShipment: undefined,
        customerName: undefined,
        salesAmount: undefined,
        supplierCode: '',
        transactionProduct: '',
      },
    ],
    productionLines: [
      {
        cooperationProductLine: undefined,
        majorCustomers: '',
        monthlyCapacity: undefined,
        monthlyShipment: undefined,
        productLine: '',
        supplierCode: '',
      },
    ],
    turnovers: [
      {
        currency: 'CNY',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,
        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 1,
      },
      {
        currency: 'CNY',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,

        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 2,
      },
      {
        currency: 'CNY',
        domesticSalesRatio: undefined,
        exportSalesRatio: undefined,

        supplierCode: '',
        turnover: undefined,
        year: dayjs().format('YYYY') - 3,
      },
    ],
  });

  const saveLoading = ref(false);
  const saveLoadingSub = ref(false);
  const pageType = ref('内部');
  const initData = () => {
    if (route.name === 'supplierRegister') {
      // 外部邀请页
      pageType.value = '外部';
    }
    if (route.name === 'supplyRecommendEdit') {
      // 内部编辑页
      pageType.value = '内部';
    }
  };
  initData();
  // 国家
  const countryMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryMap.value = res?.countryList || [];
  };
  getSiteOptions();
  // 获取币种options
  const currencyOptions = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await erpApi.luteosErpInviteSupplierQueryCurrencyList();
    currencyOptions.value = res.currencyList;
  };
  getCurrencyOptions();

  const changeCurrency = (currency, row) => {
    const obj = currencyOptions.value.find((res) => {
      return res.currencyCode == currency;
    });
    if (obj) {
      row.currencyName = obj.currencyName;
    } else {
      row.currencyName = '';
    }
  };
  const auditRecords = ref({
    auditStatus: '',
    auditorRemark: '',
  });

  const queryDetail = async () => {
    if (!route.query?.code) return;
    form.value.basicInfo.inviteCode = route.query?.code;
    const res = await erpApi.luteosErpInviteSupplierQueryDetail({
      code: route.query?.code as string,
    });
    if (res?.auditRecords?.length) {
      form.value.auditRecords = res?.auditRecords;
      auditRecords.value = res.auditRecords[res.auditRecords?.length - 1];
    }
    if (res?.basicInfo) {
      form.value.basicInfo = res?.basicInfo;
      form.value.basicInfo.inviteCode = route.query?.code;
    }
    if (res?.certifications?.length) {
      form.value.certifications = res?.certifications;
      form.value.certifications.forEach((item) => {
        item.expDate = [item.expDateStart, item.expDateEnd];
      });
    }
    if (res?.competitors?.length) {
      form.value.competitors = res?.competitors;
    }
    if (res?.equityStructures?.length) {
      form.value.equityStructures = res?.equityStructures;
    }
    if (res?.majorCustomers?.length) {
      form.value.majorCustomers = res?.majorCustomers;
    }
    if (res?.productionLines?.length) {
      form.value.productionLines = res?.productionLines;
    }
    if (res?.turnovers?.length) {
      form.value.turnovers = res?.turnovers;
    }
  };

  nextTick(() => {
    queryDetail();
  });

  const cancel = async () => {
    const confirm = await swal.confirm('确定取消吗？');
    if (confirm) {
      closeTabAndRefresh('supplyRecommend');
      router.push({
        name: 'supplyRecommend',
      });
    }
  };
  // 移除产品信息
  const remove = (type, index: number) => {
    form.value[type].splice(index, 1);
  };
  // 有效期字段赋值
  const changeExpDate = (row) => {
    if (row.expDate) {
      row.expDateStart = row.expDate[0];
      row.expDateEnd = row.expDate[1];
    } else {
      row.expDateStart = '';
      row.expDateEnd = '';
    }
  };

  // 添加信息
  const addRow = (type) => {
    switch (type) {
      case 'equityStructures': // 股权架构
        form.value.equityStructures.push({
          investmentAmount: undefined,
          shareRatio: undefined,
          shareholderName: '',
          supplierCode: '',
          votingRatio: undefined,
        });
        break;
      case 'certifications': // 体系认证情况
        form.value.certifications.push({
          investmentAmount: undefined,
          shareRatio: undefined,
          shareholderName: '',
          supplierCode: '',
          votingRatio: undefined,
          expDate: undefined,
        });
        break;
      case 'productionLines': // 主要生产线
        form.value.productionLines.push({
          cooperationProductLine: undefined,
          majorCustomers: '',
          monthlyCapacity: undefined,
          monthlyShipment: undefined,
          productLine: '',
          supplierCode: '',
        });
        break;
      case 'turnovers': // 近三年营业额
        form.value.turnovers.push({
          currency: 'CNY',
          domesticSalesRatio: undefined,
          exportSalesRatio: undefined,
          supplierCode: '',
          turnover: undefined,
          year: dayjs().format('YYYY') - 1,
        });
        break;
      case 'majorCustomers': // 近三年主要客户
        form.value.majorCustomers.push({
          currency: 'CNY',
          customerName: undefined,
          yearShipment: undefined,
          salesAmount: undefined,
          supplierCode: '',
          transactionProduct: '',
        });
        break;
      case 'competitors': // 竞争对手
        form.value.competitors.push({
          companyName: '',
          countryRegion: '中国',
          marketShare: undefined,
          supplierCode: '',
        });
        break;

      default:
        break;
    }
  };
  const handleSave = async (type) => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    if (type == 'draft') {
      console.log(form.value);
      try {
        saveLoading.value = true;
        if (pageType.value == '外部') {
          // 无需token
          await erpApi.luteosErpInviteSupplierSaveTemp(form.value);
        } else {
          // 需token
          await erpApi.luteosErpInviteSupplierSave(form.value);
        }
        ElMessage.success('保存成功');
        saveLoading.value = false;
        if (pageType.value == '内部') {
          closeTabAndRefresh('supplyRecommend');
          router.push({
            name: 'supplyRecommend',
            query: { refresh: 1 },
          });
        } else {
          window.location.reload();
        }
      } catch (e: any) {
        ElMessage.error(e.message || '保存失败');
      } finally {
        saveLoading.value = false;
      }
    }
    if (type == 'autoSubmit') {
      try {
        saveLoadingSub.value = true;
        if (pageType.value == '外部') {
          // 无需token
          await erpApi.luteosErpInviteSupplierSubmitReviewTemp(form.value);
        } else {
          // 需token
          await erpApi.luteosErpInviteSupplierSubmitReview(form.value);
        }
        ElMessage.success('提交成功');
        saveLoadingSub.value = false;
        if (pageType.value == '内部') {
          closeTabAndRefresh('supplyRecommend');
          router.push({
            name: 'supplyRecommend',
            query: { refresh: 1 },
          });
        } else {
          window.location.reload();
        }
      } catch (e: any) {
        ElMessage.error(e.message || '提交失败');
      } finally {
        saveLoadingSub.value = false;
      }
    }
  };
  onMounted(() => {});
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;
      font-size: 12px;
    }
  }

  .el-form-item {
    :deep(.el-select .el-select__wrapper) {
      min-width: 120px;
    }
  }
</style>
