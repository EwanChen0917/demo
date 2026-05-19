<template>
  <div class="card card-flush">
    <el-space class="btn-tab">
      <el-button
        v-for="(select, index) in selectTypeList"
        :key="index"
        :type="select.type === selectType ? 'primary' : ''"
        @click="handleSelectTypeClick(select.type)"
      >
        {{ select.text }}
      </el-button>
    </el-space>
    <el-space class="btn-tab designer-nav" v-if="currentItem.isShowItem">
      <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
        <li
          class="nav-item"
          v-for="(nav, index) in currentItem.itemTypeList"
          :key="index"
          @click="handleNavClick(nav.type)"
        >
          <span
            :class="[
              'nav-link',
              'text-active-primary',
              'py-5',
              'me-6',
              currentItem.itemType === nav.type ? 'active' : '',
            ]"
          >
            {{ nav.text }}
          </span>
        </li>
      </ul>
    </el-space>
    <div
      class="card-header py-5 flex-wrap justify-content-between"
      v-if="selectType === 1 || isShowDate"
    >
      <div class="card-title align-items-start gap-5" v-if="selectType === 1">
        <!-- <el-input
          v-model="currentItem.name"
          :placeholder="currentItem.itemType === 1 ? '任务名称' : '任务名称/项目名称'"
          @input="runQuery"
          clearable
          class="w-250px"
        > -->
        <el-input
          v-model="currentItem.keyword"
          placeholder="任务名称/合同编号"
          @input="debouncedRunQuery"
          clearable
          class="w-250px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </div>
      <div class="card-toolbar flex-root flex-wrap justify-content-end row-gap-8">
        <el-space v-if="selectType === 1">
          <el-select
            v-model="currentItem.status"
            clearable
            filterable
            placeholder="请选择任务状态"
            @change="runQuery"
          >
            <el-option
              v-for="(value, key) in taskStatusMap"
              :key="key"
              :label="value"
              :value="Number(key)"
            />
          </el-select>
          <el-select
            v-model="currentItem.designerCode"
            clearable
            filterable
            placeholder="请选择设计师"
            remote-show-suffix
            @change="runQuery"
            class="margin-right-10"
          >
            <el-option
              v-for="item in designerMemberList"
              :key="item.designer"
              :label="item.designerDesc"
              :value="item.designer"
            />
          </el-select>
        </el-space>
        <div class="card-title align-items-start gap-5" v-if="isShowDate">
          <el-date-picker
            v-model="currentItem.date"
            type="daterange"
            @change="runQuery"
            value-format="YYYY-MM-DD"
            range-separator="-"
            start-placeholder="需求提交日期"
            end-placeholder="需求提交日期"
          />
        </div>
        <!-- <el-space>
            <el-date-picker
              v-model="currentItem.selectDate"
              type="month"
              value-format="YYYY-MM"
              placeholder="月份"
              @change="runQuery"
            />
          </el-space> -->
        <el-space>
          <el-button class="margin-left-10" type="primary" @click="debouncedRunQuery">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button
            v-if="selectType === 1"
            @click="handleExport"
            :loading="exportLoading1"
            type="primary"
            plain
          >
            导出
          </el-button>
          <el-button
            v-if="selectType === 2"
            @click="handleExport"
            :loading="exportLoading2"
            type="primary"
            plain
          >
            导出
          </el-button>
        </el-space>
      </div>
    </div>
    <div class="my-table">
      <ScoreTable
        :list="currentItem.list"
        :itemType="currentItem.itemType"
        v-if="selectType === 1"
      />
      <DesignerTable :list="currentItem.list" v-if="selectType === 2" />
      <DepartmentTable
        :list="currentItem.list"
        v-if="selectType === 3 && currentItem.itemType === 1"
      />
      <TaskTable :list="currentItem.list" v-if="selectType === 3 && currentItem.itemType === 2" />
      <TypeTable :list="currentItem.list" v-if="selectType === 3 && currentItem.itemType === 3" />
      <BrandTable :list="currentItem.list" v-if="selectType === 4" />
      <KeenPagination
        :current="currentItem.current"
        :page-size="currentItem.pageSize"
        :page-size-option="pageSizeOption"
        :total="currentItem.total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="designtaskanalysis">
  import { designApi } from '@/api/index';
  import { keyBy } from 'lodash-es';
  import { useRequest } from 'vue-request';
  import * as swal from '@/utils/swal';
  import BrandTable from './components/brandtable.vue';
  import DepartmentTable from './components/departmenttable.vue';
  import DesignerTable from './components/designertable.vue';
  import ScoreTable from './components/scoretable.vue';
  import TaskTable from './components/tasktable.vue';
  import TypeTable from './components/typetable.vue';
  import { itemTypeList } from '../config/index.ts';
  import { useDebounceFn } from '@vueuse/core';
  import { taskStatusMap } from '../constants';
  const router = useRouter();
  // 获取当前日期
  const currentDate = new Date();

  // 设置日期为当前月的第一天
  currentDate.setDate(1);

  // 格式化日期为 "yyyy-mm-dd" 格式
  const formattedFirstDay = currentDate.toISOString().split('T')[0];

  // 获取当前月份的最后一天
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // 格式化日期为 "yyyy-mm-dd" 格式
  const formattedLastDay = lastDayOfMonth.toISOString().split('T')[0];
  // 当前配置项
  const selectType = ref(1);
  // 配置列表
  const selectTypeList = ref([
    {
      text: '分数统计',
      type: 1,
      keyword: '',
      date: [],
      designerCode: '',
      isShowItem: 1,
      itemType: '',
      current: 1,
      selectDate: '',
      pageSize: 10,
      total: 0,
      list: [],
      api: 'luteosDesignStatisticAnalysisQueryDesignScoreStatisticList',
      resKey: 'scoreStatisticList',
      itemTypeList: [
        {
          text: '全部',
          type: '',
        },
        {
          text: '品牌设计部',
          type: 'brand_design',
        },
        {
          text: '体验设计部',
          type: 'experience_design',
        },
        {
          text: '创意设计部',
          type: 'creative_design',
        },
        {
          text: '工业设计部',
          type: 'industrial_design',
        },
        // {
        //   text: '一期任务',
        //   type: 'old_design',
        // },
      ],
    },
    {
      text: '设计师数据统计',
      type: 2,
      name: '',
      date: [],
      isShowItem: 1,
      itemType: 12,
      useItemTypeApi: false,
      itemTypeList: [],
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      api: 'luteosDesignStatisticAnalysisQueryDesignerStatisticList',
      resKey: 'designerStatisticList',
    },
    {
      text: '部门/类型数据统计',
      type: 3,
      name: '',
      date: [formattedFirstDay, formattedLastDay],
      isShowItem: 1,
      itemType: 1,
      useItemTypeApi: true,
      itemTypeList: [
        {
          text: '部门总统计数据',
          type: 1,
          api: 'luteosDesignStatisticAnalysisQueryDesignDeptStatisticList',
          resKey: 'designDeptStatisticList',
        },
        {
          text: '任务统计数据',
          type: 2,
          api: 'luteosDesignStatisticAnalysisQueryDesignTaskStatisticList',
          resKey: 'designTaskStatisticList',
        },
        {
          text: '类型总统计数据',
          type: 3,
          api: 'luteosDesignStatisticAnalysisQueryDesignTypeStatisticList',
          resKey: 'designTypeStatisticList',
        },
      ],
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
    },
    /* {
      text: '品牌数据统计',
      type: 4,
      name: '',
      date: [],
      isShowItem: 0,
      current: 1,
      pageSize: 10,
      total: 0,
      list: [],
      api: 'luteosDesignStatisticAnalysisQueryDesignBrandStatisticList',
      resKey: 'designBrandStatisticList',
    }, */
  ]);
  // 当前配置
  const currentItem = computed(() => {
    const data: any = {};
    return (
      selectTypeList.value.find((item) => {
        return item.type === selectType.value;
      }) || data
    );
  });

  const isShowDate = computed(() => {
    return (
      [1, 2, 4].includes(selectType.value) ||
      (selectType.value === 3 && currentItem.value.itemType !== 2)
    );
  });
  const designItemTypeBaseList = itemTypeList.slice(1).map((item) => ({ ...item }));
  const hasSecondStageItemTypeAuth = ref(false);
  const itemTypeTextMap = ref<Record<number, string>>({});
  const rebuildDesignerStatisticItemTypeList = () => {
    if (!selectTypeList.value[1]) {
      return;
    }
    if (!hasSecondStageItemTypeAuth.value) {
      selectTypeList.value[1].itemTypeList = [];
      return;
    }
    selectTypeList.value[1].itemTypeList = designItemTypeBaseList.map((item) => ({
      ...item,
      text: itemTypeTextMap.value[item.type] || item.text,
    }));
  };
  const queryDesignItemTypeAuth = async () => {
    const res: any = await designApi.luteosDesignQueryDesignItemTypeAuth({});
    hasSecondStageItemTypeAuth.value = +res.secondStageItemTypeAuth === 1;
    rebuildDesignerStatisticItemTypeList();
  };
  const queryTaskItemTypeText = async () => {
    try {
      const res: any = await designApi.luteosDesignQueryDesignTaskItemType02List({});
      const itemTypeMap = keyBy(res.itemTypeList || [], 'itemType');
      itemTypeTextMap.value = Object.keys(itemTypeMap).reduce(
        (prev, key) => ({
          ...prev,
          [Number(key)]: itemTypeMap[key].itemTypeName,
        }),
        {} as Record<number, string>
      );
    } catch {}
    rebuildDesignerStatisticItemTypeList();
  };
  queryDesignItemTypeAuth();
  queryTaskItemTypeText();

  // 查询设计师
  const designerMemberList = ref([]);
  const queryDesignerList = () => {
    designApi
      .luteosDesignQueryDesignerList({
        // itemType: currentItem.value.itemType,
      })
      .then((res) => {
        designerMemberList.value = res.designerList || [];
      });
  };

  queryDesignerList();

  const pageSizeOption = ref([10, 20, 50, 100]);

  // 配置切换
  const handleSelectTypeClick = (type) => {
    selectType.value = type;
    nextTick(() => {
      runQuery();
    });
  };

  // tab切换
  const handleNavClick = (type) => {
    currentItem.value.itemType = type;
    if (isShowDate.value) {
      if (selectType.value === 3) {
        currentItem.value.date = [formattedFirstDay, formattedLastDay];
      }
    }
    // queryDesignerList();
    nextTick(() => {
      runQuery();
    });
  };

  // 页数切换
  const handlePageSizeChange = (val) => {
    currentItem.value.pageSize = val;
    runQuery();
  };

  // 页码切换
  const handleCurrentChange = (val) => {
    currentItem.value.current = val;
    runQuery();
  };

  const { loading: exportLoading1, run: exportDesignScore } = useRequest(
    designApi.luteosDesignStatisticAnalysisExportDesignScoreStatistic,
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

  const { loading: exportLoading2, run: exportDesigner } = useRequest(
    designApi.luteosDesignStatisticAnalysisExportDesignerStatistic,
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

    let data: any = {};
    if (selectType.value === 1) {
      data = {
        pageNum: currentItem.value.current,
        pageSize: currentItem.value.pageSize,
        keyword: currentItem.value.keyword,
        itemType: currentItem.value.itemType,
        startDate: currentItem.value.date ? currentItem.value.date[0] : '',
        endDate: currentItem.value.date ? currentItem.value.date[1] : '',
      };
      exportDesignScore(data);
    } else if (selectType.value === 2) {
      data = {
        pageNum: currentItem.value.current,
        pageSize: currentItem.value.pageSize,
        itemType: currentItem.value.itemType,
      };
      if (isShowDate.value && currentItem.value.date && currentItem.value.date.length > 1) {
        data.startDate = currentItem.value.date[0];
        data.endDate = currentItem.value.date[1];
      }
      exportDesigner(data);
    }
  };

  const reset = () => {
    currentItem.value.keyword = '';
    currentItem.value.date = [];
    currentItem.value.current = 1;
    currentItem.value.pageSize = 10;
    currentItem.value.designerCode = '';
    currentItem.value.selectDate = '';
    currentItem.value.status = '';
    if (currentItem.value.isShowItem) {
      currentItem.value.itemType = currentItem.value.itemTypeList[0].type;
    }

    if (isShowDate.value) {
      if (selectType.value === 3) {
        currentItem.value.date = [formattedFirstDay, formattedLastDay];
      }
    }

    debouncedRunQuery();
  };

  // 查询
  const runQuery = () => {
    // 设置API，和接口返回的key
    let { api, resKey } = currentItem.value;

    if (currentItem.value.useItemTypeApi) {
      const itemInfo =
        currentItem.value.itemTypeList.find((item) => item.type === currentItem.value.itemType) ||
        {};
      api = itemInfo.api;
      resKey = itemInfo.resKey;
    }
    const data = {
      keyword: currentItem.value?.keyword,
      pageNum: currentItem.value?.current,
      pageSize: currentItem.value?.pageSize,
      itemType: currentItem.value?.itemType === 99 ? undefined : currentItem.value?.itemType,
      designType: currentItem.value?.itemType === 99 ? undefined : currentItem.value?.itemType,
      designerCode: currentItem.value?.designerCode,
      status: currentItem.value?.status,
      selectDate: currentItem.value?.selectDate,
    };

    if (isShowDate.value && currentItem.value.date && currentItem.value.date.length > 1) {
      data.startDate = currentItem.value.date[0];
      data.endDate = currentItem.value.date[1];
    }
    designApi[api](data).then((res: any) => {
      currentItem.value.list = res[resKey] || [];
      currentItem.value.total = res.total || 0;
    });
  };
  const debouncedRunQuery = useDebounceFn(runQuery, 300);
  onMounted(() => {
    runQuery();
  });
</script>

<style scoped lang="scss">
  .btn-tab {
    margin: 20px 0 0 30px;
  }

  .tab-content {
    margin: 20px 20px 0 30px;
  }

  .card-pane {
    background: #f4f6fa;
  }

  .mb-10 {
    margin-bottom: 5px !important;
  }

  .my-table {
    padding: 0 30px 30px 30px;
  }

  .nav-item {
    cursor: pointer;
  }
  .margin-right-10 {
    margin-right: 10px;
  }
  .margin-left-10 {
    margin-left: 10px;
  }
</style>
