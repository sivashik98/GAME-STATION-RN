import {useEffect} from "react";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from "react-native-reanimated";

import {UIView} from "../../../components/UIView";

import {BACKGROUND_SOURCE} from "../constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";

export const Background = ({}) => {
    const translateX = useSharedValue(0)

    useEffect(() => {
        translateX.value = withRepeat(withSequence(withTiming(-50, {duration: 15000}), withTiming(0, {duration: 15000})), -1)
    }, [])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}]
    }))


    return (
        <UIView reanimated style={[styles.lottie_background, animatedStyles]}>
            <LottieView
                source={BACKGROUND_SOURCE}
                autoPlay
                loop
                style={styles.lottie_background}
            />
        </UIView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
    },
    lottie_background: {
        width: SCREEN_WIDTH * 1.2,
        height: SCREEN_HEIGHT,
        position: "absolute",
        transform: [{scale: 1.1}],
        zIndex: -1,
    }
})
