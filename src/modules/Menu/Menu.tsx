import {StyleSheet} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {MenuItem} from "./components/MenuItem";
import {MenuBackground} from "./components/MenuBackground";
import {UIView} from "../../components/UIView";

const ITEMS = [
    {name: 'Flappy Bird', source: require(`../../../assets/lottie/flappy-bird/bird.json`)},
    {name: 'Doodle Jump', source: require(`../../../assets/lottie/doodle-jump/doodle.json`)},
]


export const Menu = () => {
    const {bottom, top} = useSafeAreaInsets()

    return (
        <UIView flex>
            <MenuBackground/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {ITEMS.map((item, index) => (
                    <UIView key={index} marginTop={index < 1 ? top : 0}
                            marginBottom={index === ITEMS.length - 1 ? bottom : 20}>
                        <MenuItem {...item} />
                    </UIView>
                ))}
            </ScrollView>
        </UIView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
    },
});
