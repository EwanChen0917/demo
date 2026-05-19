<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearchCustom"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.zendeskIdList" placeholder="多个ID用英文逗号或空格隔开" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.channel" placeholder="渠道" clearable>
        <el-option label="shopify" value="shopify" />
        <el-option label="amazon" value="amazon" />
        <el-option label="offlinechannel" value="offlinechannel" />
      </el-select>
      <el-input
        :style="{ width: `325px` }"
        v-model="search.srcOrderCodeList"
        placeholder="多个订单号用英文逗号或空格隔开"
        clearable
      >
        <template #prepend>
          <el-select v-model="search.orderType" style="width: 109px">
            <el-option :value="1" label="原订单号" />
            <el-option :value="2" label="补发订单号" />
          </el-select>
        </template>
      </el-input>
      <!-- <el-input
        style="width: 230px"
        v-model="search.srcOrderCodeList"
        placeholder="多个订单号用英文逗号或空格隔开"
        clearable
      /> -->
      <!-- <el-input
        style="width: 220px"
        v-model="search.mskuList"
        placeholder="多个SKU用英文逗号或空格隔开"
        clearable
      /> -->
      <el-input
        :style="{ width: `303px` }"
        v-model="search.mskuList"
        placeholder="多个SKU用英文逗号或空格隔开"
        clearable
      >
        <template #prepend>
          <el-select v-model="search.mskuType" style="width: 97px">
            <el-option :value="1" label="补发SKU" />
            <el-option :value="2" label="问题SKU" />
          </el-select>
        </template>
      </el-input>
      <div class="date-picker-prepend" ref="areaCountryContainerRef">
        <el-select v-model="search.timeType" style="width: 135px">
          <el-option :value="1" label="提交时间" />
          <el-option :value="2" label="原订单订购时间" />
        </el-select>
        <el-date-picker
          style="width: 240px"
          v-model="search.refundDate"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          class="b2bdate"
        />
        <!-- HH:mm:ss -->
      </div>
      <!-- <el-date-picker
        style="width: 280px"
        v-model="search.refundDate"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
      /> -->
      <!-- <el-select v-model="search.pushStatusList" placeholder="推送状态" multiple clearable>
        <el-option label="shopify" value="0" />
        <el-option label="amazon" value="amazon" />
      </el-select> -->
      <el-select
        v-model="search.pushStatusList"
        placeholder="推送状态"
        clearable
        filterable
        :teleported="false"
        multiple
        collapse-tags
      >
        <el-option
          v-for="item in pushStatusList"
          :value="item?.value"
          :label="item?.label"
          :key="item?.value"
        />
      </el-select>
      <el-select
        v-model="search.rePush"
        placeholder="是否重推"
        clearable
        filterable
        :teleported="false"
      >
        <el-option :value="1" label="是" />
        <el-option :value="0" label="否" />
      </el-select>
    </template>
    <template #more-filter>
      <el-form-item label="收件人">
        <el-input v-model="search.name" placeholder="收件人" clearable />
      </el-form-item>
      <el-form-item label="客户名称">
        <!-- <el-input v-model="search.customer" placeholder="客户名称" clearable /> -->
        <el-select
          ref="customerSelectRef"
          v-model="search.customerCodeList"
          placeholder="请选择"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :teleported="false"
          @change="handleCustomerChange"
        >
          <el-option
            v-for="item of customerCodeList"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发货仓库">
        <el-select
          ref="warehouseCodeSelectRef"
          v-model="search.warehouseCode"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="warehouse of warehouseMap"
            :key="warehouse.value"
            :label="warehouse.desc"
            :value="warehouse.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物流渠道">
        <el-select
          ref="shippingSelectRef"
          v-model="search.shippingCode"
          placeholder="请选择"
          filterable
          clearable
          :teleported="false"
        >
          <el-option
            v-for="shipping of shippingMap"
            :key="shipping.value"
            :label="shipping.desc"
            :value="shipping.value"
          />
        </el-select>
      </el-form-item>
    </template>
    <template #buttons>
      <ExportBtn
        :service="afterSaleApi.luteosAfterSaleReplacementExport"
        :params="
          search?.timeType === 1
            ? {
                ...omit(search, 'refundDate'),
                zendeskIdList: search.zendeskIdList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                srcOrderCodeList: search.srcOrderCodeList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                mskuList: search.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
                refundDateStart: search?.refundDate ? search?.refundDate[0] : undefined,
                refundDateEnd: search?.refundDate ? search?.refundDate[1] : undefined,
              }
            : {
                ...omit(search, 'refundDate'),
                zendeskIdList: search.zendeskIdList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                srcOrderCodeList: search.srcOrderCodeList
                  ?.replace(/\s/g, ',')
                  ?.split(',')
                  ?.filter(Boolean),
                mskuList: search.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
                srcDateStart: search?.refundDate ? `${search?.refundDate[0]} 00:00:00` : undefined,
                srcDateEnd: search?.refundDate ? `${search?.refundDate[1]} 23:59:59` : undefined,
              }
        "
      >
        导出
      </ExportBtn>
      <el-button
        type="danger"
        v-permission="'deleteAfterSaleReplacement'"
        plain
        @click="batchDelete"
      >
        删除
      </el-button>
      <el-button type="primary" @click="batchRePush">重推</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="itemId"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection fixed="left" />
      <el-table-column prop="channel" label="渠道" fixed="left" />
      <el-table-column prop="zendeskId" label="工单号" fixed="left" />
      <el-table-column prop="shopName" label="店铺/站点" min-width="140">
        <template #default="{ row }">
          {{ row.shopName ?? '' }}{{ row.shopName && row.site ? ':' : '' }}{{ row.site ?? '' }}
        </template>
      </el-table-column>
      <el-table-column prop="classification" label="classification" min-width="140" />
      <el-table-column prop="firstLevel" label="一级分类" min-width="120" />
      <el-table-column prop="secondLevel" label="二级分类" min-width="120" />
      <el-table-column prop="receiverAddressCountry" label="订单国家" min-width="120" />
      <el-table-column prop="receiverAddressState" label="订单省州" min-width="120" />
      <el-table-column prop="pumpPart" label="pump part" min-width="120" />
      <el-table-column prop="srcOrderCode" label="原订单号" min-width="120" />
      <el-table-column prop="replacementMsku" label="问题Product Sku" min-width="140" />
      <el-table-column prop="orderCode" label="补发订单号" min-width="120" />
      <el-table-column prop="msku" label="补发Product Sku" min-width="140" />
      <el-table-column prop="quantity" label="补发Sku数量" min-width="140" />
      <el-table-column prop="vocModel" label="产品型号" />
      <el-table-column prop="price" label="补发金额" />
      <el-table-column prop="remark" label="补发原因" min-width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.remark" :line="3" />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="客户名称" min-width="120" /> -->
      <el-table-column prop="name" label="收件人" min-width="120" />
      <el-table-column prop="customerName" label="客户名称" min-width="120" />
      <el-table-column prop="address" label="补发地址" min-width="130">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.address" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" min-width="120" />
      <el-table-column prop="email" label="邮箱" min-width="160" />
      <el-table-column prop="warehouseDesc" label="仓库" min-width="160" />
      <el-table-column prop="shippingDesc" label="物流" min-width="160" />
      <el-table-column prop="customerServiceStaff" label="客服人员" min-width="120" />
      <el-table-column prop="refundDate" label="提交日期" min-width="100" />
      <el-table-column prop="purchaseTimeBeijing" label="原订单订购时间" min-width="120" />
      <el-table-column prop="orderStatusDesc" label="补发单状态" min-width="100" />
      <el-table-column prop="pushStatusDesc" label="推送状态" min-width="100">
        <template #default="{ row }">
          <Tag v-if="row?.pushStatus !== null" :color="pushStatusColorMap[row.pushStatus]">
            {{ row?.pushStatusDesc }}
          </Tag>
        </template>
      </el-table-column>
      <el-table-column prop="pushErrorMsg" label="失败原因" min-width="140">
        <template #default="{ row }">
          <OverflowTooltip :content="row?.pushErrorMsg" :line="3" />
        </template>
      </el-table-column>
      <el-table-column prop="refundReason" label="是否重推" min-width="80">
        <template #default="{ row }">
          {{ row.rePush === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="140">
        <template #default="{ row }">
          <div class="d-flex align-items-center gap-2">
            <OverflowTooltip :content="row?.systemRemark" :line="3" />
            <el-icon class="edit-icon" @click="editRemark(row)">
              <Edit style="color: #02b96b" />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '日志',
                key: 'log',
                type: 'primary',
                permissionCode: '',
                row,
              },
              {
                label: '更换sku',
                key: 'changeSku',
                type: 'primary',
                // row.channel === 'amazon' &&
                hide: !(
                  row.orderStatusDesc === '' &&
                  row.channel === 'amazon' &&
                  (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                ),
                // hide: !(
                //   row.orderStatusDesc === '' &&
                //   (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                // ),
                permissionCode: '',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                permissionCode: '',
                hide: !(
                  row.orderStatusDesc === '' &&
                  row.channel === 'amazon' &&
                  (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                ),
                // hide: !(
                //   row.orderStatusDesc === '' &&
                //   (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                // ),
                row,
              },
              {
                label: '更换店铺/站点',
                key: 'changeShop',
                type: 'primary',
                permissionCode: '',
                hide: !(
                  row.orderStatusDesc === '' &&
                  row.channel === 'amazon' &&
                  (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                ),
                // hide: !(
                //   row.orderStatusDesc === '' &&
                //   (row?.pushStatus === 0 || row?.pushStatus === 20 || row?.pushStatus === 30)
                // ),
                row,
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
  <LogDialog ref="logDialogRef" />
  <editAddrModal ref="editAddrModalRef" @success="refreshList" />
  <editShopModal ref="editShopModalRef" @success="refreshList" />
  <!-- :countryCode="form.receiveInfo.countryCode"
    :customerCode="form.receiveInfo.customerCode"
    :currencyCode="form.baseInfo.currencyCode" -->
  <ProductDialog
    :shopName="shopName"
    :itemInfo="itemInfo"
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemInfoList"
    :selectOne="true"
    confirm-text="确认"
    title="更换sku"
    type="supplierSku"
    @success="refreshList"
  />
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { AfterSaleApi, afterSaleApi, commonApi, erpApi } from '@/api';
  import { omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import LogDialog from '@/views/afterSale/order/components/logDialog.vue';
  import editAddrModal from '@/views/afterSale/order/components/editAddrModal.vue';
  import editShopModal from '@/views/afterSale/order/components/editShopModal.vue';
  import ProductDialog from '@/views/afterSale/order/components/productDialog.vue';
  import { ElMessage, ElMessageBox, ElSelect } from 'element-plus';
  import { DictBean } from '@/api/erp/data-contracts';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';

  const form: any = ref({});
  const productDialogVisible = ref(false);
  // 选择商品
  const handleProductDialogClose = async (selected: boolean, list: any[]) => {
    // console.log(selected, list);
    if (selected) {
      refreshList();
    }
    productDialogVisible.value = false;
  };
  const editAddrModalRef = ref();
  const editShopModalRef = ref();
  const pushStatusColorMap = {
    0: 'blue', // 未推送
    10: 'green', // 推送成功
    20: 'red', // 推送错误
    30: 'red', // 推送异常（如网络异常）
    40: 'purple', // 处理中
  };

  // 物流渠道
  const shippingMap = ref<DictBean[]>([]);
  const queryAllShipping = async () => {
    const res = await erpApi.luteosErpOrderQueryAllShipping({
      type: 1,
    });
    shippingMap.value = res || [];
  };
  const user = useStore();
  // 客户数组
  const customerCodeList = ref<any[]>([]);
  const queryCustomer = async () => {
    // const res = await shopifyApi.luteosShopifyQueryB2BCustomerList({
    //   status: 0,
    //   pageSize: 10000,
    //   size: 10000,
    //   organizationDeptIdList: ['986555723', '986928017', '986773513', '986581684'],
    // });
    const res = await axios.get(
      '/api/luteos/shopify/queryB2bCustomerList?organizationDeptIdList=986555723&organizationDeptIdList=986928017&organizationDeptIdList=986773513&organizationDeptIdList=986581684&pageSize=10000&size=10000',
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    customerCodeList.value =
      res?.data?.result.map((item: any) => {
        return {
          desc: item.name,
          value: item.code,
        };
      }) || [];
  };
  // 输入筛选后清空
  const customerSelectRef = ref();
  const handleCustomerChange = async () => {
    nextTick(() => {
      const input = customerSelectRef.value?.$el?.querySelector('input');
      if (input) input.value = '';
      input.dispatchEvent(new Event('input'));
    });
  };

  // 发货仓库
  const warehouseMap = ref<DictBean[]>([]);
  const queryAllWarehouse = async () => {
    const res = await erpApi.luteosErpOrderQueryAllWarehouse({
      type: 1,
    });
    warehouseMap.value = res || [];
  };
  onMounted(() => {
    queryAllShipping();
    queryAllWarehouse();
    queryCustomer();
  });

  const PAGE_SIZE = 10;
  const tableRef = ref(null);
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    AfterSaleApi.LuteosAfterSaleReplacementQueryList.RequestBody,
    AfterSaleApi.LuteosAfterSaleReplacementQueryList.ResponseBody
  >({
    searchDefaults: {
      channel: undefined,
      zendeskIdList: undefined,
      srcOrderCodeList: undefined,
      mskuList: undefined,
      refundDate: undefined,
      pushStatusList: undefined,
      rePush: undefined,
      srcDateStart: undefined,
      srcDateEnd: undefined,
      timeType: 1,
      orderType: 1,
      orderCodeList: undefined,
      mskuType: 1,
      replacementMsku: undefined,
      name: undefined,
      customer: undefined,
      warehouseCode: undefined,
      shippingCode: undefined,
      customerCodeList: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { refundDate } = searchData;
      console.log('mskuType', searchData.mskuType);
      if (searchData.timeType === 1) {
        let params = {
          ...omit(searchData, 'refundDate'),
          zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
          srcOrderCodeList: searchData.srcOrderCodeList
            ?.replace(/\s/g, ',')
            ?.split(',')
            ?.filter(Boolean),
          mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
          refundDateStart: refundDate ? refundDate[0] : undefined,
          refundDateEnd: refundDate ? refundDate[1] : undefined,
        };
        if (searchData.orderType === 2) {
          params.orderCodeList = params.srcOrderCodeList;
          params = { ...omit(params, 'srcOrderCodeList') };
        }
        if (searchData.mskuType === 2) {
          params.replacementMskuList = params.mskuList;
          params = { ...omit(params, 'mskuList') };
        }
        return params;
        // return {
        //   ...omit(searchData, 'refundDate'),
        //   zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        //   srcOrderCodeList: searchData.srcOrderCodeList
        //     ?.replace(/\s/g, ',')
        //     ?.split(',')
        //     ?.filter(Boolean),
        //   mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        //   refundDateStart: refundDate ? refundDate[0] : undefined,
        //   refundDateEnd: refundDate ? refundDate[1] : undefined,
        // };
      }
      let params = {
        ...omit(searchData, 'refundDate'),
        zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        srcOrderCodeList: searchData.srcOrderCodeList
          ?.replace(/\s/g, ',')
          ?.split(',')
          ?.filter(Boolean),
        mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
        srcDateStart: refundDate ? `${refundDate[0]} 00:00:00` : undefined,
        srcDateEnd: refundDate ? `${refundDate[1]} 23:59:59` : undefined,
      };
      if (searchData.orderType === 2) {
        params.orderCodeList = params.srcOrderCodeList;
        omit(params, 'srcOrderCodeList');
      }
      if (searchData.mskuType === 2) {
        params.replacementMskuList = params.mskuList;
        params = { ...omit(params, 'mskuList') };
      }
      return params;
      // return {
      //   ...omit(searchData, 'refundDate'),
      //   zendeskIdList: searchData.zendeskIdList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
      //   srcOrderCodeList: searchData.srcOrderCodeList
      //     ?.replace(/\s/g, ',')
      //     ?.split(',')
      //     ?.filter(Boolean),
      //   mskuList: searchData.mskuList?.replace(/\s/g, ',')?.split(',')?.filter(Boolean),
      //   srcDateStart: refundDate ? `${refundDate[0]} 00:00:00` : undefined,
      //   srcDateEnd: refundDate ? `${refundDate[1]} 23:59:59` : undefined,
      // };
    },
    pageSize: PAGE_SIZE,
    service: afterSaleApi.luteosAfterSaleReplacementQueryList,
  });

  const resetSearchCustom = () => {
    resetSearch();
    tableRef.value?.clearSelection();
  };

  const logDialogRef = ref();
  // 勾选
  const totalList = ref([]);
  const handleSelectionChange = (list) => {
    totalList.value = list;
  };

  // 编辑备注
  const editRemark = async (row) => {
    ElMessageBox.prompt('编辑备注', {
      inputValue: row?.systemRemark,
      buttonSize: 'small',
    }).then(async ({ value }) => {
      if (value.length >= 255) {
        ElMessage.warning('备注长度太长!');
        return;
      }
      await afterSaleApi.luteosAfterSaleReplacementEditRemark({
        id: row?.id,
        systemRemark: value,
      });
      ElMessage.success('编辑成功');
      row.systemRemark = value;
    });
  };
  const batchRePush = async () => {
    if (!totalList.value.length) return ElMessage.warning('请先勾选数据');
    const illegalList = tableRef.value
      ?.getSelectionRows()
      ?.filter((item) => item?.orderStatusDesc)
      ?.map((item) => item.orderCode);
    if (illegalList.length > 0) {
      ElMessage.warning(`订单号：${illegalList?.join(',')}补发单状态非空，请重新选择`);
      return;
    }
    const illegalList2 = tableRef.value
      ?.getSelectionRows()
      ?.filter(
        (item) => item?.pushStatus !== 0 && item?.pushStatus !== 20 && item?.pushStatus !== 30
      )
      ?.map((item) => item.orderCode);
    if (illegalList2.length > 0) {
      ElMessage.warning(`订单号：${illegalList2?.join(',')}非待推送或者推送失败，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('请确认是否重推？');
    if (!isConfirmed) return;
    const res = await afterSaleApi.luteosAfterSaleReplacementBatchRePush({
      idList: totalList.value.map((item) => item?.id),
    });
    ElMessage.success('重推成功');
    refreshList();
    tableRef.value?.clearSelection();
  };
  const shopName = ref();
  const itemInfo = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    switch (key) {
      case 'log':
        // 日志
        logDialogRef.value.open(row.replacementCode, 'after_sale_replacement');
        break;
      case 'changeSku':
        // 日志
        // console.log(row);
        shopName.value = row.shopName;
        itemInfo.value = row;
        // console.log(shopName.value);
        productDialogVisible.value = true;
        break;
      case 'changeShop':
        // 更换店铺/站点
        editShopModalRef.value.open(row);
        break;
      case 'edit':
        // 日志
        editAddrModalRef.value.open(row);
        break;
      default:
        break;
    }
  };
  // 批量删除
  const batchDelete = async () => {
    if (!totalList.value.length) return ElMessage.warning('请勾选数据');
    const illegalList = tableRef.value?.getSelectionRows()?.filter((item) => {
      const isIllegal =
        !item.orderStatusDesc &&
        (item?.pushStatus === 0 || item?.pushStatus === 20 || item?.pushStatus === 30);
      return !isIllegal;
    });
    if (illegalList.length > 0) {
      ElMessage.warning(`只能删除补发单状态为空且推送状态为待推送或推送失败的数据，请重新选择`);
      return;
    }
    const isConfirmed = await swal.confirm('请确认是否删除数据？');
    if (!isConfirmed) return;
    await afterSaleApi.luteosAfterSaleReplacementBatchDeleted({
      idList: totalList.value.map((item) => item?.id),
    });
    ElMessage.success('删除成功');
    refreshList();
    tableRef.value?.clearSelection();
  };
  const getEnumDict = async (enumDictCode) => {
    const res = await commonApi.luteosCommonBizEnumsGetEnumDict({
      enumDictCode,
    });
    return res || [];
  };
  const pushStatusList = ref([]);
  onMounted(async () => {
    pushStatusList.value = await getEnumDict('afterSaleTsPushStatus');
  });
</script>

<style scoped lang="scss"></style>
