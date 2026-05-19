<template>
  <el-dialog title="新增试用商品" :model-value="visible" @close="$emit('close')" width="900">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="150">
      <el-form-item label="归属渠道：" prop="channelCode">
        <el-select
          v-model="form.channelCode"
          placeholder="归属渠道"
          clearable
          :teleported="false"
          @change="handleChannelChange"
        >
          <el-option v-for="(val, key) in channelMap" :key="key" :label="val || ''" :value="key!" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="商品名称："
        prop="productName"
        required
        v-if="form.channelCode === 'amazon'"
      >
        <el-input v-model="form.productName" placeholder="请输入商品名称" />
      </el-form-item>
      <!--        上传图片-->
      <el-form-item prop="imageUrl" v-if="form.channelCode === 'amazon'">
        <KeenImageUpload
          v-model="form.imageUrl"
          directory="activity/trial"
          tooltip="更改商品图片"
          @update:model-value="handleImageChange"
        />
      </el-form-item>
      <el-form-item
        label="商品信息："
        prop="productName"
        required
        v-if="form.channelCode === 'shopify'"
      >
        <div class="w-100 d-flex gap-5">
          <KeenImageUpload v-model="form.imageUrl" directory="station/product" disabled />
          <div class="flex-column" v-if="form.productName">
            <div>{{ form.productName }}</div>
            <div>{{ form.skuCode }}</div>
            <div>{{ form.price }} USD</div>
          </div>
          <el-button type="primary" size="small" @click="handleBindGoods">选择商品</el-button>
        </div>
      </el-form-item>
      <el-form-item label="活动图：" prop="productImageNew" required>
        <KeenImageUpload
          v-model="form.productImageNew"
          directory="station/activity"
          tooltip="选择活动图片"
        />
      </el-form-item>
      <el-form-item label="可申请对象：" prop="applicableUser">
        <el-select v-model="form.applicableUser">
          <el-option label="完成任务用户" value="fin_task" />
          <el-option label="所有用户" value="all" />
        </el-select>
      </el-form-item>
      <el-form-item label="试用数量：" prop="totalCount">
        <el-input v-model="form.totalCount" placeholder="请输入试用数量" />
      </el-form-item>
      <el-form-item label="试用活动名称：" prop="trialActivity">
        <el-input v-model="form.trialActivity" placeholder="请输入试用活动名称" />
      </el-form-item>
      <el-form-item label="试用描述" prop="trialDesc" required>
        <el-input
          v-model="form.trialDesc"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          placeholder="请输入试用描述"
        />
      </el-form-item>
      <el-form-item label="试用要求" prop="trialClaim" required>
        <el-input
          v-model="form.trialClaim"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          placeholder="请输入试用要求"
        />
      </el-form-item>
      <el-form-item label="是否签署保密协议" prop="signFlag">
        <el-radio-group v-model="form.signFlag" class="ml-4">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效时间" prop="time" required>
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="-"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="年 / 月 / 日"
          end-placeholder="年 / 月 / 日"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" class="ml-4">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    confirm-text="确认"
    :select-one="true"
    @close="handleBindGoodsClose"
    type="shopify"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { activityApi, ActivityApi } from '@/api/index';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';

  const channelMap = reactive({
    shopify: '独立站',
    amazon: '亚马逊',
  });
  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ActivityApi.LuteosActivityTrialSaveTrialProduct.RequestBody>({
    /** 归属渠道, station、amazon */
    channelCode: '',
    /** 创建人 */
    creator: '',
    /**
     * 结束时间
     * @format date-time
     */
    endTime: '',
    /** 图片地址 */
    imageUrl: '',
    /** SPU */
    productCode: '',
    /** 商品名称 */
    productName: '',
    /**
     * 是否签署保密协议 0-否 1-是
     * @format int32
     */
    signFlag: 0,
    /**
     * 开始时间
     * @format date-time
     */
    startTime: '',
    /**
     * 状态 0-关闭 1-开启
     * @format int32
     */
    status: 0,
    /**
     * 总数
     * @format int32
     */
    totalCount: '',
    /** 试用要求 */
    trialClaim: '',
    /** 试用编码 更新时必传 */
    trialCode: '',
    /** 试用描述 */
    trialDesc: '',
    price: '',
    productId: '',
    variantsId: '',
  });
  const rules = reactive<FormRules>({
    channelCode: [
      {
        required: true,
        message: '请选择归属渠道',
        trigger: ['blur', 'change'],
      },
    ],
    productName: [
      {
        required: true,
        message: form.channelCode === 'amazon' ? '请输入商品名称' : '请选择商品',
        trigger: ['blur', 'change'],
      },
      {
        max: 100,
        message: '请输入100个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    totalCount: [
      {
        required: true,
        message: '请输入试用数量',
        trigger: ['blur', 'change'],
      },
      { pattern: /^\d{1,8}$/, message: '请输入8位以内数字' },
    ],
    applicableUser: [
      {
        required: true,
        message: '请选择可申请对象',
        trigger: ['change'],
      },
    ],
    trialActivity: [
      {
        required: true,
        message: '请输入试用活动名称',
        trigger: ['blur', 'change'],
      },
      {
        max: 100,
        message: '请输入100个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    trialDesc: [
      {
        required: true,
        message: '请输入试用描述',
        trigger: ['blur', 'change'],
      },
      {
        max: 500,
        message: '请输入500个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    trialClaim: [
      {
        required: true,
        message: '请输入试用要求',
        trigger: ['blur', 'change'],
      },
      {
        max: 500,
        message: '请输入500个字符以内',
        trigger: ['blur', 'change'],
      },
    ],
    time: [
      {
        required: true,
        message: '请选择有效时间',
        trigger: ['blur', 'change'],
      },
    ],
    imageUrl: [
      {
        required: true,
        message: '请选择商品图片',
        trigger: 'change',
      },
    ],
    productImageNew: [
      {
        required: true,
        message: '请上传活动图片',
        trigger: ['change'],
      },
    ],
  });

  const handleImageChange = () => {
    formRef.value.validateField('imageUrl');
  };

  // 选择商品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.productName = val.title;
      form.skuCode = val.sku;
      form.price = val.price;
      form.productId = val.productId;
      form.variantsId = val.variantsId;
      form.imageUrl = val.image;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        try {
          form.startTime = form.time[0] || '';
          form.endTime = form.time[1] || '';
          await activityApi.luteosActivityTrialSaveTrialProduct(form);

          // FIXME 修改交互
          ElMessage.success({
            message: '保存成功',
            duration: 5 * 1000,
          });
          saveLoading.value = false;
          emit('close', true);
        } catch (e) {
          // do nothing
        } finally {
          saveLoading.value = false;
        }
      } catch (e) {
        saveLoading.value = false;
      }
    }
  };

  // 切换归属渠道
  const handleChannelChange = () => {
    form.productName = '';
    form.productCode = '';
    form.price = '';
    form.imageUrl = '';
  };
  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };
</script>
