<template>
  <el-dialog
    title="导出装箱数据"
    v-model="visible"
    @close="visible = false"
    :close-on-click-modal="false"
  >
    <div class="export-container">
      <el-form-item label-position="top" label="输入物流商">
        <el-input v-model="logisticsProvider" placeholder="物流商" clearable />
      </el-form-item>
      <el-form-item label-position="top" label="选择公司主体">
        <el-select placeholder="公司主体" class="w-350px" v-model="companyCode">
          <el-option
            v-for="(item, key) in $props.declarationEntityList"
            :key="item.code"
            :label="item.companyName"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label-position="top">
      <el-select v-model="orderType" class="w-150px mb-1">
        <el-option label="调拨单号" value="TRANSFER_NO" />
        <el-option label="fbaId" value="FBA_ID" /> 
      </el-select>
      <el-input
        type="textarea"
        v-model="codeKeyWord"
        :rows="4"
        placeholder="一行一项，按回车换行，最多500行，重复数据判断为一行，不输入则全量导出"
      />
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    declarationEntityList: any[];
  }>();

  const router = useRouter();

  const visible = ref(false);
  const orderType = ref('TRANSFER_NO');
  const codeKeyWord = ref();
  const logisticsProvider = ref('');
  const companyCode = ref('');
  const companyName = computed(() => {
    return props.declarationEntityList.find((item) => item.code === companyCode.value)?.companyName;
  });
  const saveLoading = ref(false);

  const save = async () => {
    const length = codeKeyWord.value?.split('\n')?.length;
    if (length > 500) {
      ElMessage.warning(`最多500行,当前${length}行`);
      return;
    }
    try {
      saveLoading.value = true;
      const res = await erpApi.luteosErpCustomsExportPackData({
        codeKeyWord: codeKeyWord.value,
        logisticsProvider: logisticsProvider.value,
        companyName: companyName.value,
        searchType:orderType.value,
      });
      visible.value = false;
      const isExportConfirm = await swal.exportConfirm();
      if (isExportConfirm) {
        await nextTick();
        const path = router.resolve({
          path: '/downloadmanage',
          query: {
            app_code: res?.appCode,
            module_code: res?.moduleCode,
            record_type: 2,
          },
        });
        openWindow(path.href);
      }
    } finally {
      saveLoading.value = false;
    }
  };

  const open = () => {
    codeKeyWord.value = '';
    visible.value = true;
    if (props.declarationEntityList.length) {
      companyCode.value = props.declarationEntityList[0].code;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .export-container {
    display: flex;
    justify-content: space-between;
  }
</style>
