<template>
  <el-dialog
    class="system-dialog"
    modal-class="system-overlay"
    title="自定义常用系统"
    width="748px"
    align-center
    v-model="visibility"
    :show-close="true"
    :before-close="resetData"
    :appendToBody="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="add">
      <span class="text">已添加</span>
      <span class="tip">长按拖拽调整顺序，最多可添加5个</span>
    </div>
    <!-- <ul class="system-list2">
      <li
        class="system-item"
        v-for="item in mySystemList"
        :key="item.materialCode"
        @click="handleDelSystem(item)"
      >
        <div class="system-icon">
          <img :src="item.materialImage" alt="" />
        </div>
        <div class="system-name">{{ item.materialName }}</div>
        <div class="minus-label"></div>
      </li>
    </ul> -->
    <draggable
      :list="mySystemList"
      item-key="materialCode"
      class="system-list2"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      :move="checkMove"
    >
      <template #item="{ element }">
        <li class="system-item is-draggable" :class="{ 'not-draggable': element.status == 2 }">
          <div class="system-icon">
            <img :src="element.materialImage" alt="" />
          </div>
          <div class="system-name">{{ element.materialName }}</div>
          <div
            class="minus-label"
            v-if="element.status != 2"
            @click="handleDelSystem(element)"
          ></div>
        </li>
      </template>
    </draggable>
    <div class="line"></div>
    <div class="tab-row">
      <!-- <div class="item" :class="{ active: tabIndex == 0 }" @click="changeTab(0, {})">全部工具</div>
      <div class="item" :class="{ active: tabIndex == 0 }" @click="changeTab(0, {})">全部工具</div>
      <div class="item" :class="{ active: tabIndex == 0 }" @click="changeTab(0, {})">全部工具</div>
      <div class="item" :class="{ active: tabIndex == 0 }" @click="changeTab(0, {})">全部工具</div>
      <div class="item" :class="{ active: tabIndex == 0 }" @click="changeTab(0, {})">全部工具</div> -->
      <div
        class="item"
        v-for="(item, index) in tabList"
        :class="{ active: tabIndex == index }"
        @click="changeTab(index, item)"
        :key="item.model"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="line2"></div>
    <div class="system-scroll">
      <ul class="system-list2 pt5">
        <li
          class="system-item"
          v-for="item in systemList"
          :key="item.materialCode"
          @click="handleAddSystem(item)"
        >
          <div class="system-icon">
            <img :src="item.materialImage" alt="" />
          </div>
          <div class="system-name">{{ item.materialName }}</div>
          <div class="add-label" v-show="!item.isCollect"></div>
        </li>
      </ul>
    </div>
    <template #footer>
      <span>
        <!-- {{ mySystemCode }}
        {{ systemCode }} -->
        <el-button @click="close" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="save" class="comfirm-btn" :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  // import { computed } from 'vue';
  import { personalCenterApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import draggable from 'vuedraggable';

  const emits = defineEmits<{
    (success: string);
  }>();
  // const props = defineProps<{
  //   systemListProp: any;
  // }>();
  const visibility = ref(false);
  const dragging = ref(false);
  const mySystemList = ref<any[]>([]);
  // 确定按钮状态
  const loading = ref(false);
  // 退出前 重置数据
  const resetData = async () => {
    visibility.value = false;
    init();
    tabIndex.value = 0;
  };
  // console.log('systemListProp', props.systemListProp);
  let navModelBeanList: any;
  const init = async () => {
    const res = await personalCenterApi.luteosMemberQueryMemberCollectSysList({
      platform: 'lute_erp',
    });
    if (res) {
      mySystemList.value = (res.collectSysList as []).map((item: any) => {
        item.disableSort = item.status === 2;
        return item;
      });
      navModelBeanList = res.navModelBeanList;
      // console.log(mySystemList.value);
    }
    queryAllSysTemList();
  };

  const checkMove = (e) => {
    const { draggedContext, relatedContext } = e || {};
    if (draggedContext?.element?.disableSort || relatedContext?.element?.disableSort) {
      return false;
    }
    return true;
  };

  init();
  const state = reactive<{
    tabIndex: any;
    tabList: any;
    systemList: any;
  }>({
    tabIndex: 0,
    tabList: [],
    systemList: [],
  });
  const { tabIndex, tabList, systemList } = toRefs(state);
  function changeTab(index?: any, item?: any) {
    tabIndex.value = index;
    // queryAllSysTemList(item.model);
    // queryMemberCollectSysListByModel(item);
    let tmp: any;
    if (navModelBeanList && navModelBeanList.length > 0) {
      if (item) {
        tmp = navModelBeanList.filter((navItem) => {
          return navItem.model === item.name;
        });
        systemList.value = tmp[0].systemNavList;
        // console.log(systemList.value);
      }
    } else {
      systemList.value = [];
    }
  }
  // 请求数字化系统列表  - 路特数字化工具查询
  async function queryAllSysTemList(model?: any) {
    const param: any = {};
    param.scene = 'common_sysnav';
    if (model) {
      param.model = model;
    }
    const systemRes = await personalCenterApi.luteosMemberQueryAllSysTemList(param);
    if (systemRes) {
      let tmp: any[] = [];
      // console.log(systemRes);
      if (systemRes.navModelBeanList && systemRes.navModelBeanList.length > 0) {
        tabList.value = systemRes;

        if (model) {
          systemRes.navModelBeanList.forEach((item) => {
            // console.log("item", item);
            tmp = tmp.concat(item.systemNavList);
          });
          // tmp = tmp.concat(tmp);
          // tmp = tmp.concat(tmp);
          // tmp = tmp.concat(tmp);
          // tmp = tmp.concat(tmp);
          // console.log("tmp",tmp);
          systemList.value = tmp;
        } else {
          // 首次进来 ,默认显示 第一项tab
          tmp = systemRes.navModelBeanList as [];
          const [first] = tmp;
          // console.log('first', first);
          systemList.value = (first as any).systemNavList;
        }
        tabList.value = systemRes.navModelBeanList;
      } else {
        systemList.value = [];
      }
      // console.log(systemList.value);
    }
  }

  // 删除常用系统
  const handleDelSystem = (delItem: any) => {
    // console.log(delItem);
    if (delItem.status === 2) {
      return;
    }
    const tmp = mySystemList.value.filter((item) => item.materialCode !== delItem.materialCode);
    mySystemList.value = tmp;
  };

  // 检查是否添加
  watchEffect(() => {
    const mySystemCode = mySystemList.value.map((item) => item.materialCode);
    // console.log('上方收藏', mySystemCode);
    for (let i = 0; i < systemList.value.length; i += 1) {
      const item = systemList.value[i];
      if (mySystemCode.includes(item.materialCode)) {
        item.isCollect = true;
      } else {
        item.isCollect = false;
      }
    }
    // console.log('下方系统', systemList.value);
  });

  // 添加常用系统
  const handleAddSystem = (addItem: any) => {
    // console.log(addItem);
    if (addItem.isCollect) {
      return;
    }
    if (mySystemList.value.length >= 8) {
      ElMessage.warning('最多可添加5个系统');
    } else {
      let isAdd = false;
      for (let i = 0; i < mySystemList.value.length; i += 1) {
        if (mySystemList.value[i].materialCode === addItem.materialCode) {
          isAdd = true;
        }
      }
      if (!isAdd) {
        mySystemList.value.push(addItem);
      } else {
        ElMessage.warning('不能重复添加系统');
      }
    }
  };
  const save = async () => {
    // console.log(mySystemList.value);
    // interface专门定义 对象的结构 , type 定义‌任意类型‌的别名,包括对象,数组
    // interface通过 extends 扩展 , type 通过 & 义交叉类型来扩展
    // interface 支持 声明合并, type 不支持
    interface IItem {
      collectFlag: number;
      itemCode: string;
      sort: number;
    }
    const sortArr = mySystemList.value.map((item, index) => {
      const newItem: IItem = {
        collectFlag: 1,
        itemCode: item.materialCode,
        sort: index,
      };
      return newItem;
    });
    // console.log(sortArr);
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);

    // {
    //   headers: { platform: 'lute_erp' },
    // }
    await personalCenterApi.luteosMemberBatchSaveSysCollect({
      collectScene: 'sys',
      itemList: sortArr,
      source: 'lute_erp',
    });
    loading.value = false;
    ElMessage.success('添加成功');
    emits('success');
    close();
  };

  const close = () => {
    visibility.value = false;
    resetData();
  };

  const open = () => {
    visibility.value = true;
    // queryLabelList();
  };
  defineExpose({ open });
