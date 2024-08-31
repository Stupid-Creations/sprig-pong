/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: pong
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const background = "B"
const AI  = "A"
const ball = "b"

let score = 0;

setLegend(
  [ player, bitmap`
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......
.....2222.......`],[background,bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],[AI,bitmap`
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....
.......3333.....`], [ball, bitmap`
................
................
................
................
................
................
22222...........
22222...........
22222...........
22222...........
22222...........
................
................
................
................
................`]
)

setSolids([ball,player,AI])
setBackground(background);

let timer = 0;

let v = 1
let x = -v;
let y = v;

let alive = 0;
const mainloop = () =>{
    if(alive === 0){
    addText(" Pong!\n\n\n\n\n\n\n\n\n\n\n\npress I", options = {x:6,y:1,color:color`2`})
  }
  if(alive==1){
    clearText();
    getFirst(AI).y = getFirst(ball).y;


  if(getFirst(ball).y === 0){
    y*= -1;
  }if(getFirst(ball).y ===7){
    y*=-1;
  }
  if(getFirst(ball).y === getFirst(player).y && getFirst(player).x +1 === getFirst(ball).x){
    x*=-1;
    timer += 2;
    score++
  }
    if(getFirst(ball).y === getFirst(AI).y && getFirst(AI).x -1 === getFirst(ball).x){
    x*=-1;
    timer += 2;
  }
    if(timer%5 === 0){
      v++;
    }

  getFirst(ball).x += v
  getFirst(ball).y += v
  addText(String(score),options = {x:9,y:1,color : color`2`})
  }if(alive === 2){  addText("press i to restart",options = {x:1,y:1,color : color`2`})

  }
  if(getFirst(ball).x <= 0){
      alive = 2;
    }

}


let level = 0
const levels = [
  map`
BBBBBB
BBbBBB
pBBBBA
BBBBBB`,map`
............
............
............
............
....b.......
............
p..........A
............`
]
setMap(levels[0]);

setInterval(mainloop,500);
setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("i", () => {
  if(alive === 2){
    alive = true;
    score = 0;
    getFirst(ball).x = 5;
    getFirst(ball).y = 4;
    clearText();
  }if(alive === 0){
    setMap(levels[1]);
    alive = 1;
  }
})

afterInput(() => {
  
})
