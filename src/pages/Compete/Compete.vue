<template>
    <Base>
        <div class="main">
            <div class="mobileButtonSection">
                <n-button @click="showModal = true" class="buttons" id="buttonOne"> Rules </n-button>
                <n-modal v-model:show="showModal">
                    <div class="lalala">
                        <ul id="ruleList">
                            <li>This game is for two players. Each player starts with 12 colored discs (of the same color).</li>
                            <li>
                                Players place their discs (pieces) on the dark squares on their side of the board. Red has first play, after
                                turns alternate.
                            </li>
                            <li>
                                Moves can only be made on black squares, so the pieces move diagonally. Pieces can only move in a forward
                                direction, toward their opponent.
                            </li>
                            <li>
                                If you are moving your disc forward, and not capturing your opponent’s piece in the move, you may only move
                                it forward one square.
                            </li>
                            <li>After a piece is captured, it is removed from the board, and collected by the opponent.</li>
                            <li>
                                If you have the ability to jump your opponents pieces, you must. However, in the even there are more than
                                one capture possible from a single square, you may jump whichever piece is preferable.
                            </li>
                            <li>
                                The game is won when the opponent is unable to make a move, which means the entirety of a player’s pieces
                                were captured by the opponent.
                            </li>
                        </ul>
                    </div>
                </n-modal>
                <button @click="toHomePage()" class="buttons">Home</button>
                <button v-bind:class="{ white: !isReady, red: isReady }" v-on:click="isReady = !isReady" @click="checkReadyStatus()">
                    Ready
                </button>
            </div>
            <div class="mobileGameInfo">
                <div>Color of your pieces: {{ yourColor }}</div>
                <div>{{ turnColor }}</div>
            </div>
            <div class="left">
                <div class="webGameInfo">Color of your pieces: {{ yourColor }}</div>
                <div class="webGameInfo">{{ turnColor }}</div>
                <div class="checkerboardbase">
                    <div class="checker-mask" v-if="checkerMaskSwitch">
                        <div class="webReadyButton">
                            <button
                                v-bind:class="{ white: !isReady, red: isReady }"
                                v-on:click="isReady = !isReady"
                                @click="checkReadyStatus()"
                            >
                                Ready
                            </button>
                        </div>
                    </div>

                    <CheckerBoard :sock="socket"></CheckerBoard>
                </div>
            </div>

            <div class="middle">
                <div class="sectionOne">
                    <FightWith v-bind:opponentName = "opponent_name" />
                </div>

                <!-- <div class="sectionAvatar">
                    <ul class="userAvatarArray">
                        <li v-for="(value, key) in avatarList" :key="key">
                            <UserAvatarList :iconName="value"> </UserAvatarList>
                        </li>
                    </ul>
                </div> -->

                <div class="sectionTwo">
                    <ul class="messageArray">
                        <li v-for="({ message, name }, index) in messages" :key="index" class="messageArrayList">
                            <!-- <RightMessage v-if="name === " :chatterName="name"> -->
                            <RightMessage v-if="name === this.username" :chatterName="name">
                                <div>
                                    {{ message }}
                                </div>
                            </RightMessage>
                            <LeftMessage v-else :chatterName="name">
                                <div>
                                    {{ message }}
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
                        <ul
                            v-for="({ name, oriCoord: [oriRow, oriCol], newCoord: [newRow, newCol] }, index) in moveHistoryList"
                            :key="index"
                        >
                            <li>
                                <pre>{{ `${name} : [${oriRow},${oriCol}]  ==>  [${newRow},${newCol}]` }}</pre>
                            </li>
                        </ul>
                    </div>
                    <div class="buttonSection">
                        <n-button @click="showModal = true" class="buttons" id="buttonOne"> Rules </n-button>
                        <n-modal v-model:show="showModal">
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
                        <button @click="toHomePage()" class="buttons">Home</button>
                    </div>
                </div>
            </div>
        </div>
    </Base>
</template>

<style lang="scss" scoped>
.moveHistoryContent {
    width: 100%;
    height: 68vmin;
    background: rgb(204, 177, 128);
    border-radius: 10px;

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

    overflow: auto;
    ul {
        padding: 0 10px;
        li {
            list-style: none;
            pre {
                text-align: center;
                font-family: Avenir, Helvetica, Arial, sans-serif;
                font-size: 18px;
                font-weight: 600;
            }
        }
    }
}

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

