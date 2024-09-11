export function initRem() {
  const doc = document;
  const win = window;
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function () {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    //  屏幕尺寸小于800的时候，不启用rem，而是使用媒体查询进行移动端适配
    if (clientWidth <= 800) {
      return;
    }
    docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    doc.body.style.fontSize = '16px';
  };
  if (!doc.addEventListener) {
    return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}
