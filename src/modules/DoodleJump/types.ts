import {IBodyDefinition, IWorldDefinition} from 'matter-js'

export type getChunkPlatformsTypes = {
    count: number,
    addToYOffset?: number
}

export type getRandomFromRangeTypes = { min: number, max: number }

export type filterEntitiesByLabelTypes = {
    label: string,
    entities: [IBodyDefinition]
}

export type doodleTypes = {
    world: IWorldDefinition,
    position: { x: number, y: number }
    radius: number
}

export type doodleProps = {
    body: IBodyDefinition,
}

export type platformTypes = {
    world: IWorldDefinition,
    position: { x: number, y: number },
    size: { width: number, height: number },
    type: 'default' | 'moving' | 'jumping' | 'broken' | 'started',
    movingSide?: 'left' | 'right',
    movingSpeed?: 2 | 3 | 4 | 5 | 6,
}

export type platformProps = {
    body: IBodyDefinition,
    type: 'default' | 'moving' | 'jumping' | 'started',
}
