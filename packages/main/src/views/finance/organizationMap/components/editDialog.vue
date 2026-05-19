<template>
  <el-dialog
    width="800px"
    :title="title"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" class="form-height">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属组织" prop="target">
            <el-select v-model="form.target" placeholder="所属组织" filterable clearable>
              <el-option
                v-for="item in organizationList"
                :label="item?.name"
                :value="item?.name"
                :key="item?.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${name}名称`" prop="source">
            <FinanceWarehouseSelect
              v-if="name === '仓库'"
              v-model="form.source"
              clearable
              @change="
                (val) => {
                  form.sourceExt1 = val;
                }
              "
            />
            <ProductShopSelectFinance v-else v-model="form.source" clearable />
            <!--            <el-input v-else v-model="form.source" clearable placeholder="请输入描述" />-->
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
  import { platformApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import ShopSelect from '@/views/goodscenter/goodsmanage/onlinegoods/components/shopSelect.vue';

  const emit = defineEmits<{
    (e: 'success'): void;
  }>();

  const props = defineProps<{
    name: string;
    mappingCode: string;
    organizationList: any[];
  }>();

  const visible = ref(false);
  const title = ref('');

  const form = ref({
    target: '',
    source: '',
    vaildStartTime: '',
    vaildEndTime: '',
    mappingCode: '',
  });
  const formRef = ref(null);
  const rules = reactive({
    target: [{ required: true, message: '请选择所属组织' }],
    source: [{ required: true, message: `请选择${props.name}名称` }],
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
    if (row) {
      title.value = `编辑${props.name}映射`;
      form.value = cloneDeep(row);
    } else {
      title.value = `新增${props.name}映射`;
      form.value = {
        target: '',
        source: '',
        vaildStartTime: '',
        vaildEndTime: '',
        mappingCode: props.mappingCode,
      };
    }
    visible.value = true;
    formRef.value?.clearValidate();
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
