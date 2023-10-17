import React from "react";

const HEAD = (
    <div style={{
        width: "20px",
        height: "20px",
        borderRadius: "100%",
        border: "5px solid black",
        position: "absolute",
        top: "34px",
        right: "-12px"
    }}/>
)

const BODY = (
    <div style={{
        width: "5px",
        height: "55px",
        background: "black",
        position: "absolute",
        top: "60px",
        right: 0,
    }}/>
)

const RIGHT_ARM = (
    <div style={{
        width: "40px",
        height: "5px",
        background: "black",
        position: "absolute",
        top: "80px",
        right: "-40px",
        rotate: "-30deg",
        transformOrigin: "left bottom"
    }}/>
)

const LEFT_ARM = (
    <div style={{
        width: "40px",
        height: "5px",
        background: "black",
        position: "absolute",
        top: "80px",
        right: "5px",
        rotate: "30deg",
        transformOrigin: "right bottom"
    }}/>
)

const RIGHT_LEG = (
    <div style={{
        width: "55px",
        height: "5px",
        background: "black",
        position: "absolute",
        top: "110px",
        right: "-50px",
        rotate: "60deg",
        transformOrigin: "left bottom"
    }}/>
)

const LEFT_LEG = (
    <div style={{
        width: "55px",
        height: "5px",
        background: "black",
        position: "absolute",
        top: "110px",
        right: "0px",
        rotate: "-60deg",
        transformOrigin: "right bottom"
    }}/>
)

export const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps ) {
    return <div style={{
        position: "relative"

    }}>
     {BODY_PARTS.slice(0, numberOfGuesses)}
        <div style={{
            height: "35px",
            width: "7px",
            background: "black",
            position: "absolute",
            top: 0,
            right: 0,
        }} />
        <div style={{
            height: "7px",
            width: "100px",
            background: "black",
            marginLeft: "45px"
        }} />
        <div style={{
            height: "220px",
            width: "7px",
            background: "black",
            marginLeft: "45px"
        }} />
        <div style={{
            height: "7px",
            width: "90px",
            background: "black"
        }}/>
            

    </div> 
    
}