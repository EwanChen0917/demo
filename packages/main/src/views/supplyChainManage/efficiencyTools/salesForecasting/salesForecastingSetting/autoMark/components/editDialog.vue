<template>
  <el-dialog width="900px" :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <h5>基础信息</h5>
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入规则名称" />
      </el-form-item>
      <el-form-item label="打标类型" prop="type">
        <el-select v-model="form.type" placeholder="打标类型" clearable @change="handleTypeChange">
          <el-option label="销量" :value="1" />
          <el-option label="预测" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tagItemCode">
        <el-select v-model="form.tagItemCode" placeholder="标签" clearable>
          <el-option
            v-for="item in tagItemList"
            :key="item.itemCode"
            :label="item.name"
            :value="item.itemCode"
          >
            <el-space>
              <img :src="item.fullIconUrl" style="width: 20px; height: 20px" />
              <span>{{ item.name }}</span>
            </el-space>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用渠道" prop="channel">
        <el-select v-model="form.channel" multiple clearable>
          <el-option value="amazon" label="Amazon" />
          <el-option value="shopify" label="Shopify" />
          <el-option value="walmart" label="Walmart" />
          <el-option value="tiktok" label="TikTok" />
          <el-option value="mercadocbt" label="Mercadocbt" />
        </el-select>
      </el-form-item>
      <el-form-item label="规则条件" prop="ruleType">
        <el-radio-group v-model="form.ruleType">
          <el-radio :label="0">全部满足</el-radio>
          <el-radio :label="1">任意满足</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <h5>打标规则</h5>
      <el-table :data="form.ruleList">
        <el-table-column label="参数" width="100px">
          <template #default="{ row }">
            <span>{{ form.type === 1 ? '今日销量' : '本周预测' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规则明细" width="450px">
          <template #default="{ row, $index }">
            <el-space>
              <el-select v-model="row.type1" style="width: 120px">
                <el-option
                  v-for="(val, key) in ruleTypeMap[form.type]"
                  :key="key"
                  :label="val"
                  :value="key"
                />
              </el-select>
              <el-select
                v-model="row.type2"
                style="width: 60px"
                @change="
                  () => {
                    handleType2Change(row);
                  }
                "
              >
                <el-option :value="1" label="+" />
                <el-option :value="2" label="-" />
                <el-option :value="3" label="*" />
              </el-select>
              <div class="d-flex mt-7">
                <el-select v-model="row.type3">
                  <el-option :value="1" label="数量" />
                  <el-option :value="2" label="百分比%" />
                </el-select>
                <el-form-item
                  label-width="0"
                  :prop="`ruleList.${$index}.type3Value`"
                  :rules="rules.type3Value"
                >
                  <el-input v-model="row.type3Value" placeholder="请输入" />
                </el-form-item>
              </div>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '新增',
                  key: 'add',
                  type: 'primary',
                  row,
                },
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  hide: form.ruleList?.length === 1,
                  row,
                  index: $index,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();
  const form = ref({
    name: '',
    type: 1,
    channel: [],
    ruleList: [
      {
        type1: '100',
        type2: 3,
        type3: 2,
      },
    ],
    tagItemCode: '',
    ruleType: 0,
    status: 0,
  });

  const rules = reactive({
    name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    channel: [{ required: true, message: '请选择应用渠道', trigger: 'change' }],
    tagItemCode: [{ required: true, message: '请选择标签项', trigger: 'change' }],
    type: [{ required: true, message: '请选择打标类型', trigger: 'change' }],
    ruleType: [{ required: true, message: '请选择规则条件', trigger: 'change' }],
    type3Value: [{ required: true, message: '请输入', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  });

  const ruleTypeMap = {
    1: {
      '100': '较昨日',
      '101avg': '较3日日均',
      '102avg': '较7日日均',
      '103avg': '较15日日均',
      '104avg': '较30日日均',
      '105avg': '较60日日均',
      '106avg': '较90日日均',
    },
    2: {
      '200avg': '较上周',
      '201avg': '较两周平均',
      '202avg': '较三周平均',
      '204avg': '较四周平均',
      '205avg': '较五周平均',
      '206avg': '较六周平均',
      '207avg': '较七周平均',
      '208avg': '较八周平均',
    },
  };

  const tagItemList = ref([]);
  const queryTagItemList = async (type) => {
    const res = await erpApi.luteosErpPlanPsftQueryOptionList({
      type,
    });
    tagItemList.value = res.recordList;
  };

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpPlanPsfatSaveOrUpdate(form.value);
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'add') {
      form.value.ruleList.push(
        form.value.type === 1
          ? {
              type1: '100',
              type2: 3,
              type3: 2,
            }
          : {
              type1: '200avg',
              type2: 3,
              type3: 2,
            }
      );
    } else if (key === 'del') {
      form.value.ruleList.splice(index, 1);
    }
  };

  const handleTypeChange = (val) => {
    form.value.tagItemCode = '';
    queryTagItemList(val);
    form.value.ruleList =
      val === 1
        ? [
            {
              type1: '100',
              type2: 3,
              type3: 2,
            },
          ]
        : [
            {
              type1: '200avg',
              type2: 3,
              type3: 2,
            },
          ];
  };

  const handleType2Change = (row) => {
    row.type3 = row.type2 === 3 ? 2 : 1;
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      title.value = '编辑自动打标';
      form.value = { ...row };
    } else {
      title.value = '新增自动打标';
      form.value = {
        name: '',
        type: 1,
        channel: [],
        ruleList: [
          {
            type1: '100',
            type2: 3,
            type3: 2,
          },
        ],
        tagItemCode: '',
        ruleType: 0,
        status: 0,
      };
    }
    queryTagItemList(form.value.type);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
