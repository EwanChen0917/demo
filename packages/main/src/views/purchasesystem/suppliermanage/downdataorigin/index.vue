<template>
  <div class="card rt_card h-100">
    <div class="card-header border-0 pt-5 mb_16">
      <div class="card-title" style="flex: 1; align-items: center; justify-content: space-between">
        <div class="d-flex position-relative my-1">
          <SearchInput
            v-model:modelValue="filterForm.keyword"
            @enter-key-fn="enterKeyFn"
            placeholder="搜索名字"
            class="wid_240 mr_12"
          />
        </div>
        <div class="d-flex" style="justify-content: flex-end; height: 3.35rem">
          <button
            class="btn btn-primary btn-sm btn-flex txt_nowrap mr_12 select2-selection"
            @click="submitFn"
          >
            查询
          </button>
          <button class="btn btn-primary btn-sm btn-flex txt_nowrap mr_12" @click="reset">
            重置
          </button>
        </div>
      </div>
    </div>
    <div class="card-body pt-0 rt_card_body" style="z-index: 0">
      <Table
        :table-data="tableData"
        :pageInfo="pageInfo"
        @pagin="pagin"
        @table-btn-action="tableBtnAction"
      />
    </div>
  </div>
  <RedactModal
    v-if="redactVisible"
    :visible="redactVisible"
    :title="modelTitle"
    :info="info"
    @close-modal="closeModalRedact"
  />
  <EleConfirm
    v-if="outVisible"
    :visible="outVisible"
    :confirmTxt="confirmTxt"
    :iconType="iconType"
    leftBtnTxt="确定"
    rightBtnTxt="取消"
    @close-modal="outModalClose"
  />
</template>

<script setup lang="ts">
  import { useCar } from '@/store/modules/notificationStore';
  import Table from './Table/index.vue';
  import RedactModal from './Modal/redactModal.vue';
  // import { baseStore } from '@/store/modules/baseStore';
  // import { querySaleOrder } from '@/apis/favourProject';

  // const baseStoreFn = baseStore();
  // let { setTableLoading } = baseStoreFn;
  const notificationInfo = useCar();
  const state = reactive<{
    filterForm: any;
    tableData: any;
    pageInfo: pageInfoItf;
    redactVisible: boolean;
    modelTitle: string;
    info: any;
    outVisible: boolean;
    confirmTxt: string;
    iconType: string;
  }>({
    filterForm: {
      userCode: '',
      keyword: '',
    },
    tableData: [],
    pageInfo: {
      currentPage: 1,
      size: 10,
      total: 0,
    },
    redactVisible: false,
    modelTitle: '',
    info: {},
    outVisible: false,
    confirmTxt: '',
    iconType: '',
  });

  const {
    filterForm,
    tableData,
    pageInfo,
    redactVisible,
    modelTitle,
    info,
    outVisible,
    confirmTxt,
    iconType,
  } = toRefs(state);

  const closeModalRedact = (r?: 'reload', obj?: any) => {
    if (r == 'reload') {
      // 提交表单
      notificationInfo.notificationInfo = { notification: '下载中', title: info.value.label };
      // 打开土司组件
      getTableData();
      redactVisible.value = false;
    } else {
      redactVisible.value = false;
    }
  };

  const outModalClose = (r?: 'reload') => {
    if (r == 'reload') {
      // 提交表单
      // 打开土司组件
      notificationInfo.notificationInfo = { notification: '下载中', title: info.value.label };
      outVisible.value = false;
    } else {
      outVisible.value = false;
    }
  };

  const tableBtnAction = (type: string, row?: any) => {
    if (type == 'down') {
      info.value = row;
      modelTitle.value = row.label;
      const key = ['销量数据-亚马逊', '销量数据-独立站', '销量数据-沃尔玛'];
      // 该情况需要选择时间
      if (key.find((item) => row.label.includes(item))) {
        redactVisible.value = true;
      } else {
        // 直接提示下载
        confirmTxt.value = `确定要导出 ${row.label} 数据吗`;
        outVisible.value = true;
      }
    }
  };

  const getTableData = (filterObj = {}) => {
    tableData.value = [
      {
        downCode: '1234',
        label: '销量数据-亚马逊.csv',
        type: '销售类型',
        explain: '同步易仓数据。易仓-销售统计-日报-Seeller Sku',
      },
      {
        downCode: '1122',
        label: '销量数据-独立站.csv',
        type: '销售类型',
        explain: '同步独立站平台销售数据',
      },
      {
        downCode: '1333',
        label: '销量数据-沃尔玛.csv',
        type: '销售类型',
        explain: '同步易仓-销售-Walmart-Item表现',
      },
      {
        downCode: '1223',
        label: '未到Po.csv',
        type: '销售类型',
        explain: '同步易仓-销售-Walmart-Item表现',
      },
      {
        downCode: '1232',
        label: '货件在途-亚马逊.csv',
        type: '销售类型',
        explain: '同步易仓-销售-Walmart-Item表现',
      },
      {
        downCode: '122222',
        label: '中仓库存.csv',
        type: '销售类型',
        explain: '同步易仓-销售-Walmart-Item表现',
      },
      {
        downCode: '122232322',
        label: '平台库存-独立站.csv',
        type: '销售类型',
        explain: '同步易仓-销售-Walmart-Item表现',
      },
    ];

    // const { currentPage, size } = pageInfo.value;
    // const { keyword, userCode } = filterForm.value;
    // let data: any = { pageNum: currentPage, pageSize: size, keyword: keyword, userCode: userCode };
    // data = { ...filterObj, ...data };
    // setTableLoading(true);
    // querySaleOrder(data)
    //   .then((res) => {
    //     if (res.code == 200) {
    //       let list = res.result.orderList || [];
    //       tableData.value = [...list];
    //       pageInfo.value.total = res.result.total || 0;
    //     }
    //   })
    //   .finally(() => {
    //     setTableLoading(false);
    //   });
  };

  getTableData();

  const pagin = (type: string, data: number) => {
    type === 'curPage' && (pageInfo.value.currentPage = data);
    type === 'pagesize' && ((pageInfo.value.currentPage = 1), (pageInfo.value.size = data));
    getTableData();
  };

  const enterKeyFn = (val: string) => {
    filterForm.value.keyword = val;
    getTableData();
  };
  const reset = () => {
    for (const key in filterForm.value) {
      if (typeof filterForm.value[key] === 'object') {
        filterForm.value[key] = [];
      } else {
        filterForm.value[key] = '';
      }
    }
    filterForm.value.status = '';
    getTableData();
  };

  const submitFn = () => {
    const obj: any = {};
    for (const key in filterForm.value) {
      if (typeof filterForm.value[key] === 'object') {
        if (filterForm.value[key]?.length > 0) {
          const str = filterForm.value[key].join(',');
          obj[key] = str.slice(0, str.length);
        } else {
          obj[key] = '';
        }
      } else {
        obj[key] = filterForm.value[key];
      }
    }
    // elepopRef.value.hide();
    getTableData(obj);
  };
</script>

<style lang="scss" scoped>
  .h_335 {
    height: 3.35rem;
  }
</style>
