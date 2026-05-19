import type { Directive, DirectiveBinding } from 'vue';
interface numberInputOptions {
  percision: number; //小数个数
  min?: number; //最小值
  max?: number; //最大值
  allowZero?: boolean; //是否允许0,
  allowPercision?:boolean;
}
interface numberInputHtmlElement extends HTMLElement {
  value: any;
  selectionStart:number;
  setSelectionRange:(arg1:number,arg2:number)=>void;
  _numberFormatHandlers?: {
    input: (e: Event) => void;
    blur: (e: Event) => void;
  };
}
/**
 * 过滤数字为符合配置项的内容
 * @param val
 * @param options
 */
export const filterNumber = (val: string, options: numberInputOptions): string => {
  if (!val) return '';
  let filterNum = val.replace(/[^\d.]/g, '');
  const parts = filterNum.split('.');
  if (parts.length > 2) {
    filterNum = parts[0] + '.' + parts.slice(1).join('');
  }
  if (parts.length === 2 && options.percision !== undefined) {
    // 如果精度为0，不允许小数点
    if (options.percision === 0) {
      filterNum = parts[0];
    } else {
      const cutNum = parts[1].substring(0, options.percision);
      // 只有当小数部分不为空或者用户正在输入小数点时才添加小数点
      if (cutNum || parts[1] === '') {
        filterNum = parts[0] + '.' + cutNum;
      } else {
        filterNum = parts[0];
      }
    }
  }
  return filterNum;
};
export const toFormattedNum = (value:string | number | null | undefined,options:numberInputOptions):number | null=>{
    if (value === '' || value === null || value === undefined) {
        return null;
    }
    const {
        percision= 2,
        min=0,
        max,
        allowZero = false,
    } = options
    const num = Number(value)
    if(isNaN(num)) return null
    if(!allowZero && num === 0) return null
    if(min && num < min)return null
    if(max && num > max)return null
    return num
}
const numberFormat: Directive = {
  mounted(el, binding: DirectiveBinding<numberInputOptions>) {
    const input = el.querySelector('input') as HTMLInputElement;
    if (!input) {
      console.warn(`未找到指定的input标签`);
      return;
    }
    const options: numberInputOptions = binding.value || {};
   
    const handleInput = (e: Event) => {
      const target = e.target as numberInputHtmlElement;

      const currentPosition = target.selectionStart || 0;
      if (!target.value) return;
      const oldValue = target?.value;
      const newValue = filterNumber(target.value, options);
      if (oldValue !== newValue) {
        target.value = newValue;
        // 只在值真正改变时才触发事件，通知Vue更新
        target.dispatchEvent(new Event('input', { bubbles: true }));
        // 恢复光标位置
        const diff = oldValue.length - newValue.length;
        const newPosition = Math.max(0, currentPosition - diff);
        target.setSelectionRange(newPosition, newPosition);
      }
    };
    const handleBlur = (e:Event)=>{
        const target = e.target as HTMLInputElement
        const formattedValue = toFormattedNum(target.value,options)
        target.value = formattedValue !== null ? String(formattedValue) : ''
        target.dispatchEvent(new Event('input', { bubbles: true }))
        target.dispatchEvent(new Event('change', { bubbles: true }))
    }
    input.addEventListener('input',handleInput)
    input.addEventListener('blur',handleBlur)
    el._numberFormatHandlers = {
        input:handleInput,
        blur:handleBlur
    }
  },
  unmounted(el){
    const input = el.querySelector('input') as HTMLInputElement;
    if(input && el._numberFormatHandlers){
        input.removeEventListener('input',el._numberFormatHandlers.input)
        input.removeEventListener('blur', el._numberFormatHandlers.blur);
    }
    delete(el._numberFormatHandlers)
  }
};

export default numberFormat;
