import {useEffect, memo} from "react";
import {StyleSheet} from "react-native";
import {Image} from "expo-image";
import {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from "react-native-reanimated";

import {UIView} from "../../../components/UIView";

import {BACKGROUND_SOURCE} from "../constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";

const CONFIG = {
    duration: 30000
}

export const Background = memo(({}) => {
    const translateX = useSharedValue(0)

    useEffect(() => {
        translateX.value = withRepeat(withSequence(withTiming(-400, CONFIG), withTiming(0, CONFIG)), -1)
    }, [])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}]
    }))

    return (
        <UIView reanimated style={[styles.container, animatedStyles]}>
            <Image source={BACKGROUND_SOURCE} style={styles.background}/>
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
        zIndex: -1,
    },
    background: {
        width: SCREEN_WIDTH * 2.5,
        height: SCREEN_HEIGHT,
        position: "absolute",
    },
})
