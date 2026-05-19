<template>
  <el-dialog title="合并账号" v-model="innerVisible" @open="initData" @close="close" width="450px">
    <div>
      <p>请选择需要进行合并的红人账号</p>
      <el-select v-model="mergeUser" class="w-100 mb-3" placeholder="合并红人主账号">
        <el-option
          v-for="item in useList"
          :key="item.channelAccount"
          :label="item.channelAccount"
          :value="item.userCode"
        />
      </el-select>
      <p v-if="userInfo?.channelAccount" class="text-warning">
        提示: 可能为重复红人，合并成功后，红人名称为 {{ userInfo.channelAccount }}
      </p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">不合并</el-button>
        <el-button :loading="loading" :disabled="disabled" type="primary" @click="handleSave">
          合并
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { metaApi } from '@/api';
  import type { MetaUserBean } from '@/api/meta/data-contracts';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{ visible: boolean; row: any }>();
  const emits = defineEmits<{
    (event: 'update:visible'): void;
    (event: 'refresh'): void;
  }>();

  const innerVisible = useVModel(props, 'visible');

  function close() {
    innerVisible.value = false;
  }

  const mergeUser = ref('');
  const useList = ref<MetaUserBean[]>([]);
  const userInfo = computed(() => useList.value.find((item) => item.userCode === mergeUser.value));
  async function initData() {
    mergeUser.value = '';

    const { userList } = await metaApi.luteosMetaQueryUserListSelect({
      keyword: props.row.email,
      pageNum: 1,
      pageSize: 999,
    });
    useList.value = userList?.filter((item) => item.userCode !== props.row.userCode) || [];
  }

  const disabled = computed(() => !useList.value.length || !mergeUser.value);
  const loading = ref(false);

  function handleSave() {
    metaApi
      .luteosMetaOperateUser({
        mergeUserCode: mergeUser.value,
        operateType: 5, // 合并红人
        userCode: props.row.userCode,
      })
      .then(() => {
        ElMessage.success('合并成功');
        close();
        emits('refresh');
      })
      .finally(() => {
        loading.value = false;
      });
  }
</script>

<style scoped lang="scss"></style>
