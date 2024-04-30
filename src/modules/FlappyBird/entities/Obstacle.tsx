import * as Matter from "matter-js";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {UIView} from "../../../components/UIView";
import {PIPE_SIZE} from "../constants";

const Obstacle = ({body, holePipePosition}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2
    const holeStyles = holePipePosition === 'bottom' ? {top: -2} : {bottom: -2}

    return (
        <UIView
            style={[styles.obstacle,
                {
                    left: xBody,
                    top: yBody,
                    width: PIPE_SIZE.width,
                    height: PIPE_SIZE.height
                }]}
        >
            <LinearGradient
                colors={['#a7a7a7', 'rgb(47,81,255)']}
                style={{flex: 1}}
            />

            <UIView style={[styles.pipe, holeStyles]}/>
        </UIView>
    )
}

export default (world, label, position, size, holePipePosition) => {
    const initialObstacle = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {
        label,
        isStatic: true,
    })
    Matter.World.add(world, initialObstacle)

    return {
        body: initialObstacle,
        position,
        holePipePosition,
        renderer: <Obstacle/>
    }
}


const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        borderWidth: 2,
    },
    pipe: {
        width: 110,
        height: 50,
        position: 'absolute',
        left: ((PIPE_SIZE.width - 110) / 2) - 2,
        bottom: 0,
        backgroundColor: '#011892',
        borderWidth: 2,
        borderRadius: 10
    }
});
