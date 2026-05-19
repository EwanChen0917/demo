<template>
  <KeenList>
    <template #search>
      <el-space>
        <el-input v-model="search.keyword" placeholder="红人名称/事项ID/邮箱" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </el-space>
    </template>
    <template #filters>
      <DeptMember
        style="width: 150px"
        v-if="queryFilterAuth"
        placeholder="合作人"
        v-model="search.memberCode"
        clearable
        filterable
      />
      <el-date-picker
        style="width: 150px"
        placeholder="合作开始时间"
        value-format="YYYY-MM-DD"
        v-model="search.startTime"
      />
      <el-date-picker
        style="width: 150px"
        type="date"
        placeholder="合作结束时间"
        value-format="YYYY-MM-DD"
        v-model="search.endTime"
      />
      <el-select 
        placeholder="合作状态" 
        v-model="search.statusList"
        collapse-tags
        clearable 
        multiple
        style="width: 150px"
        >
        <el-option
          v-for="item in dictMap.project_status"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        />
      </el-select>
      <el-select
        placeholder="合作产品"
        v-model="search.spuCodeList"
        clearable
        filterable
        multiple
        :collapse-tags="true"
        :remote="true"
        remote-show-suffix
        :remote-method="queryProductList"
        style="width: 280px"
      >
        <el-option
          v-for="item in productList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button v-if="route.name === 'cooperatemine'" type="primary" @click="batchUpdateRef?.open">
        批量操作
      </el-button>
      <ExportBtn :ignore-app-code="true"
        :service="metaApi.luteosMetaExportProjectList"
        :params="search"
        v-permission="exportPermission"
      >
        导出
      </ExportBtn>
    </template>

    <vxe-table border="inner" class="custom-table" :loading="listLoading" :data="listData?.list">
      <vxe-table-column title="合作平台" min-width="150px">
        <template #default="{ row }">
          <div class="d-flex items-center gap-2">
            <div>
              <el-space>
                <el-tooltip
                  popper-class="action_tool_tip text-gray-600"
                  v-for="logo in row.channelCodeList"
                  :key="logo"
                  effect="light"
                  placement="top"
                  :content="logo"
                >
                  <img style="width: 40px" :src="getImg(logo)" class="channel-img" />
                </el-tooltip>
              </el-space>
            </div>
            <!-- <GoodsInfo
              alwayShowCopy
              copy-subtitle
              :url="`/cooperate/detail?projectCode=${row.projectCode}`"
              hide-image
              :title="`${row.memberName}&${row.userName}的合作项目`"
              :subtitle="`${row.projectCode || '--'}`"
            /> -->
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="合作ID" min-width="210px">
        <template #default="{ row }">
          <div style="font-size: 14px">
            <a target="_blank" :href="`/cooperate/detail?projectCode=${row.projectCode}`" style="margin-right: 4px">{{ row.projectCode }}</a>
            <i
              v-if="row.projectCode"
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click.stop="copyFn(row.projectCode, '')"
            ></i>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="红人账号" min-width="140px">
        <template #default="{ row }">
          <div style="font-size: 14px">
            {{ row.userName }}
            <i
              v-if="row.productCode"
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click.stop="copyFn(row.userName, '')"
            ></i>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="合作人" field="memberName" min-width="100px">
      </vxe-table-column>
      <vxe-table-column title="合作产品" min-width="140px">
        <template #default="{ row }">
          <div
            style="font-size: 12px"
            v-for="product of row.productList"
            :key="product.rowproductCode"
          >
            {{ product.productName }}
            <i
              v-if="product.productCode"
              class="fas fa-copy text-hover-primary cursor-pointer"
              @click.stop="copyFn(product.productCode, '')"
            ></i>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="红人渠道链接" min-width="200px">
        <template #default="{ row }">
          <div style="font-size: 12px">
            <template v-if="row.channelHomeList && row.channelHomeList.length > 0">
              <div v-for="url of row.channelHomeList" :key="url">
                <a target="_blank" :href="url" style="margin-right: 4px">{{ url }}</a>
                <i
                  v-if="url"
                  class="fas fa-copy text-hover-primary cursor-pointer"
                  @click.stop="copyFn(url, '')"
                ></i>
              </div>
            </template>
            <template v-else>-</template>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column title="开始时间" width="120px">
        <template #default="{ row }">{{ row.startTimeStr }}</template>
      </vxe-table-column>
      <vxe-table-column title="合作费用" width="120px">
        <template #default>0</template>
      </vxe-table-column>
      <vxe-table-column title="状态" width="120px">
        <template #default="{ row }">
          <Tag
            v-if="row.statusDesc"
            size="large"
            :color="statusMap[row.status] && statusMap[row.status].color || 'gray'"
            :key="row"
          >
            {{ row.statusDesc || '' }}
          </Tag>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页 -->
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <!-- <div class="page_wrap mt-5">
    <div class="row g-6 g-xl-9 flex-fill" v-if="listData?.list.length > 0">
      <div class="col-md-6 col-xl-4" v-for="(item, index) in listData?.list" :key="index">
        <span class="card border-hover-primary" @click="toDetail(item)">
          <div class="card-header border-0 pt-9">
            <div class="card-title m-0">
              <div class="symbol symbol-50px w-50px bg-light">
                <img :src="getImg(item.img)" alt="image" class="p-3" />
              </div>
            </div>
            <div class="card-toolbar gap-2"></div>
          </div>
          <div class="card-body p-9">
            <div class="fs-3 fw-bold text-dark">
              {{ item.memberName }}&{{ item.userName }}的合作项目
            </div>
            <p class="text-gray-400 fw-semibold fs-5 mt-1 mb-7">
              合作事项id：{{ item.projectCode || '--' }}
              <i
                v-if="item.projectCode"
                class="fas fa-copy text-hover-primary cursor-pointer"
                @click.stop="copyFn(item.projectCode, '')"
              ></i>
            </p>
            <div class="d-flex">
              合作产品：
              <div class="product-list">
                <div v-for="product of item.productList" :key="productCode">
                  {{ product.productName }}
                  <i
                    v-if="item.productCode"
                    class="fas fa-copy text-hover-primary cursor-pointer"
                    @click.stop="copyFn(item.productCode, '')"
                  ></i>
                </div>
              </div>
            </div>
            <div class="d-flex">
              红人渠道链接：
              <div class="product-list">
                <template v-if="item.channelHomeList && item.channelHomeList.length > 0">
                  <div v-for="url of item.channelHomeList" :key="url">
                    {{ url || '-' }}
                    <i
                      v-if="url"
                      class="fas fa-copy text-hover-primary cursor-pointer"
                      @click.stop="copyFn(url, '')"
                    ></i>
                  </div>
                </template>
                <template v-else>-</template>
              </div>
            </div>
            <div class="d-flex flex-wrap mb-5">
              <div
                class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3"
              >
                <div class="fs-6 text-gray-800 fw-bold">{{ item.startTimeStr }}</div>
                <div class="fw-semibold text-gray-400">开始时间</div>
              </div>
              <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3">
                <div class="fs-6 text-gray-800 fw-bold">{{ 0 }}</div>
                <div class="fw-semibold text-gray-400">合作费用</div>
              </div>
            </div>
            <el-tooltip
              placement="top"
              effect="light"
              popper-class="action_tool_tip"
              :content="`${item.name}的状态为 ${item.statusDesc} `"
            >
              <div class="h-4px w-100 bg-light mb-5">
                <div
                  class="rounded h-4px"
                  :class="
                    item.status === 2
                      ? 'bg-info'
                      : item.status === 4
                      ? 'bg-gray'
                      : item.status === 5
                      ? 'bg-success'
                      : item.status === 6
                      ? 'bg-danger'
                      : ''
                  "
                  role="progressbar"
                  :style="{ width: statusMap[item.status]?.progress }"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </el-tooltip>
            <div class="symbol-group symbol-hover justify-content-between">
              <template v-for="(item2, index2) in item.clientList" :key="index2">
                <el-tooltip
                  v-if="!item2.avator"
                  placement="top"
                  effect="light"
                  popper-class="action_tool_tip text-gray-600"
                  :content="item2.name"
                >
                  <div class="symbol symbol-35px symbol-circle">
                    <span class="symbol-label fw-bold" :class="setFirstClass(item2.name)">
                      {{ setFirstName(item2.name) }}
                    </span>
                  </div>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  effect="light"
                  v-else
                  popper-class="action_tool_tip text-gray-600"
                  :content="item2.name"
                >
                  <div class="symbol symbol-35px symbol-circle">
                    <img alt="Pic" :src="item2.avator" />
                  </div>
                </el-tooltip>
              </template>
              <div class="product_info" v-if="item.productList?.length > 0">
                <div
                  v-for="(dem, index3) in item.productList"
                  :key="index3"
                  class="symbol symbol-50px"
                >
                  <el-tooltip
                    placement="top"
                    effect="light"
                    popper-class="action_tool_tip text-gray-600"
                    :content="dem.productName || ''"
                  />
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div
      class="row g-6 g-xl-9 flex-fill"
      v-else
      style="
        margin-top: 0;
        padding: 18px;
        padding-left: 36px;
        background-color: #fff;
        height: 300px;
      "
    >
      暂无数据
    </div> -->

  <ImportUpdateDialog type="batchUpdate" ref="batchUpdateRef" :download-params="search" />
