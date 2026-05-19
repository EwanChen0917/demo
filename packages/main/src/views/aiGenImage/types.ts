import type { AiGenerateImageContracts } from '@/api';

export type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export interface OssUploadCallbacks {
  onProgress: (percent: number) => void;
  onSuccess: (ossKey: string) => void;
  onError: (error: Error) => void;
}

export type AiImageStage = 'original' | 'expand' | 'finished';

export type AiImageOpenStage = AiImageStage | 'auto';

export interface DrawerTaskOpenPayload {
  taskCode?: string;
  status?: number;
  statusName?: string;
}

export interface BasicSelectOption<T = string | number> {
  label: string;
  value: T;
}

export interface ProductImageItem extends AiGenerateImageContracts.ImageBean {
  id: string;
  imageId?: number | string;
  imageUrl?: string;
  ossKey?: string;
  sizeSpec?: string;
  spuCode?: string;
  src?: string;
  sourceType?: 'detail' | 'local' | 'aigc';
  thumbnailUrl?: string;
}

export interface ProductMaterialGroup {
  spuCode: string;
  spuName: string;
  categoryName?: string;
  fallbackImageUrl?: string;
  title: string;
  pageNum: number;
  pageSize: number;
  total: number;
  pages: number;
  loading: boolean;
  uploading: boolean;
  searchAfterValuesByPage: Record<number, unknown[]>;
  selectedId?: string;
  images: ProductImageItem[];
}

export interface ResultImageItem {
  batchNo?: string;
  imageCode?: string;
  imageId?: number;
  imageUrl?: string;
  isPlaceholder?: boolean;
  ossKey?: string;
  sizeSpec?: string;
  channel?: string;
  versionNo?: number;
}

export interface ResultImageGroup {
  title: string;
  images: ResultImageItem[];
}
