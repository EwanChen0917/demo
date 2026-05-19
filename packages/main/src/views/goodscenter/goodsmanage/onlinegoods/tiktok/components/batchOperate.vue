<template>
  <el-dialog title="批量操作" :model-value="visible" @close="emit('close')" width="700px">
    <el-radio-group v-model="operateType" style="margin-bottom: 15px">
      <!-- <el-radio :label="1" style="width: 80%" v-if="platform !== 'shopify'">
        批量添加/更新运营人员
      </el-radio> -->
      <el-tooltip
        v-if="!asinList.length"
        class="item"
        effect="dark"
        content="请选择产品数据"
        placement="top"
      >
        <el-radio :disabled="!asinList.length" :label="2">批量添加标签</el-radio>
      </el-tooltip>
      <el-radio v-else :label="2">批量添加标签</el-radio>
    </el-radio-group>
    <!-- <DeptMember
      v-model="operator"
      deptId="65717209"
      v-show="operateType === 1"
      style="width: 300px; margin-left: -100px"
    /> -->
    <el-select
      class="mb-5"
      v-show="operateType === 2"
      style="width: 100%"
      v-model="tagList"
      placeholder="标签"
      clearable
      allow-create
      filterable
      :teleported="false"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="4"
      :options="tagOptionList"
      :props ="{
        label: 'tagDesc',
        value: 'tagDesc',
      }"
    />
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi, commonApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { urlDownload } from '@/utils/download';

  const props = defineProps<{
    visible: boolean;
    title: string;
    platform: string;
    asinList?: any;
  }>();

  const operateType = ref();
  const operator = ref('');
  const tagList = ref([]);
  const tagOptionList = ref([]);

  const getLabelOptions = async () => {
    const res = await productApi.luteosProductAmazonListingQueryTagV2({
      platform: props.platform,
      keywordList: props?.asinList,
    });
    tagOptionList.value = res?.tagList || [];
    tagList.value = res?.tagList?.filter((item) => !!item.hasChoose)?.map((item) => item.tagDesc);
  };
  getLabelOptions();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  const saveLoading = ref(false);
  const isSubmit = ref(false);
  const handleSave = async () => {
    if (operateType.value === 2) {
      await saveTag();
      isSubmit.value && (await saveOperator());
    } else {
      await saveOperator();
    }

    if (isSubmit.value) {
      ElMessage.success('操作成功');
      emit('save');
    }
  };
  const saveOperator = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      saveLoading.value = true;
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: 'shopify_product_operator_import',
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount}条${
          res.failedCount > 0 ? '，请到上传日志查看' : ''
        }`
      );
      isSubmit.value = true;
    }
  };
  const saveTag = async () => {
    if (!tagList.value?.length) {
      ElMessage.warning('请先选择或创建标签');
      isSubmit.value = false;
    } else {
      try {
        saveLoading.value = true;
        await productApi.luteosProductAmazonListingListingUpdateTagV2({
          channel: props.platform,
          actionType: 2,
          listingBeanList: props.asinList,
          tagList: tagList.value?.map((item) => {
            return {
              tagCode: tagOptionList.value?.find((tag) => tag.tagDesc === item)?.tagCode,
              tagDesc: item,
            };
          }),
        });
      } finally {
        saveLoading.value = false;
        isSubmit.value = true;
      }
    }
  };
  const fileList = ref<any[]>([]);
  const getTemplate = async () => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: 'shopify_product_operator_import',
    });
    urlDownload(res.templateUrl as string);
  };
</script>

<style scoped lang="scss"></style>
