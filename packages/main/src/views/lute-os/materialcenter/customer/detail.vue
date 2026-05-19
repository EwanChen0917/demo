<template>
  <div class="user-container">
    <div class="user-right">
      <div class="header-wrap">{{ topLabelName }}</div>
      <div class="card-content">
        <section class="card-container-wrap mb-0">
          <el-tabs v-model="secondLabel" @tab-click="handleTabChange">
            <el-tab-pane
              :label="item.name"
              :name="item.labelCode"
              v-for="(item, index) in labelList"
              :key="index"
            >
              <div class="red-card-container-wrap" v-if="fileList.length">
                <div
                  class="red-card-container"
                  v-for="(file, fileIndex) in fileList"
                  :key="fileIndex"
                >
                  <div class="red-card" @click="previewFile(file)">
                    <img :src="file.thumbnailUrl" resize="contain" v-if="file.thumbnailUrl" />
                    <img
                      class="card-placeholder placeholder-img"
                      v-else-if="['pdf', 'PDF'].includes(file.fileType)"
                      src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828220402-679d3b49-7925-4596-b5f0-de57446bfcda.png"
                    />
                    <img
                      class="card-placeholder placeholder-img"
                      v-else-if="['ppt', 'pptx', 'PPT', 'PPTX'].includes(file.fileType)"
                      src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828220503-e29db114-043d-4d4b-b5ea-c3a643ee71a3.png"
                    />
                    <span v-else class="card-placeholder"></span>
                  </div>
                  <div class="card-info">
                    <div class="card-info-wrap">
                      <div>
                        <img
                          src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172827-75593668-a955-4d95-97b9-11829d706b8e.png"
                          class="folder-images"
                        />
                      </div>
                      <div class="red-card-title">
                        <div>
                          <OverflowTooltip :content="file.fileName" :line="1" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <el-popover
                        :width="0"
                        placement="right-start"
                        trigger="hover"
                        :show-arrow="false"
                        :popper-style="{ padding: 0 }"
                        transition="el-dropdown-move-up"
                        :offset="2"
                      >
                        <template #reference>
                          <div>
                            <img
                              src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172848-abe5226a-a1bf-4a1a-983e-40d8c1986f86.png"
                              class="more-images"
                            />
                          </div>
                        </template>
                        <div
                          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 py-4 d-block"
                          data-kt-menu="true"
                        >
                          <div class="menu-item px-3">
                            <a
                              class="menu-link px-3"
                              @click="downloadFile(file)"
                              v-if="+file.auth === 1"
                            >
                              下载
                            </a>
                          </div>
                          <div class="menu-item px-3">
                            <a class="menu-link px-3" @click="handleCopy">分享</a>
                          </div>
                        </div>
                      </el-popover>
                    </div>
                  </div>
                </div>
              </div>
              <el-empty v-else description="暂无数据" />
            </el-tab-pane>
          </el-tabs>
        </section>
        <div class="pagination-wrap" v-if="isShowPagination">
          <KeenPagination
            :current="pagination.pageNum"
            :page-size="pagination.pageSize"
            :page-size-option="[10, 20, 50, 100]"
            :total="pagination.total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    :extType="extType"
    @close="previewVisible = false"
  />
</template>

<script setup lang="ts" name="materialcenterCustomerDetail">
  import { ElMessage } from 'element-plus';
  import { fccApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { copyFn } from '@/utils/copyFn';
  import { download } from '@/utils/download';

  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const secondLabel = ref();
  const topLabelName = ref('');

  const route = useRoute();
  const { query } = route;
  const keyword = ref('');

  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const isShowPagination = computed(() => {
    return Math.floor(pagination.value.total / pagination.value.pageSize) > 1;
  });

  const labelList = ref([]);
  const queryLabel = () => {
    platformApi
      .platformLabelQueryLabelList({
        pageNum: 1,
        pageSize: 100,
        level: 2,
        module: 'fc_material',
        parentLabelCode: query.topCode,
      })
      .then((res) => {
        labelList.value = res.labelInfoList || [];
        if (labelList.value.length) {
          secondLabel.value = query.labelCode || labelList.value[0].labelCode;
          queryFileList();
        }
      });
  };

  const fileList = ref([]);
  const queryFileList = async () => {
    const res = await fccApi.luteosFccCenterClientQueryLabelFileList({
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
      keyword: query.keyword || '',
      labelCodeList: query.labelCodeList || '',
      extTypeList: query.extTypeList || '',
      topLabelCode: query.topCode,
      labelCode: secondLabel.value,
    });
    fileList.value = res.fileList || [];
    topLabelName.value = res.topLabelName;
    pagination.value.total = res.total;
  };

  const handleTabChange = () => {
    nextTick(() => {
      queryFileList();
    });
  };

  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    queryFileList();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    queryFileList();
  };

  // 预览文件
  const fileUrl = ref<string>('');
  const fileName = ref<string>('');
  const previewVisible = ref<boolean>(false);
  const previewFile = async (row) => {
    let { extType } = row;
    if (!extType) {
      return;
    }
    const res = await fccApi.luteosFccCenterQueryFileInfo({
      operateType: 2,
      fileCode: row.fileCode,
    });

    // 文件地址
    fileUrl.value = res.filePath as string;
    fileName.value = row.fileName;
    extType = extType.toLocaleLowerCase();

    previewVisible.value = true;
  };

  // 文件下载
  const downloadFile = async (row: any) => {
    const res = await fccApi.luteosFccCenterQueryFileInfo({
      operateType: 1,
      fileCode: row.fileCode,
    });
    // 文件直接下载
    download(res.filePath as string, row.fileName);
  };

  const handleCopy = () => {
    copyFn(location.href, '网址链接');
  };

  onMounted(() => {
    queryLabel();
  });
