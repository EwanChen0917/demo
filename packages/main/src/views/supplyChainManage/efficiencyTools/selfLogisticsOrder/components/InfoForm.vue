<template>
  <el-form class="form-list" onsubmit="return false">
    <el-form-item
      v-for="item in localFormList"
      :key="item.prop"
      :label="`${item.label}：`"
      :prop="item.prop"
    >
      <!-- 上传文件 -->
      <div v-if="item.com == 'upload'" style="display: flex;align-items: center;">
         <el-link class="file-link" type="primary" :underline="false">
          <OverflowTooltip :content="localFormModel.fileName" :line="2" color="#02B96B" />
          <el-icon v-if="localFormModel.fileName" class="delete-icon" @click.stop="removeFile">
            <Delete />
          </el-icon>
        </el-link>
        <i class="iconfont icon-shangchuan1" @click="handleClick"></i>
      </div>

      <!-- 可编辑字段 -->
      <div v-if="item.editable">
        <span v-if="!item.editing">
          {{ localFormModel?.[item.prop] }}
          <i class="iconfont icon-bianji" @click="item.editing = true"></i>
        </span>
        <el-input
          v-if="item.editing"
          v-model="localFormModel[item.prop]"
          @blur="handleInputChange(item)"
          @change="handleInputChange(item)"
        />
      </div>
      <!-- 纯展示字段 -->
      <span v-if="!item.editable && !item.com">{{ localFormModel?.[item.prop] || '-' }}</span>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import * as swal from '@/utils/swal';
  
  interface formListItem {
    label?: string;
    prop: string;
    editable?: boolean;
    editing?: boolean;
    com?: string;
  }

  const props = withDefaults(
    defineProps<{
      formList: Array<formListItem>;
      formModel: Object;
    }>(),
    {
      formList: () => [],
      formModel: () => {
        return {};
      },
    }
  );

  const localFormModel = ref<any>(props.formModel);
  const localFormList = ref<Array<formListItem>>(props.formList);

  watch(
    () => props.formModel,
    (newval) => {
      localFormModel.value = cloneDeep(newval);
    },
    {
      deep: true,
    }
  );

  watch(
    () => props.formList,
    (newval) => {
      localFormList.value = cloneDeep(newval);
    },
    {
      deep: true,
    }
  );

  const emits = defineEmits<{
    (e: 'change', val, val2): void;
  }>();

  const handleClick = () => {
    document.querySelector('.row-btn')?.click();
  }

  const handleInputChange = async (item, flag = false) => {
    const params = flag ? item : {
     [item.prop]: localFormModel.value[item.prop],
    };
    await emits('change', params, flag);
    item.editing = false;
  };

  const removeFile = async () => {
    try {
      const confirmed = await swal.confirm('确认删除附件吗？');
      if (!confirmed) return;
      swal.success('删除成功');
      let params = {extraInfo: '', fileName: ''};
      handleInputChange(params, true);
    } catch (error) {}
  };
</script>

<style lang="scss" scoped>
  .form-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    .icon-bianji, .icon-shangchuan1 {
      cursor: pointer;
      color: var(--el-color-primary);
      &:hover {
        color: var(--el-color-primary-light-3);
      }
    }
    .file-link {
      margin-right: 5px;
    }
    .delete-icon {
      margin-left: 5px;
    }
    .upload-container {
      display: flex;
      align-items: center;
    }
  }
</style>
