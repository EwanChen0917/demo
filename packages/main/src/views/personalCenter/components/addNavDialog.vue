<template>
  <el-dialog
    :model-value="visible"
    @close="$emit('close')"
    width="60%"
    title="编辑常用工具"
    align-center
  >
    <div class="list">
      <div
        class="item"
        v-for="item in totalList"
        :key="item.materialCode"
        @click="
          () => {
            item.collectFlag = !item.collectFlag;
          }
        "
      >
        <div class="item-left">
          <img class="item-img" :src="item.materialImage" alt="" />
          <span class="item-title">{{ item?.materialName }}</span>
        </div>
        <el-checkbox v-model="item.collectFlag" :checked="item.collectFlag === 1" size="small" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi } from '@/api';
  import { SystemNavBean, SystemNavModelBean } from '@/api/member/data-contracts';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    visible: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();

  watch(
    () => props.visible,
    () => {
      if (props.visible) getSystemNavList();
    }
  );

  const totalList = ref<SystemNavBean[]>([]);
  const systemNavModelList = ref<SystemNavModelBean[]>([]);
  const getSystemNavList = async () => {
    totalList.value = [];
    const res = await memberApi.luteosMemberQuerySystemNavList();
    systemNavModelList.value = res?.systemNavModelList || [];
    systemNavModelList.value?.forEach((item) => {
      totalList.value = totalList.value?.concat(item?.systemNavList);
    });
    totalList.value = totalList.value?.map((item) => {
      return { ...item, collectFlag: !!item.collectFlag };
    });
  };

  const handleSave = async () => {
    await memberApi.luteosMemberSaveMemberCollect({
      itemList: totalList.value?.map((item) => {
        return { itemCode: item.materialCode, collectFlag: item.collectFlag ? 1 : 0 };
      }),
      collectScene: 'sysnav',
    });
    ElMessage.success('保存成功');
    emit('save');
  };
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    max-height: 70vh;
    overflow: scroll;

    .item {
      width: 185px;
      height: 64px;
      padding: 8px 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      &-left {
        display: flex;
        align-items: center;
      }

      &-img {
        width: 46px;
        height: 46px;
        border-radius: 8px;
        margin-right: 12px;
        color: #1f1f20;
      }

      &-title {
        color: #3c3d40;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-right: 12px;
      }
    }
  }
</style>
