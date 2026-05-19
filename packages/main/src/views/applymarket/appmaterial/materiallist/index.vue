<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.title" placeholder="标题">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        v-model="search.scene"
        clearable
        filterable
        placeholder="类型"
        @change="queryModelList"
      >
        <el-option
          v-for="item in sceneList"
          :key="item.scene"
          :label="item.desc"
          :value="item.scene"
        />
      </el-select>

      <el-select v-model="search.model" clearable filterable placeholder="板块">
        <el-option
          v-for="item in modelList"
          :key="item.model"
          :label="item.desc"
          :value="item.model"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleAdd" v-permission="'appmaterialadd'">
        新增素材
      </el-button>
    </template>

    <el-table ref="tableRef" v-loading="listLoading" :data="materialList" row-key="materialCode">
      <el-table-column type="selection" width="40" reserve-selection />
      <el-table-column prop="title" label="素材信息" min-width="200">
        <template #default="scope">
          <div class="d-flex align-items-center pe-5">
            <KeenImagePreview v-if="scope.row.type === MaterialType.图片" :src="scope.row.url" />
            <el-button
              v-else-if="scope.row.type === MaterialType.视频"
              :icon="VideoPlay"
              circle
              @click="handleVideoPlay(scope.row.url)"
              class="w-50px h-50px"
            />
            <div class="ms-5 fs-5">
              <div class="text-gray-800 fw-bold">
                {{ scope.row.title }}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="跳转类型" prop="linkTypeStr" />
      <el-table-column label="跳转链接" min-width="200">
        <template #default="scope">
          <a class="text-primary" @click="toUrl(scope.row.linkUrl)">
            <el-tooltip
              effect="light"
              popper-class="action_tool_tip"
              :content="scope.row.linkUrl"
              :disabled="scope.row.linkUrl.length < 120"
            >
              <span class="link-url cursor-pointer">{{ scope.row.linkUrl }}</span>
            </el-tooltip>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="有效时间" width="210">
        <template #default="scope">
          {{
            `${scope.row.startTime ? dayjs(scope.row.startTime).format('YYYY/MM/DD') : ''}-${
              scope.row.endTime ? dayjs(scope.row.endTime).format('YYYY/MM/DD') : ''
            }`
          }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="sceneDesc" label="类型" width="120" />
      <el-table-column prop="modelDesc" label="板块" width="120" />
      <el-table-column label="状态" width="55">
        <template #default="scope">
          <span class="badge" :class="[scope.row.status ? 'badge-light-success' : 'badge-light']">
            {{ MaterialStatus[scope.row.status] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" width="55">
        <template #default="scope">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                payload: { code: scope.row.materialCode },
                permissionCode: 'appmaterialdetail',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <el-dialog title="视频" :model-value="videoVisible" @close="handleVideoClose" destroy-on-close>
    <video :src="videoUrl" controls class="w-100"></video>
  </el-dialog>
</template>

<script lang="ts" setup name="appmateriallist">
  import dayjs from 'dayjs';
  import { useRequest } from 'vue-request';
  import { VideoPlay } from '@element-plus/icons-vue';

  import useList from '@/hooks/list/useList';
  import { commonApi, CommonApi } from '@/api/index';
  import { MaterialStatus, MaterialType } from '@/types/api';
  import { ElTooltip } from 'element-plus';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import { useStore } from '@/store/modules/useStore';
  import axios from 'axios';

  const router = useRouter();
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
    resetSearch,
    refreshList,
    // runQuery,
    tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    CommonApi.LuteosCommonMaterialQueryMaterialList.RequestQuery & {
      submitTime?: string;
    },
    CommonApi.LuteosCommonMaterialQueryMaterialList.ResponseBody
  >({
    searchDefaults: {
      title: undefined,
      scene: undefined,
      model: undefined,
      listType: 1,
    },
    service: commonApi.luteosCommonMaterialQueryMaterialList,
  });

  const { data: sceneData } = useRequest(commonApi.luteosCommonMaterialQueryMaterialSceneList);

  const sceneList = computed(() => sceneData.value?.sceneList ?? []);
  const materialList = computed(
    () =>
      listData.value?.materialList?.map((item) => ({
        ...item,
        sceneName: sceneList.value.find((scene) => scene.scene === item.scene)?.desc,
      })) ?? []
  );

  const modelList = ref([]);
  const queryModelList = () => {
    commonApi
      .luteosCommonMaterialQueryMaterialModelList({
        scene: search.scene,
      })
      .then((res) => {
        modelList.value = res.modelList || [];
      });
  };

  // const sortedList = computed(() =>
  //   listData.value?.materialList?.sort((a, b) => a.sort ?? 0 - (b.sort ?? 0))
  // );

  const handleAdd = () => {
    router.push(`/appmateriallist/add`);
  };

  // 表格操作
  const handleActions = (item) => {
    const {
      key,
      payload: { code },
    } = item;

    if (key === 'view') {
      router.push(`/appmateriallist/detail?code=${code}`);
    }
  };

  const videoUrl = ref('');
  const videoVisible = ref(false);
  const handleVideoPlay = (url: string) => {
    videoUrl.value = url;
    videoVisible.value = true;
  };
  const handleVideoClose = () => {
    videoUrl.value = '';
    videoVisible.value = false;
  };

  const user = useStore();

  const toUrl = async (url) => {
    if (url?.startsWith('POST')) {
      const fetchInfo = url?.split('POST')[url?.split('POST')?.length - 1];
      const fetchUrl = fetchInfo?.split('--row')[0]?.trim();
      const fetchParams = JSON.parse(fetchInfo?.split('--row')[1]?.trim());
      // console.log(fetchUrl, fetchParams);
      const res = await axios.post(fetchUrl, fetchParams, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const isExportConfirm = await swal.exportConfirm();
      if (!isExportConfirm) return;

      await nextTick();
      const path = router.resolve({
        path: '/downloadmanage',
        query: {
          app_code: res?.appCode,
          module_code: res?.moduleCode,
          record_type: 2,
        },
      });
      openWindow(path.href);
    } else {
      openWindow(url);
    }
  };
</script>

<style lang="scss" scoped>
  .link-url {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--bs-success);
  }
</style>
