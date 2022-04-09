<template>
    <Base>
        <div class="main">
            <div class="left">
                <div class="checkerboardbase">
                    <CheckerBoard></CheckerBoard>
                </div>
            </div>

            <div class="middle">
                <div class="sectionOne">
                    <FightWith />
                </div>

                <div class="sectionAvatar">
                    <ul id="userAvatarArray">
                        <li v-for="(value, key) in avatarList" :key="key">
                            <UserAvatarList :iconName="value"> </UserAvatarList>
                        </li>
                    </ul>
                </div>

                <div class="sectionTwo">
                    <ul id="messageArray">
                        <li v-for="(item, index) in items" :key="index">
                            <RightMessage v-if="item.name">
                                <div>
                                    {{ item.message }}
                                </div>
                            </RightMessage>
                            <LeftMessage v-else>
                                <div>
                                    {{ item.message }}
                                </div>
                            </LeftMessage>
                        </li>
                    </ul>
                </div>

                <div class="sectionThree">
                    <MessageInputForm :sendFunc="sendMessage" />
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
                        <n-button @click="showModal = true" class="buttons" id="buttonOne"> Rules </n-button>
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
                                    <li>This game is for two players. Each player starts with 12 colored discs (of the same color).</li>
                                    <li>
                                        Players place their discs (pieces) on the dark squares on their side of the board. Black has first
                                        play, after turns alternate.
                                    </li>
                                    <li>
                                        Moves can only be made on black squares, so the pieces move diagonally. Pieces can only move in a
                                        forward direction, toward their opponent.
                                    </li>
                                    <li>
                                        If you are moving your disc forward, and not capturing your opponent’s piece in the move, you may
                                        only move it forward one square.
                                    </li>
                                    <li>After a piece is captured, it is removed from the board, and collected by the opponent.</li>
                                    <li>
                                        If you have the ability to jump your opponents pieces, you must. However, in the even there are more
                                        than one capture possible from a single square, you may jump whichever piece is preferable.
                                    </li>
                                    <li>
                                        The game is won when the opponent is unable to make a move, which means the entirety of a player’s
                                        pieces were captured by the opponent.
                                    </li>
                                </ul>
                            </div>
                        </n-modal>
                        <button @click="toHomePage()" class="buttons" id="buttonTwo">Home</button>
                    </div>
                </div>
            </div>
        </div>
    </Base>
</template>

<style scoped>
.lalala {
    width: 400px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    overflow: scroll;
}
#ruleList {
    padding-right: 20px;
}

.main {
    /* position: fixed;
    top: 75px;
    bottom: 65px;
    right: 0; */
    left: 0;
    /* height: 100%; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
/* ------ checkerboardbase float at left ------ */
.left {
    /* float: left;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center; */
    width: 40%;
    
}
.checkerboardbase {
    width: 36vw;
    height: 36vw;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 40px;
    padding: 40px;
}

/* ------ message window ------ */
.middle {
    /* float: left;
    width: 28%;
    height: 96%;
    padding: 10px;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px; */
    width: 25%;
    background-color: rgba(255, 255, 255, 0.5);
    height: 72vmin;
}
.sectionOne {
    float: left;
    width: 80%;
    height: 13%;
}
.sectionTwo {
    float: left;
    width: 80%;
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
    width: 80%;
    height: 7%;
    background: white;
    padding: 5px;
}
.sectionAvatar {
    float: right;
    width: 18%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow: scroll;
}
#userAvatarArray {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

/* ------ move history ------ */
/* .right { */
    /* float: left;
    width: 22%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; */

/* } */
.moveHistoryContent {
    width: 35vmin;
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



@media (max-width: 850px) {
   .main {
        display: flex;
        flex-direction: column;
        overflow:scroll;
        align-items: center;
        justify-content: center;
    }
    .left{
        width: 100%;
        height: 100vw;
    }
    .checkerboardbase {
        width: 100%;
        height: 100vw;
        background: rgb(141, 114, 81);
        border-radius: 40px;   
    }

    .middle{
        width: 80%;
        height: 80vmin;
        background-color: rgba(255, 255, 255, 0.5);
    }
    .sectionOne {
        float: left;
        width: 80%;
        height: 13%;
    }
    .sectionAvatar {
        float: right;
        width: 18%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        overflow: scroll;
    }
    #userAvatarArray {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .sectionTwo {
        float: left;
        width: 80%;
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
        width: 80%;
        height: 7%;
        background: white;
        padding: 5px;
    }

    .right{
        height: 80vw;
        width: 80%;
    }

}

</style>

<script>
import { io } from 'socket.io-client';
import { ref, onMounted } from 'vue';
import { NButton, NModal } from 'naive-ui';

import Base from '@/components/Base.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import UserAvatarList from '@/components/UserAvatarList.vue';
import FightWith from './Components/FightWith.vue';
import LeftMessage from './Components/LeftMessage.vue';
import RightMessage from './Components/RightMessage.vue';
import MessageInputForm from './Components/MessageInputForm.vue';
import CheckerBoard from '@/components/Checker/CheckerBoard2.vue';

export default {
    setup() {
        const ckb = ref(null);
        onMounted(() => {
            console.log('lalala');
            // DOM 元素将在初始渲染后分配给 ref
            console.log(ckb.value); // <div>This is a root element</div>
        });
        return {
            ckb,
        };
    },
    data() {
        return {
            // show: false,
            popupActivo: false,
            showModal: false,
            items: [
                { message: 'Foo', name: true },
                { message: 'Bar', name: false },
            ],
            //items: ['message', 'name'],
            socket: null,
            avatarList: [],
        };
    },
    components: {
        MessageInputForm,
        NButton,
        NModal,
        Base,
        FightWith,
        LeftMessage,
        RightMessage,
        CheckerBoard,
        UserAvatarList,
        SvgIcon,
    },

    mounted() {
        let userid = sessionStorage.getItem('userid');
        let username = sessionStorage.getItem('username');
        let userAvatar = sessionStorage.getItem('userAvatar');
        var userObj = { myname: username, myid: userid, myavatar: userAvatar };

        // const sock = io('http://10.12.187.218:8000');
        // this.socket = sock;

        // sock.on('echo', data => {
        //     console.log(data);
        //     this.items.push({ message: data, name: true });
        // });

        // sock.on('data', data => {
        //     console.log(data);
        //     this.items.push({ message: data, name: false });
        // });

        // sock.emit('avatarInfor', userObj);

        // sock.on('returnInf', data => {
        //     console.log(data);
        //     this.avatarList = data.map(obj => {
        //         return obj.myavatar;
        //     });
        //     console.log(this.avatarList);
        // });
    },

    unmounted() {
        !!this.socket && this.socket.disconnect();
        console.log('lalala');
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },

        sendMessage(mess) {
            this.socket.emit('boardmessage', mess);
            console.log(mess);
        },
    },
};
</script>
