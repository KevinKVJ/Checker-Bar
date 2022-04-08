<template>
    <Base>
        <div class="content">
            <div class="main">
                <h4>{{ titleName }}'s Records</h4>
                <div class="divide-line"></div>
                <div class="gameInfo">
                    <p>Total Wins: {{ totalWins }}</p>
                    <p>Games Played: {{ gamesPlayed }}</p>
                    <p>Win Rate: {{ winRate }} <span>&#37;</span></p>
                    <p>Current Streak: {{ currentStreak }}</p>
                    <p>Highest Streak: {{ highestStreak }}</p>
                    <p>Last Played: {{ lastPlayed }}</p>
                </div>
            </div>
            <div class="button">
                <BigButton @click="toHomePage()" fontSize="18px" title="Home" />
            </div>
        </div>
    </Base>
</template>

<style>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
}

.main {
    width: 350px;
    height: 420px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 5px;
}
.divide-line {
    width: 350px;
    height: 3px;
    background: black;
}
h4 {
    font-size: 23px;
    font-weight: bolder;
}
p {
    line-height: 32px;
}
</style>

<script>
import axios from 'axios';

import Base from '@/components/Base.vue';
import BigButton from '@/components/BigButton.vue';

export default {
    data() {
        return {
            titleName: 'abc',
            totalWins: 0,
            gamesPlayed: 0,
            winRate: 0.0,
            currentStreak: 0,
            highestStreak: 0,
            lastPlayed: '0000-00-00 00:00:00',
        };
    },
    components: {
        Base,
        BigButton,
    },
    mounted() {
        let username = sessionStorage.getItem('username');
        let userid = sessionStorage.getItem('userid');
        // console.log(username);
        // console.log(userid);
        this.titleName = username;

        axios
            .get('/api/statusInfo', {
                params: {
                    id: userid,
                },
            })
            .then(res => {
                var statisInfo = res.data[Object.keys(res.data)[2]];
                var variable_one = statisInfo[Object.keys(statisInfo)[0]];
                if (variable_one === null) {
                    this.totalWins = 0;
                } else {
                    this.totalWins = variable_one;
                }
                var variable_two = statisInfo[Object.keys(statisInfo)[1]];
                if (variable_two === null) {
                    this.gamesPlayed = 0;
                } else {
                    this.gamesPlayed = variable_two;
                }
                var variable_three = statisInfo[Object.keys(statisInfo)[2]];
                if (variable_three === null) {
                    this.winRate = 0.0;
                } else {
                    this.winRate = variable_three;
                }
                var variable_four = statisInfo[Object.keys(statisInfo)[3]];
                if (variable_four === null) {
                    this.currentStreak = 0;
                } else {
                    this.currentStreak = variable_four;
                }
                var variable_five = statisInfo[Object.keys(statisInfo)[4]];
                if (variable_five === null) {
                    this.highestStreak = 0;
                } else {
                    this.highestStreak = variable_five;
                }
                var variable_six = statisInfo[Object.keys(statisInfo)[5]];
                if (variable_six === null) {
                    this.lastPlayed = '0000-00-00';
                } else {
                    this.lastPlayed = variable_six;
                }
            });
    },

    methods: {
        toHomePage() {
            this.$router.push({ path: '/homePage' });
        },
    },
};
</script>
