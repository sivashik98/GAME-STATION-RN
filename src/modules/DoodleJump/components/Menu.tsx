import {useState, useEffect, memo} from "react";
import {StyleSheet} from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {Audio} from "expo-av";
import LottieView from "lottie-react-native";
import {Image} from "expo-image";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

import {UIView} from "../../../components/UIView";
import {Button} from "./Button";
import {UIText} from "../../../components/UIText";
import {DEATH_SOURCE, MENU_SOUND_SOURCE, MENU_SOURCE, TG_USERNAME} from "../constants";
import {openLink} from "../utils";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";
import {useNavigation} from "@react-navigation/native";

type MenuProps = {
    shouldShow: boolean,
    onStart: () => void
}

const FireBorder = memo(({}) => {
    return (
        <UIView style={styles.borderFire}>
            <LottieView
                source={DEATH_SOURCE}
                autoPlay
                loop
                style={[styles.lottie_fire, styles['lottie_fire-top']]}
            />
            <LottieView
                source={DEATH_SOURCE}
                autoPlay
                loop
                style={[styles.lottie_fire, styles['lottie_fire-bottom']]}
            />
        </UIView>
    )
})

export const Menu = memo(({shouldShow, onStart}: MenuProps) => {
    const {goBack} = useNavigation()
    const [menuSound, setMenuSound] = useState();
    const menuTranslateY = useSharedValue(0)

    useEffect(() => {
        const downloadSound = async () => {
            const {sound: menuSound} = await Audio.Sound.createAsync(MENU_SOUND_SOURCE);
            setMenuSound(menuSound);
        }
        downloadSound()

        menuTranslateY.value = withRepeat(withSequence(withTiming(-10, {duration: 1000}), withTiming(0, {duration: 1000})), -1)
    }, [])
    useEffect(() => {
        return () => {
            menuSound?.unloadAsync()
        }
    }, [menuSound])
    useEffect(() => {
        if (shouldShow) {
            menuSound?.setPositionAsync(0);
            menuSound?.playAsync();
        } else {
            menuSound?.stopAsync();
        }
    }, [shouldShow, menuSound])

    const containerAnimatedStyles = useAnimatedStyle(() => ({
        zIndex: shouldShow ? withTiming(1) : withTiming(-1),
        opacity: shouldShow ? withTiming(1) : withTiming(0),
    }))

    const menuAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: menuTranslateY.value}]
    }))

    const onPressThanks = async () => {
        await openLink(TG_USERNAME)
    }

    return (
        <UIView reanimated center style={[styles.container, containerAnimatedStyles]}>
            <FireBorder/>
            <Image source={MENU_SOURCE} style={styles.backgroundImage}/>
            <UIView centerV reanimated style={[styles.menu, menuAnimatedStyles]}>
                <UIView center style={styles.score}>
                    <UIText style={styles.text}>YOUR CURRENT SCORE</UIText>
                    <UIText style={styles.text}>5666</UIText>
                </UIView>
                <UIView center marginT-20 marginB-20 style={styles.score}>
                    <UIText style={styles.text}>YOUR BEST SCORE</UIText>
                    <UIText style={styles.text}>5666</UIText>
                </UIView>
                <UIView>
                    <Button title={'START GAME'} onPress={onStart}/>
                </UIView>
                <UIView marginT-20>
                    <Button title={'SAY THANKS TO AUTHOR'} onPress={onPressThanks}/>
                </UIView>
                <UIView marginT-20>
                    <Button title={'GO BACK'} onPress={goBack}/>
                </UIView>
            </UIView>
        </UIView>
    )
})


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundImage: {
        width: '100%',
        height: SCREEN_HEIGHT / 2,
        position: 'absolute',
        left: -SCREEN_WIDTH / 2,
        transform: [{scale: 2}]
    },
    borderFire: {
        position: "absolute",
        zIndex: 2
    },
    lottie_fire: {
        position: "absolute",
    },
    'lottie_fire-top': {
        transform: [{rotate: '180deg'}],
        top: (SCREEN_HEIGHT + 50) / 2 * -1,
        left: -SCREEN_WIDTH / 2,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
    },
    'lottie_fire-bottom': {
        top: 50,
        left: -SCREEN_WIDTH / 2,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
    },
    menu: {
        backgroundColor: '#fff',
        width: SCREEN_WIDTH / 1.2,
        borderWidth: 3,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 20,
        zIndex: 2
    },
    score: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 2,
        textShadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0.5,
        textAlign: 'center',
    },

});


// const [record, setRecord] = useState('')
// const {getItem, setItem} = useAsyncStorage('@record')

// const handleStorage = async () => {
//     const record = await getItem();
//
//     if (!record || score > record) {
//         await setItem(`${score}`)
//         setRecord(score);
//     } else {
//         setRecord(record);
//     }
// };
//
// useEffect(() => {
//     handleStorage()
// }, [isLooser])
