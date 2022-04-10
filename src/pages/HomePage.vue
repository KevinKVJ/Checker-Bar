<template>
    <Base>
        <div class="content">
            <div class="abc">
                <div class="contentOne">
                    <BigButton @click="toSelectModePage()" id="button_one" fontSize="90px" title="Play!"/>
                </div>
                <div class="contentTwo">
                    <BigButton @click="toProfilePage()" id="button_two" fontSize="18px" title="Profile"/>
                    <BigButton @click="toRecordsPage()" id="button_three" fontSize="18px" title="Records"/>
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
        flex-direction: column;
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
import Base from '@/components/Base.vue';
import BigButton from '@/components/BigButton.vue';

export default{

    mounted(){
        //load username and userid from session
        let username = sessionStorage.getItem("username");
        let id = sessionStorage.getItem("userid");
        let userAvatar = sessionStorage.getItem("userAvatar");
        console.log(username);
        console.log(id);
        console.log(userAvatar);
    },
    components:{
        Base,
        BigButton
    },
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
    },
    
}
</script>
