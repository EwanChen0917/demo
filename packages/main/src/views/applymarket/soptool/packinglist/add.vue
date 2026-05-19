<template>
  <div class="packing-detail-page" v-loading="initLoading">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
      label-position="left"
      scroll-to-error
    >
      <action
        @validate-field="validateField"
        v-model="formData"
        :templateList="templateList"
        :enumOptions="enumOptions"
        :group="group"
      />
    </el-form>
    <div class="form-save">
      <el-button @click="goList" :disabled="saveLoading">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="packingadd">
  import { ref, nextTick, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { SOPContracts, sopApi } from '@/api/index';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import { uuid } from '@/utils/aesTils';
  import { useTabs } from '@/hooks/tabs';
  import action from './components/action.vue';

  const { closeTabAndRefresh } = useTabs();
  const initLoading = ref(false);
  const router = useRouter();
  const route = useRoute();
  const goList = () => {
    router.push({
      name: 'soptemplate',
    });
  };
  const formRef = ref();
  const formData: any = ref({
    name: '',
    enactDept: '',
    enactMember: '',
    channelType: '',
    model: '',
    productMember: '',
    productType: '',
    quantityType: '',
    templateCode: '',
    productName: '',
    categoryCode: '',
    materialList: [],
  });

  interface TemplateType {
    label: string;
    value: string | number;
  }

  const templateList = ref<TemplateType[]>([]);
  const enumOptions = ref<SOPContracts.PackageEnumQueryResp>({
    channelTypeList: [],
    departmentList: [],
    departmentMemberList: [],
    productManagerList: [],
    productTypeList: [],
    quantityTypeList: [],
  });

  const group = ref<number>();
  const initData = async () => {
    initLoading.value = true;
    // 获取流程模板下拉选项
    const templateListRes: any = await sopApi.luteosSopQueryTemplateList({
      pageNum: 1,
      pageSize: 100,
    });
    templateList.value = templateListRes.templateList?.map((item) => {
      return {
        label: item.templateName,
        value: item.templateCode,
      };
    });
    // 初始化基础信息枚举值
    enumOptions.value = await sopApi.luteosSopQueryPackageEnum();

    // 根据物料信息生成materialList
    const res = await sopApi.luteosSopQueryMaterialList();
    const materialList: any = res.materialList?.map((material: any) => {
      material.switchFlag = 1;
      material.singleAmount = 1;
      material.file = [];

      if (material.propertyTypeList && material.propertyTypeList.length) {
        material.propertyTypeList.forEach((item: any, index: number) => {
          // 初始化多维度属性默认值
          if (item.selectType === 5 && item.children) {
            const data: any = {
              _id: uuid(),
            };
            item.children.forEach((c) => {
              const defaultFlags = c.propertyList.filter((property) => {
                return property.defaultFlag === 1;
              });
              data[c.propertyType] =
                c.selectType === 2
                  ? defaultFlags.map((f) => f.propertyCode)
                  : c.propertyList[0].propertyCode;
            });
            if (item.childrenList === null) {
              item.childrenList = [data];
            }
          } else if (item.selectType === 2 || item.selectType === 4) {
            const defaultFlags = item.propertyList.filter((property) => {
              return property.defaultFlag === 1;
            });
            // TODO: 需要默认值

            item.propertyCodeList = defaultFlags.map((f) => f.propertyCode) || [];
          } else if (item.selectType === 1 || item.selectType === 3) {
            const defaultFlags = item.propertyList.filter((property) => {
              return property.defaultFlag === 1;
            });
            // 给定默认组
            if (index === 0 && item.propertyList[0].materialCode === 'brand_tag') {
              group.value = item.propertyList[0].groups[0];
            }
            if (defaultFlags.length > 0) {
              item.propertyCodeList = defaultFlags[0].propertyCode;
            } else {
              item.propertyCodeList = '';
            }
          }
        });
      }
      return material;
    });
    // 处理初始值后赋值
    formData.value = {
      name: '',
      enactDept: enumOptions.value.departmentList && enumOptions.value.departmentList[0].key,
      enactMember: '',
      channelType: enumOptions.value.channelTypeList && enumOptions.value.channelTypeList[0].key,
      model: '',
      productName: '',
      categoryCode: '',
      productMember: '',
      productType: enumOptions.value.productTypeList && enumOptions.value.productTypeList[0].key,
      quantityType: enumOptions.value.productTypeList && enumOptions.value.productTypeList[0].key,
      templateCode: templateList.value.length > 0 ? templateList.value[0].value : '',
      materialList,
    };
    initLoading.value = false;
  };
  onMounted(async () => {
    await initData();
  });
  const validateField = (path: string) => {
    formRef.value.validateField(path);
  };
  const formRules = ref();
  const saveLoading = ref(false);
  const save = () => {
    saveLoading.value = true;
    formRef.value
      ?.validate((isvalid) => {
        if (isvalid) {
          const formDataReq = cloneDeep(formData.value);
          const params = {
            ...formDataReq,
            materialList: formDataReq.materialList.map((material) => {
              if (material.file && material.file.length) {
                material.fileName = material.file[0].name;
                material.filePath = material.file[0].ossKey;
                delete material.file;
              }
              if (material.propertyTypeList) {
                material.propertyTypeList.forEach((item: any) => {
                  if (item.selectType === 1 || item.selectType === 3) {
                    //  处理单选数据，若为选值就设置为空数组，否则塞入数组中
                    item.propertyCodeList = item.propertyCodeList ? [item.propertyCodeList] : [];
                  }
                  delete item.propertyList;
                  if (item.children && item.selectType === 5) {
                    item.childrenList = item.childrenList.map((i) => {
                      // eslint-disable-next-line no-unused-expressions
                      delete i._id;
                      Object.keys(i).forEach((key) => {
                        if (typeof i[key] === 'string') {
                          i[key] = [i[key]];
                        }
                      });
                      return i;
                    });
                    delete item.children;
                  }
                });
              }
              return material;
            }),
          };
          sopApi
            .luteosSopSavePackageInfo(params)
            .then((res) => {
              ElMessage.success('保存成功');
              closeTabAndRefresh('packinglist');
              router.push({
                name: 'packinglist',
              });
            })
            .finally(() => {
              saveLoading.value = false;
            });
        } else {
          saveLoading.value = false;
          /* nextTick(() => {
      const errDom = document.querySelector('.el-form-item.is-error');
      errDom?.scrollIntoView(false);
    }); */
        }
      })
      .catch(() => false);
  };
</script>

<style scoped lang="scss">
  .form-save {
    text-align: right;
  }
</style>
