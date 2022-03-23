<template>
    <div class="wrapper">
        <div class="container">
            <div class="title" :style="bigButtonStyle">{{title}}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container{
        display: inline-block;
        padding: 6px 12px;
        margin-top: 15px;
        background-color: rgb(235, 207, 157);
        border-radius: 5px;
    }

    .title{
        font-weight: 500;
    }
</style>

<script setup>
import {reactive} from 'vue'

const props = defineProps({
    /* 
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: value => {
        return value >= 0
      }
    } */
  title: {
      type: String,
      default: "Hello",
  },
  fontSize:{
      type: String,
      default: "20px"
  },
})

const bigButtonStyle = reactive({
    fontSize : props.fontSize
})

</script>