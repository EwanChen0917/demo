<template>
  <el-dialog title="新增分类" :model-value="visible" @close="$emit('close')">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
    >
      <el-form-item ref="parentCategoryRef" prop="parentCategoryCode" label="上级分类" required>
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
      </el-form-item>
      <el-form-item label="分类名称" prop="categoryName" required>
        <el-input v-model="form.categoryName" />
      </el-form-item>
      <el-form-item label="英文名称" prop="categoryNameEn">
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
      </el-form-item>
      <el-form-item label="描述" prop="categoryDesc">
        <el-input
          v-model="form.categoryDesc"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
      <div class="attr-wrapper">
        <el-collapse @change="handleCollapseChange">
          <el-collapse-item title="添加关联属性" name="attr">
            <el-form-item label="选择属性" prop="attrBeanListCodes">
              <el-select
                class="flex-row-fluid"
                v-model="form.attrBeanListCodes"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="搜索属性"
                :remote-method="handleAttrRemoteQuery"
                :loading="attrListLoading"
                remote-show-suffix
              >
                <el-option
                  v-for="item in attrListData?.attrDataBeanList"
                  :key="item.attrCode"
                  :label="item.attrName"
                  :value="item.attrCode!"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.attrBeanListCodes?.length"
              label="选择属性值"
              prop="attrBeanList"
            >
              <el-descriptions class="flex-row-fluid" :column="1" border>
                <el-descriptions-item
                  v-for="attr in form.attrBeanList"
                  :key="attr.attrCode"
                  :label="attr.attrName"
                >
                  <el-checkbox-group v-model="attr.attrCodeValList">
                    <el-checkbox
                      v-for="item in attr.attrValList"
                      :key="item.attrValueCode"
                      :label="item.attrValueCode"
                    >
                      {{ item.attrValueName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-descriptions-item>
              </el-descriptions>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">
          提交申请
        </el-button>
      </span>
      <br />
      <!-- {{ JSON.stringify(form) }} -->
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules, FormItemInstance } from 'element-plus';

  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import * as swal from '@/utils/swal';

  // 常量
  const MAX_LEVEL = 5;
  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];
  const NEW_OPTION_VALUE = '$$new$$';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'windowClose'): void;
  }>();

  const router = useRouter();

  // 表单定义
  const formRef = ref<FormInstance>();
  const parentCategoryRef = ref<FormItemInstance>();
  const form = reactive<
    ProductApi.LuteosProductCategorySaveOrUpdateCategory.RequestBody & {
      levelParentCategoryCodes: string[];
      attrBeanListCodes: string[];
      attrBeanList: (ProductContracts.AttrBean & {
        attrName: string;
        attrValList: ProductContracts.AttrValBean[];
      })[];
    }
  >({
    // categoryCode: '',
    categoryName: '',
    categoryNameEn: '',
    categoryDesc: '',
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
        message: '请选择分类',
        trigger: [],
      },
    ],
    categoryName: [
      {
        required: true,
        message: '请输入分类名称',
      },
    ],
    categoryNameEn: [
      {
        required: true,
        message: '请输入英文名称',
      },
    ],
    productType: [
      {
        required: true,
        message: '请选择产品类型',
      },
    ],
  });
  watchEffect(() => {
    const level = form.level!;
    form.parentCategoryCode =
      level > 1 ? form.levelParentCategoryCodes[form.level! - 2] : form.levelParentCategoryCodes[0];
  });
  watch(
    () => form.attrBeanListCodes,
    (codes) => {
      if (codes) {
        const currentList = [...form.attrBeanList];
        form.attrBeanList = codes.reduce((newList, code) => {
          const attr = attrListData.value?.attrDataBeanList?.find((item) => item.attrCode === code);
          if (attr) {
            const currentAttr = currentList.find((item) => item.attrCode === code);
            newList.push({
              attrCode: attr.attrCode!,
              attrName: attr.attrName!,
              attrValList: attr.attrValList ?? [],
              attrCodeValList: currentAttr?.attrCodeValList ?? [], // attrCodeValList: attr.attrValueNames?.split(',') ?? [],
            });
          }
          return newList;
        }, [] as typeof currentList);
      }
    }
  );

  // 分类数据
  const {
    loading: categoryListLoading,
    data: categoryListData,
    run: runCategoryList,
  } = useRequest(productApi.luteosProductCategoryQueryCategoryList, {
    manual: true,
  });
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        runCategoryList({ pageNum: 1, pageSize: 1000 });
      }
    }
  );

  // 标签数据
  const {
    loading: attrListLoading,
    data: attrListData,
    run: runAttrList,
  } = useRequest(productApi.luteosProductAttrQueryAttrList, {
    manual: true,
  });
  const handleAttrRemoteQuery = (query = '') => {
    runAttrList({
      pageNum: 1,
      pageSize: 20,
      attrName: query,
    });
  };
  const handleCollapseChange = (val: string[]) => {
    if (val?.length > 0 && !attrListData.value?.attrDataBeanList?.length) {
      runAttrList({
        pageNum: 1,
        pageSize: 20,
      });
    }
  };

  // 分类数据格式化
  const categoryOptionsList = computed(() => {
    const categoryList = categoryListData.value?.categoryBeanList ?? [];
    const { levelParentCategoryCodes } = form;

    return Array(Math.min(form.level!, MAX_LEVEL))
      .fill(null)
      .reduce((list, _, idx) => {
        if (idx <= 0) return [categoryList];

        let subList = [];
        const parentLevelCode = levelParentCategoryCodes[idx - 1];
        if (parentLevelCode && parentLevelCode !== NEW_OPTION_VALUE && idx < MAX_LEVEL - 1) {
          subList =
            list[idx - 1]?.find(
              (item) => item.categoryCode === parentLevelCode && item.categoryBeanList?.length
            )?.categoryBeanList ?? [];
        }

        return [...list, subList];
      }, []) as ProductContracts.CategoryBean[][];
  });

  // 选择框
  const handleParentCategoryChange = (idx: number, value: string) => {
    if (value && value !== NEW_OPTION_VALUE) {
      form.level = idx + 2;
    } else {
      form.level = idx + 1;
    }

    const codes = form.levelParentCategoryCodes;
    codes.forEach((_, codeIdx) => {
      if (codeIdx > idx) {
        form.levelParentCategoryCodes[codeIdx] = NEW_OPTION_VALUE;
      }
    });
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
        saveLoading.value = true;
        const {
          categoryName,
          categoryNameEn,
          categoryDesc,
          level,
          parentCategoryCode,
          attrBeanList,
          productType,
        } = form;

        const res = await productApi.luteosProductCategorySaveOrUpdateCategory({
          categoryName,
          categoryNameEn,
          categoryDesc,
          productType,
          level,
          parentCategoryCode: parentCategoryCode === NEW_OPTION_VALUE ? '' : parentCategoryCode,
          attrBeanList: attrBeanList.map(({ attrCode, attrCodeValList }, idx) => ({
            attrCode,
            attrCodeValList,
            sort: idx + 1,
          })),
        });

        const isConfirmed = await swal.confirm({
          text:
            level === 5
              ? '创建分类申请提交成功，审批通过后将自动创建该产品'
              : '分类创建成功，是否去查看详情?',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (isConfirmed) {
          router.push(`/categorylist/detail?code=${res?.categoryCode}`);
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
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    emit('close');
    resetForm();
  };

  // 重置
  const resetForm = () => {
    formRef.value!.resetFields();
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
  }
</style>
