<script setup>
import Base from '@/components/Base.vue';
import FightWith from '../components/FightWith.vue';
import LeftMessage from '../components/LeftMessage.vue';
import RightMessage from '../components/RightMessage.vue';
import MessageInputForm from '../components/MessageInputForm.vue';
</script>
<template>
    <Base>
        <div class="main">
            <div class="left">
                <div class="checkerboard"></div>
            </div>

            <div class="middle">
                <div class="sectionOne">
                    <FightWith />
                </div>
                <div class="sectionTwo">
                    <LeftMessage />
                    <RightMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                    <RightMessage />
                    <RightMessage />
                    <LeftMessage />
                    <RightMessage />
                    <LeftMessage />
                </div>
                <div class="sectionThree">
                    <MessageInputForm />
                </div>
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
                        <!-- <button class="buttons" id="buttonOne">Rules</button> -->
                        <!-- <van-cell is-link @click="showPopup">Rules</van-cell> -->
                        <!-- <NButton>LALALAL</NButton> -->
                        <n-button @click="showModal = true"> 来吧 </n-button>
                        <n-modal v-model:show="showModal">
                            <!-- <n-card
                                style="width: 600px"
                                title="模态框"
                                :bordered="false"
                                size="huge"
                                role="dialog"
                                aria-modal="true"
                            >
                                <template #header-extra> 噢！ </template>
                                内容
                                <template #footer> 尾部 </template>
                            </n-card> -->
                            <div class="lalala"></div>
                        </n-modal>
                        <button @click="toHomePage()" class="buttons">Home</button>
                    </div>
                </div>
            </div>
        </div>
    </Base>
</template>

<style>
.lalala{
    width: 400px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
}

.main {
    position: fixed;
    top: 75px;
    bottom: 65px;
    right: 0;
    left: 0;
}
/* ------ checkerboard float at left ------ */
.left {
    float: left;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.checkerboard {
    width: 45vw;
    height: 45vw;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 20px;
}
/* ------ message window ------ */
.middle {
    float: left;
    width: 25%;
    height: 96%;
    padding: 10px;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
}
.sectionOne {
    float: left;
    width: 100%;
    height: 13%;
}
.sectionTwo {
    float: left;
    width: 100%;
    height: 80%;
    padding-bottom: 10px;
    padding-top: 10px;
    overflow: scroll;
}
.sectionThree {
    float: left;
    width: 100%;
    height: 7%;
    background: white;
    padding: 5px;
}
/* ------ move history ------ */
.right {
    float: left;
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.moveHistoryContent {
    width: 32vmin;
    height: 68vmin;
    background: rgb(204, 177, 128);
    border-radius: 10px;
}
h4 {
    font-size: 20px;
    text-align: center;
    margin-top: 0;
    padding-top: 10px;
    margin-bottom: 3px;
}
.divide-line {
    height: 2px;
    width: 100%;
    background: black;
}
.buttons {
    font-size: 25px;
    padding: 10px;
    margin-top: 8px;
    border: none;
    background: white;
}
#buttonOne {
    margin-left: 10px;
    margin-right: 40px;
}
</style>

<script>
// import { io } from 'socket.io-client';
// import Vue from 'vue';
// import VueMq from 'vue-mq';
// import { defineComponent } from 'vue'
import { NButton,NModal } from 'naive-ui';

export default {
    data() {
        return {
            // show: false,
            popupActivo: false,
            showModal: true
        };
    },
    components: {
        MessageInputForm,
        NButton,
        NModal,
    },

    mounted() {
        // const socket = io('ws://localhost:3001');
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },
        // showPopup() {
        //     this.show = true;
        // },
    },
};
</script>
