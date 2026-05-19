<template>
  <el-popover
    v-model:visible="countryFromSelectorVisible"
    placement="bottom"
    :width="200"
    trigger="click"
    popper-class="exchange-country-popover"
    @show="handleCountryPopoverShow"
  >
    <template #reference>
      <div class="exchange-country-selector-item">
        <div
          class="country-flag"
          :style="{
            backgroundImage:
              currentCountry.flag &&
              `url(https://flagcdn.com/${currentCountry.flag?.toLowerCase()}.svg)`,
          }"
        ></div>
        <span class="country-name">{{ currentCountry.code }}</span>
        <el-icon>
          <ArrowDown v-if="false" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2.33331 4.6665L6.99998 9.33317L11.6666 4.6665"
              stroke="#999999"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </el-icon>
      </div>
    </template>
    <div class="country-list">
      <div
        v-for="country in countryList"
        :key="country.code"
        class="country-item"
        :class="{ active: country.code === currentCountry.code }"
        @click="selectCountry(country)"
      >
        <div
          class="country-flag"
          :style="{
            backgroundImage:
              country.flag && `url(https://flagcdn.com/${country.flag?.toLowerCase()}.svg)`,
          }"
        ></div>
        <span class="country-text">{{ country.code }}-{{ country.name }}</span>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
  import { ArrowDown } from '@element-plus/icons-vue';
  import countryCode from '@/views/bi/decisionAnalysis/country-code.json';
  import { useReport } from '@/views/personalCenter/hooks/useReport';

  // 定义属性
  const props = defineProps<{
    list?: Array<{ name: string; code: string; flag: string }>;
    modelValue: string;
  }>();

  // 定义事件
  const emit = defineEmits(['update:modelValue']);

  // 国家选择器可见性
  const countryFromSelectorVisible = ref(false);

  // 国家列表数据
  const countryList = computed(
    () =>
      props.list || [
        { name: '美国', code: 'USD', flag: 'US' },
        { name: '中国', code: 'CNY', flag: 'CN' },
        { name: '日本', code: 'JPY', flag: 'JP' },
        { name: '英国', code: 'GBP', flag: 'GB' },
        { name: '德国', code: 'EUR', flag: 'DE' },
        { name: '加拿大', code: 'CAD', flag: 'CA' },
        { name: '澳大利亚', code: 'AUD', flag: 'AU' },
        { name: '法国', code: 'EUR', flag: 'FR' },
        { name: '俄罗斯', code: 'RUB', flag: 'RU' },
        { name: '印度', code: 'INR', flag: 'IN' },
        { name: '巴西', code: 'BRL', flag: 'BR' },
        { name: '墨西哥', code: 'MXN', flag: 'MX' },
        { name: '新加坡', code: 'SGD', flag: 'SG' },
        { name: '瑞士', code: 'CHF', flag: 'CH' },
        { name: '瑞典', code: 'SEK', flag: 'SE' },
        { name: '新西兰', code: 'NZD', flag: 'NZ' },
        { name: '泰国', code: 'THB', flag: 'TH' },
        { name: '马来西亚', code: 'MYR', flag: 'MY' },
        { name: '菲律宾', code: 'PHP', flag: 'PH' },
        { name: '印度尼西亚', code: 'IDR', flag: 'ID' },
        { name: '土耳其', code: 'TRY', flag: 'TR' },
        { name: '南非', code: 'ZAR', flag: 'ZA' },
      ]
  );

  // 当前选中国家
  const currentCountry = ref(
    (props.modelValue && countryList.value.find((item) => item.code === props.modelValue)) ||
      countryList.value[0]
  );

  // 选择国家
  const selectCountry = (country: any) => {
    currentCountry.value = country;
    emit('update:modelValue', country.code);
    countryFromSelectorVisible.value = false;
  };
  const { report } = useReport();
  const handleCountryPopoverShow = () => {
    report('国家选择弹窗', {
      special_topic_title: '外汇牌价',
      button_name: '国家选择',
    });
  };
</script>

<style scoped lang="scss">
  .exchange-country-selector-item {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #f5f7fa;
    }

    .country-name {
      margin-right: 4px;
      font-size: 14px;
      color: var(---N6, #999);
    }

    :deep(.el-icon) {
      font-size: 18px;
      color: var(---N6, #999);
      padding-left: 5px;
      font-weight: bold;

      svg {
        stroke: currentColor;
        stroke-width: 0.5;
      }
    }
  }

  .country-list {
    max-height: 300px;
    overflow-y: auto;

    .country-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;

      &:hover {
        background-color: var(--el-color-primary-light-9);
      }

      &.active {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }

      .country-text {
        font-size: 14px;
      }
    }
  }

  .country-flag {
    width: 21px;
    height: 14px;
    margin-right: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top left;
  }
</style>
