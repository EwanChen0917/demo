<template>
  <el-dialog :title="title" v-model="visibility" width="600px" :before-close="close">
    <div class="filter-options">
      <el-select style="width: 120px" v-model="search.type" clearable placeholder="全部类型">
        <el-option label="单选项" :value="1" />
        <el-option label="多选项" :value="2" />
      </el-select>
      <el-input
        style="width: 200px; margin-left: 12px"
        v-model="search.keyword"
        placeholder="请输入标签关键字"
        clearable
      />
    </div>
    <div style="max-height: 400px; margin-top: 40px; overflow: auto" v-if="tagGroups.length">
      <div v-for="(item, index) of tagGroups" :key="index">
        <h5>{{ item.groupName }}：</h5>
        <p>
          <el-checkbox-group
            size="small"
            v-model="item.tagCode"
            :max="+item.type === 1 ? 1 : Infinity"
          >
            <el-checkbox :label="tag.tagCode" border v-for="tag of item.tags" :key="tag.tagCode">
              {{ tag.tagName }}
            </el-checkbox>
          </el-checkbox-group>
        </p>
        <el-divider content-position="left" />
      </div>
    </div>
    <div v-else>
      <el-empty description="暂无数据" />
    </div>
    <div v-if="isOverTenTagGropus" style="color: #f1416c">最多支持选择10组标签</div>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              confirm();
            }
          "
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { userApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    uids: string[] | number[];
  }>();
  const title = ref('打标签');
  const visibility = ref(false);
  const form = ref<any>({
    tagGroups: [],
  });
  const search = reactive({
    type: '',
    keyword: '',
  });
  const open = (multi?) => {
    title.value = multi ? '批量打标签' : '打标签';
    initData();
    visibility.value = true;
  };
  const confirm = async () => {
    const params = {
      tagGroups: form.value.tagGroups
        .filter((item) => {
          return item.tagCode.length > 0;
        })
        .map((item) => {
          return {
            groupCode: item.groupCode,
            tagCode: item.tagCode,
          };
        }),
      uidList: [...props.uids] as string[],
    };
    console.log(params);
    if (params.tagGroups.length === 0) {
      return ElMessage.warning('请选择标签');
    }
    if (params.tagGroups.length > 10) {
      return ElMessage.warning('最多支持选择10组标签');
    }
    await userApi.luteosUserSaveUserTag(params);
    ElMessage.success('操作成功');
    emits('success');
    close();
  };
  const initData = async () => {
    // luteosUserQueryUserTag
    const { tags }: any = await userApi.luteosUserTagQuery({
      pageNum: 1,
      pageSize: 500,
    });
    if (tags && props.uids.length === 1) {
      const { tagGroupBeans } = await userApi.luteosUserQueryUserTag({
        uid: props.uids[0] as string,
      });
      if (tagGroupBeans) {
        tagGroupBeans.forEach((tag: any) => {
          const result: any = tags.find((item) => item.groupCode === tag.groupCode);
          console.log(result);
          if (result) {
            result.tagCode = tag.tags.map((i) => i.tagCode);
          }
        });
      }
    }
    console.log(tags);
    form.value.tagGroups = tags?.map((item: any) => {
      item.tagCode = item.tagCode || [];
      return item;
    });
  };
  const close = () => {
    form.value = {
      tagGroups: [],
    };
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  const tagGroups = computed(() => {
    return form.value.tagGroups.filter((item: any) => {
      const type = search.type ? item.type === search.type : true;
      const keyword = search.keyword
        ? item.groupName.includes(search.keyword) ||
          item.tags.some((tag) => tag.tagName.includes(search.keyword))
        : true;
      return type && keyword;
    });
  });
  const isOverTenTagGropus = computed(() => {
    return (
      form.value.tagGroups.filter((item) => {
        return item.tagCode.length > 0;
      }).length > 10
    );
  });
  onMounted(() => {});
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-checkbox) {
    margin-top: 8px;
  }
</style>
