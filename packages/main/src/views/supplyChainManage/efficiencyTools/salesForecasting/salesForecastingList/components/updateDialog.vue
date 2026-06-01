<template>
  <el-dialog title="更新预测" align-center v-model="visibility" width="80%" :before-close="close">
    <el-form :model="form" ref="formRef" scroll-to-error>
      <el-table border max-height="500px" :data="form.dataList" class-name="table-row-dashed">
        <el-table-column fixed="left" min-width="336">
          <template #header>
            <div>
              <span>产品名称/</span>
              <span v-if="[1, 3].includes(forecastType)">产品SKU</span>
              <span v-else>在线商品编码</span>
            </div>
          </template>
          <template #default="{ row }">
            <GoodsInfo
              hide-image
              :title="row.productName"
              :subtitle="[1, 3].includes(forecastType) ? row.skuCode : row.onlineSkuCode"
              copyTitle
              copySubtitle
            />
          </template>
        </el-table-column>
        <el-table-column prop="spuCode" label="产品SPU" width="155" v-if="forecastType !== 3">
          <template #default="{ row }">
            <div>
              <span>{{ row.spuCode }}</span>
              <Copy :content="row.spuCode" />
            </div>
          </template>
        </el-table-column>
        <el-table-column width="155" prop="salesStatusDesc" label="销售状态">
          <template #default="{ row }">
            <Tag
              :color="
                forecastType === 1
                  ? statusColorMap[row.salesStatus]
                  : saleStatusColorMap[row.salesStatus]
              "
            >
              {{ row.salesStatusDesc }}
            </Tag>
          </template>
        </el-table-column>
        <!--        <el-table-column width="140px" prop="skuLabelsDesc" label="在线商品标签" />-->
        <template v-if="forecastType !== 3">
          <el-table-column prop="channelDesc" min-width="100" label="渠道">
            <template #default="{ row }">
              <el-tag type="info">
                {{ row.channelDesc }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="country" label="站点" min-width="100">
            <template #default="{ row }">
              <el-tag type="info">
                {{ row.country }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="shop" label="店铺账号" />
        </template>
        <el-table-column prop="operatorName" label="运营" min-width="150">
          <template #default="{ row }">
            <el-tag v-if="row.operatorName" round type="info">
              <SvgIcon icon="fullUser" class="me-1" />
              <span>{{ row.operatorName }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastWeekSales" label="上周销量" v-if="forecastType !== 3" />
        <template v-if="form.dataList?.length">
          <el-table-column
            width="140px"
            :label="column.week"
            :key="column.week"
            v-for="(column, index) of form.dataList[0]?.salesForecastItemWeekBeanList"
          >
            <template #default="{ $index }">
              <el-form-item
                style="margin: 0"
                :prop="`dataList[${$index}].salesForecastItemWeekBeanList[${index}].value`"
                :rules="[{ required: true, message: '' }]"
              >
                <NumberInput
                  v-model="form.dataList[$index].salesForecastItemWeekBeanList[index].value"
                  :precision="0"
                  :min="0"
                  :max="999999"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <template v-if="forecastType === 3">
            <el-table-column
              width="140px"
              :label="column.month"
              :key="column.month"
              v-for="(column, index) of form.dataList[0]?.salesForecastItemInventoryMonthBeanList"
            >
              <template #default="{ $index }">
                <el-form-item
                  style="margin: 0"
                  :prop="`dataList[${$index}].salesForecastItemInventoryMonthBeanList[${index}].value`"
                  :rules="[{ required: true, message: '' }]"
                >
                  <NumberInput
                    v-model="
                      form.dataList[$index].salesForecastItemInventoryMonthBeanList[index].value
                    "
                    :precision="0"
                    :min="0"
                    :max="999999"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </template>
          <template v-if="forecastType !== 3">
            <el-table-column
              width="140px"
              :label="column.incrName"
              :key="column.incrName"
              v-for="(column, index) of form.dataList[0]?.activeIncrList?.filter(
                (item) => item?.incrName
              )"
            >
              <template #default="{ $index }">
                <el-form-item
                  style="margin: 0"
                  :prop="`dataList[${$index}].activeIncrList[${index}].incrValue`"
                  :rules="[{ required: true, message: '' }]"
                >
                  <NumberInput
                    v-model="form.dataList[$index].activeIncrList[index].incrValue"
                    :precision="0"
                    :min="0"
                    :max="999999"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </template>
        </template>
        <el-table-column align="left" label="操作" width="80px" fixed="right">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '自动填充',
                  key: 'autoComplete',
                  type: 'primary',
                  text: true,
                  row,
                },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <template #footer>
      <span>
        <el-button text @click="autoComplete">全部自动填充</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="confirm">确定提交</el-button>
        <el-button @click="close">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import { ElMessage } from 'element-plus';

  const visibility = ref(false);
  const form = ref({
    dataList: [],
  });
  const formRef = ref();
  const saleStatusColorMap = ref({
    1: 'green',
    2: 'red',
  });
  const statusColorMap = ref({
    1: 'gray',
    2: 'green',
    3: 'yellow',
    4: 'red',
  });

  const handleActions = (item: any) => {
    const { key, row } = item;
    if (key === 'autoComplete') {
      row.salesForecastItemWeekBeanList.forEach((element, index) => {
        if (index > 0) {
          element.value = row.salesForecastItemWeekBeanList[0].value;
        }
      });
      row.activeIncrList?.forEach((element, index) => {
        element.incrValue = row.salesForecastItemWeekBeanList[0].value;
      });
      // 零售与渠道
      row.salesForecastItemInventoryMonthBeanList?.forEach((element, index) => {
        element.value = row.salesForecastItemWeekBeanList[0].value;
      });
    }
  };
  const autoComplete = () => {
    form.value.dataList.forEach((row) => {
      row.salesForecastItemWeekBeanList.forEach((element, index) => {
        if (index > 0) {
          element.value = row.salesForecastItemWeekBeanList[0].value;
        }
      });

      row.activeIncrList?.forEach((element, index) => {
        element.incrValue = row.salesForecastItemWeekBeanList[0].value;
      });

      // 零售与渠道
      row.salesForecastItemInventoryMonthBeanList?.forEach((element, index) => {
        element.value = row.salesForecastItemWeekBeanList[0].value;
      });
    });
  };

  const forecastType = ref(); // 3: 零售与渠道
  const open = (row: any, type: number) => {
    form.value.dataList = cloneDeep(row);
    forecastType.value = type;
    visibility.value = true;
  };
  const close = () => {
    form.value.dataList = [];
    visibility.value = false;
  };
  const emits = defineEmits(['success']);
  const confirmLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      confirmLoading.value = true;
      if (forecastType.value === 3) {
        await erpApi
          .luteosErpRetailSaleForecastUpdateAndSubmit({
            code: form.value.dataList[0].code,
            itemList: form.value.dataList.map((item) => {
              return {
                id: item.id,
                weekBeanList: item.salesForecastItemWeekBeanList,
                salesForecastItemInventoryMonthBeanList:
                  item.salesForecastItemInventoryMonthBeanList,
              };
            }),
          })
          .finally(() => {
            confirmLoading.value = false;
          });
      } else {
        await erpApi
          .luteosErpSaleForecastV2UpdateAndSubmit({
            type: forecastType.value,
            itemList: form.value.dataList.map((item) => {
              return forecastType.value === 1
                ? {
                    id: item.id,
                    channel: item.channel,
                    country: item.country,
                    skuCode: item.skuCode,
                    weekBeanList: item.salesForecastItemWeekBeanList,
                    activeIncrList: item.activeIncrList,
                  }
                : {
                    id: item.id,
                    channel: item.channel,
                    country: item.country,
                    skuCode: item.skuCode,
                    onlineSkuCode: item.onlineSkuCode,
                    weekBeanList: item.salesForecastItemWeekBeanList,
                    activeIncrList: item.activeIncrList,
                  };
            }),
          })
          .finally(() => {
            confirmLoading.value = false;
          });
      }

      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
