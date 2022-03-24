<script setup>
import Base from '@/components/Base.vue';
import BigButton from '../components/BigButton.vue';
</script>
<template>
    <Base>
        <div class="content">
            <BigButton @click="toCompete()" fontSize="40px" title="Compete"/>
            <BigButton fontSize="40px" title="Spectate"/>
        </div>
    </Base>
</template>

<style lang="scss" scoped>
    .content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        div{
            margin-right: 50px;
            &:last-child{
                margin: 0;
            }
        }
    }
</style>

<script>
// import { defineComponent } from '@vue/composition-api'

export default{
    methods:{
        toCompete(){
            this.$router.push({ path: '/Compete' })
        }
    }
}
</script>
