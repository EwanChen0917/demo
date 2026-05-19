<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="任务名称"
        prop="name"
        :rules="[{ required: true, message: '任务名称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" maxlength="50" show-word-limit :disabled="isDisabledForm" />
      </el-form-item>
      <el-form-item
        label="品牌"
        prop="brandCode"
        :rules="[{ required: true, message: '品牌不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.brandCode"
          placeholder="请选择"
          filterable
          :disabled="isDisabledForm"
        >
          <template v-for="item in brandList" :key="item.brandCode">
            <el-option :label="item.brandName" :value="item.brandCode" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item
        label="产品分类"
        prop="productCategoryCode"
        :rules="[{ required: true, message: '产品分类不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.productCategoryCode"
          placeholder="请选择"
          filterable
          :disabled="isDisabledForm"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="任务清单"
        prop="productList"
        :rules="[{ required: true, message: '任务清单不能为空', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.productList"
          type="textarea"
          placeholder="请附上共享盘链接"
          :disabled="isDisabledProductList"
          :rows="4"
        />
      </el-form-item>
      <el-form-item label="产品等级" prop="productLevel">
        <el-select v-model="form.productLevel" placeholder="请选择" :disabled="isDisabledForm">
          <el-option
            v-for="item in pdtLevelList"
            :key="item.designPdtLevelCode"
            :label="item.name"
            :value="item.designPdtLevelCode"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="项目标签" prop="itemTag">
        <el-input
          v-model="form.itemTag"
          placeholder="添加标签"
          maxlength="20"
          show-word-limit
          :disabled="isDisabledForm"
        />
      </el-form-item>

      <el-form-item label="项目类型" prop="itemTag">
        <el-select
          v-model="form.itemType"
          placeholder="请选择"
          :disabled="!([2, 4, 5].includes(form.status) && designDirectorFlag)"
        >
          <el-option
            v-for="item in projectList"
            :key="item.type"
            :label="item.text"
            :value="item.type"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间" prop="contactEmail">
        <span>{{ form.startDate }}</span>
      </el-form-item>
      <el-form-item
        label="截止时间"
        prop="endDate"
        :rules="[{ required: true, message: '截止时间不能为空', trigger: 'blur' }]"
      >
        <el-date-picker
          :disabled="isDisabledEndDate"
          v-model="form.endDate"
          type="date"
          placeholder="请选择"
          value-format="YYYY-MM-DD"
          style="width: 250px"
        />
      </el-form-item>
      <template v-if="[4, 5, 6].includes(form.status)">
        <el-form :model="form" label-width="120px">
          <!-- 已完成展示拆解任务，认领和转让展示设计类型 -->
          <el-form-item :label="form.status === 6 ? '拆解任务' : '设计类型'">
            <el-button
              v-if="form.status !== 6"
              :disabled="form.status === 6"
              type="primary"
              size="mini"
              @click="addTaskType"
            >
              添加设计类型
            </el-button>
          </el-form-item>
          <div :class="['score-list', form.status === 6 ? 'mt-60' : '']">
            <div class="score-list-item" v-for="(item, index) in form.designScoreList" :key="index">
              <!-- 认领是非必填，完成时必填 -->
              <el-form-item
                label=""
                :prop="`designScoreList[${index}].designScoreCode`"
                :rules="[
                  {
                    required: form.status === 5 ? true : false,
                    message: '设计类型不能为空',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-select
                  v-model="item.designScoreCode"
                  placeholder="请选择设计类型"
                  @change="handleScoreChange($event, index)"
                  :disabled="isDisabledScore"
                  clearable
                >
                  <template v-for="scoreItem in designScoreList" :key="scoreItem.designScoreCode">
                    <el-option
                      v-if="+scoreItem.status === 1"
                      :label="scoreItem.name"
                      :value="scoreItem.designScoreCode"
                      :disabled="designScoreSelectArr.includes(scoreItem.designScoreCode)"
                    />
                  </template>
                </el-select>
                <el-button
                  v-if="form.status !== 6"
                  type="text"
                  class="del-txt"
                  @click="delTaskType(index)"
                  :disabled="form.designScoreList.length === 1"
                >
                  删除
                </el-button>
                <el-input v-model="item.score" disabled style="width: 100px; margin: 0 20px" />
              </el-form-item>
              <el-form-item
                label=""
                :prop="`designScoreList[${index}].num`"
                style="margin-left: -110px"
                :rules="[{ required: true, message: '数量不能为空', trigger: 'blur' }]"
              >
                <el-input
                  v-model="item.num"
                  placeholder="数量"
                  style="width: 100px"
                  :disabled="isDisabledScore"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </template>
      <el-form-item label="任务状态" prop="contactEmail">
        <span>{{ form.statusDesc }}</span>
      </el-form-item>
      <!-- 展示下拉框则不展示设计师 -->
      <el-form-item
        v-if="!showDesignSelect"
        :label="isShowTransBtn || form.transferDesignerDesc ? '原设计师' : '设计师'"
        prop="contactEmail"
      >
        <span>{{ form.designerDesc }}</span>
      </el-form-item>
      <!-- 转让任务-选择设计师 -->

      <el-form-item
        v-if="isShowTransBtn"
        label="转让设计师"
        prop="transferDesignerCode"
        :rules="[{ required: true, message: '转让设计师不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.transferDesignerCode"
          clearable
          filterable
          placeholder="请选择设计师"
          :disabled="isDisabledTransfer"
        >
          <el-option
            v-for="item in designerMemberList"
            :key="item.designer"
            :label="item.designerDesc"
            :value="item.designer"
          />
        </el-select>
      </el-form-item>
      <!-- 指派任务-选择设计师, 这里因为需要局部启用，所以这里需要嵌套el-form表单 -->
      <el-form-item
        v-if="showDesignSelect"
        label="设计师"
        prop="designerCode"
        :rules="[{ required: true, message: '设计师不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.designerCode"
          clearable
          filterable
          placeholder="请选择设计师"
          :disabled="isDisabledForm"
        >
          <el-option
            v-for="item in designerMemberList"
            :key="item.designer"
            :label="item.designerDesc"
            :value="item.designer"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发起人" prop="contactEmail">
        <span>{{ form.initiatorDesc }}</span>
      </el-form-item>

      <el-form-item label="转让设计师" prop="contactEmail" v-if="form.transferDesignerDesc">
        <span>{{ form.transferDesignerDesc }}</span>
      </el-form-item>

      <el-form-item label="驳回原因" v-if="form.status === 5 && form.rejectReason">
        <span>{{ form.rejectReason }}</span>
      </el-form-item>

      <el-form-item label="是否加急" prop="urgentFlag">
        <el-select
          v-model="form.urgentFlag"
          :disabled="isAllowSpecialEdit || (form.status === 4 && form.tip === 2)"
        >
          <el-option
            v-for="item in urgentFlagOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务评分" v-if="form.status === 7 && form.acceptScore">
        <el-rate v-model="form.acceptScore" disabled allow-half />
      </el-form-item>
      <el-form-item label="任务评价" v-if="form.status === 7 && form.acceptEvaluate">
        <span>{{ form.acceptEvaluate }}</span>
      </el-form-item>
    </el-form>
    <div class="form-save">
      <!-- 待提交状态-创建任务展示，编辑任务接口是否返回权限 -->
      <template
        v-if="(!taskId && form.status === 1) || (taskId && form.status === 1 && btnAuth.createFlag)"
      >
        <el-button @click="save(1)">保存草稿</el-button>
        <el-button type="primary" @click="save(2)">提交</el-button>
      </template>

      <!-- 不可编辑 -->
      <template v-if="btnAuth.editFlag">
        <el-button type="primary" @click="handleEditClick">
          {{ editPendingSave ? '保存' : '编辑' }}
        </el-button>
      </template>

      <!-- 审批中状态 -->
      <template v-if="btnAuth.approveFlag">
        <el-button type="primary" @click="operateTask(3, 1)">通过</el-button>
        <el-button @click="operateTask(3, 0)">驳回</el-button>
      </template>

      <!-- 待认领 -->
      <template v-if="btnAuth.getFlag">
        <template v-if="form.tip === 2">
          <el-button type="primary" @click="operateTask(4, 1)">确认认领</el-button>
          <el-button @click="operateTask(4, 0)">取消认领</el-button>
        </template>
        <el-button v-else type="primary" @click="operateTask(4, 1)">认领任务</el-button>
      </template>

      <!-- 设计中 -->
      <template v-if="!isShowTransBtn">
        <el-button v-if="btnAuth.changeFlag" @click="transferTak">转让任务</el-button>
        <el-button type="primary" v-if="btnAuth.finishFlag" @click="operateTask(6)">
          完成任务
        </el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="operateTask(5)">确认转让</el-button>
        <el-button @click="cancelTransferTak">取消转让</el-button>
      </template>

      <!-- 已完成 -->
      <el-button v-if="btnAuth.checkFlag" type="primary" @click="showCheckDialog(1)">
        验收
      </el-button>
      <el-button v-if="btnAuth.checkRejectFlag" @click="showCheckDialog(2)">驳回</el-button>
      <!-- 待提交、待认领、待审批 -->
      <template v-if="btnAuth.deleteFlag">
        <el-button type="danger" @click="operateTask(9)">删除</el-button>
      </template>
      <!-- 设计师评分 -->
      <el-button v-if="btnAuth.scoreFlag" type="primary" @click="acceptRateVisible = true">
        设计师评分
      </el-button>

      <el-button @click="gotoTaskList">取消</el-button>
    </div>
  </div>

  <!-- 验收驳回弹窗 -->
  <el-dialog
    :title="acceptResult === 1 ? '验收任务' : '驳回任务'"
    :model-value="acceptVisible"
    @close="handleCancel"
    width="30%"
  >
    <el-form ref="acceptFormRef" :model="form" label-position="left">
      <template v-if="acceptResult === 1">
        <el-form-item
          prop="acceptScore"
          label="任务评分"
          :rules="[
            { required: true, message: '评分不能为空', trigger: ['blur'] },
            {
              pattern: /^(0*[1-9]\d*\.?\d*|0+\.\d*[1-9]\d*)$/,
              message: '任务评分不能为空',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-rate v-model="form.acceptScore" allow-half />
        </el-form-item>
        <el-form-item
          label="任务评价"
          prop="acceptEvaluate"
          :rules="[{ required: true, message: '任务评价不能为空', trigger: ['blur'] }]"
        >
          <el-input v-model="form.acceptEvaluate" type="textarea" rows="3" maxlength="200" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item
          label="驳回意见"
          prop="rejectReason"
          :rules="[{ required: true, message: '驳回意见不能为空', trigger: ['blur'] }]"
        >
          <el-input v-model="form.rejectReason" type="textarea" rows="3" maxlength="200" />
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleCheckResult">
          {{ acceptResult === 1 ? '验收' : '驳回' }}
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!--  -->

  <el-dialog
    title="用户评分"
    :model-value="acceptRateVisible"
    @close="handleRateCancel"
    width="30%"
  >
    <el-form ref="acceptFormRef" :model="form" label-position="left">
      <el-form-item
        prop="userScore"
        label="用户评分"
        :rules="[
          { required: true, message: '评分不能为空', trigger: ['blur'] },
          {
            pattern: /^(0*[1-9]\d*\.?\d*|0+\.\d*[1-9]\d*)$/,
            message: '评分不能为空',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-rate v-model="form.userScore" allow-half />
      </el-form-item>
      <p class="rate-tips">
        本次评分仅针对设计师本人进行评分，与设计任务无关；评分将进行严格保密。
      </p>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleRateCancel">取消</el-button>
        <el-button type="primary" @click="handleRateSave">评分</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="designtaskoperate">
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { designApi, DesignApi, productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import * as swal from '@/utils/swal';

  const { userInfo } = useStore();

  const router = useRouter();
  const route = useRoute();
  const consumeTaskListSearchInfo = () => {
    const raw = sessionStorage.getItem('taskListSearchInfo') ?? '{}';
    sessionStorage.removeItem('taskListSearchInfo');
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  };

  // 创建一个表示当前日期的Date对象
  const currentDate = new Date();

  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并确保两位数格式
  const day = String(currentDate.getDate()).padStart(2, '0'); // 确保两位数格式

  const formRef = ref();
  const form: any = reactive<DesignApi.LuteosDesignSaveDesignTask.RequestBody>({
    brandCode: '',
    designTaskCode: '',
    endDate: '',
    initiator: userInfo.memberCode,
    initiatorDesc: userInfo.name,
    itemTag: '',
    itemType: route.query.itemType ? +route.query.itemType : 0,
    name: '',
    operateType: 2,
    operatorGroupCode: route.query.groupCode ? route.query.groupCode : '',
    productCategoryCode: '',
    productLevel: '',
    productList: '',
    startDate: `${year}-${month}-${day}`,
    status: route.query.status ? +route.query.status : 1,
    statusDesc: '待提交',
    designerDesc: '待认领',
    urgentFlag: 0,
    rejectReason: '',
    transferDesignerCode: '',
    designScoreList: [],
    acceptScore: '',
    userScore: '',
    acceptEvaluate: '',
    transferDesignerDesc: '',
    tip: '', // 2-转让中 1-加急
  });
  const designDirectorFlag = ref(false); // 是否设计总监
  const specificEmployeesFlag = ref(false); // 是否设计组长
  const creatorFlag = ref(false); // 是否创建人
  const operateGroupLeaderFlag = ref(false); // 是否运营组长
  const operateManagerFlag = ref(false); // 是否运营经理
  const designerFlag = ref(false); // 是否设计师
  // 审批中可编辑
  const isAllowSpecialEdit = computed(() => {
    return (
      (designDirectorFlag.value || operateGroupLeaderFlag.value || operateManagerFlag.value) &&
      form.status === 2
    );
  });
  // 产品
  const categoryOptions = ref([
    {
      name: '新品',
      code: 1,
    },
    {
      name: '老品/其他',
      code: 2,
    },
  ]);
  // 项目类型
  const urgentFlagOptions = ref([
    {
      name: '不加急',
      code: 0,
    },
    {
      name: '加急',
      code: 1,
    },
  ]);

  const projectList = ref([
    {
      text: '电商设计',
      type: 1,
    },
    {
      text: '视频/MG动画',
      type: 3,
    },
    {
      text: '摄影',
      type: 4,
    },
    {
      text: '三维渲染',
      type: 5,
    },
  ]);

  // 待指派、已提交，总监和设计组长可以编辑
  const showDesignSelect = computed(() => {
    return (
      [3, 4].includes(form.status) && (designDirectorFlag.value || specificEmployeesFlag.value)
    );
  });

  const editPendingSave = ref(false);
  // 全局禁用禁用表单输入框
  const isDisabledForm = computed(() => {
    if (!editPendingSave.value) {
      return true;
    }
    // 优先判断角色，再判断状态
    // 设计总监，待提交、回收站不可编辑
    if (designDirectorFlag.value) {
      return [1, 8].includes(form.status);
    }
    // 设计组长，待指派已提交可编辑
    if (specificEmployeesFlag.value) {
      return ![3, 4].includes(form.status);
    }

    // 运营组长、运营经理，审批中可编辑
    if (operateGroupLeaderFlag.value || operateManagerFlag.value) {
      return ![2].includes(form.status);
    }

    // 设计师，已提交、设计中不可编辑
    if (designerFlag.value && [4, 5].includes(form.status)) {
      return true;
    }

    // 其余
    return (
      // 待提交，已提交除外
      ![1, 4].includes(form.status) ||
      // 待提交但是没有提交权限
      (taskId.value && [1].includes(form.status) && !btnAuth.value.createFlag) ||
      // 已提交，没有认领权限
      ([4].includes(form.status) && !btnAuth.value.getFlag)
    );
  });
  // 禁用截止日期
  const isDisabledEndDate = computed(() => {
    // 创建或者待提交状态有权限
    if (
      (!taskId.value && form.status === 1) ||
      (taskId.value && form.status === 1 && btnAuth.value.createFlag)
    ) {
      return false;
    }

    // 待指派
    if ([3].includes(form.status)) {
      return false;
    }

    // 创建人，待提交、审批中，已提交、设计中
    if (creatorFlag.value && [1, 2, 4, 5].includes(form.status)) {
      return false;
    }
    // 设计总监，审批中、已提交、设计中、已完成、已验收
    if (designDirectorFlag.value && [2, 4, 5, 6, 7].includes(form.status)) {
      return false;
    }
    // 设计组长，已提交
    if (specificEmployeesFlag.value && [4].includes(form.status)) {
      return false;
    }
    // 运营组长、运营经理，审批中、已提交、设计中
    if (
      (operateGroupLeaderFlag.value || operateManagerFlag.value) &&
      [2, 4, 5].includes(form.status)
    ) {
      return false;
    }

    return true;
  });

  // 禁用任务清单
  const isDisabledProductList = computed(() => {
    // 创建或者待提交状态有权限
    if (
      (!taskId.value && form.status === 1) ||
      (taskId.value && form.status === 1 && btnAuth.value.createFlag)
    ) {
      return false;
    }

    // 设计总监、运营组长、运营经理，审批中
    if (
      (designDirectorFlag.value || operateGroupLeaderFlag.value || operateManagerFlag.value) &&
      [2].includes(form.status)
    ) {
      return false;
    }

    return true;
  });
  // 禁用转让设计师
  const isDisabledTransfer = computed(() => {
    return !btnAuth.value.changeFlag;
  });

  // 禁用设计类型
  const isDisabledScore = computed(() => {
    // 设计师，已提交、设计中
    if (designerFlag.value && [4, 5].includes(form.status)) {
      return false;
    }
    // 既是创建人又是设计组长，已完成
    if (creatorFlag.value && specificEmployeesFlag.value && form.status === 5) {
      return false;
    }
    // 设计组长，已提交
    if (specificEmployeesFlag.value && form.status === 4) {
      return false;
    }
    // 设计组长，已完成不可编辑
    if (specificEmployeesFlag.value && form.status === 5) {
      return true;
    }
    if (btnAuth.value.getFlag || btnAuth.value.changeFlag || btnAuth.value.finishFlag) {
      return false;
    }
    return true;
  });

  // 产品等级
  const pdtLevelList = ref([]);
  const queryPdtLevelList = () => {
    designApi.luteosDesignLevelQueryDesignPdtLevelList().then((res: any) => {
      pdtLevelList.value = res.designPdtLevelList || [];
    });
  };
  queryPdtLevelList();

  // 查询品牌
  const brandList = ref([]);
  const queryBrandList = () => {
    productApi
      .luteosProductBrandQueryBrandList({
        pageNum: 1,
        pageSize: 100,
      })
      .then((res: any) => {
        if (+res.code === 200) {
          brandList.value = res.brandBeanList || [];
        }
      });
  };

  queryBrandList();

  const designScoreList = ref([]);
  const queryScoreList = () => {
    designApi
      .luteosDesignScoreQueryDesignScoreList({
        pageNum: 1,
        pageSize: 100,
        itemType: form.itemType,
      })
      .then((res) => {
        designScoreList.value = res.designScoreList || [];
      });
  };

  // 查询设计师
  const designerMemberList = ref([]);
  const queryDesignerList = () => {
    designApi
      .luteosDesignQueryDesignerList({
        itemType: form.itemType,
      })
      .then((res) => {
        designerMemberList.value = res.designerList || [];
      });
  };

  // 提交
  const saveLoading = ref(false);
  const save = (type) => {
    form.operateType = type;
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        if (isDesignScoreEmpty()) {
          delete form.designScoreList;
        }
        removeEmptyStrings(form);
        designApi
          .luteosDesignSaveDesignTask(form)
          .then(() => {
            ElMessage.success(type === 1 ? '保存草稿成功' : '提交成功');
            gotoTaskList();
          })
          .finally(() => {
            saveLoading.value = false;
            if (type === 10) {
              editPendingSave.value = false;
            }
          });
      }
    });
  };
  const handleEditClick = () => {
    if (!editPendingSave.value) {
      editPendingSave.value = true;
      return;
    }
    save(10);
  };
  // 跳转任务页面
  const gotoTaskList = () => {
    editPendingSave.value = false;
    const searchInfo = consumeTaskListSearchInfo();
    router.push({
      name: route.query.path ? `designtask${route.query.path}` : 'designtasklist',
      params: {
        ...searchInfo,
      },
    });
  };

  // 新增设计类型
  const addTaskType = () => {
    const data = {
      designScoreCode: '',
      num: '',
      score: '',
    };
    form.designScoreList.push(data);
  };
  // 删除设计类型
  const delTaskType = (index) => {
    form.designScoreList.splice(index, 1);
  };

  // 展示确认转让按钮
  const isShowTransBtn = ref(false);
  const transferTak = () => {
    isShowTransBtn.value = true;
    queryDesignerList('');
  };

  const cancelTransferTak = () => {
    isShowTransBtn.value = false;
    form.transferDesignerCode = '';
  };

  const designScoreSelectArr = computed(() => {
    const list = [];
    // 缓存已选择的设计类型
    form.designScoreList.forEach((item) => {
      item.designScoreCode && list.push(item.designScoreCode);
    });
    return list;
  });

  // 设计类型切换时处理
  const handleScoreChange = (val, index) => {
    const data: any = designScoreList.value.find((item: any) => item.designScoreCode === val) || {};
    form.designScoreList[index].score = data.score;
  };

  // 验收、驳回逻辑
  const acceptFormRef = ref();
  const acceptResult = ref(); // 1-验收，2-驳回
  const acceptVisible = ref(false);
  // 展示验收驳回弹窗
  const showCheckDialog = (type) => {
    acceptResult.value = type;
    acceptVisible.value = true;
  };
  // 验收、驳回取消
  const handleCancel = () => {
    acceptVisible.value = false;
    form.acceptScore = '';
    form.acceptEvaluate = '';
    form.rejectReason = '';
    nextTick(() => {
      acceptFormRef.value.clearValidate();
    });
  };
  const acceptRateVisible = ref(false);
  const handleRateCancel = () => {
    acceptRateVisible.value = false;
    form.userScore = '';
    nextTick(() => {
      acceptFormRef.value.clearValidate();
    });
  };
  // 设计师评分
  const handleRateSave = () => {
    acceptFormRef.value.validate((isvalid) => {
      if (isvalid) {
        designApi
          .luteosDesignOperateDesignTask({
            designTaskCode: form.designTaskCode,
            operateType: 12,
            acceptScore: form.userScore,
          })
          .then(() => {
            gotoTaskList();
          });
      }
    });
  };

  // 验收、驳回确认
  const handleCheckResult = () => {
    acceptFormRef.value.validate((isvalid) => {
      if (isvalid) {
        // 操作任务
        operateTask(7, acceptResult.value === 1 ? 1 : 0);
      }
    });
  };

  const isDesignScoreEmpty = () => {
    if (!form.designScoreList || !form.designScoreList.length) {
      return true;
    }
    if (form.designScoreList.length) {
      const info = form.designScoreList[0];
      if (!info.designScoreCode || !info.score) {
        return true;
      }
    }
  };

  // 删除空字符串的字段
  const removeEmptyStrings = (obj) => {
    for (const key in obj) {
      if (obj[key] === '') {
        delete obj[key];
      }
    }
    return obj;
  };
  // operateType-操作类型 operateStatus-操作状态 0-审批/验收驳回 1-审批/验收通过 审批/验收必填
  const operateTask = async (operateType, operateStatus) => {
    const data: any = {
      designTaskCode: form.designTaskCode,
      operateType,
      operateStatus,
    };
    // 完成任务、删除任务、验收、驳回不需要校验
    if ([3, 7, 9].includes(operateType)) {
      if (operateType === 7) {
        // 验收驳回操作
        if (operateStatus === 1) {
          // 验收
          data.acceptEvaluate = form.acceptEvaluate;
          data.acceptScore = form.acceptScore;
        } else {
          // 驳回
          data.rejectReason = form.rejectReason;
        }
      } else if (operateType === 9) {
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
      }

      if (isDesignScoreEmpty()) {
        delete data.designScoreList;
      }
      designApi.luteosDesignOperateDesignTask(data).then(() => {
        gotoTaskList();
      });
    } else {
      formRef.value.validate((isvalid) => {
        if (isvalid) {
          // 认领和转让
          if ([4, 5].includes(operateType)) {
            data.brandCode = form.brandCode;
            data.endDate = form.endDate;
            data.itemTag = form.itemTag;
            data.itemType = form.itemType;
            data.productCategoryCode = form.productCategoryCode;
            data.designScoreList = form.designScoreList;
            if (operateType === 5) {
              data.transferDesignerCode = form.transferDesignerCode;
              if (!data.transferDesignerCode) {
                ElMessage.warning('请选择转让设计师');
                return;
              }
            }
          } else if (operateType === 6) {
            data.designScoreList = form.designScoreList;
            if (isDesignScoreEmpty()) {
              ElMessage.warning('设计类型必填');
              return;
            }
          } else if (operateType === 8) {
            // 指派
            data.designerCode = form.designerCode;
          }

          if (isDesignScoreEmpty()) {
            delete data.designScoreList;
          }
          designApi.luteosDesignOperateDesignTask(data).then(() => {
            gotoTaskList();
          });
        }
      });
    }
  };
  // 按钮权限
  const btnAuth = ref({
    createFlag: 0, // 创建（提交）权限 0-无 1-有
    editFlag: 0, // 创建（提交）权限 0-无 1-有
    approveFlag: 0, // 审批权限 0-无 1-有
    getFlag: 0, // 认领权限 0-无 1-有
    changeFlag: 0, // 转让权限 0-无 1-有
    distributeFlag: 0, //
    finishFlag: 0, // 完成权限 0-无 1-有
    checkFlag: 0, // 验收权限 0-无 1-有
    deleteFlag: 0, // 删除权限 0-无 1-有
    checkRejectFlag: 0, // 验收驳回权限
    scoreFlag: 0, // 设计师评分
  });
  const queryDetail = () => {
    return designApi
      .luteosDesignQueryDesignTaskDetail({
        designTaskCode: taskId.value,
      })
      .then((res) => {
        btnAuth.value = res.auth;
        form.name = res.name;
        form.status = res.status;
        form.statusDesc = res.statusDesc;
        form.designTaskCode = res.designTaskCode;
        form.brandCode = res.brandCode;
        form.productCategoryCode = res.productCategoryCode;
        form.productList = res.productList;
        form.productLevel = res.productLevel;
        form.itemType = res.itemType;
        form.itemTag = res.itemTag;
        form.startDate = res.startDate;
        form.endDate = res.endDate;
        form.designerDesc = res.designerDesc || '待认领';
        form.initiator = res.initiator;
        form.initiatorDesc = res.initiatorDesc;
        form.operatorGroupCode = res.operatorGroupCode;
        form.urgentFlag = res.urgentFlag;
        form.rejectReason = res.rejectReason;
        form.designScoreList = res.designScoreList;
        form.transferDesignerDesc = res.transferDesignerDesc;
        form.tip = res.tip;
        form.acceptEvaluate = res.acceptEvaluate;
        form.acceptScore = res.acceptScore;
        const operator = res.operator || {};
        designDirectorFlag.value = !!operator.designDirectorFlag;
        specificEmployeesFlag.value = !!operator.specificEmployeesFlag;
        creatorFlag.value = !!operator.creatorFlag;
        operateGroupLeaderFlag.value = !!operator.operateGroupLeaderFlag;
        operateManagerFlag.value = !!operator.operateManagerFlag;
        designerFlag.value = !!operator.designerFlag;
      });
  };
  const taskId = ref(route.query.id);
  onMounted(async () => {
    if (taskId.value) {
      await queryDetail();

      // 认领、转让、已完成时时查询分数
      if ([4, 5, 6].includes(form.status)) {
        // 设计类型为空时需要初始化一个
        if (!form.designScoreList.length) {
          const data = {
            designScoreCode: '',
            num: '',
            score: '',
          };
          form.designScoreList.push(data);
        }
        queryScoreList();
      }
      // 待指派、已提交需要查询设计师列表
      if ([3, 4].includes(form.status)) {
        queryDesignerList('');
      }
    }
  });

</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .form-save {
    text-align: center;
    :deep(.el-button) {
      margin-right: 15px;
    }
  }
  .m-t-20 {
    margin-top: -15px;
  }
  .reset-txt {
    height: 30px;
    font-size: 10px;
    color: #3e97ff;
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }
  .score-list {
    display: flex;
    flex-direction: column;
  }
  .score-list-item {
    display: flex;
    flex-direction: row;
  }
  .del-txt {
    color: #f00;
    margin-left: 10px;
  }
  .mt-60 {
    margin-top: -60px;
  }
  .rate-tips {
    color: #8492a6;
    font-size: 12px;
  }
  .el-select {
    width: 400px !important;
  }
</style>
