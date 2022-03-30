<template>
    <div class="inputMsg">
        <form @submit.prevent="getFormValues">
        <input id="input" type="text" v-model="message" placeholder="Enter Your Messages..." @input="$emit('update:modelValue', $event.target.value)">
        </form>
    </div>
</template>

<style>
    .inputMsg{
        color:black;
    }
    #input{
        width:100%;
        height:100%;
        border:2px, rgb(194, 191, 191);
    }
        
</style>


<script>
import { ref } from "vue";
export default {
  setup() {
    const input = ref("");
    return { input };
  },
};

</script>