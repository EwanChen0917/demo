<template>
  <el-dialog
    class="courseware-dialog"
    title="选择课件"
    v-model="visibility"
    width="1200px"
    :before-close="close"
  >
    <KeenList>
      <template #search>
        <el-input v-model="searchParams.fileName" placeholder="课件名称" @change="search">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="extTypeList"
          clearable
          filterable
          multiple
          placeholder="文件格式"
          collapse-tags
          @change="
            (val) => {
              searchParams.extTypeList = val.join(',');
              search();
            }
          "
        >
          <el-option
            v-for="item in dictMap.fccformat"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="fileTagList"
          clearable
          filterable
          multiple
          placeholder="文件所属标签"
          class="label-select"
          collapse-tags
          @change="
            (val) => {
              searchParams.fileTagList = val.join(',');
              search();
            }
          "
        >
          <el-option
            v-for="item in labelList"
            :key="item.labelCode"
            :label="item.labelName"
            :value="item.labelCode"
            :disabled="+item.status === 0"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-button type="primary" @click="search">查询</el-button>
      </template>
      <div class="d-flex justify-content-between" style="height: 44px">
        <el-space class="badge badge-lg badge-light-primary h-30px">
          <SvgIcon icon="abstract-abs033" class="svg-icon svg-icon-4 svg-icon-primary" />
          <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item
              v-for="(foler, index) in breadcrumbList"
              :key="index"
              @click="handleBreadcrumbClick(foler.fileCode)"
            >
              {{ foler.fileName }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-space>
        <el-space v-if="multiSelection?.length > 0" class="d-flex align-items-center">
          <div class="text-gray-600">
            已选择
            <span class="text-primary fw-bold">{{ multiSelection?.length }}</span>
            个文件
          </div>
          <el-button link type="danger" @click="removeAllMultiSelection">清除</el-button>
        </el-space>
      </div>
      <vxe-table
        ref="chooseFileRef"
        max-height="400px"
        border="inner"
        :data="tableList"
        v-loading="tableLoading"
        :checkbox-config="checkboxConfig"
        row-id="fileCode"
        @checkbox-change="handleCheckboxChange"
        @checkbox-all="handleCheckboxChange"
      >
        <vxe-column type="checkbox" width="60px" />
        <vxe-column field="name" title="课件名称" min-width="100">
          <template #default="{ row }">
            <FileName
              :file="row"
              @next="next"
              @preview="
                (file) => {
                  filePreviewRef?.preview(file);
                }
              "
            />
          </template>
        </vxe-column>
        <vxe-column field="extType" title="文件格式" width="120" />
        <vxe-column field="fileSize" title="文件大小" width="100">
          <template #default="scope">
            <div>{{ getFileSizeDesc(scope.row.fileSize) }}</div>
          </template>
        </vxe-column>
        <vxe-column field="uploaderName" title="上传信息" min-width="120">
          <template #default="scope">
            <template v-if="scope.row.fileType === 2">
              <div>上传人：{{ scope.row.uploaderName }}</div>
              <div>上传时间：{{ scope.row.uploadTime }}</div>
            </template>
            <div v-else>--</div>
          </template>
        </vxe-column>
        <vxe-column field="initiator" title="标签" min-width="80">
          <template #default="scope">
            <Tag
              v-for="item in scope.row.tagList"
              :key="item.labelCode"
              :color="disabledLabelCodeList.includes(item.labelCode) ? 'gray' : 'blue'"
              class="tag-margin"
            >
              {{ item.labelName }}
            </Tag>
          </template>
        </vxe-column>
      </vxe-table>
      <KeenPagination
        :current="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-size-option="pagination.pageSizes"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!multiSelection.length" @click="confirmSelect">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <FilePreview ref="filePreviewRef" />
</template>

<script setup lang="ts">
    import { fccApi, platformApi } from '@/api';
  import useTable from '@/hooks/list/useTable';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      selectedData: any[];
      maxCount?: number;
    }>(),
    {
      maxCount: +Infinity,
    }
  );
  const filePreviewRef = ref();
  const visibility = ref(false);
  const tableList = ref<any[]>([]);
  const getDataList = async () => {
    const params = {
      ...searchParams.value,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
    };
    const res: any = await fccApi.luteosFccCenterQueryFccList(params);
    if (res && +res.code === 200) {
      tableList.value = res.fileCenterBeanList;
      pagination.total = res.total;
    } else {
      tableList.value = [];
      pagination.total = 0;
    }
  };
  const {
    searchParams,
    tableLoading,
    tableTotal,
    pagination,
    search,
    resetParams,
    handleSizeChange,
    handleCurrentChange,
  } = useTable(
    getDataList,
    {
      fileTagList: '',
      fileName: undefined,
      // fileCode: 'FO2023120414325121066699',
      scene: 2,
    },
    20
  );
  const dictMap = ref({});
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['fccformat', 'fileauth'],
    });
    dictMap.value = res.dictMap;
  };
  const labelList = ref([]);
  const queryLabel = () => {
    fccApi
      .luteosFccTagQueryFccLabelList({ pageNum: 1, pageSize: 100, labelType: 'fc_knowledge' })
      .then((res) => {
        labelList.value = res.fccLabelList as [];
      });
  };
  const disabledLabelCodeList = computed(() => {
    const list: any = [];
    labelList.value.forEach((item: any) => {
      if (+item.status === 0) {
        list.push(item.labelCode);
      }
    });
    return list;
  });
  // 文件大小描述
  const getFileSizeDesc = (fileSize) => {
    if (!fileSize) return '-';
    if (fileSize < 1024) {
      return `${fileSize}B`;
    }
    if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024).toFixed(2)}KB`;
    }
    if (fileSize < 1024 * 1024 * 1024) {
      return `${(fileSize / 1024 / 1024).toFixed(2)}MB`;
    }
    return `${(fileSize / 1024 / 1024 / 1024).toFixed(2)}GB`;
  };
  // 文件夹面包屑点击
  const handleBreadcrumbClick = (fileCode) => {
    searchParams.value.fileCode = fileCode;
    // 更新面包屑
    const list: any = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < breadcrumbList.value.length; i++) {
      list.push({
        fileCode: breadcrumbList.value[i].fileCode,
        fileName: breadcrumbList.value[i].fileName,
      });

      if (fileCode === breadcrumbList.value[i].fileCode) {
        break;
      }
    }
    breadcrumbList.value = list;
    search();
  };
  const breadcrumbList = ref([
    {
      fileName: '文控中心-人力资源部',
      fileCode: 'FO2023120414325121066699',
      fileType: 1,
    },
  ]);
  const checkboxConfig = reactive({
    // labelField: 'fileCode',
    checkMethod: ({ row }) => {
      return row.fileType !== 1;
    },
    visibleMethod({ row }) {
      return row.fileType !== 1;
    },
    trigger: 'row',
    reserve: true,
  });
  // 进入下一级
  const next = async (row) => {
    // 面包屑刷新
    searchParams.value.fileCode = row.fileCode;
    breadcrumbList.value.push({
      fileCode: row.fileCode,
      fileName: row.fileName,
      fileType: row.fileType || 1,
    });
    search();
  };
  //  初始化下拉列表
  onMounted(() => {
    queryLabel();
    queryDictMap();
  });

  const multiSelection = ref<any[]>([]);
  const chooseFileRef = ref();
  // 选中文件
  const handleCheckboxChange = ({ records, reserves }) => {
    const selectedALLRecords = reserves.concat(records);
    multiSelection.value = multiSelection.value.filter((row) => {
      if (!selectedALLRecords.some((item) => item.fileCode === row.fileCode)) {
        chooseFileRef.value?.setCheckboxRow({ row }, false);
        return false;
      }
      return true;
    });
    let limit = false;
    records.forEach((row) => {
      const hasSelected = multiSelection.value.some((item) => row.fileCode === item.fileCode);
      if (!hasSelected) {
        if (multiSelection.value.length < props.maxCount) {
          multiSelection.value.push(row);
          limit = false;
        } else {
          chooseFileRef.value?.setCheckboxRow({ row }, false);
          limit = true;
        }
      }
    });
    if (limit) {
      ElMessage.warning(`选择的产品不能超过${props.maxCount}个`);
    }
  };
  // 移除所有选中
  const removeAllMultiSelection = () => {
    multiSelection.value = [];
    chooseFileRef.value?.clearCheckboxReserve();
    chooseFileRef.value?.clearCheckboxRow();
  };
  watch(
    visibility,
    (newVal: boolean) => {
      if (newVal) {
        if (chooseFileRef.value) {
          chooseFileRef.value?.clearCheckboxReserve();
        }
        selectedDataDeal();
        resetParams();
      }
    },
    { immediate: true }
  );
  // 展开激活列中的选中项
  function selectedDataDeal() {
    // 多重ke
    multiSelection.value = [...props.selectedData];
    nextTick(() => {
      if (multiSelection.value.length) {
        multiSelection.value.forEach((row) => {
          chooseFileRef.value?.setCheckboxRow(row, true);
        });
      } else {
        removeAllMultiSelection();
      }
    });
  }
  const open = () => {
    visibility.value = true;
  };
  const close = () => {
    visibility.value = false;
  };
  const emits = defineEmits<{
    (e: 'submit', data: any[]);
  }>();
  const confirmSelect = () => {
    if (multiSelection.value.length > 10) {
      ElMessage.warning('最多只能选择10个文件');
    } else {
      emits('submit', multiSelection.value);
      close();
    }
  };
  defineExpose({
    open,
    close,
  });
</script>

<style lang="scss">
  .courseware-dialog {
    .el-dialog__body {
      padding: 0 !important;
    }
  }
  .courseware-dialog .el-breadcrumb__inner {
    color: unset !important;
    cursor: pointer;
    font-weight: normal;

    &:hover {
      font-weight: var(--bs-badge-font-weight);
    }
  }

  :deep(.el-breadcrumb__separator) {
    color: unset !important;
  }
</style>
