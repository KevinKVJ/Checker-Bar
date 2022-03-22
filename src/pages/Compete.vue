<script setup>
import Base from '@/components/Base.vue';
import BigButton from '../components/BigButton.vue';

</script>
<template>
    <Base>
        <div class="content">
            <div class="abc">
                <div class="contentOne">
                    <BigButton id="button_one" fontSize="90px" title="Play!"/>
                </div>
                <div class="contentTwo">
                    <BigButton id="button_two" fontSize="20px" title="Profile"/>
                    <BigButton id="button_two" fontSize="20px" title="Records"/>
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