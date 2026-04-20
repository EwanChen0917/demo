/**
 * 搜索关键词高亮工具函数
 * @description 用于在列表中高亮显示搜索关键词
 */

/**
 * 高亮配置接口
 */
export interface HighlightConfig {
  /** 高亮样式类名，默认为 'highlight-keyword' */
  className?: string;
  /** 高亮背景色，默认使用 CSS 变量 */
  bgColor?: string;
  /** 高亮文字颜色 */
  color?: string;
  /** 是否大小写敏感，默认 false */
  caseSensitive?: boolean;
}

/**
 * 高亮关键词映射表
 * key: 字段名称
 * value: 要高亮的关键词数组
 */
export interface HighlightKeywords {
  /** 视频ID / 作者 关键词 */
  queryKeyword?: string;
  /** 产品名称关键词 */
  productName?: string;
  /** 内容特征关键词数组 */
  contentFeature?: string[];
  /** 视频ID关键词（分镜列表使用） */
  videoId?: string;
}

/**
 * 默认高亮配置
 */
const DEFAULT_CONFIG: Required<HighlightConfig> = {
  className: 'highlight-keyword',
  bgColor: 'transparent',
  color: '#02b96b',
  caseSensitive: false,
};

/**
 * 转义正则表达式特殊字符
 * @param str 原始字符串
 * @returns 转义后的字符串
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 将文本中的关键词高亮显示（返回 HTML 字符串）
 * @param text 原始文本
 * @param keywords 要高亮的关键词（字符串或字符串数组）
 * @param config 高亮配置
 * @returns 包含高亮标签的 HTML 字符串
 *
 * @example
 * ```ts
 * // 单个关键词高亮
 * highlightText('Hello World', 'World')
 * // => 'Hello <span class="highlight-keyword">World</span>'
 *
 * // 多个关键词高亮
 * highlightText('Hello World', ['Hello', 'World'])
 * // => '<span class="highlight-keyword">Hello</span> <span class="highlight-keyword">World</span>'
 * ```
 */
export function highlightText(
  text: string | undefined | null,
  keywords: string | string[] | undefined | null,
  config?: HighlightConfig
): string {
  // 处理空值情况
  if (!text) return '';
  if (!keywords) return text;

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // 将单个关键词转换为数组
  const keywordList = Array.isArray(keywords) ? keywords : [keywords];

  // 过滤空关键词并去重
  const validKeywords = [...new Set(keywordList.filter((k) => k && k.trim()))];

  if (validKeywords.length === 0) return text;

  // 构建正则表达式
  const escapedKeywords = validKeywords.map(escapeRegExp);
  const pattern = escapedKeywords.join('|');
  const flags = mergedConfig.caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`(${pattern})`, flags);

  // 替换匹配的关键词为高亮标签
  return text.replace(regex, (match) => {
    const style = `background-color: ${mergedConfig.bgColor}; color: ${mergedConfig.color};`;
    return `<span class="${mergedConfig.className}" style="${style}">${match}</span>`;
  });
}

/**
 * 检查文本是否包含关键词
 * @param text 原始文本
 * @param keywords 要检查的关键词（字符串或字符串数组）
 * @param caseSensitive 是否大小写敏感，默认 false
 * @returns 是否包含任意关键词
 */
export function containsKeyword(
  text: string | undefined | null,
  keywords: string | string[] | undefined | null,
  caseSensitive = false
): boolean {
  if (!text || !keywords) return false;

  const keywordList = Array.isArray(keywords) ? keywords : [keywords];
  const validKeywords = keywordList.filter((k) => k && k.trim());

  if (validKeywords.length === 0) return false;

  const searchText = caseSensitive ? text : text.toLowerCase();

  return validKeywords.some((keyword) => {
    const searchKeyword = caseSensitive ? keyword : keyword.toLowerCase();
    return searchText.includes(searchKeyword);
  });
}

/**
 * 合并多个关键词来源为统一的高亮关键词数组
 * @param sources 关键词来源对象
 * @returns 合并后的关键词数组
 *
 * @example
 * ```ts
 * const keywords = mergeKeywords({
 *   queryKeyword: 'test',
 *   productName: 'product',
 *   contentFeature: ['feature1', 'feature2']
 * });
 * // => ['test', 'product', 'feature1', 'feature2']
 * ```
 */
export function mergeKeywords(sources: HighlightKeywords): string[] {
  const result: string[] = [];

  if (sources.queryKeyword?.trim()) {
    result.push(sources.queryKeyword.trim());
  }

  if (sources.productName?.trim()) {
    result.push(sources.productName.trim());
  }

  if (sources.videoId?.trim()) {
    result.push(sources.videoId.trim());
  }

  if (sources.contentFeature?.length) {
    result.push(...sources.contentFeature.filter((f) => f?.trim()));
  }

  // 去重并返回
  return [...new Set(result)];
}

/**
 * 获取字段对应的高亮关键词
 * 根据字段名返回应该高亮的关键词列表
 * @param field 字段名
 * @param keywords 高亮关键词配置
 * @returns 该字段应该高亮的关键词数组
 */
export function getFieldKeywords(
  field: 'videoId' | 'author' | 'productName' | 'contentFeature' | 'title' | 'description',
  keywords: HighlightKeywords
): string[] {
  const result: string[] = [];

  switch (field) {
    case 'videoId':
      // 视频ID 可以被 queryKeyword 或 videoId 高亮
      if (keywords.queryKeyword?.trim()) {
        result.push(keywords.queryKeyword.trim());
      }
      if (keywords.videoId?.trim()) {
        result.push(keywords.videoId.trim());
      }
      break;

    case 'author':
      // 作者 被 queryKeyword 高亮
      if (keywords.queryKeyword?.trim()) {
        result.push(keywords.queryKeyword.trim());
      }
      break;

    case 'productName':
      // 产品名称 被 productName 高亮
      if (keywords.productName?.trim()) {
        result.push(keywords.productName.trim());
      }
      break;

    case 'contentFeature':
      // 内容特征 被 contentFeature 数组高亮
      if (keywords.contentFeature?.length) {
        result.push(...keywords.contentFeature.filter((f) => f?.trim()));
      }
      break;

    case 'title':
    case 'description':
      // 标题和描述 可以被所有关键词高亮（可选，根据需求调整）
      break;
  }

  return [...new Set(result)];
}

/**
 * 默认导出高亮样式 CSS
 * 可在全局样式或组件中引入
 */
export const HIGHLIGHT_STYLES = `
.highlight-keyword {
  color: #02b96b;
}
`;
