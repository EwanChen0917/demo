<template>
  <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
    <div
      class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework h-100 bg_f9f9f9"
    >
      <div class="form d-flex flex-column flex-lg-row w-md-100">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div class="tab-content">
            <div class="tab-pane fade show active">
              <div class="d-flex flex-column gap-7 gap-lg-10">
                <div class="card card-flush py-4">
                  <div class="card-header" style="align-items: center">
                    <div class="card-title">
                      <h2>属性信息：{{ form?.attrCode || '' }} {{ form?.attrName || '' }}</h2>
                    </div>
                  </div>
                  <div class="card-body pt-0">
                    <el-form
                      ref="formRef"
                      :model="form"
                      :rules="rules"
                      label-width="100"
                      label-position="right"
                    >
                      <el-form-item label="属性名称：" prop="attrName" required>
                        <el-input v-model="form.attrName" placeholder="请输入属性名称" />
                      </el-form-item>
                      <el-form-item label="描述：" prop="attrRemark">
                        <el-input
                          v-model="form.attrRemark"
                          type="textarea"
                          maxlength="50"
                          placeholder="请输入描述(50字以内)"
                        />
                      </el-form-item>
                      <el-form-item label="属性值：" required>
                        <el-form-item prop="editAttrVal">
                          <el-space>
                            <el-input v-model="form.editAttrVal" placeholder="请输入属性值" />
                            <el-button
                              @click="handleAddAttrVal"
                              :loading="attrValSaveLoading"
                              :disabled="!form.editAttrVal"
                              type="primary"
                            >
                              <template #icon>
                                <i class="ki-duotone ki-abstract-10">
                                  <i class="path1"></i>
                                  <i class="path2"></i>
                                </i>
                              </template>
                              添加
                            </el-button>
                          </el-space>
                        </el-form-item>
                        <el-table
                          :data="attrValueDataBeanListWithEditState"
                          row-key="attrValueName"
                          :row-class-name="({ row }) => (row.isEdit ? 'has-form-item' : '')"
                        >
                          <el-table-column prop="attrValueCode" label="属性值ID" min-width="150" />
                          <el-table-column min-width="100">
                            <template #header>
                              <label class="required">属性值</label>
                            </template>
                            <template #default="scope">
                              <span v-if="!scope.row.isEdit">
                                {{ scope.row.attrValueName }}
                              </span>
                              <el-form-item
                                v-else-if="form.editAttrValItem"
                                prop="editAttrValItem.attrValueName"
                                :rules="rules.editAttrValueName"
                              >
                                <el-input
                                  v-model="form.editAttrValItem.attrValueName"
                                  placeholder="请输入"
                                />
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column label="排序">
                            <template #default="scope">
                              <span v-if="!scope.row.isEdit">
                                {{ scope.row.sort }}
                              </span>
                              <el-input-number
                                v-else-if="form.editAttrValItem"
                                v-model="form.editAttrValItem.sort"
                                :min="1"
                                :precision="0"
                                :controls="false"
                                placeholder="请输入整数值"
                                class="w-100px"
                              />
                            </template>
                          </el-table-column>
                          <el-table-column label="备注" min-width="100">
                            <template #default="scope">
                              <span v-if="!scope.row.isEdit">
                                {{ scope.row.attrValueRemark }}
                              </span>
                              <el-input
                                v-else-if="form.editAttrValItem"
                                v-model="form.editAttrValItem.attrValueRemark"
                                placeholder="请输入"
                              />
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" min-width="120">
                            <template #default="scope">
                              <KeenActions
                                display-style="buttons"
                                :actions="
                      scope.row.isEdit
                        ? [
                            {
                              label: '保存',
                              key: 'save',
                              type: 'primary',
                              ...scope.row,
                            },
                            {
                              label: '取消',
                              key: 'cancel',
                              ...scope.row,
                            },
                          ]
                        : [
                            {
                              label: '编辑',
                              type: 'primary',
                              key: 'edit',
                              text: true,
                              disabled: form.editAttrValItem,
                              ...scope.row,
                            },
                            {
                              label: '删除',
                              key: 'del',
                              type: 'danger',
                              text: true,
                              disabled: scope.row.connectFlag || attrValueDataBeanListWithEditState?.length! <= 1,
                              ...scope.row,
                            },
                          ]
                    "
                                @click="handleAttrValActions"
                              />
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-form-item label="关联分类：">
                        <el-button type="primary" size="small" @click="handleAddCategory">
                          添加关联分类
                        </el-button>
                        <el-table :data="form.categoryConnectBeanList" row-key="categoryCode">
                          <el-table-column prop="categoryCode" label="分类ID" min-width="150" />
                          <el-table-column prop="categoryName" label="分类名称" min-width="100" />
                          <el-table-column label="分类等级">
                            <template #default="scope">
                              {{ LEVEL_NAMES[scope.row.level! - 1] }}
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="parentCategoryNames"
                            label="上级分类"
                            min-width="200"
                          />
                          <el-table-column label="操作">
                            <template #default="scope">
                              <KeenActions
                                :actions="[
                                  {
                                    label: '取消关联',
                                    key: 'del',
                                    type: 'danger',
                                    plain: true,
                                    disabled: scope.row.connectFlag,
                                    index: scope.$index,
                                  },
                                ]"
                                @click="handleCategoryActions"
                              />
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <LuteButton text="取消" type="secondary" @click="handleCancel" />
            <LuteButton
              text="保存"
              type="primary"
              wait-text="保存中"
              :loading="propSaveLoading"
              @click="handleSaveSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <CategoryModal
    v-if="categoryModalVisible"
    :attr-code="form.attrCode!"
    :visible="categoryModalVisible"
    @close="handleCategoryModalClose"
    :selected-rows="form.categoryConnectBeanList"
  />
