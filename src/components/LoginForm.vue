<template>
    <div class="loginForm">
        <div class="header">
            <p> Please Enter Your Username &#38; Password </p>
        </div>
        <!-- login form -->
        <form>
        <table>
            <tr>
                <td>Username:</td>
                <td>
                    <input type="text" id="username" name="username">
                </td>
            </tr>
            <tr>
                <td>Password:</td>
                <td>
                    <input type="text" id="psw" name="psw">
                </td>
            </tr>
        </table>
        </form>
    </div>
</template>

<style>
   .header{
       font-size:15px;
       font-weight:900;
   }
</style>


<script setup>
</script>