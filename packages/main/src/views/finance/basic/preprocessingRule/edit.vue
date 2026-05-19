<template>
  <div class="preprocessing-rule">
    <KeenCard title="单据类型">
      <el-form ref="formRefType" :model="form" label-width="120" scroll-to-error>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据类型" prop="type" :rules="[rules.mustFill]">
              <el-select
                v-if="isCanEdit"
                :disabled="!isAdd"
                v-model="form.type"
                style="width: 140px"
                @change="onTypeChange"
              >
                <el-option
                  v-for="item in RuleTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span v-else>
                {{ RuleTypes.find((x) => x.value === form.type)?.label || form.type }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12" />
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="基本信息">
      <el-form ref="formRefBase" :model="form" label-width="120" scroll-to-error>
        <el-row>
          <el-col :span="12">
            <el-form-item label="识别码" prop="ruleCode">
              <el-input v-model="form.ruleCode" v-if="isCanEdit" :disabled="!isAdd" />
              <span v-else>
                {{ form.ruleCode }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" v-if="isCanEdit" />
              <span v-else>
                {{ form.remark }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="规则明细">
      <el-form ref="formRef" :model="form" label-width="0" scroll-to-error>
        <el-space class="mb-4" style="display: flex; justify-content: space-between">
          <el-button type="primary" v-if="isCanEdit" @click="addRow">添加行</el-button>
          <div v-else></div>
          <el-space style="display: flex; align-items: center">
            <span>执行月份</span>
            <el-date-picker
              v-model="execMonth"
              type="month"
              value-format="YYYY-MM"
              placeholder="请选择执行月份"
              style="width: 120px"
              :clearable="false"
            />
          </el-space>
        </el-space>
        <el-table :data="form.pretreatmentRuleAllDetailBeans" border>
          <el-table-column type="index" label="序号" width="80">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="店铺" prop="shop" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                v-if="isCanEdit"
                :prop="`pretreatmentRuleAllDetailBeans.${$index}.shop`"
                :rules="[rules.mustFill]"
              >
                <ProductShopSelectFinance
                  style="width: 100%"
                  v-model="row.shop"
                  placeholder="店铺名称"
                  teleported
                  @change="(shop) => onShopChange(shop, row)"
                />
              </el-form-item>
              <span v-else>{{ row.shop }}</span>
            </template>
          </el-table-column>

          <el-table-column label="解析规则识别码" prop="analysisRuleCodeList" min-width="150">
            <template #default="{ row, $index }">
              <el-form-item
                v-if="isCanEdit"
                :prop="`pretreatmentRuleAllDetailBeans.${$index}.analysisRuleCodeList`"
                :rules="[rules.multipleSelectMustFill]"
              >
                <el-select
                  v-model="row.analysisRuleCodeList"
                  :options="(showRuleMap[form.type]?.[row.shop] || []).map(x=>({label: x, value: x}))"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :disabled="!row.shop || !form.type"
                  @change="(codes) => onAnalysisRuleCodeChange(codes, row, $index)"
                />
              </el-form-item>
              <span v-else>{{ row.analysisRuleCodeList?.join?.(', ') || '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据类型" prop="fileType" min-width="120">
            <template #default="{ row, $index }">
              <el-form-item
                v-if="isCanEdit"
                :prop="`pretreatmentRuleAllDetailBeans.${$index}.fileType`"
                :rules="[rules.multipleSelectMustFill]"
              >
                <el-select
                  v-model="row.fileType"
                  :options="FileTypeList"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  @change="(types) => onFileTypeChange(types, row, $index)"
                />
              </el-form-item>
              <span v-else>
                {{
                  Array.isArray(row.fileType)
                    ? row.fileType
                        .map((x) => fileTypeMap[x])
                        .filter((x) => x)
                        .join(', ')
                    : fileTypeMap[row.fileType]
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="条件" prop="incomeRuleConditionBeans" min-width="100">
            <template #default="{ row, $index }">
              <el-form-item>
                <div class="d-flex align-items-center gap-2">
                  <div class="text-break fs-7">
                    <OverflowTooltip
                      :content="getShowData(row?.incomeRuleConditionBeans)"
                      :line="2"
                    />
                  </div>
                  <el-link
                    type="primary"
                    :icon="Setting"
                    :underline="false"
                    :disabled="isCanEdit && !row?.shop"
                    :style="{ color: isCanEdit && !row?.shop ? '#c0c4cc' : undefined }"
                    @click="setCondition(row)"
                  />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="预处理设置"
            prop="pretreatmentRuleDbDetailExeBeans"
            min-width="100"
          >
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`pretreatmentRuleAllDetailBeans.${$index}.pretreatmentRuleDbDetailExeBeans`"
                :rules="[rules.arrayMustFill]"
              >
                <div class="d-flex align-items-center gap-2">
                  <div class="text-break fs-7">
                    <OverflowTooltip
                      :content="getExecuteShowData(row?.pretreatmentRuleDbDetailExeBeans?.[0])"
                      :line="2"
                    />
                  </div>
                  <el-link
                    type="primary"
                    :icon="Setting"
                    :underline="false"
                    :disabled="isCanEdit && !row?.shop"
                    :style="{ color: isCanEdit && !row?.shop ? '#c0c4cc' : undefined }"
                    :title="row?.shop ? undefined : '请选择店铺'"
                    @click="setPreExecute(row)"
                  />
                </div>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row, $index }">
              <el-space>
                <el-link type="danger" :underline="false" v-if="isCanEdit" @click="removeRow(row)">
                  删除
                </el-link>
                <div v-if="row.ruleDetailCode">
                  <el-link
                    type="primary"
                    class="execute-btn"
                    v-loading="row.isExecLoading"
                    :underline="false"
                    :disabled="row.isExecLoading"
                    @click="executeRow(row)"
                  >
                    执行
                  </el-link>
                  <el-link :disabled="true" v-if="row.isExecLoading">处理中</el-link>
                </div>
                <el-tag v-if="row.isExecSuccess" effect="plain">
                  <div
                    style="display: inline-flex; align-items: center; position: relative; top: 2px"
                  >
                    <el-icon size="large">
                      <CircleCheckFilled />
                    </el-icon>
                    <span>处理完成</span>
                  </div>
                </el-tag>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </KeenCard>
    <KeenCard>
      <el-row type="flex" justify="end">
        <el-space>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save" v-if="isCanEdit">保存</el-button>
        </el-space>
      </el-row>
    </KeenCard>
  </div>
  <ConditionDialog
    ref="conditionDialogRef"
    :isCanEdit="isCanEdit"
    @success="handleConditionSuccess"
  />
  <PreExecuteDialog
    ref="preExecuteDialogRef"
    :isCanEdit="isCanEdit"
    @success="handlePreExecuteSuccess"
  />
</template>

<script setup lang="ts" name="preprocessingRuleEdit">
  import { useTabs } from '@/hooks/tabs';
  import { financeApi, financeSystemApi } from '@/api';
  import { useRoute, useRouter } from 'vue-router';
  import { QuestionFilled, Setting, CircleCheckFilled } from '@element-plus/icons-vue';
  import { getExecuteShowData } from '@/views/finance/basic/preprocessingRule/preprocessingRule';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { download } from '@/utils/download';
  import dayjs from 'dayjs';
  import {
    DataSourceType,
    FileType,
    FileTypeList,
    fileTypeMap,
    logicTypeMap,
    RuleTypes,
  } from './enum';
  import ConditionDialog from './components/conditionDialog.vue';
  import PreExecuteDialog from './components/preExecuteDialog.vue';

  const router = useRouter();
  const route = useRoute();
  const formRef = ref();
  const formRefType = ref();

  const isReadOnly = computed(() => route.query.type !== 'add' && route.query.type !== 'edit');
  const isAdd = computed(() => route.query.type === 'add');
  const isCanEdit = computed(() => !isReadOnly.value);

  const rules = {
    mustFill: {
      required: true,
      message: '请填写',
      trigger: 'change',
    },
    multipleSelectMustFill: {
      required: true,
      message: '请填写',
      trigger: 'submit',
    },
    arrayMustFill: {
      message: '请设置',
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (!value?.length) {
          callback(new Error('请设置'));
        } else {
          callback();
        }
      },
    },
  };

  const { closeTabAndRefresh, closeCurrentTab } = useTabs();

  const form = ref({
    id: null,
    pretreatmentRuleAllDetailBeans: [
      {
        tick: Math.random(),
        isExecLoading: false,
        isExecSuccess: false,
        fileType: [],
        shop: '',
        incomeRuleConditionBeans: [],
        pretreatmentRuleDbDetailExeBeans: [],
      },
    ],
    type: '',
    ruleCode: '',
    remark: '',
  });

  const resetForm = () => {
    form.value = {
      id: null,
      pretreatmentRuleAllDetailBeans: [
        {
          tick: Math.random(),
          isExecLoading: false,
          isExecSuccess: false,
          fileType: [],
          shop: '',
          incomeRuleConditionBeans: [],
          pretreatmentRuleDbDetailExeBeans: [],
        },
      ],
      type: '',
      ruleCode: '',
      remark: '',
    };
  };

  const execMonth = ref(dayjs().format('YYYY-MM'));

  const getDetail = (ruleCode) => {
    financeSystemApi
      .financePretreatmentRuleQueryDetail({
        ruleCode,
      })
      .then((res) => {
        if (res?.id) {
          res.pretreatmentRuleAllDetailBeans?.forEach?.((row) => {
            row.tick = Math.random();
            row.isExecLoading = false;
            row.isExecSuccess = false;
            row.fileType = Array.isArray(row.fileType) ? row.fileType : [row.fileType];
          });

          form.value = res;

          let shopList = res.pretreatmentRuleAllDetailBeans
            .map((x) => {
              return x.shop;
            })
            .filter((x) => x);
          if (shopList.length) {
            shopList = [...new Set(shopList)];
            shopList.forEach((shop) => {
              getShopIncomeRule(shop);
            });
          }
        }
      });
  };

  const getShowData = (data) => {
    const list = [];
    data?.forEach((item, index) => {
      const { leftParenthesis, columnName, operator, value, rightParenthesis, logic } = item;
      list.push(
        `${leftParenthesis || ''}${columnName ? `"${columnName}"` : ''} ${operator || ''} ${
          value || ''
        }${rightParenthesis || ''} ${index !== data?.length - 1 ? logicTypeMap[logic] : ''}`
      );
    });
    return list.join(' ');
  };

  const showRuleMap = reactive({});

  const getShopIncomeRule = async (shop) => {
    const { type } = form.value;
    if (!type) {
      return;
    }
    if (showRuleMap[type]?.[shop]) {
      return;
    }
    return financeSystemApi
      .financeIncomeRuleQueryList({
        pageNum: 1,
        pageSize: 100,
        ruleTypeList: [type],
        shopList: [shop],
      })
      .then((res) => {
        if (!showRuleMap[type]) {
          showRuleMap[type] = {};
        }
        showRuleMap[type][shop] = (res.recordList || []).map((x) => x.ruleCode);
      });
  };

  const onShopChange = (shop, row) => {
    row.analysisRuleCodeList = [];
    getShopIncomeRule(shop);
  };

  const onTypeChange = () => {
    form.value.pretreatmentRuleAllDetailBeans.forEach((row) => {
      row.analysisRuleCodeList = [];
    });
    let shopList = form.value.pretreatmentRuleAllDetailBeans
      .map((x) => {
        return x.shop;
      })
      .filter((x) => x);
    if (shopList.length) {
      shopList = [...new Set(shopList)];
      shopList.forEach((shop) => {
        getShopIncomeRule(shop);
      });
    }
  };

  const onFileTypeChange = (fileTypes, row, index) => {
    if (fileTypes.includes(FileType.所有文件类型)) {
      row.fileType = [FileType.所有文件类型];
    } else {
      row.fileType = fileTypes;
    }
    formRef.value.validateField(`pretreatmentRuleAllDetailBeans.${index}.fileType`);
  };

  const onAnalysisRuleCodeChange = (codes, row, index) => {
    formRef.value.validateField(`pretreatmentRuleAllDetailBeans.${index}.analysisRuleCodeList`);
  };

  const conditionDialogRef = ref(null);
  const setCondition = (row) => {
    conditionDialogRef.value?.open({
      ...row,
      incomeRuleConditionBeans: row.incomeRuleConditionBeans.map((x) => {
        return {
          ...x,
        };
      }),
    });
  };

  const handleConditionSuccess = (row, list) => {
    const currentRow = form.value.pretreatmentRuleAllDetailBeans.find(
      (x) => row.tick && x.tick === row.tick
    );
    if (currentRow) {
      currentRow.incomeRuleConditionBeans = list;
    }
  };

  const preExecuteDialogRef = ref(null);
  const setPreExecute = (row) => {
    preExecuteDialogRef.value?.open({
      ...row,
      pretreatmentRuleDbDetailExeBeans: row.pretreatmentRuleDbDetailExeBeans.map((x) => {
        return {
          ...x,
        };
      }),
    });
  };

  const handlePreExecuteSuccess = (row, list) => {
    const index = form.value.pretreatmentRuleAllDetailBeans.findIndex(
      (x) => row.tick && x.tick === row.tick
    );
    if (index >= 0) {
      const currentRow = form.value.pretreatmentRuleAllDetailBeans[index];
      currentRow.pretreatmentRuleDbDetailExeBeans = list;
      nextTick(() => {
        formRef.value?.validateField?.(
          `pretreatmentRuleAllDetailBeans.${index}.pretreatmentRuleDbDetailExeBeans`
        );
      });
    }
  };

  onMounted(() => {
    resetForm();
    const { ruleCode } = route.query;
    if (ruleCode) {
      getDetail(ruleCode);
    }
  });

  const addRow = () => {
    form.value.pretreatmentRuleAllDetailBeans.push({
      tick: Math.random(),
      shop: '',
      fileType: [],
      isExecLoading: false,
      isExecSuccess: false,
      incomeRuleConditionBeans: [],
      pretreatmentRuleDbDetailExeBeans: [],
    });
  };

  const removeRow = async (row) => {
    const isConfirmed = await swal.confirm('确认删除吗？');
    if (!isConfirmed) return;
    const index = form.value.pretreatmentRuleAllDetailBeans.findIndex((x) => x === row);
    if (index > -1) {
      form.value.pretreatmentRuleAllDetailBeans.splice(index, 1);
    }
  };

  const executeRow = async (row) => {
    if (!row.ruleDetailCode) {
      ElMessage.error('请先保存规则');
      return;
    }

    const execMonthValue = +dayjs(execMonth.value, 'YYYY-MM').format('YYYYMM');
    if (!execMonthValue) {
      ElMessage.error('请选择执行月份');
      return;
    }

    const isConfirmed = await swal.confirm('确认执行吗？');
    if (!isConfirmed) return;

    row.isExecLoading = true;
    row.isExecSuccess = false;
    try {
      const res = await financeSystemApi.financePretreatmentRuleExe({
        ruleDetailCode: row.ruleDetailCode,
        nowTime: execMonthValue,
      });

      row.isExecLoading = false;
      row.isExecSuccess = true;

      let downloadCb = null;
      let btnText = '下载结果';

      if (res?.downloadUrl) {
        downloadCb = () => {
          download(res.downloadUrl, `预处理结果${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`);
        };
        btnText = '下载结果';
      } else if (res?.appCode && res?.moduleCode) {
        downloadCb = () => {
          router.push({
            path: '/downloadmanage',
            query: {
              app_code: res.appCode,
              module_code: res.moduleCode,
              record_type: 2,
            },
          });
        };
        btnText = '去下载';
      } else {
        ElMessage.error('执行失败');
      }

      if (downloadCb) {
        const isConfirmed2 = await swal.confirm({
          title: '数据已按照配置成功执行。',
          icon: 'success',
          iconHtml:
            '<i class="iconfont icon-chenggongzhuangtai" style="color:#02b96b;font-size:24px"></i>',
          confirmButtonText: btnText,
          cancelButtonText: '关闭',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (!isConfirmed2) return;
        downloadCb();
      }
    } catch (error) {
      ElMessage.error('执行失败');
    } finally {
      row.isExecLoading = false;
    }
  };

  const toListPage = () => {
    closeCurrentTab();
    router.push({
      name: 'preprocessingRule',
    });
  };

  const cancel = () => {
    toListPage();
  };

  const save = async () => {
    const [isValid1, isValid2] = await Promise.all([
      formRef.value.validate(),
      formRefType.value.validate(),
    ]);
    if (!isValid1 || !isValid2) return;
    const params = {
      ...form.value,
      pretreatmentRuleAllDetailBeans: form.value.pretreatmentRuleAllDetailBeans.map((x, i) => {
        return {
          ...x,
          lineNum: i + 1,
        };
      }),
    };
    await financeSystemApi.financePretreatmentRuleSaveOrUpdate(params);
    toListPage();
  };
</script>

<style scoped lang="scss">
  .question-icon {
    width: 15px;
    height: 15px;
    color: var(--el-color-primary);
  }

  .tip {
    font-size: 12px;
    color: #8c8c8c;
  }

  .preprocessing-rule {
    padding: 16px;

    :deep(.card-body) {
      padding-bottom: 0;
    }
  }

  .execute-btn {
    :deep(.el-loading-spinner) {
      width: 100%;
      height: 100%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      top: unset;
      margin-top: unset;
    }
  }
</style>
