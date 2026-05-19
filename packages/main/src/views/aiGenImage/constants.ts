export const MAX_FILE_SIZE_MB = Infinity; // 暂不限制上传的文件大小

export const IMAGE_UPLOAD_DIRECTORY = 'ai-generate-image';

export const AI_IMAGE_PRIMARY = '#02b96b';

const AMAZON_SIZE_LIST = [
  '640x100',
  '828x250',
  '1456x180',
  '320x1200',
  '600x500',
  '300x600',
  '1940x500',
  '1200x628',
];

const CHANNEL_NAME_ALIAS: Record<string, string> = {
  亚马逊: 'Amazon',
  亚马逊平台: 'Amazon',
  TikTok: 'Meta / TikTok',
  tiktok: 'Meta / TikTok',
};

export const DEFAULT_CHANNEL_SIZE_MAPPING: Record<string, string[]> = {
  Amazon: sortSizeSpecList(AMAZON_SIZE_LIST),
  'Meta / TikTok': sortSizeSpecList(['1080x1920', '1200x1200']),
  'Google / DTC': sortSizeSpecList(['1080x1920', '1200x1200', '1200x628', '960x1200']),
  'DTC-DSP': sortSizeSpecList([
    '160x600',
    '300x250',
    '300x600',
    '728x90',
    '970x90',
    '970x250',
    '1024x90',
  ]),
};

export const getChannelSizeList = (
  channel: string,
  mapping: Record<string, string[]>,
  fallbackSizeList: string[] = []
) => {
  const normalizedChannel = normalizeChannelName(channel);
  return sortSizeSpecList(mapping[normalizedChannel] || mapping[channel] || fallbackSizeList);
};

export const normalizeChannelName = (channel?: string) => {
  if (!channel) return '';
  return CHANNEL_NAME_ALIAS[channel] || channel;
};

export function sortSizeSpecList(sizeList: string[] = []) {
  return [...sizeList].sort((prev, next) => {
    const prevSize = parseSizeSpec(prev);
    const nextSize = parseSizeSpec(next);
    if (!prevSize || !nextSize) return prev.localeCompare(next);
    const prevDisplayHeightRatio = prevSize.height / prevSize.width;
    const nextDisplayHeightRatio = nextSize.height / nextSize.width;
    if (prevDisplayHeightRatio !== nextDisplayHeightRatio) {
      return prevDisplayHeightRatio - nextDisplayHeightRatio;
    }
    if (prevSize.height !== nextSize.height) return prevSize.height - nextSize.height;
    return prevSize.width - nextSize.width;
  });
}

function parseSizeSpec(sizeSpec?: string) {
  const matched = sizeSpec?.match(/(\d+)\D+(\d+)/);
  if (!matched) return null;
  const width = Number(matched[1]);
  const height = Number(matched[2]);
  if (!width || !height) return null;
  return { width, height };
}

export const DEFAULT_CONDITION_GROUP_OPTIONS = [
  { label: '视觉', value: '视觉' },
  { label: '卖点', value: '卖点' },
  { label: '场景', value: '场景' },
  { label: '人群', value: '人群' },
];

export const AI_IMAGE_STAGE = {
  ORIGINAL: 'original',
  EXPAND: 'expand',
  FINISHED: 'finished',
} as const;

export const AI_IMAGE_STATUS = {
  NOT_STARTED: 0,
  PROMPT_RUNNING: 10,
  PROMPT_DONE: 11,
  ORIGINAL_RUNNING: 12,
  ORIGINAL_DONE: 13,
  EXPAND_WAITING: 14,
  EXPAND_RUNNING: 15,
  EXPAND_DONE: 16,
  FINISHED_PENDING: 17,
  FINISHED_UPLOADED: 18,
  FINISHED_TO_PLATFORM: 19,
} as const;
