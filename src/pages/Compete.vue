<script setup>
import Base from '@/components/Base.vue';
import FightWith from '../components/FightWith.vue';
import LeftMessage from '../components/LeftMessage.vue';
import RightMessage from '../components/RightMessage.vue';

</script>
<template>
    <Base>
        <div class="main">
            <div class="left">
                <div class="checkerboard"></div>
            </div>
            <div class="middle">
                <FightWith />
                <LeftMessage />
                <RightMessage />
                <RightMessage />
                <LeftMessage />
                <RightMessage />
                <LeftMessage />
                <RightMessage />
                <RightMessage />
                <LeftMessage />
                <RightMessage />
                <RightMessage />
            </div>
            <div class="right">
                <div class="moveHistory">
                    <div class="moveHistoryContent">
                        <h4>Move History</h4>
                        <div class="divide-line"></div>
                        <ul id="moveHistoryList">
                            ..............
                        </ul>
                    </div>
                    <div class="buttonSection">
                        <button class="buttons" id="buttonOne">Rules</button>
                        <button @click="toHomePage()" class="buttons">Home</button>
                    </div>
                </div>
            </div>
        </div>
    </Base>
</template>

<style>
    .main{
        position: fixed;
        top: 75px;
        bottom: 65px;
        right:0;
        left:0;
    }
    /* ------ checkerboard float at left ------ */
    .left{
        float: left;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .checkerboard{
        width: 45vw;
        height: 45vw;
        max-width: 550px;
        max-height: 550px;
        background: rgb(141, 114, 81);
        border-radius: 20px;
    } 
    /* ------ message window ------ */
    .middle{
        float: left;
        width: 25%;
        height: 96%;
        padding:10px;
        margin-top: 10px;
        background-color: rgba(255,255,255,0.5);
        overflow:scroll;
        border-radius: 8px;
    }
    /* ------ move history ------ */
    .right{
        float: left;
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .moveHistoryContent{
        width:32vmin;
        height:68vmin;
        background: rgb(204, 177, 128);
        border-radius: 10px;
    }
    h4{
        font-size: 20px;
        text-align: center;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 3px;
    }
    .divide-line{
        height:2px;
        width:100%;
        background: black;
    }
    .buttons{
        font-size: 25px;
        padding: 10px;
        margin-top: 8px;
        border: none;
    }
    #buttonOne{
        margin-left: 10px;
        margin-right:40px;
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

