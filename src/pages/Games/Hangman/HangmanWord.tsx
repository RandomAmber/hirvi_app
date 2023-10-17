import React from "react"

type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({guessedLetters, wordToGuess, reveal = false}: HangmanWordProps) {
    const normalizedWordToGuess = wordToGuess.toUpperCase();
    return (
    <div style={{
        display: "flex",

        gap: ".25em",
        fontSize: "4rem",
        fontWeight: "bold",
        textTransform: "lowercase",
        fontFamily: "monospace"
    }}>
        {normalizedWordToGuess.split("").map((letter, index) =>
        ((<span style={{
            borderBottom: ".1em solid black"
        }} key={index}>
            <span style={{
                visibility: guessedLetters.includes(letter) || reveal ? "visible"
                :"hidden",
                color: !guessedLetters.includes(letter) && reveal ? "green" : "black"
            }}> {letter}</span>
               </span>)))}

    </div>
    )
}
