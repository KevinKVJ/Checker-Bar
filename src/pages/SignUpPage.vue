<script setup>
import Base from '@/components/Base.vue';
import InputForm from '@/components/InputForm.vue';
import SmallButton from '../components/SmallButton.vue';
import SelectAvatar from '../components/SelectAvatar.vue';
</script>


<template>
    <Base>
       <div class="content">
           <div class="small-window">
               <h4> Welcome to the Checker Bar</h4>
               <p>Select Your Avatar</p>
               <SelectAvatar/>
               <InputForm />
               <SmallButton fontSize="15px" title="Sign Up"/>
               <SmallButton fontSize="15px" title="Login In"/>
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
        height: 500px;
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
    p{
        font-weight: 700;
    }
</style>