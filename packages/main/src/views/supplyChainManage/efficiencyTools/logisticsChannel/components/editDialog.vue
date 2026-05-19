<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :title="isEdit ? '编辑物流渠道' : '新增物流渠道'"
    width="800px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="物流商" prop="supplierCode">
            <span>{{ formData.supplierName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物流渠道名称" prop="channelName" required>
            <el-input v-model="formData.channelName" placeholder="请输入物流渠道名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="物流渠道编码" prop="channelCode" required>
            <el-input v-model="formData.channelCode" placeholder="请输入物流渠道编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费方式" prop="chargeType" required>
            <el-select v-model="formData.chargeType">
              <el-option label="计费重（KG）" value="weight" />
              <el-option label="实重（KG）" value="max_weight" />
              <el-option label="体积（CBM）" value="volume" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="体积重系数" prop="volumeWeightCoefficient" required>
            <el-input v-model="formData.volumeWeightCoefficient" placeholder="请输入体积重系数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="头程物流方式" prop="firstLogTransportId" required>
            <TransportSelect v-model="formData.firstLogTransportId" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="预估时效" prop="estimatedTime">
            <el-input
              v-model="formData.prescriptionList[0].prescription"
              style="width: 46%"
              @blur="validateDaysRange()"
            />
            <span>~</span>
            <el-input
              v-model="formData.prescriptionList[0].prescriptionMax"
              style="width: 46%"
              @blur="validateDaysRange()"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="目的国家"
            v-for="(item, $index) in formData?.prescriptionList"
            :key="$index"
          >
            <CountrySelect
              v-model="formData.prescriptionList[$index].destinationCountry"
              placeholder="目的国家"
              multiple
              filterable
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="formData.status"
              active-text="启用"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="绑定仓库" prop="bindWarehouseList">
            <WarehouseSelect v-model="formData.bindWarehouseList" clearable multiple />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';
  import TransportSelect from './TransportSelect.vue';

  const props = defineProps<{
    supplier: {
      supplierCode: string;
      supplierName: string;
    };
  }>();

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const isEdit = computed(() => !!formData.value.id);
  const formRef = ref<FormInstance>();
  const initFormData = () => ({
    supplierCode: props.supplier.supplierCode, // 物流商
    supplierName: props.supplier.supplierName, // 物流商
    channelName: '', // 物流渠道名称
    channelCode: '', // 物流渠道编码
    calculateMethod: 'weight', // 计算方式
    volumeWeightCoefficient: '', // 体积重系数
    status: 1, // 状态
    firstLogTransportId: '', // 头程物流方式
    prescriptionList: [
      {
        destinationCountry: [],
        prescription: undefined,
        prescriptionMax: undefined,
      },
    ], // 目的国家
    bindWarehouseList: [], // 绑定仓库
  });
  // 表单数据
  const formData = ref(Object.assign(initFormData()));

  // 表单校验规则
  const rules = reactive<FormRules>({
    channelName: [{ required: true, message: '请输入物流渠道名称', trigger: 'blur' }],
    channelCode: [{ required: true, message: '请输入物流渠道编码', trigger: 'blur' }],
    chargeType: [{ required: true, message: '请选择计费方式', trigger: 'change' }],
    volumeWeightCoefficient: [{ required: true, message: '请输入体积重系数', trigger: 'blur' }],
    firstLogTransportId: [{ required: true, message: '请选择头程物流方式', trigger: 'change' }],
  });
  // 验证天数范围
  const validateDaysRange = () => {
    const { prescription, prescriptionMax } = formData.value?.prescriptionList[0];

    // 验证是否为正整数
    if (prescription !== null && !/^[1-9]\d*$/.test(prescription!.toString())) {
      ElMessage.warning('预估时效只可以输入正整数');
      formData.value.prescriptionList[0].prescription = null;
      return false;
    }

    if (prescriptionMax !== null && !/^[1-9]\d*$/.test(prescriptionMax!.toString())) {
      ElMessage.warning('预估时效只可以输入正整数');
      formData.value.prescriptionList[0].prescriptionMax = null;
      return false;
    }

    // 验证最小天数是否小于最大天数
    if (
      prescription !== null &&
      prescriptionMax !== null &&
      Number(prescription) >= Number(prescriptionMax)
    ) {
      ElMessage.warning('最小时效必须小于最大时效');
      formData.value.prescriptionList[0].prescriptionMax = null;
      return false;
    }

    return true;
  };

  const handlePrescriptionList = () => {
    const { prescriptionList } = formData.value;
    if (prescriptionList.length === 0) {
      return undefined;
    }
    if (Array.isArray(prescriptionList[0].destinationCountry)) {
      // 如果目的国家是数组，则将目的国家按所选国家长度遍历并添加时效数据
      const { prescription, prescriptionMax } = prescriptionList[0];
      const validTime = prescription > 0 && prescriptionMax > 0;
      const result = prescriptionList[0].destinationCountry.map((item) => ({
        destinationCountry: item,
        prescription: validTime ? Number(prescription) : null,
        prescriptionMax: validTime ? Number(prescriptionMax) : null,
      }));
      return result;
    }
  };
  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;

    await formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          try {
            // 调用API保存数据
            const newFormData = { ...formData.value, prescriptionList: handlePrescriptionList() };
            console.log(newFormData, 'deal');
            isEdit.value
              ? await erpApi.luteosErpLogisticsChannelUpdate(newFormData)
              : await erpApi.luteosErpLogisticsChannelAdd(newFormData);
            // 提示成功
            ElMessage.success(`${isEdit.value ? '编辑' : '添加'}物流渠道成功`);
            visible.value = false;
            emit('success');
          } catch (error) {
            console.error('保存失败', error);
            ElMessage.error(`${isEdit.value ? '编辑' : '添加'}物流渠道失败`);
          }
        }
      })
      .catch(() => false);
  };

  // 关闭弹窗时重置表单
  const handleClosed = () => {
    if (formRef.value) {
      formRef.value.resetFields();
    }
  };

  // 打开弹窗时，如果是编辑模式，需要填充表单数据
  const open = (val?: any) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (val) {
      const { prescriptionList } = val;
      let prescriptionListRes = [
        { destinationCountry: [], prescription: null, prescriptionMax: null },
      ];

      if (prescriptionList?.length) {
        const destinationCountry = prescriptionList.map((item) => item.destinationCountry);
        prescriptionListRes = [
          {
            destinationCountry,
            prescription: prescriptionList[0].prescription,
            prescriptionMax: prescriptionList[0].prescriptionMax,
          },
        ];
      }
      formData.value = {
        ...val,
        prescriptionList: prescriptionListRes,
        bindWarehouseList: val.bindWarehouseList.map((item) => item.warehouseCode),
      };
    } else {
      formData.value = { ...initFormData() };
    }
  };

  // 暴露方法给父组件使用
  defineExpose({
    open,
  });
</script>

<style scoped>
  .mx-2 {
    margin: 0 8px;
  }
</style>
