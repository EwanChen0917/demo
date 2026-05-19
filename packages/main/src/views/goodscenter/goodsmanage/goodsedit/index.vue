<template>
  <div v-bind="$attrs">
    <el-form
      label-width="180px"
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
      :hide-required-asterisk="isDetail ? true : false"
      >
    <div class="product-info">
      <el-skeleton :loading="loading" animated :rows="10">
        <template #default>
          <div class="product-area" id="baseInfo">
            <span class="title">基础信息</span>
            <div class="product-form basic-info-grid">
          <el-form-item label="产品分类">
            <span>{{ categoryName && categoryName.some(item => item) ? categoryName.join(' / ') : '-' }}</span>
          </el-form-item>
          <el-form-item label="产品级别" prop="productLevelNew">
            <span v-if="isDetail">{{ form.productLevelNew || '-' }}</span>
            <el-select v-else v-model="form.productLevelNew" placeholder="请选择产品级别" clearable>
              <el-option label="S级" value="S" />
              <el-option label="A级" value="A" />
              <el-option label="B级" value="B" />
              <el-option label="C级" value="C" />
            </el-select>
          </el-form-item>
          <el-form-item label="产品经理" prop="createBy">
             <span v-if="isDetail">{{ form?.createByName || '-' }}</span>
            <OperatorSelect v-else v-model="form.createBy" />
          </el-form-item>
          <el-form-item label="计划专员" prop="planner">
            <span v-if="isDetail">{{ form?.plannerName || '-' }}</span>
            <!-- <OperatorSelect v-model="form.planner" /> -->
            <DeptMember
              v-else
              v-model="form.planner"
              :multipleLimit="20"
              placeholder="计划专员"
              deptCode="supply_planer_dept"
              clearable
              class="planner-select"
            />
          </el-form-item>
          <el-form-item label="GTM经理">
             <span v-if="isDetail">{{ form?.gtmName || '-' }}</span>
            <DeptMember v-else v-model="form.gtm" placeholder="GTM经理" title="gtm" clearable filterable
                        class="planner-select" @change="onGtmChange"/>
          </el-form-item>

        </div>
      </div>
      <div class="product-area product-attr" id="attrInfo">
            <span class="title">属性信息</span>
            <div class="product-form">
          <el-button v-if="!isDetail" icon="Root-tyicon icon-Root-tyjia" :loading="attrLoading" type="primary" plain size="small" @click="addAttr" :disabled="disabled">
            添加属性
          </el-button>
          <el-table border :data="form.attrList" row-key="attrCode" max-height="500">
            <el-table-column label="序号" width="100">
              <template #default="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="属性" prop="attrName" min-width="120">
              <template #default="scope">
                <div class="mb-2" v-if="isDetail">
                  <span>{{ scope.row?.attrName || '-' }}</span>
                </div>
                <el-form-item
                v-else
                  label-width="0"
                  :prop="'attrList.' + scope.$index + '.attrCode'"
                  :rules="rules.attrCode"
                >
                  <el-select
                    v-model="scope.row.attrCode"
                    @change="attrCodeChange(scope.$index)"
                    :key="scope.$index"
                    clearable
                  >
                    <template v-for="item in productAttrList" :key="item.attrCode">
                      <el-option
                        v-if="!isDisable(item.attrCode) || scope.row.attrCode === item.attrCode"
                        :label="item.attrName"
                        :value="item.attrCode"
                      />
                    </template>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="属性值" min-width="160">
              <template #default="scope">
                <div class="mb-2" v-if="isDetail">
                  <template v-if="attrMap[scope.row.attrCode]">
                    <span v-for="(item, index) in scope.row.attrValueCodeList" :key="item">
                      <span>
                        {{
                          attrMap[scope.row.attrCode]?.find((x) => x.attrValueCode === item)
                            ?.attrValueName
                        }}
                      </span>
                      <span class="me-3" v-if="index !== scope.row.attrValueCodeList.length - 1">
                        ,
                      </span>
                    </span>
                  </template>
                  <span v-else>{{ '-' }}</span>
                </div>
                <el-form-item
                v-else
                  label-width="0"
                  :prop="'attrList.' + scope.$index + '.attrValueCodeList'"
                  :rules="rules.attrValueCodeList"
                >
                  <el-select
                    v-model="scope.row.attrValueCodeList"
                    @visible-change="(visible) => handleVisibleChange(visible, scope.$index)"
                    @clear="() => handleClear(scope.$index)"
                    @change="setSkuList"
                    clearable
                    multiple
                    :key="scope.$index"
                    filterable
                    fit-input-width
                    :popper-class="scope.row.attrCode == 'Color' ? 'select-horizontal' : ''"
                  >
                  
                    <el-option
                      v-for="item in attrMap[scope.row.attrCode]"
                      :key="item.attrValueCode"
                      :label="item.attrValueName"
                      :value="item.attrValueCode"
                      />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" v-if="!isDetail">
              <template #default="scope">
                <el-form-item label-width="20">
                  <span class="text-danger" @click="deleteAttr(scope.$index)" v-if="form.attrList.length > 1">
                      删除
                  </span>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="product-area product-sku-area" v-if="!isProductGroup" id="skuInfo">
        <span class="title">SKU信息</span>
        <div class="product-form" >
          <el-tabs
            v-model="sortType"
            size="default"
            @tab-change="sortByStatus"
          >
            <el-tab-pane :name="0" label="全部"></el-tab-pane>
            <el-tab-pane :name="1" label="待上架"></el-tab-pane>
            <el-tab-pane :name="2" label="在销售"></el-tab-pane>
            <el-tab-pane :name="3" label="清仓中"></el-tab-pane>
            <el-tab-pane :name="4" label="已退市"></el-tab-pane>
          </el-tabs>
          <vxe-table
            style="width: 100%"
            v-loading="listLoading"
            :data="renderedSkuList"
            show-header-overflow
            show-footer-overflow
            show-overflow
            max-height="600"
            :cell-config="{height: 104}"
            border
            :column-config="{resizable: true}"
            :virtual-y-config="{enabled: true, gt: 0}"
          >
            <vxe-column title="产品SKU" min-width="150">
              <template #default="scope">
                <div v-if="isDetail">{{ scope.row?.skuCode }}</div>
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.row._originalIndex + '.skuCode'"
                  :rules="rules.skuCode"
                  v-else
                >
                  <el-input
                    v-if="form.attrList && form.attrList.length > 0 && !scope.row.productSpu"
                    v-model="scope.row.skuCode"
                    placeholder="请输入产品SKU"
                    clearable
                    :key="scope.$index"
                    @blur="
                      (e) => {
                        isExist(e, 2);
                      }
                    "
                  />
                  <span v-else>{{ scope.row.skuCode }}</span>
                </el-form-item>
                <span class="badge" :class="productStatusMap[scope.row.state]?.className">
                  {{ productStatusMap[scope.row.state]?.desc ?? '' }}
                </span>
              </template>
            </vxe-column>
            <vxe-column title="属性信息" min-width="200">
              <template #default="scope">
                <div v-if="Array.isArray(scope.row.attrvalueList)" class="w-100">
                  <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-wrap attrValue-list">
                    <div
                      v-for="(item, index) in scope.row.attrvalueList"
                      :key="index"
                      class="d-flex flex-center flex-nowrap attrValue-item"
                    >
                      <div class="text-attrValueName">{{ item.attrValueName }}</div>
                      <!-- <SvgIcon
                        v-if="index !== scope.row.attrvalueList.length - 1"
                        class-name="el-input__icon svg-icon-5 mx-3"
                        icon="multiple"
                      /> -->
                    </div>
                  </div>
                  <div v-else class="text-attrValueName">
                    {{ scope.row.attrvalueList[0].attrValueName }}
                  </div>
                </div>
              </template>
            </vxe-column>
            <vxe-column title="产品SKU名称" class-name="sku-name" min-width="250">
              <template #default="scope">
                <div class="mw-550px" v-if="isDetail"> 
                  <div>{{ scope.row.productTitle }}</div>
                  <div>{{ scope.row.productTitleEn }}</div>
                </div>
                <div class="mw-550px" v-else>
                  <el-form-item
                    label-width="65"
                    :prop="'skuList.' + scope.row._originalIndex + '.productTitle'"
                    :rules="rules.productTitle"
                    label="中文名"
                  >
                    <el-input v-model="scope.row.productTitle" placeholder="请输入中文名称" clearable />
                  </el-form-item>
                  <el-form-item
                    label-width="65"
                    :prop="'skuList.' + scope.row._originalIndex + '.productTitleEn'"
                    :rules="rules.productTitleEn"
                    label="英文名"
                  >
                    <el-input
                      v-model="scope.row.productTitleEn"
                      placeholder="请输入英文名称"
                      clearable
                    />
                  </el-form-item>
                </div>
              </template>
            </vxe-column>
            <vxe-column title="SKU图片" width="182" class-name="sku-image">
              <template #default="scope">
                <div class="d-flex align-items-center image-container">
                  <span v-if="!scope.row.productImageList[0] && isDetail">-</span>
                  <KeenImageUpload
                      v-if="!isDetail || (scope.row.productImageList[0] && isDetail)"
                      v-model="scope.row.productImageList[0]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"
                      :disabled="isDetail"
                      class-name="outline"
                      :show-plus="true"
                      class="outline"
                    />
                    <KeenImageUpload
                      v-if="(scope.row.productImageList[0] && !isDetail) || (scope.row.productImageList[1] && isDetail)"
                      v-model="scope.row.productImageList[1]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"
                      :disabled="isDetail"
                      :show-plus="true"
                       class="outline"
                    />
                    <KeenImageUpload
                      v-if="(scope.row.productImageList[1] && !isDetail) || (scope.row.productImageList[2] && isDetail)"
                      v-model="scope.row.productImageList[2]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"  
                      :disabled="isDetail"
                      :show-plus="true"
                       class="outline"
                    />
                </div>
              </template>
            </vxe-column>
            <vxe-column title="SKU建议销售价" class-name="sku-price" min-width="270">
              <template #default="scope" v-if="isDetail">
                <div class="w-100 d-flex gap-2">
                  <span>{{ scope.row.suggestPrice }}</span>
                  <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
                </div>
              </template>
              <template #default="scope" class="pe-3 d-flex" v-else>
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.row._originalIndex + '.suggestPrice'"
                  :rules="rules.suggestPrice"
                >
                  <el-input v-model="scope.row.suggestPrice" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.row._originalIndex + '.suggestPriceCurrencyCode'"
                  :rules="rules.suggestPriceCurrencyCode"
                >
                  <CurrencySelect :key="scope.$index" v-model="scope.row.suggestPriceCurrencyCode" />
                </el-form-item>
              </template>
            </vxe-column>
            <vxe-column title="型号" width="170">
              <template #default="scope">
                <div class="w-100 d-flex gap-2" v-if="isDetail">
                  <span>{{ scope.row.modelName }}</span>
                </div>
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.row._originalIndex + '.modelCode'"
                  :rules="rules.modelCode"
                  v-else
                >
                  <el-select
                    v-model="scope.row.modelCode"
                    placeholder="请选择型号"
                    clearable
                    :key="scope.$index"
                    filterable
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in modelOptions"
                      :key="item.modelCode"
                      :label="item.modelName || ''"
                      :value="item.modelCode!"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </vxe-column>
            <vxe-column title="操作" width="70" fixed="right" v-if="!isDetail">
              <template #default="scope">
                <el-link
                  v-if="scope.row.state === 1"
                  type="danger"
                  underline="never"
                  @click="quitSku(scope.row, scope.row._originalIndex)"
                  :disabled="scope.row.abandonFlag === false"
                >
                  废弃
                </el-link>
              </template>
            </vxe-column>
          </vxe-table>
          <el-divider v-if="invalidSkuList?.length > 0">
            <div class="d-flex flex-center cursor-pointer text-gray-600" @click="hideFlag = !hideFlag">
              <span>{{ hideFlag ? '展开' : '收起' }}废弃SKU</span>
              <svgIcon v-if="hideFlag" icon="arrows-arr072" class="svg-icon svg-icon-1" />
              <svgIcon v-else icon="arrows-arr073" class="svg-icon svg-icon-1" />
            </div>
          </el-divider>
          <div v-show="!hideFlag && invalidSkuList?.length > 0">
            <vxe-table
              :data="invalidSkuList"
              :show-header="false"
              max-height="400"
              border
              :virtual-y-config="{enabled: true, gt: 0}"
            >
              <vxe-column title="产品SKU" min-width="150" fixed="left">
                <template #default="scope">
                  <div class="mb-2">{{ scope.row.skuCode }}</div>
                  <div class="badge badge-secondary">{{ isDetail ? '废弃' : '已取消' }}</div>
                </template>
              </vxe-column>
              <vxe-column title="属性信息" min-width="200">
                <template #default="scope">
                  <div v-if="Array.isArray(scope.row.attrvalueList)" class="w-100">
                    <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-wrap attrValue-list">
                      <div
                        v-for="(item, index) in scope.row.attrvalueList"
                        :key="index"
                        class="d-flex flex-center flex-nowrap"
                      >
                        <div>{{ item.attrValueName }}</div>
                        <!-- <SvgIcon
                          v-if="index !== scope.row.attrvalueList.length - 1"
                          class-name="el-input__icon svg-icon-5 mx-3"
                          icon="multiple"
                        /> -->
                      </div>
                    </div>
                    <div v-else class="mb-7">
                      {{ scope.row.attrvalueList[0].attrValueName }}
                    </div>
                  </div>
                </template>
              </vxe-column>
              
              <vxe-column title="产品SKU名称" class-name="sku-name" min-width="250">
                <template #default="scope">
                  <div class="mw-550px">
                    <div class="mb-5">
                      {{ scope.row.productTitle }}
                    </div>
                    <div>{{ scope.row.productTitleEn }}</div>
                  </div>
                </template>
              </vxe-column>
              <vxe-column title="SKU图片" width="182"  class-name="sku-image" >
                  <template #default="scope">
                    <div class="d-flex flex-wrap align-items-center image-container">
                      <span v-if="!scope.row.productImageList[0] && isDetail">-</span>
                      <KeenImageUpload
                        v-if="!isDetail || (scope.row.productImageList[0] && isDetail)"
                        v-model="scope.row.productImageList[0]"
                        :size="skuImageSize"
                        disabled
                        :show-plus="true"
                         class="outline"
                      />
                      <KeenImageUpload
                        v-if="(scope.row.productImageList[0] && !isDetail) || (scope.row.productImageList[1] && isDetail)"
                        v-model="scope.row.productImageList[1]"
                        :size="skuImageSize"
                        disabled
                        :show-plus="true"
                         class="outline"
                      />
                      <KeenImageUpload
                        v-if="(scope.row.productImageList[1] && !isDetail) || (scope.row.productImageList[2] && isDetail)"
                        v-model="scope.row.productImageList[2]"
                        :size="skuImageSize"
                        disabled
                        :show-plus="true"
                         class="outline"
                      />
                    </div>
                  </template>
                </vxe-column>
              <vxe-column title="SKU建议销售价" class-name="sku-price"  min-width="270">
                <template #default="scope" class="pe-3">
                  <div class="mb-3">
                    {{ scope.row.suggestPrice }}
                  </div>
                  <el-form-item label-width="0">
                    <CurrencySelect :key="scope.$index" v-model="scope.row.suggestPriceCurrencyCode" disabled />
                  </el-form-item>
                </template>
              </vxe-column>
              <vxe-column title="型号" width="170">
                <template #default="scope">
                  <div class="mb-3">
                    {{ isDetail ? scope.row.modelName : scope.row.modelCode }}
                  </div>
                </template>
              </vxe-column>
              <vxe-column title="操作" width="70" fixed="right" v-if="!isDetail">
                <template #default="scope">
                  <el-link
                    type="primary"
                    underline="never"
                    @click="launchSku(scope.row, scope.$rowIndex)"
                  >
                    启用
                  </el-link>
                </template>
              </vxe-column>
            </vxe-table>
          </div>
        </div>
      </div>
      <!-- v-if="isProductGroup" -->
      <div class="product-area" v-if="isProductGroup" id="skuInfo">
        <span class="title">组合SKU信息</span>
        <div class="product-form">
          <div class="d-flex flex-center flex-wrap" v-if="!isDetail">
            <el-button plain type="primary" @click="addGroup" size="small">新增组合SKU</el-button>
          </div>
          <el-form ref="groupFormRef" :model="form" :rules="rules" label-position="left" class="w-100" require-asterisk-position="right">
            <el-table :data="form.skuList" max-height="500">
              <el-table-column label="组合信息" min-width="150">
                <template #default="scope">
                  <el-form-item v-if="Array.isArray(scope.row.skuItemBeanList)" label-width="0">
                    
                    <el-row
                      class="w-100 mb-1 align-items-center pe-5"
                      v-for="(item, index) in scope.row.skuItemBeanList"
                      :key="item.skuCode"
                    >
                      <el-col :span="16" v-if="isDetail">
                        <span>{{ item?.skuCode }}</span>
                      </el-col>
                      <el-col :span="8" v-if="isDetail">
                        <div>{{ item?.qty }}</div>
                      </el-col>
                      <el-col :span="4" v-if="!isDetail">
                        <button
                          type="button"
                          data-repeater-delete=""
                          class="btn btn-sm btn-icon btn-light-danger w-25px h-25px"
                          @click="removeSku(scope.$index, index)"
                        >
                          <span class="svg-icon svg-icon-3">
                            <SvgIcon icon="remove" />
                          </span>
                        </button>
                      </el-col>
                      <el-col :span="14" style="text-align: left" v-if="!isDetail">
                        <span>{{ item?.skuCode }}</span>
                      </el-col>
                      <el-col :span="6" v-if="!isDetail">
                        <NumberInput v-model="item.qty" placeholder="请输入数量" :precision="0" />
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-button
                    v-if="!isDetail"
                    type="primary"
                    size="small"
                    plain
                    @click="addSku(scope.row.skuItemBeanList, scope.$index)"
                  >
                    添加SKU
                  </el-button>
                  <el-form-item
                    v-if="!isDetail"
                    label-width="0"
                    :prop="'skuList[' + scope.$index + '].skuItemBeanList'"
                    :rules="rules.skuItemBeanList"
                  />
                </template>
              </el-table-column>

              <el-table-column label="产品SKU" min-width="120">
                <template #default="scope" v-if="isDetail">
                  <div>{{ scope.row?.skuCode }}</div>
                  <span class="badge" :class="productStatusMap[scope.row.state]?.className">
                    {{ productStatusMap[scope.row.state]?.desc ?? '' }}
                  </span>
                </template>
                <template #default="scope" v-else>
                  <el-form-item
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.skuCode'"
                    :rules="rules.skuCode"
                  >

                    <el-input
                      v-if="scope.row.isNew"
                      v-model="scope.row.skuCode"
                      placeholder="请输入产品SKU"
                      clearable
                      @blur="
                        (e) => {
                          isExist(e, 2);
                        }
                      "
                    />
                    <div v-else>
                      <span>{{ scope.row.skuCode }}</span>
                      <span
                        class="badge"
                        :class="productStatusMap[scope.row.state]?.className"
                        style="margin-left: 10px"
                      >
                        {{ productStatusMap[scope.row.state]?.desc ?? '' }}
                      </span>
                    </div>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="产品SKU名称" min-width="180">
                <template #default="scope">
                  <div class="mw-550px" v-if="isDetail">
                    <div>{{ scope.row.productTitle }}</div>
                    <div>{{ scope.row.productTitleEn }}</div>
                  </div>
                  <div class="mw-550px" v-else>
                    <el-form-item
                      label-width="65"
                      :prop="'skuList.' + scope.$index + '.productTitle'"
                      :rules="rules.productTitle"
                      label="中文名"
                    >
                      <el-input
                        v-model="scope.row.productTitle"
                        placeholder="请输入中文名称"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item
                      label-width="65"
                      :prop="'skuList.' + scope.$index + '.productTitleEn'"
                      :rules="rules.productTitleEn"
                      label="英文名"
                    >
                      <el-input
                        v-model="scope.row.productTitleEn"
                        placeholder="请输入英文名称"
                        clearable
                      />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="SKU图片" min-width="182" class-name="sku-image">
                <template #default="scope">
                  <div class="d-flex flex-wrap align-items-center image-container">
                    <span v-if="!scope.row.productImageList[0] && isDetail">-</span>
                    <KeenImageUpload
                      v-if="!isDetail || (scope.row.productImageList[0] && isDetail)"
                      v-model="scope.row.productImageList[0]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"
                      :disabled="isDetail"
                      :show-plus="true"
                      class="outline"
                    />
                    <KeenImageUpload
                      v-if="(scope.row.productImageList[0] && !isDetail) || (scope.row.productImageList[1] && isDetail)"
                      v-model="scope.row.productImageList[1]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"
                      :disabled="isDetail"
                      :show-plus="true"
                      class="outline"
                    />
                    <KeenImageUpload
                      v-if="(scope.row.productImageList[1] && !isDetail) || (scope.row.productImageList[2] && isDetail)"
                      v-model="scope.row.productImageList[2]"
                      directory="product/goods"
                      tooltip="更改产品图片"
                      :size="skuImageSize"
                      :disabled="isDetail"
                      :show-plus="true"
                      class="outline"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="SKU建议销售价" min-width="180" class-name="sku-price">
                <template #default="scope" v-if="isDetail">
                  <div class="w-100 d-flex gap-2">
                    <span>{{ scope.row.suggestPrice }}</span>
                    <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
                  </div>
                </template>
                <template #default="scope" class="pe-3 d-flex" v-else>
                  <el-form-item
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.suggestPrice'"
                    :rules="rules.suggestPrice"
                  >
                    <el-input v-model="scope.row.suggestPrice" placeholder="请输入" clearable />
                  </el-form-item>
                  <el-form-item
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.suggestPriceCurrencyCode'"
                    :rules="rules.suggestPriceCurrencyCode"
                  >
                    <CurrencySelect :key="scope.$index" v-model="scope.row.suggestPriceCurrencyCode" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="型号" min-width="100">
                <template #default="scope">
                  <div class="w-100 d-flex gap-2" v-if="isDetail">
                    <span>{{ scope.row.modelName }}</span>
                  </div>
                  <el-form-item
                    v-else
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.modelCode'"
                    :rules="rules.modelCode"
                  >
                    <el-select
                      v-model="scope.row.modelCode"
                      placeholder="请选择型号"
                      clearable
                      :key="scope.$index"
                      filterable
                      style="width: 200px"
                    >
                      <el-option
                        v-for="item in modelOptions"
                        :key="item.modelCode"
                        :label="item.modelName || ''"
                        :value="item.modelCode!"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70" align="right" v-if="!isDetail">
                <template #default="scope">
                  <el-link
                    type="danger"
                    underline="never"
                    @click="delProductGroup(scope.row, scope.$index)"
                  >删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
      <div class="product-area product-other-info" id="otherInfo">
        <span class="title">其他信息</span>
        <div class="product-form">
          <el-form
            ref="otherFormRef"
            :model="form"
            :rules="rules"
            label-width="150"
            class="basic-info-grid"
            label-position="top"
            require-asterisk-position="right"
            :hide-required-asterisk="isDetail ? true : false"
          >
            <el-form-item label="品牌">
              <span>{{ form?.brandName || '-' }}</span>
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="d-flex align-items-center justify-content-between">
                  <span>系列</span>
                  <el-button v-if="!isDetail" icon="Root-tyicon icon-Root-tyjia" link type="primary" size="small" @click="addSeriesVisible = true">
                    新增
                  </el-button>
                </div>
              </template>
              <template v-if="isDetail">
                <span v-for="(item, index) in form.seriesCodeList" :key="item">
                  <span class="me-3">
                    {{ seriesOptions?.find((x) => x.seriesCode === item)?.seriesName }}
                  </span>
                  <span class="me-3" v-if="index !== form.seriesCodeList.length - 1">,</span>
                </span>
                <span v-if="!form.seriesCodeList || form.seriesCodeList.length === 0">-</span>
              </template>
              <div v-else class="d-flex w-100 gap-3 align-items-center">
                <el-select
                  v-model="form.seriesCodeList"
                  :options="seriesOptions.map(item=>{
                    return {
                      label: item.seriesName || '',
                      value: item.seriesCode,
                    }
                  })"
                  placeholder="请选择系列"
                  clearable
                  filterable
                  multiple
                  class="w-100"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <template #label>
                <div class="d-flex align-items-center justify-content-between">
                  <span>产品型号</span>
                  <el-button v-if="!isDetail" icon="Root-tyicon icon-Root-tyjia" link type="primary" size="small" @click="addModelVisible = true">
                    新增
                  </el-button>
                </div>
              </template>
              <template v-if="isDetail">
                 <span v-for="(item, index) in form.modelCodeList" :key="item">
                  <span>
                    {{ modelOptions?.find((x) => x.modelCode === item)?.modelName }}
                  </span>
                  <span class="me-3" v-if="index !== form.modelCodeList.length - 1">,</span>
                </span>
                <span v-if="!form.modelCodeList || form.modelCodeList.length === 0">-</span>
              </template>
              <div class="d-flex w-100 gap-3 align-items-center" v-else>
                <el-select
                  v-model="form.modelCodeList"
                  :options="modelOptions.map(item=>{
                    return {
                      label: item.modelName || '',
                      value: item.modelCode,
                    }
                  })"
                  placeholder="请选择型号"
                  clearable
                  filterable
                  multiple
                  class="w-100"
                  @change="handleModelCodeListChange"
                />
              </div>
            </el-form-item>
            <el-form-item label="VOC型号">
              <span v-if="isDetail">{{ form?.vocModel || '-' }}</span>
              <el-input v-else v-model="form.vocModel" placeholder="请输入VOC型号" disabled />
            </el-form-item>
            <el-form-item label="产品品线" prop="productLine">
              <span v-if="isDetail">{{ form?.productLine || '-' }}</span>
              <ProductLineSelect v-else v-model="form.productLine" placeholder="请选择品线" clearable />
            </el-form-item>
            <el-form-item label="GTM品线">
              <span v-if="isDetail">{{ form?.gtmModel || '-' }}</span>
              <el-input v-else v-model="form.gtmModel" placeholder="" :disabled="true" />
            </el-form-item>
            <el-form-item label="产品标签" :class="[isDetail ? 'item-span-half' : '']">
              <template v-if="isDetail">
                <span v-for="(item, index) in form.tagCodeList" :key="item">
                  <span class="me-3">
                    {{ tagOptions?.find((x) => x.tagCode === item)?.tagName }}
                  </span>
                  <span class="me-3" v-if="index !== form.tagCodeList.length - 1">,</span>
                </span>
                <span v-if="!form.tagCodeList || form.tagCodeList.length === 0">-</span>
              </template>
              <el-select
                v-else
                v-model="form.tagCodeList"
                :options="tagOptions.map(item=>{
                  return {
                    label: item.tagName || '',
                    value: item.tagCode,
                  }
                })"
                placeholder="请选择标签"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                class="w-100"
              />
            </el-form-item>
            <el-form-item label="产品卖点" prop="sellingPoint" :class="[isDetail ? 'item-span-half' : '']">
              <span v-if="isDetail" class="selling-point-text">
                {{ form.sellingPoint || '-' }}
              </span>
              <el-input v-else v-model="form.sellingPoint" placeholder="请输入" :maxlength="200" clearable />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </template>
  </el-skeleton>
    </div>
  </el-form>

  <AddModal
    v-if="addSeriesVisible"
    :visible="addSeriesVisible"
    @success="handleAddSeriesClose"
    @close="addSeriesVisible = false"
  />
  <AddModel
    v-if="addModelVisible"
    :visible="addModelVisible"
    @success="handleAddModelClose"
    @close="addModelVisible = false"
  />
  <BindSkuMultiple
    :visible="addSkuVisible"
    v-if="addSkuVisible"
    confirm-text="确定"
    @close="handleClose"
    :selected-rows="selectedRows"
  />

  <BindSkuOne
    :visible="addOneSkuVisible"
    v-if="addOneSkuVisible"
    confirm-text="确定"
    @close="handleOneClose"
    :selected-row="selectedOneRow"
    :productSpu="productSpu"
  />
  <AddAtrrDialog ref="addAtrrDialogRef" />
  </div>
