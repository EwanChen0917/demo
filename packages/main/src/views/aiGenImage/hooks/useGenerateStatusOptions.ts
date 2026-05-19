import { computed } from 'vue';

export interface GenerateStatusOption {
  label: string;
  value: number;
}

export const GENERATE_STATUS_OPTIONS: GenerateStatusOption[] = [
  { label: '提示词生成中', value: 10 },
  { label: '提示词已生成', value: 11 },
  { label: '原图生成中', value: 12 },
  { label: '原图已生成', value: 13 },
  { label: '扩图待生成', value: 14 },
  { label: '扩图生成中', value: 15 },
  { label: '扩图已生成', value: 16 },
  { label: '成品图待上传', value: 17 },
  { label: '成品图已上传', value: 18 },
  { label: '成品图已上传广告平台', value: 19 },
];

export function useGenerateStatusOptions() {
  const options = computed(() => GENERATE_STATUS_OPTIONS);
  const statusMap = computed(() => {
    return GENERATE_STATUS_OPTIONS.reduce<Record<number, GenerateStatusOption>>((map, item) => {
      map[item.value] = item;
      return map;
    }, {});
  });

  const getStatusLabel = (status?: number, statusName?: string) => {
    if (typeof status === 'number') return statusMap.value[status]?.label || statusName || '-';
    return statusName || '-';
  };

  const getStatusIndex = (status?: number, statusName?: string) => {
    const indexByStatus = GENERATE_STATUS_OPTIONS.findIndex((item) => item.value === status);
    if (indexByStatus > -1) return indexByStatus;
    const indexByName = GENERATE_STATUS_OPTIONS.findIndex((item) => item.label === statusName);
    return indexByName > -1 ? indexByName : 0;
  };

  const isFinalStatus = (status?: number, statusName?: string) => {
    return getStatusIndex(status, statusName) === GENERATE_STATUS_OPTIONS.length - 1;
  };

  return {
    options,
    statusMap,
    getStatusLabel,
    getStatusIndex,
    isFinalStatus,
  };
}
