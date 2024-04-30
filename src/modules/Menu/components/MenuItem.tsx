import {UIView} from "../../../components/UIView";
import {UIText} from "../../../components/UIText";
import {StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
import {TouchableOpacity} from "react-native-ui-lib";
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from "@react-navigation/native";


export const MenuItem = ({name, source}) => {
    const {navigate} = useNavigation()

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigate(name)}>
            <LinearGradient
                colors={['#7600a5', '#2575DEE5']}
                style={styles.container}
            >
                <UIView flex center>
                    <UIText color={'#fff'} style={styles.text}>{name}</UIText>
                </UIView>

                <LottieView
                    autoPlay
                    style={styles.icon}
                    source={source}
                />
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#26009c',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    icon: {
        width: 100,
        height: 50,
        // backgroundColor: '#eee',
        marginLeft: 20
    },

    text: {
        fontSize: 20,
        textShadowColor: '#000',
        textShadowRadius: 1,
        textShadowOffset: {
            width: 1,
            height: 1,
        },
    }
})
