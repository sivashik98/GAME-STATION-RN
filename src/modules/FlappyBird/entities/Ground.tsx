import {Bodies, World} from "matter-js";
import LottieView from "lottie-react-native";

import {UIView} from "../../../components/UIView";

import {FIRE_SOURCE} from "../constants";
import {SCREEN_WIDTH} from "../../../constants";

const Ground = ({body}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2

    return (
        <UIView
            style={{
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }}
        >
            <LottieView
                source={FIRE_SOURCE}
                autoPlay
                loop
                style={{
                    position: 'absolute',
                    top: -SCREEN_WIDTH / 1.5,
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH,
                }}
            />
        </UIView>
    )
}

export default (world, position, size) => {
    const initialGround = Bodies.rectangle(position.x, position.y, size.width, size.height, {
        label: 'Ground',
        isStatic: true
    })
    World.add(world, initialGround)

    return {
        body: initialGround,
        position,
        renderer: <Ground/>
    }
}
