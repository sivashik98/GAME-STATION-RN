import * as Matter from "matter-js";

import {getPipesAndCoinData} from "./utils";
import {BIRD_JUMPING, BIRD_POSITION, PIPE_SIZE, SPEED} from "./constants";

let scoreDispatched = false;
let collisionDeadlyDispatched = false;
let collisionCoinDispatched = false;

const Physics = (entities, {touches, events, time, dispatch, layout, screen}, ...props) => {
    const engine = entities.physics.engine

    touches.filter(({type}) => type === 'press').forEach(() => {
        Matter.Body.setVelocity(entities.Bird.body, {x: 0, y: -BIRD_JUMPING})
    })
    events.forEach(({type}) => {
        if (type === 'started') {
            collisionDeadlyDispatched = false
            collisionCoinDispatched = false
        }
    })

    Matter.Body.translate(entities.Coin.body, {x: -SPEED, y: 0})
    Matter.Body.translate(entities.ObstacleTop.body, {x: -SPEED, y: 0})
    Matter.Body.translate(entities.ObstacleBottom.body, {x: -SPEED, y: 0})
    Matter.Body.translate(entities.ObstacleSubstituteTop.body, {x: -SPEED, y: 0})
    Matter.Body.translate(entities.ObstacleSubstituteBottom.body, {x: -SPEED, y: 0})

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

        Matter.Body.setPosition(entities.Coin.body, coin.position)
        Matter.Body.setPosition(entities.ObstacleTop.body, pipeTop.position)
        Matter.Body.setPosition(entities.ObstacleBottom.body, pipeBottom.position)

        scoreDispatched = false
        collisionCoinDispatched = false
    }
    if (entities.ObstacleSubstituteTop.body.bounds.max.x < 0) {
        const {pipeTop, pipeBottom} = getPipesAndCoinData(PIPE_SIZE.width)

        Matter.Body.setPosition(entities.ObstacleSubstituteTop.body, pipeTop.position)
        Matter.Body.setPosition(entities.ObstacleSubstituteBottom.body, pipeBottom.position)

        scoreDispatched = false
    }

    Matter.Events.on(engine, 'collisionStart', ({pairs}) => {
        pairs.forEach(pair => {
            const {bodyA, bodyB} = pair;

            if (bodyA === entities.Bird.body && bodyB === entities.Coin.body && !collisionCoinDispatched) {
                collisionCoinDispatched = true

                dispatch({type: 'collect'})
                Matter.Body.setPosition(entities.Coin.body, {x: 10000, y: 10000})
            }
            if (bodyA === entities.Bird.body && bodyB !== entities.Coin.body && !collisionDeadlyDispatched) {
                collisionDeadlyDispatched = true

                dispatch({type: 'game-over'})
            }
        });
    })

    Matter.Engine.update(engine, time.delta)

    return entities
}

export default Physics
