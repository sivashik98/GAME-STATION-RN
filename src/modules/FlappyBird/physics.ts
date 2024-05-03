import {Body, Events, Engine} from "matter-js";

import {getPipesAndCoinData} from "./utils";
import {BIRD_JUMPING, BIRD_POSITION, PIPE_SIZE, SPEED} from "./constants";

let scoreDispatched = false;
let collisionDeadlyDispatched = false;
let collisionCoinDispatched = false;

const Physics = (entities, {touches, events, time, dispatch, layout, screen}, ...props) => {
    const engine = entities.physics.engine

    touches.filter(({type}) => type === 'press').forEach(() => {
        Body.setVelocity(entities.Bird.body, {x: 0, y: -BIRD_JUMPING})
    })
    events.forEach(({type}) => {
        if (type === 'started') {
            collisionDeadlyDispatched = false
            collisionCoinDispatched = false
        }
    })

    Body.translate(entities.Coin.body, {x: -SPEED, y: 0})
    Body.translate(entities.ObstacleTop.body, {x: -SPEED, y: 0})
    Body.translate(entities.ObstacleBottom.body, {x: -SPEED, y: 0})
    Body.translate(entities.ObstacleSubstituteTop.body, {x: -SPEED, y: 0})
    Body.translate(entities.ObstacleSubstituteBottom.body, {x: -SPEED, y: 0})

    if (entities.ObstacleTop.body.bounds.max.x < BIRD_POSITION.x && !scoreDispatched) {
        dispatch({type: 'score'})
        scoreDispatched = true
    }
    if (entities.ObstacleSubstituteTop.body.bounds.max.x < BIRD_POSITION.x && !scoreDispatched) {
        dispatch({type: 'score'})
        scoreDispatched = true
    }
    if (entities.ObstacleTop.body.bounds.max.x < 0) {
        const {coin, pipeTop, pipeBottom} = getPipesAndCoinData(PIPE_SIZE.width)

        Body.setPosition(entities.Coin.body, coin.position)
        Body.setPosition(entities.ObstacleTop.body, pipeTop.position)
        Body.setPosition(entities.ObstacleBottom.body, pipeBottom.position)

        scoreDispatched = false
        collisionCoinDispatched = false
    }
    if (entities.ObstacleSubstituteTop.body.bounds.max.x < 0) {
        const {pipeTop, pipeBottom} = getPipesAndCoinData(PIPE_SIZE.width)

        Body.setPosition(entities.ObstacleSubstituteTop.body, pipeTop.position)
        Body.setPosition(entities.ObstacleSubstituteBottom.body, pipeBottom.position)

        scoreDispatched = false
    }

    Events.on(engine, 'collisionStart', ({pairs}) => {
        pairs.forEach(pair => {
            const {bodyA, bodyB} = pair;

            if (bodyA === entities.Bird.body && bodyB === entities.Coin.body && !collisionCoinDispatched) {
                collisionCoinDispatched = true
                dispatch({type: 'collect'})
                Body.setPosition(entities.Coin.body, {x: 3000, y: 3000})
            }
            if (bodyA === entities.Bird.body && bodyB !== entities.Coin.body && !collisionDeadlyDispatched) {
                collisionDeadlyDispatched = true
                dispatch({type: 'game-over'})
            }
        });
    })
    Engine.update(engine, time.delta)

    return entities
}

export default Physics
