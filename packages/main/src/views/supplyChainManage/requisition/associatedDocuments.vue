<template>
    <!-- 关联单据 -->
    <addApply mode="associated" />
</template>

<script setup lang="ts" name="editAssociatedDocuments">
import { useRouter } from 'vue-router';
import addApply from './addApply.vue';

const router = useRouter();
</script>

<style scoped lang="scss"></style>