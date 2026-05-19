<template>
  <el-form
    ref="formRef"
    :rules="rules"
    require-asterisk-position="right"
    :model="form"
    label-position="left"
    label-width="120px"
    scroll-to-error
  >
    <KeenFlex v-loading="materialLoading || dictLoading || sceneLoading">
      <MaterialInfo />
      <MaterialList v-if="['app_guide', 'app_banner'].includes(form.scene)" />
      <div class="d-flex flex-row justify-content-end">
        <el-button @click="handleCancel" text>取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </div>
    </KeenFlex>
  </el-form>

  <!-- <div v-html="JSON.stringify(form, null, '  ')"></div> -->
</template>

<script lang="ts" setup name="appmaterialdetail">
  import { useRequest } from 'vue-request';
  import { omit } from 'lodash-es';
  import type { FormInstance, FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { commonApi, CommonContracts, platformApi } from '@/api/index';
  import { MaterialStatus, MaterialType, MaterialDict } from '@/types/api';

  import { LuteMaterialModelBean } from '@/api/common/data-contracts';
  import MaterialInfo from './components/materialInfo.vue';
  import MaterialList from './components/materialList.vue';

  const router = useRouter();
  const route = useRoute();
  const code = route.query.code as string;

  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    scene: [
      {
        required: true,
        message: '请选择类型',
      },
    ],
    /* model: [
{
required: true,
message: '请选择板块',
},
], */
    title: [
      {
        required: true,
        message: '请填写标题',
      },
      {
        max: 255,
        message: '标题长度不能超过255',
      },
    ],
    type: [
      {
        required: true,
        message: '请选择素材类型',
      },
    ],
    url: [
      {
        validator(_, value, callback) {
          if (!value) {
            if (form.type === MaterialType.图片) {
              return callback('请上传素材图片');
            }
            if (form.type === MaterialType.视频) {
              return callback('请输入视频地址');
            }
          }
          return true;
        },
      },
      {
        max: 255,
        message: '地址长度不能超过255',
      },
    ],
    linkUrl: [
      {
        validator(_, value, callback) {
          if (value && form.linkType === 1 && !value?.startsWith(window.location.origin)) {
            return callback(`页内跳转链接需以当前系统${window.location.origin}开头`);
          }
          return true;
        },
      },
      /* {
        max: 255,
        message: '跳转链接长度不能超过255',
      }, */
    ],
    sort: [
      {
        type: 'integer',
        min: 0,
        message: '排序不能小于0',
      },
    ],
    startTime: [
      {
        required: true,
        message: '请选择开始时间',
      },
    ],
    endTime: [
      {
        required: true,
        message: '请选择结束时间',
      },
    ],
    desc: [
      {
        max: 500,
        message: '内容长度不能超过500',
      },
    ],
    status: [
      {
        required: true,
        message: '请设置状态',
      },
    ],
  });
  const form = reactive<
    CommonContracts.LuteMaterialSaveReq & {
      languageList: MaterialDict[];
      sceneList: MaterialDict[];
      modelList: LuteMaterialModelBean[];
    }
  >({
    scene: undefined,
    title: '',
    type: MaterialType.图片,
    linkType: 2,
    linkUrl: '',
    desc: '',
    url: '',
    sort: undefined,
    startTime: undefined,
    endTime: undefined,
    status: MaterialStatus.关闭,
    language: 'en',
    languageList: [],
    sceneList: [],
    modelList: [],
    authTag: 1,
    tagCodeList: [],
  });
  provide('form', form);

  const {
    loading: dictLoading,
    data: dictData,
    refresh: refreshDict,
  } = useRequest(platformApi.platformDict, {
    defaultParams: [
      {
        dictCodes: ['material_language', 'material_scene'],
      },
    ],
  });

  const {
    loading: sceneLoading,
    data: sceneData,
    refresh: refreshScene,
  } = useRequest(commonApi.luteosCommonMaterialQueryMaterialSceneList);
  provide('refreshScene', refreshScene);

  const getModelList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialModelList({
      scene: form.scene,
    });
    form.modelList = res?.modelList || [];
  };
  provide('refreshModel', getModelList);

  watchEffect(() => {
    const dictInfo = dictData.value;
    const sceneInfo = sceneData.value;

    if (dictInfo) {
      Object.assign(form, {
        languageList:
          dictInfo.dictMap?.material_language
            ?.map((item) => ({
              key: item.value,
              value: item.desc,
            }))
            ?.filter((item) => item.key !== 'en') ?? [],
      });
    }
    if (sceneInfo) {
      Object.assign(form, {
        sceneList:
          sceneInfo?.sceneList?.map((item) => ({
            key: item.scene,
            value: item.desc,
          })) ?? [],
      });
    }
  });

  const {
    loading: materialLoading,
    data: materialData,
    refresh: refreshMaterial,
  } = useRequest(commonApi.luteosCommonMaterialQueryMaterialDetail, {
    defaultParams: [
      {
        materialCode: code,
      },
    ],
    manual: !code,
  });

  watchEffect(() => {
    const material = materialData.value;
    if (material?.materialCode) {
      Object.assign(form, material);
    }
    getModelList();
    const materialList = material?.materialList ?? [];

    Object.assign(form, {
      materialList: [
        ...materialList,
        // 不在内置列表中
        ...(form.languageList
          ?.filter(
            (lang) =>
              !materialList.length || !materialList.some((item) => item.language === lang.key)
          )
          ?.map((lang) => ({
            desc: '',
            linkUrl: '',
            title: '',
            url: '',
            language: lang.key,
          })) ?? []),
      ],
    });
  });

  // 返回
  const goBack = () => {
    router.push('/appmateriallist');
  };

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;

    try {
      saveLoading.value = true;

      const { materialCode } = await commonApi.luteosCommonMaterialSaveMaterial({
        ...omit(form, ['sceneList', 'languageList']),
        materialList: form.materialList?.filter(
          (item) => item.desc || item.linkUrl || item.title || item.url
        ),
      });
      swal.success('保存成功');

      if (!form.materialCode) {
        router.replace(`/appmateriallist/detail?code=${materialCode}`);
      } else {
        resetForm();
      }
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    resetForm();
  };

  const resetForm = () => {
    formRef.value?.resetFields();

    if (form.materialCode) {
      refreshMaterial();
      refreshDict();
    } else {
      window.close();
    }
  };
</script>
