<template>
    <!-- <div class="selectSection"> -->
        <div class="imageSection">
            <SvgIcon name="Avatar1" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar2" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar3" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar4" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar5" class="avatarImages"></SvgIcon>
            <SvgIcon name="Avatar6" class="avatarImages"></SvgIcon>
           <!-- <img src="@/assets/icons/Avatar1.svg" alt="Avatar1" class="avatarImages">
           <img src="@/assets/icons/Avatar2.svg" alt="Avatar2" class="avatarImages">
           <img src="@/assets/icons/Avatar3.svg" alt="Avatar3" class="avatarImages">
           <img src="@/assets/icons/Avatar4.svg" alt="Avatar4" class="avatarImages">
           <img src="@/assets/icons/Avatar5.svg" alt="Avatar5" class="avatarImages">
           <img src="@/assets/icons/Avatar6.svg" alt="Avatar6" class="avatarImages"> -->
        </div>
    <!-- </div> -->
</template>

<style>
   .avatarImages{
       width: 50px;
       margin-bottom: 0px;
       padding-top:0px;
       padding-bottom: 0px;
   }
   .imageSection{
       display: flex;
       flex: row;
   }

</style>


<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
</script>

