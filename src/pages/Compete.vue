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
                    <ul id="messageArray">
                        <li v-for="item in items" :key="item.message">
                            
                            <RightMessage  v-if="isMe">
                                <div>
                                    {{ item.message }}
                                </div>
                            </RightMessage>
                            <LeftMessage  v-if="notMe">
                                <div>
                                    {{ item.message }}
                                </div>
                            </LeftMessage>

                        </li>
                    </ul>
                </div>

                <div class="sectionThree">
                    <MessageInputForm :sendFunc='sendMessage'/>
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
                        <n-button
                            @click="showModal = true"
                            class="buttons"
                            id="buttonOne"
                        >
                            Rules
                        </n-button>
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
                            <div class="lalala">
                                <ul id="ruleList">
                                    <li>This game is for two players. Each player starts with 12 colored discs (of the same color). </li>
                                    <li>Players place their discs (pieces) on the dark squares on their side of the board. Black has first play, after turns alternate.</li>
                                    <li>Moves can only be made on black squares, so the pieces move diagonally. Pieces can only move in a forward direction, toward their opponent.</li>
                                    <li>If you are moving your disc forward, and not capturing your opponent’s piece in the move, you may only move it forward one square.</li>
                                    <li>After a piece is captured, it is removed from the board, and collected by the opponent.</li>
                                    <li>If you have the ability to jump your opponents pieces, you must. However, in the even there are more than one capture possible from a single square, you may jump whichever piece is preferable.</li>
                                    <li>The game is won when the opponent is unable to make a move, which means the entirety of a player’s pieces were captured by the opponent. </li>
                                </ul>
                            </div>
                        </n-modal>
                        <button @click="toHomePage()" class="buttons" id="buttonTwo">
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Base>
</template>

<style>
.lalala {
    width: 400px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    overflow: scroll;
}
#ruleList{
    padding-right: 20px;
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
#messageArray {
    list-style-type: none;
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
    /* padding: 10px;
    margin-top: 8px; */
    border: none;
    background: white;
}
#buttonOne {
    margin-left: 10px;
    margin-right: 40px;
    height: 40px;
    width: 90px;
}
#buttonTwo {
    height: 40px;
    width: 90px;
}
</style>

<script>
import { io } from 'socket.io-client';
// import Vue from 'vue';
// import VueMq from 'vue-mq';
// import { defineComponent } from 'vue'
import { NButton, NModal } from 'naive-ui';

export default {
    data() {
        return {
            // show: false,
            popupActivo: false,
            showModal: false,
            isMe: true,
            notMe: false,
            items: [{ message: 'Foo' }, { message: 'Bar' }],
            socket:{}
        };
    },
    components: {
        MessageInputForm,
        NButton,
        NModal,
    },

    mounted() {
        const sock = io('http://192.168.239.194:8000');
        this.socket = sock;
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },

        sendMessage(mess) {
            this.socket.emit('boardmessage',mess);
            console.log(mess);
        }
    },
};
</script>
