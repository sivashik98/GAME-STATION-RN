import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants";

// Entities
export const DEATH_THRESHOLD = SCREEN_HEIGHT / 10
export const PLATFORM_SIZE = {width: 55, height: 15}
export const DOODLE_RADIUS = 20;

// Типы платформ
export const PLATFORM_DEFAULT = 'default'
export const PLATFORM_MOVING = 'moving'
export const PLATFORM_JUMPING = 'jumping'

// PLATFORM_MOVING стороны
export const MOVING_LEFT = 'left'
export const MOVING_RIGHT = 'right'

// PLATFORM_MOVING скорости
export const MOVING_SPEEDS = [2, 3, 4, 5, 6]

export const DOODLE_POSITION = {x: SCREEN_WIDTH / 2 + DOODLE_RADIUS / 2, y: SCREEN_HEIGHT - DEATH_THRESHOLD * 2};
export const JUMPING_PLATFORM_DELTA = 1.8
export const CHUNK_PLATFORMS_COUNT = 16
export const DOODLE_JUMPING = 8
export const GENIE_APPEAR_TIME = 4000
export const HITS_TO_KILL_GENIE = 12
export const INTERVAL_GENIE_APPEAR = 15000

export const GRAVITY = 1
export const MUSIC_CONFIG = {
    death: {
        volume: 0.8,
    },
    jumpingPlatform: {
        volume: 0.9,
    },
    defaultPlatform: {
        volume: 0.4,
    },
    genie: {
        volume: 1,
    },
    knockout: {
        volume: 1,
    },
    game: {
        volume: 0.2,
        isLooping: true
    }
}

// Стартовый отступ генерации позиций платформ
export const STARTED_ADD_TO_Y_OFFSET = -(SCREEN_HEIGHT - DOODLE_POSITION.y + DOODLE_RADIUS * 2)

// Events
export const GAME_OVER = 'game-over'
export const SCORE = 'score'
export const JUMP = 'jump'
export const COLLECT = 'collect'

// sound
export const DEATH_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/death.mp3')
export const MENU_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/menu.mp3')
export const BUTTON_PRESS_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/button-press.mp3')
export const OVERLAY_START_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/overlay-start.mp3')
export const OVERLAY_START_2_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/overlay-start-2.mp3')
export const OVERLAY_START_3_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/overlay-start-3.mp3')
export const DEFAULT_PLATFORM_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/default-platform.mp3')
export const JUMPING_PLATFORM_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/jumping-platform.mp3')
export const GENIE_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/genie.mp3')
export const KNOCKOUT_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/knockout.mp3')
export const GAME_SOUND_SOURCE = require('../../../assets/sounds/doodle-jump/game.mp3')

// lottie
export const CAT_SOURCE = require('../../../assets/lottie/doodle-jump/cat.json')
export const DEATH_SOURCE = require('../../../assets/lottie/doodle-jump/fire.json')
export const COUNTDOWN_SOURCE = require('../../../assets/lottie/doodle-jump/countdown.json')
export const COIN_SOURCE = require('../../../assets/lottie/flappy-bird/coin.json')
export const GHOST_SOURCE = require('../../../assets/lottie/doodle-jump/ghost.json')
export const GENIE_MAGIC_SOURCE = require('../../../assets/lottie/doodle-jump/genie-magic.json')

// Images
export const DOODLE_LEFT_SOURCE = require('../../../assets/png/doodle-jump/cup-man-left.png')
export const DOODLE_RIGHT_SOURCE = require('../../../assets/png/doodle-jump/cup-man-right.png')
export const MENU_SOURCE = require('../../../assets/png/doodle-jump/menu.jpg')
export const GENIE_SOURCE = require('../../../assets/png/doodle-jump/genie.png')
export const BACKGROUND_SOURCE = require('../../../assets/png/doodle-jump/background.jpg')

export const TG_USERNAME = 'https://t.me/maximuSpartan98'

