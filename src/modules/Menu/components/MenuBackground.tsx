import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {TouchableOpacity} from "react-native-ui-lib";
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from "@react-navigation/native";
import {SCREEN_WIDTH} from "../../../constants";


export const MenuBackground = ({}) => {
    const {navigate} = useNavigation()

    return (
        <UIView style={styles.container}>
            <LottieView
                autoPlay
                style={styles.background}
                source={require('../../../../assets/lottie/menu/background.json')}
            />
            <LottieView
                autoPlay
                style={styles.spaceman}
                source={require('../../../../assets/lottie/menu/spaceman.json')}
            />
            <LottieView
                autoPlay
                style={styles['musician-spaceman']}
                source={require('../../../../assets/lottie/menu/musician-spaceman.json')}
            />
        </UIView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    background: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        position: 'absolute',
    },
    spaceman: {
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: 200,
        left: -100,
        transform: [{rotate: '-45deg'}]
    },
    'musician-spaceman': {
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})
