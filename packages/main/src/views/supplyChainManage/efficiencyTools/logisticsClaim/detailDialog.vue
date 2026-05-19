<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :title="`物流索赔单`"
    width="800px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <el-form ref="formRef" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="索赔单号：" prop="claimNo">
            {{ row.claimNo }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务单号：" prop="businessNo">
            {{ row.businessNo }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型：" prop="type">
            {{ getEnumLabel(ClaimType, row.type) }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="异常分类：" prop="abnormalType">
            {{ getEnumLabel(ClaimGroupType, row.abnormalType) }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="索赔标准：" prop="claimStandard">
            {{ getEnumLabel(ClaimStandard, row.claimStandard) }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="赔偿金额(RMB)：" prop="compensationAmount">
            {{ row.compensationAmount }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="异常数量：" prop="abnormalQuantity">
            {{ row.abnormalQuantity }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位：" prop="unit">
            {{ row.unit }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="状态：" prop="proofDesc">
            <el-tag v-if="row.status === ClaimStatusEnum.已废弃" type="danger">已废弃</el-tag>
            <el-tag v-else-if="row.status === ClaimStatusEnum.已生效" type="success">已生效</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="创建人：" prop="creator">
            {{ row.creator }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间：" prop="createTime">
            {{ row.createTime }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="举证说明：" prop="proofDesc">
            <div style="word-break: break-all">{{ row.proofDesc }}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注：" prop="remark">
            <div style="word-break: break-all">{{ row.remark }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-space>
        <el-button @click="visible = false">关闭</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus';
  import { erpApi } from '@/api';
  import { ClaimGroupType, ClaimStandard, ClaimStatusEnum, ClaimType, getEnumLabel } from './enums';

  const row = ref(null);
  const visible = ref(false);
  const formRef = ref<FormInstance>();

  const handleClosed = () => {
    visible.value = false;
  };

  const open = (_row) => {
    row.value = { ..._row };
    visible.value = true;
    formData.value = {};
    formRef.value?.resetFields();
    if (_row?.id) {
      erpApi
        .luteosErpLogisticsClaimDetail({
          id: _row.id,
        })
        .then((res) => {
          if (res) {
            Object.assign(row.value, res);
          }
        });
    }
  };

  // 暴露方法给父组件使用
  defineExpose({
    open,
  });
</script>

<style scoped></style>
