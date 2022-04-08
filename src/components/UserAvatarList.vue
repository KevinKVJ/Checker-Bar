<template>
    <div class="imageSection">
            <SvgIcon :name="iconName" class="avatarImages"></SvgIcon>
        </div>
</template>

<style>
    .avatarImages{
       width: 65px;
       height: 65px;
   }
</style>


<script>
import SvgIcon from '@/components/SvgIcon.vue'
export default {

     props: {
        iconName: String,
    },

    components: {
            SvgIcon,
    }
};
</script>