</script>

<style scoped lang="scss">
  .user-container {
    display: flex;
    min-height: 80vh;
  }
  .label-select {
    min-width: 200px !important;
    margin-left: 10px;
    :deep(.el-tag--info) {
      max-width: 100px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .user-right {
    // overflow-y: auto;
    // flex-grow: 1;
    background: #fff;
    width: 100%;
  }

  .card-content {
    width: 1200px;
    margin: 0 auto;
  }
  .one-label {
    color: #000000d9;
    font-family: 'PingFang SC';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 24px;
  }

  .container {
    padding-top: 32px;
    padding-left: 32px;
  }

  .card-container-wrap {
    margin-bottom: 40px;
  }

  .card-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding-bottom: 10px;
  }

  .card {
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    width: 272px;
    height: 260px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    margin-right: 16px;
  }

  .latest-card {
    height: 296px;
  }

  .card-images {
    display: flex;
    width: 272px;
    height: 192px;
    background: #f9f9f9;
    flex-wrap: wrap;
    padding-left: 24px;
    padding-top: 24px;
  }

  .img-placeholder {
    width: 64px;
    height: 64px;
    background: #ecf1ff;
    margin-right: 16px;
    margin-bottom: 16px;
    line-height: 64px;
    text-align: center;
    border-radius: 8px;
    img {
      width: 40px;
      height: 40px;
    }
  }

  .images {
    width: 64px;
    height: 64px;
    margin-right: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
  }

  .images img {
    width: 100%;
    height: 100%;
  }

  .card-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 24px;
  }
  .card-info-wrap {
    display: flex;
    height: 20px;
    line-height: 20px;
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 16px;
  }
  .user-images {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin-right: 8px;
  }
  .info-title {
    color: #000000d9;
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .folder-images {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .info-txt {
    color: #000000d9;
    text-align: right;
    font-family: 'PingFang SC';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  .info-num {
    color: #4372ff;
    margin-left: 4px;
    display: inline-block;
  }

  .user-name {
    color: #000000d9;
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .info-time {
    color: #00000073;
    text-align: right;
    font-family: 'PingFang SC';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  .mb-0 {
    margin-bottom: 0;
  }

  .header-wrap {
    margin-top: 16px;
    width: 100%;
    text-align: center;
    height: 72px;
    line-height: 72px;
    color: #000000d9;
    text-align: center;
    font-family: 'PingFang SC';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
  }

  .view-all {
    color: #4372ff;
    text-align: right;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    cursor: pointer;
    img {
      width: 11px;
      height: 11px;
      margin-top: -2px;
    }
  }

  .red-card-container-wrap {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    overflow-x: scroll;
  }

  .red-card-container {
    margin-top: 20px;
    width: 272px;
    height: 260px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ddd;
    margin-right: 16px;
  }

  .red-card {
    border-radius: 8px;
    width: 272px;
    height: 192px;
    background: #f9f9f9;
    line-height: 192px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      margin-top: -4px;
    }
    .card-placeholder {
      display: inline-block;
      background: #d9d9d9;
      width: 88px;
      height: 88px;
      border-radius: 8px;
      margin-top: 52px;
      margin-left: 92px;
    }
    .placeholder-img {
      margin-top: 0;
    }
  }

  .red-card-title {
    color: #000000d9;
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    width: 150px;
  }

  .more-images {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    margin-top: 40px;
  }
  .el-tabs {
    :deep(.is-active) {
      color: #4372ff;
    }
    :deep(.el-tabs__item) {
      &:hover {
        color: #4372ff;
      }
    }
    :deep(.el-tabs__active-bar) {
      background: #4372ff;
    }
  }
</style>
