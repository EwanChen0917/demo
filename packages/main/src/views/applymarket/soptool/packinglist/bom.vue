<template>
  <div class="packing-detail-page" v-loading="initLoading">
    <el-form ref="formRef" label-width="150px" label-position="left" scroll-to-error>
      <detailCard v-for="item in materialList" :key="item.materialCode" :title="item.materialName">
        <el-form-item
          :label="propertyType.propertyTypeDesc"
          v-for="propertyType in item.propertyTypeList"
          :key="propertyType.propertyTypeDesc"
        >
          <template v-if="+propertyType.selectType === 5">
            <el-form-item
              :label="child.propertyTypeDesc"
              :key="child.propertyCode"
              v-for="child in propertyType.children"
              label-width="100px"
            >
              <template :key="property.propertyCode" v-for="property in child.propertyList">
                <div class="property-border">
                  <el-tag closable :disable-transitions="false" @close="handleClose(property)">
                    {{ property.propertyName }}
                  </el-tag>
                  <ImagePreview
                    v-if="property.image"
                    :image="property.image"
                    @preview="
                      (images, index) => {
                        previewFile(images);
                      }
                    "
                  />
                  <!-- <div
                    class="attach-file"
                    v-if="property.attachmentName"
                    @click="previewFile(property.attachmentUrl, property.attachmentName)"
                  >
                    <OverflowTooltip :content="property.attachmentName" :line="1" />
                  </div> -->
                </div>
              </template>
              <el-button
                type="primary"
                :class="['add-btn', propertyType.propertyList?.length ? 'mt' : '']"
                @click="handleAddBom(child, item)"
              >
                +
              </el-button>
            </el-form-item>
          </template>
          <template v-else>
            <template :key="property.propertyCode" v-for="property in propertyType.propertyList">
              <div class="property-border">
                <el-tag closable :disable-transitions="false" @close="handleClose(property)">
                  {{ property.propertyName }}
                </el-tag>
                <ImagePreview
                  v-if="property.image"
                  :image="property.image"
                  @preview="
                    (images, index) => {
                      previewFile(images);
                    }
                  "
                />
                <!-- <div
                  class="attach-file"
                  v-if="property.attachmentName"
                  @click="previewFile(property.attachmentUrl, property.attachmentName)"
                >
                  <OverflowTooltip :content="property.attachmentName" :line="1" />
                </div> -->
              </div>
            </template>
            <el-button
              type="primary"
              :class="['add-btn', propertyType.propertyList?.length ? 'mt' : '']"
              @click="handleAddBom(propertyType, item)"
            >
              +
            </el-button>
          </template>
        </el-form-item>
        <el-form-item label="是否支持上传文件" prop="uploadFlag">
          <el-radio-group v-model="item.uploadFlag" @input="handleUploadChange(item)">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </detailCard>
    </el-form>
  </div>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    @close="previewVisible = false"
  />
  <AddBomModal
    v-if="addBomModalVisible"
    :visible="addBomModalVisible"
    :bomInfo="bomInfo"
    @close-modal="handleBomClose"
  />
</template>

<script setup lang="ts" name="packingbom">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { sopApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import ImagePreview from './components/imagePreview.vue';
  import AddBomModal from './components/addBomModal.vue';

  const initLoading = ref(false);

  const materialList = ref<object>([]);
  const initData = async () => {
    initLoading.value = true;
    sopApi
      .luteosSopQueryMaterialDetailList({})
      .then((res) => {
        materialList.value = res.materialDetailList || [];
      })
      .finally(() => {
        initLoading.value = false;
      });
  };
  const handleClose = async (property) => {
    const isConfirmed = await swal.delConfirm();
    if (!isConfirmed) return;
    await sopApi.luteosSopOperateMaterialProperty({
      materialCode: property.materialCode,
      operateType: 'delete',
      propertyCode: property.propertyCode,
      propertyType: property.propertyType,
    });
    ElMessage.success('删除成功');
    initData();
  };

  const fileUrl = ref<string>('');
  const fileName = ref<string>('');
  const previewVisible = ref<boolean>(false);
  const previewFile = async (url, name) => {
    // 文件地址
    fileUrl.value = url;
    fileName.value = name || url;
    previewVisible.value = true;
  };

  const addBomModalVisible = ref<boolean>(false);
  const bomInfo = ref<object>({});
  const handleAddBom = (propertyType, item) => {
    bomInfo.value = {
      title: item.materialName,
      materialCode: item.materialCode,
      subtitle: propertyType.propertyTypeDesc,
      parentCode: propertyType.parentCode,
      propertyType: propertyType.propertyType,
      required: propertyType.required,
      selectType: propertyType.selectType,
    };
    addBomModalVisible.value = true;
  };

  const handleBomClose = (r) => {
    if (r === 'reload') {
      initData();
    }
    addBomModalVisible.value = false;
  };

  const handleUploadChange = async (item) => {
    await sopApi.luteosSopOperateMaterialProperty({
      materialCode: item.materialCode,
      operateType: 'enable_disable',
      uploadFlag: item.uploadFlag === 1 ? 0 : 1,
    });
    ElMessage.success('操作成功');
  };

  onMounted(async () => {
    await initData();
  });
</script>

<style scoped lang="scss">
  .property-border {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ebeef5;
    margin-right: 20px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
  .attach-file {
    width: 100px;
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
  }
  .add-btn {
    // background: #3e97ff;
    color: #ffffff;
    width: 25px;
    height: 25px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  :global(.keen-ui .el-button.add-btn span) {
    line-height: inherit !important;
  }
  .mt {
    margin-top: -15px;
  }
</style>
