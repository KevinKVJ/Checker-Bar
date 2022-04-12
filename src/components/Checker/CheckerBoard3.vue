<!--import { Client } from 'socket.io';-->


<style lang="scss" scoped>

.checkerboard {
  width: 100%;
  height: 100%;
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

.cgrid {
  position: relative;
}

.cchess {
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
          v-for="({ gridType, chessObj, gridActive }, colIndex) in row"
          class="cgrid"
          :key="colIndex"
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
import {ref, reactive, watch, onUpdated, onMounted, onBeforeUpdate} from 'vue';
import lodash from 'lodash';
import CheckerChess from './CheckerChess.vue';

const props = defineProps({
  sock:Object
})
const socket = props.sock;

const activeChess = ref(null);

const letGridNoActive = () => {
  for (const rows of RealChessboard) {
    for (let col of rows) {
      !!col.gridActive && (col.gridActive = false);
    }
  }
}

const setChessActive = chessAttrs => {
  const {chessType, csIndex, row, column} = chessAttrs;
  if (activeChess.value !== null) {
    letGridNoActive();
    if (csIndex === activeChess.value.csIndex) {
      activeChess.value = null;

    } else {
      activeChess.value = chessAttrs;
    }
  } else {
    activeChess.value = chessAttrs;
    //RealChessboard[0][1].gridActive = true;
  }
};

const InitialChessboard = [
  [
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [0, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [1, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [2, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [3, 1], cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: true, chessObj: [4, 1], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [5, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [6, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [7, 1], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [8, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [9, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [10, 0], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [11, 0], cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: null, cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: true, chessObj: [12, 3], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [13, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [14, 3], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [15, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [16, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [17, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [18, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [19, 3], cAnima: 'rightup', gridActive: false},
  ],
  [
    {gridType: true, chessObj: [20, 3], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [21, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [22, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
    {gridType: true, chessObj: [23, 2], cAnima: 'rightup', gridActive: false},
    {gridType: false, chessObj: null, cAnima: 'rightup', gridActive: false},
  ],
];

let oriPosition = [];
let newPosition = [];
let eatChess = [];

socket.on('moveChessInfo', ({origin,newPo}) =>{
  // const ([or,oc],[nr,nc],eatChess) = data;
  socketMove(origin,newPo);
})
//1. 移动chess， 消除chess，变王
const socketMove = ([or,oc],[nr,nc])=>{


  if (RealChessboard[or][oc].chessObj != null&&RealChessboard[nr][nc].chessObj === null) {
    moveAgain=false;
    if (Math.abs(nr - or) === 1) {
      RealChessboard[nr][nc].chessObj = RealChessboard[or][oc].chessObj;

      RealChessboard[or][oc].chessObj = null;

      if (RealChessboard[nr][nc].chessObj[1] ===0){

        if(nr === 7){
          RealChessboard[nr][nc].chessObj[1] =1;
        }


      }
      if (RealChessboard[nr][nc].chessObj[1] ===2){

        if(nr === 0){
          RealChessboard[nr][nc].chessObj[1] =3;
        }

      }
    }

    if (Math.abs(nr - or) === 2) {

      RealChessboard[nr][nc].chessObj = RealChessboard[or][oc].chessObj;
      RealChessboard[or][oc].chessObj = null;
      RealChessboard[or + (nr - or) / 2][oc + (nc - oc) / 2].chessObj = null

      if (RealChessboard[nr][nc].chessObj[1] ===0||RealChessboard[nr][nc].chessObj[1] ===1){
        moveAgain = true;

        if(nr === 7){
          RealChessboard[nr][nc].chessObj[1] =1;
        }
        redScore += 1;
        theOnlyChess = RealChessboard[nr][nc].chessObj[0];
        if (redScore === 12) {
          console.log("Game Finished! Red Wins");
        }

        console.log("red Scores are:" + redScore);

      }
      if (RealChessboard[nr][nc].chessObj[1] ===2||RealChessboard[nr][nc].chessObj[1] ===3){
        moveAgain = true;

        if(nr === 0){
          RealChessboard[nr][nc].chessObj[1] =3;
        }
        blueScore += 1;
        theOnlyChess = RealChessboard[nr][nc].chessObj[0];
        if (blueScore === 12) {
          console.log("Game Finished! Blue Wins");
        }

        console.log("Blue Scores are:" + blueScore);

      }

    }

  }


};

const RealChessboard = reactive(lodash.cloneDeep(InitialChessboard));
// let redMove = falSse;
let moveAgain = false;

let canGo = false;


let blueScore = 0;
let redScore = 0;
let theOnlyChess = -1;


// import {moveChess} from './logic.js'
const moveChess = ([oriRow, oriCol], [newRow, newCol],RealChessboard,activeChess) => {
  // activeChess.value = null;

  if (RealChessboard[oriRow][oriCol].chessObj != null) {
    moveAgain = false;

    if (!canGo) {

      if (RealChessboard[oriRow][oriCol].chessObj[1] === 1 || RealChessboard[oriRow][oriCol].chessObj[1] === 0) {


        RealChessboard[newRow][newCol].chessObj = RealChessboard[oriRow][oriCol].chessObj;
        // setTimeout(() => {
        RealChessboard[oriRow][oriCol].chessObj = null;

        socket.emit('chessMESend',{
          origin:[oriRow, oriCol], newPo:[newRow, newCol]
        });

        if (Math.abs(newRow - oriRow) === 2 && Math.abs(newCol - oriCol) === 2) {
          RealChessboard[oriRow + (newRow - oriRow) / 2][oriCol + (newCol - oriCol) / 2].chessObj = null;
          moveAgain = true;

          redScore += 1;
          theOnlyChess = RealChessboard[newRow][newCol].chessObj[0];
          if (redScore === 12) {
            console.log("Game Finished! Red Wins");
          }

          console.log("red Scores are:" + redScore);
        }













        if (newRow === 7) {
          RealChessboard[newRow][newCol].chessObj[1] = 1;
          console.log("this is " + RealChessboard[newRow][newCol])
        }
        // },300)




        if(!moveAgain){

          canGo = true;
          socket.emit('turnSwitch',true);


        }
      }

    } else {


      if (RealChessboard[oriRow][oriCol].chessObj[1] === 2 || RealChessboard[oriRow][oriCol].chessObj[1] === 3) {


        RealChessboard[newRow][newCol].chessObj = RealChessboard[oriRow][oriCol].chessObj;
        // setTimeout(() => {
        RealChessboard[oriRow][oriCol].chessObj = null;

        socket.emit('chessMESend',{
          origin:[oriRow, oriCol], newPo:[newRow, newCol]
        });

        // RealChessboard[0][1].gridActive = true;

        if (Math.abs(newRow - oriRow) === 2 && Math.abs(newCol - oriCol) === 2) {
          RealChessboard[oriRow + (newRow - oriRow) / 2][oriCol + (newCol - oriCol) / 2].chessObj = null;
          theOnlyChess = RealChessboard[newRow][newCol].chessObj[0];
          moveAgain = true;
          blueScore += 1;
          console.log("this is start");

          console.log("this is end");
          console.log("blue Scores are:" + blueScore);
          if (blueScore === 12) {
            console.log("Game Finished! Blue Wins!");
          }

        }
        // if(Math.abs(newRow-oriRow)===4&&Math.abs(newCol-oriCol)===4){
        //   RealChessboard[oriRow+(newRow-oriRow)/4][oriCol+(newCol-oriCol)/4].chessObj = null;
        //   RealChessboard[oriRow+(newRow-oriRow)+1][oriCol+(newCol-oriCol)+1].chessObj = null;
        //   blueScore+=2;
        //
        //   if(blueScore===12){
        //     console.log("Game Finished! Blue Wins");
        //   }
        //   console.log("Blue Scores are:"+blueScore);
        // }

        if (newRow === 0) {
          RealChessboard[newRow][newCol].chessObj[1] = 3;
          console.log("this is " + RealChessboard[newRow][newCol])
        }


        if(!moveAgain){
          canGo = false;
          socket.emit('turnSwitch',false)
        }

        // },300)
      }
    }


  }


};
const moveByGridCoord = newCoord => {
  const {row, column} = activeChess.value;
  // console.log(row,column);

  socket.on('moveChessInfo', ({origin,newPo}) =>{
    // const ([or,oc],[nr,nc],eatChess) = data;
    socketMove(origin,newPo);
  })

  moveChess([row, column],newCoord,RealChessboard,activeChess,moveAgain);
  socket.on('moveChessInfo', ({origin,newPo}) =>{
    // const ([or,oc],[nr,nc],eatChess) = data;
    socketMove(origin,newPo);
  })

  letGridNoActive();
};


// import {letActive} from './logic.js'
// import {secondMove} from './logic.js'

function letActive(newAC,RealChessboard) {



  const {chessType, csIndex, row, column} = newAC;
  // bcred
  if (chessType === 0) {
    console.log(RealChessboard[row][column])
    if (column > 0 && !((row + 1) >= 8 || (column - 1) < 0)) {

      if (RealChessboard[row + 1][column - 1].chessObj === null) {

        RealChessboard[row + 1][column - 1].gridActive = true;
      } else if (RealChessboard[row + 1][column - 1].chessObj[1] === 2 || RealChessboard[row + 1][column - 1].chessObj[1] === 3) {

        if (!((row + 2) >= 8 || (column - 2) < 0)) {
          if (RealChessboard[row + 2][column - 2].chessObj === null) {
            //RealChessboard[row + 2][column - 2].chessObj=null;
            RealChessboard[row + 2][column - 2].gridActive = true;




          }
        }
      }
    }
    if (column < 7 && !((row + 1) >= 8 || (column + 1) >= 8)) {
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        RealChessboard[row + 1][column + 1].gridActive = true;
      } else if (RealChessboard[row + 1][column + 1].chessObj[1] === 2 || RealChessboard[row + 1][column + 1].chessObj[1] === 3) {
        {
          if (!((row + 2) >= 8 || (column + 2) >= 8)) {


            if (RealChessboard[row + 2][column + 2].chessObj === null) {
              //RealChessboard[row + 2][column + 2].chessObj=null;
              RealChessboard[row + 2][column + 2].gridActive = true;



            }
          } else {
            console.log("error, out of range");
          }
        }

      }
    }

  }
  else if (chessType === 2) {
    if (column > 0 && !((row - 1) < 0 || (column - 1) < 0)) {
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        RealChessboard[row - 1][column - 1].gridActive = true;
      } else if (RealChessboard[row - 1][column - 1].chessObj[1] === 0 || RealChessboard[row - 1][column - 1].chessObj[1] === 1) {
        if (!((row - 2) < 0 || (column - 2) < 0)) {

          if (RealChessboard[row - 2][column - 2].chessObj === null) {
            //RealChessboard[row - 1][column - 1].chessObj=null;
            RealChessboard[row - 2][column - 2].gridActive = true;


          }
        }
      }
    }
    if (column < 7 && !((row - 1) < 0 || (column + 1) >= 8)) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        RealChessboard[row - 1][column + 1].gridActive = true;
      } else if (RealChessboard[row - 1][column + 1].chessObj[1] === 0 || RealChessboard[row - 1][column + 1].chessObj[1] === 1) {

        if (!((row - 2) < 0 || (column + 2) >= 8)) {
          if (RealChessboard[row - 2][column + 2].chessObj === null) {
            //RealChessboard[row - 1][column + 1].chessObj=null;
            RealChessboard[row - 2][column + 2].gridActive = true;


          }
        }
      }
    }
  }
      // bcblue

      // bkred
  // bkblue
  else if (chessType === 1) {
    if (row === 0 && column === 7) {
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        RealChessboard[row + 1][column - 1].gridActive = true;
      }
    } else if (row === 7 && column === 0) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        console.log("at this point");
        RealChessboard[row - 1][column + 1].gridActive = true;
      }

    } else if (row !== 0 && row !== 7 && column !== 0 && column !== 7) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        RealChessboard[row - 1][column + 1].gridActive = true;
      }
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        RealChessboard[row - 1][column - 1].gridActive = true;
      }
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        RealChessboard[row + 1][column + 1].gridActive = true;
      }
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        RealChessboard[row + 1][column - 1].gridActive = true;
      }
    } else {
      if (column === 0) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          RealChessboard[row - 1][column + 1].gridActive = true;
        }


        if (RealChessboard[row + 1][column + 1].chessObj === null && row !== 7) {
          RealChessboard[row + 1][column + 1].gridActive = true;
        }


      }
      if (column === 7) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          RealChessboard[row + 1][column - 1].gridActive = true;
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null && row !== 0) {
          RealChessboard[row - 1][column - 1].gridActive = true;
        }
        // RealChessboard[row + 1][column - 1].gridActive = true;
        // row !== 0 && (RealChessboard[row - 1][column - 1].gridActive = true);
      }

      if (row === 7) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          RealChessboard[row - 1][column + 1].gridActive = true;
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null) {
          RealChessboard[row - 1][column - 1].gridActive = true;
        }
      }
      if (row === 0) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          RealChessboard[row + 1][column - 1].gridActive = true;
        }
        if (RealChessboard[row + 1][column + 1].chessObj === null) {
          RealChessboard[row + 1][column + 1].gridActive = true;
        }
      }
    }
    if (column <= 5 && row <= 5) {
      if (RealChessboard[row + 2][column + 2].chessObj === null) {
        if (RealChessboard[row + 1][column + 1].chessObj != null) {
          if (RealChessboard[row + 1][column + 1].chessObj[1] === 2 || RealChessboard[row + 1][column + 1].chessObj[1] === 3) {
            RealChessboard[row + 2][column + 2].gridActive = true;

          }
        }


      }
    }
    if (column <= 5 && row >= 2) {

      if (RealChessboard[row - 2][column + 2].chessObj === null) {
        if (RealChessboard[row - 1][column + 1].chessObj != null) {
          if (RealChessboard[row - 1][column + 1].chessObj[1] === 2 || RealChessboard[row - 1][column + 1].chessObj[1] === 3) {
            RealChessboard[row - 2][column + 2].gridActive = true;

          }
        }

      }
    }

    if (column >= 2 && row <= 5) {

      if (RealChessboard[row + 2][column - 2].chessObj === null) {
        if (RealChessboard[row + 1][column - 1].chessObj != null) {
          if (RealChessboard[row + 1][column - 1].chessObj[1] === 2 || RealChessboard[row + 1][column - 1].chessObj[1] === 3) {
            RealChessboard[row + 2][column - 2].gridActive = true;

          }
        }

      }

    }
    if (column >= 2 && row >= 2) {

      if (RealChessboard[row - 2][column - 2].chessObj === null) {
        if (RealChessboard[row - 1][column - 1].chessObj != null) {
          if (RealChessboard[row - 1][column - 1].chessObj[1] === 2 || RealChessboard[row - 1][column - 1].chessObj[1] === 3) {
            RealChessboard[row - 2][column - 2].gridActive = true;

          }
        }

      }

    }
    // if(row === 0&& (column===0||column===1)){
    //   if (RealChessboard[row + 2][column + 2].chessObj === null) {
    //     if(RealChessboard[row + 1][column + 1].chessObj[1]===2||RealChessboard[row + 1][column + 1].chessObj[1]===3){
    //       RealChessboard[row + 2][column + 2].gridActive = true;
    //     }
    //
    //   }
    // }else if(row === 7 && (column===7||column===6)){
    //   if (RealChessboard[row - 2][column - 2].chessObj === null) {
    //     if(RealChessboard[row - 1][column - 1].chessObj[1]===2||RealChessboard[row - 1][column - 1].chessObj[1]===3){
    //       RealChessboard[row - 2][column - 2].gridActive = true;
    //     }
    //
    //   }
    // }else if(row === 0 && column === 7)


  }
  else {
    if (row === 0 && column === 7) {
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        RealChessboard[row + 1][column - 1].gridActive = true;
      }
    } else if (row === 7 && column === 0) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        RealChessboard[row - 1][column + 1].gridActive = true;
      }
    } else if (row !== 0 && row !== 7 && column !== 0 && column !== 7) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        RealChessboard[row - 1][column + 1].gridActive = true;
      }
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        RealChessboard[row - 1][column - 1].gridActive = true;
      }
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        RealChessboard[row + 1][column + 1].gridActive = true;
      }
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        RealChessboard[row + 1][column - 1].gridActive = true;
      }
    } else {

      if (column === 0) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          RealChessboard[row - 1][column + 1].gridActive = true;
        }


        if (RealChessboard[row + 1][column + 1].chessObj === null && row !== 7) {
          RealChessboard[row + 1][column + 1].gridActive = true;
        }
      }
      if (column === 7) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          RealChessboard[row + 1][column - 1].gridActive = true;
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null && row !== 0) {
          RealChessboard[row - 1][column - 1].gridActive = true;
        }
      }
      if (row === 7) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          RealChessboard[row - 1][column + 1].gridActive = true;
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null) {
          RealChessboard[row - 1][column - 1].gridActive = true;
        }
      }
      if (row === 0) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          RealChessboard[row + 1][column - 1].gridActive = true;
        }
        if (RealChessboard[row + 1][column + 1].chessObj === null) {
          RealChessboard[row + 1][column + 1].gridActive = true;
        }
      }
    }
    if (column <= 5 && row <= 5) {
      if (RealChessboard[row + 2][column + 2].chessObj === null) {
        if (RealChessboard[row + 1][column + 1].chessObj != null) {
          if (RealChessboard[row + 1][column + 1].chessObj[1] === 0 || RealChessboard[row + 1][column + 1].chessObj[1] === 1) {
            RealChessboard[row + 2][column + 2].gridActive = true;

          }
        }


      }
    }
    if (column <= 5 && row >= 2) {

      if (RealChessboard[row - 2][column + 2].chessObj === null) {
        if (RealChessboard[row - 1][column + 1].chessObj != null) {
          if (RealChessboard[row - 1][column + 1].chessObj[1] === 0 || RealChessboard[row - 1][column + 1].chessObj[1] === 1) {
            RealChessboard[row - 2][column + 2].gridActive = true;

          }
        }

      }
    }

    if (column >= 2 && row <= 5) {

      if (RealChessboard[row + 2][column - 2].chessObj === null) {
        if (RealChessboard[row + 1][column - 1].chessObj != null) {
          if (RealChessboard[row + 1][column - 1].chessObj[1] === 0 || RealChessboard[row + 1][column - 1].chessObj[1] === 1) {
            RealChessboard[row + 2][column - 2].gridActive = true;

          }
        }

      }

    }
    if (column >= 2 && row >= 2) {

      if (RealChessboard[row - 2][column - 2].chessObj === null) {
        if (RealChessboard[row - 1][column - 1].chessObj != null) {
          if (RealChessboard[row - 1][column - 1].chessObj[1] === 0 || RealChessboard[row - 1][column - 1].chessObj[1] === 1) {
            RealChessboard[row - 2][column - 2].gridActive = true;

          }
        }

      }

    }
  }
}

