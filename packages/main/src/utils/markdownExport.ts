import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import { createApp, h, nextTick } from 'vue';
import Markdown from 'vue3-markdown-it';

function buildStyleTag(): string {
  return `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #111827; }
    .markdown-print-container { width: 100%; max-width: 720px; margin: 0 auto; padding: 16px 36px 36px; }
    .markdown-print-container, .markdown-print-container * { box-sizing: border-box; }
    /* 仅对段落文本增加轻微字距，缓解叠字；列表项保持默认字距，避免序号过近 */
    .markdown-print-container p, .markdown-print-container p * { letter-spacing: 0.35px; }
    .markdown-print-container ol, .markdown-print-container ul, .markdown-print-container li,
    .markdown-print-container li *, .markdown-print-container li::marker { letter-spacing: 0; }
    .markdown-print-container p, .markdown-print-container li { word-break: break-word; overflow-wrap: anywhere; }
    .markdown-print-container h1 { font-size: 24px; font-weight: 600; margin: 24px 0 16px; padding-bottom: 20px; text-align: center; }
    .markdown-print-container h2 { font-size: 18px; font-weight: 600; margin: 24px 0 16px; }
    .markdown-print-container h3 { font-size: 14px; font-weight: 600; margin: 20px 0 12px; }
    .markdown-print-container h4 { font-size: 12px; font-weight: 600; margin: 16px 0 8px; }
    .markdown-print-container p { margin: 12px 0; line-height: 1.8; }
    /* 调整编号缩进与文本缩进，保证长序号（两位/三位）不被裁剪 */
    .markdown-print-container ul, .markdown-print-container ol { margin: 12px 0; padding-left: 2.4em; list-style-position: outside; }
    .markdown-print-container ul ul, .markdown-print-container ol ol { margin-left: 0.8em; padding-left: 2.0em; }
    .markdown-print-container li { text-indent: 0; }
    .markdown-print-container li { margin: 8px 0; line-height: 1.5; }
    .markdown-print-container strong { font-weight: 600; }
    .markdown-print-container code { padding: 2px 6px; background: #f5f7fa; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 13px; color: #e83e8c; }
    .markdown-print-container pre { background: #f5f7fa; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 16px 0; }
    .markdown-print-container pre code { background: transparent; padding: 0; color: #303133; }
    .markdown-print-container blockquote { margin: 16px 0; padding: 12px 20px; background: #f5f7fa; border-left: 4px solid #409eff; color: #70757a; }
    .markdown-print-container blockquote p { margin: 0; }
    .markdown-print-container table { width: 100%; margin: 16px 0; border-collapse: separate; border-spacing: 0; border-radius: 6px; overflow: hidden; table-layout: fixed; }
    .markdown-print-container th, .markdown-print-container td { border: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; }
    .markdown-print-container th { background: #f9fafb; font-weight: 600; color: #303133; }
    .markdown-print-container tr:hover { background: #f9fafb; }
    .markdown-print-container hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .markdown-print-container a { color: #409eff; text-decoration: none; }
    .markdown-print-container a:hover { text-decoration: underline; }
    .page-break { page-break-after: always; }
  </style>
  `;
}

function wrapHtmlDocument(inner: string, title = 'document'): string {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title}</title>
      ${buildStyleTag()}
    </head>
    <body>
      <div class="markdown-print-container">${inner}</div>
    </body>
  </html>`;
}

function mountMarkdownToHiddenContainer(markdown: string) {
  const host = document.createElement('div');
  host.style.position = 'fixed';
  host.style.left = '-10000px';
  host.style.top = '0';
  host.style.width = '794px';
  host.style.background = '#fff';

  // 样式注入（与导出的样式一致）
  const styleHolder = document.createElement('div');
  styleHolder.innerHTML = buildStyleTag();
  host.appendChild(styleHolder);

  const appRoot = document.createElement('div');
  appRoot.className = 'markdown-print-container';
  host.appendChild(appRoot);

  document.body.appendChild(host);

  const app = createApp({
    render() {
      return h('div', { class: 'markdown-print-container' }, [
        h(Markdown as any, { source: markdown || '' }),
      ]);
    },
  });
  const vm = app.mount(appRoot);

  return { app, host, appRoot, vm };
}

export async function exportMarkdownToPDF(markdown: string, filename = 'document') {
  const { app, host, appRoot } = mountMarkdownToHiddenContainer(markdown);
  try {
    await nextTick();
    const element = host.querySelector('.markdown-print-container') as HTMLElement;
    const options = {
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' },
    } as any;
    await html2pdf().set(options).from(element).save();
  } finally {
    try {
      app.unmount();
    } catch (e) {}
    if (host && host.parentNode) host.parentNode.removeChild(host);
  }
}

export async function exportMarkdownToDOC(markdown: string, filename = 'document') {
  const { app, host } = mountMarkdownToHiddenContainer(markdown);
  try {
    await nextTick();
    const bodyHtml =
      (host.querySelector('.markdown-print-container') as HTMLElement)?.innerHTML || '';
    const fullHtml = wrapHtmlDocument(bodyHtml, filename);
    const blob = new Blob([fullHtml], { type: 'application/msword;charset=utf-8' });
    saveAs(blob, `${filename}.doc`);
  } finally {
    try {
      app.unmount();
    } catch (e) {}
    if (host && host.parentNode) host.parentNode.removeChild(host);
  }
}
