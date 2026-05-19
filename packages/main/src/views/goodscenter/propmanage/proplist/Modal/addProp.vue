<template>
  <el-dialog title="新增属性" :model-value="visible" @close="$emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="属性名称" prop="attrName" required>
        <el-input v-model="form.attrName" placeholder="请输入属性名称" />
      </el-form-item>
      <el-form-item
        label="属性值"
        prop="editAttrVal"
        required
        :class="{ 'mb-0': !form.attrValueNameList?.length }"
      >
        <el-space>
          <el-input v-model="form.editAttrVal" placeholder="请输入" />
          <el-button type="primary" @click="handleAddAttrVal" :disabled="!form.editAttrVal">
            <template #icon>
              <i class="ki-duotone ki-abstract-10">
                <i class="path1"></i>
                <i class="path2"></i>
              </i>
            </template>
            添加
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item label="" prop="attrValueNameList" required>
        <el-space wrap>
          <el-tag
            v-for="(item, idx) in form.attrValueNameList"
            size="large"
            :key="item"
            closable
            @close="handleAttrValDel(idx)"
            disable-transitions
          >
            {{ item }}
          </el-tag>
        </el-space>
      </el-form-item>
      <el-form-item label="描述" prop="attrRemark">
        <el-input
          v-model="form.attrRemark"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
      <br />
      <!-- {{ JSON.stringify(form) }} -->
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import type { FormInstance, FormRules, FormItemInstance } from 'element-plus';

  import { productApi, ProductApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'windowClose'): void;
  }>();

  const router = useRouter();
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<
    ProductApi.LuteosProductAttrSaveOrUpdateAttr.RequestBody & {
      editAttrVal: string;
    }
  >({
    editAttrVal: '',
    attrName: '',
    attrRemark: '',
    attrValueNameList: [],
  });
  const rules = reactive<FormRules>({
    attrName: [
      {
        required: true,
        message: '请填写属性名称',
      },
    ],
    editAttrVal: [
      {
        required: false,
        validator: (_, val: string, callback) => {
          if (form.attrValueNameList?.some((item) => val === item)) {
            return callback(`属性值 ${val} 已存在`);
          }
          return true;
        },
      },
    ],
    attrValueNameList: [
      {
        validator: (_, val: string[], callback) => {
          if (val?.length < 1) {
            return callback('请至少填写一个属性值');
          }
          return true;
        },
        trigger: ['change'],
      },
    ],
  });

  // 属性值操作
  const handleAddAttrVal = async () => {
    const valid = await formRef.value!.validateField(['editAttrVal']);
    if (!valid) return;
    form.attrValueNameList?.push(form.editAttrVal);
    form.editAttrVal = '';
  };
  const handleAttrValDel = (idx: number) => {
    // TODO 二次确认
    form.attrValueNameList?.splice(idx, 1);
  };

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        const { attrName, attrRemark, attrValueNameList } = form;
        const attrValueList = attrValueNameList.map((item) => {
          return { attrValueName: item };
        });
        const res = await productApi.luteosProductAttrSaveOrUpdateAttr({
          attrName,
          attrRemark,
          attrValueList,
        });

        const isConfirmed = await swal.confirm({
          title: '属性创建成功，是否去查看详情?',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (isConfirmed) {
          router.push(`/proplist/detail?code=${res?.attrCode}`);
        }

        emit('close', true);
        resetForm();
      } catch (e) {
        // do nothing
      } finally {
        saveLoading.value = false;
      }
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    emit('close');
    resetForm();
  };

  // 重置
  const resetForm = () => {
    formRef.value!.resetFields();
    form.editAttrVal = '';
  };
</script>
