<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="广告组名称/店铺SKU" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.status" clearable placeholder="映射状态">
        <el-option label="正常" value="1" />
        <el-option label="异常" value="0" />
      </el-select>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.adsPlatformSkuList">
      <el-table-column label="广告组名称" prop="adName">
        <template #default="{ row }">
          <div>{{ row.adName }}</div>
          <div>广告组ID:{{ row.adId }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺SKU" prop="msku" />
      <el-table-column label="操作" width="60px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '编辑',
                key: 'edit',
                row: row,
                type: 'primary',
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
    <el-dialog title="编辑" v-model="dialogVisible" width="600px" :before-close="cancel">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="100px">
        <el-form-item label="广告ID：">{{ form.adId }}</el-form-item>
        <el-form-item label="广告名称：">{{ form.adName }}</el-form-item>
        <el-form-item label="店铺SKU：" prop="sellerSku">
          <el-input v-model.trim="form.sellerSku" placeholder="请输入店铺SKU" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </KeenList>
</template>

<script lang="ts" setup name="tkweeklymsku">
  import { ElTable as ElTableType, ElMessage } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { productApi, ProductApi } from '@/api/index';

  const PAGE_SIZE = 10;

  const tableRef = ref<InstanceType<typeof ElTableType>>();
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
    ProductApi.LuteosProductTiktokQueryTiktokAdsPlatformSkuList.RequestQuery,
    ProductApi.LuteosProductTiktokQueryTiktokAdsPlatformSkuList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
      status: undefined,
    },
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductTiktokQueryTiktokAdsPlatformSkuList,
  });
  const dialogVisible = ref(false);
  const form = ref({});
  const formRef = ref();
  const rules = {
    sellerSku: [{ required: true, message: '请输入店铺SKU', trigger: 'blur' }],
  };
  const handleActions = (command: any) => {
    const { key, row } = command;
    switch (key) {
      case 'edit':
        dialogVisible.value = true;
        form.value = {
          sellerSku: row.msku,
          adId: row.adId,
          adName: row.adName,
        };
        break;
      default:
        break;
    }
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const res = await productApi.luteosProductTiktokSaveTiktokAdsSku({
        adId: form.value.adId,
        sellerSku: form.value.sellerSku,
      });
      if (res) {
        ElMessage.success('操作成功');
        dialogVisible.value = false;
        runQuery();
        cancel();
      }
    }
  };
  const cancel = () => {
    form.value = {
      msku: '',
      adName: '',
    };
    formRef.value?.clearValidate();
    dialogVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
