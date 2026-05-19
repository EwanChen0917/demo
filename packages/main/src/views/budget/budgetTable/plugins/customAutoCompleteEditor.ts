import debounce from 'lodash-es/debounce';
import { useInputHelper } from '@/views/budget/budgetTable/plugins/inputHelper';
import { fileType } from '@/views/finance/income/incomeRule/enum';
import TableEventBus from '@/views/budget/budgetTable/util/event';
import { buildFuzzySearchText, escapeRegExp } from '@/views/budget/budgetTable/util/util';
import { CellType } from '@/views/budget/budgetTable/types/type';

export class CustomAutoCompleteEditor extends Handsontable.editors.BaseEditor {
  // 注册插件时初始化
  init() {
    // 创建下拉框容器
    this.container = this.hot.rootDocument.createElement('DIV');
    this.container.style.width = '1px';
    this.container.className = 'budgetAutoComplete';

    // 创建搜索输入框
    this.searchInput = this.hot.rootDocument.createElement('INPUT');
    this.searchInput.type = 'text';
    this.searchInput.placeholder = '输入内容...';

    // 创建下拉框
    this.select = this.hot.rootDocument.createElement('DIV');
    this.select.className = 'select-box';
    this.select.style.display = 'none';

    // 组装元素
    this.container.appendChild(this.searchInput);
    this.container.appendChild(this.select);
    this.hot.rootElement.appendChild(this.container);

    useInputHelper.call(this, this.searchInput);

    // 事件监听
    this.searchInput.addEventListener('input', debounce(this.filterOptions.bind(this), 300));
    this.searchInput.addEventListener('keydown', this.handlerKeydown.bind(this));
    this.select.addEventListener('scroll', this.handleScroll.bind(this));
    // 添加选项点击事件监听
    this.select.addEventListener('click', this.handleSelectChange.bind(this));

    TableEventBus.on('select-cell', ({ rowStart, colStart, rowEnd, colEnd }) => {
      if (this.row !== rowStart || this.col !== colStart) {
        if (this._opened) {
          this.finish(this.getFilterValue());
        }
      }
    });
  }

  // 点击单元格触发
  prepare(row, col, prop, td, originalValue, cellProperties) {
    // console.log('in prepare');
    if (this._opened) {
      this.finish(this.getFilterValue());
    }

    super.prepare(row, col, prop, td, originalValue, cellProperties);

    const { columnMeta } = this.cellProperties;
    const { cellType, cellDropDownList, cellCascadeDownList, parentColumn } = columnMeta;

    this.columnMeta = columnMeta;
    // console.log("columnMeta=", columnMeta)

    this.setPositionAndWidth(true);

    this.__setValue(originalValue);
    // console.log('originalValue', originalValue);

    setTimeout(() => {
      this.searchInput.focus();
    }, 10);

    // 存储所有选项数据
    this.allOptions = [];
    this.filteredOptions = [];
    this.currentChunk = 0;
    this.chunkSize = 100; // 每次加载100个选项
    this.hasMore = true;

    if (cellType === CellType.AutoComplete) {
      this.allOptions = cellDropDownList;
    } else if (cellType === CellType.AutoCompleteCascade) {
      if (parentColumn) {
        const parentValue = this.hot.getDataAtRowProp(this.row, parentColumn.cellFieldName);
        this.allOptions = cellCascadeDownList?.[parentValue] || [];
      } else {
        // 是 root 节点
        this.allOptions = cellDropDownList;
      }
    }

    this.filteredOptions = [...this.allOptions];
  }

  setOpenState(isOpen) {
    this._opened = isOpen;
    if (this._opened) {
      this.container.style.backgroundColor = '#fff';
    } else {
      this.container.style.backgroundColor = 'transparent';
    }
  }

  getValue() {
    // console.log('in getValue');
    const inputValue = this.getFilterValue();
    if (inputValue) {
      const item = this.allOptions.find((item) => item === inputValue);
      if (item) {
        return item;
      }
    }
    if (this.select.value) {
      return this.select.value;
    }
    return this._openInitValue;
  }

  setValue(value) {
    // console.log('in setValue', value);
    // keep empty
  }

  __setValue(value) {
    this._openInitValue = value;
    this.select.value = value;
  }

  getFilterValue() {
    return this.searchInput.value.trim().replace(/\s+/g, ' ');
  }

