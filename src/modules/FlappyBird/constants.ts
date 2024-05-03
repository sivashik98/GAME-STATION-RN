import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants";

export const PIPE_SIZE = {width: 75, height: SCREEN_HEIGHT};
export const BIRD_SIZE = {width: 40, height: 40};
export const COIN_RADIUS = 20;
export const BIRD_POSITION = {x: SCREEN_WIDTH / 5, y: SCREEN_HEIGHT / 2};
export const GROUND_SIZE = {width: SCREEN_WIDTH, height: 100};
export const PIPES_SPACE = 200

export const MUSIC_CONFIG = {
    background: {
        volume: 0.2,
        isLooping: true
    },
    die: {
        volume: 0.8,
    },
    score: {
        volume: 0.8,
    },
}

export const GAME_OVER = 'game-over'
export const SCORE = 'score'
export const COLLECT = 'collect'

export const SPEED = 2
export const BIRD_JUMPING = 6
export const GRAVITY = 0.8

// sound
export const COIN_SOUND_SOURCE = require('../../../assets/sounds/flappy-bird/coin.mp3')
export const DIE_SOUND_SOURCE = require('../../../assets/sounds/flappy-bird/die.mp3')
export const BACKGROUND_SOUND_SOURCE = require('../../../assets/sounds/flappy-bird/background.mp3')

// Images
export const BACKGROUND_SOURCE = require('../../../assets/png/flappy-bird/background.jpg')

// Lottie
export const BIRD_SOURCE = require('../../../assets/lottie/flappy-bird/bird.json')
export const COIN_SOURCE = require('../../../assets/lottie/flappy-bird/coin.json')
export const FIRE_SOURCE = require('../../../assets/lottie/flappy-bird/fire.json')

