import {useState, useRef, useEffect} from "react";
import {UIView} from "../../components/UIView";
import {Audio} from "expo-av";
import {useNavigation} from "@react-navigation/native";

import {Game} from "./containers/Game";
import {Menu} from "./components/Menu";

import entities from './entities';
import {BACKGROUND_SOUND_SOURCE, MUSIC_CONFIG} from "./constants";

export const FlappyBird = () => {
    const gameEngineRef = useRef()
    const {goBack} = useNavigation()
    const [isFirstPlay, setIsFirstPlay] = useState(true)
    const [isRunning, setIsRunning] = useState(false)
    const [isLooser, setIsLooser] = useState(false)
    const [score, setScore] = useState(0)
    const [coins, setCoins] = useState(0)
    const [sound, setSound] = useState();
    const BUTTONS = isLooser ? [{
        title: 'Play again', onPress: () => {
            setIsRunning(true)
            setIsLooser(false)
            setScore(0)
            setCoins(0)
            gameEngineRef.current.swap(entities())
        }
    }, {title: 'Go back', onPress: goBack}] : isFirstPlay ? [{
        title: 'Play', onPress: () => {
            setIsRunning(true)
            setIsFirstPlay(false)
        }
    }, {title: 'Go back', onPress: goBack}] : [{title: 'Resume', onPress: () => setIsRunning(true)}, {
        title: 'Go back',
        onPress: goBack
    }]

    useEffect(() => {
        const downloadSound = async () => {
            const {sound} = await Audio.Sound.createAsync(BACKGROUND_SOUND_SOURCE, MUSIC_CONFIG.background);
            setSound(sound);
            await sound?.playAsync()
        }

        downloadSound()
    }, [])

    useEffect(() => {
        return () => sound?.unloadAsync()
    }, [sound])


    return (
        <UIView flex>
            <Game
                gameEngineRef={gameEngineRef}
                isRunning={isRunning}
                isLooser={isLooser}
                score={score}
                coins={coins}
                onChangeScore={setScore}
                onChangeCoins={setCoins}
                onStop={() => {
                    setIsRunning(false)
                    gameEngineRef.current.stop()
                }}
                onLoose={() => setIsLooser(true)}
            />
            <Menu isLooser={isLooser} score={score} coins={coins} shouldShow={!isRunning} buttons={BUTTONS}/>
        </UIView>
    )
}
