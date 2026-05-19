<template>
  <el-select
    v-model="shippingCode"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    :filter-method="handleFilter"
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
    @change="handleSelect"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
    allowAll
  >
    <template #empty>
      {{
        loading
          ? '数据加载中…'
          : filterKeyword
          ? '暂无匹配结果'
          : warehouseCode || !filterWarehouse
          ? '暂无数据'
          : '请先选择仓库'
      }}
    </template>
    <el-option-group v-for="sp in filteredSpInfos" :label="sp?.spName" :key="sp?.spCode">
      <el-option
        v-for="shipping of sp.shipInfos"
        :key="sp.spCode + ',' + shipping.smCode"
        :label="shipping.smNameCn"
        :value="sp.spCode + ',' + shipping.smCode"
      />
    </el-option-group>
  </el-select>
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { SpInfo } from '@/api/oms/data-contracts';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      warehouseCode?: string;
      clearable?: boolean;
      multiple?: boolean;
      teleported?: boolean;
      filterWarehouse?: boolean;
    }>(),
    {
      placeholder: '物流渠道',
      clearable: false,
      multiple: false,
      teleported: false,
      filterWarehouse: true,
    }
  );

  const emit = defineEmits<{
    (e: 'spChange', spCode?: string | undefined): void;
  }>();

  const shippingCode = ref<string | string[]>('');
  // 物流渠道
  const spInfos = ref<SpInfo[]>([]);
  const loading = ref(false);

  const filterKeyword = ref('');
  const normalize = (val: unknown) => (val ?? '').toString().trim().toLowerCase();
  const filteredSpInfos = computed(() => {
    const keyword = normalize(filterKeyword.value);
    // 有传入仓库 , 逻辑不变
    if (props.warehouseCode) {
      // console.log('props.warehouseCode', props.warehouseCode);
      if (!keyword) return spInfos.value;
      return spInfos.value
        .map((sp) => {
          const shipInfos = (sp.shipInfos || []).filter((ship) => {
            const name = normalize(ship.smNameCn);
            const code = normalize(ship.smCode);
            return name.includes(keyword) || code.includes(keyword);
          });
          return { ...sp, shipInfos };
        })
        .filter((sp) => (sp.shipInfos || []).length > 0);
    }
    // 没有传入仓库:  一开始 默认 最多显示 5组
    if (!keyword) return spInfos.value.filter((item, index) => index < 5);
    // if (!keyword) return spInfos.value;
    // 搜索 ,单个字符, 最多显示 10组
    let res = spInfos.value
      .map((sp) => {
        const shipInfos = (sp.shipInfos || []).filter((ship) => {
          const name = normalize(ship.smNameCn);
          const code = normalize(ship.smCode);
          return name.includes(keyword) || code.includes(keyword);
        });
        return { ...sp, shipInfos };
      })
      .filter((sp) => (sp.shipInfos || []).length > 0);
    if (keyword?.length === 1) {
      res = res.filter((item, index) => index < 10);
    }
    return res;
  });

  const handleFilter = (query: string) => {
    filterKeyword.value = query || '';
  };
  /** 全量渠道模式（未按仓库过滤）下，首次展开下拉再拉取，减轻进页主线程压力 */
  const isLazyAllShippingMode = () => !props.filterWarehouse && !props.warehouseCode;

  const handleVisibleChange = (visible: boolean) => {
    if (!visible) {
      filterKeyword.value = '';
      return;
    }
    if (isLazyAllShippingMode() && !spInfos.value.length && !loading.value) {
      queryShipping({ preserveSelection: true });
    }
  };
  const handleClear = () => {
    filterKeyword.value = '';
  };

  const queryShipping = async (options?: { preserveSelection?: boolean }) => {
    if (!props.warehouseCode && props.filterWarehouse) {
      spInfos.value = [];
      return;
    }
    try {
      loading.value = true;
      if (!options?.preserveSelection) {
        shippingCode.value = props.multiple ? [] : '';
      }
      if (props.warehouseCode) {
        const res = await omsApi.omsCommonWarehouseQueryWarehouseShipList({
          pageNum: 1,
          pageSize: 1000,
          warehouseCode: props?.warehouseCode,
        });
        spInfos.value =
          res?.warehouseShipList?.find((item) => item.warehouseCode === props.warehouseCode)
            ?.spInfos || [];
      } else {
        // const allSpInfos = res?.warehouseShipList?.flatMap((item) => item.spInfos) || [];
        // const spCodeSet = new Set<string>();
        // spInfos.value = allSpInfos.filter((sp) => {
        //   if (spCodeSet.has(sp.spCode)) {
        //     return false;
        //   }
        //   spCodeSet.add(sp.spCode);
        //   return true;
        // });
        const res2 = await omsApi.omsCommonWarehouseQueryAllShipping({
          pageNum: 1,
          pageSize: 1000,
        });
        spInfos.value = res2.shippingList.map((item) => {
          return { ...item, shipInfos: item.smInfos };
        });
      }
    } finally {
      loading.value = false;
    }
  };

  // 按仓库筛选、或必须先选仓库的模式：保持进页拉取；全量渠道则改为首次展开下拉再拉取
  if (props.warehouseCode || props.filterWarehouse) {
    queryShipping();
  }

  const spCode = ref('');
  const handleSelect = (value) => {
    let spCodes;
    if (value.split(',')?.length === 2) {
      spCodes = [value.split(',')?.[0]];
      const sp = spInfos.value?.find((item) => item.spCode == value.split(',')?.[0]);
      // console.log('承运商 ', sp);
      emit('spChange', sp.spCode, sp.spName);
      return;
    }
    // value = value.split(',')?.[1];
    // // 根据当前选中的 查找其所属的 spCode
    // const selected = Array.isArray(value) ? value : [value];
    // const spCodes = new Set(
    //   selected
    //     .map(
    //       (v) =>
    //         spInfos.value?.find((item) => item.shipInfos?.some((ship) => ship.smCode === v))?.spCode
    //     )
    //     .filter(Boolean) as string[]
    // );
    // const sp = new Set(
    //   selected
    //     .map(
    //       (v) =>
    //         spInfos.value?.find((item) => item.shipInfos?.some((ship) => ship.smCode === v))?.spCode
    //     )
    //     .filter(Boolean) as string[]
    // );

    // if (spCodes.size === 1) {
    //   const [firstSpCode] = spCodes;
    //   spCode.value = firstSpCode;
    //   emit('spChange', spCode.value, firstSp);
    //   return;
    // }

    spCode.value = '';
    emit('spChange', undefined);
  };

  watch(
    () => props.warehouseCode,
    () => {
      queryShipping();
    }
  );
</script>

<style scoped lang="scss"></style>
