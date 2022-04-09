<template>
    <Base>
        <div class="content">
            <div class="main">
                <h4>{{ titleName }}'s Profile</h4>
                <div class="divide-line"></div>
                <!-- <SelectAvatar /> -->
                <ChangeUsernameForm />
            </div>
            <div class="button">
                <BigButton @click="toHomePage()" fontSize="18px" title="Home" />
            </div>
        </div>
    </Base>
</template>

<style>
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

export default {
    data() {
        return {
            titleName: 'abc',
        };
    },
    components:{
        Base,
        BigButton,
        ChangeUsernameForm
    },
    mounted() {
        let username = sessionStorage.getItem('username');
        console.log(username);
        this.titleName = username;
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },
    },
};
</script>
