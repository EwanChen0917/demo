<template>
  <LuteModal
    v-model:visible="props.visible"
    :title="title"
    width="50%"
    @close="handleClose"
    @save="submitFn"
  >
    <template #body>
      <LuteForm :model="form" :rules="rules" ref="eleFormRef">
        <LuteFormItem label="红人名称" @click.stop="eventFn">
          <LuteInput v-model="form.channelAccount" type="text" inputStyle="solid" disabled />
        </LuteFormItem>

        <LuteFormItem label="红人账号">
          <template v-for="(item, index) in form.channelList" :key="index">
            <LuteInput v-model="item.channelAccount" type="text" inputStyle="solid" disabled />
          </template>
        </LuteFormItem>

        <LuteFormItem label="红人类型" prop="featureCodeList" required @click.stop="eventFn">
          <el-select
            style="width: 400px"
            v-model="form.featureCodeList"
            placeholder="请选择红人类型"
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option
              v-for="item in codeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </LuteFormItem>

        <LuteFormItem label="红人标签" prop="labelCodeList" @click.stop="eventFn">
          <el-cascader
            v-model="form.labelCodeList"
            :props="labelProps"
            placeholder="请选择红人标签"
            clearable
            collapse-tags
            collapse-tags-tooltip
            style="width: 400px"
          />
        </LuteFormItem>

        <LuteFormItem label="红人邮箱" @click.stop="eventFn">
          <LuteInput
            v-model="form.email"
            type="text"
            placeholder="请输入红人邮箱"
            inputStyle="solid"
            clearable
          />
        </LuteFormItem>

        <LuteFormItem label="联系方式" @click.stop="eventFn">
          <LuteInput
            v-model="form.contact"
            type="text"
            placeholder="请输入联系方式"
            inputStyle="solid"
            clearable
          />
        </LuteFormItem>

        <LuteFormItem label="粉丝数量">
          <el-table :data="form.channelList" size="small" class="w-400px">
            <el-table-column label="平台" prop="channelCode" />
            <el-table-column label="粉丝数">
              <template #default="{ row }">
                <el-input v-model="row.fansNum" />
              </template>
            </el-table-column>
          </el-table>
          <!--          <el-form-item
                      v-for="(item, index) in form.channelList"
                      :lable="item.channelCode + '：'"
                      :key="index"
                    >
                      <span>{{ item.channelCode }}：</span>
                      <LuteInput v-model="item.fansNum" inputStyle="solid" clearable />
                    </el-form-item>-->
        </LuteFormItem>

        <LuteFormItem label="通讯地址" @click.stop="eventFn">
          <LuteInput
            v-model="form.address"
            type="text"
            placeholder="请输入通讯地址"
            inputStyle="solid"
            clearable
          />
        </LuteFormItem>

        <LuteFormItem label="国家" @click.stop="eventFn">
          <LuteSelect
            :isValidate="false"
            :options="countryOptions"
            placeholder="请选择国家"
            v-model="form.country"
            select-style="solid"
            clearable
            filterable
            collapse-tags
            collapse-tags-tooltip
            width="400px"
          />
        </LuteFormItem>

        <LuteFormItem label="日常size" @click.stop="eventFn">
          <LuteInput
            v-model="form.dailySize"
            type="text"
            placeholder="请输入日常size"
            inputStyle="solid"
            clearable
          />
        </LuteFormItem>

        <LuteFormItem label="备注" @click.stop="eventFn">
          <div v-if="form.remarks && form.remarks?.length">
            <div
              class="d-flex mb-5"
              v-for="(item, index) in form.remarks"
              :key="item.userRemarkCode"
            >
              <LuteInput
                v-model="item.remark"
                type="text"
                placeholder="请输入备注"
                inputStyle="solid"
                clearable
              />
              <el-space>
                <el-link
                  v-if="index === 0"
                  :underline="false"
                  type="primary"
                  size="small"
                  @click="addRemark"
                >
                  添加
                </el-link>
                <el-link type="danger" :underline="false" size="small" @click="delRemark(index)">
                  删除
                </el-link>
              </el-space>
            </div>
          </div>
          <el-input
            style="width: 400px"
            v-else
            v-model="form.remarks[0]"
            placeholder="请输入备注"
            clearable
          />
        </LuteFormItem>
      </LuteForm>
    </template>
  </LuteModal>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { queryUserListParam, queryLabelList, saveUserInfo } from '@/apis/favourProject';
  import { cloneDeep, fromPairs } from 'lodash-es';
  import LuteSelect from '@/packages/select';
  import LuteInput from '@/packages/input';
  import { LuteForm, LuteFormItem } from 'lute_quark';
  import LuteModal from '@/packages/modal';
  import { metaApi, platformApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title?: string;
      info: any;
    }>(),
    {
      visible: false,
      title: '提示',
    }
  );

  const state = reactive<{
    form: any;
    enterFlag: boolean;
    leaveFlag: boolean;
    rules: any;
    codeOptions: optionItf[];
    countryOptions: optionItf[];
    labelCodeOptions: optionItf[];
  }>({
    form: {
      name: '',
      desc: '',
      channel: '',
      siteCode: '',
      featureCodeList: '',
      remarks: [],
      labelCodeList: [],
    },
    enterFlag: false,
    leaveFlag: false,
    rules: {},
    codeOptions: [],
    countryOptions: [],
    labelCodeOptions: [],
  });

  const { form, enterFlag, leaveFlag, rules, codeOptions, countryOptions, labelCodeOptions } =
    toRefs(state);

  form.value = { ...props.info };

  if (form.value.featureList?.length > 0) {
    form.value.featureCodeList = form.value.featureList[0].featureCode;
  } else {
    form.value.featureCodeList = '';
  }
  if (form.value.labelList?.length > 0) {
    const list: any = [];
    form.value.labelList.forEach((item: any) => {
      if (item.childInfoList?.length > 0) {
        item.childInfoList?.map((child: any) => list.push([item.labelCode, child.labelCode]));
      } else {
        list.push([item.labelCode]);
      }
      // list.push([item.labelCode, item.childInfoList?.]);
    });
    form.value.labelCodeList = list;
  } else {
    form.value.labelCodeList = [];
  }
  if (!form.value.remarks || form.value.remarks.length === 0) {
    form.value.remarks = [
      {
        remark: '',
      },
    ];
  }

  if (props.info.channelList?.length > 0) {
    form.value.channelList = cloneDeep(props.info.channelList);
  }

  const labelProps = {
    lazy: true,
    multiple: true,
    async lazyLoad(node, resolve) {
      const { level, value } = node;
      const res = await metaApi.luteosMetaQueryLabelList({
        pageNum: 1,
        pageSize: 500,
        module: 'meta',
        labelCode: value,
      });
      const nodes = res?.labelInfoList?.map((item) => ({
        value: item.labelCode,
        label: item.name,
        leaf: level >= 1,
      }));
      resolve(nodes);
    },
  };

  const addClass = () => {
    setTimeout(() => {
      enterFlag.value = true;
    }, 0);
  };
  addClass();

  const dealRes = (arr: any) => {
    const result: any = [];
    if (arr.length <= 0) return [];
    arr.map((item: any) => {
      result.push({ label: `${item.value}`, value: `${item.key}` });
    });
    return result;
  };
  queryUserListParam().then((res) => {
    if (res.code == 200) {
      countryOptions.value = dealRes(res.result.countryList);
      codeOptions.value = dealRes(res.result.featureList);
    }
  });

  const eventFn = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  rules.value = {
    featureCodeList: { required: true, message: '请选择红人类型', trigger: ['blur', 'change'] },
    labelCodeList: { required: true, message: '请选择红人标签', trigger: ['blur', 'change'] },
    siteCode: { required: true, message: '请输入站点code', trigger: ['blur', 'change'] },
  };

  const eleFormRef = ref();
  const submitFn = () => {
    form.value.remarks = form.value.remarks.filter((item) => item.remark);
    eleFormRef.value.validate().then(() => {
      const data = { ...form.value };
      if (!form.value.featureCodeList) {
        data.featureCodeList = [];
      } else {
        data.featureCodeList = [form.value.featureCodeList];
      }
      data.labelCodeList = form.value.labelCodeList?.map((item) => item[1]);
      data.dailySizeUpdateTime = null;
      saveUserInfo(data).then((res) => {
        if (res.code == 200) {
          ElMessage.success('修改信息成功！');
          emit('closeModal', 'reload');
        }
      });
    });
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    leaveFlag.value = true;
    setTimeout(() => {
      emit('closeModal');
    }, 100);
  };

  const delRemark = (index) => {
    if (form.value.remarks.length === 1) {
      form.value.remarks[0].remark = '';
    } else {
      form.value.remarks.splice(index, 1);
    }
  };

  const addRemark = () => {
    form.value.remarks.push({
      remark: '',
    });
  };
</script>

<style lang="scss" scoped>
  .wid_650 {
    width: 650px;
  }

  .els_select {
    ::v-deep(.el-input__wrapper) {
      border-color: var(--bs-gray-100);
      color: var(--bs-gray-700);
      transition: color 0.2s ease;
      display: inline-flex;
      width: 100%;
      padding: 0.715rem 1rem;
      font-size: 1.1rem;
      font-weight: 500;
      line-height: 1.5;
      color: var(--bs-gray-700);
      background-color: #f9f9f9;
      background-clip: padding-box;
      border: 1px solid var(--bs-gray-300);
      appearance: none;
      border-radius: 0.475rem;
      height: 40px !important;
      border: 1px solid var(--bs-gray-300) !important;
      box-shadow: none;
    }

    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
      font-size: 1.1rem;
    }
  }
</style>
