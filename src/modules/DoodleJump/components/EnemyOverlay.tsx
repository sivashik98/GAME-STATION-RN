import {useRef, useEffect, useState, memo} from "react";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {
    Easing,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {Audio} from "expo-av";
import {Image} from "expo-image";
import {TouchableOpacity} from "react-native-gesture-handler";

import {UIView} from "../../../components/UIView";

import {
    MUSIC_CONFIG,
    GENIE_SOURCE,
    GENIE_SOUND_SOURCE,
    KNOCKOUT_SOUND_SOURCE,
    GENIE_APPEAR_TIME,
    GENIE_MAGIC_SOURCE,
    HITS_TO_KILL_GENIE, INTERVAL_GENIE_APPEAR,
} from "../constants";

export const EnemyOverlay = memo(({}) => {
    const [shouldShow, setShouldShow] = useState(false);
    const [hits, setHits] = useState(0);
    const [genieSound, setGenieSound] = useState();
    const [knockoutSound, setKnockoutSound] = useState();
    const menuTranslateY = useSharedValue(0)
    const progress = useSharedValue(0);
    const lottieMagicRef = useRef()
    const lottieSecondMagicRef = useRef()

    useEffect(() => {
        const intervalId = setInterval(async () => setShouldShow(true), INTERVAL_GENIE_APPEAR)
        const downloadSound = async () => {
            const {sound: genieSound} = await Audio.Sound.createAsync(GENIE_SOUND_SOURCE, MUSIC_CONFIG.genie);
            const {sound: knockoutSound} = await Audio.Sound.createAsync(KNOCKOUT_SOUND_SOURCE, MUSIC_CONFIG.knockout);

            setGenieSound(genieSound);
            setKnockoutSound(knockoutSound)
        }
        downloadSound()
        menuTranslateY.value = withRepeat(withSequence(withTiming(-30, {duration: 1000}), withTiming(0, {duration: 1000})), -1)
        return () => clearInterval(intervalId)
    }, [])
    useEffect(() => {
        return () => genieSound?.unloadAsync()
    }, [genieSound])
    useEffect(() => {
        return () => knockoutSound?.unloadAsync()
    }, [knockoutSound])
    useEffect(() => {
        if (shouldShow) {
            genieSound?.setPositionAsync(0)
            genieSound?.playAsync()
            lottieMagicRef?.current.reset()
            lottieMagicRef?.current.play()
            lottieSecondMagicRef?.current.reset()
            lottieSecondMagicRef?.current.play()
            progress.value = withTiming(1, {duration: GENIE_APPEAR_TIME, easing: Easing.linear});
        } else {
            progress.value = 0
        }
    }, [shouldShow])

    const handleHit = () => {
        if (shouldShow) {
            setHits(prevState => prevState + 1)
            if (hits >= HITS_TO_KILL_GENIE) {
                knockoutSound?.setPositionAsync(0)
                knockoutSound?.playAsync()
                setShouldShow(false)
                setHits(0)
            }
        }
    }

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        zIndex: shouldShow ? withTiming(1) : withTiming(0),
        opacity: shouldShow ? withTiming(1) : withTiming(0),
        backgroundColor: interpolateColor(progress.value, [0, 1], ['rgba(255,113,113, 0)', 'rgba(255,113,113, 1)'])
    }))

    const genieAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: menuTranslateY.value}]
    }))

    return (
        <UIView reanimated center style={[styles.container, containerAnimatedStyles]}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleHit}>
                <UIView reanimated style={[styles.containerGenie, genieAnimatedStyles]}>
                    <Image source={GENIE_SOURCE} style={{width: 300, height: 320}}/>
                </UIView>
            </TouchableOpacity>
            <LottieView
                ref={lottieMagicRef}
                source={GENIE_MAGIC_SOURCE}
                autoPlay
                style={[styles.lottie_magic, styles['lottie_magic-top']]}
            />
            <LottieView
                ref={lottieSecondMagicRef}
                source={GENIE_MAGIC_SOURCE}
                autoPlay
                style={[styles.lottie_magic, styles['lottie_magic-bottom']]}
            />
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
    },
    containerGenie: {
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 1000,
    },
    lottie_magic: {
        width: 200,
        height: 200,
        position: 'absolute',
    },
    'lottie_magic-top': {
        left: 0,
        top: 0,
    },
    'lottie_magic-bottom': {
        bottom: 0,
        right: 0,
        transform: [{rotate: '260deg'}]
    },
})
