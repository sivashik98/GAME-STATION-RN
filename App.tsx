import {Button, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";


import {Menu} from "./src/pages/Menu";
import {RootNavigation} from "./src/navigation/Root";

const InnerApp = () => {
    const [ready, setReady] = useState(true);

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
