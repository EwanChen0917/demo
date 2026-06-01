import { castArray, isNil } from 'lodash-es';

export const createUserFormValidators = ({
  isUserTypeLocked,
  isOverseas,
  isPasswordRequired,
  isPasswordEditing,
  form,
}) => {
  const validateLoginAccount = (_rule, value, callback) => {
    if (isUserTypeLocked.value) return callback();
    if (isOverseas.value && !value) return callback(new Error('请输入登录账号'));
    if (value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
      return callback(new Error('请输入有效的邮箱账号'));
    if (value && value.length > 50) return callback(new Error('长度不能超过50'));
    return callback();
  };

  const validatePassword = (_rule, value, callback) => {
    if (!isPasswordRequired.value) return callback();
    if (!value) return callback(new Error('请输入密码'));
    if (value.length < 8 || value.length > 20) return callback(new Error('密码长度需在8~20位'));
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-={}\[\]|;:'",.<>/?]).+$/;
    if (!reg.test(value)) return callback(new Error('需包含大写/小写/数字/符号'));
    return callback();
  };

  const validateConfirmPassword = (_rule, value, callback) => {
    if (!isPasswordEditing.value) return callback();
    if (!value) return callback(new Error('请再次输入密码'));
    if (value !== form.value.password) return callback(new Error('两次输入密码不一致'));
    return callback();
  };

  const validateDeptIdList = (_rule, value, callback) => {
    const list = castArray(value).filter((item) => !isNil(item) && item !== '');
    if (isOverseas.value && !list.length) return callback(new Error('请选择部门'));
    return callback();
  };

  const validateTitle = (_rule, value, callback) => {
    if (isOverseas.value && !value) return callback(new Error('请输入用户职位'));
    if (value && value.length > 50) return callback(new Error('长度不能超过50'));
    return callback();
  };

  return {
    validateLoginAccount,
    validatePassword,
    validateConfirmPassword,
    validateDeptIdList,
    validateTitle,
  };
};
