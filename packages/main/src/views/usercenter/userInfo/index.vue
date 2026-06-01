<template>
  <KeenCard title="">
    <div class="user-info">
      <el-avatar
        :size="60"
        v-if="userInfo.avatar"
        style="cursor: pointer"
        icon="el-icon-user-solid"
        shape="circle"
        :src="userInfo.avatar"
        fit="fill"
      />
      <el-avatar :size="60" style="color: #aaa" v-else>{{ userInfo?.name.slice(0, 1) }}</el-avatar>
      <el-form class="mt-10 user-info-form" label-width="120" label-position="left">
        <el-form-item label="姓名">
          <span class="info-value">{{ userInfo?.name }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别" style="width: 100%">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <span class="info-value">{{ userInfo?.mobile }}</span>
        </el-form-item>
        <el-form-item label="企业邮箱">
          <span class="info-value">{{ userInfo?.email }}</span>
        </el-form-item>
        <el-form-item label="部门">
          <span class="info-value">{{ userInfo?.deptName }}</span>
        </el-form-item>
        <el-form-item label="职位">
          <span class="info-value">{{ userInfo?.title }}</span>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请选择生日"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :default-value="defaultPickerValue"
            style="width: 100%"
          />
        </el-form-item>
        <div class="form-actions">
          <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
        </div>
      </el-form>
    </div>
  </KeenCard>
</template>

<script setup lang="ts" name="userInfo">
  import { ref, reactive, onMounted } from 'vue';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';
  import { memberApi } from '@/api';

  const { userInfo } = useStore();
  const saving = ref(false);

  const form = reactive({
    birthday: '',
    gender: '',
  });

  onMounted(() => {
    if ((userInfo as any).birthday) {
      form.birthday = (userInfo as any).birthday;
    }
    if ((userInfo as any).gender) {
      form.gender = (userInfo as any).gender;
    }
  });

  // 设置为 25 年前，符合大多数员工的预期范围
  const defaultPickerValue = new Date(new Date().getFullYear() - 25, 0, 1);

  const disabledDate = (time: Date) => {
    const now = new Date();
    // 限制在 16 岁到 100 岁之间
    const sixteenYearsAgo = new Date(now.getFullYear() - 16, now.getMonth(), now.getDate());
    const hundredYearsAgo = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());

    return time.getTime() > sixteenYearsAgo.getTime() || time.getTime() < hundredYearsAgo.getTime();
  };

  const handleSave = async () => {
    if (!form.birthday) {
      ElMessage.warning('请选择生日');
      return;
    }
    if (!form.gender) {
      ElMessage.warning('请选择性别');
      return;
    }
    saving.value = true;
    try {
      await memberApi.luteosMemberUpdateUserInfo({
        memberCode: userInfo.memberCode as string,
        birthday: form.birthday,
        gender: form.gender,
        updateBaseInfoFlag: 1,
      } as any);

      ElMessage.success('保存成功');
      // 更新 store 中的 userInfo
      (userInfo as any).birthday = form.birthday;
      (userInfo as any).gender = form.gender;
    } catch (error) {
      console.error('保存个人信息失败:', error);
    } finally {
      saving.value = false;
    }
  };
</script>

<style scoped lang="scss">
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 70vh;
    min-height: 500px;

    .user-info-form {
      margin-top: 30px;
      width: 400px;

      .info-value {
        color: #1f1f1f;
        font-weight: 500;
      }

      .form-actions {
        margin-top: 40px;
        display: flex;
        justify-content: center;

        .el-button {
          width: 120px;
          height: 40px;
          font-size: 15px;
        }
      }
    }
  }

  :deep(.el-form-item__label) {
    font-family: 'PingFang SC';
    color: #999;
    font-weight: 400;
  }
</style>
