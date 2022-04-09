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
                <BigButton @click="toHomePage()" fontSize="18px" title="Home"/>
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
        height:6px;
        background: black;
    }
    h4{
        font-size: 23px;
        font-weight: bolder;
        margin-top:10px;
        margin-bottom: 20px;
    }
    p{
        margin-bottom:0px;
        margin-top:18px;
    }
</style>



<script>
export default{

mounted(){
        let username = sessionStorage.getItem("username");
        console.log(username);
    },

    methods:{
        toHomePage(){
            this.$router.push({ path: '/homePage' })
        }
    }
}
</script>
