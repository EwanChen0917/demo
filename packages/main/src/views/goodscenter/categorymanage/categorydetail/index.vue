<template>
  <el-form
    ref="formRef"
    label-position="top"
    require-asterisk-position="right"
    class="d-flex flex-column flex-lg-row"
  >
    <div class="w-100 flex-lg-row-auto w-lg-400px mb-7 me-7 me-lg-10">
      <!--begin::details View-->
      <div class="card mb-5 mb-xl-10" v-loading="categoryLoading">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">分类信息</h3>
          </div>
          <!--end::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar gap-5">
            <template v-if="isEditState">
              <el-button size="small" @click="handleUpdateCancel">取消</el-button>
              <el-button
                :loading="saveLoading"
                v-if="categoryData?.status !== 3"
                type="primary"
                size="small"
                @click="handleUpdateSubmit"
                :disabled="form.categoryName === editForm.categoryName"
              >
                提交申请
              </el-button>
              <el-button
                v-else
                :loading="saveLoading"
                type="primary"
                size="small"
                @click="handleUpdateSubmit(true)"
                :disabled="form.categoryName === editForm.categoryName"
              >
                保存
              </el-button>
            </template>
            <el-button
              v-else-if="categoryData?.status !== 3"
              type="primary"
              size="small"
              @click="handleUpdateEdit"
            >
              变更申请
            </el-button>
            <el-button
              v-else
              :loading="saveLoading"
              type="primary"
              size="small"
              @click="handleUpdateEdit"
            >
              编辑
            </el-button>
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--begin::Card header-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">分类状态</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ categoryData?.statusDesc }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <div v-if="categoryData?.level! > 1" class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">上级分类</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ categoryData?.allParCategory }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">分类层级</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ LEVEL_NAMES[categoryData?.level! - 1] }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">分类名称</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 d-flex flex-column">
              <template v-if="isEditState">
                <el-input v-model="editForm.categoryName" />
                <span class="text-danger">{{ categoryNameError }}</span>
              </template>
              <span v-else class="fw-bold fs-6 text-gray-800 me-2">
                {{ form.categoryName }}
              </span>
              <!-- <span class="badge badge-success">Verified</span> -->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">
              英文名称
              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="编辑后自动保存"
              ></i>
            </label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8">
              <span v-if="isEditState" class="fw-bold fs-6 text-gray-800 me-2">
                {{ form.categoryNameEn }}
              </span>
              <el-input
                v-else
                v-model="form.categoryNameEn"
                @input="(value) => patchCategoryInfo('categoryNameEn', value)"
              >
                <template #suffix>
                  <InputPatchStates :state="patchStates['categoryNameEn']" />
                </template>
              </el-input>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">产品类型</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ categoryData?.productTypeDesc }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">分类ID</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-gray-800">{{ categoryData?.categoryCode }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">
              描述
              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="编辑后自动保存"
              ></i>
            </label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8">
              <span class="fw-bold fs-6 text-gray-800">
                <span v-if="isEditState" class="fw-bold fs-6 text-gray-800 me-2">
                  {{ form.categoryDesc }}
                </span>
                <div v-else class="position-relative">
                  <el-input
                    v-model="form.categoryDesc"
                    type="textarea"
                    @input="(value) => patchCategoryInfo('categoryDesc', value)"
                  />
                  <InputPatchStates class="float-t-r" :state="patchStates['categoryDesc']" />
                </div>
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::details View-->
    </div>

    <div class="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
      <!--begin::details View-->
      <div class="card" v-loading="categoryLoading">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">关联属性</h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <el-form-item label="添加关联属性">
            <div class="d-flex align-items-center flex-row-fluid gap-5">
              <el-select
                v-model="form.attrBeanListCodes"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="搜索属性"
                :remote-method="handleAttrRemoteQuery"
                :loading="attrListLoading"
                remote-show-suffix
                class="flex-row-fluid"
                @keydown.native.delete.capture="handleDelete"
              >
                <el-option
                  v-for="item in attrListData?.attrDataBeanList"
                  :key="item.attrCode"
                  :label="item.attrName"
                  :value="item.attrCode!"
                  :disabled="
                    form.attrBeanList.some(
                      (attrBean) => attrBean.attrCode === item.attrCode && !!attrBean.connectFlag
                    )
                  "
                />
              </el-select>
              <el-button type="primary" @click="handleAddAttr">添加关联属性</el-button>
            </div>
          </el-form-item>
          <el-form-item label="已关联属性" prop="attrBeanList">
            <el-table :data="form.attrBeanList" row-key="attrCode">
              <el-table-column prop="attrCode" label="属性ID" min-width="150" />
              <el-table-column prop="attrName" label="属性名称" min-width="100" />
              <el-table-column label="属性值" min-width="200">
                <template #default="scope">
                  <el-checkbox-group v-model="form.attrBeanList[scope.$index].attrCodeValList">
                    <el-checkbox
                      v-for="item in scope.row.attrValList"
                      :key="item.attrValueCode"
                      :label="item.attrValueCode"
                      :disabled="item.connectFlag"
                    >
                      {{ item.attrValueName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column label="排序">
                <template #default="scope">
                  <el-input-number
                    v-model="form.attrBeanList[scope.$index].sort"
                    :min="1"
                    :precision="0"
                    :controls="false"
                    placeholder="请输入整数值"
                    size="small"
                    class="w-100px"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="82">
                <template #default="scope">
                  <KeenActions
                    :actions="[
                      {
                        label: '全选',
                        key: 'all',
                        row: scope.row,
                        index: scope.$index,
                        type: 'primary',
                        plain: true,
                      },
                      {
                        label: '取消全选',
                        key: 'notAll',
                        row: scope.row,
                        index: scope.$index,
                        type: 'primary',
                        plain: true,
                      },
                      {
                        label: '取消关联',
                        key: 'del',
                        attrCode: scope.row.attrCode,
                        type: 'danger',
                        plain: true,
                        disabled: scope.row.connectFlag,
                      },
                    ]"
                    @click="handleActions"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <div class="d-flex" v-if="form.attrBeanListCategoryLevels?.length > 0">
            <el-row class="w-100">
              <el-col :span="6">
                <span>继承属性：</span>
              </el-col>
              <el-col :span="18">
                <div class="text-muted fs-7 mb-3">(如需编辑或删除请在该分类中修改)</div>
                <div v-for="(attrBeanList, idx) in form.attrBeanListCategoryLevels" :key="idx">
                  <div v-if="attrBeanList" class="mb-7 fv-row">
                    <!--begin::Label-->
                    <div class="d-flex justify-content-between">
                      <span class="me-7 me-lg-10">{{ allParCategory.value[idx] }}</span>
                      <span class="badge badge-secondary">{{ LEVEL_NAMES[idx] }}</span>
                    </div>
                    <!--end::Label-->
                    <el-descriptions :column="1">
                      <el-descriptions-item
                        v-for="attr in attrBeanList"
                        :key="attr.attrCode"
                        :label="attr.attrName"
                        :width="50"
                      >
                        <div class="d-flex gap-3 flex-wrap">
                          <span v-for="item in attr.attrValueBeanList" :key="item.attrValueCode">
                            {{ item.attrValueName }}
                          </span>
                        </div>
                      </el-descriptions-item>
                    </el-descriptions>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!--                        <div style="margin-right: 10rem">继承属性：</div>
                                    <div>
                                      <div class="text-muted fs-7 mb-3">(如需编辑或删除请在该分类中修改)</div>
                                      <div v-for="(attrBeanList, idx) in form.attrBeanListCategoryLevels" :key="idx">
                                        <div v-if="attrBeanList" class="mb-7 fv-row">
                                          &lt;!&ndash;begin::Label&ndash;&gt;
                                          <div class="d-flex justify-content-between">
                                            <span class="me-7 me-lg-10">{{ allParCategory.value[idx] }}</span>
                                            <span class="badge badge-secondary">{{ LEVEL_NAMES[idx] }}</span>
                                          </div>
                                          &lt;!&ndash;end::Label&ndash;&gt;
                                          <el-descriptions :column="1">
                                            <el-descriptions-item
                                              v-for="attr in attrBeanList"
                                              :key="attr.attrCode"
                                              :label="attr.attrName"
                                              :width="50"
                                            >
                                              <el-space>
                                                <span
                                                  v-for="item in attr.attrValueBeanList"
                                                  :key="item.attrValueCode"
                                                  :label="item.attrValueCode"
                                                >
                                                  {{ item.attrValueName }}
                                                </span>
                                              </el-space>
                                            </el-descriptions-item>
                                          </el-descriptions>
                                        </div>
                                      </div>
                                    </div>-->
          </div>
        </div>
        <!--end::Card body-->
        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-center py-6 px-9">
          <el-space>
            <el-button @click="handleAttrCancel">取消</el-button>
            <el-button type="primary" @click="handleAttrSubmit" :loading="attrSaveLoading">
              保存
            </el-button>
          </el-space>
        </div>
        <!--end::Actions-->
      </div>
      <!--end::details View-->
    </div>
  </el-form>
</template>

<script lang="ts" setup name="categoryDetail">
  import { debounce, maxBy } from 'lodash-es';
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules } from 'element-plus';

  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import * as swal from '@/utils/swal';

  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];

  const route = useRoute();
  const searchInfo = sessionStorage.getItem('categorySearchInfo') ?? '{}';

  const isEditState = ref(false);
  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductApi.LuteosProductCategorySaveOrUpdateCategory.RequestBody & {
      attrBeanListCodes: string[];
      attrBeanList: (ProductContracts.AttrBean & {
        connectFlag: boolean;
        attrName: string;
        attrValList: ProductContracts.AttrValueBean[];
      })[];

      attrBeanListCategoryLevels: ProductContracts.CategoryAttrBean[][];
    }
  >({
    categoryCode: '',
    categoryName: '',
    categoryNameEn: '',
    categoryDesc: '',
    level: 1,
    parentCategoryCode: '',
    attrBeanList: [],
    attrBeanListCodes: [],
    attrBeanListCategoryLevels: [],
  });

  const editForm = reactive<Pick<typeof form, 'categoryName'>>({
    categoryName: '',
  });
  let oldListCodes = reactive<string[]>([]);
  const allParCategory = reactive<string[]>([]);

  // 分类详细数据
  const { loading: categoryLoading, data: categoryData, run: fetchDetail } = useRequest(
    productApi.luteosProductCategoryQueryCategoryDetail,
    {
      manual: true,
    }
  );

  const init = (categoryCode: string) => {
    fetchDetail({ categoryCode });
  };

  onMounted(() => {
    const { code } = route.query as {
      code?: string;
    };
    if (code) {
      console.log(code, 'code===')
      init(code);
    }
  });

  defineExpose({
    init,
  });
  watchEffect(() => {
    const category = categoryData.value;
    if (category?.categoryCode) {
      form.categoryCode = category.categoryCode;
      form.categoryName = category.categoryName!;
      form.categoryNameEn = category.categoryNameEn ?? '';
      form.categoryDesc = category.categoryDesc ?? '';
      form.level = category.level!;
      form.parentCategoryCode = category.parentCategoryCode ?? '';
      allParCategory.value = category.allParCategory ? category.allParCategory.split('>') : [];
      // const levelGroups = groupBy(category.categoryAttrLevelList ?? [], 'level');
      const levelLists =
        category.categoryAttrLevelList?.reduce((list, { level = 1, categoryAttrList }) => {
          const newList = [...list];
          newList[Number(level) - 1] = categoryAttrList ?? [];
          return newList;
        }, [] as ProductContracts.CategoryAttrBean[][]) ?? [];
      const currentLevel = levelLists[form.level - 1] ?? [];
      oldListCodes = currentLevel.map((item) => item.attrCode!);
      form.attrBeanListCodes = currentLevel.map((item) => item.attrCode!);
      form.attrBeanList = currentLevel
        .map((attr) => ({
          sort: attr.sort,
          attrCode: attr.attrCode!,
          attrName: attr.attrName!,
          connectFlag: !!attr.connectFlag,
          attrValList: attr.attrValueBeanList ?? [],
          // attrValList:
          //   attr.attrValueBeanList?.map(({ attrValueCode, attrValueName }) => ({
          //     attrValueCode,
          //     attrValueName,
          //   })) ?? [],
          attrCodeValList:
            attr.attrValueBeanList
              ?.filter((item) => item.selectFlag)
              ?.map((item) => item.attrValueCode!) ?? [],
        }))
        .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
      form.attrBeanListCategoryLevels = levelLists
        .filter((_, idx) => idx !== form.level - 1)
        .map((list) =>
          list
            ? list.map((item) => ({
                ...item,
                attrValueBeanList:
                  item?.attrValueBeanList?.filter((attrVal) => attrVal.selectFlag) ?? [],
              }))
            : null
        );
      console.log(form.attrBeanListCategoryLevels);
    }
  });

  // 标签数据
  const {
    loading: attrListLoading,
    data: attrListData,
    run: runAttrList,
  } = useRequest(productApi.luteosProductAttrQueryAttrList);
  const handleAttrRemoteQuery = (query = '') => {
    runAttrList({
      pageNum: 1,
      pageSize: 20,
      attrName: query,
    });
  };

  // 添加属性
  const handleAddAttr = () => {
    const oldList = [...form.attrBeanList];
    const newList = [] as typeof oldList;
    const attrDataBeanList = attrListData.value?.attrDataBeanList ?? [];
    let maxSort = maxBy(form.attrBeanList, (item) => item.sort)?.sort ?? 0;

    form.attrBeanListCodes.forEach((attrCode) => {
      let attrBean = oldList.find((item) => item.attrCode === attrCode);
      if (!attrBean) {
        const attrDataBean = attrDataBeanList.find((item) => item.attrCode === attrCode)!;

        attrBean = {
          sort: maxSort + 1,
          connectFlag: false,
          attrCode: attrDataBean.attrCode!,
          attrName: attrDataBean.attrName!,
          attrValList: attrDataBean.attrValList ?? [],
          attrCodeValList: [],
        };
        maxSort += 1;
      }

      newList.push(attrBean);
    });
    form.attrBeanList = newList.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  };

  // 删除属性
  const handleActions = (item, index) => {
    const { key, attrCode } = item;
    if (key === 'del') {
      form.attrBeanListCodes = form.attrBeanListCodes.filter(
        (attrBeanCode) => attrBeanCode !== attrCode
      );
      form.attrBeanList = form.attrBeanList.filter((attr) => attr.attrCode !== attrCode);
    } else if (key === 'all') {
      form.attrBeanList[item.index].attrCodeValList =
        form.attrBeanList[item.index].attrValList?.map((attr) => attr.attrValueCode!) ?? [];
      // console.log(item, item.row);
    } else if (key === 'notAll') {
      // 取消全选
      form.attrBeanList[item.index].attrCodeValList =
        form.attrBeanList[item.index].attrValList
          ?.filter((attr) => attr.connectFlag)
          .map((attr) => attr.attrValueCode) ?? [];
      // console.log(item, item.row);
    }
  };

  // 基础信息变更
  const saveLoading = ref(false);
  const categoryNameError = ref('');
  const handleUpdateEdit = () => {
    isEditState.value = true;
    editForm.categoryName = form.categoryName;
  };
  const patchStates = reactive<Record<string, number>>({});
  const patchCategoryInfo = debounce(async (field: string, value: string) => {
    const { categoryCode, categoryName, categoryNameEn, level, parentCategoryCode } = form;

    try {
      patchStates[field] = 1;
      await productApi.luteosProductCategorySaveOrUpdateCategory({
        categoryCode,
        categoryName,
        categoryNameEn,
        level,
        parentCategoryCode,
        [field]: value,
      });
      patchStates[field] = 2;
    } catch (e) {
      // do nothing
      patchStates[field] = 10;
    }
  }, 600);
  const handleUpdateSubmit = async (isSave) => {
    // 校验
    if (!editForm.categoryName) {
      categoryNameError.value = '请输入分类名称';
      return;
    }
    if (form.categoryName === editForm.categoryName) {
      categoryNameError.value = '请填写变更内容';
      return;
    }
    categoryNameError.value = '';

    try {
      saveLoading.value = true;
      const { categoryCode, level, parentCategoryCode, categoryNameEn } = form;
      const { categoryName } = editForm;

      await productApi.luteosProductCategorySaveOrUpdateCategory({
        categoryCode,
        categoryName,
        categoryNameEn,
        level,
        parentCategoryCode,
      });

      if (isSave) {
        swal.success('保存分类已提交');
      } else {
        swal.success('变更申请已提交');
      }

      // 更新
      form.categoryName = categoryName;
      isEditState.value = false;
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleUpdateCancel = async () => {
    if (form.categoryName !== editForm.categoryName) {
      const isConfirmed = await swal.cancelConfirm();
      if (!isConfirmed) return;
    }

    isEditState.value = false;
    categoryNameError.value = '';
  };

  // 属性信息变更
  const attrSaveLoading = ref(false);
  const handleAttrSubmit = async () => {
    try {
      attrSaveLoading.value = true;
      const { categoryCode, attrBeanList } = form;

      await productApi.luteosProductCategoryConnectAttr({
        categoryCode: categoryCode!,
        attrBeanList: attrBeanList.map(({ attrCode, attrCodeValList, sort }) => ({
          attrCode,
          attrCodeValList,
          sort,
        })),
      });

      swal.success('保存成功');
    } catch (e) {
      // do nothing
    } finally {
      attrSaveLoading.value = false;
    }
  };

  const handleAttrCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/categorylist');
  };

  const handleDelete = (e) => {
    if (form.attrBeanListCodes.length === oldListCodes.length) e.stopImmediatePropagation();
  };

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'categorylist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('categorySearchInfo'))
      sessionStorage.removeItem('categorySearchInfo');
  });
</script>

<style lang="scss" scoped>
  .float-t-r {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
