<template>
  <el-dialog
    width="1000"
    :title="title"
    v-model="visible"
    @close="visible = false"
    align-center
    :close-on-click-modal="false"
  >
    <KeenCard title="规则设置" v-if="isCanEdit">
      <el-form
        ref="formRef"
        :model="form"
        label-width="100"
        scroll-to-error
        style="min-height: 220px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="处理方式" prop="type">
              <el-radio-group v-model="form.type" @change="handleTypeChange">
                <el-radio-button label="字符替换" value="REPLACE" />
                <el-radio-button label="字符截取" value="CUT" />
                <el-radio-button label="行汇总" value="ROW-SUM" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="form.type === 'REPLACE'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="查找内容" prop="replaceSearchContent" :rules="rules.mustFill">
                <el-input v-model="form.replaceSearchContent" placeholder="请输入查找内容" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="替换为" prop="replaceContent">
                <el-input v-model="form.replaceContent" placeholder="请输入替换为" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="替换范围">
                <el-radio-group v-model="form.replaceRange" @change="handlerReplaceRangeChange">
                  <el-radio label="all">全文替换</el-radio>
                  <el-radio label="column">按列替换</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="form.replaceRange === 'column'">
              <el-form-item label="目标列" prop="replaceColumn" :rules="rules.mustFill">
                <el-input v-model="form.replaceColumn" placeholder="请输入目标列" />
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.replaceRange === 'column'">
              <el-form-item label="存储方式">
                <el-radio-group v-model="form.storageMode" @change="handlerStorageModeChange">
                  <el-radio label="overwrite-column">覆盖原列</el-radio>
                  <el-radio label="new-column">新增列</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" />
          </el-row>
          <el-row>
            <el-col
              :span="8"
              v-if="form.replaceRange === 'column' && form.storageMode === 'new-column'"
            >
              <el-form-item
                label="新列名称"
                prop="newColumn"
                :rules="[rules.mustFill, rules.newColumn]"
              >
                <el-input v-model="form.newColumn" placeholder="请输入新列名称" />
                <span class="text-tip">仅支持字母、数字、下划线</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else-if="form.type === 'CUT'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="目标列" prop="subColumn" :rules="rules.mustFill">
                <el-input v-model="form.subColumn" placeholder="请输入目标列" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="15">
            <el-col :span="5">
              <el-form-item label="">
                <el-radio
                  v-model="form.cutType"
                  :value="cutTypes.位数截取"
                  label="位数截取"
                  @change="handlerCutTypeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="起始位"
                prop="subColumnStartIndex"
                :rules="form.cutType === cutTypes.位数截取 ? rules.mustFill : undefined"
              >
                <el-input
                  v-model="form.subColumnStartIndex"
                  :disabled="form.cutType !== cutTypes.位数截取"
                  placeholder=""
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="结束位"
                prop="subColumnEndIndex"
                :rules="form.cutType === cutTypes.位数截取 ? rules.mustFill : undefined"
              >
                <el-input
                  v-model="form.subColumnEndIndex"
                  :disabled="form.cutType !== cutTypes.位数截取"
                  placeholder=""
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              示例”FAD-564“需要取FAD，则设置【起始位1，结束位3或len-4】。len为长度值
            </el-col>
          </el-row>
          <el-row gutter="15">
            <el-col :span="5">
              <el-form-item label="">
                <el-radio
                  v-model="form.cutType"
                  :value="cutTypes.字符截断"
                  label="字符截断"
                  @change="handlerCutTypeChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="字符"
                prop="cutChar"
                :rules="form.cutType === cutTypes.字符截断 ? rules.mustFill : undefined"
              >
                <el-input v-model="form.cutChar" :disabled="form.cutType !== cutTypes.字符截断" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="序号"
                prop="cutIndex"
                :rules="form.cutType === cutTypes.字符截断 ? rules.mustFill : undefined"
              >
                <el-input v-model="form.cutIndex" :disabled="form.cutType !== cutTypes.字符截断" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="9">示例”FAD-564“需要取FAD，则设置【字符为“-”，序号为1】</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="存储方式" prop="storageMode">
                <el-radio-group v-model="form.storageMode" @change="handlerStorageModeChange">
                  <el-radio label="overwrite-column">覆盖原列</el-radio>
                  <el-radio label="new-column">新增列</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="form.storageMode === 'new-column'">
              <el-form-item
                label="新列名称"
                prop="newColumn"
                :rules="[rules.mustFill, rules.newColumn, rules.variableName]"
              >
                <el-input v-model="form.newColumn" placeholder="请输入新列名称" />
                <span class="text-tip">仅支持字母、数字、下划线</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else-if="form.type === 'ROW-SUM'">
          <el-row>
            <el-col :span="12">
              <div>
                <el-row v-for="(_, index) in form.rowSumGroupFields" :key="index" gutter="16">
                  <el-form-item
                    :label="index === 0 ? '汇总依据列' : ''"
                    :prop="`rowSumGroupFields.${index}`"
                    :rules="rules.mustFill"
                  >
                    <el-input v-model="form.rowSumGroupFields[index]" placeholder="请输入" />
                  </el-form-item>
                  <el-button
                    type="primary"
                    text
                    size="small"
                    @click="() => form.rowSumGroupFields.splice(index + 1, 0, '')"
                  >
                    新增
                  </el-button>
                  <el-button
                    type="danger"
                    text
                    size="small"
                    v-if="index >= 1"
                    @click="() => form.rowSumGroupFields.splice(index, 1)"
                  >
                    删除
                  </el-button>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-row v-for="(_, index) in form.rowSumFields" :key="index" gutter="16">
                  <el-form-item
                    :label="index === 0 ? '汇总计算列' : ''"
                    :prop="`rowSumFields.${index}`"
                    :rules="rules.mustFill"
                  >
                    <el-input v-model="form.rowSumFields[index]" placeholder="请输入" />
                  </el-form-item>

                  <el-button
                    type="primary"
                    text
                    size="small"
                    @click="() => form.rowSumFields.splice(index + 1, 0, '')"
                  >
                    新增
                  </el-button>
                  <el-button
                    type="danger"
                    text
                    size="small"
                    v-if="index >= 1"
                    @click="() => form.rowSumFields.splice(index, 1)"
                  >
                    删除
                  </el-button>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </template>
        <el-row class="flex flex-end">
          <el-button type="primary" @click="handlerAdd">添加至规则</el-button>
        </el-row>
      </el-form>
    </KeenCard>
    <KeenCard title="执行序列">
      <vxe-table
        ref="tableRef"
        :data="list"
        border
        show-header
        :row-config="{ drag: true }"
        @row-dragend="onRowDragEnd"
      >
        <vxe-column width="50" title="排序" drag-sort v-if="isCanEdit" />
        <vxe-column type="seq" title="序号" width="50" />
        <vxe-column field="detail" title="规则详情">
          <template #default="{ row }">
            {{ getExecuteShowData(row) }}
          </template>
        </vxe-column>
        <vxe-column title="操作" width="100" v-if="isCanEdit">
          <template #default="{ row, rowIndex }">
            <el-button type="danger" text @click="handlerDelete(rowIndex)">删除</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </KeenCard>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-if="isCanEdit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { getExecuteShowData } from '../preprocessingRule';
  import {cutTypes} from "@/views/finance/basic/preprocessingRule/enum";

  defineProps<{
    isCanEdit: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const title = ref('预处理设置');

  const tableRef = ref(null);

  const formRef = ref(null);
  const form = ref({});
  const row = ref({});

  const list = ref([]);

  const rules = {
    mustFill: {
      required: true,
      message: '请填写',
      trigger: 'blur',
    },
    newColumn: {
      trigger: 'blur',
      validator: (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9_]+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入字母、数字、下划线'));
        } else {
          callback();
        }
      },
    },
    variableName: {
      trigger: 'blur',
      validator: (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9_]+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入字母、数字、下划线'));
        } else {
          callback();
        }
      },
    },
  };

  const open = async (_row) => {
    row.value = _row;
    form.value = {};
    list.value = _row.pretreatmentRuleDbDetailExeBeans || [];
    handleTypeChange('REPLACE');
    visible.value = true;
    formRef.value?.clearValidate();
  };

  const handleTypeChange = (value) => {
    switch (value) {
      case 'REPLACE':
        form.value = {
          type: 'REPLACE',
          replaceSearchContent: '',
          replaceReplaceContent: '',
          replaceRange: 'all',
          replaceColumn: '',
          storageMode: 'overwrite-column',
          newColumn: '',
        };
        break;
      case 'CUT':
        form.value = {
          type: 'CUT',
          subColumn: '',
          subColumnStartIndex: '1',
          subColumnEndIndex: 'len',
          cutType: cutTypes.位数截取,
          cutChar: '-',
          cutIndex: '1',
          storageMode: 'overwrite-column',
          newColumn: '',
        };
        break;
      case 'ROW-SUM':
        form.value = {
          type: 'ROW-SUM',
          rowSumGroupFields: [''],
          rowSumFields: [''],
        };
        break;
    }
  };

  const handlerCutTypeChange = (value) => {
    if (value === cutTypes.位数截取) {
      formRef.value?.clearValidate(['cutChar', 'cutIndex']);
    } else if (value === cutTypes.字符截断) {
      formRef.value?.clearValidate(['subColumnStartIndex', 'subColumnEndIndex']);
    }
  };

  const handlerReplaceRangeChange = (value) => {
    if (value === 'all') {
      form.value.replaceColumn = '';
      form.value.storageMode = 'overwrite-column';
      form.value.newColumn = '';
    }
  };

  const handlerStorageModeChange = (value) => {
    if (value === 'overwrite-column') {
      form.value.newColumn = '';
    }
  };

  const handlerAdd = async () => {
    const valid = await formRef.value.validate();
    if (!valid) {
      return;
    }
    list.value.push(form.value);
    handleTypeChange(form.value.type);
    formRef.value?.clearValidate();
    ElMessage.success('已添加');
  };

  const handlerDelete = async (index) => {
    const isConfirmed = await swal.confirm('确认删除吗？');
    if (!isConfirmed) return;
    list.value.splice(index, 1);
  };

  const onRowDragEnd = () => {
    list.value = tableRef.value.getFullData();
  };

  const save = async () => {
    emit(
      'success',
      row.value,
      list.value.map((x, i) => {
        const obj = {
          ...x,
          lineNum: i + 1,
          exeFormulaShow: getExecuteShowData(x),
        };
        delete obj._X_ROW_KEY;
        return obj;
      })
    );
    ElMessage.success('保存成功');
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss" scoped>
  .text-tip {
    color: #999;
  }
</style>