</template>

<script setup lang="ts" name="goodsEdit">
  import { FormInstance, FormRules, ElMessage } from 'element-plus';
  import { cloneDeep, omit } from 'lodash-es';
  import { ProductApi, productApi, dataApi, financeSystemApi, gtmApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import * as swal from '@/utils/swal';
  import AddModal from '@/views/goodscenter/seriesmanage/serieslist/Modal/addSeries.vue';
  import AddModel from '@/views/goodscenter/modelmanage/modellist/Modal/addModel.vue';
  import BindSkuOne from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import BindSkuMultiple from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import AddAtrrDialog from '@/views/goodscenter/goodsmanage/goodsedit/components/addAtrrDialog.vue';
  
  const props = withDefaults(
    defineProps<{
      isDetail: boolean;
      loading?: boolean;
    }>(),
    {
      loading: false,
    }
  );

  const emit = defineEmits<{
    (event: 'closeLoading'): void;
    (event: 'close'): void;
    (event: 'openSaveLoading'): void;
    (event: 'activeSectionChange', id: string): void;
    (event: 'save', success: boolean): void;
  }>();

  // 滚动监听逻辑优化
  const sections = ['baseInfo', 'attrInfo', 'skuInfo', 'otherInfo'];
  const isManualScrolling = ref(false);
  let scrollContainer: HTMLElement | null = null;
  let rafId: number | null = null;

  const handleScroll = () => {
    if (isManualScrolling.value || !scrollContainer) return;

    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
      if (!scrollContainer || isManualScrolling.value) return;
      
      const containerRect = scrollContainer.getBoundingClientRect();
      let currentId = sections[0];

      // 灵敏度优化：将阈值设为 10px
      // 只有当区块标题几乎贴到顶部时才切换，这样视觉上最符合“当前区块”的直觉
      const threshold = 10;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // 计算相对于容器顶部的实时距离
          const relativeTop = rect.top - containerRect.top;
          
          if (relativeTop <= threshold) {
            currentId = id;
          } else {
            break;
          }
        }
      }
      emit('activeSectionChange', currentId);
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollContainer) {
      isManualScrolling.value = true;
      emit('activeSectionChange', id);
      
      const containerRect = scrollContainer.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      // 精准计算：目标位置 = 当前滚动位置 + (元素距离视口顶部的距离 - 容器距离视口顶部的距离)
      // 这样可以 100% 消除由于 offsetParent 嵌套导致的偏移误差
      const targetScrollTop = scrollContainer.scrollTop + (elRect.top - containerRect.top);

      scrollContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      if (rafId) cancelAnimationFrame(rafId);
      
      setTimeout(() => {
        isManualScrolling.value = false;
      }, 800);
    }
  };

  onMounted(async () => {
    // 增加重试机制，确保能找到滚动容器
    const findContainer = () => {
      const firstSection = document.getElementById(sections[0]);
      if (firstSection) {
        scrollContainer = firstSection.closest('.el-drawer__body') as HTMLElement;
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
          return true;
        }
      }
      return false;
    };

    // 尝试寻找容器，最多尝试 3 次
    let attempts = 0;
    const tryFind = () => {
      if (!findContainer() && attempts < 3) {
        attempts++;
        setTimeout(tryFind, 200);
      }
    };
    
    await nextTick();
    tryFind();
  });

  onUnmounted(() => {
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', handleScroll);
    }
    if (rafId) cancelAnimationFrame(rafId);
  });

  const colorMap = {
    0: 'blue',
    1: 'purple',
    2: 'green',
    3: 'red',
  };

  const productStatusMap = {
    null: { desc: '未知', className: 'badge-light-info' },
    1: { desc: '待上架', className: 'badge-light-primary' },
    2: { desc: '在销售', className: 'badge-light-success' },
    3: { desc: '清仓中', className: 'badge-light-warning' },
    4: { desc: '已退市', className: 'badge-light-danger' },
  };

  // 是否组合商品
  const isProductGroup = computed(() => {
    return form.productType === 13;
  });

  const route = useRoute();
  const router = useRouter();
  const hideFlag = ref<boolean>(true);
  const showCancel = ref<boolean>(true);
  
  // 用于检测属性是否变化的缓存
  const lastAttrListSnapshot = ref('');
  
  // 表单定义
  const formRef = ref<FormInstance>();
  const otherFormRef = ref<FormInstance>();
  const groupFormRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductSaveProduct.RequestBody>({
    /** 品牌编码 */
    brandCode: '',
    brandName: '',
    /** 五级分类编码 */
    categoryCode: [],
    /** 归属人编码 */
    createBy: '',
    /** 计划专员 */
    planner: '',
    gtm: '',
    createByName: '',
    /** 币种 */
    currencyCode: 'CNY',
    /** 型号信息 */
    modelCodeList: [],
    /** 产品名称 */
    name: '',
    /** 产品名称英文 */
    nameEn: '',
    /**
     * 操作类型 1：保存草稿 2：提交审批
     * @format int32
     * @min 1
     * @exclusiveMin false
     * @max 2
     * @exclusiveMax false
     */
    operateType: 1,

    /** 报关/清关信息 */
    productDeclareList: [
      {
        /** 报关/清关信息：申报品名CN */
        declareName: '',
        /** 报关/清关信息：申报品名EN */
        declareNameEn: '',
        /** 报关/清关信息：申报价值 */
        declarePrice: '',
        /** 报关/清关信息：产品材质及成分含量 */
        productMaterialIngredient: '',
        /** 供应链产品产品SKU */
        productSku: '',
        /** 敏感类型 */
        sensitiveTypeCodeList: [],
        /** 产品SKU */
        skuCode: '',
      },
    ],
    productSpecList: [],
    /**
     * 产品id
     * @format int64
     */
    productId: 0,
    /** 产品图片 */
    productImage: '',
    /** 供应商信息：供应商信息 */
    productPurchaseList: [],
    productSpec: {
      /** 采购编码 */
      purchaseCode: '',
      /** 采购币种 */
      purchaseCurrencyCode: '',
      /** 采购负责人 */
      purchaseOperator: '',
      /** 采购负责人名称 */
      purchaseOperatorName: '',
      /** 默认采购单价 */
      purchasePrice: '',
      /** 供应商代码 */
      supplierCode: '',
      /** 供应商名称 */
      supplierName: '',
    },
    /** 产品Id,产品SPU，产品spu  */
    productSpu: '',
    /**
     * 产品类型
     * @format int32
     */
    productType: 1,
    productTypeDesc: '',
    /** 系列信息 */
    seriesCodeList: [],
    /** sku信息 */
    skuList: [],
    invalidSkuList: [],
    /** 建议销售价格 */
    suggestSellPrice: '',
    /** 产品标签 */
    tagCodeList: [],
    /** 产品卖点 */
    sellingPoint: '',
    /** 属性编码 */
    attrList: [],
    state: 0,
    stateDesc: '开发中',
    productStatusRecordList: [],
    purchaseApproveStatus: '',
    declareApproveStatus: '',
    purchaseWorkflowCode: '',
    declareWorkflowCode: '',
    productLevelNew: '',
    productLine: '',
    productLineName: '',
    vocModel: '',
    gtmModel: '',
  });

  const rules = reactive<FormRules>({
    productSpu: [
      {
        required: true,
        message: '请输入产品SPU',
        trigger: ['blur', 'change'],
      },
    ],
    name: [
      {
        required: true,
        message: '请输入产品中文名',
        trigger: ['blur', 'change'],
      },
    ],
    nameEn: [
      {
        required: true,
        message: '请输入产品英文名',
        trigger: ['blur', 'change'],
      },
    ],
    suggestSellPrice: [
      {
        required: true,
        message: '请输入建议销售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
      },
    ],
    currencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: ['blur', 'change'],
      },
    ],
    productLevelNew: [
      {
        required: true,
        message: '请选择产品级别',
        trigger: ['blur', 'change'],
      },
    ],
    categoryCode: [
      {
        required: true,
        message: '请选择产品分类',
        trigger: ['blur', 'change'],
      },
    ],
    attrCode: [
      {
        required: true,
        message: '请选择属性',
        trigger: ['blur', 'change'],
      },
    ],
    attrValueCodeList: [
      {
        required: true,
        message: '至少选择一个属性值',
        trigger: [],
      },
    ],
    skuCode: [
      {
        required: true,
        message: '产品SKU不能为空',
        trigger: ['blur'],
      },
    ],
    productTitle: [
      {
        required: true,
        message: '请输入SKU中文名称',
        trigger: ['blur'],
      },
    ],
    productTitleEn: [
      {
        required: true,
        message: '请输入SKU英文名称',
        trigger: ['blur'],
      },
    ],
    suggestPrice: [
      {
        required: true,
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur'],
      },
    ],
    suggestPriceCurrencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: ['blur'],
      },
    ],
    modelCode: [
      {
        required: true,
        message: '请选择型号',
        trigger: ['blur', 'change'],
      },
    ],
    createBy: [
      {
        required: true,
        message: '请选择产品经理',
        trigger: ['blur', 'change'],
      },
    ],
    productType: [
      {
        required: true,
        message: '请选择产品类型',
        trigger: ['blur', 'change'],
      },
    ],
    productLine: [
      {
        required: true,
        message: '请选择产品线',
        trigger: ['blur', 'change'],
      },
    ],
    sellingPoint: [
      {
        required: true,
        message: '请输入产品卖点',
        trigger: ['blur'],
      },
    ],
    skuItemBeanList: [
      {
        required: true,
        message: '至少选择一个SKU',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const offsetWidth = ref<number>(document.body.offsetWidth);
  window.onresize = () => {
    return (() => {
      offsetWidth.value = document.body.offsetWidth;
    })();
  };
  const skuImageSize = 48;

  const invalidSkuList = computed(() => {
    if (!form.skuList) return [];
    
    // 过滤出已废弃的 SKU
    let list = form.skuList.filter((item) => !item.activeFlag);
    
    // 根据当前 Tab 进一步过滤
    if (sortType.value > 0) {
      list = list.filter(item => item.state === sortType.value);
    }
    
    return list;
  });

  const listLoading = ref(false);

  const sortType = ref<number>(2);
  
  // 用于表格实际渲染的数据，通过异步挂载避免 Tab 切换死锁
  const renderedSkuList = ref<any[]>([]);

  // 1. 抽取通用的过滤逻辑
  const getFilteredList = (type) => {
    if (!form.skuList) return [];
    
    let list = form.skuList.filter(item => {
      if (type === 0) return item.activeFlag;
      return item.state === type && item.activeFlag;
    });

    if (type === 0) {
      const sortOrder = [2, 1, 3, 4];
      return [...list].sort((a, b) => sortOrder.indexOf(a.state) - sortOrder.indexOf(b.state));
    }
    return list;
  };

  // 3. 重构 Tab 切换逻辑：立即切换 Tab -> 开启 Loading -> 异步渲染
  const sortByStatus = (val) => {
    // A. 立即更新 Tab 激活状态
    sortType.value = val;
    
    // B. 开启 Loading，阻止用户进一步操作
    listLoading.value = true;
    
    // C. 使用 setTimeout(0) 将繁重的渲染工作推入宏任务队列
    // 这允许浏览器先完成 Tab 样式的重绘（Paint）和 Loading 层的显示
    setTimeout(() => {
      try {
        renderedSkuList.value = getFilteredList(val);
      } finally {
        listLoading.value = false;
      }
    }, 50);
  };

  const getCombination = (array) => {
    let resultArr = [];
    array.forEach((arrItem) => {
      if (resultArr.length === 0) {
        resultArr = arrItem.attrValueCodeList;
      } else {
        const emptyArray = [];
        resultArr.forEach((item) => {
          arrItem.attrValueCodeList.forEach((value) => {
            emptyArray.push([item, value].flat());
          });
        });
        resultArr = emptyArray;
      }
    });
    return resultArr;
  };

  const getAttrValueName = (attrCode, attrValueCode) => {
    return attrMap[attrCode]?.find((item) => {
      return item.attrValueCode === attrValueCode;
    })?.attrValueName;
  };

  const sqlSkuMap = {};
  const sqlSkuList = [];
  const categoryName = ref([]);
  const getDetailInfo = async (detailInfo) => {
    // try {
      // 记录初始属性快照，用于判断是否需要重新生成 SKU 列表
      if (detailInfo?.attrList) {
        lastAttrListSnapshot.value = JSON.stringify(detailInfo.attrList);
      }

      // 规范化详情数据
      if (detailInfo) {
        detailInfo.productImage = detailInfo.productImage || '';
        if (detailInfo.skuList) {
          detailInfo.skuList.forEach((sku: any) => {
            if (!sku.productImageList || !sku.productImageList.length) {
              sku.productImageList = ['', '', ''];
            } else {
              // 确保数组长度至少为3且没有 null/undefined
              for (let i = 0; i < 3; i++) {
                sku.productImageList[i] = sku.productImageList[i] || '';
              }
            }
          });
        }
      }

      Object.keys(form).forEach((key) => {
        form[key] = detailInfo[key] ?? form[key];
      });

      // 为每个 SKU 添加原始索引，用于解决在过滤/排序时表单校验 prop 指向错误的问题
      if (form.skuList) {
        form.skuList.forEach((sku, index) => {
          sku._originalIndex = index;
        });
      }

      let parent = detailInfo?.productCategory;
      for (let i = 1; i <= 5; i += 1) {
        form.categoryCode?.push(parent?.categoryCode);
        categoryName.value?.push(parent?.categoryName);
        parent = parent?.productCategory;
      }
      
      // 预加载币种列表，减少 SKU 列表渲染时并发请求冲突
      dataApi.luteosDataQueryCurrencyList().then(res => {
        if (res?.currencyList) {
          localStorage.setItem('currencyOptions', JSON.stringify(res.currencyList));
          localStorage.setItem('expirationTime', String(new Date().getTime() + 60 * 60 * 1000));
        }
      });

      await getProductAttrList(form.categoryCode[form.categoryCode?.length - 1]);
      
      renderedSkuList.value = getFilteredList(sortType.value);
      
    // } finally {
      // listLoading.value = false;
      emit('closeLoading');
    // }
  };

  const productAttrList = ref<any[]>([]);
  const oldAttrList = ref<any[]>([]);
  const newAttrList = ref<any[]>([]);
  // 获取属性名数组
  const getAttrNameList = (attrList) => {
    const res: any = [];
    const attrMap = new Map(productAttrList.value.map(item => [item.attrCode, item]));
    
    for (let i = 0; i < attrList.length; i += 1) {
      const attr = attrList[i];
      const originAttr = attrMap.get(attr.attrCode);
      if (originAttr) {
        const obj: any = {};
        obj.attrCode = originAttr.attrCode;
        obj.attrName = originAttr.attrName;
        
        // 使用 Set 加速 includes 查找
        const selectedCodes = new Set(attr.attrValueCodeList);
        obj.attrValueBeanList = originAttr.attrValueBeanList.filter((item) =>
          selectedCodes.has(item.attrValueCode)
        );
        res.push(obj);
      }
    }
    return res;
  };

  const attrMap = reactive({});
  // 模块级缓存，确保相同分类只请求一次
  const attrCache = new Map();

  const getProductAttrList = async (val) => {
    if (!val) return;
    
    let res;
    if (attrCache.has(val)) {
      res = attrCache.get(val);
    } else {
      res = await productApi.luteosProductAttrQueryProductAttrList({
        categoryCode: val,
      });
      attrCache.set(val, res);
    }

    productAttrList.value = res.productAttrList || [];
    oldAttrList.value = getAttrNameList(form.attrList);
    if (productAttrList.value.length > 0) {
      productAttrList.value.forEach((item) => {
        attrMap[item.attrCode] = item.attrValueBeanList;
      });
    }
  };

  const onGtmChange = async () => {
    if(!form.gtm) {
      form.gtmModel = '';
      return;
    }
    try {
      const res = await gtmApi.luteosGtmPlGetGtmModels({
        gtmCode: form.gtm,
      });
      form.gtmModel = res[0]?.name || '';
    } catch {
      form.gtmModel = '';
    }
  }

  // 其他信息-型号切换时处理
  const handleModelCodeListChange = (val) => {
    if (val && val.length) {
      // SKU信息-表格新增型，没有值的默认设置（其他信息的型号）第一个的值
      form.skuList?.forEach((item: any) => {
        if (!item.modelCode) {
          item.modelCode = val[0] || '';
        }
      });
    }
  };

  // 添加属性按钮禁用
  const disabled = computed(() => {
    return (
      form?.attrList.length === productAttrList.value.length && productAttrList.value.length > 0
    );
  });

  // 属性下拉框禁用选项
  const isDisable = (code) => {
    const res = form.attrList.find((item) => {
      return item.attrCode === code;
    });
    return !!res;
  };

  const toAddAttrFlag = ref<boolean>(false);
  const addAtrrDialogRef = ref<typeof AddAtrrDialog>(null);
  const attrLoading = ref<boolean>(false);
  // 添加属性
  const addAttr = async () => {
    attrLoading.value = true;
    if (toAddAttrFlag.value === true) {
      await getProductAttrList(form.categoryCode[form.categoryCode.length - 1]);
      toAddAttrFlag.value = false;
    }
    attrLoading.value = false;
    if (productAttrList.value.length === 0) {
      // 未添加属性、先去添加
      const isConfirmed = await swal.confirm({
        title: '产品分类尚未关联属性',
        confirmButtonText: '去添加',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (isConfirmed) {
        toAddAttrFlag.value = true;
        addAtrrDialogRef.value?.open(form.categoryCode[form.categoryCode.length - 1]);
        // router.push(`/categorylist/detail?code=${form.categoryCode[form.categoryCode.length - 1]}`);
      }
    } else {
      form.attrList.push({
        attrCode: '',
        attrName: '',
        attrValueCodeList: [],
      });
    }
  };

  // 删除属性
  const deleteAttr = (index) => {
    form.attrList.splice(index, 1);
    setSkuList();
  };

  const attrCodeChange = (index) => {
    form.attrList[index].attrValueCodeList = [];
    setSkuList();
  };

  const handleVisibleChange = (visible, index) => {
    if (!visible) {
      formRef.value.validateField(`attrList.${index}.attrValueCodeList`);
    }
  }

  const handleClear = (index) => {
    formRef.value.validateField(`attrList.${index}.attrValueCodeList`);
  }

  const skuUpdateFlag = ref<boolean>(false);
  const setSkuList = () => {
    return new Promise((resolve) => {
      // 组合商品不参与属性组合 SKU 生成
      if (isProductGroup.value) {
        skuUpdateFlag.value = true;
        return resolve(true);
      }
      
      // console.log('attrList ', form.attrList);
      // 旧产品
      if (form.attrList.length === 0) {
        skuUpdateFlag.value = true;
        return resolve(true);
      }

      const list = form.attrList.filter((item) => !!item.attrCode);
      if (list.length === 0) return resolve(true);

      // 1. 预估组合数量，防止浏览器因计算量过大崩溃
      let estimatedCount = 1;
      list.forEach(item => {
        estimatedCount *= (item.attrValueCodeList?.length || 1);
      });

      // 如果已经有 SKU 列表且不需要重新生成，则跳过确认（这里保持原逻辑，但在 save 调用时可能需要跳过确认）
      // 实际上，既然用户要求点击保存时刷新，那么这里应该执行

      listLoading.value = true;

      // 2. 使用 setTimeout 将繁重计算推入宏任务，确保 Loading 状态能渲染出来
      setTimeout(() => {
        const oldSkuList = form.skuList;
        const skuList = form.state === 1 || form.state === 2 ? cloneDeep(sqlSkuList) : [];
        
        // 预先获取 sqlSkuMap 的所有 key，优化查找性能
        const sqlKeys = new Set(Object.keys(sqlSkuMap));

        if (list.length === 1) {
          list[0].attrValueCodeList.forEach((item) => {
            const attrvalueList = [
              {
                attrValueCode: item,
                attrValueName: getAttrValueName(list[0].attrCode, item),
              },
            ];
            const key = JSON.stringify(attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1)));
            
            if (!sqlKeys.has(key) || ![1, 2].includes(form.state)) {
              skuList.unshift({
                activeFlag: true,
                attrValuecodeList: [item],
                attrvalueList,
                skuCode: sqlSkuMap[key] || '',
                productImageList: ['', '', ''],
                state: 1,
              });
            }
          });
        } else {
          const attrValueCodeList = getCombination(list);
          attrValueCodeList.forEach((item) => {
            const attrvalueList = [];
            for (let i = 0; i < item.length; i += 1) {
              attrvalueList.push({
                attrValueCode: item[i],
                attrValueName: getAttrValueName(list[i].attrCode, item[i]),
              });
            }
            const key = JSON.stringify(attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1)));
            
            if (!sqlKeys.has(key) || ![1, 2].includes(form.state)) {
              skuList.unshift({
                activeFlag: true,
                attrValuecodeList: item,
                attrvalueList,
                skuCode: sqlSkuMap[key] || '',
                productImageList: ['', '', ''],
                state: 1,
              });
            }
          });
        }

        // 3. 遍历旧列表回显数据 - 优化查找性能
        const oldSkuMap = new Map();
        oldSkuList.forEach(old => {
          if (old.skuCode) {
            oldSkuMap.set(old.skuCode, old);
          }
          if (old.attrvalueList && old.attrvalueList.length > 0) {
            const key = old.attrvalueList
              .map(a => a.attrValueCode)
              .sort()
              .join('|');
            oldSkuMap.set(key, old);
          }
        });

        skuList.forEach((item) => {
          let same = null;
          if (item.skuCode && oldSkuMap.has(item.skuCode)) {
            same = oldSkuMap.get(item.skuCode);
          } else if (item.attrvalueList && item.attrvalueList.length > 0) {
            const key = item.attrvalueList
              .map(a => a.attrValueCode)
              .sort()
              .join('|');
            same = oldSkuMap.get(key);
          }

          if (same) {
            // 只拷贝必要的属性，避免覆盖新生成的结构
            const keysToCopy = [
              'productTitle', 'productTitleEn', 'suggestPrice', 
              'suggestPriceCurrencyCode', 'productImageList', 
              'activeFlag', 'skuCode', 'state', 'modelCode'
            ];
            keysToCopy.forEach(k => {
              if (same[k] !== undefined) item[k] = same[k];
            });
          }
        });

        skuUpdateFlag.value = true;
        form.skuList = skuList.sort((a, b) => (!b.activeFlag ? -1 : 1));
        
        // 更新所有 SKU 的原始索引
        form.skuList.forEach((item, index) => {
          item._originalIndex = index;
        });

        // 同步更新渲染列表
        renderedSkuList.value = getFilteredList(sortType.value);
        
        listLoading.value = false;
        resolve(true);
      }, 50);
    });
  };

  // 废弃sku
  const quitSku = async (row, index) => {
    const isConfirmed = await swal.confirm('确定废弃吗');
    if (isConfirmed) {
      row.activeFlag = false;
      // 数据移动到最后
      form.skuList.push(...form.skuList.splice(index, 1));
      
      // 重新计算所有 SKU 的原始索引
      form.skuList.forEach((sku, idx) => {
        sku._originalIndex = idx;
      });

      // 同步更新渲染列表
      renderedSkuList.value = getFilteredList(sortType.value);
      
      hideFlag.value = false;
      form.skuList
        .filter((item) => item.activeFlag)
        .forEach((_, idx) => {
          formRef.value.clearValidate(`skuList.${idx}.skuCode`);
          formRef.value.clearValidate(`skuList.${idx}.productTitle`);
          formRef.value.clearValidate(`skuList.${idx}.productTitleEn`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPrice`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPriceCurrencyCode`);
          formRef.value.clearValidate(`skuList.${idx}.modelCode`);
        });
    }
  };

  // 启用sku
  const launchSku = async (row, index) => {
    // console.log('index', index);
    const isConfirmed = await swal.confirm('确定启用吗');
    if (isConfirmed) {
      row.activeFlag = true;
      row.state = row.state || 1;
      // 数据移动到最前
      form.skuList.unshift(
        ...form.skuList.splice(form.skuList.filter((item) => item.activeFlag).length - 1 + index, 1)
      );
      
      // 重新计算所有 SKU 的原始索引
      form.skuList.forEach((sku, idx) => {
        sku._originalIndex = idx;
      });

      // 同步更新渲染列表
      renderedSkuList.value = getFilteredList(sortType.value);
      
      form.skuList
        .filter((item) => item.activeFlag)
        .forEach((_, idx) => {
          formRef.value.clearValidate(`skuList.${idx}.skuCode`);
          formRef.value.clearValidate(`skuList.${idx}.productTitle`);
          formRef.value.clearValidate(`skuList.${idx}.productTitleEn`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPrice`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPriceCurrencyCode`);
          formRef.value.clearValidate(`skuList.${idx}.modelCode`);
        });
      // formRef.value
    }
  };

  const addSkuVisible = ref<boolean>(false);
  const selectedRows = ref<any[]>([]);
  const addOneSkuVisible = ref<boolean>(false);
  const selectedOneRow = ref<any>({});
  const curIndex = ref<number>(0);
  const productSpu = ref(route.query.code);
  const addSku = (row, index) => {
    addSkuVisible.value = true;
    selectedRows.value = row;
    curIndex.value = index;
  };

  const addOneSku = (index) => {
    addOneSkuVisible.value = true;
    curIndex.value = index;
  };

  const addGroup = () => {
    form.skuList?.push({
      isNew: true,
      productImageList: ['', '', ''],
      skuCode: '',
      productTitle: '',
      productTitleEn: '',
      suggestPrice: '',
      suggestPriceCurrencyCode: 'CNY',
      _originalIndex: form.skuList.length,
    });
    renderedSkuList.value = getFilteredList(sortType.value);
  };

  const oldList = ref<any[]>([]);
  const handleClose = (reload, list) => {
    if (reload) {
      oldList.value = form.skuList[curIndex.value]?.skuItemBeanList;
      form.skuList[curIndex.value].skuItemBeanList = list.map((item) => {
        return {
          skuCode: item.skuCode,
          qty: oldList.value?.find((old) => old.skuCode === item.skuCode)?.qty || 1,
        };
      });
      formRef.value.validateField([`skuList[${curIndex.value}].skuItemBeanList`]);
    }
    addSkuVisible.value = false;
  };

  const handleOneClose = (reload, rows) => {
    if (reload) {
      form.skuList[curIndex.value].skuCode = rows[0].skuCode;
      formRef.value?.validateField([`skuList[${curIndex.value}].skuCode`]);
    }
    addOneSkuVisible.value = false;
  };
  // 删除组合
  const delProductGroup = async (row, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.skuList?.splice(index, 1);
      form.skuList.forEach((sku, idx) => {
        sku._originalIndex = idx;
      });
      renderedSkuList.value = getFilteredList(sortType.value);
    }
  };

  // 删除sku
  const removeSku = async (groupIndex, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.skuList[groupIndex]?.skuItemBeanList?.splice(index, 1);
      formRef.value?.validateField([`skuList[${groupIndex}].skuList`]);
    }
  };

  // 校验输入的spu、产品SKU是否已存在
  const isExist = async (e, productType) => {
    if (e.target.value) {
      try {
        await productApi.luteosProductCheckRepeatProduct({
          productType,
          recordCode: e.target.value,
        });
        // eslint-disable-next-line no-shadow
      } catch (error) {
        e.target.value = '';
      }
    }
  };

  const save = async (operateType, params) => {

    // 1. 只有当属性发生变化时，才在提交前刷新 SKU 列表
    // 如果属性没变，则保留当前 form.skuList 中的所有修改，避免被 setSkuList 重置
    // const currentAttrSnapshot = JSON.stringify(form.attrList || []);
    // if (currentAttrSnapshot !== lastAttrListSnapshot.value) {
    //   await setSkuList();
    //   lastAttrListSnapshot.value = currentAttrSnapshot;
    // }

    if (isProductGroup.value && (!form.skuList || form.skuList.length === 0)) {
      ElMessage.warning('组合SKU信息不能为空');
      emit('save', false); // 通知父组件停止 loading
      return;
    }
    
    try {
      if (operateType === 1) {
        const validations = [
          formRef.value?.validateField(['name', 'createBy', 'planner']).catch(() => false),
          otherFormRef.value?.validate().catch(() => false),
        ];
        if (isProductGroup.value) {
          validations.push(groupFormRef.value?.validate().catch(() => false));
        }
        const validationResults = await Promise.all(validations);
        if (validationResults.some(res => res !== true)) {
          emit('save', false); // 验证失败，停止 loading
          return;
        }
      } else if (operateType === 2) {
        // 只有当 sortType 不为 0 时才切换，切换全部 SKU 会导致大数据重渲染
        if (sortType.value !== 0) {
          sortType.value = 0;
          // 确保渲染数据也同步更新，否则表格显示可能不完整
          renderedSkuList.value = getFilteredList(0);
        }

        const validations = [
          formRef.value?.validate().catch(() => false),
          otherFormRef.value?.validate().catch(() => false),
        ];
        if (isProductGroup.value) {
          validations.push(groupFormRef.value?.validate().catch(() => false));
        }
        const validationResults = await Promise.all(validations);
        if (validationResults.some(res => res !== true)) {
          emit('save', false); // 验证失败，停止 loading
          return;
        }
      }

      // 2. 优化数据构造，避免使用 cloneDeep 带来的巨大开销
      // 只提取和转换必要的字段，显著提升处理速度
      const { skuList, attrList, categoryCode, ...formRest } = form;
      
      const processedSkuList = skuList?.map(item => {
        const skuItem = { ...item };
        if (skuItem.productImageList?.length > 0) {
          skuItem.productImageUrl = skuItem.productImageList[0];
        }
        if (skuItem.attrvalueList && skuItem.attrvalueList.length > 0) {
          skuItem.attrValuecodeList = skuItem.attrvalueList.map(attr => attr.attrValueCode);
        }
        return skuItem;
      });

      // 3. 优化 operateType 计算逻辑
      let finalOperateType = operateType;
      if (operateType === 2) {
        // 提前转换 Set/Map 避免在循环中重复操作
        const sqlSkuCodes = new Set(sqlSkuList?.map(i => i.skuCode) || []);
        const sqlSkuStatusMap = new Map(sqlSkuList?.map(i => [i.skuCode, i.activeFlag]) || []);
        
        const hasChanges = processedSkuList?.some(item => 
          !sqlSkuCodes.has(item.skuCode) || item.activeFlag !== sqlSkuStatusMap.get(item.skuCode)
        );

        finalOperateType = hasChanges ? 2 : 1;
      }

      const data = {
        ...formRest,
        gtm: formRest.gtm || '',
        skuList: processedSkuList,
        attrList,
        categoryCode: categoryCode[4],
        productImage: params.productImage,
        name: params.name,
        nameEn: params.nameEn,
        operateType: finalOperateType,
        skuUpdateFlag: true,
      };

      // 4. 并行处理属性列表转换
      newAttrList.value = getAttrNameList(attrList);
      data.oldAttrList = oldAttrList.value;
      data.newAttrList = newAttrList.value;

      // 5. 发送请求
      await productApi.luteosProductSaveProduct(omit(data, ['invalidSkuList']));
      emit('save', true); // 通知父组件成功（父组件会关闭抽屉）

      // 这里的 success 弹窗放在 emit 之后，非阻塞地提醒用户
      swal.success(operateType === 1 ? '保存成功' : '提交成功');
    } catch (error) {
      console.error('保存失败:', error);
      emit('save', false); // 发生错误，停止 loading
    }
  };

  // 新增操作
  const addSeriesVisible = ref(false);
  const addModelVisible = ref(false);
  const handleAddSeriesClose = (val) => {
    addSeriesVisible.value = false;
    if (val) {
      form.seriesCodeList.push(val);
      getProductRelationList();
    }
  };
  const handleAddModelClose = (val) => {
    addModelVisible.value = false;
    if (val) {
      form.modelCodeList.push(val);
      getProductRelationList();
    }
  };

  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;
    emit('close');
    // router.push('/goodslist');
  };

  // 获取其他信息options
  const brandOptions = ref<any>([]);
  const modelOptions = ref<any>([]);
  const seriesOptions = ref<any>([]);
  const tagOptions = ref<any>([]);
  // 模块级缓存，确保全局只请求一次
  let productRelationPromise: Promise<any> | null = null;
  let cachedRelationData: any = null;

  const getProductRelationList = async () => {
    if (cachedRelationData) {
      brandOptions.value = cachedRelationData.brandBeanList;
      modelOptions.value = cachedRelationData.modelBeanList;
      seriesOptions.value = cachedRelationData.seriesBeanList;
      tagOptions.value = cachedRelationData.tagBeanList;
      return;
    }

    if (productRelationPromise) {
      const res = await productRelationPromise;
      brandOptions.value = res.brandBeanList;
      modelOptions.value = res.modelBeanList;
      seriesOptions.value = res.seriesBeanList;
      tagOptions.value = res.tagBeanList;
      return;
    }

    productRelationPromise = productApi.luteosProductQueryProductRelationList();
    const res = await productRelationPromise;
    cachedRelationData = res;
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
    seriesOptions.value = res.seriesBeanList;
    tagOptions.value = res.tagBeanList;
  };
  getProductRelationList();

  defineExpose({
    init: getDetailInfo,
    cancel: handleCancel,
    submit: save,
    scrollToSection,
  });

