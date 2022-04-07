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

.darkgrid {
    background: #666;
}

.cactive {
    background-color: rgba(39, 245, 61, 0.43);
}
</style>

<template>
    <div class="checkerboard">
        <template v-for="(row, rowIndex) in RealChessboard">
            <template v-for="({ gridType, chessObj, cAnima, gridActive }, colIndex) in row">
                <ChessGrid
                    :gridType="gridType"
                    :activeG="gridActive"
                    :row="rowIndex"
                    :column="colIndex"
                    @emit-grid-coord="setGridCoord"
                >
                    <CheckerChess
                        v-if="chessObj !== null"
                        :csIndex="chessObj[0]"
                        :chessType="chessObj[1]"
                        :row="rowIndex"
                        :column="colIndex"
                        :chessActive="!!activeChess && chessObj[0] === activeChess"
                        @set-active="setChessActive"
                    />
                </ChessGrid>
            </template>
        </template>
    </div>
</template>

<script setup>
import ChessGrid from './ChessGrid.vue';
import { ref, reactive } from 'vue';
import lodash from 'lodash';
import CheckerChess from './CheckerChess.vue';

const activeChess = ref(null);
const setChessActive = chessAttrs => {
    const { chessType, csIndex, row, column } = chessAttrs;
    if (activeChess.value !== null) {
        if (csIndex === activeChess.value) {
            activeChess.value = null;
            // chessArr[csIndex].cActive = false;
        } else {
            // chessArr[activeChess.value.csIndex].cActive = false;
            activeChess.value = csIndex;
            // chessArr[csIndex].cActive = true;
        }
    } else {
        activeChess.value = csIndex;
        // chessArr[csIndex].cActive = true;
    }
    // console.log(chessAttrs);
};


const InitialChessboard = [
    [
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [0, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [1, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [2, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [3, 0], cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: [4, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [5, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [6, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [7, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [8, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [9, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [10, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [11, 0], cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: [12, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [13, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [14, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [15, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [16, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [17, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [18, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [19, 2], cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: [20, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [21, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [22, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [23, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
    ],
];

const RealChessboard = reactive(lodash.cloneDeep(InitialChessboard));
const setGridCoord = coord => {
    console.log(coord);
};
</script>
