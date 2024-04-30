import * as Matter from 'matter-js'

import Bird from "./Bird";
import Ground from "./Ground";
import Obstacle from "./Obstacle";
import Coin from "./Coin";

import {getPipesAndCoinData} from "../utils";
import {BIRD_SIZE, GROUND_SIZE, BIRD_POSITION, GRAVITY} from "../constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../../constants";


export default restart = () => {
    const engine = Matter.Engine.create({enableSleeping: false})
    const world = engine.world
    const {coin, pipeTop, pipeBottom} = getPipesAndCoinData()
    const {pipeTop: substitutePipeTop, pipeBottom: substitutePipeBottom} = getPipesAndCoinData(SCREEN_WIDTH / 1.5)
    world.gravity.y = GRAVITY

    return {
        physics: {engine, world},
        Bird: Bird(world, BIRD_POSITION, BIRD_SIZE),
        Ground: Ground(world, {x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT}, GROUND_SIZE),
        Coin: Coin(world, coin.position, coin.radius),
        ObstacleTop: Obstacle(world, 'ObstacleTop', pipeTop.position, pipeTop.size, 'top'),
        ObstacleBottom: Obstacle(world, 'ObstacleBottom', pipeBottom.position, pipeBottom.size, 'bottom'),
        ObstacleSubstituteTop: Obstacle(world, 'ObstacleSubstituteTop', substitutePipeTop.position, substitutePipeTop.size, 'top'),
        ObstacleSubstituteBottom: Obstacle(world, 'ObstacleSubstituteBottom', substitutePipeBottom.position, substitutePipeBottom.size, 'bottom')
    }
}
