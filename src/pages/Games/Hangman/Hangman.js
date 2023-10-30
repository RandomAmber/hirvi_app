//Based on : https://www.youtube.com/watch?v=-ONUyenGnWw&t=93s

import { useCallback, useEffect, useState } from "react"
import wordsData from "./wordList.json"
import React from "react"
import { HangmanDrawing, BODY_PARTS } from "./HangmanDrawing.tsx"
import { HangmanWord } from "./HangmanWord.tsx"
import { Keyboard } from "./Keyboard.tsx"
import "./Hangman.css"
import Button from "../Button"
import Leaderboard from "../Leaderboard"

function getWord(sectionIndex) {
  const section = wordsData[sectionIndex]
  const wordsInSection = section.words
  const randomIndex = Math.floor(Math.random() * wordsInSection.length)
  return wordsInSection[randomIndex].toUpperCase()
}

function Hangman() {
  const randomLetter = () => {
    alert("Button randomLetter clicked!")
  }

  const hint = () => {
    alert("Button hint clicked!")
  }

  const newGame = () => {
    setGuessLetters([])
    setWordToGuess(getWord(selectedSection))
  }

  const rules = () => {
    alert("Button rules clicked!")
  }


  const [selectedSection, setSelectedSection] = useState(0)

  const [wordToGuess, setWordToGuess] = useState((getWord(selectedSection)))

  const [guessedLetters, setGuessLetters] = useState([])

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = inCorrectLetters.length >= BODY_PARTS.length
  const isWinner = wordToGuess.split("")
    .every(letter => guessedLetters.includes(letter))


  const handleSectionChange = (selectedIndex) => {
    const sectionIndex = parseInt(selectedIndex, 10)
    setSelectedSection(sectionIndex)
    const newWord = getWord(sectionIndex)
    setWordToGuess(newWord)
    setGuessLetters([])
    setWordToGuess(getWord(sectionIndex))
  }

  const addGuessedLetter = useCallback((letter) => {
    letter = letter.toUpperCase()
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessLetters(currentLetters => [...currentLetters, letter])
  },
    [guessedLetters, isWinner, isLoser])


  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (!key.match(/^[a-zäöå]$/)) return

      e.preventDefault()
      addGuessedLetter(key)

    }
    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }

  }, [guessedLetters])



  return (
    <div className="mainContainer">
      <div className="nameContainer">
        <h1>Hangman</h1>
      </div>
      <div className="areasContainer">
        <div className="leftArea">
          <Button className="button" label="rules" onClick={rules} />
          <Leaderboard game_id={3} limit={5} />
        </div>

        <div className="centreContainer">

          <div className="gameContainer">

            {isWinner && (
              <div className="endGameMessage">
                <p>Great job!</p>
                <Button className="button" label="new game" onClick={newGame} />
                </div>
            )}
            {isLoser && (
              <div className="endGameMessage">
                <p>Nice try!</p>
                <Button className="button" label="new game" onClick={newGame} />
                </div>
            )}
          </div>
          <div className="hangmanArea">
            <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
            <div className="manSpace" />
            <HangmanWord
              reveal={isLoser}
              guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

          </div>
          <div className="keyboard">
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
              inactiveLetters={inCorrectLetters}
              addGuessedLetter={addGuessedLetter} />
          </div>



        </div>
        <div className="rightArea">
        <div className="score_hangman">
          <h3>Your score:</h3>
          </div>
          <Button className="button" label="random letter" onClick={randomLetter} />
          <Button className="button" label="hint" onClick={hint} />
          
        
          <div className="wordSelection">
            <label htmlFor="selectionSelect">Select a word section </label>
            <select
              id="sectionSelect"
              className="styled-select"
              onChange={(e) => handleSectionChange(e.target.value)}
              value={selectedSection}>
              {wordsData.map((section, index) => (
                <option key={index} value={index}>
                  {section.name}
                </option>
              ))}

            </select>
          </div>


        </div>

      </div>


    </div>

  )
}

export default Hangman;