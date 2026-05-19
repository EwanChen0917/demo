import { useStore } from '@/store/modules/useStore';

function checkPermission(el: any, binding: any) {
  const { value } = binding;
  const store = useStore();
  // 后续authList会变成映射表储存在state，方案查询
  const resource = store.authList || [];
  if (value) {
    const hasPermission = resource.find((code: string) => code === value);
    if (!hasPermission) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error('need permissions! Like v-permission="code"');
  }
}
export default {
  // 指令绑定元素挂载前
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  // 指令绑定元素因为数据修改触发修改后
  updated(el, binding) {
    checkPermission(el, binding);
  },
};
