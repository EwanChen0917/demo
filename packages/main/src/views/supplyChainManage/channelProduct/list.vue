<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="商品SPU/产品SKU/供应链SKU"
        style="width: 325px"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="handleExport" :loading="exportLoading">
        导出
      </el-button>
      <el-button type="primary" :loading="importLoading" class="import-btn" @click="uploadFile">
        导入
      </el-button>
    </template>
    <vxe-table
      border
      resizable
      show-footer
      ref="xTable"
      max-height="1200"
      align="center"
      class="custom-table"
      v-loading="listLoading"
      :print-config="{}"
      :column-config="{ width: 150 }"
      :data="tableData"
      row-id="productSku"
      @checkbox-change="handleSelectionChange"
      @checkbox-all="handleSelectionChange"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-colgroup title="">
        <vxe-colgroup title="图片">
          <vxe-table-column title="Picture (300 dpi)" field="productUrl">
            <template #default="{ row }">
              <span v-if="row.productUrlDesc">{{ row.productUrlDesc }}</span>
              <el-image
                v-else-if="row.productUrl"
                style="width: 50px; height: 50px"
                :src="row.productUrl"
                :fit="fit"
              />
            </template>
          </vxe-table-column>
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="SPU">
          <vxe-colgroup title="SPU" field="productSpu" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="SKU">
          <vxe-colgroup title="SKU" field="skuCode" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="SKU名称">
          <vxe-colgroup title="SKU名称" field="skuName" />
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="">
        <vxe-colgroup title="料号/SKU（必填）">
          <vxe-colgroup
            title="Product Part Number/Supplier code"
            field="productSku"
            width="280px"
          />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="采购价格（核算利润使用）" field="purchasePrice" width="200px" />
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="建议零售价（美元）">
          <vxe-colgroup title="MSRP（USD）" field="suggestPrice" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="EAN码/新料号">
          <vxe-colgroup title="EAN 13 Code on G/B" field="eanCode" width="180px" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="EAN 14">
          <vxe-colgroup title="EAN 14" field="eanCode14" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="海关编码">
          <vxe-colgroup title="Commodity Code" field="commodityCode" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="产品Model">
          <vxe-colgroup title="Model Reference" field="modelReference" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="物料描述">
          <vxe-colgroup title="Product Name" field="materialDesc" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="彩盒内的所有产品以及配件">
          <vxe-colgroup
            title="Accessories including in a G/B"
            field="accessories"
            width="220px"
            show-overflow
          />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="卖点以及规格">
        <vxe-colgroup title="卖点">
          <vxe-colgroup title="Selling Point" field="sellingPoint" show-overflow />
        </vxe-colgroup>
        <vxe-colgroup title="线上产品全称">
          <vxe-colgroup
            title="Online product full name"
            field="onlineProductFullName"
            width="220px"
            show-overflow
          />
        </vxe-colgroup>
        <vxe-colgroup title="在线完整产品规格（要点）">
          <vxe-colgroup
            title="Online full Product specs (bullet point)"
            field="onlineFullProductSpecs"
            width="280px"
            show-overflow
          />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="产品状态">
          <vxe-colgroup title="product status" field="productStatus" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="">
        <vxe-colgroup title="品牌">
          <vxe-colgroup title="Brand" field="brand" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="硬件参数信息">
        <vxe-colgroup title="输入">
          <vxe-colgroup title="input" field="input" />
        </vxe-colgroup>
        <vxe-colgroup title="输出">
          <vxe-colgroup title="output" field="output" />
        </vxe-colgroup>
        <vxe-colgroup title="最大负载功率">
          <vxe-colgroup title="Maximum load power" field="maximumLoadPower" width="180px" />
        </vxe-colgroup>
        <vxe-colgroup title="最大负载电流">
          <vxe-colgroup title="Max load current" field="maxLoadCurrent" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="壳体包装信息">
        <vxe-colgroup title="产品包装信息">
          <vxe-colgroup title="壳体">
            <vxe-colgroup title="材质">
              <vxe-colgroup title="Material" field="material" show-overflow />
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="产品">
            <vxe-colgroup title="尺寸（长mm）不含包装">
              <vxe-colgroup
                title="Product Dimension（L）--do not including packaging /G/B(mm)"
                field="productNetLength"
                width="200px"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="尺寸（宽mm）不含包装">
              <vxe-colgroup
                title="Product Dimension（W）--do not including packaging /G/B(mm)"
                field="productNetWide"
                width="200px"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="尺寸（高mm）不含包装">
              <vxe-colgroup
                title="Product Dimension（H）--do not including packaging /G/B(mm)"
                field="productNetHeight"
                width="200px"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="产品净重">
              <vxe-colgroup
                title="Product Net Weight（g）Including packaging G/B"
                field="productNetWeight"
                show-overflow
              />
            </vxe-colgroup>
          </vxe-colgroup>

          <vxe-colgroup title="包装（彩盒+产品）">
            <vxe-colgroup title="尺寸（长）含包装）">
              <vxe-colgroup
                title="Product Dimension（L）including packaging /G/B"
                field="productLength"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="尺寸（宽）含包装）">
              <vxe-colgroup
                title="Product Dimension（W）including packaging /G/B"
                field="productWide"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="尺寸（高）含包装）">
              <vxe-colgroup
                title="Product Dimension（H）including packaging /G/B"
                field="productHeight"
                show-overflow
              />
            </vxe-colgroup>
            <vxe-colgroup title="产品毛重">
              <vxe-colgroup
                title="Product Gross Weight（g）Including packaging / G/B"
                field="productWeight"
                show-overflow
              />
            </vxe-colgroup>
          </vxe-colgroup>

          <vxe-colgroup title="外箱">
            <vxe-colgroup title="数量">
              <vxe-colgroup title="Quantity in a carton" field="quantity" />
            </vxe-colgroup>
            <vxe-colgroup title="重量(毛重)">
              <vxe-colgroup title="Master carton Gross Weight（g）" field="masterCartonWeight" />
            </vxe-colgroup>
            <vxe-colgroup title="长(cm)">
              <vxe-colgroup title="Master Carton Dimension（L）" field="masterCartonLength" />
            </vxe-colgroup>
            <vxe-colgroup title="宽(cm)">
              <vxe-colgroup title="Master Carton Dimension（W）" field="masterCartonWide" />
            </vxe-colgroup>
            <vxe-colgroup title="高(cm)">
              <vxe-colgroup title="Master Carton Dimension（H）" field="masterCartonHeight" />
            </vxe-colgroup>
            <vxe-colgroup title="重量（净重）">
              <vxe-colgroup title="Master Carton Net Weight（g）" field="masterCartonNetWeight" />
            </vxe-colgroup>
          </vxe-colgroup>
        </vxe-colgroup>

        <vxe-colgroup title="包装回收">
          <vxe-colgroup title="回收总包装（产品包装+外包装）重量（克）">
            <vxe-colgroup title="Recycling Packaging Weight (g)" field="recyclePackagingWeight" />
          </vxe-colgroup>
          <vxe-colgroup title="回收单位（产品）：纸板重量（克）">
            <vxe-colgroup
              title="Recycling units: cardboard weight (g)"
              field="recycleUnitsCardboardWeight"
            />
          </vxe-colgroup>
          <vxe-colgroup title="回收单位（产品）：塑料重量（克）">
            <vxe-colgroup
              title="Recycling units: plastic weight (g)"
              field="recycleUnitsPlasticWeight"
            />
          </vxe-colgroup>
          <vxe-colgroup title="回收单位：外包装纸板重量（克）">
            <vxe-colgroup
              title="Recycling units: outer pack cardboard weight (g)"
              field="recycleUnitsOuterCardboardWeight"
            />
          </vxe-colgroup>
          <vxe-colgroup title="回收单位：外包装塑料重量（克）">
            <vxe-colgroup
              title="Recycling units: outer pack plastic weight (g)"
              field="recycleUnitsOuterPlasticWeight"
            />
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="装运信息">
        <vxe-colgroup title="托盘装运">
          <vxe-colgroup title="托盘高度/类型">
            <vxe-colgroup title="Pallet Hight/Type" field="palletHeightOrType" />
          </vxe-colgroup>

          <vxe-colgroup title="托盘重量">
            <vxe-colgroup title="Pallet Weight" field="palletWeight" />
          </vxe-colgroup>

          <vxe-colgroup title="托盘每层摆多少箱（长*宽）">
            <vxe-colgroup title="Pallet Ti" field="palletTi" />
          </vxe-colgroup>

          <vxe-colgroup title="托盘摆几层（高）">
            <vxe-colgroup title="Pallet Hi" field="palletHi" />
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="电池信息">
        <vxe-colgroup title="电池">
          <vxe-colgroup title="产品是否含有电池">
            <vxe-colgroup title="Contains Battery Y/N" field="containsBattery" />
          </vxe-colgroup>

          <vxe-colgroup title="电池是否内置">
            <vxe-colgroup title="Battery contained inside product? Y/N" field="batteryContained" />
          </vxe-colgroup>

          <vxe-colgroup title="电池尺寸">
            <vxe-colgroup title="Battery Sizes (L*W*H)" field="batterySizes" />
          </vxe-colgroup>

          <vxe-colgroup title="电池类型">
            <vxe-colgroup title="Battery Types" field="batteryTypes" />
          </vxe-colgroup>

          <vxe-colgroup title="电压">
            <vxe-colgroup title="Voltage" field="voltage" />
          </vxe-colgroup>

          <vxe-colgroup title="电池数量">
            <vxe-colgroup title="No of Batteries" field="batteriesNum" />
          </vxe-colgroup>

          <vxe-colgroup title="一个电池的重量（克）">
            <vxe-colgroup title="Unit Battery Weight (grams)" field="unitBatteryWeight" />
          </vxe-colgroup>

          <vxe-colgroup title="续航（年）">
            <vxe-colgroup title="Endurance (year)" field="endurance" />
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="认证信息">
        <vxe-colgroup title="认证">
          <vxe-colgroup title="认证产品名称（英文）">
            <vxe-colgroup
              title="Certified Product Name (English)"
              field="certifiedProductName"
              show-overflow
            />
          </vxe-colgroup>

          <vxe-colgroup title="认证类型">
            <vxe-colgroup title="Certification Name" field="certificationName" show-overflow />
          </vxe-colgroup>

          <vxe-colgroup title="认证地址">
            <vxe-colgroup
              title="Certification Address"
              field="certificationAddress"
              show-overflow
            />
          </vxe-colgroup>
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="起订量和交货时间">
        <vxe-colgroup title="每个 Sku 的最小起订或 £ 价值">
          <vxe-colgroup
            title="MOQ per Sku i.e Order QTY or £ Value"
            field="skuOrderMin"
            show-overflow
          />
        </vxe-colgroup>

        <vxe-colgroup title="从订单日期起的英国交货提前期">
          <vxe-colgroup title="UK Delivery Lead Time from order date" field="deliveryLeadTime" />
        </vxe-colgroup>

        <vxe-colgroup title="每个 Sku 的 FOB 最小起订量，即订单数量或 $ 价值">
          <vxe-colgroup
            title="FOB MOQ per Sku i.e Order QTY or $ Value"
            field="fobSkuOrderMin"
            show-overflow
          />
        </vxe-colgroup>

        <vxe-colgroup title="从订单日期起的 FOB 交货提前期">
          <vxe-colgroup
            title="FOB Delivery Lead Time from order date"
            field="fobDeliveryLeadTime"
          />
        </vxe-colgroup>

        <vxe-colgroup title="最小起订类型">
          <vxe-colgroup title="BDCM type if available" field="orderMinBoxType" show-overflow />
        </vxe-colgroup>

        <vxe-colgroup title="最小起订箱数">
          <vxe-colgroup title="BDCM Qty" field="orderMinBoxNum" />
        </vxe-colgroup>
      </vxe-colgroup>

      <vxe-colgroup title="质保">
        <vxe-colgroup title="英国制造商保修（以月为单位">
          <vxe-colgroup
            title="UK Manufacturer Warranty (in months)"
            field="ukManufacturerWarranty"
          />
        </vxe-colgroup>

        <vxe-colgroup title="英国消费者保修（以月为单位）">
          <vxe-colgroup title="UK Consumer Warranty (in months)" field="ukConsumerWarranty" />
        </vxe-colgroup>

        <vxe-colgroup title="求助热线联系方式（电话和电子邮件）">
          <vxe-colgroup title="Helpline contact details (phone & e-mail)" field="helplineContact" />
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-column title="操作" fixed="right">
        <template #default="{ row, $rowIndex }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '删除',
                key: 'del',
                type: 'primary',
                text: true,
                row: row,
                hide: $rowIndex === 0,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </vxe-column>
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <UploadFileModal
      v-if="uploadVisible"
      :visible="uploadVisible"
      @close="
        () => {
          uploadVisible = false;
        }
      "
      @save="handleUploadSuccess"
    />
  </KeenList>
