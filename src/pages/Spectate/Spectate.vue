<template>
    <Base>
        <div class="main">
            <div class="middle">
                <div class="fightInfoSection">
                    <div class="fightInfo">{{ fightInfoString }}</div>
                </div>
                <div class="buttonSection">
                    <n-button @click="showModal = true" class="buttons" id="buttonOne"> Rules </n-button>
                    <n-modal v-model:show="showModal">
                        <div class="lalala">
                            <ul id="ruleList">
                                <li>This game is for two players. Each player starts with 12 colored discs (of the same color).</li>
                                <li>
                                    Players place their discs (pieces) on the dark squares on their side of the board. Black has first play,
                                    after turns alternate.
                                </li>
                                <li>
                                    Moves can only be made on black squares, so the pieces move diagonally. Pieces can only move in a
                                    forward direction, toward their opponent.
                                </li>
                                <li>
                                    If you are moving your disc forward, and not capturing your opponent’s piece in the move, you may only
                                    move it forward one square.
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
                <div class="checkerboardbase">
                    <CheckerBoard ref="cb" :sock="socket"></CheckerBoard>
                </div>
                <div class="getReady">
                    <button v-bind:class="{ white: !waitlisted, red: waitlisted }" @click="checkStatus()">Join the waitlist</button>
                </div>
            </div>

            <div class="right">
                <div class="sectionAvatar">
                    <ul class="userAvatarArray">
                        <li v-for="(value, key) in avatarList" :key="key">
                            <UserAvatarList :iconName="value"> </UserAvatarList>
                        </li>
                    </ul>
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
    display: flex;
    flex-direction: row;
    width: 100vw;
    justify-content: center;
}
/* ------ checkerboardbase float in center of screen ------ */
.middle {
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-right: 10px;
}

.fightInfoSection {
    width: 100%;
    height: 7vmin;
    background: rgb(141, 114, 81);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px auto;

    margin-bottom: 20px;
}

.fightInfo {
    font-size: 18px;
}

.buttonSection {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
.getReady {
    display: flex;
    align-items: center;
    justify-content: center;
}
.white {
    background: white;
    border: none;
    margin-top: 10px;
    font-size: 25px;
    margin-bottom: 6px;
}
.red {
    background: rgb(180, 135, 135);
    border: none;
    margin-top: 10px;
    font-size: 25px;
    margin-bottom: 6px;
}

.checkerboardbase {
    width: 50vmin;
    height: 50vmin;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 40px;
    padding: 40px;
    margin: 0 auto;
}
/* ------ user list float at right ------ */
.right {
    align-self: center;
    height: 75vh;
    width: 8vw;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.sectionAvatar {
    float: right;
    width: 88%;
    height: 95%;
    border-radius: 10px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.5);
}
.userAvatarArray {
    list-style: none;
    margin: 0;
    padding: 0;
}
li {
    float: left;
    list-style-type: none;
}

@media (max-width: 700px) {
    .main {
        display: flex;
        flex-direction: column;
    }
    .middle {
        display: flex;
        flex-direction: column;
        align-self: center;
    }

    .fightInfoSection {
        width: 80vmin;
        height: 10vw;
    }

    .checkerboardbase {
        width: 90vw;
        height: 90vw;
        /* width: 50vw;
        height: 50vw; */
        max-width: 550px;
        max-height: 550px;
        background: rgb(141, 114, 81);
        border-radius: 40px;
        padding: 40px;
    }
    .right {
        align-self: center;
        height: 17vw;
        width: 90vw;
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .sectionAvatar {
        width: 88%;
        height: 95%;
        border-radius: 10px;
        overflow: auto;
        background: rgba(255, 255, 255, 0.5);
    }
    .userAvatarArray {
        list-style: none;
        margin: 0;
        padding: 0;
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
            waitlisted: false,
            popupActivo: false,
            showModal: false,
            items: [
                { message: 'Foo', name: true },
                { message: 'Bar', name: false },
            ],
            //items: ['message', 'name'],
            socket: null,
            avatarList: [],
            userObj: { myname: '', myid: '', myavatar: '' },
            fightInfoString: '',
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
        const sock = io('http://10.13.92.158:8000');
        this.socket = sock;
    },

    mounted() {
        this.userObj.myid = sessionStorage.getItem('userid');
        this.userObj.myname = sessionStorage.getItem('username');
        this.userObj.myavatar = sessionStorage.getItem('userAvatar');
        // console.log(userid);
        // console.log(username);
        //console.log(userAvatar);
        //var userObj = { myname: username, myid: userid, myavatar: userAvatar };

        this.socket.emit('getAvatarInfo', this.userObj);
        console.log(this.userObj);

        this.socket.on('queryInfo', data => {
            console.log('lalala');
            console.log(data);
            const newData = JSON.parse(data);
            this.avatarList = [];
            newData.map((item, index) => {
                this.avatarList.push(item.myavatar);
            });
            this.socket.emit('getChessboardStatus');
            console.log(this.userObj);
            console.log(this.avatarList);
        });

        // this.socket.on('waitforjoin', data => {
        //     console.log('wait for join');
        // });

        this.socket.emit('getChessboardStatus');
        this.socket.on('cbStatus', cbStatus => {
            console.log(cbStatus);
            let isFull = cbStatus.full;
            let isBlueReady = cbStatus.blueReady;
            let isRedReady = cbStatus.redReady;
            let isStarted = cbStatus.gameStart;
            // let currChessBoard = cbStatus.chessBoard;
            let blueInfo = !!cbStatus.blue && cbStatus.blue['name'];
            let redInfo = !!cbStatus.red && cbStatus.red['name'];
            console.log(isFull);
            console.log(isBlueReady);
            console.log(isRedReady);
            console.log(blueInfo);
            console.log(redInfo);
            if (isFull == false || isBlueReady == false || isRedReady == false) {
                this.fightInfoString = 'Waiting for the users........';
            }
            if (isFull == true && isBlueReady == true && isRedReady == true) {
                this.fightInfoString = blueInfo + ' is fighting with ' + redInfo;
            }
            // if(blueInfo === this.userObj.myname || redInfo === this.userObj.myname){
            //     console.log("enter game");
            //     alert("go to the compete page");
            //     this.toCompetePage();
            // }
            if (redInfo === this.userObj.myname || blueInfo === this.userObj.myname) {
                console.log('enter game');
                alert('go to the compete page');
                this.toCompetePage();
            }
        });

        this.socket.on('spectateChessMove', ({competeUserInfo}) => {
            const {chessBoard} = competeUserInfo;
            console.log(competeUserInfo);
            console.log('gameStart!!!!lalalala');
            if (JSON.stringify(chessBoard) !== '[]') {
                this.$refs.cb.assignChessBoard(chessBoard);
            }
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
        toCompetePage() {
            this.$router.push({ path: '/compete' });
        },

        sendMessage(mess) {
            this.socket.emit('boardmessage', mess);
            console.log(mess);
        },

        checkStatus() {
            // console.log(this.waitlisted);
            this.socket.emit('addUser', this.userObj);
            this.waitlisted = true;

            // if (this.waitlisted === true) {
            // this.socket.emit('getChessboardStatus');
            // console.log(this.userObj);
            // }
        },
    },
};
</script>
