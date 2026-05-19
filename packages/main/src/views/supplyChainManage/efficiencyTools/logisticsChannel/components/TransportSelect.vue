<template>
  <el-select
    v-model="transportId"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="teleported"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
    @change="handleChange"
  >
    <el-option
      v-for="item in transportList"
      :key="item.id"
      :label="item.transportName"
      :value="item.id"
    />
  </el-select>
</template>
<script lang="ts">
  let transportListPromise: Promise<any[]> | null = null;
  let transportListCache: any[] | null = null;
</script>
<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';

  const emit = defineEmits(['changeWithLabel']);

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      maxCollapseTags?: number;
      querySource?: boolean;
      teleported?: boolean;
    }>(),
    {
      placeholder: '请选择',
      clearable: false,
      multiple: false,
      maxCollapseTags: 1,
      querySource: false,
      teleported: false,
    }
  );

  const transportId = ref();
  const transportList = ref();
  const handleChange = (val: string | string[]) => {
    if (Array.isArray(val)) {
      const selected = transportList.value.filter((item) => val.includes(item.id));
      emit('changeWithLabel', {
        value: val,
        label: selected.map((item) => item.transportName),
      });
    } else {
      const selected = transportList.value.find((item) => item.id === val);
      emit('changeWithLabel', {
        value: val,
        label: selected ? selected.transportName : '',
      });
    }
  };
  const getTransportList = async () => {
    if (transportListCache) {
      transportList.value = transportListCache;
      return;
    }
    if (!transportListPromise) {
      transportListPromise = erpApi
        .luteosErpLogisticsTransportQueryList({
          pageNum: 1,
          pageSize: 200,
          status: 1,
        })
        .then((res) => {
          transportListCache = res?.recordList || [];
          return transportListCache;
        });
    }

    // 物流方式列表
    transportList.value = await transportListPromise;
  };

  onMounted(() => {
    if (props.querySource) {
      getTransportList();
    } else {
      transportList.value = [
        { id: '海运加班船', transportName: '海运加班船' },
        { id: '海运快船', transportName: '海运快船' },
        { id: '海运普船', transportName: '海运普船' },
        { id: '卡航', transportName: '卡航' },
        { id: '空运', transportName: '空运' },
        { id: '快递', transportName: '快递' },
        { id: '欧洲海运', transportName: '欧洲海运' },
      ];
    }
  });
</script>

<style scoped lang="scss"></style>
