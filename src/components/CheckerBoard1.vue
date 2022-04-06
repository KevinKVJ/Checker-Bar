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
}

.darkgrid {
    background: #666;
}

.cactive {
    background-color: rgba(39, 245, 61, 0.43);
}

/* 动态设置跨度大小 */
.rightupout-leave-active {
    transform: translate(0px, 0px);
    transition: all 0.3s linear;
}

.rightupout-leave-to {
    transform: translate(62.5px, -62.5px);
    /* opacity: 0; */
}
.rightupin-enter-active {
    transition: opacity;
    transition-delay: 0.3s;
}

.rightupin-enter-from {
    opacity: 0;
}

.leftupout-leave-active {
    transform: translate(0px, 0px);
    transition: all 0.3s linear;
}

.leftupout-leave-to {
    transform: translate(-125px, -125px);
}
.leftupin-enter-active {
    transition: opacity;
    transition-delay: 0.3s;
}

.leftupin-enter-from {
    opacity: 0;
}

.disappear-leave-active {
    transition: all 0.5s linear;
    transition-delay: 0.2s;
    opacity: 1;
}

.disappear-leave-to {
    opacity: 0;
}

/* .fade-enter-active,.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,.fade-leave-to {
    opacity: 0;
} */
</style>

<template>
    <div class="checkerboard">
        <template v-for="(row, rowIndex) in RealChessboard">
            <template v-for="({ bkg, csIndex, cTrans }, eleIndex) in row">
                <!-- 没加v-if 没有动画 -->
                <template v-if="bkg === 1">
                    <div class="darkgrid" @click="getGridIndex([rowIndex, eleIndex])">
                        <transition :name="cTrans">
                            <CheckerChess
                                v-if="csIndex !== null"
                                :chessType="chessArr[csIndex].cType"
                                :csIndex="csIndex"
                                :row="rowIndex"
                                :column="eleIndex"
                                @change-color="setChessActive"
                                :chessActive="chessArr[csIndex].cActive"
                            />
                        </transition>
                    </div>
                </template>
                <template v-if="bkg === 0">
                    <div class="lightgrid">
                        <transition :name="cTrans">
                            <CheckerChess
                                v-if="csIndex !== null"
                                :chessType="chessArr[csIndex].cType"
                                :csIndex="csIndex"
                                :row="rowIndex"
                                :column="eleIndex"
                                @change-color="moves"
                            />
                        </transition>
                    </div>
                </template>
                <template v-if="bkg === 2">
                    <div class="greengrid">
                        <transition :name="cTrans">
                            <CheckerChess
                                v-if="csIndex !== null"
                                :chessType="chessArr[csIndex].cType"
                                :csIndex="csIndex"
                                :row="rowIndex"
                                :column="eleIndex"
                                @change-color="moves"
                            />
                        </transition>
                    </div>
                </template>
                <template v-if="bkg === 3">
                    <div class="redgrid">
                        <transition :name="cTrans">
                            <CheckerChess
                                v-if="csIndex !== null"
                                :chessType="chessArr[csIndex].cType"
                                :csIndex="csIndex"
                                :row="rowIndex"
                                :column="eleIndex"
                                @change-color="moves"
                            />
                        </transition>
                    </div>
                </template>

                <!-- :name="chessArr[csIndex].cTrans" -->
                <!-- <template v-if="csIndex !== null">
                    <div class="lightgrid" v-if="bkg === 0">
                        <transition name="rightup" mode="out-in">
                            <CheckerChess v-if="csIndex !== null" :chessType="chessArr[csIndex].cType" />
                        </transition>
                    </div>
                    <div class="darkgrid" v-if="bkg === 1">
                        <transition name="rightup" mode="out-in">
                            <CheckerChess v-if="csIndex !== null" :chessType="chessArr[csIndex].cType" />
                        </transition>
                    </div>
                    <div class="greengrid" v-if="bkg === 2">
                        <transition name="rightup" mode="out-in">
                            <CheckerChess v-if="csIndex !== null" :chessType="chessArr[csIndex].cType" />
                        </transition>
                    </div>
                    <div class="redgrid" v-if="bkg === 3">
                        <transition name="rightup" mode="out-in">
                            <CheckerChess v-if="csIndex !== null" :chessType="chessArr[csIndex].cType" />
                        </transition>
                    </div>
                </template>
                <template v-else>
                    <div v-if="bkg === 0" class="lightgrid"></div>
                    <div v-if="bkg === 1" class="darkgrid"></div>
                    <div v-if="bkg === 2" class="greengrid"></div>
                    <div v-if="bkg === 3" class="redgrid"></div>
                </template> -->
            </template>
        </template>
    </div>
    <button @click="moves">MOVE</button>
    <button @click="eat">EAT</button>
</template>

<script setup>
import CheckerChess from './CheckerChess.vue';
import { ref, onMounted, reactive, toRaw, computed } from 'vue';
import lodash from 'lodash';

const getGridIndex = gIndex => {
    // if(RealChessboard[row][column].gridActive === true){
    console.log(gIndex[0], gIndex[1]);
    const { row, column } = activeChess.value;

    moves([row, column], gIndex);
    // }
};

const activeGrids = reactive([]);
const activeChess = ref(null);

