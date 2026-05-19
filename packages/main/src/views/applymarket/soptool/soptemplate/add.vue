<template>
  <div class="packing-detail-page">
    <action ref="actionRef" v-model="formData" :formRule="formRule" />
    <div class="form-save">
      <el-button :disabled="saveLoading" @click="goList">取消</el-button>
      <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="soptemplateadd">
  import { reactive, nextTick, ref } from 'vue';
  import { sopApi } from '@/api/index';
  import { useRequest } from 'vue-request';
  import { ElMessage } from 'element-plus';
  import { uuid } from '@/utils/aesTils';
  import { useTabs } from '@/hooks/tabs';
  import action from './components/action.vue';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const actionRef = ref();
  const formData = ref({
    templateCode: '',
    templateDesc: '',
    templateName: '',
    stepList: new Array(9).fill('').map(() => {
      return {
        _id: uuid(),
        desc: '',
        image: '',
        sort: 0,
        stepCode: '',
        title: '',
      };
    }),
  });
  const formRule = reactive({
    templateName: [{ required: true, message: '请输入模板名称' }],
    stepList: [{ required: true, type: 'array' }],
  });
  const router = useRouter();
  const goList = () => {
    router.push({
      name: 'soptemplate',
    });
  };
  const { loading: saveLoading, run: confirmSave } = useRequest(sopApi.luteosSopSaveTemplateInfo, {
    manual: true,
    async onSuccess() {
      ElMessage.success('保存成功');
      // const isConfirmed = await swal.exportConfirm();
      // if (!isConfirmed) return;
      // await nextTick();
      closeTabAndRefresh('soptemplate');
      router.push({
        path: '/soptemplate',
        query: {},
      });
    },
    onError(e) {
      // swal.error(`导出失败: ${e.message}`);
    },
  });

  const save = () => {
    actionRef.value.formRef.validate((isValid) => {
      if (isValid) {
        const params = {
          ...formData.value,
          stepList: (formData.value.stepList as any).map((item, index) => {
            return {
              desc: item.desc,
              image: item.image,
              stepCode: item.stepCode,
              title: item.title,
              sort: index,
            };
          }),
        };
        confirmSave(params);
      } else {
        nextTick(() => {
          const errDom = document.querySelector('.el-form-item.is-error');
          errDom?.scrollIntoView(false);
        });
      }
    });
  };
</script>

<style scoped lang="scss">
  .form-save {
    text-align: right;
  }
</style>
