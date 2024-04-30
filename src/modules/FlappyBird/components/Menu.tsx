import {useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

import {UIView} from "../../../components/UIView";
import {Button} from "./Button";
import {UIText} from "../../../components/UIText";
import {SCREEN_WIDTH} from "../../../constants";


export const Menu = ({isLooser, shouldShow, score, coins, buttons}) => {
    const [record, setRecord] = useState('')
    const {getItem, setItem} = useAsyncStorage('@record')

    const handleStorage = async () => {
        const record = await getItem();

        if (!record || score > record) {
            await setItem(`${score}`)
            setRecord(score);
        } else {
            setRecord(record);
        }
    };

    useEffect(() => {
        handleStorage()
    }, [isLooser])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{scale: withTiming(shouldShow ? 1 : 0)}],
        zIndex: withTiming(shouldShow ? 1 : 0)
    }), [shouldShow])

    return (
        <UIView reanimated center style={[styles.container, animatedStyles]}>
            <UIView style={styles.menu}>
                {isLooser && record && (
                    <UIView right style={styles.board}>
                        <UIText style={styles.text}>YOUR SCORE IS <UIText
                            style={[styles.text, styles['text-score']]}>{score}</UIText></UIText>

                        <UIText marginT-10 style={styles.text}>YOUR COINS IS <UIText
                            style={[styles.text, styles['text-score']]}>{coins}</UIText></UIText>

                        <UIText marginT-10 style={styles.text}>BEST RECORD IS <UIText
                            style={[styles.text, styles['text-score']]}>{record}</UIText></UIText>
                    </UIView>
                )}

                {buttons.map(({title, onPress}, index) => (
                    <UIView key={title} marginTop={index > 0 ? 15 : 0}>
                        <Button title={title} onPress={onPress}/>
                    </UIView>
                ))}
            </UIView>
        </UIView>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    menu: {
        padding: 25,
        backgroundColor: '#4e56b8',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10,
        minWidth: SCREEN_WIDTH / 1.5,
    },
    board: {
        borderWidth: 2,
        borderColor: '#fff',
        padding: 10,
        paddingVertical: 20,
        backgroundColor: '#8d3434',
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    'text-score': {
        fontWeight: 'bold'
    }
});
