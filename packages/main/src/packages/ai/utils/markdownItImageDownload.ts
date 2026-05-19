// plugins/markdownItImageDownload.js
export default function ImageDownloadPlugin(md, options = {}) {
  // 默认配置
  const defaults = {
    downloadClass: 'md-image-download',
    buttonContent: null, // 支持文本或SVG路径对象
    buttonClass: 'img-dl-btn',
    wrapperClass: 'img-wrapper',
    lazyLoad: true,
    placeholder:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzg4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  };

  const config = { ...defaults, ...options };

  // 处理按钮内容
  const getButtonContent = () => {
    // if (typeof config.buttonContent === 'string') {
    //   return config.buttonContent;
    // }
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M13.5 11.25C15 11.25 15.75 11.25 15.75 13.5C15.75 15.75 15 15.75 9 15.75C3 15.75 2.25 15.75 2.25 13.5C2.25 11.25 3 11.25 4.5 11.25" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 2.25V9.75" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6.75L9 9.75L12 6.75" stroke="#666666" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;
  };

  // 保存原始图片渲染函数
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  // 重写图片渲染规则
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const altIndex = token.attrIndex('alt');
    const titleIndex = token.attrIndex('title');

    const src = srcIndex >= 0 ? token.attrs[srcIndex][1] : '';
    const alt = altIndex >= 0 ? token.attrs[altIndex][1] : '';
    const title = titleIndex >= 0 ? token.attrs[titleIndex][1] : '';

    if (!src) return defaultRender(tokens, idx, options, env, self);

    // 创建图片标签（支持懒加载）
    const imgHtml = config.lazyLoad
      ? `<img src="${config.placeholder}" 
           data-src="${src}" 
           alt="${alt}" 
           ${title ? `title="${title}"` : ''} 
           class="lazy-load" 
           loading="lazy"
           style="display: block; max-width: 100%; height: auto;">`
      : `<img src="${src}" 
           alt="${alt}" 
           ${title ? `title="${title}"` : ''}
           style="display: block; max-width: 100%; height: auto;">`;

    // 创建下载按钮
    const downloadBtn = `
      <button class="${config.buttonClass} ${
      typeof config.buttonContent === 'string' ? 'text-btn' : 'icon-btn'
    }" 
        data-src="${encodeURI(src)}"
        data-filename="${alt || 'image'}"
        aria-label="下载图片"
      >
        ${getButtonContent()}
      </button>
    `;

    return `
      <div class="${config.wrapperClass} ${config.downloadClass}">
        ${imgHtml}
        ${downloadBtn}
      </div>
    `;
  };
}