const setChessActive = chessAttrs => {
    const { chessType, csIndex, row, column } = chessAttrs;
    if (activeChess.value !== null) {
        if (csIndex === activeChess.value.csIndex) {
            activeChess.value = null;
            chessArr[csIndex].cActive = false;
        } else {
            chessArr[activeChess.value.csIndex].cActive = false;
            activeChess.value = chessAttrs;
            chessArr[csIndex].cActive = true;
        }
    } else {
        activeChess.value = chessAttrs;
        chessArr[csIndex].cActive = true;
    }
};

const InitialChessboard = [
    [
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 0, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 1, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 2, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 3, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 1, csIndex: 4, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 5, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 6, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 7, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 9, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 10, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 11, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 8, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: null, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 1, csIndex: 12, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 13, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 14, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 15, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 16, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 17, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 18, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 19, cTrans: 'rightup', gridActive: false },
    ],
    [
        { bkg: 1, csIndex: 20, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 21, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 22, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
        { bkg: 1, csIndex: 23, cTrans: 'rightup', gridActive: false },
        { bkg: 0, csIndex: null, cTrans: 'rightup', gridActive: false },
    ],
];

const RealChessboard = reactive(lodash.cloneDeep(InitialChessboard));

const chessArrInitial = () => {
    const initialArr = [];
    // for (let i = 0; i < 24; i++) {
    //     i < 12 ? initialArr.push({ cType: '0', cActive: 0 }) : initialArr.push({ cType: '2', cActive: 0 });
    // }
    for (let i = 0; i < 24; i++) {
        i < 12 ? initialArr.push({ cType: '0', cActive: false }) : initialArr.push({ cType: '2', cActive: false });
    }

    return initialArr;
};

const chessArr = reactive(chessArrInitial());

// const realChessBoardInitial = () => {
//     const newArr = [];
//     for (let [rowIndex, row] of InitialChessboard.entries()) {
//         let rowArr = [];
//         if (rowIndex < 3 || rowIndex > 4) {
//             for (let [eleIndex, ele] of row.entries()) {
//                 rowIndex <= 2
//                     ? ele === 1
//                         ? rowArr.push({ cType: 0, cactive: false })
//                         : rowArr.push(null)
//                     : ele === 1
//                     ? rowArr.push({ cType: 2, cactive: false })
//                     : rowArr.push(null);
//             }
//         } else {
//             for (let [eleIndex, ele] of row.entries()) {
//                 rowArr.push(null);
//             }
//         }
//         newArr.push(rowArr);
//     }
//     return newArr;
// };

// const RealChessboard = reactive(realChessBoardInitial());
onMounted(() => {
    // console.log('RealChessboard', toRaw(RealChessboard));
    console.log('chessArr', toRaw(chessArr));
});

// const moves = () => {
//     if (RealChessboard[5][2].csIndex !== null) {
//         RealChessboard[4][3].cTrans = 'rightupin';
//         RealChessboard[5][2].cTrans = 'rightupout';

//         RealChessboard[4][3].csIndex = RealChessboard[5][2].csIndex;
//         RealChessboard[5][2].csIndex = null;
//     }
//     // chessArr[RealChessboard[5][2].csIndex].cType = '0';
//     // chessArr[RealChessboard[5][2].csIndex] = '0';
// };
// const moves = ([cRowOri,cColumnOri],[cRowTo,cColumnTo]) => {
//     // if (row !== 0 && column !== 0 RealChessboard[row][column].csIndex !== null) {
//     RealChessboard[row][column].cTrans = 'rightupout';
//     RealChessboard[row - 1][column + 1].cTrans = 'rightupin';

//     RealChessboard[row - 1][column + 1].csIndex = RealChessboard[row][column].csIndex;
//     RealChessboard[row][column].csIndex = null;
//     // }
//     // chessArr[RealChessboard[5][2].csIndex].cType = '0';
//     // chessArr[RealChessboard[5][2].csIndex] = '0';
// };
const moves = ([cRowOri, cColumnOri], [cRowTo, cColumnTo]) => {
    // if (row !== 0 && column !== 0 RealChessboard[row][column].csIndex !== null) {
    RealChessboard[cRowTo][cColumnTo].cTrans = 'rightupin';
    RealChessboard[cRowOri][cColumnOri].cTrans = 'rightupout';

    RealChessboard[cRowTo][cColumnTo].csIndex = RealChessboard[cRowOri][cColumnOri].csIndex;
    RealChessboard[cRowOri][cColumnOri].csIndex = null;
    // }
    // chessArr[RealChessboard[5][2].csIndex].cType = '0';
    // chessArr[RealChessboard[5][2].csIndex] = '0';
    chessArr[activeChess.value.csIndex].cActive = false;
    activeChess.value = null;
};
const eat = () => {
    if (RealChessboard[5][2].csIndex !== null) {
        RealChessboard[3][0].cTrans = 'leftupin';
        RealChessboard[4][1].cTrans = 'disappear';
        RealChessboard[5][2].cTrans = 'leftupout';

        RealChessboard[3][0].csIndex = RealChessboard[5][2].csIndex;
        RealChessboard[4][1].csIndex = null;
        RealChessboard[5][2].csIndex = null;
    }
    // chessArr[RealChessboard[5][2].csIndex].cType = '0';
    // chessArr[RealChessboard[5][2].csIndex] = '0';
};
</script>
