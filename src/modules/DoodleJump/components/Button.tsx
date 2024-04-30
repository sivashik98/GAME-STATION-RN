import {useState, useEffect, memo} from "react";
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-ui-lib";
import {GestureDetector, Gesture} from "react-native-gesture-handler";
import {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Audio} from "expo-av";

import {UIText} from "../../../components/UIText";
import {UIView} from "../../../components/UIView";

import {BUTTON_PRESS_SOUND_SOURCE} from "../constants";

type ButtonProps = {
    title: string,
    onPress: () => void
}

export const Button = memo(({title, onPress}: ButtonProps) => {
    const [sound, setSound] = useState();
    const scale = useSharedValue(1)
    const tap = Gesture.Tap().onBegin(() => {
        scale.value = 0.9
    }).onFinalize(() => {
        scale.value = 1
    });
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{scale: withTiming(scale.value)}]
    }))

    useEffect(() => {
        const downloadSound = async () => {
            const {sound} = await Audio.Sound.createAsync(BUTTON_PRESS_SOUND_SOURCE);
            setSound(sound);
        }
        downloadSound()
    }, [])

    useEffect(() => {
        return () => {
            sound?.unloadAsync()
        }
    }, [sound])

    const handlePress = async () => {
        await sound?.setPositionAsync(0);
        await sound?.playAsync();
        onPress?.()
    }

    return (
        <GestureDetector gesture={tap}>
            <TouchableOpacity activeOpacity={1} onPress={handlePress}>
                <UIView reanimated center style={[styles.button, animatedStyles]}>
                    <UIText style={styles.text}>{title}</UIText>
                </UIView>
            </TouchableOpacity>
        </GestureDetector>
    )
})


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#acacac',
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "700",
        textAlign: 'center',
    }
});
