<script setup>

</script>
<template>
    <Base>
       <div class="content">
           <div class="small-window">
               <h4> Welcome to the Checker Bar</h4>
               <p>Select Your Avatar</p>
               <SelectAvatar @selectedAvatar="updateAvatar"/>
               <LoginForm  v-model='value' v-model:passwordValue='passwordValue' />
               <SmallButton @click="loadUserInfo()"  fontSize="18px" title="Login"/>
               <SmallButton @click="toSignUpPage()" fontSize="15px" title="Sign Up"/>
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
        height: 460px;
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

<script>
import axios from 'axios';

import Base from '@/components/Base.vue';
import SmallButton from '@/components/SmallButton.vue';

import LoginForm from '@/components/LoginForm.vue';
import SelectAvatar from './Components/SelectAvatar.vue';

export default{

    data(){
        return{
            value:'',
            passwordValue:'',
            activatedAvatar:'',
        };
    },

    components:{
        Base,
        LoginForm,
        SmallButton,
        SelectAvatar,
    },

    mounted(){
    },

    methods:{
        toSignUpPage(){
            this.$router.push({ path: '/signup' })
        },
        toHomePage(){
            this.$router.push({ path: '/homePage' })
        },
        updateAvatar(activeAvatar) {
            this.activatedAvatar = activeAvatar;
            console.log(this.activatedAvatar);
            sessionStorage.setItem('userAvatar', this.activatedAvatar);
        },
        loadUserInfo(){
            let userAvatar = sessionStorage.getItem("userAvatar");
            if (!!!userAvatar){
                alert("Please choose your avatar!")
            }else{
            console.log(this.value); 
            console.log(this.passwordValue);
            sessionStorage.setItem('username', this.value);
           
            axios.post('/api/loginApi',{
                nickname: this.value,
                password: this.passwordValue
            })
            // axios.post('/loginApi',{
            //     nickname: this.value,
            //     password: this.passwordValue
            // })
            .then((res)=>{
                console.log(res.data);
                //get login code and user id 
                var code = res.data[Object.keys(res.data)[0]];
                console.log(code);
                sessionStorage.setItem('userid', userId);

                if (code === 200){
                    var id = res.data[Object.keys(res.data)[2]];
                    var userId = id[Object.keys(id)[0]];
                    console.log(userId);
                    sessionStorage.setItem('userid', userId);
                    this.toHomePage();
                    alert("successfully login");
                }
                if (code === 400){
                    alert("cannot find the user");      
                }
                if(code === 401){
                    alert("password incorrect");
                }
                
            })
            .catch((error)=>{
                console.log(error);
            })
            
            }


            }


    }
}
</script>
