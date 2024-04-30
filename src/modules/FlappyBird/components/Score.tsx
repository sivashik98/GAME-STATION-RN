import {useEffect} from "react";
import {StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming} from "react-native-reanimated";
import LottieView from "lottie-react-native";

import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";

import {COIN_SOURCE} from "../constants";

export const Score = ({isLooser, score, coins}) => {
    const {top} = useSafeAreaInsets()
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)

    useEffect(() => {
        scale.value = withSequence(withSpring(1.2), withSpring(1))
    }, [score])

    useEffect(() => {
        console.log(isLooser)
        opacity.value = isLooser ? withTiming(0) : withTiming(1)
    }, [isLooser])

    const scaleAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}]
    }))
    const opacityAnimatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    return (
        <UIView center style={{marginTop: top + 10}}>
            <UIView reanimated center row style={[scaleAnimatedStyles, opacityAnimatedStyles]}>
                <UIText style={styles.text}>SCORE <UIText
                    style={[styles.text, styles['text-score']]}>{score}</UIText></UIText>
            </UIView>

            <UIView reanimated row center style={[styles.coinContainer, opacityAnimatedStyles]}>
                <LottieView
                    source={COIN_SOURCE}
                    autoPlay
                    loop
                    style={styles.coin}
                />

                <UIText style={styles.text}>X <UIText
                    style={[styles.text, styles['text-score']]}>{coins}</UIText></UIText>
            </UIView>
        </UIView>
    )
}


const styles = StyleSheet.create({
    coinContainer: {
        position: 'absolute',
        left: 0,
        top: -17,
    },
    coin: {
        width: 60,
        height: 60,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0}
    },
    text: {
        fontSize: 20,
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 1.5,
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 0},
        shadowColor: '#000',
        shadowRadius: 2
    },
    'text-score': {
        fontWeight: 'bold',
    }
});
