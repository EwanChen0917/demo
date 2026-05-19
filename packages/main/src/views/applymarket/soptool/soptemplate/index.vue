<template>
  <div class="card card-flush">
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title">
        <el-space>
          <el-input v-model="search.keyword" placeholder="模板名称">
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
        </el-space>
      </div>
      <div class="card-toolbar">
        <el-space>
          <el-button
            class="button"
            type="primary"
            @click="
              () => {
                runQuery();
              }
            "
          >
            查询
          </el-button>
          <el-button
            class="button"
            @click="handleAdd"
            type="primary"
            v-permission="'soptemplateadd'"
          >
            添加流程模板
          </el-button>
        </el-space>
      </div>
    </div>
    <div class="card-body pt-0">
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.templateList"
        row-key="productSku"
        class-name="table-row-dashed"
      >
        <el-table-column prop="templateName" label="模板名称" />
        <el-table-column prop="templateDesc" label="描述" />
        <el-table-column prop="creatorName" label="创建人" width="160px" />
        <el-table-column prop="createTime" label="创建时间" width="180px" />
        <el-table-column align="right" label="操作" width="140px" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  text: true,
                  templateCode: row.templateCode,
                  permissionCode: 'soptemplatedetail',
                },
                {
                  label: '删除',
                  key: 'remove',
                  type: 'danger',
                  text: true,
                  templateCode: row.templateCode,
                  permissionCode: 'soptemplateRemove',
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
    </div>
  </div>
</template>

<script lang="ts" setup name="soptemplate">
  import useList from '@/hooks/list/useList';
  import { sopApi, SOPApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';

  const PAGE_SIZE = 10;
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
    // selectedKeys,
  } = useList<
    SOPApi.LuteosSopQueryTemplateList.RequestQuery,
    SOPApi.LuteosSopQueryTemplateList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: sopApi.luteosSopQueryTemplateList,
  });

  const router = useRouter();

  const handleActions = (operate) => {
    const { key, templateCode } = operate;
    switch (key) {
      case 'view':
        router.push(`/soptemplate/detail?templateCode=${templateCode}`);
        break;
      case 'remove':
        remove(templateCode);
        break;
      default:
        break;
    }
  };
  const handleAdd = () => {
    router.push(`/soptemplate/add`);
  };
  const remove = async (templateCode: string) => {
    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;
    await sopApi.luteosSopDeleteTemplate({ templateCode });
    ElMessage.success('删除成功');
    runQuery();
  };
</script>

<style scoped lang="scss"></style>
