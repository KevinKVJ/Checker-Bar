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
        padding: 30px;
        background-color: #fff;

        border-radius: 5px;
    }

    .title{
        font-weight: 600;
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