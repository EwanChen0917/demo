export function useDragger(dragHandleRef: any, initWidth: number) {
  // 拖动，改变width变量
  const width = ref(initWidth);
  const AppDom = document.querySelector('#app') as HTMLElement;
  let dragging = false;
  let startX = 0;
  let startWidth = 0;
  const minWidth = 428;
  const maxWidth = 800;
  const onMouseMove = (ev) => {
    if (!dragging) return;
    document.body.style.cursor = 'ew-resize';
    AppDom.style.userSelect = 'none';
    AppDom.style.pointerEvents = 'none';
    const deltaX = ev.clientX - startX;
    let newWidth = startWidth - deltaX;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    width.value = newWidth;
  };
  const onMouseUp = () => {
    dragging = false;
    document.body.style.cursor = 'default';
    AppDom.style.userSelect = 'auto';
    AppDom.style.pointerEvents = 'auto';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  onMounted(() => {
    dragHandleRef.value?.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      dragging = true;
      startX = ev.clientX;
      startWidth = width.value;
      document.body.style.cursor = 'ew-resize';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  });
  return { width };
}

export default {};
