<template>
  <div class="changePassword-page">
    <div class="page-card">
      <div class="confirm-title">修改密码</div>
      <el-form :model="form" :rules="rules" ref="formRef" style="width: 400px">
        <el-form-item prop="originPassword">
          <el-input
            type="password"
            v-model.trim="form.originPassword"
            placeholder="原密码"
            show-password
          />
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            type="password"
            v-model.trim="form.newPassword"
            placeholder="新密码"
            show-password
          />
        </el-form-item>
        <el-form-item prop="newPasswordConfirm">
          <el-input
            type="password"
            v-model.trim="form.newPasswordConfirm"
            placeholder="确认密码"
            show-password
          />
        </el-form-item>
        <div class="changePassword-button">
          <el-button type="primary" size="default" @click="sendEmail">保 存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="accountManage">
  import { ElMessage } from 'element-plus';
  import { memberApi } from '@/api';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';

  const router = useRouter();
  const store = useStore();
  const formRef = ref();
  const form = reactive({
    originPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const rules = reactive({
    originPassword: [
      {
        validator(_: any, value: any, callback: any) {
          if (value === '') {
            callback(new Error('请输入原密码'));
          } else if (value.length < 6 || value.length > 12) {
            callback(new Error('密码长度为6-12位'));
          } else {
            callback();
          }
          // if (value === '') {
          //   callback(new Error('请输入新密码'));
          // } else {
          //   const reg = /^[a-zA-Z0-9]{6,12}$/;
          //   if (!reg.test(value)) {
          //     callback(new Error('密码格式错误,仅支持长度为6-12的大小写字母和数字'));
          //   } else {
          //     callback();
          //   }
          // }
        },
      },
    ],
    newPassword: [
      {
        validator(_: any, value: any, callback: any) {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else if (value.length < 6 || value.length > 12) {
            callback(new Error('密码长度为6-12位'));
          } else if (form.originPassword !== '' && form.originPassword === value) {
            callback(new Error('新密码不能与原密码相同'));
          } else {
            callback();
          }
          // if (value === '') {
          //   callback(new Error('请输入新密码'));
          // } else {
          //   const reg = /^[a-zA-z0-9]{6,12}$/;
          //   if (!reg.test(value)) {
          //     callback(new Error('密码格式错误,仅支持长度为6-12的大小写字母和数字'));
          //   } else {
          //     if (form.originPassword !== '') {
          //       if (form.originPassword === value) {
          //         callback(new Error('新密码不能与原密码相同'));
          //       }
          //     }
          //     callback();
          //   }
          // }
        },
        trigger: 'blur',
      },
    ],
    newPasswordConfirm: [
      {
        validator(_: any, value: any, callback: any) {
          if (value === '') {
            callback(new Error('请输入确认密码'));
          } else if (value.length < 6 || value.length > 12) {
            callback(new Error('密码长度为6-12位'));
          } else if (value !== form.newPassword) {
            callback(new Error('确认密码与新密码不一致'));
          } else {
            callback();
          }
          // if (value === '') {
          //   callback(new Error('请输入确认密码'));
          // } else {
          //   const reg = /^[a-zA-z0-9]{6,12}$/;
          //   if (!reg.test(value)) {
          //     callback(new Error('密码格式错误,仅支持长度为6-12的大小写字母和数字'));
          //   } else if (value !== form.newPassword) {
          //     callback(new Error('确认密码与新密码不一致'));
          //   } else {
          //     callback();
          //   }
          // }
        },
        trigger: 'blur',
      },
    ],
  });
  const loading = ref(false);
  const sendEmail = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      loading.value = true;
      const res = await memberApi.luteosMemberUpdatePassword(form).finally(() => {
        loading.value = false;
      });
      if (res) {
        ElMessage.success('修改成功，即将跳转至登录页面');
        setTimeout(async () => {
          await store.logOut();
          // router.push('/login');
        }, 2000);
      }
    }
  };
</script>

<style scoped lang="scss">
  .changePassword-page {
    padding: 24px;
    .page-title {
      font-size: 22px;
      font-weight: 500;
      line-height: 31px;
      margin-bottom: 24px;
      margin-top: 0;
    }
    .page-card {
      padding: 24px;
      background-color: #fff;
      border-radius: 12px;
      .confirm-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 25px;
        margin-bottom: 24px;
      }
      .confirm-email {
        margin-top: 12px;
        font-weight: 400;
        line-height: 19.6px;
        color: #97999b;
      }
      .changePassword-button {
        margin-top: 4px;
        text-align: right;
        .button-primary {
          // width: 180px;
        }
      }
    }
  }
</style>
