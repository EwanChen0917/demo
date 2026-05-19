<template>
  <el-dialog
    class="batchSetStockModal"
    :title="title"
    v-model="visible"
    @close="close"
    width="700px"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="130px"
      style="padding-right: 70px"
      label-position="right"
    >
      <el-form-item label="监控类型：" prop="">
        <el-radio-group v-model="form.minitorType" @change="changeMonitor">
          <el-radio label="BS榜单" :value="1" />
          <el-radio label="指定ASIN" :value="0" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运营：" prop="operator">
        <DeptMember v-model="form.operator" placeholder="请选择" deptId="65717209" clearable />
      </el-form-item>
      <el-form-item label="亚马逊运营组：" prop="gtmGroup">
        <!-- <LtMultiSelect
          v-model="form.gtmGroup"
          :options="gtmList"
          label-prop="deptName"
          value-prop="deptId"
          placeholder="请选择"
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
        /> -->
        <el-select placeholder="请选择" v-model="form.gtmGroup" clearable>
          <el-option
            v-for="(item, key) in gtmList"
            :key="key"
            :label="item.deptName"
            :value="item.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组长：" prop="leader">
        <DeptMember v-model="form.leader" placeholder="请选择" deptId="65717209" clearable />
      </el-form-item>
      <el-form-item label="站点：" prop="site">
        <CountrySelect v-model="form.site" placeholder="请选择" clearable />
      </el-form-item>
      <el-form-item label="产品分类：" v-if="form.minitorType === 1" prop="categoryLevelCode">
        <CategoryCascader
          v-model="form.categoryLevelCode"
          placeholder="请选择"
          :emit-path="false"
          filterable
          style="width: 100%"
          @change="
            (val) => {
              // console.log(val);
              form.categoryLevel = val.level;
            }
          "
        />
      </el-form-item>
      <el-form-item label="监控链接：" prop="url">
        <el-input
          v-model="form.url"
          placeholder="请输入"
          clearable
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入"
          clearable
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- <ResultDialog ref="resultDialogRef" /> -->
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import CategoryCascader from '@/views/goodscenter/components/categoryCascader.vue';
  import { productApi } from '@/api/index';
  // import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
  // import { cloneDeep } from 'lodash-es';
  // import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManageNew/components/ResultDialog.vue';

  const userInfoStore = useStore();
  const { getInfo } = userInfoStore;
  const userInfo = getInfo;

  const props = defineProps<{
    title: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  const visible = ref(false);

  const changeMonitor = () => {
    console.log('changeMonitor');
  };
  const open = ({ gtmArr }) => {
    // console.log(userInfo, userInfo?.memberCode);
    // console.log('codeList', codeList);
    gtmList.value = gtmArr;
    // console.log(gtmList.value);
    visible.value = true;
    form.value = {
      minitorType: 1,
      // operator: 'M02192555256437291108',
      operator: userInfo?.memberCode,
      leader: userInfo?.managerUserid,
      gtmGroup: userInfo?.deptInfo?.deptId,
      // idList: codeList,
    };
    formRef.value?.clearValidate();
  };

  const close = () => {
    // remark.value = '';
    form.value = {
      deliveryCode: '',
      warehouseCode: '',
      shippingCode: '',
    };
    visible.value = false;
  };

  defineExpose({
    open,
  });

  // 表单定义
  const formRef = ref<FormInstance>();
  const form: any = ref({
    minitorType: 1,
    operator: '',
    leader: '',
    gtmGroup: '',
    site: '',
    url: '',
    categoryLevelCode: '',
    categoryLevel: '',
    remark: '',
    idList: [],
  });
  const rules = reactive<FormRules>({
    operator: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    leader: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    site: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    gtmGroup: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    categoryLevelCode: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    url: [
      {
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
  });
  // 选中

  const gtmList: any = ref([]);

  const resultDialogRef = ref();
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    // console.log(valid);
    if (valid) {
      try {
        saveLoading.value = true;
        // console.log(orderList.value, {
        //   ...form.value,
        //   erpCodeList: orderList.value,
        // });
        console.log(form.value);
        // return;
        const res = await productApi.luteosProductRankingListSave({
          ...form.value,
        });
        if (res?.failList?.length) {
          // resultDialogRef.value?.open(res?.failList, '批量设置仓库物流失败订单');
        } else {
          ElMessage.success('操作成功');
        }
        emit('close');
        visible.value = false;
        // form.value = {
        //   operator: '',
        //   leader: '',
        //   idList: [],
        // };
      } finally {
        saveLoading.value = false;
      }
    }
  };
</script>

<style scoped>
  :global(.keen-ui .batchSetStockModal .el-form-item__content) {
    margin: 0 !important;
    line-height: 32px !important;
  }

  :global(.keen-ui .batchSetStockModal .el-dialog__body) {
    height: 540px;
  }
  .fontcolor {
    font-size: 12px;
    color: #ff9f22 !important;

    i {
      margin-right: 4px;
    }
  }
  .textStyle {
    font-size: 12px !important;
    line-height: 20px;
    width: 100%;
    margin-top: 4px;
  }
  .timeicon {
    height: 20px;
    line-height: 20px;
    margin-top: 6px;
  }
</style>
