<template>
        <div class="imageSection">
            <SvgIcon name="Avatar1" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar2" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar3" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar4" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar5" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar6" class="avatarImages"></SvgIcon>
        </div>
</template>

<style>
   .avatarImages{
       width: 50px;
       height: 50px;
       margin-bottom: 0px;
       padding-top:0px;
       padding-bottom: 0px;
   }
   .imageSection{
       display: flex;
       flex-direction: row;
       padding-bottom: 25px;
   }



</style>


<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
</script>

