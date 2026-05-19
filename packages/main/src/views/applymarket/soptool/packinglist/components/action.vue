<template>
  <div class="packing-detail-page">
    <!-- 基本信息 -->
    <detailCard title="基础信息">
      <el-row :gutter="60">
        <el-col :span="12" :offset="0">
          <el-form-item
            label="SOP名称"
            prop="name"
            :rules="[{ required: true, message: '该项必填', trigger: 'blur' }]"
          >
            <el-input v-model="form.name" maxlength="100" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="商品名称"
            prop="productName"
            :rules="[{ required: true, message: '该项必填', trigger: 'blur' }]"
          >
            <el-input v-model="form.productName" maxlength="100" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="所属分类"
            prop="categoryCode"
            :rules="[{ required: true, message: '该项必填', trigger: ['blur', 'change'] }]"
          >
            <el-select v-model="form.categoryCode" placeholder="请选择一级分类">
              <el-option
                v-for="item in optionsMap"
                :key="item.categoryCode"
                :label="item.categoryName || ''"
                :value="item.categoryCode!"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="型号"
            prop="model"
            :rules="[{ required: true, message: '该项必填', trigger: 'blur' }]"
          >
            <el-input v-model="form.model" maxlength="100" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="产品类型"
            prop="productType"
            :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
          >
            <el-select v-model="form.productType" clearable filterable>
              <el-option
                v-for="item in enumOptions.productTypeList"
                :key="item.key"
                :label="item.value"
                :value="(item.key as number)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="产品数量"
            prop="quantityType"
            :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
          >
            <el-select v-model="form.quantityType" clearable filterable>
              <el-option
                v-for="item in enumOptions.quantityTypeList"
                :key="item.key"
                :label="item.value"
                :value="(item.key as number)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="制定部门" :rules="[{ required: true }]">
            <div style="display: flex; width: 100%">
              <el-form-item
                style="flex: 1"
                label=""
                prop="enactDept"
                :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.enactDept"
                  placeholder="部门"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in enumOptions.departmentList"
                    :key="item.key"
                    :label="item.value"
                    :value="(item.key as number)"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                style="flex: 2; margin-left: 8px"
                label=""
                prop="enactDept"
                :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.enactMember"
                  placeholder="成员"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in enumOptions.departmentMemberList"
                    :key="item.key"
                    :label="item.value"
                    :value="(item.key as string)"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="产品经理"
            prop="productMember"
            :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
          >
            <el-select v-model="form.productMember" clearable filterable>
              <el-option
                v-for="item in enumOptions.productManagerList"
                :key="item.key"
                :label="item.value"
                :value="(item.key as string)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="渠道"
            prop="channelType"
            :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
          >
            <el-select v-model="form.channelType" clearable filterable>
              <el-option
                v-for="item in enumOptions.channelTypeList"
                :key="item.key"
                :label="item.value"
                :value="(item.key as number)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" />
      </el-row>
    </detailCard>
    <!-- 动态表单项 -->
    <detailCard
      v-for="(item, index) in form.materialList"
      :key="item.materialCode"
      :title="item.materialName"
    >
      <template #operation>
        <el-switch v-model="item.switchFlag" :active-value="1" :inactive-value="0" />
      </template>
      <el-row :gutter="60" v-if="item.switchFlag">
        <el-col
          :span="24"
          v-for="(property, i) in item.propertyTypeList || []"
          :key="property.propertyCode"
        >
          <el-form-item
            :label="property.propertyTypeDesc"
            :rules="[{ required: property.required, message: '该项为必填项' }]"
            :prop="`materialList[${index}].propertyTypeList[${i}].[${
              +property.selectType === 5 ? 'childrenList' : 'propertyCodeList'
            }]`"
          >
            <!-- 下拉单选或者多选  -->
            <template v-if="+property.selectType === 1 || +property.selectType === 2">
              <div style="display: flex; width: 100%; align-items: center">
                <!--                {{ item.materialCode }}
                {{ curGroup }}-->
                <el-select
                  v-if="item.materialCode === 'brand_tag' && i === 0"
                  style="width: 100%; flex: 1"
                  :multiple="+property.selectType === 2"
                  v-model="property.propertyCodeList"
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="3"
                  @change="
                    (val) => {
                      setGroup(val, item, property);
                    }
                  "
                >
                  <el-option
                    v-for="spec in property.propertyList"
                    :key="spec.propertyCode"
                    :label="spec.propertyName"
                    :value="spec.propertyCode"
                  />
                </el-select>
                <el-select
                  v-else
                  style="width: 100%; flex: 1"
                  :multiple="+property.selectType === 2"
                  v-model="property.propertyCodeList"
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="3"
                >
                  <el-option
                    v-for="spec in item.materialCode === 'brand_tag' && i === 1
                      ? property.propertyList.filter((item1) => {
                          return item1.groups?.length === 0 || item1.groups.includes(curGroup);
                        })
                      : property.propertyList"
                    :key="spec.propertyCode"
                    :label="spec.propertyName"
                    :value="spec.propertyCode"
                  />
                </el-select>
                <!--                <p style="width: 100%; flex: 2; margin: 0">-->
                <div class="d-flex w-100" style="flex: 2">
                  <imagePreview
                    :image="getSelectImage(property.propertyCodeList, property.propertyList)"
                    @preview="
                      (images, index) => {
                        previewImage(images, index);
                      }
                    "
                  />
                </div>
              </div>
              <div v-if="getSelectFile(property.propertyCodeList, property.propertyList)">
                <template
                  v-if="
                    Array.isArray(getSelectFile(property.propertyCodeList, property.propertyList))
                  "
                >
                  <el-button
                    v-for="(file, index) in getSelectFile(
                      property.propertyCodeList,
                      property.propertyList
                    )"
                    :key="index"
                    class="ms-5"
                    type="text"
                    @click="previewFile(file)"
                  >
                    {{ file?.split('/')?.slice(-1)[0] || '' }}
                  </el-button>
                </template>
                <template
                  v-else-if="getSelectFile(property.propertyCodeList, property.propertyList)"
                >
                  <el-button
                    class="ms-5"
                    type="text"
                    @click="
                      previewFile(getSelectFile(property.propertyCodeList, property.propertyList))
                    "
                  >
                    查看附件
                  </el-button>
                </template>
              </div>
            </template>
            <!-- Radio 单选 -->
            <template v-if="+property.selectType === 3">
              <div style="display: flex; width: 100%; align-items: center">
                <el-radio-group v-model="property.propertyCodeList">
                  <el-radio
                    v-for="spec in property.propertyList"
                    :key="spec.propertyCode"
                    :label="spec.propertyCode"
                  >
                    {{ spec.propertyName }}
                  </el-radio>
                </el-radio-group>
                <p style="width: 100%; flex: 2; margin: 0">
                  <imagePreview
                    :image="getSelectImage(property.propertyCodeList, property.propertyList)"
                    @preview="
                      (images, index) => {
                        previewImage(images, index);
                      }
                    "
                  />
                </p>
              </div>
            </template>
            <!-- Checkbox 复选 -->
            <template v-if="+property.selectType === 4">
              <el-checkbox-group v-model="property.propertyCodeList">
                <p
                  style="display: flex"
                  v-for="spec in property.propertyList"
                  :key="spec.propertyCode"
                >
                  <el-checkbox style="min-width: 253px" :label="spec.propertyCode">
                    {{ spec.propertyName }}
                  </el-checkbox>
                  <el-image
                    :src="spec.image"
                    style="width: 44px; height: 44px"
                    fit="contain"
                    :lazy="true"
                    @click="previewImage([spec.image])"
                  />
                </p>
              </el-checkbox-group>
            </template>
            <!-- 属性是复杂的多维度表格 -->
            <template v-if="property.selectType === 5 && property.children">
              <el-table :data="property.childrenList" row-key="_id">
                <el-table-column
                  v-for="col in property.children"
                  :prop="col.propertyTypeDesc"
                  :key="col.propertyTypeDesc"
                  :label="col.propertyTypeDesc"
                >
                  <template #default="{ row, $index }">
                    <el-form-item
                      label=""
                      :prop="`materialList[${index}].propertyTypeList[${i}].childrenList[${$index}][${col.propertyType}]`"
                      :rules="[{ required: col.required }]"
                    >
                      <el-select
                        :multiple="+col.selectType === 2"
                        v-model="property.childrenList[$index][col.propertyType]"
                        clearable
                        filterable
                        collapse-tags
                        collapse-tags-tooltip
                        :max-collapse-tags="3"
                      >
                        <el-option
                          v-for="spec in ['package_bag', 'package_box'].includes(
                            item.materialCode
                          ) && col.propertyType === 5
                            ? col.propertyList.filter((item1) => {
                                return (
                                  item1.groups?.length === 0 || item1.groups.includes(curGroup)
                                );
                              })
                            : col.propertyList"
                          :key="spec.propertyCode"
                          :label="spec.propertyName"
                          :value="spec.propertyCode"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column key="image" width="80px">
                  <template #default="{ row, $index }">
                    <el-image
                      v-if="getImage(row, property, $index)"
                      style="width: 44px; height: 44px"
                      :src="getImage(row, property, $index)"
                      fit="fill"
                      :lazy="true"
                      @click="previewImage([getImage(row, property, $index)])"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80px" align="right">
                  <template #default="{ row, $index }">
                    <el-button
                      type="primary"
                      v-if="getFile(row, property, $index)"
                      link
                      @click="previewFile(getFile(row, property, $index))"
                    >
                      查看附件
                    </el-button>
                    <el-button
                      type="danger"
                      v-if="property.childrenList.length > 1"
                      link
                      @click="property.childrenList.splice($index, 1)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <p>
                <el-button type="primary" @click="addItem(property)">添加</el-button>
              </p>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="单包用量"
            :prop="`materialList[${index}].singleAmount`"
            :rules="[{ required: true, message: '该项必填', trigger: 'blur' }]"
          >
            <el-input-number
              placeholder="请输入"
              v-model="item.singleAmount"
              :min="1"
              :max="999"
              :step="1"
              :controls="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="item.uploadFlag">
          <el-form-item
            label="上传文件"
            :inline-message="true"
            :prop="`materialList[${index}].file`"
            :rules="[
              {
                required: true,
                message: '请上传文件',
                trigger: 'change',
                type: 'array',
              },
            ]"
          >
            <KeenFileUpload
              class="packing-upload"
              v-model="item.file"
              directory="sop/template"
              @success="validateField(`materialList[${index}].file`)"
            >
              <el-button type="primary" v-if="item.file.length === 0">选择文件</el-button>
            </KeenFileUpload>
            <!-- <SingleUpload /> -->
          </el-form-item>
        </el-col>
      </el-row>
    </detailCard>
    <!-- 流程模板 -->
    <detailCard title="流程模板">
      <el-form-item
        label=""
        prop="templateCode"
        :rules="[{ required: true, message: '该项必填', trigger: 'change' }]"
        class="form-item-nolable"
      >
        <el-select
          v-model="form.templateCode"
          clearable
          filterable
          style="max-width: 60%; margin-right: 12px"
        >
          <el-option
            v-for="item in templateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" link @click="viewTemplate">模板详情</el-button>
      </el-form-item>
    </detailCard>
  </div>
  <!-- 图片预览 -->
  <el-image-viewer
    @close="
      () => {
        showViewer = false;
      }
    "
    :initial-index="previewIndex"
    v-if="showViewer"
    :url-list="currentImageList"
  />
  <PdfPreview v-if="visible" :visible="visible" :url="fileUrl" @close="visible = false" />
</template>

<script setup lang="ts">
  import { uuid } from '@/utils/aesTils';
  import { productApi } from '@/api';
  import imagePreview from './imagePreview.vue';

  const router = useRouter();
  const previewIndex = ref(0);
  const showViewer = ref(false);
  const currentImageList = ref<string[]>([]);

  const previewImage = async (urls: string[], index = 0) => {
    currentImageList.value = urls;
    previewIndex.value = index;
    await nextTick();
    showViewer.value = true;
  };

  const fileUrl = ref<string>('');
  const visible = ref<boolean>(false);
  const previewFile = (url) => {
    fileUrl.value = url;
    visible.value = true;
  };

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true,
    },
    templateList: {
      type: Array,
      default() {
        return [];
      },
    },
    enumOptions: {
      type: Object,
      required: true,
    },
    group: {
      type: Number,
    },
  });
  const emits = defineEmits(['update:modelValue', 'validateField']);
  const form = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });
  const curGroup = ref<number>();
  watchEffect(() => {
    curGroup.value = !curGroup.value ? props.group : curGroup.value;
  });
  // const enumOptions = ref<SOPContracts.PackageEnumQueryResp>({
  //   channelTypeList: [],
  //   departmentList: [],
  //   departmentMemberList: [],
  //   productManagerList: [],
  //   productTypeList: [],
  //   quantityTypeList: [],
  // });
  // const initEnumOptions = async () => {
  //   const res = await sopApi.luteosSopQueryPackageEnum();
  //   enumOptions.value = res;
  // };
  // initEnumOptions();
  const setGroup = (val, item, property) => {
    if (!val) return;
    curGroup.value =
      property?.propertyList.find((material) => material.propertyCode === val)?.groups[0] || '';
    console.log('curGroup', curGroup.value);
  };

  const addItem = (property) => {
    const data: any = {
      _id: uuid(),
    };
    property.children.forEach((c) => {
      data[c.propertyType] = c.selectType === 2 ? [] : '';
    });
    property.childrenList.push(data);
  };
  const getImage = (row, property, $index) => {
    let item;
    if ($index > -1 && property.children !== null) {
      const { propertyType } = property.children[0];
      item = property.children[0].propertyList.find((i) => {
        return i.propertyCode === row[propertyType];
      });
    }
    return item ? item.image : '';
  };

  const getFile = (row, property, $index) => {
    let item;
    if ($index > -1 && property.children !== null) {
      const { propertyType } = property.children[0];
      item = property.children[0].propertyList.find((i) => {
        return i.propertyCode === row[propertyType];
      });
    }
    return item ? item.attachmentUrl : '';
  };

  const viewTemplate = () => {
    if (form.value.templateCode) {
      router.push(`/soptemplate/detail?templateCode=${form.value.templateCode}`);
    }
  };
  const getSelectImage = (selected: any, selectionList: any) => {
    if (selected === '' || (selected && selected.length === 0)) {
      return '';
    }
    const listMap = {};
    selectionList.forEach((item) => {
      listMap[item.propertyCode] = item.image;
    });
    if (Array.isArray(selected)) {
      const result = selected.map((item) => {
        return listMap[item];
      });
      return result;
    }
    return listMap[selected];
  };

  const getSelectFile = (selected: any, selectionList: any) => {
    if (selected === '' || (selected && selected.length === 0)) {
      return '';
    }
    const listMap = {};
    selectionList.forEach((item) => {
      listMap[item.propertyCode] = item.attachmentUrl;
    });
    if (Array.isArray(selected)) {
      const result = selected.map((item) => {
        return listMap[item];
      });
      return result;
    }
    return listMap[selected];
  };

  const uploadIsRequried = (material: any) => {
    if (material.materialCode === 'model_number_tag') {
      const materialUpload = material.propertyTypeList.find((item: any) => {
        return item.propertyType === 8;
      });
      return materialUpload.propertyCodeList === 'model_number_Y';
    }
    return false;
  };

  const optionsMap = ref<any[]>([]);
  const getOptions = async (categoryCode: string, level: number) => {
    const res = await productApi.luteosProductCategoryQueryCategoryLevelList({
      categoryCode,
    });
    optionsMap.value = res.categoryLevelBeanList;
  };
  getOptions('', 1);
  const validateField = (fieldPath: string) => {
    emits('validateField', fieldPath);
  };
</script>

<style scoped lang="scss">
  .packing-detail-page {
    .form-item-nolable {
      :deep(.el-form-item__content) {
        margin-left: 0 !important;
      }
    }

    :deep(.el-select) {
      width: 100%;
      // min-width: 400px;
    }

    :deep(.packing-upload) {
      .el-upload {
        display: flex;
      }

      .el-upload-list {
        margin: 0;
      }
    }
  }
</style>
