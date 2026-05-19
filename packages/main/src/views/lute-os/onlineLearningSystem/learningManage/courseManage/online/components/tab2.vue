<template>
  <div class="course-catalog">
    <template v-if="!fileList.length">
      <el-empty description="还未添加课件">
        <el-button type="primary" @click="addCourse" v-if="mode !== 'detail'">添加课件</el-button>
      </el-empty>
    </template>
    <div v-else>
      <div style="text-align: left">
        <el-button size="small" type="primary" @click="addCourse" v-if="mode !== 'detail'">
          添加课件
        </el-button>
      </div>
      <draggable
        :list="fileList"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        :sort="fileList.length > 1"
        handle=".drag-handle"
        item-key="fileCode"
        @change="removed"
      >
        <template #item="{ element, index }">
          <div class="file-item">
            <div class="file-item-desc">
              <div class="title">
                <div class="d-flex align-items-center gap-2">
                  <SvgIcon
                    :icon="getSvgIcon(element)"
                    class="svg-icon svg-icon-1 svg-icon-primary"
                  />
                  <!-- 文件名称 -->
                  <span class="text-gray-800 text-hover-primary cursor-pointer">
                    {{ element.fileName }}.{{ element.extType }}
                  </span>
                </div>
              </div>
              <div class="learning-time">
                最短学习时长 {{ formatTime(element.minLearningTime) }}
              </div>
            </div>
            <div class="file-item-operation" v-if="mode !== 'detail'">
              <ElTooltip
                popper-class="action_tool_tip"
                placement="top"
                effect="light"
                content="移动"
              >
                <div
                  class="action-button btn btn-sm btn-icon btn-light btn-active-light-primary drag-icon drag-handle"
                >
                  <SvgIcon icon="drag" class="svg-icon svg-icon-4" />
                </div>
              </ElTooltip>
              <KeenActions
                :actions="[
                  { label: '预览', key: 'preview', row: element, index },
                  { label: '编辑', key: 'edit', row: element, index },
                  { label: '删除', key: 'remove', row: element, index },
                ]"
                @click="handleActions"
              />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <fileDialog :selected-data="fileList" ref="fileDialogRef" @submit="handleSelectdChange" />
  <minLearningTimeDialog ref="minLearningTimeRef" @success="getDataList" />
  <FilePreview ref="filePreviewRef" />
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable';
  import { studyApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import fileDialog from './fileDialog.vue';
  import { getSvgIcon } from '../../../data';
  import minLearningTimeDialog from './minLearningTime.vue';

  const props = defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const filePreviewRef = ref();
  const route = useRoute();
  const fileDialogRef = ref();
  const fileList = ref<any[]>([]);
  const getDataList = async () => {
    const res = await studyApi.luteosStudyQueryStudyCourseCatalogs({
      courseCode: route.query.courseCode as string,
    });
    fileList.value = res.catalogList as any[];
  };
  if (route.query.courseCode) {
    getDataList();
  }

  const addCourse = () => {
    fileDialogRef.value.open();
  };
  const handleSelectdChange = async (data: any[]) => {
    const list = data.map((o) => {
      fileList.value.forEach((s) => {
        if (o.fileCode === s.fileCode) {
          o.minLearningTime = s.minLearningTime;
        }
      });
      if (!o.minLearningTime) {
        o.minLearningTime = o.videoTime || 180;
      }
      return o;
    });
    // list.map((o) => {
    //   this.$set(o, 'goodQty', o.goodQty || 0);
    //   this.$set(o, 'defectiveQty', o.defectiveQty || 0);
    //   this.$set(o, 'newSkuIsZero', false); // o.newSkuIsZero || false
    //   const { productSku, productName, deliveryQty, skuId, goodQty, defectiveQty, isSystem } = o;
    //   return { productSku, productName, deliveryQty, skuId, goodQty, defectiveQty, isSystem };
    // });
    // fileList.value = [...list];

    // 添加是否来自系统原有sku的标志
    // const systemSkus = this.order.returnOrderOutboundDtlVoList.map(v => v.productSku)
    // this.skuList.forEach(o => {
    //   o.isSystem = systemSkus.includes(o.productSku) ? true : false
    //   // this.$set(o, 'deliveryQty', o.deliveryQty || 0)
    //   this.$set(o, 'goodQty', o.deliveryQty || 0)
    //   this.$set(o, 'defectiveQty', 0)
    // })
    updateFileList(list);
  };
  const minLearningTimeRef = ref();
  const handleActions = (item) => {
    const { key, row, index } = item;
    switch (key) {
      case 'remove':
        updateFileList(fileList.value.filter((o) => o.fileCode !== row.fileCode));
        break;
      case 'preview':
        filePreviewRef.value?.preview(row);
        break;
      case 'edit':
        minLearningTimeRef.value.open(row, fileList.value, index);
        break;
      default:
        break;
    }
  };
  const updateFileList = async (list) => {
    const res = await studyApi.luteosStudySaveStudyCourseCatalog({
      courseCode: route.query.courseCode as string,
      catalogSaveList: list.map((item) => {
        return {
          minLearningTime: item.minLearningTime,
          fileCode: item.fileCode,
        };
      }),
    });
    if (res) {
      ElMessage.success('操作成功');
      getDataList();
    }
  };
  const removed = () => {
    updateFileList(fileList.value);
  };
  const formatTime = (minLearningTime: number) => {
    const minutes = Math.floor(minLearningTime / 60);
    const seconds = minLearningTime % 60;
    return `${minutes}分${seconds}秒`;
  };
  const hasChange = () => {
    return false;
  };
  defineExpose({ hasChange });
</script>

<style scoped lang="scss">
  .course-catalog {
    margin-bottom: 8px;

    .file-item {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px 20px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-top: 12px;
      flex-wrap: wrap;
      .file-item-desc {
        flex: 1;
        // display: flex;
        gap: 20px;
        align-items: center;
        .title {
          font-size: 14px;
          font-weight: bold;
        }
        .learning-time {
          margin-top: 4px;
          margin-left: 4px;
          width: 400px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #999;
          .inp-number {
            width: 100px;
          }
        }
      }
      .file-item-operation {
        display: flex;
        align-items: center;
        gap: 20px;
        .drag-handle {
          cursor: move;
          padding: 4px;
          font-size: 18px;
        }
      }
    }
  }
</style>
