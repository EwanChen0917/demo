<template>
  <div></div>
</template>

<script setup lang="ts" name="fastAuth">
  import { useCache } from '@/hooks/web/useCache';
  import { setCookieToken } from '@/hooks/web/useCookie';
  import { encryptByBase64, decryptByBase64 } from '@/utils/aesTils';

  const route = useRoute();
  const { wsCache } = useCache('localStorage');
  const token = route.query.token as string | undefined;
  const target = (route.query.target || route.query.scene || '').toString();
  const redirect = route.query.redirect as string | undefined;
  const redirectEncoded = route.query.redirectEncoded as string | undefined;
  const env = import.meta.env.VITE_ENV;
  const isProd = env === 'PROD';

  const buildKmsUrl = () => {
    const kmsDomain = isProd ? 'https://kms.luteos.com' : 'https://kms.luteos.site';
    const kmsMenuCode = isProd ? 'M2025111417274358012224' : 'M2025112418363650032294';
    const relayMenuCode = 'M2025042719211214971508';
    const targetUrl = `${kmsDomain}/filemanage`;
    const relayUrl = `${window.location.origin}/frame/${relayMenuCode}/${encryptByBase64(
      targetUrl
    )}`;
    const loginUrl = `${kmsDomain}/financeCenter?token=${encodeURIComponent(
      token || ''
    )}&redirect=${encodeURIComponent(relayUrl)}`;
    return `/frame/${kmsMenuCode}/${encryptByBase64(loginUrl)}`;
  };

  if (!token) {
    window.location.href = '/login';
  } else {
    wsCache.set('token', token);
    setCookieToken(token);
    if (redirectEncoded) {
      window.location.replace(decryptByBase64(redirectEncoded));
    } else if (redirect) {
      window.location.replace(redirect);
    } else if (target === 'kms') {
      window.location.replace(buildKmsUrl());
    } else {
      window.location.replace('/userInfo');
    }
  }
</script>

<style scoped lang="scss"></style>
