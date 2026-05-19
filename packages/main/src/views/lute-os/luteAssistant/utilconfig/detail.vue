<template>
  <el-form
    ref="formRef"
    :rules="rules"
    require-asterisk-position="right"
    :model="form"
    label-position="left"
    label-width="120px"
    scroll-to-error
    v-loading="materialLoading || dictLoading || sceneLoading"
  >
    <KeenFlex>
      <MaterialInfo />
      <div class="d-flex flex-row justify-content-end">
        <el-button @click="handleCancel" text>取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="saveLoading">保存</el-button>
      </div>
    </KeenFlex>
  </el-form>
</template>

<script lang="ts" setup name="LuteAssistantUtilConfigDetail">
  import { useRequest } from 'vue-request';
  import { omit } from 'lodash-es';
  import type { FormInstance, FormRules } from 'element-plus';

  import * as swal from '@/utils/swal';
  import { commonApi, CommonContracts, platformApi } from '@/api/index';
  import { MaterialStatus, MaterialType, MaterialDict } from '@/types/api';

  import { LuteMaterialModelBean } from '@/api/common/data-contracts';
  import dayjs from 'dayjs';
  import MaterialInfo from './components/materialInfo.vue';

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
        message: '请选择工具类型',
      },
    ],
    url: [
      {
        validator(_, value, callback) {
          if (!value) {
            if (form.type === MaterialType.图片) {
              return callback('请上传工具图片');
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
    scene: 'lute_agent_tools',
    title: '',
    type: MaterialType.图片,
    linkType: 2,
    linkUrl: '',
    desc: '',
    url: '',
    sort: undefined,
    startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs('2099-1-1').format('YYYY-MM-DD HH:mm:ss'),
    status: MaterialStatus.开启,
    language: 'en',
    languageList: [],
    sceneList: [],
    modelList: [],
    authTag: 1,
    tagCodeList: [],
    tag: [''],
    extraInfo: {
      homeRecommend: 0,
      provider: '',
    },
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
      Object.assign(form, material, {
        tag: material.tag?.length ? material.tag : [''],
        extraInfo: material.extraInfo
          ? JSON.parse(material.extraInfo)
          : {
              homeRecommend: 0,
              provider: '',
            },
      });
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
    router.push({ name: 'LuteAssistantUtilConfig' });
  };

  // 提交
  const saveLoading = ref(false);
  const handleSubmit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value.validate();
    if (!valid) return;

    try {
      saveLoading.value = true;

      const { materialCode } = await commonApi.luteosCommonMaterialSaveMaterial({
        ...omit(form, ['sceneList', 'languageList']),
        materialList: form.materialList?.filter(
          (item) => item.desc || item.linkUrl || item.title || item.url
        ),
        extraInfo: JSON.stringify(form.extraInfo),
      });
      swal.success('保存成功');
      goBack();
    } catch (e) {
      // do nothing
    } finally {
      saveLoading.value = false;
    }
  };
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    goBack();
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
