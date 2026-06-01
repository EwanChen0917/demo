<template>
  <el-dialog
    :title="`${form.groupCode ? '编辑' : '新增'}标签`"
    v-model="visibility"
    width="600px"
    :before-close="close"
  >
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form-item
            label="标签组名称"
            prop="groupName"
            :rules="[
              {
                required: true,
                message: '请输入标签组名称',
              },
            ]"
          >
            <el-input
              v-model="form.groupName"
              placeholder=""
              clearable
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item
            label="标签类型"
            prop="type"
            :rules="[
              {
                required: true,
                trigger: 'change',
                message: '请选择标签类型',
              },
            ]"
          >
            <el-select
              :disabled="!!form.groupCode"
              style="width: 100%"
              v-model="form.type"
              clearable
            >
              <el-option label="单选项" :value="1" />
              <el-option label="多选项" :value="2" />
            </el-select>
            <p style="line-height: 21px; margin-top: 8px; font-size: 13px; color: #a1a1a1">
              标签类型创建后不可更改，请谨慎选择
              <br />
              最多可建20个标签值选项，最少需要创建2个标签值选项标签值
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item
            label="标签值"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <div style="width: 100%; max-height: 430px; overflow-y: auto; overflow-x: hidden">
              <el-row :gutter="20">
                <el-col :span="24" :offset="0" v-for="(tag, index) of form.tags" :key="index">
                  <el-form-item
                    style="margin-bottom: 24px"
                    :prop="`tags[${index}].tagName`"
                    :rules="[
                      { required: true, message: '请输入选项值' },
                      {
                        validator: (_, value, callback) => {
                          if (form.tags.filter((item) => item.tagName === value).length > 1) {
                            callback('标签值不可重复');
                          } else {
                            callback();
                          }
                        },
                      },
                    ]"
                  >
                    <div style="display: flex; width: 100%">
                      <span>选项{{ index + 1 }}</span>
                      <div style="flex: 1; margin: 0 20px">
                        <el-input v-model="tag.tagName" maxlength="30" show-word-limit />
                      </div>
                      <span style="min-width: 34px">
                        <el-button
                          v-if="form.tags.length > 2"
                          link
                          type="danger"
                          @click="
                            () => {
                              form.tags.splice(index, 1);
                            }
                          "
                        >
                          删除
                        </el-button>
                      </span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-button
                v-if="form.tags.length < 20"
                link
                type="primary"
                icon="Plus"
                @click="
                  () => {
                    form.tags.push({
                      tagCode: '',
                      tagName: '',
                    });
                  }
                "
              >
                新增选项
              </el-button>
            </div>
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
  import { userApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  const visibility = ref(false);
  const form = ref<any>({
    groupCode: '',
    groupName: '',
    type: 2,
    tags: [
      { tagCode: '', tagName: '' },
      { tagCode: '', tagName: '' },
    ],
  });
  const formRef = ref();
  const open = (row?) => {
    if (row) {
      form.value.groupCode = row.groupCode;
      form.value.groupName = row.groupName;
      form.value.type = row.type;
      form.value.tags = cloneDeep(row.tags);
    }
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params = {
        ...cloneDeep(form.value),
      };
      if (params.groupCode === '') {
        Reflect.deleteProperty(params, 'groupCode');
      }
      await userApi.luteosUserTagSaveTag(params);
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      groupCode: '',
      groupName: '',
      type: 2,
      tags: [
        { tagCode: '', tagName: '' },
        { tagCode: '', tagName: '' },
      ],
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
