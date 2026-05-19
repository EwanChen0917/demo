<template>
  <div class="btn-wrap">
    <ExportBtn :ignore-app-code="true"
      :service="metaApi.luteosMetaEmailExportBatchEmail"
      :params="{
        emailList: emailList,
      }"
    >
      导出结果
    </ExportBtn>
    <el-button @click="goBack">返回</el-button>
  </div>
  <div class="d-flex flex-wrap flex-grow">
    <KeenCard title="已发送：最近7天已发邮件" class="card-width">
      <el-input
        type="textarea"
        :value="batchRes.lastSend?.sendList?.join('\n')"
        :rows="15"
        disabled
      />
      <div class="d-flex justify-content-end align-items-center gap-3 copy-email">
        <span>共{{ batchRes.lastSend.count }}个</span>
        <el-link
          v-if="batchRes.lastSend.count"
          type="primary"
          :underline="false"
          @click="copyFn(batchRes.lastSend.sendList.join('\n'), '已发送邮箱')"
        >
          全部复制
        </el-link>
      </div>
    </KeenCard>
    <KeenCard title="未发送：最近7天未发邮件" class="card-width">
      <el-input
        type="textarea"
        :value="batchRes.lastUnSend?.sendList?.join('\n')"
        :rows="15"
        disabled
      />
      <div class="d-flex justify-content-end align-items-center gap-1 copy-email">
        <span>共{{ batchRes.lastUnSend.count }}个</span>
        <el-link
          v-if="batchRes.lastUnSend.count"
          type="primary"
          :underline="false"
          class="copy-txt"
          @click="copyFn(batchRes.lastUnSend.sendList.join('\n'), '未发送邮箱')"
        >
          全部复制
        </el-link>
      </div>
    </KeenCard>
    <KeenCard title="白名单邮箱（以下邮箱不计算重复触达，可多次发送）" class="card-width">
      <el-input
        type="textarea"
        :value="batchRes.whiteEmail?.sendList?.join('\n')"
        :rows="15"
        disabled
      />
      <div class="d-flex justify-content-end align-items-center gap-1 copy-email">
        <span>共{{ batchRes.whiteEmail.count }}个</span>
        <el-link
          v-if="batchRes.whiteEmail.count"
          type="primary"
          :underline="false"
          @click="copyFn(batchRes.whiteEmail.sendList.join('\n'), '白名单邮箱')"
        >
          全部复制
        </el-link>
      </div>
    </KeenCard>
  </div>
  <KeenCard title="查询记录（以下未发送邮箱最近被查询过，请注意是否发送邮件）">
    <el-table ref="tableRef" :data="batchRes?.recordList">
      <el-table-column label="查询邮箱" prop="email" />
      <el-table-column label="最近查询人" prop="queryMemberName" />
      <el-table-column label="最近查询时间" prop="queryTime" />
    </el-table>
     <div class="d-flex justify-content-end align-items-center gap-1 copy-email">
        <span>共{{ batchRes.recordList?.length }}个</span>
        <el-link
          v-if="batchRes.recordList?.length"
          type="primary"
          :underline="false"
          @click="copyFn(batchRes.recordList.map(item => item.email).join('\n'), '查询记录邮箱')"
        >
          全部复制
        </el-link>
      </div>
  </KeenCard>
</template>

<script setup lang="ts" name="emailHistoryBatchSearchResult">
  import { metaApi } from '@/api';
  import { copyFn } from '@/utils/copyFn';
  import { decryptByBase64 } from '@/utils/aesTils';

  const route = useRoute();
  const router = useRouter();
  const emailList = ref([]);
  if (route.query?.emailList) {
    emailList.value = JSON.parse(decryptByBase64(route.query.emailList as string));
  }

  const batchRes = ref({
    lastUnSend: {},
    lastSend: {},
    whiteEmail: {},
    recordList: [],
  });
  const queryBatchEmailList = async () => {
    const res = await metaApi.luteosMetaEmailQueryBatchEmailList({
      emailList: emailList.value,
      pageNum: 1,
      pageSize: 100,
    });
    batchRes.value = res || {};
  };

  const goBack = () => {
    router.go(-1);
  };

  onActivated(() => {
    queryBatchEmailList()
  })
</script>

<style scoped lang="scss">
  .flex-grow {
    justify-content: space-between;
  }
  .card-width {
    width: 32.5%;
  }
  .copy-email {
    margin-top: 15px;
  }
  .copy-txt {
    font-size: 13px;
  }
  .btn-wrap {
    width: 100%;
    text-align: right;
    margin-bottom: 15px;
  }
</style>
