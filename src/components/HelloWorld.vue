<script setup>
import { ref } from 'vue';

defineProps({
    msg: String,
});

const count = ref(0);
</script>

<script type="js">
// import {ref} from 'vue'
export default {
  props: {
    title: String
  },
  // setup(props) {
  //   const count = ref(0)
  //   return {count}
  // }
  data() {
    return {
      lalala:1
    }
  },
  methods: {
    handlerKevin() {
      console.log("ccccccc");
    }
  },
  components:{

  }
}
</script>

<template>
    <h1>{{ msg }}</h1>

    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>
    <!-- <p>{{lalala}}</p> -->
    <button v-on:click="handlerKevin()">Click me</button>
    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Documentation </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
