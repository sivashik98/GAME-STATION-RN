import {useRef, useEffect, useState, memo} from "react";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {Audio, AVPlaybackStatus} from "expo-av";

import {UIView} from "../../../components/UIView";

import {
    COUNTDOWN_SOURCE,
    OVERLAY_START_SOUND_SOURCE,
    OVERLAY_START_2_SOUND_SOURCE,
    OVERLAY_START_3_SOUND_SOURCE
} from "../constants";
import {SCREEN_WIDTH} from "../../../constants";
import {getRandomFromRange} from "../utils";

type StartGameOverlayProps = {
    shouldShow: boolean
}

const getRandomSound = (...sounds: AVPlaybackStatus[]) => sounds[getRandomFromRange({min: 0, max: 2})]

export const StartGameOverlay = memo(({shouldShow}: StartGameOverlayProps) => {
    const [startSound, setStartSound] = useState()
    const [startSecondSound, setStartSecondSound] = useState()
    const [startThirdSound, setStartThirdSound] = useState()
    const lottieRef = useRef()

    useEffect(() => {
        const downloadSound = async () => {
            const {sound: startSound} = await Audio.Sound.createAsync(OVERLAY_START_SOUND_SOURCE);
            const {sound: startSecondSound} = await Audio.Sound.createAsync(OVERLAY_START_2_SOUND_SOURCE);
            const {sound: startThirdSound} = await Audio.Sound.createAsync(OVERLAY_START_3_SOUND_SOURCE);

            setStartSound(startSound)
            setStartSecondSound(startSecondSound)
            setStartThirdSound(startThirdSound)
        }
        downloadSound()
    }, [])
    useEffect(() => {
        return () => startSound?.unloadAsync()
    }, [startSound])
    useEffect(() => {
        return () => startSecondSound?.unloadAsync()
    }, [startSecondSound])
    useEffect(() => {
        return () => startThirdSound?.unloadAsync()
    }, [startThirdSound])
    useEffect(() => {
        if (shouldShow) {
            const randomSound = getRandomSound(startSound, startSecondSound, startThirdSound)
            randomSound?.setPositionAsync(0)
            randomSound?.playAsync()
            lottieRef.current.reset()
            lottieRef.current.play()
        }
    }, [shouldShow, startSound, startSecondSound, startThirdSound])

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        zIndex: shouldShow ? withTiming(1) : withTiming(0),
        opacity: shouldShow ? withTiming(1) : withTiming(0),
    }))

    if (!shouldShow) return null

    return (
        <UIView reanimated center style={[styles.container, containerAnimatedStyles]}>
            <UIView style={styles.containerCountdown}>
                <LottieView
                    ref={lottieRef}
                    source={COUNTDOWN_SOURCE}
                    style={styles.lottie_countdown}
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

    containerCountdown: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 1000,
    },
    lottie_countdown: {
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2,
    },
})
