<style lang="scss">
.chess {
    width: 100%;
    height: 100%;
    &-icon {
        width: 100%;
        height: 100%;
        transform: scale(130%);
        border: v-bind(chessStatus);
        /* overflow: hidden; */
        use {
            width: 150%;
            height: 150%;
        }
    }

    /* &:hover{
        transform: translate(20px, 20px);
        transition: all 1s linear;
    } */
}

.testBlock {
    background-color: #fff;
    width: 40px;
    height: 40px;
}
</style>

<template>
    <div class="chess" @click.stop="setActive" >
        <SvgIcon name="bcred" class="chess-icon" v-if="cType === 0" key="chess1"/>
        <SvgIcon name="bkred" class="chess-icon" v-else-if="cType === 1" key="chess2"/>
        <SvgIcon name="bcblue" class="chess-icon" v-else-if="cType === 2" key="chess3"/>
        <SvgIcon name="bkblue" class="chess-icon" v-else-if="cType === 3" key="chess4"/>
    </div>
        <!-- <div class="testBlock" @click="$emit('changeColor', '#666')" ></div> -->
        <!-- <div class="testBlock" @click="onColorChange(`lalala`)"></div> -->
        <!-- <div class="testBlock"></div> -->
</template>

<script setup>
import SvgIcon from '../SvgIcon.vue';
import { ref, onMounted,toRaw,computed } from 'vue';

const setActive = (e) => {
    // chessStatus.value = !chessStatus.value;
    emits(`setActive`,toRaw(props));
}

let chessStatus = computed(()=>{
   return props.chessActive ? '#fff 3px solid': 'unset';
});
const cType = ref(props.chessType);
const props = defineProps({
    chessType: {
        type: Number,
        required: true,
        default: 0,
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


const emits = defineEmits(['setActive']);


</script>