</script>

<style lang="scss">
  .ghost {
    opacity: 0.5;
  }
  .is-draggable {
    cursor: move !important;
  }
  .not-draggable {
    cursor: not-allowed !important;
  }
  .system-overlay {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .system-dialog.el-dialog.is-align-center {
    padding: 0 24px 0 24px !important;
    // padding: 20px 0 0 0 !important;
    // height: 560px;
    background-color: white;
    .el-message--warning {
      --el-message-bg-color: white;
    }
    .el-dialog__header {
      // padding-bottom: 16px !important;
      padding-top: 20px !important;
      margin: 0 !important;
      .el-dialog__title {
        color: #1f1f1f;
        font-size: 16px;
        font-family: 'PingFang SC Medium';
        line-height: 24px;
        margin-bottom: 0 !important;
      }
      .el-dialog__headerbtn {
        top: 8px;
        right: 9px;
        .el-icon.el-dialog__close {
          width: 18px;
          height: 18px;
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .el-dialog__body {
      // height: 431px;
      padding: 0;
    }
    .el-dialog__footer {
      border-color: #ededed;
      text-align: right;
      padding-top: 16px !important;
      padding-bottom: 20px !important;
      .cancel-btn,
      .comfirm-btn {
        height: 32px;
        font-size: 14px;
        border-radius: 6px;
        padding-left: 15px;
        padding-right: 15px;
      }
      .cancel-btn {
        border: 1px solid #dedede;
        color: #1f1f1f;
        background: white;
        // margin-right: 12px;
      }
      .comfirm-btn {
        background-color: #02b96b;
        border-color: #02b96b;
      }
    }
    .add {
      line-height: 22px;
      padding-top: 20px;
      padding-bottom: 13px;
      display: flex;
      align-items: center;
      .text {
        font-size: 13px;
        color: #1f1f1f;
        font-family: 'PingFang SC Medium';
        padding-right: 10px;
      }
      .tip {
        font-size: 12px;
        color: #999999;
      }
    }
    .system-scroll {
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden;
      height: 215px;
      // border-bottom: solid 1px #ededed;
    }
    .system-list2 {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(8, 84px);

      // row-gap: 10px;
      gap: 4px;
      .system-item {
        padding: 7px 0;
        display: block;
        text-align: center;
        position: relative;
        border-radius: 6px;
        cursor: pointer;
        .system-icon {
          margin-bottom: 6px;
          font-size: 0;
          img {
            width: 34px;
            height: 34px;
            display: block;
            margin: 0 auto;
          }
        }
        .system-name {
          color: #1f1f1f;
          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
          width: 72px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 auto;
        }
        .minus-label,
        .add-label {
          position: absolute;
          top: -3px;
          right: 16px;
          width: 20px;
          height: 20px;
          background: url('@/layout/images/minus.png') no-repeat center;
          background-size: cover;
          cursor: pointer;
        }
        .add-label {
          background-image: url('@/layout/images/add.png');
        }
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
    .pt5 {
      padding-top: 5px;
    }
    .line {
      width: 700px;
      height: 6px;
      margin-top: 13px;
      background: #fafafa;
      // background-color: #02b96b;
    }
    .line2 {
      height: 5px;
    }
    .tab-row {
      // margin-top: 20px;
      // margin-bottom: 10px;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      // height: 63px;
      height: 28px;
      padding-top: 20px;
      // padding: 20px 0;
      padding-bottom: 15px;
      // box-sizing: border-box;
      box-sizing: content-box;
      .item {
        // padding: 3px 10px;
        padding: 0px 10px;
        margin-right: 7px;
        font-size: 13px;
        // line-height: 22px;
        height: 28px;
        line-height: 28px;
        display: inline-block;
        border-radius: 6px;
        &:hover {
          color: #02b96b;
          cursor: pointer;
        }
      }

      .active {
        background-color: #e8fff1;
        color: #02b96b;
        font-family: 'PingFang SC Medium';
      }
    }
  }
</style>
