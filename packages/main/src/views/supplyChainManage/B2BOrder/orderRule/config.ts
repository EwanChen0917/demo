/* eslint-disable import/prefer-default-export */
export const commonHeaderRule = {
  name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择规则状态', trigger: 'blur' }],
  priority: [{ required: true, message: '请输入优先级', trigger: 'blur' }],
  effectiveTimeBegin: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
  description: [{ required: false, message: '请输入规则描述', trigger: 'blur' }],
};
