import {useRef, useEffect, useState, memo} from "react";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {Audio} from "expo-av";

import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";

import {
    GHOST_SOURCE,
    DEATH_SOUND_SOURCE,
    MUSIC_CONFIG
} from "../constants";
import {SCREEN_WIDTH} from "../../../constants";

type LooseGameOverlayProps = {
    shouldShow: boolean
}

export const LooseGameOverlay = memo(({shouldShow}: LooseGameOverlayProps) => {
    const [deathSound, setDeathSound] = useState();
    const lottieRef = useRef()

    useEffect(() => {
        const downloadSound = async () => {
            const {sound: deathSound} = await Audio.Sound.createAsync(DEATH_SOUND_SOURCE, MUSIC_CONFIG.death);
            setDeathSound(deathSound);
        }
        downloadSound()
    }, [])
    useEffect(() => {
        return () => deathSound?.unloadAsync()
    }, [deathSound])
    useEffect(() => {
        if (shouldShow) {
            deathSound?.setPositionAsync(0)
            deathSound?.playAsync()
            lottieRef.current.reset()
            lottieRef.current.play()
        }
    }, [shouldShow])

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        zIndex: shouldShow ? withTiming(1) : withTiming(0),
        opacity: shouldShow ? withTiming(1) : withTiming(0),
    }))

    if (!shouldShow) return null

    return (
        <UIView reanimated center style={[styles.container, containerAnimatedStyles]}>
            <UIView style={styles.containerText}>
                <UIText style={styles.text}>YOU LOST</UIText>
            </UIView>
            <UIView style={styles.containerGhost}>
                <LottieView
                    ref={lottieRef}
                    source={GHOST_SOURCE}
                    style={styles.lottie_ghost}
                />
            </UIView>
        </UIView>
    )
})

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    containerText: {
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#fff',
        paddingVertical: 30,
        borderRadius: 20,
        marginBottom: 20,
        width: SCREEN_WIDTH / 1.5,
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 2,
        textShadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0.5,
        textAlign: 'center',
    },
    containerGhost: {
        padding: 40,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 1000,
    },
    lottie_ghost: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2,
        borderRadius: 1000,
    },
})