.white {
    background: white;
    height: 40px;
    width: 90px;
    font-size: 25px;
    border: none;
    /* margin-right: 40px; */
    border-radius: 4px;
    /* margin-bottom: 5px; */

}
.white:hover {
    color: rgb(182, 113, 113);
}
.red {
    background: rgb(182, 113, 113);
    height: 40px;
    width: 90px;
    font-size: 25px;
    border: none;
    /* margin-right: 40px; */
    border-radius: 4px;
    /* margin-bottom: 5px; */
}
.red:hover {
    color: white;
}

.main {
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    // padding: 10px;
}
/* ------ checkerboardbase float at left ------ */
.mobileButtonSection {
    display: none;
}

.mobileGameInfo {
    display: none;
}

.left {
    /* width: 40%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.checkerboardbase {
    width: 36vw;
    height: 36vw;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 40px;
    padding: 40px;

    position: relative;

    > .checker-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 500;
        border-radius: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}

/* ------ message window ------ */
.middle {
    width: 30%;
    background-color: rgba(255, 255, 255, 0.5);
    height: 72vmin;
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
    overflow: auto;
}
.messageArray {
    list-style: none;
    padding: 0 10px;
    margin: 0;
    &List {
        width: 100%;
        margin-bottom: 10px;
    }
}
.sectionThree {
    float: left;
    width: 100%;
    height: 7%;
    background: white;
    padding: 5px;
}
// .sectionAvatar {
//     float: right;
//     width: 18%;
//     height: 100%;
//     background: rgba(255, 255, 255, 0.5);
//     border-radius: 10px;
//     overflow: auto;
// }
.userAvatarArray {
    list-style: none;
    margin: 0;
    padding: 0;
}

.right {
    width: 35vmin;
    height: 72vmin;
}

.buttonSection{
    display: flex;
    justify-content: space-around;

    /* &:last-child{
        margin: 0;
    } */
}

.buttons {
    height: 40px;
    width: 90px;
    font-size: 25px;
    border: none;
    background: white;

    border-radius: 4px;
}

@media (max-width: 800px) {
    .main {
        margin-bottom: 10px;

        display: flex;
        flex-direction: column;
        overflow: auto;
        align-items: center;
        justify-content: center;
    }
    .webReadyButton {
        display: none;
    }
    .webGameInfo{
        display: none;
    }
    .mobileGameInfo {
        display: block;
    }
    .mobileButtonSection {
        display: block;
        
        margin-bottom: 10px;
        
        button{
            margin-right: 20px;
        }

        button:last-child {
            margin: 0;
        }
    }
    .left {
        width: 100%;
        /* height: 100vw; */
    }
    .checkerboardbase {
        width: 95vw;
        height: 95vw;
        background: rgb(141, 114, 81);
        border-radius: 40px;
        margin: 0 auto;
        padding: 9vmin;
    }

    .middle {
        width: 100%;
        height: 70vmin;
        background-color: rgba(255, 255, 255, 0.5);
        margin-top: 10px;
        margin-bottom: 30px;
    }
    .sectionOne {
        float: left;
        width: 100%;
        height: 14%;
    }
    // .sectionAvatar {
    //     float: right;
    //     width: 18%;
    //     height: 100%;
    //     background: rgba(255, 255, 255, 0.5);
    //     border-radius: 10px;
    //     overflow: scroll;
    // }
    .userAvatarArray {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .sectionTwo {
        float: left;
        width: 100%;
        height: 80%;
        padding: 10px;
        overflow: auto;
    }
    .messageArray {
        list-style: none;
        padding: 0 10px;
        margin: 0;

        &List {
            margin-bottom: 8px;
        }
    }
    .sectionThree {
        float: left;
        width: 100%;
        height: 40px;
        background: white;
        padding: 5px;
    }

    .right {
        margin-top: 10px;
        height: 100vw;
        width: 100%;

        .moveHistory {
            width: 100%;
            height: 100%;
        }
    }
    .moveHistoryContent {
        width: 100%;
        height: 100%;
        background: rgb(204, 177, 128);
        border-radius: 10px;
    }
    .divide-line {
        height: 2px;
        width: 100%;
        background: black;
    }
    .buttons {
        font-size: 4.4vmin;
        border: none;
        background: white;
        height: 7vmin;
        width: 15.75vmin;
    }
    .white {
        background: white;
        height: 7vmin;
        width: 15.75vmin;
        font-size: 4.4vmin;
        border: none;
        border-radius: 4px;

    }
    .white:hover {
        color: rgb(182, 113, 113);
    }
    .red {
        background: rgb(182, 113, 113);
        height: 7vmin;
        width: 15.75vmin;
        font-size: 4.4vmin;
        border: none;
        border-radius: 4px;
    }
    .red:hover {
        color: white;
    }
    .buttonSection {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        margin-top: 10px;
        display: none;

        /* > .buttons{
            margin-right: 40px;
        } */

        /* > &:last-child{
            margin: 0;
        } */
    }
}
</style>

<script>
import { io } from 'socket.io-client';
import { NButton, NModal } from 'naive-ui';

import Base from '@/components/Base.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import UserAvatarList from '@/components/UserAvatarList.vue';
import FightWith from './Components/FightWith.vue';
import LeftMessage from './Components/LeftMessage.vue';
import RightMessage from './Components/RightMessage.vue';
import MessageInputForm from './Components/MessageInputForm.vue';
import CheckerBoard from '@/components/Checker/CheckerBoard3.vue';

export default {
    data() {
        return {
            // show: false,
            opponent_name:"name",
            yourColor:"wait for start...",
            turnColor:"Click Ready button and wait for start...",
            userid: "",
            username: "",
            userAvatar: "",
            isReady: false,
            popupActivo: false,
            showModal: false,
            messages: [],
            socket: null,
            avatarList: [],
            moveHistoryList: [
                { name: 'lalala', oriCoord: [0, 7], newCoord: [1, 6] },
                { name: 'lalala', oriCoord: [0, 7], newCoord: [1, 6] },
                { name: 'lalala', oriCoord: [0, 7], newCoord: [1, 6] },
                { name: 'lalala', oriCoord: [0, 7], newCoord: [1, 6] },
            ], //method: addMoveHistory(moveHistory)
            checkerMaskSwitch: true,
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

    created() {
        const sock = io('http://localhost:8000');
        this.socket = sock;
    },

    mounted() {
        this.userid = sessionStorage.getItem('userid');
        this.username = sessionStorage.getItem('username');
        this.userAvatar = sessionStorage.getItem('userAvatar');
        var userObj = { myname: this.username, myid: this.userid, myavatar: this.userAvatar };

        this.socket.on('message-data', data => {
            console.log(data);
            this.messages.push(data);
        });

        this.socket.emit('addUser', userObj);
        console.log(userObj);
        this.socket.on('toBeReady', data => {
            console.log(data);
            if (data.blue.name === this.username){
                this.yourColor = "Blue";
                this.opponent_name = data.red.name;
            }
            if (data.red.name === this.username){
                this.yourColor = "Red";
                this.opponent_name = data.blue.name;
            }

        })
        this.socket.on('inQueryOrGoToSpectate', goToSpectate=>{
            alert("Please go to Spectate page");
        })
        
        console.log(this.isReady);
        
        this.socket.on('getStart', ({Turn})=>{
            console.log(Turn);
            this.turnColor = Turn +"pieces moves first";
        })

        console.log(this.isReady);

        this.socket.on('getStart', ({ Turn }) => {
            console.log(Turn);
            this.checkerMaskSwitch = false;
            this.turnColor = `It's ${Turn} s turn now`;
        });
    },

    unmounted() {
        !!this.socket && this.socket.disconnect();
        console.log('lalala');
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },

        checkReadyStatus() {
            console.log(this.isReady);
            if (this.isReady == true) {
                this.socket.emit('i-am-ready');
            }
        },

        sendMessage(mess) {
            this.socket.emit('boardmessage', { message: mess, name: sessionStorage.getItem('username') });
            console.log('Sent!!');
        },

        addMoveHistory(moveHistory) {
            // Type:Object:
            // {name:String,oriCoord: [oriRow, oriCol], newCoord:[newRow, newCol]}
            this.moveHistoryList.push(moveHistory);
        },


    },
};
</script>
