<template>
  <div class="my-flex">
    <KeenFlex>
      <KeenFlex>
        <template #auto>
          <div class="card">
            <div class="card-body pt-15">
              <div class="d-flex flex-center flex-column mb-5">
                <div class="symbol symbol-100px symbol-circle mb-2">
                  <span class="fs-3 text-gray-800 fw-bold mb-1">{{ detail.mediaName }}</span>
                </div>
                <div
                  v-if="detail.url"
                  class="fs-5 text-hover-primary mb-2"
                  @click="openWindow(detail.url)"
                >
                  {{ detail.url }}
                </div>
                <div class="d-flex flex-stack fs-4 py-3">
                  <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
                </div>
                <div class="fs-8 text-gray-400 text-center">
                  <Tag size="large" color="blue" class="tag-item" v-if="detail.mediaTypeDesc">
                    {{ detail.mediaTypeDesc }}
                  </Tag>
                  <Tag size="large" color="blue" class="tag-item" v-if="detail.contentTypeDesc">
                    {{ detail.contentTypeDesc }}
                  </Tag>
                  <!--                  <Tag size="large" color="blue" class="tag-item" v-if="detail.keywords">-->
                  <div class="w-100 text-break tag-item keywords">{{ detail.keywords }}</div>
                  <!--                  </Tag>-->
                </div>
              </div>
              <div class="separator separator-dashed my-3"></div>
              <div class="collapse show">
                <div class="fs-6">
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">主要流量国家</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    {{ detail.mainCountry }}
                  </div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">月流量&更新时间</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    <span>{{ detail.monthFlow }}&nbsp;</span>
                    <span>{{ detail.monthFlowTime }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">媒体量级</span>
                  </div>
                  <div class="fs-8 text-gray-600">{{ detail.levelDesc }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">月独立访客量&更新时间</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    <span>{{ detail.monthlyVisitorCount }}&nbsp;</span>
                    <span>{{ detail.monthlyVisitorCountTime }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">媒体全球排名&更新时间</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    <span>{{ detail.globalRank }}&nbsp;</span>
                    <span>{{ detail.globalRankTime }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">媒体国家排名&更新时间</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    <span>{{ detail.countryRank }}&nbsp;</span>
                    <span>{{ detail.countryRankTime }}</span>
                  </div>
                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">媒体类目排名&更新时间</span>
                  </div>
                  <div class="fs-8 text-gray-600">
                    <span>{{ detail.categoryRank }}&nbsp;</span>
                    <span>{{ detail.categoryRankTime }}</span>
                  </div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">媒体DR</span>
                  </div>
                  <div class="fs-8 text-gray-600">{{ detail.mediaDr }}</div>

                  <div class="fs-8 text-gray-600">{{ detail.quotation }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">录入</span>
                  </div>
                  <div class="fs-8 text-gray-600">{{ detail.creatorName }}</div>

                  <div class="fw-bold flex_center mt-5 mb_2">
                    <span class="line_normal">备注</span>
                  </div>
                  <div class="fs-8 text-gray-600">{{ detail.remark }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #fluid>
          <el-tabs v-model="tabCurrent">
            <el-tab-pane label="联系方式" :name="0">
              <div class="log-wrap">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleAddRecord"
                  :disabled="isDisabledAdd"
                >
                  新增记录
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEditRecord"
                  :disabled="isDisabledEdit"
                >
                  修改记录
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleSaveRecord"
                  :disabled="isDisabledSave"
                >
                  保存修改
                </el-button>
                <el-form :model="form" ref="formRef" label-position="left" class="record-wrap">
                  <div class="record-list" v-for="(contact, index) in contactList" :key="index">
                    <el-form
                      :model="form"
                      ref="formRef"
                      label-position="left"
                      class="record-wrap"
                      :disabled="contact.isDisabled"
                    >
                      <div class="creator">跟进人：{{ contact.creatorName }}</div>
                      <div class="record-item">
                        <el-form-item prop="name" label="编辑姓名">
                          <el-input v-model="contact.name" clearable />
                        </el-form-item>
                        <el-form-item prop="country" label="编辑国家">
                          <el-select
                            style="width: 180px"
                            v-model="contact.country"
                            :teleported="false"
                            clearable
                            filterable
                            placeholder="请选择国家"
                          >
                            <el-option
                              v-for="item in dictMap.product_site"
                              :key="item.value"
                              :label="item.desc"
                              :value="item.value"
                            />
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="contact" label="编辑其他联系方式">
                          <el-input v-model="contact.contact" clearable />
                        </el-form-item>
                        <el-form-item prop="mediaPartners" label="编辑合作的媒体">
                          <el-input v-model="contact.mediaPartners" clearable />
                        </el-form-item>
                      </div>
                      <div class="record-item">
                        <el-form-item prop="email" label="编辑邮箱">
                          <el-input v-model="contact.email" clearable />
                        </el-form-item>
                        <el-form-item prop="job" label="编辑职位">
                          <el-input v-model="contact.job" clearable />
                        </el-form-item>
                        <el-form-item prop="area" label="编辑负责领域">
                          <el-input v-model="contact.area" clearable />
                        </el-form-item>
                        <el-form-item prop="status" label="信息记录状态">
                          <el-select
                            style="width: 180px"
                            v-model="contact.status"
                            :teleported="false"
                            clearable
                            filterable
                            placeholder="请选择状态"
                          >
                            <el-option label="正常" :value="1" />
                            <el-option label="已失效" :value="2" />
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="record-item">
                        <el-form-item prop="responseSituation" label="回复情况">
                          <el-input v-model="contact.responseSituation" clearable />
                        </el-form-item>
                        <el-form-item prop="recordDate" label="收录时间">
                          <el-date-picker
                            type="date"
                            v-model="contact.recordDate"
                            value-format="YYYY-MM-DD"
                            clearable
                          />
                        </el-form-item>
                        <el-form-item prop="quotation" label="报价">
                          <el-input v-model="contact.quotation" clearable />
                        </el-form-item>
                        <el-form-item prop="remark" label="备注">
                          <el-input v-model="contact.remark" clearable />
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </el-form>
                <KeenPagination
                  :current="contactCurrent"
                  :page-size="contactPageSize"
                  :page-size-option="pageSizeOption"
                  :total="contactTotal"
                  @size-change="handleContactPageSizeChange"
                  @current-change="handleContactCurrentChange"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="操作日志" :name="1">
              <div class="log-wrap">
                <div v-for="(item, index) in listData?.logList" :key="index">
                  <span class="primary-color">{{ item.operationTime + ' ' }}</span>
                  <span class="primary-color fw-bold">{{ item.operatorName + ' ' }}</span>
                  <span class="fs-8 text-muted">{{ item.operationContent + ' ' }}</span>
                  <div class="separator separator-dashed my-3"></div>
                </div>
                <div class="pagination" v-if="listData?.logList.length">
                  <KeenPagination
                    :current="current"
                    :page-size="pageSize"
                    :page-size-option="pageSizeOption"
                    :total="total"
                    @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
                <div v-else>暂无数据</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </KeenFlex>
      <!-- 订单列表 -->
    </KeenFlex>
    <EditMedia
      v-if="editMediaVisible"
      :visible="editMediaVisible"
      :info="detail"
      :dictMap="dictMap"
      @close="handleEditClose"
    />
  </div>
</template>

<script setup lang="ts" name="mediadetail">
  import { mediaApi, MediaApi, platformApi } from '@/api/index';

  import useList from '@/views/lute-os/hooks/list/useList';
  import { openWindow } from '@/utils';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import EditMedia from './components/editMedia.vue';

  const store = useStore();
  const { userInfo } = store;

  const route = useRoute();
  const detail = ref({});
  const mediaCode = route.query.code;
  const tabCurrent = ref(0);
  const {
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
  } = useList<
    MediaApi.LuteosMediaQueryMediaOperateLog.RequestQuery,
    MediaApi.LuteosMediaQueryMediaOperateLog.ResponseBody
  >({
    searchDefaults: {
      mediaCode,
    },
    pageSize: 10,
    service: mediaApi.luteosMediaQueryMediaOperateLog,
  });

  const contactCurrent = ref(1);
  const contactPageSize = ref(10);
  const contactTotal = ref(0);
  const handleContactPageSizeChange = (val) => {
    contactPageSize.value = val;
    queryContactList();
  };
  const handleContactCurrentChange = (val) => {
    contactCurrent.value = val;
    queryContactList();
  };

  const form = ref({});
  const contactRecord = {
    area: '',
    contact: '',
    country: '',
    creator: userInfo.memberCode,
    creatorName: userInfo.name,
    email: '',
    job: '',
    mediaCode: '',
    mediaContactCode: '',
    mediaPartners: '',
    name: '',
    quotation: '',
    remark: '',
    recordDate: '',
    responseSituation: '',
    status: 1,
    isDisabled: false,
  };
  const operateType = ref('');
  const contactList = ref([]);
  const handleAddRecord = () => {
    contactList.value.unshift({ ...contactRecord });
    operateType.value = 'add';
  };

  const handleEditRecord = () => {
    operateType.value = 'edit';
    contactList.value.forEach((item: any) => {
      item.isDisabled = item.creator !== userInfo.memberCode;
    });
  };

  const handleSaveRecord = async () => {
    const addEffectiveList: any = [];
    const addList: any = [];
    const editList: any = [];
    const editEffectiveList: any = [];
    contactList.value.forEach((item: any) => {
      // 保存自己的有效记录
      if (item.creator === userInfo.memberCode) {
        // 修改情况
        if (item.mediaCode) {
          editList.push(item);
          // 有效记录
          if (!!(item.name && item.email) || !!(item.name && item.contact)) {
            editEffectiveList.push(item);
          }
        } else {
          // 新增情况
          addList.push(item);
          // 有效记录
          if (!!(item.name && item.email) || !!(item.name && item.contact)) {
            addEffectiveList.push(item);
          }
        }
      }
    });
    const effectiveList: any = operateType.value === 'add' ? addEffectiveList : editEffectiveList;
    const list: any = operateType.value === 'add' ? addList : editList;
    // 校验必填
    if (effectiveList.length) {
      // 判断有效记录跟全部记录对比
      if (effectiveList.length !== list.length) {
        const res = await swal.confirm(
          '请补齐编辑姓名与编辑邮箱 或 编辑姓名与编辑其他联系方式 再保存'
        );
        if (!res) return;
      }

      await mediaApi.luteosMediaOperateMedia({
        mediaCode,
        contactList: effectiveList,
        operateType: 2,
      });
      ElMessage.success('保存成功');
      queryContactList();
      operateType.value = '';
    } else {
      swal.confirm('请补齐编辑姓名与编辑邮箱 或 编辑姓名与编辑其他联系方式 再保存');
    }
  };

  onMounted(() => {
    queryDetail();
    queryContactList();
  });

  const queryDetail = async () => {
    const res: any = await mediaApi.luteosMediaQueryMediaDetail({ mediaCode });
    detail.value = res || {};
  };

  const queryContactList = async () => {
    const res: any = await mediaApi.luteosMediaQueryMediaContactList({
      mediaCode,
      pageSize: contactPageSize.value,
      pageNum: contactCurrent.value,
    });
    contactList.value = res.mediaContactList || [];
    contactTotal.value = res.total || 0;
    if (contactList.value.length) {
      contactList.value.forEach((item: any) => {
        item.isDisabled = true;
      });
    } else {
      contactList.value.push({ ...contactRecord });
    }
  };
  const product_site = ref([
    {
      value: 'US',
      desc: 'US',
    },
    {
      value: 'UK',
      desc: 'UK',
    },
    {
      value: 'DE',
      desc: 'DE',
    },
    {
      value: 'FR',
      desc: 'FR',
    },
    {
      value: 'IT',
      desc: 'IT',
    },
    {
      value: 'ES',
      desc: 'ES',
    },
    {
      value: 'AU',
      desc: 'AU',
    },
    {
      value: 'CA',
      desc: 'CA',
    },
    {
      value: 'unknown',
      desc: '其他',
    },
  ]);
  const dictMap = ref({});
  const getOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['media_level', 'media_type', 'content_type'],
    });
    dictMap.value = res.dictMap || {};
    dictMap.value.product_site = product_site.value;
  };
  getOptions();

  const editMediaVisible = ref(false);
  const handleEdit = () => {
    editMediaVisible.value = true;
  };

  const handleEditClose = () => {
    queryDetail();
    editMediaVisible.value = false;
  };

  // 新增记录按钮禁用逻辑，姓名和邮箱 或者 姓名和其他联系方式不为空算一条记录，有效记录填完才能新增
  const isDisabledAdd = computed(() => {
    let count = 0;
    contactList.value.forEach((item: any) => {
      if (!item.mediaCode) {
        count++;
      }
    });
    return count > 0 || operateType.value === 'edit';
  });
  //  禁用修改-与自己相关且当前存在禁用状态
  const isDisabledEdit = computed(() => {
    let count = 0;
    contactList.value.forEach((item: any) => {
      if (item.creator === userInfo.memberCode && item.isDisabled) {
        count++;
      }
    });
    return count === 0 || operateType.value === 'add';
  });
  //  没有跟自己相关的记录禁用
  const isDisabledSave = computed(() => {
    let count = 0;
    contactList.value.forEach((item: any) => {
      if (item.creator === userInfo.memberCode) {
        count++;
      }
    });
    return count === 0;
  });
</script>

<style scoped lang="scss">
  .my-flex {
    :deep(.flex-lg-row-auto) {
      background: #ffffff;
    }
  }
  .text-hover-primary {
    cursor: pointer;
  }

  .line_normal {
    display: block;
    width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-center {
    text-align: center;
  }

  .card-wrap {
    :deep(.card-content) {
      overflow: hidden;
      padding-left: 2rem !important;
    }

    :deep(.el-rate__decimal) {
      color: #f7ba2a;
    }

    .separator {
      width: 120%;
      margin-left: -30px;
    }

    margin-bottom: 0;
  }

  .operate-log {
    margin-top: -10px;
  }

  .file-tag {
    margin-right: 5px;
  }

  .mt-5 {
    margin-top: 2rem !important;
  }

  .log-wrap {
    background: #fff;
    padding: 20px 0 10px 20px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    :deep(.page-size-option-wrapper) {
      position: absolute;
      left: 20px;
    }
  }

  .primary-color {
    color: #3e97ff;
  }
  .tag-item {
    margin-right: 5px;
    margin-top: 5px;
  }

  .keywords {
    color: #009ef7;
    background-color: #f1faff;
    border-color: #f1faff;
    line-height: 16px;
    padding: 7px 11px;
    font-size: 12px;
  }

  .record-list {
    border: 1px dashed #eee;
    padding: 0 10px;
    margin-bottom: 15px;
    .creator {
      margin-left: 10px;
      margin-bottom: 20px;
    }
  }
  .record-wrap {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .record-item {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    :deep(.el-input__wrapper) {
      width: 180px;
    }
  }
</style>
