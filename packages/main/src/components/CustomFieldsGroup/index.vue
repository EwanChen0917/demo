<template>
  <div class="groups">
    <div v-for="(item, index) in localProperty" :key="index">
      <div class="header" :class="{ sub: item.isSubtext }">
        <span class="title">{{ item.title }}</span>
        <span class="check-all" @click="allSelect(item)" v-if="!item.mode">
          {{ item.selectText }}
        </span>
      </div>
      <el-radio-group
        v-model="item.checkedArr[0]"
        :style="{ 'column-gap': `${gap}px !important` }"
        v-if="item.mode === 'single'"
      >
        <el-radio
          v-for="property in item.propertyArr"
          :key="property.key"
          :value="property.key"
          :disabled="property.readonly"
        >
          <OverflowTooltip :content="property.label" :line="1" />
        </el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-model="item.checkedArr"
        :style="{ 'column-gap': `${gap}px !important` }"
        v-else
      >
        <el-checkbox
          class="checkbox"
          v-for="property in item.propertyArr"
          :key="property.key"
          :value="property.key"
          @change="handleCheckboxChange(property)"
          :disabled="property.readonly"
        >
          <OverflowTooltip :content="property.label" :line="1" v-if="!property.tips" />
          <div v-else>
            <span>{{ property.label }}</span>
            <el-tooltip placement="top" :raw-content="true" :content="property.tips">
              <QuestionFilled
                class="question-icon"
                style="margin-top: 0px; margin-left: 10px; width: 18px"
              />
            </el-tooltip>
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    propertyListProp: any;
    gap?: any;
  }>();
  const allSelect = (item?: any) => {
    if (item.selectText === '取消全选') {
      // item.checkedArr = [];
      item.checkedArr = item.propertyArr
        .filter((citem) => citem.readonly === true)
        .map((citem) => citem.key);
    } else {
      // 全选
      item.checkedArr = item.propertyArr.map((citem) => citem.key);
    }
  };

  const localProperty = ref([]);
  // 初始化
  let initProperty;
  const init = () => {
    if (initProperty) {
      initProperty.forEach((item) => {
        if (!item.checkedArr) {
          item.checkedArr = item.propertyArr
            .filter((pitem) => pitem.checked)
            .map((citem) => citem.key);
        }
      });
      localProperty.value = initProperty;
    }
  };
  watch(
    () => props.propertyListProp,
    (newValue) => {
      // 当 props.propertyListProp 变化时，更新 localValue
      initProperty = newValue;
      init();
    },
    {
      immediate: true,
    }
  );
  const handleCheckboxChange = (val) => {
    // console.log(val);
    // 操作项的key
    const { key } = val;
    if (key === 'supplySku' || key === 'shortageFlag') {
      localProperty.value.forEach((item: any) => {
        if (item.title === '产品信息') {
          const checked = item?.checkedArr.includes(key);
          // console.log('选中状态', checked);
          // 产品信息 : 缺货与供应链SKU 联动 , 选其中一个 ,另一个也会选中
          if (checked) {
            // 有 shortageFlag ,没有 supplySku
            if (
              item.checkedArr.includes('shortageFlag') &&
              !item?.checkedArr.includes('supplySku')
            ) {
              item?.checkedArr.push('supplySku');
            }
            // 有 supplySku ,没有 shortageFlag
            if (
              item.checkedArr.includes('supplySku') &&
              !item?.checkedArr.includes('shortageFlag')
            ) {
              item?.checkedArr.push('shortageFlag');
            }
          } else {
            // 取消选中
            item.checkedArr = item?.checkedArr.filter(
              (citem) => citem !== 'supplySku' && citem !== 'shortageFlag'
            );
          }
        }
      });
    }
  };
  // 检查是否添加
  watchEffect(() => {
    localProperty.value.forEach((item) => {
      if (item.checkedArr.length === item.propertyArr.length) {
        item.selectText = '取消全选';
      } else {
        item.selectText = '全选';
      }
    });
  });

  // 恢复默认  全选
  const reset = () => {
    localProperty.value.forEach((item) => {
      if (item.mode === 'single') {
        item.checkedArr = [item.propertyArr.find((pitem) => pitem.defaultChecked).key]; // 给单选做重置用
      } else {
        item.checkedArr = item.propertyArr.map((citem) => citem.key);
      }
    });
  };

  const getResult = () => {
    //   返回所有未选中的key数组
    const result = [];
    localProperty.value?.forEach((item) => {
      item?.propertyArr?.forEach((citem) => {
        if (!item.checkedArr.includes(citem?.key)) {
          result.push(citem?.key);
        }
      });
    });
    return result;
  };

  defineExpose({
    reset,
    getResult,
  });
</script>

<style scoped lang="scss">
  .groups {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .header {
      display: flex;
      align-items: center;
      gap: 12px;

      .title {
        font-size: 14px;
        color: #1f1f1f;
        font-family: 'PingFang SC Medium';
        line-height: 22px;
        height: 22px;
      }

      .check-all {
        color: #02b96b;
        font-size: 12px;
        line-height: 20px;
        cursor: pointer;
      }
    }

    .sub {
      .title {
        font-size: 12px;
        color: #999999;
        font-family: 'PingFang SC';
        line-height: 20px;
        height: 20px;
      }
    }

    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 17px;
      margin-top: 12px;
    }

    :deep(.el-checkbox) {
      // flex-grow: 1;
      // max-width: calc((100% - 51px) / 4);
      width: 128px;
      margin-right: 0;
      height: unset;

      .el-checkbox__label {
        width: 106px;
        line-height: 22px;
        color: var(---N9, #1f1f1f);
        font-size: 13px;
      }
    }
  }
</style>
