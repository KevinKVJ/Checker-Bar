<script setup>

</script>


<template>
    <Base>
       <div class="content">
           <div class="small-window">
               <h4> Welcome to the Checker Bar</h4>
               <LoginForm v-model='value' v-model:passwordValue='passwordValue' />
               <SmallButton @click="loadUserInfo()" fontSize="18px" title="Sign Up"/>
               <SmallButton @click="toLoginPage()" fontSize="15px" title="Login"/>
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
        height: 400px;
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

<script>
import axios from 'axios';

import Base from '@/components/Base.vue';
import LoginForm from '@/components/LoginForm.vue';
import SmallButton from '@/components/SmallButton.vue';

export default{
    data(){
        return{
            value:'',
            passwordValue:'',
        };
    },
    components:{
        Base,
        LoginForm,
        SmallButton,
    },
    methods:{
        toLoginPage(){
            this.$router.push({ path: '/login' })
        },

        loadUserInfo(){
            console.log(this.value); 
            console.log(this.passwordValue);
            
            axios.post('/api/signInApi',{
                nickname: this.value,
                password: this.passwordValue
                // nickname: 'lalala9',
                // password: 'password2'
                // nickname: 'lalala99',
                // password: 'password22'
            })
            .then((res)=>{
                console.log(res.data);
                var code = res.data[Object.keys(res.data)[0]];
                console.log(code);
                if(code === 200){
                    alert("SignUp successful");
                }else{
                    alert("User already exists");
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>
