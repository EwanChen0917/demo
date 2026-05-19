<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.name" placeholder="资源名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-cascader
        style="width: 160px"
        :options="categoryOptions"
        v-model="categoryCodeList"
        clearable
        filterable
        :show-all-levels="true"
        @change="handleChange"
        placeholder="资源分类"
        :props="{
          expandTrigger: 'click',
          multiple: false,
          checkStrictly: true,
          label: 'categoryName',
          value: 'categoryCode',
          children: 'children',
        }"
      />
      <el-select
        v-model="tagsList"
        clearable
        placeholder="资源标签"
        multiple
        collapse-tags
        @change="
          (val) => {
            search.tags = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in labelOptions"
          :key="item.labelCode"
          :label="item.name"
          :value="item.labelCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-button class="button" type="primary" @click="addAgency" v-permission="'agencyadd'">
        录入
      </el-button>
      <el-button
        class="button"
        @click="handleExport"
        :loading="exportLoading"
        type="primary"
        plain
        v-permission="'agencyExport'"
      >
        导出
      </el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.agencyList">
      <el-table-column prop="agcName" label="资源名称" min-width="150">
        <template #default="scope">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            :content="scope.row.agcName"
          >
            <div class="ellipsis">{{ scope.row.agcName }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="cr" label="国家" />
      <el-table-column label="联系方式" min-width="200">
        <template #default="scope">
          <div>联系人：&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.contactUsername || '--' }}</div>
          <div>联系邮箱：{{ scope.row.contactEmail || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="firstCategoryName" label="资源分类" min-width="150">
        <template #default="scope">
          <span v-if="scope.row.firstCategoryName">{{ scope.row.firstCategoryName }}</span>
          <span v-if="scope.row.secondCategoryName">-{{ scope.row.secondCategoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="资源标签" min-width="220">
        <template #default="scope">
          <Tag
            size="large"
            v-for="item in scope.row.tags"
            :key="item"
            color="blue"
            class="tag-margin"
          >
            {{ item }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="资源评估" min-width="180">
        <template #default="scope">
          <div>
            专业度&nbsp;&nbsp;&nbsp;&nbsp;
            <el-rate
              v-if="scope.row.professionalScore"
              v-model="scope.row.professionalScore"
              disabled
              allow-half
            />
            <span v-else class="ml">--</span>
          </div>
          <div>
            服务响应
            <el-rate
              v-if="scope.row.serviceScore"
              v-model="scope.row.serviceScore"
              disabled
              allow-half
            />
            <span v-else class="ml">--</span>
          </div>
          <div>
            合作关系
            <el-rate
              v-if="scope.row.cooperateScore"
              v-model="scope.row.cooperateScore"
              disabled
              allow-half
            />
            <span v-else class="ml">--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="人员信息" min-width="150">
        <template #default="scope">
          <div>录入 {{ scope.row.createdBy || '--' }}</div>
          <div>合作 {{ scope.row.cooperateBy || '--' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="150">
        <template #default="scope">
          <div>录入 {{ scope.row.createTime || '--' }}</div>
          <div>更新 {{ scope.row.updateTime || '--' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="80" fixed="right">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: scope.row,
                permissionCode: 'agencydetail',
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
</template>

<script lang="ts" setup name="agencylist">
    import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { metaApi, MetaApi, platformApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import Tag from '@/components/Tag/index.vue';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    runQuery,
    refreshList,
  } = useList<MetaApi.LuteosMetaAgencyList.RequestQuery, MetaApi.LuteosMetaAgencyList.ResponseBody>(
    {
      searchDefaults: {
        name: undefined,
        firstCategory: undefined,
        secondCategory: undefined,
        tags: [],
      },
      pageSize: PAGE_SIZE,
      service: metaApi.luteosMetaAgencyList,
    }
  );

  const route = useRoute();
  const router = useRouter();
  const { params } = route;
  const tagsList = ref([]);
  const categoryCodeList = ref<any>('');

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  onActivated(() => {
    runQuery();
  });

  const categoryOptions = ref([]);
  const getCategoryOptions = async (parentCategoryCode) => {
    const res: any = await metaApi.luteosMetaAgencyCategoryList({
      parentCategoryCode,
    });
    categoryOptions.value = res.list || [];
  };
  getCategoryOptions('');

  const handleChange = (val) => {
    if (!val) {
      search.firstCategory = undefined;
      search.secondCategory = undefined;
    }
    if (val && val.length === 1) {
      search.firstCategory = val[0];
      search.secondCategory = undefined;
    }
    if (val && val.length === 2) {
      search.firstCategory = undefined;
      search.secondCategory = val[1];
    }
  };

  const labelOptions = ref([]);
  const queryLabelList = () => {
    platformApi
      .platformLabelQueryLabelList({
        module: 'agency',
        pageNum: 1,
        pageSize: 100,
        status: 1,
      })
      .then((res) => {
        if (+res.code === 200) {
          labelOptions.value = res.labelInfoList;
        }
      });
  };
  queryLabelList();

  const addAgency = () => {
    sessionStorage.setItem('agencySearchInfo', JSON.stringify(search));
    router.push(`/agency/add`);
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    metaApi.luteosMetaAgencyExportExcel,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;

    exportRun({
      ...search,
      tags: tagsList.value,
    });
  };

  // 表格操作
  const handleActions = (item) => {
    const { key, row } = item;

    if (key === 'view') {
      sessionStorage.setItem('agencySearchInfo', JSON.stringify(search));
      router.push(`/agency/detail?code=${row.agcCode}`);
    }
  };

  const reset = () => {
    search.name = undefined;
    search.firstCategory = undefined;
    search.secondCategory = undefined;
    tagsList.value = [];
    search.tags = [];
    categoryCodeList.value = '';
  };
</script>

<style scoped lang="scss">
  .ellipsis {
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的文本 */
    text-overflow: ellipsis; /* 显示省略号 */
    max-width: 150px; /* 列内容的最大宽度，根据需要调整 */
  }

  .tag-margin {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .ml {
    margin-left: 5px;
  }
</style>
