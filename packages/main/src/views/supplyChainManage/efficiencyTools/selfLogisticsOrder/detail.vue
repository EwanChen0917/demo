<template>
  <div class="self-logistics-order" v-loading="detailLoading">
    <el-tabs v-model="activeTab" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in tabsInfoList" :label="item" :name="index + 1" />
    </el-tabs>
    <div class="tab-form" id="form-container">
      <div v-for="(item, index) in tabsInfoList" :key="item" class="tab-form-item" :id="index + 1">
        <div class="form-title">{{ item }}</div>
        <InfoForm
          v-if="tabForm[item].length"
          :form-list="tabForm[item]"
          :form-model="orderModel(item)"
          @change="handleInputChange"
        />
        <el-table v-if="item == '产品信息'" :data="productList">
          <el-table-column prop="productName" label="产品名称" />
          <el-table-column prop="skuCode" label="供应链SKU" />
          <el-table-column prop="specialAttributesName" label="物流属性" />
          <el-table-column prop="declareCnName" label="申报中文名" />
          <el-table-column prop="declareEnName" label="申报英文名" />
          <el-table-column prop="declareQuantity" label="申报数量" />
          <el-table-column prop="declarePrice" label="申报单价" />
          <el-table-column prop="currency" label="币种" />
          <el-table-column prop="weight" label="净重" />
          <el-table-column prop="length" label="长" />
          <el-table-column prop="width" label="宽" />
          <el-table-column prop="height" label="高" />
          <el-table-column prop="hsCode" label="海关编码" />
          <el-table-column prop="hsTariffRate" label="海关税率" />
          <el-table-column prop="remark" label="明细备注">
            <template #default="{ row, $index, column }">
              <div v-if="editing !== `${$index}-${column.property}`">
                <span>{{ row.remark }}</span>
                <i class="iconfont icon-bianji" @click="editing = `${$index}-${column.property}`"></i>
              </div>
              <el-input
                @click.stop
                v-if="editing == `${$index}-${column.property}`"
                v-model="row.remark"
                @blur="editing = ''"
                @change="handleInputChange({ remark: row.remark })"
              />
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="附件">
            <template #default="{ row }">
              <el-link
                class="file-link"
                type="primary"
                :underline="false"
                @click="download(row.extraInfo, row.fileName)"
              >
                <OverflowTooltip :content="row.fileName" :line="2" color="#02B96B" />
                <el-icon v-if="row.fileName" class="delete-icon" @click.stop="removeFile(row)">
                  <Delete />
                </el-icon>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="itemId" label="操作" width="160px">
            <template #default="{ row }">
              <div class="action-btn">
                <span @click="handleActions(row, 'upload')">上传附件</span>
                <!-- <span class="btn-update" @click="handleActions(row, 'update')">更新SKU信息</span> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <KeenFileUpload
      v-model="fileList"
      :showOperate="false"
      :showFileList="false"
      @success="onUploadSuccess"
      directory="erp/logisticsTracking"
      ref="attachmentUploadRef"
    >
      <el-link type="primary" :underline="false" class="row-btn" />
    </KeenFileUpload>
  </div>
</template>

