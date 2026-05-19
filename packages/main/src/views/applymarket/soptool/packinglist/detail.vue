<template>
  <div class="packing-detail-page" v-loading="initLoading">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
      label-position="left"
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
      <el-button @click="goList">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="packingdetail">
  import { ref, nextTick, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { SOPContracts, sopApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { uuid } from '@/utils/aesTils';
  import action from './components/action.vue';

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
    packageCode: '',
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

  const enumOptions = ref<SOPContracts.PackageEnumQueryResp>({
    channelTypeList: [],
    departmentList: [],
    departmentMemberList: [],
    productManagerList: [],
    productTypeList: [],
    quantityTypeList: [],
  });
  const templateList = ref<TemplateType[]>([]);

  const group = ref<number>();
  const initData = async () => {
    initLoading.value = true;
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
    const detailRes = await sopApi.luteosSopQueryPackageDetail({
      packageCode: route.query.packageCode as string,
    });
    const materialList: any = detailRes.materialList?.map((material: any) => {
      // material.switchFlag = 1;
      // material.singleAmount = 1;
      material.file = [];
      if (material.fileName && material.filePath) {
        material.file.push({
          percentage: 100,
          name: material.fileName,
          status: 'success',
          ossKey: material.filePath.split('?')[0].split('aliyuncs.com/')[1],
        });
      }
      if (material.propertyTypeList && material.propertyTypeList.length) {
        material.propertyTypeList.forEach((item: any, index: number) => {
          // 初始化多维度属性默认值
          if (item.selectType === 5 && item.children) {
            // 将children下的项目selectType Map化 如：{4:2}
            const childrenMap = {};
            item.children.forEach((c) => {
              childrenMap[c.propertyType] = c.selectType;
            });
            if (!item.childrenList) {
              item.childrenList = [];
            }
            // 数据都为数组，需要把类型为单个的还原为字符串或数组
            item.childrenList.forEach((child) => {
              Object.keys(child).forEach((key) => {
                if (childrenMap[key] === 1 || childrenMap[key] === 3) {
                  child[key] = child[key][0];
                }
              });
              child._id = uuid();
            });
          } else if (item.selectType === 2 || item.selectType === 4) {
            // 后端返回本身就是数组就不处理
            //
            // const defaultFlags = item.propertyList.filter((property) => {
            //   return property.defaultFlag === 1;
            // });
            // // TODO: 需要默认值
            // item.propertyCodeList = defaultFlags.map((f) => f.propertyCode) || [];
          } else if (item.selectType === 1 || item.selectType === 3) {
            // 属性为单选，还原基本数值取第零项
            if (item.propertyCodeList && item.propertyCodeList.length) {
              item.propertyCodeList = item.propertyCodeList[0];
            }
            if (material.materialCode === 'brand_tag' && index === 0) {
              group.value = item.propertyList.find(
                (p) => p.propertyCode === item.propertyCodeList
              ).groups[0];
            }
          }
        });
      }
      return material;
    });
    formData.value = {
      packageCode: detailRes.packageCode,
      name: detailRes.name,
      enactDept: detailRes.enactDept,
      enactMember: detailRes.enactMember,
      channelType: detailRes.channelType,
      model: detailRes.model,
      productMember: detailRes.productMember,
      productType: detailRes.productType,
      quantityType: detailRes.quantityType,
      templateCode: detailRes.templateCode,
      productName: detailRes.productName,
      categoryCode: detailRes.categoryCode,
      materialList,
    };
    initLoading.value = false;
  };
  onMounted(async () => {
    await initData();
  });
  const formRules = ref();
  const validateField = (path: string) => {
    formRef.value.validateField(path);
  };
  const save = () => {
    formRef.value
      ?.validate((isvalid) => {
        if (isvalid) {
          const params = {
            ...formData.value,
            materialList: formData.value.materialList.map((material) => {
              if (material.file && material.file.length) {
                material.fileName = material.file[0].name;
                material.filePath = material.file[0].ossKey;
                delete material.file;
              }
              if (material.propertyTypeList) {
                material.propertyTypeList.forEach((item) => {
                  if (item.selectType === 1 || item.selectType === 3) {
                    //  处理单选数据，若为选值就设置为空数组，否则塞入数组中
                    item.propertyCodeList = item.propertyCodeList ? [item.propertyCodeList] : [];
                  }
                  delete item.propertyList;
                  if (item.children && item.selectType === 5) {
                    item.childrenList = item.childrenList.map((i) => {
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
          sopApi.luteosSopSavePackageInfo(params).then((res) => {
            ElMessage.success('保存成功');
          });
        } else {
          nextTick(() => {
            const errDom = document.querySelector('.el-form-item.is-error');
            errDom?.scrollIntoView(false);
          });
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
