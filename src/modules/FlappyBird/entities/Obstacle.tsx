import {Bodies, World} from "matter-js";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {UIView} from "../../../components/UIView";

import {PIPE_SIZE} from "../constants";

const Obstacle = ({body, holePipePosition}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2
    const holeStyles = holePipePosition === 'bottom' ? {top: -2, backgroundColor: '#6d2900'} : {
        bottom: -2,
        backgroundColor: 'rgb(0,69,67)'
    }
    const colors = holePipePosition === 'bottom' ? ['#ffa670', 'rgb(112,168,0)'] : ['#97ff70', 'rgb(0,135,130)']

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
                colors={colors}
                style={{flex: 1}}
            />

            <UIView style={[styles.pipe, holeStyles]}/>
        </UIView>
    )
}

export default (world, label, position, size, holePipePosition) => {
    const initialObstacle = Bodies.rectangle(position.x, position.y, size.width, size.height, {
        label,
        isStatic: true,
    })
    World.add(world, initialObstacle)

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
        backgroundColor: '#136500',
        borderWidth: 2,
        borderRadius: 10
    }
});
