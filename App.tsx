import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {RootNavigation} from "./src/navigation/Root";

const InnerApp = () => {

    return (
        <RootNavigation/>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <InnerApp/>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
