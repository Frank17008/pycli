/**
 * 创建a标签下载
 * @param {string} url 下载地址
 * @param {string} title 下载标题
 * @param {string} target 窗口位置
 */
export function tagADownload({ url, title = '', target = '_blank' }) {
  const tagA = document.createElement('a');
  tagA.setAttribute('href', url);
  tagA.setAttribute('title', title);
  tagA.setAttribute('target', target);
  document.body.appendChild(tagA);
  tagA.click();
  document.body.removeChild(tagA);
}

export const downloadExcel = (res: any, name: string) => {
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
  const fileName = `${name}.xlsx`;
  if ('download' in document.createElement('a')) {
    const tagA = document.createElement('a');
    tagA.download = fileName;
    tagA.style.display = 'none';
    tagA.href = URL.createObjectURL(blob);
    document.body.appendChild(tagA);
    tagA.click();
    URL.revokeObjectURL(tagA.href);
    document.body.removeChild(tagA);
  }
};

// 下载pdf
export const downloadPdf = (res: any, name: string) => {
  const blob = new Blob([res], { type: 'application/pdf' });
  const fileName = name;
  if ('download' in document.createElement('a')) {
    const tagA = document.createElement('a');
    tagA.download = fileName;
    tagA.style.display = 'none';
    tagA.href = URL.createObjectURL(blob);
    document.body.appendChild(tagA);
    tagA.click();
    URL.revokeObjectURL(tagA.href);
    document.body.removeChild(tagA);
  }
};

// 预览pdf
export const previewPdf = (res: any) => {
  const blob = new Blob([res], { type: 'application/pdf' });
  if ('download' in document.createElement('a')) {
    const tagA = document.createElement('a');
    tagA.style.display = 'none';
    tagA.href = URL.createObjectURL(blob);
    tagA.target = '_blank';
    document.body.appendChild(tagA);
    tagA.click();
    URL.revokeObjectURL(tagA.href);
    document.body.removeChild(tagA);
  }
};
