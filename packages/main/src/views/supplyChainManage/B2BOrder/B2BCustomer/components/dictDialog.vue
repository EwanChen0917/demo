<template>
  <el-dialog :title="`添加${fieldName}`" v-model="visibility" width="500px" :before-close="cancel">
    <el-form :model="form" ref="formRef" scroll-to-error>
      <vxe-table :data="form.dataList" max-height="500px">
        <vxe-table-column :title="fieldName">
          <template #default="{ row, $rowIndex }">
            <el-form-item
              style="margin: 0"
              :prop="`dataList[${$rowIndex}].value`"
              required
              :show-message="false"
            >
              <el-input
                v-if="valueType === 2"
                v-model="row.value"
                @change="
                  ($event) => {
                    row.desc = $event;
                  }
                "
                maxlength="255"
              />
              <NumberInput
                v-else
                v-model="row.value"
                :min="1"
                @change="
                  ($event) => {
                    row.desc = $event + `(天)`;
                  }
                "
                :precision="0"
              />
            </el-form-item>
          </template>
        </vxe-table-column>
        <vxe-table-column title="操作" width="80">
          <template #default="{ $rowIndex }">
            <el-button link type="danger" @click="remove($rowIndex)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-form>
    <p style="margin-top: 20px">
      <el-button plain size="small" type="primary" @click="add">添加</el-button>
    </p>
    <template #footer>
      <span>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const visibility = ref(false);
  const form = ref<any>({
    dataList: [],
  });
  const props = defineProps<{
    code: string;
    name: string;
    fieldName: string;
    valueType: number;
  }>();
  const add = () => {
    form.value.dataList.push({
      desc: '',
      type: props.valueType,
      value: '',
    });
  };
  const remove = (index: number) => {
    form.value.dataList.splice(index, 1);
  };
  const formRef = ref();
  const cancel = () => {
    form.value.dataList = [];
    visibility.value = false;
  };
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await platformApi.platformDictSaveBatch({
        code: props.code,
        name: props.name,
        dictItemList: form.value.dataList,
      });
      cancel();
      ElMessage.success('保存成功');
      emits('success');
    }
  };
  const open = async () => {
    console.log(props.code);
    const res: any = await platformApi.platformDict({
      dictCodes: [props.code],
    });
    form.value.dataList = res.dictMap[props.code] || [];
    visibility.value = true;
  };
  const emits = defineEmits<{
    (event: 'success');
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