</template>

<script lang="ts" setup name="propdetail">
  import { useRequest } from 'vue-request';
  import type { FormInstance, FormRules, FormItemInstance } from 'element-plus';
  import LuteButton from '@/packages/button';
  import { productApi, ProductApi, ProductContracts } from '@/api/index';
  import * as swal from '@/utils/swal';

  import { ElMessage } from 'element-plus';
  import CategoryModal from './Modal/connectCategory.vue';

  const LEVEL_NAMES = ['一级', '二级', '三级', '四级', '五级'];

  const route = useRoute();
  const { code } = route.query as {
    code?: string;
  };
  const searchInfo = sessionStorage.getItem('propSearchInfo') ?? '{}';

  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductApi.LuteosProductAttrQueryAttrDetail.ResponseBody & {
      editAttrVal: string;
      editAttrValItem?: ProductContracts.AttrValueDataBean;
    }
  >({
    attrCode: code,
    attrName: '',
    attrRemark: '',
    editAttrVal: '',
    attrValueDataBeanList: [],
    categoryConnectBeanList: [],
    editAttrValItem: undefined,
  });
  const rules = reactive<FormRules>({
    attrName: [
      {
        required: true,
        message: '请填写属性名称',
      },
    ],
    editAttrVal: [
      {
        validator: (_, val: string, callback) => {
          if (form.attrValueDataBeanList?.some((item) => val === item.attrValueName)) {
            return callback(`属性值 ${val} 已存在`);
          }
          return true;
        },
      },
    ],
    editAttrValItem: [
      {
        validator: (_, val: ProductContracts.AttrValueDataBean, callback) => {
          if (!form.attrValueDataBeanList?.length) {
            return callback('请至少填写一个属性值');
          }
          if (val?.attrCode) {
            return callback('请保存属性值');
          }
          return true;
        },
        trigger: [],
      },
    ],
    editAttrValueName: [
      {
        required: true,
        message: '请填写属性值名称',
      },
    ],
  });
  const attrValueDataBeanListWithEditState = computed(() =>
    form.attrValueDataBeanList
      ?.map((item) => ({
        ...item,
        isEdit: form.editAttrValItem?.attrValueCode === item.attrValueCode,
      }))
      ?.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
  );

  // 属性详细数据
  const {
    loading: attrLoading,
    data: attrData,
    refresh: refreshAttrData,
  } = useRequest(productApi.luteosProductAttrQueryAttrDetail, {
    defaultParams: [
      {
        attrCode: code!,
      },
    ],
  });
  watchEffect(() => {
    const attr = attrData.value;
    if (attr?.attrCode) {
      form.attrCode = attr.attrCode;
      form.attrName = attr.attrName;
      form.attrRemark = attr.attrRemark;
      form.attrValueDataBeanList = attr.attrValueDataBeanList;
      form.categoryConnectBeanList = attr.categoryConnectBeanList;
    }
  });

  // 属性值操作
  const handleAddAttrVal = async () => {
    const valid = await formRef.value!.validateField(['editAttrVal']);
    if (!valid) return;

    form.attrValueDataBeanList?.push({
      attrValueCode: '',
      attrCode: form.attrCode,
      attrValueName: form.editAttrVal,
      attrValueRemark: '',
      sort: 99,
      connectFlag: false,
    });
    form.editAttrVal = '';
  };
  const handleAttrValActions = async (item) => {
    const { key } = item;
    if (key === 'edit') {
      const { attrCode, attrValueCode, attrValueName, attrValueRemark, sort } = item;
      form.editAttrValItem = {
        attrCode,
        attrValueCode,
        attrValueName,
        attrValueRemark,
        sort,
      };
      return;
    }
    if (key === 'cancel') {
      // const isConfirmed = await swal.cancelConfirm();
      // if (!isConfirmed) return;

      form.editAttrValItem = undefined;
      return;
    }
    if (key === 'save') {
      const valid = await formRef.value!.validateField(['editAttrValItem.attrValueName']);
      if (!valid) return;
      const attrValIndex =
        form.attrValueDataBeanList?.findIndex(
          (attr) => attr.attrValueCode === form.editAttrValItem.attrValueCode
        ) ?? -1;
      if (attrValIndex >= 0) {
        form.attrValueDataBeanList?.splice(attrValIndex, 1, {
          ...form.editAttrValItem,
        });
        form.editAttrValItem = undefined;
      }
    }
    if (key === 'del') {
      const { attrValueCode } = item;
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      form.attrValueDataBeanList =
        form.attrValueDataBeanList?.filter((attr) => attr.attrValueCode !== attrValueCode) ?? [];
    }
  };

  // 分类操作
  const categoryModalVisible = ref(false);
  const handleAddCategory = () => {
    categoryModalVisible.value = true;
  };
  const handleCategoryModalClose = (reload: false, val) => {
    if (reload) {
      form.categoryConnectBeanList = val;
      categoryModalVisible.value = false;
    } else {
      categoryModalVisible.value = false;
    }
  };
  const handleCategoryActions = async (item) => {
    const { key, index } = item;

    if (key === 'del') {
      const isConfirmed = await swal.confirm({
        text: '请确认是否取消关联该分类？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmed) return;
      form.categoryConnectBeanList.splice(index, 1);
    }
  };

  // 提交操作
  const propSaveLoading = ref(false);
  const handleSaveSubmit = async () => {
    if (form.editAttrValItem) {
      ElMessage.warning('请先保存编辑内容再提交');
      return;
    }
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        propSaveLoading.value = true;
        const { attrName, attrRemark, attrCode, attrValueDataBeanList } = form;

        const params = {
          attrCode,
          attrName,
          attrRemark,
          attrValueList: attrValueDataBeanList,
        };

        const categoryCodeList = [];
        if (form.categoryConnectBeanList && form.categoryConnectBeanList.length > 0) {
          form.categoryConnectBeanList.forEach((item) => {
            categoryCodeList.push(item.categoryCode);
          });
          params.categoryCodeList = categoryCodeList;
        }
        await productApi.luteosProductAttrSaveOrUpdateAttr(params);

        swal.success('保存成功');
      } catch (e) {
        // do nothing
      } finally {
        propSaveLoading.value = false;
      }
    }
  };

  const router = useRouter();
  const goBack = () => {
    router.push({
      name: 'proplist',
      params: {
        ...JSON.parse(searchInfo),
      },
    });
  };

  // 取消操作
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/proplist');
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('propSearchInfo')) sessionStorage.removeItem('propSearchInfo');
  });
</script>
