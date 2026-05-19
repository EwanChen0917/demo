<template>
  <el-dialog title="在线编辑装箱清单" :model-value="visible" @close="handleClose" width="80%">
    <div class="online-packing-header">
      <div class="boxNumber">
        <span class="boxNumberTip">总箱数：</span>
        <el-input-number
          :controls="false"
          v-model="totalBox"
          :min="1"
          :precision="0"
          placeholder="请输入"
        />
        <el-button type="primary" @click="sureBoxNumber(true)" text>确定</el-button>
      </div>
      <div class="auto-fill-btn">
        <el-button
          :disabled="!totalBox"
          type="primary"
          plain
          :loading="autoFillLoading"
          @click="autoFill({ skuDescList: orderList, totalBox: totalBox })"
        >
          自动填充
        </el-button>
      </div>
    </div>
    <OrderTable ref="orderTable" :orderList="orderList" :loading="listLoading" />
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button
        :loading="sureLoading"
        :disabled="!canSubmit || !totalBox"
        type="primary"
        @click="surePacking('')"
      >
        确定
      </el-button>
      <el-button
        :loading="sureLoading"
        :disabled="!canSubmit || !totalBox"
        type="primary"
        @click="surePacking('toBox')"
      >
        确认并制作箱唛
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import OrderTable from '@/views/productTools/logisticsTools/boxSupportTools/combinePack/components/OrderTable/index.vue';
  import { queryCombinePackPackageMark } from '@/views/productTools/logisticsTools/boxSupportTools/utils';
  import { ElMessage } from 'element-plus';

  const route = useRoute();
  const orderList = ref<any>([]);
  const listLoading = ref(false);
  const orderTable = ref<typeof OrderTable>();
  const { wsCache } = useCache('localStorage');
  const totalBox = ref<number | undefined>();
  const canSubmit = ref<boolean>(false);
  const props = defineProps<{
    visible: boolean;
  }>();
  const handleClose = () => {
    canSubmit.value = false;
    emit('close');
  };
  const sureBoxNumber = (canEdit: boolean) => {
    const arr: { prop: string; label: string; slotName?: string; canEdit?: boolean }[] = [];
    if (!totalBox.value) {
      ElMessage.error('请输入总箱数');
    } else {
      for (let i = 0; i < totalBox.value; i += 1) {
        arr.push({
          prop: `boxNumber${i + 1}`,
          label: `箱号${i + 1}`,
          slotName: `boxNumber${i + 1}`,
          canEdit,
        });
      }
      if (orderTable.value) {
        orderTable.value.tableColumnList = [...orderTable.value.initTableColumnList, ...arr] as any;
      }
      canSubmit.value = true;
    }
  };
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'getRecordCode', recordCode: string, toBox?: string): void;
  }>();
  /**
   * @description: 获取装箱单数据
   */
  const getTableList = async () => {
    // 单独装箱/合并装箱的ids
    if (route.query.id) {
      try {
        listLoading.value = true;

        const ids = route.query.id as string;
        const res = await erpApi.luteosErpPackageQueryChooseOrderList({
          orderIdList: ids.split(',').map((item) => Number(item)),
        });
        const extraData = [
          {
            referenceCodeL: '',
            orderCode: '',
            customerName: '',
            warehouseDesc: '',
            sku: '',
            skuShowDesc: '',
            qty: '毛重(Kg)',
            isExtraData: true,
          },
          {
            referenceCodeL: '',
            orderCode: '',
            customerName: '',
            warehouseDesc: '',
            sku: '',
            skuShowDesc: '',
            qty: '长(cm)',
            isExtraData: true,
          },
          {
            referenceCodeL: '',
            orderCode: '',
            customerName: '',
            warehouseDesc: '',
            sku: '',
            skuShowDesc: '',
            qty: '宽(cm)',
            isExtraData: true,
          },
          {
            referenceCodeL: '',
            orderCode: '',
            customerName: '',
            warehouseDesc: '',
            sku: '',
            skuShowDesc: '',
            qty: '高(cm)',
            isExtraData: true,
          },
        ];
        orderList.value = [];
        if (res.orderList) {
          res.orderList.map((i) => {
            i.skuDescList?.map((v: any) => {
              v.referenceCode = i.referenceCode;
              v.orderCode = i.orderCode;
              v.customerName = i.customerName;
              v.warehouseDesc = i.warehouseDesc;
              orderList.value?.push(v);
              return v;
            });
            return i;
          });
          if (orderList.value) {
            // 添加毛重等额外列
            orderList.value.push(...extraData);
          }
        }
        if (orderTable.value) {
          orderTable.value.tableColumnList = orderTable.value.initTableColumnList;
        }
      } finally {
        listLoading.value = false;
      }
    }
  };
  const sureLoading = ref(false);
  const surePacking = async (toBox?: string) => {
    sureLoading.value = true;
    const packageDetailList: any[] = [];
    const obj: any = {
      boxWeightList: [],
      boxLengthList: [],
      boxWidthList: [],
      boxHeightList: [],
      titleProperty: {
        referenceCode: orderList.value[0].referenceCode,
        orderCode: orderList.value[0].orderCode,
        customerName: orderList.value[0].customerName,
        totalBox: totalBox.value,
      },
      itemList: [],
      billCode: '',
    };
    obj.billCode = orderList.value[0].billCode;
    orderList.value?.forEach((i: any) => {
      if (i.qty === '毛重(Kg)') {
        Object.keys(i).forEach((k: any) => {
          if (k.startsWith('boxNumber')) {
            const value = i[k] ?? 0;
            if (value === 0) {
              return;
            }
            const boxNumber = k.replace('boxNumber', '');
            if (boxNumber > totalBox.value) {
              return;
            }
            obj.boxWeightList.push({
              boxNumber,
              grossWeight: i[k],
            });
          }
        });
        return;
      }
      if (i.qty === '长(cm)') {
        Object.keys(i).forEach((k: any) => {
          if (k.startsWith('boxNumber')) {
            const value = i[k] ?? 0;
            if (value === 0) {
              return;
            }
            const boxNumber = k.replace('boxNumber', '');
            if (boxNumber > totalBox.value) {
              return;
            }
            obj.boxLengthList.push({
              boxNumber,
              length: i[k],
            });
          }
        });
        return;
      }
      if (i.qty === '宽(cm)') {
        Object.keys(i).forEach((k: any) => {
          if (k.startsWith('boxNumber')) {
            const value = i[k] ?? 0;
            if (value === 0) {
              return;
            }
            const boxNumber = k.replace('boxNumber', '');
            if (boxNumber > totalBox.value) {
              return;
            }
            obj.boxWidthList.push({
              boxNumber,
              width: i[k],
            });
          }
        });
        return;
      }
      if (i.qty === '高(cm)') {
        Object.keys(i).forEach((k: any) => {
          if (k.startsWith('boxNumber')) {
            const value = i[k] ?? 0;
            if (value === 0) {
              return;
            }
            const boxNumber = k.replace('boxNumber', '');
            if (boxNumber > totalBox.value) {
              return;
            }
            obj.boxHeightList.push({
              boxNumber,
              height: i[k],
            });
          }
        });
        return;
      }
      const item = {
        recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
        referenceCode: i.referenceCode,
        orderCode: i.orderCode,
        customerName: i.customerName,
        totalBox: totalBox.value,
        qty: i.qty,
        sku: i.sku,
        quantity: i.qty,
        billCode: i.billCode,
        boxItemList: Object.keys(i).reduce((arr, key: string) => {
          if (key.includes('boxNumber')) {
            const boxPackageQty = i[key] ?? 0;
            if (boxPackageQty === 0) {
              return arr;
            }
            const boxNumber = Number(key.replace('boxNumber', '')) || 0;
            if (boxNumber > totalBox.value) {
              return arr;
            }
            return [
              ...arr,
              {
                boxNumber,
                boxPackageQty: i[key],
              },
            ];
          }
          return arr;
        }, []),
      };
      obj.itemList.push(item);
    });
    if (obj.itemList.length) {
      packageDetailList.push(obj);
    }
    const res = await erpApi
      .luteosErpPackageConfirmPackageOrder({
        recordCode:
          (route.query.recordCode as string | undefined) ?? wsCache.get('recordCode') ?? '',
        packageDetailList,
        packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
      })
      .finally(() => {
        sureLoading.value = false;
      });
    if (res) {
      wsCache.set('recordCode', res);
      if (toBox) {
        emit('getRecordCode', res as string, toBox);
      } else {
        emit('getRecordCode', res as string, '');
      }
    }
  };
  const getDetail = async () => {
    try {
      listLoading.value = true;
      const res = await queryCombinePackPackageMark(
        (route.query.recordCode as string) ?? wsCache.get('recordCode') ?? '',
        orderTable?.value,
        true
      );
      orderList.value = res;
      totalBox.value = res.totalBox;
      canSubmit.value = !!res.totalBox;
    } finally {
      listLoading.value = false;
    }
  };
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        if (route.query.recordCode || wsCache.get('recordCode')) {
          nextTick(() => {
            getDetail();
          });
        } else {
          getTableList();
        }
      }
    }
  );
  const autoFillLoading = ref(false);
  const autoFill = async (item: any) => {
    autoFillLoading.value = true;
    // index表示第几张箱。value表示第几张箱的装的sku
    const cache: string[][] = new Array(item.totalBox).fill(0).map(() => []);
    // 毛重列
    let weightColumn;
    // 长
    let longColumn;
    // 宽
    let widthColumn;
    // 高
    let heightColumn;
    item.skuDescList.forEach((r, i) => {
      if (r.isExtraData) {
        switch (true) {
          case r.qty.includes('毛重'):
            weightColumn = r;
            break;
          case r.qty.includes('长'):
            longColumn = r;
            break;
          case r.qty.includes('宽'):
            widthColumn = r;
            break;
          case r.qty.includes('高'):
            heightColumn = r;
            break;
          default:
            break;
        }
        return;
      }
      // 获取当前Sku的箱号
      const { sku } = r;
      cache.forEach((c, idx) => {
        const count = r[`boxNumber${idx + 1}`] || 0;
        if (count) {
          c.push(sku);
        }
      });
    });
    const skuList = cache.reduce((prev, current) => {
      if (current.length === 1) {
        return [...prev, current[0]];
      }
      return prev;
    }, []);
    if (skuList.length) {
      const res = await erpApi
        .luteosErpPackageQueryProductProperties({
          productList: skuList,
        })
        .finally(() => {
          autoFillLoading.value = false;
        });
      const { logisticsConfigMap } = res;
      cache.forEach((c, idx) => {
        if (c.length === 1) {
          // 自动填充数据
          const sku = c[0];
          const data = logisticsConfigMap[sku] || {};
          const boxKey = `boxNumber${idx + 1}`;
          // 毛重
          weightColumn[boxKey] = data.unitContainerWeight ?? 0;
          // 长
          longColumn[boxKey] = data.unitContainerLong ?? 0;
          // 宽
          widthColumn[boxKey] = data.unitContainerWidth ?? 0;
          // 高
          heightColumn[boxKey] = data.unitContainerHeight ?? 0;
        }
      });
    } else {
      autoFillLoading.value = false;
      ElMessage.error('不存在单独装箱的sku，无法自动填充');
    }
  };
</script>

<style lang="scss" scoped>
  .online-packing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .boxNumber {
    color: red;
    .boxNumberTip {
      position: relative;
      &::before {
        position: absolute;
        content: '*';
        color: red;
        font-size: 12px;
        top: -2px;
        left: -6px;
      }
    }
  }
</style>
