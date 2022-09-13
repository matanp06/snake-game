import React, { useEffect } from "react";
import {directions} from "./App"

// the startign position of the lastest touch. 
// initially unset
let startingXPosition;
let startingYPosition;
window.addEventListener("load",()=>window.scrollTo(0,1));

function SwipeControl({setDirection}){

    useEffect(()=>{
        document.getElementById("swipe-control").addEventListener("touchstart",(e)=>{
            // setting the touch start cordinates
            startingXPosition = e.touches[0].clientX;
            startingYPosition = e.touches[0].clientY;
            e.preventDefault();
        })
        
        document.getElementById("swipe-control").addEventListener("touchend",(e)=>{
            // setting the cordination of where the touch end
            const endXPosition = e.changedTouches[0].clientX;
            const endYPosition = e.changedTouches[0].clientY;

            //detecting the swipe direction
            const direction = swipeDirection(endXPosition,endYPosition);
            //changing the direction ofthe snake movement.
            setDirection(direction);

            e.preventDefault();
        })
    },[])

    function swipeDirection(endXPosition,endYPosition){

        // calculating the distance between the start of the touch
        // and the end of the touch on the x,y axisses
        const deltaX = endXPosition - startingXPosition;
        const deltaY = endYPosition - startingYPosition;

        // Determining which distance was more significant
        if(Math.abs(deltaX)>Math.abs(deltaY)){

            return deltaX>0 ? directions.right : directions.left;
    
        } else {

            return deltaY>0 ? directions.down : directions.up;

        }
    
    }

    return(
        <div id="swipe-control">
            <div>
                <img src="images/4-dir-arrow.svg" />
                <p>Swipe to the wanted direction</p>    
            </div>
        </div>
    )

}

export default SwipeControl;