</script>

<style scoped lang="scss">
  .selling-point-text {
    word-wrap: break-word; /* 允许长单词换行 */
    word-break: break-all; /* 强制换行 */
    white-space: pre-wrap; /* 保留空格和换行符 */
    /* 设置行高 */
    max-width: 100%; /* 确保不超出容器 */
    display: inline-block; /* 让span能够正确换行 */
  }
  .attrValue-list {
    gap: 4px;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    .text-attrValueName {
      width: fit-content;
      display: flex;
      padding: 0 6px;
      align-items: center;
      border-radius: 4px;
      border: 1px solid var(---N3, #E9ECF0);
      background: var(---N2, #F0F2F5);
    }
    .product-area {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .title {
        color: var(---N9, var(---N9, #1E2226));
        font-family: "PingFang SC Medium";
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; 
      }
      .product-form {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        align-self: stretch;
        border-radius: 8px;
        background: var(---N0, #FFF);
      }
      .basic-info-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 12px 16px;
        width: 100%;

        .el-form-item {
          grid-column: span 2;
          width: 100%;

          &.item-span-half {
            grid-column: span 4;
          }
        }
      }
    }
    .product-attr {
      :global(.select-horizontal .el-scrollbar__view) {
        display: flex;
        flex-wrap: wrap;
      }
    }
    :global(.planner-select .el-select-dropdown__list) {
      width: 100% !important;
    }
    .product-sku-area {
      .product-form {
        padding-top: 0;
      }
      :deep(.el-tabs) {
        width: 100%;
      }
    }
    .product-other-info {
      margin-bottom: 14px;
      :deep(.el-form-item__label) {
        width: 100%;
      }
    }
    .text-danger {
      color: var(---C8, var(---C8, #F53F3F));
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; 
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .attrValue-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
    }
    :deep(.sku-price) {
      .cell, .vxe-cell--wrapper {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .el-form-item + .el-form-item {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    :deep(.sku-name) {
      .el-form-item {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        .el-form-item__label {
          margin-bottom: 0;
        }
      }
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
      & + .el-form-item {
        margin-top: 4px;
        margin-bottom: 6px;
      }
    }
    :deep(.sku-image) {
      .image-input.image-input-outline .image-input-wrapper,
      .image-input.image-input-outline .el-image {
        border-radius: 8px;
        border: 1px solid var(---N4, #DFE2E6) !important;
        background: var(---N0, #FFF);
        box-shadow: none;
      }
      .vxe-cell--wrapper {
        overflow: visible !important;
      }
      .img-preview {
        box-shadow: none;
      }
      .image-container {
        gap: 8px;
      }
      .outline {
        width: 48px;
        height: 48px;
      }
      .btn-icon {
        border-radius: 4px;
        border: 1px solid var(---N4, #DFE2E6) !important;
        background: var(---N0, #FFF);
        bottom: 0;
        top: auto;
        right: 0;
        width: 16px !important;
        height: 16px !important;
        transform: translate(-100%, 0%);
      }
      .bi.bi-pencil-fill {
        color: var(---P6, #02B96B);
        font-size: 9px !important;
      }
    }
  }


  .arrows-icon {
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--bs-gray-100);
    }
  }

  :deep(.el-table__row .el-table__cell) {
    padding-top: 15px;
    padding-bottom: 5px;
  }

  :deep(.vxe-table) {
    .vxe-table--header-wrapper {
      background-color: var(--bs-gray-100);
      .vxe-header--column {
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
      }
    }
  }

  :deep(.vxe-cell) {
    // height: auto !important;
    .vxe-cell--title {
      font-size: 12px;
    }
  }
</style>
