<template>
  <div class="card card-flush">
    <div class="card-body px-20 py-15">
      <div class="mb-15"><h3>默认（英语）</h3></div>
      <el-space class="align-items-center gap-7">
        <el-form-item label="类型" prop="scene" required>
          <el-select
            v-model="form!.scene"
            placeholder="请选择类型"
            @change="getModelList"
            style="width: 180px"
            filterable
          >
            <el-option
              v-for="item in form!.sceneList"
              :key="item.key"
              :label="item.value"
              :value="item.key!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" prop="model">
          <el-select
            v-model="form!.model"
            placeholder="请选择板块"
            style="width: 180px"
            filterable
            clearable
          >
            <el-option
              v-for="item in form!.modelList"
              :key="item.model"
              :label="item.desc"
              :value="item.model!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0">
          <span class="text-success cursor-pointer" @click="visible = true">新增类型</span>
        </el-form-item>
        <el-form-item label-width="0" v-if="form.scene">
          <span class="text-success cursor-pointer" @click="modelVisible = true">新增板块</span>
        </el-form-item>
      </el-space>
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form!.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="素材类型" prop="type">
        <el-radio-group v-model="form!.type" @change="handleTypeChange">
          <el-radio
            v-for="item in [MaterialType.图片, MaterialType.视频]"
            :key="item"
            :label="item"
            :disabled="form.scene === 'data_market' && item === MaterialType.视频"
          >
            {{ MaterialType[item] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form!.type === MaterialType.图片">
        <el-form-item prop="url">
          <KeenImageUpload v-model="form!.url" directory="station/product" tooltip="更改素材图片" />
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-radio-group v-model="form!.linkType">
            <el-radio :label="2">新开标签页</el-radio>
            <el-radio :label="1">页内跳转</el-radio>
            <el-radio :label="3">下载</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跳转链接" prop="linkUrl">
          <el-input v-model="form!.linkUrl" placeholder="请输入跳转链接" />
        </el-form-item>
      </template>
      <template v-else-if="form!.type === MaterialType.视频">
        <el-form-item label="视频地址" prop="url">
          <el-input v-model="form!.url" placeholder="请输入视频地址" />
        </el-form-item>
      </template>
      <el-form-item label="内容" prop="desc">
        <el-input
          v-model="form!.desc"
          type="textarea"
          show-word-limit
          maxlength="500"
          placeholder="请输入内容"
        />
      </el-form-item>
      <!-- 数据集市才展示 -->
      <template v-if="form.scene === 'data_market'">
        <el-form-item label="数据标签" prop="tagCodeList">
          <el-select
            v-model="form!.tagCodeList"
            :options="tagCodeList"

            :props ="{
              label: 'name',
              value: 'labelCode',
            }"
            placeholder="请选择数据标签"
            clearable
            filterable
            multiple
          />
          <span class="text-primary cursor-pointer add-tag" @click="tagVisible = true">
            新增标签
          </span>
        </el-form-item>

        <el-form-item label="数据权限" prop="authTag" required>
          <el-radio-group v-model="form!.authTag">
            <el-radio :label="1">普通数据</el-radio>
            <el-radio :label="2">高级数据</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>

      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form!.sort"
          :precision="0"
          :controls="false"
          placeholder="请输入数字"
          class="w-100px text-start-input-number"
        />
      </el-form-item>
      <el-form-item label="显示时间" required>
        <KeenFlex :fluids="2">
          <template #fluid-item="{ idx }">
            <el-form-item v-if="idx === 0" prop="startTime">
              <el-date-picker
                v-model="form!.startTime"
                placeholder="开始时间"
                :disabled-date="
                  (date) =>
                    dayjs(date).isBefore(dayjs(), 'date') ||
                    (form?.endTime ? !dayjs(date).isBefore(dayjs(form.endTime), 'date') : false)
                "
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                :popper-options="{ placement: 'bottom-start' }"
              />
            </el-form-item>
            <el-form-item v-if="idx === 1" prop="endTime">
              <el-date-picker
                v-if="idx === 1"
                v-model="form!.endTime"
                :disabled-date="
                  (date) =>
                    dayjs(date).isBefore(dayjs(), 'date') || form?.startTime
                      ? !dayjs(date).isAfter(dayjs(form?.startTime), 'date')
                      : false
                "
                placeholder="结束时间"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                :popper-options="{ placement: 'bottom-start' }"
              />
            </el-form-item>
          </template>
        </KeenFlex>
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-radio-group v-model="form!.status">
          <el-radio
            v-for="item in [MaterialStatus.开启, MaterialStatus.关闭]"
            :key="item"
            :label="item"
          >
            {{ MaterialStatus[item] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </div>
  <AddScene v-if="visible" :visible="visible" @close="handleClose" />
  <AddModel
    v-if="modelVisible"
    :visible="modelVisible"
    @close="handleModelClose"
    :scene="form.scene"
  />
  <AddTag v-if="tagVisible" :visible="tagVisible" @close="handleTagClose" />
</template>

<script lang="ts" setup>
  import { platformApi, CommonContracts } from '@/api/index';
  import { MaterialStatus, MaterialType, MaterialDict } from '@/types/api';
  import dayjs from 'dayjs';
  import AddScene from '@/views/applymarket/appmaterial/materialdetail/Modal/addScene.vue';
  import AddModel from '@/views/applymarket/appmaterial/materialdetail/Modal/addModel.vue';
  import AddTag from '@/views/applymarket/appmaterial/materialdetail/Modal/addTag.vue';
  import { LuteMaterialModelBean } from '@/api/common/data-contracts';

  const form = inject<
    CommonContracts.LuteMaterialSaveReq & {
      sceneList: MaterialDict[];
      modelList: LuteMaterialModelBean[];
    }
  >('form');
  const refreshScene = inject('refreshScene');
  const refreshModel = inject('refreshModel');

  const visible = ref<boolean>(false);
  const modelVisible = ref<boolean>(false);
  const handleClose = async (reload = false) => {
    if (reload) {
      refreshScene();
    }
    visible.value = false;
  };
  const handleModelClose = (reload = false) => {
    if (reload) {
      getModelList();
    }
    modelVisible.value = false;
  };

  const tagCodeList = ref([]);
  const tagVisible = ref<boolean>(false);
  const handleTagClose = (reload = false) => {
    if (reload) {
      getTagList();
    }
    tagVisible.value = false;
  };

  const handleTypeChange = (type) => {
    if (type === MaterialType.视频) {
      Object.assign(form!, {
        url: '',
        materialList: form!.materialList?.map((item) => ({ ...item, url: '' })),
      });
    }
  };

  // const modelList = ref<LuteMaterialModelBean[]>([]);
  const getModelList = async () => {
    if (form?.scene === 'data_market') {
      form.type = MaterialType.图片;
    }
    refreshModel();
  };

  const getTagList = () => {
    platformApi
      .platformLabelQueryLabelList({
        module: 'data_market',
        pageNum: 1,
        pageSize: 500,
        status: 1,
      })
      .then((res) => {
        tagCodeList.value = res.labelInfoList || [];
      });
  };
  getTagList();
</script>

<style lang="scss" scoped>
  .text-start-input-number {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
  .add-tag {
    margin-left: 20px;
  }
</style>
