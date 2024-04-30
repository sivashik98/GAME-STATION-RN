import * as Matter from "matter-js";

import {UIView} from "../../../components/UIView";

const Ground = ({body}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2

    return (
        <UIView
            style={{
                // backgroundColor: color,
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }}
        />
    )
}

export default (world, position, size) => {
    const initialGround = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {
        label: 'Ground',
        isStatic: true
    })
    Matter.World.add(world, initialGround)

    return {
        body: initialGround,
        position,
        renderer: <Ground/>
    }
}
