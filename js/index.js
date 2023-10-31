let inputDir={x:0,y:0}
const foodSound=new Audio('js/food.mp3')
const gameoverSound=new Audio('js/gameover.mp3')
const moveSound=new Audio('js/move.mp3')
const musicSound=new Audio('js/music.mp3')
let prevtime=0;
let speed=4;
let snakeArr = [
    {x: 13, y: 15}
];
let score=0
let food={x:8,y:4}


function main(ctime){
    
    
    
    window.requestAnimationFrame(main)
    musicSound.play();
    if((ctime-prevtime)/1000<(1/speed)){
        return;
    }
    prevtime=ctime
    gameEngine();
}
function iscollide(sarr){
    //if snake bumps into itself
    for (let i = 1; i < sarr.length; i++) {
       if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
        return true;
       }
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0){
        return true;
    }

    return false;
}
function gameEngine(){
    
    //if snake touches the wall
    if(iscollide(snakeArr)){
        if(score>highscoreval){
            speed=4;
            gameoverSound.play();
            musicSound.pause();
            inputDir={x:0,y:0};
            highscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(highscoreval))
            HighBox.innerHTML="HiScore:"+highscoreval
            alert("Congratulations on breaking the highscore.Press any key to restart")
        }
        else if(score<=highscoreval){
            speed=4;
        gameoverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over.Press any key to restart")
        }
        snakeArr=[{
            x:9,y:9}
        ]
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score:"+score
    }
   
    //if snake eats food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play()
        score+=1
        if(score%5==0){
            speed=speed+1;
        }
        
        scoreBox.innerHTML="Score:"+score
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})//unshift add a new element at beginning of array
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        // console.log(snakeArr[i+1])
        // console.log(snakeArr[i])
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement=document.createElement('div')
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement)

}
//setting high score
let hiscore=localStorage.getItem("hiscore")
if(hiscore===null){
    highscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(hiscore)
    HighBox.innerHTML="HiScore:"+hiscore
}
window.requestAnimationFrame(main)
//event listening for arrow keys
// Event listener for arrow keys and WASD keys
window.addEventListener('keydown', (e) => {
    e.preventDefault();

    const allowedKeys = ["ArrowUp", "w", "ArrowDown", "s", "ArrowLeft", "a", "ArrowRight", "d"];

    if (allowedKeys.includes(e.key)) {
        inputDir = { x: 0, y: 1 };
        

        switch (e.key) {
            case "ArrowUp":
            case "w":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "ArrowDown":
            case "s":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "ArrowLeft":
            case "a":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "ArrowRight":
            case "d":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
        }
    }
});
