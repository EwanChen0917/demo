<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title">
        <h2>中奖结果</h2>
      </div>
    </div>
    <div class="card-body p-0">
      <KeenList>
        <el-form ref="formRef" :rules="rules" label-position="left" :model="editItem ?? {}">
          <el-table
            ref="tableRef"
            :data="listWithEditState"
            row-key="id"
            :row-class-name="({ row }) => (row.isEdit ? 'has-form-item' : '')"
          >
            <!-- <el-table-column type="selection" width="40" reserve-selection /> -->
            <el-table-column label="商品图">
              <template #default="scope">
                <el-avatar shape="square" :size="50" fit="cover" :src="scope.row.productImage" />
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称" min-width="200" />
            <el-table-column label="SPU">
              <template #default="scope">
                {{ scope.row.productSpu || '/' }}
              </template>
            </el-table-column>
            <el-table-column prop="configLevelName" label="奖品等级" />
            <el-table-column prop="targetCode" label="中奖码" />
            <el-table-column label="中奖邮箱" min-width="120">
              <template #default="scope">
                <el-form-item v-if="scope.row.isEdit && editItem" prop="email">
                  <el-input v-model="editItem.email" placeholder="请输入" />
                </el-form-item>
                <span v-else>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template #default="scope">
                <KeenActions
                  v-if="scope.row.email !== '虚拟中奖用户'"
                  display-style="buttons"
                  :actions="
                    scope.row.isEdit
                      ? [
                          {
                            label: '保存',
                            key: 'save',
                            type: 'primary',
                            text: true,
                            payload: scope,
                          },
                          {
                            label: '取消',
                            key: 'cancel',
                            text: true,
                            payload: scope,
                          },
                        ]
                      : [
                          {
                            label: '修改中奖用户',
                            key: 'change',
                            type: 'primary',
                            text: true,
                            payload: scope,
                            disabled: editItem?.id && editItem.id !== scope.row.id,
                          },
                        ]
                  "
                  @click="handleActions"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </KeenList>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ActivityContracts } from '@/api/index';
  import { ActivityPrizeType } from '@/types/api';
  import type { FormInstance, FormRules } from 'element-plus';

  const form = inject<
    ActivityContracts.ActivitySaveReq & {
      originActivityUserPrizeList: ActivityContracts.ActivityUserPrizeBean[];
    }
  >('form');

  const editItem = ref<ActivityContracts.ActivityUserPrizeBean | null>(null);
  const listWithEditState = computed(() => {
    return form?.originActivityUserPrizeList?.map((item, idx) => ({
      ...item,
      email: form.activityUserPrizeList?.[idx]?.email || item.email,
      isEdit: editItem.value?.id === item.id,
    }));
  });

  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    email: [
      {
        required: true,
        message: '请输入中奖邮箱',
      },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
      },
    ],
  });

  // 表格操作
  const handleActions = async (item) => {
    const {
      key,
      payload: { $index: idx, row },
    } = item;

    if (key === 'change') {
      editItem.value = row;
    }

    if (key === 'save') {
      if (!formRef.value || !editItem.value) return;
      const valid = await formRef.value?.validate().catch(() => {
        return false; // 校验失败返回 false，不继续执行
      });
      if (!valid) return;

      const { id, email } = editItem.value;
      form!.activityUserPrizeList![idx] = {
        id,
        email,
      };
      editItem.value = null;
    }

    if (key === 'cancel') {
      editItem.value = null;
    }
  };
</script>
