<template>
  <el-form label-position="top">
    <KeenCard :title="'红人邮箱：' + touchInfo.receiverEmail">
      <el-row :gutter="20">
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="总触达">
            {{ touchInfo.repeatCount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="最近7天">
            {{ touchInfo.recentRepeatCount }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="最近发送日期">
            {{ touchInfo.startDate }}
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="6" :offset="0">
          <el-form-item label="标签">
            <div class="d-flex flex-wrap gap-3">
              <Tag v-for="tag in touchInfo?.lableDescList" :key="tag">{{ tag }}</Tag>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
  <KeenCard title="">
    <div class="d-flex flex-wrap">
      <div class="sender-email">推广发件邮箱：</div>
      <el-select
        v-model="sendEmail"
        placeholder="推广发件邮箱"
        filterable
        class="send-email-select"
        @change="queryHistoryList"
      >
        <el-option
          v-for="item in touchInfo.senderEmailList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button class="button" type="primary" @click="runQuery">查询</el-button>
    </div>
    <div class="email-content">
      <div class="tab-content">
        <div
          id="kt_activity_today"
          class="card-body p-0 tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="kt_activity_today_tab"
        >
          <div class="timeline">
            <div
              :class="[
                'timeline-item',
                'email-list',
                index === emailHistoryList.length - 1 ? 'last-item' : '',
              ]"
              v-for="(item, index) in emailHistoryList"
              :key="item.email"
            >
              <div class="timeline-line w-40px"></div>
              <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
                <div class="symbol-label bg-light">
                  <EleAvator :name="item.email" :styleObj="getStyle(item.email)" />
                </div>
              </div>
              <div class="timeline-content mb-10 mt-n1">
                <div class="pe-3 mb-5">
                  <div class="top">
                    <span class="time fw-bold text-gray-800">{{ item.sendDate }}</span>
                    <span class="email-txt ms-1 fw-semibold">{{ item.email }}</span>
                  </div>
                  <div class="content" v-html="item.content || '暂无内容'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </KeenCard>
</template>

<script setup lang="ts" name="favourEmailHistory">
  import { metaApi } from '@/api';
  import { decryptByBase64 } from '@/utils/aesTils';

  const route = useRoute();
  const touchInfo = ref({});
  const sendEmail = ref();
  if (route.query?.row) {
    touchInfo.value = JSON.parse(decryptByBase64(route.query.row as string));
    sendEmail.value = (touchInfo.value.senderEmailList && touchInfo.value.senderEmailList[0]) || '';
  }
  const emailHistoryList = ref([]);
  const queryHistoryList = async () => {
    const res = await metaApi.luteosMetaEmailQueryEmailHistoryList({
      receiverEmail: decodeURIComponent(touchInfo.value.receiverEmail),
      sendEmail: sendEmail.value,
      pageNum: 1,
      pageSize: 100,
    });
    emailHistoryList.value = res.emailHistoryList || [];
  };
  if (touchInfo.value.receiverEmail) {
    queryHistoryList();
  }
  const styleMap = {};
  const getStyle = (email) => {
    const style: any = {
      with: '40px',
      height: '40px',
      backgroundColor: '',
      color: '',
    };
    if (!styleMap[email]) {
      const colorInfo = generateColor();
      style.backgroundColor = colorInfo.bgColor;
      style.color = colorInfo.textColor;
      styleMap[email] = style;
    }
    return styleMap[email];
  };
  const generateColor = () => {
    const hue = Math.floor(Math.random() * 360); // 色调
    const saturation = 30 + Math.floor(Math.random() * 31); // 饱和度，降低饱和度使颜色更柔和

    // 为背景色和文本色分别设置亮度（确保文本总是比背景暗）
    const bgLightness = 70 + Math.floor(Math.random() * 26); // 背景色亮度，较亮
    const fontLightness = bgLightness - 30 - Math.floor(Math.random() * 20); // 字体色亮度，确保总是比背景暗

    const bgColor = `hsl(${hue}, ${saturation}%, ${bgLightness}%)`;
    const textColor = `hsl(${hue}, ${saturation}%, ${fontLightness}%)`;

    return {
      bgColor,
      textColor,
    };
  };
</script>

<style scoped lang="scss">
  :deep(.el-form-item__label) {
    font-weight: bold;
  }
  .d-flex {
    padding-top: 10px;
  }
  .sender-email {
    height: 40px;
    line-height: 40px;
    margin-right: 50px;
  }
  .send-email-select {
    width: 300px;
    margin-right: 50px;
  }
  .email-content {
    width: 100%;
    height: 100px;
    border: 1px dashed #eee;
    padding: 30px 15px;
    margin-top: 40px;
    height: 100%;
    .last-item {
      margin-bottom: 0 !important;
    }
    .top {
      .time {
        font-size: 14px;
        margin-right: 20px;
      }
      .email-txt {
        color: #3e97ff;
        font-size: 16px;
      }
    }
    .content {
      margin-top: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      max-height: 600px;
      overflow-y: scroll;
      padding: 20px;
    }
  }
</style>
