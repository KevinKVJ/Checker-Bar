<template>
    <div class="loginForm">
        <div class="header">
            <p>Please Enter Your Username &#38; Password</p>
        </div>
        <div class="form">
            <div class="userName">
                <label>Username:</label>
                {{username}}
                <input type="text" v-model="username" placeholder="Enter here" />
            </div>
            <div class="password">
                <label>Password: </label>
                {{psw}}
                <input type="text" v-model="psw" placeholder="Enter here" />
            </div>
        </div>
    </div>
</template>

<style>
.loginForm {
    padding-bottom: 20px;
}

.header {
    font-size: 15px;
    font-weight: 900;
}
.userName {
    margin-bottom: 10px;
}
.userName {
    margin-bottom: 20px;
}
</style>

<script setup>
import { ref } from 'vue';

const username = ref('');
const psw = ref('');
</script>
