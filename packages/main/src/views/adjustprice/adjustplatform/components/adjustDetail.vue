<template>
  <el-form
    :model="form"
    ref="formRef"
    label-width="150"
    label-position="left"
    :rules="isDetail ? [] : rules"
    :disabled="isDetail"
    scroll-to-error
  >
    <KeenCard title="基础信息">
      <div class="mw-1000px">
        <el-form-item label="调价周期" prop="adjustTime">
          <el-date-picker
            class="w-50"
            v-model="form.adjustTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :popper-options="{ placement: 'bottom-start' }"
          />
        </el-form-item>
        <el-form-item label="调价类型" prop="adjustType">
          <el-select v-model="form.adjustType">
            <el-option :value="1" label="涨价" />
            <el-option :value="2" label="降价" />
            <el-option :value="3" label="秒杀" />
            <el-option :value="4" label="coupon" />
            <el-option :value="5" label="秒杀/coupon" />
          </el-select>
        </el-form-item>
        <el-form-item label="比例" v-if="[3, 4, 5].includes(form.adjustType)" required>
          <div class="w-100 d-flex gap-5 justify-content-between">
            <div class="d-flex gap-2">
              <el-form-item label="" prop="couponNum">
                <el-input v-model="form.couponNum" suffix-icon="el-icon-date" />
              </el-form-item>
              %
            </div>
            <el-form-item label="Code" label-width="80">
              <el-input v-model="form.couponCode" suffix-icon="el-icon-date" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="调价原因" prop="reason">
          <el-input type="textarea" v-model="form.reason" :autosize="{ minRows: 4, maxRows: 10 }" />
        </el-form-item>
        <el-form label-width="150" :disabled="form.approveStatus === 1">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model="form.remark"
              :autosize="{ minRows: 4, maxRows: 10 }"
            />
          </el-form-item>
        </el-form>
      </div>
    </KeenCard>
    <KeenCard title="调价信息">
      <div class="mw-1000px">
        <el-form-item label="渠道" prop="channel" v-if="isNewPlatform">
          <ProductChannelSelect
            class="w-100"
            v-model="form.channel"
            placeholder="请选择"
            @change="handleChannelChange"
            :filters="[
              'amazon',
              'shopify',
              'offline',
              'retailer',
              'distributor',
              'bestbuy_offline',
              'walmart_offline',
              'cardinal',
              'boxout',
              'bergen',
              'douyin',
              'xiaohongshu',
              'jd',
              'sam',
              'tmall',
              'taobao',
              'pdd',
            ]"
          />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="站点" prop="siteList">
              <!--              <SiteSelect
                              v-if="isAmazon"
                              class="w-100"
                              v-model="form.siteList"
                              placeholder="请选择"
                              :multiple="true"
                            />-->
              <!--              <ProductSiteSelect
                              class="w-100"
                              v-model="form.siteList"
                              placeholder="请选择"
                              :multiple="true"
                              clearable
                              filterable
                            />-->
              <CountrySelect
                class="w-100"
                v-model="form.siteList"
                clearable
                multiple
                placeholder="站点"
                :scene="1"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺账号" prop="shopList">
              <ProductShopSelect
                class="w-100"
                v-model="form.shopList"
                placeholder="所有店铺"
                :site-list="form.siteList"
                :platform="
                  platformMap[type].platform === 3 ? form.channel : platformMap[type].platformCode
                "
                multiple
                clearable
                filterable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="品线GTM" prop="productLineGtmList">
          <el-select
            v-model="form.productLineGtmList"
            :options="gtmList"
            multiple
            filterable
            :props="{ label: 'deptName', value: 'deptName' }"
            clearable
          />
        </el-form-item>

        <el-form-item :label="platformMap[type]?.parentName" :prop="platformMap[type]?.parent">
          <div class="d-flex w-100 gap-3">
            <el-input
              v-model="form[platformMap[type]?.parent]"
              suffix-icon="el-icon-date"
              placeholder="请输(多个请用,隔开)"
            />
            <el-button
              v-if="!isNewPlatform"
              type="primary"
              :disabled="!form[platformMap[type]?.parent]"
              @click="handleMultipleQuery"
            >
              查询
            </el-button>
            <el-button v-if="!isNewPlatform" class="ms-0" type="primary" @click="handleBindGoods">
              选择商品
            </el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="isMultipleBindGoods && form.priceAdjustmentGroupList?.length">
          <el-table :data="form.priceAdjustmentGroupList">
            <el-table-column :label="platformMap[type].baseTableFirstColumnLabel">
              <template #default="{ row }">
                <div class="text-gray-400 fs-7">{{ row.itemCode }}</div>
                <div class="text-gray-400 fs-7" style="width: 300px">
                  <OverflowTooltip :content="row.spuName" :line="1" />
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="platformMap[type].baseTableSecondColumnLabel">
              <template #default="{ $index }">
                <div class="pe-6 my-form-item">
                  <el-form-item
                    label-width="0"
                    :prop="'priceAdjustmentGroupList.' + $index + '.childList'"
                    :rules="rules.priceChildList"
                  >
                    <el-select
                      collapse-tags
                      multiple
                      class="w-100"
                      v-model="form.priceAdjustmentGroupList[$index].childList"
                      @change="handlePriceChildListChange($index, $event)"
                      clearable
                      allowAll
                    >
                      <!-- <el-option label="所有选项" value="all" /> -->
                      <el-option
                        v-for="item in skuMapCodeList[
                          form.priceAdjustmentGroupList[$index]?.itemCode
                        ]"
                        :label="`${item.subCode} / ${item.msku} (${item.shop})`"
                        :value="item.subCode + item.msku + item.shop"
                        :key="item.subCode"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="80" v-if="!isDetail">
              <template #default="{ $index }">
                <KeenActions
                  :actions="[
                    {
                      label: '删除',
                      key: 'delete',
                      type: 'error',
                      index: $index,
                    },
                  ]"
                  @click="handleDeleteParent"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item
          :label="isNewPlatform ? 'ItemId' : platformMap[type]?.childName"
          :prop="isNewPlatform ? '' : 'skuCodeList'"
          v-if="isNewPlatform && (!isDetail || !isChildList)"
        >
          <div class="d-flex w-100 gap-3">
            <el-input
              v-if="isNewPlatform"
              v-model="itemCodes"
              @blur="handleBlur"
              :placeholder="
                form.channel === 'walmart'
                  ? '请选择或输入ItemID(多个请用,隔开)'
                  : '请输入ItemID(多个请用,隔开)'
              "
            />
            <el-select
              v-else
              multiple
              class="w-100"
              v-model="form.skuCodeList"
              @change="handleChildListChange"
              clearable
              allowAll
            >
              <!-- <el-option
                label="所有选项"
                value="all"
                v-if="form[platformMap[type]?.parent] && skuCodeList.length > 0"
              /> -->
              <el-option
                v-for="item in skuCodeList"
                :label="`${item.subCode} / ${item.msku} (${item.shop})`"
                :value="item.subCode + item.msku + item.shop"
                :key="item.subCode"
              />
            </el-select>
            <el-button
              v-if="isNewPlatform && form.channel === 'walmart'"
              class="ms-0"
              type="primary"
              @click="handleBindGoods"
            >
              选择商品
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="商品名称" prop="spuName" v-if="isNewPlatform">
          <el-input v-model="form.spuName" clearable />
        </el-form-item>
        <div v-if="isNewPlatform && !isChildList">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="现在售价" required>
                <div class="w-100 d-flex gap-3">
                  <el-form-item prop="currentPrice">
                    <el-input v-model="form.currentPrice" />
                  </el-form-item>
                  <el-form-item prop="currentPriceCurrencyCode">
                    <CurrencySelect v-model="form.currentPriceCurrencyCode" />
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请售价" required>
                <div class="w-100 d-flex gap-3">
                  <el-form-item prop="adjustPrice">
                    <el-input v-model="form.adjustPrice" />
                  </el-form-item>
                  <el-form-item prop="adjustPriceCurrencyCode">
                    <CurrencySelect v-model="form.adjustPriceCurrencyCode" />
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="调整前毛利率" prop="currentProfitRate">
                <div class="w-100 d-flex gap-2">
                  <el-input v-model="form.currentProfitRate" />
                  %
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调整后毛利率" prop="adjustProfitRate">
                <div class="w-100 d-flex gap-2">
                  <el-input v-model="form.adjustProfitRate" />
                  %
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" size="small" @click="setChildValue">
                同步到{{ platformMap[type]?.title }}信息
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </KeenCard>
    <KeenCard
      position="start"
      grow
      :title="platformMap[type]?.title + '信息'"
      v-if="form.childPriceAdjustmentList?.length > 0"
    >
      <template #operation v-if="!isDetail">
        <div class="mw-900px d-flex justify-content-end gap-3">
          <!--          <ExportBtn
                      :service="priceApi.luteosPriceExportSubPriceInfoList"
                      :params="{
                        pageNum: 1,
                        pageSize: 100,
                        childPriceAdjustmentList: form.childPriceAdjustmentList?.map((item) => {
                          return { ...item, childCode: item[platformMap[props.type]?.child] };
                        }),
                      }"
                      size="small"
                      :plain="false"
                    >
                      导出表格
                    </ExportBtn>-->
          <el-button type="primary" size="small" @click="handleExport" v-loading="exportLoading">
            导出表格
          </el-button>
          <KeenFileUpload
            accept=".xlsx,.xls"
            directory="adjustPrice/files"
            @success="handleUploadSuccess"
            :showFileList="false"
          >
            <el-button type="primary" size="small">导入</el-button>
          </KeenFileUpload>
          <el-button
            type="danger"
            size="small"
            @click="handleDeletePrice"
            :disabled="!selectedPriceList.length"
            class="del-btn"
          >
            删除
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleUpdatePrice"
            :disabled="!selectedPriceList.length"
            class="batch-btn"
          >
            批量编辑
          </el-button>
        </div>
      </template>
      <div :class="isDetail ? '' : 'mw-1000px'">
        <el-table
          :data="form.childPriceAdjustmentList"
          @selection-change="handleSelectionChange"
          ref="tableRef"
          :row-key="getRowKey"
        >
          <el-table-column
            v-if="isNewPlatform"
            :label="platformMap[type]?.firstColumnLabel"
            :prop="platformMap[type]?.child"
            min-width="200"
          >
            <template #default="{ row }">
              <div>{{ row[platformMap[props.type]?.child] }}</div>
              <div class="text-gray-400 fs-7" v-if="row.msku">{{ row.msku }}</div>
              <div class="text-gray-400 fs-7" v-if="row.shop">({{ row.shop }})</div>
            </template>
          </el-table-column>
          <template v-else>
            <el-table-column type="selection" width="40" reserve-selection />
            <el-table-column :label="platformMap[type]?.firstColumnLabel" min-width="120">
              <template #default="{ row }">
                <OverflowTooltip :content="row[platformMap[props.type]?.child]" :line="1" />
                <div class="text-gray-400 fs-7" v-if="row.msku">{{ row.msku }}</div>
              </template>
            </el-table-column>
            <el-table-column :label="platformMap[type]?.secondColumnLabel">
              <template #default="{ row }">
                <div>{{ row.itemCode }}</div>
                <div class="text-gray-400 fs-7" v-if="row.shop">({{ row.shop }})</div>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="现在售价">
            <template #default="scope">
              <div class="pe-6">
                <el-form-item
                  label-width="0"
                  :prop="'childPriceAdjustmentList.' + scope.$index + '.currentPrice'"
                  :rules="rules.currentPrice"
                >
                  <el-input v-model="scope.row.currentPrice" />
                </el-form-item>
                <el-form-item label-width="0" prop="currentPriceCurrencyCode">
                  <CurrencySelect v-model="scope.row.currentPriceCurrencyCode" />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请售价">
            <template #default="scope">
              <div class="pe-6">
                <el-form-item
                  label-width="0"
                  :prop="'childPriceAdjustmentList.' + scope.$index + '.adjustPrice'"
                  :rules="rules.adjustPrice"
                >
                  <el-input v-model="scope.row.adjustPrice" />
                </el-form-item>
                <el-form-item label-width="0" prop="adjustPriceCurrencyCode">
                  <CurrencySelect v-model="scope.row.adjustPriceCurrencyCode" />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="调整前毛利率">
            <template #default="scope">
              <div class="pe-6">
                <el-form-item
                  label-width="0"
                  :prop="'childPriceAdjustmentList.' + scope.$index + '.currentProfitRate'"
                  :rules="rules.currentProfitRate"
                >
                  <el-input v-model="scope.row.currentProfitRate" />
                </el-form-item>
                <el-form-item label-width="0" prop="currencyCode">%</el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="调整后毛利率">
            <template #default="scope">
              <div class="pe-6">
                <el-form-item
                  label-width="0"
                  :prop="'childPriceAdjustmentList.' + scope.$index + '.adjustProfitRate'"
                  :rules="rules.adjustProfitRate"
                >
                  <el-input v-model="scope.row.adjustProfitRate" />
                </el-form-item>
                <el-form-item label-width="0" prop="currencyCode">%</el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" v-if="isDetail" min-width="200">
            <template #default="{ row }">
              <div v-if="!row.productList || row.productList.length === 0">
                未查询到对应的产品SKU
              </div>
              <div v-else-if="row.productList.length > 1">
                <div v-for="(item, index) in row.productList" :key="index">
                  <span class="me-2">{{ item.productName }}</span>
                  <span class="text-gray-400">{{ item.skuCode }}</span>
                </div>
              </div>
              <GoodsInfo
                v-else
                :title="row.productList[0].productName"
                :src="row.productList[0].productImage"
              >
                <template #description>
                  <div class="d-flex">
                    <span style="flex: 1">{{ row.productList[0].skuCode }}</span>

                    {{ row.productList[0].productPrice
                    }}{{ row.productList[0].productCurrencyCode }}
                  </div>
                </template>
              </GoodsInfo>
              <!--              <GoodsInfo
                              v-if="row.skuCode"
                              :name="row.productName"
                              :code="row.skuCode"
                              :src="row.productImage"
                              :price="row.productPrice"
                              :currencyCode="row.productCurrencyCode"
                            />
                            <div v-else>未查询到对应的产品SKU</div>-->
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="!isChildList && isDetail" width="70">
            <template #default="scope">
              <KeenActions
                :actions="[
                  {
                    label: '详情',
                    key: 'detail',
                    code: scope.row.paCode,
                    detailCode: scope.row.paDetailCode,
                  },
                ]"
                @click="handleActions"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="!isDetail">
            <template #default="{ row, $index }">
              <KeenActions
                :actions="[
                  {
                    label: '删除',
                    key: 'delete',
                    type: 'error',
                    index: $index,
                    row: row,
                  },
                ]"
                @click="handleDeleteChild"
              />
            </template>
          </el-table-column>
        </el-table>
        <!--        <div class="mt-5" v-if="type === 'shopifyadjust'">商品详情页链接</div>
                <el-table :data="form.childPriceAdjustmentList" v-if="type === 'shopifyadjust'">
                  <el-table-column
                    :label="platformMap[type]?.firstColumnLabel"
                    :prop="platformMap[type]?.child"
                  />
                  <el-table-column label="商品详情页链接">
                    <template #default="{ row }">
                      <el-input v-model="row.productUrl" />
                    </template>
                  </el-table-column>
                </el-table>-->
      </div>
    </KeenCard>
    <KeenCard title="目标信息">
      <div class="mw-1000px">
        <el-form-item label="目标销量" prop="targetSales">
          <el-input v-model="form.targetSales" clearable />
        </el-form-item>
        <el-form-item label="目标大类排名" prop="targetCategoryRank" v-if="isAmazon">
          <el-input v-model="form.targetCategoryRank" clearable />
        </el-form-item>
        <el-form-item label="目标小类排名" prop="targetSubCategoryRank" v-if="isAmazon">
          <el-input v-model="form.targetSubCategoryRank" clearable />
        </el-form-item>
      </div>
    </KeenCard>
    <!--    暂时隐藏-->
    <KeenCard title="结果信息" v-if="isDetail">
      <!--    <KeenCard title="结果信息">-->
      <div class="mw-1000px">
        <el-form :model="listData">
          <el-select
            v-if="!isChildList"
            v-model="selected"
            :placeholder="`请选择${platformMap[type]?.title}查看结果`"
            @change="
              (val) => {
                queryStatistics(
                  form.childPriceAdjustmentList[val]?.paDetailCode,
                  form.childPriceAdjustmentList[val][platformMap[props.type]?.child]
                );
              }
            "
            class="w-100"
          >
            <el-option
              v-for="(item, index) in form.childPriceAdjustmentList"
              :label="`${item[platformMap[type]?.child]} / ${item.msku} (${item.shop})`"
              :value="index"
              :key="item.paDetailCode"
            />
          </el-select>
          <el-form-item label="实际销售(总和)：" prop="actualSaleSum">
            <span>{{ listData?.actualSaleSum }}</span>
          </el-form-item>
          <el-row v-if="isAmazon">
            <el-col :span="12">
              <el-form-item
                label="实际大类排名(最前)："
                label-width="180"
                prop="actualMaxCategoryRank"
              >
                <span>{{ listData?.actualMaxCategoryRank }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="实际小类排名(最前)："
                label-width="180"
                prop="actualMaxSubCategoryRank"
              >
                <span>{{ listData?.actualMaxSubCategoryRank }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="listData?.statisticsList" v-loading="listLoading">
          <el-table-column label="日期" prop="statisticsDate" />
          <el-table-column label="实际售价" prop="actualPrice" />
          <el-table-column label="目标销量" prop="targetSales" />
          <el-table-column label="实际销量" prop="actualSales" />
          <template v-if="isAmazon">
            <el-table-column label="目标大类排名" prop="targetCategoryRank" />
            <el-table-column label="实际大类排名" prop="actualCategoryRank" />
            <el-table-column label="目标小类排名" prop="targetSubCategoryRank" />
            <el-table-column label="实际小类排名" prop="actualSubCategoryRank" />
          </template>
        </el-table>
        <KeenPagination
          :current="current"
          :page-size="pageSize"
          :page-size-option="pageSizeOption"
          :total="total"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
        />
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="实际销量" :name="0">
            <AdjustPriceChart name="实际销量" :timeList="timeList" :dataList="salesList" />
          </el-tab-pane>
          <template v-if="isAmazon">
            <el-tab-pane label="实际大类排名" :name="1">
              <AdjustPriceChart
                name="实际大类排名"
                :timeList="timeList"
                :dataList="categoryRankList"
              />
            </el-tab-pane>
            <el-tab-pane label="实际小类排名" :name="2">
              <AdjustPriceChart
                name="实际小类排名"
                :timeList="timeList"
                :dataList="subCategoryRankList"
              />
            </el-tab-pane>
          </template>
        </el-tabs>
        <el-form label-width="150" :disabled="form.approveStatus === 1">
          <el-form-item label="复盘说明" class="mt-5">
            <el-input
              v-model="form.adjustReview"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 10 }"
            />
          </el-form-item>
        </el-form>
      </div>
    </KeenCard>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button
        v-if="form.approveStatus !== 1"
        type="primary"
        @click="save(1)"
        v-loading="saveLoading"
      >
        保存
      </el-button>
      <el-button
        v-if="!isChildList && (form.approveStatus === 0 || form.approveStatus === 3)"
        type="primary"
        @click="submit"
        v-loading="submitLoading"
      >
        提交审核
      </el-button>
    </el-space>
  </div>
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    :keyWord="platformMap[props.type]?.parentName"
    :platform="platformMap[props.type]?.platform"
    :shop-list="form.shopList"
    :multiple="isNewPlatform || isMultipleBindGoods"
    :selected-rows="
      itemCodes
        ?.split(',')
        ?.filter((v) => v)
        ?.map((v) => ({ code: v }))
    "
    @close="handleBindGoodsClose"
  />
  <BatchUpdatePrice
    v-if="updatePriceVisible"
    :visible="updatePriceVisible"
    :platformMap="platformMap"
    :type="type"
    :priceList="selectedPriceList"
    @close="handleUpdatePriceClose"
  />
</template>

<script setup lang="ts">
  import { useRequest } from 'vue-request';
  import { memberApi, platformApi, PriceApi, priceApi, productApi } from '@/api';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { omit, pick } from 'lodash-es';
  import { priceRuleFixed4, rateRuleFixed4 } from '@/utils/rulesRegExp';
  import { PriceInfoSaveReq, QueryPriceInfoResp } from '@/api/price/data-contracts';
  import dayjs from 'dayjs';
  import useList from '@/hooks/list/useList';
  import AdjustPriceChart from '@/views/adjustprice/adjustplatform/components/AdjustPriceChart.vue';
  import SiteSelect from '@/views/adjustprice/adjustplatform/components/SiteSelect.vue';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { useTabs } from '@/hooks/tabs';
  import BindGoods from './bindGoods.vue';
  import BatchUpdatePrice from './batchUpdatePrice.vue';

  const { closeTabAndRefresh } = useTabs();
  const props = defineProps<{
    type?: string;
    placeholder?: string;
    service?: any;
  }>();

  const platformMap = {
    amazonadjust: {
      platform: 1,
      platformCode: 'amazon',
      parentName: '父ASIN',
      childName: '子ASIN',
      parent: 'parentAsin',
      child: 'childAsin',
      title: '子ASIN',
      firstColumnLabel: '子ASIN/MSKU',
      secondColumnLabel: '父ASIN/店铺',
      childType: 'childasin',
      baseTableFirstColumnLabel: '父ASIN/商品名称',
      baseTableSecondColumnLabel: '子ASIN',
    },
    childasin: {
      platform: 1,
      platformCode: 'amazon',
      parentName: '父ASIN',
      childName: '子ASIN',
      parent: 'parentAsin',
      child: 'childAsin',
      title: '子ASIN',
      firstColumnLabel: '子ASIN/MSKU',
      secondColumnLabel: '父ASIN/店铺',
      baseTableFirstColumnLabel: '父ASIN/商品名称',
      baseTableSecondColumnLabel: '子ASIN',
    },
    shopifyadjust: {
      platform: 2,
      platformCode: 'shopify',
      parentName: 'Product ID (SPU)',
      childName: 'Variant ID (SKU)',
      parent: 'productId',
      child: 'variantId',
      title: 'SKU',
      firstColumnLabel: 'Variant ID/MSKU',
      secondColumnLabel: 'Product ID/店铺',
      childType: 'skuadjust',
      baseTableFirstColumnLabel: 'Product ID (SPU)/商品名称',
      baseTableSecondColumnLabel: 'Variant ID (SKU)',
    },
    skuadjust: {
      platform: 2,
      platformCode: 'shopify',
      parentName: 'Product ID (SPU)',
      childName: 'Variant ID (SKU)',
      parent: 'productId',
      child: 'variantId',
      title: 'SKU',
      firstColumnLabel: 'Variant ID/MSKU',
      secondColumnLabel: 'Product ID/店铺',
      baseTableFirstColumnLabel: 'Product ID (SPU)/商品名称',
      baseTableSecondColumnLabel: 'Variant ID (SKU)',
    },
    newplatformadjust: {
      platform: 3,
      parentName: 'SPU',
      childName: 'SKU',
      parent: 'itemId',
      child: 'subItemId',
      title: 'SKU',
      firstColumnLabel: 'Item ID/MSKU',
      childType: 'itemidadjust',
    },
    itemidadjust: {
      platform: 3,
      parentName: 'SPU',
      childName: 'SKU',
      parent: 'itemId',
      child: 'subItemId',
      title: 'SKU',
      firstColumnLabel: 'Item ID/MSKU',
    },
    tiktokadjust: {
      platform: 4,
      platformCode: 'tiktok',
      parentName: 'Product ID (SPU)',
      childName: 'SKU ID (SKU)',
      parent: 'productId',
      child: 'skuId',
      title: 'SKU',
      firstColumnLabel: 'SKU ID/MSKU',
      secondColumnLabel: 'Product ID/店铺',
      childType: 'itemidadjust',
      baseTableFirstColumnLabel: 'Product ID (SPU)/商品名称',
      baseTableSecondColumnLabel: 'SKU ID (SKU)',
    },
  };

  const route = useRoute();
  const router = useRouter();
  const code = route.query.code as string;
  const detailCode = route.query.detailCode as string;
  const tabCurrent = ref(0);
  const formRef = ref<FormInstance>();
  const childFormRef = ref<FormInstance>();
  const selected = ref();

  const skuCodeList = ref([]);

  const form = reactive<
    PriceInfoSaveReq &
      QueryPriceInfoResp & {
        adjustTime: [string, string] | '';
        childPriceAdjustmentList: any[];
      }
  >({
    adjustTime: '',
    /** 申请调价 */
    adjustPrice: '',
    /** 申请售价币种编码 */
    adjustPriceCurrencyCode: 'USD',
    /** 调价后毛利率 */
    adjustProfitRate: '',
    /** 调价类型 1-涨价 2-降价 3-秒杀 4-coupon */
    adjustType: '',
    /** 复盘说明 */
    adjustReview: '',
    /** 渠道 */
    channel: '',
    shopList: [],
    childPriceAdjustmentList: [],
    /** Coupon Code */
    couponCode: '',
    /**
     * Coupon比例
     * @format int32
     */
    couponNum: '',
    /** 现在售价 */
    currentPrice: '',
    /** 现在售价币种编码 */
    currentPriceCurrencyCode: 'USD',
    /** 调价前毛利率 */
    currentProfitRate: '',
    /**
     * 调价周期结束时间
     * @format date-time
     */
    endTime: '',
    /** 调价活动编码 */
    paCode: '',
    /**
     * 平台 1-亚马逊 2-独立站 3-沃尔玛
     * @format int32
     */
    platform: '',
    /** 商品名称 */
    spuName: '',
    /** 调价原因 */
    reason: '',
    /** 备注 */
    remark: '',
    /** 站点 */
    siteList: [],
    // 品线GTM
    productLineGtmList: [],
    /** 子asin/SKU */
    skuCode: '',
    /** 父ASIN/SPU */
    spuCode: '',
    /**
     * 调价周期开始时间
     * @format date-time
     */
    startTime: '',
    /** 目标大类排名 */
    targetCategoryRank: '',
    /** 目标日销 */
    targetSales: '',
    /** 目标小类排名 */
    targetSubCategoryRank: '',
    approveStatus: 0,
    skuCodeList: [],
    priceAdjustmentGroupList: [],
  });

  const rules = reactive<FormRules>({
    adjustTime: [
      {
        required: true,
        message: '请选择调价周期',
        trigger: ['blur', 'change'],
      },
    ],
    adjustType: [
      {
        required: true,
        message: '请选择调价类型',
        trigger: ['blur', 'change'],
      },
    ],
    priceChildList: [
      {
        required: true,
        message: '请选择子ASIN',
        trigger: ['blur', 'change'],
      },
    ],
    couponNum: [
      {
        required: true,
        message: '请输入比例',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
      {
        validator: (rule: any, value: string) => {
          if (value) {
            return new Promise((resolve, reject) => {
              if (value > 100) {
                reject('比例不能大于100');
              } else {
                resolve();
              }
            });
          }
          return true;
        },
      },
    ],
    reason: [
      {
        required: true,
        message: '请输入调价原因',
        trigger: ['blur', 'change'],
      },
    ],
    [platformMap[props.type]?.parent]: [
      {
        required: true,
        message: `请输入${platformMap[props.type]?.parentName}`,
        trigger: ['blur', 'change'],
      },
    ],
    skuCodeList: [
      {
        required: true,
        message: `请选择${platformMap[props.type]?.childName}`,
        trigger: ['blur', 'change'],
      },
    ],
    spuName: [
      {
        required: true,
        message: '请输入商品名称',
        trigger: ['blur', 'change'],
      },
    ],
    siteList: [
      {
        required: true,
        message: '请选择站点',
        trigger: ['blur', 'change'],
      },
    ],
    shopList: [
      {
        required: true,
        message: '请选择店铺',
        trigger: ['blur', 'change'],
      },
    ],
    channel: [
      {
        required: true,
        message: '请选择渠道',
        trigger: ['blur', 'change'],
      },
    ],
    currentPrice: [
      {
        required: true,
        message: '请输入现在售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
    ],
    adjustPrice: [
      {
        required: true,
        message: '请输入申请售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur', 'change'],
      },
    ],
    currentProfitRate: [
      {
        required: true,
        message: '请输入调整前毛利率',
        trigger: ['blur', 'change'],
      },
      {
        pattern: rateRuleFixed4,
        message: '请输入正、负数字',
        trigger: ['blur', 'change'],
      },
    ],
    adjustProfitRate: [
      {
        required: true,
        message: '请输入调整后毛利率',
        trigger: ['blur', 'change'],
      },
      {
        pattern: rateRuleFixed4,
        message: '请输入正、负数字',
        trigger: ['blur', 'change'],
      },
    ],
    targetSales: [
      {
        required: true,
        message: '请输入目标销量',
        trigger: ['blur', 'change'],
      },
    ],
    targetCategoryRank: [
      {
        required: true,
        message: '请输入目标大类排名',
        trigger: ['blur', 'change'],
      },
    ],
    targetSubCategoryRank: [
      {
        required: true,
        message: '请输入目标小类排名',
        trigger: ['blur', 'change'],
      },
    ],
    productLineGtmList: [
      {
        required: true,
        message: '请选择品线GTM',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const isChildList = computed(() => {
    return ['childasin', 'itemidadjust', 'skuadjust'].includes(props.type);
  });

  const isDetail = computed(() => {
    return route.fullPath.includes('/detail');
  });

  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });

  const isAmazon = computed(() => {
    return ['amazonadjust', 'childasin'].includes(props.type);
  });

  const isNewPlatform = computed(() => {
    return ['newplatformadjust', 'itemidadjust'].includes(props.type);
  });

  const isMultipleBindGoods = computed(() => {
    return ['amazonadjust', 'shopifyadjust', 'tiktokadjust'].includes(props.type);
  });

  const keyFields = ref([`${platformMap[props.type]?.child}`, 'msku', 'shop']);
  const getRowKey = (row) => {
    return keyFields.value.map((field) => row[field]).join('_');
  };

  const {
    loading: priceLoading,
    data: priceData,
    refresh: refreshPrice,
  } = useRequest(
    isChildList.value
      ? priceApi.luteosPriceDetailQuerySubPriceInfo
      : priceApi.luteosPriceQueryPriceInfo,
    {
      defaultParams: [
        {
          paCode: code,
          paDetailCode: detailCode,
          platform: platformMap[props.type]?.platform,
        },
      ],
      manual: !code,
      async onSuccess(res) {
        oldParentCode.value = res[platformMap[props.type]?.parent];
        if (!isMultipleBindGoods.value) {
          await queryProduct(res[platformMap[props.type]?.parent]);
        }
        if (res.childPriceAdjustmentList && res.childPriceAdjustmentList.length > 0) {
          const codeList = res.childPriceAdjustmentList.map((item) => {
            return item[platformMap[props.type]?.child] + item.msku + item.shop;
          });
          form.skuCodeList = codeList;
          if (isNewPlatform.value) {
            itemCodes.value = codeList?.join(',');
            skuCodeList.value = res.childPriceAdjustmentList.map((item) => {
              return { subCode: item.subItemId, skuCode: item.skuCode };
            });
          }
          form.childPriceAdjustmentList = res.childPriceAdjustmentList;
          if (isDetail.value && !isChildList.value) {
            selected.value = 0;
            queryStatistics(
              form.childPriceAdjustmentList[0]?.paDetailCode,
              form.childPriceAdjustmentList[0][platformMap[props.type]?.child]
            );
          }
        }
        if (res.childPriceAdjustment) {
          form.childPriceAdjustmentList = [res.childPriceAdjustment];
          if (isDetail.value) {
            queryStatistics(
              res.childPriceAdjustment?.paDetailCode,
              res.childPriceAdjustment[platformMap[props.type]?.child]
            );
          }
        }

        if (isMultipleBindGoods.value) {
          itemCodes.value = res[platformMap[props.type]?.parent];
          res.priceAdjustmentGroupList.forEach((item) => {
            item.childList = [];
            item.spuName = item.itemName;
            if (item.detailList) {
              item.detailList.forEach((child) => {
                const subCode = child[platformMap[props.type].child] + child.msku + child.shop;
                item.childList.push(subCode);
              });
            }
          });
          form.priceAdjustmentGroupList = res.priceAdjustmentGroupList;
          const codeList = res.priceAdjustmentGroupList?.map((item) => item.itemCode);
          batchQueryAsinSpuList(codeList);
        }
      },
    }
  );

  const PAGE_SIZE = 10;
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
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    PriceApi.LuteosPriceQuerySubPriceStatisticsList.RequestQuery,
    PriceApi.LuteosPriceQuerySubPriceStatisticsList.ResponseBody
  >({
    searchDefaults: {
      platform: platformMap[props.type]?.platform,
      paCode: code,
      paDetailCode: undefined,
      subCode: undefined,
    },
    // serviceManual: !(detailCode && isDetail),
    serviceManual: true,
    // serviceManual: !(detailCode || isDetail),
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: priceApi.luteosPriceQuerySubPriceStatisticsList,
  });

  watchEffect(() => {
    const priceInfo = priceData.value;
    if (priceInfo?.paCode) {
      Object.assign(form, priceInfo);
      form.adjustTime = [priceInfo.startTime || '', priceInfo.endTime || ''];
    }
  });

  // 选择商品
  const bindGoodsVisible = ref(false);
  const handleBindGoods = () => {
    if (!form.siteList?.length > 0 || !form.shopList?.length > 0) {
      ElMessage.warning('请先选择站点和店铺');
      return;
    }
    bindGoodsVisible.value = true;
  };
  const deepClone = (source) => {
    // 拷贝函数
    function clone(source) {
      if (!source) {
        return {};
      }

      const target = Array.isArray(source) ? [] : {};
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          //  循环遍历出所有属性，并复制给新的目标对象

          // 正则表达式
          if (source[key] instanceof RegExp) {
            target[key] = source[key];
            continue;
          }

          if (typeof source[key] === 'object') {
            // 递归调用深拷贝
            target[key] = clone(source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
      return target;
    }

    return clone(source);
  };
  const itemCodes = ref<string>('');
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      if (isNewPlatform.value) {
        form.spuName = val[0].spuName;
        form.skuCodeList = val?.map((item) => item.skuCode);
        itemCodes.value = val?.map((item) => item.code)?.join(',');
        skuCodeList.value = val?.map((item) => {
          return { subCode: item.code, msku: item.msku, shop: item.shop };
        });
        bindGoodsVisible.value = false;
        handleChildListChange(skuCodeList.value);
      } else if (isMultipleBindGoods.value) {
        const codeList = val?.map((item) => item.code);
        form[platformMap[props.type].parent] = codeList?.join(',');
        itemCodes.value = codeList?.join(',');
        const itemCodeList = form.priceAdjustmentGroupList.map((item) => item.itemCode);
        // 输入框的父ASIN列表
        const curList = codeList;
        // 获取输入框的和当前的父ASIN差异的列表
        const setA = new Set(itemCodeList);
        const keyWordList = curList.filter((item) => !setA.has(item));
        // 过滤掉输入框没有的父ASIN数据
        const curPriceList = deepClone(form.priceAdjustmentGroupList);
        curPriceList?.forEach((item) => {
          if (!curList.includes(item.itemCode)) {
            const findIndex: any = form.priceAdjustmentGroupList?.findIndex(
              (price) => price.itemCode === item.itemCode
            );
            if (findIndex > -1) {
              form.priceAdjustmentGroupList?.splice(findIndex, 1);
            }
          }
        });
        // 过滤掉子ASIN列表里面不存在的itemCode的数据
        const childList = deepClone(form.childPriceAdjustmentList);
        childList.forEach((child) => {
          if (!curList.includes(child.itemCode)) {
            const findIndex: any = form.childPriceAdjustmentList?.findIndex(
              (price) => price.itemCode === child.itemCode
            );
            if (findIndex > -1) {
              form.childPriceAdjustmentList?.splice(findIndex, 1);
            }
          }
        });
        keyWordList.forEach((keyWord) => {
          const findData = val.find((item) => item.code === keyWord) || {};
          if (findData.code) {
            const data: any = {
              itemCode: findData.code,
              spuName: findData.spuName,
              childList: [],
              detailList: [],
            };
            form.priceAdjustmentGroupList.push(data);
          }
        });
        batchQueryAsinSpuList(codeList);
        bindGoodsVisible.value = false;
      } else if (val.code) {
        form[platformMap[props.type].parent] = val.code;
        form.spuName = val.spuName;
        form.skuCode = val.skuCode;
        bindGoodsVisible.value = false;
        queryProduct(val.code);
      }
    } else {
      bindGoodsVisible.value = false;
    }
  };

  // 核心请求方法
  const skuMapCodeList = ref({});
  const batchQueryAsinSpuList = async (list) => {
    for (const code of list) {
      // 已存在或正在请求的跳过
      if (skuMapCodeList.value[code]) continue;

      // 先占位防止重复请求
      skuMapCodeList.value[code] = null;

      try {
        const res = await queryAsinSpuListByCode(code);
        skuMapCodeList.value[code] = res;
      } catch (error) {
        console.error(`[${code}] 请求失败:`, error);
        // 失败时移除占位，允许重试
        delete skuMapCodeList.value[code];
      }
    }
  };

  const queryAsinSpuListByCode = async (code) => {
    // 实际替换为你的API调用
    return new Promise(async (resolve) => {
      const res = await priceApi.luteosPriceAsinQueryAsinSpuList({
        platform: platformMap[props.type]?.platform,
        parentCode: code,
        shopList: form.shopList,
        pageNum: 1,
        pageSize: 100,
      });
      resolve(res.asinSpuQueryList || []);
    });
  };

  const handleBlur = () => {
    if (!itemCodes.value) form.childPriceAdjustmentList = [];
    else {
      skuCodeList.value = itemCodes.value?.split(',')?.map((item) => {
        return {
          subCode: item,
          msku: skuCodeList.value?.find((v) => v.subCode === item)?.msku,
          shop: skuCodeList.value?.find((v) => v.subCode === item)?.shop,
        };
      });
      handleChildListChange(
        form.channel === 'walmart' ? skuCodeList.value : itemCodes.value?.split(',')
      );
    }
  };

  const handleActions = (item) => {
    const { key, code, detailCode } = item;
    if (key === 'detail') {
      router.push(
        `/${platformMap[props.type].childType}/detail?code=${code}&detailCode=${detailCode}`
      );
    }
  };

  const oldParentCode = ref<string>(props.parentCode);
  const queryProduct = async (parentCode, type = 0) => {
    /* if (!shopSite && type && isAmazon) {
ElMessage.warning('请先选择站点');
return;
} */
    if (type) {
      const parentInfo = await priceApi.luteosPriceAsinQueryAsinSpuList({
        platform: platformMap[props.type]?.platform,
        keyWord: form[platformMap[props.type]?.parent],
        shopList: form.shopList,
        pageNum: 1,
        pageSize: 100,
        // siteId: shopSite,
      });
      form.skuCode = parentInfo?.asinSpuQueryList[0]?.skuCode;
      form.spuName = parentInfo?.asinSpuQueryList[0]?.spuName;
    }
    const res = await priceApi.luteosPriceAsinQueryAsinSpuList({
      platform: platformMap[props.type]?.platform,
      parentCode: form[platformMap[props.type]?.parent] || parentCode,
      shopList: form.shopList,
      pageNum: 1,
      pageSize: 100,
      // siteId: shopSite,
    });
    skuCodeList.value = res?.asinSpuQueryList || [];
    if (oldParentCode.value !== form[platformMap[props.type]?.parent]) {
      form.skuCodeList = [];
      form.childPriceAdjustmentList = [];
    }
  };
  // 删除父级ASIN
  const handleDeleteParent = (item) => {
    const { key, index } = item;
    if (key === 'delete') {
      const list = form.priceAdjustmentGroupList[index]?.childList || [];
      list.forEach((item) => {
        const findIndex = form.childPriceAdjustmentList.findIndex(
          (child: any) =>
            (child.id || child[platformMap[props.type]?.child] + child.msku + child.shop) === item
        );
        if (findIndex > -1) {
          form.childPriceAdjustmentList.splice(findIndex, 1);
        }
      });
      form.priceAdjustmentGroupList.splice(index, 1);
    }
  };
  // 删除子级ASIN
  const handleDeleteChild = (item) => {
    const { key, index, row } = item;
    if (key === 'delete') {
      form.childPriceAdjustmentList.splice(index, 1);

      // 删除父级
      const id = row.id || row[platformMap[props.type]?.child] + row.msku + row.shop;
      form.priceAdjustmentGroupList?.forEach((price) => {
        const findIndex = price.childList.findIndex((child: any) => {
          return child === id;
        });
        if (findIndex > -1) {
          price.childList.splice(findIndex, 1);
        }
      });
    }
  };

  const handleMultipleQuery = async () => {
    if (!form.siteList?.length > 0 || !form.shopList?.length > 0) {
      ElMessage.warning('请先选择站点和店铺');
      return;
    }
    // 当前的父ASIN列表
    const itemCodeList = form.priceAdjustmentGroupList.map((item) => item.itemCode);
    // 输入框的父ASIN列表
    const curList = form[platformMap[props.type]?.parent]?.split(',');
    itemCodes.value = form[platformMap[props.type]?.parent];
    // 获取输入框的和当前的父ASIN差异的列表
    const setA = new Set(itemCodeList);
    const keyWordList = curList.filter((item) => !setA.has(item));
    // 过滤掉输入框没有的父ASIN数据
    // 过滤掉输入框没有的父ASIN数据
    const curPriceList = deepClone(form.priceAdjustmentGroupList);
    curPriceList?.forEach((item) => {
      if (!curList.includes(item.itemCode)) {
        const findIndex: any = form.priceAdjustmentGroupList?.findIndex(
          (price) => price.itemCode === item.itemCode
        );
        if (findIndex > -1) {
          form.priceAdjustmentGroupList?.splice(findIndex, 1);
        }
      }
    });
    // 过滤掉子ASIN列表里面不存在的itemCode的数据
    const childList = deepClone(form.childPriceAdjustmentList);
    childList.forEach((child) => {
      if (!curList.includes(child.itemCode)) {
        const findIndex: any = form.childPriceAdjustmentList?.findIndex(
          (price) => price.itemCode === child.itemCode
        );
        if (findIndex > -1) {
          form.childPriceAdjustmentList?.splice(findIndex, 1);
        }
      }
    });
    if (!keyWordList.length) {
      return;
    }
    // 查询差异的列表
    const res = await priceApi.luteosPriceAsinQueryAsinSpuList({
      platform: platformMap[props.type]?.platform,
      keyWordList,
      shopList: form.shopList,
      pageNum: 1,
      pageSize: 100,
    });
    const list = res.asinSpuQueryList || [];
    if (!list.length) {
      ElMessage.warning('未查询到结果');
      return;
    }
    // 新增差异的数据
    list.forEach((item) => {
      const data: any = {
        itemCode: item.code,
        spuName: item.spuName,
        childList: [],
        detailList: [],
      };
      form.priceAdjustmentGroupList.push(data);
    });
    // 批量查询新增的
    const codeList = list?.map((item) => item.code);
    batchQueryAsinSpuList(codeList);
  };

  const handleChildListChange = (val) => {
    if (val.length === 0) {
      form.childPriceAdjustmentList = [];
    } else {
      let list = val;
      if (val.includes('all')) {
        form.skuCodeList = skuCodeList.value.map((item) => {
          return item.subCode + item.msku + item.shop;
        });
        list = form.skuCodeList;
      }
      const oldList = form.childPriceAdjustmentList;
      form.childPriceAdjustmentList = list?.map((item) => {
        const old = oldList?.find((v) => {
          if (isNewPlatform.value && form.channel === 'walmart') {
            return (
              v[platformMap[props.type]?.child] + v.msku + v.shop ===
              item.subCode + item.msku + item.shop
            );
          }
          if (isNewPlatform.value && form.channel !== 'walmart') {
            return v[platformMap[props.type]?.child] === item;
          }
          if (!isNewPlatform.value) {
            return v[platformMap[props.type]?.child] + v.msku + v.shop === item;
          }
        });
        const childInfo = isNewPlatform.value
          ? form.channel === 'walmart'
            ? getChildInfo(item.subCode)
            : { subCode: item }
          : getChildInfo(item);
        return {
          [platformMap[props.type]?.child]:
            isNewPlatform.value && form.channel === 'walmart' ? item.subCode : childInfo?.subCode,
          msku: childInfo?.msku,
          shop: childInfo?.shop,
          currentPrice: old?.currentPrice,
          adjustPrice: old?.adjustPrice,
          currentProfitRate: old?.currentProfitRate,
          adjustProfitRate: old?.adjustProfitRate,
          currentPriceCurrencyCode: old?.currentPriceCurrencyCode,
          adjustPriceCurrencyCode: old?.adjustPriceCurrencyCode,
        };
      });
    }
  };

  const handleChannelChange = () => {
    form[platformMap[props.type]?.parent] = '';
    itemCodes.value = '';
    form.spuName = '';
    form.childPriceAdjustmentList = [];
  };

  const handlePriceChildListChange = (index, selectedList) => {
    const list = skuMapCodeList.value[form.priceAdjustmentGroupList[index]?.itemCode];
    if (selectedList.includes('all')) {
      form.priceAdjustmentGroupList[index].childList = [];
      list.forEach((item) => {
        form.priceAdjustmentGroupList[index]?.childList.push(item.subCode + item.msku + item.shop);
      });
      selectedList = form.priceAdjustmentGroupList[index]?.childList;
    }

    const itemInfo: any = form.priceAdjustmentGroupList[index];
    list.forEach((item) => {
      const val = item.subCode + item.msku + item.shop;
      if (selectedList.includes(val)) {
        const findData: any =
          form.childPriceAdjustmentList.find((child: any) => {
            return (
              (child.id || child[platformMap[props.type]?.child] + child.msku + child.shop) === val
            );
          }) || {};
        if (!findData.msku) {
          form.childPriceAdjustmentList.push({
            id: val,
            [platformMap[props.type]?.child]: item.subCode,
            [platformMap[props.type]?.parent]: itemInfo.itemCode,
            itemName: itemInfo.spuName,
            subCode: item.subCode,
            itemCode: itemInfo.itemCode,
            msku: item?.msku,
            shop: item?.shop,
            currentPrice: item.currPrice || '',
            adjustPrice: '',
            currentProfitRate: '',
            adjustProfitRate: '',
            currentPriceCurrencyCode: item.currPriceCurrency || '',
            adjustPriceCurrencyCode: '',
          });
        }
      } else {
        const findIndex = form.childPriceAdjustmentList.findIndex(
          (child: any) =>
            (child.id || child[platformMap[props.type]?.child] + child.msku + child.shop) === val
        );
        if (findIndex > -1) {
          form.childPriceAdjustmentList.splice(findIndex, 1);
        }
      }
    });
  };

  const getChildInfo = (subCode) => {
    return skuCodeList.value?.find((item) => {
      return item.subCode + item.msku + item.shop === subCode || item.subCode === subCode;
    });
  };

  const setChildValue = () => {
    form.childPriceAdjustmentList.forEach((item) => {
      item.adjustPrice = form.adjustPrice;
      item.adjustPriceCurrencyCode = form.adjustPriceCurrencyCode;
      item.adjustProfitRate = form.adjustProfitRate;
      item.currentPrice = form.currentPrice;
      item.currentPriceCurrencyCode = form.currentPriceCurrencyCode;
      item.currentProfitRate = form.currentProfitRate;
    });
  };

  const saveLoading = ref<boolean>(false);
  const submitLoading = ref<boolean>(false);
  const save = async (type) => {
    try {
      type === 1 ? (saveLoading.value = true) : (submitLoading.value = true);
      if (form.adjustTime && form.adjustTime.length === 2) {
        form.startTime = form.adjustTime[0];
        form.endTime = form.adjustTime[1];
      }
      const res = await priceApi.luteosPriceSaveOrUpdatePriceInfo({
        ...omit(form, ['adjustTime', 'skuCodeList']),
        platform: platformMap[props.type]?.platform,
        operateType: type,
      });
      ElMessage.success(`${type === 1 ? '保存' : '提交审核'}成功`);
      if (res.paCode && isAdd.value) {
        closeTabAndRefresh(`${props.type}edit?code=${res.paCode}`);
        router.push({
          name: `${props.type}edit`,
          query: {
            code: res.paCode,
          },
        });
      } else {
        refreshPrice();
      }
    } finally {
      saveLoading.value = false;
      submitLoading.value = false;
    }
  };

  const timeList = ref<string[]>([]);
  const salesList = ref<string[]>([]);
  const categoryRankList = ref<string[]>([]);
  const subCategoryRankList = ref<string[]>([]);
  const queryStatistics = async (paDetailCode, subCode) => {
    // search.paDetailCode = val;
    const res = await priceApi.luteosPriceQuerySubPriceStatisticsList({
      pageNum: 1,
      pageSize: 100,
      paCode: code,
      paDetailCode,
      subCode,
      platform: platformMap[props.type]?.platform,
    });
    timeList.value = [];
    salesList.value = [];
    categoryRankList.value = [];
    subCategoryRankList.value = [];
    res?.statisticsList?.forEach((item) => {
      timeList.value.push(item.statisticsDate);
      salesList.value.push(item.actualSales);
      categoryRankList.value.push(item.actualCategoryRank);
      subCategoryRankList.value.push(item.actualSubCategoryRank);
    });
    search.paDetailCode = paDetailCode;
    search.subCode = subCode;
  };

  const submit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      save(2);
    }
  };

  // 导入
  const handleUploadSuccess = async (key) => {
    if (key) {
      const res = await priceApi.luteosPriceImportSubPriceInfoList({ key });
      const oldList = form.childPriceAdjustmentList;
      form.childPriceAdjustmentList = res?.childPriceAdjustmentList?.map((item) => {
        const oldItem = oldList?.find(
          (old) => old[platformMap[props.type]?.child] === item.childCode
        );
        return {
          ...oldItem,
          ...item,
        };
      });
      ElMessage.success('导入成功');
    }
  };

  /* const handleSiteChange = () => {

} */

  // 导出操作
  const { loading: exportLoading, run: exportRun } = useRequest(
    priceApi.luteosPriceExportSubPriceInfoList,
    {
      manual: true,
      async onSuccess(d) {
        const isConfirmed = await swal.exportConfirm();
        if (!isConfirmed) return;

        await nextTick();
        const path = router.resolve(
          `/downloadmanage?app_code=${d?.appCode}&module_code=${d?.moduleCode}&record_type=2`
        );
        openWindow(path.href);
      },
      onError(e) {
        swal.error(`导出失败: ${e.message}`);
      },
    }
  );
  const handleExport = async () => {
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    exportRun({
      pageNum: 1,
      pageSize: 100,
      childPriceAdjustmentList: form.childPriceAdjustmentList?.map((item) => {
        return { ...item, childCode: item[platformMap[props.type]?.child] };
      }),
    });
  };

  const selectedPriceList = ref([]);
  const tableRef = ref({});
  const handleSelectionChange = (list) => {
    selectedPriceList.value = list;
  };
  // 批量删除
  const handleDeletePrice = () => {
    selectedPriceList.value.forEach((item) => {
      const id = item[platformMap[props.type]?.child] + item.msku + item.shop;
      // 删除子级
      const findIndex = form.childPriceAdjustmentList.findIndex((child: any) => {
        return (child.id || child[platformMap[props.type]?.child] + child.msku + child.shop) === id;
      });
      if (findIndex > -1) {
        form.childPriceAdjustmentList.splice(findIndex, 1);
      }

      // 删除父级
      form.priceAdjustmentGroupList?.forEach((price) => {
        const findIndex = price.childList.findIndex((child: any) => {
          return child === id;
        });
        if (findIndex > -1) {
          price.childList.splice(findIndex, 1);
        }
      });
    });
    tableRef.value?.clearSelection();
  };
  const updatePriceVisible = ref(false);
  const handleUpdatePrice = () => {
    updatePriceVisible.value = true;
  };

  const handleUpdatePriceClose = (reload, list) => {
    if (reload) {
      list.forEach((item) => {
        form.childPriceAdjustmentList.forEach((child: any) => {
          const val1 = item[platformMap[props.type]?.child] + item.msku + item.shop;
          const val2 = child[platformMap[props.type]?.child] + child.msku + child.shop;
          if (val1 === val2) {
            child.currentPrice = item.currentPrice;
            child.adjustPrice = item.adjustPrice;
            child.currentProfitRate = item.currentProfitRate;
            child.adjustProfitRate = item.adjustProfitRate;
            child.currentPriceCurrencyCode = item.currentPriceCurrencyCode;
            child.adjustPriceCurrencyCode = item.adjustPriceCurrencyCode;
          }
        });
      });
    }
    updatePriceVisible.value = false;
    tableRef.value?.clearSelection();
  };

  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };
  queryGtmList();
</script>

<style scoped lang="scss">
  .my-form-item {
    :deep(.el-form-item) {
      margin-bottom: 20px;
    }
  }

  .batch-btn {
    position: absolute;
    right: 40px;
  }

  .del-btn {
    position: absolute;
    right: 135px;
  }
</style>
