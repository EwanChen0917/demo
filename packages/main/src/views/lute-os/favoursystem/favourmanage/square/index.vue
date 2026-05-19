<template>
  <KeenList>
    <template #search>
      <el-input v-model="search.keyword" placeholder="请输入红人名称/邮箱" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <DeptMember placeholder="录入人" deptCode="all_dept" v-model="search.creatorCode" />
      <el-select
        v-model="channelCodeList"
        :teleported="false"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        placeholder="渠道"
        @change="
          (val) => {
            search.channelCodeList = val.join(',');
          }
        "
      >
        <el-option
          v-for="item in channelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <el-space>
            <img :src="getImg(item.value)" style="width: 20px; height: 20px" />
            <span>{{ item.label }}</span>
          </el-space>
        </el-option>
      </el-select>
      <el-date-picker
        v-model="effectiveTime"
        start-placeholder="录入开始时间"
        end-placeholder="录入结束时间"
        type="datetimerange"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        clearable
        @change="
          (dateArr) => {
            search.recordDateStart = dateArr ? dateArr[0] : '';
            search.recordDateEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
      <el-cascader
        v-model="labelCodeList"
        :options="options"
        :props="props"
        placeholder="红人标签"
        clearable
        collapse-tags
        collapse-tags-tooltip
        @change="
          (val) => {
            search.labelCodeList = val.join(',');
          }
        "
      />
      <!--      <el-select
              v-model="labelCodeList"
              clearable
              filterable
              placeholder="红人标签"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :remote="true"
              :remote-method="redRemoteMethod"
              remote-show-suffix
              @change="
                (val) => {
                  search.labelCodeList = val.join(',');
                }
              "
            >
              <el-option
                v-for="item in labelCodeOptions"
                :key="item.labelCode"
                :label="item.name"
                :value="item.labelCode"
              />
            </el-select>-->
      <el-select v-model="search.status" clearable placeholder="红人状态">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button
        class="button"
        type="primary"
        @click="uploadVisible = true"
        :loading="importLoading"
      >
        排重
      </el-button>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
      <el-button class="button" type="primary" @click="reset">重置</el-button>
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="400"
        trigger="click"
      >
        <div class="h-xl-100">
          <div class="px-7 py-5">
            <div class="fs-4 text-dark fw-bold">筛选条件</div>
          </div>
          <div class="separator border-gray-200"></div>
          <div class="py-5 h-xl-100">
            <div
              style="
                height: calc(100% - 100px);
                padding-left: 1.75rem;
                padding-right: 1rem;
                margin-right: 0.75rem;
              "
            >
              <div class="mb-5">
                <label class="form-label fs-5 fw-semibold mb-3">团队:</label>
                <el-select
                  placeholder="请选择团队"
                  :teleported="false"
                  clearable
                  v-model="search.teamCode"
                >
                  <el-option
                    v-for="item in teamList"
                    :key="item.teamCode"
                    :label="item.teamName"
                    :value="item.teamCode"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <label class="form-label fs-5 fw-semibold mb-3">国家:</label>
                <el-select
                  v-model="countryList"
                  :teleported="false"
                  multiple
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="请选择国家"
                  @change="
                    (val) => {
                      search.countryList = val.join(',');
                    }
                  "
                >
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <label class="form-label fs-5 fw-semibold mb-3">红人类型:</label>
                <el-select
                  v-model="featureCodeList"
                  :teleported="false"
                  multiple
                  clearable
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="请选择红人类型"
                  @change="
                    (val) => {
                      search.featureCodeList = val.join(',');
                    }
                  "
                >
                  <el-option
                    v-for="item in codeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <label class="form-label fs-5 fw-semibold mb-3">未合作产品:</label>
                <el-select
                  v-model="unCooperationProducts"
                  :teleported="false"
                  placeholder="请选择未合作产品"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  @change="
                    () => {
                      search.unCooperationProducts = unCooperationProducts.join(',');
                    }
                  "
                >
                  <el-option
                    v-for="item in spuList"
                    :key="item.productSpu"
                    :label="item.name"
                    :value="item.productSpu"
                  />
                </el-select>
              </div>
              <div class="mb-5">
                <label class="form-label fs-5 fw-semibold mb-3">已合作产品:</label>
                <el-select
                  v-model="cooperationProducts"
                  :teleported="false"
                  placeholder="请选择已合作产品"
                  clearable
                  filterable
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  @change="
                    () => {
                      search.cooperationProducts = cooperationProducts.join(',');
                    }
                  "
                >
                  <el-option
                    v-for="item in spuList"
                    :key="item.productSpu"
                    :label="item.name"
                    :value="item.productSpu"
                  />
                </el-select>
              </div>
            </div>
            <div
              class="d-flex justify-content-end"
              style="padding-left: 1.75rem; padding-right: 1.75rem; margin-top: 10px"
            >
              <el-button class="button" type="primary" @click="runQuery">查询</el-button>
              <el-button class="button" type="primary" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
        <template #reference>
          <el-button class="button" type="primary">筛选</el-button>
        </template>
      </el-popover>
      <el-button type="primary" @click="addLabelRef.open()" v-permission="'squareAddLabel'">
        新增标签
      </el-button>
      <el-button type="primary" @click="batchUpdateVisible = true">批量操作</el-button>
      <el-button
        type="primary"
        @click="handleExport"
        wait-text="导出中"
        :loading="exportLoading"
        v-permission="'squareExport'"
      >
        导出
      </el-button>
    </template>
    <Table
      ref="tableRef"
      :listData="listData?.userList"
      :listLoading="listLoading"
      @refresh="runQuery"
      @selection-change="selectionChange"
    />
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <BatchUpdateModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    :params="search"
    @close="batchUpdate"
    @refresh="refreshList"
    :user-list="userList"
  />
  <AddLabelDialog ref="addLabelRef" @success="queryLabelList" />
  <UploadFileModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    @close="
      () => {
        uploadVisible = false;
      }
    "
    @save="handleUploadSuccess"
  />
</template>

<script setup lang="ts" name="square">
    import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { metaApi, MetaApi, memberApi, platformApi, productApi, commonApi } from '@/api/index';
  import { useRequest } from 'vue-request';
  import useList from '@/hooks/list/useList';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
import BatchUpdateModal from '@/views/lute-os/favoursystem/favourmanage/square/components/BatchUpdateModal.vue';
import AddLabelDialog from '@/views/lute-os/favoursystem/favourmanage/square/components/AddLabelDialog.vue';
  import { openWindow } from '@/utils';
  import { MetaTeamListResp } from '@/api/meta/data-contracts';
  import Table from './components/table.vue';
  import UploadFileModal from './Modal/uploadFileModal.vue';

  const effectiveTime = ref([]);
  const route = useRoute();
  const router = useRouter();
  const { query } = route;

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
    MetaApi.LuteosMetaQueryUserList.RequestQuery,
    MetaApi.LuteosMetaQueryUserList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      countryList: undefined,
      channelCodeList: undefined,
      featureCodeList: undefined,
      labelCodeList: undefined,
      status: +query.status || undefined,
      recordDateStart: undefined,
      recordDateEnd: undefined,
      creatorCode: undefined,
      ownerCode: undefined,
      teamCode: undefined,
      brand: undefined,
      cooperationProducts: undefined,
      unCooperationProducts: undefined,
    },
    pageSize: 10,
    service: metaApi.luteosMetaQueryUserList,
  });

  const channelCodeList = ref([]);
  const countryList = ref([]);
  const featureCodeList = ref([]);
  const cooperationProducts = ref([]);
  const unCooperationProducts = ref([]);
  const ownerCode = ref([]);
  const labelCodeList = ref([]);
  // Team Info
  const teamList = ref<MetaTeamListResp['teamList']>([]);
  function getTeamList() {
    metaApi.luteosMetaQueryMetaTeamList().then((res) => {
      teamList.value = res.teamList || [];
    });
  }
  getTeamList();

  const dealRes = (arr: any) => {
    const result: any = [];
    if (arr.length <= 0) return [];
    arr.map((item: any) => {
      result.push({ label: `${item.value}`, value: `${item.key}` });
    });
    return result;
  };
  const statusList = ref([
    { label: '未合作', value: 1 },
    { label: '合作中', value: 2 },
  ]);

  const countryOptions = ref([]);
  const channelOptions = ref([]);
  const codeOptions = ref([]);
  const queryUserListParam = () => {
    metaApi.luteosMetaQueryUserListParam().then((res) => {
      countryOptions.value = dealRes(res.countryList);
      channelOptions.value = dealRes(res.channelList);
      codeOptions.value = dealRes(res.featureList);
    });
  };
  queryUserListParam();

  const labelCodeOptions = ref([]);
  const getOptionList = (name: string) => {
    platformApi
      .platformLabelQueryLabelList({ pageNum: 1, pageSize: 500, name, module: 'meta', status: 1 })
      .then((res) => {
        labelCodeOptions.value = res.labelInfoList || [];
      });
  };
  getOptionList('');
  const redRemoteMethod = (val: string) => {
    getOptionList(val);
  };

  const memberOptions = ref([]);
  const getDeptMemberOption = () => {
    memberApi
      .luteosMemberQueryDeptMemberList({ operatorDepartmentCode: 'meta_dept' })
      .then((res) => {
        memberOptions.value = res.memberList || [];
      });
  };
  getDeptMemberOption();

  const handleExport = () => {
    exportRun({
      ...search,
      countryList: countryList.value.length ? countryList.value : undefined,
      channelCodeList: channelCodeList.value.length ? channelCodeList.value : undefined,
      featureCodeList: featureCodeList.value.length ? featureCodeList.value : undefined,
      labelCodeList: labelCodeList.value.length
        ? labelCodeList.value?.map((item) => item[1])
        : undefined,
      cooperationProducts: cooperationProducts.value.length ? cooperationProducts.value : undefined,
      unCooperationProducts: unCooperationProducts.value.length
        ? unCooperationProducts.value
        : undefined,
      pageNum: current.value,
      pageSize: pageSize.value,
    });
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(metaApi.luteosMetaExportUserList, {
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
  });

  const userList = ref([]);
  const selectionChange = (list) => {
    userList.value = list?.map((item: any) => item.userCode);
  };

  const tableRef = ref();
  const form = ref({
    transferCode: '',
  });
  const rules = ref({
    transferCode: { required: true, message: '请选择转移对象', trigger: ['blur'] },
  });

  const formRef = ref();
  const saveLoading = ref(false);
  const transferVisible = ref(false);
  const batchMove = async () => {
    const isConfirmed = await swal.confirm('红人转移后不可撤销，是否确认转移？');
    if (!isConfirmed) return;

    transferVisible.value = true;
  };

  const handleClose = () => {
    transferVisible.value = false;
    form.value.transferCode = '';
    nextTick(() => {
      formRef.value.clearValidate();
    });
  };

  const spuList = ref([]);
  const querySpuList = async () => {
    const res = await productApi.luteosProductQueryProductList({
      pageNum: 1,
      pageSize: 1000,
    });
    spuList.value = res?.productBeanList?.map((item) => {
      return {
        productSpu: item.productSpu,
        name: item.name,
      };
    });
  };
  querySpuList();

  const reset = () => {
    effectiveTime.value = [];
    channelCodeList.value = [];
    countryList.value = [];
    featureCodeList.value = [];
    ownerCode.value = [];
    labelCodeList.value = [];
    unCooperationProducts.value = [];
    cooperationProducts.value = [];
    resetSearch();
  };

  // 批量更新
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      tableRef.value?.clearTable();
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 新增标签
  const addLabelRef = ref(null);
  const options = ref([]);

  const queryLabelList = async () => {
    const res = await metaApi.luteosMetaQueryLabelList({
      pageNum: 1,
      pageSize: 500,
      module: 'meta',
    });
    options.value = res?.labelInfoList?.map((item) => ({
      value: item.labelCode,
      label: item.name,
    }));
  };

  const props = {
    lazy: true,
    multiple: true,
    async lazyLoad(node, resolve) {
      const { level, value } = node;
      const res = await metaApi.luteosMetaQueryLabelList({
        pageNum: 1,
        pageSize: 500,
        module: 'meta',
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

  // 文件上传
  const uploadVisible = ref<boolean>(false);
  const importLoading = ref(false);
  const handleUploadSuccess = (files) => {
    uploadVisible.value = false;
    // 获取文件信息
    const file = files[files.length - 1];
    importLoading.value = true;
    // 导入
    commonApi
      .luteosCommonFileImportData({
        fileName: file.name,
        importScene: 'meta_user_repeat_import',
        key: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        runQuery();
        const isConfirmed = await swal.confirm({
          text: '提交成功，具体请前往下载中心查看',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });
        if (!isConfirmed) return;
        openWindow('/downloadmanage');
      })
      .finally(() => {
        importLoading.value = false;
        uploadVisible.value = false;
      });
  };

  const getImg = (name) => {
    return new URL(`/src/assets/images/logos/${name}.svg`, import.meta.url).href;
  };
</script>

<style lang="scss" scoped>
  .form-label {
    width: 200px;
  }
</style>
