<template>
  <div class="agency-page">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="设计任务名称"
        prop="name"
        :rules="[{ required: true, message: '设计任务名称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="任务类别"
        prop="type"
        :rules="[{ required: true, message: '任务类别不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.type" placeholder="请选择任务类别" filterable>
          <el-option
            v-for="item in taskTypeList"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="项目等级"
        prop="projectLevel"
        :rules="[{ required: true, message: '项目等级不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.projectLevel" placeholder="请选择项目等级" filterable>
          <el-option
            v-for="item in productLevelList"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="分值"
        prop="score"
        :rules="[
          { required: true, message: '分值不能为空', trigger: 'blur' },
          {
            pattern: /^\d+(\.\d)?$/,
            message: '值仅可输入数字，精确到小数点后一位',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.score" />
      </el-form-item>
      <el-form-item label="设计周期" prop="designPeriod">
        <el-input v-model="form.designPeriod" />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
        :rules="[{ required: true, message: '状态不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="form-save">
      <el-button type="primary" :loading="saveLoading" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="designtaskconfigscore">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { designApi, DesignApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { dictCodeMap } from '../../config/index.ts';

  const router = useRouter();
  const route = useRoute();
  const searchInfo = sessionStorage.getItem('taskConfigSearchInfo') ?? '{}';
  const itemType = route.query.itemType || '';

  const formRef = ref();
  const form: any = reactive<DesignApi.LuteosDesignScoreSaveDesignScore.RequestBody>({
    itemType: +itemType,
    name: '',
    score: '',
    status: '',
    designPeriod: '',
    projectLevel: '',
    type: '',
  });

  const statusOptions = ref([
    {
      name: '禁用',
      code: 0,
    },
    {
      name: '启用',
      code: 1,
    },
  ]);

  //  是否是新的设计类型，依次对应上面的枚举类型
  const isNewScoreType = computed(() => {
    return +itemType > 5;
  });

  const saveLoading = ref(false);
  const save = () => {
    formRef.value.validate((isValid) => {
      if (isValid) {
        saveLoading.value = true;
        designApi
          .luteosDesignScoreSaveDesignScore(form)
          .then(() => {
            ElMessage.success('提交成功');
            formRef.value.resetFields();
            router.push({
              name: 'designtaskconfig',
              params: {
                ...JSON.parse(searchInfo),
                itemType: form.itemType,
              },
            });
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };

  const queryDetail = () => {
    designApi
      .luteosDesignScoreQueryDesignScoreDetail({
        designScoreCode: route.query.id,
      })
      .then((res: any) => {
        form.designScoreCode = res.designScoreCode;
        form.name = res.name;
        form.itemType = res.itemType;
        form.status = res.status;
        form.score = res.score;
        form.designPeriod = res.designPeriod;
        form.type = res.type;
        form.projectLevel = res.projectLevel;
      });
  };
  const productLevelList = ref([]);
  const taskTypeList = ref([]);
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: [`${dictCodeMap[+itemType]}`],
    });
    taskTypeList.value = res.dictMap[dictCodeMap[+itemType]] || [];
  };
  const queryPdtLevelList = async () => {
    const res: any = await designApi.luteosDesignQueryDesignLevelDict({
      itemType: 20,
    });
    productLevelList.value = res.dictMap.product_level || [];
  };
  queryPdtLevelList();
  onMounted(() => {
    if (route.query.id) {
      queryDetail();
    }
    // 新类型才需要查枚举
    if (isNewScoreType.value) {
      queryDictMap();
    }
  });

  onUnmounted(() => {
    if (sessionStorage.getItem('taskConfigSearchInfo'))
      sessionStorage.removeItem('taskConfigSearchInfo');
  });
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }
  .form-save {
    text-align: center;
  }
  .el-select {
    width: 400px !important;
  }
</style>
