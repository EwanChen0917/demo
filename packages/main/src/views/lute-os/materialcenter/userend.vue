<template>
  <div class="user-container">
    <div class="user-left">
      <div class="tree-menu">
        <el-tree
          ref="treeRef"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span v-if="!keyword">{{ node.label }}</span>
              <span v-if="keyword && data.fileType === 1 && !fileNames.includes(data.fileName)">
                {{ node.label }}
              </span>
              <span
                v-else-if="keyword && fileNames.includes(data.fileName)"
                v-html="
                  node.label.replace(
                    new RegExp(node.label, 'g'),
                    `<font style='color:#3e97ff'>${node.label}</font>`
                  )
                "
              />
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="user-right">
      <el-space class="badge badge-lg badge-light-primary h-30px breadcrumb">
        <SvgIcon icon="abstract-abs033" class="svg-icon svg-icon-4 svg-icon-primary" />
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="folder in breadcrumbList"
            :key="folder.fileCode"
            @click="handleBreadcrumbClick(folder.fileCode)"
          >
            {{ folder.fileName }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-space>
      <KeenList>
        <template #search>
          <el-input
            v-if="!hotKeyWords.length"
            v-model="keyword"
            :placeholder="`在${searchWord}搜索`"
            @input="(val) => (search.keyword = val)"
            clearable
          >
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <ElTooltip popper-class="action_tool_tip" placement="bottom" effect="light" v-else>
            <template #content>
              <div class="keyword-search">
                <div class="search-hot">
                  <SvgIcon icon="hotWord" class="hot-word" />
                  <span>热门搜索</span>
                </div>
                <div
                  class="search-height"
                  v-for="(item, index) in hotKeyWords"
                  :key="index"
                  @click="handleKeywordClick(item)"
                >
                  <span class="search-num" :style="getKeyWordBg(index)">{{ index + 1 }}</span>
                  <span class="search-word">{{ item }}</span>
                </div>
              </div>
            </template>
            <!-- 需要支持输入空格，直接绑定search.keyword输入不了空格，目前还没定位到问题，使用这个作为替代方案 -->
            <el-input
              v-model="keyword"
              :placeholder="`在${searchWord}搜索`"
              @input="(val) => (search.keyword = val)"
              clearable
            >
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>
          </ElTooltip>
        </template>
        <template #filters>
          <el-select
            v-model="extTypeList"
            clearable
            filterable
            multiple
            placeholder="请选择文件格式"
            class="label-select"
            collapse-tags
            @change="
              (val) => {
                search.extTypeList = val.join(',');
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
          <template v-if="fileTagNameList.length <= 3">
            <el-select
              v-model="labelCodeList"
              clearable
              filterable
              multiple
              placeholder="文件所属标签"
              class="label-select"
              collapse-tags
              :max-collapse-tags="3"
              :style="{
                width: labelCodeList.length
                  ? labelCodeList.length > 3
                    ? '400px'
                    : labelCodeList.length * 130 + 'px'
                  : '200px',
              }"
              @change="
                (val) => {
                  search.labelCodeList = val.join(',');
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
          <ElTooltip popper-class="action_tool_tip" placement="top" effect="light" v-else>
            <template #content v-if="fileTagNameList.length > 3">
              <div class="tool-content d-flex">
                <div v-for="item in fileTagNameList" :key="item">
                  <Tag color="gray" style="margin-right: 10px">{{ item }}</Tag>
                </div>
              </div>
            </template>
            <el-select
              v-model="labelCodeList"
              clearable
              filterable
              multiple
              placeholder="文件所属标签"
              class="label-select"
              collapse-tags
              :max-collapse-tags="3"
              :style="{
                width: labelCodeList.length
                  ? labelCodeList.length > 3
                    ? '400px'
                    : labelCodeList.length * 130 + 'px'
                  : '200px',
              }"
              @change="
                (val) => {
                  search.labelCodeList = val.join(',');
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
          </ElTooltip>
        </template>
        <template #buttons>
          <el-button class="button" type="primary" @click="runQuery">查询</el-button>
          <el-button class="button" type="primary" @click="reset">重置</el-button>
        </template>
        <div class="card-content" v-loading="listLoading">
          <template v-if="listData?.fileClientList.length">
            <div
              class="col-md-3 report-card"
              v-for="item in listData.fileClientList"
              :key="item.fileCode"
              @click="handleFIleClick(item)"
            >
              <div class="card-img">
                <img v-if="item.thumbnailUrl" :src="item.thumbnailUrl" alt="" />
                <img v-else :src="getDefaultUrl(item)" />
                <div class="video-stop" v-if="isVideo(item.extType)">
                  <SvgIcon icon="videoStop" />
                </div>
              </div>
              <div class="card-title-wrap">
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="item.fileName"
                >
                  <div class="card-title-content">
                    {{ item.fileName }}
                  </div>
                </el-tooltip>
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
                      <div class="more-icon">
                        <SvgIcon icon="more" class="svg-icon svg-icon-2" />
                      </div>
                    </template>
                    <div
                      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 py-4 d-block"
                      data-kt-menu="true"
                    >
                      <div class="menu-item px-3">
                        <a
                          class="menu-link px-3"
                          @click="downloadFile(item)"
                          v-if="+item.auth === 1"
                        >
                          下载
                        </a>
                        <a class="menu-link px-3" @click="handleCopy(item)">分享</a>
                        <a
                          class="menu-link px-3"
                          @click="handleViewSource(item)"
                          v-if="item.fileSource"
                        >
                          查看来源
                        </a>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>
              <el-popover
                :width="0"
                placement="bottom-start"
                trigger="hover"
                :show-arrow="true"
                :popper-style="{ padding: 0 }"
                transition="el-dropdown-move-up"
                :offset="2"
              >
                <template #reference>
                  <div class="card-tag">
                    <Tag
                      v-for="tag in item.labelInfoList"
                      :key="tag.labelCode"
                      :color="disabledLabelCodeList.includes(item.labelCode) ? 'gray' : 'blue'"
                      class="tag-content"
                    >
                      {{ tag.name }}
                    </Tag>
                  </div>
                </template>
                <div class="popover-tag">
                  <Tag
                    v-for="tag in item.labelInfoList"
                    :key="tag.labelCode"
                    :color="disabledLabelCodeList.includes(item.labelCode) ? 'gray' : 'blue'"
                    class="tag-margin"
                  >
                    {{ tag.name }}
                  </Tag>
                </div>
              </el-popover>
            </div>
          </template>
          <div v-else-if="!listLoading" class="empty-wrap">
            <span class="el-table__empty-text">暂无数据</span>
          </div>
        </div>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />

        <el-image-viewer @close="handleClose" v-if="imgVisible" :url-list="[fileUrl]" />
        <PdfPreview
          v-if="visible"
          :visible="visible"
          :url="fileUrl"
          @close="visible = false"
          :hideDownload="hideDownload"
        />
        <XlsPreview
          v-if="xlsVisible"
          :visible="xlsVisible"
          :url="fileUrl"
          :fileName="fileName"
          @close="handleClose"
          :hideDownload="hideDownload"
        />
        <DocPreview
          v-if="docVisible"
          :visible="docVisible"
          :url="fileUrl"
          :type="docType"
          @close="handleClose"
          :hideDownload="hideDownload"
        />
        <VideoPreview
          v-if="videoVisible"
          :visible="videoVisible"
          :url="fileUrl"
          @close="handleClose"
          :hideDownload="hideDownload"
        />
      </KeenList>
    </div>
  </div>
</template>

<script setup lang="ts" name="userprofileuserend">
    import { ElMessage } from 'element-plus';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { fccApi, FccApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { copyFn } from '@/utils/copyFn';
  import { encryptByBase64, decryptByBase64 } from '@/utils/aesTils';
  import { ArrowRight } from '@element-plus/icons-vue';
  import { download } from '@/utils/download';
  import axios from 'axios';
  import { sceneList } from './config/index.ts';

  const route = useRoute();
  const router = useRouter();
  const { query } = route;
  const keyword = ref('');

  const sceneInfo =
    sceneList.find((item) => {
      return route.name === item.userComponentName;
    }) || {};

  const searchWord = ref(sceneInfo.title);

  const PAGE_SIZE = 10;
  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    FccApi.LuteosFccCenterClientQueryFileList.RequestQuery,
    FccApi.LuteosFccCenterClientQueryFileList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      extTypeList: undefined,
      labelCodeList: undefined,
      parentCode: undefined,
      scene: sceneInfo.scene,
    },
    pageSize: PAGE_SIZE,
    service: fccApi.luteosFccCenterClientQueryFileList,
  });

  const labelList = ref([]);
  const queryLabel = () => {
    fccApi
      .luteosFccTagQueryFccLabelList({ pageNum: 1, pageSize: 100, labelType: sceneInfo.labelType })
      .then((res) => {
        labelList.value = res.fccLabelList;
      });
  };

  const fileTagNameList = computed(() => {
    const list: any = [];
    labelCodeList.value.forEach((item) => {
      const data: any = labelList.value.find((label: any) => label.labelCode === item) || {};
      if (data.labelName) {
        list.push(data.labelName);
      }
    });
    return list;
  });

  const dictMap = ref({});
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['fccformat'],
    });
    dictMap.value = res.dictMap;
  };
  queryDictMap();

  const treeData = ref([]);
  const defaultProps = {
    children: 'childFolderList',
    label: 'fileName',
    isLeaf: true,
  };
  const treeRef = ref();

  const queryTreeData = async () => {
    const tree: any = await fccApi.luteosFccCenterClientQueryAllFolderList({
      parentCode: '',
      scene: sceneInfo.scene,
    });
    const data: any = {
      fileName: sceneInfo.title,
      fileCode: '',
      fileType: 1,
      childFolderList: tree.folderList || [],
    };
    treeData.value = [data];
    nextTick(() => {
      treeRef.value.filter();
    });
  };
  queryTreeData();

  const fileNames = ref([]);
  watch(
    () => listData.value,
    (val: any) => {
      fileNames.value = [];
      fileNames.value = val.fileClientList.map((item) => item.fileName);
      treeRef.value.filter();
    }
  );
  const filterNode = (value, data) => {
    if (!keyword.value && data.fileType === 1) {
      return true;
    }
    if (keyword.value && (data.fileType === 1 || fileNames.value.includes(data.fileName))) {
      return true;
    }
    return false;
  };

  // 树结构点击
  const handleNodeClick = async (nodeData) => {
    if (nodeData.fileType === 2) {
      previewFile(nodeData);
      return;
    }
    search.parentCode = nodeData.fileCode;
    breadcrumbList.value = await findItemAndAncestors(nodeData.fileCode);
  };

  const extTypeList = ref([]);
  const labelCodeList = ref([]);
  const reset = () => {
    resetSearch();
    extTypeList.value = [];
    labelCodeList.value = [];
    keyword.value = '';
    breadcrumbList.value = [
      {
        fileName: sceneInfo.title,
        fileCode: '',
        fileType: 1,
      },
    ];
  };

  const handleLabelChange = (val) => {
    search.labelCodeList = val.join(',');
  };

  const breadcrumbList = ref([
    {
      fileName: sceneInfo.title,
      fileCode: '',
      fileType: 1,
    },
  ]);
  // 复制功能使用
  if (query?.row) {
    breadcrumbList.value = JSON.parse(decryptByBase64(query.row as string));
    search.parentCode = breadcrumbList.value[breadcrumbList.value.length - 1].fileCode;
  }
  // 查找对应的文件夹信息，设置面包屑信息
  const findItemAndAncestors = async (fileCode) => {
    const tree: any = await fccApi.luteosFccCenterFindFolderParentList({
      fileCode,
      scene: sceneInfo.scene,
    });

    function findAncestors(folder, path = []) {
      // 如果文件夹不为空，检查当前文件编码是否匹配
      if (folder) {
        // 将当前文件夹的信息添加到路径
        const currentPath = [
          ...path,
          {
            fileName: folder.fileName,
            fileCode: folder.fileCode,
          },
        ];

        // 如果当前文件编码匹配，返回当前路径
        if (folder.fileCode === fileCode) {
          return currentPath;
        }

        // 如果有子文件夹，则在子文件夹中递归搜索
        if (folder.childFolder) {
          return findAncestors(folder.childFolder, currentPath);
        }
      }

      // 如果文件夹为空或者没有找到匹配，返回null表示没有找到
      return null;
    }

    return findAncestors(tree.fccFolder);
  };

  // 文件夹面包屑点击
  const handleBreadcrumbClick = (fileCode) => {
    search.parentCode = fileCode;
    // 更新面包屑
    const list: any = [];
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
  };

  // 进入下一级
  const next = async (row) => {
    // 面包屑刷新
    search.parentCode = row.fileCode;
    const data = breadcrumbList.value.find((item) => item.fileCode === row.fileCode);
    if (!data?.fileCode) {
      if (search.keyword) {
        search.keyword = '';
        breadcrumbList.value = await findItemAndAncestors(row.fileCode);
      } else {
        breadcrumbList.value.push({
          fileCode: row.fileCode,
          fileName: row.fileName,
          fileType: row.fileType || 1,
        });
      }
    }
  };
  // 文件/文件夹点击
  const handleFIleClick = (row) => {
    // 文件夹进到具体的文件夹列表，文件直接预览
    if (+row.fileType === 1) {
      next(row);
    } else {
      previewFile(row);
    }
  };
  // 是否视频类型
  const isVideo = (extType) => {
    return ['mp4', 'mpeg', 'avi', 'asf', 'mov', 'wmv', '3gp', 'rm', 'rmvb', 'flv', 'f4v'].includes(
      extType
    );
  };

  // 预览文件
  const fileUrl = ref<string>('');
  const fileName = ref<string>('');
  const visible = ref<boolean>(false);
  const imgVisible = ref<boolean>(false);
  const xlsVisible = ref<boolean>(false);
  const docVisible = ref<boolean>(false);
  const videoVisible = ref<boolean>(false);
  const docType = ref<'doc' | 'docx'>('docx');
  const hideDownload = ref(false); // 预览文件是否隐藏下载按钮
  const previewFile = async (row) => {
    let { extType } = row;
    hideDownload.value = row.auth === 2;

    if (!extType) {
      return;
    }
    // 获取文件信息
    const res = await fccApi.luteosFccCenterClientQueryFileInfo({
      operateType: 2,
      fileCode: row.fileCode,
      scene: sceneInfo.scene,
    });

    // 文件地址
    fileUrl.value = res.filePath as string;
    fileName.value = row.fileName;
    extType = extType.toLocaleLowerCase();
    // 视频如果没有缩列图需要下载视频并获取第一帧保存到后台
    if (isVideo(extType) && !row.thumbnailUrl) {
      getVideoFirstFrame({
        url: fileUrl.value,
        fileName: fileName.value,
        fileCode: row.fileCode,
      });
    }

    if (['jpg', 'jpeg', 'png'].includes(extType)) {
      imgVisible.value = true;
    } else if (extType === 'pdf') {
      visible.value = true;
    } else if (['xls', 'xlsx'].includes(extType)) {
      xlsVisible.value = true;
    } else if (['doc', 'docx', 'ppt', 'pptx'].includes(extType)) {
      docVisible.value = true;
      docType.value = extType;
    } else if (isVideo(extType)) {
      videoVisible.value = true;
    } else {
      ElMessage.info('暂不支持该文件类型的预览');
      return;
    }
    document.documentElement.style.overflow = 'hidden';
  };
  // 关闭预览
  const handleClose = () => {
    visible.value = false;
    imgVisible.value = false;
    docVisible.value = false;
    xlsVisible.value = false;
    videoVisible.value = false;
    fileName.value = '';
    document.documentElement.style.overflow = 'auto';
  };
  // 获取图标
  const getDefaultUrl = (row) => {
    let { extType } = row;
    if (row.fileType === 1) {
      extType = 'folder';
    }

    extType = extType.toLocaleLowerCase();
    // 文件类型对应的默认图片
    const imgMap = {
      pic: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516161501-50665800-b25c-475b-b65b-c2522b2fe7be.png',
      folder:
        'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240515220055-48bd5398-d247-42dc-8de6-37fd558efc79.jpg',
      pdf: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516134706-26cd3c7b-d331-4b62-a246-9720fe3299bb.jpeg',
      word: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516134718-ca9f7e7e-ac3d-4824-ae81-5cad984602b2.jpeg',
      excel:
        'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240515220812-55dbc9e3-590d-4c39-8718-4ff0775b3738.jpg',
      txt: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516134732-669b4efb-554e-462b-ba36-02c164f80c4b.jpeg',
      ppt: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516134836-57d52008-cba0-4077-ad9f-8143b4af2d5b.jpg',
      video:
        'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516135028-d1f0331b-e02b-4533-b961-981a14c797ed.jpg',
      zip: 'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516154027-19249772-8c29-43f3-9e72-727bf8fdbcc4.jpeg',
      default:
        'https://coss-platform.fenqile.com/platformresource200/M00/ex/20240516154438-4ce335eb-b0ec-489c-83c2-4306060f11d5.jpeg',
    };
    if (['jpg', 'jpeg', 'png', 'svg'].includes(extType)) {
      return row.url || imgMap.pic;
    }
    if (extType === 'pdf') {
      return imgMap.pdf;
    }
    if (['xls', 'xlsx'].includes(extType)) {
      return imgMap.excel;
    }
    if (['doc', 'docx'].includes(extType)) {
      return imgMap.word;
    }
    if (['ppt', 'pptx'].includes(extType)) {
      return imgMap.ppt;
    }
    if (['txt'].includes(extType)) {
      return imgMap.txt;
    }
    if (['folder'].includes(extType)) {
      return imgMap.folder;
    }
    if (['zip'].includes(extType)) {
      return imgMap.zip;
    }
    if (isVideo(extType)) {
      return imgMap.video;
    }

    return imgMap.default;
  };

  // 文件下载
  const downloadFile = async (row: any) => {
    // 文件夹异步下载
    if (row.fileType === 1) {
      const res = await fccApi.luteosFccCenterDownFile({ fileCode: row.fileCode });
      const isConfirmed = await swal.confirm({
        text: '下载中，请前往下载任务中心查看。',
        icon: 'success',
        confirmButtonText: '去查看',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (!isConfirmed) return;
      router.push({
        path: '/downloadmanage',
        query: {
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
    } else {
      const res = await fccApi.luteosFccCenterQueryFileInfo({
        operateType: 1,
        fileCode: row.fileCode,
      });
      // 文件直接下载
      download(res.filePath as string, row.fileName);
    }
  };

  // 获取视频第一帧
  const getVideoFirstFrame = (file) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = file.url;

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0.1; // 设置时间，确保能正确抓取到第一帧
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob: any) => {
        // 上传缩列图
        uploadThumbnail(blob, file);
      }, 'image/png');
    });
  };

  //  上传缩列图
  const uploadThumbnail = async (blob, file) => {
    const res: any = await platformApi.platformOssQueryOssTempPolicy({
      directory: 'fileCenter',
      filename: file.fileName,
    });
    if (res.key) {
      const formData = new FormData();
      const instance = axios.create({
        baseURL: res.host,
      });
      formData.append('key', res.key);
      formData.append('ossAccessKeyId', res.ossAccessKeyId);
      formData.append('policy', res.policy);
      formData.append('signature', res.signature);
      formData.append('provider', res.provider);
      formData.append('bucket', res.bucket);
      formData.append('success_action_status', res.success_action_status);
      formData.append('file', blob, file.fileName);
      // 使用这个实例来发起请求
      instance
        .post('/', formData)
        .then(async () => {
          await fccApi.luteosFccCenterSaveThumbnailUrl({
            fileCode: file.fileCode,
            thumbnailKey: res.key,
          });
          refreshList();
        })
        .catch(() => {});
    }
  };

  // 复制路径
  const handleCopy = async (row) => {
    const fileCode = row.fileType === 1 ? row.fileCode : row.parentCode;
    const fileCodeList = await findItemAndAncestors(fileCode);
    const path = router.resolve({
      name: 'materialcenteruserend',
      query: { row: encryptByBase64(JSON.stringify(fileCodeList)) },
    });
    const newPath = `${window.location.origin}${path.href}`;
    copyFn(newPath, '路径');
  };

  // 查看来源
  const handleViewSource = (item) => {
    if (item.fileSource) {
      window.open(item.fileSource);
    }
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

  const treeSelectData = ref();
  const queryCategoryLabelList = async () => {
    const res = await fccApi.luteosFccTagQueryCategoryLabelList({
      pageNum: 1,
      pageSize: 100,
      labelType: sceneInfo.labelType,
    });
    const data = res.children;
    deepTree(res.children);
    treeSelectData.value = data;
  };
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.name;
      item.value = item.code;
      item.disabled = +item.type === 1;
    });
  };
  const hotKeyWords = ref([]);
  const queryKeyWordTop = async () => {
    const res = await fccApi.luteosFccCenterClientQueryKeyWordTop();
    hotKeyWords.value = res.keyWordList || [];
  };

  const getKeyWordBg = (index) => {
    const style = {
      background: '',
    };
    if (index === 0) {
      style.background = '#FF0000';
    } else if (index === 1) {
      style.background = '#FF6666';
    } else if (index === 2) {
      style.background = '#FFA500';
    }
    return style;
  };

  const handleKeywordClick = (word) => {
    search.keyword = word;
    keyword.value = word;
  };

  onActivated(() => {
    queryLabel();
    queryKeyWordTop();
  });
