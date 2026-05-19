<template>
  <KeenList class="user-container">
    <template #search>
        <el-input
        v-if="!hotKeyWords.length"
        v-model="keyword"
        :placeholder="`在素材中心搜索`"
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
        <el-input
            v-model="keyword"
            :placeholder="`在素材中心搜索`"
            clearable
        >
            <template #prefix>
            <SvgIconSearch />
            </template>
        </el-input>
        </ElTooltip>
        <el-select
        v-model="extTypeList"
        clearable
        filterable
        multiple
        placeholder="文件格式"
        class="label-select"
        collapse-tags
        @change="
            (val) => {
            search.extTypeList = val.join(',');
            querySimpleLabelFileList();
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
        filterable
        multiple
        collapse-tags
        node-key="labelCode"
        v-model="labelCodeList"
        :data="labelTreeData"
        :props="{
            label: 'name',
            value: 'labelCode',
            children: 'childInfoList',
        }"
        :render-after-expand="true"
        check-strictly
        placeholder="文件标签"
        style="width: 200px; margin-left: 10px"
        @change="
            (val) => {
            search.labelCodeList = val.join(',');
            querySimpleLabelFileList();
            }
        "
        />
    </template>
    <template #buttons>
        <el-button class="button" type="primary" @click="querySimpleLabelFileList">
        查询
        </el-button>
        <el-button class="button" type="primary" @click="reset">重置</el-button>
    </template>
   <div style="height: 30px; width: 110%; background: rgb(249, 249, 249); margin-left: -32px;"></div>
    <div class="card-content">
    <section class="card-container-wrap" v-if="!isHideData">
        <h2 class="one-label">一级标签</h2>
        <div class="card-container" ref="labelRef">
        <el-carousel
            arrow="never"
            :autoplay="false"
            hover-stop
            style="width: 100%"
            ref="oneLabelRef"
            @change="handleOneLabelChange"
        >
            <el-carousel-item
            style="display: flex"
            v-for="(slider, sliderIndex) in sliderList.length"
            :key="sliderIndex"
            >
            <div
                class="card"
                v-for="(item, index) in getSliderList(slider)"
                :key="index"
                @click="handleJumpDetail(item)"
            >
                <div class="card-item">
                <div class="card-images">
                    <template v-for="(img, imgIndex) in item.fileList" :key="imgIndex">
                    <template v-if="img.thumbnailUrl">
                        <div class="img-relative">
                        <img
                            :src="img.thumbnailUrl"
                            class="images"
                        
                            v-if="imgIndex < 6"
                        />
                        <div
                            class="img-mask"
                        >
                            <SvgIcon
                            icon="whiteDownload"
                            class="download-icon"
                            @click.stop="download(img.thumbnailUrl, img.fileName)"
                            />
                            <SvgIcon
                            icon="viewFile"
                            class="view-icon"
                            @click.stop="previewFile(img)"
                            />
                        </div>
                        </div>
                    </template>
                    <div class="img-placeholder" v-else>
                        <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172737-adf6f31c-c41e-4310-a4a8-9cfe469d1636.png"
                        alt=""
                        />
                    </div>
                    </template>
                    <template v-for="placeholder in 6" :key="placeholder">
                    <div
                        class="img-placeholder"
                        v-if="placeholder > item.fileList.length && placeholder < 7"
                    >
                        <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172737-adf6f31c-c41e-4310-a4a8-9cfe469d1636.png"
                        alt=""
                        />
                    </div>
                    </template>
                </div>
                <div class="card-info">
                    <div class="info-title-wrap">
                    <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172813-16c18367-9902-490c-8c40-2045ab3d83b6.png"
                        class="folder-images"
                    />
                    <span class="info-title">
                        <OverflowTooltip :content="item.topLabelName" :line="1" />
                    </span>
                    </div>
                    <div>
                    <span class="info-txt">数量</span>
                    <span class="info-txt info-num">{{ item.num }}</span>
                    </div>
                </div>
                </div>
            </div>
            </el-carousel-item>
        </el-carousel>
        </div>
        <div
        :class="['arrow-left', 'arrow-icon']"
        @click="oneLabelRef.prev()"
        v-show="oneLabelSliderIndex !== 0"
        >
        <div class="arrow-img"></div>
        </div>
        <div
        :class="['arrow-right', 'arrow-icon']"
        @click="oneLabelRef.next()"
        v-show="oneLabelSliderIndex !== sliderList.length - 1"
        >
        <div class="arrow-img"></div>
        </div>
    </section>

    <section class="card-container-wrap" v-if="!isHideData">
        <h2 class="one-label">近期更新</h2>
        <div class="card-container">
        <el-carousel
            arrow="never"
            :autoplay="false"
            hover-stop
            style="width: 100%"
            ref="twoLabelRef"
            @change="handleTwoLabelChange"
        >
            <el-carousel-item
            style="display: flex"
            v-for="slider in sliderList2.length"
            :key="slider"
            >
            <div
                class="card latest-card"
                v-for="(item, index) in getSliderList2(slider)"
                :key="index"
                @click="handleJumpDetail(item)"
            >
                <div class="latest-card-item">
                <div class="card-images">
                    <template v-for="(img, imgIndex) in item.fileList" :key="imgIndex">
                    <template v-if="img.thumbnailUrl">
                        <div class="img-relative">
                        <img
                            :src="img.thumbnailUrl"
                            class="images"
                        
                            v-if="imgIndex < 6"
                        />
                        <div
                            class="img-mask"
                        >
                            <SvgIcon
                            icon="whiteDownload"
                            class="download-icon"
                            @click.stop="download(img.thumbnailUrl, img.fileName)"
                            />
                            <SvgIcon
                            icon="viewFile"
                            class="view-icon"
                            @click.stop="previewFile(img)"
                            />
                        </div>
                        </div>
                    </template>
                    <div class="img-placeholder" v-else>
                        <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172737-adf6f31c-c41e-4310-a4a8-9cfe469d1636.png"
                        alt=""
                        />
                    </div>
                    </template>
                    <template v-for="placeholder in 6" :key="placeholder">
                    <div
                        class="img-placeholder"
                        v-if="placeholder > item.fileList.length && placeholder < 7"
                    >
                        <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172737-adf6f31c-c41e-4310-a4a8-9cfe469d1636.png"
                        alt=""
                        />
                    </div>
                    </template>
                </div>
                <div class="card-info">
                    <div class="info-title-wrap">
                    <img
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826172813-16c18367-9902-490c-8c40-2045ab3d83b6.png"
                        class="folder-images"
                    />
                    <span class="info-title">
                        <OverflowTooltip :content="`${item.topLabelName}/${item.labelName}`" :line="1" />
                    </span>
                    </div>
                    <div>
                    <span class="info-txt">数量</span>
                    <span class="info-txt info-num">{{ item.num }}</span>
                    </div>
                </div>
                <div class="user-info">
                    <div>
                    <img :src="item.avatar" class="user-images" />
                    <span class="user-name">{{ item.memberName }}</span>
                    </div>
                    <div>
                    <span class="info-time">{{ item.createTime }}</span>
                    </div>
                </div>
                </div>
            </div>
            </el-carousel-item>
        </el-carousel>
        </div>
        <div
        :class="['arrow-left', 'arrow-icon']"
        @click="twoLabelRef.prev()"
        v-show="twoLabelSliderIndex !== 0"
        >
        <div class="arrow-img"></div>
        </div>
        <div
        :class="['arrow-right', 'arrow-icon']"
        @click="twoLabelRef.next()"
        v-show="twoLabelSliderIndex !== sliderList2.length - 1"
        >
        <div class="arrow-img"></div>
        </div>
    </section>
    <template v-if="!loading">
        <div v-for="(item, index) in simpleLabelFileList" :key="index">
        <section class="card-container-wrap" v-if="item.childLabelFileList.length">
            <div
            :class="['header-wrap', isHideData ? 'mt-0' : '']"
            >
            <h2 class="one-label">{{ item.topLabelName }}</h2>
            <span class="view-all" @click="handleViewAll(item)">
                查看全部
                <img
                src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240826223328-956fc161-9f06-4b63-8d90-5887a882d97e.png"
                />
            </span>
            </div>
            <el-tabs v-model="secondLabel[index]">
            <el-tab-pane
                :label="subItem.labelName"
                :name="`${index}_${subIndex}`"
                v-for="(subItem, subIndex) in item.childLabelFileList"
                :key="subIndex"
            >
                <div class="red-card-container-wrap" v-if="subItem.fileList.length">
                <template v-for="(file, fileIndex) in subItem.fileList" :key="fileIndex">
                    <div class="red-card-container" v-if="fileIndex < redPageSize">
                    <div class="red-card" @click="previewFile(file)">
                        <img :src="file.thumbnailUrl" v-if="file.thumbnailUrl" />
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
                        <img
                        v-else
                        class="card-placeholder placeholder-img"
                        src="https://coss-platform.fenqile.com/platformresource200/M00/ex/20240830144217-10cfff65-4e52-492e-a041-3ba50968650c.png"
                        />
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
                            <div class="menu-item px-3" v-if="+file.auth === 1">
                                <a class="menu-link px-3" @click="downloadFile(file)">下载</a>
                            </div>
                                <div class="menu-item px-3">
                                <a class="menu-link px-3" @click="handleCopy(item, subItem)">分享</a>
                            </div>
                            </div>
                        </el-popover>
                        </div>
                    </div>
                    </div>
                </template>
                </div>
                <el-empty v-else description="暂无数据" style="margin-bottom: 6.5px;"/>
            </el-tab-pane>
            </el-tabs>
        </section>
        </div>
        <el-empty v-if="isNoData" description="暂无数据" />
    </template>
    </div>
    </KeenList>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    :extType="extType"
    @close="previewVisible = false"
  />
