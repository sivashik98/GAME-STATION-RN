import * as Matter from "matter-js";

import {UIView} from "../../../components/UIView";

import {platformProps, platformTypes} from "../types";
import {PLATFORM_JUMPING} from "../constants";

const PLATFORM_COLORS = {
    started: '#fff',
    default: '#fff',
    jumping: '#7500c4',
    moving: '#0096ee',
}

const Platform = ({body, type}: platformProps) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2

    return (
        <UIView
            style={{
                borderRadius: 4,
                borderWidth: 3,
                borderColor: type === PLATFORM_JUMPING ? '#ffc4f8' : '#000',
                backgroundColor: PLATFORM_COLORS[type],
                position: 'absolute',
                left: xBody || 0,
                top: yBody || 0,
                width: widthBody || 0,
                height: heightBody || 0,
            }}
        />
    )
}

export default ({world, position, size, type, movingSide, movingSpeed}: platformTypes) => {
    const initialPlatform = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {
        label: `Platform${type}`,
        movingSide,
        movingSpeed,
        isStatic: true,
        isSensor: true
    })
    Matter.World.add(world, initialPlatform)

    return {
        body: initialPlatform,
        position,
        type,
        renderer: <Platform/>
    }
}
