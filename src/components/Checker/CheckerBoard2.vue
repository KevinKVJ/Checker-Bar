<style lang="scss" scoped>
.checkerboard {
    width: 100%;
    height: 100%;
    /* width: 500px; */
    /* height: 500px; */
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

/* 动态设置跨度大小 */
.v-leave-from {
    opacity: 1;
    /* transform: translate(0px, 0px); */
    /* left: 62.5px;
    bottom: -62.5px; */
    /* left: 0; */
    /* bottom: 0; */
}
.v-leave-active {
    transition: all 0.3s linear;
}

.v-leave-to {
    /* transform: translate(62.5px, -62.5px); */
    opacity: 0;
    /* left: 62.5px; */
    /* bottom: -62.5px; */
}
.v-enter-active {
    transition: opacity 0.3s ease;
    transition-delay: 0.2s;
}

.v-enter-from {
    opacity: 0;
}

.v-enter-to {
    opacity: 1;
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.disappear-leave-active {
    transition: all 2s linear;
    /* transition-delay: 0.2s; */
    opacity: 1;
}

.disappear-leave-to {
    opacity: 0;
}

.cgrid{
    position: relative;
}

.cchess{
    position: absolute;
}
</style>

<template>
    <div class="checkerboard">
        <!-- <transition-group class="checkerboard" tag="div"> -->
        <template v-for="(row, rowIndex) in RealChessboard">
            <!-- <template v-for="({ gridType, chessObj, cAnima, gridActive }, colIndex) in row" :key="rowIndex * 8 + colIndex"> -->
            <!-- mode="in-out" appear -->
            <ChessGrid
                :gridType="gridType"
                :activeG="gridActive"
                :row="rowIndex"
                :column="colIndex"
                @emit-grid-coord="moveByGridCoord"
                v-for="({ gridType, chessObj, cAnima, gridActive }, colIndex) in row"
                class="cgrid"                
            >
                <!-- :key="rowIndex * 8 + colIndex" -->
                <transition>
                    <CheckerChess
                        v-if="chessObj"
                        :csIndex="chessObj[0]"
                        :chessType="chessObj[1]"
                        :row="rowIndex"
                        :column="colIndex"
                        :chessActive="!!activeChess && chessObj[0] === activeChess.csIndex"
                        @set-active="setChessActive"
                        :key="chessObj[0]"
                        class="cchess"
                    />
                </transition>
            </ChessGrid>
            <!-- </template> -->
        </template>
    </div>
    <!-- </transition-group> -->
</template>

<script setup>
import ChessGrid from './ChessGrid.vue';
import { ref, reactive, watch,onUpdated,onMounted,onBeforeUpdate } from 'vue';
import lodash from 'lodash';
import CheckerChess from './CheckerChess.vue';

const activeChess = ref(null);
const setChessActive = chessAttrs => {
    const { chessType, csIndex, row, column } = chessAttrs;
    if (activeChess.value !== null) {
        if (csIndex === activeChess.value.csIndex) {
            activeChess.value = null;
            // chessArr[csIndex].cActive = false;
        } else {
            // chessArr[activeChess.value.csIndex].cActive = false;
            activeChess.value = chessAttrs;
            // chessArr[csIndex].cActive = true;
        }
    } else {
        activeChess.value = chessAttrs;
        // chessArr[csIndex].cActive = true;
    }
    // console.log(activeChess.value.csIndex);
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
        { gridType: true, chessObj: [3, 1], cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: [4, 1], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [5, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [6, 0], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [7, 1], cAnima: 'rightup', gridActive: false },
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
        { gridType: true, chessObj: [12, 3], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [13, 2], cAnima: 'rightup', gridActive: false },
        { gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false },
        { gridType: true, chessObj: [14, 3], cAnima: 'rightup', gridActive: false },
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
        { gridType: true, chessObj: [19, 3], cAnima: 'rightup', gridActive: false },
    ],
    [
        { gridType: true, chessObj: [20, 3], cAnima: 'rightup', gridActive: false },
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
const moveByGridCoord = newCoord => {
    const { row, column } = activeChess.value;
    // console.log(row,column);
    moveChess([row, column], newCoord);
};

watch(activeChess, (newAC, OriAC) => {
    if (newAC !== null) {
        const { chessType, csIndex, row, column } = newAC;

        for (const rows of RealChessboard) {
            for (let col of rows) {
                !!col.gridActive && (col.gridActive = false);
            }
        }

        switch (chessType) {
            // bcred
            case 0:
                column > 0 && (RealChessboard[row + 1][column - 1].gridActive = true);
                column < 7 && (RealChessboard[row + 1][column + 1].gridActive = true);
                break;
            // bcblue
            case 2:
                column > 0 && (RealChessboard[row - 1][column - 1].gridActive = true);
                column < 7 && (RealChessboard[row - 1][column + 1].gridActive = true);
                break;
            // bkblue
            // bkred
            case 1:
            case 3:
                row === 0 && column === 7 && (RealChessboard[row + 1][column - 1].gridActive = true);
                row === 7 && column === 0 && (RealChessboard[row - 1][column + 1].gridActive = true);
                if (row !== 0 && row !== 7 && column !== 0 && column !== 7) {
                    RealChessboard[row - 1][column + 1].gridActive = true;
                    RealChessboard[row - 1][column - 1].gridActive = true;
                    RealChessboard[row + 1][column + 1].gridActive = true;
                    RealChessboard[row + 1][column - 1].gridActive = true;
                } else {
                    if (column === 0) {
                        RealChessboard[row - 1][column + 1].gridActive = true;
                        row !== 7 && (RealChessboard[row + 1][column + 1].gridActive = true);
                    }
                    if (column === 7) {
                        RealChessboard[row + 1][column - 1].gridActive = true;
                        row !== 0 && (RealChessboard[row - 1][column - 1].gridActive = true);
                    }
                }
                break;
            default:
                break;
        }
    } else {
        // console.log('lalala');
        // setTimeout(() => {
            for (const rows of RealChessboard) {
                for (let col of rows) {
                    !!col.gridActive && (col.gridActive = false);
                }
            }
        // },300)
    }
    // console.log(newAC === null);
});

const moveChess = ([oriRow, oriCol], [newRow, newCol]) => {
    activeChess.value = null;

    RealChessboard[newRow][newCol].cAnima = 'rightup';
    RealChessboard[oriRow][oriCol].cAnima = 'rightup';

    RealChessboard[newRow][newCol].chessObj = RealChessboard[oriRow][oriCol].chessObj;
    // setTimeout(() => {
        RealChessboard[oriRow][oriCol].chessObj = null;
    // },300)
};

onUpdated(() => {
    console.log("lalala");
})

onBeforeUpdate(() => {
    console.log("beforelalala")
})


</script>