</template>

<script setup lang="ts" name="materialcenterCustomerIndex">
    import { fccApi, FccApi, platformApi } from '@/api';
  import { download } from '@/utils/download';
  import { openWindow } from '@/utils';
  import { copyFn } from '@/utils/copyFn';

  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const secondLabel = ref([]);
  const labelMap = ref({});

  const route = useRoute();
  const keyword = ref('');
  const oneLabelRef = ref();
  const oneLabelSliderIndex = ref(0);
  const twoLabelRef = ref();
  const twoLabelSliderIndex = ref(0);
  const handleOneLabelChange = (index) => {
    oneLabelSliderIndex.value = index;
  };

  const handleTwoLabelChange = (index) => {
    twoLabelSliderIndex.value = index;
  };

  const search = ref({
    extTypeList: undefined,
    labelCodeList: undefined,
  });

  watch(
    () => keyword.value,
    () => {
      querySimpleLabelFileList();
    }
  );

  const labelRef = ref();
  const labelWidth = ref();
  const getDivWidth = () => {
    if (labelRef.value) {
      labelWidth.value = labelRef.value.offsetWidth;
    }
  };
  const topLabelFileList = ref([]);

  const sliderPageSize = computed(() => {
    return parseInt(labelWidth.value / 288 + 1);
  });
  // 红人素材的取整
  const redPageSize = computed(() => {
    return parseInt(labelWidth.value / 288);
  });

  const sliderList = computed(() => {
    return calcSliderList(topLabelFileList.value);
  });
  const sliderList2 = computed(() => {
    return calcSliderList(recentLabelFileList.value);
  });
  const calcSliderList = (list) => {
    const len = list.length;
    const groups = [];
    groups.push(list.slice(0, sliderPageSize.value));
    for (let i = sliderPageSize.value; i <= len; i += sliderPageSize.value - 2) {
      const group = list.slice(i - 2, i - 2 + sliderPageSize.value);
      groups.push(group);
    }
    return groups;
  };

  const getSliderList = (slider) => {
    return sliderList.value[slider - 1];
  };
  const getSliderList2 = (slider) => {
    return sliderList2.value[slider - 1];
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

  const labelList = ref([]);
  const queryLabel = async () => {
    const res = await platformApi.platformLabelQueryLabelList({
      pageNum: 1,
      pageSize: 500,
      level: 1,
      module: 'fc_material',
    });
    labelList.value = res.labelInfoList || [];
  };

  const queryTopLabelFileList = async () => {
    const res = await fccApi.luteosFccCenterClientQueryTopLabelFileList({
      keyword: keyword.value,
      labelCodeList: search.value.labelCodeList,
      extTypeList: search.value.extTypeList,
    });
    topLabelFileList.value = res.topLabelFileList || [];
  };

  const recentLabelFileList = ref([]);
  const queryRecentLabelFileList = async () => {
    const res = await fccApi.luteosFccCenterClientQueryRecentLabelFileList({
      keyword: keyword.value,
      labelCodeList: search.value.labelCodeList,
      extTypeList: search.value.extTypeList,
    });
    recentLabelFileList.value = res.fileList || [];
  };

  const simpleLabelFileList = ref([]);
  const loading = ref(false);
  const querySimpleLabelFileList = async () => {
    loading.value = true;
    const res = await fccApi
      .luteosFccCenterClientQuerySimpleLabelFileList({
        keyword: keyword.value,
        labelCodeList: search.value.labelCodeList,
        extTypeList: search.value.extTypeList,
      })
      .finally(() => {
        loading.value = false;
      });
    simpleLabelFileList.value = res.labelFileList || [];
    if (res.labelFileList && res.labelFileList.length) {
      res.labelFileList.forEach((item, index) => {
        secondLabel.value[index] = `${index}_0`;
      });
    }
  };

  const labelTreeData = ref();
  const queryLabelTreeData = async () => {
    const res = await fccApi.luteosFccTagQueryFccLabelLevelList({
      labelType: 'fc_material',
    });
    labelTreeData.value = res.fccLabelLevelList || [];
  };

  const handleJumpDetail = (item) => {
    openWindow(`/materialcenter/customerDetail?topCode=${item.topLabelCode || ''}&labelCode=${item.labelCode || ''}`);
  };

  const handleViewAll = (item) => {
    openWindow(
      `/materialcenter/customerDetail?topCode=${ item.topLabelCode || ''}&extTypeList=${ search.value.extTypeList || ''}&keyword=${ keyword.value || '' }&labelCodeList=${ search.value.labelCodeList || '' }`
    );
  };

  const dictMap = ref({});
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['fccformat'],
    });
    dictMap.value = res.dictMap;
  };
  queryDictMap();

  const extTypeList = ref([]);
  const labelCodeList = ref([]);
  const reset = () => {
    extTypeList.value = [];
    labelCodeList.value = [];
    keyword.value = '';
    queryList();
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
    keyword.value = word;
    querySimpleLabelFileList();
  };

  const isHideData = computed(() => {
    return keyword.value || extTypeList.value.length || labelCodeList.value.length;
  });

  const isNoData = computed(() => {
    if (isHideData.value) {
      let count = 0;
      if (simpleLabelFileList.value.length) {
        simpleLabelFileList.value.forEach((item) => {
          if (item.childLabelFileList.length) {
            count++;
          }
        });
        return count === 0;
      }
      return true;
    }
    return false;
  });

  // 文件下载
  const downloadFile = async (row: any) => {
    const res = await fccApi.luteosFccCenterQueryFileInfo({
      operateType: 1,
      fileCode: row.fileCode,
    });
    // 文件直接下载
    download(res.filePath as string, row.fileName);
  };

  const handleCopy = (item, subItem) => {
    let url = `${location.host}/materialcenter/customerDetail?topCode=${item.topLabelCode || ''}&labelCode=${
        subItem.labelCode || ''
      }&extTypeList=${search.value.extTypeList || ''}&keyword=${
        keyword.value || ''
      }&labelCodeList=${search.value.labelCodeList || ''}`
    copyFn(url, '网址链接')

  }

  const queryList = () => {
    queryTopLabelFileList();
    queryRecentLabelFileList();
    querySimpleLabelFileList();
  };

  onActivated(() => {
    queryLabel();
    queryKeyWordTop();
    queryList();
    getDivWidth();
    queryLabelTreeData();
  });
