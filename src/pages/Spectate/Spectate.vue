<template>
    <Base>
        <div class="main">
            <div class="middle">
                <div class="fightInfoSection">
                    <div class="fightInfo">nina is fighting with lalala</div>
                </div>
                <div class="buttonSection">
                    <n-button @click="showModal = true" class="buttons" id="buttonOne"> Rules </n-button>
                    <n-modal v-model:show="showModal">
                        <div class="lalala">
                            <ul id="ruleList">
                                <li>This game is for two players. Each player starts with 12 colored discs (of the same color).</li>
                                <li>Players place their discs (pieces) on the dark squares on their side of the board. Black has first play, after turns alternate.</li>
                                <li>Moves can only be made on black squares, so the pieces move diagonally. Pieces can only move in a forward direction, toward their opponent.</li>
                                <li>If you are moving your disc forward, and not capturing your opponent’s piece in the move, you may only move it forward one square.</li>
                                <li>After a piece is captured, it is removed from the board, and collected by the opponent.</li>
                                <li>
                                    If you have the ability to jump your opponents pieces, you must. However, in the even there are more than one capture possible from a single
                                    square, you may jump whichever piece is preferable.
                                </li>
                                <li>The game is won when the opponent is unable to make a move, which means the entirety of a player’s pieces were captured by the opponent.</li>
                            </ul>
                        </div>
                    </n-modal>
                    <button @click="toHomePage()" class="buttons" id="buttonTwo">Home</button>
                </div>
                <div class="checkerboardbase">
                    <CheckerBoard></CheckerBoard>
                </div>
                <div class="getReady">
                    <button v-bind:class="{ white: !waitlisted, red: waitlisted }" v-on:click="waitlisted = !waitlisted" @click="checkStatus()">Join the waitlist</button>
                </div>
            </div>

            <div class="right">
                <div class="sectionAvatar">
                    <ul id="userAvatarArray">
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
    height: 80vh;
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
    width: 32vw;
    height: 4vw;
    background: rgb(141, 114, 81);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    width: 32vw;
    height: 32vw;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 40px;
    padding: 40px;
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
    overflow: scroll;
    background: rgba(255, 255, 255, 0.5);
}
#userAvatarArray {
    list-style-type: none;
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
        width: 90vw;
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
        overflow: scroll;
        background: rgba(255, 255, 255, 0.5);
    }
    #userAvatarArray {
        list-style-type: none;
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
import CheckerBoard from '@/components/Checker/CheckerBoard2.vue';

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
            userObj:{myname: '', myid: '', myavatar: ''},
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
        this.userObj.myid = sessionStorage.getItem('userid');
        this.userObj.myname = sessionStorage.getItem('username');
        this.userObj.myavatar = sessionStorage.getItem('userAvatar');
        // console.log(userid);
        // console.log(username);
        //console.log(userAvatar);
        //var userObj = { myname: username, myid: userid, myavatar: userAvatar };

        const sock = io('http://localhost:8000');
        this.socket = sock;

        sock.emit('getAvatarInfo', this.userObj);
        console.log(this.userObj);

        sock.on('queryInfo', data => {
            console.log('lalala');
            console.log(data);
            this.avatarList = [];
            data.map((item, index) => {
                this.avatarList.push(item.myavatar);
            });
            console.log(this.avatarList);
        });

        sock.on('waitforjoin', data => {
            console.log('wait for join');
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

        sendMessage(mess) {
            this.socket.emit('boardmessage', mess);
            console.log(mess);
        },

        checkStatus() {
            console.log(this.waitlisted);
            if (this.waitlisted === true) {
                this.socket.emit('addUser', this.userObj);
                console.log(this.userObj);
            }
        },
    },
};
</script>
