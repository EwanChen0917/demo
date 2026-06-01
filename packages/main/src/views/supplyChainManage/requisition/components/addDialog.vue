<template>
  <el-dialog title="添加领用物品" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" label-width="0" :rules="rules" scroll-to-error>
      <el-table :data="form.list">
        <el-table-column label="序号" width="65">
          <template #default="{ $index }">
            <el-form-item>
              {{ $index + 1 }}
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="物品名称">
          <template #default="{ row, $index }">
            <el-form-item :prop="`list.${$index}.itemName`" :rules="rules.itemName">
              <el-input
                v-model="row.itemName"
                maxlength="20"
                show-word-limit
                clearable
                @blur="
                  (e) => {
                    row.itemName = e.target.value?.trim();
                  }
                "
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="物料属性">
          <template #default="{ row, $index }">
            <el-form-item :prop="`list.${$index}.sensitiveType`" :rules="rules.sensitiveType">
              <el-select
                style="width: 100%"
                v-model="row.sensitiveType"
                placeholder="请选择"
                clearable
                multiple
                collapse-tags
                collapse-tags-tooltip
              >
                <el-option
                  v-for="item in sensitiveTypeList"
                  :label="item.desc"
                  :value="item.value"
                  :key="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ $index }">
            <el-form-item>
              <el-button type="primary" link @click="addRow">添加</el-button>
              <el-button v-if="form.list?.length > 1" type="danger" link @click="delRow($index)">
                删除
              </el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const emit = defineEmits<{
    (event: 'success', value: any): void;
  }>();

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    list: [{ itemName: '', sensitiveType: [] }],
  });
  const rules = reactive({
    itemName: [{ required: true, message: '请输入物品名称', trigger: ['blur', 'change'] }],
    sensitiveType: [{ required: true, message: '请选择物料属性', trigger: ['blur', 'change'] }],
  });

  const sensitiveTypeList = ref([]);

  const save = async () => {
    const isValid = await formRef.value.validate()?.catch(() => false);
    if (!isValid) return;
    visible.value = false;
    emit(
      'success',
      form.value.list?.map((item) => {
        return {
          itemName: item.itemName,
          itemProperties: item.sensitiveType
            ?.map((type) => sensitiveTypeList.value?.find((key) => key.value === type)?.desc)
            ?.join(','),
        };
      })
    );
  };

  const addRow = () => {
    form.value.list.push({ itemName: '', sensitiveType: [] });
  };

  const delRow = (index) => {
    form.value.list.splice(index, 1);
  };

  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    sensitiveTypeList.value = res.sensitiveTypeBeanList.map((item) => {
      return {
        desc: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };

  const open = () => {
    querySensitiveTypeList();
    visible.value = true;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
