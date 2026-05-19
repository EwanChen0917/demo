<template>
  <div class="device-detail-container">
    <!-- Header with Back Button and Quick Actions -->
    <header class="page-header">
      <div class="left-box">
        <el-button class="back-link" link @click="handleBack">
          <el-icon><ArrowLeft /></el-icon>
          <span>设备台账</span>
        </el-button>
        <h1 class="page-title">{{ detail?.name || '设备详情' }}</h1>
      </div>
      <div class="right-box">
        <el-tag :type="onlineStatusType" effect="light" class="status-badge">
          <span class="dot"></span>
          {{ detail?.onlineStatusDesc || '未知' }}
        </el-tag>
      </div>
    </header>

    <main class="detail-content" v-loading="loading">
      <!-- Device Identity Card (Focus on Core Identity) -->
      <section class="identity-section">
        <div class="identity-card">
          <div class="device-icon-wrapper" :class="onlineStatusType">
            <el-icon v-if="detail?.deviceTypeDesc?.includes('灯')"><Opportunity /></el-icon>
            <el-icon v-else-if="detail?.deviceTypeDesc?.includes('空调')"><WindPower /></el-icon>
            <el-icon v-else><Monitor /></el-icon>
          </div>
          <div class="identity-info">
            <div class="main-label">{{ detail?.deviceTypeDesc || '通用设备' }}</div>
            <!-- <div class="sub-label">设备编码: {{ detail?.deviceCode || '-' }}</div> -->
          </div>
          <div class="power-switch">
            <el-button
              :type="detail?.state?.toUpperCase() === 'ON' ? 'success' : 'info'"
              circle
              :loading="debugLoading"
              @click="handleToggleStatus"
            >
              <el-icon><SwitchButton /></el-icon>
            </el-button>
            <span class="switch-label">
              {{ detail?.state?.toUpperCase() === 'ON' ? '已开启' : '已关闭' }}
            </span>
          </div>
        </div>
      </section>

      <!-- Detailed Info Grid -->
      <section class="info-grid">
        <div class="info-item">
          <div class="item-icon"><CollectionTag /></div>
          <div class="item-content">
            <div class="label">设备编码</div>
            <div class="value">{{ detail?.deviceCode || '-' }}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="item-icon"><Location /></div>
          <div class="item-content">
            <div class="label">所属会议室</div>
            <div class="value">{{ roomNameText }}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="item-icon"><Cpu /></div>
          <div class="item-content">
            <div class="label">MAC 地址</div>
            <div class="value mac-address">{{ detail?.macAddress || '-' }}</div>
          </div>
        </div>

        <div class="info-item">
          <div class="item-icon"><Timer /></div>
          <div class="item-content">
            <div class="label">最后在线时间</div>
            <div class="value">{{ lastSeenText }}</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts" name="smartMeetingRoomDeviceLedgerDetail">
  import { useRoute, useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import {
    ArrowLeft,
    Monitor,
    Opportunity,
    WindPower,
    SwitchButton,
    CollectionTag,
    Location,
    Cpu,
    Timer,
  } from '@element-plus/icons-vue';
  import { getDeviceLedgerApi } from './api';

  const route = useRoute();
  const router = useRouter();
  const api = getDeviceLedgerApi();

  const loading = ref(false);
  const debugLoading = ref(false);
  const detail = ref<any | null>(null);

  const deviceCode = computed(() => route.params.deviceCode as string);

  const onlineStatusType = computed(() => {
    const status = detail.value?.onlineStatusDesc;
    if (status === '在线') return 'success';
    if (status === '离线') return 'danger';
    return 'info';
  });

  const roomNameText = computed(() => {
    const list = (detail.value?.meetingRoomList ?? []) as any[];
    if (list.length) return list.map((x) => x.roomName).join('、');
    return '-';
  });

  const lastSeenText = computed(() => {
    const value = detail.value?.lastSeen;
    if (!value) return '-';
    return dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : value;
  });

  const fetchDetail = async () => {
    if (!deviceCode.value) return;
    loading.value = true;
    try {
      detail.value = await api.queryDeviceDetail(deviceCode.value);
    } catch (error: any) {
      ElMessage.error(error?.message || '查询设备详情失败');
    } finally {
      loading.value = false;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleToggleStatus = async () => {
    if (!detail.value) return;
    const nextStatus = detail.value.state?.toUpperCase() === 'ON' ? 'OFF' : 'ON';

    const ok = await swal.confirm({
      title: '控制确认',
      text: `确认要${nextStatus === 'ON' ? '打开' : '关闭'}设备【${detail.value.name}】吗？`,
      icon: 'warning',
    });
    if (!ok) return;

    debugLoading.value = true;
    try {
      await api.debugDevice(detail.value.deviceCode, nextStatus);
      ElMessage.success(nextStatus === 'ON' ? '已开启' : '已关闭');
      await fetchDetail();
    } catch (error: any) {
      ElMessage.error(error?.message || '操作失败');
    } finally {
      debugLoading.value = false;
    }
  };

  onMounted(() => {
    fetchDetail();
  });
</script>

<style lang="scss" scoped>
  .device-detail-container {
    padding: 32px 40px;
    background-color: #f8fafc;
    min-height: calc(100vh - 100px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;

      .back-link {
        color: #64748b;
        margin-bottom: 8px;
        font-size: 14px;
        padding: 0;
        &:hover {
          color: #3b82f6;
        }
      }

      .page-title {
        font-size: 28px;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }

      .status-badge {
        border-radius: 20px;
        padding: 8px 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
        border: none;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
        }

        &.el-tag--success {
          background-color: #f0fdf4;
          color: #16a34a;
        }
        &.el-tag--danger {
          background-color: #fef2f2;
          color: #dc2626;
        }
        &.el-tag--info {
          background-color: #f1f5f9;
          color: #64748b;
        }
      }
    }

    .detail-content {
      max-width: 1000px;
      margin: 0 auto;

      .identity-section {
        margin-bottom: 32px;

        .identity-card {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;

          .device-icon-wrapper {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            margin-right: 24px;

            &.success {
              background: #ecfdf5;
              color: #10b981;
            }
            &.danger {
              background: #fef2f2;
              color: #ef4444;
            }
            &.info {
              background: #f8fafc;
              color: #94a3b8;
            }
          }

          .identity-info {
            flex: 1;
            .main-label {
              font-size: 18px;
              font-weight: 600;
              color: #1e293b;
              margin-bottom: 6px;
            }
            .sub-label {
              font-size: 14px;
              color: #94a3b8;
            }
          }

          .power-switch {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;

            .switch-label {
              font-size: 12px;
              font-weight: 600;
              color: #64748b;
            }

            :deep(.el-button--success) {
              box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
            }
          }
        }
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        .info-item {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #f1f5f9;
          transition: transform 0.2s, box-shadow 0.2s;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
          }

          .item-icon {
            font-size: 24px;
            color: #94a3b8;
            background: #f8fafc;
            padding: 12px;
            border-radius: 12px;
          }

          .item-content {
            .label {
              font-size: 13px;
              color: #94a3b8;
              margin-bottom: 4px;
              font-weight: 500;
            }
            .value {
              font-size: 16px;
              font-weight: 600;
              color: #334155;

              &.mac-address {
                font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
                letter-spacing: 0.5px;
              }
            }
          }
        }
      }
    }
  }
</style>
