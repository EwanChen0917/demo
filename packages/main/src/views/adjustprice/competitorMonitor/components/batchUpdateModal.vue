<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <div>{{ isImport ? '请按照模板上传文件' : '请选择导出信息' }}</div>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.importScene"
        :style="sceneIndex !== index ? 'margin-bottom: 10px' : ''"
      >
        <KeenFileUpload
          ref="upload"
          v-model="item.fileList"
          directory="product"
          v-if="isImport && index === sceneIndex"
        >
          <el-radio :label="index" class="w-350px">{{ item.desc }}</el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button
          style="margin-bottom: 10px"
          type="text"
          @click="getTemplate(item.importScene)"
          v-if="isImport && index === sceneIndex"
        >
          下载模板
        </el-button>
        <el-radio v-else :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio>
      </div>
    </el-radio-group>
    <div class="requirement-title">使用说明</div>
    <div class="requirement-list">
      <div v-for="(item, index) in requirementList" :key="index" class="requirement-item">
        {{ item }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
          v-if="isImport"
        >
          确认
        </el-button>
        <el-button v-else type="primary" @click="emit('export', sceneList[sceneIndex]?.exportType)">
          导出
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi, productApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';

  // const props = defineProps<{
  //   visible: boolean;
  //   title: string;
  //   type: string;
  // }>();
  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title: string;
      type: string;
      requirementList?: any;
    }>(),
    {
      requirementList: [
        '点击导入监控，选择本地xlsx文件上传',
        '请按照模板内容填写，模板中表头信息无法更改和删除',
        '最多允许一次导入数据记录1000条',
        'URL相同且存在多条数据时，取最后1条数据记录',
        '系统已存在的监控，会更新盖原有的数据',
      ],
    }
  );
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'export', exportType: number);
  }>();

  const isImport = computed(() => {
    return props.type === 'import';
  });

  const sceneIndex = ref<number>(0);

  const sceneList = ref([]);

  if (isImport.value) {
    if (checkPermission('importSpuUpdate')) {
      sceneList.value.push({
        desc: '导入监控',
        importScene: 'ranking_list_monitor_import',
        fileList: [],
      });
    }
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    fileList.value = sceneList.value[sceneIndex.value].fileList;
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await commonApi
        .luteosCommonFileImportData({
          importScene: sceneList.value[sceneIndex.value].importScene,
          fileName: fileList.value[0].name,
          key: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount}条${
          res.failedCount > 0 ? '，请到上传日志查看' : ''
        }`
      );
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async (scene) => {
    // const res = await commonApi.luteosCommonFileQueryImportTemplate({
    const res = await productApi.luteosProductRankingListDownTemplate({});
    urlDownload(res as string);
  };
</script>

<style scoped lang="scss">
  .requirement-title {
    margin-top: 30px;
    margin-bottom: 6px;
    color: var(---N9, #1f1f1f);
    /* 常规/Medium 13 */
    font-size: 13px;
    font-weight: 500;
    line-height: 22px; /* 169.231% */
    &:before {
      content: '*';
      color: var(---C7, #f53f3f);
      /* 常规/Regular 13 */
      margin-right: 4px;
      font-size: 13px;
      line-height: 22px; /* 169.231% */
    }
  }

  .requirement-list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .requirement-item {
      color: var(---N8, #666);
      /* 较弱/Regular 12 */
      font-size: 12px;
      line-height: 20px; /* 166.667% */
      &:before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: var(---N8, #666);
        margin-left: 2px;
        margin-right: 6px;
        line-height: 20px; /* 166.667% */
      }
    }
  }
</style>
