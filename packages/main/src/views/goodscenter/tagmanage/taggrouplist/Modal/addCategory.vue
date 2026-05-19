<template>
  <el-dialog
    :title="modalTitle"
    :model-value="visible"
    @open="getMenuTree"
    @close="handleFormCancel"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
    >
      <el-form-item label="上级标签组" prop="parentCode">
        <el-tree-select
          :v-loading="loading"
          clearable
          node-key="categoryCode"
          style="width: 100%"
          v-model="form.parentCode"
          :data="treeData"
          check-strictly
          :render-after-expand="false"
          popper-class="picker-cat-tree-select"
          placeholder="默认不选为一级标签组"
          :disabled="isEdit"
          default-expand-all
        />
      </el-form-item>
      <el-form-item label="标签组编码" v-if="isEdit">
        <el-input v-model="props.rowData.categoryCode" maxlength="20" :disabled="isEdit" />
      </el-form-item>
      <!-- <el-form-item ref="parentCategoryRef" prop="parentCategoryCode" label="上级分类" required>
        <div class="row g-5 flex-row-fluid">
          <div class="col-md-6" v-for="(options, idx) in categoryOptionsList" :key="idx">
            <el-select
              style="width: 100%"
              v-model="form.levelParentCategoryCodes[idx]"
              :placeholder="`新增/选择${LEVEL_NAMES[idx]}分类`"
              @change="(value) => handleParentCategoryChange(idx, value)"
              :loading="categoryListLoading"
            >
              <el-option :label="`新增${LEVEL_NAMES[idx]}分类`" :value="NEW_OPTION_VALUE" />
              <el-option
                v-for="item in options"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item.categoryCode!"
              />
            </el-select>
          </div>
        </div>
      </el-form-item>
     <el-form-item label="分类等级" required>
        <div class="d-flex justify-content-between w-100">
          <div>{{ LEVEL_NAMES[form.level! - 1] }}</div>
          <div v-if="form.level === 5" class="d-flex align-items-center text-success">
            <i class="ki-duotone ki-information fs-1 me-1">
              <i class="path1"></i>
              <i class="path2"></i>
              <i class="path3"></i>
            </i>
            五级分类审核通过后，系统将自动创建产品，可在产品列表中查看
          </div>
        </div>
      </el-form-item> -->
      <el-form-item label="标签组名称" prop="categoryName" required>
        <el-input v-model="form.categoryName" maxlength="20" />
      </el-form-item>
      <!--  <el-form-item label="英文名称" prop="categoryNameEn">
        <el-input v-model="form.categoryNameEn" />
      </el-form-item>
    <el-form-item v-if="form.level === 5" label="产品类型" prop="productType">
        <el-select v-model="form.productType">
          <el-option label="产品" :value="1" />
          <el-option label="配件" :value="2" />
          <el-option label="用研产品" :value="3" />
          <el-option label="组合产品" :value="13" />
          <el-option label="虚拟产品" :value="14" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="描述" prop="categoryDescription">
        <el-input
          v-model="form.categoryDescription"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">确定</el-button>
      </span>
      <br />
      <!-- {{ JSON.stringify(form) }} -->
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request';
  import { FormInstance, FormRules, FormItemInstance, ElMessage } from 'element-plus';

  import { productApi, ProductApi, ProductContracts, platformApi } from '@/api/index';
  // import * as swal from '@/utils/swal';

  const treeData = ref([]);
  const loading = ref(false);
  const getMenuTree = async () => {
    // formRef.value?.clearValidate();
    if (props.isEdit) {
      modalTitle.value = '编辑标签组';
      form.categoryName = props.rowData?.categoryName;
      form.categoryDescription = props.rowData?.categoryDescription;
      if (props.rowData.parentCategoryCode) {
        form.parentCode = props.rowData.parentCategoryCode;
      } else {
        form.parentCode = '';
      }
    } else {
      modalTitle.value = '新增标签组';
      formRef.value?.resetFields();
      // form.parentCode = '';
      // form.categoryName = '';
      // form.categoryDescription = '';
    }

    loading.value = true;
    // const res = await platformApi.platformMenuQueryMenuTree({
    //   platform: 'lute_erp',
    //   filterStatus: 0,
    // });
    const res = await productApi.luteosProductTagCategoryQueryTree({
      // platform: props.platform,
      filterStatus: 0,
    });
    // const res = await queryMenuTree({
    //   platform: props.platform,
    // }).finally(() => {
    //   loading.value = false;
    // });
    if (res) {
      const data = res.treeList as [];
      deepTree(data);
      treeData.value = data;
    }
  };
  const deepTree = (data: Imenu[]) => {
    data.forEach((item: Imenu) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      // item.label = item.name;
      // item.value = item.menuCode;
      item.label = item.categoryName;
      item.value = item.categoryCode;
      if (item.level === 4) {
        item.disabled = true;
      }
    });
  };
  // 常量
  const MAX_LEVEL = 5;
  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];
  const NEW_OPTION_VALUE = '$$new$$';

  const props = defineProps<{
    visible: boolean;
    isEdit?: boolean;
    rowData?: any;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'windowClose'): void;
  }>();
  const modalTitle = ref('新增标签组');

  const router = useRouter();

  // 表单定义
  const formRef = ref<FormInstance>();
  const parentCategoryRef = ref<FormItemInstance>();
  const form = reactive<
    ProductApi.LuteosProductCategorySaveOrUpdateCategory.RequestBody & {
      parentCode: string;
      categoryDescription: string;
      levelParentCategoryCodes: string[];
      attrBeanListCodes: string[];
      attrBeanList: (ProductContracts.AttrBean & {
        attrName: string;
        attrValList: ProductContracts.AttrValBean[];
      })[];
    }
  >({
    parentCode: '',
    categoryCode: '',
    categoryName: '',
    categoryNameEn: '',
    categoryDescription: '',
    level: 1,
    parentCategoryCode: NEW_OPTION_VALUE,
    levelParentCategoryCodes: Array(MAX_LEVEL).fill(NEW_OPTION_VALUE),
    attrBeanList: [],
    attrBeanListCodes: [],
  });
  const rules = reactive<FormRules>({
    parentCategoryCode: [
      {
        required: true,
        message: '请选择标签组',
        trigger: [],
      },
    ],
    categoryName: [
      {
        required: true,
        message: '请输入标签组名称',
      },
    ],
    // categoryNameEn: [
    //   {
    //     required: true,
    //     message: '请输入英文名称',
    //   },
    // ],
    // productType: [
    //   {
    //     required: true,
    //     message: '请选择产品类型',
    //   },
    // ],
  });
  watchEffect(() => {
    const level = form.level!;
    form.parentCategoryCode =
      level > 1 ? form.levelParentCategoryCodes[form.level! - 2] : form.levelParentCategoryCodes[0];
  });

  // 分类数据
  // const {
  //   loading: categoryListLoading,
  //   data: categoryListData,
  //   run: runCategoryList,
  // } = useRequest(productApi.luteosProductCategoryQueryCategoryList, {
  //   manual: true,
  // });
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        // runCategoryList({ pageNum: 1, pageSize: 1000 });
        // console.log('props.rowData', props.rowData);
      } else {
        // modalTitle.value = '新增标签组';
        formRef.value?.resetFields();
        // form.parentCode = '';
        // form.categoryName = '';
        // form.categoryDescription = '';
      }
    }
  );

  // // 标签数据
  // const {
  //   loading: attrListLoading,
  //   data: attrListData,
  //   run: runAttrList,
  // } = useRequest(productApi.luteosProductAttrQueryAttrList, {
  //   manual: true,
  // });

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
        const {
          categoryName,
          // categoryNameEn,
          categoryDescription,
          level,
          parentCategoryCode,
          // attrBeanList,
          // productType,
        } = form;

        if (!props.isEdit) {
          const res = await productApi.luteosProductTagCategoryCreateCategory({
            categoryName,
            categoryDescription,
            // productType,
            // level,
            // parentCategoryCode: parentCategoryCode === NEW_OPTION_VALUE ? '' : parentCategoryCode,
            parentCategoryCode: form.parentCode,
            // attrBeanList: attrBeanList.map(({ attrCode, attrCodeValList }, idx) => ({
            //   attrCode,
            //   attrCodeValList,
            //   sort: idx + 1,
            // })),
          });
          // const isConfirmed = await swal.confirm({
          //   title:
          //     level === 5
          //       ? '创建分类申请提交成功，审批通过后将自动创建该产品'
          //       : '分类创建成功，是否去查看详情?',
          //   icon: 'success',
          //   confirmButtonText: '去查看',
          //   cancelButtonText: '知道了',
          //   customClass: {
          //     confirmButton: 'btn btn-success',
          //     cancelButton: 'btn btn-active-light',
          //   },
          // });
          // if (isConfirmed) {
          //   router.push(`/categorylist/detail?code=${res?.categoryCode}`);
          // }
          ElMessage.success('标签组创建成功');
          resetForm();
        } else {
          const res = await productApi.luteosProductTagCategoryUpdateCategory({
            ...form,
            targetCategoryCode: props.rowData?.categoryCode,
            categoryName,
            categoryDescription,
            parentCategoryCode: form.parentCode,
          });
          ElMessage.success('标签组编辑成功');
        }
        emit('close', true);
        resetForm();
      } catch (e) {
        // do nothing
      } finally {
        saveLoading.value = false;
      }
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    // const isConfirmed = await swal.cancelConfirm();
    // if (!isConfirmed) return;
    resetForm();
    setTimeout(() => {
      emit('close');
    }, 2);
  };

  // 重置
  const resetForm = () => {
    formRef.value?.resetFields();
    form.level = 1;
    form.levelParentCategoryCodes = Array(MAX_LEVEL).fill(NEW_OPTION_VALUE);
  };
</script>

<style lang="scss" scoped>
  .attr-wrapper {
    ::v-deep(.el-collapse) {
      border-top: none;
      border-bottom: none;

      .el-collapse-item__header,
      .el-collapse-item__wrap {
        border-bottom: none;
      }

      .el-collapse-item__header {
        font-size: 1.35rem;
        font-weight: 600;
        height: 70px;
      }
    }
    :deep(.el-descriptions) {
      .el-descriptions__label {
        word-break: keep-all;
        text-align: center;
      }
    }
  }
</style>
