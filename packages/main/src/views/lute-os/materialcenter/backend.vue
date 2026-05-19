<template>
  <KeenList class="scroller-warp">
    <template #search>
      <!-- 需要支持输入空格，直接绑定search.keyword输入不了空格，目前还没定位到问题，使用这个作为替代方案 -->
      <el-input
        v-model="keyword"
        :placeholder="isMyMaterial ? '文件名称' : '文件名称/文件夹名称'"
        @input="(val) => (search.keyword = val)"
        clearable
      >
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
      <el-tree-select
        clearable
        node-key="fileCode"
        v-model="filePathCode"
        :data="folderList"
        :render-after-expand="true"
        check-strictly
        :props="{
          label: 'fileName',
          value: 'fileCode',
          children: 'children',
        }"
        placeholder="文件路径"
        style="width: 160px"
        @change="
          (val) => {
            search.filePathCode = val === '0' ? '' : val;
          }
        "
      />
      <template v-if="isShowTreeLabel">
        <el-tree-select
          clearable
          filterable
          multiple
          collapse-tags
          node-key="labelCode"
          v-model="fileTagList"
          :data="labelTreeData"
          :props="{
            label: 'name',
            value: 'labelCode',
            children: 'childInfoList',
          }"
          :render-after-expand="true"
          check-strictly
          placeholder="文件所属标签"
          style="width: 190px"
        />
      </template>
      <template v-else>
        <template v-if="fileTagNameList.length <= 3">
          <el-select
            v-model="fileTagList"
            clearable
            filterable
            multiple
            placeholder="文件所属标签"
            class="label-select"
            collapse-tags
            :max-collapse-tags="3"
            :style="{
              width: fileTagList.length
                ? fileTagList.length > 3
                  ? '400px'
                  : fileTagList.length * 130 + 'px'
                : '160px',
            }"
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
            v-model="fileTagList"
            clearable
            filterable
            multiple
            placeholder="文件所属标签"
            class="label-select"
            collapse-tags
            :max-collapse-tags="3"
            :style="{
              width: fileTagList.length
                ? fileTagList.length > 3
                  ? '400px'
                  : fileTagList.length * 130 + 'px'
                : '160px',
            }"
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
      <el-tree-select
        :v-loading="loading"
        clearable
        node-key="deptId"
        multiple
        show-checkbox
        v-model="deptIdList"
        :data="treeData"
        :render-after-expand="false"
        placeholder="文件可见范围"
        collapse-tags
      />
      <el-select v-model="search.auth" clearable filterable placeholder="文件权限">
        <el-option
          v-for="item in dictMap.fileauth"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="addExplorer" v-if="!isMyMaterial">
        新建文件夹
      </el-button>
      <el-button class="button" @click="uploadFile" type="primary" plain v-if="!isHideUpload">
        上传文件
      </el-button>
    </template>
    <div class="d-flex justify-content-between" style="height: 44px">
      <el-space class="badge badge-lg badge-light-primary h-30px">
        <SvgIcon icon="abstract-abs033" class="svg-icon svg-icon-4 svg-icon-primary" />
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item
            v-for="(foler, index) in breadcrumbList"
            :key="index"
            @click="handleBreadcrumbClick(foler.fileCode)"
          >
            {{ foler.fileName }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-space>
      <el-space v-if="totalList?.length > 0" class="d-flex align-items-center">
        <div class="text-gray-600">
          已选择
          <span class="text-primary fw-bold">{{ totalList?.length }}</span>
          个文件/文件夹
        </div>
        <el-button type="danger" @click="batchDel" size="small">删除</el-button>
      </el-space>
    </div>
    <div class="draggable">
      <el-table
        :data="listData?.fileCenterBeanList"
        v-loading="listLoading"
        row-key="fileCode"
        ref="tableRef"
        @selection-change="handleSelectionChange"
        :tree-props="{ children: 'items' }"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column label="名称" min-width="330px">
          <template #default="{ row }">
            <div class="d-flex align-items-center gap-2">
              <img
                :src="row.url"
                class="show-img"
                v-if="['jpg', 'jpeg', 'png', 'svg'].includes(row.extType) && row.url"
              />
              <SvgIcon
                :icon="getSvgIcon(row)"
                class="svg-icon svg-icon-1 svg-icon-primary"
                v-else
              />
              <el-space v-if="row.isEdit || row.isAdd">
                <el-input v-model="row.fileName" maxlength="50" style="width: 200px" />
                <!-- 确认编辑 -->
                <div
                  class="action-button btn btn-sm btn-icon btn-light-primary btn-active-primary"
                  @click="confirmRename(row)"
                >
                  <SvgIcon icon="arrows-arr085" class="svg-icon svg-icon-1" />
                </div>
                <!-- 取消编辑 -->
                <div
                  class="action-button btn btn-sm btn-icon btn-light-danger btn-active-danger"
                  @click="cancel(row)"
                >
                  <SvgIcon icon="arrows-arr088" class="svg-icon svg-icon-1" />
                </div>
              </el-space>
              <!-- 文件夹名称 -->
              <span
                v-else-if="row.fileType === 1"
                class="text-gray-800 text-hover-primary cursor-pointer file-name"
                @click="next(row)"
              >
                {{ row.fileName }}
              </span>
              <!-- 文件名称 -->
              <ElTooltip
                v-else-if="row.fileType === 2"
                popper-class="action_tool_tip"
                placement="top"
                effect="light"
                content="预览"
              >
                <span
                  class="text-gray-800 text-hover-primary cursor-pointer file-name"
                  @click="previewFile(row)"
                >
                  {{ row.fileName }}.{{ row.extType }}
                </span>
              </ElTooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文件路径" prop="filePath" align="center" min-width="150px" />
        <el-table-column label="文件数量" prop="fileNumber" align="center">
          <template #default="scope">
            {{ scope.row.fileNumber || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="文件格式" prop="extType" align="center" />
        <el-table-column label="文件大小" prop="fileSize" align="center">
          <template #default="scope">
            <div>{{ getFileSizeDesc(scope.row.fileSize) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传信息" prop="uploaderName" min-width="190px">
          <template #default="scope">
            <template v-if="scope.row.fileType === 2">
              <div>上传人：{{ scope.row.uploaderName }}</div>
              <div>上传时间：{{ scope.row.uploadTime }}</div>
            </template>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="authBeanList" min-width="150px">
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
        </el-table-column>
        <el-table-column label="可见范围" prop="scopeList" min-width="100px">
          <template #default="scope">
            <el-tooltip
              popper-class="action_tool_tip text-gray-600"
              placement="top-start"
              effect="light"
              :content="scope.row.scopeList?.map((item) => item.deptName).join('、')"
            >
              <div class="ellipsis">
                {{ scope.row.scopeList?.map((item) => item.deptName).join('、') }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="文件权限" prop="auth">
          <template #default="scope">
            {{ getAuthDesc(scope.row.auth) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120px" fixed="right">
          <template #default="scope">
            <div class="d-flex gap-5" v-if="!scope.row.isAdd">
              <ElTooltip
                popper-class="action_tool_tip"
                placement="top"
                effect="light"
                content="移动"
              >
                <div
                  class="action-button btn btn-sm btn-icon btn-light btn-active-light-primary drag-icon"
                >
                  <SvgIcon icon="drag" class="svg-icon svg-icon-4" />
                </div>
              </ElTooltip>

              <ElTooltip
                popper-class="action_tool_tip"
                placement="top"
                effect="light"
                content="下载"
              >
                <div
                  class="action-button btn btn-sm btn-icon btn-light btn-active-light-primary"
                  @click="downloadFile(scope.row)"
                >
                  <SvgIcon icon="download" class="svg-icon svg-icon-4" />
                </div>
              </ElTooltip>
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
                  <div class="action-button btn btn-sm btn-icon btn-light btn-active-light-primary">
                    <SvgIcon icon="dot" class="svg-icon svg-icon-2" />
                  </div>
                </template>
                <div
                  class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 py-4 d-block"
                  data-kt-menu="true"
                >
                  <div class="menu-item px-3">
                    <a class="menu-link px-3" @click="rename(scope.row)">重命名</a>
                    <a class="menu-link px-3" @click="moveFile(scope.row)">移动文件</a>
                    <a class="menu-link px-3" @click="updateDeptOrAuth(scope.row, 1)">
                      修改可见范围
                    </a>
                    <a class="menu-link px-3" @click="updateDeptOrAuth(scope.row, 2)">
                      修改文件权限
                    </a>
                    <a
                      class="menu-link px-3"
                      @click="updateDeptOrAuth(scope.row, 3)"
                      v-if="isShowTreeLabel && scope.row.fileType === 2"
                    >
                      编辑标签
                    </a>
                    <a class="menu-link px-3" @click="updateDeptOrAuth(scope.row, 4)">
                      编辑素材来源
                    </a>
                    <a class="menu-link px-3 text-danger" @click="del(scope.row.fileCode)">删除</a>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />

    <FilesPreview
      v-if="previewVisible"
      :fileUrl="fileUrl"
      :fileName="fileName"
      :extType="extType"
      @close="previewVisible = false"
    />
    <UploadFileModal
      v-if="uploadVisible"
      :visible="uploadVisible"
      :operateType="operateType"
      :fileCode="currentFileCode"
      :sceneInfo="currentSceneInfo"
      :auth="auth"
      :labelList="labelList"
      :labelCodeList="labelCodeList"
      :fileSource="fileSource"
      :labelTreeData="labelTreeData"
      :isShowTreeLabel="isShowTreeLabel"
      @close="handleUploadClose"
      @save="handleUploadSave"
    />
    <MoveFileModal
      v-if="moveVisible"
      :visible="moveVisible"
      :fileCode="moveFileInfo.fileCode"
      :sceneInfo="currentSceneInfo"
      @close="
        () => {
          moveVisible = false;
        }
      "
      @save="handleMoveSave"
    />
  </KeenList>
</template>

<script setup lang="ts" name="managerOffice">
    import { ElMessage } from 'element-plus';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { fccApi, FccApi, platformApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { ArrowRight } from '@element-plus/icons-vue';
  import Sortable from 'sortablejs';
  import { download } from '@/utils/download';
  import axios from 'axios';
  import MoveFileModal from './Modal/MoveFileModal.vue';
  import UploadFileModal from './Modal/UploadFileModal.vue';
  import { sceneList } from './config/index.ts';

  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const route = useRoute();
  const router = useRouter();
  const { query } = route;
  const keyword = ref('');

  const sceneInfo =
    sceneList.find((item) => {
      return route.name === item.componentName;
    }) || {};

  const currentSceneInfo = ref({ ...sceneInfo });
  const isHideUpload = ref(sceneInfo.scene === 3); // 素材中心用户端隐藏
  const isMyMaterial = ref(sceneInfo.scene === 5); // 是否是我的素材
  const isShowTreeLabel = ref([3, 5].includes(sceneInfo.scene));

  const breadcrumbList = ref([
    {
      fileName: sceneInfo.title,
      fileCode: '',
      fileType: 1,
    },
  ]);

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
    runQuery,
    resetSearch,
  } = useList<
    FccApi.LuteosFccCenterQueryFccList.RequestQuery,
    FccApi.LuteosFccCenterQueryFccList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      fileCode: undefined,
      deptIdList: undefined,
      extTypeList: undefined,
      fileTagList: undefined,
      auth: undefined,
      filePathCode: undefined,
      scene: sceneInfo.scene,
    },
    pageSize: PAGE_SIZE,
    service: fccApi.luteosFccCenterQueryFccList,
  });

  const labelList = ref([]);
  const queryLabel = () => {
    fccApi
      .luteosFccTagQueryFccLabelList({
        pageNum: 1,
        pageSize: 100,
        labelType: sceneInfo.labelType,
      })
      .then((res) => {
        labelList.value = res.fccLabelList;
      });
  };

  const fileTagNameList = computed(() => {
    const list: any = [];
    fileTagList.value.forEach((item) => {
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
      dictCodes: ['fccformat', 'fileauth'],
    });
    dictMap.value = res.dictMap;
  };
  queryDictMap();

  const treeData = ref();
  const querySubDeptList = async () => {
    const res = await fccApi.luteosFccCenterQueryDeptInfoList({ fileCode: '' });
    const data = res.deptList;
    deepTree(res.deptList);
    treeData.value = data;
  };
  const deepTree = (data) => {
    data.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deepTree(item.children);
      }
      item.label = item.deptName;
      item.value = item.deptId;

      if (item.check) {
        form.value.ownerList.push(item.deptId);
      }
    });
  };

  const labelTreeData = ref();
  const queryLabelTreeData = async () => {
    const res = await fccApi.luteosFccTagQueryFccLabelLevelList({
      labelType: 'fc_material',
    });
    labelTreeData.value = res.fccLabelLevelList || [];
  };
  const getAuthDesc = (auth) => {
    const authDesc = {
      1: '可查看、下载',
      2: '可查看',
    };

    return authDesc[auth] || '';
  };
  const extTypeList = ref([]);
  const fileTagList = ref([]);
  const deptIdList = ref([]);
  const filePathCode = ref('');

  const reset = () => {
    resetSearch();
    extTypeList.value = [];
    fileTagList.value = [];
    deptIdList.value = [];
    keyword.value = '';
    filePathCode.value = '';
  };
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

  watch(deptIdList, () => {
    search.deptIdList = deptIdList.value.join(',');
  });

  watch(fileTagList, () => {
    search.fileTagList = fileTagList.value.join(',');
  });

  // 行拖拽
  const rowDrop = () => {
    // 要拖拽元素的父容器
    const tbody = document.querySelector('.draggable .el-table__body-wrapper tbody');
    Sortable.create(tbody, {
      //  可被拖拽的子元素
      draggable: '.draggable .el-table__row',
      handle: '.drag-icon',
      async onEnd({ newIndex, oldIndex }) {
        const list: any = listData.value?.fileCenterBeanList;
        const { fileCode } = list[oldIndex];
        const originalSort = list[oldIndex].sort;
        const newSort = list[newIndex].sort;
        const currRow = list.splice(oldIndex, 1)[0];
        listData.value?.fileCenterBeanList?.splice(newIndex, 0, currRow);
        // 更新排序
        await fccApi.luteosFccCenterSortFile({
          originalSort,
          newSort,
          fileCode,
        });
        const res = await fccApi.luteosFccCenterQueryFccList({
          ...search,
          pageNum: current.value,
          pageSize: pageSize.value,
        });
        listData.value = res;
      },
    });
  };

  onMounted(() => {
    rowDrop();
  });

  if (query?.row) {
    breadcrumbList.value = JSON.parse(decryptByBase64(query.row as string));
    search.fileCode = breadcrumbList.value[breadcrumbList.value.length - 1].fileCode;
  }

  // 当前文件夹信息
  const currentFolder = computed(() => {
    return breadcrumbList.value[breadcrumbList.value.length - 1];
  });
  // 新增
  const addExplorer = () => {
    listData.value?.fileCenterBeanList?.unshift({ fileType: 1, fileName: '', isAdd: true });
  };

  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  const oldName = ref<string>('');
  const rename = (row: any) => {
    oldName.value = row.fileName;
    row.isEdit = true;
  };
  // 确认编辑
  const confirmRename = (row: any) => {
    row.fileName = row.fileName.trim();
    if (row.fileName === '') {
      ElMessage.warning({
        message: '文件夹名称不能为空',
        duration: 3 * 1000,
      });
      return;
    }
    if (oldName.value === row.fileName) {
      row.isEdit = false;
      return;
    }
    const fileNames: any = listData.value?.fileCenterBeanList?.map((item) => {
      if (item.fileType === 1) {
        return item.fileName;
      }
      // 其余生成不重复的随机数
      return new Date().getTime() + Math.random().toString(10).substring(2);
    });
    const stringSet: any = new Set(fileNames);

    //  校验重复
    if (fileNames.length !== stringSet.size) {
      ElMessage.warning({
        message: '文件/文件夹名称不可重复',
        duration: 3 * 1000,
      });
      return;
    }
    saveOrUpdate({
      ...row,
    });
  };
  // 保存接口
  const saveOrUpdate = (data) => {
    return fccApi
      .luteosFccCenterSaveOrUpdate({
        scene: sceneInfo.scene,
        parentCode: currentFolder.value.fileCode,
        ...data,
      })
      .then(() => {
        refreshList();
      });
  };
  // 取消操作
  const cancel = (row) => {
    if (row.isAdd) {
      listData.value?.fileCenterBeanList?.shift();
    } else {
      row.fileName = oldName.value;
    }
    row.isEdit = false;
  };
  // 单个删除
  const del = async (fileCode) => {
    const isConfirmed = await swal.confirm('请确认是否要删除该文件夹/文件');
    if (!isConfirmed) return;

    fccApi
      .luteosFccCenterDeleteFiles({
        fileCodeList: [fileCode],
      })
      .then(() => {
        refreshList();
      });
    delFolderOrFile([fileCode]);
  };
  // 批量删除
  const batchDel = async () => {
    const isConfirmed = await swal.confirm('请确认是否要删除选中的文件夹/文件');
    if (!isConfirmed) return;

    const fileCodeList = totalList.value.map((item: any) => item.fileCode);
    delFolderOrFile(fileCodeList);
  };
  // 删除接口
  const delFolderOrFile = (fileCodeList) => {
    fccApi
      .luteosFccCenterDeleteFiles({
        fileCodeList,
      })
      .then(() => {
        refreshList();
      });
  };

  // 文件夹面包屑点击
  const handleBreadcrumbClick = (fileCode) => {
    search.fileCode = fileCode;
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
    search.fileCode = row.fileCode;
    const data = breadcrumbList.value.find((item) => item.fileCode === row.fileCode);
    if (!data?.fileCode) {
      if (search.fileName) {
        search.fileName = '';
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

  if (query?.folder) {
    next(JSON.parse(decryptByBase64(query.folder)));
  }

  // 是否视频类型
  const isVideo = (extType) => {
    return ['mp4', 'mpeg', 'avi', 'asf', 'mov', 'wmv', '3gp', 'rm', 'rmvb', 'flv', 'f4v'].includes(
      extType
    );
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

    // 视频如果没有缩列图需要下载视频并获取第一帧保存到后台
    if (isVideo(extType) && !row.thumbnailUrl) {
      getVideoFirstFrame({
        url: fileUrl.value,
        fileName: fileName.value,
        fileCode: row.fileCode,
      });
    }

    previewVisible.value = true;
  };
  // 获取图标
  const getSvgIcon = (row) => {
    let { extType } = row;
    if (row.fileType === 1) {
      extType = 'folder';
    }
    const svgIconMap = {
      folder: 'folder',
      pic: 'pic',
      pdf: 'pdf',
      word: 'word',
      excel: 'excel',
      txt: 'txt',
      ppt: 'ppt',
      video: 'video',
      default: 'defaultFile',
    };
    if (['jpg', 'jpeg', 'png', 'svg'].includes(extType)) {
      return svgIconMap.pic;
    }
    if (extType === 'pdf') {
      return svgIconMap.pdf;
    }
    if (['xls', 'xlsx'].includes(extType)) {
      return svgIconMap.excel;
    }
    if (['doc', 'docx'].includes(extType)) {
      return svgIconMap.word;
    }
    if (['ppt', 'pptx'].includes(extType)) {
      return svgIconMap.ppt;
    }
    if (['txt'].includes(extType)) {
      return svgIconMap.txt;
    }
    if (['folder'].includes(extType)) {
      return svgIconMap.folder;
    }
    if (isVideo(extType)) {
      return svgIconMap.video;
    }

    return svgIconMap.default;
  };

  // 文件移动
  const moveFileInfo = ref({});
  const moveVisible = ref<boolean>(false);
  const moveFile = (fileInfo) => {
    moveFileInfo.value = fileInfo;
    nextTick(() => {
      moveVisible.value = true;
    });
  };
  const handleMoveSave = async (row) => {
    await saveOrUpdate({
      fileCode: moveFileInfo.value.fileCode,
      fileName: moveFileInfo.value.fileName,
      parentCode: row.fileCode,
    });
    moveVisible.value = false;
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

  // 文件上传/修改文件权限/修改可见范围
  const uploadVisible = ref<boolean>(false);
  const operateType = ref(0); // 默认0-文件上传，1-修改可见范围， 2-修改文件权限，3-编辑标签
  const currentFileCode = ref('');
  const auth = ref(''); // 权限
  const labelCodeList = ref([]); // 标签code列表
  const fileSource = ref(''); // 素材来源
  const uploadFile = () => {
    uploadVisible.value = true;
    operateType.value = 0;
  };
  const handleUploadSave = async (req: any) => {
    if (operateType.value === 0) {
      await saveOrUpdate(req);
    } else if ([1, 2, 3, 4, 5].includes(operateType.value)) {
      await fccApi.luteosFccCenterOperateFile(req);
      refreshList();
      handleUploadClose();
    }
    uploadVisible.value = false;
  };
  const handleUploadClose = () => {
    uploadVisible.value = false;
    currentFileCode.value = '';
    auth.value = '';
    operateType.value = 0;
    labelCodeList.value = [];
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
  const updateDeptOrAuth = (row, type) => {
    currentFileCode.value = row.fileCode;
    operateType.value = type;
    auth.value = row.auth;
    labelCodeList.value = [];
    fileSource.value = row.fileSource;
    if (row.tagList && row.tagList.length) {
      row.tagList.forEach((item) => {
        if (!disabledLabelCodeList.value.includes(item.labelCode)) {
          labelCodeList.value.push(item.labelCode);
        }
      });
    }
    uploadVisible.value = true;
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

  const tableRef = ref('');
  watch(listLoading, (val) => {
    // 查询结束清空用户选择
    if (!val) {
      tableRef.value.clearSelection();
    }
  });
  const removeFileType2 = (arr) => {
    // 过滤掉fileType等于2的项
    arr = arr.filter((item) => item.fileType !== 2);

    // 递归处理children数组
    arr.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        item.children = removeFileType2(item.children);
      }
    });

    return arr;
  };
  const folderList = ref([]);
  const queryAllFolder = () => {
    fccApi.luteosFccCenterFindAllFolder({ fileCode: '', scene: +sceneInfo.scene }).then((res) => {
      const list = removeFileType2(res.fccFolderDetails || []);
      const data: any = {
        fileName: sceneInfo.title,
        fileCode: '0',
        fileType: 1,
        children: list,
      };
      folderList.value = [data];
    });
  };

  onActivated(() => {
    queryLabel();
    querySubDeptList();
    queryAllFolder();
    queryLabelTreeData();
  });
</script>

<style scoped lang="scss">
  .action-button {
    cursor: pointer;
  }

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

  .search-result {
    width: 500px;
    height: 40px !important;
  }

  .text-hover-primary {
    cursor: pointer;
  }

  .scroller-warp {
    overflow-y: auto;
  }
  .tag-margin {
    margin-right: 5px;
    margin-top: 5px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
  }
  .label-select {
    min-width: 160px !important;
    :deep(.el-tag--info) {
      max-width: 100px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .show-img {
    width: 23px;
    height: 23px;
    border-radius: 4px;
  }
  .file-name {
    width: 360px;
  }
</style>
