<template>
  <el-form
    :model="formModel"
    ref="formRef"
    :rules="rules"
    label-width="100px"
    :inline="true"
    scroll-to-error
  >
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :offset="0">
        <KeenCard title="">
          <el-form-item label="规则名称" prop="name">
            <el-input
              v-model="formModel.name"
              word-limit="10"
              maxlength="10"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
          </el-form-item>
          <el-form-item label="规则状态">
            <el-radio-group v-model="formModel.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="formModel.priority" :precision="0" :min="0" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label="生效时间" prop="effectiveTimeBegin">
            <el-date-picker
              v-model="formModel.effectiveTimeBegin"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="规则描述" prop="baseInfo.name">
            <el-input
              class="w-300px"
              v-model="formModel.description"
              word-limit="255"
              maxlength="255"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
          </el-form-item>
        </KeenCard>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 0 !important; background: white">
      <div class="dynamic-form-container">
        <!-- 左侧：字段选择 -->
        <div class="left-panel">
          <div class="title">基础信息</div>
          <div v-for="field in baseFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>

          <div class="title">仓库物流</div>
          <div v-for="field in warehouseFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div>

          <!-- <div class="title">订单</div>
          <div v-for="field in orderFields" :key="field.key" class="field-item">
            <el-checkbox v-model="selectedFields[field.key]" @change="updateForm">
              {{ field.label }}
            </el-checkbox>
          </div> -->
        </div>
        <!-- 右侧：动态表单 -->
        <div class="right-panel">
          <div class="formItem">已选条件({{ visibleFields.length }}项)</div>
          <el-form
            :model="formModel"
            :rules="rules"
            :inline="false"
            ref="conditionFormRef"
            class="right-form"
            label-width="150px"
          >
            <el-form-item
              v-for="field in visibleFields"
              :key="field.key"
              :label="field.label"
              :prop="field.key"
            >
              <!-- {{ field }} -->
              <!-- {{ formModel }} -->
              <div v-if="field.key === 'orderPlatform'" class="select-prepend">
                <el-select v-model="formModel[field.key].operator" style="width: 60px">
                  <el-option value="in" label="属于" />
                  <el-option value="!intersection" label="不属于" />
                </el-select>
                <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                  <el-select
                    clearable
                    filterable
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="10"
                    multiple
                    v-model="formModel[field.key].rightSides"
                    :placeholder="field.placeholder"
                    :options="channelMap"
                    class="rule-inner-select"
                    :validate-event="true"
                  />
                </el-form-item>
                <span class="tips padl15 noshrink">
                  已选{{ formModel[field.key]?.rightSides?.length }}项
                </span>
              </div>
              <div v-else-if="field.key === 'orderStore'" class="select-prepend">
                <el-select v-model="formModel[field.key].operator" style="width: 60px">
                  <el-option value="in" label="属于" />
                  <el-option value="!intersection" label="不属于" />
                </el-select>
                <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                  <el-select
                    clearable
                    filterable
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="10"
                    multiple
                    v-model="formModel[field.key].rightSides"
                    :placeholder="field.placeholder"
                    :options="shopArr"
                    class="rule-inner-select"
                  />
                </el-form-item>
                <!-- disabled="field.disabled" -->
                <span class="tips padl15 noshrink">
                  已选{{ formModel[field.key]?.rightSides?.length }}项
                </span>
              </div>
              <div v-else-if="field.key === 'shippingWarehouse'" class="w100">
                <!-- <el-form-item :prop="`${field.key}.rightSides`" class="d-flex"> -->
                <div class="d-flex">
                  <el-form-item :prop="`${field.key}.rightSides`" class="full-row">
                    <el-select
                      clearable
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="10"
                      filterable
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :disabled="field.disabled"
                      :options="warehouseArr"
                    />
                  </el-form-item>
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div>
                <!-- </el-form-item> -->
              </div>
              <div v-else-if="field.key === 'receiverCountry'" class="select-prepend">
                <el-select v-model="formModel[field.key].operator" style="width: 60px">
                  <el-option value="in" label="属于" />
                  <el-option value="!intersection" label="不属于" />
                </el-select>
                <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                  <el-select
                    clearable
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="10"
                    filterable
                    v-model="formModel[field.key].rightSides"
                    :placeholder="field.placeholder"
                    :disabled="field.disabled"
                    :options="countryArr"
                    class="rule-inner-select"
                  />
                </el-form-item>
                <span class="tips padl15 noshrink">
                  已选{{ formModel[field.key]?.rightSides?.length }}项
                </span>
              </div>

              <div
                v-else-if="field.key === 'receiverProvince' || field.key === 'receiverCity'"
                class="flex-container"
              >
                <div class="tips full-row">
                  支持批量复制不同分项按逗号分隔，按回车键(enter)或点击鼠标完成输入
                </div>
                <div class="d-flex select-prepend formItem full-row">
                  <el-select
                    v-model="formModel[field.key].operator"
                    default-first-option
                    style="width: 60px"
                  >
                    <el-option value="in" label="属于" />
                    <el-option value="!intersection" label="不属于" />
                  </el-select>
                  <el-form-item :prop="`${field.key}.rightSides`" style="flex: 1">
                    <el-select
                      clearable
                      multiple
                      filterable
                      :allow-create="true"
                      :default-first-option="true"
                      :reserve-keyword="false"
                      v-model="formModel[field.key].rightSides"
                      :placeholder="field.placeholder"
                      :disabled="field.disabled"
                      :options="
                        formModel[field.key].rightSides.map((item) => {
                          return { label: item.value, value: item };
                        })
                      "
                      @keyup.enter="handleEnter(field.key, field)"
                      @blur="handleBlur(field.key, field)"
                      class="hidden-dropdown rule-inner-select"
                      popper-class="province-select "
                    />
                  </el-form-item>
                  <!-- <el-checkbox-group
                    v-model="formModel[field.key + 'CheckList']"
                    :options="field.options"
                  /> -->
                  <span class="tips padl15 noshrink">
                    <el-checkbox-group v-model="formModel[field.key].configs">
                      <el-checkbox label="不区分大小写" value="IN_CASE_SENSITIVE" />
                    </el-checkbox-group>
                  </span>
                </div>
              </div>
              <div v-else-if="field.key === 'logisticsChannel'" class="w100">
                <div class="d-flex formItem">
                  <!-- <el-select
                    clearable
                    multiple
                    filterable
                    v-model="formModel[field.key]"
                    :placeholder="field.placeholder"
                    :disabled="field.disabled"
                    :options="field.options"
                  /> -->
                  <el-form-item :prop="`${field.key}.rightSides`" class="full-row">
                    <el-cascader
                      v-model="formModel[field.key].rightSides"
                      :options="shipmentArr"
                      style="width: 100%"
                      :props="{
                        expandTrigger: 'hover',
                        multiple: true,
                        checkStrictly: false,
                        emitPath: false, // 只返回最后一级的值
                        // checkStrictly: true, // 可选：是否可以选择任意一级
                      }"
                      show-checked-strategy="child"
                      :max-collapse-tags="2"
                      :placeholder="field.placeholder"
                      filterable
                      clearable
                      collapse-tags
                      collapse-tags-tooltip
                    />
                  </el-form-item>
                  <span class="tips padl15 noshrink">
                    已选{{ formModel[field.key]?.rightSides?.length }}项
                  </span>
                </div>
              </div>
              <div v-else-if="field.type === 'select'" class="select-prepend">
                <el-select v-model="formModel[field.key].operator" style="width: 60px">
                  <el-option value="in" label="属于" />
                  <el-option value="!intersection" label="不属于" />
                </el-select>
                <el-select
                  clearable
                  filterable
                  v-model="formModel[field.key]"
                  :placeholder="field.placeholder"
                  :options="field.options"
                  :disabled="field.disabled"
                />
                <span class="tips padl15 noshrink">
                  已选{{ formModel[field.key]?.rightSides?.length }}项
                </span>
              </div>
              <!--  v-if="field.type !== 'select'" -->
              <!-- <component
                v-else
                :is="getFieldComponent(field)"
                v-model="formModel[field.key]"
                :placeholder="field.placeholder"
                :options="field.options"
                :disabled="field.disabled"
                style="width: 100%"
              /> -->
            </el-form-item>
          </el-form>
          <KeenCard title="设定动作">
            <div class="demo-collapse">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="规则执行说明" name="1">
                  <template #icon="{ isActive }">
                    <el-icon v-if="isActive" class="activeColor"><CaretTop /></el-icon>
                    <el-icon v-else class="activeColor"><CaretBottom /></el-icon>
                  </template>
                  <template #title="{ isActive }">
                    <div class="d-flex">
                      <div class="flex1 padl15">
                        <el-icon
                          class="header-icon activeColor"
                          size="16"
                          style="position: relative; top: 3px"
                        >
                          <info-filled />
                        </el-icon>
                        规则执行说明
                      </div>
                      <div class="switch activeColor">
                        {{ isActive ? '收起' : '展开' }}
                      </div>
                    </div>
                  </template>

                  <li class="info-text">
                    仓配综合规则->比价：在订单进行运费试算前，会先执行收件信息规则，将收件地址信息优化后再推送物流服务商进行试算
                  </li>
                  <li class="info-text">
                    自营仓/三方仓发货，且使用API物流或平台物流下单：会先执行收件信息规则，将收件地址信息优化后再向服务商下单
                  </li>
                  <li class="info-text">
                    自营仓/三方仓发货，使用三方仓渠道：会先执行收件信息规则，将收件地址信息优化后再推送给自营仓/三方仓
                  </li>
                  <li class="info-text">
                    平台仓发货：会先执行收件信息规则，将收件地址信息优化后再推送给平台仓
                  </li>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="padb20">
              <div class="d-flex align-items-center">
                <el-checkbox value="Value 1" v-model="formModel.houseNumberCheck" />
                门牌号解析
                <span class="tips padl6">
                  (门牌号如果不为空，执行规则将会导致原门牌号被覆盖，建议选择【门牌号】为空条件，再配置门牌号解析规则)
                </span>
              </div>

              <div class="houseNumber bg2" v-if="formModel.houseNumberCheck">
                <!-- <el-radio-group v-model="formModel.houseNumberAnalysis"> -->
                <el-radio-group v-model="formModel.actionParams.receiveHouseNumber.desc">
                  <div class="checkItem">
                    <el-radio value="识别订单地址中的【数字】作为门牌号后推送">
                      <template #default>
                        识别订单地址中的【数字】作为门牌号后推送
                        <!-- ，识别后
                        <el-select
                          v-model="formModel.actionParams.houseNumberDesc"
                          :disabled="formModel.houseNumberAnalysis !== 1"
                          style="width: 80px"
                        >
                          <el-option
                            value="识别订单地址中的【数字】作为门牌号后推送，识别后保留原地址门牌号"
                            label="保留"
                          />
                          <el-option
                            value="识别订单地址中的【数字】作为门牌号后推送，识别后删除原地址门牌号"
                            label="删除"
                          />
                        </el-select>
                        原地址门牌号 -->
                      </template>
                    </el-radio>
                  </div>
                  <!-- <div class="checkItem">
                    <el-radio :value="2">
                      <template #default>
                        识别订单地址中的数字以
                        <el-select
                          v-model="formModel.houseNumberAnalysisKeep"
                          :disabled="formModel.houseNumberAnalysis !== 2"
                          style="width: 80px"
                        >
                          <el-option :value="0" label="首部" />
                          <el-option :value="1" label="尾部" />
                        </el-select>
                        数字作为门牌号推送 ，识别后
                        <el-select
                          v-model="formModel.houseNumberAnalysisKeep"
                          :disabled="formModel.houseNumberAnalysis !== 2"
                          style="width: 80px"
                        >
                          <el-option :value="0" label="保留" />
                          <el-option :value="1" label="删除" />
                        </el-select>
                        地址门牌号
                      </template>
                    </el-radio>
                  </div>
                  <div class="checkItem">
                    <el-radio :value="3">
                      <template #default>
                        识别订单地址中的数字以
                        <el-select
                          v-model="formModel.houseNumberAnalysisKeep"
                          :disabled="formModel.houseNumberAnalysis !== 3"
                          style="width: 80px"
                        >
                          <el-option :value="0" label="首部" />
                          <el-option :value="1" label="尾部" />
                        </el-select>
                        <el-input-number
                          style="width: 90px; margin-left: 4px"
                          :disabled="formModel.houseNumberAnalysis !== 3"
                          step-strictly
                          v-model="formModel.num"
                          :min="1"
                          :max="100"
                          controls-position="right"
                          size="default"
                        />
                        数字作为门牌号推送 ，识别后
                        <el-select
                          v-model="formModel.houseNumberAnalysisKeep"
                          :disabled="formModel.houseNumberAnalysis !== 3"
                          style="width: 80px"
                        >
                          <el-option :value="0" label="保留" />
                          <el-option :value="1" label="删除" />
                        </el-select>
                        地址门牌号
                      </template>
                    </el-radio>
                  </div> -->
                </el-radio-group>
              </div>
            </div>
            <div class="padb20">
              <div class="d-flex align-items-center">
                <el-checkbox value="Value 1" v-model="formModel.telephoneCheck" />
                电话号码简化
                <span class="tips padl6">（收件人电话/手机号）</span>
              </div>
              <div class="houseNumber bg2" v-if="formModel.telephoneCheck">
                <el-checkbox-group v-model="formModel.telephoneAnalysis">
                  <div class="checkItem">
                    <el-checkbox :value="1">
                      <template #default>
                        分机号处理
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            说明：将“空格+ext.+空格”替换为“-”
                            <br />
                            电话号码：+1600-600-6000 ext. 00000
                            <br />
                            替换后：+1600-600-6000-00000
                            <br />
                            说明：从“ext.”前的空格开始去除后面的字符
                            <br />
                            电话号码：+1600-600-6000 ext. 000000
                            <br />
                            替换后：+1600-600-6000
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-select
                          clearable
                          class="marl4"
                          collapse-tags
                          :max-collapse-tags="10"
                          collapse-tags-tooltip
                          v-model="formModel.actionParams.receivePhone.extNumber"
                          :disabled="!formModel.telephoneAnalysis?.includes(1)"
                          style="width: 300px"
                        >
                          <el-option :value="1" label="将“ext.”（包括前后的空格）替换为“-”" />
                          <el-option :value="2" label="去掉分机号（仅支持ext.格式）" />
                        </el-select>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="2">
                      <template #default>
                        过滤特殊字符
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            过滤选中的特殊字符
                            <br />
                            选中【+】【(】【)】
                            <br />
                            电话号码：(+1)8765432100
                            <br />
                            过滤后：18765432100
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                      </template>
                    </el-checkbox>
                    <el-select
                      clearable
                      class="marl4"
                      multiple
                      collapse-tags
                      :max-collapse-tags="10"
                      collapse-tags-tooltip
                      v-model="formModel.actionParams.receivePhone.filterSpecialStrList"
                      :disabled="!formModel.telephoneAnalysis?.includes(2)"
                      style="width: 550px"
                      @click.stop.prevent
                    >
                      <!-- <el-option value="0" label="全选" /> -->
                      <el-option value="空格" label="空格" />
                      <el-option value="-" label="-" />
                      <el-option value="+" label="+" />
                      <el-option value="(" label="(" />
                      <el-option value=")" label=")" />
                      <el-option value="@" label="@" />
                      <el-option value="/" label="/" />
                      <el-option value="#" label="#" />
                      <el-option value="*" label="*" />
                      <el-option value="&" label="&" />
                    </el-select>
                  </div>
                  <div class="checkItem">
                    <el-checkbox
                      :value="3"
                      v-model="formModel.actionParams.receivePhone.filterTopZeroNumber"
                    >
                      <template #default>
                        <div class="lh32">
                          过滤头部为0的数字
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：从第一个字符0开始过滤掉连续的0
                              <br />
                              电话号码：0018765432100

                              <br />
                              过滤后：18765432100
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="4" v-model="formModel.nameAnalysis4">
                      <template #default>
                        <div class="lh32">
                          从第
                          <el-input-number
                            v-model="formModel.actionParams.receivePhone.subBeginIndex"
                            step-strictly
                            :min="1"
                            :max="100"
                            controls-position="right"
                            size="default"
                            maxlength="20"
                            class="mar4"
                            placeholder="请输入"
                            style="width: 100px"
                            :disabled="!formModel.telephoneAnalysis?.includes(4)"
                            @click.stop.prevent
                          />
                          个字符开始截取
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：一般用于去除国家/城市区号
                              <br />
                              填写：4
                              <br />
                              电话号码：(+1)8765432100
                              <br />
                              截取后：8765432100
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="5">
                      <template #default>
                        电话号码替换为
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            说明：将订单中的电话/手机号替换为填写号码
                            <br />
                            填写：600-600-6000-00000
                            <br />
                            电话号码：18765432100
                            <br />
                            替换后：600-600-6000-00000
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-input
                          v-model="formModel.actionParams.receivePhone.replaceAllStr"
                          maxlength="20"
                          class="marl4"
                          placeholder="请输入"
                          :disabled="!formModel.telephoneAnalysis?.includes(5)"
                          style="width: 200px"
                        />
                        <!-- :disabled="!formModel.postalEmailAnalysis?.includes(1)" -->
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="6">
                      <template #default>
                        电话号码为空填充为
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            说明：将订单中的电话/手机号替换为填写号码
                            <br />
                            填写：600-600-6000-00000
                            <br />
                            电话号码：--
                            <br />
                            替换后：600-600-6000-00000
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-input
                          v-model="formModel.actionParams.receivePhone.defaultPhoneNumber"
                          maxlength="20"
                          class="marl4"
                          placeholder="请输入"
                          :disabled="!formModel.telephoneAnalysis?.includes(6)"
                          style="width: 200px"
                        />
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="7">
                      <template #default>
                        <div class="lh32">
                          指定
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：指定字符替换为需要的字符，确保电话有效
                              <br />
                              指定填写：ext.
                              <br />
                              替换填写：-
                              <br />
                              电话号码：+1600-600-6000ext.00000
                              <br />
                              替换后：+1600-600-6000-00000
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                          <el-input
                            v-model="formModel.actionParams.receivePhone.replaceStr.replaceStrX"
                            maxlength="20"
                            class="mar4"
                            placeholder="请输入"
                            style="width: 200px"
                            :disabled="!formModel.telephoneAnalysis?.includes(7)"
                          />
                          替换为
                          <el-input
                            v-model="formModel.actionParams.receivePhone.replaceStr.replaceStrY"
                            maxlength="20"
                            class="mar4"
                            placeholder="请输入"
                            style="width: 200px"
                            :disabled="!formModel.telephoneAnalysis?.includes(7)"
                          />
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="padb20">
              <div class="d-flex align-items-center">
                <el-checkbox value="Value 1" v-model="formModel.postalCodeCheck" />
                收货邮编处理
              </div>
              <div class="houseNumber bg2" v-if="formModel.postalCodeCheck">
                <el-checkbox-group v-model="formModel.postalCodeAnalysis">
                  <div class="checkItem">
                    <el-checkbox :value="1">
                      <template #default>
                        过滤特殊字符
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            过滤选中的特殊字符
                            <br />
                            【'】
                            <br />
                            姓名：O'Connor
                            <br />
                            过滤后：OConnor
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-select
                          clearable
                          class="marl4"
                          multiple
                          collapse-tags
                          :max-collapse-tags="10"
                          collapse-tags-tooltip
                          v-model="formModel.actionParams.receivePostalCode.filterSpecialStrList"
                          :disabled="!formModel.postalCodeAnalysis?.includes(1)"
                          style="width: 550px"
                        >
                          <el-option value="空格" label="空格" />
                          <el-option value="-" label="-" />
                          <el-option value="+" label="+" />
                          <el-option value="(" label="(" />
                          <el-option value=")" label=")" />
                          <el-option value="@" label="@" />
                          <el-option value="/" label="/" />
                          <el-option value="#" label="#" />
                          <el-option value="*" label="*" />
                          <el-option value="&" label="&" />
                        </el-select>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox
                      :value="2"
                      v-model="formModel.actionParams.receivePostalCode.usPostalCodeTop5"
                    >
                      <template #default>
                        <div class="lh32">
                          去除扩展邮编（仅美国）
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：美国邮编保留前5位
                              <br />
                              邮编：90210-6789
                              <br />
                              去除后：90210
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="3">
                      <template #default>
                        邮编为空填充为
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            说明：订单中的邮编为空，填充为填写邮编
                            <br />
                            填写：12345
                            <br />
                            邮编：--
                            <br />
                            填充后：12345
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-input
                          v-model="formModel.actionParams.receivePostalCode.defaultPostalCode"
                          maxlength="20"
                          class="marl4"
                          placeholder="请输入"
                          :disabled="!formModel.postalCodeAnalysis?.includes(3)"
                          style="width: 200px"
                        />
                      </template>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="padb20">
              <div class="d-flex align-items-center">
                <el-checkbox value="Value 1" v-model="formModel.nameCheck" />
                收货姓名处理
                <!-- {{ formModel.actionParams.receiveName.replaceStrList }} -->
              </div>
              <div class="houseNumber bg2" v-if="formModel.nameCheck">
                <el-checkbox-group v-model="formModel.nameAnalysis">
                  <div class="checkItem">
                    <!-- v-model="formModel.nameAnalysis" -->
                    <el-checkbox :value="1">
                      <template #default>
                        过滤特殊字符
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            过滤选中的特殊字符
                            <br />
                            选中【+】【(】【)】
                            <br />
                            电话号码：(+1)8765432100
                            <br />
                            过滤后：18765432100
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-select
                          class="marl4"
                          :max-collapse-tags="10"
                          multiple
                          collapse-tags
                          collapse-tags-tooltip
                          v-model="formModel.actionParams.receiveName.filterSpecialStrList"
                          :disabled="!formModel.nameAnalysis?.includes(1)"
                          style="width: 200px"
                        >
                          <!-- <el-option value="空格" label="空格" />
                          <el-option value="-" label="-" />
                          <el-option value="+" label="+" />
                          <el-option value="(" label="(" />
                          <el-option value=")" label=")" />
                          <el-option value="@" label="@" />
                          <el-option value="/" label="/" />
                          <el-option value="#" label="#" />
                          <el-option value="*" label="*" />
                          <el-option value="&" label="&" /> -->
                          <el-option value="'" label="'" />
                          <el-option value="&" label="&" />
                        </el-select>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="2">
                      <template #default>
                        <div class="lh32">
                          指定{X}替换为{Y}
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：指定字符替换为需要的字符，确保姓名有效
                              <br />
                              指定填写：ö
                              <br />
                              替换填写：oe
                              <br />
                              姓名：Dörte
                              <br />
                              替换后：Doerte
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                  <!-- v-if="formModel.nameAnalysis2" -->
                  <!-- v-for="(item, index) in replaceArr" -->
                  <div
                    class="checkItem"
                    v-if="formModel.nameAnalysis?.includes(2)"
                    style="padding-left: 20px; font-size: 13px"
                    v-for="(item, index) in formModel.actionParams.receiveName.replaceStrList"
                    :key="item"
                  >
                    指定
                    <el-input
                      v-model="item.replaceStrX"
                      maxlength="20"
                      class="mar4"
                      placeholder="请输入"
                      style="width: 200px"
                    />
                    替换为
                    <el-input
                      v-model="item.replaceStrY"
                      maxlength="20"
                      class="mar4"
                      placeholder="请输入"
                      style="width: 200px"
                    />
                    <el-button
                      :icon="Plus"
                      class="mar4"
                      style="width: 32px"
                      @click="handleAdd(index)"
                    />
                    <el-button
                      :icon="Minus"
                      class="mar4"
                      style="width: 32px"
                      @click="handleMinus(index)"
                      v-show="formModel.actionParams.receiveName.replaceStrList.length > 1"
                    />
                  </div>
                  <div class="checkItem">
                    <el-checkbox
                      :value="3"
                      v-model="formModel.actionParams.receiveName.replaceToBuyerName"
                    >
                      <template #default>
                        <div class="lh32">
                          用买家姓名替换收货姓名
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：一般用于简化收货姓名，确保长度符合仓库要求，买家姓名为空不替换
                              <br />
                              收货姓名：Kameron Roach, Miltimore Wallis ATACPOP11111111
                              <br />
                              买家姓名：Kameron Roach
                              <br />
                              替换后：收货姓名：Kameron Roach
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                  <div class="checkItem">
                    <el-checkbox :value="4" v-model="formModel.nameAnalysis4">
                      <template #default>
                        <div class="lh32">
                          从第
                          <el-input-number
                            v-model="formModel.actionParams.receiveName.subBeginIndex"
                            step-strictly
                            :min="1"
                            :max="100"
                            controls-position="right"
                            size="default"
                            maxlength="20"
                            class="mar4"
                            placeholder="请输入"
                            style="width: 100px"
                          />
                          个字符开始截取
                          <el-tooltip effect="light" placement="top">
                            <template #content>
                              说明：一般用于简化收货姓名，确保长度符合仓库要求
                              <br />
                              填写：32
                              <br />
                              收货姓名：Kameron Roach, Miltimore Wallis ATACPOP11111111
                              <br />
                              截取后：Kameron Roach, Miltimore Wallis
                            </template>
                            <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                              <QuestionFilled />
                            </el-icon>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <!-- {{ formModel.postalEmailAnalysis }} -->
            <div class="padb20">
              <div class="d-flex align-items-center">
                <el-checkbox value="Value 1" v-model="formModel.postalEmailCheck" />
                收货邮箱处理
              </div>
              <div class="houseNumber bg2" v-if="formModel.postalEmailCheck">
                <el-checkbox-group v-model="formModel.postalEmailAnalysis">
                  <div class="checkItem">
                    <el-checkbox :value="1">
                      <template #default>
                        邮箱为空填充为
                        <el-tooltip effect="light" placement="top">
                          <template #content>
                            说明：订单中的邮箱为空，填充为填写邮箱
                            <br />
                            填写：123@163.com
                            <br />
                            邮箱：--
                            <br />
                            填充后：123@163.com
                          </template>
                          <el-icon size="18" color="#3e97ff" style="position: relative; top: 4px">
                            <QuestionFilled />
                          </el-icon>
                        </el-tooltip>
                        <el-input
                          v-model="formModel.actionParams.receiveEmail.defaultEmail"
                          maxlength="20"
                          class="marl4"
                          placeholder="请输入"
                          :disabled="!formModel.postalEmailAnalysis?.includes(1)"
                          style="width: 200px"
                        />
                        <!-- :disabled="!formModel.postalEmailAnalysis?.includes(1)" -->
                      </template>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </KeenCard>
        </div>
      </div>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button :disabled="saveLoading" @click="cancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { erpApi, shopApi, platformApi, dataApi, omsApi } from '@/api/index';
  import { useRouter, useRoute } from 'vue-router';
  import {
    QuestionFilled,
    InfoFilled,
    CaretTop,
    CaretBottom,
    Plus,
    Minus,
  } from '@element-plus/icons-vue';
  import { omit, difference } from 'lodash-es';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const ruleType = parseInt(route.query.ruleType as string);

  const activeNames = ref([]);
  // const replaceArr = ref([[]]);
  const handleAdd = (index?) => {
    // replaceArr.value.push([]);
    formModel.value.actionParams.receiveName.replaceStrList.push({
      replaceStrX: '',
      replaceStrY: '',
    });
    // console.log(index, replaceArr.value);
  };
  const handleMinus = (index?) => {
    // replaceArr.value.splice(index, 1);
    formModel.value.actionParams.receiveName.replaceStrList.splice(index, 1);
  };
  // 获取订单平台 渠道
  const channelMap: any = ref([]);
  const getChannelOptions = async () => {
    const res = await platformApi.platformAllList();
    channelMap.value =
      res.map((item) => {
        return { label: item.desc, value: item };
      }) || [];
  };
  getChannelOptions();
  // 获取店铺
  const shopArr: any = ref([]);
  const queryShop = async () => {
    const res = await shopApi.luteosShopQueryShopCommonList({
      errorStatus: '1',
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取店铺', res);
    shopArr.value = res.shopListDetailResps.map((item) => {
      return { label: item.shopCode, value: { value: item.shopCode, desc: item.name } };
    });
    // console.log(shopArr.value);
  };
  queryShop();
  // 获取仓库 启用
  const warehouseArr: any = ref([]);
  const queryWarehouse = async () => {
    // /api/oms/common/warehouse/queryTransitionList
    // 启用状态 0-禁用 1-启用
    // const res = await erpApi.luteosErpWarehouseQueryList({
    //   status: 1,
    //   pageNum: 1,
    //   pageSize: 100000,
    // });
    const res = await omsApi.omsCommonWarehouseList({
      status: 1,
      pageNum: 1,
      pageSize: 100000,
    });
    // console.log('获取仓库', res);
    warehouseArr.value = res?.map((item) => {
      return {
        label: item.warehouseName,
        value: { value: item.warehouseCode, desc: item.warehouseName },
      };
    });
  };
  queryWarehouse();
  // 获取国家
  const countryArr: any = ref([]);
  const queryCountry = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    // console.log('获取国家', res);
    countryArr.value = res?.countryList.map((item) => {
      return {
        label: item.countryCode + ' - ' + item.countryName,
        value: { value: item.countryCode, desc: item.countryCode + ' - ' + item.countryName },
      };
    });
  };
  queryCountry();

  // 获取物流渠道
  const shipmentArr: any = ref([]);
  const queryShipment = async () => {
    const res = await erpApi.luteosErpOrderShipmentQuerySpList({
      smStatus: 1,
      pageNum: 1,
      pageSize: 10000,
    });
    // console.log('获取物流渠道', res);
    shipmentArr.value = res?.recordList.map((item) => {
      return {
        label: item.spName,
        value: item.spCode,
        children: (item.smWarehouseParamBeanList || []).map((c) => {
          return {
            label: c.smName,
            // value: { label: c.smName, value: c.smCode },
            value: { subOp: null, desc: c.smName, value: c.smCode },
          };
        }),
      };
    });
  };
  queryShipment();

  // 字段配置（JS 对象）
  const baseFields = [
    {
      key: 'orderPlatform',
      prop: 'orderPlatform.rightSides',
      label: '订单平台',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'orderStore',
      prop: 'orderStore.rightSides',
      label: '订单店铺',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
  ];

  const warehouseFields = [
    {
      key: 'shippingWarehouse',
      label: '发货仓库',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverCountry',
      label: '收货国家/地区',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverProvince',
      label: '收货省/州',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'receiverCity',
      label: '收货城市',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
    {
      key: 'logisticsChannel',
      label: '物流渠道',
      type: 'select',
      options: [],
      placeholder: '请选择',
    },
  ];

  // 控制字段是否被选中
  const selectedFields = reactive({
    // orderPlatform: true,
    // orderStore: true,
    // shippingWarehouse: true,
    // receiverCountry: true,
    // receiverProvince: true,
    // receiverCity: true,
    // logisticsChannel: true,
    orderPlatform: false,
    orderStore: false,
    shippingWarehouse: false,
    receiverCountry: false,
    receiverProvince: false,
    receiverCity: false,
    logisticsChannel: false,
  });

  // 表单模型
  const formModel = ref({
    ruleNo: '',
    name: '',
    status: 1,
    sceneCode: 'recipient',
    priority: '',
    effectiveTimeBegin: null,
    description: null,
    conditions: [],
    orderPlatform: {
      operator: 'in',
      leftSide: {
        name: '订单平台',
        innerType: 'string',
        ref: 'order.channelList',
      },
      // rightSides: [{ value: 'all', desc: 'all' }],
      rightSides: [],
    },
    orderStore: {
      operator: 'in',
      leftSide: {
        name: '订单店铺',
        innerType: 'string',
        ref: 'order.shopCodeList',
      },
      // rightSides: [
      //   {
      //     value: 'Paruu Direct_EU',
      //     desc: 'Paruu Direct',
      //   },
      //   {
      //     value: 'sichuangtiancheng_eu_IE',
      //     desc: 'sichuangtiancheng_eu_IE',
      //   },
      //   {
      //     value: 'Paruu_Walmart_MX',
      //     desc: 'Paruu_Walmart_MX',
      //   },
      // ],
      rightSides: [],
    },
    shippingWarehouse: {
      operator: 'in',
      leftSide: {
        name: '发货仓库',
        innerType: 'string',
        ref: 'order.warehouseCodeList',
      },
      // rightSides: [
      //   {
      //     value: 'PW011038',
      //     desc: '加拿大仓',
      //   },
      // ],
      rightSides: [],
    },
    receiverCountry: {
      operator: 'in',
      leftSide: {
        name: '收货国家/地区',
        innerType: 'string',
        ref: 'order.receiveCountryCodeList',
      },
      // rightSides: [
      //   {
      //     value: 'US',
      //     desc: 'US - 美国',
      //   },
      //   {
      //     value: 'IT',
      //     desc: 'IT - 意大利',
      //   },
      //   {
      //     value: 'GB',
      //     desc: 'GB - 英国',
      //   },
      // ],
      rightSides: [],
    },
    receiverProvince: {
      operator: 'in',
      leftSide: {
        name: '收货省/州',
        innerType: 'string',
        ref: 'order.receiveProvinceCodeList',
      },
      // rightSides: [
      //   { value: '113', subOp: null },
      //   { value: '44', subOp: null },
      // ],
      rightSides: [],
      // configs: ['IN_CASE_SENSITIVE'],
      configs: [],
    },
    receiverCity: {
      operator: 'in',
      leftSide: {
        name: '收货城市',
        innerType: 'string',
        ref: 'order.receiveCityCodeList',
      },
      // rightSides: [
      //   {
      //     value: 'sz',
      //     label: 'sz',
      //   },
      //   {
      //     value: 'sh',
      //     label: 'sh',
      //   },
      // ],
      rightSides: [],
      configs: [],
    },
    logisticsChannel: {
      operator: 'in',
      leftSide: {
        name: '物流渠道',
        innerType: 'string',
        ref: 'order.shippingCodeList',
      },
      // rightSides: [
      //   {
      //     label: '欧洲卡航',
      //     value: 'TRUCK',
      //   },
      //   {
      //     label: '欧洲铁派',
      //     value: 'RAIL',
      //   },
      // ],
      rightSides: [],
    },
    actionParams: {
      allDataStatus: '', // 本地所有数据状态
      // houseNumberDesc: '', //门牌号解析
      receiveHouseNumber: {
        desc: null,
        parseRule: '\\d+',
      }, //门牌号解析 todo 少UI属性
      receivePhone: {
        extNumber: '',
        filterSpecialStrList: [],
        filterTopZeroNumber: '',
        subBeginIndex: '',
        replaceAllStr: '',
        defaultPhoneNumber: '',
        replaceStr: {
          replaceStrX: '',
          replaceStrY: '',
        },
      }, // 电话号码简化 todo
      receivePostalCode: {
        defaultPostalCode: null,
        usPostalCodeTop5: 0,
        filterSpecialStrList: null,
      }, // 收货邮编处理
      receiveName: {
        subBeginIndex: '',
        filterSpecialStrList: [],
        replaceStrList: [{ replaceStrX: '', replaceStrY: '' }],
        replaceToBuyerName: 0,
      }, // 收货姓名处理
      receiveEmail: {
        defaultEmail: '',
      }, // 收货邮箱处理
    },

    houseNumberCheck: false, // 门牌号解析选择框
    telephoneCheck: false, // 门牌号解析选择框
    postalCodeCheck: false, //邮编 选择框
    nameCheck: false, //收货姓名 选择框
    postalEmailCheck: false, //收货邮箱 选择框

    telephoneAnalysis: [],
    postalCodeAnalysis: [],
    nameAnalysis: [],
    postalEmailAnalysis: [],
  });

  // 校验规则
  const rules = {
    name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    priority: [{ required: true, message: '请输入优先级', trigger: 'blur' }],
    effectiveTimeBegin: [{ required: true, message: '请输入生效时间', trigger: 'blur' }],

    orderPlatform: [{ required: true, message: '请选择订单平台', trigger: 'blur' }],
    orderStore: [{ required: true, message: '请选择订单店铺', trigger: 'blur' }],

    shippingWarehouse: [{ required: true, message: '请选择发货仓库', trigger: 'blur' }],
    receiverCountry: [{ required: true, message: '请选择收货国家/地区', trigger: 'blur' }],
    receiverProvince: [{ required: true, message: '请选择收货省/州', trigger: 'blur' }],
    receiverCity: [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
    logisticsChannel: [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
    'orderPlatform.rightSides': [{ required: true, message: '请选择订单平台', trigger: 'blur' }],
    'orderStore.rightSides': [{ required: true, message: '请选择订单店铺', trigger: 'blur' }],
    'shippingWarehouse.rightSides': [
      { required: true, message: '请选择发货仓库', trigger: 'blur' },
    ],
    'receiverCountry.rightSides': [
      { required: true, message: '请选择收货国家/地区', trigger: 'blur' },
    ],
    'receiverProvince.rightSides': [
      { required: true, message: '请选择收货省/州', trigger: 'blur' },
    ],
    'receiverCity.rightSides': [{ required: true, message: '请选择收货城市', trigger: 'blur' }],
    'logisticsChannel.rightSides': [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
  };

  // 获取当前可见字段
  const visibleFields = computed(() => {
    const allFields = [...baseFields, ...warehouseFields];
    allFields.forEach((item) => {
      const newKey = `${item.key}BelongTo`;
      item[newKey] = 0;
    });
    const visibleArr = allFields.filter((field) => selectedFields[field.key]);
    // console.log('visibleArr', visibleArr);
    return visibleArr;
  });

  // 处理回车键
  const handleEnter = (key?, field?) => {
    // 已选择的选项
    const selectedItems = ref<any[]>([]);
    // console.log(key);
    // console.log(formModel, formModel[key]);
    // if (formModel[key].trim() === '') return;
    const tmpArr = JSON.parse(JSON.stringify(formModel.value[key].rightSides));
    // 按逗号分割输入内容
    let items = <any>[];
    // console.log('tmpArr', tmpArr);
    // return;
    tmpArr?.forEach((val) => {
      if (typeof val === 'string') {
        const arr = val
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item);
        items = items.concat(arr);
      } else {
        // console.log(val);
        if (val.value) {
          items.push(val.value);
        }
      }
    });
    // console.log('items', items);
    // 添加到已选择列表
    items?.forEach((item) => {
      // 检查是否已存在
      if (!selectedItems.value.some((selected) => selected.value === item)) {
        const option = field.options.find((opt) => opt.label === item) || {
          value: item,
          label: item,
        };
        selectedItems.value.push(option);
      }
    });
    // console.log('selectedItems', selectedItems.value);
    // 清空输入框
    formModel.value[key].rightSides = selectedItems.value.filter(
      (item) => typeof item === 'object'
    );
  };

  // 处理输入框失去焦点
  const handleBlur = (key?, field?) => {
    handleEnter(key, field);
  };

  // 更新表单时触发
  const updateForm = () => {
    // console.log('已更新字段:', selectedFields);
  };

  const initField = async () => {
    if (!ruleType) {
      ElMessage.warning('规则参数错误');
      return;
    }
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: ruleType,
    });
    form.value.conditionList = res.conditionList.map((item) => {
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    form.value.outParamList = res.outParamList.map((item) => {
      return {
        ...item,
        value: item.type === 1 ? [] : '',
      };
    });
    console.log('form.value.outParamList', form.value.outParamList);
  };
  // initField();
  const hasCheck = (val: any) => {
    return !(
      val === undefined ||
      val === null ||
      val === '' ||
      val?.length === 0 ||
      val?.[0]?.replaceStrX === '' ||
      val === 0 ||
      val?.replaceStrX === ''
    );
  };
  const getDetailData = async () => {
    // const res: any = await erpApi.luteosErpBaseFlowQueryDetail({
    //   code: route.query.code || (route.params?.code as string),
    // });
    const res: any = await omsApi.omsRuleQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    form.value = res;
    // res.conditions = JSON.parse(res.conditions);
    // res.actionParams = JSON.parse(res.actionParams);
    // console.log('详情返回', res);
    formModel.value = res;
    // console.log('res.actionParams.allDataStatus', res?.actionParams?.allDataStatus);
    // formModel.value = res?.actionParams?.allDataStatus ?? {};
    console.log(formModel.value);
    // Object.assign(formModel.value, res);
    // 修复编辑 不生效bug
    formModel.value.id = res.id;
    formModel.value.ruleNo = res.ruleNo;
    // formModel.value.name = res.name;
    formModel.value.status = res.status;
    // formModel.value.sceneCode = res.sceneCode;
    // formModel.value.effectiveTimeBegin = res.effectiveTimeBegin;
    // formModel.value.description = res.description;
    // console.log('详情2', formModel.value);
    let actionParams = {
      // houseNumberDesc: '', //门牌号解析
      receiveHouseNumber: {
        desc: null,
        parseRule: '\\d+',
      }, //门牌号解析 todo 少UI属性
      receivePhone: {
        extNumber: '',
        filterSpecialStrList: [],
        filterTopZeroNumber: '',
        subBeginIndex: '',
        replaceAllStr: '',
        defaultPhoneNumber: '',
        replaceStr: {
          replaceStrX: '',
          replaceStrY: '',
        },
      }, // 电话号码简化 todo
      receivePostalCode: {
        defaultPostalCode: null,
        usPostalCodeTop5: 0,
        filterSpecialStrList: null,
      }, // 收货邮编处理
      receiveName: {
        subBeginIndex: '',
        filterSpecialStrList: [],
        replaceStrList: [{ replaceStrX: '', replaceStrY: '' }],
        replaceToBuyerName: 0,
      }, // 收货姓名处理
      receiveEmail: {
        defaultEmail: '',
      }, // 收货邮箱处理
    };
    // console.log('form', formModel.value);
    // 详情 未完
    if (res?.actionParams?.receiveHouseNumber) {
      formModel.value.houseNumberCheck = true;
      formModel.value.actionParams.receiveHouseNumber = res?.actionParams?.receiveHouseNumber;
    } else {
      formModel.value.actionParams.receiveHouseNumber = actionParams.receiveHouseNumber;
    }
    if (res.actionParams.receivePhone) {
      formModel.value.telephoneCheck = true;
      formModel.value.actionParams.receivePhone = res?.actionParams?.receivePhone;
      if (!res?.actionParams?.receivePhone.replaceStr) {
        formModel.value.actionParams.receivePhone.replaceStr = {
          replaceStrX: '',
          replaceStrY: '',
        };
      }
      formModel.value.telephoneAnalysis = [];
      [
        'extNumber',
        'filterSpecialStrList',
        'filterTopZeroNumber',
        'subBeginIndex',
        'replaceAllStr',
        'defaultPhoneNumber',
        'replaceStr',
      ].map((key, index) => {
        if (hasCheck(res?.actionParams?.receivePhone[key])) {
          formModel.value.telephoneAnalysis.push(index + 1);
        }
      });
    } else {
      formModel.value.actionParams.receivePhone = actionParams.receivePhone;
    }
    if (res.actionParams.receivePostalCode) {
      formModel.value.postalCodeCheck = true;
      formModel.value.actionParams.receivePostalCode = res?.actionParams?.receivePostalCode;
      formModel.value.postalCodeAnalysis = [];
      ['filterSpecialStrList', 'usPostalCodeTop5', 'defaultPostalCode'].map((key, index) => {
        if (hasCheck(res?.actionParams?.receivePostalCode[key])) {
          formModel.value.postalCodeAnalysis.push(index + 1);
        }
      });
    } else {
      formModel.value.actionParams.receivePostalCode = actionParams.receivePostalCode;
    }
    if (res.actionParams.receiveName) {
      formModel.value.nameCheck = true;
      formModel.value.actionParams.receiveName = res?.actionParams?.receiveName;
      formModel.value.nameAnalysis = [];
      ['filterSpecialStrList', 'replaceStrList', 'replaceToBuyerName', 'subBeginIndex'].map(
        (key, index) => {
          if (hasCheck(res?.actionParams?.receiveName[key])) {
            formModel.value.nameAnalysis.push(index + 1);
          }
        }
      );
    } else {
      formModel.value.actionParams.receiveName = actionParams.receiveName;
    }
    if (res.actionParams.receiveEmail) {
      formModel.value.postalEmailCheck = true;
      // formModel.value.postalEmailAnalysis = [1];
      formModel.value.postalEmailAnalysis = [];
      ['defaultEmail'].map((key, index) => {
        if (hasCheck(res?.actionParams?.receiveEmail[key])) {
          formModel.value.postalEmailAnalysis.push(index + 1);
        }
      });
      formModel.value.actionParams.receiveEmail = res?.actionParams?.receiveEmail;
    } else {
      formModel.value.actionParams.receiveEmail = actionParams.receiveEmail;
    }
    res?.conditions.forEach((item: any) => {
      // orderPlatform: true,
      // orderStore: true,
      // shippingWarehouse: true,
      // receiverCountry: true,
      // receiverProvince: true,
      // receiverCity: true,
      // logisticsChannel: true,
      if (item?.rightSides?.length > 0 && item?.leftSide?.name === '订单平台') {
        formModel.value.orderPlatform = item;
        selectedFields.orderPlatform = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '订单店铺') {
        formModel.value.orderStore = item;
        selectedFields.orderStore = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '发货仓库') {
        formModel.value.shippingWarehouse = item;
        selectedFields.shippingWarehouse = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '收货国家/地区') {
        formModel.value.receiverCountry = item;
        selectedFields.receiverCountry = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '收货省/州') {
        if (item.leftSide.ref !== 'receiveProvinceCodeList') {
          item.leftSide.ref = 'receiveProvinceCodeList';
        }
        formModel.value.receiverProvince = item;
        selectedFields.receiverProvince = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '收货城市') {
        formModel.value.receiverCity = item;
        selectedFields.receiverCity = true;
      } else if (item?.rightSides?.length > 0 && item?.leftSide?.name === '物流渠道') {
        formModel.value.logisticsChannel = item;
        selectedFields.logisticsChannel = true;
      }
    });
  };
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
    getDetailData();
  } else {
    // initField();
  }
  const form = ref<any>({
    baseInfo: {
      code: '',
      name: '',
      priority: 0,
      status: 0,
      type: ruleType,
    },
    outParamList: [
      {
        name: '',
        operators: [],
        sort: 0,
        type: 0,
      },
    ],
    conditionList: [],

    acceptActionParam: [], // 设定动作
    conditions: [], // 已选条件
  });
  // const rules = reactive({
  //   'baseInfo.name': [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  // });
  const router = useRouter();
  const cancel = () => {
    router.push({
      name: 'orderRule',
    });
  };
  const formRef = ref<any>();
  const conditionFormRef = ref<any>();
  const saveLoading = ref(false);
  const save = async () => {
    // console.log('参数:', form.value);
    const valid = await Promise.all([
      formRef.value?.validate().catch(() => false),
      conditionFormRef.value?.validate().catch(() => false),
    ]);
    // console.log('valid', valid);
    const falseArr = valid.filter((item) => item === false);
    if (falseArr.length > 0) {
      return;
    }
    // console.log(selectedFields);
    // console.log(Object.keys(selectedFields));
    formModel.value.conditions = [];
    Object.keys(selectedFields).forEach((key) => {
      // console.log(key, formModel.value[key]);
      if (selectedFields[key] && formModel.value[key]) {
        formModel.value.conditions.push(formModel.value[key]);
      }
    });
    // console.log('表单', formModel.value);
    if (formModel.value.conditions?.length === 0) {
      ElMessage.warning('请勾选条件');
      return;
    }
    const param = JSON.parse(JSON.stringify(formModel.value));

    param.actionParams.allDataStatus = JSON.parse(JSON.stringify(param));
    if (
      formModel.value.telephoneAnalysis?.length === 0 &&
      formModel.value.telephoneAnalysis?.length === 0 &&
      formModel.value.postalCodeAnalysis?.length === 0 &&
      formModel.value.nameAnalysis?.length === 0 &&
      formModel.value.postalEmailAnalysis.length === 0
    ) {
      ElMessage.warning('请勾选至少一个设定动作');
      return;
    }
    if (!formModel.value.telephoneAnalysis?.includes(1)) {
      param.actionParams.receivePhone.extNumber = '';
    }
    if (!formModel.value.telephoneAnalysis?.includes(2)) {
      param.actionParams.receivePhone.filterSpecialStrList = [];
    }
    if (!formModel.value.telephoneAnalysis?.includes(3)) {
      param.actionParams.receivePhone.filterTopZeroNumber = 0;
    } else {
      param.actionParams.receivePhone.filterTopZeroNumber = 1;
    }
    if (!formModel.value.telephoneAnalysis?.includes(4)) {
      delete param.actionParams.receivePhone.subBeginIndex;
    }
    if (!formModel.value.telephoneAnalysis?.includes(5)) {
      param.actionParams.receivePhone.replaceAllStr = '';
    }
    if (!formModel.value.telephoneAnalysis?.includes(6)) {
      param.actionParams.receivePhone.defaultPhoneNumber = '';
    }
    if (!formModel.value.telephoneAnalysis?.includes(6)) {
      param.actionParams.receivePhone.replaceStr = {
        replaceStrX: '',
        replaceStrY: '',
      };
    }
    // 收货邮编处理
    if (!formModel.value.postalCodeAnalysis?.includes(1)) {
      param.actionParams.receivePostalCode.filterSpecialStrList = [];
    }
    if (!formModel.value.postalCodeAnalysis?.includes(2)) {
      param.actionParams.receivePostalCode.usPostalCodeTop5 = 0;
    } else {
      param.actionParams.receivePostalCode.usPostalCodeTop5 = 1;
    }
    if (!formModel.value.postalCodeAnalysis?.includes(3)) {
      param.actionParams.receivePostalCode.defaultPostalCode = '';
    }

    // 收货姓名处理
    if (!formModel.value.nameAnalysis?.includes(1)) {
      param.actionParams.receiveName.filterSpecialStrList = [];
    }
    if (!formModel.value.nameAnalysis?.includes(2)) {
      param.actionParams.receiveName.replaceStrList = [{ replaceStrX: '', replaceStrY: '' }];
    }
    if (!formModel.value.nameAnalysis?.includes(3)) {
      param.actionParams.receiveName.replaceToBuyerName = 0;
    } else {
      param.actionParams.receiveName.replaceToBuyerName = 1;
    }
    if (!formModel.value.nameAnalysis?.includes(4)) {
      delete param.actionParams.receiveName.subBeginIndex;
    }

    // 收货邮箱处理
    if (!formModel.value.postalEmailAnalysis?.includes(1)) {
      param.actionParams.receiveEmail.defaultEmail = '';
    }
    // 选择框
    if (!formModel.value.houseNumberCheck) {
      delete param.actionParams.receiveHouseNumber;
    }
    if (!formModel.value.telephoneCheck) {
      delete param.actionParams.receivePhone;
    }
    if (!formModel.value.postalCodeCheck) {
      delete param.actionParams.receivePostalCode;
    }
    if (!formModel.value.nameCheck) {
      delete param.actionParams.receiveName;
    }
    if (!formModel.value.postalEmailCheck) {
      delete param.actionParams.receiveEmail;
    }
    // console.log('组装参数', param);
    // return;
    if (valid) {
      // const params = {
      //   baseInfo:
      //     route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
      //   conditionList: form.value.conditionList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      //   outParamList: form.value.outParamList?.map((item) => {
      //     return omit(item, 'selectValueList');
      //   }),
      // };
      // 复制
      // route.params.type === 'copy' ? omit(param, 'id') : param;
      // return;
      if (!isEdit.value) {
        await omsApi.omsRuleAdd(param);
      } else {
        await omsApi.omsRuleUpdate(param);
      }
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    }
    // return;
    // if (valid) {
    //   const params = {
    //     baseInfo:
    //       route.params.type === 'copy' ? omit(form.value.baseInfo, 'code') : form.value.baseInfo,
    //     conditionList: form.value.conditionList?.map((item) => {
    //       return omit(item, 'selectValueList');
    //     }),
    //     outParamList: form.value.outParamList?.map((item) => {
    //       return omit(item, 'selectValueList');
    //     }),
    //   };
    //   await erpApi.luteosErpBaseFlowSaveOrUpdate(params);
    //   ElMessage.success('操作成功');
    //   closeTabAndRefresh('orderRule');
    //   cancel();
    // }
  };

  const handleCheckChange = (item, index) => {
    if (item.status === 1) {
      item.value = [];
      conditionFormRef.value.resetFields([`conditionList[${index}].value`]);
    }
  };

  const handleSelectChange = (val, item) => {
    item.status = val?.length ? 0 : 1;
    if (item.nameCode === '#deliveryType' && item.value) {
      const filter1List = form.value.outParamList[0].selectValueList?.find(
        (optionItem) => optionItem.value === form.value.outParamList[0].value
      )?.filter1List;
      if (difference(filter1List, item.value).length > 0) {
        form.value.outParamList[0].value = '';
        handleOutParamChange(0);
      }
    }
  };

  const handleOutParamChange = (index) => {
    for (let i = index + 1; i < form.value.outParamList.length; i++) {
      form.value.outParamList[i].value = '';
    }
  };
</script>

<style lang="scss">
  .select-prepend {
    width: 100%;
    display: flex;
    align-items: stretch;

    .el-select__wrapper {
      border-radius: 6px 0 0 6px;
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    .el-select__wrapper.is-hovering:not(.is-focused) {
      box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
        0 -1px 0 0 var(--el-border-color) inset;
    }
    .el-select {
      min-width: 90px !important;

      .el-select__wrapper {
        height: 100%;
        min-height: 32px;
      }
    }
    .el-select:nth-child(2) {
      flex: 1;

      .el-select__wrapper {
        height: auto;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }
    .rule-inner-select {
      flex: 1;

      .el-select__wrapper {
        height: 100%;
        min-height: 32px;
        align-items: flex-start;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 0 6px 6px 0;
        box-shadow: 1px 0 0 0 var(--el-border-color) inset, 0 1px 0 0 var(--el-border-color) inset,
          0 -1px 0 0 var(--el-border-color) inset, 0 0 0 1px var(--el-border-color) inset;
      }

      .el-select__selection {
        flex-wrap: wrap;
      }

      .el-select__suffix {
        align-self: center;
      }
    }
  }
  .province-select .el-select-dropdown {
    display: none !important;
  }
</style>

<style scoped lang="scss">
  :deep(.el-select) {
    height: auto !important;
  }
  :deep(.el-select__selection) {
    height: auto !important;
  }
  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .full-row {
    flex-grow: 1;
    flex-basis: 100%; /* 或者 width: 100%; */
  }

  .flex-row {
    display: flex; /* 接下来的行是弹性布局 */
  }

  .flex-row > div {
    flex: 1; /* 让子项也弹性分布 */
  }
  .formItem {
    margin-bottom: 13px;
  }
  .w100 {
    width: 100%;
  }
  .flex1 {
    flex: 1;
    align-items: center;
  }
  .noshrink {
    flex-shrink: 0;
  }
  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }
  .padl15 {
    padding-left: 15px;
  }
  .tips {
    font-size: 13px;
  }
  .marl4 {
    margin-left: 4px;
  }
  .mar4 {
    margin: 0 4px;
  }
  .padl6 {
    padding-left: 6px;
  }
  .padl10 {
    padding-left: 10px;
  }
  .padb20 {
    padding-bottom: 20px;
  }
  .dynamic-form-container {
    display: flex;
    height: calc(100vh - 281px);
    overflow: hidden;
    background: white;
    width: 1440px;
    margin: 0 auto;
    :deep(.el-checkbox__label) {
      font-size: 13px !important;
      line-height: 32px;
    }
    :deep(.el-radio__label) {
      font-size: 13px !important;
    }
    .demo-collapse {
      background: #e8f3ff;
      margin-bottom: 20px;
      .switch {
        padding-right: 5px;
      }
      .activeColor {
        color: #02b96b;
      }
      :deep(.el-collapse-item__header) {
        background-color: #e8f3ff;
      }
      :deep(.el-collapse-item__content) {
        background-color: #e8f3ff;
      }
      .bg {
        background-color: #e8f3ff;
      }
      .info-text {
        padding-left: 35px;
      }
    }
    .bg2 {
      background-color: #f7f8fa;
    }
    .houseNumber {
      padding: 16px;
      border-radius: 4px;
      // margin-bottom: 20px;
    }
    .lh32 {
      line-height: 32px;
    }
    .checkItem {
      display: flex;
      align-items: center;
      line-height: 32px;
      height: 32px;
      margin-bottom: 8px;
      width: 100%;
    }
    .line {
      line-height: 32px;
    }
  }

  .left-panel {
    width: 340px;
    background: white;
    padding: 10px 5px 10px 30px;
    border-right: 1px solid #dadde2;
    overflow-y: auto;

    .title {
      flex: 1;
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 5px;
      color: #1f1f1f;
    }
    :deep(.el-checkbox__label) {
      font-size: 13px !important;
    }
  }

  .right-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    :deep(.right-form .el-form-item) {
      display: flex !important;
    }
  }

  .field-item {
    margin-bottom: 5px;
    width: 50%;
    display: inline-block;
    font-size: 13px !important;
  }
</style>
