<template>
    <div class="loginForm">
        <div class="header">
            <p> Please Enter Your Username &#38; Password </p>
        </div>
        <div class="form">
            <div class="userName">
                <label >Username:</label>
                <input type="text" v-model="username" placeholder="Enter here" />
            </div>
            <div class="password">
                <label>Password: </label>
                <input type="text" v-model="psw" placeholder="Enter here" />
            </div>
        </div>
    </div>
</template>

<style>
   .header{
       font-size:15px;
       font-weight:900;
   }
    .userName{
        margin-bottom: 10px;
    }
    .userName{
        margin-bottom: 20px;
    }
        
</style>


<script setup>
</script>