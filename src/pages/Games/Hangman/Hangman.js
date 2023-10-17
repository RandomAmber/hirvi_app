//Based on : https://www.youtube.com/watch?v=-ONUyenGnWw&t=93s

import { useCallback, useEffect, useState } from "react"
import wordsData from "./wordList.json"
import React from "react"
import { HangmanDrawing, BODY_PARTS } from "./HangmanDrawing.tsx"
import { HangmanWord } from "./HangmanWord.tsx"
import { Keyboard } from "./Keyboard.tsx"

function getWord(sectionIndex) {
  const section = wordsData[sectionIndex]
  const wordsInSection = section.words
  const randomIndex = Math.floor(Math.random() * wordsInSection.length)
  return wordsInSection[randomIndex].toUpperCase()
}

function Hangman() {
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

  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessLetters([])
      setWordToGuess(getWord(selectedSection))
    }

    document.addEventListener("keypress", handler)
    return () => {
      document.removeEventListener("keypress", handler)
    }

  }, [selectedSection])



  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{
        fontSize: "2rem",
        textAlign: "center",
      }}>
        {isWinner && "Oikein hyvä! - Press 'enter' to try again"}
        {isLoser && "Nice try! - Press 'enter' to try again"}
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
        <div style={{
          marginLeft: "8rem"
        }} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      </div>
      <div style={{
        alignSelf: "stretch"
      }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter} />
      </div>

      <div>
        <label htmlFor="selectionSelect">Select a word section </label>
        <select
        id="sectionSelect"
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
  )
}

export default Hangman;