<template>
  <el-dialog title="添加/修改运营人员" :model-value="visible" @close="emit('close')">
    <div class="mb-5">
      <el-row>
        <el-col :span="12">
          <el-form-item label="variantId:">{{ childInfo?.variantId }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="msku:">{{ childInfo?.msku }}</el-form-item>
        </el-col>
      </el-row>
    </div>
    <el-form ref="formRef" :model="form" label-position="top">
      <el-table :data="form.operators">
        <el-table-column label="运营人员">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'operators.' + $index + '.operator'"
              :rules="[{ required: true, message: '请选择运营人员' }]"
            >
              <DeptMember v-model="row.operator" deptId="65717209" :teleported="true" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="站点">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'operators.' + $index + '.site'"
              :rules="[{ required: true, message: '请选择站点' }]"
            >
              <ErpSiteSelect
                v-model="row.site"
                :channel="channel"
                :teleported="true"
                :disableList="form.operators?.map((item) => item.site)?.filter((item) => item)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="{ row }">
            <el-space>
              <el-link
                type="primary"
                :underline="false"
                @click="form.operators.push({ operator: '', site: '' })"
              >
                添加
              </el-link>
              <el-link
                v-if="form.operators.length > 1"
                type="danger"
                :underline="false"
                @click="form.operators.splice(form.operators.indexOf(row), 1)"
              >
                删除
              </el-link>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <el-space>
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">确认</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import ErpSiteSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/erpSiteSelect.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  const props = defineProps<{
    visible: boolean;
    operator?: string;
    childInfo?: any;
    keyword?: string;
    channel?: string;
    row: any;
  }>();

  const formRef = ref();
  const form = ref({
    operators: [
      {
        operator: '',
        site: '',
      },
    ],
  });
  if (props.row?.operatorList?.length)
    form.value.operators = props.row.operatorList?.map((item) => ({
      operator: item.operatorCode,
      site: item.site,
    }));

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save', url: string): void;
  }>();

  const saveLoading = ref(false);
  const handleSave = async () => {
    const valid = await formRef.value.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await productApi.luteosProductShopifyListingBatchSaveOperator({
        /* operator: form.value.operator,
        keywords: props.row[props.keyword],
        channel: props.channel,
        site: props.row.site,
        shop: props.row.shop, */
        // keywords: curRow.value.productId,
        variantIds: [props.childInfo?.variantId],
        operators: form.value.operators,
      });
      ElMessage.success('保存成功');
      emit('save');
    }
  };
</script>

<style scoped lang="scss"></style>
