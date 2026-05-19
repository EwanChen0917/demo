<template>
  <div>
    <router-link to="/operationManage/productExpireConfig" />
    <div class="box-card">
      <div class="card-header">
        <span>营销</span>
      </div>
      <div class="approve-wrapper">
        <dl class="approve-item" @click="toPage('appmateriallist')">
          <dt>
            <el-image style="width: 60px; height: 60px" :src="image1" fit="fill" />
          </dt>
          <dd>营销位配置</dd>
        </dl>
        <dl class="approve-item" @click="toPage('productExpireConfig')">
          <dt>
            <el-image style="width: 60px; height: 60px" :src="image2" fit="fill" />
          </dt>
          <dd>商品到期推荐策略</dd>
        </dl>
      </div>
    </div>
    <div class="box-card">
      <div class="card-header">
        <span>用户任务</span>
      </div>

      <div class="approve-wrapper">
        <dl class="approve-item" @click="toPage('parcelCardTask')">
          <dt>
            <el-image style="width: 60px; height: 60px" :src="image3" fit="fill" />
          </dt>
          <dd>包装卡任务</dd>
        </dl>
        <dl class="approve-item" @click="toPage('trialproducts')">
          <dt>
            <el-image style="width: 60px; height: 60px" :src="image4" fit="fill" />
          </dt>
          <dd>产品试用</dd>
        </dl>
        <!-- <dl class="approve-item" @click="toPage('productExpireConfig')">
          <dt>
            <el-image style="width: 60px; height: 60px" :src="image4" fit="fill" />
          </dt>
          <dd>日常任务</dd>
        </dl> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="operationManage">
import { useRouter } from 'vue-router';
  import image1 from './images/0.png';
  import image2 from './images/1.png';
  import image3 from './images/2.png';
  import image4 from './images/3.png';

  const router = useRouter();
  const toPage = (routerName: string) => {
    router.push({
      name: routerName,
    });
  };
</script>

<style scoped lang="scss">
  .box-card {
    margin-top: 20px;
    padding: 40px 32px;
    background-color: #fff;
    color: #63666a;
    .card-header {
      font-size: 16px;
      line-height: 22px;
      font-weight: 500;
      margin-bottom: 24px;
    }
    .approve-wrapper {
      display: flex;
      gap: 36px;
      flex-wrap: wrap;
      .approve-item {
        text-align: center;
        cursor: pointer;
        width: 70px;
        dt {
          transition: all 0.25s ease-in-out;
        }
        &:hover {
          dt {
            transform: scale(1.1);
          }
        }
        dd {
          margin-top: 19px;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
</style>
