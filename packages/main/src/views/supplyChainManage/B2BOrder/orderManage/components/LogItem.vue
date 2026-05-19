<template>
  <div>
    <template v-for="item in logTypeArr" :key="item.index">
      <div class="log-item" v-if="item.type === 1">
        <div class="title flex-align">
          <div class="bg type-bg1"></div>
          <div class="type">客服备注</div>
          <img :src="avatarFormat(item)" class="avatar" />
          <div class="name">{{ item.operatorName ?? item.operator }}</div>
          <div class="time">{{ item.updateTime }}</div>
        </div>
        <div class="loginfo">
          <div class="arrow"></div>
          <div class="info2">
            <div class="info-text">{{ item.remark }}</div>
          </div>
        </div>
      </div>
      <div class="log-item type2" v-else-if="item.type === 2">
        <div class="title flex-align">
          <div class="bg type-bg2"></div>
          <div class="type">上传附件</div>
          <img :src="avatarFormat(item)" class="avatar" />
          <div class="name">{{ item.operatorName ?? item.operator }}</div>
          <div class="time">{{ item.updateTime }}</div>
        </div>
        <div class="loginfo file-gap">
          <div class="arrow"></div>
          <div class="info flex-align">
            <div class="left" :class="[item.suffix ?? 'unknown']"></div>
            <div class="middle">
              <div class="top">
                {{
                  item.attachmentType === 1
                    ? '指定装箱附件'
                    : item.attachmentType === 2
                    ? '订单详情附件'
                    : '附件'
                }}-{{ item.fileName }}
              </div>
              <div class="bottom">{{ item.suffix }}</div>
            </div>
            <div class="right">
              <el-progress
                v-if="props.fileProgress[item.ossKey] < 100"
                type="circle"
                :stroke-width="2"
                :width="18"
                color="#02b96b"
                :percentage="props.fileProgress[item.ossKey]"
                :show-text="false"
                style="position: relative; top: -2px"
              >
                <i class="iconfont icon-piliangsousuo"></i>
              </el-progress>
              <el-popover
                v-else
                placement="right"
                popper-class="file-action"
                :width="50"
                :height="72"
                trigger="click"
              >
                <template #reference>
                  <i class="iconfont icon-piliangsousuo"></i>
                </template>
                <div>
                  <div class="action" @click="downloadFile(item)">下载</div>
                  <div class="action" @click="handleDelete(item)">删除</div>
                </div>
              </el-popover>
            </div>
          </div>
        </div>
        <!-- <div class="loginfo file-gap" v-for="file in item.attachmentList" :key="file.fileUrl">
          <div class="arrow"></div>
          <div class="info flex-align">
            <div class="left" :class="[file.suffix ?? 'unknown']"></div>
            <div class="middle">
              <div class="top">
                {{
                  file.attachmentType === 1
                    ? '指定装箱附件'
                    : file.attachmentType === 2
                    ? '订单详情附件'
                    : '附件'
                }}-{{ file.fileName }}
              </div>
              <div class="bottom">{{ file.suffix }}</div>
            </div>
            <div class="right">
              <el-popover
                placement="right"
                popper-class="file-action"
                :width="50"
                :height="72"
                trigger="click"
              >
                <template #reference>
                  <i class="iconfont icon-piliangsousuo"></i>
                </template>
                <div>
                  <div class="action" @click="downloadFile(file)">下载</div>
                  <div class="action" @click="handleDelete(file)" v-if="item.isLast === 1">
                    删除
                  </div>
                </div>
              </el-popover>
            </div>
          </div>
        </div> -->
      </div>
      <div class="log-item" v-else-if="item.type === 3">
        <div class="title flex-align">
          <div class="bg type-bg3"></div>
          <div class="type">订单备注</div>
          <img :src="avatarFormat(item)" class="avatar" />
          <div class="name">{{ item.operatorName ?? item.operator }}</div>
          <div class="time">{{ item.updateTime }}</div>
        </div>
        <div class="loginfo">
          <div class="arrow"></div>
          <div class="info2">
            <div class="info-text">{{ item.remark }}</div>
          </div>
        </div>
      </div>
      <div class="log-item" v-else>
        <div class="title flex-align">
          <div class="bg type-bg3"></div>
          <div class="type">{{ item.name }}</div>
          <img :src="avatarFormat(item)" class="avatar" />
          <div class="name">{{ item.operatorName ?? item.operator }}</div>
          <div class="time">{{ item.updateTime }}</div>
        </div>
        <div class="loginfo">
          <div class="arrow"></div>
          <div class="info2">
            <div class="info-text" :class="{ hide: item.operationType === 'sub_order' }">
              {{ item.remark }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="empty" v-if="logTypeArr.length === 0">
      <div class="flex-align flex-center">
        <EmptyAnimation name="emptyInfo" :width="128" :height="128" :loop="true" />
      </div>
      <div class="text">暂无操作记录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ logTypeArr: any[]; fileProgress?: any }>();
  const imgurl =
    'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png';
  const emit = defineEmits(['downloadFile', 'handleDelete']);

  const avatarFormat = (item) => {
    if (item.avatar === undefined || item.avatar === null || item.avatar === '') {
      return imgurl;
    }
    return item.avatar;
    // item.avatar !== null && item.avatar !== '' ? item.avatar : imgurl;
    // return imgurl;
  };
  const downloadFile = (item) => {
    emit('downloadFile', item);
    // item.downFileUrl = item.fileUrl;
    // console.log(item, props.logTypeArr);
  };

  const handleDelete = (item) => {
    // console.log('删除', item);
    emit('handleDelete', item);
  };

  // defineExpose({
  //   open,
  // });