</template>

<script setup lang="ts" name="cooperatemine">
    import { metaApi, productApi, MetaApi, platformApi } from '@/api/index';
  import Tag from '@/components/Tag/index.vue';
  import useList from '@/hooks/list/useList';
  import { copyFn } from '@/utils/copyFn';
  import ImportUpdateDialog from './Modules/importUpdateDialog.vue';

  const route = useRoute();
  const sceneList = ref([
    {
      desc: '合作管理',
      scene: 'manage',
      componentName: 'cooperatemanage',
    },
    {
      desc: '我的合作',
      scene: 'mine',
      componentName: 'cooperatemine',
    },
  ]);

  const sceneInfo: any =
    sceneList.value.find((item) => {
      return route.name === item.componentName;
    }) || {};
  const exportPermission = computed(() => {
    if (sceneInfo.componentName === 'cooperatemanage') {
      return 'cooperatemanage:cooperateExport';
    }
    if (sceneInfo.componentName === 'cooperatemine') {
      return 'cooperatemine:cooperateExport';
    }
    return undefined;
  });

  const statusMap = {
    2: {
      text: '进行中',
      color: 'purple',
    },
    5: {
      text: '顺利完结',
      color: 'green',
    },
  };

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
    refreshList,
    runQuery,
    resetSearch,
  } = useList<
    MetaApi.LuteosMetaQueryProjectList.RequestQuery,
    MetaApi.LuteosMetaQueryProjectList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      statusList: undefined,
      memberCode: undefined,
      spuCodeList: undefined,
      startTime: undefined,
      endTime: undefined,
      scene: sceneInfo.scene,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryProjectList,
    interceptSearchData: (searchData) => {
      const { spuCodeList, statusList } = searchData;
      return {
        ...searchData,
        statusList: statusList?.join(','),
        spuCodeList: spuCodeList?.join(','),
      };
    },
  });

  watchEffect(() => {
    if (listData.value) {
      const list = listData.value.list || [];
      if (list.length > 0) {
        const numList = getNumOrder();
        list.map((item: any, index: number) => {
          item.img = projectImg[numList[index]];
          item.startTimeStr = dealTime(item.startTime);
          item.clientList = [{ name: item.memberName || '', avator: item.memberAvatar || '' }];
        });
      }
    }
  });

  // const getImg = (name: string) => {
  //   return new URL(`../../../../assets/images/home/${name}`, import.meta.url).href;
  // };
  const getImg = (name) => {
    return new URL(`/src/assets/images/logos/${name}.svg`, import.meta.url).href;
  };

  const setFirstName = (name: string) => {
    if (!name) return 'R';
    return name.slice(0, 1).toUpperCase();
  };
  const setFirstClass = (name: string) => {
    let firstName = '';
    if (!name) {
      firstName = 'R';
    } else {
      firstName = name.slice(0, 1).toUpperCase();
    }
    if (['A', 'B', 'C', 'D'].includes(firstName)) {
      return 'bg-warning text-inverse-warning';
    }
    if (['E', 'F', 'G', 'H'].includes(firstName)) {
      return 'bg-primary text-inverse-primary';
    }
    if (['S', 'P', 'M', 'N', 'R'].includes(firstName)) {
      return 'bg-info text-inverse-info';
    }
  };

  const dealTime = (time: string) => {
    if (!time) return '';
    let str = '';
    const obj = {
      '01': '一月',
      '02': '二月',
      '03': '三月',
      '04': '四月',
      '05': '五月',
      '06': '六月',
      '07': '七月',
      '08': '八月',
      '09': '九月',
      '10': '十月',
      '11': '十一月',
      '12': '十二月',
    };
    const firstStr = time.split(' ')[0];
    str = `${obj[firstStr.slice(5, 7)]} ${firstStr.slice(8, 10)},${firstStr.slice(0, 4)}`;
    return str;
  };

  const projectImg = {
    0: 'plurk.svg',
    1: 'volicity-9.svg',
    2: 'disqus.svg',
    3: 'figma-1.svg',
    4: 'aven.svg',
    5: 'kanba.svg',
    6: 'xing-icon.svg',
    7: 'webpack-icon.svg',
    8: 'sentry-3.svg',
    9: 'spring-3.svg',
  };

  const batchUpdateRef = ref();

  const getNumOrder = () => {
    const arr: any = [];
    while (arr.length < 10) {
      const num = Math.floor(Math.random() * 10);
      if (!arr.includes(num)) {
        arr.push(num);
      }
    }
    return arr;
  };

  const queryFilterAuth: any = ref(0);
  const queryAuth = async () => {
    const res = await metaApi.luteosMetaQueryMetaProjectAuth({});
    queryFilterAuth.value = res.queryFilterAuth;
  };

  queryAuth();

  const productList: any = ref([]);
  const queryProductList = async (keyword) => {
    const res = await productApi.luteosProductQueryProductList({
      keyword,
      pageNum: 1,
      pageSize: 100,
    });
    productList.value = res.productBeanList!.map((item) => {
      return {
        label: `${item.name},${item.productSpu}`,
        value: item.productSpu,
      };
    });
  };

  queryProductList('');
  
  const dictMap = ref({});
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['project_status'],
    });
    dictMap.value = res.dictMap || {};
  };
  queryDictMap();

  const router = useRouter();
  const toDetail = (item: any) => {
    router.push({ name: 'cooperatedetail', query: { projectCode: item.projectCode } });
  };
