<template>
  <el-drawer size="500" :model-value="visible" title="地址管理" @close="emits('close')">
    <div class="d-flex justify-content-end mb-2">
      <el-link type="primary" :underline="false" @click="addAddr">添加地址</el-link>
    </div>
    <div class="addr-card" v-for="(item, index) in addrList" :key="item?.code">
      <div v-if="item?.editFlag">
        <el-form
          :model="editInfo"
          ref="formRef"
          :rules="rules"
          label-width="120px"
          label-position="left"
        >
          <el-form-item label="收件地址" prop="addrCode">
            <el-cascader
              size="small"
              style="width: 100%"
              v-model="editInfo.addrCode"
              :options="areaOptions"
              :props="{
                label: 'name',
                value: 'code',
              }"
            />
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input
              size="small"
              v-model="editInfo.address"
              clearable
              show-word-limit
              :maxlength="100"
            />
          </el-form-item>
          <el-form-item label="收件人名" prop="receiverName">
            <el-input
              size="small"
              v-model="editInfo.receiverName"
              clearable
              show-word-limit
              :maxlength="20"
            />
          </el-form-item>
          <el-form-item label="收件人电话" prop="receiverPhone">
            <el-input size="small" v-model="editInfo.receiverPhone" clearable />
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end align-items-center">
          <el-checkbox
            class="me-3"
            v-model="editInfo.defaultFlag"
            :disabled="item.defaultFlag"
            :true-value="1"
            :false-value="0"
          >
            默认收货地址
          </el-checkbox>
          <el-button size="small" @click="cancel(item, index)">取消</el-button>
          <el-button type="primary" size="small" @click="save()">保存</el-button>
        </div>
      </div>
      <div
        v-else
        class="d-flex justify-content-between align-items-center cursor-pointer"
        @click="selectAddr(item)"
      >
        <div>
          <el-space>
            <div class="mb-1">
              {{ item?.provinceName }} {{ item?.cityName }} {{ item?.areaName }}
            </div>
            <Tag v-if="item?.defaultFlag">默认</Tag>
          </el-space>
          <div class="mb-1 fw-bold">{{ item?.address }}</div>
          <div class="mb-1 fw-bold">{{ item?.receiverName }} {{ item?.receiverPhone }}</div>
        </div>
        <div class="edit">
          <el-link :underline="false" type="primary" @click.stop="handleEdit(item, index)">
            <template #icon>
              <el-icon size="18">
                <Edit />
              </el-icon>
            </template>
          </el-link>
          <el-link type="danger" :underline="false" @click.stop="delAddr(item?.addressCode, index)">
            <template #icon>
              <el-icon size="16">
                <Delete />
              </el-icon>
            </template>
          </el-link>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { Delete, Edit } from '@element-plus/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import areaOptions from '../../../../../../public/area.js';

  const emits = defineEmits<{
    (e: 'close'): void;
    (e: 'select', val): void;
    (e: 'save', val): void;
  }>();

  const props = defineProps<{
    visible: boolean;
  }>();

  const addrList = ref([
    {
      address: '广东省 深圳市 龙岗区',
      detail: '神舟电脑大厦',
      name: '王璐瑶',
      phone: '13888888888',
    },
    {
      address: '广东省 深圳市 龙岗区',
      detail: '神舟电脑大厦',
      name: '王璐瑶',
      phone: '13888888888',
    },
  ]);

  const formRef = ref(null);
  const rules = reactive({
    addrCode: [{ required: true, message: '请输入收件地址' }],
    address: [{ required: true, message: '请输入详细地址' }],
    receiverName: [{ required: true, message: '请输入收件人名' }],
    receiverPhone: [
      { required: true, message: '请输入收件人电话' },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号',
      },
    ],
  });
  const editInfo = ref({});
  const editIndex = ref(-1);

  const addAddr = () => {
    if (editIndex.value >= 0) {
      ElMessage.warning('请先保存后再添加');
      return;
    }
    clearFlag();
    editInfo.value = {};
    if (addrList.value?.length) {
      addrList.value?.splice(1, 0, {
        editFlag: true,
      });
    } else {
      addrList.value?.push({
        editFlag: true,
        defaultFlag: 1,
      });
      editInfo.value.defaultFlag = 1;
    }
    editIndex.value = 1;
  };

  const clearFlag = () => {
    addrList.value?.forEach((item) => {
      item.editFlag = false;
    });
  };

  const saveLoading = ref(false);
  const save = async () => {
    console.log(formRef.value);
    await nextTick();
    const isValid = await formRef.value[0]?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductMallAddrSaveUserAddr({
        ...editInfo.value,
        provinceCode: editInfo.value?.addrCode[0],
        cityCode: editInfo.value?.addrCode[1],
        areaCode: editInfo.value?.addrCode[2],
      });
      ElMessage.success('保存成功');
      queryUserAddrList();
      emits('save', editInfo.value);
    } finally {
      saveLoading.value = false;
      editIndex.value = -1;
    }
  };

  const cancel = (item, index) => {
    if (item.addressCode) {
      item.editFlag = false;
    } else {
      addrList.value.splice(index, 1);
    }
    editIndex.value = -1;
  };

  const handleEdit = (item, index) => {
    if (editIndex.value >= 0) {
      ElMessage.warning('请先保存后再编辑');
      return;
    }
    item.editFlag = true;
    editInfo.value = cloneDeep(item);
    editIndex.value = index;
  };

  const delAddr = async (addressCode, index) => {
    if (addrList.value?.length === 1) {
      ElMessage.warning('请至少保留一个地址');
      return;
    }
    const isConfirmed = await swal.confirm('确定删除该地址吗？');
    if (!isConfirmed) return;
    const res = await productApi.luteosProductMallAddrDeleteUserAddr({
      addressCode,
    });
    ElMessage.success('删除成功');
    // addrList.value.splice(index, 1);
    queryUserAddrList();
  };

  const selectAddr = async (item) => {
    const isConfirmed = await swal.confirm('确定选择该地址吗？');
    if (!isConfirmed) return;
    emits('select', item);
  };

  const queryUserAddrList = async () => {
    const res = await productApi.luteosProductMallAddrQueryUserAddrList();
    addrList.value = res?.userAddrList?.map((item) => {
      return {
        ...item,
        addrCode: [item.provinceCode, item.cityCode, item.areaCode],
      };
    });
  };
  queryUserAddrList();
</script>

<style scoped lang="scss">
  .addr-card {
    border-radius: 8px;
    padding: 10px;
    background-color: #eeeeee;
    margin-bottom: 12px;
    font-size: 14px;
    font-family: 'PingFang SC';
    .edit {
      display: flex;
      column-gap: 8px;
      align-items: center;
      .el-icon {
        cursor: pointer;
      }
    }
  }
</style>
