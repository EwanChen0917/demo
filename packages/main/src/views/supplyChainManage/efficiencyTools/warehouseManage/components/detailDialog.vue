<template>
  <el-dialog
    :title="title"
    v-model="visibility"
    width="500px"
    :before-close="close"
    @open="getWarehouseList"
  >
    <el-form
      :model="form"
      :validate-on-rule-change="false"
      ref="formRef"
      :rules="rules"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item label="选择仓库" prop="warehouseCode">
            <el-select
              style="width: 100%"
              v-model="form.warehouseCode"
              clearable
              filterable
              :disabled="mode === 'edit'"
            >
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseCode"
                :label="item.warehouseName"
                :value="item.warehouseCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="仓库类型" prop="warehouseType">
            <el-select style="width: 100%" v-model="form.warehouseType" clearable filterable>
              <el-option label="本地仓" :value="2" />
              <el-option label="海外仓" :value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="归属渠道" prop="channel">
            <el-select
              style="width: 100%"
              v-model="form.channel"
              placeholder="请选择归属渠道"
              filterable
              clearable
              :teleported="false"
            >
              <el-option
                v-for="channel of channelList"
                :key="channel.value"
                :label="channel.desc"
                :value="channel.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="归属国家" prop="country">
            <CountrySelect
              style="width: 100%"
              v-model="form.country"
              placeholder="归属国家"
              filterable
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="归属状态">
            <el-switch v-model="form.status" disabled :active-value="0" :inactive-value="1" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, reactive } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  defineProps({
    dickbook: {
      type: Object,
      default() {
        return {
          warehouse_channel: [],
        };
      },
    },
  });
  const visibility = ref(false);
  const title = computed(() => {
    return `${mode.value === 'add' ? '新增' : '编辑'}仓库归属`;
  });
  const warehouseList = ref<any[]>([]);
  const getWarehouseList = async () => {
    const res = await erpApi.luteosErpWarehouseAffiliationQueryWarehouseList();
    warehouseList.value = (res as []) || [];
  };
  const form = ref({
    channel: '',
    country: '',
    warehouseCode: '',
    warehouseType: '',
    status: 0,
  });
  const mode = ref('add');
  const formRef = ref();
  const rules = reactive({
    channel: [{ required: true, message: '请选择渠道' }],
    country: [{ required: true, message: '请选择国家' }],
    warehouseCode: [{ required: true, message: '请选择仓库' }],
    warehouseType: [{ required: true, message: '请选择仓库类型' }],
  });
  const open = (data?, m = 'add') => {
    if (m === 'edit') {
      form.value.channel = data.channel;
      form.value.country = data.country;
      form.value.warehouseCode = data.warehouseCode;
      form.value.status = data.status;
      form.value.warehouseType = data.warehouseType;
    }
    mode.value = m;
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpWarehouseAffiliationSave({
        channel: form.value.channel,
        country: form.value.country,
        warehouseCode: form.value.warehouseCode,
        warehouseType: form.value.warehouseType,
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      channel: '',
      country: '',
      warehouseCode: '',
      warehouseType: '',
      status: 1,
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();

  const channelList = ref([]);
  const queryChannelList = async () => {
    const res = await erpApi.luteosErpWarehouseAffiliationAllList();
    channelList.value = res;
  };
  queryChannelList();

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
