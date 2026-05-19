<template>
  <el-dialog v-model="visible" width="708px" :before-close="cancel">
    <template #title>
      <div class="dialog-title">
        <i
          class="iconfont icon-jiantouxiangzuo"
          @click="
            () => {
              cancel(() => emit('back'));
            }
          "
        ></i>
        <span class="el-dialog__title">{{ title }}</span>
      </div>
    </template>
    <el-form :model="optionMap" ref="formRef" label-width="180px" label-position="top">
      <template v-for="item in variables" :key="item.variable">
        <HeaderTitle
          v-if="item?.variable === 'product_name'"
          title="基础配置"
          style="margin-bottom: 16px"
        />
        <el-form-item
          v-if="item.variable"
          :label="item.label"
          :class="{ 'table-form-error': item.variable == 'BS100_website' }"
          :prop="`${item.variable}.inputItems`"
          :rules="[
            {
              required: true,
              validator: (rule, value, callback) => {
                // 验证inputItems数组
                if (!value || !Array.isArray(value)) {
                  callback(new Error(`请输入${item.label || ''}`));
                  return;
                }
                // 过滤出所有非空值
                const nonEmptyItems = value.filter((inputItem) => inputItem.value?.trim());

                // 至少要有一个非空值
                if (nonEmptyItems.length === 0) {
                  callback(new Error(`请输入${item.label || ''}`));
                  return;
                }

                // 标记空值项
                value.forEach((inputItem) => {
                  inputItem.isEmpty = value.length > 1 && !inputItem.value?.trim();
                });

                // 检查是否有重复值
                const hasDuplicate =
                  value.length > 1 &&
                  value.some(
                    (inputItem, index) =>
                      value.findIndex((item) => item.value === inputItem.value) !== index
                  );

                if (hasDuplicate) {
                  // callback(new Error(`请输入唯一的${item.label || ''}`));
                  return;
                }

                // 检查是否有空值项（如果有多个输入框，且存在空值）
                const hasEmptyItem =
                  value.length > 1 && value.some((inputItem) => !inputItem.value?.trim());
                if (hasEmptyItem) {
                  // callback(new Error(`请完善所有输入项或删除空白项`));
                  return;
                }

                callback();
              },
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <template #label>
            <div class="d-flex align-items-center justify-content-between label-btn">
              <div>
                <span>{{ item.label }}</span>
                <span v-if="item.variable == 'BS100_website'" class="multiple-links">
                  添加多个链接报告会整合样本
                </span>
                <span
                  v-if="
                    optionMap[item.variable]?.inputItems
                      ?.map((i) => i.value)
                      ?.filter((v) => v)
                      ?.join(',')?.length === item?.maxLength ||
                    optionMap[item.variable]?.inputItems?.filter((i) => i.value?.trim())?.length ===
                      item?.num
                  "
                  style="color: var(--el-color-danger)"
                >
                  已达上限
                </span>
              </div>

              <div class="d-flex align-items-center btns" v-if="item.variable == 'BS100_website'">
                <el-button link type="primary" @click="getTemplate">
                  <template #icon>
                    <i class="Root-tyicon icon-Root-tyxiazai" />
                  </template>
                  下载模板
                </el-button>

                <el-popover
                  placement="bottom-end"
                  :width="398"
                  trigger="click"
                  v-if="fileList?.length"
                >
                  <div class="popover-content">
                    <div class="popover-title">
                      <span class="title">上传文件 ({{ fileList?.length }}/5)</span>
                      <span class="clear-btn" @click="handleClear">清空</span>
                    </div>
                    <div class="popover-files">
                      <div v-for="(file, index) in fileList" :key="file.ossKey" class="file-item">
                        <span class="file-icon xlsx"></span>
                        <!-- ossKey -->
                        <OverflowTooltip
                          :content="file.name"
                          :line="1"
                          :fontSize="12"
                          color="#262626"
                        />
                        <!-- <span class="file-name">{{ file.name }}</span> -->
                        <i
                          class="iconfont icon-shanchu delete-btn"
                          @click="handleFileDelete(index)"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <template #reference>
                    <div>
                      <el-tooltip content="已上传文件" trigger="hover" placement="top">
                        <el-button>
                          <template #icon>
                            <i class="Root-tyicon icon-Root-tyfujian"></i>
                          </template>
                          {{ fileList?.length || 0 }}
                        </el-button>
                      </el-tooltip>
                    </div>
                  </template>
                </el-popover>

                <el-tooltip content="已上传文件" trigger="hover" placement="top" v-else>
                  <el-button>
                    <template #icon>
                      <i class="Root-tyicon icon-Root-tyfujian"></i>
                    </template>
                    {{ fileList?.length || 0 }}
                  </el-button>
                </el-tooltip>

                <KeenFileUpload
                  accept=".xlsx,.xls"
                  :showOperate="false"
                  ref="upload"
                  :multiple="true"
                  :limit="5"
                  class="ml-8"
                  :showFileList="false"
                  v-model="fileList"
                  :directory="`asin/template`"
                  @success="handleFileSuccess"
                >
                  <el-button :disabled="fileList?.length == 5">
                    <template #icon>
                      <i class="iconfont icon-shangchuan1"></i>
                    </template>
                    上传文件
                  </el-button>
                </KeenFileUpload>
              </div>

              <div
                class="max-length"
                v-if="item?.variable !== 'product_name' && item.variable !== 'BS100_website'"
              >
                <span class="">
                  总长度：{{
                    optionMap[item.variable]?.inputItems
                      ?.map((i) => i.value)
                      ?.filter((v) => v)
                      ?.join(',')?.length || 0
                  }}/{{ item?.maxLength }}
                </span>
                <span>
                  数量：{{
                    optionMap[item.variable]?.inputItems?.filter((i) => i.value?.trim())?.length ||
                    0
                  }}/{{ item?.num || 20 }}
                </span>
              </div>
            </div>
          </template>
          <el-table
            :data="optionMap[item.variable]?.inputItems"
            v-if="item.variable == 'BS100_website'"
          >
            <el-table-column type="index" label="序号" width="64" />
            <el-table-column prop="value" label="链接">
              <template #default="{ row }">
                <div style="display: flex; align-items: center">
                  <el-input
                    v-model="row.value"
                    :placeholder="optionMap[item.variable]?.placeholder"
                    clearable
                    :style="{ width: '100%' }"
                    :class="[{ 'is-error': row.isDuplicate }, 'table-input']"
                    @blur="checkDuplicate(item.variable, row.id)"
                    @input="validateField(item.variable)"
                  >
                    <!-- <template
                      #suffix
                      v-if="
                        item?.variable !== 'product_name' &&
                        optionMap[item.variable]?.inputItems?.length > 1
                      "
                    > -->
                    <!-- <el-icon
                        class="delete-icon"
                        :size="14"
                        @click="handleClearInputItem(item.variable, row.id)"
                      >
                        <Delete />
                      </el-icon> -->
                    <!-- </template> -->
                  </el-input>
                  <el-tooltip
                    :content="row.isDuplicate ? '该项已存在' : '请完善此项'"
                    placement="top"
                    v-if="row.isDuplicate || row.isEmpty"
                  >
                    <el-icon color="var(--el-color-danger)" :size="14"><WarningFilled /></el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="72">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleClearInputItem(item.variable, row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            v-if="
              item.variable == 'BS100_website' &&
              optionMap[item.variable]?.inputItems &&
              optionMap[item.variable]?.inputItems?.length < 20
            "
            :icon="Plus"
            @click="addInputItem(item.variable)"
            class="add-more-button-table add-more-button"
            link
            type="primary"
          >
            添加
          </el-button>
          <div
            class="input-items"
            v-if="item.variable !== 'BS100_website'"
            :class="{ 'input-bg': item.variable !== 'product_name' }"
          >
            <div
              class="input-item"
              v-for="(inputItem, index) in optionMap[item.variable]?.inputItems"
              :key="inputItem.id"
            >
              <el-input
                v-model="inputItem.value"
                :placeholder="optionMap[item.variable]?.placeholder"
                clearable
                :show-word-limit="inputItem.maxLength"
                :maxlength="inputItem.maxLength"
                :style="{ width: item?.variable === 'product_name' ? '400px' : '170px' }"
                :class="{ 'is-error': inputItem.isDuplicate }"
                @blur="checkDuplicate(item.variable, inputItem.id)"
                @input="validateField(item.variable)"
              >
                <template
                  #suffix
                  v-if="
                    item?.variable !== 'product_name' &&
                    optionMap[item.variable]?.inputItems?.length > 1
                  "
                >
                  <el-icon
                    class="delete-icon"
                    :size="14"
                    @click="handleClearInputItem(item.variable, inputItem.id)"
                  >
                    <Delete />
                  </el-icon>
                </template>
              </el-input>
              <el-tooltip
                :content="inputItem.isDuplicate ? '该项已存在' : '请完善此项'"
                placement="top"
                v-if="
                  item?.variable !== 'product_name' && (inputItem.isDuplicate || inputItem.isEmpty)
                "
              >
                <el-icon color="var(--el-color-danger)" :size="14"><WarningFilled /></el-icon>
              </el-tooltip>
            </div>

            <el-button
              v-if="
                item?.variable !== 'product_name' &&
                item.variable &&
                optionMap[item.variable]?.inputItems &&
                optionMap[item.variable]?.inputItems?.length < 20
              "
              :icon="Plus"
              @click="addInputItem(item.variable)"
              class="add-more-button"
            >
              继续添加
            </el-button>
          </div>
        </el-form-item>
        <HeaderTitle
          v-if="item?.variable === 'product_name' && variables?.length > 1"
          title="竞品配置"
          style="margin-bottom: 16px"
        />
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="run(0)" :loading="loading">存草稿</el-button>
        <el-button type="primary" @click="run(1)" :loading="loading">启动工作流</el-button>
      </span>
    </template>
  </el-dialog>
  <CancelDialog
    ref="cancelRef"
    @success="cancelSave"
    type="warning"
    title="是否退出?"
    content="退出后之前填写的信息将清空"
    align-center
  >
    <template #button>
      <el-button :disabled="loading" @click="saveDraft">存草稿</el-button>
    </template>
  </CancelDialog>
</template>

<script setup lang="ts">
  import { Plus, WarningFilled } from '@element-plus/icons-vue';
  import { newProductApi, productFileApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';
  import HeaderTitle from '@/views/newProductAnalysis/components/headerTitle.vue';
  import CancelDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/CancelDialog.vue';
  import { isEqual, debounce, cloneDeep } from 'lodash-es';
  import { useReport } from '../hooks/useReport';
  import { urlDownload } from '@/utils/download';

  const { report } = useReport();

  // 定义变量类型接口
  interface WorkflowVariable {
    variable?: string;
    label?: string;
    required?: boolean;
    maxLength?: number;
    num?: number;
  }

  // 定义输入项类型
  interface InputItem {
    id: string;
    value: string;
    isDuplicate?: boolean;
    isEmpty?: boolean;
  }

  const emit = defineEmits<{
    (event: 'success'): void;
    (event: 'back'): void;
  }>();

  const router = useRouter();
  const visible = ref(false);
  const title = ref('');
  const form = ref({});
  const formRef = ref();

  const optionMap = ref({
    product_name: {
      placeholder: '输入产品名称，如：吸奶器',
      inputItems: [{ id: '1', value: '', isDuplicate: false, maxLength: 50 }],
    },
    competitive_website: {
      placeholder: '输入链接',
      inputItems: [{ id: '1', value: '', isDuplicate: false }],
    },
    BS100_website: {
      placeholder: '输入链接',
      inputItems: [{ id: '1', value: '', isDuplicate: false }],
    },
    brandname: {
      placeholder: '输入品牌',
      inputItems: [{ id: '1', value: '', isDuplicate: false }],
    },
    compAsin: {
      placeholder: '输入竞品Asin',
      inputItems: [{ id: '1', value: '', isDuplicate: false }],
    },
  });

  const optionList = [
    'product_name',
    'competitive_website',
    'BS100_website',
    'brandname',
    'compAsin',
  ];

  const variables = ref<WorkflowVariable[]>([]);
  const queryVariables = async (workflowCode) => {
    if (!workflowCode) return;
    const res = await newProductApi.luteosAiNpoWorkflowVariables({
      workflowCode,
    });
    // 过滤掉traceId等不需要显示的字段
    variables.value = (res.variables || []).filter((item) => !['traceId', 'importAsin'].includes(item.variable as string));

    // 为每个variable初始化optionMap配置
    variables.value.forEach((item) => {
      if (item.variable && !optionMap.value[item.variable]) {
        optionMap.value[item.variable] = {
          placeholder: `输入${item.label || item.variable}`,
          value: '',
          inputItems: [{ id: '1', value: '', isDuplicate: false }],
        };
      }
    });
  };

  const curInstanceCode = ref();
  const queryConfig = async (instanceCode) => {
    const res = await newProductApi.luteosAiNpoProjectDetail({
      instanceCode,
    });
    let params = cloneDeep(res.inputVariables);
    for (const key in params) {
      if (key == 'compAsin') params['compAsin'] = params['inputAsin'] ?? params['compAsin'];
      if(key == 'bsWebsiteList') {
        fileList.value = params[key]?.map(item => {
          return {
            ossKey: item.url,
            name: item.fileName
          }
        });
      }
      // 对应的内容字段才处理
      if (optionList.includes(key)) {
        form.value[key] = params[key];
        // 确保optionMap[key]存在
        if (optionMap.value[key]) {
          const inputValue = params[key];
          // 将逗号分隔的值转换为inputItems数组
          if (inputValue) {
            const values = inputValue.split(',').filter((v) => v.trim());
            if (values.length > 0) {
              optionMap.value[key].inputItems = values.map((val, index) => ({
                id: String(Date.now() + index),
                value: val.trim(),
                isDuplicate: false,
              }));
            }
          }
        }
      }
    }
    queryVariables(res?.workflowCode);
  };

  const workflowCode = ref();
  const open = async (code: string, name: string, instanceCode: string) => {
    title.value = `${name}参数配置`;
    // 清空历史数据
    form.value = {};
    curInstanceCode.value = '';
    workflowCode.value = '';
    variables.value = [];
    fileList.value = [];

    // 完全重置optionMap为初始状态
    optionMap.value = {
      product_name: {
        placeholder: '输入产品名称，如：吸奶器',
        inputItems: [{ id: '1', value: '', isDuplicate: false, maxLength: 50 }],
      },
      competitive_website: {
        placeholder: '输入链接',
        inputItems: [{ id: '1', value: '', isDuplicate: false }],
      },
      BS100_website: {
        placeholder: '输入链接',
        inputItems: [{ id: '1', value: '', isDuplicate: false }],
      },
      brandname: {
        placeholder: '输入品牌',
        inputItems: [{ id: '1', value: '', isDuplicate: false }],
      },
      compAsin: {
        placeholder: '输入竞品Asin',
        inputItems: [{ id: '1', value: '', isDuplicate: false }],
      },
    };

    if (code) {
      workflowCode.value = code;
      await queryVariables(code);
    }
    if (instanceCode) {
      curInstanceCode.value = instanceCode;
      await queryConfig(instanceCode);
    }
    visible.value = true;
    // 使用nextTick确保DOM更新后再重置表单
    await nextTick();
    formRef.value?.resetFields();

    report('page_view_config_page', {
      workflow_id: workflowCode.value || extractLetters(curInstanceCode.value),
    });
  };

  const getFormData = () => {
    const res = {};
    for (const key in optionMap.value) {
      // 将inputItems中的值拼接成逗号分隔的字符串
      if (optionMap.value[key].inputItems) {
        const values = optionMap.value[key].inputItems
          .map((item) => item.value?.trim())
          .filter((v) => v); // 过滤空值
        res[key] = values.join(',');
      }
    }
    return res;
  };

  const extractLetters = (str) => {
    if (!str) return '';
    return str.replace(/[^a-zA-Z]/g, '');
  };

  const loading = ref(false);
  const run = debounce(async (mode) => {
    if (loading.value) {
      return;
    }

    // bs100榜单asin列表
    const bsWebsiteList = fileList.value?.map((item) => {
      return { url: item.ossKey, fileName: item.name };
    });

    if (mode) {
      // 运行前校验
      const isValid = await formRef.value?.validate().catch(() => {
        ElMessage.warning('请完成所有必填选项');
        return false; // 校验失败返回 false，不继续执行
      });
      if (!isValid) return;
    }
    try {
      loading.value = true;
      const res = await newProductApi.luteosAiNpoWorkflowRun({
        workflowCode: workflowCode.value,
        instanceCode: curInstanceCode.value,
        mode,
        inputs: { ...getFormData(), bsWebsiteList },
      });
      if (mode) {
        loading.value = false;
        emit('success');
        visible.value = false;

        report('click_start_workflow', {
          workflow_id: workflowCode.value || extractLetters(curInstanceCode.value),
          task_id: res.instanceCode,
        });

        setTimeout(() => {
          router.push({
            path: '/newProductAnalysis/detail',
            query: {
              instanceCode: res.instanceCode,
            },
          });
        }, 1000);
      } else {
        loading.value = false;
        ElMessage.success('保存成功');
        emit('success');
        visible.value = false;

        report('click_save_draft', {
          workflow_id: workflowCode.value || extractLetters(curInstanceCode.value),
          task_id: res.instanceCode,
        });
      }
    } catch (e) {
      loading.value = false;
    }
  }, 300);

  // 检查重复值
  const checkDuplicate = (variable?: string, currentItemId?: string) => {
    if (!variable) return;

    const currentItems = optionMap.value[variable]?.inputItems;
    if (!currentItems) return;

    // 统计每个值出现的次数
    const valueCountMap = new Map<string, number>();
    currentItems.forEach((item) => {
      const trimmedValue = item.value?.trim();
      if (trimmedValue) {
        valueCountMap.set(trimmedValue, (valueCountMap.get(trimmedValue) || 0) + 1);
      }
    });

    // 找到当前失去焦点的输入项
    const currentItem = currentItemId
      ? currentItems.find((item) => item.id === currentItemId)
      : null;

    // 标记重复项
    currentItems.forEach((item) => {
      const trimmedValue = item.value?.trim();
      const isDup = trimmedValue && valueCountMap.get(trimmedValue)! > 1;
      item.isDuplicate = isDup;
    });

    // 仅当当前失去焦点的项是重复项时，显示提示
    if (currentItem && currentItem.isDuplicate) {
      ElMessage({
        message: '该项已存在，请勿重复添加。',
        type: 'warning',
        grouping: true,
      });
    }
  };

  // 触发表单校验
  const validateField = (variable?: string) => {
    if (!variable || !formRef.value) return;
    // 延迟执行校验，确保inputItems已更新
    nextTick(() => {
      formRef.value?.validateField(`${variable}.inputItems`, () => {});
    });
  };

  // 添加输入项
  const addInputItem = (variable?: string) => {
    if (!variable) return;

    const currentItems = optionMap.value[variable]?.inputItems;
    if (!currentItems) return;

    // 检查是否已达上限
    if (currentItems.length >= 20) {
      ElMessage.warning('最多只能添加20个输入项');
      return;
    }

    // 检查是否存在空值输入框
    const hasEmptyInput = currentItems.some((item) => !item.value?.trim());
    if (hasEmptyInput) {
      ElMessage({
        message: '请先输入内容再添加新的输入框',
        type: 'warning',
        grouping: true,
      });
      return;
    }

    // 生成唯一ID
    const newId = String(Date.now());
    currentItems.push({ id: newId, value: '', isDuplicate: false });

    console.log(`添加输入项 - 变量: ${variable}, 当前数量: ${currentItems.length}`);
  };

  const handleClearInputItem = (variable?: string, itemId?: string) => {
    if (!variable || !itemId) return;

    const currentItems = optionMap.value[variable]?.inputItems;
    if (!currentItems) return;

    // 如果只剩一个输入框，不允许删除
    if (currentItems.length <= 1) {
      console.log(`删除输入项 - 变量: ${variable}, 保留最后一个输入框`);
      return;
    }

    // 找到对应的输入项并删除
    const index = currentItems.findIndex((item) => item.id === itemId);
    if (index > -1) {
      currentItems.splice(index, 1);
      console.log(
        `删除输入项 - 变量: ${variable}, ID: ${itemId}, 剩余数量: ${currentItems.length}`
      );
      // 删除后重新检查重复
      checkDuplicate(variable);
      // 触发表单校验
      validateField(variable);
    }
  };

  // 退出 存草稿
  const saveDraft = () => {
    cancelRef.value.close();
    run(0);
  };

  let callback: (() => void) | null = null;
  const cancelSave = async () => {
    visible.value = false;
    await nextTick();
    cancelRef.value.close();
    if (callback && typeof callback === 'function') {
      callback();
      callback = null;
    }
  };

  const cancelRef = ref();
  const cancel = async (fn?: (() => void) | null) => {
    if (
      isEqual(getFormData(), form.value) ||
      (Object.keys(form.value)?.length === 0 &&
        Object.values(getFormData())?.filter((item) => item)?.length === 0)
    ) {
      visible.value = false;
      if (fn && typeof fn === 'function') {
        fn();
      }
    } else {
      cancelRef.value?.open();
      if (fn && typeof fn === 'function') {
        callback = fn;
      }
    }
  };

  defineExpose({
    open,
  });

  // 统计弹窗停留时长
  const dialogStartTime = ref<number>(0);
  const reportDuration = () => {
    if (dialogStartTime.value > 0) {
      const duration = Date.now() - dialogStartTime.value;
      report('page_leave_config_page', {
        workflow_id: workflowCode.value || extractLetters(curInstanceCode.value),
        stay_duration: Math.round(duration / 1000),
      });
      dialogStartTime.value = 0;
    }
  };
  // 监听弹窗显示隐藏状态，统计停留时长
  watch(visible, (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // 弹窗打开
      dialogStartTime.value = Date.now();
    } else if (!newVal && oldVal) {
      // 弹窗关闭，上报停留时长
      reportDuration();
    }
  });

  // 获取下载模板
  const getTemplate = async () => {
    const res = await productFileApi.luteosAiFileQueryImportTemplate({
      importScene: 'new_product_opportunity_asin_import',
    });
    return urlDownload(res.templateUrl as string);
  };

  // 上传文件
  const fileList = ref([]);
  const upload = ref();
  const handleClear = () => {
    fileList.value = [];
    upload.value[0]?.clearFile();
    ElMessage.success('清空成功');
  };

  const handleFileSuccess = debounce(() => {
    ElMessage.success('上传成功');
  }, 300);

  const handleFileDelete = (index) => {
    fileList.value.splice(index, 1);
  };
</script>

<style scoped lang="scss">
  :deep(.el-form-item--label-top .el-form-item__label) {
    display: inline-flex;
    width: 100%;
    align-items: center;
  }
  :deep(.el-input__suffix-inner) {
    font-size: 12px;
    color: #c5c5c5;
  }
  :deep(.el-input .el-input__count) {
    color: #c5c5c5;
  }
  .label-btn {
    width: 100%;
    .multiple-links {
      color: var(---N5, #bec0bf);
      margin-left: 10px;
    }
    .btns {
      gap: 6px;
    }
    .clear-data {
      color: var(---N6, #8a8f8d);
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    :deep(.upload-container) {
      display: block;
    }
  }
  .icon-chexiao {
    margin-left: 6px;
    font-size: 14px;
    &:hover {
      color: #c5c5c5 !important;
    }
  }

  .max-length {
    display: flex;
    gap: 10px;
    margin-left: 10px;
    color: #c5c5c5;
  }

  .tag-list {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 6px;
    .tag-item {
      display: inline-flex;
      height: 24px;
      max-width: 172px;
      padding: 1px 8px;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 1px solid var(---N3, #ededed);
      background: var(---N2, #f5f5f5);
      &:hover {
        border: 1px solid var(---C4, #02b96b);
        background: var(---N0, #fff);
      }
      .icon-guanbi {
        font-size: 14px;
        color: #999999;
        cursor: pointer;
        &:hover {
          color: var(---C4, #02b96b);
        }
      }
    }
  }

  .dialog-title {
    display: flex;
    align-items: center;
    gap: 8px;
    .icon-jiantouxiangzuo {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .input-bg {
    // background-color: var(---N1);
    border-radius: 6px;
    width: 100%;
  }

  .input-items {
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    // padding: 8px;
    gap: 8px;
    .input-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .el-input {
      width: 148px;

      &:hover {
        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px var(--el-color-primary);
        }
        .delete-icon {
          display: flex;
        }
      }

      &.is-error {
        :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px var(--el-color-danger) !important;
        }
      }
    }
    .delete-icon {
      cursor: pointer;
      color: #999;
      display: none;
    }
  }
  :deep(.table-input) {
    // margin-bottom: 10px;
    .el-input__wrapper {
      border: none;
      box-shadow: none !important;
      padding: 0;
      .el-input__inner {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .add-more-button {
    // color: #666;
    :deep(.el-icon) {
      font-size: 12px;
    }
  }
  .add-more-button-table {
    width: 100%;
    justify-content: flex-start;
    padding: 10px 12px;
    color: var(---N9, #262626);
  }

  .table-form-error {
    :deep(.el-form-item__error) {
      left: 75px;
      bottom: 46px;
      z-index: 2;
      top: auto;
    }
    :deep(.el-form-item__content) {
      border: 1px solid #efefef;
      border-radius: 6px;
    }
  }

  :global(.el-popover.el-popper) {
    padding: 0;
  }

  .popover-content {
    width: 398px;
    .popover-title {
      padding: 16px 16px 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        color: var(---N9, #262626);
        font-size: 13px;
        font-weight: 500;
        font-family: 'PingFang SC Medium';
        line-height: 22px;
      }
      .clear-btn {
        color: var(---N6, #8a8f8d);
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .popover-files {
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 300px;
      overflow: auto;
      .file-item {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        font-size: 12px;
        border-radius: 8px;
        &:hover {
          background-color: var(---N1);
        }
        .file-icon {
          width: 15px;
          height: 15px;
          margin-right: 4px;
          background-position: center;
          background-size: cover;
          &.site {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-site.png');
          }
          &.md {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-md.png');
          }
          &.pdf {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-pdf.png');
          }
          &.docx {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-docx.png');
          }
          &.ppt {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-ppt.png');
          }
          &.xlsx {
            background-image: url('@/views/newProductAnalysis/assets/images/icon-excel.png');
          }
        }
        .file-name {
          color: var(---N9, #262626);
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .delete-btn {
          width: 16px;
          height: 16px;
          color: var(---N6, #8a8f8d);
          margin-left: 12px;
          line-height: 16px;
          &:hover {
            opacity: 0.7;
            cursor: pointer;
          }
        }
        :deep(.content) {
          flex: 1 0 0;
        }
      }
    }
  }
</style>
