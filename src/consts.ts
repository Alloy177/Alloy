const GAME = {
    width: 960,
    height: 540,

    canvas: document.getElementById("game") as HTMLCanvasElement,

    background: {
        color: 0xF0F0F0
    }
};

const TILE = {
    width: 80,
    height: 80,

    padding: {
        width: 8,
        height: 8
    },

    background: {
        color: 0x7F7F7F
    },

    line: {
        weight: 0
    },

    power: {
        maxStart: 2,
        chancesPerPower: 6
    }
}

const GRID = {
    width: 4,
    height: 4,

    display: {
        width: 420,
        height: 420,
    },

    padding: {
        width: 40,
        height: 40
    }
};

const TEXT = {
    family: "Ubuntu",

    tile: {
        size: TILE.width - TILE.padding.width,
        fill: 0xF0F0F0
    }
};

const KEYS = {
    up: ["w", "W", "ArrowUp"],
    down: ["s", "S", "ArrowDown"],
    left: ["a", "A", "ArrowLeft"],
    right: ["d", "D", "ArrowRight"]
}

export { GAME, TILE, GRID, TEXT, KEYS };