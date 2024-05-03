import {useEffect, memo} from "react";
import {StyleSheet} from "react-native";
import {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from "react-native-reanimated";
import {Image} from "expo-image";

import {UIView} from "../../../components/UIView";

import {BACKGROUND_SOURCE} from "../constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";

const CONFIG = {
    duration: 25000
}

export const Background = memo(({}) => {
    const translateX = useSharedValue(0)

    useEffect(() => {
        translateX.value = withRepeat(withSequence(withTiming(-500, CONFIG), withTiming(0, CONFIG)), -1)
    }, [])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}]
    }))


    return (
        <UIView reanimated style={[styles.container, animatedStyles]}>
            <Image source={BACKGROUND_SOURCE} style={[styles.container, styles.lottie_background]}/>
        </UIView>
    )
})

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: -1,
    },
    lottie_background: {
        width: SCREEN_WIDTH * 3.5,
        height: SCREEN_HEIGHT,
    }
})