<script setup lang="ts" name="selfLogisticsOrderEdit">
  import { tmsApi } from '@/api/index';
  import { download } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import * as swal from '@/utils/swal';
  import InfoForm from './components/InfoForm.vue';
  import { debounce } from 'lodash-es';

  const route = useRoute();
  const productList = ref([]);
  const activeTab = ref(1);
  const formModel = ref({ currency: 'USD' });
  const fileList = ref([]);
  const uploadRowFbaId = ref('');
  const editing = ref('');

  const orderModel = computed(
    () => (item) => formModelMap[item] ? formModel.value[formModelMap[item]] : formModel.value
  );

  onMounted(() => {
    if (route.query.logisticsNo) getLogisticsOrderInfo();
    detailOpen();
  });

  let contentSection;
  const detailOpen = () => {
    contentSection = document.getElementById('form-container');
    if (contentSection) {
      contentSection.addEventListener('scroll', handleScroll);
    }
    nextTick(() => {
      initSections();
    });
    window.addEventListener('resize', initSections);
  };

  onUnmounted(() => {
    if (contentSection) {
      contentSection.removeEventListener('scroll', handleScroll);
    }
    window.removeEventListener('resize', initSections);
  });

  const getLogisticsOrderInfo = async () => {
    const res: any = await tmsApi.tmsLogisticsOrderOrderDetail({
      orderCode: route.query.logisticsNo as string,
      type: 'tms',
    });
    productList.value = res.declareItemList;
    formModel.value = res;
    formModel.value.currency = 'USD';
  };

  const tabsInfoList = ['订单信息', '仓储物流', '收件人信息', '产品信息', '寄件人信息'];

  const tabForm = {
    订单信息: [
      { label: '自发货物流订单号', prop: 'logisticsNo' },
      { label: '来源单号', prop: 'refNo' },
      { label: '来源平台', prop: 'sourcePlatform' },
      { label: '店铺', prop: 'shop' },
      { label: '买家姓名', prop: 'buyerName' },
      { label: '买家邮箱', prop: 'buyerEmail' },
    ],
    仓储物流: [
      { label: '发货仓', prop: 'warehouseDesc' },
      { label: '物流商', prop: 'spCodeDesc' },
      { label: '物流渠道名称', prop: 'shippingMethodName' },
      { label: '渠道代码', prop: '' },
      { label: '税号', prop: 'taxId' },
      { label: '运单号', prop: 'waybillNo' },
      { label: '跟踪号', prop: 'trackNo' },
      { label: '总件数', prop: 'totalPieces' },
      { label: '总重量', prop: 'totalWeight' },
      { label: '总申报价值', prop: 'totalPrice' },
      { label: '总体积', prop: 'totalVolume' },
      { label: '预估运费', prop: 'estimatedShippingCost' },
      { label: '实际运费', prop: 'realShippingCost' },
      { label: '订单币种', prop: 'currency' },
      { label: '附件', prop: 'extraInfo', com: 'upload' },
      { label: '备注', prop: 'remark', editable: true },
      { label: '创建时间', prop: 'createTime' },
      { label: '更新时间', prop: 'updateTime' },
      { label: '发货时间', prop: 'shippingTime' },
      { label: '取消时间', prop: 'invalidationTime' },
      { label: '作废时间', prop: 'invalidationTime' },
      // { label: '拦截时间', prop: 'interceptTime' },
      // { label: '拦截原因', prop: 'interceptReason', editable: true },
    ],
    收件人信息: [
      // { label: '客户名称', prop: 'customerName' },
      { label: '收件人', prop: 'receiverName' },
      { label: '国家/地区', prop: 'countryCode' },
      { label: '省/州', prop: 'province' },
      { label: '城市', prop: 'city' },
      { label: '区/县', prop: 'county' },
      { label: '详细地址1', prop: 'address1' },
      { label: '详细地址2', prop: 'address2' },
      { label: '门牌号', prop: 'houseNumber' },
      { label: '邮编', prop: 'zipcode' },
      { label: '电话', prop: 'phone' },
      { label: '邮箱', prop: 'email' },
      { label: '短地址', prop: 'shortAddress' },
    ],
    产品信息: [],
    寄件人信息: [
      // { label: '客户名称', prop: 'customerName' },
      { label: '寄件人', prop: 'receiverName' },
      { label: '国家/地区', prop: 'countryCode' },
      { label: '省/州', prop: 'province' },
      { label: '城市', prop: 'city' },
      { label: '区/县', prop: 'county' },
      { label: '详细地址1', prop: 'address1' },
      { label: '详细地址2', prop: 'address2' },
      { label: '门牌号', prop: 'houseNumber' },
      { label: '邮编', prop: 'zipcode' },
      { label: '电话', prop: 'phone' },
      { label: '邮箱', prop: 'email' },
    ],
  };

  const formModelMap = {
    寄件人信息: 'sender',
    收件人信息: 'receiver',
  };

  const detailLoading = ref(false);
  const handleInputChange = debounce(async (row?, refresh?) => {
    if (row) {
      Object.assign(formModel.value, row);
      detailLoading.value = !refresh;
    }
    const res = await tmsApi.tmsLogisticsOrderOrderEdit(formModel.value);
    res && ElMessage.success('修改成功');
    if (row) editing.value = '';
    detailLoading.value = false;
  });

  const handleActions = (row, type) => {
    if (type == 'upload') {
      // 上传
      uploadRowFbaId.value = row.id;
      document.querySelector('.row-btn')?.click();
    }
  };

  const onUploadSuccess = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      try {
        ElMessage.success('上传成功');
        if (uploadRowFbaId.value) {
          // 表格
          await productList.value.map((item: any) => {
            if (item.id == uploadRowFbaId.value) {
              item.extraInfo = fileList.value[0].ossKey;
              item.fileName = fileList.value[0].name;
            }
            return item;
          });
        } else {
          // 仓储物流
          formModel.value.extraInfo = fileList.value[0].ossKey;
          formModel.value.fileName = fileList.value[0].name;
        }
        handleInputChange();
      } catch (error) {
        ElMessage.error('上传失败，请重试');
        return;
      } finally {
        fileList.value = [];
        uploadRowFbaId.value = '';
      }
    } else {
      ElMessage.error('请先选择文件');
    }
  };

  const removeFile = async (row) => {
    try {
      const confirmed = await swal.confirm('确认删除附件吗？');
      if (!confirmed) return;
      swal.success('删除成功');
      await productList.value.map((item: any) => {
        if (item.id == row.id) {
          item.extraInfo = '';
          item.fileName = '';
        }
        return item;
      });
      handleInputChange();
    } catch (error) {}
  };

  const sections = ref<Array<{ id: number; offsetTop: number }>>([]);
  // 初始化获取所有内容区域
  const initSections = () => {
    sections.value = [];
    for (let i = 0; i < tabsInfoList.length; i += 1) {
      const section = document.getElementById(`${i + 1}`);
      if (section) {
        sections.value.push({
          id: i + 1,
          offsetTop: section.offsetTop,
        });
      }
    }
  };

  let scrollTimeout;
  // 处理滚动事件
  const handleScroll = (event) => {
    if (scrollTimeout) {
      // clearTimeout
      return;
    }
    scrollTimeout = setTimeout(() => {
      //  更新当前活动Tab
      if (sections.value.length > 0) {
        const scrollPosition = event.target.scrollTop + 59;
        // 找到当前可见区域
        for (let i = sections.value.length - 1; i >= 0; i -= 1) {
          const section = sections.value[i];
          if (scrollPosition >= section.offsetTop) {
            activeTab.value = sections.value[i].id;
            break;
          }
        }
      }
      // clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }, 20);
  };

  let clickIndex;
  let isClick = false;
  const endScroll = () => {
    if (isClick) {
      isClick = false;
      setTimeout(() => {
        activeTab.value = clickIndex;
      }, 20);
    }
  };

  const tabClick = (tab: any) => {
    clickIndex = tab.paneName;
    isClick = true;
    const section = document.getElementById(`${tab.paneName}`);
    if (section) {
      // 计算Sticky头部高度
      const top = section.offsetTop - 59;
      contentSection?.scrollTo({ top, behavior: 'smooth' });
      contentSection.addEventListener('scrollend', endScroll);
    }
  };
</script>

<style scoped lang="scss">
  .self-logistics-order {
    background-color: #fff;
    height: calc(100vh - 40px - 50px);
    overflow: hidden;
    .tab-form {
      height: calc(100vh - 90px - 40px - 20px);
      overflow: auto;
      margin-top: 20px;
      padding-left: 20px;
      .tab-form-item {
        margin-bottom: 20px;
        .form-title {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #1f1f1f;
          font-size: 15px;
          margin-bottom: 10px;
          &::before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 15px;
            background: var(--el-color-primary);
            border-radius: 4px;
            margin-right: 7px;
          }
        }
        :deep(.el-form-item__content) {
          align-items: flex-start;
        }
      }
    }
    .icon-bianji {
      cursor: pointer;
      color: var(--el-color-primary);
    }
    .action-btn {
      display: flex;
      align-items: center;
      color: var(--el-color-primary);
      > span:hover {
        color: var(--el-color-primary-light-3);
        text-decoration: underline;
        cursor: pointer;
      }
      .btn-update {
        margin-left: 8px;
      }
    }
  }
</style>
