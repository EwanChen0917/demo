<template>
  <div class="monitor-base-info">
    <el-descriptions :column="1" label-width="130" border>
      <!-- 单据编号 -->
      <el-descriptions-item label="单据编号">
        {{ detail.sourceCode ||'-'}}
      </el-descriptions-item>

      <!-- 系统来源 -->
      <el-descriptions-item label="系统来源">
        {{ detail.monitorCfg?.sourceSystemDesc ||'-' }}
      </el-descriptions-item>

      <!-- 来源路径（提取最后一个“-”后的值） -->
      <el-descriptions-item label="来源路径">{{ detail.monitorCfg?.sourceSystemPath ||'-' }}</el-descriptions-item>

      <!-- 来源单据 -->
      <el-descriptions-item label="来源单据">
        {{ detail.monitorCfg?.sourceSystemType ||'-' }}
      </el-descriptions-item>

      <!-- 推送时间 -->
      <el-descriptions-item label="推送时间">{{ detail.pushInfo?.pushTime  ||'-'}}</el-descriptions-item>

      <!-- 创建时间 -->
      <el-descriptions-item label="创建时间">
        {{ detail.createTime || '-' }}
      </el-descriptions-item>

      <!-- 目标路径 -->
      <el-descriptions-item label="目标路径">
        {{ detail.monitorCfg?.targetSystemPath }}
      </el-descriptions-item>

      <!-- 目标单据 -->
      <el-descriptions-item label="目标单据">
        {{ detail.monitorCfg?.targetSystemType }}
      </el-descriptions-item>

      <!-- 金蝶单据编号 -->
      <el-descriptions-item label="金蝶单据编号">
        {{ detail.targetCode || '-' }}
      </el-descriptions-item>

      <!-- 推送状态 -->
      <el-descriptions-item label="推送状态">
        <PushStatus :push-info="detail.pushInfo" :error-type="detail.errorType" />
      </el-descriptions-item>

      <!-- 异常类型 -->
      <el-descriptions-item label="异常类型">
        {{
          String(detail.errorType)
            .split(',')
            .map((e) => {
              return (
                {
                  0: '推送失败',
                  1: '信息不符',
                  2: '金额不符',
                  3: '数量不符',
                  4: '数据不存在',
                  5: '无差异',
                  6: '单据重复'
                }[e] || ''
              );
            })
            .filter(Boolean)
            .join('，') || '-'
        }}
      </el-descriptions-item>

      <!-- 异常描述 -->
      <el-descriptions-item label="异常描述">
        {{
          detail?.errorDesc || '-'
        }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
  import PushStatus from "./pushStatus.vue";

  defineProps({
    detail: {
      type: Object,
      required: true,
    },
  });
</script>
<style lang="scss" scoped>
  .monitor-base-info {
    padding: 12px;
    :deep(.el-descriptions__cell){
      height: 100%;
    }
    :deep(.el-descriptions__label) {
      min-width: 90px;
      color: var(--el-text-color-primary);
    }
  }
</style>