<script setup>
import Base from '@/components/Base.vue';
import BigButton from '../components/BigButton.vue';

</script>
<template>
    <Base>
        <div class="content">
            <div class="abc">
                <div class="contentOne">
                    <BigButton @click="toSelectModePage()" id="button_one" fontSize="90px" title="Play!"/>
                </div>
                <div class="contentTwo">
                    <BigButton @click="toProfilePage()" id="button_two" fontSize="18px" title="Profile"/>
                    <BigButton @click="toRecordsPage()" id="button_two" fontSize="18px" title="Records"/>
                </div>
            </div>
        </div>
    </Base>
</template>

<style lang="scss" scoped>
   .content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
   }
   .contentOne{
       display: block;
       margin-bottom: 10px;
   }
   .contentTwo{
        display: flex;
        justify-content: center;
        align-items: center;

        div{
            margin-right: 20px;
            &:last-child{
                margin: 0;
            }
        }
   }
</style>

<script>
export default{
    methods:{
        toSelectModePage(){
            this.$router.push({ path: '/selectMode' })
        },
        toProfilePage(){
            this.$router.push({ path: '/profile' })
        },
        toRecordsPage(){
            this.$router.push({ path: '/records' })
        }
    }
    
}
</script>
