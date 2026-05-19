<template>
  <el-form
    label-width="180px"
    label-position="left"
    ref="formRef"
    :model="form"
    :rules="rules"
    scroll-to-error
  >
    <div class="d-flex gap-5">
      <KeenCard title="基础信息" class="w-50">
        <el-form-item label="产品图">
          <KeenImageUpload
            v-model="form.productImage"
            directory="product/goods"
            tooltip="更改产品图片"
          />
        </el-form-item>
        <el-form-item label="产品分类：">
          <span>{{ categoryName ? categoryName.join(' / ') : '' }}</span>
        </el-form-item>
        <el-form-item label="产品SPU：" prop="productSpu">
          <span>{{ form?.productSpu }}</span>
        </el-form-item>
        <el-form-item label="产品SPU状态：" prop="state">
          <Tag :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
        </el-form-item>
        <el-form-item label="产品类型：" prop="productType">
          <!--          <el-form-item prop="productType" label-width="0">
            <el-select v-model="form.productType" class="w-100">
              <el-option label="产品" :value="1" />
              <el-option label="配件" :value="2" />
              <el-option label="用研产品" :value="3" />
              <el-option label="虚拟产品" :value="14" />
            </el-select>
          </el-form-item>-->
          <span>{{ form?.productTypeDesc }}</span>
        </el-form-item>
        <el-form-item label="产品级别：" prop="productLevelNew">
          <el-select v-model="form.productLevelNew" placeholder="请选择产品级别" clearable>
            <el-option label="S" value="S" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品中文名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品中文名" clearable />
        </el-form-item>
        <el-form-item label="产品英文名：" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入产品英文名" clearable />
        </el-form-item>
        <el-form-item label="产品经理" prop="createBy">
          <OperatorSelect v-model="form.createBy" />
        </el-form-item>
        <el-form-item label="GTM经理">
          <DeptMember v-model="form.gtm" placeholder="GTM经理" title="gtm" clearable filterable />
        </el-form-item>
        <!--        <el-form-item label="产品品线：" prop="productLine">
          <ProductLineSelect v-model="form.productLine" placeholder="请选择品线" clearable />
        </el-form-item>-->
      </KeenCard>

      <KeenCard title="属性信息" class="w-50">
        <el-table :data="form.attrList" row-key="attrCode">
          <el-table-column label="" width="100" align="center">
            <template #default="scope">
              <el-form-item label-width="20">
                <span @click="deleteAttr(scope.$index)" v-if="form.attrList.length > 1">
                  <button
                    type="button"
                    data-repeater-delete=""
                    class="btn btn-sm btn-icon btn-light-danger"
                  >
                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr088.svg-->
                    <span class="svg-icon svg-icon-2">
                      <SvgIcon icon="remove" />
                    </span>
                    <!--end::Svg Icon-->
                  </button>
                </span>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="属性" prop="attrName" min-width="120">
            <template #default="scope">
              <!--            <el-select v-model="scope.row.attrCode" @change="setSkuList">-->
              <el-form-item
                label-width="0"
                :prop="'attrList.' + scope.$index + '.attrCode'"
                :rules="rules.attrCode"
              >
                <el-select
                  v-model="scope.row.attrCode"
                  @change="attrCodeChange(scope.$index)"
                  clearable
                >
                  <el-option
                    v-for="item in productAttrList"
                    :key="item.attrCode"
                    :label="item.attrName"
                    :value="item.attrCode"
                    :disabled="isDisable(item.attrCode)"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="属性值" min-width="160">
            <template #default="scope">
              <el-form-item
                label-width="0"
                :prop="'attrList.' + scope.$index + '.attrValueCodeList'"
                :rules="rules.attrValueCodeList"
              >
                <el-checkbox-group
                  class="mh-275px overflow-y-scroll"
                  v-model="scope.row.attrValueCodeList"
                  @change="setSkuList"
                >
                  <el-checkbox
                    v-for="item in attrMap[scope.row.attrCode]"
                    :key="item.attrValueCode"
                    :label="item.attrValueCode"
                  >
                    {{ item.attrValueName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="small" @click="addAttr" :disabled="disabled">
          添加属性
        </el-button>
      </KeenCard>
    </div>
    <el-radio-group
      class="mb-5"
      v-model="sortType"
      size="small"
      @change="sortByStatus"
      v-if="!isProductGroup"
    >
      <el-radio-button :label="0">所有</el-radio-button>
      <el-radio-button :label="1">待上架</el-radio-button>
      <el-radio-button :label="2">在销售</el-radio-button>
      <el-radio-button :label="3">清仓中</el-radio-button>
      <el-radio-button :label="4">已退市</el-radio-button>
    </el-radio-group>
    <KeenCard title="SKU信息" v-if="!isProductGroup">
      <vxe-table
        :loading="listLoading"
        :data="
          form.skuList.filter((item) =>
            sortType > 0 ? item.state === sortType && item.activeFlag : item.activeFlag
          )
        "
        show-overflow
        show-header-overflow
        show-footer-overflow
        height="600"
        :cell-config="{ height: 120 }"
        :column-config="{ resizable: true }"
        :scroll-y="{ enabled: true, gt: 0 }"
        :scroll-x="{ enabled: true, gt: 0 }"
      >
        <vxe-column title="属性信息" align="center">
          <template #default="scope">
            <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
              <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                <div
                  v-for="(item, index) in scope.row.attrvalueList"
                  :key="index"
                  class="d-flex flex-center flex-nowrap"
                >
                  <div>{{ item.attrValueName }}</div>
                  <SvgIcon
                    v-if="index !== scope.row.attrvalueList.length - 1"
                    class-name="el-input__icon svg-icon-5 mx-3"
                    icon="multiple"
                  />
                </div>
              </div>
              <div v-else class="mb-7">
                {{ scope.row.attrvalueList[0].attrValueName }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="产品SKU" min-width="100">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$rowIndex + '.skuCode'"
              :rules="rules.skuCode"
              class="pe-6"
            >
              <el-input
                v-if="form.attrList && form.attrList.length > 0"
                v-model="scope.row.skuCode"
                placeholder="请输入产品SKU"
                clearable
                :disabled="scope.row.productSpu"
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
        <vxe-column title="产品SKU名称" min-width="180">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$rowIndex + '.productTitle'"
                :rules="rules.productTitle"
              >
                <el-input v-model="scope.row.productTitle" placeholder="请输入中文名称" clearable />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$rowIndex + '.productTitleEn'"
                :rules="rules.productTitleEn"
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
        <vxe-column title="SKU图片" min-width="230">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-5">
              <KeenImageUpload
                v-model="scope.row.productImageList[0]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[1]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[2]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
            </div>
          </template>
        </vxe-column>
        <vxe-column title="SKU建议销售价" min-width="100">
          <template #default="scope" class="pe-3">
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$rowIndex + '.suggestPrice'"
              :rules="rules.suggestPrice"
            >
              <el-input v-model="scope.row.suggestPrice" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$rowIndex + '.suggestPriceCurrencyCode'"
              :rules="rules.suggestPriceCurrencyCode"
            >
              <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" />
            </el-form-item>
          </template>
        </vxe-column>
        <vxe-column title="型号" min-width="150">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$rowIndex + '.modelCode'"
              :rules="rules.modelCode"
            >
              <el-select
                v-model="scope.row.modelCode"
                placeholder="请选择型号"
                clearable
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
        <vxe-column title="操作" min-width="30">
          <template #default="scope">
            <el-link
              v-if="scope.row.state === 1"
              type="danger"
              :underline="false"
              @click="quitSku(scope.row, scope.$rowIndex)"
              :disabled="scope.row.abandonFlag === false"
            >
              废弃
            </el-link>
          </template>
        </vxe-column>
      </vxe-table>

      <!--      <el-table
        :data="
          form.skuList.filter((item) =>
            sortType > 0 ? item.state === sortType && item.activeFlag : item.activeFlag
          )
        "
      >
        <el-table-column label="属性信息" align="center">
          <template #default="scope">
            <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
              <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                <div
                  v-for="(item, index) in scope.row.attrvalueList"
                  :key="index"
                  class="d-flex flex-center flex-nowrap"
                >
                  <div>{{ item.attrValueName }}</div>
                  <SvgIcon
                    v-if="index !== scope.row.attrvalueList.length - 1"
                    class-name="el-input__icon svg-icon-5 mx-3"
                    icon="multiple"
                  />
                </div>
              </div>
              <div v-else class="mb-7">
                {{ scope.row.attrvalueList[0].attrValueName }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="产品SKU" min-width="100">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$index + '.skuCode'"
              :rules="rules.skuCode"
              class="pe-6"
            >
              <el-input
                v-if="form.attrList && form.attrList.length > 0"
                v-model="scope.row.skuCode"
                placeholder="请输入产品SKU"
                clearable
                :disabled="scope.row.productSpu"
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
        </el-table-column>
        <el-table-column label="产品SKU名称" min-width="180">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$index + '.productTitle'"
                :rules="rules.productTitle"
              >
                <el-input v-model="scope.row.productTitle" placeholder="请输入中文名称" clearable />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$index + '.productTitleEn'"
                :rules="rules.productTitleEn"
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
        <el-table-column label="SKU图片" min-width="230">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-5">
              <KeenImageUpload
                v-model="scope.row.productImageList[0]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[1]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[2]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU建议销售价" min-width="100">
          <template #default="scope" class="pe-3">
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
              <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="型号" min-width="150">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$index + '.modelCode'"
              :rules="rules.modelCode"
            >
              <el-select
                v-model="scope.row.modelCode"
                placeholder="请选择型号"
                clearable
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
        <el-table-column label="操作" min-width="30">
          <template #default="scope">
            <el-link
              v-if="scope.row.state === 1"
              type="danger"
              :underline="false"
              @click="quitSku(scope.row, scope.$index)"
              :disabled="scope.row.abandonFlag === false"
            >
              废弃
            </el-link>
          </template>
        </el-table-column>
      </el-table>-->

      <el-divider v-if="invalidSkuList?.length > 0">
        <div class="d-flex flex-center cursor-pointer text-gray-600" @click="hideFlag = !hideFlag">
          <span>{{ hideFlag ? '展开' : '收起' }}废弃SKU</span>
          <svgIcon v-if="hideFlag" icon="arrows-arr072" class="svg-icon svg-icon-1" />
          <svgIcon v-else icon="arrows-arr073" class="svg-icon svg-icon-1" />
        </div>
      </el-divider>
      <div v-show="!hideFlag && invalidSkuList?.length > 0">
        <vxe-table
          :data="invalidSkuList.filter((item) => (sortType > 0 ? item.state === sortType : true))"
          :show-header="false"
        >
          <vxe-column title="属性信息" align="center">
            <template #default="scope">
              <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                  <div
                    v-for="(item, index) in scope.row.attrvalueList"
                    :key="index"
                    class="d-flex flex-center flex-nowrap"
                  >
                    <div>{{ item.attrValueName }}</div>
                    <SvgIcon
                      v-if="index !== scope.row.attrvalueList.length - 1"
                      class-name="el-input__icon svg-icon-5 mx-3"
                      icon="multiple"
                    />
                  </div>
                </div>
                <div v-else class="mb-7">
                  {{ scope.row.attrvalueList[0].attrValueName }}
                </div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="产品SKU" min-width="120">
            <template #default="scope">
              <div class="mb-2">{{ scope.row.skuCode }}</div>
              <div class="badge badge-secondary">已取消</div>
            </template>
          </vxe-column>
          <vxe-column title="产品SKU名称" min-width="180">
            <template #default="scope">
              <div class="mw-550px">
                <div class="mb-5">
                  {{ scope.row.productTitle }}
                </div>

                <div>{{ scope.row.productTitleEn }}</div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="SKU图片" min-width="230">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageList[0]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[1]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[2]"
                  :size="skuImageSize"
                  disabled
                />
              </div>
            </template>
          </vxe-column>
          <vxe-column title="SKU建议销售价" min-width="100">
            <template #default="scope" class="pe-3">
              <div class="mb-3">
                {{ scope.row.suggestPrice }}
              </div>
              <el-form-item label-width="0">
                <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" disabled />
              </el-form-item>
            </template>
          </vxe-column>
          <vxe-column title="型号" min-width="150">
            <template #default="scope">
              <div class="mb-3">
                {{ scope.row.modelCode }}
              </div>
            </template>
          </vxe-column>
          <vxe-column title="操作" min-width="30">
            <template #default="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="launchSku(scope.row, scope.$rowIndex)"
              >
                启用
              </el-link>
            </template>
          </vxe-column>
        </vxe-table>

        <!--        <el-table
          :data="invalidSkuList.filter((item) => (sortType > 0 ? item.state === sortType : true))"
          :show-header="false"
        >
          <el-table-column label="属性信息" align="center">
            <template #default="scope">
              <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                  <div
                    v-for="(item, index) in scope.row.attrvalueList"
                    :key="index"
                    class="d-flex flex-center flex-nowrap"
                  >
                    <div>{{ item.attrValueName }}</div>
                    <SvgIcon
                      v-if="index !== scope.row.attrvalueList.length - 1"
                      class-name="el-input__icon svg-icon-5 mx-3"
                      icon="multiple"
                    />
                  </div>
                </div>
                <div v-else class="mb-7">
                  {{ scope.row.attrvalueList[0].attrValueName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品SKU" min-width="120">
            <template #default="scope">
              <div class="mb-2">{{ scope.row.skuCode }}</div>
              <div class="badge badge-secondary">已取消</div>
            </template>
          </el-table-column>
          <el-table-column label="产品SKU名称" min-width="180">
            <template #default="scope">
              <div class="mw-550px">
                <div class="mb-5">
                  {{ scope.row.productTitle }}
                </div>

                <div>{{ scope.row.productTitleEn }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU图片" min-width="230">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageList[0]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[1]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[2]"
                  :size="skuImageSize"
                  disabled
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU建议销售价" min-width="100">
            <template #default="scope" class="pe-3">
              <div class="mb-3">
                {{ scope.row.suggestPrice }}
              </div>
              <el-form-item label-width="0">
                <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="30">
            <template #default="scope">
              <el-link
                type="primary"
                :underline="false"
                @click="launchSku(scope.row, scope.$index)"
              >
                启用
              </el-link>
            </template>
          </el-table-column>
        </el-table>-->
      </div>
    </KeenCard>

    <KeenCard title="组合SKU信息" v-if="isProductGroup">
      <el-form ref="groupFormRef" :model="form" :rules="rules" label-position="left">
        <el-table :data="form.skuList">
          <el-table-column label="组合信息" min-width="150">
            <template #default="scope">
              <el-form-item v-if="Array.isArray(scope.row.skuItemBeanList)" label-width="0">
                <el-row
                  class="w-100 mb-1 align-items-center pe-5"
                  v-for="(item, index) in scope.row.skuItemBeanList"
                  :key="item.skuCode"
                >
                  <el-col :span="4">
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
                  <el-col :span="14" style="text-align: left">
                    <span>{{ item?.skuCode }}</span>
                  </el-col>
                  <el-col :span="6">
                    <NumberInput v-model="item.qty" placeholder="请输入数量" :precision="0" />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-button
                type="primary"
                size="small"
                plain
                @click="addSku(scope.row.skuItemBeanList, scope.$index)"
              >
                添加SKU
              </el-button>
              <el-form-item
                label-width="0"
                :prop="'skuList[' + scope.$index + '].skuItemBeanList'"
                :rules="rules.skuItemBeanList"
              />
            </template>
          </el-table-column>

          <el-table-column label="产品SKU" min-width="100">
            <template #default="scope">
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$index + '.skuCode'"
                :rules="rules.skuCode"
                class="pe-6"
              >
                <!-- <el-input
                v-if="scope.row.isNew"
                v-model="scope.row.skuCode"
                placeholder="请输入产品SKU"
                clearable
                @blur="
                  (e) => {
                    isExist(e, 2);
                  }
                "
              /> -->

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

                <!-- <el-button
                @click="addOneSku(scope.$index)"
                type="primary"
                size="small"
                plain
                v-if="!scope.row.skuCode"
              >
                选择SKU
              </el-button> -->
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="产品SKU名称" min-width="180">
            <template #default="scope">
              <div class="pe-6 mw-550px">
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.$index + '.productTitle'"
                  :rules="rules.productTitle"
                >
                  <el-input
                    v-model="scope.row.productTitle"
                    placeholder="请输入中文名称"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.$index + '.productTitleEn'"
                  :rules="rules.productTitleEn"
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
          <el-table-column label="SKU图片" min-width="230">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageList[0]"
                  directory="product/goods"
                  tooltip="更改产品图片"
                  :size="skuImageSize"
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[1]"
                  directory="product/goods"
                  tooltip="更改产品图片"
                  :size="skuImageSize"
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[2]"
                  directory="product/goods"
                  tooltip="更改产品图片"
                  :size="skuImageSize"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU建议销售价" min-width="100">
            <template #default="scope" class="pe-3">
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
                <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="型号" min-width="150">
            <template #default="scope">
              <el-form-item
                label-width="0"
                :prop="'skuList.' + scope.$index + '.modelCode'"
                :rules="rules.modelCode"
              >
                <el-select
                  v-model="scope.row.modelCode"
                  placeholder="请选择型号"
                  clearable
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
          <el-table-column label="操作" min-width="20" align="right">
            <template #default="scope">
              <el-link
                type="danger"
                :underline="false"
                @click="delProductGroup(scope.row, scope.$index)"
              >
                删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-divider border-style="dotted" />
      <div class="d-flex flex-center flex-wrap">
        <el-button plain type="primary" @click="addGroup" size="small">新增组合SKU</el-button>
      </div>
    </KeenCard>
    <KeenCard title="其他信息">
      <el-form
        ref="otherFormRef"
        :model="form"
        :rules="rules"
        label-width="150"
        class="mw-700px px-7"
        label-position="left"
      >
        <el-form-item label="品牌：">
          <span>{{ form?.brandName }}</span>
        </el-form-item>
        <el-form-item label="系列：">
          <div class="d-flex w-100 gap-3 align-items-center">
            <el-select
              v-model="form.seriesCodeList"
              placeholder="请选择系列"
              clearable
              filterable
              multiple
              class="w-100"
            >
              <el-option
                v-for="item in seriesOptions"
                :key="item.seriesCode"
                :label="item.seriesName || ''"
                :value="item.seriesCode!"
              />
            </el-select>
            <el-button type="primary" size="small" @click="addSeriesVisible = true">
              新增系列
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="型号：">
          <div class="d-flex w-100 gap-3 align-items-center">
            <el-select
              v-model="form.modelCodeList"
              placeholder="请选择型号"
              clearable
              filterable
              multiple
              class="w-100"
              @change="handleModelCodeListChange"
            >
              <el-option
                v-for="item in modelOptions"
                :key="item.modelCode"
                :label="item.modelName || ''"
                :value="item.modelCode!"
              />
            </el-select>
            <el-button type="primary" size="small" @click="addModelVisible = true">
              新增型号
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="产品品线：" prop="productLine">
          <ProductLineSelect v-model="form.productLine" placeholder="请选择品线" clearable />
        </el-form-item>
        <el-form-item label="产品标签：">
          <el-select
            v-model="form.tagCodeList"
            placeholder="请选择标签"
            clearable
            filterable
            multiple
            class="w-100"
          >
            <el-option
              v-for="item in tagOptions"
              :key="item.tagCode"
              :label="item.tagName || ''"
              :value="item.tagCode!"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </KeenCard>
  </el-form>

  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel" v-if="showCancel">取消</el-button>
      <el-button
        v-if="[0, 3].includes(form.state)"
        type="primary"
        :loading="saveLoading"
        :disabled="saveLoading"
        @click="save(1)"
      >
        {{ form.state === 0 ? '保存草稿' : '保存' }}
      </el-button>
      <el-button
        v-if="form.state === 0"
        type="primary"
        :loading="saveLoading"
        :disabled="saveLoading"
        @click="save(2)"
      >
        确认提交
      </el-button>
      <el-button
        v-if="[1, 2].includes(form.state)"
        type="primary"
        :loading="saveLoading"
        :disabled="saveLoading"
        @click="save(2)"
      >
        {{
          form?.skuList?.filter((item) => !sqlSkuList?.map((i) => i.skuCode).includes(item.skuCode))
            ?.length > 0 ||
          form?.skuList?.filter(
            (item) =>
              item.activeFlag !== sqlSkuList?.find((i) => i.skuCode === item.skuCode)?.activeFlag
          )?.length > 0
            ? '确认提交'
            : '保存'
        }}
      </el-button>
    </el-space>
  </div>
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
</template>

<script setup lang="ts" name="goodsEdit">
  import { ProductApi, productApi } from '@/api';
  import { FormInstance, FormRules, ElMessage } from 'element-plus';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { cloneDeep, omit } from 'lodash-es';
  import * as swal from '@/utils/swal';
  import AddModal from '@/views/lute-os/goodscenter/seriesmanage/serieslist/Modal/addSeries.vue';
  import AddModel from '@/views/lute-os/goodscenter/modelmanage/modellist/Modal/addModel.vue';
  import BindSkuOne from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';
  import BindSkuMultiple from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';

  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
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
    operateType: '',
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
    productId: '',
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
    productTypeDesc: 1,
    /** 系列信息 */
    seriesCodeList: [],
    /** sku信息 */
    skuList: [],
    invalidSkuList: [],
    /** 建议销售价格 */
    suggestSellPrice: '',
    /** 产品标签 */
    tagCodeList: [],
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
        trigger: ['blur', 'change'],
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
  const skuImageSize = computed(() => {
    return offsetWidth.value > 975 ? offsetWidth.value / 20 : offsetWidth.value / 15;
  });

  const invalidSkuList = computed(() => {
    return form.skuList?.filter((item) => !item.activeFlag) || [];
  });

  const listLoading = ref(false);

  const sortType = ref<number>(2);
  const sortByStatus = (val) => {
    listLoading.value = true;
    const defaultSort = [2, 1, 3, 4];
    const curSort = val
      ? defaultSort.sort((a) => {
          return a === val ? -1 : 1;
        })
      : defaultSort;
    form.skuList?.sort((a, b) => {
      return curSort.indexOf(a.state) - curSort.indexOf(b.state);
    });
    listLoading.value = false;
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
  const getDetailInfo = async (code) => {
    try {
      listLoading.value = true;
      const res = await productApi.luteosProductQueryDetail({
        productSpu: code,
        operationType: 'detail',
      });
      Object.keys(form).forEach((key) => {
        form[key] = res[key] ?? form[key];
      });
      let parent = res?.productCategory;
      for (let i = 1; i <= 5; i += 1) {
        form.categoryCode?.push(parent?.categoryCode);
        categoryName.value?.push(parent?.categoryName);
        parent = parent?.productCategory;
      }
      console.log(form.categoryCode);
      getProductAttrList(form.categoryCode[form.categoryCode?.length - 1]);
      sortType.value = 2;
      sortByStatus(2);
    } finally {
      listLoading.value = false;
    }
  };

  const productAttrList = ref<any[]>([]);
  const attrMap = reactive({});
  const getProductAttrList = async (val) => {
    const res = await productApi.luteosProductAttrQueryProductAttrList({
      categoryCode: val,
    });
    productAttrList.value = res.productAttrList || [];
    if (productAttrList.value.length > 0) {
      productAttrList.value.forEach((item) => {
        attrMap[item.attrCode] = item.attrValueBeanList;
      });
    }
  };

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
  // 添加属性
  const addAttr = async () => {
    if (toAddAttrFlag.value === true) {
      await getProductAttrList(form.categoryCode[form.categoryCode.length - 1]);
      toAddAttrFlag.value = false;
    }
    if (productAttrList.value.length === 0) {
      // 未添加属性、先去添加
      const isConfirmed = await swal.confirm({
        text: '产品分类尚未关联属性',
        confirmButtonText: '去添加',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (isConfirmed) {
        toAddAttrFlag.value = true;
        router.push(`/categorylist/detail?code=${form.categoryCode[form.categoryCode.length - 1]}`);
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

  const skuUpdateFlag = ref<boolean>(false);
  const setSkuList = () => {
    // 旧产品
    if (form.attrList.length === 0) {
      skuUpdateFlag.value = true;
      return;
    }
    const oldSkuList = form.skuList;
    const skuList = form.state === 1 || form.state === 2 ? cloneDeep(sqlSkuList) : [];
    const list = form.attrList.filter((item) => {
      return !!item.attrCode;
    });
    // 只选了一个属性
    if (list.length === 1) {
      list[0].attrValueCodeList.forEach((item) => {
        const attrvalueList = [
          {
            attrValueCode: item,
            attrValueName: getAttrValueName(list[0].attrCode, item),
          },
        ];
        if (
          !Object.keys(sqlSkuMap)?.includes(
            JSON.stringify(
              attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            )
          ) ||
          ![1, 2].includes(form.state)
        ) {
          skuList.unshift({
            activeFlag: true,
            attrValuecodeList: [item],
            attrvalueList,
            skuCode:
              sqlSkuMap[
                JSON.stringify(
                  attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
                )
              ] || '',
            productImageList: [],
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
        if (
          !Object.keys(sqlSkuMap)?.includes(
            JSON.stringify(
              attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            )
          ) ||
          ![1, 2].includes(form.state)
        ) {
          skuList.unshift({
            activeFlag: true,
            attrValuecodeList: item,
            attrvalueList,
            skuCode:
              sqlSkuMap[
                JSON.stringify(
                  attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
                )
              ] || '',
            productImageList: [],
            state: 1,
          });
        }
      });
    }
    // 遍历旧列表回显数据
    skuList.forEach((item) => {
      const same = oldSkuList.find((old) => {
        return (
          (old.skuCode && item.skuCode === old.skuCode) ||
          (old.attrvalueList &&
            JSON.stringify(
              item.attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            ) ===
              JSON.stringify(
                old.attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
              ))
        );
      });
      if (same) {
        Object.keys(same).forEach((key) => {
          item[key] = same[key];
        });
      }
    });
    skuUpdateFlag.value = true;
    form.skuList = skuList.sort((a, b) => (!b.activeFlag ? -1 : 1));
  };

  // 废弃sku
  const quitSku = async (row, index) => {
    const isConfirmed = await swal.confirm('确定废弃吗');
    if (isConfirmed) {
      row.activeFlag = false;
      // 数据移动到最后
      form.skuList.push(...form.skuList.splice(index, 1));
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
    });
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
      formRef.value.validateField([`skuList[${curIndex.value}].skuCode`]);
    }
    addOneSkuVisible.value = false;
  };
  // 删除组合
  const delProductGroup = async (row, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.skuList.splice(index, 1);
    }
  };

  // 删除sku
  const removeSku = async (groupIndex, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.skuList[groupIndex]?.skuItemBeanList?.splice(index, 1);
      formRef.value.validateField([`skuList[${groupIndex}].skuList`]);
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

  const saveLoading = ref<boolean>(false);

  const save = async (operateType) => {
    if (isProductGroup.value && (!form.skuList || form.skuList.length === 0)) {
      ElMessage.warning('组合SKU信息不能为空');
      return;
    }
    if (operateType === 1) {
      const isValid = await Promise.all([
        formRef.value?.validateField(['name', 'createBy']),
        otherFormRef.value.validate(),
        isProductGroup.value && groupFormRef.value.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        }),
      ]);
      if (!isValid) return;
    }
    if (operateType === 2) {
      sortType.value = 0;
      const isValid = await Promise.all([
        formRef.value.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        }),
        otherFormRef.value.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        }),
        isProductGroup.value && groupFormRef.value.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        }),
      ]);
      if (!isValid) return;
    }
    try {
      saveLoading.value = true;
      // setSkuList();
      form.skuList.forEach((item) => {
        if (item.productImageList.length > 0) {
          item.productImageUrl = item.productImageList[0];
        }
        if (item.attrvalueList && item.attrvalueList.length > 0) {
          const attrValuecodeList = [];
          item.attrvalueList.forEach((attr) => {
            attrValuecodeList.push(attr.attrValueCode);
          });
          item.attrValuecodeList = attrValuecodeList;
        }
      });
      const data = {
        ...form,
        operateType:
          operateType === 2
            ? form?.skuList?.filter(
                (item) => !sqlSkuList?.map((i) => i.skuCode).includes(item.skuCode)
              )?.length > 0 ||
              form?.skuList?.filter(
                (item) =>
                  item.activeFlag !==
                  sqlSkuList?.find((i) => i.skuCode === item.skuCode)?.activeFlag
              )?.length > 0
              ? 2
              : 1
            : operateType,
        categoryCode: form.categoryCode[4],
        skuUpdateFlag: true,
      };
      // console.log('data', data);
      const res = await productApi.luteosProductSaveProduct(omit(data, ['invalidSkuList']));
      swal.success(operateType === 1 ? '保存成功' : '提交成功');
      getDetailInfo(res?.productSpu || form.productSpu);
    } finally {
      saveLoading.value = false;
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

    router.push('/goodslist');
  };

  // 获取其他信息options
  const brandOptions = ref([]);
  const modelOptions = ref([]);
  const seriesOptions = ref([]);
  const tagOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
    seriesOptions.value = res.seriesBeanList;
    tagOptions.value = res.tagBeanList;
  };
  getProductRelationList();

  onMounted(() => {
    getDetailInfo(route.query.code);
  });
</script>

<style scoped lang="scss">
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

  :deep(.vxe-cell) {
    max-height: unset !important;
  }
</style>
