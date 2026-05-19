<template>
  <KeenList>
    <template #search>
        <h3>红人各渠道信息</h3>
    </template>
  
    <template #buttons>
      <el-button type="primary" @click="isEdit = true" :disabled="!form.channelList.length">编辑</el-button>
    </template>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-table ref="tableRef" :data="form.channelList">
        <el-table-column label="渠道" min-width="100px">
            <template #default="{ row }">
            <div class="d-flex items-center gap-2">
                <div>
                <el-space>
                    <el-tooltip
                    popper-class="action_tool_tip text-gray-600"
                    effect="light"
                    placement="top"
                    :content="row.channelName"
                    >
                    <img style="width: 20px" :src="getImg(row.channelCode)" class="channel-img" />
                    </el-tooltip>
                </el-space>
                </div>
            </div>
            </template>
        </el-table-column>
        <el-table-column label="渠道账号" min-width="100px">
            <template #default="{ row }">
            <div style="font-size: 14px">
                {{ row.channelAccount }}
                <i
                v-if="row.channelAccount"
                class="fas fa-copy text-hover-primary cursor-pointer"
                @click.stop="copyFn(row.channelAccount, '')"
                ></i>
            </div>
            </template>
        </el-table-column>
        <el-table-column label="渠道粉丝数" prop="fansNum" min-width="100px">
            <template #default="{ row, $index }">
                <div v-if="isEdit">
                  <el-form-item
                    label="" 
                    :prop="`channelList[${$index}].fansNum`" 
                    :rules="[
                        { required: true, message: '请输入渠道粉丝数', trigger: ['blur', 'change'] },
                        {
                            pattern: /^(0|[1-9]\d*)$/,
                            message: '请输入大于等于0的整数',
                            trigger: ['blur', 'change'],
                        },
                    ]">
                    <el-input v-model="form.channelList[$index].fansNum" type="number" />
                  </el-form-item>
                </div>
                <div v-else>
                    {{ row.fansNum }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="渠道粉丝量区间" prop="fansNumRange" min-width="100px" />
        <el-table-column label="渠道红人等级" prop="redLevel" min-width="100px" />
        <el-table-column label="渠道链接" min-width="200px">
            <template #default="{ row }">
                <div v-if="isEdit">
                    <el-input v-model="row.channelHome" />
                </div>
            <div style="font-size: 12px" v-else>
                <template v-if="row.channelHome">
                    <a target="_blank" :href="row.channelHome" style="margin-right: 4px">{{ row.channelHome }}</a>
                    <i
                    class="fas fa-copy text-hover-primary cursor-pointer"
                    @click.stop="copyFn(row.channelHome, '')"
                    ></i>
                </template>
                <template v-else>-</template>
            </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right" v-if="isEdit">
            <template #default="{ row }">
            <KeenActions
                :actions="[
                {
                    label: '删除',
                    key: 'del',
                    type: 'primary',
                    text: true,
                    hide: !isEdit,
                    row: row,
                },
                ]"
                @click="handleActions"
            />
            </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="btn-wrap" v-if="isEdit">
        <el-button  @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </KeenList>
</template>

<script lang="ts" setup>
    import { ElTable as ElTableType } from 'element-plus';
  import { ElMessage } from 'element-plus';

  import useList from '@/hooks/list/useList';
  import { metaApi, MetaApi, platformApi, productApi } from '@/api/index';
  import { copyFn } from '@/utils/copyFn';
  import * as swal from '@/utils/swal';

   const props = defineProps<{
    userCode: String;
  }>();

  const emit = defineEmits<{
    (event: 'save'): void;
  }>();

  const isEdit = ref(false)

  const queryChannelList = async () => {
    const res = await metaApi.luteosMetaQueryUserChannelInfo({
        userCode: props.userCode,
    })
    form.value.channelList = res.activeBeanList || []
  };

  queryChannelList();

  const getImg = (name) => {
    return new URL(`/src/assets/images/logos/${name}.svg`, import.meta.url).href;
  };

  const handleActions = async (operation) => {
    const { key, row } = operation;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      await metaApi.luteosMetaDeleteUserChannelInfo({
        userCode: props.userCode,
        channelCode: row.channelCode,
      })
      queryChannelList()
    }
  };
  
  const formRef = ref();
  const form = ref({
    channelList: [],
  })
  const handleCancel = () => {
    isEdit.value = false;
    queryChannelList();
  }
  const handleSubmit = async () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const updateList = [];
        form.value.channelList?.forEach((row) => {
          updateList.push({
            channelHome: row.channelHome,
            fansNum: row.fansNum,
            channelCode: row.channelCode,
            userCode: props.userCode,
          });
        });
        if (updateList.length) {
        await metaApi.luteosMetaEditUserChannelInfo({ updateBeanList: updateList, })
        ElMessage.success('保存成功！');
        isEdit.value = false;
        queryChannelList();
        emit('save')
        }
      }
    });
  }
  
</script>

<style scoped lang="scss">
.btn-wrap {
    margin-top: 50px;
    width: 100%;
    text-align: center;
}
</style>
