<template>
    <Base>
        <div class="content">
            <div class="main">
                <h4>{{ titleName }}'s Profile</h4>
                <div class="divide-line"></div>
                <!-- <SelectAvatar /> -->
                <ChangeUsernameForm v-model='value' v-model:passwordValue='passwordValue' />
                <SmallButton @click="updateUserInfo()" fontSize="18px" title="Submit"/>
            </div>
            <div class="button">
                <BigButton @click="toHomePage()" fontSize="18px" title="Home" />
            </div>
        </div>
    </Base>
</template>

<style scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
}

.main {
    width: 300px;
    height: 350px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5px;
}
.divide-line {
    width: 300px;
    height: 3px;
    background: black;
    margin-bottom: 40px;
}
h4 {
    font-size: 23px;
    font-weight: bolder;
    margin-top: 10px;
    margin-bottom: 20px;
}
p {
    margin-bottom: 0px;
    margin-top: 18px;
}
</style>

<script>
import Base from '@/components/Base.vue';
import BigButton from '@/components/BigButton.vue';
import ChangeUsernameForm from './Components/ChangeUsernameForm.vue';
import SmallButton from '@/components/SmallButton.vue';
import axios from 'axios';

export default {
    data() {
        return {
            titleName: 'default',
            value:'',
            passwordValue:'',
            userid:'',
        };
    },
    components:{
        Base,
        BigButton,
        ChangeUsernameForm,
        SmallButton,
    },
    mounted() {
        let username = sessionStorage.getItem('username');
        console.log(username);
        this.titleName = username;
        this.userid = sessionStorage.getItem('userid');
        console.log(this.userid);
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },

        updateUserInfo(){
            console.log(this.value); 
            console.log(this.passwordValue);
            console.log(this.userid);

            axios.post('/api/modifyUserInfoApi',{
                nickname: this.value,
                password: this.passwordValue,
                id: this.userid,
            })
            .then((res) => {
                console.log(res.data);
                var code = res.data[Object.keys(res.data)[0]];
                console.log(code);
                if(code === 200){
                    alert("SignUp successful");
                    sessionStorage.setItem('username', this.value);
                    window.location.reload();
                }else{
                    alert("duplicate username");
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        },


    },
};
</script>
