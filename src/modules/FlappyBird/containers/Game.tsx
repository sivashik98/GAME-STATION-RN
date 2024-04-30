import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {GameEngine} from 'react-native-game-engine';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {impactAsync, ImpactFeedbackStyle} from "expo-haptics";
import {Audio} from "expo-av";

import {Score} from "../components/Score";
import {UIView} from "../../../components/UIView";
import {Hamburger} from "../components/Hamburger";
import {Background} from "../components/Background";

import entities from '../entities';
import Physics from '../physics';
import {COIN_SOUND_SOURCE, COLLECT, DIE_SOUND_SOURCE, GAME_OVER, SCORE} from "../constants";

export const Game = ({
                         isRunning,
                         isLooser,
                         gameEngineRef,
                         score,
                         coins,
                         onChangeScore,
                         onChangeCoins,
                         onStop,
                         onLoose
                     }) => {
    const {top} = useSafeAreaInsets()
    const [dieSound, setDieSound] = useState();
    const [coinSound, setCoinSound] = useState();

    useEffect(() => {
        const downloadSound = async () => {
            const {sound: coinSound} = await Audio.Sound.createAsync(COIN_SOUND_SOURCE);
            const {sound: dieSound} = await Audio.Sound.createAsync(DIE_SOUND_SOURCE);

            setCoinSound(coinSound);
            setDieSound(dieSound);
        }

        downloadSound()

        return () => {
            dieSound?.unloadAsync()
            coinSound?.unloadAsync()
        };
    }, [])

    useEffect(() => {
        return () => {
            dieSound?.unloadAsync()
        }
    }, [dieSound])
    useEffect(() => {
        return () => {
            coinSound?.unloadAsync()
        }
    }, [coinSound])

    const handleEvent = async ({type}) => {
        if (type === GAME_OVER) {
            await dieSound.setPositionAsync(0);
            await dieSound.playAsync();
            onStop()
            onLoose()
            impactAsync(ImpactFeedbackStyle.Heavy);
        }
        if (type === SCORE) {
            onChangeScore(score + 1)
        }
        if (type === COLLECT) {
            onChangeCoins(coins + 1)
            impactAsync(ImpactFeedbackStyle.Light);
            await coinSound.setPositionAsync(0);
            await coinSound.playAsync();
        }
    }

    return (
        <UIView flex>
            <GameEngine
                ref={gameEngineRef}
                entities={entities()}
                systems={[Physics]}
                running={isRunning}
                onEvent={handleEvent}
                style={styles.gameEngine}
            />
            <Background/>
            <Score isLooser={isLooser} score={score} coins={coins}/>
            <UIView style={[styles.hamburgerContainer, {top}]}>
                <Hamburger shouldShow={isRunning} onPress={onStop}/>
            </UIView>
        </UIView>
    )
}


const styles = StyleSheet.create({
    gameEngine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    hamburgerContainer: {
        position: 'absolute',
        right: 10
    },
});
