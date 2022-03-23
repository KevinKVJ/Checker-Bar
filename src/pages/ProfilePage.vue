<script setup>
import Base from '@/components/Base.vue';
import SelectAvatar from '../components/SelectAvatar.vue';
import BigButton from '../components/BigButton.vue';
import ChangeUsernameForm from '../components/ChangeUsernameForm.vue';

</script>


<template>
    <Base>
        <div class="content">
            <div class="main">
                <h4>Alice's Profile</h4>
                <div class="divide-line"></div>
                <p>Change Avatar</p>
                <SelectAvatar />
                <ChangeUsernameForm />
            </div>
            <div class="button">
                <BigButton fontSize="18px" title="Home"/>
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
        flex-direction: column;
    }

    .main{
        width:350px;
        height: 420px;
        background: white;
        display: flex;
        align-items: center; 
        justify-content: center;
        flex-direction: column;
        margin-bottom: 5px;
    }
    .divide-line{
        width:350px;
        height:3px;
        background: black;
    }
    h4{
        font-size: 23px;
        font-weight: bolder;
    }



</style>

