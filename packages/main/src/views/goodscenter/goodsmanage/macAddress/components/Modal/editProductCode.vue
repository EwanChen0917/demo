<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose" width="900px">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <div class="d-flex">
        <el-form-item
          label="产品代码："
          prop="productCode"
          :rules="[
            { required: true, message: '产品代码不能为空', trigger: ['blur', 'change'] },
            { pattern: /^[0-9A-Fa-f]{3}$/, message: '请输入3位十六进制值' },
          ]"
          class="mr-20"
        >
          <div v-if="isDetail" class="w-200">{{ form.productCode }}</div>
          <el-input
            v-else
            v-model="form.productCode"
            placeholder="请输入产品代码"
            maxlength="3"
            class="w-200"
            :disabled="info.productCode"
          />
        </el-form-item>
        <el-form-item
          label="系列名称："
          prop="seriesCode"
          :rules="[{ required: true, message: '请选择系列名称', trigger: ['blur', 'change'] }]"
        >
          <div v-if="isDetail" class="w-200">{{ form.seriesName }}</div>
          <el-select
            v-model="form.seriesCode"
            clearable
            filterable
            placeholder="请选择"
            class="w-200"
            v-else
          >
            <el-option
              v-for="item in dictMap.mac_series"
              :key="item.value"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="d-flex">
        <el-form-item
          label="贴片工厂："
          prop="factoryCodeList"
          :rules="[{ required: true, message: '请选择贴片工厂', trigger: ['blur', 'change'] }]"
          class="mr-20 factory-item"
        >
          <div v-if="isDetail" class="w-200">{{ form.factoryNameList?.join('、') }}</div>
          <el-select
            v-model="form.factoryCodeList"
            :options="factoryList"
            :props="{label: 'factoryName', value: 'factoryCode'}"
            clearable
            filterable
            multiple
            placeholder="请选择"
            class="w-200"
            collapse-tags
            @change="handleFactoryChange"
            v-else
          />
        </el-form-item>
        <el-form-item label="关联项目：" prop="pdtNewProductCodeList">
          <div v-if="isDetail" class="w-200">
            {{ form.pdtNewProductNameList?.join('、') }}
          </div>
          <el-select
            v-model="form.pdtNewProductCodeList"
            :options="pdtProList"
            :props="{label: 'productName', value: 'productCode'}"
            clearable
            filterable
            multiple
            placeholder="请选择"
            class="w-200"
            collapse-tags
            v-else
          />
        </el-form-item>
      </div>
      <el-form-item label="衍生/迭代：" prop="deriveCode">
        <div v-if="isDetail" class="w-200">{{ form.deriveName }}</div>
        <el-select
          v-model="form.deriveCode"
          clearable
          filterable
          placeholder="请选择"
          class="w-200"
          v-else
        >
          <el-option
            v-for="item in dictMap.mac_derive"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="table-title">关联供应链产品</div>
    <KeenList>
      <!-- <template #search>
      <el-space>
        <el-input v-model="searchKeyWord" placeholder="输入产品名称/供应链SKU" clearable style="width: 250px;">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template> -->
      <template #buttons v-if="!isDetail">
        <el-button type="primary" size="small" @click="bindGoodsVisible = true">添加</el-button>
        <el-button type="danger" size="small" @click="batchDel">删除</el-button>
      </template>
      <el-table ref="tableRef" :data="productSkuList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column label="供应链产品" min-width="300">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.productImage"
              :title="row.productTitle || row.productName"
              :subtitle="row.productSku"
              copy-title
              copy-subtitle
              :url="`/supplyGoods/detail?code=${row.productSku}`"
            />
          </template>
        </el-table-column>
        <el-table-column label="供应商" prop="supplierName" min-width="250" />
        <el-table-column label="SPU" prop="productSpu" min-width="180" />
        <el-table-column label="操作" fixed="right" min-width="80" v-if="!isDetail">
          <template #default="{ row, $index }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '删除',
                  key: 'del',
                  type: 'danger',
                  row: row,
                  index: $index,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </KeenList>
    <template #footer v-if="!isDetail">
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
  <SupplyGoodsSelect
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productSkuList"
    :supplierCodeList="supplierCodeList"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { platformApi, productApi, pdtApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import SupplyGoodsSelect from './supplyGoodsSelect.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      info: any;
      type: string;
    }>(),
    {
      visible: false,
      type: 'add',
    }
  );
  const formRef = ref();
  const form: any = ref({
    deriveCode: '',
    seriesCode: '',
    productCode: '',
    factoryCodeList: [],
    pdtNewProductCodeList: [],
    productSkuList: [],
  });

  form.value = { ...props.info };
  form.value.factoryCodeList = form.value.factoryCodeList?.length ? form.value.factoryCodeList : [];
  form.value.pdtNewProductCodeList = form.value.pdtNewProductCodeList?.length
    ? form.value.pdtNewProductCodeList
    : [];
  form.value.productSkuList = form.value.productSkuList?.length ? form.value.productSkuList : [];

  const title = computed(() => {
    if (props.type === 'edit') {
      return '编辑产品代码';
    }
    if (props.type === 'add') {
      return '新增产品代码';
    }
    if (props.type === 'detail') {
      return '详情产品代码';
    }
  });

  const isDetail = computed(() => props.type === 'detail');

  const dictMap = ref({});
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['mac_series', 'mac_derive'],
    });
    dictMap.value = res.dictMap || {};
  };
  queryDictMap();

  const factoryList = ref([]);
  const queryMacFactory = async () => {
    const res: any = await productApi.luteosProductMacQueryList({
      pageNum: 1,
      pageSize: 500,
    });
    factoryList.value = res.macFactoryList || [];
  };
  queryMacFactory();

  const supplierCodeList = ref([]);
  const handleFactoryChange = (val) => {
    supplierCodeList.value = [];
    if (!val || !val.length) {
      supplierCodeList.value = [];
    } else {
      factoryList.value.forEach((item: any) => {
        if (val.includes(item.factoryCode)) {
          supplierCodeList.value.push(item.supplierCode);
        }
      });
    }
  };

  const pdtProList = ref([]);
  const queryPdtProList = async () => {
    const res: any = await pdtApi.luteosPdtQueryPdtProductTableList({
      unProductStatusList: [2],
      pageNum: 1,
      pageSize: 500,
    });
    pdtProList.value = res.recordList || [];
  };
  queryPdtProList();

  const queryProductCodeDetail = () => {
    if (form.value.productCode) {
      productApi
        .luteosProductMacQueryProductCodeDetail({
          productCode: form.value.productCode,
        })
        .then((res: any) => {
          form.value = { ...form.value, ...res };
          productSkuList.value = res.supplySkuList || [] || [];
          handleFactoryChange(form.value.factoryCodeList);
        });
    }
  };

  queryProductCodeDetail();

  // 选择产品
  const bindGoodsVisible = ref(false);
  const productSkuList = ref([]);
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      const skuList = productSkuList.value.map((item: any) => item.productSku) || [];
      val.forEach((item: any) => {
        if (!skuList.includes(item.productSku)) {
          productSkuList.value.push(item);
        }
      });
    }
    bindGoodsVisible.value = false;
  };
  const handleActions = async (item) => {
    const { key, index, row } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;

      if (form.value.productCode) {
        // 校验是否可删除
        await productApi.luteosProductMacCheckRelSupplySku({
          productCode: form.value.productCode,
          productSkuList: [row.productSku],
        });
        productSkuList.value.splice(index, 1);
      } else {
        productSkuList.value.splice(index, 1);
      }
    }
  };
  //   const searchKeyWord = ref('');
  //   const listData = computed(() => {
  //     return productSkuList.value.find((item: any) => item.productTitle.includes(searchKeyWord.value) || item.productSku.includes(searchKeyWord.value)) || [];
  //   });

  // 勾选产品
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const batchDel = async () => {
    if (totalList.value.length === 0) {
      ElMessage.warning('请选择要删除的供应链产品');
      return;
    }

    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;

    if (form.value.productCode) {
      // 校验是否可删除
      await productApi.luteosProductMacCheckRelSupplySku({
        productCode: form.value.productCode,
        productSkuList: productSkuList.value.map((item: any) => item.productSku) || [],
      });

      totalList.value.forEach((item: any) => {
        const index = productSkuList.value.findIndex(
          (product: any) => product.productSku === item.productSku
        );
        productSkuList.value.splice(index, 1);
      });
    } else {
      totalList.value.forEach((item: any) => {
        const index = productSkuList.value.findIndex(
          (product: any) => product.productSku === item.productSku
        );
        productSkuList.value.splice(index, 1);
      });
    }
  };

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value
      ?.validate((isValid) => {
        if (isValid) {
          form.value.productSkuList =
            productSkuList.value.map((item: any) => item.productSku) || [];
          saveLoading.value = true;
          productApi
            .luteosProductMacSaveProductCode({
              id: form.value.id || undefined,
              deriveCode: form.value.deriveCode,
              seriesCode: form.value.seriesCode,
              productCode: form.value.productCode,
              factoryCodeList: form.value.factoryCodeList,
              pdtNewProductCodeList: form.value.pdtNewProductCodeList,
              productSkuList: form.value.productSkuList,
            })
            .then(() => {
              ElMessage.success('保存成功');
              formRef.value.resetFields();
              emit('closeModal', 'reload');
            })
            .finally(() => {
              saveLoading.value = false;
            });
        }
      })
      .catch(() => false);
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped>
  .w-200 {
    width: 200px !important;
    line-height: 25px !important;
  }

  .factory-item {
    :deep(.el-form-item__content) {
      align-items: flex-start;
    }

    .w-200 {
      margin-top: 10px /*  */;
    }
  }

  .mr-20 {
    margin-right: 20px;
  }

  .table-title {
    border-top: 1px solid #ebeef5;
    padding-top: 15px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
