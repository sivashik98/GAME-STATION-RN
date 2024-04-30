import {useEffect, memo} from "react";
import {StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAnimatedStyle, useSharedValue, withSequence, withSpring} from "react-native-reanimated";

import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";

type ScoreProps = {
    score: number
}

export const Score = memo(({score}: ScoreProps) => {
    const {top} = useSafeAreaInsets()
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)

    useEffect(() => {
        scale.value = withSequence(withSpring(1.1), withSpring(1))
    }, [score])

    const scaleAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}]
    }))
    const opacityAnimatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    return (
        <UIView reanimated center row style={[{marginTop: top + 10}, scaleAnimatedStyles, opacityAnimatedStyles]}>
            <UIText style={styles.text}>SCORE <UIText
                style={[styles.text, styles['text-score']]}>{score}</UIText></UIText>
        </UIView>
    )
})


const styles = StyleSheet.create({
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
