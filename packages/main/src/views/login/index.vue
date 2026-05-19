<template>
  <div class="login-container">
    <iframe crossorigin="anonymous" ref="frame" :src="authUrl" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts" name="login">
  import { setCookieToken } from '@/hooks/web/useCookie';
  import version from '@/version.json';

  onMounted(() => {
    window.addEventListener('message', receiveMessage, false);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('message', receiveMessage, false);
  });

  function normalizeBranchName(branch: string) {
    if (!branch) return '';
    const removedRemoteAndRef = branch
      .replace(/^refs\/heads\//, '')
      .replace(/^remotes\/origin\//, '')
      .replace(/^remotes\//, '')
      .replace(/^origin\//, '');
    // 将分支名中的所有斜杠替换为短横线，例如 feature/xxx -> feature-xxx
    return removedRemoteAndRef.replace(/\//g, '-');
  }

  // 根据分支名和环境变量判断认证地址
  const getAuthUrl = () => {
    const branch = (version as any)?.Branch || '';
    const normalizedBranch = normalizeBranchName(branch);

    // 生产环境且为主分支时使用正式认证地址
    if (
      normalizedBranch === 'master' ||
      normalizedBranch === '' ||
      normalizedBranch.startsWith('release')
    ) {
      return 'https://auth.luteos.com';
    }
    if (normalizedBranch === 'dev') {
      return 'https://auth.luteos.site';
    }
    // 其他情况使用测试环境地址
    return 'https://test-auth.luteos.site';
  };
  const authUrl = getAuthUrl();

  async function receiveMessage(event: any) {
    if (event.data.token) {
      const { token } = event.data;
      setCookieToken(token);
      window.location.href = window.location.href;
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
