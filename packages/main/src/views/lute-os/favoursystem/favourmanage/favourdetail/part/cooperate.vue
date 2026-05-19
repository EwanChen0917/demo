<template>
  <KeenList>
    <template #search></template>
    <template #filters>
      <el-select
        placeholder="团队"
        :teleported="false"
        clearable
        v-model="search.team"
        style="width: 100px"
      >
        <el-option label="品牌推广" :value="1" />
        <el-option label="GTM推广" :value="2" />
        <el-option label="小店推广" :value="3" />
      </el-select>
      <DeptMember
        v-model="search.memberCode"
        placeholder="创建人"
        style="width: 100px"
        deptCode="red_promoter"
      />

      <el-select
        style="width: 180px"
        v-model="spuCodeList"
        placeholder="合作产品"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="
          () => {
            search.spuCodeList = spuCodeList.join(',');
          }
        "
      >
        <el-option
          v-for="(item, index) in spuList"
          :key="item.productSpu"
          :label="item.name"
          :value="item.productSpu"
        />
      </el-select>
      <el-select
        style="width: 180px"
        v-model="sampleSpuCodeList"
        placeholder="寄样产品"
        clearable
        filterable
        multiple
        collapse-tags
        collapse-tags-tooltip
        @change="
          () => {
            search.sampleSpuCodeList = sampleSpuCodeList.join(',');
          }
        "
      >
        <el-option
          v-for="(item, index) in spuList"
          :key="item.productSpu"
          :label="item.name"
          :value="item.productSpu"
        />
      </el-select>
      <el-cascader
        v-model="labelCodeList"
        :props="props"
        placeholder="合作标签"
        clearable
        collapse-tags
        collapse-tags-tooltip
        @change="
          (val) => {
            search.labelCodeList = val.join(',');
          }
        "
      />
    </template>
    <template #buttons>
      <el-button type="primary" @click="runQuery">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.list" row-key="uid">
      <el-table-column label="事项id" prop="projectCode" min-width="150" />
      <el-table-column label="团队" prop="team" min-width="120" />
      <el-table-column label="合作事项创建人" prop="memberName" min-width="150">
        <template #default="{ row }">
          <UserAvator :name="row.memberName" :url="row.memberAvatar" :title="row.memberTitle" />
        </template>
      </el-table-column>
      <el-table-column label="合作产品" min-width="240">
        <template #default="scope">
          <div v-if="scope.row.productList && scope.row.productList.length">
            <template v-for="(item, index) in scope.row.productList" :key="index">
              <div class="fw-semibold text-gray-600 fs-7 pe-10">
                <div>{{ item.productName }}</div>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="寄样产品" min-width="240">
        <template #default="scope">
          <div v-if="scope.row.orderProductList && scope.row.orderProductList.length">
            <template v-for="(item, index) in scope.row.orderProductList" :key="index">
              <div class="fw-semibold text-gray-600 fs-7 pe-10">
                <div>{{ item }}</div>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合作费用" prop="cooperationCosts">
        <template #default="{ row }">
          <div>
            {{ row.cooperationCosts }}
            <span class="text-gray-400">{{ row.cooperationCostsCurrency }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合作状态" min-width="100px">
        <template #default="scope">
          <Tag size="large" :color="statusObj[scope.row.status]?.color">
            {{ scope.row.statusDesc || '' }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column label="合作标签" min-width="130px">
        <template #default="scope">
          <div v-if="scope.row.labelList && scope.row.labelList.length">
            <template v-for="(item, index) in scope.row.labelList" :key="index">
              <Tag color="red" class="label-tag">
                {{ item.name }}
              </Tag>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合作开始时间" prop="startTime" min-width="150" />
      <el-table-column label="折扣码" min-width="120">
        <template #default="scope">
          <div v-if="scope.row.metaMarkList && scope.row.metaMarkList.length">
            <template v-for="(item, index) in scope.row.metaMarkList" :key="index">
              <div class="fw-semibold text-gray-600 fs-7 pe-10">
                <div>{{ item }}</div>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row }">
          <KeenActions
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                hide: !row.detailAllOperateAuth,
                row: row,
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

<script lang="ts" setup>
    import { ElTable as ElTableType } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { metaApi, MetaApi, platformApi, productApi } from '@/api/index';
  import { decryptByBase64 } from '@/utils/aesTils';
  import Tag from '@/components/Tag/index.vue';
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';

  const route = useRoute();
  const router = useRouter();

  const PAGE_SIZE = 10;
  const labelCodeList = ref([]);
  const spuCodeList = ref([]);
  const sampleSpuCodeList = ref([]);
  const userCode = decryptByBase64(route.query.code as string);
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const {
    search,
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
    resetSearch,
  } = useList<
    MetaApi.LuteosMetaQueryProjectList.RequestQuery,
    MetaApi.LuteosMetaQueryProjectList.ResponseBody
  >({
    searchDefaults: {
      userCode,
      team: undefined,
      memberCode: undefined,
      spuCodeList: undefined,
      sampleSpuCodeList: undefined,
      labelCodeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: metaApi.luteosMetaQueryProjectList,
  });

  const statusObj = {
    2: {
      text: '进行中',
      color: 'purple',
    },
    4: {
      text: '取消',
      color: 'gray',
    },
    5: {
      text: '顺利完结',
      color: 'green',
    },
    6: {
      text: '跑单',
      color: 'red',
    },
  };

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      const path = router.resolve({
        name: 'cooperatedetail',
        query: { projectCode: row.projectCode },
      });
      router.push(path.href);
    }
  };

  const spuList = ref([]);
  const maxNum = ref(0);
  const pages = ref(1);
  const querySpuList = async (num = 1) => {
    if (num > pages.value) return;
    const res = await productApi.luteosProductQueryProductList({
      pageNum: num,
      pageSize: 500,
    });
    if (num > maxNum.value) {
      spuList.value.push(
        ...res?.productBeanList?.map((item) => {
          return {
            productSpu: item.productSpu,
            name: item.name,
          };
        })
      );
      maxNum.value = num;
    }
    pages.value = res?.pages;
  };
  querySpuList();

  const selectRef = ref(null);
  const handleFocus = () => {
    const dropdown = selectRef.value?.popperRef.querySelector('.el-scrollbar__wrap') || null;
    if (dropdown) {
      dropdown.addEventListener('scroll', handleScroll);
    }
  };

  function handleScroll(event) {
    const dropdown = selectRef.value?.popperRef || null; // 获取下拉框的实际DOM元素
    if (!dropdown) return;

    const scrollWrapper = dropdown.querySelector('.el-scrollbar__wrap');
    if (
      scrollWrapper &&
      scrollWrapper.scrollHeight - scrollWrapper.scrollTop <= scrollWrapper.clientHeight
    ) {
      querySpuList(maxNum.value + 1);
    }
  }

  const props = {
    lazy: true,
    multiple: true,
    async lazyLoad(node, resolve) {
      const { level, value } = node;
      const res = await metaApi.luteosMetaQueryLabelList({
        pageNum: 1,
        pageSize: 500,
        module: 'project',
        labelCode: value,
      });
      const nodes = res?.labelInfoList?.map((item) => ({
        value: item.labelCode,
        label: item.name,
        leaf: level >= 1,
      }));
      resolve(nodes);
    },
  };

  const reset = () => {
    labelCodeList.value = [];
    spuCodeList.value = [];
    sampleSpuCodeList.value = [];
    resetSearch();
  };
</script>

<style scoped lang="scss"></style>
