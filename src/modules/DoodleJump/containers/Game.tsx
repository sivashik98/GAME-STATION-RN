import {useEffect, useState, useCallback} from "react";
import {StyleSheet} from "react-native";
import {GameEngine} from 'react-native-game-engine';
import {impactAsync, ImpactFeedbackStyle} from "expo-haptics";
import {Audio} from "expo-av";

import {Score} from "../components/Score";
import {Death} from "../components/Death";
import {UIView} from "../../../components/UIView";
import {Background} from "../components/Background";
import {EnemyOverlay} from "../components/EnemyOverlay";

import entities from '../entities';
import Physics from '../physics';
import {
    DEFAULT_PLATFORM_SOUND_SOURCE,
    JUMPING_PLATFORM_SOUND_SOURCE,
    GAME_SOUND_SOURCE,
    MUSIC_CONFIG,
    PLATFORM_JUMPING,
    GAME_OVER,
    JUMP,
    SCORE,
} from "../constants";


export const Game = ({
                         gameEngineRef,
                         isRunning,
                         score,
                         onChangeScore,
                         onLoose
                     }) => {
    const [jumpingPlatformSound, setJumpingPlatformSound] = useState();
    const [defaultPlatformSound, setDefaultPlatformSound] = useState();
    const [gameSound, setGameSound] = useState();

    useEffect(() => {
        const downloadSound = async () => {
            const {sound: defaultPlatformSound} = await Audio.Sound.createAsync(DEFAULT_PLATFORM_SOUND_SOURCE, MUSIC_CONFIG.defaultPlatform);
            const {sound: jumpingPlatformSound} = await Audio.Sound.createAsync(JUMPING_PLATFORM_SOUND_SOURCE, MUSIC_CONFIG.jumpingPlatform);
            const {sound: gameSound} = await Audio.Sound.createAsync(GAME_SOUND_SOURCE, MUSIC_CONFIG.game);

            setJumpingPlatformSound(jumpingPlatformSound);
            setDefaultPlatformSound(defaultPlatformSound);
            setGameSound(gameSound);
        }
        downloadSound()
    }, [])
    useEffect(() => {
        return () => {
            jumpingPlatformSound?.unloadAsync()
        }
    }, [jumpingPlatformSound])
    useEffect(() => {
        return () => {
            defaultPlatformSound?.unloadAsync()
        }
    }, [defaultPlatformSound])
    useEffect(() => {
        return () => {
            gameSound?.unloadAsync()
        }
    }, [gameSound])
    useEffect(() => {
        if (isRunning) {
            gameSound?.setPositionAsync(0);
            gameSound?.playAsync()
        } else {
            gameSound?.stopAsync()
        }
    }, [gameSound, isRunning])

    const handleEvent = useCallback(async ({type, platformType}) => {
        if (type === GAME_OVER) {
            onLoose()
        }
        if (type === JUMP) {
            await impactAsync(ImpactFeedbackStyle.Light);
            if (platformType === PLATFORM_JUMPING) {
                await jumpingPlatformSound?.stopAsync();
                await jumpingPlatformSound?.setPositionAsync(0);
                await jumpingPlatformSound?.playAsync();
            } else {
                await defaultPlatformSound?.stopAsync();
                await defaultPlatformSound?.setPositionAsync(0);
                await defaultPlatformSound?.playAsync();
            }
        }
        if (type === SCORE) {
            onChangeScore(prevState => prevState + 150)
        }
    }, [defaultPlatformSound, jumpingPlatformSound])


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
            {isRunning && (
                <>
                    <Death/>
                    <EnemyOverlay/>
                    <Score score={score}/>
                </>
            )}
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
});
