import React, { useEffect, useState } from "react";

function Cell(props){

    // colors of the cells depanding on the type of cell
    const snakeStyle = {backgroundColor:"blue"};
    const appleStyle = {backgroundColor:"red"};

    // hooks
    const [partOfSnake,setPartOfSnake]=useState((props.x==0&&props.y==0) ? true :false);
    const [isApple,setIsApple]=useState(false);

    // determining if the cell is an apple
    useEffect(()=>{
        const [appleX,appleY] = props.apple;
        setIsApple(props.x == appleX&&props.y==appleY)
    })

    // determining of the cell is a snake link
    useEffect(()=>{
        const link = props.snake.find(([x,y])=>{
            return props.x == x && props.y == y;
        });
        if(link!=undefined)
            setPartOfSnake(true);
        else
            setPartOfSnake(false);

    },[props.snake])

    return<div className="Cell" style={isApple ? appleStyle : (partOfSnake ? snakeStyle : null)}>
        
    </div>

}

export default Cell;