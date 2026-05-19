<template>
  <div class="agency-page" :class="{ 'agency-page--loading': pageLoading }" v-loading="pageLoading">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        label="任务名称"
        prop="name"
        :rules="[{ required: true, message: '任务名称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="form.name" maxlength="50" show-word-limit :disabled="isDisabledForm" />
      </el-form-item>
      <el-form-item
        label="任务类型"
        prop="taskType"
        :rules="[{ required: true, message: '任务类型不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.taskType"
          placeholder="请选择"
          :disabled="isDisabledForm"
          @change="handleTaskTypeChange"
        >
          <el-option
            v-for="item in taskTypeList"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="任务清单"
        prop="productList"
        :rules="[{ required: true, message: '任务清单不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.productList" type="textarea" :disabled="isDisabledForm" :rows="4" />
      </el-form-item>
      <!-- 平面物料设计，电商设计必填提示 -->
      <el-form-item label="上传文件" :required="uploadRequire">
        <KeenFileUpload
          ref="productUpload"
          v-model="fileList"
          directory="fileCenter"
          :limit="10"
          :multiple="true"
          :showOperate="!taskId || !!btnAuth.fileAccessAuth"
          class="file-upload"
          :disabled="isDisabledForm || (taskId && !btnAuth.fileAccessAuth)"
          @fileNameClick="handleFileNameClick"
        >
          <el-button
            type="primary"
            size="small"
            :disabled="isDisabledForm || (taskId && !btnAuth.fileAccessAuth)"
          >
            选择文件
          </el-button>
        </KeenFileUpload>
        <p class="upload-tips">
          需求方需要把任务相关的文件资料（设计需求表，竞品分析，结构文件，需求会签表等）都上传至系统上
        </p>
      </el-form-item>
      <!-- 合同编号 -->
      <el-form-item
        label="合同编号"
        prop="contractCodeList"
        style="width: 35vw"
        class="align-items-start"
        :rules="contractNoRules"
        v-if="btnAuth.contractShowFlag"
      >
        <div class="contract-no-list">
          <div v-for="(no, index) in form.contractCodeList" :key="index" class="contract-no-item">
            <el-input
              v-model="form.contractCodeList[index]"
              maxlength="50"
              show-word-limit
              :disabled="
                [
                  TASK_STATUS.DRAFT,
                  TASK_STATUS.APPROVING,
                  TASK_STATUS.TO_ASSIGN,
                  TASK_STATUS.RECYCLE_BIN,
                ].includes(form.status)
              "
              placeholder="请输入合同编号"
              class="contract-no-input"
            />
            <el-button
              v-if="
                form.contractCodeList.length > 1 &&
                index !== 0 &&
                ![
                  TASK_STATUS.DRAFT,
                  TASK_STATUS.APPROVING,
                  TASK_STATUS.TO_ASSIGN,
                  TASK_STATUS.RECYCLE_BIN,
                ].includes(form.status)
              "
              type="danger"
              text
              @click="removeContractNo(index)"
            >
              删除
            </el-button>
            <el-button
              v-if="
                index === 0 &&
                ![
                  TASK_STATUS.DRAFT,
                  TASK_STATUS.APPROVING,
                  TASK_STATUS.TO_ASSIGN,
                  TASK_STATUS.RECYCLE_BIN,
                ].includes(form.status)
              "
              type="primary"
              icon="Plus"
              text
              @click="addContractNo"
              :disabled="form.contractCodeList.length >= 10"
            >
              增加一列
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="项目等级"
        prop="productLevel"
        :rules="[{ required: true, message: '项目等级不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select v-model="form.productLevel" placeholder="请选择" :disabled="isDisabledForm">
          <el-option
            v-for="item in pdtLevelList"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- <el-form-item
        label="项目名称"
        prop="itemTag"
        :rules="[{ required: true, message: '项目名称不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input
          v-model="form.itemTag"
          placeholder="添加项目名称"
          maxlength="20"
          show-word-limit
          :disabled="isDisabledForm"
        />
      </el-form-item> -->
      <el-form-item label="关联商品SPU" prop="productSpuList">
        <el-button type="primary" @click="bindGoodsVisible = true" size="small">选择商品</el-button>
        <span style="margin-left: 20px" v-if="productListDesc">{{ productListDesc }}</span>
      </el-form-item>

      <el-form-item label="项目类型" prop="itemTag">
        <span>{{ getProjectDesc }}</span>
      </el-form-item>
      <el-form-item label="创建时间" prop="createDate">
        <span>{{ form.createDate }}</span>
      </el-form-item>
      <el-form-item label="首次提交时间" prop="startDate">
        <span>{{ form.startDate }}</span>
      </el-form-item>
      <el-form-item label="最新提交时间" prop="lastSubmitDate">
        <span>{{ form.lastSubmitDate || '-' }}</span>
      </el-form-item>
      <el-form-item
        v-if="
          form.status !== TASK_STATUS.DRAFT &&
          form.status !== TASK_STATUS.APPROVING &&
          form.status !== TASK_STATUS.TO_CLAIM
        "
        label="变更时间"
        prop="changeDate"
      >
        <span>{{ form.changeDate }}</span>
      </el-form-item>
      <el-form-item label="认领时间" prop="contactEmail" v-if="form.receiveDate">
        <span>{{ form.receiveDate }}</span>
      </el-form-item>
      <el-form-item label="完成时间" prop="finishTime" v-if="form.finishTime">
        <el-date-picker
          v-model="form.finishTime"
          type="date"
          placeholder="请选择"
          value-format="YYYY-MM-DD"
          style="width: 250px"
          v-if="
            designManagerFlag &&
            [TASK_STATUS.FINISHED, TASK_STATUS.ACCEPTED, TASK_STATUS.INTERNAL_CHECK].includes(
              form.status
            )
          "
        />
        <span v-else>{{ form.finishTime }}</span>
      </el-form-item>
      <el-form-item
        label="截止时间"
        prop="endDate"
        :rules="[{ required: true, message: '截止时间不能为空', trigger: 'blur' }]"
      >
        <el-date-picker
          :disabled="isDisabledForm"
          v-model="form.endDate"
          type="date"
          placeholder="请选择"
          value-format="YYYY-MM-DD"
          style="width: 250px"
        />
      </el-form-item>
      <template
        v-if="
          [
            TASK_STATUS.TO_CLAIM,
            TASK_STATUS.DESIGNING,
            TASK_STATUS.FINISHED,
            TASK_STATUS.ACCEPTED,
          ].includes(form.status)
        "
      >
        <el-form :model="form" label-width="120px">
          <!-- 已完成展示拆解任务，认领和转让展示设计类型 -->
          <el-form-item :label="form.status === TASK_STATUS.FINISHED ? '拆解任务' : '设计类型'">
            <el-button
              v-if="form.status !== TASK_STATUS.FINISHED"
              :disabled="[TASK_STATUS.FINISHED, TASK_STATUS.ACCEPTED].includes(+form.status)"
              type="primary"
              size="small"
              @click="addTaskType"
            >
              添加设计类型
            </el-button>
          </el-form-item>
          <div :class="['score-list', form.status === TASK_STATUS.FINISHED ? 'mt-60' : '']">
            <div class="score-list-item" v-for="(item, index) in form.designScoreList" :key="index">
              <!-- 认领是非必填，完成时必填 -->
              <el-form-item
                label=""
                :prop="`designScoreList[${index}].designScoreCode`"
                :rules="[
                  {
                    required: form.status === TASK_STATUS.DESIGNING ? true : false,
                    message: '设计类型不能为空',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-select
                  v-model="item.designScoreCode"
                  placeholder="请选择设计类型"
                  :disabled="isDisabledForm"
                  clearable
                  @change="handleScoreChange($event, index)"
                >
                  <template v-for="scoreItem in designScoreList" :key="scoreItem.designScoreCode">
                    <el-option
                      v-if="+scoreItem.status === 1"
                      :label="scoreItem.name"
                      :value="scoreItem.designScoreCode"
                      :disabled="designScoreSelectArr.includes(scoreItem.designScoreCode)"
                    />
                  </template>
                </el-select>
                <el-button
                  v-if="![TASK_STATUS.FINISHED, TASK_STATUS.ACCEPTED].includes(+form.status)"
                  type="text"
                  class="del-txt"
                  @click="delTaskType(index)"
                >
                  删除
                </el-button>
                <el-input v-model="item.score" disabled style="width: 100px; margin: 0 20px" />
              </el-form-item>
              <el-form-item
                label=""
                :prop="`designScoreList[${index}].num`"
                style="margin-left: -110px"
                :rules="[
                  {
                    required: form.status === TASK_STATUS.DESIGNING ? true : false,
                    message: '数量不能为空',
                    trigger: ['blur', 'change'],
                  },
                  {
                    pattern: /^[0-9]\d*$/,
                    message: '请输入整数',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input
                  v-model="item.num"
                  placeholder="数量"
                  style="width: 100px"
                  :disabled="isDisabledForm"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </template>
      <el-form-item label="任务状态" prop="contactEmail">
        <span>{{ form.statusDesc }}</span>
      </el-form-item>

      <!-- 审批人在审批中、设计中任务可指定设计师 -->
      <el-form-item
        v-if="canSpecifyDesigner"
        label="设计师"
        prop="designerCodeList"
        :rules="designerCodeListRules"
      >
        <el-select
          v-model="form.designerCodeList"
          clearable
          filterable
          multiple
          placeholder="请选择设计师"
          :disabled="isDisabledForm"
        >
          <el-option
            v-for="item in designerMemberList"
            :key="item.designer"
            :label="item.designerDesc"
            :value="item.designer"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-else-if="form.designerInfoList && form.designerInfoList.length"
        :label="isShowTransBtn ? '原设计师' : '设计师'"
        prop="designerInfoList"
      >
        <span>{{ getDesignDesc }}</span>
      </el-form-item>

      <el-form-item v-else-if="form.designerDesc" label="设计师" prop="designerDesc">
        <span>{{ form.designerDesc }}</span>
      </el-form-item>

      <el-form-item
        v-if="isShowTransBtn"
        label="转让设计师"
        prop="transferDesignerCode"
        :rules="[{ required: true, message: '转让设计师不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-select
          v-model="form.transferDesignerCode"
          clearable
          filterable
          placeholder="请选择设计师"
        >
          <el-option
            v-for="item in designerMemberList"
            :key="item.designer"
            :label="item.designerDesc"
            :value="item.designer"
            :disabled="disabledTransDesigner(item.designer)"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发起人" prop="contactEmail">
        <span>{{ form.initiatorDesc }}</span>
      </el-form-item>

      <el-form-item label="转让设计师" prop="contactEmail" v-if="getTransferDesignDesc">
        <span>{{ getTransferDesignDesc }}</span>
      </el-form-item>

      <template v-if="form.designerInfoList && form.designerInfoList.length">
        <el-form-item label="任务完成链接" v-if="isShowTaskUrl">
          <template v-for="(item, index) in form.designerInfoList" :key="index">
            <div class="task-score-width" v-if="item.taskUrl">
              <span class="designer-margin">{{ item.designerDesc }}</span>
              <a target="_blank" :href="item.taskUrl">
                {{ item.taskUrl }}
              </a>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="任务完成附件" v-if="isShowTaskFile">
          <div
            v-for="(item, index) in form.designerInfoList"
            :key="index"
            class="task-score-width d-flex"
          >
            <span class="designer-margin">{{ item.designerDesc }}</span>
            <div class="file-list-wrap">
              <ul class="ul-list">
                <li
                  class="d-flex is-success ul-list-item"
                  tabindex="0"
                  v-for="urlInfo in item.taskFinishedFileList"
                  :key="urlInfo.name"
                >
                  <div class="el-upload-list__item-info">
                    <a class="el-upload-list__item-name">
                      <SvgIcon icon="iconDocument" class="el-icon el-icon--document" />
                      <span class="el-upload-list__item-file-name">
                        {{ urlInfo.name }}
                      </span>
                    </a>
                  </div>
                  <SvgIcon
                    icon="preview"
                    class="preview-file"
                    v-if="btnAuth.fileAccessAuth"
                    @click="handlePreviewFile(urlInfo)"
                  />
                  <SvgIcon
                    icon="download"
                    class="download-file"
                    v-if="btnAuth.fileAccessAuth"
                    @click="handleDownFile(urlInfo)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </el-form-item>
      </template>

      <el-form-item label="是否加急" prop="urgentFlag">
        <el-select
          v-model="form.urgentFlag"
          :disabled="isDisabledForm || form.status === TASK_STATUS.DESIGNING"
        >
          <el-option
            v-for="item in urgentFlagOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="变更原因"
        prop="changeRemark"
        v-if="isChangeTask"
        :rules="[{ required: true, message: '变更原因不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.changeRemark" :disabled="isDisabledForm" />
      </el-form-item>
      <el-form-item
        label="驳回意见"
        v-if="
          [TASK_STATUS.DRAFT, TASK_STATUS.APPROVING].includes(form.status) && form.approveReason
        "
      >
        <span>{{ form.approveReason }}</span>
      </el-form-item>
      <el-form-item label="驳回记录" v-if="rejectRecordList.length">
        <el-button type="text" @click="rejectRecordVisible = true" class="fs-12">
          查看驳回记录
        </el-button>
      </el-form-item>

      <el-form-item
        label="任务评分"
        v-if="form.status === TASK_STATUS.ACCEPTED && form.acceptScore"
      >
        <el-rate v-model="form.acceptScore" disabled allow-half />
      </el-form-item>
      <el-form-item
        label="任务评价"
        v-if="form.status === TASK_STATUS.ACCEPTED && form.acceptEvaluate"
      >
        <span>{{ form.acceptEvaluate }}</span>
      </el-form-item>

      <template v-if="form.designerScoreInfoList && form.designerScoreInfoList.length">
        <el-form-item label="任务评分表">
          <div
            v-for="(item, index) in form.designerScoreInfoList"
            :key="index"
            class="task-score-width d-flex"
          >
            <span class="designer-margin">{{ item.designerDesc }}</span>
            <div class="file-list-wrap">
              <ul class="ul-list">
                <li
                  class="d-flex is-success"
                  tabindex="0"
                  v-for="urlInfo in item.urlList"
                  :key="urlInfo.name"
                >
                  <div class="el-upload-list__item-info">
                    <a class="el-upload-list__item-name">
                      <SvgIcon icon="iconDocument" class="el-icon el-icon--document" />
                      <span class="el-upload-list__item-file-name">
                        {{ urlInfo.name }}
                      </span>
                    </a>
                  </div>
                  <SvgIcon
                    icon="preview"
                    class="preview-file"
                    v-if="btnAuth.fileAccessAuth"
                    @click="handlePreviewFile(urlInfo)"
                  />
                  <SvgIcon
                    icon="download"
                    class="download-file"
                    v-if="btnAuth.fileAccessAuth"
                    @click="handleDownFile(urlInfo)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="任务总得分">
          <div
            v-for="(item, index) in form.designerScoreInfoList"
            :key="index"
            class="task-score-width"
          >
            <span class="designer-margin">{{ item.designerDesc }}</span>
            <span>{{ item.scoreSum }}</span>
          </div>
        </el-form-item>
      </template>
    </el-form>
    <div class="form-save" v-if="!isChangeTask">
      <!-- 待提交状态-创建任务展示，编辑任务接口是否返回权限 -->
      <template
        v-if="
          (!taskId && form.status === TASK_STATUS.DRAFT) ||
          (taskId && form.status === TASK_STATUS.DRAFT && btnAuth.createFlag)
        "
      >
        <el-button @click="save(1)" :loading="saveDraftLoading">保存草稿</el-button>
        <el-button type="primary" @click="save(2)" :loading="saveLoading">
          {{ editPendingSave || !taskId ? '提交' : '编辑' }}
        </el-button>
      </template>

      <!-- 不可编辑 -->
      <template v-if="btnAuth.editFlag">
        <el-button type="primary" @click="handleEditClick">
          {{ editPendingSave ? '保存' : '编辑' }}
        </el-button>
      </template>

      <!-- 审批中状态 -->
      <template v-if="btnAuth.approveFlag">
        <el-button v-if="!editPendingSave" type="primary" @click="editPendingSave = true">
          审批
        </el-button>

        <template v-else>
          <el-button type="primary" @click="handleApproveClick">通过</el-button>
          <el-button @click="rejectVisible = true">驳回</el-button>
        </template>
      </template>

      <!-- 待认领 -->
      <template v-if="btnAuth.getFlag">
        <template v-if="+form.changeTip === 1">
          <el-button type="primary" @click="handleClaimClick(1)">
            {{ editPendingSave ? '确认认领' : '认领' }}
          </el-button>
          <el-button @click="handleClaimClick(0)">
            {{ editPendingSave ? '确认取消' : '取消认领' }}
          </el-button>
        </template>
        <el-button v-else type="primary" @click="handleClaimClick(1)">
          {{ editPendingSave ? '认领任务' : '认领' }}
        </el-button>
      </template>

      <!-- 设计中 -->
      <el-button type="primary" v-if="btnAuth.finishFlag" @click="handleFinishTask">
        完成任务
      </el-button>

      <template v-if="!isShowTransBtn">
        <el-button v-if="btnAuth.changeFlag" @click="transferTak">转让任务</el-button>
      </template>
      <template v-else>
        <el-button type="primary" @click="handleTransferConfirm">
          {{ editPendingSave ? '确认转让' : '转让' }}
        </el-button>
        <el-button @click="cancelTransferTak">取消转让</el-button>
      </template>

      <!-- 已完成 -->
      <el-button v-if="btnAuth.checkFlag" type="primary" @click="showCheckDialog(1)">
        验收
      </el-button>
      <el-button v-if="btnAuth.checkRejectFlag" @click="showCheckDialog(2)">驳回</el-button>

      <!-- 待内部验收 -->
      <el-button v-if="btnAuth.innerCheckFlag" type="primary" @click="handleInnerAccept">
        验收通过
      </el-button>
      <el-button v-if="btnAuth.innerCheckRejectFlag" @click="innerCheckVisible = true">
        驳回
      </el-button>
      <!-- 变更 -->
      <template v-if="btnAuth.changeTaskFlag">
        <el-button type="primary" @click="showChangeTask">变更</el-button>
      </template>
      <!-- <el-button type="primary" @click="showChangeTask">变更</el-button> -->
      <template
        v-if="
          [
            TASK_STATUS.DESIGNING,
            TASK_STATUS.FINISHED,
            TASK_STATUS.ACCEPTED,
            TASK_STATUS.INTERNAL_CHECK,
          ].includes(form.status)
        "
      >
        <el-button type="primary" @click="openChangeTaskLog">变更日志</el-button>
      </template>
      <!-- 待提交、待认领、待审批 -->
      <template v-if="btnAuth.deleteFlag">
        <el-button type="danger" @click="operateTask(9)">删除</el-button>
      </template>
      <el-button @click="gotoTaskList">取消</el-button>
    </div>
    <div class="form-save" v-else>
      <el-button type="primary" @click="handleChangeEditClick">
        {{ changeEditPendingSave ? '保存' : '编辑' }}
      </el-button>
      <el-button @click="handleChangeTaskCancel">取消</el-button>
    </div>
  </div>

  <!-- 需求方验收驳回弹窗 -->
  <el-dialog
    :title="acceptResult === 1 ? (isAcceptUploadFile ? '上传打分表' : '验收任务') : '驳回任务'"
    :model-value="acceptVisible"
    @close="handleCancel"
    width="40%"
  >
    <el-form ref="acceptFormRef" :model="form" label-position="left" label-width="120px">
      <template v-if="acceptResult === 1">
        <!-- ID设计、CMF设计上传文件，其余打分 -->
        <template v-if="isAcceptUploadFile">
          <el-form-item
            prop="acceptFileList"
            :rules="[{ required: true, message: '文件不能为空', trigger: ['blur', 'change'] }]"
          >
            <KeenFileUpload
              ref="upload"
              v-model="form.acceptFileList"
              directory="fileCenter"
              :limit="10"
              :multiple="false"
              :showOperate="!!btnAuth.fileAccessAuth"
              class="file-upload"
              @success="acceptFormRef.clearValidate('acceptFileList')"
            >
              <el-button type="primary" size="small">选择文件</el-button>
            </KeenFileUpload>
          </el-form-item>
          <el-form-item
            prop="scoreSum"
            label="任务得分"
            :rules="[
              { required: true, message: '任务得分不能为空', trigger: ['blur', 'change'] },
              {
                pattern: /^(100(\.0+)?|(\d?\d(\.\d+)?))$/,
                message: '请填写100及100以内的整数或者小数',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="form.scoreSum" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item
            prop="acceptScore"
            label="任务评分"
            :rules="[{ required: true, message: '评分不能为空', trigger: ['blur', 'change'] }]"
          >
            <el-select v-model="form.acceptScore" placeholder="请选择">
              <el-option
                v-for="item in acceptScoreList"
                :key="item.value"
                :label="item.desc"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务评价" prop="acceptEvaluate">
            <el-input v-model="form.acceptEvaluate" type="textarea" rows="3" maxlength="200" />
          </el-form-item>
        </template>
      </template>
      <template v-else>
        <el-form-item
          label="驳回原因"
          prop="rejectReasonType"
          :rules="[{ required: true, message: '请选择驳回原因', trigger: ['blur', 'change'] }]"
        >
          <el-select
            v-model="form.rejectReasonType"
            clearable
            filterable
            placeholder="请选择驳回原因"
          >
            <el-option
              v-for="item in rejectedList"
              :key="item.value"
              :label="item.desc"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="被驳回设计师"
          prop="designerCodeList"
          :rules="[
            { required: true, message: '请选择需要被驳回的设计师', trigger: ['blur', 'change'] },
          ]"
        >
          <el-select
            v-model="form.designerCodeList"
            clearable
            filterable
            multiple
            placeholder="请选择需要被驳回的设计师"
          >
            <el-option
              v-for="item in form.designerInfoList"
              :key="item.designerCode"
              :label="item.designerDesc"
              :value="item.designerCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="驳回意见" prop="rejectReason">
          <el-input v-model="form.rejectReason" type="textarea" rows="3" maxlength="200" />
        </el-form-item>
        <el-form-item label="附件" prop="productList">
          <KeenFileUpload
            ref="upload"
            v-model="form.fileList"
            directory="fileCenter"
            :limit="10"
            :multiple="true"
            :showOperate="!!btnAuth.fileAccessAuth"
            class="file-upload"
          >
            <el-button type="primary" size="small">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleCheckResult">
          {{ acceptResult === 1 ? (isAcceptUploadFile ? '确认' : '验收') : '驳回' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 内部驳回弹窗 -->
  <el-dialog
    title="驳回任务"
    :model-value="innerCheckVisible"
    @close="handleInnerCancel"
    width="40%"
  >
    <el-form
      ref="innerCheckFormRef"
      :model="innerCheckForm"
      label-position="left"
      label-width="120px"
    >
      <el-form-item
        label="被驳回设计师"
        prop="designerCodeList"
        :rules="[
          { required: true, message: '请选择需要被驳回的设计师', trigger: ['blur', 'change'] },
        ]"
      >
        <el-select
          v-model="innerCheckForm.designerCodeList"
          clearable
          filterable
          multiple
          placeholder="请选择需要被驳回的设计师"
        >
          <el-option
            v-for="item in form.designerInfoList"
            :key="item.designerCode"
            :label="item.designerDesc"
            :value="item.designerCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="驳回意见"
        prop="rejectReason"
        :rules="[{ required: true, message: '驳回意见不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="innerCheckForm.rejectReason" type="textarea" rows="3" maxlength="200" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleInnerCancel">取消</el-button>
        <el-button type="primary" @click="handleInnerCheckResult">驳回</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 审批驳回弹窗 -->
  <el-dialog title="驳回任务" :model-value="rejectVisible" @close="handleRejectCancel" width="40%">
    <el-form
      ref="innerCheckFormRef"
      :model="innerCheckForm"
      label-position="left"
      label-width="120px"
    >
      <el-form-item
        label="驳回意见"
        prop="rejectReason"
        :rules="[{ required: true, message: '驳回意见不能为空', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="innerCheckForm.rejectReason" type="textarea" rows="3" maxlength="200" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleRejectCancel">取消</el-button>
        <el-button type="primary" @click="handleRejectResult">驳回</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 完成任务弹窗 -->
  <el-dialog title="完成任务" :model-value="finishVisible" @close="handleFinishCancel" width="40%">
    <el-form ref="finishFormRef" :model="finishForm" label-position="left" label-width="120px">
      <el-form-item label="任务完成链接" prop="taskUrl">
        <el-input v-model="finishForm.taskUrl" maxlength="500" />
      </el-form-item>
      <el-form-item label="任务完成附件" prop="productList">
        <KeenFileUpload
          ref="finishUpload"
          v-model="finishForm.fileList"
          directory="fileCenter"
          :limit="10"
          :multiple="true"
          :showOperate="!!btnAuth.fileAccessAuth"
          class="file-upload"
        >
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFinishCancel">取消</el-button>
        <el-button type="primary" @click="handleFinishResult">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 内部变更日志弹窗 -->
  <el-dialog
    title="变更日志"
    :model-value="changeTaskLogVisible"
    @close="handleChangeTaskLogCancel"
    width="50%"
    class="change-log"
  >
    <el-empty v-if="emptyLog" description="暂无变更日志" />
    <div v-else>
      <el-card class="box-card" v-for="(item, index) in logList" :key="index">
        <div class="card-item">
          <div>
            <span class="time">{{ item.operationTime }}</span>
            <!-- <span class="name">{{ item.operatorName }}</span> -->
          </div>
          <div class="card-item">
            <span class="name">{{ item.operatorName }}</span>
            <span class="content">
              {{ item.operationContent }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleChangeTaskLogCancel">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <FilesPreview
    v-if="previewVisible"
    :key="fileUrl"
    :fileUrl="fileUrl"
    :fileName="fileName"
    :extType="extType"
    @close="previewVisible = false"
  />
  <BindGoods
    v-if="bindGoodsVisible"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productBeanList"
    confirmText="确认"
  />
  <RejectRecordDrawer
    v-if="rejectRecordVisible"
    :visible="rejectRecordVisible"
    :list="rejectRecordList"
    :auth="!!btnAuth.fileAccessAuth"
    @close="rejectRecordVisible = false"
    @preview="handlePreviewFile"
    @download="handleDownFile"
  />
</template>

<script setup lang="ts" name="designtaskoperatetype">
  import { useRouter, useRoute } from 'vue-router';
  import { designApi, DesignApi, platformApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { useStore } from '@/store/modules/useStore';
  import * as swal from '@/utils/swal';
  import { download } from '@/utils/download';
  import { keyBy } from 'lodash-es';
  import BindGoods from '@/views/lute-os/goodscenter/bindGoods/Modal/bindGoods.vue';
  import { itemTypeList, dictCodeMap } from '../config/index.ts';
  import { TASK_STATUS } from '../constants';
  import RejectRecordDrawer from './Modal/rejectReword.vue';
  import dayjs from 'dayjs';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  import { onActivated } from 'vue';
  const { userInfo } = useStore();

  const router = useRouter();
  const route = useRoute();
  const pageLoading = ref(false);
  const consumeTaskListSearchInfo = () => {
    const raw = sessionStorage.getItem('taskListSearchInfo') ?? '{}';
    sessionStorage.removeItem('taskListSearchInfo');
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  };

  // 创建一个表示当前日期的Date对象
  const currentDate = new Date();

  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并确保两位数格式
  const day = String(currentDate.getDate()).padStart(2, '0'); // 确保两位数格式

  const formRef = ref();
  const buildInitialForm = () =>
    ({
      designTaskCode: '',
      endDate: '',
      initiator: userInfo.memberCode,
      initiatorDesc: userInfo.name,
      itemTag: '',
      itemType: route.query.itemType ? +route.query.itemType : 0,
      name: '',
      operateType: 2,
      operatorGroupCode: route.query.groupCode ? route.query.groupCode : '',
      productCategoryCode: '',
      productLevel: '',
      productList: '',
      startDate: `${year}-${month}-${day}`,
      createDate: `${year}-${month}-${day}`,
      changeDate: `${year}-${month}-${day}`,
      lastSubmitDate: '',
      status: route.query.status ? +route.query.status : 1,
      statusDesc: '待提交',
      designerDesc: '待认领',
      urgentFlag: 0,
      rejectReason: '',
      transferDesignerCode: '',
      designScoreList: [],
      designerCodeList: [],
      acceptScore: '',
      scoreSum: '',
      taskType: '',
      changeTip: '', // 是否转让
      ossKeys: [],
      ossScoreKeys: [],
      acceptFileList: [],
      receiveDate: '',
      finishTime: '',
      designerScoreInfoList: [],
      designerInfoList: [],
      productSpuList: [],
      approveReason: '',
      rejectReasonType: '', // 需求方验收时的驳回原因
      fileList: [], //  验收驳回\完成任务附件
      changeRemark: '', // 变更原因
      contractCodeList: [''],
    } satisfies DesignApi.LuteosDesignSaveDesignTask.RequestBody);
  const form: any = reactive<DesignApi.LuteosDesignSaveDesignTask.RequestBody>(buildInitialForm());
  const creatorFlag = ref(false); // 是否创建人
  const designerFlag = ref(false); // 是否设计师
  const approverFlag = ref(false); // 是否审批人
  const designManagerFlag = ref(false); // 是否设计管理员

  // 项目类型
  const urgentFlagOptions = ref([
    {
      name: '不加急',
      code: 0,
    },
    {
      name: '加急',
      code: 1,
    },
  ]);
  const itemTypeTextMap = ref<Record<number, string>>({});
  const queryTaskItemTypeText = async () => {
    try {
      const res: any = await designApi.luteosDesignQueryDesignTaskItemType02List({});
      const itemTypeMap = keyBy(res.itemTypeList || [], 'itemType');
      itemTypeTextMap.value = Object.keys(itemTypeMap).reduce(
        (prev, key) => ({
          ...prev,
          [Number(key)]: itemTypeMap[key].itemTypeName,
        }),
        {} as Record<number, string>
      );
    } catch {}
  };
  queryTaskItemTypeText();

  const getProjectDesc = computed(() => {
    const projectInfo = itemTypeList.find((item: any) => item.type === form.itemType) || {};
    return itemTypeTextMap.value[form.itemType] || projectInfo.text;
  });

  const getDesignDesc = computed(() => {
    // 大于1个则拼接状态
    if (form.designerInfoList.length > 1) {
      let desc = '';
      form.designerInfoList.forEach((item, index) => {
        desc += `${item.designerDesc}（${item.statusDesc}）`;
        if (index !== form.designerInfoList.length - 1) {
          desc += '、';
        }
      });
      return desc;
    }
    return form.designerInfoList[0].designerDesc;
  });

  const getTransferDesignDesc = computed(() => {
    if (form.designerInfoList.length > 0) {
      let desc = '';
      form.designerInfoList.forEach((item, index) => {
        if (item.transferDesignerDesc) {
          desc += `${item.transferDesignerDesc}`;
          if (index !== 0 && index !== form.designerInfoList.length - 1) {
            desc += '、';
          }
        }
      });
      return desc;
    }
    return '';
  });

  const canSpecifyDesigner = computed(
    () =>
      [TASK_STATUS.DESIGNING, TASK_STATUS.APPROVING].includes(form.status) && approverFlag.value
  );
  const designerCodeListRules = computed(() =>
    form.status === TASK_STATUS.DESIGNING
      ? [{ required: true, message: '设计师不能为空', trigger: ['blur', 'change'] }]
      : []
  );

  // 是否展示任务完成链接
  const isShowTaskUrl = computed(() => {
    const data = form.designerInfoList.filter((item) => item.taskUrl);
    return !!data.length;
  });

  // 是否展示任务完成附件
  const isShowTaskFile = computed(() => {
    const data = form.designerInfoList.filter(
      (item) => item.taskFinishedFileList && item.taskFinishedFileList.length
    );
    return !!data.length;
  });

  const fileList = ref([]);
  const isBaseFileUploading = computed(() =>
    fileList.value.some(
      (file: any) =>
        file?.status === 'uploading' ||
        (typeof file?.percentage === 'number' && file.percentage > 0 && file.percentage < 100)
    )
  );
  const ensureBaseUploadCompleted = () => {
    if (!isBaseFileUploading.value) {
      return true;
    }
    ElMessage.warning('文件正在上传中，请稍后再试');
    return false;
  };
  const editPendingSave = ref(false);
  const changeEditPendingSave = ref(false);

  // 全局禁用禁用表单输入框
  const isDisabledForm = computed(() => {
    if (!taskId.value) {
      return false;
    }
    if (!(editPendingSave.value || changeEditPendingSave.value || isChangeTask.value)) {
      return true;
    }
    if (isChangeTask.value) {
      return false;
    }
    // 优先判断角色，再判断状态
    if (form.status === 1) {
      return false;
    }
    // 创建人，待指派、已完成、已验收、回收站不可编辑
    if (creatorFlag.value) {
      return [3, 6, 7, 8].includes(form.status);
    }
    // 审批人，待提交、待指派、已完成、已验收、回收站不可编辑
    if (approverFlag.value) {
      return [1, 3, 6, 7, 8].includes(form.status);
    }
    // 是否加急
    if (form.urgentFlag.value) {
      return true;
    }
    // 设计师，待提交、审批中、已完成、已验收、回收站不可编辑
    if (designerFlag.value) {
      return [1, 2, 3, 6, 7, 8].includes(form.status);
    }
    // 其余
    return true;
  });

  const isChangeTask = ref(false); // 是否点击 变更按钮
  const showChangeTask = () => {
    isChangeTask.value = true;
  };
  const handleChangeEditClick = () => {
    if (!changeEditPendingSave.value) {
      changeEditPendingSave.value = true;
      return;
    }
    handleChangeTask(10);
  };
  // 保存变更
  const handleChangeTask = (type) => {
    if (fileList.value.length) {
      const ossKeys: any = [];
      const nameArr: any = [];
      fileList.value.forEach((item: any) => {
        if (!nameArr.includes(item.name)) {
          nameArr.push(item.name);
          ossKeys.push({ ossKey: item.ossKey, name: item.name });
        }
      });
      form.ossKeys = ossKeys;
    } else if (uploadRequire.value) {
      ElMessage.error('请上传文件');
      return;
    }

    formRef.value?.validate?.((isvalid) => {
      if (isvalid) {
        saveLoading.value = true;
        if (isDesignScoreEmpty()) {
          form.designScoreList = null;
        }
        removeEmptyStrings(form);
        if (form.finishTime) {
          form.finishTime = dayjs(form.finishTime).format('YYYY-MM-DD 00:00:00');
        }
        console.log('参数:', form);
        designApi
          .luteosDesignChangeTask(form)
          .then((res) => {
            if (res.message) {
              ElMessage.error(res.message);
            } else {
              ElMessage.success('变更成功');
            }
            gotoTaskList();
          })
          .finally(() => {
            saveLoading.value = false;
            if (type === 10) {
              changeEditPendingSave.value = false;
            }
          });
      }
    });
  };
  // 取消变更
  const handleChangeTaskCancel = async () => {
    isChangeTask.value = false;
    changeEditPendingSave.value = false;
  };

  const pdtLevelList = ref([]);
  const taskTypeList = ref([]);
  const acceptScoreList = ref([]);
  const rejectedList = ref([]);
  const queryDictMap = async () => {
    const res: any = await platformApi.platformDict({
      dictCodes: ['design_score', `${dictCodeMap[+form.itemType]}`, 'design_check_reject_type'],
    });
    taskTypeList.value = res.dictMap[dictCodeMap[+form.itemType]] || [];
    acceptScoreList.value = res.dictMap.design_score || [];
    rejectedList.value = res.dictMap.design_check_reject_type || [{ desc: '需求变更', value: 1 }];
  };
  queryDictMap();

  const queryPdtLevelList = async () => {
    const res: any = await designApi.luteosDesignQueryDesignLevelDict({
      itemType: form.itemType,
    });
    pdtLevelList.value = res.dictMap.product_level || [];
  };
  queryPdtLevelList();

  const designScoreList = ref([]);
  const queryScoreList = async () => {
    const res = await designApi.luteosDesignScoreQueryDesignScoreList({
      pageNum: 1,
      pageSize: 100,
      taskType: form.taskType,
      itemType: form.itemType,
    });
    designScoreList.value = res.designScoreList || [];
  };

  const handleTaskTypeChange = () => {
    form.designScoreList = [];
    addTaskType();
    queryScoreList();
  };

  // 查询设计师
  const designerMemberList = ref([]);
  const queryDesignerList = () => {
    designApi
      .luteosDesignQueryDesignerList({
        itemType: form.itemType,
      })
      .then((res) => {
        designerMemberList.value = res.designerList || [];
      });
  };
  queryDesignerList();

  // 选择商品
  const bindGoodsVisible = ref(false);
  const productBeanList = ref([]);

  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.productSpuList = val.map((item) => item.productSpu);
      productBeanList.value = val;
    }
    bindGoodsVisible.value = false;
  };
  //  关联商品描述
  const productListDesc = computed(() => {
    if (productBeanList.value && productBeanList.value.length) {
      let desc = '';
      productBeanList.value.forEach((item, index) => {
        desc += `${item.name}（${item.productSpu}）`;
        if (index !== productBeanList.value.length - 1) {
          desc += '、';
        }
      });
      return desc;
    }
  });

  // 提交
  const saveLoading = ref(false);
  const saveDraftLoading = ref(false);
  const handleEditClick = () => {
    if (!editPendingSave.value) {
      editPendingSave.value = true;
      return;
    }
    save(10);
  };
  const handleApproveClick = () => {
    if (!editPendingSave.value) {
      editPendingSave.value = true;
      return;
    }
    operateTask(3, 1);
  };
  const handleClaimClick = (status) => {
    if (!editPendingSave.value) {
      editPendingSave.value = true;
      return;
    }
    operateTask(4, status);
  };
  const handleTransferConfirm = () => {
    if (!editPendingSave.value) {
      editPendingSave.value = true;
      return;
    }
    operateTask(5);
  };
  const save = (type) => {
    if (finishVisible.value) {
      return;
    }
    if (type === 2 && !editPendingSave.value && taskId.value) {
      editPendingSave.value = true;
      return;
    }
    if (!ensureBaseUploadCompleted()) {
      return;
    }
    form.operateType = type;
    if (fileList.value.length) {
      const ossKeys: any = [];
      const nameArr: any = [];
      fileList.value.forEach((item: any) => {
        if (!nameArr.includes(item.name)) {
          nameArr.push(item.name);
          ossKeys.push({ ossKey: item.ossKey, name: item.name });
        }
      });
      form.ossKeys = ossKeys;
    } else if (uploadRequire.value) {
      ElMessage.error('请上传文件');
      return;
    }

    formRef.value?.validate?.((isvalid) => {
      if (isvalid) {
        if (type === 1) {
          saveDraftLoading.value = true;
        } else {
          saveLoading.value = true;
        }
        if (isDesignScoreEmpty()) {
          form.designScoreList = null;
        }
        removeEmptyStrings(form);
        formatContractNoList();
        if (form.finishTime) {
          form.finishTime = dayjs(form.finishTime).format('YYYY-MM-DD 00:00:00');
        }
        designApi
          .luteosDesignSaveDesignTask(form)
          .then((res) => {
            if (res.message) {
              ElMessage.error(res.message);
            } else {
              ElMessage.success(type === 1 ? '保存草稿成功' : '提交成功');
            }
            gotoTaskList();
          })
          .finally(() => {
            saveLoading.value = false;
            saveDraftLoading.value = false;
            if (type === 10) {
              editPendingSave.value = false;
            }
          });
      }
    });
  };
  // 跳转任务页面
  const gotoTaskList = () => {
    editPendingSave.value = false;
    changeEditPendingSave.value = false;
    formRef.value?.resetFields?.();
    const searchInfo = consumeTaskListSearchInfo();
    router.push({
      name: route.query.path ? `designtask${route.query.path}` : 'designtasklist',
      params: {
        ...searchInfo,
      },
    });
  };

  const handleFileNameClick = () => {
    if (taskId.value && !btnAuth.value.fileAccessAuth) {
      ElMessage.info('暂无操作权限');
    }
  };

  // 新增设计类型
  const addTaskType = () => {
    const data = {
      designScoreCode: '',
      num: '',
      score: '',
    };
    if (!form.designScoreList) {
      form.designScoreList = [];
    }
    form.designScoreList.push(data);
  };
  // 删除设计类型
  const delTaskType = (index) => {
    form.designScoreList.splice(index, 1);
  };

  // 展示确认转让按钮
  const isShowTransBtn = ref(false);
  const transferTak = () => {
    isShowTransBtn.value = true;
    queryDesignerList();
  };

  // 取消转让设计师
  const cancelTransferTak = () => {
    isShowTransBtn.value = false;
    form.transferDesignerCode = '';
  };

  // 是否禁用转让设计师
  const disabledTransDesigner = (designerCode) => {
    const designerList = form.designerInfoList.map((item) => item.designerCode);
    return designerList.includes(designerCode);
  };

  const designScoreSelectArr = computed(() => {
    const list = [];
    // 缓存已选择的设计类型
    form.designScoreList.forEach((item) => {
      item.designScoreCode && list.push(item.designScoreCode);
    });
    return list;
  });

  // 上传文件必填
  const uploadRequire = computed(() => {
    return [11, 12].includes(+form.itemType);
  });

  // 设计类型切换时处理
  const handleScoreChange = (val, index) => {
    const data: any = designScoreList.value.find((item: any) => item.designScoreCode === val) || {};
    form.designScoreList[index].score = data.score;
  };

  // 验收、驳回逻辑
  const acceptFormRef = ref();
  const acceptResult = ref(); // 1-验收，2-驳回
  const acceptVisible = ref(false);
  const isAcceptUploadFile = ref([7, 8].includes(+form.itemType)); // ID设计、CMF设计
  // 展示验收驳回弹窗
  const showCheckDialog = (type) => {
    acceptResult.value = type;
    acceptVisible.value = true;
  };
  // 验收、驳回取消
  const upload = ref();
  const productUpload = ref();
  const handleCancel = () => {
    acceptVisible.value = false;
    // 验收参数
    form.acceptScore = '';
    form.scoreSum = '';
    form.acceptFileList = [];
    // 驳回参数
    form.rejectReason = '';
    form.fileList = [];
    form.rejectReasonType = '';
    form.designerCodeList = [];

    upload.value?.uploadRef?.clearFiles?.();
    nextTick(() => {
      acceptFormRef.value?.clearValidate?.();
    });
  };

  // 验收、驳回确认
  const handleCheckResult = () => {
    acceptFormRef.value?.validate?.((isValid) => {
      if (isValid) {
        if (btnAuth.value.finishFlag && isAcceptUploadFile.value) {
          // 完成任务
          operateTask(6, null);
        } else {
          // 验收驳回任务
          operateTask(7, acceptResult.value === 1 ? 1 : 0);
        }
      }
    });
  };

  const innerCheckVisible = ref(false);
  const innerCheckFormRef = ref();
  const innerCheckForm = ref({
    designerCodeList: [],
    rejectReason: '',
  });
  // 内部验收通过
  const handleInnerAccept = () => {
    designApi
      .luteosDesignOperateDesignTask({
        designTaskCode: form.designTaskCode,
        operateType: 13,
        operateStatus: 1,
      })
      .then(() => {
        gotoTaskList();
      });
  };
  // 待内部验收驳回取消
  const handleInnerCancel = () => {
    innerCheckVisible.value = false;
    innerCheckForm.value.designerCodeList = [];
    innerCheckForm.value.rejectReason = '';
    nextTick(() => {
      innerCheckFormRef.value?.clearValidate?.();
    });
  };

  // 待内部验收驳回确认
  const handleInnerCheckResult = () => {
    innerCheckFormRef.value?.validate?.((isValid) => {
      if (isValid) {
        // 操作任务
        designApi
          .luteosDesignOperateDesignTask({
            designTaskCode: form.designTaskCode,
            operateType: 13,
            operateStatus: 0,
            designerCodeList: innerCheckForm.value.designerCodeList,
            rejectReason: innerCheckForm.value.rejectReason,
          })
          .then(() => {
            innerCheckForm.value.designerCodeList = [];
            innerCheckForm.value.rejectReason = '';
            gotoTaskList();
          });
      }
    });
  };

  const rejectVisible = ref(false);
  const rejectFormRef = ref();
  const rejectForm = ref({
    rejectReason: '',
  });
  // 待内部验收驳回取消
  const handleRejectCancel = () => {
    rejectVisible.value = false;
    rejectForm.value.rejectReason = '';
    nextTick(() => {
      rejectFormRef.value?.clearValidate?.();
    });
  };

  // 待内部验收驳回确认
  const handleRejectResult = () => {
    innerCheckFormRef.value?.validate?.((isValid) => {
      if (isValid) {
        // 操作任务
        designApi
          .luteosDesignOperateDesignTask({
            designTaskCode: form.designTaskCode,
            operateType: 3,
            operateStatus: 0,
            rejectReason: innerCheckForm.value.rejectReason,
          })
          .then(() => {
            rejectForm.value.rejectReason = '';
            gotoTaskList();
          });
      }
    });
  };

  const finishVisible = ref(false);
  const finishFormRef = ref();
  const finishForm = ref({
    taskUrl: '',
    fileList: [],
  });
  // 完成任务取消操作
  const handleFinishCancel = () => {
    finishVisible.value = false;
    finishForm.value.taskUrl = '';
    finishForm.value.fileList = [];
    nextTick(() => {
      finishFormRef.value?.clearValidate?.();
    });
  };

  // 完成任务确认操作
  const handleFinishResult = () => {
    finishFormRef.value?.validate?.((isValid) => {
      if (isValid) {
        // 完成任务
        operateTask(6, null);
      }
    });
  };

  const isDesignScoreEmpty = () => {
    if (!form.designScoreList || !form.designScoreList.length) {
      return true;
    }
    if (form.designScoreList.length) {
      const info = form.designScoreList[0];
      if (!info.designScoreCode || !info.score || !info.num || !/^[0-9]\d*$/.test(info.num)) {
        return true;
      }
    }
  };

  // 删除空字符串的字段
  const removeEmptyStrings = (obj) => {
    for (const key in obj) {
      if (obj[key] === '') {
        delete obj[key];
      }
    }
    return obj;
  };

  const handleFinishTask = () => {
    if (isDesignScoreEmpty()) {
      ElMessage.warning('设计类型以及对应的数量必填，且数量必须为整数');
      return;
    }
    // ID设计、CMF设计上传文件
    if (isAcceptUploadFile.value) {
      showCheckDialog(1);
    } else {
      // 回显完成任务弹窗信息，完成链接和附件
      if (form.designerInfoList && form.designerInfoList.length) {
        const taskFinishInfo =
          form.designerInfoList.find((item) => item.designerCode === userInfo?.memberCode) || {};
        if (taskFinishInfo.designerCode) {
          finishForm.value.taskUrl = taskFinishInfo.taskUrl || '';
          if (taskFinishInfo.taskFinishedFileList && taskFinishInfo.taskFinishedFileList.length) {
            taskFinishInfo.taskFinishedFileList.forEach((item) => {
              const data = {
                percentage: 100,
                fileName: item.name,
                name: item.name,
                status: 'success',
                ossKey: item.ossKey,
              };
              finishForm.value.fileList.push(data);
            });
          }
        }
      }
      // 正常操作完成任务
      finishVisible.value = true;
    }
  };
  const changeTaskLogVisible = ref(false);
  const logList = ref<any[]>([]);
  const emptyLog = ref(false); // 日志为空
  // 打开 变更日志 弹窗
  const openChangeTaskLog = async () => {
    // console.log('打开 变更日志 弹窗');
    changeTaskLogVisible.value = true;
    const res = await platformApi.platformQueryLog({
      pageNum: 1,
      pageSize: 100,
      // itemCode: 'D174729108097330895574',
      // itemType: 'demand_ur',
      // moduleType: 'demand',
      itemCode: taskId.value,
      moduleType: 'design',
      itemType: 'design',
    });
    if (res && res.logList) {
      if (res.logList.length > 0) {
        emptyLog.value = false;
        logList.value = res.logList.map((item) => {
          const str: any = item.operationContent;
          item.operationContent = str.replace(/"/g, '');
          return item;
        });
      } else {
        emptyLog.value = true;
      }
    }
  };
  const handleChangeTaskLogCancel = () => {
    changeTaskLogVisible.value = false;
    logList.value = [];
  };
  // operateType-操作类型 operateStatus-操作状态 0-审批/验收驳回 1-审批/验收通过 审批/验收必填
  const operateTask = async (operateType, operateStatus?) => {
    const data: any = {
      designTaskCode: form.designTaskCode,
      operateType,
      operateStatus,
      name: form.name,
      endDate: form.endDate,
      itemTag: form.itemTag,
      designScoreList: form.designScoreList,
      productLevel: form.productLevel,
      productList: form.productList,
      urgentFlag: form.urgentFlag,
      taskType: form.taskType,
      productSpuList: form.productSpuList,
    };
    if (form.finishTime) {
      data.finishTime = dayjs(form.finishTime).format('YYYY-MM-DD 00:00:00');
    }
    const ossKeys: any = [];
    const nameArr: any = [];
    const isDeleteOp = operateType === 9;
    if (fileList.value.length) {
      fileList.value.forEach((item: any) => {
        if (!nameArr.includes(item.name)) {
          nameArr.push(item.name);
          ossKeys.push({ ossKey: item.ossKey, name: item.name });
        }
      });
      data.ossKeys = ossKeys;
    } else if (uploadRequire.value && !isDeleteOp) {
      ElMessage.error('请上传文件');
      return;
    }
    // 完成任务、删除任务、验收、驳回不需要校验
    if ([3, 7, 9].includes(operateType)) {
      if (operateType === 7) {
        // 验收驳回操作
        if (operateStatus === 1) {
          data.acceptEvaluate = form.acceptEvaluate;
          data.acceptScore = form.acceptScore;
        } else {
          // 驳回
          data.rejectReason = form.rejectReason;
          data.rejectReasonType = form.rejectReasonType;
          if (form.fileList.length) {
            data.fileList = [];
            form.fileList.forEach((item) => {
              data.fileList.push({
                ossKey: item.ossKey,
                name: item.name,
              });
            });
          }
        }
        data.designerCodeList = form.designerCodeList;
      } else if (operateType === 9) {
        const isConfirmed = await swal.confirm('确定要删除吗？');
        if (!isConfirmed) return;
      } else if (operateType === 3) {
        data.designerCodeList = form.designerCodeList;
      }

      if (isDesignScoreEmpty()) {
        data.designScoreList = null;
      }

      designApi.luteosDesignOperateDesignTask(data).then(() => {
        gotoTaskList();
      });
    } else {
      formRef.value?.validate?.((isvalid) => {
        if (isvalid) {
          // 完成
          if (operateType === 6) {
            if (isDesignScoreEmpty()) {
              ElMessage.warning('设计类型以及对应的数量必填');
              return;
            }
            // ID设计、CMF设计完成时，上传文件
            if (isAcceptUploadFile.value) {
              data.scoreSum = form.scoreSum;
              data.fileList =
                form.acceptFileList &&
                form.acceptFileList.map((item) => {
                  return {
                    ossKey: item.ossKey,
                    name: item.name,
                  };
                });
            } else {
              // 其余完成任务
              data.taskUrl = finishForm.value.taskUrl;
              data.fileList =
                finishForm.value.fileList &&
                finishForm.value.fileList.map((item) => {
                  return {
                    ossKey: item.ossKey,
                    name: item.name,
                  };
                });
            }
          }
          if (operateType === 5) {
            data.transferDesignerCode = form.transferDesignerCode;
            if (!data.transferDesignerCode) {
              ElMessage.warning('请选择转让设计师');
              return;
            }
          }

          if (isDesignScoreEmpty()) {
            data.designScoreList = null;
          }
          designApi.luteosDesignOperateDesignTask(data).then(() => {
            gotoTaskList();
          });
        }
      });
    }
  };
  // 按钮权限
  const btnAuth = ref<any>({
    createFlag: 0, // 创建（提交）权限 0-无 1-有
    editFlag: 0, // 创建（提交）权限 0-无 1-有
    approveFlag: 0, // 审批权限 0-无 1-有
    getFlag: 0, // 认领权限 0-无 1-有
    changeFlag: 0, // 转让权限 0-无 1-有
    distributeFlag: 0, //
    finishFlag: 0, // 完成权限 0-无 1-有
    checkFlag: 0, // 验收权限 0-无 1-有
    deleteFlag: 0, // 删除权限 0-无 1-有
    checkRejectFlag: 0, // 验收驳回权限
    fileAccessAuth: 0, // 文件访问权限
    changeTaskFlag: 0, // 变更权限
    // changeTaskLogFlag: 0, // 变更日志权限
    contractShowFlag: 0, // 合同展示权限
  });
  async function queryDetail() {
    return designApi
      .luteosDesignQueryDesignTaskDetail({
        designTaskCode: taskId.value,
      })
      .then((res) => {
        btnAuth.value = res.auth;
        form.name = res.name;
        form.status = res.status;
        form.statusDesc = res.statusDesc;
        form.designTaskCode = res.designTaskCode;
        form.productCategoryCode = res.productCategoryCode;
        form.productList = res.productList;
        form.productLevel = res.productLevel;
        form.itemType = res.itemType;
        form.itemTag = res.itemTag;
        form.startDate = res.startDate;
        form.changeDate = res.changeDate;
        form.createDate = res.createDate;
        form.endDate = res.endDate;
        form.lastSubmitDate = res.lastSubmitDate;
        form.designerDesc = res.designerDesc || '待认领';
        form.initiator = res.initiator;
        form.initiatorDesc = res.initiatorDesc;
        form.operatorGroupCode = res.operatorGroupCode;
        form.urgentFlag = res.urgentFlag;
        form.rejectReason = res.rejectReason;
        form.designScoreList = res.designScoreList;
        form.receiveDate = res.receiveDate;
        const finish = res.finishTime || res.finishDate || '';
        const formatted = finish ? dayjs(finish).format('YYYY-MM-DD') : '';
        form.finishTime = form.finishDate = formatted;
        console.log(form.finishTime, form.finishDate);
        form.changeTip = res.changeTip;
        form.taskType = res.taskType;
        form.acceptScore = res.acceptScore || '';
        form.scoreSum = res.scoreSum;
        form.approveReason = res.approveReason;
        form.ossScoreKeys = res.ossScoreKeys || [];
        form.ossKeys = res.ossKeys || [];
        form.designerInfoList = res.designerInfoList || [];
        form.designerCodeList = form.designerInfoList.length
          ? form.designerInfoList.map((item) => item.designerCode)
          : res.designerCodeList || [];
        form.designerScoreInfoList = res.designerScoreInfoList || [{}];
        form.contractCodeList = res.contractCodeList.length ? [...res.contractCodeList] : [''];
        // 回显商品信息
        if (res.productInfoList && res.productInfoList.length) {
          productBeanList.value = res.productInfoList.map((item) => {
            return {
              productSpu: item.productSpu,
              name: item.productName,
            };
          });
          //   保存spu
          form.productSpuList = res.productInfoList.map((item) => item.productSpu);
        }

        const operator = res.operator || {};
        creatorFlag.value = !!operator.creatorFlag;
        approverFlag.value = !!operator.approverFlag;
        designerFlag.value = !!operator.designerFlag;
        designManagerFlag.value = !!operator.designManagerFlag;
        if (res.ossKeys) {
          res.ossKeys.forEach((item) => {
            fileList.value.push({
              percentage: 100,
              fileName: item.name,
              name: item.name,
              status: 'success',
              ossKey: item.ossKey,
            });
          });
        }
      });
  }
  const rejectRecordVisible = ref(false);
  const rejectRecordList = ref([]); // 驳回记录
  const queryRejectRecordList = async () => {
    const res = await designApi.luteosDesignQueryRejectRecordList({
      designTaskCode: taskId.value,
    });
    rejectRecordList.value = res.checkRejectRecordList || [];
  };

  const queryUrl = async (ossKey) => {
    const res = await platformApi.platformQueryUrl({
      ossKey,
    });
    return res.url || '';
  };
  const handlePreviewFile = async (item) => {
    if (item.ossKey) {
      fileName.value = item.name;
      const url = await queryUrl(item.ossKey);
      handlePreview(url, item.name);
    }
  };
  const handleDownFile = async (item) => {
    if (item.ossKey) {
      const url = await queryUrl(item.ossKey);
      console.log(item.name);
      download(url, item.name);
    }
  };

  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref<boolean>(false);

  const handlePreview = async (url, name) => {
    if (!url) {
      return;
    }

    // 文件地址
    fileUrl.value = url;
    previewVisible.value = true;
  };

  const taskId = ref(route.query.id as string);
  const initPage = async () => {
    if (!taskId.value) {
      return;
    }
    pageLoading.value = true;
    try {
      await queryDetail();
      queryRejectRecordList().catch(() => {});
      // 认领、转让、已完成时时查询分数
      if ([4, 5, 6, 7].includes(form.status)) {
        // 设计类型为空时需要初始化一个
        if (!form.designScoreList.length) {
          addTaskType();
        }
      }
      queryScoreList();
    } finally {
      pageLoading.value = false;
    }
  };

  onMounted(() => {
    taskId.value = route.query.id as string;
  });
  const resetFormState = () => {
    Object.assign(form, buildInitialForm());
    fileList.value = [];
    // 清空上传组件状态，避免文件残留
    productUpload.value?.uploadRef?.clearFiles?.();
    upload.value?.uploadRef?.clearFiles?.();
    productBeanList.value = [];
    finishForm.value.taskUrl = '';
    finishForm.value.fileList = [];
    editPendingSave.value = false;
    changeEditPendingSave.value = false;
    formRef.value?.clearValidate?.();
  };
  onActivated(() => {
    const currentId = route.query.id as string;
    taskId.value = currentId;
    resetFormState();
    if (taskId.value) {
      initPage();
    }
  });

  const contractNoRules = [
    {
      validator: (rule, value, callback) => {
        if (Array.isArray(value)) {
          const seenContractNumbers = new Set();
          for (let i = 0; i < value.length; i++) {
            const no = value[i];

            if (no && !/^HT-\d{8}-\d+$/.test(no)) {
              return callback(new Error(`第 ${i + 1} 个合同编号格式错误，应为 HT-YYYYMMDD-数字`));
            }

            if (no) {
              if (seenContractNumbers.has(no)) {
                return callback(new Error(`合同编号 "${no}" 在列表中重复，请确保每个合同编号唯一`));
              }
              seenContractNumbers.add(no);
            }
          }
        } else {
          if (value && !/^HT-\d{8}-\d+$/.test(value)) {
            return callback(new Error('合同编号格式错误，应为 HT-YYYYMMDD-数字'));
          }
        }
        callback();
      },
      trigger: 'blur',
    },
  ];

  const formatContractNoList = () => {
    form.contractCodeList = form.contractCodeList.reduce((acc: string[], item) => {
      const trimmed = item.trim();
      if (trimmed) acc.push(trimmed);
      return acc;
    }, []);
  };
  // 添加合同编号
  const addContractNo = () => {
    form.contractCodeList.push('');
  };

  // 删除合同编号
  const removeContractNo = (index) => {
    form.contractCodeList.splice(index, 1);
  };
</script>

<style scoped lang="scss">
  :global(.change-log) {
    padding: 20px !important;
  }

  :global(.change-log .el-dialog__body) {
    min-height: 320px !important;
    max-height: 631px !important;
    overflow: auto;
  }

  :deep(.el-card__body) {
    padding: 20px !important;
  }

  .box-card {
    margin-bottom: 20px;
    font-size: 13px;

    .card-item {
      // display: flex;
      line-height: 35px;

      .time {
        color: #888888;
        width: 150px;
        flex-shrink: 0;
      }

      .name {
        color: #191c38;
        width: 70px;
        padding-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .content {
        color: #2f354d;
      }
    }
  }

  .agency-page {
    background: #ffffff;
    padding: 40px;
  }

  .agency-page--loading {
    min-height: calc(100vh - 50px);
  }

  .form-save {
    text-align: center;

    :deep(.el-button) {
      margin-right: 15px;
    }
  }

  .m-t-20 {
    margin-top: -15px;
  }

  .reset-txt {
    height: 30px;
    font-size: 10px;
    color: #3e97ff;
    margin-top: -8px;
    margin-left: 5px;
    cursor: pointer;
  }

  .score-list {
    display: flex;
    flex-direction: column;
  }

  .score-list-item {
    display: flex;
    flex-direction: row;
  }

  .del-txt {
    color: #f00;
    margin-left: 10px;
  }

  .mt-60 {
    margin-top: -60px;
  }

  .rate-tips {
    color: #8492a6;
    font-size: 12px;
  }

  .el-select {
    width: 400px !important;
  }

  .preview {
    margin-left: 10px;
  }

  .file-upload {
    :deep(.el-upload-list) {
      width: 400px;
    }
  }

  .task-score-width {
    width: 100%;

    .designer-margin {
      margin-right: 15px;
    }
  }

  .upload-tips {
    width: 100%;
    color: #8492a6;
    font-size: 12px;
  }

  .fs-12 {
    font-size: 12px;
  }

  .file-list-wrap {
    flex-direction: column;
  }

  .ul-list {
    position: relative;
    margin-left: -30px;
  }

  .ul-list-item {
    position: relative;
  }

  .preview-file {
    font-size: 12px;
    color: #3e97ff;
    position: absolute;
    right: -35px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer;

    :deep(svg) {
      width: 15px !important;
      height: 15px !important;
    }
  }

  .download-file {
    font-size: 12px;
    color: #3e97ff;
    position: absolute;
    right: -65px;
    top: 50%;
    margin-top: -8px;
    cursor: pointer;

    :deep(svg) {
      width: 12px !important;
      height: 12px !important;
    }
  }

  .contract-no-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .contract-no-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .contract-no-input {
      flex-shrink: 0;
    }
  }
</style>
