<template>
    <!-- <div class="profileForm">
        <form>
            <label for="username">Change Username:</label><br>
            <input type="text" id="username" name="username" placeholder="Enter here"><br>
            <label for="psw">Change Password:</label><br>
            <input type="text" id="psw" name="psw" placeholder="Enter here"><br><br>
        </form>
    </div> -->
    <div class="changeInfoForm">
        <div class="userName">
            <label class="label">Change Username</label> <br>
            <input type="text" v-model="username" placeholder="Enter here" />
        </div>
        <div class="password">
            <label class="label"> Change Password </label> <br>
            <input type="text" v-model="psw" placeholder="Enter here" />
        </div>
    </div>
</template>

<style scoped>
    .label{
        font-weight: bold;
    }
    .userName{
        padding-bottom: 15px;
        line-height: 30px;
    }
    .password{
        line-height: 30px;
    }
</style>


<script setup>
</script>