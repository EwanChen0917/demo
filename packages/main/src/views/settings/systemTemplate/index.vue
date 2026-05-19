<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" placeholder="模板标题/编码" clearable>
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-select v-model="search.type" placeholder="模板类型" clearable filterable>
        <el-option
          v-for="item in templateTypeOptions"
          :label="item?.label"
          :value="item?.value"
          :key="item?.value"
        />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addTemplate">新增模板</el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="(listData as any)?.sysTemplateList || []"
      row-key="id"
      class-name="table-row-dashed"
    >
      <el-table-column label="模板标题" prop="templateName" min-width="200" fixed="left">
        <template #default="{ row }">
          <div class="d-flex gap-2">
            <span>{{ row?.templateName }}</span>
            <Tag color="blue" v-if="row?.isDefault">默认</Tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模板编码" prop="templateCode" min-width="160" />
      <el-table-column label="模板类型" prop="typeDesc" min-width="120">
        <template #default="{ row }">
          {{ row?.typeDesc || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="模板内容" prop="template" min-width="300">
        <template #default="{ row }">
          <el-tooltip effect="dark" placement="top-start" popper-class="template-tooltip">
            <template #content>
              <div class="tooltip-content" v-html="formatTemplateHtml(row.template)"></div>
            </template>
            <div class="template-content">
              {{
                row?.template
                  ? (() => {
                      const formatted = formatTemplateContent(row.template);
                      return formatted.length > 100
                        ? formatted.substring(0, 100) + '...'
                        : formatted;
                    })()
                  : '-'
              }}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="160" />
      <el-table-column label="创建人" prop="creatorName" min-width="120" />
      <el-table-column label="更新时间" prop="updateTime" min-width="160" />
      <el-table-column label="更新人" prop="updatorName" min-width="120" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-switch
            :model-value="row.status"
            :active-value="1"
            :inactive-value="0"
            :loading="row.statusLoading"
            @change="changeStatus(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'detail',
                type: 'primary',
                row,
              },
              {
                label: '编辑',
                key: 'edit',
                type: 'primary',
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
  <!-- 模板弹窗组件 -->
  <TemplateDialog
    ref="templateDialogRef"
    v-model="dialogVisible"
    :mode="dialogMode"
    :template-data="currentTemplateData"
    @success="refreshList"
  />
</template>

<script setup lang="ts" name="systemTemplate">
  import useList from '@/hooks/list/useList';
  import { platformApi, PlatformApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import TemplateDialog from './components/templateDialog.vue';

  const PAGE_SIZE = 10;
  const router = useRouter();
  // 模拟API接口类型定义

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
    PlatformApi.PlatformTemplateQueryTemplateList.RequestQuery,
    PlatformApi.PlatformTemplateQueryTemplateList.RequestBody
  >({
    searchDefaults: {
      keyword: undefined,
      type: undefined,
    },
    pageSize: PAGE_SIZE,
    service: platformApi.platformTemplateQueryTemplateList as any,
  });

  // 模板类型选项
  const templateTypeOptions = ref([
    { label: '消息通知', value: 'notice' },
    { label: '日志', value: 'log' },
  ]);

  // 弹窗相关状态
  const templateDialogRef = ref();
  const dialogVisible = ref(false);
  const dialogMode = ref<'add' | 'edit' | 'detail'>('add');
  const currentTemplateData = ref(null);
  // 表格操作
  const loading = ref(false);
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'detail') {
      openDialog('detail', row);
    } else if (key === 'edit') {
      openDialog('edit', row);
    }
  };
  // 格式化模板内容，只处理转义序列的换行符
  const formatTemplateContent = (content: string) => {
    if (!content) return '';
    let text = String(content);
    // 只处理字面量的转义序列（\\r\\n、\\n、\\r），不处理实际的换行符
    text = text
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\n');
    // 可选：将制表符转为空格或实际制表符
    text = text.replace(/\\t/g, '\t');
    return text;
  };

  // 转义 HTML，避免 XSS
  const escapeHtml = (value: string) => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // 将换行转换为 <br> 并安全渲染
  const formatTemplateHtml = (content: string) => {
    const text = formatTemplateContent(content);
    const safe = escapeHtml(text);
    return safe.replace(/\n/g, '<br/>');
  };
  const changeStatus = async (row: any) => {
    const { templateCode } = row;
    const newStatus = row.status === 1 ? 0 : 1; // 切换状态
    const originalStatus = row.status; // 保存原始状态

    try {
      // 设置loading状态
      row.statusLoading = true;

      // 先更新UI状态
      row.status = newStatus;

      const res = await platformApi.platformTemplateOperate({
        templateCode,
        operateType: newStatus === 1 ? 'enable' : 'disable',
      });

      ElMessage.success(newStatus ? '启用成功' : '禁用成功');
      // 成功后刷新列表确保数据一致性
      refreshList();
    } catch (error) {
      console.error('提交失败:', error);
      // 失败时回滚状态
      row.status = originalStatus;
      ElMessage.error('操作失败，请重试');
    } finally {
      row.statusLoading = false;
    }
  };

  const addTemplate = () => {
    openDialog('add');
  };

  // 打开弹窗
  const openDialog = (mode: 'add' | 'edit' | 'detail', data?: any) => {
    dialogMode.value = mode;
    currentTemplateData.value = data || null;
    dialogVisible.value = true;
  };
</script>

<style scoped lang="scss">
  .template-content {
    max-width: 300px;
    word-break: break-all;
    line-height: 1.4;
  }
  :deep(.template-tooltip) .tooltip-content {
    white-space: pre-wrap; // 保留换行符并自动换行
    word-break: break-word;
  }
</style>
