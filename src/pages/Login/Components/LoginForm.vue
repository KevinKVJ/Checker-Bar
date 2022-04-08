<template>
    <div class="loginForm">
        <div class="header">
            <p>Please Enter Your Username &#38; Password</p>
        </div>

        <div class="form">

            <div class="userName">
                <label>Username:</label>
                <input type="text"  placeholder="Enter here" :value="modelValue" @input='$emit("update:modelValue", $event.target.value)' />
            </div>

            <div class="password">
                <label>Password: </label>
                <input type="text"  placeholder="Enter here" :value="passwordValue" @input='$emit("update:passwordValue", $event.target.value)' />
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

<!-- <script setup> 
 import { ref } from 'vue';

 const username = ref('');
 const password = ref('');


</script> -->


<script>
export default {
  props: {
    modelValue: String,
    passwordValue: String,
  }
}
</script>