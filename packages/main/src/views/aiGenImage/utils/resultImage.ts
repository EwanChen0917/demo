import type { AiGenerateImageContracts } from '@/api';
import { normalizeChannelName } from '../constants';
import type { ResultImageGroup, ResultImageItem } from '../types';

export interface ExpandSizeGroup {
  channel: string;
  sizes: string[];
}

export const parseResultImageSizeSpec = (sizeSpec?: string) => {
  const matched = sizeSpec?.match(/(\d+)\D+(\d+)/);
  if (!matched) return null;
  const width = Number(matched[1]);
  const height = Number(matched[2]);
  if (!width || !height) return null;
  return { width, height, ratio: width / height };
};

export const getResultImageKey = (image: ResultImageItem, index: number | string = 0) => {
  return String(image.imageCode || image.imageId || image.ossKey || image.imageUrl || index);
};

export const dedupeResultImages = (images: ResultImageItem[]) => {
  const map = new Map<string, ResultImageItem>();
  images.forEach((image, index) => {
    const key = getResultImageKey(image, index);
    if (image.imageUrl && !map.has(key)) {
      map.set(key, image);
    }
  });
  return Array.from(map.values());
};

export const normalizeResultSizeSpec = (sizeSpec?: string) => {
  return (sizeSpec || '').replace(/\s/g, '').replace(/[xX×]/g, '*');
};

export const formatExpandRequestSizeSpec = (sizeSpec?: string) => {
  return normalizeResultSizeSpec(sizeSpec).replace(/\*/g, 'x');
};

const normalizeCompareText = (value?: string) => {
  return normalizeChannelName(value).trim().toLowerCase();
};

export const groupImagesByTitle = (
  images: ResultImageItem[],
  getTitle: (image: ResultImageItem) => string
): ResultImageGroup[] => {
  const map = new Map<string, ResultImageItem[]>();
  images.forEach((image) => {
    if (!image.imageUrl) return;
    const title = getTitle(image);
    const list = map.get(title) || [];
    list.push(image);
    map.set(title, list);
  });
  return Array.from(map.entries()).map(([title, groupImages]) => ({
    title,
    images: groupImages,
  }));
};

const createExpandPlaceholderImage = (channel: string, sizeSpec: string): ResultImageItem => {
  return {
    channel,
    imageCode: `expand-placeholder-${channel}-${sizeSpec}`,
    isPlaceholder: true,
    sizeSpec,
  };
};

const findExpandImageBySize = (
  images: ResultImageItem[],
  channel: string,
  sizeSpec: string,
  usedIndexes: Set<number>
) => {
  const targetChannel = normalizeCompareText(channel);
  const targetSize = normalizeResultSizeSpec(sizeSpec);
  const matchedIndex = images.findIndex((image, index) => {
    return (
      !usedIndexes.has(index) &&
      !!image.imageUrl &&
      normalizeCompareText(image.channel) === targetChannel &&
      normalizeResultSizeSpec(image.sizeSpec) === targetSize
    );
  });
  if (matchedIndex < 0) return undefined;
  usedIndexes.add(matchedIndex);
  return images[matchedIndex];
};

const mergeImageGroups = (groups: ResultImageGroup[], extraGroups: ResultImageGroup[]) => {
  const map = new Map<string, ResultImageGroup>();
  groups.forEach((group) => {
    map.set(group.title, {
      title: group.title,
      images: [...group.images],
    });
  });
  extraGroups.forEach((group) => {
    const existing = map.get(group.title);
    if (existing) {
      existing.images.push(...group.images);
    } else {
      map.set(group.title, group);
    }
  });
  return Array.from(map.values());
};

