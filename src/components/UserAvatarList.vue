<template>
    <div class="imageSection">
            <SvgIcon :name="iconName" class="avatarImages"></SvgIcon>
        </div>
</template>

<style scoped>
    .avatarImages{
       width: 56px;
       height: 56px;
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