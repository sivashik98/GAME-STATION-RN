import {useState, useRef} from "react";
import {UIView} from "../../components/UIView";

import {Game} from "./containers/Game";
import {Menu} from "./components/Menu";
import {StartGameOverlay} from "./components/StartGameOverlay";
import {LooseGameOverlay} from "./components/LooseGameOverlay";

import entities from "./entities";

export const DoodleJump = () => {
    const [isRunning, setIsRunning] = useState(false)
    const [isFirstGame, setIsFirstGame] = useState(true)
    const [shouldShowLooseGameOverlay, setShouldShowLooseGameOverlay] = useState(false)
    const [shouldShowStartGameOverlay, setShouldShowStartGameOverlay] = useState(false)
    const [shouldShowMenu, setShouldShowMenu] = useState(false)
    const [score, setScore] = useState(0)
    const gameEngineRef = useRef()

    const handleLooseGame = () => {
        setIsRunning(false)
        gameEngineRef.current.swap(entities())
        setShouldShowLooseGameOverlay(true)

        setTimeout(() => {
            setShouldShowLooseGameOverlay(false)
            setShouldShowMenu(true)
        }, 3000)
    }

    const handleStartGame = () => {
        setIsFirstGame(false)
        setShouldShowMenu(false)
        setShouldShowStartGameOverlay(true)

        setTimeout(() => {
            setIsRunning(true)
            gameEngineRef.current.start()
            setShouldShowStartGameOverlay(false)
        }, 4500)
    }

    return (
        <UIView flex>
            <Game
                gameEngineRef={gameEngineRef}
                isRunning={isRunning}
                score={score}
                onChangeScore={setScore}
                onLoose={handleLooseGame}
            />
            <LooseGameOverlay shouldShow={shouldShowLooseGameOverlay}/>
            <StartGameOverlay shouldShow={shouldShowStartGameOverlay}/>
            <Menu shouldShow={shouldShowMenu || isFirstGame} onStart={handleStartGame}/>
        </UIView>
    )
}
