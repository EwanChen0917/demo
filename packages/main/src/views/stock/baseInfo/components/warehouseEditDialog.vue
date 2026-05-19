<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? '编辑仓库主数据' : '新增仓库主数据'"
    width="920px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="dialog-content">
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="110px">
        <div class="section-title">仓库信息</div>
        <div class="section-grid">
          <el-form-item v-if="isEdit" label="仓库编码">
            <el-input
              v-model="formModel.physicalWarehouseCode"
              placeholder="请输入仓库编码"
              disabled
            />
          </el-form-item>
          <el-form-item label="仓库名称" prop="physicalWarehouseName">
            <el-input
              v-model="formModel.physicalWarehouseName"
              placeholder="请输入仓库名称"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="仓库类型" prop="warehouseCategory">
            <el-select
              v-model="formModel.warehouseCategory"
              placeholder="请选择仓库类型"
              :options="warehouseCategoryMap"
              clearable
            />
          </el-form-item>
          <el-form-item label="业务类型" prop="businessType">
            <el-select
              v-model="formModel.businessType"
              placeholder="请选择业务类型"
              :options="businessTypeMap"
              clearable
            />
          </el-form-item>
          <el-form-item label="国家" prop="countryCode">
            <CountrySelect v-model="formModel.countryCode" placeholder="请选择国家" clearable />
          </el-form-item>
        </div>

        <div class="section-title">公司信息</div>
        <div class="section-grid">
          <el-form-item label="公司编码" prop="companyCode">
            <el-input
              v-model="formModel.companyCode"
              placeholder="请输入公司编码"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="formModel.companyName"
              placeholder="请输入公司名称"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </div>

        <div class="section-title">职能仓信息</div>
        <div class="section-grid">
          <el-form-item label="职能仓编码">
            <el-input
              v-model="formModel.functionWarehouseCode"
              placeholder="请输入职能仓编码"
              disabled
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="职能仓名称" prop="functionWarehouseName">
            <!-- <el-input v-model="formModel.functionWarehouseName" placeholder="请输入职能仓名称" /> -->
            <el-select
              v-model="formModel.functionWarehouseCode"
              placeholder="请选择职能仓名称"
              :options="functionWarehouseNameOptions"
              filterable
              clearble
              @change="handleFunctionWarehouseCodeChange"
            />
          </el-form-item>
          <el-form-item label="职能仓状态" prop="functionStatus">
            <el-select
              v-model="formModel.functionStatus"
              placeholder="请选择职能仓状态"
              :options="functionStatusMap"
              clearable
            />
          </el-form-item>
          <el-form-item label="销售渠道" prop="channelCodes">
            <el-select
              v-model="formModel.channelCodes"
              placeholder="请选择销售渠道"
              :options="channelList"
              multiple
              clearable
              filterable
            />
          </el-form-item>
        </div>

        <div class="section-title">服务商信息</div>
        <div class="section-grid">
          <!-- <el-form-item label="服务商编码">
            <el-input v-model="formModel.providerCode" placeholder="请输入服务商编码" />
          </el-form-item> -->
          <el-form-item label="服务商名称" prop="serviceProviderName">
            <el-input
              v-model="formModel.serviceProviderName"
              placeholder="请输入服务商名称"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="服务商账号" prop="serviceProviderAccount">
            <el-input
              v-model="formModel.serviceProviderAccount"
              placeholder="请输入服务商账号"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submit" :loading="submitLoading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { ElMessage } from 'element-plus/es';
  import type { FormInstance } from 'element-plus/es';

  import { mdsApi } from '@/api';
  import { MdsWarehouseRelSubmitReq } from '@/api/MDS/data-contracts';
  import {
    businessTypeMap,
    functionStatusMap,
    warehouseCategoryMap,
  } from '../hooks/constantConfig';
  import baseInfoCommon from '../hooks/baseInfoCommon';

  type WarehouseFormModel = MdsWarehouseRelSubmitReq & {
    warehouseStatus?: string;
    serviceProviderCode?: string;
  };
  const visible = ref(false);
  const currentRow = ref<WarehouseFormModel | null>(null);
  const isEdit = ref(false);
  const { getChannelList, channelList, getFunctionStatusList, functionStatusList } =
    baseInfoCommon();
  const submitLoading = ref(false);
  const formRef = ref<FormInstance>();
  const emit = defineEmits<{
    (e: 'success'): void;
  }>();
  const createDefaultFormModel = (): WarehouseFormModel => ({
    id: undefined,
    physicalWarehouseCode: '',
    physicalWarehouseName: '',
    warehouseCategory: '',
    warehouseStatus: '',
    businessType: '',
    companyCode: '',
    companyName: '',
    functionWarehouseCode: '',
    functionWarehouseName: '',
    functionStatus: undefined,
    channelCodes: [],
    serviceProviderCode: '',
    serviceProviderName: '',
    serviceProviderAccount: '',
    countryCode: '',
  });
  const formModel = ref(createDefaultFormModel());
  const functionWarehouseNameOptions = computed(() => {
    const list = functionStatusList.value as any[] | undefined;
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
      const warehouseCode = item?.value?.warehouseCode ?? '';
      const warehouseDesc = item?.value?.warehouseDesc ?? '';
      return {
        // 按你的要求：code 作为 value（字段回填用）
        value: warehouseCode,
        // label 采用 code/desc 组合，便于用户识别
        label: `${warehouseDesc}_${warehouseCode}`,
      };
    });
  });

  const handleFunctionWarehouseCodeChange = (code: string) => {
    const list = functionStatusList.value as any[] | undefined;
    if (!Array.isArray(list)) return;
    const found = list.find((item) => item?.value?.warehouseCode === code);
    formModel.value.functionWarehouseCode = found?.value?.warehouseCode ?? '';
    formModel.value.functionWarehouseName = found?.value?.warehouseDesc ?? '';
  };

  const syncFunctionWarehouseFields = () => {
    const list = functionStatusList.value as any[] | undefined;
    if (!Array.isArray(list)) return;
    // 优先通过编码回填名称（因为下拉的 value 用的是 code）
    if (formModel.value.functionWarehouseCode) {
      const found = list.find(
        (item) => item?.value?.warehouseCode === formModel.value.functionWarehouseCode
      );
      if (found?.value?.warehouseDesc) {
        formModel.value.functionWarehouseName = found.value.warehouseDesc;
      }
    }

    // 兜底：如果只有名称，则反查编码
    if (formModel.value.functionWarehouseName && !formModel.value.functionWarehouseCode) {
      const found = list.find(
        (item) => item?.value?.warehouseDesc === formModel.value.functionWarehouseName
      );
      formModel.value.functionWarehouseCode = found?.value?.warehouseCode ?? '';
    }
  };
  const formRules = {
    physicalWarehouseName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
    companyCode: [{ required: true, message: '请输入公司编码', trigger: 'blur' }],
    companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请选择国家', trigger: 'change' }],
    warehouseCategory: [{ required: true, message: '请选择仓库类型', trigger: 'change' }],
    businessType: [{ required: true, message: '请选择业务类型', trigger: 'change' }],
    functionWarehouseName: [{ required: true, message: '请输入职能仓名称', trigger: 'blur' }],
    functionStatus: [{ required: true, message: '请选择职能仓状态', trigger: 'change' }],
    channelCodes: [{ required: true, message: '请选择销售渠道', trigger: 'change' }],
    // serviceProviderName: [{ required: true, message: '请输入服务商名称', trigger: 'blur' }],
    // serviceProviderAccount: [{ required: true, message: '请输入服务商账号', trigger: 'blur' }],
  } as const;

  const clear = () => {
    currentRow.value = null;
    isEdit.value = false;
    formModel.value = createDefaultFormModel();
    submitLoading.value = false;
    formRef.value?.clearValidate();
  };

  const open = (row?: WarehouseFormModel) => {
    clear();
    currentRow.value = row ?? null;
    isEdit.value = !!row;
    if (row) {
      formModel.value = {
        ...createDefaultFormModel(),
        ...row,
      };
    }
    syncFunctionWarehouseFields();
    visible.value = true;
  };

  const handleClose = () => {
    visible.value = false;
    clear();
  };

  const submit = async () => {
    if (submitLoading.value) return;

    try {
      const valid = await formRef.value?.validate().catch(() => false);
      if (!valid) return;

      // 编辑模式必须有 id
      if (isEdit.value && !formModel.value.id) {
        return;
      }
      submitLoading.value = true;
      const payload = { ...formModel.value };
      await mdsApi.luteosMdsWarehouseSubmit(payload);
      ElMessage.success('提交成功');
      emit('success');
      handleClose();
    } catch (error) {
      ElMessage.error(error instanceof Error ? error.message : '提交失败');
    } finally {
      submitLoading.value = false;
    }
  };
  onMounted(() => {
    getChannelList();
    getFunctionStatusList();
  });
  defineExpose({
    open,
    clear,
  });
</script>

<style scoped lang="scss">
  .dialog-content {
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 8px;
  }

  .section-title {
    margin: 6px 0 12px;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
  }

  .section-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
  }
</style>
