<template>
  <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
    <div
      class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework h-100 bg_f9f9f9"
    >
      <div class="form d-flex flex-column flex-lg-row w-md-100">
        <div class="d-flex flex-column gap-7 gap-lg-10 w-xl-350px mb-7 me-lg-10">
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>红人信息</h2>
              </div>
            </div>
            <div class="card-body text-center pt-0">
              <div class="symbol symbol-100px symbol-circle mb-7">
                <img v-if="info.avatar" :src="info.avatar" alt="user" />
                <EleLetter
                  v-else
                  :styleObj="{ width: '100px', height: '100px' }"
                  :name="info.channelAccount"
                />
              </div>
              <el-tooltip
                placement="top"
                effect="light"
                popper-class="action_tool_tip"
                :content="info.channelAccount"
                :disabled="info.channelAccount?.length < 20"
              >
                <div class="fs-3 text-gray-800 fw-bold mb-1 name_txt">
                  {{ info.channelAccount }}
                  <i
                    class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                    @click="copyFn(info.channelAccount, '红人名称')"
                  ></i>
                </div>
              </el-tooltip>
              <div class="fs-5 link-primary mb-1 name_txt" v-if="info.email">
                {{ info.email }}
                <i
                  class="fas ms-2 fs-7 fa-copy text-hover-primary cursor-pointer"
                  @click="copyFn(info.email, '红人邮箱')"
                ></i>
              </div>
            </div>
          </div>
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>折扣码状态</h2>
              </div>
              <div class="card-toolbar">
                <div
                  class="rounded-circle w-15px h-15px"
                  :class="
                    form.status == 1
                      ? 'bg-primary'
                      : form.status == 2
                      ? 'bg-success'
                      : form.status == 3
                      ? 'bg-info'
                      : form.status == 4
                      ? 'bg-danger'
                      : 'bg-primary'
                  "
                ></div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="status_scheduled common_status" v-if="!form.status || form.status == 1">
                <span class="scale_txt">待生效</span>
              </div>
              <div class="status_completed2 common_status" v-if="form.status == 2">
                <span class="scale_txt">已生效</span>
              </div>
              <div class="status_potent common_status" v-if="form.status == 3">
                <span class="scale_txt">已结束</span>
              </div>
              <div class="status_cancel common_status" v-if="form.status == 4">
                <span class="scale_txt">已取消</span>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div class="tab-content">
            <div class="tab-pane fade show active">
              <div class="d-flex flex-column gap-7 gap-lg-10">
                <div class="card card-flush py-4">
                  <div class="card-header" style="align-items: center">
                    <div class="card-title">
                      <h2>
                        {{
                          !rowData.fromType
                            ? '添加信息'
                            : rowData.fromType === 'view'
                            ? '查看信息'
                            : '编辑信息'
                        }}
                      </h2>
                    </div>
                  </div>
                  <div class="card-body pt-0">
                    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
                      <el-form-item
                        label="取消原因"
                        prop="comment"
                        v-if="
                          rowData.fromType == 'cancel' ||
                          (form.comment && rowData.fromType == 'view')
                        "
                      >
                        <el-input
                          v-model="form.comment"
                          placeholder="请输入取消原因"
                          :disabled="rowData.fromType == 'view'"
                        />
                      </el-form-item>

                      <el-form-item label="红人名称">
                        <el-input v-model="info.channelAccount" disabled />
                      </el-form-item>

                      <el-form-item label="渠道名称" prop="channelCode">
                        <el-select
                          v-model="form.channelCode"
                          clearable
                          filterable
                          placeholder="请选择渠道"
                          @change="channelChange"
                          :disabled="['cancel', 'delay', 'view'].includes(rowData.fromType)"
                        >
                          <el-option
                            v-for="item in channelList"
                            :key="item.channelCode"
                            :label="item.name"
                            :value="item.channelCode"
                          />
                        </el-select>
                      </el-form-item>

                      <el-form-item label="渠道账号" prop="channelAccount">
                        <el-input
                          v-model="form.channelAccount"
                          placeholder="选择渠道自动生成"
                          disabled
                        />
                      </el-form-item>

                      <el-form-item label="红人链接" prop="channelHome">
                        <el-input
                          v-model="form.channelHome"
                          placeholder="选择渠道自动生成；若系统无法自动生成，请手动填写"
                        />
                      </el-form-item>

                      <div
                        v-for="(mark, index) in form.saveMarkInfoList"
                        :key="index"
                        class="mark-info"
                      >
                        <el-form-item
                          label="品线"
                          :prop="`saveMarkInfoList[${index}].productLineCodeList`"
                          :rules="{ required: true, message: '请选择品线', trigger: ['blur'] }"
                        >
                          <el-select
                            v-model="mark.productLineCodeList"
                            clearable
                            filterable
                            placeholder="请选择品线"
                            @change="
                              () => {
                                mark.productCode = [];
                                productRemoteMethod(mark.productLineCodeList, mark);
                              }
                            "
                          >
                            <el-option
                              v-for="item in lineCodeList"
                              :key="item.code"
                              :label="item.productLine"
                              :value="item.code"
                            />
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label="合作产品"
                          :prop="`saveMarkInfoList[${index}].productCode`"
                          :rules="{ required: true, message: '请选择合作产品', trigger: ['blur'] }"
                        >
                          <el-select
                            v-model="mark.productCode"
                            placeholder="请选择合作产品"
                            clearable
                            filterable
                            multiple
                            :collapse-tags="mark.productCode?.length > 3"
                            @change="
                              (val) => {
                                setProductObjectData(val, mark);
                                handleProductCodeChange(val, mark.siteCode, mark);
                              }
                            "
                          >
                            <el-option
                              v-for="item in mark.productList"
                              :key="item.productCode"
                              :label="item.productFormatName"
                              :value="item.productCode"
                            />
                          </el-select>
                        </el-form-item>

                        <el-form-item
                          label="站点"
                          :prop="`saveMarkInfoList[${index}].siteCode`"
                          :rules="{ required: true, message: '请选择站点', trigger: ['blur'] }"
                        >
                          <el-select
                            v-model="mark.siteCode"
                            clearable
                            multiple
                            filterable
                            placeholder="请选择合作站点"
                            @change="
                              (val) => {
                                siteCodeChange(val);
                                handleSiteCodeChange(val, mark.productCode, mark);
                              }
                            "
                          >
                            <el-option
                              v-for="item in siteCodeList"
                              :key="item.siteCode"
                              :label="item.siteName"
                              :value="item.siteCode"
                            />
                          </el-select>
                        </el-form-item>
                        <!-- TODO: 10 添加运营人员下拉选项，必填-->
                        <el-form-item
                          label="运营人员"
                          :prop="`saveMarkInfoList[${index}].operator`"
                          :rules="{
                            required: true,
                            message: '选择运营人员',
                            trigger: ['change'],
                          }"
                        >
                          <DeptMember
                            deptCode="amazon_operator"
                            v-model="mark.operator"
                            placeholder="根据运营配置的站点、产品、运营人员映射表分配；若选定站点、合作产品后无自动分配，请手动选择"
                          />
                        </el-form-item>
                        <el-form-item
                          label="折扣码"
                          :prop="`saveMarkInfoList[${index}].markCode`"
                          :rules="{
                            required: true,
                            message: '请生成折扣码',
                            trigger: ['blur', 'change'],
                          }"
                        >
                          <div class="flex_center w-100">
                            <el-input
                              v-model.trim="mark.markCode"
                              placeholder="请填写或者点击按钮自动生成"
                            />
                            <el-button
                              v-if="
                                ['edit', 'copy'].includes(rowData.fromType) || !rowData.fromType
                              "
                              @click="randomCode(mark)"
                              type="primary"
                            >
                              点击随机生成
                            </el-button>
                          </div>
                        </el-form-item>
                        <el-form-item label="推广备注">
                          <el-input
                            v-model="mark.remark"
                            type="textarea"
                            placeholder="请填写推广备注"
                          />
                        </el-form-item>
                        <div class="del-mark-wrap">
                          <el-button
                            type="danger"
                            @click="delMark(index)"
                            class="del-mark"
                            v-if="!['view', 'cancel'].includes(rowData.fromType) && index > 0"
                          >
                            删除
                          </el-button>
                        </div>
                      </div>
                      <el-button
                        type="primary"
                        @click="addMark"
                        v-if="!['view', 'cancel'].includes(rowData.fromType)"
                      >
                        添加
                      </el-button>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <el-button type="secondary" @click="goBack">取消</el-button>
            <el-button
              v-if="!['view'].includes(rowData.fromType)"
              type="primary"
              wait-text="保存中"
              :loading="btnLoading"
              @click="submitFn"
            >
              保存
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="amazonaddcollectcode">
  import { ElMessage, ElForm, ElFormItem, ElTooltip } from 'element-plus';
  import { decryptByBase64 } from '@/utils/aesTils';
  import { copyFn } from '@/utils/copyFn';
  import { metaApi, memberApi, platformApi, dataApi, productApi } from '@/api/index';
  import * as swal from '@/utils/swal';

  const state = reactive<{
    info: any;
    form: any;
    rules: any;
    channelList: optionItf[];
    lineCodeList: optionItf[];
    productList: optionItf[];
    siteCodeList: optionItf[];
    skuList: optionItf[];
    rowData: any;
    btnLoading: any;
  }>({
    info: {},
    form: {
      userName: '',
      userCode: '',
      channelCode: '',
      channelAccount: '',
      channelHome: '',
      comment: '',
      platformCode: 'amazon',
      saveMarkInfoList: [
        {
          operator: '',
          markCode: '',
          productLineCodeList: [],
          siteCode: [],
          remark: '',
          productCode: [],
        },
      ],
    },
    rules: {},
    channelList: [],
    lineCodeList: [],
    productList: [],
    siteCodeList: [],
    skuList: [],
    rowData: {},
    btnLoading: false,
  });

  const {
    info,
    form,
    rules,
    channelList,
    lineCodeList,
    productList,
    siteCodeList,
    rowData,
    btnLoading,
  } = toRefs(state);

  const getUserInfo = (useCode: string) => {
    metaApi.luteosMetaQueryUserInfo({ userCode: useCode }).then((res) => {
      info.value = { ...res };
      form.value.userName = info.value.channelAccount;
    });
  };

  const getSiteList = () => {
    platformApi
      .platformSiteQuerySiteList({ pageNum: 1, pageSize: 50, sitePlatform: 'amazon' })
      .then((res) => {
        siteCodeList.value = res.siteList || [];
      });
  };

  getSiteList();
  const route = useRoute();
  if (route.query.markCodes) {
    const markCodes = (route.query.markCodes as string).split(',');
    form.value.saveMarkInfoList = markCodes.map((item) => {
      return {
        operator: '',
        markCode: item,
        productLineCodeList: [],
        siteCode: [],
        remark: '',
        productCode: [],
      };
    });
  }
  // 获取预设信息
  const getPresetData = async () => {
    if (!route.query.row && route.query.code) {
      const res = await metaApi.luteosMetaGetMetaInfoLastCache({
        userCode: decryptByBase64(route.query.code as string),
      });
      if (res) {
        form.value.channelCode = route.query.channelCode || res.channelCode || '';
        form.value.channelAccount = route.query.channelAccount || res.channelAccount || '';
        form.value.channelHome = route.query.channelHome || res.attributeUrl || '';
      }
    }
  };
  getPresetData();
  // 缓存搜索的下拉合作产品列表，允许重复，用来保存时获取商品完整信息
  // const cacheProductList = ref([]);

  // 格式化下拉展示
  // const formatProductList = (list) => {
  //   productList.value = [];
  //   list.forEach((item: any) => {
  //     // 兼容列表数据没有productType的情况
  //     if (!item.productType || item.productType === 1) {
  //       const data: any = {
  //         productFormatName: `${item.productName}，${item.productCode}`,
  //         productName: item.productName,
  //         productCode: item.productCode,
  //         productType: 1,
  //       };
  //       productList.value.push(data);
  //       cacheProductList.value.push(data);
  //     }
  //   });
  // };
  const setProductObjectData = (val, mark) => {
    if (val.length === 0) {
      mark.productInfoSaveList = [];
    } else {
      mark.productInfoSaveList = val.map((productCode: string) => {
        const result = mark.productList.find((i) => {
          return i.productCode === productCode;
        });
        return {
          productName: result.productName,
          productCode: result.productCode,
          productType: result.productType || 1,
        };
      });
    }
  };

  const projectCode = ref('');

  if (route?.query?.projectCode) {
    projectCode.value = decryptByBase64(route.query.projectCode as string) || '';
  }

  if (route?.query?.code) {
    const code = decryptByBase64(route.query.code as string);
    form.value.userCode = code;
    getUserInfo(code);
  }
  if (route?.query?.row) {
    rowData.value = JSON.parse(decryptByBase64(route.query.row as string));
    info.value.avatar = rowData.value.avatar;
    info.value.channelAccount = rowData.value.channelAccount;
    info.value.email = rowData.value.userEmail;
    form.value.status = rowData.value.status;
    form.value.userName = rowData.value.userName;
    form.value.channelAccount = rowData.value.channelAccount;
    form.value.channelHome = rowData.value.channelHome;
    form.value.userCode = rowData.value.userCode;
    form.value.channelCode = rowData.value.channelCode || '';
    form.value.metaMarkCode = rowData.value.metaMarkCode;
    form.value.comment = rowData.value.comment;
    form.value.markCodeTimeZone = rowData.value.markCodeTimeZone;

    form.value.saveMarkInfoList[0].remark = rowData.value.remark;
    form.value.saveMarkInfoList[0].siteCode = rowData.value.siteCode
      ? rowData.value.siteCode.split(',')
      : [];
    form.value.saveMarkInfoList[0].markCode = rowData.value.markCode || '';
    form.value.saveMarkInfoList[0].operator = rowData.value.taskOperator || '';

    if (rowData.value.productInfoList && rowData.value.productInfoList.length) {
      form.value.saveMarkInfoList[0].productCode = rowData.value.productInfoList.map(
        (item) => item.productCode
      );
      // form.value.saveMarkInfoList[0].productList = rowData.value.productInfoList.map((item) => {
      //   return {
      //     productFormatName: `${item.productName}，${item.productCode}`,
      //     productName: item.productName,
      //     productCode: item.productCode,
      //     productType: item.productType || 1,
      //   };
      // });
      form.value.saveMarkInfoList[0].productInfoSaveList = rowData.value.productInfoList.map(
        (item) => {
          return {
            productName: item.productName,
            productCode: item.productCode,
            productType: item.productType || 1,
          };
        }
      );
      // formatProductList(rowData.value.productInfoList);
    }
    if (rowData.value.productLineList && rowData.value.productLineList.length) {
      const productLineCodeList = rowData.value.productLineList.map((item) => item.lineCode);
      form.value.saveMarkInfoList[0].productLineCodeList = productLineCodeList[0];
    }
    productRemoteMethod(
      form.value.saveMarkInfoList[0].productLineCodeList,
      form.value.saveMarkInfoList[0]
    );
    if (rowData.value.fromType === 'edit') {
      form.value.saveMarkInfoList[0].metaMarkCode = rowData.value.metaMarkCode;
    }

    // 复制时重置状态
    if (rowData.value.fromType === 'copy') {
      form.value.status = 1;
    }
  }

  const formRef = ref();
  rules.value = {
    channelCode: { required: true, message: '请选择渠道', trigger: ['blur', 'change'] },
    channelAccount: {
      required: true,
      message: '请选择存在账号的渠道',
      trigger: ['blur', 'change'],
    },
    channelHome: {
      required: true,
      message: '请选择存在红人链接的渠道或输入渠道',
      trigger: ['blur', 'change'],
    },
    productCode: { required: true, message: '请选择合作产品', trigger: ['blur'] },
    productLineCodeList: { required: true, message: '请选择品线', trigger: ['blur', 'change'] },
    siteCode: { required: true, message: '请选择站点', trigger: ['blur', 'change'] },
    markCode: { required: true, message: '请输入折扣码', trigger: ['blur', 'change'] },
    comment: { required: true, message: '请输入取消原因', trigger: ['blur', 'change'] },
  };

  metaApi.luteosMetaQueryChannelList({ pageNum: 1, pageSize: 500 }).then((res) => {
    channelList.value = res.channelList || [];
  });

  // metaApi.luteosMetaQueryProductLineList({}).then((res) => {
  //   lineCodeList.value = res.productLineList || [];
  // });
  // metaApi.luteosMetaV2QueryProductLineList({}).then((res) => {
  //   lineCodeList.value = res.productLineList || [];
  // });
  productApi
    .luteosProductLineQueryList({
      pageNum: 1,
      pageSize: 100,
    })
    .then((res) => {
      lineCodeList.value = res.recordList || [];
    });
  const channelChange = (val: string) => {
    const channel = info.value.channelList || [];
    if (channel.length > 0) {
      const channelInfo = channel.find((item: any) => item.channelCode == val);
      form.value.channelAccount = channelInfo?.channelAccount || '';
      form.value.channelHome = channelInfo?.channelHome || '';
    }
    formRef.value.validateField('channelAccount');
    formRef.value.validateField('channelHome');
  };

  const siteCodeChange = (val: string) => {
    const siteInfo = siteCodeList.value.find((item: any) => val.includes(item.siteCode));
    // 亚马逊取对应的，独立站默认取-5，西五区
    form.value.markCodeTimeZone = siteInfo?.timeZone || '';
  };
  const operatorDisabled = ref(false);
  const handleProductCodeChange = (val, siteCode, mark) => {
    if (val && val.length && siteCode && siteCode.length) {
      operatorDisabled.value = true;
      setOperator(val, siteCode, mark);
    } else {
      mark.operator = '';
    }
  };
  const handleSiteCodeChange = async (val, productCode, mark) => {
    if (val && val.length && productCode && productCode.length) {
      operatorDisabled.value = true;
      setOperator(productCode, val, mark);
    } else {
      operatorDisabled.value = false;
      mark.operator = '';
    }
  };
  const setOperator = async (productCodes, siteCode, mark) => {
    const res = await metaApi.luteosMetaQueryOneTaskOperators({
      siteList: siteCode,
      productCodeList: productCodes,
    });
    if (res) {
      mark.operator = res.operatorCode || '';
      operatorDisabled.value = !!res.operatorCode;
    }
  };
  function productRemoteMethod(lineCode, mark) {
    metaApi
      .luteosMetaQueryProductByLine({
        pageNum: 1,
        pageSize: 100,
        productLine: lineCode,
      })
      .then((res) => {
        mark.productList = res.productBeanList?.map((item) => {
          return {
            productFormatName: `${item.name}，${item.productSpu}`,
            productName: item.name,
            productCode: item.productSpu,
            productType: item.productType || 1,
          };
        });
      });
  }
  // 详情不自动查
  // if (!route?.query?.row) {
  //   productRemoteMethod('');
  // }

  const generateRandomString = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const randomCode = (mark) => {
    mark.markCode = generateRandomString();
  };

  const addMark = () => {
    const markInfo = form.value.saveMarkInfoList[form.value.saveMarkInfoList.length - 1];
    if (
      !markInfo.markCode ||
      !markInfo.siteCode ||
      !markInfo.productCode.length ||
      !markInfo.productLineCodeList.length
    ) {
      ElMessage.warning('请先填写完整当前一条折扣码信息再作添加');
      return;
    }
    form.value.saveMarkInfoList.push({
      markCode: '',
      productLineCodeList: [],
      siteCode: [],
      remark: '',
      productCode: [],
    });
  };

  const delMark = (index) => {
    form.value.saveMarkInfoList.splice(index, 1);
  };

  const router = useRouter();
  const goBack = () => {
    router.go(-1);
  };

  const deepClone = (source) => {
    // 拷贝函数
    function clone(source) {
      if (!source) {
        return {};
      }

      const target = Array.isArray(source) ? [] : {};
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          //  循环遍历出所有属性，并复制给新的目标对象

          // 正则表达式
          if (source[key] instanceof RegExp) {
            target[key] = source[key];
            continue;
          }

          if (typeof source[key] === 'object') {
            // 递归调用深拷贝
            target[key] = clone(source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
      return target;
    }

    return clone(source);
  };

  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      btnLoading.value = true;
      if (rowData.value.fromType === 'cancel') {
        metaApi
          .luteosMetaHandleMetaMark({
            handleType: 1,
            markCode: form.value.markCode,
            metaMarkCode: form.value.metaMarkCode,
            comment: form.value.comment,
          })
          .then(() => {
            ElMessage.success('取消成功');
            setTimeout(() => {
              router.push({ name: 'amazoncollectcode' });
            }, 500);
          })
          .finally(() => {
            btnLoading.value = false;
          });
        return;
      }
      if (rowData.value.fromType === 'delay') {
        metaApi
          .luteosMetaHandleMetaMark({
            handleType: 2,
            metaMarkCode: form.value.metaMarkCode,
            markCode: form.value.markCode,
            operator: form.value.operator,
          })
          .then(() => {
            ElMessage.success('续费成功');
            setTimeout(() => {
              router.push({ name: 'amazoncollectcode' });
            }, 500);
          })
          .finally(() => {
            btnLoading.value = false;
          });
        return;
      }
      const data = deepClone(form.value);
      data.saveMarkInfoList.forEach((item) => {
        item.productLineCodeList = [item.productLineCodeList];
        item.siteCode = item.siteCode.join(',');
        // const productInfoSaveList = [];
        // item.productCode.forEach((item) => {
        //   const findInfo =
        //     cacheProductList.value.find((product) => product.productCode === item) || {};
        //   if (findInfo.productCode) {
        //     productInfoSaveList.push(findInfo);
        //   }
        // });
        // item.productInfoSaveList = productInfoSaveList;
        delete item.productCode;
        delete item.productList;
      });
      if (rowData.value.fromType === 'edit') {
        data.id = rowData.value.id;
      }

      if (rowData.value.fromType === 'copy') {
        delete data.metaMarkCode;
        delete data.taskCode;
      }
      // 有项目编码则传
      if (projectCode.value) {
        data.projectCode = projectCode.value;
      }

      metaApi
        .luteosMetaSaveMetaMarkInfo(data)
        .then(() => {
          ElMessage.success('添加成功');
          swal
            .confirm({
              title: '是否需要跳转至另一平台申请折扣页面？',
              html: `点击“是”，则跳转至另一平台申请折扣页面<br/>点击“否”，则跳转至当前平台折扣码管理页面`,
            })
            .then((confirm) => {
              if (confirm) {
                router.push({
                  name: 'shopifyaddcollectcode',
                  query: {
                    code: route.query.code,
                    projectCode: route.query.projectCode,
                    markCodes: form.value.saveMarkInfoList.map((item) => item.markCode).join(','),
                    channelCode: form.value.channelCode,
                    channelAccount: form.value.channelAccount,
                    channelHome: form.value.channelHome,
                  },
                });
              } else {
                router.push({ name: 'amazoncollectcode' });
              }
            });
          // setTimeout(() => {
          //   router.push({ name: 'collectcode' });
          // }, 500);
        })
        .finally(() => {
          btnLoading.value = false;
        });
    }
  };
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }

  .bg_f9f9f9 {
    background-color: #f9f9f9;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .common_status {
    width: 100px;
    padding: 10px 0;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;

    .scale_txt {
      font-size: 1.1rem !important;
    }
  }

  .ele_page_form {
    ::v-deep(.el-form-item .el-form-item__label) {
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--bs-gray-800);
    }

    ::v-deep(.el-form-item) {
      margin-bottom: 2.5rem;
    }

    ::v-deep(.el-input__inner) {
      color: #5e6278 !important;
    }

    ::v-deep(.el-form-item__error) {
      width: 100%;
      margin-top: 0.5rem;
      font-size: 0.95rem;
      font-weight: 400;
      color: #b02a37;
      letter-spacing: 1px;
    }
  }

  .ele_input {
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
      height: auto;
      box-shadow: none;
    }

    ::v-deep(.el-input__inner) {
      height: auto;
      line-height: unset;
      font-weight: 500;
      color: #5e6278;
    }
  }
  .mark-info {
    border: 1px dashed #eee;
    padding: 10px;
    margin-bottom: 15px;
    position: relative;
  }
  .del-mark-wrap {
    display: flex;
    justify-content: flex-end;
  }
  .del-mark {
    margin-bottom: 10px;
  }
</style>
