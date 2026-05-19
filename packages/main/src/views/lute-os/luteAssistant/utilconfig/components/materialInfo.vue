<template>
  <div class="card card-flush">
    <div class="card-body px-20 py-15">
      <div class="mb-15"><h3>效率工具</h3></div>
      <el-space class="align-items-center gap-7">
        <el-form-item label="类型">
          <el-select
            v-model="form!.scene"
            placeholder="请选择类型"
            @change="getModelList"
            style="width: 180px"
            disabled
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
          <el-select v-model="form!.model" placeholder="请选择板块" style="width: 180px">
            <el-option
              v-for="item in form!.modelList"
              :key="item.model"
              :label="item.desc"
              :value="item.model!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="0">
          <span class="text-primary cursor-pointer" @click="modelVisible = true">新增板块</span>
        </el-form-item>
      </el-space>
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form!.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="工具类型" prop="type">
        <el-radio-group v-model="form!.type" @change="handleTypeChange">
          <el-radio v-for="item in [MaterialType.图片]" :key="item" :value="item">
            {{ MaterialType[item] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form!.type === MaterialType.图片">
        <el-form-item prop="url">
          <KeenImageUpload v-model="form!.url" directory="station/product" tooltip="更改工具图片" />
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-radio-group v-model="form!.linkType">
            <el-radio :value="2">新开标签页</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跳转链接" prop="linkUrl">
          <el-input v-model="form!.linkUrl" placeholder="请输入跳转链接" />
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
      <el-form-item class="tag-label" label="标签" prop="tag">
        <el-table :show-header="false" :data="form!.tag">
          <el-table-column width="205" label="标签名称">
            <template #default="scope">
              <el-form-item :prop="`tag[${scope.$index}]`">
                <el-input v-model="form.tag[scope.$index]" placeholder="请输入标签" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template #default="scope">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '新增',
                    key: 'add',
                    type: 'primary',
                    text: true,
                  },
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'danger',
                    text: true,
                    payload: scope,
                    hide: scope.$index === 0,
                  },
                ]"
                @click="handleTagActions"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form!.sort"
          :precision="0"
          :controls="false"
          placeholder="请输入数字"
          class="w-100px text-start-input-number"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-radio-group v-model="form!.status">
          <el-radio
            v-for="item in [MaterialStatus.开启, MaterialStatus.关闭]"
            :key="item"
            :value="item"
          >
            {{ MaterialStatus[item] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="首页推荐">
        <el-checkbox
          v-model="form!.extraInfo.homeRecommend"
          :true-value="1"
          :false-value="0"
          class="text-start-input-number"
        />
      </el-form-item>
      <el-form-item label="提供者">
        <el-input v-model="form!.extraInfo.provider" placeholder="请输入提供者" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form!.remarks" placeholder="请输入备注" />
      </el-form-item>
    </div>
  </div>
  <AddModel
    v-if="modelVisible"
    :visible="modelVisible"
    @close="handleModelClose"
    :scene="form.scene"
  />
</template>

<script lang="ts" setup>
  import { CommonContracts } from '@/api/index';
  import { MaterialStatus, MaterialType, MaterialDict } from '@/types/api';
  import { LuteMaterialModelBean } from '@/api/common/data-contracts';
  import AddModel from '../Modal/addModel.vue';

  const form = inject<
    CommonContracts.LuteMaterialSaveReq & {
      sceneList: MaterialDict[];
      modelList: LuteMaterialModelBean[];
    }
  >('form');
  const refreshModel = inject<Function>('refreshModel');

  const modelVisible = ref<boolean>(false);
  const handleModelClose = (reload = false) => {
    if (reload) {
      getModelList();
    }
    modelVisible.value = false;
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
    refreshModel?.();
  };

  const handleTagActions = (action) => {
    if (action.key === 'add') {
      form.tag.push('');
    } else if (action.key === 'delete') {
      form.tag.splice(action.payload.$index, 1);
    }
  };
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
