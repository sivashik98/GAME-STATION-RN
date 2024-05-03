import {memo} from "react";
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-ui-lib";
import {GestureDetector, Gesture} from "react-native-gesture-handler";
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";

export const Button = memo(({title, onPress}) => {
    const scale = useSharedValue(1)
    const tap = Gesture.Tap().onBegin(() => {
        scale.value = 0.9
    }).onFinalize(() => {
        scale.value = 1
    });
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{scale: withTiming(scale.value)}]
    }))

    return (
        <GestureDetector gesture={tap}>
            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
                <UIView reanimated center style={[styles.button, animatedStyles]}>
                    <UIText style={styles.text}>{title}</UIText>
                </UIView>
            </TouchableOpacity>
        </GestureDetector>
    )
})


const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderColor: '#000',
        padding: 10,
        backgroundColor: '#9e6a00',
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    }
});
