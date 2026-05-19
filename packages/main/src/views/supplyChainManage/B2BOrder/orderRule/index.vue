<template>
  <el-tabs v-model="search.type" tab-position="top" @tab-change="myResetSearch">
    <el-tab-pane
      v-for="item in tabStatusList"
      :key="item.status"
      :label="item.statusName"
      :name="item.status"
    >
      <template #label>
        {{ item.statusName }}
      </template>
    </el-tab-pane>
  </el-tabs>
  <BindWarehouse v-if="search.type === 5" />
  <KeenList
    v-else
    @refresh="refreshList"
    @reset-search="myResetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #filters v-if="[1, 4, 9, 10].includes(search.type)">
      <el-input
        v-if="[1, 4, 9, 10].includes(search.type)"
        style="width: 200px"
        v-model="search.ruleName"
        placeholder="请输入规则名称"
        clearable
      />
      <el-select
        v-if="[1, 4, 9, 10].includes(search.type)"
        v-model="search.creatorCodes"
        placeholder="创建人"
        clearable
        filterable
        multiple
      >
        <el-option
          v-for="item in creatorList"
          :key="item.creatorCode"
          :value="item.creatorCode"
          :label="item.creatorName"
        />
      </el-select>
      <el-select
        v-if="[1, 4, 9, 10].includes(search.type)"
        v-model="status"
        placeholder="状态"
        clearable
        multiple
        @change="
          (value) =>
            value.length > 1 || value.length == 0
              ? (search.status = undefined)
              : (search.status = value[0])
        "
      >
        <el-option label="启用" :value="0" />
        <el-option label="禁用" :value="1" />
      </el-select>
    </template>
    <template #search v-else-if="[11, 12, 14, 16, 17, 18, 20, 21].includes(search.type)">
      <div style="display: flex; gap: 8px">
        <DeptMember
          size="small"
          v-model="search.creator"
          placeholder="创建人"
          filterable
          clearable
          style="width: 160px"
        />
        <el-select v-model="search.status" placeholder="状态" clearable>
          <el-option label="启用" :value="1" />
          <el-option label="禁用" :value="0" />
        </el-select>
        <el-input
          style="width: 300px"
          v-model="inputStr"
          placeholder="请输入"
          @input="handleSelectChange"
          clearable
        >
          <template #prepend>
            <el-select
              v-model="search.searchType"
              style="width: 110px"
              @change="handleSelectChange(inputStr)"
            >
              <el-option
                v-for="(val, key) in searchTypeMap"
                :value="parseInt(key)"
                :label="val"
                :key="key"
              />
            </el-select>
          </template>
        </el-input>
        <el-input
          v-if="search.type !== 13"
          style="width: 200px"
          v-model="desc"
          placeholder="规则描述"
          @input="handleDescChange"
          clearable
        ></el-input>
      </div>
    </template>
    <template #filters v-else-if="[13].includes(search.type)">
      <DeptMember
        size="small"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        style="width: 160px"
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-select v-model="search.matchMethod" placeholder="匹配模式">
        <el-option label="精确" value="EXACT" />
        <el-option label="模糊" value="LIKE" />
      </el-select>
      <el-input
        style="width: 300px"
        v-model="inputStr"
        placeholder="请输入"
        @input="handleBlacklistSelectChange"
        clearable
      >
        <template #prepend>
          <el-select
            v-model="search.searchType"
            style="width: 110px"
            @change="handleBlacklistSelectChange(inputStr)"
          >
            <el-option
              v-for="(val, key) in blacklistSearchTypeMap"
              :value="parseInt(key)"
              :label="val"
              :key="key"
            />
          </el-select>
        </template>
      </el-input>
    </template>
    <template #filters v-else-if="[15].includes(search.type)">
      <DeptMember
        size="small"
        v-model="search.creator"
        placeholder="创建人"
        filterable
        clearable
        style="width: 160px"
      />
      <el-select v-model="search.status" placeholder="状态" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-input
        style="width: 300px"
        v-model="inputStr"
        placeholder="请输入"
        @input="handleMultipleSelectChange"
        clearable
      >
        <template #prepend>
          <el-select
            v-model="search.searchType"
            style="width: 110px"
            @change="handleMultipleSelectChange(inputStr)"
          >
            <el-option
              v-for="(val, key) in mulSearchTypeMap"
              :value="parseInt(key)"
              :label="val"
              :key="key"
            />
          </el-select>
        </template>
      </el-input>
      <el-input style="width: 200px" v-model="search.supplySku" placeholder="请输入SKU" clearable />
    </template>
    <template #filters v-else-if="[19].includes(search.type)">
      <ProductChannelSelect
        style="width: 200px"
        v-model="search.channelList"
        placeholder="平台"
        clearable
        multiple
        @change="
          () => {
            search.shopCodeList = [];
            queryShop();
          }
        "
      />
      <CountrySelect
        v-model="search.siteList"
        placeholder="站点"
        multiple
        clearable
        class="w-200px"
      />
      <el-select
        style="width: 200px"
        v-model="search.shopCodeList"
        placeholder="店铺"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <el-option
          v-for="item in shopMap"
          :value="item.shopCode"
          :label="item.shopAccount"
          :key="item.shopCode"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="add" v-show="search.type === 1">新增审核流</el-button>
      <el-button type="primary" @click="addRule" v-show="search.type === 4">新增分仓规则</el-button>
      <el-button type="primary" @click="addSplitRule" v-show="search.type === 7">
        新增拆单规则
      </el-button>
      <el-button type="primary" @click="addWarehouseRule" v-show="search.type === 8">
        新增仓库规则
      </el-button>
      <el-button type="primary" @click="addTaxRule" v-show="search.type === 9">
        新增计税规则
      </el-button>
      <el-button type="primary" @click="addDistributeRule" v-show="search.type === 10">
        新增分发系统规则
      </el-button>
      <el-button type="primary" @click="addShippingRule" v-show="search.type === 11">
        新增收件信息规则
      </el-button>
      <el-button type="primary" @click="addSelfFullFillMentRule" v-show="search.type === 12">
        新增生成自发货规则
      </el-button>
      <el-button type="primary" @click="addTrenderRule" v-show="search.type === 14">
        新增标发规则
      </el-button>
      <el-button type="primary" @click="addBlacklistRule" v-show="search.type === 13">
        新增黑名单规则
      </el-button>
      <el-button type="primary" @click="addMultipleSuppliesRule" v-show="search.type === 15">
        新增一品多供规则
      </el-button>
      <el-button type="primary" @click="auditRule('add')" v-show="search.type === 16">
        新增审核规则
      </el-button>
      <el-button type="primary" @click="splitRule('add')" v-show="search.type === 17">
        新增拆单规则
      </el-button>
      <el-button type="primary" @click="addWarehouseRuleNew" v-show="search.type === 18">
        新增仓库规则
      </el-button>
      <el-button type="primary" @click="addMergeRule" v-show="search.type === 20">
        新增合单规则
      </el-button>
      <el-button type="primary" @click="addGiftRule" v-show="search.type === 21">
        新增赠品规则
      </el-button>
      <!-- <el-button @click="1" v-show="[13, 15].includes(search.type)">导入</el-button>
      <el-button @click="1" v-show="[13, 15].includes(search.type)">导出</el-button> -->
      <el-button
        @click="batchChangeStatus({ status: 0 })"
        v-show="search.type > 10 && search.type < 19"
        :disabled="search.status === 1"
      >
        启用
      </el-button>
      <el-button
        @click="batchChangeStatus({ status: 1 })"
        v-show="search.type > 10 && search.type < 19"
        :disabled="search.status === 0"
      >
        禁用
      </el-button>
      <el-button @click="BatchDeleteRule" v-show="search.type > 10 && search.type < 19">
        删除
      </el-button>
      <!-- <el-button type="primary" @click="blacklistImportVisible = true" v-show="search.type === 13">
        导入
      </el-button>
      <ExportBtn
        v-if="search.type === 13"
        :service="omsApi.omsRuleBlacklistExport"
        :params="blacklistExportParams"
      >
        导出
      </ExportBtn> -->
      <el-button @click="BatchSetTaxNo" v-show="search.type === 19">批量设置</el-button>
      <!-- <el-button @click="handleBlackListLog" v-show="search.type === 13">日志</el-button> -->
      <!-- :service="" -->
      <ExportBtn
        :service="erpApi.luteosErpBaseFlowExportList"
        v-if="[1, 4, 9, 10].includes(search.type)"
        :params="{
          ...search,
        }"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      class="border-table"
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      :row-key="search.type > 10 ? 'ruleNo' : 'code'"
      @selection-change="handleSelectionChange"
    >
      <template v-if="search.type <= 10">
        <el-table-column prop="code" label="规则编码" v-if="[7, 8].includes(search.type)" />
        <el-table-column prop="name" :label="search.type === 1 ? '审核规则名称' : '规则名称'" />
        <el-table-column prop="priority" label="优先级" />
        <el-table-column prop="nodeNums" label="审核节点" v-if="search.type === 1" />
        <el-table-column prop="creatorDesc" label="创建人" />
        <el-table-column prop="ruleDesc" label="生效规则" v-if="[7, 8].includes(search.type)" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <Tag :color="colorMap[row.status]">{{ row.statusDesc }}</Tag>
          </template>
        </el-table-column>
      </template>
      <template v-else-if="search.type === 13">
        <el-table-column type="selection" width="60" reserve-selection />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="matchMethodName" label="匹配方式" />
        <el-table-column prop="content" label="黑名单内容" />
        <el-table-column prop="blockedReason" label="拉黑原因" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <Tag :color="newColorMap[row.status]">{{ row.statusDesc }}</Tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="创建人" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="updatedName" label="更新人" />
        <el-table-column prop="updatedTime" label="更新时间" />
      </template>
      <template v-else-if="search.type === 15">
        <el-table-column type="selection" width="60" reserve-selection />
        <el-table-column prop="ruleNo" label="产品集ID" />
        <el-table-column prop="name" label="产品集名称" />
        <el-table-column prop="supplySkus" label="SKU">
          <template #default="{ row }">
            {{ row.supplySkus && row.supplySkus[0] }} 共
            <el-tooltip effect="light" placement="bottom">
              <template #content>
                <div v-for="item in row.supplySkus" :key="item">{{ item }}</div>
              </template>
              <el-link underline="never" type="primary">{{ row.supplySkuCount }}</el-link>
            </el-tooltip>
            个
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <Tag :color="newColorMap[row.status]">{{ row.statusDesc }}</Tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="创建人" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="updatedName" label="更新人" />
        <el-table-column prop="updatedTime" label="更新时间" />
      </template>
      <template v-else-if="search.type === 19">
        <el-table-column type="selection" width="60" reserve-selection />
        <el-table-column prop="channel" label="平台" />
        <el-table-column prop="countryCode" label="国家/地区" />
        <el-table-column prop="shopCode" label="店铺" />
        <el-table-column prop="iossNumber" label="税号" />
      </template>
      <template v-else>
        <el-table-column type="selection" width="60" reserve-selection />
        <el-table-column prop="priority" label="优先级" />
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="ruleNo" label="规则ID" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <Tag :color="newColorMap[row.status]">{{ row.statusDesc }}</Tag>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveTimeBegin" label="生效时间" />
        <el-table-column prop="description" label="规则描述">
          <template #default="{ row }">
            <OverflowTooltip :content="row.description" :line="2" color="#718299" />
          </template>
        </el-table-column>
        <el-table-column prop="createdName" label="创建人" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="updatedName" v-if="[16, 17].includes(search.type)" label="更新人" />
        <el-table-column
          prop="updatedTime"
          v-if="[16, 17].includes(search.type)"
          label="更新时间"
        />
      </template>

      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                row: row,
                hide:  [13,15,19].includes(search.type),
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                text: true,
                row: row,
                hide:  [19].includes(search.type),
              },
              {
                label: '复制',
                key: 'copy',
                type: 'primary',
                text: true,
                hide: ![4, 7, 8,11,12,14, 16, 17,18,21].includes(search.type),
                row: row,
              },
              {
                label: '禁用',
                key: 'close',
                type: 'danger',
                text: true,
                // hide: ![0].includes(+row.status),
                hide:
                  (search.type as any <= 10 && ![0].includes(+row.status)) ||
                  (search.type as any > 10 && ![1].includes(+row.status)),
                row: row,
              },
              {
                label: '启用',
                key: 'open',
                type: 'success',
                text: true,
                // hide: ![1].includes(+row.status),
                hide:
                  (search.type as any <= 10 && ![1].includes(+row.status)) ||
                  (search.type as any > 10 && ![0].includes(+row.status)),
                // hide: ![1].includes(+row.status),
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'primary',
                text: true,
                hide: search.type < 10||[19].includes(search.type),
                row: row,
              },
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                text: true,
                hide: ![4, 7, 8, 9, 10, 11, 12,13, 14, 15,16, 17,18,19,21].includes(search.type),
                row: row,
              },
              {
                label: '设置税号',
                key: 'taxNoSet',
                type: 'primary',
                text: true,
                hide: ![19].includes(search.type),
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
  <LogDialog ref="logRef" />
  <LogDialog2 ref="logRef2" />
  <editTaxNumberModal ref="editTaxNumberModalRef" @success="handleTaxUpdated" />
  <BatchUpdateModal
    v-if="blacklistImportVisible"
    :visible="blacklistImportVisible"
    importScene="rule_blacklist_import"
    title="导入黑名单规则"
    @close="onBlacklistImportClose"
  />
</template>

<script lang="ts" setup name="orderRule">
  import { watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { erpApi, ErpApi, omsApi, shopApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { useStore } from '@/store/modules/useStore';
  import LogDialog from '@/views/supplyChainManage/B2BOrder/orderRule/components/logDialog.vue';
  import LogDialog2 from '@/views/supplyChainManage/B2BOrder/orderRule/components/logDialog2.vue';
  import BindWarehouse from '@/views/supplyChainManage/B2BOrder/orderRule/bindWarehouse.vue';
  // import { ruleType } from '@/views/finance/income/incomeRule/enum';
  import editTaxNumberModal from '@/views/supplyChainManage/B2BOrder/orderRule/components/editTaxNumberModal.vue';
  import BatchUpdateModal from '@/views/supplyChainManage/B2BOrder/orderRule/components/OmsBatchUpdateModal.vue';
  import DeptMember from '@/views/supplyChainManage/requisition/components/DeptMember.vue';

  interface baseSearchType extends ErpApi.LuteosErpBaseFlowQueryList.RequestBody {
    name: any;
    ruleNo: any;
    type: any;
    sceneCode: any;
    matchMethod: any;
    content: any;
    blockedReason: any;
    searchType: any;
    /** OMS 规则列表：创建人（单选，与 DeptMember 的 memberCode 一致） */
    creator?: string;
  }
  const activedTab = 1;
  const searchTypeMap = {
    1: '规则名称',
    2: '规则ID',
  };
  const editTaxNumberModalRef = ref();
  const inputStr = ref();
  const desc = ref('');
  // 规则描述变化
  const handleDescChange = (val) => {
    // console.log(val);
    if (val && val.length < 2) {
      return;
    }
    search.description = val;
  };
  const handleSelectChange = (val) => {
    search.name = undefined;
    search.ruleNo = undefined;
    // console.log(val);
    if (val && val.length < 3) {
      return;
    }
    if (search.searchType === 1) {
      search.name = val;
    } else if (search.searchType === 2) {
      search.ruleNo = val;
    }
  };
  // 黑名单搜索
  const blacklistSearchTypeMap = {
    1: '黑名单内容',
    2: '拉黑原因',
  };
  const handleBlacklistSelectChange = (val) => {
    search.content = undefined;
    search.blockedReason = undefined;
    // console.log(val);
    if (val && val.length < 3) {
      return;
    }
    if (search.searchType === 1) {
      search.content = val;
    } else if (search.searchType === 2) {
      search.blockedReason = val;
    }
  };
  // 一品多供搜索
  const mulSearchTypeMap = {
    1: '产品集ID',
    2: '产品集名称',
  };
  const handleMultipleSelectChange = (val) => {
    search.ruleNo = undefined;
    search.name = undefined;
    console.log(val, search.searchType);
    if (val && val.length < 3) {
      return;
    }
    if (search.searchType === 1) {
      search.ruleNo = val;
    } else if (search.searchType === 2) {
      search.name = val;
    }
  };
  const handleBlackListLog = async () => {
    const row = {
      ruleNo: '',
      sceneCode: 'blacklist',
    };
    const logList = await getLoglist(row);
    if (logList?.length > 0) logRef2.value.open(logList);
    else ElMessage.warning('暂无日志');
  };

  const codeList = ref<any[]>([]);
  const handleSelectionChange = (list) => {
    const map = new Map<any, any>();
    list.forEach((item) => {
      const key = item.ruleNo ?? item.code;
      if (key !== undefined && key !== null) {
        map.set(key, item);
      }
    });
    codeList.value = Array.from(map.values());
  };
  // 获取店铺
  const shopMap: any = ref([]);
  const queryShop = async () => {
    const res = await shopApi.luteosShopQueryShopCommonList({
      errorStatus: '1',
      platformCodes: search?.channelList || [],
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取店铺', res);
    shopMap.value = res.shopListDetailResps || [];
  };
  // 获取创建人列表
  const creatorList: any = ref([]);
  const getCreatorList = async () => {
    const res = await erpApi.luteosErpBaseFlowQueryCreatorList({
      pageNum: 1,
      pageSize: 100000,
    });
    creatorList.value = res.creatorList || [];
  };
  // queryShop();
  onMounted(() => {
    queryShop();
    getCreatorList();
  });
  // 税务规则
  const tabStatusList = [
    { status: 1, statusName: '审核流设置' },
    { status: 4, statusName: '分仓规则' },
    { status: 5, statusName: '绑定发货仓库' },
    // { status: 7, statusName: '拆单规则' },
    // { status: 8, statusName: '仓库规则' },
    { status: 9, statusName: 'B2B订单计税规则' },
    { status: 10, statusName: '分发系统规则' },
    { status: 13, statusName: '黑名单规则' },
    { status: 12, statusName: '生成自发货规则' },
    { status: 21, statusName: '赠品规则' },
    { status: 17, statusName: '拆单规则' },
    // { status: 20, statusName: '合单规则' },
    { status: 18, statusName: '仓库规则' },
    { status: 16, statusName: '审核规则' },
    { status: 11, statusName: '收件信息规则' },
    // { status: 19, statusName: '税务规则' },
    { status: 14, statusName: '标发规则' },
    { status: 15, statusName: '一品多供规则' },
  ];
  // const importUpdateDialogRef = ref();
  // const store = useStore();
  const colorMap = {
    0: 'green',
    1: 'red',
  };
  const newColorMap = {
    0: 'red',
    1: 'green',
  };
  const router = useRouter();
  const route = useRoute();
  const tableRef = ref();
  const { code } = route.query as {
    code?: string;
  };
  // const serviceMap: Record<number, any> = {
  //   1: erpApi.luteosErpBaseFlowQueryList,
  //   4: erpApi.luteosErpBaseFlowQueryList,
  //   7: erpApi.luteosErpBaseFlowQueryList,
  //   8: erpApi.luteosErpBaseFlowQueryList,
  //   9: erpApi.luteosErpBaseFlowQueryList,
  //   10: erpApi.luteosErpBaseB2BClientQueryList,
  // };
  const PAGE_SIZE = 10;
  // 不同 Tab 使用不同列表接口
  const dynamicService = (query, params?) => {
    const type = Number(query?.type);
    let svc;
    if (type <= 10) {
      svc = erpApi.luteosErpBaseFlowQueryList;
    } else if (type === 13) {
      svc = omsApi.omsRuleBlacklistQueryList;
    } else if (type === 15) {
      svc = omsApi.omsRuleMultipleSuppliesQueryList;
    } else if (type === 19) {
      svc = omsApi.omsRuleTaxQueryList;
    } else {
      // 新增type 都超过10
      svc = omsApi.omsRuleQueryList;
    }
    return svc(query, params);
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
    resetSearch,
    runQuery,
  } = useList<baseSearchType, ErpApi.LuteosErpBaseFlowQueryList.ResponseBody>({
    searchDefaults: {
      type: 1,
      description: undefined,
      status: undefined,
      searchType: 1 as any,
      name: undefined,
      ruleNo: undefined,
      sceneCode: undefined,
      matchMethod: 'EXACT',
      content: undefined,
      blockedReason: undefined,
      supplySku: undefined,
      // channel: undefined,
      // site: undefined,
      channelList: undefined,
      siteList: undefined,
      shopCodeList: undefined,
      creatorCodes: undefined,
      creator: undefined,
      ruleName: undefined,
    },
    pageSize: PAGE_SIZE,
    // service: erpApi.luteosErpBaseFlowQueryList,
    service: dynamicService,
    onSuccess: () => {
      tableRef.value?.clearSelection();
    },
  });
  const blacklistImportVisible = ref(false);
  const onBlacklistImportClose = (reload?: boolean) => {
    if (reload) {
      refreshList();
    }
    blacklistImportVisible.value = false;
  };
  /** 黑名单导出：筛选条件与列表一致；分页用首页最大条数（接口 pageSize 上限 100） */
  const blacklistExportParams = computed(() => ({
    pageNum: 1,
    pageSize: 100,
    status: search.status,
    matchMethod: search.matchMethod,
    content: search.content,
    blockedReason: search.blockedReason,
    creator: search.creator,
  }));
  // 根据 type 动态设置 sceneCode
  watch(
    () => search.type,
    (type) => {
      if (type <= 10) {
        search.status = undefined;
      }
      if (type > 10) {
        search.status = 1;
      }
      if (type === 12) {
        search.sceneCode = 'self_shipped';
      } else if (type === 11) {
        search.sceneCode = 'recipient';
      } else if (type === 13) {
        search.sceneCode = 'blacklist';
      } else if (type === 14) {
        search.sceneCode = 'mark_shipped';
      } else if (type === 15) {
        search.sceneCode = 'multiple_supplies';
      } else if (type === 16) {
        search.sceneCode = 'audit';
      } else if (type === 17) {
        search.sceneCode = 'split';
      } else if (type === 18) {
        search.sceneCode = 'warehouse';
      } else if (type === 19) {
        search.sceneCode = 'tax';
      } else if (type === 20) {
        search.sceneCode = 'merge';
      } else if (type === 21) {
        search.sceneCode = 'gift';
      } else {
        search.sceneCode = undefined;
      }
    },
    { immediate: true }
  );

  const status = ref([]);

  const myResetSearch = () => {
    inputStr.value = undefined;
    search.searchType = 1;
    search.name = undefined;
    search.ruleNo = undefined;
    search.status = undefined;
    search.supplySku = undefined;
    search.content = undefined;
    search.blockedReason = undefined;
    search.channelList = undefined;
    search.siteList = undefined;
    search.shopCodeList = undefined;
    desc.value = '';
    search.description = undefined;
    // resetSearch();
    search.creatorCodes = undefined;
    search.creator = undefined;
    status.value = [];
    search.ruleName = undefined;
  };

  const add = () => {
    const path = router.resolve({
      name: 'orderRuleAdd',
    });
    router.push(path.href);
  };

  const addRule = () => {
    const path = router.resolve({
      name: 'orderRuleAddRule',
      query: {
        ruleType: 4,
      },
    });
    router.push(path.href);
  };

  const addSplitRule = () => {
    const path = router.resolve({
      name: 'addSplitRule',
      query: {
        ruleType: 7,
      },
    });
    router.push(path.href);
  };

  const addWarehouseRule = () => {
    const path = router.resolve({
      name: 'addWarehouseRule',
      query: {
        ruleType: 8,
      },
    });
    router.push(path.href);
  };
  const addWarehouseRuleNew = () => {
    const path = router.resolve({
      name: 'addWarehouseRuleNew',
      query: {
        ruleType: 18,
      },
    });
    router.push(path.href);
  };
  const addMergeRule = () => {
    const path = router.resolve({
      name: 'addMergeRule',
      query: {
        ruleType: 20,
      },
    });
    router.push(path.href);
  };
  const addGiftRule = () => {
    const path = router.resolve({
      name: 'addGiftRule',
      query: {
        ruleType: 21,
      },
    });
    router.push(path.href);
  };
  const addTaxRule = () => {
    const path = router.resolve({
      name: 'addTaxRule',
      query: {
        ruleType: 9,
      },
    });
    router.push(path.href);
  };

  const addDistributeRule = () => {
    const path = router.resolve({
      name: 'addDistributeSystemRule',
      query: {
        ruleType: 10,
      },
    });
    router.push(path.href);
  };

  const addShippingRule = () => {
    const path = router.resolve({
      name: 'addShippingRule',
      query: {
        ruleType: 11,
      },
    });
    router.push(path.href);
  };

  const addSelfFullFillMentRule = () => {
    const path = router.resolve({
      name: 'addSelfFulFillMentRule',
      query: {
        ruleType: 12,
      },
    });
    router.push(path.href);
  };
  const addTrenderRule = () => {
    const path = router.resolve({
      name: 'addTrenderRule',
      query: {
        ruleType: 14,
      },
    });
    router.push(path.href);
  };
  const addBlacklistRule = () => {
    const path = router.resolve({
      name: 'addBlacklistRule',
      query: {
        ruleType: 13,
      },
    });
    router.push(path.href);
  };
  const addMultipleSuppliesRule = () => {
    const path = router.resolve({
      name: 'addMultipleSuppliesRule',
      query: {
        ruleType: 15,
      },
    });
    router.push(path.href);
  };

  // 审核规则
  const auditRule = (type) => {
    const path = router.resolve({
      name: `${type}AuditRule`,
      query: {
        ruleType: 16,
      },
    });
    router.push(path.href);
  };

  // 拆单规则新
  const splitRule = (type) => {
    const path = router.resolve({
      name: `${type}NewSplitRule`,
      query: {
        ruleType: 17,
      },
    });
    router.push(path.href);
  };

  const logRef = ref();
  // 新日志
  const logRef2 = ref();

  const getLoglist = async (row) => {
    let sceneCode = search.sceneCode ?? '';
    if (search.type === 11) {
      sceneCode = 'recipient';
    }
    if (search.type === 12) {
      sceneCode = 'self_shipped';
    }
    const res = await omsApi.omsRuleQueryLog({
      ruleNo: row.ruleNo,
      sceneCode,
    });
    return res;
  };
  const pathMap = {
    view: {
      1: '/orderRule/detail',
      4: '/orderRule/detailRule',
      7: '/orderRule/splitRuleDetail',
      8: '/orderRule/warehouseRuleDetail',
      9: '/orderRule/taxRuleDetail',
      10: '/orderRule/distributeSystemRuleDetail',
      11: '/orderRule/shippingRuleDetail',
      12: '/orderRule/detailSelfFulFillMentRule',
      14: '/orderRule/detailTrenderRule',
      16: '/orderRule/auditRuleDetail',
      17: '/orderRule/newSplitRuleDetail',
      18: '/orderRule/warehouseRuleDetailNew',
      21: '/orderRule/giftRuleDetail',
    },
    edit: {
      1: '/orderRule/edit',
      4: '/orderRule/editRule',
      7: '/orderRule/editSplitRule',
      8: '/orderRule/editWarehouseRule',
      9: '/orderRule/editTaxRule',
      10: '/orderRule/editDistributeSystemRule',
      11: '/orderRule/editShippingRule',
      12: '/orderRule/editSelfFulFillMentRule',
      13: '/orderRule/editBlacklistRule',
      14: '/orderRule/editTrenderRule',
      15: '/orderRule/editMultipleSuppliesRule',
      16: '/orderRule/editAuditRule',
      17: '/orderRule/editNewSplitRule',
      18: '/orderRule/editWarehouseRuleNew',
      21: '/orderRule/editGiftRule',
    },
    copy: {
      4: 'orderRuleAddRule',
      7: 'addSplitRule',
      8: 'addWarehouseRule',
      11: 'addShippingRule',
      12: 'addSelfFulFillMentRule',
      14: 'addTrenderRule',
      16: 'addAuditRule',
      17: 'addNewSplitRule',
      18: 'addWarehouseRuleNew',
      21: 'addGiftRule',
    },
  };
  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'view') {
      if (search.type <= 10) {
        router.push({
          path: pathMap[key][row.type],
          query: { code: row.code },
        });
      } else {
        router.push({
          path: pathMap[key][search.type],
          query: { code: row.ruleNo },
        });
      }
    } else if (key === 'edit') {
      if (search.type <= 10) {
        router.push({
          path: pathMap[key][row.type],
          query: { code: row.code },
        });
      } else {
        router.push({
          path: pathMap[key][search.type],
          query: { code: row.ruleNo },
        });
      }
    } else if (key === 'close' || key === 'open') {
      changeStatus(row);
    } else if (key === 'log') {
      // console.log(row);
      if (search.type <= 10) {
        if (row.logList) logRef.value.open(row.logList);
        else ElMessage.warning('暂无日志');
      } else {
        const logList = await getLoglist(row);
        if (logList?.length > 0) logRef2.value.open(logList);
        else ElMessage.warning('暂无日志');
      }
    } else if (key === 'copy') {
      if (search.type <= 10) {
        router.push({
          name: pathMap[key][row.type],
          params: { type: 'copy', code: row.code },
        });
      } else {
        router.push({
          name: pathMap[key][search.type],
          query: { type: 'copy', code: row.ruleNo },
        });
      }
    } else if (key === 'delete') {
      deleteRule(row);
    } else if (key === 'taxNoSet') {
      setTaxNumber(row);
    }
  };
  const changeStatus = async (row) => {
    if (search.type <= 10) {
      const res = await swal.confirm({
        title: `确认${row.status === 0 ? '关闭' : '开启'}？`,
      });
      if (res) {
        await erpApi.luteosErpBaseFlowChangeStatus({
          code: row.code,
          status: row.status === 0 ? 1 : 0,
        });
        ElMessage.success('操作成功');
        runQuery();
      }
    } else {
      const res = await swal.confirm({
        title: `确认${row.status === 0 ? '开启' : '关闭'}？`,
      });
      if (res) {
        if (search.type === 13) {
          await omsApi.omsRuleBlacklistEnableDisable({
            ruleNos: [row.ruleNo],
            status: row.status === 0 ? 1 : 0,
          });
        } else if (search.type === 15) {
          await omsApi.omsRuleMultipleSuppliesEnableDisable({
            ruleNos: [row.ruleNo],
            status: row.status === 0 ? 1 : 0,
          });
        } else {
          await omsApi.omsRuleEnableDisable({
            ruleNos: [row.ruleNo],
            status: row.status === 0 ? 1 : 0,
          });
        }
        ElMessage.success('操作成功');
        runQuery();
      }
    }
  };
  const batchChangeStatus = async (row) => {
    if (codeList.value?.length === 0) {
      ElMessage.warning('请选择数据');
      return;
    }
    const res = await swal.confirm({
      title: `确认${row.status === 0 ? '开启' : '关闭'}？`,
    });
    const ruleNoArr = codeList.value.map((item) => item.ruleNo);
    if (res) {
      if (search.type === 13) {
        await omsApi.omsRuleBlacklistEnableDisable({
          ruleNos: ruleNoArr,
          status: row.status === 0 ? 1 : 0,
        });
      } else if (search.type === 15) {
        await omsApi.omsRuleMultipleSuppliesEnableDisable({
          ruleNos: ruleNoArr,
          status: row.status === 0 ? 1 : 0,
        });
      } else {
        await omsApi.omsRuleEnableDisable({
          ruleNos: ruleNoArr,
          status: row.status === 0 ? 1 : 0,
        });
      }
      ElMessage.success('操作成功');
      codeList.value = [];
      runQuery();
    }
  };
  const handleDelete = async (ruleNoArr) => {
    const res = await swal.confirm({
      title: `确认删除规则？`,
    });
    if (!res) return;
    if (search.type === 13) {
      await omsApi.omsRuleBlacklistDelete({
        ruleNos: ruleNoArr,
      });
    } else if (search.type === 15) {
      await omsApi.omsRuleMultipleSuppliesDelete({
        ruleNos: ruleNoArr,
      });
    } else {
      await omsApi.omsRuleDelete({
        ruleNos: ruleNoArr,
      });
    }
    codeList.value = [];
    ElMessage.success('删除成功');
    runQuery();
  };
  const deleteRule = async (row) => {
    handleDelete([row.ruleNo]);
  };

  const BatchDeleteRule = async (ruleNoArr) => {
    if (codeList.value?.length === 0) {
      ElMessage.warning('请选择数据');
      return;
    }
    const arr = codeList.value.map((item) => item.ruleNo);
    handleDelete(arr);
  };

  const setTaxNumber = async (row) => {
    // console.log(row, 'row');
    const arr = [row];
    editTaxNumberModalRef.value.open(arr, 1);
  };
  const handleTaxUpdated = () => {
    codeList.value = [];
    runQuery();
  };
  const BatchSetTaxNo = async (ruleNoArr) => {
    if (codeList.value?.length === 0) {
      ElMessage.warning('请选择数据');
      return;
    }
    // const arr = codeList.value.map((item) => item.ruleNo);
    const arr = codeList.value;
    editTaxNumberModalRef.value.open(arr);
    // handleDelete(arr);
  };
  onActivated(() => {
    runQuery();
  });
</script>

<style scoped lang="scss"></style>
