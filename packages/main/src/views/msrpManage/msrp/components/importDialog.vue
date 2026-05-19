<template>
  <el-dialog title="导入" :model-value="visible" @close="$emit('close')" align-center>
    <div style="margin-bottom: 10px">请按照模板上传文件</div>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.importScene"
      >
        <KeenFileUpload ref="upload" v-model="item.fileList" directory="product">
          <el-radio :label="index" class="w-350px" @click.stop>
            {{ item.desc }}{{ item.tips }}
          </el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button type="text" @click="getTemplate(item.importScene)">下载模板</el-button>
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { commonApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
    type: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  const sceneIndex = ref<number>(0);

  const sceneList = ref([
    {
      desc: 'SPU维度',
      importScene: 'product_spu_msrp_import',
      tips: '（即SPU关联的SKU的MSRP统一）',
      fileList: [],
    },
    {
      desc: 'SKU维度',
      importScene: 'product_msrp_import',
      fileList: [],
    },
  ]);

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
      if (res.tip) {
        ElMessage.warning(res.tip);
      } else {
        ElMessage.info(
          `成功${res.succeededCount}条，失败${res.failedCount}条${
            res.failedCount > 0 ? '，请到上传日志查看' : ''
          }`
        );
      }
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async (scene) => {
    const res = await commonApi.luteosCommonFileQueryImportTemplate({
      importScene: scene,
    });
    urlDownload(res.templateUrl as string);
  };
</script>

<style scoped lang="scss"></style>
