<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose" width="1200px">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left">
      <el-form-item label="组合SKU：" prop="combineSku" required>
        <el-input v-model="form.combineSku" :disabled="disabledCombimeSku" style="width: 400px" />
      </el-form-item>
      <el-button type="primary" @click="handleBindGoods" class="choose-sku">选择产品SKU</el-button>
      <div class="table-list">
        <el-table :data="form.skuList" row-key="productSpu">
          <el-table-column label="产品信息" min-width="200">
            <template #default="scope">
              <div class="d-flex align-items-center">
                <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.productImageUrl" />
                <div class="ms-5">
                  <span class="text-gray-800 fs-5 fw-bold">
                    {{ scope.row.productTitle }}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productSku" label="产品中心SKU" />
          <el-table-column label="数量">
            <template #default="scope">
              <div style="padding-top: 20px">
                <el-form-item
                  label="数量："
                  :prop="`skuList[${scope.$index}].quantity`"
                  :rules="[
                    { required: true, message: '请输入数量', trigger: ['blur', 'change'] },
                    { pattern: /^[1-9]\d*$/, message: '请输入大于0的正整数', trigger: 'blur' },
                  ]"
                >
                  <el-input v-model="form.skuList[scope.$index].quantity" style="width: 200px" />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productSku" label="产品价格">
            <template #default="{ row }">
              <template v-if="row.suggestSellPrice">
                {{ row.currencyCode }}
                {{ row.suggestSellPrice }}
              </template>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '删除',
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
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
  <BindSku
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="form.skuList"
  />
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import BindSku from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';

  const props = defineProps<{
    visible: boolean;
    title: string;
    combineSku: string;
    skuList: Array<Object>;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'save'): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductSkuSaveCombineProduct.RequestBody>({
    combineSku: '',
    skuList: [],
  });
  const rules = reactive<FormRules>({
    combineSku: [
      {
        required: true,
        message: '请输入组合SKU',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const disabledCombimeSku = ref(false);

  // 编辑场景回显数据
  onMounted(() => {
    form.combineSku = props.combineSku;
    form.skuList = props.skuList;
    disabledCombimeSku.value = !!props.combineSku;
  });

  // 选择产品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    bindGoodsVisible.value = true;
  };
  // 保存选择的SKU
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      // val.forEach((item) => {
      //   if (!form.skuList.find((sku: any) => sku.productSku === item.productSku)) {
      //     form.skuList(item);
      //   }
      // });
      form.skuList = val;
      bindGoodsVisible.value = false;
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 删除
  const handleActions = async (item) => {
    const { key, index } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      form.skuList.splice(index, 1);
    }
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        if (!form.skuList.length) {
          ElMessage.warning({
            message: '请选择产品SKU',
            duration: 3 * 1000,
          });
          return;
        }
        saveLoading.value = true;

        const skuList: any = [];
        form.skuList.forEach((item: any) => {
          skuList.push({
            quantity: +item.quantity,
            skuCode: item.productSku,
          });
        });
        const res: any = await productApi.luteosProductSkuSaveCombineProduct({
          combineSku: form.combineSku,
          skuList,
        });
        if (res.combineSku) {
          saveLoading.value = false;
          ElMessage.success({
            message: `${props.title}成功`,
            duration: 3 * 1000,
          });
          emit('save');
        }
      } catch (e) {
        saveLoading.value = false;
      }
    }
  };
  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };
  // 关闭弹窗
  const handleClose = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    form.combineSku = '';
    form.skuList = [];
    emit('close');
  };
</script>

<style scoped>
  .choose-sku {
    position: relative;
    left: 1000px;
  }
</style>
