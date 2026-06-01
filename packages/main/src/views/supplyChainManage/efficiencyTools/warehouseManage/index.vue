<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="仓库名称/仓库代码">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select
        style="width: 140px"
        v-model="search.warehouseType"
        placeholder="仓库类型"
        filterable
        clearable
      >
        <el-option v-for="(key, val) in warehouseTypeMap" :key="val" :label="key" :value="val" />
      </el-select>
      <el-select
        style="width: 140px"
        v-model="search.channel"
        placeholder="归属渠道"
        filterable
        clearable
      >
        <el-option
          v-for="channel of channelList"
          :key="channel.value"
          :label="channel.desc"
          :value="channel.value"
        />
      </el-select>
      <CountrySelect
        v-model="search.country"
        style="width: 140px"
        placeholder="归属国家"
        filterable
        clearable
      />

      <el-select
        style="width: 120px"
        v-model="search.status"
        placeholder="归属状态"
        filterable
        clearable
      >
        <el-option label="开启" :value="0" />
        <el-option label="关闭" :value="1" />
      </el-select>
    </template>
    <template #buttons>
      <a
        href="https://finebi.luteos.com/webroot/decision#/directory?activeTab=69db9045-c330-4837-8ddd-9297e7044491"
        target="_blank"
        rel="noopener noreferrer"
      >
        <el-button class="button" type="primary">库存统计</el-button>
      </a>
      <el-button
        class="button"
        type="primary"
        @click="detailDialogRef.open({}, 'add')"
        v-permission="'warehouseAdd'"
      >
        新增
      </el-button>
      <!-- <el-button type="primary" @click="runQuery">查询</el-button> -->
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="productSku"
      class-name="table-row-dashed"
    >
      <el-table-column prop="warehouseName" label="仓库名称" />
      <el-table-column prop="warehouseCode" label="仓库代码" />
      <el-table-column prop="channelDesc" label="归属渠道" />
      <el-table-column prop="countryDesc" label="归属国家" />
      <el-table-column prop="statusDesc" label="归属状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </el-table-column>
      <el-table-column prop="statusDesc" label="仓库类型">
        <template #default="{ row }">
          <span>{{ warehouseTypeMap[row?.warehouseType] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作" width="140px" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row,
                permissionCode: 'warehouseEdit',
              },
              {
                label: '关闭',
                key: 'close',
                type: 'primary',
                text: true,
                hide: row.status === 1,
                row,
                permissionCode: 'warehouseChangeStatus',
              },
              {
                label: '开启',
                key: 'open',
                type: 'primary',
                text: true,
                hide: row.status === 0,
                row,
                permissionCode: 'warehouseChangeStatus',
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
  <DetailDialog :dickbook="dickbook" ref="detailDialogRef" @success="refreshList" />
</template>

<script lang="ts" setup name="warehouseManage">
  import { erpApi, ErpApi, dataApi, platformApi, PlatformApi } from '@/api/index';
  import { useRouter } from 'vue-router';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import Tag from '@/components/Tag/index.vue';
  import DetailDialog from './components/detailDialog.vue';

  const statusColorMap = ref({
    0: 'green',
    1: 'black',
  });

  const warehouseTypeMap = ref({
    2: '本地仓',
    3: '海外仓',
  });
  const PAGE_SIZE = 10;
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
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpWarehouseAffiliationQueryList.RequestQuery,
    ErpApi.LuteosErpWarehouseAffiliationQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
      country: undefined,
      channel: undefined,
      warehouseType: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpWarehouseAffiliationQueryList,
  });
  // const countiesList = ref<any[]>([]);
  const getCountiesList = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    const countryList = res.countryList!.map((item) => {
      return {
        // label: `${item.countryName}(${item.countryNameEn})`,
        label: item.countryName,
        value: item.countryCode,
      };
    });
    return countryList;
  };
  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      detailDialogRef.value.open(row, 'edit');
    } else if (key === 'open') {
      changeWarehouseStatus(1, row);
    } else if (key === 'close') {
      changeWarehouseStatus(0, row);
    }
  };
  const dickbook: any = ref({
    warehouse_channel: [],
    countryList: [],
  });
  const initDickbook = async () => {
    const res: PlatformApi.PlatformDict.ResponseBody = await platformApi.platformDict({
      dictCodes: ['warehouse_channel'],
    });
    const countryList = await getCountiesList();
    dickbook.value = { ...res.dictMap, countryList };
  };
  const changeWarehouseStatus = async (currentStatus: 0 | 1, row) => {
    const text = currentStatus === 0 ? '关闭' : '开启';
    const res = await swal.confirm({
      title: `确认${text}`,
      html: `
      <p>确定要${text}${row.warehouseCode}【${row.warehouseName}】归属吗？</p>
      <p style="color:red">${text}后将${
        currentStatus === 0 ? '不在' : ''
      }进行库存统计和需求建议计算</p>
      `,
    });
    if (res) {
      await erpApi.luteosErpWarehouseAffiliationChangeStatus({
        warehouseCode: row.warehouseCode,
        status: currentStatus === 0 ? 1 : 0,
      });
      ElMessage.success('操作成功');
      runQuery();
    }
  };

  const channelList = ref([]);
  const queryChannelList = async () => {
    const res = await erpApi.luteosErpWarehouseAffiliationAllList();
    channelList.value = res;
  };

  onMounted(() => {
    initDickbook();
    queryChannelList();
    // getCountiesList();
  });
  const detailDialogRef = ref();
</script>

<style scoped lang="scss"></style>
