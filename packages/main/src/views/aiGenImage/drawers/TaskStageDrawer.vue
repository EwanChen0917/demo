<template>
  <AiImageDrawerShell
    v-model="visible"
    :title="drawerTitle"
    :loading="detailLoading"
    body-class="ai-stage-drawer__body"
    :close-on-click-modal="!isUploadToSystemInProgress"
    :close-on-press-escape="!isUploadToSystemInProgress"
    :show-close-button="!isUploadToSystemInProgress"
    show-refresh-button
    :refresh-disabled="detailLoading"
    @close="handleClose"
    @refresh="handleRefreshDetail"
  >
    <input
      ref="fileInputRef"
      class="ai-stage-drawer__file"
      type="file"
      accept=".png,.jpg,.jpeg,.webp"
      @change="handleFileChange"
    />
    <input
      ref="finishedFolderInputRef"
      class="ai-stage-drawer__file"
      type="file"
      accept=".png,.jpg,.jpeg,.webp"
      directory
      webkitdirectory
      multiple
      @change="handleFinishedFolderChange"
    />
    <div
      v-if="stage === 'original' && showOriginalResultPanel"
      class="ai-stage-drawer ai-stage-drawer--original-result"
    >
      <div class="ai-stage-drawer__result-summary">
        <div
          class="ai-stage-drawer__result-avatar"
          :style="{ backgroundImage: `url(${aiAvatarImage})` }"
        ></div>
        <div class="ai-stage-drawer__result-copy">
          <h3>已通过您的提示词生成相应原图</h3>
          <p v-if="originalResultPrompt">{{ originalResultPrompt }}</p>
        </div>
      </div>

      <div class="ai-stage-drawer__original-result-grid">
        <template v-if="isOriginalGenerating && !originalResultImages.length">
          <div
            v-for="index in 4"
            :key="`placeholder-${index}`"
            class="ai-stage-drawer__original-result-card is-generating"
          >
            <img class="ai-stage-drawer__image-placeholder" :src="imageAiPlaceholder" alt="" />
          </div>
        </template>
        <template v-else>
          <div
            v-for="(image, index) in orderedOriginalResultImages"
            :key="getImageKey(image, index)"
            class="ai-stage-drawer__original-result-card"
            :class="{ 'is-selected': selectedOriginalImageKey === getImageKey(image, index) }"
          >
            <el-image
              :src="image.imageUrl"
              fit="cover"
              lazy
              scroll-container=".ai-image-drawer-shell__body"
              :preview-src-list="originalPreviewList"
              :initial-index="getOriginalPreviewIndex(image.imageUrl)"
              preview-teleported
            >
              <template #placeholder>
                <div class="ai-stage-drawer__image-loading">
                  <span class="ai-stage-drawer__image-loading-spinner"></span>
                  <!-- <em>加载中...</em> -->
                </div>
              </template>
            </el-image>
            <button
              type="button"
              class="ai-stage-drawer__original-check"
              @click.stop="handleSelectOriginalResult(image, index)"
            ></button>
          </div>
          <template v-if="showOriginalRegeneratePlaceholders">
            <div
              v-for="index in originalRegeneratePlaceholderCount"
              :key="`regenerate-placeholder-${index}`"
              class="ai-stage-drawer__original-result-card is-generating"
            >
              <img class="ai-stage-drawer__image-placeholder" :src="imageAiPlaceholder" alt="" />
            </div>
          </template>
        </template>
      </div>
      <el-empty
        v-if="!isOriginalGenerating && !originalResultImages.length"
        :image-size="88"
        description="暂无生图结果"
      />
    </div>

    <div v-else-if="stage === 'original'" class="ai-stage-drawer ai-stage-drawer--original">
      <div class="ai-stage-drawer__notice" :class="{ 'is-warning': hasMissingMaterial }">
        <i
          class="iconfont Root-tyicon"
          :class="
            hasMissingMaterial ? 'icon-Root-tyzhuyi-mianxing' : 'icon-Root-tychenggongzhuangtai'
          "
        ></i>
        {{ materialNotice }}
      </div>

      <section class="ai-stage-drawer__section">
        <h3>产品信息 {{ productGroups.length }}</h3>
        <ProductMaterialSection
          v-for="group in productGroups"
          :key="group.spuCode"
          :group="group"
          @select="(id) => handleSelectProductImage(group, id)"
          @upload="() => triggerUpload('product', group)"
          @page-change="(pageNum) => queryKmsProductImages(group, pageNum)"
        />
        <el-empty v-if="!productGroups.length" :image-size="88" description="暂无产品信息" />
      </section>

      <div class="ai-stage-drawer__divider"></div>

      <section class="ai-stage-drawer__section">
        <h3>提示词</h3>
        <div class="ai-stage-drawer__field-label">原始提示词</div>
        <el-input
          v-model="prompt"
          type="textarea"
          placeholder="请输入"
          :rows="5"
          show-word-limit
          @blur="handleOriginalPromptBlur"
        />
        <el-button
          class="ai-stage-drawer__refine"
          plain
          type="primary"
          :loading="refineLoading"
          @click="handleRefinePrompt"
        >
          <img class="ai-stage-drawer__refine-icon" :src="aiRefineIcon" alt="" />
          AI润色一下
        </el-button>
        <div class="ai-stage-drawer__field-label">润色后结果</div>
        <el-input
          v-model="refinedPrompt"
          type="textarea"
          placeholder="AI 润色后结果"
          :rows="5"
          show-word-limit
        />
      </section>
    </div>

    <div v-else-if="stage === 'expand'" class="ai-stage-drawer ai-stage-drawer--expand">
      <section v-if="!showExpandResultPanel" class="ai-stage-drawer__section">
        <div
          v-if="!detail.originalConfirmedImage?.imageUrl"
          class="ai-stage-drawer__upload-card"
          @click="triggerUpload('original')"
        >
          <img v-if="localOriginalImageUrl" :src="localOriginalImageUrl" alt="" />
          <template v-else>
            <strong>+</strong>
            <span>添加图片</span>
            <em>(0/1)</em>
          </template>
        </div>
        <div v-else class="ai-stage-drawer__origin-preview">
          <el-image
            :src="detail.originalConfirmedImage.imageUrl"
            fit="cover"
            @click="triggerUpload('original')"
            style="cursor: pointer"
          />
          <!-- <span>已选择原图</span> -->
        </div>
      </section>

      <section v-if="!showExpandResultPanel" class="ai-stage-drawer__section">
        <div class="ai-stage-drawer__size-groups">
          <div v-for="group in expandSizeGroups" :key="group.channel">
            <p>{{ group.channel }}</p>
            <div>
              <span v-for="size in group.sizes" :key="size">{{ size }}</span>
            </div>
          </div>
        </div>
      </section>

      <section v-if="showExpandResultPanel" class="ai-stage-drawer__section">
        <ResultGallery
          :groups="expandResultGroups"
          :selectable="isExpandSelecting"
          :placeholder-animated="isExpandPlaceholderAnimating"
          :select-placeholder="isReExpandSelecting"
          :selected-keys="selectedExpandImageKeys"
          @toggle-select="handleToggleExpandImage"
        />
      </section>
    </div>

    <div
      v-else-if="isUploadToSystemInProgress"
      class="ai-stage-drawer ai-stage-drawer--finished ai-stage-drawer--platform-state"
    >
      <div class="ai-stage-drawer__platform-state ai-stage-drawer__platform-state--uploading">
        <div class="ai-stage-drawer__platform-uploading-icon">
          <!-- <span class="ai-stage-drawer__platform-gear ai-stage-drawer__platform-gear--left">
            <el-icon><Setting /></el-icon>
          </span>
          <span class="ai-stage-drawer__platform-gear ai-stage-drawer__platform-gear--right">
            <el-icon><Setting /></el-icon>
          </span> -->
          <EmptyAnimation :width="80" :height="80" name="loading" />
        </div>
        <!-- <p class="ai-stage-drawer__platform-title">
          已上传
          <span>{{ uploadProgressPlaceholderCount }}</span>
          张图片... ({{ uploadProgressPlaceholderPercent }}%)
        </p> -->
        <p class="ai-stage-drawer__platform-tip">成品图上传速度根据图片大小与质量动态适配</p>
        <!-- <div class="ai-stage-drawer__platform-progress">
          <div
            class="ai-stage-drawer__platform-progress-bar"
            :style="{ width: `${uploadProgressPlaceholderBarPercent}%` }"
          ></div>
        </div> -->
      </div>
    </div>

    <div v-else class="ai-stage-drawer ai-stage-drawer--finished">
      <div class="ai-stage-drawer__timeline">
        <section
          class="ai-stage-drawer__timeline-item"
          :class="{ 'is-collapsed': !isDetailResultExpanded('original') }"
        >
          <span class="ai-stage-drawer__timeline-dot"></span>
          <h3>
            <button
              type="button"
              class="ai-stage-drawer__timeline-title"
              :aria-expanded="isDetailResultExpanded('original')"
              @click="toggleDetailResult('original')"
            >
              <span>原图生成结果</span>
              <i
                class="ai-stage-drawer__timeline-arrow"
                :class="{ 'is-expanded': isDetailResultExpanded('original') }"
              ></i>
            </button>
          </h3>
          <div
            v-show="isDetailResultExpanded('original')"
            class="ai-stage-drawer__timeline-content"
          >
            <p v-if="galleryPrompt">{{ galleryPrompt }}</p>
            <ResultGallery
              v-if="originalGeneratedResultGroups.length"
              :groups="originalGeneratedResultGroups"
              variant="detail"
            />
            <el-empty v-else :image-size="72" description="暂无原图生成结果" />
          </div>
        </section>

        <section
          class="ai-stage-drawer__timeline-item"
          :class="{ 'is-collapsed': !isDetailResultExpanded('originalConfirmed') }"
        >
          <span class="ai-stage-drawer__timeline-dot"></span>
          <h3>
            <button
              type="button"
              class="ai-stage-drawer__timeline-title"
              :aria-expanded="isDetailResultExpanded('originalConfirmed')"
              @click="toggleDetailResult('originalConfirmed')"
            >
              <span>原图确认结果</span>
              <i
                class="ai-stage-drawer__timeline-arrow"
                :class="{ 'is-expanded': isDetailResultExpanded('originalConfirmed') }"
              ></i>
            </button>
          </h3>
          <div
            v-show="isDetailResultExpanded('originalConfirmed')"
            class="ai-stage-drawer__timeline-content"
          >
            <ResultGallery
              v-if="originalConfirmedResultGroups.length"
              :groups="originalConfirmedResultGroups"
              variant="detail"
            />
            <el-empty v-else :image-size="72" description="暂无原图确认结果" />
          </div>
        </section>

        <section
          class="ai-stage-drawer__timeline-item"
          :class="{ 'is-collapsed': !isDetailResultExpanded('expand') }"
        >
          <span class="ai-stage-drawer__timeline-dot"></span>
          <h3>
            <button
              type="button"
              class="ai-stage-drawer__timeline-title"
              :aria-expanded="isDetailResultExpanded('expand')"
              @click="toggleDetailResult('expand')"
            >
              <span>扩图生成结果</span>
              <i
                class="ai-stage-drawer__timeline-arrow"
                :class="{ 'is-expanded': isDetailResultExpanded('expand') }"
              ></i>
            </button>
          </h3>
          <div v-show="isDetailResultExpanded('expand')" class="ai-stage-drawer__timeline-content">
            <ResultGallery
              v-if="expandResultGroups.length"
              :groups="expandResultGroups"
              variant="detail"
            />
            <el-empty v-else :image-size="72" description="暂无扩图结果" />
          </div>
        </section>
        <section
          class="ai-stage-drawer__timeline-item"
          :class="{ 'is-collapsed': !isDetailResultExpanded('confirmed') }"
        >
          <span class="ai-stage-drawer__timeline-dot"></span>
          <h3>
            <button
              type="button"
              class="ai-stage-drawer__timeline-title"
              :aria-expanded="isDetailResultExpanded('confirmed')"
              @click="toggleDetailResult('confirmed')"
            >
              <span>扩图确认结果</span>
              <i
                class="ai-stage-drawer__timeline-arrow"
                :class="{ 'is-expanded': isDetailResultExpanded('confirmed') }"
              ></i>
            </button>
          </h3>
          <div
            v-show="isDetailResultExpanded('confirmed')"
            class="ai-stage-drawer__timeline-content"
          >
            <ResultGallery
              v-if="expandConfirmedResultGroups.length"
              :groups="expandConfirmedResultGroups"
              variant="detail"
            />
            <el-empty v-else :image-size="72" description="暂无扩图确认结果" />
          </div>
        </section>

        <section
          class="ai-stage-drawer__timeline-item"
          :class="{ 'is-collapsed': !isDetailResultExpanded('finished') }"
        >
          <span class="ai-stage-drawer__timeline-dot"></span>
          <h3>
            <button
              type="button"
              class="ai-stage-drawer__timeline-title"
              :aria-expanded="isDetailResultExpanded('finished')"
              @click="toggleDetailResult('finished')"
            >
              <span>成品图结果</span>
              <i
                class="ai-stage-drawer__timeline-arrow"
                :class="{ 'is-expanded': isDetailResultExpanded('finished') }"
              ></i>
            </button>
          </h3>
          <div
            v-show="isDetailResultExpanded('finished')"
            class="ai-stage-drawer__timeline-content"
          >
            <div v-if="finishedResultGroups.length" class="ai-stage-drawer__finished-groups">
              <div
                v-for="group in finishedResultGroups"
                :key="group.uploadKey"
                class="ai-stage-drawer__finished-group"
              >
                <ResultGallery :groups="[group]" variant="detail">
                  <template v-if="!isUploadedToPlatformFinalState" #group-title-extra>
                    <button
                      type="button"
                      class="ai-stage-drawer__finished-upload"
                      :class="{ 'is-uploading': isFinishedGroupUploading(group.uploadKey) }"
                      :disabled="isFinishedGroupUploading(group.uploadKey)"
                      @click="triggerUpload('finished', group)"
                    >
                      <i
                        class="iconfont Root-tyicon icon-Root-tyjia ai-stage-drawer__finished-upload-icon"
                      ></i>
                      <span class="ai-stage-drawer__finished-upload-text">
                        {{ isFinishedGroupUploading(group.uploadKey) ? '上传中' : '点击上传' }}
                      </span>
                    </button>
                  </template>
                </ResultGallery>
              </div>
            </div>
            <el-empty v-else :image-size="72" description="暂无成品图" />
          </div>
        </section>
      </div>
    </div>

    <template v-if="showStageFooter" #footer>
      <template v-if="stage === 'original'">
        <template v-if="showOriginalResultPanel">
          <el-button @click="handleClose">取消</el-button>
          <el-button :disabled="isOriginalGenerating" @click="handleBackToOriginalConfig">
            返回上一步
          </el-button>
          <el-button
            :disabled="isOriginalGenerating"
            :loading="regenerateLoading"
            @click="handleRegenerate"
          >
            {{ regenerateLoading ? '生成中' : '再次生成' }}
          </el-button>
          <el-button
            type="primary"
            :disabled="isOriginalGenerating"
            :loading="switchExpandLoading"
            @click="handleSwitchToExpandStage"
          >
            扩图
          </el-button>
        </template>
        <template v-else>
          <el-button @click="handleClose">取消</el-button>
          <template v-if="showOriginalConfigActions">
            <el-button
              type="primary"
              :disabled="isOriginalGenerating || refineLoading"
              :loading="generateLoading"
              @click="handleGenerateImage"
            >
              开始生图
            </el-button>
          </template>
          <template v-else>
            <el-button
              :disabled="isOriginalGenerating || refineLoading"
              :loading="regenerateLoading"
              @click="handleRegenerate"
            >
              {{ regenerateLoading ? '生成中' : '再次生成' }}
            </el-button>
            <el-button
              type="primary"
              :disabled="isOriginalGenerating || refineLoading"
              :loading="switchExpandLoading"
              @click="handleSwitchToExpandStage"
            >
              扩图
            </el-button>
          </template>
        </template>
      </template>

      <template v-else-if="stage === 'expand'">
        <div v-if="isExpandSelecting" class="ai-stage-drawer__selection-footer">
          <div class="ai-stage-drawer__selection-summary">
            <el-checkbox
              :model-value="isAllExpandSelected"
              :indeterminate="isPartExpandSelected"
              :disabled="!selectableExpandImageCount"
              @change="handleToggleAllExpandImages"
            >
              全选
            </el-checkbox>
            <span></span>
            <em>已选择 {{ selectedExpandImageCount }} 项</em>
          </div>
          <div class="ai-stage-drawer__selection-actions">
            <el-button @click="handleCancelExpandSelection">取消</el-button>
            <el-button
              type="primary"
              :loading="expandSelectionSubmitting"
              @click="handleConfirmExpandSelection"
            >
              {{ expandSelectionConfirmText }}
            </el-button>
          </div>
        </div>
        <template v-else>
          <el-button @click="handleClose">取消</el-button>
          <el-button
            v-if="hasExpandResult"
            :disabled="expandLoading || isExpandGeneratingStatus(detail)"
            :loading="switchFinishedLoading"
            @click="handleSwitchToFinishedStage"
          >
            详情图库
          </el-button>
          <el-button
            v-if="hasExpandResult"
            :loading="expandLoading"
            @click="openExpandSelectionMode('reExpand')"
          >
            {{ expandLoading ? '扩图中...' : '重新扩图' }}
          </el-button>
          <el-button
            v-if="hasExpandResult"
            type="primary"
            :loading="downloadLoading"
            @click="openExpandSelectionMode('download')"
          >
            下载图片
          </el-button>
          <el-button v-else type="primary" :loading="expandLoading" @click="handleExpandImage">
            {{ expandLoading ? '扩图中...' : '开始扩图' }}
          </el-button>
        </template>
      </template>

      <template v-else>
        <template v-if="isUploadedToPlatformFinalState">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleJumpToAdPlatformMaterial">
            跳转至广告平台素材库
          </el-button>
        </template>
        <template v-else>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleUploadFinishedPlaceholder">本地成品图上传</el-button>
          <el-button
            v-if="detail.status === AI_IMAGE_STATUS.FINISHED_UPLOADED"
            type="primary"
            :loading="uploadToSystemSubmitting"
            @click="handleUploadToSystemPlaceholder"
          >
            上传系统素材库
          </el-button>
        </template>
      </template>
    </template>

    <el-dialog
      v-model="uploadToSystemConfirmVisible"
      append-to-body
      align-center
      class="ai-platform-upload-dialog custom-dialog"
      modal-class="ai-platform-upload-dialog__mask"
      width="384px"
      :close-on-click-modal="false"
      :close-on-press-escape="!uploadToSystemSubmitting"
      :show-close="false"
    >
      <div class="ai-platform-upload-dialog__content">
        <span class="ai-platform-upload-dialog__warning-icon"></span>
        <div class="ai-platform-upload-dialog__main">
          <div class="ai-platform-upload-dialog__header">
            <h3>上传提示</h3>
            <button
              type="button"
              class="ai-platform-upload-dialog__close"
              :disabled="uploadToSystemSubmitting"
              @click="uploadToSystemConfirmVisible = false"
            ></button>
          </div>
          <p>上传广告系统素材库后本次任务结果将归档并无法修改，请完全确认完成后再上传</p>
        </div>
      </div>
      <template #footer>
        <el-button
          :disabled="uploadToSystemSubmitting"
          @click="uploadToSystemConfirmVisible = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="uploadToSystemSubmitting"
          @click="handleConfirmUploadToSystem"
        >
          确定上传
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="uploadToSystemSuccessDialogVisible"
      append-to-body
      align-center
      class="ai-platform-success-dialog custom-dialog"
      modal-class="ai-platform-success-dialog__mask"
      width="384px"
      :show-close="false"
    >
      <div class="ai-platform-success-dialog__content">
        <button
          type="button"
          class="ai-platform-success-dialog__close"
          @click="uploadToSystemSuccessDialogVisible = false"
        ></button>
        <i class="Root-tyicon icon-Root-tychenggongzhuangtai ai-platform-success-dialog__icon"></i>
        <h3>上传成功</h3>
        <p>成品图已成功上传至广告平台素材库</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="handleJumpToAdPlatformMaterial">
          跳转至广告平台素材库
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="finishedUploadVisible"
      append-to-body
      align-center
      class="ai-finished-upload-dialog custom-dialog"
      modal-class="ai-finished-upload-dialog__mask"
      width="480px"
      :close-on-click-modal="false"
      :close-on-press-escape="!finishedUploadSubmitting"
      :show-close="!finishedUploadSubmitting"
      @close="resetFinishedUploadDialog"
    >
      <template #header>
        <span class="ai-finished-upload-dialog__title">本地成品图上传</span>
      </template>

      <div
        class="ai-finished-upload-dialog__drop"
        :class="{ 'is-disabled': finishedUploadSubmitting || finishedFolderParsing }"
        @click="triggerFinishedFolderSelect"
        @dragover.prevent
        @drop.prevent="handleFinishedUploadDrop"
      >
        <p>
          拖放到此处 /
          <span>点击上传</span>
        </p>
        <em>仅支持上传文件夹</em>
      </div>

      <div class="ai-finished-upload-dialog__tree">
        <template v-if="finishedFolderParsing">
          <div class="ai-finished-upload-dialog__loading">文件解析中...</div>
        </template>
        <el-tree
          v-else-if="finishedUploadTreeData.length"
          class="ai-finished-upload-dialog__el-tree"
          :data="finishedUploadTreeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ data }">
            <div class="ai-finished-upload-dialog__tree-node" :class="`is-${data.type}`">
              <el-icon class="ai-finished-upload-dialog__tree-icon">
                <Document v-if="data.type === 'file'" />
                <Folder v-else />
              </el-icon>
              <span class="ai-finished-upload-dialog__tree-label" :title="data.label">
                {{ data.label }}
              </span>
              <em v-if="data.count">{{ data.count }} 个文件</em>
              <!-- <em v-else-if="data.sizeSpec">{{ data.sizeSpec }}</em> -->
            </div>
          </template>
        </el-tree>
        <el-empty v-else :image-size="72" description="请选择包含编码组子文件夹的父文件夹" />
      </div>

      <template #footer>
        <el-button :disabled="finishedUploadSubmitting" @click="finishedUploadVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="finishedUploadSubmitting"
          :disabled="!finishedUploadFileCount"
          @click="handleConfirmFinishedFolderUpload"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </AiImageDrawerShell>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, ref, watch } from 'vue';
  import { Document, Folder } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { aiGenerateImageApi } from '@/api';
  import { postFn } from '@/config/axios/useAxios';
  import { useCache } from '@/hooks/web/useCache';
  import type { AiGenerateImageContracts } from '@/api';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import AiImageDrawerShell from './AiImageDrawerShell.vue';
  import ProductMaterialSection from '../components/gallery/ProductMaterialSection.vue';
  import ResultGallery from '../components/gallery/ResultGallery.vue';
  import {
    AI_IMAGE_STATUS,
    DEFAULT_CHANNEL_SIZE_MAPPING,
    MAX_FILE_SIZE_MB,
    getChannelSizeList,
  } from '../constants';
  import useTaskStageExpand from '../hooks/useTaskStageExpand';
  import useTaskStageFinished from '../hooks/useTaskStageFinished';
  import useTaskStageOriginal from '../hooks/useTaskStageOriginal';
  import useTaskFormOptions from '../hooks/useTaskFormOptions';
  import useOssUpload from '../hooks/useOssUpload';
  import {
    buildExpandResultGroups,
    formatExpandRequestSizeSpec,
    getExpandConfirmedResultGroups,
    getExpandResultImages,
    getOriginalConfirmedResultGroups,
    getOriginalGeneratedResultGroups,
    getOriginalResultImages,
    getResultImageKey,
    preserveOriginalResults,
  } from '../utils/resultImage';
  import {
    getDefaultDetailResultExpandedMap,
    isExpandGeneratedStatus,
    isExpandGeneratingStatus,
    isOriginalGeneratedStatus,
    isOriginalGeneratingStatus,
    isUploadedToSystemStatus,
    resolveTaskStage,
  } from '../utils/taskStage';
  import type { DetailResultPanelKey } from '../utils/taskStage';
  import type {
    AiImageOpenStage,
    AiImageStage,
    DrawerTaskOpenPayload,
    ProductImageItem,
    ProductMaterialGroup,
    ResultImageGroup,
    ResultImageItem,
  } from '../types';

  interface FinishedResultGroup extends ResultImageGroup {
    groupKey?: string;
    uploadKey: string;
  }

  type UploadTarget =
    | {
        type: 'product';
        group: ProductMaterialGroup;
      }
    | {
        type: 'finished';
        group: FinishedResultGroup;
      }
    | {
        type: 'original';
        group?: never;
      };

  type ExpandSelectionMode = '' | 'download' | 'reExpand';
  type FinishedImageParamWithFileName = AiGenerateImageContracts.FinishedImageParam & {
    fileName: string;
    fileSize: number;
  };

  interface LocalFinishedFolderFile {
    file: File;
    relativePath: string;
  }

  const aiRefineIcon = new URL('../assets/images/icon-ai.svg', import.meta.url).href;
  const imageAiPlaceholder = new URL('../assets/images/image-ai.svg', import.meta.url).href;
  const aiAvatarImage = new URL('../../../assets/images/logos/aiAvatar.png', import.meta.url).href;

  interface FinishedUploadFileNode extends LocalFinishedFolderFile {
    name: string;
    sizeSpec: string;
  }

  interface FinishedUploadFolderNode {
    folderName: string;
    uploadFolderName: string;
    files: FinishedUploadFileNode[];
  }

  interface FinishedUploadFolderTree {
    folderName: string;
    children: FinishedUploadFolderNode[];
  }

  interface FinishedUploadTreeNode {
    id: string;
    label: string;
    type: 'root' | 'folder' | 'file';
    children?: FinishedUploadTreeNode[];
    count?: number;
    sizeSpec?: string;
  }

  interface FileSystemEntry {
    isFile: boolean;
    isDirectory: boolean;
    name: string;
  }

  interface FileSystemFileEntry extends FileSystemEntry {
    file: (success: (file: File) => void, failure?: (error: DOMException) => void) => void;
  }

  interface FileSystemDirectoryReader {
    readEntries: (
      success: (entries: FileSystemEntry[]) => void,
      failure?: (error: DOMException) => void
    ) => void;
  }

  interface FileSystemDirectoryEntry extends FileSystemEntry {
    createReader: () => FileSystemDirectoryReader;
  }

  interface DataTransferItemWithEntry extends DataTransferItem {
    webkitGetAsEntry?: () => FileSystemEntry | null;
  }

  const KMS_IMAGE_API = `/api/luteos/fcc/center/client/queryFileListV2`;
  const FINISHED_UPLOAD_OSS_BATCH_SIZE = 10;
  const ORIGINAL_PROMPT_CACHE_KEY = 'aiGenImageOriginalPromptByTask';

  interface TaskStageDrawerRuntimeState {
    stage: AiImageStage;
    taskCode: string;
    detail: AiGenerateImageContracts.TaskDetailResp;
    detailLoading: boolean;
    productGroups: ProductMaterialGroup[];
    prompt: string;
    refinedPrompt: string;
    refineLoading: boolean;
    generateLoading: boolean;
    regenerateLoading: boolean;
    switchExpandLoading: boolean;
    switchFinishedLoading: boolean;
    expandLoading: boolean;
    downloadLoading: boolean;
    expandSelectionMode: ExpandSelectionMode;
    selectedExpandImageKeys: string[];
    finishedUploadingKeys: string[];
    finishedUploadVisible: boolean;
    finishedUploadSubmitting: boolean;
    finishedFolderParsing: boolean;
    finishedUploadFolderTree?: FinishedUploadFolderTree;
    uploadToSystemConfirmVisible: boolean;
    uploadToSystemSubmitting: boolean;
    uploadToSystemSuccess: boolean;
    uploadToSystemSuccessDialogVisible: boolean;
    adPlatformMaterialUrl: string;
    detailResultExpandedMap: Record<DetailResultPanelKey, boolean>;
    uploadTarget?: UploadTarget;
    localOriginalImageUrl: string;
    selectedOriginalImageKey: string;
    originalConfigOverride: boolean;
    currentOriginalBatchNo: string;
    currentOriginalInitialKeys: string[];
    lastGenerateImageList: AiGenerateImageContracts.GenerateImageBean[];
  }

  const createTaskStageDrawerRuntimeState = (
    overrides: Partial<TaskStageDrawerRuntimeState> = {}
  ): TaskStageDrawerRuntimeState => ({
    stage: 'original',
    taskCode: '',
    detail: {},
    detailLoading: false,
    productGroups: [],
    prompt: '',
    refinedPrompt: '',
    refineLoading: false,
    generateLoading: false,
    regenerateLoading: false,
    switchExpandLoading: false,
    switchFinishedLoading: false,
    expandLoading: false,
    downloadLoading: false,
    expandSelectionMode: '',
    selectedExpandImageKeys: [],
    finishedUploadingKeys: [],
    finishedUploadVisible: false,
    finishedUploadSubmitting: false,
    finishedFolderParsing: false,
    finishedUploadFolderTree: undefined,
    uploadToSystemConfirmVisible: false,
    uploadToSystemSubmitting: false,
    uploadToSystemSuccess: false,
    uploadToSystemSuccessDialogVisible: false,
    adPlatformMaterialUrl: '',
    detailResultExpandedMap: getDefaultDetailResultExpandedMap(),
    uploadTarget: undefined,
    localOriginalImageUrl: '',
    selectedOriginalImageKey: '',
    originalConfigOverride: false,
    currentOriginalBatchNo: '',
    currentOriginalInitialKeys: [],
    lastGenerateImageList: [],
    ...overrides,
  });

  const emit = defineEmits<{
    (e: 'success'): void;
    (e: 'close'): void;
  }>();

  const { formOptions, ensureOptions } = useTaskFormOptions();
  const { uploadToOss, validateFileExtension, validateFileSize } = useOssUpload();
  const { wsCache } = useCache('localStorage');

  const visible = ref(false);
  const stage = ref<AiImageStage>('original');
  const taskCode = ref('');
  const detail = ref<AiGenerateImageContracts.TaskDetailResp>({});
  const detailLoading = ref(false);
  const productGroups = ref<ProductMaterialGroup[]>([]);
  const prompt = ref('');
  const refinedPrompt = ref('');
  const refineLoading = ref(false);
  const generateLoading = ref(false);
  const regenerateLoading = ref(false);
  const switchExpandLoading = ref(false);
  const switchFinishedLoading = ref(false);
  const expandLoading = ref(false);
  const downloadLoading = ref(false);
  const expandSelectionMode = ref<ExpandSelectionMode>('');
  const selectedExpandImageKeys = ref<string[]>([]);
  const finishedUploadingKeys = ref<string[]>([]);
  const finishedUploadVisible = ref(false);
  const finishedUploadSubmitting = ref(false);
  const finishedFolderParsing = ref(false);
  const finishedUploadFolderTree = ref<FinishedUploadFolderTree>();
  const uploadToSystemConfirmVisible = ref(false);
  const uploadToSystemSubmitting = ref(false);
  const uploadToSystemSuccess = ref(false);
  const uploadToSystemSuccessDialogVisible = ref(false);
  const adPlatformMaterialUrl = ref('');
  const detailResultExpandedMap = ref<Record<DetailResultPanelKey, boolean>>(
    getDefaultDetailResultExpandedMap()
  );
  const fileInputRef = ref<HTMLInputElement>();
  const finishedFolderInputRef = ref<HTMLInputElement>();
  const uploadTarget = ref<UploadTarget>();
  const localOriginalImageUrl = ref('');
  const selectedOriginalImageKey = ref('');
  const originalConfigOverride = ref(false);
  const currentOriginalBatchNo = ref('');
  const currentOriginalInitialKeys = ref<string[]>([]);
  const lastGenerateImageList = ref<AiGenerateImageContracts.GenerateImageBean[]>([]);

  const getOriginalPromptCacheMap = () => {
    return (wsCache.get(ORIGINAL_PROMPT_CACHE_KEY) || {}) as Record<string, string>;
  };

  const cacheOriginalPrompt = (value: string, targetTaskCode = taskCode.value) => {
    if (!targetTaskCode) return;
    const cacheMap = { ...getOriginalPromptCacheMap() };
    if (!value.trim()) {
      delete cacheMap[targetTaskCode];
    } else {
      cacheMap[targetTaskCode] = value;
    }
    if (Object.keys(cacheMap).length) {
      wsCache.set(ORIGINAL_PROMPT_CACHE_KEY, cacheMap);
    } else {
      wsCache.delete(ORIGINAL_PROMPT_CACHE_KEY);
    }
  };

  const applyCachedOriginalPrompt = (targetTaskCode?: string) => {
    if (!targetTaskCode || prompt.value) return;
    prompt.value = getOriginalPromptCacheMap()[targetTaskCode] || '';
  };

  const handleOriginalPromptBlur = () => {
    cacheOriginalPrompt(prompt.value);
  };

  const applyTaskStageDrawerRuntimeState = (state: TaskStageDrawerRuntimeState) => {
    stage.value = state.stage;
    taskCode.value = state.taskCode;
    detail.value = state.detail;
    detailLoading.value = state.detailLoading;
    productGroups.value = state.productGroups;
    prompt.value = state.prompt;
    refinedPrompt.value = state.refinedPrompt;
    refineLoading.value = state.refineLoading;
    generateLoading.value = state.generateLoading;
    regenerateLoading.value = state.regenerateLoading;
    switchExpandLoading.value = state.switchExpandLoading;
    switchFinishedLoading.value = state.switchFinishedLoading;
    expandLoading.value = state.expandLoading;
    downloadLoading.value = state.downloadLoading;
    expandSelectionMode.value = state.expandSelectionMode;
    selectedExpandImageKeys.value = state.selectedExpandImageKeys;
    finishedUploadingKeys.value = state.finishedUploadingKeys;
    finishedUploadVisible.value = state.finishedUploadVisible;
    finishedUploadSubmitting.value = state.finishedUploadSubmitting;
    finishedFolderParsing.value = state.finishedFolderParsing;
    finishedUploadFolderTree.value = state.finishedUploadFolderTree;
    uploadToSystemConfirmVisible.value = state.uploadToSystemConfirmVisible;
    uploadToSystemSubmitting.value = state.uploadToSystemSubmitting;
    uploadToSystemSuccess.value = state.uploadToSystemSuccess;
    uploadToSystemSuccessDialogVisible.value = state.uploadToSystemSuccessDialogVisible;
    adPlatformMaterialUrl.value = state.adPlatformMaterialUrl;
    detailResultExpandedMap.value = state.detailResultExpandedMap;
    uploadTarget.value = state.uploadTarget;
    localOriginalImageUrl.value = state.localOriginalImageUrl;
    selectedOriginalImageKey.value = state.selectedOriginalImageKey;
    originalConfigOverride.value = state.originalConfigOverride;
    currentOriginalBatchNo.value = state.currentOriginalBatchNo;
    currentOriginalInitialKeys.value = state.currentOriginalInitialKeys;
    lastGenerateImageList.value = state.lastGenerateImageList;
  };

  const resetTaskStageDrawerRuntimeState = () => {
    stopAllPolling();
    applyTaskStageDrawerRuntimeState(createTaskStageDrawerRuntimeState());
    clearFinishedFolderInput();
  };

  const drawerTitle = computed(() => {
    if (stage.value === 'finished') return '详情图库';
    if (stage.value === 'expand') return showExpandResultPanel.value ? '扩图结果' : '扩图';
    if (showOriginalResultPanel.value) return '生图结果';
    if (originalConfigOverride.value) return '提示词配置';
    return hasOriginalResult.value ? '生成结果' : '提示词配置';
  });

  const hasOriginalResult = computed(() => {
    return Boolean(getOriginalResultImages(detail.value).length);
  });

  const hasExpandResult = computed(() => {
    return Boolean(
      getExpandResultImages(detail.value).length || isExpandGeneratedStatus(detail.value)
    );
  });

  const showExpandResultPanel = computed(() => {
    return hasExpandResult.value || expandLoading.value || isExpandGeneratingStatus(detail.value);
  });

  const generateActionLoading = computed(() => {
    return generateLoading.value || regenerateLoading.value;
  });

  const isOriginalGenerating = computed(() => {
    return generateActionLoading.value || isOriginalGeneratingStatus(detail.value);
  });

  const currentOriginalInitialKeySet = computed(() => {
    return new Set(currentOriginalInitialKeys.value);
  });

  const currentOriginalReturnedCount = computed(() => {
    if (!currentOriginalInitialKeys.value.length && !currentOriginalBatchNo.value) return 0;
    return originalResultImages.value.filter((image, index) => {
      if (currentOriginalBatchNo.value && image.batchNo === currentOriginalBatchNo.value) {
        return true;
      }
      return !currentOriginalInitialKeySet.value.has(getImageKey(image, index));
    }).length;
  });

  const showOriginalRegeneratePlaceholders = computed(() => {
    return isOriginalGenerating.value && originalResultImages.value.length > 0;
  });

  const originalRegeneratePlaceholderCount = computed(() => {
    return Math.max(0, 4 - currentOriginalReturnedCount.value);
  });

  const orderedOriginalResultImages = computed(() => {
    if (!currentOriginalInitialKeys.value.length && !currentOriginalBatchNo.value) {
      return originalResultImages.value;
    }
    const previousImages: ResultImageItem[] = [];
    const currentImages: ResultImageItem[] = [];
    originalResultImages.value.forEach((image, index) => {
      const isCurrentImage =
        (currentOriginalBatchNo.value && image.batchNo === currentOriginalBatchNo.value) ||
        !currentOriginalInitialKeySet.value.has(getImageKey(image, index));
      if (isCurrentImage) {
        currentImages.push(image);
      } else {
        previousImages.push(image);
      }
    });
    return [...previousImages, ...currentImages];
  });

  const originalPreviewList = computed(() => {
    return orderedOriginalResultImages.value
      .map((image) => image.imageUrl || '')
      .filter(Boolean) as string[];
  });

  const getOriginalPreviewIndex = (imageUrl?: string) => {
    return Math.max(
      0,
      originalPreviewList.value.findIndex((item) => item === imageUrl)
    );
  };

  const isOriginalGenerated = computed(() => {
    return isOriginalGeneratedStatus(detail.value);
  });

  const isOriginalResultStatus = computed(() => {
    if (isOriginalGenerating.value || isOriginalGenerated.value) return true;
    return typeof detail.value.status === 'undefined' && hasOriginalResult.value;
  });

  const showOriginalResultPanel = computed(() => {
    return (
      stage.value === 'original' && !originalConfigOverride.value && isOriginalResultStatus.value
    );
  });

  const showOriginalConfigActions = computed(() => {
    return originalConfigOverride.value || !hasOriginalResult.value;
  });

  const showStageFooter = computed(() => {
    if (stage.value === 'finished' && isUploadToSystemInProgress.value) {
      return false;
    }
    return !(
      stage.value === 'original' &&
      showOriginalResultPanel.value &&
      isOriginalGenerating.value &&
      !originalResultImages.value.length &&
      !regenerateLoading.value
    );
  });

  const hasMissingMaterial = computed(() => {
    return productGroups.value.some((group) => !group.images.length && !group.loading);
  });

  const materialNotice = computed(() => {
    return hasMissingMaterial.value
      ? '部分产品未匹配到 KMS 素材库素材，请手动添加图片'
      : '已匹配KMS素材库内相关产品素材';
  });

  const isUploadToSystemInProgress = computed(() => {
    return stage.value === 'finished' && uploadToSystemSubmitting.value;
  });

  const isUploadedToPlatformFinalState = computed(() => {
    return stage.value === 'finished' && isUploadedToSystemStatus(detail.value);
  });

  const expandSizeGroups = computed(() => {
    const mapping = formOptions.value.channelSizeMapping || DEFAULT_CHANNEL_SIZE_MAPPING;
    const channels = detail.value.bizInfo?.channelList?.length
      ? detail.value.bizInfo.channelList
      : Object.keys(mapping);
    return channels
      .map((channel) => ({
        channel,
        sizes: getChannelSizeList(channel, mapping, detail.value.bizInfo?.sizeList || []),
      }))
      .filter((group) => group.sizes.length);
  });

  const originalResultImages = computed<ResultImageItem[]>(() => {
    return getOriginalResultImages(detail.value);
  });

  const originalResultPrompt = computed(() => galleryPrompt.value);

  const originalGeneratedResultGroups = computed<ResultImageGroup[]>(() => {
    return getOriginalGeneratedResultGroups(detail.value);
  });

  const originalConfirmedResultGroups = computed<ResultImageGroup[]>(() => {
    return getOriginalConfirmedResultGroups(detail.value);
  });

  const expandResultGroups = computed<ResultImageGroup[]>(() => {
    return buildExpandResultGroups(getExpandResultImages(detail.value), expandSizeGroups.value);
  });

  const expandConfirmedResultGroups = computed<ResultImageGroup[]>(() => {
    return getExpandConfirmedResultGroups(detail.value);
  });

  const selectableExpandImages = computed<ResultImageItem[]>(() => {
    return getDisplayedExpandImages().filter((image) =>
      isSelectableExpandImage(image, expandSelectionMode.value)
    );
  });

  const selectableExpandImageCount = computed(() => selectableExpandImages.value.length);

  const selectedExpandImages = computed<ResultImageItem[]>(() => {
    const selectedKeySet = new Set(selectedExpandImageKeys.value);
    return selectableExpandImages.value.filter((image, index) => {
      return selectedKeySet.has(getImageKey(image, index));
    });
  });

  const selectedExpandImageCount = computed(() => selectedExpandImages.value.length);

  const isExpandSelecting = computed(() => {
    return Boolean(expandSelectionMode.value);
  });

  const isReExpandSelecting = computed(() => {
    return expandSelectionMode.value === 'reExpand';
  });

  const isExpandPlaceholderAnimating = computed(() => {
    return (
      stage.value === 'expand' && (expandLoading.value || isExpandGeneratingStatus(detail.value))
    );
  });

  const isAllExpandSelected = computed(() => {
    return (
      selectableExpandImageCount.value > 0 &&
      selectedExpandImageCount.value === selectableExpandImageCount.value
    );
  });

  const isPartExpandSelected = computed(() => {
    return (
      selectedExpandImageCount.value > 0 &&
      selectedExpandImageCount.value < selectableExpandImageCount.value
    );
  });

  const expandSelectionConfirmText = computed(() => {
    return expandSelectionMode.value === 'download' ? '下载' : '扩图';
  });

  const expandSelectionSubmitting = computed(() => {
    return expandSelectionMode.value === 'download' ? downloadLoading.value : expandLoading.value;
  });

  const finishedResultGroups = computed<FinishedResultGroup[]>(() => {
    const groups =
      detail.value.finishedImageGroupList ||
      (detail.value as { finishedImageGroups?: AiGenerateImageContracts.FinishedGroupBean[] })
        .finishedImageGroups ||
      [];
    return groups.map((group, index) => {
      const version =
        group.currentVersion || group.imageList?.find((image) => image.versionNo)?.versionNo || '-';
      const titleParts = [
        `${group.groupType || '视觉'}${group.groupIndex || index + 1}`,
        `V${version}`,
        group.language || '',
      ].filter(Boolean);
      const uploadKey = group.groupKey || group.displayCode || `${titleParts.join('-')}-${index}`;
      return {
        title: titleParts.join(' - '),
        groupKey: group.groupKey,
        uploadKey,
        images: (group.imageList || []) as ResultImageItem[],
      };
    });
  });

  const finishedUploadFileCount = computed(() => {
    return (
      finishedUploadFolderTree.value?.children.reduce((count, folder) => {
        return count + folder.files.length;
      }, 0) || 0
    );
  });

  const finishedUploadTreeData = computed<FinishedUploadTreeNode[]>(() => {
    const tree = finishedUploadFolderTree.value;
    if (!tree) return [];
    return [
      {
        id: `root-${tree.folderName}`,
        label: tree.folderName,
        type: 'root',
        count: finishedUploadFileCount.value,
        children: tree.children.map((folder) => ({
          id: `folder-${folder.uploadFolderName}`,
          label: folder.folderName,
          type: 'folder',
          count: folder.files.length,
          children: folder.files.map((file) => ({
            id: file.relativePath,
            label: file.name,
            type: 'file',
            sizeSpec: file.sizeSpec,
          })),
        })),
      },
    ];
  });

  const hasUploadableFinishedImages = computed(() => {
    return finishedResultGroups.value.some((group) =>
      group.images.some((image) => Boolean(image.imageCode || image.imageUrl || image.ossKey))
    );
  });

  const resetDetailResultExpandedMap = () => {
    detailResultExpandedMap.value = getDefaultDetailResultExpandedMap();
  };

  const isDetailResultExpanded = (key: DetailResultPanelKey) => {
    return detailResultExpandedMap.value[key];
  };

  const toggleDetailResult = (key: DetailResultPanelKey) => {
    detailResultExpandedMap.value[key] = !detailResultExpandedMap.value[key];
  };

  const galleryPrompt = computed(() => {
    return detail.value.bizInfo?.refinedPrompt || '';
  });

  const getImageKey = getResultImageKey;

  const getDisplayedExpandImages = () => {
    return expandResultGroups.value.flatMap((group) => group.images);
  };

  const isSelectableExpandImage = (image: ResultImageItem, mode: ExpandSelectionMode) => {
    if (mode === 'reExpand') {
      return Boolean(image.sizeSpec);
    }
    if (mode === 'download') {
      return !image.isPlaceholder && Boolean(image.imageUrl);
    }
    return false;
  };

  const normalizeFinishedFolderName = (name?: string) => {
    return (name || '').trim();
  };

  const normalizeFinishedFolderMatchKey = (name?: string) => {
    return normalizeFinishedFolderName(name)
      .replace(/[‐‑‒–—―－]/g, '-')
      .replace(/\s+/g, '')
      .toLowerCase();
  };

  const getExpandRequestSizeList = () => {
    const sizeList = detail.value.bizInfo?.sizeList?.length
      ? detail.value.bizInfo.sizeList
      : expandSizeGroups.value.flatMap((group) => group.sizes);
    return Array.from(new Set(sizeList.map(formatExpandRequestSizeSpec).filter(Boolean)));
  };

  const syncOriginalSelection = (data: AiGenerateImageContracts.TaskDetailResp) => {
    const images = getOriginalResultImages(data);
    const confirmedKey = data.originalConfirmedImage
      ? getImageKey(data.originalConfirmedImage)
      : '';
    const selectedImage =
      images.find((image, index) => getImageKey(image, index) === confirmedKey) || images[0];
    selectedOriginalImageKey.value = selectedImage ? getImageKey(selectedImage) : '';
    if (selectedImage && !data.originalConfirmedImage) {
      detail.value.originalConfirmedImage = selectedImage as AiGenerateImageContracts.ImageBean;
    }
  };

  const handleSelectOriginalResult = (image: ResultImageItem, index: number) => {
    selectedOriginalImageKey.value = getImageKey(image, index);
    detail.value.originalConfirmedImage = image as AiGenerateImageContracts.ImageBean;
  };

  const initializeTaskStageDrawerForOpen = (
    targetTaskCode: string,
    openStage: AiImageOpenStage,
    payload?: DrawerTaskOpenPayload
  ) => {
    stopAllPolling();
    clearFinishedFolderInput();
    applyTaskStageDrawerRuntimeState(
      createTaskStageDrawerRuntimeState({
        taskCode: targetTaskCode,
        stage: openStage === 'auto' ? resolveTaskStage(payload) : openStage,
      })
    );
    applyCachedOriginalPrompt(targetTaskCode);
    visible.value = true;
  };

  const open = async (
    payload: string | DrawerTaskOpenPayload,
    openStage: AiImageOpenStage = 'auto'
  ) => {
    const targetTaskCode = typeof payload === 'string' ? payload : payload.taskCode;
    if (!targetTaskCode) {
      ElMessage.warning('任务编码为空');
      return;
    }
    initializeTaskStageDrawerForOpen(
      targetTaskCode,
      openStage,
      typeof payload === 'string' ? undefined : payload
    );
    const [, latestDetail] = await Promise.all([ensureOptions(), queryTaskDetail()]);
    if (openStage === 'auto' && latestDetail) {
      stage.value = resolveTaskStage(latestDetail);
    }
    if (stage.value === 'finished') {
      resetDetailResultExpandedMap();
    }
    if (stage.value === 'original' && !showOriginalResultPanel.value) {
      await buildProductGroups();
    }
    startOriginalPollingIfNeeded();
    startExpandPollingIfNeeded();
  };

  const handleClose = () => {
    if (uploadToSystemSubmitting.value) return;
    visible.value = false;
  };

  const handleRefreshDetail = async () => {
    if (detailLoading.value) return;
    await queryTaskDetail();
  };

  const queryTaskDetail = async (
    options: { silent?: boolean; keepOriginalResults?: boolean } = {}
  ) => {
    if (!taskCode.value) return undefined;
    if (!options.silent) detailLoading.value = true;
    try {
      let res = await aiGenerateImageApi.luteosAiAdTaskQueryDetail({
        taskCode: taskCode.value,
      });
      if (options.keepOriginalResults) {
        res = preserveOriginalResults(detail.value, res);
      }
      detail.value = res;
      syncOriginalSelection(res);
      const detailGenerateImageList = getDetailGenerateImageList();
      if (detailGenerateImageList.length) {
        lastGenerateImageList.value = detailGenerateImageList;
      }
      applyCachedOriginalPrompt(taskCode.value);
      refinedPrompt.value = res.bizInfo?.refinedPrompt || refinedPrompt.value || '';
      return res;
    } finally {
      if (!options.silent) detailLoading.value = false;
    }
  };

  const buildProductGroups = async () => {
    const groups = (detail.value.spuList || []).map((spu) => ({
      spuCode: spu.spuCode || '',
      spuName: spu.spuName || '-',
      categoryName: spu.categoryName || '',
      fallbackImageUrl: spu.productImageUrl || '',
      title: [spu.categoryName, spu.spuName].filter(Boolean).join(' / ') || spu.spuCode || '-',
      pageNum: 1,
      pageSize: 8,
      total: 0,
      pages: 1,
      loading: false,
      uploading: false,
      searchAfterValuesByPage: {},
      selectedId: undefined,
      images: [],
    }));
    productGroups.value = groups;
    // for test
    // productGroups.value.push({
    //   categoryCode: 'CA111001001',
    //   categoryName: null,
    //   imageSource: 'local',
    //   productImageUrl: '',
    //   spuCode: 'SPU111168',
    //   spuName: '',
    //   title: '测试title',
    //   pageNum: 1,
    //   pageSize: 8,
    //   total: 0,
    //   pages: 1,
    //   loading: false,
    //   uploading: false,
    //   selectedId: undefined,
    //   images: [],
    // });
    await Promise.all(productGroups.value.map((group) => queryKmsProductImages(group, 1)));
  };

  const normalizeProductImageUrl = (url?: string) => (url || '').trim();

  const createDetailProductImage = (group: ProductMaterialGroup): ProductImageItem | undefined => {
    const imageUrl = normalizeProductImageUrl(group.fallbackImageUrl);
    if (!imageUrl) return undefined;
    return {
      id: `${group.spuCode}-detail`,
      imageUrl,
      ossKey: imageUrl,
      spuCode: group.spuCode,
      src: 'aigc',
      sourceType: 'detail',
      thumbnailUrl: imageUrl,
    };
  };

  const getLocalProductImage = (group: ProductMaterialGroup) => {
    return group.images.find((image) => image.sourceType === 'local');
  };

  const composeProductImages = (
    group: ProductMaterialGroup,
    kmsImages: ProductImageItem[]
  ): ProductImageItem[] => {
    const localImage = getLocalProductImage(group);
    const detailImage = createDetailProductImage(group);
    const detailImageUrl = normalizeProductImageUrl(detailImage?.imageUrl);
    const nextKmsImages = kmsImages.filter((image) => {
      const kmsImageUrl = normalizeProductImageUrl(image.thumbnailUrl || image.imageUrl);
      return !detailImageUrl || kmsImageUrl !== detailImageUrl;
    });
    return [localImage, detailImage, ...nextKmsImages].filter(Boolean) as ProductImageItem[];
  };

  const resolveProductSelectedId = (group: ProductMaterialGroup, previousSelectedId?: string) => {
    if (previousSelectedId && group.images.some((image) => image.id === previousSelectedId)) {
      return previousSelectedId;
    }
    const localImage = getLocalProductImage(group);
    if (localImage) return localImage.id;
    return group.images.find((image) => image.sourceType === 'detail')?.id;
  };

  const extractKmsImages = (
    data: any
  ): { images: ProductImageItem[]; total: number; searchAfterValues: unknown[] } => {
    const result = data?.result || data?.data || data || {};
    const list = result.fileClientList;
    const images = (Array.isArray(list) ? list : [])
      .map((item, index) => {
        const thumbnailUrl = item.thumbnailUrl || '';
        return {
          id: String(
            item.fileCode || item.imageCode || item.imageId || item.id || `${thumbnailUrl}-${index}`
          ),
          imageCode: item.imageCode || item.fileCode,
          imageId: item.imageId || item.id,
          imageUrl: thumbnailUrl,
          ossKey: thumbnailUrl,
          sizeSpec: item.sizeSpec || item.resolution,
          src: 'aigc',
          sourceType: 'aigc',
          thumbnailUrl,
        };
      })
      .filter((item) => !!item.imageUrl);
    return {
      images,
      total: Number(result.total || data?.total || images.length),
      searchAfterValues: Array.isArray(result.searchAfterValues) ? result.searchAfterValues : [],
    };
  };

  const queryKmsProductImages = async (group: ProductMaterialGroup, pageNum = 1) => {
    group.loading = true;
    const previousSelectedId = group.selectedId;
    const isFirstPage = pageNum <= 1;
    const searchAfterValues = isFirstPage ? undefined : group.searchAfterValuesByPage[pageNum];
    try {
      const res = await postFn({
        url: KMS_IMAGE_API,
        data: {
          scene: 3,
          pageNum,
          pageSize: group.pageSize,
          keyword: group.spuName, // group.spuName
          queryContent: 0,
          sortType: 0,
          extTypeList: ['jpg', 'jpeg', 'png', 'gif'],
          ...(searchAfterValues?.length ? { searchAfterValues } : {}),
          deepPage: false,
        },
      });
      const parsed = extractKmsImages(res);
      const nextSearchAfterValuesByPage = isFirstPage ? {} : { ...group.searchAfterValuesByPage };
      if (parsed.searchAfterValues.length) {
        nextSearchAfterValuesByPage[pageNum + 1] = parsed.searchAfterValues;
      } else {
        delete nextSearchAfterValuesByPage[pageNum + 1];
      }
      group.pageNum = pageNum;
      group.total = parsed.total;
      group.pages = Math.max(1, Math.ceil(parsed.total / group.pageSize));
      group.searchAfterValuesByPage = nextSearchAfterValuesByPage;
      group.images = composeProductImages(group, parsed.images);
      group.selectedId = resolveProductSelectedId(group, previousSelectedId);
    } catch {
      group.pageNum = pageNum;
      group.total = 0;
      group.pages = 1;
      group.images = composeProductImages(group, []);
      group.selectedId = resolveProductSelectedId(group, previousSelectedId);
    } finally {
      group.loading = false;
    }
  };

  const handleSelectProductImage = (group: ProductMaterialGroup, id: string) => {
    group.selectedId = id;
  };

  const normalizeGenerateImageList = (
    list?: AiGenerateImageContracts.GenerateImageBean[]
  ): AiGenerateImageContracts.GenerateImageBean[] => {
    return (Array.isArray(list) ? list : []).filter((image) => {
      return Boolean(image.imageCode || image.imageUrl || image.ossKey);
    });
  };

  const getDetailGenerateImageList = () => {
    const data = detail.value as AiGenerateImageContracts.TaskDetailResp & {
      generateImageList?: AiGenerateImageContracts.GenerateImageBean[];
    };
    return normalizeGenerateImageList(data.generateImageList);
  };

  const getSelectedGenerateImageList = () => {
    const selectedImages = productGroups.value
      .map((group) => {
        const selectedImage = group.images.find((image) => image.id === group.selectedId);
        if (!selectedImage) return undefined;
        const src = selectedImage.sourceType === 'local' ? 'local' : 'aigc';
        const isAigcImage = src === 'aigc';
        const imageUrl = isAigcImage
          ? selectedImage.thumbnailUrl || selectedImage.imageUrl
          : selectedImage.imageUrl;
        const ossKey = isAigcImage
          ? selectedImage.thumbnailUrl || selectedImage.imageUrl
          : selectedImage.ossKey;
        return {
          imageCode: selectedImage.imageCode,
          imageUrl,
          ossKey,
          spuCode: group.spuCode,
          src,
        };
      })
      .filter(Boolean) as AiGenerateImageContracts.GenerateImageBean[];
    return normalizeGenerateImageList(selectedImages);
  };

  const getGenerateImageList = () => {
    const selectedImages = getSelectedGenerateImageList();
    if (productGroups.value.length) {
      return selectedImages;
    }
    const detailImages = getDetailGenerateImageList();
    if (detailImages.length) return detailImages;
    if (lastGenerateImageList.value.length) return lastGenerateImageList.value;
    return [];
  };

  const handleBackToOriginalConfig = async () => {
    stage.value = 'original';
    originalConfigOverride.value = true;
    if (!productGroups.value.length) {
      await buildProductGroups();
    }
  };

  const triggerUpload = (
    type: UploadTarget['type'],
    group?: ProductMaterialGroup | FinishedResultGroup
  ) => {
    if (type === 'product' && group) {
      uploadTarget.value = { type, group: group as ProductMaterialGroup };
    } else if (type === 'finished' && group) {
      uploadTarget.value = { type, group: group as FinishedResultGroup };
    } else {
      uploadTarget.value = { type: 'original' };
    }
    fileInputRef.value?.click();
  };

  const uploadFileToOss = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      uploadToOss(file, {
        onProgress: () => undefined,
        onSuccess: resolve,
        onError: reject,
      });
    });
  };

  const getFileSizeSpec = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const imageUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        const sizeSpec = `${image.naturalWidth}x${image.naturalHeight}`;
        URL.revokeObjectURL(imageUrl);
        resolve(sizeSpec);
      };
      image.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error('读取图片尺寸失败'));
      };
      image.src = imageUrl;
    });
  };

  const isSupportedFinishedImageFile = (file: File) => {
    return /\.(png|jpe?g|webp)$/i.test(file.name);
  };

  const isValidFinishedImageSize = (file: File) => {
    return file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
  };

  const getTaskFinishedGroups = () => {
    return (
      detail.value.finishedImageGroupList ||
      (detail.value as { finishedImageGroups?: AiGenerateImageContracts.FinishedGroupBean[] })
        .finishedImageGroups ||
      []
    );
  };

  const getTaskFinishedDisplayCodeMap = () => {
    const map = new Map<string, string>();
    getTaskFinishedGroups().forEach((group) => {
      const displayCode = normalizeFinishedFolderName(group.displayCode);
      const matchKey = normalizeFinishedFolderMatchKey(displayCode);
      if (displayCode && matchKey && !map.has(matchKey)) {
        map.set(matchKey, displayCode);
      }
    });
    return map;
  };

  const clearFinishedFolderInput = () => {
    if (finishedFolderInputRef.value) {
      finishedFolderInputRef.value.value = '';
    }
  };

  const resetFinishedUploadDialog = () => {
    if (finishedUploadSubmitting.value) return;
    finishedUploadFolderTree.value = undefined;
    finishedFolderParsing.value = false;
    clearFinishedFolderInput();
  };

  const triggerFinishedFolderSelect = () => {
    if (finishedUploadSubmitting.value || finishedFolderParsing.value) return;
    finishedFolderInputRef.value?.click();
  };

  const getFinishedFileRelativePath = (file: File) => {
    return (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name;
  };

  const readFileEntry = (entry: FileSystemFileEntry) => {
    return new Promise<File>((resolve, reject) => {
      entry.file(resolve, reject);
    });
  };

  const readDirectoryEntries = (reader: FileSystemDirectoryReader) => {
    return new Promise<FileSystemEntry[]>((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  };

  const readAllDirectoryEntries = async (
    reader: FileSystemDirectoryReader,
    entries: FileSystemEntry[] = []
  ): Promise<FileSystemEntry[]> => {
    const batch = await readDirectoryEntries(reader);
    if (!batch.length) return entries;
    return readAllDirectoryEntries(reader, [...entries, ...batch]);
  };

  const readDroppedEntryFiles = async (
    entry: FileSystemEntry,
    parentPath = ''
  ): Promise<LocalFinishedFolderFile[]> => {
    const currentPath = parentPath ? `${parentPath}/${entry.name}` : entry.name;
    if (entry.isFile) {
      const file = await readFileEntry(entry as FileSystemFileEntry);
      return [{ file, relativePath: currentPath }];
    }
    if (!entry.isDirectory) return [];
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const entries = await readAllDirectoryEntries(reader);
    const files = await Promise.all(
      entries.map((item) => readDroppedEntryFiles(item, currentPath))
    );
    return files.flat();
  };

  const extractDroppedFinishedFiles = async (dataTransfer: DataTransfer) => {
    const items = Array.from(dataTransfer.items || []) as DataTransferItemWithEntry[];
    const entries = items
      .map((item) => item.webkitGetAsEntry?.())
      .filter(Boolean) as FileSystemEntry[];
    if (!entries.length) return [];
    const files = await Promise.all(entries.map((entry) => readDroppedEntryFiles(entry)));
    return files.flat();
  };

  const buildFinishedUploadFolderTree = async (localFiles: LocalFinishedFolderFile[]) => {
    const imageFiles = localFiles.filter((item) => isSupportedFinishedImageFile(item.file));
    if (!imageFiles.length) {
      ElMessage.warning('文件夹内未找到支持格式图片');
      return;
    }
    if (imageFiles.some((item) => !isValidFinishedImageSize(item.file))) {
      ElMessage.error(`图片大小不能超过 ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    const parsedFiles = imageFiles
      .map((item) => ({
        ...item,
        pathParts: item.relativePath.split('/').filter(Boolean),
      }))
      .filter((item) => item.pathParts.length >= 3);
    const rootNameSet = new Set(parsedFiles.map((item) => item.pathParts[0]));
    if (!parsedFiles.length || rootNameSet.size !== 1) {
      ElMessage.warning('请选择一个包含二级子文件夹的父文件夹');
      return;
    }

    const displayCodeMap = getTaskFinishedDisplayCodeMap();
    if (!displayCodeMap.size) {
      ElMessage.warning('当前任务暂无可匹配编码组');
      return;
    }

    const folderMap = new Map<
      string,
      { folderName: string; uploadFolderName: string; files: LocalFinishedFolderFile[] }
    >();
    parsedFiles.forEach((item) => {
      const folderName = normalizeFinishedFolderName(item.pathParts[1]);
      const uploadFolderName = displayCodeMap.get(normalizeFinishedFolderMatchKey(folderName));
      if (!uploadFolderName) return;
      const folder = folderMap.get(uploadFolderName) || {
        folderName,
        uploadFolderName,
        files: [],
      };
      folder.files.push({
        file: item.file,
        relativePath: item.relativePath,
      });
      folderMap.set(uploadFolderName, folder);
    });

    if (!folderMap.size) {
      finishedUploadFolderTree.value = undefined;
      ElMessage.warning('未匹配任何编码组');
      return;
    }

    const children = await Promise.all(
      Array.from(folderMap.values()).map(async (folder) => {
        const nodes = await Promise.all(
          folder.files.map(async (item) => ({
            file: item.file,
            relativePath: item.relativePath,
            name: item.file.name,
            sizeSpec: await getFileSizeSpec(item.file),
          }))
        );
        return {
          folderName: folder.folderName,
          uploadFolderName: folder.uploadFolderName,
          files: nodes,
        };
      })
    );

    finishedUploadFolderTree.value = {
      folderName: Array.from(rootNameSet)[0],
      children,
    };
  };

  const setFinishedUploadFiles = async (files: LocalFinishedFolderFile[]) => {
    if (finishedFolderParsing.value || finishedUploadSubmitting.value) return;
    finishedFolderParsing.value = true;
    finishedUploadFolderTree.value = undefined;
    try {
      await buildFinishedUploadFolderTree(files);
    } catch {
      finishedUploadFolderTree.value = undefined;
      ElMessage.error('读取图片尺寸失败，请检查图片文件');
    } finally {
      finishedFolderParsing.value = false;
      clearFinishedFolderInput();
    }
  };

  const handleFinishedFolderChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []).map((file) => ({
      file,
      relativePath: getFinishedFileRelativePath(file),
    }));
    await setFinishedUploadFiles(files);
  };

  const handleFinishedUploadDrop = async (event: DragEvent) => {
    if (finishedUploadSubmitting.value || finishedFolderParsing.value) return;
    if (!event.dataTransfer) return;
    const files = await extractDroppedFinishedFiles(event.dataTransfer);
    if (!files.length) {
      ElMessage.warning('仅支持拖放文件夹');
      return;
    }
    await setFinishedUploadFiles(files);
  };

  const uploadFinishedFolderFile = async (
    fileNode: FinishedUploadFileNode
  ): Promise<FinishedImageParamWithFileName> => {
    const ossKey = await uploadFileToOss(fileNode.file);
    return {
      ossKey,
      sizeSpec: fileNode.sizeSpec,
      fileName: fileNode.name,
      fileSize: fileNode.file.size,
    };
  };

  function splitIntoChunks<T>(list: T[], chunkSize: number) {
    const chunks: T[][] = [];
    for (let index = 0; index < list.length; index += chunkSize) {
      chunks.push(list.slice(index, index + chunkSize));
    }
    return chunks;
  }

  const uploadFinishedFolderTreeImages = async (folderTree: FinishedUploadFolderTree) => {
    const finishedImageBatchList = folderTree.children.map((folder) => ({
      folderName: folder.uploadFolderName,
      imageList: new Array<FinishedImageParamWithFileName | undefined>(folder.files.length),
    }));
    const pendingUploadList = folderTree.children.flatMap((folder, folderIndex) =>
      folder.files.map((fileNode, fileIndex) => ({
        folderIndex,
        fileIndex,
        fileNode,
      }))
    );

    await splitIntoChunks(pendingUploadList, FINISHED_UPLOAD_OSS_BATCH_SIZE).reduce(
      async (previousTask, uploadGroup) => {
        await previousTask;
        const uploadedList = await Promise.all(
          uploadGroup.map(async ({ folderIndex, fileIndex, fileNode }) => ({
            folderIndex,
            fileIndex,
            image: await uploadFinishedFolderFile(fileNode),
          }))
        );

        uploadedList.forEach(({ folderIndex, fileIndex, image }) => {
          finishedImageBatchList[folderIndex].imageList[fileIndex] = image;
        });
      },
      Promise.resolve()
    );

    return finishedImageBatchList.map((folder) => {
      const { folderName, imageList } = folder;
      if (imageList.some((item) => !item)) {
        throw new Error('存在未完成的图片上传');
      }
      return {
        folderName,
        imageList: imageList as FinishedImageParamWithFileName[],
      };
    });
  };

  const emitSuccess = () => {
    emit('success');
  };

  const {
    stopOriginalPolling,
    stopPromptPolling,
    startOriginalPollingIfNeeded,
    handleRefinePrompt,
    handleGenerateImage,
    handleRegenerate,
  } = useTaskStageOriginal({
    stage,
    visible,
    taskCode,
    detail,
    productGroups,
    prompt,
    refinedPrompt,
    refineLoading,
    generateLoading,
    regenerateLoading,
    originalConfigOverride,
    currentOriginalBatchNo,
    currentOriginalInitialKeys,
    lastGenerateImageList,
    queryTaskDetail,
    getGenerateImageList,
    normalizeGenerateImageList,
    cacheOriginalPrompt,
    emitSuccess,
  });

  const {
    stopExpandPolling,
    startExpandPollingIfNeeded,
    clearExpandSelection,
    openExpandSelectionMode,
    handleCancelExpandSelection,
    handleToggleExpandImage,
    handleToggleAllExpandImages,
    handleConfirmExpandSelection,
    handleExpandImage: handleExpandStageImage,
  } = useTaskStageExpand({
    stage,
    visible,
    taskCode,
    detail,
    expandLoading,
    downloadLoading,
    expandSelectionMode,
    selectedExpandImageKeys,
    selectableExpandImages,
    selectedExpandImages,
    hasExpandResult,
    getDisplayedExpandImages,
    queryTaskDetail,
    emitSuccess,
  });

  const {
    stopFinishedUploadPolling,
    stopUploadToSystemPolling,
    isFinishedGroupUploading,
    uploadFinishedImage,
    handleConfirmFinishedFolderUpload,
    handleUploadFinishedPlaceholder,
    handleUploadToSystemPlaceholder,
    handleConfirmUploadToSystem,
    handleJumpToAdPlatformMaterial,
  } = useTaskStageFinished({
    visible,
    taskCode,
    detail,
    finishedUploadingKeys,
    finishedUploadVisible,
    finishedUploadSubmitting,
    finishedUploadFolderTree,
    uploadToSystemConfirmVisible,
    uploadToSystemSubmitting,
    uploadToSystemSuccess,
    uploadToSystemSuccessDialogVisible,
    adPlatformMaterialUrl,
    finishedUploadFileCount,
    hasUploadableFinishedImages,
    queryTaskDetail,
    uploadFileToOss,
    getFileSizeSpec,
    uploadFinishedFolderTreeImages,
    resetFinishedUploadDialog,
    emitSuccess,
  });

  const stopAllPolling = () => {
    stopOriginalPolling();
    stopPromptPolling();
    stopExpandPolling();
    stopFinishedUploadPolling();
    stopUploadToSystemPolling();
  };

  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const target = uploadTarget.value;
    if (!file || !target || !taskCode.value) return;
    if (
      !validateFileExtension(file, ['.png', '.jpg', '.jpeg', '.webp']) ||
      !validateFileSize(file)
    ) {
      input.value = '';
      return;
    }

    if (target.type === 'finished') {
      try {
        await uploadFinishedImage(file, target.group);
      } finally {
        input.value = '';
        uploadTarget.value = undefined;
      }
      return;
    }

    if (target.type === 'product') target.group.uploading = true;
    try {
      const ossKey = await uploadFileToOss(file);
      const res = await aiGenerateImageApi.luteosAiAdImageUploadImage({
        taskCode: taskCode.value,
        ossKey,
        spuCode: target.type === 'product' ? target.group.spuCode : undefined,
        uploadType: target.type,
        src: 'local',
      });
      const imageUrl = res.imageUrl || URL.createObjectURL(file);
      if (target.type === 'product') {
        const image: ProductImageItem = {
          id: `${target.group.spuCode}-${Date.now()}`,
          imageUrl,
          ossKey: res.ossKey || ossKey,
          src: 'local',
          sourceType: 'local',
        };
        target.group.images = [
          image,
          ...target.group.images.filter((item) => item.sourceType !== 'local'),
        ];
        target.group.selectedId = image.id;
      } else {
        localOriginalImageUrl.value = imageUrl;
        detail.value.originalConfirmedImage = {
          imageUrl,
          ossKey: res.ossKey || ossKey,
        };
      }
      ElMessage.success('上传成功');
    } finally {
      if (target.type === 'product') target.group.uploading = false;
      input.value = '';
      uploadTarget.value = undefined;
    }
  };

  const handleExpandImage = () => {
    return handleExpandStageImage(getExpandRequestSizeList());
  };

  const switchStage = async (nextStage: AiImageStage) => {
    const confirmedImage = detail.value.originalConfirmedImage;
    clearExpandSelection();
    stage.value = nextStage;
    await queryTaskDetail();
    if (nextStage === 'expand' && confirmedImage?.imageUrl) {
      detail.value.originalConfirmedImage = confirmedImage;
    }
    if (nextStage === 'original' && !productGroups.value.length) {
      await buildProductGroups();
    }
    if (nextStage === 'finished') {
      resetDetailResultExpandedMap();
    }
    startOriginalPollingIfNeeded();
    startExpandPollingIfNeeded();
  };

  const handleSwitchToExpandStage = async () => {
    if (!taskCode.value || switchExpandLoading.value) return;
    const ossKey = detail.value.originalConfirmedImage?.ossKey;
    if (!ossKey) {
      ElMessage.warning('请选择需要扩图的原图');
      return;
    }
    switchExpandLoading.value = true;
    try {
      await aiGenerateImageApi.luteosAiAdTaskOperateTask({
        taskCode: taskCode.value,
        operateType: 'expend_image',
        ossKey,
      });
      await switchStage('expand');
      if (visible.value) emit('success');
    } finally {
      switchExpandLoading.value = false;
    }
  };

  const handleSwitchToFinishedStage = async () => {
    if (!taskCode.value || switchFinishedLoading.value) return;
    switchFinishedLoading.value = true;
    try {
      await aiGenerateImageApi.luteosAiAdTaskOperateTask({
        taskCode: taskCode.value,
        operateType: 'into_detail',
      });
      await switchStage('finished');
      if (visible.value) emit('success');
    } finally {
      switchFinishedLoading.value = false;
    }
  };

  watch(
    () => visible.value,
    (opened, previousOpened) => {
      if (!opened) {
        if (previousOpened) {
          emit('close');
        }
        resetTaskStageDrawerRuntimeState();
      }
    }
  );

  onBeforeUnmount(() => {
    stopAllPolling();
  });

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss" src="./TaskStageDrawer.scss"></style>

<style lang="scss" src="./TaskStageDrawer.global.scss"></style>
