<template>
    <div class="inputMsg">
        <form @submit.prevent="getFormValues">
            <input
                id="input"
                type="text"
                placeholder="Enter Your Messages..."
                v-model="inputValue"
                @keydown.enter="sendFunc(inputValue)"
            />
                <!-- @input="$emit('update:modelValue', $event.target.value)" -->
        </form>
    </div>
</template>

<style>
.inputMsg {
    color: black;
}
#input {
    width: 100%;
    height: 100%;
    border: 2px, rgb(194, 191, 191);
}
</style>

<script>
import { ref } from 'vue';
export default {
    props:{
        sendFunc: Function,
    },
    data() {
        return {
            inputValue:''
        }
    },
    setup() {
        const input = ref('');
        return { input };
    },
    methods: {
        // handleEnter(mess){
        //     this.sendFunc(mess);
        // }
    }
};
</script>
