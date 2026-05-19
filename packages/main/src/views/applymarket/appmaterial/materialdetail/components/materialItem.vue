<template>
  <div v-if="form?.materialList?.[idx]">
    <div class="">
      <h3>{{ lang }}</h3>
    </div>
    <div class="d-flex align-items-start gap-10 gap-lg-20">
      <div>
        <el-form-item
          v-if="form!.type === MaterialType.图片"
          :prop="['materialList', `${idx}`, 'url']"
        >
          <KeenImageUpload
            v-model="form.materialList[idx].url"
            directory="station/product"
            tooltip="更改素材图片"
          />
        </el-form-item>
      </div>
      <div class="flex-row-fluid">
        <el-form-item
          label="标题"
          :prop="['materialList', `${idx}`, 'title']"
          :rules="[
            {
              max: 255,
              message: '标题长度不能超过255',
            },
          ]"
        >
          <el-input v-model="form.materialList[idx].title" placeholder="请输入标题" />
        </el-form-item>
        <template v-if="form!.type === MaterialType.图片">
          <el-form-item label="跳转类型">
            <el-radio-group v-model="form.materialList[idx].linkType">
              <el-radio :label="2">新开标签页</el-radio>
              <el-radio :label="1">页内跳转</el-radio>
              <el-radio :label="3">下载</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="跳转链接"
            :prop="['materialList', `${idx}`, 'linkUrl']"
            :rules="[
              {
                max: 255,
                message: '跳转链接长度不能超过255',
              },
            ]"
          >
            <el-input v-model="form.materialList[idx].linkUrl" placeholder="请输入跳转链接" />
          </el-form-item>
        </template>
        <template v-else-if="form!.type === MaterialType.视频">
          <el-form-item
            label="视频地址"
            :prop="['materialList', `${idx}`, 'url']"
            :rules="[
              {
                max: 255,
                message: '视频地址长度不能超过255',
              },
            ]"
          >
            <el-input v-model="form.materialList[idx].url" placeholder="请输入视频地址" />
          </el-form-item>
        </template>
        <el-form-item
          label="内容"
          prop="desc"
          :rules="[
            {
              max: 500,
              message: '内容长度不能超过500',
            },
          ]"
        >
          <el-input
            v-model="form.materialList[idx].desc"
            type="textarea"
            maxlength="500"
            show-word-limit
            placeholder="请输入内容"
          />
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CommonContracts } from '@/api/index';
  import { MaterialType } from '@/types/api';

  defineProps<{
    idx: number;
    lang?: string;
  }>();

  const form = inject<CommonContracts.LuteMaterialSaveReq>('form');
  form.materialList.forEach((item) => {
    item.linkType = 2;
  });
</script>
