<template>
  <el-dialog
    width="800px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" class="form-height">
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺" prop="source">
            <ProductShopSelectFinance v-model="form.source" placeholder="请选择店铺" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="币别" prop="targetExt1">
            <CurrencySelect v-model="form.targetExt1" placeholder="请选择币别" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库" prop="target">
            <!-- <WarehouseSelect
              v-model="form.target"
              placeholder="请选择仓库"
              clearable
              :filterFBA="false"
            />  -->
            <el-select v-model="form.target" filterable clearable placeholder="请选择仓库">
              <el-option
                v-for="item in targetList"
                :key="item.warehouseCode"
                :label="item.warehouseName"
                :value="item.warehouseCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金蝶部门编码" prop="targetExt2">
            <el-input v-model.trim="form.targetExt2" placeholder="金蝶部门编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效时间" prop="vaildStartTime">
            <el-date-picker
              style="width: 100%"
              type="date"
              v-model="form.vaildStartTime"
              value-format="YYYY-MM-DD"
              placeholder="请选择日期"
              :disabled-date="(time) => dayjs(time)?.isAfter(dayjs(form?.vaildEndTime))"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="失效时间" prop="vaildEndTime">
            <el-date-picker
              style="width: 100%"
              type="date"
              v-model="form.vaildEndTime"
              value-format="YYYY-MM-DD"
              placeholder="请选择日期"
              :disabled-date="(time) => dayjs(time)?.isBefore(dayjs(form?.vaildStartTime))"
            />
            <span class="fs-7 text-gray-600">注：失效当天仍然生效，次日零点起失效</span>
          </el-form-item>
        </el-col>
      </el-row>
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
  import { platformApi, FinanceSystemApi, financeSystemApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const visible = ref(false);
  const title = ref('');
  const targetList = ref([]);

  const form = ref({
    target: '',
    source: '',
    targetExt1: '',
    targetExt2: '',
    vaildStartTime: '',
    vaildEndTime: '',
    mappingCode: 'finance_mapping_shop_warehouse',
  });
  const formRef = ref(null);
  const rules = reactive({
    source: [{ required: true, message: '请选择店铺' }],
    targetExt1: [{ required: true, message: '请选择币别' }],
    vaildStartTime: [{ required: true, message: '请选择生效时间' }],
    vaildEndTime: [{ required: true, message: '请选择失效时间' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await platformApi.platformMappingSaveOrUpdate(form.value);
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    getTargetList();
    if (row) {
      title.value = '编辑关系';
      form.value = cloneDeep(row);
    } else {
      title.value = '新增关系';
      form.value = {
        target: '',
        source: '',
        targetExt1: '',
        targetExt2: '',
        vaildStartTime: '',
        vaildEndTime: '',
        mappingCode: 'finance_mapping_shop_warehouse',
      };
    }
    visible.value = true;
    formRef.value?.clearValidate();
  };
  const getTargetList = async () => {
    const param = {
      pageNum: 1,
      pageSize: 1000,
      status: 1, // 默认启动，页面只显示启用的仓库数据
    };
    const res = await financeSystemApi.financeBasicQueryWarehouseList(param);

    targetList.value = res.warehouseList;
    console.log(res);
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .form-height {
    height: 300px;
  }
</style>
