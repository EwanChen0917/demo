import { useStore } from '@/store/modules/useStore';

export const checkPermission = (code) => {
  if (!code) {
    throw new Error('need permissions code');
  }
  const authList = useStore().authList || [];
  return authList.find((authCode) => String(authCode) === String(code));
};
export const fn = () => {};