</template>

<script lang="ts" setup name="channelProductList">
  import SvgIconSearch from '@/components/SvgIcon/SvgIconSearch.vue';
  import { channelProductApi, ChannelProductApi } from '@/api/index';
  import useList from '@/hooks/list/useList';
  import { useRequest } from 'vue-request';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import UploadFileModal from './Modal/UploadFileModal.vue';

  const router = useRouter();

  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    ChannelProductApi.LuteosChannelProductQueryProductList.RequestQuery,
    ChannelProductApi.LuteosChannelProductQueryProductList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: 10,
    service: channelProductApi.luteosChannelProductQueryProductList,
  });

  const tableData = ref([]);
  watch(
    () => listData,
    async (val) => {
      // 设置默认第一行数据
      const data: any = {
        isShowData: true,
        productUrlDesc: '产品经理',
        productSpu: '产品经理',
        productSku: '产品经理',
        skuCode: '产品经理',
        skuName: '产品经理',
        purchasePrice: '运营',
        suggestPrice: '运营',
        commodityCode: '供应链',
        materialDesc: '运营',
        accessories: '产品',
        sellingPoint: '产品',
        onlineProductFullName: '运营',
        onlineFullProductSpecs: '产品',
        productStatus: '产品',
        brand: '产品',
        input: '产品',
        output: '产品',
        maximumLoadPower: '产品',
        maxLoadCurrent: '产品',
        material: '产品',
        productNetLength: '产品',
        productNetWide: '产品',
        productNetHeight: '产品',
        productNetWeight: '产品',
        productLength: '产品',
        productWide: '产品',
        productHeight: '产品',
        productWeight: '产品',
        quantity: '产品',
        masterCartonWeight: '产品',
        masterCartonLength: '产品',
        masterCartonWide: '产品',
        masterCartonHeight: '产品',
        masterCartonNetWeight: '产品',
        recyclePackagingWeight: '供应链',
        recycleUnitsPlasticWeight: '供应链',
        recycleUnitsCardboardWeight: '供应链',
        recycleUnitsOuterCardboardWeight: '供应链',
        recycleUnitsOuterPlasticWeight: '供应链',
        palletHeightOrType: '供应链',
        palletWeight: '供应链',
        palletTi: '供应链',
        palletHi: '供应链',
        containsBattery: '产品',
        batteryContained: '产品',
        batterySizes: '产品',
        batteryTypes: '产品',
        voltage: '产品',
        batteriesNum: '产品',
        unitBatteryWeight: '产品',
        endurance: '产品',
        certifiedProductName: '产品',
        certificationName: '合规',
        certificationAddress: '合规',
        skuOrderMin: '合规',
        ukManufacturerWarranty: '客服',
        ukConsumerWarranty: '客服',
        helplineContact: '客服',
      };
      tableData.value = [data, ...(val.value?.productList || [])];
    },
    { immediate: false, deep: true }
  );

  const productSkuList = ref([]);
  const handleSelectionChange = ({ records }) => {
    productSkuList.value = [];
    records.forEach((item) => {
      if (!item.isShowData) {
        productSkuList.value.push(item.productSku);
      }
    });
  };

  const handleExport = () => {
    exportRun({
      ...search.value,
      pageNum: current.value,
      pageSize: pageSize.value,
      productSkuList: productSkuList.value,
    });
  };

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    channelProductApi.luteosChannelProductExportProduct,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        router.push({
          path: '/downloadmanage',
          query: {
            app_code: d?.appCode,
            module_code: d?.moduleCode,
            record_type: 2,
          },
        });
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );

  // 文件上传
  const uploadVisible = ref<boolean>(false);
  const uploadFile = () => {
    uploadVisible.value = true;
  };
  const importLoading = ref(false);
  const handleUploadSuccess = (files) => {
    uploadVisible.value = false;
    // 获取文件信息
    const file = files[files.length - 1];
    importLoading.value = true;
    // 导入
    channelProductApi
      .luteosChannelProductImportData({
        fileName: file.name,
        importScene: 'channel_product',
        key: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        runQuery();
        if (+res.failedCount > 0) {
          const isConfirmed = await swal.confirm({
            title: '有线下渠道商品导入失败，具体请前往上传日志查看',
            icon: 'error',
            confirmButtonText: '去查看',
            cancelButtonText: '知道了',
          });
          if (!isConfirmed) return;
          openWindow('/salesForecastingLog');
        } else {
          ElMessage.success('导入成功');
        }
      })
      .finally(() => {
        importLoading.value = false;
        uploadVisible.value = false;
      });
  };

  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'del') {
      const isConfirmed = await swal.delConfirm();
      if (!isConfirmed) return;
      channelProductApi
        .luteosChannelProductDelete({
          productSku: row.productSku,
        })
        .then(() => {
          ElMessage.success('删除成功');
          runQuery();
        });
    }
  };
</script>

<style scoped lang="scss">
  .custom-table {
    :deep(.vxe-header--column) {
      border: 1px solid #ebeef5 !important;
      border-right: none !important;
      border-top: none !important;
      background-image: none;
    }

    :deep(.vxe-body--column) {
      border: 1px solid #ebeef5 !important;
      border-right: none !important;
      border-top: none !important;
      background-image: none;
    }

    :deep(.vxe-header--column) {
      text-align: center !important;
    }

    :deep(.el-link--primary) {
      margin-left: 10px;
    }

    :deep(.vxe-table--main-wrapper) {
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: transparent;
      }
    }
  }
</style>
