<template>
  <div class="agency-page">
    <!-- {{ form.partnerData.length }} -->
    <div style="text-align: right; margin-bottom: 20px">
      <el-button type="primary" @click="updateVideoData()">更新所有数据</el-button>
    </div>
    <div v-for="(item, index) in form.partnerData" :key="index" style="position: relative">
      <div
        style="position: absolute; right: 20px; top: 20px; color: var(--bs-gray-500)"
        v-if="item.partnerDataCode"
      >
        上次更新时间：{{ item.updateTime || '-' }}
      </div>
      <el-form
        :model="item"
        :ref="setRef"
        :rules="rules"
        class="form-data"
        label-width="160px"
        label-position="left"
        scroll-to-error
      >
        <div class="form-border">
          <el-row>
            <el-col :span="8">
              <el-form-item label="上线平台：" prop="channelCode">
                <el-select v-model="item.channelCode">
                  <el-option
                    v-for="channel in channelList"
                    :key="channel.channelCode"
                    :label="channel.name"
                    :value="channel.channelCode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="视频发布日期：" prop="videoReleaseDateStr">
                <el-date-picker
                  style="width: 100%"
                  v-model="item.videoReleaseDateStr"
                  type="date"
                  placeholder="请选择"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item
                label="视频链接："
                prop="videoUrl"
                :rules="[
                  {
                    required: true,
                    message: '请输入视频链接',
                    trigger: ['blur'],
                  },
                  {
                    pattern: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,6})(\/[^\s]*)?$/,
                    message: '视频链接不合法',
                    trigger: ['blur'],
                  },
                ]"
              >
                <el-input v-model="item.videoUrl" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="点赞量："
                :prop="`partnerData[${index}]videoClickNum`"
                :rules="[
                  {
                    pattern: /^[0-9]\d*$/,
                    message: '请输入大于0的整数',
                    trigger: ['blur'],
                  },
                ]"
              >
                <el-input v-model="item.videoClickNum" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="视频类型："
                prop="videoType"
                :rules="[
                  {
                    required: true,
                    message: '请选择视频类型',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-select v-model="item.videoType">
                  <el-option
                    v-for="type in dictMap?.video_type"
                    :key="type.value"
                    :label="type.desc"
                    :value="parseInt(type.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="转发量："
                :prop="`partnerData[${index}].videoForwardNum`"
                :rules="[
                  {
                    pattern: /^[0-9]\d*$/,
                    message: '请输入大于0的整数',
                    trigger: ['blur'],
                  },
                ]"
              >
                <el-input v-model="item.videoForwardNum" />
              </el-form-item>
            </el-col>
            <el-col :span="8" style="position: relative">
              <el-form-item
                label="评论量："
                :prop="`partnerData[${index}].videoCommentNum`"
                :rules="[
                  {
                    pattern: /^[0-9]\d*$/,
                    message: '请输入大于0的整数',
                    trigger: ['blur'],
                  },
                ]"
              >
                <el-input v-model="item.videoCommentNum" />
              </el-form-item>
              <el-button
                style="position: absolute; top: 0; right: -140px"
                type="primary"
                plain
                v-if="item.partnerDataCode"
                :loading="updateLoading"
                @click="updateVideoData(item.partnerDataCode)"
              >
                更新视频数据
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="播放量："
                :prop="`partnerData[${index}].videoLookNum`"
                :rules="[
                  { pattern: /^[0-9]\d*$/, message: '请输入大于0的整数', trigger: ['blur'] },
                ]"
              >
                <el-input v-model="item.videoLookNum" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="曝光量区间：">
                <el-input v-model="item.exposureRange" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="互动率：">
                <el-input v-model="item.videoInteractRate" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="互动率区间：">
                <el-input v-model="item.interactRateRange" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="曝光量评级：">
                <el-input v-model="item.exposureLevel" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="互动率评级：">
                <el-input v-model="item.interactRateLevel" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <!--          <div class="form-flex">
                      <el-form-item label="视频互动率：" prop="videoInteractNum">
                        <el-input v-model="item.videoInteractNum" disabled />
                      </el-form-item>
                    </div>-->
          <el-row>
            <el-col :span="8">
              <el-form-item label="授权状态：" prop="authorization">
                <el-select
                  v-model="item.authorization"
                  @change="authorizationChange(item)"
                  clearable
                >
                  <el-option label="未授权" :value="0" />
                  <el-option label="免费授权" :value="2" />
                  <el-option label="付费授权" :value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="授权范围："
                :prop="`partnerData[${index}].videoLookNum`"
                :rules="[
                  { pattern: /^[0-9]\d*$/, message: '请输入大于0的整数', trigger: ['blur'] },
                ]"
              >
                <el-select v-model="item.authorizationArea" :disabled="item.authorization === 0">
                  <el-option
                    v-for="type in item.authorization === 2
                      ? dictMap?.authorization_area_2
                      : dictMap?.authorization_area_3"
                    :key="type.value"
                    :label="type.desc"
                    :value="parseInt(type.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="授权时间：" prop="authorizationDate">
                <el-select v-model="item.authorizationDate" :disabled="item.authorization === 0">
                  <el-option
                    v-for="type in dictMap?.authorization_date"
                    :key="type.value"
                    :label="type.desc"
                    :value="parseInt(type.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="视频语种" prop="videoLanguage">
                <el-select v-model="item.videoLanguage">
                  <el-option
                    v-for="type in dictMap?.video_language"
                    :key="type.value"
                    :label="type.desc"
                    :value="type.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="flex-right">
            <div>
              <el-button type="primary" @click="save(index)">提交</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="form-save">
      <el-button type="primary" @click="addData">添加</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { metaApi, MetaApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = defineProps<{
    partnerDataList: Array<any>;
  }>();
  const emit = defineEmits<{
    (event: 'refresh', reload?: boolean): void;
    (event: 'save', channelList: Array<string>): void;
  }>();

  const route = useRoute();
  const partnerData = {
    videoClickNum: '',
    videoType: '',
    videoCommentNum: '',
    videoForwardNum: '',
    videoInteractNum: '',
    videoLookNum: '',
    exposureRange: '',
    videoInteractRate: '',
    interactRateRange: '',
    authorization: '',
    videoUrl: '',
    channelCode: '',
    videoLanguage: '',
    exposureLevel: '',
    interactRateLevel: '',
  };

  const form: any = reactive<MetaApi.LuteosMetaOperateMetaProject.RequestBody>({
    partnerData: [],
  });

  const formRefs = ref([]);
  const setRef = (el) => {
    if (el) {
      formRefs.value.push(el);
    }
  };

  const rules = reactive({
    channelCode: [{ required: true, message: '请选择上线平台', trigger: 'change' }],
    videoReleaseDateStr: [{ required: true, message: '请选择视频发布日期', trigger: 'change' }],
  });

  const channelList = ref([]);
  const queryChannelList = async () => {
    const res = await metaApi.luteosMetaQueryChannelList({
      pageNum: 1,
      pageSize: 100,
    });
    channelList.value = res.channelList || [];
  };
  queryChannelList();

  const dictMap = ref({});
  const queryOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: [
        'video_type',
        'authorization_date',
        'authorization_area_2',
        'authorization_area_3',
        'video_language',
      ],
    });
    dictMap.value = res?.dictMap;
  };
  queryOptions();

  const addData = () => {
    form.partnerData.push({ ...partnerData });
    resetForms();
  };

  const resetForms = () => {
    formRefs.value = [];
  };

  const saveLoading = ref(false);
  const save = (index) => {
    formRefs.value[index].validate((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        const data: any = {
          operateType: 2,
          projectCode: route.query.projectCode,
          partnerData: form.partnerData[index],
        };
        metaApi
          .luteosMetaOperateMetaProject(data)
          .then(() => {
            ElMessage.success('提交成功');
            const channels = form.partnerData.map((item) => item.channelCode);
            emit('save', channels);
          })
          .finally(() => {
            saveLoading.value = false;
          });
      }
    });
  };
  watch(
    () => props.partnerDataList,
    (val) => {
      if (val && val.length) {
        form.partnerData = val;
      } else {
        form.partnerData.push({ ...partnerData });
      }
    },
    { immediate: true }
  );

  const authorizationChange = (item) => {
    item.authorizationArea = '';
    item.authorizationDate = '';
  };

  const updateLoading = ref(false);
  const updateVideoData = async (partnerDataCode = '') => {
    updateLoading.value = true;
    const res = await metaApi
      .luteosMetaRefreshMetaPartnerVideo({
        projectCode: route.query.projectCode as string,
        partnerDataCode,
      })
      .finally(() => {
        updateLoading.value = false;
      });
    ElMessage.success('更新成功');
    emit('refresh', true);
  };
</script>

<style scoped lang="scss">
  .agency-page {
    background: #ffffff;
    padding: 40px;
  }

  .form-flex {
    display: flex;
  }

  .form-border {
    width: 100%;
    padding: 20px;
    border: 1px dashed #ddd;
    margin-bottom: 20px;
  }

  .flex-right {
    display: flex;
    justify-content: flex-end;
  }
</style>
