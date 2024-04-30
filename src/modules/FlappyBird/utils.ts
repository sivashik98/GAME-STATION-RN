import {PIPE_SIZE, PIPES_SPACE, COIN_RADIUS} from "./constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants";

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPipesAndCoinData = (addToPositionX = 0) => {
    const randomYPosition = getRandom(100, -300)

    const pipeTop = {
        position: {x: SCREEN_WIDTH + addToPositionX, y: randomYPosition},
        size: PIPE_SIZE
    }
    const pipeBottom = {
        position: {x: SCREEN_WIDTH + addToPositionX, y: randomYPosition + SCREEN_HEIGHT + PIPES_SPACE},
        size: PIPE_SIZE
    }
    const coin = {
        position: {x: SCREEN_WIDTH + addToPositionX, y: randomYPosition + SCREEN_HEIGHT / 1.6},
        radius: COIN_RADIUS
    }

    return {pipeTop, pipeBottom, coin}
}
