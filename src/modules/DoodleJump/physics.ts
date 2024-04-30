import {Body, Events, Engine} from "matter-js";

import {filterEntitiesByLabel, getChunkPlatforms} from "./utils";
import {
    CHUNK_PLATFORMS_COUNT, DEATH_THRESHOLD,
    DOODLE_JUMPING, GAME_OVER, JUMP,
    JUMPING_PLATFORM_DELTA,
    MOVING_LEFT,
    MOVING_RIGHT,
    PLATFORM_DEFAULT,
    PLATFORM_JUMPING,
    PLATFORM_MOVING, SCORE,
} from "./constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants";

let collisionDispatched = false;
let deathDispatched = false;

const Physics = (entities, {touches, events, time, dispatch, layout, screen}, ...props) => {
    const engine = entities.physics.engine
    events.forEach(({type}) => {
        if (type === 'started') {
            deathDispatched = false
            collisionDispatched = false
        }
    })
    const platforms = filterEntitiesByLabel({label: 'Platform', entities})
    const substitutePlatforms = filterEntitiesByLabel({label: 'SubstitutePlatform', entities})
    const shouldRegeneratePlatforms = platforms.every(platform => platform.body.position.y > SCREEN_HEIGHT);
    const shouldRegenerateSubstitutePlatforms = substitutePlatforms.every(platform => platform.body.position.y > SCREEN_HEIGHT);
    const translateDownPlatformsSpeed = (((SCREEN_HEIGHT - DEATH_THRESHOLD / 2) - entities.Doodle.body.position.y) / 60) / 2
    // Регенерация платформ
    if (shouldRegeneratePlatforms) {
        const positions = getChunkPlatforms({
            count: CHUNK_PLATFORMS_COUNT,
            addToYOffset: -(SCREEN_HEIGHT + SCREEN_HEIGHT / CHUNK_PLATFORMS_COUNT)
        })
        platforms.forEach((platform, index) => Body.set(platform.body, {
            position: positions[index],
            isSensor: true,
            isStatic: true
        }));
    }
    if (shouldRegenerateSubstitutePlatforms) {
        const positions = getChunkPlatforms({
            count: CHUNK_PLATFORMS_COUNT,
            addToYOffset: -(SCREEN_HEIGHT + SCREEN_HEIGHT / CHUNK_PLATFORMS_COUNT)
        })
        substitutePlatforms.forEach((platform, index) => Body.set(platform.body, {
            position: positions[index],
            isSensor: true,
            isStatic: true
        }));
    }
    // Работа с платформами
    platforms.concat(substitutePlatforms).forEach(platform => {
        // Платформы которые выше дудла они не физические
        const isPlatformAboveDoodle = platform.body.position.y < entities.Doodle.body.position.y
        const isDoodleAboveThreshold = entities.Doodle.body.position.y < SCREEN_HEIGHT / 2
        if (isPlatformAboveDoodle || isDoodleAboveThreshold) {
            Body.set(platform.body, {isSensor: true})
        }
        // Платформы падают вниз всегда c разной скоростью
        Body.translate(platform.body, {x: 0, y: translateDownPlatformsSpeed})
        // Настройка движущейся платформы
        if (platform.body.label.includes(PLATFORM_MOVING)) {
            const x = platform.body.movingSide === MOVING_LEFT ? -platform.body.movingSpeed : platform.body.movingSpeed
            if (platform.body.position.x <= 0) {
                Body.set(platform.body, {movingSide: MOVING_RIGHT})
            }
            if (platform.body.position.x >= SCREEN_WIDTH) {
                Body.set(platform.body, {movingSide: MOVING_LEFT})
            }
            Body.translate(platform.body, {x, y: 0})
        }
    })
    // Если дудл ниже огня то смерть
    if (entities.Doodle.body.position.y > SCREEN_HEIGHT - DEATH_THRESHOLD && !deathDispatched) {
        deathDispatched = true
        dispatch({type: GAME_OVER})
    }

    Events.on(engine, 'collisionStart', ({pairs}) => {
        pairs.forEach(pair => {
            const {bodyA, bodyB} = pair;
            if (bodyA === entities.Doodle.body && bodyB === entities.StartedPlatform.body && !collisionDispatched) {
                collisionDispatched = true
                dispatch({type: JUMP, platformType: PLATFORM_JUMPING})
                Body.setVelocity(entities.Doodle.body, {x: 0, y: -DOODLE_JUMPING * JUMPING_PLATFORM_DELTA})
                Body.setPosition(entities.StartedPlatform.body, {x: -10000, y: 0})
            }
            if (
                bodyA === entities.Doodle.body && bodyB.label.includes('Platform')
                && bodyB.position.y > bodyA.position.y
                && !collisionDispatched
            ) {
                collisionDispatched = true

                // Если дудл прыгает вверх то набирать очки
                dispatch({type: SCORE})

                if (bodyB.label.includes(PLATFORM_JUMPING)) {
                    Body.setVelocity(entities.Doodle.body, {x: 0, y: -DOODLE_JUMPING * JUMPING_PLATFORM_DELTA})
                    dispatch({type: JUMP, platformType: PLATFORM_JUMPING})
                } else {
                    Body.setVelocity(entities.Doodle.body, {x: 0, y: -DOODLE_JUMPING})
                    dispatch({type: JUMP, platformType: PLATFORM_DEFAULT})
                }
            }
        });
    })
    Events.on(engine, 'collisionEnd', ({pairs}) => {
        pairs.forEach(pair => {
            const {bodyA, bodyB} = pair;
            if (bodyA === entities.Doodle.body && bodyB.label.includes('Platform')) {
                collisionDispatched = false
            }
        });
    })

    Engine.update(engine, time.delta)

    return entities
}

export default Physics
