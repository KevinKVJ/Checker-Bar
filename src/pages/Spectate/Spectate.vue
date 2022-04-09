<template>
    <Base>

        <div class="main">
            <div class="middle">
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
                        <button @click="toHomePage()" class="buttons" id="buttonTwo">Home</button>
                </div>
                <div class="checkerboardbase">
                    <CheckerBoard></CheckerBoard>
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

.buttonSection{
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

.checkerboardbase {
    width: 40vw;
    height: 40vw;
    max-width: 550px;
    max-height: 550px;
    background: rgb(141, 114, 81);
    border-radius: 40px;
    padding: 40px;
}
/* ------ user list float at right ------ */
.right{
    align-self: center;
    height: 80vh;
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
    .main{
        display: flex;
        flex-direction: column;
    }
    .middle {
        display: flex;
        flex-direction: column;
        align-self: center;
    }
    .checkerboardbase {
        width: 90vw;
        height: 90vw;
        max-width: 550px;
        max-height: 550px;
        background: rgb(141, 114, 81);
        border-radius: 40px;
        padding: 40px;
    }
    .right{
        align-self: center;
        height: 15vw;
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
// import { io } from "socket.io-client";
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
