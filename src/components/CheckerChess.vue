<style lang="scss">
.chess {
    width: 100%;
    height: 100%;
    &-icon {
        width: 100%;
        height: 100%;
        transform: scale(130%);

        use {
            width: 150%;
            height: 150%;
        }
    }
}
</style>

<template>
    <div class="chess">
        <SvgIcon name="bcred" class="chess-icon" v-if="chessType === '0'"/>
        <SvgIcon name="bkred" class="chess-icon" v-else-if="chessType === '1'"/>
        <SvgIcon name="bcblue" class="chess-icon" v-else-if="chessType === '2'"/>
        <SvgIcon name="bkblue" class="chess-icon" v-else-if="chessType === '3'"/>
    </div>
</template>

<script setup>
import SvgIcon from './SvgIcon.vue';
import { defineProps } from 'vue';
// import { ref, onMounted } from 'vue';

const props = defineProps({
    chessType:{
        type:String,
        required: true,
        default: '0'
    }
});
console.log(props);
</script>
