<template>
<div v-if="props.navList.length">
   <ul class="nav nav-tabs nav-line-tabs mb-5 fs-6 nav-line-tabs-2x" v-if="props.inline">
        <li class="nav-item" v-for="(nav, index) in props.navList" :key="index" @click="handleTabClick(index, nav)">
            <span :class="['nav-link', curIndex === index ? 'active' : '']" data-bs-toggle="tab">{{nav.desc}}</span>
        </li>
    </ul>

    <ul class="nav nav-tabs nav-pills flex-row border-0 flex-md-column me-5 mb-3 mb-md-0 fs-6 min-w-lg-200px" v-else :style="{width: props.width}">
        <li 
            class="nav-item w-100 me-0 mb-md-2"  
            v-for="(nav, index) in props.navList" 
            :key="index"  
            @mouseenter="mouseenter(index)" 
            @mouseleave="mouseleave(index)" 
            @click="handleTabClick(index, nav)">
            <span 
                :class="['nav-link', 'w-100', 'btn', 'btn-flex', 
                curIndex === index ? 'btn-active-light-success' : '', 
                mouseIndex === index ? 'btn-active-light-success' : '' ]" 
                data-bs-toggle="tab">
                <span class="d-flex flex-column align-items-start">
                    <span class="fs-4 fw-bold">{{nav.desc}}</span>
                </span>
            </span>
        </li>
    </ul>
</div>
</template>

<script setup name="Tab" lang="ts">
import { ref, computed, watch, onMounted, reactive, toRefs} from 'vue';

    const props = defineProps({
        // 水平
        inline: {
            type: Boolean,
            default: () => true
        },
        // tab信息
        navList: {
            type: Array,
            default: () => []
        },
        // 激活的index
        activeIndex: {
            type: Number,
            default: () => 1
        },
        width: {
            type: String,
            default: () => '100px'
        }
    });

    
    const state = reactive<{
        curIndex: any;
        mouseIndex: any;
    }>({
        curIndex: 0,
        mouseIndex: -1
    });
    const {
        curIndex,
        mouseIndex
    } = toRefs(state);

   
   const emit = defineEmits<{
    (event: 'tabToggle', val: Number, data: any);
  }>();

    watch(
        () => props.activeIndex,
        (val: number) => {
        curIndex.value = val
        }
    );

      // 设置input class
    let getTabClass = computed(() => {
        let tab_class_arr = ['nav','nav-tabs', 'fs-6']
        if (props.inline) {
           tab_class_arr.push('nav-line-tabs', 'nav-line-tabs-2x')
        } else {

        }
       
        return tab_class_arr

    });
    // tab点击
    const handleTabClick = (index, nav) => {
        curIndex.value = index
        emit('tabToggle', index + 1, nav)
    }

    // 鼠标移入
    const mouseenter = (index) => {
        mouseIndex.value = index
    }

    // 鼠标移出
    const mouseleave = (index) => {
        mouseIndex.value = -1
    }

</script>

<style scoped>
.nav-item {
   cursor: pointer;
}

.btn-active-light-success {
    background: #E8FFF3 !important;
    color: #50CD89 !important;
}
</style>
