<template>
  <el-dialog :title="title" v-model="visibility" width="500px" :before-close="close">
    <el-form
      ref="poolForm"
      label-width="120px"
      :rules="rules"
      :model="form"
      :disabled="model === 'detail'"
      label-position="top"
    >
      <el-form-item label="分配池编码" prop="poolCode">
        <el-input v-model="form.poolCode" :disabled="disabledMap.poolCode" />
      </el-form-item>
      <el-form-item label="分配池名称" prop="poolName">
        <el-input v-model="form.poolName" :disabled="disabledMap.poolName" />
      </el-form-item>
      <el-form-item label="层级" prop="level">
        <el-select placeholder="请选择层级" v-model="form.level" :options="poolLevelMap" disabled />
      </el-form-item>
      <el-form-item label="上一级" prop="parentCode" v-if="form.level !== 0">
        <el-select
          placeholder="选择上一级分配池"
          v-model="form.parentCode"
          @change="handleParentCodeChange"
          filterable
          :disabled="disabledMap.parentCode"
        >
          <el-option
            v-for="item in filterPoolMap"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="优先级别" prop="priority">
        <NumberInput
          v-model.number="form.priority"
          :max="10"
          :min="1"
          :precision="0"
          :disabled="disabledMap.priority"
        />
      </el-form-item>
      <el-form-item label="是否支持锁库" prop="supportLock">
        <el-radio-group v-model="form.supportLock" :disabled="disabledMap.supportLock">
          <el-radio v-for="item in supportLockMap" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否共享" prop="isShared" v-if="form.level !== 2">
        <el-radio-group v-model="form.isShared" :disabled="disabledMap.isShared">
          <el-radio v-for="item in isSharedMap" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" :disabled="disabledMap.status">
          <el-radio v-for="item in statusMap" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="confirm">{{ confirmText }}</el-button>
        <el-button @click="close">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { nextTick } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { cisApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { basePoolDataType } from '../typed';
  import { useBaseStock } from '../hooks/useBaseStock';
  import { isSharedMap, poolLevelMap, statusMap, supportLockMap } from '../config/pool';

  const { activePoolMap, getActivePoolMap } = useBaseStock();
  interface Props {
    poolData?: basePoolDataType;
    confirmText?: string;
    level?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    confirmText: '确认',
  });
  const visibility = ref(false);
  const form = ref({
    id: undefined,
    poolCode: '',
    poolName: '',
    parentCode: '',
    level: 0,
    priority: 1,
    status: 1,
    supportLock: 1,
    isShared: 1,
    type: 'IN_STOCK',
  });
  const title = computed(() => {
    if (model.value === 'add') {
      return '添加分配池';
    }
    if (model.value === 'edit') {
      return '编辑分配池';
    }
    if (model.value === 'detail') {
      return '分配池详情';
    }
    return '分配池';
  });
  const poolForm = ref<FormInstance>();
  const rules = computed<FormRules>(() => ({
    poolCode: [{ required: true, message: '请输入分配池编码', trigger: 'blur' }],
    poolName: [{ required: true, message: '请输入分配池名称', trigger: 'blur' }],
    supportLock: [{ required: true, message: '请选择是否支持锁库', trigger: 'blur' }],
    isShared: [{ required: true, message: '请选择是否支持共享', trigger: 'blur' }],
    // 如果层级是0,则上一级不是必填
    parentCode:
      form.value.level === 0
        ? []
        : [{ required: true, message: '请选择上一级分配池', trigger: 'change' }],
    priority:
      form.value.level === 2
        ? [{ required: true, message: '请输入优先级别', trigger: 'blur' }]
        : [],
  }));
  const model = ref('add');

  const currentLevel = computed(() => {
    return props.level !== undefined ? props.level : form.value.level;
  });

  const disabledMap = computed(() => {
    const level = currentLevel.value;
    return {
      poolCode: model.value !== 'add',
      poolName: false,
      parentCode: model.value === 'add' ? false : level !== 2,
      priority: model.value === 'add' ? false : level !== 2,
      supportLock: model.value === 'add' ? false : level !== 2,
      isShared: model.value !== 'add',
      status: model.value === 'add' ? false : level !== 2,
    };
  });

  const filterPoolMap = computed(() => {
    if (model.value === 'add' || form.value.level === 0) {
      return activePoolMap.value;
    }
    const currentLevels = form.value.level;
    if (currentLevels === 1) {
      return activePoolMap.value.filter((e) => e.level === 0);
    }
    if (currentLevels === 2) {
      return activePoolMap.value.filter((e) => e.level === 1);
    }
    return activePoolMap.value;
  });
  const open = (poolcode: any = 0, type = 'add') => {
    model.value = type;

    // 先清除之前的校验状态
    nextTick(() => {
      if (poolForm.value) {
        poolForm.value.clearValidate();
      }
    });

    if (type === 'add') {
      form.value = {
        id: undefined,
        poolCode: '',
        poolName: '',
        parentCode: '',
        level: props.level !== undefined ? props.level : 0,
        priority: 1,
        status: 1,
        supportLock: 1,
        isShared: 0,
        type: 'IN_STOCK',
      };
    } else {
      form.value.level = props.level !== undefined ? props.level : 0;
    }
    visibility.value = true;
    getActivePoolMap((form.value.level - 1).toString(), form.value.level === 2);
    if (poolcode && type !== 'add') {
      getPoolData(poolcode);
    }
  };

  const loading = ref(false);
  const getPoolData = async (poolCode) => {
    if (loading.value) return;
    loading.value = true;
    try {
      const res = (await cisApi.cisPoolDetail(poolCode)) as any;
      if (!res || !res.poolDetail) return;
      Object.assign(form.value, res.poolDetail);
    } catch (e) {
      /** epmty  */
    } finally {
      loading.value = false;
    }
  };
  const submitData = async () => {
    if (loading.value) return;
    loading.value = true;
    if (model.value === 'detail') {
      close();
      return;
    }
    if (!poolForm.value) return;
    try {
      const valid = await poolForm.value.validate().catch(() => {
        return false;
      });
      if (!valid) return;
      const params: any = cloneDeep(form.value);
      if (params.level === 2) {
        delete params.isShared;
      }
      if (model.value === 'add') {
        await cisApi.cisPoolSaveOrUpdate(params);
        ElMessage.success('操作成功');
      }
      if (model.value === 'edit') {
        await cisApi.cisPoolSaveOrUpdate(form.value);
        ElMessage.success('操作成功');
      }

      close();
    } catch (e) {
      /** empty */
    } finally {
      loading.value = false;
    }
  };
  const resetForm = () => {
    form.value = {
      id: undefined,
      poolCode: '',
      poolName: '',
      parentCode: '',
      level: 0,
      priority: 1,
      status: 1,
      supportLock: 1,
      isShared: 1,
      type: 'IN_STOCK',
    };
    model.value = 'add';

    nextTick(() => {
      if (!poolForm.value) return;
      poolForm.value.resetFields();
      poolForm.value.clearValidate();
    });
  };
  const handleParentCodeChange = (value: string) => {
    const parent = activePoolMap.value.find((e) => e.value === value);
    if (!parent) return;
    if (parent.level === 0) {
      form.value.level = 1;
    } else if (parent.level === 1) {
      form.value.level = 2;
    }
  };
  const close = () => {
    visibility.value = false;
    // 关闭时清除校验状态
    nextTick(() => {
      if (poolForm.value) {
        poolForm.value.clearValidate();
      }
    });
  };
  const confirm = () => {
    submitData();
    // resetForm();
  };
  defineExpose({
    close,
    open,
  });
</script>

<style scoped lang="scss"></style>
