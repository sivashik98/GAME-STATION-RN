import {canOpenURL, openURL} from 'expo-linking';

import {
    MOVING_LEFT,
    MOVING_RIGHT,
    MOVING_SPEEDS,
    PLATFORM_DEFAULT,
    PLATFORM_JUMPING,
    PLATFORM_MOVING,
    PLATFORM_SIZE,
} from "./constants";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../constants";
import {
    filterEntitiesByLabelTypes,
    getChunkPlatformsTypes,
    getRandomFromRangeTypes,
} from "./types";

export const filterEntitiesByLabel = ({
                                          label,
                                          entities
                                      }: filterEntitiesByLabelTypes) => Object.keys(entities).filter((key) => key.startsWith(label)).map(key => entities[key]);

const getRandomPlatformType = () => {
    const randomNumber = Math.random();
    let selectedPlatform;

    if (randomNumber < 0.55) {
        selectedPlatform = PLATFORM_DEFAULT;
    } else if (randomNumber < 0.85) {
        selectedPlatform = PLATFORM_MOVING;
    } else {
        selectedPlatform = PLATFORM_JUMPING;
    }

    return selectedPlatform;
};

export const getRandomFromRange = ({min, max}: getRandomFromRangeTypes) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getChunkPlatforms = ({count, addToYOffset = 0}: getChunkPlatformsTypes) => {
    const delta = SCREEN_HEIGHT / count

    return Array(count)
        .fill()
        .map((_, index) => {
            const x = getRandomFromRange({min: PLATFORM_SIZE.width, max: SCREEN_WIDTH - PLATFORM_SIZE.width});
            const y = getRandomFromRange({
                min: delta * index + addToYOffset + (PLATFORM_SIZE.height * 2),
                max: delta * (index + 1) + addToYOffset
            });
            const type = getRandomPlatformType()
            const movingSide = [MOVING_LEFT, MOVING_RIGHT][getRandomFromRange({min: 0, max: 1})];
            const movingSpeed = MOVING_SPEEDS[getRandomFromRange({min: 0, max: 4})];
            return {x, y, type, movingSide, movingSpeed};
        })
        .sort(() => Math.random() - 0.5);
}

export const openLink = async (url?: string) => {
    if (!url) return;

    // Checking if the link is supported for links with custom URL scheme.
    const supported = await canOpenURL(url);
    if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await openURL(url);
    }
};