  open() {
    // console.log('in open');
    this.setOpenState(true);

    this.setPositionAndWidth(false);

    // 清空搜索和选项
    this.searchInput.placeholder =
      this._openInitValue && !this._openInitValue?.startsWith?.('=') ? this._openInitValue : '搜索';

    // 计算并设置位置和宽度
    this.filterOptions();

    // 聚焦到搜索框
    this.searchInput.focus();
  }

  focus() {
    // console.log('in focus');
    this.searchInput.focus();
  }

  close() {
    // console.log('in close', this._opened);
    this.searchInput.value = '';
    if (!this._opened) {
      return;
    }
    // console.log('in close');
    this.setOpenState(false);

    this.container.style.width = '1px';
    this.select.style.display = 'none';
  }

  finish(value) {
    // console.log('in finish', value);
    if (value === undefined || value === null) {
      this.close();
      return;
    }
    this.select.value = value;
    // 获取选中的值
    const selectedValue = this.select.value;

    const { columnMeta } = this.cellProperties;
    const changes = [[this.row, columnMeta.cellFieldName, selectedValue]];

    // 级联联动
    if (columnMeta.cellType === CellType.AutoCompleteCascade) {
      // 如果下拉框存在 selectedValue , 那么就是级联联动，如果是用户手动输入，那么不联动
      const isHaveValue = this.allOptions.some((item) => item === selectedValue);
      if (isHaveValue) {
        this.setCascadeChildrenValue(columnMeta, changes);
      }
    }

    // 设置单元格的值
    this.hot.setDataAtRowProp(changes);

    // 关闭编辑器
    this.close();

    // 完成编辑
    this.hot.deselectCell();
  }

  setCascadeChildrenValue(parentColumn, changes) {
    const { childrenColumns } = parentColumn;
    if (childrenColumns?.length) {
      for (const column of childrenColumns) {
        changes.push([this.row, column.cellFieldName, null]);
        this.setCascadeChildrenValue(column, changes);
      }
    }
  }

  // 处理选项选择变化
  handleSelectChange(ev) {
    // console.log('in handleSelectChange');
    let value;
    let { target } = ev;
    while (target) {
      value = target?.getAttribute?.('data-value');
      if (value !== undefined && value !== null) {
        break;
      }
      target = target.parentNode;
    }
    this.finish(value);
  }

  handlerKeydown(ev) {
    // 如果是回车，那就结束
    if (ev.key === 'Enter') {
      this.finish(this.getFilterValue());
    } else if (ev.key === 'Escape') {
      this.cose();
    } else if (ev.key === 'Backspace') {
      ev.stopPropagation();
    }
  }

  // 计算并设置popover位置和宽度
  setPositionAndWidth(isPrepare) {
    // console.log('in setPositionAndWidth');
    const { top: _top, start: _start, width: _width, height: _height } = this.getEditedCellRect();

    const containerStyle = this.container.style;

    containerStyle.top = `${_top + 2}px`;
    containerStyle.left = `${_start + 2}px`;
    containerStyle.height = `${_height - 4}px`;
    containerStyle.width = isPrepare ? '1px' : `${_width - 4}px`;

    if (isPrepare) {
      this.select.style.display = 'none';
      return;
    }
    this.select.style.display = '';
    // 获取容器的实际尺寸
    const selectBoxRect = this.select.getBoundingClientRect();
    const inputBoxRect = this.searchInput.getBoundingClientRect();

    const selectStyle = this.select.style;
    const { width, height } = selectBoxRect;

    const windowHeight = this.hot.rootWindow.innerHeight;
    const windowWidth = this.hot.rootWindow.innerWidth;
    // 右侧空间不足
    if (this._start + width > windowWidth) {
      selectStyle.left = 'auto';
      selectStyle.right = '0';
    } else {
      selectStyle.left = '0';
      selectStyle.right = 'auto';
    }
    // 底部空间检测: inputBoxRect.top 不能改为 this._top , 因为 this._top 是相对于表格的坐标
    if (inputBoxRect.top + this._height + height > windowHeight) {
      selectStyle.top = 'auto';
      selectStyle.bottom = `${this._height}px`;
    } else {
      selectStyle.top = `${this._height}px`;
      selectStyle.bottom = 'auto';
    }
  }

