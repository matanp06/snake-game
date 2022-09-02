
import React, { useEffect, useState } from 'react';
import Board from './Board';
import Snake from './snake';

// create a new snake for the game
const snake = new Snake([0,0]);

// diractions "ENUM"
const directions ={
  up: [0,-1],
  down: [0,1],
  right: [1,0],
  left:[-1,0]
}


function App() {

  const boardCells = [...Array(100).keys()];
  // creatinig the snake hook
  const [snakeLinks,setSnakeLinks] = useState(snake.getSnake());
  const [gameIsActive, setGameIsActive] = useState(false);
  let direction = directions.right; // initiating the diraction of the snake 
  let nextDirection = direction;
  const [gameInterval, setGameInterval] = useState(null)
  // setting the apple position hook;
  const [apple,setApple] = useState(getRandomFreeLocation())
  let varApple = apple;

  // returns random empty(that is not a snake cell) cell
  function getRandomFreeLocation(){

    // creating an array of unique number than indentify a cell
    // those cells represants the position of the snakes link.
    const indexedLinks = snake.getSnake().map(([x,y]) => {
      return x+10*y;
    })

    // return an array of unique numbers that represants the 
    // empty cells of the board.
    const freeLocations = boardCells.filter(cell=>{
      return !indexedLinks.includes(cell)
    })


    // selecting a rendom number from the empty cells.
    const indexedLocation = freeLocations[Math.floor(Math.random()*freeLocations.length)];
    // converting the random number back to a cell form and returning it.
    return([indexedLocation%10,Math.floor(indexedLocation/10)]);

  }
  
  // tracing the user keys presses dutring the game.
  useEffect(()=>{
    document.addEventListener("keydown",(e)=>{
      const key = e.key;
      if(key=="Enter")
        setGameIsActive(true);
      else if(gameIsActive){
        if(key == "w"){
          nextDirection = directions.up;
        }
        else if(key == "s"){
          nextDirection = directions.down;
        }
        else if(key == "d"){
          nextDirection = directions.right;
        }
        else if(key == "a"){
          nextDirection = directions.left;
        } 
      }
    })
  },[gameIsActive]);

  //
  useEffect(()=>{
    document.addEventListener("keydown",(e)=>{
      const key = e.key;
      if(gameIsActive&&key == "q"){
        clearInterval(gameInterval);
      }
    })
  },[gameIsActive,gameInterval])

  // when starting the game activating the snake movement
  useEffect(()=>{
    if(gameIsActive){
      const intervalID = setInterval(()=>{
        move();
      },500)
      setGameInterval(intervalID);
    } else if(gameInterval){
      clearInterval(gameInterval);
    }
  },[gameIsActive]);

  // moves the snake
  function move(){
    // validating the snake next move direction
    direction = validDirection([direction,nextDirection]) ? nextDirection : direction;
    const [x,y] = direction;
    const [headX,headY] = snake.getSnakeHead();
    const cell = [headX+x,headY+y];

    // checking that the snake's head still in the board
    if(validStep(cell)){

      // checks if the snake bite an apple
      if(isStepOnApple(cell)){
        snake.eat(cell);
        const newSnake = snake.getSnake();
        setSnakeLinks(newSnake);
        varApple = getRandomFreeLocation()
        setApple(varApple);
      }else{
        snake.moveSnake(cell);
        const newSnake = snake.getSnake();
        setSnakeLinks(newSnake);

        // checking if the snake bite itself
        if(snake.isBitten()){
          setGameIsActive(false);
          alert("gameOver");
        }
      }
      
      
    } 
    else{
      setGameIsActive(false);
      alert("gameOver");
    }
  }

  // validating the next move direction of the snake
  // if the snake next move direction is the opposite of the previos move
  // then the new direction is ignored.
  function validDirection(testedDirections){
    if(testedDirections.includes(directions.up)&&
      testedDirections.includes(directions.down))
      return false;
    
    if(testedDirections.includes(directions.right)&&
      testedDirections.includes(directions.left))
      return false;
    
    return true;
  }

  // checking that the snake didn't crossed the boarder of 
  // the board
  function validStep([x,y]){
    if(0<=x && x<10 && 0<=y && y<10)
      return true;
    return false;
  }
  
  // checking if the snake reached an apple.
  function isStepOnApple([x,y]){
    const [appleX,appleY] = varApple;
    return (x==appleX && y==appleY);
  }

  return (
    <div className="App">
      <h1>SNAKE</h1>
      <Board snake={snakeLinks} apple={apple}/>
    </div>
  );
}

export default App;
