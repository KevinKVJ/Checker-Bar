<style>
.checkerGrid{
    width: 100%;
    height: 100%;
    background-color: v-bind(bkgc);
    user-select: none;
}
</style>

<template>
    <div class="checkerGrid" @click="activeG && emits('emitGridCoord',[row,column])">
        <slot></slot>
    </div>
</template>

<script setup>
import { useSlots,computed } from 'vue'
// const slot = useSlots();

const emits = defineEmits(['emitGridCoord'])
const props = defineProps({
    gridType:{
        type: Boolean,
        required: true,
        default:false
    },
    activeG:{
        type: Boolean,
        required: true,
        default:false
    },
    row:{
        type:Number,
        required: true,
    },
    column:{
        type:Number,
        required: true,
    }
})

const bkgc = computed(() => {
    const {gridType,activeG} = props;

    if(gridType){
        //Dark Grid
        if(activeG){
            return "rgba(141, 242, 70, 0.57)";
        }else{
            return "#666"
        }
    }else{
        // White Grid
            return "#fff"
    }
})

</script>