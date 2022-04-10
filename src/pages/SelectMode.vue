<script setup></script>
<template>
    <Base>
        <div class="content">
            <BigButton @click="this.$router.push({ path: '/compete' })" fontSize="40px" title="Compete" />
            <BigButton @click="this.$router.push({ path: '/spectate' })" fontSize="40px" title="Spectate" />
        </div>
    </Base>
</template>

<style lang="scss" scoped>
.content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        margin-right: 50px;
        &:last-child {
            margin: 0;
        }
    }
}
@media (max-width: 700px){
    .content {
        display: flex;
        flex-direction: column;
        div {
            margin: 0px;
            margin-bottom: 25px;
        }
    } 
}
</style>

<script>
import Base from '@/components/Base.vue';
import BigButton from '../components/BigButton.vue';

export default {
    components: {
        Base,
        BigButton,
    },
};
</script>
