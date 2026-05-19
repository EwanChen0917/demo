<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-dialog width="86%" title="添加产品标签" v-model="visible" @close="visible = false">
      <el-table :data="form?.list">
        <el-table-column label="产品SKU" prop="skuCode" min-width="180px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.skuCode'" :rules="rules.skuCode">
              <el-select
                v-model="row.skuCode"
                clearable
                filterable
                remote
                reserve-keyword
                placeholder="请输入"
                :remote-method="(query) => remoteMethod(query, $index)"
                :loading="loading"
                style="width: 240px"
                @clear="skuListMap[$index] = []"
                @change="
                  (val) => {
                    handleSkuChange(val, row, $index);
                  }
                "
              >
                <el-option
                  v-for="item in skuListMap[$index]"
                  :key="item.skuCode"
                  :label="item.skuCode"
                  :value="item.skuCode"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="productTitle" min-width="140px">
          <template #default="{ row }">
            <el-form-item>
              <span>{{ row?.productTitle }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="UPC码" min-width="180px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.upcCode'" :rules="rules.upcCode">
              <el-input
                placeholder="请输入"
                v-model="row.upcCode"
                clearable
                @change="
                  (val) => {
                    handleChange(val, $index);
                  }
                "
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="EAN码" min-width="180px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.eanCode'" :rules="rules.eanCode">
              <el-input
                placeholder="请输入"
                v-model="row.eanCode"
                clearable
                @change="
                  (val) => {
                    handleChange(val, $index);
                  }
                "
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="客户SKU编码" min-width="160px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.customerSkuCode'">
              <el-input placeholder="请输入" v-model="row.customerSkuCode" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="客户产品名称（英文）" min-width="160px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.productNameEn'">
              <el-input placeholder="请输入" v-model="row.productNameEn" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="客户产品描述" min-width="160px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.productDesc'">
              <el-input placeholder="请输入" v-model="row.productDesc" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="客户唯一码" min-width="140px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.uniqueCode'">
              <el-input placeholder="请输入" v-model="row.uniqueCode" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="GTIN" min-width="140px">
          <template #default="{ row, $index }">
            <el-form-item :prop="'list.' + $index + '.gtin'">
              <el-input placeholder="请输入" v-model="row.gtin" clearable />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #default="{ row, $index }">
            <el-form-item>
              <el-button type="primary" link @click="form.list.push({})">添加</el-button>
              <el-button
                type="danger"
                link
                @click="form.list.splice($index, 1)"
                :disabled="form.list?.length <= 1"
              >
                删除
              </el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts">
  import { erpApi, productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    list: [
      {
        skuCode: '',
        upcCode: '',
        eanCode: '',
      },
    ],
  });
  const rules = ref({
    skuCode: [{ required: true, message: '请输入产品SKU', trigger: ['blur', 'change'] }],
    upcCode: [
      {
        validator(rule, value, callback) {
          const index = rule?.field?.split('.')[1];
          if (!value && !form.value?.list[index]?.eanCode) {
            callback(new Error('UPC码、EAN码至少填写一个'));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
    eanCode: [
      {
        validator(rule, value, callback) {
          const index = rule?.field?.split('.')[1];
          if (!value && !form.value?.list[index]?.upcCode) {
            callback(new Error('UPC码、EAN码至少填写一个'));
          } else {
            callback();
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpBaseB2BClientSaveOrUpdateProduct({
        reqList: form.value.list?.map((item) => {
          return {
            ...item,
            customerCode: customerCode.value,
          };
        }),
      });
      if (res?.errorList?.length > 0) {
        swal.error(`${res?.errorList?.join(',')}已存在，请勿重复添加`);
      } else {
        ElMessage.success('操作成功');
        formRef.value?.clearValidate();
        visible.value = false;
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const customerCode = ref();
  const open = (code) => {
    skuListMap.value = {};
    form.value = {};
    form.value.list = [
      {
        skuCode: '',
        upcCode: '',
        eanCode: '',
      },
    ];
    customerCode.value = code;
    formRef.value?.resetFields();
    visible.value = true;
  };

  // sku查询
  const skuListMap = ref<any>({});
  const loading = ref(false);
  const remoteMethod = async (query: string, index) => {
    if (query.trim()) {
      loading.value = true;
      skuListMap.value[index] = [];
      const res: any = await productApi
        .luteosProductSkuQueryProductSkuList({
          keyWord: query,
          pageSize: 30,
          pageNum: 1,
        })
        .finally(() => {
          loading.value = false;
        });
      if (res) {
        const selectSku = form.value.list?.map((item) => item.skuCode);
        console.log(selectSku);
        skuListMap.value[index] =
          res.productSkuBeanList?.filter((item) => !selectSku?.includes(item?.skuCode)) || [];
      }
    }
  };

  const handleSkuChange = (val, row, index) => {
    const item = skuListMap.value[index]?.find((sku) => val === sku.skuCode);
    if (item) {
      row.productTitle = item.productTitle;
    }
  };

  const handleChange = (_, index) => {
    formRef.value?.validateField([`list.${index}.upcCode`, `list.${index}.eanCode`]);
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
