<template>
  <el-form :model="form" ref="formRef" label-position="top" :rules="rules">
    <el-dialog title="配置大促活动" :model-value="visible" @close="emit('close')">
      <el-form-item :label="isEdit ? '原大促主题' : '大促主题'" prop="taskPromotionCode">
        <div class="d-flex w-100 gap-2">
          <el-select
            style="width: 100%"
            v-model="form.taskPromotionCode"
            placeholder="请选择大促主题"
            @change="handleNameChange"
          >
            <el-option
              v-for="item in taskPromotionList"
              :label="item.name"
              :value="item.taskPromotionCode"
              :key="item.taskPromotionCode"
            />
            <template #footer>
              <div class="d-flex gap-2">
                <el-input v-model="newName" size="small" placeholder="创建主题" />
                <el-button type="primary" size="small" @click="createName" :disabled="!newName">
                  创建
                </el-button>
              </div>
            </template>
          </el-select>
          <el-button type="primary" v-if="isEdit" @click="editCancel">取消</el-button>
          <el-button type="primary" v-else-if="form.taskPromotionCode" @click="isEdit = true">
            编辑主题
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="修改后大促主题" v-if="isEdit" prop="name">
        <el-input v-model="form.name" placeholder="请输入大促主题" clearable />
      </el-form-item>
      <el-form-item label="大促时间" prop="effectiveTime">
        <el-date-picker
          :disabled="!form.taskPromotionCode"
          v-model="form.effectiveTime"
          start-placeholder="折扣开始时间"
          end-placeholder="折扣结束时间"
          type="daterange"
          value-format="YYYY-MM-DD"
          @change="
            (dateArr) => {
              form.promotionStartDate = dateArr ? dateArr[0] : '';
              form.promotionEndDate = dateArr ? dateArr[1] : '';
            }
          "
        />
      </el-form-item>
       <el-form-item
        label="大促申请提交截至日期"
        prop="submitEndDate"
      >
        <el-date-picker
          v-model="form.submitEndDate"
          type="date"
          placeholder="提交截至日期"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="大促折扣力度" prop="discount">
        <el-input
          v-model="form.discount"
          placeholder="请输入大促折扣力度"
          clearable
          :disabled="!form.taskPromotionCode"
        />
      </el-form-item>
      <el-form-item label="大促相关运营人员" prop="operatorList">
        <DeptMember
          deptCode="red_station_operator"
          placeholder="请选择运营人员"
          v-model="form.operatorList"
          :disabled="!form.taskPromotionCode"
          multiple
          clearable
        />
        <span class="fs-8 text-gray-600">
          请正确选择大促期间相关运营人员，系统将随机平均分配大促期间折扣码配置任务至相关运营人员
        </span>
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('close')">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts">
  import { metaApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const newName = ref('');
  const formRef = ref();
  const form = ref({
    name: undefined,
    promotionStartDate: '',
    promotionEndDate: '',
    submitEndDate: '',
    discount: '',
    operatorList: [],
  });

  const rules = reactive({
    taskPromotionCode: [{ required: true, message: '请选择大促主题', trigger: 'change' }],
    name: [{ required: true, message: '请输入修改后大促主题', trigger: ['blur', 'change'] }],
    effectiveTime: [{ required: true, message: '请选择大促时间', trigger: ['blur', 'change'] }],
    submitEndDate: [{ required: true, message: '请选择提交截至日期', trigger: ['blur', 'change'] }],
    discount: [{ required: true, message: '请输入大促折扣力度', trigger: ['blur', 'change'] }],
    operatorList: [
      { required: true, message: '请选择大促相关运营人员', trigger: ['blur', 'change'] },
    ],
  });

  const isEdit = ref(false);
  const taskPromotionList = ref([]);
  const queryMarkTaskPromotionList = async () => {
    const res = await metaApi.luteosMetaTaskPromotionQueryMarkTaskPromotionList();
    taskPromotionList.value = res?.taskPromotionList;
  };
  queryMarkTaskPromotionList();

  const handleNameChange = (val) => {
    if (val) {
      const taskPromotion = taskPromotionList.value.find((item) => item.taskPromotionCode === val);
      form.value.discount = taskPromotion.discount;
      form.value.operatorList = taskPromotion.operatorList;
      form.value.promotionStartDate = taskPromotion.promotionStartDate;
      form.value.promotionEndDate = taskPromotion.promotionEndDate;
      form.value.effectiveTime = [taskPromotion.promotionStartDate, taskPromotion.promotionEndDate];
      form.value.submitEndDate = taskPromotion.submitEndDate;
      formRef.value.validateField('effectiveTime');
    } else {
      form.value.discount = '';
      form.value.operatorList = [];
      form.value.effectiveTime = [];
      form.value.submitEndDate = '';
    }
  };
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    await metaApi.luteosMetaTaskPromotionSaveMarkTaskPromotion(form.value);
    ElMessage.success('保存成功');
    emit('close');
  };

  const createName = async () => {
    await metaApi.luteosMetaTaskPromotionSaveMarkTaskPromotion({
      name: newName.value,
    });
    ElMessage.success('创建成功');
    await queryMarkTaskPromotionList();
    newName.value = '';
  };

  const editCancel = () => {
    form.value.name = undefined;
    isEdit.value = false;
  };
</script>

<style scoped lang="scss"></style>
