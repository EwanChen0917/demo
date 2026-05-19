<template>
  <el-form
    ref="formRef"
    :model="props.form"
    label-width="170"
    label-position="left"
    style="max-width: 800px"
    class="mx-7"
  >
    <template v-if="isDetail">
      <el-form-item label="创建人：">
        <span>{{ form?.creatorName }}</span>
      </el-form-item>
      <el-form-item label="成交单位：">
        <span>{{ form?.transactionUnit }}</span>
      </el-form-item>
      <el-form-item label="申报价值：">
        <span>{{ form?.declarePrice }}</span>
      </el-form-item>
      <el-form-item label="产品毛重：">
        <span>{{ form?.productGrossWeight }}</span>
      </el-form-item>
      <el-form-item label="海关品名：">
        <span>{{ form?.hsProductName }}</span>
      </el-form-item>
      <el-form-item label="海关编码：">
        <span>{{ form?.hsCode }}</span>
      </el-form-item>
      <el-form-item label="申报要素：">
        <span>{{ form?.declareElement }}</span>
      </el-form-item>
      <el-form-item label="备注：">
        <span>{{ form?.remark }}</span>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="创建人：">
        <el-select v-model="form.creator" filterable clearable>
          <el-option
            v-for="item in creatorList"
            :value="item.value"
            :label="item.label"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="成交单位：">
        <el-input v-model="form.transactionUnit" />
      </el-form-item>
      <el-form-item label="申报价值：">
        <el-input v-model="form.declarePrice" />
      </el-form-item>
      <el-form-item label="产品毛重：">
        <el-input v-model="form.productGrossWeight" />
      </el-form-item>
      <el-form-item label="海关品名：">
        <el-input v-model="form.hsProductName" />
      </el-form-item>
      <el-form-item label="海关编码：">
        <el-input v-model="form.hsCode" />
      </el-form-item>
      <el-form-item label="申报要素：">
        <el-input v-model="form.declareElement" />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="form.remark" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';

  const props = defineProps<{
    form: any;
    isDetail?: boolean;
  }>();

  const creatorList = ref<any[]>([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  if (!props.isDetail) getCreatorList();
</script>

<style scoped lang="scss"></style>
