import {memo} from "react";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";

import {DEATH_SOURCE} from "../constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";

export const Death = memo(({}) => {
    return (
        <LottieView
            source={DEATH_SOURCE}
            autoPlay
            loop
            style={styles.lottie_death}
        />
    )
})

const styles = StyleSheet.create({
    lottie_death: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2.2,
        position: 'absolute',
        bottom: 0
    }
})
