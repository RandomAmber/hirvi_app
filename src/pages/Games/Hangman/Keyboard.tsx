import React from "react"
import styles from "./Keyboard.module.css"
const KEYS = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "Å", "Ä", "Ö"
];

type KeyboardProps = {
    disabled?: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
}

export function Keyboard({ disabled = false, activeLetters, inactiveLetters, addGuessedLetter }: KeyboardProps) {
    return (<div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
        gap: ".5rem",
    }}>
        {KEYS.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)

            return <button
                onClick={() => addGuessedLetter(key)}
                className={`${styles.btn} ${isActive ? styles.active : ""}
            ${isInactive ? styles.inactive : ""}`}
                disabled={isInactive || isActive || disabled}
                key={key}>{key}</button>
        })}

    </div>
    )
}