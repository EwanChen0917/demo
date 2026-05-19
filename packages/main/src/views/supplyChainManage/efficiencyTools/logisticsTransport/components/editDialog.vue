<template>
  <el-dialog
    :title="isEdit ? '编辑物流方式' : '新增物流方式'"
    v-model="visible"
    :destroy-on-close="true"
    @closed="handleClosed"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="102px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="物流方式" prop="transportName" required>
            <el-input v-model="formData.transportName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物流方式简称" prop="transportCode" required>
            <el-input v-model="formData.transportCode" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发货国家" prop="shipperCountry" required>
            <CountrySelect
              v-model="formData.shipperCountry"
              clearable
              filterable
              style="width: 200px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计费方式" prop="chargeType" required>
            <el-select v-model="formData.chargeType">
              <el-option label="计费重(KG)" value="weight" />
              <el-option label="实重(KG)" value="max_weight" />
              <el-option label="体积(CBM)" value="volume" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="体积重系数" prop="volumeWeightCoefficient" required>
            <el-input v-model.number="formData.volumeWeightCoefficient" type="number" :min="0" />
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
      </el-row>
      <h5>预估时效</h5>
      <el-table :data="formData?.prescriptionList">
        <el-table-column label="目的国家" min-width="150">
          <template #default="{ row, $index }">
            <div>
              <CountrySelect v-model="row.destinationCountry" clearable filterable teleported />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预估时效" min-width="200">
          <template #default="{ $index }">
            <el-space>
              <el-input
                v-model.number="formData.prescriptionList[$index].prescription"
                :min="1"
                type="number"
                placeholder="最小天数"
                @blur="validateDaysRange($index)"
                style="min-width: 100px"
              />
              <span style="padding: 0 4px">~</span>
              <el-input
                v-model.number="formData.prescriptionList[$index].prescriptionMax"
                type="number"
                placeholder="最大天数"
                :min="1"
                @blur="validateDaysRange($index)"
                style="min-width: 100px"
              />
            </el-space>
          </template>
        </el-table-column>
        <el-table-column min-width="100">
          <template #default="{ $index }">
            <el-button
              v-if="$index === formData.prescriptionList.length - 1"
              type="primary"
              :icon="Plus"
              @click="addEstimatedTime"
            />
            <el-button v-else type="primary" :icon="Delete" @click="removeEstimatedTime($index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { FormInstance, FormRules, ElMessage } from 'element-plus';
  import { Plus, Delete } from '@element-plus/icons-vue';
  import { erpApi } from '@/api';

  const emit = defineEmits(['success']);

  // Define the transport data type
  interface EstimatedTime {
    destinationCountry: string;
    prescription: number | null;
    prescriptionMax: number | null;
    id?: number;
  }

  interface TransportData {
    id?: number;
    transportCode: string;
    transportName: string;
    shipperCountry: string;
    chargeType: string;
    volumeWeightCoefficient: number | string;
    status: number;
    prescriptionList: EstimatedTime[]; // 预估时效
  }

  const formRef = ref<FormInstance>();
  // Initialize form data
  const initFormData = (): TransportData => ({
    transportCode: '',
    transportName: '',
    shipperCountry: 'CN', // 默认中国
    chargeType: 'weight', // 默认计费重
    volumeWeightCoefficient: '',
    status: 1, // 默认启用
    prescriptionList: [
      {
        destinationCountry: '',
        prescription: null,
        prescriptionMax: null,
      },
    ],
  });

  const rules: FormRules = {
    transportCode: [{ required: true, message: '请输入物流方式', trigger: 'blur' }],
    transportName: [{ required: true, message: '请输入物流方式简称', trigger: 'blur' }],
    shipperCountry: [{ required: true, message: '请选择发货国家', trigger: 'change' }],
    chargeType: [{ required: true, message: '请选择计费方式', trigger: 'change' }],
    volumeWeightCoefficient: [
      { required: true, message: '请输入体积重系数', trigger: 'blur' },
      { type: 'number', message: '体积重系数必须为数字', trigger: 'blur' },
    ],
  };

  const formData = ref(Object.assign(initFormData()));

  const visible = ref(false);

  const open = (val) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (val) {
      const prescriptionListRes = val.prescriptionList.length
        ? val.prescriptionList
        : [
            {
              destinationCountry: '',
              prescription: null,
              prescriptionMax: null,
            },
          ];
      formData.value = { ...val, prescriptionList: prescriptionListRes };
    } else {
      formData.value = { ...initFormData() };
    }
  };
  const isEdit = computed(() => !!formData.value.id);

  const handleClosed = () => {
    formRef.value?.resetFields();
    Object.assign(formData, initFormData());
  };

  // 验证天数范围
  const validateDaysRange = (index: number) => {
    const { prescription, prescriptionMax } = formData.value?.prescriptionList[index];

    // 验证是否为正整数
    if (prescription !== null && !/^[1-9]\d*$/.test(prescription.toString())) {
      ElMessage.warning('预估天数只可以输入正整数');
      formData.value.prescriptionList[index].prescription = null;
      return false;
    }

    if (prescriptionMax !== null && !/^[1-9]\d*$/.test(prescriptionMax.toString())) {
      ElMessage.warning('预估天数只可以输入正整数');
      formData.value.prescriptionList[index].prescriptionMax = null;
      return false;
    }

    // 验证最小天数是否小于最大天数
    if (prescription !== null && prescriptionMax !== null && prescription >= prescriptionMax) {
      ElMessage.warning('最小天数必须小于最大天数');
      formData.value.prescriptionList[index].prescriptionMax = null;
      return false;
    }

    return true;
  };

  const addEstimatedTime = () => {
    formData.value?.prescriptionList!.push({
      destinationCountry: '',
      prescription: null,
      prescriptionMax: null,
    });
  };

  const removeEstimatedTime = (index: number) => {
    formData.value?.prescriptionList!.splice(index, 1);
  };

  const handleSubmit = async () => {
    if (!formRef.value) return;

    await formRef.value
      ?.validate(async (valid) => {
        if (valid) {
          // 过滤掉无效的预估时效（目的国家为空的记录）
          const prescriptionListRes = formData.value?.prescriptionList.filter(
            (item) =>
              item.destinationCountry &&
              (item.prescription !== null || item.prescriptionMax !== null)
          );
          formData.value.prescriptionList = prescriptionListRes;
          try {
            // 调用API保存数据
            isEdit.value
              ? await erpApi.luteosErpLogisticsTransportUpdate(formData.value)
              : await erpApi.luteosErpLogisticsTransportAdd(formData.value);

            // 提示成功
            ElMessage.success(`${isEdit.value ? '编辑' : '添加'}物流方式成功`);
            emit('success');
            visible.value = false;
          } catch (error) {
            console.error('保存失败', error);
            ElMessage.error(`${isEdit.value ? '编辑' : '添加'}物流方式失败`);
          }
        }
      })
      .catch(() => false);
  };

  defineExpose({
    open,
  });
</script>

<style scoped>
  .section-title {
    font-weight: bold;
    border-left: 4px solid #02b96b;
    padding-left: 10px;
    line-height: 20px;
  }
</style>
