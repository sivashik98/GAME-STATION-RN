import {memo} from "react";
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-ui-lib";

import {UIView} from "../../../components/UIView";

export const Hamburger = memo(({shouldShow, onPress}) => {
    if (!shouldShow) return null
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
            onPress={onPress}
        >
            <UIView style={styles.item}/>
            <UIView marginT-4 style={styles.item}/>
            <UIView marginT-4 style={styles.item}/>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#9e6a00',
        borderWidth: 2,
        borderRadius: 10,
    },
    item: {
        width: 20,
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
    }
})
