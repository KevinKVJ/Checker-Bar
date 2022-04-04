<style>
.checkerboard {
    width: 100%;
    height: 100%;
    background: #fff;

    display: grid;
    grid-template-rows: repeat(8, 12.5%);
    grid-template-columns: repeat(8, 12.5%);
}

.checkerboard > div {
    width: 100%;
    height: 100%;

    user-select: none;

    overflow: hidden;
}

.dark-grid {
    background: #666;
}
</style>

<template>
    <div class="checkerboard" ref="ckb">
        <template v-for="(row, i) in InitialChessboard">
            <template v-for="(grid, j) in row">
                <template v-if="grid === 1">
                    <div class="dark-grid" v-if="i * 8 + j < 24">
                        <CheckerChess chessType="0" />
                    </div>
                    <div class="dark-grid" v-else-if="i * 8 + j > 39">
                        <CheckerChess chessType="2" />
                    </div>
                    <div class="dark-grid" v-else></div>
                </template>
                <div class="light-grid" v-else-if="grid === 0"></div>
            </template>
        </template>
        <!-- <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div>
        <div class="light-grid"></div>
        <div class="dark-grid">
            <CheckerChess />
        </div> -->
    </div>
</template>

<script setup>
import CheckerChess from './CheckerChess.vue';
import { ref, onMounted } from 'vue';
const ckb = ref(null);

const InitialChessboard = ref([
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
]);
const RealChessboard = ref([])
onMounted(() => {
    
});
</script>
