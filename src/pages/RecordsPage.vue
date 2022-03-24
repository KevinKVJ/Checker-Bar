<script setup>
import Base from '@/components/Base.vue';
import BigButton from '../components/BigButton.vue';
</script>


<template>
    <Base>
        <div class="content">
            <div class="main">
                <h4>Alice's Records</h4>
                <div class="divide-line"></div>
                <p> Total Wins: </p>
                <p> Games Played: </p>
                <p> Win Rate: </p>
                <p> Current Streak: </p>
                <p> Highest Streak: </p>
                <p> Last Played: </p>
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
        height:3px;
        background: black;
    }
    h4{
        font-size: 23px;
        font-weight: bolder;
    }
    p{
        font-weight: 600;
    }

</style>

<script>
export default{
    methods:{
        toHomePage(){
            this.$router.push({ path: '/homePage' })
        }
    }
}
</script>

