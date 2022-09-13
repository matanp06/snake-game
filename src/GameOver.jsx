import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React from "react";


function GameOver({restartFunction,quitFunction}){

    return(
        <div style={styles.container}>
            <h1>Game Over</h1>
            <div>            
                {/* restart button */}
                <button
                    onClick={restartFunction}
                    style={styles.button}>
                    <img style={styles.img} src="/images/restart.svg"/>
                    <p>Restart</p>
                </button>
                
                {/* exit button */}
                <button 
                    style={styles.button}
                    onClick={quitFunction}>
                    <img style={styles.img} src="/images/exit.svg"/>
                    <p>Quit</p>
                </button>
            </div>
        </div>
    )

}

export default GameOver;

const styles = {

    container:{
        position: "absolute",
        top:0,
        display:"flex",
        "flex-direction":"column",
        height:"100vh",
        width:"100%",
        "justify-content":"center",
        "align-items":"center",
        "background-color":"#8080808a"
    },

    button:{
        margin: "0 20px",
        "cursor":"pointer",
    },

    img:{
        width:"100px",
        height:"100px",
    }

}