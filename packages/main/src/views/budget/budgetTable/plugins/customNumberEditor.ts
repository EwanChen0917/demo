import { useInputHelper } from '@/views/budget/budgetTable/plugins/inputHelper';

export class CustomNumberEditor extends Handsontable.editors.BaseEditor {
  // 初始化编辑器
  init() {
    // 创建编辑器容器
    this.container = this.hot.rootDocument.createElement('DIV');
    this.container.style.width = '1px';
    this.container.className = 'budgetNumberInput';

    // 创建文本输入框
    this.input = this.hot.rootDocument.createElement('INPUT');
    this.input.type = 'text';

    // 组装元素
    this.container.appendChild(this.input);
    this.hot.rootElement.appendChild(this.container);

    useInputHelper.call(this, this.input);

    this.input.addEventListener('input', () => {
      // 去除前面的0，例如输入 0-1 实际应为 -1，输入 02 实际应为 2，输入 00 显示为 0
      // 但是注意：如果用户输入 0. 的0是不能去掉的
      let { value } = this.input;
      value = value.trim();
      if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
        this.input.value = value.slice(1);
      }
    });

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
    let { value } = this.input;
    if (value === '') {
      return '';
    }
    value = value.trim();
    if (value.includes(',') || value.includes('，') || value.includes('_')) {
      value = value.replace(/[,_，]/g, '');
    }
    if (isFinite(+value)) {
      return +value;
    }
    return value;
  }

  // 设置值
  setValue(value) {
    // keep empty
  }

  __setValue(value) {
    const num = value === '' || value === null || value === undefined ? '' : +value;
    this.input.value = isFinite(num) ? num : '';
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
Handsontable.editors.CustomNumberEditor = CustomNumberEditor;
Handsontable.editors.registerEditor(CustomNumberEditor);
