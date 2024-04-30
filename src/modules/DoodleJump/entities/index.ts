import * as Matter from 'matter-js'

import Platform from "./Platform";
import Doodle from "./Doodle";

import {getChunkPlatforms} from "../utils";
import {
    DOODLE_RADIUS,
    DOODLE_POSITION,
    GRAVITY,
    PLATFORM_SIZE,
    CHUNK_PLATFORMS_COUNT,
    STARTED_ADD_TO_Y_OFFSET
} from "../constants";
import {SCREEN_HEIGHT} from "../../../constants";


export default () => {
    const engine = Matter.Engine.create({enableSleeping: false, gravity: {y: GRAVITY}})
    const world = engine.world
    const chuckPlatforms = getChunkPlatforms({count: CHUNK_PLATFORMS_COUNT, addToYOffset: STARTED_ADD_TO_Y_OFFSET})
    const chuckSubstitutePlatforms = getChunkPlatforms({
        count: CHUNK_PLATFORMS_COUNT,
        addToYOffset: STARTED_ADD_TO_Y_OFFSET - SCREEN_HEIGHT - 20
    })
    const result = {
        physics: {engine, world},
        Doodle: Doodle({world, position: DOODLE_POSITION, radius: DOODLE_RADIUS}),
        StartedPlatform: Platform({
            world,
            position: {x: DOODLE_POSITION.x, y: DOODLE_POSITION.y + DOODLE_RADIUS * 2},
            size: PLATFORM_SIZE,
            type: 'started'
        }),
    }

    chuckPlatforms.forEach(({x, y, type, movingSide, movingSpeed}, index) => {
        result[`Platform${index}`] = Platform({
            world,
            position: {x, y},
            size: PLATFORM_SIZE,
            type,
            movingSide,
            movingSpeed,
        })
    })
    chuckSubstitutePlatforms.forEach(({x, y, type, movingSide, movingSpeed}, index) => {
        result[`SubstitutePlatform${index}`] = Platform({
            world,
            position: {x, y},
            size: PLATFORM_SIZE,
            type,
            movingSide,
            movingSpeed,
        })
    })

    return result
}