</script>

<style scoped lang="scss">
  .user-container {
    overflow: hidden;
    img {
      object-fit: cover;
    }
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
    background: #fff;
    width: 100%;
  }

  .card-content {
    width: 100%;
    padding-top: 32px;
    padding-left: 32px;
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
    position: relative;
  }

  .card-container {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    margin-right: 32px;
  }

  .card {
    overflow: hidden;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    margin-right: 16px;
    cursor: pointer;
    // &:hover {
    //   box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    //   transform: scale(1.03);
    //   transition: .5s;
    // }
  }
  .card-item {
    width: 272px;
    height: 260px;
    border: 1px solid #ddd;
    overflow: hidden;
    border-radius: 8px;
  }

  .latest-card-item {
    height: 296px;
  }

  .latest-card {
    border: 1px solid #ddd;
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
  .img-relative {
    position: relative;
  }
  .img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    background: #000;
    text-align: center;
    line-height: 64px;
    opacity: 0;
    &:hover {
        opacity: 0.6;
    }
    .download-icon {
        position: absolute;
        top: 12px;
        left: 25px;
        width: 14px;
        height: 14px;

    }
    .view-icon {
        position: absolute;
        bottom: 12px;
        left: 25px;
    }
    
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
  .info-title-wrap {
    display: flex;
 }
  .info-title {
    display: inline-block;
    color: #000000d9;
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    width: 150px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 36px;
    margin-top: 75px;
  }
  .mt-0 {
    margin-top: 0;
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
    flex-wrap: nowrap;
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
    cursor: pointer;
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
      margin-left: 92px;
      margin-top: 52px;
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
    display: inline-block;
    width: 150px;
  }

  .more-images {
    width: 14px;
    height: 14px;
    cursor: pointer;
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
    background: #808080;
    margin-right: 10px;
  }
  .search-word {
    font-size: 13px;
  }
  .more-icon {
    justify-content: center;
    margin-top: 4px;
    margin-right: 16px;
    cursor: pointer;
  }
  .arrow-icon {
    position: absolute;
    top: 138px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    fill: #fff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
  .arrow-left {
    left: -16px;
    &:hover {
      background: #4372ff;
      .arrow-img {
        background-image: url('https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828180628-093c4faf-9e66-4ba9-a318-88fb70a5a8e8.png');
        background-size: 16px 16px;
      }
    }
    .arrow-img {
      width: 16px;
      height: 16px;
      background-image: url('https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828152129-b71f9ca1-1c36-4418-b9e0-dac939ca9972.png');
      background-size: 16px 16px;
    }
  }
  .arrow-right {
    right: 16px;
    &:hover {
      background: #4372ff;
      .arrow-img {
        background-image: url('https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828180343-45e5d2c3-7199-431d-af5f-b698ccf33c01.png');
        background-size: 16px 16px;
      }
    }
    .arrow-img {
      width: 16px;
      height: 16px;
      background-image: url('https://coss-platform.fenqile.com/platformresource200/M00/ex/20240828180535-c0f6b08f-9fc1-4d95-81c6-829c05a032f9.png');
      background-size: 16px 16px;
    }
  }
  .arrow-active {
    background: #4372ff;
  }
  .card-container {
    :deep(.el-carousel__container) {
      height: 310px !important;
    }
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
  .gray-bar {
    height: 30px; 
  }
</style>
