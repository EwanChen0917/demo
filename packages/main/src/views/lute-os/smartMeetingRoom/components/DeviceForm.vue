<template>
  <el-form :model="form" class="device-form" label-width="110px">
    <el-form-item label="设备类型">
      <el-select v-model="form.deviceType" :disabled="readonly" placeholder="请选择设备类型" clearable @change="handleDeviceTypeChange">
        <el-option label="核心设备" :value="1" />
        <el-option label="辅助设备" :value="0" />
      </el-select>
    </el-form-item>

    <el-form-item label="选择设备">
      <el-select
        v-model="form.deviceCode"
        :disabled="readonly"
        placeholder="请选择设备"
        @change="handleDeviceChange"
        clearable
        filterable
      >
        <el-option
          v-for="item in deviceList"
          :key="item.deviceCode"
          :label="item.deviceDesc"
          :value="item.deviceCode"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="设备型号">
      <el-input
        v-model="form.deviceModel"
        :disabled="true"
        placeholder="自动填充"
        style="background: #ddd"
      />
    </el-form-item>

    <el-form-item label="累计运行时长">
      <el-input
        v-model="form.operationHours"
        :disabled="true"
        placeholder="自动填充"
        style="background: #ddd"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
  const props = defineProps({
    readonly: {
      type: Boolean,
      default: false,
    },
    deviceList: {
      type: Array,
      default: () => [],
    },
    operationType: {
      type: String,
    },
  });
  const form = defineModel('form');
  const emit = defineEmits(['deviceTypeChange']);

  function handleDeviceTypeChange(val) {
    emit('deviceTypeChange', {...form.value, deviceType: val, operationType: props.operationType});
    form.value.deviceCode = '';
    form.value.deviceModel = '';
    form.value.operationHours = '';
  }

  function handleDeviceChange(val) {
    const device = props.deviceList.find((item) => item.deviceCode === val);
    form.value.deviceModel = device?.deviceModel;
    form.value.operationHours = device?.operationHours;
  }
</script>

<style lang="scss" scoped>
  .device-form {
    .el-input[disabled],
    .el-select .el-input.is-disabled {
      background: #ddd !important;
      color: #666;
    }
  }
</style>
