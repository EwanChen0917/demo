<template>
  <div class="index-world-time">
    <block-title>世界时间</block-title>
    <div class="time-zone-selector">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M7 12.25C9.89952 12.25 12.25 9.89952 12.25 7C12.25 4.10051 9.89952 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.89952 4.10051 12.25 7 12.25Z"
          stroke="#999999"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.04175 5.8335C4.37508 6.7085 2.70464 8.52692 4.37508 8.75016C6.99425 9.10016 5.54175 11.9585 5.54175 11.9585"
          stroke="#999999"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4999 3.20813C9.33322 3.20815 8.16655 2.91646 7.72432 3.90498C7.43272 4.48831 6.70822 6.1248 7.87494 6.70813C8.59827 7.0698 8.97155 7.16313 9.62488 7.58313C10.4999 8.14564 10.2083 10.2081 10.9327 10.3217"
          stroke="#999999"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="time-zone-selector-item" v-if="false">
        <span>{{ currentTimeZone.name }}</span>
        <el-icon>
          <ArrowDownBold />
        </el-icon>
      </div>
      <el-popover
        v-model:visible="timezoneSelectorVisible"
        placement="bottom"
        :width="200"
        trigger="click"
        popper-class="time-zone-popover"
        @show="handleTimeZonePopoverShow"
      >
        <template #reference>
          <div class="time-zone-selector-item">
            <span>{{ currentTimeZone.name }}</span>
            <el-icon>
              <ArrowDownBold />
            </el-icon>
          </div>
        </template>
        <div class="time-zone-list">
          <div
            v-for="zone in timeZones"
            :key="zone.name"
            class="time-zone-item"
            :class="{ active: zone.name === currentTimeZone.name }"
            @click="selectTimeZone(zone)"
          >
            {{ zone.name }}(UTC{{ zone.offset >= 0 ? '+' : '' }}{{ zone.offset }})
          </div>
        </div>
      </el-popover>
    </div>
    <div class="real-time" v-html="formattedTime"></div>
  </div>
</template>

<script setup lang="ts">
  import { ArrowDownBold } from '@element-plus/icons-vue';
  import { biApi } from '@/api';
  import BlockTitle from './components/blockTitle.vue';
  import { useReport } from '../../hooks/useReport';

  const timezoneSelectorVisible = ref(false);
  // 定义时区数据
  const timeZones = ref([{ name: '北京（中国）', offset: 8 }]);

  const getData = async () => {
    const res = await biApi.biFrontpageQueryTimeZone();
    timeZones.value = res?.timeZoneInfoList?.map((x) => {
      return {
        name: x.area,
        offset: +x.timeZone,
      };
    }) || [{ name: '北京（中国）', offset: 8 }];
  };

  getData();

  // 当前选中的时区
  const currentTimeZone = ref(timeZones.value[0]); // 默认北京时间

  // 当前时间
  const currentTime = ref(new Date());

  // 定时器
  let timer: number | null = null;

  const getTimeStr = (offset, currentTime) => {
    const date = new Date(currentTime);

    // 获取当前时区偏移（分钟转毫秒）
    const localOffset = date.getTimezoneOffset() * 60000;

    // 计算 UTC 时间
    const utc = date.getTime() + localOffset;

    // 根据目标时区偏移计算目标时间
    const targetTime = new Date(utc + offset * 3600000);

    const month = targetTime.getMonth() + 1;
    const day = targetTime.getDate();
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][targetTime.getDay()];
    const hours = targetTime.getHours().toString().padStart(2, '0');
    const minutes = targetTime.getMinutes().toString().padStart(2, '0');
    const seconds = targetTime.getSeconds().toString().padStart(2, '0');

    return `
<span>${month}月${day}日</span><span style="padding: 0 12px">${weekday}</span><span>${hours}:${minutes}:${seconds}</span>
`;
  };

  // 格式化显示时间
  const formattedTime = computed(() => {
    return getTimeStr(currentTimeZone.value.offset, currentTime.value);
  });

  // 选择时区
  const selectTimeZone = (zone: any) => {
    currentTimeZone.value = zone;
    timezoneSelectorVisible.value = false;
  };

  // 更新时间
  const updateTime = () => {
    currentTime.value = new Date();
  };

  // 组件挂载时启动定时器
  onMounted(() => {
    timer = window.setInterval(updateTime, 1000);
  });

  // 组件卸载前清除定时器
  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
  const { report } = useReport();
  const handleTimeZonePopoverShow = () => {
    report('时区选择弹窗', {
      special_topic_title: '世界时间',
      button_name: '时区选择',
    });
  };
</script>

<style scoped lang="scss">
  .index-world-time {
    background-color: white;
    padding: 16px;
    border-radius: 10px;

    .time-zone-selector {
      display: flex;
      align-items: center;
      padding: 20px 12px;

      svg {
        margin-right: 8px;
      }

      .time-zone-selector-item {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          padding: 0;
          height: auto;
          font-weight: 500;
          font-size: 14px;
          color: var(---N6, #999);
        }

        :deep(.el-icon) {
          margin-left: 10px;
          font-size: 20px;
          color: #999;
        }
      }
    }

    .real-time {
      font-size: 18px;
      color: #333;
      padding-bottom: 10px;
      padding-left: 14px;
      color: var(---N9, #1f1f1f);
      /* 突出/Medium 18 */
      font-family: 'PingFang SC Medium';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px; /* 144.444% */
    }
  }

  .time-zone-popover {
    padding: 8px 0 !important;

    .time-zone-list {
      max-height: 300px;
      overflow-y: auto;

      .time-zone-item {
        padding: 8px 16px;
        cursor: pointer;
        font-size: 14px;
        color: #666;

        &:hover {
          background-color: var(--el-color-primary-light-9);
        }

        &.active {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-light-9);
        }
      }
    }
  }
</style>
