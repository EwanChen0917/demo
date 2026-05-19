<template>
  <KeenCard title="收件邮箱（换行隔开）">
    <el-input v-model="content" type="textarea" placeholder="请输入收件邮箱" :rows="15" clearable />
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-button @click="content = ''">清除内容</el-button>
    <el-button type="primary" @click="search">确定</el-button>
  </div>
</template>

<script setup lang="ts" name="emailHistoryBatchSearch">
  import { ElMessage } from 'element-plus';
  import { encryptByBase64 } from '@/utils/aesTils';

  const router = useRouter();
  const content = ref();

  const search = async () => {
    if (content.value) {
      content.value = content.value
        ?.split('\n')
        .filter((item) => item.trim())
        .join('\n');
      const illegalEmails = content.value?.split('\n')?.filter((item) => {
        return !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}/.test(item);
      });
      if (illegalEmails?.length) {
        ElMessage.warning(`${illegalEmails?.join(',')}不是有效的邮箱地址，请重新输入`);
        return;
      }

      const emailList = content.value?.split('\n');
      router.push({
        name: 'emailHistoryBatchSearchResult',
        query: {
          emailList: encryptByBase64(JSON.stringify(emailList)),
        },
      });
    } else {
      ElMessage.warning('请输入收件邮箱');
    }
  };
</script>

<style scoped lang="scss"></style>
