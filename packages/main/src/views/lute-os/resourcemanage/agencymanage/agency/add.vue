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
        label="资源名称"
        prop="agcName"
        :rules="[{ required: true, message: '请填写资源名称', trigger: 'blur' }]"
      >
        <el-input v-model="form.agcName" maxlength="300" />
      </el-form-item>
      <el-form-item
        label="简介"
        prop="intro"
        :rules="[{ required: true, message: '请填写简介', trigger: 'blur' }]"
      >
        <el-input v-model="form.intro" maxlength="2000" />
      </el-form-item>
      <el-form-item
        label="所属国家/地区"
        prop="cr"
        :rules="[{ required: true, message: '所属国家/地区不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.cr"
          placeholder="请选择"
          filterable
          remote
          reserve-keyword
          :remote-method="queryCountryList"
          remote-show-suffix
        >
          <el-option
            v-for="item in countryOptions"
            :key="item.countryCode"
            :label="item.countryName"
            :value="item.countryCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="资源分类"
        prop="secondCategoryCode"
        :rules="[{ required: true, message: '资源分类不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-cascader
          :options="categoryOptions"
          v-model="form.secondCategoryCode"
          clearable
          filterable
          :show-all-levels="true"
          placeholder="请选择资源分类"
          :props="{
            emitPath: false,
            expandTrigger: 'hover',
            multiple: false,
            checkStrictly: false,
            label: 'categoryName',
            value: 'categoryCode',
            children: 'children',
          }"
        />
      </el-form-item>
      <el-form-item
        label="资源标签"
        prop="tagsList"
        :rules="[{ required: true, message: '资源标签不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.tagsList" placeholder="请选择资源标签" multiple>
          <el-option
            v-for="item in labelOptions"
            :key="item.labelCode"
            :label="item.name"
            :value="item.labelCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="contactUsername"
        :rules="[{ required: true, message: '请填写联系人', trigger: 'blur' }]"
      >
        <el-input v-model="form.contactUsername" maxlength="2000" placeholder="联系人" />
      </el-form-item>
      <el-form-item prop="contactPhone">
        <el-input
          v-model="form.contactPhone"
          maxlength="2000"
          placeholder="联系方式（有多种请分别标注，例：手机号：12301121122，微信号：zhangsan123）"
        />
      </el-form-item>
      <el-form-item
        prop="contactEmail"
        :rules="[
          {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '请填写正确的邮箱格式',
            trigger: ['blur'],
          },
        ]"
      >
        <el-input v-model="form.contactEmail" maxlength="2000" placeholder="联系邮箱" />
      </el-form-item>
      <el-form-item label="添加文件" :inline-message="true" prop="">
        <KeenFileUpload
          class="packing-upload"
          v-model="form.attachments"
          directory="sop/template"
          @success="handleUploadSuc"
        >
          <el-button type="primary">选择文件</el-button>
        </KeenFileUpload>
      </el-form-item>
      <el-form-item
        label="资源链接"
        prop="resourceLink"
        :rules="[
          {
            pattern: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,6})(\/[^\s]*)?$/,
            message: '资源链接不合法',
            trigger: ['blur'],
          },
        ]"
      >
        <el-input v-model="form.resourceLink" maxlength="2000" />
      </el-form-item>
      <el-form-item label="补充说明" prop="extExplain">
        <el-input type="textarea" :rows="3" v-model="form.extExplain" maxlength="2000" />
      </el-form-item>
      <el-form-item label="过往合作事项" prop="historyContent">
        <el-input type="textarea" :rows="3" v-model="form.historyContent" maxlength="2000" />
      </el-form-item>
      <el-form-item label="报价评估" prop="valuation">
        <el-input type="textarea" :rows="3" v-model="form.valuation" maxlength="2000" />
      </el-form-item>
      <el-form-item label="专业度评估" prop="name">
        <el-rate v-model="form.professionalScore" allow-half />
        <span
          class="reset-txt"
          v-if="form.professionalScore"
          @click="resetRate('professionalScore')"
        >
          重置
        </span>
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.professionalScoreComment"
          maxlength="2000"
        />
      </el-form-item>
      <el-form-item label="服务响应评估" prop="name">
        <el-rate v-model="form.serviceScore" allow-half />
        <span class="reset-txt" v-if="form.serviceScore" @click="resetRate('serviceScore')">
          重置
        </span>
        <el-input type="textarea" :rows="3" v-model="form.serviceScoreComment" maxlength="2000" />
      </el-form-item>
      <el-form-item label="合作关系评估" prop="name">
        <el-rate v-model="form.cooperateScore" allow-half />
        <span class="reset-txt" v-if="form.cooperateScore" @click="resetRate('cooperateScore')">
          重置
        </span>
        <el-input type="textarea" :rows="3" v-model="form.cooperateScoreComment" maxlength="2000" />
      </el-form-item>
      <el-form-item label="人群画像评估" prop="crowdPortraitComment">
        <el-input type="textarea" :rows="3" v-model="form.crowdPortraitComment" maxlength="2000" />
      </el-form-item>
      <el-form-item label="其他合作建议" prop="suggest">
        <el-input type="textarea" :rows="3" v-model="form.suggest" maxlength="2000" />
      </el-form-item>
    </el-form>
    <div class="form-save">
      <el-button type="primary" :loading="saveLoading" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="agencyedit">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { metaApi, MetaApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { Setting } from '@element-plus/icons-vue';

  const router = useRouter();
  const route = useRoute();
  const searchInfo = sessionStorage.getItem('agencySearchInfo') ?? '{}';
  const goList = () => {
    // 详情页过来的直接返回
    if (route.query.code) {
      router.go(-1);
    } else {
      // 列表页过来的要返回去
      router.push({
        name: 'agencylist',
        params: {
          ...JSON.parse(searchInfo),
        },
      });
    }
  };
  onUnmounted(() => {
    if (sessionStorage.getItem('agencySearchInfo')) sessionStorage.removeItem('agencySearchInfo');
  });

  const formRef = ref();
  const form: any = reactive<MetaApi.LuteosMetaAgencySave.RequestBody>({
    agcName: '',
    resourceLink: '',
    intro: '',
    attachments: [],
    contactEmail: '',
    contactPhone: '',
    contactUsername: '',
    cooperateScore: '',
    cooperateScoreComment: '',
    cr: '',
    crowdPortraitComment: '',
    extExplain: '',
    firstCategoryCode: '',
    historyContent: '',
    professionalScore: '',
    professionalScoreComment: '',
    secondCategoryCode: '',
    serviceScore: '',
    serviceScoreComment: '',
    suggest: '',
    tagsList: [],
    valuation: '',
  });

  onMounted(async () => {
    if (route.query.code) {
      queryDetail();
    }
  });
  const tmpAttachments = ref([]);
  const queryDetail = () => {
    metaApi
      .luteosMetaAgencyInfo({
        code: route.query.code,
      })
      .then((res: any) => {
        form.agcName = res.agcName;
        form.intro = res.intro;
        form.contactEmail = res.contactEmail;
        form.contactPhone = res.contactPhone;
        form.contactUsername = res.contactUsername;
        form.cooperateScore = res.cooperateScore;
        form.cooperateScoreComment = res.cooperateScoreComment;
        form.cr = res.cr;
        form.crowdPortraitComment = res.crowdPortraitComment;
        form.extExplain = res.extExplain;
        form.secondCategoryCode = res.secondCategoryCode;
        form.historyContent = res.historyContent;
        form.professionalScore = res.professionalScore;
        form.professionalScoreComment = res.professionalScoreComment;
        form.serviceScore = res.serviceScore;
        form.serviceScoreComment = res.serviceScoreComment;
        form.suggest = res.suggest;
        form.tagsList = res.tags || [];
        form.agcId = res.agcId;
        form.valuation = res.valuation;
        form.agcCode = res.agcCode;
        form.resourceLink = res.resourceLink;

        if (res.attachments.length) {
          tmpAttachments.value = res.attachments;
          res.attachments.forEach((item: any) => {
            form.attachments.push({
              percentage: 100,
              fileName: item.fileName,
              filePath: item.filePath,
              fileId: item.fileId,
              name: item.fileName,
              status: 'success',
              ossKey: item.filePath.split('?')[0].split('aliyuncs.com/')[1],
            });
          });
        }
      });
  };
  const handleUploadSuc = () => {
    form.attachments[0].fileKey = form.attachments[0].ossKey;
    form.attachments[0].fileName = form.attachments[0].name;
  };

  const categoryOptions = ref([]);
  const getCategoryOptions = async (parentCategoryCode) => {
    const res: any = await metaApi.luteosMetaAgencyCategoryList({
      parentCategoryCode,
    });
    categoryOptions.value = res.list || [];
  };
  getCategoryOptions('');

  const countryOptions = ref([]);
  const queryCountryList = (keyWord) => {
    platformApi
      .platformCountryQueryCountryList({
        keyword: keyWord,
        pageNum: 1,
        pageSize: 100,
      })
      .then((res) => {
        if (+res.code === 200) {
          countryOptions.value = res.countryList;
        }
      });
  };
  queryCountryList('');

  const labelOptions = ref([]);
  const queryLabelList = () => {
    platformApi
      .platformLabelQueryLabelList({
        module: 'agency',
        pageNum: 1,
        pageSize: 100,
        status: 1,
      })
      .then((res) => {
        if (+res.code === 200) {
          labelOptions.value = res.labelInfoList;
        }
      });
  };
  queryLabelList();

  const resetRate = (key) => {
    form[key] = 0;
  };

  const saveLoading = ref(false);
  const save = () => {
    formRef.value.validate((isvalid) => {
      if (isvalid) {
        if (!form.contactPhone && !form.contactEmail) {
          ElMessage.error('联系方式和联系邮箱二选一填一个');
          return;
        }

        if (route.query.code) {
          // 文件id列表
          const fileIds = form.attachments.map((item) => item.fileId);
          // 要删除的文件id
          const deleteAttachmentsIds = [];

          // 获取要删除的文件id
          tmpAttachments.value.forEach((item) => {
            if (!fileIds.includes(item.fileId)) {
              deleteAttachmentsIds.push(item.fileId);
            }
          });

          // 更新上传的文件，如果没有改动就传空，只传有修改附件
          form.deleteAttachmentsIds = deleteAttachmentsIds;

          const attachments = [];
          form.attachments.forEach((item) => {
            if (!item.fileId) {
              attachments.push(item);
            }
          });

          form.attachments = attachments;
        }
        saveLoading.value = true;
        metaApi
          .luteosMetaAgencySave(form)
          .then((res) => {
            ElMessage.success('提交成功');
            goList();
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }

  .form-save {
    text-align: center;
  }

  .m-t-20 {
    margin-top: -15px;
  }

  .reset-txt {
    height: 30px;
    font-size: 10px;
    color: #3e97ff;
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