</script>

<style scoped lang="scss">
  :deep(.el-progress-circle__track) {
    stroke: #ddd;
  }
  .flex-align {
    display: flex;
    align-items: center;
  }
  .empty {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 126px;
    .text {
      font-size: 14px;
      color: #999999;
      line-height: 22px;
    }
  }
  .log-item {
    padding-top: 10px;
    &:first-child {
      padding-top: 10px;
    }
    &:nth-last-child(1) {
      .loginfo {
        background-image: none;
      }
    }
    .title {
      line-height: 22px;
    }
    .avatar {
      margin-left: 30px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      border-radius: 50%;
    }
    .name {
      margin-left: 6px;
      font-size: 12px;
      color: #1f1f1f;
    }
    .time {
      margin-left: 12px;
      font-size: 12px;
      color: #999999;
    }
    .type-bg1 {
      background: url('@/assets/images/remark.png') no-repeat center;
    }
    .type-bg2 {
      background: url('@/assets/images/upload.png') no-repeat center;
    }
    .type-bg3 {
      background: url('@/assets/images/audit.png') no-repeat center;
    }
    .bg {
      background-size: cover;
      width: 14px;
      height: 14px;
    }
    .type {
      margin-left: 6px;
      font-size: 13px;
      font-family: 'PingFang SC Medium';
      color: #1f1f1f;
    }
    .loginfo {
      margin-left: 7px;
      margin-top: 4px;
      background: url('@/assets/images/line.svg') repeat-y left top;
      background-size: 2px 107px;
      // display: flex;
      // padding-top: 8px;
      // padding-bottom: 12px;
      padding-bottom: 18px;
      .arrow {
        height: 8px;
        margin-left: 14px;
        background-image: url('@/assets/images/arrowup.svg');
        background-repeat: no-repeat;
        background-position: 21px 3px;
        background-size: 10px 5px;
        // background-color: #f7f7f7;
      }
      &:first-child {
        .arrow {
          display: block;
        }
      }
      .info,
      .info2 {
        flex: 1 0;

        background-color: #f7f7f7;
        color: #000;
        font-size: 13px;
        line-height: 22px;
        padding: 12px 14px;
        padding-right: 15px;
        margin-left: 14px;
        border-radius: 6px;
      }
      .info2 {
        flex: 1 0;
        margin-left: 14px;
        background-color: white;
        padding: 0;
        .info-text {
          min-width: 50%;
          color: #000;
          font-size: 13px;
          line-height: 22px;
          padding: 12px 14px;
          // margin-left: 14px;
          border-radius: 6px;
          background-color: #f7f7f7;
          display: inline-block;
        }
        .hide {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
    .file-gap {
      padding-bottom: 0px;
      margin-top: 6px;
      .arrow {
        display: none;
      }
      // 规定属于其父元素的第二个子元素的 且 class 必须为 .file-gap
      // .file-gap:nth-child(2)
      &:nth-child(2) {
        margin-top: 4px;
        .arrow {
          display: block;
        }
      }
      &:last-child {
        // padding-bottom: 12px;
        padding-bottom: 20px;
      }
    }
    &.type2 {
      .info {
        width: 360px;
        height: 70px;
        color: #1f1f1f;
        .left {
          background-size: 26px 26px;
          width: 26px;
          height: 26px;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('@/assets/images/icon_unknown.svg');
        }
        .unknown {
          background-image: url('@/assets/images/icon_unknown.svg');
        }
        .xlsx,
        .xls {
          background-image: url('@/assets/images/icon_xlsx.svg');
        }
        .pptx,
        .pptx {
          background-image: url('@/assets/images/icon_pptx.svg');
        }
        .pdf {
          background-image: url('@/assets/images/icon_pdf.svg');
        }
        .txt {
          background-image: url('@/assets/images/icon_txt.svg');
        }
        .docx,
        .doc {
          background-image: url('@/assets/images/icon_docx.svg');
        }
        .jpg,
        .jpeg,
        .png,
        .svg {
          background-image: url('@/assets/images/icon_img.svg');
        }
        .zip,
        .gzip,
        .rar,
        .zip,
        .gz,
        .bz,
        .tar {
          background-image: url('@/assets/images/icon_yasuo.svg');
        }
        .middle {
          flex: 1 0;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          .top {
            font-size: 13px;
            line-height: 22px;
            width: 264px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .bottom {
            font-size: 12px;
            color: #999999;
            line-height: 20px;
            margin-top: 4px;
          }
        }
        .right {
          width: 24px;
          :global(.file-action) {
            min-width: 50px !important;
            padding: 4px 0 !important;
          }
          :global(.file-action .action) {
            font-size: 13px;
            line-height: 32px;
            color: #1f1f1f;
            text-align: center;
            cursor: pointer;
          }
          :global(.file-action .action:hover) {
            color: #f53f3f;
            background-color: #f5f5f5;
          }
          .icon-piliangsousuo {
            padding: 4px;
          }
          &:hover {
            background-color: white !important;
            cursor: pointer;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
