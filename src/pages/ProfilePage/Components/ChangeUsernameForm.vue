<template>
    <div class="changeInfoForm">
        <div class="userName">
            <label class="label">Change Username</label> <br>
            <input type="text" placeholder="Enter here" :value="modelValue" @input='$emit("update:modelValue", $event.target.value)' />
        </div>
        <div class="password">
            <label class="label"> Change Password </label> <br>
            <input type="text" placeholder="Enter here" :value="passwordValue" @input='$emit("update:passwordValue", $event.target.value)' />
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


<script>
export default {
  props: {
    modelValue: String,
    passwordValue: String,
  }
}
</script>