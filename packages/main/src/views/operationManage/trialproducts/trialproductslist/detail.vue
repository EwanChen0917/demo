<template>
  <KeenFlex>
    <KeenFlex>
      <template #auto>
        <div class="card card-flush py-4">
          <div class="card-header">
            <div class="card-title">
              <h2>商品信息</h2>
            </div>
          </div>
          <!--begin::Card body-->
          <div class="card-body text-center pt-0">
            <KeenImageUpload
              v-model="form.imageUrl"
              directory="activity/trial"
              tooltip="更改商品图片"
              :disabled="channelCode === 'shopify'"
            />
            <template v-if="channelCode === 'shopify'">
              <div class="text-gray-800 fs-5">{{ form?.productName }}</div>
            </template>
          </div>
          <!--end::Card body-->
        </div>
        <!--begin::Card body-->
        <div class="card card-flush py-4">
          <div class="card-header">
            <div class="card-title">
              <h2>状态</h2>
            </div>
            <div class="card-toolbar">
              <div
                class="rounded-circle w-15px h-15px"
                :class="[form.status ? 'bg-success' : 'bg-light']"
              ></div>
            </div>
          </div>
          <div class="card-body pt-0">
            <el-select v-model="form.status" class="w-100">
              <el-option label="关闭" :value="0" />
              <el-option label="开启" :value="1" />
            </el-select>
          </div>
        </div>
        <!--end::Card body-->
      </template>

      <template #fluid>
        <!--begin::details View-->
        <div class="card">
          <!--begin::Card body-->
          <div class="card-body p-9">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="150"
            >
              <el-form-item label="产品SKU：" prop="skuCode" v-if="channelCode === 'shopify'">
                <span>{{ form?.skuCode }}</span>
              </el-form-item>
              <el-form-item label="商品名称：" v-if="channelCode === 'shopify'">
                <span>{{ form?.productName }}</span>
              </el-form-item>
              <el-form-item
                label="商品名称："
                prop="productName"
                required
                v-if="channelCode === 'amazon'"
              >
                <el-input v-model="form.productName" placeholder="请输入商品名称" />
              </el-form-item>
              <el-form-item label="活动图：" prop="productImageNew" required>
                <KeenImageUpload
                  v-model="form.productImageNew"
                  directory="station/activity"
                  tooltip="选择活动图片"
                />
              </el-form-item>
              <el-form-item label="可申请对象：" prop="applicableUser">
                <el-select disabled v-model="form.applicableUser">
                  <el-option label="完成任务用户" value="fin_task" />
                  <el-option label="所有用户" value="all" />
                </el-select>
              </el-form-item>
              <el-form-item label="试用数量：" prop="totalCount">
                <el-input v-model="form.totalCount" placeholder="请输入试用数量" />
              </el-form-item>
              <el-form-item label="剩余数量：" prop="leftCount">
                <span>{{ form.leftCount }}</span>
              </el-form-item>
              <el-form-item label="试用活动名称：" prop="trialActivity">
                <el-input v-model="form.trialActivity" placeholder="请输入试用活动名称" />
              </el-form-item>
              <el-form-item label="试用描述" prop="trialDesc" required>
                <el-input
                  v-model="form.trialDesc"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                  placeholder="请输入试用描述"
                />
              </el-form-item>
              <el-form-item label="试用要求" prop="trialClaim" required>
                <el-input
                  v-model="form.trialClaim"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                  placeholder="请输入试用要求"
                />
              </el-form-item>
              <el-form-item label="是否签署保密协议" prop="signFlag">
                <el-radio-group v-model="form.signFlag" class="ml-4">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有效时间" prop="time" required>
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="-"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  start-placeholder="年 / 月 / 日"
                  end-placeholder="年 / 月 / 日"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </KeenFlex>
  </KeenFlex>
  <div class="card card-flush mt-10">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title gap-5">
        <el-input v-model="search.userEmail" placeholder="用户邮箱">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
        <el-select v-model="search.status" clearable :teleported="false" placeholder="所有状态">
          <el-option
            v-for="(val, key) in auditStatusMap"
            :key="key"
            :label="val || ''"
            :value="key!"
          />
        </el-select>
        <el-date-picker
          v-model="search.createTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="申请日期"
        />
        <el-button class="button" type="primary" @click="runQuery">查询</el-button>
        <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.tasks"
        row-key="applyCode"
        class-name="table-row-dashed"
      >
        <!--        <el-table-column type="selection" width="40" reserve-selection />-->
        <el-table-column prop="createTime" label="申请日期" />
        <el-table-column prop="userEmail" label="用户邮箱" />
        <el-table-column prop="registerTime" label="注册时间" />
        <el-table-column prop="orderCount" label="订单数" />
        <el-table-column label="状态">
          <template #default="scope">
            <span v-if="scope.row.status === 0" class="badge badge-light-primary">
              {{ auditStatusMap[scope.row.status] }}
            </span>
            <span v-else-if="scope.row.status === 1" class="badge badge-light-success">
              {{ auditStatusMap[scope.row.status] }}
            </span>
            <span v-else-if="scope.row.status === 2" class="badge badge-light-warning">
              {{ auditStatusMap[scope.row.status] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="approverName" label="审核人" />
        <el-table-column prop="approveTime" label="审核时间" />
        <el-table-column label="操作" align="activity">
          <template #default="scope">
            <KeenActions
              v-if="scope.row.status == 0"
              display-style="buttons"
              :actions="[
                {
                  label: '通过',
                  key: 'resolve',
                  type: 'primary',
                  text: true,
                  applyCode: scope.row.applyCode,
                },
                {
                  label: '驳回',
                  key: 'reject',
                  type: 'primary',
                  text: true,
                  applyCode: scope.row.applyCode,
                },
              ]"
              @click="handleActions"
            />
            <div v-else>
              {{ scope.row.operateMessage }}
            </div>
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
    </div>
  </div>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleAttrCancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSaveSubmit">保存</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts" name="trialproductsdetail">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import { activityApi, ActivityApi } from '@/api/index';
  import { decryptByBase64 } from '@/utils/aesTils';
  import type { FormInstance, FormRules } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { PointProductType } from '@/types/api';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const code = decryptByBase64(route.query.code as string);
  const channelCode = route.query.channelCode as string;
  const searchInfo = sessionStorage.getItem('trialSearchInfo') ?? '{}';

  const auditStatusMap = {
    0: '待审核',
    1: '审核通过',
    2: '审核驳回',
  };
  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
    // searchData,
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ActivityApi.LuteosActivityTrialQueryTrialProductCheckTask.RequestQuery,
    ActivityApi.LuteosActivityTrialQueryTrialProductCheckTask.ResponseBody
  >({
    searchDefaults: {
      userEmail: undefined,
      status: undefined,
      createTime: undefined,
      trialCode: code,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: activityApi.luteosActivityTrialQueryTrialProductCheckTask,
  });
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ActivityApi.LuteosActivityTrialSaveTrialProduct.RequestBody>({
    /** 归属渠道, station、amazon */
    channelCode: '',
    /** 创建人 */
    creator: '',
    /**
     * 结束时间
     * @format date-time
     */
    endTime: '',
    /** 图片地址 */
    imageUrl: '',
    /** SPU */
    productCode: '',
    /** 商品名称 */
    productName: '',
    /**
     * 是否签署保密协议 0-否 1-是
     * @format int32
     */
    signFlag: 0,
    /**
     * 开始时间
     * @format date-time
     */
    startTime: '',
    /**
     * 状态 0-关闭 1-开启
     * @format int32
     */
    status: 0,
    /**
     * 总数
     * @format int32
     */
    totalCount: '',
    /** 试用要求 */
    trialClaim: '',
    /** 试用编码 更新时必传 */
    trialCode: '',
    /** 试用描述 */
    trialDesc: '',
    price: '',
    productId: '',
    variantsId: '',
    applicableUser: '',
  });
  const rules = reactive<FormRules>({
    productName: [
      {
        required: true,
        message: '请输入商品名称',
        trigger: ['blur', 'change'],
      },
      {
        max: 100,
        message: '请输入100个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    totalCount: [
      {
        required: true,
        message: '请输入试用数量',
        trigger: ['blur', 'change'],
      },
      { pattern: /^\d{1,8}$/, message: '请输入8位以内数字' },
    ],
    applicableUser: [
      {
        required: true,
        message: '请选择可申请对象',
        trigger: ['change'],
      },
    ],
    trialActivity: [
      {
        required: true,
        message: '请输入试用活动名称',
        trigger: ['blur', 'change'],
      },
      {
        max: 100,
        message: '请输入100个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    trialDesc: [
      {
        required: true,
        message: '请输入试用描述',
        trigger: ['blur', 'change'],
      },
      {
        max: 500,
        message: '请输入500个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    trialClaim: [
      {
        required: true,
        message: '请输入试用要求',
        trigger: ['blur', 'change'],
      },
      {
        max: 500,
        message: '请输入500个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    time: [
      {
        required: true,
        message: '请选择有效时间',
        trigger: ['blur', 'change'],
      },
    ],
    imageUrl: [
      {
        required: true,
        message: '请选择商品图片',
        trigger: 'change',
      },
    ],
    productImageNew: [
      {
        required: true,
        message: '请上传活动图片',
        trigger: ['change'],
      },
    ],
  });

  const { data: trialProductDetail } = useRequest(
    activityApi.luteosActivityTrialQueryTrialProductDetail,
    {
      defaultParams: [
        {
          trialCode: code!,
        },
      ],
    }
  );

  watchEffect(() => {
    const trialProduct = trialProductDetail.value;
    if (trialProduct) {
      Object.keys(trialProduct).forEach((key) => {
        form[key] = trialProduct[key];
      });
      form.time = [form.startTime, form.endTime];
    }
  });

  // 表格操作
  const handleActions = async (item) => {
    const { key, applyCode } = item;
    if (key === 'resolve') {
      const isConfirmed = await swal.resolveConfirm();
      if (!isConfirmed) return;
      auditRun({
        applyCode,
        status: 1,
        remark: document.getElementById('resolve_remark').value,
      });
    } else if (key === 'reject') {
      const isConfirmed = await swal.rejectConfirm();
      if (!isConfirmed) return;
      auditRun({
        applyCode,
        status: 2,
        remark: document.getElementById('reject_reason').value,
      });
    }
  };

  // 审核操作
  const { run: auditRun } = useRequest(activityApi.luteosActivityTrialCheckTrialProductTask, {
    manual: true,
    async onSuccess() {
      ElMessage.success({
        message: '审核成功',
        duration: 5 * 1000,
      });
      await refreshList();
    },
    onError(e) {
      swal.error(`审核失败: ${e.message}`);
    },
  });

  const saveLoading = ref(false);
  const handleSaveSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        form.trialCode = code;
        form.channelCode = channelCode;
        form.startTime = form.time[0] || '';
        form.endTime = form.time[1] || '';
        await activityApi.luteosActivityTrialSaveTrialProduct(form);

        // FIXME 修改交互
        ElMessage.success({
          message: '保存成功',
          duration: 5 * 1000,
        });
        closeTabAndRefresh('trialproducts');
        router.push({
          name: 'trialproducts',
        });
        saveLoading.value = false;
      } catch (e) {
        // do nothing
      } finally {
        saveLoading.value = false;
      }
    }
  };

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'trialproducts',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  const handleAttrCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.back();
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('trialSearchInfo')) sessionStorage.removeItem('trialSearchInfo');
  });
</script>
