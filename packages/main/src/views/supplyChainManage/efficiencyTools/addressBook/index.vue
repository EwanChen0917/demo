<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-select v-model="search.addressType" placeholder="地址类型" clearable>
        <el-option
          v-for="item in AddressTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #filters>
      <el-input v-model="search.addressName" class="w-350px" clearable placeholder="地址名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.contacts" class="w-150px" clearable placeholder="联系人" />
      <CountrySelect style="width: 120px" v-model="search.countryCode" clearable />
    </template>
    <template #buttons>
      <el-button type="primary" @click="addAddress">添加收货地址</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      :row-key="(row) => row.id"
    >
      <el-table-column label="地址名称" prop="addressName" min-width="100" />
      <el-table-column label="地址类型" prop="addressTypeDesc" min-width="100" />
      <el-table-column label="公司名称" prop="companyName" min-width="100" />
      <el-table-column label="仓库代码" prop="warehouseCode" min-width="100" />
      <el-table-column label="联系人" prop="contacts" min-width="100" />
      <el-table-column label="邮箱" prop="email" min-width="100" />
      <el-table-column label="手机号" prop="phone" min-width="100" />
      <el-table-column label="国家/地区" prop="countryCode" min-width="100" />
      <el-table-column label="省/州" prop="state" min-width="100" />
      <el-table-column label="城市" prop="city" min-width="100" />
      <el-table-column label="区/县" prop="district" min-width="100" />
      <el-table-column label="街道" prop="street" min-width="100" />
      <el-table-column label="邮编" prop="zipCode" min-width="100" />
      <el-table-column label="详细地址1" prop="address1" min-width="100" />
      <el-table-column label="详细地址2" prop="address2" min-width="100" />
      <el-table-column label="更新时间" prop="updateTime" min-width="100" />
      <el-table-column label="更新人" prop="updator" min-width="100" />
      <el-table-column label="操作" fixed="right" max-width="100">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
                row: row,
              },
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
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
      size="small"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <Action ref="actionRef" @save="refreshList" />
</template>

<script setup lang="ts" name="addressBook">
  import { ErpApi, erpApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import Action from './components/action.vue';
  import { AddressTypeOptions } from './enum';
  import * as swal from '@/utils/swal';

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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ErpApi.LuteosErpLogisticsAddressQueryList.RequestBody,
    ErpApi.LuteosErpLogisticsAddressQueryList.ResponseBody
  >({
    searchDefaults: {
      addressName: undefined,
      addressType: undefined,
      contacts: undefined,
      countryCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpLogisticsAddressQueryList,
  });

  const actionRef = ref();

  const addAddress = () => {
    actionRef.value?.open('add');
  };

  const handleActions = async (item: any) => {
    const { key, row } = item;
    switch (key) {
      case 'delete':
        // luteosErpLogisticsAddressDelete
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
        await erpApi.luteosErpLogisticsAddressDelete({ id: row.id });
        refreshList();
        break;
      case 'edit':
        actionRef.value?.open('edit', row);
        break;
      case 'detail':
        actionRef.value?.open('detail', row);
        break;
      default:
        break;
    }
  };
</script>

<style scoped lang="scss"></style>