function secondMove(newAC,RealChessboard) {



  const {chessType, csIndex, row, column} = newAC;
  // bcred
  if (chessType === 0) {

    if (column > 0 && !((row + 1) >= 8 || (column - 1) < 0)) {

      if (RealChessboard[row + 1][column - 1].chessObj === null) {

        //删除了GridActive

      } else if (RealChessboard[row + 1][column - 1].chessObj[1] === 2 || RealChessboard[row + 1][column - 1].chessObj[1] === 3) {

        if (!((row + 2) >= 8 || (column - 2) < 0)) {
          if (RealChessboard[row + 2][column - 2].chessObj === null) {
            //RealChessboard[row + 2][column - 2].chessObj=null;
            RealChessboard[row + 2][column - 2].gridActive = true;



          }
        }
      }
    }
    if (column < 7 && !((row + 1) >= 8 || (column + 1) >= 8)) {
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        //删除了GridActive
      } else if (RealChessboard[row + 1][column + 1].chessObj[1] === 2 || RealChessboard[row + 1][column + 1].chessObj[1] === 3) {
        {
          if (!((row + 2) >= 8 || (column + 2) >= 8)) {


            if (RealChessboard[row + 2][column + 2].chessObj === null) {
              //RealChessboard[row + 2][column + 2].chessObj=null;
              RealChessboard[row + 2][column + 2].gridActive = true;


            }
          } else {
            console.log("error, out of range");
          }
        }

      }
    }

  }
  else if (chessType === 2) {
    if (column > 0 && !((row - 1) < 0 || (column - 1) < 0)) {
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        //删除了GridActive
      } else if (RealChessboard[row - 1][column - 1].chessObj[1] === 0 || RealChessboard[row - 1][column - 1].chessObj[1] === 1) {
        if (!((row - 2) < 0 || (column - 2) < 0)) {

          if (RealChessboard[row - 2][column - 2].chessObj === null) {
            //RealChessboard[row - 1][column - 1].chessObj=null;
            RealChessboard[row - 2][column - 2].gridActive = true;


          }
        }
      }
    }
    if (column < 7 && !((row - 1) < 0 || (column + 1) >= 8)) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        //删除了GridActive
      } else if (RealChessboard[row - 1][column + 1].chessObj[1] === 0 || RealChessboard[row - 1][column + 1].chessObj[1] === 1) {

        if (!((row - 2) < 0 || (column + 2) >= 8)) {
          if (RealChessboard[row - 2][column + 2].chessObj === null) {
            //RealChessboard[row - 1][column + 1].chessObj=null;
            RealChessboard[row - 2][column + 2].gridActive = true;


          }
        }
      }
    }
  }
      // bcblue

      // bkred
  // bkblue
  else if (chessType === 1) {
    if (row === 0 && column === 7) {
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
    } else if (row === 7 && column === 0) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        console.log("at this point");
        //删除了GridActive
      }

    } else if (row !== 0 && row !== 7 && column !== 0 && column !== 7) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
    } else {
      if (column === 0) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          //删除了GridActive
        }


        if (RealChessboard[row + 1][column + 1].chessObj === null && row !== 7) {
          //删除了GridActive
        }


      }
      if (column === 7) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null && row !== 0) {
          //删除了GridActive
        }
        // RealChessboard[row + 1][column - 1].gridActive = true;
        // row !== 0 && (RealChessboard[row - 1][column - 1].gridActive = true);
      }

      if (row === 7) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
      }
      if (row === 0) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row + 1][column + 1].chessObj === null) {
          //删除了GridActive
        }
      }
    }
    if (column <= 5 && row <= 5) {
      if (RealChessboard[row + 2][column + 2].chessObj === null) {
        if (RealChessboard[row + 1][column + 1].chessObj != null) {
          if (RealChessboard[row + 1][column + 1].chessObj[1] === 2 || RealChessboard[row + 1][column + 1].chessObj[1] === 3) {
            RealChessboard[row + 2][column + 2].gridActive = true;

          }
        }


      }
    }
    if (column <= 5 && row >= 2) {

      if (RealChessboard[row - 2][column + 2].chessObj === null) {
        if (RealChessboard[row - 1][column + 1].chessObj != null) {
          if (RealChessboard[row - 1][column + 1].chessObj[1] === 2 || RealChessboard[row - 1][column + 1].chessObj[1] === 3) {
            RealChessboard[row - 2][column + 2].gridActive = true;

          }
        }

      }
    }

    if (column >= 2 && row <= 5) {

      if (RealChessboard[row + 2][column - 2].chessObj === null) {
        if (RealChessboard[row + 1][column - 1].chessObj != null) {
          if (RealChessboard[row + 1][column - 1].chessObj[1] === 2 || RealChessboard[row + 1][column - 1].chessObj[1] === 3) {
            RealChessboard[row + 2][column - 2].gridActive = true;

          }
        }

      }

    }
    if (column >= 2 && row >= 2) {

      if (RealChessboard[row - 2][column - 2].chessObj === null) {
        if (RealChessboard[row - 1][column - 1].chessObj != null) {
          if (RealChessboard[row - 1][column - 1].chessObj[1] === 2 || RealChessboard[row - 1][column - 1].chessObj[1] === 3) {
            RealChessboard[row - 2][column - 2].gridActive = true;

          }
        }

      }

    }
    // if(row === 0&& (column===0||column===1)){
    //   if (RealChessboard[row + 2][column + 2].chessObj === null) {
    //     if(RealChessboard[row + 1][column + 1].chessObj[1]===2||RealChessboard[row + 1][column + 1].chessObj[1]===3){
    //       RealChessboard[row + 2][column + 2].gridActive = true;
    //     }
    //
    //   }
    // }else if(row === 7 && (column===7||column===6)){
    //   if (RealChessboard[row - 2][column - 2].chessObj === null) {
    //     if(RealChessboard[row - 1][column - 1].chessObj[1]===2||RealChessboard[row - 1][column - 1].chessObj[1]===3){
    //       RealChessboard[row - 2][column - 2].gridActive = true;
    //     }
    //
    //   }
    // }else if(row === 0 && column === 7)


  }
  else {
    if (row === 0 && column === 7) {
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
    } else if (row === 7 && column === 0) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        //删除了GridActive
      }
    } else if (row !== 0 && row !== 7 && column !== 0 && column !== 7) {
      if (RealChessboard[row - 1][column + 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row - 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row + 1][column + 1].chessObj === null) {
        //删除了GridActive
      }
      if (RealChessboard[row + 1][column - 1].chessObj === null) {
        //删除了GridActive
      }
    } else {

      if (column === 0) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          //删除了GridActive
        }


        if (RealChessboard[row + 1][column + 1].chessObj === null && row !== 7) {
          //删除了GridActive
        }
      }
      if (column === 7) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null && row !== 0) {
          //删除了GridActive
        }
      }
      if (row === 7) {
        if (RealChessboard[row - 1][column + 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row - 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
      }
      if (row === 0) {
        if (RealChessboard[row + 1][column - 1].chessObj === null) {
          //删除了GridActive
        }
        if (RealChessboard[row + 1][column + 1].chessObj === null) {
          //删除了GridActive
        }
      }
    }
    if (column < 5 && row <= 5) {
      if (RealChessboard[row + 2][column + 2].chessObj === null) {
        if (RealChessboard[row + 1][column + 1].chessObj != null) {
          if (RealChessboard[row + 1][column + 1].chessObj[1] === 0 || RealChessboard[row + 1][column + 1].chessObj[1] === 1) {
            RealChessboard[row + 2][column + 2].gridActive = true;

          }
        }


      }
    }
    if (column <= 5 && row >= 2) {

      if (RealChessboard[row - 2][column + 2].chessObj === null) {
        if (RealChessboard[row - 1][column + 1].chessObj != null) {
          if (RealChessboard[row - 1][column + 1].chessObj[1] === 0 || RealChessboard[row - 1][column + 1].chessObj[1] === 1) {
            RealChessboard[row - 2][column + 2].gridActive = true;

          }
        }

      }
    }

    if (column >= 2 && row <= 5) {

      if (RealChessboard[row + 2][column - 2].chessObj === null) {
        if (RealChessboard[row + 1][column - 1].chessObj != null) {
          if (RealChessboard[row + 1][column - 1].chessObj[1] === 0 || RealChessboard[row + 1][column - 1].chessObj[1] === 1) {
            RealChessboard[row + 2][column - 2].gridActive = true;

          }
        }

      }

    }
    if (column >= 2 && row >= 2) {

      if (RealChessboard[row - 2][column - 2].chessObj === null) {
        if (RealChessboard[row - 1][column - 1].chessObj != null) {
          if (RealChessboard[row - 1][column - 1].chessObj[1] === 0 || RealChessboard[row - 1][column - 1].chessObj[1] === 1) {
            RealChessboard[row - 2][column - 2].gridActive = true;

          }
        }

      }

    }
  }

}




watch(activeChess, (newAC, OriAC) => {

  if (newAC !== null) {
    const {chessType, csIndex, row, column} = newAC;








    if(moveAgain===false){

      letActive(newAC,RealChessboard);
    }
    else {
      secondMove(newAC,RealChessboard);
      console.log(theOnlyChess);
      console.log(csIndex);
      if(theOnlyChess!==csIndex){
        console.log("work");

        canGo=!canGo;
        moveAgain=false;
      }

    }


    //moveAgain = false;







  }
});


onUpdated(() => {
  //console.log("lalala");
})

onBeforeUpdate(() => {
  //console.log("beforelalala")
})

onMounted(() => {
  console.log(props.sock);
  socket.on('turn', (switchTurn) =>{
    canGo = switchTurn;
  })
})

</script>