</script>

<style scoped lang="scss">
  .user-container {
    display: flex;
    min-height: 80vh;
  }
  .user-left {
    background: #fff;
    width: 15%;
    min-width: 250px;
    margin-right: 20px;
    border-radius: 8px;
    .tree-menu {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 20px;
    }
  }
  .user-right {
    overflow-y: auto;
    flex-grow: 1;
    padding-left: 1%;
    background: #fff;
  }

  .breadcrumb {
    margin-left: 1%;
    margin-top: 20px;
    padding-right: 8px;
    padding-left: 8px;
    :deep(.el-breadcrumb__inner) {
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
  }

  .card-content {
    position: relative;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
  }

  .col-md-3 {
    width: 18% !important;
    border: 1px solid #eff2f7;
    border-radius: 8px;
    overflow: hidden;
    padding-bottom: 15px;
    margin-right: 20px;
    margin-bottom: 20px;
    min-width: 200px;
    height: 283px;
  }

  .report-card {
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.3s ease;
    font-size: 16px !important;
    position: relative;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    }
  }

  .card-img {
    position: relative;
    width: 100%;
    height: 200px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-top: -2px;
    overflow: hidden;
    img {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-stop {
      position: absolute;
      transform: translate(-50%, -50%) !important;
      left: 50% !important;
      top: 50% !important;
      :deep(.svg-icon svg) {
        width: 88px !important;
        height: 68px !important;
      }
    }
  }

  .card-title-wrap {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
  }

  .card-title-content {
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px !important;
    white-space: nowrap;
  }

  .content-title {
    line-height: 20px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
  }

  .more-icon {
    justify-content: center;
    margin-top: 4px;
    margin-right: 16px;
    cursor: pointer;
  }

  .card-tag {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 16px;
    margin-top: 3px;
  }
  .tag-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 155px;
    display: inline-block;
    line-height: 24px;
    margin-right: 5px;
  }
  .tag-margin {
    margin-right: 5px;
  }
  .popover-tag {
    padding: 10px;
  }

  .label-select {
    min-width: 200px !important;
    :deep(.el-tag--info) {
      max-width: 100px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .empty-wrap {
    width: 100%;
    height: 607px;
    text-align: center;
    line-height: 607px;
  }
  .keyword-search {
    width: 225px;
  }
  .search-hot {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: 8px;
  }
  .hot-word {
    margin-right: 6px;
    :deep(svg) {
      width: 18px !important;
      height: 18px !important;
      margin-top: -4px;
    }
  }
  .search-height {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .search-num {
    width: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 4px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    // background: #FF0000;
    background: #808080;
    margin-right: 10px;
  }
  .search-word {
    font-size: 13px;
  }
  .custom-tree-node {
    background: #fff;
  }
</style>
