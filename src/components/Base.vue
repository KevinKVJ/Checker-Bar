<template>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="title">Checker Bar</div>
            </div>
            <div class="contentarea">
                <slot></slot>
            </div>
            <div class="footer">
                <div class="prompts">
                    <div class="copyright">© 2022 Checker Bar</div>
                    <div class="groupmember">{{ groupmembers }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.test1 {
    width: 400px;
    height: 400px;
    background: red;
}
.test2 {
    width: 400px;
    height: 400px;
    background: skyblue;
}
.test3 {
    width: 400px;
    height: 400px;
    background: grey;
}
.wrapper {
    height: 100%;
}
.container {
    height: 100%;
    overflow: auto;
}

.header {
    height: 75px;
    background-color: #464646;

    display: flex;
    justify-content: center;

    .title {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 600;
        font-size: 28.7109px;
        line-height: 34px;

        color: #f4ebeb;
        align-self: center;
    }
}

.contentarea {
    /* height: calc(100% - 75px); */
    padding-bottom: 65px;

    background: url('@/assets/img/bkg.png') center center;
}
.footer {
    /* width: 100%; */
    /* position: fixed;
    bottom: 0; */
    margin-top: -65px;

    height: 65px;
    background-color: #464646;

    display: flex;
    justify-content: center;
    align-items: center;
    .prompts {
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .copyright {
        margin-right: 30px;
    }

    /* .groupmember {
        white-space: pre;
    } */
}
</style>

<script setup>
import { ref } from 'vue';
const groupmembers = ref('From Group 26: Karim Beyk   Boxiao Li   Kaiwen Jia   Shude Li');
</script>
