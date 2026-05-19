<template>
  <el-form
    :model="form"
    label-width="140px"
    class="demand-form mt-5"
    :rules="rules"
    ref="formRef"
    :validate-on-rule-change="false"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 意向资源 -->
        <el-form-item
          prop="customer"
          label="意向资源"
          v-if="form.intentionResource && form.intentionResource.length"
        >
          <div class="d-flex align-items-center gap-2 w-100">
            <el-input v-model="form.intentionResource" :disabled="true" class="flex-1" />
            <el-button v-if="form.intentionResource" type="primary" @click="resourceMatch">
              查看全部
            </el-button>
          </div>
        </el-form-item>
        <!-- 需求创建人 -->
        <el-form-item prop="creator" label="需求创建人">
          <DeptMember v-model="form.creator" :maxCollapseTags="1" disabled />
        </el-form-item>
        <el-form-item label="所在部门">
          <div class="d-flex align-items-center gap-2" style="height: 32px">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span>{{ form.deptNameStr || '--' }}</span>
          </div>
        </el-form-item>
        <!-- 需求对接人 -->
        <el-form-item prop="demandContact" label="需求对接人" v-if="showBoth">
          <DeptMember
            v-model="form.demandContact"
            :maxCollapseTags="1"
            :teleported="true"
            @change="handleContactMemberChange"
            :disabled="mode === 'view'"
          />
        </el-form-item>
        <!-- 需求所属部门 -->
        <el-form-item label="需求所属部门" v-if="showBoth">
          <div class="d-flex align-items-center gap-2" style="height: 32px">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <!-- 需求所属部门 -->
            <span>{{ form.contactDeptName || '--' }}</span>
          </div>
        </el-form-item>
        <!-- 品牌名称待确认、主推产品 -->
        <el-form-item label="品牌名称" v-if="showBoth" prop="brandCodeList">
          <el-select
            v-model="form.brandCodeList"
            clearable
            filterable
            placeholder="请选择品牌名称"
            collapse-tags
            collapse-tags-tooltip
            max-collapse-tags="5"
            :disabled="mode === 'view'"
          >
            <el-option
              v-for="item in brandCodeList"
              :key="item?.brandCode"
              :label="item?.brandName"
              :value="item?.brandCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="主推产品" v-if="showBoth" prop="mainProductLink">
          <el-input
            v-model="form.mainProductLink"
            :placeholder="form.mainProductLink ? '' : '请附带产品官网链接'"
            :disabled="mode === 'view'"
          />
        </el-form-item>
        <!-- 产品分类，待确认 -->
        <el-form-item label="产品分类" v-if="showBoth" prop="categoryCode">
          <el-select v-model="form.categoryCode" :disabled="mode === 'view'">
            <el-option
              v-for="item in productCategoryList"
              :key="item?.categoryCode"
              :label="item?.categoryName"
              :value="item?.categoryCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="estimatedBudget" label="预估预算" v-if="showBoth">
          <el-input
            v-model="form.estimatedBudget"
            placeholder="请输入预估预算"
            :disabled="props.mode === 'view'"
            @input="onInputBudget"
            class="budget-input"
          >
            <template #append>
              <CurrencySelect v-model="form.currencyCode" :disabled="props.mode === 'view'" />
            </template>
          </el-input>
        </el-form-item>
        <!-- 投放国家 -->
        <el-form-item prop="countryCode" label="投放国家" v-if="showBoth">
          <CountrySelect
            class="w-100"
            v-model="form.countryCode"
            clearable
            placeholder="投放国家"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <!-- 资源类型：专家资源；机构资源；媒体资源 -->
        <el-form-item label="资源类型" prop="resourceType" v-if="showMedia">
          <el-select v-model="form.resourceType" disabled placeholder="请选择资源类型">
            <el-option
              v-for="(value, key) in ResourceTypeMap"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="demandTypeList" label="需求类型" v-if="showMedia">
          <el-select
            v-model="form.demandTypeList"
            multiple
            :disabled="props.mode === 'view'"
            value-key="demandType"
            placeholder="请选择需求类型"
            collapse-tags
            collapse-tags-tooltip
            max-collapse-tags="3"
            @change="handleDemandTypeChange"
          >
            <el-option
              v-for="opt in demandTypeOptions"
              :key="opt.demandType"
              :label="opt.demandTypeDesc"
              :value="opt"
            />
          </el-select>
          <div class="d-flex flex-column" style="margin-top: 10px" v-if="props.mode === 'create'">
            <span
              class="tips"
              style="color: #999; font-size: 12px; margin-left: 10px; line-height: 2"
            >
              需求类型为通稿时，期望完成时间至少为14天后；
            </span>
            <span
              class="tips"
              style="color: #999; font-size: 12px; margin-left: 10px; line-height: 2"
            >
              需求类型为赢得媒体时，期望完成时间至少为3个月后；
            </span>
            <span
              class="tips"
              style="color: #999; font-size: 12px; margin-left: 10px; line-height: 2"
            >
              需求类型为付费媒体（单一和多平台）时，期望完成时间至少为2个月后
            </span>
          </div>
        </el-form-item>

        <!-- 合作类型：通稿；测评；榜单；软文；其他 -->
        <el-form-item prop="cooperationTypeList" label="合作类型" v-if="showMedia">
          <!-- 媒体合作类型 -->
          <el-select
            v-model="form.cooperationTypeList"
            multiple
            :disabled="props.mode === 'view'"
            value-key="cooperationType"
            placeholder="请选择合作类型"
          >
            <el-option
              v-for="opt in cooperationTypeOptions"
              :key="opt.cooperationType"
              :label="opt.cooperationTypeDesc"
              :value="opt"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="cooperationType" label="合作类型" v-if="showBoth">
          <!-- 专家合作类型 -->
          <el-select
            v-model="form.cooperationType"
            :disabled="props.mode === 'view'"
            placeholder="请选择合作类型"
          >
            <el-option
              v-for="(value, key) in ExpertCooperationType"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="showBoth && form.cooperationType === 'COOP_OTHER'"
          prop="cooperationDesc"
          class="mt-2"
          style="margin-left: -12px"
        >
          <template #default>
            <span
              :class="{ 'visiblility-hidden': props.mode === 'view' }"
              style="color: #f56c6c; margin-right: 4px"
            >
              *
            </span>
            <el-input
              type="textarea"
              autosize
              maxlength="200"
              show-word-limit
              v-model="form.cooperationDesc"
              placeholder="请输入其他合作类型"
              style="flex: 1"
              :disabled="props.mode === 'view'"
            />
          </template>
        </el-form-item>

        <!-- 专家类型 -->
        <el-form-item prop="expertTypeList" label="专家类型" v-if="showExpert">
          <el-cascader
            v-model="form.expertTypeList"
            style="width: 100%"
            multiple
            popper-class="expert-type-cascader"
            :options="expertListForCascader"
            filterable
            collapse-tags
            collapse-tags-tooltip
            clearable
            :max-collapse-tags="1"
            :props="{
              value: 'expertType',
              label: 'expertTypeDesc',
              children: 'children',
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: true,
              emitPath: false,
            }"
            :disabled="props.mode === 'view'"
            @change="handleExpertTypeChange"
          />
        </el-form-item>
        <el-form-item prop="orgTypeList" label="机构类型" v-if="showInstitution">
          <el-cascader
            v-model="form.orgTypeList"
            style="width: 100%"
            multiple
            popper-class="expert-type-cascader"
            :options="expertListForCascader"
            filterable
            collapse-tags
            collapse-tags-tooltip
            clearable
            :max-collapse-tags="1"
            :props="{
              value: 'expertType',
              label: 'expertTypeDesc',
              children: 'children',
              expandTrigger: 'hover',
              multiple: true,
              checkStrictly: true,
              emitPath: false,
            }"
            :disabled="props.mode === 'view'"
            @change="handleOrgTypeChange"
          />
        </el-form-item>
        <!-- 期望合作时间 -->
        <el-form-item prop="expectedCooperationDate" label="期望合作时间" v-if="showBoth">
          <el-date-picker
            v-model="form.expectedCooperationDate"
            type="daterange"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            style="width: 100%"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <!-- 合作周期 -->
        <el-form-item prop="cooperationPeriodDate" label="合作周期" v-if="showBoth">
          <el-date-picker
            v-model="form.cooperationPeriodDate"
            type="daterange"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            style="width: 100%"
            :disabled-date="disabledCooperationPeriodDate"
            :default-value="getCooperationPeriodDefaultDate()"
          />
        </el-form-item>
        <!-- 媒体分类 -->
        <el-form-item prop="mediaCategoryList" label="媒体分类" v-if="showMedia">
          <el-select
            v-model="form.mediaCategoryList"
            placeholder="请选择媒体分类"
            :disabled="props.mode === 'view'"
            multiple
          >
            <el-option
              v-for="(value, key) in MediaCategoryMap"
              :key="key"
              :label="value"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <!-- 投放国家：北美；英国；法国；德国；亚太；其他 -->
        <el-form-item prop="countryCode" label="投放国家" v-if="showMedia">
          <CountrySelect
            class="w-100"
            v-model="form.countryCode"
            clearable
            placeholder="投放国家"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <!-- 预估预算 -->
        <el-form-item prop="estimatedBudget" label="预估预算" v-if="showMedia">
          <el-input
            v-model="form.estimatedBudget"
            placeholder="请输入预估预算"
            :disabled="props.mode === 'view'"
            @input="onInputBudget"
          >
            <template #append>
              <el-input
                v-model="form.budgetUnit"
                placeholder="请选择预算单位"
                disabled
                style="width: 115px"
              ></el-input>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="sampleDeliveryTime" label="预计发样时间" v-if="showMedia">
          <el-date-picker
            v-model="form.sampleDeliveryTime"
            type="daterange"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :disabled="props.mode === 'view'"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item prop="productNameList" label="推广产品" v-if="showMedia">
          <el-select
            v-model="form.productNameList"
            placeholder="请选择推广产品"
            clearable
            multiple
            collapse-tags
            max-collapse-tags="6"
            filterable
            :disabled="props.mode === 'view'"
            @change="handleCategoryChange"
            v-if="props.mode !== 'view'"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.productCode"
              :label="item.productTitle"
              :value="item.productCode"
            />
          </el-select>
          <el-input
            v-model="form.productNameList"
            placeholder="请输入推广产品"
            :disabled="true"
            v-else
          />
        </el-form-item>
        <!-- 产品所属品牌，自动带出，不可编辑，待定 -->
        <el-form-item prop="brandCodeList" label="产品所属品牌" v-if="showMedia">
          <el-input v-model="form.brandCodeList" placeholder="-" :disabled="true" />
        </el-form-item>
        <!-- 产品上市时间 -->
        <el-form-item prop="productOnlineTime" label="产品上市时间" v-if="showMedia">
          <el-date-picker
            v-model="form.productOnlineTime"
            type="daterange"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            :disabled-date="disabledDate"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求标题" prop="demandTitle">
          <el-input
            v-model="form.demandTitle"
            maxlength="50"
            show-word-limit
            placeholder="请输入需要推广的产品/项目"
            type="textarea"
            :autosize="true"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <el-form-item label="需求背景" prop="demandBackground">
          <el-input
            type="textarea"
            v-model="form.demandBackground"
            maxlength="500"
            show-word-limit
            placeholder="请输入需求背景"
            :disabled="props.mode === 'view'"
            :rows="3"
            :autosize="true"
          />
        </el-form-item>
        <!-- 需求内容 -->
        <el-form-item label="需求内容" prop="demandContent" v-if="showBoth">
          <el-input
            type="textarea"
            v-model="form.demandContent"
            maxlength="500"
            show-word-limit
            placeholder="填写项目资料（项目方案/产品Brief/文章/文章Brief）以及备注说明"
            :disabled="props.mode === 'view'"
            :rows="3"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="需求描述" prop="demandDesc" v-if="showMedia">
          <el-input
            type="textarea"
            v-model="form.demandDesc"
            maxlength="2000"
            show-word-limit
            placeholder="此处可以补充需求内容 & 描述期望得到的结果"
            :rows="5"
            :disabled="props.mode === 'view'"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="期望完成时间" prop="expectFinishTime" v-if="showMedia">
          <el-date-picker
            v-model="form.expectFinishTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            :disabled-date="disabledDateByDemandType"
            :default-value="getDefaultDateByDemandType()"
          />
        </el-form-item>
        <el-form-item label="上传附件">
          <KeenFileUpload
            ref="upload"
            v-model="form.demandFile"
            directory="fileCenter"
            class="file-upload demand-file-upload"
            :disabled="props.mode === 'view'"
            showOperate
            multiple
            :limit="5"
            :sizeLimit="157286400"
            drag
            @change="handleFileChange"
          >
            <!-- 选择文件后该区域会消失 -->
            <div class="custom-upload-area" :class="{ 'is-disabled': props.mode === 'view' }">
              <div class="upload-icon-box">
                <el-icon class="upload-cloud-icon">
                  <UploadFilled />
                </el-icon>
              </div>
              <div class="upload-tip-text">
                在此处上传Brief；拖入文件到此处或者点击上传箭头选择文件进行上传
              </div>
            </div>
          </KeenFileUpload>
        </el-form-item>
        <!-- 需求brief模板 -->
        <el-form-item
          prop="demandTemplate"
          label="需求brief模板"
          v-if="showExpert && mode === 'create'"
        >
          <el-button type="text" @click="handleDownloadTemplate">下载模板</el-button>
        </el-form-item>
        <!-- 产品可寄样时间 -->
        <el-form-item label="产品可寄样时间" v-if="showExpert">
          <el-date-picker
            v-model="form.sampleDeliveryTime"
            type="daterange"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            style="width: 100%"
            clearable
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item prop="relatedUsers" label="需求相关人员" v-if="showMedia">
          <el-tooltip
            content="选择的人员在需求状态变更时，评论时，需求完成时均会收到钉钉通知"
            placement="top"
          >
            <DeptMember
              v-model="form.relMemberCodeList"
              multiple
              :maxCollapseTags="5"
              :selfMemberCode="userInfo.deptInfo.memberCode"
              :filterSelf="props.mode === 'create'"
              :disabled="props.mode === 'view'"
              :disabledList="props.mode === 'create' ? form.relMemberCodeList : []"
              placeholder="请选择（多选框可搜索）"
              autoRefocusAfterChange
            />
          </el-tooltip>
        </el-form-item>
        <!-- <el-button @click="router.push(`/brand/demand/dingTalkDetail/D175213669651962902549`)">
          钉钉详情页
        </el-button> -->
      </el-col>
    </el-row>
    <!-- 编辑模式 -->
  </el-form>
  <div class="button-box">
    <template v-if="props.mode === 'create'">
      <el-button type="primary" @click="submitForm" :loading="submitLoading">提交需求</el-button>
      <el-button @click="resourceMatch" class="btn-theme-primary">
        {{ showMedia ? '资源匹配' : '选择意向资源' }}
      </el-button>
    </template>
    <!-- 审批 -->
    <template
      v-else-if="
        (props.mode === 'review' || props.mode === 'view') && props.isEditMode && form.status === 21
      "
    >
      <el-button
        v-if="form?.auth?.auditFlag === 1"
        type="success"
        @click="passDemand"
        :loading="props.passDemandLoading"
      >
        通过
      </el-button>
      <el-button
        v-if="form?.auth?.auditFlag === 1"
        type="danger"
        @click="rejectDemand"
        :loading="props.passDemandLoading"
      >
        拒绝
      </el-button>
      <el-button @click="cancelForm">取消</el-button>
    </template>
    <template v-else-if="props.mode === 'resubmit'">
      <el-button type="success" @click="resubmitForm" :loading="props.resubmitLoading">
        重新提交
      </el-button>
      <el-button @click="cancelForm">取消</el-button>
    </template>
    <template v-else>
      <el-button @click="cancelForm">返回</el-button>
    </template>
  </div>
  <ApproveDialog ref="approveDialogRef" @submit="handleApproveSubmit" :userInfo="userInfo" />
  <RejectDialog ref="rejectDialogRef" @submit="handleRejectSubmit" />
