<template>
  <el-dialog :title="title" v-model="visibility" width="600px" :before-close="close">
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-width="140px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item
            label="修改积分（增减）"
            prop="point"
            :rules="[
              {
                required: true,
                message: '请输入积分数量',
              },
            ]"
          >
            <Num
              v-model="form.point"
              :precision="0"
              style="width: 200px"
              :max="999999"
              :min="-999999"
            />
            <span v-if="uids.length === 1 && currentPoints" style="margin-left: 16px">
              当前积分: {{ currentPoints }}
            </span>
            <p style="line-height: 21px; font-size: 12px; margin: 8px 0 0 0; color: #f1416c">
              正数代表增加，负数代表减少，只能输入整数
              <br />
              若客户当前扣减积分不足，则会扣减至0，不会出现负积分
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="备注">
            <el-input
              :rows="5"
              v-model="form.remark"
              type="textarea"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  import { erpApi, userApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';

  const props = defineProps<{
    uids: string[] | number[];
  }>();
  const visibility = ref(false);
  const form = ref<any>({
    point: undefined,
    remark: '',
  });
  const formRef = ref();
  const currentPoints = ref('');
  const title = ref('');
  const open = (row?) => {
    currentPoints.value = row ? row.availablePoint : '';
    title.value = row ? '修改积分' : '批量修改积分';
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params = {
        ...form.value,
        uidList: props.uids,
      };
      await userApi.luteosUserDistributePointToUserBatch(params);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      point: undefined,
      remark: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  onMounted(() => {});
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
