class Snake{

    constructor([x,y]){
        this.links = [[x,y]];
    }

    //returns a the snake links array
    getSnake(){
        return [...this.links];
    }

    // return the last link in the array
    getSnakeHead(){
        return this.links[this.links.length-1];
    }

    //moves the snake to the next cell in the board
    moveSnake(cell){
        this.links.shift();
        this.links.push(cell);
    }

    //Checks if the snake's head is on the same position
    // of his other links
    isBitten(){
        const [headX,headY] = this.getSnakeHead();
        const bittenCell = this.links.find(([x,y],index)=>{
            return headX == x && headY == y && index!=this.links.length-1
        })

        return bittenCell != undefined;
    }

    // add one link to the snake
    eat(cell){
        this.links.push(cell);
    }

    // isSnakeLink([x,y]){
    //     const result = this.links.find(([linkX,linkY])=>{
    //         return x==linkX&&y==linkY;
    //     })

    //     return result!=undefined;
    // }

}

export default Snake;