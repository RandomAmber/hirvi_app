import NavbarGames from "./NavbarGames"
import Number from "./Number"

export default function Numbers() {
    return (
        <>
        <div className="container">
        <h1>Numbers!</h1>
        <Number button_count={10} max_level={3}/>
        </div>

        </>
   
    )
}