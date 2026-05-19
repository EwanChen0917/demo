<template>
  <KeenCard>
    <el-form :model="form" ref="formRef" :rules="rules" label-width="150">
      <el-form-item label="品线：" prop="productLine">
        <el-input class="form-item" v-model="form.productLine" clearable placeholder="请输入品线" />
      </el-form-item>
      <el-form-item label="产品负责人：" prop="productLeaderCode">
        <OperatorSelect
          class="form-item"
          v-model="form.productLeaderCode"
          placeholder="请选择产品负责人"
        />
      </el-form-item>
      <el-form-item label="GTM负责人：" prop="gtmLeaderCode">
        <DeptMember
          class="form-item"
          v-model="form.gtmLeaderCode"
          placeholder="请选择GTM负责人"
          deptCode="gtm"
          :searchChildDept="false"
        />
      </el-form-item>
      <el-form-item label="关联产品：">
        <el-button type="primary" @click="bindGoodsVisible = true">选择产品</el-button>
        <el-table :data="form.productBeanList" row-key="productSpu">
          <el-table-column label="产品信息" min-width="200">
            <!--            <template #default="scope">
              <div class="d-flex align-items-center">
                <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.productImage" />
                <div class="ms-5">
                  <span class="text-gray-800 fs-5 fw-bold">
                    {{ scope.row.name }}
                  </span>
                </div>
              </div>
            </template>-->
            <template #default="{ row }">
              <GoodsInfo :src="row.productImage" :title="row.name" :subtitle="row.productSpu" />
            </template>
          </el-table-column>
          <el-table-column prop="productSkuCount" label="SKU数量">
            <template #default="scope">
              <el-button type="text" @click="toSkuList(scope.row.productSpu)">
                {{ scope.row.productSkuCount }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productManagerName" label="产品经理" />
          <el-table-column prop="categoryLevel" label="分类" min-width="160" />
          <el-table-column label="操作">
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '取消关联',
                    key: 'del',
                    type: 'danger',
                    plain: true,
                    index: scope.$index,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </KeenCard>
  <div class="d-flex justify-content-end">
    <el-button @click="cancel">取消</el-button>
    <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
  </div>
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.productBeanList"
  />
</template>

<script setup lang="ts" name="productlineEdit">
  import BindGoods from '@/views/lute-os/goodscenter/bindGoods/Modal/bindGoods.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { productApi } from '@/api';
  import { openWindow } from '@/utils';
  import { success } from '@/utils/swal';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const route = useRoute();
  const router = useRouter();

  const formRef = ref();
  const form = ref({
    productLine: '',
    gtmLeaderCode: '',
    productLeaderCode: '',
    productBeanList: [],
    spuCodeList: [],
  });

  const rules = reactive({
    // 校验规则
    productLine: [
      {
        required: true,
        message: '请输入品线',
        trigger: 'blur',
      },
    ],
    gtmLeaderCode: [
      {
        required: true,
        message: '请选择GTM负责人',
        trigger: 'change',
      },
    ],
    productLeaderCode: [
      {
        required: true,
        message: '请选择产品负责人',
        trigger: 'change',
      },
    ],
  });

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.unbindConfirm();
      if (!isConfirmed) return;
      form.value.productBeanList.splice(index, 1);
    }
  };

  const queryProductLineDetail = async () => {
    const res = await productApi.luteosProductLineQueryDetail({
      code,
    });
    form.value = res;
  };

  const code = route.query?.code;
  if (code) {
    queryProductLineDetail();
  }

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.productBeanList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    if (!form.value.productBeanList.length) {
      ElMessage.warning('请先选择产品');
      return;
    }
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductLineSaveOrUpdate({
        ...form.value,
        spuCodeList: form.value.productBeanList.map((item) => item.productSpu),
      });
      ElMessage.success('保存成功');
      if (res?.length > 0) {
        let content = '';
        res?.forEach((item) => {
          content += `${item.spuName}由【${item.productLineOld}】变更为【${item.productLineNew}】<br/>`;
        });
        await swal.success({
          html: content,
        });
      }
      router.go(-1);
    } finally {
      saveLoading.value = false;
    }
  };

  const cancel = async () => {
    const isConfirmed = await swal.confirm('确认取消吗？');
    if (isConfirmed) {
      router.go(-1);
    }
  };

  const toSkuList = (productSpu) => {
    const path = router.resolve(`/skulist?productSpu=${productSpu}`);
    openWindow(path.href);
  };
</script>

<style scoped lang="scss">
  .form-item {
    width: 30% !important;
    min-width: 200px;
    max-width: 400px;
  }
</style>
