<template>
  <el-popover
    v-model:visible="isShowPopover"
    placement="bottom"
    trigger="click"
    :show-arrow="false"
  >
    <template #default>
      <div style="padding: 10px">
        <el-input v-model="searchColName" clearable @change="onSearchColNameChange" />
        <div class="jump-select-item-box">
          <div
            class="jump-select-item"
            :class="{
              'can-not-view': !+item.canView,
            }"
            v-for="item in showRecordList"
            :key="item.cellFieldName"
            @click="onSelectColumn(item.cellFieldName, item, false)"
          >
            <span v-if="!+item.canView">❌</span>
            <span v-html="item.showName"></span>
          </div>
        </div>
        <hr />
        <div class="jump-select-item-box">
          <div
            class="jump-select-item"
            :class="{
              'last-select': lastSelectCellFieldName === item.cellFieldName,
              'can-not-view': !+item.canView,
            }"
            v-for="item in showJumpList"
            :key="item.cellFieldName"
            @click="onSelectColumn(item.cellFieldName, item, true)"
          >
            <span v-if="!+item.canView">❌</span>
            <span v-html="item.showName"></span>
            <!--            {{ item.cellTag }}、{{ item.cellCnName }}-->
          </div>
        </div>
      </div>
    </template>
    <template #reference>
      <el-button style="padding: 9px" type="warning" plain>跳转列</el-button>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { escapeRegExp } from '@/views/budget/budgetTable/util/util';

  const isShowPopover = ref(false);
  const searchColName = ref(localStorage.getItem('searchColName') || '');
  const lastSelectCellFieldName = ref(localStorage.getItem('lastSelectCellFieldName') || '');

  const props = withDefaults(
    defineProps<{
      tableData: any;
      budgetStore: any;
    }>(),
    {
      tableData: {
        type: Object,
        required: true,
      },
      budgetStore: {
        type: Object,
        required: true,
      },
    }
  );

  const onSearchColNameChange = () => {
    localStorage.setItem('searchColName', searchColName.value);
  };

  const showJumpList = computed(() => {
    if (!isShowPopover.value) {
      return [];
    }
    let list = props.tableData.columns.filter((x) => !x.isExtendColumn);

    const searchText = searchColName.value.trim().toLowerCase();

    if (searchText) {
      list = searchColName.value.trim()
        ? list.filter(
            (x) =>
              (x.cellTag || '').toLowerCase().includes(searchText) ||
              (x.cellFieldName || '').toLowerCase().includes(searchText) ||
              (x.cellCnName || '').toLowerCase().includes(searchText)
          )
        : list;
    }
    // 1-12月份的，合并为一条
    // 格式为    xxxx_(1|2|3|4|5|6|7|8|9|10|11|12)月
    const reg = /(.*)_(1|2|3|4|5|6|7|8|9|10|11|12)月$/;
    const newList = [];
    const newSet = new Set();
    list.forEach((x) => {
      const match = x.cellCnName.match(reg);
      if (match) {
        const name = match[1];
        if (newSet.has(name)) {
          return;
        }
        newSet.add(name);
        newList.push({
          cellFieldName: x.cellFieldName,
          canView: x.canView,
          cellTag: x.cellTag,
          cellCnName: name,
        });
      } else {
        newSet.add(x.cellCnName);
        newList.push({
          cellFieldName: x.cellFieldName,
          canView: x.canView,
          cellTag: x.cellTag,
          cellCnName: x.cellCnName,
        });
      }
    });

    if (searchText) {
      newList.forEach((x) => {
        x.showName = `${x.cellTag}、${x.cellCnName}`.replace(
          new RegExp(escapeRegExp(searchText), 'gi'),
          '<span style="background-color: yellow;color: #000 !important;">$&</span>'
        );
      });
    } else {
      newList.forEach((x) => {
        x.showName = `${x.cellTag}、${x.cellCnName}`;
      });
    }

    return newList;
  });

  const onSelectColumn = (cellFieldName, item, isSaveRecord) => {
    isShowPopover.value = false;
    lastSelectCellFieldName.value = cellFieldName;
    localStorage.setItem('lastSelectCellFieldName', cellFieldName);

    isSaveRecord && addSelectRecord(item);

    const instance = props.budgetStore.getHotInstance();
    instance.scrollViewportTo(
      {
        row: 1,
        col: instance.propToCol(cellFieldName),
        verticalSnap: 'top',
        horizontalSnap: 'start',
      },
      () => {
        instance.selectCell(1, instance.propToCol(cellFieldName));
      }
    );
  };

  const getSelectRecordList = () => {
    try {
      const str = localStorage.getItem('selectRecordList');
      return JSON.parse(str) || [];
    } catch (e) {
      return [];
    }
  };
  const addSelectRecord = (item) => {
    item = {
      ...item,
      showName: `${item.cellTag}、${item.cellCnName}`,
    };
    let list = getSelectRecordList();
    list = list.filter((x) => x !== item.cellFieldName);
    list.unshift(item);
    if (list.length > 10) {
      list.length = 10;
    }
    showRecordList.value = list;
    localStorage.setItem('selectRecordList', JSON.stringify(list));
  };

  const showRecordList = ref(getSelectRecordList() || []);
</script>

<style scoped lang="scss">
  .jump-select-item-box {
    margin-top: 10px;
    max-width: 80vw;
    max-height: 70vh;
    overflow: auto;
    display: flex;
    gap: 2px;
    flex-wrap: wrap;

    .jump-select-item {
      padding: 2px 4px;
      margin: 2px 4px;
      border-radius: 4px;
      border: 1px solid #ccc;
      cursor: pointer;

      &:hover {
        background-color: var(--el-color-primary-light-9);
      }

      &.last-select {
        background-color: var(--el-color-primary);
        color: #fff;
      }

      &.can-not-view {
        background-color: #eee;
        cursor: not-allowed;
      }
    }
  }
</style>
