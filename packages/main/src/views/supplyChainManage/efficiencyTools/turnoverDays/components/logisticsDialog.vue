<template>
  <el-dialog
    class="logistics-dialog"
    title="物流方式"
    v-model="visibility"
    width="600px"
    :before-close="close"
  >
    <div>
      <el-button type="primary" plain @click="add">新增</el-button>
    </div>
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-position="top">
      <el-table :data="form.planTurnOverLogisticsList">
        <el-table-column label="物流方式">
          <template #default="scope">
            <el-form-item
              :prop="`planTurnOverLogisticsList[${scope.$index}].name`"
              :rules="[
                {
                  required: true,
                  message: '请输入物流方式',
                },
              ]"
            >
              <el-input v-model="scope.row.name" placeholder="" maxlength="100" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="站点" min-width="100">
          <template #default="scope">
            <el-form-item
              :prop="`planTurnOverLogisticsList[${scope.$index}].site`"
              :rules="[
                {
                  required: true,
                  message: '请选择站点',
                },
              ]"
            >
              <el-select v-model="scope.row.site" placeholder="站点" filterable clearable>
                <el-option v-for="item in siteMap" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="物流天数（D）">
          <template #default="scope">
            <el-form-item
              :prop="`planTurnOverLogisticsList[${scope.$index}].day`"
              :rules="[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                  trigger: 'blur',
                  message: '请输入物流天数',
                },
              ]"
            >
              <Num v-model="scope.row.day" :min="0" :max="99999" :precision="0" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="remove(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import { useRouter } from 'vue-router';
  import { DeleteFilled } from '@element-plus/icons-vue';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  const router = useRouter();
  const visibility = ref(false);
  const form = ref<any>({
    planTurnOverLogisticsList: [
      {
        code: '',
        day: 0,
        name: '',
        site: '',
      },
    ],
  });
  const add = () => {
    form.value.planTurnOverLogisticsList.push({
      code: '',
      day: 0,
      name: '',
      site: '',
    });
  };
  const remove = (index) => {
    form.value.planTurnOverLogisticsList.splice(index, 1);
  };
  const formRef = ref();
  const open = () => {
    initData();
  };
  const initData = async () => {
    const res = await erpApi.luteosErpPlanTurnoverLogisticsQueryList();
    form.value.planTurnOverLogisticsList = res.planTurnOverLogisticsList;
    getSiteOptions();
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpPlanTurnoverLogisticsSave({
        planTurnOverLogisticsList: form.value.planTurnOverLogisticsList,
      });
      ElMessage.success('操作成功');
      emits('success');
      // const path = router.resolve({
      //   name: 'salesForecastingDetail',
      // });
      // router.push(path.href);
      close();
    }
  };
  const close = () => {
    form.value = {
      planTurnOverLogisticsList: [
        {
          code: '',
          day: 0,
          name: '',
          site: '',
        },
      ],
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const siteMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await erpApi.luteosErpBaseSiteQueryList({
      pageNum: 1,
      pageSize: 500,
    });
    siteMap.value = Array.from(new Set(res?.recordList?.map((item) => item.site) || []));
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .logistics-dialog {
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
    .form-row {
      position: relative;

      .remove-icon {
        position: absolute;
        right: -16px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        font-size: 0;
        color: #d1d1d1;
        cursor: pointer;

        .el-icon {
          font-size: 18px;
        }
      }

      &:hover {
        .remove-icon {
          color: inherit;
        }
      }
    }
  }
</style>
