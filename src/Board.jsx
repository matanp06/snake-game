import React from "react";
import Cell from "./Cell";

function Board(props){

    // rendering the board according to the snake and apple position
    function renderBoard(){
        const Board = [];

        for(let x = 0; x<10; x++){
            for(let y = 0; y<10; y++){
                Board.push(<Cell 
                    key={x+10*y} 
                    x={x} y={y} 
                    snake={props.snake}
                    apple={props.apple}
                    />);
            }
        }
        return Board;
    }

    return<div className="Board">
        {renderBoard()}
    </div>

}

export default Board;