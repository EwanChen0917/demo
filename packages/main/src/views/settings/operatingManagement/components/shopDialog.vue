<template>
  <el-dialog title="关联店铺" v-model="visibility" width="800px">
    <p>{{ companyName }}</p>
    <vxe-table :data="dataList" max-height="500px" min-height="50px" style="margin-bottom: 30px">
      <vxe-table-column field="shopAccount" title="店铺账号" />
      <vxe-table-column field="name" title="店铺名称" />
      <vxe-table-column field="platformDesc" title="平台" />
      <vxe-table-column field="site" title="站点" />
      <vxe-table-column field="statusDesc" title="店铺状态">
        <template #default="{ row }">
          <Tag :color="statusColorMap[row.status]">{{ row.statusDesc }}</Tag>
        </template>
      </vxe-table-column>
    </vxe-table>
    <template #footer>
      <span>
        <el-button @click="visibility = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const visibility = ref(false);
  const companyName = ref('');
  const open = (list: any) => {
    dataList.value = list.shopItemList;
    companyName.value = list.name;
    visibility.value = true;
  };
  const statusColorMap = reactive({
    1: 'green',
    0: 'red',
  });
  const dataList = ref([]);
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
