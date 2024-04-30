import LottieView from "lottie-react-native";
import * as Matter from "matter-js";

import {UIView} from "../../../components/UIView";

import {BIRD_SIZE, BIRD_SOURCE} from "../constants";

const Bird = ({body}) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y
    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2

    const sizeIndex = 25

    return (
        <UIView
            style={{
                // borderWidth: 2,
                // borderColor: color,
                position: 'absolute',
                left: xBody,
                top: yBody,
                width: widthBody,
                height: heightBody
            }}
        >
            <LottieView
                source={BIRD_SOURCE}
                autoPlay
                loop
                style={{
                    position: 'absolute',
                    top: -sizeIndex / 2,
                    left: -sizeIndex / 2,
                    width: BIRD_SIZE.width + sizeIndex,
                    height: BIRD_SIZE.height + sizeIndex
                }}
            />
        </UIView>
    )
}

export default (world, position, size) => {
    const initialBird = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height, {label: 'Bird'})
    Matter.World.add(world, initialBird)

    return {
        body: initialBird,
        position,
        renderer: <Bird/>
    }
}