export const buildExpandResultGroups = (
  images: ResultImageItem[],
  sizeGroups: ExpandSizeGroup[]
): ResultImageGroup[] => {
  if (!sizeGroups.length) {
    return groupImagesByTitle(images, (image) => image.channel || '未分组');
  }

  const usedIndexes = new Set<number>();
  const groups = sizeGroups.map((group) => ({
    title: group.channel,
    images: group.sizes.map((sizeSpec) => {
      return (
        findExpandImageBySize(images, group.channel, sizeSpec, usedIndexes) ||
        createExpandPlaceholderImage(group.channel, sizeSpec)
      );
    }),
  }));
  const extraImages = images.filter((image, index) => image.imageUrl && !usedIndexes.has(index));
  const extraGroups = groupImagesByTitle(extraImages, (image) => image.channel || '未分组');
  return mergeImageGroups(groups, extraGroups);
};

export const getOriginalCandidateImages = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const legacyImages =
    (data as { originalCandidateImages?: AiGenerateImageContracts.ImageBean[] })
      .originalCandidateImages || [];
  const candidateImages =
    data.originalCandidateImageList?.flatMap((item) => item.originalCandidateImages || []) || [];
  return dedupeResultImages([...candidateImages, ...legacyImages] as ResultImageItem[]);
};

export const getOriginalResultImages = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return dedupeResultImages([
    ...getOriginalCandidateImages(data),
    ...(data.originalConfirmedImage?.imageUrl
      ? [data.originalConfirmedImage as ResultImageItem]
      : []),
  ]);
};

export const getOriginalGeneratedResultGroups = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const groups =
    data.originalCandidateImageList?.map((item, index) => ({
      title: `第${index + 1}组`,
      images: dedupeResultImages((item.originalCandidateImages || []) as ResultImageItem[]),
    })) || [];
  const filteredGroups = groups.filter((group) => group.images.length);
  if (filteredGroups.length) return filteredGroups;

  const legacyImages = dedupeResultImages(
    ((data as { originalCandidateImages?: AiGenerateImageContracts.ImageBean[] })
      .originalCandidateImages || []) as ResultImageItem[]
  );
  return legacyImages.length
    ? [
        {
          title: '第1组',
          images: legacyImages,
        },
      ]
    : [];
};

export const getExpandResultImages = (data: AiGenerateImageContracts.TaskDetailResp) => {
  const legacyImages =
    (data as { expandResultImages?: AiGenerateImageContracts.ExpandImageBean[] })
      .expandResultImages || [];
  return dedupeResultImages([
    ...(data.expandResultImageList || []),
    ...legacyImages,
  ] as ResultImageItem[]);
};

export const getOriginalConfirmedResultGroups = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return data.originalConfirmedImage?.imageUrl
    ? [
        {
          title: '已确认原图',
          images: [data.originalConfirmedImage as ResultImageItem],
        },
      ]
    : [];
};

export const getExpandConfirmedResultGroups = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return groupImagesByTitle(
    dedupeResultImages((data.expandConfirmedImageList || []) as ResultImageItem[]),
    (image) => image.channel || '未分组'
  );
};

export const getOriginalImageKeySet = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return new Set(
    getOriginalResultImages(data).map((image, index) => getResultImageKey(image, index))
  );
};

export const getExpandImageKeySet = (data: AiGenerateImageContracts.TaskDetailResp) => {
  return new Set(
    getExpandResultImages(data).map((image, index) => getResultImageKey(image, index))
  );
};

export const hasNewOriginalResult = (
  data: AiGenerateImageContracts.TaskDetailResp,
  initialKeys: Set<string>,
  batchNo?: string
) => {
  return getOriginalResultImages(data).some((image, index) => {
    if (batchNo && image.batchNo === batchNo) return true;
    return !initialKeys.has(getResultImageKey(image, index));
  });
};

export const hasNewExpandResult = (
  data: AiGenerateImageContracts.TaskDetailResp,
  initialKeys: Set<string>
) => {
  return getExpandResultImages(data).some((image, index) => {
    return !initialKeys.has(getResultImageKey(image, index));
  });
};

export const preserveOriginalResults = (
  previous: AiGenerateImageContracts.TaskDetailResp,
  next: AiGenerateImageContracts.TaskDetailResp
) => {
  if (next.originalCandidateImageList?.length || !previous.originalCandidateImageList?.length) {
    return next;
  }
  return {
    ...next,
    originalCandidateImageList: previous.originalCandidateImageList,
  };
};
