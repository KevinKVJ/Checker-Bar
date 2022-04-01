<style>
.checkerboard {
    width: 100%;
    height: 100%;
    background: #fff;

    display: grid;
    grid-template-rows: repeat(8, 12.5%);
    grid-template-columns: repeat(8, 12.5%);
}

.checkerboard div {
    width: 100%;
    height: 100%;

    user-select: none;
}

.dark-grid {
    background: #666;
}
</style>

<template>
    <div class="checkerboard" ref="ckb">
        <!-- <div class="light-grid"></div> -->
        <!-- <div class="dark-grid"></div> -->
        <!-- <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div>
                        <div class="dark-grid"></div>
                        <div class="light-grid"></div> -->
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue';

/* 
const ckb = ref(null);
        onMounted(() => {
            console.log("lalala");
            // DOM 元素将在初始渲染后分配给 ref
            console.log(ckb.value); // <div>This is a root element</div>
        });
        return {
            ckb
        }
*/

export default defineComponent({
    setup() {
        const ckb = ref(null);
        onMounted(() => {
            console.log('lalala');
            let aaa = document.createElement('div');
            aaa.className = 'light-grid';
            ckb.value.appendChild(aaa);
            // console.log(ckb.value.children);
        });
        return {
            ckb,
        };
    },
});
</script>
