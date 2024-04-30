import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import * as Matter from "matter-js";
import {DeviceMotion} from "expo-sensors";
import {Image} from "expo-image";

import {UIView} from "../../../components/UIView";

import {SCREEN_WIDTH} from "../../../constants";
import {DOODLE_LEFT_SOURCE, DOODLE_RIGHT_SOURCE} from "../constants";
import {doodleProps, doodleTypes} from "../types";

const Doodle = ({body}: doodleProps) => {
    const [rotationX, setRotationX] = useState(0)
    const [source, setSource] = useState(DOODLE_LEFT_SOURCE)
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2
    const radius = body.circleRadius

    useEffect(() => {
        DeviceMotion.addListener(({rotation: {gamma}}) => {
            setRotationX(gamma * 20)
            setSource(gamma < 0 ? DOODLE_LEFT_SOURCE : DOODLE_RIGHT_SOURCE)
        })
        return () => {
            DeviceMotion.removeAllListeners()
        }
    }, [])

    useEffect(() => {
        if (body.position.x > SCREEN_WIDTH) {
            Matter.Body.setPosition(body, {x: 0, y: body.position.y})
        }
        if (body.position.x < 0) {
            Matter.Body.setPosition(body, {x: SCREEN_WIDTH, y: body.position.y})
        }
        Matter.Body.translate(body, {x: rotationX, y: 0})
    }, [rotationX])

    return (
        <UIView
            style={[{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody,
                borderRadius: radius
            }]}
        >
            <Image source={source} style={styles.image}/>
        </UIView>
    )
}

export default ({world, position, radius}: doodleTypes) => {
    const initialDoodle = Matter.Bodies.circle(position.x, position.y, radius, {
        label: 'Doodle',
        mass: 1,
    })
    Matter.World.add(world, initialDoodle)

    return {
        body: initialDoodle,
        position,
        renderer: <Doodle/>
    }
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        top: -30,
        left: -4,
        width: 45,
        height: 70,
    }
})
