<template>
  <el-dialog :title="title" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="渠道" prop="channel">
        <el-select v-model="form.channel" clearable>
          <el-option value="amazon" label="Amazon" />
          <el-option value="shopify" label="Shopify" />
          <el-option value="walmart" label="Walmart" />
          <el-option value="tiktok" label="TikTok" />
          <el-option value="mercadocbt" label="Mercadocbt" />
        </el-select>
      </el-form-item>
      <el-form-item label="站点名称" prop="site">
        <el-input v-model="form.site" clearable placeholder="请输入二位码" />
      </el-form-item>
      <el-form-item label="包含国家" prop="country">
        <CountrySelect v-model="form.country" clearable multiple placeholder="请选择国家" :teleported="true"/>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="form.brandCode" clearable >
          <el-option
            v-for="item in brandList"
            :key="item.brandCode"
            :label="item.brandName"
            :value="item.brandCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备货站点" prop="stockSite">
        <el-select v-model="form.stockSite">
          <el-option v-for="item in STOCKSITELIST" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, productApi } from '@/api';
  import { ElMessage } from 'element-plus';
import { STOCKSITELIST } from '../config';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const title = ref('');

  const formRef = ref();
  const form = ref({
    channel: '',
    site: '',
    country: [],
    brandCode: '',
    stockSite: '',
  });

  const rules = reactive({
    channel: [{ required: true, message: '请选择渠道', trigger: 'change' }],
    site: [
      { required: true, message: '请输入站点名称', trigger: 'blur' },
      { pattern: /^[A-Z]{2}$/, message: '请输入正确的大写二位码' },
    ],
    country: [{ required: true, message: '请选择包含国家', trigger: 'change' }],
    stockSite:[{ required: true, message: '请选择备货站点', trigger: 'change' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      let bandObj;
      bandObj = brandList.value.find((item) => item.brandCode === form.value.brandCode);
      await erpApi.luteosErpBaseSiteSaveOrUpdate({
        ...form.value,
        brandName: bandObj?.brandName,
        brandNameEn: bandObj?.brandNameEn,
      });
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    if (row) {
      title.value = '编辑';
      form.value = { ...row };
    } else {
      title.value = '新增';
      form.value = {
        channel: '',
        site: '',
        country: [],
        brandCode: '',
      };
    }
  };
  // 查询品牌
  const brandList = ref([]);
  const queryBrandList = () => {
    productApi
      .luteosProductBrandQueryBrandList({
        pageNum: 1,
        pageSize: 100,
      })
      .then((res: any) => {
        if (+res.code === 200) {
          brandList.value = res.brandBeanList || [];
        }
      });
  };

  queryBrandList();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