</template>

<script setup lang="ts">
  import ApproveDialog from '@/views/lute-os/brandDemandMange/components/ApproveDialog.vue';
  import RejectDialog from '@/views/lute-os/demandManage/components/common/RejectDialog.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import {
    CooperationTypeMap,
    CountryMap,
    DemandTypeMap,
    MediaCategoryMap,
    ResourceTypeMap,
    ExpertCooperationType,
  } from '../constants';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { useVModel } from '@vueuse/core';
  import { ElMessage } from 'element-plus';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const formRef = ref();
  const props = defineProps({
    form: { type: Object, default: null },
    expertList: { type: Array, default: () => [] },
    rules: { type: Object, required: true },
    mode: { type: String, default: '' },
    submitForm: { type: Function, required: true },
    isEditMode: { type: Boolean, default: false },
    userInfo: { type: Object, default: null },
    cancelForm: { type: Function, required: false },
    submitLoading: { type: Boolean, default: false },
    resubmitLoading: { type: Boolean, default: false },
    approveAndSubmitLoading: { type: Boolean, default: false },
    passDemandLoading: { type: Boolean, default: false },
    resourceMatch: { type: Function, required: false },
    categoryList: { type: Array, default: () => [] },
    productCategoryList: { type: Array, default: () => [] },
    brandCodeList: { type: Array, default: () => [] },
    scene: { type: String, default: '' },
  });
  const demandTypeOptions = reactive(
    Object.entries(DemandTypeMap).map(([k, v]) => ({
      demandType: Number(k),
      demandTypeDesc: v,
    }))
  );
  const showMedia = computed(() => {
    return props.scene === 'media_resource';
  });
  const showExpert = computed(() => {
    return props.scene === 'expert_resource';
  });
  const showInstitution = computed(() => {
    return props.scene === 'institution_resource';
  });
  const showBoth = computed(() => {
    return props.scene === 'expert_resource' || props.scene === 'institution_resource';
  });
  const expertListForCascader = computed(() => {
    return props.expertList?.expertTypeList || [];
  });
  const depthMap = computed(() => {
    const map = new Map<any, number>();
    function dfs(nodes = [], level = 1) {
      for (const node of nodes) {
        map.set(node.expertType, level);
        if (Array.isArray(node.children) && node.children.length) dfs(node.children, level + 1);
      }
    }
    dfs(expertListForCascader.value, 1);
    return map; // Map(value -> depth)
  });

  function handleExpertTypeChange(newVal: any[]) {
    const prev = prevExpertSelected.value || [];
    // find added values
    const added = newVal.filter((v) => !prev.includes(v));
    let result = [...newVal];
    if (added.length > 0) {
      // 对每个新增项按层级处理
      for (const a of added) {
        const lvl = depthMap.value.get(a) || 3; // 默认为第3层
        if (lvl === 1 || lvl === 2) {
          // 移除 result 中同层（level === lvl）但不是 a 的项，做到“单选”
          result = result.filter((v) => {
            if (v === a) return true;
            const l = depthMap.value.get(v) || 3;
            return l !== lvl; // 只保留不同层的项
          });
        }
        // lvl >=3 不做限制（允许多选）
      }
    } else {
      // 可能是取消选择（removed），直接保持 newVal
      result = newVal;
    }
    // 如果处理后与 newVal 不同，需要把 v-model 覆写为 result
    // 注意：直接写回 form.expertTypeList 以同步 UI
    if (JSON.stringify(result) !== JSON.stringify(newVal)) {
      if (props.scene === 'expert_resource') {
        form.value.expertTypeList = result;
      } else {
        form.value.orgTypeList = result;
      }
      // 更新 prev
      prevExpertSelected.value = [...result];
    } else {
      prevExpertSelected.value = [...newVal];
    }
  }
  function handleOrgTypeChange(newVal: any[]) {
    const prev = prevExpertSelected.value || [];
    // find added values
    const added = newVal.filter((v) => !prev.includes(v));
    let result = [...newVal];
    if (added.length > 0) {
      // 对每个新增项按层级处理
      for (const a of added) {
        const lvl = depthMap.value.get(a) || 3; // 默认为第3层
        if (lvl === 1) {
          // 一级菜单：单选逻辑，移除其他一级菜单
          result = result.filter((v) => {
            if (v === a) return true;
            const l = depthMap.value.get(v) || 3;
            return l !== 1; // 只保留非一级的项
          });

          // 选择一级菜单时，清空所有二级菜单
          result = result.filter((v) => depthMap.value.get(v) !== 2);
        } else if (lvl === 2) {
          // 二级菜单：单选逻辑，移除其他二级菜单
          result = result.filter((v) => {
            if (v === a) return true;
            const l = depthMap.value.get(v) || 3;
            return l !== 2; // 只保留非二级的项
          });

          // 找到二级菜单的父级一级菜单
          const parentLevel1 = findParentLevel1(a, expertListForCascader.value);
          if (parentLevel1) {
            // 清空所有一级菜单，只保留父级一级菜单
            result = result.filter((v) => depthMap.value.get(v) !== 1);
            result.push(parentLevel1);
          }
        }
        // lvl >=3 不做限制（允许多选）
      }
    } else {
      // 可能是取消选择（removed），直接保持 newVal
      result = newVal;
    }

    // 如果处理后与 newVal 不同，需要把 v-model 覆写为 result
    // 注意：直接写回 form.orgTypeList 以同步 UI
    if (JSON.stringify(result) !== JSON.stringify(newVal)) {
      if (props.scene === 'expert_resource') {
        form.value.expertTypeList = result;
      } else {
        form.value.orgTypeList = result;
      }
      // 更新 prev
      prevExpertSelected.value = [...result];
    } else {
      prevExpertSelected.value = [...newVal];
    }
  }

  // 新增辅助函数：查找二级菜单的父级一级菜单
  function findParentLevel1(level2Value: any, nodes: any[]): any {
    for (const node of nodes) {
      if (Array.isArray(node.children)) {
        // 检查当前节点的子节点中是否包含目标二级菜单
        const hasTargetChild = node.children.some((child: any) => child.expertType === level2Value);
        if (hasTargetChild) {
          return node.expertType; // 返回父级一级菜单的值
        }

        // 递归检查更深层的子节点
        const found = findParentLevel1(level2Value, node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
  const cooperationTypeOptions = reactive(
    Object.entries(CooperationTypeMap).map(([k, v]) => ({
      cooperationType: k,
      cooperationTypeDesc: v,
    }))
  );

  // 根据需求类型设置不同的日期限制
  function disabledDateByDemandType(time: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 把当前 demandType 统一转成数组，便于遍历
    const types = Array.isArray(form.value.demandTypeList)
      ? form.value.demandTypeList.map((item) => (typeof item === 'object' ? item.demandType : item))
      : [
          typeof form.value.demandTypeList === 'object'
            ? form.value.demandTypeList.demandType
            : form.value.demandTypeList,
        ];

    // 计算所有被选类型的「最小可选日期」中 *最晚* 的那一天
    const minDate = types.reduce((latest, t) => {
      const d = new Date(today);
      if (t === 0) d.setDate(d.getDate() + 14); // 通稿 ≥14 天
      else if (t === 1) d.setMonth(d.getMonth() + 3); // 赢得媒体 ≥3 月
      else if (t === 2 || t === 3) d.setMonth(d.getMonth() + 2); // 付费媒体 ≥2 月
      return d > latest ? d : latest;
    }, today);

    // 只能选不早于 minDate 的日期
    return time.getTime() < minDate.getTime();
  }
  const handleCategoryChange = (value) => {
    if (value.length > 10) {
      form.value.productNameList = value.slice(0, 10);
      ElMessage.warning('最多选择10个');
      return;
    }
    const selectedBrands = props.categoryList
      .filter((item) => value.includes(item.productCode))
      .map((item) => item.brandCode)
      .filter(Boolean);
    form.value.brandCodeList = Array.from(new Set(selectedBrands));
  };
  function disabledDate(time) {
    // 只允许选择今天及以后
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return time.getTime() < today.getTime();
  }
  const getCooperationPeriodDefaultDate = () => {
    // 91天后
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return [
      new Date(today.getTime() + 91 * 24 * 60 * 60 * 1000),
      new Date(today.getTime() + 91 * 24 * 60 * 60 * 1000),
    ];
  };
  const handleDemandTypeChange = () => {
    form.value.expectFinishTime = '';
  };
  const handleContactMemberChange = (value) => {
    emit('query-demand-contact-department', value);
  };
  const form = useVModel(props, 'form');
  const initPrev = () => {
    if (props.scene === 'expert_resource') {
      return Array.isArray(form.value.expertTypeList) ? [...form.value.expertTypeList] : [];
    } else if (props.scene === 'institution_resource') {
      return Array.isArray(form.value.orgTypeList) ? [...form.value.orgTypeList] : [];
    }
    return [];
  };
  // 记录之前储存的数据
  const prevExpertSelected = ref<any>(initPrev());
  const resubmitForm = async () => {
    // console.log('resubmitForm', form.value);
    emit('resubmit', form.value);
  };
  const approveAndSubmit = async () => {
    emit('approveAndSubmit', form.value);
  };

  const handleDownloadTemplate = () => {
    emit('downloadTemplate');
  };
  const disabledCooperationPeriodDate = (time) => {
    // 只允许选择91天后的日期
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return time.getTime() < today.getTime() + 91 * 24 * 60 * 60 * 1000;
  };
  const onInputBudget = (val) => {
    // 1. 只允许输入数字和一个小数点
    let filtered = val.replace(/[^\d.]/g, '');
    // 2. 不能以小数点开头
    filtered = filtered.replace(/^\./, '');
    // 3. 连续多个点只保留一个
    filtered = filtered.replace(/\.{2,}/g, '.');
    // 4. 只保留第一个小数点
    filtered = filtered.replace('.', '#').replace(/\./g, '').replace('#', '.');
    // 5. 禁止连续0开头（比如00、000），允许0, 0.xxx, 10, 10.1等
    //    只允许 "0" 或 "0.xxx"，不允许"00..."、"01..."
    if (filtered.startsWith('0') && filtered.length > 1 && filtered[1] !== '.') {
      filtered = filtered.replace(/^0+/, ''); // 去掉开头所有0
      if (filtered === '') filtered = '0'; // 如果删完变空了，重置为0
    }
    // 6. 禁止整数部分出现连续0，比如00123
    //    允许 "0.12"、"1.02"
    filtered = filtered.replace(/^0{2,}/, '0');

    form.value.estimatedBudget = filtered;
  };

  const approveDialogRef = ref();
  const rejectDialogRef = ref();
  const emit = defineEmits([
    'passDemand',
    'rejectDemand',
    'approveAndSubmit',
    'resubmit',
    'success',
    'downloadTemplate',
    'query-demand-contact-department',
  ]);
  const passDemand = () => {
    // 如果到第二级审批，则需要弹窗
    if (form.value.auditExecuteInfoFlag === 1) {
      approveDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      // 直接通过不弹窗
      emit('passDemand', form.value);
    }
  };

  // const handleFileChange = (fileList: any) => {
  //   // 由于需要在选择文件后隐藏el-upload，所以需要获取到el-upload的container，然后隐藏
  //   const uploadContainer = document.querySelector('.el-upload.el-upload--text') as HTMLElement;
  //   if (fileList?.length > 0) {
  //     if (uploadContainer) {
  //       uploadContainer.style.display = 'none';
  //     }
  //   } else {
  //     if (uploadContainer) {
  //       uploadContainer.style.display = 'block';
  //     }
  //   }
  // };
  const rejectDemand = () => {
    // 如果到第二级审批，则需要弹窗
    if (form.value.auditExecuteInfoFlag === 1) {
      rejectDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      emit('rejectDemand', form.value);
    }
  };
  const handleApproveSubmit = async (formData: any) => {
    emit('passDemand', formData);
  };
  const handleRejectSubmit = async (formData: any) => {
    emit('rejectDemand', formData);
  };

  // ② 默认日期（仅在未手动选择 expectFinishTime 时生效）
  function getDefaultDateByDemandType() {
    if (form.value.expectFinishTime) return undefined; // 已手动选过则不干预

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 兼容单个对象/数组/空
    const raw = form.value.demandTypeList;
    // 兼容 null、undefined、对象、数组（对象或数字）
    const types = Array.isArray(raw)
      ? raw.map((item) => (typeof item === 'object' ? item.demandType : item))
      : raw
      ? [typeof raw === 'object' ? raw.demandType : raw]
      : [];

    const defaultDate = types.reduce((latest, t) => {
      const d = new Date(today);
      if (t === 0) d.setDate(d.getDate() + 14);
      else if (t === 1) d.setMonth(d.getMonth() + 3);
      else if (t === 2 || t === 3) d.setMonth(d.getMonth() + 2);
      return d > latest ? d : latest;
    }, today);

    // 没选任何类型就不返回默认值
    return types.length > 0 ? defaultDate : undefined;
  }

  defineExpose({
    formRef,
  });
</script>
<style scoped lang="scss">
  @use '../base.scss';

  .button-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-left: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    z-index: 3;
  }

  :deep(.el-input-group__append) {
    padding: 0 !important;
  }
  .visiblility-hidden {
    visibility: hidden !important;
  }
</style>
<style>
  .budget-input .el-input-group__append .el-select {
    margin: 0 !important;
  }
</style>