  // 过滤选项（防抖处理）
  filterOptions() {
    const filterText = this.getFilterValue();
    const filterTextCompare = filterText.toLowerCase();

    if (!this._opened) {
      this.filteredOptions = [];
      return;
    }

    const { columnMeta } = this.cellProperties;

    let options = this.allOptions || [];

    // 公式过滤
    if (columnMeta.enumsFilter_func) {
      const { simpleFormula, cellDropDownDetail } = columnMeta;
      const formulaConfigItem = simpleFormula.getFieldConfig('enumsFilter');

      options = options.filter((x) => {
        return simpleFormula.runFormula(this.row, columnMeta, formulaConfigItem, [
          x,
          cellDropDownDetail[x] || {},
        ]);
      });
    }

    if (!filterTextCompare) {
      this.filteredOptions = options;
    } else {
      const arr = [];
      // 包含通配符
      if (filterTextCompare.includes('*')) {
        const reg = buildFuzzySearchText(filterTextCompare, 'i');
        options.forEach((item) => {
          const index = item.toLowerCase().match(reg)?.index;
          if (index > -1) {
            arr.push({ item, index });
          }
        });
      } else {
        // 不含通配符
        options.forEach((item) => {
          const index = item.toLowerCase().indexOf(filterTextCompare);
          if (index > -1) {
            arr.push({ item, index });
          }
        });
      }

      arr.sort((a, b) => {
        if (a.index === b.index) {
          return a.item.length - b.item.length;
        }
        return a.index - b.index;
      });
      this.filteredOptions = arr.map((x) => x.item);
    }
    if (this._openInitValue && !filterTextCompare) {
      const currentIndex = this.filteredOptions.findIndex((x) => x === this._openInitValue);
      if (currentIndex === -1) {
        this.filteredOptions.unshift(this._openInitValue);
      }
    }
    if (filterTextCompare && filterText !== this._openInitValue) {
      const index = this.filteredOptions.findIndex((x) => x === filterText);
      if (index >= 0) {
        this.filteredOptions.splice(index, 1);
      }

      this.filteredOptions.unshift({
        value: filterText,
        label:
          index === -1
            ? `${filterText}<span style="color: red;">（新增该${
                this.columnMeta?.cellCnName || '项'
              }）</span>`
            : filterText,
      });
    }

    // 重置状态并重新加载
    this.currentChunk = 0;
    this.hasMore = true;
    this.select.innerHTML = '';
    this.loadMoreOptions();
  }

  // 分批加载选项
  loadMoreOptions() {
    if (!this.hasMore) return;

    const start = this.currentChunk * this.chunkSize;
    const end = Math.min(start + this.chunkSize, this.filteredOptions.length);
    const chunk = this.filteredOptions.slice(start, end);

    const template = document.createDocumentFragment();
    const filterText = this.getFilterValue();
    const filterReg =
      (filterText &&
        (filterText.includes('*')
          ? buildFuzzySearchText(filterText, 'gi')
          : new RegExp(escapeRegExp(filterText), 'gi'))) ||
      null;
    chunk.forEach((item) => {
      const optionElement = this.hot.rootDocument.createElement('DIV');
      optionElement.setAttribute('data-value', item.value || item);
      if (item === this._openInitValue) {
        optionElement.classList.add('selected');
      }
      optionElement.title = item;
      if (filterReg) {
        optionElement.innerHTML =
          item.label ||
          item.replace(
            filterReg,
            '<span style="background-color: yellow;color: #000 !important;">$&</span>'
          );
      } else {
        optionElement.innerHTML = item.label || item;
      }
      template.appendChild(optionElement);
    });
    this.select.appendChild(template);

    this.currentChunk++;
    this.hasMore = end < this.filteredOptions.length;

    // 如果选项很少，尝试加载更多
    if (chunk.length < this.chunkSize / 2 && this.hasMore) {
      this.loadMoreOptions();
    } else {
      this.setPositionAndWidth();
    }
  }

  // 滚动加载处理
  handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this.select;

    // 当滚动到底部附近时加载更多
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      this.loadMoreOptions();
    }
  }
}

Handsontable.editors.CustomAutoCompleteEditor = CustomAutoCompleteEditor;
Handsontable.editors.registerEditor(CustomAutoCompleteEditor);
