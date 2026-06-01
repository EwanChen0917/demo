<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.email" placeholder="用户邮箱">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <!--      <el-input v-model="search.uid" placeholder="用户ID">
              <template #prefix>
                <SvgIconSearch />
              </template>
            </el-input>-->
      <el-select
        @change="
          (value) => {
            search.registerSource = value ? value.join(',') : '';
          }
        "
        v-model="registerSource"
        placeholder="全部平台"
        clearable
        multiple
      >
        <el-option
          v-for="item in platforms"
          :key="item.registerSource"
          :value="item.registerSource"
          :label="item.registerSourceDesc"
        />
      </el-select>
    </template>
    <template #buttons>
      <!-- <el-button class="button" type="primary" @click="runQuery">搜索</el-button> -->
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="350"
        trigger="click"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 100px);
                overflow-y: auto;
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
              "
            >
              <el-form label-width="90">
                <el-form-item label="姓名" prop="userName">
                  <el-input v-model="search.userName" placeholder="姓/名" />
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="search.phone" placeholder="手机号码" />
                </el-form-item>
              </el-form>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem"
            >
              <el-button type="primary" @click="reset">重置</el-button>
              <el-button type="primary" @click="runQuery">确定</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button type="primary">筛选</el-button>
        </template>
      </el-popover>
      <el-button class="button" @click="handleExport" :loading="exportLoading" type="primary" plain>
        导出
      </el-button>
    </template>
    <p>
      共: {{ total }} 位用户
      <span style="margin: 0 12px">
        <el-button
          :disabled="!uids.length"
          size="small"
          plain
          type="primary"
          @click="multiUpdatePoints"
        >
          修改积分
        </el-button>
        <el-button
          :disabled="!uids.length"
          size="small"
          plain
          type="primary"
          @click="multiSelectTag"
        >
          打标签
        </el-button>
      </span>
      <span v-if="uids.length">已选中 {{ uids.length }} 条</span>
    </p>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.users"
      row-key="uid"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" reserve-selection />
      <!--      <el-table-column prop="uid" label="用户ID" min-width="200" />-->
      <el-table-column prop="email" label="用户邮箱" min-width="200" />
      <el-table-column prop="registerSource" label="注册平台" min-width="100">
        <!-- <template #default="scope">
          <span>{{ getRegisterChannelDesc(scope.row.registerSource) }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="registerTime" label="注册时间" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.registerTime || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="countryName" label="国家" min-width="150">
        <template #default="scope">
          <span>{{ scope.row.countryName || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="availablePoint" label="积分" min-width="100">
        <template #default="scope">
          <span>{{ scope.row.availablePoint || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="订单数" min-width="100" />
      <el-table-column prop="orderTotalAmount" label="订单总金额" min-width="100">
        <template #default="scope">
          <span>{{ scope.row.orderTotalAmount + ' ' }}</span>
          <span v-if="scope.row.currency">{{ scope.row.currency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="160px">
        <template #default="scope">
          <KeenActions
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                uid: scope.row.uid,
              },
              {
                label: '打标签',
                key: 'selectTag',
                type: 'primary',
                text: true,
                row: scope.row,
              },
              {
                label: '修改积分',
                key: 'updatePoints',
                type: 'primary',
                text: true,
                row: scope.row,
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
    <UpdatePointsDialog :uids="selected" ref="updatePointsDialogRef" @success="refreshList" />
    <SelectTagDialog :uids="selected" ref="selectTagDialogRef" @success="refreshList" />
  </KeenList>
</template>

<script lang="ts" setup name="userlist">
  import { Search } from '@element-plus/icons-vue';
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import { userApi, UserApi } from '@/api/index';

  import * as swal from '@/utils/swal';
  import UpdatePointsDialog from './components/updatePointsDialog.vue';
  import SelectTagDialog from './components/selectTagDialog.vue';

  const router = useRouter();
  const PAGE_SIZE = 10;
  const registerSource = ref<string[]>([]);
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
    resetSearch,
  } = useList<UserApi.LuteosUserQueryUsers.RequestQuery, UserApi.LuteosUserQueryUsers.ResponseBody>(
    {
      searchDefaults: {
        userName: undefined,
        email: undefined,
        uid: undefined,
        phone: undefined,
        registerSource: undefined,
      },
      pageSize: PAGE_SIZE,
      service: userApi.luteosUserQueryUsers,
    }
  );
  const platforms = ref<any[]>([]);

  const route = useRoute();
  const { params } = route;

  Object.keys(params).forEach((key) => {
    if (params[key]) search[key] = params[key];
  });

  const getOptions = async () => {
    // const res = await userApi.luteosUserQueryPlatforms();
    const res = await userApi.luteosUserQueryRegisterSourceList();
    platforms.value = res.list || [];
  };
  getOptions();

  const getRegisterChannelDesc = (val: String) => {
    const info: any = platforms.value.find((item: any) => item.registerSource === val) || {};
    return info.registerSourceDesc || '--';
  };

  const uids = ref<any[]>([]);
  const handleSelectionChange = (list) => {
    selected.value = list.map((item) => item.uid);
    uids.value = list.map((item) => item.uid);
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(userApi.luteosUserExportUsers, {
    manual: true,
    async onSuccess(d) {
      const isConfirmed = await swal.exportConfirm();
      if (!isConfirmed) return;

      await nextTick();
      router.push({
        path: '/downloadmanage',
        query: {
          app_code: d?.appCode,
          module_code: d?.moduleCode,
          record_type: 2,
        },
      });
    },
    onError(e) {
      swal.error(`导出失败: ${e.message}`);
    },
  });
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;

    exportRun({
      pageNum: current.value,
      pageSize: pageSize.value,
      uids: uids.value,
      ...search,
    });
  };

  // 表格操作
  const selected = ref<any[]>([]);
  const handleActions = (item) => {
    const { key, uid, row } = item;

    if (key === 'view') {
      sessionStorage.setItem('userSearchInfo', JSON.stringify(search));
      router.push(`/userlist/detail?uid=${uid}`);
    } else if (key === 'updatePoints') {
      selected.value = [row.uid];
      updatePointsDialogRef.value?.open(row);
    } else if (key === 'selectTag') {
      selected.value = [row.uid];
      selectTagDialogRef.value?.open();
    }
  };
  const updatePointsDialogRef = ref();
  const multiUpdatePoints = () => {
    updatePointsDialogRef.value?.open();
  };
  const multiSelectTag = () => {
    selectTagDialogRef.value?.open(true);
  };
  const selectTagDialogRef = ref();
  const reset = () => {
    search.userName = '';
    search.phone = '';
  };
</script>

<style scoped lang="scss"></style>
