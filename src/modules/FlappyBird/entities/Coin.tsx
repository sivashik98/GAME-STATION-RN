import {useEffect} from "react";
import {Bodies, World} from "matter-js";
import LottieView from "lottie-react-native";
import {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from "react-native-reanimated";

import {UIView} from "../../../components/UIView";

import {COIN_SOURCE} from "../constants";

const ANIMATION_CONFIG = {
    duration: 600
}

const Coin = ({body}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2
    const radius = body.circleRadius
    const translateY = useSharedValue(0)

    useEffect(() => {
        translateY.value = withRepeat(withSequence(withTiming(-20, ANIMATION_CONFIG), withTiming(0, ANIMATION_CONFIG)), -1)
    }, [])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}]
    }))


    return (
        <UIView
            reanimated
            style={[
                {
                    left: xBody,
                    top: yBody,
                    width: widthBody,
                    height: heightBody,
                    borderRadius: radius
                }, animatedStyles]}
        >
            <LottieView
                source={COIN_SOURCE}
                autoPlay
                loop
                style={{
                    position: 'absolute',
                    top: -widthBody / 2,
                    left: -heightBody / 2,
                    width: widthBody * 2,
                    height: heightBody * 2,
                }}
            />
        </UIView>
    )
}

export default (world, position, radius) => {
    const initialCoin = Bodies.circle(position.x, position.y, radius, {
        isStatic: true,
        isSensor: true,
        label: 'Coin',
    })
    World.add(world, initialCoin)

    return {
        body: initialCoin,
        position,
        renderer: <Coin/>
    }
}
