import { useInputHelper } from '@/views/budget/budgetTable/plugins/inputHelper';

export class CustomTextEditor extends Handsontable.editors.BaseEditor {
  // 初始化编辑器
  init() {
    // 创建编辑器容器
    this.container = this.hot.rootDocument.createElement('DIV');
    this.container.style.width = '1px';
    this.container.className = 'budgetTextInput';

    // 创建文本输入框
    this.input = this.hot.rootDocument.createElement('INPUT');
    this.input.type = 'text';

    // 组装元素
    this.container.appendChild(this.input);
    this.hot.rootElement.appendChild(this.container);

    useInputHelper.call(this, this.input);

    // 添加事件监听
    this.input.addEventListener('keydown', (event) => {
      const { key } = event;
      if (key === 'Enter') {
        this.finishEditing();
      } else if (key === 'Escape') {
        this.cancelEditing();
      } else if (key === 'Backspace') {
        event.stopPropagation();
      }
    });

    // 失去焦点时完成编辑
    this.input.addEventListener('blur', () => {
      // 只有在编辑器打开状态下才处理失去焦点事件
      if (this._opened) {
        this.finishEditing();
      }
    });
  }

  // 准备编辑器
  prepare(row, col, prop, td, originalValue, cellProperties) {
    super.prepare(row, col, prop, td, originalValue, cellProperties);

    this.setPositionAndWidth(true);

    this.__setValue(originalValue);

    setTimeout(() => {
      this.input.focus();
    }, 10);

    // 处理单元格特定的配置
    const { customTextOptions } = this.cellProperties;

    if (customTextOptions) {
      if (customTextOptions.placeholder) {
        this.input.placeholder = customTextOptions.placeholder;
      }
    }
  }

  setOpenState(isOpen) {
    this._opened = isOpen;
    if (this._opened) {
      this.container.style.backgroundColor = '#fff';
    } else {
      this.container.style.backgroundColor = 'transparent';
    }
  }

  // 获取值
  getValue() {
    return this.input.value;
  }

  // 设置值
  setValue(value) {
    // keep empty
  }

  __setValue(value) {
    this.input.value = value || '';
  }

  // 打开编辑器
  open() {
    this.setOpenState(true);
    this._openTick = Date.now();

    // 设置容器位置和尺寸
    this.setPositionAndWidth(false);

    // 聚焦到输入框
    this.input.focus();
  }

  // 聚焦到编辑器
  focus() {
    this.input.focus();
  }

  // 关闭编辑器
  close() {
    if (!this._opened) {
      return;
    }
    this.setOpenState(false);
    this.container.style.display = 'none';
    this.input.value = '';
  }

  // 计算并设置popover位置和宽度
  setPositionAndWidth(isPrepare) {
    const { top, start, width, height } = this.getEditedCellRect();

    const containerStyle = this.container.style;

    containerStyle.display = '';
    containerStyle.top = `${top + 2}px`;
    containerStyle.left = `${start + 2}px`;
    containerStyle.height = `${height - 4}px`;
    containerStyle.width = isPrepare ? '5px' : `${width - 4}px`;
  }

  // 完成编辑
  finishEditing() {
    // 防止重复调用
    if (!this._opened) {
      return;
    }

    const value = this.getValue();

    // 先关闭编辑器再设置值，避免循环调用
    this.close();

    // 设置单元格的值
    this.hot.setDataAtCell(this.row, this.col, value);
  }

  // 取消编辑
  cancelEditing() {
    // 先关闭编辑器再取消选中，避免循环调用
    this.close();

    // 取消选中单元格
    this.hot.deselectCell();
  }
}

// 注册编辑器
Handsontable.editors.CustomTextEditor = CustomTextEditor;
Handsontable.editors.registerEditor(CustomTextEditor);
