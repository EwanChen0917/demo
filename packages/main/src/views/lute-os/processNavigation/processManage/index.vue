<template>
  <KeenList>
    <template #search>
      <el-input v-model="searchParams.keyword" placeholder="事项名称" @input="initData">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="initData">查询</el-button>
    </template>
  </KeenList>

  <el-card class="box-card" v-for="(item, index) in processNavigationList" :key="index">
    <template #header>
      <div class="card-header">
        <span>{{ item.name }}</span>
      </div>
    </template>
    <el-tabs v-if="item.secondNavigationList && item.secondNavigationList.length">
      <el-tab-pane
        v-for="(process, processIndex) in item.secondNavigationList"
        :label="process.name"
        :key="processIndex"
      >
        <div
          class="approve-wrapper"
          v-if="process && process.threeNavigationList && process.threeNavigationList.length"
        >
          <div
            class="approve-item"
            v-for="(navigation, navigationIndex) in process.threeNavigationList"
            :key="navigationIndex"
            @click="goUrl(navigation)"
          >
            <el-image
              v-if="navigation.iconUrl"
              class="icon-url"
              :src="navigation.iconUrl"
              fit="fill"
            />
            <SvgIcon
              v-else
              :icon="getSvgIcon(navigation.extType)"
              class="svg-icon svg-icon-1 svg-icon-primary"
            />

            <ElTooltip
              popper-class="action_tool_tip text-gray-600"
              placement="bottom"
              effect="light"
              :content="navigation.name"
            >
              <p>{{ navigation.name }}</p>
            </ElTooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup name="processManage">
    import { processApi } from '@/api';

  const searchParams: any = ref({ keyword: '' });
  const processNavigationList = ref<any[]>([]);
  // 获取后缀
  const getExtType = (str) => {
    if (!str) {
      return '';
    }

    const filePath = str.split('?')[0];
    // 从文件路径中获取最后一个斜杠之后的部分，即文件名
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    return fileName.split('.').pop();
  };
  const initData = async () => {
    const res = await processApi.luteosProcessNavigationQueryList({
      keyword: searchParams.value.keyword,
    });
    processNavigationList.value = res.processNavigationList || [];
    processNavigationList.value.forEach((item) => {
      if (item.secondNavigationList && item.secondNavigationList.length) {
        item.secondNavigationList.forEach((subItem) => {
          subItem.threeNavigationList = [];
          if (subItem.processNavigationItemList && subItem.processNavigationItemList.length) {
            subItem.processNavigationItemList.forEach((navigationItem) => {
              const data = {
                url: navigationItem.dingTalkUrl,
                code: navigationItem.processCode,
                name: navigationItem.processName,
                iconUrl: navigationItem.iconUrl,
                type: 1,
              };
              subItem.threeNavigationList.push(data);
            });
          }

          if (subItem.processNavigationFileList && subItem.processNavigationFileList.length) {
            subItem.processNavigationFileList.forEach((navigationItem) => {
              const data = {
                url: navigationItem.fileUrl,
                code: navigationItem.fileCode,
                name: navigationItem.fileName,
                type: 2,
                extType: getExtType(navigationItem.fileUrl),
                iconUrl: navigationItem.iconUrl,
              };
              subItem.threeNavigationList.push(data);
            });
          }

          if (
            subItem.processNavigationTemplateList &&
            subItem.processNavigationTemplateList.length
          ) {
            subItem.processNavigationTemplateList.forEach((navigationItem) => {
              const data = {
                url: navigationItem.templateUrl,
                code: navigationItem.templateCode,
                name: navigationItem.templateName,
                type: 3,
                extType: getExtType(navigationItem.templateUrl),
                iconUrl: navigationItem.iconUrl,
              };
              subItem.threeNavigationList.push(data);
            });
          }
        });
      }
    });
  };

  // 获取图标
  const getSvgIcon = (extType) => {
    const svgIconMap = {
      pic: 'icon_img',
      pdf: 'icon_pdf',
      word: 'icon_docx',
      excel: 'icon_xlsx',
      default: 'icon_approval',
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
    return svgIconMap.default;
  };
  const goUrl = (navigation) => {
    window.open(navigation.url);
  };
  onMounted(() => {
    initData();
  });
</script>

<style scoped lang="scss">
  .box-card {
    :deep(.card-body) {
      display: none;
    }
    :deep(.el-card__body) {
      padding-top: 0;
    }
    :deep(.el-card__header) {
      border-bottom: none;
    }
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    border-bottom: none !important;
  }
  .box-card {
    margin-top: 20px;
  }
  .approve-wrapper {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    .approve-item {
      cursor: pointer;
      text-align: center;
      p {
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .svg-icon-primary {
    :deep(svg) {
      width: 64px !important;
      height: 64px !important;
      border-radius: 8px;
      margin-bottom: 16px;
      margin-top: 9px;
    }
  }
  .icon-url {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin-bottom: 16px;
    margin-top: 9px;
  }
</style>