</script>

<style scoped lang="scss">
  .page_wrap {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }

  .rt_pagin_wrap {
    margin-top: 2.5rem;
    flex: 0 0 4.8rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .sieze_change_wrap {
      width: 70px;
    }
  }

  ::v-deep(.rt_ele_pagin.el-pagination button) {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.475rem;
    height: 2.5rem;
    min-width: 2.5rem;
    font-weight: 500;
    font-size: 1.075rem;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev) {
    background-color: transparent;
    padding: 0;
    margin: 0;
    margin-right: 0.5rem;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev:hover) {
    color: #3e97ff;
    background-color: #f4f6fa;
    border-color: transparent;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev:hover .el-icon) {
    color: #3e97ff;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-prev .el-icon) {
    color: #0b0b0c;
    font-size: 14px;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next) {
    background-color: transparent;
    padding: 0;
    margin: 0;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next .el-icon) {
    color: #0b0b0c;
    font-size: 14px;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next:hover) {
    color: #3e97ff;
    background-color: #f4f6fa;
    border-color: transparent;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .btn-next:hover .el-icon) {
    color: #3e97ff;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li) {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.475rem;
    height: 2.5rem;
    width: 2.5rem;
    font-weight: 500;
    font-size: 1.075rem;
    background-color: transparent;
    color: #5e6278;
    padding: 0;
    margin: 0;
    margin-right: 0.5rem;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li.is-active) {
    color: #fff !important;
    background-color: #3e97ff !important;
    cursor: pointer;
  }

  ::v-deep(.rt_ele_pagin.el-pagination.is-background .el-pager li:hover) {
    color: #3e97ff;
    background-color: #f4f6fa;
  }

  .product_info {
    display: flex;
    align-items: center;
    margin-left: 40px;
  }

  .wid_240 {
    width: 240px;
  }

  .flex-wrap {
    display: flex;
  }

  .card-header {
    margin-top: 0;
    padding-left: 14px;

    ::v-deep(.el-input__wrapper) {
      background: #fff;
    }
  }

  .select-right {
    margin-right: 12px;
  }

  .col-md-6 {
    cursor: pointer;
  }
</style>
