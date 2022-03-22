<script setup>
import Base from '@/components/Base.vue';
import InputForm from '@/components/InputForm.vue';
import SmallButton from '../components/SmallButton.vue';
</script>
<template>
    <Base>
       <div class="content">
           <div class="small-window">
               <h4> Welcome to the Checker Bar</h4>
               <InputForm />
               <SmallButton fontSize="15px" title="Login In"/>
               <SmallButton fontSize="15px" title="Sign Up"/>
           </div>
        </div>
    </Base>

</template>

<style>
    .content{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .small-window{
        width:350px;
        height: 320px;
        background: white;
        display: flex;
        align-items: center; 
        justify-content: center;
        flex-direction: column;
    }
    h4{
        font-size: 23px;
        font-weight: bolder;
    }



</style>