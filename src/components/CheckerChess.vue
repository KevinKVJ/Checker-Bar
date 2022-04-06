<style lang="scss">
.chess {
    width: 100%;
    height: 100%;
    &-icon {
        width: 100%;
        height: 100%;
        transform: scale(130%);
        /* border: #fff 3px solid; */
        /* box-sizing: content-box; */
        border: v-bind(chessStatus);

        use {
            width: 150%;
            height: 150%;
        }
    }
}

.testBlock {
    background-color: #fff;
    width: 40px;
    height: 40px;
}
</style>

<template>
    <div class="chess" @click.stop="setActive" >
        <SvgIcon name="bcred" class="chess-icon" v-if="cType === '0'"/>
        <SvgIcon name="bkred" class="chess-icon" v-else-if="cType === '1'"/>
        <SvgIcon name="bcblue" class="chess-icon" v-else-if="cType === '2'"/>
        <SvgIcon name="bkblue" class="chess-icon" v-else-if="cType === '3'"/>
    </div>
        <!-- <div class="testBlock" @click="$emit('changeColor', '#666')" ></div> -->
        <!-- <div class="testBlock" @click="onColorChange(`lalala`)"></div> -->
        <!-- <div class="testBlock"></div> -->
</template>

<script setup>
import SvgIcon from './SvgIcon.vue';
import { ref, onMounted,toRaw,computed } from 'vue';

const setActive = (e) => {
    // chessStatus.value = !chessStatus.value;
    emits(`changeColor`,toRaw(props));
}

let chessStatus = computed(()=>{
   return props.chessActive ? '#fff 3px solid': 'unset';
});
const cType = ref(props.chessType);
const props = defineProps({
    chessType: {
        type: String,
        required: true,
        default: '0',
    },
    csIndex:{
        type: Number,
    },
    row:{
        type: Number,
    },
    column:{
        type: Number,
    },
    chessActive:{
        type: Boolean,
    }
});


const emits = defineEmits(['changeColor']);


</script>
