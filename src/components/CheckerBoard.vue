<style>
.checkerboard {
    /* width: 100%;
    height: 100%; */
    width: 500px;
    height: 500px;
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

.darkgrid {
    background: #666;
}

.cactive {
    background-color: rgba(39, 245, 61, 0.43);
}
</style>

<template>
    <div class="checkerboard" ref="ckb">
        <template v-for="(row, i) in RealChessboard">
            <template v-if="i < 3 || i > 4">
                <template v-for="(ele, j) in row">
                    <template v-if="ele !== null">
                        <div
                            @click="isChessActive"
                            :class="{ darkgrid: true, cactive: chessActive }"
                        >
                            <CheckerChess chessType="0" v-if="i < 3" />
                            <CheckerChess chessType="2" v-if="i > 4" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="lightgrid"></div>
                    </template>
                </template>
            </template>
            <template v-else>
                <template v-for="item in InitialChessboard[i]">
                    <template v-if="item === 1">
                        <div class="darkgrid"></div>
                    </template>
                    <template v-else>
                        <div class="lightgrid"></div>
                    </template>
                </template>
            </template>
        </template>
    </div>
    <button @click="moves">MOVE</button>
</template>

<script setup>
import CheckerChess from './CheckerChess.vue';
import { ref, onMounted, reactive, toRaw } from 'vue';
const ckb = ref(null);
const chessActive = ref(false);

const isChessActive = () => {
    chessActive.value = !chessActive.value;
    console.log(111);
};

const InitialChessboard = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];

const realChessBoardInitial = () => {
    const newArr = [];
    for (let [rowIndex, row] of InitialChessboard.entries()) {
        let rowArr = [];
        if (rowIndex < 3 || rowIndex > 4) {
            for (let [eleIndex, ele] of row.entries()) {
                rowIndex <= 2
                    ? ele === 1
                        ? rowArr.push({ cType: 0, cactive: false })
                        : rowArr.push(null)
                    : ele === 1
                    ? rowArr.push({ cType: 2, cactive: false })
                    : rowArr.push(null);
            }
        } else {
            for (let [eleIndex, ele] of row.entries()) {
                rowArr.push(null);
            }
        }
        newArr.push(rowArr);
    }
    return newArr;
};

const RealChessboard = reactive(realChessBoardInitial());
onMounted(() => {
    console.log('RealChessboard', toRaw(RealChessboard));
});

const moves = () => {
    // console.log(222);
    RealChessboard[4][3] = RealChessboard[5][2];
    RealChessboard[5][2] = null;
    console.log('RealChessboard', toRaw(RealChessboard));
}
</script>
