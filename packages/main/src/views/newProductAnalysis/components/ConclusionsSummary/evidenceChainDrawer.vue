<template>
  <div class="evidence-chain">
    <el-drawer
      v-model="visible"
      direction="rtl"
      resizable
      close-on-click-modal
      :modal="false"
      :modal-penetrable="true"
    >
      <template #header>
        <div class="header-title">
          证据链-{{ headerTitle }}
          <Tag v-if="tagMapText[localData.conclusion]" :color="tagMapColor[localData.conclusion]">
            {{ tagMapText[localData.conclusion] }}
          </Tag>
        </div>
      </template>
      <!-- 数据来源、推理过程、置信度建议 -->
      <div v-if="!showFileViewer" class="drawer-content">
        <div v-for="(value, key) in contentMap" :key="key">
          <span class="content-title">{{ key }}:</span>
          <div v-if="key == '数据来源'" class="data-source">
            <span v-if="!value.length || !value.some((item) => typeof item == 'object')">-</span>
            <template v-else>
              <div v-for="content in value" :key="content.nodeExecutionId" class="source-item">
                <span @click="handleFileClick(content)">{{ content.name }}</span>
              </div>
            </template>
          </div>
          <div v-if="key == '推理过程'" class="reasoning-process">
            <span v-if="!value.content">-</span>
            <span v-else-if="typeof value.content == 'string'">{{ value.content }}</span>
            <span v-else>
              <span v-for="(item, index) in value.content" :key="index">{{ item }}</span>
            </span>
          </div>
          <div v-if="key == '置信度建议'" class="level-conclusion">
            <Tag color="red" v-if="value.confidence_level">{{ value.confidence_level }}</Tag>
            <span class="core_conclusion" v-if="typeof value.core_conclusion == 'string'">
              {{ value.core_conclusion }}
            </span>
            <span class="core_conclusion" v-else>
              <span v-for="(item, index) in value.core_conclusion" :key="index">{{ item }}</span>
            </span>
          </div>
        </div>
      </div>
      <template #footer v-if="!showFileViewer">
        <div class="footer-button">
          <el-button
            type="danger"
            plain
            @click="handleClickBtn('abandon')"
            :loading="buttonLoading"
          >
            弃用结论
          </el-button>
          <el-button type="primary" @click="handleClickBtn('accept')" :loading="buttonLoading">
            采用结论
          </el-button>
        </div>
      </template>
      <div v-if="showFileViewer" class="show-file-viewer">
        <FileViewer
          :document-title="selectedFile?.name"
          :node-execution-id="selectedFile?.nodeExecutionId"
          :ext="selectedFile?.ext"
          :instanceCode="instanceCode"
          @back="handleFileBack"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { newProductApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import FileViewer from '../FileViewer.vue';
  import { cloneDeep } from 'lodash-es';

  interface FileItem {
    nodeExecutionId: number;
    name: string;
    ext: string;
    datetime: string;
    previewUrl: string;
  }

  // 采纳 弃用
  const tagMapColor = {
    accept: 'green',
    abandon: 'red',
  };

  const tagMapText = {
    accept: '已采纳',
    abandon: '已弃用',
  };

  const props = withDefaults(
    defineProps<{
      instanceCode?: string;
    }>(),
    {
      instanceCode: '',
    }
  );

  const emit = defineEmits<{
    (event: 'success', localData: any, type: string): void;
    (event: 'fileClick', file: FileItem): void;
  }>();

  const visible = ref(false);
  const headerTitle = ref('');
  const localData = ref<any>({});
  const buttonLoading = ref(false);
  const contentMap = ref<any>({});
  const urlParams = ref<any>({});

  const open = async (data, title, allData) => {
    headerTitle.value = title;
    localData.value = data;
    urlParams.value = allData;
    showFileViewer.value = false;
    selectedFile.value = null;
    contentMap.value = {
      数据来源: data.data_sources,
      推理过程: {
        content: data.evidence_chain,
      },
      置信度建议: {
        confidence_level: data.confidence_level,
        core_conclusion: data.core_conclusion,
      },
    };
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  // 点击弃用、采纳
  const handleClickBtn = async (type) => {
    buttonLoading.value = true;
    try {
      // 先修改对应的结论值 再请求接口
      let content =
        urlParams.value.content?.map((item) => {
          // 只有匹配时才返回新对象，不修改原 item
          if (item.module_name === headerTitle.value) {
            return {
              ...item,
              children: (item.children || []).map((node) => {
                if (node.title === localData.value.title) {
                  return { ...node, conclusion: type }; // 更新节点
                }
                return node;
              }),
            };
          }
          return item;
        }) || [];

      let params = {
        resultId: urlParams.value.resultId,
        conclusionResult: {
          ...urlParams.value,
          content,
        },
      };
      await newProductApi.luteosAiNpoProjectConfirmConclusion(params);
      localData.value.conclusion = type;
      ElMessage.success(`${tagMapText[type]}该结论`);
      // emit('success', localData.value, type);
      // close();
    } finally {
      buttonLoading.value = false;
    }
  };

  // file
  const showFileViewer = ref(false);
  const selectedFile = ref<any>(null);

  const handleFileClick = async (file: any) => {
    if (file.ext?.includes('html')) {
      // 打开ppt
      if (file.previewUrl) {
        window.open(file.previewUrl);
      } else {
        ElMessage({
          message: '当前链接不可用，请稍后再试',
          grouping: true,
          type: 'warning',
        });
      }

      return;
    }

    selectedFile.value = file;
    showFileViewer.value = true;
  };

  const handleFileBack = () => {
    showFileViewer.value = false;
    selectedFile.value = null;
  };

  defineExpose({
    open,
    close,
  });
</script>

<style scoped lang="scss">
  .evidence-chain {
    .show-file-viewer {
      padding: 10px 20px;
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    :deep(.el-drawer__header) {
      padding: 14px 20px;
      border-bottom: 1px solid var(---N3, #eff0f0);
      margin-bottom: 0;
      .header-title {
        display: flex;
        align-items: center;
        align-self: stretch;
        color: var(---N9, var(---N9, #262626));
        font-family: 'PingFang SC Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
        gap: 8px;
      }
    }
    :deep(.el-drawer__footer) {
      display: flex;
      padding: 16px 20px;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      border-top: 1px solid var(---N2, #f4f5f5);
      background: #fff;
    }
    :deep(.el-drawer__body) {
      padding: 0;
      display: flex;
    }
    .drawer-content {
      display: flex;
      padding: 16px 20px 20px 20px;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      flex: 1 0 0;
      align-self: stretch;
      .content-title {
        display: flex;
        color: var(---N6, var(---N6, #8a8f8d));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 8px;
      }
      .data-source {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .source-item {
          color: var(---N9, var(---N9, #262626));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-skip-ink: auto;
          text-decoration-thickness: auto;
          text-underline-offset: auto;
          text-underline-position: from-font;
          &:hover {
            color: var(---P6, var(---P6, #02b96b));
            cursor: pointer;
          }
        }
      }
      .reasoning-process {
        // display: flex;
        // flex-direction: column;
        // align-items: flex-start;
        // align-self: stretch;
        // border-radius: 8px;
        // border: 1px solid var(---N3, #eff0f0);
        color: var(---N9, var(---N9, #262626));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
      .level-conclusion {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        .core_conclusion {
          color: var(---N9, var(---N9, #262626));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
      .process-title {
        display: flex;
        width: 108px;
        padding: 10px 12px;
        align-items: flex-start;
        gap: 12px;
        align-self: stretch;
        border-right: 1px solid var(---N2, #f4f5f5);
        background: var(---N1, #f8f8f8);
        overflow: hidden;
        color: var(---N9, var(---N9, #262626));
        text-overflow: ellipsis;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
      .process-content {
        display: flex;
        padding: 10px 12px;
        align-items: flex-start;
        gap: 10px;
        flex: 1 0 0;
        align-self: stretch;
        border-right: 1px solid var(---N2, #f4f5f5);
        border-bottom: 1px solid var(---N2, #f4f5f5);
        color: var(---N8, var(---N8, #585a5a));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
</style>
