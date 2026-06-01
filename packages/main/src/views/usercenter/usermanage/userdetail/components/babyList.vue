<template>
  <div v-if="listData?.userBabies?.length" class="card card-flush py-4" v-loading="listLoading">
    <!-- <div class="card-header">
      <div class="card-title">
        <h2>宝宝</h2>
      </div>
    </div> -->
    <div class="card-body">
      <div v-for="(item, idx) in listData?.userBabies" :key="idx" class="d-flex align-items-center">
        <div class="symbol symbol-circle symbol-75px overflow-hidden me-3">
          <div class="symbol-label">
            <img
              :src="item.avatar"
              :alt="`${item.firstName + ' ' + item.lastName}`"
              class="w-100 h-100"
            />
          </div>
        </div>
        <div class="ms-5">
          <div class="fs-5 fw-bold text-gray-900 mb-2">
            {{ item.firstName + ' ' + item.lastName }}
          </div>
          <div class="fw-semibold text-muted">年龄：{{ item.age }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useList from '@/hooks/list/useList';
  import { userApi, UserApi, UserContracts } from '@/api/index';

  const route = useRoute();
  const uid = route.query.uid as string;

  const {
    // search,
    // searchData,
    // pagination: {
    //   total,
    //   current,
    //   pageSize,
    //   handleCurrentChange,
    //   pageSizeOption,
    //   handlePageSizeChange,
    // },
    listData,
    listLoading,
    // refreshList,
    // runQuery,
    // tableRef,
    // selectedKeys: codeList,
    // handleSelectionChange,
  } = useList<
    UserApi.LuteosUserQueryUserBabies.RequestQuery,
    UserApi.LuteosUserQueryUserBabies.ResponseBody
  >({
    searchDefaults: {
      uid,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    service: userApi.luteosUserQueryUserBabies,
  });
</script>
