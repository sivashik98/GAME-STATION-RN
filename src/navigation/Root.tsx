import React from "react";
import {StatusBar} from "react-native";
import {
    NavigationContainer,
    useNavigationContainerRef,
} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {Menu} from "../modules/Menu";
import {DoodleJump} from "../modules/DoodleJump";
import {FlappyBird} from "../modules/FlappyBird";


const RootStack = createNativeStackNavigator();

const NavigationFlow = () => (
    <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>

        <RootStack.Navigator
            initialRouteName="Menu"
            screenOptions={{headerShown: false}}
        >
            <RootStack.Screen name={'Menu'} component={Menu}/>

            {/* Flappy Bird Screen */}
            <RootStack.Screen name={'Flappy Bird'} component={FlappyBird}/>

            {/* Doodle Jump Screen */}
            <RootStack.Screen name={'Doodle Jump'} component={DoodleJump}/>
        </RootStack.Navigator>
    </>
);

export const RootNavigation = () => {
    const navigationContainerRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

    return (
        <NavigationContainer ref={navigationContainerRef}>
            <NavigationFlow/>
        </NavigationContainer>
    );
};
