<template>
  <el-dialog title="上传及生成详情" v-model="visible" @close="visible = false">
    <div class="detail-info">
      <div v-for="item in detailList" class="detail-item" :key="item?.ruleCode">
        <div class="header">
          <div class="left">
            规则识别码 - 店铺行号：
            <span class="text-primary">{{ item?.ruleCode }}</span>
            -
            <span>{{ item?.lineNum }}</span>
          </div>
          <div style="display: flex">
            <el-link
              type="primary"
              style="width: 65px"
              :underline="false"
              :disabled="!item?.fileUrl"
              @click="openWindow(item?.fileUrl)"
            >
              下载
            </el-link>
            <KeenFileUpload
              v-model="item.receiptFileList"
              :showFileList="false"
              :limit="1"
              :multiple="false"
              accept=".xlsx,.xls"
              :showOperate="false"
              @success="handleUploadSuccess"
              directory="erp/incomeAnalysis"
              ref="uploadRef"
            >
              <el-link type="primary" :underline="false" @click="getData(item)">上传</el-link>
            </KeenFileUpload>
          </div>
        </div>
        <div class="info">月报上传情况：</div>
        <div class="file-info">
          <div class="left">结算数据*{{ item?.settlementFileCount || 0 }}：</div>
          <div class="right">{{ item?.settlementFileRemark2 || item?.settlementFileRemark }}</div>
        </div>
        <div class="file-info">
          <div class="left">信息数据一*{{ item?.infoFileCount1 || 0 }}：</div>
          <div class="right">{{ item?.infoFileRemark1 }}</div>
        </div>
        <div class="file-info">
          <div class="left">信息数据二*{{ item?.infoFileCount2 || 0 }}：</div>
          <div class="right">{{ item?.infoFlieRemark2 }}</div>
        </div>
        <div class="file-info">
          <div class="left">剔除数据确认：</div>
          <div class="right">{{ item?.confirmStatusDesc }}</div>
        </div>
        <div class="info">结算单生成情况：</div>
        <div class="file-info">{{ item?.settlementStatementRemark }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';

  const visible = ref(false);

  const detailList = ref([]);
  const codeVal = ref('');
  const queryDetail = async (code) => {
    const res = await financeSystemApi.financeIncomeRuleAnalysisQueryDetail({ code });
    detailList.value = res?.incomeRuleAnalysisRecordInfoBeans || [];
    detailList.value.forEach((item) => {
      Reflect.set(item, 'receiptFileList', []);
    });
  };
  const id = ref('');
  const getData = (row) => {
    id.value = row.id;
  };
  // 上传
  const update = ref(true);
  const handleUploadSuccess = async (key) => {
    if (key && update.value) {
      update.value = false;
      const findIndex = detailList.value?.findIndex((res) => {
        return res.id == id.value;
      });
      if (findIndex > -1) {
        const receiptKeyList = detailList.value[findIndex].receiptFileList;
        const param = {
          id: id.value,
          ossKey: receiptKeyList[0].ossKey,
        };

        const res = await financeSystemApi
          .financeIncomeRuleAnalysisSaveConfirmFile(param)
          .catch(() => {
            update.value = true;
          });
        if (res) {
          ElMessage.success('上传成功');
          detailList.value[findIndex].receiptFileList = [];
        }
        setTimeout(() => {
          queryDetail(codeVal.value);
          update.value = true;
        }, 2000);
      }
    }
  };

  const open = (code) => {
    codeVal.value = code;
    queryDetail(code);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .detail-info {
    color: #6e6e6e;
    max-height: 60vh;
    overflow-y: scroll;
    .detail-item {
      margin-bottom: 10px;
    }
    .header {
      display: flex;
      justify-content: space-between;
    }
    .info {
      margin-left: 50px;
      margin-top: 5px;
    }
    .file-info {
      margin-left: 100px;
      margin-top: 5px;
      display: flex;
      .left {
        flex-shrink: 0;
      }
    }
  }
</style>
