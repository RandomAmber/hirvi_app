import React, { useEffect, useState } from 'react';

export default function Number({ button_count, max_level}) {

    var max_number = 100

    var number = Math.round(Math.random() * max_number)

    var path = require('./sounds/number' + number.toString() + '.mp3')
    const sound = new Audio(path)

    useEffect(() => {
        sound.load();
    }, [])

    const [level, setLevel] = useState({
        level: 1,
        score: 0
      });

    const playSound = () => {
        sound.play();
    }


    function Player({sound}){
        return (
            <div>
                <button onClick={playSound}>
                {'Listen'}
                </button>
            </div>
            
        );
    }


    const arr = [number];

    while (arr.length!=button_count){
        var random_number = Math.round(Math.random() * max_number)
        if (!arr.includes(random_number)){
            arr.push(random_number)
        }
    }

    var right_answer_index = Math.round(Math.random() * (button_count-1))
    var tmp = arr[right_answer_index]
    arr[right_answer_index] = number
    arr[0] = tmp

    function handleRightClick() {
        alert('That\'s right!');
        setLevel({
            level: level.level + 1,
            score: level.score + 1
        });
    }

    function handleWrongClick(){
        alert('Wrong answer =(');
        setLevel({
            level: level.level + 1,
            score: level.score
        });
    }

    function Button({number, onClick}){
    
        return (
        <button onClick={onClick}>
            {number}
        </button>
        );
    }

    const buttons = [];
    
    for (var i=0; i<button_count; i++) {
        if (i==right_answer_index){
            buttons.push(<Button number={arr[i]} onClick={handleRightClick}/>)
        }
        else{
            buttons.push(<Button number={arr[i]} onClick={handleWrongClick}/>)
        }
    }
    if (level.level > max_level){
        return <p>This is the end of the game. Your final score is {level.score} of {level.level-1}</p>
    }
    else{
        return <>
        <p>Score: {level.score}    Level: {level.level} of {max_level}</p>
        {Player({sound})}
        {buttons} 
        </>
    }
  }
